import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/blocks/Hero";
import { GoodsStack } from "@/components/blocks/HeroVisuals";
import { CardGrid } from "@/components/blocks/CardGrid";
import { TabsBlock } from "@/components/blocks/TabsBlock";
import { DataTable } from "@/components/blocks/DataTable";
import { Faq } from "@/components/blocks/Faq";
import { CtaForm } from "@/components/blocks/CtaForm";
import { Section, SectionHead } from "@/components/primitives/Section";
import { CtaButton, TextLink } from "@/components/primitives/Cta";

export const metadata: Metadata = {
  title: "Design Resources, Templates & Brand Assets",
  description:
    "Licensed design resources, templates and brand assets from Nyne Owls Digital Goods. Catalogue in preparation.",
};

export default function DigitalGoodsPage() {
  return (
    <>
      <Hero
        eyebrow="Nyne Owls Digital Goods"
        lines={["Resources", "worth", "downloading."]}
        lead="Licensed design resources from the Nyne Owls collection, curated like a catalogue so you know exactly what you are buying before you pay."
        actions={
          <>
            <CtaButton href="#notify">Get launch updates</CtaButton>
            <TextLink href="#standard">Our product standard</TextLink>
          </>
        }
        status="Catalogue in preparation"
        visual={<GoodsStack />}
      />

      <Section id="collections">
        <SectionHead
          eyebrow="Catalogue"
          title="Organised around how you search."
          text="Collections and categories follow how designers actually look for resources."
        />
        <CardGrid
          cols={4}
          items={[
            { num: "01", tag: "Planned", title: "Collections", text: "Curated sets built around a theme or style." },
            { num: "02", tag: "Planned", title: "Categories", text: "Browse by asset type, format or use case." },
            { num: "03", tag: "Planned", title: "Bundles", text: "Packs priced together when the value is real." },
            { num: "04", tag: "Future", title: "Membership", text: "Explored once the catalogue is established." },
          ]}
        />
      </Section>

      <Section id="standard" alt>
        <SectionHead
          eyebrow="Product page standard"
          title="Seven things on every product page."
          text="Select a part to see what we commit to showing before you pay."
        />
        <TabsBlock
          id="standard-tabs"
          items={[
            { label: "Title", tag: "01", title: "Product title", text: "Specific, searchable and understandable from the name alone." },
            { label: "Preview", tag: "02", title: "Preview", text: "Accurate images or video of the actual item, never a stand-in." },
            { label: "Included", tag: "03", title: "What is included", text: "Every file, format, size, variation and dependency." },
            { label: "Compatibility", tag: "04", title: "Compatibility", text: "Supported applications and version limits where known." },
            { label: "Licence", tag: "05", title: "Licence", text: "What you may do, what you may not, and redistribution rules." },
            { label: "Delivery", tag: "06", title: "Delivery", text: "How and when downloads become available after payment." },
            { label: "Support", tag: "07", title: "Support", text: "A clear route for download issues and product questions." },
          ]}
        />
      </Section>

      <Section>
        <SectionHead
          eyebrow="Licensing"
          title="Clear terms before you check out."
        />
        <DataTable
          head={["Use", "Typically means", "Redistribution"]}
          rows={[
            ["Personal", "Non-commercial projects for yourself.", "Not permitted"],
            ["Commercial", "Client work and products for sale, within stated limits.", "Not permitted as a standalone asset"],
            ["Extended", "Broader or higher-volume use, where offered.", "Defined per product"],
          ]}
        />
        <p className="mt-[18px] flex items-center gap-2.5 text-[12.5px] text-muted-foreground">
          <span aria-hidden className="size-[7px] rounded-full bg-nyne" />
          Working categories. Final wording is confirmed in the{" "}
          <Link href="/licences" className="font-bold text-ink hover:text-nyne-text">
            licence terms
          </Link>{" "}
          before the first product launches.
        </p>
      </Section>

      <Faq
        heading="Straight answers."
        items={[
          { q: "When will the catalogue open?", a: "It is in preparation. Join the launch list and we will email once, when the first collection opens." },
          { q: "What will I know before I pay?", a: "Title, preview, included files and formats, compatibility, licence, delivery and support route." },
          { q: "What if a download fails?", a: "Each page gives a support route. Faulty or incorrect files are fixed or replaced." },
        ]}
      />

      <CtaForm
        id="notify"
        eyebrow="Launch updates"
        title="Be first to see the catalogue"
        text="One email when the first collection opens. You can leave at any time."
        button="Notify me"
        subject="Digital Goods launch updates"
        fields={[
          { id: "e", label: "Email", type: "email", full: true },
          { id: "t", label: "Most interested in", type: "select", full: true, options: ["Any collection", "Fonts and type", "Templates and layouts", "Brand assets", "Bundles"] },
        ]}
      />
    </>
  );
}