import React from 'react';
import { User, Shield, HardDrive, Volume2, Cpu, CheckCircle } from 'lucide-react';
import { useStudioStore } from '../../store/studioStore';

export const AccountPage: React.FC = () => {
  const { soundEnabled, toggleSound, savedProjects } = useStudioStore();

  return (
    <div
      style={{
        backgroundColor: '#16171A',
        color: '#F1EFE9',
        minHeight: '100vh',
        padding: 'calc(var(--header-height) + 40px) clamp(20px, 5vw, 64px) 80px'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--acid)', letterSpacing: '0.12em', marginBottom: '8px' }}>
            [STUDIO WORKSTATION IDENTITY]
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 0.9, color: '#FFFFFF' }}>
            ACCOUNT & SYSTEM
          </h1>
        </div>

        {/* Profile Details Card */}
        <div style={{ backgroundColor: '#202226', border: '1px solid var(--studio-border)', padding: '32px', marginBottom: '24px' }} className="corner-tick">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--acid)',
                color: 'var(--ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                fontWeight: 800
              }}
            >
              A
            </div>

            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#FFFFFF' }}>
                LOCAL CREATOR
              </h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--studio-muted)' }}>
                Hardware ID: #SPIN-{Date.now().toString(36).toUpperCase()}
              </div>
            </div>

            <span className="tech-tag tech-tag-dark" style={{ marginLeft: 'auto', color: 'var(--acid)' }}>
              CREATOR PRO TIER
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid var(--studio-border)', paddingTop: '20px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--studio-muted)' }}>SAVED WORKSPACE DRAFTS</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', color: '#FFFFFF', fontWeight: 700, marginTop: '4px' }}>
                {savedProjects.length} OF UNLIMITED
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--studio-muted)' }}>MAX EXPORT ENGINE</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', color: 'var(--acid)', fontWeight: 700, marginTop: '4px' }}>
                4K ULTRA / 60 FPS
              </div>
            </div>
          </div>
        </div>

        {/* Preferences & Hardware Card */}
        <div style={{ backgroundColor: '#202226', border: '1px solid var(--studio-border)', padding: '32px' }} className="corner-tick">
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--acid)', marginBottom: '16px', fontWeight: 700 }}>
            LOCAL WORKSTATION PREFERENCES
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--studio-border)' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#FFFFFF', fontWeight: 600 }}>Mechanical Sound Synthesizer</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--studio-muted)' }}>Web Audio API procedural feedback clicks</div>
              </div>
              <button
                onClick={toggleSound}
                className="btn-secondary"
                style={{ padding: '6px 14px', color: soundEnabled ? 'var(--acid)' : 'inherit', borderColor: 'var(--studio-border)' }}
              >
                {soundEnabled ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#FFFFFF', fontWeight: 600 }}>GPU Hardware Acceleration</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--studio-muted)' }}>WebGL 2.0 with ACES Filmic tonemapping</div>
              </div>
              <span className="tech-tag tech-tag-dark" style={{ color: 'var(--cyan)' }}>
                ACTIVE (DIRECT)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
