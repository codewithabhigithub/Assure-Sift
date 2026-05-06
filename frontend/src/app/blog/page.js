'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaChevronRight, FaCalendarAlt, FaUser } from 'react-icons/fa';
import api from '@/services/api';
import InfoBar from "@/components/Infobar";
import InfoBarMob from "@/components/InfobarMob";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [visibleBlogs, setVisibleBlogs] = useState(6);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

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

    const loadMoreBlogs = () => setVisibleBlogs(prev => prev + 6);

    const filteredBlogs = blogs.filter(
        (blog) =>
            blog.status === 'published' &&
            blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <InfoBar />
            <InfoBarMob />
            <Navbar />
            
            <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-brand/5 backdrop-blur-[2px]"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl lg:text-6xl font-outfit font-black mb-4">Relocation <span className="text-brand">Insights</span></h1>
                    <p className="text-lg text-gray-400 font-medium max-w-2xl mx-auto">
                        Stay updated with the latest tips, guides, and news from the world of professional moving and logistics.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-7xl py-12">
                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-16 relative">
                    <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search articles by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-8 py-5 bg-white border border-gray-100 rounded-[2rem] shadow-xl focus:ring-2 focus:ring-brand outline-none transition-all-custom font-medium"
                    />
                </div>

                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand"></div>
                        <p className="text-gray-500 font-bold">Loading articles...</p>
                    </div>
                ) : filteredBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredBlogs.slice(0, visibleBlogs).map((blog) => (
                            <div key={blog.id} className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all-custom flex flex-col">
                                <div className="p-8 flex-grow space-y-4">
                                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-brand">
                                        <span className="flex items-center gap-1"><FaCalendarAlt /> {new Date(blog.created_at).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1"><FaUser /> {blog.author_name}</span>
                                    </div>
                                    <h2 className="text-2xl font-outfit font-black text-gray-900 leading-tight line-clamp-2 min-h-[4rem]">
                                        {blog.title}
                                    </h2>
                                    <div
                                        className="text-gray-500 font-medium line-clamp-3 text-sm leading-relaxed"
                                        dangerouslySetInnerHTML={{
                                            __html: blog.content.length <= 150
                                                ? blog.content
                                                : blog.content.slice(0, 150) + '...',
                                        }}
                                    />
                                </div>
                                <div className="px-8 pb-8">
                                    <Link
                                        href={`/blog/${blog.id}`}
                                        className="inline-flex items-center gap-2 text-brand font-black uppercase tracking-widest text-xs hover:gap-4 transition-all"
                                    >
                                        Read Full Article <FaChevronRight />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <p className="text-xl text-gray-400 font-bold">No articles found matching your search.</p>
                    </div>
                )}

                {visibleBlogs < filteredBlogs.length && (
                    <div className="flex justify-center mt-16">
                        <button
                            onClick={loadMoreBlogs}
                            className="bg-brand text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-brand-dark transition-all shadow-lg hover:shadow-xl"
                        >
                            Load More Articles
                        </button>
                    </div>
                )}
            </div>
            
            <Footer />
        </div>
    );
};

export default BlogPage;
