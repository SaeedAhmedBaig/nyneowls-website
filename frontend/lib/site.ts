export type NavItem = { label: string; href: string; hint?: string };

export const divisions: NavItem[] = [
  { label: "Studio", href: "/studio", hint: "Brand and design work for clients" },
  { label: "Products", href: "/products", hint: "Software we are building" },
  { label: "Originals", href: "/originals", hint: "Original comics and stories" },
];

export const mainNav: NavItem[] = [
  ...divisions,
  { label: "Journal", href: "/blog", hint: "Ideas, notes and things in progress" },
  { label: "About", href: "/about", hint: "Who we are and how we work" },
];

export const companyNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
  { label: "Work with us", href: "/work-with-us" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Refund Policy", href: "/refunds" },
];

export const EMAIL = "hello@nyneowls.com";
export const COPYRIGHT_YEAR = 2026;