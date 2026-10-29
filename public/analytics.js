/* Shared personal-site consent. No GA network activity until an explicit stored grant. */
(function () {
  'use strict';
  // Embedded demos neither prompt for consent nor participate in analytics.
  try { if (window.top !== window.self) return; } catch (_) { return; }
  if (window.ABPrivacy) { window.ABPrivacy.ensure(); return; }
  var ID = 'G-W66WJJKGWQ', KEY = 'ab-analytics-consent-v1';
  var denied = { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
  var state = { granted: false, started: false, failed: false, last: null, restore: null };
  var production = location.protocol === 'https:' && location.port === '' && ['ahmadbukhari.com', 'www.ahmadbukhari.com'].includes(location.hostname);
  window['ga-disable-' + ID] = true;
  window.dataLayer = window.dataLayer || [];
  function tag() { window.dataLayer.push(arguments); }
  tag('consent', 'default', denied);
  function read() {
    try {
      var raw = localStorage.getItem(KEY); if (!raw) return null;
      var v = JSON.parse(raw);
      if (!v || v.version !== 1 || !['granted','denied'].includes(v.analytics) || typeof v.updatedAt !== 'string') return null;
      var time = Date.parse(v.updatedAt);
      if (!Number.isFinite(time) || time <= 0 || time > Date.now() || new Date(time).toISOString() !== v.updatedAt) return null;
      return v.analytics;
    } catch (_) { return null; }
  }
  function clean(value) { try { var u = new URL(value); return /^https?:$/.test(u.protocol) ? u.origin + u.pathname : ''; } catch (_) { return ''; } }
  function view() {
    ensurePrivacyUI();
    if (!production || !state.granted || state.failed) return;
    var url = clean(location.href);
    if (!url || state.last === url) return;
    state.last = url;
    tag('event', 'page_view', { page_location: url, page_referrer: clean(document.referrer), page_title: document.title, send_to: ID });
  }
  function start() {
    if (!production || !state.granted || state.failed) return;
    window['ga-disable-' + ID] = false;
    tag('consent', 'update', Object.assign({}, denied, { analytics_storage: 'granted' }));
    if (!state.started) {
      state.started = true;
      tag('js', new Date());
      tag('config', ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: clean(location.href), page_referrer: clean(document.referrer) });
      var script = document.createElement('script');
      script.async = true; script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
      script.referrerPolicy = 'no-referrer';
      script.onerror = function () { state.failed = true; window['ga-disable-' + ID] = true; };
      document.head.appendChild(script);
    }
    view();
  }
  function clearCookies() {
    document.cookie.split(';').forEach(function (entry) {
      var name = entry.trim().split('=')[0]; if (!/^_ga/.test(name)) return;
      ['', '; domain=' + location.hostname, '; domain=ahmadbukhari.com', '; domain=.ahmadbukhari.com'].forEach(function (domain) { document.cookie = name + '=; Max-Age=0; path=/' + domain + '; SameSite=Lax'; });
    });
  }
  function choose(grant) {
    var previous = state.granted;
    try { localStorage.setItem(KEY, JSON.stringify({ version: 1, analytics: grant ? 'granted' : 'denied', updatedAt: new Date().toISOString() })); if (read() !== (grant ? 'granted' : 'denied')) throw Error('storage'); }
    catch (_) { grant = false; }
    state.granted = grant;
    if (grant) start();
    else { window['ga-disable-' + ID] = true; tag('consent', 'update', denied); clearCookies(); }
    panel.hidden = true;
    status.textContent = 'Saved: analytics ' + (grant ? 'on' : 'off') + '.';
    if (state.restore && state.restore.isConnected) state.restore.focus();
    if (!grant && previous) location.reload();
  }
  var panel, status, links, footer;
  // Keep stable controls/listeners, moving them into the current React-owned footer.
  function ensurePrivacyUI() {
    if (!panel || !status || !links) return;
    if (!panel.isConnected) document.body.appendChild(panel);
    if (!status.isConnected) document.body.appendChild(status);
    footer = document.querySelector('footer') || document.body;
    if (links.parentNode !== footer) footer.appendChild(links);
  }
  function open(trigger) { ensurePrivacyUI(); state.restore = trigger || document.activeElement; panel.hidden = false; panel.focus(); }
  window.ABPrivacy = { open: open, pageView: view, ensure: ensurePrivacyUI };
  function mount() {
    var style = document.createElement('style');
    style.textContent = '.ab-privacy-panel{position:fixed;z-index:2147483000;bottom:max(16px,env(safe-area-inset-bottom));left:max(16px,env(safe-area-inset-left));box-sizing:border-box;width:calc(100% - 32px);max-width:420px;padding:16px;border:1px solid currentColor;border-radius:12px;background:#ECE8DF;color:#121210;font:inherit;box-shadow:none}.ab-privacy-panel[hidden]{display:none}.ab-privacy-panel p{font:inherit;line-height:1.5;margin:0 0 12px}.ab-privacy-actions{display:flex;gap:12px}.ab-privacy-panel button{flex:1;min-height:44px;border:1px solid currentColor;border-radius:4px;background:transparent;color:inherit;font:inherit;line-height:1.3;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer}.ab-privacy-panel a{color:inherit}.ab-privacy-panel:focus-visible,.ab-privacy-panel :focus-visible,.ab-privacy-settings:focus-visible{outline:2px solid currentColor;outline-offset:3px}.ab-privacy-settings{font:inherit;color:inherit;background:transparent;border:0;text-decoration:underline;min-height:44px;cursor:pointer}.ab-privacy-links{display:flex;gap:16px;align-items:center;flex-wrap:wrap}.ab-privacy-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}@media(max-width:520px){.ab-privacy-panel{bottom:max(12px,env(safe-area-inset-bottom));left:max(12px,env(safe-area-inset-left));width:calc(100% - 24px)}}';
    document.head.appendChild(style);
    panel = document.createElement('section'); panel.className = 'ab-privacy-panel'; panel.setAttribute('role','region'); panel.setAttribute('aria-label','Privacy choices'); panel.tabIndex = -1;
    panel.innerHTML = '<p>I use Google Analytics only with your permission to understand site visits. Advertising features are off. Change your choice anytime in Privacy settings.</p><p><a href="/privacy">Privacy disclosure</a></p><div class="ab-privacy-actions"><button type="button" data-ab-reject>Reject</button><button type="button" data-ab-accept>Accept</button></div>';
    panel.querySelector('[data-ab-reject]').addEventListener('click',function(){choose(false);});
    panel.querySelector('[data-ab-accept]').addEventListener('click',function(){choose(true);});
    document.body.appendChild(panel);
    status = document.createElement('p'); status.className = 'ab-privacy-status'; status.setAttribute('role','status'); status.setAttribute('aria-live','polite'); document.body.appendChild(status);
    links = document.createElement('div'); links.className = 'ab-privacy-links';
    var policy = document.createElement('a'); policy.href = '/privacy'; policy.textContent = 'Privacy';
    var settings = document.createElement('button'); settings.type = 'button'; settings.className = 'ab-privacy-settings'; settings.textContent = 'Privacy settings'; settings.addEventListener('click', function(){open(settings);});
    links.appendChild(policy); links.appendChild(settings); ensurePrivacyUI();
    if (typeof MutationObserver === 'function') {
      new MutationObserver(function (records) {
        // Constant-time connected/parent checks ignore ordinary text, animation and style updates.
        if (!panel.isConnected || !status.isConnected || !links.isConnected || !footer.isConnected || links.parentNode !== footer) { ensurePrivacyUI(); return; }
        if (footer !== document.body) return;
        // Only while no footer exists, look for a newly added footer/container with a footer.
        for (var i = 0; i < records.length; i++) {
          for (var j = 0; j < records[i].addedNodes.length; j++) {
            var node = records[i].addedNodes[j];
            if (node.nodeType === 1 && (node.tagName === 'FOOTER' || node.querySelector('footer'))) { ensurePrivacyUI(); return; }
          }
        }
      }).observe(document.body, { childList: true, subtree: true });
    }
    var saved = read(); state.granted = saved === 'granted'; panel.hidden = saved !== null; if (state.granted) start();
    // Semantic navigation only: query/hash changes do not create another page view.
    ['pushState','replaceState'].forEach(function(method){ var original = history[method]; history[method] = function(){var result = original.apply(this,arguments);view();return result;}; });
    window.addEventListener('popstate',view);
    window.addEventListener('storage',function(event){ if (event.key !== KEY && event.key !== null) return; var granted = read() === 'granted'; if (state.granted && !granted) { state.granted = false; window['ga-disable-' + ID] = true; tag('consent','update',denied);clearCookies();location.reload(); } else if (granted && !state.granted) {state.granted = true;panel.hidden = true;start();} });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',mount,{once:true}); else mount();
})();
