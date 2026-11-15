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
  "Nyne Owls Stories & Comics is developing its first original comic series for comfortable reading on a phone. No release date has been announced.";

export const metadata = pageMeta({
  title: "Original Comics & Stories",
  description,
  path: "/originals",
});

export default function StoriesComicsPage() {
  return (
    <>
      <PageStructuredData name="Nyne Owls Stories & Comics" description={description} path="/originals" />
      <Hero
        eyebrow="Nyne Owls Stories & Comics"
        lines={["Original worlds.", "One chapter", "at a time."]}
        lead={description}
        actions={<CtaButton href="#contact">Ask about the series</CtaButton>}
        status="Series in development"
        visual={<StoriesAside />}
      />

      <Section alt>
        <SectionHead
          eyebrow="What to expect"
          title="Stories with their own identity."
          text="We are building the first series carefully, and we will only announce a schedule we can keep."
        />
        <CardGrid
          cols={3}
          items={[
            { num: "01", title: "Original stories", text: "Our own characters, places and plot, not adaptations. Each series gets its own title, synopsis and page on this site." },
            { num: "02", title: "Made for the phone", text: "Chapters will be laid out to read comfortably on a phone first, and scale up to tablet and desktop." },
            { num: "03", title: "Credited properly", text: "Everyone who contributes is credited, and permissions are agreed before anything is published." },
          ]}
        />
      </Section>

      <Faq
        heading="Common questions."
        items={[
          { q: "When will the first series launch?", a: "It is in development and no release date has been confirmed. We will publish an announcement on the Nyne Owls Journal when the title and schedule are ready." },
          { q: "Will it be free to read?", a: "We plan to make the start of each series free to read. Paid chapters or memberships would only come later, if readers want them." },
          { q: "Can I sign up for release emails?", a: "There is no release mailing list yet. Use the enquiry form below to ask a question; it does not subscribe you to updates." },
        ]}
      />

      <CtaForm
        id="contact"
        eyebrow="Stories & Comics enquiry"
        title="Ask us about the series"
        text="Have a question about the first comic series? Send it here. This form is an enquiry, not a release-update subscription."
        button="Send enquiry"
        subject="Stories & Comics enquiry"
        fields={[
          { id: "e", label: "Email", type: "email" },
          { id: "m", label: "Question", type: "area", full: true },
        ]}
      />
    </>
  );
}