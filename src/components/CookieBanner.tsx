"use client";

import { useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(
    () =>
      typeof window !== "undefined" &&
      !window.localStorage.getItem("cookie-consent"),
  );

  const acceptCookies = () => {
    window.localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 rounded-[1.5rem] border border-zinc-700 bg-zinc-950/95 p-4 text-white shadow-2xl backdrop-blur sm:flex-row">
        <p className="text-sm leading-7 text-zinc-200">
          We use cookies, analytics, and ad-tech providers to keep the site running
          and understand usage patterns.{" "}
          <Link
            href="/privacy-policy"
            aria-label="Read the privacy policy"
            className="font-semibold text-sky-300 underline"
          >
            Privacy Policy
          </Link>
        </p>
        <button
          type="button"
          onClick={acceptCookies}
          className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-400"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
