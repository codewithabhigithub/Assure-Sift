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

// ─── Inline theme tokens matching the Assure Sift design ───────────────────────
// bg:      #F5F3EF  (warm off-white)
// surface: #FFFFFF
// dark:    #1C1C2E  (deep navy-charcoal)
// muted:   #6B6B80
// accent:  #E8472A  (terracotta-red)
// border:  #E4E0D8
// radius:  12px cards, 6px pills
// ──────────────────────────────────────────────────────────────────────────────

const t = {
    bg:      '#F5F3EF',
    surface: '#FFFFFF',
    dark:    '#1C1C2E',
    muted:   '#6B6B80',
    accent:  '#E8472A',
    accentBg:'#FDF1EE',
    border:  '#E4E0D8',
    radius:  '12px',
};

/* ── Tiny styled primitives (avoids Tailwind conflicts with theme) ─────────── */

const styles = {
    page: {
        minHeight: '100vh',
        backgroundColor: t.bg,
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    },
    article: {
        paddingTop: '140px',
        paddingBottom: '80px',
    },
    container: {
        maxWidth: '860px',
        margin: '0 auto',
        padding: '0 24px',
    },
    backBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        color: t.accent,
        fontWeight: 600,
        fontSize: '13px',
        marginBottom: '40px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0',
        transition: 'gap 0.2s',
        letterSpacing: '0.02em',
    },
    metaRow: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '20px',
    },
    metaChip: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: t.accentBg,
        color: t.accent,
        fontSize: '12px',
        fontWeight: 600,
        padding: '6px 14px',
        borderRadius: '20px',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 'clamp(28px, 5vw, 52px)',
        fontWeight: 700,
        color: t.dark,
        lineHeight: 1.15,
        textAlign: 'center',
        marginBottom: '24px',
        marginTop: '8px',
    },
    divider: {
        width: '56px',
        height: '3px',
        backgroundColor: t.accent,
        borderRadius: '2px',
        margin: '0 auto 40px',
    },
    imageWrap: {
        position: 'relative',
        height: 'clamp(260px, 40vw, 480px)',
        borderRadius: t.radius,
        overflow: 'hidden',
        marginBottom: '36px',
        border: `1px solid ${t.border}`,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    },
    imagePlaceholder: {
        height: '260px',
        backgroundColor: '#EDE9E3',
        borderRadius: t.radius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: t.muted,
        fontSize: '16px',
        fontStyle: 'italic',
        marginBottom: '36px',
        border: `2px dashed ${t.border}`,
    },
    contentCard: {
        backgroundColor: t.surface,
        borderRadius: t.radius,
        padding: 'clamp(28px, 5vw, 56px)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        border: `1px solid ${t.border}`,
        marginBottom: '36px',
        fontSize: '16px',
        lineHeight: 1.85,
        fontWeight: 400,
        color: '#4A4A5A',
    },
    footerRow: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        paddingTop: '28px',
        borderTop: `1px solid ${t.border}`,
    },
    tagBlock: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    tagIcon: {
        width: '40px',
        height: '40px',
        backgroundColor: t.accentBg,
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: t.accent,
        flexShrink: 0,
    },
    tagLabel: {
        fontSize: '11px',
        fontWeight: 600,
        color: t.muted,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: '3px',
    },
    tagValue: {
        fontSize: '15px',
        fontWeight: 600,
        color: t.dark,
    },
    statusPill: (published) => ({
        padding: '6px 18px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        backgroundColor: published ? t.accentBg : '#F0F0F5',
        color: published ? t.accent : t.muted,
        border: published ? `1px solid ${t.accent}40` : `1px solid ${t.border}`,
    }),
    /* Loading / Error screens */
    centered: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '140px',
        gap: '16px',
    },
    loadingText: {
        color: t.muted,
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
    },
    errorCard: {
        backgroundColor: t.surface,
        padding: '56px 48px',
        borderRadius: t.radius,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        textAlign: 'center',
        maxWidth: '460px',
        border: `1px solid ${t.border}`,
    },
    errorTitle: {
        fontSize: '22px',
        fontWeight: 700,
        color: t.dark,
        margin: '20px 0 28px',
    },
    btnPrimary: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: t.accent,
        color: '#fff',
        fontWeight: 600,
        fontSize: '13px',
        letterSpacing: '0.04em',
        padding: '12px 28px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        textTransform: 'uppercase',
        transition: 'background 0.2s, transform 0.15s',
    },
};

