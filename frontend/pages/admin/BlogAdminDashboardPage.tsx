import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { DeletePostButton } from "@/components/blog/DeletePostButton";
import { getAdminPosts } from "@backend/blog/data";

async function BlogAdminPosts() {
  await connection();
  const allPosts = await getAdminPosts();
  const published = allPosts.filter((post) => post.status === "published").length;
  const drafts = allPosts.length - published;
  const date = (value: string | null) =>
    value
      ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(value))
      : "Not published";

  return (
    <section className="wrap py-[clamp(44px,7vw,80px)]">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-nyne-text">Journal CMS</p>
          <h1 className="text-[clamp(34px,6vw,56px)] font-bold leading-[1.05] tracking-[-0.045em]">Articles</h1>
          <p className="mt-3 text-sm text-muted-foreground">Manage drafts, published stories, sources and metadata.</p>
        </div>
        <Link href="/admin/blog/new" className="inline-flex min-h-12 items-center bg-ink px-5 text-sm font-semibold text-onink hover:bg-nyne hover:text-white">
          Create article
        </Link>
      </div>

      <dl className="mb-8 grid gap-3 min-[561px]:grid-cols-3">
        {[
          ["Total articles", allPosts.length],
          ["Published", published],
          ["Drafts", drafts],
        ].map(([label, count]) => (
          <div key={label} className="border border-line bg-card p-5">
            <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{label}</dt>
            <dd className="mt-2 text-3xl font-bold tracking-[-0.04em]">{count}</dd>
          </div>
        ))}
      </dl>

      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-card text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-3">Article</th>
              <th scope="col" className="px-4 py-3">Status</th>
              <th scope="col" className="px-4 py-3">Updated</th>
              <th scope="col" className="px-4 py-3">Published</th>
              <th scope="col" className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allPosts.map((post) => (
              <tr key={post.id} className="border-t border-line">
                <th scope="row" className="px-4 py-4 font-semibold">
                  <Link href={`/admin/blog/${post.id}`} className="hover:text-nyne-text">{post.title}</Link>
                  <span className="mt-1 block font-normal text-muted-foreground">/blog/{post.slug}</span>
                </th>
                <td className="px-4 py-4">
                  <span className={`inline-flex border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${post.status === "published" ? "border-line" : "border-dashed border-line text-muted-foreground"}`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-muted-foreground">{date(post.updated_at)}</td>
                <td className="px-4 py-4 text-muted-foreground">{date(post.published_at)}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-4">
                    <Link href={`/admin/blog/${post.id}`} className="text-xs font-semibold underline underline-offset-4">Edit</Link>
                    <DeletePostButton id={post.id} />
                  </div>
                </td>
              </tr>
            ))}
            {!allPosts.length && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-sm text-muted-foreground">
                  No articles yet. Create a draft or publish your first story.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Showing the latest 100 articles.</p>
    </section>
  );
}

export default function BlogAdminPage() {
  return (
    <Suspense fallback={<div className="wrap min-h-64 py-16" aria-hidden />}>
      <BlogAdminPosts />
    </Suspense>
  );
}
