import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteUrl } from "@/lib/textTools";

const pageUrl = `${siteUrl}/how-to-read-wingdings`;

export const metadata: Metadata = {
  title: {
    absolute: "How to Read Wingdings | Step-by-Step Guide to Decode Symbols",
  },
  description:
    "Learn how to read Wingdings with a step-by-step guide, quick decoding tips, and a simple workflow for translating symbols back to English.",
  keywords: [
    "how to read wingdings",
    "how to decode wingdings",
    "wingdings guide",
    "wingdings symbols meaning",
    "read wingdings alphabet",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "How to Read Wingdings | Step-by-Step Guide to Decode Symbols",
    description:
      "Follow a simple step-by-step process to identify Wingdings symbols, choose the right preset, and decode messages with confidence.",
    url: pageUrl,
    siteName: "Wingdings Translator",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Read Wingdings | Step-by-Step Guide to Decode Symbols",
    description:
      "Use this beginner-friendly tutorial to decode Wingdings symbols and translate messages back into English.",
  },
};

export default function HowToReadWingdingsPage() {
  const breadcrumbs = [
    { name: "Wingdings Translator", url: siteUrl },
    { name: "How to Read Wingdings", url: pageUrl },
  ];
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Read Wingdings",
    description:
      "Learn the easiest way to identify Wingdings symbols, choose the right preset, and decode messages back into readable English.",
    totalTime: "PT3M",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Wingdings text or symbols to decode",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Wingdings Translator",
        url: siteUrl,
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Identify the symbol style",
        text: "Look for repeated hands, arrows, boxes, or icon-like glyphs so you can tell whether the text matches Classic Wingdings, Gaster, Wingdings 2, Wingdings 3, or Webdings-style output.",
      },
      {
        "@type": "HowToStep",
        name: "Paste the symbols into the translator",
        text: "Drop the symbols into the translator and test the preset that best matches the visual style of the message.",
      },
      {
        "@type": "HowToStep",
        name: "Switch presets if the output looks wrong",
        text: "If the decoded text does not form readable English, try another preset before assuming the message is random.",
      },
      {
        "@type": "HowToStep",
        name: "Use a reference chart for manual checks",
        text: "Compare repeated symbols against a Wingdings alphabet chart when you want to verify individual letters or short puzzle strings by hand.",
      },
    ],
  };

  return (
    <>
      <Script
        id="how-to-read-wingdings-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <main className="mx-auto max-w-[1280px] px-3 py-5 sm:px-5 sm:py-8 xl:px-8">
        <Breadcrumbs items={breadcrumbs} />

        <article className="rounded-[1.75rem] border border-[#d8e5dc] bg-white p-6 shadow-sm sm:p-8">
          <header className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
              Step-by-Step Tutorial
            </p>
            <h1 className="mt-3 text-[2.4rem] font-black tracking-tight text-zinc-950 sm:text-[3rem]">
              How to Read Wingdings
            </h1>
            <p className="mt-4 text-lg leading-8 text-zinc-600">
              Reading Wingdings gets much easier once you stop treating every
              symbol string like it uses the same alphabet. The fastest workflow is
              to recognize the symbol family first, test the matching preset, and
              then confirm tricky letters with a reference chart.
            </p>
          </header>

          <section className="mt-8 rounded-[1.35rem] border border-[#d8e5dc] bg-[#f8fcfa] p-5">
            <h2 className="text-2xl font-black tracking-tight text-zinc-950">
              Quick Summary
            </h2>
            <ul className="mt-4 space-y-3 text-base leading-8 text-zinc-700">
              <li>
                <strong>Step 1:</strong> Identify whether the message looks like
                Classic Wingdings, Gaster, Wingdings 2, Wingdings 3, or Webdings.
              </li>
              <li>
                <strong>Step 2:</strong> Paste the symbols into our{" "}
                <Link href="/" className="font-semibold text-[#0f766e] underline underline-offset-4">
                  free Wingdings translator
                </Link>{" "}
                and test the closest preset.
              </li>
              <li>
                <strong>Step 3:</strong> If the output is unreadable, switch presets
                before deciding the text cannot be decoded.
              </li>
              <li>
                <strong>Step 4:</strong> Use an alphabet chart or comparison page to
                double-check short puzzle strings manually.
              </li>
            </ul>
          </section>

          <div className="mt-8 grid gap-5">
            <section className="rounded-[1.35rem] border border-[#e4ece6] bg-[#fafcfb] p-5">
              <h2 className="text-2xl font-black tracking-tight text-zinc-950">
                Step 1: Identify the symbol family
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-zinc-700">
                <p>
                  Repeated hands, arrows, circles, squares, and icon-like shapes
                  are the first clue that you are looking at a Wingdings-style
                  alphabet instead of random decorative symbols.
                </p>
                <p>
                  This matters because different presets use different mappings.
                  Classic Wingdings feels familiar and icon-heavy, Gaster looks more
                  like mystery-symbol text, and Wingdings 2 or 3 lean more heavily
                  into geometric and directional glyphs.
                </p>
              </div>
            </section>

            <section className="rounded-[1.35rem] border border-[#e4ece6] bg-[#fafcfb] p-5">
              <h2 className="text-2xl font-black tracking-tight text-zinc-950">
                Step 2: Use the translator before decoding by hand
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-zinc-700">
                <p>
                  The easiest way to read Wingdings is to paste the message into a
                  translator and let the tool test the mapping in real time. That is
                  faster and more accurate than manually guessing each symbol one by
                  one.
                </p>
                <p>
                  If you want to start immediately, open the{" "}
                  <Link href="/" className="font-semibold text-[#0f766e] underline underline-offset-4">
                    main Wingdings translator
                  </Link>{" "}
                  and try the preset that visually matches your message.
                </p>
              </div>
            </section>

            <section className="rounded-[1.35rem] border border-[#e4ece6] bg-[#fafcfb] p-5">
              <h2 className="text-2xl font-black tracking-tight text-zinc-950">
                Step 3: Switch presets if the output looks wrong
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-zinc-700">
                <p>
                  One of the biggest mistakes users make is assuming every
                  Wingdings translator on the web follows the same alphabet table.
                  They do not. Some sites simplify the mapping for readability or
                  copy-paste behavior, which means the same symbol string can decode
                  differently across tools.
                </p>
                <p>
                  If the first result looks like gibberish, switch to another preset
                  before giving up. In many cases the message becomes readable after
                  one or two preset changes.
                </p>
              </div>
            </section>

            <section className="rounded-[1.35rem] border border-[#e4ece6] bg-[#fafcfb] p-5">
              <h2 className="text-2xl font-black tracking-tight text-zinc-950">
                Step 4: Confirm tricky letters with a chart
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-zinc-700">
                <p>
                  For short puzzle strings, fandom clues, or messages with repeated
                  symbols, a reference chart is still useful. It helps you validate
                  individual letters and catch places where Unicode rendering may
                  differ from device to device.
                </p>
                <p>
                  For a quick manual reference, visit the{" "}
                  <Link href="/wingdings-alphabet" className="font-semibold text-[#0f766e] underline underline-offset-4">
                    Wingdings alphabet page
                  </Link>{" "}
                  and compare the symbols side by side.
                </p>
              </div>
            </section>

            <section className="rounded-[1.35rem] border border-[#d8e5dc] bg-[#f8fcfa] p-5">
              <h2 className="text-2xl font-black tracking-tight text-zinc-950">
                Helpful next steps
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="rounded-full border border-[#d8e5dc] bg-white px-4 py-2 text-sm font-semibold text-[#0f766e] transition hover:border-emerald-300 hover:text-emerald-800"
                >
                  Use the Wingdings translator
                </Link>
                <Link
                  href="/wingdings-alphabet"
                  className="rounded-full border border-[#d8e5dc] bg-white px-4 py-2 text-sm font-semibold text-[#0f766e] transition hover:border-emerald-300 hover:text-emerald-800"
                >
                  Open the alphabet chart
                </Link>
                <Link
                  href="/webdings-translator"
                  className="rounded-full border border-[#d8e5dc] bg-white px-4 py-2 text-sm font-semibold text-[#0f766e] transition hover:border-emerald-300 hover:text-emerald-800"
                >
                  Compare Webdings output
                </Link>
              </div>
            </section>
          </div>
        </article>
      </main>
    </>
  );
}
