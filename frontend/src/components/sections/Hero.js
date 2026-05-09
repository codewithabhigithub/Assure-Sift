'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import banner from '@/assets/banner_img_1.svg';

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] bg-[#F8F6F2] pt-32 pb-20 flex items-center overflow-hidden">
      <div className="max-container w-full grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column */}
        <div className="flex flex-col items-start z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#E8E4DC] px-4 py-1.5 rounded-full mb-6"
          >
            <span className="text-xs font-semibold text-[#1A1A2E]">🚚 Trusted by 5000+ Clients</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-[#1A1A2E] mb-6"
          >
            Your Trusted Partner<br />
            for Seamless <span className="italic text-[#C4472A]">Relocation</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-base md:text-lg text-[#555] leading-relaxed max-w-lg mb-10"
          >
            From Packing to Unpacking, We&apos;ve Got You Covered. Discover Assure Sift Today.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <button className="bg-[#C4472A] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#A63A22] transition-colors shadow-lg shadow-[#C4472A]/20">
              Book Now →
            </button>
            <button className="bg-transparent border-2 border-[#1A1A2E] text-[#1A1A2E] font-semibold px-8 py-3.5 rounded-full hover:bg-[#1A1A2E] hover:text-white transition-all">
              Learn More →
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[#555] text-sm"
          >
            <div className="flex items-center gap-2"><span>⏱</span> Available 24/7</div>
            <div className="hidden sm:block w-px h-4 bg-[#E8E4DC]"></div>
            <div className="flex items-center gap-2"><span>📍</span> Pan India Coverage</div>
            <div className="hidden sm:block w-px h-4 bg-[#E8E4DC]"></div>
            <div className="flex items-center gap-2"><span>✓</span> Safe & Secure</div>
          </motion.div>
        </div>

        {/* Right Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[400px] lg:h-[600px] flex items-center justify-center"
        >
          <div className="relative w-full h-full">
            <Image 
              src={banner} 
              alt="Assure Sift Relocation" 
              className="object-contain w-full h-full"
              priority
            />
            
            <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 bg-white shadow-xl rounded-xl px-5 py-3 border border-[#E8E4DC]">
              <span className="font-body font-semibold text-sm text-[#1A1A2E]">✓ Moving Made Easy</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
