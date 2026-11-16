// lib/email/components.ts
// Email-safe HTML building blocks: tables, inline styles, 600px wide.
// Email clients ignore flex/grid/Tailwind, so do not "modernise" this file.

import { BRAND, DIVISIONS, LEGAL_LINKS, SITE_URL } from "./brand";
import type { Field } from "./types";
import { esc, isLong, multiline } from "./utils";

const C = BRAND.color;
const FONT = BRAND.font;

/** Small uppercase label with the red square, like the site's section eyebrows. */
export function eyebrow(text: string) {
  return `<div style="font:700 11px ${FONT};letter-spacing:0.12em;text-transform:uppercase;color:${C.nyneText};margin:0 0 14px 0;">
    <span style="display:inline-block;width:8px;height:8px;background:${C.nyne};margin-right:8px;"></span>${esc(text)}
  </div>`;
}

/** Primary button: square corners, accessible brand red, like the site's CTA. */
export function button(href: string, label: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td bgcolor="${C.nyneText}" style="background:${C.nyneText};">
      <a href="${esc(href)}" style="display:inline-block;padding:15px 24px;font:600 14px ${FONT};color:#ffffff;text-decoration:none;">${esc(label)}&nbsp;&nbsp;&#8599;</a>
    </td></tr></table>`;
}

/** Label + value rows. Long or multi-line values become a quoted block. */
export function fieldRows(fields: Field[]) {
  return fields
    .map((f) => {
      const val = f.value?.trim() ?? "";
      const label = `<div style="font:700 10px ${FONT};letter-spacing:0.11em;text-transform:uppercase;color:${C.muted};margin:0 0 6px 0;">${esc(f.label)}</div>`;
      const content = !val
        ? `<div style="font:italic 15px ${FONT};color:${C.muted};">Not provided</div>`
        : isLong(val)
          ? `<div style="background:${C.paper};border-left:3px solid ${C.nyne};padding:14px 16px;font:15px/1.7 ${FONT};color:${C.ink};">${multiline(val)}</div>`
          : `<div style="font:16px/1.5 ${FONT};color:${C.ink};">${esc(val)}</div>`;
      return `<tr><td style="padding:0 0 22px 0;">${label}${content}</td></tr>`;
    })
    .join("");
}

/** The practice areas as a numbered list, matching the site's "Where to start" section. */
export function divisionList() {
  const rows = DIVISIONS.map(
    (d) => `<tr>
      <td valign="top" width="40" style="padding:16px 0;border-top:1px solid ${C.line};font:700 12px ${FONT};letter-spacing:0.08em;color:${C.muted};">${d.no}</td>
      <td valign="top" style="padding:16px 0;border-top:1px solid ${C.line};">
        <a href="${SITE_URL}${d.path}" style="font:700 16px ${FONT};color:${C.ink};text-decoration:none;">${esc(d.name)}</a>
        <div style="font:14px/1.6 ${FONT};color:${C.muted};margin:4px 0 6px 0;">${esc(d.blurb)}</div>
        <div style="font:700 10px ${FONT};letter-spacing:0.11em;text-transform:uppercase;color:${C.nyneText};">${esc(d.status)}</div>
      </td></tr>`
  ).join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>`;
}

function header() {
  return `<tr><td class="px" bgcolor="${C.dark}" style="background:${C.dark};padding:22px 32px;border-bottom:4px solid ${C.nyne};">
    <a href="${SITE_URL}" style="text-decoration:none;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td bgcolor="${C.nyne}" width="36" height="36" align="center" valign="middle" style="background:${C.nyne};width:36px;height:36px;font:800 14px ${FONT};letter-spacing:0.02em;color:#ffffff;">${esc(BRAND.mark)}</td>
        <td style="padding-left:12px;font:800 19px ${FONT};letter-spacing:-0.02em;color:#ffffff;">${esc(BRAND.wordmark)}</td>
      </tr></table>
    </a>
  </td></tr>`;
}

function footer(note: string) {
  const links = LEGAL_LINKS.map(
    (l) => `<a href="${SITE_URL}${l.path}" style="color:${C.onDarkMuted};text-decoration:underline;">${esc(l.label)}</a>`
  ).join(`&nbsp;&nbsp;&middot;&nbsp;&nbsp;`);

  return `<tr><td class="px" bgcolor="${C.dark}" style="background:${C.dark};padding:28px 32px;font-family:${FONT};">
    <div style="font:800 11px ${FONT};letter-spacing:0.14em;text-transform:uppercase;color:#ffffff;">${esc(BRAND.tagline)}</div>
    <div style="font:12px/1.7 ${FONT};color:${C.onDarkMuted};margin-top:14px;">${note}</div>
    <div style="font:12px/2 ${FONT};color:${C.onDarkMuted};margin-top:12px;">${links}</div>
    <div style="font:12px/1.7 ${FONT};color:${C.onDarkMuted};margin-top:12px;">&copy; ${new Date().getFullYear()} ${esc(BRAND.name)} &middot; <a href="mailto:${BRAND.email}" style="color:${C.onDarkMuted};">${BRAND.email}</a></div>
  </td></tr>`;
}

/** Full HTML document. `body` and `footerNote` must already be escaped HTML. */
export function layout(opts: { title: string; preheader: string; body: string; footerNote: string }) {
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${esc(opts.title)}</title>
<style>
  @media (max-width:620px){
    .px{padding-left:20px!important;padding-right:20px!important}
    .h1{font-size:26px!important}
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.paper};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(opts.preheader)}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.paper}" style="background:${C.paper};">
<tr><td align="center" style="padding:32px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
    ${header()}
    <tr><td class="px" bgcolor="${C.card}" style="background:${C.card};padding:40px 32px;font-family:${FONT};color:${C.ink};">
      ${opts.body}
    </td></tr>
    ${footer(opts.footerNote)}
  </table>
</td></tr>
</table>
</body>
</html>`;
}
