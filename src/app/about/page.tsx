import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteUrl } from "@/lib/textTools";

const breadcrumbs = [
  { name: "Wingdings Translator", url: siteUrl },
  { name: "About", url: `${siteUrl}/about` },
];

export const metadata: Metadata = {
  title: "About | Wingdings Translator",
  description:
    "Learn how Wingdings Translator approaches helpful content, tool transparency, mapping differences, and user trust.",
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
          About Wingdings Translator
        </h1>

        <div className="mt-6 space-y-4 text-base leading-8 text-zinc-700">
          <p>
            Wingdings Translator was built to be more than a thin converter page.
            The project started from a simple observation: many symbol tools can
            generate output, but far fewer explain why different mappings exist,
            where the output works well, where it breaks down, and how users should
            choose between multiple presets with confidence.
          </p>
          <p>
            That gap matters because genuinely helpful content is not just about
            adding more text. It is about reducing confusion, making tradeoffs
            visible, and giving visitors enough context to complete their task
            without needing to bounce between half-explained pages.
          </p>
        </div>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-950">What we are trying to do well</h2>
          <div className="mt-4 space-y-4 text-base leading-8 text-zinc-700">
            <p>
              The site focuses on three things: working output, clear explanation,
              and trustworthy structure. Working output means the main tool should
              help people compare symbol styles quickly. Clear explanation means we
              tell users that mapping tables differ and that display consistency is
              not guaranteed across every environment. Trustworthy structure means
              the site should include legal pages, contact information, breadcrumbs,
              internal navigation, and content that reads like it was written to help
              a person instead of only attract a click.
            </p>
            <p>
              We also try to be explicit about what the project is not. It is not a
              desktop font download service, it is not a perfect archive of every
              historical symbol-font implementation, and it is not an excuse to hide
              important caveats behind marketing language.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-950">Editorial and update principles</h2>
          <div className="mt-4 space-y-4 text-base leading-8 text-zinc-700">
            <p>
              Our editorial standard follows a simple rule: if a piece of content
              does not help the user finish a real task, it should not be there.
              That means pages should explain limitations, define terms plainly,
              link to the next useful page, and avoid filler that says the same
              thing five different ways.
            </p>
            <p>
              Updates are most likely to happen when one of the following changes:
              the tool interface changes, a mapping preset changes, a support page
              becomes too thin to be useful, or legal and contact information needs
              to be refreshed. The goal is not constant rewriting for its own sake.
              The goal is to keep the site accurate, understandable, and easy to use.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-950">Why transparency matters here</h2>
          <div className="mt-4 space-y-4 text-base leading-8 text-zinc-700">
            <p>
              Symbol tools often create avoidable confusion. A visitor may paste the
              same word into two different sites and get different outputs, then
              assume one site must be broken. In practice, the more honest answer is
              that different translators often rely on different mapping systems.
              Treating that difference as part of the documentation, not a hidden
              detail, is one of the clearest ways to improve trust.
            </p>
            <p>
              We also believe in being direct about compatibility. Unicode and legacy
              symbol behavior can vary by platform. Some short strings will travel
              well across modern apps; others may not. Users deserve to know that
              before they rely on a result for a puzzle, a profile, or a shareable post.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-950">Useful pages</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link href="/" className="rounded-2xl border border-zinc-200 px-4 py-4 text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              Wingdings Translator
            </Link>
            <Link href="/faq" className="rounded-2xl border border-zinc-200 px-4 py-4 text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              FAQ
            </Link>
            <Link href="/help" className="rounded-2xl border border-zinc-200 px-4 py-4 text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              Help Center
            </Link>
            <Link href="/contact" className="rounded-2xl border border-zinc-200 px-4 py-4 text-zinc-700 transition hover:border-sky-300 hover:text-sky-700">
              Contact
            </Link>
          </div>
        </section>
      </main>
  );
}
