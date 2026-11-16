"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { BlogCommentStatus } from "@backend/blog/database";
import { isBlogAdmin, createBlogAdminClient } from "@backend/blog/supabase";

export type CommentModerationState = { error?: string; success?: string };

const moderationSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["approved", "rejected"]),
});

export async function moderateBlogComment(
  _previousState: CommentModerationState,
  formData: FormData
): Promise<CommentModerationState> {
  if (!(await isBlogAdmin())) return { error: "You are not authorised to moderate comments." };

  const parsed = moderationSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  if (!parsed.success) return { error: "This comment action is not valid." };

  try {
    const supabase = createBlogAdminClient();
    const { data: comment, error: findError } = await supabase
      .from("blog_comments")
      .select("post_id")
      .eq("id", parsed.data.id)
      .maybeSingle();
    if (findError) throw findError;
    if (!comment) return { error: "This comment no longer exists." };

    const status: BlogCommentStatus = parsed.data.status;
    const { error } = await supabase
      .from("blog_comments")
      .update({ status, moderated_at: new Date().toISOString() })
      .eq("id", parsed.data.id);
    if (error) throw error;

    const { data: post, error: postError } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("id", comment.post_id)
      .maybeSingle();
    if (postError) throw postError;

    revalidatePath("/admin/comments");
    if (post?.slug) revalidatePath(`/blog/${post.slug}`);
    return { success: status === "approved" ? "Comment approved." : "Comment hidden." };
  } catch (error) {
    console.error("Could not moderate blog comment:", error);
    return { error: "Could not update this comment. Please try again." };
  }
}
