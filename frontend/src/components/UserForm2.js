'use client';

import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Autocomplete, LoadScript } from '@react-google-maps/api';
import api from '@/services/api';
import { FaArrowRight, FaUndo } from 'react-icons/fa';

class MapErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.warn("Google Maps Autocomplete failed to load:", error);
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}


const options = [
    { id: 'household', label: 'Household Moving', icon: '🚚' },
    { id: 'office', label: 'Office Moving', icon: '🏢' },
    { id: 'international', label: 'International Moving', icon: '🌍' },
    { id: 'car', label: 'Car Moving', icon: '🚗' },
    { id: 'bike', label: 'Bike Moving', icon: '🏍️' },
    { id: 'secure', label: 'Secure Storage', icon: '🏠' },
    { id: 'fine_arts', label: 'Fine Arts & Sculptures Moving', icon: '🎨' },
    { id: 'commercial', label: 'Commercial Moving', icon: '🏭' },
    { id: 'courier', label: 'Courier', icon: '📦' },
    { id: 'truck', label: 'Truck Rental', icon: '🚛' },
    { id: 'last_mile', label: 'Last Mile Delivery', icon: '🚚' },
    { id: 'odc_consignment', label: 'ODC Consignment', icon: '🚜' },
];

const apartmentSizes = [
    { value: 'few_items', label: 'Few Items' },
    { value: 'studio_apartment', label: 'Studio Apartment' },
    { value: '1_bhk', label: '1 BHK' },
    { value: '2_bhk', label: '2 BHK' },
    { value: '3_bhk', label: '3 BHK' },
    { value: '4_bhk', label: '4 BHK' },
    { value: '4_plus_bhk', label: '4+ BHK' }
];

const storageTypes = [
    { value: 'household', label: 'Household Storage' },
    { value: 'car', label: 'Car Storage' },
    { value: 'two_wheeler', label: 'Two Wheeler Storage' },
    { value: 'office_goods', label: 'Office Goods Storage' },
    { value: 'documents', label: 'Documents Storage' },
    { value: 'commercial', label: 'Commercial Storage' },
    { value: 'warehousing_space', label: 'Warehousing Space Storage' },
];

const vehicleTypes = [
    { value: '2_wheeler', label: '2 wheeler' },
    { value: '3_wheeler', label: '3 wheeler' },
    { value: 'tata_ACE', label: 'Tata ACE' },
];

const truckType = [
    { value: '3_wheeler', label: '3 wheeler' },
    { value: 'tata_ACE', label: 'Tata ACE' },
    { value: 'mahindra_bolero_pickup', label: 'Mahindra Bolero Pickup' },
    { value: 'ashok_leyland_dost', label: 'Ashok Leyland Dost' },
    { value: '14_FT_canter', label: '14 FT Canter' },
    { value: '17_FT_canter', label: '17 FT Canter' },
    { value: '19_FT_canter', label: '19 FT Canter' },
    { value: '22_FT_canter', label: '22 FT Canter' },
    { value: '32_FT_SXL', label: '32 FT SXL' },
    { value: '32_FT_MXL', label: '32 FT MXL' },
];

const last_mile_material_type = [
    { value: 'e-commerce_packets', label: 'E-Commerce Packets' },
    { value: 'grocery', label: 'Grocery' },
    { value: 'food_items', label: 'Food Items' },
    { value: 'documents', label: 'Documents' },
    { value: 'others', label: 'Others' },
];

