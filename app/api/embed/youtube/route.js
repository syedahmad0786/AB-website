// Redirects the phone mockup's YouTube screen to an embeddable player of the
// channel's uploads. YouTube has no channel embed, so we read the channel ID
// from the public channel page and use its uploads playlist (UC… → UU…).
export const dynamic = 'force-dynamic';

const CHANNEL = 'https://www.youtube.com/@AhmadBukhari97';

export async function GET() {
  try {
    const html = await (await fetch(CHANNEL + '/videos', { headers: { 'accept-language': 'en' }, next: { revalidate: 86400 } })).text();
    const id = (html.match(/"(?:channelId|externalId)":"(UC[\w-]{22})"/) || [])[1];
    if (id) {
      return Response.redirect('https://www.youtube.com/embed/videoseries?list=UU' + id.slice(2) + '&rel=0&modestbranding=1', 302);
    }
  } catch {}
  return Response.redirect(CHANNEL, 302);
}
