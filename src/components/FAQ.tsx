"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "How far in advance should we secure a booking?",
    answer: "For weekend dates during peak season (May through October), we recommend securing your commission 12 to 18 months in advance. Our calendar is strictly limited to ensure the highest level of artistic dedication to each client.\n\nFor intimate gatherings, elopements, or mid-week commissions, a 6-month lead time is generally sufficient. A signed agreement and retainer are required to reserve your date on our calendar."
  },
  {
    question: "Do you travel for destination commissions?",
    answer: "Yes, we frequently travel for destination weddings and elopements worldwide. Custom collections are available to include travel accommodations."
  },
  {
    question: "What is the timeline for receiving the final gallery?",
    answer: "You will receive a preview gallery within 48 hours. The complete, curated final gallery will be delivered within 6 to 8 weeks depending on the season."
  },
  {
    question: "How do you approach inclement weather?",
    answer: "We embrace weather as part of your story. We always come prepared with clear umbrellas and creative indoor/sheltered alternatives to ensure beautiful portraits regardless of the forecast."
  },
  {
    question: "Can we customize our coverage collection?",
    answer: "Absolutely. We offer bespoke collections tailored to your specific events, timeline, and deliverables."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqItems, setFaqItems] = useState<any[]>(faqs);

  useEffect(() => {
    async function loadFAQs() {
      try {
        const res = await fetch('/api/admin/faq');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            // Sort by display order
            const sorted = data.sort((a: any, b: any) => a.displayOrder - b.displayOrder);
            setFaqItems(sorted);
          }
        }
      } catch (err) {
        console.error("Failed to load FAQs dynamically:", err);
      }
    }
    loadFAQs();
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#f5f2eb] text-[#2c2a26] py-24 px-6 md:px-12 lg:px-24 font-sans border-t border-[#e8e4db]">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-2xl mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#3a3731] mb-6 leading-tight">
            Frequently Asked<br />Questions
          </h2>
          <p className="text-[#6b675e] text-base md:text-lg font-serif">
            Find quick answers to common inquiries regarding booking,<br className="hidden md:block" />
            timelines, and the curatorial process of our photographic services.
          </p>
        </div>

        {/* FAQs List */}
        <div className="w-full flex flex-col gap-4">
          {faqItems.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-[#e8e4db] overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              >
                <button
                  className="w-full px-6 py-6 md:px-8 md:py-8 flex items-center justify-between focus:outline-none text-left"
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="text-xl md:text-2xl font-serif text-[#3a3731] pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-[#f0ece1] text-[#6b675e] rounded-lg flex items-center justify-center text-xl font-light">
                    {isOpen ? '−' : '+'}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0">
                        {faq.answer.split('\n\n').map((paragraph: string, pIndex: number) => (
                          <p key={pIndex} className="text-[#6b675e] text-sm md:text-base leading-relaxed mb-4 last:mb-0 max-w-3xl">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
