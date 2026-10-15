// Temporary diagnostics (removed after use).
export const dynamic = 'force-dynamic';
const UA = { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36', 'accept-language': 'en' };
async function probe(u, extract) {
  try {
    const r = await fetch(u, { headers: UA, redirect: 'manual' });
    const t = await r.text();
    return { status: r.status, location: r.headers.get('location'), title: (t.match(/<title[^>]*>([^<]{0,120})/) || [])[1] || null, extra: extract ? extract(t) : undefined };
  } catch (e) { return { error: e.message }; }
}
export async function GET() {
  const out = {};
  out.calEvent = await probe('https://cal.com/ahmad-bukhari/revenue-handoff-map');
  out.calProfile = await probe('https://cal.com/ahmad-bukhari', t => [...new Set((t.match(/ahmad-bukhari\/[a-z0-9-]+/g) || []))].slice(0, 12));
  out.calApi = await probe('https://api.cal.com/v1/public/users/ahmad-bukhari');
  out.oldSiteVercel = await probe('https://ab-website-nine.vercel.app/work');
  out.oldSiteDomain = await probe('https://ahmadbukhari.com/work');
  out.ytVideos = await probe('https://www.youtube.com/@AhmadBukhari97/videos', t => [...new Set((t.match(/"videoId":"([\w-]{11})"/g) || []).map(s => s.slice(11, 22)))].slice(0, 8));
  out.ytShorts = await probe('https://www.youtube.com/@AhmadBukhari97/shorts', t => [...new Set((t.match(/"videoId":"([\w-]{11})"/g) || []).map(s => s.slice(11, 22)))].slice(0, 8));
  out.tiktok = await probe('https://www.tiktok.com/@ahmad.bukhari0786', t => [...new Set((t.match(/\/video\/(\d{15,22})/g) || []))].slice(0, 8));
  out.tiktokEmbed = await probe('https://www.tiktok.com/embed/@ahmad.bukhari0786', t => ({ len: t.length, videos: [...new Set((t.match(/\d{18,20}/g) || []))].slice(0, 6), noContent: /no content|unavailable|couldn't find/i.test(t) }));
  out.fbPlugin = await probe('https://www.facebook.com/plugins/page.php?href=' + encodeURIComponent('https://www.facebook.com/profile.php?id=61593858664534') + '&tabs=timeline&width=320&height=640', t => ({ len: t.length, hasName: /Ahmad/i.test(t), unavailable: /isn.t available|not available|content isn/i.test(t) }));
  out.igPublic = await probe('https://www.instagram.com/bukharibuildsai/', t => [...new Set((t.match(/\/(?:p|reel)\/[\w-]{8,14}/g) || []))].slice(0, 8));
  return Response.json(out, { headers: { 'Cache-Control': 'no-store' } });
}
