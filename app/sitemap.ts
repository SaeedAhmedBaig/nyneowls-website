import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";
import { FEATURES } from "@/lib/site";

const paths = [
  "/",
  "/studio",
  "/products",
  "/originals",
  "/about",
  "/work-with-us",
  "/privacy",
  "/terms",
  "/refunds",
  ...(FEATURES.goods ? ["/goods", "/licences"] : []),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: p === "/" ? `${SITE.url}/` : `${SITE.url}${p}` }));
}