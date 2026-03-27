import type { MetadataRoute } from "next";
import { siteUrl, toolOrder } from "@/lib/textTools";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = toolOrder.map((slug, index) => ({
    url: slug === "wingdings" ? siteUrl : `${siteUrl}/${slug}`,
    lastModified: new Date("2026-03-27"),
    changeFrequency: "weekly" as const,
    priority: index === 0 ? 1 : 0.85,
  }));

  return [
    ...toolPages,
    {
      url: `${siteUrl}/faq`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/help`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.55,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteUrl}/terms-of-service`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
