'use client';

import React from 'react';
import Image from 'next/image';
import { Container, Section } from '../common/Layout';
import { Reveal } from '../ui/Reveal';
import sbi from '@/assets/SBI BANK.png';
import ather from '@/assets/ather energy.png';
import psb from '@/assets/panjab_sindh_bank.png';

export const ClientsMarquee = () => {
  return (
    <Section className="bg-white border-t border-stone/50 overflow-hidden py-32">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 mb-0 reveal">
          <div className="max-w-md text-center lg:text-left">
            <span className="subtitle">Global Affiliations</span>
            <h2 className="text-3xl lg:text-4xl uppercase font-display leading-tight mb-4">Esteemed Partners</h2>
            <p className="text-base text-text-muted font-body font-light">
              Collaborating with India&apos;s leading institutions to define luxury logistics.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-20 opacity-40 hover:opacity-100 transition-opacity duration-1000">
             <Image src={sbi} alt="SBI" className="h-20 w-auto grayscale hover:grayscale-0 transition-premium" />
             <Image src={ather} alt="Ather" className="h-20 w-auto grayscale hover:grayscale-0 transition-premium" />
             <Image src={psb} alt="PSB" className="h-20 w-auto grayscale hover:grayscale-0 transition-premium" />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export const JoinUsBanner = () => {
  return (
    <div className="container pb-32">
      <Reveal width="100%">
        <div className="bg-accent rounded-[40px] px-10 py-20 lg:px-20 lg:py-24 text-center text-white relative overflow-hidden group shadow-lg max-w-[960px] mx-auto min-h-[340px] flex flex-col items-center justify-center">
          {/* Subtle Atmospheric Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_0%,transparent_70%)] opacity-0 group-hover:opacity-5 transition-opacity duration-1000"></div>
          
          <div className="relative z-10 w-full max-w-[760px] mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60 mb-6 block">Career Opportunities</span>
            <h2 className="text-4xl lg:text-[58px] text-white leading-[1.05] font-display">
              Collaborate With Us
            </h2>
            <p className="text-lg lg:text-xl mt-6 opacity-80 leading-relaxed font-body font-light max-w-[540px] mx-auto">
              Join the elite team redefining the architectural standards of relocation in India.
            </p>
            <div className="mt-[28px]">
              <button className="bg-white text-accent px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-premium shadow-xl">
                Initiate Application
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};
