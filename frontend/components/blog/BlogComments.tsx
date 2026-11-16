"use client";

import { useState, type FormEvent } from "react";
import type { BlogComment } from "@backend/blog/database";

type Props = {
  slug: string;
  comments: BlogComment[];
};

export function BlogComments({ slug, comments }: Props) {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/blog-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, authorName: name, body, website }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "We could not submit your comment.");
      setName("");
      setBody("");
      setWebsite("");
      setStatus("sent");
      setMessage(result.message);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not submit your comment.");
    }
  };

  return (
    <section aria-labelledby="comments-title" className="grid gap-8 pt-8 min-[761px]:grid-cols-[1fr_.85fr]">
      <div>
        <h2 id="comments-title" className="text-2xl font-bold tracking-[-0.035em]">Join the conversation</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Comments are reviewed before they appear. Keep it relevant and respectful; please do not include private information.
        </p>
        <div className="mt-6 grid gap-5">
          {comments.length ? comments.map((comment) => (
            <article key={comment.id} className="border-t border-line pt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-bold">{comment.author_name}</h3>
                <time dateTime={comment.created_at} className="text-xs text-muted-foreground">
                  {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(comment.created_at))}
                </time>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{comment.body}</p>
            </article>
          )) : (
            <p className="border-t border-line pt-4 text-sm text-muted-foreground">No comments yet. You can start the conversation.</p>
          )}
        </div>
      </div>

      <form onSubmit={submit} className="grid content-start gap-4 border border-line bg-card p-5 min-[561px]:p-6">
        <label className="grid content-start gap-2 text-xs font-semibold">
          Display name
          <input
            className="h-[50px] w-full border border-line bg-paper px-3.5 py-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nyne"
            autoComplete="nickname"
            maxLength={80}
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label className="grid content-start gap-2 text-xs font-semibold">
          Your comment
          <textarea
            className="min-h-36 w-full resize-y border border-line bg-paper px-3.5 py-3 text-sm leading-6 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nyne"
            maxLength={2000}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            aria-describedby="comment-guidance"
            required
          />
        </label>
        <p id="comment-guidance" className="text-xs leading-5 text-muted-foreground">
          Your name and comment are stored for moderation. We do not ask for your email address.
        </p>
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`comment-website-${slug}`}>Leave this field empty</label>
          <input
            id={`comment-website-${slug}`}
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-11 items-center justify-center bg-ink px-5 text-xs font-semibold text-onink transition-colors hover:bg-nyne hover:text-white disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Submitting…" : "Submit for review"}
        </button>
        <p
          role={status === "error" ? "alert" : "status"}
          aria-live="polite"
          className={`min-h-5 text-xs leading-5 ${status === "error" ? "text-nyne-text" : "text-muted-foreground"}`}
        >
          {message}
        </p>
      </form>
    </section>
  );
}
