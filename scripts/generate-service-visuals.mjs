import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const W = 1200;
const H = 675; // 16:9

// Shared SVG helpers
const baseDefs = `
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080810"/>
      <stop offset="100%" stop-color="#050510"/>
    </linearGradient>
    <linearGradient id="purpleCyan" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8B5CF6"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>
    <linearGradient id="bluePurple" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
    <linearGradient id="cyanBlue" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#06B6D4"/>
      <stop offset="100%" stop-color="#3B82F6"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="15" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="softGlow">
      <feGaussianBlur stdDeviation="6" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.015)" stroke-width="0.5"/>
    </pattern>
    <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="0.6" fill="rgba(139,92,246,0.05)"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
`;

function node(x, y, label, grad = "purpleCyan") {
  return `
    <rect x="${x}" y="${y}" width="160" height="50" rx="12" fill="rgba(255,255,255,0.03)" stroke="url(#${grad})" stroke-width="1" stroke-opacity="0.4"/>
    <text x="${x + 80}" y="${y + 30}" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="rgba(255,255,255,0.6)">${label}</text>
  `;
}

function arrow(x1, y1, x2, y2, color = "rgba(139,92,246,0.25)") {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.5" stroke-dasharray="6 4"/>`;
}

function bigMetric(x, y, value, label) {
  return `
    <text x="${x}" y="${y}" font-family="Georgia,serif" font-size="42" font-weight="bold" fill="url(#purpleCyan)">${value}</text>
    <text x="${x}" y="${y + 22}" font-family="'Segoe UI',sans-serif" font-size="12" fill="rgba(255,255,255,0.3)">${label}</text>
  `;
}

