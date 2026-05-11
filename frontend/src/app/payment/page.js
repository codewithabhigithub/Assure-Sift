'use client';

import React, { useState } from "react";
import Script from 'next/script';
import Image from 'next/image';
import { ShieldCheck, Lock, Info, Mail, Phone, ArrowRight, RotateCcw } from 'lucide-react';
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container, Section } from "@/components/common/Layout";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import WhatsAppButton from "@/components/WhatsAppButton";

import securePayment from '@/assets/secure payment.png';
import instruction from '@/assets/instruction.jpg';

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    enquiryNo: "",
    mobile: "",
    amount: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please check your connection.");
      return;
    }

    setIsProcessing(true);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || "rzp_test_Sgc57vVbrYYdpx",
      amount: formData.amount * 100,
      currency: "INR",
      name: "Assure Sift Relocation",
      description: "Secure Relocation Payment",
      image: "/favicon.jpeg",
      handler: function (response) {
        alert(`Payment successful! ID: ${response.razorpay_payment_id}`);
        setIsProcessing(false);
      },
      prefill: {
        name: formData.enquiryNo,
        contact: formData.mobile,
      },
      notes: {
        enquiryNo: formData.enquiryNo,
      },
      theme: {
        color: "#C4472A",
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || formData.amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    handlePayment();
  };

  return (
    <main className="min-h-screen bg-bg-primary">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Navbar />
      <WhatsAppButton />

      {/* Luxury Hero */}
      <section className="bg-white pt-[200px] pb-[120px] overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <Reveal>
              <span className="subtitle">Secure Transactions</span>
              <h1 className="text-6xl lg:text-[88px] font-display leading-[1.05] mb-10">
                Secure Your <br />
                <span className="text-accent italic font-display">Move</span>
              </h1>
              <p className="text-xl text-text-muted font-body font-light leading-relaxed max-w-xl mb-12">
                Confirm your booking with Assure Sift Relocation by utilizing our encrypted financial gateway. We utilize industry-standard protocols to ensure your transaction is private and protected.
              </p>
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-accent bg-accent/5 px-6 py-3 rounded-full border border-accent/10">
                  <Lock size={14} /> SSL Encrypted
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-text-dark bg-stone/20 px-6 py-3 rounded-full border border-stone">
                  <ShieldCheck size={14} /> Secure Gateway
                </div>
              </div>
            </Reveal>
            
            <div className="relative reveal">
              <div className="absolute -inset-20 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="relative rounded-[60px] overflow-hidden shadow-hover aspect-square">
                <Image src={securePayment} alt="Secure Payment" fill className="object-cover scale-105" priority />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-bg-primary pb-48">
        <Container>
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-32 items-start">
            
            {/* Checkout Form */}
            <Reveal width="100%">
              <div className="bg-white rounded-[48px] shadow-hover p-12 lg:p-20 border border-stone/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="mb-16">
                  <span className="subtitle">Checkout</span>
                  <h2 className="text-4xl lg:text-5xl font-display leading-tight mb-4">Financial Details</h2>
                  <p className="text-text-muted font-body font-light">Enter your move credentials to initiate the transfer.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted px-1">Enquiry Number</label>
                      <input
                        type="text"
                        name="enquiryNo"
                        value={formData.enquiryNo}
                        onChange={handleChange}
                        placeholder="e.g. SS-12345"
                        required
                        className="w-full bg-stone/5 border-b border-stone/30 px-4 py-4 focus:border-accent outline-none transition-colors font-body text-base rounded-t-xl"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted px-1">Contact Number</label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="10-digit mobile"
                        required
                        className="w-full bg-stone/5 border-b border-stone/30 px-4 py-4 focus:border-accent outline-none transition-colors font-body text-base rounded-t-xl"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted px-1">Amount (INR)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-accent text-xl font-display">₹</span>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        required
                        className="w-full pl-12 pr-4 py-6 bg-stone/5 border-b border-accent/50 focus:border-accent outline-none transition-colors font-display text-4xl text-accent rounded-t-2xl"
                      />
                    </div>
                  </div>

                  <div className="pt-8">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={`w-full btn-primary py-6 text-[11px] tracking-[0.2em] uppercase ${
                        isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isProcessing ? "Accessing Gateway..." : "Proceed to Secure Payment"}
                    </button>
                    <p className="mt-8 text-[9px] text-center text-text-muted font-bold uppercase tracking-[0.4em]">
                      Processed via Razorpay Encrypted Network
                    </p>
                  </div>
                </form>
              </div>
            </Reveal>

            {/* Instructions */}
            <div className="space-y-12">
              <Reveal width="100%">
                <div className="bg-bg-dark rounded-[48px] p-12 lg:p-16 text-white shadow-hover relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[80px] rounded-full pointer-events-none"></div>
                  <h3 className="text-3xl font-display mb-12 flex items-center gap-4">
                    <Info className="text-accent" /> Protocol
                  </h3>
                  <ul className="space-y-8">
                    {[
                      "Verify your Enquiry ID and registered Mobile.",
                      "Enter the exact amount defined in your quotation.",
                      "Click 'Proceed' to launch the secure financial interface.",
                      "Choose from UPI, Premium Credit, or NetBanking.",
                      "Retain your digital receipt for concierge verification."
                    ].map((step, i) => (
                      <li key={i} className="flex gap-6 items-start group">
                        <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-display text-accent text-lg group-hover:bg-accent group-hover:text-white transition-premium">
                          {i + 1}
                        </span>
                        <p className="text-white/40 font-body font-light leading-relaxed group-hover:text-white transition-colors duration-500 text-lg">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              
              <div className="relative rounded-[48px] overflow-hidden shadow-hover h-[300px] border border-stone/20 reveal">
                <Image src={instruction} alt="Instruction Graphics" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 to-transparent"></div>
                <p className="absolute bottom-8 left-8 text-white text-[10px] font-bold uppercase tracking-[0.4em]">Strategic Support</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Concierge Support Section */}
      <Section className="bg-white">
        <Container>
          <div className="bg-bg-primary rounded-[60px] p-16 lg:p-24 shadow-soft border border-stone/10 text-center relative overflow-hidden reveal">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 space-y-12">
              <div className="max-w-2xl mx-auto">
                <span className="subtitle">Concierge Assistance</span>
                <h3 className="text-4xl lg:text-5xl font-display leading-tight mb-6">Need Financial Guidance?</h3>
                <p className="text-text-muted font-body font-light text-lg leading-relaxed">
                  If you encounter any discrepancies during the transaction, our move management team is available 24/7 to provide resolution.
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-16">
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-soft flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-premium">
                    <Mail size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-text-muted uppercase tracking-[0.3em] mb-1">Email Concierge</p>
                    <p className="text-xl font-display text-text-dark">info@assuresift.in</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-soft flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-premium">
                    <Phone size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-bold text-text-muted uppercase tracking-[0.3em] mb-1">Direct Priority</p>
                    <p className="text-xl font-display text-text-dark">+91 907 329 1732</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </main>
  );
};

export default PaymentPage;
