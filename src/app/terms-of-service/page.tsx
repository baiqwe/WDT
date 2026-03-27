import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";
import { siteUrl } from "@/lib/textTools";

const breadcrumbs = [
  { name: "Wingdings Translator", url: siteUrl },
  { name: "Terms of Service", url: `${siteUrl}/terms-of-service` },
];

export const metadata: Metadata = {
  title: "Terms of Service | Wingdings Translator",
  description:
    "Read the terms for using Wingdings Translator and its related copy-paste text tools.",
  alternates: {
    canonical: `${siteUrl}/terms-of-service`,
  },
};

export default function TermsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <Script
        id="terms-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
          Terms of Service
        </h1>
        <div className="mt-6 space-y-4 text-base leading-8 text-zinc-700">
          <p>
            By using Wingdings Translator, you agree to use the site lawfully and
            responsibly. The tools are provided for general creative and utility use.
          </p>
          <p>
            We do not guarantee identical rendering across every platform, app, or
            device, because Unicode support and legacy symbol-font behavior can vary.
          </p>
          <p>
            The service is provided as available. If you have a legal or support
            question, contact{" "}
            <a href="mailto:hello@wingdingstranslator.org" className="font-semibold text-sky-700 underline">
              hello@wingdingstranslator.org
            </a>
            .
          </p>
        </div>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-950">Related pages</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/privacy-policy" className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              Privacy Policy
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
    </>
  );
}
