// Shows the featured LinkedIn post in the phone. The share link is a lnkd.in
// short link, so resolve it to the post's activity ID and redirect to
// LinkedIn's official post embed. Cached for a day.
export const dynamic = 'force-dynamic';

const SHORT = 'https://lnkd.in/p/d2pmu83d';
const UA = { 'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' };

async function resolve() {
  let url = SHORT, body = '';
  for (let i = 0; i < 5; i++) {
    const r = await fetch(url, { headers: UA, redirect: 'manual', next: { revalidate: 86400 } });
    const loc = r.headers.get('location');
    if (loc) { url = new URL(loc, url).href; continue; }
    body = await r.text();
    break;
  }
  const hay = url + ' ' + body;
  const m = hay.match(/urn(?::|%3A)li(?::|%3A)(activity|share|ugcPost)(?::|%3A)(\d{15,22})/) || hay.match(/(activity)-(\d{15,22})/);
  return { url, urn: m ? `urn:li:${m[1]}:${m[2]}` : null };
}

export async function GET(req) {
  let r = { url: SHORT, urn: null };
  try { r = await resolve(); } catch {}
  if (new URL(req.url).searchParams.has('debug')) return Response.json(r);
  if (r.urn) return Response.redirect(`https://www.linkedin.com/embed/feed/update/${r.urn}`, 302);
  return Response.redirect('https://www.linkedin.com/in/bukhariahmad', 302);
}
