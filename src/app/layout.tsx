import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lakshya Agarwal | Creative AI Engineer",
  description: "Creative AI Engineer & High-End Scrollytelling Portfolio",
  metadataBase: new URL("https://lakshya.uk"),
  manifest: "/site.webmanifest",
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
    description: "Creative AI Engineer & High-End Scrollytelling Portfolio",
    url: "https://lakshya.uk",
    siteName: "Lakshya Agarwal",
    images: [
      {
        url: "/emblem.png",
        width: 1024,
        height: 1024,
        alt: "Lakshya Agarwal - LK Monogram",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lakshya Agarwal | Creative AI Engineer",
    description: "Creative AI Engineer & High-End Scrollytelling Portfolio",
    images: ["/emblem.png"],
  },
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
      <body className={`${inter.className} antialiased bg-[#121212] text-white`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
