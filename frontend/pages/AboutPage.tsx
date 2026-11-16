import { Hero } from "@/components/blocks/Hero";
import { AboutAside } from "@/components/blocks/HeroVisuals";
import { CardGrid } from "@/components/blocks/CardGrid";
import { DataTable } from "@/components/blocks/DataTable";
import { Faq } from "@/components/blocks/Faq";
import { Section, SectionHead } from "@/components/primitives/Section";
import { CtaButton, TextLink } from "@/components/primitives/Cta";
import { PageStructuredData } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/seo";

const description =
  "Learn about Nyne Owls, a creative and technology company working across brand design, business software, and original manga.";

export const metadata = pageMeta({ title: "About", description, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <PageStructuredData name="About Nyne Owls" description={description} path="/about" type="AboutPage" />
      <Hero
        eyebrow="About Nyne Owls"
        lines={["A creative &", "technology", "company."]}
        lead="Nyne Owls is a creative and technology company working across brand design, business software, and original manga. Each practice area has its own expertise and a clear next step."
        actions={
          <>
            <CtaButton href="/work-with-us">Get in touch</CtaButton>
            <TextLink href="/">Meet our practice areas</TextLink>
          </>
        }
        visual={<AboutAside />}
        meta={[
          { label: "Practice areas", value: "Three, each with one clear next step" },
          { label: "Standard", value: "One quality bar across every discipline" },
          { label: "Claims", value: "Only what exists today" },
        ]}
      />

      <Section alt>
        <SectionHead eyebrow="Direction" title="Why we exist, and where we are going." />
        <CardGrid
          cols={3}
          items={[
            { num: "01", title: "Purpose", text: "To turn ideas into useful, meaningful creative work and digital experiences." },
            { num: "02", title: "Vision", text: "To build an independent creative and technology company with clear, well-made services and products." },
            { num: "03", title: "Mission", text: "To bring together brand and graphic design, practical software, and original storytelling." },
          ]}
        />
      </Section>

      <Section>
        <SectionHead eyebrow="Operating principles" title="Six rules we hold ourselves to." />
        <CardGrid
          cols={3}
          items={[
            { num: "01", title: "Clarity before complexity", text: "Make the offer and the next step easy to understand." },
            { num: "02", title: "Craft matters", text: "Details, usability and reliability are part of the product." },
            { num: "03", title: "Useful innovation", text: "Technology that solves a real problem." },
            { num: "04", title: "One standard, many disciplines", text: "Every practice area meets the same quality bar." },
            { num: "05", title: "Respect the audience", text: "Honest claims and protected trust." },
            { num: "06", title: "Build for the long term", text: "Maintainable systems and lasting relationships." },
          ]}
        />
      </Section>

      <Section alt>
        <SectionHead eyebrow="Where we stand" title="Honest status, practice area by practice area." />
        <DataTable
          head={["Practice area", "Primary role", "Status"]}
          rows={[
            ["Studio", "Client creative services", "Taking enquiries"],
            ["Products", "POS, CRM and future software", "POS developed · CRM in development"],
            ["Originals", "Manga-first storytelling", "Manga in development"],
          ]}
        />
      </Section>

      <Faq
        heading="Straight answers."
        items={[
          { q: "What is Nyne Owls?", a: "A creative and technology company working across design, software and original manga." },
          { q: "Why three practice areas?", a: "Each has its own expertise and one clear next step, held to one standard." },
          { q: "Do you make big claims?", a: "No. We avoid unsupported claims and label every product with its true status." },
        ]}
      />
    </>
  );
}