import React, { useState, useEffect } from 'react';
import { Play, Pause, ChevronUp, ChevronDown, SkipBack, RotateCcw, Diamond } from 'lucide-react';
import { useStudioStore } from '../../store/studioStore';

export const StudioTimeline: React.FC = () => {
  const { 
    isTimelineCollapsed, 
    toggleTimeline, 
    motion, 
    updateMotion 
  } = useStudioStore();

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!motion.isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 0.05 * motion.speed;
        return next > 4.0 ? 0 : next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [motion.isPlaying, motion.speed]);

  const tracks = [
    { name: 'ROTATION Y', keyframes: [0, 1.0, 2.0, 3.0, 4.0], color: 'var(--acid)' },
    { name: 'ROTATION X', keyframes: [0, 2.0, 4.0], color: 'var(--electric-blue)' },
    { name: 'SCALE FACTOR', keyframes: [0, 1.5, 3.0, 4.0], color: 'var(--machine-orange)' },
    { name: 'EXTRUDE DEPTH', keyframes: [0, 2.5, 4.0], color: 'var(--cyan)' }
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--studio-bg)',
        borderTop: '1px solid var(--studio-border)',
        height: isTimelineCollapsed ? '32px' : '124px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'height 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
        overflow: 'hidden',
        userSelect: 'none',
        zIndex: 10
      }}
    >
      {/* Timeline Header Bar */}
      <div
        style={{
          height: '32px',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--studio-panel)',
          borderBottom: isTimelineCollapsed ? 'none' : '1px solid var(--studio-border)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => updateMotion({ isPlaying: !motion.isPlaying })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: motion.isPlaying ? 'var(--acid)' : 'var(--studio-text)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700
            }}
          >
            {motion.isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{motion.isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>

          <span style={{ color: 'var(--studio-border)' }}>|</span>

          {/* Time Counter */}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--acid)' }}>
            {currentTime.toFixed(2)}s / 4.00s
          </span>

          {/* Speed Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '8px' }}>
            {[0.25, 0.5, 1.0, 2.0].map((s) => (
              <button
                key={s}
                onClick={() => updateMotion({ speed: s })}
                style={{
                  padding: '2px 6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  backgroundColor: motion.speed === s ? 'var(--acid)' : 'var(--studio-bg)',
                  color: motion.speed === s ? 'var(--ink)' : 'var(--studio-muted)',
                  border: '1px solid var(--studio-border)'
                }}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={toggleTimeline}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: 'var(--studio-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px'
          }}
        >
          <span>{isTimelineCollapsed ? 'EXPAND' : 'COLLAPSE'}</span>
          {isTimelineCollapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Main Track View */}
      {!isTimelineCollapsed && (
        <div style={{ flex: 1, display: 'flex', position: 'relative', overflowX: 'auto' }}>
          {/* Track Labels */}
          <div
            style={{
              width: '140px',
              borderRight: '1px solid var(--studio-border)',
              backgroundColor: 'var(--studio-panel-alt)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {tracks.map((t) => (
              <div
                key={t.name}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'var(--studio-muted)',
                  borderBottom: '1px solid rgba(255,255,255,0.03)'
                }}
              >
                {t.name}
              </div>
            ))}
          </div>

          {/* Keyframe Grid & Scrub Line */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              backgroundColor: 'var(--studio-bg)',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              setCurrentTime(ratio * 4.0);
            }}
          >
            {/* Playhead Vertical Scrub Needle */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${(currentTime / 4.0) * 100}%`,
                width: '2px',
                backgroundColor: 'var(--acid)',
                zIndex: 10,
                pointerEvents: 'none'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-4px',
                  width: '10px',
                  height: '10px',
                  backgroundColor: 'var(--acid)',
                  transform: 'rotate(45deg)'
                }}
              />
            </div>

            {/* Individual Tracks with Keyframe Diamonds */}
            {tracks.map((t) => (
              <div
                key={t.name}
                style={{
                  flex: 1,
                  position: 'relative',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {/* Horizontal Track Guide Line */}
                <div style={{ position: 'absolute', left: 0, right: 0, height: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }} />

                {/* Keyframe Diamond Marks */}
                {t.keyframes.map((kf, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: `${(kf / 4.0) * 100}%`,
                      transform: 'translate(-50%, -50%) rotate(45deg)',
                      width: '8px',
                      height: '8px',
                      backgroundColor: t.color,
                      border: '1px solid #111111'
                    }}
                    title={`Keyframe at ${kf}s`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