function ambientGlow(cx, cy, rx, ry, color = "rgba(139,92,246,0.04)") {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${color}" filter="url(#glow)"/>`;
}

// ==================== SERVICE 1: Agentic AI ====================
const agenticAI = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  ${baseDefs}
  ${ambientGlow(300, 350, 300, 200)}
  ${ambientGlow(900, 250, 250, 180, "rgba(99,102,241,0.03)")}

  <!-- Title -->
  <text x="60" y="60" font-family="'Courier New',monospace" font-size="11" fill="rgba(139,92,246,0.5)" letter-spacing="4">AGENTIC AI WORKFLOW</text>

  <!-- Central brain node -->
  <circle cx="600" cy="300" r="55" fill="rgba(139,92,246,0.06)" stroke="url(#purpleCyan)" stroke-width="1.5" stroke-opacity="0.5"/>
  <circle cx="600" cy="300" r="35" fill="rgba(139,92,246,0.08)" stroke="url(#purpleCyan)" stroke-width="1" stroke-opacity="0.3"/>
  <text x="600" y="295" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="rgba(255,255,255,0.7)">AI</text>
  <text x="600" y="315" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="rgba(255,255,255,0.35)">ORCHESTRATOR</text>

  <!-- Agent nodes around -->
  ${node(120, 150, "PLANNING AGENT", "bluePurple")}
  ${node(120, 400, "EXECUTION AGENT", "bluePurple")}
  ${node(920, 150, "ANALYSIS AGENT", "cyanBlue")}
  ${node(920, 400, "LEARNING AGENT", "cyanBlue")}

  <!-- Connection lines -->
  ${arrow(280, 175, 545, 280)}
  ${arrow(280, 425, 545, 320)}
  ${arrow(920, 175, 655, 280)}
  ${arrow(920, 425, 655, 320)}

  <!-- Feedback loop arc -->
  <path d="M 655 260 Q 750 180 655 260" fill="none" stroke="rgba(6,182,212,0.15)" stroke-width="1"/>

  <!-- Data flow indicators -->
  ${node(380, 530, "INPUT DATA", "bluePurple")}
  ${arrow(460, 530, 580, 355, "rgba(59,130,246,0.2)")}
  ${node(680, 530, "OUTPUT ACTION", "cyanBlue")}
  ${arrow(620, 355, 760, 530, "rgba(6,182,212,0.2)")}

  <!-- Self-correction loop label -->
  <text x="600" y="210" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="rgba(139,92,246,0.35)">SELF-CORRECTION LOOP</text>
  <path d="M 520 215 Q 600 195 680 215" fill="none" stroke="rgba(139,92,246,0.15)" stroke-width="1" stroke-dasharray="3 3"/>

  <!-- Metrics -->
  ${bigMetric(60, 610, "94%", "Error Reduction")}
  ${bigMetric(300, 610, "12h+", "Saved / Week")}

  <!-- Border accent -->
  <rect x="0" y="0" width="${W}" height="2" fill="url(#bluePurple)" opacity="0.3"/>
  <rect x="0" y="${H - 2}" width="${W}" height="2" fill="url(#bluePurple)" opacity="0.3"/>
</svg>`;

// ==================== SERVICE 2: Voice AI ====================
const voiceAI = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  ${baseDefs}
  ${ambientGlow(600, 300, 350, 200, "rgba(139,92,246,0.035)")}

  <text x="60" y="60" font-family="'Courier New',monospace" font-size="11" fill="rgba(139,92,246,0.5)" letter-spacing="4">VOICE AI PIPELINE</text>

  <!-- Waveform visualization -->
  ${[...Array(40)].map((_, i) => {
    const x = 200 + i * 20;
    const h = 20 + Math.sin(i * 0.6) * 60 + Math.cos(i * 0.3) * 30;
    const opacity = 0.15 + Math.sin(i * 0.4) * 0.1;
    return `<rect x="${x}" y="${280 - h/2}" width="6" height="${h}" rx="3" fill="url(#purpleCyan)" opacity="${opacity}"/>`;
  }).join("")}

  <!-- Pipeline nodes -->
  ${node(80, 450, "INBOUND CALL", "purpleCyan")}
  ${arrow(240, 475, 350, 475)}
  ${node(350, 450, "NLU / STT", "purpleCyan")}
  ${arrow(510, 475, 620, 475)}
  ${node(620, 450, "AI REASONING", "bluePurple")}
  ${arrow(780, 475, 890, 475)}
  ${node(890, 450, "TTS RESPONSE", "cyanBlue")}

  <!-- Latency badge -->
  <rect x="530" y="530" width="140" height="36" rx="18" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.3)" stroke-width="1"/>
  <text x="600" y="553" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" fill="rgba(6,182,212,0.8)">&#60;500ms</text>

  <!-- Routing branches -->
  ${node(200, 150, "BOOKING", "cyanBlue")}
  ${node(500, 150, "QUALIFICATION", "bluePurple")}
  ${node(800, 150, "FAQ / SUPPORT", "purpleCyan")}
  ${arrow(260, 250, 260, 200, "rgba(6,182,212,0.15)")}
  ${arrow(540, 250, 540, 200, "rgba(99,102,241,0.15)")}
  ${arrow(840, 250, 840, 200, "rgba(139,92,246,0.15)")}

  <!-- Metrics -->
  ${bigMetric(60, 610, "3x", "Qualified Appointments")}
  ${bigMetric(350, 610, "67%", "Fewer Missed Calls")}
  ${bigMetric(650, 610, "24/7", "Availability")}

  <rect x="0" y="0" width="${W}" height="2" fill="url(#purpleCyan)" opacity="0.3"/>
  <rect x="0" y="${H - 2}" width="${W}" height="2" fill="url(#purpleCyan)" opacity="0.3"/>
</svg>`;

// ==================== SERVICE 3: Content Automation ====================
const contentAuto = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  ${baseDefs}
  ${ambientGlow(400, 300, 250, 200, "rgba(6,182,212,0.03)")}
  ${ambientGlow(800, 350, 200, 150, "rgba(59,130,246,0.03)")}

  <text x="60" y="60" font-family="'Courier New',monospace" font-size="11" fill="rgba(6,182,212,0.5)" letter-spacing="4">CONTENT GENERATION PIPELINE</text>

  <!-- Input node -->
  <rect x="60" y="260" width="180" height="70" rx="14" fill="rgba(6,182,212,0.06)" stroke="url(#cyanBlue)" stroke-width="1.5" stroke-opacity="0.4"/>
  <text x="150" y="290" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="rgba(255,255,255,0.7)">1 VIDEO</text>
  <text x="150" y="310" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="rgba(255,255,255,0.3)">INPUT SOURCE</text>

  <!-- Arrow from input -->
  ${arrow(240, 295, 340, 295)}

  <!-- AI processing -->
  <rect x="340" y="250" width="160" height="90" rx="16" fill="rgba(139,92,246,0.06)" stroke="url(#purpleCyan)" stroke-width="1.5" stroke-opacity="0.4"/>
  <text x="420" y="285" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="rgba(255,255,255,0.7)">AI ENGINE</text>
  <text x="420" y="305" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="rgba(255,255,255,0.3)">TRANSCRIBE → GENERATE</text>
  <text x="420" y="320" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="rgba(255,255,255,0.3)">→ OPTIMIZE → PUBLISH</text>

  <!-- Output branches -->
  ${arrow(500, 270, 650, 120)}
  ${arrow(500, 280, 650, 210)}
  ${arrow(500, 295, 650, 295)}
  ${arrow(500, 310, 650, 380)}
  ${arrow(500, 320, 650, 470)}

  ${node(650, 95, "5 BLOG POSTS", "cyanBlue")}
  ${node(650, 185, "10 TWEETS", "cyanBlue")}
  ${node(650, 270, "3 LINKEDIN", "bluePurple")}
  ${node(650, 355, "5 SHORT CLIPS", "purpleCyan")}
  ${node(650, 445, "EMAIL SERIES", "purpleCyan")}

  <!-- Output count badges -->
  <circle cx="870" cy="120" r="18" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.3)" stroke-width="1"/>
  <text x="870" y="125" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="rgba(6,182,212,0.8)">5</text>
  <circle cx="870" cy="210" r="18" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.3)" stroke-width="1"/>
  <text x="870" y="215" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="rgba(6,182,212,0.8)">10</text>
  <circle cx="870" cy="295" r="18" fill="rgba(99,102,241,0.08)" stroke="rgba(99,102,241,0.3)" stroke-width="1"/>
  <text x="870" y="300" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="rgba(99,102,241,0.8)">3</text>
  <circle cx="870" cy="380" r="18" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.3)" stroke-width="1"/>
  <text x="870" y="385" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="rgba(139,92,246,0.8)">5</text>
  <circle cx="870" cy="470" r="18" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.3)" stroke-width="1"/>
  <text x="870" y="475" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="rgba(139,92,246,0.8)">N</text>

  <!-- Total output label -->
  <text x="1020" y="290" font-family="Georgia,serif" font-size="36" font-weight="bold" fill="url(#cyanBlue)">40+</text>
  <text x="1020" y="315" font-family="'Courier New',monospace" font-size="10" fill="rgba(255,255,255,0.3)">PIECES / WEEK</text>

  ${bigMetric(60, 610, "10x", "Content Output")}
  ${bigMetric(350, 610, "0", "Additional Headcount")}

  <rect x="0" y="0" width="${W}" height="2" fill="url(#cyanBlue)" opacity="0.3"/>
  <rect x="0" y="${H - 2}" width="${W}" height="2" fill="url(#cyanBlue)" opacity="0.3"/>
