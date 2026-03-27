import type { Metadata } from "next";
import ToolPageContent from "@/components/tools/ToolPageContent";
import { siteUrl, toolConfigs } from "@/lib/textTools";

const tool = toolConfigs.wingdings;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  keywords: tool.keywords,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: siteUrl,
    siteName: "Wingdings Translator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: tool.metaTitle,
    description: tool.metaDescription,
  },
};

export default function Home() {
  return <ToolPageContent tool={tool} isHome />;
}
