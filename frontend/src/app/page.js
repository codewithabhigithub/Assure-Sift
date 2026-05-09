'use client';

import React from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { FeaturesStrip } from '@/components/sections/FeaturesStrip';
import { ServicesQuote } from '@/components/sections/ServicesQuote';
import { WhyChoose } from '@/components/sections/WhyChoose';
import { AboutSection } from '@/components/sections/AboutSection';
import { TrackConsignment } from '@/components/sections/TrackConsignment';
import { ReliableSection } from '@/components/sections/ReliableSection';
import { Testimonials } from '@/components/sections/Testimonials';
import { ClientsMarquee, JoinUsBanner } from '@/components/sections/BrandFooter';
import { Footer } from '@/components/sections/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturesStrip />
      <ServicesQuote />
      <WhyChoose />
      <AboutSection />
      <TrackConsignment />
      <ReliableSection />
      <Testimonials />
      <ClientsMarquee />
      <JoinUsBanner />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
