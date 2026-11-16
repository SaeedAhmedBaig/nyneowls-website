import { handleNewsletterConfirmation } from "@backend/email/newsletter-request";

export async function POST(request: Request) {
  return handleNewsletterConfirmation(request);
}
