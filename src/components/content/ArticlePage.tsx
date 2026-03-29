import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getToolBySlug, siteUrl } from "@/lib/textTools";

type ArticlePageProps = {
  title: string;
  intro: string;
  relatedSlugs: string[];
  sections: {
    title: string;
    body: string[];
  }[];
  breadcrumbs: {
    name: string;
    url: string;
  }[];
  articleUrl: string;
};

export default function ArticlePage({
  title,
  intro,
  relatedSlugs,
  sections,
  breadcrumbs,
  articleUrl,
}: ArticlePageProps) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: intro,
    mainEntityOfPage: articleUrl,
    author: {
      "@type": "Organization",
      name: "Wingdings Translator",
    },
    publisher: {
      "@type": "Organization",
      name: "Wingdings Translator",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/brand-mark.svg`,
      },
    },
  };
  const relatedTools = relatedSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is NonNullable<ReturnType<typeof getToolBySlug>> => Boolean(tool));
  const relatedLinkLabels: Record<string, string> = {
    wingdings: "Use our Wingdings translator",
    "webdings-translator": "Try the Webdings converter",
    "gaster-translator": "Use the Gaster translator",
    "gaster-alphabet-translator": "Open the Gaster alphabet translator",
    "old-english-translator": "Try the Old English translator",
  };

  return (
    <main className="mx-auto max-w-[1280px] px-3 py-5 sm:px-5 sm:py-8 xl:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Breadcrumbs items={breadcrumbs} />

      <article className="rounded-[1.75rem] border border-[#d8e5dc] bg-white p-6 shadow-sm sm:p-8">
        <header className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
            Editorial Guide
          </p>
          <h1 className="mt-3 text-[2.4rem] font-black tracking-tight text-zinc-950 sm:text-[3rem]">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-zinc-600">{intro}</p>
        </header>

        <div className="mt-8 grid gap-5">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[1.35rem] border border-[#e4ece6] bg-[#fafcfb] p-5"
            >
              <h2 className="text-2xl font-black tracking-tight text-zinc-950">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-zinc-700">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {relatedTools.length > 0 ? (
          <section className="mt-8 rounded-[1.35rem] border border-[#d8e5dc] bg-[#f8fcfa] p-5">
            <h2 className="text-2xl font-black tracking-tight text-zinc-950">
              Related tools
            </h2>
            <p className="mt-3 text-base leading-8 text-zinc-700">
              If you want to apply the ideas from this guide immediately, use one
              of these tools:
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.slug === "wingdings" ? "/" : `/${tool.slug}`}
                  className="rounded-full border border-[#d8e5dc] bg-white px-4 py-2 text-sm font-semibold text-[#0f766e] transition hover:border-emerald-300 hover:text-emerald-800"
                >
                  {relatedLinkLabels[tool.slug] ?? tool.name}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
