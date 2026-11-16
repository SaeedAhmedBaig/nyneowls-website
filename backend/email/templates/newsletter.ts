import { BRAND, SITE_URL } from "../brand";
import { button, eyebrow, layout } from "../components";
import type { BuiltEmail } from "../types";
import { esc } from "../utils";

export function newsletterConfirmation(confirmUrl: string): BuiltEmail {
  const body = `
    ${eyebrow("Nyne Owls Journal")}
    <h1 class="h1" style="margin:0 0 18px;font:800 30px/1.15 ${BRAND.font};letter-spacing:-0.035em;color:${BRAND.color.ink};">One last step.</h1>
    <p style="margin:0 0 26px;font:15px/1.7 ${BRAND.font};color:${BRAND.color.muted};">Confirm your email address to receive occasional notes about brand identity, graphic design, digital design and new journal articles.</p>
    ${button(confirmUrl, "Confirm subscription")}
    <p style="margin:24px 0 0;font:12px/1.7 ${BRAND.font};color:${BRAND.color.muted};">If you did not ask to subscribe, ignore this message. This confirmation link expires in 24 hours.</p>`;
  return {
    subject: "Confirm your Nyne Owls journal subscription",
    html: layout({
      title: "Confirm your journal subscription",
      preheader: "Confirm your email to receive occasional design and journal updates.",
      body,
      footerNote: "You are receiving this one-time confirmation because this address was entered on the Nyne Owls website.",
    }),
    text: [
      "Confirm your Nyne Owls journal subscription.",
      `Confirm: ${confirmUrl}`,
      "The link expires in 24 hours. If you did not request this, ignore this email.",
      "",
      `Nyne Owls | ${SITE_URL}`,
    ].join("\n"),
  };
}

export function newsletterWelcome(unsubscribeUrl: string): BuiltEmail {
  const body = `
    ${eyebrow("Subscription confirmed")}
    <h1 class="h1" style="margin:0 0 18px;font:800 30px/1.15 ${BRAND.font};letter-spacing:-0.035em;color:${BRAND.color.ink};">You are on the list.</h1>
    <p style="margin:0 0 26px;font:15px/1.7 ${BRAND.font};color:${BRAND.color.muted};">We will send occasional, useful updates from Nyne Owls: practical thinking on brand identity, graphic and digital design, plus new journal articles. We will not sell your address, and every newsletter will include an unsubscribe link.</p>
    ${button(`${SITE_URL}/blog`, "Read the journal")}
    <p style="margin:24px 0 0;font:12px/1.7 ${BRAND.font};color:${BRAND.color.muted};">Changed your mind? <a href="${esc(unsubscribeUrl)}" style="color:${BRAND.color.nyneText};">Unsubscribe at any time</a>.</p>`;
  return {
    subject: "You are subscribed to the Nyne Owls journal",
    html: layout({
      title: "Your Nyne Owls subscription is confirmed",
      preheader: "Your subscription is confirmed. Expect occasional design and journal updates.",
      body,
      footerNote: `You are receiving this because you confirmed a newsletter subscription on ${BRAND.name}. You can unsubscribe at any time.`,
    }),
    text: [
      "Your Nyne Owls journal subscription is confirmed.",
      "We will send occasional updates on brand identity, graphic and digital design, and new journal articles.",
      "",
      `Read the journal: ${SITE_URL}/blog`,
      `Unsubscribe: ${unsubscribeUrl}`,
      "",
      `${BRAND.name} | ${SITE_URL}`,
    ].join("\n"),
  };
}
