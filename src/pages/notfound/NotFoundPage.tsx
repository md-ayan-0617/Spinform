import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ThreeViewport } from '../../components/three/ThreeViewport';
import { MATERIALS } from '../../data/materialsData';
import { useStudioStore } from '../../store/studioStore';

export const NotFoundPage: React.FC = () => {
  const { setCursor } = useStudioStore();
  const [isExtruded, setIsExtruded] = useState(false);

  return (
    <div
      style={{
        backgroundColor: 'var(--paper)',
        color: 'var(--ink)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'calc(var(--header-height) + 20px) 24px 60px',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '640px', width: '100%' }}>
        {/* Interactive Extruding 404 Visual Canvas */}
        <div
          style={{
            height: '280px',
            position: 'relative',
            marginBottom: '32px'
          }}
          onMouseEnter={() => setIsExtruded(true)}
          onMouseLeave={() => setIsExtruded(false)}
        >
          <ThreeViewport
            geometry={{
              sourceType: 'text',
              presetShape: 'S',
              textValue: '404',
              depth: isExtruded ? 48 : 2,
              bevel: isExtruded ? 4 : 0,
              bevelSegments: 3,
              scale: 1.3,
              rotation: isExtruded ? [0.2, 0.4, 0] : [0, 0, 0],
              position: [0, 0, 0]
            }}
            material={MATERIALS[0]} // Chrome
            motion={{
              preset: isExtruded ? 'tumble' : 'none',
              duration: 4,
              loop: true,
              direction: 'normal',
              ease: 'none',
              speed: 1.0,
              amplitude: 1,
              isPlaying: isExtruded
            }}
            interactive={true}
            style={{ width: '100%', height: '100%' }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: '4px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--machine-orange)',
              fontWeight: 700
            }}
          >
            [HOVER TO EXTRUDE 404 DIMENSION]
          </div>
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--machine-orange)', letterSpacing: '0.12em', marginBottom: '8px' }}>
          ERROR 404: MISSING COORDINATES
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 7vw, 84px)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            marginBottom: '20px'
          }}
        >
          THIS PAGE<br />
          HAS NO DEPTH.
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            color: 'var(--graphite)',
            marginBottom: '36px',
            lineHeight: 1.5
          }}
        >
          The resource you requested is completely 2D or no longer exists. Let's fix that by creating real dimensional form.
        </p>

        <Link
          to="/studio"
          className="btn-machine"
          style={{ padding: '16px 36px', fontSize: '14px' }}
          onMouseEnter={() => setCursor('go')}
          onMouseLeave={() => setCursor('default')}
        >
          <span>ADD SOME DEPTH →</span>
        </Link>
      </div>
    </div>
  );
};
