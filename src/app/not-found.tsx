import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteUrl } from "@/lib/textTools";

const breadcrumbs = [
  { name: "Wingdings Translator", url: siteUrl },
  { name: "404", url: `${siteUrl}/404` },
];

export const metadata: Metadata = {
  title: "404 | Wingdings Translator",
  description:
    "The page you requested could not be found. Try the main Wingdings translator or one of the related text tools.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/404`,
  },
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <Breadcrumbs items={breadcrumbs} />
        <section className="rounded-[2rem] border border-zinc-200 bg-white p-10 text-center shadow-sm">
          <p className="text-7xl font-black tracking-tight text-sky-200">404</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-950">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
            The link may be outdated, or the old page may have been retired while
            the site shifted to Wingdings and copy-paste text tools.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Go to Wingdings Translator
            </Link>
            <Link
              href="/faq"
              className="rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-sky-300 hover:text-sky-700"
            >
              Open FAQ
            </Link>
          </div>
        </section>
      </main>
  );
}
