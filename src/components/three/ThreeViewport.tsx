import React, { useEffect, useRef, useState, Component, ReactNode, CSSProperties } from 'react';
import * as THREE from 'three';
import { GeometryConfig, MaterialConfig, LightingConfig, MotionConfig, SceneConfig } from '../../types';
import { createPresetShape, createTextShapes, buildExtrudedGeometry } from '../../three/shapes';
import { createPhysicalMaterial } from '../../three/materials';
import { setupLighting } from '../../three/lighting';

export interface ThreeViewportProps {
  geometry: GeometryConfig;
  material: MaterialConfig;
  lighting?: LightingConfig;
  motion?: MotionConfig;
  sceneConfig?: SceneConfig;
  interactive?: boolean;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
  className?: string;
  style?: CSSProperties;
  overrideRotation?: [number, number, number];
  overrideDepth?: number;
  overrideBevel?: number;
  lazy?: boolean;
}

/**
 * Bulletproof check for WebGL support and valid shader precision formatting.
 * Prevents Three.js from throwing 'Cannot read properties of null (reading precision)'
 */
function isWebGLAvailableSafely(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

    if (!gl) return false;

    if (typeof gl.isContextLost === 'function' && gl.isContextLost()) {
      return false;
    }

    // Verify precision format returns valid non-null objects with precision > 0
    const vertPrecision = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT);
    const fragPrecision = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);

    if (!vertPrecision || !fragPrecision) {
      return false;
    }

    if (typeof vertPrecision.precision !== 'number' || vertPrecision.precision <= 0) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * High-Quality Tactile Dimensional Fallback Component
 */
