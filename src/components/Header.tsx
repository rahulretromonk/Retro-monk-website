import React from 'react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="w-full bg-[#F4F0EA] pt-8 pb-4">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-8">
        <Link href="/" className="flex items-center">
          <span className="text-3xl font-serif text-[#333333] tracking-wide">
            RETRO MONK
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-xs font-semibold tracking-widest text-[#5A5A5A] uppercase">
          <Link href="/portfolio" className="hover:text-[#A05C3C] transition-colors pb-1">
            Portfolio
          </Link>
          <Link href="#gallery" className="hover:text-[#A05C3C] transition-colors pb-1">
            Gallery
          </Link>
          <Link href="#services" className="hover:text-[#A05C3C] transition-colors pb-1">
            Services
          </Link>
          <Link href="#about" className="hover:text-[#A05C3C] transition-colors pb-1">
            About
          </Link>
        </nav>
        <div className="hidden md:block">
          <Link href="#contact" className="text-xs font-semibold tracking-widest text-[#5A5A5A] hover:text-[#A05C3C] transition-colors uppercase">
            Contact
          </Link>
        </div>
      </div>
      <div className="w-full h-[1px] bg-black/5 mt-6"></div>
    </header>
  );
}
