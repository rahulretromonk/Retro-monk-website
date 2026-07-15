"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1542314831-c53cd3816002?q=80&w=600&auto=format&fit=crop", // card 1 (leftmost)
  "https://images.unsplash.com/photo-1600607688960-e09882c55b8c?q=80&w=600&auto=format&fit=crop", // card 2
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop", // card 3
  "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=600&auto=format&fit=crop", // card 4 (center)
  "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?q=80&w=600&auto=format&fit=crop", // card 5
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop", // card 6
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop", // card 7 (rightmost)
];

export function Hero() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 0: Initial hidden state
    // Stage 1: Pop up linearly
    const t1 = setTimeout(() => setStage(1), 500);
    // Stage 2: Form semi-circle
    const t2 = setTimeout(() => setStage(2), 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

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

  return (
    <section className="flex flex-col items-center justify-start min-h-screen pt-24 px-4 overflow-hidden bg-[#F4F0EA]">
      {/* Cards Container */}
      <div className="relative w-full max-w-5xl h-[450px] flex justify-center items-start mt-10 z-10">
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
                delay: stage === 1 ? index * 0.1 : 0, // delay linearly on pop up
              }}
            >
              <img
                src={src}
                alt={`Portfolio image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
            </motion.div>
          );
        })}
      </div>

      {/* Typography and Buttons */}
      <motion.div 
        className="text-center max-w-3xl z-20 mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 30 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <h1 className="text-5xl md:text-[5.5rem] leading-[1.1] font-serif mb-6 text-[#A05C3C]">
          Capturing Stories<br />Through Every Frame
        </h1>
        <p className="text-[#8C6D5D] text-lg md:text-xl max-w-2xl mx-auto mb-10 font-serif leading-relaxed">
          A curated collection of timeless moments, meticulously crafted to preserve the elegance and authenticity of your legacy.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="bg-[#2D3741] text-[#A05C3C] text-sm font-semibold tracking-widest uppercase px-8 py-4 w-full sm:w-auto hover:bg-[#1E252C] transition-colors">
            View Portfolio
          </button>
          <button className="bg-transparent border border-[#A05C3C] text-[#333333] text-sm font-semibold tracking-widest uppercase px-8 py-4 w-full sm:w-auto hover:bg-[#A05C3C]/5 transition-colors">
            Book A Session
          </button>
        </div>
      </motion.div>
    </section>
  );
}
