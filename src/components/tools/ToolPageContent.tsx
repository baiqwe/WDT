import Link from "next/link";
import Script from "next/script";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getFeaturedArticles } from "@/lib/content";
import {
  buildFaqSchema,
  buildHowToSchema,
  buildSoftwareSchema,
  getRelatedTools,
  getTranslatorVariants,
  siteUrl,
  type ToolConfig,
} from "@/lib/textTools";
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
  const featuredArticles = getFeaturedArticles(tool.slug).slice(0, 2);
  const variants = getTranslatorVariants(tool.slug);
  const presetExamples = variants.map((variant) => ({
    id: variant.id,
    name: variant.name,
    description: variant.description,
    example: variant.encode(tool.sampleInput),
  }));
  const toolIcons: Record<string, string> = {
    "subscript-generator": "x₂",
    "superscript-generator": "x²",
    "small-text-generator": "ᴀʙ",
    "tiny-text-generator": "ᵃᵇ",
    "cursive-generator": "✒",
    "bubble-font-generator": "ⓑ",
    "old-english-translator": "♜",
    "gothic-font-generator": "𝔊",
    "webdings-translator": "⌘",
    wingdings: "✦",
  };

  const infoBlocks = [
    ...(tool.intro.length
      ? [
          {
            title: "Overview & legacy font notes",
            body: tool.intro,
          },
        ]
      : []),
    ...tool.sections,
  ];

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
        id={`${tool.slug}-howto-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHowToSchema(tool)) }}
      />

      {!isHome ? <Breadcrumbs items={breadcrumbs} /> : null}

      <section className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
          Symbol Converter
        </p>
        <h1 className="mx-auto mt-2 max-w-5xl text-[2.4rem] font-black tracking-tight text-zinc-950 sm:text-[3rem] xl:text-[3.35rem] xl:leading-[1.02]">
          {tool.h1}
        </h1>
        <p className="mx-auto mt-3 max-w-4xl text-base leading-8 text-zinc-600">
          {tool.description}
        </p>
      </section>

      <ToolConverter
        slug={tool.slug}
        shortName={tool.shortName}
        placeholder={tool.placeholder}
        sampleInput={tool.sampleInput}
        sampleOutputLabel={tool.sampleOutputLabel}
      />

      {presetExamples.length > 0 ? (
        <section className="mt-6 rounded-[1.5rem] border border-[#d8e5dc] bg-white/95 p-5 shadow-sm">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Static Examples
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-zinc-950">
              Preset Snippets Google Can Read
            </h2>
            <p className="mt-2 max-w-4xl text-sm leading-7 text-zinc-600">
              These server-rendered examples show how the same phrase changes
              across the available symbol families.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {presetExamples.map((preset) => (
              <article
                key={preset.id}
                className="rounded-[1.15rem] border border-[#d8e5dc] bg-[#fffefb] px-4 py-4"
              >
                <p className="font-semibold text-zinc-900">{preset.name}</p>
                <p className="mt-1 text-sm leading-6 text-zinc-600">
                  {preset.description}
                </p>
                <code className="mt-3 block break-words rounded-xl bg-[#f4faf7] px-3 py-3 text-lg text-zinc-900">
                  {preset.example}
                </code>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-6 rounded-[1.5rem] border border-[#d8e5dc] bg-white/95 p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              More Tools
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-zinc-950">
              You May Also Like
            </h2>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {relatedTools.map((relatedTool) => (
            <Link
              key={relatedTool.slug}
              href={relatedTool.slug === "wingdings" ? "/" : `/${relatedTool.slug}`}
              className="rounded-[1.15rem] border border-[#d8e5dc] bg-[#fffefb] px-4 py-4 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#edf8f2] text-lg font-bold text-[#0f766e]"
                >
                  {toolIcons[relatedTool.slug] ?? "✦"}
                </div>
                <div>
                  <p className="font-semibold text-zinc-900">{relatedTool.name}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {relatedTool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-[1.5rem] border border-[#d8e5dc] bg-white/95 p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Guides
            </p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-zinc-950">
              Related Reading
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-[#0f766e] transition hover:text-emerald-800"
          >
            View all articles
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {featuredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="rounded-[1.15rem] border border-[#d8e5dc] bg-[#fffefb] px-4 py-4 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Blog Article
              </p>
              <h3 className="mt-2 text-xl font-black tracking-tight text-zinc-950">
                {article.h1}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {article.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          {infoBlocks.length > 0 ? (
            <section className="rounded-[1.5rem] border border-[#d8e5dc] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <h2 className="m-0 text-2xl font-black tracking-tight text-zinc-950">
                  Overview & Usage Notes
                </h2>
                <span className="text-sm font-semibold text-zinc-500">
                  Always visible
                </span>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {infoBlocks.map((section) => (
                  <article
                    key={section.title}
                    className="rounded-[1.25rem] border border-[#e4ece6] bg-[#fafcfb] p-4"
                  >
                    <h3 className="text-lg font-black tracking-tight text-zinc-950">
                      {section.title}
                    </h3>
                    <ul className="mt-3 space-y-3 text-sm leading-7 text-zinc-700">
                      {section.body.map((paragraph) => (
                        <li key={paragraph} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#10b981]" />
                          <span>{paragraph}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {variants.length > 0 ? (
            <section className="rounded-[1.5rem] border border-[#d8e5dc] bg-white p-6 shadow-sm">
              <p className="mb-4 text-base leading-8 text-zinc-700">
                This mapping table gives Google and human visitors a clear A-Z
                reference for each available preset, including Classic Wingdings,
                Gaster style, Wingdings 2, Wingdings 3, and Webdings-inspired output.
              </p>
              <details>
                <summary className="cursor-pointer list-none">
                  <span className="flex items-center justify-between gap-4">
                    <h2 className="m-0 text-2xl font-black tracking-tight text-zinc-950">
                      View Full Mapping Table (A-Z)
                    </h2>
                    <span className="text-sm font-semibold text-zinc-500">Expand</span>
                  </span>
                </summary>
                <p className="mt-4 text-base leading-8 text-zinc-700">
                  Use this table when you want a precise letter-by-letter reference
                  for the currently available presets.
                </p>
                <div className="mt-6 overflow-x-auto rounded-2xl border border-[#d8e5dc]">
                  <table className="min-w-full border-collapse text-left">
                    <thead className="bg-zinc-50 text-sm uppercase tracking-wide text-zinc-600">
                        <tr>
                          <th className="px-4 py-3" aria-label="Plain letter column">
                            Letter
                          </th>
                          {variants.map((variant) => (
                            <th
                              key={variant.id}
                              className="px-4 py-3"
                              aria-label={`${variant.name} mapping column`}
                            >
                              {variant.name}
                            </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {variants[0].table.map((item, index) => (
                        <tr
                          key={item.plain}
                          className="border-t border-zinc-200 text-base text-zinc-800 odd:bg-white even:bg-zinc-50/60"
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
              </details>
            </section>
          ) : null}
        </div>

        <div>
          <section className="rounded-[1.5rem] border border-[#d8e5dc] bg-white p-6 shadow-sm">
            <details open>
              <summary className="cursor-pointer list-none">
                <span className="flex items-center justify-between gap-4">
                  <h2 className="m-0 text-2xl font-black tracking-tight text-zinc-950">
                    Frequently Asked Questions
                  </h2>
                  <span className="text-sm font-semibold text-zinc-500">Toggle</span>
                </span>
              </summary>
              <div className="mt-4 space-y-3">
                {tool.faq.map((item) => (
                  <details
                    key={item.question}
                    className="rounded-2xl border border-[#e0e8e3] bg-zinc-50 px-4 py-4"
                  >
                    <summary className="cursor-pointer list-none font-semibold text-zinc-900">
                      {item.question}
                    </summary>
                    <p className="mt-3 text-sm leading-7 text-zinc-700">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </details>
          </section>
        </div>
      </section>
    </main>
  );
}
