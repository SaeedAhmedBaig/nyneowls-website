"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { Tag } from "@/components/primitives/Tag";

export type CardItem = {
  num: string;
  tag?: string;
  title: string;
  text: string;
  list?: string[];
  link?: { label: string; href: string };
};

const colClass = {
  2: "min-[901px]:grid-cols-2",
  3: "min-[561px]:grid-cols-2 min-[901px]:grid-cols-3",
  4: "min-[561px]:grid-cols-2 min-[1101px]:grid-cols-4",
} as const;

function Card({ item }: { item: CardItem }) {
  return (
    <article
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className="on-alt group relative flex w-full flex-col overflow-hidden border border-line bg-card p-[26px] transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-nyne"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx,50%) var(--my,0%), color-mix(in srgb, var(--nyne) 15%, transparent), transparent 65%)",
        }}
      />
      <div className="relative mb-[30px] flex items-start justify-between gap-2.5 text-[10px] font-bold tracking-[0.12em] text-nyne-text">
        <span>{item.num}</span>
        {item.tag && <Tag>{item.tag}</Tag>}
      </div>
      <h3 className="relative mb-2.5 text-xl font-bold tracking-[-0.03em]">{item.title}</h3>
      <p className="relative mb-4 text-[13.5px] leading-[1.7] text-muted-foreground">{item.text}</p>
      {item.list && (
        <ul className="relative mb-[18px] grid gap-[9px] text-[13px] font-medium">
          {item.list.map((li) => (
            <li key={li} className="flex items-start gap-2.5">
              <span aria-hidden className="mt-[7px] size-[5px] shrink-0 bg-nyne" />
              {li}
            </li>
          ))}
        </ul>
      )}
      {item.link && (
        <Link
          href={item.link.href}
          className="relative mt-auto inline-flex items-center gap-2 border-t border-line pt-4 text-xs font-bold transition-colors hover:text-nyne-text"
        >
          {item.link.label} <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
      )}
    </article>
  );
}

export function CardGrid({ items, cols = 3 }: { items: CardItem[]; cols?: 2 | 3 | 4 }) {
  return (
    <div className={`grid gap-3 ${colClass[cols]}`}>
      {items.map((item, i) => (
        <Reveal key={item.num + item.title} delay={(i % 3) * 60} className="flex">
          <Card item={item} />
        </Reveal>
      ))}
    </div>
  );
}