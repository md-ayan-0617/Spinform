import * as THREE from 'three';

/**
 * Creates 2D Three.js Shape instances for procedural extrusion
 */
export function createPresetShape(type: 'S' | 'STAR' | 'HEART' | 'SMILE' | 'BOLT' | 'SPINFORM' | 'RING'): THREE.Shape {
  const shape = new THREE.Shape();

  switch (type) {
    case 'S': {
      // Bold stylized architectural S
      shape.moveTo(0.6, 1.2);
      shape.bezierCurveTo(0.6, 1.7, -0.6, 1.7, -0.6, 1.0);
      shape.bezierCurveTo(-0.6, 0.4, 0.5, 0.2, 0.5, -0.4);
      shape.bezierCurveTo(0.5, -1.2, -0.6, -1.2, -0.6, -0.7);
      shape.lineTo(-0.2, -0.6);
      shape.bezierCurveTo(-0.2, -0.9, 0.2, -0.9, 0.2, -0.4);
      shape.bezierCurveTo(0.2, 0.1, -0.9, 0.4, -0.9, 1.0);
      shape.bezierCurveTo(-0.9, 2.0, 0.9, 2.0, 0.9, 1.1);
      shape.closePath();
      return shape;
    }

    case 'STAR': {
      // 5-point star centered at (0, 0)
      const points = 5;
      const outerR = 1.3;
      const innerR = 0.58;
      for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const angle = (i * Math.PI) / points - Math.PI / 2;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      shape.closePath();
      return shape;
    }

    case 'HEART': {
      // Smooth parametric heart centered
      const scale = 0.1;
      const step = 0.05;
      let first = true;
      for (let t = 0; t <= Math.PI * 2; t += step) {
        const x = 16 * Math.pow(Math.sin(t), 3) * scale;
        const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scale;
        if (first) {
          shape.moveTo(x, y);
          first = false;
        } else {
          shape.lineTo(x, y);
        }
      }
      shape.closePath();
      return shape;
    }

    case 'BOLT': {
      // Dynamic lightning bolt
      shape.moveTo(0.1, 1.5);
      shape.lineTo(-0.8, -0.1);
      shape.lineTo(-0.1, -0.1);
      shape.lineTo(-0.4, -1.5);
      shape.lineTo(0.8, 0.1);
      shape.lineTo(0.1, 0.1);
      shape.lineTo(0.5, 1.5);
      shape.closePath();
      return shape;
    }

    case 'RING': {
      // Torus disc with hole
      const r = 1.2;
      shape.absarc(0, 0, r, 0, Math.PI * 2, false);
      const hole = new THREE.Path();
      hole.absarc(0, 0, 0.65, 0, Math.PI * 2, true);
      shape.holes.push(hole);
      return shape;
    }

    case 'SMILE': {
      // Playful circle with eyes & mouth hole
      shape.absarc(0, 0, 1.25, 0, Math.PI * 2, false);
      // Eye left
      const eyeL = new THREE.Path();
      eyeL.absarc(-0.4, 0.35, 0.16, 0, Math.PI * 2, true);
      shape.holes.push(eyeL);
      // Eye right
      const eyeR = new THREE.Path();
      eyeR.absarc(0.4, 0.35, 0.16, 0, Math.PI * 2, true);
      shape.holes.push(eyeR);
      // Smile curve
      const mouth = new THREE.Path();
      mouth.moveTo(-0.55, -0.15);
      mouth.bezierCurveTo(-0.4, -0.7, 0.4, -0.7, 0.55, -0.15);
      mouth.bezierCurveTo(0.35, -0.45, -0.35, -0.45, -0.55, -0.15);
      shape.holes.push(mouth);
      return shape;
    }

    case 'SPINFORM':
    default: {
      // Extruded SPINFORM ring glyph with modern chamfered geometry
      shape.moveTo(-1.2, 0.4);
      shape.lineTo(-1.2, 1.1);
      shape.lineTo(1.2, 1.1);
      shape.lineTo(1.2, 0.4);
      shape.lineTo(0.3, 0.4);
      shape.lineTo(0.3, -0.4);
      shape.lineTo(1.2, -0.4);
      shape.lineTo(1.2, -1.1);
      shape.lineTo(-1.2, -1.1);
      shape.lineTo(-1.2, -0.4);
      shape.lineTo(-0.3, -0.4);
      shape.lineTo(-0.3, 0.4);
      shape.closePath();
      return shape;
    }
  }
}

/**
 * Creates 2D shapes from text string using procedural block font paths
 */
export function createTextShapes(text: string): THREE.Shape[] {
  const shapes: THREE.Shape[] = [];
  const clean = (text || 'SPIN').toUpperCase().slice(0, 10);
  const letterWidth = 0.9;
  const spacing = 0.25;
  const totalWidth = clean.length * letterWidth + (clean.length - 1) * spacing;
  const startX = -totalWidth / 2;

  clean.split('').forEach((char, idx) => {
    const x = startX + idx * (letterWidth + spacing);
    const s = new THREE.Shape();
    
    // Draw character approximate bold letterform
    switch (char) {
      case 'A':
        s.moveTo(x, -0.8);
        s.lineTo(x + 0.45, 0.8);
        s.lineTo(x + 0.9, -0.8);
        s.lineTo(x + 0.65, -0.8);
        s.lineTo(x + 0.55, -0.3);
        s.lineTo(x + 0.35, -0.3);
        s.lineTo(x + 0.25, -0.8);
        s.closePath();
        break;
      case 'O':
      case '0':
        s.absarc(x + 0.45, 0, 0.55, 0, Math.PI * 2, false);
        const hole = new THREE.Path();
        hole.absarc(x + 0.45, 0, 0.28, 0, Math.PI * 2, true);
        s.holes.push(hole);
        break;
      case 'I':
      case '1':
        s.moveTo(x + 0.3, -0.8);
        s.lineTo(x + 0.3, 0.8);
        s.lineTo(x + 0.6, 0.8);
        s.lineTo(x + 0.6, -0.8);
        s.closePath();
        break;
      default:
        // Bold block glyph with notch for character identification
        s.moveTo(x, -0.8);
        s.lineTo(x, 0.8);
        s.lineTo(x + 0.85, 0.8);
        s.lineTo(x + 0.85, 0.2);
        s.lineTo(x + 0.3, 0.2);
        s.lineTo(x + 0.3, -0.1);
        s.lineTo(x + 0.75, -0.1);
        s.lineTo(x + 0.75, -0.4);
        s.lineTo(x + 0.3, -0.4);
        s.lineTo(x + 0.3, -0.8);
        s.closePath();
        break;
    }
    shapes.push(s);
  });

  return shapes;
}

/**
 * Builds ExtrudeGeometry with normalized depth & beveling
 */
export function buildExtrudedGeometry(
  shapes: THREE.Shape | THREE.Shape[],
  depth = 24,
  bevel = 3,
  bevelSegments = 3
): THREE.BufferGeometry {
  const normalizedDepth = (depth / 64) * 0.9 + 0.05;
  const normalizedBevel = (bevel / 8) * 0.12;

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: 1,
    depth: normalizedDepth,
    bevelEnabled: bevel > 0,
    bevelThickness: normalizedBevel,
    bevelSize: normalizedBevel,
    bevelOffset: 0,
    bevelSegments: Math.max(1, bevelSegments)
  };

  const geometry = new THREE.ExtrudeGeometry(shapes, extrudeSettings);
  geometry.computeVertexNormals();
  geometry.center();
  return geometry;
}
