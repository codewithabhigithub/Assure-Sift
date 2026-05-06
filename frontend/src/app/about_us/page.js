'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaBox, FaShieldAlt, FaMapMarkerAlt, FaGlobe, FaBuilding, FaTruckMoving, 
  FaUsers, FaTruck, FaMapMarkedAlt, FaLightbulb, FaWarehouse, 
  FaSearchLocation, FaClipboardCheck, FaUser, FaCertificate, FaCheckCircle 
} from 'react-icons/fa';

import InfoBar from "@/components/Infobar";
import InfoBarMob from "@/components/InfobarMob";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// Assets
import Convenience from '@/assets/Convenience.jpeg';
import Packing from '@/assets/Deliver.jpeg';
import Damage from '@/assets/Damage.jpeg';
import IBA from '@/assets/iba.svg';
import ISO from '@/assets/iso.svg';
import movers_packers from '@/assets/movers_packers.jpg';

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

const mainServices = [
  { title: "Household Moving", desc: "We handle everything from small household items to large furniture, ensuring safe and secure transportation." },
  { title: "Car Moving", desc: "We offer specialized car transportation services to ensure your vehicle arrives safely at its new destination." },
  { title: "Secure Storage", desc: "Our secure storage facilities provide a safe place to store your belongings during your move." },
  { title: "International Moving", desc: "Our global network ensures that your belongings are transported safely and efficiently, no matter where you are moving in the world." },
  { title: "Office Shifting", desc: "We provide tailored solutions for corporate relocations, minimizing downtime and ensuring business continuity." },
  { title: "Commercial Moving", desc: "We manage the logistics of commercial relocations, handling everything from small offices to large enterprises." },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <InfoBar />
      <InfoBarMob />
      <Navbar />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="bg-gray-900 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src={movers_packers} alt="Background" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-outfit font-black mb-6">
              Relocating the <span className="text-brand">Future</span>
            </h1>
            <p className="text-xl text-gray-300 font-medium leading-relaxed">
              Sure Shift is a leading relocation services provider specializing in comprehensive, stress-free moving experiences across India and the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl font-outfit font-black text-gray-900">
                About <span className="text-brand">Sure Shift</span>
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed font-medium">
                Established with a vision to redefine logistics, Sure Shift has become a trusted name in Gurgaon and beyond. We understand that every move is unique, which is why we offer personalized solutions that prioritize the safety and security of your assets.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-brand">
                  <h4 className="text-3xl font-black text-brand mb-1">157k+</h4>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Happy Customers</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-brand">
                  <h4 className="text-3xl font-black text-brand mb-1">664+</h4>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global Cities</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-brand/10 rounded-3xl -rotate-3"></div>
              <Image 
                src={movers_packers} 
                alt="Sure Shift Team" 
                className="relative rounded-2xl shadow-2xl z-10 hover:rotate-0 transition-transform duration-500" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-outfit font-black text-gray-900">Our Core Services</h2>
            <p className="text-gray-500 font-medium mt-2 uppercase tracking-widest text-sm">Professional solutions for every need</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all-custom group">
                <div className="w-12 h-12 bg-brand/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand transition-colors">
                  <FaBox className="text-brand group-hover:text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4">{s.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section (Trust Badges) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-outfit font-black text-gray-900">Why Choose Us?</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-brand/30 hover:shadow-xl transition-all-custom flex flex-col items-center justify-center text-center space-y-4"
              >
                {service.text === "IBA Approved" || service.text === "ISO Certified" ? (
                  <Image
                    src={service.text === "IBA Approved" ? IBA : ISO}
                    alt={service.text}
                    className="h-12 w-auto grayscale hover:grayscale-0 transition-all mb-2"
                  />
                ) : (
                  <div className="text-brand text-3xl mb-2">{service.icon}</div>
                )}
                <span className={`text-[10px] font-black uppercase tracking-widest ${
                  service.text.includes('Approved') || service.text.includes('Certified') ? 'text-brand' : 'text-gray-500'
                }`}>
                  {service.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Heritage */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl lg:text-5xl font-outfit font-black leading-tight uppercase">
                <span className="text-brand">SURE SHIFT</span> <br />
                RELOCATION SERVICES LTD.
              </h2>
              <div className="flex items-center gap-4 py-4 border-y border-white/10">
                <div className="bg-brand/20 p-4 rounded-full text-brand text-2xl"><FaCertificate /></div>
                <div>
                  <p className="text-brand font-bold tracking-widest text-xs uppercase">Quality Assurance</p>
                  <p className="text-gray-400 font-medium">An ISO 9001:2015 & ISO 39001:2012 Certified Company</p>
                </div>
              </div>
              <p className="text-lg text-gray-400 leading-relaxed font-medium">
                Sure Shift Relocation Services Ltd is a globally recognized logistics company operating since 1987. We have designed our services proficiently to meet maximum customer satisfaction.
              </p>
              <Link href="/#contact" className="inline-block bg-brand hover:bg-white hover:text-brand text-white px-10 py-4 rounded-xl font-bold transition-all shadow-xl">
                Start Your Journey
              </Link>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              {[Convenience, Damage, movers_packers, Packing].map((img, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden aspect-square group shadow-2xl">
                  <Image src={img} alt="Feature" fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-[10px] font-black uppercase tracking-widest text-white/70">
                    {['Convenience', 'Safety', 'Security', 'Packing'][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
