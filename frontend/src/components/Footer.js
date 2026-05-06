import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoWhite from '@/assets/logo white.png';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaHeart, FaArrowCircleUp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#0E2334] text-white pb-10 pt-16 lg:mt-[120px] mt-[50px]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 lg:w-[80%]">
                <div className="flex flex-wrap justify-between gap-10 lg:gap-0">
                    {/* Brand Section */}
                    <div className="w-full md:w-1/3 lg:w-[280px] space-y-6">
                        <Link href="/">
                            <Image className="w-[120px] h-auto" src={logoWhite} alt="Sure Shift Logo" />
                        </Link>
                        <p className="text-gray-300 leading-relaxed">
                            Sure Shift Relocation Services provides reliable and efficient relocation services, ensuring your move is smooth and hassle-free. Trust us to handle your belongings with care and professionalism.
                        </p>
                        <div className="flex space-x-4">
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
                                    className="bg-brand hover:bg-brand-dark transition-all-custom flex justify-center items-center rounded-full h-10 w-10 shadow-lg"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Useful Links */}
                    <div className="w-[45%] md:w-1/6">
                        <h3 className="font-bold mb-6 text-brand tracking-wider">USEFUL LINK</h3>
                        <ul className='space-y-4 text-gray-300'>
                            <li><Link href="/about_us" className="hover:text-brand transition-colors">About</Link></li>
                            <li><Link href="/#contact" className="hover:text-brand transition-colors">Services</Link></li>
                            <li><Link href="/#tracking" className="hover:text-brand transition-colors">Tracking</Link></li>
                            <li><Link href="/login" className="hover:text-brand transition-colors">Admin Login</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="w-[45%] md:w-1/6">
                        <h3 className="font-bold mb-6 text-brand tracking-wider">COMPANY</h3>
                        <ul className='space-y-4 text-gray-300'>
                            <li><Link href="/" className="hover:text-brand transition-colors">Team</Link></li>
                            <li><Link href="/" className="hover:text-brand transition-colors">Career</Link></li>
                            <li><Link href="/blog" className="hover:text-brand transition-colors">Blog</Link></li>
                            <li><Link href="/contact_us" className="hover:text-brand transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="w-full md:w-1/4 space-y-6">
                        <h3 className="font-bold mb-6 text-brand tracking-wider">CONTACT</h3>
                        <div className="space-y-4 text-gray-300">
                            <p className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-brand mt-1 flex-shrink-0" />
                                <span>Gopal Nagar Extn, New Delhi, 110043</span>
                            </p>
                            <p className="flex items-center gap-3">
                                <FaPhoneAlt className="text-brand flex-shrink-0" />
                                <a href="tel:+919073291732" className="hover:text-brand transition-colors">90 732 91 732</a>
                            </p>
                            <p className="flex items-center gap-3">
                                <FaEnvelope className="text-brand flex-shrink-0" />
                                <a href="mailto:info@sureshift.in" className="hover:text-brand transition-colors">info@sureshift.in</a>
                            </p>
                            <p className="flex items-center gap-3">
                                <FaClock className="text-brand flex-shrink-0" />
                                <span>(Mon to Sun) 24 X 7</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-16 pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className='text-gray-400 text-sm md:text-base'>
                        © 2024 Sure Shift Relocation Service. Made with <FaHeart className="inline text-brand mx-1" /> in India. 
                        Developed by <a href="https://creatorsadda.com/" target="_blank" rel="noopener noreferrer" className='hover:text-brand font-semibold'>Creators Adda.</a>
                    </p>
                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center gap-2 text-brand hover:text-white transition-all-custom font-bold group"
                    >
                        <FaArrowCircleUp className="text-xl group-hover:-translate-y-1 transition-transform" />
                        <span>Back To Top</span>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
