"use client";
import React, { useState } from 'react';

const categories = ["ALL", "FASHION", "WEDDING", "EVENT", "BUSINESS", "PERSONAL"];

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600", category: "WEDDING", aspect: "aspect-[3/4]" },
  { id: 2, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600", category: "FASHION", aspect: "aspect-[4/3]" },
  { id: 3, src: "https://images.unsplash.com/photo-1595981267035-7b04d84d5f19?auto=format&fit=crop&q=80&w=600", category: "PERSONAL", aspect: "aspect-square" },
  { id: 4, src: "https://images.unsplash.com/photo-1520113110260-032a2c5a2c4e?auto=format&fit=crop&q=80&w=600", category: "WEDDING", aspect: "aspect-[4/3]" },
  { id: 5, src: "https://images.unsplash.com/photo-1558981420-8ceaa10f1712?auto=format&fit=crop&q=80&w=600", category: "EVENT", aspect: "aspect-[3/4]" },
  { id: 6, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600", category: "BUSINESS", aspect: "aspect-[3/4]" },
  { id: 7, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600", category: "EVENT", aspect: "aspect-square" },
  { id: 8, src: "https://images.unsplash.com/photo-1481691238472-353272e2764b?auto=format&fit=crop&q=80&w=600", category: "BUSINESS", aspect: "aspect-[4/3]" },
  { id: 9, src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=600", category: "PERSONAL", aspect: "aspect-[3/4]" },
];

export const PortfolioGallery = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredImages = images.filter(img => activeCategory === "ALL" || img.category === activeCategory);

  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-24 font-sans relative overflow-hidden">
      
      {/* Background large text */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
        <h1 className="text-[120px] md:text-[200px] lg:text-[250px] font-serif text-gray-50/50 leading-none whitespace-nowrap overflow-hidden">
          PORTFOLIO
        </h1>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        {/* Header Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1c1c1c] mb-6">
            Latest Work
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-semibold tracking-widest uppercase pb-1 transition-colors px-3 py-2 ${
                activeCategory === cat 
                  ? "bg-[#A05C3C] text-white" 
                  : "text-gray-400 hover:text-[#A05C3C]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 w-full space-y-6">
          {filteredImages.map((img) => (
            <div key={img.id} className={`break-inside-avoid w-full ${img.aspect} overflow-hidden bg-gray-100 group relative`}>
              <img 
                src={img.src} 
                alt={img.category} 
                className="w-full h-full object-cover filter grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-20">
          <button className="bg-[#A05C3C] hover:bg-[#8a4e32] text-white text-xs tracking-widest uppercase py-4 px-8 font-semibold transition-colors flex items-center gap-2">
            View More <span className="text-lg leading-none">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
};
