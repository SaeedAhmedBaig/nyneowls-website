import { Reveal } from "@/components/primitives/Reveal";

export type RowItem = { title: string; text: string; tags?: string[] };

export function Rows({ items }: { items: RowItem[] }) {
  return (
    <Reveal className="border-t border-line">
      {items.map((r, i) => (
        <div
          key={r.title}
          className="group relative grid gap-3 border-b border-line px-1 py-[22px] transition-colors hover:bg-card min-[761px]:grid-cols-[50px_1fr_1.3fr] min-[761px]:gap-6 min-[761px]:px-3 min-[761px]:py-[26px] min-[1101px]:grid-cols-[60px_1fr_1.3fr_1fr]"
        >
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-nyne transition-transform duration-300 group-hover:scale-y-100"
          />
          <i className="pt-1.5 text-[11px] font-bold not-italic tracking-[0.12em] text-nyne-text">
            {String(i + 1).padStart(2, "0")}
          </i>
          <h3 className="text-[clamp(20px,2.2vw,30px)] font-bold tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-2">
            {r.title}
          </h3>
          <p className="text-sm leading-[1.7] text-muted-foreground">{r.text}</p>
          {r.tags && (
            <ul className="flex list-none flex-wrap gap-1.5 min-[761px]:col-[2/-1] min-[1101px]:col-auto">
              {r.tags.map((t) => (
                <li key={t} className="border border-line px-[9px] py-1.5 text-[10.5px] font-semibold">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </Reveal>
  );
}