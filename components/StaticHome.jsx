// Server-rendered version of the home page.
//
// components/Home.jsx reads window size, the clock and localStorage while rendering, so it only
// runs in the browser. This component carries the same copy, links and facts as plain HTML:
// it is what crawlers, link unfurlers and AI assistants read, and what a visitor sees until the
// interactive page mounts (HomeClient swaps it out). Data comes from lib/siteData.js and
// lib/site.js, the same sources the interactive page uses, so the two cannot drift apart.
import {
  AIXCEL_MODULES, AIXCEL_PRODUCTS, AIXCEL_SERVICES, ASK_LINKS, BOOKING_URL, EMAIL, HEADLINE, HERO_COPY, HERO_TAGS,
  JOURNEY, NOTES, PAGES, PERSON, PRINCIPLES,
} from '../lib/site';
import ProjectSelector from './ProjectSelector';
import { AG, CASES, CH, CLIENTS, PROTOS, REPOS, SYSTEMS, TOOLS } from '../lib/siteData';

function protoFor(name) {
  return PROTOS.find((p) => p.name === name);
}

export default function StaticHome() {
  const groups = ['Services', 'Industries', 'Proof'];
  return (
    <div className="ssr-home">
      <header className="ssr-head">
        <a href="#top" className="ssr-brand">
          <img src="/assets/ahmad-avatar.gif" alt="Ahmad Bukhari" width="36" height="36" />
          <span>Ahmad Bukhari</span>
        </a>
        <nav aria-label="Sections" className="ssr-nav">
          <a href="#clients">Work</a>
          <a href="#systems">Agents</a>
          <a href="#repos">Open source</a>
          <a href="#journey">Story</a>
          <a href="#aixcel">AiXCEL</a>
        </nav>
        <a href={BOOKING_URL} className="ssr-cta">Book a 25 min call ↗</a>
      </header>

      <main>
        <section id="top" className="ssr-hero">
          <p className="ssr-eyebrow">{HERO_TAGS.join(' / ')}</p>
          <h1>
            {HEADLINE.lead} <mark>{HEADLINE.mark1}</mark> {HEADLINE.mid} <mark>{HEADLINE.mark2}</mark>
          </h1>
          <p className="ssr-lead">{HERO_COPY}</p>
          <p className="ssr-actions">
            <a href={BOOKING_URL} className="ssr-cta">Book a 25 min systems call ↗</a>
            <a href="#systems">See the systems ↓</a>
          </p>
          <p className="ssr-proofline">
            <a href="https://n8n.io/creators/ahmadbukhari/">Verified n8n creator ↗</a>
            <a href="https://github.com/syedahmad0786">github.com/syedahmad0786 ↗</a>
            <span>{PERSON.availability} · {PERSON.location}</span>
          </p>
        </section>

        <ProjectSelector />
        <section className="ssr-section" aria-labelledby="ssr-principles">
          <h2 id="ssr-principles" className="ssr-eyebrow">What the workflow on this page demonstrates</h2>
          <dl className="ssr-grid">
            {PRINCIPLES.map(([num, title, body]) => (
              <div key={num}>
                <dt>{num} · {title}</dt>
                <dd>{body}</dd>
              </div>
            ))}
          </dl>
          <p className="ssr-muted">
            The tools I wire together, stack-agnostic and failure-aware: {TOOLS.map((t) => t[0]).join(', ')}.
          </p>
        </section>

        <section id="clients" className="ssr-section">
          <p className="ssr-eyebrow">Client work · delivered through AiXCEL Solutions</p>
          <h2>Built in their accounts. <mark>Still running today.</mark></h2>
          <p className="ssr-lead">
            Agencies, clinics, communities and investors handed over their lead flow, onboarding and reporting, and kept the systems we built. Counts describe the size of the work, not business results.
          </p>
          <div className="ssr-cards">
            {CASES.map((c) => (
              <article key={c.name}>
                <p className="ssr-eyebrow">{c.status} · {c.sector}</p>
                <h3><a href={c.href}>{c.name} ↗</a></h3>
                <p><strong>Problem.</strong> {c.problem}</p>
                <p><strong>What we built.</strong> {c.built}</p>
                <ul className="ssr-stats">
                  {c.stats.map(([n, suffix, label]) => (
                    <li key={label}><b>{n}{suffix}</b> {label}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <h3>Systems that reached their clients, too.</h3>
          <ul className="ssr-list">
            {CLIENTS.map((c) => (
              <li key={c[0]}>
                <a href={c[2]}>{c[0]}</a> <span className="ssr-muted">· {c[3]}</span> {c[4]}
              </li>
            ))}
          </ul>
        </section>

        <section id="journey" className="ssr-section">
          <p className="ssr-eyebrow">git log --graph · 7+ years operating</p>
          <h2>Operator first. <mark>Systems specialist by evolution.</mark></h2>
          <p className="ssr-lead">
            I spent years inside sales rooms, client conversations, training programs, and operational handoffs before designing the systems beneath them.
          </p>
          <blockquote>
            “That history shapes the work: I care whether the exception reaches the right person, whether the interface is clear at 2 a.m., and whether the team can operate the system after the builder leaves.”
          </blockquote>
          <div className="ssr-cards">
            {JOURNEY.map((j) => (
              <article key={j.title}>
                <p className="ssr-eyebrow">{j.when}</p>
                <h3>{j.title}</h3>
                <p>{j.body}</p>
                {j.stat ? <p><b>{j.stat[0]}</b> {j.stat[1]}</p> : null}
              </article>
            ))}
          </div>
        </section>

        <section id="aixcel" className="ssr-section ssr-band">
          <p className="ssr-eyebrow"><a href="https://aixcelsolutions.com">AiXCEL Solutions ↗</a> · Founder</p>
          <h2>The company I built <mark>to hand systems over.</mark></h2>
          <p className="ssr-lead">
            AiXCEL builds lead follow-up, client onboarding, reporting and monitoring inside each client’s own accounts, with a person approving every client-facing step. Founder-led, and built to be handed over with a runbook.
          </p>
          <p className="ssr-eyebrow">Four services · one approval layer · one set of numbers</p>
          <div className="ssr-cards">
            {AIXCEL_SERVICES.map((s) => (
              <article key={s.num}>
                <p className="ssr-eyebrow">{s.num} · {s.model}</p>
                <h3><a href={s.href}>{s.name} ↗</a></h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
          <div className="ssr-cards">
            {AIXCEL_PRODUCTS.map((p) => (
              <article key={p.name}>
                <p className="ssr-eyebrow">Product</p>
                <h3>{p.name}</h3>
                <p>{p.body}</p>
                {p.stats.length ? (
                  <ul className="ssr-stats">
                    {p.stats.map(([n, label]) => (<li key={label}><b>{n}</b> {label}</li>))}
                  </ul>
                ) : null}
                <p><a href={p.href}>{p.cta} ↗</a></p>
              </article>
            ))}
          </div>
          <p className="ssr-muted">
            Modules inside the services: {AIXCEL_MODULES.map(([name, href], i) => (
              <span key={name}>{i ? ' · ' : ''}<a href={href}>{name} ↗</a></span>
            ))}
          </p>
        </section>

        <section id="systems" className="ssr-section ssr-dark" data-keep="">
          <p className="ssr-eyebrow">Ten flagship agentic systems · verified public demos</p>
          <h2>Agents that stop <mark>where a person should decide.</mark></h2>
          <p className="ssr-lead">
            A production-minded revenue and creator operations portfolio proving controlled multi-agent orchestration, evidence, typed APIs, human approval, evaluation, observability, replay, and cloud deployment.
          </p>
          <ol className="ssr-cards">
            {AG.map((a) => {
              const p = protoFor(a.name);
              return (
                <li key={a.slug}>
                  <article>
                    <p className="ssr-eyebrow">{a.kind} · {a.verified}</p>
                    <h3>{a.name}</h3>
                    <p>{a.desc}</p>
                    <p className="ssr-muted">{a.checks.join(' · ')}</p>
                    {p ? (
                      <p>
                        <a href={p.href}>
                          {p.mode === 'demo' ? 'Open live system ↗' : p.mode === 'gh' ? 'Read the source on GitHub ↗' : 'Request access ↗'}
                        </a>
                      </p>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ol>
          <h3>Flagship systems and case studies</h3>
          <ul className="ssr-list">
            {SYSTEMS.map((s) => (
              <li key={s.name}>
                <a href={s.href}>{s.name}</a> <span className="ssr-muted">· {s.kind} · {s.status}</span> {s.desc}
              </li>
            ))}
          </ul>
        </section>

        <section id="repos" className="ssr-section">
          <p className="ssr-eyebrow">Open source · {REPOS.length} public repos</p>
          <h2>Repos you can inspect. <mark>Not claims you have to trust.</mark></h2>
          <p className="ssr-lead">Small, focused systems that expose the architecture, the safety rails, and the real run path.</p>
          <ul className="ssr-list">
            {REPOS.map((r) => (
              <li key={r.slug}>
                <a href={`https://github.com/syedahmad0786/${r.slug}`}>{r.name} ↗</a> <span className="ssr-muted">· {r.kind}</span> {r.desc}
              </li>
            ))}
          </ul>
        </section>

        <section id="notes" className="ssr-section">
          <p className="ssr-eyebrow">Field notes · what I’m finding now</p>
          <ul className="ssr-list">
            {NOTES.map((n) => (
              <li key={n.title}>
                <span className="ssr-muted">{n.label}</span><br />
                <a href={n.href}>{n.title} ↗</a> {n.body}
              </li>
            ))}
          </ul>
        </section>

        <section id="socials" className="ssr-section ssr-band">
          <p className="ssr-eyebrow">Build in public · {CH.length} channels</p>
          <h2>Watch the builds <mark>between the case studies.</mark></h2>
          <p className="ssr-lead">Reels, walkthroughs, source and notes from systems in progress. Pick a channel.</p>
          <ul className="ssr-list ssr-inline">
            {CH.map((c) => (
              <li key={c[0]}><a href={c[4]}>{c[0]} {c[3]} ↗</a></li>
            ))}
          </ul>
        </section>

        <section id="contact" className="ssr-section ssr-dark" data-keep="">
          <p className="ssr-eyebrow">Next system · open to selected roles and builds</p>
          <h2>Bring me the <mark>messy part.</mark></h2>
          <p className="ssr-lead">If the work crosses AI, automation, CRM, operations, or product delivery, and the edge cases matter, we should talk.</p>
          <p className="ssr-actions">
            <a href={BOOKING_URL} className="ssr-cta">Book a systems call ↗</a>
            <a href={`mailto:${EMAIL}?subject=Systems%20project%20inquiry`}>Send the messy part ↗</a>
          </p>
          <p className="ssr-muted">Or ask an AI about me first: {ASK_LINKS.map(([name, href], i) => (
            <span key={name}>{i ? ' · ' : ''}<a href={href} target="_blank" rel="noopener">{name} ↗</a></span>
          ))}</p>
        </section>
      </main>

      <footer className="ssr-foot" data-keep="">
        <p><b>Ahmad Bukhari</b> · {PERSON.jobTitle} · {PERSON.location}</p>
        <nav aria-label="Site" className="ssr-sitenav">
          {groups.map((g) => (
            <div key={g}>
              <p className="ssr-eyebrow">{g}</p>
              <ul>
                {PAGES.filter((p) => p.group === g).map((p) => (
                  <li key={p.path}><a href={p.path}>{p.title}</a></li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="ssr-eyebrow">Elsewhere</p>
            <ul>
              <li><a href={`mailto:${EMAIL}`}>Email</a></li>
              <li><a href="https://www.linkedin.com/in/bukhariahmad">LinkedIn</a></li>
              <li><a href="https://github.com/syedahmad0786">GitHub</a></li>
              <li><a href="https://n8n.io/creators/ahmadbukhari/">n8n</a></li>
              <li><a href="https://x.com/ahmadbukhari">X</a></li>
              <li><a href="https://www.youtube.com/@AhmadBukhari97">YouTube</a></li>
              <li><a href="/llms.txt">llms.txt</a></li>
              <li><a href="/feed.xml">RSS</a></li>
            </ul>
          </div>
        </nav>
      </footer>
    </div>
  );
}
