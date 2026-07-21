import React from 'react';
import { PortfolioHero } from '@/components/portfolio-page/PortfolioHero';
import { PortfolioGallery } from '@/components/portfolio-page/PortfolioGallery';
import { PortfolioFooter } from '@/components/portfolio-page/PortfolioFooter';

export default function PortfolioPage() {
  return (
    <div className="flex flex-col w-full">
      <PortfolioHero />
      <PortfolioGallery />
      <PortfolioFooter />
    </div>
  );
}
