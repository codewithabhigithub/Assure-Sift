'use client';

import React, { useState, useEffect } from "react";
import { Shield, Eye, Lock, Database, Bell, UserCheck, Mail, Phone, ChevronRight } from 'lucide-react';
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const styles = `
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
    --white:       #FFFFFF;
    --radius-card: 20px;
    --shadow-soft: 0 2px 12px rgba(26,22,18,0.06);
    --shadow-card: 0 4px 24px rgba(26,22,18,0.10);
    --shadow-hover:0 8px 40px rgba(26,22,18,0.14);
    --font-display:'Georgia','Times New Roman',serif;
    --font-body:   'Helvetica Neue',Arial,sans-serif;
    --transition:  all 0.3s cubic-bezier(0.4,0,0.2,1);
  }

  .lp-page { background: var(--cream); font-family: var(--font-body); color: var(--text-dark); min-height: 100vh; }

  /* ── HERO ── */
  .lp-hero {
    background: var(--navy);
    padding: 160px 0 80px;
    position: relative;
    overflow: hidden;
  }
  .lp-hero::before {
    content: '';
    position: absolute;
    top: -100px; right: -100px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(196,71,42,0.18) 0%, transparent 65%);
    pointer-events: none;
  }
  .lp-hero::after {
    content: '';
    position: absolute;
    bottom: -80px; left: -60px;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%);
    pointer-events: none;
  }
  .lp-hero-inner { position: relative; z-index: 1; }
  .lp-breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    margin-bottom: 28px;
  }
  .lp-breadcrumb span { color: var(--accent); }
  .lp-hero h1 {
    font-family: var(--font-display);
    font-size: clamp(40px, 6vw, 72px);
    font-weight: 400;
    color: var(--white);
    margin: 0 0 20px;
    line-height: 1.1;
    letter-spacing: -0.5px;
  }
  .lp-hero h1 em { font-style: italic; color: var(--accent); }
  .lp-hero-desc {
    font-size: 16px;
    color: rgba(255,255,255,0.5);
    font-weight: 300;
    line-height: 1.7;
    max-width: 560px;
    margin-bottom: 40px;
  }
  .lp-hero-meta {
    display: flex;
    align-items: center;
    gap: 32px;
    flex-wrap: wrap;
  }
  .lp-hero-meta-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
  }
  .lp-hero-meta-item svg { color: var(--accent); }

  /* ── LAYOUT ── */
  .lp-container { max-width: 1160px; margin: 0 auto; padding: 0 32px; }
  @media (max-width: 600px) { .lp-container { padding: 0 20px; } }

  .lp-body { padding: 72px 0 120px; }
  .lp-grid {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 56px;
    align-items: start;
  }
  @media (max-width: 860px) { .lp-grid { grid-template-columns: 1fr; } }

  /* ── STICKY SIDEBAR ── */
  .lp-nav-card {
    position: sticky;
    top: 100px;
    background: var(--white);
    border-radius: var(--radius-card);
    border: 1px solid var(--stone);
    box-shadow: var(--shadow-soft);
    overflow: hidden;
  }
  .lp-nav-header {
    background: var(--accent);
    padding: 20px 24px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--white);
  }
  .lp-nav-list { list-style: none; margin: 0; padding: 12px 0; }
  .lp-nav-item a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 24px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-muted);
    text-decoration: none;
    transition: var(--transition);
    border-left: 3px solid transparent;
  }
  .lp-nav-item a:hover,
  .lp-nav-item a.active {
    color: var(--accent);
    background: var(--accent-pale);
    border-left-color: var(--accent);
  }
  .lp-nav-item a svg { flex-shrink: 0; }

  /* ── CONTENT ── */
  .lp-content { display: flex; flex-direction: column; gap: 40px; }

  .lp-section-card {
    background: var(--white);
    border-radius: var(--radius-card);
    border: 1px solid var(--stone);
    box-shadow: var(--shadow-soft);
    overflow: hidden;
    scroll-margin-top: 110px;
  }
  .lp-section-head {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 28px 36px;
    border-bottom: 1px solid var(--cream-dark);
    background: var(--cream);
  }
  .lp-section-icon {
    width: 44px; height: 44px;
    border-radius: 10px;
    background: var(--accent-pale);
    border: 1px solid rgba(196,71,42,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent);
    flex-shrink: 0;
  }
  .lp-section-title {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 400;
    color: var(--text-dark);
    margin: 0;
    letter-spacing: -0.2px;
  }
  .lp-section-body { padding: 32px 36px; }
  .lp-section-body p {
    font-size: 15px;
    line-height: 1.78;
    color: var(--text-body);
    font-weight: 300;
    margin: 0 0 18px;
  }
  .lp-section-body p:last-child { margin-bottom: 0; }
  .lp-section-body h4 {
    font-family: var(--font-display);
    font-size: 17px;
    font-weight: 400;
    color: var(--text-dark);
    margin: 28px 0 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--cream-dark);
  }
  .lp-list {
    list-style: none;
    margin: 0 0 18px;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .lp-list li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 15px;
    line-height: 1.65;
    color: var(--text-body);
    font-weight: 300;
  }
  .lp-list li::before {
    content: '';
    flex-shrink: 0;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent);
    margin-top: 8px;
  }

  /* ── CONTACT FOOTER CARD ── */
  .lp-contact-card {
    background: var(--navy);
    border-radius: var(--radius-card);
    padding: 44px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    flex-wrap: wrap;
    position: relative;
    overflow: hidden;
  }
  .lp-contact-card::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(196,71,42,0.2) 0%, transparent 65%);
    pointer-events: none;
  }
  .lp-contact-card h4 {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 400;
    color: var(--white);
    margin: 0 0 8px;
  }
  .lp-contact-card p {
    font-size: 14px;
    color: rgba(255,255,255,0.45);
    font-weight: 300;
    margin: 0;
  }
  .lp-contact-links { display: flex; gap: 16px; flex-wrap: wrap; }
  .lp-contact-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    color: var(--white);
    text-decoration: none;
    transition: var(--transition);
  }
  .lp-contact-link:hover { background: var(--accent); border-color: var(--accent); }
  .lp-contact-link svg { color: var(--accent); flex-shrink: 0; }
  .lp-contact-link:hover svg { color: var(--white); }

  /* ── Label ── */
  .lp-label {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 14px;
  }
`;

