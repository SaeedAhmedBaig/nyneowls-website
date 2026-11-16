"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export function NewsletterSignup({ source = "footer" }: { source?: "blog" | "footer" }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent, source }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "We could not process your subscription.");
      setEmail("");
      setConsent(false);
      setStatus("sent");
      setMessage(result.message);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not process your subscription.");
    }
  };

  return (
    <section aria-labelledby={`newsletter-title-${source}`} className="grid gap-5 border border-line bg-card p-5 min-[761px]:grid-cols-[.8fr_1.2fr] min-[761px]:items-center min-[761px]:p-7">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-nyne-text">Occasional notes, no noise</p>
        <h2 id={`newsletter-title-${source}`} className="mt-2 text-xl font-bold tracking-[-0.03em]">A little more thoughtful design in your inbox.</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">New journal articles and practical ideas on brand, graphic and digital design. Unsubscribe any time.</p>
      </div>
      <form onSubmit={submit} className="grid gap-3">
        <label htmlFor={`newsletter-email-${source}`} className="text-xs font-semibold">Email address</label>
        <div className="grid gap-2 min-[561px]:grid-cols-[1fr_auto]">
          <input
            id={`newsletter-email-${source}`}
            type="email"
            autoComplete="email"
            className="h-[50px] min-w-0 border border-line bg-paper px-3.5 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nyne"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="min-h-[50px] bg-ink px-5 text-xs font-semibold text-onink transition-colors hover:bg-nyne hover:text-white disabled:opacity-60"
          >
            {status === "sending" ? "Joining…" : "Join the journal"}
          </button>
        </div>
        <label className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
          <input
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 accent-nyne"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            required
          />
          <span>
            Email me occasional Nyne Owls journal and design updates. I agree to the{" "}
            <Link href="/privacy" className="font-semibold underline underline-offset-2 hover:text-nyne-text">Privacy Policy</Link>.
            I will confirm my address by email.
          </span>
        </label>
        <p role={status === "error" ? "alert" : "status"} aria-live="polite" className={`min-h-5 text-xs ${status === "error" ? "text-nyne-text" : "text-muted-foreground"}`}>
          {message}
        </p>
      </form>
    </section>
  );
}
