import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@backend/blog/database";
import { readingTime } from "@backend/blog/content";

export function BlogPostCard({ post }: { post: BlogPost }) {
  const published = post.published_at
    ? new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date(post.published_at))
    : "";
  const minutes = readingTime(post.body_html);

  return (
    <article className="group flex flex-col border border-line bg-card transition-[border-color,transform] hover:-translate-y-1 hover:border-nyne">
      {post.cover_image_url && (
        <div className="relative aspect-[16/9] border-b border-line bg-card2">
          <Image
            src={post.cover_image_url}
            alt={post.cover_image_alt || post.title}
            fill
            sizes="(min-width: 1101px) 33vw, (min-width: 561px) 50vw, 100vw"
            unoptimized
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5 min-[761px]:p-6">
        <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
          {published && <time dateTime={post.published_at ?? undefined}>{published}</time>}
          <span>{minutes} min read</span>
        </div>
        <h2 className="text-xl font-bold leading-tight tracking-[-0.03em]">
          <Link href={`/blog/${post.slug}`} className="transition-colors group-hover:text-nyne-text">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
        {post.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Article topics">
            {post.tags.map((tag) => (
              <li key={tag} className="border border-line px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em]">
                {tag}
              </li>
            ))}
          </ul>
        )}
        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto inline-flex items-center gap-2 border-t border-line pt-5 text-xs font-bold transition-colors hover:text-nyne-text"
        >
          Read article <span aria-hidden>↗</span>
        </Link>
      </div>
    </article>
  );
}
