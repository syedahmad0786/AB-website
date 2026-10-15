// Black hole imagery for the contact-section circle, pulled from NASA on the server so the
// API key never reaches the browser. NASA responses are cached for a day;
// an empty result is only cached briefly so a NASA hiccup heals itself.
export const dynamic = 'force-dynamic';
const revalidate = 86400;

const KEY = process.env.NASA_API_KEY || process.env.API || 'DEMO_KEY';
const BLACK_HOLE = /black hole|event horizon|sgr a|sagittarius a|m87|accretion/i;

// APOD days that featured black holes. Titles are checked before use, so a
// date that turns out to be something else is skipped, not shown.
const APOD_DATES = ['2019-04-11', '2022-05-13', '2021-03-25', '2019-09-27', '2022-05-12'];

async function fromApod() {
  const out = [];
  for (const date of APOD_DATES) {
    try {
      const r = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${KEY}&date=${date}&thumbs=true`, { next: { revalidate } });
      if (!r.ok) continue;
      const a = await r.json();
      if (a.media_type !== 'image' || !BLACK_HOLE.test(a.title + ' ' + a.explanation)) continue;
      out.push({ src: a.url || a.hdurl, title: a.title, date: a.date, credit: (a.copyright || 'NASA').replace(/\s+/g, ' ').trim(), href: `https://apod.nasa.gov/apod/ap${date.slice(2).replace(/-/g, '')}.html` });
    } catch {}
  }
  return out;
}

// NASA Image and Video Library: Goddard's black hole visualizations.
async function fromLibrary() {
  try {
    const r = await fetch('https://images-api.nasa.gov/search?q=black%20hole%20visualization&media_type=image', { next: { revalidate } });
    if (!r.ok) return [];
    const items = (await r.json())?.collection?.items || [];
    return items
      .map(it => ({ d: it.data?.[0] || {}, l: it.links?.find(x => x.render === 'image') }))
      .filter(x => x.l && BLACK_HOLE.test((x.d.title || '') + ' ' + (x.d.description || '')))
      .slice(0, 4)
      .map(x => ({ src: x.l.href.replace('~thumb', '~medium'), fallback: x.l.href, title: x.d.title, date: (x.d.date_created || '').slice(0, 10), credit: x.d.center ? 'NASA ' + x.d.center : 'NASA', href: `https://images.nasa.gov/details/${encodeURIComponent(x.d.nasa_id)}` }));
  } catch {
    return [];
  }
}

export async function GET() {
  const [apod, lib] = await Promise.all([fromApod(), fromLibrary()]);
  const images = [...apod, ...lib].slice(0, 6);
  const cache = images.length ? 'public, s-maxage=86400, stale-while-revalidate=604800' : 'public, s-maxage=300';
  return Response.json({ images }, { headers: { 'Cache-Control': cache } });
}
