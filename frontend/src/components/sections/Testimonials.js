'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { Container, Section } from '../common/Layout';
import { Reveal, StaggerContainer, StaggerItem } from '../ui/Reveal';
import abhishek from '@/assets/abhishek.png';
import amit from '@/assets/amit.png';
import kapil from '@/assets/kapil.png';

const testimonials = [
  {
    text: "The transition was handled with the grace and precision one expects from a world-class hospitality brand. Every artifact arrived in pristine condition.",
    name: "Abhishek Gupta",
    role: "CEO, Tech Horizon",
    image: abhishek
  },
  {
    text: "Truly the most refined relocation experience I have encountered. Their personnel are masters of their craft, and the process was entirely effortless.",
    name: "Amit Kumar",
    role: "Director, Global Foods",
    image: amit
  },
  {
    text: "They treat logistics like a fine art. The attention to detail and proactive communication set a new standard for relocation services.",
    name: "Kapil Kumar",
    role: "Founder, K.M. Manufacturing",
    image: kapil
  }
];

export const Testimonials = () => {
  return (
    <Section className="bg-bg-primary py-32">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 reveal">
          <div className="max-w-2xl">
            <span className="subtitle">Client Testimonies</span>
            <h2 className="text-4xl lg:text-[58px] font-display leading-[1.05]">Voices of Distinction</h2>
          </div>
          <p className="text-base text-text-muted font-body font-light max-w-[320px]">Shared by those who settle for nothing less than perfection.</p>
        </div>

        <StaggerContainer>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <div className="bg-white p-8 rounded-[32px] shadow-soft hover:shadow-hover transition-premium h-full flex flex-col border border-stone/10 min-w-[320px]">
                  <div className="text-accent opacity-[0.12] mb-6">
                    <Quote size={56} />
                  </div>
                  <p className="text-[15px] text-text-dark italic font-display mb-10 flex-grow leading-[1.75]">
                    &quot;{t.text}&quot;
                  </p>
                  <div className="flex gap-1 text-accent mb-6">
                    {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                  </div>
                  <div className="flex items-center gap-[10px] pt-6 border-t border-stone/20 mt-22">
                    <div className="relative w-14 h-14">
                      <Image src={t.image} alt={t.name} fill className="rounded-full grayscale hover:grayscale-0 transition-all duration-700 object-cover border border-stone/50" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-widest">{t.name}</h4>
                      <p className="text-[9px] text-accent font-bold uppercase tracking-[0.2em] mt-1">{t.role}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </Container>
    </Section>
  );
};
