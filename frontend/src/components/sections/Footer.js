'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Container } from '../common/Layout';
import logo from '@/assets/logo white.png';

export const Footer = () => {
  return (
    <footer className="bg-bg-dark text-white pt-[100px] pb-[50px]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-[72px] mb-32">
          <div className="space-y-10">
            <Image src={logo} alt="Assure Sift" className="h-10 w-auto brightness-0 invert" />
            <p className="text-white/30 text-sm leading-[1.9] max-w-sm font-body font-light">
              Assure Sift is more than a relocation service. It is a commitment to the architectural preservation of your lifestyle during transition.
            </p>
            <div className="flex gap-6">
              {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-white/30 hover:bg-accent hover:border-accent hover:text-white transition-premium">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-accent text-[12px] font-bold tracking-[0.18em] uppercase mb-[24px]">Navigation</h4>
            <ul className="space-y-4 text-[14px] text-white/40 font-body leading-[1.9]">
              {['Home', 'About Us', 'Services', 'Tracking', 'Blog', 'Contact Us'].map(item => (
                <li key={item}><a href="#" className="hover:text-accent transition-colors duration-500">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-accent text-[12px] font-bold tracking-[0.18em] uppercase mb-[24px]">Organization</h4>
            <ul className="space-y-4 text-[14px] text-white/40 font-body leading-[1.9]">
              {['Our Team', 'Careers', 'Privacy Policy', 'Terms of Service'].map(item => (
                <li key={item}><a href="#" className="hover:text-accent transition-colors duration-500">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-accent text-[12px] font-bold tracking-[0.18em] uppercase mb-[24px]">Strategic HQ</h4>
            <div className="space-y-6 text-[14px] text-white/40 font-body leading-[1.9]">
              <div className="flex gap-4">
                <MapPin size={20} className="text-accent flex-shrink-0" />
                <span className="font-light">Plot No 46, Block-B, Najafgarh Road, Gopal Nagar, Jaipur, Rajasthan 302021</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-accent flex-shrink-0" />
                <a href="tel:+919073291732" className="hover:text-accent transition-colors duration-500">+91 90 732 91 732</a>
              </div>
              <div className="flex items-center gap-4">
                <Mail size={20} className="text-accent flex-shrink-0" />
                <a href="mailto:info@assuresift.in" className="hover:text-accent transition-colors duration-500">info@assuresift.in</a>
              </div>
              <div className="flex items-center gap-4">
                <Clock size={20} className="text-accent flex-shrink-0" />
                <span>Open 24 X 7 / Pan India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/10">
            © 2024 Assure Sift Relocation Service. All Rights Reserved.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-accent font-bold text-[10px] uppercase tracking-[0.3em] group"
          >
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-500" /> Back To Top
          </button>
        </div>
      </Container>
    </footer>
  );
};
