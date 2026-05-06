'use client';

import React, { useState } from "react";
import Script from 'next/script';
import Image from 'next/image';
import { FaShieldAlt, FaInfoCircle, FaPhoneAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import InfoBar from "@/components/Infobar";
import InfoBarMob from "@/components/InfobarMob";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      name: "SureShift",
      description: "Secure Relocation Payment",
      image: "/favicon.jpeg",
      handler: function (response) {
        alert(`Payment successful! ID: ${response.razorpay_payment_id}`);
        console.log("Payment response:", response);
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
        color: "#D81F47",
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
    <div className="min-h-screen flex flex-col">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <InfoBar />
      <InfoBarMob />
      <Navbar />
      <WhatsAppButton />

      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
                <h1 className="text-4xl lg:text-6xl font-outfit font-black text-gray-900 leading-tight">
                  Secure Your Move <br />
                  <span className="text-brand text-3xl lg:text-5xl">Easy & Protected Payments</span>
                </h1>
                <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Confirm your booking with SureShift by filling out the details below. We use industry-standard encryption to ensure your transactions are always safe.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-widest border border-green-100">
                    <FaLock /> SSL Encrypted
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100">
                    <FaShieldAlt /> Secure Gateway
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="absolute -inset-10 bg-brand/5 rounded-full blur-[100px]"></div>
                <Image src={securePayment} alt="Secure Payment" className="relative z-10 w-full h-auto drop-shadow-2xl" priority />
              </div>
            </div>
          </div>
        </section>

        {/* Form & Instructions Grid */}
        <section className="py-20 -mt-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Checkout Form */}
              <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 lg:p-12 border border-gray-100 order-2 lg:order-1">
                <div className="text-center lg:text-left mb-10">
                  <h2 className="text-3xl font-outfit font-black text-gray-900">Checkout</h2>
                  <p className="text-gray-500 font-medium mt-1">Enter your details to proceed to payment.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="block text-sm font-bold text-gray-700">Enquiry Number</label>
                      <input
                        type="text"
                        name="enquiryNo"
                        value={formData.enquiryNo}
                        onChange={handleChange}
                        placeholder="e.g. SS-12345"
                        required
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-sm font-bold text-gray-700">Contact Number</label>
                      <input
                        type="number"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="10-digit mobile"
                        required
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand outline-none transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-bold text-gray-700">Amount (INR)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">₹</span>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        required
                        className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand outline-none transition-all font-black text-xl text-brand"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-white shadow-xl transition-all-custom ${
                      isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand hover:bg-brand-dark hover:scale-[1.02]'
                    }`}
                  >
                    {isProcessing ? "Opening Gateway..." : "Proceed to Secure Payment"}
                  </button>
                  
                  <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">
                    Your payment is processed securely via Razorpay
                  </p>
                </form>
              </div>

              {/* Instructions */}
              <div className="space-y-8 order-1 lg:order-2">
                <div className="bg-gray-900 rounded-[2.5rem] p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 blur-3xl"></div>
                  <h3 className="text-3xl font-outfit font-black mb-8 flex items-center gap-3">
                    <FaInfoCircle className="text-brand" /> Instructions
                  </h3>
                  <ul className="space-y-6">
                    {[
                      "Fill in the required details (Enquiry No & Mobile).",
                      "Enter the exact amount agreed for your relocation.",
                      "Click 'Proceed' to launch the secure checkout.",
                      "Choose your preferred payment method (UPI, Card, NetBanking).",
                      "Keep your Transaction ID for future reference."
                    ].map((step, i) => (
                      <li key={i} className="flex gap-4 items-start group">
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand/20 border border-brand/30 flex items-center justify-center font-black text-brand text-sm group-hover:bg-brand group-hover:text-white transition-all">
                          {i + 1}
                        </span>
                        <p className="text-gray-400 font-medium leading-relaxed group-hover:text-gray-200 transition-colors">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[200px] border border-gray-100">
                  <Image src={instruction} alt="Instruction Graphics" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <p className="absolute bottom-6 left-6 text-white font-black uppercase tracking-widest text-xs">Professional Logistics Support</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-[2rem] p-10 lg:p-16 shadow-xl border border-gray-100 text-center space-y-8">
              <h3 className="text-3xl font-outfit font-black text-gray-900">Need Assistance?</h3>
              <p className="text-gray-500 font-medium max-w-xl mx-auto">
                If you encounter any issues during the payment process, our support team is available 24/7 to assist you.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center text-brand"><FaEnvelope /></div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Us</p>
                    <p className="text-lg font-bold text-gray-900">info@sureshift.in</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center text-brand"><FaPhoneAlt /></div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Call Us</p>
                    <p className="text-lg font-bold text-gray-900">+91 907 329 1732</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentPage;
