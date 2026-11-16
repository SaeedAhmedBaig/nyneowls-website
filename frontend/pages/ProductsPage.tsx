import { Hero } from "@/components/blocks/Hero";
import { ProductStatus } from "@/components/blocks/HeroVisuals";
import { TabsBlock } from "@/components/blocks/TabsBlock";
import { DataTable } from "@/components/blocks/DataTable";
import { Steps } from "@/components/blocks/Steps";
import { Faq } from "@/components/blocks/Faq";
import { CtaForm } from "@/components/blocks/CtaForm";
import { Section, SectionHead } from "@/components/primitives/Section";
import { CtaButton, TextLink } from "@/components/primitives/Cta";
import { PageStructuredData } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/seo";

const description =
  "Nyne Owls has developed retail point-of-sale software and is preparing pilot demonstrations. Its CRM product is in development.";

export const metadata = pageMeta({
  title: "Retail Point of Sale & CRM Software",
  description,
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageStructuredData name="Nyne Owls Products" description={description} path="/products" />
      <Hero
        eyebrow="Nyne Owls Products"
        lines={["Software that", "fits how you", "work."]}
        lead={description}
        actions={
          <>
            <CtaButton href="#demo">Request a pilot demo</CtaButton>
            <TextLink href="#status">See product status</TextLink>
          </>
        }
        visual={<ProductStatus />}
      />

      <Section id="products">
        <SectionHead
          eyebrow="Product portfolio"
          title="Two products. One honest picture."
          text="Choose a product to see what it is for and what happens next."
        />
        <TabsBlock
          id="products-tabs"
          items={[
            {
              label: "Point of Sale",
              tag: "Developed",
              title: "Point of Sale (POS)",
              text: "A sales system for retailers and operators who need reliable selling, inventory and customer workflows. Capabilities, deployment and integrations are being documented and verified.",
              sideTag: "Next steps",
              side: ["Document supported workflows", "Confirm deployment and integrations", "Security and reliability review", "Prepare pilot demonstrations"],
            },
            {
              label: "CRM",
              tag: "In development",
              title: "Customer Relationship Management (CRM)",
              text: "A tool for businesses that want customer conversations and records in one organised place. Target customer and scope are being defined.",
              sideTag: "Next steps",
              side: ["Define the target customer", "Fix the MVP scope", "Plan the data model", "Set launch criteria"],
            },
          ]}
        />
      </Section>

      <Section id="status" alt>
        <SectionHead
          eyebrow="Feature status"
          title="Live, beta, planned or unavailable. Never blurred."
          text="Features are listed only once verified."
        />
        <DataTable
          head={["Workflow area", "Point of Sale", "CRM"]}
          rows={[
            ["Sales workflows", "Being documented", "Not in scope"],
            ["Inventory", "Being documented", "Not in scope"],
            ["Customer records", "Being documented", "Core use cases being defined"],
            ["Integrations", "Being documented", "Being scoped"],
            ["Data export", "Being documented", "Being scoped"],
            ["Security and access", "Review pending", "Designed in from the start"],
          ]}
        />
      </Section>

      <Section id="gates">
        <SectionHead
          eyebrow="Release gates"
          title="Working on one machine is not production-ready."
          text="Every product passes seven gates before public launch."
        />
        <Steps
          cols={4}
          items={[
            { title: "Internal testing", text: "Documented workflows tested and fixed." },
            { title: "Pilot users", text: "Real businesses, real conditions." },
            { title: "Documented feedback", text: "Findings recorded and acted on." },
            { title: "Security review", text: "Access, backups, data protection." },
            { title: "Support readiness", text: "Onboarding and response expectations." },
            { title: "Pricing and terms", text: "Validated with customers first." },
            { title: "Public launch", text: "Announced with accurate status." },
          ]}
        />
      </Section>

      <Faq
        heading="Straight answers."
        items={[
          { q: "Is the POS available now?", a: "The point-of-sale software has been developed, and pilot demonstrations are being prepared. Ask us about its current capabilities and availability." },
          { q: "Is the CRM available?", a: "No. It is in development, and we will share scope and launch criteria once confirmed." },
          { q: "How will software be priced?", a: "Subscription, licence, setup and support models are being validated with customers before pricing is published." },
          { q: "How is security handled?", a: "Access control, backups, privacy and incident response are release gates before public launch." },
        ]}
      />

      <CtaForm
        id="demo"
        eyebrow="Request a demo"
        title="See it in your workflow"
        text="Tell us how your business operates. We will say what is ready today, what is not, and whether a pilot makes sense."
        button="Request demo"
        subject="Demo request"
        fields={[
          { id: "n", label: "Name", type: "text" },
          { id: "e", label: "Email", type: "email" },
          { id: "p", label: "Product", type: "select", options: ["Point of Sale", "CRM", "Both"], required: true },
          { id: "b", label: "Business type", type: "select", options: ["Retail", "Food and hospitality", "Services", "Other"], required: true },
          { id: "g", label: "Current setup and needs", type: "area", full: true },
        ]}
      />
    </>
  );
}