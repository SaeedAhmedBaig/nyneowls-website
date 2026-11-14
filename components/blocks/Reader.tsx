"use client";

import { useState } from "react";

const PAGES = [["a b", "b"], ["a", "c b"], ["c", "a b"], ["b a", "c", "a"]];
const tone: Record<string, string> = { a: "bg-dark", b: "bg-nyne", c: "bg-card2" };

export function Reader() {
  const [pg, setPg] = useState(0);
  const total = PAGES.length;

  return (
    <div
      className="relative mx-auto flex aspect-[9/17] w-[min(260px,100%)] flex-col overflow-hidden rounded-[36px] border-8 border-ink bg-paper min-[561px]:w-[min(290px,100%)]"
      aria-label="Reader preview"
    >
      <div className="flex items-center justify-between px-4 pb-2 pt-3.5 text-[9px] font-bold tracking-[0.1em] text-muted-foreground">
        <span>CHAPTER 01</span>
        <span>
          PAGE {pg + 1} / {total}
        </span>
      </div>
      <div className="grid flex-1 content-start gap-2 overflow-hidden px-3.5 py-1.5">
        {PAGES[pg].map((row, r) => {
          const cells = row.split(" ");
          return (
            <div key={`${pg}-${r}`} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cells.length}, 1fr)` }}>
              {cells.map((c, k) => (
                <div
                  key={k}
                  className={`relative ${tone[c]} ${cells.length > 1 ? "min-h-[88px]" : "min-h-[112px]"}`}
                >
                  <span aria-hidden className="absolute right-[10%] top-[18%] aspect-square w-[40%] rounded-full border-2 border-white/40" />
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 pb-3.5 pt-2 text-[9px] font-bold tracking-[0.1em] text-muted-foreground">
        <button
          type="button"
          onClick={() => setPg((pg - 1 + total) % total)}
          className="border border-line px-3 py-2 text-[10px] text-ink transition-colors hover:border-nyne hover:text-nyne-text"
        >
          Prev
        </button>
        <span>Sample layout</span>
        <button
          type="button"
          onClick={() => setPg((pg + 1) % total)}
          className="border border-line px-3 py-2 text-[10px] text-ink transition-colors hover:border-nyne hover:text-nyne-text"
        >
          Next
        </button>
      </div>
      <div className="absolute bottom-0 left-0 h-[3px] bg-nyne transition-[width] duration-300" style={{ width: `${((pg + 1) / total) * 100}%` }} />
    </div>
  );
}