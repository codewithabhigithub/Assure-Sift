'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '../common/Layout';
import { Users } from 'lucide-react';
import sbi from '@/assets/SBI BANK.png';
import ather from '@/assets/ather energy.png';
import psb from '@/assets/panjab_sindh_bank.png';

export const ClientsMarquee = () => {
  const logos = [
    { src: ather, alt: "ATHER" },
    { src: sbi, alt: "SBI" },
    { src: psb, alt: "Punjab & Sind Bank" },
    // Using text for missing logos
    { name: "UltraTech", isText: true },
    { name: "JK Paper", isText: true },
  ];

  return (
    <section className="bg-white py-[80px] overflow-hidden">
      <Container>
        <div className="mb-10">
          <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#C4472A]">TRUSTED BY</span>
          <h2 className="font-display font-bold text-[40px] text-[#1A1A2E] leading-tight mt-2">Our Clients</h2>
        </div>
      </Container>
      
      <div className="marquee-container relative mt-10">
        <div className="animate-marquee flex items-center">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              {logos.map((logo, idx) => (
                <div key={idx} className="mx-[40px] flex items-center justify-center h-[48px] grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  {logo.isText ? (
                    <span className="font-display font-bold text-[24px] text-[#1A1A2E] whitespace-nowrap">{logo.name}</span>
                  ) : (
                    <Image src={logo.src} alt={logo.alt} height={48} className="w-auto h-full object-contain" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const JoinUsBanner = () => {
  return (
    <div className="max-w-[1240px] mx-auto px-[40px] mb-[80px] pt-20">
      <div className="bg-[#C4472A] rounded-[16px] px-10 py-16 lg:px-20 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* LEFT */}
        <div className="hidden lg:block shrink-0 opacity-90">
          <Users size={64} className="text-white" strokeWidth={1.5} />
        </div>

        {/* CENTER */}
        <div className="text-center lg:text-left flex-1 max-w-[500px]">
          <h2 className="font-display font-bold text-[40px] text-white leading-tight mb-4">Let&apos;s Join Us</h2>
          <p className="font-body text-[15px] text-white/80 leading-[1.7]">
            Ready to take the next step in your career? Join us for growth, opportunities, and a supportive work environment. Be a part of our journey.
          </p>
        </div>

        {/* RIGHT */}
        <div className="shrink-0">
          <Link href="/contact_us" className="bg-white text-[#C4472A] font-body font-semibold text-[15px] px-[40px] py-[16px] rounded-[50px] hover:bg-white/90 transition-colors inline-block text-center">
            JOIN NOW →
          </Link>
        </div>

      </div>
    </div>
  );
};
