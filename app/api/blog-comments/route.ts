import { handleBlogCommentRequest } from "@backend/email/comment-request";

export async function POST(request: Request) {
  return handleBlogCommentRequest(request);
}
