import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { siteUrl } from "@/lib/textTools";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: {
    default: "Wingdings Translator - Convert Wingdings to English Fast",
    template: "%s | Wingdings Translator",
  },
  description:
    "Free online Wingdings translator. Decode symbols to English or convert text to Wingdings instantly. Easy copy & paste for Gaster font and social media.",
  keywords: [
    "wingdings translator",
    "wingdings to english",
    "english to wingdings",
    "gaster alphabet",
    "subscript generator",
    "cursive generator",
    "old english translator",
  ],
  metadataBase: new URL(siteUrl),
  manifest: "/manifest.json",
  other: {
    "google-adsense-account": "ca-pub-2499950673294937",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Wingdings Translator | Convert Wingdings to English",
    description:
      "Instant Wingdings conversion and reverse decoding with copy-paste output, preset comparisons, and no download required.",
    url: siteUrl,
    siteName: "Wingdings Translator",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "Decode the mystery with Wingdings Translator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wingdings Translator | Convert Wingdings to English",
    description:
      "Decode Wingdings instantly, convert English to symbols, and copy results without downloading anything.",
    images: [`${siteUrl}/og-image.svg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Wingdings Translator",
    url: siteUrl,
    inLanguage: ["en"],
    description:
      "Authority-style resource for Wingdings translation, symbol conversion, and related copy-paste text tools.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?text={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Wingdings Translator",
    url: siteUrl,
    logo: `${siteUrl}/brand-mark.svg`,
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} bg-zinc-50 antialiased`}
      >
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YJ66WXDZ98"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YJ66WXDZ98');
          `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2499950673294937"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
