"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signInBlogAdmin, type LoginState } from "@backend/blog/auth";

const initialState: LoginState = {};
const inputClass =
  "w-full border border-line bg-paper px-4 py-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nyne";

export function BlogLoginForm() {
  const [state, formAction, pending] = useActionState(signInBlogAdmin, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="grid gap-5">
      <label className="grid gap-2 text-xs font-semibold">
        Email
        <input className={inputClass} name="email" type="email" autoComplete="username" required />
      </label>
      <div className="grid gap-2 text-xs font-semibold">
        <label htmlFor="admin-password">Password</label>
        <div className="relative">
          <input
            id="admin-password"
            className={`${inputClass} pr-12`}
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-controls="admin-password"
            onClick={() => setShowPassword((visible) => !visible)}
            className="absolute inset-y-0 right-0 inline-flex min-h-11 w-11 items-center justify-center text-muted-foreground transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nyne"
          >
            {showPassword ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
          </button>
        </div>
      </div>
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
