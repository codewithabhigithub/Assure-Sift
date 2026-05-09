'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, Calendar, User, Activity } from 'lucide-react';
import api from '@/services/api';
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container, Section } from "@/components/common/Layout";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";

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
        <main className="min-h-screen bg-bg-primary">
            <Navbar />
            
            {/* Editorial Header */}
            <section className="bg-bg-dark pt-[200px] pb-[120px] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 blur-[160px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <Container className="relative z-10 text-center">
                    <Reveal>
                        <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">Editorial</span>
                        <h1 className="text-6xl lg:text-[88px] font-display leading-[1.05] mb-8">
                            Relocation <span className="text-accent italic font-display">Insights</span>
                        </h1>
                        <p className="text-white/40 text-lg font-body font-light max-w-2xl mx-auto leading-relaxed">
                            Stay updated with the latest tips, guides, and news from the world of professional moving and logistics.
                        </p>
                    </Reveal>
                </Container>
            </section>

            <Section className="pb-32">
                <Container>
                    {/* Refined Search Bar */}
                    <div className="max-w-2xl mx-auto mb-24 relative reveal">
                        <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                        <input
                            type="text"
                            placeholder="Search articles by title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-16 pr-8 py-6 bg-white border border-stone/30 rounded-full shadow-soft focus:shadow-hover outline-none transition-all-custom font-body text-lg"
                        />
                    </div>

                    {isLoading ? (
                        <div className="py-32 flex flex-col items-center justify-center gap-6">
                            <Activity className="animate-spin text-accent" size={48} />
                            <p className="text-text-muted font-bold tracking-[0.2em] uppercase text-xs">Accessing Archives...</p>
                        </div>
                    ) : filteredBlogs.length > 0 ? (
                        <StaggerContainer>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                {filteredBlogs.slice(0, visibleBlogs).map((blog) => (
                                    <StaggerItem key={blog.id}>
                                        <div className="bg-white rounded-[40px] shadow-soft border border-stone/10 overflow-hidden hover:shadow-hover transition-premium flex flex-col h-full group">
                                            <div className="p-12 flex-grow space-y-6">
                                                <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                                                    <span className="flex items-center gap-2"><Calendar size={14} /> {new Date(blog.created_at).toLocaleDateString()}</span>
                                                    <span className="flex items-center gap-2"><User size={14} /> {blog.author_name}</span>
                                                </div>
                                                <h2 className="text-3xl font-display text-text-dark leading-tight group-hover:text-accent transition-colors duration-500 line-clamp-2">
                                                    {blog.title}
                                                </h2>
                                                <div
                                                    className="text-text-muted font-body font-light line-clamp-3 text-base leading-relaxed"
                                                    dangerouslySetInnerHTML={{
                                                        __html: blog.content.length <= 150
                                                            ? blog.content
                                                            : blog.content.slice(0, 150) + '...',
                                                    }}
                                                />
                                            </div>
                                            <div className="px-12 pb-12">
                                                <Link
                                                    href={`/blog/${blog.id}`}
                                                    className="inline-flex items-center gap-3 text-accent font-bold uppercase tracking-[0.2em] text-[10px] hover:gap-6 transition-all"
                                                >
                                                    Read Full Article <ChevronRight size={14} />
                                                </Link>
                                            </div>
                                        </div>
                                    </StaggerItem>
                                ))}
                            </div>
                        </StaggerContainer>
                    ) : (
                        <div className="py-32 text-center reveal">
                            <p className="text-2xl text-text-muted font-display italic">No articles found matching your search.</p>
                        </div>
                    )}

                    {visibleBlogs < filteredBlogs.length && (
                        <div className="flex justify-center mt-24 reveal">
                            <button
                                onClick={loadMoreBlogs}
                                className="btn-primary py-6 px-12"
                            >
                                Load More Articles
                            </button>
                        </div>
                    )}
                </Container>
            </Section>
            
            <Footer />
        </main>
    );
};

export default BlogPage;
