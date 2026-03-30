import type { Metadata } from "next";
import ArticlePage from "@/components/content/ArticlePage";
import { siteUrl } from "@/lib/textTools";

const pageUrl = `${siteUrl}/gaster-language`;

export const metadata: Metadata = {
  title: {
    absolute: "What is the Gaster Language? Undertale Mystery Text Guide",
  },
  description:
    "Learn everything about the Gaster language from Undertale. Discover the meaning behind W.D. Gaster's mystery text, the symbol style associated with it, and how to decode it.",
  keywords: [
    "gaster language",
    "gaster text",
    "what font does gaster use",
    "undertale gaster symbols",
    "gaster alphabet meaning",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "What is the Gaster Language? Undertale Mystery Text Guide",
    description:
      "Understand the Undertale lore around Gaster text, the symbol style fans connect to it, and how to decode messages.",
    url: pageUrl,
    siteName: "Wingdings Translator",
    type: "article",
  },
};

export default function GasterLanguagePage() {
  const breadcrumbs = [
    { name: "Wingdings Translator", url: siteUrl },
    { name: "Gaster Language", url: pageUrl },
  ];

  return (
    <ArticlePage
      title="The Gaster Language: Undertale's Mystery Text Explained"
      intro="The phrase Gaster language usually refers to the mysterious symbol-heavy writing style fans associate with W.D. Gaster in Undertale. Most searchers are not looking for a generic font page. They want the lore context, the symbol connection, and a practical way to decode or recreate the effect."
      breadcrumbs={breadcrumbs}
      articleUrl={pageUrl}
      relatedSlugs={["gaster-translator", "gaster-alphabet-translator", "wingdings"]}
      sections={[
        {
          title: "Who is W.D. Gaster?",
          body: [
            "W.D. Gaster is one of Undertale's most mysterious characters, referenced through hidden dialogue, fragmented clues, and strange in-game moments rather than through a normal story path.",
            "That scarcity is exactly why fans search for Gaster language, Gaster text, and related symbol guides so often. The mystery is part of the appeal.",
          ],
        },
        {
          title: "What font or symbol style is Gaster associated with?",
          body: [
            "Fans commonly connect Gaster with Wingdings-style symbols, especially in all-caps mystery text and puzzle-like messages.",
            "In practice, modern translator pages often publish simplified A-Z mapping tables inspired by that association rather than reproducing one perfectly canonical in-game system.",
          ],
        },
        {
          title: "Why search results feel confusing",
          body: [
            "Some pages focus on Undertale lore, while others offer direct conversion tools. That mix creates a mismatch between informational intent and tool intent.",
            "If you came here because you wanted the background first, the short answer is that Gaster language is best understood as a fandom-linked symbol convention tied to Wingdings-style writing, not a universally standardized spoken language.",
          ],
        },
        {
          title: "A famous example: Entry Number Seventeen",
          body: [
            "Many fans first encounter Gaster text through references to Entry Number Seventeen and other fragmented clues that reinforce the character's unsettling, hidden presence.",
            "Those examples matter because they train users to think of Gaster writing as something to decode, imitate, and compare rather than something to read as a normal alphabet lesson.",
          ],
        },
        {
          title: "How to write your own Gaster-style message",
          body: [
            "If your goal is to create a message in the same visual spirit, use a Gaster-style or Wingdings-friendly translator and test the output in the place where you plan to share it.",
            "For best results, keep the message short, compare presets, and verify the final appearance on both desktop and mobile before treating one version as final.",
          ],
        },
      ]}
    />
  );
}
