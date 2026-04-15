import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/content/ArticlePage";
import { buildArticleMetadata, articles } from "@/lib/content";
import { siteUrl } from "@/lib/textTools";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const articleData = buildArticleMetadata(slug);

  if (!articleData) {
    return {};
  }

  return {
    title: articleData.article.title,
    description: articleData.article.description,
    alternates: {
      canonical: articleData.url,
    },
    openGraph: {
      title: articleData.article.title,
      description: articleData.article.description,
      url: articleData.url,
      siteName: "Wingdings Translator",
      type: "article",
    },
  };
}

export default async function BlogArticlePage({ params }: BlogPageProps) {
  const { slug } = await params;
  const articleData = buildArticleMetadata(slug);

  if (!articleData) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Wingdings Translator", url: siteUrl },
    { name: "Blog", url: `${siteUrl}/blog` },
    { name: articleData.article.h1, url: articleData.url },
  ];

  return (
    <ArticlePage
      title={articleData.article.h1}
      intro={articleData.article.intro}
      relatedSlugs={articleData.article.relatedSlugs}
      sections={articleData.article.sections}
      breadcrumbs={breadcrumbs}
      articleUrl={articleData.url}
      embeddedTool={articleData.article.embeddedTool}
    />
  );
}
