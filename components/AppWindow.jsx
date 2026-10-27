'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import '../styles/app-window.css';

const NS = 'ab-wk', V = 1, W = 1280, H = 760;

function Mark({ embed }) {
  if (embed.mark) return <img className="aw-mark" src={embed.mark} alt="" width="16" height="16" />;
  return <span className="aw-mono" aria-hidden="true">{embed.monogram}{embed.spark ? <i className="aw-spark" /> : null}</span>;
}

function Icon({ d }) {
  return <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d={d} /></svg>;
}
const PLAY = 'M8 5.5v13l10-6.5z', PAUSE = 'M7 5h3.5v14H7zM13.5 5H17v14h-3.5z', RESTART = 'M5 12a7 7 0 1 0 2.05-4.95M5 4.5V8h3.5';

/** One fixed stage that swaps live product frames. Frames mount on first activation and stay mounted. */
export default function AppWindow({ products, active, ctx = 'home' }) {
  const stage = useRef(null), body = useRef(null), frames = useRef([]);
  const [mounted, setMounted] = useState(() => new Set([active]));
  const [states, setStates] = useState({});
  const [scale, setScale] = useState(null);
  const [reduced, setReduced] = useState(false);
  const inView = useRef(false), activeRef = useRef(active);
  activeRef.current = active;

  const send = useCallback((i, type) => {
    const f = frames.current[i];
    if (f && f.contentWindow) f.contentWindow.postMessage({ ns: NS, v: V, type }, '*');
  }, []);
  const syncVisibility = useCallback(() => {
    const show = inView.current && !document.hidden;
    frames.current.forEach((f, i) => { if (f) send(i, show && i === activeRef.current ? 'visible' : 'hidden'); });
  }, [send]);

  useEffect(() => { setMounted(m => (m.has(active) ? m : new Set([...m, active]))); }, [active]);
  useEffect(() => { syncVisibility(); }, [active, mounted, syncVisibility]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const upd = () => setReduced(mq.matches); upd();
    mq.addEventListener?.('change', upd);
    const io = new IntersectionObserver(es => { const e = es[es.length - 1]; inView.current = e.isIntersecting && e.intersectionRatio >= 0.35; syncVisibility(); }, { threshold: [0, 0.35, 0.6, 1] });
    if (stage.current) io.observe(stage.current);
    const vis = () => syncVisibility();
    document.addEventListener('visibilitychange', vis);
    const onMsg = e => {
      const d = e.data;
      if (!d || typeof d !== 'object' || d.ns !== NS || d.v !== V || e.origin !== 'null') return;
      const i = frames.current.findIndex(f => f && f.contentWindow === e.source);
      if (i < 0) return;
      if (d.type === 'ready') { syncVisibility(); return; }
      if (d.type === 'state') setStates(s => ({ ...s, [i]: { playing: !!d.playing, reason: String(d.reason || '') } }));
    };
    window.addEventListener('message', onMsg);
    const ro = new ResizeObserver(() => { const w = body.current?.clientWidth || 0; setScale(w >= 1024 ? Math.min(1, w / W) : 0); });
    if (body.current) ro.observe(body.current);
    return () => { io.disconnect(); ro.disconnect(); document.removeEventListener('visibilitychange', vis); window.removeEventListener('message', onMsg); mq.removeEventListener?.('change', upd); };
  }, [syncVisibility]);

  const p = products[active], st = states[active] || { playing: false, reason: '' };
  const slack = p.embed.chrome === 'slack';
  const toggle = () => send(active, st.playing ? 'pause' : 'play');
  const controls = !reduced && (
    <span className="aw-controls">
      <button type="button" className="aw-btn" onClick={() => send(active, 'reset')} aria-label="Restart tour"><Icon d={RESTART} /></button>
      <button type="button" className="aw-btn" onClick={toggle} aria-pressed={!st.playing} aria-label={st.playing ? 'Pause tour' : 'Play tour'}><Icon d={st.playing ? PAUSE : PLAY} /></button>
    </span>
  );
  const frameStyle = scale ? { width: W + 'px', height: H + 'px', transform: `scale(${scale})` } : undefined;

  return (
    <div className="aw-wrap" data-keep>
      <div ref={stage} className={'aw' + (slack ? ' aw--slack' : '')}>
        <div className="aw-chrome">
          <span className="aw-dots" aria-hidden="true"><i /><i /><i /></span>
          {slack ? (
            <>
              <span className="aw-sk-nav" aria-hidden="true"><Icon d="M15 6l-6 6 6 6" /><Icon d="M9 6l6 6-6 6" /></span>
              <span className="aw-sk-search" aria-hidden="true"><Icon d="M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM20 20l-4.5-4.5" />Search Northfield Studio</span>
              <img className="aw-slack" src="/platform-logos/slack-mark.svg" alt="Slack" width="18" height="18" />
            </>
          ) : (
            <span className="aw-tab"><Mark embed={p.embed} /><span>{p.embed.title}</span></span>
          )}
          {controls}
        </div>
        <div ref={body} className={'aw-body' + (scale ? ' aw-body--scaled' : '')}>
          <div className="aw-skeleton" aria-hidden="true" />
          {products.map((q, i) => mounted.has(i) ? (
            <div key={q.slug} className={'aw-frame' + (i === active ? ' is-active' : '')}>
              <iframe
                ref={el => { frames.current[i] = el; }}
                src={q.embed.src + '?ctx=' + ctx + (reduced ? '&tour=0' : '')}
                title={q.name + ' live interface'}
                sandbox="allow-scripts"
                loading="lazy"
                referrerPolicy="no-referrer"
                style={frameStyle}
                onLoad={syncVisibility}
              />
            </div>
          ) : null)}
          <noscript><a className="aw-noscript" href={p.embed.src}>Open {p.name} live interface</a></noscript>
        </div>
      </div>
    </div>
  );
}
