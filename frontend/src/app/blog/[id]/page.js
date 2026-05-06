'use client';

import React, { useState, useEffect, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaChevronLeft, FaCalendarAlt, FaUser, FaTags } from 'react-icons/fa';
import api, { UPLOAD_BASE } from '@/services/api';
import InfoBar from "@/components/Infobar";
import InfoBarMob from "@/components/InfobarMob";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BlogDetailPage = ({ params }) => {
    const { id } = use(params);
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const fetchBlogDetails = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.get(`/blogs/${id}`);
            setBlog(data);
        } catch (err) {
            console.error('Error fetching blog details:', err);
            setError('Failed to load blog details. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchBlogDetails();
    }, [fetchBlogDetails]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <InfoBar />
                <InfoBarMob />
                <Navbar />
                <div className="flex-grow flex flex-col items-center justify-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
                    <p className="text-gray-500 font-bold animate-pulse">Loading article details...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <InfoBar />
                <InfoBarMob />
                <Navbar />
                <div className="flex-grow flex flex-col items-center justify-center p-4">
                    <div className="bg-white p-12 rounded-3xl shadow-xl text-center space-y-6 max-w-md">
                        <div className="text-6xl">⚠️</div>
                        <h2 className="text-2xl font-black text-gray-900">{error || "Article Not Found"}</h2>
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-2 bg-brand text-white px-8 py-3 rounded-xl font-bold transition-all hover:bg-brand-dark"
                        >
                            <FaChevronLeft /> Go Back
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <InfoBar />
            <InfoBarMob />
            <Navbar />
            
            <article className="flex-grow py-12 lg:py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 text-brand font-black uppercase tracking-widest text-xs mb-10 hover:gap-4 transition-all"
                    >
                        <FaChevronLeft /> Back to Insights
                    </button>

                    <div className="space-y-8">
                        <header className="space-y-6 text-center lg:text-left">
                            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-xs font-black uppercase tracking-widest text-brand">
                                <span className="flex items-center gap-2"><FaCalendarAlt /> {new Date(blog.created_at).toLocaleDateString()}</span>
                                <span className="flex items-center gap-2"><FaUser /> By {blog.author_name}</span>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-outfit font-black text-gray-900 leading-tight">
                                {blog.title}
                            </h1>
                        </header>

                        {blog.image ? (
                            <div className="relative h-[300px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                                <img
                                    src={`${UPLOAD_BASE}/${blog.image}`}
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="h-[300px] bg-gray-100 rounded-[2.5rem] flex items-center justify-center text-gray-400 font-bold border-4 border-dashed border-gray-200">
                                No Featured Image
                            </div>
                        )}

                        <div className="bg-white p-8 lg:p-16 rounded-[2.5rem] shadow-xl border border-gray-100 prose prose-lg max-w-none prose-headings:font-outfit prose-headings:font-black prose-p:font-medium prose-p:text-gray-600 prose-p:leading-relaxed">
                            <div
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />
                        </div>

                        <footer className="flex flex-wrap items-center justify-between gap-6 pt-10 border-t border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-brand/10 rounded-xl text-brand"><FaTags /></div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Article Tags</p>
                                    <p className="text-sm font-bold text-gray-700">{blog.tags || 'No Tags'}</p>
                                </div>
                            </div>
                            
                            <div className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                blog.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                            }`}>
                                Status: {blog.status}
                            </div>
                        </footer>
                    </div>
                </div>
            </article>

            <Footer />
        </div>
    );
};

export default BlogDetailPage;
