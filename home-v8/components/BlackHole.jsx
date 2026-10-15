'use client';

// The black hole beside "Bring me the messy part", rendered live with WebGL.
// Each pixel traces a light ray past a Schwarzschild black hole (event horizon
// radius 1) and picks up glow where it crosses a turbulent accretion disk, so
// the disk bends over and under the shadow the way real lensing does.
// Falls back to the M87* photo when WebGL is unavailable.
import { useEffect, useRef, useState } from 'react';

const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 ro = vec3(0.0, 1.35, -15.0);
  vec3 fw = normalize(-ro);
  vec3 rt = normalize(cross(vec3(0.0, 1.0, 0.0), fw));
  vec3 up = cross(fw, rt);
  vec3 v = normalize(fw + (uv.x * rt + uv.y * up) * 1.32);
  vec3 p = ro;
  vec3 L = cross(p, v);
  float h2 = dot(L, L);

  vec3 col = vec3(0.0);
  float a = 0.0;
  for (int i = 0; i < 260; i++) {
    float r2 = dot(p, p);
    float r = sqrt(r2);
    if (r < 1.0) { a = 1.0; break; }
    if (r > 40.0) break;
    float dt = clamp(0.07 * r, 0.03, 0.7);
    vec3 acc = -1.5 * h2 * p / (r2 * r2 * r);
    vec3 pn = p + v * dt;
    v += acc * dt;
    if (p.y * pn.y < 0.0) {
      vec3 hit = mix(p, pn, p.y / (p.y - pn.y));
      float hr = length(hit.xz);
      if (hr > 2.4 && hr < 8.0) {
        float ang = atan(hit.z, hit.x);
        float spin = uTime * 0.55 * pow(3.0 / hr, 1.5);
        float n = fbm(vec2(hr * 1.7 - uTime * 0.05, (ang + spin) * 2.8));
        float streak = fbm(vec2(hr * 6.0, (ang + spin) * 9.0));
        float edge = smoothstep(2.4, 3.1, hr) * (1.0 - smoothstep(5.2, 8.0, hr));
        float temp = pow(3.0 / hr, 1.8);
        vec3 tang = normalize(vec3(-hit.z, 0.0, hit.x));
        float dop = clamp(1.0 + 0.75 * dot(tang, normalize(v)), 0.25, 2.2);
        float b = edge * (0.25 + 0.95 * n * n + 0.35 * streak) * temp * dop * 1.6;
        vec3 c = mix(vec3(1.0, 0.30, 0.06), vec3(1.0, 0.86, 0.62), clamp(temp * dop - 0.45, 0.0, 1.0));
        col += c * b * (1.0 - a);
        a += clamp(b, 0.0, 1.0) * 0.85 * (1.0 - a);
        if (a > 0.985) break;
      }
    }
    p = pn;
  }
  col = 1.0 - exp(-col * 1.25);
  // Fade toward the canvas edge so the disk never shows a hard square border.
  float fade = 1.0 - smoothstep(0.36, 0.5, length(uv * vec2(0.92, 1.25)));
  col *= fade;
  gl_FragColor = vec4(col, max(a * fade, max(col.r, max(col.g, col.b))));
}`;

const M87 = 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg';

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

export default function BlackHole() {
  const canvasRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas && canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
    const vs = gl && compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = gl && compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!gl || !vs || !fs) { setFallback(true); return; }
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { setFallback(true); return; }
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');

    // Ray tracing is heavy: render at most 480px square and let CSS scale it.
    const size = () => {
      const px = Math.min(480, Math.round(canvas.clientWidth * Math.min(1.5, window.devicePixelRatio || 1)));
      if (canvas.width !== px) { canvas.width = px; canvas.height = px; gl.viewport(0, 0, px, px); }
    };
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t0 = performance.now();
    let raf = 0, visible = false;
    const draw = () => {
      size();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, 12 + (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = () => { draw(); if (visible && !reduce) raf = requestAnimationFrame(loop); };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) loop();
    });
    io.observe(canvas);
    draw();
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div data-bh="1" aria-hidden="true" className="ab-blackhole">
      {fallback ? (
        <img src={M87} alt="" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', mixBlendMode: 'screen', WebkitMaskImage: 'radial-gradient(circle, #000 52%, transparent 71%)', maskImage: 'radial-gradient(circle, #000 52%, transparent 71%)' }} />
      ) : (
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      )}
    </div>
  );
}
