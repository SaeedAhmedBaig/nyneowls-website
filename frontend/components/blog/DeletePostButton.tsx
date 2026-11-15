"use client";

import { useActionState } from "react";
import { deleteBlogPost, type BlogActionState } from "@backend/blog/actions";

const initialState: BlogActionState = {};

export function DeletePostButton({ id }: { id: string }) {
  const [state, formAction, pending] = useActionState(deleteBlogPost, initialState);

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm("Delete this article and its citations? This cannot be undone.")) {
          event.preventDefault();
        }
      }}
      className="grid justify-items-start gap-1"
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={pending}
        className="text-xs font-semibold text-nyne-text underline underline-offset-4 disabled:opacity-60"
      >
        {pending ? "Deleting..." : "Delete"}
      </button>
      {state.error && <span role="alert" className="max-w-40 text-xs text-nyne-text">{state.error}</span>}
      {state.success && <span role="status" className="text-xs text-muted-foreground">{state.success}</span>}
    </form>
  );
}
