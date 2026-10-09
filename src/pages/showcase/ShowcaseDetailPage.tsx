import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Sparkles, Check, Download, Layers } from 'lucide-react';
import { SHOWCASE_ITEMS } from '../../data/showcaseData';
import { MATERIALS } from '../../data/materialsData';
import { useStudioStore } from '../../store/studioStore';
import { getFallbackImage } from '../../utils/imageFallback';

export const ShowcaseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { setMaterial, setMotionPreset, updateGeometry } = useStudioStore();

  const item = SHOWCASE_ITEMS.find((s) => s.slug === slug) || SHOWCASE_ITEMS[0];

  const handleRemix = () => {
    // Determine material to set
    if (item.id === 'noise-fm') setMaterial(MATERIALS[0]); // Chrome
    else if (item.id === 'form-12') setMaterial(MATERIALS[7]); // Glass
    else if (item.id === 'krush') setMaterial(MATERIALS[14]); // Rubber
    else if (item.id === 'mux') setMaterial(MATERIALS[15]); // Hologram
    else if (item.id === 'field') setMaterial(MATERIALS[11]); // Concrete
    else setMaterial(MATERIALS[4]); // Titanium

    // Navigate to studio
    navigate('/studio');
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--paper)',
        color: 'var(--ink)',
        minHeight: '100vh',
        padding: 'calc(var(--header-height) + 40px) clamp(20px, 5vw, 64px) 80px'
      }}
    >
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        {/* Back Link */}
        <Link
          to="/showcase"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 700,
            marginBottom: '32px'
          }}
        >
          <ArrowLeft size={16} />
          <span>BACK TO ALL SHOWCASE PROJECTS</span>
        </Link>

        {/* Hero Banner Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '40px',
            alignItems: 'start',
            marginBottom: '48px'
          }}
          className="showcase-detail-grid"
        >
          {/* Main Visual */}
          <div
            style={{
              border: '2px solid var(--ink)',
              overflow: 'hidden',
              backgroundColor: '#111111',
              boxShadow: '8px 8px 0px var(--ink)',
              height: '480px'
            }}
            className="corner-tick"
          >
            <img
              src={item.image}
              alt={item.brandName}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = getFallbackImage(item.brandName, item.accentColor);
              }}
            />
          </div>

          {/* Metadata Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: item.accentColor,
                  color: '#111111',
                  padding: '4px 10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 800,
                  marginBottom: '12px'
                }}
              >
                {item.brandName}
              </span>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px, 5vw, 64px)', lineHeight: 0.95 }}>
                {item.projectType}
              </h1>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--graphite)', marginTop: '8px' }}>
                CREATOR: <strong>{item.creator}</strong>
              </div>
            </div>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.5, color: 'var(--ink)' }}>
              {item.description}
            </p>

            {/* Spec Matrix Table */}
            <div style={{ border: '1px solid var(--ink)', backgroundColor: '#FFFFFF', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                <span style={{ color: 'var(--graphite)' }}>Material Finish:</span>
                <span style={{ fontWeight: 700 }}>{item.material}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                <span style={{ color: 'var(--graphite)' }}>Choreography:</span>
                <span style={{ fontWeight: 700 }}>{item.motion}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                <span style={{ color: 'var(--graphite)' }}>Export Delivery:</span>
                <span style={{ fontWeight: 700 }}>{item.exportFormat}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                <span style={{ color: 'var(--graphite)' }}>Aspect Target:</span>
                <span style={{ fontWeight: 700 }}>{item.aspect}</span>
              </div>
            </div>

            {/* Behind The Scenes Settings Notes */}
            <div style={{ backgroundColor: 'var(--panel)', padding: '14px', borderLeft: '4px solid var(--electric-blue)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--graphite)', marginBottom: '4px', fontWeight: 700 }}>
                STUDIO SETUP PARAMETERS:
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink)' }}>
                {item.settingsNotes}
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleRemix}
              className="btn-machine"
              style={{ padding: '16px 28px', fontSize: '14px' }}
            >
              <Sparkles size={16} />
              <span>REMIX THIS LOOK IN STUDIO</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .showcase-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
