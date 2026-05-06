'use client';

import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { FaSearch, FaSignOutAlt, FaBlog, FaChevronLeft, FaChevronRight, FaEye, FaEdit } from 'react-icons/fa';
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

    const fetchUsers = async () => {
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
    };

    useEffect(() => {
        fetchUsers();
    }, [searchQuery]);

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
            <div className="min-h-screen bg-gray-50 flex">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-900 text-white hidden lg:flex flex-col fixed h-full">
                    <div className="p-8 border-b border-gray-800">
                        <h1 className="text-2xl font-outfit font-black text-brand tracking-tighter">SURE SHIFT</h1>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Admin Panel</p>
                    </div>
                    <nav className="flex-grow p-4 space-y-2 mt-4">
                        <Link href="/admin-dashboard" className="flex items-center gap-3 px-4 py-3 bg-brand text-white rounded-xl font-bold transition-all">
                            <FaEdit /> Orders Management
                        </Link>
                        <Link href="/admin-blogdashboard" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl font-bold transition-all">
                            <FaBlog /> Blog Posts
                        </Link>
                    </nav>
                    <div className="p-4 border-t border-gray-800">
                        <button 
                            onClick={logout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl font-bold transition-all"
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-grow lg:ml-64 p-4 lg:p-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                            <div>
                                <h2 className="text-3xl font-outfit font-black text-gray-900">Orders Dashboard</h2>
                                <p className="text-gray-500 font-medium mt-1">Manage and track all customer relocation requests.</p>
                            </div>
                            
                            <div className="relative">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by Name or ID..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="pl-12 pr-6 py-3 bg-white border border-gray-200 rounded-2xl w-full md:w-[300px] shadow-sm focus:ring-2 focus:ring-brand outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50">
                                            {['Request Date', 'Customer', 'Order ID', 'Pickup Date', 'Status', 'Actions'].map((h, i) => (
                                                <th key={i} className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan="6" className="py-20 text-center">
                                                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand mx-auto"></div>
                                                </td>
                                            </tr>
                                        ) : records.length > 0 ? (
                                            records.map((user) => (
                                                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-5 text-sm font-bold text-gray-500">{formatDate(user.entry_date)}</td>
                                                    <td className="px-6 py-5">
                                                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                                        <p className="text-xs text-gray-400 font-medium">{user.email}</p>
                                                    </td>
                                                    <td className="px-6 py-5 text-sm font-mono font-bold text-brand">{user.order_id}</td>
                                                    <td className="px-6 py-5 text-sm font-bold text-gray-500">{formatDate(user.pickup_date)}</td>
                                                    <td className="px-6 py-5">
                                                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                            user.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                                            user.status === 'In Transit' ? 'bg-blue-100 text-blue-600' :
                                                            'bg-gray-100 text-gray-500'
                                                        }`}>
                                                            {user.status || 'Requested'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => openModal(user.order_id)}
                                                                className="p-2.5 bg-brand/10 text-brand rounded-xl hover:bg-brand hover:text-white transition-all shadow-sm"
                                                                title="Update Status"
                                                            >
                                                                <FaEdit />
                                                            </button>
                                                            <button
                                                                onClick={() => openModal1(user.order_id)}
                                                                className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-900 hover:text-white transition-all shadow-sm"
                                                                title="View Details"
                                                            >
                                                                <FaEye />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="py-20 text-center text-gray-400 font-bold">
                                                    No orders found matching your search.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {npage > 1 && (
                                <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">
                                        Page {currentPage} of {npage}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={prePage}
                                            disabled={currentPage === 1}
                                            className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-brand/30 disabled:opacity-50 transition-all"
                                        >
                                            <FaChevronLeft className="text-xs" />
                                        </button>
                                        <div className="flex gap-1">
                                            {numbers.map(n => (
                                                <button
                                                    key={n}
                                                    onClick={() => changeCPage(n)}
                                                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                                                        currentPage === n ? 'bg-brand text-white shadow-lg' : 'bg-white border border-gray-200 text-gray-500 hover:border-brand/30'
                                                    }`}
                                                >
                                                    {n}
                                                </button>
                                            ))}
                                        </div>
                                        <button 
                                            onClick={nextPage}
                                            disabled={currentPage === npage}
                                            className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-brand/30 disabled:opacity-50 transition-all"
                                        >
                                            <FaChevronRight className="text-xs" />
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
