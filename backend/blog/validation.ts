import { z } from "zod";

function isIsoDate(value: string) {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function isHttpUrl(value: string) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") && !url.username && !url.password;
  } catch {
    return false;
  }
}

const citationSchema = z
  .object({
    order_index: z.number().int().min(0).max(10_000),
    title: z.string().trim().max(200),
    author: z.string().trim().max(160),
    publisher: z.string().trim().max(160),
    url: z.string().trim().max(2048),
    published_at: z.string().trim().max(10).refine(isIsoDate),
    accessed_at: z.string().trim().max(10).refine(isIsoDate),
  })
  .superRefine((citation, ctx) => {
    const hasContent = [
      citation.title,
      citation.author,
      citation.publisher,
      citation.url,
      citation.published_at,
      citation.accessed_at,
    ].some(Boolean);
    if (!hasContent) return;
    if (!citation.title) {
      ctx.addIssue({ code: "custom", path: ["title"], message: "Every citation needs a title." });
    }
    if (!citation.url) {
      ctx.addIssue({ code: "custom", path: ["url"], message: "Every citation needs a URL." });
    } else {
      try {
        if (!isHttpUrl(citation.url)) throw new Error();
      } catch {
        ctx.addIssue({ code: "custom", path: ["url"], message: "Use a valid HTTP or HTTPS URL." });
      }
    }
  });

export const blogPostSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(3).max(120),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens."),
  excerpt: z.string().trim().min(1).max(320),
  bodyHtml: z.string().min(1).max(100_000),
  coverImageUrl: z.string().trim().max(2048).refine(isHttpUrl, "Use a complete HTTP or HTTPS image URL."),
  coverImageAlt: z.string().trim().max(200),
  authorName: z.string().trim().min(1).max(100),
  tags: z.string().max(400),
  status: z.enum(["draft", "published"]),
  seoTitle: z.string().trim().max(70),
  seoDescription: z.string().trim().max(160),
  citationsJson: z.string().max(50_000),
});

export function parseBlogForm(formData: FormData) {
  const result = blogPostSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    bodyHtml: formData.get("bodyHtml"),
    coverImageUrl: formData.get("coverImageUrl") ?? "",
    coverImageAlt: formData.get("coverImageAlt") ?? "",
    authorName: formData.get("authorName"),
    tags: formData.get("tags") ?? "",
    status: formData.get("status"),
    seoTitle: formData.get("seoTitle") ?? "",
    seoDescription: formData.get("seoDescription") ?? "",
    citationsJson: formData.get("citationsJson"),
  });

  if (!result.success) return { success: false as const, error: result.error.issues[0]?.message ?? "Check the form fields." };

  let citations: z.infer<typeof citationSchema>[];
  try {
    const raw: unknown = JSON.parse(result.data.citationsJson);
    citations = z.array(citationSchema).max(20).parse(raw).filter((citation) =>
      [citation.title, citation.author, citation.publisher, citation.url, citation.published_at, citation.accessed_at].some(Boolean)
    );
  } catch {
    return { success: false as const, error: "Check the citations and try again." };
  }

  const tags = [...new Set(
    result.data.tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean)
  )];
  if (new Set(citations.map((citation) => citation.order_index)).size !== citations.length) {
    return { success: false as const, error: "Each citation needs a unique number." };
  }
  if (tags.some((tag) => tag.length > 32)) {
    return { success: false as const, error: "Each tag must be 32 characters or fewer." };
  }

  return { success: true as const, data: { ...result.data, tags, citations } };
}
