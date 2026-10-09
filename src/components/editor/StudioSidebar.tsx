import React from 'react';
import { Layers, Palette, Sun, Play, SlidersHorizontal, Sliders } from 'lucide-react';
import { useStudioStore } from '../../store/studioStore';

export const StudioSidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useStudioStore();

  const tabs = [
    { id: 'OBJECT', label: 'OBJECT', icon: <Layers size={16} /> },
    { id: 'MATERIAL', label: 'MATERIAL', icon: <Palette size={16} /> },
    { id: 'LIGHT', label: 'LIGHT', icon: <Sun size={16} /> },
    { id: 'MOTION', label: 'MOTION', icon: <Play size={16} /> },
    { id: 'SCENE', label: 'SCENE', icon: <SlidersHorizontal size={16} /> }
  ] as const;

  return (
    <aside
      style={{
        width: '72px',
        backgroundColor: 'var(--studio-bg)',
        borderRight: '1px solid var(--studio-border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '16px',
        zIndex: 10,
        userSelect: 'none'
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              padding: '16px 0',
              color: isActive ? 'var(--acid)' : 'var(--studio-muted)',
              backgroundColor: isActive ? 'var(--studio-panel)' : 'transparent',
              borderLeft: `3px solid ${isActive ? 'var(--acid)' : 'transparent'}`,
              transition: 'all 0.15s ease'
            }}
          >
            {tab.icon}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.04em'
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
};
