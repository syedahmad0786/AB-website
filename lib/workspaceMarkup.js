// V9 Live Workspace markup. One deterministic string renderer shared by React SSR (H9) and the static case pages (W9).
// Animation contract read by workspaceEngine: data-lw-step/data-kind on thread items, data-a (kind) + data-d (delay ms) + data-t (duration ms) on artifact internals.
const esc = v => String(v ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const A = (kind, d = 0, t = 0, extra = '') => ' data-a="' + kind + '" data-d="' + d + '"' + (t ? ' data-t="' + t + '"' : '') + extra;
const TONES = { OL: 1, HD: 2, AM: 3, OB: 4, OC: 2, AE: 3, CL: 4, MS: 1, ML: 4, CS: 3 };
const MARK = '/live-workspace/openxcel-mark.png';
const count = (n, d, t = 900) => '<span class="lw-count"' + A('count', d, t, ' data-to="' + n + '"') + '>' + Number(n).toLocaleString('en-US') + '</span>';
const prov = s => '<span class="lw-prov">' + esc(s) + '</span>';
const ring = d => '<i class="lw-ring" aria-hidden="true"' + A('fade', d, 240) + '></i>';
const check = d => '<svg class="lw-check" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" pathLength="1"' + A('draw', d, 220) + '/></svg>';
const words = text => text.split(' ').map(w => '<span class="lw-w' + (w.startsWith('@') ? ' lw-mention' : '') + '">' + esc(w) + '</span>').join(' ');

function avatar(id) {
  if (id === 'OX') return '<span class="lw-av lw-av-ox" aria-hidden="true"><img src="' + MARK + '" alt="" width="32" height="32"></span>';
  if (id === 'EL') return '<span class="lw-av lw-av-el" aria-hidden="true">EL</span>';
  return '<span class="lw-av lw-tone-' + (TONES[id] || 1) + '" aria-hidden="true">' + esc(id) + '</span>';
}
const byline = (name, tag) => '<p class="lw-by"><b>' + esc(name) + '</b><span class="lw-tag">' + esc(tag) + '</span></p>';
const text = (t, cls = '') => '<p class="lw-text' + cls + '"><span class="lw-vis">' + words(t) + '</span></p>';

function ask(s, q, delay) {
  return '<li class="lw-msg" data-lw-step data-kind="ask" data-text="' + esc(q) + '"' + (delay ? ' data-delay="' + delay + '"' : '') + '>' + avatar(s.initials) + '<div class="lw-body">' + byline(s.who, s.askTag || 'example') + text(q) + '</div></li>';
}
function reply(s, work, chips, answer) {
  const tools = chips.length ? '<div class="lw-tools">' + chips.map(c => '<span class="lw-tool"><i class="lw-spin" aria-hidden="true"></i><span class="lw-tool-ok" aria-hidden="true">' + check(0) + '</span>' + esc(c) + '</span>').join('') + '</div>' : '';
  return '<li class="lw-msg" data-lw-step data-kind="reply">' + avatar(s.ri) + '<div class="lw-body">' + byline(s.reply, s.replyTag || 'example') + tools + '<div class="lw-reply"><p class="lw-working" aria-hidden="true"><i class="lw-dots"><i></i><i></i><i></i></i>' + esc(work) + '</p>' + text(answer, ' lw-answer') + '</div></div></li>';
}
const art = (html, delay) => '<li class="lw-msg lw-msg-art" data-lw-step data-kind="art"' + (delay ? ' data-delay="' + delay + '"' : '') + '><div class="lw-art">' + html + '</div></li>';
const head = (title, right = '') => '<div class="lw-card-h"><span class="lw-card-t">' + title + '</span>' + right + '</div>';

function alertMsg(a) {
  return '<li class="lw-msg" data-lw-step data-kind="alert">' + avatar('EL') + '<div class="lw-body">' + byline(a.by, a.tag) + '<div class="lw-alert"><p class="lw-alert-t"><i class="lw-dot lw-dot-err" aria-hidden="true"></i><code>' + esc(a.title) + '</code></p><dl class="lw-alert-rows">' + a.rows.map(r => '<div><dt>' + esc(r[0]) + '</dt><dd>' + (r[0] === 'Status' ? '<span class="lw-pill lw-pill-err">' + esc(r[1]) + '</span>' : esc(r[1])) + '</dd></div>').join('') + '</dl></div></div></li>';
}

const ARTIFACTS = {
  context() {
    const rows = [['Company memory', 'Onboarding notes saved by the team'], ['Skill', 'Weekly client update · editable by your team'], ['Connections', 'None needed to draft']];
    return '<div class="lw-card lw-ctx">' + head('Working from') + '<ul class="lw-ctx-list">' + rows.map((r, i) => '<li' + A('in', i * 160) + '><span class="lw-tick"' + A('pop', i * 160 + 100) + '>' + check(i * 160 + 160) + '</span><span class="lw-k">' + r[0] + '</span><span class="lw-v">' + r[1] + '</span></li>').join('') + '</ul></div>';
  },
  draft() {
    const secs = ['Completed this week', 'What we need from you', 'Plan for next week'];
    return '<div class="lw-card lw-draft">' + head('<span class="lw-doc" aria-hidden="true"></span>Draft · Weekly onboarding update', '<span class="lw-pill lw-pill-cu"' + A('fade', 160) + '>Held for review</span>') +
      '<ol class="lw-secs">' + secs.map((x, i) => '<li><span class="lw-skelbar" aria-hidden="true"' + A('skel', 80 + i * 60, 0, ' data-o="' + (560 + i * 120) + '"') + '></span><span class="lw-sec"' + A('in', 560 + i * 120, 200) + '><i aria-hidden="true"></i>' + x + '</span></li>').join('') + '</ol>' +
      '<div class="lw-draft-foot"' + A('in', 1000) + '><span class="lw-btn lw-btn-ink">Approve' + ring(1260) + '</span><span class="lw-btn lw-btn-line">Request changes</span></div><p class="lw-lock"' + A('fade', 1160) + '><i aria-hidden="true"></i>Nothing is sent until a person approves.</p></div>';
  },
  board(s) {
    const cards = (c, i) => c[2].map((r, j) => {
      const over = r[2].includes('overdue');
      return '<div class="lw-kcard' + (j ? ' lw-kcard-2' : '') + '"' + A('drop', 320 + i * 90 + j * 60, 260) + '><div class="lw-kcard-top"><span class="lw-dbadge">' + r[1] + '</span>' + (r[3] ? '<span class="lw-score ' + (r[3] <= 3 ? 'lw-score-lo' : 'lw-score-hi') + '">Score ' + r[3] + '</span>' : '') + '</div><b>' + esc(r[0]) + '</b><span class="lw-due' + (over ? ' lw-over' : '') + '">' + r[2] + '</span></div>';
    }).join('');
    return '<div class="lw-card lw-board">' + head('Lifecycle Pipeline', '<span class="lw-seg" aria-hidden="true"><span>Table</span><span class="lw-seg-on">Board</span></span>' + prov('Synthetic records')) +
      '<div class="lw-cols">' + s.columns.map((c, i) => '<div class="lw-col lw-col-' + i + '"><p class="lw-col-h"' + A('in', i * 90) + '><span>' + c[0] + '</span>' + count(c[1], i * 90 + 80, 400) + '</p><div class="lw-col-cards">' + cards(c, i) + (i === 2 ? ring(1500) : '') + '</div></div>').join('') + '</div></div>';
  },
  checkpoints(s) {
    const line = 120, span = 900;
    return '<div class="lw-card lw-cp">' + head('Integration health', prov('Synthetic records')) + '<div class="lw-cp-list"><i class="lw-cp-line" aria-hidden="true"' + A('var', line, span) + '></i>' + s.tiles.map((r, i) => {
      const at = line + Math.round(span * (i + 0.5) / s.tiles.length);
      const st = r[3] === 0 ? ['ok', 'Operational'] : r[3] === 2 ? ['err', '2 errors detected'] : ['warn', '1 error — investigating'];
      const hot = i === 3;
      return '<div class="lw-cp-row' + (hot ? ' lw-cp-hot' : '') + '"' + A('in', i * 50, 220) + '><span class="lw-cp-dot" aria-hidden="true"><i class="lw-st lw-st-' + st[0] + '"' + A('pop', at, 220) + '></i></span><span class="lw-cp-name"><b>' + esc(r[0]) + '</b><small>' + esc(r[1]) + '</small></span><span class="lw-cp-status lw-c-' + st[0] + '"' + A('fade', at + 60) + '>' + st[1] + '</span><span class="lw-cp-n"' + A('fade', at + 60) + '>' + count(r[2], at + 60, 420) + ' passed · ' + count(r[3], at + 60, 420) + ' failed</span>' + (hot ? '<span class="lw-btn lw-btn-ink lw-retry" aria-hidden="true"' + A('in', 1300) + '>Retry</span><span class="lw-sr">Retry control shown for illustration</span>' + ring(1200) : '') + '</div>';
    }).join('') + '</div></div>';
  },
  feed() {
    const H = ['HubSpot → Salesforce contact mirror', 'Expected field "customer_id" of type string, received null'], N = ['Notion → Linear sync', 'OAuth token expired — refresh failed (invalid_grant)'];
    const row = (r, i) => '<div class="lw-frow"' + A('in', 420 + i * 70) + '><span class="lw-plat">make</span><b>' + esc(r[0]) + '</b><span class="lw-pill lw-pill-err">OPEN</span><code>' + esc(r[1]) + '</code></div>';
    return '<div class="lw-card lw-feed">' + head('Error feed', prov('Synthetic records')) +
      '<div class="lw-filters"><div class="lw-chiprow" aria-label="Severity">' + ['CRITICAL', 'ERROR', 'WARN', 'INFO'].map(x => '<span class="lw-fchip">' + x + '</span>').join('') + '</div><div class="lw-chiprow" aria-label="Platform">' + ['N8N', 'ZAPIER', 'MAKE', 'CUSTOM'].map(x => '<span class="lw-fchip' + (x === 'MAKE' ? ' lw-fchip-make' : '') + '">' + (x === 'MAKE' ? '<i class="lw-fchip-on" aria-hidden="true"' + A('fade', 200, 200) + '></i>' : '') + '<span>' + x + '</span></span>').join('') + '</div></div>' +
      '<div class="lw-frows"><div class="lw-frow lw-fhead" aria-hidden="true"><span>Platform</span><span>Workflow · error</span><span>Status</span></div>' + row(H, 0) + '<div class="lw-fgroup">' + row(N, 1) + row(N, 2) + ring(1000) + '</div>' + row(H, 3) + '</div></div>';
  },
  stages() {
    const st = [['Lead', 'Curious', 'NEUTRAL', 'warn'], ['Onboarding', 'Relieved', 'POSITIVE', 'ok'], ['Active', 'Confident', 'HIGH POSITIVE', 'ok'], ['At-Risk'], ['Advocate', 'Proud', 'POSITIVE PEAK', 'ok']];
    const arrive = [300, 780, 1260];
    const mood = (m, d) => '<span class="lw-mood"' + A('fade', d) + '><i class="lw-dot lw-dot-' + m[3] + '" aria-hidden="true"></i><span>' + m[1] + '</span><small>' + m[2] + '</small></span>';
    const events = [['Resource library visit', 'MEMBER HUB'], ['Learning check-in', 'MEMBER HUB'], ['Peer discussion', 'MIGHTY NETWORKS']];
    return '<div class="lw-card lw-stg">' + head('Stages · Example Member 001', prov('Fictional records')) +
      '<div class="lw-stg-wrap"><div class="lw-now-track" aria-hidden="true"><span class="lw-now-slot"' + A('travel', 300, 0, ' data-stops="0,1,2" data-hop="260" data-pause="220"') + '><span class="lw-now">NOW</span></span></div><div class="lw-stg-strip">' +
      st.map((x, i) => '<div class="lw-stg-cell lw-stg-' + i + '"' + A('in', i * 90) + '>' + (i === 2 ? '<i class="lw-stg-tint" aria-hidden="true"' + A('fade', 1260, 240) + '></i>' + ring(1460) : '') + '<small class="lw-stg-i">0' + (i + 1) + '</small><b>' + x[0] + '</b>' + (i === 3 ? '<span class="lw-hatch"' + A('fade', 600) + '>Example state only. No connected records.</span>' : mood(x, i < 3 ? arrive[i] : 620)) + '</div>').join('') +
      '</div></div><p class="lw-stg-compact" aria-hidden="true"' + A('in', 1300) + '><b>03 Active · Confident</b><span>HIGH POSITIVE · 01 Lead · 02 Onboarding · 04 At-Risk (example state only) · 05 Advocate</span></p><div class="lw-events"><p class="lw-events-h"' + A('in', 1380) + '>Active · recent events</p>' + events.map((e, j) => '<div class="lw-event"' + A('in', 1460 + j * 70) + '><span>' + e[0] + '</span><span class="lw-src">' + e[1] + '</span></div>').join('') + '</div></div>';
  },
  matrix(s) {
    const heat = n => n < 10 ? 1 : n < 15 ? 2 : n < 25 ? 3 : 4;
    const hot = (i, j) => (i === 0 && j === 0) || (i === 1 && j === 1);
    return '<div class="lw-card lw-mx"><div class="lw-card-h lw-card-h2"><span class="lw-card-t">Visibility across AI models</span><span class="lw-card-sub">How often AI mentions the sample brand compared to competitors.</span>' + prov('Sample dataset · not a client result') + '</div>' +
      '<table class="lw-mx-t"><thead><tr><th scope="col">Competitors</th><th scope="col">ChatGPT</th><th scope="col">Google AI</th></tr></thead><tbody>' +
      s.rows.map((r, i) => '<tr><th scope="row"' + A('fade', i * 45) + '>' + esc(r[0]) + (i === 0 ? ' <em>(you)</em>' : '') + '</th>' + r.slice(1).map((n, j) => {
        const d = 140 + (i + j) * 45;
        return '<td><i class="lw-hbg lw-h' + heat(n) + '" aria-hidden="true"' + A('fade', d, 300) + '></i><span class="lw-num"' + A('fade', d + 120, 200) + '>' + count(n, d + 120, 500) + '%</span>' + (hot(i, j) ? ring(1350) : '') + '</td>';
      }).join('') + '</tr>').join('') + '</tbody></table><p class="lw-foot">8 brands across 3 models · 2 shown</p></div>';
  },
  referral() {
    const rows = [['ChatGPT', 642, '+24%'], ['Perplexity', 488, '+18%'], ['Gemini', 416, '+16%']];
    const line = 'M0 80 C26 84 44 66 72 69 S122 44 150 48 S206 18 240 12';
    return '<div class="lw-card lw-ref">' + head('AI Visitors', prov('Sample dataset · not a client result')) + '<div class="lw-ref-grid"><div class="lw-ref-kpi"><p class="lw-klabel">AI referral sessions</p><p class="lw-kpi">' + count(4929, 0, 900) + '<span class="lw-pill lw-pill-ok"' + A('in', 630, 200) + '>+21.4%</span></p>' +
      '<div class="lw-chart"><div class="lw-yt" aria-hidden="true"><span>870</span><span>790</span><span>640</span><span>490</span></div><div class="lw-plot"><svg viewBox="0 0 240 96" preserveAspectRatio="none" role="img" aria-label="Illustrative rising curve for the sample dataset; no per-day values shown"><path class="lw-area" d="' + line + ' L240 96 L0 96 Z"' + A('fade', 640, 300) + '/><path class="lw-line" d="' + line + '" pathLength="1"' + A('draw', 100, 900) + '/></svg><i class="lw-enddot" aria-hidden="true"' + A('pop', 1000, 200) + '></i></div></div><p class="lw-foot">Illustrative curve · no per-day values</p></div>' +
      '<div class="lw-ref-pages"><p class="lw-klabel">Pages receiving AI traffic</p><div class="lw-ptable"><div class="lw-prow lw-phead"><span>Page</span><span>Top source</span><span>Sessions</span><span>Trend</span></div>' +
      rows.map((r, i) => '<div class="lw-prow"' + A('in', 300 + i * 80) + '><span class="lw-redact" role="img" aria-label="Page redacted"></span><span>' + r[0] + '</span><span class="lw-tab">' + r[1] + '</span><span class="lw-c-ok">' + r[2] + '</span></div>').join('') + '</div><p class="lw-foot">214 pages with AI referral sessions</p></div></div></div>';
  }
};
export function artifact(s, type = s.type) {
  if (type === 'draft-card') return ARTIFACTS.context() + ARTIFACTS.draft();
  return (ARTIFACTS[type === 'checkpoints' ? 'checkpoints' : type] || (() => ''))(s);
}

function thread(s) {
  let h = '';
  if (s.alert) h += alertMsg(s.alert);
  h += ask(s, s.q, s.askDelay) + reply(s, s.work, s.chips || [], s.answer);
  if (s.type === 'draft-card') h += art(ARTIFACTS.context()) + art(ARTIFACTS.draft(), s.secondArt || 400);
  else h += art(artifact(s));
  if (s.q2) h += ask(s, s.q2, s.askDelay2 || 900) + reply(s, s.work2, s.chips2 || [], s.answer2) + art(ARTIFACTS.referral());
  return h;
}

function scene(s, visible) {
  return '<section class="lw-scene" data-slug="' + s.slug + '" aria-hidden="' + (!visible) + '"><div class="lw-vp" role="region" tabindex="' + (visible ? 0 : -1) + '" aria-label="Example conversation in #' + s.channel + '"><ol class="lw-thread"><li class="lw-intro" aria-hidden="true"><span class="lw-intro-hash">#</span><b>' + s.channel + '</b><span>This is the start of an illustrative example channel.</span></li>' + thread(s) + '</ol></div>' +
    '<div class="lw-screen" hidden><div class="lw-shot"><img loading="lazy" decoding="async" src="' + s.screen.src + '" alt="' + esc(s.screen.alt) + '" class="lw-shot-' + s.slug + '"></div><p class="lw-shot-cap">Actual product screen · ' + esc(s.screen.alt) + '</p></div></section>';
}

const PLAY = '<svg class="lw-i-pause" viewBox="0 0 16 16" aria-hidden="true"><rect x="4" y="3" width="2.6" height="10" rx="1"/><rect x="9.4" y="3" width="2.6" height="10" rx="1"/></svg><svg class="lw-i-play" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.2v9.6c0 .5.5.8.9.5l7-4.8a.6.6 0 0 0 0-1l-7-4.8c-.4-.3-.9 0-.9.5z"/></svg>';
const REPLAY = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8a5 5 0 1 0 1.6-3.7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M2.6 2.2v3.4H6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const SEND = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export function workspaceHTML({ scenes, mode = 'single', slug, idPrefix = 'lw', active = 0 }) {
  const selected = mode === 'single' ? scenes.filter(s => s.slug === slug) : scenes;
  const s = mode === 'single' ? selected[0] : scenes[active];
  if (!s) return '';
  const cur = scenes.indexOf(s);
  const channels = scenes.map((c, i) => {
    const inner = '<span class="lw-ch-hash" aria-hidden="true">#</span><span class="lw-ch-name">' + c.channel + '</span><b class="lw-unread" aria-hidden="true"></b>';
    return mode === 'single'
      ? '<a class="lw-ch" href="/work/case-studies/' + c.slug + '"' + (c.slug === slug ? ' aria-current="page"' : '') + '>' + inner + '</a>'
      : '<button type="button" class="lw-ch" data-i="' + i + '" tabindex="' + (i === active ? 0 : -1) + '" aria-controls="project-panel-' + c.slug + '"' + (i === active ? ' aria-current="true"' : '') + '>' + inner + '</button>';
  }).join('');
  const rail = '<aside class="lw-rail" aria-label="Example workspace"><div class="lw-ws"><span class="lw-ws-mark" aria-hidden="true">AB</span><span class="lw-ws-t"><b>Built systems</b><small>6 channels · example</small></span></div>' +
    '<p class="lw-rail-h">Channels</p><div class="lw-channels" role="group" aria-label="Channels" data-active="' + cur + '"><span class="lw-railpill" aria-hidden="true"><i class="lw-progress"></i></span>' + channels + '</div>' +
    '<div class="lw-skel" aria-hidden="true"><span><i></i><b></b></span><span><i></i><b></b></span><span><i></i><b></b></span></div>' +
    '<p class="lw-rail-h">Apps</p><p class="lw-app"><span class="lw-app-ox" aria-hidden="true"><img src="' + MARK + '" alt="" width="18" height="18"></span>OpenXCEL</p><p class="lw-app"><span class="lw-app-el" aria-hidden="true">EL</span>ErrorLens</p></aside>';
  const mobile = mode === 'single' ? '<nav class="lw-mchips" aria-label="Channels">' + scenes.map(c => '<a href="/work/case-studies/' + c.slug + '"' + (c.slug === slug ? ' aria-current="page"' : '') + '># ' + c.channel + '</a>').join('') + '</nav>' : '';
  const header = '<header class="lw-head"><div class="lw-head-t"><p class="lw-channel"><span class="lw-hash" aria-hidden="true">#</span><span class="lw-channel-name">' + s.channel + '</span></p><span class="lw-module">' + s.chip + '</span></div>' +
    '<div class="lw-ctl"><div class="lw-view" role="radiogroup" aria-label="View"><button type="button" role="radio" aria-checked="true" data-view="thread">Thread</button><button type="button" role="radio" aria-checked="false" tabindex="-1" data-view="screen">Screen</button></div>' +
    '<button type="button" class="lw-play" aria-pressed="false" aria-label="Pause walkthrough">' + PLAY + '</button><button type="button" class="lw-replay" hidden>' + REPLAY + '<span>Replay</span></button></div></header>';
  const composer = '<div class="lw-composer" aria-hidden="true"><span class="lw-plus">+</span><span class="lw-field"><span class="lw-ph">Message #' + s.channel + '</span><span class="lw-typed"></span><i class="lw-caret"></i></span><span class="lw-send">' + SEND + '</span></div>';
  return '<figure class="lw" data-lw data-keep data-mode="' + mode + '" data-state="static" data-i="' + cur + '" aria-labelledby="' + idPrefix + '-cap"><div class="lw-halo"><div class="lw-frame">' + rail + '<div class="lw-main">' + mobile + header +
    '<div class="lw-stage">' + selected.map(c => scene(c, c.slug === s.slug)).join('') + '</div>' + composer + '<p class="lw-label">Illustrative walkthrough · example data · not connected</p></div></div></div>' +
    '<figcaption id="' + idPrefix + '-cap" class="lw-cap"><details><summary>About this view</summary><p>' + esc(s.caption) + '</p></details></figcaption></figure>';
}
