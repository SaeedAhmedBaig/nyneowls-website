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
  on conflict on constraint blog_posts_pkey do update set
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

  return query select saved_id, (
    select blog_posts.slug
    from public.blog_posts
    where blog_posts.id = saved_id
  );
end;
$$;

revoke all on function public.save_blog_post(jsonb, jsonb) from public, anon, authenticated;
grant execute on function public.save_blog_post(jsonb, jsonb) to service_role;
