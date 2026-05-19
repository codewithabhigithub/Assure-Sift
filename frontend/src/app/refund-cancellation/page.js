'use client';

import React, { useState, useEffect } from "react";
import { RefreshCcw, Clock, XCircle, CheckCircle, AlertTriangle, HelpCircle, ChevronRight, Mail, Phone } from 'lucide-react';
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
    --green:       #2A7A4B;
    --green-pale:  #E8F5EE;
    --radius-card: 20px;
    --shadow-soft: 0 2px 12px rgba(26,22,18,0.06);
    --shadow-card: 0 4px 24px rgba(26,22,18,0.10);
    --shadow-hover:0 8px 40px rgba(26,22,18,0.14);
    --font-display:'Georgia','Times New Roman',serif;
    --font-body:   'Helvetica Neue',Arial,sans-serif;
    --transition:  all 0.3s cubic-bezier(0.4,0,0.2,1);
  }

  .rc-page { background: var(--cream); font-family: var(--font-body); color: var(--text-dark); min-height: 100vh; }

  /* HERO */
  .rc-hero {
    background: var(--navy);
    padding: 120px 0 60px;
    position: relative;
    overflow: hidden;
  }
  @media (min-width: 768px) {
    .rc-hero { padding: 160px 0 80px; }
  }
  .rc-hero::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 380px; height: 380px;
    background: radial-gradient(circle, rgba(196,71,42,0.16) 0%, transparent 65%);
    pointer-events: none;
  }
  .rc-hero-inner { position: relative; z-index: 1; }
  .rc-breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.38);
    margin-bottom: 28px;
  }
  .rc-breadcrumb span { color: var(--accent); }
  .rc-hero h1 {
    font-family: var(--font-display);
    font-size: clamp(32px, 5.5vw, 68px);
    font-weight: 400;
    color: var(--white);
    margin: 0 0 20px;
    line-height: 1.1;
    letter-spacing: -0.5px;
  }
  .rc-hero h1 em { font-style: italic; color: var(--accent); }
  .rc-hero-desc {
    font-size: 15px;
    color: rgba(255,255,255,0.48);
    font-weight: 300;
    line-height: 1.7;
    max-width: 560px;
    margin-bottom: 32px;
  }
  @media (min-width: 768px) {
    .rc-hero-desc { font-size: 16px; margin-bottom: 40px; }
  }
  .rc-hero-meta {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  @media (min-width: 768px) {
    .rc-hero-meta { gap: 32px; }
  }
  .rc-hero-meta-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
  }
  @media (min-width: 768px) {
    .rc-hero-meta-item { font-size: 10px; }
  }
  .rc-hero-meta-item svg { color: var(--accent); }

  /* LAYOUT */
  .rc-container { max-width: 1160px; margin: 0 auto; padding: 0 32px; }
  @media (max-width: 600px) { .rc-container { padding: 0 16px; } }

  .rc-body { padding: 48px 0 80px; }
  @media (min-width: 768px) { .rc-body { padding: 72px 0 120px; } }
  .rc-grid {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 56px;
    align-items: start;
  }
  @media (max-width: 860px) { .rc-grid { grid-template-columns: 1fr; gap: 32px; } }

  /* SIDEBAR */
  .rc-nav-card {
    position: sticky;
    top: 100px;
    background: var(--white);
    border-radius: var(--radius-card);
    border: 1px solid var(--stone);
    box-shadow: var(--shadow-soft);
    overflow: hidden;
  }
  @media (max-width: 860px) {
    .rc-nav-card { position: relative; top: 0; }
  }
  .rc-nav-header {
    background: var(--accent);
    padding: 16px 20px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--white);
  }
  @media (min-width: 768px) { .rc-nav-header { padding: 20px 24px; } }
  .rc-nav-list { list-style: none; margin: 0; padding: 12px 0; }
  .rc-nav-item a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-muted);
    text-decoration: none;
    transition: var(--transition);
    border-left: 3px solid transparent;
  }
  @media (min-width: 768px) { .rc-nav-item a { padding: 12px 24px; } }
  .rc-nav-item a:hover,
  .rc-nav-item a.active {
    color: var(--accent);
    background: var(--accent-pale);
    border-left-color: var(--accent);
  }

  /* CONTENT */
  .rc-content { display: flex; flex-direction: column; gap: 32px; min-width: 0; max-width: 100%; }
  @media (min-width: 768px) { .rc-content { gap: 40px; } }

  /* QUICK SUMMARY CARDS */
  .rc-summary-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  @media (max-width: 680px) { .rc-summary-grid { grid-template-columns: 1fr; } }

  .rc-summary-card {
    background: var(--white);
    border-radius: 16px;
    border: 1px solid var(--stone);
    padding: 20px 16px;
    text-align: center;
    box-shadow: var(--shadow-soft);
  }
  @media (min-width: 768px) { .rc-summary-card { padding: 24px 22px; } }
  .rc-summary-icon {
    width: 48px; height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 14px;
  }
  .rc-summary-icon--green { background: var(--green-pale); color: var(--green); }
  .rc-summary-icon--orange { background: #FFF4E5; color: #C47D2A; }
  .rc-summary-icon--red { background: var(--accent-pale); color: var(--accent); }

  .rc-summary-card h5 {
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 400;
    color: var(--text-dark);
    margin: 0 0 6px;
  }
  @media (min-width: 768px) { .rc-summary-card h5 { font-size: 16px; } }
  .rc-summary-card p {
    font-size: 13px;
    color: var(--text-muted);
    font-weight: 300;
    line-height: 1.5;
    margin: 0;
  }

  .rc-section-card {
    background: var(--white);
    border-radius: var(--radius-card);
    border: 1px solid var(--stone);
    box-shadow: var(--shadow-soft);
    overflow: hidden;
    scroll-margin-top: 110px;
  }
  .rc-section-head {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px 24px;
    border-bottom: 1px solid var(--cream-dark);
    background: var(--cream);
  }
  @media (min-width: 768px) { .rc-section-head { gap: 16px; padding: 28px 36px; } }
  .rc-section-icon {
    width: 36px; height: 36px;
    border-radius: 8px;
    background: var(--accent-pale);
    border: 1px solid rgba(196,71,42,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent);
    flex-shrink: 0;
  }
  @media (min-width: 768px) { .rc-section-icon { width: 44px; height: 44px; border-radius: 10px; } }
  .rc-section-title {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 400;
    color: var(--text-dark);
    margin: 0;
    letter-spacing: -0.2px;
  }
  @media (min-width: 768px) { .rc-section-title { font-size: 22px; } }
  .rc-section-body { padding: 24px; }
  @media (min-width: 768px) { .rc-section-body { padding: 32px 36px; } }
  .rc-section-body p {
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-body);
    font-weight: 300;
    margin: 0 0 16px;
  }
  @media (min-width: 768px) { .rc-section-body p { font-size: 15px; line-height: 1.78; margin: 0 0 16px; } }
  .rc-section-body p:last-child { margin-bottom: 0; }
  .rc-section-body h4 {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 400;
    color: var(--text-dark);
    margin: 24px 0 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--cream-dark);
  }
  @media (min-width: 768px) { .rc-section-body h4 { font-size: 17px; margin: 28px 0 12px; } }
  .rc-list {
    list-style: none;
    margin: 0 0 16px;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  @media (min-width: 768px) { .rc-list { gap: 10px; } }
  .rc-list li {
    position: relative;
    padding-left: 20px;
    font-size: 14px;
    line-height: 1.5;
    color: var(--text-body);
    font-weight: 300;
  }
  @media (min-width: 768px) { .rc-list li { font-size: 15px; line-height: 1.65; padding-left: 24px; } }
  .rc-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent);
  }
  @media (min-width: 768px) { .rc-list li::before { top: 9px; } }
  .rc-list--check li::before { display: none; }
  .rc-list--check li { gap: 10px; }
  .rc-list--check .rc-check { flex-shrink: 0; margin-top: 2px; }

  /* TIMELINE TABLE */
  .rc-timeline-wrap { overflow-x: auto; margin: 16px 0; border-radius: 12px; }
  .rc-timeline {
    display: flex;
    flex-direction: column;
    gap: 0;
    min-width: 600px;
    border: 1px solid var(--stone);
    border-radius: 12px;
    overflow: hidden;
  }
  .rc-timeline-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-bottom: 1px solid var(--stone);
  }
  .rc-timeline-row:last-child { border-bottom: none; }
  .rc-timeline-head { background: var(--navy); }
  .rc-timeline-head .rc-tl-cell {
    color: var(--white);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 14px 18px;
    border-right: 1px solid rgba(255,255,255,0.1);
  }
  .rc-timeline-head .rc-tl-cell:last-child { border-right: none; }
  .rc-tl-cell {
    padding: 16px 18px;
    font-size: 13px;
    color: var(--text-body);
    font-weight: 300;
    line-height: 1.5;
    border-right: 1px solid var(--stone);
  }
  @media (min-width: 768px) { .rc-tl-cell { font-size: 14px; } }
  .rc-tl-cell:last-child { border-right: none; }
  .rc-timeline-row:nth-child(even) .rc-tl-cell { background: var(--cream); }
  .rc-tl-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 600;
  }
  @media (min-width: 768px) { .rc-tl-badge { font-size: 11px; } }
  .rc-tl-badge--green { background: var(--green-pale); color: var(--green); }
  .rc-tl-badge--orange { background: #FFF4E5; color: #C47D2A; }
  .rc-tl-badge--red { background: var(--accent-pale); color: var(--accent); }

  /* ALERT */
  .rc-alert {
    background: var(--accent-pale);
    border: 1px solid rgba(196,71,42,0.2);
    border-radius: 12px;
    padding: 16px 20px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 13px;
    color: var(--accent-dark);
    font-weight: 400;
    line-height: 1.6;
  }
  @media (min-width: 768px) { .rc-alert { padding: 18px 24px; font-size: 14px; gap: 14px; } }
  .rc-alert svg { flex-shrink: 0; margin-top: 2px; }

  /* CONTACT */
  .rc-contact-card {
    background: var(--navy);
    border-radius: var(--radius-card);
    padding: 32px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
    position: relative;
    overflow: hidden;
  }
  @media (min-width: 768px) { .rc-contact-card { padding: 44px 40px; gap: 32px; } }
  .rc-contact-card::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(196,71,42,0.2) 0%, transparent 65%);
    pointer-events: none;
  }
  .rc-contact-card h4 {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 400;
    color: var(--white);
    margin: 0 0 8px;
  }
  .rc-contact-card p { font-size: 14px; color: rgba(255,255,255,0.45); font-weight: 300; margin: 0; }
  .rc-contact-links { display: flex; gap: 12px; flex-wrap: wrap; }
  @media (max-width: 600px) {
    .rc-contact-links { flex-direction: column; width: 100%; }
  }
  .rc-contact-link {
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
    word-break: break-all;
  }
  @media (max-width: 600px) {
    .rc-contact-link { justify-content: center; width: 100%; font-size: 12px; padding: 10px 14px; }
  }
  .rc-contact-link:hover { background: var(--accent); border-color: var(--accent); }
  .rc-contact-link svg { color: var(--accent); flex-shrink: 0; }
  .rc-contact-link:hover svg { color: var(--white); }

  .rc-label {
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
    id: "overview",
    icon: <RefreshCcw size={20} />,
    title: "Policy Overview",
    content: (
      <>
        <p>At Assure Sift Relocation, we understand that plans can change. This Refund and Cancellation Policy outlines the terms under which cancellations are accepted, refunds are processed, and rescheduling is facilitated.</p>
        <p>We encourage all clients to review this policy carefully before confirming a booking. By making a payment to Assure Sift Relocation, you acknowledge and agree to the terms set forth herein.</p>
        <p>All cancellation and refund requests must be submitted in writing via email to <strong>info@assuresift.in</strong> or in person at our registered office. Verbal cancellations will not be accepted.</p>
      </>
    ),
  },
  {
    id: "cancellation",
    icon: <XCircle size={20} />,
    title: "Cancellation Policy",
    content: (
      <>
        <p>Cancellation charges are applied based on the notice period provided before the scheduled move date:</p>
        <div className="rc-timeline-wrap">
          <div className="rc-timeline">
            <div className="rc-timeline-row rc-timeline-head">
              <div className="rc-tl-cell">Notice Period</div>
              <div className="rc-tl-cell">Cancellation Fee</div>
              <div className="rc-tl-cell">Refund Status</div>
            </div>
            <div className="rc-timeline-row">
              <div className="rc-tl-cell">15+ days before move</div>
              <div className="rc-tl-cell">10% of total booking value</div>
              <div className="rc-tl-cell"><span className="rc-tl-badge rc-tl-badge--green"><CheckCircle size={12} /> 90% Refund</span></div>
            </div>
            <div className="rc-timeline-row">
              <div className="rc-tl-cell">8–14 days before move</div>
              <div className="rc-tl-cell">25% of total booking value</div>
              <div className="rc-tl-cell"><span className="rc-tl-badge rc-tl-badge--green"><CheckCircle size={12} /> 75% Refund</span></div>
            </div>
            <div className="rc-timeline-row">
              <div className="rc-tl-cell">3–7 days before move</div>
              <div className="rc-tl-cell">50% of total booking value</div>
              <div className="rc-tl-cell"><span className="rc-tl-badge rc-tl-badge--orange"><Clock size={12} /> 50% Refund</span></div>
            </div>
            <div className="rc-timeline-row">
              <div className="rc-tl-cell">48–72 hours before move</div>
              <div className="rc-tl-cell">75% of total booking value</div>
              <div className="rc-tl-cell"><span className="rc-tl-badge rc-tl-badge--orange"><Clock size={12} /> 25% Refund</span></div>
            </div>
            <div className="rc-timeline-row">
              <div className="rc-tl-cell">Less than 48 hours / No-Show</div>
              <div className="rc-tl-cell">100% of total booking value</div>
              <div className="rc-tl-cell"><span className="rc-tl-badge rc-tl-badge--red"><XCircle size={12} /> No Refund</span></div>
            </div>
          </div>
        </div>
        <p>Cancellation fees are computed on the total confirmed booking value including GST. The booking advance is non-transferable to a third party.</p>
      </>
    ),
  },
  {
    id: "refunds",
    icon: <CheckCircle size={20} />,
    title: "Refund Process",
    content: (
      <>
        <p>Approved refunds are processed within the following timelines, subject to the cancellation policy above:</p>
        <h4>Refund Timeline</h4>
        <ul className="rc-list">
          <li>Refunds are initiated within <strong>5–7 business days</strong> of receiving a valid written cancellation request</li>
          <li>The amount will be credited to the original payment source (bank account, UPI, credit/debit card) used at the time of booking</li>
          <li>Bank processing may take an additional 3–5 business days depending on your financial institution</li>
          <li>Razorpay transaction fees (if applicable) may be deducted from the refund amount</li>
        </ul>
        <h4>Non-Refundable Components</h4>
        <ul className="rc-list">
          <li>Survey and inspection fees (if separately charged)</li>
          <li>Materials purchased and used for packing if packing has already commenced</li>
          <li>Toll, permit, or special permissions obtained specifically for your consignment</li>
          <li>Any third-party charges already incurred on behalf of the client</li>
        </ul>
        <p>Refund requests will be acknowledged via email within 24 hours of submission. A refund reference number will be provided for tracking.</p>
      </>
    ),
  },
  {
    id: "rescheduling",
    icon: <Clock size={20} />,
    title: "Rescheduling Policy",
    content: (
      <>
        <p>We understand that circumstances can necessitate a change in moving dates. Rescheduling is permitted under the following conditions:</p>
        <ul className="rc-list">
          <li>Rescheduling requests made <strong>7 or more days</strong> before the move date: No rescheduling fee — one free reschedule permitted</li>
          <li>Rescheduling requests made <strong>3–6 days</strong> before the move date: A rescheduling fee of ₹500–₹1,500 (depending on move size) applies</li>
          <li>Rescheduling requests made <strong>less than 72 hours</strong> before the move date: Treated as a cancellation and re-booking; cancellation policy applies</li>
          <li>A maximum of <strong>two reschedules</strong> are permitted per booking. Subsequent changes will be treated as new bookings</li>
        </ul>
        <p>New move dates are subject to availability and cannot be guaranteed, particularly during peak seasons (April–June, October–November). We recommend confirming your preferred date at the earliest opportunity.</p>
        <h4>Force Majeure Rescheduling</h4>
        <p>In the event of natural disasters, government-imposed restrictions, severe weather, or other force majeure events that prevent execution of the move, we will reschedule at no additional charge, subject to crew and vehicle availability.</p>
      </>
    ),
  },
  {
    id: "exceptions",
    icon: <AlertTriangle size={20} />,
    title: "Exceptions & Special Cases",
    content: (
      <>
        <p>The following situations are handled outside the standard cancellation framework:</p>
        <h4>Service Failure by Assure Sift Relocation</h4>
        <p>If we are unable to fulfill a confirmed booking due to circumstances within our control (vehicle breakdown, crew unavailability, etc.), the client is entitled to a full refund of any advance paid, without deduction. We will also prioritize rescheduling at no additional cost.</p>
        <h4>Partial Service Cancellation</h4>
        <p>If a client wishes to cancel part of a multi-component booking (e.g., remove vehicle transport from a household move), the cancellation charges apply only to the cancelled component, and the remaining services proceed as planned.</p>
        <h4>Medical or Bereavement</h4>
        <p>In cases of documented medical emergencies or bereavement, we will consider waiver or reduction of cancellation fees on a case-by-case basis. Supporting documentation will be required.</p>
        <h4>Disputes</h4>
        <p>If you believe a cancellation charge has been applied incorrectly, please contact us within 7 days of the charge. We will review and respond within 5 business days.</p>
      </>
    ),
  },
  {
    id: "faq",
    icon: <HelpCircle size={20} />,
    title: "Frequently Asked Questions",
    content: (
      <>
        {[
          {
            q: "How do I cancel my booking?",
            a: "Send a cancellation request to info@assuresift.in with your booking reference number and reason for cancellation. You will receive a confirmation and refund timeline within 24 hours."
          },
          {
            q: "Can I cancel on the day of the move?",
            a: "Yes, but cancellations within 48 hours of the scheduled move are subject to a 100% cancellation fee. No refund will be issued for same-day cancellations."
          },
          {
            q: "How will I receive my refund?",
            a: "Refunds are returned to the original payment method used during booking — UPI, bank account, or credit/debit card. We do not issue cash refunds."
          },
          {
            q: "What if I paid cash?",
            a: "For cash payments, refunds will be processed as a bank transfer (NEFT/IMPS) to your registered bank account. Please provide your bank details at the time of cancellation."
          },
          {
            q: "Is the booking advance refundable?",
            a: "The booking advance is partially refundable based on the notice period. Please refer to the cancellation schedule above for exact amounts."
          },
        ].map(({ q, a }, i) => (
          <div key={i} style={{ marginBottom: i < 4 ? "24px" : "0" }}>
            <h4 style={{ marginTop: i === 0 ? "0" : undefined }}>{q}</h4>
            <p style={{ marginBottom: 0 }}>{a}</p>
          </div>
        ))}
      </>
    ),
  },
];

