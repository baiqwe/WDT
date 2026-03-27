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

function decodeBySymbols(input: string, decodeMap: Map<string, string>) {
  const symbols = Array.from(decodeMap.keys()).sort(
    (left, right) => right.length - left.length,
  );
  let output = "";
  let cursor = 0;

  while (cursor < input.length) {
    const remaining = input.slice(cursor);
    const matchedSymbol = symbols.find((symbol) => remaining.startsWith(symbol));

    if (matchedSymbol) {
      output += decodeMap.get(matchedSymbol) ?? matchedSymbol;
      cursor += matchedSymbol.length;
      continue;
    }

    output += input[cursor];
    cursor += 1;
  }

  return output;
}

function buildVariantHelpers(variant: TranslatorVariant) {
  const lowerMap = variant.lowerMap ?? variant.upperMap;
  const decodeMap = createDecodeMap(variant.upperMap, lowerMap);

  return {
    encode(input: string) {
      return translateFromAlphabet(input, variant.upperMap, lowerMap);
    },
    decode(input: string) {
      return decodeBySymbols(input, decodeMap);
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

const superscriptMap: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  a: "ᵃ",
  b: "ᵇ",
  c: "ᶜ",
  d: "ᵈ",
  e: "ᵉ",
  f: "ᶠ",
  g: "ᵍ",
  h: "ʰ",
  i: "ⁱ",
  j: "ʲ",
  k: "ᵏ",
  l: "ˡ",
  m: "ᵐ",
  n: "ⁿ",
  o: "ᵒ",
  p: "ᵖ",
  r: "ʳ",
  s: "ˢ",
  t: "ᵗ",
  u: "ᵘ",
  v: "ᵛ",
  w: "ʷ",
  x: "ˣ",
  y: "ʸ",
  z: "ᶻ",
  "+": "⁺",
  "-": "⁻",
  "=": "⁼",
  "(": "⁽",
  ")": "⁾",
};

const encodeSuperscript = (input: string) => {
  let output = "";

  for (const char of input) {
    const lowerChar = char.toLowerCase();
    output += superscriptMap[lowerChar] ?? superscriptMap[char] ?? char;
  }

  return output;
};

const smallTextMap: Record<string, string> = {
  a: "ᴀ",
  b: "ʙ",
  c: "ᴄ",
  d: "ᴅ",
  e: "ᴇ",
  f: "ꜰ",
  g: "ɢ",
  h: "ʜ",
  i: "ɪ",
  j: "ᴊ",
  k: "ᴋ",
  l: "ʟ",
  m: "ᴍ",
  n: "ɴ",
  o: "ᴏ",
  p: "ᴘ",
  q: "ǫ",
  r: "ʀ",
  s: "ꜱ",
  t: "ᴛ",
  u: "ᴜ",
  v: "ᴠ",
  w: "ᴡ",
  x: "x",
  y: "ʏ",
  z: "ᴢ",
};

const encodeSmallText = (input: string) => {
  let output = "";

  for (const char of input) {
    const lowerChar = char.toLowerCase();
    output += smallTextMap[lowerChar] ?? char;
  }

  return output;
};

const tinyTextMap: Record<string, string> = {
  a: "ᵃ",
  b: "ᵇ",
  c: "ᶜ",
  d: "ᵈ",
  e: "ᵉ",
  f: "ᶠ",
  g: "ᵍ",
  h: "ʰ",
  i: "ᶦ",
  j: "ʲ",
  k: "ᵏ",
  l: "ˡ",
  m: "ᵐ",
  n: "ⁿ",
  o: "ᵒ",
  p: "ᵖ",
  q: "ᵠ",
  r: "ʳ",
  s: "ˢ",
  t: "ᵗ",
  u: "ᵘ",
  v: "ᵛ",
  w: "ʷ",
  x: "ˣ",
  y: "ʸ",
  z: "ᶻ",
};

const encodeTinyText = (input: string) => {
  let output = "";

  for (const char of input) {
    const lowerChar = char.toLowerCase();
    output += tinyTextMap[lowerChar] ?? char;
  }

  return output;
};

const bubbleUpper = Array.from("ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ");
const bubbleLower = Array.from("ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ");

const encodeBubble = (input: string) =>
  translateFromAlphabet(input, bubbleUpper, bubbleLower);

const defaultWingdingsVariantBase = translatorVariants.classic;
const defaultWingdingsVariant = defaultWingdingsVariantBase
  ? buildVariantHelpers(defaultWingdingsVariantBase)
  : null;
const defaultGasterVariantBase = translatorVariants.gaster;
const defaultGasterVariant = defaultGasterVariantBase
  ? buildVariantHelpers(defaultGasterVariantBase)
  : null;
const defaultWebdingsVariantBase = translatorVariants.webdings;
const defaultWebdingsVariant = defaultWebdingsVariantBase
  ? buildVariantHelpers(defaultWebdingsVariantBase)
  : null;

export const toolOrder = [
  "wingdings",
  "webdings-translator",
  "subscript-generator",
  "superscript-generator",
  "small-text-generator",
  "tiny-text-generator",
  "cursive-generator",
  "bubble-font-generator",
  "old-english-translator",
  "gothic-font-generator",
  "gaster-translator",
] as const;

export const toolConfigs: Record<(typeof toolOrder)[number], ToolConfig> = {
  wingdings: {
    slug: "wingdings",
    name: "Wingdings Translator",
    shortName: "Wingdings",
    title: "Wingdings Translator & Symbol Converter",
    metaTitle:
      "Wingdings Translator | Convert Wingdings to English (Copy & Paste)",
    description:
      "Convert English to Wingdings-style symbols, decode Wingdings back into English, and compare multiple preset mappings in one fast tool.",
    metaDescription:
      "Convert Wingdings to English or English to Wingdings instantly. Compare Classic, Gaster, Wingdings 2, Wingdings 3, and Webdings-style outputs, then copy and paste the result.",
    h1: "Wingdings Translator (A-Z Converter)",
    placeholder: "Enter text to translate...",
    sampleInput: "Translate this message",
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
      {
        title: "Common symbols and meanings",
        body: [
          "Many visitors use this page to identify familiar Wingdings-style symbols such as hands, arrows, circles, squares, and celestial icons before turning them back into letters.",
          "That practical lookup behavior matters for puzzle solving, Undertale-inspired Gaster messages, and quick copy-paste symbol experiments shared in Discord, TikTok, and fan communities.",
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
    relatedSlugs: ["wingdings", "subscript-generator", "old-english-translator"],
    encode: encodeSubscript,
  },
  "superscript-generator": {
    slug: "superscript-generator",
    name: "Superscript Generator",
    shortName: "Superscript",
    title: "Superscript Text Generator",
    metaTitle: "Superscript Generator (⁰¹²) — Copy and Paste Small Text",
    description:
      "Turn numbers and supported letters into compact superscript text for math, notes, formulas, and social captions.",
    metaDescription:
      "Create superscript text (⁰¹²³⁴⁵) for formulas, notes, captions, and bios. Type, generate, and copy-paste anywhere.",
    h1: "Superscript Text Generator",
    placeholder: "Try x2, E = mc2, or note1",
    sampleInput: "x2 + y3",
    sampleOutputLabel: "Superscript output",
    keywords: [
      "superscript generator",
      "superscript text generator",
      "copy and paste superscript",
      "small superscript text",
    ],
    intro: [
      "This page is designed for people who need quick superscript text without switching to a word processor or equation editor.",
      "It works especially well for light math notation, reference marks, social captions, and compact decorative text.",
    ],
    sections: [
      {
        title: "When superscript text is useful",
        body: [
          "Superscript text is helpful for expressions like x², footnote-like markers, and short styled snippets in bios or notes.",
          "Unicode coverage is incomplete for some characters, so the tool keeps unsupported characters readable instead of forcing bad replacements.",
        ],
      },
      {
        title: "How to use it well",
        body: [
          "Type the base text once, compare the output, and copy the result into the app or document where you need it.",
          "For public-facing use, shorter expressions generally render more reliably than long fully-stylized phrases.",
        ],
      },
    ],
    faq: [
      {
        question: "Does superscript support every letter and symbol?",
        answer:
          "No. Unicode includes many superscript forms, but not every possible character. Unsupported characters stay unchanged.",
      },
      {
        question: "Can I use this for formulas?",
        answer:
          "Yes. It is useful for lightweight formula styling such as x², y³, and short note markers in plain-text environments.",
      },
      {
        question: "Will superscript text render the same everywhere?",
        answer:
          "Not always. Rendering depends on the app, browser, and device, so it is worth testing important output where it will be used.",
      },
    ],
    relatedSlugs: ["subscript-generator", "small-text-generator", "tiny-text-generator"],
    encode: encodeSuperscript,
  },
  "small-text-generator": {
    slug: "small-text-generator",
    name: "Small Text Generator",
    shortName: "Small Text",
    title: "Small Text Generator",
    metaTitle: "Small Text Generator — Copy and Paste Tiny Fonts",
    description:
      "Convert normal text into compact small-text styles for bios, captions, usernames, and aesthetic copy-paste use.",
    metaDescription:
      "Generate small text and compact Unicode lettering for bios, captions, usernames, and decorative text. Copy and paste instantly.",
    h1: "Small Text Generator",
    placeholder: "Type a short phrase for small text",
    sampleInput: "small text style",
    sampleOutputLabel: "Small text output",
    keywords: [
      "small text generator",
      "small text",
      "small font copy and paste",
      "tiny unicode text",
    ],
    intro: [
      "Small text is a strong search intent because visitors usually want a quick visual effect with almost no learning curve.",
      "This page focuses on compact, readable output that still feels decorative enough for bios and social copy.",
    ],
    sections: [
      {
        title: "What small text is good for",
        body: [
          "Small text works well in usernames, bios, side notes, profile decorations, and stylized short-form copy.",
          "The best results usually come from short phrases where readability still matters more than novelty.",
        ],
      },
      {
        title: "What to expect from Unicode small text",
        body: [
          "Small-text output relies on Unicode characters that resemble compact lettering rather than a downloadable font file.",
          "Because support can vary slightly by platform, it is smart to preview the result where you plan to publish it.",
        ],
      },
    ],
    faq: [
      {
        question: "Is small text a real font?",
        answer:
          "No. It is Unicode-based styled text that can be copied and pasted like normal characters.",
      },
      {
        question: "Where can I use small text?",
        answer:
          "It is commonly used in social bios, captions, decorative notes, usernames, and lightweight aesthetic layouts.",
      },
      {
        question: "What if some letters look inconsistent?",
        answer:
          "That can happen because Unicode small-text styles use lookalike characters with uneven support. Shorter output usually looks cleaner.",
      },
    ],
    relatedSlugs: ["superscript-generator", "subscript-generator", "cursive-generator"],
    encode: encodeSmallText,
  },
  "tiny-text-generator": {
    slug: "tiny-text-generator",
    name: "Tiny Text Generator",
    shortName: "Tiny Text",
    title: "Tiny Text Generator",
    metaTitle: "Tiny Text Generator — Copy and Paste Mini Letters",
    description:
      "Generate tiny text and mini Unicode lettering for captions, bios, decorative notes, and compact visual styling.",
    metaDescription:
      "Create tiny text and mini Unicode letters for bios, captions, aesthetic notes, and decorative copy. Copy and paste instantly.",
    h1: "Tiny Text Generator",
    placeholder: "Type text to shrink into tiny letters",
    sampleInput: "tiny caption text",
    sampleOutputLabel: "Tiny text output",
    keywords: [
      "tiny text generator",
      "tiny text",
      "mini text copy and paste",
      "small tiny letters",
    ],
    intro: [
      "Tiny text is closely related to small text, but visitors often search for it as a distinct style and expect even more compact-looking output.",
      "This page emphasizes mini letterforms that work best in short, decorative strings rather than long paragraphs.",
    ],
    sections: [
      {
        title: "Best use cases for tiny text",
        body: [
          "Tiny text is useful for subtle captions, compact bios, annotations, and design accents where full-size lettering feels too heavy.",
          "It is especially effective when paired with normal text instead of replacing an entire long sentence.",
        ],
      },
      {
        title: "Readability advice",
        body: [
          "Because tiny Unicode characters can become hard to read quickly, shorter phrases almost always look better than long converted paragraphs.",
          "If readability matters more than the effect, small text or superscript may be the better choice.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between tiny text and small text?",
        answer:
          "They are closely related, but tiny text usually aims for a more miniaturized look, while small text often prioritizes slightly better readability.",
      },
      {
        question: "Can I use tiny text on social platforms?",
        answer:
          "Usually yes, but you should test the final output on the target platform because rendering can vary.",
      },
      {
        question: "Why does long tiny text look messy?",
        answer:
          "Tiny Unicode styles are best for short decorative phrases. Long converted text often loses clarity very quickly.",
      },
    ],
    relatedSlugs: ["small-text-generator", "superscript-generator", "bubble-font-generator"],
    encode: encodeTinyText,
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
  "bubble-font-generator": {
    slug: "bubble-font-generator",
    name: "Bubble Font Generator",
    shortName: "Bubble Font",
    title: "Bubble Font Generator",
    metaTitle: "Bubble Font Generator ⓑⓤⓑⓑⓛⓔ — Copy and Paste",
    description:
      "Convert plain text into rounded bubble-style letters for playful bios, captions, usernames, and decorative copy.",
    metaDescription:
      "Generate bubble font text you can copy and paste instantly for usernames, captions, bios, and playful decorative text.",
    h1: "Bubble Font Generator",
    placeholder: "Type your text for bubble letters",
    sampleInput: "bubble letter style",
    sampleOutputLabel: "Bubble font output",
    keywords: [
      "bubble font generator",
      "bubble font",
      "bubble letters copy and paste",
      "rounded unicode text",
    ],
    intro: [
      "Bubble font is one of the clearest style-intent searches because visitors usually want a friendly rounded look they can use immediately.",
      "This page gives that result without asking users to download anything or learn a design tool.",
    ],
    sections: [
      {
        title: "Why people like bubble letters",
        body: [
          "Bubble-style lettering feels playful, soft, and approachable, which makes it popular for social captions, names, and decorative labels.",
          "It is especially effective for short phrases where the rounded look stays readable.",
        ],
      },
      {
        title: "How this generator works",
        body: [
          "The output uses Unicode circled characters that visually resemble bubble letters and can be copied like regular text.",
          "Because it is Unicode-based rather than a font download, the page is useful for quick browser-based copy and paste.",
        ],
      },
    ],
    faq: [
      {
        question: "Are bubble letters a downloadable font here?",
        answer:
          "No. This page creates Unicode-based bubble-style text for direct copy and paste.",
      },
      {
        question: "Where does bubble font work best?",
        answer:
          "It works best in short names, bios, labels, social captions, and decorative snippets.",
      },
      {
        question: "Why do some characters stay unchanged?",
        answer:
          "Only letters with matching Unicode forms are transformed cleanly, so unsupported characters remain readable.",
      },
    ],
    relatedSlugs: ["small-text-generator", "cursive-generator", "gothic-font-generator"],
    encode: encodeBubble,
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
  "gothic-font-generator": {
    slug: "gothic-font-generator",
    name: "Gothic Font Generator",
    shortName: "Gothic Font",
    title: "Gothic Font Generator",
    metaTitle: "Gothic Font Generator 𝔊𝔬𝔱𝔥𝔦𝔠 — Copy and Paste",
    description:
      "Create gothic and blackletter-style text for headings, mock branding, poster concepts, tattoos, and dramatic visual copy.",
    metaDescription:
      "Generate gothic font text in a blackletter style for headings, posters, mockups, tattoos, and decorative copy.",
    h1: "Gothic Font Generator",
    placeholder: "Type a phrase for gothic lettering",
    sampleInput: "gothic letter style",
    sampleOutputLabel: "Gothic font output",
    keywords: [
      "gothic font generator",
      "gothic font",
      "blackletter text generator",
      "gothic letters copy paste",
    ],
    intro: [
      "This page targets visual-intent searches where people want the look of gothic lettering without opening a design app.",
      "It overlaps with old english and blackletter searches, but the page is framed specifically around the font-style use case.",
    ],
    sections: [
      {
        title: "When gothic text works best",
        body: [
          "Gothic lettering is strongest in headlines, logos, poster mockups, album art concepts, and short dramatic phrases.",
          "Because the style is dense and decorative, it is much better for short display text than for long passages.",
        ],
      },
      {
        title: "What kind of output this page gives",
        body: [
          "This generator uses Unicode blackletter-style forms to create a gothic visual effect you can copy and paste quickly.",
          "It is ideal for exploration and mockups, but final production use should still be checked for readability and context.",
        ],
      },
    ],
    faq: [
      {
        question: "Is this the same as Old English text?",
        answer:
          "It is closely related in visual style, and many users use the terms interchangeably when they want blackletter-looking text.",
      },
      {
        question: "Can I use gothic font output for posters or mockups?",
        answer:
          "Yes. It is useful for concepting and quick copy-paste experiments, especially for short display text.",
      },
      {
        question: "Why is long gothic text hard to read?",
        answer:
          "Blackletter styles are visually dense, so they work best in short headings rather than in full paragraphs.",
      },
    ],
    relatedSlugs: ["old-english-translator", "bubble-font-generator", "wingdings"],
    encode: encodeOldEnglish,
  },
  "gaster-translator": {
    slug: "gaster-translator",
    name: "Gaster Translator",
    shortName: "Gaster",
    title: "Gaster Translator",
    metaTitle: "Gaster Translator | Decode Gaster Alphabet to English",
    description:
      "Convert plain text into Gaster-style symbols and decode Gaster alphabet strings back into readable English.",
    metaDescription:
      "Use this Gaster translator to convert English into Gaster-style symbols or decode Gaster alphabet text back into English instantly.",
    h1: "Gaster Translator",
    placeholder: "Type plain English or paste Gaster symbols...",
    sampleInput: "mystery signal",
    sampleOutputLabel: "Gaster-style output",
    supportsReverse: true,
    variantIds: ["gaster"],
    keywords: [
      "gaster translator",
      "gaster alphabet translator",
      "gaster to english",
      "english to gaster",
    ],
    intro: [
      "This page is built for visitors who specifically search for Gaster alphabet translation instead of general Wingdings tools.",
      "It keeps the focused Gaster-style preset separate so the intent is obvious for both users and search engines.",
    ],
    sections: [
      {
        title: "How Gaster translation works here",
        body: [
          "The Gaster preset on this site is a readable symbol alphabet inspired by Undertale fan usage rather than a claim about one official canonical cipher table.",
          "That makes it useful for copy-paste messages, puzzle practice, and quick decoding when someone sends you a Gaster-style string.",
        ],
      },
      {
        title: "When to use a dedicated Gaster page",
        body: [
          "Use this page if your search intent is specifically Gaster, mystery text, or Undertale puzzle symbolism and you do not need to compare every other Wingdings family at the same time.",
          "For broader symbol comparisons, the main Wingdings page is still the best hub because it includes multiple presets and a full mapping reference.",
        ],
      },
    ],
    faq: [
      {
        question: "Can I decode Gaster symbols back into English here?",
        answer:
          "Yes. Paste the symbol string into the symbol panel and the plain-text panel will decode the matching Gaster-style letters in real time.",
      },
      {
        question: "Is this the same as classic Wingdings?",
        answer:
          "Not exactly. This page uses the Gaster-focused preset, which is more puzzle- and fandom-oriented than the classic Wingdings symbol mapping.",
      },
      {
        question: "Can I still compare other symbol styles?",
        answer:
          "Yes. The main Wingdings Translator page lets you compare Gaster, Classic Wingdings, Wingdings 2, Wingdings 3, and Webdings-style outputs side by side.",
      },
    ],
    relatedSlugs: ["wingdings", "webdings-translator", "old-english-translator"],
    encode: defaultGasterVariant ? defaultGasterVariant.encode : (value: string) => value,
    decode: defaultGasterVariant ? defaultGasterVariant.decode : (value: string) => value,
  },
  "webdings-translator": {
    slug: "webdings-translator",
    name: "Webdings Translator",
    shortName: "Webdings",
    title: "Webdings Translator",
    metaTitle: "Webdings Translator — Convert Text to Webdings Symbols",
    description:
      "Convert plain text into Webdings-style icon output for quick symbol experiments, copy-paste sharing, and reference use.",
    metaDescription:
      "Translate plain text into Webdings-style symbols and icon output you can copy, compare, and use in lightweight creative workflows.",
    h1: "Webdings Translator",
    placeholder: "Type plain English here...",
    sampleInput: "Desktop tools and icons",
    sampleOutputLabel: "Webdings-style output",
    supportsReverse: true,
    variantIds: ["webdings"],
    keywords: [
      "webdings",
      "webdings translator",
      "webdings symbols",
      "webdings copy and paste",
    ],
    intro: [
      "Webdings sits close to Wingdings in user intent, but many visitors search it separately because they want an object- and icon-heavy symbol set.",
      "This page provides a dedicated Webdings-style workflow instead of burying that intent inside the larger Wingdings page.",
    ],
    sections: [
      {
        title: "How Webdings differs from Wingdings",
        body: [
          "Webdings-style output tends to feel more icon-like and object-centered, while Wingdings pages are often approached more like symbol alphabets.",
          "That makes Webdings useful for people who want pictographic output rather than mystery-text aesthetics.",
        ],
      },
      {
        title: "Best use cases",
        body: [
          "Webdings-style output is best for quick experiments, icon-like decorative strings, and reference checks when you want symbol-heavy output.",
          "As with other legacy-inspired mappings, the result should be tested where it will actually appear if consistency matters.",
        ],
      },
    ],
    faq: [
      {
        question: "Is Webdings the same as Wingdings?",
        answer:
          "No. They are related legacy symbol families, but users often want them for slightly different visual outcomes.",
      },
      {
        question: "Why make Webdings its own page?",
        answer:
          "Because it has its own search intent and visitors usually want icon-focused output rather than a broader Wingdings preset list.",
      },
      {
        question: "Can I copy and paste Webdings-style output?",
        answer:
          "Yes. This page is designed for direct browser-based copy and paste of the generated icon-like text.",
      },
    ],
    relatedSlugs: ["wingdings", "subscript-generator", "cursive-generator"],
    encode: defaultWebdingsVariant
      ? defaultWebdingsVariant.encode
      : (value: string) => value,
    decode: defaultWebdingsVariant
      ? defaultWebdingsVariant.decode
      : (value: string) => value,
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
