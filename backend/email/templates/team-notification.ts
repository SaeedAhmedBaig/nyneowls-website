// lib/email/templates/team-notification.ts
// The email that lands in YOUR inbox when someone submits the form.

import { BRAND } from "../brand";
import { button, eyebrow, fieldRows, layout } from "../components";
import type { BuiltEmail, EmailInput } from "../types";
import { esc, firstName, formatReceived, oneLine } from "../utils";

const C = BRAND.color;
const FONT = BRAND.font;

export function teamNotification(input: EmailInput): BuiltEmail {
  const subjectLine = oneLine(input.subject);
  const who = oneLine(input.name ?? "") || input.email;
  const received = formatReceived();
  const replyHref = `mailto:${input.email}?subject=${encodeURIComponent(`Re: ${subjectLine}`)}`;

  const body = `
    ${eyebrow("New enquiry")}
    <h1 class="h1" style="margin:0 0 8px 0;font:800 30px/1.15 ${FONT};letter-spacing:-0.03em;color:${C.ink};">${esc(who)}</h1>
    <p style="margin:0 0 6px 0;font:600 16px/1.5 ${FONT};color:${C.ink};">${esc(subjectLine)}</p>
    <p style="margin:0 0 28px 0;font:14px/1.6 ${FONT};color:${C.muted};">
      <a href="mailto:${esc(input.email)}" style="color:${C.nyneText};text-decoration:none;">${esc(input.email)}</a>
      &nbsp;&middot;&nbsp; ${esc(received)}
    </p>
    <div style="border-top:1px solid ${C.line};padding-top:28px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${fieldRows(input.fields)}</table>
    </div>
    ${button(replyHref, `Reply to ${firstName(input.name)}`)}`;

  const html = layout({
    title: `New enquiry: ${subjectLine}`,
    preheader: `${who}: ${subjectLine}`,
    body,
    footerNote: `Internal notification from the contact form on nyneowls.com. Replying to this email goes straight to ${esc(input.email)}.`,
  });

  const text = [
    `NEW ENQUIRY - ${BRAND.name}`,
    "",
    `From: ${who} <${input.email}>`,
    `Subject: ${subjectLine}`,
    `Received: ${received}`,
    "",
    ...input.fields.map((f) => `${f.label}: ${f.value?.trim() || "Not provided"}`),
    "",
    `Reply directly to this email to reach ${input.email}.`,
  ].join("\n");

  return { subject: `[Website] ${subjectLine}`, html, text };
}