const navItems = [
  { id: "overview",      label: "Policy Overview",       icon: <RefreshCcw size={14} /> },
  { id: "cancellation",  label: "Cancellation Policy",   icon: <XCircle size={14} /> },
  { id: "refunds",       label: "Refund Process",        icon: <CheckCircle size={14} /> },
  { id: "rescheduling",  label: "Rescheduling",          icon: <Clock size={14} /> },
  { id: "exceptions",   label: "Exceptions",            icon: <AlertTriangle size={14} /> },
  { id: "faq",          label: "FAQs",                  icon: <HelpCircle size={14} /> },
];

const RefundCancellationPage = () => {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
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
    <main className="rc-page">
      <style>{styles}</style>
      <Navbar />
      <WhatsAppButton />

      {/* Hero */}
      <section className="rc-hero">
        <div className="rc-container rc-hero-inner">
          <div className="rc-breadcrumb">
            Home <ChevronRight size={12} /> <span>Refund &amp; Cancellation</span>
          </div>
          <h1>Refund &amp; <em>Cancellation</em></h1>
          <p className="rc-hero-desc">
            Transparent, fair, and clearly defined — our refund and cancellation policy is designed to protect both you and the quality of our service commitments.
          </p>
          <div className="rc-hero-meta">
            <div className="rc-hero-meta-item"><RefreshCcw size={14} /> Refunds in 5–7 Days</div>
            <div className="rc-hero-meta-item"><Clock size={14} /> Effective: June 2025</div>
            <div className="rc-hero-meta-item"><CheckCircle size={14} /> Razorpay Secured</div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="rc-body">
        <div className="rc-container">

          {/* Quick Summary */}
          <div style={{ marginBottom: "56px" }}>
            <span className="rc-label">At a Glance</span>
            <div className="rc-summary-grid">
              <div className="rc-summary-card">
                <div className="rc-summary-icon rc-summary-icon--green">
                  <CheckCircle size={22} />
                </div>
                <h5>Full Refund</h5>
                <p>Cancel 15+ days before your move for up to 90% back</p>
              </div>
              <div className="rc-summary-card">
                <div className="rc-summary-icon rc-summary-icon--orange">
                  <Clock size={22} />
                </div>
                <h5>Partial Refund</h5>
                <p>3–14 days notice: 25–75% refund depending on timing</p>
              </div>
              <div className="rc-summary-card">
                <div className="rc-summary-icon rc-summary-icon--red">
                  <XCircle size={22} />
                </div>
                <h5>No Refund</h5>
                <p>Cancellations within 48 hours of move date</p>
              </div>
            </div>
          </div>

          <div className="rc-grid">
            {/* Sidebar */}
            <aside>
              <nav className="rc-nav-card">
                <div className="rc-nav-header">Contents</div>
                <ul className="rc-nav-list">
                  {navItems.map((item) => (
                    <li key={item.id} className="rc-nav-item">
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
            <div className="rc-content">
              <div className="rc-alert">
                <AlertTriangle size={18} />
                All cancellation requests must be submitted in writing to info@assuresift.in with your booking reference. Refund timelines begin from receipt of a valid written request.
              </div>

              {sections.map((s) => (
                <div key={s.id} id={s.id} className="rc-section-card">
                  <div className="rc-section-head">
                    <div className="rc-section-icon">{s.icon}</div>
                    <h3 className="rc-section-title">{s.title}</h3>
                  </div>
                  <div className="rc-section-body">{s.content}</div>
                </div>
              ))}

              <div className="rc-contact-card">
                <div>
                  <h4>Need to Cancel or Reschedule?</h4>
                  <p>Contact our team immediately — the sooner we know, the better we can help.</p>
                </div>
                <div className="rc-contact-links">
                  <a href="mailto:assuresiftrelocation6@gmail.com" className="rc-contact-link">
                    <Mail size={16} /> assuresiftrelocation6@gmail.com
                  </a>
                  <a href="tel:+917014329644" className="rc-contact-link">
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

export default RefundCancellationPage;
