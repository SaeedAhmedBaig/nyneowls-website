import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { Tag } from "@/components/primitives/Tag";

export type PathItem = {
  need: string;
  title: string;
  text: string;
  status: string;
  href: string;
};

export function Paths({ items }: { items: PathItem[] }) {
  return (
    <Reveal className="border-t border-line">
      {items.map((p, i) => (
        <Link
          key={p.href}
          href={p.href}
          className="group relative grid gap-x-8 gap-y-3 border-b border-line px-1 py-7 transition-colors hover:bg-card min-[901px]:grid-cols-[48px_1fr_1.2fr] min-[901px]:px-3 min-[901px]:py-8 min-[1101px]:grid-cols-[56px_1.1fr_1.2fr_auto_32px] min-[1101px]:items-center"
        >
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-nyne transition-transform duration-300 group-hover:scale-y-100"
          />
          <span className="text-[11px] font-bold tracking-[0.12em] text-nyne-text min-[901px]:pt-2 min-[1101px]:pt-0">
            {String(i + 1).padStart(2, "0")}
          </span>

          <div>
            <p className="text-[13px] font-semibold text-muted-foreground">{p.need}</p>
            <h3 className="mt-1 text-[clamp(22px,2.4vw,32px)] font-bold tracking-[-0.03em]">{p.title}</h3>
          </div>

          <p className="max-w-[460px] text-sm leading-[1.7] text-muted-foreground min-[901px]:col-start-3 min-[1101px]:col-auto">
            {p.text}
          </p>

          <div className="min-[901px]:col-start-3 min-[1101px]:col-auto">
            <Tag>{p.status}</Tag>
          </div>

          <ArrowUpRight
            aria-hidden
            className="hidden size-5 text-muted-foreground transition-[transform,color] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-nyne-text min-[1101px]:block"
          />
        </Link>
      ))}
    </Reveal>
  );
}