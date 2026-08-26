"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Card data — local images from /public
const CARDS = [
  { src: "/hero-8.jpeg", alt: "Wedding photography" },
  { src: "/hero-6.jpeg", alt: "Portrait photography" },
  { src: "/hero-4.jpeg", alt: "Outdoor photography" },
  { src: "/hero-2.jpeg", alt: "Feature photography" },
  { src: "/hero-3.jpeg", alt: "Commercial photography" },
  { src: "/hero-7.jpeg", alt: "Event photography" },
  { src: "/hero-5.jpeg", alt: "Destination photography" },
];

const CENTER = 3;

// Precomputed fan positions — zero runtime cost per render
function buildFanStyle(index: number) {
  const off = index - CENTER;
  return {
    x: off * 140,
    y: Math.abs(off) * 35 + off * off * 5,
    rotate: off * 12,
    scale: index === CENTER ? 1.15 : 1 - Math.abs(off) * 0.05,
    opacity: 1,
  };
}
const FAN = CARDS.map((_, i) => buildFanStyle(i));

export function Hero() {
  const [ready, setReady] = useState(false);

  // Mobile carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Single-shot: reveal fan 300 ms after paint
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Auto-slide mobile
  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(() => setCurrentIndex((p) => (p + 1) % CARDS.length), 5000);
    return () => clearInterval(id);
  }, [isHovered]);

  const handleDragEnd = (_e: unknown, { offset, velocity }: { offset: { x: number }; velocity: { x: number } }) => {
    const power = Math.abs(offset.x) * velocity.x;
    if (power < -10000) setCurrentIndex((p) => (p + 1) % CARDS.length);
    else if (power > 10000) setCurrentIndex((p) => (p - 1 + CARDS.length) % CARDS.length);
  };

  return (
    // h-[100svh] + overflow-hidden = no scroll whatsoever
    <section className="relative flex flex-col items-center justify-start h-[100svh] max-h-[100svh] overflow-hidden bg-[#F4F0EA] pt-0 lg:pt-20">

      {/* ── DESKTOP: Animated Fan ──────────────────────────── */}
      <div className="hidden lg:flex relative w-full max-w-5xl h-[420px] justify-center items-start mt-6 z-10 flex-shrink-0">

        {CARDS.map((card, i) => {
          const isCenter = i === CENTER;
          return (
            <motion.div
              key={i}
              className="absolute top-0 rounded-2xl overflow-hidden shadow-2xl border border-white/20"
              style={{
                width: isCenter ? 240 : 200,
                height: isCenter ? 340 : 280,
                zIndex: CARDS.length - Math.abs(CENTER - i),
                willChange: "transform",
              }}
              initial={{ opacity: 0, y: 70, scale: 0.85, rotate: 0 }}
              animate={ready ? FAN[i] : { opacity: 0, y: 70, scale: 0.85, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
                delay: ready ? Math.abs(i - CENTER) * 0.06 : 0,
              }}
            >
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes={isCenter ? "240px" : "200px"}
                className="object-cover"
                priority={isCenter}
                quality={isCenter ? 85 : 60}
              />
              <div className="absolute inset-0 bg-black/8 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>

      {/* ── MOBILE / TABLET: Swipeable card ──────────────────── */}
      <div
        className="relative flex lg:hidden w-full h-[52svh] md:h-[400px] md:w-[75vw] mt-16 md:mt-10 rounded-2xl overflow-hidden shadow-xl flex-shrink-0 z-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            style={{ willChange: "opacity" }}
          >
            <Image
              src={CARDS[currentIndex].src}
              alt={CARDS[currentIndex].alt}
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              className="object-cover cursor-grab active:cursor-grabbing"
              priority={currentIndex === 0}
              quality={75}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* Owner badge overlay – mobile */}
        <div className="absolute bottom-14 left-4 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-xl px-3 py-2">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/50 flex-shrink-0">
            <Image src="/owner.jpeg" alt="Rahul Rajendran" fill sizes="32px" className="object-cover object-top" />
          </div>
          <div>
            <p className="text-white font-semibold text-xs leading-none">Rahul Rajendran</p>
            <p className="text-white/70 text-[10px] mt-0.5">Founder &amp; Lead Photographer</p>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center items-center gap-2.5 z-20">
          {CARDS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to image ${idx + 1}`}
              className={`rounded-full shadow transition-all duration-300 focus:outline-none ${
                idx === currentIndex ? "w-2.5 h-2.5 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Typography + CTAs ─────────────────────────────────── */}
      <motion.div
        className="relative z-10 text-center max-w-3xl px-6 flex flex-col items-center w-full mt-5 lg:mt-7 flex-shrink-0"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 24 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h1 className="text-3xl md:text-5xl lg:text-[4rem] leading-[1.1] font-serif mb-4 text-[#A05C3C]">
          Chennai-Based&nbsp;<br className="hidden sm:block" />Photography Studio
        </h1>
        <p className="hidden md:block text-[#8C6D5D] text-base lg:text-lg max-w-xl mx-auto mb-7 font-serif leading-relaxed">
          Wedding, Portrait &amp; Commercial Photography Across India
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 lg:gap-5 w-full max-w-sm sm:max-w-none">
          <Link
            href="/portfolio"
            className="inline-block text-center bg-[#2D3741] text-[#F4F0EA] text-sm font-semibold tracking-widest uppercase px-8 py-3.5 w-full sm:w-auto hover:bg-[#1E252C] transition-colors rounded-full shadow-md"
          >
            VIEW PHOTOGRAPHY PORTFOLIO
          </Link>
          <button className="bg-transparent border border-[#A05C3C] text-[#333333] text-sm font-semibold tracking-widest uppercase px-8 py-3.5 w-full sm:w-auto hover:bg-[#A05C3C]/8 transition-colors rounded-full">
            Check Availability
          </button>
        </div>
      </motion.div>
    </section>
  );
}
