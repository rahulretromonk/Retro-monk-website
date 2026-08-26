"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Portfolio = () => {
  const [displayItems, setDisplayItems] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function loadFeaturedPortfolio() {
      try {
        const res = await fetch('/api/admin/portfolio');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            // Sort by display order
            const sorted = data.sort((a: any, b: any) => a.displayOrder - b.displayOrder);
            
            const mapped = sorted.map((d: any) => ({
              title: d.title,
              description: d.description,
              image: d.imageUrl,
              imagePosition: d.imagePosition || 'left'
            }));
            setDisplayItems(mapped);
          } else {
            setDisplayItems([]);
          }
        }
      } catch (err) {
        console.error("Failed to load featured portfolio:", err);
      }
    }
    loadFeaturedPortfolio();
  }, []);

  return (
    <section id="gallery" className="bg-[#FAF9F5] text-[#2c2a26] py-24 px-6 md:px-12 lg:px-24 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-3xl mb-24">
          <p className="text-sm tracking-[0.15em] text-[#55524c] font-semibold uppercase mb-4">PHOTOGRAPHY PORTFOLIO</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#3a3731] mb-6 leading-[1.15]">
           Wedding, Portrait & <br />Commercial Photography
          </h2>
          <p className="text-[#55524c] text-base md:text-lg italic font-serif">
            Explore our photography portfolio featuring wedding, portrait, commercial, birthday, and outdoor couple photography across Chennai and India.
          </p>
        </div>

        {/* Portfolio Items */}
        <div className="flex flex-col gap-24 lg:gap-32 w-full">
          {displayItems.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${item.imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-20`}
            >
              {/* Image/Video with sliding animation */}
              <motion.div 
                className="w-full sm:w-4/5 md:w-1/2 mx-auto md:mx-0"
                initial={{ opacity: 0, x: item.imagePosition === 'left' ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="rounded-xl overflow-hidden shadow-lg aspect-[4/3] w-full">
                  {item.image.toLowerCase().endsWith('.mp4') || item.image.toLowerCase().endsWith('.webm') ? (
                    <video 
                      src={item.image} 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <img src={item.image} alt={item.title.replace('\n', ' ')} className="w-full h-full object-cover" />
                  )}
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
                <Link href="/portfolio" className="inline-flex items-center text-xs tracking-[0.15em] text-[#a88655] font-semibold uppercase hover:text-[#8a6e45] transition-colors">
                  View Collection 
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
