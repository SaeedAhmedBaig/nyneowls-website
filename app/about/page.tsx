import type { Metadata } from "next";
import { Hero } from "@/components/blocks/Hero";
import { AboutAside } from "@/components/blocks/HeroVisuals";
import { CardGrid } from "@/components/blocks/CardGrid";
import { DataTable } from "@/components/blocks/DataTable";
import { Faq } from "@/components/blocks/Faq";
import { Section, SectionHead } from "@/components/primitives/Section";
import { CtaButton, TextLink } from "@/components/primitives/Cta";

export const metadata: Metadata = {
  title: "About Nyne Owls",
  description:
    "About Nyne Owls, a creative and technology company working across design, software, digital goods and stories.",
};

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About Nyne Owls"
        lines={["Create it.", "Solve it.", "Tell it."]}
        lead="Nyne Owls brings creative practice and practical technology together. Our divisions work in different disciplines but share one commitment: thoughtful work, delivered with care, building trust over time."
        actions={
          <>
            <CtaButton href="/contact">Get in touch</CtaButton>
            <TextLink href="/">Meet the divisions</TextLink>
          </>
        }
        visual={<AboutAside />}
        meta={[
          { label: "Divisions", value: "Four, each with one clear next step" },
          { label: "Standard", value: "One quality bar across every discipline" },
          { label: "Claims", value: "Only what exists today" },
        ]}
      />

      <Section alt>
        <SectionHead eyebrow="Direction" title="Why we exist, and where we are going." />
        <CardGrid
          cols={3}
          items={[
            { num: "01", title: "Purpose", text: "To turn ideas into useful, meaningful and well-crafted creative and digital experiences." },
            { num: "02", title: "Vision", text: "To become a recognised independent creative and technology company, starting with a credible presence and growing into international markets as each division is ready." },
            { num: "03", title: "Mission", text: "To combine design thinking, practical technology and original storytelling into services and products that help people communicate, operate and experience more effectively." },
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
            { num: "04", title: "One standard, many disciplines", text: "Every division meets the same quality bar." },
            { num: "05", title: "Respect the audience", text: "Honest claims and protected trust." },
            { num: "06", title: "Build for the long term", text: "Maintainable systems and lasting relationships." },
          ]}
        />
      </Section>

      <Section alt>
        <SectionHead eyebrow="Where we stand" title="Honest status, division by division." />
        <DataTable
          head={["Division", "Primary role", "Status"]}
          rows={[
            ["Creative Studio", "Client creative services", "Taking enquiries"],
            ["Digital Goods", "Downloadable design products", "Catalogue in preparation"],
            ["Digital Solutions", "POS, CRM and future software", "POS developed · CRM in development"],
            ["Stories & Comics", "Original narrative publishing", "Series in development"],
          ]}
        />
      </Section>

      <Faq
        heading="Straight answers."
        items={[
          { q: "What is Nyne Owls?", a: "A creative and technology company working across design, digital products, software and stories." },
          { q: "Why four divisions?", a: "Each has its own expertise and one clear next step, held to one standard." },
          { q: "Do you make big claims?", a: "No. We avoid unsupported claims and label every product with its true status." },
        ]}
      />
    </>
  );
}