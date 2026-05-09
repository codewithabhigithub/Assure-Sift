import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoWhite from '@/assets/logo white.png';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaHeart, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-bg-dark text-white pb-10 pt-24 mt-24">
            <div className="container mx-auto px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_0.6fr_0.6fr_1fr] gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link href="/">
                            <Image className="h-10 w-auto brightness-0 invert" src={logoWhite} alt="Assure Sift Logo" />
                        </Link>
                        <p className="text-white/60 text-sm leading-loose max-w-xs font-body">
                            Welcome to Assure Sift, your trusted partner for all your packing and moving needs. We are committed to providing reliable, efficient, and affordable relocation services.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: <FaFacebookF />, href: "https://www.facebook.com/profile.php?id=61559606034810" },
                                { icon: <FaInstagram />, href: "https://www.instagram.com/sure.shift/" },
                                { icon: <FaTwitter />, href: "https://x.com/Sure_Shift" },
                                { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/company/sureshift/" }
                            ].map((social, i) => (
                                <a 
                                    key={i} 
                                    href={social.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-premium"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-accent text-sm font-bold tracking-widest uppercase mb-8">Quick Links</h4>
                        <ul className='space-y-4 text-sm text-white/60 font-body'>
                            <li><Link href="/" className="hover:text-accent transition-premium">Home</Link></li>
                            <li><Link href="/about_us" className="hover:text-accent transition-premium">About Us</Link></li>
                            <li><Link href="/#services" className="hover:text-accent transition-premium">Services</Link></li>
                            <li><Link href="/#tracking" className="hover:text-accent transition-premium">Tracking</Link></li>
                            <li><Link href="/blog" className="hover:text-accent transition-premium">Blog</Link></li>
                            <li><Link href="/contact_us" className="hover:text-accent transition-premium">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-accent text-sm font-bold tracking-widest uppercase mb-8">Company</h4>
                        <ul className='space-y-4 text-sm text-white/60 font-body'>
                            <li><Link href="/" className="hover:text-accent transition-premium">Team</Link></li>
                            <li><Link href="/" className="hover:text-accent transition-premium">Career</Link></li>
                            <li><Link href="/privacy" className="hover:text-accent transition-premium">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-accent transition-premium">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-accent text-sm font-bold tracking-widest uppercase mb-8">Head Office</h4>
                        <div className="space-y-6 text-sm text-white/60 font-body">
                            <div className="flex gap-4">
                                <FaMapMarkerAlt className="text-accent mt-1 flex-shrink-0" />
                                <span>Plot No 46, Block-B, Najafgarh Road, Gopal Nagar, Jaipur, Rajasthan 302021</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <FaPhoneAlt className="text-accent flex-shrink-0" />
                                <a href="tel:+919073291732" className="hover:text-accent transition-premium">+91 90 732 91 732</a>
                            </div>
                            <div className="flex items-center gap-4">
                                <FaEnvelope className="text-accent flex-shrink-0" />
                                <a href="mailto:info@assuresift.in" className="hover:text-accent transition-premium">info@assuresift.in</a>
                            </div>
                            <div className="flex items-center gap-4">
                                <FaClock className="text-accent flex-shrink-0" />
                                <span>(Mon to Sun) 24 X 7</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className='text-white/40 text-xs font-body'>
                        © 2024 Assure Sift Relocation Service. All Rights Reserved.
                    </p>
                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center gap-2 text-accent hover:text-white transition-premium font-bold text-xs uppercase tracking-widest"
                    >
                        <FaArrowUp />
                        Back To Top
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
