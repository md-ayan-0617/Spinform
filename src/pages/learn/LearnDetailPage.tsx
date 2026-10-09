import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Clock, Signal, Lightbulb, Keyboard } from 'lucide-react';
import { TUTORIALS } from '../../data/learnData';
import { ThreeViewport } from '../../components/three/ThreeViewport';
import { MATERIALS } from '../../data/materialsData';

export const LearnDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const tutorial = TUTORIALS.find((t) => t.slug === slug) || TUTORIALS[0];

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
          to="/learn"
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
          <span>BACK TO ALL TUTORIALS</span>
        </Link>

        {/* Layout Grid with Sticky TOC */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 300px',
            gap: '48px',
            alignItems: 'start'
          }}
          className="learn-article-grid"
        >
          {/* Main Article Content */}
          <div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
              <span className="tech-tag">{tutorial.category}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--graphite)' }}>
                {tutorial.duration} • {tutorial.difficulty.toUpperCase()}
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 0.95, marginBottom: '20px' }}>
              {tutorial.title}
            </h1>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--graphite)', lineHeight: 1.5, marginBottom: '36px' }}>
              {tutorial.summary}
            </p>

            {/* Embedded Live 3D Interactive Demonstration */}
            <div
              style={{
                height: '340px',
                backgroundColor: '#16171A',
                border: '2px solid var(--ink)',
                marginBottom: '40px',
                position: 'relative'
              }}
              className="corner-tick"
            >
              <ThreeViewport
                geometry={{
                  sourceType: 'preset',
                  presetShape: 'S',
                  textValue: '',
                  depth: 32,
                  bevel: 4,
                  bevelSegments: 4,
                  scale: 1.15,
                  rotation: [0, 0, 0],
                  position: [0, 0, 0]
                }}
                material={MATERIALS[0]} // Chrome
                motion={{
                  preset: 'spin-y',
                  duration: 4,
                  loop: true,
                  direction: 'normal',
                  ease: 'none',
                  speed: 0.9,
                  amplitude: 1,
                  isPlaying: true
                }}
                interactive={true}
                style={{ width: '100%', height: '100%' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  padding: '4px 10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--acid)'
                }}
              >
                INTERACTIVE SANDBOX
              </div>
            </div>

            {/* Steps Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {tutorial.steps.map((step, idx) => (
                <div
                  key={idx}
                  id={`step-${idx + 1}`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--ink)',
                    padding: '28px'
                  }}
                  className="corner-tick"
                >
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', marginBottom: '12px' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.6, color: 'var(--graphite)' }}>
                    {step.content}
                  </p>

                  {step.tip && (
                    <div
                      style={{
                        marginTop: '16px',
                        padding: '12px 16px',
                        backgroundColor: 'var(--panel)',
                        borderLeft: '4px solid var(--machine-orange)',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'flex-start'
                      }}
                    >
                      <Lightbulb size={18} color="var(--machine-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink)' }}>
                        <strong>PRO TIP:</strong> {step.tip}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Keyboard Shortcuts Reference */}
            <div style={{ marginTop: '48px', border: '1px solid var(--ink)', padding: '24px', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Keyboard size={18} color="var(--electric-blue)" />
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700 }}>
                  STUDIO SHORTCUTS CHEATSHEET
                </h4>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                <div><kbd style={{ background: 'var(--panel)', padding: '2px 6px', border: '1px solid var(--ink)' }}>Ctrl + K</kbd> Command Palette</div>
                <div><kbd style={{ background: 'var(--panel)', padding: '2px 6px', border: '1px solid var(--ink)' }}>R</kbd> Reset Camera Framing</div>
                <div><kbd style={{ background: 'var(--panel)', padding: '2px 6px', border: '1px solid var(--ink)' }}>Space</kbd> Play / Pause Kinetic Loop</div>
                <div><kbd style={{ background: 'var(--panel)', padding: '2px 6px', border: '1px solid var(--ink)' }}>⌘ + E</kbd> Open Export Dispatch</div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (Table of Contents & Studio Jump CTA) */}
          <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* TOC Card */}
            <div style={{ border: '1px solid var(--ink)', backgroundColor: '#FFFFFF', padding: '20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--machine-orange)', fontWeight: 700, marginBottom: '12px' }}>
                ON THIS PAGE
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                {tutorial.steps.map((st, i) => (
                  <a
                    key={i}
                    href={`#step-${i + 1}`}
                    style={{ color: 'var(--ink)', textDecoration: 'none' }}
                  >
                    {st.title.split('. ')[1] || st.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Launch Studio CTA */}
            <div style={{ border: '2px solid var(--ink)', backgroundColor: 'var(--acid)', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
                TRY IT IN STUDIO
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', marginBottom: '16px', lineHeight: 1.4 }}>
                Open the interactive editor and apply these techniques directly to your vector artwork.
              </p>
              <Link to="/studio" className="btn-machine" style={{ backgroundColor: 'var(--ink)', color: 'var(--acid)', width: '100%' }}>
                <span>OPEN STUDIO →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .learn-article-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
