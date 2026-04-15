import type { MetadataRoute } from "next";
import { articles } from "@/lib/content";
import {
  localizedWingdingsAlternates,
  siteUrl,
  toolOrder,
  toolUpdatedAt,
} from "@/lib/textTools";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = toolOrder.map((slug, index) => ({
    url: slug === "wingdings" ? siteUrl : `${siteUrl}/${slug}`,
    lastModified: new Date(toolUpdatedAt[slug]),
    changeFrequency: "weekly" as const,
    priority: index === 0 ? 1 : 0.85,
    ...(slug === "wingdings"
      ? { alternates: { languages: localizedWingdingsAlternates } }
      : {}),
  }));
  const articlePages = articles.map((article) => ({
    url: `${siteUrl}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  return [
    ...toolPages,
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date("2026-03-29"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articlePages,
    {
      url: `${siteUrl}/how-to-read-wingdings`,
      lastModified: new Date("2026-03-29"),
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${siteUrl}/wingdings-alphabet`,
      lastModified: new Date("2026-03-30"),
      changeFrequency: "weekly",
      priority: 0.86,
    },
    {
      url: `${siteUrl}/gaster-language`,
      lastModified: new Date("2026-03-30"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/wingdings-font`,
      lastModified: new Date("2026-03-30"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/es/traductor-wingdings`,
      lastModified: new Date("2026-04-15"),
      changeFrequency: "monthly",
      priority: 0.72,
      alternates: {
        languages: localizedWingdingsAlternates,
      },
    },
    {
      url: `${siteUrl}/pt/tradutor-wingdings`,
      lastModified: new Date("2026-04-15"),
      changeFrequency: "monthly",
      priority: 0.72,
      alternates: {
        languages: localizedWingdingsAlternates,
      },
    },
    {
      url: `${siteUrl}/ru/wingdings-translator`,
      lastModified: new Date("2026-04-15"),
      changeFrequency: "monthly",
      priority: 0.72,
      alternates: {
        languages: localizedWingdingsAlternates,
      },
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: new Date("2026-03-29"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/help`,
      lastModified: new Date("2026-03-29"),
      changeFrequency: "monthly",
      priority: 0.55,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date("2026-03-29"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date("2026-03-29"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date("2026-03-29"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteUrl}/terms-of-service`,
      lastModified: new Date("2026-03-29"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
