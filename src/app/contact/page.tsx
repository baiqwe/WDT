import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";
import { siteUrl } from "@/lib/textTools";

const breadcrumbs = [
  { name: "Wingdings Translator", url: siteUrl },
  { name: "Contact", url: `${siteUrl}/contact` },
];

export const metadata: Metadata = {
  title: "Contact | Wingdings Translator",
  description:
    "Contact Wingdings Translator for feedback, bug reports, or partnership questions about the site and its text tools.",
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <Script
        id="contact-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
          Contact
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-700">
          Use this page for product feedback, bug reports, content corrections,
          or partnership inquiries related to Wingdings Translator and its
          supporting text tools.
        </p>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-950">Email</h2>
          <p className="mt-3 text-base leading-8 text-zinc-700">
            <a
              href="mailto:hello@wingdingstranslator.org"
              className="font-semibold text-sky-700 underline"
            >
              hello@wingdingstranslator.org
            </a>
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-950">Helpful links</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/about" className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              About
            </Link>
            <Link href="/help" className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              Help Center
            </Link>
            <Link href="/privacy-policy" className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              Terms of Service
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
