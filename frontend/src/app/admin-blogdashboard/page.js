'use client';

import React, { useState, useContext, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, LogOut, Edit, Trash, Image as ImageIcon, ChevronLeft, List, Activity } from 'lucide-react';
import api, { UPLOAD_BASE } from '@/services/api';
import { AuthContext } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

// Dynamically import JoditEditor for Next.js SSR compatibility
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const AdminBlogDashboardPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentBlog, setCurrentBlog] = useState({
        title: '',
        content: '',
        author_name: '',
        tags: '',
        status: 'draft',
        image: null,
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { logout } = useContext(AuthContext);

    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Start writing your blog...',
        minHeight: 400
    }), []);

    const fetchBlogs = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await api.get('/blogs');
            setBlogs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddOrEditBlog = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', currentBlog.title);
        formData.append('content', currentBlog.content);
        formData.append('author_name', currentBlog.author_name);
        formData.append('tags', currentBlog.tags);
        formData.append('status', currentBlog.status);
        if (currentBlog.image instanceof File) {
            formData.append('image', currentBlog.image);
        }

        try {
            if (isEditing) {
                await api.put(`/blogs/${currentBlog.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                alert('Blog updated successfully!');
            } else {
                await api.post('/blogs', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
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
            setCurrentBlog({ ...blog, image: null }); // Don't try to send old image path as file
            setIsEditing(true);
        } else {
            setCurrentBlog({
                title: '',
                content: '',
                author_name: '',
                tags: '',
                status: 'draft',
                image: null,
            });
            setIsEditing(false);
        }
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setCurrentBlog({
            title: '', content: '', author_name: '', tags: '', status: 'draft', image: null,
        });
    };

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
                        <Link href="/admin-dashboard" className="flex items-center gap-4 px-6 py-4 text-white/40 hover:bg-white/5 hover:text-white rounded-2xl font-body text-sm tracking-wide transition-premium">
                            <List size={18} /> Orders Management
                        </Link>
                        <Link href="/admin-blogdashboard" className="flex items-center gap-4 px-6 py-4 bg-accent text-white rounded-2xl font-body font-bold text-sm tracking-wide shadow-lg transition-premium">
                            <Plus size={18} /> Blog Posts
                        </Link>
                    </nav>
                    <div className="p-6 border-t border-white/5">
                        <button onClick={logout} className="flex items-center gap-4 w-full px-6 py-4 text-accent/60 hover:bg-accent/10 rounded-2xl font-body font-bold text-sm tracking-wide transition-premium">
                            <LogOut size={18} /> Exit Console
                        </button>
                    </div>
                </aside>

                <main className="flex-grow lg:ml-72 p-10 lg:p-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
                            <div>
                                <span className="subtitle">Content Management</span>
                                <h2 className="text-4xl font-display text-text-dark">Editorial Archives</h2>
                            </div>
                            
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-14 pr-8 py-4 bg-white border border-stone/30 rounded-2xl w-full md:w-[300px] shadow-soft focus:shadow-hover outline-none transition-premium font-body"
                                    />
                                </div>
                                <button 
                                    onClick={() => openModal()}
                                    className="btn-primary py-4 px-8 rounded-2xl flex items-center gap-3 text-[10px] tracking-widest"
                                >
                                    <Plus size={16} /> NEW ARTICLE
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-[40px] shadow-soft border border-stone/10 overflow-hidden">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-stone/5">
                                        {['Preview', 'Title & Author', 'Status', 'Date', 'Actions'].map((h, i) => (
                                            <th key={i} className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted border-b border-stone/20">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone/10 font-body">
                                    {isLoading ? (
                                        <tr><td colSpan="5" className="py-32 text-center"><Activity className="animate-spin text-accent mx-auto" size={32} /></td></tr>
                                    ) : filteredBlogs.map((blog) => (
                                        <tr key={blog.id} className="hover:bg-stone/5 transition-colors group">
                                            <td className="px-10 py-8">
                                                {blog.image ? (
                                                    <div className="relative w-20 h-20 overflow-hidden rounded-2xl border border-stone/20 shadow-soft">
                                                        <Image 
                                                            src={`${UPLOAD_BASE}/${blog.image}`} 
                                                            alt="Blog" 
                                                            fill
                                                            className="object-cover"
                                                            unoptimized
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-20 h-20 rounded-2xl bg-stone/20 flex items-center justify-center text-text-muted"><ImageIcon size={24} /></div>
                                                )}
                                            </td>
                                            <td className="px-10 py-8">
                                                <p className="text-base font-display font-bold text-text-dark line-clamp-1">{blog.title}</p>
                                                <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em] mt-1">By {blog.author_name}</p>
                                            </td>
                                            <td className="px-10 py-8">
                                                <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] ${
                                                    blog.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-accent/5 text-accent'
                                                }`}>
                                                    {blog.status}
                                                </span>
                                            </td>
                                            <td className="px-10 py-8 text-sm font-light text-text-muted">
                                                {new Date(blog.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex gap-4">
                                                    <button onClick={() => openModal(blog)} className="p-3 bg-stone/20 text-text-dark rounded-xl hover:bg-bg-dark hover:text-white transition-premium"><Edit size={18} /></button>
                                                    <button onClick={() => handleDeleteBlog(blog.id)} className="p-3 bg-accent/5 text-accent rounded-xl hover:bg-accent hover:text-white transition-premium"><Trash size={18} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>

                {/* Refined Modal */}
                {modalVisible && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
                        <div className="absolute inset-0 bg-bg-dark/40 backdrop-blur-xl" onClick={closeModal}></div>
                        <div className="relative bg-white w-full max-w-5xl rounded-[60px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500 max-h-[90vh] flex flex-col">
                            <div className="bg-bg-dark p-10 text-white flex items-center justify-between border-b border-white/5">
                                <h2 className="text-3xl font-display font-bold">{isEditing ? 'Refine Article' : 'Compose New Article'}</h2>
                                <button onClick={closeModal} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors"><ChevronLeft size={16} /> Return</button>
                            </div>
                            
                            <form onSubmit={handleAddOrEditBlog} className="p-10 lg:p-16 overflow-y-auto space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-3">
                                        <label className="block text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] px-1">Article Title</label>
                                        <input
                                            type="text"
                                            value={currentBlog.title}
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                                            required
                                            className="w-full bg-stone/5 border-b border-stone/30 px-6 py-4 focus:border-accent outline-none font-display text-xl rounded-t-2xl"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="block text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] px-1">Author Designation</label>
                                        <input
                                            type="text"
                                            value={currentBlog.author_name}
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, author_name: e.target.value })}
                                            required
                                            className="w-full bg-stone/5 border-b border-stone/30 px-6 py-4 focus:border-accent outline-none font-body text-base rounded-t-2xl"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] px-1">Editorial Content</label>
                                    <div className="rounded-[32px] overflow-hidden border border-stone/20 shadow-inner">
                                        <JoditEditor
                                            value={currentBlog.content}
                                            config={config}
                                            onBlur={(newContent) => setCurrentBlog({ ...currentBlog, content: newContent })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                    <div className="space-y-3">
                                        <label className="block text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] px-1">Taxonomy (Tags)</label>
                                        <input
                                            type="text"
                                            value={currentBlog.tags}
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, tags: e.target.value })}
                                            className="w-full bg-stone/5 border-b border-stone/30 px-6 py-4 focus:border-accent outline-none font-body text-sm rounded-t-2xl"
                                            placeholder="Moving, Luxury, Logistics"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="block text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] px-1">Visibility State</label>
                                        <select
                                            value={currentBlog.status}
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, status: e.target.value })}
                                            className="w-full bg-stone/5 border-b border-stone/30 px-6 py-4 focus:border-accent outline-none font-body text-sm rounded-t-2xl appearance-none cursor-pointer"
                                        >
                                            <option value="draft">Draft (Archived)</option>
                                            <option value="published">Published (Live)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="block text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] px-1">Visual Asset</label>
                                        <input
                                            type="file"
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, image: e.target.files[0] })}
                                            className="w-full text-xs text-text-muted file:mr-6 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-[9px] file:font-bold file:uppercase file:tracking-[0.2em] file:bg-accent/10 file:text-accent hover:file:bg-accent hover:file:text-white transition-premium cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-6 pt-12">
                                    <button type="submit" className="flex-1 btn-primary py-6 text-[11px] tracking-[0.3em] uppercase">Commit Changes</button>
                                    <button type="button" onClick={closeModal} className="px-10 text-text-muted hover:text-accent font-bold text-[10px] uppercase tracking-[0.3em] transition-colors">Abort</button>
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
