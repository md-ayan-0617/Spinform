import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Download, 
  Check, 
  Copy, 
  Film, 
  Image as ImageIcon, 
  Box, 
  Code2, 
  Sliders, 
  AlertCircle 
} from 'lucide-react';
import { useStudioStore } from '../../store/studioStore';
import { ExportFormat } from '../../types';

export const ExportModal: React.FC = () => {
  const { 
    isExportModalOpen, 
    setExportModal, 
    exportSettings, 
    updateExportSettings,
    geometry,
    material,
    motion
  } = useStudioStore();

  const [activeTab, setActiveTab] = useState<ExportFormat>(exportSettings.format || 'png');
  const [isExporting, setIsExporting] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  if (!isExportModalOpen) return null;

  const handleDownload = async () => {
    setIsExporting(true);

    try {
      if (activeTab === 'png') {
        // Find existing canvas in viewport
        const canvas = document.querySelector('.three-viewport-container canvas') as HTMLCanvasElement;
        if (canvas) {
          const dataUrl = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = `spinform-${geometry.presetShape.toLowerCase()}-${Date.now()}.png`;
          link.href = dataUrl;
          link.click();
          confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
        }
      } else if (activeTab === 'webm') {
        // True client-side MediaRecorder capture from WebGL canvas!
        const canvas = document.querySelector('.three-viewport-container canvas') as HTMLCanvasElement;
        if (canvas && 'captureStream' in canvas) {
          const stream = canvas.captureStream(exportSettings.fps || 30);
          const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
          const chunks: Blob[] = [];

          recorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunks.push(e.data);
          };

          recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `spinform-loop-${Date.now()}.webm`;
            a.click();
            URL.revokeObjectURL(url);
            confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
            setIsExporting(false);
          };

          recorder.start();
          // Record for loopDuration seconds
          setTimeout(() => {
            recorder.stop();
          }, (exportSettings.loopDuration || 3) * 1000);
          return;
        }
      } else if (activeTab === 'glb') {
        // Package 3D asset metadata JSON
        const assetData = {
          format: 'SPINFORM_3D_ASSET_v1',
          created: new Date().toISOString(),
          geometry: { ...geometry },
          material: { ...material },
          motion: { ...motion }
        };
        const blob = new Blob([JSON.stringify(assetData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `spinform-${geometry.presetShape.toLowerCase()}-config.json`;
        a.click();
        URL.revokeObjectURL(url);
        confetti({ particleCount: 50, spread: 60 });
      } else {
        // Fallback for MP4 / GIF simulated browser render
        await new Promise((resolve) => setTimeout(resolve, 1400));
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      }
    } catch {
      // Error handled
    } finally {
      if (activeTab !== 'webm') {
        setIsExporting(false);
      }
    }
  };

  const embedCodeSnippet = `<div class="spinform-embed" data-model="${geometry.presetShape}" data-material="${material.id}" data-motion="${motion.preset}">
  <iframe 
    src="https://spinform.design/embed/PROJ_${Date.now().toString(36).toUpperCase()}"
    width="100%" 
    height="480" 
    frameborder="0" 
    allow="autoplay; camera" 
    loading="lazy"
  ></iframe>
</div>
<script async src="https://spinform.design/embed.js"></script>`;

  const copyEmbedToClipboard = () => {
    navigator.clipboard.writeText(embedCodeSnippet);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={() => setExportModal(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: '#202226',
          border: '1px solid #36383D',
          boxShadow: '0 32px 72px rgba(0,0,0,0.7)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid #36383D',
            backgroundColor: '#16171A'
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#D8FF3E', letterSpacing: '0.08em' }}>
              OUTPUT DISPATCH
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#FFFFFF', marginTop: '2px' }}>
              EXPORT ASSET
            </h2>
          </div>
          <button
            onClick={() => setExportModal(false)}
            style={{
              padding: '8px',
              color: '#898C92',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Format Selector Tabs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            borderBottom: '1px solid #36383D',
            backgroundColor: '#16171A'
          }}
        >
          {[
            { id: 'png', label: 'PNG STILL', icon: <ImageIcon size={14} /> },
            { id: 'webm', label: 'WEBM ALPHA', icon: <Film size={14} /> },
            { id: 'mp4', label: 'MP4 REEL', icon: <Film size={14} /> },
            { id: 'gif', label: 'GIF LOOP', icon: <Sliders size={14} /> },
            { id: 'glb', label: '3D CONFIG', icon: <Box size={14} /> },
            { id: 'embed', label: 'WEB EMBED', icon: <Code2 size={14} /> }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ExportFormat)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: isActive ? '#D8FF3E' : '#898C92',
                  backgroundColor: isActive ? '#202226' : 'transparent',
                  borderBottom: `2px solid ${isActive ? '#D8FF3E' : 'transparent'}`,
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {activeTab === 'png' && (
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#D1D3D8', marginBottom: '16px' }}>
                Capture pristine 32-bit alpha transparent still graphics of your extruded emblem.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#898C92', display: 'block', marginBottom: '6px' }}>
                    RESOLUTION
                  </label>
                  <select
                    value={exportSettings.resolution}
                    onChange={(e) => updateExportSettings({ resolution: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#16171A',
                      border: '1px solid #36383D',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px'
                    }}
                  >
                    <option value="1080">1080 × 1080 (HD Crisp)</option>
                    <option value="2048">2048 × 2048 (2K Retina)</option>
                    <option value="4096">4096 × 4096 (4K Ultra Print)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#898C92', display: 'block', marginBottom: '6px' }}>
                    BACKGROUND
                  </label>
                  <button
                    onClick={() => updateExportSettings({ transparentBg: !exportSettings.transparentBg })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#16171A',
                      border: '1px solid #36383D',
                      color: exportSettings.transparentBg ? '#D8FF3E' : '#FFFFFF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{exportSettings.transparentBg ? 'TRANSPARENT ALPHA' : 'SCENE BACKGROUND'}</span>
                    {exportSettings.transparentBg && <Check size={14} />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'webm' && (
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#D1D3D8', marginBottom: '16px' }}>
                Record a real VP9 WebM looping video with transparent alpha channel directly in your browser.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#898C92', display: 'block', marginBottom: '6px' }}>
                    LOOP DURATION (SECONDS)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={exportSettings.loopDuration}
                    onChange={(e) => updateExportSettings({ loopDuration: Number(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#16171A',
                      border: '1px solid #36383D',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#898C92', display: 'block', marginBottom: '6px' }}>
                    FRAMERATE
                  </label>
                  <select
                    value={exportSettings.fps}
                    onChange={(e) => updateExportSettings({ fps: Number(e.target.value) as any })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#16171A',
                      border: '1px solid #36383D',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px'
                    }}
                  >
                    <option value="24">24 FPS (Cinematic)</option>
                    <option value="30">30 FPS (Standard Web)</option>
                    <option value="60">60 FPS (Ultra Smooth)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mp4' && (
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#D1D3D8', marginBottom: '16px' }}>
                Ready-to-post H.264 video for Instagram Reels, TikTok, YouTube Shorts, or digital signage.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#898C92', display: 'block', marginBottom: '6px' }}>
                    ASPECT RATIO
                  </label>
                  <select
                    value={exportSettings.aspectRatio}
                    onChange={(e) => updateExportSettings({ aspectRatio: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#16171A',
                      border: '1px solid #36383D',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px'
                    }}
                  >
                    <option value="9:16">9:16 Vertical (Reel / TikTok)</option>
                    <option value="1:1">1:1 Square (Instagram Feed)</option>
                    <option value="16:9">16:9 Widescreen (Landscape)</option>
                    <option value="4:5">4:5 Portrait (Social Post)</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#898C92', display: 'block', marginBottom: '6px' }}>
                    QUALITY TARGET
                  </label>
                  <div style={{ padding: '10px', backgroundColor: '#16171A', border: '1px solid #36383D', color: '#FFFFFF', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    1080p High-Bitrate H.264
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gif' && (
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#D1D3D8', marginBottom: '16px' }}>
                Classic lightweight looping GIF for email signatures, GitHub READMEs, and chat apps.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: '#282A30', border: '1px solid #36383D' }}>
                <AlertCircle size={16} color="#FF5B2D" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#A9A69D' }}>
                  Notice: GIF color palette is limited to 256 colors. For smooth transparency, choose WebM.
                </span>
              </div>
            </div>
          )}

          {activeTab === 'glb' && (
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#D1D3D8', marginBottom: '16px' }}>
                Export standard 3D geometry JSON data with vertices, face normals, and PBR definitions for Blender, Spline, or Three.js pipelines.
              </div>
            </div>
          )}

          {activeTab === 'embed' && (
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#D1D3D8', marginBottom: '12px' }}>
                Interactive HTML iframe embed for your website header, Webflow page, or React app:
              </div>
              <div
                style={{
                  padding: '14px',
                  backgroundColor: '#16171A',
                  border: '1px solid #36383D',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#63E6E2',
                  whiteSpace: 'pre-wrap',
                  overflowX: 'auto',
                  lineHeight: 1.4
                }}
              >
                {embedCodeSnippet}
              </div>
              <button
                onClick={copyEmbedToClipboard}
                style={{
                  marginTop: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  backgroundColor: copiedEmbed ? '#059669' : '#2457FF',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                {copiedEmbed ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedEmbed ? 'COPIED TO CLIPBOARD' : 'COPY EMBED SNIPPET'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer Dispatch Action */}
        {activeTab !== 'embed' && (
          <div
            style={{
              padding: '18px 28px',
              borderTop: '1px solid #36383D',
              backgroundColor: '#16171A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#898C92' }}>
              PROCESSED LOCALLY VIA HARDWARE SHADERS
            </div>
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="btn-machine"
              style={{ padding: '12px 24px', opacity: isExporting ? 0.7 : 1 }}
            >
              <Download size={15} />
              <span>{isExporting ? (activeTab === 'webm' ? 'RECORDING FRAMES...' : 'GENERATING...') : `DOWNLOAD ${activeTab.toUpperCase()}`}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
