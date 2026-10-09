import React, { useState } from 'react';
import { useStudioStore } from '../../store/studioStore';
import { StudioTopBar } from '../../components/editor/StudioTopBar';
import { StudioSidebar } from '../../components/editor/StudioSidebar';
import { StudioInspector } from '../../components/editor/StudioInspector';
import { StudioTimeline } from '../../components/editor/StudioTimeline';
import { ThreeViewport } from '../../components/three/ThreeViewport';
import { ExportModal } from '../../components/editor/ExportModal';
import { CommandPalette } from '../../components/common/CommandPalette';
import { Monitor, Smartphone, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

export const StudioPage: React.FC = () => {
  const { 
    geometry, 
    material, 
    lighting, 
    motion, 
    scene,
    triggerResetCamera,
    updateGeometry
  } = useStudioStore();

  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  return (
    <div
      className="studio-root"
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--studio-bg)',
        color: 'var(--studio-text)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* 1. Studio Top Bar */}
      <StudioTopBar />

      {/* 2. Main Studio Work Area */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
        {/* Left Sidebar Mode Switcher */}
        <StudioSidebar />

        {/* Center Viewport */}
        <main
          style={{
            flex: 1,
            position: 'relative',
            backgroundColor: scene.backgroundType === 'black' ? '#000000' : '#16171A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
          className={scene.floor === 'grid' ? 'bg-grid-dark' : ''}
        >
          {/* 3D Canvas */}
          <ThreeViewport
            geometry={geometry}
            material={material}
            lighting={lighting}
            motion={motion}
            sceneConfig={scene}
            interactive={true}
            style={{ width: '100%', height: '100%' }}
          />

          {/* Floating On-Screen Viewport Utilities */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              backgroundColor: 'rgba(32, 34, 38, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--studio-border)',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--studio-muted)'
            }}
          >
            <span>SHAPE: <strong style={{ color: 'var(--acid)' }}>{geometry.presetShape}</strong></span>
            <span>DEPTH: <strong style={{ color: '#FFFFFF' }}>{geometry.depth}px</strong></span>
            <span>MAT: <strong style={{ color: '#FFFFFF' }}>{material.name.split(' ')[0]}</strong></span>
          </div>

          {/* Camera Zoom & Reset Quick Buttons */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              display: 'flex',
              gap: '6px'
            }}
          >
            <button
              onClick={() => updateGeometry({ scale: Math.min(2.0, geometry.scale + 0.1) })}
              title="Zoom In"
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'rgba(32, 34, 38, 0.85)',
                border: '1px solid var(--studio-border)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ZoomIn size={14} />
            </button>
            <button
              onClick={() => updateGeometry({ scale: Math.max(0.5, geometry.scale - 0.1) })}
              title="Zoom Out"
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'rgba(32, 34, 38, 0.85)',
                border: '1px solid var(--studio-border)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ZoomOut size={14} />
            </button>
            <button
              onClick={triggerResetCamera}
              title="Reset View"
              style={{
                padding: '0 10px',
                height: '32px',
                backgroundColor: 'rgba(32, 34, 38, 0.85)',
                border: '1px solid var(--studio-border)',
                color: 'var(--acid)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <RotateCcw size={12} />
              <span>RESET</span>
            </button>
          </div>
        </main>

        {/* Right Inspector Sidebar */}
        <StudioInspector />
      </div>

      {/* 3. Bottom Timeline */}
      <StudioTimeline />

      {/* Export Modal & Command Palette */}
      <ExportModal />
      <CommandPalette />
    </div>
  );
};
