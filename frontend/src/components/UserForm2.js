'use client';

import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Autocomplete, LoadScript } from '@react-google-maps/api';
import api from '@/services/api';

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

const UserForm2 = () => {
    const [selectedOption, setSelectedOption] = useState('car');
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
            await api.post('/user', updatedFormData);
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

    const renderFormFields = () => {
        const commonDateAndTime = (
            <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Pickup Date</label>
                    <input
                        type="date"
                        name="pickup_date"
                        value={formData.pickup_date}
                        onChange={handleChange}
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none transition-all"
                        required
                    />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Pickup Time</label>
                    <input
                        type="time"
                        name="pickup_time"
                        value={formData.pickup_time}
                        onChange={handleChange}
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none transition-all"
                        required
                    />
                </div>
            </div>
        );

        const commonAddresses = (
            <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Pickup Address</label>
                    <MapErrorBoundary fallback={
                        <input
                            type="text"
                            name="pickup_address"
                            value={formData.pickup_address}
                            onChange={handleChange}
                            placeholder="Enter Pickup Location"
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none transition-all"
                            required
                        />
                    }>
                        <Autocomplete
                            onLoad={(autocomplete) => (autocompletePickupRef.current = autocomplete)}
                            onPlaceChanged={() => handleAddressChange('pickup_address', autocompletePickupRef.current.getPlace())}
                        >
                            <input
                                type="text"
                                name="pickup_address"
                                value={formData.pickup_address}
                                onChange={handleChange}
                                placeholder="Enter Pickup Location"
                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none transition-all"
                                required
                            />
                        </Autocomplete>
                    </MapErrorBoundary>
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Drop Address</label>
                    <MapErrorBoundary fallback={
                        <input
                            type="text"
                            name="drop_address"
                            value={formData.drop_address}
                            onChange={handleChange}
                            placeholder="Enter Drop Location"
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none transition-all"
                            required
                        />
                    }>
                        <Autocomplete
                            onLoad={(autocomplete) => (autocompleteDropRef.current = autocomplete)}
                            onPlaceChanged={() => handleAddressChange('drop_address', autocompleteDropRef.current.getPlace())}
                        >
                            <input
                                type="text"
                                name="drop_address"
                                value={formData.drop_address}
                                onChange={handleChange}
                                placeholder="Enter Drop Location"
                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none transition-all"
                                required
                            />
                        </Autocomplete>
                    </MapErrorBoundary>
                </div>
            </div>
        );

        switch (selectedOption) {
            case 'household':
                return (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-gray-700 mb-1">Apartment Size</label>
                            <select
                                name="apartmentSize"
                                value={formData.apartmentSize}
                                onChange={handleChange}
                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none"
                                required
                            >
                                <option value="">Select Apartment Size</option>
                                {apartmentSizes.map(size => <option key={size.value} value={size.value}>{size.label}</option>)}
                            </select>
                        </div>
                        {commonDateAndTime}
                        {commonAddresses}
                    </>
                );
            case 'office':
            case 'commercial':
            case 'truck':
            case 'last_mile':
            case 'odc_consignment':
                return (
                    <>
                        <div className="flex flex-wrap -mx-2 mb-4">
                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <label className="block text-sm font-bold text-gray-700 mb-1">Company Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="Company Name"
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none"
                                    required
                                />
                            </div>
                            {selectedOption === 'commercial' || selectedOption === 'odc_consignment' ? (
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Material Type</label>
                                    <input
                                        type="text"
                                        name="materialType"
                                        value={formData.materialType}
                                        onChange={handleChange}
                                        placeholder="Material Type"
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none"
                                        required
                                    />
                                </div>
                            ) : null}
                            {selectedOption === 'truck' ? (
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Truck Type</label>
                                    <select
                                        name="truckType"
                                        value={formData.truckType}
                                        onChange={handleChange}
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none"
                                        required
                                    >
                                        <option value="">Select Truck Type</option>
                                        {truckType.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                                    </select>
                                </div>
                            ) : null}
                        </div>
                        {commonDateAndTime}
                        {commonAddresses}
                    </>
                );
            case 'car':
            case 'bike':
                return (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-gray-700 mb-1">{selectedOption === 'car' ? 'Car Model' : 'Bike Model'}</label>
                            <input
                                type="text"
                                name={selectedOption === 'car' ? 'carModel' : 'bikeModel'}
                                value={selectedOption === 'car' ? formData.carModel : formData.bikeModel}
                                onChange={handleChange}
                                placeholder={`Enter ${selectedOption} Model`}
                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none"
                                required
                            />
                        </div>
                        {commonDateAndTime}
                        {commonAddresses}
                    </>
                );
            case 'courier':
                return (
                    <>
                        <div className="flex flex-wrap -mx-2 mb-4">
                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <label className="block text-sm font-bold text-gray-700 mb-1">Parcel Weight (g)</label>
                                <input
                                    type="number"
                                    name="parcel_weight"
                                    value={formData.parcel_weight}
                                    onChange={handleChange}
                                    placeholder="Weight in grams"
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none"
                                    required
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <label className="block text-sm font-bold text-gray-700 mb-1">Measurements (LxWxH)</label>
                                <input
                                    type="text"
                                    name="measurement"
                                    value={formData.measurement}
                                    onChange={handleChange}
                                    placeholder="e.g., 10x20x30"
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-sm font-bold text-gray-700 mb-1">Select Content</label>
                            <input
                                type="text"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                placeholder="Search or select content"
                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none"
                            />
                            {isDropdownOpen && (
                                <ul className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-xl max-h-60 overflow-y-auto">
                                    {filteredOptions.map(option => (
                                        <li key={option.value} onClick={() => handleSelectOption(option)} className="p-3 hover:bg-gray-100 cursor-pointer text-sm">
                                            {option.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {commonDateAndTime}
                        {commonAddresses}
                    </>
                );
            default:
                return (
                    <>
                        {commonDateAndTime}
                        {commonAddresses}
                    </>
                );
        }
    };

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={LIBRARIES}>
            <div className="w-full flex flex-col items-center py-12">
                <div className="w-full max-w-5xl px-4 flex flex-wrap justify-center gap-3 mb-10">
                    {options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleOptionClick(option.id)}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-sm border-2 transition-all-custom w-28 h-28 ${
                                selectedOption === option.id 
                                ? 'bg-brand/10 border-brand scale-105 shadow-md' 
                                : 'bg-white border-transparent hover:border-brand/30 hover:scale-105'
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
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                        <div className="bg-brand py-6 text-center text-white">
                            <h2 className="text-2xl font-outfit font-bold">
                                Get a Free <span className="underline decoration-white/30">{options.find(o => o.id === selectedOption)?.label}</span> Quote
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 lg:p-12 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-1">
                                    <label className="block text-sm font-bold text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-bold text-gray-700">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Mobile Number"
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-bold text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email Address"
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            {renderFormFields()}

                            <div className="flex justify-center py-4">
                                <ReCAPTCHA
                                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LcNBTUqAAAAANEVacfo2ApjLvEImEf8OeSlygJE"}
                                    onChange={onCaptchaChange}
                                    ref={recaptchaRef}
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className={`flex-1 p-4 rounded-xl font-bold text-white transition-all-custom ${
                                        isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand hover:bg-brand-dark shadow-lg hover:shadow-xl'
                                    }`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Processing...' : 'Request Instant Quote'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="px-8 p-4 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
                                    disabled={isLoading}
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </LoadScript>
    );
};

export default UserForm2;
