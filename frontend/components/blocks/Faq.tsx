import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { Section } from "@/components/primitives/Section";

export type FaqItem = { q: string; a: string };

export function Faq({ heading, items }: { heading: string; items: FaqItem[] }) {
  return (
    <Section>
      <div className="grid gap-[clamp(28px,5vw,80px)] min-[901px]:grid-cols-[.8fr_1.2fr]">
        <div>
          <Reveal>
            <Eyebrow>Questions</Eyebrow>
          </Reveal>
          <Reveal as="h2" className="text-[clamp(30px,4vw,56px)] font-bold leading-[1.03] tracking-[-0.04em]">
            {heading}
          </Reveal>
        </div>
        <Reveal className="border-t border-line">
          {items.map((f) => (
            <details key={f.q} className="group border-b border-line py-5">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 text-[17px] font-semibold tracking-[-0.02em] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="text-[22px] leading-none text-nyne-text group-open:hidden">
                  +
                </span>
                <span aria-hidden className="hidden text-[22px] leading-none text-nyne-text group-open:inline">
                  −
                </span>
              </summary>
              <p className="mt-3.5 max-w-[720px] text-sm leading-[1.75] text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}