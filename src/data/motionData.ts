import { MotionPresetId } from '../types';

export interface MotionPresetDetail {
  id: MotionPresetId;
  name: string;
  tag: string;
  duration: number;
  description: string;
  recommendedSpeed: number;
  character: string;
}

export const MOTION_PRESETS: MotionPresetDetail[] = [
  {
    id: 'spin-y',
    name: '01 SPIN Y',
    tag: 'TURNTABLE',
    duration: 4.0,
    description: 'Classic endless 360° horizontal rotation for logo displays and product embeds.',
    recommendedSpeed: 1.0,
    character: 'Hypnotic & Consistent'
  },
  {
    id: 'spin-x',
    name: '02 SPIN X',
    tag: 'PITCH ROTATION',
    duration: 3.5,
    description: 'Vertical somersault flip highlighting thickness and cross-section depth.',
    recommendedSpeed: 0.8,
    character: 'Technical & Dimensional'
  },
  {
    id: 'tumble',
    name: '03 TUMBLE',
    tag: 'FREE GYRO',
    duration: 5.0,
    description: 'Multi-axis gyroscopic rotation showing all sides, bevels, and specular highlights.',
    recommendedSpeed: 0.9,
    character: 'Playful & Kinetic'
  },
  {
    id: 'float',
    name: '04 ZERO-G FLOAT',
    tag: 'LEVITATION',
    duration: 3.2,
    description: 'Smooth vertical sine hover with subtle rotational yaw, feeling weightless.',
    recommendedSpeed: 1.0,
    character: 'Ambient & Calming'
  },
  {
    id: 'bounce',
    name: '05 IMPACT BOUNCE',
    tag: 'ELASTIC DROP',
    duration: 2.4,
    description: 'Tactile squash-and-stretch vertical bounce that snaps sharply to the ground.',
    recommendedSpeed: 1.2,
    character: 'Toy-like & Punchy'
  },
  {
    id: 'pulse',
    name: '06 HEARTBEAT PULSE',
    tag: 'BREATHING SCALE',
    duration: 2.0,
    description: 'Rhythmic scale expansion and contraction with subtle specular brightening.',
    recommendedSpeed: 1.0,
    character: 'Alive & Organic'
  },
  {
    id: 'orbit',
    name: '07 ELLIPTICAL ORBIT',
    tag: 'PLANETARY PATH',
    duration: 4.8,
    description: 'Travels along an off-axis 3D ellipse while maintaining focus toward the viewer.',
    recommendedSpeed: 1.0,
    character: 'Architectural & Vast'
  },
  {
    id: 'wave',
    name: '08 SUBTLE WAVE',
    tag: 'HARMONIC SINE',
    duration: 3.0,
    description: 'Gentle figure-eight motion with tilted banking on the turns.',
    recommendedSpeed: 0.8,
    character: 'Fluid & Expressive'
  },
  {
    id: 'snap',
    name: '09 90° SNAP TURN',
    tag: 'MECHANICAL STEP',
    duration: 2.5,
    description: 'Stepped quarter-turn rotations with mechanical spring overshoot.',
    recommendedSpeed: 1.0,
    character: 'Industrial & Precise'
  },
  {
    id: 'flip',
    name: '10 180° COIN FLIP',
    tag: 'DUAL-FACE REVERSAL',
    duration: 2.2,
    description: 'Rapid 180-degree flip that settles cleanly face-forward with a spring snap.',
    recommendedSpeed: 1.0,
    character: 'Decisive & Crisp'
  },
  {
    id: 'drift',
    name: '11 ISOMETRIC DRIFT',
    tag: 'PARALLAX DRIFT',
    duration: 6.0,
    description: 'Slow diagonal travel across the frame with micro-swaying bevel reflections.',
    recommendedSpeed: 0.6,
    character: 'Cinematic & Slow'
  },
  {
    id: 'reveal',
    name: '12 EXTRUDE REVEAL',
    tag: 'ENTRY INTRO',
    duration: 2.0,
    description: 'Zooms in from 2D flat silhouette and pops outward into fully lit 3D volume.',
    recommendedSpeed: 1.0,
    character: 'Dramatic & Impactful'
  }
];
