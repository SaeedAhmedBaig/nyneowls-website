"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

type Props = { action: "confirm" | "unsubscribe" };
type Result = { ok: boolean; message?: string; error?: string };

function subscribeToHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function getHash() {
  return window.location.hash.slice(1);
}

export function NewsletterTokenAction({ action }: Props) {
  const fragment = useSyncExternalStore(subscribeToHash, getHash, () => "");
  const [status, setStatus] = useState<"ready" | "working" | "done" | "error">("ready");
  const [message, setMessage] = useState("");
  const [confirmationToken, unsubscribeToken, extra] = fragment.split(".");
  const token = action === "confirm"
    ? /^[a-f0-9]{64}$/i.test(confirmationToken ?? "") && /^[a-f0-9]{64}$/i.test(unsubscribeToken ?? "") && !extra
      ? confirmationToken
      : ""
    : /^[a-f0-9]{64}$/i.test(fragment) ? fragment : "";

  const submit = async () => {
    if (!token || status === "working") return;
    setStatus("working");
    setMessage("");
    try {
      const response = await fetch(`/api/newsletter/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action === "confirm" ? { token, unsubscribeToken } : { token }),
      });
      const result = await response.json() as Result;
      if (!response.ok || !result.ok) throw new Error(result.error || "We could not update your subscription.");
      setStatus("done");
      setMessage(result.message || "Your request is complete.");
      window.history.replaceState(null, "", window.location.pathname);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not update your subscription.");
    }
  };

  const hasToken = Boolean(token && (action === "unsubscribe" || (unsubscribeToken && !extra)));
  const heading = action === "confirm" ? "Confirm your subscription" : "Unsubscribe from the journal";

  return (
    <main className="wrap flex min-h-[60vh] items-center py-16">
      <section className="mx-auto w-full max-w-[560px] border border-line bg-card p-6 min-[561px]:p-9">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-nyne-text">Nyne Owls Journal</p>
        <h1 className="mt-3 text-[clamp(28px,5vw,42px)] font-bold leading-tight tracking-[-0.04em]">{heading}</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          {action === "confirm"
            ? "Confirm only if you asked to receive occasional design insights and journal updates."
            : "You can stop receiving journal updates at any time."}
        </p>
        {status === "ready" && (
          <button
            type="button"
            onClick={submit}
            disabled={!hasToken}
            className="mt-6 min-h-11 bg-ink px-5 text-xs font-semibold text-onink transition-colors hover:bg-nyne hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {!hasToken ? "This link is incomplete" : action === "confirm" ? "Confirm subscription" : "Unsubscribe"}
          </button>
        )}
        {status === "working" && <p className="mt-6 text-sm text-muted-foreground">Updating your preferences…</p>}
        {(status === "done" || status === "error") && (
          <p role={status === "error" ? "alert" : "status"} className="mt-6 text-sm leading-6 text-muted-foreground">{message}</p>
        )}
        {!hasToken && status === "ready" && (
          <p className="mt-3 text-sm text-muted-foreground">Open the full link from your email to continue.</p>
        )}
        <Link href="/blog" className="mt-7 inline-flex text-xs font-semibold underline underline-offset-4 hover:text-nyne-text">
          Return to the journal
        </Link>
      </section>
    </main>
  );
}
