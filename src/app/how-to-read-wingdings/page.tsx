import type { Metadata } from "next";
import ArticlePage from "@/components/content/ArticlePage";
import { siteUrl } from "@/lib/textTools";

const pageUrl = `${siteUrl}/how-to-read-wingdings`;

export const metadata: Metadata = {
  title: "How to Read Wingdings",
  description:
    "A practical guide to recognizing Wingdings symbol families, choosing the right preset, and decoding messages back into English.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "How to Read Wingdings",
    description:
      "Learn how to identify symbol families and decode Wingdings-style messages back into readable English.",
    url: pageUrl,
    siteName: "Wingdings Translator",
    type: "article",
  },
};

export default function HowToReadWingdingsPage() {
  const breadcrumbs = [
    { name: "Wingdings Translator", url: siteUrl },
    { name: "How to Read Wingdings", url: pageUrl },
  ];

  return (
    <ArticlePage
      title="How to Read Wingdings"
      intro="Reading Wingdings starts with pattern recognition. The fastest way to decode a symbol string is to identify the symbol family first, then test the matching preset rather than assuming every site uses the same alphabet."
      breadcrumbs={breadcrumbs}
      articleUrl={pageUrl}
      sections={[
        {
          title: "Look for repeated symbol patterns",
          body: [
            "Repeated hands, arrows, circles, and squares usually mean you are dealing with a Wingdings-style alphabet rather than random decorative symbols.",
            "Once you spot repetition, test the string against Classic Wingdings, Gaster, Wingdings 2, Wingdings 3, and Webdings-style presets until readable English begins to appear.",
          ],
        },
        {
          title: "Do not assume every translator uses the same table",
          body: [
            "Many websites simplify or remix mappings for copy-paste convenience, which is why one Wingdings translator can produce a different result from another.",
            "That is also why a comparison table and reverse-translation workflow matter for users who are solving puzzle text or reading fandom messages.",
          ],
        },
        {
          title: "Use reverse translation intentionally",
          body: [
            "If you paste symbols into the symbol panel, the plain-text panel can decode them in real time as long as you are on the matching preset.",
            "If the output still looks wrong, switch presets before assuming the message is nonsense.",
          ],
        },
      ]}
    />
  );
}
