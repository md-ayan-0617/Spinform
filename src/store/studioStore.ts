import { create } from 'zustand';
import { 
  GeometryConfig, 
  MaterialConfig, 
  LightingConfig, 
  MotionConfig, 
  SceneConfig, 
  ExportSettings, 
  CursorMode,
  StudioProject,
  TemplateItem,
  LightingPreset,
  MotionPresetId
} from '../types';
import { MATERIALS } from '../data/materialsData';
import { soundManager } from '../utils/soundfx';

interface StudioState {
  // 3D Model Configuration
  geometry: GeometryConfig;
  material: MaterialConfig;
  lighting: LightingConfig;
  motion: MotionConfig;
  scene: SceneConfig;
  exportSettings: ExportSettings;

  // UI State
  activeTab: 'OBJECT' | 'MATERIAL' | 'LIGHT' | 'MOTION' | 'SCENE';
  activeTool: 'select' | 'rotate' | 'move' | 'scale' | 'camera';
  isTimelineCollapsed: boolean;
  cursorMode: CursorMode;
  cursorColor: string | null;
  soundEnabled: boolean;
  isCommandPaletteOpen: boolean;
  isExportModalOpen: boolean;
  isEmbedModalOpen: boolean;
  resetCameraCounter: number;

  // Saved Projects List
  savedProjects: StudioProject[];
  currentProjectId: string | null;

  // Actions
  setActiveTab: (tab: 'OBJECT' | 'MATERIAL' | 'LIGHT' | 'MOTION' | 'SCENE') => void;
  setActiveTool: (tool: 'select' | 'rotate' | 'move' | 'scale' | 'camera') => void;
  updateGeometry: (updater: Partial<GeometryConfig>) => void;
  setMaterial: (mat: MaterialConfig) => void;
  updateMaterial: (updater: Partial<MaterialConfig>) => void;
  setLightingPreset: (preset: LightingPreset) => void;
  updateLighting: (updater: Partial<LightingConfig>) => void;
  setMotionPreset: (preset: MotionPresetId) => void;
  updateMotion: (updater: Partial<MotionConfig>) => void;
  updateScene: (updater: Partial<SceneConfig>) => void;
  updateExportSettings: (updater: Partial<ExportSettings>) => void;
  setCursor: (mode: CursorMode, color?: string | null) => void;
  toggleTimeline: () => void;
  toggleSound: () => void;
  setCommandPalette: (open: boolean) => void;
  setExportModal: (open: boolean) => void;
  setEmbedModal: (open: boolean) => void;
  triggerResetCamera: () => void;
  loadTemplate: (template: TemplateItem) => void;
  saveProject: (title?: string) => void;
  loadProject: (project: StudioProject) => void;
  deleteProject: (id: string) => void;
}

const DEFAULT_PROJECTS: StudioProject[] = [
  {
    id: 'demo-s-chrome',
    title: 'SPINFORM Identity 01',
    modifiedAt: 'Just now',
    geometry: {
      sourceType: 'preset',
      presetShape: 'S',
      textValue: 'SPIN',
      depth: 32,
      bevel: 3,
      bevelSegments: 3,
      scale: 1.0,
      rotation: [0, 0, 0],
      position: [0, 0, 0]
    },
    material: MATERIALS[0], // Chrome
    lighting: {
      preset: 'studio',
      keyIntensity: 1.8,
      fillIntensity: 0.8,
      rimIntensity: 2.2,
      envIntensity: 0.8,
      exposure: 1.0,
      lightColor: '#ffffff'
    },
    motion: {
      preset: 'spin-y',
      duration: 4.0,
      loop: true,
      direction: 'normal',
      ease: 'none',
      speed: 1.0,
      amplitude: 1.0,
      isPlaying: true
    },
    scene: {
      backgroundType: 'graphite',
      customColor: '#16171A',
      floor: 'reflective',
      shadow: 'soft',
      cameraType: 'perspective'
    }
  },
  {
    id: 'demo-bolt-acid',
    title: 'Cyber Bolt Motion Loop',
    modifiedAt: '2 hours ago',
    geometry: {
      sourceType: 'preset',
      presetShape: 'BOLT',
      textValue: 'BOLT',
      depth: 42,
      bevel: 4,
      bevelSegments: 4,
      scale: 1.0,
      rotation: [0, 0, 0],
      position: [0, 0, 0]
    },
    material: MATERIALS.find(m => m.id === 'acid-plastic') || MATERIALS[0],
    lighting: {
      preset: 'neon',
      keyIntensity: 2.0,
      fillIntensity: 1.0,
      rimIntensity: 3.0,
      envIntensity: 1.0,
      exposure: 1.1,
      lightColor: '#d8ff3e'
    },
    motion: {
      preset: 'snap',
      duration: 2.5,
      loop: true,
      direction: 'normal',
      ease: 'back.out(1.4)',
      speed: 1.0,
      amplitude: 1.0,
      isPlaying: true
    },
    scene: {
      backgroundType: 'black',
      customColor: '#111111',
      floor: 'grid',
      shadow: 'hard',
      cameraType: 'perspective'
    }
  }
];

