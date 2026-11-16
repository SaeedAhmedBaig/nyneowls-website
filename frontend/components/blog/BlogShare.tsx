"use client";

import { useState } from "react";
import { Copy, Mail, Share2 } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

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
    { label: "Facebook", platform: "facebook", icon: <FaFacebookF className="size-4" aria-hidden /> },
    { label: "X", platform: "x", icon: <FaXTwitter className="size-4" aria-hidden /> },
    { label: "LinkedIn", platform: "linkedin", icon: <FaLinkedinIn className="size-4" aria-hidden /> },
    { label: "WhatsApp", platform: "whatsapp", icon: <FaWhatsapp className="size-4" aria-hidden /> },
    { label: "Pinterest", platform: "pinterest", icon: <FaPinterestP className="size-4" aria-hidden /> },
    { label: "Email", platform: "email", icon: <Mail className="size-4" aria-hidden /> },
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
          className="ml-auto inline-flex min-h-11 items-center gap-2 border border-ink bg-ink px-4 text-xs font-semibold text-onink transition-colors hover:border-nyne hover:bg-nyne"
        >
          <Share2 className="size-4" aria-hidden />
          Share article
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 min-[561px]:grid-cols-4 min-[1000px]:grid-cols-8">
        <button
          type="button"
          onClick={() => copyLink("Article link copied.")}
          className="inline-flex min-h-10 w-full items-center justify-center gap-2 border border-line px-2 text-[11px] font-semibold transition-colors hover:bg-card"
        >
          <Copy className="size-4 shrink-0" aria-hidden />
          Copy link
        </button>
        {links.map(({ label, platform, icon }) => (
          <a
            key={platform}
            href={platformUrl(platform, title, url, image)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label}`}
            className="inline-flex min-h-10 w-full items-center justify-center gap-2 border border-line px-2 text-[11px] font-semibold transition-colors hover:border-nyne hover:bg-card"
          >
            {icon}
            {label}
          </a>
        ))}
        <button
          type="button"
          onClick={() => copyLink("Link copied. Paste it into your Instagram post, Story or message.")}
          className="inline-flex min-h-10 w-full items-center justify-center gap-2 border border-line px-2 text-[11px] font-semibold transition-colors hover:bg-card"
          aria-label="Copy link to share on Instagram"
        >
          <FaInstagram className="size-4 shrink-0" aria-hidden />
          Instagram
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-5 text-xs text-muted-foreground">{message}</p>
    </section>
  );
}
