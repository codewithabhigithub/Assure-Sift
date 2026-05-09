'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, Globe, Car, Bike, Lock, Palette, ShoppingBag, Truck, RotateCcw, ArrowRight } from 'lucide-react';
import { Container, Section } from '../common/Layout';
import { Reveal, StaggerContainer, StaggerItem } from '../ui/Reveal';

const services = [
  { icon: <Home size={28} />, name: "Household Moving" },
  { icon: <Building2 size={28} />, name: "Office Moving" },
  { icon: <Globe size={28} />, name: "International Moving" },
  { icon: <Car size={28} />, name: "Car Moving" },
  { icon: <Bike size={28} />, name: "Bike Moving" },
  { icon: <Lock size={28} />, name: "Secure Storage" },
  { icon: <Palette size={28} />, name: "Fine Arts Moving" },
  { icon: <ShoppingBag size={28} />, name: "Commercial Moving" },
  { icon: <Truck size={28} />, name: "Courier" },
  { icon: <Truck size={28} />, name: "Truck Rental" },
  { icon: <Truck size={28} />, name: "Last Mile Delivery" },
  { icon: <Truck size={28} />, name: "ODC Consignment" },
];

export const ServicesQuote = () => {
  return (
    <Section id="services" className="bg-bg-primary overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-24 reveal">
          <div className="max-w-2xl">
            <span className="subtitle">Luxury Logistics Solutions</span>
            <h2 className="text-4xl lg:text-[58px] leading-[1.05] font-display">Crafting Seamless Transitions</h2>
          </div>
          <Link href="#" className="flex items-center gap-3 text-accent font-bold group text-[10px] uppercase tracking-[0.2em]">
            Explore All Services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-[1fr_0.85fr] gap-20 lg:gap-32 items-start">
          <StaggerContainer>
            <div className="grid grid-cols-2 gap-6">
              {services.map((service, i) => (
                <StaggerItem key={i}>
                  <motion.div 
                    whileHover={{ y: -6, backgroundColor: '#C4472A', color: '#FFFFFF' }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="bg-white p-10 rounded-[32px] shadow-soft flex flex-col items-center gap-8 text-center group transition-colors duration-500 border border-stone/10"
                  >
                    <div className="text-accent group-hover:text-white transition-colors duration-500">
                      {service.icon}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] px-2">{service.name}</span>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          <Reveal delay={0.2} width="100%">
            <div className="bg-white p-12 lg:p-20 rounded-[40px] shadow-hover border border-stone/10 sticky top-32">
              <div className="mb-12">
                <span className="subtitle">Instant Response</span>
                <h3 className="text-4xl lg:text-[48px] mb-6 leading-[1.05] font-display">
                  Request Your <br />
                  <span className="text-accent italic font-display">Bespoke</span> Quote
                </h3>
                <p className="text-text-muted font-light text-sm max-w-[320px]">Experience relocation handled with the precision of a fine watch.</p>
              </div>
              
              <div className="space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted px-1">Full Name</label>
                    <input type="text" placeholder="Johnathan Doe" className="w-full bg-stone/5 border-b border-stone/30 px-4 py-4 focus:border-accent outline-none transition-colors font-body text-base rounded-t-xl" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted px-1">Contact Number</label>
                    <input type="tel" placeholder="+91 0000 000 000" className="w-full bg-stone/5 border-b border-stone/30 px-4 py-4 focus:border-accent outline-none transition-colors font-body text-base rounded-t-xl" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted px-1">Origin City</label>
                  <select className="w-full bg-stone/5 border-b border-stone/30 px-4 py-4 focus:border-accent outline-none transition-colors font-body text-base rounded-t-xl appearance-none cursor-pointer">
                    <option value="">Select Origin</option>
                    <option value="jaipur">Jaipur (HQ)</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted px-1">Destination City</label>
                  <select className="w-full bg-stone/5 border-b border-stone/30 px-4 py-4 focus:border-accent outline-none transition-colors font-body text-base rounded-t-xl appearance-none cursor-pointer">
                    <option value="">Select Destination</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="pune">Pune</option>
                  </select>
                </div>
                
                <div className="pt-8 flex flex-col sm:flex-row items-center gap-8">
                  <button className="btn-primary flex-1 w-full py-5 text-[11px] tracking-[0.2em]">Initiate Concierge Request</button>
                  <button className="text-text-muted hover:text-accent transition-colors flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em]">
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
};

const Link = ({ children, href, className }) => <a href={href} className={className}>{children}</a>;
