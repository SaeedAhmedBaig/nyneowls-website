// lib/email/index.ts
import "server-only";

export { autoReply } from "./templates/auto-reply";
export { blogCommentNotification } from "./templates/blog-comment";
export { newsletterConfirmation, newsletterWelcome } from "./templates/newsletter";
export { teamNotification } from "./templates/team-notification";
export { getMailConfig, getTransactionalMailConfig, sendEmail } from "./send";
export type { BuiltEmail, EmailInput, Field } from "./types";