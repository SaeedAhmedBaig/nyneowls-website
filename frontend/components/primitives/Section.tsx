import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export function Section({
  id,
  alt = false,
  children,
}: {
  id?: string;
  alt?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`py-[clamp(56px,8vw,104px)] ${alt ? "bg-card [&_.on-alt]:bg-paper" : ""}`}>
      <div className="wrap">
        <Reveal className="section-content">{children}</Reveal>
      </div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
  headingLevel = "h2",
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  headingLevel?: "h1" | "h2";
}) {
  return (
    <div className="mb-[clamp(30px,5vw,56px)] grid items-end gap-[clamp(24px,5vw,80px)] md:grid-cols-2">
      <div>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal as={headingLevel} className="text-[clamp(30px,4vw,56px)] font-bold leading-[1.03] tracking-[-0.04em]">
          {title}
        </Reveal>
      </div>
      {text && (
        <Reveal as="p" className="max-w-[520px] text-[15px] leading-[1.8] text-muted-foreground md:justify-self-end">
          {text}
        </Reveal>
      )}
    </div>
  );
}