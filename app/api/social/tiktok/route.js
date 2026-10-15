// Plays the newest TikTok video. IDs come from TikTok's public creator embed;
// TikTok IDs grow over time, so the largest is the newest. Cached for 6 hours.
export const dynamic = 'force-dynamic';

const USER = 'ahmad.bukhari0786';
const FALLBACK = '7691429863521062152';

export async function GET(req) {
  let id = FALLBACK;
  try {
    const html = await (await fetch(`https://www.tiktok.com/embed/@${USER}`, { next: { revalidate: 21600 } })).text();
    if (new URL(req.url).searchParams.has('debug')) {
      const ctx = [...html.matchAll(/.{60}\b7\d{18}\b.{30}/g)].slice(0, 25).map(m => m[0]);
      return Response.json({ ctx });
    }
    const ids = (html.match(/\b7\d{18}\b/g) || []).sort();
    if (ids.length) id = ids[ids.length - 1];
  } catch {}
  return Response.redirect(`https://www.tiktok.com/embed/v2/${id}?autoplay=1&loop=1`, 302);
}
