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

    const fieldIconMap = {
        user: <FaUser />,
        email: <FaEnvelope />,
        phone: <FaPhone />,
        calendar: <FaCalendarAlt />,
        clock: <FaClock />,
        location: <FaMapMarkerAlt />,
        box: <FaBox />,
        info: <FaInfoCircle />,
    };

    const renderField = (iconKey, label, value) => {
        if (value == null || value === '') return null;
        return (
            <div className="cim-field">
                <div className="cim-field-icon" aria-hidden="true">
                    {fieldIconMap[iconKey]}
                </div>
                <div className="cim-field-content">
                    <span className="cim-field-label">{label}</span>
                    <span className="cim-field-value">{value}</span>
                </div>
            </div>
        );
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

                /* ── Overlay ── */
                .cim-overlay {
                    background: rgba(26, 31, 53, 0.6);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                }

                /* ── Panel ── */
                .cim-panel {
                    background: #FFFFFF;
                    border-radius: 22px;
                    overflow: hidden;
                    box-shadow:
                        0 40px 100px rgba(26, 31, 53, 0.22),
                        0 8px 24px rgba(232, 71, 42, 0.07);
                    font-family: 'Inter', sans-serif;
                    display: flex;
                    flex-direction: column;
                    max-height: 90vh;
                }

                /* ── Header ── */
                .cim-header {
                    background: #1A1F35;
                    padding: 24px 32px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-shrink: 0;
                    position: relative;
                    overflow: hidden;
                }

                .cim-header::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #E8472A 0%, #FF6B4A 60%, transparent 100%);
                }

                .cim-header-left {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    min-width: 0;
                }

                .cim-header-icon {
                    width: 42px;
                    height: 42px;
                    background: rgba(232, 71, 42, 0.18);
                    border-radius: 11px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    border: 1px solid rgba(232, 71, 42, 0.3);
                }

                .cim-header-icon svg {
                    width: 18px;
                    height: 18px;
                    color: #FF7A5C;
                }

                .cim-header-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 18px;
                    font-weight: 800;
                    color: #FFFFFF;
                    margin: 0 0 3px;
                    letter-spacing: -0.3px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .cim-header-subtitle {
                    font-size: 12px;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.45);
                    letter-spacing: 0.3px;
                    margin: 0;
                }

                .cim-header-id {
                    font-family: 'Outfit', monospace;
                    font-weight: 700;
                    color: #FF7A5C;
                    font-size: 13px;
                }

                .cim-close-btn {
                    width: 36px;
                    height: 36px;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    border-radius: 9px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background 0.18s ease, border-color 0.18s ease;
                    flex-shrink: 0;
                    color: rgba(255, 255, 255, 0.65);
                }

                .cim-close-btn:hover {
                    background: rgba(232, 71, 42, 0.25);
                    border-color: rgba(232, 71, 42, 0.4);
                    color: #FF7A5C;
                }

                .cim-close-btn svg {
                    width: 14px;
                    height: 14px;
                }

                /* ── Body ── */
                .cim-body {
                    padding: 28px 32px;
                    overflow-y: auto;
                    flex: 1;
                }

                /* ── Section label ── */
                .cim-section-label {
                    font-size: 10.5px;
                    font-weight: 700;
                    color: #E8472A;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 14px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .cim-section-label::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: #F0F1F6;
                }

                /* ── Fields grid ── */
                .cim-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 10px;
                    margin-bottom: 24px;
                }

                /* ── Field card ── */
                .cim-field {
                    display: flex;
                    align-items: flex-start;
                    gap: 11px;
                    padding: 12px 14px;
                    background: #FAFAFA;
                    border: 1px solid #EAECF2;
                    border-radius: 12px;
                    transition: border-color 0.18s ease, box-shadow 0.18s ease;
                }

                .cim-field:hover {
                    border-color: rgba(232, 71, 42, 0.2);
                    box-shadow: 0 2px 10px rgba(232, 71, 42, 0.06);
                }

                .cim-field-icon {
                    width: 32px;
                    height: 32px;
                    background: #FFF0ED;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    color: #E8472A;
                    font-size: 13px;
                }

                .cim-field-content {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    min-width: 0;
                }

                .cim-field-label {
                    font-size: 10px;
                    font-weight: 700;
                    color: #9AA0B8;
                    text-transform: uppercase;
                    letter-spacing: 0.7px;
                }

                .cim-field-value {
                    font-size: 13.5px;
                    font-weight: 600;
                    color: #1A1F35;
                    word-break: break-word;
                }

                /* ── Loading ── */
                .cim-loading {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 60px 20px;
                    gap: 16px;
                }

                .cim-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid #F0F1F6;
                    border-top-color: #E8472A;
                    border-radius: 50%;
                    animation: cim-spin 0.7s linear infinite;
                }

                @keyframes cim-spin {
                    to { transform: rotate(360deg); }
                }

                .cim-loading-text {
                    font-size: 13.5px;
                    font-weight: 600;
                    color: #9AA0B8;
                    animation: cim-pulse 1.4s ease-in-out infinite;
                }

                @keyframes cim-pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }

                /* ── Empty state ── */
                .cim-empty {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 60px 20px;
                    gap: 12px;
                }

                .cim-empty-icon {
                    width: 52px;
                    height: 52px;
                    background: #F2F3F7;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #B0B3BF;
                    font-size: 22px;
                }

                .cim-empty-text {
                    font-size: 14px;
                    font-weight: 600;
                    color: #B0B3BF;
                    margin: 0;
                }

                /* ── Footer ── */
                .cim-footer {
                    padding: 18px 32px;
                    background: #F7F8FA;
                    border-top: 1px solid #EAECF2;
                    display: flex;
                    justify-content: flex-end;
                    flex-shrink: 0;
                }

                .cim-close-primary {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 11px 26px;
                    background: linear-gradient(135deg, #E8472A 0%, #FF6B4A 100%);
                    color: #fff;
                    border: none;
                    border-radius: 12px;
                    font-family: 'Outfit', sans-serif;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 4px 14px rgba(232, 71, 42, 0.28);
                    transition: all 0.2s ease;
                    letter-spacing: 0.2px;
                }

                .cim-close-primary:hover {
                    box-shadow: 0 6px 20px rgba(232, 71, 42, 0.38);
                    transform: translateY(-1px);
                }

                .cim-close-primary:active {
                    transform: scale(0.98);
                }

                .cim-close-primary svg {
                    width: 14px;
                    height: 14px;
                }
            `}</style>

            <Transition show={isVisible} as={React.Fragment}>
                <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                        <div className="fixed inset-0 cim-overlay" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <TransitionChild
                                as={React.Fragment}
                                enter="ease-out duration-350"
                                enterFrom="opacity-0 scale-95 translate-y-4"
                                enterTo="opacity-100 scale-100 translate-y-0"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100 translate-y-0"
                                leaveTo="opacity-0 scale-95 translate-y-4"
                            >
                                <DialogPanel className="w-full max-w-4xl cim-panel">
                                    {/* Header */}
                                    <div className="cim-header">
                                        <div className="cim-header-left">
                                            <div className="cim-header-icon">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                                                    <rect x="9" y="3" width="6" height="4" rx="1" />
                                                    <path d="M9 12h6M9 16h4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <DialogTitle as="h3" className="cim-header-title">
                                                    Order Details
                                                </DialogTitle>
                                                <p className="cim-header-subtitle">
                                                    ID: <span className="cim-header-id">{orderId}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <button onClick={onClose} className="cim-close-btn" aria-label="Close">
                                            <FaTimes />
                                        </button>
                                    </div>

                                    {/* Body */}
                                    <div className="cim-body">
                                        {isLoading ? (
                                            <div className="cim-loading">
                                                <div className="cim-spinner" />
                                                <p className="cim-loading-text">Fetching order details…</p>
                                            </div>
                                        ) : users.length === 0 ? (
                                            <div className="cim-empty">
                                                <div className="cim-empty-icon">
                                                    <FaBox />
                                                </div>
                                                <p className="cim-empty-text">No information found for this order.</p>
                                            </div>
                                        ) : (
                                            users.map((user) => (
                                                <div key={user.id}>
                                                    <p className="cim-section-label">Customer &amp; Shipment Info</p>
                                                    <div className="cim-grid">
                                                        {renderField('user', 'Name', user.name)}
                                                        {renderField('email', 'Email', user.email)}
                                                        {renderField('phone', 'Phone', user.phone)}
                                                        {renderField('calendar', 'Pickup Date', formatDate(user.pickup_date))}
                                                        {renderField('clock', 'Pickup Time', user.pickup_time)}
                                                        {renderField('location', 'Pickup Address', user.pickup_address)}
                                                        {renderField('location', 'Drop Address', user.drop_address)}
                                                        {renderField('info', 'Status', user.status || 'Order Requested')}
                                                        {renderField('box', 'Purpose', user.purpose)}
                                                        {renderField('box', 'Apartment Size', user.apartment_size)}
                                                        {renderField('info', 'Company Name', user.company_name)}
                                                        {renderField('box', 'Car Model', user.car_model)}
                                                        {renderField('box', 'Storage Type', user.storage_type)}
                                                        {renderField('box', 'Material Type', user.material_type)}
                                                        {renderField('box', 'Vehicle Type', user.vehicle_type)}
                                                        {renderField('box', 'Bike Model', user.bikemodel)}
                                                        {renderField('box', 'Parcel Weight', user.parcel_weight)}
                                                        {renderField('box', 'Truck Type', user.trucktype)}
                                                        {renderField('box', 'Material', user.last_mile_material_type)}
                                                        {renderField('box', 'Dimensions', user.measurement)}
                                                        {renderField('info', 'Shipment Value', user.shipment_value)}
                                                        {renderField('box', 'Content', user.content)}
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="cim-footer">
                                        <button onClick={onClose} className="cim-close-primary">
                                            <FaTimes />
                                            Close Details
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

export default CompleteInfoModal;