import React, { useEffect, useRef, useState } from 'react';
import { useStudioStore } from '../../store/studioStore';

export const CustomCursor: React.FC = () => {
  const { cursorMode, cursorColor } = useStudioStore();
  const cursorRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isDown, setIsDown] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device has primary touch screen
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseDown = () => setIsDown(true);
    const handleMouseUp = () => setIsDown(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const loop = () => {
      // Smooth lerp
      currentX += (mouseX - currentX) * 0.22;
      currentY += (mouseY - currentY) * 0.22;
      setPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (isTouch) return null;

  const getLabel = () => {
    switch (cursorMode) {
      case 'rotate': return 'ROTATE';
      case 'adjust': return 'ADJUST';
      case 'use': return 'USE';
      case 'apply': return 'APPLY';
      case 'play': return 'PLAY';
      case 'open': return 'OPEN';
      case 'go': return 'GO';
      case 'drag': return isDown ? '↔ ↕' : 'DRAG';
      case 'zoom': return 'ZOOM';
      default: return null;
    }
  };

  const label = getLabel();
  const hasLabel = Boolean(label);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.2s ease',
        opacity: pos.x < 0 ? 0 : 1
      }}
    >
      {/* Outer rotating/compressing orbit */}
      <div
        ref={orbitRef}
        style={{
          width: isDown ? '22px' : hasLabel ? '42px' : '30px',
          height: isDown ? '22px' : hasLabel ? '42px' : '30px',
          borderRadius: '50%',
          border: '1px solid rgba(17, 17, 17, 0.45)',
          borderColor: cursorColor ? cursorColor : 'inherit',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'width 0.15s ease, height 0.15s ease, border-color 0.2s ease',
          animation: 'spinSlow 14s linear infinite',
          backgroundColor: cursorColor ? `${cursorColor}22` : 'transparent'
        }}
      />

      {/* Center crosshair / dot */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: cursorColor || '#111111',
          fontSize: '11px',
          fontWeight: 700,
          fontFamily: 'var(--font-mono)',
          lineHeight: 1
        }}
      >
        {cursorColor ? (
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: cursorColor
            }}
          />
        ) : (
          '+'
        )}
      </div>

      {/* State label badge */}
      {hasLabel && (
        <div
          style={{
            position: 'absolute',
            top: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#111111',
            color: '#D8FF3E',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            padding: '2px 6px',
            borderRadius: '2px',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