export const useStudioStore = create<StudioState>((set, get) => ({
  geometry: {
    sourceType: 'preset',
    presetShape: 'S',
    textValue: 'SPIN',
    depth: 30,
    bevel: 3,
    bevelSegments: 3,
    scale: 1.0,
    rotation: [0, 0, 0],
    position: [0, 0, 0]
  },
  material: MATERIALS[0], // Chrome
  lighting: {
    preset: 'studio',
    keyIntensity: 1.8,
    fillIntensity: 0.8,
    rimIntensity: 2.2,
    envIntensity: 0.8,
    exposure: 1.0,
    lightColor: '#ffffff'
  },
  motion: {
    preset: 'spin-y',
    duration: 4.0,
    loop: true,
    direction: 'normal',
    ease: 'none',
    speed: 1.0,
    amplitude: 1.0,
    isPlaying: true
  },
  scene: {
    backgroundType: 'graphite',
    customColor: '#16171A',
    floor: 'reflective',
    shadow: 'soft',
    cameraType: 'perspective'
  },
  exportSettings: {
    format: 'png',
    resolution: '2048',
    aspectRatio: '1:1',
    fps: 30,
    transparentBg: true,
    loopDuration: 4
  },

  activeTab: 'OBJECT',
  activeTool: 'rotate',
  isTimelineCollapsed: false,
  cursorMode: 'default',
  cursorColor: null,
  soundEnabled: soundManager.isEnabled(),
  isCommandPaletteOpen: false,
  isExportModalOpen: false,
  isEmbedModalOpen: false,
  resetCameraCounter: 0,

  savedProjects: DEFAULT_PROJECTS,
  currentProjectId: null,

  setActiveTab: (tab) => {
    soundManager.playClick();
    set({ activeTab: tab });
  },

  setActiveTool: (tool) => {
    soundManager.playClick();
    set({ activeTool: tool });
  },

  updateGeometry: (updater) => {
    soundManager.playExtrudeTick();
    set((state) => ({ geometry: { ...state.geometry, ...updater } }));
  },

  setMaterial: (mat) => {
    soundManager.playMaterialSwitch();
    set({ material: mat });
  },

  updateMaterial: (updater) => {
    set((state) => ({ material: { ...state.material, ...updater } }));
  },

  setLightingPreset: (preset) => {
    soundManager.playClick();
    set((state) => ({ lighting: { ...state.lighting, preset } }));
  },

  updateLighting: (updater) => {
    set((state) => ({ lighting: { ...state.lighting, ...updater } }));
  },

  setMotionPreset: (preset) => {
    soundManager.playSnap();
    set((state) => ({ motion: { ...state.motion, preset } }));
  },

  updateMotion: (updater) => {
    set((state) => ({ motion: { ...state.motion, ...updater } }));
  },

  updateScene: (updater) => {
    set((state) => ({ scene: { ...state.scene, ...updater } }));
  },

  updateExportSettings: (updater) => {
    set((state) => ({ exportSettings: { ...state.exportSettings, ...updater } }));
  },

  setCursor: (mode, color = null) => {
    set({ cursorMode: mode, cursorColor: color });
  },

  toggleTimeline: () => {
    soundManager.playClick();
    set((state) => ({ isTimelineCollapsed: !state.isTimelineCollapsed }));
  },

  toggleSound: () => {
    const next = soundManager.toggle();
    set({ soundEnabled: next });
  },

  setCommandPalette: (open) => {
    if (open) soundManager.playSnap();
    set({ isCommandPaletteOpen: open });
  },

  setExportModal: (open) => {
    if (open) soundManager.playSnap();
    set({ isExportModalOpen: open });
  },

  setEmbedModal: (open) => {
    if (open) soundManager.playSnap();
    set({ isEmbedModalOpen: open });
  },

  triggerResetCamera: () => {
    soundManager.playClick();
    set((state) => ({ resetCameraCounter: state.resetCameraCounter + 1 }));
  },

  loadTemplate: (template) => {
    soundManager.playMaterialSwitch();
    const mat = MATERIALS.find(m => m.id === template.materialId) || MATERIALS[0];
    set((state) => ({
      geometry: {
        ...state.geometry,
        presetShape: template.shape,
        sourceType: 'preset'
      },
      material: mat,
      motion: {
        ...state.motion,
        preset: template.motionPreset
      }
    }));
  },

  saveProject: (title) => {
    soundManager.playSnap();
    const state = get();
    const newProject: StudioProject = {
      id: `proj-${Date.now()}`,
      title: title || `Project #${state.savedProjects.length + 1}`,
      modifiedAt: 'Just now',
      geometry: { ...state.geometry },
      material: { ...state.material },
      lighting: { ...state.lighting },
      motion: { ...state.motion },
      scene: { ...state.scene }
    };

    set({
      savedProjects: [newProject, ...state.savedProjects],
      currentProjectId: newProject.id
    });
  },

  loadProject: (project) => {
    soundManager.playSnap();
    set({
      geometry: { ...project.geometry },
      material: { ...project.material },
      lighting: { ...project.lighting },
      motion: { ...project.motion },
      scene: { ...project.scene },
      currentProjectId: project.id
    });
  },

  deleteProject: (id) => {
    soundManager.playClick();
    set((state) => ({
      savedProjects: state.savedProjects.filter(p => p.id !== id)
    }));
  }
}));
