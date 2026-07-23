"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const defaultTestimonials = [
  {
    id: "tst-1",
    clientName: "Shekar mahadev",
    eventType: "Wedding Stories",
    review: "Capture every emotion, tradition, and unforgettable moment of your special day with timeless wedding photography. The videos and images exceeded all our editorial expectations.",
    imageUrl: "https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-in-front-of-an-altar-39871-large.mp4",
    displayOrder: 1
  },
  {
    id: "tst-2",
    clientName: "Anju",
    eventType: "Outdoor Couple Shoots",
    review: "Natural and romantic couple photography in beautiful outdoor locations with authentic storytelling. The motion clips added a breathtaking narrative layer to our gallery.",
    imageUrl: "https://assets.mixkit.co/videos/preview/mixkit-couple-walking-in-a-forest-42247-large.mp4",
    displayOrder: 2
  },
  {
    id: "tst-3",
    clientName: "Ram",
    eventType: "Portrait Sessions",
    review: "Professional portraits that highlight your personality with elegant lighting and timeless compositions. The process felt extremely premium and personal.",
    imageUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-smiling-in-front-of-a-neutral-background-42256-large.mp4",
    displayOrder: 3
  },
  {
    id: "tst-4",
    clientName: "Sonam",
    eventType: "Birthday Celebrations",
    review: "Joyful birthday photography that preserves genuine smiles, laughter, family moments, and unforgettable celebrations. Perfect loops to share with friends and family.",
    imageUrl: "https://assets.mixkit.co/videos/preview/mixkit-birthday-cake-with-burning-candles-42250-large.mp4",
    displayOrder: 4
  },
  {
    id: "tst-5",
    clientName: "Agarwal",
    eventType: "Commercial Shoots",
    review: "Premium commercial photography for brands, products, businesses, and promotional campaigns with a refined visual identity. Highly professional turnaround and creative direction.",
    imageUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-craftsman-working-with-leather-42232-large.mp4",
    displayOrder: 5
  }
];

export const Testimonials = () => {
  const [items, setItems] = useState<any[]>(defaultTestimonials);
  const [activeModalItem, setActiveModalItem] = useState<any | null>(null);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const res = await fetch('/api/admin/testimonials');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const sorted = data.sort((a: any, b: any) => a.displayOrder - b.displayOrder);
            setItems(sorted);
          }
        }
      } catch (err) {
        console.error("Failed to load dynamic testimonials:", err);
      }
    }
    loadTestimonials();
  }, []);

  const isVideoUrl = (url?: string) => {
    if (!url) return false;
    return url.endsWith('.mp4') || url.endsWith('.webm') || url.includes('/video/upload/');
  };

  return (
    <section className="bg-[#FAF9F5] text-[#2c2a26] py-24 px-6 md:px-12 lg:px-24 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-3xl mb-16">
          <p className="text-sm tracking-[0.15em] text-[#a88655] font-semibold uppercase mb-4">Our Signature Reviews</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#3a3731] mb-6 leading-tight">
            Moments We Capture
          </h2>
          <p className="text-[#55524c] text-base md:text-lg max-w-2xl mx-auto">
            Every occasion deserves thoughtful storytelling. Explore the photography experiences crafted to preserve your most meaningful moments.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="flex flex-wrap justify-center gap-8 w-full">
          {items.map((item, index) => {
            const mediaUrl = item.imageUrl;
            const indexStr = String(index + 1).padStart(2, '0');
            const isVideo = isVideoUrl(mediaUrl);

            return (
              <motion.div
                key={item.id}
                className="w-full sm:w-[360px] bg-white border border-[#7A5848]/10 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                style={{ borderRadius: '24px' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Media Container */}
                <div className="relative aspect-[16/10] w-full bg-[#E8DCCB]/20 p-4">
                  <div className="w-full h-full rounded-xl overflow-hidden border-2 border-dashed border-[#7A5848]/20 flex items-center justify-center relative group">
                    {mediaUrl ? (
                      isVideo ? (
                        <video
                          src={mediaUrl}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                          autoPlay
                        />
                      ) : (
                        <img
                          src={mediaUrl}
                          alt={item.clientName}
                          className="w-full h-full object-cover"
                        />
                      )
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-[#a88655]/60 text-xs font-semibold uppercase tracking-wider">
                        <Play size={20} className="stroke-[1.5]" />
                        <span>GIF Preview</span>
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="bg-[#FAF9F5] text-[#7A5848] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Hover Play
                      </span>
                    </div>
                  </div>

                  {/* Circle Badge (Index) */}
                  <div className="absolute bottom-0 left-8 transform translate-y-1/2 w-8 h-8 rounded-full bg-[#FAF9F5] border border-[#7A5848]/15 flex items-center justify-center text-[10px] font-bold text-[#7A5848] shadow-sm">
                    {indexStr}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-serif text-[#3a3731] mb-2 leading-tight">
                    {item.clientName}
                  </h3>
                  <span className="text-[10px] tracking-wider text-[#a88655] font-semibold uppercase mb-3 block">
                    {item.eventType || "Client Review"}
                  </span>
                  <p className="text-[#55524c] text-sm leading-relaxed mb-6 line-clamp-3">
                    {item.review}
                  </p>

                  <button
                    onClick={() => setActiveModalItem({ ...item, indexStr })}
                    className="mt-auto inline-flex items-center text-xs tracking-wider text-[#a88655] hover:text-[#8a6e45] font-bold uppercase transition-colors"
                  >
                    Explore More <span className="ml-1.5">→</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalItem(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-[#FAF9F5] w-full max-w-2xl overflow-hidden relative z-10 border border-[#7A5848]/20 flex flex-col shadow-2xl"
              style={{ borderRadius: '32px' }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[#7A5848]/20 bg-white/50 backdrop-blur-md flex items-center justify-center text-[#7A5848] hover:bg-white hover:scale-105 transition-all z-20 cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* HD Media Section */}
              <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center">
                {activeModalItem.imageUrl ? (
                  isVideoUrl(activeModalItem.imageUrl) ? (
                    <video
                      src={activeModalItem.imageUrl}
                      className="w-full h-full object-contain"
                      controls
                      autoPlay
                      loop
                    />
                  ) : (
                    <img
                      src={activeModalItem.imageUrl}
                      alt={activeModalItem.clientName}
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="flex flex-col items-center gap-2 text-[#FAF9F5]/70 uppercase tracking-widest text-sm">
                    <Play size={32} />
                    <span>No Preview Media Available</span>
                  </div>
                )}

                {/* Overlap badge */}
                <div className="absolute -bottom-5 left-8 w-10 h-10 rounded-full bg-[#FAF9F5] border border-[#7A5848]/20 flex items-center justify-center text-xs font-bold text-[#7A5848] shadow-md z-10">
                  {activeModalItem.indexStr}
                </div>
              </div>

              {/* Text content */}
              <div className="p-8 pt-10 flex flex-col gap-4">
                <div>
                  <h3 className="text-3xl font-serif text-[#3a3731] leading-tight">
                    {activeModalItem.clientName}
                  </h3>
                  <span className="text-xs tracking-wider text-[#a88655] font-semibold uppercase mt-1 block">
                    {activeModalItem.eventType || "Client Review"}
                  </span>
                </div>

                <div className="w-full h-[1px] bg-[#7A5848]/10 my-1" />

                <p className="text-[#55524c] text-base leading-relaxed italic font-serif max-h-48 overflow-y-auto pr-2">
                  "{activeModalItem.review}"
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
