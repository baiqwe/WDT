import type { Metadata } from "next";
import ArticlePage from "@/components/content/ArticlePage";
import { siteUrl } from "@/lib/textTools";

const pageUrl = `${siteUrl}/wingdings-font`;

export const metadata: Metadata = {
  title: {
    absolute: "Wingdings Font Guide: How to Type & Use Symbols",
  },
  description:
    "A complete guide to the Wingdings font. Learn how to type symbols on your keyboard, use them in Microsoft Word or Google Docs, and copy-paste alternatives online.",
  keywords: [
    "wingdings font",
    "how to type wingdings",
    "download wingdings font",
    "wingdings keyboard",
    "wingdings font in word",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Wingdings Font Guide: How to Type & Use Symbols",
    description:
      "Learn whether you need to download Wingdings, how typing works in editors, and when an online converter is the easier option.",
    url: pageUrl,
    siteName: "Wingdings Translator",
    type: "article",
  },
};

export default function WingdingsFontPage() {
  const breadcrumbs = [
    { name: "Wingdings Translator", url: siteUrl },
    { name: "Wingdings Font Guide", url: pageUrl },
  ];

  return (
    <ArticlePage
      title="Wingdings Font: Complete Guide & Usage Tutorial"
      intro="Users who search for Wingdings font usually want one of three things: to find out whether the font needs downloading, to understand how typing works in Word or Docs, or to avoid font setup entirely and use a browser-based converter instead."
      breadcrumbs={breadcrumbs}
      articleUrl={pageUrl}
      relatedSlugs={["wingdings", "english-to-wingdings", "webdings-translator"]}
      sections={[
        {
          title: "Do you need to download Wingdings?",
          body: [
            "In many desktop environments, Wingdings or closely related symbol fonts are already available, especially on systems and apps that include legacy Microsoft font support.",
            "That means many users do not actually need a separate font download. They mainly need to know where to switch the font and what result to expect when they type normal letters.",
          ],
        },
        {
          title: "How Wingdings typing works",
          body: [
            "Wingdings behaves like a symbol font, so you usually type standard keyboard characters and let the selected font transform them into pictographic symbols.",
            "This is why the same keys can look totally different depending on whether the text is displayed in a normal alphabet font or a legacy symbol font.",
          ],
        },
        {
          title: "Using Wingdings in Word or document editors",
          body: [
            "The normal workflow is simple: type your text, highlight it, switch the font to Wingdings, and then inspect whether the result matches the symbol style you wanted.",
            "If you are working in a shared document, test the display on the target device or export format because symbol rendering can vary by app, platform, and installed font support.",
          ],
        },
        {
          title: "What about Google Docs and web workflows?",
          body: [
            "Web-based editors do not always expose legacy symbol fonts in the same way desktop software does, which is one reason users search for online alternatives instead of font tutorials alone.",
            "If your main goal is to generate a symbol string quickly, an online converter is often faster and easier than depending on a specific local font setup.",
          ],
        },
        {
          title: "When an online converter is the better option",
          body: [
            "If you do not want to manage font menus, compatibility issues, or editor limitations, a browser-based Wingdings converter is the low-friction path.",
            "You can generate the text, compare presets, and copy the final result immediately without worrying about where the underlying font file lives.",
          ],
        },
      ]}
    />
  );
}
