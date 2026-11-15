
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getDoc, legalDocs } from "@/content/legal";
import { LegalPage } from "@/components/blocks/LegalPage";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return legalDocs.map((d) => ({
    doc: d.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ doc: string }>;
}): Promise<Metadata> {
  const { doc } = await params;
  const d = getDoc(doc);

  if (!d) {
    return {
      title: "Page Not Found",
      robots: { index: false, follow: false },
    };
  }

  return pageMeta({
    title: d.title,
    description: d.description,
    path: `/${d.slug}`,
  });
}

async function LegalRouteContent({
  params,
}: {
  params: Promise<{ doc: string }>;
}) {
  const { doc } = await params;
  const d = getDoc(doc);

  if (!d) {
    notFound();
  }

  return <LegalPage doc={d} />;
}

export default function LegalRoute({
  params,
}: {
  params: Promise<{ doc: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LegalRouteContent params={params} />
    </Suspense>
  );
}
