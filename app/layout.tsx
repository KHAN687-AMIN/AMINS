import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammadaminkhan.dev"),
  title: "Muhammad Amin Khan — Full-Stack Developer",
  description:
    "Muhammad Amin Khan is a full-stack developer creating modern digital products, interactive web experiences and premium interfaces.",
  keywords: [
    "Muhammad Amin Khan",
    "Full-Stack Developer",
    "Creative Frontend Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Three.js",
    "Digital Experiences",
  ],
  authors: [{ name: "Muhammad Amin Khan" }],
  creator: "Muhammad Amin Khan",
  openGraph: {
    title: "Muhammad Amin Khan — Full-Stack Developer",
    description:
      "Creating modern digital products, interactive web experiences and premium interfaces.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Amin Khan — Full-Stack Developer",
    description:
      "Creating modern digital products, interactive web experiences and premium interfaces.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${sans.variable} font-sans grain`}
      >
        {children}
      </body>
    </html>
  );
}
