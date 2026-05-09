'use client';

import React from 'react';
import { Award, Handshake, Gem, Cpu, Warehouse, Map, ClipboardCheck, UserCheck, ShieldCheck, CheckCircle } from 'lucide-react';
import { Container, Section } from '../common/Layout';
import { Reveal, StaggerContainer, StaggerItem } from '../ui/Reveal';

const stats = [
  { val: "15+", label: "Years of Trust" },
  { val: "664+", label: "Locations" },
  { val: "88+", label: "Countries" },
  { val: "75+", label: "Branches" },
  { val: "65K+", label: "Annual Moves" },
  { val: "Expert", label: "Personnel" },
  { val: "1.5K+", label: "Elite Trucks" },
  { val: "GPS", label: "Monitored" }
];

const cards = [
  { icon: <Award size={48} />, title: "Precision Mastery", desc: "Decades of refined expertise distilled into every movement. We navigate the complexities of relocation with architectural precision." },
  { icon: <Handshake size={48} />, title: "Absolute Fidelity", desc: "Trust is the cornerstone of our service. We treat your heritage and possessions with the sanctity they deserve." },
  { icon: <Gem size={48} />, title: "Uncompromising Value", desc: "True luxury is value realized through excellence. We provide premium relocation experiences at a scale that remains attainable." }
];

const trustBadges = [
  { icon: <Cpu size={24} />, label: "Smart Tech" },
  { icon: <Warehouse size={24} />, label: "10L sq ft Storage" },
  { icon: <Map size={24} />, label: "Live Tracking" },
  { icon: <ClipboardCheck size={24} />, label: "White-Glove Survey" },
  { icon: <UserCheck size={24} />, label: "Move Concierge" },
  { icon: <ShieldCheck size={24} />, label: "IBA Approved" },
  { icon: <CheckCircle size={24} />, label: "ISO Certified" }
];

export const WhyChoose = () => {
  return (
    <Section className="bg-white">
      <Container>
        <div className="text-center mb-32 reveal">
          <span className="subtitle">The Assure Sift Standard</span>
          <h2 className="text-6xl lg:text-7xl font-display">Relocation Refined.</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-16 mb-48 reveal">
          {stats.map((s, i) => (
            <div key={i} className="text-center group">
              <h4 className="text-5xl lg:text-7xl text-accent mb-4 font-display transition-transform duration-700 group-hover:scale-110">{s.val}</h4>
              <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">{s.label}</p>
            </div>
          ))}
        </div>

        <StaggerContainer>
          <div className="grid lg:grid-cols-3 gap-16 mb-48">
            {cards.map((c, i) => (
              <StaggerItem key={i}>
                <div className="bg-bg-primary p-16 rounded-[48px] border-l-8 border-accent h-full hover:shadow-hover transition-premium group relative overflow-hidden">
                  {/* Subtle Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div className="text-accent mb-12 group-hover:translate-x-3 transition-transform duration-700">
                    {c.icon}
                  </div>
                  <h3 className="text-4xl mb-8 font-display">{c.title}</h3>
                  <p className="text-lg text-text-muted leading-[1.8] font-body font-light">{c.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <div className="flex flex-wrap justify-center gap-16 lg:gap-24 reveal opacity-60">
          {trustBadges.map((t, i) => (
            <div key={i} className="flex flex-col items-center gap-6 text-center group">
              <div className="text-accent/60 group-hover:text-accent transition-colors duration-500">{t.icon}</div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted">{t.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
