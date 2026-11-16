export type LegalDoc = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const LEGAL_UPDATED = "14 November 2026";

const allLegalDocs: LegalDoc[] = [
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
          "If you submit a journal comment, we collect the display name and comment text you provide. Comments are held for moderation; approved comments display your name and text publicly.",
          "If you join the journal newsletter, we collect your email address, consent time and signup source. We send a confirmation email and only add the address to the mailing list after you confirm.",
          "We use temporary keyed hashes of request IP addresses for spam prevention, rather than storing the raw address in our rate-limit table. These rate-limit records are removed after 24 hours.",
          "Your light or dark theme choice is saved in your browser so the site remembers it. It is not sent to us.",
        ],
      },
      {
        heading: "How we use it",
        paragraphs: [
          "We use enquiry details to reply and prepare proposals; comment details to review and publish comments; and newsletter details to send occasional journal and design updates after confirmation. We also use limited request data to prevent spam and abuse. We do not sell personal data.",
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
          "We use Supabase to host the website's database and Resend to deliver transactional emails, including newsletter confirmation and comment notifications. These providers process information for us to provide the requested service.",
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
          "We keep enquiry details as long as needed to respond and maintain a reasonable record. Published comments remain visible until removed; pending or rejected comments are retained for moderation and abuse prevention. Newsletter records are retained while subscribed and may be kept after unsubscribe to record consent and honour the opt-out. You can ask to access, correct or delete your information, or unsubscribe using the link in a newsletter email, by contacting us.",
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
    description: "How refunds and cancellations work for Nyne Owls services and products.",
    intro: "How refunds and cancellations work for our services and products.",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "The rules below apply once the relevant products and services are live.",
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
];

export const legalDocs = allLegalDocs;

export function getDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug);
}