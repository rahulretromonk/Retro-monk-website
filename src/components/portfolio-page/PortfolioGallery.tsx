"use client";
import React, { useState, useEffect } from 'react';

const categories = ["ALL", "WEDDING", "OUTDOOR", "PORTRAIT", "BIRTHDAY", "COMMERCIAL", "PERSONAL","OTHERS"];

export const PortfolioGallery = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [showAll, setShowAll] = useState(false);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const res = await fetch('/api/admin/portfolio');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            // Map db entries to the gallery format
            const dbItems = data.map((d: any) => ({
              id: d.id,
              src: d.imageUrl,
              category: d.category || 'WEDDING',
              aspect: d.imagePosition === 'center' ? 'aspect-square' : d.imagePosition === 'right' ? 'aspect-[3/4]' : d.imagePosition === 'left' ? 'aspect-[4/3]' : 'aspect-square',
              isDb: true
            }));
            
            setGalleryItems(dbItems);
          }
        }
      } catch (err) {
        console.error("Failed to load portfolio gallery:", err);
      }
    }
    loadPortfolio();
  }, []);

  const filteredImages = galleryItems.filter(img => activeCategory === "ALL" || img.category === activeCategory);
  const displayedImages = showAll ? filteredImages : filteredImages.slice(0, 6);

  return (
    <section className="bg-[#FAF9F5] py-24 px-6 md:px-12 lg:px-24 font-sans relative overflow-hidden">
      
      {/* Background large text */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
        <h1 className="text-[120px] md:text-[200px] lg:text-[250px] font-serif text-[#A05C3C]/5 leading-none whitespace-nowrap overflow-hidden">
          PORTFOLIO
        </h1>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        {/* Header Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1c1c1c] mb-6">
            Latest Work
          </h2>
          <p className="text-[#8C6D5D] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setShowAll(false);
              }}
              className={`text-xs font-semibold tracking-widest uppercase pb-1 transition-colors px-4 py-2 ${
                activeCategory === cat 
                  ? "bg-[#A05C3C] text-white rounded-full" 
                  : "text-[#8C6D5D] hover:text-[#A05C3C]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 w-full space-y-6">
          {displayedImages.map((img) => {
            const isVideo = img.src.toLowerCase().endsWith('.mp4') || img.src.toLowerCase().endsWith('.webm');
            return (
              <div 
                key={img.id} 
                className={`break-inside-avoid w-full ${img.aspect} overflow-hidden bg-[#e8e4db] group relative rounded-xl shadow-md cursor-pointer`}
                onClick={() => setSelectedImage(img)}
              >
                {isVideo ? (
                  <video 
                    src={img.src} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="w-full h-full object-cover filter grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                ) : (
                  <img 
                    src={img.src} 
                    alt={img.category} 
                    className="w-full h-full object-cover filter grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                )}
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white/90 drop-shadow-md scale-50 group-hover:scale-100 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Button */}
        <div className="mt-20">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="bg-transparent cursor-pointer border border-[#A05C3C] text-[#333333] text-sm font-semibold tracking-widest uppercase px-8 py-4 w-full sm:w-auto hover:bg-[#F5F1E8]/5 transition-colors rounded-full flex items-center justify-center gap-2"
          >
            {showAll ? "View Less" : "View More"} <span className="text-lg leading-none">{showAll ? "↑" : "→"}</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button (Fixed to Top Right) */}
          <button 
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors bg-black/20 hover:bg-black/50 rounded-full p-2 flex items-center justify-center z-10"
            onClick={() => setSelectedImage(null)}
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div 
            className="relative max-w-full max-h-full flex items-center justify-center" 
            onClick={(e) => e.stopPropagation()}
          >
            {(selectedImage.src.toLowerCase().endsWith('.mp4') || selectedImage.src.toLowerCase().endsWith('.webm')) ? (
              <video 
                src={selectedImage.src} 
                autoPlay 
                controls 
                className="max-w-[95vw] max-h-[90vh] object-contain rounded-md shadow-2xl"
              />
            ) : (
              <img 
                src={selectedImage.src} 
                alt={selectedImage.category} 
                className="max-w-[95vw] max-h-[90vh] object-contain rounded-md shadow-2xl"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};
