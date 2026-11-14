import type { Metadata } from "next";

export const SITE = {
  name: "Nyne Owls",
  // The address your visitors actually land on (Vercel redirects the bare domain to www).
  url: "https://www.nyneowls.com",
  title: "Nyne Owls | Brand Design, Software & Original Stories",
  description:
    "Nyne Owls is a design and technology studio. We design brands, build business software and create original stories, all in one place.",
  email: "hello@nyneowls.com",
};

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
      title: `${title} | ${SITE.name}`,
      description,
      url: path,
    },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE.name}`, description },
  };
}