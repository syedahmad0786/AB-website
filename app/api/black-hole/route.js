// Black hole imagery for the contact-section circle, pulled from NASA on the
// server so the API key never reaches the browser. NASA responses are cached
// for a day; an empty result is only cached briefly so a NASA hiccup heals itself.
export const dynamic = 'force-dynamic';
const revalidate = 86400;

const KEY = process.env.NASA_API_KEY || process.env.API || 'DEMO_KEY';
const BLACK_HOLE = /black hole|event horizon|sgr a\*|sagittarius a\*|accretion disk/i;
const NOT_A_PICTURE = /history of|spirograph|scientist|team|briefing|press|conference|portrait|award|meeting/i;

// APOD days that featured black holes. Titles are checked before use, so a
// date that turns out to be something else is skipped, not shown.
const APOD_DATES = ['2019-04-11', '2022-05-13', '2021-03-25', '2019-09-27', '2022-05-12'];

async function fromApod(diag) {
  const out = [];
  await Promise.all(APOD_DATES.map(async date => {
    try {
      const r = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${KEY}&date=${date}&thumbs=true`, { next: { revalidate } });
      if (!r.ok) { diag.push(`apod ${date}: ${r.status}`); return; }
      const a = await r.json();
      diag.push(`apod ${date}: ${a.media_type} "${a.title}"`);
      if (a.media_type !== 'image' || !BLACK_HOLE.test(a.title + ' ' + a.explanation)) return;
      out.push({ src: a.url || a.hdurl, title: a.title, date: a.date, credit: (a.copyright || 'NASA').replace(/\s+/g, ' ').trim(), href: `https://apod.nasa.gov/apod/ap${date.slice(2).replace(/-/g, '')}.html` });
    } catch (e) {
      diag.push(`apod ${date}: ${e.message}`);
    }
  }));
  return out.sort((a, b) => a.date.localeCompare(b.date));
}

// NASA Image and Video Library: black hole images whose title says so.
async function fromLibrary(diag) {
  try {
    const r = await fetch('https://images-api.nasa.gov/search?q=black%20hole&media_type=image&page_size=100', { next: { revalidate } });
    if (!r.ok) { diag.push(`library: ${r.status}`); return []; }
    const items = (await r.json())?.collection?.items || [];
    diag.push(`library: ${items.length} results`);
    return items
      .map(it => ({ d: it.data?.[0] || {}, l: it.links?.find(x => x.render === 'image') }))
      .filter(x => x.l && BLACK_HOLE.test(x.d.title || '') && !NOT_A_PICTURE.test(x.d.title || ''))
      .slice(0, 5)
      .map(x => ({ src: x.l.href.replace(/~(thumb|small)\./, '~medium.'), fallback: x.l.href, title: x.d.title, date: (x.d.date_created || '').slice(0, 10), credit: x.d.center ? 'NASA ' + x.d.center : 'NASA', href: `https://images.nasa.gov/details/${encodeURIComponent(x.d.nasa_id)}` }));
  } catch (e) {
    diag.push(`library: ${e.message}`);
    return [];
  }
}

export async function GET(req) {
  const diag = [];
  const [apod, lib] = await Promise.all([fromApod(diag), fromLibrary(diag)]);
  const images = [...apod, ...lib].slice(0, 6);
  const body = new URL(req.url).searchParams.has('debug') ? { images, diag, key: KEY === 'DEMO_KEY' ? 'demo' : 'set' } : { images };
  const cache = images.length ? 'public, s-maxage=86400, stale-while-revalidate=604800' : 'public, s-maxage=300';
  return Response.json(body, { headers: { 'Cache-Control': cache } });
}
