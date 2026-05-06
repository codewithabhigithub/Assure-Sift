'use client';

import React, { useState, useContext, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FaPlus, FaSearch, FaSignOutAlt, FaEdit, FaTrash, FaImage, FaChevronLeft, FaThList } from 'react-icons/fa';
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

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const data = await api.get('/blogs');
            setBlogs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setIsLoading(false);
        }
    };

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
            <div className="min-h-screen bg-gray-50 flex">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-900 text-white hidden lg:flex flex-col fixed h-full">
                    <div className="p-8 border-b border-gray-800">
                        <h1 className="text-2xl font-outfit font-black text-brand tracking-tighter">SURE SHIFT</h1>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Admin Panel</p>
                    </div>
                    <nav className="flex-grow p-4 space-y-2 mt-4">
                        <Link href="/admin-dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl font-bold transition-all">
                            <FaThList /> Orders Management
                        </Link>
                        <Link href="/admin-blogdashboard" className="flex items-center gap-3 px-4 py-3 bg-brand text-white rounded-xl font-bold transition-all">
                            <FaPlus /> Blog Posts
                        </Link>
                    </nav>
                    <div className="p-4 border-t border-gray-800">
                        <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl font-bold transition-all">
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </aside>

                <main className="flex-grow lg:ml-64 p-4 lg:p-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                            <div>
                                <h2 className="text-3xl font-outfit font-black text-gray-900">Blog Management</h2>
                                <p className="text-gray-500 font-medium mt-1">Create and manage your articles.</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-12 pr-6 py-3 bg-white border border-gray-200 rounded-2xl w-full md:w-[250px] shadow-sm focus:ring-2 focus:ring-brand outline-none"
                                    />
                                </div>
                                <button 
                                    onClick={() => openModal()}
                                    className="bg-brand text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-dark transition-all shadow-lg"
                                >
                                    <FaPlus /> New Post
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        {['Preview', 'Title & Author', 'Status', 'Date', 'Actions'].map((h, i) => (
                                            <th key={i} className="px-6 py-5 text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {isLoading ? (
                                        <tr><td colSpan="5" className="py-20 text-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand mx-auto"></div></td></tr>
                                    ) : filteredBlogs.map((blog) => (
                                        <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-5">
                                                {blog.image ? (
                                                    <img src={`${UPLOAD_BASE}/${blog.image}`} alt="Blog" className="w-16 h-16 rounded-xl object-cover border border-gray-100" />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-gray-300"><FaImage /></div>
                                                )}
                                            </td>
                                            <td className="px-6 py-5">
                                                <p className="text-sm font-bold text-gray-900">{blog.title}</p>
                                                <p className="text-xs text-gray-400 font-medium">By {blog.author_name}</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                    blog.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                                }`}>
                                                    {blog.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-sm font-bold text-gray-500">
                                                {new Date(blog.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex gap-2">
                                                    <button onClick={() => openModal(blog)} className="p-2.5 bg-brand/10 text-brand rounded-xl hover:bg-brand hover:text-white transition-all"><FaEdit /></button>
                                                    <button onClick={() => handleDeleteBlog(blog.id)} className="p-2.5 bg-red-100 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><FaTrash /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>

                {/* Modal */}
                {modalVisible && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={closeModal}></div>
                        <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                            <div className="bg-gray-900 p-8 text-white flex items-center justify-between">
                                <h2 className="text-2xl font-outfit font-black">{isEditing ? 'Edit Article' : 'Create New Article'}</h2>
                                <button onClick={closeModal} className="text-gray-400 hover:text-white"><FaChevronLeft /> Back</button>
                            </div>
                            
                            <form onSubmit={handleAddOrEditBlog} className="p-8 lg:p-12 overflow-y-auto max-h-[70vh] space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest">Article Title</label>
                                        <input
                                            type="text"
                                            value={currentBlog.title}
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                                            required
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest">Author Name</label>
                                        <input
                                            type="text"
                                            value={currentBlog.author_name}
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, author_name: e.target.value })}
                                            required
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest">Article Content</label>
                                    <div className="rounded-2xl overflow-hidden border border-gray-100">
                                        <JoditEditor
                                            value={currentBlog.content}
                                            config={config}
                                            onBlur={(newContent) => setCurrentBlog({ ...currentBlog, content: newContent })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-1">
                                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest">Tags (comma separated)</label>
                                        <input
                                            type="text"
                                            value={currentBlog.tags}
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, tags: e.target.value })}
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest">Publish Status</label>
                                        <select
                                            value={currentBlog.status}
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, status: e.target.value })}
                                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand outline-none"
                                        >
                                            <option value="draft">Draft (Private)</option>
                                            <option value="published">Published (Public)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest">Featured Image</label>
                                        <input
                                            type="file"
                                            onChange={(e) => setCurrentBlog({ ...currentBlog, image: e.target.files[0] })}
                                            className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-brand/10 file:text-brand hover:file:bg-brand hover:file:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-8">
                                    <button type="submit" className="flex-1 bg-brand text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-brand-dark transition-all">Save Article</button>
                                    <button type="button" onClick={closeModal} className="px-8 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all">Cancel</button>
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
