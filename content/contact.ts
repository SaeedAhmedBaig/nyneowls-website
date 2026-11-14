export type Topic = { value: string; label: string; hint?: string };

export const topics: Topic[] = [
  { value: "hire", label: "Hire the studio", hint: "Brand, graphic, art direction or web design" },
  { value: "collaborate", label: "Collaborate on a story", hint: "Art, writing, music or production" },
  { value: "partner", label: "Partner on a product", hint: "Pilots, resellers and integrators" },
  { value: "goods", label: "Ask about Digital Goods", hint: "Resources and licences" },
  { value: "other", label: "Something else" },
];