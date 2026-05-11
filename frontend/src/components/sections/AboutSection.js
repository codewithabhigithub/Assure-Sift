'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '../common/Layout';
import aboutImg1 from '@/assets/movers_packers.jpg';
import aboutImg2 from '@/assets/instruction.jpg';
import aboutImg3 from '@/assets/Deliver.jpeg';
import aboutImg4 from '@/assets/Convenience.jpeg';

export const AboutSection = () => {
  return (
    <section id="about" className="bg-[#F8F6F2] py-[100px]">
      <Container>
        <div className="grid lg:grid-cols-[48%_48%] gap-[64px] items-center">
          
          {/* LEFT — Image Mosaic */}
          <div className="grid grid-cols-2 gap-[12px]">
            <div className="flex flex-col gap-[12px]">
              <div className="relative h-[260px] rounded-[12px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <Image src={aboutImg1} alt="Mover" fill className="object-cover" />
              </div>
              <div className="relative h-[200px] rounded-[12px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <Image src={aboutImg2} alt="Packing" fill className="object-cover" />
              </div>
            </div>
            <div className="flex flex-col gap-[12px]">
              <div className="relative h-[228px] rounded-[12px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <Image src={aboutImg3} alt="Delivery" fill className="object-cover" />
              </div>
              <div className="relative h-[228px] rounded-[12px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <Image src={aboutImg4} alt="Logistics" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* RIGHT — Text */}
          <div className="flex flex-col items-start">
            <span className="font-body text-[10px] font-bold uppercase tracking-[0.15em] text-[#C4472A]">ASSURE SIFT RELOCATION SERVICES</span>
            <span className="font-body text-[13px] text-[#888] mt-1 mb-4">An ISO 9001:2008 & ISO 39001:2012 Certified Company</span>
            
            <h2 className="font-display font-bold text-[42px] text-[#1A1A2E] leading-[1.15] mb-6">
              India&apos;s Largest and Most Awarded Movers
            </h2>
            
            <div className="space-y-4 font-body text-[15px] text-[#555] leading-[1.85] mb-8">
              <p>
                Assure Sift Relocation has been a pioneer in the relocation industry for over 15 years, setting benchmarks in safety, efficiency, and customer satisfaction.
              </p>
              <p>
                We provide a comprehensive suite of relocation services, from household shifting to complex industrial moves, all handled with professional expertise and care.
              </p>
            </div>
            
            <a href="#" className="font-body font-medium text-[14px] text-[#C4472A] hover:underline mb-8">
              Read More →
            </a>
            
            <div className="flex flex-wrap gap-[10px]">
              {["📦 Consignee", "🏠 Self-Storage", "🔒 Safety & Security", "📋 Specialized Packing"].map((pill, i) => (
                <div key={i} className="bg-[#E8E4DC] rounded-[8px] px-[20px] py-[10px] font-body font-semibold text-[13px] text-[#1A1A2E]">
                  {pill}
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
