import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const tiles = [
  { n: "01", title: "Studio", sub: "Identity · Design · Art Direction", href: "/studio", cls: "bg-nyne text-white" },
  { n: "02", title: "Products", sub: "Software · Systems · Technology", href: "/products", cls: "bg-dark text-white" },
  { n: "03", title: "Originals", sub: "Original Manga · New Worlds · Stories", href: "/originals", cls: "bg-card2 text-ink" },
];
const tileCount = String(tiles.length).padStart(2, "0");

export function HeroTiles() {
  return (
    <div className="w-full max-w-[600px]">
      <div className="mb-[13px] flex justify-between gap-3 text-[9px] font-bold tracking-[0.11em] text-muted-foreground">
        <span>WHAT WE BRING TO THE WORLD</span>
        <span>NO. 001 — 003</span>
      </div>
      <div className="grid grid-cols-1 gap-2.5 min-[561px]:grid-cols-3">
        {tiles.map((t) => (
          <Link
            key={t.n}
            href={t.href}
            className={`flex min-h-[135px] flex-col justify-between p-[13px] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_#0000001f] min-[421px]:min-h-[150px] min-[421px]:p-[19px] min-[761px]:min-h-[200px] ${t.cls}`}
          >
            <div className="flex items-center justify-between text-[9px] font-bold tracking-[0.1em] opacity-80">
              <span>{t.n} / {tileCount}</span>
              <ArrowUpRight className="size-3.5" aria-hidden />
            </div>
            <div>
              <h2 className="mb-[7px] text-[clamp(26px,3vw,37px)] font-bold tracking-[-0.05em]">{t.title}</h2>
              <p className="text-[11px] leading-[1.5] opacity-75 min-[421px]:text-xs">{t.sub}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-[13px] flex justify-between gap-3 text-[9px] font-bold tracking-[0.11em] text-muted-foreground">
        <span>ONE COMPANY.</span>
        <span>THREE PRACTICE AREAS.</span>
      </div>
    </div>
  );
}