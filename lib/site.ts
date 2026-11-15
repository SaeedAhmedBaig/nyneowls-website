export type NavItem = { label: string; href: string; hint?: string };

// Switches for sections that exist in the code but are not public yet.
export const FEATURES: { goods: boolean } = { goods: false };

const goods: NavItem = { label: "Goods", href: "/goods", hint: "Design resources and templates" };

export const divisions: NavItem[] = [
  { label: "Studio", href: "/studio", hint: "Brand and design work for clients" },
  ...(FEATURES.goods ? [goods] : []),
  { label: "Products", href: "/products", hint: "Software we are building" },
  { label: "Originals", href: "/originals", hint: "Original manga and stories" },
];

export const mainNav: NavItem[] = [
  ...divisions,
  { label: "About", href: "/about", hint: "Who we are and how we work" },
];

export const companyNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Work with us", href: "/work-with-us" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Refund Policy", href: "/refunds" },
  ...(FEATURES.goods ? [{ label: "Licence terms", href: "/licences" }] : []),
];

export const EMAIL = "hello@nyneowls.com";
export const COPYRIGHT_YEAR = 2026;