import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { siteUrl } from "@/lib/textTools";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
    default: "Wingdings Translator ✌︎︎ Convert Text to Symbols (Copy & Paste)",
    template: "%s | Wingdings Translator",
  },
  description:
    "The most accurate Wingdings translator online. Convert English to Wingdings-style symbols, decode symbol strings, and explore Gaster alphabet references.",
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
    title: "Wingdings Translator ✌︎︎ Convert Text to Symbols (Copy & Paste)",
    description:
      "Convert plain text into wingdings-style symbols, decode icon strings, and browse related font tools from one authority-style hub.",
    url: siteUrl,
    siteName: "Wingdings Translator",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "Wingdings Translator and symbol converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wingdings Translator ✌︎︎ Convert Text to Symbols (Copy & Paste)",
    description:
      "Free Wingdings-style converter with reverse decoding, FAQ content, and related symbol tools.",
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
    logo: `${siteUrl}/icon-192x192.png`,
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-zinc-50 antialiased`}
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
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
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
          strategy="afterInteractive"
        />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
