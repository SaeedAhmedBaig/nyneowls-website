"use client";

import { useRef, useState } from "react";
import { Reveal } from "@/components/primitives/Reveal";
import { Tag } from "@/components/primitives/Tag";
import { TextLink } from "@/components/primitives/Cta";

export type TabItem = {
  label: string;
  tag: string;
  title: string;
  text: string;
  sideTag?: string;
  side?: string[];
  linkHref?: string;
  linkLabel?: string;
};

export function TabsBlock({ items, id = "tabs" }: { items: TabItem[]; id?: string }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let n = i;
    if (e.key === "ArrowRight") n = (i + 1) % items.length;
    else if (e.key === "ArrowLeft") n = (i - 1 + items.length) % items.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = items.length - 1;
    else return;
    e.preventDefault();
    setActive(n);
    refs.current[n]?.focus();
  };

  return (
    <Reveal>
      <div role="tablist" aria-label="Product information" aria-orientation="horizontal" className="mb-3 flex w-max max-w-full flex-wrap border border-line max-[560px]:w-full">
        {items.map((t, i) => (
          <button
            key={t.label}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={`min-h-11 px-5 py-3.5 text-xs font-bold transition-colors max-[560px]:flex-[1_1_40%] max-[560px]:px-2 ${
              active === i ? "bg-ink text-onink" : "text-muted-foreground hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {items.map((t, i) => (
        <div
          key={t.label}
          role="tabpanel"
          id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`}
          hidden={active !== i}
          className={`grid gap-3 ${t.side ? "min-[901px]:grid-cols-2" : ""}`}
        >
          <div className="on-alt bg-card p-[clamp(22px,3vw,38px)]">
            <Tag>{t.tag}</Tag>
            <h3 className="mb-3 mt-4 text-[clamp(22px,2.6vw,34px)] font-bold tracking-[-0.03em]">{t.title}</h3>
            <p className="text-sm leading-[1.75] text-muted-foreground">{t.text}</p>
            {t.linkHref && t.linkLabel && (
              <div className="mt-5">
                <TextLink href={t.linkHref}>{t.linkLabel}</TextLink>
              </div>
            )}
          </div>
          {t.side && (
            <div className="bg-dark p-[clamp(22px,3vw,38px)] text-white">
              <span className="inline-block border border-white/40 px-2 py-[5px] text-[10px] font-bold uppercase tracking-[0.1em]">
                {t.sideTag ?? "The essentials"}
              </span>
              <h3 className="mb-3 mt-4 text-xl font-bold tracking-[-0.03em]">The essentials</h3>
              <ul className="grid gap-[9px] text-[13px] font-medium">
                {t.side.map((s) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <span aria-hidden className="mt-[7px] size-[5px] shrink-0 bg-nyne" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </Reveal>
  );
}