const sections = [
  {
    id: "intro",
    icon: <Shield size={20} />,
    title: "Introduction",
    content: (
      <>
        <p>Assure Sift Relocation ("we," "our," or "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our relocation services.</p>
        <p>Please read this policy carefully. If you disagree with its terms, please discontinue use of our site. We reserve the right to make changes to this policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this policy.</p>
      </>
    ),
  },
  {
    id: "collection",
    icon: <Database size={20} />,
    title: "Information We Collect",
    content: (
      <>
        <p>We collect information that you provide directly to us when you request a quote, book a service, make a payment, or contact our support team. This includes:</p>
        <h4>Personal Identification Information</h4>
        <ul className="lp-list">
          <li>Full name and contact details (phone, email, address)</li>
          <li>Enquiry or booking reference numbers</li>
          <li>Origin and destination addresses for your move</li>
          <li>Inventory details, special item requirements</li>
        </ul>
        <h4>Financial Information</h4>
        <ul className="lp-list">
          <li>Payment transaction IDs (processed via Razorpay; we do not store card details)</li>
          <li>Billing address and invoice details</li>
          <li>Quotation and payment amount records</li>
        </ul>
        <h4>Usage Information</h4>
        <ul className="lp-list">
          <li>Browser type, IP address, and device information</li>
          <li>Pages visited and time spent on our website</li>
          <li>Referral sources and search queries leading to our site</li>
        </ul>
      </>
    ),
  },
  {
    id: "usage",
    icon: <Eye size={20} />,
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use the information we collect in the following ways:</p>
        <ul className="lp-list">
          <li>To process and fulfill your relocation bookings and service requests</li>
          <li>To facilitate secure payments through our encrypted gateway</li>
          <li>To send you booking confirmations, receipts, and move-related updates</li>
          <li>To respond to your inquiries, complaints, and support requests</li>
          <li>To improve our website, services, and customer experience</li>
          <li>To send promotional communications (with your consent; unsubscribe anytime)</li>
          <li>To comply with legal obligations and resolve disputes</li>
          <li>To detect and prevent fraudulent transactions or misuse of our services</li>
        </ul>
        <p>We do not sell, trade, or rent your personal information to third parties for their marketing purposes.</p>
      </>
    ),
  },
  {
    id: "sharing",
    icon: <UserCheck size={20} />,
    title: "Information Sharing & Disclosure",
    content: (
      <>
        <p>We may share your information with trusted third parties only as necessary to provide our services:</p>
        <h4>Service Partners</h4>
        <p>We engage vetted logistics partners, packers, and transport operators to execute your move. They receive only the information necessary to complete your service and are bound by confidentiality agreements.</p>
        <h4>Payment Processors</h4>
        <p>Payments are processed by Razorpay, which maintains PCI-DSS compliance. We share only the minimum required information for transaction completion. We never store card or banking credentials on our servers.</p>
        <h4>Legal Requirements</h4>
        <p>We may disclose your information if required by law, court order, or governmental authority, or if we believe disclosure is necessary to protect the rights, property, or safety of Assure Sift Relocation, our customers, or others.</p>
      </>
    ),
  },
  {
    id: "security",
    icon: <Lock size={20} />,
    title: "Data Security",
    content: (
      <>
        <p>We implement industry-standard technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
        <ul className="lp-list">
          <li>SSL/TLS encryption for all data transmitted through our website</li>
          <li>Secure, access-controlled server environments</li>
          <li>Regular security audits and vulnerability assessments</li>
          <li>Staff training on data handling and privacy best practices</li>
          <li>Strict access controls — only authorized personnel can access your data</li>
        </ul>
        <p>While we take every precaution to protect your data, no method of internet transmission or electronic storage is 100% secure. We cannot guarantee absolute security but commit to notifying you promptly in the event of any breach affecting your personal information.</p>
      </>
    ),
  },
  {
    id: "rights",
    icon: <Bell size={20} />,
    title: "Your Rights & Choices",
    content: (
      <>
        <p>You have the following rights with respect to your personal information:</p>
        <ul className="lp-list">
          <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
          <li><strong>Deletion:</strong> Request erasure of your data, subject to legal retention obligations</li>
          <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
          <li><strong>Portability:</strong> Request your data in a structured, machine-readable format</li>
          <li><strong>Objection:</strong> Object to processing of your data for direct marketing purposes</li>
        </ul>
        <p>To exercise any of these rights, please contact us at <strong>info@assuresift.in</strong> or call <strong>+91 907 329 1732</strong>. We will respond within 30 days.</p>
      </>
    ),
  },
];

