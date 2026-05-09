'use client';

import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { Search, LogOut, BookOpen, ChevronLeft, ChevronRight, Eye, Edit, List, Activity } from 'lucide-react';
import api from '@/services/api';
import { AuthContext } from '@/context/AuthContext';
import StatusModal from '@/components/StatusModal';
import CompleteInfoModal from '@/components/CompleteInfoModal';
import ProtectedRoute from '@/components/ProtectedRoute';

const AdminDashboardPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [selectedOrderId1, setSelectedOrderId1] = useState(null);
    const { logout } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
        const timer = setTimeout(() => {
            fetchUsers();
        }, 0);
        return () => clearTimeout(timer);
    }, [fetchUsers]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const openModal = (orderId) => {
        setSelectedOrderId(orderId);
        setShowModal(true);
    };

    const openModal1 = (orderId) => {
        setSelectedOrderId1(orderId);
        setShowModal1(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedOrderId(null);
    };

    const handleUpdate = () => {
        fetchUsers();
    };

    const formatDate = (isoDate) => {
        if (!isoDate) return 'N/A';
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    // Pagination
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = users.slice(firstIndex, lastIndex);
    const npage = Math.ceil(users.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const prePage = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
    const nextPage = () => currentPage !== npage && setCurrentPage(currentPage + 1);
    const changeCPage = (id) => setCurrentPage(id);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-bg-primary flex">
                {/* Luxury Sidebar */}
                <aside className="w-72 bg-bg-dark text-white hidden lg:flex flex-col fixed h-full shadow-2xl z-50">
                    <div className="p-10 border-b border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full pointer-events-none"></div>
                        <h1 className="text-3xl font-display font-bold text-accent tracking-tighter">ASSURE SIFT</h1>
                        <p className="text-[9px] text-white/30 font-bold uppercase tracking-[0.4em] mt-2">Principal Console</p>
                    </div>
                    <nav className="flex-grow p-6 space-y-4 mt-8">
                        <Link href="/admin-dashboard" className="flex items-center gap-4 px-6 py-4 bg-accent text-white rounded-2xl font-body font-bold text-sm tracking-wide shadow-lg transition-premium">
                            <List size={18} /> Orders Management
                        </Link>
                        <Link href="/admin-blogdashboard" className="flex items-center gap-4 px-6 py-4 text-white/40 hover:bg-white/5 hover:text-white rounded-2xl font-body text-sm tracking-wide transition-premium">
                            <BookOpen size={18} /> Blog Posts
                        </Link>
                    </nav>
                    <div className="p-6 border-t border-white/5">
                        <button onClick={logout} className="flex items-center gap-4 w-full px-6 py-4 text-accent/60 hover:bg-accent/10 rounded-2xl font-body font-bold text-sm tracking-wide transition-premium">
                            <LogOut size={18} /> Exit Console
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-grow lg:ml-72 p-10 lg:p-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
                            <div>
                                <span className="subtitle">Relocation Management</span>
                                <h2 className="text-4xl font-display text-text-dark">Operational Logistics</h2>
                            </div>
                            
                            <div className="relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search Customer or ID..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="pl-14 pr-8 py-4 bg-white border border-stone/30 rounded-2xl w-full md:w-[300px] shadow-soft focus:shadow-hover outline-none transition-premium font-body"
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-[40px] shadow-soft border border-stone/10 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-stone/5">
                                            {['Request Date', 'Customer', 'Order ID', 'Pickup Date', 'Status', 'Actions'].map((h, i) => (
                                                <th key={i} className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted border-b border-stone/20">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone/10 font-body">
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan="6" className="py-32 text-center">
                                                    <Activity className="animate-spin text-accent mx-auto" size={32} />
                                                </td>
                                            </tr>
                                        ) : records.length > 0 ? (
                                            records.map((user) => (
                                                <tr key={user.id} className="hover:bg-stone/5 transition-colors group">
                                                    <td className="px-10 py-8 text-sm font-light text-text-muted">{formatDate(user.entry_date)}</td>
                                                    <td className="px-10 py-8">
                                                        <p className="text-base font-display font-bold text-text-dark">{user.name}</p>
                                                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em]">{user.email}</p>
                                                    </td>
                                                    <td className="px-10 py-8 text-sm font-mono font-bold text-accent">{user.order_id}</td>
                                                    <td className="px-10 py-8 text-sm font-light text-text-muted">{formatDate(user.pickup_date)}</td>
                                                    <td className="px-10 py-8">
                                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] ${
                                                            user.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                                                            user.status === 'In Transit' ? 'bg-accent/5 text-accent' :
                                                            'bg-stone/20 text-text-muted'
                                                        }`}>
                                                            {user.status || 'Requested'}
                                                        </span>
                                                    </td>
                                                    <td className="px-10 py-8">
                                                        <div className="flex gap-4">
                                                            <button
                                                                onClick={() => openModal(user.order_id)}
                                                                className="p-3 bg-accent/5 text-accent rounded-xl hover:bg-accent hover:text-white transition-premium shadow-soft"
                                                                title="Update Status"
                                                            >
                                                                <Edit size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => openModal1(user.order_id)}
                                                                className="p-3 bg-stone/20 text-text-dark rounded-xl hover:bg-bg-dark hover:text-white transition-premium shadow-soft"
                                                                title="View Details"
                                                            >
                                                                <Eye size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="py-32 text-center text-text-muted font-display italic text-xl">
                                                    No orders found matching your search.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {npage > 1 && (
                                <div className="px-10 py-8 bg-stone/5 border-t border-stone/20 flex items-center justify-between">
                                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.3em]">
                                        Folio {currentPage} of {npage}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={prePage}
                                            disabled={currentPage === 1}
                                            className="p-3 bg-white border border-stone/30 rounded-xl shadow-soft hover:border-accent disabled:opacity-30 transition-premium"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        <div className="flex gap-2">
                                            {numbers.map(n => (
                                                <button
                                                    key={n}
                                                    onClick={() => changeCPage(n)}
                                                    className={`w-10 h-10 rounded-xl text-xs font-bold transition-premium ${
                                                        currentPage === n ? 'bg-accent text-white shadow-lg' : 'bg-white border border-stone/30 text-text-muted hover:border-accent'
                                                    }`}
                                                >
                                                    {n}
                                                </button>
                                            ))}
                                        </div>
                                        <button 
                                            onClick={nextPage}
                                            disabled={currentPage === npage}
                                            className="p-3 bg-white border border-stone/30 rounded-xl shadow-soft hover:border-accent disabled:opacity-30 transition-premium"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

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
            </div>
        </ProtectedRoute>
    );
};

export default AdminDashboardPage;
