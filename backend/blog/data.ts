import "server-only";

import type { BlogCitation, BlogPost, BlogPostRow } from "@backend/blog/database";
import { createBlogAdminClient, createPublicBlogClient } from "@backend/blog/supabase";

async function attachCitations(posts: BlogPostRow[]): Promise<BlogPost[]> {
  if (!posts.length) return [];
  const supabase = createPublicBlogClient();
  const { data, error } = await supabase
    .from("blog_citations")
    .select("*")
    .in("post_id", posts.map((post) => post.id))
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Could not load blog citations:", error.message);
    throw new Error("Could not load blog citations.");
  }

  const citations = data as BlogCitation[];
  return posts.map((post) => ({
    ...post,
    citations: citations.filter((citation) => citation.post_id === post.id),
  }));
}

export async function getPublishedPosts(page = 1, pageSize = 9) {
  const supabase = createPublicBlogClient();
  const from = (page - 1) * pageSize;
  const { data, error, count } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(from, from + pageSize - 1);

  if (error) {
    console.error("Could not load blog posts:", error.message);
    throw new Error("Could not load blog posts.");
  }

  const posts = await attachCitations((data ?? []) as BlogPostRow[]);
  return { posts, total: count ?? 0 };
}

export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  const supabase = createPublicBlogClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("Could not load blog post:", error.message);
    throw new Error("Could not load blog post.");
  }
  if (!data) return null;
  return (await attachCitations([data as BlogPostRow]))[0] ?? null;
}

export async function getPublishedPostSitemapRows() {
  const supabase = createPublicBlogClient();
  const rows: { slug: string; updated_at: string }[] = [];
  const pageSize = 1000;

  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug,updated_at")
      .eq("status", "published")
      .order("updated_at", { ascending: false })
      .range(from, from + pageSize - 1);
    if (error) {
      console.error("Could not load blog sitemap entries:", error.message);
      throw new Error("Could not load blog sitemap entries.");
    }
    rows.push(...(data ?? []));
    if (!data || data.length < pageSize) break;
  }

  return rows;
}

export async function getAdminPosts() {
  const supabase = createBlogAdminClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id,title,slug,status,updated_at,published_at")
    .order("updated_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Could not load blog admin list:", error.message);
    throw new Error("Could not load blog admin posts.");
  }

  return data ?? [];
}

export async function getAdminPost(id: string) {
  const supabase = createBlogAdminClient();
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Could not load blog post for editing:", error.message);
    throw new Error("Could not load this blog post.");
  }
  if (!post) return null;

  const { data: citations, error: citationsError } = await supabase
    .from("blog_citations")
    .select("*")
    .eq("post_id", id)
    .order("order_index", { ascending: true });

  if (citationsError) {
    console.error("Could not load blog citations for editing:", citationsError.message);
    throw new Error("Could not load this post's citations.");
  }

  return { ...post, citations: citations ?? [] };
}
