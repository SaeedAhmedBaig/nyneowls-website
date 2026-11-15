import { handleContactRequest } from "@backend/email/contact";

export async function POST(request: Request) {
  return handleContactRequest(request);
}