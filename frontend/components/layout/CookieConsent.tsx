"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const consentStorageKey = "nyne-cookie-consent-v1";
const subscribers = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  subscribers.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    subscribers.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(consentStorageKey);
}

function getServerSnapshot() {
  return null;
}

export function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const chooseConsent = (choice: "accepted" | "necessary") => {
    window.localStorage.setItem(consentStorageKey, choice);
    subscribers.forEach((onStoreChange) => onStoreChange());
  };

  if (consent !== null) return null;

  return (
    <aside
      aria-label="Cookie notice"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-2xl border border-line bg-background p-5 shadow-xl"
    >
      <p className="text-sm leading-6">
        We use essential cookies for secure admin sign-in. We do not use analytics or advertising cookies.
        Read our{" "}
        <Link href="/privacy" className="font-semibold underline underline-offset-2 hover:text-nyne-text">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => chooseConsent("accepted")}
          className="min-h-11 bg-ink px-4 text-xs font-semibold text-onink transition-colors hover:bg-nyne hover:text-white"
        >
          Accept cookies
        </button>
        <button
          type="button"
          onClick={() => chooseConsent("necessary")}
          className="min-h-11 border border-line px-4 text-xs font-semibold transition-colors hover:bg-card"
        >
          Only necessary
        </button>
      </div>
    </aside>
  );
}
