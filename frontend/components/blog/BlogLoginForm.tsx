"use client";

import { useActionState } from "react";
import { signInBlogAdmin, type LoginState } from "@backend/blog/auth";

const initialState: LoginState = {};
const inputClass =
  "w-full border border-line bg-paper px-4 py-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nyne";

export function BlogLoginForm() {
  const [state, formAction, pending] = useActionState(signInBlogAdmin, initialState);

  return (
    <form action={formAction} className="grid gap-5">
      <label className="grid gap-2 text-xs font-semibold">
        Email
        <input className={inputClass} name="email" type="email" autoComplete="username" required />
      </label>
      <label className="grid gap-2 text-xs font-semibold">
        Password
        <input className={inputClass} name="password" type="password" autoComplete="current-password" required />
      </label>
      {state.error && <p role="alert" className="text-sm text-nyne-text">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="min-h-12 bg-ink px-5 text-sm font-semibold text-onink transition-colors hover:bg-nyne hover:text-white disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
