import Script from "next/script";
import Breadcrumbs from "@/components/Breadcrumbs";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";
import { siteUrl } from "@/lib/textTools";

type ArticlePageProps = {
  title: string;
  intro: string;
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
  sections,
  breadcrumbs,
  articleUrl,
}: ArticlePageProps) {
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
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

  return (
    <main className="mx-auto max-w-[1280px] px-3 py-5 sm:px-5 sm:py-8 xl:px-8">
      <Script
        id={`${articleUrl}-breadcrumb-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id={`${articleUrl}-article-schema`}
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
      </article>
    </main>
  );
}
