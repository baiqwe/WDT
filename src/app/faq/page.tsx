import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteUrl } from "@/lib/textTools";

const breadcrumbs = [
  { name: "Wingdings Translator", url: siteUrl },
  { name: "FAQ", url: `${siteUrl}/faq` },
];

const faqItems = [
  {
    question: "What is a Wingdings translator?",
    answer:
      "A Wingdings translator is a tool that turns plain text into symbol-style output or helps decode supported symbols back into readable text. On this site, the tool is designed for practical copy-and-paste use rather than only showing a legacy font sample.",
  },
  {
    question: "Why do different Wingdings translators show different results?",
    answer:
      "Different sites often use different mapping philosophies. Some try to imitate older symbol font behavior, while others use simplified or custom A-Z replacement tables that are easier to read, share, and decode on modern devices.",
  },
  {
    question: "What does this site support besides Wingdings?",
    answer:
      "The main hub focuses on Wingdings-style mappings, but the site also includes subscript, cursive, and old english text tools to cover adjacent search intent and give visitors useful internal paths instead of dead ends.",
  },
  {
    question: "Can I use the generated text on Discord, TikTok, X, or Instagram?",
    answer:
      "Usually yes, but platform support varies. Short strings tend to work best because apps, browsers, and operating systems do not all render the same Unicode characters in the same way.",
  },
  {
    question: "Does this site guarantee that every symbol will look the same on every device?",
    answer:
      "No. One of the most important limitations to state clearly is that Unicode display is not universal. A symbol that looks correct on one device can appear differently, fall back to another glyph, or fail to render cleanly somewhere else.",
  },
  {
    question: "How should I choose between Classic Wingdings, Gaster Style, Wingdings 2, Wingdings 3, and Webdings Style?",
    answer:
      "Classic Wingdings is the best starting point if you want the most familiar symbol-letter look. Gaster Style is useful for Undertale-inspired aesthetics. Wingdings 2 and 3 are better when you want more geometric or directional symbols, while Webdings is closer to object and icon style output.",
  },
  {
    question: "Is this a downloadable font library?",
    answer:
      "No. The site is built around browser-based text transformation and reference content. It is meant to help users understand and copy output quickly rather than distribute desktop font files.",
  },
  {
    question: "How often is the content reviewed or updated?",
    answer:
      "The goal is to update pages whenever mappings, layouts, legal information, or support guidance change. Helpful content should stay aligned with what users actually need, so updates focus on clarity, trust, and real task completion instead of filler.",
  },
];

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Detailed answers about Wingdings translation, Unicode behavior, preset differences, compatibility, and how to use related text tools.",
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
};

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-8 text-zinc-700">
          This FAQ is meant to do more than answer short one-line questions. It is
          here to explain how the tool works, where symbol output can be useful,
          where Unicode limitations still apply, and how to choose the right preset
          for the job. That kind of context matters for users and search engines
          alike, because a helpful page should solve the task and explain the tradeoffs.
        </p>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-950">What this page covers</h2>
          <div className="mt-4 space-y-4 text-base leading-8 text-zinc-700">
            <p>
              The most common confusion around Wingdings tools is that people assume
              there is a single universal alphabet. In reality, many sites publish
              different mappings and present them as if they were interchangeable.
              We call that out directly because transparency is part of trust.
            </p>
            <p>
              This page also explains a second important limitation: symbol text may
              look different depending on the device, browser, app, or operating
              system. A useful answer page should not hide that reality behind a
              marketing claim.
            </p>
          </div>
        </section>

        <div className="mt-8 space-y-4">
          {faqItems.map((item) => (
            <section
              key={item.question}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-zinc-950">{item.question}</h2>
              <p className="mt-3 text-base leading-8 text-zinc-700">
                {item.answer}
              </p>
            </section>
          ))}
        </div>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-950">Helpful next steps</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link href="/" className="rounded-2xl border border-zinc-200 px-4 py-4 text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              Open the main Wingdings Translator
            </Link>
            <Link href="/help" className="rounded-2xl border border-zinc-200 px-4 py-4 text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              Read the Help Center
            </Link>
            <Link href="/about" className="rounded-2xl border border-zinc-200 px-4 py-4 text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              Learn about our editorial approach
            </Link>
            <Link href="/contact" className="rounded-2xl border border-zinc-200 px-4 py-4 text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              Contact us with a correction or request
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
