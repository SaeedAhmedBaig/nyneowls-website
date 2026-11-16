import { Hero } from "@/components/blocks/Hero";
import { StoriesAside } from "@/components/blocks/HeroVisuals";
import { CardGrid } from "@/components/blocks/CardGrid";
import { Faq } from "@/components/blocks/Faq";
import { CtaForm } from "@/components/blocks/CtaForm";
import { Section, SectionHead } from "@/components/primitives/Section";
import { CtaButton } from "@/components/primitives/Cta";
import { PageStructuredData } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/seo";

const description =
  "Nyne Owls is developing an original manga set in The World Below the World, a naturally formed subterranean world. No release date has been announced.";

export const metadata = pageMeta({
  title: "Original Manga & Stories",
  description,
  path: "/originals",
});

export default function StoriesComicsPage() {
  return (
    <>
      <PageStructuredData name="Nyne Owls Original Manga" description={description} path="/originals" />
      <Hero
        eyebrow="Nyne Owls Original Manga"
        lines={["A world", "beneath our", "own."]}
        lead="In The World Below the World, a young salvage diver sets out to find his sister in a naturally formed underground world. The manga follows his search through a setting shaped by nature and the people who live there."
        actions={<CtaButton href="#contact">Ask about the manga</CtaButton>}
        status="Manga in development"
        visual={<StoriesAside />}
      />

      <Section alt>
        <SectionHead
          eyebrow="The story and its world"
          title="A world beneath the familiar."
          text="The story begins with a personal search in an underground world shaped by nature, distinct environments and the people who make their lives there. We’ll let the manga reveal the rest."
        />
        <CardGrid
          cols={3}
          items={[
            { num: "01", title: "One connected world", text: "The world below is part of the same physical world as the surface: naturally formed, varied and only partly known to the people who live there." },
            { num: "02", title: "A personal search", text: "At its heart is a young salvage diver searching for his sister. That search is the starting point; we’re keeping further story details under wraps." },
            { num: "03", title: "Manga first", text: "The story is being developed as a manga. A comics adaptation is a later step, not a format or release currently being offered." },
          ]}
        />
      </Section>

      <Faq
        heading="Common questions."
        items={[
          { q: "What is The World Below the World?", a: "It is the setting for Nyne Owls’ original manga: a naturally formed underground world that is part of the same world as the surface." },
          { q: "Is this a manga or a comic?", a: "Manga is the primary format. A comics adaptation is a later step; release and reading details have not been announced." },
          { q: "When can I read it?", a: "The manga is in development, and no release date or reading platform has been announced. We will share news when those details are ready." },
          { q: "Can I sign up for release emails?", a: "There is no manga release mailing list yet. Use the enquiry form below to ask a question; it does not subscribe you to updates." },
        ]}
      />

      <CtaForm
        id="contact"
        eyebrow="Original manga enquiry"
        title="Ask us about the story"
        text="Have a question about the manga or its development? Send it here. This form is an enquiry, not a release-update subscription."
        button="Send enquiry"
        subject="Original manga enquiry"
        fields={[
          { id: "e", label: "Email", type: "email" },
          { id: "m", label: "Question", type: "area", full: true },
        ]}
      />
    </>
  );
}