</svg>`;

// ==================== SERVICE 4: Enterprise Automation ====================
const enterpriseAuto = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  ${baseDefs}
  ${ambientGlow(600, 320, 300, 200, "rgba(59,130,246,0.035)")}

  <text x="60" y="60" font-family="'Courier New',monospace" font-size="11" fill="rgba(59,130,246,0.5)" letter-spacing="4">ENTERPRISE INTEGRATION ARCHITECTURE</text>

  <!-- Central hub -->
  <circle cx="600" cy="310" r="60" fill="rgba(59,130,246,0.06)" stroke="url(#bluePurple)" stroke-width="1.5" stroke-opacity="0.4"/>
  <circle cx="600" cy="310" r="40" fill="rgba(59,130,246,0.08)" stroke="url(#bluePurple)" stroke-width="1" stroke-opacity="0.3"/>
  <text x="600" y="305" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="rgba(255,255,255,0.7)">n8n</text>
  <text x="600" y="323" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="rgba(255,255,255,0.3)">ORCHESTRATOR</text>

  <!-- Surrounding system nodes -->
  ${node(100, 120, "SALESFORCE", "bluePurple")}
  ${node(350, 80, "HUBSPOT", "bluePurple")}
  ${node(750, 80, "AIRTABLE", "purpleCyan")}
  ${node(960, 120, "GHL", "purpleCyan")}
  ${node(100, 430, "SLACK", "cyanBlue")}
  ${node(350, 480, "STRIPE", "cyanBlue")}
  ${node(750, 480, "ZAPIER", "bluePurple")}
  ${node(960, 430, "MAKE.COM", "purpleCyan")}

  <!-- Connections to hub -->
  ${arrow(260, 145, 545, 290, "rgba(59,130,246,0.2)")}
  ${arrow(430, 105, 560, 270, "rgba(59,130,246,0.2)")}
  ${arrow(830, 105, 640, 270, "rgba(139,92,246,0.2)")}
  ${arrow(960, 145, 655, 290, "rgba(139,92,246,0.2)")}
  ${arrow(260, 455, 545, 330, "rgba(6,182,212,0.2)")}
  ${arrow(430, 505, 560, 350, "rgba(6,182,212,0.2)")}
  ${arrow(830, 505, 640, 350, "rgba(59,130,246,0.2)")}
  ${arrow(960, 455, 655, 330, "rgba(139,92,246,0.2)")}

  <!-- Data flow particles (small dots along paths) -->
  <circle cx="400" cy="200" r="2" fill="rgba(59,130,246,0.4)" filter="url(#softGlow)"/>
  <circle cx="350" cy="350" r="2" fill="rgba(6,182,212,0.4)" filter="url(#softGlow)"/>
  <circle cx="800" cy="200" r="2" fill="rgba(139,92,246,0.4)" filter="url(#softGlow)"/>
  <circle cx="850" cy="380" r="2" fill="rgba(139,92,246,0.4)" filter="url(#softGlow)"/>

  <!-- Zero-touch badge -->
  <rect x="500" y="400" width="200" height="36" rx="18" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.3)" stroke-width="1"/>
  <text x="600" y="423" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="rgba(59,130,246,0.7)">ZERO-TOUCH FLOW</text>

  ${bigMetric(60, 610, "200+", "Workflows Deployed")}
  ${bigMetric(350, 610, "&#60;90s", "Execution Time")}
  ${bigMetric(650, 610, "6h", "Saved Per Onboarding")}

  <rect x="0" y="0" width="${W}" height="2" fill="url(#bluePurple)" opacity="0.3"/>
  <rect x="0" y="${H - 2}" width="${W}" height="2" fill="url(#bluePurple)" opacity="0.3"/>
</svg>`;

