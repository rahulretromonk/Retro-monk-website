"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
          if (payload && payload.email) {
            setUser({
              email: payload.email,
              name: payload.email.split('@')[0]
            });
          }
        }
      } catch (err) {
        console.error("Error decoding header token:", err);
      }
    }
  }, []);

  const isAdmin = user?.email?.toLowerCase() === 'retromonk.office@gmail.com' || user?.email?.toLowerCase() === 'admin@archivalstudio.com';

  const navLinks = [
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/#services' },
    { name: 'About', href: '/#about' },
     { name: 'FAQ', href: '/#faq' },
  ];

  return (
    <header className="w-full absolute md:sticky top-0 z-[100] bg-transparent md:bg-[#F4F0EA] md:shadow-sm pt-6 pb-4">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-8 relative">
        <Link href="/" className="flex items-center absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 z-10">
          <img 
            src="/llooggoo.png" 
            alt="Retro Monk" 
            className="h-10 md:h-12 w-auto object-contain brightness-0 invert md:brightness-100 md:invert-0" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-xs font-semibold tracking-widest text-[#5A5A5A] uppercase">
          {navLinks.slice(0, 4).map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-[#A05C3C] transition-colors pb-1">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#contact" className="text-xs font-semibold tracking-widest text-[#5A5A5A] hover:text-[#A05C3C] transition-colors uppercase">
            Contact
          </Link>
          
          {user ? (
            isAdmin ? (
              <Link 
                href="/admin" 
                className="text-xs font-black tracking-widest text-[#355C4A] hover:text-[#A05C3C] transition-colors uppercase border border-[#355C4A]/30 px-4 py-1.5 rounded-full bg-[#355C4A]/5"
              >
                Admin Page
              </Link>
            ) : (
              <span className="text-xs font-bold tracking-widest text-[#7A5848] uppercase">
                Hello, {user.name}
              </span>
            )
          ) : (
            <Link 
              href="/admin/login" 
              className="text-xs font-semibold tracking-widest text-[#5A5A5A] hover:text-[#A05C3C] transition-colors uppercase"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden p-2 text-white md:text-[#5A5A5A] hover:text-gray-200 md:hover:text-[#A05C3C] transition-colors ml-auto z-10 drop-shadow-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#F4F0EA] border-t border-black/5 shadow-md flex flex-col py-6 px-6 gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-semibold tracking-widest text-[#5A5A5A] hover:text-[#A05C3C] transition-colors uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="w-full h-[1px] bg-black/5 my-2"></div>
          {user ? (
            isAdmin ? (
              <Link 
                href="/admin" 
                className="text-sm font-black tracking-widest text-[#355C4A] hover:text-[#A05C3C] transition-colors uppercase"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Page
              </Link>
            ) : (
              <span className="text-sm font-bold tracking-widest text-[#7A5848] uppercase">
                Hello, {user.name}
              </span>
            )
          ) : (
            <Link 
              href="/admin/login" 
              className="text-sm font-semibold tracking-widest text-[#5A5A5A] hover:text-[#A05C3C] transition-colors uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
