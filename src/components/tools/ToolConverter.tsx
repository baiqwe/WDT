"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getToolBySlug,
  getTranslatorVariants,
  type ConverterUiConfig,
} from "@/lib/textTools";

type ToolConverterProps = {
  slug: string;
  shortName: string;
  placeholder: string;
  sampleInput: string;
  sampleOutputLabel: string;
  converterUi?: ConverterUiConfig;
};

export default function ToolConverter({
  slug,
  shortName,
  placeholder,
  sampleInput,
  sampleOutputLabel,
  converterUi,
}: ToolConverterProps) {
  const tool = getToolBySlug(slug) ?? {
    encode: (value: string) => value,
    supportsReverse: false,
  };
  const variants = getTranslatorVariants(slug);
  const canReverse = tool.supportsReverse;
  const initialActivePane = converterUi?.defaultActivePane ?? "left";
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
  const [activePane, setActivePane] = useState<"left" | "right">(initialActivePane);
  const leftText = activePane === "left" ? leftDraft : decodeValue(rightDraft);
  const rightText = activePane === "right" ? rightDraft : encodeValue(leftDraft);
  const leftWords = leftText.trim() ? leftText.trim().split(/\s+/).length : 0;
  const rightWords = rightText.trim() ? rightText.trim().split(/\s+/).length : 0;
  const leftEyebrow = converterUi?.leftEyebrow ?? "Text";
  const leftTitle = converterUi?.leftTitle ?? "Plain English";
  const leftDescription =
    activePane === "left"
      ? converterUi?.leftDescriptionEncode ??
        "Type here to generate symbols on the right."
      : converterUi?.leftDescriptionDecode ??
        "Decoded letters appear here while you type symbols on the right.";
  const rightEyebrow = converterUi?.rightEyebrow ?? "Symbols";
  const rightTitle = converterUi?.rightTitle ?? sampleOutputLabel;
  const rightPlaceholder =
    converterUi?.rightPlaceholder ?? "Paste symbols here to decode...";
  const rightDescription =
    activePane === "right"
      ? converterUi?.rightDescriptionDecode ??
        "Type or paste symbols here to decode them on the left."
      : converterUi?.rightDescriptionEncode ??
        "Styled output appears here and stays editable for reverse translation.";

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
    if (!canReverse) {
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
    <section className="rounded-[1.7rem] border border-zinc-200/70 bg-white/88 p-3 shadow-[0_18px_45px_rgba(15,23,42,0.05)] backdrop-blur-sm sm:rounded-[1.9rem] sm:p-5 lg:p-6">
      <div className="grid gap-3 xl:grid-cols-[0.96fr_auto_1.04fr] xl:items-stretch xl:gap-4">
        <div
          className={`rounded-[1.35rem] border bg-[#fffefb]/96 p-3.5 transition sm:rounded-[1.45rem] sm:p-5 ${
            activePane === "left"
              ? "border-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.12)]"
              : "border-zinc-200/80"
          }`}
        >
          <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5e6f66]">
                {leftEyebrow}
              </p>
              <h2 className="mt-1 text-lg font-black tracking-tight text-zinc-950 sm:text-xl">
                {leftTitle}
              </h2>
              <p className="mt-1 text-sm leading-6 text-zinc-500">{leftDescription}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => copyText(leftText, "Text")}
                className="inline-flex min-h-11 items-center gap-1 rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-800"
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
                className="inline-flex min-h-11 items-center gap-1 rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-800"
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
            className="min-h-[132px] w-full resize-y rounded-[1.2rem] border border-zinc-200/80 bg-white px-4 py-3.5 text-base leading-7 text-zinc-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 sm:min-h-[180px] sm:rounded-[1.35rem] sm:py-4 sm:text-lg xl:min-h-[240px]"
          />

          <div className="mt-3 flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-sm text-zinc-500">
            <span>Characters: {leftText.length}</span>
            <span>Words: {leftWords}</span>
          </div>
        </div>

        {canReverse ? (
          <div className="-my-1 flex justify-center xl:hidden">
            <button
              type="button"
              onClick={toggleDirection}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200 bg-white text-emerald-700 shadow-[0_10px_24px_rgba(16,185,129,0.18)] transition hover:-translate-y-0.5 hover:border-emerald-400 hover:text-emerald-800"
              aria-label="Swap translation direction"
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
                <path d="M8 7h9l-2.6-2.6" />
                <path d="M16 17H7l2.6 2.6" />
                <path d="M17 7c-1.9 0-3.2.8-4.4 2.2L11 11" />
                <path d="M7 17c1.9 0 3.2-.8 4.4-2.2L13 13" />
              </svg>
            </button>
          </div>
        ) : null}

        {canReverse ? (
          <div className="hidden xl:flex xl:items-center xl:justify-center">
            <button
              type="button"
              onClick={toggleDirection}
              className="inline-flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-emerald-200 bg-white text-emerald-700 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-[0_14px_30px_rgba(16,185,129,0.18)]"
              aria-label="Swap translation direction"
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
                <path d="M8 7h9l-2.6-2.6" />
                <path d="M16 17H7l2.6 2.6" />
                <path d="M17 7c-1.9 0-3.2.8-4.4 2.2L11 11" />
                <path d="M7 17c1.9 0 3.2-.8 4.4-2.2L13 13" />
              </svg>
            </button>
          </div>
        ) : null}

        <div
          className={`rounded-[1.35rem] border bg-[#fcfffd]/96 p-3.5 transition sm:rounded-[1.45rem] sm:p-5 ${
            activePane === "right"
              ? "border-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.12)]"
              : "border-zinc-200/80"
          }`}
        >
          <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5e6f66]">
                {rightEyebrow}
              </p>
              <h2 className="mt-1 text-lg font-black tracking-tight text-zinc-950 sm:text-xl">
                {rightTitle}
              </h2>
              <p className="mt-1 text-sm leading-6 text-zinc-500">{rightDescription}</p>
            </div>
            <button
              type="button"
              onClick={() => copyText(rightText, shortName)}
              className="inline-flex min-h-11 items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100"
            >
              <span aria-hidden="true">⧉</span>
              Copy
            </button>
          </div>

          <div className="relative mb-4">
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 pr-6 [mask-image:linear-gradient(to_right,black_0,black_calc(100%-1.75rem),transparent_100%)]">
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
                    className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                      isSelected
                        ? "border-emerald-400 bg-emerald-50 text-emerald-900 shadow-[inset_0_-2px_0_0_#10b981]"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-emerald-300 hover:text-emerald-800"
                    } min-h-11`}
                  >
                    {variant.name}
                  </button>
                );
              })}
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#fcfffd] to-transparent" />
          </div>

          <div className="rounded-[1.2rem] border border-transparent bg-transparent px-0 py-1 sm:rounded-[1.35rem] sm:border-[#d9e4dc] sm:bg-white sm:px-4 sm:py-5 sm:shadow-sm">
            <div className="mb-2 text-sm text-zinc-500 sm:text-[0.95rem]">
              {selectedVariant?.description ?? rightTitle}
            </div>
            <textarea
              value={rightText}
              onChange={(event) => handleRightChange(event.target.value)}
              placeholder={rightPlaceholder}
              readOnly={!canReverse}
              className={`min-h-[132px] w-full resize-y bg-transparent text-2xl leading-[1.55] text-zinc-950 outline-none sm:min-h-[170px] sm:text-3xl xl:min-h-[220px] xl:text-[2rem] ${
                canReverse ? "" : "cursor-default"
              }`}
            />
            <div className="mt-3 flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-sm text-zinc-500">
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