// ==================== SERVICE 5: AI Consulting ====================
const aiConsulting = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  ${baseDefs}
  ${ambientGlow(600, 300, 300, 200, "rgba(139,92,246,0.035)")}

  <text x="60" y="60" font-family="'Courier New',monospace" font-size="11" fill="rgba(139,92,246,0.5)" letter-spacing="4">AI CONSULTING &amp; ENABLEMENT</text>

  <!-- 3-phase roadmap -->
  <!-- Phase 1 -->
  <rect x="80" y="130" width="280" height="200" rx="16" fill="rgba(59,130,246,0.04)" stroke="rgba(59,130,246,0.15)" stroke-width="1"/>
  <text x="100" y="165" font-family="'Courier New',monospace" font-size="10" fill="rgba(59,130,246,0.6)" letter-spacing="3">PHASE 01</text>
  <text x="100" y="195" font-family="Georgia,serif" font-size="20" fill="rgba(255,255,255,0.7)">Audit &amp; Strategy</text>
  <text x="100" y="225" font-family="'Segoe UI',sans-serif" font-size="12" fill="rgba(255,255,255,0.3)">Operations mapping</text>
  <text x="100" y="245" font-family="'Segoe UI',sans-serif" font-size="12" fill="rgba(255,255,255,0.3)">ROI identification</text>
  <text x="100" y="265" font-family="'Segoe UI',sans-serif" font-size="12" fill="rgba(255,255,255,0.3)">Technology selection</text>
  <text x="100" y="285" font-family="'Segoe UI',sans-serif" font-size="12" fill="rgba(255,255,255,0.3)">Implementation roadmap</text>

  <!-- Phase 2 -->
  ${arrow(360, 230, 430, 230)}
  <rect x="430" y="130" width="280" height="200" rx="16" fill="rgba(139,92,246,0.04)" stroke="rgba(139,92,246,0.15)" stroke-width="1"/>
  <text x="450" y="165" font-family="'Courier New',monospace" font-size="10" fill="rgba(139,92,246,0.6)" letter-spacing="3">PHASE 02</text>
  <text x="450" y="195" font-family="Georgia,serif" font-size="20" fill="rgba(255,255,255,0.7)">Build &amp; Deploy</text>
  <text x="450" y="225" font-family="'Segoe UI',sans-serif" font-size="12" fill="rgba(255,255,255,0.3)">Custom AI agents</text>
  <text x="450" y="245" font-family="'Segoe UI',sans-serif" font-size="12" fill="rgba(255,255,255,0.3)">Internal tools</text>
  <text x="450" y="265" font-family="'Segoe UI',sans-serif" font-size="12" fill="rgba(255,255,255,0.3)">Knowledge systems</text>
  <text x="450" y="285" font-family="'Segoe UI',sans-serif" font-size="12" fill="rgba(255,255,255,0.3)">Production deployment</text>

  <!-- Phase 3 -->
  ${arrow(710, 230, 780, 230)}
  <rect x="780" y="130" width="280" height="200" rx="16" fill="rgba(6,182,212,0.04)" stroke="rgba(6,182,212,0.15)" stroke-width="1"/>
  <text x="800" y="165" font-family="'Courier New',monospace" font-size="10" fill="rgba(6,182,212,0.6)" letter-spacing="3">PHASE 03</text>
  <text x="800" y="195" font-family="Georgia,serif" font-size="20" fill="rgba(255,255,255,0.7)">Train &amp; Scale</text>
  <text x="800" y="225" font-family="'Segoe UI',sans-serif" font-size="12" fill="rgba(255,255,255,0.3)">Team enablement</text>
  <text x="800" y="245" font-family="'Segoe UI',sans-serif" font-size="12" fill="rgba(255,255,255,0.3)">Hands-on workshops</text>
  <text x="800" y="265" font-family="'Segoe UI',sans-serif" font-size="12" fill="rgba(255,255,255,0.3)">Documentation &amp; SOPs</text>
  <text x="800" y="285" font-family="'Segoe UI',sans-serif" font-size="12" fill="rgba(255,255,255,0.3)">Ongoing evolution</text>

  <!-- Progress bar -->
  <rect x="80" y="380" width="980" height="4" rx="2" fill="rgba(255,255,255,0.03)"/>
  <rect x="80" y="380" width="980" height="4" rx="2" fill="url(#purpleCyan)" opacity="0.25"/>
  <circle cx="80" cy="382" r="6" fill="rgba(59,130,246,0.3)" stroke="rgba(59,130,246,0.5)" stroke-width="1.5"/>
  <circle cx="570" cy="382" r="6" fill="rgba(139,92,246,0.3)" stroke="rgba(139,92,246,0.5)" stroke-width="1.5"/>
  <circle cx="1060" cy="382" r="6" fill="rgba(6,182,212,0.3)" stroke="rgba(6,182,212,0.5)" stroke-width="1.5"/>

  <!-- Timeline labels -->
  <text x="80" y="410" font-family="'Courier New',monospace" font-size="9" fill="rgba(255,255,255,0.2)">WEEK 1-2</text>
  <text x="540" y="410" font-family="'Courier New',monospace" font-size="9" fill="rgba(255,255,255,0.2)">WEEK 2-4</text>
  <text x="1010" y="410" font-family="'Courier New',monospace" font-size="9" fill="rgba(255,255,255,0.2)">WEEK 4-6</text>

  <!-- Outcomes panel -->
  <rect x="80" y="450" width="980" height="80" rx="12" fill="rgba(139,92,246,0.03)" stroke="rgba(139,92,246,0.08)" stroke-width="1"/>
  <text x="120" y="480" font-family="'Courier New',monospace" font-size="10" fill="rgba(139,92,246,0.5)" letter-spacing="3">OUTCOMES</text>
  <text x="120" y="510" font-family="Georgia,serif" font-size="24" font-weight="bold" fill="url(#purpleCyan)">40</text>
  <text x="160" y="510" font-family="'Segoe UI',sans-serif" font-size="12" fill="rgba(255,255,255,0.3)">employees trained</text>
  <text x="370" y="510" font-family="Georgia,serif" font-size="24" font-weight="bold" fill="url(#purpleCyan)">89%</text>
  <text x="430" y="510" font-family="'Segoe UI',sans-serif" font-size="12" fill="rgba(255,255,255,0.3)">AI adoption rate</text>
  <text x="650" y="510" font-family="Georgia,serif" font-size="24" font-weight="bold" fill="url(#purpleCyan)">6</text>
  <text x="675" y="510" font-family="'Segoe UI',sans-serif" font-size="12" fill="rgba(255,255,255,0.3)">weeks to full deployment</text>

  <rect x="0" y="0" width="${W}" height="2" fill="url(#purpleCyan)" opacity="0.3"/>
  <rect x="0" y="${H - 2}" width="${W}" height="2" fill="url(#purpleCyan)" opacity="0.3"/>
</svg>`;

// ==================== Generate all ====================
const services = [
  { name: "agentic-ai", svg: agenticAI },
  { name: "voice-ai", svg: voiceAI },
  { name: "content-automation", svg: contentAuto },
  { name: "enterprise-automation", svg: enterpriseAuto },
  { name: "ai-consulting", svg: aiConsulting },
];

async function generate() {
  for (const s of services) {
    const out = path.join(__dirname, "..", "public", "images", "services", `${s.name}.png`);
    await sharp(Buffer.from(s.svg)).png({ quality: 95 }).toFile(out);
    const fs = await import("fs");
    const size = (fs.statSync(out).size / 1024).toFixed(1);
    console.log(`✅ ${s.name}.png (${size} KB)`);
  }
  console.log("\nAll 5 service visuals generated!");
}

generate().catch(console.error);
