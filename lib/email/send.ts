// lib/email/send.ts
// Thin wrapper around the Resend REST API (no SDK needed).

export type Mail = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  reply_to?: string;
  headers?: Record<string, string>;
};

/** Returns null when any required env var is missing. */
export function getMailConfig() {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;
  if (!key || !to || !from) return null;
  return { key, to, from };
}

/** Never throws. Returns true on success and logs the reason on failure. */
export async function sendEmail(key: string, mail: Mail): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(mail),
    });
    if (!res.ok) {
      console.error("Email: Resend error", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Email: network error reaching Resend", err);
    return false;
  }
}
