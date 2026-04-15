export const siteUrl = "https://wingdingstranslator.org";

export const localizedWingdingsAlternates = {
  "x-default": siteUrl,
  en: siteUrl,
  es: `${siteUrl}/es/traductor-wingdings`,
  pt: `${siteUrl}/pt/tradutor-wingdings`,
  ru: `${siteUrl}/ru/wingdings-translator`,
};

export type ToolSection = {
  title: string;
  body: string[];
};

export type ToolFaq = {
  question: string;
  answer: string;
};

export type ConverterUiConfig = {
  defaultActivePane?: "left" | "right";
  leftEyebrow?: string;
  leftTitle?: string;
  leftDescriptionEncode?: string;
  leftDescriptionDecode?: string;
  rightEyebrow?: string;
  rightTitle?: string;
  rightPlaceholder?: string;
  rightDescriptionEncode?: string;
  rightDescriptionDecode?: string;
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
  converterUi?: ConverterUiConfig;
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
const defaultWingdingsTwoVariantBase = translatorVariants["wingdings-2"];
const defaultWingdingsTwoVariant = defaultWingdingsTwoVariantBase
  ? buildVariantHelpers(defaultWingdingsTwoVariantBase)
  : null;
const defaultWingdingsThreeVariantBase = translatorVariants["wingdings-3"];
const defaultWingdingsThreeVariant = defaultWingdingsThreeVariantBase
  ? buildVariantHelpers(defaultWingdingsThreeVariantBase)
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
  "wingdings-decoder",
  "wingdings-generator",
  "english-to-wingdings",
  "wingdings-2-translator",
  "wingdings-3-translator",
  "undertale-wingdings-translator",
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
  "gaster-alphabet-translator",
] as const;

export const toolUpdatedAt: Record<(typeof toolOrder)[number], string> = {
  wingdings: "2026-04-15",
  "wingdings-decoder": "2026-04-15",
  "wingdings-generator": "2026-04-15",
  "english-to-wingdings": "2026-04-15",
  "wingdings-2-translator": "2026-04-15",
  "wingdings-3-translator": "2026-04-15",
  "undertale-wingdings-translator": "2026-04-15",
  "webdings-translator": "2026-04-15",
  "subscript-generator": "2026-03-24",
  "superscript-generator": "2026-03-24",
  "small-text-generator": "2026-03-24",
  "tiny-text-generator": "2026-03-24",
  "cursive-generator": "2026-03-22",
  "bubble-font-generator": "2026-03-24",
  "old-english-translator": "2026-03-24",
  "gothic-font-generator": "2026-03-24",
  "gaster-translator": "2026-03-29",
  "gaster-alphabet-translator": "2026-03-29",
};

