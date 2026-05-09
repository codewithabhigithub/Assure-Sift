'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Reveal = ({ children, delay = 0, width = "fit-content" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: delay, 
        ease: [0.4, 0, 0.2, 1] 
      }}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
      }}
    >
      {children}
    </motion.div>
  );
};
