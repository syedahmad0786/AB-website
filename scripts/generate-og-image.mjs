import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, "..", "public", "images", "og-default.webp");

// OG Image dimensions
const WIDTH = 1200;
const HEIGHT = 630;

// Create the OG image with SVG overlay on a dark background
const svgImage = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background gradient -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050505"/>
      <stop offset="40%" stop-color="#0a0a12"/>
      <stop offset="100%" stop-color="#050510"/>
    </linearGradient>

    <!-- Purple accent gradient -->
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8B5CF6"/>
      <stop offset="50%" stop-color="#6366F1"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>

    <!-- Text gradient -->
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C4B5FD"/>
      <stop offset="50%" stop-color="#818CF8"/>
      <stop offset="100%" stop-color="#67E8F9"/>
    </linearGradient>

    <!-- Glow filter -->
    <filter id="glow">
      <feGaussianBlur stdDeviation="20" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Subtle glow -->
    <filter id="subtleGlow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Dot pattern -->
    <pattern id="dots" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="0.8" fill="rgba(139,92,246,0.06)"/>
    </pattern>

    <!-- Grid pattern -->
    <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="0.5"/>
    </pattern>
  </defs>

  <!-- Dark background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>

  <!-- Grid overlay -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>

  <!-- Dot pattern -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#dots)"/>

  <!-- Large ambient glow - top right -->
  <ellipse cx="900" cy="100" rx="400" ry="300" fill="rgba(139,92,246,0.04)" filter="url(#glow)"/>

  <!-- Large ambient glow - bottom left -->
  <ellipse cx="200" cy="500" rx="350" ry="250" fill="rgba(99,102,241,0.03)" filter="url(#glow)"/>

  <!-- Decorative circuit lines -->
  <line x1="0" y1="200" x2="120" y2="200" stroke="rgba(139,92,246,0.08)" stroke-width="1"/>
  <line x1="120" y1="200" x2="120" y2="430" stroke="rgba(139,92,246,0.08)" stroke-width="1"/>
  <circle cx="120" cy="200" r="3" fill="rgba(139,92,246,0.15)"/>
  <circle cx="120" cy="430" r="3" fill="rgba(139,92,246,0.15)"/>

  <line x1="1200" y1="350" x2="1080" y2="350" stroke="rgba(99,102,241,0.08)" stroke-width="1"/>
  <line x1="1080" y1="350" x2="1080" y2="150" stroke="rgba(99,102,241,0.08)" stroke-width="1"/>
  <circle cx="1080" cy="350" r="3" fill="rgba(99,102,241,0.15)"/>
  <circle cx="1080" cy="150" r="3" fill="rgba(99,102,241,0.15)"/>

  <!-- Top border glow line -->
  <rect x="0" y="0" width="${WIDTH}" height="2" fill="url(#accent)" opacity="0.3"/>

  <!-- AB Monogram - top left -->
  <text x="80" y="85" font-family="Georgia, 'Times New Roman', serif" font-size="32" font-weight="bold" fill="url(#textGrad)" letter-spacing="4">AB</text>
  <rect x="80" y="95" width="52" height="2" fill="url(#accent)" opacity="0.5" rx="1"/>

  <!-- Section label -->
  <text x="80" y="210" font-family="'Courier New', monospace" font-size="13" fill="rgba(139,92,246,0.6)" letter-spacing="6" text-transform="uppercase">AI AUTOMATION ARCHITECT</text>

  <!-- Main Name -->
  <text x="80" y="290" font-family="Georgia, 'Times New Roman', serif" font-size="62" font-weight="bold" fill="white" letter-spacing="-1">Ahmad Bukhari</text>

  <!-- Tagline with gradient -->
  <text x="80" y="355" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="url(#textGrad)" font-style="italic">Building Autonomous AI Systems</text>

  <!-- Description -->
  <text x="80" y="410" font-family="'Segoe UI', Arial, sans-serif" font-size="17" fill="rgba(255,255,255,0.4)" letter-spacing="0.3">
    <tspan>Agentic AI · Voice AI · Enterprise Automation · 200+ Workflows Deployed</tspan>
  </text>

  <!-- Divider line -->
  <rect x="80" y="445" width="200" height="1" fill="url(#accent)" opacity="0.3" rx="0.5"/>

  <!-- Stats row -->
  <text x="80" y="490" font-family="Georgia, 'Times New Roman', serif" font-size="28" font-weight="bold" fill="white">200+</text>
  <text x="175" y="490" font-family="'Segoe UI', Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.3)">Workflows</text>

  <text x="310" y="490" font-family="Georgia, 'Times New Roman', serif" font-size="28" font-weight="bold" fill="white">40%</text>
  <text x="385" y="490" font-family="'Segoe UI', Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.3)">Avg Conversion Lift</text>

  <text x="570" y="490" font-family="Georgia, 'Times New Roman', serif" font-size="28" font-weight="bold" fill="white">70%</text>
  <text x="640" y="490" font-family="'Segoe UI', Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.3)">Task Reduction</text>

  <!-- URL -->
  <text x="80" y="565" font-family="'Courier New', monospace" font-size="15" fill="rgba(139,92,246,0.5)" letter-spacing="2">ahmadbukhari.com</text>

  <!-- Bottom accent line -->
  <rect x="0" y="${HEIGHT - 3}" width="${WIDTH}" height="3" fill="url(#accent)" opacity="0.5"/>

  <!-- Decorative corner brackets -->
  <!-- Top-left -->
  <path d="M 50 40 L 50 25 L 65 25" fill="none" stroke="rgba(139,92,246,0.15)" stroke-width="1.5"/>
  <!-- Bottom-right -->
  <path d="M 1150 590 L 1150 605 L 1135 605" fill="none" stroke="rgba(139,92,246,0.15)" stroke-width="1.5"/>

  <!-- Small floating dots decoration -->
  <circle cx="950" cy="250" r="2" fill="rgba(139,92,246,0.2)" filter="url(#subtleGlow)"/>
  <circle cx="980" cy="300" r="1.5" fill="rgba(99,102,241,0.15)"/>
  <circle cx="920" cy="320" r="1" fill="rgba(6,182,212,0.15)"/>
  <circle cx="1000" cy="270" r="1.5" fill="rgba(139,92,246,0.12)"/>
  <circle cx="940" cy="280" r="2.5" fill="rgba(99,102,241,0.08)" filter="url(#subtleGlow)"/>
</svg>`;

async function generate() {
  console.log("Generating OG image (1200×630)...");

  await sharp(Buffer.from(svgImage))
    .webp({ quality: 95 })
    .toFile(outputPath);

  console.log(`✅ OG image saved to: ${outputPath}`);

  // Get file info
  const fs = await import("fs");
  const stats = fs.statSync(outputPath);
  console.log(`   Size: ${(stats.size / 1024).toFixed(1)} KB`);
}

generate().catch(console.error);
