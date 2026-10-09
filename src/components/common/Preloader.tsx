import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // Check if repeat visitor in this session
    const visited = sessionStorage.getItem('spinform_visited');
    if (visited) {
      setHasVisited(true);
      // Fast path
      const t = setTimeout(() => {
        onComplete();
      }, 350);
      return () => clearTimeout(t);
    }

    sessionStorage.setItem('spinform_visited', 'true');

    // Smooth simulated depth extrusion progression
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setIsFinishing(true);
        setTimeout(() => {
          onComplete();
        }, 850);
      } else {
        setProgress(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (hasVisited) {
    return null;
  }

  // Calculate 3D extrusion pseudo-isometric depth projection
  const extrusionOffset = (progress / 100) * 24;
  const lightingIntensity = progress > 70 ? (progress - 70) / 30 : 0;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#F3F1E9',
        zIndex: 99998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.65s cubic-bezier(0.76, 0, 0.24, 1), transform 0.65s cubic-bezier(0.76, 0, 0.24, 1)',
        opacity: isFinishing ? 0 : 1,
        transform: isFinishing ? 'scale(1.08)' : 'scale(1)',
        pointerEvents: isFinishing ? 'none' : 'auto',
        userSelect: 'none'
      }}
    >
      {/* Top Technical Metadata */}
      <div
        style={{
          position: 'absolute',
          top: '32px',
          left: '32px',
          right: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: '#111111',
          letterSpacing: '0.05em'
        }}
      >
        <span>SPINFORM BOOTLOADER v2.4</span>
        <span>INITIALIZING WEBGL 2.0 CONTEXT</span>
      </div>

      {/* Main Extrusion Visualizer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
          margin: 'auto'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            fontWeight: 700,
            color: progress < 50 ? '#FF5B2D' : '#A9A69D',
            letterSpacing: '0.08em'
          }}
        >
          2D
        </span>

        {/* The extruding Logo Container */}
        <div
          style={{
            position: 'relative',
            perspective: '800px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 40px'
          }}
        >
          {/* Depth shadow stack simulating 3D layers */}
          {Array.from({ length: 6 }).map((_, i) => {
            const stepOffset = (extrusionOffset / 6) * (i + 1);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(52px, 8vw, 110px)',
                  fontWeight: 800,
                  color: i === 5 ? '#2457FF' : `rgba(17, 17, 17, ${0.15 + (i * 0.12)})`,
                  transform: `translate3d(${stepOffset}px, ${-stepOffset}px, ${-i * 8}px) rotateY(${isFinishing ? '360deg' : '0deg'})`,
                  transition: isFinishing ? 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
                  pointerEvents: 'none',
                  filter: `brightness(${1 + lightingIntensity * 0.4})`
                }}
              >
                SPINF<span style={{ color: '#D8FF3E' }}>O</span>RM
              </div>
            );
          })}

          {/* Front Face */}
          <div
            style={{
              position: 'relative',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(52px, 8vw, 110px)',
              fontWeight: 800,
              color: '#111111',
              zIndex: 10,
              transform: isFinishing ? 'rotateY(360deg) scale(1.15)' : 'none',
              transition: isFinishing ? 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
            }}
          >
            SPINF<span style={{ color: '#2457FF' }}>O</span>RM
          </div>
        </div>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            fontWeight: 700,
            color: progress >= 50 ? '#2457FF' : '#A9A69D',
            letterSpacing: '0.08em'
          }}
        >
          3D
        </span>
      </div>

      {/* Bottom Technical Status Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: '#111111',
            letterSpacing: '0.12em',
            fontWeight: 600
          }}
        >
          {progress < 70 ? 'BUILDING DEPTH...' : progress < 100 ? 'COMPUTING PBR SPECULAR...' : 'READY.'}
        </div>

        {/* Progress Bar Container */}
        <div
          style={{
            width: '280px',
            height: '4px',
            backgroundColor: '#E6E3D9',
            border: '1px solid #111111',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#111111',
              transition: 'width 0.05s linear'
            }}
          />
        </div>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#111111',
            fontWeight: 700
          }}
        >
          {progress}%
        </span>
      </div>
    </div>
  );
};
