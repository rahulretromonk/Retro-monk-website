"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

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
        <div className="hidden md:flex items-center gap-8">
          <Link href="#contact" className="text-xs font-semibold tracking-widest text-[#5A5A5A] hover:text-[#A05C3C] transition-colors uppercase">
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
      </div>
      <div className="w-full h-[1px] bg-black/5 mt-6"></div>
    </header>
  );
}
