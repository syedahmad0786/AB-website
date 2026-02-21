"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NeuronNode {
  id: string;
  label: string;
  description: string;
  angle: number;
  radius: number;
  color: string;
  icon: string;
}

const NEURON_NODES: NeuronNode[] = [
  {
    id: "perception",
    label: "Perception",
    description:
      "AI sees patterns humans miss, transforming raw data into actionable insight that drives smarter decisions across every layer of business.",
    angle: 0,
    radius: 180,
    color: "#8b5cf6",
    icon: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",
  },
  {
    id: "reasoning",
    label: "Reasoning",
    description:
      "Autonomous logic engines process complexity at scale, finding optimal solutions in seconds where traditional approaches take weeks.",
    angle: 60,
    radius: 180,
    color: "#3b82f6",
    icon: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96a.49.49 0 00-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1115.6 12 3.6 3.6 0 0112 15.6z",
  },
  {
    id: "learning",
    label: "Learning",
    description:
      "Systems that continuously evolve, absorbing new data and refining their intelligence to stay ahead of market shifts and emerging opportunities.",
    angle: 120,
    radius: 180,
    color: "#06b6d4",
    icon: "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z",
  },
  {
    id: "creation",
    label: "Creation",
    description:
      "Generative AI builds what was previously unimaginable - from automated workflows to intelligent agents that operate with human-like creativity.",
    angle: 180,
    radius: 180,
    color: "#a855f7",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
  {
    id: "connection",
    label: "Synapse",
    description:
      "Neural bridges connecting every AI capability, enabling seamless communication between systems that amplify each other's strengths exponentially.",
    angle: 240,
    radius: 180,
    color: "#6366f1",
    icon: "M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z",
  },
  {
    id: "evolution",
    label: "Evolution",
    description:
      "Self-improving architectures that don't just solve today's problems - they anticipate tomorrow's challenges and adapt before disruption arrives.",
    angle: 300,
    radius: 180,
    color: "#0ea5e9",
    icon: "M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z",
  },
];

function HexagonShape({ size, className, strokeColor, fillOpacity = 0 }: {
  size: number;
  className?: string;
  strokeColor: string;
  fillOpacity?: number;
}) {
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return `${size / 2 + (size / 2) * Math.cos(angle)},${size / 2 + (size / 2) * Math.sin(angle)}`;
  }).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
      <polygon
        points={points}
        fill={`rgba(139, 92, 246, ${fillOpacity})`}
        stroke={strokeColor}
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function NeuralAIVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const animationRef = useRef<number>(0);
  const angleRef = useRef(0);

  // Auto-rotation
  useEffect(() => {
    if (!autoRotate) return;
    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      angleRef.current += delta * 15; // degrees per second
      setRotation({ x: 8, y: angleRef.current });
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [autoRotate]);

  // Mouse interaction
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setAutoRotate(false);
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: y * -20, y: x * 30 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setAutoRotate(true);
    setActiveNode(null);
  }, []);

  const activeNodeData = NEURON_NODES.find((n) => n.id === activeNode);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[500px] lg:min-h-[600px] flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full bg-accent-purple/[0.06] blur-[80px] animate-pulse" />
      </div>

      {/* 3D Scene */}
      <div
        className="relative w-[400px] h-[400px] lg:w-[460px] lg:h-[460px]"
        style={{
          perspective: "1000px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: autoRotate ? "none" : "transform 0.1s ease-out",
          }}
        >
          {/* Neural connection lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ transform: "translateZ(0px)" }}
          >
            <defs>
              <linearGradient id="neuralGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="neuralGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Draw lines from center to each neuron */}
            {NEURON_NODES.map((node) => {
              const centerX = 230;
              const centerY = 230;
              const rad = (node.angle * Math.PI) / 180;
              const nx = centerX + node.radius * Math.cos(rad);
              const ny = centerY + node.radius * Math.sin(rad);
              const midX = (centerX + nx) / 2 + Math.sin(rad) * 20;
              const midY = (centerY + ny) / 2 - Math.cos(rad) * 20;
              const isActive = activeNode === node.id;

              return (
                <g key={node.id}>
                  <path
                    d={`M ${centerX} ${centerY} Q ${midX} ${midY} ${nx} ${ny}`}
                    fill="none"
                    stroke={isActive ? node.color : "url(#neuralGrad1)"}
                    strokeWidth={isActive ? "2" : "1"}
                    opacity={isActive ? 1 : 0.4}
                    filter={isActive ? "url(#glow)" : undefined}
                    className="transition-all duration-300"
                  />
                  {/* Pulse dots along the path */}
                  <circle r="2" fill={node.color} opacity={isActive ? 0.9 : 0.4}>
                    <animateMotion
                      dur={`${2 + Math.random()}s`}
                      repeatCount="indefinite"
                      path={`M ${centerX} ${centerY} Q ${midX} ${midY} ${nx} ${ny}`}
                    />
                  </circle>
                </g>
              );
            })}

            {/* Cross connections between adjacent neurons */}
            {NEURON_NODES.map((node, i) => {
              const next = NEURON_NODES[(i + 1) % NEURON_NODES.length];
              const rad1 = (node.angle * Math.PI) / 180;
              const rad2 = (next.angle * Math.PI) / 180;
              const x1 = 230 + node.radius * Math.cos(rad1);
              const y1 = 230 + node.radius * Math.sin(rad1);
              const x2 = 230 + next.radius * Math.cos(rad2);
              const y2 = 230 + next.radius * Math.sin(rad2);

              return (
                <line
                  key={`cross-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#neuralGrad2)"
                  strokeWidth="0.5"
                  opacity="0.3"
                  strokeDasharray="4 4"
                />
              );
            })}
          </svg>

          {/* Central hexagonal AI chip */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ transform: "translate(-50%, -50%) translateZ(40px)" }}
          >
            {/* Outer hex ring */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                <HexagonShape
                  size={120}
                  strokeColor="rgba(139, 92, 246, 0.2)"
                  fillOpacity={0}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center animate-[spin_30s_linear_infinite_reverse]">
                <HexagonShape
                  size={140}
                  strokeColor="rgba(59, 130, 246, 0.12)"
                  fillOpacity={0}
                />
              </div>

              {/* Inner hex with AI brain icon */}
              <div className="relative w-[120px] h-[120px] flex items-center justify-center">
                <HexagonShape
                  size={100}
                  strokeColor="rgba(139, 92, 246, 0.5)"
                  fillOpacity={0.08}
                  className="absolute"
                />

                {/* Brain + chip icon */}
                <div className="relative z-10">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    {/* Brain outline */}
                    <path
                      d="M24 6C18 6 14 10 14 14c0 2-1 3-2 4s-2 3-2 5c0 3 2 5 4 6v7a2 2 0 002 2h16a2 2 0 002-2v-7c2-1 4-3 4-6 0-2-1-3.5-2-5s-2-2-2-4c0-4-4-8-10-8z"
                      stroke="url(#brainGrad)"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    {/* Neural pathways inside brain */}
                    <path
                      d="M20 16c0 2 1 3 2 4M28 16c0 2-1 3-2 4M22 20h4M20 24l4-2 4 2M22 28h4"
                      stroke="rgba(139, 92, 246, 0.6)"
                      strokeWidth="1"
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* Chip grid */}
                    <rect
                      x="19"
                      y="18"
                      width="10"
                      height="10"
                      rx="1"
                      stroke="rgba(59, 130, 246, 0.4)"
                      strokeWidth="0.75"
                      fill="rgba(59, 130, 246, 0.05)"
                    />
                    {/* Chip pins */}
                    <line x1="22" y1="16" x2="22" y2="18" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="0.75" />
                    <line x1="26" y1="16" x2="26" y2="18" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="0.75" />
                    <line x1="22" y1="28" x2="22" y2="30" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="0.75" />
                    <line x1="26" y1="28" x2="26" y2="30" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="0.75" />
                    <line x1="17" y1="22" x2="19" y2="22" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="0.75" />
                    <line x1="17" y1="25" x2="19" y2="25" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="0.75" />
                    <line x1="29" y1="22" x2="31" y2="22" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="0.75" />
                    <line x1="29" y1="25" x2="31" y2="25" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="0.75" />
                    <defs>
                      <linearGradient id="brainGrad" x1="12" y1="6" x2="36" y2="40">
                        <stop stopColor="#8b5cf6" />
                        <stop offset="1" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Central glow pulse */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-accent-purple/20 animate-ping" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Neuron nodes orbiting */}
          {NEURON_NODES.map((node) => {
            const rad = (node.angle * Math.PI) / 180;
            const x = 50 + (node.radius / 4.6) * Math.cos(rad);
            const y = 50 + (node.radius / 4.6) * Math.sin(rad);
            const isActive = activeNode === node.id;

            return (
              <motion.div
                key={node.id}
                className="absolute cursor-pointer group"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%) translateZ(20px)",
                }}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Node glow */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-md"
                  style={{ backgroundColor: node.color }}
                  animate={{
                    opacity: isActive ? 0.4 : 0.1,
                    scale: isActive ? 1.8 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Node body */}
                <div
                  className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center border transition-all duration-300"
                  style={{
                    backgroundColor: isActive
                      ? `${node.color}25`
                      : "rgba(255,255,255,0.03)",
                    borderColor: isActive
                      ? `${node.color}80`
                      : "rgba(255,255,255,0.08)",
                    boxShadow: isActive
                      ? `0 0 30px ${node.color}40, inset 0 0 15px ${node.color}15`
                      : "none",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="transition-colors duration-300"
                  >
                    <path
                      d={node.icon}
                      fill={isActive ? node.color : "rgba(255,255,255,0.3)"}
                    />
                  </svg>
                </div>

                {/* Label */}
                <motion.span
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-wider whitespace-nowrap transition-colors duration-300"
                  style={{ color: isActive ? node.color : "rgba(255,255,255,0.25)" }}
                >
                  {node.label}
                </motion.span>
              </motion.div>
            );
          })}

          {/* Floating particle ring */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            const r = 155 + Math.sin(i * 2.5) * 15;
            const x = 50 + (r / 4.6) * Math.cos(angle);
            const y = 50 + (r / 4.6) * Math.sin(angle);
            return (
              <div
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  backgroundColor:
                    i % 3 === 0
                      ? "rgba(139, 92, 246, 0.3)"
                      : i % 3 === 1
                        ? "rgba(59, 130, 246, 0.2)"
                        : "rgba(6, 182, 212, 0.25)",
                  transform: "translateZ(10px)",
                  animation: `float ${3 + (i % 4)}s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Tooltip / Description Panel */}
      <AnimatePresence>
        {activeNodeData && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[320px] lg:w-[360px] glass-panel p-4 z-50"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: activeNodeData.color }}
              />
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: activeNodeData.color }}
              >
                {activeNodeData.label}
              </span>
            </div>
            <p className="text-[13px] text-white/60 leading-relaxed">
              {activeNodeData.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono uppercase tracking-[0.2em] text-white/15"
      >
        Hover to explore
      </motion.p>
    </div>
  );
}
