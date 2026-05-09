'use client';

import React from 'react';
import { Zap, Shield, Package, Wallet } from 'lucide-react';
import { Container, Section } from '../common/Layout';
import { StaggerContainer, StaggerItem } from '../ui/Reveal';

const features = [
  { icon: <Zap size={32} />, title: "Faster", desc: "Swift & Efficient Execution" },
  { icon: <Shield size={32} />, title: "Reliable", desc: "Top-Tier Trust Standards" },
  { icon: <Package size={32} />, title: "Safe", desc: "Premium Goods Protection" },
  { icon: <Wallet size={32} />, title: "Affordable", desc: "Value-Driven Excellence" }
];

export const FeaturesStrip = () => {
  return (
    <Section className="py-24 bg-white border-y border-stone/50">
      <Container>
        <StaggerContainer>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-0">
            {features.map((f, i) => (
              <StaggerItem key={i}>
                <div className={`flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-8 px-12 ${i !== 3 ? 'lg:border-r border-stone/30' : ''}`}>
                  <div className="text-accent bg-accent/5 p-4 rounded-2xl">{f.icon}</div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display">{f.title}</h3>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">{f.desc}</p>
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
