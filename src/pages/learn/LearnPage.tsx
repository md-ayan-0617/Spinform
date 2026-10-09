import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, Clock, Signal, Compass, Code, Lightbulb } from 'lucide-react';
import { TUTORIALS } from '../../data/learnData';
import { useStudioStore } from '../../store/studioStore';

export const LearnPage: React.FC = () => {
  const { setCursor } = useStudioStore();
  const [activeTab, setActiveTab] = useState<string>('ALL');

  const paths = ['ALL', 'START HERE', 'MATERIALS', 'MOTION', 'WEB EMBEDS'];

  const filtered = activeTab === 'ALL'
    ? TUTORIALS
    : TUTORIALS.filter((t) => t.category === activeTab);

  return (
    <div
      style={{
        backgroundColor: 'var(--paper)',
        color: 'var(--ink)',
        minHeight: '100vh',
        padding: 'calc(var(--header-height) + 48px) clamp(20px, 5vw, 64px) 80px'
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--machine-orange)', letterSpacing: '0.12em', marginBottom: '8px' }}>
            [KNOWLEDGE ENGINE & MANUALS]
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            MAKE SOMETHING WEIRD.<br />
            WE'LL SHOW YOU HOW.
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '20px', color: 'var(--graphite)', maxWidth: '640px', lineHeight: 1.4 }}>
            Direct, technical, and approachable guides to vector topology, PBR materials, kinetic easing, and embed architecture. Zero 47-minute corporate drone videos.
          </p>
        </div>

        {/* Path Filter Tabs */}
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
          {paths.map((p) => (
            <button
              key={p}
              onClick={() => setActiveTab(p)}
              style={{
                padding: '8px 18px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 700,
                backgroundColor: activeTab === p ? 'var(--machine-orange)' : 'transparent',
                color: activeTab === p ? '#FFFFFF' : 'var(--ink)',
                border: '1px solid var(--ink)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Tutorial List Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filtered.map((tut, index) => (
            <Link
              key={tut.id}
              to={`/learn/${tut.slug}`}
              style={{
                border: '2px solid var(--ink)',
                backgroundColor: '#FFFFFF',
                padding: '28px',
                display: 'grid',
                gridTemplateColumns: '80px 1.4fr 1fr auto',
                alignItems: 'center',
                gap: '24px',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
              className="corner-tick tutorial-card"
              onMouseEnter={() => setCursor('open')}
              onMouseLeave={() => setCursor('default')}
            >
              {/* Index Number */}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', fontWeight: 800, color: 'var(--machine-orange)' }}>
                {`0${index + 1}`}
              </div>

              {/* Title & Category */}
              <div>
                <span className="tech-tag" style={{ marginBottom: '8px', fontSize: '10px' }}>
                  {tut.category}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginTop: '4px' }}>
                  {tut.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--graphite)', marginTop: '4px', lineHeight: 1.4 }}>
                  {tut.summary}
                </p>
              </div>

              {/* Meta: Duration & Difficulty */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--graphite)' }}>
                  <Clock size={14} />
                  <span>{tut.duration} READ</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--ink)' }}>
                  <Signal size={14} />
                  <span>DIFFICULTY: {tut.difficulty.toUpperCase()}</span>
                </div>
              </div>

              {/* Arrow */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--ink)',
                  color: 'var(--paper)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ArrowUpRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .tutorial-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: 6px 6px 0px var(--ink);
        }
        @media (max-width: 800px) {
          .tutorial-card {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};
