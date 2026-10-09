import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, ArrowUpRight, Sliders, RotateCw, Activity } from 'lucide-react';
import { MOTION_PRESETS } from '../../data/motionData';
import { MATERIALS } from '../../data/materialsData';
import { ThreeViewport } from '../../components/three/ThreeViewport';
import { MotionPresetId } from '../../types';
import { useStudioStore } from '../../store/studioStore';

export const MotionPage: React.FC = () => {
  const navigate = useNavigate();
  const { setMotionPreset, setCursor } = useStudioStore();
  const [activePreset, setActivePreset] = useState<MotionPresetId>('spin-y');
  const [speed, setSpeed] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeEasing, setActiveEasing] = useState<'LINEAR' | 'EASE OUT' | 'BACK' | 'ELASTIC'>('BACK');

  const handleUseInStudio = (presetId: MotionPresetId) => {
    setMotionPreset(presetId);
    navigate('/studio');
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--electric-blue)',
        color: '#FFFFFF',
        minHeight: '100vh',
        padding: 'calc(var(--header-height) + 48px) clamp(20px, 5vw, 64px) 80px'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--acid)', letterSpacing: '0.12em', marginBottom: '8px' }}>
            [CHOREOGRAPHIC RUNTIME]
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            EVERYTHING LOOKS<br />BETTER MOVING.
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '20px', maxWidth: '600px', lineHeight: 1.4, opacity: 0.9 }}>
            Except when it doesn't. Choose mathematically balanced kinetic algorithms engineered for continuous loops without boundary stutter.
          </p>
        </div>

        {/* Interactive Sticky Layout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1.3fr',
            gap: '40px',
            alignItems: 'start'
          }}
          className="motion-page-grid"
        >
          {/* Left: Motion Preset Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {MOTION_PRESETS.map((preset) => {
              const isSelected = activePreset === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => setActivePreset(preset.id)}
                  style={{
                    backgroundColor: isSelected ? 'var(--acid)' : 'rgba(0,0,0,0.25)',
                    color: isSelected ? 'var(--ink)' : '#FFFFFF',
                    border: '1px solid rgba(255,255,255,0.2)',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={() => setCursor('play')}
                  onMouseLeave={() => setCursor('default')}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 800 }}>
                      {preset.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', opacity: 0.8, marginTop: '2px' }}>
                      {preset.description}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span
                      style={{
                        padding: '4px 8px',
                        backgroundColor: isSelected ? 'var(--ink)' : 'rgba(255,255,255,0.1)',
                        color: isSelected ? 'var(--acid)' : '#FFFFFF',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        fontWeight: 700
                      }}
                    >
                      {preset.tag}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUseInStudio(preset.id);
                      }}
                      style={{
                        padding: '6px 10px',
                        backgroundColor: isSelected ? 'var(--ink)' : 'var(--acid)',
                        color: isSelected ? '#FFFFFF' : 'var(--ink)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      title="Use in Studio"
                    >
                      USE →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Sticky 3D Preview + Easing Visualizer */}
          <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Viewport Box */}
            <div
              style={{
                height: '400px',
                backgroundColor: '#111111',
                border: '2px solid rgba(255,255,255,0.2)',
                position: 'relative'
              }}
              className="corner-tick"
            >
              <ThreeViewport
                geometry={{
                  sourceType: 'preset',
                  presetShape: 'BOLT',
                  textValue: '',
                  depth: 36,
                  bevel: 4,
                  bevelSegments: 4,
                  scale: 1.25,
                  rotation: [0, 0, 0],
                  position: [0, 0, 0]
                }}
                material={MATERIALS[15]} // Cyber Acid Plastic
                motion={{
                  preset: activePreset,
                  duration: 3,
                  loop: true,
                  direction: 'normal',
                  ease: 'back.out(1.4)',
                  speed: speed,
                  amplitude: 1,
                  isPlaying: isPlaying
                }}
                interactive={true}
                style={{ width: '100%', height: '100%' }}
              />

              {/* Viewport Scrub & Speed Floating Panel */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(22, 23, 26, 0.9)',
                  backdropFilter: 'blur(8px)',
                  padding: '10px 16px',
                  border: '1px solid #36383D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--acid)',
                    fontWeight: 700
                  }}
                >
                  {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                  <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#898C92' }}>SPEED:</span>
                  {[0.5, 1.0, 1.5, 2.0].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      style={{
                        padding: '2px 6px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        backgroundColor: speed === s ? 'var(--acid)' : 'transparent',
                        color: speed === s ? '#111111' : '#FFFFFF',
                        border: '1px solid rgba(255,255,255,0.2)'
                      }}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Easing Visualizer Micro-Tool */}
            <div
              style={{
                backgroundColor: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '20px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={16} color="var(--acid)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700 }}>
                    BEZIER EASING VISUALIZER
                  </span>
                </div>
                <span className="tech-tag tech-tag-dark" style={{ fontSize: '10px' }}>
                  GSAP CUSTOM EASE
                </span>
              </div>

              {/* Curve Selection Tabs */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                {(['LINEAR', 'EASE OUT', 'BACK', 'ELASTIC'] as const).map((curve) => (
                  <button
                    key={curve}
                    onClick={() => setActiveEasing(curve)}
                    style={{
                      padding: '6px 12px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: 700,
                      backgroundColor: activeEasing === curve ? 'var(--acid)' : 'transparent',
                      color: activeEasing === curve ? 'var(--ink)' : '#FFFFFF',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}
                  >
                    {curve}
                  </button>
                ))}
              </div>

              {/* SVG Graphic Bezier Graph */}
              <div
                style={{
                  height: '110px',
                  backgroundColor: '#111111',
                  border: '1px solid #36383D',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 400 110" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="55" x2="400" y2="55" stroke="#222222" strokeDasharray="4 4" />
                  <line x1="200" y1="0" x2="200" y2="110" stroke="#222222" strokeDasharray="4 4" />

                  {/* Bezier Path */}
                  {activeEasing === 'LINEAR' && (
                    <line x1="20" y1="90" x2="380" y2="20" stroke="#D8FF3E" strokeWidth="3" />
                  )}
                  {activeEasing === 'EASE OUT' && (
                    <path d="M 20 90 Q 120 20 380 20" fill="none" stroke="#D8FF3E" strokeWidth="3" />
                  )}
                  {activeEasing === 'BACK' && (
                    <path d="M 20 90 C 140 100 240 5 330 10 C 350 15 370 20 380 20" fill="none" stroke="#D8FF3E" strokeWidth="3" />
                  )}
                  {activeEasing === 'ELASTIC' && (
                    <path d="M 20 90 Q 140 10 200 40 T 280 15 T 380 20" fill="none" stroke="#D8FF3E" strokeWidth="3" />
                  )}
                </svg>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '6px',
                    right: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--acid)'
                  }}
                >
                  CURVE: {activeEasing}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .motion-page-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
