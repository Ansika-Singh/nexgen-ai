import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexgen-ai.vercel.app"),
  title: "NexGen AI — Automate Your Data Pipeline at Machine Speed",
  description:
    "NexGen AI is an advanced AI-driven data automation platform that orchestrates, transforms, and deploys enterprise workflows with sub-second latency and zero-config intelligence.",
  keywords: [
    "AI automation",
    "data pipeline",
    "enterprise AI",
    "workflow automation",
    "machine learning platform",
    "data orchestration",
    "AI platform",
    "data automation",
  ],
  authors: [{ name: "NexGen AI" }],
  creator: "NexGen AI",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nexgen-ai.vercel.app",
    siteName: "NexGen AI",
    title: "NexGen AI — Automate Your Data Pipeline at Machine Speed",
    description:
      "Advanced AI-driven data automation. Orchestrate, transform, and deploy enterprise workflows with sub-second latency.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NexGen AI — AI-driven data automation platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexGen AI — Automate Your Data Pipeline",
    description:
      "Advanced AI-driven data automation platform. Sub-second latency, zero-config intelligence.",
    images: ["/og-image.png"],
    creator: "@nexgenai",
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
  alternates: {
    canonical: "https://nexgen-ai.vercel.app",
  },
};

export const viewport = {
  themeColor: "#0d1e24",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Fonts as per fonts.pdf: JetBrains Mono (headers/code) + Inter (body/UI) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://nexgen-ai.vercel.app" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="color-scheme" content="dark" />
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "NexGen AI",
              "applicationCategory": "BusinessApplication",
              "description": "Advanced AI-driven data automation platform",
              "url": "https://nexgen-ai.vercel.app",
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "USD",
                "lowPrice": "0",
                "highPrice": "199",
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
