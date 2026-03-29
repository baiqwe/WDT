import { existsSync, statSync } from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { articles } from "@/lib/content";
import { siteUrl, toolOrder } from "@/lib/textTools";

export const dynamic = "force-static";

function getLastModified(...relativePaths: string[]) {
  const mtimes = relativePaths
    .map((relativePath) => path.join(process.cwd(), relativePath))
    .filter((absolutePath) => existsSync(absolutePath))
    .map((absolutePath) => statSync(absolutePath).mtime);

  if (mtimes.length === 0) {
    return new Date();
  }

  return mtimes.reduce((latest, current) =>
    current.getTime() > latest.getTime() ? current : latest,
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = toolOrder.map((slug, index) => ({
    url: slug === "wingdings" ? siteUrl : `${siteUrl}/${slug}`,
    lastModified: getLastModified(
      "src/lib/textTools.ts",
      "src/components/tools/ToolPageContent.tsx",
      slug === "wingdings" ? "src/app/page.tsx" : "src/app/[slug]/page.tsx",
    ),
    changeFrequency: "weekly" as const,
    priority: index === 0 ? 1 : 0.85,
  }));
  const articlePages = articles.map((article) => ({
    url: `${siteUrl}/blog/${article.slug}`,
    lastModified: getLastModified(
      "src/lib/content.ts",
      "src/components/content/ArticlePage.tsx",
      "src/app/blog/[slug]/page.tsx",
    ),
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  return [
    ...toolPages,
    {
      url: `${siteUrl}/blog`,
      lastModified: getLastModified("src/app/blog/page.tsx", "src/lib/content.ts"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articlePages,
    {
      url: `${siteUrl}/how-to-read-wingdings`,
      lastModified: getLastModified("src/app/how-to-read-wingdings/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: getLastModified("src/app/faq/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/help`,
      lastModified: getLastModified("src/app/help/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.55,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: getLastModified("src/app/about/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: getLastModified("src/app/contact/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: getLastModified("src/app/privacy-policy/page.tsx"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteUrl}/terms-of-service`,
      lastModified: getLastModified("src/app/terms-of-service/page.tsx"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
