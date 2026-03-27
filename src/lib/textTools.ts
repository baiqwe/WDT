export const siteUrl = "https://wingdingstranslator.org";

export type ToolSection = {
  title: string;
  body: string[];
};

export type ToolFaq = {
  question: string;
  answer: string;
};

export type TranslatorVariant = {
  id: string;
  name: string;
  description: string;
  note: string;
  upperMap: string[];
  lowerMap?: string[];
};

export type ToolConfig = {
  slug: string;
  name: string;
  shortName: string;
  title: string;
  metaTitle: string;
  description: string;
  metaDescription: string;
  h1: string;
  placeholder: string;
  sampleInput: string;
  sampleOutputLabel: string;
  supportsReverse?: boolean;
  keywords: string[];
  intro: string[];
  sections: ToolSection[];
  faq: ToolFaq[];
  relatedSlugs: string[];
  variantIds?: string[];
  encode: (input: string) => string;
  decode?: (input: string) => string;
};

const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerAlphabet = upperAlphabet.toLowerCase();

function translateFromAlphabet(
  input: string,
  upperMap: string[],
  lowerMap: string[] = upperMap,
) {
  let output = "";

  for (const char of input) {
    const upperIndex = upperAlphabet.indexOf(char);
    const lowerIndex = lowerAlphabet.indexOf(char);

    if (upperIndex >= 0) {
      output += upperMap[upperIndex];
      continue;
    }

    if (lowerIndex >= 0) {
      output += lowerMap[lowerIndex];
      continue;
    }

    output += char;
  }

  return output;
}

function createDecodeMap(upperMap: string[], lowerMap: string[] = upperMap) {
  return new Map(
    [...upperMap, ...lowerMap].map((symbol, index) => [
      symbol,
      lowerAlphabet[index % 26],
    ]),
  );
}

function buildVariantHelpers(variant: TranslatorVariant) {
  const lowerMap = variant.lowerMap ?? variant.upperMap;
  const decodeMap = createDecodeMap(variant.upperMap, lowerMap);

  return {
    encode(input: string) {
      return translateFromAlphabet(input, variant.upperMap, lowerMap);
    },
    decode(input: string) {
      let output = "";

      for (const char of input) {
        output += decodeMap.get(char) ?? char;
      }

      return output;
    },
    table: upperAlphabet.split("").map((letter, index) => ({
      plain: letter,
      styled: variant.upperMap[index],
    })),
  };
}

