import { Hero } from "@/components/blocks/Hero";
import { WorkAside } from "@/components/blocks/WorkAside";
import { ContactForm } from "@/components/blocks/ContactForm";
import { Steps } from "@/components/blocks/Steps";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section, SectionHead } from "@/components/primitives/Section";
import { pageMeta } from "@/lib/seo";
import { EMAIL } from "@/lib/site";

export const metadata = pageMeta({
  title: "Work With Us: Hire, Collaborate or Partner",
  description:
    "Hire the Nyne Owls design studio, collaborate on an original story, or partner on a software product. Tell us what you need and we will reply with next steps.",
  path: "/work-with-us",
});

export default function WorkWithUsPage() {
  return (
    <>
      <Hero
        eyebrow="Work with us"
        lines={["Three ways", "to work with us."]}
        lead="Nyne Owls is an early-stage studio. Whether you need design work, want to help make an original story, or want to pilot one of our products, start here."
        visual={<WorkAside />}
      />

      <section id="form" className="scroll-mt-24 pb-[clamp(56px,8vw,104px)]">
        <div className="wrap">
          <div className="grid gap-[clamp(28px,5vw,72px)] bg-dark p-6 text-white min-[761px]:p-[clamp(28px,5vw,72px)] min-[901px]:grid-cols-[.9fr_1.1fr]">
            <div>
              <Eyebrow className="!text-white">Start here</Eyebrow>
              <h2 className="text-[clamp(32px,4.4vw,56px)] font-bold leading-[1.03] tracking-[-0.04em]">
                Tell us what you need<span className="text-nyne">.</span>
              </h2>
              <p className="mt-[18px] max-w-[430px] text-sm leading-[1.75] text-white/70">
                Choose what fits best and add a few lines. We will reply with next steps.
              </p>
              <p className="mt-6 text-[13px] text-white/60">
                Prefer email?{" "}
                <a href={`mailto:${EMAIL}`} className="font-semibold text-white underline underline-offset-4 hover:text-nyne">
                  {EMAIL}
                </a>
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <Section alt>
        <SectionHead eyebrow="What happens next" title="Simple and in writing." />
        <Steps
          cols={3}
          items={[
            { title: "We read it", text: "Every message is read by a person." },
            { title: "We reply", text: "With questions or next steps." },
            { title: "We agree", text: "Scope and terms are written down before any work starts." },
          ]}
        />
      </Section>
    </>
  );
}