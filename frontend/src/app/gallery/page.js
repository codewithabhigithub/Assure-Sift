'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Grid, Layers } from 'lucide-react';
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/common/Layout";
import { Reveal } from "@/components/ui/Reveal";

// ─── Helper to safely resolve image src from static import or string ──────────
const imgSrc = (mod) => {
  if (!mod) return '';
  if (typeof mod === 'string') return mod;
  if (mod.src) return mod.src;
  if (mod.default) return typeof mod.default === 'string' ? mod.default : mod.default?.src ?? '';
  return '';
};

// ─── Import images (works with Next.js static imports) ───────────────────────
import package1 from '@/assets/package_1.jpeg';
import package2 from '@/assets/package_2.jpeg';
import package3 from '@/assets/package_3.jpeg';
import storage1 from '@/assets/storage_1.jpeg';
import storage2 from '@/assets/storage_2.jpeg';
import storage3 from '@/assets/storage_3.jpeg';
import storage4 from '@/assets/storage_4.jpeg';
import office1 from '@/assets/office_1.jpeg';
import team1 from '@/assets/team_1.jpeg';
import team2 from '@/assets/team_2.jpeg';
import transportation1 from '@/assets/transportation_1.jpeg';
import transportation2 from '@/assets/transportation_2.jpeg';
import home2 from '@/assets/home_2.jpeg';
import home3 from '@/assets/home_3.jpeg';

// ─── Sample gallery data ───────────────────────────────────────────────────────
const SAMPLE_IMAGES = [
  { id: 1,  src: imgSrc(package1),      category: 'Packing',    title: 'Careful Packing',          span: 'tall'   },
  { id: 2,  src: imgSrc(office1),       category: 'Office',     title: 'Office Shifting',           span: 'normal' },
  { id: 3,  src: imgSrc(storage1),      category: 'Storage',    title: 'Safe Storage Facility',     span: 'normal' },
  { id: 4,  src: imgSrc(team1),         category: 'Team',       title: 'Our Expert Team',           span: 'tall'   },
  { id: 5,  src: imgSrc(home2),         category: 'Home Moving',title: 'Living Room Setup',         span: 'wide'   },
  { id: 6,  src: imgSrc(transportation1),category:'Transport',  title: 'Fleet on the Road',         span: 'normal' },
  { id: 7,  src: imgSrc(package2),      category: 'Packing',    title: 'Fragile Item Wrapping',     span: 'normal' },
  { id: 8,  src: imgSrc(office1),       category: 'Office',     title: 'Corporate Relocation',      span: 'tall'   },
  { id: 9,  src: imgSrc(transportation2),category:'Transport',  title: 'Long Distance Move',        span: 'wide'   },
  { id: 10, src: imgSrc(storage2),      category: 'Storage',    title: 'Climate Controlled Units',  span: 'normal' },
  { id: 11, src: imgSrc(home3),         category: 'Home Moving',title: 'Bedroom Relocation',        span: 'normal' },
  { id: 12, src: imgSrc(package3),      category: 'Packing',    title: 'Secure Box Packing',        span: 'wide'   },
  { id: 13, src: imgSrc(storage3),      category: 'Storage',    title: 'Warehouse Storage',         span: 'tall'   },
  { id: 14, src: imgSrc(storage4),      category: 'Storage',    title: 'Organized Storage Space',   span: 'normal' },
  { id: 15, src: imgSrc(team2),         category: 'Team',       title: 'Professional Movers',       span: 'wide'   },
];

const CATEGORIES = ['All', 'Home Moving', 'Office', 'Packing', 'Transport', 'Storage', 'Team'];

