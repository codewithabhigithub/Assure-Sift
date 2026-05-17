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

/* ─────────────────────────────────────────────
   DESIGN TOKENS  (matches screenshot palette)
   ───────────────────────────────────────────── */
const styles = `
  /* ── Tokens ── */
  :root {
    --cream:       #F5F0EB;
    --cream-dark:  #EDE6DC;
    --stone:       #D9CFC4;
    --stone-mid:   #B5A899;
    --text-dark:   #1A1612;
    --text-body:   #3D3530;
    --text-muted:  #7A6E65;
    --accent:      #C4472A;
    --accent-dark: #A83620;
    --accent-pale: #F2E8E5;
    --navy:        #1C2330;
    --navy-mid:    #232C3B;
    --white:       #FFFFFF;
    --radius-card: 20px;
    --radius-btn:  8px;
    --shadow-soft: 0 2px 12px rgba(26,22,18,0.06);
    --shadow-card: 0 4px 24px rgba(26,22,18,0.10);
    --shadow-hover:0 8px 40px rgba(26,22,18,0.14);
    --font-display: 'Georgia', 'Times New Roman', serif;
    --font-body:    'Helvetica Neue', Arial, sans-serif;
    --transition:   all 0.3s cubic-bezier(0.4,0,0.2,1);
  }

  /* ── Global resets for this page ── */
  .pp-page { background: var(--cream); font-family: var(--font-body); color: var(--text-dark); }

  /* ── HERO ── */
  .pp-hero {
    background: var(--white);
    padding: 160px 0 100px;
    border-bottom: 1px solid var(--stone);
  }
  .pp-hero__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 72px;
    align-items: center;
  }
  @media (max-width: 900px) { .pp-hero__grid { grid-template-columns: 1fr; gap: 48px; } }

  .pp-label {
    display: inline-block;
    font-family: var(--font-body);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 18px;
  }
  .pp-hero h1 {
    font-family: var(--font-display);
    font-size: clamp(44px, 6vw, 76px);
    font-weight: 400;
    line-height: 1.08;
    color: var(--text-dark);
    margin: 0 0 24px;
    letter-spacing: -0.5px;
  }
  .pp-hero h1 em {
    font-style: italic;
    color: var(--accent);
  }
  .pp-hero__desc {
    font-size: 17px;
    line-height: 1.7;
    color: var(--text-muted);
    font-weight: 300;
    max-width: 480px;
    margin-bottom: 40px;
  }
  .pp-badges { display: flex; flex-wrap: wrap; gap: 12px; }
  .pp-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 10px 20px;
    border-radius: 50px;
    border: 1.5px solid;
  }
  .pp-badge--accent { color: var(--accent); border-color: var(--accent); background: var(--accent-pale); }
  .pp-badge--stone  { color: var(--text-dark); border-color: var(--stone); background: var(--cream); }

  .pp-hero__img-wrap {
    position: relative;
    border-radius: var(--radius-card);
    overflow: hidden;
    aspect-ratio: 1;
    box-shadow: var(--shadow-hover);
    border: 1px solid var(--stone);
  }
  .pp-hero__img-wrap img { width:100%; height:100%; object-fit: cover; display:block; }

  /* ── MAIN SECTION ── */
  .pp-main { background: var(--cream); padding: 80px 0 120px; }
  .pp-main__grid {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 60px;
    align-items: start;
  }
  @media (max-width: 900px) { .pp-main__grid { grid-template-columns: 1fr; } }

  /* ── FORM CARD ── */
  .pp-form-card {
    background: var(--white);
    border-radius: var(--radius-card);
    box-shadow: var(--shadow-card);
    border: 1px solid var(--stone);
    padding: 56px 52px;
    position: relative;
    overflow: hidden;
  }
  .pp-form-card::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 180px; height: 180px;
    background: var(--accent-pale);
    border-radius: 50%;
    pointer-events: none;
  }
  .pp-form-card h2 {
    font-family: var(--font-display);
    font-size: clamp(28px, 3vw, 38px);
    font-weight: 400;
    color: var(--text-dark);
    margin: 6px 0 8px;
    letter-spacing: -0.3px;
  }
  .pp-form-card .pp-form-sub {
    font-size: 14px;
    color: var(--text-muted);
    font-weight: 300;
    margin-bottom: 48px;
  }
  .pp-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
  @media (max-width: 600px) { .pp-form-row { grid-template-columns: 1fr; } }

  .pp-field { display: flex; flex-direction: column; gap: 8px; }
  .pp-field label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--text-muted);
  }
  .pp-field input {
    background: var(--cream);
    border: none;
    border-bottom: 1.5px solid var(--stone);
    border-radius: 6px 6px 0 0;
    padding: 14px 16px;
    font-family: var(--font-body);
    font-size: 15px;
    color: var(--text-dark);
    outline: none;
    transition: var(--transition);
    width: 100%;
    box-sizing: border-box;
  }
  .pp-field input:focus { border-color: var(--accent); background: var(--white); }
  .pp-field input::placeholder { color: var(--stone-mid); }

  .pp-amount-wrap { position: relative; }
  .pp-amount-symbol {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 600;
    color: var(--accent);
    pointer-events: none;
  }
  .pp-amount-input {
    background: var(--cream) !important;
    border: none !important;
    border-bottom: 2px solid var(--accent) !important;
    border-radius: 8px 8px 0 0 !important;
    padding: 20px 16px 20px 44px !important;
    font-family: var(--font-display) !important;
    font-size: 36px !important;
    color: var(--accent) !important;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    transition: var(--transition);
  }
  .pp-amount-input:focus { background: var(--white) !important; }
  .pp-amount-input::placeholder { color: var(--stone-mid) !important; }

  .pp-form-fields { display: flex; flex-direction: column; gap: 36px; }

  .pp-btn-primary {
    width: 100%;
    background: var(--accent);
    color: var(--white);
    border: none;
    border-radius: var(--radius-btn);
    padding: 18px 32px;
    font-family: var(--font-body);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: 0 4px 16px rgba(196,71,42,0.25);
  }
  .pp-btn-primary:hover:not(:disabled) {
    background: var(--accent-dark);
    box-shadow: 0 6px 24px rgba(196,71,42,0.35);
    transform: translateY(-1px);
  }
  .pp-btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }
  .pp-btn-note {
    margin-top: 20px;
    text-align: center;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.38em;
    text-transform: uppercase;
    color: var(--stone-mid);
  }

  /* ── SIDEBAR ── */
  .pp-sidebar { display: flex; flex-direction: column; gap: 24px; }

  .pp-protocol-card {
    background: var(--navy);
    border-radius: var(--radius-card);
    padding: 44px 40px;
    color: var(--white);
    box-shadow: var(--shadow-hover);
    position: relative;
    overflow: hidden;
  }
  .pp-protocol-card::after {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 160px; height: 160px;
    background: rgba(196,71,42,0.15);
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;
  }
  .pp-protocol-card h3 {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 400;
    color: var(--white);
    margin: 0 0 32px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .pp-protocol-card h3 svg { color: var(--accent); flex-shrink: 0; }
  .pp-steps { display: flex; flex-direction: column; gap: 20px; list-style: none; margin: 0; padding: 0; }
  .pp-step {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }
  .pp-step-num {
    flex-shrink: 0;
    width: 36px; height: 36px;
    border-radius: 8px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-size: 15px;
    color: var(--accent);
    transition: var(--transition);
  }
  .pp-step:hover .pp-step-num { background: var(--accent); color: var(--white); border-color: var(--accent); }
  .pp-step p {
    font-size: 14px;
    line-height: 1.6;
    color: rgba(255,255,255,0.45);
    font-weight: 300;
    margin: 6px 0 0;
    transition: var(--transition);
  }
  .pp-step:hover p { color: rgba(255,255,255,0.9); }

  .pp-img-card {
    position: relative;
    border-radius: var(--radius-card);
    overflow: hidden;
    height: 240px;
    box-shadow: var(--shadow-card);
    border: 1px solid var(--stone);
  }
  .pp-img-card img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    filter: grayscale(1);
    transition: filter 0.8s ease;
  }
  .pp-img-card:hover img { filter: grayscale(0); }
  .pp-img-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(28,35,48,0.65) 0%, transparent 55%);
  }
  .pp-img-card-label {
    position: absolute;
    bottom: 20px; left: 20px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.85);
  }

  /* ── SUPPORT SECTION ── */
  .pp-support { background: var(--white); padding: 80px 0; border-top: 1px solid var(--stone); }
  .pp-support-inner {
    background: var(--cream);
    border-radius: var(--radius-card);
    border: 1px solid var(--stone);
    padding: 72px 60px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .pp-support-inner::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(196,71,42,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .pp-support-inner h3 {
    font-family: var(--font-display);
    font-size: clamp(28px, 3.5vw, 42px);
    font-weight: 400;
    color: var(--text-dark);
    margin: 8px 0 16px;
    letter-spacing: -0.3px;
  }
  .pp-support-inner p {
    font-size: 16px;
    color: var(--text-muted);
    font-weight: 300;
    line-height: 1.7;
    max-width: 520px;
    margin: 0 auto 52px;
  }
  .pp-contacts {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 60px;
    flex-wrap: wrap;
  }
  .pp-contact-item { display: flex; align-items: center; gap: 18px; }
  .pp-contact-icon {
    width: 52px; height: 52px;
    background: var(--white);
    border-radius: 12px;
    box-shadow: var(--shadow-soft);
    border: 1px solid var(--stone);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent);
    transition: var(--transition);
    flex-shrink: 0;
  }
  .pp-contact-item:hover .pp-contact-icon {
    background: var(--accent);
    color: var(--white);
    box-shadow: 0 4px 20px rgba(196,71,42,0.25);
    transform: translateY(-2px);
  }
  .pp-contact-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 4px;
  }
  .pp-contact-value {
    font-family: var(--font-display);
    font-size: 18px;
    color: var(--text-dark);
  }
  .pp-contact-divider {
    width: 1px; height: 48px;
    background: var(--stone);
  }
  @media (max-width: 600px) { .pp-contact-divider { display:none; } .pp-contacts { gap:32px; } }

  /* ── Container utility ── */
  .pp-container { max-width: 1200px; margin: 0 auto; padding: 0 32px; }
  @media (max-width: 600px) { .pp-container { padding: 0 20px; } }
`;

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
      notes: { enquiryNo: formData.enquiryNo },
      theme: { color: "#C4472A" },
      modal: { ondismiss: function () { setIsProcessing(false); } },
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

  const steps = [
    "Verify your Enquiry ID and registered Mobile.",
    "Enter the exact amount defined in your quotation.",
    "Click 'Proceed' to launch the secure financial interface.",
    "Choose from UPI, Premium Credit, or NetBanking.",
    "Retain your digital receipt for concierge verification.",
  ];

  return (
    <main className="pp-page min-h-screen">
      <style>{styles}</style>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Navbar />
      <WhatsAppButton />

      {/* ── HERO ── */}
      <section className="pp-hero">
        <div className="pp-container">
          <div className="pp-hero__grid">
            <Reveal>
              <span className="pp-label">Secure Transactions</span>
              <h1>
                Secure Your <br />
                <em>Move</em>
              </h1>
              <p className="pp-hero__desc">
                Confirm your booking with Assure Sift Relocation by utilizing our encrypted financial gateway.
                We use industry-standard protocols to ensure your transaction is private and protected.
              </p>
              <div className="pp-badges">
                <div className="pp-badge pp-badge--accent">
                  <Lock size={12} /> SSL Encrypted
                </div>
                <div className="pp-badge pp-badge--stone">
                  <ShieldCheck size={12} /> Secure Gateway
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="pp-hero__img-wrap">
                <Image src={securePayment} alt="Secure Payment" fill className="object-cover" priority />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── MAIN ── */}
      <section className="pp-main">
        <div className="pp-container">
          <div className="pp-main__grid">

            {/* Form Card */}
            <Reveal width="100%">
              <div className="pp-form-card">
                <span className="pp-label">Checkout</span>
                <h2>Financial Details</h2>
                <p className="pp-form-sub">Enter your move credentials to initiate the transfer.</p>

                <form onSubmit={handleSubmit} className="pp-form-fields">
                  <div className="pp-form-row">
                    <div className="pp-field">
                      <label>Enquiry Number</label>
                      <input
                        type="text"
                        name="enquiryNo"
                        value={formData.enquiryNo}
                        onChange={handleChange}
                        placeholder="e.g. SS-12345"
                        required
                      />
                    </div>
                    <div className="pp-field">
                      <label>Contact Number</label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="10-digit mobile"
                        required
                      />
                    </div>
                  </div>

                  <div className="pp-field">
                    <label>Amount (INR)</label>
                    <div className="pp-amount-wrap">
                      <span className="pp-amount-symbol">₹</span>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        required
                        className="pp-amount-input"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="pp-btn-primary"
                    >
                      {isProcessing ? "Accessing Gateway…" : "Proceed to Secure Payment"}
                    </button>
                    <p className="pp-btn-note">Processed via Razorpay Encrypted Network</p>
                  </div>
                </form>
              </div>
            </Reveal>

            {/* Sidebar */}
            <div className="pp-sidebar">
              <Reveal width="100%">
                <div className="pp-protocol-card">
                  <h3><Info size={20} /> Protocol</h3>
                  <ul className="pp-steps">
                    {steps.map((step, i) => (
                      <li key={i} className="pp-step">
                        <span className="pp-step-num">{i + 1}</span>
                        <p>{step}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal width="100%">
                <div className="pp-img-card">
                  <Image src={instruction} alt="Instruction Graphics" fill className="object-cover" />
                  <div className="pp-img-card-overlay" />
                  <p className="pp-img-card-label">Strategic Support</p>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── SUPPORT ── */}
      <section className="pp-support">
        <div className="pp-container">
          <div className="pp-support-inner">
            <span className="pp-label">Concierge Assistance</span>
            <h3>Need Financial Guidance?</h3>
            <p>
              If you encounter any discrepancies during the transaction, our move management team
              is available 24/7 to provide resolution.
            </p>
            <div className="pp-contacts">
              <div className="pp-contact-item">
                <div className="pp-contact-icon"><Mail size={22} /></div>
                <div>
                  <p className="pp-contact-label">Email Concierge</p>
                  <p className="pp-contact-value">assuresiftrelocation6@gmail.com</p>
                </div>
              </div>
              <div className="pp-contact-divider" />
              <div className="pp-contact-item">
                <div className="pp-contact-icon"><Phone size={22} /></div>
                <div>
                  <p className="pp-contact-label">Direct Priority</p>
                  <p className="pp-contact-value">+91 701 432 9644</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PaymentPage;
