'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Package, Wallet } from 'lucide-react';

const features = [
  { icon: <Zap size={40} />, title: "Faster", desc: "Swift and efficient relocation services tailored to your schedule." },
  { icon: <Shield size={40} />, title: "Reliable", desc: "Your trust is our priority. We handle your belongings with care." },
  { icon: <Package size={40} />, title: "Safe", desc: "State-of-the-art packing techniques for maximum protection." },
  { icon: <Wallet size={40} />, title: "Affordable", desc: "Competitive pricing without compromising on service quality." }
];

export const FeaturesStrip = () => {
  return (
    <section className="bg-white py-[60px]">
      <div className="max-w-[1240px] mx-auto px-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[40px]">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="text-[#C4472A]">
                {React.cloneElement(feature.icon, { strokeWidth: 1.5 })}
              </div>
              <h3 className="font-body font-semibold text-[16px] text-[#1A1A2E] mt-4">
                {feature.title}
              </h3>
              <p className="font-body text-[13px] text-[#888] mt-2 line-height-[1.7] text-center">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
