// lib/email/utils.ts

/** Escape anything user-supplied before it goes into HTML. Never interpolate raw input. */
export const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Escape, then turn line breaks into <br>. */
export const multiline = (s: string) => esc(s).replace(/\r?\n/g, "<br>");

/** Collapse line breaks: safe for subjects and header values. */
export const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export const firstName = (name?: string) => oneLine(name ?? "").split(/\s+/)[0] || "there";

export const isLong = (v: string) => v.length > 80 || /\n/.test(v);

export const truncate = (s: string, max: number) => (s.length > max ? `${s.slice(0, max).trimEnd()}…` : s);

/** e.g. "15 Nov 2026, 14:03 UTC" */
export const formatReceived = (d = new Date()) =>
  `${d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  })} UTC`;
