import { Hero } from "@/components/blocks/Hero";
import { Section } from "@/components/primitives/Section";
import { LEGAL_UPDATED, type LegalDoc } from "@/content/legal";
import { EMAIL } from "@/lib/site";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <Hero eyebrow={`Legal · Updated ${LEGAL_UPDATED}`} lines={[`${doc.title}.`]} lead={doc.intro} />

      <Section>
        <div className="grid gap-[clamp(28px,5vw,72px)] min-[901px]:grid-cols-[240px_1fr]">
          <nav aria-label="On this page" className="min-[901px]:sticky min-[901px]:top-24 min-[901px]:self-start">
            <b className="mb-3 block text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              On this page
            </b>
            <ol className="flex flex-wrap gap-1.5 min-[901px]:grid min-[901px]:gap-0.5 min-[901px]:border-l min-[901px]:border-line">
              {doc.sections.map((s, i) => (
                <li key={s.heading}>
                  <a
                    href={`#${slugify(s.heading)}`}
                    className="block min-h-11 border border-line px-3 py-3 text-[13px] font-semibold text-muted-foreground transition-colors hover:border-nyne hover:text-nyne-text min-[901px]:-ml-px min-[901px]:min-h-0 min-[901px]:border-0 min-[901px]:border-l-2 min-[901px]:border-transparent min-[901px]:px-4 min-[901px]:py-2 min-[901px]:hover:border-nyne"
                  >
                    {i + 1}. {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-[760px]">
            <p className="mb-8 border border-nyne p-4 text-[13px] leading-[1.6]">
              <b>Working draft.</b> This page has not yet been reviewed by a legal adviser for the
              business&rsquo;s jurisdiction. It describes how we intend to operate.
            </p>
            {doc.sections.map((s, i) => (
              <section key={s.heading} id={slugify(s.heading)} className="scroll-mt-28">
                <h2 className="mb-3 mt-10 flex items-baseline gap-3.5 text-[22px] font-bold tracking-[-0.03em] first:mt-0">
                  <span className="text-[11px] font-bold tracking-[0.12em] text-nyne-text">{i + 1}</span>
                  {s.heading}
                </h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mb-3 text-[14.5px] leading-[1.85] text-muted-foreground">
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <p className="mt-10 border-t border-line pt-5 text-[14px] text-muted-foreground">
              Questions about this page? Email{" "}
              <a href={`mailto:${EMAIL}`} className="font-bold text-ink hover:text-nyne-text">
                {EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}