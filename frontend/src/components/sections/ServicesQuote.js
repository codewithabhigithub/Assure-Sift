'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, Building2, Package, Truck, 
  Warehouse, ShieldCheck, MapPin, 
  Settings, Clock, Briefcase, Globe, Headphones 
} from 'lucide-react';
import { Container } from '../common/Layout';

const services = [
  { icon: Home, title: "Household Shifting" },
  { icon: Building2, title: "Office Shifting" },
  { icon: Package, title: "Local Relocation" },
  { icon: Truck, title: "Car Shifting" },
  { icon: Warehouse, title: "Warehousing" },
  { icon: ShieldCheck, title: "Transit Insurance" },
  { icon: MapPin, title: "Domestic Shifting" },
  { icon: Briefcase, title: "Commercial Moving" },
  { icon: Clock, title: "Quick Move" },
  { icon: Settings, title: "Fine Art Moving" },
  { icon: Globe, title: "Int'l Shifting" },
  { icon: Headphones, title: "24/7 Support" }
];

export const ServicesQuote = () => {
  return (
    <section id="services" className="bg-[#F8F6F2] py-24">
      <div className="max-container">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12">
          
          {/* LEFT: Services Grid */}
          <div>
            <div className="mb-10">
              <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#C4472A]">OUR SERVICES</span>
              <h2 className="font-display font-bold text-4xl text-[#1A1A2E] mt-2 leading-tight">Our Services</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {services.map((s, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-5 flex flex-col items-center justify-center gap-4 shadow-sm border border-[#E8E4DC]/50 min-h-[140px]"
                >
                  <div className="w-12 h-12 rounded-full bg-[#F8F6F2] flex items-center justify-center text-[#C4472A]">
                    <s.icon size={24} />
                  </div>
                  <h4 className="service-card-label font-body font-semibold text-[#1A1A2E]">
                    {s.title}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: Quote Form */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#E8E4DC]">
              <h3 className="font-display font-bold text-2xl text-[#1A1A2E] mb-2">Get a Free Moving Quote</h3>
              <p className="font-body text-sm text-[#777] mb-8">Fill the form below to receive a personalized quote.</p>
              
              <form className="space-y-6">
                <input type="text" placeholder="Full Name" className="w-full border-b border-[#E8E4DC] py-2 focus:border-[#C4472A] outline-none font-body text-sm transition-colors" />
                <input type="email" placeholder="Email Address" className="w-full border-b border-[#E8E4DC] py-2 focus:border-[#C4472A] outline-none font-body text-sm transition-colors" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="From City" className="w-full border-b border-[#E8E4DC] py-2 focus:border-[#C4472A] outline-none font-body text-sm transition-colors" />
                  <input type="text" placeholder="To City" className="w-full border-b border-[#E8E4DC] py-2 focus:border-[#C4472A] outline-none font-body text-sm transition-colors" />
                </div>
                <input type="tel" placeholder="Phone Number" className="w-full border-b border-[#E8E4DC] py-2 focus:border-[#C4472A] outline-none font-body text-sm transition-colors" />
                
                <button className="w-full bg-[#C4472A] text-white font-semibold py-4 rounded-full mt-4 hover:bg-[#A63A22] transition-colors shadow-lg shadow-[#C4472A]/20">
                  Get Free Quote →
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
