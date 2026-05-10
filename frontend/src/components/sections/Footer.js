'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-[#1A1A2E] text-white pt-[80px] pb-0">
      <div className="max-w-[1240px] mx-auto px-[40px]">
        <div className="grid grid-cols-1 lg:grid-cols-[30%_20%_20%_30%] gap-10">
          
          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex flex-col">
              <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4472A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <span className="font-display font-bold text-[22px] text-white leading-tight">Assure Sift</span>
              </div>
            </Link>
            <p className="font-body text-[13px] text-white/55 leading-[1.9] max-w-[260px]">
              Assure Sift is committed to providing seamless and reliable relocation services across India and worldwide.
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#C4472A] hover:border-[#C4472A] transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="font-body text-[10px] font-bold uppercase tracking-[0.15em] text-white/35 mb-6">QUICK LINKS</h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'Home', href: 'https://www.assuresift.com/' },
                { name: 'About Us', href: 'https://www.assuresift.com/' },
                { name: 'Our Services', href: 'https://www.assuresift.com/' },
                { name: 'Gallery', href: 'https://www.assuresift.com/' },
                { name: 'Contact Us', href: 'https://www.assuresift.com/' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="font-body text-[14px] text-white/65 hover:text-white transition-colors leading-[2.2]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h4 className="font-body text-[10px] font-bold uppercase tracking-[0.15em] text-white/35 mb-6">COMPANY</h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'Team', href: '#' },
                { name: 'Career', href: '#' },
                { name: 'Blog', href: '/blog' },
                { name: 'Admin Login', href: '/login' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="font-body text-[14px] text-white/65 hover:text-white transition-colors leading-[2.2]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="font-body text-[10px] font-bold uppercase tracking-[0.15em] text-white/35 mb-6">CONTACT INFORMATION</h4>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 items-start">
                <MapPin size={16} className="text-[#C4472A] mt-1 shrink-0" />
                <span className="font-body text-[13px] text-white/65 leading-[1.7]">House No. 14, Ganesh Nagar-17, Niwaru Road, Jhotwara, Jaipur, Rajasthan 302012</span>
              </div>
              <div className="flex gap-3 items-start">
                <Phone size={16} className="text-[#C4472A] mt-1 shrink-0" />
                <span className="font-body text-[13px] text-white/65 leading-[1.7]">+91 90 732 91 732<br />+91 90 732 91 732</span>
              </div>
              <div className="flex gap-3 items-start">
                <Mail size={16} className="text-[#C4472A] mt-1 shrink-0" />
                <span className="font-body text-[13px] text-white/65 leading-[1.7]">info@assuresift.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-[60px] py-[24px] border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-[12px] text-white/35">
            © 2026 Assure Sift Relocation Services. All Rights Reserved.
          </p>
          <span className="font-body text-[12px] text-white/35 uppercase tracking-[0.06em]">
            Mon – Sun Open 24 Hours
          </span>
        </div>
      </div>
    </footer>
  );
};
