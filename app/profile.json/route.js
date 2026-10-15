import { profileJson } from '../../lib/schema';

export const dynamic = 'force-static';

export function GET() {
  return Response.json(profileJson(), { headers: { 'cache-control': 'public, max-age=3600', 'access-control-allow-origin': '*' } });
}
