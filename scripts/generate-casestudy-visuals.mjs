import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const W = 1200;
const H = 514; // 21:9 aspect ratio

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
      <feGaussianBlur stdDeviation="5" result="b"/>
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

function node(x, y, label, grad = "purpleCyan", w = 140) {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="44" rx="10" fill="rgba(255,255,255,0.03)" stroke="url(#${grad})" stroke-width="1" stroke-opacity="0.4"/>
    <text x="${x + w/2}" y="${y + 27}" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="rgba(255,255,255,0.6)">${label}</text>
  `;
}

function arrow(x1, y1, x2, y2, color = "rgba(139,92,246,0.25)") {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
}

function metricCard(x, y, value, label, grad = "purpleCyan") {
  return `
    <rect x="${x}" y="${y}" width="160" height="80" rx="12" fill="rgba(255,255,255,0.02)" stroke="url(#${grad})" stroke-width="0.5" stroke-opacity="0.2"/>
    <text x="${x + 80}" y="${y + 40}" text-anchor="middle" font-family="Georgia,serif" font-size="30" font-weight="bold" fill="url(#${grad})">${value}</text>
    <text x="${x + 80}" y="${y + 62}" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="rgba(255,255,255,0.3)">${label}</text>
  `;
}

function ambientGlow(cx, cy, rx, ry, color = "rgba(139,92,246,0.04)") {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${color}" filter="url(#glow)"/>`;
}

// ==================== CASE STUDY 1: Self-Healing CRM ====================
const selfHealingCRM = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  ${baseDefs}
  ${ambientGlow(600, 250, 350, 200, "rgba(59,130,246,0.03)")}

  <text x="60" y="50" font-family="'Courier New',monospace" font-size="10" fill="rgba(59,130,246,0.5)" letter-spacing="4">CASE STUDY: SELF-HEALING CRM</text>
  <text x="60" y="75" font-family="Georgia,serif" font-size="22" fill="rgba(255,255,255,0.7)">Multi-Agent Data Quality System</text>

  <!-- CRM database icon -->
  <rect x="500" y="120" width="200" height="80" rx="14" fill="rgba(59,130,246,0.06)" stroke="url(#bluePurple)" stroke-width="1.5" stroke-opacity="0.4"/>
  <text x="600" y="155" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="rgba(255,255,255,0.7)">CRM DATABASE</text>
  <text x="600" y="175" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="rgba(255,255,255,0.3)">SALESFORCE / HUBSPOT</text>

  <!-- Agent nodes -->
  ${node(100, 230, "DEDUP AGENT", "bluePurple")}
  ${node(300, 230, "ENRICH AGENT", "purpleCyan")}
  ${node(530, 230, "AUDIT AGENT", "purpleCyan")}
  ${node(760, 230, "FLAG AGENT", "cyanBlue")}
  ${node(960, 230, "REPORT AGENT", "cyanBlue")}

  <!-- Connections -->
  ${arrow(170, 230, 170, 200, "rgba(59,130,246,0.2)")}
  ${arrow(370, 230, 500, 200, "rgba(139,92,246,0.2)")}
  ${arrow(600, 230, 600, 200, "rgba(139,92,246,0.2)")}
  ${arrow(830, 230, 700, 200, "rgba(6,182,212,0.2)")}

  <!-- Flow arrows between agents -->
  ${arrow(240, 252, 300, 252)}
  ${arrow(440, 252, 530, 252)}
  ${arrow(670, 252, 760, 252)}
  ${arrow(900, 252, 960, 252)}

  <!-- Continuous loop indicator -->
  <path d="M 170 280 Q 170 340 600 340 Q 1030 340 1030 280" fill="none" stroke="rgba(139,92,246,0.1)" stroke-width="1" stroke-dasharray="4 4"/>
  <text x="600" y="360" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="rgba(139,92,246,0.3)">CONTINUOUS SELF-HEALING LOOP</text>

  <!-- Result metrics -->
  ${metricCard(180, 400, "94%", "Error Reduction", "bluePurple")}
  ${metricCard(420, 400, "12h+", "Saved / Rep / Week", "purpleCyan")}
  ${metricCard(660, 400, "30d", "Full ROI Payback", "cyanBlue")}

  <rect x="0" y="0" width="${W}" height="2" fill="url(#bluePurple)" opacity="0.4"/>
  <rect x="0" y="${H - 2}" width="${W}" height="2" fill="url(#bluePurple)" opacity="0.4"/>
