import "server-only";

import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getTransactionalMailConfig, newsletterConfirmation, newsletterWelcome, sendEmail } from "@backend/email";
import { createBlogAdminClient } from "@backend/blog/supabase";
import { rateLimitKey } from "@backend/blog/rate-limit";
import { SITE_URL } from "./brand";

const subscribeSchema = z.object({
  email: z.string().trim().email().max(200).transform((email) => email.toLowerCase()),
  consent: z.literal(true),
  source: z.enum(["blog", "footer"]).default("footer"),
  website: z.string().max(200).optional(),
});
const tokenSchema = z.object({
  token: z.string().regex(/^[a-f0-9]{64}$/i),
  unsubscribeToken: z.string().regex(/^[a-f0-9]{64}$/i),
});
const unsubscribeSchema = z.object({ token: z.string().regex(/^[a-f0-9]{64}$/i) });

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function tokenUrl(path: string, token: string) {
  return `${SITE_URL}${path}#${token}`;
}

function genericSubscribeResponse() {
  return NextResponse.json({
    ok: true,
    message: "If this address can be subscribed, check your inbox for a confirmation link.",
  });
}

export async function handleNewsletterSubscribe(request: Request) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }
  const parsed = subscribeSchema.safeParse(input);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address to subscribe." }, { status: 400 });
  }
  if (parsed.data.website) return genericSubscribeResponse();

  const mail = getTransactionalMailConfig();
  if (!mail) {
    console.error("Newsletter signup: missing RESEND_API_KEY or CONTACT_FROM.");
    return NextResponse.json(
      { ok: false, error: "Subscriptions are temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  let keyHash: string;
  try {
    keyHash = rateLimitKey(request);
  } catch (error) {
    console.error("Newsletter rate limiting is not configured:", error);
    return NextResponse.json(
      { ok: false, error: "Subscriptions are temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  const supabase = createBlogAdminClient();
  const { data: allowed, error: limitError } = await supabase.rpc("consume_public_rate_limit", {
    p_scope: "newsletter",
    p_key_hash: keyHash,
    p_max_requests: 5,
    p_window_seconds: 3600,
  });
  if (limitError) {
    console.error("Could not check newsletter request rate limit:", limitError);
    return NextResponse.json(
      { ok: false, error: "Subscriptions are temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "Please wait before requesting another confirmation email." },
      { status: 429 }
    );
  }

  const { data: existing, error: lookupError } = await supabase
    .from("newsletter_subscribers")
    .select("id,status,unsubscribe_token_hash")
    .eq("email", parsed.data.email)
    .maybeSingle();
  if (lookupError) {
    console.error("Could not look up newsletter subscriber:", lookupError);
    return NextResponse.json(
      { ok: false, error: "Subscriptions are temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }
  if (existing?.status === "active") return genericSubscribeResponse();

  const confirmationToken = randomBytes(32).toString("hex");
  const unsubscribeToken = randomBytes(32).toString("hex");
  const now = new Date();
  const { error: saveError } = await supabase.from("newsletter_subscribers").upsert(
    {
      email: parsed.data.email,
      status: "pending",
      confirmation_token_hash: hashToken(confirmationToken),
      confirmation_expires_at: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      unsubscribe_token_hash: hashToken(unsubscribeToken),
      consented_at: now.toISOString(),
      consent_source: parsed.data.source,
      confirmed_at: null,
      unsubscribed_at: null,
    },
    { onConflict: "email" }
  );
  if (saveError) {
    console.error("Could not save newsletter signup:", saveError);
    return NextResponse.json(
      { ok: false, error: "Subscriptions are temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  const confirmationFragment = `${confirmationToken}.${unsubscribeToken}`;
  const message = newsletterConfirmation(tokenUrl("/newsletter/confirm", confirmationFragment));
  const sent = await sendEmail(mail.key, {
    from: mail.from,
    to: [parsed.data.email],
    subject: message.subject,
    html: message.html,
    text: message.text,
  });
  if (!sent) {
    return NextResponse.json(
      { ok: false, error: "We could not send the confirmation email. Please try again later." },
      { status: 502 }
    );
  }

  return genericSubscribeResponse();
}

export async function handleNewsletterConfirmation(request: Request) {
  const parsed = tokenSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "This confirmation link is not valid." }, { status: 400 });
  }

  const supabase = createBlogAdminClient();
  const tokenHash = hashToken(parsed.data.token);
  const unsubscribeTokenHash = hashToken(parsed.data.unsubscribeToken);
  const now = new Date().toISOString();
  const { data: pending, error: lookupError } = await supabase
    .from("newsletter_subscribers")
    .select("id,email,unsubscribe_token_hash")
    .eq("confirmation_token_hash", tokenHash)
    .eq("unsubscribe_token_hash", unsubscribeTokenHash)
    .eq("status", "pending")
    .gt("confirmation_expires_at", now)
    .maybeSingle();

  if (lookupError) {
    console.error("Could not verify newsletter confirmation:", lookupError);
    return NextResponse.json(
      { ok: false, error: "We could not confirm your subscription. Please try again." },
      { status: 503 }
    );
  }
  if (!pending) {
    return NextResponse.json(
      { ok: false, error: "This link has expired or has already been used. You can request a new one from the signup form." },
      { status: 410 }
    );
  }

  const { data: confirmed, error: updateError } = await supabase
    .from("newsletter_subscribers")
    .update({
      status: "active",
      confirmation_token_hash: null,
      confirmation_expires_at: null,
      confirmed_at: now,
    })
    .eq("id", pending.id)
    .eq("confirmation_token_hash", tokenHash)
    .select("id")
    .maybeSingle();

  if (updateError || !confirmed) {
    if (updateError) console.error("Could not activate newsletter subscription:", updateError);
    return NextResponse.json(
      { ok: false, error: "We could not confirm your subscription. Please try again." },
      { status: 503 }
    );
  }

  const mail = getTransactionalMailConfig();
  if (!mail) {
    console.error("Newsletter welcome email not sent: missing RESEND_API_KEY or CONTACT_FROM.");
    return NextResponse.json({ ok: true, message: "Your subscription is confirmed." });
  }

  const welcome = newsletterWelcome(tokenUrl("/newsletter/unsubscribe", parsed.data.unsubscribeToken));
  const sent = await sendEmail(mail.key, {
    from: mail.from,
    to: [pending.email],
    subject: welcome.subject,
    html: welcome.html,
    text: welcome.text,
  });
  if (!sent) console.error("Newsletter welcome email could not be sent after confirmation.");
  return NextResponse.json({ ok: true, message: "Your subscription is confirmed. Welcome to the journal." });
}

export async function handleNewsletterUnsubscribe(request: Request) {
  const parsed = unsubscribeSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "This unsubscribe link is not valid." }, { status: 400 });
  }

  const supabase = createBlogAdminClient();
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .update({
      status: "unsubscribed",
      confirmation_token_hash: null,
      confirmation_expires_at: null,
      unsubscribed_at: new Date().toISOString(),
    })
    .eq("unsubscribe_token_hash", hashToken(parsed.data.token))
    .neq("status", "unsubscribed")
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("Could not unsubscribe newsletter address:", error);
    return NextResponse.json(
      { ok: false, error: "We could not update your subscription. Please try again." },
      { status: 503 }
    );
  }

  if (!data) {
    return NextResponse.json({
      ok: true,
      message: "This address is already unsubscribed or the link has expired.",
    });
  }

  return NextResponse.json({ ok: true, message: "You have been unsubscribed from the journal." });
}
