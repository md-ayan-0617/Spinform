import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { useStudioStore } from '../../store/studioStore';

interface HeaderProps {
  onOpenMegaMenu: () => void;
  isMegaMenuOpen: boolean;
}

export const GlobalHeader: React.FC<HeaderProps> = ({ onOpenMegaMenu, isMegaMenuOpen }) => {
  const location = useLocation();
  const { soundEnabled, toggleSound, setCursor } = useStudioStore();
  const [oHovered, setOHovered] = useState(false);

  const isStudio = location.pathname.startsWith('/studio');
  const isDarkPage = isStudio || location.pathname === '/materials' || location.pathname === '/contact';

  const navLinks = [
    { label: 'STUDIO', path: '/studio' },
    { label: 'TEMPLATES', path: '/templates' },
    { label: 'MATERIALS', path: '/materials' },
    { label: 'MOTION', path: '/motion' },
    { label: 'SHOWCASE', path: '/showcase' },
    { label: 'LEARN', path: '/learn' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--header-height)',
        backgroundColor: isDarkPage ? 'var(--studio-bg)' : 'var(--paper)',
        color: isDarkPage ? 'var(--studio-text)' : 'var(--ink)',
        borderBottom: isDarkPage ? '1px solid var(--studio-border)' : '1px solid rgba(17, 17, 17, 0.15)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'stretch',
        transition: 'background-color 0.25s ease, color 0.25s ease',
        userSelect: 'none'
      }}
    >
      {/* LEFT: Branded Logo with Rotating Extruded O */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 28px',
          borderRight: isDarkPage ? '1px solid var(--studio-border)' : '1px solid rgba(17, 17, 17, 0.15)',
        }}
      >
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            textDecoration: 'none'
          }}
          onMouseEnter={() => {
            setOHovered(true);
            setCursor('go');
          }}
          onMouseLeave={() => {
            setOHovered(false);
            setCursor('default');
          }}
        >
          <span>SPINF</span>
          {/* Custom Extruded Ring 'O' */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              border: `3px solid ${isDarkPage ? '#D8FF3E' : '#2457FF'}`,
              transform: oHovered ? 'rotateY(32deg) rotateX(15deg) scale(1.15)' : 'rotate(0deg)',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              perspective: '300px',
              margin: '0 1px'
            }}
          />
          <span>RM</span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              marginLeft: '4px',
              color: isDarkPage ? 'var(--acid)' : 'var(--machine-orange)',
              fontWeight: 700
            }}
          >
            ™
          </span>
        </Link>
      </div>

      {/* CENTER: Desktop Navigation */}
      <nav
        style={{
          display: 'none',
          alignItems: 'stretch',
          flex: 1,
        }}
        className="desktop-nav"
      >
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0 22px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: isActive 
                  ? (isDarkPage ? 'var(--acid)' : 'var(--electric-blue)') 
                  : (isDarkPage ? 'var(--studio-muted)' : 'var(--ink)'),
                borderRight: isDarkPage ? '1px solid var(--studio-border)' : '1px solid rgba(17, 17, 17, 0.1)',
                transition: 'color 0.18s ease, background-color 0.18s ease'
              }}
              onMouseEnter={() => setCursor('open')}
              onMouseLeave={() => setCursor('default')}
            >
              {link.label}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: isDarkPage ? 'var(--acid)' : 'var(--electric-blue)'
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* RIGHT: Actions */}
      <div
        style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'stretch'
        }}
      >
        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          title={soundEnabled ? 'Disable Audio FX' : 'Enable Audio FX'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 18px',
            borderLeft: isDarkPage ? '1px solid var(--studio-border)' : '1px solid rgba(17, 17, 17, 0.15)',
            borderRight: isDarkPage ? '1px solid var(--studio-border)' : '1px solid rgba(17, 17, 17, 0.15)',
            color: soundEnabled ? (isDarkPage ? 'var(--acid)' : 'var(--machine-orange)') : 'inherit'
          }}
          onMouseEnter={() => setCursor('adjust')}
          onMouseLeave={() => setCursor('default')}
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>

        {/* Pricing link (desktop) */}
        <Link
          to="/pricing"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0 20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            borderRight: isDarkPage ? '1px solid var(--studio-border)' : '1px solid rgba(17, 17, 17, 0.15)',
          }}
          className="desktop-only-link"
          onMouseEnter={() => setCursor('open')}
          onMouseLeave={() => setCursor('default')}
        >
          PRICING
        </Link>

        {/* Saved Projects link */}
        <Link
          to="/projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0 20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            borderRight: isDarkPage ? '1px solid var(--studio-border)' : '1px solid rgba(17, 17, 17, 0.15)',
          }}
          className="desktop-only-link"
          onMouseEnter={() => setCursor('open')}
          onMouseLeave={() => setCursor('default')}
        >
          PROJECTS
        </Link>

        {/* Studio Primary Action Button */}
        <Link
          to="/studio"
          className="btn-machine"
          style={{
            height: '100%',
            padding: '0 28px',
            fontSize: '12px',
            border: 'none',
            borderLeft: isDarkPage ? '1px solid var(--studio-border)' : '1px solid rgba(17, 17, 17, 0.15)'
          }}
          onMouseEnter={() => setCursor('go')}
          onMouseLeave={() => setCursor('default')}
        >
          <span>OPEN STUDIO</span>
          <ArrowUpRight size={15} />
        </Link>

        {/* Mega Menu Toggle Button */}
        <button
          onClick={onOpenMegaMenu}
          aria-label="Toggle Mega Menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 22px',
            borderLeft: isDarkPage ? '1px solid var(--studio-border)' : '1px solid rgba(17, 17, 17, 0.15)',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 700,
            gap: '8px'
          }}
          onMouseEnter={() => setCursor('open')}
          onMouseLeave={() => setCursor('default')}
        >
          {isMegaMenuOpen ? <X size={18} /> : <Menu size={18} />}
          <span className="desktop-only-text">{isMegaMenuOpen ? 'CLOSE' : 'MENU'}</span>
        </button>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
        }
        @media (max-width: 991px) {
          .desktop-only-link {
            display: none !important;
          }
          .desktop-only-text {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
