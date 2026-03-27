import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/textTools";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/subscript-generator`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/cursive-generator`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/old-english-translator`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
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