</svg>`;

// ==================== CASE STUDY 2: Voice Concierge ====================
const voiceConcierge = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  ${baseDefs}
  ${ambientGlow(600, 250, 300, 180, "rgba(139,92,246,0.035)")}

  <text x="60" y="50" font-family="'Courier New',monospace" font-size="10" fill="rgba(139,92,246,0.5)" letter-spacing="4">CASE STUDY: 24/7 CONCIERGE</text>
  <text x="60" y="75" font-family="Georgia,serif" font-size="22" fill="rgba(255,255,255,0.7)">AI Voice Agent for Real Estate</text>

  <!-- Call flow -->
  <circle cx="150" cy="220" r="40" fill="rgba(139,92,246,0.06)" stroke="url(#purpleCyan)" stroke-width="1.5" stroke-opacity="0.4"/>
  <text x="150" y="215" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="rgba(255,255,255,0.6)">CALL</text>
  <text x="150" y="232" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="rgba(255,255,255,0.3)">INBOUND</text>

  ${arrow(190, 220, 280, 220)}

  <!-- Vapi processing -->
  <rect x="280" y="195" width="160" height="55" rx="12" fill="rgba(139,92,246,0.06)" stroke="url(#purpleCyan)" stroke-width="1.5" stroke-opacity="0.4"/>
  <text x="360" y="218" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="rgba(255,255,255,0.7)">VAPI ENGINE</text>
  <text x="360" y="235" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="rgba(255,255,255,0.3)">NLU + STT + TTS</text>

  ${arrow(440, 210, 530, 150)}
  ${arrow(440, 220, 530, 220)}
  ${arrow(440, 230, 530, 290)}

  <!-- Routing branches -->
  ${node(530, 128, "BOOK SHOWING", "cyanBlue")}
  ${node(530, 198, "QUALIFY LEAD", "purpleCyan")}
  ${node(530, 268, "ANSWER FAQ", "bluePurple")}

  <!-- Output actions -->
  ${arrow(670, 150, 760, 150)}
  ${arrow(670, 220, 760, 220)}
  ${arrow(670, 290, 760, 290)}

  ${node(760, 128, "CALENDAR", "cyanBlue")}
  ${node(760, 198, "CRM UPDATE", "purpleCyan")}
  ${node(760, 268, "KNOWLEDGE BASE", "bluePurple", 160)}

  <!-- 24/7 badge -->
  <rect x="960" y="190" width="100" height="60" rx="14" fill="rgba(6,182,212,0.06)" stroke="rgba(6,182,212,0.3)" stroke-width="1"/>
  <text x="1010" y="220" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-weight="bold" fill="url(#cyanBlue)">24/7</text>
  <text x="1010" y="240" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="rgba(255,255,255,0.3)">UPTIME</text>

  <!-- Latency -->
  <rect x="290" y="265" width="120" height="28" rx="14" fill="rgba(6,182,212,0.06)" stroke="rgba(6,182,212,0.25)" stroke-width="1"/>
  <text x="350" y="284" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="rgba(6,182,212,0.7)">&#60;500ms</text>

  <!-- Result metrics -->
  ${metricCard(180, 400, "3x", "Qualified Appts", "purpleCyan")}
  ${metricCard(420, 400, "67%", "Fewer Missed Calls", "cyanBlue")}
  ${metricCard(660, 400, "&#60;500ms", "Response Latency", "bluePurple")}

  <rect x="0" y="0" width="${W}" height="2" fill="url(#purpleCyan)" opacity="0.4"/>
  <rect x="0" y="${H - 2}" width="${W}" height="2" fill="url(#purpleCyan)" opacity="0.4"/>
</svg>`;

