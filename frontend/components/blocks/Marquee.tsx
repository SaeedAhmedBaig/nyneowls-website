"use client";

import { useState } from "react";

export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="marquee overflow-hidden border-y border-line py-[18px]">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span
            key={i}
            aria-hidden
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{
              color: active === i ? "var(--nyne-text)" : "var(--muted)",
              transition: "color 0.2s",
              cursor: "default",
            }}
            className="marquee-item flex items-center gap-14 whitespace-nowrap px-7 text-[clamp(18px,2.4vw,28px)] font-bold tracking-[-0.03em]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}