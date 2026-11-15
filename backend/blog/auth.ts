"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createBlogActionClient } from "@backend/blog/supabase";

export type LoginState = { error?: string };

const credentialsSchema = z.object({
  email: z.string().trim().email().max(200),
  password: z.string().min(1).max(200),
});

export async function signInBlogAdmin(
  _previousState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: "Enter a valid email address and password." };

  try {
    const supabase = await createBlogActionClient();
    const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
    if (error || !data.user) return { error: "The email or password was not accepted." };

    const admins = (process.env.BLOG_ADMIN_EMAILS ?? "")
      .split(",")
      .map((address) => address.trim().toLowerCase())
      .filter(Boolean);
    if (!data.user.email || !admins.includes(data.user.email.toLowerCase())) {
      await supabase.auth.signOut();
      return { error: "This account is not authorised to manage blog posts." };
    }
  } catch (error) {
    console.error("Could not sign in to blog admin:", error);
    return { error: "Could not sign in. Check the Supabase setup and try again." };
  }

  redirect("/admin");
}

export async function signOutBlogAdmin() {
  const supabase = await createBlogActionClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Could not sign out blog admin:", error.message);
    throw new Error("Could not sign out.");
  }
  redirect("/admin/login");
}
