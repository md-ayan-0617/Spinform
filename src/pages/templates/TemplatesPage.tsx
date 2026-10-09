import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Filter, Sparkles } from 'lucide-react';
import { TEMPLATES } from '../../data/templatesData';
import { MATERIALS } from '../../data/materialsData';
import { ThreeViewport } from '../../components/three/ThreeViewport';
import { useStudioStore } from '../../store/studioStore';

export const TemplatesPage: React.FC = () => {
  const navigate = useNavigate();
  const { loadTemplate, setCursor } = useStudioStore();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = ['ALL', 'METAL', 'SOFT', 'GLASS', 'EXPERIMENTAL', 'MINIMAL'];

  const filtered = activeCategory === 'ALL'
    ? TEMPLATES
    : TEMPLATES.filter((t) => t.category === activeCategory);

  return (
    <div
      style={{
        backgroundColor: 'var(--lavender)',
        color: 'var(--ink)',
        minHeight: '100vh',
        padding: 'calc(var(--header-height) + 48px) clamp(20px, 5vw, 64px) 80px'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '8px' }}>
            [PRESET BLUEPRINTS]
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            DON’T START<br />FROM ZERO.
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '20px', maxWidth: '600px', lineHeight: 1.4 }}>
            Start from something fun. Pick a turnkey material and motion recipe, then replace the geometry with your own emblem in seconds.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '40px',
            flexWrap: 'wrap',
            borderBottom: '2px solid var(--ink)',
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
                fontWeight: 700,
                backgroundColor: activeCategory === cat ? 'var(--ink)' : 'transparent',
                color: activeCategory === cat ? 'var(--lavender)' : 'var(--ink)',
                border: '1px solid var(--ink)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '28px'
          }}
        >
          {filtered.map((item) => {
            const mat = MATERIALS.find((m) => m.id === item.materialId) || MATERIALS[0];
            return (
              <div
                key={item.id}
                onClick={() => {
                  loadTemplate(item);
                  navigate('/studio');
                }}
                style={{
                  border: '2px solid var(--ink)',
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  cursor: 'pointer',
                  transition: 'transform 0.18s ease, box-shadow 0.18s ease'
                }}
                className="corner-tick template-card"
                onMouseEnter={() => {
                  setHoveredId(item.id);
                  setCursor('use', mat.color);
                }}
                onMouseLeave={() => {
                  setHoveredId(null);
                  setCursor('default');
                }}
              >
                {/* 3D Moving Canvas View */}
                <div
                  style={{
                    height: '240px',
                    backgroundColor: '#16171A',
                    border: '1px solid var(--ink)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {hoveredId === item.id ? (
                    <ThreeViewport
                      geometry={{
                        sourceType: 'preset',
                        presetShape: item.shape,
                        textValue: '',
                        depth: 32,
                        bevel: 3,
                        bevelSegments: 3,
                        scale: 1.15,
                        rotation: [0, 0, 0],
                        position: [0, 0, 0]
                      }}
                      material={mat}
                      motion={{
                        preset: item.motionPreset,
                        duration: 3.5,
                        loop: true,
                        direction: 'normal',
                        ease: 'none',
                        speed: 1.2,
                        amplitude: 1,
                        isPlaying: true
                      }}
                      interactive={true}
                      lazy={false}
                      style={{ width: '100%', height: '100%' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        perspective: '500px',
                        background: 'radial-gradient(circle at center, #23272F 0%, #16171A 100%)'
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '64px',
                          fontWeight: 800,
                          color: mat.color,
                          transform: 'rotateY(25deg) rotateX(15deg)',
                          transition: 'transform 0.3s ease',
                          textShadow: '0 4px 16px rgba(0,0,0,0.7)'
                        }}
                      >
                        {item.shape}
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '8px',
                          right: '8px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '9px',
                          color: 'var(--acid)',
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          padding: '2px 6px'
                        }}
                      >
                        HOVER FOR 3D
                      </div>
                    </div>
                  )}

                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: 'var(--acid)',
                      padding: '2px 8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: 600
                    }}
                  >
                    {item.category}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px' }}>
                      {item.title}
                    </h3>
                    <ArrowUpRight size={18} />
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--graphite)', lineHeight: 1.4, marginBottom: '14px' }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {item.tags.map((tag) => (
                      <span key={tag} className="tech-tag" style={{ fontSize: '10px' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .template-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: 6px 6px 0px var(--ink);
        }
      `}</style>
    </div>
  );
};
