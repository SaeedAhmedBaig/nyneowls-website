import { Hero } from "@/components/blocks/Hero";
import { StudioAside } from "@/components/blocks/HeroVisuals";
import { Rows } from "@/components/blocks/Rows";
import { Steps } from "@/components/blocks/Steps";
import { CardGrid } from "@/components/blocks/CardGrid";
import { Faq } from "@/components/blocks/Faq";
import { CtaForm } from "@/components/blocks/CtaForm";
import { Section, SectionHead } from "@/components/primitives/Section";
import { CtaButton, TextLink } from "@/components/primitives/Cta";
import { JsonLd, PageStructuredData } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

const description =
  "Nyne Owls Creative Studio provides brand identity, graphic design, art direction, packaging, editorial, and website design for businesses.";

export const metadata = pageMeta({
  title: "Brand Identity & Graphic Design Studio",
  description,
  path: "/studio",
});

export default function CreativeStudioPage() {
  return (
    <>
      <PageStructuredData name="Nyne Owls Creative Studio" description={description} path="/studio" />
      <JsonLd
        data={serviceSchema({
          name: "Brand identity and graphic design",
          description,
          path: "/studio",
          serviceType: "Brand identity, graphic design, art direction, packaging, editorial, and website design",
        })}
      />
      <Hero
        eyebrow="Nyne Owls Creative Studio"
        lines={["Brands with", "a point of view."]}
        lead={description}
        actions={
          <>
            <CtaButton href="#brief">Start a project</CtaButton>
            <TextLink href="#process">See how we work</TextLink>
          </>
        }
        visual={<StudioAside />}
      />

      <Section id="services">
        <SectionHead
          eyebrow="Five service pillars"
          title="Strategy first. Craft always."
          text="Each pillar is scoped around the outcome you need, with inclusions, exclusions and revisions agreed up front."
        />
        <Rows
          items={[
            { title: "Brand identity design", text: "Logo, visual language and guidelines built from strategy.", tags: ["Logo design", "Visual language", "Guidelines"] },
            { title: "Graphic & communication design", text: "Campaigns, social systems and collateral that feel like one organisation.", tags: ["Campaigns", "Social media", "Presentations"] },
            { title: "Art direction", text: "Visual concepts and production guidance so the idea survives delivery.", tags: ["Concepts", "Direction", "Production"] },
            { title: "Packaging & editorial design", text: "Packaging, publications and layouts that organise information.", tags: ["Packaging", "Publications", "Layouts"] },
            { title: "Web & digital design", text: "Websites, interfaces and landing pages designed for clarity and accessibility.", tags: ["Web & UI", "Landing pages", "Campaign assets"] },
          ]}
        />
      </Section>

      <Section alt>
        <SectionHead
          eyebrow="Selected work"
          title="Case studies, explained properly."
          text="We publish curated projects with the brief, challenge, approach, deliverables and our exact role. Case studies go live once client permission is confirmed."
        />
        <Steps
          cols={5}
          items={[
            { title: "Brief", text: "What the client asked for and why." },
            { title: "Challenge", text: "The real problem behind the request." },
            { title: "Approach", text: "The thinking that shaped the work." },
            { title: "Deliverables", text: "Exactly what we produced, and our role." },
            { title: "Result", text: "What changed for the client." },
          ]}
        />
      </Section>

      <Section>
        <SectionHead eyebrow="How we engage" title="Three ways to work together." />
        <CardGrid
          cols={3}
          items={[
            { num: "01", tag: "Defined outcome", title: "Fixed-scope project", text: "Best when deliverables are clear, such as an identity or campaign.", list: ["Scope and timeline agreed", "Milestone delivery", "Revision rounds stated"] },
            { num: "02", tag: "Ongoing", title: "Retainer", text: "Best for teams that need steady design capacity.", list: ["Agreed monthly scope", "Priority scheduling", "Regular reviews"] },
            { num: "03", tag: "Flexible", title: "Hourly engagement", text: "Best for specific tasks, advice or uncertain scope.", list: ["Agreed rate and cap", "Transparent time reporting", "Can grow into a project"] },
          ]}
        />
      </Section>

      <Section id="process" alt>
        <SectionHead eyebrow="Enquiry to follow-up" title="Nine steps. No surprises." />
        <Steps
          cols={3}
          items={[
            { title: "Enquiry", text: "Goals, timing, budget range." },
            { title: "Qualification", text: "We confirm the fit." },
            { title: "Discovery", text: "Problem, audience, constraints." },
            { title: "Proposal", text: "Deliverables, timeline, price." },
            { title: "Agreement", text: "Terms and deposit." },
            { title: "Production", text: "Made with milestones." },
            { title: "Review", text: "Feedback in agreed rounds." },
            { title: "Delivery", text: "Organised final files." },
            { title: "Follow-up", text: "A check-in after launch." },
          ]}
        />
      </Section>

      <CtaForm
        id="brief"
        eyebrow="Project brief"
        title="Tell us about your project"
        text="Short and structured. Nothing here commits you, and we reply with what happens next."
        button="Send brief"
        subject="Project brief"
        fields={[
          { id: "n", label: "Name", type: "text" },
          { id: "e", label: "Email", type: "email" },
          { id: "t", label: "Project type", type: "select", options: ["Brand identity", "Graphic & communication design", "Art direction", "Packaging & editorial", "Web & digital design", "Not sure yet"] },
          { id: "b", label: "Approximate budget", type: "select", options: ["Not sure yet", "Small project", "Medium project", "Large project", "Ongoing retainer"] },
          { id: "d", label: "Desired timing", type: "text" },
          { id: "r", label: "Reference links", type: "text" },
          { id: "g", label: "Goals", type: "area", full: true },
        ]}
      />

      <Faq
        heading="Before you brief us."
        items={[
          { q: "Do you publish prices?", a: "Bespoke work is scoped individually. Share your budget and we will give a clear range early." },
          { q: "How many revisions are included?", a: "Rounds are stated in every proposal, with what counts as a revision and what counts as new scope." },
          { q: "Who owns the final work?", a: "Ownership and usage terms are written into the agreement before production begins." },
          { q: "Can you work with our existing brand?", a: "Yes. We can extend, audit or rebuild an identity depending on the brief." },
        ]}
      />
    </>
  );
}