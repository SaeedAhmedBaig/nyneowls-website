import type { Metadata } from "next";
import { Hero } from "@/components/blocks/Hero";
import { ContactAside } from "@/components/blocks/HeroVisuals";
import { Steps } from "@/components/blocks/Steps";
import { CtaForm } from "@/components/blocks/CtaForm";
import { Section, SectionHead } from "@/components/primitives/Section";
import { EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact: Start a Project or Request a Demo",
  description:
    "Start a design project, request a software demo or follow Nyne Owls releases.",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Contact"
        lines={["Tell us what", "you are building."]}
        lead="One form for project enquiries, software demos and release updates. We reply with what happens next."
        visual={<ContactAside />}
        meta={[
          { label: "Routes", value: "Four divisions, one inbox" },
          { label: "Reply", value: "With clear next steps" },
          { label: "Email", value: EMAIL },
        ]}
      />

      <CtaForm
        id="contact-form"
        eyebrow="Get in touch"
        title="Start a conversation"
        text="Choose the topic that fits best and we will route your message to the right division."
        button="Send message"
        subject="Website enquiry"
        fields={[
          { id: "n", label: "Name", type: "text" },
          { id: "e", label: "Email", type: "email" },
          {
            id: "t",
            label: "Topic",
            type: "select",
            full: true,
            options: ["Creative project", "Software demo", "Digital goods", "Stories and comics", "Collaboration", "Something else"],
          },
          { id: "g", label: "Message", type: "area", full: true },
        ]}
      />

      <Section alt>
        <SectionHead eyebrow="What happens next" title="No black box." />
        <Steps
          cols={3}
          items={[
            { title: "We read it", text: "Routed to the right division." },
            { title: "We reply", text: "Questions or next steps." },
            { title: "We agree", text: "Scope and terms written first." },
          ]}
        />
        <p className="mt-[18px] flex items-center gap-2.5 text-[12.5px] text-muted-foreground">
          <span aria-hidden className="size-[7px] rounded-full bg-nyne" />
          Prefer email? Write to{" "}
          <a href={`mailto:${EMAIL}`} className="font-bold text-ink hover:text-nyne-text">
            {EMAIL}
          </a>
          . Response targets are published once support hours are confirmed.
        </p>
      </Section>
    </>
  );
}