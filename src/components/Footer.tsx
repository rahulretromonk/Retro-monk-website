import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-[#f5f2eb] pt-24 pb-8 px-6 md:px-12 lg:px-24 flex flex-col items-center border-t border-[#e8e4db] font-sans">
      
      {/* Brand & Tagline */}
      <h2 className="font-serif text-3xl md:text-4xl mb-4 text-[#3a3731] tracking-wide">
        RETROMONK
      </h2>
      <p className="font-serif text-[#6b675e] text-center max-w-lg mb-10 text-lg leading-relaxed">
        Capturing timeless stories through thoughtful<br className="hidden md:block" /> photography.
      </p>
      
      {/* Navigation */}
      <nav className="flex flex-wrap justify-center gap-6 md:gap-8 text-xs tracking-widest font-bold uppercase text-[#3a3731] mb-12">
        <Link href="/" className="hover:text-[#a88655] transition-colors">HOME</Link>
        <Link href="/portfolio" className="hover:text-[#a88655] transition-colors">PORTFOLIO</Link>
        <Link href="/#services" className="hover:text-[#a88655] transition-colors">SERVICES</Link>
        <Link href="/#about" className="hover:text-[#a88655] transition-colors">ABOUT</Link>
        <Link href="/#contact" className="border-b border-[#3a3731] pb-1 hover:text-[#a88655] hover:border-[#a88655] transition-colors">CONTACT</Link>
      </nav>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 mb-20 text-[#6b675e]">
        {/* Instagram */}
        <a href="https://www.instagram.com/retromonkstudio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:text-[#3a3731] transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeWidth="2"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" strokeLinecap="round"></line>
          </svg>
        </a>
        {/* Facebook */}
        <a href="#" className="hover:text-[#3a3731] transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </a>
        {/* LinkedIn */}
        <a href="#" className="hover:text-[#3a3731] transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <circle cx="4" cy="4" r="2" strokeWidth="2"></circle>
          </svg>
        </a>
        {/* WhatsApp */}
        <a href="https://wa.me/917395921835" target="_blank" rel="noopener noreferrer" className="hover:text-[#3a3731] transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.97 2.016A9.97 9.97 0 0 0 2 11.986c0 1.754.457 3.468 1.325 4.978L2 22l5.176-1.321A9.914 9.914 0 0 0 11.97 22c5.503 0 9.976-4.473 9.976-9.977a9.977 9.977 0 0 0-9.976-10.007zm0 18.232a8.212 8.212 0 0 1-4.184-1.144l-.3-.178-3.111.795.834-3.033-.195-.31a8.225 8.225 0 0 1-1.26-4.41c0-4.54 3.694-8.233 8.216-8.233a8.21 8.21 0 0 1 5.815 2.41 8.215 8.215 0 0 1 2.4 5.823c0 4.54-3.694 8.28-8.216 8.28z"/>
          </svg>
        </a>
      </div>

      {/* Bottom Bar */}
      <div className="w-full max-w-6xl border-t border-[#e8e4db] pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] md:text-sm font-serif text-[#6b675e]">
        <p>© 2026 RETRO MONK. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#3a3731] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#3a3731] transition-colors">Terms of Service</a>
        </div>
      </div>
      
    </footer>
  );
};