// ==================== CASE STUDY 3: Omni-Channel Engine ====================
const omniChannel = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  ${baseDefs}
  ${ambientGlow(400, 230, 250, 180, "rgba(6,182,212,0.03)")}

  <text x="60" y="50" font-family="'Courier New',monospace" font-size="10" fill="rgba(6,182,212,0.5)" letter-spacing="4">CASE STUDY: OMNI-CHANNEL ENGINE</text>
  <text x="60" y="75" font-family="Georgia,serif" font-size="22" fill="rgba(255,255,255,0.7)">1 Input, 40+ Outputs</text>

  <!-- Input -->
  <rect x="60" y="160" width="150" height="70" rx="14" fill="rgba(6,182,212,0.06)" stroke="url(#cyanBlue)" stroke-width="1.5" stroke-opacity="0.4"/>
  <text x="135" y="190" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="rgba(255,255,255,0.7)">1 VIDEO</text>
  <text x="135" y="210" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="rgba(255,255,255,0.3)">RAW INPUT</text>

  ${arrow(210, 195, 280, 195)}

  <!-- Processing pipeline -->
  ${node(280, 140, "TRANSCRIBE", "cyanBlue", 120)}
  ${arrow(400, 162, 430, 162)}
  ${node(430, 140, "AI GENERATE", "purpleCyan", 130)}
  ${arrow(560, 162, 590, 162)}
  ${node(590, 140, "OPTIMIZE", "bluePurple", 120)}
  ${arrow(710, 162, 740, 162)}
  ${node(740, 140, "SCHEDULE", "purpleCyan", 120)}

  <!-- Output fan -->
  ${arrow(400, 210, 430, 260)}
  ${arrow(400, 210, 430, 310)}
  ${arrow(400, 210, 430, 360)}

  ${node(430, 240, "5 BLOGS", "cyanBlue", 120)}
  ${node(430, 290, "10 TWEETS", "purpleCyan", 120)}
  ${node(430, 340, "3 LINKEDIN", "bluePurple", 120)}

  ${arrow(560, 210, 620, 260)}
  ${arrow(560, 210, 620, 310)}

  ${node(620, 240, "5 CLIPS", "cyanBlue", 120)}
  ${node(620, 290, "EMAILS", "purpleCyan", 120)}

  <!-- Before/After comparison -->
  <rect x="830" y="110" width="160" height="70" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
  <text x="910" y="135" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="rgba(255,255,255,0.25)">BEFORE</text>
  <text x="910" y="162" text-anchor="middle" font-family="Georgia,serif" font-size="24" font-weight="bold" fill="rgba(255,255,255,0.3)">4</text>
  <text x="910" y="175" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="rgba(255,255,255,0.2)">posts / week</text>

  <text x="910" y="210" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="url(#cyanBlue)">&#8595;</text>

  <rect x="830" y="225" width="160" height="70" rx="10" fill="rgba(6,182,212,0.04)" stroke="rgba(6,182,212,0.2)" stroke-width="1"/>
  <text x="910" y="250" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="rgba(6,182,212,0.5)">AFTER</text>
  <text x="910" y="278" text-anchor="middle" font-family="Georgia,serif" font-size="24" font-weight="bold" fill="url(#cyanBlue)">40+</text>
  <text x="910" y="290" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="rgba(255,255,255,0.3)">posts / week</text>

  <!-- Result metrics -->
  ${metricCard(180, 410, "10x", "Content Output", "cyanBlue")}
  ${metricCard(420, 410, "0", "Additional Headcount", "purpleCyan")}
  ${metricCard(660, 410, "4&#8594;40", "Posts / Week", "bluePurple")}

  <rect x="0" y="0" width="${W}" height="2" fill="url(#cyanBlue)" opacity="0.4"/>
  <rect x="0" y="${H - 2}" width="${W}" height="2" fill="url(#cyanBlue)" opacity="0.4"/>
