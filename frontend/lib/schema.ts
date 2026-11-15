// lib/schema.ts
// JSON-LD builders. Render the result with <JsonLd data={...} /> from components/seo/JsonLd.
// Only describe things that are visibly true on the page: structured data that contradicts
// page content can be ignored or penalised.

import { SITE, absoluteUrl } from "./seo";

const ORG_ID = absoluteUrl("/#organization");
const WEBSITE_ID = absoluteUrl("/#website");

/** Site-wide. Rendered once in app/layout.tsx. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: ["nyneowls", "Nyne Owls Studio"],
    url: SITE.url,
    logo: { "@type": "ImageObject", url: SITE.logo, width: 512, height: 512 },
    email: SITE.email,
    description: SITE.description,
    knowsAbout: [
      "Brand identity design",
      "Graphic design",
      "Retail point-of-sale software",
      "Original comics and stories",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SITE.email,
      availableLanguage: "English",
    },
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
  };
}

/** Site-wide. Drives the site name Google shows above your URL. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    alternateName: ["nyneowls"],
    url: SITE.url,
    inLanguage: "en-GB",
    publisher: { "@id": ORG_ID },
  };
}

export type Crumb = { name: string; path: string };

/** Breadcrumb trail, e.g. [{name:"Home",path:"/"},{name:"Studio",path:"/studio"}]. */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path === "/" ? "" : c.path),
    })),
  };
}

/** A generic page. Use type "AboutPage" for /about and "ContactPage" for /work-with-us. */
export function webPageSchema({
  name,
  description,
  path,
  type = "WebPage",
}: {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: absoluteUrl(path === "/" ? "" : path),
    inLanguage: "en-GB",
    isPartOf: { "@id": WEBSITE_ID },
  };
}

/** Describe a public service only when its offer and status are visible on the page. */
export function serviceSchema({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: absoluteUrl(path),
    provider: { "@id": ORG_ID },
  };
}

/**
 * Only use where the same questions and answers are visible on the page.
 * Google no longer shows FAQ rich results for most sites, but visible Q&A content still helps
 * people and AI systems pick out direct answers.
 */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}