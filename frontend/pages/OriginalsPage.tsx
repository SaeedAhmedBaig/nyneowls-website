import type { Metadata } from "next";
import { Hero } from "@/components/blocks/Hero";
import { StoriesAside } from "@/components/blocks/HeroVisuals";
import { CardGrid } from "@/components/blocks/CardGrid";
import { Faq } from "@/components/blocks/Faq";
import { CtaForm } from "@/components/blocks/CtaForm";
import { Section, SectionHead } from "@/components/primitives/Section";
import { CtaButton } from "@/components/primitives/Cta";

export const metadata: Metadata = {
  title: "Original Comics & Stories",
  description:
    "Original comics and stories from Nyne Owls Stories & Comics. First series in development.",
};

export default function StoriesComicsPage() {
  return (
    <>
      <Hero
        eyebrow="Nyne Owls Stories & Comics"
        lines={["Original worlds.", "One chapter", "at a time."]}
        lead="Original comics with their own characters and world, made to read well on a phone. The first series is in development. Follow along and we will email you when it is announced."
        actions={<CtaButton href="#follow">Follow releases</CtaButton>}
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
          { q: "When does the first series start?", a: "It is still in development, so there is no date yet. Follow releases and we will email you when the title and schedule are confirmed." },
          { q: "Will it be free to read?", a: "We plan to make the start of each series free to read. Paid chapters or memberships would only come later, if readers want them." },
          { q: "How often will you email me?", a: "Only when there is news: the series announcement and new chapters. You can unsubscribe at any time." },
        ]}
      />

      <CtaForm
        id="follow"
        eyebrow="Follow releases"
        title="Be there for chapter one"
        text="One email when the series is announced and when new chapters arrive. You can leave at any time."
        button="Follow releases"
        subject="Follow Stories & Comics releases"
        fields={[
          { id: "e", label: "Email", type: "email", full: true },
          { id: "t", label: "How would you like to read?", type: "select", full: true, options: ["On my phone", "On a tablet", "On a computer", "No preference"] },
        ]}
      />
    </>
  );
}