const translatorVariants: Record<string, TranslatorVariant> = {
  classic: {
    id: "classic",
    name: "Classic Wingdings",
    description: "Traditional Wingdings-style alphabet with recognizable symbol letters.",
    note: "Traditional Wingdings-style alphabet with recognizable symbol letters.",
    upperMap: [
      "✌︎",
      "👌︎",
      "👍︎",
      "👎︎",
      "☜︎",
      "☞︎",
      "☝︎",
      "☟︎",
      "🖐︎",
      "☺︎",
      "😐︎",
      "☹︎",
      "💣︎",
      "☠︎",
      "⚐︎",
      "🏱︎",
      "✈︎",
      "☼︎",
      "💧︎",
      "❄︎",
      "🕆︎",
      "✞︎",
      "🕈︎",
      "✠︎",
      "✡︎",
      "☪︎",
    ],
    lowerMap: [
      "♋︎",
      "♌︎",
      "♍︎",
      "♎︎",
      "♏︎",
      "♐︎",
      "♑︎",
      "♒︎",
      "♓︎",
      "🙰",
      "🙮",
      "●︎",
      "❍︎",
      "■︎",
      "□︎",
      "◻︎",
      "◾︎",
      "❒︎",
      "⬧︎",
      "⧫︎",
      "◆︎",
      "❖︎",
      "⬥︎",
      "⌧︎",
      "⍓︎",
      "⌘︎",
    ],
  },
  gaster: {
    id: "gaster",
    name: "Gaster Style",
    description: "Readable mystery-symbol set suited to puzzle and fandom aesthetics.",
    note: "Readable mystery-symbol set suited to puzzle and fandom aesthetics.",
    upperMap: [
      "☀",
      "☁",
      "☂",
      "☃",
      "☄",
      "★",
      "☆",
      "☎",
      "☏",
      "☘",
      "☙",
      "☚",
      "☛",
      "☜",
      "☝",
      "☞",
      "☟",
      "✁",
      "✂",
      "✃",
      "✄",
      "✅",
      "✆",
      "✇",
      "✈",
      "✉",
    ],
  },
  "wingdings-2": {
    id: "wingdings-2",
    name: "Wingdings 2 Style",
    description: "Geometric symbol family with circular and dial-like forms.",
    note: "Geometric symbol family with circular and dial-like forms.",
    upperMap: [
      "◐",
      "◑",
      "◒",
      "◓",
      "◔",
      "◕",
      "◖",
      "◗",
      "◘",
      "◙",
      "◚",
      "◛",
      "◜",
      "◝",
      "◞",
      "◟",
      "◠",
      "◡",
      "◢",
      "◣",
      "◤",
      "◥",
      "◦",
      "◧",
      "◨",
      "◩",
    ],
  },
  "wingdings-3": {
    id: "wingdings-3",
    name: "Wingdings 3 Style",
    description: "Arrow-heavy set with directional, interface-like symbols.",
    note: "Arrow-heavy set with directional, interface-like symbols.",
    upperMap: [
      "⬰",
      "⬱",
      "⬲",
      "⬳",
      "⬴",
      "⬵",
      "⬶",
      "⬷",
      "⬸",
      "⬹",
      "⬺",
      "⬻",
      "⬼",
      "⬽",
      "⬾",
      "⬿",
      "➔",
      "➘",
      "➙",
      "➚",
      "➛",
      "➜",
      "➝",
      "➞",
      "➟",
      "➠",
    ],
  },
  webdings: {
    id: "webdings",
    name: "Webdings Style",
    description: "Object and icon focused set with a classic desktop-symbol feel.",
    note: "Object and icon focused set with a classic desktop-symbol feel.",
    upperMap: [
      "⌛",
      "⌚",
      "⌨",
      "✉",
      "✂",
      "✎",
      "📁",
      "📂",
      "🗏",
      "🗐",
      "🗑",
      "🔒",
      "🔓",
      "📞",
      "📠",
      "✈",
      "🚗",
      "🚌",
      "🚓",
      "🚑",
      "🚒",
      "🚚",
      "🚲",
      "🚆",
      "🚢",
      "⌂",
    ],
  },
};

export function getTranslatorVariants(slug: string) {
  const tool = getToolBySlug(slug);

  if (!tool?.variantIds?.length) {
    return [];
  }

  return tool.variantIds
    .map((variantId) => translatorVariants[variantId])
    .filter((variant): variant is TranslatorVariant => Boolean(variant))
    .map((variant) => ({
      ...variant,
      ...buildVariantHelpers(variant),
    }));
}

export function getTranslatorVariant(slug: string, variantId?: string) {
  const variants = getTranslatorVariants(slug);

  if (variants.length === 0) {
    return null;
  }

  return variants.find((variant) => variant.id === variantId) ?? variants[0];
}

const subscriptMap: Record<string, string> = {
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉",
  a: "ₐ",
  e: "ₑ",
  h: "ₕ",
  i: "ᵢ",
  j: "ⱼ",
  k: "ₖ",
  l: "ₗ",
  m: "ₘ",
  n: "ₙ",
  o: "ₒ",
  p: "ₚ",
  r: "ᵣ",
  s: "ₛ",
  t: "ₜ",
  u: "ᵤ",
  v: "ᵥ",
  x: "ₓ",
  "+": "₊",
  "-": "₋",
  "=": "₌",
  "(": "₍",
  ")": "₎",
};

const encodeSubscript = (input: string) => {
  let output = "";

  for (const char of input) {
    const lowerChar = char.toLowerCase();
    output += subscriptMap[lowerChar] ?? subscriptMap[char] ?? char;
  }

  return output;
};