export const toolConfigs: Record<(typeof toolOrder)[number], ToolConfig> = {
  wingdings: {
    slug: "wingdings",
    name: "Wingdings Translator",
    shortName: "Wingdings",
    title: "Wingdings Translator & Symbol Converter",
    metaTitle: "Wingdings Translator - Convert & Decode Wingdings Online",
    description:
      "Convert English to Wingdings-style symbols, decode Wingdings back into English, and compare multiple preset mappings in one fast tool.",
    metaDescription:
      "Instantly convert Wingdings to English and back. Free online decoder to translate symbols, copy & paste results for Gaster alphabet, social media, and more. No download required!",
    h1: "Wingdings Translator: Convert & Decode Wingdings Online",
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
        title: "What is Wingdings?",
        body: [
          "Wingdings is a symbol-heavy legacy font family that became famous for turning ordinary letters into hands, shapes, arrows, and other pictographic forms.",
          "Modern visitors usually do not want the original desktop font file itself. They want quick translation, reverse decoding, and copy-paste output that works in the browser.",
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
      {
        title: "Supported symbol families",
        body: [
          "This translator currently covers Classic Wingdings, a Gaster-friendly preset, Wingdings 2 style, Wingdings 3 style, and Webdings style.",
          "That broader coverage helps with long-tail searches such as wingdings to english, gaster font translator, hands symbol font translator, and webdings converter queries.",
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
      {
        question: "What is the difference between Wingdings and Webdings?",
        answer:
          "Wingdings and Webdings are related legacy symbol families, but they use different visual sets. Wingdings often feels more symbolic, while Webdings tends to look more like interface and object icons.",
      },
      {
        question: "Can I use this as a Wingdings to English translator?",
        answer:
          "Yes. The site is built for both directions, so you can decode supported symbol strings back into readable English as well as convert English into symbol output.",
      },
      {
        question: "Does this page support Gaster alphabet translation?",
        answer:
          "Yes. The Gaster-style preset and the dedicated Gaster Translator page both support mystery-text workflows inspired by Undertale fan usage.",
      },
      {
        question: "Why do some letters look like hands or shapes?",
        answer:
          "That is part of the appeal of legacy symbol fonts. Instead of behaving like a normal alphabet, they swap letters for pictographic marks such as hands, arrows, squares, and icons.",
      },
      {
        question: "Can I copy and paste the output into Discord, TikTok, or social bios?",
        answer:
          "Usually yes. Results can be copied directly, but display still depends on the font and Unicode support of the app or device where you paste them.",
      },
      {
        question: "What if my decoded result still looks wrong?",
        answer:
          "Try a different preset. Many mystery strings fail to decode at first simply because the original message used a different symbol family or a custom simplified alphabet.",
      },
      {
        question: "Does the site include a full A-Z mapping table?",
        answer:
          "Yes. The mapping table below the tool shows a letter-by-letter reference for every available preset so you can compare exact outputs manually.",
      },
      {
        question: "Is this page only for fans and puzzle solvers?",
        answer:
          "No. It is useful for quick symbol experiments, copy-paste text effects, reference lookups, and mystery-message decoding even if you are not part of a fandom community.",
      },
    ],
    relatedSlugs: [
      "wingdings-decoder",
      "wingdings-generator",
      "undertale-wingdings-translator",
      "wingdings-2-translator",
    ],
    encode: defaultWingdingsVariant
      ? defaultWingdingsVariant.encode
      : (value: string) => value,
    decode: defaultWingdingsVariant
      ? defaultWingdingsVariant.decode
      : (value: string) => value,
  },
  "wingdings-decoder": {
    slug: "wingdings-decoder",
    name: "Wingdings Decoder",
    shortName: "Decoder",
    title: "Wingdings Decoder",
    metaTitle: "Wingdings Decoder | Translate Wingdings to English Instantly",
    description:
      "Paste Wingdings symbols, decode them back into English, and compare multiple symbol presets when the mystery text came from an unknown source.",
    metaDescription:
      "Free online Wingdings decoder. Paste your symbols and convert Wingdings to English text, letters, and words instantly. Supports Classic, Gaster, Wingdings 2, Wingdings 3, and Webdings.",
    h1: "Wingdings Decoder (Wingdings to English)",
    placeholder: "Decoded English appears here...",
    sampleInput: "secret message",
    sampleOutputLabel: "Wingdings symbol input",
    supportsReverse: true,
    variantIds: ["classic", "gaster", "wingdings-2", "wingdings-3", "webdings"],
    converterUi: {
      defaultActivePane: "right",
      leftEyebrow: "English",
      leftTitle: "Decoded English",
      leftDescriptionEncode: "Type here if you want to switch back into encoder mode.",
      leftDescriptionDecode:
        "Decoded letters appear here while you paste or edit Wingdings symbols on the right.",
      rightEyebrow: "Decoder",
      rightTitle: "Wingdings Symbols",
      rightPlaceholder: "Paste Wingdings symbols here to decode...",
      rightDescriptionEncode:
        "Encoded symbols appear here when you type plain text on the left.",
      rightDescriptionDecode:
        "Paste mystery symbols here to translate them back into readable English.",
    },
    keywords: [
      "wingdings decoder",
      "wingdings to english",
      "wingdings translator to english",
      "convert wingdings to english",
      "decode wingdings",
      "wingdings to text",
      "wingdings to letters",
    ],
    intro: [
      "This page is tuned for the reverse-translation workflow: you already have a line of symbols and need plain English fast.",
      "It keeps reverse decoding front and center while still letting you switch presets when the source message does not match the first mapping you try.",
    ],
    sections: [
      {
        title: "Why a dedicated Wingdings decoder matters",
        body: [
          "Users searching wingdings decoder or wingdings to english usually do not want a general-purpose converter. They want a page that starts from unreadable symbols and ends with readable text.",
          "That is why this page opens in decoder mode first and frames the workflow around pasting mystery strings rather than typing normal English.",
        ],
      },
      {
        title: "Try another preset before assuming the message is broken",
        body: [
          "A failed decode does not always mean the symbols are random. Many online pages use different simplified symbol tables, so the same message may only decode cleanly under one preset.",
          "Switch between Classic, Gaster, Wingdings 2, Wingdings 3, and Webdings until the output starts looking like actual words.",
        ],
      },
      {
        title: "Common misspellings still lead here",
        body: [
          "People often search for windings decoder, wing ding translator, or wingding decoder when they are trying to solve the same problem.",
          "Google usually understands those variants, so it is better to answer them naturally inside the page copy and FAQ than to publish duplicate typo pages.",
        ],
      },
      {
        title: "Best use cases for this page",
        body: [
          "This decoder is useful for mystery text screenshots, copy-pasted fandom messages, puzzle hunts, social posts, and any string of symbols you suspect came from a Wingdings-style alphabet.",
          "If your real goal is to create a stylized message from scratch, the generator page will be the better fit.",
        ],
      },
    ],
    faq: [
      {
        question: "How do I decode Wingdings to English?",
        answer:
          "Paste the Wingdings-style symbols into the right-hand decoder panel, then switch presets if the first result does not look readable.",
      },
      {
        question: "Why does my decoded text still look wrong?",
        answer:
          "The most common reason is a preset mismatch. Many symbol translators use different mapping tables, so try another preset before giving up on the message.",
      },
      {
        question: "Can this decode wing ding or windings text too?",
        answer:
          "Yes. Those searches usually refer to the same Wingdings-style decoding task, so the workflow here is the same even if the query spelling is off.",
      },
      {
        question: "Does the decoder support Wingdings 2 and Wingdings 3?",
        answer:
          "Yes. This page includes dedicated presets for Wingdings 2, Wingdings 3, Classic Wingdings, Gaster, and Webdings-style output.",
      },
      {
        question: "Can I encode text from this page too?",
        answer:
          "Yes. Even though it opens in decoder mode, you can still switch back and create symbol output from normal English.",
      },
    ],
    relatedSlugs: [
      "wingdings",
      "wingdings-generator",
      "undertale-wingdings-translator",
      "wingdings-3-translator",
    ],
    encode: defaultWingdingsVariant
      ? defaultWingdingsVariant.encode
      : (value: string) => value,
    decode: defaultWingdingsVariant
      ? defaultWingdingsVariant.decode
      : (value: string) => value,
  },
  "wingdings-generator": {
    slug: "wingdings-generator",
    name: "Wingdings Text Generator",
    shortName: "Generator",
    title: "Wingdings Text Generator & Copy Paste Tool",
    metaTitle: "Wingdings Text Generator (Copy & Paste Font Online)",
    description:
      "Type normal English, generate Wingdings-style text instantly, and copy-paste the result into bios, posts, usernames, and decorative layouts.",
    metaDescription:
      "Generate custom Wingdings text online. Type your English words and copy-paste the Wingdings font style anywhere. Free text generator for Classic, Gaster, Wingdings 2, Wingdings 3, and Webdings.",
    h1: "Wingdings Text Generator & Copy Paste Tool",
    placeholder: "Type your English text for Wingdings copy and paste...",
    sampleInput: "copy paste style",
    sampleOutputLabel: "Copy-paste Wingdings output",
    supportsReverse: true,
    variantIds: ["classic", "gaster", "wingdings-2", "wingdings-3", "webdings"],
    converterUi: {
      leftEyebrow: "Generator",
      leftTitle: "Plain English Input",
      leftDescriptionEncode:
        "Type names, captions, or short phrases here to generate copy-paste Wingdings text.",
      leftDescriptionDecode:
        "Decoded English appears here if you switch into reverse translation.",
      rightEyebrow: "Copy & Paste",
      rightTitle: "Wingdings Text Output",
      rightPlaceholder: "Generated Wingdings text appears here...",
      rightDescriptionEncode:
        "Choose a preset, review the style, and copy the final version wherever you want to use it.",
      rightDescriptionDecode:
        "Paste symbols here if you want to reverse the generator and decode a message instead.",
    },
    keywords: [
      "wingdings generator",
      "wingdings text generator",
      "text to wingdings",
      "wingdings copy paste",
      "wingding copy and paste",
      "wingdings font online",
      "wingdings text",
    ],
    intro: [
      "This page is built for the forward-generation use case: take plain English, turn it into stylized symbols, and copy the result into another app.",
      "The wording leans into names, social media, captions, and decorative text so users instantly understand that this is the generator workflow rather than the decoder workflow.",
    ],
    sections: [
      {
        title: "Why this page exists separately from the converter",
        body: [
          "Many visitors do not think in terms of encoding tables or symbol families. They just want a Wingdings text generator that feels fast, visual, and ready to copy.",
          "A dedicated generator page lets the title, headings, examples, and FAQs match that intent without forcing everyone through a mixed-purpose tool page.",
        ],
      },
      {
        title: "Best use cases for Wingdings copy and paste",
        body: [
          "This workflow is useful for profile names, playful captions, mystery-style posts, graphic mockups, and short decorative lines you want to paste somewhere else immediately.",
          "Short phrases usually work best because they stay readable enough to verify before you share them.",
        ],
      },
      {
        title: "These are text characters, not emoji stickers",
        body: [
          "People sometimes look for a wingdings translator with no emojis because they want actual copyable text rather than large emoji artwork.",
          "This page focuses on Unicode-compatible symbol output you can paste like text, although final appearance still depends on the app and device.",
        ],
      },
      {
        title: "Preset choice changes the vibe",
        body: [
          "Classic Wingdings gives you the most recognizable symbol-heavy look, while Wingdings 3 feels more like arrows and directional marks.",
          "If you want Undertale-adjacent mystery text, the Gaster preset is usually the fastest place to start.",
        ],
      },
    ],
    faq: [
      {
        question: "How do I generate Wingdings text online?",
        answer:
          "Type plain English into the input field, choose the preset you want, and copy the generated symbol text from the output panel.",
      },
      {
        question: "Can I copy and paste the generated text anywhere?",
        answer:
          "Usually yes. The output is designed for browser-based copy and paste, although rendering still depends on the target app and device.",
      },
      {
        question: "Is this different from the Wingdings decoder?",
        answer:
          "Yes. This page is tuned for creating new symbol text from normal English, while the decoder page starts with symbols and turns them back into English.",
      },
      {
        question: "Which Wingdings style should I pick first?",
        answer:
          "Classic Wingdings is the best starting point for a familiar symbol look. If you want arrows, try Wingdings 3. If you want fandom-style mystery text, try Gaster.",
      },
      {
        question: "Can I decode text here too?",
        answer:
          "Yes. The page still supports reverse translation, but the primary framing and examples are designed for generation and copy-paste use.",
      },
    ],
    relatedSlugs: [
      "wingdings",
      "english-to-wingdings",
      "wingdings-decoder",
      "undertale-wingdings-translator",
    ],
    encode: defaultWingdingsVariant
      ? defaultWingdingsVariant.encode
      : (value: string) => value,
    decode: defaultWingdingsVariant
      ? defaultWingdingsVariant.decode
      : (value: string) => value,
  },
  "english-to-wingdings": {
    slug: "english-to-wingdings",
    name: "English to Wingdings Converter",
    shortName: "English to Wingdings",
    title: "English to Wingdings Converter",
    metaTitle: "English to Wingdings Converter | Fast & Free Translation",
    description:
      "Convert plain English into Wingdings-style symbols, compare mapping tables, and validate which preset best matches the output you need.",
    metaDescription:
      "Convert English text into Wingdings symbols with preset comparison for Classic, Gaster, Wingdings 2, Wingdings 3, and Webdings styles. Ideal for exact matching and reference checks.",
    h1: "English to Wingdings Converter",
    placeholder: "Enter English text to convert into symbols...",
    sampleInput: "Turn this message into symbols",
    sampleOutputLabel: "Wingdings symbol output",
    supportsReverse: true,
    variantIds: ["classic", "gaster", "wingdings-2", "wingdings-3", "webdings"],
    keywords: [
      "english to wingdings",
      "english to wingdings translator",
      "convert english to wingdings",
      "wingdings converter",
      "wingdings encoder",
    ],
    intro: [
      "This page is intentionally narrower than the main Wingdings generator. It is built for users who care about conversion accuracy, preset comparison, and controlled English-to-symbol output.",
      "If the generator page is the creative front door, this converter page is the precision view for users comparing mappings and trying to match a specific symbol table.",
    ],
    sections: [
      {
        title: "Why use a dedicated English to Wingdings page",
        body: [
          "Some visitors want a more technical English-to-symbol workflow than a broad generator page provides. They are comparing presets, checking mappings, or trying to reproduce a known output style more exactly.",
          "A dedicated converter page makes that workflow clearer by focusing on conversion logic and preset differences instead of social styling language.",
        ],
      },
      {
        title: "Compare multiple symbol styles before you finalize the output",
        body: [
          "Classic Wingdings is the best place to start if you want the most recognizable symbol-heavy look.",
          "If you are chasing a different mood, compare Gaster, Wingdings 2, Wingdings 3, and Webdings-style outputs side by side before you decide which one to use.",
        ],
      },
      {
        title: "Best use cases for this converter page",
        body: [
          "This page works best when you are matching screenshots, validating preset behavior, preparing puzzle text, or testing which mapping produces the closest result to another source.",
          "If your main goal is quick decorative copy-paste for bios or captions, the dedicated generator page is a better fit.",
        ],
      },
      {
        title: "What to do if the result looks different somewhere else",
        body: [
          "Different sites often use different mapping tables, which is why copied output can vary across translators.",
          "If you are trying to match another screenshot or another site exactly, switch presets first instead of assuming the tool is wrong.",
        ],
      },
    ],
    faq: [
      {
        question: "Can I convert plain English directly into Wingdings symbols?",
        answer:
          "Yes. Type or paste normal English into the input field and the tool will generate symbol output instantly.",
      },
      {
        question: "Does this page support copy and paste?",
        answer:
          "Yes. You can still copy the output anywhere, but this page is optimized more for exact conversion and preset comparison than for social-style generation.",
      },
      {
        question: "Which preset should I choose first?",
        answer:
          "Classic Wingdings is the most recognizable starting point. After that, compare Gaster, Wingdings 2, Wingdings 3, and Webdings if you want a different visual feel.",
      },
      {
        question: "Why is my result different from another Wingdings site?",
        answer:
          "Many translators use different letter mappings for convenience or style, so switching presets is the first thing to try when outputs do not match.",
      },
      {
        question: "Can I decode symbols back into English here too?",
        answer:
          "Yes. This page still includes reverse support, but the content and examples are tuned for English-to-symbol searches.",
      },
    ],
    relatedSlugs: [
      "wingdings-generator",
      "wingdings",
      "wingdings-decoder",
      "webdings-translator",
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
  "wingdings-2-translator": {
    slug: "wingdings-2-translator",
    name: "Wingdings 2 Translator",
    shortName: "Wingdings 2",
    title: "Wingdings 2 Translator",
    metaTitle: "Wingdings 2 Translator | Convert Text with Wingdings 2 Symbols",
    description:
      "Translate text with a dedicated Wingdings 2 preset and decode Wingdings 2-style symbols without switching through unrelated mappings first.",
    metaDescription:
      "Use this Wingdings 2 translator to convert English into Wingdings 2 symbols and decode Wingdings 2 text back to English with a focused one-preset tool.",
    h1: "Wingdings 2 Translator",
    placeholder: "Type plain English or paste Wingdings 2 symbols...",
    sampleInput: "round signal",
    sampleOutputLabel: "Wingdings 2 output",
    supportsReverse: true,
    variantIds: ["wingdings-2"],
    keywords: [
      "wingdings 2 translator",
      "wingdings 2 font translator",
      "wingdings 2 decoder",
      "wingdings 2 to english",
    ],
    intro: [
      "This page is the dedicated answer for visitors who already know they need Wingdings 2 rather than a broader symbol comparison tool.",
      "By removing unrelated presets from the first screen, it makes the workflow faster for users who are matching Wingdings 2 strings specifically.",
    ],
    sections: [
      {
        title: "Why Wingdings 2 deserves its own page",
        body: [
          "Someone searching wingdings 2 translator is showing a much narrower intent than a generic wingdings visitor. They are often trying to match one specific symbol family rather than browse multiple options.",
          "A dedicated page reduces the chance that they bounce after seeing Classic Wingdings or Gaster before the version they actually wanted.",
        ],
      },
      {
        title: "What makes Wingdings 2 feel different",
        body: [
          "Wingdings 2-style output leans into geometric and dial-like forms rather than the more eclectic symbol mix many people associate with classic Wingdings.",
          "That visual difference matters when you are trying to recreate a screenshot, match a puzzle source, or keep a consistent symbol style.",
        ],
      },
      {
        title: "When to use this page instead of the main hub",
        body: [
          "Use this dedicated page when you know the source message or target aesthetic is Wingdings 2 specifically.",
          "Use the main hub when you are not sure which symbol family you are looking at and need to compare multiple presets side by side.",
        ],
      },
    ],
    faq: [
      {
        question: "Does this page only use Wingdings 2?",
        answer:
          "Yes. It is intentionally focused on the Wingdings 2 preset so you can convert and decode without switching through unrelated symbol families first.",
      },
      {
        question: "Can I decode Wingdings 2 back into English?",
        answer:
          "Yes. Paste the symbols into the tool and it will decode them using the Wingdings 2 mapping on this page.",
      },
      {
        question: "Should I use this page or the main Wingdings translator?",
        answer:
          "Use this page if you already know the message is Wingdings 2. Use the main hub if you still need to compare multiple presets.",
      },
    ],
    relatedSlugs: [
      "wingdings",
      "wingdings-3-translator",
      "wingdings-decoder",
      "webdings-translator",
    ],
    encode: defaultWingdingsTwoVariant
      ? defaultWingdingsTwoVariant.encode
      : (value: string) => value,
    decode: defaultWingdingsTwoVariant
      ? defaultWingdingsTwoVariant.decode
      : (value: string) => value,
  },
  "wingdings-3-translator": {
    slug: "wingdings-3-translator",
    name: "Wingdings 3 Translator",
    shortName: "Wingdings 3",
    title: "Wingdings 3 Translator",
    metaTitle: "Wingdings 3 Translator | Arrows & Direction Symbol Converter",
    description:
      "Convert text into Wingdings 3 arrows and directional symbols, or decode Wingdings 3 strings back into readable English.",
    metaDescription:
      "Use this Wingdings 3 translator to generate arrow-heavy symbol text and decode Wingdings 3 output back to English. Focused on the Wingdings 3 preset only.",
    h1: "Wingdings 3 Translator",
    placeholder: "Type plain English or paste Wingdings 3 symbols...",
    sampleInput: "arrow route",
    sampleOutputLabel: "Wingdings 3 output",
    supportsReverse: true,
    variantIds: ["wingdings-3"],
    keywords: [
      "wingdings 3 translator",
      "wingdings 3 translation",
      "wingdings 3 decoder",
      "wingdings 3 arrows",
    ],
    intro: [
      "Wingdings 3 has a much more directional, arrow-heavy feel than the other presets on the site, which makes it worth treating as its own landing page.",
      "This page removes distraction and speaks directly to users who want arrows, pointers, and navigation-like symbol output rather than a broad symbol catalog.",
    ],
    sections: [
      {
        title: "Why Wingdings 3 stands apart",
        body: [
          "Wingdings 3 is the most obviously directional preset in the current lineup. Many of its symbols feel like arrows, pointers, or interface markers rather than mixed pictograms.",
          "That means it attracts a different kind of searcher: someone looking for arrow symbols, direction marks, or a very specific Wingdings 3-style screenshot.",
        ],
      },
      {
        title: "Great for arrows and direction symbols",
        body: [
          "If you want symbol text that feels more like route markers than decorative icons, Wingdings 3 is usually the strongest fit.",
          "It can work well for stylized labels, direction-themed mockups, and any short text where arrow energy is part of the visual concept.",
        ],
      },
      {
        title: "Why a focused preset helps",
        body: [
          "A single-preset page makes it easier to validate whether the arrow-rich output you are seeing matches Wingdings 3 or another symbol table.",
          "It also gives search engines a much clearer target for wingdings 3 translator intent than burying the preset inside a general hub alone.",
        ],
      },
    ],
    faq: [
      {
        question: "Does this page only generate Wingdings 3 symbols?",
        answer:
          "Yes. The tool is intentionally focused on Wingdings 3 so you can work with the arrow-heavy preset directly.",
      },
      {
        question: "Can I decode Wingdings 3 back into English?",
        answer:
          "Yes. Paste Wingdings 3 symbols into the tool and it will decode them using the page's dedicated preset.",
      },
      {
        question: "Why does Wingdings 3 look more like arrows?",
        answer:
          "Because this symbol family is much more directional than classic Wingdings, which is exactly why people often search for it separately.",
      },
    ],
    relatedSlugs: [
      "wingdings",
      "wingdings-2-translator",
      "wingdings-generator",
      "webdings-translator",
    ],
    encode: defaultWingdingsThreeVariant
      ? defaultWingdingsThreeVariant.encode
      : (value: string) => value,
    decode: defaultWingdingsThreeVariant
      ? defaultWingdingsThreeVariant.decode
      : (value: string) => value,
  },
  "undertale-wingdings-translator": {
    slug: "undertale-wingdings-translator",
    name: "Undertale Wingdings Translator",
    shortName: "Undertale",
    title: "Undertale Wingdings Translator",
    metaTitle: "Undertale Wingdings Translator | W.D. Gaster Decoder",
    description:
      "Decode Undertale-style Wingdings messages, write Gaster-inspired text, and explore mystery-symbol translation through an Undertale-focused lens.",
    metaDescription:
      "The ultimate Undertale Wingdings translator. Decode W.D. Gaster-inspired messages and translate English into mysterious Undertale-style Wingdings text.",
    h1: "Undertale Wingdings Translator (Gaster Font)",
    placeholder: "Type plain English or paste Undertale-style symbols...",
    sampleInput: "entry number seventeen",
    sampleOutputLabel: "Undertale Wingdings output",
    supportsReverse: true,
    variantIds: ["gaster"],
    converterUi: {
      leftEyebrow: "Undertale",
      leftTitle: "Plain Text or Decoded Lore Text",
      leftDescriptionEncode:
        "Type a line here to generate Undertale-flavored mystery symbols inspired by Gaster fan usage.",
      leftDescriptionDecode:
        "Decoded English appears here while you paste Gaster-style symbols on the right.",
      rightEyebrow: "Gaster",
      rightTitle: "Undertale Wingdings Symbols",
      rightPlaceholder: "Paste Undertale or Gaster-style symbols here...",
      rightDescriptionEncode:
        "Use this output for fan projects, lore posts, puzzle practice, or stylized Undertale messages.",
      rightDescriptionDecode:
        "Paste a mystery string here to see whether it decodes cleanly as Undertale-style Gaster text.",
    },
    keywords: [
      "undertale wingdings translator",
      "wingdings gaster translator",
      "wingdings translator gaster",
      "wingdings translator undertale",
      "wing ding translator gaster",
    ],
    intro: [
      "This page targets the fandom-heavy query set around Undertale Wingdings, W.D. Gaster, and mystery text decoding.",
      "Under the hood it uses the Gaster-friendly preset, but the copy, examples, and FAQs are shaped around Undertale search intent rather than generic symbol translation.",
    ],
    sections: [
      {
        title: "Why Undertale deserves its own landing page",
        body: [
          "Undertale searchers are not always looking for a neutral font converter. Many of them want a page that immediately signals Gaster, Entry Number Seventeen, hidden messages, and fandom decoding context.",
          "A dedicated page makes that intent match explicit instead of forcing all of that traffic through a generic translator page.",
        ],
      },
      {
        title: "How this differs from the regular Gaster translator",
        body: [
          "The regular Gaster translator is still the more neutral tool page. This Undertale page is the fandom wrapper around the same core preset, tuned for lore language and Undertale-specific search demand.",
          "That means it is better for users who search from game context first and tool intent second.",
        ],
      },
      {
        title: "Best use cases for this page",
        body: [
          "Use it to decode fan-made Gaster messages, write stylized Undertale posts, practice mystery text, or compare how a phrase looks in a Gaster-inspired symbol set.",
          "It also works well as the bridge page between Undertale lore content and direct interactive translation.",
        ],
      },
    ],
    faq: [
      {
        question: "Is this the same as a Gaster translator?",
        answer:
          "Mostly yes under the hood, but this page is framed specifically for Undertale and W.D. Gaster search intent rather than generic symbol conversion alone.",
      },
      {
        question: "Can I decode Undertale Wingdings back into English?",
        answer:
          "Yes. Paste the symbol string into the tool and the page will decode it using the Gaster-friendly preset.",
      },
      {
        question: "Does this use the one official canonical Gaster alphabet?",
        answer:
          "No single fan mapping is universal. This page uses a clear Gaster-style preset that works well for translation and lore-inspired copy-paste workflows.",
      },
      {
        question: "Why mention Entry Number 17 and other lore terms here?",
        answer:
          "Because Undertale fans often arrive through lore searches first, and those references help align the page with the fandom context behind the query.",
      },
    ],
    relatedSlugs: [
      "gaster-translator",
      "gaster-alphabet-translator",
      "wingdings-decoder",
      "wingdings",
    ],
    encode: defaultGasterVariant ? defaultGasterVariant.encode : (value: string) => value,
    decode: defaultGasterVariant ? defaultGasterVariant.decode : (value: string) => value,
  },
  "gaster-translator": {
    slug: "gaster-translator",
    name: "Gaster Translator",
    shortName: "Gaster",
    title: "Gaster Translator",
    metaTitle: "Gaster Translator | Decode Gaster Alphabet to English",
    description:
      "Convert plain text into Gaster-style symbols and decode mystery strings back into readable English with a fandom-friendly preset.",
    metaDescription:
      "Use this Gaster translator to turn English into Gaster-style symbols, decode mystery strings, and test puzzle text with a fandom-friendly preset.",
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
      "This page is built for visitors who specifically want a Gaster translator for quick mystery-text conversion, not a broad symbol comparison interface.",
      "It is the best fit when your intent is playful encoding, reverse decoding, or puzzle-style experimentation with a Gaster-friendly symbol set.",
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
        title: "When to use this translator page",
        body: [
          "Use this page if your main goal is to write or decode Gaster-style messages quickly and you do not need lots of surrounding reference material.",
          "For broader symbol comparisons, the main Wingdings page is still the best hub because it includes multiple presets and a full mapping reference.",
        ],
      },
      {
        title: "Translator versus alphabet reference",
        body: [
          "This page is optimized as an interactive translator. It focuses on immediate conversion, not on teaching the letter table in detail.",
          "If your intent is closer to a decrypter, glossary, or alphabet reference, the Gaster Alphabet Translator page will fit better.",
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
      {
        question: "Is this page better for making messages than studying the alphabet?",
        answer:
          "Yes. This page is designed around quick translation workflows. If you want a more reference-oriented Gaster page, use the Gaster Alphabet Translator.",
      },
    ],
    relatedSlugs: [
      "undertale-wingdings-translator",
      "gaster-alphabet-translator",
      "wingdings",
      "webdings-translator",
    ],
    encode: defaultGasterVariant ? defaultGasterVariant.encode : (value: string) => value,
    decode: defaultGasterVariant ? defaultGasterVariant.decode : (value: string) => value,
  },
  "gaster-alphabet-translator": {
    slug: "gaster-alphabet-translator",
    name: "Gaster Alphabet Translator",
    shortName: "Gaster Alphabet",
    title: "Gaster Alphabet Translator",
    metaTitle: "Gaster Alphabet Translator | Decode Gaster Font to English",
    description:
      "Decode Gaster alphabet strings, study the letter mapping, and convert English into Gaster-style symbols with a focused decrypter workflow.",
    metaDescription:
      "Use the Gaster Alphabet Translator to decode Gaster font messages, study the symbol alphabet, and turn English into Gaster-style output instantly.",
    h1: "Gaster Alphabet Translator",
    placeholder: "Paste a Gaster-style message or type English here...",
    sampleInput: "hidden signal",
    sampleOutputLabel: "Gaster alphabet output",
    supportsReverse: true,
    variantIds: ["gaster"],
    keywords: [
      "gaster alphabet translator",
      "gaster font translator",
      "wd gaster alphabet decrypter",
      "gaster alphabet to english",
    ],
    intro: [
      "This page is designed for the narrower search intent around Gaster alphabet translation, decoding, and letter-by-letter decrypter use.",
      "It keeps the Gaster preset front and center for users who want to study the symbol alphabet as much as they want to translate it.",
    ],
    sections: [
      {
        title: "Why this page exists separately",
        body: [
          "Many users search specifically for Gaster alphabet, Gaster font translator, or W.D. Gaster decrypter instead of broader Wingdings terms.",
          "A dedicated page lets the title, H1, examples, FAQ, and long-tail copy all align with that specific search intent.",
        ],
      },
      {
        title: "Best use cases for an alphabet page",
        body: [
          "This page is best for users searching terms like gaster alphabet translator, gaster font translator, or W.D. Gaster alphabet decrypter.",
          "It works well when you want to inspect mappings, decode messages carefully, or move between reference reading and actual translation.",
        ],
      },
      {
        title: "How it differs from the Gaster Translator",
        body: [
          "The Gaster Translator page is more action-oriented and better for fast message conversion.",
          "This alphabet page is more reference-oriented and better when your intent is to learn, inspect, or decode the symbol table itself.",
        ],
      },
    ],
    faq: [
      {
        question: "Can I decode Gaster symbols into English?",
        answer:
          "Yes. Paste the symbol string into the symbol panel and the matching English letters will appear in the plain-text panel.",
      },
      {
        question: "Is the Gaster alphabet officially standardized?",
        answer:
          "No single table is used everywhere. This page uses a clear Gaster-friendly preset that is useful for decoding and copy-paste workflows.",
      },
      {
        question: "What should I do if the message still does not decode?",
        answer:
          "The most likely reason is that the original message used another Wingdings-style mapping or a custom fan-made alphabet. In that case, compare against the main Wingdings hub.",
      },
      {
        question: "Should I use this page or the Gaster Translator page?",
        answer:
          "Use this page if you are approaching the problem like an alphabet reference or decrypter. Use the Gaster Translator page if you mainly want fast two-way conversion.",
      },
    ],
    relatedSlugs: [
      "undertale-wingdings-translator",
      "gaster-translator",
      "wingdings",
      "webdings-translator",
    ],
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
      "Convert plain text into Webdings-style icon output for desktop-like symbols, object-heavy strings, and quick reverse decoding.",
    metaDescription:
      "Translate plain text into Webdings-style symbols and icon output you can copy, compare, decode, and use in icon-heavy creative workflows.",
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
      "Webdings sits close to Wingdings in search intent, but many visitors search it separately because they want an object- and icon-heavy symbol set.",
      "This page provides a dedicated Webdings workflow for users who care more about desktop-like icons than about puzzle-style symbol alphabets.",
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
      {
        title: "Why users search this separately",
        body: [
          "Some users are not trying to decode mystery text at all. They want interface-like icons, object symbols, and desktop-era pictograms.",
          "That is why a dedicated Webdings page can rank for its own intent instead of forcing icon-focused searches through a more general Wingdings hub.",
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
      {
        question: "Is Webdings better for icon-heavy text than classic Wingdings?",
        answer:
          "Often yes. Users who want a more object-centered look usually prefer Webdings-style output because it feels more pictographic and interface-oriented.",
      },
    ],
    relatedSlugs: ["wingdings", "gaster-translator", "subscript-generator"],
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

export function buildHowToSchema(tool: ToolConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use ${tool.name}`,
    totalTime: "PT1M",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Any browser or device",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Enter text or symbols",
        text: `Type or paste content into the ${tool.shortName} translator input panel.`,
      },
      {
        "@type": "HowToStep",
        name: "Review the converted output",
        text: "Use the available presets or output panel to compare the translated result.",
      },
      {
        "@type": "HowToStep",
        name: "Copy the final version",
        text: "Copy the translated text and paste it into your document, message, or profile.",
      },
    ],
  };
}
