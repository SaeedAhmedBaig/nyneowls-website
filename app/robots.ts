// app/robots.ts
// Served at /robots.txt. Allows all crawlers on production, blocks API routes,
// and blocks everything on Vercel preview deployments so staging URLs never get indexed.

import type { MetadataRoute } from "next";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nyneowls.com").replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV === "preview") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}