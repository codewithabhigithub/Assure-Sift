'use client';

import React, { useState } from 'react';
import { Package } from 'lucide-react';
import { Container } from '../common/Layout';

export const TrackConsignment = () => {
  const [ssonNumber, setSSONNumber] = useState('');

  return (
    <section id="tracking" className="bg-[#1A1A2E] py-[80px] relative overflow-hidden">
      {/* Optional: subtle white dot-grid background at 4% opacity */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <Container>
        <div className="max-w-[700px] mx-auto text-center relative z-10">
          <div className="flex flex-col items-center mb-6">
            <Package size={48} className="text-[#C4472A] mb-4" strokeWidth={1.5} />
            <h2 className="font-display font-bold text-[44px] text-white leading-tight mb-3">
              Track Your Consignment
            </h2>
            <p className="font-body text-[16px] text-white/65 leading-[1.7]">
              Track your shipment instantly. Enter your Consignment Number for real-time updates.
            </p>
          </div>

          <form className="flex mt-9">
            <input 
              type="text" 
              placeholder="Enter your Consignment Number"
              className="flex-1 h-[56px] rounded-l-[50px] px-[24px] bg-white border-none font-body text-[15px] text-[#1A1A2E] outline-none placeholder:text-[#aaa]"
              value={ssonNumber}
              onChange={(e) => setSSONNumber(e.target.value)}
            />
            <button className="bg-[#C4472A] text-white h-[56px] px-[32px] rounded-r-[50px] font-body font-semibold text-[15px] hover:bg-[#A63A22] transition-colors whitespace-nowrap">
              Track Now →
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};
