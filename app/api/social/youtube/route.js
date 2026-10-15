// Plays the channel's latest Shorts (vertical, so they fill the phone screen).
// Reads the IDs from the public Shorts tab; cached for 6 hours.
export const dynamic = 'force-dynamic';

const CHANNEL = 'https://www.youtube.com/@AhmadBukhari97';
const FALLBACK = ['PqhMF2ZfPRw', 'NELWcARM1ZY', 'scbgdJDaHTI', 'cN-spcYXkig', 'pDb2HiCGIpg'];

export async function GET() {
  let ids = [];
  try {
    const html = await (await fetch(CHANNEL + '/shorts', { headers: { 'accept-language': 'en' }, next: { revalidate: 21600 } })).text();
    ids = [...new Set((html.match(/"videoId":"([\w-]{11})"/g) || []).map(s => s.slice(11, 22)))];
  } catch {}
  if (!ids.length) ids = FALLBACK;
  const list = ids.slice(0, 10);
  const url = `https://www.youtube.com/embed/${list[0]}?autoplay=1&mute=1&loop=1&playlist=${list.join(',')}&playsinline=1&rel=0&modestbranding=1`;
  return Response.redirect(url, 302);
}
