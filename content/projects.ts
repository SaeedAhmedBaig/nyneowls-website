import type { Project } from "./types";

// Statuses are honest as of now. Change one field and the whole site updates.
export const projects: Project[] = [
  {
    slug: "swiftpos",
    kind: "product",
    name: "SwiftPOS",
    tagline: "Cloud point of sale for shops and multi-branch retail.",
    summary:
      "Checkout, inventory, purchasing, HR and reporting in one system. The product is built and in testing. Deployment testing is not yet complete.",
    status: "prototype",
    listed: true,
    order: 1,
    audience: "Retailers and shop operators",
    scope: ["Checkout and barcode selling", "Inventory and stock alerts", "Purchasing and suppliers", "HR and payroll exports", "Sales and finance reports"],
    next: ["Complete deployment testing", "Pilot with real shops", "Licensed integrator route for tax integration in Pakistan"],
    links: [{ label: "View prototype", href: "https://swiftposs.vercel.app/" }],
    cta: { label: "Join the pilot list", href: "/work-with-us" },
  },
  {
    slug: "nexuscrm",
    kind: "product",
    name: "NexusCRM",
    tagline: "A customer workspace for sales, support and renewals.",
    summary:
      "Pipelines, tasks, campaigns and customer history in one place, with role-based access. In development.",
    status: "in-development",
    listed: true,
    order: 2,
    audience: "Small and growing sales and support teams",
    scope: ["Sales pipeline and deals", "Tasks and workflows", "Campaigns", "Role-based access and audit trail"],
    next: ["Confirm launch scope", "Test with early users"],
    links: [{ label: "View prototype", href: "https://nexus-crm-frontend-three.vercel.app/" }],
    cta: { label: "Talk to us about NexusCRM", href: "/work-with-us" },
  },
  {
    slug: "mehwar",
    kind: "product",
    name: "Mehwar",
    tagline: "One platform for people, work and customers.",
    summary:
      "A planned workforce and operations platform: attendance, leave, payroll inputs, work management and customer records on one shared data model. Currently a detailed proposal.",
    status: "concept",
    listed: true,
    order: 3,
    audience: "Mid-size multi-branch companies",
    scope: ["Attendance and leave", "Payroll inputs", "Work management", "Customer records"],
    next: ["Discovery with early users", "Budget and phase plan"],
    cta: { label: "Follow Mehwar", href: "/work-with-us" },
  },
  {
    slug: "the-world-below-the-world",
    kind: "original",
    name: "The World Below the World",
    tagline: "An original manga universe beneath our own.",
    summary:
      "A naturally formed underground world with five distinct regions, its own ecology and societies, and a story built to be read as manga. The universe is documented in detail. Story architecture is the next phase.",
    status: "in-development",
    listed: true,
    order: 1,
    facts: [
      { label: "Format", value: "Manga" },
      { label: "Regions", value: "5" },
    ],
    next: ["Master story architecture", "Character designs", "First chapter"],
    cta: { label: "Follow the series", href: "/work-with-us" },
  },
  {
    slug: "the-hollow-hour",
    kind: "original",
    name: "The Hollow Hour",
    tagline: "A feature-length survival thriller.",
    summary: "An original screenplay set in a decommissioned salt-mine laboratory in Punjab.",
    status: "in-development",
    listed: false, // keep hidden until you decide what to share publicly
    order: 2,
  },
];