export const ThreeViewportFallback: React.FC<{
  geometry: GeometryConfig;
  material: MaterialConfig;
  className?: string;
  style?: CSSProperties;
}> = ({ geometry, material, className = '', style = {} }) => {
  const shapeLabel = geometry.sourceType === 'text' ? (geometry.textValue || 'SPIN') : (geometry.presetShape || 'S');

  return (
    <div
      className={`fallback-container ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: '#16171A',
        color: '#F1EFE9',
        fontFamily: 'var(--font-mono, monospace)',
        textAlign: 'center',
        width: '100%',
        height: '100%',
        minHeight: '260px',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Procedural 3D Layer Stack Representation */}
      <div
        style={{
          position: 'relative',
          perspective: '600px',
          margin: 'auto'
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: i === 0 ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              fontFamily: 'var(--font-display, sans-serif)',
              fontSize: 'clamp(52px, 8vw, 84px)',
              fontWeight: 800,
              color: i === 3 ? material.color : '#111111',
              transform: `translate3d(${(3 - i) * 6}px, ${-(3 - i) * 6}px, ${-i * 10}px) rotateY(15deg) rotateX(10deg)`,
              opacity: i === 3 ? 1 : 0.4 + i * 0.15,
              textShadow: i === 3 ? `0 0 20px ${material.color}66` : 'none',
              userSelect: 'none'
            }}
          >
            {shapeLabel}
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: '12px', fontSize: '10px', color: 'var(--acid, #c5f939)', letterSpacing: '0.08em' }}>
        DIMENSIONAL FALLBACK • {material.name.toUpperCase()}
      </div>
    </div>
  );
};

/**
 * ThreeViewport Internal WebGL Component
 */
const ThreeViewportInner: React.FC<ThreeViewportProps> = ({
  geometry,
  material,
  lighting,
  motion,
  sceneConfig,
  interactive = true,
  onCanvasReady,
  className = '',
  style = {},
  overrideRotation,
  overrideDepth,
  overrideBevel,
  lazy = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [isVisible, setIsVisible] = useState(!lazy);

  // References to keep Three.js state across renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Drag interaction states
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });

  // 1. Visibility tracking with IntersectionObserver
  useEffect(() => {
    if (!lazy) {
      setIsVisible(true);
      return;
    }
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [lazy]);

  // 2. Initialize Three.js renderer safely
  useEffect(() => {
    if (!isVisible) return;
    const container = containerRef.current;
    if (!container) return;

    // Fast preliminary hardware & shader precision check
    if (!isWebGLAvailableSafely()) {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Clean up any existing canvas in container
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.8);
    cameraRef.current = camera;

    // 3. Renderer with bulletproof explicit canvas & context creation
    let renderer: THREE.WebGLRenderer;
    try {
      const canvas = document.createElement('canvas');
      const gl = (canvas.getContext('webgl2', {
        antialias: true,
        alpha: true,
        powerPreference: 'default',
        preserveDrawingBuffer: true
      }) ||
      canvas.getContext('webgl', {
        antialias: true,
        alpha: true,
        powerPreference: 'default',
        preserveDrawingBuffer: true
      })) as WebGLRenderingContext | null;

      if (!gl) {
        setWebglSupported(false);
        return;
      }

      // Check precision on the actual context before Three.js touches it
      const vertPrec = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT);
      if (!vertPrec || vertPrec.precision <= 0) {
        setWebglSupported(false);
        return;
      }

      renderer = new THREE.WebGLRenderer({
        canvas,
        context: gl,
        antialias: true,
        alpha: true,
        powerPreference: 'default',
        preserveDrawingBuffer: true,
        failIfMajorPerformanceCaveat: false
      });
    } catch (err) {
      console.warn('SPINFORM: WebGL context initialization fallback engaged:', err);
      setWebglSupported(false);
      return;
    }

    // Verify context integrity
    const gl = renderer.getContext();
    if (!gl) {
      console.warn('SPINFORM: WebGL context was null');
      setWebglSupported(false);
      try { renderer.dispose(); } catch {}
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.outline = 'none';

    if (onCanvasReady) {
      onCanvasReady(renderer.domElement);
    }

    // 4. Object Group
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // Floor grid
    if (sceneConfig?.floor === 'grid') {
      const grid = new THREE.GridHelper(10, 20, 0x555555, 0x222222);
      grid.position.y = -1.6;
      scene.add(grid);
    }

    // 5. Lighting
    const defaultLightConfig: LightingConfig = lighting || {
      preset: 'studio',
      keyIntensity: 1.8,
      fillIntensity: 0.8,
      rimIntensity: 2.2,
      envIntensity: 0.8,
      exposure: 1.0,
      lightColor: '#ffffff'
    };
    setupLighting(scene, defaultLightConfig);

    // Initial Mesh Creation
    try {
      const depth = overrideDepth !== undefined ? overrideDepth : geometry.depth;
      const bevel = overrideBevel !== undefined ? overrideBevel : geometry.bevel;
      const bevelSegs = geometry.bevelSegments || 3;

      let shapes: THREE.Shape | THREE.Shape[];
      if (geometry.sourceType === 'text') {
        shapes = createTextShapes(geometry.textValue || 'SPIN');
      } else {
        shapes = createPresetShape(geometry.presetShape || 'S');
      }

      const geo = buildExtrudedGeometry(shapes, depth, bevel, bevelSegs);
      const mat = createPhysicalMaterial(material);

      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.scale.set(geometry.scale, geometry.scale, geometry.scale);

      group.add(mesh);
      meshRef.current = mesh;
    } catch (e) {
      console.warn('SPINFORM: Initial mesh generation error:', e);
    }

    // Resize Handler
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length || !rendererRef.current || !cameraRef.current) return;
      const entry = entries[0];
      const newWidth = entry.contentRect.width || 400;
      const newHeight = entry.contentRect.height || 400;

      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    });
    resizeObserver.observe(container);

    // 6. Animation Loop
    let clock = new THREE.Clock();
    let elapsedMotionTime = 0;

    const animate = () => {
      const delta = clock.getDelta();

      if (groupRef.current) {
        // Inertia damping on drag release
        if (!isDraggingRef.current) {
          groupRef.current.rotation.y += velocityRef.current.x;
          groupRef.current.rotation.x += velocityRef.current.y;
          velocityRef.current.x *= 0.94;
          velocityRef.current.y *= 0.94;
        }

        // Apply motion engine behaviors
        const motionType = (motion?.preset || motion?.type || 'none') as string;
        const isMotionPlaying = motion?.isPlaying !== false;

        if (motion && motionType !== 'none' && !isDraggingRef.current && isMotionPlaying) {
          elapsedMotionTime += delta * (motion.speed ?? 1.0);

          switch (motionType) {
            case 'spin-y':
            case 'spin':
              groupRef.current.rotation.y += delta * 1.5;
              break;

            case 'spin-x':
              groupRef.current.rotation.x += delta * 1.5;
              break;

            case 'spin-z':
            case 'pendulum':
              groupRef.current.rotation.z = Math.sin(elapsedMotionTime * 2.0) * 0.45;
              break;

            case 'tumble':
              groupRef.current.rotation.x += delta * 0.8;
              groupRef.current.rotation.y += delta * 1.2;
              groupRef.current.rotation.z += delta * 0.4;
              break;

            case 'float':
              groupRef.current.position.y = Math.sin(elapsedMotionTime * 2.2) * 0.2;
              groupRef.current.rotation.y += delta * 0.6;
              break;

            case 'bounce':
              groupRef.current.position.y = Math.abs(Math.sin(elapsedMotionTime * 3.5)) * 0.35;
              break;

            case 'pulse': {
              const s = 1.0 + Math.sin(elapsedMotionTime * 3.0) * 0.12;
              groupRef.current.scale.set(s, s, s);
              break;
            }

            case 'orbit':
              groupRef.current.position.x = Math.cos(elapsedMotionTime * 1.5) * 0.45;
              groupRef.current.position.y = Math.sin(elapsedMotionTime * 1.5) * 0.25;
              groupRef.current.rotation.y += delta * 1.0;
              break;

            case 'wave':
              groupRef.current.rotation.z = Math.sin(elapsedMotionTime * 2.5) * 0.35;
              groupRef.current.rotation.y = Math.cos(elapsedMotionTime * 1.8) * 0.4;
              break;

            case 'snap': {
              const step = Math.floor(elapsedMotionTime * 1.2);
              const targetAngle = step * (Math.PI / 2);
              groupRef.current.rotation.y += (targetAngle - groupRef.current.rotation.y) * 0.18;
              break;
            }

            case 'flip': {
              const flipPhase = Math.sin(elapsedMotionTime * 2.8);
              groupRef.current.rotation.x = flipPhase * Math.PI;
              break;
            }

            case 'drift':
              groupRef.current.rotation.y += delta * 0.3;
              groupRef.current.rotation.x = Math.sin(elapsedMotionTime * 0.8) * 0.15;
              break;

            case 'reveal':
              groupRef.current.rotation.y = Math.sin(elapsedMotionTime * 1.5) * 0.8;
              groupRef.current.position.z = Math.sin(elapsedMotionTime * 1.5) * 0.2;
              break;

            default:
              break;
          }
        }

        // Apply external override rotations if provided
        if (overrideRotation) {
          groupRef.current.rotation.set(
            overrideRotation[0],
            overrideRotation[1],
            overrideRotation[2]
          );
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        try {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        } catch {
          // Render safely handled
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      resizeObserver.disconnect();
      if (rendererRef.current) {
        try {
          rendererRef.current.dispose();
          rendererRef.current.forceContextLoss();
          if (rendererRef.current.domElement && container.contains(rendererRef.current.domElement)) {
            container.removeChild(rendererRef.current.domElement);
          }
        } catch {
          // Cleanup handled
        }
      }
      if (meshRef.current) {
        try { meshRef.current.geometry.dispose(); } catch {}
      }
    };
  }, [isVisible]);

  // Update Geometry & Material whenever props change
  useEffect(() => {
    if (!groupRef.current || !isVisible) return;

    try {
      if (meshRef.current) {
        groupRef.current.remove(meshRef.current);
        meshRef.current.geometry.dispose();
      }

      const depth = overrideDepth !== undefined ? overrideDepth : geometry.depth;
      const bevel = overrideBevel !== undefined ? overrideBevel : geometry.bevel;
      const bevelSegs = geometry.bevelSegments || 3;

      let shapes: THREE.Shape | THREE.Shape[];
      if (geometry.sourceType === 'text') {
        shapes = createTextShapes(geometry.textValue || 'SPIN');
      } else {
        shapes = createPresetShape(geometry.presetShape || 'S');
      }

      const geo = buildExtrudedGeometry(shapes, depth, bevel, bevelSegs);
      const mat = createPhysicalMaterial(material);

      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.scale.set(geometry.scale, geometry.scale, geometry.scale);

      groupRef.current.add(mesh);
      meshRef.current = mesh;
    } catch (e) {
      console.warn('SPINFORM: Geometry update warning:', e);
    }
  }, [geometry, material, overrideDepth, overrideBevel, isVisible]);

  // Update Lighting whenever lighting prop changes
  useEffect(() => {
    if (!sceneRef.current || !isVisible) return;
    if (lighting) {
      try {
        setupLighting(sceneRef.current, lighting);
      } catch {
        // Handled
      }
    }
  }, [lighting, isVisible]);

  // Pointer drag event handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !groupRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    groupRef.current.rotation.y += deltaX * 0.012;
    groupRef.current.rotation.x += deltaY * 0.012;

    velocityRef.current = {
      x: deltaX * 0.006,
      y: deltaY * 0.006
    };

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!interactive) return;
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  if (!webglSupported) {
    return <ThreeViewportFallback geometry={geometry} material={material} className={className} style={style} />;
  }

  return (
    <div
      ref={containerRef}
      className={`three-viewport-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '260px',
        overflow: 'hidden',
        cursor: interactive ? 'grab' : 'default',
        touchAction: 'none',
        ...style
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    />
  );
};

/**
 * ThreeViewport Error Boundary Wrapper
 * Guarantees zero uncaught exceptions in React component tree if WebGL crashes
 */
class ThreeViewportErrorBoundary extends Component<
  ThreeViewportProps & { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: ThreeViewportProps & { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn('SPINFORM: ThreeViewportErrorBoundary caught WebGL/render error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ThreeViewportFallback
          geometry={this.props.geometry}
          material={this.props.material}
          className={this.props.className}
          style={this.props.style}
        />
      );
    }
    return this.props.children;
  }
}

/**
 * Public Exported Component with Automatic Error Boundary
 */
export const ThreeViewport: React.FC<ThreeViewportProps> = (props) => (
  <ThreeViewportErrorBoundary {...props}>
    <ThreeViewportInner {...props} />
  </ThreeViewportErrorBoundary>
);
