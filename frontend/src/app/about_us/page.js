'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Target, 
  Telescope,
  Award,
  Handshake,
  Gem
} from 'lucide-react';
import { motion } from 'framer-motion';

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/common/Layout";
import WhatsAppButton from "@/components/WhatsAppButton";

// Assets
import movers_packers from '@/assets/movers_packers.jpg';
import instruction from '@/assets/instruction.jpg';

const Counter = ({ value }) => {
  const [count, setCount] = React.useState(0);
  const countRef = React.useRef(null);
  const targetStr = value.toString();
  const target = parseInt(targetStr.replace(/\D/g, '')) || 0;
  const suffix = targetStr.replace(/[0-9]/g, '');

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-[#F8F6F2]">
      <Navbar />

      {/* SECTION 1 — PAGE HERO BANNER */}
      <section className="bg-[#F8F6F2] h-[320px] pt-[100px] flex items-center justify-center text-center">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
          >
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#C4472A]">OUR STORY</span>
            <h1 className="font-display font-bold text-[clamp(32px,5vw,60px)] text-[#1A1A2E] mt-2 leading-[1.1]">
              India&apos;s Most Trusted Relocation Partner
            </h1>
            <p className="font-body text-[16px] text-[#777] max-w-[560px] mx-auto mt-3 leading-relaxed">
              Built on trust, driven by excellence — Assure Sift has been redefining the moving experience across India since inception.
            </p>
            <nav className="font-body text-[13px] text-[#aaa] mt-6 flex justify-center gap-2">
              <Link href="/" className="hover:text-[#C4472A] transition-colors">Home</Link>
              <span>→</span>
              <span className="text-[#1A1A2E]">About Us</span>
            </nav>
          </motion.div>
        </Container>
      </section>

      {/* SECTION 2 — WHO WE ARE (split layout) */}
      <section className="bg-white py-[100px]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-[64px] items-center">
            {/* LEFT — Image block */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full h-[480px] rounded-[16px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.10)]">
                <Image src={movers_packers} alt="Assure Sift Team" fill className="object-cover" />
                {/* Floating badge */}
                <div className="absolute bottom-[24px] left-[24px] bg-white rounded-[12px] px-[20px] py-[14px] shadow-lg">
                  <span className="font-body font-semibold text-[13px] text-[#C4472A] flex items-center gap-2">
                    <CheckCircle2 size={16} /> ✓ ISO 9001:2008 Certified
                  </span>
                </div>
              </div>
              {/* Second smaller image */}
              <div className="absolute -bottom-[24px] -right-[24px] w-[180px] h-[140px] rounded-[12px] border-[4px] border-white shadow-xl overflow-hidden hidden md:block">
                <Image src={instruction} alt="Relocation process" fill className="object-cover" />
              </div>
            </motion.div>

            {/* RIGHT — Text */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#C4472A]">WHO WE ARE</span>
              <h2 className="font-display font-bold text-[44px] text-[#1A1A2E] leading-tight mt-4">
                A Legacy of Trust in Every Move
              </h2>
              <div className="mt-6 space-y-4 font-body text-[15px] text-[#555] leading-[1.85]">
                <p>
                  Welcome to Assure Sift, your trusted partner for all your packing and moving needs. With years of experience in the industry, we have established ourselves as a reliable and customer-focused moving company dedicated to providing top-notch services to our clients.
                </p>
                <p>
                  We specialize in providing a wide range of packing and moving solutions tailored to meet the unique needs of our customers. Our customer-centric approach and professional team ensure a smooth and stress-free relocation experience.
                </p>
              </div>

              {/* Value Pills */}
              <div className="flex flex-wrap gap-[10px] mt-[28px]">
                {["✓ Reliability", "✓ Professionalism", "✓ Affordability", "✓ Customer First"].map((pill, i) => (
                  <div key={i} className="bg-[#E8E4DC] rounded-[8px] px-[20px] py-[10px] font-body font-semibold text-[13px] text-[#1A1A2E]">
                    {pill}
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mt-[36px] pt-[36px] border-t border-[#E8E4DC]">
                <div>
                  <h4 className="font-display font-bold text-[40px] text-[#C4472A]"><Counter value="15+" /></h4>
                  <p className="font-body text-[12px] uppercase text-[#888]">Years of Trust</p>
                </div>
                <div>
                  <h4 className="font-display font-bold text-[40px] text-[#C4472A]"><Counter value="5000+" /></h4>
                  <p className="font-body text-[12px] uppercase text-[#888]">Happy Clients</p>
                </div>
                <div>
                  <h4 className="font-display font-bold text-[40px] text-[#C4472A]"><Counter value="664+" /></h4>
                  <p className="font-body text-[12px] uppercase text-[#888]">Service Locations</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 3 — OUR MISSION & VISION (2-col) */}
      <section className="bg-[#F8F6F2] py-[100px]">
        <Container>
          <div className="text-center mb-[60px]">
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#C4472A]">WHAT DRIVES US</span>
            <h2 className="font-display font-bold text-[48px] text-[#1A1A2E] mt-4">Our Mission & Vision</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-[32px]">
            {/* LEFT — Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-[20px] p-[48px] shadow-[0_2px_24px_rgba(0,0,0,0.06)] border-t-[4px] border-[#C4472A]"
            >
              <Target size={40} className="text-[#C4472A] stroke-[1.5]" />
              <span className="block font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#C4472A] mt-[24px]">OUR MISSION</span>
              <h3 className="font-display font-semibold text-[28px] text-[#1A1A2E] mt-[8px]">Redefining the Moving Experience</h3>
              <p className="font-body text-[15px] text-[#555] leading-[1.85] mt-[16px]">
                At Assure Sift, our mission is to redefine the moving experience by delivering exceptional service that exceeds our customers&apos; expectations. We strive to alleviate the stress and hassle often associated with relocation by offering efficient, affordable, and personalized solutions tailored to meet the unique needs of each client. Our commitment to reliability, professionalism, and customer satisfaction drives everything we do.
              </p>
            </motion.div>

            {/* RIGHT — Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[20px] p-[48px] shadow-[0_2px_24px_rgba(0,0,0,0.06)] border-t-[4px] border-[#1A1A2E]"
            >
              <Telescope size={40} className="text-[#1A1A2E] stroke-[1.5]" />
              <span className="block font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A1A2E]">OUR VISION</span>
              <h3 className="font-display font-semibold text-[28px] text-[#1A1A2E] mt-[8px]">Setting the Industry Standard</h3>
              <p className="font-body text-[15px] text-[#555] leading-[1.85] mt-[16px]">
                Our vision at Assure Sift is to become the leading provider of packing and moving services, known for our integrity, quality, and innovation. We aim to set the industry standard for excellence by continuously improving our processes, investing in our team members, and embracing technology to enhance the customer experience. We envision a future where every relocation is a seamless and stress-free experience, thanks to the trusted services of Assure Sift.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 4 — STATS / WHY CHOOSE (full width dark) */}
      <section className="bg-[#1A1A2E] py-[80px] text-white">
        <Container>
          <div className="text-center mb-10">
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#C4472A]">BY THE NUMBERS</span>
            <h2 className="font-display font-bold text-[44px] text-white mt-4">Assure Sift at a Glance</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12">
            {[
              { val: "15+", label: "Years of Trust" },
              { val: "664+", label: "Service Locations" },
              { val: "88", label: "Worldwide Coverage" },
              { val: "70+", label: "Branches Pan India" },
              { val: "60070+", label: "Moves Annually" },
              { val: "Trained", label: "Manpower" },
              { val: "1600+", label: "Containerised Trucks" },
              { val: "900+", label: "GPS Enabled Vehicles" }
            ].map((s, i) => (
              <div key={i} className="text-center px-4 relative group">
                <h4 className="font-display font-bold text-[52px] text-[#C4472A]">
                  {/[0-9]/.test(s.val) ? <Counter value={s.val} /> : s.val}
                </h4>
                <p className="font-body text-[12px] uppercase text-white/55 tracking-[0.08em] mt-2">{s.label}</p>
                {/* Horizontal divider for desktop */}
                {(i + 1) % 4 !== 0 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[40px] bg-white/10"></div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 5 — OUR VALUES (3 cards) */}
      <section className="bg-white py-[100px]">
        <Container>
          <div className="mb-12">
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#C4472A]">WHAT WE STAND FOR</span>
            <h2 className="font-display font-bold text-[48px] text-[#1A1A2E] mt-4">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {[
              { 
                title: "Experience", 
                icon: Award, 
                desc: "With years of experience in the industry, we have the expertise to handle any relocation challenge with ease." 
              },
              { 
                title: "Reliability", 
                icon: Handshake, 
                desc: "We understand the importance of trust when it comes to moving your belongings. You can count on us to handle your possessions with care and professionalism." 
              },
              { 
                title: "Affordability", 
                icon: Gem, 
                desc: "We believe that quality moving services should be accessible to everyone. That's why we offer competitive rates without compromising on quality." 
              }
            ].map((v, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="border-l-[4px] border-[#C4472A] rounded-r-[16px] p-[36px] bg-white shadow-[0_2px_24px_rgba(0,0,0,0.06)]"
              >
                <v.icon size={32} className="text-[#C4472A] stroke-[1.5]" />
                <h3 className="font-display font-semibold text-[24px] text-[#1A1A2E] mt-[12px] mb-[8px]">{v.title}</h3>
                <p className="font-body text-[14px] text-[#666] leading-[1.8]">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 6 — CERTIFICATIONS & TRUST BADGES */}
      <section className="bg-[#F8F6F2] py-[80px]">
        <Container>
          <div className="text-center mb-10">
            <span className="font-body text-[11px] font-bold uppercase tracking-[0.15em] text-[#C4472A]">CERTIFIED & TRUSTED</span>
            <h2 className="font-display font-bold text-[40px] text-[#1A1A2E] mt-2">Our Certifications</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-[16px] mt-[40px]">
            {[
              "ISO 9001:2008 Certified",
              "ISO 39001:2012 Certified",
              "IBA Approved",
              "Innovative Technology",
              "15 Lac sq ft Warehouse Space",
              "Online Consignment Tracking",
              "Free Pre-Move Survey",
              "Dedicated Move Manager"
            ].map((badge, i) => (
              <div key={i} className="bg-white rounded-[50px] px-[28px] py-[14px] flex items-center gap-2 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
                <CheckCircle2 size={16} className="text-[#C4472A]" />
                <span className="font-body font-semibold text-[13px] text-[#1A1A2E]">{badge}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 7 — CTA BANNER */}
      <section className="bg-[#C4472A] py-[80px]">
        <Container className="text-center">
          <h2 className="font-display font-bold text-[48px] text-white">Ready to Make Your Move?</h2>
          <p className="font-body text-[16px] text-white/80 mt-3 max-w-[500px] mx-auto">
            Get a free quote today and experience the Assure Sift difference.
          </p>
          <div className="mt-[36px] flex flex-wrap justify-center gap-[16px]">
            <Link href="/#contact" className="bg-white text-[#C4472A] font-body font-semibold text-[15px] px-[40px] py-[16px] rounded-[50px] hover:bg-white/90 transition-all">
              Get Free Quote →
            </Link>
            <Link href="/contact_us" className="bg-transparent border-[2px] border-white text-white font-body font-semibold text-[15px] px-[40px] py-[16px] rounded-[50px] hover:bg-white hover:text-[#C4472A] transition-all">
              Contact Us →
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
