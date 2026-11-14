export type LegalDoc = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const LEGAL_UPDATED = "14 November 2026";

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "How Nyne Owls collects, uses and protects the information you share with us.",
    intro: "How Nyne Owls collects, uses and protects the information you share with us.",
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "Nyne Owls is a creative and technology company. This policy applies to this website and to enquiries sent through it. The registered legal entity name and address will be added here once confirmed.",
        ],
      },
      {
        heading: "What we collect",
        paragraphs: [
          "Details you submit in our forms: your name, email address, the topic of your enquiry and anything you write in the message fields.",
          "Your light or dark theme choice is saved in your browser so the site remembers it. It is not sent to us.",
        ],
      },
      {
        heading: "How we use it",
        paragraphs: [
          "We use your details to reply to your enquiry, prepare proposals, send release or launch updates you asked for, and keep the website secure. We do not sell personal data.",
        ],
      },
      {
        heading: "Payments",
        paragraphs: [
          "This website does not currently take payments. When online payments are introduced, card details will be handled by a compliant payment provider and will never be stored on this website. The provider will be named here.",
        ],
      },
      {
        heading: "Sharing and service providers",
        paragraphs: [
          "We share data only with providers needed to run the business, such as email delivery and hosting, under appropriate terms. We will list them here as they are introduced.",
        ],
      },
      {
        heading: "Cookies and analytics",
        paragraphs: [
          "This site does not currently use advertising cookies. If we add analytics, we will say which tool, what it collects and how to opt out before it is switched on.",
        ],
      },
      {
        heading: "Retention and your rights",
        paragraphs: [
          "We keep enquiry details only as long as needed to respond and keep a reasonable record of the conversation. You can ask to access, correct or delete your information by emailing us, and we will reply with next steps.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: ["We will update this page as the business grows and show the date of the latest version."],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    description: "The general terms for using the Nyne Owls website and services.",
    intro: "The general terms for using this website and our services.",
    sections: [
      {
        heading: "Using this website",
        paragraphs: [
          "By using this site you agree to these terms. Please do not misuse the site, attempt to disrupt it, or access areas you are not authorised to use.",
        ],
      },
      {
        heading: "Creative services",
        paragraphs: [
          "Creative work is governed by a written proposal and agreement. Scope, fees, revisions, timelines and ownership are stated there, and the agreement takes priority over this page.",
        ],
      },
      {
        heading: "Digital goods",
        paragraphs: [
          "Digital goods are licensed, not sold outright. Use is governed by the licence terms and the details on each product page.",
        ],
      },
      {
        heading: "Software",
        paragraphs: [
          "Software is provided under the terms agreed for each product, including support, availability and any trial conditions. Product status shown on this site is accurate at the time of publication.",
        ],
      },
      {
        heading: "Stories and comics",
        paragraphs: [
          "Original series, characters and artwork are protected. You may read them and share links, but you may not copy, republish or sell the work.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "Nyne Owls keeps its rights in its content, products and original stories unless a written agreement says otherwise.",
        ],
      },
      {
        heading: "Liability and warranties",
        paragraphs: [
          "Limits on liability will be set out here after professional review, in line with the consumer rights that apply where you live.",
        ],
      },
      {
        heading: "Governing law and changes",
        paragraphs: [
          "The governing law will be confirmed with the business's legal registration and professional advice. We may update these terms and will show the date of the latest version.",
        ],
      },
    ],
  },
  {
    slug: "refunds",
    title: "Refund Policy",
    description: "How refunds and cancellations work across Nyne Owls divisions.",
    intro: "How refunds and cancellations will work across our divisions.",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Each division has different refund needs. The rules below apply once the relevant products and services are live.",
        ],
      },
      {
        heading: "Digital goods",
        paragraphs: [
          "Downloads are delivered immediately, so refund rules will be stated on each product page and at checkout before you pay. Faulty or incorrect files will be fixed or replaced.",
        ],
      },
      {
        heading: "Creative services",
        paragraphs: ["Deposits, milestone payments and cancellations are defined in each written agreement."],
      },
      {
        heading: "Software and subscriptions",
        paragraphs: ["Trials, subscriptions and cancellation terms will be set out before purchase."],
      },
      {
        heading: "How to request a refund",
        paragraphs: [
          "Email us with your order details and the reason. We will respond with next steps.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: ["We will update this page as products launch and show the date of the latest version."],
      },
    ],
  },
  {
    slug: "licences",
    title: "Licence Terms",
    description: "What you may do with Nyne Owls Digital Goods products.",
    intro: "What you may do with Digital Goods products.",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "Digital goods are licensed, not sold. Each product page states which uses it permits, and the product page takes priority over this summary.",
        ],
      },
      {
        heading: "Personal use",
        paragraphs: ["Non-commercial projects for yourself. Redistribution is not permitted."],
      },
      {
        heading: "Commercial use",
        paragraphs: [
          "Client work and products for sale, within the limits stated on the product page. A product may not be resold or shared as a standalone asset.",
        ],
      },
      {
        heading: "Extended use",
        paragraphs: ["Broader or higher-volume use, where a product offers it. Terms are defined per product."],
      },
      {
        heading: "Restrictions",
        paragraphs: ["Do not redistribute, share or resell the files, or claim them as your own work."],
      },
      {
        heading: "Ownership and questions",
        paragraphs: [
          "Nyne Owls keeps ownership of every product. If you need a custom licence, contact us before you buy.",
        ],
      },
    ],
  },
];

export function getDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug);
}