import { MaterialConfig } from '../types';

export const MATERIALS: MaterialConfig[] = [
  {
    id: 'chrome',
    name: 'Mirror Chrome',
    category: 'metal',
    color: '#E8ECF2',
    roughness: 0.04,
    metalness: 0.98,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    description: 'Ultra-reflective specular chrome with razor-sharp studio reflections.',
    macroLabel: 'Micro-scratched mirror steel'
  },
  {
    id: 'brushed-steel',
    name: 'Brushed Aluminum',
    category: 'metal',
    color: '#CBD1D8',
    roughness: 0.32,
    metalness: 0.92,
    clearcoat: 0.2,
    description: 'Anodized industrial metallic finish with directional sheen.',
    macroLabel: 'Linear directional grain'
  },
  {
    id: 'gold',
    name: '24K Liquid Gold',
    category: 'metal',
    color: '#FFD700',
    roughness: 0.12,
    metalness: 0.95,
    clearcoat: 0.8,
    description: 'Warm, saturated precious metal with deep amber specular bounce.',
    macroLabel: 'High-purity specular bullion'
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold Alloy',
    category: 'metal',
    color: '#EAA08B',
    roughness: 0.18,
    metalness: 0.90,
    description: 'Subtle copper-tinted precious metal for contemporary luxury branding.',
    macroLabel: 'Warm copper-blended luster'
  },
  {
    id: 'titanium',
    name: 'Space Titanium',
    category: 'metal',
    color: '#5A6068',
    roughness: 0.28,
    metalness: 0.88,
    description: 'Aerospace-grade dark matte titanium with cold graphite undertones.',
    macroLabel: 'Laser-sintered grain'
  },
  {
    id: 'ceramic',
    name: 'Glazed Ceramic',
    category: 'basic',
    color: '#F3F1E9',
    roughness: 0.15,
    metalness: 0.02,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
    description: 'Tactile stoneware body with a thick glossy clear glaze.',
    macroLabel: 'Pored clay under clear glaze'
  },
  {
    id: 'clay',
    name: 'Terracotta Clay',
    category: 'soft',
    color: '#D46D50',
    roughness: 0.88,
    metalness: 0.0,
    description: 'Diffused organic matte clay with high light absorption and warm shadows.',
    macroLabel: 'Unfired powdered earth texture'
  },
  {
    id: 'clear-glass',
    name: 'Optical Glass',
    category: 'glass',
    color: '#FFFFFF',
    roughness: 0.05,
    metalness: 0.05,
    transmission: 0.92,
    ior: 1.52,
    thickness: 1.2,
    clearcoat: 1.0,
    description: 'Pure optical glass with realistic refraction and edge highlights.',
    macroLabel: 'High-refraction silica'
  },
  {
    id: 'frosted-glass',
    name: 'Frosted Acrylic',
    category: 'glass',
    color: '#F0F6FF',
    roughness: 0.45,
    metalness: 0.05,
    transmission: 0.82,
    ior: 1.45,
    thickness: 1.5,
    description: 'Softly diffuse translucent glass with internal light scattering.',
    macroLabel: 'Acid-etched diffusion surface'
  },
  {
    id: 'emerald',
    name: 'Emerald Crystal',
    category: 'glass',
    color: '#059669',
    roughness: 0.1,
    metalness: 0.1,
    transmission: 0.85,
    ior: 1.58,
    thickness: 1.8,
    description: 'Vibrant gemstone refraction with deep viridian core caustics.',
    macroLabel: 'Crystalline internal facets'
  },
  {
    id: 'matte-black',
    name: 'Obsidian Matte',
    category: 'basic',
    color: '#111317',
    roughness: 0.72,
    metalness: 0.15,
    description: 'Stealth industrial graphite absorbing ambient bounces.',
    macroLabel: 'Anodized black coating'
  },
  {
    id: 'matte-white',
    name: 'Studio Primer',
    category: 'basic',
    color: '#FBFAF5',
    roughness: 0.65,
    metalness: 0.0,
    description: 'Clean architectural neutral chalk finish for form verification.',
    macroLabel: 'Even chalk diffusion'
  },
  {
    id: 'concrete',
    name: 'Cast Concrete',
    category: 'stone',
    color: '#9E9FA4',
    roughness: 0.95,
    metalness: 0.08,
    description: 'Brutalist aggregate surface with visible pores and tactile grit.',
    macroLabel: 'Air void pitting and aggregate'
  },
  {
    id: 'marble',
    name: 'Carrara Marble',
    category: 'stone',
    color: '#E9EBF0',
    roughness: 0.22,
    metalness: 0.04,
    clearcoat: 0.7,
    description: 'Polished white Italian stone with translucent depth beneath surface.',
    macroLabel: 'Mineral crystallization'
  },
  {
    id: 'rubber',
    name: 'Synthetic Rubber',
    category: 'soft',
    color: '#FF5B2D',
    roughness: 0.82,
    metalness: 0.0,
    description: 'Tactile polymer playground material with subtle micro-specular rim.',
    macroLabel: 'Vulcanized soft elastomer'
  },
  {
    id: 'iridescent',
    name: 'Prism Holographic',
    category: 'experimental',
    color: '#63E6E2',
    roughness: 0.08,
    metalness: 0.85,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    description: 'Thin-film interference coating shifting between cyan, magenta, and silver.',
    macroLabel: 'Nano-grating optical interference'
  },
  {
    id: 'acid-plastic',
    name: 'Cyber Acid Resin',
    category: 'experimental',
    color: '#D8FF3E',
    roughness: 0.25,
    metalness: 0.05,
    clearcoat: 0.8,
    description: 'Hyper-vibrant high-voltage fluorescent polymer.',
    macroLabel: 'Cast neon acrylic substrate'
  },
  {
    id: 'electric-blue',
    name: 'Gloss Electric',
    category: 'experimental',
    color: '#2457FF',
    roughness: 0.18,
    metalness: 0.35,
    clearcoat: 0.95,
    description: 'Deep cobalt high-gloss automotive lacquer.',
    macroLabel: 'Multi-stage wet clearcoat'
  }
];

export const MATERIAL_MAP = new Map(MATERIALS.map(m => [m.id, m]));
