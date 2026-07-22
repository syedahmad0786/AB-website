/* Ahmad Bukhari — AI twin widget.
   Custom UI on the ElevenLabs client SDK. No vendor chrome.
   Reusable: change AGENT_ID / AVATAR / NAME to redeploy for another brand. */
(function () {
  "use strict";

  var AGENT_ID = "agent_2801kxsycxcxe4janw56mws3p15x";
  var AVATAR = "/twin-avatar.svg";
  var AVATAR_TALK = "/twin-avatar.svg";
  var NAME = "Ahmad";
  var SUBTITLE = "AI twin";
  var TEASER = "Hey — I'm Ahmad's AI twin. Ask me about automation, or I'll book you a call.";
  var SDK = "https://cdn.jsdelivr.net/npm/@elevenlabs/client@1.15.1/+esm";

  if (window.__twinWidget) return;
  window.__twinWidget = true;
  if (!window.matchMedia || !window.fetch || !window.Promise) return;

  /* ---------------- styles ---------------- */
  var css = `
  .tw-root{position:fixed;right:8px;bottom:14px;z-index:2147483000;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,system-ui,sans-serif;
    color:#F4EEE3;--tw-violet:#8E65FF;--tw-lime:#C8FF37;--tw-bg:#0B0B0A;--tw-line:rgba(244,238,227,.14)}
  .tw-root *{box-sizing:border-box}
  .tw-hidden{display:none !important}

  /* launcher — a character that lives on the page, not an avatar bubble */
  .tw-launch{position:relative;display:block;background:none;border:0;padding:0;cursor:pointer;line-height:0}
  /* portrait frame: head through fists. artwork is pre-feathered to transparent,
     so no CSS mask is needed and it reads as a free-standing figure. */
  .tw-char{position:relative;width:146px;height:146px;display:block;
    filter:drop-shadow(0 16px 26px rgba(0,0,0,.5));
    animation:tw-idle 3.4s ease-in-out infinite;transform-origin:50% 96%}
  .tw-char img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block;
    transition:opacity .12s linear}
  .tw-char img.tw-frame-talk{opacity:0}
  .tw-root[data-state="speaking"] .tw-char img.tw-frame-idle{opacity:0}
  .tw-root[data-state="speaking"] .tw-char img.tw-frame-talk{opacity:1}
  .tw-char-fallback{width:100%;height:100%;display:flex;align-items:center;justify-content:center;
    border-radius:50%;font-size:40px;font-weight:700;color:#0B0B0A;
    background:linear-gradient(140deg,#8E65FF,#C8FF37)}
  .tw-glow{position:absolute;left:50%;bottom:2px;transform:translateX(-50%);
    width:74px;height:13px;border-radius:50%;background:rgba(142,101,255,.4);
    filter:blur(9px);opacity:.6;transition:background .35s,opacity .35s}
  .tw-char:hover{animation-duration:1.5s}

  @keyframes tw-idle{0%,100%{transform:translateY(0) scaleY(1)}50%{transform:translateY(-7px) scaleY(1.015)}}
  @keyframes tw-hop{
    0%{transform:translateY(0) scale(1,1)}
    18%{transform:translateY(0) scale(1.1,.88)}
    45%{transform:translateY(-30px) scale(.94,1.09)}
    72%{transform:translateY(0) scale(1.09,.9)}
    100%{transform:translateY(0) scale(1,1)}}
  .tw-char.tw-hop{animation:tw-hop .72s cubic-bezier(.28,.84,.42,1)}

  .tw-root[data-state="listening"] .tw-char{animation:tw-lean 2s ease-in-out infinite}
  @keyframes tw-lean{0%,100%{transform:translateY(-2px) rotate(-2.5deg)}50%{transform:translateY(-6px) rotate(2.5deg)}}
  .tw-root[data-state="listening"] .tw-glow{background:rgba(142,101,255,.75);opacity:1}
  .tw-root[data-state="speaking"] .tw-char{animation:tw-talk .34s ease-in-out infinite}
  @keyframes tw-talk{0%,100%{transform:translateY(0) scale(1,1)}50%{transform:translateY(-3px) scale(.985,1.03)}}
  .tw-root[data-state="speaking"] .tw-glow{background:rgba(200,255,55,.7);opacity:1}
  .tw-root[data-state="connecting"] .tw-glow{background:rgba(231,201,142,.6);opacity:1}

  /* small round avatar is still right inside the panel header */
  .tw-orb{position:relative;width:38px;height:38px;border-radius:50%;overflow:hidden;flex:0 0 auto;
    background:linear-gradient(140deg,#8E65FF,#C8FF37)}
  .tw-orb img{width:100%;height:100%;object-fit:cover;display:block}
  .tw-orb-fallback{width:100%;height:100%;display:flex;align-items:center;justify-content:center;
    background:#0B0B0A;font-size:17px;font-weight:700;
    background-image:linear-gradient(140deg,rgba(142,101,255,.35),rgba(200,255,55,.3))}

  .tw-teaser{max-width:230px;text-align:left;background:rgba(17,16,14,.96);border:1px solid var(--tw-line);
    border-radius:14px;padding:10px 13px;font-size:13px;line-height:1.45;color:#E6DFD2;
    box-shadow:0 10px 30px rgba(0,0,0,.45)}
  .tw-teaser b{color:var(--tw-lime);font-weight:600}
  .tw-teaser-close{position:absolute;top:-7px;left:-7px;width:20px;height:20px;border-radius:50%;
    background:#201C15;border:1px solid var(--tw-line);color:#9A958C;font-size:12px;line-height:1;cursor:pointer;padding:0}

  /* panel */
  .tw-panel{width:370px;max-width:calc(100vw - 32px);height:520px;max-height:calc(100vh - 110px);
    background:rgba(11,11,10,.98);border:1px solid var(--tw-line);border-radius:18px;overflow:hidden;
    display:flex;flex-direction:column;box-shadow:0 26px 70px rgba(0,0,0,.62)}
  .tw-head{display:flex;align-items:center;gap:11px;padding:13px 14px;border-bottom:1px solid var(--tw-line);flex:0 0 auto}
  .tw-head .tw-orb{width:38px;height:38px}
  .tw-head-txt{flex:1;min-width:0}
  .tw-name{font-size:14px;font-weight:600;letter-spacing:.01em}
  .tw-status{font-size:11.5px;color:#9A958C;display:flex;align-items:center;gap:5px;margin-top:1px}
  .tw-dot{width:6px;height:6px;border-radius:50%;background:#6b6b63;flex:0 0 auto}
  .tw-root[data-state="listening"] .tw-dot{background:var(--tw-violet)}
  .tw-root[data-state="speaking"] .tw-dot{background:var(--tw-lime)}
  .tw-root[data-state="connecting"] .tw-dot{background:#e7c98e}
  .tw-x{background:none;border:0;color:#9A958C;font-size:19px;cursor:pointer;padding:4px 6px;line-height:1;border-radius:8px}
  .tw-x:hover{color:#F4EEE3;background:rgba(244,238,227,.07)}

  .tw-log{flex:1 1 auto;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:9px;scrollbar-width:thin}
  .tw-msg{max-width:86%;padding:9px 12px;border-radius:13px;font-size:13.5px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}
  .tw-ai{align-self:flex-start;background:rgba(244,238,227,.07);border:1px solid var(--tw-line);border-bottom-left-radius:5px}
  .tw-me{align-self:flex-end;background:var(--tw-violet);color:#0B0B0A;font-weight:500;border-bottom-right-radius:5px}
  .tw-note{align-self:center;font-size:11.5px;color:#807b73;text-align:center;padding:2px 8px}
  .tw-typing{display:flex;gap:4px;align-items:center;padding:12px}
  .tw-typing i{width:6px;height:6px;border-radius:50%;background:#9A958C;animation:tw-blink 1.3s infinite}
  .tw-typing i:nth-child(2){animation-delay:.18s}
  .tw-typing i:nth-child(3){animation-delay:.36s}
  @keyframes tw-blink{0%,60%,100%{opacity:.25}30%{opacity:1}}

  .tw-foot{flex:0 0 auto;border-top:1px solid var(--tw-line);padding:10px}
  .tw-row{display:flex;gap:8px;align-items:center}
  .tw-in{flex:1;background:#17140F;border:1px solid var(--tw-line);border-radius:11px;padding:10px 12px;
    color:#F4EEE3;font-size:13.5px;font-family:inherit;outline:none;min-width:0}
  .tw-in:focus{border-color:rgba(142,101,255,.6)}
  .tw-in::placeholder{color:#807b73}
  .tw-btn{flex:0 0 auto;border:0;border-radius:11px;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;
    display:flex;align-items:center;justify-content:center;transition:filter .15s}
  .tw-btn:hover{filter:brightness(1.12)}
  .tw-btn:disabled{opacity:.45;cursor:default}
  .tw-send{width:40px;height:40px;background:rgba(244,238,227,.1);color:#F4EEE3;font-size:16px}
  .tw-call{width:100%;margin-top:8px;padding:10px;background:var(--tw-violet);color:#0B0B0A;gap:7px}
  .tw-call.tw-live{background:#2A2440;color:#F4EEE3}
  .tw-legal{text-align:center;font-size:10.5px;color:#6f6a63;margin-top:8px}
  .tw-legal a{color:#8d877e;text-decoration:underline}

  @media (max-width:640px){
    .tw-root{right:10px;left:10px;bottom:10px}
    .tw-panel{width:100%;max-width:none;height:min(74vh,540px)}
    .tw-launch{margin-left:auto}
    .tw-teaser{max-width:190px}
  }
  @media (prefers-reduced-motion:reduce){
    .tw-ring{animation:none !important}
  }`;

  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  /* ---------------- dom ---------------- */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function orb() {
    var o = el("div", "tw-orb");
    var img = new Image();
    img.src = AVATAR;
    img.alt = "";
    img.onerror = function () { o.innerHTML = '<div class="tw-orb-fallback">&#8734;</div>'; };
    o.appendChild(img);
    return o;
  }
  function character() {
    var c = el("div", "tw-char");
    var idle = new Image();
    idle.src = AVATAR;
    idle.alt = "";
    idle.className = "tw-frame-idle";
    idle.onerror = function () {
      c.innerHTML = '<div class="tw-char-fallback">&#8734;</div>';
      c.appendChild(el("div", "tw-glow"));
    };
    var talk = new Image();
    talk.src = AVATAR_TALK;
    talk.alt = "";
    talk.className = "tw-frame-talk";
    // if the speaking frame is missing, just keep showing the idle one
    talk.onerror = function () { talk.style.display = "none"; };
    c.appendChild(idle);
    c.appendChild(talk);
    c.appendChild(el("div", "tw-glow"));
    return c;
  }

  var root = el("div", "tw-root");
  root.setAttribute("data-state", "idle");

  // launcher
  var launchWrap = el("div", "tw-launch-wrap");
  launchWrap.style.cssText = "display:flex;align-items:center;justify-content:flex-end;gap:10px;position:relative";
  var teaser = el("div", "tw-teaser");
  teaser.innerHTML = TEASER.replace("book you a call", "<b>book you a call</b>");
  var teaserClose = el("button", "tw-teaser-close", "&times;");
  teaserClose.setAttribute("aria-label", "Dismiss");
  teaser.appendChild(teaserClose);
  teaser.classList.add("tw-hidden");
  var launchBtn = el("button", "tw-launch");
  launchBtn.setAttribute("aria-label", "Chat with " + NAME + "'s " + SUBTITLE);
  var charEl = character();
  launchBtn.appendChild(charEl);
  launchWrap.appendChild(teaser);
  launchWrap.appendChild(launchBtn);

  // panel
  var panel = el("div", "tw-panel tw-hidden");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", NAME + "'s " + SUBTITLE);
  var head = el("div", "tw-head");
  head.appendChild(orb());
  var ht = el("div", "tw-head-txt");
  ht.appendChild(el("div", "tw-name", NAME + " &mdash; " + SUBTITLE));
  var status = el("div", "tw-status");
  status.appendChild(el("span", "tw-dot"));
  var statusTxt = el("span", null, "Ready");
  status.appendChild(statusTxt);
  ht.appendChild(status);
  head.appendChild(ht);
  var xBtn = el("button", "tw-x", "&times;");
  xBtn.setAttribute("aria-label", "Close");
  head.appendChild(xBtn);

  var log = el("div", "tw-log");
  log.setAttribute("aria-live", "polite");

  var foot = el("div", "tw-foot");
  var row = el("div", "tw-row");
  var input = el("input", "tw-in");
  input.type = "text";
  input.placeholder = "Type a message…";
  input.setAttribute("aria-label", "Message");
  var sendBtn = el("button", "tw-btn tw-send", "&uarr;");
  sendBtn.setAttribute("aria-label", "Send");
  row.appendChild(input);
  row.appendChild(sendBtn);
  var callBtn = el("button", "tw-btn tw-call", "Talk out loud");
  var legal = el("div", "tw-legal", "AI assistant &middot; conversations may be reviewed");
  foot.appendChild(row);
  foot.appendChild(callBtn);
  foot.appendChild(legal);

  panel.appendChild(head);
  panel.appendChild(log);
  panel.appendChild(foot);
  root.appendChild(panel);
  root.appendChild(launchWrap);
  document.body.appendChild(root);

  /* ---------------- state ---------------- */
  var convo = null, mode = null, opened = false, greeted = false, teaserShown = false;

  function setState(s) {
    root.setAttribute("data-state", s);
    statusTxt.textContent =
      s === "listening" ? "Listening…" :
      s === "speaking" ? "Speaking…" :
      s === "connecting" ? "Connecting…" :
      convo ? "Connected" : "Ready";
  }
  function add(who, text) {
    if (!text) return null;
    var m = el("div", "tw-msg " + (who === "me" ? "tw-me" : "tw-ai"));
    m.textContent = text;
    log.appendChild(m);
    log.scrollTop = log.scrollHeight;
    return m;
  }
  function note(text) {
    var n = el("div", "tw-note");
    n.textContent = text;
    log.appendChild(n);
    log.scrollTop = log.scrollHeight;
  }

  var typingEl = null;
  function showTyping() {
    if (typingEl) return;
    typingEl = el("div", "tw-msg tw-ai tw-typing", "<i></i><i></i><i></i>");
    log.appendChild(typingEl);
    log.scrollTop = log.scrollHeight;
  }
  function hideTyping() {
    if (typingEl && typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);
    typingEl = null;
  }

  function open() {
    opened = true;
    panel.classList.remove("tw-hidden");
    launchWrap.classList.add("tw-hidden");
    teaser.classList.add("tw-hidden");
    setTimeout(function () { input.focus(); }, 60);
    if (!greeted) {
      greeted = true;
      // Connect straight away so the agent delivers its own opening line,
      // rather than showing a local greeting the agent would then duplicate.
      showTyping();
      ensure(false).catch(function (e) {
        console.error("[twin]", e);
        hideTyping();
        add("ai", "Hey — I'm " + NAME + "'s " + SUBTITLE + ". I'm having trouble connecting right now; email ahmadbukhari4245@gmail.com and Ahmad will reply directly.");
      });
    }
  }
  function close() {
    opened = false;
    panel.classList.add("tw-hidden");
    launchWrap.classList.remove("tw-hidden");
  }

  launchBtn.addEventListener("click", open);
  xBtn.addEventListener("click", close);
  teaserClose.addEventListener("click", function (e) {
    e.stopPropagation();
    teaser.classList.add("tw-hidden");
  });
  teaser.addEventListener("click", open);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && opened) close();
  });

  /* ---------------- sdk ---------------- */
  var sdkPromise = null;
  function loadSdk() {
    if (!sdkPromise) sdkPromise = import(SDK);
    return sdkPromise;
  }

  var pendingAi = null;
  function callbacks() {
    return {
      onConnect: function () { setState("idle"); },
      onDisconnect: function () {
        convo = null; mode = null;
        callBtn.textContent = "Talk out loud";
        callBtn.classList.remove("tw-live");
        setState("idle");
      },
      onModeChange: function (m) {
        var v = m && (m.mode || m);
        setState(v === "speaking" ? "speaking" : "listening");
      },
      onStatusChange: function (s) {
        var v = s && (s.status || s);
        if (v === "connecting") setState("connecting");
      },
      onMessage: function (payload) {
        var text = payload && (payload.message != null ? payload.message : payload.text);
        var src = payload && (payload.source || payload.role);
        if (!text) return;
        hideTyping();
        if (src === "user") { add("me", text); pendingAi = null; return; }
        if (pendingAi) { pendingAi.textContent = text; log.scrollTop = log.scrollHeight; }
        else pendingAi = add("ai", text);
      },
      onError: function (e) {
        console.error("[twin]", e);
        note("Connection hiccup — try again, or email ahmadbukhari4245@gmail.com");
        setState("idle");
      }
    };
  }

  async function ensure(voice) {
    if (convo && (mode === "voice" || !voice)) return convo;
    if (convo && voice && mode === "text") { try { await convo.endSession(); } catch (_) {} convo = null; }
    setState("connecting");
    var mod = await loadSdk();
    var Conversation = mod.Conversation || (mod.default && mod.default.Conversation);
    if (!Conversation) throw new Error("SDK shape unexpected");
    if (voice) await navigator.mediaDevices.getUserMedia({ audio: true });
    var opts = Object.assign({ agentId: AGENT_ID }, callbacks());
    if (!voice) {
      // textOnly is required: without it the websocket session negotiates for
      // audio and never reaches "connected", so the panel hangs on Connecting.
      opts.connectionType = "websocket";
      opts.textOnly = true;
    }
    convo = await Conversation.startSession(opts);
    mode = voice ? "voice" : "text";
    return convo;
  }

  async function sendText() {
    var text = input.value.trim();
    if (!text) return;
    input.value = "";
    add("me", text);
    pendingAi = null;
    sendBtn.disabled = true;
    showTyping();
    try {
      var c = await ensure(false);
      c.sendUserMessage(text);
    } catch (e) {
      hideTyping();
      console.error("[twin]", e);
      note("Couldn't reach the agent. Email ahmadbukhari4245@gmail.com and Ahmad will reply directly.");
      setState("idle");
    }
    sendBtn.disabled = false;
    input.focus();
  }

  sendBtn.addEventListener("click", sendText);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); sendText(); }
  });

  callBtn.addEventListener("click", async function () {
    if (convo && mode === "voice") {
      try { await convo.endSession(); } catch (_) {}
      return;
    }
    callBtn.disabled = true;
    try {
      await ensure(true);
      callBtn.textContent = "End call";
      callBtn.classList.add("tw-live");
      note("Voice on — just talk.");
    } catch (e) {
      console.error("[twin]", e);
      note(e && e.name === "NotAllowedError"
        ? "Mic blocked. Allow microphone access, or keep typing."
        : "Couldn't start voice — you can keep typing.");
      setState("idle");
    }
    callBtn.disabled = false;
  });

  /* ---------------- reveal ---------------- */
  function hop() {
    if (opened || !charEl) return;
    charEl.classList.remove("tw-hop");
    void charEl.offsetWidth;           // restart the animation
    charEl.classList.add("tw-hop");
    setTimeout(function () { charEl.classList.remove("tw-hop"); }, 780);
  }
  launchBtn.addEventListener("mouseenter", hop);

  // idle hops, spaced irregularly so it reads as alive rather than mechanical
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function scheduleHop() {
    if (reduceMotion) return;
    setTimeout(function () {
      if (!opened && !document.hidden) hop();
      scheduleHop();
    }, 7000 + Math.random() * 9000);
  }
  scheduleHop();

  function showTeaser() {
    if (teaserShown || opened) return;
    teaserShown = true;
    teaser.classList.remove("tw-hidden");
    hop();
    setTimeout(function () { if (!opened) teaser.classList.add("tw-hidden"); }, 15000);
  }
  function onScroll() {
    var d = document.documentElement;
    var max = Math.max(1, d.scrollHeight - window.innerHeight);
    if (window.scrollY > 500 || window.scrollY / max > 0.18) {
      window.removeEventListener("scroll", onScroll);
      showTeaser();
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  setTimeout(showTeaser, 20000);
})();
