'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Typed from 'typed.js';
import { 
  FaShieldAlt, FaMapMarkerAlt, FaGlobe, FaBuilding, FaTruckMoving, 
  FaUsers, FaTruck, FaMapMarkedAlt, FaLightbulb, FaWarehouse, 
  FaSearchLocation, FaClipboardCheck, FaUser, FaCertificate, FaCheckCircle,
  FaStar
} from 'react-icons/fa';

import InfoBar from "@/components/Infobar";
import InfoBarMob from "@/components/InfobarMob";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserForm2 from "@/components/UserForm2";
import WhatsAppButton from "@/components/WhatsAppButton";

// Assets
import banner from '@/assets/banner_img_1.svg';
import Delivery_Man from '@/assets/Delivery_Man.svg';
import Faster from '@/assets/Faster.svg';
import Best_Courier from '@/assets/Best_Courier.svg';
import Best_Price from '@/assets/Best_Price.svg';
import Top_Rated from '@/assets/Top_Rated.svg';
import Courier_Man from '@/assets/courier_man.webp';
import abhishek from '@/assets/abhishek.png';
import kapil from '@/assets/kapil.png';
import amit from '@/assets/amit.png';
import ATHER from '@/assets/ather energy.png';
import SBI from '@/assets/SBI BANK.png';
import PSB from '@/assets/panjab_sindh_bank.png';
import IBA from '@/assets/iba.svg';
import ISO from '@/assets/iso.svg';
import Convenience from '@/assets/Convenience.jpeg';
import Packing from '@/assets/Deliver.jpeg';
import Damage from '@/assets/Damage.jpeg';
import movers_packers from '@/assets/movers_packers.jpg';

const testimonials = [
  {
    text: "The team exceeded expectations with professionalism and attention to detail, completing our project on time and with exceptional quality.",
    name: "Abhishek Gupta",
    role: "IT Company",
    image: abhishek,
    rating: 5
  },
  {
    text: "Working with this team was a fantastic experience. They were responsive, creative, and truly understood our vision.",
    name: "Amit Kumar",
    role: "FOOD SHOP",
    image: amit,
    rating: 5
  },
  {
    text: "I highly recommend their services. They delivered exactly what we needed and provided excellent support throughout the process.",
    name: "Kapil Kumar",
    role: "Manufacturing Company",
    image: kapil,
    rating: 5
  },
];

const services = [
  { icon: <FaShieldAlt />, text: "15+ Years of Trust" },
  { icon: <FaMapMarkerAlt />, text: "664+ Service Locations" },
  { icon: <FaGlobe />, text: "88 Worldwide Coverage" },
  { icon: <FaBuilding />, text: "75+ Branches PAN India" },
  { icon: <FaTruckMoving />, text: "65070+ Moves Annually" },
  { icon: <FaUsers />, text: "Trained Manpower" },
  { icon: <FaTruck />, text: "1500+ Containerized Trucks" },
  { icon: <FaMapMarkedAlt />, text: "600+ GPS Enabled Vehicles" },
  { icon: <FaLightbulb />, text: "Innovative Technology" },
  { icon: <FaWarehouse />, text: "10 Lac sq. ft warehouse space" },
  { icon: <FaSearchLocation />, text: "Online Consignment Tracking" },
  { icon: <FaClipboardCheck />, text: "Free Pre-Move Survey" },
  { icon: <FaUser />, text: "Dedicated Move Manager" },
  { icon: <FaCertificate />, text: "IBA Approved" },
  { icon: <FaCheckCircle />, text: "ISO Certified" },
];

const features = [
  { image: Convenience, label: 'Convenience' },
  { image: Damage, label: 'Zero Damage' },
  { image: movers_packers, label: 'Safety and Security' },
  { image: Packing, label: 'Customized Packing' },
];

