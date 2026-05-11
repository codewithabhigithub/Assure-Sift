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
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

                .assure-modal-overlay {
                    background: rgba(26, 31, 53, 0.55);
                    backdrop-filter: blur(6px);
                    -webkit-backdrop-filter: blur(6px);
                }

                .assure-modal-panel {
                    background: #FFFFFF;
                    border-radius: 20px;
                    box-shadow:
                        0 32px 80px rgba(26, 31, 53, 0.18),
                        0 8px 24px rgba(232, 71, 42, 0.08);
                    font-family: 'Inter', sans-serif;
                    overflow: hidden;
                    position: relative;
                }

                .assure-modal-panel::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #E8472A 0%, #FF6B4A 100%);
                }

                .assure-modal-header {
                    padding: 36px 36px 24px;
                    text-align: center;
                }

                .assure-modal-icon {
                    width: 52px;
                    height: 52px;
                    background: linear-gradient(135deg, #FFF0ED 0%, #FFE4DF 100%);
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 16px;
                    border: 1.5px solid rgba(232, 71, 42, 0.15);
                }

                .assure-modal-icon svg {
                    width: 26px;
                    height: 26px;
                    color: #E8472A;
                }

                .assure-modal-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 22px;
                    font-weight: 800;
                    color: #1A1F35;
                    letter-spacing: -0.4px;
                    margin: 0 0 6px;
                }

                .assure-modal-subtitle {
                    font-size: 13.5px;
                    color: #8A8FA8;
                    font-weight: 400;
                    margin: 0;
                }

                .assure-modal-body {
                    padding: 4px 36px 32px;
                }

                .assure-field-group {
                    margin-bottom: 18px;
                }

                .assure-label {
                    display: block;
                    font-size: 12px;
                    font-weight: 700;
                    color: #1A1F35;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    margin-bottom: 7px;
                }

                .assure-input-readonly {
                    width: 100%;
                    padding: 11px 14px;
                    background: #F7F8FA;
                    border: 1.5px solid #EAECF2;
                    border-radius: 10px;
                    font-size: 13.5px;
                    color: #6B7080;
                    font-family: 'Outfit', monospace;
                    font-weight: 600;
                    letter-spacing: 0.3px;
                    box-sizing: border-box;
                    cursor: not-allowed;
                }

                .assure-select,
                .assure-input {
                    width: 100%;
                    padding: 11px 14px;
                    background: #FAFAFA;
                    border: 1.5px solid #E2E5EF;
                    border-radius: 10px;
                    font-size: 13.5px;
                    color: #1A1F35;
                    font-family: 'Inter', sans-serif;
                    font-weight: 500;
                    box-sizing: border-box;
                    outline: none;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
                    appearance: none;
                    -webkit-appearance: none;
                }

                .assure-select-wrapper {
                    position: relative;
                }

                .assure-select-wrapper::after {
                    content: '';
                    position: absolute;
                    right: 14px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 0;
                    height: 0;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-top: 6px solid #8A8FA8;
                    pointer-events: none;
                }

                .assure-select:focus,
                .assure-input:focus {
                    border-color: #E8472A;
                    box-shadow: 0 0 0 3px rgba(232, 71, 42, 0.1);
                    background: #FFFFFF;
                }

                .assure-select:hover,
                .assure-input:hover {
                    border-color: #C8C9D4;
                }

                .assure-custom-field {
                    animation: slideDown 0.22s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .assure-error {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    padding: 10px 14px;
                    background: #FFF5F4;
                    border: 1.5px solid #FFD5CF;
                    border-radius: 9px;
                    font-size: 13px;
                    font-weight: 600;
                    color: #C93A20;
                    margin-top: 4px;
                }

                .assure-error svg {
                    flex-shrink: 0;
                    width: 15px;
                    height: 15px;
                }

                .assure-modal-footer {
                    padding: 0 36px 32px;
                    display: flex;
                    gap: 12px;
                }

                .assure-btn-primary {
                    flex: 1;
                    padding: 13px 20px;
                    background: linear-gradient(135deg, #E8472A 0%, #FF6B4A 100%);
                    color: #FFFFFF;
                    border: none;
                    border-radius: 12px;
                    font-family: 'Outfit', sans-serif;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 14px rgba(232, 71, 42, 0.3);
                    position: relative;
                    overflow: hidden;
                    letter-spacing: 0.2px;
                }

                .assure-btn-primary::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: rgba(255,255,255,0);
                    transition: background 0.2s ease;
                }

                .assure-btn-primary:hover:not(:disabled)::before {
                    background: rgba(255,255,255,0.12);
                }

                .assure-btn-primary:active:not(:disabled) {
                    transform: scale(0.98);
                }

                .assure-btn-primary:disabled {
                    background: linear-gradient(135deg, #C8C9D4 0%, #B0B3BF 100%);
                    box-shadow: none;
                    cursor: not-allowed;
                }

                .assure-btn-loading {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }

                .assure-spinner {
                    width: 16px;
                    height: 16px;
                    border: 2.5px solid rgba(255,255,255,0.35);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .assure-btn-secondary {
                    padding: 13px 22px;
                    background: #F2F3F7;
                    color: #4A5068;
                    border: 1.5px solid #E2E5EF;
                    border-radius: 12px;
                    font-family: 'Outfit', sans-serif;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    white-space: nowrap;
                }

                .assure-btn-secondary:hover {
                    background: #E8EAF2;
                    color: #1A1F35;
                    border-color: #C8C9D4;
                }

                .assure-btn-secondary:active {
                    transform: scale(0.98);
                }

                .assure-divider {
                    height: 1px;
                    background: #F0F1F6;
                    margin: 0 36px 28px;
                }
            `}</style>

            <Transition show={isOpen} as={React.Fragment}>
                <Dialog as="div" className="relative z-50" onClose={onRequestClose}>
                    {/* Backdrop */}
                    <TransitionChild
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 assure-modal-overlay" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <TransitionChild
                                as={React.Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95 translate-y-4"
                                enterTo="opacity-100 scale-100 translate-y-0"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100 translate-y-0"
                                leaveTo="opacity-0 scale-95 translate-y-4"
                            >
                                <DialogPanel className="w-full max-w-md assure-modal-panel">
                                    {/* Header */}
                                    <div className="assure-modal-header">
                                        <div className="assure-modal-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M9 12l2 2 4-4" />
                                                <circle cx="12" cy="12" r="10" />
                                            </svg>
                                        </div>
                                        <DialogTitle as="h3" className="assure-modal-title">
                                            Update Order Status
                                        </DialogTitle>
                                        <p className="assure-modal-subtitle">
                                            Select a status to update the shipment progress
                                        </p>
                                    </div>

                                    {/* Body */}
                                    <div className="assure-modal-body">
                                        {/* Order ID */}
                                        <div className="assure-field-group">
                                            <label className="assure-label">Order ID</label>
                                            <input
                                                type="text"
                                                value={orderId || ''}
                                                readOnly
                                                className="assure-input-readonly"
                                            />
                                        </div>

                                        {/* Status Select */}
                                        <div className="assure-field-group">
                                            <label className="assure-label">Select Status</label>
                                            <div className="assure-select-wrapper">
                                                <select
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    className="assure-select"
                                                >
                                                    <option value="">— Choose a status —</option>
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
                                        </div>

                                        {/* Custom Status */}
                                        {status === 'Others' && (
                                            <div className="assure-field-group assure-custom-field">
                                                <label className="assure-label">Custom Status</label>
                                                <input
                                                    type="text"
                                                    value={customStatus}
                                                    onChange={(e) => setCustomStatus(e.target.value)}
                                                    placeholder="Describe the current status…"
                                                    className="assure-input"
                                                />
                                            </div>
                                        )}

                                        {/* Error */}
                                        {error && (
                                            <div className="assure-error">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <line x1="12" y1="8" x2="12" y2="12" />
                                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                                </svg>
                                                {error}
                                            </div>
                                        )}
                                    </div>

                                    {/* Divider */}
                                    <div className="assure-divider" />

                                    {/* Footer */}
                                    <div className="assure-modal-footer">
                                        <button
                                            type="button"
                                            onClick={handleStatusUpdate}
                                            className="assure-btn-primary"
                                            disabled={loading || !status || (status === 'Others' && !customStatus.trim())}
                                        >
                                            {loading ? (
                                                <span className="assure-btn-loading">
                                                    <span className="assure-spinner" />
                                                    Updating…
                                                </span>
                                            ) : (
                                                'Update Status'
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={onRequestClose}
                                            className="assure-btn-secondary"
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
        </>
    );
};

export default StatusModal;