</svg>`;

// ==================== CASE STUDY 4: Zero-Touch Onboarding ====================
const zeroTouch = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  ${baseDefs}
  ${ambientGlow(600, 230, 300, 180, "rgba(59,130,246,0.03)")}

  <text x="60" y="50" font-family="'Courier New',monospace" font-size="10" fill="rgba(59,130,246,0.5)" letter-spacing="4">CASE STUDY: ZERO-TOUCH ONBOARDING</text>
  <text x="60" y="75" font-family="Georgia,serif" font-size="22" fill="rgba(255,255,255,0.7)">Contract to Full Setup in &#60;90s</text>

  <!-- Timeline flow - 5 stages -->
  <!-- Stage 1 -->
  <rect x="60" y="130" width="180" height="90" rx="14" fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.2)" stroke-width="1"/>
  <text x="70" y="155" font-family="'Courier New',monospace" font-size="8" fill="rgba(59,130,246,0.6)" letter-spacing="2">STEP 01</text>
  <text x="70" y="178" font-family="Georgia,serif" font-size="14" fill="rgba(255,255,255,0.6)">Contract Signed</text>
  <text x="70" y="200" font-family="'Courier New',monospace" font-size="9" fill="rgba(255,255,255,0.25)">GHL TRIGGER</text>

  ${arrow(240, 175, 280, 175, "rgba(59,130,246,0.3)")}

  <!-- Stage 2 -->
  <rect x="280" y="130" width="180" height="90" rx="14" fill="rgba(99,102,241,0.05)" stroke="rgba(99,102,241,0.2)" stroke-width="1"/>
  <text x="290" y="155" font-family="'Courier New',monospace" font-size="8" fill="rgba(99,102,241,0.6)" letter-spacing="2">STEP 02</text>
  <text x="290" y="178" font-family="Georgia,serif" font-size="14" fill="rgba(255,255,255,0.6)">Invoice Sent</text>
  <text x="290" y="200" font-family="'Courier New',monospace" font-size="9" fill="rgba(255,255,255,0.25)">STRIPE AUTO</text>

  ${arrow(460, 175, 500, 175, "rgba(99,102,241,0.3)")}

  <!-- Stage 3 -->
  <rect x="500" y="130" width="180" height="90" rx="14" fill="rgba(139,92,246,0.05)" stroke="rgba(139,92,246,0.2)" stroke-width="1"/>
  <text x="510" y="155" font-family="'Courier New',monospace" font-size="8" fill="rgba(139,92,246,0.6)" letter-spacing="2">STEP 03</text>
  <text x="510" y="178" font-family="Georgia,serif" font-size="14" fill="rgba(255,255,255,0.6)">Slack Channel</text>
  <text x="510" y="200" font-family="'Courier New',monospace" font-size="9" fill="rgba(255,255,255,0.25)">AUTO-CREATED</text>

  ${arrow(680, 175, 720, 175, "rgba(139,92,246,0.3)")}

  <!-- Stage 4 -->
  <rect x="720" y="130" width="180" height="90" rx="14" fill="rgba(6,182,212,0.05)" stroke="rgba(6,182,212,0.2)" stroke-width="1"/>
  <text x="730" y="155" font-family="'Courier New',monospace" font-size="8" fill="rgba(6,182,212,0.6)" letter-spacing="2">STEP 04</text>
  <text x="730" y="178" font-family="Georgia,serif" font-size="14" fill="rgba(255,255,255,0.6)">Project Board</text>
  <text x="730" y="200" font-family="'Courier New',monospace" font-size="9" fill="rgba(255,255,255,0.25)">AIRTABLE SCAFFOLD</text>

  ${arrow(900, 175, 940, 175, "rgba(6,182,212,0.3)")}

  <!-- Stage 5 -->
  <rect x="940" y="130" width="200" height="90" rx="14" fill="rgba(6,182,212,0.05)" stroke="rgba(6,182,212,0.2)" stroke-width="1"/>
  <text x="950" y="155" font-family="'Courier New',monospace" font-size="8" fill="rgba(6,182,212,0.6)" letter-spacing="2">STEP 05</text>
  <text x="950" y="178" font-family="Georgia,serif" font-size="14" fill="rgba(255,255,255,0.6)">Welcome Email</text>
  <text x="950" y="200" font-family="'Courier New',monospace" font-size="9" fill="rgba(255,255,255,0.25)">PERSONALIZED SEQUENCE</text>

  <!-- Progress bar -->
  <rect x="60" y="255" width="1080" height="4" rx="2" fill="rgba(255,255,255,0.03)"/>
  <rect x="60" y="255" width="1080" height="4" rx="2" fill="url(#purpleCyan)" opacity="0.3"/>
  <circle cx="60" cy="257" r="5" fill="rgba(59,130,246,0.4)" stroke="rgba(59,130,246,0.6)" stroke-width="1"/>
  <circle cx="330" cy="257" r="5" fill="rgba(99,102,241,0.4)" stroke="rgba(99,102,241,0.6)" stroke-width="1"/>
  <circle cx="600" cy="257" r="5" fill="rgba(139,92,246,0.4)" stroke="rgba(139,92,246,0.6)" stroke-width="1"/>
  <circle cx="870" cy="257" r="5" fill="rgba(6,182,212,0.4)" stroke="rgba(6,182,212,0.6)" stroke-width="1"/>
  <circle cx="1140" cy="257" r="5" fill="rgba(6,182,212,0.4)" stroke="rgba(6,182,212,0.6)" stroke-width="1"/>

  <!-- Timer -->
  <rect x="480" y="280" width="240" height="40" rx="20" fill="rgba(139,92,246,0.05)" stroke="rgba(139,92,246,0.2)" stroke-width="1"/>
  <text x="600" y="306" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" fill="url(#purpleCyan)">TOTAL: &#60;90 SECONDS</text>

  <!-- n8n orchestrator label -->
  <text x="600" y="350" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="rgba(255,255,255,0.2)">ORCHESTRATED BY n8n + GHL + AIRTABLE + SLACK + STRIPE</text>

  <!-- Result metrics -->
  ${metricCard(180, 400, "6h", "Saved Per Onboard", "bluePurple")}
  ${metricCard(420, 400, "&#60;90s", "Full Execution", "purpleCyan")}
  ${metricCard(660, 400, "0", "Manual Handoffs", "cyanBlue")}

  <rect x="0" y="0" width="${W}" height="2" fill="url(#bluePurple)" opacity="0.4"/>
  <rect x="0" y="${H - 2}" width="${W}" height="2" fill="url(#bluePurple)" opacity="0.4"/>
</svg>`;

// ==================== Generate all ====================
const caseStudies = [
  { name: "self-healing-crm", svg: selfHealingCRM },
  { name: "voice-concierge", svg: voiceConcierge },
  { name: "omni-channel-engine", svg: omniChannel },
  { name: "zero-touch-onboarding", svg: zeroTouch },
];

async function generate() {
  for (const cs of caseStudies) {
    const out = path.join(__dirname, "..", "public", "images", "case-studies", `${cs.name}.png`);
    await sharp(Buffer.from(cs.svg)).png({ quality: 95 }).toFile(out);
    const fs = await import("fs");
    const size = (fs.statSync(out).size / 1024).toFixed(1);
    console.log(`✅ ${cs.name}.png (${size} KB)`);
  }
  console.log("\nAll 4 case study visuals generated!");
}

generate().catch(console.error);
