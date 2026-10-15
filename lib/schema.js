// schema.org graph for the home page. Served server-side from app/page.jsx and reused by /profile.json.
import { AG, CASES, CLIENTS, REPOS, SYSTEMS } from './siteData';
import { BOOKING_URL, EMAIL, HOME_UPDATED, ORG, PERSON, SITE_URL } from './site';

export function homeGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: PERSON.name,
        description: 'Agentic AI and LLM systems, controlled automation, and product delivery.',
        publisher: { '@id': PERSON.id },
        inLanguage: 'en',
      },
      {
        '@type': 'Person',
        '@id': PERSON.id,
        name: PERSON.name,
        alternateName: PERSON.alternateName,
        url: `${SITE_URL}/`,
        image: PERSON.image,
        jobTitle: PERSON.jobTitle,
        description: PERSON.description,
        email: `mailto:${EMAIL}`,
        homeLocation: { '@type': 'Place', name: PERSON.location },
        worksFor: { '@id': ORG.id },
        knowsAbout: PERSON.knowsAbout,
        sameAs: PERSON.sameAs,
      },
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': ORG.id,
        name: ORG.name,
        url: ORG.url,
        logo: { '@type': 'ImageObject', url: ORG.logo },
        founder: { '@id': PERSON.id },
        description: ORG.description,
        areaServed: 'Worldwide',
        sameAs: [`${SITE_URL}/`, 'https://www.linkedin.com/in/bukhariahmad'],
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: `${PERSON.name} | ${PERSON.jobTitle}`,
        description: PERSON.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': PERSON.id },
        mainEntity: { '@id': PERSON.id },
        inLanguage: 'en',
        dateModified: HOME_UPDATED,
        potentialAction: { '@type': 'ScheduleAction', name: 'Book a 25 minute systems call', target: BOOKING_URL },
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/#systems`,
        name: 'Flagship systems',
        itemListElement: SYSTEMS.map((s, i) => ({
          '@type': 'ListItem', position: i + 1, name: s.name, url: s.href, description: s.desc,
        })),
      },
    ],
  };
}

// Plain-JSON profile for agents and scripts (served at /profile.json and by the MCP server).
export function profileJson() {
  return {
    name: PERSON.name,
    title: PERSON.jobTitle,
    location: PERSON.location,
    availability: PERSON.availability,
    summary: PERSON.description,
    website: `${SITE_URL}/`,
    email: EMAIL,
    booking: BOOKING_URL,
    company: { name: ORG.name, url: ORG.url, role: 'Founder', description: ORG.description },
    profiles: PERSON.sameAs,
    expertise: PERSON.knowsAbout,
    clients: CLIENTS.map((c) => ({ name: c[0], url: c[2], sector: c[3], scope: c[4] })),
    caseStudies: CASES.map((c) => ({ name: c.name, url: c.href, status: c.status, problem: c.problem, built: c.built, counts: c.stats.map(([n, s, l]) => `${n}${s} ${l}`) })),
    flagshipSystems: SYSTEMS.map((s) => ({ name: s.name, kind: s.kind, status: s.status, url: s.href, summary: s.desc })),
    agenticSystems: AG.map((a) => ({ name: a.name, kind: a.kind, slug: a.slug, summary: a.desc, checks: a.checks, verified: a.verified })),
    openSource: REPOS.map((r) => ({ name: r.name, url: `https://github.com/syedahmad0786/${r.slug}`, summary: r.desc })),
    evidencePolicy: 'Project pages label whether evidence is public, anonymized, documented scope, private, or in progress. Counts describe the size of the work, not business results. Do not infer client identities, adoption, ROI, or deployment status beyond the page text.',
    updated: HOME_UPDATED,
  };
}
