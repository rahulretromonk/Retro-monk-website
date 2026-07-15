"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const Contact = () => {
  return (
    <section className="bg-[#f5f2eb] text-[#2c2a26] py-24 px-6 md:px-12 lg:px-24 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-2xl mb-20">
          <p className="text-xs md:text-sm tracking-[0.15em] text-[#a88655] font-bold uppercase mb-4">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#3a3731] mb-6 leading-tight">
            Let's Tell Your Story
          </h2>
          <p className="text-[#6b675e] text-base md:text-lg font-serif">
            We believe in capturing genuine moments. Reach out to discuss your<br className="hidden md:block" />
            upcoming project, wedding, or editorial commission.
          </p>
        </div>

        {/* Content */}
        <div className="w-full flex flex-col lg:flex-row gap-16 lg:gap-24 justify-center items-start">
          
          {/* Left Column: Contact Info */}
          <div className="w-full lg:w-5/12 flex flex-col pt-4">
            
            <div className="flex items-start mb-8">
              <svg className="w-5 h-5 text-[#a88655] mt-0.5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-[10px] tracking-widest text-[#3a3731] font-bold uppercase mb-1">Email</p>
                <a href="mailto:retromonk@gmail.com" className="text-[#6b675e] text-sm hover:text-[#a88655] transition-colors">
                  retromonk@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start mb-12">
              <svg className="w-5 h-5 text-[#a88655] mt-0.5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p className="text-[10px] tracking-widest text-[#3a3731] font-bold uppercase mb-1">Phone</p>
                <a href="tel:+919789091854" className="text-[#6b675e] text-sm hover:text-[#a88655] transition-colors">
                  +91 9789091854
                </a>
              </div>
            </div>

            <div className="w-full h-px bg-[#e8e4db] mb-8"></div>

            <p className="font-serif italic text-[#3a3731] text-lg">
              "Every great story begins with hello."
            </p>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div 
            className="w-full lg:w-7/12 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#e8e4db]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <form className="flex flex-col gap-8">
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col w-full md:w-1/2 group">
                  <label htmlFor="fullName" className="text-[10px] tracking-widest text-[#6b675e] font-bold uppercase mb-2">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    id="fullName" 
                    placeholder="Jane Doe" 
                    className="w-full bg-transparent border-b border-[#e8e4db] py-2 text-sm text-[#3a3731] placeholder-[#b5b1a8] focus:outline-none focus:border-[#a88655] transition-colors"
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/2 group">
                  <label htmlFor="phoneNumber" className="text-[10px] tracking-widest text-[#6b675e] font-bold uppercase mb-2">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    id="phoneNumber" 
                    placeholder="+1 (555) 000-0000" 
                    className="w-full bg-transparent border-b border-[#e8e4db] py-2 text-sm text-[#3a3731] placeholder-[#b5b1a8] focus:outline-none focus:border-[#a88655] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col w-full group">
                <label htmlFor="email" className="text-[10px] tracking-widest text-[#6b675e] font-bold uppercase mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="jane@example.com" 
                  className="w-full bg-transparent border-b border-[#e8e4db] py-2 text-sm text-[#3a3731] placeholder-[#b5b1a8] focus:outline-none focus:border-[#a88655] transition-colors"
                />
              </div>

              <div className="flex flex-col w-full group mb-6">
                <label htmlFor="details" className="text-[10px] tracking-widest text-[#6b675e] font-bold uppercase mb-2">
                  Event Details & Dates
                </label>
                <textarea 
                  id="details" 
                  placeholder="Tell us about your vision, proposed dates, and any specific locations..." 
                  rows={3}
                  className="w-full bg-transparent border-b border-[#e8e4db] py-2 text-sm text-[#3a3731] placeholder-[#b5b1a8] focus:outline-none focus:border-[#a88655] transition-colors resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full border border-[#3a3731] text-[#3a3731] text-[10px] tracking-widest font-bold uppercase py-4 rounded-xl hover:bg-[#3a3731] hover:text-white transition-colors"
              >
                Book Your Session
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
