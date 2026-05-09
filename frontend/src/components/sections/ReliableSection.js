'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Award, Heart } from 'lucide-react';
import { Container, Section } from '../common/Layout';
import { Reveal, StaggerContainer, StaggerItem } from '../ui/Reveal';
import courierMan from '@/assets/courier_man.webp';

export const ReliableSection = () => {
  return (
    <Section className="bg-white py-32">
      <Container>
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <div className="relative reveal order-2 lg:order-1">
            <div className="relative rounded-[40px] overflow-hidden shadow-hover aspect-square max-w-[560px] mx-auto lg:mx-0">
              <Image 
                src={courierMan} 
                alt="Elite Reliability" 
                fill
                className="object-cover scale-100 group-hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-stone/5 mix-blend-multiply"></div>
            </div>
            
            {/* Refined Satisfaction Seal */}
            <div className="absolute top-1/2 -right-12 -translate-y-1/2 w-48 h-48 bg-white rounded-full border border-stone/50 border-dashed flex flex-col items-center justify-center text-center p-8 shadow-lg hidden xl:flex">
              <div className="relative group">
                <Heart size={32} className="text-accent/20 mb-3 group-hover:scale-110 transition-transform duration-700" fill="currentColor" />
                <span className="block text-3xl font-display text-accent mb-1">100%</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] leading-relaxed text-text-muted">Satisfaction <br /> Guaranteed</span>
              </div>
            </div>
          </div>

          <div className="reveal order-1 lg:order-2">
            <span className="subtitle">Operational Excellence</span>
            <div className="max-w-[480px]">
              <h2 className="text-4xl lg:text-[58px] mb-10 leading-[1.05] font-display">
                Reliability <br />
                as a <span className="text-accent italic font-display">Philosophy</span>
              </h2>
            </div>
            <p className="text-base lg:text-lg text-text-muted mb-12 font-body font-light leading-[1.85] max-w-[480px]">
              Our bespoke relocation methodology ensures that every detail, from the first consultation to the final placement, is executed with the quiet confidence of industry masters.
            </p>
            
            <StaggerContainer>
              <div className="grid grid-cols-2 gap-10 mb-12 max-w-[480px]">
                <StaggerItem>
                  <div className="flex flex-col gap-3">
                    <ShieldCheck size={28} className="text-accent" />
                    <h4 className="text-lg font-display">Global Protection</h4>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted">IBA Approved Standard</p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex flex-col gap-3">
                    <Award size={28} className="text-accent" />
                    <h4 className="text-lg font-display">Elite Personnel</h4>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted">Certified Master Packers</p>
                  </div>
                </StaggerItem>
              </div>
            </StaggerContainer>

            <button className="btn-primary py-5 px-10 text-[10px] tracking-[0.2em] flex items-center gap-3">
              Begin Your Journey <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
};
