"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const images = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop", // card 1 (leftmost)
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop", // card 2
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop", // card 3
  "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=600&auto=format&fit=crop", // card 4 (center)
  "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?q=80&w=600&auto=format&fit=crop", // card 5
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop", // card 6
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop", // card 7 (rightmost)
];

export function Hero() {
  const [stage, setStage] = useState(0);
  
  // Mobile Carousel states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  useEffect(() => {
    // Desktop Stage 0: Initial hidden state
    // Desktop Stage 1: Pop up linearly
    const t1 = setTimeout(() => setStage(1), 500);
    // Desktop Stage 2: Form semi-circle
    const t2 = setTimeout(() => setStage(2), 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Auto-slide for mobile/tablet
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const getCardStyle = (index: number, total: number) => {
    const isCenter = Math.floor(total / 2) === index;
    const offsetFromCenter = index - Math.floor(total / 2);
    
    // Positions for linear layout (stage 1)
    if (stage === 1) {
      return {
        x: offsetFromCenter * 110, // spaced out linearly
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
      };
    }

    // Positions for semi-circle layout (stage 2)
    if (stage === 2) {
      const angle = offsetFromCenter * 12; // degrees
      const radius = 600; // imaginary circle radius
      
      // Calculate x and y using trigonometry for a true arch
      const radian = (angle - 90) * (Math.PI / 180);
      const x = offsetFromCenter * 140; // horizontal spread
      
      // y-offset based on distance from center to create an arch
      const y = Math.abs(offsetFromCenter) * 35 + (offsetFromCenter * offsetFromCenter) * 5;

      return {
        x: x,
        y: y,
        rotate: angle,
        scale: index === 3 ? 1.15 : 1 - Math.abs(offsetFromCenter) * 0.05,
        opacity: 1,
      };
    }

    // Initial state (stage 0)
    return {
      x: offsetFromCenter * 110,
      y: 100,
      rotate: 0,
      scale: 0.8,
      opacity: 0,
    };
  };

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else if (swipe > swipeConfidenceThreshold) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center md:justify-start min-h-[100svh] pt-0 md:pt-16 lg:pt-24 px-0 md:px-4 overflow-hidden bg-black md:bg-[#F4F0EA]">
      
      {/* DESKTOP ONLY: Fan Cards Container */}
      <div className="hidden lg:flex relative w-full max-w-5xl h-[450px] justify-center items-start mt-10 z-10">
        {images.map((src, index) => {
          const isCenter = index === 3;
          return (
            <motion.div
              key={index}
              className={`absolute top-0 rounded-2xl overflow-hidden shadow-2xl border border-white/20`}
              style={{
                width: isCenter ? '240px' : '200px',
                height: isCenter ? '340px' : '280px',
                zIndex: images.length - Math.abs(3 - index),
              }}
              initial={false}
              animate={getCardStyle(index, images.length)}
              transition={{
                duration: 0.8,
                type: "spring",
                bounce: 0.2,
                delay: stage === 1 ? index * 0.1 : 0,
              }}
            >
              <img
                src={src}
                alt={`Portfolio image ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index === 3 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
            </motion.div>
          );
        })}
      </div>

      {/* MOBILE/TABLET ONLY: Sliding Image Card */}
      <div 
        className="absolute md:relative inset-0 md:inset-auto flex lg:hidden w-full h-[100svh] md:h-[500px] md:w-[75vw] md:mt-6 md:mb-8 rounded-none md:rounded-[24px] overflow-hidden shadow-none md:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] z-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => { setTimeout(() => setIsHovered(false), 2000) }}
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Hero showcase image ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0, zIndex: -1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            loading={currentIndex === 0 ? "eager" : "lazy"}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/10 pointer-events-none mix-blend-overlay"></div>
        {/* Gradient overlay to make white text readable on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70 pointer-events-none md:hidden"></div>

        {/* MOBILE/TABLET ONLY: Pagination Dots (Overlay at Bottom) */}
        <div className="absolute bottom-10 md:bottom-6 left-0 right-0 flex justify-center items-center gap-3 z-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to image ${idx + 1}`}
              className={`rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                idx === currentIndex
                  ? "w-2.5 h-2.5 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white/90"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Shared Typography and Buttons */}
      <motion.div 
        className="relative z-10 text-center max-w-3xl px-6 flex flex-col items-center justify-center w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 30 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] leading-[1.1] font-serif mb-5 lg:mb-6 text-white md:text-[#A05C3C] drop-shadow-lg md:drop-shadow-none">
          Capturing Moments<br />Through Every Frame
        </h1>
        <p className="text-white/90 md:text-[#8C6D5D] text-base md:text-lg lg:text-xl max-w-xl lg:max-w-2xl mx-auto mb-8 lg:mb-10 font-serif leading-relaxed drop-shadow-md md:drop-shadow-none">
          A curated collection of timeless moments, meticulously crafted to preserve the elegance and authenticity of your legacy.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center mb-10 lg:mb-3 gap-4 lg:gap-6 w-full max-w-sm sm:max-w-none">
          <Link href="/portfolio" className="inline-block text-center bg-white md:bg-[#2D3741] text-[#2c2a26] md:text-white text-sm font-semibold tracking-widest uppercase px-8 py-4 w-full sm:w-auto hover:bg-gray-100 md:hover:bg-[#1E252C] transition-colors rounded-full shadow-lg md:shadow-none">
            View Portfolio
          </Link>
          <button className="bg-transparent border border-white md:border-[#A05C3C] text-white md:text-[#333333] text-sm font-semibold tracking-widest uppercase px-8 py-4 w-full sm:w-auto hover:bg-white/10 md:hover:bg-[#F5F1E8]/5 transition-colors rounded-full shadow-lg md:shadow-none">
            Book A Session
          </button>
        </div>
      </motion.div>
    </section>
  );
}
