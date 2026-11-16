import { handleNewsletterUnsubscribe } from "@backend/email/newsletter-request";

export async function POST(request: Request) {
  return handleNewsletterUnsubscribe(request);
}
