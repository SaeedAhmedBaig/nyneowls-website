import type { Status } from "@/lib/status";

export type Image = { src: string; alt: string; caption?: string; width: number; height: number };

export type Project = {
  slug: string;
  kind: "product" | "original";
  name: string;
  tagline: string;
  summary: string;
  status: Status;
  listed: boolean; // false = hidden from nav, home, sitemap and its own page
  order: number; // lower shows first

  // Everything below is optional. A section renders only if its data exists.
  audience?: string;
  scope?: string[]; // what it covers (or will cover)
  next?: string[]; // what happens next
  facts?: { label: string; value: string }[];
  screenshots?: Image[]; // add real images here later
  links?: { label: string; href: string }[];
  cta?: { label: string; href: string };
};

export type Founder = {
  name: string;
  role: string;
  bio: string;
  photo?: Image;
  experience?: string;
  credits?: string[];
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  role: string;
  summary: string;
  results?: string[];
  images?: Image[];
};