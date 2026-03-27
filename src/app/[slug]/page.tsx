import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolPageContent from "@/components/tools/ToolPageContent";
import { getToolBySlug, siteUrl, toolOrder } from "@/lib/textTools";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return toolOrder
    .filter((slug) => slug !== "wingdings")
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool || slug === "wingdings") {
    return {};
  }

  const url = `${siteUrl}/${tool.slug}`;

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    keywords: tool.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url,
      siteName: "Wingdings Translator",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle,
      description: tool.metaDescription,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool || slug === "wingdings") {
    notFound();
  }

  return <ToolPageContent tool={tool} />;
}
