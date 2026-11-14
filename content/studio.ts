import type { CaseStudy, Founder } from "./types";

export const services = [
  { title: "Brand identity design", text: "Logo, visual language and guidelines built from strategy." },
  { title: "Graphic and communication design", text: "Campaigns, social systems and collateral that feel like one organisation." },
  { title: "Art direction", text: "Visual concepts and production guidance so the idea survives delivery." },
  { title: "Packaging and editorial design", text: "Packaging, publications and layouts that organise information." },
  { title: "Web and digital design", text: "Websites, interfaces and landing pages designed for clarity." },
];

// Add real entries later. Empty means the section simply does not appear.
export const caseStudies: CaseStudy[] = [];

// Fill this in later. null means no founder section.
export const founder: Founder | null = null;