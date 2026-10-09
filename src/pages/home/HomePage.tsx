import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Upload, 
  RotateCw, 
  Sun, 
  Download, 
  Sparkles, 
  Play, 
  Pause, 
  Layers, 
  Check, 
  Move, 
  Eye, 
  Code2, 
  Smartphone, 
  Monitor, 
  Tv, 
  Palette,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { useStudioStore } from '../../store/studioStore';
import { ThreeViewport } from '../../components/three/ThreeViewport';
import { MATERIALS } from '../../data/materialsData';
import { MOTION_PRESETS } from '../../data/motionData';
import { TEMPLATES } from '../../data/templatesData';
import { SHOWCASE_ITEMS } from '../../data/showcaseData';
import { MaterialConfig, MotionPresetId, LightingPreset } from '../../types';
import { useGsapScroll } from '../../hooks/useGsapScroll';
import { getFallbackImage } from '../../utils/imageFallback';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  useGsapScroll();
  const { setMaterial, setMotionPreset, loadTemplate, setCursor } = useStudioStore();

  // 1. Hero State
  const [heroMaterial, setHeroMaterial] = useState<MaterialConfig>(MATERIALS[5]); // Ceramic off-white
  const [heroBg, setHeroBg] = useState<'paper' | 'black' | 'blue' | 'grid'>('paper');

  // 2. Typing Animation State
  const typingWords = ['SPIN.', 'FLOAT.', 'BOUNCE.', 'FLIP.', 'ORBIT.', 'BREAK.', 'LOOP.', 'MOVE.'];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // 3. Flat to Form Scroll / Interactive Slider State
  const [depthStep, setDepthStep] = useState(32);
  const [bevelStep, setBevelStep] = useState(4);
  const [lightStep, setLightStep] = useState(80);

  // 4. Material Machine State
  const [activeMaterialMachineIdx, setActiveMaterialMachineIdx] = useState(0);

  // 5. Light Lab Split Slider State
  const [splitDivider, setSplitDivider] = useState(50);
  const [lightLabPreset, setLightLabPreset] = useState<LightingPreset>('studio');

  // 6. Motion Section State
  const [activeMotionPreset, setActiveMotionPreset] = useState<MotionPresetId>('spin-y');
  const [motionSpeed, setMotionSpeed] = useState(1.0);

  // 7. Timeline Prototype State
  const [timelinePlayhead, setTimelinePlayhead] = useState(1.2);
  const [isTimelinePlaying, setIsTimelinePlaying] = useState(true);

  // 8. Export Context State
  const [activeExportMockup, setActiveExportMockup] = useState<'png' | 'gif' | 'mp4' | 'webm' | 'glb' | 'embed'>('png');
  const [hoveredTemplateId, setHoveredTemplateId] = useState<string | null>(null);

  // 9. Interactive Typing Engine (40-55ms typing, 20-30ms deleting)
  useEffect(() => {
    const targetWord = typingWords[currentWordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (typedText.length < targetWord.length) {
        timeout = setTimeout(() => {
          setTypedText(targetWord.slice(0, typedText.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1200);
      }
    } else {
      if (typedText.length > 0) {
        timeout = setTimeout(() => {
          setTypedText(targetWord.slice(0, typedText.length - 1));
        }, 25);
      } else {
        setIsDeleting(false);
        setCurrentWordIdx((prev) => (prev + 1) % typingWords.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentWordIdx]);

  // Timeline simulated playback
  useEffect(() => {
    if (!isTimelinePlaying) return;
    const interval = setInterval(() => {
      setTimelinePlayhead((prev) => (prev + 0.05 > 4.0 ? 0 : prev + 0.05));
    }, 50);
    return () => clearInterval(interval);
  }, [isTimelinePlaying]);

  // Background style helper
  const getHeroBgStyle = () => {
    switch (heroBg) {
      case 'black': return { backgroundColor: 'var(--graphite)', color: '#FFFFFF' };
      case 'blue': return { backgroundColor: 'var(--electric-blue)', color: '#FFFFFF' };
      case 'grid': return { backgroundColor: '#EFECE2', color: '#111111' };
      case 'paper':
      default: return { backgroundColor: 'var(--paper)', color: 'var(--ink)' };
    }
  };

  return (
    <div className="home-page-root" style={{ width: '100%', overflowX: 'hidden' }}>
      {/* =====================================================
          HOME 01 — HERO (100svh interactive 3D playground)
          ===================================================== */}
      <section
        style={{
          position: 'relative',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'calc(var(--header-height) + 24px) clamp(20px, 4vw, 56px) 24px',
          transition: 'background-color 0.3s ease, color 0.3s ease',
          ...getHeroBgStyle()
        }}
        className={heroBg === 'grid' ? 'bg-grid-subtle' : ''}
      >
        {/* Top Floating Typography Layer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            zIndex: 5,
            pointerEvents: 'none'
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginBottom: '8px',
                color: heroBg === 'blue' ? 'var(--acid)' : 'var(--machine-orange)'
              }}
            >
              [SPINFORM v2.4 ENGINE]
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(48px, 8.5vw, 130px)',
                lineHeight: 0.88,
                letterSpacing: '-0.03em'
              }}
            >
              MAKE<br />
              YOUR<br />
              LOGO
            </h1>
          </div>

          <div style={{ textAlign: 'right', maxWidth: '340px', pointerEvents: 'auto' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14px, 1.4vw, 18px)',
                lineHeight: 1.4,
                marginBottom: '16px',
                opacity: 0.9
              }}
            >
              Upload a logo. Add depth. Choose a material. Give it motion. Export it anywhere.
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <Link
                to="/studio"
                className="btn-machine"
                onMouseEnter={() => setCursor('go')}
                onMouseLeave={() => setCursor('default')}
              >
                <span>START CREATING</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Massive Centered 3D Viewport Object */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
            pointerEvents: 'auto'
          }}
        >
          <ThreeViewport
            geometry={{
              sourceType: 'preset',
              presetShape: 'SPINFORM',
              textValue: '',
              depth: 34,
              bevel: 4,
              bevelSegments: 4,
              scale: 1.25,
              rotation: [0.1, 0.2, 0],
              position: [0, 0, 0]
            }}
            material={heroMaterial}
            motion={{
              preset: 'spin-y',
              duration: 5,
              loop: true,
              direction: 'normal',
              ease: 'none',
              speed: 0.8,
              amplitude: 1,
              isPlaying: true
            }}
            interactive={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Bottom Hero Controls & Typographic Ground Layer */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            zIndex: 5,
            pointerEvents: 'none'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end'
            }}
          >
            {/* Corner Background Switcher */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)',
                padding: '6px 10px',
                borderRadius: '2px',
                pointerEvents: 'auto',
                color: '#FFFFFF'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#D8FF3E', fontWeight: 700 }}>
                BG:
              </span>
              {(['paper', 'black', 'blue', 'grid'] as const).map((bgOption) => (
                <button
                  key={bgOption}
                  onClick={() => setHeroBg(bgOption)}
                  style={{
                    padding: '3px 8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    backgroundColor: heroBg === bgOption ? '#FFFFFF' : 'transparent',
                    color: heroBg === bgOption ? '#111111' : '#E8ECF2',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}
                >
                  {bgOption}
                </button>
              ))}
            </div>

            {/* Live Material Switcher Row */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(10px)',
                padding: '8px 12px',
                pointerEvents: 'auto'
              }}
            >
              {[
                { label: 'CERAMIC', mat: MATERIALS[5] },
                { label: 'CHROME', mat: MATERIALS[0] },
                { label: 'CLAY', mat: MATERIALS[6] },
                { label: 'GLASS', mat: MATERIALS[7] },
                { label: 'RUBBER', mat: MATERIALS[14] }
              ].map(({ label, mat }) => {
                const isActive = heroMaterial.id === mat.id;
                return (
                  <button
                    key={label}
                    onClick={() => setHeroMaterial(mat)}
                    style={{
                      padding: '6px 12px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: isActive ? '#111111' : '#FFFFFF',
                      backgroundColor: isActive ? 'var(--acid)' : 'transparent',
                      border: '1px solid rgba(255,255,255,0.2)',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={() => setCursor('apply', mat.color)}
                    onMouseLeave={() => setCursor('default')}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Giant Graphic Word: MOVE. */}
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(54px, 9vw, 140px)',
                lineHeight: 0.8,
                letterSpacing: '-0.03em',
                textAlign: 'right'
              }}
            >
              MOVE.
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE CHIVO MONO TYPING BANNER */}
      <section
        style={{
          backgroundColor: 'var(--ink)',
          color: 'var(--paper)',
          padding: '24px clamp(20px, 4vw, 56px)',
          borderTop: '2px solid var(--ink)',
          borderBottom: '2px solid var(--ink)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--acid)', fontWeight: 700, letterSpacing: '0.08em' }}>
            SPINFORM CAN MAKE IT
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(24px, 4vw, 42px)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.02em',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            {typedText}
            {/* Block underscore cursor */}
            <span
              style={{
                display: 'inline-block',
                width: '14px',
                height: '4px',
                backgroundColor: 'var(--acid)',
                marginLeft: '4px',
                verticalAlign: 'baseline',
                animation: 'pulseGlow 1s infinite'
              }}
            />
          </span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--steel)' }}>
          [0.016S LATENCY • GPU ACCELERATED]
        </div>
      </section>

      {/* =====================================================
          HOME 02 — FLAT TO FORM (Interactive Extrusion Slider)
          ===================================================== */}
      <section
        style={{
          backgroundColor: 'var(--electric-blue)',
          color: '#FFFFFF',
          padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 64px)',
          borderTop: '2px solid var(--ink)',
          borderBottom: '2px solid var(--ink)',
          position: 'relative'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.3fr',
            gap: '48px',
            alignItems: 'center'
          }}
          className="flat-to-form-grid"
        >
          {/* Left Text & Stage Breakdown */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--acid)', marginBottom: '12px', letterSpacing: '0.12em' }}>
              SIGNATURE KINEMATICS
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 7vw, 96px)', lineHeight: 0.9, marginBottom: '24px' }}>
              START FLAT.<br />
              END PHYSICAL.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', lineHeight: 1.5, opacity: 0.9, marginBottom: '32px' }}>
              Drag the dimensional throttle below to watch flat 2D vector silhouette dynamically calculate extrusion thickness, bevel chamfers, PBR normals, and physical specular bounces.
            </p>

            {/* Interactive Depth Scrub Control */}
            <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '24px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '13px', marginBottom: '10px' }}>
                <span>DRAG EXTRUSION DEPTH:</span>
                <span style={{ color: 'var(--acid)', fontWeight: 700 }}>{depthStep} PX</span>
              </div>
              <input
                type="range"
                min="0"
                max="64"
                value={depthStep}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setDepthStep(val);
                  setBevelStep(Math.round((val / 64) * 8));
                  setLightStep(Math.round(20 + (val / 64) * 80));
                }}
                style={{ width: '100%', accentColor: 'var(--acid)', height: '6px', cursor: 'ew-resize' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: 0.8 }}>
                <span>0 DEPTH (FLAT)</span>
                <span>16 DEPTH</span>
                <span>32 DEPTH</span>
                <span>64 DEPTH (MAX)</span>
              </div>
            </div>
          </div>

          {/* Right Live 3D Extrusion Canvas + Real-Time Telemetry */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                height: '460px',
                backgroundColor: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.2)',
                position: 'relative'
              }}
              className="corner-tick"
            >
              <ThreeViewport
                geometry={{
                  sourceType: 'preset',
                  presetShape: 'S',
                  textValue: '',
                  depth: depthStep,
                  bevel: bevelStep,
                  bevelSegments: 3,
                  scale: 1.15,
                  rotation: [0.2, 0.5, 0],
                  position: [0, 0, 0]
                }}
                material={MATERIALS[0]} // Chrome
                overrideDepth={depthStep}
                overrideBevel={bevelStep}
                interactive={true}
                style={{ width: '100%', height: '100%' }}
              />

              {/* Real-time Chivo Mono Telemetry Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(17, 17, 17, 0.85)',
                  border: '1px solid var(--acid)',
                  padding: '12px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  color: '#FFFFFF'
                }}
              >
                <div>DEPTH: <span style={{ color: 'var(--acid)' }}>{depthStep.toString().padStart(2, '0')} / 64</span></div>
                <div>BEVEL: <span style={{ color: 'var(--acid)' }}>{bevelStep.toString().padStart(2, '0')} / 08</span></div>
                <div>LIGHT: <span style={{ color: 'var(--acid)' }}>{lightStep.toString().padStart(3, '0')} / 100</span></div>
                <div style={{ color: depthStep === 0 ? 'var(--machine-orange)' : 'var(--cyan)', marginTop: '4px' }}>
                  {depthStep === 0 ? 'STATUS: 2D FLAT' : depthStep > 40 ? 'STATUS: SOLID PBR' : 'STATUS: EXTRUDING'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOME 03 — UPLOAD DEMO & SAMPLE PRESETS
          ===================================================== */}
      <section
        style={{
          backgroundColor: 'var(--paper)',
          padding: 'clamp(64px, 9vw, 120px) clamp(20px, 5vw, 64px)',
          borderBottom: '1px solid var(--ink)'
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--machine-orange)', letterSpacing: '0.12em', marginBottom: '12px' }}>
            TEST WITH YOUR OWN ARTWORK
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 6.5vw, 92px)', lineHeight: 0.92, marginBottom: '18px' }}>
            DROP SOMETHING HERE.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--graphite)', lineHeight: 1.5 }}>
            Upload any SVG vector monogram, client brandmark, or icon. Or click our interactive presets to inspect real-time topology right now.
          </p>
        </div>

        {/* Dropzone & Quick Presets */}
        <div
          style={{
            maxWidth: '880px',
            margin: '0 auto',
            border: '2px dashed var(--ink)',
            padding: ' clamp(36px, 6vw, 64px) 24px',
            backgroundColor: '#FAF9F5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '24px'
          }}
          className="corner-tick"
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--acid)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--ink)'
            }}
          >
            <Upload size={28} color="var(--ink)" />
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 700, marginBottom: '6px' }}>
              DRAG & DROP SVG, PNG, OR WEBP
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--warm-grey)' }}>
              Client-side vector geometry path extraction. Files never leave your local browser.
            </div>
          </div>

          <Link
            to="/studio"
            className="btn-machine"
            style={{ padding: '14px 32px' }}
          >
            <span>SELECT VECTOR FILE</span>
            <ArrowUpRight size={16} />
          </Link>

          {/* Sample Interactive Buttons */}
          <div style={{ borderTop: '1px solid rgba(17,17,17,0.15)', paddingTop: '24px', width: '100%' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--graphite)', marginBottom: '12px', fontWeight: 600 }}>
              OR TEST INSTANT STARTERS:
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {[
                { name: 'S', shape: 'S' },
                { name: 'STAR', shape: 'STAR' },
                { name: 'HEART', shape: 'HEART' },
                { name: 'SMILE', shape: 'SMILE' },
                { name: 'BOLT', shape: 'BOLT' }
              ].map(({ name, shape }) => (
                <button
                  key={name}
                  onClick={() => {
                    navigate('/studio');
                  }}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '11px' }}
                >
                  LOAD {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOME 04 — MATERIAL MACHINE (Black Background & Anton Typography)
          ===================================================== */}
      <section
        style={{
          backgroundColor: '#000000',
          color: '#FFFFFF',
          padding: 'clamp(64px, 10vw, 140px) clamp(20px, 5vw, 64px)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Giant Anton Background Watermark */}
        <div
          className="impact-word"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(100px, 20vw, 320px)',
            color: 'rgba(255, 255, 255, 0.05)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 1
          }}
        >
          {MATERIALS[activeMaterialMachineIdx]?.name.split(' ')[0] || 'CHROME'}
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--acid)', letterSpacing: '0.12em', marginBottom: '8px' }}>
              PHYSICAL FINISH MATRIX
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 7vw, 100px)', lineHeight: 0.9 }}>
              TOUCH EVERYTHING.
            </h2>
          </div>

          {/* Interactive Material Stage */}
          <div
            style={{
              height: '420px',
              maxWidth: '680px',
              margin: '0 auto 40px',
              border: '1px solid rgba(255,255,255,0.15)',
              position: 'relative'
            }}
            className="corner-tick"
          >
            <ThreeViewport
              geometry={{
                sourceType: 'preset',
                presetShape: 'S',
                textValue: '',
                depth: 34,
                bevel: 4,
                bevelSegments: 4,
                scale: 1.2,
                rotation: [0, 0, 0],
                position: [0, 0, 0]
              }}
              material={MATERIALS[activeMaterialMachineIdx]}
              motion={{
                preset: 'spin-y',
                duration: 4,
                loop: true,
                direction: 'normal',
                ease: 'none',
                speed: 0.9,
                amplitude: 1,
                isPlaying: true
              }}
              interactive={true}
              style={{ width: '100%', height: '100%' }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '20px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--acid)'
              }}
            >
              ACTIVE: {MATERIALS[activeMaterialMachineIdx].name.toUpperCase()} (ROUGHNESS: {(MATERIALS[activeMaterialMachineIdx].roughness * 100).toFixed(0)}%)
            </div>
          </div>

          {/* Material Swatch Spheres Carousel */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              maxWidth: '900px',
              margin: '0 auto'
            }}
          >
            {MATERIALS.slice(0, 10).map((mat, idx) => {
              const isSelected = activeMaterialMachineIdx === idx;
              return (
                <button
                  key={mat.id}
                  onClick={() => setActiveMaterialMachineIdx(idx)}
                  onMouseEnter={() => setCursor('apply', mat.color)}
                  onMouseLeave={() => setCursor('default')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 14px',
                    backgroundColor: isSelected ? '#222226' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${isSelected ? 'var(--acid)' : 'rgba(255,255,255,0.15)'}`,
                    borderRadius: '0px',
                    color: isSelected ? 'var(--acid)' : '#E8ECF2',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 600,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      backgroundColor: mat.color,
                      border: '1px solid rgba(255,255,255,0.3)'
                    }}
                  />
                  <span>{mat.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          HOME 05 — LIGHT LAB (Interactive Split Before/After)
          ===================================================== */}
      <section
        style={{
          backgroundColor: 'var(--graphite)',
          color: '#FFFFFF',
          padding: 'clamp(64px, 9vw, 120px) clamp(20px, 5vw, 64px)',
          borderBottom: '1px solid #36383D'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--machine-orange)', letterSpacing: '0.12em', marginBottom: '8px' }}>
                PHOTOMETRIC RIG
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px, 6vw, 84px)', lineHeight: 0.92 }}>
                LIGHT IS HALF<br />THE OBJECT.
              </h2>
            </div>

            {/* Light Presets */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {(['studio', 'softbox', 'sunset', 'neon', 'dramatic'] as LightingPreset[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setLightLabPreset(p)}
                  style={{
                    padding: '8px 14px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    backgroundColor: lightLabPreset === p ? 'var(--acid)' : 'rgba(255,255,255,0.06)',
                    color: lightLabPreset === p ? 'var(--ink)' : '#FFFFFF',
                    border: '1px solid rgba(255,255,255,0.2)',
                    textTransform: 'uppercase',
                    fontWeight: 600
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Split Viewport */}
          <div
            style={{
              height: '460px',
              backgroundColor: '#16171A',
              border: '1px solid #36383D',
              position: 'relative',
              overflow: 'hidden'
            }}
            className="corner-tick"
          >
            {/* Right Side: Full PBR Lighting */}
            <div style={{ position: 'absolute', inset: 0 }}>
              <ThreeViewport
                geometry={{
                  sourceType: 'preset',
                  presetShape: 'STAR',
                  textValue: '',
                  depth: 36,
                  bevel: 4,
                  bevelSegments: 4,
                  scale: 1.2,
                  rotation: [0.2, 0.4, 0],
                  position: [0, 0, 0]
                }}
                material={MATERIALS[2]} // 24K Gold
                lighting={{
                  preset: lightLabPreset,
                  keyIntensity: 2.2,
                  fillIntensity: 0.8,
                  rimIntensity: 3.0,
                  envIntensity: 0.9,
                  exposure: 1.1,
                  lightColor: '#ffffff'
                }}
                interactive={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* Split Comparison Range Drag Bar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${splitDivider}%`,
                width: '3px',
                backgroundColor: 'var(--acid)',
                zIndex: 10,
                cursor: 'ew-resize'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '-14px',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--acid)',
                  color: 'var(--ink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 800,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}
              >
                ↔
              </div>
            </div>

            {/* Labels */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '20px',
                backgroundColor: 'rgba(0,0,0,0.6)',
                padding: '4px 10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--steel)'
              }}
            >
              FLAT SPECULAR
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '20px',
                backgroundColor: 'rgba(0,0,0,0.6)',
                padding: '4px 10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--acid)'
              }}
            >
              PBR STUDIO RAYTRACED SHADING
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOME 06 — MOTION PRESETS (Acid Green Kinetic Energy)
          ===================================================== */}
      <section
        style={{
          backgroundColor: 'var(--acid)',
          color: 'var(--ink)',
          padding: 'clamp(64px, 10vw, 130px) clamp(20px, 5vw, 64px)',
          borderBottom: '2px solid var(--ink)'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1.3fr',
            gap: '48px',
            alignItems: 'center'
          }}
          className="motion-demo-grid"
        >
          {/* Preset List Column */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '8px' }}>
              CHOREOGRAPHY ENGINE
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 7vw, 96px)', lineHeight: 0.9, marginBottom: '24px' }}>
              NOW<br />MOVE IT.
            </h2>

            {/* Speed Slider */}
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700 }}>
                SPEED: {motionSpeed.toFixed(2)}x
              </span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[0.25, 0.5, 1.0, 2.0].map((s) => (
                  <button
                    key={s}
                    onClick={() => setMotionSpeed(s)}
                    style={{
                      padding: '4px 10px',
                      backgroundColor: motionSpeed === s ? 'var(--ink)' : 'transparent',
                      color: motionSpeed === s ? 'var(--acid)' : 'var(--ink)',
                      border: '1px solid var(--ink)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 700
                    }}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>

            {/* Vertically Listed Presets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {MOTION_PRESETS.slice(0, 8).map((preset) => {
                const isSelected = activeMotionPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setActiveMotionPreset(preset.id)}
                    onMouseEnter={() => setCursor('play')}
                    onMouseLeave={() => setCursor('default')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 16px',
                      backgroundColor: isSelected ? 'var(--ink)' : 'transparent',
                      color: isSelected ? 'var(--acid)' : 'var(--ink)',
                      border: '1px solid var(--ink)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      fontWeight: 700,
                      transition: 'all 0.12s ease'
                    }}
                  >
                    <span>{preset.name}</span>
                    <span style={{ fontSize: '10px', opacity: 0.8 }}>{preset.character}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Live 3D Kinetic Object */}
          <div>
            <div
              style={{
                height: '460px',
                backgroundColor: 'var(--ink)',
                border: '2px solid var(--ink)',
                position: 'relative'
              }}
              className="corner-tick"
            >
              <ThreeViewport
                geometry={{
                  sourceType: 'preset',
                  presetShape: 'BOLT',
                  textValue: '',
                  depth: 38,
                  bevel: 4,
                  bevelSegments: 4,
                  scale: 1.2,
                  rotation: [0, 0, 0],
                  position: [0, 0, 0]
                }}
                material={MATERIALS[15]} // Cyber Acid Plastic
                motion={{
                  preset: activeMotionPreset,
                  duration: 3,
                  loop: true,
                  direction: 'normal',
                  ease: 'back.out(1.4)',
                  speed: motionSpeed,
                  amplitude: 1,
                  isPlaying: true
                }}
                interactive={true}
                style={{ width: '100%', height: '100%' }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(216, 255, 62, 0.95)',
                  color: 'var(--ink)',
                  padding: '4px 10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 800
                }}
              >
                LIVE LOOP: {activeMotionPreset.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOME 07 — TIMELINE & MOTION BUILDER PROTOTYPE
          ===================================================== */}
      <section
        style={{
          backgroundColor: 'var(--paper)',
          padding: 'clamp(64px, 9vw, 120px) clamp(20px, 5vw, 64px)',
          borderBottom: '1px solid var(--ink)'
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--electric-blue)', letterSpacing: '0.12em', marginBottom: '8px' }}>
              KEYFRAME SEQUENCER
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px, 6vw, 84px)', lineHeight: 0.92, marginBottom: '16px' }}>
              PRESET OR<br />MAKE YOUR OWN.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '17px', color: 'var(--graphite)', maxWidth: '640px', margin: '0 auto' }}>
              Full timeline tracks with draggable keyframe diamonds. Control pitch, yaw, scale expansion, and extrusion depth across synchronized seconds.
            </p>
          </div>

          {/* Interactive Timeline Mockup Box */}
          <div
            style={{
              border: '2px solid var(--ink)',
              backgroundColor: '#FFFFFF',
              boxShadow: '8px 8px 0px var(--ink)',
              overflow: 'hidden'
            }}
          >
            {/* Controls Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 20px',
                borderBottom: '1px solid var(--ink)',
                backgroundColor: 'var(--panel)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button
                  onClick={() => setIsTimelinePlaying(!isTimelinePlaying)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'var(--ink)',
                    color: 'var(--paper)',
                    padding: '6px 14px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700
                  }}
                >
                  {isTimelinePlaying ? <Pause size={12} /> : <Play size={12} />}
                  <span>{isTimelinePlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700 }}>
                  {timelinePlayhead.toFixed(2)}s / 4.00s
                </span>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--graphite)' }}>
                30 FPS • 120 FRAMES
              </div>
            </div>

            {/* Tracks */}
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { name: 'ROTATION Y', val: '360°', color: 'var(--electric-blue)', kfs: [0, 25, 50, 75, 100] },
                { name: 'ROTATION X', val: '45°', color: 'var(--machine-orange)', kfs: [0, 50, 100] },
                { name: 'SCALE FACTOR', val: '1.2x', color: 'var(--cyan)', kfs: [0, 35, 70, 100] },
                { name: 'EXTRUDE DEPTH', val: '42px', color: 'var(--lavender)', kfs: [0, 60, 100] }
              ].map((trk) => (
                <div key={trk.name} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700 }}>
                    {trk.name}
                  </div>
                  <div
                    style={{
                      height: '24px',
                      backgroundColor: 'var(--panel)',
                      border: '1px solid rgba(17,17,17,0.2)',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      setTimelinePlayhead((x / rect.width) * 4.0);
                    }}
                  >
                    {/* Playhead Scrub Line */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: `${(timelinePlayhead / 4.0) * 100}%`,
                        width: '2px',
                        backgroundColor: 'var(--ink)',
                        zIndex: 2
                      }}
                    />

                    {/* Diamonds */}
                    {trk.kfs.map((percent, idx) => (
                      <div
                        key={idx}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: `${percent}%`,
                          transform: 'translate(-50%, -50%) rotate(45deg)',
                          width: '10px',
                          height: '10px',
                          backgroundColor: trk.color,
                          border: '1px solid var(--ink)'
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOME 08 — EXPORT & OUTPUT CONTEXTS
          ===================================================== */}
      <section
        style={{
          backgroundColor: 'var(--electric-blue)',
          color: '#FFFFFF',
          padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 64px)',
          borderBottom: '2px solid var(--ink)'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--acid)', letterSpacing: '0.12em', marginBottom: '8px' }}>
                UNIVERSAL DISPATCH
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 7vw, 96px)', lineHeight: 0.9 }}>
                OUT ANYWHERE.
              </h2>
            </div>

            {/* Mockup Format Switchers */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {(['png', 'webm', 'mp4', 'glb', 'embed'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setActiveExportMockup(fmt)}
                  style={{
                    padding: '8px 16px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    backgroundColor: activeExportMockup === fmt ? 'var(--acid)' : 'rgba(0,0,0,0.3)',
                    color: activeExportMockup === fmt ? 'var(--ink)' : '#FFFFFF',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Context Showcase Preview */}
          <div
            style={{
              height: '440px',
              backgroundColor: 'rgba(0,0,0,0.4)',
              border: '2px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: '24px'
            }}
            className="corner-tick"
          >
            {activeExportMockup === 'png' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--acid)', marginBottom: '8px' }}>
                  FORMAT: PNG ALPHA STILL (2048 × 2048)
                </div>
                <div style={{ fontSize: '18px', fontFamily: 'var(--font-display)' }}>
                  Transparent 32-bit graphic ready for Figma or Webflow hero
                </div>
              </div>
            )}
            {activeExportMockup === 'webm' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--acid)', marginBottom: '8px' }}>
                  FORMAT: VP9 WEBM ALPHA LOOP (30 FPS)
                </div>
                <div style={{ fontSize: '18px', fontFamily: 'var(--font-display)' }}>
                  Plays directly over website backgrounds without black square clipping
                </div>
              </div>
            )}
            {activeExportMockup === 'mp4' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--acid)', marginBottom: '8px' }}>
                  FORMAT: 9:16 VERTICAL MP4 REEL (60 FPS)
                </div>
                <div style={{ fontSize: '18px', fontFamily: 'var(--font-display)' }}>
                  Ready to post immediately to Instagram Reels, TikTok, or YouTube Shorts
                </div>
              </div>
            )}
            {activeExportMockup === 'glb' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--acid)', marginBottom: '8px' }}>
                  FORMAT: BINARY GLB 3D GEOMETRY
                </div>
                <div style={{ fontSize: '18px', fontFamily: 'var(--font-display)' }}>
                  Full procedural polygon mesh export for Blender, Spline, or Apple Vision Pro
                </div>
              </div>
            )}
            {activeExportMockup === 'embed' && (
              <div style={{ textAlign: 'center', maxWidth: '520px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--acid)', marginBottom: '8px' }}>
                  FORMAT: ZERO-DEPENDENCY IFRAME & SCRIPT EMBED
                </div>
                <div style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', backgroundColor: '#111111', padding: '12px', color: 'var(--cyan)' }}>
                  &lt;iframe src="https://spinform.design/embed/PROJ_DEMO" width="100%" height="480"&gt;&lt;/iframe&gt;
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          HOME 09 — USE CASES (Stacked Real-World Scenes)
          ===================================================== */}
      <section
        style={{
          backgroundColor: 'var(--paper)',
          padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 64px)',
          borderBottom: '1px solid var(--ink)'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--machine-orange)', letterSpacing: '0.12em', marginBottom: '8px' }}>
              DEPLOYMENT RUNTIME
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6.5vw, 92px)', lineHeight: 0.92 }}>
              PUT IT SOMEWHERE.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px'
            }}
            className="use-cases-grid"
          >
            {[
              {
                title: 'WEBSITE HERO EMBED',
                desc: 'Embed responsive Three.js canvas or WebM loop directly into production React, Next.js, or Webflow headers.',
                tag: 'WEBGL / EMBED',
                icon: <Monitor size={20} />
              },
              {
                title: 'SOCIAL REELS & TIKTOK',
                desc: 'Generate 9:16 vertical motion loops with dramatic lighting to catch eyes across modern social video feeds.',
                tag: '9:16 SOCIAL VIDEO',
                icon: <Smartphone size={20} />
              },
              {
                title: 'STAGE & STREAM VISUALS',
                desc: 'Loop transparent branding during DJ sets, Twitch broadcast overlays, or keynote conference presentation slides.',
                tag: 'BROADCAST / STAGE',
                icon: <Tv size={20} />
              }
            ].map((uc, i) => (
              <div
                key={i}
                style={{
                  border: '1px solid var(--ink)',
                  padding: '28px',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
                className="corner-tick"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ color: 'var(--electric-blue)' }}>{uc.icon}</div>
                  <span className="tech-tag">{uc.tag}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px' }}>
                  {uc.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--graphite)', lineHeight: 1.5 }}>
                  {uc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          HOME 10 — TEMPLATE WALL (Lavender Playground)
          ===================================================== */}
      <section
        style={{
          backgroundColor: 'var(--lavender)',
          color: 'var(--ink)',
          padding: 'clamp(64px, 10vw, 120px) clamp(20px, 5vw, 64px)',
          borderBottom: '2px solid var(--ink)'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '8px' }}>
                ONE-CLICK BLUEPRINTS
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6.5vw, 92px)', lineHeight: 0.92 }}>
                START WITH A MOVE.
              </h2>
            </div>
            <Link
              to="/templates"
              className="btn-secondary"
              style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)' }}
            >
              <span>VIEW ALL TEMPLATES</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px'
            }}
            className="home-templates-grid"
          >
            {TEMPLATES.slice(0, 6).map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => {
                  loadTemplate(tmpl);
                  navigate('/studio');
                }}
                style={{
                  border: '2px solid var(--ink)',
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  transition: 'transform 0.15s ease'
                }}
                onMouseEnter={() => {
                  setHoveredTemplateId(tmpl.id);
                  setCursor('use');
                }}
                onMouseLeave={() => {
                  setHoveredTemplateId(null);
                  setCursor('default');
                }}
              >
                <div style={{ height: '180px', backgroundColor: '#16171A', position: 'relative', overflow: 'hidden' }}>
                  {hoveredTemplateId === tmpl.id ? (
                    <ThreeViewport
                      geometry={{
                        sourceType: 'preset',
                        presetShape: tmpl.shape,
                        textValue: '',
                        depth: 30,
                        bevel: 3,
                        bevelSegments: 3,
                        scale: 1.1,
                        rotation: [0, 0, 0],
                        position: [0, 0, 0]
                      }}
                      material={MATERIALS.find(m => m.id === tmpl.materialId) || MATERIALS[0]}
                      motion={{
                        preset: tmpl.motionPreset,
                        duration: 3,
                        loop: true,
                        direction: 'normal',
                        ease: 'none',
                        speed: 1.2,
                        amplitude: 1,
                        isPlaying: true
                      }}
                      lazy={false}
                      style={{ width: '100%', height: '100%' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        perspective: '500px',
                        background: 'radial-gradient(circle at center, #22252B 0%, #16171A 100%)'
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '54px',
                          fontWeight: 800,
                          color: (MATERIALS.find(m => m.id === tmpl.materialId) || MATERIALS[0]).color,
                          transform: 'rotateY(25deg) rotateX(15deg)',
                          transition: 'transform 0.3s ease',
                          textShadow: '0 4px 14px rgba(0,0,0,0.6)'
                        }}
                      >
                        {tmpl.shape}
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '8px',
                          right: '8px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '9px',
                          color: 'var(--acid)',
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          padding: '2px 6px'
                        }}
                      >
                        HOVER FOR 3D
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700 }}>
                      {tmpl.title}
                    </span>
                    <span className="tech-tag" style={{ fontSize: '10px' }}>
                      {tmpl.category}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--graphite)', lineHeight: 1.4 }}>
                    {tmpl.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          HOME 11 — SHOWCASE (Black Editorial Made By People)
          ===================================================== */}
      <section
        style={{
          backgroundColor: '#111111',
          color: '#FFFFFF',
          padding: 'clamp(64px, 10vw, 130px) clamp(20px, 5vw, 64px)',
          borderBottom: '2px solid rgba(255,255,255,0.1)'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--acid)', letterSpacing: '0.12em', marginBottom: '8px' }}>
              CREATOR COMMUNITY
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 7vw, 100px)', lineHeight: 0.9 }}>
              MADE BY PEOPLE.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px'
            }}
            className="home-showcase-grid"
          >
            {SHOWCASE_ITEMS.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                to={`/showcase/${item.slug}`}
                style={{
                  border: '1px solid #36383D',
                  backgroundColor: '#1B1D20',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={() => setCursor('open', item.accentColor)}
                onMouseLeave={() => setCursor('default')}
              >
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={item.image}
                    alt={item.brandName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = getFallbackImage(item.brandName, item.accentColor);
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      padding: '4px 8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: item.accentColor,
                      border: `1px solid ${item.accentColor}`
                    }}
                  >
                    {item.brandName}
                  </div>
                </div>

                <div style={{ padding: '20px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#898C92', marginBottom: '4px' }}>
                    {item.creator}
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#FFFFFF', marginBottom: '8px' }}>
                    {item.projectType}
                  </h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#A9A69D', lineHeight: 1.5 }}>
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          HOME 12 — FINAL CTA (Acid Background Call to Action)
          ===================================================== */}
      <section
        style={{
          backgroundColor: 'var(--acid)',
          color: 'var(--ink)',
          padding: 'clamp(80px, 12vw, 160px) clamp(20px, 5vw, 64px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 8.5vw, 130px)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              marginBottom: '20px'
            }}
          >
            YOUR LOGO<br />
            IS STILL FLAT.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '16px',
              fontWeight: 700,
              marginBottom: '36px',
              letterSpacing: '0.05em'
            }}
          >
            Fix that right now.
          </p>

          <Link
            to="/studio"
            className="btn-machine"
            style={{
              backgroundColor: 'var(--ink)',
              color: 'var(--acid)',
              fontSize: '16px',
              padding: '20px 48px'
            }}
            onMouseEnter={() => setCursor('go')}
            onMouseLeave={() => setCursor('default')}
          >
            <span>OPEN SPINFORM →</span>
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .flat-to-form-grid, .motion-demo-grid {
            grid-template-columns: 1fr !important;
          }
          .use-cases-grid, .home-templates-grid {
            grid-template-columns: 1fr !important;
          }
          .home-showcase-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
