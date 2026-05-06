'use client';

import React, { useState } from 'react';
import { FaTruck, FaCar, FaHome, FaGlobe, FaBuilding, FaIndustry, FaMotorcycle, FaPalette, FaBox, FaShippingFast, FaTractor, FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import api from '@/services/api';
import InfoBar from "@/components/Infobar";
import InfoBarMob from "@/components/InfobarMob";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const options = [
    { id: 'household', label: 'Household Moving', icon: <FaTruck /> },
    { id: 'car', label: 'Car Moving', icon: <FaCar /> },
    { id: 'secure', label: 'Secure Storage', icon: <FaHome /> },
    { id: 'international', label: 'International Moving', icon: <FaGlobe /> },
    { id: 'office', label: 'Office Shifting', icon: <FaBuilding /> },
    { id: 'commercial', label: 'Commercial Moving', icon: <FaIndustry /> },
    { id: 'bike', label: 'Bike Moving', icon: <FaMotorcycle /> },
    { id: 'fine_arts', label: 'Fine Arts & Sculptures', icon: <FaPalette /> },
    { id: 'truck', label: 'Truck Rental', icon: <FaTruck /> },
    { id: 'last_mile', label: 'Last Mile Delivery', icon: <FaShippingFast /> },
    { id: 'courier', label: 'Courier', icon: <FaBox /> },
    { id: 'odc_consignment', label: 'ODC Consignment', icon: <FaTractor /> },
];

const UserForm = () => {
    const [selectedOption, setSelectedOption] = useState('car');
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', pickup_date: '', pickup_time: '', pickup_address: '', drop_address: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const purpose = options.find(o => o.id === selectedOption)?.label || '';
        try {
            await api.post('/users', { ...formData, purpose });
            alert('Enquiry submitted successfully!');
            setFormData({ name: '', email: '', phone: '', pickup_date: '', pickup_time: '', pickup_address: '', drop_address: '' });
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to submit enquiry.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <InfoBar />
            <InfoBarMob />
            <Navbar />
            
            <div className="container mx-auto px-4 py-12 lg:py-20 max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-6xl font-outfit font-black text-gray-900 mb-4">Request a <span className="text-brand">Quote</span></h1>
                    <p className="text-gray-500 font-medium max-w-2xl mx-auto">Select your service type and fill out the form below to get a customized relocation estimate.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => setSelectedOption(option.id)}
                            className={`flex flex-col items-center justify-center p-6 w-32 rounded-3xl border-2 transition-all-custom shadow-sm ${
                                selectedOption === option.id 
                                ? 'bg-brand border-brand text-white shadow-xl scale-110' 
                                : 'bg-white border-gray-100 text-gray-500 hover:border-brand/30 hover:shadow-md'
                            }`}
                        >
                            <div className="text-2xl mb-3">{option.icon}</div>
                            <div className="text-[10px] font-black uppercase tracking-tighter leading-tight">{option.label}</div>
                        </button>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-8 lg:p-12 border border-gray-100">
                    <h2 className="text-2xl font-outfit font-black text-gray-900 mb-8 text-center uppercase tracking-widest">
                        {options.find(o => o.id === selectedOption)?.label} <span className="text-brand">Quote Request</span>
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 ml-1"><FaUser className="text-brand/50" /> Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand outline-none transition-all" />
                            </div>
                            <div className="space-y-1">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 ml-1"><FaPhone className="text-brand/50" /> Phone</label>
                                <input type="text" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand outline-none transition-all" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 ml-1"><FaEnvelope className="text-brand/50" /> Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand outline-none transition-all" />
                            </div>
                            <div className="space-y-1">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 ml-1"><FaMapMarkerAlt className="text-brand/50" /> Pickup Address</label>
                                <input type="text" name="pickup_address" value={formData.pickup_address} onChange={handleChange} required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand outline-none transition-all" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 ml-1"><FaMapMarkerAlt className="text-brand/50" /> Drop Address</label>
                                <input type="text" name="drop_address" value={formData.drop_address} onChange={handleChange} required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand outline-none transition-all" />
                            </div>
                            <div className="space-y-1">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 ml-1"><FaCalendarAlt className="text-brand/50" /> Pickup Date</label>
                                <input type="date" name="pickup_date" value={formData.pickup_date} onChange={handleChange} required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand outline-none transition-all" />
                            </div>
                        </div>

                        <div className="space-y-1 max-w-[50%]">
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 ml-1"><FaClock className="text-brand/50" /> Pickup Time</label>
                            <input type="time" name="pickup_time" value={formData.pickup_time} onChange={handleChange} required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand outline-none transition-all" />
                        </div>

                        <div className="flex gap-4 pt-6">
                            <button type="submit" disabled={isLoading} className={`flex-1 py-5 rounded-2xl font-black uppercase tracking-widest text-white shadow-xl transition-all ${isLoading ? 'bg-gray-400' : 'bg-brand hover:bg-brand-dark hover:scale-[1.02]'}`}>
                                {isLoading ? 'Submitting...' : 'Submit Quote Request'}
                            </button>
                            <button type="button" onClick={() => setFormData({ name: '', email: '', phone: '', pickup_date: '', pickup_time: '', pickup_address: '', drop_address: '' })} className="px-8 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default UserForm;
