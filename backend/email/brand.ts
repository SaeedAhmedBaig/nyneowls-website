// lib/email/brand.ts
// Single source of truth for everything brand-related in emails.
// Colours mirror the tokens in app/globals.css (light theme). Copy mirrors nyneowls.com.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nyneowls.com").replace(/\/$/, "");

export const BRAND = {
  name: "Nyne Owls",
  mark: "NO",
  wordmark: "nyneowls",
  tagline: "Design it. Build it. Tell it.",
  email: "hello@nyneowls.com",

  color: {
    nyne: "#fc1906", // --nyne       brand red: stripe, button, accents
    nyneText: "#c91400", // --nyne-text  darker red for text links (readable on white)
    ink: "#171717", // --ink
    muted: "#6f6b66", // --muted
    line: "#e2dfd9", // --line
    paper: "#f8f7f4", // --paper      email background
    card: "#ffffff",
    panel: "#efede8", // --card       soft panels
    dark: "#1f1e1c", // site theme-color: header + footer
    onDarkMuted: "#b3ada5", // --muted (dark theme)
  },

  // Inter is the site font, but most inboxes will not load web fonts. These fallbacks look close.
  font: "Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif",
} as const;

/**
 * How long you promise to take to reply, e.g. "two working days".
 * Leave empty to make no promise. Only set something you can keep.
 */
export const REPLY_WINDOW = "";

/** Practice areas, in the same order and wording as the site. Keep `status` honest. */
export const DIVISIONS = [
  {
    no: "01",
    name: "Studio",
    path: "/studio",
    blurb: "Brand identity, graphic design, art direction, packaging and web design.",
    status: "Taking enquiries",
  },
  {
    no: "02",
    name: "Products",
    path: "/products",
    blurb: "Point of sale software built around real selling and inventory workflows.",
    status: "POS pilot demos in preparation",
  },
  {
    no: "03",
    name: "Originals",
    path: "/originals",
    blurb: "Original comics made to read well on a phone.",
    status: "Series in development",
  },
] as const;

export const LEGAL_LINKS = [
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms", path: "/terms" },
  { label: "Refund Policy", path: "/refunds" },
] as const;
