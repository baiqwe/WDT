import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { articles } from "@/lib/content";
import { siteUrl } from "@/lib/textTools";

export const metadata: Metadata = {
  title: "Wingdings Blog",
  description:
    "Editorial guides about Wingdings history, mystery-symbol decoding, and how to read legacy symbol alphabets.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

export default function BlogIndexPage() {
  const breadcrumbs = [
    { name: "Wingdings Translator", url: siteUrl },
    { name: "Blog", url: `${siteUrl}/blog` },
  ];

  return (
    <main className="mx-auto max-w-[1280px] px-3 py-5 sm:px-5 sm:py-8 xl:px-8">
      <Breadcrumbs items={breadcrumbs} />

      <section className="rounded-[1.75rem] border border-[#d8e5dc] bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
          Editorial Library
        </p>
        <h1 className="mt-3 text-[2.4rem] font-black tracking-tight text-zinc-950 sm:text-[3rem]">
          Wingdings Blog
        </h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-zinc-600">
          Long-form guides about Wingdings history, Gaster alphabet decoding,
          and practical ways to read mystery symbol messages.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="rounded-[1.35rem] border border-[#d8e5dc] bg-[#fafcfb] p-5 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Blog Article
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-zinc-950">
                {article.h1}
              </h2>
              <p className="mt-3 text-base leading-7 text-zinc-600">
                {article.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
