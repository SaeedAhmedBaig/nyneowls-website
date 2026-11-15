create extension if not exists pgcrypto;

create type public.blog_post_status as enum ('draft', 'published');

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  excerpt text not null,
  body_html text not null,
  cover_image_url text not null default '',
  cover_image_alt text not null default '',
  author_name text not null default 'Nyne Owls',
  tags text[] not null default '{}',
  status public.blog_post_status not null default 'draft',
  published_at timestamptz,
  seo_title text not null default '',
  seo_description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_published_posts_have_date check (status <> 'published' or published_at is not null)
);

create table public.blog_citations (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  order_index integer not null check (order_index >= 0),
  title text not null,
  author text not null default '',
  publisher text not null default '',
  url text not null,
  published_at date,
  accessed_at date,
  unique (post_id, order_index)
);

create index blog_posts_published_at_idx
  on public.blog_posts (published_at desc)
  where status = 'published';
create index blog_posts_tags_idx on public.blog_posts using gin (tags);
create index blog_citations_post_order_idx on public.blog_citations (post_id, order_index);

create or replace function public.set_blog_post_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.set_blog_post_updated_at();

revoke all on function public.set_blog_post_updated_at() from public, anon, authenticated;
grant execute on function public.set_blog_post_updated_at() to service_role;

create or replace function public.save_blog_post(p_post jsonb, p_citations jsonb)
returns table (id uuid, slug text)
language plpgsql
as $$
declare
  saved_id uuid;
begin
  insert into public.blog_posts (
    id,
    slug,
    title,
    excerpt,
    body_html,
    cover_image_url,
    cover_image_alt,
    author_name,
    tags,
    status,
    published_at,
    seo_title,
    seo_description
  )
  values (
    coalesce(nullif(p_post->>'id', '')::uuid, gen_random_uuid()),
    p_post->>'slug',
    p_post->>'title',
    p_post->>'excerpt',
    p_post->>'body_html',
    coalesce(p_post->>'cover_image_url', ''),
    coalesce(p_post->>'cover_image_alt', ''),
    coalesce(p_post->>'author_name', 'Nyne Owls'),
    coalesce(array(select jsonb_array_elements_text(p_post->'tags')), '{}'),
    (p_post->>'status')::public.blog_post_status,
    nullif(p_post->>'published_at', '')::timestamptz,
    coalesce(p_post->>'seo_title', ''),
    coalesce(p_post->>'seo_description', '')
  )
  on conflict (id) do update set
    slug = excluded.slug,
    title = excluded.title,
    excerpt = excluded.excerpt,
    body_html = excluded.body_html,
    cover_image_url = excluded.cover_image_url,
    cover_image_alt = excluded.cover_image_alt,
    author_name = excluded.author_name,
    tags = excluded.tags,
    status = excluded.status,
    published_at = excluded.published_at,
    seo_title = excluded.seo_title,
    seo_description = excluded.seo_description
  returning blog_posts.id into saved_id;

  delete from public.blog_citations where post_id = saved_id;

  insert into public.blog_citations (
    post_id,
    order_index,
    title,
    author,
    publisher,
    url,
    published_at,
    accessed_at
  )
  select
    saved_id,
    citation.order_index,
    citation.title,
    coalesce(citation.author, ''),
    coalesce(citation.publisher, ''),
    citation.url,
    nullif(citation.published_at, '')::date,
    nullif(citation.accessed_at, '')::date
  from jsonb_to_recordset(coalesce(p_citations, '[]'::jsonb)) as citation(
    order_index integer,
    title text,
    author text,
    publisher text,
    url text,
    published_at text,
    accessed_at text
  );

  return query select saved_id, (select blog_posts.slug from public.blog_posts where blog_posts.id = saved_id);
end;
$$;

revoke all on function public.save_blog_post(jsonb, jsonb) from public, anon, authenticated;
grant execute on function public.save_blog_post(jsonb, jsonb) to service_role;

alter table public.blog_posts enable row level security;
alter table public.blog_citations enable row level security;
grant select on public.blog_posts, public.blog_citations to anon, authenticated;
revoke insert, update, delete on public.blog_posts, public.blog_citations from anon, authenticated;
grant all on public.blog_posts, public.blog_citations to service_role;

create policy "Published blog posts are public"
  on public.blog_posts for select
  to anon, authenticated
  using (status = 'published');

create policy "Citations for published posts are public"
  on public.blog_citations for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.blog_posts
      where blog_posts.id = blog_citations.post_id
        and blog_posts.status = 'published'
    )
  );
