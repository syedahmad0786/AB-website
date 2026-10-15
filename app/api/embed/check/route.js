// Temporary diagnostic: can each social embed be framed by this site?
export const dynamic = 'force-dynamic';

const URLS = {
  x: 'https://syndication.twitter.com/srv/timeline-profile/screen-name/ahmadbukhari?dnt=true&theme=dark',
  instagram: 'https://www.instagram.com/bukharibuildsai/embed/',
  tiktok: 'https://www.tiktok.com/embed/@ahmad.bukhari0786',
  facebook: 'https://www.facebook.com/plugins/page.php?href=' + encodeURIComponent('https://www.facebook.com/profile.php?id=61593858664534') + '&tabs=timeline&width=320&height=640',
  linkedin: 'https://www.linkedin.com/in/bukhariahmad',
  github: 'https://github.com/syedahmad0786',
  n8n: 'https://n8n.io/creators/ahmadbukhari/',
  youtubeChannel: 'https://www.youtube.com/@AhmadBukhari97/videos',
};

export async function GET() {
  const out = {};
  await Promise.all(Object.entries(URLS).map(async ([k, u]) => {
    try {
      const r = await fetch(u, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36', 'accept-language': 'en' } });
      const body = await r.text();
      out[k] = { status: r.status, final: r.url.slice(0, 120), xfo: r.headers.get('x-frame-options'), fa: (r.headers.get('content-security-policy') || '').match(/frame-ancestors[^;]*/)?.[0] || null, len: body.length, channelId: k === 'youtubeChannel' ? (body.match(/"(?:channelId|externalId)":"(UC[\w-]{22})"/) || [])[1] || null : undefined, title: (body.match(/<title[^>]*>([^<]{0,90})/) || [])[1] || null };
    } catch (e) { out[k] = { error: e.message }; }
  }));
  return Response.json(out, { headers: { 'Cache-Control': 'no-store' } });
}
