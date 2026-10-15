'use client';

// Renders an embed. Video embeds fill the screen; web pages are laid out at a
// real phone width (430px) and scaled down, so they look like the mobile site
// instead of a squeezed desktop page.
import { useEffect, useRef, useState } from 'react';

const PAGE_WIDTH = 430;

export default function ScaledFrame({ src, title, mode }) {
  const boxRef = useRef(null);
  const [box, setBox] = useState(null);

  useEffect(() => {
    if (mode !== 'page' || !boxRef.current) return;
    const el = boxRef.current;
    const ro = new ResizeObserver(() => setBox({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, [mode]);

  const common = { src, title, loading: 'lazy', allow: 'autoplay; encrypted-media; picture-in-picture; fullscreen', referrerPolicy: 'strict-origin-when-cross-origin' };
  if (mode !== 'page') {
    return <iframe {...common} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, background: '#000' }} />;
  }
  const s = box && box.w ? box.w / PAGE_WIDTH : 0;
  return (
    <div ref={boxRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#FFFFFF' }}>
      {s > 0 && (
        <iframe {...common} style={{ position: 'absolute', left: 0, top: 0, width: PAGE_WIDTH, height: box.h / s, border: 0, transform: `scale(${s})`, transformOrigin: '0 0' }} />
      )}
    </div>
  );
}
