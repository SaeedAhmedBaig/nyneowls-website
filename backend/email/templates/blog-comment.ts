import { BRAND, SITE_URL } from "../brand";
import { eyebrow, layout } from "../components";
import type { BuiltEmail } from "../types";
import { esc } from "../utils";

export function blogCommentNotification(input: {
  articleTitle: string;
  articleSlug: string;
  authorName: string;
  body: string;
}): BuiltEmail {
  const moderationUrl = `${SITE_URL}/admin/comments`;
  const body = `
    ${eyebrow("Comment awaiting review")}
    <h1 class="h1" style="margin:0 0 18px;font:800 30px/1.15 ${BRAND.font};letter-spacing:-0.035em;color:${BRAND.color.ink};">A reader joined the conversation.</h1>
    <p style="font:15px/1.7 ${BRAND.font};color:${BRAND.color.muted};">On <a href="${esc(`${SITE_URL}/blog/${input.articleSlug}`)}" style="color:${BRAND.color.nyneText};">${esc(input.articleTitle)}</a></p>
    <p style="font:700 13px/1.6 ${BRAND.font};color:${BRAND.color.ink};">${esc(input.authorName)}</p>
    <blockquote style="margin:0;border-left:3px solid ${BRAND.color.nyne};background:${BRAND.color.paper};padding:16px;font:15px/1.7 ${BRAND.font};color:${BRAND.color.ink};white-space:pre-wrap;">${esc(input.body)}</blockquote>
    <p style="margin:24px 0 0;"><a href="${esc(moderationUrl)}" style="display:inline-block;background:${BRAND.color.ink};padding:14px 20px;color:#fff;text-decoration:none;font:600 13px ${BRAND.font};">Review comment</a></p>`;

  return {
    subject: `Comment to review: ${input.articleTitle}`,
    html: layout({
      title: "A blog comment is awaiting review",
      preheader: "A new comment is waiting for moderation.",
      body,
      footerNote: "This notification was sent because a reader submitted a comment on the Nyne Owls journal.",
    }),
    text: [
      "A comment is awaiting review.",
      `Article: ${input.articleTitle} (${SITE_URL}/blog/${input.articleSlug})`,
      `From: ${input.authorName}`,
      "",
      input.body,
      "",
      `Review: ${moderationUrl}`,
    ].join("\n"),
  };
}
