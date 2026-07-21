import React from 'react';
import Link from 'next/link';

export const PortfolioFooter = () => {
  return (
    <footer className="bg-[#2a2a2a] text-white pt-24 pb-8 px-6 md:px-12 lg:px-24 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-16">
        
        {/* Brand Section */}
        <div className="md:w-1/3">
          <h2 className="text-2xl font-serif mb-6 tracking-wide text-white">
            Pixelate
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam
          </p>
          <div className="flex gap-6 text-gray-400">
            {/* Social Icons */}
            <a href="#" className="hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeWidth="2"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" strokeLinecap="round"></line>
              </svg>
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M21.2 11.2c0-5-4.1-9.2-9.2-9.2S2.8 6.2 2.8 11.2c0 3.9 2.5 7.2 6 8.5-.1-1-.1-2.4 0-3.4.2-.9 1.2-5.1 1.2-5.1s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.8 0 1.2.6 1.2 1.3 0 .8-.5 2-.8 3.1-.2.9.5 1.6 1.4 1.6 1.6 0 2.9-1.7 2.9-4.2 0-2.2-1.6-3.7-3.8-3.7-2.6 0-4.1 1.9-4.1 3.9 0 .8.3 1.6.7 2.1.1.1.1.2.1.3-.1.4-.3 1.1-.3 1.3 0 .2-.1.2-.3.1-1.3-.6-2.1-2.4-2.1-3.9 0-3.2 2.3-6.1 6.7-6.1 3.5 0 6.3 2.5 6.3 5.9 0 3.5-2.2 6.3-5.3 6.3-1 0-2-.5-2.3-1.2l-.6 2.4c-.2.8-.8 1.9-1.2 2.5a9.2 9.2 0 004 .9c5 0 9.2-4.1 9.2-9.2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:w-1/6">
          <h3 className="text-lg font-serif mb-6">Quick Links</h3>
          <ul className="flex flex-col gap-3 text-sm text-gray-400">
            <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
            <li><Link href="/#about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/#services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:w-1/4">
          <h3 className="text-lg font-serif mb-6">Contact</h3>
          <ul className="flex flex-col gap-4 text-sm text-gray-400">
            <li className="flex gap-3">
              <span className="text-[#A05C3C]">📞</span>
              <span>+012 345 6789</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#A05C3C]">📍</span>
              <span>1234 Oxford Dr, Auburn, NY 13021</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#A05C3C]">✉️</span>
              <span>info@pixelate.com</span>
            </li>
          </ul>
        </div>

        {/* Recent Works Gallery Snippet */}
        <div className="md:w-1/4">
          <h3 className="text-lg font-serif mb-6">Recent Works</h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-gray-700 overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=200&h=200&sig=${i}`} 
                  alt={`Recent work ${i}`}
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="w-full max-w-6xl border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500">
        <p>Copyright © 2026 Pixelate. All Rights Reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Legal</a>
        </div>
      </div>
    </footer>
  );
};
