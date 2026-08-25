import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Photography Portfolio | Retro Monk Studio",
  description: "Explore the photography portfolio of Retro Monk Studio. View our curated collection of wedding, portrait, and commercial photography from 50+ projects across India.",
  alternates: {
    canonical: "https://retromonkstudio.com/portfolio",
  },
  openGraph: {
    title: "Photography Portfolio | Retro Monk Studio",
    description: "Explore the photography portfolio of Retro Monk Studio. View our curated collection of wedding, portrait, and commercial photography from 50+ projects across India.",
    url: "https://retromonkstudio.com/portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photography Portfolio | Retro Monk Studio",
    description: "Explore the photography portfolio of Retro Monk Studio. View our curated collection of wedding, portrait, and commercial photography from 50+ projects across India.",
  },
};
import { PortfolioHero } from '@/components/portfolio-page/PortfolioHero';
import { PortfolioGallery } from '@/components/portfolio-page/PortfolioGallery';
import { Footer } from '@/components/Footer';

export default function PortfolioPage() {
  return (
    <div className="flex flex-col w-full">
      <PortfolioHero />
      <PortfolioGallery />
      <Footer />
    </div>
  );
}
