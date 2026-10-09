import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Undo2, 
  Redo2, 
  Save, 
  Download, 
  Share2, 
  RotateCw, 
  Move, 
  Maximize2, 
  Camera, 
  ChevronDown, 
  Sparkles,
  Layers,
  Code
} from 'lucide-react';
import { useStudioStore } from '../../store/studioStore';

export const StudioTopBar: React.FC = () => {
  const { 
    activeTool, 
    setActiveTool, 
    triggerResetCamera, 
    saveProject, 
    setExportModal,
    setEmbedModal,
    geometry,
    soundEnabled
  } = useStudioStore();

  const [projectTitle, setProjectTitle] = useState('Untitled Project 01');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  return (
    <div
      style={{
        height: '56px',
        backgroundColor: 'var(--studio-bg)',
        borderBottom: '1px solid var(--studio-border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        color: 'var(--studio-text)',
        userSelect: 'none',
        zIndex: 20
      }}
    >
      {/* Brand & Project Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginRight: '24px' }}>
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontWeight: 800,
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}
        >
          <span>SPINF</span>
          <span
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: '2px solid var(--acid)',
              display: 'inline-block'
            }}
          />
          <span>RM</span>
        </Link>

        <span style={{ color: 'var(--studio-border)' }}>/</span>

        {/* Editable Title */}
        {isEditingTitle ? (
          <input
            autoFocus
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            onBlur={() => setIsEditingTitle(false)}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
            style={{
              backgroundColor: 'var(--studio-panel)',
              border: '1px solid var(--acid)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              padding: '2px 8px'
            }}
          />
        ) : (
          <span
            onClick={() => setIsEditingTitle(true)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--studio-muted)',
              cursor: 'pointer',
              textDecoration: 'underline dotted'
            }}
            title="Click to rename"
          >
            {projectTitle}
          </span>
        )}
      </div>

      {/* Transform Tool Switcher */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--studio-panel)',
          border: '1px solid var(--studio-border)',
          borderRadius: '2px'
        }}
        className="desktop-only-tools"
      >
        {[
          { id: 'rotate', label: 'Rotate', icon: <RotateCw size={14} /> },
          { id: 'move', label: 'Move', icon: <Move size={14} /> },
          { id: 'scale', label: 'Scale', icon: <Maximize2 size={14} /> },
          { id: 'camera', label: 'Camera Orbit', icon: <Camera size={14} /> }
        ].map((t) => {
          const isActive = activeTool === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTool(t.id as any)}
              title={t.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                backgroundColor: isActive ? 'var(--studio-border)' : 'transparent',
                color: isActive ? 'var(--acid)' : 'var(--studio-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                borderRight: '1px solid var(--studio-border)'
              }}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          );
        })}

        <button
          onClick={triggerResetCamera}
          title="Reset Camera Framing"
          style={{
            padding: '6px 12px',
            color: 'var(--studio-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px'
          }}
        >
          Reset View
        </button>
      </div>

      {/* Right Actions: Undo, Redo, Save, Export, Embed */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => saveProject(projectTitle)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            backgroundColor: 'var(--studio-panel)',
            border: '1px solid var(--studio-border)',
            color: 'var(--studio-text)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px'
          }}
        >
          <Save size={13} />
          <span>SAVE DRAFT</span>
        </button>

        <button
          onClick={() => setExportModal(true)}
          className="btn-machine"
          style={{
            padding: '8px 18px',
            fontSize: '11px',
            height: '34px'
          }}
        >
          <Download size={14} />
          <span>EXPORT</span>
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-only-tools {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