const contentOptions = [
    { value: 'artificial_jewellery', label: 'Artificial Jewellery' },
    { value: 'auto_machine_parts', label: 'Auto Machine Parts' },
    { value: 'boots', label: 'Boots' },
    { value: 'cable_wires', label: 'Cable/Wires' },
    { value: 'camera', label: 'Camera' },
    { value: 'cd_pendrive', label: 'CD/Pendrive' },
    { value: 'charger_set', label: 'Charger Set' },
    { value: 'cheque_book', label: 'Cheque Book' },
    { value: 'chocolates', label: 'Chocolates' },
    { value: 'clothes', label: 'Clothes' },
    { value: 'computer_peripherals', label: 'Computer Peripherals' },
    { value: 'corporate_gifts', label: 'Corporate Gifts' },
    { value: 'credit_debit_cards', label: 'Credit/Debit Cards' },
    { value: 'documents', label: 'Documents' },
    { value: 'dry_fruits', label: 'Dry Fruits' },
    { value: 'electronic_items', label: 'Electronic Items' },
    { value: 'food_items_packaged', label: 'Food Items (Packaged)' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'gadget_cover', label: 'Gadget Cover' },
    { value: 'headphone', label: 'Headphone' },
    { value: 'home_appliances', label: 'Home Appliances' },
    { value: 'household_goods', label: 'Household Goods' },
    { value: 'laptop', label: 'Laptop' },
    { value: 'laptop_bag', label: 'Laptop Bag' },
    { value: 'hand_bag', label: 'Hand Bag' },
    { value: 'led_lights', label: 'LED Lights' },
    { value: 'luggage', label: 'Luggage' },
    { value: 'medical_equipment', label: 'Medical Equipment' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'painting', label: 'Painting' },
    { value: 'passport', label: 'Passport' },
    { value: 'plastic_items', label: 'Plastic Items' },
    { value: 'promotional_material', label: 'Promotional Material (Paper)' },
    { value: 'seeds', label: 'Seeds' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'sim_cards', label: 'SIM Cards' },
    { value: 'spices', label: 'Spices' },
    { value: 'stationery', label: 'Stationery' },
    { value: 'stitched_garment', label: 'Stitched Garment' },
    { value: 'sweets', label: 'Sweets' },
    { value: 'toys', label: 'Toys' },
    { value: 'constitched_clothes_of_fabric', label: 'Constitched Clothes Of Fabric' },
    { value: 'other', label: 'Other' },
];

const LIBRARIES = ['places'];

