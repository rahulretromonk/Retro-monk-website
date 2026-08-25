import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Retro Monk Studio | Professional Photography | Chennai & India-wide",
  description: "Retro Monk Studio is a Chennai-based photography studio providing wedding, portrait, and commercial photography services across India.",
  alternates: {
    canonical: "https://retromonkstudio.com/",
  },
  openGraph: {
    title: "Retro Monk Studio | Professional Photography | Chennai & India-wide",
    description: "Retro Monk Studio is a Chennai-based photography studio providing wedding, portrait, and commercial photography services across India.",
    url: "https://retromonkstudio.com/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retro Monk Studio | Professional Photography | Chennai & India-wide",
    description: "Retro Monk Studio is a Chennai-based photography studio providing wedding, portrait, and commercial photography services across India.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F3EC] text-[#2D2D2D] font-sans selection:bg-[#7A5848]/30">
        {children}
      </body>
    </html>
  );
}
