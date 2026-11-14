"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/primitives/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { mainNav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper">
      <div className="wrap">
        <div className="flex min-h-[68px] items-center justify-between gap-3 min-[761px]:min-h-[76px]">
          <Logo />

          <nav
            aria-label="Main navigation"
            className="mx-auto hidden gap-[clamp(14px,2vw,30px)] min-[1101px]:flex"
          >
            {mainNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-xs font-semibold transition-colors hover:text-nyne-text ${
                    active ? "text-nyne-text" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden h-11 items-center gap-3 bg-ink px-5 text-xs font-semibold text-onink transition-colors hover:bg-nyne hover:text-white min-[761px]:inline-flex"
            >
              Let’s talk <ArrowUpRight className="size-3.5" aria-hidden />
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
            className="flex flex-col border-t border-line pb-4 pt-1 min-[1101px]:hidden"
          >
            {[...mainNav, { label: "Contact", href: "/contact" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center justify-between border-b border-line py-3 text-sm font-semibold"
              >
                {item.label}
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}