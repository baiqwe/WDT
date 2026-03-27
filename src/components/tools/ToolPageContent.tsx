import Link from "next/link";
import Script from "next/script";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  buildFaqSchema,
  buildSoftwareSchema,
  getRelatedTools,
  getTranslatorVariants,
  siteUrl,
  type ToolConfig,
} from "@/lib/textTools";
import { generateBreadcrumbSchema } from "@/lib/breadcrumbs";
import ToolConverter from "./ToolConverter";

type ToolPageContentProps = {
  tool: ToolConfig;
  isHome?: boolean;
};

export default function ToolPageContent({
  tool,
  isHome = false,
}: ToolPageContentProps) {
  const breadcrumbs = isHome
    ? [{ name: "Wingdings Translator", url: siteUrl }]
    : [
        { name: "Wingdings Translator", url: siteUrl },
        { name: tool.shortName, url: `${siteUrl}/${tool.slug}` },
      ];

  const relatedTools = getRelatedTools(tool.slug);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const variants = getTranslatorVariants(tool.slug);

  return (
    <main className="mx-auto max-w-[1680px] px-3 py-5 sm:px-5 sm:py-8 xl:px-8">
      <Script
        id={`${tool.slug}-software-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildSoftwareSchema(tool)),
        }}
      />
      <Script
        id={`${tool.slug}-faq-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(tool)) }}
      />
      <Script
        id={`${tool.slug}-breadcrumb-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {!isHome ? <Breadcrumbs items={breadcrumbs} /> : null}

      <section className="mb-4">
        <div>
          <p className="inline-flex rounded-full border border-sky-200 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700 shadow-sm">
            Authority Resource
          </p>
          <h1 className="mt-1 max-w-5xl text-[2.35rem] font-black tracking-tight text-zinc-950 sm:text-[2.9rem] xl:text-[3.1rem] xl:leading-[1.02]">
            {tool.h1}
          </h1>
          <p className="mt-2 max-w-5xl text-[0.97rem] leading-7 text-zinc-700 xl:max-w-[62rem]">
            {tool.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full border border-zinc-200 bg-[#fff6df] px-3 py-1.5 text-zinc-700">
              Symbol lab
            </span>
            <span className="rounded-full border border-zinc-200 bg-[#eef9ff] px-3 py-1.5 text-zinc-700">
              Copy and paste ready
            </span>
            <span className="rounded-full border border-zinc-200 bg-[#f6f0ff] px-3 py-1.5 text-zinc-700">
              Multiple mappings
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-zinc-600">
            {tool.keywords.slice(0, 6).map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ToolConverter
        slug={tool.slug}
        shortName={tool.shortName}
        placeholder={tool.placeholder}
        sampleInput={tool.sampleInput}
        sampleOutputLabel={tool.sampleOutputLabel}
      />

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          {tool.intro.length > 0 ? (
            <section className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black tracking-tight text-zinc-950">
                Why this page exists
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-zinc-700">
                {tool.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ) : null}

          {tool.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm"
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

          {variants.length > 0 ? (
            <section className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black tracking-tight text-zinc-950">
                Mapping comparison table
              </h2>
              <p className="mt-3 text-base leading-8 text-zinc-700">
                This side-by-side lookup makes the preset differences visible. It is
                especially helpful when you are comparing other translator sites and
                trying to understand why the same word produces different symbols.
              </p>
              <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200">
                <table className="min-w-full border-collapse text-left">
                  <thead className="bg-zinc-50 text-sm uppercase tracking-wide text-zinc-600">
                    <tr>
                      <th className="px-4 py-3">Letter</th>
                      {variants.map((variant) => (
                        <th key={variant.id} className="px-4 py-3">
                          {variant.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {variants[0].table.map((item, index) => (
                      <tr
                        key={item.plain}
                        className="border-t border-zinc-200 text-base text-zinc-800"
                      >
                        <td className="px-4 py-3 font-semibold">{item.plain}</td>
                        {variants.map((variant) => (
                          <td key={`${variant.id}-${item.plain}`} className="px-4 py-3 text-2xl">
                            {variant.table[index].styled}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}
        </div>

        <div className="space-y-8">
          <section className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black tracking-tight text-zinc-950">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 space-y-4">
              {tool.faq.map((item) => (
                <div key={item.question} className="rounded-2xl bg-zinc-50 p-4">
                  <h3 className="font-semibold text-zinc-900">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-700">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black tracking-tight text-zinc-950">
              You May Also Like
            </h2>
            <div className="mt-4 space-y-3">
              {relatedTools.map((relatedTool) => (
                <Link
                  key={relatedTool.slug}
                  href={relatedTool.slug === "wingdings" ? "/" : `/${relatedTool.slug}`}
                  className="block rounded-2xl border border-zinc-200 px-4 py-4 transition hover:border-sky-300 hover:bg-sky-50"
                >
                  <p className="font-semibold text-zinc-900">
                    {relatedTool.name}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">
                    {relatedTool.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
