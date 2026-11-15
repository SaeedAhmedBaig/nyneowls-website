"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Tag } from "@/components/primitives/Tag";
import { motion } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

export type HeroMeta = { label: string; value: string };

type HeroProps = {
  eyebrow: string;
  lines: string[];
  lead: string;
  actions?: React.ReactNode;
  visual?: React.ReactNode;
  status?: string;
  meta?: HeroMeta[];
};

const gridMask = "radial-gradient(ellipse 70% 65% at 72% 40%, #000 0%, transparent 78%)";

export function Hero({ eyebrow, lines, lead, actions, visual, status, meta }: HeroProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const has = (s: string) => !!el.querySelector(s);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: motion.ease } });

        tl.from("[data-bg]", { opacity: 0, duration: 1.6 }, 0)
          .from("[data-e]", { opacity: 0, y: 12, duration: motion.dur.sm }, 0)
          .from(
            "[data-w]",
            {
              yPercent: 115,
              duration: motion.dur.lg,
              ease: motion.easeOut,
              stagger: motion.stagger.words,
              clearProps: "transform",
            },
            0.15
          )
          .from(
            "[data-h]",
            {
              opacity: 0,
              y: 24,
              duration: motion.dur.md,
              stagger: motion.stagger.items,
              clearProps: "transform,opacity",
            },
            0.55
          );

        if (has("[data-vis]")) {
          tl.from("[data-vis]", { opacity: 0, duration: motion.dur.md, clearProps: "opacity" }, 0.4);
        }
        if (has("[data-v]")) {
          tl.from(
            "[data-v]",
            {
              opacity: 0,
              y: 18,
              duration: motion.dur.md,
              stagger: motion.stagger.items,
              clearProps: "transform,opacity",
            },
            0.6
          );
        }
        if (has("[data-line]")) {
          tl.from(
            "[data-line]",
            { scaleX: 0, duration: 1.2, ease: "power2.inOut", transformOrigin: "0 50%" },
            0.9
          );
        }
        if (has("[data-m]")) {
          tl.from(
            "[data-m]",
            {
              opacity: 0,
              y: 14,
              duration: motion.dur.sm,
              stagger: 0.07,
              clearProps: "transform,opacity",
            },
            1.1
          );
        }
      });
    },
    { scope: root }
  );

  const solo = !visual;

  return (
    <div ref={root} className="relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          data-bg
          className="hero-grid absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: gridMask,
            WebkitMaskImage: gridMask,
          }}
        />
      </div>

      <div className="wrap">
        <div
          className={`grid items-center gap-[clamp(36px,6vw,96px)] py-[clamp(48px,7vw,88px)] ${
            solo ? "" : "min-[901px]:grid-cols-[1.05fr_.95fr]"
          }`}
        >
          <div className="min-w-0">
            <div data-e className="hero-pulse mb-6 flex flex-wrap items-center gap-x-4 gap-y-3">
              <Eyebrow className="!mb-0">{eyebrow}</Eyebrow>
              {status && <Tag red>{status}</Tag>}
            </div>

            <h1
              className={`break-words text-[clamp(34px,8vw,64px)] font-bold leading-[1.02] tracking-[-0.045em] ${
                solo
                  ? "min-[901px]:text-[clamp(44px,5.4vw,84px)]"
                  : "min-[901px]:text-[clamp(40px,4.8vw,76px)]"
              }`}
            >
              {lines.map((line) => (
                <span key={line} className="-mb-[.12em] block overflow-hidden pb-[.12em]">
                  {line.split(" ").map((word, i) => {
                    const dot = word.endsWith(".");
                    return (
                      <span key={i} data-w className="mr-[.18em] inline-block">
                        {dot ? word.slice(0, -1) : word}
                        {dot && <span className="text-nyne">.</span>}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>

            <p data-h className="mt-7 max-w-[520px] text-[15px] leading-[1.8] text-muted-foreground">
              {lead}
            </p>

            {actions && (
              <div
                data-h
                className="mt-9 flex flex-col items-start gap-5 min-[561px]:flex-row min-[561px]:flex-wrap min-[561px]:items-center min-[561px]:gap-[26px]"
              >
                {actions}
              </div>
            )}
          </div>

          {visual && (
            <div data-vis className="w-full min-w-0">
              {visual}
            </div>
          )}
        </div>

        {meta && (
          <div className="pb-2">
            <div data-line className="h-px w-full bg-line" />
            <dl className="grid min-[561px]:grid-cols-3">
              {meta.map((m) => (
                <div
                  key={m.label}
                  data-m
                  className="border-b border-line py-5 min-[561px]:border-b-0 min-[561px]:border-l min-[561px]:pl-6 min-[561px]:first:border-l-0 min-[561px]:first:pl-0"
                >
                  <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    {m.label}
                  </dt>
                  <dd className="mt-1.5 text-[15px] font-semibold tracking-[-0.02em]">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}