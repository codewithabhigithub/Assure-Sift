'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { FaTimes, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaBox, FaInfoCircle } from 'react-icons/fa';
import api from '@/services/api';

const CompleteInfoModal = ({ isVisible, onClose, orderId }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await api.post('/users/completeInfo', { order_id: orderId });
            setUsers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setIsLoading(false);
        }
    }, [orderId]);

    useEffect(() => {
        if (isVisible && orderId) {
            fetchUsers();
        }
    }, [isVisible, orderId, fetchUsers]);

    const formatDate = (isoDate) => {
        if (!isoDate) return 'N/A';
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const renderField = (icon, label, value) => {
        if (value != null && value !== '') {
            return (
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="mt-1 text-brand">{icon}</div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                        <p className="text-sm font-semibold text-gray-700">{value}</p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <Transition show={isVisible} as={React.Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-md" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
                                <div className="bg-brand px-8 py-6 flex items-center justify-between text-white">
                                    <DialogTitle as="h3" className="text-2xl font-outfit font-black">
                                        Order Details: <span className="text-white/80 font-mono text-xl">{orderId}</span>
                                    </DialogTitle>
                                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                        <FaTimes className="text-xl" />
                                    </button>
                                </div>

                                <div className="p-8">
                                    {isLoading ? (
                                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
                                            <p className="text-gray-500 font-bold animate-pulse">Fetching details...</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-8">
                                            {users.map(user => (
                                                <div key={user.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {renderField(<FaUser />, 'Name', user.name)}
                                                    {renderField(<FaEnvelope />, 'Email', user.email)}
                                                    {renderField(<FaPhone />, 'Phone', user.phone)}
                                                    {renderField(<FaCalendarAlt />, 'Pickup Date', formatDate(user.pickup_date))}
                                                    {renderField(<FaClock />, 'Pickup Time', user.pickup_time)}
                                                    {renderField(<FaMapMarkerAlt />, 'Pickup Address', user.pickup_address)}
                                                    {renderField(<FaMapMarkerAlt />, 'Drop Address', user.drop_address)}
                                                    {renderField(<FaInfoCircle />, 'Status', user.status || 'Order Requested')}
                                                    {renderField(<FaBox />, 'Purpose', user.purpose)}
                                                    {renderField(<FaBox />, 'Apartment Size', user.apartment_size)}
                                                    {renderField(<FaInfoCircle />, 'Company Name', user.company_name)}
                                                    {renderField(<FaBox />, 'Car Model', user.car_model)}
                                                    {renderField(<FaBox />, 'Storage Type', user.storage_type)}
                                                    {renderField(<FaBox />, 'Material Type', user.material_type)}
                                                    {renderField(<FaBox />, 'Vehicle Type', user.vehicle_type)}
                                                    {renderField(<FaBox />, 'Bike Model', user.bikemodel)}
                                                    {renderField(<FaBox />, 'Parcel Weight', user.parcel_weight)}
                                                    {renderField(<FaBox />, 'Truck Type', user.trucktype)}
                                                    {renderField(<FaBox />, 'Material', user.last_mile_material_type)}
                                                    {renderField(<FaBox />, 'Dimensions', user.measurement)}
                                                    {renderField(<FaInfoCircle />, 'Value', user.shipment_value)}
                                                    {renderField(<FaBox />, 'Content', user.content)}
                                                </div>
                                            ))}
                                            {users.length === 0 && !isLoading && (
                                                <div className="text-center py-10">
                                                    <p className="text-gray-400 font-bold">No information found for this order.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="bg-gray-50 px-8 py-4 flex justify-end">
                                    <button
                                        onClick={onClose}
                                        className="bg-brand text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-dark transition-all shadow-lg"
                                    >
                                        Close Details
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CompleteInfoModal;
