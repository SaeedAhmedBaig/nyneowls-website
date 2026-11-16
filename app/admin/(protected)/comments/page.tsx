import Link from "next/link";
import { connection } from "next/server";
import { CommentModerationActions } from "@/components/blog/CommentModerationActions";
import { getAdminBlogComments } from "@backend/blog/data";

export const metadata = { title: "Comment moderation | Nyne Owls" };

export default async function BlogCommentsAdminPage() {
  await connection();
  const comments = await getAdminBlogComments();
  const pendingCount = comments.filter((comment) => comment.status === "pending").length;

  return (
    <section className="wrap py-[clamp(44px,7vw,80px)]">
      <div className="mb-9">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-nyne-text">Journal CMS</p>
        <h1 className="text-[clamp(34px,6vw,56px)] font-bold leading-[1.05] tracking-[-0.045em]">Comment moderation</h1>
        <p className="mt-3 text-sm text-muted-foreground">{pendingCount} awaiting review. Comments stay hidden until approved.</p>
      </div>
      <div className="grid gap-4">
        {comments.map((comment) => (
          <article key={comment.id} className="border border-line bg-card p-5 min-[561px]:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold">{comment.author_name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {comment.post ? (
                    <Link href={`/blog/${comment.post.slug}`} className="underline underline-offset-2 hover:text-nyne-text">
                      {comment.post.title}
                    </Link>
                  ) : "Article unavailable"}
                  {" · "}
                  {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(comment.created_at))}
                </p>
              </div>
              <span className="border border-line px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em]">{comment.status}</span>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{comment.body}</p>
            <div className="mt-4 border-t border-line pt-4">
              <CommentModerationActions id={comment.id} status={comment.status} />
            </div>
          </article>
        ))}
        {!comments.length && <p className="border border-line bg-card p-8 text-center text-sm text-muted-foreground">No comments have been submitted yet.</p>}
      </div>
      <Link href="/admin" className="mt-7 inline-flex text-xs font-semibold underline underline-offset-4 hover:text-nyne-text">Back to articles</Link>
    </section>
  );
}
