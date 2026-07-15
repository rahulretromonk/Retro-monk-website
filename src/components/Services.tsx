"use client";
import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    id: "01",
    title: "Wedding Stories",
    description: "Capture every emotion, tradition, and unforgettable moment of your special day with timeless wedding photography.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    icon: (
      <svg className="w-5 h-5 text-[#a88655]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    id: "02",
    title: "Outdoor Couple Shoots",
    description: "Natural and romantic couple photography in beautiful outdoor locations with authentic storytelling.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    icon: (
      <svg className="w-5 h-5 text-[#a88655]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    )
  },
  {
    id: "03",
    title: "Portrait Sessions",
    description: "Professional portraits that highlight your personality with elegant lighting and timeless compositions.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    icon: (
      <svg className="w-5 h-5 text-[#a88655]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    id: "04",
    title: "Birthday Celebrations",
    description: "Joyful birthday photography that preserves genuine smiles, laughter, family moments, and unforgettable celebrations.",
    image: "https://images.unsplash.com/photo-1530103862676-de3c9de59a9e?auto=format&fit=crop&q=80&w=800",
    icon: (
      <svg className="w-5 h-5 text-[#a88655]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
      </svg>
    )
  }
];

const commercialShoot = {
  id: "05",
  title: "Commercial Shoots",
  description: "Premium commercial photography for brands, products, businesses, and promotional campaigns with a refined visual identity.",
  image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1600",
  icon: (
    <svg className="w-5 h-5 text-[#a88655]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
};

export const Services = () => {
  return (
    <section className="bg-[#f0ece1] text-[#2c2a26] py-24 px-6 md:px-12 lg:px-24 font-sans border-t border-[#e0d8c8]">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-2xl mb-16">
          <p className="text-sm tracking-[0.15em] text-[#a88655] font-semibold uppercase mb-4">Our Signature Services</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#3a3731] mb-6 leading-tight">
            Moments We Capture
          </h2>
          <p className="text-[#55524c] text-base md:text-lg leading-relaxed">
            Every occasion deserves thoughtful storytelling. Explore the photography
            experiences crafted to preserve your most meaningful moments.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              className="bg-white rounded-3xl p-4 shadow-sm border border-[#e8e4db] flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] w-full mb-6">
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#55524c] text-xs font-medium px-3 py-1.5 rounded-full z-10">
                  {service.id}
                </div>
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <div className="px-4 pb-4 flex flex-col flex-grow">
                <div className="mb-4">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-serif text-[#3a3731] mb-3">{service.title}</h3>
                <p className="text-[#55524c] text-sm leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                <a href="#" className="inline-flex items-center text-xs tracking-[0.15em] text-[#a88655] font-semibold uppercase hover:text-[#8a6e45] transition-colors mt-auto">
                  Explore More 
                  <span className="ml-2">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Width Service */}
        <motion.div 
          className="w-full bg-white rounded-3xl p-4 shadow-sm border border-[#e8e4db]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative rounded-2xl overflow-hidden h-[250px] md:h-[400px] w-full mb-6">
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#55524c] text-xs font-medium px-3 py-1.5 rounded-full z-10">
              {commercialShoot.id}
            </div>
            <img src={commercialShoot.image} alt={commercialShoot.title} className="w-full h-full object-cover" />
          </div>
          <div className="px-4 pb-4 md:px-8 md:pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="mb-4">
                {commercialShoot.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-serif text-[#3a3731] mb-3">{commercialShoot.title}</h3>
              <p className="text-[#55524c] text-sm md:text-base leading-relaxed">
                {commercialShoot.description}
              </p>
            </div>
            <div className="flex-shrink-0 pt-2 md:pt-0">
              <a href="#" className="inline-flex items-center text-xs tracking-[0.15em] text-[#a88655] font-semibold uppercase hover:text-[#8a6e45] transition-colors">
                Explore More 
                <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
