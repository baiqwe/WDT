import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getTranslatorVariants, siteUrl } from "@/lib/textTools";

const pageUrl = `${siteUrl}/wingdings-alphabet`;
const chartVariants = getTranslatorVariants("wingdings").filter((variant) =>
  ["classic", "gaster", "webdings"].includes(variant.id),
);

const faqItems = [
  {
    question: "Why do some Wingdings charts look different on other sites?",
    answer:
      "Different sites often publish different mapping tables, especially for fandom use and copy-paste convenience. That is why comparison charts matter.",
  },
  {
    question: "Does this page include numbers too?",
    answer:
      "This chart focuses on the letter mappings that are most consistently searched. Number mappings are less standardized across simplified online translator tables.",
  },
  {
    question: "Can I use this chart for decoding?",
    answer:
      "Yes. You can compare letters and symbols manually here, or jump to the translator tool for faster reverse decoding.",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: "Wingdings Alphabet Chart & Translation Table (A-Z)",
  },
  description:
    "Complete Wingdings alphabet chart for easy translation. View A-Z and a-z symbol mappings for Classic Wingdings, Gaster, and Webdings. Free to save or print.",
  keywords: [
    "wingdings alphabet",
    "wingdings chart",
    "wingdings a-z",
    "wingdings translation table",
    "wingdings symbols meaning",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Wingdings Alphabet Chart & Translation Table (A-Z)",
    description:
      "Browse a clean A-Z Wingdings chart with Classic, Gaster, and Webdings comparison tables you can use for reference or decoding.",
    url: pageUrl,
    siteName: "Wingdings Translator",
    type: "website",
  },
};

export default function WingdingsAlphabetPage() {
  const breadcrumbs = [
    { name: "Wingdings Translator", url: siteUrl },
    { name: "Wingdings Alphabet Chart", url: pageUrl },
  ];
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
    <main className="mx-auto max-w-[1280px] px-3 py-5 sm:px-5 sm:py-8 xl:px-8">
      <Script
        id="wingdings-alphabet-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumbs items={breadcrumbs} />

      <section className="rounded-[1.75rem] border border-[#d8e5dc] bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
          Visual Reference
        </p>
        <h1 className="mt-3 text-[2.4rem] font-black tracking-tight text-zinc-950 sm:text-[3rem]">
          Wingdings Alphabet Translation Chart (A-Z)
        </h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-zinc-600">
          This page is built for visitors who want a clean reference table instead
          of an input box. Use it to compare letter-by-letter symbol mappings for
          Classic Wingdings, Gaster-style text, and Webdings-inspired output.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.25rem] border border-[#d8e5dc] bg-[#fafcfb] p-5">
            <h2 className="text-lg font-bold text-zinc-950">Fast lookup</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              Check individual letters quickly when you need to decode a short symbol
              string or verify a mock design.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-[#d8e5dc] bg-[#fafcfb] p-5">
            <h2 className="text-lg font-bold text-zinc-950">Multiple presets</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              Compare popular online mapping styles instead of assuming every site
              uses one universal table.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-[#d8e5dc] bg-[#fafcfb] p-5">
            <h2 className="text-lg font-bold text-zinc-950">Saveable layout</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              The tables are designed to be screenshot-friendly if you want a quick
              chart for later reference.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6">
        {chartVariants.map((variant) => {
          const lowercaseMap = variant.lowerMap ?? variant.upperMap;

          return (
            <article
              key={variant.id}
              className="rounded-[1.5rem] border border-[#d8e5dc] bg-white p-5 shadow-sm"
            >
              <div className="max-w-4xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  {variant.name}
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-950">
                  {variant.name} Letter Chart
                </h2>
                <p className="mt-3 text-base leading-8 text-zinc-600">
                  {variant.description}
                </p>
              </div>

              <div className="mt-5 grid gap-6 xl:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    Uppercase A-Z
                  </h3>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {variant.upperMap.map((symbol, index) => (
                      <div
                        key={`${variant.id}-upper-${index}`}
                        className="rounded-[1rem] border border-[#e4ece6] bg-[#fafcfb] px-4 py-3"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                          {String.fromCharCode(65 + index)}
                        </p>
                        <p className="mt-2 text-2xl text-zinc-950">{symbol}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    Lowercase a-z
                  </h3>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {lowercaseMap.map((symbol, index) => (
                      <div
                        key={`${variant.id}-lower-${index}`}
                        className="rounded-[1rem] border border-[#e4ece6] bg-[#fafcfb] px-4 py-3"
                      >
                        <p className="text-xs font-semibold tracking-[0.16em] text-zinc-500">
                          {String.fromCharCode(97 + index)}
                        </p>
                        <p className="mt-2 text-2xl text-zinc-950">{symbol}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="mt-6 rounded-[1.5rem] border border-[#d8e5dc] bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-black tracking-tight text-zinc-950">
          How to use this chart well
        </h2>
        <div className="mt-4 space-y-4 text-base leading-8 text-zinc-700">
          <p>
            If you are decoding a message, start by finding a few repeated symbols
            and compare them against the same preset rather than jumping between
            tables. Consistency matters more than speed.
          </p>
          <p>
            If you are designing or recreating a symbol look, use this page as a
            visual reference first and then switch to the translator once you know
            which style best matches your goal.
          </p>
          <p>
            This chart focuses on letter mappings because that is the most common
            reference need. Numbers and special characters are less standardized
            across simplified online translator tables.
          </p>
        </div>
      </section>

      <section className="mt-6 rounded-[1.5rem] border border-[#d8e5dc] bg-[#f8fcfa] p-5 shadow-sm">
        <h2 className="text-2xl font-black tracking-tight text-zinc-950">
          Continue with the tool
        </h2>
        <p className="mt-3 max-w-4xl text-base leading-8 text-zinc-700">
          Want to translate a full message instead of checking letters one by one?
          Use the main converter for reverse decoding, preset switching, and fast
          copy-paste output.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full border border-[#0f766e] bg-[#0f766e] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#115e59]"
          >
            Open the Wingdings translator
          </Link>
          <Link
            href="/english-to-wingdings"
            className="rounded-full border border-[#cfe2d6] bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            Convert English to Wingdings
          </Link>
        </div>
      </section>

      <section className="mt-6 rounded-[1.5rem] border border-[#d8e5dc] bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-black tracking-tight text-zinc-950">FAQ</h2>
        <div className="mt-4 grid gap-4">
          {faqItems.map((item) => (
            <article
              key={item.question}
              className="rounded-[1rem] border border-[#e4ece6] bg-[#fafcfb] p-4"
            >
              <h3 className="text-lg font-bold text-zinc-950">{item.question}</h3>
              <p className="mt-2 text-base leading-7 text-zinc-700">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
