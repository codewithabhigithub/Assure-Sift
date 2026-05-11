'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about_us' },
  { name: 'Services', href: '/#services' },
  { name: 'Tracking', href: '/#tracking' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact Us', href: '/contact_us' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled
        ? 'bg-[#F8F6F2]/92 backdrop-blur-[16px] h-[72px] shadow-sm'
        : 'bg-transparent h-[72px]'
      }`}>
      <div className="max-w-[1240px] mx-auto h-full px-[40px] flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex flex-col">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4472A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <span className="font-display font-bold text-[22px] text-[#1A1A2E] leading-tight">Assure Sift Relocation</span>
          </div>
          <span className="font-body text-[9px] tracking-[0.15em] text-[#E8E4DC] ml-[32px] -mt-1 font-medium" style={{color:'#C4472A'}}>RELOCATION SERVICES</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-[32px]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-body font-medium text-[14px] text-[#1A1A2E] hover:text-[#C4472A] transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#C4472A] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link
            href="/#services"
            className="bg-[#C4472A] text-white font-body font-semibold text-[14px] px-[28px] py-[12px] rounded-[50px] hover:bg-[#A63A22] transition-colors flex items-center gap-2"
          >
            Get Free Quotation →
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-[#1A1A2E]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-x-0 top-[72px] bg-white z-[100] p-10 shadow-xl border-t border-[#E8E4DC]"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-2xl font-display font-bold text-[#1A1A2E] hover:text-[#C4472A] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/#services"
                  className="bg-[#C4472A] text-white text-center py-4 rounded-[50px] font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Free Quotation →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
