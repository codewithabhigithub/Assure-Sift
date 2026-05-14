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
            const data = await api.get('blogs');
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
        <main style={{ minHeight: '100vh', backgroundColor: '#F5F0EB' }}>
            <Navbar />

            {/* ── Hero Section ── */}
            <section style={{
                backgroundColor: '#F5F0EB',
                paddingTop: '120px',
                paddingBottom: '100px',
                position: 'relative',
                overflow: 'hidden',
                textAlign: 'center',
            }}>
                {/* Glowing orb accents */}
                <div style={{
                    position: 'absolute',
                    top: '-200px',
                    right: '-200px',
                    width: '700px',
                    height: '700px',
                    background: 'radial-gradient(circle, rgba(220,75,56,0.12) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-100px',
                    left: '-100px',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(220,75,56,0.07) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                }} />

                <Container>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        width: '100%',
                    }}>
                        <Reveal>
                            <span style={{
                                display: 'block',
                                color: '#DC4B38',
                                fontSize: '10px',
                                fontWeight: 700,
                                letterSpacing: '0.4em',
                                textTransform: 'uppercase',
                                marginBottom: '20px',
                            }}>
                                Editorial
                            </span>

                            <h1 style={{
                                color: '#1A1E2E',
                                fontSize: 'clamp(48px, 8vw, 84px)',
                                fontFamily: 'var(--font-display, Georgia, serif)',
                                fontWeight: 700,
                                lineHeight: 1.05,
                                marginBottom: '24px',
                                textAlign: 'center',
                            }}>
                                Relocation{' '}
                                <span style={{
                                    color: '#DC4B38',
                                    fontStyle: 'italic',
                                }}>
                                    Insights
                                </span>
                            </h1>

                            <p style={{
                                color: '#1A1E2E',
                                fontSize: '17px',
                                fontWeight: 300,
                                lineHeight: 1.7,
                                maxWidth: '560px',
                                margin: '0 auto',
                                textAlign: 'center',
                            }}>
                                Stay updated with the latest tips, guides, and news from the world of professional moving and logistics.
                            </p>
                        </Reveal>
                    </div>
                </Container>
            </section>

            {/* ── Section Separator ── */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0',
                position: 'relative',
                backgroundColor: '#F5F0EB',
                paddingBottom: '0',
            }}>
                {/* Centered red accent bar */}
                <div style={{
                    width: '64px',
                    height: '3px',
                    backgroundColor: '#DC4B38',
                    borderRadius: '2px',
                    marginBottom: '20px',
                }} />
                {/* Full-width rule with drop shadow to visually ground the divide */}
                <div style={{
                    width: '100%',
                    height: '1px',
                    background: 'linear-gradient(to right, transparent, rgba(180,155,145,0.5) 20%, rgba(180,155,145,0.5) 80%, transparent)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
                }} />
            </div>

            {/* ── Blog Grid Section — slightly deeper warm tone to distinguish ── */}
            <section style={{
                backgroundColor: '#EDE8E2',
                paddingTop: '80px',
                paddingBottom: '120px',
            }}>
                <Container>

                    {/* Search Bar */}
                    <div style={{
                        maxWidth: '600px',
                        margin: '0 auto 80px auto',
                        position: 'relative',
                    }}>
                        <Search style={{
                            position: 'absolute',
                            left: '24px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#A09890',
                            width: '18px',
                            height: '18px',
                        }} />
                        <input
                            type="text"
                            placeholder="Search articles by title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                paddingLeft: '56px',
                                paddingRight: '24px',
                                paddingTop: '20px',
                                paddingBottom: '20px',
                                backgroundColor: '#FFFFFF',
                                border: '1.5px solid rgba(180,170,160,0.35)',
                                borderRadius: '100px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                                outline: 'none',
                                fontSize: '15px',
                                fontWeight: 400,
                                color: '#2D2926',
                                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                                boxSizing: 'border-box',
                            }}
                            onFocus={e => {
                                e.target.style.boxShadow = '0 6px 28px rgba(220,75,56,0.12)';
                                e.target.style.borderColor = 'rgba(220,75,56,0.4)';
                            }}
                            onBlur={e => {
                                e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
                                e.target.style.borderColor = 'rgba(180,170,160,0.35)';
                            }}
                        />
                    </div>

                    {/* Section Label */}
                    {!isLoading && filteredBlogs.length > 0 && (
                        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                            <span style={{
                                display: 'inline-block',
                                color: '#DC4B38',
                                fontSize: '10px',
                                fontWeight: 700,
                                letterSpacing: '0.4em',
                                textTransform: 'uppercase',
                            }}>
                                Our Articles
                            </span>
                            <h2 style={{
                                color: '#2D2926',
                                fontSize: 'clamp(28px, 4vw, 42px)',
                                fontFamily: 'var(--font-display, Georgia, serif)',
                                fontWeight: 700,
                                marginTop: '12px',
                                lineHeight: 1.2,
                            }}>
                                Latest from the Blog
                            </h2>
                        </div>
                    )}

                    {/* Loading state */}
                    {isLoading ? (
                        <div style={{
                            paddingTop: '100px',
                            paddingBottom: '100px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '20px',
                        }}>
                            <Activity style={{ color: '#DC4B38', animation: 'spin 1s linear infinite', width: '40px', height: '40px' }} />
                            <p style={{
                                color: '#A09890',
                                fontSize: '10px',
                                fontWeight: 700,
                                letterSpacing: '0.25em',
                                textTransform: 'uppercase',
                            }}>
                                Accessing Archives...
                            </p>
                            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                        </div>

                    ) : filteredBlogs.length > 0 ? (
                        <StaggerContainer>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                gap: '28px',
                            }}>
                                {filteredBlogs.slice(0, visibleBlogs).map((blog) => (
                                    <StaggerItem key={blog.id}>
                                        <article style={{
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: '20px',
                                            border: '1px solid rgba(180,170,160,0.2)',
                                            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                            transition: 'box-shadow 0.35s ease, transform 0.35s ease',
                                            cursor: 'default',
                                        }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.boxShadow = '0 12px 48px rgba(0,0,0,0.13)';
                                                e.currentTarget.style.transform = 'translateY(-4px)';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }}
                                        >
                                            <div style={{ padding: '36px 36px 24px', flexGrow: 1 }}>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '20px',
                                                    marginBottom: '18px',
                                                }}>
                                                    <span style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        color: '#DC4B38',
                                                        fontSize: '10px',
                                                        fontWeight: 700,
                                                        letterSpacing: '0.15em',
                                                        textTransform: 'uppercase',
                                                    }}>
                                                        <Calendar size={12} />
                                                        {new Date(blog.created_at).toLocaleDateString('en-IN', {
                                                            day: 'numeric', month: 'short', year: 'numeric',
                                                        })}
                                                    </span>
                                                    <span style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        color: '#A09890',
                                                        fontSize: '10px',
                                                        fontWeight: 700,
                                                        letterSpacing: '0.15em',
                                                        textTransform: 'uppercase',
                                                    }}>
                                                        <User size={12} />
                                                        {blog.author_name}
                                                    </span>
                                                </div>

                                                <h2 style={{
                                                    color: '#2D2926',
                                                    fontSize: '22px',
                                                    fontFamily: 'var(--font-display, Georgia, serif)',
                                                    fontWeight: 700,
                                                    lineHeight: 1.35,
                                                    marginBottom: '14px',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    transition: 'color 0.3s',
                                                }}>
                                                    {blog.title}
                                                </h2>

                                                <div
                                                    style={{
                                                        color: '#7A706A',
                                                        fontSize: '14px',
                                                        fontWeight: 300,
                                                        lineHeight: 1.75,
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                    }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: blog.content.length <= 150
                                                            ? blog.content
                                                            : blog.content.slice(0, 150) + '...',
                                                    }}
                                                />
                                            </div>

                                            <div style={{
                                                height: '1px',
                                                backgroundColor: 'rgba(180,170,160,0.18)',
                                                margin: '0 36px',
                                            }} />

                                            <div style={{ padding: '20px 36px 28px' }}>
                                                <Link
                                                    href={`/blog/${blog.id}`}
                                                    style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        color: '#DC4B38',
                                                        fontSize: '11px',
                                                        fontWeight: 700,
                                                        letterSpacing: '0.2em',
                                                        textTransform: 'uppercase',
                                                        textDecoration: 'none',
                                                        transition: 'gap 0.3s ease',
                                                    }}
                                                    onMouseEnter={e => e.currentTarget.style.gap = '14px'}
                                                    onMouseLeave={e => e.currentTarget.style.gap = '8px'}
                                                >
                                                    Read Full Article <ChevronRight size={13} />
                                                </Link>
                                            </div>
                                        </article>
                                    </StaggerItem>
                                ))}
                            </div>
                        </StaggerContainer>

                    ) : (
                        <div style={{
                            paddingTop: '100px',
                            paddingBottom: '100px',
                            textAlign: 'center',
                        }}>
                            <p style={{
                                color: '#A09890',
                                fontSize: '24px',
                                fontFamily: 'var(--font-display, Georgia, serif)',
                                fontStyle: 'italic',
                            }}>
                                No articles found matching your search.
                            </p>
                        </div>
                    )}

                    {/* Load More */}
                    {visibleBlogs < filteredBlogs.length && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '72px',
                        }}>
                            <button
                                onClick={loadMoreBlogs}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    backgroundColor: '#DC4B38',
                                    color: '#FFFFFF',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    border: 'none',
                                    borderRadius: '100px',
                                    padding: '20px 48px',
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 30px rgba(220,75,56,0.3)',
                                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.backgroundColor = '#C23E2C';
                                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(220,75,56,0.4)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.backgroundColor = '#DC4B38';
                                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(220,75,56,0.3)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                Load More Articles
                            </button>
                        </div>
                    )}
                </Container>
            </section>

            <Footer />
        </main>
    );
};

export default BlogPage;