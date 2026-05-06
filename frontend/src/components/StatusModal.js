'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import api from '@/services/api';

const StatusModal = ({ isOpen, onRequestClose, orderId, onUpdate }) => {
    const [status, setStatus] = useState('');
    const [customStatus, setCustomStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setStatus('');
            setCustomStatus('');
            setError('');
        }
    }, [isOpen]);

    const handleStatusUpdate = async () => {
        setLoading(true);
        try {
            const finalStatus = status === 'Others' ? customStatus : status;
            await api.post('/users/status', { order_id: orderId, status: finalStatus });
            alert('Status updated successfully');
            onUpdate();
            onRequestClose();
        } catch (error) {
            console.error('Error updating status:', error);
            setError('Failed to update status. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Transition show={isOpen} as={React.Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onRequestClose}>
                <TransitionChild
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <DialogTitle as="h3" className="text-2xl font-outfit font-bold text-gray-900 text-center mb-6">
                                    Update Order Status
                                </DialogTitle>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Order ID</label>
                                        <input
                                            type="text"
                                            value={orderId || ''}
                                            readOnly
                                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 font-mono"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Select Status</label>
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none"
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Enquiry Received">Enquiry Received</option>
                                            <option value="Survey Initiated">Survey Initiated</option>
                                            <option value="Survey Done">Survey Done</option>
                                            <option value="Quotation Sent">Quotation Sent</option>
                                            <option value="Quotation Approved">Quotation Approved</option>
                                            <option value="CFR Generated">CFR Generated</option>
                                            <option value="On the way for Pickup">On the way for Pickup</option>
                                            <option value="Pickup Point Reached">Pickup Point Reached</option>
                                            <option value="Packing Started">Packing Started</option>
                                            <option value="Packing Finished">Packing Finished</option>
                                            <option value="Loading Started">Loading Started</option>
                                            <option value="Loading Finished">Loading Finished</option>
                                            <option value="In Transit">In Transit</option>
                                            <option value="On the way for Delivery">On the way for Delivery</option>
                                            <option value="Delivery Point Reached">Delivery Point Reached</option>
                                            <option value="Unloading Started">Unloading Started</option>
                                            <option value="Unloading Finished">Unloading Finished</option>
                                            <option value="Unpacking Started">Unpacking Started</option>
                                            <option value="Unpacking Finished">Unpacking Finished</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </div>

                                    {status === 'Others' && (
                                        <div className="animate-in fade-in slide-in-from-top-2">
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Custom Status</label>
                                            <input
                                                type="text"
                                                value={customStatus}
                                                onChange={(e) => setCustomStatus(e.target.value)}
                                                placeholder="Enter custom status"
                                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand outline-none"
                                            />
                                        </div>
                                    )}

                                    {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
                                </div>

                                <div className="mt-8 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={handleStatusUpdate}
                                        className="flex-1 bg-brand text-white py-3 rounded-xl font-bold hover:bg-brand-dark transition-all shadow-md disabled:bg-gray-400"
                                        disabled={loading}
                                    >
                                        {loading ? 'Updating...' : 'Update Status'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={onRequestClose}
                                        className="px-6 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
                                    >
                                        Cancel
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

export default StatusModal;
