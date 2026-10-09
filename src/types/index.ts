export type MaterialCategory = 'basic' | 'metal' | 'glass' | 'stone' | 'soft' | 'experimental';

export interface MaterialConfig {
  id: string;
  name: string;
  category: MaterialCategory;
  color: string;
  roughness: number;
  metalness: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  transmission?: number;
  ior?: number;
  thickness?: number;
  wireframe?: boolean;
  emissive?: string;
  emissiveIntensity?: number;
  description?: string;
  macroLabel?: string;
}

export type LightingPreset = 'studio' | 'softbox' | 'sunset' | 'night' | 'product' | 'dramatic' | 'neon';

export interface LightingConfig {
  preset: LightingPreset;
  keyIntensity: number;
  fillIntensity: number;
  rimIntensity: number;
  envIntensity: number;
  exposure: number;
  lightColor: string;
}

export type MotionPresetId = 
  | 'none'
  | 'spin-y' 
  | 'spin-x' 
  | 'spin-z' 
  | 'tumble' 
  | 'float' 
  | 'bounce' 
  | 'pulse' 
  | 'orbit' 
  | 'wave' 
  | 'snap' 
  | 'flip' 
  | 'drift'
  | 'reveal';

export interface MotionConfig {
  preset: MotionPresetId;
  duration: number;
  loop: boolean;
  direction: 'normal' | 'reverse' | 'alternate';
  ease: string;
  speed: number;
  amplitude: number;
  isPlaying: boolean;
}

export type BackgroundType = 'paper' | 'black' | 'blue' | 'graphite' | 'grid' | 'acid' | 'transparent';

export interface SceneConfig {
  backgroundType: BackgroundType;
  customColor: string;
  floor: 'none' | 'matte' | 'reflective' | 'grid';
  shadow: 'none' | 'soft' | 'hard';
  cameraType: 'perspective' | 'orthographic';
}

export type ObjectSource = 'svg' | 'preset' | 'text' | 'raster';

export interface GeometryConfig {
  sourceType: ObjectSource;
  presetShape: 'S' | 'STAR' | 'HEART' | 'SMILE' | 'BOLT' | 'SPINFORM' | 'RING';
  textValue: string;
  customSvgPath?: string;
  rasterUrl?: string;
  depth: number; // 0 - 64+
  bevel: number; // 0 - 8
  bevelSegments: number; // 1 - 5
  scale: number;
  rotation: [number, number, number];
  position: [number, number, number];
}

export type ExportFormat = 'png' | 'gif' | 'mp4' | 'webm' | 'glb' | 'embed';

export interface ExportSettings {
  format: ExportFormat;
  resolution: '1080' | '2048' | '4096';
  aspectRatio: '16:9' | '1:1' | '4:5' | '9:16';
  fps: 24 | 30 | 60;
  transparentBg: boolean;
  loopDuration: number; // seconds
}

export interface StudioProject {
  id: string;
  title: string;
  modifiedAt: string;
  geometry: GeometryConfig;
  material: MaterialConfig;
  lighting: LightingConfig;
  motion: MotionConfig;
  scene: SceneConfig;
  thumbnailUrl?: string;
}

export type CursorMode = 
  | 'default'
  | 'rotate'
  | 'adjust'
  | 'use'
  | 'apply'
  | 'play'
  | 'open'
  | 'go'
  | 'drag'
  | 'zoom';

export interface TemplateItem {
  id: string;
  title: string;
  category: string;
  materialId: string;
  motionPreset: MotionPresetId;
  shape: GeometryConfig['presetShape'];
  description: string;
  tags: string[];
}

export interface ShowcaseItem {
  id: string;
  slug: string;
  brandName: string;
  projectType: string;
  creator: string;
  material: string;
  motion: string;
  exportFormat: string;
  aspect: string;
  description: string;
  settingsNotes: string;
  image: string;
  accentColor: string;
}

export interface TutorialItem {
  id: string;
  slug: string;
  title: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  summary: string;
  steps: { title: string; content: string; tip?: string }[];
}
