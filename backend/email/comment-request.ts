import "server-only";

import { NextResponse } from "next/server";
import { z } from "zod";
import { blogCommentNotification, getMailConfig, sendEmail } from "@backend/email";
import { rateLimitKey } from "@backend/blog/rate-limit";
import { createBlogAdminClient } from "@backend/blog/supabase";

const schema = z.object({
  slug: z.string().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  authorName: z.string().trim().min(1).max(80),
  body: z.string().trim().min(1).max(2000),
  website: z.string().max(200).optional(),
});

export async function handleBlogCommentRequest(request: Request) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Please check your comment and try again." }, { status: 400 });
  }

  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Add a display name and a comment of up to 2,000 characters." },
      { status: 400 }
    );
  }
  if (parsed.data.website) return NextResponse.json({ ok: true, message: "Thanks. Your comment is awaiting review." });

  let keyHash: string;
  try {
    keyHash = rateLimitKey(request);
  } catch (error) {
    console.error("Blog comment rate limiting is not configured:", error);
    return NextResponse.json(
      { ok: false, error: "Comments are temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  const supabase = createBlogAdminClient();
  const { data, error } = await supabase.rpc("submit_blog_comment", {
    p_post_slug: parsed.data.slug,
    p_author_name: parsed.data.authorName,
    p_body: parsed.data.body,
    p_ip_hash: keyHash,
  });
  if (error) {
    if (error.message.includes("COMMENT_RATE_LIMITED")) {
      return NextResponse.json(
        { ok: false, error: "Please wait before submitting another comment." },
        { status: 429 }
      );
    }
    if (error.code === "P0002") {
      return NextResponse.json({ ok: false, error: "This article is no longer accepting comments." }, { status: 404 });
    }
    console.error("Could not submit blog comment:", error);
    return NextResponse.json(
      { ok: false, error: "We could not submit your comment. Please try again later." },
      { status: 503 }
    );
  }

  const comment = data?.[0];
  if (!comment) {
    console.error("Blog comment submission returned no comment row.");
    return NextResponse.json(
      { ok: false, error: "We could not submit your comment. Please try again later." },
      { status: 503 }
    );
  }

  const { data: post, error: postError } = await supabase
    .from("blog_posts")
    .select("title,slug")
    .eq("slug", parsed.data.slug)
    .maybeSingle();
  if (postError) console.error("Could not load article for comment notification:", postError.message);

  const mail = getMailConfig();
  if (mail && post) {
    const notification = blogCommentNotification({
      articleTitle: post.title,
      articleSlug: post.slug,
      authorName: parsed.data.authorName,
      body: parsed.data.body,
    });
    await sendEmail(mail.key, {
      from: mail.from,
      to: mail.to.split(",").map((address) => address.trim()).filter(Boolean),
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
    });
  } else {
    console.error("Blog comment notification email was not sent: mail configuration or article details are missing.");
  }

  return NextResponse.json({ ok: true, message: "Thanks. Your comment is awaiting review." }, { status: 202 });
}
