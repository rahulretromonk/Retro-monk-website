import React from 'react';
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
