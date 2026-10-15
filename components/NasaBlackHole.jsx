'use client';

// Footer band: NASA black hole imagery, cross-fading like a slow GIF.
// Renders nothing until at least one image has loaded, so a NASA outage
// leaves the footer exactly as designed.
import { useEffect, useState } from 'react';

export default function NasaBlackHole() {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState({});
  const [i, setI] = useState(0);

  useEffect(() => {
    fetch('/api/black-hole').then(r => (r.ok ? r.json() : { images: [] })).then(d => setImages(d.images || [])).catch(() => {});
  }, []);

  const ready = images.filter((_, k) => loaded[k]);
  useEffect(() => {
    if (ready.length < 2) return;
    const t = setInterval(() => setI(n => n + 1), 7000);
    return () => clearInterval(t);
  }, [ready.length]);

  const shown = ready.length ? images.indexOf(ready[i % ready.length]) : -1;
  const cur = images[shown];

  return (
    <div className="ab-bh" style={{ display: ready.length ? 'block' : 'none' }} aria-label="Black hole imagery from NASA">
      {images.map((im, k) => (
        <img
          key={k}
          src={im.src}
          alt={im.title}
          fetchPriority="low"
          decoding="async"
          onLoad={() => setLoaded(s => ({ ...s, [k]: true }))}
          onError={e => { if (im.fallback && e.currentTarget.src !== im.fallback) e.currentTarget.src = im.fallback; }}
          style={{ opacity: k === shown ? 1 : 0 }}
        />
      ))}
      <div className="ab-bh-fade" />
      {cur && (
        <a className="ab-bh-cap" href={cur.href} target="_blank" rel="noopener">
          <span style={{ color: '#FF5A1F' }}>●</span> {cur.title} · {cur.credit}{cur.date ? ' · ' + cur.date : ''} ↗
        </a>
      )}
    </div>
  );
}
