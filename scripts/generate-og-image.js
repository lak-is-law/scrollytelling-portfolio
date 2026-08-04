const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function createOgImage() {
  const width = 1200;
  const height = 630;

  // Read the emblem/logo
  const emblemPath = path.join(__dirname, '../public/emblem.png');
  let emblemBuffer;
  
  if (fs.existsSync(emblemPath)) {
    emblemBuffer = await sharp(emblemPath)
      .resize(220, 220, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
  }

  // Base64 encode the emblem for embedding into SVG if needed, or composite via sharp
  const emblemBase64 = emblemBuffer ? `data:image/png;base64,${emblemBuffer.toString('base64')}` : '';

  // Design an ultra-sleek, futuristic dark luxury SVG for 1200x630
  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradients -->
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#05070c"/>
        <stop offset="50%" stop-color="#0a0f1d"/>
        <stop offset="100%" stop-color="#040609"/>
      </linearGradient>

      <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#06b6d4"/>
        <stop offset="50%" stop-color="#3b82f6"/>
        <stop offset="100%" stop-color="#8b5cf6"/>
      </linearGradient>

      <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#94a3b8"/>
      </linearGradient>

      <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#22d3ee"/>
        <stop offset="100%" stop-color="#818cf8"/>
      </linearGradient>

      <radialGradient id="ambientCyan" cx="15%" cy="35%" r="50%">
        <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#06b6d4" stop-opacity="0"/>
      </radialGradient>

      <radialGradient id="ambientPurple" cx="85%" cy="65%" r="55%">
        <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
      </radialGradient>

      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
      </pattern>

      <!-- Glow Filters -->
      <filter id="badgeGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#06b6d4" flood-opacity="0.4"/>
      </filter>

      <filter id="logoGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="8" stdDeviation="20" flood-color="#06b6d4" flood-opacity="0.3"/>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
    <rect width="${width}" height="${height}" fill="url(#ambientCyan)"/>
    <rect width="${width}" height="${height}" fill="url(#ambientPurple)"/>
    <rect width="${width}" height="${height}" fill="url(#grid)"/>

    <!-- Subtle Tech Borders / Frame -->
    <rect x="24" y="24" width="1152" height="582" rx="20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
    <rect x="24" y="24" width="1152" height="582" rx="20" fill="none" stroke="url(#cyanGlow)" stroke-width="1.5" stroke-opacity="0.3" stroke-dasharray="100 800"/>

    <!-- Corner Decorative Accents -->
    <path d="M 36 60 L 36 36 L 60 36" fill="none" stroke="#22d3ee" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 1164 60 L 1164 36 L 1140 36" fill="none" stroke="#818cf8" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 36 570 L 36 594 L 60 594" fill="none" stroke="#818cf8" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 1164 570 L 1164 594 L 1140 594" fill="none" stroke="#22d3ee" stroke-width="2.5" stroke-linecap="round"/>

    <!-- Top Badge -->
    <g transform="translate(80, 75)">
      <rect x="0" y="0" width="280" height="34" rx="17" fill="rgba(6, 182, 212, 0.1)" stroke="rgba(34, 211, 238, 0.3)" stroke-width="1"/>
      <circle cx="18" cy="17" r="4" fill="#22d3ee">
        <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/>
      </circle>
      <text x="32" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif" font-size="12" font-weight="700" letter-spacing="2" fill="#22d3ee">CREATIVE AI ENGINEER</text>
    </g>

    <!-- Main Content Left Column (Text) -->
    <!-- Name -->
    <text x="80" y="200" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif" font-size="64" font-weight="900" letter-spacing="-1.5" fill="url(#textGrad)">
      Lakshya Agarwal
    </text>

    <!-- Title / Subtitle -->
    <text x="80" y="252" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif" font-size="24" font-weight="600" fill="url(#accentGrad)" letter-spacing="0.5">
      Full Stack Architect &amp; Interactive AI Developer
    </text>

    <!-- Description -->
    <text x="80" y="310" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif" font-size="18" font-weight="400" fill="#94a3b8" letter-spacing="0.2">
      High-end scrollytelling experience, generative AI pipelines,
    </text>
    <text x="80" y="338" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif" font-size="18" font-weight="400" fill="#94a3b8" letter-spacing="0.2">
      neural web applications, and precision-engineered interactive systems.
    </text>

    <!-- Tech Tags Row -->
    <g transform="translate(80, 395)">
      <!-- Tag 1 -->
      <rect x="0" y="0" width="130" height="36" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <text x="65" y="23" font-family="monospace" font-size="13" font-weight="600" fill="#e2e8f0" text-anchor="middle">Next.js 14</text>

      <!-- Tag 2 -->
      <rect x="142" y="0" width="150" height="36" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <text x="217" y="23" font-family="monospace" font-size="13" font-weight="600" fill="#e2e8f0" text-anchor="middle">Scrollytelling</text>

      <!-- Tag 3 -->
      <rect x="304" y="0" width="165" height="36" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <text x="386" y="23" font-family="monospace" font-size="13" font-weight="600" fill="#e2e8f0" text-anchor="middle">Deep Learning</text>

      <!-- Tag 4 -->
      <rect x="481" y="0" width="140" height="36" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <text x="551" y="23" font-family="monospace" font-size="13" font-weight="600" fill="#e2e8f0" text-anchor="middle">Web Audio</text>
    </g>

    <!-- Bottom Footer Bar -->
    <g transform="translate(80, 520)">
      <line x1="0" y1="0" x2="1040" y2="0" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      
      <!-- Domain Pill -->
      <rect x="0" y="16" width="180" height="36" rx="18" fill="rgba(6, 182, 212, 0.15)" stroke="rgba(34, 211, 238, 0.4)" stroke-width="1"/>
      <text x="90" y="39" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#38bdf8" text-anchor="middle">lakshya.uk</text>

      <!-- Status Indicator -->
      <g transform="translate(200, 24)">
        <circle cx="10" cy="10" r="4" fill="#10b981"/>
        <text x="22" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" fill="#94a3b8">Interactive 60fps Experience</text>
      </g>

      <!-- Right note -->
      <text x="1040" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" fill="#64748b" text-anchor="end">Explore Portfolio →</text>
    </g>

    <!-- Right Side Logo Card / Visual Emblem Presentation -->
    <g transform="translate(830, 110)">
      <!-- Outer Card Glow -->
      <rect x="0" y="0" width="290" height="350" rx="24" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1.5" filter="url(#logoGlow)"/>
      <rect x="0" y="0" width="290" height="350" rx="24" fill="none" stroke="url(#cyanGlow)" stroke-width="1.5" stroke-opacity="0.4"/>
      
      <!-- Inner Emblem Container -->
      <rect x="25" y="25" width="240" height="240" rx="16" fill="#000000" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1"/>
      
      ${emblemBase64 ? `<image href="${emblemBase64}" x="35" y="35" width="220" height="220" preserveAspectRatio="xMidYMid meet"/>` : ''}

      <!-- Emblem Label -->
      <text x="145" y="305" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#f8fafc" letter-spacing="1" text-anchor="middle">LAKSHYA AGARWAL</text>
      <text x="145" y="325" font-family="monospace" font-size="11" font-weight="500" fill="#38bdf8" letter-spacing="1.5" text-anchor="middle">LK MONOGRAM</text>
    </g>
  </svg>
  `;

  const ogPngBuffer = await sharp(Buffer.from(svgOverlay))
    .png({ quality: 100 })
    .toBuffer();

  // Save 1200x630 OG image in public
  fs.writeFileSync(path.join(__dirname, '../public/og-image.png'), ogPngBuffer);
  console.log('Saved public/og-image.png (1200x630)');

  // Save in src/app for Next.js App Router automatic static OG/Twitter route handling
  fs.writeFileSync(path.join(__dirname, '../src/app/opengraph-image.png'), ogPngBuffer);
  fs.writeFileSync(path.join(__dirname, '../src/app/twitter-image.png'), ogPngBuffer);
  console.log('Saved src/app/opengraph-image.png and twitter-image.png');

  // Also create a 600x600 square version for platforms preferring 1:1 previews (e.g. WhatsApp compact)
  const squareSvg = `
  <svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGradSq" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#05070c"/>
        <stop offset="50%" stop-color="#0a0f1d"/>
        <stop offset="100%" stop-color="#040609"/>
      </linearGradient>
      <radialGradient id="ambCyanSq" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#06b6d4" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="cyanGlowSq" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#06b6d4"/>
        <stop offset="100%" stop-color="#8b5cf6"/>
      </linearGradient>
    </defs>
    <rect width="600" height="600" fill="url(#bgGradSq)"/>
    <rect width="600" height="600" fill="url(#ambCyanSq)"/>
    <rect x="20" y="20" width="560" height="560" rx="24" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
    <rect x="20" y="20" width="560" height="560" rx="24" fill="none" stroke="url(#cyanGlowSq)" stroke-width="1.5" stroke-opacity="0.4"/>
    
    <!-- Emblem container -->
    <rect x="160" y="80" width="280" height="280" rx="20" fill="#000000" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
    ${emblemBase64 ? `<image href="${emblemBase64}" x="175" y="95" width="250" height="250" preserveAspectRatio="xMidYMid meet"/>` : ''}

    <text x="300" y="415" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="32" font-weight="900" fill="#ffffff" letter-spacing="-0.5" text-anchor="middle">Lakshya Agarwal</text>
    <text x="300" y="450" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#22d3ee" letter-spacing="1.5" text-anchor="middle">CREATIVE AI ENGINEER</text>
    
    <!-- URL Pill -->
    <rect x="220" y="490" width="160" height="36" rx="18" fill="rgba(6, 182, 212, 0.15)" stroke="rgba(34, 211, 238, 0.4)" stroke-width="1"/>
    <text x="300" y="513" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#38bdf8" text-anchor="middle">lakshya.uk</text>
  </svg>
  `;

  const squareBuffer = await sharp(Buffer.from(squareSvg)).png({ quality: 100 }).toBuffer();
  fs.writeFileSync(path.join(__dirname, '../public/og-image-square.png'), squareBuffer);
  console.log('Saved public/og-image-square.png (600x600)');
}

createOgImage().catch(console.error);
