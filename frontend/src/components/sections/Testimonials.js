'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Layout';

const testimonials = [
  {
    text: "The transition was handled with grace and precision. Every item arrived in pristine condition, and the team was incredibly professional.",
    name: "Abhishek Gupta",
    company: "Tech Horizon",
    initials: "AG"
  },
  {
    text: "Truly the most refined relocation experience I have encountered. Their personnel are masters of their craft, and the process was effortless.",
    name: "Amit Kumar",
    company: "Global Foods",
    initials: "AK"
  },
  {
    text: "They treat logistics like a fine art. The attention to detail and proactive communication set a new standard for relocation services.",
    name: "Kapil Kumar",
    company: "K.M. Manufacturing",
    initials: "KK"
  }
];

export const Testimonials = () => {
  return (
    <section className="bg-[#F8F6F2] py-[100px]">
      <Container>
        <div className="mb-12">
          <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#C4472A]">TESTIMONIALS</span>
          <h2 className="font-display font-bold text-[44px] text-[#1A1A2E] mt-2 leading-tight">What They Say About Us</h2>
          <p className="font-body text-[15px] text-[#888] mt-2">Read what our satisfied clients have to say about our services.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px]">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-[16px] p-[36px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] relative overflow-hidden group transition-all"
            >
              {/* Quote Mark */}
              <div className="absolute top-[16px] left-[20px] font-display text-[80px] text-[#C4472A] opacity-[0.12] leading-none pointer-events-none">
                &quot;
              </div>
              
              <p className="font-body text-[15px] text-[#444] leading-[1.8] mb-6 relative z-10 testimonial-body">
                {t.text}
              </p>
              
              <div className="flex gap-1 text-[#C4472A] text-[14px] mb-5">
                ★★★★★
              </div>
              
              <div className="flex items-center gap-[14px] pt-5 border-t border-[#E8E4DC]">
                <div className="w-[44px] h-[44px] rounded-full bg-[#E8E4DC] flex items-center justify-center">
                  <span className="font-display font-semibold text-[18px] text-[#C4472A]">{t.initials}</span>
                </div>
                <div>
                  <h4 className="font-body font-semibold text-[15px] text-[#1A1A2E] leading-tight">{t.name}</h4>
                  <p className="font-body text-[13px] text-[#888]">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
