import React from 'react';

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
        <a href="#" className="hover:text-[#a88655] transition-colors">HOME</a>
        <a href="#" className="hover:text-[#a88655] transition-colors">ABOUT</a>
        <a href="#" className="hover:text-[#a88655] transition-colors">PORTFOLIO</a>
        <a href="#" className="hover:text-[#a88655] transition-colors">SERVICES</a>
        <a href="#" className="border-b border-[#3a3731] pb-1 hover:text-[#a88655] hover:border-[#a88655] transition-colors">CONTACT</a>
      </nav>

      {/* Social Icons */}
      <div className="flex gap-6 mb-20 text-[#6b675e]">
        {/* Instagram */}
        <a href="#" className="hover:text-[#3a3731] transition-colors">
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
        {/* Pinterest */}
        <a href="#" className="hover:text-[#3a3731] transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M21.2 11.2c0-5-4.1-9.2-9.2-9.2S2.8 6.2 2.8 11.2c0 3.9 2.5 7.2 6 8.5-.1-1-.1-2.4 0-3.4.2-.9 1.2-5.1 1.2-5.1s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.8 0 1.2.6 1.2 1.3 0 .8-.5 2-.8 3.1-.2.9.5 1.6 1.4 1.6 1.6 0 2.9-1.7 2.9-4.2 0-2.2-1.6-3.7-3.8-3.7-2.6 0-4.1 1.9-4.1 3.9 0 .8.3 1.6.7 2.1.1.1.1.2.1.3-.1.4-.3 1.1-.3 1.3 0 .2-.1.2-.3.1-1.3-.6-2.1-2.4-2.1-3.9 0-3.2 2.3-6.1 6.7-6.1 3.5 0 6.3 2.5 6.3 5.9 0 3.5-2.2 6.3-5.3 6.3-1 0-2-.5-2.3-1.2l-.6 2.4c-.2.8-.8 1.9-1.2 2.5a9.2 9.2 0 004 .9c5 0 9.2-4.1 9.2-9.2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </a>
        {/* LinkedIn */}
        <a href="#" className="hover:text-[#3a3731] transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <circle cx="4" cy="4" r="2" strokeWidth="2"></circle>
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
