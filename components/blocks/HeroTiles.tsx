import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const tiles = [
  { n: "01", title: "Creative", sub: "Identity · Design · Art Direction", href: "/creative-studio", cls: "bg-nyne text-white" },
  { n: "02", title: "Digital", sub: "Resources · Products · Tools", href: "/digital-goods", cls: "bg-dark text-white" },
  { n: "03", title: "Solutions", sub: "Software · Systems · Technology", href: "/digital-solutions", cls: "bg-card2 text-ink" },
  { n: "04", title: "Stories", sub: "Original Worlds · Comics · Publishing", href: "/stories-comics", cls: "bg-card text-ink" },
];

export function HeroTiles() {
  return (
    <div className="w-full max-w-[600px]">
      <div className="mb-[13px] flex justify-between gap-3 text-[9px] font-bold tracking-[0.11em] text-muted-foreground">
        <span>WHAT WE BRING TO THE WORLD</span>
        <span>NO. 001 — 004</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {tiles.map((t) => (
          <Link
            key={t.n}
            href={t.href}
            className={`flex min-h-[135px] flex-col justify-between p-[13px] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_#0000001f] min-[421px]:min-h-[150px] min-[421px]:p-[19px] min-[761px]:min-h-[200px] ${t.cls}`}
          >
            <div className="flex items-center justify-between text-[9px] font-bold tracking-[0.1em] opacity-80">
              <span>{t.n} / 04</span>
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
        <span>FOUR CREATIVE WORLDS.</span>
      </div>
    </div>
  );
}