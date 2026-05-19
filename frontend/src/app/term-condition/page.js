'use client';

import React, { useState, useEffect } from "react";
import { FileText, Truck, AlertTriangle, CreditCard, Scale, Ban, PhoneCall, ChevronRight, Mail, Phone } from 'lucide-react';
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

  .tc-page { background: var(--cream); font-family: var(--font-body); color: var(--text-dark); min-height: 100vh; }

  /* HERO */
  .tc-hero {
    background: var(--navy);
    padding: 120px 0 60px;
    position: relative;
    overflow: hidden;
  }
  @media (min-width: 768px) {
    .tc-hero { padding: 160px 0 80px; }
  }
  .tc-hero::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 380px; height: 380px;
    background: radial-gradient(circle, rgba(196,71,42,0.16) 0%, transparent 65%);
    pointer-events: none;
  }
  .tc-hero-inner { position: relative; z-index: 1; }
  .tc-breadcrumb {
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
  .tc-breadcrumb span { color: var(--accent); }
  .tc-hero h1 {
    font-family: var(--font-display);
    font-size: clamp(32px, 6vw, 72px);
    font-weight: 400;
    color: var(--white);
    margin: 0 0 20px;
    line-height: 1.1;
    letter-spacing: -0.5px;
  }
  .tc-hero h1 em { font-style: italic; color: var(--accent); }
  .tc-hero-desc {
    font-size: 15px;
    color: rgba(255,255,255,0.48);
    font-weight: 300;
    line-height: 1.7;
    max-width: 560px;
    margin-bottom: 32px;
  }
  @media (min-width: 768px) {
    .tc-hero-desc { font-size: 16px; margin-bottom: 40px; }
  }
  .tc-hero-meta {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  @media (min-width: 768px) {
    .tc-hero-meta { gap: 32px; }
  }
  .tc-hero-meta-item {
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
    .tc-hero-meta-item { font-size: 10px; }
  }
  .tc-hero-meta-item svg { color: var(--accent); }

  /* LAYOUT */
  .tc-container { max-width: 1160px; margin: 0 auto; padding: 0 32px; }
  @media (max-width: 600px) { .tc-container { padding: 0 16px; } }

  .tc-body { padding: 48px 0 80px; }
  @media (min-width: 768px) { .tc-body { padding: 72px 0 120px; } }
  .tc-grid {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 56px;
    align-items: start;
  }
  @media (max-width: 860px) { .tc-grid { grid-template-columns: 1fr; gap: 32px; } }

  /* SIDEBAR */
  .tc-nav-card {
    position: sticky;
    top: 100px;
    background: var(--white);
    border-radius: var(--radius-card);
    border: 1px solid var(--stone);
    box-shadow: var(--shadow-soft);
    overflow: hidden;
  }
  @media (max-width: 860px) {
    .tc-nav-card { position: relative; top: 0; }
  }
  .tc-nav-header {
    background: var(--accent);
    padding: 16px 20px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--white);
  }
  @media (min-width: 768px) { .tc-nav-header { padding: 20px 24px; } }
  .tc-nav-list { list-style: none; margin: 0; padding: 12px 0; }
  .tc-nav-item a {
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
  @media (min-width: 768px) { .tc-nav-item a { padding: 12px 24px; } }
  .tc-nav-item a:hover,
  .tc-nav-item a.active {
    color: var(--accent);
    background: var(--accent-pale);
    border-left-color: var(--accent);
  }

  /* CONTENT */
  .tc-content { display: flex; flex-direction: column; gap: 32px; min-width: 0; max-width: 100%; }
  @media (min-width: 768px) { .tc-content { gap: 40px; } }

  /* ALERT BANNER */
  .tc-alert {
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
  @media (min-width: 768px) { .tc-alert { padding: 18px 24px; font-size: 14px; gap: 14px; } }
  .tc-alert svg { flex-shrink: 0; margin-top: 2px; }

  .tc-section-card {
    background: var(--white);
    border-radius: var(--radius-card);
    border: 1px solid var(--stone);
    box-shadow: var(--shadow-soft);
    overflow: hidden;
    scroll-margin-top: 110px;
  }
  .tc-section-head {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px 24px;
    border-bottom: 1px solid var(--cream-dark);
    background: var(--cream);
  }
  @media (min-width: 768px) { .tc-section-head { gap: 16px; padding: 28px 36px; } }
  .tc-section-icon {
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
  @media (min-width: 768px) { .tc-section-icon { width: 44px; height: 44px; border-radius: 10px; } }
  .tc-section-title {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 400;
    color: var(--text-dark);
    margin: 0;
    letter-spacing: -0.2px;
  }
  @media (min-width: 768px) { .tc-section-title { font-size: 22px; } }
  .tc-section-body { padding: 24px; }
  @media (min-width: 768px) { .tc-section-body { padding: 32px 36px; } }
  .tc-section-body p {
    font-size: 14px;
    line-height: 1.6;
    color: var(--text-body);
    font-weight: 300;
    margin: 0 0 16px;
  }
  @media (min-width: 768px) { .tc-section-body p { font-size: 15px; line-height: 1.78; margin: 0 0 16px; } }
  .tc-section-body p:last-child { margin-bottom: 0; }
  .tc-section-body h4 {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 400;
    color: var(--text-dark);
    margin: 24px 0 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--cream-dark);
  }
  @media (min-width: 768px) { .tc-section-body h4 { font-size: 17px; margin: 28px 0 12px; } }
  .tc-list {
    list-style: none;
    margin: 0 0 16px;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  @media (min-width: 768px) { .tc-list { gap: 10px; } }
  .tc-list li {
    position: relative;
    padding-left: 20px;
    font-size: 14px;
    line-height: 1.5;
    color: var(--text-body);
    font-weight: 300;
  }
  @media (min-width: 768px) { .tc-list li { font-size: 15px; line-height: 1.65; padding-left: 24px; } }
  .tc-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent);
  }
  @media (min-width: 768px) { .tc-list li::before { top: 9px; } }

  /* TABLE */
  .tc-table-wrap { overflow-x: auto; margin: 16px 0; border-radius: 8px; box-shadow: 0 0 0 1px var(--cream-dark); }
  .tc-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  @media (min-width: 768px) { .tc-table { font-size: 14px; } }
  .tc-table th {
    background: var(--navy);
    color: var(--white);
    padding: 12px 16px;
    text-align: left;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  @media (min-width: 768px) { .tc-table th { padding: 12px 20px; font-size: 10px; } }
  .tc-table th:first-child { border-radius: 8px 0 0 0; }
  .tc-table th:last-child  { border-radius: 0 8px 0 0; }
  .tc-table td {
    padding: 12px 16px;
    border-bottom: 1px solid var(--cream-dark);
    color: var(--text-body);
    font-weight: 300;
    vertical-align: top;
  }
  @media (min-width: 768px) { .tc-table td { padding: 14px 20px; } }
  .tc-table tr:last-child td { border-bottom: none; }
  .tc-table tr:nth-child(even) td { background: var(--cream); }

  /* CONTACT CARD */
  .tc-contact-card {
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
  @media (min-width: 768px) { .tc-contact-card { padding: 44px 40px; gap: 32px; } }
  .tc-contact-card::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(196,71,42,0.2) 0%, transparent 65%);
    pointer-events: none;
  }
  .tc-contact-card h4 {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 400;
    color: var(--white);
    margin: 0 0 8px;
  }
  .tc-contact-card p {
    font-size: 14px;
    color: rgba(255,255,255,0.45);
    font-weight: 300;
    margin: 0;
  }
  .tc-contact-links { display: flex; gap: 12px; flex-wrap: wrap; }
  @media (max-width: 600px) {
    .tc-contact-links { flex-direction: column; width: 100%; }
  }
  .tc-contact-link {
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
    .tc-contact-link { justify-content: center; width: 100%; font-size: 12px; padding: 10px 14px; }
  }
  .tc-contact-link:hover { background: var(--accent); border-color: var(--accent); }
  .tc-contact-link svg { color: var(--accent); flex-shrink: 0; }
  .tc-contact-link:hover svg { color: var(--white); }

  .tc-label {
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
        id: "acceptance",
        icon: <FileText size={20} />,
        title: "Acceptance of Terms",
        content: (
            <>
                <p>By accessing our website, requesting a quotation, booking a service, or making a payment, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions. These terms constitute a legally binding agreement between you {`"Client"`} and Assure Sift Relocation {`"Company"`}.</p>
                <p>If you are acting on behalf of a corporation or other legal entity, you represent that you have the authority to bind that entity to these terms. If you do not have such authority, or do not agree to these terms, you must not use our services.</p>
                <p>We reserve the right to modify these terms at any time. Changes take effect upon posting to our website. Continued use of our services after such changes constitutes your acceptance of the revised terms.</p>
            </>
        ),
    },
    {
        id: "services",
        icon: <Truck size={20} />,
        title: "Services & Scope",
        content: (
            <>
                <p>Assure Sift Relocation provides professional packing, moving, transportation, storage, and related relocation services within India and for international consignments, subject to applicable regulations.</p>
                <h4>Included Services</h4>
                <ul className="tc-list">
                    <li>Household and office packing & unpacking</li>
                    <li>Local, intercity, and interstate moving</li>
                    <li>Specialized handling of fragile, antique, and high-value items</li>
                    <li>Vehicle transportation (two-wheelers and four-wheelers)</li>
                    <li>Warehousing and storage solutions</li>
                    <li>International relocation and customs assistance</li>
                </ul>
                <h4>Service Exclusions</h4>
                <ul className="tc-list">
                    <li>Transportation of prohibited items (explosives, narcotics, illegal goods)</li>
                    <li>Items not declared at the time of booking</li>
                    <li>Services explicitly excluded in your written quotation</li>
                </ul>
                <p>The final scope of services is defined in your individual quotation and booking confirmation. Any changes to scope must be agreed upon in writing prior to execution.</p>
            </>
        ),
    },
    {
        id: "liability",
        icon: <AlertTriangle size={20} />,
        title: "Liability & Claims",
        content: (
            <>
                <p>Assure Sift Relocation takes every precaution to handle your belongings with care. However, our liability is limited as follows:</p>
                <h4>Liability Cap</h4>
                <p>Our maximum liability for loss or damage to goods is limited to the declared value at the time of booking or the actual repair/replacement cost, whichever is lower. We strongly recommend purchasing transit insurance for high-value items.</p>
                <h4>Excluded Liabilities</h4>
                <ul className="tc-list">
                    <li>Damage arising from inherent defects, improper original packaging by the client, or items packed by the client themselves</li>
                    <li>Loss or damage caused by natural disasters, acts of God, civil unrest, or force majeure events</li>
                    <li>Perishable goods, currency, jewelry, documents, and valuables not explicitly covered in the service agreement</li>
                    <li>Indirect, consequential, or economic losses of any kind</li>
                    <li>Damage to items not disclosed or assessed during the pre-move survey</li>
                </ul>
                <h4>Claims Process</h4>
                <p>All damage claims must be reported in writing within 48 hours of delivery. Claims submitted after this window may not be entertained. Supporting photographs and documentation must accompany the claim.</p>
            </>
        ),
    },
    {
        id: "payment",
        icon: <CreditCard size={20} />,
        title: "Payment Terms",
        content: (
            <>
                <p>All payments are processed in Indian Rupees (INR) via our secure Razorpay gateway unless otherwise agreed in writing.</p>
                <div className="tc-table-wrap">
                    <table className="tc-table">
                        <thead>
                            <tr>
                                <th>Payment Stage</th>
                                <th>Amount</th>
                                <th>Timing</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Booking Advance</td>
                                <td>As per quotation (typically 20–30%)</td>
                                <td>At time of booking confirmation</td>
                            </tr>
                            <tr>
                                <td>Pre-Move Payment</td>
                                <td>Balance as per quotation</td>
                                <td>Prior to loading/dispatch</td>
                            </tr>
                            <tr>
                                <td>Additional Charges</td>
                                <td>If applicable (extra floors, waiting, etc.)</td>
                                <td>At time of delivery</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul className="tc-list">
                    <li>Goods will not be released until full payment is received</li>
                    <li>Additional charges for unforeseen circumstances (extra loading floors, long carries, waiting time) will be communicated and billed separately</li>
                    <li>All prices are subject to applicable GST as per Indian tax regulations</li>
                    <li>Invoices and payment receipts will be issued electronically to your registered email</li>
                </ul>
            </>
        ),
    },
    {
        id: "obligations",
        icon: <Scale size={20} />,
        title: "Client Obligations",
        content: (
            <>
                <p>To ensure smooth execution of your move, you agree to the following obligations:</p>
                <ul className="tc-list">
                    <li>Provide accurate and complete information about items to be moved, including any fragile, high-value, or hazardous goods</li>
                    <li>Ensure access to both origin and destination premises on the agreed date and time</li>
                    <li>Obtain any necessary permissions (housing society, landlord, building management) for the move</li>
                    <li>Be present or appoint an authorized representative during loading and delivery</li>
                    <li>Verify and sign the inventory list (packing list) at the time of loading</li>
                    <li>Inspect and acknowledge delivery condition before signing the Proof of Delivery</li>
                    <li>Not pack prohibited items without disclosure to Assure Sift Relocation</li>
                </ul>
                <p>Failure to fulfill these obligations may limit your ability to raise claims and may result in additional charges for delays caused by your non-compliance.</p>
            </>
        ),
    },
    {
        id: "prohibited",
        icon: <Ban size={20} />,
        title: "Prohibited Items",
        content: (
            <>
                <p>The following items are strictly prohibited from being transported by Assure Sift Relocation under any circumstances:</p>
                <ul className="tc-list">
                    <li>Narcotics, controlled substances, and illegal drugs</li>
                    <li>Explosives, ammunition, firearms, and weapons</li>
                    <li>Flammable liquids, compressed gas cylinders, and hazardous chemicals</li>
                    <li>Perishable food items and live plants (without prior written approval)</li>
                    <li>Live animals and pets</li>
                    <li>Currency, negotiable instruments, and bearer bonds</li>
                    <li>Pornographic or obscene material</li>
                    <li>Stolen goods or goods that infringe on any third-party rights</li>
                </ul>
                <p>If prohibited items are discovered during packing or transit, we reserve the right to refuse transport, remove such items, and notify relevant authorities if required by law. The client assumes full legal and financial responsibility for any consequences arising from undisclosed prohibited items.</p>
            </>
        ),
    },
    {
        id: "disputes",
        icon: <PhoneCall size={20} />,
        title: "Dispute Resolution & Governing Law",
        content: (
            <>
                <p>These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from or related to these terms or our services shall be subject to the exclusive jurisdiction of the courts of Agra, Uttar Pradesh.</p>
                <h4>Resolution Process</h4>
                <ul className="tc-list">
                    <li><strong>Step 1 – Contact Us:</strong> Raise your concern with our customer support team within 48 hours of the issue arising</li>
                    <li><strong>Step 2 – Internal Review:</strong> We will acknowledge your complaint within 24 hours and resolve it within 7 business days</li>
                    <li><strong>Step 3 – Escalation:</strong> Unresolved disputes may be escalated to our senior management team</li>
                    <li><strong>Step 4 – Arbitration:</strong> If still unresolved, disputes shall be settled by binding arbitration under the Arbitration and Conciliation Act, 1996</li>
                </ul>
                <p>Both parties agree to attempt good-faith resolution before initiating formal legal proceedings.</p>
            </>
        ),
    },
];

const navItems = [
    { id: "acceptance", label: "Acceptance of Terms", icon: <FileText size={14} /> },
    { id: "services", label: "Services & Scope", icon: <Truck size={14} /> },
    { id: "liability", label: "Liability & Claims", icon: <AlertTriangle size={14} /> },
    { id: "payment", label: "Payment Terms", icon: <CreditCard size={14} /> },
    { id: "obligations", label: "Client Obligations", icon: <Scale size={14} /> },
    { id: "prohibited", label: "Prohibited Items", icon: <Ban size={14} /> },
    { id: "disputes", label: "Dispute Resolution", icon: <PhoneCall size={14} /> },
];

const TermConditionPage = () => {
    const [activeSection, setActiveSection] = useState("acceptance");

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
        <main className="tc-page">
            <style>{styles}</style>
            <Navbar />
            <WhatsAppButton />

            {/* Hero */}
            <section className="tc-hero">
                <div className="tc-container tc-hero-inner">
                    <div className="tc-breadcrumb">
                        Home <ChevronRight size={12} /> <span>Terms &amp; Conditions</span>
                    </div>
                    <h1>Terms &amp; <em>Conditions</em></h1>
                    <p className="tc-hero-desc">
                        Please read these terms carefully before using our services. They define the rights and responsibilities of both parties to ensure a smooth and transparent relocation experience.
                    </p>
                    <div className="tc-hero-meta">
                        <div className="tc-hero-meta-item"><FileText size={14} /> Effective: June 2025</div>
                        <div className="tc-hero-meta-item"><Scale size={14} /> Governed by Indian Law</div>
                        <div className="tc-hero-meta-item"><PhoneCall size={14} /> Jurisdiction: Agra, UP</div>
                    </div>
                </div>
            </section>

            {/* Body */}
            <section className="tc-body">
                <div className="tc-container">
                    <div className="tc-grid">
                        {/* Sidebar */}
                        <aside>
                            <nav className="tc-nav-card">
                                <div className="tc-nav-header">Contents</div>
                                <ul className="tc-nav-list">
                                    {navItems.map((item) => (
                                        <li key={item.id} className="tc-nav-item">
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
                        <div className="tc-content">
                            <div className="tc-alert">
                                <AlertTriangle size={18} />
                                By booking any service with Assure Sift Relocation, you agree to be bound by these Terms &amp; Conditions. Please review them carefully before proceeding.
                            </div>

                            {sections.map((s) => (
                                <div key={s.id} id={s.id} className="tc-section-card">
                                    <div className="tc-section-head">
                                        <div className="tc-section-icon">{s.icon}</div>
                                        <h3 className="tc-section-title">{s.title}</h3>
                                    </div>
                                    <div className="tc-section-body">{s.content}</div>
                                </div>
                            ))}

                            <div className="tc-contact-card">
                                <div>
                                    <h4>Have a Legal Query?</h4>
                                    <p>Our team is happy to clarify any terms before you book.</p>
                                </div>
                                <div className="tc-contact-links">
                                    <a href="mailto:assuresiftrelocation6@gmail.com" className="tc-contact-link">
                                        <Mail size={16} /> assuresiftrelocation6@gmail.com
                                    </a>
                                    <a href="tel:+917014329644" className="tc-contact-link">
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

export default TermConditionPage;
