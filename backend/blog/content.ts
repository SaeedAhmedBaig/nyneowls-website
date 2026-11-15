import sanitizeHtml from "sanitize-html";

export function sanitizeBlogHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "h2",
      "h3",
      "u",
      "s",
      "hr",
    ],
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      ol: ["start"],
      li: ["value"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });
}

export function readingTime(html: string) {
  const text = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} });
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}
