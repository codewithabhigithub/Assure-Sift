'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    MapPin, 
    Building2, 
    Phone, 
    Clock, 
    Mail 
} from 'lucide-react';
import { motion } from 'framer-motion';

import api from '@/services/api';
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/common/Layout";
import WhatsAppButton from "@/components/WhatsAppButton";

const CONTACT_OPTIONS = [
    { id: 1, label: "General Inquiry" },
    { id: 2, label: "Feedback" },
    { id: 3, label: "Support" },
    { id: 4, label: "Get a Quote" }
];

export default function ContactUsPage() {
    const [formData, setFormData] = useState({ 
        name: "", 
        email: "", 
        phone: "",
        message: "" 
    });
    const [selectedOption, setSelectedOption] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleReset = () => {
        setFormData({ name: "", email: "", phone: "", message: "" });
        setSelectedOption("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const updatedFormData = {
            ...formData,
            purpose: selectedOption || 'General Inquiry'
        };

        try {
            await api.post('/contact', updatedFormData);
            alert('Your message has been sent successfully. We will get back to you soon!');
            handleReset();
        } catch (error) {
            console.error('Error submitting contact form:', error);
            alert('Failed to send message. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#F8F6F2]">
            <Navbar />

            {/* SECTION 1 — PAGE HERO BANNER */}
            <section className="bg-[#F8F6F2] h-[280px] pt-[72px] flex flex-col items-center justify-center text-center">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#C4472A]">
                            GET IN TOUCH
                        </span>
                        <h1 className="font-display font-bold text-[60px] text-[#1A1A2E] mt-[8px] leading-none">
                            Contact Us
                        </h1>
                        <p className="font-body text-[16px] text-[#777] max-w-[500px] mx-auto mt-[12px] leading-relaxed">
                            We&apos;re here to help with your move. Reach out and our team will respond within 24 hours.
                        </p>
                        <nav className="font-body text-[13px] text-[#aaa] mt-4 flex justify-center gap-2">
                            <Link href="/" className="hover:text-[#C4472A] transition-colors">Home</Link>
                            <span>→</span>
                            <span className="text-[#1A1A2E]">Contact Us</span>
                        </nav>
                    </motion.div>
                </Container>
            </section>

            {/* SECTION 2 — CONTACT INFO CARDS ROW */}
            <section className="bg-white py-[60px]">
                <Container className="max-w-[1240px]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
                        {/* Card 1 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[16px] shadow-[0_2px_24px_rgba(0,0,0,0.07)] p-[36px_32px] text-center border-t-[3px] border-[#C4472A] flex flex-col items-center"
                        >
                            <MapPin size={32} className="text-[#C4472A] stroke-[1.5]" />
                            <h3 className="font-body font-semibold text-[15px] text-[#1A1A2E] mt-[16px]">Head Office</h3>
                            <p className="font-body text-[14px] text-[#666] leading-[1.8] mt-2">
                                House No. 14, Ganesh Nagar-17,<br/>
                                Niwaru Road, Jhotwara,<br/>
                                Jaipur, Rajasthan 302012
                            </p>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-[16px] shadow-[0_2px_24px_rgba(0,0,0,0.07)] p-[36px_32px] text-center border-t-[3px] border-[#C4472A] flex flex-col items-center"
                        >
                            <Building2 size={32} className="text-[#C4472A] stroke-[1.5]" />
                            <h3 className="font-body font-semibold text-[15px] text-[#1A1A2E] mt-[16px]">Branch Office</h3>
                            <p className="font-body text-[14px] text-[#666] leading-[1.8] mt-2">
                                263/827, Sector-26,<br/>
                                Opposite Unique Tower,<br/>
                                Pratap Nagar, Jaipur 302033
                            </p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-[16px] shadow-[0_2px_24px_rgba(0,0,0,0.07)] p-[36px_32px] text-center border-t-[3px] border-[#C4472A] flex flex-col items-center"
                        >
                            <Phone size={32} className="text-[#C4472A] stroke-[1.5]" />
                            <h3 className="font-body font-semibold text-[15px] text-[#1A1A2E] mt-[16px]">Call & Email</h3>
                            <p className="font-body text-[14px] text-[#666] leading-[1.8] mt-2">
                                +91-8619771107<br/>
                                +91-7014329644<br/>
                                info@assuresift.com
                            </p>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* SECTION 3 — FORM + SIDEBAR */}
            <section className="bg-[#F8F6F2] py-[80px]">
                <Container className="max-w-[1240px]">
                    <div className="grid lg:grid-cols-[58%_38%] gap-[48px] items-start">
                        
                        {/* LEFT — Contact Form Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[20px] p-[48px] shadow-[0_8px_48px_rgba(0,0,0,0.09)]"
                        >
                            <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#C4472A]">
                                SEND US A MESSAGE
                            </span>
                            <h2 className="font-display font-bold text-[36px] text-[#1A1A2E] mt-[8px] leading-tight">
                                We&apos;d Love to Hear From You
                            </h2>
                            <p className="font-body text-[14px] text-[#777] mt-[8px] mb-[32px]">
                                Fill out the form and our team will get back to you within 24 hours.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                                    <div className="flex flex-col">
                                        <label htmlFor="name" className="font-body font-semibold text-[11px] uppercase tracking-[0.08em] text-[#999] mb-[6px]">Full Name</label>
                                        <input 
                                            type="text" 
                                            id="name" 
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your Full Name" 
                                            className="w-full bg-transparent border-b-[1.5px] border-[#E8E4DC] py-[12px] px-[4px] font-body text-[15px] text-[#1A1A2E] focus:border-[#C4472A] outline-none rounded-none transition-colors"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="email" className="font-body font-semibold text-[11px] uppercase tracking-[0.08em] text-[#999] mb-[6px]">Email Address</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="you@example.com" 
                                            className="w-full bg-transparent border-b-[1.5px] border-[#E8E4DC] py-[12px] px-[4px] font-body text-[15px] text-[#1A1A2E] focus:border-[#C4472A] outline-none rounded-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                                    <div className="flex flex-col">
                                        <label htmlFor="phone" className="font-body font-semibold text-[11px] uppercase tracking-[0.08em] text-[#999] mb-[6px]">Phone Number</label>
                                        <input 
                                            type="tel" 
                                            id="phone" 
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91" 
                                            className="w-full bg-transparent border-b-[1.5px] border-[#E8E4DC] py-[12px] px-[4px] font-body text-[15px] text-[#1A1A2E] focus:border-[#C4472A] outline-none rounded-none transition-colors"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                    <label htmlFor="purpose" className="font-body font-semibold text-[11px] uppercase tracking-[0.08em] text-[#999] mb-[6px]">Purpose of Contact</label>
                                    <select 
                                        id="purpose"
                                        value={selectedOption}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                        className="w-full bg-transparent border-b-[1.5px] border-[#E8E4DC] py-[12px] px-[4px] font-body text-[15px] text-[#1A1A2E] focus:border-[#C4472A] outline-none rounded-none transition-colors cursor-pointer"
                                    >
                                        <option value="" disabled>Select a purpose</option>
                                        {CONTACT_OPTIONS.map(opt => (
                                            <option key={opt.id} value={opt.label}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                                </div>


                                <div className="flex flex-col">
                                    <label htmlFor="message" className="font-body font-semibold text-[11px] uppercase tracking-[0.08em] text-[#999] mb-[6px]">Your Message</label>
                                    <textarea 
                                        id="message" 
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="How can we help you?" 
                                        className="w-full bg-transparent border-b-[1.5px] border-[#E8E4DC] py-[12px] px-[4px] font-body text-[15px] text-[#1A1A2E] focus:border-[#C4472A] outline-none rounded-none transition-colors resize-none"
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="w-full bg-[#C4472A] text-white rounded-[50px] py-[16px] font-body font-semibold text-[15px] tracking-[0.04em] hover:bg-[#a83820] transition-colors disabled:opacity-50 mt-[24px]"
                                >
                                    {isLoading ? "Sending..." : "Send Message →"}
                                </button>
                                
                                <button 
                                    type="button" 
                                    onClick={handleReset}
                                    className="block w-full text-center mt-[12px] font-body text-[13px] text-[#aaa] underline hover:text-[#1A1A2E] transition-colors"
                                >
                                    Reset Form
                                </button>
                            </form>
                        </motion.div>

                        {/* RIGHT — Sidebar */}
                        <motion.div 
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="lg:sticky lg:top-[100px] flex flex-col gap-[20px]"
                        >
                            {/* Card 1 — Working Hours */}
                            <div className="bg-[#1A1A2E] rounded-[16px] p-[32px]">
                                <Clock size={28} className="text-[#C4472A] stroke-[1.5]" />
                                <h3 className="font-body font-semibold text-[16px] text-white mt-[12px] mb-[16px]">Working Hours</h3>
                                
                                <div className="flex justify-between items-center py-[12px] border-b border-white/10">
                                    <span className="font-body text-[13px] text-white/65">Monday – Saturday</span>
                                    <span className="font-body text-[13px] text-white/65">9:00 AM – 7:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center py-[12px] border-b border-white/10">
                                    <span className="font-body text-[13px] text-white/65">Sunday</span>
                                    <span className="font-body text-[13px] text-white/65">10:00 AM – 4:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center py-[12px]">
                                    <span className="font-body text-[13px] text-white/65">Emergency Support</span>
                                    <span className="font-body text-[13px] font-semibold text-[#C4472A]">24 / 7</span>
                                </div>
                            </div>

                            {/* Card 2 — Quick Connect */}
                            <div className="bg-white rounded-[16px] p-[32px] shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
                                <h3 className="font-body font-semibold text-[15px] text-[#1A1A2E] mb-[16px]">Quick Connect</h3>
                                <a 
                                    href="tel:+918619771107" 
                                    className="block w-full text-center border-[1.5px] border-[#C4472A] text-[#C4472A] rounded-[50px] py-[12px] font-body font-medium text-[14px] hover:bg-[#C4472A] hover:text-white transition-colors"
                                >
                                    📞 Call Now
                                </a>
                                <a 
                                    href="mailto:info@assuresift.com" 
                                    className="block w-full text-center bg-[#1A1A2E] text-white rounded-[50px] py-[12px] font-body font-medium text-[14px] hover:bg-[#2a2a3e] transition-colors mt-[12px]"
                                >
                                    ✉ Email Us
                                </a>
                            </div>
                        </motion.div>

                    </div>
                </Container>
            </section>

            {/* SECTION 4 — MAP */}
            <section className="bg-white">
                <div className="bg-[#F8F6F2] py-[16px] text-center border-b border-[#E8E4DC]">
                    <span className="font-body font-semibold text-[14px] text-[#C4472A]">📍 Find Us On Map</span>
                </div>
                <div className="w-full h-[420px] bg-stone/20 overflow-hidden">
                    <iframe
                        title="Location map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14232.062452296066!2d75.76008620888206!3d26.912440316499833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db45bb6276865%3A0xcb1b51e9b21f3f98!2sJhotwara%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>

            <Footer />
            <WhatsAppButton />
        </main>
    );
}
