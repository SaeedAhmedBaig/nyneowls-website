"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(window.scrollY / h, 1) : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed left-0 top-0 z-40 h-0.5 w-full origin-left scale-x-0 bg-nyne"
    />
  );
}