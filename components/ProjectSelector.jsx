'use client';
import { useEffect, useRef, useState } from 'react';
import { FEATURED_PRODUCTS } from '../lib/siteData';
import AppWindow from './AppWindow';

export default function ProjectSelector() {
  const [active, setActive] = useState(0), [enhanced, setEnhanced] = useState(false);
  const tabs = useRef([]);
  const n = FEATURED_PRODUCTS.length;
  useEffect(() => { setEnhanced(true); }, []);
  function move(e, i) {
    const keys = { ArrowRight: (i + 1) % n, ArrowDown: (i + 1) % n, ArrowLeft: (i + n - 1) % n, ArrowUp: (i + n - 1) % n, Home: 0, End: n - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault(); setActive(keys[e.key]); tabs.current[keys[e.key]]?.focus();
  }
  return <section className="project-selector" aria-labelledby="built-systems-title"><div className="project-selector-inner">
    <header className="project-selector-heading"><div><p className="project-selector-label">Selected projects</p><h2 id="built-systems-title">Built systems</h2></div><a href="/work/case-studies">All 13 projects →</a></header>
    {enhanced
      ? <div className="project-selector-tabs" role="tablist" aria-label="Choose a built system">{FEATURED_PRODUCTS.map((p, i) => <button key={p.slug} ref={el => { tabs.current[i] = el; }} id={'project-tab-' + p.slug} type="button" role="tab" aria-selected={active === i} aria-controls={'project-panel-' + p.slug} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={e => move(e, i)}>{p.name}</button>)}</div>
      : <nav className="project-selector-tabs" aria-label="Featured project links">{FEATURED_PRODUCTS.map(p => <a key={p.slug} href={p.caseHref}>{p.name}</a>)}</nav>}
    <div className="ps-stage">{enhanced ? <AppWindow products={FEATURED_PRODUCTS} active={active} /> : <div className="aw-wrap" data-keep><div className="aw"><div className="aw-chrome" /><div className="aw-body"><div className="aw-skeleton" /></div></div></div>}</div>
    <div className="ps-copy-stack">{FEATURED_PRODUCTS.map((p, i) => <article className="project-selector-panel ps-panel" key={p.slug} id={'project-panel-' + p.slug} role={enhanced ? 'tabpanel' : undefined} aria-labelledby={enhanced ? 'project-tab-' + p.slug : 'project-title-' + p.slug} hidden={active !== i} tabIndex={enhanced ? 0 : undefined}>
      <div className="project-selector-copy ps-copy-a"><p className="project-selector-label">Built by Ahmad</p><h3 id={'project-title-' + p.slug}>{p.name}<span>: {p.purpose}</span></h3><p>{p.description}</p></div>
      <div className="project-selector-copy ps-copy-b"><h4>What it does</h4><ul>{p.capabilities.map(line => <li key={line}>{line}</li>)}</ul><div className="project-selector-actions"><a className="project-selector-primary" href={p.caseHref}>Open case</a>{p.walkthroughHref && <a href={p.walkthroughHref}>Walkthrough</a>}</div></div>
    </article>)}</div>
  </div></section>;
}
