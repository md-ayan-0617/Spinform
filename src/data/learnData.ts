import { TutorialItem } from '../types';

export const TUTORIALS: TutorialItem[] = [
  {
    id: 'first-3d-logo',
    slug: 'first-3d-logo',
    title: 'YOUR FIRST 3D LOGO IN 60 SECONDS',
    duration: '4 MIN',
    difficulty: 'Beginner',
    category: 'START HERE',
    summary: 'A fast start guide to dropping any vector SVG into SPINFORM, adjusting extrusion depth, and rendering a high-res still.',
    steps: [
      {
        title: '01. PREPARING YOUR VECTOR FILE',
        content: 'Export your logo from Figma or Illustrator as clean SVG paths. Ensure all strokes are outlined into closed compound fills so the extrude algorithm creates solid volume without interior self-intersections.',
        tip: 'Always outline text glyphs before exporting to prevent missing glyph fallback.'
      },
      {
        title: '02. DRAGGING INTO SPINFORM',
        content: 'Drop your SVG directly onto the Studio canvas. The engine parses path coordinate strings into Three.js Shape paths and computes the centroid bounding box to center your object immediately.',
      },
      {
        title: '03. TUNING DEPTH & BEVEL RATIO',
        content: 'Begin with 24px depth and 3px bevel. Bevel thickness rounds sharp vector silhouettes, giving light highlights an angle to catch specular studio reflections.',
        tip: 'For bold logos, increase bevel segments to 3 or 4 for silky-smooth edge roll-offs.'
      },
      {
        title: '04. INSTANT EXPORT',
        content: 'Hit Export in the top bar. Choose PNG Transparent at 2048px or download a WebM video loop ready for your pitch deck or portfolio.'
      }
    ]
  },
  {
    id: 'pbr-materials',
    slug: 'pbr-materials',
    title: 'PBR MATERIALS: CHROME, GLASS & CERAMIC',
    duration: '8 MIN',
    difficulty: 'Intermediate',
    category: 'MATERIALS',
    summary: 'Understand the science of roughness, metalness, and transmission to achieve photorealistic finishes inside the browser.',
    steps: [
      {
        title: '01. THE METALNESS / ROUGHNESS EQUATION',
        content: 'Dielectric materials (ceramic, clay, rubber) use 0.0 metalness. Conductive metals (chrome, gold, titanium) use 0.9–1.0 metalness. Lower roughness (<0.1) creates mirror specular sheen, while higher values (>0.7) diffuse light softly.'
      },
      {
        title: '02. GLASS TRANSMISSION & IOR',
        content: 'To produce optical glass, set transmission to 0.92, roughness to 0.04, and Index of Refraction (IOR) to 1.52. This physically models Snell’s law inside the WebGL shader.'
      },
      {
        title: '03. ENVIRONMENT LIGHT MATTERS',
        content: 'A chrome logo in total darkness is black. Metallic surfaces mirror whatever environment wraps around them. Switch to "Sunset" or "Studio Softbox" for bright, dimensional specular curves.'
      }
    ]
  },
  {
    id: 'seamless-brand-loops',
    slug: 'seamless-brand-loops',
    title: 'SEAMLESS KINETIC LOOPS & EASING',
    duration: '5 MIN',
    difficulty: 'Intermediate',
    category: 'MOTION',
    summary: 'Design zero-jitter continuous loops for website hero embeds and social reels using mathematical easing.',
    steps: [
      {
        title: '01. CHOOSING BETWEEN LINEAR & HARMONIC',
        content: 'Turntables require Linear ("none") easing with exact 360-degree delta to eliminate stutter at the loop boundary. Levitating floats use cosine harmonic sine curves with matching start and end velocities.'
      },
      {
        title: '02. MECHANICAL SNAP OVER SHOOT',
        content: 'For tech and gaming brands, configure 90-degree snap rotations with back.out(1.4) overshoot. This simulates spring inertia and physical mass.'
      }
    ]
  },
  {
    id: 'web-embeds',
    slug: 'web-embeds',
    title: 'EMBEDDING INTERACTIVE 3D IN REACT & WEBFLOW',
    duration: '7 MIN',
    difficulty: 'Advanced',
    category: 'WEB EMBEDS',
    summary: 'How to use SPINFORM lightweight embeds or GLB exports inside production websites with smooth 60fps performance.',
    steps: [
      {
        title: '01. EXPORTING OPTIMIZED GLB',
        content: 'SPINFORM computes non-redundant indices and welds duplicate vertices before packaging into binary GLB, resulting in sub-500KB file sizes suitable for fast web loads.'
      },
      {
        title: '02. LIGHTWEIGHT IFRAME & SCRIPT EMBEDS',
        content: 'Use our zero-dependency embed snippet that pauses execution when offscreen via IntersectionObserver to preserve laptop battery.'
      }
    ]
  }
];
