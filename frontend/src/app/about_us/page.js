'use client';

import React from 'react';
import Image from 'next/image';
import { 
  FaShieldAlt, FaMapMarkerAlt, FaGlobe, FaBuilding, FaTruckMoving, 
  FaUsers, FaTruck, FaMapMarkedAlt, FaLightbulb, FaWarehouse, 
  FaSearchLocation, FaClipboardCheck, FaUser, FaCertificate, FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container, Section } from "@/components/common/Layout";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/WhatsAppButton";

// Assets
import IBA from '@/assets/iba.svg';
import ISO from '@/assets/iso.svg';
import movers_packers from '@/assets/movers_packers.jpg';

const stats = [
  { icon: <FaShieldAlt />, text: "15+ Years of Trust" },
  { icon: <FaMapMarkerAlt />, text: "664+ Locations" },
  { icon: <FaGlobe />, text: "88 Countries" },
  { icon: <FaBuilding />, text: "75+ Branches" },
  { icon: <FaTruckMoving />, text: "65K+ Moves" },
  { icon: <FaUsers />, text: "Trained Personnel" },
  { icon: <FaTruck />, text: "1500+ Trucks" },
  { icon: <FaMapMarkedAlt />, text: "GPS Enabled" },
  { icon: <FaLightbulb />, text: "Smart Tech" },
  { icon: <FaWarehouse />, text: "10L sq. ft Space" },
];

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Navbar />
      
      {/* Cinematic Hero */}
      <section className="relative min-h-[60vh] flex items-center pt-[120px] overflow-hidden bg-bg-dark text-white">
        <div className="absolute inset-0 opacity-40">
          <Image src={movers_packers} alt="Background" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/80 to-transparent"></div>
        <Container className="relative z-10">
          <Reveal>
            <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">Our Legacy</span>
            <h1 className="text-6xl lg:text-[88px] font-display leading-[1.05] mb-8">
              Relocating the <br />
              <span className="text-accent italic">Future</span> of Living
            </h1>
            <p className="text-lg lg:text-xl text-white/60 font-body font-light leading-relaxed max-w-2xl">
              Sure Shift is a leading relocation services provider specializing in comprehensive, stress-free moving experiences across India and the globe.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Philosophy Section */}
      <Section className="bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <Reveal>
              <span className="subtitle">The Assure Sift Philosophy</span>
              <h2 className="text-4xl lg:text-[58px] font-display leading-[1.05] mb-10">
                A Vision for <br />
                Refined Logistics
              </h2>
              <div className="space-y-8 text-text-muted text-lg leading-relaxed font-body font-light">
                <p>
                  Established with a vision to redefine logistics, Sure Shift has become a trusted name in Gurgaon and beyond. We understand that every move is unique, which is why we offer personalized solutions that prioritize the safety and security of your assets.
                </p>
                <p>
                  We don't just move objects; we move the foundations of your next chapter. Our heritage is built on the quiet confidence of industry masters who treat every artifact with sanctity.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-12 mt-16 pt-12 border-t border-stone/30">
                <div>
                  <h4 className="text-4xl font-display text-accent mb-2">157k+</h4>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Happy Clients</p>
                </div>
                <div>
                  <h4 className="text-4xl font-display text-accent mb-2">664+</h4>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Global Cities</p>
                </div>
              </div>
            </Reveal>
            
            <div className="relative reveal">
              <div className="relative rounded-[40px] overflow-hidden shadow-hover aspect-[4/5] lg:aspect-square">
                <Image src={movers_packers} alt="Team" fill className="object-cover scale-105" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-accent p-12 rounded-[32px] text-white shadow-xl hidden xl:block">
                <FaCertificate size={32} className="mb-4" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Verified</p>
                <p className="text-lg font-display">IBA Approved</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Heritage Grid */}
      <Section className="bg-bg-primary">
        <Container>
          <div className="text-center mb-24">
            <span className="subtitle">Why Choose the Assure Standard?</span>
            <h2 className="text-4xl lg:text-[58px] font-display">Relocation Refined.</h2>
          </div>
          
          <StaggerContainer>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
              {stats.map((s, i) => (
                <StaggerItem key={i}>
                  <div className="bg-white p-10 rounded-[32px] shadow-soft border border-stone/10 text-center flex flex-col items-center gap-6 group hover:shadow-hover transition-premium">
                    <div className="text-accent/60 group-hover:text-accent transition-colors duration-500 text-3xl">
                      {s.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                      {s.text}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </Section>

      {/* ISO Certification Bar */}
      <Section className="bg-bg-dark text-white text-center">
        <Container>
          <Reveal>
            <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32">
              <div className="flex items-center gap-6">
                <Image src={IBA} alt="IBA" className="h-16 w-auto brightness-0 invert opacity-40" />
                <div className="text-left border-l border-white/10 pl-6">
                  <p className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase">IBA Approved</p>
                  <p className="text-white/40 text-sm font-light">Indian Banks Association</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <Image src={ISO} alt="ISO" className="h-16 w-auto brightness-0 invert opacity-40" />
                <div className="text-left border-l border-white/10 pl-6">
                  <p className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase">ISO Certified</p>
                  <p className="text-white/40 text-sm font-light">9001:2015 & 39001:2012</p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