const UserForm2 = ({ selectedService, compact = false }) => {
    const [selectedOption, setSelectedOption] = useState(selectedService || 'car');
    const [prevSelectedService, setPrevSelectedService] = useState(selectedService);

    if (selectedService !== prevSelectedService) {
        setPrevSelectedService(selectedService);
        setSelectedOption(selectedService || 'car');
    }

    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const filteredOptions = contentOptions.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        pickup_date: '',
        pickup_time: '',
        pickup_address: '',
        drop_address: '',
        purpose: '',
        apartmentSize: '',
        companyName: '',
        carModel: '',
        storageType: '',
        materialType: '',
        vehicleType: '',
        truckType: '',
        parcel_weight: '',
        bikeModel: '',
        last_mile_material_type: '',
        measurement: '',
        shipment_value: '',
        content: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);
    const recaptchaRef = useRef(null);
    const autocompletePickupRef = useRef(null);
    const autocompleteDropRef = useRef(null);

    const handleOptionClick = (id) => {
        setSelectedOption(id);
    };

    const handleChange = (e) => {
        let value = e.target.value;
        if (e.target.name === 'measurement') {
            value = value.replace(/[^0-9X]/g, '');
            value = value.replace(/(\d{2})(?=\d)/g, '$1X');
        }
        setFormData({ ...formData, [e.target.name]: value });
        if (e.target.name === 'content') {
            setSearchTerm(value);
            setIsDropdownOpen(value !== "");
        }
    };

    const handleSelectOption = (option) => {
        setFormData({ ...formData, content: option.label });
        setSearchTerm("");
        setIsDropdownOpen(false);
    };

    const handleInputFocus = () => setIsDropdownOpen(true);
    const handleInputBlur = () => setTimeout(() => setIsDropdownOpen(false), 200);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!captchaToken) {
            alert("Please complete the CAPTCHA");
            setIsLoading(false);
            return;
        }

        const updatedFormData = {
            ...formData,
            purpose: options.find(option => option.id === selectedOption)?.label || '',
            'g-recaptcha-response': captchaToken
        };

        try {
            await api.post('/users/createEnquiry', updatedFormData);
            alert('User data submitted successfully');
            handleReset();
        } catch (error) {
            console.error('Error submitting user data:', error);
            alert('Failed to submit user data');
        } finally {
            setIsLoading(false);
            setCaptchaToken(null);
        }
    };

    const handleReset = () => {
        setFormData({
            name: '', email: '', phone: '', pickup_date: '', pickup_time: '',
            pickup_address: '', drop_address: '', purpose: '', apartmentSize: '',
            companyName: '', carModel: '', storageType: '', materialType: '',
            vehicleType: '', bikeModel: '', parcel_weight: '', truckType: '',
            last_mile_material_type: '', measurement: '', shipment_value: '', content: '',
        });
        setCaptchaToken(null);
        if (recaptchaRef.current) recaptchaRef.current.reset();
    };

    const onCaptchaChange = (token) => setCaptchaToken(token);

    const handleAddressChange = (addressType, place) => {
        if (place && place.formatted_address) {
            setFormData(prev => ({ ...prev, [addressType]: place.formatted_address }));
        }
    };

    // Input styling
    const inputClass = "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all placeholder:text-gray-400";
    const labelClass = "block text-xs font-semibold text-gray-600 mb-1.5";

    const renderFormFields = () => {
        const commonDateAndTime = (
            <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                    <label className={labelClass}>Move Type</label>
                    <select
                        name="purpose"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className={inputClass}
                    >
                        {options.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
                    </select>
                </div>
                <div>
                    <label className={labelClass}>Move Date</label>
                    <input
                        type="date"
                        name="pickup_date"
                        value={formData.pickup_date}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    />
                </div>
            </div>
        );

        const commonAddresses = (
            <div className="space-y-3 mb-3">
                <div>
                    <label className={labelClass}>Moving From</label>
                    <input
                        type="text"
                        name="pickup_address"
                        value={formData.pickup_address}
                        onChange={handleChange}
                        placeholder="Enter Pickup Location"
                        className={inputClass}
                        required
                    />
                </div>
                <div>
                    <label className={labelClass}>Moving To</label>
                    <input
                        type="text"
                        name="drop_address"
                        value={formData.drop_address}
                        onChange={handleChange}
                        placeholder="Enter Drop Location"
                        className={inputClass}
                        required
                    />
                </div>
            </div>
        );

        switch (selectedOption) {
            case 'household':
                return (
                    <>
                        <div className="mb-3">
                            <label className={labelClass}>Apartment Size</label>
                            <select
                                name="apartmentSize"
                                value={formData.apartmentSize}
                                onChange={handleChange}
                                className={inputClass}
                                required
                            >
                                <option value="">Select Apartment Size</option>
                                {apartmentSizes.map(size => <option key={size.value} value={size.value}>{size.label}</option>)}
                            </select>
                        </div>
                        {commonAddresses}
                        {commonDateAndTime}
                    </>
                );
            case 'office':
            case 'commercial':
            case 'truck':
            case 'last_mile':
            case 'odc_consignment':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <div>
                                <label className={labelClass}>Company Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="Company Name"
                                    className={inputClass}
                                    required
                                />
                            </div>
                            {selectedOption === 'commercial' || selectedOption === 'odc_consignment' ? (
                                <div>
                                    <label className={labelClass}>Material Type</label>
                                    <input
                                        type="text"
                                        name="materialType"
                                        value={formData.materialType}
                                        onChange={handleChange}
                                        placeholder="Material Type"
                                        className={inputClass}
                                        required
                                    />
                                </div>
                            ) : null}
                            {selectedOption === 'truck' ? (
                                <div>
                                    <label className={labelClass}>Truck Type</label>
                                    <select
                                        name="truckType"
                                        value={formData.truckType}
                                        onChange={handleChange}
                                        className={inputClass}
                                        required
                                    >
                                        <option value="">Select Truck Type</option>
                                        {truckType.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                                    </select>
                                </div>
                            ) : null}
                        </div>
                        {commonAddresses}
                        {commonDateAndTime}
                    </>
                );
            case 'car':
            case 'bike':
                return (
                    <>
                        <div className="mb-3">
                            <label className={labelClass}>{selectedOption === 'car' ? 'Car Model' : 'Bike Model'}</label>
                            <input
                                type="text"
                                name={selectedOption === 'car' ? 'carModel' : 'bikeModel'}
                                value={selectedOption === 'car' ? formData.carModel : formData.bikeModel}
                                onChange={handleChange}
                                placeholder={`Enter ${selectedOption} Model`}
                                className={inputClass}
                                required
                            />
                        </div>
                        {commonAddresses}
                        {commonDateAndTime}
                    </>
                );
            case 'courier':
                return (
                    <>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <div>
                                <label className={labelClass}>Parcel Weight (g)</label>
                                <input
                                    type="number"
                                    name="parcel_weight"
                                    value={formData.parcel_weight}
                                    onChange={handleChange}
                                    placeholder="Weight in grams"
                                    className={inputClass}
                                    required
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Measurements (LxWxH)</label>
                                <input
                                    type="text"
                                    name="measurement"
                                    value={formData.measurement}
                                    onChange={handleChange}
                                    placeholder="e.g., 10x20x30"
                                    className={inputClass}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3 relative">
                            <label className={labelClass}>Select Content</label>
                            <input
                                type="text"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                placeholder="Search or select content"
                                className={inputClass}
                            />
                            {isDropdownOpen && (
                                <ul className="absolute z-10 mt-1 w-full bg-white border rounded-xl shadow-xl max-h-48 overflow-y-auto">
                                    {filteredOptions.map(option => (
                                        <li key={option.value} onClick={() => handleSelectOption(option)} className="p-2.5 hover:bg-cream text-sm cursor-pointer border-b border-gray-50 last:border-0">
                                            {option.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {commonAddresses}
                        {commonDateAndTime}
                    </>
                );
            default:
                return (
                    <>
                        {commonAddresses}
                        {commonDateAndTime}
                    </>
                );
        }
    };

    // Compact mode for homepage sidebar
    if (compact) {
        return (
                <div className="bg-white rounded-2xl border border-gray-100 card-shadow overflow-hidden h-fit flex flex-col">
                    <div className="px-6 pt-6 pb-4 flex-shrink-0">
                        <h3 className="text-xl font-bold text-navy mb-0.5" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                            Get a <span className="italic text-brand">Free</span>
                        </h3>
                        <h3 className="text-xl font-bold text-navy" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                            Moving Quote
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit} className="px-6 pb-6 flex-grow flex flex-col">
                        <div className="flex-grow space-y-3">
                            {/* Name & Phone */}
                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className={inputClass} required />
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className={inputClass} required />
                            </div>
                            {/* Email */}
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className={inputClass} required />
                            
                            {/* Dynamic fields */}
                            {renderFormFields()}
                        </div>

                        {/* CAPTCHA & Buttons at the bottom */}
                        <div className="mt-auto pt-4 space-y-4">
                            {/* CAPTCHA */}
                            <div className="flex justify-center w-full overflow-hidden">
                                <div className="scale-90 sm:scale-100 origin-center">
                                    <ReCAPTCHA
                                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LcFv90sAAAAABqmEiEtTxgL4rMR_Lo7tx6FkHuN"}
                                        onChange={onCaptchaChange}
                                        ref={recaptchaRef}
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className={`flex-1 py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all duration-300 ease-in-out ${
                                        isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand hover:bg-brand-dark shadow-sm'
                                    }`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Processing...' : 'Submit'}
                                    {!isLoading && <FaArrowRight className="text-xs" />}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="px-5 py-3.5 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all text-sm flex items-center justify-center gap-1.5 border border-gray-200"
                                    disabled={isLoading}
                                >
                                    <FaUndo className="text-[10px]" /> Reset
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
        );
    }

    // Full mode (standalone page)
    return (
            <div className="w-full flex flex-col items-center py-12">
                <div className="w-full max-w-5xl px-4 flex flex-wrap justify-center gap-3 mb-10">
                    {options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleOptionClick(option.id)}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ease-in-out w-28 h-28 ${
                                selectedOption === option.id 
                                ? 'bg-brand/10 border-brand scale-105 card-shadow' 
                                : 'bg-white border-gray-100 hover:border-brand/30 hover:scale-105'
                            }`}
                        >
                            <span className="text-3xl mb-2">{option.icon}</span>
                            <span className={`text-[10px] font-bold uppercase tracking-tighter ${selectedOption === option.id ? 'text-brand' : 'text-gray-500'}`}>
                                {option.label}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="w-full max-w-4xl px-4">
                    <div className="bg-white rounded-2xl card-shadow overflow-hidden border border-gray-100">
                        <div className="bg-brand py-5 text-center text-white">
                            <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                                Get a Free <span className="underline decoration-white/30">{options.find(o => o.id === selectedOption)?.label}</span> Quote
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 lg:p-10 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className={labelClass}>Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className={inputClass} required />
                                </div>
                                <div>
                                    <label className={labelClass}>Phone</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Mobile Number" className={inputClass} required />
                                </div>
                                <div>
                                    <label className={labelClass}>Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className={inputClass} required />
                                </div>
                            </div>

                            {renderFormFields()}

                            <div className="flex justify-center py-3">
                                <ReCAPTCHA
                                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LcFv90sAAAAABqmEiEtTxgL4rMR_Lo7tx6FkHuN"}
                                    onChange={onCaptchaChange}
                                    ref={recaptchaRef}
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className={`flex-1 py-3.5 rounded-xl font-bold text-white transition-all duration-300 ease-in-out ${
                                        isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand hover:bg-brand-dark'
                                    }`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Processing...' : 'Request Instant Quote'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="px-6 py-3.5 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
                                    disabled={isLoading}
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    );
};

export default UserForm2;
