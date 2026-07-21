"use client";
import React from 'react';
import Link from 'next/link';

export const PortfolioHero = () => {
  return (
    <div className="relative w-full h-[600px] md:h-[800px] bg-[#111111] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-right"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200")',
          opacity: 0.5
        }}
      ></div>

      {/* Header / Navbar Overlay */}
      <header className="relative z-10 w-full pt-8 pb-4 flex justify-between items-center px-8 md:px-16 lg:px-24">
        <Link href="/" className="flex items-center text-white">
          <span className="text-2xl font-serif tracking-wide">
            Pixelate
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-xs font-semibold tracking-widest text-white uppercase">
          <Link href="/" className="hover:text-[#A05C3C] transition-colors pb-1">
            Home
          </Link>
          <Link href="/#about" className="hover:text-[#A05C3C] transition-colors pb-1">
            About
          </Link>
          <Link href="/portfolio" className="text-[#A05C3C] pb-1">
            Portfolio
          </Link>
          <Link href="/#services" className="hover:text-[#A05C3C] transition-colors pb-1">
            Services
          </Link>
          <Link href="/#contact" className="hover:text-[#A05C3C] transition-colors pb-1">
            Contact
          </Link>
        </nav>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center px-8 md:px-16 lg:px-24">
        <div className="max-w-xl text-white">
          <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-6">
            Creating Photos <br />
            With Beautiful <br />
            Moments
          </h1>
          <p className="text-sm md:text-base text-gray-400 mb-10 leading-relaxed font-sans max-w-md">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
            doloremque laudantium totam rem aperiam
          </p>
          <button className="bg-[#A05C3C] hover:bg-[#8a4e32] text-white text-xs tracking-widest uppercase py-4 px-8 font-semibold transition-colors flex items-center gap-2">
            View Portfolio <span className="text-lg leading-none">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
