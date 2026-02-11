"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  hue: number;
  saturation: number;
  lightness: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface Trail {
  x: number;
  y: number;
  age: number;
  maxAge: number;
  hue: number;
  size: number;
}

export default function InteractiveCursorField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const trails = useRef<Trail[]>([]);
  const mouse = useRef({ x: -1000, y: -1000, prevX: -1000, prevY: -1000 });
  const mouseSpeed = useRef(0);
  const animationFrame = useRef<number>(0);
  const dimensions = useRef({ w: 0, h: 0 });
  const time = useRef(0);

  const PARTICLE_COUNT = 120;
  const MOUSE_RADIUS = 250;
  const RETURN_SPEED = 0.025;
  const PUSH_FORCE = 12;
  const CONNECTION_DIST = 150;
  const MOUSE_CONNECTION_DIST = 280;
  const TRAIL_MAX_AGE = 40;

  const initParticles = useCallback((w: number, h: number) => {
  const arr: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
  const x = Math.random() * w;
  const y = Math.random() * h;
  const hueChoice = Math.random();
  let hue: number, saturation: number, lightness: number;
  if (hueChoice < 0.4) {
  hue = 260 + Math.random() * 20; // Purple
  saturation = 70 + Math.random() * 20;
  lightness = 60 + Math.random() * 15;
  } else if (hueChoice < 0.7) {
  hue = 195 + Math.random() * 15; // Cyan
  saturation = 75 + Math.random() * 20;
  lightness = 55 + Math.random() * 20;
  } else {
  hue = 220 + Math.random() * 20; // Blue
  saturation = 65 + Math.random() * 20;
  lightness = 60 + Math.random() * 15;
  }
  arr.push({
  x,
  y,
  originX: x,
  originY: y,
  vx: 0,
  vy: 0,
  size: Math.random() * 2 + 0.8,
  baseOpacity: Math.random() * 0.2 + 0.05,
  hue,
  saturation,
  lightness,
  pulsePhase: Math.random() * Math.PI * 2,
  pulseSpeed: 0.01 + Math.random() * 0.02,
  });
  }
  particles.current = arr;
  }, []);

  const animate = useCallback(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { w, h } = dimensions.current;
  ctx.clearRect(0, 0, w, h);
  time.current += 1;

  const mx = mouse.current.x;
  const my = mouse.current.y;

  // Calculate mouse speed
  const mdx = mx - mouse.current.prevX;
  const mdy = my - mouse.current.prevY;
  const currentSpeed = Math.sqrt(mdx * mdx + mdy * mdy);
  mouseSpeed.current = mouseSpeed.current * 0.85 + currentSpeed * 0.15;
  mouse.current.prevX = mx;
  mouse.current.prevY = my;

  // Spawn trails based on mouse movement
  if (mouseSpeed.current > 2 && mx > 0 && my > 0) {
  const trailCount = Math.min(Math.floor(mouseSpeed.current / 8), 3);
  for (let t = 0; t < trailCount; t++) {
  trails.current.push({
  x: mx + (Math.random() - 0.5) * 20,
  y: my + (Math.random() - 0.5) * 20,
  age: 0,
  maxAge: TRAIL_MAX_AGE + Math.random() * 20,
  hue: 250 + Math.random() * 30,
  size: 1 + Math.random() * 2,
  });
  }
  }

  // Update and draw trails
  trails.current = trails.current.filter((trail) => {
  trail.age++;
  if (trail.age >= trail.maxAge) return false;
  const progress = trail.age / trail.maxAge;
  const alpha = (1 - progress) * 0.15;
  const radius = trail.size * (1 - progress * 0.5);
  ctx.beginPath();
  ctx.arc(trail.x, trail.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(${trail.hue}, 80%, 70%, ${alpha})`;
  ctx.fill();
  return true;
  });

  // Keep trail buffer manageable
  if (trails.current.length > 200) {
  trails.current = trails.current.slice(-200);
  }

  // Compute dynamic mouse radius based on speed
  const dynamicMouseRadius =
  MOUSE_RADIUS + Math.min(mouseSpeed.current * 3, 100);
  const dynamicForce = PUSH_FORCE + Math.min(mouseSpeed.current * 0.5, 8);

  // Draw connections first (behind particles)
  for (let i = 0; i < particles.current.length; i++) {
  const p = particles.current[i];

  // Connect nearby particles
  for (let j = i + 1; j < particles.current.length; j++) {
  const p2 = particles.current[j];
  const dx = p.x - p2.x;
  const dy = p.y - p2.y;
  const d = Math.sqrt(dx * dx + dy * dy);
  if (d < CONNECTION_DIST) {
  const alpha = (1 - d / CONNECTION_DIST) * 0.06;
  const avgHue = (p.hue + p2.hue) / 2;
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.strokeStyle = `hsla(${avgHue}, 60%, 60%, ${alpha})`;
  ctx.lineWidth = 0.6;
  ctx.stroke();
  }
  }

  // Connect particles near cursor with brighter lines
  if (mx > 0 && my > 0) {
  const dmc = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2);
  if (dmc < MOUSE_CONNECTION_DIST) {
  const alpha = (1 - dmc / MOUSE_CONNECTION_DIST) * 0.12;
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.lineTo(mx, my);
  const gradient = ctx.createLinearGradient(p.x, p.y, mx, my);
  gradient.addColorStop(
  0,
  `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${alpha})`
  );
  gradient.addColorStop(
  1,
  `hsla(260, 80%, 70%, ${alpha * 0.6})`
  );
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 0.8;
  ctx.stroke();
  }
  }
  }

  // Update and draw particles
  for (const p of particles.current) {
  // Mouse repulsion with dynamic force
  const dx = p.x - mx;
  const dy = p.y - my;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < dynamicMouseRadius && dist > 0) {
  const force =
  ((dynamicMouseRadius - dist) / dynamicMouseRadius) ** 1.5;
  const angle = Math.atan2(dy, dx);
  p.vx += Math.cos(angle) * force * dynamicForce;
  p.vy += Math.sin(angle) * force * dynamicForce;
  }

  // Spring back to origin
  p.vx += (p.originX - p.x) * RETURN_SPEED;
  p.vy += (p.originY - p.y) * RETURN_SPEED;

  // Damping
  p.vx *= 0.91;
  p.vy *= 0.91;

  // Update position
  p.x += p.vx;
  p.y += p.vy;

  // Draw particle with pulse and speed glow
  const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
  const pulse =
  Math.sin(time.current * p.pulseSpeed + p.pulsePhase) * 0.5 + 0.5;
  const dynamicOpacity = Math.min(
  p.baseOpacity + speed * 0.04 + pulse * 0.05,
  0.5
  );
  const dynamicSize = p.size + speed * 0.15 + pulse * 0.3;

  // Outer glow when moving fast
  if (speed > 1) {
  ctx.beginPath();
  ctx.arc(p.x, p.y, dynamicSize * 3, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${
  Math.min(speed * 0.008, 0.06)
  })`;
  ctx.fill();
  }

  // Core particle
  ctx.beginPath();
  ctx.arc(p.x, p.y, dynamicSize, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${dynamicOpacity})`;
  ctx.fill();
  }

  // Layered cursor glow
  if (mx > 0 && my > 0) {
  const speedMult = Math.min(1 + mouseSpeed.current * 0.02, 1.8);

  // Outer glow ring
  const outerGlow = ctx.createRadialGradient(
  mx,
  my,
  0,
  mx,
  my,
  280 * speedMult
  );
  outerGlow.addColorStop(
  0,
  `hsla(260, 80%, 65%, ${0.04 * speedMult})`
  );
  outerGlow.addColorStop(
  0.3,
  `hsla(230, 80%, 60%, ${0.02 * speedMult})`
  );
  outerGlow.addColorStop(
  0.6,
  `hsla(200, 80%, 60%, ${0.01 * speedMult})`
  );
  outerGlow.addColorStop(1, "transparent");
  ctx.fillStyle = outerGlow;
  ctx.fillRect(
  mx - 300 * speedMult,
  my - 300 * speedMult,
  600 * speedMult,
  600 * speedMult
  );

  // Inner bright core
  const innerGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 60);
  innerGlow.addColorStop(
  0,
  `hsla(260, 90%, 75%, ${0.06 * speedMult})`
  );
  innerGlow.addColorStop(
  0.5,
  `hsla(240, 80%, 70%, ${0.03 * speedMult})`
  );
  innerGlow.addColorStop(1, "transparent");
  ctx.fillStyle = innerGlow;
  ctx.fillRect(mx - 60, my - 60, 120, 120);
  }

  animationFrame.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const handleResize = () => {
  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth;
  const h = window.innerHeight;
  dimensions.current = { w, h };
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  const ctx = canvas.getContext("2d");
  if (ctx) ctx.scale(dpr, dpr);
  initParticles(w, h);
  };

  const handleMouseMove = (e: MouseEvent) => {
  mouse.current.x = e.clientX;
  mouse.current.y = e.clientY;
  };

  const handleMouseLeave = () => {
  mouse.current = { x: -1000, y: -1000, prevX: -1000, prevY: -1000 };
  mouseSpeed.current = 0;
  };

  handleResize();
  window.addEventListener("resize", handleResize);
  window.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseleave", handleMouseLeave);
  animationFrame.current = requestAnimationFrame(animate);

  return () => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseleave", handleMouseLeave);
  cancelAnimationFrame(animationFrame.current);
  };
  }, [animate, initParticles]);

  return (
  <canvas
  ref={canvasRef}
  className="fixed inset-0 z-0 pointer-events-none"
  aria-hidden="true"
  />
  );
}
