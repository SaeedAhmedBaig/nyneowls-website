import { handleNewsletterSubscribe } from "@backend/email/newsletter-request";

export async function POST(request: Request) {
  return handleNewsletterSubscribe(request);
}
