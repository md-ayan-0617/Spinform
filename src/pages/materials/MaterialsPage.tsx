import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, X, Sparkles, Sliders, Check } from 'lucide-react';
import { MATERIALS } from '../../data/materialsData';
import { ThreeViewport } from '../../components/three/ThreeViewport';
import { MaterialConfig } from '../../types';
import { useStudioStore } from '../../store/studioStore';

export const MaterialsPage: React.FC = () => {
  const navigate = useNavigate();
  const { setMaterial, setCursor } = useStudioStore();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedMat, setSelectedMat] = useState<MaterialConfig | null>(null);

  const categories = ['ALL', 'METAL', 'GLASS', 'STONE', 'SOFT', 'EXPERIMENTAL'];

  const filtered = activeCategory === 'ALL'
    ? MATERIALS
    : MATERIALS.filter((m) => m.category.toUpperCase() === activeCategory);

  const handleUseInStudio = (mat: MaterialConfig) => {
    setMaterial(mat);
    navigate('/studio');
  };

  return (
    <div
      style={{
        backgroundColor: '#0D0E11',
        color: '#F1EFE9',
        minHeight: '100vh',
        padding: 'calc(var(--header-height) + 48px) clamp(20px, 5vw, 64px) 80px'
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--acid)', letterSpacing: '0.12em', marginBottom: '8px' }}>
            [DIGITAL MATERIAL ARCHIVE]
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '16px', color: '#FFFFFF' }}>
            WHAT SHOULD<br />IT FEEL LIKE?
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '19px', color: 'var(--studio-muted)', maxWidth: '640px', lineHeight: 1.5 }}>
            Every surface rendered across identical reference geometry for objective specular comparison. Optical Snell glass refraction, micro-scratched chrome, brutalist concrete grit, and thin-film prisms.
          </p>
        </div>

        {/* Filter Categories */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '40px',
            flexWrap: 'wrap',
            borderBottom: '1px solid var(--studio-border)',
            paddingBottom: '16px'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 18px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 600,
                backgroundColor: activeCategory === cat ? 'var(--acid)' : 'var(--studio-panel)',
                color: activeCategory === cat ? 'var(--ink)' : 'var(--studio-muted)',
                border: '1px solid var(--studio-border)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Material Wall Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}
        >
          {filtered.map((mat) => (
            <div
              key={mat.id}
              onClick={() => setSelectedMat(mat)}
              style={{
                backgroundColor: 'var(--studio-panel)',
                border: '1px solid var(--studio-border)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                cursor: 'pointer',
                transition: 'border-color 0.18s ease'
              }}
              className="corner-tick material-wall-card"
              onMouseEnter={() => setCursor('apply', mat.color)}
              onMouseLeave={() => setCursor('default')}
            >
              {/* 3D Reference S Shape Canvas */}
              <div
                style={{
                  height: '220px',
                  backgroundColor: '#16171A',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <ThreeViewport
                  geometry={{
                    sourceType: 'preset',
                    presetShape: 'S',
                    textValue: '',
                    depth: 30,
                    bevel: 3,
                    bevelSegments: 3,
                    scale: 1.15,
                    rotation: [0, 0, 0],
                    position: [0, 0, 0]
                  }}
                  material={mat}
                  motion={{
                    preset: 'spin-y',
                    duration: 4,
                    loop: true,
                    direction: 'normal',
                    ease: 'none',
                    speed: 0.8,
                    amplitude: 1,
                    isPlaying: true
                  }}
                  interactive={false}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#FFFFFF' }}>
                    {mat.name}
                  </h3>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: mat.color }} />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--studio-muted)', marginBottom: '8px' }}>
                  ROUGHNESS: {(mat.roughness * 100).toFixed(0)}% • METAL: {(mat.metalness * 100).toFixed(0)}%
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#BFC3C7', lineHeight: 1.4 }}>
                  {mat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Material Detail Modal Inspection */}
      {selectedMat && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setSelectedMat(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '820px',
              backgroundColor: 'var(--studio-panel)',
              border: '1px solid var(--studio-border)',
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              overflow: 'hidden',
              boxShadow: '0 32px 72px rgba(0,0,0,0.8)'
            }}
            className="material-modal-grid"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Viewport Side */}
            <div style={{ height: '420px', backgroundColor: '#16171A', position: 'relative' }}>
              <ThreeViewport
                geometry={{
                  sourceType: 'preset',
                  presetShape: 'S',
                  textValue: '',
                  depth: 34,
                  bevel: 4,
                  bevelSegments: 4,
                  scale: 1.25,
                  rotation: [0, 0, 0],
                  position: [0, 0, 0]
                }}
                material={selectedMat}
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
                  left: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--acid)'
                }}
              >
                INTERACTIVE 360° TURNTABLE
              </div>
            </div>

            {/* Spec Details Side */}
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span className="tech-tag tech-tag-dark" style={{ textTransform: 'uppercase' }}>
                    {selectedMat.category}
                  </span>
                  <button onClick={() => setSelectedMat(null)} style={{ color: 'var(--studio-muted)' }}>
                    <X size={20} />
                  </button>
                </div>

                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#FFFFFF', marginBottom: '8px' }}>
                  {selectedMat.name}
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--studio-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                  {selectedMat.description}
                </p>

                {/* Technical PBR Readouts */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--studio-border)', paddingTop: '16px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    <span style={{ color: 'var(--studio-muted)' }}>Surface Roughness</span>
                    <span style={{ color: 'var(--acid)' }}>{(selectedMat.roughness * 100).toFixed(0)}%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    <span style={{ color: 'var(--studio-muted)' }}>Metallic Conductivity</span>
                    <span style={{ color: 'var(--acid)' }}>{(selectedMat.metalness * 100).toFixed(0)}%</span>
                  </div>
                  {selectedMat.transmission !== undefined && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                      <span style={{ color: 'var(--studio-muted)' }}>Glass Transmission</span>
                      <span style={{ color: 'var(--cyan)' }}>{(selectedMat.transmission * 100).toFixed(0)}%</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    <span style={{ color: 'var(--studio-muted)' }}>Subsurface Microstructure</span>
                    <span style={{ color: '#FFFFFF' }}>{selectedMat.macroLabel || 'Standard PBR'}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleUseInStudio(selectedMat)}
                className="btn-machine"
                style={{ width: '100%', padding: '14px' }}
              >
                <span>APPLY IN STUDIO</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .material-wall-card:hover {
          border-color: var(--acid);
        }
        @media (max-width: 768px) {
          .material-modal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
