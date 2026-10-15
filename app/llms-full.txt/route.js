import { llmsText } from '../llms.txt/route';
import { AIXCEL_PRODUCTS, AIXCEL_SERVICES, HERO_COPY, JOURNEY, NOTES, ORG, PRINCIPLES, SITE_URL } from '../../lib/site';
import { AG, CASES, CLIENTS, PROTOS } from '../../lib/siteData';

export const dynamic = 'force-static';

export function GET() {
  const proto = (name) => PROTOS.find((p) => p.name === name);
  const body = `${llmsText()}
---

# Full text of ${SITE_URL}/

${HERO_COPY}

## What the workflow on the home page demonstrates

${PRINCIPLES.map(([n, t, b]) => `${n}. ${t}: ${b}`).join('\n')}

## Client work, delivered through ${ORG.name}

Agencies, clinics, communities and investors handed over their lead flow, onboarding and reporting, and kept the systems we built. Counts describe the size of the work, not business results.

${CASES.map((c) => `### ${c.name} (${c.sector}; ${c.status})
Problem: ${c.problem}
What we built: ${c.built}
Counts: ${c.stats.map(([n, s, l]) => `${n}${s} ${l}`).join('; ')}
URL: ${c.href}`).join('\n\n')}

### Systems that reached their clients, too
${CLIENTS.map((c) => `- ${c[0]} (${c[3]}): ${c[4]} ${c[2]}`).join('\n')}

## Operator first. Systems specialist by evolution.

I spent years inside sales rooms, client conversations, training programs, and operational handoffs before designing the systems beneath them. That history shapes the work: I care whether the exception reaches the right person, whether the interface is clear at 2 a.m., and whether the team can operate the system after the builder leaves.

${JOURNEY.map((j) => `- ${j.when}: ${j.title}. ${j.body}${j.stat ? ` (${j.stat[0]} ${j.stat[1]})` : ''}`).join('\n')}

## ${ORG.name}: the company I built to hand systems over

${ORG.description}

Services:
${AIXCEL_SERVICES.map((s) => `- ${s.name} (${s.model}): ${s.body} ${s.href}`).join('\n')}

Products:
${AIXCEL_PRODUCTS.map((p) => `- ${p.name}: ${p.body}${p.stats.length ? ' ' + p.stats.map(([n, l]) => `${n} ${l}`).join('; ') + '.' : ''} ${p.href}`).join('\n')}

## Ten flagship agentic systems

Agents that stop where a person should decide. A production-minded revenue and creator operations portfolio proving controlled multi-agent orchestration, evidence, typed APIs, human approval, evaluation, observability, replay, and cloud deployment.

${AG.map((a) => {
    const p = proto(a.name);
    return `### ${a.name} (${a.kind}; ${a.verified})
${a.desc}
Checks: ${a.checks.join('; ')}
${p ? `Link: ${p.href}` : ''}`;
  }).join('\n\n')}

## Field notes

${NOTES.map((n) => `- ${n.title}: ${n.body} ${n.href}`).join('\n')}
`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
}
