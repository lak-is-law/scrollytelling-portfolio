import type { Metadata, Viewport } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const viewport: Viewport = {
  themeColor: "#07090e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Lakshya Agarwal | Creative AI Engineer",
  description: "Explore the portfolio of Lakshya Agarwal, Creative AI Engineer & Full Stack Architect specializing in interactive 3D, neural AI systems, and high-end web experiences.",
  metadataBase: new URL("https://lakshya.uk"),
  alternates: {
    canonical: "https://lakshya.uk",
  },
  manifest: "/site.webmanifest",
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Lakshya Agarwal | Creative AI Engineer",
    description: "Explore the portfolio of Lakshya Agarwal, Creative AI Engineer & Full Stack Architect specializing in interactive 3D, neural AI systems, and high-end web experiences.",
    url: "https://lakshya.uk",
    siteName: "Lakshya Agarwal",
    images: [
      {
        url: "https://lakshya.uk/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Lakshya Agarwal - Creative AI Engineer & Full Stack Architect",
        type: "image/png",
      },
      {
        url: "https://lakshya.uk/emblem.png",
        width: 1024,
        height: 1024,
        alt: "Lakshya Agarwal - LK Monogram",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lakshya Agarwal | Creative AI Engineer",
    description: "Explore the portfolio of Lakshya Agarwal, Creative AI Engineer & Full Stack Architect specializing in interactive 3D, neural AI systems, and high-end web experiences.",
    images: ["https://lakshya.uk/opengraph-image"],
    creator: "@lakshya_success",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://lakshya.uk/#person",
      name: "Lakshya Agarwal",
      url: "https://lakshya.uk",
      jobTitle: "Creative AI Engineer & Full Stack Architect",
      sameAs: [
        "https://github.com/lak-is-law",
        "https://linkedin.com/in/lakshya-success"
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Deep Learning",
        "Next.js",
        "TypeScript",
        "Computer Graphics",
        "Distributed Systems"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://lakshya.uk/#website",
      url: "https://lakshya.uk",
      name: "Lakshya Agarwal Portfolio",
      publisher: {
        "@id": "https://lakshya.uk/#person"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem("portfolio_theme") === "gold") {
                  document.documentElement.classList.add("gold-theme");
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-[#07090e] text-white selection:bg-cyan-500/30 selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-cyan-400 focus:text-black focus:font-mono focus:text-xs focus:font-bold focus:rounded-full focus:shadow-xl focus:outline-none"
        >
          Skip to main content
        </a>
        <CustomCursor />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
