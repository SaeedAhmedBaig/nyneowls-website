"use client";

import { useState } from "react";
import { AtSign, Share2 } from "lucide-react";

type Props = {
  title: string;
  url: string;
  image?: string;
};

function platformUrl(platform: string, title: string, url: string, image?: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  switch (platform) {
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case "x":
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case "whatsapp":
      return `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
    case "pinterest":
      return `https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodeURIComponent(image ?? "")}&description=${encodedTitle}`;
    default:
      return `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
  }
}

export function BlogShare({ title, url, image }: Props) {
  const [message, setMessage] = useState("");

  const copyLink = async (label: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setMessage(label);
    } catch {
      setMessage("Copy was unavailable in this browser. You can copy the article address from the address bar.");
    }
  };

  const share = async () => {
    if (!navigator.share) {
      await copyLink("Article link copied.");
      return;
    }
    try {
      await navigator.share({ title, text: title, url });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setMessage("Sharing was unavailable. Choose a service below or copy the link.");
    }
  };

  const links = [
    { label: "Facebook", platform: "facebook", mark: "f" },
    { label: "X", platform: "x", mark: "X" },
    { label: "LinkedIn", platform: "linkedin", mark: "in" },
    { label: "WhatsApp", platform: "whatsapp", mark: "w" },
    { label: "Pinterest", platform: "pinterest", mark: "P" },
    { label: "Email", platform: "email", mark: null },
  ];

  return (
    <section aria-labelledby="share-article-title" className="grid gap-4 border-b border-line pb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 id="share-article-title" className="text-xl font-bold tracking-[-0.03em]">Pass this along</h2>
          <p className="mt-1 text-sm text-muted-foreground">Share the article with someone who may find it useful.</p>
        </div>
        <button
          type="button"
          onClick={share}
          className="inline-flex min-h-11 items-center gap-2 border border-ink bg-ink px-4 text-xs font-semibold text-onink transition-colors hover:border-nyne hover:bg-nyne"
        >
          <Share2 className="size-4" aria-hidden />
          Share article
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => copyLink("Article link copied.")}
          className="inline-flex min-h-10 items-center gap-2 border border-line px-3 text-xs font-semibold transition-colors hover:bg-card"
        >
          <Share2 className="size-4" aria-hidden />
          Copy link
        </button>
        {links.map(({ label, platform, mark }) => (
          <a
            key={platform}
            href={platformUrl(platform, title, url, image)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label}`}
            className="inline-flex min-h-10 items-center gap-2 border border-line px-3 text-xs font-semibold transition-colors hover:border-nyne hover:bg-card"
          >
            {mark ? (
              <span aria-hidden className="flex size-4 items-center justify-center text-[11px] font-bold">{mark}</span>
            ) : <AtSign className="size-4" aria-hidden />}
            {label}
          </a>
        ))}
        <button
          type="button"
          onClick={() => copyLink("Link copied. Paste it into your Instagram post, Story or message.")}
          className="inline-flex min-h-10 items-center gap-2 border border-line px-3 text-xs font-semibold transition-colors hover:bg-card"
          aria-label="Copy link to share on Instagram"
        >
          <span aria-hidden className="flex size-4 items-center justify-center text-[9px] font-bold">IG</span>
          Instagram
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-5 text-xs text-muted-foreground">{message}</p>
    </section>
  );
}
