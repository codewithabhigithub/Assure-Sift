'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '../common/Layout';
// import courierMan from '@/assets/movers_packers.jpg';
import moving from '@/assets/moving.png';

export const ReliableSection = () => {
  return (
    <section className="bg-white py-[100px] relative overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-[48%_48%] gap-[64px] items-center">
          
          {/* LEFT */}
          <div className="relative">
            <div className="relative w-full h-[500px] rounded-[16px] overflow-hidden">
              <Image 
                src={moving} 
                alt="Reliable Moving Services" 
                fill
                className="object-cover"
              />
              
              {/* Overlapping Badge */}
              <div className="absolute bottom-[24px] left-[24px] bg-white/95 backdrop-blur-sm rounded-[12px] px-[20px] py-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
                <span className="font-body font-semibold text-[13px] text-[#C4472A]">ASSURE SIFT</span>
              </div>
            </div>

            {/* FLOATING STAT CARD */}
            <div className="absolute -bottom-10 -right-10 lg:bottom-10 lg:-right-12 bg-white rounded-[16px] p-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.1)] text-center border-[2px] border-dashed border-[#E8E4DC] min-w-[180px] z-20">
              <h4 className="font-display font-bold text-[48px] text-[#C4472A] leading-tight">100%</h4>
              <p className="font-body text-[14px] text-[#1A1A2E] leading-[1.5]">Satisfaction<br />Guaranteed</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-start">
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#C4472A] mb-2">WHY WE&apos;RE BEST</span>
            <h2 className="font-display font-bold text-[42px] text-[#1A1A2E] leading-tight mb-6">
              Reliable and Efficient Moving Services
            </h2>
            <p className="font-body text-[15px] text-[#555] leading-[1.85] mb-8">
              At Assure Sift, we understand that moving is more than just transporting items—it&apos;s about transitioning your life. Our team of professionals is dedicated to ensuring a stress-free experience with maximum safety and precision.
            </p>
            <button className="bg-[#C4472A] text-white font-body font-semibold text-[15px] px-[32px] py-[14px] rounded-[50px] hover:bg-[#A63A22] transition-colors">
              Book Now →
            </button>
          </div>

        </div>
      </Container>
    </section>
  );
};
