export type Cta = { label: string; href: string };
export type WorkTopic = "hire" | "collaborate" | "partner" | "other";

/** Link into the single contact form, optionally pre-selecting a topic and subject. */
export function workHref(topic?: WorkTopic, about?: string): string {
  const q = new URLSearchParams();
  if (topic) q.set("topic", topic);
  if (about) q.set("about", about);
  const qs = q.toString();
  return `/work-with-us${qs ? `?${qs}` : ""}#form`;
}

/** The one call to action shown in the header and the mobile menu. */
export const SITE_CTA: Cta = { label: "Work with us", href: "/work-with-us" };
