'use client';

import React, { useState, useEffect, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, Calendar, User, Tag, Activity, AlertTriangle } from 'lucide-react';
import api, { UPLOAD_BASE } from '@/services/api';
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container, Section } from "@/components/common/Layout";
import { Reveal } from "@/components/ui/Reveal";

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
        const timer = setTimeout(() => {
            fetchBlogDetails();
        }, 0);
        return () => clearTimeout(timer);
    }, [fetchBlogDetails]);

    if (loading) {
        return (
            <main className="min-h-screen flex flex-col bg-bg-primary">
                <Navbar />
                <div className="flex-grow flex flex-col items-center justify-center pt-[120px] gap-6">
                    <Activity className="animate-spin text-accent" size={48} />
                    <p className="text-text-muted font-bold tracking-[0.2em] uppercase text-[10px]">Accessing Manuscript...</p>
                </div>
                <Footer />
            </main>
        );
    }

    if (error || !blog) {
        return (
            <main className="min-h-screen flex flex-col bg-bg-primary">
                <Navbar />
                <div className="flex-grow flex flex-col items-center justify-center pt-[120px] p-6">
                    <div className="bg-white p-16 rounded-[60px] shadow-hover text-center space-y-8 max-w-lg border border-stone/20">
                        <AlertTriangle className="text-accent mx-auto" size={64} />
                        <h2 className="text-3xl font-display text-text-dark">{error || "Article Not Found"}</h2>
                        <button
                            onClick={() => router.back()}
                            className="btn-primary py-4 px-10 text-[10px] tracking-[0.2em] uppercase flex items-center gap-3 mx-auto"
                        >
                            <ChevronLeft size={16} /> Return to Archives
                        </button>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-bg-primary">
            <Navbar />
            
            <article className="pt-[160px] pb-32">
                <Container className="max-w-4xl">
                    <Reveal>
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-3 text-accent font-bold uppercase tracking-[0.2em] text-[10px] mb-12 hover:gap-6 transition-all"
                        >
                            <ChevronLeft size={16} /> Back to Insights
                        </button>

                        <div className="space-y-12">
                            <header className="space-y-8 text-center">
                                <div className="flex flex-wrap justify-center items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                                    <span className="flex items-center gap-2"><Calendar size={14} /> {new Date(blog.created_at).toLocaleDateString()}</span>
                                    <span className="flex items-center gap-2"><User size={14} /> By {blog.author_name}</span>
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-display text-text-dark leading-[1.05]">
                                    {blog.title}
                                </h1>
                                <div className="w-20 h-[1px] bg-accent/20 mx-auto"></div>
                            </header>

                            {blog.image ? (
                                <div className="relative h-[400px] md:h-[600px] rounded-[60px] overflow-hidden shadow-hover border border-stone/20">
                                    <Image
                                        src={`${UPLOAD_BASE}/${blog.image}`}
                                        alt={blog.title}
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                        unoptimized
                                    />
                                </div>
                            ) : (
                                <div className="h-[300px] bg-stone/20 rounded-[60px] flex items-center justify-center text-text-muted font-display italic text-2xl border-2 border-dashed border-stone">
                                    Archive Entry
                                </div>
                            )}

                            <div className="bg-white p-12 lg:p-20 rounded-[60px] shadow-soft border border-stone/10 font-body text-lg leading-[1.9] font-light text-text-muted">
                                <div
                                    className="prose-luxury"
                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                />
                            </div>

                            <footer className="flex flex-wrap items-center justify-between gap-10 pt-16 border-t border-stone/30">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-stone/20 rounded-2xl text-accent"><Tag size={20} /></div>
                                    <div>
                                        <p className="text-[9px] font-bold text-text-muted uppercase tracking-[0.3em] mb-1">Article Taxonomy</p>
                                        <p className="text-base font-display font-bold text-text-dark">{blog.tags || 'General'}</p>
                                    </div>
                                </div>
                                
                                <div className={`px-8 py-3 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] ${
                                    blog.status === 'published' ? 'bg-accent/5 text-accent' : 'bg-stone/20 text-text-muted'
                                }`}>
                                    State: {blog.status}
                                </div>
                            </footer>
                        </div>
                    </Reveal>
                </Container>
            </article>

            <Footer />
        </main>
    );
};

export default BlogDetailPage;
