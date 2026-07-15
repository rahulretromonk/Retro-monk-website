import React from 'react';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Portfolio } from '@/components/Portfolio';
import { Services } from '@/components/Services';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
