"use client";

import { useEffect, useState } from "react";
import { getToolBySlug, getTranslatorVariants } from "@/lib/textTools";

type ToolConverterProps = {
  slug: string;
  shortName: string;
  placeholder: string;
  sampleInput: string;
  sampleOutputLabel: string;
};

export default function ToolConverter({
  slug,
  shortName,
  placeholder,
  sampleInput,
  sampleOutputLabel,
}: ToolConverterProps) {
  const tool = getToolBySlug(slug) ?? {
    encode: (value: string) => value,
    decode: (value: string) => value,
  };
  const variants = getTranslatorVariants(slug);
  const hasVariants = variants.length > 0;
  const [input, setInput] = useState(sampleInput);
  const [selectedVariantId, setSelectedVariantId] = useState(
    variants[0]?.id ?? "default",
  );
  const [copied, setCopied] = useState("");

  const outputs = hasVariants
    ? variants.map((variant) => ({
        ...variant,
        output: variant.encode(input),
      }))
    : [
        {
          id: "default",
          name: shortName,
          description: sampleOutputLabel,
          note: "Direct output",
          output: tool.encode(input),
          decode: tool.decode,
        },
      ];

  const selectedVariant =
    outputs.find((variant) => variant.id === selectedVariantId) ?? outputs[0];

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = window.setTimeout(() => setCopied(""), 1400);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyText = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(`${label} copied`);
    } catch {
      setCopied("Copy failed");
    }
  };

  const totalWords = input.trim() ? input.trim().split(/\s+/).length : 0;
  const accentStyles = [
    {
      badge: "bg-[#fff6df]",
      border: "border-[#f6dd8a]",
      glow: "hover:border-[#f0c94c]",
    },
    {
      badge: "bg-[#eef9ff]",
      border: "border-[#bfe7fb]",
      glow: "hover:border-sky-300",
    },
    {
      badge: "bg-[#f6f0ff]",
      border: "border-[#d8c8ff]",
      glow: "hover:border-violet-300",
    },
    {
      badge: "bg-[#eefaf2]",
      border: "border-[#bfe9cd]",
      glow: "hover:border-emerald-300",
    },
    {
      badge: "bg-[#fff0f4]",
      border: "border-[#f8c6d3]",
      glow: "hover:border-rose-300",
    },
  ];

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-sm">
      <div className="relative p-5 sm:p-6 lg:p-8">
        <section className="rounded-[1.25rem] border border-zinc-200 bg-[rgba(255,255,255,0.92)] p-4 shadow-sm">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="inline-flex rounded-full border border-sky-200 bg-[#eef9ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                Input
              </p>
              <h2 className="mt-1 text-xl font-black tracking-tight text-zinc-950 sm:text-2xl">
                Enter text to convert
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setInput("")}
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-950"
            >
              Clear
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={placeholder}
              className="h-[3.75rem] w-full rounded-2xl border border-sky-200 bg-white px-5 text-lg font-medium text-zinc-900 outline-none shadow-sm transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />
            <button
              type="button"
              onClick={() => copyText(input, "Input")}
              className="h-[3.75rem] rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:border-sky-300 hover:text-sky-700"
            >
              Copy Input
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-sm text-zinc-600">
            <span className="rounded-full border border-zinc-200 bg-[#fff6df] px-3 py-1.5">
              Characters: {input.length}
            </span>
            <span className="rounded-full border border-zinc-200 bg-[#eef9ff] px-3 py-1.5">
              Words: {totalWords}
            </span>
            <span className="rounded-full border border-zinc-200 bg-[#f6f0ff] px-3 py-1.5">
              Styles: {outputs.length}
            </span>
          </div>
        </section>

        <section className="mt-4 rounded-[1.25rem] border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="inline-flex rounded-full border border-zinc-200 bg-[#fff6df] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-700">
                Selected Style
              </p>
              <h3 className="mt-1 text-xl font-black tracking-tight text-zinc-950 sm:text-2xl">
                {selectedVariant.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => copyText(selectedVariant.output, selectedVariant.name)}
              className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Copy Selected
            </button>
          </div>

          <div className="rounded-[1rem] border border-zinc-200 bg-[linear-gradient(180deg,_#ffffff,_#fbfdff)] p-4">
            <p className="text-sm leading-6 text-zinc-600">
              {selectedVariant.description}
            </p>
            <div className="mt-2 break-words text-2xl leading-[1.65] text-zinc-950 sm:text-[2rem]">
              {selectedVariant.output || "Your selected style will appear here."}
            </div>
          </div>

        </section>

        <section className="mt-4 rounded-[1.25rem] border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                Style Gallery
              </p>
              <h3 className="mt-1 text-xl font-black tracking-tight text-zinc-950 sm:text-2xl">
                {sampleOutputLabel}
              </h3>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-zinc-600">
              Click any card to set it as the active style. The gallery is sized so
              desktop visitors can see a full row immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {outputs.map((variant, index) => {
              const isSelected = variant.id === selectedVariant.id;
              const accent = accentStyles[index % accentStyles.length];

              return (
                <article
                  key={variant.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedVariantId(variant.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedVariantId(variant.id);
                    }
                  }}
                  className={`rounded-[1rem] border bg-white p-4 text-left shadow-sm transition focus:outline-none focus:ring-4 focus:ring-sky-100 ${
                    isSelected
                      ? "border-zinc-950 ring-2 ring-zinc-950/10"
                      : `${accent.border} ${accent.glow} hover:-translate-y-0.5 hover:shadow-md`
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold tracking-tight text-zinc-950">
                        {variant.name}
                      </h4>
                      <p className={`mt-2 inline-flex rounded-full border border-zinc-200 px-2.5 py-1 text-[11px] leading-none text-zinc-700 ${accent.badge}`}>
                        {variant.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        copyText(variant.output, variant.name);
                      }}
                      className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-sky-300 hover:text-sky-700"
                    >
                      Copy
                    </button>
                  </div>

                  <div className="mt-4 min-h-20 break-words text-[1.6rem] leading-[1.55] text-zinc-950">
                    {variant.output || " "}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      {copied ? (
        <div
          aria-live="polite"
          className="border-t border-zinc-200 bg-zinc-50 px-6 py-3 text-sm text-zinc-700"
        >
          {copied}
        </div>
      ) : null}
    </section>
  );
}
