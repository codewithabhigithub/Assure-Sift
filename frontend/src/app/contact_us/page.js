'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, RotateCcw, Activity } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import api from '@/services/api';
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container, Section } from "@/components/common/Layout";
import { Reveal } from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/WhatsAppButton";

const CONTACT_OPTIONS = [
    { id: 1, label: "Inquiry" },
    { id: 2, label: "Feedback" },
    { id: 3, label: "Support" },
];

export default function ContactUsPage() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [selectedOption, setSelectedOption] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleReset = () => {
        setFormData({ name: "", email: "", message: "" });
        setSelectedOption(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const updatedFormData = {
            ...formData,
            purpose: CONTACT_OPTIONS.find(option => option.id === selectedOption)?.label || ''
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
        <main className="min-h-screen bg-bg-primary">
            <Navbar />
            <WhatsAppButton />

            {/* Luxury Header */}
            <section className="bg-bg-dark pt-[200px] pb-[120px] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 blur-[160px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <Container className="relative z-10 text-center">
                    <Reveal>
                        <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">Get in Touch</span>
                        <h1 className="text-6xl lg:text-[88px] font-display leading-[1.05] mb-8">
                            Contact our <span className="text-accent italic font-display">Concierge</span>
                        </h1>
                        <p className="text-white/40 text-lg font-body font-light max-w-2xl mx-auto leading-relaxed">
                            Have questions about your upcoming move? Our elite relocation specialists are here to assist you 24/7.
                        </p>
                    </Reveal>
                </Container>
            </section>

            <Section className="pb-32 -mt-20">
                <Container>
                    <div className="flex flex-col lg:flex-row bg-white rounded-[48px] shadow-hover overflow-hidden border border-stone/20">
                        {/* Form Section */}
                        <div className="w-full lg:w-3/5 p-12 lg:p-20">
                            <div className="mb-16">
                                <span className="subtitle">Bespoke Support</span>
                                <h2 className="text-4xl lg:text-5xl font-display leading-tight mb-4">Send an Inquiry</h2>
                                <p className="text-text-muted font-body font-light">Your request will be prioritized by our move management team.</p>
                            </div>

                            <form className="space-y-10" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted px-1" htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-stone/5 border-b border-stone/30 px-6 py-5 focus:border-accent outline-none transition-colors font-body text-base rounded-t-2xl"
                                            placeholder="Johnathan Doe"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted px-1" htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-stone/5 border-b border-stone/30 px-6 py-5 focus:border-accent outline-none transition-colors font-body text-base rounded-t-2xl"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted px-1">Purpose of Contact</label>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        {CONTACT_OPTIONS.map(option => (
                                            <button
                                                key={option.id}
                                                type="button"
                                                onClick={() => setSelectedOption(option.id)}
                                                className={`px-8 py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all border ${
                                                    selectedOption === option.id 
                                                    ? 'bg-accent text-white border-accent shadow-lg' 
                                                    : 'bg-white text-text-muted border-stone hover:border-accent/30'
                                                }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted px-1" htmlFor="message">Your Message</label>
                                    <textarea
                                        id="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-stone/5 border-b border-stone/30 px-6 py-5 focus:border-accent outline-none transition-colors font-body text-base rounded-t-2xl resize-none"
                                        placeholder="How can our masters of relocation assist you?"
                                        required
                                    ></textarea>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-10 pt-6">
                                    <button
                                        type="submit"
                                        className={`flex-1 w-full btn-primary py-6 text-[11px] tracking-[0.2em] uppercase ${
                                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Dispatching..." : "Send Message"}
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={handleReset}
                                        className="text-text-muted hover:text-accent transition-colors flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em]"
                                    >
                                        <RotateCcw size={16} /> Reset
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Details Section */}
                        <div className="w-full lg:w-2/5 bg-bg-dark p-12 lg:p-20 text-white flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none"></div>
                            
                            <div className="space-y-16 relative z-10">
                                <div>
                                    <h2 className="text-4xl font-display mb-6">Strategic HQ</h2>
                                    <p className="text-white/40 font-body font-light leading-relaxed">
                                        Experience our physical presence at our strategic headquarters or connect instantly via our digital channels.
                                    </p>
                                </div>

                                <div className="space-y-12">
                                    <div className="flex items-start gap-6 group">
                                        <div className="p-5 bg-white/5 rounded-2xl text-accent group-hover:bg-accent group-hover:text-white transition-premium">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-2">Call Priority</p>
                                            <a href="tel:9073291732" className="text-xl font-display hover:text-accent transition-colors">+91 907 329 1732</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6 group">
                                        <div className="p-5 bg-white/5 rounded-2xl text-accent group-hover:bg-accent group-hover:text-white transition-premium">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-2">Electronic Mail</p>
                                            <a href="mailto:info@assuresift.in" className="text-xl font-display hover:text-accent transition-colors">info@assuresift.in</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6 group">
                                        <div className="p-5 bg-white/5 rounded-2xl text-accent group-hover:bg-accent group-hover:text-white transition-premium">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-2">Physical Location</p>
                                            <p className="text-lg font-display leading-tight">Gopal Nagar Extn, Jaipur, Rajasthan</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-20 pt-10 border-t border-white/5">
                                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 mb-8">Follow our Journey</p>
                                <div className="flex gap-6">
                                    {[
                                        { icon: <FaFacebook />, url: "#" },
                                        { icon: <FaTwitter />, url: "#" },
                                        { icon: <FaInstagram />, url: "#" },
                                        { icon: <FaLinkedin />, url: "#" }
                                    ].map((social, i) => (
                                        <a 
                                            key={i}
                                            href={social.url} 
                                            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-premium text-white/40 hover:text-white"
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Refined Map Section */}
            <section className="h-[500px] w-full relative grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
                <iframe
                    title="Location map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7004.910594148318!2d76.95840239273868!3d28.61611345269459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0fccba63cc3d%3A0x2fea0e016d527c84!2sGopal%20Nagar%20Extn%2C%20Sarswati%20Enclave%2C%20Gopal%20Nagar%20Extension%2C%20Haibutpur%2C%20Delhi%2C%20110043!5e0!3m2!1sen!2sin!4v1734872380196!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border-y border-stone/20"></div>
            </section>

            <Footer />
        </main>
    );
}
