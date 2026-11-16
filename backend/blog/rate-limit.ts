import "server-only";

import { createHmac } from "node:crypto";

export function rateLimitKey(request: Request) {
  const address =
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!address || !secret) throw new Error("A trusted client address and Supabase service key are required.");

  return createHmac("sha256", secret).update(address).digest("hex");
}
