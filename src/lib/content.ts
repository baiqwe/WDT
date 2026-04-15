import { siteUrl, type ConverterUiConfig } from "./textTools";

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
  embeddedTool?: {
    slug: string;
    shortName: string;
    placeholder: string;
    sampleInput: string;
    sampleOutputLabel: string;
    converterUi?: ConverterUiConfig;
  };
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
    slug: "wingdings-copy-paste-guide",
    title: "How to Copy and Paste Wingdings Text",
    description:
      "Learn the fastest way to generate Wingdings text for copy and paste, plus practical tips for bios, posts, and mystery-style captions.",
    h1: "How to Copy and Paste Wingdings Text Online",
    updatedAt: "2026-04-15",
    intro:
      "Most people searching wingdings copy paste do not want to install an old symbol font or troubleshoot document software. They want a browser-based workflow that turns plain English into stylized symbols they can copy immediately.",
    relatedSlugs: ["wingdings-generator", "english-to-wingdings", "wingdings"],
    embeddedTool: {
      slug: "wingdings-generator",
      shortName: "Generator",
      placeholder: "Type a short phrase you want to copy and paste...",
      sampleInput: "copy this style",
      sampleOutputLabel: "Copy-paste Wingdings output",
      converterUi: {
        leftEyebrow: "Copy & Paste",
        leftTitle: "Plain English",
        leftDescriptionEncode:
          "Type the text you want to turn into Wingdings-style copy-paste output.",
        leftDescriptionDecode:
          "Decoded English appears here if you switch into reverse translation.",
        rightEyebrow: "Output",
        rightTitle: "Wingdings Text to Copy",
        rightPlaceholder: "Generated Wingdings text appears here...",
        rightDescriptionEncode:
          "Review the style, then copy the final string into your target app.",
        rightDescriptionDecode:
          "Paste existing symbols here if you want to decode them instead.",
      },
    },
    sections: [
      {
        title: "Use an online generator instead of a font install",
        body: [
          "For most users, the easiest Wingdings copy-paste workflow is a browser tool. You type plain English once, get a symbol result immediately, and copy it without touching font menus.",
          "That is usually faster and more predictable than relying on whether a document editor or device still exposes legacy symbol fonts cleanly.",
        ],
      },
      {
        title: "Short text works best",
        body: [
          "Wingdings-style copy paste is strongest for names, bios, captions, labels, and other short strings.",
          "Long paragraphs usually become harder to verify and less likely to render consistently after you move them between apps.",
        ],
      },
      {
        title: "Check the target app after pasting",
        body: [
          "Even when the text copies correctly, the final look still depends on the app and device where you paste it.",
          "If the result matters, test the output in the destination platform before treating one preset as your final version.",
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
  {
    slug: "translate-wingdings-from-image",
    title: "How to Translate Wingdings from an Image",
    description:
      "A practical workflow for extracting Wingdings symbols from screenshots or photos, then decoding them back into English with an online tool.",
    h1: "How to Translate Wingdings from an Image",
    updatedAt: "2026-04-15",
    intro:
      "If your Wingdings message lives inside a screenshot, meme, phone photo, or game capture, the first job is not translation. It is extraction. Once you turn the symbols inside the image into selectable text, the decoding step becomes easy.",
    relatedSlugs: ["wingdings-decoder", "wingdings", "undertale-wingdings-translator"],
    embeddedTool: {
      slug: "wingdings-decoder",
      shortName: "Decoder",
      placeholder: "Decoded English appears here...",
      sampleInput: "hidden message",
      sampleOutputLabel: "Wingdings symbol input",
      converterUi: {
        defaultActivePane: "right",
        leftEyebrow: "English",
        leftTitle: "Decoded English",
        leftDescriptionEncode:
          "Type here if you want to switch back into encoder mode.",
        leftDescriptionDecode:
          "Decoded text appears here after you paste extracted symbols from the image.",
        rightEyebrow: "From Image",
        rightTitle: "Extracted Symbols",
        rightPlaceholder: "Paste the symbols you extracted from the image here...",
        rightDescriptionEncode:
          "Encoded symbols appear here if you switch back into generator mode.",
        rightDescriptionDecode:
          "Paste symbols copied from OCR, Google Lens, or Live Text to decode them.",
      },
    },
    sections: [
      {
        title: "Step 1: Extract the symbols from the image",
        body: [
          "Use a text-recognition tool such as Google Lens, iPhone Live Text, or another OCR app to pull the symbols out of the screenshot or photo first.",
          "You do not need perfect extraction on the first pass. You just need the symbols in a copyable text field so you can test them inside a decoder.",
        ],
      },
      {
        title: "Step 2: Clean obvious OCR mistakes",
        body: [
          "OCR can confuse visually similar shapes, skip variation selectors, or insert stray spaces. Before decoding, quickly scan the extracted string for obvious glitches.",
          "If the decoded output still looks wrong, the issue may be extraction noise rather than the symbol preset itself.",
        ],
      },
      {
        title: "Step 3: Paste the result into a decoder",
        body: [
          "Once the symbols are copied, paste them into the decoder on this page and try another preset if the first output does not make sense.",
          "This is especially useful for fandom screenshots, puzzle captures, and social posts where you do not control the original font source.",
        ],
      },
      {
        title: "What if the image contains Undertale or Gaster text?",
        body: [
          "If the screenshot looks Undertale-related, try the Undertale or Gaster-focused preset after extraction because the source may follow a fandom-specific mapping rather than a generic Wingdings table.",
          "That is one reason extraction and preset comparison work so well together.",
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
