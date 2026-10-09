import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, FolderOpen, Trash2, Copy, Download, ArrowUpRight } from 'lucide-react';
import { useStudioStore } from '../../store/studioStore';
import { ThreeViewport } from '../../components/three/ThreeViewport';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { savedProjects, loadProject, deleteProject, saveProject, setCursor } = useStudioStore();

  const handleCreateNew = () => {
    saveProject(`Project #${savedProjects.length + 1}`);
    navigate('/studio');
  };

  return (
    <div
      style={{
        backgroundColor: '#16171A',
        color: '#F1EFE9',
        minHeight: '100vh',
        padding: 'calc(var(--header-height) + 40px) clamp(20px, 5vw, 64px) 80px'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--acid)', letterSpacing: '0.12em', marginBottom: '8px' }}>
              [LOCAL BROWSER REPOSITORY]
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 84px)', lineHeight: 0.9, color: '#FFFFFF' }}>
              SAVED PROJECTS
            </h1>
          </div>

          <button onClick={handleCreateNew} className="btn-machine">
            <Plus size={16} />
            <span>NEW 3D PROJECT</span>
          </button>
        </div>

        {/* Projects Grid */}
        {savedProjects.length === 0 ? (
          <div
            style={{
              padding: '64px',
              textAlign: 'center',
              backgroundColor: '#202226',
              border: '1px dashed var(--studio-border)'
            }}
          >
            <FolderOpen size={48} color="var(--studio-muted)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#FFFFFF', marginBottom: '8px' }}>
              NO SAVED PROJECTS YET
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--studio-muted)', marginBottom: '24px' }}>
              Jump into the studio editor to create and persist your first 3D brandmark.
            </p>
            <button onClick={handleCreateNew} className="btn-machine">
              <span>OPEN STUDIO</span>
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px'
            }}
          >
            {savedProjects.map((proj) => (
              <div
                key={proj.id}
                style={{
                  backgroundColor: '#202226',
                  border: '1px solid var(--studio-border)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                className="corner-tick project-card"
              >
                {/* 3D Model Preview */}
                <div style={{ height: '220px', backgroundColor: '#16171A', position: 'relative' }}>
                  <ThreeViewport
                    geometry={proj.geometry}
                    material={proj.material}
                    lighting={proj.lighting}
                    motion={{
                      ...proj.motion,
                      speed: 0.8
                    }}
                    interactive={false}
                    style={{ width: '100%', height: '100%' }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      padding: '2px 8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'var(--acid)'
                    }}
                  >
                    SHAPE: {proj.geometry.presetShape}
                  </div>
                </div>

                {/* Info & Actions */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#FFFFFF' }}>
                        {proj.title}
                      </h3>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--studio-muted)', marginTop: '2px' }}>
                        Modified: {proj.modifiedAt}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--studio-border)', paddingTop: '14px' }}>
                    <button
                      onClick={() => {
                        loadProject(proj);
                        navigate('/studio');
                      }}
                      className="btn-machine"
                      style={{ flex: 1, padding: '10px', fontSize: '11px' }}
                    >
                      <span>OPEN</span>
                      <ArrowUpRight size={13} />
                    </button>

                    <button
                      onClick={() => deleteProject(proj.id)}
                      title="Delete Project"
                      style={{
                        padding: '10px 14px',
                        backgroundColor: '#16171A',
                        border: '1px solid var(--studio-border)',
                        color: 'var(--studio-muted)'
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .project-card:hover {
          border-color: var(--acid);
        }
      `}</style>
    </div>
  );
};
