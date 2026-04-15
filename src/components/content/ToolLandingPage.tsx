import Script from "next/script";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolConverter from "@/components/tools/ToolConverter";
import { type ConverterUiConfig } from "@/lib/textTools";

type ToolLandingPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  pageUrl: string;
  breadcrumbs: {
    name: string;
    url: string;
  }[];
  tool: {
    slug: string;
    shortName: string;
    placeholder: string;
    sampleInput: string;
    sampleOutputLabel: string;
    converterUi?: ConverterUiConfig;
  };
  sections: {
    title: string;
    body: string[];
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
};

export default function ToolLandingPage({
  eyebrow,
  title,
  description,
  pageUrl,
  breadcrumbs,
  tool,
  sections,
  faq,
}: ToolLandingPageProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    url: pageUrl,
    step: [
      {
        "@type": "HowToStep",
        name: "Enter text",
        text: "Type or paste content into the tool.",
      },
      {
        "@type": "HowToStep",
        name: "Review the output",
        text: "Check the generated or decoded result and switch presets when needed.",
      },
      {
        "@type": "HowToStep",
        name: "Copy the result",
        text: "Copy the final text and use it wherever you need it.",
      },
    ],
  };

  return (
    <main className="mx-auto max-w-[1480px] px-3 py-5 sm:px-5 sm:py-8 xl:px-8">
      <Script
        id={`${tool.slug}-${eyebrow}-faq-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id={`${tool.slug}-${eyebrow}-howto-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <Breadcrumbs items={breadcrumbs} />

      <section className="rounded-[1.75rem] border border-[#d8e5dc] bg-white p-6 shadow-sm sm:p-8">
        <header className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f766e]">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-[2.4rem] font-black tracking-tight text-zinc-950 sm:text-[3rem]">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-zinc-600">{description}</p>
        </header>

        <section className="mt-8">
          <ToolConverter
            slug={tool.slug}
            shortName={tool.shortName}
            placeholder={tool.placeholder}
            sampleInput={tool.sampleInput}
            sampleOutputLabel={tool.sampleOutputLabel}
            converterUi={tool.converterUi}
          />
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="grid gap-5">
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

          <section className="rounded-[1.35rem] border border-[#d8e5dc] bg-[#f8fcfa] p-5">
            <h2 className="text-2xl font-black tracking-tight text-zinc-950">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 space-y-3">
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="rounded-2xl border border-[#e0e8e3] bg-white px-4 py-4"
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
          </section>
        </section>
      </section>
    </main>
  );
}
