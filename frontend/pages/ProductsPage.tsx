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
  "NynePOS is nearing completion, with pilot demonstrations in preparation. NyneCRM is in development, with its product areas taking shape.";

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
        lines={["Tools for", "the work your", "team does."]}
        lead={description}
        actions={
          <>
            <CtaButton href="#demo">Ask about a product</CtaButton>
            <TextLink href="#status">Compare product stages</TextLink>
          </>
        }
        visual={<ProductStatus />}
      />

      <Section id="products">
        <SectionHead
          eyebrow="Product portfolio"
          title="Software shaped around real business work."
          text="Explore the areas shown in each product dashboard, then check its current stage and access."
        />
        <TabsBlock
          id="products-tabs"
          items={[
            {
              label: "NynePOS",
              tag: "Near completion",
              title: "NynePOS — retail operations, organised around the sale.",
              text: "NynePOS is being developed for retailers who want checkout and everyday store operations in one place. Its dashboard brings together POS mode, products and stock, sales, purchasing, finance, reporting, stores, billing and people operations.",
              sideTag: "Product areas",
              side: ["Point-of-sale mode and sales", "Products, stock and inventory", "Purchasing, finance and reports", "Stores, billing and people operations"],
              linkHref: "https://swiftposs.vercel.app/",
              linkLabel: "Explore the NynePOS preview",
            },
            {
              label: "NyneCRM",
              tag: "In development",
              title: "NyneCRM — customer and team work, connected.",
              text: "NyneCRM is taking shape around customer relationships, sales, marketing and service, alongside projects, tasks, reports, integrations and account settings. Its dashboard offers an early view of how those work areas are organised while the product is in development.",
              sideTag: "Product areas",
              side: ["CRM and sales", "Marketing and service", "Projects and tasks", "Reports, integrations and tenant settings"],
              linkHref: "https://nexus-crm-frontend-three.vercel.app/",
              linkLabel: "Explore the NyneCRM preview",
            },
          ]}
        />
      </Section>

      <Section id="status" alt>
        <SectionHead
          eyebrow="Product snapshot"
          title="A clear view of what’s taking shape."
          text="These are the areas shown in each product dashboard. A visible module does not mean every workflow is complete or publicly available."
        />
        <DataTable
          head={["Product detail", "NynePOS", "NyneCRM"]}
          rows={[
            ["Current stage", "Near completion", "In development"],
            ["Public access", "No public signup or trial yet", "No public signup yet"],
            ["Next step", "Pilot demonstrations are being prepared", "Core workflows are being developed"],
            ["Dashboard areas", "POS, products, stock, sales, purchases, finance, reports, stores, billing and people/HRM", "CRM, sales, marketing, service, projects, tasks, reports, integrations and tenant settings"],
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
          { q: "Can I sign up for NynePOS?", a: "NynePOS is nearing completion, but public signup and a free trial are not open yet. Contact us to ask about pilot demonstrations and current availability." },
          { q: "Can I sign up for NyneCRM?", a: "NyneCRM is in development and does not have public signup yet. Contact us to follow its progress and discuss updates." },
          { q: "How will software be priced?", a: "Subscription, licence, setup and support models are being validated with customers before pricing is published." },
          { q: "How is security handled?", a: "Access, data protection, backups and support practices are part of release validation. We will publish specific commitments only once they are verified." },
        ]}
      />

      <CtaForm
        id="demo"
        eyebrow="Product enquiry"
        title="Tell us what your business needs."
        text="Ask about NynePOS pilot demonstrations or follow NyneCRM as it develops. We’ll be clear about what is ready to preview and what is still taking shape."
        button="Send product enquiry"
        subject="Product enquiry"
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