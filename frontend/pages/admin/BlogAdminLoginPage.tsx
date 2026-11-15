import Link from "next/link";
import { connection } from "next/server";
import { BlogLoginForm } from "@/components/blog/BlogLoginForm";
import { getBlogSetupIssues } from "@backend/blog/supabase";

export default async function BlogAdminLoginPage() {
  await connection();
  const missing = getBlogSetupIssues();

  return (
    <section className="wrap py-[clamp(56px,9vw,112px)]">
      <div className="mx-auto max-w-[500px] border border-line bg-card p-6 min-[561px]:p-10">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-nyne-text">Nyne Owls Journal</p>
        <h1 className="text-3xl font-bold tracking-[-0.04em]">Admin sign in</h1>
        <p className="mb-7 mt-3 text-sm leading-7 text-muted-foreground">
          This area is for authorised editors only.
        </p>
        {missing.length ? (
          <div role="status" className="border border-line bg-paper p-4 text-sm leading-6">
            <p className="font-semibold">Blog publishing is not configured yet.</p>
            <p className="mt-2 text-muted-foreground">
              Add the required values from <code>.env.example</code>, then apply the blog migration in Supabase.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Missing settings: {missing.join(", ")}.
            </p>
          </div>
        ) : (
          <BlogLoginForm />
        )}
        <Link href="/blog" className="mt-6 inline-block text-xs font-semibold underline underline-offset-4">
          Return to the journal
        </Link>
      </div>
    </section>
  );
}
