import type { Metadata } from "next";

export const SITE = {
  name: "Nyne Owls",
  // The address your visitors actually land on (Vercel redirects the bare domain to www).
  url: "https://www.nyneowls.com",
  title: "Nyne Owls | Brand Design, Software & Original Stories",
  description:
    "Nyne Owls is a design and technology studio. We design brands, build business software and create original stories, all in one place.",
  email: "hello@nyneowls.com",
  // Square PNG in /public, at least 112x112 (512x512 here). Replace the file, keep the name.
  logo: "https://www.nyneowls.com/logo.png",
  // Full URLs of your official profiles (Instagram, LinkedIn, Behance, X, YouTube...).
  // Add them as you create them: they help search and AI systems recognise the brand as one entity.
  sameAs: [] as string[],
};

/** Turn a site path like "/about" into a full URL. Used by robots.ts, sitemap.ts and schema.ts. */
export function absoluteUrl(path = ""): string {
  return `${SITE.url}${path}`;
}

/**
 * Per-page metadata. Next.js replaces (not merges) the nested `openGraph` object from the
 * root layout, so anything the layout sets there, such as `locale`, must be repeated here.
 */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_GB",
      title: `${title} | ${SITE.name}`,
      description,
      url: path,
    },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE.name}`, description },
  };
}