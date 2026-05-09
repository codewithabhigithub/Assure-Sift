'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';
import { Container } from '../common/Layout';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about_us' },
  { name: 'Services', href: '/#services' },
  { name: 'Tracking', href: '/#tracking' },
  { name: 'Blog', href: '/blog' },
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
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <Container className="flex items-center justify-between">
        <Link href="/" className="relative z-[110]">
          <Image src={logo} alt="Assure Sift" className="h-10 w-auto" priority />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="px-5 py-2 text-[13px] font-bold uppercase tracking-widest text-text-dark hover:text-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-1/2"></span>
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link href="/#quote" className="btn-primary py-3 px-8 text-sm">
            Get Free Quotation
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden relative z-[110] p-2 text-text-dark"
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
              className="fixed inset-0 bg-white z-[100] pt-32 px-10"
            >
              <div className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="text-3xl font-display font-bold text-text-dark hover:text-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link 
                  href="/#quote" 
                  className="btn-primary w-full text-center py-5 text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Free Quotation
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </nav>
  );
};
