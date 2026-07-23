"use client";
import React, { useState, useEffect } from 'react';

const categories = ["ALL", "WEDDING", "OUTDOOR", "PORTRAIT", "BIRTHDAY", "COMMERCIAL", "PERSONAL"];

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=601", category: "WEDDING", aspect: "aspect-[4/3]" },
  { id: 2, src: "https://images.unsplash.com/photo-1595981267035-7b04d84d5f19?auto=format&fit=crop&q=80&w=602", category: "WEDDING", aspect: "aspect-square" },
  { id: 3, src: "https://images.unsplash.com/photo-1520113110260-032a2c5a2c4e?auto=format&fit=crop&q=80&w=603", category: "WEDDING", aspect: "aspect-[3/4]" },
  { id: 4, src: "https://images.unsplash.com/photo-1558981420-8ceaa10f1712?auto=format&fit=crop&q=80&w=604", category: "WEDDING", aspect: "aspect-[4/3]" },
  { id: 5, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=605", category: "WEDDING", aspect: "aspect-square" },
  { id: 6, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=606", category: "WEDDING", aspect: "aspect-[3/4]" },
  { id: 7, src: "https://images.unsplash.com/photo-1481691238472-353272e2764b?auto=format&fit=crop&q=80&w=607", category: "WEDDING", aspect: "aspect-[4/3]" },
  { id: 8, src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=608", category: "WEDDING", aspect: "aspect-square" },
  { id: 9, src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=609", category: "WEDDING", aspect: "aspect-[3/4]" },
  { id: 10, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600", category: "WEDDING", aspect: "aspect-[4/3]" },
  { id: 11, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=601", category: "OUTDOOR", aspect: "aspect-square" },
  { id: 12, src: "https://images.unsplash.com/photo-1595981267035-7b04d84d5f19?auto=format&fit=crop&q=80&w=602", category: "OUTDOOR", aspect: "aspect-[3/4]" },
  { id: 13, src: "https://images.unsplash.com/photo-1520113110260-032a2c5a2c4e?auto=format&fit=crop&q=80&w=603", category: "OUTDOOR", aspect: "aspect-[4/3]" },
  { id: 14, src: "https://images.unsplash.com/photo-1558981420-8ceaa10f1712?auto=format&fit=crop&q=80&w=604", category: "OUTDOOR", aspect: "aspect-square" },
  { id: 15, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=605", category: "OUTDOOR", aspect: "aspect-[3/4]" },
  { id: 16, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=606", category: "OUTDOOR", aspect: "aspect-[4/3]" },
  { id: 17, src: "https://images.unsplash.com/photo-1481691238472-353272e2764b?auto=format&fit=crop&q=80&w=607", category: "OUTDOOR", aspect: "aspect-square" },
  { id: 18, src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=608", category: "OUTDOOR", aspect: "aspect-[3/4]" },
  { id: 19, src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=609", category: "OUTDOOR", aspect: "aspect-[4/3]" },
  { id: 20, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600", category: "OUTDOOR", aspect: "aspect-square" },
  { id: 21, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=601", category: "PORTRAIT", aspect: "aspect-[3/4]" },
  { id: 22, src: "https://images.unsplash.com/photo-1595981267035-7b04d84d5f19?auto=format&fit=crop&q=80&w=602", category: "PORTRAIT", aspect: "aspect-[4/3]" },
  { id: 23, src: "https://images.unsplash.com/photo-1520113110260-032a2c5a2c4e?auto=format&fit=crop&q=80&w=603", category: "PORTRAIT", aspect: "aspect-square" },
  { id: 24, src: "https://images.unsplash.com/photo-1558981420-8ceaa10f1712?auto=format&fit=crop&q=80&w=604", category: "PORTRAIT", aspect: "aspect-[3/4]" },
  { id: 25, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=605", category: "PORTRAIT", aspect: "aspect-[4/3]" },
  { id: 26, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=606", category: "PORTRAIT", aspect: "aspect-square" },
  { id: 27, src: "https://images.unsplash.com/photo-1481691238472-353272e2764b?auto=format&fit=crop&q=80&w=607", category: "PORTRAIT", aspect: "aspect-[3/4]" },
  { id: 28, src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=608", category: "PORTRAIT", aspect: "aspect-[4/3]" },
  { id: 29, src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=609", category: "PORTRAIT", aspect: "aspect-square" },
  { id: 30, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600", category: "PORTRAIT", aspect: "aspect-[3/4]" },
  { id: 31, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=601", category: "BIRTHDAY", aspect: "aspect-[4/3]" },
  { id: 32, src: "https://images.unsplash.com/photo-1595981267035-7b04d84d5f19?auto=format&fit=crop&q=80&w=602", category: "BIRTHDAY", aspect: "aspect-square" },
  { id: 33, src: "https://images.unsplash.com/photo-1520113110260-032a2c5a2c4e?auto=format&fit=crop&q=80&w=603", category: "BIRTHDAY", aspect: "aspect-[3/4]" },
  { id: 34, src: "https://images.unsplash.com/photo-1558981420-8ceaa10f1712?auto=format&fit=crop&q=80&w=604", category: "BIRTHDAY", aspect: "aspect-[4/3]" },
  { id: 35, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=605", category: "BIRTHDAY", aspect: "aspect-square" },
  { id: 36, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=606", category: "BIRTHDAY", aspect: "aspect-[3/4]" },
  { id: 37, src: "https://images.unsplash.com/photo-1481691238472-353272e2764b?auto=format&fit=crop&q=80&w=607", category: "BIRTHDAY", aspect: "aspect-[4/3]" },
  { id: 38, src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=608", category: "BIRTHDAY", aspect: "aspect-square" },
  { id: 39, src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=609", category: "BIRTHDAY", aspect: "aspect-[3/4]" },
  { id: 40, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600", category: "BIRTHDAY", aspect: "aspect-[4/3]" },
  { id: 41, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=601", category: "COMMERCIAL", aspect: "aspect-square" },
  { id: 42, src: "https://images.unsplash.com/photo-1595981267035-7b04d84d5f19?auto=format&fit=crop&q=80&w=602", category: "COMMERCIAL", aspect: "aspect-[3/4]" },
  { id: 43, src: "https://images.unsplash.com/photo-1520113110260-032a2c5a2c4e?auto=format&fit=crop&q=80&w=603", category: "COMMERCIAL", aspect: "aspect-[4/3]" },
  { id: 44, src: "https://images.unsplash.com/photo-1558981420-8ceaa10f1712?auto=format&fit=crop&q=80&w=604", category: "COMMERCIAL", aspect: "aspect-square" },
  { id: 45, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=605", category: "COMMERCIAL", aspect: "aspect-[3/4]" },
  { id: 46, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=606", category: "COMMERCIAL", aspect: "aspect-[4/3]" },
  { id: 47, src: "https://images.unsplash.com/photo-1481691238472-353272e2764b?auto=format&fit=crop&q=80&w=607", category: "COMMERCIAL", aspect: "aspect-square" },
  { id: 48, src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=608", category: "COMMERCIAL", aspect: "aspect-[3/4]" },
  { id: 49, src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=609", category: "COMMERCIAL", aspect: "aspect-[4/3]" },
  { id: 50, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600", category: "COMMERCIAL", aspect: "aspect-square" },
  { id: 51, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=601", category: "PERSONAL", aspect: "aspect-[3/4]" },
  { id: 52, src: "https://images.unsplash.com/photo-1595981267035-7b04d84d5f19?auto=format&fit=crop&q=80&w=602", category: "PERSONAL", aspect: "aspect-[4/3]" },
  { id: 53, src: "https://images.unsplash.com/photo-1520113110260-032a2c5a2c4e?auto=format&fit=crop&q=80&w=603", category: "PERSONAL", aspect: "aspect-square" },
  { id: 54, src: "https://images.unsplash.com/photo-1558981420-8ceaa10f1712?auto=format&fit=crop&q=80&w=604", category: "PERSONAL", aspect: "aspect-[3/4]" },
  { id: 55, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=605", category: "PERSONAL", aspect: "aspect-[4/3]" },
  { id: 56, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=606", category: "PERSONAL", aspect: "aspect-square" },
  { id: 57, src: "https://images.unsplash.com/photo-1481691238472-353272e2764b?auto=format&fit=crop&q=80&w=607", category: "PERSONAL", aspect: "aspect-[3/4]" },
  { id: 58, src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=608", category: "PERSONAL", aspect: "aspect-[4/3]" },
  { id: 59, src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=609", category: "PERSONAL", aspect: "aspect-square" },
  { id: 60, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600", category: "PERSONAL", aspect: "aspect-[3/4]" },
];


export const PortfolioGallery = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [showAll, setShowAll] = useState(false);
  const [galleryItems, setGalleryItems] = useState<any[]>(images);

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
              aspect: d.imagePosition === 'center' ? 'aspect-square' : d.imagePosition === 'right' ? 'aspect-[3/4]' : 'aspect-[4/3]',
              isDb: true
            }));
            
            // Prepend new database items, removing potential duplicates
            const combined = [...dbItems, ...images.filter(img => !dbItems.some((dbI: any) => dbI.src === img.src))];
            setGalleryItems(combined);
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
          {displayedImages.map((img) => (
            <div key={img.id} className={`break-inside-avoid w-full ${img.aspect} overflow-hidden bg-[#e8e4db] group relative rounded-xl shadow-md`}>
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
          <button 
            onClick={() => setShowAll(!showAll)}
            className="bg-transparent cursor-pointer border border-[#A05C3C] text-[#333333] text-sm font-semibold tracking-widest uppercase px-8 py-4 w-full sm:w-auto hover:bg-[#F5F1E8]/5 transition-colors rounded-full flex items-center justify-center gap-2"
          >
            {showAll ? "View Less" : "View More"} <span className="text-lg leading-none">{showAll ? "↑" : "→"}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
