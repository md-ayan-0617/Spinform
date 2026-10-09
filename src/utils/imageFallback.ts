/**
 * Dynamic fallback SVG generator for offline or network-blocked environments
 */
export function getFallbackImage(brandName: string, accentColor = '#2457FF'): string {
  const cleanName = brandName || 'SPINFORM';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <rect width="800" height="600" fill="#16171A"/>
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#111111" stop-opacity="0.95"/>
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="800" height="600" fill="url(#grid)"/>
    <circle cx="400" cy="300" r="180" fill="url(#grad)" opacity="0.3"/>
    <!-- Extruded 3D Ring Silhouette -->
    <path d="M 400 180 C 330 180 280 230 280 300 C 280 370 330 420 400 420 C 470 420 520 370 520 300 C 520 230 470 180 400 180 Z M 400 230 C 440 230 470 260 470 300 C 470 340 440 370 400 370 C 360 370 330 340 330 300 C 330 260 360 230 400 230 Z" fill="${accentColor}"/>
    <text x="400" y="500" font-family="'Chivo Mono', monospace" font-size="20" font-weight="bold" fill="#F1EFE9" text-anchor="middle" letter-spacing="4">${cleanName.toUpperCase()}</text>
    <text x="400" y="530" font-family="'Chivo Mono', monospace" font-size="12" fill="#898C92" text-anchor="middle" letter-spacing="2">3D PBR RENDER STREAM</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
