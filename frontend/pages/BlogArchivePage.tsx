import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogSetupNotice } from "@/components/blog/BlogSetupNotice";
import { SectionHead } from "@/components/primitives/Section";
import { getPublishedPosts } from "@backend/blog/data";
import { hasPublicBlogConfig } from "@backend/blog/supabase";

const pageSize = 9;

export const metadata: Metadata = {
  title: "Journal",
  description: "Stories from Nyne Owls on design, software, original worlds and the work behind them.",
  alternates: { canonical: "/blog" },
};

async function JournalEntries({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  await connection();
  if (!hasPublicBlogConfig()) return <BlogSetupNotice />;

  const params = await searchParams;
  const requestedPage = Number(params.page);
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const { posts, total } = await getPublishedPosts(page, pageSize);
  const pageCount = Math.ceil(total / pageSize);

  if (pageCount > 0 && page > pageCount) {
    return (
      <div className="border border-line bg-card p-8 text-center">
        <h2 className="text-xl font-bold">That journal page does not exist.</h2>
        <Link href="/blog" className="mt-4 inline-block text-xs font-semibold underline underline-offset-4">Back to the latest articles</Link>
      </div>
    );
  }

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

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <section className="wrap py-[clamp(48px,8vw,96px)]">
      <div className="mb-[clamp(28px,5vw,52px)]">
        <SectionHead
          eyebrow="Nyne Owls Journal"
          title="Ideas, notes and things in progress."
          text="Stories from the studio on design, software, original worlds and the work behind them."
        />
      </div>
      <Suspense fallback={<div className="min-h-64 border border-line bg-card" aria-hidden />}>
        <JournalEntries searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
