import type { Metadata } from "next";
import { NewsletterTokenAction } from "@/components/blog/NewsletterTokenAction";

export const metadata: Metadata = {
  title: "Confirm your journal subscription",
  robots: { index: false, follow: false },
};

export default function NewsletterConfirmPage() {
  return <NewsletterTokenAction action="confirm" />;
}
