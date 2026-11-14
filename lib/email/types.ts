// lib/email/types.ts

export type Field = { label: string; value: string };

/** What the contact form sends to /api/contact (after zod validation). */
export type EmailInput = {
  subject: string;
  name?: string;
  email: string;
  fields: Field[];
};

export type BuiltEmail = {
  subject: string;
  html: string;
  text: string;
};
