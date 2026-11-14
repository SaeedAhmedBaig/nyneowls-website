// app/sitemap.ts
// Served at /sitemap.xml. Routes match the pages in app/ plus the legal documents
// served by app/[doc]/page.tsx. When you add a page, add its path here.

import type { MetadataRoute } from "next";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nyneowls.com").replace(/\/$/, "");

// Update this date when page content meaningfully changes. A fixed date is more
// honest to search engines than "now", which would claim every page changed on every build.
const LAST_UPDATED = new Date("2026-11-15");

type Entry = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

const entries: Entry[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },

  // Divisions
  { path: "/creative-studio", priority: 0.9, changeFrequency: "monthly" },
  { path: "/digital-goods", priority: 0.9, changeFrequency: "monthly" },
  { path: "/digital-solutions", priority: 0.9, changeFrequency: "monthly" },
  { path: "/stories-comics", priority: 0.9, changeFrequency: "monthly" },

  // Company
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/work-with-us", priority: 0.8, changeFrequency: "monthly" },

  // Legal (served by app/[doc]/page.tsx)
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/refunds", priority: 0.3, changeFrequency: "yearly" },
  { path: "/licences", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return entries.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE}${path}`,
    lastModified: LAST_UPDATED,
    changeFrequency,
    priority,
  }));
}