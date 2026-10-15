'use client';

// The black hole beside "Bring me the messy part": the M87* photo first, then
// NASA black hole imagery from /api/black-hole, cross-fading like a slow GIF
// inside the same circle. Images that fail to load are skipped.
import { useEffect, useState } from 'react';

const M87 = {
  src: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg',
  title: 'M87*',
  credit: 'Event Horizon Telescope Collaboration, CC BY 4.0',
  href: 'https://commons.wikimedia.org/wiki/File:Black_hole_-_Messier_87_crop_max_res.jpg',
};

const mask = 'radial-gradient(circle, #000 52%, transparent 71%)';

export default function NasaBlackHole({ active }) {
  const [images, setImages] = useState([M87]);
  const [loaded, setLoaded] = useState({});
  const [i, setI] = useState(0);

  useEffect(() => {
    fetch('/api/black-hole')
      .then(r => (r.ok ? r.json() : { images: [] }))
      .then(d => setImages([M87, ...(d.images || [])]))
      .catch(() => {});
  }, []);

  const ready = images.map((_, k) => k).filter(k => loaded[k]);
  useEffect(() => {
    if (ready.length < 2) return;
    const t = setInterval(() => setI(n => n + 1), 7000);
    return () => clearInterval(t);
  }, [ready.length]);

  const shown = ready.length ? ready[i % ready.length] : 0;
  const cur = images[shown];

  return (
    <>
      <div data-bh="1" aria-hidden="true" style={{ position: 'absolute', right: '4%', top: '50%', width: 'min(46vw, 560px)', aspectRatio: '1', transform: 'translateY(-50%)', zIndex: 0, pointerEvents: 'none' }}>
        {images.map((im, k) => (
          <img
            key={im.src}
            src={im.src}
            alt=""
            decoding="async"
            fetchPriority="low"
            onLoad={() => setLoaded(s => ({ ...s, [k]: true }))}
            onError={e => { if (im.fallback && e.currentTarget.src !== im.fallback) e.currentTarget.src = im.fallback; }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', mixBlendMode: 'screen', WebkitMaskImage: mask, maskImage: mask, opacity: k === shown ? 1 : 0, transition: 'opacity 1.8s ease', animation: 'abGlow 7s ease-in-out infinite' }}
          />
        ))}
        <div style={{ position: 'absolute', inset: '7%', borderRadius: '50%', border: '1.5px dashed rgba(255,90,31,' + (active ? '.75' : '.25') + ')', animation: 'abSpin 30s linear infinite', transition: 'border-color .6s' }} />
        <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontFamily: 'Space Mono, monospace', fontSize: 13, letterSpacing: '.3em', color: 'rgba(255,214,170,.85)', textShadow: '0 0 18px rgba(255,90,31,.9)' }}>AGI</span>
      </div>
      <a href={cur.href} target="_blank" rel="noopener" style={{ position: 'absolute', right: 14, bottom: 10, zIndex: 1, maxWidth: 'calc(100% - 28px)', fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#6B675F', textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {cur.title} · {cur.credit}{cur.date ? ' · ' + cur.date : ''}
      </a>
    </>
  );
}
