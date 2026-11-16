// lib/email/templates/auto-reply.ts
// The confirmation email the VISITOR receives. Tone follows the site: plain, honest, no hype.

import { BRAND, DIVISIONS, REPLY_WINDOW, SITE_URL } from "../brand";
import { button, divisionList, eyebrow, fieldRows, layout } from "../components";
import type { BuiltEmail, EmailInput } from "../types";
import { esc, firstName, truncate } from "../utils";

const C = BRAND.color;
const FONT = BRAND.font;

export function autoReply(input: EmailInput): BuiltEmail {
  const name = firstName(input.name);

  // Echo a short, escaped summary so they can see what was sent. Skip the email field.
  const summary = input.fields
    .filter((f) => f.value?.trim() && f.label.toLowerCase() !== "email")
    .map((f) => ({ label: f.label, value: truncate(f.value, 400) }));

  const timing = REPLY_WINDOW ? ` We aim to reply within ${REPLY_WINDOW}.` : "";

  const summaryHtml = summary.length
    ? `<div style="background:${C.paper};padding:24px 24px 2px 24px;margin:0 0 36px 0;">
        <div style="font:700 11px ${FONT};letter-spacing:0.12em;text-transform:uppercase;color:${C.nyneText};margin:0 0 18px 0;">What you sent</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${fieldRows(summary)}</table>
      </div>`
    : "";

  const body = `
    ${eyebrow("Message received")}
    <h1 class="h1" style="margin:0 0 18px 0;font:800 34px/1.12 ${FONT};letter-spacing:-0.035em;color:${C.ink};">Thank you, ${esc(name)}.<br>We have your message.</h1>
    <p style="margin:0 0 32px 0;font:16px/1.75 ${FONT};color:${C.ink};">
      Your message has reached the ${esc(BRAND.name)} team, and a person reads every one. We will reply to
      <strong>${esc(input.email)}</strong> with next steps.${esc(timing)}
    </p>
    ${summaryHtml}
    ${eyebrow("While you wait")}
    <h2 style="margin:0 0 6px 0;font:800 22px/1.25 ${FONT};letter-spacing:-0.025em;color:${C.ink};">One company. Three practice areas.</h2>
    <p style="margin:0 0 20px 0;font:14px/1.7 ${FONT};color:${C.muted};">Each page tells you plainly what is ready today.</p>
    ${divisionList()}
    <div style="border-top:1px solid ${C.line};padding-top:28px;">${button(SITE_URL, "Visit nyneowls.com")}</div>`;

  const html = layout({
    title: `We have your message, ${name}`,
    preheader: "Thank you for writing. We have your message and will reply with next steps.",
    body,
    footerNote: `You are receiving this because this address was used on the ${esc(BRAND.name)} contact form. If you do not hear from us, check your spam folder. If this was not you, ignore this email and nothing further will happen.`,
  });

  const text = [
    `Thank you, ${name}. We have your message.`,
    "",
    `Your message has reached the ${BRAND.name} team, and a person reads every one. We will reply to ${input.email} with next steps.${timing}`,
    "",
    ...(summary.length ? ["WHAT YOU SENT", ...summary.map((f) => `${f.label}: ${f.value}`), ""] : []),
    "ONE COMPANY. THREE PRACTICE AREAS.",
    ...DIVISIONS.map((d) => `${d.no} ${d.name} (${d.status}): ${SITE_URL}${d.path}`),
    "",
    BRAND.tagline,
    `${BRAND.name} | ${BRAND.email} | ${SITE_URL}`,
    "",
    "If you do not hear from us, check your spam folder. If this was not you, ignore this email.",
  ].join("\n");

  return { subject: `We have your message, ${name}`, html, text };
}
