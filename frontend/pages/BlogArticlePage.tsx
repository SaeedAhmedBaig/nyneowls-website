import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { connection } from "next/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogSetupNotice } from "@/components/blog/BlogSetupNotice";
import { BlogComments } from "@/components/blog/BlogComments";
import { BlogShare } from "@/components/blog/BlogShare";
import AnimatedContent from "@/components/AnimatedContent";
import { getPublishedPost } from "@backend/blog/data";
import { getApprovedBlogComments } from "@backend/blog/data";
import { sanitizeBlogHtml, readingTime } from "@backend/blog/content";
import { absoluteUrl, SITE } from "@/lib/seo";
import { hasPublicBlogConfig } from "@backend/blog/supabase";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!hasPublicBlogConfig()) {
    return { title: "Journal", robots: { index: false, follow: true } };
  }
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Article not found", robots: { index: false, follow: false } };

  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt;
  const image = post.cover_image_url || absoluteUrl("/opengraph-image");
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      siteName: SITE.name,
      locale: "en_GB",
      title: `${title} | ${SITE.name}`,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.published_at ?? undefined,
      authors: [post.author_name],
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      images: [image],
    },
  };
}

async function Article({ params }: Props) {
  await connection();
  if (!hasPublicBlogConfig()) return <BlogSetupNotice />;
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();
  const comments = await getApprovedBlogComments(post.id);

  const published = post.published_at
    ? new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date(post.published_at))
    : "";
  const updatedAt =
    post.published_at &&
    new Date(post.updated_at).toISOString().slice(0, 10) !==
      new Date(post.published_at).toISOString().slice(0, 10)
      ? post.updated_at
      : undefined;
  const canonical = absoluteUrl(`/blog/${post.slug}`);
  const safeBody = sanitizeBlogHtml(post.body_html);
  const isOrganizationAuthor =
    post.author_name === SITE.name || post.author_name === "Nyne Owls Studio";
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: canonical,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    ...(updatedAt ? { dateModified: updatedAt } : {}),
    author: isOrganizationAuthor
      ? { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: SITE.name }
      : { "@type": "Person", name: post.author_name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: SITE.logo },
    },
    url: canonical,
    inLanguage: "en-GB",
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
          {updatedAt && (
            <time dateTime={updatedAt}>
              Updated {new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date(updatedAt))}
            </time>
          )}
          <span>By {post.author_name}</span>
          <span>{readingTime(post.body_html)} min read</span>
        </div>
      </header>

      {post.cover_image_url && (
        <div className="relative mt-8 aspect-[16/9] border border-line bg-card2">
          <Image
            src={post.cover_image_url}
            alt={post.cover_image_alt || post.title}
            fill
            sizes="(min-width: 920px) 920px, 100vw"
            unoptimized
            className="object-cover"
          />
        </div>
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
      <div className="mt-12 border-t border-line pt-8">
        <AnimatedContent distance={18} duration={0.55} threshold={0.12} className="grid gap-10">
          <BlogShare title={post.title} url={canonical} image={post.cover_image_url || undefined} />
          <BlogComments slug={post.slug} comments={comments} />
        </AnimatedContent>
      </div>
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
