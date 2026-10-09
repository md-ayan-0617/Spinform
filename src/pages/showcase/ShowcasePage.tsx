import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { SHOWCASE_ITEMS } from '../../data/showcaseData';
import { useStudioStore } from '../../store/studioStore';
import { getFallbackImage } from '../../utils/imageFallback';

export const ShowcasePage: React.FC = () => {
  const { setCursor } = useStudioStore();

  return (
    <div
      style={{
        backgroundColor: 'var(--paper)',
        color: 'var(--ink)',
        minHeight: '100vh',
        padding: 'calc(var(--header-height) + 48px) clamp(20px, 5vw, 64px) 80px'
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--machine-orange)', letterSpacing: '0.12em', marginBottom: '8px' }}>
            [COMMUNITY ARCHIVE & EMISSIONS]
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            LOOK WHAT<br />HAPPENED.
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '20px', color: 'var(--graphite)', maxWidth: '640px', lineHeight: 1.4 }}>
            Explore genuine prototypes, runway motion identities, web hero embeds, and packaging models built using the browser-based SPINFORM engine.
          </p>
        </div>

        {/* Varied Proportion Masonry / Asymmetric Editorial Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '32px'
          }}
          className="showcase-masonry"
        >
          {SHOWCASE_ITEMS.map((item, index) => {
            // Asymmetric column spans for dynamic editorial feel
            const colSpan = index % 3 === 0 ? 'span 8' : index % 3 === 1 ? 'span 4' : 'span 6';
            const height = index % 3 === 0 ? '420px' : index % 3 === 1 ? '420px' : '360px';

            return (
              <Link
                key={item.id}
                to={`/showcase/${item.slug}`}
                style={{
                  gridColumn: colSpan,
                  border: '2px solid var(--ink)',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'transform 0.18s ease, box-shadow 0.18s ease'
                }}
                className="showcase-card corner-tick"
                onMouseEnter={() => setCursor('open', item.accentColor)}
                onMouseLeave={() => setCursor('default')}
              >
                {/* Visual Image / Render Container */}
                <div style={{ height, position: 'relative', overflow: 'hidden', backgroundColor: '#111111' }}>
                  <img
                    src={item.image}
                    alt={item.brandName}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                    className="showcase-img"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = getFallbackImage(item.brandName, item.accentColor);
                    }}
                  />

                  {/* Corner Accent Pill */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      backgroundColor: 'rgba(17, 17, 17, 0.85)',
                      padding: '4px 10px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: item.accentColor,
                      border: `1px solid ${item.accentColor}`,
                      fontWeight: 700
                    }}
                  >
                    {item.brandName}
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      backgroundColor: '#FFFFFF',
                      color: '#111111',
                      padding: '6px 12px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>VIEW CASE</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                {/* Details Footer */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--graphite)', fontWeight: 600 }}>
                      {item.creator}
                    </span>
                    <span className="tech-tag" style={{ fontSize: '10px' }}>
                      {item.exportFormat.split('+')[0]}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', lineHeight: 1.1 }}>
                    {item.projectType}
                  </h3>

                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--graphite)', lineHeight: 1.4, marginTop: '4px' }}>
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        .showcase-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: 6px 6px 0px var(--ink);
        }
        .showcase-card:hover .showcase-img {
          transform: scale(1.04);
        }
        @media (max-width: 900px) {
          .showcase-masonry > a {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </div>
  );
};
