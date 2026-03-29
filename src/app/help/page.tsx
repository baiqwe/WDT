import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteUrl } from "@/lib/textTools";

const breadcrumbs = [
  { name: "Wingdings Translator", url: siteUrl },
  { name: "Help", url: `${siteUrl}/help` },
];

export const metadata: Metadata = {
  title: "Help | Wingdings Translator",
  description:
    "Get practical help using the Wingdings translator, choosing presets, copying results, and understanding compatibility limits.",
  alternates: {
    canonical: `${siteUrl}/help`,
  },
};

export default function HelpPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
          Help Center
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-8 text-zinc-700">
          This page is meant for practical task completion. If the FAQ explains what
          the site does, the Help Center explains how to use it well: how to choose
          a preset, when to trust the output, when to test it elsewhere, and what to
          do when the result looks different from what you expected.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-zinc-950">Choose a preset</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-700">
              Start with Classic Wingdings if you want the most familiar symbol-letter
              look. Try Gaster Style when you want a more puzzle-like or fandom-driven
              visual result. Wingdings 2, Wingdings 3, and Webdings are useful when
              you want more geometric, directional, or icon-like output.
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-zinc-950">Copy the result</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-700">
              Use the selected style area if you only need one main result, or copy
              directly from an individual style card when you want to compare options.
              For social use, shorter strings usually produce more dependable results.
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-zinc-950">Check the context</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-700">
              If the output is for a post, profile, puzzle, or shared screenshot,
              test it in the environment where it will actually appear. Symbol text
              can behave differently across systems, and the safest workflow is
              always to verify the final display.
            </p>
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-950">Step-by-step workflow</h2>
          <div className="mt-4 space-y-4 text-base leading-8 text-zinc-700">
            <p>
              First, type the plain text you want to convert in the input field on
              the main tool page. The gallery will immediately show the same text in
              multiple presets so you can compare styles without re-entering anything.
            </p>
            <p>
              Next, click the style card that best matches your goal. If you want the
              most recognizable Wingdings-like mapping, use Classic Wingdings first.
              If you are exploring symbol-heavy aesthetics or looking for something
              closer to a specific visual mood, compare the other presets before you copy.
            </p>
            <p>
              Finally, paste the result into the place where it will actually be used.
              If the target environment is important, such as a public profile or a
              puzzle asset you plan to share, it is worth checking both desktop and
              mobile views before you commit to one version.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-950">Common problems and what to do</h2>
          <div className="mt-4 space-y-4 text-base leading-8 text-zinc-700">
            <p>
              If a result looks different from another site, the first thing to check
              is whether you are using the same mapping preset. This is the most common
              reason people think a translator is wrong when it is actually just using
              a different symbol table.
            </p>
            <p>
              If the output looks broken on a device, shorten the string and test a
              different preset. Simple, recognizable symbols often travel better than
              dense or highly stylized combinations. If a result is for public-facing
              use, readability should usually beat novelty.
            </p>
            <p>
              If you still are not sure which output to trust, compare the main
              translator page with the FAQ and About pages. Those pages explain the
              logic behind the tool, which often resolves uncertainty faster than
              blindly trying random conversions.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-950">Useful links</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/" className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              Wingdings Translator
            </Link>
            <Link href="/faq" className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              FAQ
            </Link>
            <Link href="/subscript-generator" className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              Subscript Generator
            </Link>
            <Link href="/cursive-generator" className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              Cursive Generator
            </Link>
            <Link href="/old-english-translator" className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              Old English Translator
            </Link>
          </div>
        </section>
      </main>
  );
}
