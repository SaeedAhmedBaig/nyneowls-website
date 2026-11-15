import "server-only";

import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { Database } from "@backend/blog/database";

export function getBlogSetupIssues() {
  const missing: string[] = [];
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  if (!process.env.BLOG_ADMIN_EMAILS?.split(",").some((email) => email.trim())) {
    missing.push("BLOG_ADMIN_EMAILS");
  }
  return missing;
}

export function hasPublicBlogConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

function getPublicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase public environment variables are not configured.");
  return { url, key };
}

export function createPublicBlogClient() {
  const { url, key } = getPublicConfig();
  return createClient<Database>(url, key);
}

export async function createBlogSessionClient() {
  const { url, key } = getPublicConfig();
  const cookieStore = await cookies();
  return createServerClient<Database>(url, key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
    },
  });
}

export async function createBlogActionClient() {
  const { url, key } = getPublicConfig();
  const cookieStore = await cookies();
  return createServerClient<Database>(url, key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
      },
    },
  });
}

export function createBlogAdminClient() {
  const { url } = getPublicConfig();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");
  return createClient<Database>(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function isBlogAdmin() {
  if (getBlogSetupIssues().length > 0) return false;
  const supabase = await createBlogSessionClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Blog admin authentication failed:", error.message);
    throw new Error("Could not verify the blog admin session.");
  }
  const email = data.user?.email?.toLowerCase();
  if (!email) return false;
  const allowlist = (process.env.BLOG_ADMIN_EMAILS ?? "")
    .split(",")
    .map((address) => address.trim().toLowerCase())
    .filter(Boolean);
  return allowlist.includes(email);
}
