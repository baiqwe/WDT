import type { Metadata } from "next";
import Script from "next/script";
import ToolPageContent from "@/components/tools/ToolPageContent";
import {
  localizedWingdingsAlternates,
  siteUrl,
  toolConfigs,
} from "@/lib/textTools";

const tool = toolConfigs.wingdings;

export const metadata: Metadata = {
  title: {
    absolute: "Free Wingdings Translator | Convert Text Instantly",
  },
  description:
    "Type any text and instantly convert it to Wingdings or decode symbols back to English. Free online translator with fast copy and paste output.",
  keywords: [
    "free wingdings translator",
    "wingdings translator",
    "wingdings decoder",
    "wingdings generator",
    "wingdings converter",
    "wingdings to english",
    "english to wingdings",
    "copy paste wingdings",
    "gaster language translator",
    ...tool.keywords,
  ],
  alternates: {
    canonical: siteUrl,
    languages: localizedWingdingsAlternates,
  },
  openGraph: {
    title: "Free Wingdings Translator | Convert Text Instantly",
    description:
      "Instantly convert text to Wingdings or decode symbols back to English. Free, fast, and easy to copy and share.",
    url: siteUrl,
    siteName: "Wingdings Translator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Wingdings Translator | Convert Text Instantly",
    description:
      "Convert text to Wingdings, decode symbols, and copy results in seconds with our free online tool.",
  },
};

export default function Home() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Wingdings Translator",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    url: siteUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "A free online tool to instantly translate normal text to Wingdings and decode Wingdings-style symbols back into readable text.",
    featureList: [
      "Translate English to Wingdings instantly",
      "Decode Wingdings symbols back to English",
      "Copy and paste output with no download",
      "Switch between Classic Wingdings, Gaster, and related presets",
    ],
  };

  return (
    <main>
      <Script
        id="home-software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <ToolPageContent tool={tool} isHome />
    </main>
  );
}