const navItems = [
  { id: "intro", label: "Introduction", icon: <Shield size={14} /> },
  { id: "collection", label: "Information We Collect", icon: <Database size={14} /> },
  { id: "usage", label: "How We Use It", icon: <Eye size={14} /> },
  { id: "sharing", label: "Sharing & Disclosure", icon: <UserCheck size={14} /> },
  { id: "security", label: "Data Security", icon: <Lock size={14} /> },
  { id: "rights", label: "Your Rights", icon: <Bell size={14} /> },
];

const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="lp-page">
      <style>{styles}</style>
      <Navbar />
      <WhatsAppButton />

      {/* Hero */}
      <section className="lp-hero">
        <div className="lp-container lp-hero-inner">
          <div className="lp-breadcrumb">
            Home <ChevronRight size={12} /> <span>Privacy Policy</span>
          </div>
          <h1>Privacy <em>Policy</em></h1>
          <p className="lp-hero-desc">
            Your privacy is fundamental to everything we do. This document explains how Assure Sift Relocation collects, uses, and protects your personal information.
          </p>
          <div className="lp-hero-meta">
            <div className="lp-hero-meta-item"><Shield size={14} /> SSL Encrypted</div>
            <div className="lp-hero-meta-item"><Lock size={14} /> Last Updated: June 2025</div>
            <div className="lp-hero-meta-item"><Eye size={14} /> Razorpay PCI-DSS Compliant</div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="lp-body">
        <div className="lp-container">
          <div className="lp-grid">
            {/* Sidebar Nav */}
            <aside>
              <nav className="lp-nav-card">
                <div className="lp-nav-header">Contents</div>
                <ul className="lp-nav-list">
                  {navItems.map((item) => (
                    <li key={item.id} className="lp-nav-item">
                      <a
                        href={`#${item.id}`}
                        className={activeSection === item.id ? "active" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        {item.icon} {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Content */}
            <div className="lp-content">
              {sections.map((s) => (
                <div key={s.id} id={s.id} className="lp-section-card">
                  <div className="lp-section-head">
                    <div className="lp-section-icon">{s.icon}</div>
                    <h3 className="lp-section-title">{s.title}</h3>
                  </div>
                  <div className="lp-section-body">{s.content}</div>
                </div>
              ))}

              {/* Contact Card */}
              <div className="lp-contact-card">
                <div>
                  <h4>Questions About Your Privacy?</h4>
                  <p>Our team is available to address any concerns regarding your personal data.</p>
                </div>
                <div className="lp-contact-links">
                  <a href="mailto:assuresiftrelocation6@gmail.com" className="lp-contact-link">
                    <Mail size={16} /> assuresiftrelocation6@gmail.com
                  </a>
                  <a href="tel:+917014329644" className="lp-contact-link">
                    <Phone size={16} /> +91 701 432 9644
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default PrivacyPolicyPage;