export default function Home() {
  const [ssonNumber, setSSONNumber] = useState('');
  const router = useRouter();
  const typedElement = useRef(null);

  const handleInputChange = (e) => setSSONNumber(e.target.value);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!ssonNumber) {
      alert('Please enter a valid AWB number');
      return;
    }
    const awbPattern = /^SSENQ[0-9A-Za-z]{10}$/;
    if (!awbPattern.test(ssonNumber)) {
      alert('Invalid AWB number format. The AWB number should start with "SSENQ" and be 15 characters long.');
      return;
    }
    router.push(`/order_track?awb=${ssonNumber}`);
  };

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: ['Moving', 'Relocating', 'Shifting', 'Settling'],
      typeSpeed: 150,
      backSpeed: 50,
      loop: true
    });
    return () => typed.destroy();
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <InfoBar />
      <InfoBarMob />
      <Navbar />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto">
            <div className="lg:w-1/2 text-center lg:text-left space-y-8">
              <h1 className="text-4xl lg:text-6xl font-outfit font-black leading-tight text-gray-900">
                Your Trusted Partner for <br />
                <span className="text-brand inline-block min-w-[200px]" ref={typedElement}></span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-500 font-medium max-w-xl">
                Relocating? Let us take the load off your shoulders. Whether it's across the street or across the country, our expert team ensures a smooth, stress-free move every time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/#contact" 
                  className="px-10 py-4 bg-brand text-white font-bold rounded-xl shadow-lg hover:bg-brand-dark transition-all-custom text-center"
                >
                  Book Your Move Now
                </Link>
                <Link 
                  href="/about_us" 
                  className="px-10 py-4 bg-white text-gray-700 border-2 border-gray-100 font-bold rounded-xl hover:border-brand/30 transition-all-custom text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative group">
              <div className="absolute -inset-4 bg-brand/5 rounded-full blur-3xl group-hover:bg-brand/10 transition-all duration-500"></div>
              <Image 
                src={banner} 
                alt="Delivery Service" 
                className="relative w-full h-auto drop-shadow-2xl animate-float"
                priority 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Faster, title: "FASTER", desc: "Quick, reliable, and timely moves." },
              { icon: Best_Courier, title: "BEST COURIER", desc: "Top-rated, secure, trusted delivery." },
              { icon: Best_Price, title: "BEST PRICE", desc: "Affordable, high-quality moving services." },
              { icon: Top_Rated, title: "TOP RATED", desc: "Ranked #1 in customer satisfaction." }
            ].map((f, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all-custom border border-gray-50 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-brand/5 rounded-xl group-hover:bg-brand transition-colors duration-300">
                    <Image src={f.icon} alt={f.title} className="w-8 h-8 group-hover:invert transition-all" />
                  </div>
                  <h3 className="font-outfit font-black text-gray-900">{f.title}</h3>
                </div>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto">
          <UserForm2 />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl lg:text-5xl font-outfit font-black mb-16">
            Why Choose <span className="text-brand">Sure Shift?</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-2xl shadow-md border border-gray-50 hover:border-brand/20 hover:shadow-xl transition-all-custom group flex flex-col items-center justify-center text-center space-y-4"
              >
                {service.text === "IBA Approved" || service.text === "ISO Certified" ? (
                  <div className="h-16 flex items-center justify-center">
                    <Image
                      src={service.text === "IBA Approved" ? IBA : ISO}
                      alt={service.text}
                      className="w-12 h-12 grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                ) : (
                  <div className="text-brand text-3xl group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                )}
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  service.text === "IBA Approved" || service.text === "ISO Certified" ? "text-brand" : "text-gray-600"
                }`}>
                  {service.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand/5 blur-3xl rounded-full"></div>
        <div className="container mx-auto px-4 max-w-7xl relative">
          <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
            <h2 className="text-3xl lg:text-5xl font-outfit font-black uppercase">
              <span className='text-brand'>SURE SHIFT</span> RELOCATION SERVICES
            </h2>
            <p className="text-brand font-bold tracking-widest text-sm">
              An ISO 9001:2015 & ISO 39001:2012 Certified Company
            </p>
            <h3 className="text-xl font-bold text-white/90">
              India’s Largest and Most Awarded Movers
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Sure Shift Relocation Services is a globally recognized logistics company operating since 1987. We have designed our services proficiently to meet maximum customer satisfaction.
            </p>
            <Link href='/about_us' className="inline-block text-brand hover:text-white font-bold transition-colors">
              Read More About Our Journey &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group relative rounded-2xl overflow-hidden shadow-2xl aspect-video lg:aspect-square">
                <Image 
                  src={feature.image} 
                  alt={feature.label} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <span className="text-sm lg:text-lg font-bold tracking-widest uppercase">{feature.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section id="tracking" className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-brand rounded-[2rem] p-8 lg:p-16 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2 text-center lg:text-left space-y-4">
                <h2 className="text-3xl lg:text-5xl font-outfit font-black text-white">Track Your Consignment</h2>
                <p className="text-white/80 text-lg font-medium">Track your shipment instantly. Enter your Consignment number for updates.</p>
              </div>
              <div className="lg:w-1/2 w-full max-w-xl">
                <form onSubmit={handleTrack} className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    className="flex-1 bg-transparent px-6 py-4 text-white placeholder-white/60 outline-none font-bold"
                    placeholder="Enter Consignment Number"
                    value={ssonNumber}
                    onChange={handleInputChange}
                  />
                  <button
                    type="submit"
                    className="bg-white text-brand px-10 py-4 rounded-xl font-black uppercase tracking-wider hover:bg-brand-dark hover:text-white transition-all shadow-lg"
                  >
                    Track Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Banner */}
      <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="relative inline-block">
                <Image src={Delivery_Man} alt="Delivery Service" className="w-full h-auto drop-shadow-xl hidden lg:block" />
                <Image src={Courier_Man} alt="Mobile Delivery Service" className="w-64 h-auto block lg:hidden mx-auto" />
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2 space-y-8 bg-[#0C1E2D] p-10 lg:p-16 rounded-[2rem] text-white shadow-2xl">
              <h2 className="text-4xl lg:text-5xl font-outfit font-black leading-tight">Reliable and Efficient Moving Services</h2>
              <p className="text-lg text-gray-400 font-medium">Our team of experienced professionals is dedicated to providing seamless moving solutions tailored to your specific needs. Whether you're relocating your home or office, we handle every aspect with care.</p>
              <Link href="/#contact" className="inline-block bg-brand hover:bg-white hover:text-brand text-white py-4 px-12 rounded-xl font-bold transition-all shadow-xl">
                Start Your Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl lg:text-5xl font-outfit font-black mb-4">WHAT THEY SAY ABOUT US</h2>
          <p className="text-lg text-gray-500 font-medium mb-16">Read what our satisfied clients have to say about our services.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-8 font-medium leading-relaxed flex-grow">"{t.text}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                  <Image src={t.image} alt={t.name} width={56} height={56} className="rounded-full shadow-lg" />
                  <div className="text-left">
                    <h4 className="font-outfit font-black text-gray-900">{t.name}</h4>
                    <p className="text-brand text-xs font-bold uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-center lg:text-left space-y-4">
              <h2 className="text-3xl lg:text-4xl font-outfit font-black text-gray-900 uppercase">OUR CLIENTS</h2>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                We are honored to work alongside esteemed partners who share our commitment to excellence and innovation.
              </p>
            </div>
            <div className="lg:w-1/2 flex flex-wrap justify-center items-center gap-12 opacity-60 hover:opacity-100 transition-opacity duration-500">
              <Image src={ATHER} alt="Ather Energy" className="h-12 w-auto grayscale hover:grayscale-0 transition-all" />
              <Image src={SBI} alt="SBI" className="h-12 w-auto grayscale hover:grayscale-0 transition-all" />
              <Image src={PSB} alt="PSB" className="h-12 w-auto grayscale hover:grayscale-0 transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-brand rounded-[2.5rem] p-12 lg:p-20 text-center text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50"></div>
            <div className="relative max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl lg:text-6xl font-outfit font-black tracking-tight">LET'S JOIN US</h2>
              <p className="text-lg lg:text-xl font-medium text-white/90 leading-relaxed">
                Ready to take the next step in your career? Join us for growth, opportunities, and a supportive work environment. Be a part of our journey to excellence.
              </p>
              <Link 
                href="/#contact" 
                className="inline-block bg-white text-brand px-12 py-5 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
              >
                Join Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
