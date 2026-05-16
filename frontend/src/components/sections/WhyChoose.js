'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Handshake, Gem } from 'lucide-react';

const Counter = ({ value }) => {
  const [count, setCount] = React.useState(0);
  const countRef = React.useRef(null);
  const target = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

const stats = [
  { val: "15+", label: "Years of Trust" },
  { val: "664+", label: "Locations" },
  { val: "88", label: "Worldwide" },
  { val: "70+", label: "Branches" },
  { val: "60000+", label: "Moves Yearly" },
  { val: "Trained", label: "Manpower" },
  { val: "1600+", label: "Trucks" },
  { val: "900+", label: "GPS Enabled" }
];

const cards = [
  { title: "Experience", icon: Award, desc: "Years of industry-leading expertise in complex relocation challenges." },
  { title: "Reliability", icon: Handshake, desc: "Your trust is our priority. Every item is handled with professional care." },
  { title: "Affordability", icon: Gem, desc: "Competitive rates without compromising on premium quality services." }
];

export const WhyChoose = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-container">
        <div className="mb-12">
          <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#C4472A]">WHY CHOOSE ASSURE SIFT RELOCATION?</span>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-20 border-b border-[#E8E4DC] pb-12">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <h4 className="font-display font-bold text-4xl lg:text-5xl text-[#C4472A] leading-tight mb-2">
                {/[0-9]/.test(s.val) ? <Counter value={s.val} /> : s.val}
              </h4>
              <p className="font-body text-[11px] text-[#888] uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 ">
          {cards.map((c, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-[#F8F6F2] border-l-4 border-[#C4472A] rounded-r-xl p-8 shadow-sm  flex justify-center flex-col items-center"
            >
              <div className="text-[#C4472A] mb-4 ">
                <c.icon size={32} />
              </div>
              <h3 className="font-display font-bold text-xl text-[#1A1A2E] mb-3">{c.title}</h3>
              <p className="font-body text-sm text-[#666] leading-relaxed text-center">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
