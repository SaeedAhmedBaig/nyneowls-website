export type Status = "concept" | "in-development" | "prototype" | "pilot" | "live";

export const STATUS_ORDER: Status[] = ["concept", "in-development", "prototype", "pilot", "live"];

export const STATUS: Record<Status, { label: string; meaning: string }> = {
  concept: { label: "Concept", meaning: "Planned and documented. Not yet being built." },
  "in-development": { label: "In development", meaning: "Being built. Not ready to use." },
  prototype: { label: "Prototype", meaning: "Built and working. Still being tested." },
  pilot: { label: "Pilot", meaning: "Being used by a small group of real users." },
  live: { label: "Live", meaning: "Released and supported." },
};