// ─── CSS ──────────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Nunito+Sans:wght@300;400;600;700&display=swap');

  .gallery-root { font-family: 'Nunito Sans', sans-serif; }

  /* Masonry grid */
  .gallery-masonry {
    columns: 3;
    column-gap: 20px;
  }
  @media (max-width: 900px)  { .gallery-masonry { columns: 2; } }
  @media (max-width: 560px)  { .gallery-masonry { columns: 1; } }

  .gallery-item {
    break-inside: avoid;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    cursor: pointer;
    display: block;
  }

  .gallery-item img {
    width: 100%;
    display: block;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  .gallery-item.tall   img { height: 480px; }
  .gallery-item.wide   img { height: 280px; }
  .gallery-item.normal img { height: 340px; }

  .gallery-item:hover img { transform: scale(1.06); }

  /* Overlay */
  .gallery-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(26,30,46,0.88) 0%, rgba(26,30,46,0.1) 55%, transparent 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 24px;
  }
  .gallery-item:hover .gallery-overlay { opacity: 1; }

  .overlay-zoom {
    position: absolute; top: 18px; right: 18px;
    width: 40px; height: 40px;
    background: rgba(220,75,56,0.9);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    transform: scale(0.7) rotate(-15deg);
    transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
    backdrop-filter: blur(4px);
  }
  .gallery-item:hover .overlay-zoom {
    transform: scale(1) rotate(0deg);
  }

  /* Filter pills */
  .filter-pill {
    border: 1.5px solid rgba(180,170,160,0.4);
    border-radius: 100px;
    padding: 10px 22px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.25s ease;
    background: transparent;
    color: #7A706A;
    white-space: nowrap;
  }
  .filter-pill:hover { border-color: #DC4B38; color: #DC4B38; }
  .filter-pill.active {
    background: #DC4B38;
    border-color: #DC4B38;
    color: #fff;
    box-shadow: 0 6px 20px rgba(220,75,56,0.3);
  }

  /* Lightbox */
  .lightbox-backdrop {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(14,16,26,0.96);
    backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    animation: lbFadeIn 0.3s ease;
  }
  @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }

  .lightbox-img-wrap {
    position: relative;
    max-width: 90vw;
    max-height: 85vh;
    animation: lbSlideUp 0.35s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  @keyframes lbSlideUp {
    from { opacity:0; transform:translateY(24px) scale(0.97); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }

  .lightbox-img-wrap img {
    max-width: 90vw;
    max-height: 78vh;
    object-fit: contain;
    border-radius: 16px;
    box-shadow: 0 40px 120px rgba(0,0,0,0.7);
    display: block;
  }

  .lb-btn {
    position: fixed;
    top: 50%; transform: translateY(-50%);
    width: 52px; height: 52px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    color: white;
    transition: background 0.2s ease, border-color 0.2s ease;
    backdrop-filter: blur(6px);
  }
  .lb-btn:hover { background: #DC4B38; border-color: #DC4B38; }
  .lb-btn.prev { left: 24px; }
  .lb-btn.next { right: 24px; }

  .lb-close {
    position: fixed; top: 24px; right: 24px;
    width: 48px; height: 48px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    color: white;
    transition: background 0.2s ease;
    backdrop-filter: blur(6px);
  }
  .lb-close:hover { background: #DC4B38; border-color: #DC4B38; }

  .lb-meta {
    text-align: center;
    margin-top: 20px;
    color: rgba(255,255,255,0.6);
  }

  /* Fade-in animation for gallery items */
  .gallery-item { animation: itemFadeIn 0.5s ease both; }
  @keyframes itemFadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Layout toggle buttons */
  .layout-btn {
    width: 40px; height: 40px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    border: 1.5px solid rgba(180,170,160,0.35);
    background: transparent;
    color: #A09890;
    transition: all 0.2s ease;
  }
  .layout-btn.active { background: #DC4B38; border-color: #DC4B38; color: white; }
  .layout-btn:hover:not(.active) { border-color: #DC4B38; color: #DC4B38; }

  /* Uniform grid layout */
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  @media (max-width: 900px) { .gallery-grid { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 560px) { .gallery-grid { grid-template-columns: 1fr; } }

  .gallery-grid .gallery-item img { height: 280px !important; }

  /* Counter badge */
  .count-badge {
    display: inline-flex; align-items: center;
    background: rgba(220,75,56,0.1);
    border: 1px solid rgba(220,75,56,0.25);
    border-radius: 100px;
    padding: 4px 14px;
    color: #DC4B38;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
  }

  /* Hero center fix */
  .hero-reveal-wrapper {
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Shimmer animation */
  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const img = images[index];

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-img-wrap" onClick={e => e.stopPropagation()}>
        <img
          src={img.src}
          alt={img.title}
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="lb-meta">
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '18px', color: 'white',
            display: 'block', marginBottom: '4px',
          }}>
            {img.title}
          </span>
          <span style={{
            fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase', color: '#DC4B38',
          }}>
            {img.category}
          </span>
          <div style={{ marginTop: '10px', fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
            {index + 1} / {images.length}
          </div>
        </div>
      </div>

      <button className="lb-btn prev" onClick={e => { e.stopPropagation(); onPrev(); }}>
        <ChevronLeft size={22} />
      </button>
      <button className="lb-btn next" onClick={e => { e.stopPropagation(); onNext(); }}>
        <ChevronRight size={22} />
      </button>
      <button className="lb-close" onClick={onClose}>
        <X size={20} />
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const GalleryPage = () => {
  const [images]                    = useState(SAMPLE_IMAGES);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIdx, setLightboxIdx]       = useState(null);
  const [layout, setLayout]                 = useState('masonry');
  const [isLoading, setIsLoading]           = useState(false);

  const filtered = activeCategory === 'All'
    ? images
    : images.filter(img => img.category === activeCategory);

  const openLightbox  = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImage = useCallback(() => setLightboxIdx(i => (i - 1 + filtered.length) % filtered.length), [filtered.length]);
  const nextImage = useCallback(() => setLightboxIdx(i => (i + 1) % filtered.length),                  [filtered.length]);

  const handleCategory = (cat) => {
    setIsLoading(true);
    setActiveCategory(cat);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <main className="gallery-root" style={{ minHeight: '100vh', backgroundColor: '#F5F0EB' }}>
      <style>{STYLES}</style>
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section style={{
        backgroundColor: '#F5F0EB',
        paddingTop: '100px',
        paddingBottom: '100px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Decorative orbs */}
        <div style={{
          position: 'absolute', top: '-200px', right: '-200px',
          width: '700px', height: '700px',
          background: 'radial-gradient(circle, rgba(181,72,48,0.07) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-120px', left: '-80px',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(220,75,56,0.07) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        {/* Decorative vertical line */}
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '1px', height: '80px',
          background: 'linear-gradient(to bottom, rgba(220,75,56,0.6), transparent)',
        }} />

        <Container>
          <div className="hero-reveal-wrapper">
            <Reveal>
              <span style={{
                display: 'block', color: '#DC4B38',
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.4em', textTransform: 'uppercase',
                marginBottom: '20px',
              }}>
                Our Work
              </span>
              <h1 style={{
                color: '#1A1E2E',
                fontSize: 'clamp(44px, 8vw, 80px)',
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700, lineHeight: 1.06,
                marginBottom: '24px',
                textAlign: 'center',
              }}>
                A Visual Story of{' '}
                <span style={{ color: '#DC4B38', fontStyle: 'italic' }}>Excellence</span>
              </h1>
              <p style={{
                color: '#1A1E2E',
                fontSize: '16px', fontWeight: 300, lineHeight: 1.75,
                maxWidth: '520px', margin: '0 auto 40px',
                textAlign: 'center',
              }}>
                From careful packing to final placement — witness the precision and care
                that goes into every Assure Sift move.
              </p>

              {/* Live count pill */}
              <div className="count-badge" style={{ margin: '0 auto' }}>
                {images.length} Photos
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Controls Bar ───────────────────────────────────────────────────── */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid rgba(180,170,160,0.2)',
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
      }}>
        <Container>
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px', paddingBottom: '16px',
            gap: '16px', flexWrap: 'wrap',
          }}>
            {/* Category filters */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => handleCategory(cat)}
                >
                  {cat}
                  {cat !== 'All' && (
                    <span style={{ marginLeft: '6px', opacity: 0.6 }}>
                      ({images.filter(i => i.category === cat).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Layout toggle */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className={`layout-btn ${layout === 'masonry' ? 'active' : ''}`}
                onClick={() => setLayout('masonry')}
                title="Masonry layout"
              >
                <Layers size={16} />
              </button>
              <button
                className={`layout-btn ${layout === 'grid' ? 'active' : ''}`}
                onClick={() => setLayout('grid')}
                title="Grid layout"
              >
                <Grid size={16} />
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Gallery Grid ──────────────────────────────────────────────────── */}
      <section style={{ paddingTop: '56px', paddingBottom: '120px' }}>
        <Container>

          {/* Results label */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '32px',
          }}>
            <div>
              <span style={{
                color: '#DC4B38', fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.35em', textTransform: 'uppercase',
                display: 'block', marginBottom: '4px',
              }}>
                {activeCategory === 'All' ? 'Full Collection' : activeCategory}
              </span>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(22px, 3vw, 32px)',
                color: '#2D2926', fontWeight: 700, lineHeight: 1.2,
              }}>
                {filtered.length} {filtered.length === 1 ? 'Photo' : 'Photos'}
              </h2>
            </div>

            <p style={{
              fontSize: '12px', color: '#A09890', fontWeight: 400,
              display: filtered.length > 0 ? 'block' : 'none',
              textAlign: 'right', maxWidth: '160px', lineHeight: 1.5,
            }}>
              Click any photo to view full size
            </p>
          </div>

          {/* Loading shimmer */}
          {isLoading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{
                  borderRadius: '16px', overflow: 'hidden',
                  height: `${[280, 380, 320][i % 3]}px`,
                  background: 'linear-gradient(90deg, #E8E2DC 25%, #F0EAE4 50%, #E8E2DC 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.4s infinite',
                }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '80px', paddingBottom: '80px' }}>
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '24px', fontStyle: 'italic', color: '#A09890',
              }}>
                No photos in this category yet.
              </p>
            </div>
          ) : (
            <div className={layout === 'masonry' ? 'gallery-masonry' : 'gallery-grid'}>
              {filtered.map((img, idx) => (
                <div
                  key={img.id}
                  className={`gallery-item ${layout === 'masonry' ? img.span : ''}`}
                  onClick={() => openLightbox(idx)}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    loading="lazy"
                    onError={e => {
                      // Fallback: hide broken image gracefully
                      e.currentTarget.style.opacity = '0.3';
                    }}
                  />

                  <div className="gallery-overlay">
                    <div className="overlay-zoom">
                      <ZoomIn size={16} color="white" />
                    </div>
                    <span style={{
                      fontSize: '9px', fontWeight: 700, letterSpacing: '0.25em',
                      textTransform: 'uppercase', color: '#DC4B38', marginBottom: '6px',
                      display: 'block',
                    }}>
                      {img.category}
                    </span>
                    <span style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '18px', fontWeight: 700, color: 'white',
                      lineHeight: 1.2,
                    }}>
                      {img.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section style={{
        backgroundColor: '#DC4B38',
        paddingTop: '80px', paddingBottom: '80px',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-60px', left: '-60px',
          width: '300px', height: '300px',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', right: '-80px',
          width: '400px', height: '400px',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <Container>
          <span style={{
            display: 'block', color: 'rgba(255,255,255,0.6)',
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.4em',
            textTransform: 'uppercase', marginBottom: '16px',
          }}>
            Ready to Move?
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(28px, 4vw, 46px)',
            color: '#FFFFFF', fontWeight: 700,
            marginBottom: '12px', lineHeight: 1.15,
          }}>
            Let's Start Your Relocation Journey
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.7)', fontSize: '15px',
            fontWeight: 300, marginBottom: '40px', lineHeight: 1.7,
            maxWidth: '480px', margin: '0 auto 40px',
          }}>
            Join thousands of happy customers who trusted Assure Sift with their move.
          </p>
          <a
            href="/#services"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              backgroundColor: '#FFFFFF',
              color: '#DC4B38',
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              padding: '18px 44px',
              borderRadius: '100px',
              textDecoration: 'none',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 14px 40px rgba(0,0,0,0.22)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
            }}
          >
            Get a Free Quote
          </a>
        </Container>
      </section>

      <Footer />

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {lightboxIdx !== null && (
        <Lightbox
          images={filtered}
          index={lightboxIdx}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </main>
  );
};

export default GalleryPage;