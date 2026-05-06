'use client';

import React, { useState } from 'react';
import { FaPhoneAlt, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaClock } from 'react-icons/fa';
import api from '@/services/api';
import InfoBar from "@/components/Infobar";
import InfoBarMob from "@/components/InfobarMob";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
        <div className="min-h-screen flex flex-col">
            <InfoBar />
            <InfoBarMob />
            <Navbar />
            <WhatsAppButton />

            {/* Hero Section */}
            <section className="bg-gray-900 py-20 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-brand/10 blur-[120px] rounded-full -mr-20"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl lg:text-6xl font-outfit font-black mb-4">Contact <span className="text-brand">Us</span></h1>
                    <p className="text-lg text-gray-400 font-medium max-w-2xl mx-auto">
                        Have questions about your upcoming move? Our team is here to help 24/7. Reach out and experience the Sure Shift difference.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-gray-50 -mt-10">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col lg:flex-row bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
                        {/* Form Section */}
                        <div className="w-full lg:w-3/5 p-8 lg:p-16">
                            <div className="mb-10">
                                <h2 className="text-3xl font-outfit font-black text-gray-900 mb-2">Send us a Message</h2>
                                <p className="text-gray-500 font-medium">Fill out the form below and we'll reply within 24 hours.</p>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="block text-sm font-bold text-gray-700" htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-sm font-bold text-gray-700" htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm font-bold text-gray-700">Purpose of Contact</label>
                                    <div className="flex flex-wrap gap-3 mt-2">
                                        {CONTACT_OPTIONS.map(option => (
                                            <button
                                                key={option.id}
                                                type="button"
                                                onClick={() => setSelectedOption(option.id)}
                                                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all border ${
                                                    selectedOption === option.id 
                                                    ? 'bg-brand text-white border-brand shadow-lg scale-105' 
                                                    : 'bg-white text-gray-500 border-gray-200 hover:border-brand/30'
                                                }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm font-bold text-gray-700" htmlFor="message">Your Message</label>
                                    <textarea
                                        id="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all resize-none"
                                        placeholder="How can we help you today?"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-white shadow-xl transition-all-custom ${
                                        isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand hover:bg-brand-dark hover:scale-[1.02]'
                                    }`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>

                        {/* Contact Details Section */}
                        <div className="w-full lg:w-2/5 bg-gray-900 p-8 lg:p-16 text-white flex flex-col justify-between">
                            <div className="space-y-12">
                                <div>
                                    <h2 className="text-3xl font-outfit font-black mb-6">Contact Info</h2>
                                    <p className="text-gray-400 font-medium leading-relaxed">
                                        Feel free to reach out via phone or email, or visit our office during working hours.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-6 group">
                                        <div className="p-4 bg-brand/20 rounded-2xl text-brand text-xl group-hover:bg-brand group-hover:text-white transition-all">
                                            <FaPhoneAlt />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-brand uppercase tracking-widest mb-1">Call Us</p>
                                            <a href="tel:9073291732" className="text-xl font-bold hover:text-brand transition-colors">+91 907 329 1732</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6 group">
                                        <div className="p-4 bg-brand/20 rounded-2xl text-brand text-xl group-hover:bg-brand group-hover:text-white transition-all">
                                            <FaEnvelope />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-brand uppercase tracking-widest mb-1">Email Us</p>
                                            <a href="mailto:info@sureshift.com" className="text-xl font-bold hover:text-brand transition-colors">info@sureshift.com</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6 group">
                                        <div className="p-4 bg-brand/20 rounded-2xl text-brand text-xl group-hover:bg-brand group-hover:text-white transition-all">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-brand uppercase tracking-widest mb-1">Our Office</p>
                                            <p className="text-lg font-bold leading-tight">Gopal Nagar Extn, New Delhi, 110043</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6 group">
                                        <div className="p-4 bg-brand/20 rounded-2xl text-brand text-xl group-hover:bg-brand group-hover:text-white transition-all">
                                            <FaClock />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-brand uppercase tracking-widest mb-1">Working Hours</p>
                                            <p className="text-lg font-bold">24/7 Customer Support</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 pt-8 border-t border-white/10">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-6">Connect with us</p>
                                <div className="flex gap-4">
                                    {[
                                        { icon: <FaFacebookF />, url: "https://www.facebook.com/profile.php?id=61559606034810" },
                                        { icon: <FaTwitter />, url: "https://x.com/Sure_Shift" },
                                        { icon: <FaInstagram />, url: "https://www.instagram.com/sure.shift/" },
                                        { icon: <FaLinkedinIn />, url: "https://www.linkedin.com/company/sureshift/" }
                                    ].map((social, i) => (
                                        <a 
                                            key={i}
                                            href={social.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand hover:border-brand hover:scale-110 transition-all text-white"
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="h-[450px] w-full relative grayscale hover:grayscale-0 transition-all duration-700">
                <iframe
                    title="Location map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7004.910594148318!2d76.95840239273868!3d28.61611345269459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0fccba63cc3d%3A0x2fea0e016d527c84!2sGopal%20Nagar%20Extn%2C%20Sarswati%20Enclave%2C%20Gopal%20Nagar%20Extension%2C%20Haibutpur%2C%20Delhi%2C%20110043!5e0!3m2!1sen!2sin!4v1734872380196!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </section>

            <Footer />
        </div>
    );
}
