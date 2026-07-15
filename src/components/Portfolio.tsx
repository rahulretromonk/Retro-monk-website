"use client";
import React from 'react';
import { motion } from 'framer-motion';

const portfolioItems = [
  {
    title: "Wedding Stories",
    description: "Intimate narratives of love and commitment, documented with an unobtrusive editorial eye to preserve genuine emotion.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200",
    imagePosition: "left"
  },
  {
    title: "Outdoor Couple Shoots",
    description: "Sun-drenched landscapes and authentic connection, creating cinematic visuals that feel entirely personal.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    imagePosition: "right"
  },
  {
    title: "Portrait Collection",
    description: "Focused, soulful studies of character. A classic approach utilizing thoughtful light to reveal quiet confidence.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200",
    imagePosition: "left"
  },
  {
    title: "Birthday Celebrations",
    description: "Joyful gatherings documented with elegance, focusing on the shared laughter and sophisticated details of the occasion.",
    image: "https://images.unsplash.com/photo-1530103862676-de3c9de59a9e?auto=format&fit=crop&q=80&w=1200",
    imagePosition: "right"
  },
  {
    title: "Commercial Shoots",
    description: "Translating brand ethos into compelling visual narratives with a polished, high-end editorial sensibility.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200",
    imagePosition: "left"
  },
  {
    title: "Wild Trails\n(Personal Collection)",
    description: "A personal exploration of the natural world, capturing the untamed beauty of wildlife in its purest form.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1200",
    imagePosition: "right"
  }
];

export const Portfolio = () => {
  return (
    <section className="bg-[#FAF9F5] text-[#2c2a26] py-24 px-6 md:px-12 lg:px-24 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-3xl mb-24">
          <p className="text-sm tracking-[0.15em] text-[#55524c] font-semibold uppercase mb-4">Featured Work</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#3a3731] mb-6 leading-[1.15]">
            Every Story Deserves Its Own<br />Chapter
          </h2>
          <p className="text-[#55524c] text-base md:text-lg italic font-serif">
            A curated collection of timeless moments captured with emotion,<br />
            authenticity, and purpose.
          </p>
        </div>

        {/* Portfolio Items */}
        <div className="flex flex-col gap-24 lg:gap-32 w-full">
          {portfolioItems.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${item.imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-20`}
            >
              {/* Image with sliding animation */}
              <motion.div 
                className="w-full sm:w-4/5 md:w-1/2 mx-auto md:mx-0"
                initial={{ opacity: 0, x: item.imagePosition === 'left' ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="rounded-xl overflow-hidden shadow-lg aspect-[4/3] w-full">
                  <img src={item.image} alt={item.title.replace('\n', ' ')} className="w-full h-full object-cover" />
                </div>
              </motion.div>

              {/* Text Content */}
              <div className={`w-full md:w-1/2 flex flex-col ${item.imagePosition === 'right' ? 'md:items-end md:text-right' : 'md:items-start text-left'}`}>
                <h3 className="text-3xl md:text-4xl font-serif text-[#3a3731] mb-4 leading-tight whitespace-pre-line">
                  {item.title}
                </h3>
                <p className="text-[#55524c] text-base leading-relaxed mb-8 max-w-md">
                  {item.description}
                </p>
                <a href="#" className="inline-flex items-center text-xs tracking-[0.15em] text-[#a88655] font-semibold uppercase hover:text-[#8a6e45] transition-colors">
                  View Collection 
                  <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