const cursiveUpper = Array.from("𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵");
const cursiveLower = Array.from("𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏");

const encodeCursive = (input: string) =>
  translateFromAlphabet(input, cursiveUpper, cursiveLower);

const oldEnglishUpper = Array.from("𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ");
const oldEnglishLower = Array.from("𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷");

const encodeOldEnglish = (input: string) =>
  translateFromAlphabet(input, oldEnglishUpper, oldEnglishLower);

const defaultWingdingsVariantBase = translatorVariants.classic;
const defaultWingdingsVariant = defaultWingdingsVariantBase
  ? buildVariantHelpers(defaultWingdingsVariantBase)
  : null;

export const toolOrder = [
  "wingdings",
  "subscript-generator",
  "cursive-generator",
  "old-english-translator",
] as const;

export const toolConfigs: Record<(typeof toolOrder)[number], ToolConfig> = {
  wingdings: {
    slug: "wingdings",
    name: "Wingdings Translator",
    shortName: "Wingdings",
    title: "Wingdings Translator & Symbol Converter",
    metaTitle: "Wingdings Translator ✌︎︎ Convert Text to Symbols (Copy & Paste)",
    description:
      "Translate plain English into Wingdings-style symbols, compare multiple mapping presets, and decode supported symbols back into readable text.",
    metaDescription:
      "The most accurate Wingdings translator online. Compare Wingdings, Wingdings 2, Wingdings 3, and Webdings-style mappings, then copy and paste the result.",
    h1: "Wingdings Translator & Symbol Converter",
    placeholder: "Type text like Gaster, mystery, or secret code",
    sampleInput: "Gaster speaks in symbols",
    sampleOutputLabel: "Wingdings-style output",
    supportsReverse: true,
    variantIds: ["classic", "gaster", "wingdings-2", "wingdings-3", "webdings"],
    keywords: [
      "wingdings translator",
      "wingdings to english",
      "english to wingdings",
      "gaster alphabet",
      "wingdings 2 translator",
      "webdings translator",
    ],
    intro: [
      "This page is built as the authority hub for Wingdings translator, Wingdings to English, and Gaster alphabet searches.",
      "Because different translator sites use different symbol tables, this tool now includes multiple switchable presets so visitors can compare outputs instead of assuming there is only one mapping standard.",
    ],
    sections: [
      {
        title: "Why mapping tables differ across sites",
        body: [
          "Legacy symbol fonts like Wingdings and Webdings were originally font-encoding systems, not true alphabet ciphers. That means some sites emulate the original font families, while others publish simplified A-Z replacement tables for easier copy and paste.",
          "To make that difference transparent, this page offers several clearly labeled presets rather than pretending every translator on the web follows the same table.",
        ],
      },
      {
        title: "W.D. Gaster and Undertale context",
        body: [
          "W.D. Gaster is strongly associated with Wingdings in Undertale fan culture, so the page keeps a Gaster-friendly preset for readable symbol text and puzzle-style decoding.",
          "At the same time, we surface Wingdings 2, Wingdings 3, and Webdings-inspired alternatives because many visitors arrive after comparing other translator pages with visibly different outputs.",
        ],
      },
      {
        title: "How to use this translator",
        body: [
          "Type plain English once, switch between presets, and copy the output that best matches the style you want.",
          "If someone sends you a symbol string, paste it into the reverse panel while the matching preset is selected. The comparison table below also helps with manual lookup.",
        ],
      },
    ],
    faq: [
      {
        question: "Why does one Wingdings translator disagree with another?",
        answer:
          "Because many pages use different mapping philosophies. Some imitate legacy font-family positions, while others publish a simplified custom alphabet for readability and decoding.",
      },
      {
        question: "Can I switch between Wingdings, Wingdings 2, Wingdings 3, and Webdings-style outputs?",
        answer:
          "Yes. This page includes multiple presets so you can compare the symbol families and copy the version that best fits your use case.",
      },
      {
        question: "Can I convert supported symbols back to English?",
        answer:
          "Yes. The reverse lookup panel decodes the currently selected preset, which is useful when you are working with puzzles or fan-made Gaster text.",
      },
    ],
    relatedSlugs: [
      "subscript-generator",
      "cursive-generator",
      "old-english-translator",
    ],
    encode: defaultWingdingsVariant
      ? defaultWingdingsVariant.encode
      : (value: string) => value,
    decode: defaultWingdingsVariant
      ? defaultWingdingsVariant.decode
      : (value: string) => value,
  },
  "subscript-generator": {
    slug: "subscript-generator",
    name: "Subscript Generator",
    shortName: "Subscript",
    title: "Subscript Text Generator",
    metaTitle: "Subscript Generator (₀₁₂) — Copy and Paste Small Text",
    description:
      "Turn numbers and supported letters into compact subscript text for math notes, chemistry formulas, and social bios.",
    metaDescription:
      "Create small subscript text (₀₁₂₃₄₅) for math, chemistry, or social media bios. Type, generate, and copy-paste anywhere.",
    h1: "Subscript Text Generator",
    placeholder: "Try H2O, CO2, log10, or x2",
    sampleInput: "H2O + CO2",
    sampleOutputLabel: "Subscript output",
    keywords: [
      "subscript generator",
      "subscript text generator",
      "small text subscript",
      "copy and paste subscript",
    ],
    intro: [
      "This page targets low-difficulty, high-intent searches from users who want instant subscript text without opening a document editor.",
      "It works well for chemistry formulas, math notation, and tiny aesthetic text in bios where supported characters are enough.",
    ],
    sections: [
      {
        title: "Where subscript text helps",
        body: [
          "Subscript text is useful when you need a quick H₂O-style effect in notes, formulas, captions, or usernames.",
          "Unicode support is not perfect for every letter, so unsupported characters stay readable instead of being forced into broken output.",
        ],
      },
      {
        title: "Copy and paste workflow",
        body: [
          "Type your expression, copy the transformed version, and paste it into your document, social profile, or message app.",
          "Keeping the page fast and simple is important because users searching this keyword usually want the result in seconds.",
        ],
      },
    ],
    faq: [
      {
        question: "Does subscript support every letter?",
        answer:
          "No. Unicode only includes subscripts for some letters and symbols, so unsupported characters remain unchanged for clarity.",
      },
      {
        question: "Can I use this for chemistry formulas?",
        answer:
          "Yes. It is especially helpful for quick formulas like H₂O, CO₂, and similar notation in plain-text environments.",
      },
      {
        question: "Will it work on social media?",
        answer:
          "Usually yes, but display depends on the platform and device font support. Copy and test where you plan to use it.",
      },
    ],
    relatedSlugs: ["wingdings", "cursive-generator", "old-english-translator"],
    encode: encodeSubscript,
  },
  "cursive-generator": {
    slug: "cursive-generator",
    name: "Cursive Generator",
    shortName: "Cursive",
    title: "Cursive Font Generator",
    metaTitle: "Cursive Text Generator 𝓒𝓸𝓹𝔂 𝓪𝓷𝓭 𝓟𝓪𝓼𝓽𝓮 — Stylish Fonts",
    description:
      "Convert plain text into elegant cursive script for bios, captions, usernames, and decorative copy.",
    metaDescription:
      "Convert normal text into beautiful cursive and script fonts for Instagram, TikTok, and profile names. 100% free.",
    h1: "Cursive Font Generator",
    placeholder: "Type your name, quote, or caption",
    sampleInput: "copy and paste",
    sampleOutputLabel: "Cursive output",
    keywords: [
      "cursive text generator",
      "cursive font generator",
      "script font copy paste",
      "stylish cursive text",
    ],
    intro: [
      "Cursive searches are broad and competitive, so this page focuses on clean intent matching: instant conversion, strong copy CTA, and internal links to related style tools.",
      "The generated text is Unicode-based, which means people can paste it into many social apps without installing a font file.",
    ],
    sections: [
      {
        title: "Why people use cursive generators",
        body: [
          "Most visitors want a decorative but readable style for social bios, video captions, mood boards, and branded text snippets.",
          "A fast preview and one-click copy button usually matter more than advanced settings for this keyword class.",
        ],
      },
      {
        title: "Unicode script vs real font files",
        body: [
          "This tool creates Unicode script characters, not downloadable font files. That makes the output easy to paste across apps.",
          "Platform support can vary slightly, so short text works best when you need dependable display.",
        ],
      },
    ],
    faq: [
      {
        question: "Is this a real font download?",
        answer:
          "No. It converts your text into Unicode script characters so you can copy and paste the styling instantly.",
      },
      {
        question: "Where can I use cursive text?",
        answer:
          "It works well in Instagram bios, TikTok captions, Discord profiles, and many note or messaging apps.",
      },
      {
        question: "Why do some devices show fallback text?",
        answer:
          "Display depends on Unicode support in the app and device font stack. If something looks off, try shorter text or a simpler style.",
      },
    ],
    relatedSlugs: ["wingdings", "subscript-generator", "old-english-translator"],
    encode: encodeCursive,
  },
  "old-english-translator": {
    slug: "old-english-translator",
    name: "Old English Translator",
    shortName: "Old English",
    title: "Old English Translator",
    metaTitle: "Old English Translator 𝔒𝔩𝔡 𝔈𝔫𝔤𝔩𝔦𝔰𝔥 — Medieval Font Converter",
    description:
      "Transform text into gothic blackletter style for posters, logos, tattoos, and dramatic visual headlines.",
    metaDescription:
      "Translate your text into Gothic and Fraktur style Old English lettering for posters, tattoos, and creative designs.",
    h1: "Old English Translator",
    placeholder: "Type a phrase for a gothic or medieval look",
    sampleInput: "medieval legend",
    sampleOutputLabel: "Old English output",
    keywords: [
      "old english translator",
      "old english font generator",
      "gothic text converter",
      "fraktur copy paste",
    ],
    intro: [
      "This page targets people searching for old english translator and medieval font converter queries with clear visual intent.",
      "The output uses blackletter-style Unicode characters that are great for mock headlines, profile names, and creative concepts.",
    ],
    sections: [
      {
        title: "Best use cases",
        body: [
          "Old English styling is popular for posters, branding concepts, album art mockups, tattoo planning, and dramatic headings.",
          "Because readability drops in long paragraphs, short words and titles usually perform best.",
        ],
      },
      {
        title: "What this translator generates",
        body: [
          "This tool outputs Unicode blackletter text inspired by Fraktur and gothic styles.",
          "It is ideal when you want the look of old english lettering without opening a design app or installing fonts locally.",
        ],
      },
    ],
    faq: [
      {
        question: "Is this historically accurate Old English language?",
        answer:
          "No. It is a visual text style converter, not a language translator from modern English into historical Old English.",
      },
      {
        question: "Can I use it for tattoo mockups?",
        answer:
          "Yes, it is useful for rough visual exploration, but always confirm the final lettering with your artist or designer.",
      },
      {
        question: "Why is it also called Fraktur?",
        answer:
          "Many users search for blackletter, gothic, or Fraktur text when they really want the same overall visual effect.",
      },
    ],
    relatedSlugs: ["cursive-generator", "wingdings", "subscript-generator"],
    encode: encodeOldEnglish,
  },
};

export function getToolBySlug(slug: string) {
  return toolConfigs[slug as keyof typeof toolConfigs];
}

export function getRelatedTools(slug: string) {
  const tool = getToolBySlug(slug);

  if (!tool) {
    return [];
  }

  return tool.relatedSlugs
    .map((relatedSlug) => getToolBySlug(relatedSlug))
    .filter((value): value is ToolConfig => Boolean(value));
}

export function buildSoftwareSchema(tool: ToolConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    operatingSystem: "All",
    applicationCategory: "UtilitiesApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: tool.metaDescription,
    url: `${siteUrl}/${tool.slug === "wingdings" ? "" : tool.slug}`,
  };
}

export function buildFaqSchema(tool: ToolConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
