'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, Building2, Package, Truck, 
  Warehouse, ShieldCheck, MapPin, 
  Settings, Clock, Briefcase, Globe, Car, Bike
} from 'lucide-react';
import UserForm2 from '../UserForm2';

const servicesList = [
  { id: 'household', icon: Home, title: "Household Moving" },
  { id: 'office', icon: Building2, title: "Office Moving" },
  { id: 'international', icon: Globe, title: "International Moving" },
  { id: 'car', icon: Car, title: "Car Moving" },
  { id: 'bike', icon: Bike, title: "Bike Moving" },
  { id: 'secure', icon: Warehouse, title: "Secure Storage" },
  { id: 'fine_arts', icon: Settings, title: "Fine Arts Moving" },
  { id: 'commercial', icon: Briefcase, title: "Commercial Moving" },
  { id: 'courier', icon: Package, title: "Courier" },
  { id: 'truck', icon: Truck, title: "Truck Rental" },
  { id: 'last_mile', icon: MapPin, title: "Last Mile Delivery" },
  { id: 'odc_consignment', icon: ShieldCheck, title: "ODC Consignment" }
];

export const ServicesQuote = () => {
  const [selectedService, setSelectedService] = useState('household');

  return (
    <section id="services" className="bg-[#F8F6F2] py-24">
      <div className="max-container">
        {/* Section Header */}
        <div className="mb-10 lg:mb-14 text-center max-w-2xl mx-auto">
          <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#C4472A]">OUR SERVICES</span>
          <h2 className="font-display font-bold text-4xl text-[#1A1A2E] mt-2 leading-tight">Our Premium Services</h2>
          <p className="font-body text-[#777] mt-4 text-sm">Select a service below to get an instant, personalized quote for your exact requirements.</p>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12">
          
          {/* LEFT: Services Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 h-fit content-start self-start">
            {servicesList.map((s) => (
              <motion.div 
                key={s.id}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedService(s.id)}
                className={`rounded-2xl p-5 flex flex-col items-center justify-center gap-4 shadow-sm border min-h-[140px] cursor-pointer transition-all duration-300 ${
                  selectedService === s.id 
                  ? 'bg-[#C4472A]/10 border-[#C4472A] scale-[1.02] shadow-md' 
                  : 'bg-white border-[#E8E4DC]/50 hover:border-[#C4472A]/30 hover:shadow-md'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  selectedService === s.id ? 'bg-[#C4472A] text-white shadow-lg' : 'bg-[#F8F6F2] text-[#C4472A]'
                }`}>
                  <s.icon size={26} strokeWidth={1.5} />
                </div>
                <h4 className={`font-body font-semibold text-center text-sm leading-snug ${
                  selectedService === s.id ? 'text-[#C4472A]' : 'text-[#1A1A2E]'
                }`}>
                  {s.title}
                </h4>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Quote Form */}
          <div className="lg:sticky lg:top-24 w-full">
            <UserForm2 selectedService={selectedService} compact={true} />
          </div>

        </div>
      </div>
    </section>
  );
};
