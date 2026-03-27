"use client";

import { useEffect, useMemo, useState } from "react";
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
    supportsReverse: false,
  };
  const variants = getTranslatorVariants(slug);
  const [selectedVariantId, setSelectedVariantId] = useState(
    variants[0]?.id ?? "default",
  );
  const [copied, setCopied] = useState("");
  const selectedVariant = useMemo(() => {
    return variants.find((variant) => variant.id === selectedVariantId);
  }, [selectedVariantId, variants]);

  const encodeValue = (value: string) =>
    selectedVariant?.encode(value) ?? tool.encode(value);
  const decodeValue = (value: string) =>
    selectedVariant?.decode?.(value) ?? tool.decode?.(value) ?? value;

  const [leftDraft, setLeftDraft] = useState(sampleInput);
  const [rightDraft, setRightDraft] = useState(() => encodeValue(sampleInput));
  const [activePane, setActivePane] = useState<"left" | "right">("left");
  const leftText = activePane === "left" ? leftDraft : decodeValue(rightDraft);
  const rightText = activePane === "right" ? rightDraft : encodeValue(leftDraft);
  const leftWords = leftText.trim() ? leftText.trim().split(/\s+/).length : 0;
  const rightWords = rightText.trim() ? rightText.trim().split(/\s+/).length : 0;

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

  const handleLeftChange = (value: string) => {
    setActivePane("left");
    setLeftDraft(value);
  };

  const handleRightChange = (value: string) => {
    if (!tool.supportsReverse) {
      return;
    }

    setActivePane("right");
    setRightDraft(value);
  };

  const toggleDirection = () => {
    if (activePane === "left") {
      setRightDraft(rightText);
      setActivePane("right");
      return;
    }

    setLeftDraft(leftText);
    setActivePane("left");
  };

  return (
    <section className="rounded-[1.9rem] border border-[#d6e3da] bg-white/95 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur sm:p-5 lg:p-6">
      <div className="grid gap-4 xl:grid-cols-[0.96fr_auto_1.04fr] xl:items-stretch">
        <div
          className={`rounded-[1.45rem] border bg-[#fffefb] p-4 transition sm:p-5 ${
            activePane === "left"
              ? "border-emerald-300 shadow-[0_0_0_4px_rgba(16,185,129,0.08)]"
              : "border-[#d8e5dc]"
          }`}
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5e6f66]">
                Text
              </p>
              <h2 className="mt-1 text-xl font-black tracking-tight text-zinc-950">
                Plain English
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                {activePane === "left"
                  ? "Type here to generate symbols on the right."
                  : "Decoded letters appear here while you type symbols on the right."}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => copyText(leftText, "Text")}
                className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700"
              >
                <span aria-hidden="true">⧉</span>
                Copy
              </button>
              <button
                type="button"
                onClick={() => {
                  setLeftDraft("");
                  if (activePane === "right") {
                    setRightDraft("");
                    setActivePane("left");
                  }
                }}
                className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700"
              >
                <span aria-hidden="true">✕</span>
                Clear
              </button>
            </div>
          </div>

          <textarea
            value={leftText}
            onChange={(event) => handleLeftChange(event.target.value)}
            placeholder={placeholder}
            className="min-h-[240px] w-full resize-y rounded-[1.35rem] border border-[#d5e4da] bg-white px-4 py-4 text-lg text-zinc-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
          />

          <div className="mt-3 flex flex-wrap items-center justify-end gap-3 text-sm text-zinc-500">
            <span>Characters: {leftText.length}</span>
            <span>Words: {leftWords}</span>
          </div>
        </div>

        {tool.supportsReverse ? (
          <div className="hidden xl:flex xl:items-center xl:justify-center">
            <button
              type="button"
              onClick={toggleDirection}
              className="inline-flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-[#cfe2d6] bg-white text-[#0f766e] shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-[0_14px_30px_rgba(16,185,129,0.18)]"
              aria-label="Toggle reverse translation"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h11l-3-3" />
                <path d="M17 17H6l3 3" />
              </svg>
            </button>
          </div>
        ) : null}

        <div
          className={`rounded-[1.45rem] border bg-[#fafdff] p-4 transition sm:p-5 ${
            activePane === "right"
              ? "border-emerald-300 shadow-[0_0_0_4px_rgba(16,185,129,0.08)]"
              : "border-[#dce8e0]"
          }`}
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5e6f66]">
                Symbols
              </p>
              <h2 className="mt-1 text-xl font-black tracking-tight text-zinc-950">
                {sampleOutputLabel}
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                {activePane === "right"
                  ? "Type or paste symbols here to decode them on the left."
                  : "Styled output appears here and stays editable for reverse translation."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => copyText(rightText, shortName)}
              className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700"
            >
              <span aria-hidden="true">⧉</span>
              Copy
            </button>
          </div>

          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {(variants.length > 0
              ? variants
              : [{ id: "default", name: shortName, description: sampleOutputLabel }]
            ).map((variant) => {
              const isSelected = variant.id === selectedVariantId;

              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isSelected
                      ? "border-emerald-300 bg-emerald-50 text-emerald-900 shadow-[inset_0_-2px_0_0_#10b981]"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-emerald-300 hover:text-emerald-800"
                  }`}
                >
                  {variant.name}
                </button>
              );
            })}
          </div>

          {tool.supportsReverse ? (
            <div className="mb-4 xl:hidden">
              <button
                type="button"
                onClick={toggleDirection}
                className="inline-flex items-center gap-2 rounded-full border border-[#cfe2d6] bg-white px-4 py-2 text-sm font-semibold text-[#0f766e] shadow-sm transition hover:border-emerald-400 hover:text-emerald-700"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 7h11l-3-3" />
                  <path d="M17 17H6l3 3" />
                </svg>
                Reverse Translate
              </button>
            </div>
          ) : null}

          <div className="rounded-[1.35rem] border border-[#d9e4dc] bg-white px-4 py-5 shadow-sm">
            <div className="mb-2 text-sm text-zinc-500">
              {selectedVariant?.description ?? sampleOutputLabel}
            </div>
            <textarea
              value={rightText}
              onChange={(event) => handleRightChange(event.target.value)}
              placeholder="Paste symbols here to decode..."
              readOnly={!tool.supportsReverse}
              className={`min-h-[220px] w-full resize-y bg-transparent text-[2rem] leading-[1.65] text-zinc-950 outline-none ${
                tool.supportsReverse ? "" : "cursor-default"
              }`}
            />
            <div className="mt-3 flex flex-wrap items-center justify-end gap-3 text-sm text-zinc-500">
              <span>Characters: {rightText.length}</span>
              <span>Words: {rightWords}</span>
            </div>
          </div>
        </div>
      </div>

      {copied ? (
        <div
          aria-live="polite"
          className="mt-4 rounded-full border border-[#d8e5dc] bg-[#f7fbf8] px-4 py-2 text-sm text-zinc-700"
        >
          {copied}
        </div>
      ) : null}
    </section>
  );
}
