'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container, Section } from '../common/Layout';
import { Reveal } from '../ui/Reveal';
import aboutImg from '@/assets/movers_packers.jpg';

export const AboutSection = () => {
  return (
    <Section id="about" className="bg-bg-primary overflow-hidden pb-32">
      <Container>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-32 items-center">
          <div className="relative reveal">
            <div className="relative rounded-[40px] overflow-hidden shadow-hover aspect-[4/5]">
              <Image 
                src={aboutImg} 
                alt="Our Heritage" 
                fill
                className="object-cover scale-105 hover:scale-110 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-accent/5 mix-blend-overlay"></div>
            </div>
            
            {/* Editorial Floating Credentials */}
            <div className="absolute -right-10 top-1/3 space-y-4 hidden xl:block">
              <div className="bg-white px-8 py-5 rounded-[24px] shadow-hover text-[10px] font-bold uppercase tracking-[0.3em] text-accent border border-stone/20 flex items-center gap-4">
                ISO 9001:2015
              </div>
              <div className="bg-white px-8 py-5 rounded-[24px] shadow-hover text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted border border-stone/20 flex items-center gap-4">
                IBA Approved
              </div>
            </div>
          </div>

          <div className="reveal">
            <span className="subtitle">The Assure Sift Heritage</span>
            <div className="max-w-[520px]">
              <h2 className="text-4xl lg:text-[58px] mb-10 leading-[0.95] font-display">
                India&apos;s Largest <br />
                & Most Awarded <br />
                Relocation Group
              </h2>
            </div>
            
            <div className="space-y-8 text-text-muted leading-[1.85] font-body font-light text-base max-w-xl">
              <p>
                Assure Sift has been a trusted name in the logistics and relocation industry for over 15 years. Built on the principles of precision, hospitality, and unwavering safety.
              </p>
              <p>
                Our philosophy is simple: relocation is not just about moving objects; it is about moving lives. We treat every piece of furniture as an artifact and every transition as a new chapter.
              </p>
            </div>

            <button className="flex items-center gap-4 text-accent font-bold mt-12 group text-[10px] uppercase tracking-[0.3em]">
              Our Heritage Story <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
};
