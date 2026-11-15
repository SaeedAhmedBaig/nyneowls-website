import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { connection } from "next/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogSetupNotice } from "@/components/blog/BlogSetupNotice";
import { getPublishedPost } from "@backend/blog/data";
import { sanitizeBlogHtml, readingTime } from "@backend/blog/content";
import { absoluteUrl } from "@/lib/seo";
import { hasPublicBlogConfig } from "@backend/blog/supabase";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!hasPublicBlogConfig()) return { title: "Journal" };
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Article not found" };

  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.published_at ?? undefined,
      authors: [post.author_name],
      ...(post.cover_image_url ? { images: [post.cover_image_url] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

async function Article({ params }: Props) {
  await connection();
  if (!hasPublicBlogConfig()) return <BlogSetupNotice />;
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const published = post.published_at
    ? new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date(post.published_at))
    : "";
  const canonical = absoluteUrl(`/blog/${post.slug}`);
  const safeBody = sanitizeBlogHtml(post.body_html);
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: canonical,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: post.author_name },
    publisher: { "@type": "Organization", name: "Nyne Owls" },
    url: canonical,
    ...(post.cover_image_url ? { image: [post.cover_image_url] } : {}),
    ...(post.citations.length ? { citation: post.citations.map((citation) => citation.url) } : {}),
  };

  return (
    <article className="wrap max-w-[920px] py-[clamp(40px,7vw,80px)]">
      <JsonLd data={schema} />
      <Link href="/blog" className="text-xs font-semibold text-muted-foreground underline underline-offset-4 hover:text-nyne-text">
        Back to the journal
      </Link>
      <header className="mt-8 border-b border-line pb-8">
        {post.tags.length > 0 && (
          <ul className="mb-5 flex flex-wrap gap-2" aria-label="Article topics">
            {post.tags.map((tag) => (
              <li key={tag} className="border border-line px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em]">{tag}</li>
            ))}
          </ul>
        )}
        <h1 className="text-[clamp(34px,7vw,68px)] font-bold leading-[1.02] tracking-[-0.05em]">{post.title}</h1>
        <p className="mt-5 max-w-[720px] text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
          {published && <time dateTime={post.published_at ?? undefined}>{published}</time>}
          <span>By {post.author_name}</span>
          <span>{readingTime(post.body_html)} min read</span>
        </div>
      </header>

      {post.cover_image_url && (
        <div
          role="img"
          aria-label={post.cover_image_alt || post.title}
          className="mt-8 aspect-[16/9] border border-line bg-card2 bg-cover bg-center"
          style={{ backgroundImage: `url("${post.cover_image_url.replaceAll('"', "%22")}")` }}
        />
      )}

      <div className="blog-article-body mt-9" dangerouslySetInnerHTML={{ __html: safeBody }} />

      {post.citations.length > 0 && (
        <section aria-labelledby="sources-heading" className="mt-12 border-t border-line pt-8">
          <h2 id="sources-heading" className="text-xl font-bold tracking-[-0.03em]">Sources and citations</h2>
          <ol className="mt-5 grid gap-4">
            {post.citations.map((citation) => (
              <li
                key={citation.id}
                id={`source-${citation.order_index + 1}`}
                value={citation.order_index + 1}
                className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-6"
              >
                <span className="font-bold text-nyne-text">[{citation.order_index + 1}]</span>
                <span>
                  {citation.author && <>{citation.author}. </>}
                  <a href={citation.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4 hover:text-nyne-text">
                    {citation.title}
                  </a>
                  {citation.publisher && <>. {citation.publisher}</>}
                  {citation.published_at && <>. Published {citation.published_at}</>}
                  {citation.accessed_at && <>. Accessed {citation.accessed_at}</>}
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}
      <div className="mt-12 border-t border-line pt-6">
        <Link href="/blog" className="text-xs font-semibold underline underline-offset-4 hover:text-nyne-text">More from the journal</Link>
      </div>
    </article>
  );
}

export default function BlogArticlePage({ params }: Props) {
  return (
    <Suspense fallback={<div className="wrap min-h-[60vh] py-16" aria-hidden />}>
      <Article params={params} />
    </Suspense>
  );
}
