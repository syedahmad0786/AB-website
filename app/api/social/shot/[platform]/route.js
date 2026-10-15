// Mobile screenshot of a public profile, as a logged-out visitor sees it on a
// phone. Captured by Microlink at an iPhone Pro Max viewport and cached at the
// edge for a day. Only the profiles listed here can be captured.
export const dynamic = 'force-dynamic';

const PROFILES = {
  instagram: 'https://www.instagram.com/bukharibuildsai/',
  facebook: 'https://www.facebook.com/profile.php?id=61593858664534',
  x: 'https://x.com/ahmadbukhari',
  linkedin: 'https://www.linkedin.com/in/bukhariahmad',
  github: 'https://github.com/syedahmad0786',
};

export async function GET(_req, { params }) {
  const { platform } = await params;
  const url = PROFILES[platform];
  if (!url) return new Response('Not found', { status: 404 });
  const api = new URL('https://api.microlink.io/');
  Object.entries({
    url,
    screenshot: 'true',
    meta: 'false',
    embed: 'screenshot.url',
    'viewport.width': '430',
    'viewport.height': '932',
    'viewport.deviceScaleFactor': '2',
    'viewport.isMobile': 'true',
    'viewport.hasTouch': 'true',
    type: 'jpeg',
    waitForTimeout: '2500',
  }).forEach(([k, v]) => api.searchParams.set(k, v));
  try {
    const r = await fetch(api, { next: { revalidate: 86400 } });
    const type = r.headers.get('content-type') || '';
    if (!r.ok || !type.startsWith('image/')) return new Response('Capture failed', { status: 502, headers: { 'Cache-Control': 'public, s-maxage=300' } });
    return new Response(await r.arrayBuffer(), { headers: { 'Content-Type': type, 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' } });
  } catch {
    return new Response('Capture failed', { status: 502, headers: { 'Cache-Control': 'public, s-maxage=300' } });
  }
}
