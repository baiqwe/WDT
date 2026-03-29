import { siteUrl } from "./textTools";

export type Article = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  updatedAt: string;
  intro: string;
  relatedSlugs: string[];
  sections: {
    title: string;
    body: string[];
  }[];
};

export const articles: Article[] = [
  {
    slug: "history-of-wingdings-font",
    title: "History of the Wingdings Font",
    description:
      "Learn how Wingdings emerged, why it became culturally memorable, and why legacy symbol fonts still drive search demand today.",
    h1: "The History of the Wingdings Font",
    updatedAt: "2026-03-29",
    intro:
      "Wingdings became one of the most recognizable symbol fonts of the desktop era because it mixed novelty, utility, and mystery in a way plain text fonts never did.",
    relatedSlugs: ["wingdings", "webdings-translator", "gaster-translator"],
    sections: [
      {
        title: "Why Wingdings stood out",
        body: [
          "Wingdings felt different from normal fonts because it replaced letters with icons, hands, arrows, shapes, and pictograms that looked playful and strange at the same time.",
          "That made it memorable for office users, design hobbyists, and eventually puzzle communities who treated symbol strings like secret messages instead of ordinary typography.",
        ],
      },
      {
        title: "How symbol fonts shaped search intent",
        body: [
          "Today, many visitors are not looking for a historical font download. They want a browser-based way to convert between readable English and symbol-style output.",
          "That is why modern Wingdings tools need both translation and explanation: users often arrive with a mystery string and want to decode it quickly.",
        ],
      },
      {
        title: "Why the font still matters now",
        body: [
          "Wingdings remains relevant because it sits at the intersection of nostalgia, meme culture, fandom puzzles, and copy-paste creativity.",
          "In practice, that means a good translator site should also explain mapping differences, related symbol families, and how reverse decoding works.",
        ],
      },
    ],
  },
  {
    slug: "mystery-symbol-decoding-guide",
    title: "Mystery Symbol Decoding Guide",
    description:
      "A practical guide to identifying symbol alphabets, choosing the right preset, and decoding mystery strings from fandom and social posts.",
    h1: "How to Decode Mystery Symbol Messages",
    updatedAt: "2026-03-29",
    intro:
      "Most mystery symbol strings are not random. They usually follow a visual system, and your first job is to identify whether you are looking at a readable preset, a legacy-style Wingdings mapping, or another symbol family entirely.",
    relatedSlugs: ["wingdings", "gaster-translator", "gaster-alphabet-translator"],
    sections: [
      {
        title: "Start with the symbol family",
        body: [
          "Hands, arrows, circles, and desktop icons often suggest a Wingdings or Webdings-style mapping, while cleaner mystery sets may point to a Gaster-inspired preset.",
          "If the same string looks inconsistent across tools, the likely reason is that different sites are using different letter tables rather than the original font positions.",
        ],
      },
      {
        title: "Use reverse translation intentionally",
        body: [
          "A reverse translator works best when you already suspect which preset matches the source string. That is why comparing Classic, Gaster, Wingdings 2, Wingdings 3, and Webdings is useful.",
          "Paste the symbol string into the symbol panel, switch presets, and stop when the output begins to look like readable English instead of noise.",
        ],
      },
      {
        title: "Common decoding mistakes",
        body: [
          "The biggest mistake is assuming every site uses one official alphabet. Many pages simplify or remix mappings for copy-paste convenience.",
          "The second mistake is ignoring multi-character symbols. Some Wingdings-style letters are visually one symbol but technically more than one code unit, so proper decoding logic matters.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function buildArticleMetadata(slug: string) {
  const article = getArticleBySlug(slug);

  if (!article) {
    return null;
  }

  const url = `${siteUrl}/blog/${article.slug}`;

  return {
    article,
    url,
  };
}

export function getFeaturedArticles(toolSlug?: string) {
  if (!toolSlug) {
    return articles;
  }

  const matching = articles.filter((article) =>
    article.relatedSlugs.includes(toolSlug),
  );

  return matching.length > 0 ? matching : articles;
}
