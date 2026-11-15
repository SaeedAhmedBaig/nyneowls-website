import { projects } from "./projects";

export const listed = (kind?: "product" | "original") =>
  projects
    .filter((p) => p.listed && (!kind || p.kind === kind))
    .sort((a, b) => a.order - b.order);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug && p.listed);