import { workHref, type Cta } from "@/lib/cta";

/**
 * Every page's calls to action, in one place.
 * Rule: one primary action per page, at most one quiet secondary link.
 * Project pages use the `cta` field in content/projects.ts instead.
 */
export const pageCtas: Record<string, { primary: Cta; secondary?: Cta }> = {
  home: {
    primary: { label: "Work with us", href: "/work-with-us" },
    secondary: { label: "See what we are building", href: "/products" },
  },
  studio: { primary: { label: "Start a project", href: workHref("hire") } },
  products: { primary: { label: "Partner on a product", href: workHref("partner") } },
  originals: { primary: { label: "Collaborate on a story", href: workHref("collaborate") } },
  about: { primary: { label: "Work with us", href: "/work-with-us" } },
};
