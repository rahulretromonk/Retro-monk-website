const fs = require('fs');

const categories = ["ALL", "WEDDING", "OUTDOOR", "PORTRAIT", "BIRTHDAY", "COMMERCIAL", "PERSONAL"];
const bases = [
  "1511285560929-80b456fea0bc",
  "1534528741775-53994a69daeb",
  "1595981267035-7b04d84d5f19",
  "1520113110260-032a2c5a2c4e",
  "1558981420-8ceaa10f1712",
  "1507003211169-0a1dd7228f2d",
  "1492684223066-81342ee5ff30",
  "1481691238472-353272e2764b",
  "1516426122078-c23e76319801",
  "1469474968028-56623f02e42e"
];
const aspects = ["aspect-[3/4]", "aspect-[4/3]", "aspect-square"];

let imgs = "const images = [\n";
let id = 1;
// Skip "ALL" since it's just a filter, we only generate items for the 6 actual categories.
for (let i = 1; i < categories.length; i++) {
  const c = categories[i];
  for (let j = 0; j < 10; j++) {
    const pid = bases[id % bases.length];
    const a = aspects[id % aspects.length];
    const w = 600 + (id % 10);
    imgs += `  { id: ${id}, src: "https://images.unsplash.com/photo-${pid}?auto=format&fit=crop&q=80&w=${w}", category: "${c}", aspect: "${a}" },\n`;
    id++;
  }
}
imgs += "];\n";

const fileContent = `"use client";
import React, { useState } from 'react';

const categories = ["ALL", "WEDDING", "OUTDOOR", "PORTRAIT", "BIRTHDAY", "COMMERCIAL", "PERSONAL"];

${imgs}

export const PortfolioGallery = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredImages = images.filter(img => activeCategory === "ALL" || img.category === activeCategory);

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
              onClick={() => setActiveCategory(cat)}
              className={\`text-xs font-semibold tracking-widest uppercase pb-1 transition-colors px-4 py-2 \${
                activeCategory === cat 
                  ? "bg-[#A05C3C] text-white rounded-full" 
                  : "text-[#8C6D5D] hover:text-[#A05C3C]"
              }\`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 w-full space-y-6">
          {filteredImages.map((img) => (
            <div key={img.id} className={\`break-inside-avoid w-full \${img.aspect} overflow-hidden bg-[#e8e4db] group relative rounded-xl shadow-md\`}>
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
          <button className="bg-transparent border border-[#A05C3C] text-[#333333] text-sm font-semibold tracking-widest uppercase px-8 py-4 w-full sm:w-auto hover:bg-[#F5F1E8]/5 transition-colors rounded-full flex items-center justify-center gap-2">
            View More <span className="text-lg leading-none">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
};
`;

fs.writeFileSync('v:/Retro monk/client/src/components/portfolio-page/PortfolioGallery.tsx', fileContent);
console.log("Generated PortfolioGallery.tsx with 60 images.");
