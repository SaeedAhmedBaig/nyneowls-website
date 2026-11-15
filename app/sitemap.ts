import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";
import { getPublishedPostSitemapRows } from "@backend/blog/data";
import { hasPublicBlogConfig } from "@backend/blog/supabase";

const paths = [
  "/",
  "/studio",
  "/products",
  "/originals",
  "/blog",
  "/about",
  "/work-with-us",
  "/privacy",
  "/terms",
  "/refunds",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = paths.map((path) => ({
    url: path === "/" ? `${SITE.url}/` : `${SITE.url}${path}`,
  }));
  if (!hasPublicBlogConfig()) return entries;

  const posts = await getPublishedPostSitemapRows();
  return [
    ...entries,
    ...posts.map((post) => ({
      url: `${SITE.url}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
    })),
  ];
}