import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogEditor } from "@/components/blog/BlogEditor";
import { getAdminPost } from "@backend/blog/data";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();

  const post = await getAdminPost(id);
  if (!post) notFound();

  return (
    <section className="wrap py-[clamp(44px,7vw,80px)]">
      <div className="mb-8">
        <Link href="/admin" className="text-xs font-semibold text-muted-foreground underline underline-offset-4">
          Back to articles
        </Link>
        <h1 className="mt-5 text-[clamp(32px,5vw,48px)] font-bold tracking-[-0.045em]">Edit article</h1>
      </div>
      <BlogEditor post={post} />
    </section>
  );
}
