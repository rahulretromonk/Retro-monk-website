"use client";
import React, { useEffect, useState, useRef } from 'react';

const AnimatedNumber = ({ end, duration = 2000 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    const element = ref.current;
    
    const startAnimation = () => {
      let start = 0;
      const increment = end / (duration / 16);
      
      const animate = () => {
        start += increment;
        if (start < end) {
          setCount(Math.ceil(start));
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      requestAnimationFrame(animate);
    };

    if (element) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(element);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
};

const ImageGroup = () => (
  <div className="flex flex-col gap-1">
    {/* Top image */}
    <div className="w-full h-40 bg-gray-300 shrink-0">
      <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" alt="Portrait" className="w-full h-full object-cover object-top" />
    </div>
    {/* Middle 1 */}
    <div className="w-full h-32 bg-gray-400 shrink-0">
      <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800" alt="Wedding Couple" className="w-full h-full object-cover" />
    </div>
    {/* Middle 2 */}
    <div className="w-full h-32 bg-gray-500 shrink-0">
      <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800" alt="Landscape" className="w-full h-full object-cover" />
    </div>
    {/* Bottom row */}
    <div className="flex gap-1 h-32 shrink-0">
      <div className="w-1/3 bg-gray-600">
        <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400" alt="Behind the scenes 1" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/3 bg-gray-700">
        <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=400" alt="Behind the scenes 2" className="w-full h-full object-cover" />
      </div>
      <div className="w-1/3 bg-gray-800">
        <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=400" alt="Behind the scenes 3" className="w-full h-full object-cover" />
      </div>
    </div>
  </div>
);

export const About = () => {
  return (
    <section className="bg-[#FAF9F5] text-[#2c2a26] py-16 px-6 md:px-12 lg:px-24 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
        {/* Left Side: Images */}
        <div className="w-full md:w-5/12 flex flex-col items-center">
          <div className="bg-[#e9e3d5] p-3 rounded-2xl shadow-xl w-full max-w-[450px]">
             <div className="rounded-xl overflow-hidden h-[556px] relative">
                <style>{`
                  @keyframes scrollVertical {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                  }
                  .animate-scroll-vertical {
                    animation: scrollVertical 30s linear infinite;
                  }
                `}</style>
                <div className="flex flex-col gap-1 animate-scroll-vertical">
                  <ImageGroup />
                  <ImageGroup />
                </div>
             </div>
          </div>
        </div>

        {/* Right Side: Text */}
        <div className="w-full md:w-7/12 flex flex-col pt-4 md:pt-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#3a3731] mb-6 leading-[1.15]">
            Every Photograph<br />Begins With A Story
          </h2>
          <p className="text-[#55524c] text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
            We believe that the most profound images are born from quiet
            observation rather than staged direction. Our approach is rooted in
            a documentary ethos—capturing the authentic, the imperfect, and
            the fleetingly beautiful. We seek the nuanced emotions that
            define your narrative, preserving them with an editorial eye and
            timeless craftsmanship.
          </p>

          <div className="mb-10">
            <h3 className="text-5xl text-[#a88655] mb-2" style={{ fontFamily: 'cursive' }}>Rahul</h3>
            <p className="text-xs tracking-[0.15em] text-[#55524c] font-semibold uppercase">Founder & Lead Photographer</p>
          </div>

          <div className="flex justify-between items-start flex-wrap gap-y-8 gap-x-4">
            <div className="text-center w-[45%] md:w-auto">
              <p className="text-4xl lg:text-5xl font-serif text-[#a88655] mb-2"><AnimatedNumber end={10} />+</p>
              <p className="text-[11px] tracking-widest text-[#55524c] font-medium uppercase leading-snug">Years<br/>Experience</p>
            </div>
            <div className="text-center w-[45%] md:w-auto">
              <p className="text-4xl lg:text-5xl font-serif text-[#a88655] mb-2"><AnimatedNumber end={500} />+</p>
              <p className="text-[11px] tracking-widest text-[#55524c] font-medium uppercase leading-snug">Happy<br/>Clients</p>
            </div>
            <div className="text-center w-[45%] md:w-auto">
              <p className="text-4xl lg:text-5xl font-serif text-[#a88655] mb-2"><AnimatedNumber end={40} />+</p>
              <p className="text-[11px] tracking-widest text-[#55524c] font-medium uppercase leading-snug">Awards</p>
            </div>
            <div className="text-center w-[45%] md:w-auto">
              <p className="text-4xl lg:text-5xl font-serif text-[#a88655] mb-2"><AnimatedNumber end={25} />+</p>
              <p className="text-[11px] tracking-widest text-[#55524c] font-medium uppercase leading-snug">Destinations<br/>Covered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
