'use client';

import React, { useState, useContext, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, LogOut, Edit, Trash, Image as ImageIcon, ChevronLeft, List, Activity, BookOpen } from 'lucide-react';
import api, { UPLOAD_BASE } from '@/services/api';
import { AuthContext } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

/*
  THEME TOKENS — same as AdminDashboardPage:
  --accent    : #C1440E  (terracotta/rust)
  --bg-dark   : #1A1A1A
  --bg-cream  : #F5F0EB
  --stone     : #D6CFC6
  --text-dark : #1A1A1A
  --text-muted: #7A7168
  --white     : #FFFFFF
*/

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const AdminBlogDashboardPage = () => {
    const [blogs, setBlogs]               = useState([]);
    const [isEditing, setIsEditing]       = useState(false);
    const [currentBlog, setCurrentBlog]   = useState({ title: '', content: '', author_name: '', tags: '', status: 'draft', image: null });
    const [searchQuery, setSearchQuery]   = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading]       = useState(true);
    const { logout } = useContext(AuthContext);

    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Start writing your blog…',
        minHeight: 380,
    }), []);

    const fetchBlogs = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await api.get('blogs');
            setBlogs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddOrEditBlog = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title',       currentBlog.title);
        formData.append('content',     currentBlog.content);
        formData.append('author_name', currentBlog.author_name);
        formData.append('tags',        currentBlog.tags);
        formData.append('status',      currentBlog.status);
        if (currentBlog.image instanceof File) formData.append('image', currentBlog.image);

        try {
            if (isEditing) {
                await api.put(`/blogs/${currentBlog.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                alert('Blog updated successfully!');
            } else {
                await api.post('/blogs', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                alert('Blog added successfully!');
            }
            fetchBlogs();
            closeModal();
        } catch (error) {
            console.error('Error adding/editing blog:', error);
            alert('Operation failed. Please check the console.');
        }
    };

    const handleDeleteBlog = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog post?')) return;
        try {
            await api.delete(`/blogs/${id}`);
            alert('Blog deleted successfully!');
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const openModal = (blog = null) => {
        if (blog) {
            setCurrentBlog({ ...blog, image: null });
            setIsEditing(true);
        } else {
            setCurrentBlog({ title: '', content: '', author_name: '', tags: '', status: 'draft', image: null });
            setIsEditing(false);
        }
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setCurrentBlog({ title: '', content: '', author_name: '', tags: '', status: 'draft', image: null });
    };

    /* ── Shared inline-style helpers ───────────────────────────────── */
    const inputBase = {
        width: '100%',
        background: '#FAF7F4',
        border: 'none',
        borderBottom: '1.5px solid #D6CFC6',
        padding: '12px 16px',
        outline: 'none',
        color: '#1A1A1A',
        fontSize: '14px',
        borderRadius: '8px 8px 0 0',
        transition: 'border-color 0.2s',
    };

    const labelBase = {
        display: 'block',
        fontSize: '9px',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: '0.35em',
        color: '#7A7168',
        marginBottom: '8px',
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen flex" style={{ background: '#F5F0EB' }}>

                {/* ══════════════════════════════════════════════════════════
                    SIDEBAR
                ══════════════════════════════════════════════════════════ */}
                <aside
                    className="w-64 hidden lg:flex flex-col fixed h-full z-50"
                    style={{ background: '#1A1A1A' }}
                >
                    {/* Logo */}
                    <div className="px-8 py-10 relative overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <div
                            className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
                            style={{ background: 'radial-gradient(circle, rgba(193,68,14,0.15) 0%, transparent 70%)' }}
                        />
                        <div className="flex items-center gap-3 mb-1">
                            <span
                                className="w-7 h-7 rounded-md flex items-center justify-center text-white text-[10px] font-black shrink-0"
                                style={{ background: '#C1440E' }}
                            >
                                AS
                            </span>
                            <span className="text-lg font-black tracking-tight text-white" style={{ fontFamily: 'Georgia, serif' }}>
                                Assure Sift Relocation
                            </span>
                        </div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.35em] mt-2" style={{ color: '#7A7168' }}>
                            Principal Console
                        </p>
                    </div>

                    {/* Nav */}
                    <nav className="flex-grow px-5 py-8 space-y-2">
                        <Link
                            href="/admin-dashboard"
                            className="flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 hover:bg-white/5"
                            style={{ color: '#7A7168' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                            onMouseLeave={e => e.currentTarget.style.color = '#7A7168'}
                        >
                            <List size={16} /> Orders Management
                        </Link>

                        {/* Active */}
                        <Link
                            href="/admin-blogdashboard"
                            className="flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-bold tracking-wide text-white"
                            style={{ background: '#C1440E', boxShadow: '0 4px 24px rgba(193,68,14,0.35)' }}
                        >
                            <BookOpen size={16} /> Blog Posts
                        </Link>
                    </nav>

                    {/* Logout */}
                    <div className="px-5 py-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <button
                            onClick={logout}
                            className="flex items-center gap-3 w-full px-5 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 hover:bg-[#C1440E]/10"
                            style={{ color: '#C1440E' }}
                        >
                            <LogOut size={16} /> Exit Console
                        </button>
                    </div>
                </aside>

                {/* ══════════════════════════════════════════════════════════
                    MAIN
                ══════════════════════════════════════════════════════════ */}
                <main className="flex-grow lg:ml-64 px-6 py-10 lg:px-14 lg:py-14">
                    <div className="max-w-6xl mx-auto">

                        {/* Page header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2" style={{ color: '#C1440E' }}>
                                    Content Management
                                </p>
                                <h2 className="text-3xl font-black leading-tight" style={{ color: '#1A1A1A', fontFamily: 'Georgia, serif' }}>
                                    Editorial Archives
                                </h2>
                            </div>

                            <div className="flex items-center gap-4 flex-wrap">
                                {/* Search */}
                                <div className="relative group">
                                    <Search
                                        className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200"
                                        size={15}
                                        style={{ color: '#7A7168' }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Search articles…"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 pr-5 py-3 text-sm rounded-xl outline-none transition-all duration-200 w-60"
                                        style={{
                                            background: '#fff',
                                            border: '1.5px solid #D6CFC6',
                                            color: '#1A1A1A',
                                            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                                        }}
                                        onFocus={e  => e.target.style.borderColor = '#C1440E'}
                                        onBlur={e   => e.target.style.borderColor = '#D6CFC6'}
                                    />
                                </div>

                                {/* New article CTA — mirrors site's terracotta button */}
                                <button
                                    onClick={() => openModal()}
                                    className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-[0.3em] px-6 py-3 rounded-xl transition-all duration-200"
                                    style={{
                                        background: '#C1440E',
                                        boxShadow: '0 4px 16px rgba(193,68,14,0.30)',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#A83A0C'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#C1440E'}
                                >
                                    <Plus size={15} /> New Article
                                </button>
                            </div>
                        </div>

                        {/* Table card */}
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
                                            {['Preview', 'Title & Author', 'Status', 'Date', 'Actions'].map((h, i) => (
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

                                    <tbody>
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan="5" className="py-28 text-center">
                                                    <Activity className="animate-spin mx-auto" size={28} style={{ color: '#C1440E' }} />
                                                </td>
                                            </tr>
                                        ) : filteredBlogs.length > 0 ? filteredBlogs.map((blog, idx) => (
                                            <tr
                                                key={blog.id}
                                                className="transition-colors duration-150"
                                                style={{ borderBottom: idx < filteredBlogs.length - 1 ? '1px solid #F0EBE5' : 'none' }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#FBF8F5'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                            >
                                                {/* Preview thumbnail */}
                                                <td className="px-8 py-6">
                                                    {blog.image ? (
                                                        <div
                                                            className="relative w-16 h-16 overflow-hidden rounded-xl"
                                                            style={{ border: '1px solid #E8E2DA' }}
                                                        >
                                                            <Image
                                                                src={`${UPLOAD_BASE}/${blog.image}`}
                                                                alt="Blog"
                                                                fill
                                                                className="object-cover"
                                                                unoptimized
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="w-16 h-16 rounded-xl flex items-center justify-center"
                                                            style={{ background: '#F5F0EB', color: '#D6CFC6' }}
                                                        >
                                                            <ImageIcon size={20} />
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Title & author */}
                                                <td className="px-8 py-6">
                                                    <p
                                                        className="text-sm font-bold leading-tight line-clamp-1 mb-1"
                                                        style={{ color: '#1A1A1A', fontFamily: 'Georgia, serif' }}
                                                    >
                                                        {blog.title}
                                                    </p>
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: '#7A7168' }}>
                                                        By {blog.author_name}
                                                    </p>
                                                </td>

                                                {/* Status badge */}
                                                <td className="px-8 py-6">
                                                    <span
                                                        className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.25em]"
                                                        style={
                                                            blog.status === 'published'
                                                                ? { background: '#ECFDF5', color: '#16A34A', border: '1px solid #BBF7D0' }
                                                                : { background: '#FDF0EB', color: '#C1440E', border: '1px solid rgba(193,68,14,0.2)' }
                                                        }
                                                    >
                                                        {blog.status}
                                                    </span>
                                                </td>

                                                {/* Date */}
                                                <td className="px-8 py-6 text-sm" style={{ color: '#7A7168' }}>
                                                    {new Date(blog.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                                </td>

                                                {/* Actions */}
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        {/* Edit */}
                                                        <button
                                                            onClick={() => openModal(blog)}
                                                            title="Edit"
                                                            className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200"
                                                            style={{ background: '#F5F0EB', color: '#1A1A1A', border: '1px solid #D6CFC6' }}
                                                            onMouseEnter={e => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#1A1A1A'; }}
                                                            onMouseLeave={e => { e.currentTarget.style.background = '#F5F0EB'; e.currentTarget.style.color = '#1A1A1A'; e.currentTarget.style.borderColor = '#D6CFC6'; }}
                                                        >
                                                            <Edit size={15} />
                                                        </button>

                                                        {/* Delete */}
                                                        <button
                                                            onClick={() => handleDeleteBlog(blog.id)}
                                                            title="Delete"
                                                            className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200"
                                                            style={{ background: 'rgba(193,68,14,0.08)', color: '#C1440E', border: '1px solid rgba(193,68,14,0.15)' }}
                                                            onMouseEnter={e => { e.currentTarget.style.background = '#C1440E'; e.currentTarget.style.color = '#fff'; }}
                                                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(193,68,14,0.08)'; e.currentTarget.style.color = '#C1440E'; }}
                                                        >
                                                            <Trash size={15} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="5" className="py-28 text-center">
                                                    <p className="text-lg italic" style={{ color: '#7A7168', fontFamily: 'Georgia, serif' }}>
                                                        No articles found.
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* end table card */}

                    </div>
                </main>

                {/* ══════════════════════════════════════════════════════════
                    MODAL — compose / edit article
                ══════════════════════════════════════════════════════════ */}
                {modalVisible && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 lg:p-8">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 backdrop-blur-sm"
                            style={{ background: 'rgba(26,26,26,0.55)' }}
                            onClick={closeModal}
                        />

                        {/* Panel */}
                        <div
                            className="relative w-full max-w-4xl rounded-3xl overflow-hidden flex flex-col"
                            style={{
                                background: '#FFFFFF',
                                boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
                                maxHeight: '92vh',
                            }}
                        >
                            {/* Modal header — dark, matches sidebar */}
                            <div
                                className="flex items-center justify-between px-10 py-7 shrink-0"
                                style={{ background: '#1A1A1A', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                            >
                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-[0.4em] mb-1" style={{ color: '#C1440E' }}>
                                        {isEditing ? 'Editing Article' : 'New Article'}
                                    </p>
                                    <h2 className="text-xl font-black text-white" style={{ fontFamily: 'Georgia, serif' }}>
                                        {isEditing ? 'Refine Article' : 'Compose New Article'}
                                    </h2>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.35em] transition-colors duration-200 hover:text-white"
                                    style={{ color: '#7A7168' }}
                                >
                                    <ChevronLeft size={14} /> Return
                                </button>
                            </div>

                            {/* Scrollable form body */}
                            <form onSubmit={handleAddOrEditBlog} className="overflow-y-auto px-10 py-10 space-y-8">

                                {/* Row 1: Title + Author */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label style={labelBase}>Article Title</label>
                                        <input
                                            type="text"
                                            value={currentBlog.title}
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                                            required
                                            placeholder="Enter article title"
                                            style={{ ...inputBase, fontSize: '16px', fontFamily: 'Georgia, serif' }}
                                            onFocus={e  => e.target.style.borderBottomColor = '#C1440E'}
                                            onBlur={e   => e.target.style.borderBottomColor = '#D6CFC6'}
                                        />
                                    </div>
                                    <div>
                                        <label style={labelBase}>Author Name</label>
                                        <input
                                            type="text"
                                            value={currentBlog.author_name}
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, author_name: e.target.value })}
                                            required
                                            placeholder="Author designation"
                                            style={inputBase}
                                            onFocus={e  => e.target.style.borderBottomColor = '#C1440E'}
                                            onBlur={e   => e.target.style.borderBottomColor = '#D6CFC6'}
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Rich-text editor */}
                                <div>
                                    <label style={labelBase}>Editorial Content</label>
                                    <div
                                        className="overflow-hidden rounded-2xl"
                                        style={{ border: '1px solid #E8E2DA' }}
                                    >
                                        <JoditEditor
                                            value={currentBlog.content}
                                            config={config}
                                            onBlur={(newContent) => setCurrentBlog({ ...currentBlog, content: newContent })}
                                        />
                                    </div>
                                </div>

                                {/* Row 3: Tags | Status | Image */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div>
                                        <label style={labelBase}>Tags</label>
                                        <input
                                            type="text"
                                            value={currentBlog.tags}
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, tags: e.target.value })}
                                            placeholder="Moving, Logistics…"
                                            style={inputBase}
                                            onFocus={e  => e.target.style.borderBottomColor = '#C1440E'}
                                            onBlur={e   => e.target.style.borderBottomColor = '#D6CFC6'}
                                        />
                                    </div>
                                    <div>
                                        <label style={labelBase}>Visibility State</label>
                                        <select
                                            value={currentBlog.status}
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, status: e.target.value })}
                                            style={{ ...inputBase, cursor: 'pointer', appearance: 'none' }}
                                            onFocus={e  => e.target.style.borderBottomColor = '#C1440E'}
                                            onBlur={e   => e.target.style.borderBottomColor = '#D6CFC6'}
                                        >
                                            <option value="draft">Draft (Archived)</option>
                                            <option value="published">Published (Live)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={labelBase}>Cover Image</label>
                                        <input
                                            type="file"
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, image: e.target.files[0] })}
                                            className="w-full text-xs cursor-pointer"
                                            style={{
                                                color: '#7A7168',
                                                paddingTop: '10px',
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Row 4: Submit / Cancel */}
                                <div
                                    className="flex items-center gap-5 pt-4"
                                    style={{ borderTop: '1px solid #F0EBE5' }}
                                >
                                    <button
                                        type="submit"
                                        className="flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all duration-200"
                                        style={{ background: '#C1440E', boxShadow: '0 4px 16px rgba(193,68,14,0.30)' }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#A83A0C'}
                                        onMouseLeave={e => e.currentTarget.style.background = '#C1440E'}
                                    >
                                        {isEditing ? 'Save Changes' : 'Publish Article'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-200"
                                        style={{ background: '#F5F0EB', color: '#7A7168', border: '1px solid #D6CFC6' }}
                                        onMouseEnter={e => { e.currentTarget.style.color = '#C1440E'; e.currentTarget.style.borderColor = '#C1440E'; }}
                                        onMouseLeave={e => { e.currentTarget.style.color = '#7A7168'; e.currentTarget.style.borderColor = '#D6CFC6'; }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </ProtectedRoute>
    );
};

export default AdminBlogDashboardPage;