import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Zap, Shield, Cpu, Sparkles, Check, X } from 'lucide-react';
import { useStudioStore } from '../../store/studioStore';

export const AboutPage: React.FC = () => {
  const { setCursor } = useStudioStore();

  const principles = [
    {
      num: '01',
      title: 'REAL-TIME FIRST.',
      desc: 'No "Rendering: Frame 12 of 300" progress bars. You tweak a bevel, it moves. You switch to liquid chrome, the reflections calculate in 16 milliseconds.'
    },
    {
      num: '02',
      title: 'THE PREVIEW IS THE PRODUCT.',
      desc: 'What you manipulate on your display is the literal WebGL canvas payload that gets dispatched to your video file or production web embed.'
    },
    {
      num: '03',
      title: 'NO 47-MINUTE TUTORIAL REQUIRED.',
      desc: 'Traditional 3D applications are wonderful, but you shouldn\'t need to learn inverse kinematics, unwrapped UV islands, and node compositor spaghetti just to make a brandmark spin.'
    },
    {
      num: '04',
      title: 'POWER WHEN YOU NEED IT.',
      desc: 'Three simple sliders if you want a quick spin. Thirty precision mathematical parameters if you want custom Snell IOR refractive index and Bezier spring overshoots.'
    },
    {
      num: '05',
      title: 'YOUR FILE SHOULD STAY YOURS.',
      desc: 'Your vector emblems, confidential typography, and client marks never leave your machine. The entire extrusion engine compiles locally inside your browser.'
    }
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--electric-blue)',
        color: '#FFFFFF',
        minHeight: '100vh',
        padding: 'calc(var(--header-height) + 48px) clamp(20px, 5vw, 64px) 100px'
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--acid)', letterSpacing: '0.12em', marginBottom: '8px' }}>
            [SYSTEM BLUEPRINT MANIFESTO]
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            WE WANTED 3D MOTION<br />
            WITHOUT THE 3D SOFTWARE.
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '20px', maxWidth: '680px', lineHeight: 1.5, opacity: 0.9 }}>
            For decades, turning a 2D logo into a dimensional tactile object required opening heavy industrial modeling suites, fighting coordinate bugs, and waiting on raytracers. SPINFORM changes the physics.
          </p>
        </div>

        {/* Workflow Comparison Diagram (Complexity Crossed Out) */}
        <div
          style={{
            backgroundColor: '#111111',
            border: '2px solid var(--ink)',
            padding: 'clamp(28px, 5vw, 48px)',
            marginBottom: '72px'
          }}
          className="corner-tick"
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--acid)', marginBottom: '24px' }}>
            WORKFLOW ARCHITECTURE COMPARISON
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '40px'
            }}
            className="about-comparison-grid"
          >
            {/* The Old Way (Crossed Out) */}
            <div style={{ border: '1px dashed #36383D', padding: '24px', position: 'relative', opacity: 0.7 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--machine-orange)', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, marginBottom: '16px' }}>
                <X size={16} />
                <span>TRADITIONAL 3D PIPELINE</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#A9A69D', textDecoration: 'line-through' }}>
                <div>01. Vector Logo Export</div>
                <div>02. Heavy Desktop Software Install</div>
                <div>03. Curve Cleanup & Spline Welding</div>
                <div>04. Complex Node Shader Graphs</div>
                <div>05. Lighting Setup & Shadow Bounces</div>
                <div>06. Timeline Dope Sheet Keyframing</div>
                <div>07. Multi-hour CPU/GPU Video Render</div>
                <div>08. Premiere / After Effects Alpha Composite</div>
              </div>
            </div>

            {/* The SPINFORM Way */}
            <div style={{ border: '2px solid var(--acid)', padding: '24px', backgroundColor: '#1A1C20' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--acid)', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 800, marginBottom: '16px' }}>
                <Check size={16} />
                <span>SPINFORM IMMEDIATE PIPELINE</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#FFFFFF', fontWeight: 600 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--acid)' }}>→</span>
                  <span>1. Drop Any SVG or Type Text</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--acid)' }}>→</span>
                  <span>2. Pick Depth, Bevel & PBR Material</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--acid)' }}>→</span>
                  <span>3. Click Kinetic Loop Preset</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--acid)' }}>→</span>
                  <span>4. Instant WebM / MP4 / GLB Export</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Core Principles */}
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--acid)', letterSpacing: '0.12em', marginBottom: '24px' }}>
            OPERATING PRINCIPLES
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {principles.map((pr) => (
              <div
                key={pr.num}
                style={{
                  border: '2px solid #FFFFFF',
                  padding: '28px',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '24px',
                  alignItems: 'baseline'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 800, color: 'var(--acid)' }}>
                  {pr.num}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', marginBottom: '8px' }}>
                    {pr.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', lineHeight: 1.5, opacity: 0.9 }}>
                    {pr.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Launch Studio CTA */}
        <div style={{ marginTop: '72px', textAlign: 'center' }}>
          <Link
            to="/studio"
            className="btn-machine"
            style={{ backgroundColor: 'var(--acid)', color: 'var(--ink)', fontSize: '15px', padding: '18px 40px' }}
            onMouseEnter={() => setCursor('go')}
            onMouseLeave={() => setCursor('default')}
          >
            <span>EXPERIENCE THE ENGINE →</span>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .about-comparison-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
