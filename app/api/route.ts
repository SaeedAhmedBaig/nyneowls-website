import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  subject: z.string().min(1).max(120),
  email: z.string().email().max(200),
  name: z.string().max(120).optional(),
  website: z.string().optional(), // honeypot: real people leave it empty
  fields: z
    .array(z.object({ label: z.string().max(80), value: z.string().max(4000) }))
    .max(15),
});

const clean = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check your details and try again." }, { status: 400 });
  }
  const data = parsed.data;

  // Spam trap: pretend success, send nothing.
  if (data.website) return NextResponse.json({ ok: true });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;
  if (!key || !to || !from) {
    console.error("Contact form: missing RESEND_API_KEY, CONTACT_TO or CONTACT_FROM");
    return NextResponse.json({ ok: false, error: "Sending is not set up yet." }, { status: 500 });
  }

  const text = [
    `From: ${clean(data.name ?? "")} <${data.email}>`,
    "",
    ...data.fields.map((f) => `${f.label}: ${f.value || "(not provided)"}`),
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `[Website] ${clean(data.subject)}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error("Contact form: Resend error", res.status, await res.text());
    return NextResponse.json({ ok: false, error: "We could not send your message. Please email us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}