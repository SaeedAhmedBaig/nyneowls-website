import type { Metadata } from "next";
import { NewsletterTokenAction } from "@/components/blog/NewsletterTokenAction";

export const metadata: Metadata = {
  title: "Newsletter preferences",
  robots: { index: false, follow: false },
};

export default function NewsletterUnsubscribePage() {
  return <NewsletterTokenAction action="unsubscribe" />;
}
