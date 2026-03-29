import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteUrl } from "@/lib/textTools";

const breadcrumbs = [
  { name: "Wingdings Translator", url: siteUrl },
  { name: "Privacy Policy", url: `${siteUrl}/privacy-policy` },
];

export const metadata: Metadata = {
  title: "Privacy Policy | Wingdings Translator",
  description:
    "Read the privacy policy for Wingdings Translator, including cookies, analytics, and contact handling.",
  alternates: {
    canonical: `${siteUrl}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
          Privacy Policy
        </h1>
        <div className="mt-6 space-y-4 text-base leading-8 text-zinc-700">
          <p>
            Wingdings Translator is designed to keep text conversion lightweight and
            privacy-conscious. Most text processing happens in the browser.
          </p>
          <p>
            We may use analytics, advertising, and cookie storage for site
            functionality such as consent preferences and ad delivery. If you
            contact us by email, we only use the information you provide to
            respond to your message.
          </p>
          <p>
            Because the site uses Google AdSense, Google and its partners may use
            cookies or similar technologies, including signals associated with
            ad personalization and measurement, to serve and report ads. This may
            include technologies historically associated with Google advertising
            systems such as DoubleClick.
          </p>
          <p>
            Users can learn more about how Google uses information in advertising
            products and can manage or opt out of personalized advertising
            through Google&apos;s ad settings and related privacy controls.
          </p>
          <p>
            For privacy questions, contact{" "}
            <a href="mailto:hello@wingdingstranslator.org" className="font-semibold text-sky-700 underline">
              hello@wingdingstranslator.org
            </a>
            .
          </p>
        </div>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-950">Related pages</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/terms-of-service" className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              Terms of Service
            </Link>
            <Link href="/about" className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              About
            </Link>
            <Link href="/contact" className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              Contact
            </Link>
          </div>
        </section>
      </main>
  );
}
