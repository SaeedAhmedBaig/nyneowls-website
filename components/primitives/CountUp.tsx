"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.textContent = "0";
    const o = { v: 0 };
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      gsap.to(o, {
        v: to,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = String(Math.round(o.v));
        },
      });
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return <strong ref={ref}>{to}</strong>;
}