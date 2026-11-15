"use server";

import { revalidatePath } from "next/cache";
import type { Json } from "@backend/blog/database";
import { sanitizeBlogHtml } from "@backend/blog/content";
import { createBlogAdminClient, isBlogAdmin } from "@backend/blog/supabase";
import { parseBlogForm } from "@backend/blog/validation";

export type BlogActionState = { error?: string; success?: string; id?: string };

export async function saveBlogPost(
  _previousState: BlogActionState,
  formData: FormData
): Promise<BlogActionState> {
  if (!(await isBlogAdmin())) return { error: "You are not authorised to manage blog posts." };

  const parsed = parseBlogForm(formData);
  if (!parsed.success) return { error: parsed.error };

  const bodyHtml = sanitizeBlogHtml(parsed.data.bodyHtml);
  const bodyText = bodyHtml.replace(/<[^>]*>/g, "").trim();
  if (!bodyText) return { error: "Add some article content before saving." };

  const { tags, citations, ...formValues } = parsed.data;
  if (tags.length > 10) return { error: "Add no more than 10 tags." };

  try {
    const supabase = createBlogAdminClient();
    let existing: { slug: string; published_at: string | null } | null = null;
    if (formValues.id) {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("slug,published_at")
        .eq("id", formValues.id)
        .maybeSingle();
      if (error) throw error;
      if (!data) return { error: "This post no longer exists. Refresh and try again." };
      existing = data;
    }

    const publishedAt =
      formValues.status === "published"
        ? existing?.published_at ?? new Date().toISOString()
        : null;
    const citationsPayload = citations;
    const postPayload = {
      ...(formValues.id ? { id: formValues.id } : {}),
      slug: formValues.slug,
      title: formValues.title,
      excerpt: formValues.excerpt,
      body_html: bodyHtml,
      cover_image_url: formValues.coverImageUrl,
      cover_image_alt: formValues.coverImageAlt,
      author_name: formValues.authorName,
      tags,
      status: formValues.status,
      published_at: publishedAt ?? "",
      seo_title: formValues.seoTitle,
      seo_description: formValues.seoDescription,
    };
    const { data, error } = await supabase.rpc("save_blog_post", {
      p_post: postPayload as Json,
      p_citations: citationsPayload as Json,
    });
    if (error) throw error;
    const saved = data?.[0];
    if (!saved) throw new Error("The blog database did not return the saved post.");

    revalidatePath("/blog");
    revalidatePath(`/blog/${saved.slug}`);
    if (existing && existing.slug !== saved.slug) revalidatePath(`/blog/${existing.slug}`);
    revalidatePath("/admin");
    revalidatePath("/admin/blog");
    revalidatePath("/sitemap.xml");
    return { success: "Article saved.", id: saved.id };
  } catch (error) {
    console.error("Could not save blog post:", error);
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return { error: "That URL slug is already in use. Choose another one." };
    }
    return { error: "Could not save the article. Check the Supabase setup and try again." };
  }
}

export async function deleteBlogPost(
  _previousState: BlogActionState,
  formData: FormData
): Promise<BlogActionState> {
  if (!(await isBlogAdmin())) return { error: "You are not authorised to manage blog posts." };
  const id = formData.get("id");
  if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id)) {
    return { error: "This post ID is not valid." };
  }

  try {
    const supabase = createBlogAdminClient();
    const { data: post, error: findError } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("id", id)
      .maybeSingle();
    if (findError) throw findError;
    if (!post) return { error: "This post no longer exists." };

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/admin");
    revalidatePath("/admin/blog");
    revalidatePath("/sitemap.xml");
    return { success: "Article deleted." };
  } catch (error) {
    console.error("Could not delete blog post:", error);
    return { error: "Could not delete the article. Check the Supabase setup and try again." };
  }
}
