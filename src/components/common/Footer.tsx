import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe, ShieldCheck, Zap } from 'lucide-react';
import { useStudioStore } from '../../store/studioStore';
import { ThreeViewport } from '../three/ThreeViewport';
import { MATERIALS } from '../../data/materialsData';

export const Footer: React.FC = () => {
  const { setCursor } = useStudioStore();
  const [localTime, setLocalTime] = useState('');
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const footerLetters = 'SPINFORM'.split('');

  return (
    <footer
      style={{
        backgroundColor: 'var(--ink)',
        color: 'var(--paper)',
        borderTop: '2px solid rgba(255,255,255,0.1)',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      {/* Top CTA Row */}
      <div
        style={{
          padding: ' clamp(48px, 8vw, 100px) clamp(24px, 5vw, 64px)',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '40px',
          alignItems: 'center'
        }}
        className="footer-top-grid"
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--acid)',
              letterSpacing: '0.12em',
              marginBottom: '16px'
            }}
          >
            END FLAT. START PHYSICAL.
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 7vw, 100px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              marginBottom: '32px'
            }}
          >
            MAKE<br />
            IT<br />
            <span style={{ color: 'var(--electric-blue)' }}>MOVE.</span>
          </h2>

          <Link
            to="/studio"
            className="btn-machine"
            style={{
              backgroundColor: 'var(--acid)',
              color: 'var(--ink)',
              fontSize: '14px',
              padding: '18px 36px'
            }}
            onMouseEnter={() => setCursor('go')}
            onMouseLeave={() => setCursor('default')}
          >
            <span>OPEN STUDIO →</span>
          </Link>
        </div>

        {/* Live Mini 3D Rotating Emblem */}
        <div
          style={{
            height: '280px',
            position: 'relative',
            borderRadius: '4px',
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px dashed rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="corner-tick"
        >
          <ThreeViewport
            geometry={{
              sourceType: 'preset',
              presetShape: 'RING',
              textValue: '',
              depth: 36,
              bevel: 4,
              bevelSegments: 3,
              scale: 1.1,
              rotation: [0, 0, 0],
              position: [0, 0, 0]
            }}
            material={MATERIALS[0]} // Mirror Chrome
            motion={{
              preset: 'spin-y',
              duration: 4,
              loop: true,
              direction: 'normal',
              ease: 'none',
              speed: 1.2,
              amplitude: 1,
              isPlaying: true
            }}
            style={{ width: '100%', height: '100%' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--acid)',
              letterSpacing: '0.08em'
            }}
          >
            DRAG TO INSPECT CHROME RING
          </div>
        </div>
      </div>

      {/* Navigation Columns */}
      <div
        style={{
          padding: '64px clamp(24px, 5vw, 64px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '32px',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
        className="footer-columns-grid"
      >
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--acid)', marginBottom: '20px' }}>
            [01] MAKE
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
            <Link to="/studio">STUDIO</Link>
            <Link to="/templates">TEMPLATES</Link>
            <Link to="/materials">MATERIALS</Link>
            <Link to="/motion">MOTION</Link>
            <Link to="/showcase">SHOWCASE</Link>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--machine-orange)', marginBottom: '20px' }}>
            [02] LEARN
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
            <Link to="/learn">START HERE</Link>
            <Link to="/learn/first-3d-logo">YOUR FIRST 3D LOGO</Link>
            <Link to="/learn/pbr-materials">PBR MATERIALS GUIDE</Link>
            <Link to="/learn/seamless-brand-loops">MOTION EASING</Link>
            <Link to="/learn/web-embeds">WEB EMBED CODES</Link>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--electric-blue)', marginBottom: '20px' }}>
            [03] PLATFORM
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
            <Link to="/about">ABOUT SPINFORM</Link>
            <Link to="/pricing">PRICING TIERS</Link>
            <Link to="/projects">SAVED DRAFTS</Link>
            <Link to="/contact">TECHNICAL SUPPORT</Link>
            <Link to="/404">DEMO 404</Link>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--cyan)', marginBottom: '20px' }}>
            [04] ARCHITECTURE
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--steel)', lineHeight: 1.6, marginBottom: '16px' }}>
            Pure client-side WebGL PBR pipeline. Vector path extrusions, lighting normals, and video loops generated directly on your GPU without cloud upload.
          </p>
          <div className="tech-tag tech-tag-dark" style={{ display: 'inline-flex' }}>
            100% PRIVATE & OFFLINE-READY
          </div>
        </div>
      </div>

      {/* Footer Special Kinetic Typographic Interaction */}
      <div
        style={{
          padding: '40px clamp(24px, 5vw, 64px) 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(54px, 12vw, 190px)',
            fontWeight: 800,
            lineHeight: 0.8,
            letterSpacing: '-0.03em',
            perspective: '600px'
          }}
        >
          {footerLetters.map((char, index) => {
            const isHovered = hoveredLetter === index;
            return (
              <span
                key={index}
                onMouseEnter={() => setHoveredLetter(index)}
                onMouseLeave={() => setHoveredLetter(null)}
                style={{
                  display: 'inline-block',
                  cursor: 'pointer',
                  transform: isHovered 
                    ? 'rotateY(40deg) rotateX(15deg) scale(1.15) translateY(-10px)' 
                    : 'rotateY(0deg) rotateX(0deg)',
                  color: isHovered ? 'var(--acid)' : 'var(--paper)',
                  transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.25s ease',
                  textShadow: isHovered ? '0 10px 30px rgba(216, 255, 62, 0.4)' : 'none'
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>

      {/* Bottom Technical Telemetry Bar */}
      <div
        style={{
          padding: '24px clamp(24px, 5vw, 64px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--steel)'
        }}
      >
        <div>© 2026 SPINFORM™ — BUILT FOR THINGS THAT MOVE.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <span style={{ color: 'var(--acid)' }}>● WEBGL 2.0 ACCELERATED</span>
          <span>GPU RENDER PIPELINE</span>
          <span>LOCAL CLOCK: {localTime || '12:00:00'}</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-top-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-columns-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .footer-columns-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};
