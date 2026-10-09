import * as THREE from 'three';
import { MaterialConfig } from '../types';

/**
 * Creates procedural high-quality Three.js MeshPhysicalMaterial from MaterialConfig
 */
export function createPhysicalMaterial(config: MaterialConfig): THREE.Material {
  const isGlass = config.transmission && config.transmission > 0.1;

  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(config.color),
    roughness: config.roughness,
    metalness: config.metalness,
    clearcoat: config.clearcoat ?? 0.0,
    clearcoatRoughness: config.clearcoatRoughness ?? 0.1,
    transmission: config.transmission ?? 0.0,
    ior: config.ior ?? 1.5,
    thickness: config.thickness ?? 0.5,
    wireframe: Boolean(config.wireframe),
    emissive: config.emissive ? new THREE.Color(config.emissive) : new THREE.Color(0x000000),
    emissiveIntensity: config.emissiveIntensity ?? 0.0,
    flatShading: false,
    reflectivity: 0.9,
    envMapIntensity: 1.2
  });

  if (isGlass) {
    mat.transparent = true;
    mat.opacity = 1.0;
  }

  return mat;
}
