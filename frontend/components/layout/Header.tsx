"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/primitives/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { mainNav } from "@/lib/site";
import { SITE_CTA } from "@/lib/cta";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper">
      <div className="wrap">
        <div className="flex min-h-[68px] items-center justify-between gap-3 min-[761px]:min-h-[76px]">
          <Logo />

          <nav
            aria-label="Main navigation"
            className="mx-auto hidden gap-[clamp(18px,2.4vw,34px)] min-[1101px]:flex"
          >
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`text-xs font-semibold transition-colors hover:text-nyne-text ${
                  isActive(item.href) ? "text-nyne-text" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={SITE_CTA.href}
              className="hidden h-11 items-center gap-3 bg-ink px-5 text-xs font-semibold text-onink transition-colors hover:bg-nyne hover:text-white min-[761px]:inline-flex"
            >
              {SITE_CTA.label} <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((o) => !o)}
              className="grid size-11 place-items-center border border-line text-ink min-[1101px]:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            className="flex flex-col border-t border-line pb-5 pt-1 min-[1101px]:hidden"
          >
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="flex min-h-14 items-center justify-between gap-4 border-b border-line py-3"
              >
                <span>
                  <span
                    className={`block text-[15px] font-semibold ${
                      isActive(item.href) ? "text-nyne-text" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.hint && (
                    <span className="mt-0.5 block text-xs text-muted-foreground">{item.hint}</span>
                  )}
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              </Link>
            ))}
            <Link
              href={SITE_CTA.href}
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex min-h-12 items-center justify-center gap-3 bg-ink px-5 text-xs font-semibold text-onink transition-colors hover:bg-nyne hover:text-white"
            >
              {SITE_CTA.label} <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}