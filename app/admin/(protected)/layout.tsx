import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutBlogAdmin } from "@backend/blog/auth";
import { isBlogAdmin } from "@backend/blog/supabase";

export const instant = false;

export default async function BlogAdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!(await isBlogAdmin())) redirect("/admin/login");

  return (
    <>
      <section className="border-b border-line bg-card">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-4">
          <nav aria-label="Blog admin" className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold">
            <Link href="/admin" className="hover:text-nyne-text">Dashboard</Link>
            <Link href="/admin/blog/new" className="hover:text-nyne-text">New article</Link>
            <Link href="/blog" className="text-muted-foreground hover:text-nyne-text">View journal</Link>
          </nav>
          <form action={signOutBlogAdmin}>
            <button type="submit" className="text-xs font-semibold text-muted-foreground underline underline-offset-4 hover:text-nyne-text">
              Sign out
            </button>
          </form>
        </div>
      </section>
      {children}
    </>
  );
}
