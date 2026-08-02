import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lakshya Agarwal | Creative AI Engineer",
  description: "High-end scrollytelling personal portfolio",
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
