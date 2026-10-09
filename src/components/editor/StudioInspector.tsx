import React from 'react';
import { 
  RotateCcw, 
  Upload, 
  Type, 
  Sparkles, 
  Sliders, 
  Layers, 
  Palette, 
  Sun, 
  Play, 
  Grid,
  Check
} from 'lucide-react';
import { useStudioStore } from '../../store/studioStore';
import { MATERIALS } from '../../data/materialsData';
import { MOTION_PRESETS } from '../../data/motionData';
import { LightingPreset, MotionPresetId, BackgroundType } from '../../types';

export const StudioInspector: React.FC = () => {
  const { 
    activeTab, 
    geometry, 
    updateGeometry, 
    material, 
    setMaterial, 
    updateMaterial, 
    lighting, 
    setLightingPreset, 
    updateLighting, 
    motion, 
    setMotionPreset, 
    updateMotion, 
    scene, 
    updateScene 
  } = useStudioStore();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const svgContent = event.target?.result as string;
        // In real SVG parsing, paths are parsed. For preview, switch to SVG shape
        updateGeometry({ sourceType: 'svg', presetShape: 'S', customSvgPath: svgContent });
      };
      reader.readAsText(file);
    } else {
      // Raster image notification
      const url = URL.createObjectURL(file);
      updateGeometry({ sourceType: 'raster', rasterUrl: url });
    }
  };

  return (
    <aside
      style={{
        width: '320px',
        backgroundColor: 'var(--studio-panel)',
        borderLeft: '1px solid var(--studio-border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
        color: 'var(--studio-text)',
        userSelect: 'none'
      }}
      className="studio-inspector"
    >
      {/* Tab Title Header */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--studio-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--studio-bg)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--acid)', fontWeight: 700 }}>
            INSPECTOR
          </span>
          <span style={{ color: 'var(--studio-border)' }}>/</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600 }}>
            {activeTab}
          </span>
        </div>

        <button
          onClick={() => {
            if (activeTab === 'OBJECT') updateGeometry({ depth: 30, bevel: 3, scale: 1 });
            if (activeTab === 'MATERIAL') setMaterial(MATERIALS[0]);
            if (activeTab === 'LIGHT') setLightingPreset('studio');
            if (activeTab === 'MOTION') updateMotion({ speed: 1.0 });
          }}
          title="Reset tab defaults"
          style={{ color: 'var(--studio-muted)' }}
        >
          <RotateCcw size={14} />
        </button>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* ================= OBJECT TAB ================= */}
        {activeTab === 'OBJECT' && (
          <>
            {/* Source Mode Selector */}
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--studio-muted)', display: 'block', marginBottom: '8px' }}>
                INPUT SOURCE
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                <button
                  onClick={() => updateGeometry({ sourceType: 'preset' })}
                  style={{
                    padding: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    backgroundColor: geometry.sourceType === 'preset' ? 'var(--studio-border)' : 'var(--studio-bg)',
                    color: geometry.sourceType === 'preset' ? 'var(--acid)' : 'inherit',
                    border: '1px solid var(--studio-border)'
                  }}
                >
                  PRESET SYMBOL
                </button>
                <button
                  onClick={() => updateGeometry({ sourceType: 'text' })}
                  style={{
                    padding: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    backgroundColor: geometry.sourceType === 'text' ? 'var(--studio-border)' : 'var(--studio-bg)',
                    color: geometry.sourceType === 'text' ? 'var(--acid)' : 'inherit',
                    border: '1px solid var(--studio-border)'
                  }}
                >
                  TYPE TEXT
                </button>
              </div>

              {/* Text Input Mode */}
              {geometry.sourceType === 'text' && (
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--studio-muted)', display: 'block', marginBottom: '4px' }}>
                    STRING (MAX 8 CHARS)
                  </label>
                  <input
                    type="text"
                    maxLength={8}
                    value={geometry.textValue}
                    onChange={(e) => updateGeometry({ textValue: e.target.value.toUpperCase() })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      backgroundColor: 'var(--studio-bg)',
                      border: '1px solid var(--studio-border)',
                      color: 'var(--acid)',
                      fontFamily: 'var(--font-display)',
                      fontSize: '16px',
                      fontWeight: 700
                    }}
                  />
                </div>
              )}

              {/* Preset Shape Badges */}
              {geometry.sourceType === 'preset' && (
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--studio-muted)', display: 'block', marginBottom: '6px' }}>
                    VECTOR GLYPH
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {(['S', 'STAR', 'HEART', 'SMILE', 'BOLT', 'RING', 'SPINFORM'] as const).map((shape) => (
                      <button
                        key={shape}
                        onClick={() => updateGeometry({ presetShape: shape })}
                        style={{
                          padding: '6px 12px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          backgroundColor: geometry.presetShape === shape ? 'var(--acid)' : 'var(--studio-bg)',
                          color: geometry.presetShape === shape ? 'var(--ink)' : 'var(--studio-text)',
                          border: '1px solid var(--studio-border)',
                          fontWeight: 600
                        }}
                      >
                        {shape}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Dropzone */}
              <div style={{ marginTop: '14px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    backgroundColor: 'var(--studio-bg)',
                    border: '1px dashed var(--studio-border)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--studio-muted)'
                  }}
                >
                  <Upload size={14} />
                  <span>DROP SVG / LOGO FILE</span>
                  <input type="file" accept=".svg,.png,.jpg" onChange={handleFileUpload} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            {/* Geometry Sliders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--studio-muted)' }}>EXTRUSION DEPTH</span>
                  <span style={{ color: 'var(--acid)' }}>{geometry.depth}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="64"
                  value={geometry.depth}
                  onChange={(e) => updateGeometry({ depth: Number(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--acid)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--studio-muted)' }}>BEVEL RADIUS</span>
                  <span style={{ color: 'var(--acid)' }}>{geometry.bevel}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={geometry.bevel}
                  onChange={(e) => updateGeometry({ bevel: Number(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--acid)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--studio-muted)' }}>BEVEL SEGMENTS</span>
                  <span style={{ color: 'var(--acid)' }}>{geometry.bevelSegments}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={geometry.bevelSegments}
                  onChange={(e) => updateGeometry({ bevelSegments: Number(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--acid)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--studio-muted)' }}>SCALE FACTOR</span>
                  <span style={{ color: 'var(--acid)' }}>{geometry.scale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={geometry.scale}
                  onChange={(e) => updateGeometry({ scale: Number(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--acid)' }}
                />
              </div>
            </div>
          </>
        )}

        {/* ================= MATERIAL TAB ================= */}
        {activeTab === 'MATERIAL' && (
          <>
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--studio-muted)', display: 'block', marginBottom: '8px' }}>
                SELECT MATERIAL
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {MATERIALS.map((mat) => {
                  const isSelected = material.id === mat.id;
                  return (
                    <button
                      key={mat.id}
                      onClick={() => setMaterial(mat)}
                      style={{
                        padding: '10px 6px',
                        backgroundColor: isSelected ? 'var(--studio-border)' : 'var(--studio-bg)',
                        border: `1px solid ${isSelected ? 'var(--acid)' : 'var(--studio-border)'}`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: mat.color,
                          border: '1px solid rgba(255,255,255,0.2)',
                          boxShadow: isSelected ? '0 0 10px rgba(216, 255, 62, 0.4)' : 'none'
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          color: isSelected ? 'var(--acid)' : 'var(--studio-muted)',
                          textAlign: 'center',
                          lineHeight: 1.1
                        }}
                      >
                        {mat.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PBR Parameters Tuning */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid var(--studio-border)', paddingTop: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--studio-muted)' }}>ROUGHNESS</span>
                  <span style={{ color: 'var(--acid)' }}>{(material.roughness * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={material.roughness}
                  onChange={(e) => updateMaterial({ roughness: Number(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--acid)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--studio-muted)' }}>METALNESS</span>
                  <span style={{ color: 'var(--acid)' }}>{(material.metalness * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={material.metalness}
                  onChange={(e) => updateMaterial({ metalness: Number(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--acid)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--studio-muted)' }}>COLOR TINT</span>
                  <span style={{ color: 'var(--acid)' }}>{material.color}</span>
                </div>
                <input
                  type="color"
                  value={material.color}
                  onChange={(e) => updateMaterial({ color: e.target.value })}
                  style={{ width: '100%', height: '36px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                />
              </div>
            </div>
          </>
        )}

        {/* ================= LIGHT TAB ================= */}
        {activeTab === 'LIGHT' && (
          <>
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--studio-muted)', display: 'block', marginBottom: '8px' }}>
                LIGHTING ENVIRONMENT
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {(['studio', 'softbox', 'sunset', 'night', 'neon', 'dramatic'] as LightingPreset[]).map((p) => {
                  const isCurrent = lighting.preset === p;
                  return (
                    <button
                      key={p}
                      onClick={() => setLightingPreset(p)}
                      style={{
                        padding: '10px 8px',
                        backgroundColor: isCurrent ? 'var(--studio-border)' : 'var(--studio-bg)',
                        border: `1px solid ${isCurrent ? 'var(--acid)' : 'var(--studio-border)'}`,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: isCurrent ? 'var(--acid)' : 'inherit',
                        textTransform: 'uppercase'
                      }}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--studio-muted)' }}>KEY LIGHT POWER</span>
                  <span style={{ color: 'var(--acid)' }}>{lighting.keyIntensity.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="4.0"
                  step="0.1"
                  value={lighting.keyIntensity}
                  onChange={(e) => updateLighting({ keyIntensity: Number(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--acid)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--studio-muted)' }}>RIM KICKER LIGHT</span>
                  <span style={{ color: 'var(--acid)' }}>{lighting.rimIntensity.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5.0"
                  step="0.2"
                  value={lighting.rimIntensity}
                  onChange={(e) => updateLighting({ rimIntensity: Number(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--acid)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--studio-muted)' }}>EXPOSURE GAIN</span>
                  <span style={{ color: 'var(--acid)' }}>{lighting.exposure.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.05"
                  value={lighting.exposure}
                  onChange={(e) => updateLighting({ exposure: Number(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--acid)' }}
                />
              </div>
            </div>
          </>
        )}

        {/* ================= MOTION TAB ================= */}
        {activeTab === 'MOTION' && (
          <>
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--studio-muted)', display: 'block', marginBottom: '8px' }}>
                KINETIC PRESET
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {MOTION_PRESETS.map((m) => {
                  const isCurrent = motion.preset === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMotionPreset(m.id)}
                      style={{
                        padding: '10px 12px',
                        backgroundColor: isCurrent ? 'var(--studio-border)' : 'var(--studio-bg)',
                        border: `1px solid ${isCurrent ? 'var(--acid)' : 'var(--studio-border)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: isCurrent ? 'var(--acid)' : 'inherit', fontWeight: 600 }}>
                        {m.name}
                      </span>
                      <span className="tech-tag tech-tag-dark" style={{ fontSize: '9px' }}>
                        {m.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid var(--studio-border)', paddingTop: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--studio-muted)' }}>VELOCITY SPEED</span>
                  <span style={{ color: 'var(--acid)' }}>{motion.speed.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.25"
                  max="2.5"
                  step="0.05"
                  value={motion.speed}
                  onChange={(e) => updateMotion({ speed: Number(e.target.value) })}
                  style={{ width: '100%', accentColor: 'var(--acid)' }}
                />
              </div>
            </div>
          </>
        )}

        {/* ================= SCENE TAB ================= */}
        {activeTab === 'SCENE' && (
          <>
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--studio-muted)', display: 'block', marginBottom: '8px' }}>
                VIEWPORT CANVAS BACKGROUND
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {(['graphite', 'black', 'paper', 'blue', 'grid', 'acid'] as BackgroundType[]).map((bg) => {
                  const isCurrent = scene.backgroundType === bg;
                  return (
                    <button
                      key={bg}
                      onClick={() => updateScene({ backgroundType: bg })}
                      style={{
                        padding: '10px 8px',
                        backgroundColor: isCurrent ? 'var(--studio-border)' : 'var(--studio-bg)',
                        border: `1px solid ${isCurrent ? 'var(--acid)' : 'var(--studio-border)'}`,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: isCurrent ? 'var(--acid)' : 'inherit',
                        textTransform: 'uppercase'
                      }}
                    >
                      {bg}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--studio-muted)', display: 'block', marginBottom: '8px' }}>
                GROUND PLANE
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {(['none', 'grid', 'reflective', 'matte'] as const).map((floor) => {
                  const isCurrent = scene.floor === floor;
                  return (
                    <button
                      key={floor}
                      onClick={() => updateScene({ floor })}
                      style={{
                        padding: '8px',
                        backgroundColor: isCurrent ? 'var(--studio-border)' : 'var(--studio-bg)',
                        border: `1px solid ${isCurrent ? 'var(--acid)' : 'var(--studio-border)'}`,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: isCurrent ? 'var(--acid)' : 'inherit',
                        textTransform: 'uppercase'
                      }}
                    >
                      {floor}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
