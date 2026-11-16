"use client";

import { useActionState } from "react";
import { moderateBlogComment, type CommentModerationState } from "@backend/blog/comments";

const initialState: CommentModerationState = {};

export function CommentModerationActions({ id, status }: { id: string; status: string }) {
  const [state, formAction, pending] = useActionState(moderateBlogComment, initialState);

  const actionForm = (nextStatus: "approved" | "rejected", label: string) => (
    <form key={nextStatus} action={formAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={nextStatus} />
      <button
        type="submit"
        disabled={pending}
        className="min-h-9 border border-line px-3 text-xs font-semibold transition-colors hover:bg-card disabled:opacity-50"
      >
        {label}
      </button>
    </form>
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      {status !== "approved" && actionForm("approved", status === "rejected" ? "Restore" : "Approve")}
      {status !== "rejected" && actionForm("rejected", "Reject")}
      <p aria-live="polite" className={`text-xs ${state.error ? "text-nyne-text" : "text-muted-foreground"}`}>
        {state.error || state.success || (pending ? "Saving…" : "")}
      </p>
    </div>
  );
}
