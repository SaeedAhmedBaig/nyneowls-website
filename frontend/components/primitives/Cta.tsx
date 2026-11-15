import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CtaButton({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-[46px] items-center gap-3 bg-ink px-5 py-4 text-xs font-semibold text-onink transition-colors hover:bg-nyne hover:text-white ${className}`}
    >
      {children} <ArrowUpRight className="size-3.5" aria-hidden />
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-xs font-bold transition-colors hover:text-nyne-text"
    >
      {children} <ArrowUpRight className="size-3.5" aria-hidden />
    </Link>
  );
}