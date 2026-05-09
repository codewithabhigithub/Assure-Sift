'use client';

import React, { useState } from 'react';
import { ChevronRight, Search, Activity, Box } from 'lucide-react';
import { Container, Section } from '../common/Layout';
import { Reveal } from '../ui/Reveal';

export const TrackConsignment = () => {
  const [ssonNumber, setSSONNumber] = useState('');

  return (
    <Section id="tracking" className="bg-bg-dark text-white overflow-hidden relative py-32">
      {/* Enhanced Atmospheric Depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/10 blur-[180px] rounded-full pointer-events-none opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none opacity-60"></div>
      </div>
      
      {/* Refined Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(196, 71, 42, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(196, 71, 42, 0.2) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal width="100%">
            <div className="flex flex-col items-center mb-16">
              <div className="flex items-center gap-3 text-accent mb-6">
                <Activity size={20} />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Live Consignment Monitoring</span>
              </div>
              <h2 className="text-4xl lg:text-[58px] text-white leading-[1.05] font-display">
                Trace Your <span className="text-accent italic">Heritage</span>
              </h2>
              <p className="text-white/40 text-lg mt-6 font-body font-light max-w-lg mx-auto">
                Enter your unique ID to visualize the real-time movement of your belongings across our network.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2} width="100%">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-transparent blur-2xl rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <div className="relative bg-white/5 p-10 lg:p-16 rounded-[40px] border border-white/10 backdrop-blur-3xl">
                <form className="flex flex-col md:flex-row gap-6">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      placeholder="Enter Consignment ID (AS-XXXX)"
                      className="w-full bg-white/5 border border-white/10 px-8 py-6 rounded-2xl text-white outline-none font-display text-2xl placeholder:text-white/10 focus:border-accent transition-all duration-500"
                      value={ssonNumber}
                      onChange={(e) => setSSONNumber(e.target.value)}
                    />
                    <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-white/10" size={24} />
                  </div>
                  
                  <button className="btn-primary py-6 px-12 flex items-center justify-center gap-4 group text-[10px] tracking-[0.2em] whitespace-nowrap">
                    Track Shipment <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-500" />
                  </button>
                </form>
                
                <div className="mt-10 flex justify-center items-center gap-10 opacity-20 text-[9px] font-bold uppercase tracking-[0.4em]">
                  <div className="flex items-center gap-2"><Box size={12} /> Encrypted</div>
                  <div className="w-[1px] h-3 bg-white/50"></div>
                  <div className="flex items-center gap-2">Satellite Linked</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
};
