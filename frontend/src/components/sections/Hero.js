'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Shield, Users } from 'lucide-react';
import { Container, Section } from '../common/Layout';
import { Reveal, StaggerContainer, StaggerItem } from '../ui/Reveal';
import banner from '@/assets/banner_img_1.svg';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-[120px] pb-[160px] overflow-hidden bg-bg-primary">
      {/* Editorial Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-stone/20 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
      
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-32 items-center">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-soft text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-12">
                <Users size={16} /> Trusted by 5,000+ Premium Clients
              </div>
            </Reveal>
            
            <Reveal delay={0.1}>
              <h1 className="text-7xl lg:text-[100px] leading-[0.9] mb-12 font-display">
                Your Trusted Partner<br />
                for Seamless <em className="text-accent not-italic font-display italic">Relocation</em>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl lg:text-2xl text-text-muted mb-16 font-body font-light leading-[1.8] max-w-xl">
                From Packing to Unpacking, We&apos;ve Got You Covered. Experience the Art of Effortless Moving.
              </p>
            </Reveal>

            <StaggerContainer delay={0.3}>
              <div className="flex flex-wrap gap-8 mb-24">
                <StaggerItem>
                  <button className="btn-primary py-6 px-12 text-sm">
                    Book Your Relocation <ArrowRight size={20} className="ml-3" />
                  </button>
                </StaggerItem>
                <StaggerItem>
                  <button className="btn-outline py-6 px-12 text-sm">
                    View Services
                  </button>
                </StaggerItem>
              </div>
              
              <div className="flex flex-wrap gap-16">
                <StaggerItem>
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Availability</span>
                    <span className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                      <Clock size={16} /> 24/7 Concierge
                    </span>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Reach</span>
                    <span className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                      <MapPin size={16} /> Pan India Network
                    </span>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Security</span>
                    <span className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                      <Shield size={16} /> Fully Insured
                    </span>
                  </div>
                </StaggerItem>
              </div>
            </StaggerContainer>
          </div>

          <motion.div 
            className="relative lg:h-[800px] w-full"
            initial={{ opacity: 0, scale: 0.9, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="relative h-full w-full rounded-[60px] overflow-hidden shadow-hover">
              <Image 
                src={banner} 
                alt="Relocation Services" 
                fill
                className="object-cover scale-110"
                priority
              />
              {/* Subtle Overlay for Cinematic Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/20 to-transparent"></div>
            </div>
            
            {/* Architectural Accent Card */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute -bottom-12 -left-12 bg-white p-12 rounded-[40px] shadow-hover flex items-center gap-8 z-10 hidden xl:flex border border-stone/30"
            >
              <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-white shadow-lg">
                <Shield size={32} />
              </div>
              <div>
                <strong className="block text-2xl font-display mb-1">Elite Standard</strong>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">Certified Mover & Packer</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

const Clock = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
