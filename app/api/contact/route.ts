import { NextResponse } from "next/server";
import { z } from "zod";
import { autoReply, getMailConfig, sendEmail, teamNotification } from "@/lib/email";

const schema = z.object({
  subject: z.string().min(1).max(120),
  email: z.string().email().max(200),
  name: z.string().max(120).optional(),
  website: z.string().optional(), // honeypot: real people leave it empty
  fields: z
    .array(z.object({ label: z.string().max(80), value: z.string().max(4000) }))
    .max(15),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check your details and try again." },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // Spam trap: pretend success, send nothing.
  if (data.website) return NextResponse.json({ ok: true });

  const config = getMailConfig();
  if (!config) {
    console.error("Contact form: missing RESEND_API_KEY, CONTACT_TO or CONTACT_FROM");
    return NextResponse.json(
      {
        ok: false,
        error: "Our form is not accepting messages yet. Please email hello@nyneowls.com and we will reply.",
      },
      { status: 500 }
    );
  }

  const input = {
    subject: data.subject,
    name: data.name,
    email: data.email,
    fields: data.fields,
  };

  // CONTACT_TO may hold one address or several, separated by commas.
  const recipients = config.to
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // 1. Notify the team. This is the email that must succeed.
  const team = teamNotification(input);
  const teamSent = await sendEmail(config.key, {
    from: config.from,
    to: recipients,
    reply_to: data.email,
    subject: team.subject,
    html: team.html,
    text: team.text,
  });

  if (!teamSent) {
    return NextResponse.json(
      { ok: false, error: "We could not send your message. Please email us directly." },
      { status: 502 }
    );
  }

  // 2. Confirm to the visitor. Best effort: a failure here must not fail the request,
  //    because the team already has the enquiry.
  const reply = autoReply(input);
  await sendEmail(config.key, {
    from: config.from,
    to: [data.email],
    reply_to: recipients[0],
    subject: reply.subject,
    html: reply.html,
    text: reply.text,
  });

  return NextResponse.json({ ok: true });
}