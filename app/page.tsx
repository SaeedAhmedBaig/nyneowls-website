import Link from "next/link";
import { Hero } from "@/components/blocks/Hero";
import { HeroTiles } from "@/components/blocks/HeroTiles";
import { Marquee } from "@/components/blocks/Marquee";
import { Paths } from "@/components/blocks/Paths";
import { CardGrid } from "@/components/blocks/CardGrid";
import { Faq } from "@/components/blocks/Faq";
import { Section, SectionHead } from "@/components/primitives/Section";
import { CtaButton, TextLink } from "@/components/primitives/Cta";
import { EMAIL } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Creative & technology company"
        lines={["Design it.", "Build it.", "Tell it."]}
        lead="Nyne Owls is a creative and technology company. We design brands, build business software, publish design resources and create original comics, all under one accountable name."
        actions={
          <>
            <CtaButton href="/contact">Start a project</CtaButton>
            <TextLink href="#start">Looking for something else?</TextLink>
          </>
        }
        visual={<HeroTiles />}
      />

      <Marquee
        items={[
          "Brand identity design",
          "Graphic design",
          "Art direction",
          "Packaging design",
          "Web design",
          "Design resources",
          "POS software",
          "CRM software",
          "Original comics",
        ]}
      />

      <Section id="start">
        <SectionHead
          eyebrow="Where to start"
          title="Tell us what you need. We will point you to the right team."
          text="Nyne Owls has four divisions. Each one has its own expertise, and each page tells you plainly what is ready today."
        />
        <Paths
          items={[
            {
              need: "I need a brand, design or a website",
              title: "Creative Studio",
              text: "Brand identity, graphic design, art direction, packaging and web design for businesses that want to be remembered.",
              status: "Taking enquiries",
              href: "/creative-studio",
            },
            {
              need: "I run a shop or small business",
              title: "Digital Solutions",
              text: "Point of sale software built around real selling and inventory workflows. A customer management tool is in development.",
              status: "POS pilot demos in preparation",
              href: "/digital-solutions",
            },
            {
              need: "I make things and need resources",
              title: "Digital Goods",
              text: "Licensed design resources with clear previews, formats and licence terms, so you know what you are buying.",
              status: "Catalogue in preparation",
              href: "/digital-goods",
            },
            {
              need: "I want something to read",
              title: "Stories & Comics",
              text: "Original comics made to read well on a phone. The first series is in development.",
              status: "Series in development",
              href: "/stories-comics",
            },
          ]}
        />
      </Section>

      <Section alt>
        <SectionHead
          eyebrow="What to expect from us"
          title="Straightforward from the first message."
          text="Design, software and stories are different crafts. We hold all of them to the same standard."
        />
        <CardGrid
          cols={3}
          items={[
            {
              num: "01",
              title: "Plain scope, in writing",
              text: "Before a project starts you get the deliverables, timeline, price and number of revision rounds in writing.",
            },
            {
              num: "02",
              title: "Honest about what exists",
              text: "If something is still in development, we say so. Nothing is called available until it has been built, tested and released.",
            },
            {
              num: "03",
              title: "One standard of craft",
              text: "Clear layouts, usable products and careful details, whether the work is a logo, a point of sale screen or a comic page.",
            },
          ]}
        />
      </Section>

      <Faq
        heading="Common questions."
        items={[
          {
            q: "What is Nyne Owls?",
            a: "A creative and technology company with four divisions: Creative Studio for design work, Digital Goods for design resources, Digital Solutions for business software, and Stories & Comics for original comics.",
          },
          {
            q: "Is the point of sale system available now?",
            a: "The point of sale system is built. We are preparing pilot demonstrations, and when you ask for a demo we will tell you plainly what works today and what does not.",
          },
          {
            q: "Do you work with clients outside your own country?",
            a: "Yes. Currency, tax and payment details are agreed in each proposal.",
          },
        ]}
      />

      <section className="pb-[clamp(56px,8vw,104px)]">
        <div className="wrap">
          <div className="grid items-center gap-8 bg-dark p-6 text-white min-[761px]:p-[clamp(28px,5vw,64px)] min-[901px]:grid-cols-[1.2fr_auto]">
            <div>
              <h2 className="text-[clamp(28px,3.6vw,48px)] font-bold leading-[1.05] tracking-[-0.04em]">
                Not sure where to start<span className="text-nyne">?</span>
              </h2>
              <p className="mt-4 max-w-[520px] text-sm leading-[1.75] text-white/70">
                Tell us what you are working on and we will point you to the right division, or write to us at{" "}
                <a href={`mailto:${EMAIL}`} className="font-semibold text-white underline underline-offset-4 hover:text-nyne">
                  {EMAIL}
                </a>
                .
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-[46px] items-center justify-center bg-nyne px-6 py-4 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-[#171717]"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}