'use client';

import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { Search, LogOut, BookOpen, ChevronLeft, ChevronRight, Eye, Edit, List, Activity } from 'lucide-react';
import api from '@/services/api';
import { AuthContext } from '@/context/AuthContext';
import StatusModal from '@/components/StatusModal';
import CompleteInfoModal from '@/components/CompleteInfoModal';
import ProtectedRoute from '@/components/ProtectedRoute';

/*
  THEME TOKENS — mirrors the public-facing site's palette:
  --accent      : #C1440E  (terracotta/rust CTA colour from the landing page)
  --bg-dark     : #1A1A1A  (near-black used in footer / track section)
  --bg-primary  : #F5F0EB  (warm cream page background)
  --stone       : #D6CFC6  (subtle border / divider tone)
  --text-dark   : #1A1A1A
  --text-muted  : #7A7168
  --white       : #FFFFFF

  All colour references below use these semantic names so you can swap them
  via Tailwind config / CSS vars in one place.
*/

const AdminDashboardPage = () => {
    const [showModal, setShowModal]   = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [users, setUsers]           = useState([]);
    const [selectedOrderId, setSelectedOrderId]   = useState(null);
    const [selectedOrderId1, setSelectedOrderId1] = useState(null);
    const { logout } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading]     = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const fetchUsers = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await api.get('/users');
            const filteredUsers = (data || []).filter(user =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.order_id?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setUsers(filteredUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        const timer = setTimeout(() => { fetchUsers(); }, 0);
        return () => clearTimeout(timer);
    }, [fetchUsers]);

    const handleSearchChange = (e) => { setSearchQuery(e.target.value); setCurrentPage(1); };
    const openModal  = (orderId) => { setSelectedOrderId(orderId);  setShowModal(true);  };
    const openModal1 = (orderId) => { setSelectedOrderId1(orderId); setShowModal1(true); };
    const closeModal = () => { setShowModal(false); setSelectedOrderId(null); };
    const handleUpdate = () => { fetchUsers(); };

    const formatDate = (isoDate) => {
        if (!isoDate) return '—';
        return new Date(isoDate).toLocaleDateString('en-IN', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        });
    };

    // Pagination helpers
    const lastIndex  = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records    = users.slice(firstIndex, lastIndex);
    const npage      = Math.ceil(users.length / recordsPerPage);
    const numbers    = [...Array(npage + 1).keys()].slice(1);

    const prePage    = () => currentPage !== 1     && setCurrentPage(currentPage - 1);
    const nextPage   = () => currentPage !== npage && setCurrentPage(currentPage + 1);
    const changeCPage = (id) => setCurrentPage(id);

    /* ─── Status badge helper ──────────────────────────────────────────── */
    const statusStyle = (status) => {
        switch (status) {
            case 'Delivered':  return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
            case 'In Transit': return 'bg-[#FDF0EB] text-[#C1440E] border border-[#C1440E]/20';
            default:           return 'bg-[#F5F0EB] text-[#7A7168] border border-[#D6CFC6]';
        }
    };

    return (
        <ProtectedRoute>
            {/* ── Root shell ──────────────────────────────────────────────── */}
            <div className="min-h-screen flex" style={{ background: '#F5F0EB' }}>

                {/* ════════════════════════════════════════════════════════════
                    SIDEBAR  — matches dark footer / tracking section of the site
                ════════════════════════════════════════════════════════════ */}
                <aside
                    className="w-64 hidden lg:flex flex-col fixed h-full z-50"
                    style={{ background: '#1A1A1A' }}
                >
                    {/* Logo block */}
                    <div className="px-8 py-10 border-b border-white/5 relative overflow-hidden">
                        {/* Subtle warm glow — mirrors the hero section warmth */}
                        <div
                            className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
                            style={{ background: 'radial-gradient(circle, rgba(193,68,14,0.15) 0%, transparent 70%)' }}
                        />
                        {/* Logo text — Assure Sift Relocation brand */}
                        <div className="flex items-center gap-3 mb-1">
                            {/* Tiny brand mark square */}
                            <span
                                className="w-7 h-7 rounded-md flex items-center justify-center text-white text-[10px] font-black shrink-0"
                                style={{ background: '#C1440E' }}
                            >
                                AS
                            </span>
                            <span
                                className="text-lg font-black tracking-tight text-white"
                                style={{ fontFamily: 'Georgia, serif' }}
                            >
                                Assure Sift Relocation
                            </span>
                        </div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.35em] mt-2" style={{ color: '#7A7168' }}>
                            Principal Console
                        </p>
                    </div>

                    {/* Nav links */}
                    <nav className="flex-grow px-5 py-8 space-y-2">
                        {/* Active link */}
                        <Link
                            href="/admin-dashboard"
                            className="flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-bold tracking-wide text-white transition-all duration-200"
                            style={{ background: '#C1440E', boxShadow: '0 4px 24px rgba(193,68,14,0.35)' }}
                        >
                            <List size={16} />
                            Orders Management
                        </Link>

                        {/* Inactive link */}
                        <Link
                            href="/admin-blogdashboard"
                            className="flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 hover:bg-white/5"
                            style={{ color: '#7A7168' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                            onMouseLeave={e => e.currentTarget.style.color = '#7A7168'}
                        >
                            <BookOpen size={16} />
                            Blog Posts
                        </Link>
                    </nav>

                    {/* Logout */}
                    <div className="px-5 py-6 border-t border-white/5">
                        <button
                            onClick={logout}
                            className="flex items-center gap-3 w-full px-5 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 hover:bg-[#C1440E]/10"
                            style={{ color: '#C1440E' }}
                        >
                            <LogOut size={16} />
                            Exit Console
                        </button>
                    </div>
                </aside>

                {/* ════════════════════════════════════════════════════════════
                    MAIN CONTENT
                ════════════════════════════════════════════════════════════ */}
                <main className="flex-grow lg:ml-64 px-6 py-10 lg:px-14 lg:py-14">
                    <div className="max-w-6xl mx-auto">

                        {/* Page header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                            <div>
                                <p
                                    className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2"
                                    style={{ color: '#C1440E' }}
                                >
                                    Relocation Management
                                </p>
                                <h2
                                    className="text-3xl font-black leading-tight"
                                    style={{ color: '#1A1A1A', fontFamily: 'Georgia, serif' }}
                                >
                                    Operational Logistics
                                </h2>
                            </div>

                            {/* Search bar */}
                            <div className="relative group">
                                <Search
                                    className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200"
                                    size={16}
                                    style={{ color: '#7A7168' }}
                                />
                                <input
                                    type="text"
                                    placeholder="Search customer or Order ID…"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="pl-11 pr-5 py-3 text-sm rounded-xl w-full md:w-72 outline-none transition-all duration-200"
                                    style={{
                                        background: '#FFFFFF',
                                        border: '1.5px solid #D6CFC6',
                                        color: '#1A1A1A',
                                        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                                    }}
                                    onFocus={e  => e.target.style.borderColor = '#C1440E'}
                                    onBlur={e   => e.target.style.borderColor = '#D6CFC6'}
                                />
                            </div>
                        </div>

                        {/* ── Table card ─────────────────────────────────────── */}
                        <div
                            className="rounded-3xl overflow-hidden"
                            style={{
                                background: '#FFFFFF',
                                border: '1px solid #E8E2DA',
                                boxShadow: '0 2px 24px rgba(0,0,0,0.06)',
                            }}
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr style={{ background: '#F9F6F2', borderBottom: '1px solid #E8E2DA' }}>
                                            {['Request Date', 'Customer', 'Order ID', 'Pickup Date', 'Status', 'Actions'].map((h, i) => (
                                                <th
                                                    key={i}
                                                    className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.35em]"
                                                    style={{ color: '#7A7168' }}
                                                >
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody style={{ borderTop: 'none' }}>
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan="6" className="py-28 text-center">
                                                    <Activity
                                                        className="animate-spin mx-auto"
                                                        size={28}
                                                        style={{ color: '#C1440E' }}
                                                    />
                                                </td>
                                            </tr>

                                        ) : records.length > 0 ? records.map((user, idx) => (
                                            <tr
                                                key={user.id}
                                                className="transition-colors duration-150"
                                                style={{
                                                    borderBottom: idx < records.length - 1 ? '1px solid #F0EBE5' : 'none',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#FBF8F5'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                            >
                                                {/* Request Date */}
                                                <td className="px-8 py-6 text-sm" style={{ color: '#7A7168' }}>
                                                    {formatDate(user.entry_date)}
                                                </td>

                                                {/* Customer */}
                                                <td className="px-8 py-6">
                                                    <p
                                                        className="text-sm font-bold leading-tight"
                                                        style={{ color: '#1A1A1A', fontFamily: 'Georgia, serif' }}
                                                    >
                                                        {user.name}
                                                    </p>
                                                    <p className="text-[10px] mt-0.5 font-medium" style={{ color: '#7A7168' }}>
                                                        {user.email}
                                                    </p>
                                                </td>

                                                {/* Order ID */}
                                                <td className="px-8 py-6">
                                                    <span
                                                        className="text-xs font-black tracking-widest font-mono"
                                                        style={{ color: '#C1440E' }}
                                                    >
                                                        {user.order_id}
                                                    </span>
                                                </td>

                                                {/* Pickup Date */}
                                                <td className="px-8 py-6 text-sm" style={{ color: '#7A7168' }}>
                                                    {formatDate(user.pickup_date)}
                                                </td>

                                                {/* Status badge */}
                                                <td className="px-8 py-6">
                                                    <span
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.25em] ${statusStyle(user.status)}`}
                                                    >
                                                        {user.status || 'Requested'}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        {/* Edit status */}
                                                        <button
                                                            onClick={() => openModal(user.order_id)}
                                                            title="Update Status"
                                                            className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200"
                                                            style={{
                                                                background: 'rgba(193,68,14,0.08)',
                                                                color: '#C1440E',
                                                                border: '1px solid rgba(193,68,14,0.15)',
                                                            }}
                                                            onMouseEnter={e => {
                                                                e.currentTarget.style.background = '#C1440E';
                                                                e.currentTarget.style.color = '#fff';
                                                            }}
                                                            onMouseLeave={e => {
                                                                e.currentTarget.style.background = 'rgba(193,68,14,0.08)';
                                                                e.currentTarget.style.color = '#C1440E';
                                                            }}
                                                        >
                                                            <Edit size={15} />
                                                        </button>

                                                        {/* View details */}
                                                        <button
                                                            onClick={() => openModal1(user.order_id)}
                                                            title="View Details"
                                                            className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200"
                                                            style={{
                                                                background: '#F5F0EB',
                                                                color: '#1A1A1A',
                                                                border: '1px solid #D6CFC6',
                                                            }}
                                                            onMouseEnter={e => {
                                                                e.currentTarget.style.background = '#1A1A1A';
                                                                e.currentTarget.style.color = '#fff';
                                                                e.currentTarget.style.borderColor = '#1A1A1A';
                                                            }}
                                                            onMouseLeave={e => {
                                                                e.currentTarget.style.background = '#F5F0EB';
                                                                e.currentTarget.style.color = '#1A1A1A';
                                                                e.currentTarget.style.borderColor = '#D6CFC6';
                                                            }}
                                                        >
                                                            <Eye size={15} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="6" className="py-28 text-center">
                                                    <p
                                                        className="text-lg italic"
                                                        style={{ color: '#7A7168', fontFamily: 'Georgia, serif' }}
                                                    >
                                                        No orders found matching your search.
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* ── Pagination ───────────────────────────────── */}
                            {npage > 1 && (
                                <div
                                    className="px-8 py-5 flex items-center justify-between"
                                    style={{ background: '#F9F6F2', borderTop: '1px solid #E8E2DA' }}
                                >
                                    <p
                                        className="text-[9px] font-black uppercase tracking-[0.35em]"
                                        style={{ color: '#7A7168' }}
                                    >
                                        Page {currentPage} of {npage}
                                    </p>

                                    <div className="flex items-center gap-2">
                                        {/* Prev */}
                                        <button
                                            onClick={prePage}
                                            disabled={currentPage === 1}
                                            className="w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-200 disabled:opacity-30"
                                            style={{ background: '#fff', borderColor: '#D6CFC6', color: '#1A1A1A' }}
                                            onMouseEnter={e => !e.currentTarget.disabled && (e.currentTarget.style.borderColor = '#C1440E')}
                                            onMouseLeave={e => e.currentTarget.style.borderColor = '#D6CFC6'}
                                        >
                                            <ChevronLeft size={15} />
                                        </button>

                                        {/* Page numbers */}
                                        {numbers.map(n => (
                                            <button
                                                key={n}
                                                onClick={() => changeCPage(n)}
                                                className="w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold border transition-all duration-200"
                                                style={
                                                    currentPage === n
                                                        ? { background: '#C1440E', color: '#fff', borderColor: '#C1440E', boxShadow: '0 4px 12px rgba(193,68,14,0.35)' }
                                                        : { background: '#fff', color: '#7A7168', borderColor: '#D6CFC6' }
                                                }
                                            >
                                                {n}
                                            </button>
                                        ))}

                                        {/* Next */}
                                        <button
                                            onClick={nextPage}
                                            disabled={currentPage === npage}
                                            className="w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-200 disabled:opacity-30"
                                            style={{ background: '#fff', borderColor: '#D6CFC6', color: '#1A1A1A' }}
                                            onMouseEnter={e => !e.currentTarget.disabled && (e.currentTarget.style.borderColor = '#C1440E')}
                                            onMouseLeave={e => e.currentTarget.style.borderColor = '#D6CFC6'}
                                        >
                                            <ChevronRight size={15} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* end table card */}

                    </div>
                </main>
            </div>

            {/* Modals — unchanged logic */}
            <StatusModal
                isOpen={showModal}
                onRequestClose={closeModal}
                orderId={selectedOrderId}
                onUpdate={handleUpdate}
            />
            <CompleteInfoModal
                orderId={selectedOrderId1}
                isVisible={showModal1}
                onClose={() => setShowModal1(false)}
            />
        </ProtectedRoute>
    );
};

export default AdminDashboardPage;