import Link from "next/link";
import { BlogEditor } from "@/components/blog/BlogEditor";

export default function NewBlogPostPage() {
  return (
    <section className="wrap py-[clamp(44px,7vw,80px)]">
      <div className="mb-8">
        <Link href="/admin" className="text-xs font-semibold text-muted-foreground underline underline-offset-4">
          Back to articles
        </Link>
        <h1 className="mt-5 text-[clamp(32px,5vw,48px)] font-bold tracking-[-0.045em]">Create article</h1>
      </div>
      <BlogEditor />
    </section>
  );
}
