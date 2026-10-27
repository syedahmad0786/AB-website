// V9 Live Workspace engine. Framework-free, seekable: render(t) is a pure function of t over the current scene's DOM.
// Animates only opacity / transform / stroke-dashoffset / scrollTop. Shared verbatim with W9.
export function createLiveWorkspace(root, { scenes, timing, mode = 'multi', start = 0, onChannel = () => {} }) {
  const T = Object.assign({ start: 400, typeChar: 24, typeMin: 900, typeMax: 1800, word: 38, answerMin: 700, answerMax: 1600, send: 220, gap: 350, work: 1300, shell: 360, leave: 280, slide: 380, workChip: 90, answerFade: 140, artGap: 200, enter: 420 }, timing || {});
  const DUR = { in: 260, drop: 260, fade: 240, pop: 220, count: 900, draw: 800, var: 800, skel: 160, travel: 0 };
  const c01 = x => (x < 0 ? 0 : x > 1 ? 1 : x || 0);
  const eOut = x => 1 - Math.pow(1 - x, 3);
  const eIO = x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const eTick = x => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
  const eDraw = x => 1 - Math.pow(1 - x, 2.2);
  const fmt = n => Math.round(n).toLocaleString('en-US');
  const q = s => root.querySelector(s), qa = s => [...root.querySelectorAll(s)];
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const off = [];
  const listen = (el, ev, fn, o) => { if (!el) return; el.addEventListener(ev, fn, o); off.push(() => el.removeEventListener(ev, fn, o)); };
  let i = Math.max(0, start), t = 0, last = 0, raf = 0, inView = false, userPaused = false, reduced = media.matches, view = 'thread';
  let autoAdvance = mode === 'multi', cycles = 0, done = false, first = true, destroyed = false, scene, node, plan, scrollLocked = false, started = false;
  const playBtn = q('.lw-play'), replayBtn = q('.lw-replay'), typed = q('.lw-typed'), ph = q('.lw-ph'), caret = q('.lw-caret'), send = q('.lw-send'), field = q('.lw-field');
  const nodes = scenes.map(s => q('.lw-scene[data-slug="' + s.slug + '"]'));
  root.setAttribute('data-js', '');

  // Screen-reader copy: full sentence once, animated word copy hidden.
  qa('.lw-vis').forEach(el => { const sr = document.createElement('span'); sr.className = 'lw-sr'; sr.textContent = el.textContent; el.after(sr); el.setAttribute('aria-hidden', 'true'); });

  const durOf = a => {
    const k = a.dataset.a, d = +a.dataset.d || 0;
    if (a.dataset.t) return +a.dataset.t;
    if (k === 'skel') return (+a.dataset.o || d) - d + 200;
    if (k === 'travel') { const n = a.dataset.stops.split(',').length; return n * (+a.dataset.pause || 0) + (n - 1) * (+a.dataset.hop || 0); }
    return DUR[k] || 240;
  };

  function compile(n, s) {
    const items = [];
    let cur = T.start;
    for (const el of n.querySelectorAll('[data-lw-step]')) {
      const kind = el.dataset.kind; cur += +el.dataset.delay || 0;
      if (kind === 'alert') { items.push({ el, kind, at: cur, dur: T.send }); cur += T.send; }
      else if (kind === 'ask') {
        const text = el.dataset.text, compose = cur, typeAt = cur + 100;
        const typeDur = Math.max(T.typeMin, Math.min(text.length * T.typeChar, T.typeMax));
        const at = typeAt + typeDur;
        items.push({ el, kind, compose, typeAt, typeDur, text, at, dur: T.send });
        cur = at + T.send + T.gap;
      } else if (kind === 'reply') {
        const w = [...el.querySelectorAll('.lw-answer .lw-vis .lw-w')];
        const answerAt = cur + T.work, answerDur = Math.max(T.answerMin, Math.min(w.length * T.word, T.answerMax));
        items.push({ el, kind, at: cur, dur: 240, answerAt, answerDur, w, tools: [...el.querySelectorAll('.lw-tool')], working: el.querySelector('.lw-working') });
        cur = answerAt + answerDur + T.artGap;
      } else if (kind === 'art') {
        const anims = [...el.querySelectorAll('[data-a]')].map(a => ({ a, k: a.dataset.a, d: +a.dataset.d || 0, dur: durOf(a), last: -1 }));
        const build = anims.reduce((m, x) => Math.max(m, x.d + x.dur), 0);
        items.push({ el, kind, at: cur, dur: T.shell, build, anims, card: el.querySelector('.lw-art') });
        cur += T.shell + build;
      }
    }
    const hold = cur, holdDur = s.hold || 4000;
    return { items, hold, holdDur, cue: hold + holdDur - 1000, end: hold + holdDur, total: hold + holdDur + T.leave };
  }

  function setOp(el, o) { const v = String(Math.round(o * 1000) / 1000); if (el.style.opacity !== v) el.style.opacity = v; }
  function setTf(el, tf) { if (el.style.transform !== tf) el.style.transform = tf; }

  function renderAnim(x, base, time) {
    const { a, k } = x;
    let p = c01((time - base - x.d) / x.dur);
    if (k === 'skel') {
      const o = +a.dataset.o || 0;
      const v = c01((time - base - x.d) / 160) * (1 - c01((time - base - o) / 200));
      if (v !== x.last) { x.last = v; setOp(a, v); }
      return;
    }
    if (k === 'travel') {
      const stops = a.dataset.stops.split(',').map(Number), hop = +a.dataset.hop, pause = +a.dataset.pause;
      let local = time - base - x.d, pos = stops[0];
      setOp(a, c01(local / 160));
      for (let s = 1; s < stops.length; s++) { const st = pause * s + hop * (s - 1); if (local >= st) pos = stops[s - 1] + (stops[s] - stops[s - 1]) * eIO(c01((local - st) / hop)); }
      if (!Number.isFinite(local)) pos = stops[stops.length - 1];
      setTf(a, 'translateX(' + (pos * 100) + '%)');
      return;
    }
    if (p === x.last) return; x.last = p;
    if (k === 'in') { setOp(a, eOut(p)); setTf(a, p >= 1 ? '' : 'translateY(' + ((1 - eOut(p)) * 6).toFixed(2) + 'px)'); }
    else if (k === 'drop') { setOp(a, eOut(p)); setTf(a, p >= 1 ? '' : 'translateY(' + (-(1 - eOut(p)) * 6).toFixed(2) + 'px)'); }
    else if (k === 'fade') setOp(a, eOut(p));
    else if (k === 'pop') { setOp(a, c01(p * 2.5)); setTf(a, p >= 1 ? '' : 'scale(' + (0.6 + 0.4 * eTick(p)).toFixed(3) + ')'); }
    else if (k === 'count') { const v = fmt(+a.dataset.to * eOut(p)); if (a.textContent !== v) a.textContent = v; }
    else if (k === 'draw') { a.style.strokeDasharray = '1'; a.style.strokeDashoffset = String(1 - eDraw(p)); }
    else if (k === 'var') a.style.setProperty('--p', eIO(p).toFixed(4));
  }

  function renderComposer(time) {
    let txt = '', mode2 = 'idle', p = 0;
    if (Number.isFinite(time)) for (const it of plan.items) {
      if (it.kind !== 'ask') continue;
      if (time >= it.compose && time < it.at) { mode2 = 'type'; txt = it.text.slice(0, Math.floor(c01((time - it.typeAt) / it.typeDur) * it.text.length)); }
      else if (time >= it.at && time < it.at + T.send) { mode2 = 'send'; txt = it.text; p = c01((time - it.at) / T.send); }
    }
    if (typed.textContent !== txt) typed.textContent = txt;
    ph.style.opacity = mode2 === 'idle' ? '1' : '0';
    caret.style.opacity = mode2 === 'type' ? '' : '0';
    root.toggleAttribute('data-typing', mode2 === 'type');
    send.toggleAttribute('data-on', mode2 !== 'idle' && txt.length > 0);
    if (mode2 === 'send') { setOp(typed, 1 - eOut(p)); setTf(typed, 'translateY(' + (-eOut(p) * 10).toFixed(2) + 'px)'); }
    else {
      setOp(typed, 1);
      const over = mode2 === 'type' ? Math.max(0, typed.scrollWidth - field.clientWidth + 14) : 0;
      setTf(typed, over ? 'translateX(' + (-over) + 'px)' : '');
    }
  }

  function render(time) {
    if (!node || !plan) return;
    const final = !Number.isFinite(time);
    // scene enter / leave
    let so = final ? 1 : eOut(c01((time - 120) / 280));
    if (!final && time >= plan.end && willAdvance()) so *= 1 - eIO(c01((time - plan.end) / T.leave));
    setOp(node, so);
    setTf(node, final || so >= 1 ? '' : 'translateY(' + ((time >= plan.end ? -6 : 6) * (1 - so)).toFixed(2) + 'px)');
    let lastShown = null, prevShown = null, beat = 'enter';
    for (const it of plan.items) {
      const shown = final || time >= it.at;
      const disp = shown ? '' : 'none';
      if (it.el.style.display !== disp) it.el.style.display = disp;
      if (it.kind === 'ask' && !final && time >= it.compose) beat = time < it.at ? 'type' : 'send';
      if (!shown) continue;
      prevShown = lastShown; lastShown = it;
      const p = final ? 1 : c01((time - it.at) / (it.kind === 'art' ? T.shell : it.dur));
      setOp(it.el, eOut(p));
      if (it.kind === 'art') setTf(it.el, p >= 1 ? '' : 'translateY(' + ((1 - eOut(p)) * 6).toFixed(2) + 'px) scale(' + (0.985 + 0.015 * eOut(p)).toFixed(4) + ')');
      else setTf(it.el, p >= 1 ? '' : 'translateY(' + ((1 - eOut(p)) * 8).toFixed(2) + 'px)');
      if (it.kind === 'reply') {
        const working = !final && time < it.answerAt;
        beat = working ? 'work' : (final || time >= it.answerAt + it.answerDur ? beat : 'answer');
        if (it.working) {
          const out = final ? 1 : c01((time - it.answerAt) / 160);
          const pulse = working ? 0.55 + 0.45 * (0.5 + 0.5 * Math.cos(((time - it.at) / 1200) * Math.PI * 2)) : 1;
          setOp(it.working, (1 - out) * pulse);
          it.working.querySelectorAll('i i').forEach((d, k) => setTf(d, working ? 'translateY(' + (-2.5 * Math.max(0, Math.sin(((time - it.at) / 900) * Math.PI * 2 - k * 0.9))).toFixed(2) + 'px)' : ''));
        }
        it.tools.forEach((tool, k) => {
          const pin = final ? 1 : c01((time - it.at - 240 - k * T.workChip) / 200);
          setOp(tool, eOut(pin)); setTf(tool, pin >= 1 ? '' : 'translateY(' + ((1 - eOut(pin)) * 4).toFixed(2) + 'px)');
          const okP = final ? 1 : c01((time - it.answerAt - k * 80) / 220);
          const spin = tool.querySelector('.lw-spin'), ok = tool.querySelector('.lw-tool-ok'), path = tool.querySelector('path');
          setOp(spin, 1 - okP); setTf(spin, final ? '' : 'rotate(' + Math.round((time - it.at) * 0.45) % 360 + 'deg)');
          setOp(ok, c01(okP * 2.5)); setTf(ok, okP >= 1 ? '' : 'scale(' + (0.6 + 0.4 * eTick(okP)).toFixed(3) + ')');
          path.style.strokeDasharray = '1'; path.style.strokeDashoffset = String(1 - eDraw(okP));
        });
        const n = it.w.length, stag = n > 1 ? (it.answerDur - T.answerFade) / (n - 1) : 0;
        it.w.forEach((w, k) => { const wp = final ? 1 : c01((time - it.answerAt - k * stag) / T.answerFade); setOp(w, wp); });
      }
      if (it.kind === 'art') {
        if (!final && time < it.at + T.shell + it.build) beat = 'build';
        const base = it.at + T.shell;
        for (const x of it.anims) renderAnim(x, base, final ? Infinity : time);
      }
    }
    if (final || time >= plan.hold) beat = (!final && time >= plan.end && willAdvance()) ? 'leave' : 'hold';
    renderComposer(final ? Infinity : time);
    // Slack-style bottom anchoring: content never moves in layout; the viewport scrolls up as messages land.
    const vp = node.querySelector('.lw-vp');
    if (vp && (!scrollLocked || final)) {
      const intro = node.querySelector('.lw-intro');
      const bottom = el => el.offsetTop + el.offsetHeight;
      let target;
      if (final) target = vp.scrollHeight;
      else {
        const prevB = prevShown ? bottom(prevShown.el) : bottom(intro);
        const curB = lastShown ? bottom(lastShown.el) : prevB;
        const sp = lastShown ? eOut(c01((time - lastShown.at) / T.slide)) : 1;
        const pad = parseFloat(getComputedStyle(node.querySelector('.lw-thread')).paddingBottom) || 0;
        target = prevB + (curB - prevB) * sp + pad - vp.clientHeight;
      }
      vp.scrollTop = Math.max(0, target);
      if (final || time >= plan.hold + T.slide) scrollLocked = true;
    }
    const nb = reduced ? 'static' : beat; if (root.dataset.beat !== nb) root.dataset.beat = nb;
    const free = final || time >= plan.hold || !running(); if (root.hasAttribute('data-free') !== free) root.toggleAttribute('data-free', free);
    const prog = q('.lw-progress');
    if (prog) setTf(prog, 'scaleX(' + (final ? 1 : c01(time / plan.end)).toFixed(4) + ')');
    const cue = !final && autoAdvance && mode === 'multi' && time >= plan.cue;
    qa('button.lw-ch').forEach((b, j) => b.toggleAttribute('data-next', cue && j === (i + 1) % scenes.length));
  }

  function willAdvance() { return mode === 'multi' && autoAdvance && !(i === scenes.length - 1 && cycles + 1 >= 2); }
  function running() { return inView && !document.hidden && !userPaused && !reduced && view === 'thread' && !done; }

  function go(next, { user = false, silent = false } = {}) {
    if (next < 0 || next >= scenes.length || !nodes[next]) { if (mode === 'single') next = Math.max(0, nodes.findIndex(Boolean)); else return; }
    const changed = next !== i || !plan;
    i = next; scene = scenes[i]; node = nodes[i];
    plan = compile(node, scene); t = 0; done = false; scrollLocked = false;
    if (user) { autoAdvance = false; userPaused = false; syncPlay(); }
    nodes.forEach((n, j) => { if (!n) return; n.setAttribute('aria-hidden', String(n !== node)); const vp = n.querySelector('.lw-vp'); if (vp) vp.tabIndex = n === node ? 0 : -1; });
    qa('button.lw-ch').forEach((b, j) => { b.tabIndex = j === i ? 0 : -1; if (j === i) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    const ch = q('.lw-channels'); if (ch) ch.dataset.active = String(i);
    const name = q('.lw-channel-name'), mod = q('.lw-module');
    if (changed && name && name.textContent !== scene.channel && !reduced && q('.lw-head-t').animate) q('.lw-head-t').animate([{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 240, easing: 'cubic-bezier(.22,1,.36,1)' });
    if (name) name.textContent = scene.channel;
    if (mod) mod.textContent = scene.chip;
    ph.textContent = 'Message #' + scene.channel;
    const cap = q('.lw-cap p'); if (cap) cap.textContent = scene.caption;
    root.dataset.i = String(i);
    applyView();
    render(reduced ? Infinity : 0);
    syncButtons();
    if (!silent) onChannel(i, user ? 'user' : 'auto');
    const nx = scenes[(i + 1) % scenes.length];
    if (nx && nx.screen) { const img = new Image(); img.src = nx.screen.src; if (img.decode) img.decode().catch(() => {}); }
  }

  function syncPlay() {
    if (!playBtn) return;
    playBtn.setAttribute('aria-pressed', String(userPaused));
    playBtn.setAttribute('aria-label', userPaused ? 'Play walkthrough' : 'Pause walkthrough');
  }
  function syncButtons() {
    if (replayBtn) replayBtn.hidden = !done || reduced;
    if (playBtn) playBtn.hidden = done || reduced;
    const ns = reduced ? 'static' : done ? 'done' : userPaused ? 'paused' : view === 'screen' ? 'paused' : !inView ? (started ? 'suspended' : 'armed') : t >= (plan ? plan.hold : 0) ? 'holding' : 'playing';
    if (root.dataset.state !== ns) root.dataset.state = ns;
  }

  function tick(now) {
    if (destroyed) return;
    const dt = last ? Math.min(now - last, 200) : 0; last = now;
    if (running() && plan) {
      started = true; t += dt;
      if (t >= plan.end && !willAdvance()) {
        t = plan.end; render(t); done = true;
        if (mode === 'multi' && autoAdvance) { cycles++; go(0, { silent: false }); t = plan.hold; render(Infinity); done = true; }
      } else if (t >= plan.total) {
        if (i === scenes.length - 1) cycles++;
        go((i + 1) % scenes.length);
      } else render(t);
    }
    syncButtons();
    raf = requestAnimationFrame(tick);
  }

  function pause() { userPaused = true; syncPlay(); root.toggleAttribute('data-free', true); }
  function play() { userPaused = false; syncPlay(); }
  function replay() { cycles = 0; autoAdvance = mode === 'multi'; userPaused = false; syncPlay(); if (view !== 'thread') setView('thread'); go(i, { silent: true }); }

  function applyView() {
    nodes.forEach(n => { if (!n) return; const scr = n.querySelector('.lw-screen'), vp = n.querySelector('.lw-vp'); scr.hidden = view !== 'screen'; vp.hidden = view === 'screen'; });
  }
  function setView(v, focus) {
    if (v === view) return;
    view = v;
    qa('[data-view]').forEach(b => { b.setAttribute('aria-checked', String(b.dataset.view === v)); b.tabIndex = b.dataset.view === v ? 0 : -1; });
    if (v === 'screen') pause();
    applyView();
    if (v === 'thread') { scrollLocked = false; render(reduced ? Infinity : t); }
    root.dataset.view = v;
    if (v === 'screen' && !reduced && node) {
      const shot = node.querySelector('.lw-shot'), img = shot && shot.querySelector('img');
      if (img && img.loading === 'lazy') img.loading = 'eager';
      if (shot && shot.animate) shot.animate([{ clipPath: 'inset(0 0 100% 0 round 12px)' }, { clipPath: 'inset(0 0 0 0 round 12px)' }], { duration: 700, easing: 'cubic-bezier(.65,0,.35,1)' });
      if (img && img.animate) img.animate([{ transform: 'scale(1.04)' }, { transform: 'scale(1)' }], { duration: 900, easing: 'cubic-bezier(.22,1,.36,1)' });
    }
    if (focus) q('[data-view="' + v + '"]').focus();
    syncButtons();
  }

  // Interaction: any deliberate input inside the frame stops auto-advance (the chosen channel plays once, then holds).
  const stopAuto = e => { if (e.target.closest && e.target.closest('.lw-vp')) return; autoAdvance = false; };
  listen(root, 'pointerdown', stopAuto);
  listen(root, 'keydown', e => { if (e.key !== 'Tab') stopAuto(e); });
  listen(playBtn, 'click', () => { if (userPaused) play(); else pause(); syncButtons(); });
  listen(replayBtn, 'click', () => { replay(); if (playBtn) playBtn.focus(); });
  qa('button.lw-ch').forEach((b, j) => {
    listen(b, 'click', () => { if (view !== 'thread') setView('thread'); go(j, { user: true }); });
    listen(b, 'keydown', e => {
      const n = { ArrowDown: (j + 1) % scenes.length, ArrowRight: (j + 1) % scenes.length, ArrowUp: (j + scenes.length - 1) % scenes.length, ArrowLeft: (j + scenes.length - 1) % scenes.length, Home: 0, End: scenes.length - 1 }[e.key];
      if (n === undefined) return;
      e.preventDefault(); go(n, { user: true }); qa('button.lw-ch')[n].focus();
    });
  });
  qa('[data-view]').forEach(b => {
    listen(b, 'click', () => setView(b.dataset.view));
    listen(b, 'keydown', e => { if (!/^Arrow/.test(e.key)) return; e.preventDefault(); setView(view === 'thread' ? 'screen' : 'thread', true); });
  });
  listen(document, 'visibilitychange', () => { last = 0; });
  const onMedia = e => { reduced = e.matches; render(reduced ? Infinity : t); syncButtons(); };
  if (media.addEventListener) listen(media, 'change', onMedia);

  go(i, { silent: true });
  const observer = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (first) { first = false; if (e.isIntersecting && !reduced && plan) { t = plan.hold; scrollLocked = false; render(Infinity); } }
      if (e.intersectionRatio >= 0.45) inView = true;
      else if (e.intersectionRatio < 0.15) inView = false;
    }
  }, { threshold: [0, 0.15, 0.45] });
  observer.observe(root);
  raf = requestAnimationFrame(tick);

  const api = {
    go: (n, o) => { if (view !== 'thread') setView('thread'); go(n, o); },
    play, pause, replay,
    destroy() { destroyed = true; cancelAnimationFrame(raf); observer.disconnect(); off.forEach(f => f()); delete root.__lw; },
    get state() { return { i, t, total: plan && plan.total, hold: plan && plan.hold, autoAdvance, reduced, view, done, cycles }; }
  };
  if (/[?&]lwtest/.test(location.search)) { const hook = { go: api.go, play, pause, replay, destroy: api.destroy, seek(ms) { t = ms; scrollLocked = false; render(ms); }, timeline: () => plan }; Object.defineProperty(hook, 'state', { get: () => api.state }); root.__lw = hook; }
  return api;
}

// Pure timing estimate from scene data (used by build checks; the engine itself compiles from DOM).
export function estimateScene(s, timing) {
  const T = timing, cl = (v, a, b) => Math.max(a, Math.min(v, b));
  const wc = x => x.split(' ').length;
  let cur = T.start;
  if (s.alert) cur += T.send;
  const exchange = (qq, a, chipsDelay, build) => { cur += chipsDelay || 0; cur += 100 + cl(qq.length * T.typeChar, T.typeMin, T.typeMax) + T.send + T.gap; cur += T.work + cl(wc(a) * T.word, T.answerMin, T.answerMax) + T.artGap; cur += T.shell + build; };
  exchange(s.q, s.answer, s.askDelay, s.build);
  if (s.q2) exchange(s.q2, s.answer2, s.askDelay2 || 900, 1600);
  return { hold: cur, total: cur + s.hold + T.leave };
}
