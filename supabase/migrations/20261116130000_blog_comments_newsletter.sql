create type public.blog_comment_status as enum ('pending', 'approved', 'rejected');
create type public.newsletter_subscription_status as enum ('pending', 'active', 'unsubscribed');

create table public.blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  author_name text not null check (char_length(author_name) between 1 and 80),
  body text not null check (char_length(body) between 1 and 2000),
  status public.blog_comment_status not null default 'pending',
  created_at timestamptz not null default now(),
  moderated_at timestamptz
);

create index blog_comments_post_status_created_idx
  on public.blog_comments (post_id, status, created_at);
create index blog_comments_status_created_idx
  on public.blog_comments (status, created_at desc);

alter table public.blog_comments enable row level security;
grant select on public.blog_comments to anon, authenticated;
grant all on public.blog_comments to service_role;

create policy "Approved comments on published articles are public"
  on public.blog_comments for select
  to anon, authenticated
  using (
    status = 'approved'
    and exists (
      select 1
      from public.blog_posts
      where blog_posts.id = blog_comments.post_id
        and blog_posts.status = 'published'
    )
  );

create table public.public_rate_limit_events (
  id bigint generated always as identity primary key,
  scope text not null,
  key_hash text not null,
  created_at timestamptz not null default now()
);

create index public_rate_limit_events_lookup_idx
  on public.public_rate_limit_events (scope, key_hash, created_at desc);

alter table public.public_rate_limit_events enable row level security;
revoke all on public.public_rate_limit_events from public, anon, authenticated;
grant all on public.public_rate_limit_events to service_role;

create or replace function public.consume_public_rate_limit(
  p_scope text,
  p_key_hash text,
  p_max_requests integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
set search_path = ''
as $$
declare
  recent_requests integer;
begin
  if p_scope is null or p_scope = ''
    or p_key_hash is null or p_key_hash = ''
    or p_max_requests < 1
    or p_window_seconds < 1
  then
    raise exception using errcode = '22023', message = 'Invalid rate limit parameters.';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtext(p_scope),
    pg_catalog.hashtext(p_key_hash)
  );

  delete from public.public_rate_limit_events
  where created_at < pg_catalog.now() - interval '1 day';

  select count(*)::integer into recent_requests
  from public.public_rate_limit_events
  where scope = p_scope
    and key_hash = p_key_hash
    and created_at >= pg_catalog.now() - pg_catalog.make_interval(secs => p_window_seconds);

  if recent_requests >= p_max_requests then
    return false;
  end if;

  insert into public.public_rate_limit_events (scope, key_hash)
  values (p_scope, p_key_hash);

  return true;
end;
$$;

revoke all on function public.consume_public_rate_limit(text, text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.consume_public_rate_limit(text, text, integer, integer)
  to service_role;

create or replace function public.submit_blog_comment(
  p_post_slug text,
  p_author_name text,
  p_body text,
  p_ip_hash text
)
returns table (id uuid, created_at timestamptz)
language plpgsql
set search_path = ''
as $$
declare
  target_post_id uuid;
  inserted_comment_id uuid;
begin
  if char_length(pg_catalog.btrim(p_author_name)) not between 1 and 80
    or char_length(pg_catalog.btrim(p_body)) not between 1 and 2000
  then
    raise exception using errcode = '22023', message = 'Invalid comment.';
  end if;

  select post.id into target_post_id
  from public.blog_posts as post
  where post.slug = p_post_slug
    and post.status = 'published';

  if target_post_id is null then
    raise exception using errcode = 'P0002', message = 'Published article not found.';
  end if;

  if not public.consume_public_rate_limit('blog_comment', p_ip_hash, 3, 3600) then
    raise exception using errcode = 'P0001', message = 'COMMENT_RATE_LIMITED';
  end if;

  insert into public.blog_comments (post_id, author_name, body, status)
  values (target_post_id, pg_catalog.btrim(p_author_name), pg_catalog.btrim(p_body), 'pending')
  returning blog_comments.id into inserted_comment_id;

  return query
  select comment.id, comment.created_at
  from public.blog_comments as comment
  where comment.id = inserted_comment_id;
end;
$$;

revoke all on function public.submit_blog_comment(text, text, text, text)
  from public, anon, authenticated;
grant execute on function public.submit_blog_comment(text, text, text, text)
  to service_role;

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email = pg_catalog.lower(pg_catalog.btrim(email))),
  status public.newsletter_subscription_status not null default 'pending',
  confirmation_token_hash text,
  confirmation_expires_at timestamptz,
  unsubscribe_token_hash text not null,
  consented_at timestamptz not null default now(),
  consent_source text not null default 'website',
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index newsletter_subscribers_confirmation_token_idx
  on public.newsletter_subscribers (confirmation_token_hash)
  where confirmation_token_hash is not null;
create unique index newsletter_subscribers_unsubscribe_token_idx
  on public.newsletter_subscribers (unsubscribe_token_hash);
create index newsletter_subscribers_status_created_idx
  on public.newsletter_subscribers (status, created_at desc);

create trigger newsletter_subscribers_updated_at
before update on public.newsletter_subscribers
for each row execute function public.set_blog_post_updated_at();

alter table public.newsletter_subscribers enable row level security;
revoke all on public.newsletter_subscribers from public, anon, authenticated;
grant all on public.newsletter_subscribers to service_role;
