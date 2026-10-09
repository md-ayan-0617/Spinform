import * as THREE from 'three';
import { LightingConfig } from '../types';

export function setupLighting(scene: THREE.Scene, config: LightingConfig): {
  keyLight: THREE.DirectionalLight;
  fillLight: THREE.DirectionalLight;
  rimLight: THREE.DirectionalLight;
  hemiLight: THREE.HemisphereLight;
} {
  // Clear any existing lights
  const existingLights = scene.children.filter(c => c instanceof THREE.Light);
  existingLights.forEach(l => scene.remove(l));

  let keyColor = new THREE.Color(config.lightColor || '#ffffff');
  let rimColor = new THREE.Color(0xffffff);
  let groundColor = new THREE.Color(0x222225);

  switch (config.preset) {
    case 'sunset':
      keyColor = new THREE.Color(0xffaa5e);
      rimColor = new THREE.Color(0x5533ff);
      groundColor = new THREE.Color(0x331100);
      break;
    case 'neon':
      keyColor = new THREE.Color(0x00ffff);
      rimColor = new THREE.Color(0xd8ff3e);
      groundColor = new THREE.Color(0x2457ff);
      break;
    case 'dramatic':
      keyColor = new THREE.Color(0xffffff);
      rimColor = new THREE.Color(0x88aaff);
      groundColor = new THREE.Color(0x050505);
      break;
    case 'softbox':
      keyColor = new THREE.Color(0xf5f8ff);
      rimColor = new THREE.Color(0xeef2ff);
      groundColor = new THREE.Color(0x404450);
      break;
    case 'night':
      keyColor = new THREE.Color(0x4466aa);
      rimColor = new THREE.Color(0x224488);
      groundColor = new THREE.Color(0x050510);
      break;
  }

  // Key Light (main high-angle directional)
  const keyLight = new THREE.DirectionalLight(keyColor, (config.keyIntensity ?? 1.8) * config.exposure);
  keyLight.position.set(4, 5, 4);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 25;
  scene.add(keyLight);

  // Fill Light (soft opposite low-angle)
  const fillLight = new THREE.DirectionalLight(0xffffff, (config.fillIntensity ?? 0.8) * config.exposure);
  fillLight.position.set(-4, 2, -2);
  scene.add(fillLight);

  // Rim Light (back edge kicker highlight)
  const rimLight = new THREE.DirectionalLight(rimColor, (config.rimIntensity ?? 2.2) * config.exposure);
  rimLight.position.set(0, -3, -5);
  scene.add(rimLight);

  // Ambient / Hemisphere Light
  const hemiLight = new THREE.HemisphereLight(0xffffff, groundColor, (config.envIntensity ?? 0.7) * config.exposure);
  scene.add(hemiLight);

  return { keyLight, fillLight, rimLight, hemiLight };
}
