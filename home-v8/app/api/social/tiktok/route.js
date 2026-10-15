// Plays the newest TikTok video. Reads the creator's own video links from
// TikTok's public creator embed (newest first); cached for 6 hours.
export const dynamic = 'force-dynamic';

const USER = 'ahmad.bukhari0786';
const FALLBACK = '7691429863521062152';

export async function GET() {
  let id = FALLBACK;
  try {
    const html = await (await fetch(`https://www.tiktok.com/embed/@${USER}`, { next: { revalidate: 21600 } })).text();
    const m = html.match(new RegExp(`@${USER.replace('.', '\\.')}/video/(\\d{15,22})`));
    if (m) id = m[1];
  } catch {}
  return Response.redirect(`https://www.tiktok.com/embed/v2/${id}?autoplay=1&loop=1`, 302);
}
