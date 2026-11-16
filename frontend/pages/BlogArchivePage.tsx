import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { connection } from "next/server";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogSetupNotice } from "@/components/blog/BlogSetupNotice";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionHead } from "@/components/primitives/Section";
import { PageStructuredData } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/seo";
import { getPublishedPosts } from "@backend/blog/data";
import { hasPublicBlogConfig } from "@backend/blog/supabase";

const pageSize = 9;
const description =
  "Articles from Nyne Owls on brand and graphic design, retail software, original comics, and the work behind them.";

type PageSearchParams = Promise<{ page?: string | string[] }>;

function getPageNumber(value?: string | string[]) {
  const parsed = Number(Array.isArray(value) ? value[0] : value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1;
}

export async function generateMetadata({ searchParams }: { searchParams: PageSearchParams }) {
  const params = await searchParams;
  const page = getPageNumber(params.page);
  return {
    ...pageMeta({
      title: page > 1 ? `Journal — Page ${page}` : "Journal",
      description,
      path: page > 1 ? `/blog?page=${page}` : "/blog",
    }),
    ...(!hasPublicBlogConfig() ? { robots: { index: false, follow: true } } : {}),
  };
}

async function JournalEntries({ searchParams }: { searchParams: PageSearchParams }) {
  await connection();
  if (!hasPublicBlogConfig()) return <BlogSetupNotice />;

  const params = await searchParams;
  const page = getPageNumber(params.page);
  const { posts, total } = await getPublishedPosts(page, pageSize);
  const pageCount = Math.ceil(total / pageSize);

  if (page > Math.max(1, pageCount)) notFound();

  return (
    <>
      {posts.length ? (
        <div className="grid gap-4 min-[561px]:grid-cols-2 min-[1101px]:grid-cols-3">
          {posts.map((post) => <BlogPostCard key={post.id} post={post} />)}
        </div>
      ) : (
        <div className="border border-line bg-card p-8 text-center">
          <h2 className="text-xl font-bold">No articles yet.</h2>
          <p className="mt-2 text-sm text-muted-foreground">New stories and notes will appear here.</p>
        </div>
      )}
      {pageCount > 1 && (
        <nav aria-label="Journal pages" className="mt-9 flex items-center justify-between border-t border-line pt-5">
          {page > 1 ? (
            <Link href={`/blog?page=${page - 1}`} className="text-xs font-semibold underline underline-offset-4">Newer articles</Link>
          ) : <span />}
          <span className="text-xs text-muted-foreground">Page {page} of {pageCount}</span>
          {page < pageCount ? (
            <Link href={`/blog?page=${page + 1}`} className="text-xs font-semibold underline underline-offset-4">Older articles</Link>
          ) : <span />}
        </nav>
      )}
    </>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) {
  const params = await searchParams;
  const page = getPageNumber(params.page);
  return (
    <section className="wrap py-[clamp(48px,8vw,96px)]">
      <PageStructuredData
        name={page > 1 ? `Nyne Owls Journal — Page ${page}` : "Nyne Owls Journal"}
        description={description}
        path={page > 1 ? `/blog?page=${page}` : "/blog"}
        type="CollectionPage"
      />
      <div className="mb-[clamp(28px,5vw,52px)]">
        <SectionHead
          headingLevel="h1"
          eyebrow="Nyne Owls Journal"
          title="Articles on design, software, and original stories."
          text={description}
        />
      </div>
      <Reveal>
        <Suspense fallback={<div className="min-h-64 border border-line bg-card" aria-hidden />}>
          <JournalEntries searchParams={searchParams} />
        </Suspense>
      </Reveal>
    </section>
  );
}
