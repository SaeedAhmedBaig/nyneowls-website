// lib/email/index.ts
export { autoReply } from "./templates/auto-reply";
export { teamNotification } from "./templates/team-notification";
export { getMailConfig, sendEmail } from "./send";
export type { BuiltEmail, EmailInput, Field } from "./types";