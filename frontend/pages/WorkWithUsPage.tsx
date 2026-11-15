import { Hero } from "@/components/blocks/Hero";
import { WorkAside } from "@/components/blocks/WorkAside";
import { ContactForm } from "@/components/blocks/ContactForm";
import { Steps } from "@/components/blocks/Steps";
import { Faq } from "@/components/blocks/Faq";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section, SectionHead } from "@/components/primitives/Section";
import { PageStructuredData } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/seo";
import { EMAIL } from "@/lib/site";

const description =
  "Contact Nyne Owls about brand and graphic design projects, original story collaborations, or software product pilots.";

export const metadata = pageMeta({
  title: "Work With Us",
  description,
  path: "/work-with-us",
});

export default function WorkWithUsPage() {
  return (
    <>
      <PageStructuredData name="Work With Nyne Owls" description={description} path="/work-with-us" type="ContactPage" />
      <Hero
        eyebrow="Work with us"
        lines={["Work with", "Nyne Owls."]}
        lead={description}
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

      <Faq
        heading="Before you get in touch."
        items={[
          { q: "What can I contact Nyne Owls about?", a: "Brand and graphic design, original story collaborations, and software product pilots." },
          { q: "Does sending an enquiry commit me to a project?", a: "No. It starts a conversation. Scope, timing, price, and terms are agreed in writing before any work starts." },
          { q: "What happens after I send a message?", a: "A person reads your message and replies with any questions or next steps." },
        ]}
      />
    </>
  );
}