// ── Prose styles injected once ────────────────────────────────────────────────
const PROSE_CSS = `
  .blog-prose h1,.blog-prose h2,.blog-prose h3,.blog-prose h4 {
    color: #1C1C2E; font-weight: 700; margin: 1.6em 0 0.5em; line-height: 1.25;
  }
  .blog-prose h1 { font-size: 2em; }
  .blog-prose h2 { font-size: 1.5em; border-bottom: 2px solid #E4E0D8; padding-bottom: 0.3em; }
  .blog-prose h3 { font-size: 1.2em; }
  .blog-prose p  { margin: 0 0 1.25em; }
  .blog-prose a  { color: #E8472A; text-decoration: underline; }
  .blog-prose ul,.blog-prose ol { padding-left: 1.6em; margin: 0 0 1.25em; }
  .blog-prose li { margin-bottom: 0.4em; }
  .blog-prose blockquote {
    border-left: 4px solid #E8472A; margin: 1.5em 0;
    padding: 0.75em 1.25em; background: #FDF1EE; border-radius: 0 8px 8px 0;
    color: #4A4A5A; font-style: italic;
  }
  .blog-prose img { max-width: 100%; border-radius: 8px; margin: 1em 0; }
  .blog-prose pre { background: #1C1C2E; color: #f8f8f2; padding: 1.2em; border-radius: 8px; overflow-x: auto; font-size: 14px; margin: 1.25em 0; }
  .blog-prose code { background: #F0EDE8; color: #C0392B; padding: 2px 6px; border-radius: 4px; font-size: 0.88em; }
  .blog-prose pre code { background: none; color: inherit; padding: 0; }
  .blog-prose hr { border: none; border-top: 1px solid #E4E0D8; margin: 2em 0; }
  .blog-prose table { width: 100%; border-collapse: collapse; margin: 1.25em 0; }
  .blog-prose th { background: #F5F3EF; font-weight: 600; text-align: left; padding: 10px 14px; border-bottom: 2px solid #E4E0D8; }
  .blog-prose td { padding: 10px 14px; border-bottom: 1px solid #E4E0D8; }
`;

// ── Component ─────────────────────────────────────────────────────────────────
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
        const timer = setTimeout(fetchBlogDetails, 0);
        return () => clearTimeout(timer);
    }, [fetchBlogDetails]);

    /* ── Loading ── */
    if (loading) {
        return (
            <main style={{ ...styles.page, display: 'flex', flexDirection: 'column' }}>
                <style>{PROSE_CSS}</style>
                <Navbar />
                <div style={styles.centered}>
                    <Activity
                        size={40}
                        style={{ color: t.accent, animation: 'spin 1s linear infinite' }}
                    />
                    <p style={styles.loadingText}>Loading Article…</p>
                </div>
                <Footer />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </main>
        );
    }

    /* ── Error ── */
    if (error || !blog) {
        return (
            <main style={{ ...styles.page, display: 'flex', flexDirection: 'column' }}>
                <style>{PROSE_CSS}</style>
                <Navbar />
                <div style={{ ...styles.centered, padding: '0 24px' }}>
                    <div style={styles.errorCard}>
                        <AlertTriangle size={48} style={{ color: t.accent, margin: '0 auto' }} />
                        <p style={styles.errorTitle}>{error || 'Article Not Found'}</p>
                        <button
                            style={styles.btnPrimary}
                            onClick={() => router.back()}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#C93D22'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = t.accent}
                        >
                            <ChevronLeft size={15} /> Back to Blog
                        </button>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    /* ── Main ── */
    return (
        <main style={styles.page}>
            <style>{PROSE_CSS}</style>
            <Navbar />

            <article style={styles.article}>
                <div style={styles.container}>
                    <Reveal>
                        {/* Back button */}
                        <button
                            style={styles.backBtn}
                            onClick={() => router.back()}
                            onMouseEnter={e => { e.currentTarget.style.gap = '12px'; }}
                            onMouseLeave={e => { e.currentTarget.style.gap = '6px'; }}
                        >
                            <ChevronLeft size={15} /> Back to Insights
                        </button>

                        {/* Header */}
                        <header style={{ marginBottom: '36px', textAlign: 'center' }}>
                            <div style={styles.metaRow}>
                                <span style={styles.metaChip}>
                                    <Calendar size={12} />
                                    {new Date(blog.created_at).toLocaleDateString('en-IN', {
                                        day: 'numeric', month: 'short', year: 'numeric'
                                    })}
                                </span>
                                <span style={styles.metaChip}>
                                    <User size={12} /> {blog.author_name}
                                </span>
                            </div>

                            <h1 style={styles.title}>{blog.title}</h1>
                            <div style={styles.divider} />
                        </header>

                        {/* Featured image */}
                        {blog.image ? (
                            <div style={styles.imageWrap}>
                                <Image
                                    src={`${UPLOAD_BASE}/${blog.image}`}
                                    alt={blog.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    unoptimized
                                />
                            </div>
                        ) : (
                            <div style={styles.imagePlaceholder}>No image available</div>
                        )}

                        {/* Content */}
                        <div style={styles.contentCard}>
                            <div
                                className="blog-prose"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />
                        </div>

                        {/* Footer meta */}
                        <footer style={styles.footerRow}>
                            <div style={styles.tagBlock}>
                                <div style={styles.tagIcon}>
                                    <Tag size={18} />
                                </div>
                                <div>
                                    <p style={styles.tagLabel}>Category</p>
                                    <p style={styles.tagValue}>{blog.tags || 'General'}</p>
                                </div>
                            </div>

                            <span style={styles.statusPill(blog.status === 'published')}>
                                {blog.status === 'published' ? '● Published' : '● Draft'}
                            </span>
                        </footer>
                    </Reveal>
                </div>
            </article>

            <Footer />
        </main>
    );
};

export default BlogDetailPage;