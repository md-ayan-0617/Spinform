import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Cpu, Layers, Disc, Sparkles } from 'lucide-react';
import { useStudioStore } from '../../store/studioStore';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const [hoveredIdx, setHoveredIdx] = useState(0);
  const { setCursor, soundEnabled } = useStudioStore();

  const menuItems = [
    {
      idx: '01',
      title: 'STUDIO',
      path: '/studio',
      desc: 'The real-time 3D brand extruder & viewport',
      previewType: 'studio',
      accent: '#2457FF'
    },
    {
      idx: '02',
      title: 'TEMPLATES',
      path: '/templates',
      desc: 'Turnkey material and motion configurations',
      previewType: 'templates',
      accent: '#A88CFF'
    },
    {
      idx: '03',
      title: 'MATERIALS',
      path: '/materials',
      desc: 'PBR library: chrome, clay, glass, rubber, concrete',
      previewType: 'materials',
      accent: '#D8FF3E'
    },
    {
      idx: '04',
      title: 'MOTION',
      path: '/motion',
      desc: 'Kinetic animation engine & custom easing graphs',
      previewType: 'motion',
      accent: '#FF5B2D'
    },
    {
      idx: '05',
      title: 'SHOWCASE',
      path: '/showcase',
      desc: 'Independent brand identities and live embeds',
      previewType: 'showcase',
      accent: '#63E6E2'
    },
    {
      idx: '06',
      title: 'LEARN',
      path: '/learn',
      desc: 'Manuals, tutorials, and vector extrusion guides',
      previewType: 'learn',
      accent: '#FF5B2D'
    },
    {
      idx: '07',
      title: 'PRICING',
      path: '/pricing',
      desc: 'Free tier, creator license, and studio studio exports',
      previewType: 'pricing',
      accent: '#D8FF3E'
    },
    {
      idx: '08',
      title: 'ABOUT',
      path: '/about',
      desc: 'The blueprint philosophy behind real-time 3D',
      previewType: 'about',
      accent: '#2457FF'
    },
    {
      idx: '09',
      title: 'CONTACT',
      path: '/contact',
      desc: 'Technical support, bug reports, and licensing',
      previewType: 'contact',
      accent: '#63E6E2'
    },
    {
      idx: '10',
      title: 'SAVED PROJECTS',
      path: '/projects',
      desc: 'Local browser drafts saved in IndexedDB',
      previewType: 'projects',
      accent: '#BFC3C7'
    }
  ];

  if (!isOpen) return null;

  const currentActive = menuItems[hoveredIdx] || menuItems[0];

  return (
    <div
      style={{
        position: 'fixed',
        top: 'var(--header-height)',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(22, 23, 26, 0.98)',
        backdropFilter: 'blur(16px)',
        zIndex: 999,
        display: 'flex',
        color: '#F1EFE9',
        overflow: 'hidden',
        animation: 'fadeIn 0.25s ease'
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1.3fr 0.9fr',
          width: '100%',
          height: '100%',
          borderTop: '1px solid #36383D'
        }}
        className="megamenu-grid"
      >
        {/* LEFT COLUMN: Navigation Links */}
        <div
          style={{
            borderRight: '1px solid #36383D',
            padding: '36px 40px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#898C92',
              letterSpacing: '0.12em',
              marginBottom: '16px'
            }}
          >
            SYSTEM MODULE NAVIGATION
          </div>

          {menuItems.map((item, index) => {
            const isHovered = hoveredIdx === index;
            return (
              <Link
                key={item.idx}
                to={item.path}
                onClick={onClose}
                onMouseEnter={() => {
                  setHoveredIdx(index);
                  setCursor('open', item.accent);
                }}
                onMouseLeave={() => setCursor('default')}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '18px',
                  padding: '10px 14px',
                  backgroundColor: isHovered ? '#202226' : 'transparent',
                  borderLeft: `3px solid ${isHovered ? item.accent : 'transparent'}`,
                  transition: 'background-color 0.15s ease, border-left 0.15s ease'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: isHovered ? item.accent : '#898C92',
                    fontWeight: 600
                  }}
                >
                  {item.idx}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(20px, 2.5vw, 32px)',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    color: isHovered ? '#FFFFFF' : '#D1D3D8'
                  }}
                >
                  {item.title}
                </span>
                <ArrowUpRight
                  size={16}
                  style={{
                    marginLeft: 'auto',
                    opacity: isHovered ? 1 : 0.2,
                    transform: isHovered ? 'translate(2px, -2px)' : 'none',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                    color: item.accent
                  }}
                />
              </Link>
            );
          })}
        </div>

        {/* MIDDLE COLUMN: Dynamic Visual Preview */}
        <div
          style={{
            borderRight: '1px solid #36383D',
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            backgroundColor: '#16171A'
          }}
          className="megamenu-middle"
        >
          {/* Decorative Blueprint Corner Ticks */}
          <div className="corner-tick" style={{ position: 'absolute', inset: '24px', pointerEvents: 'none', border: '1px dashed #36383D' }} />

          <div
            style={{
              position: 'relative',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              border: `2px solid ${currentActive.accent}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#202226',
              boxShadow: `0 0 50px ${currentActive.accent}22`,
              perspective: '600px'
            }}
          >
            {/* Visual Icon / Monogram Animation */}
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '110px',
                fontWeight: 800,
                color: currentActive.accent,
                transform: 'rotateY(25deg) rotateX(10deg)',
                animation: 'spinSlow 12s linear infinite'
              }}
            >
              {currentActive.title[0]}
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '-12px',
                backgroundColor: '#111111',
                padding: '4px 14px',
                border: '1px solid #36383D',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: currentActive.accent,
                fontWeight: 600
              }}
            >
              ACTIVE PREVIEW
            </div>
          </div>

          <div
            style={{
              marginTop: '36px',
              textAlign: 'center',
              maxWidth: '340px'
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                color: '#FFFFFF',
                marginBottom: '8px'
              }}
            >
              {currentActive.title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: '#898C92',
                lineHeight: 1.5
              }}
            >
              {currentActive.desc}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Studio Telemetry & System Status */}
        <div
          style={{
            padding: '36px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#1B1D20'
          }}
          className="megamenu-telemetry"
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#898C92',
                letterSpacing: '0.12em',
                marginBottom: '24px'
              }}
            >
              ENGINE TELEMETRY
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #36383D', paddingBottom: '10px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#898C92' }}>WebGL 2.0</span>
                <span className="tech-tag tech-tag-dark" style={{ color: '#D8FF3E' }}>HARDWARE ACCEL</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #36383D', paddingBottom: '10px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#898C92' }}>PBR Shaders</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#F1EFE9' }}>MeshPhysical 4.2</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #36383D', paddingBottom: '10px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#898C92' }}>Local Privacy</span>
                <span className="tech-tag tech-tag-dark" style={{ color: '#63E6E2' }}>LOCAL BROWSER ONLY</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #36383D', paddingBottom: '10px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#898C92' }}>Synthesizer Audio</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: soundEnabled ? '#D8FF3E' : '#898C92' }}>
                  {soundEnabled ? 'ACTIVE (WEBAUDIO)' : 'MUTED'}
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '20px',
              backgroundColor: '#202226',
              border: '1px solid #36383D',
              marginTop: '24px'
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#D8FF3E', marginBottom: '6px' }}>
              QUICK COMMAND
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#898C92' }}>
              Press <kbd style={{ background: '#36383D', padding: '2px 6px', borderRadius: '3px', color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>Ctrl + K</kbd> anywhere to open the Studio Command Palette.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 991px) {
          .megamenu-grid {
            grid-template-columns: 1fr !important;
          }
          .megamenu-middle, .megamenu-telemetry {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
