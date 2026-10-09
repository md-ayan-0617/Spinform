import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  Layers, 
  RotateCw, 
  Download, 
  Camera, 
  Save, 
  Palette, 
  Volume2, 
  Sliders, 
  Grid,
  FileCode,
  FolderOpen
} from 'lucide-react';
import { useStudioStore } from '../../store/studioStore';
import { MATERIALS } from '../../data/materialsData';
import { MOTION_PRESETS } from '../../data/motionData';

export const CommandPalette: React.FC = () => {
  const navigate = useNavigate();
  const { 
    isCommandPaletteOpen, 
    setCommandPalette, 
    setMaterial, 
    setMotionPreset, 
    triggerResetCamera, 
    saveProject, 
    setExportModal,
    toggleSound,
    updateScene,
    scene
  } = useStudioStore();

  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Global Ctrl+K / Cmd+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPalette(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPalette(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPalette]);

  if (!isCommandPaletteOpen) return null;

  interface CommandItem {
    id: string;
    title: string;
    section: string;
    icon: React.ReactNode;
    shortcut?: string;
    action: () => void;
  }

  const baseCommands: CommandItem[] = [
    {
      id: 'open-studio',
      title: 'Open Studio Editor',
      section: 'Navigation',
      icon: <Layers size={16} />,
      shortcut: 'G S',
      action: () => { navigate('/studio'); setCommandPalette(false); }
    },
    {
      id: 'export-file',
      title: 'Export Model / Animation (PNG, WebM, GLB)',
      section: 'Studio Actions',
      icon: <Download size={16} />,
      shortcut: '⌘ E',
      action: () => { setCommandPalette(false); setExportModal(true); }
    },
    {
      id: 'save-proj',
      title: 'Save Current Project State to Local Storage',
      section: 'Studio Actions',
      icon: <Save size={16} />,
      shortcut: '⌘ S',
      action: () => { saveProject(); setCommandPalette(false); }
    },
    {
      id: 'reset-cam',
      title: 'Reset Viewport Camera & Centering',
      section: 'Studio Actions',
      icon: <Camera size={16} />,
      shortcut: 'R',
      action: () => { triggerResetCamera(); setCommandPalette(false); }
    },
    {
      id: 'toggle-sound',
      title: 'Toggle Procedural Mechanical Sound Effects',
      section: 'Preferences',
      icon: <Volume2 size={16} />,
      action: () => { toggleSound(); setCommandPalette(false); }
    },
    {
      id: 'toggle-floor',
      title: `Toggle Viewport Floor Grid (${scene.floor === 'grid' ? 'Currently ON' : 'Currently OFF'})`,
      section: 'Viewport',
      icon: <Grid size={16} />,
      action: () => {
        updateScene({ floor: scene.floor === 'grid' ? 'none' : 'grid' });
        setCommandPalette(false);
      }
    },
    {
      id: 'browse-templates',
      title: 'Explore Template Playground',
      section: 'Navigation',
      icon: <FolderOpen size={16} />,
      action: () => { navigate('/templates'); setCommandPalette(false); }
    },
    {
      id: 'browse-materials',
      title: 'Digital Materials Museum',
      section: 'Navigation',
      icon: <Palette size={16} />,
      action: () => { navigate('/materials'); setCommandPalette(false); }
    },
    {
      id: 'browse-motion',
      title: 'Kinetics & Easing Visualizer',
      section: 'Navigation',
      icon: <Sliders size={16} />,
      action: () => { navigate('/motion'); setCommandPalette(false); }
    }
  ];

  // Material commands
  const materialCommands: CommandItem[] = MATERIALS.slice(0, 8).map(m => ({
    id: `mat-${m.id}`,
    title: `Apply Material: ${m.name}`,
    section: 'Quick Materials',
    icon: <Palette size={16} style={{ color: m.color }} />,
    action: () => {
      setMaterial(m);
      setCommandPalette(false);
    }
  }));

  // Motion commands
  const motionCommands: CommandItem[] = MOTION_PRESETS.slice(0, 8).map(m => ({
    id: `mot-${m.id}`,
    title: `Apply Kinetic Motion: ${m.name}`,
    section: 'Quick Motion Presets',
    icon: <RotateCw size={16} />,
    action: () => {
      setMotionPreset(m.id);
      setCommandPalette(false);
    }
  }));

  const allCommands = [...baseCommands, ...materialCommands, ...motionCommands];

  const filtered = allCommands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.section.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh'
      }}
      onClick={() => setCommandPalette(false)}
    >
      <div
        style={{
          width: '90%',
          maxWidth: '640px',
          backgroundColor: '#202226',
          border: '1px solid #36383D',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #36383D',
            gap: '12px'
          }}
        >
          <Search size={18} color="#898C92" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command, material, animation, or route..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIdx(0);
            }}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: '#F1EFE9'
            }}
          />
          <kbd
            style={{
              padding: '2px 6px',
              backgroundColor: '#16171A',
              border: '1px solid #36383D',
              borderRadius: '2px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#898C92'
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Command List Results */}
        <div
          style={{
            maxHeight: '380px',
            overflowY: 'auto',
            padding: '8px'
          }}
        >
          {filtered.length === 0 ? (
            <div
              style={{
                padding: '24px',
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: '#898C92'
              }}
            >
              No matching commands found.
            </div>
          ) : (
            filtered.map((cmd, i) => {
              const isSelected = selectedIdx === i;
              return (
                <div
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIdx(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    backgroundColor: isSelected ? '#282A30' : 'transparent',
                    cursor: 'pointer',
                    borderRadius: '2px',
                    transition: 'background-color 0.1s ease'
                  }}
                >
                  <div style={{ color: isSelected ? 'var(--acid)' : '#898C92' }}>
                    {cmd.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: isSelected ? '#FFFFFF' : '#D1D3D8',
                        fontWeight: 500
                      }}
                    >
                      {cmd.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: '#898C92'
                      }}
                    >
                      {cmd.section}
                    </div>
                  </div>
                  {cmd.shortcut && (
                    <kbd
                      style={{
                        padding: '2px 6px',
                        backgroundColor: '#16171A',
                        border: '1px solid #36383D',
                        borderRadius: '2px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: '#898C92'
                      }}
                    >
                      {cmd.shortcut}
                    </kbd>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Technical Footer */}
        <div
          style={{
            padding: '10px 16px',
            borderTop: '1px solid #36383D',
            backgroundColor: '#16171A',
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#898C92'
          }}
        >
          <span>Use ↑ ↓ to navigate</span>
          <span>Press Enter to select</span>
        </div>
      </div>
    </div>
  );
};
