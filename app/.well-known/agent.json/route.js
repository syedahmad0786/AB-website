// A2A-style agent card. Points agents at the read-only MCP server. Optional convention; cheap to serve.
import { HOME_UPDATED, ORG, PERSON, SITE_URL } from '../../../lib/site';

export const dynamic = 'force-static';

export function GET() {
  return Response.json(
    {
      name: `${PERSON.name} (read-only profile)`,
      description: `Facts about ${PERSON.name}, ${PERSON.jobTitle}: profile, systems, case studies, open source, and how to book a call.`,
      url: `${SITE_URL}/mcp`,
      protocol: 'mcp',
      transport: 'streamable-http',
      version: HOME_UPDATED,
      provider: { organization: ORG.name, url: ORG.url },
      documentationUrl: `${SITE_URL}/llms.txt`,
      capabilities: { streaming: false, pushNotifications: false },
      authentication: { schemes: [] },
      skills: [
        { id: 'get_profile', name: 'Profile' },
        { id: 'list_systems', name: 'Systems and case studies' },
        { id: 'get_system', name: 'One system in detail' },
        { id: 'list_pages', name: 'Site pages' },
        { id: 'how_to_contact', name: 'Contact and booking' },
      ],
    },
    { headers: { 'cache-control': 'public, max-age=3600', 'access-control-allow-origin': '*' } },
  );
}
