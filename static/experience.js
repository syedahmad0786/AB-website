(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var saveData = Boolean(navigator.connection && navigator.connection.saveData);
  var scrollProgress = 0;
  var scrollFrame = 0;

  root.classList.add("js");
  requestAnimationFrame(function () { body.classList.add("is-ready"); });

  function updateScrollMeter() {
    var max = Math.max(1, root.scrollHeight - innerHeight);
    scrollProgress = scrollY / max;
    root.style.setProperty("--scroll-progress", scrollProgress);
    scrollFrame = 0;
  }
  function requestScrollMeter() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollMeter);
  }
  addEventListener("scroll", requestScrollMeter, { passive: true });
  addEventListener("resize", requestScrollMeter, { passive: true });
  updateScrollMeter();

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll(".reveal").forEach(function (element) { revealObserver.observe(element); });

  var menuButton = document.querySelector(".menu-toggle");
  function closeMenu() {
    body.classList.remove("menu-open");
    if (menuButton) menuButton.setAttribute("aria-expanded", "false");
  }
  if (menuButton) {
    menuButton.addEventListener("click", function () {
      var open = body.classList.toggle("menu-open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
  }

  var routeMap = {
    top: "top",
    work: "work",
    "automation-lab": "automation-lab",
    about: "about",
    "field-notes": "field-notes",
    contact: "contact"
  };
  function goToRoute(route, push, instant) {
    var id = routeMap[route] || "top";
    var target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: instant || reduceMotion ? "auto" : "smooth", block: "start" });
    if (push) history.pushState({ route: route }, "", route === "top" ? "/" : "/" + route);
    closeMenu();
  }
  document.querySelectorAll("[data-route]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      goToRoute(link.getAttribute("data-route"), true);
    });
  });
  addEventListener("popstate", function () { handlePath(false); });

  var cases = {
    workspine: {
      index: "01 / FLAGSHIP PRODUCT", maturity: "In progress", maturityClass: "in-progress",
      title: "Workspine",
      deck: "A private desktop memory spine for the work that disappears between apps, conversations, and decisions.",
      problem: "Knowledge work produces a trail of fragments, but the reasoning between them rarely survives. Search can retrieve files; it cannot reconstruct why a decision changed, what evidence supported it, or which commitment is now at risk.",
      architecture: ["Local capture", "Event model", "Context graph", "Memory timeline", "Evidence views"],
      decisions: ["Treat privacy boundaries as product architecture, not a settings screen.", "Store work as typed events so new views can emerge without rewriting history.", "Separate captured evidence from machine-generated interpretation.", "Make the timeline useful before adding autonomous action."],
      evidence: "Private source and product footage exist outside this public build. The portfolio exposes the architecture and decision logic without exposing internal code, personal work data, or inflated adoption claims.",
      stack: ["Desktop", "TypeScript", "Local-first", "AI memory"]
    },
    manhaj: {
      index: "02 / DELIVERY ENGINE", maturity: "Private system", maturityClass: "private",
      title: "MANHAJ Delivery Engine",
      deck: "A software-factory cockpit that turns delivery knowledge into governed, reusable system modules.",
      problem: "Automation work often scales by copying projects and relying on the builder’s memory. That makes quality inconsistent, estimates fragile, and releases difficult to audit.",
      architecture: ["Intake", "System blueprint", "Module registry", "Quality gates", "Release cockpit"],
      decisions: ["Model reusable capabilities separately from client-specific configuration.", "Require evidence at each delivery gate before a release can advance.", "Keep human approval where business risk cannot be reversed.", "Design the cockpit around exceptions and ownership, not vanity throughput."],
      evidence: "Self-owned, private system under active development. Public claims are limited to the operating model and architecture; implementation internals remain private until release.",
      stack: ["Agents", "Reusable modules", "Governance", "Delivery ops"]
    },
    "enterprise-os": {
      index: "03 / CLIENT SYSTEM", maturity: "Anonymized", maturityClass: "anonymized",
      title: "Enterprise Operating System",
      deck: "A layered operating model connecting delivery, permissions, finance, state gates, and observability.",
      problem: "The client’s operational truth was distributed across tools and teams. Actions could complete without the surrounding permissions, financial checks, or delivery state being visible in one place.",
      architecture: ["Identity & permissions", "State gates", "Delivery services", "Finance controls", "Audit & observability"],
      decisions: ["Define the business state machine before adding more workflows.", "Make privileged actions explicit and auditable.", "Separate operational status from financial status while preserving their dependencies.", "Use mock data and sanitized diagrams for public communication."],
      evidence: "Client identity, screenshots, source systems, volumes, and URLs are intentionally withheld. This case demonstrates the architecture pattern and the constraints that shaped it without revealing confidential implementation detail.",
      stack: ["CRM", "Permissions", "Finance", "Observability"]
    },
    errorlens: {
      index: "04 / RELIABILITY SYSTEM", maturity: "Public proof", maturityClass: "public",
      title: "Self Healing Automation",
      deck: "A reliability layer that turns silent workflow failure into a structured, recoverable operating event.",
      problem: "Most workflow errors are buried in platform logs or forwarded without enough context to act. The same failure can repeat while a team manually reconstructs what happened.",
      architecture: ["Detect", "Normalize", "Classify", "Retry or quarantine", "Escalate with context"],
      decisions: ["Retry only errors that are safe and plausibly transient.", "Preserve the original payload reference without exposing sensitive data in alerts.", "Route permanent failures to humans with owner, severity, and next action.", "Feed recurring failure classes back into system design."],
      evidence: "A public n8n creator profile is linked from the Automation Lab. Client payloads, credentials, and internal endpoints are never embedded in this demonstration.",
      stack: ["n8n", "Error taxonomy", "Retries", "Alerting"]
    },
    "migration-factory": {
      index: "05 / MIGRATION FACTORY", maturity: "Documented scope", maturityClass: "verified",
      title: "Make → n8n Migration Factory",
      deck: "A repeatable migration method for converting a 108-workflow estate into tested families rather than one-off rewrites.",
      problem: "A direct tool-for-tool rewrite preserves accidental complexity. It also makes parity testing inconsistent and hides which workflows are genuinely unique versus variations of the same pattern.",
      architecture: ["Inventory 108 candidates", "Classify families", "Map capabilities", "Rebuild modules", "Parity & exception tests"],
      decisions: ["Classify before rebuilding.", "Separate business behavior from platform-specific implementation.", "Build reusable nodes and subflows for recurring patterns.", "Use migration status and evidence states instead of one misleading completion number."],
      evidence: "The 108 figure describes documented migration candidates, not a claim that every workflow is already converted and deployed. Client logic and raw exports remain private.",
      stack: ["Make", "n8n", "Migration QA", "Pattern library"]
    },
    onboarding: {
      index: "06 / CROSS-PLATFORM OPS", maturity: "Anonymized", maturityClass: "anonymized",
      title: "Resilient Onboarding",
      deck: "A checkpointed onboarding system built to survive duplicate records, partial provisioning, delayed payment, and human exceptions.",
      problem: "Onboarding crossed CRM, billing, calendars, messaging, and manual setup. A partial failure could leave a customer with conflicting status across systems and no clear owner for recovery.",
      architecture: ["Validated intake", "Identity resolution", "Provisioning", "Verification", "Human handoff"],
      decisions: ["Make every step idempotent where the platform allows it.", "Persist checkpoints so recovery starts from known state.", "Treat human handoff as a designed system state.", "Show operators the last good state, current blocker, and next safe action."],
      evidence: "The live lab uses invented records and contains no client names, endpoints, or credentials. The public case communicates the system pattern while protecting the underlying engagement.",
      stack: ["CRM", "Billing", "Calendars", "Messaging"]
    }
  };

  var dialog = document.getElementById("case-dialog");
  var activeCase = null;
  function openCase(slug, push) {
    var item = cases[slug];
    if (!item || !dialog) return;
    activeCase = slug;
    document.getElementById("dialog-index").textContent = item.index;
    var maturity = document.getElementById("dialog-maturity");
    maturity.textContent = item.maturity;
    maturity.className = "maturity " + item.maturityClass;
    document.getElementById("dialog-title").textContent = item.title;
    document.getElementById("dialog-deck").textContent = item.deck;
    document.getElementById("dialog-problem").textContent = item.problem;
    document.getElementById("dialog-evidence").textContent = item.evidence;
    document.getElementById("dialog-architecture").innerHTML = item.architecture.map(function (step, index) {
      return "<span><b>" + String(index + 1).padStart(2, "0") + "</b>" + step + "</span>";
    }).join("<i>→</i>");
    document.getElementById("dialog-decisions").innerHTML = item.decisions.map(function (decision) {
      return "<li>" + decision + "</li>";
    }).join("");
    document.getElementById("dialog-stack").innerHTML = item.stack.map(function (tag) {
      return "<span>" + tag + "</span>";
    }).join("");
    if (!dialog.open) dialog.showModal();
    body.classList.add("dialog-open");
    if (push) history.pushState({ case: slug }, "", "/work/" + slug);
  }
  function closeCase(push) {
    if (!dialog) return;
    if (dialog.open) dialog.close();
    body.classList.remove("dialog-open");
    activeCase = null;
    if (push) history.pushState({ route: "work" }, "", "/work");
  }
  document.querySelectorAll("[data-case]").forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      openCase(trigger.getAttribute("data-case"), true);
    });
  });
  var dialogClose = document.querySelector(".dialog-close");
  if (dialogClose) dialogClose.addEventListener("click", function () { closeCase(true); });
  if (dialog) {
    dialog.addEventListener("cancel", function (event) { event.preventDefault(); closeCase(true); });
    dialog.addEventListener("click", function (event) { if (event.target === dialog) closeCase(true); });
  }

  document.querySelectorAll(".filter").forEach(function (filter) {
    filter.addEventListener("click", function () {
      document.querySelectorAll(".filter").forEach(function (item) { item.classList.remove("is-active"); });
      filter.classList.add("is-active");
      var value = filter.getAttribute("data-filter");
      document.querySelectorAll(".project-card").forEach(function (card) {
        card.hidden = value !== "all" && card.getAttribute("data-category") !== value;
      });
    });
  });

  function handlePath(scroll) {
    var path = location.pathname.replace(/^\/|\/$/g, "");
    if (path.indexOf("work/") === 0) {
      openCase(path.split("/")[1], false);
      var workSection = document.getElementById("work");
      if (scroll && workSection) workSection.scrollIntoView({ behavior: "auto", block: "start" });
      return;
    }
    if (activeCase) closeCase(false);
    if (routeMap[path] && scroll) goToRoute(path, false, true);
  }
  setTimeout(function () { handlePath(location.pathname !== "/"); }, 60);

  var scenarios = {
    happy: [
      ["complete", "Validated mock intake"],
      ["complete", "New identity created"],
      ["complete", "CRM, calendar, and messaging provisioned"],
      ["complete", "All downstream checks passed"],
      ["complete", "Owner notified with complete context"]
    ],
    duplicate: [
      ["complete", "Validated mock intake"],
      ["warning", "Existing identity matched; duplicate creation blocked"],
      ["complete", "Missing services reconciled"],
      ["complete", "Canonical record verified"],
      ["complete", "Owner notified of merged path"]
    ],
    calendar: [
      ["complete", "Validated mock intake"],
      ["complete", "New identity created"],
      ["warning", "Calendar unavailable; checkpoint saved"],
      ["complete", "Retry queued with exponential backoff"],
      ["complete", "Owner receives blocker and next safe action"]
    ],
    payment: [
      ["complete", "Validated mock intake"],
      ["complete", "Identity resolved"],
      ["warning", "Provisioning paused at payment gate"],
      ["complete", "Pending state verified; no duplicate charge"],
      ["complete", "Finance owner receives secure follow-up"]
    ],
    webhook: [
      ["complete", "Validated mock intake"],
      ["complete", "Identity resolved"],
      ["complete", "Core services provisioned"],
      ["warning", "Webhook timed out; idempotent replay succeeded"],
      ["complete", "Recovery event added to audit trail"]
    ]
  };
  var runButton = document.getElementById("run-simulation");
  var nodes = Array.prototype.slice.call(document.querySelectorAll(".pipeline-node"));
  var eventLog = document.getElementById("event-log");
  var runTimers = [];
  function clearRun() {
    runTimers.forEach(clearTimeout);
    runTimers = [];
    nodes.forEach(function (node) {
      node.className = "pipeline-node";
      node.querySelector("small").textContent = "waiting";
    });
    if (eventLog) eventLog.innerHTML = "";
  }
  if (runButton) {
    runButton.addEventListener("click", function () {
      clearRun();
      runButton.disabled = true;
      runButton.innerHTML = "Running <span>•••</span>";
      var scenario = document.getElementById("scenario").value;
      scenarios[scenario].forEach(function (event, index, events) {
        runTimers.push(setTimeout(function () {
          var node = nodes[index];
          node.classList.add("is-" + event[0]);
          node.querySelector("small").textContent = event[0] === "warning" ? "handled" : "complete";
          var item = document.createElement("li");
          item.className = event[0];
          item.innerHTML = "<time>00:0" + index + "." + String(140 + index * 87).slice(-3) + "</time><span>" + event[1] + "</span>";
          eventLog.appendChild(item);
          if (index === events.length - 1) {
            runButton.disabled = false;
            runButton.innerHTML = "Run again <span>↻</span>";
          }
        }, 220 + index * 440));
      });
    });
  }

  function initParticleWorld() {
    // visual-journey.js owns this WebGL context. Keep this renderer only as a fallback.
    if (window.__AB_JOURNEY_RENDERER__ === "journey-shapes-v2") return;

    var canvas = document.getElementById("intelligence-field");
    var shell = document.querySelector(".field-shell");
    var stageLabel = document.getElementById("field-stage");
    var qualityLabel = document.getElementById("field-quality");
    var chapters = Array.prototype.slice.call(document.querySelectorAll(".chapter[data-stage]"));
    var scaleSteps = Array.prototype.slice.call(document.querySelectorAll(".scale-step"));
    var labels = ["COSMOS", "MATTER", "BIOLOGY", "NETWORK", "COMPUTE"];
    var pathLabels = ["SCALE TUNNEL", "SIGNAL ARC", "NEURAL FIBER", "DATA BUS"];
    var journeyVisible = true;
    var visibleJourneySections = new Set();
    var visibilityObserver = shell ? new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visibleJourneySections.add(entry.target);
        else visibleJourneySections.delete(entry.target);
      });
      journeyVisible = visibleJourneySections.size > 0;
      shell.classList.toggle("field-sleeping", !journeyVisible);
      if (journeyVisible) requestRender();
    }, { rootMargin: "100px 0px" }) : null;
    var hero = document.getElementById("top");
    var thesis = document.getElementById("thesis");
    if (visibilityObserver && hero) visibilityObserver.observe(hero);
    if (visibilityObserver && thesis) visibilityObserver.observe(thesis);
    if (!canvas || !shell || !chapters.length || reduceMotion || saveData) {
      if (shell) shell.classList.add("field-static");
      if (qualityLabel) qualityLabel.textContent = reduceMotion ? "STATIC / REDUCED MOTION" : "STATIC / SAVE DATA";
      return;
    }

    var gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
      preserveDrawingBuffer: false
    });
    if (!gl) {
      shell.classList.add("field-static");
      if (qualityLabel) qualityLabel.textContent = "STATIC / WEBGL FALLBACK";
      return;
    }

    var vertexSource = [
      "precision highp float;",
      "attribute vec4 aSeed;",
      "uniform float uPhase;",
      "uniform float uAspect;",
      "uniform float uPointScale;",
      "varying vec3 vColor;",
      "varying float vAlpha;",
      "#define PI 3.14159265359",
      "float hash(float n){ return fract(sin(n)*43758.5453123); }",
      "mat2 rot(float a){ float c=cos(a),s=sin(a); return mat2(c,-s,s,c); }",
      "vec3 spherePoint(float a,float b,float r){ return vec3(sin(b)*cos(a),cos(b),sin(b)*sin(a))*r; }",
      "vec3 cosmos(vec4 s){",
      "  if(s.x<.70){",
      "    float x=(s.y-.5)*11.4;",
      "    float z=(s.w-.5)*6.2;",
      "    float ridge=sin(x*.60+z*.42)*.78+sin(x*1.13-z*.28)*.24;",
      "    float y=mix((s.z-.5)*6.4,ridge+(s.z-.5)*.68,.68);",
      "    return vec3(x,y,z);",
      "  }",
      "  float arm=floor(fract(s.x*7.13)*4.0);",
      "  float r=.2+pow(s.y,.54)*5.4;",
      "  float a=r*1.55+arm*PI*.5+(s.z-.5)*.8;",
      "  return vec3(cos(a)*r+1.1,(s.w-.5)*(.4+r*.06),sin(a)*r*.62);",
      "}",
      "vec3 atom(vec4 s){",
      "  if(s.x<.24){",
      "    float a=s.y*PI*2.0; float b=acos(clamp(2.0*s.z-1.0,-1.0,1.0));",
      "    return spherePoint(a,b,.18+pow(s.w,.58)*.58)+vec3(.95,.08,0.0);",
      "  }",
      "  float band=floor(fract(s.x*9.73)*4.0);",
      "  float a=s.y*PI*2.0;",
      "  float r=1.75+band*.42+(s.w-.5)*.06;",
      "  vec3 p=vec3(cos(a)*r,sin(a)*r,0.0);",
      "  p.yz=rot(.34+band*.57)*p.yz;",
      "  p.xz=rot(-.62+band*.31)*p.xz;",
      "  return p+vec3(.95,.08,0.0);",
      "}",
      "vec3 brain(vec4 s){",
      "  if(s.x<.14){",
      "    float a=fract(s.x/.14)*PI*2.0; float b=acos(clamp(2.0*s.y-1.0,-1.0,1.0));",
      "    float ridge=1.0+sin(a*10.0+b*5.0)*.08;",
      "    vec3 c=spherePoint(a,b,(.44+sqrt(s.z)*.20)*ridge);",
      "    c*=vec3(1.28,.72,.90); c.xz=rot(-.28)*c.xz;",
      "    return c+vec3(2.30,-1.00,.12);",
      "  }",
      "  if(s.x<.56){",
      "    float phi=s.y*PI*2.0; float theta=acos(clamp(2.0*s.z-1.0,-1.0,1.0));",
      "    float folds=1.0+sin(phi*9.0+theta*8.0)*.085+sin(phi*16.0-theta*5.0)*.045;",
      "    vec3 p=vec3(sin(theta)*cos(phi)*2.05,cos(theta)*1.46,sin(theta)*sin(phi)*1.17)*folds;",
      "    p.y-=.12*max(0.0,-p.y); p.x+=.10*sin(theta*2.0);",
      "    p.xz=rot(-.28)*p.xz;",
      "    return p+vec3(1.04,.12,0.0);",
      "  }",
      "  float band=floor((s.x-.56)/.44*14.0); float v=band/13.0*2.0-1.0;",
      "  float t=s.y*2.0-1.0; float span=sqrt(max(.04,1.0-v*v));",
      "  float wiggle=sin(t*PI*(2.0+mod(band,3.0))+band*.77)*.11;",
      "  float depth=sqrt(max(.0,1.0-t*t))*span;",
      "  vec3 g=vec3(t*2.02*span,v*1.32+wiggle,depth*1.10+(s.z-.5)*.07);",
      "  g.xz=rot(-.28)*g.xz;",
      "  return g+vec3(1.04,.12,0.0);",
      "}",
      "vec3 networkNode(float id){",
      "  return vec3((hash(id*2.31)-.5)*9.1,(hash(id*5.17+3.0)-.5)*5.5,(hash(id*8.73+9.0)-.5)*3.2);",
      "}",
      "vec3 network(vec4 s){",
      "  if(s.x<.16){",
      "    float node=floor(s.y*34.0); vec3 center=networkNode(node);",
      "    vec3 fuzz=normalize(vec3(s.z-.5,s.w-.5,hash(node+s.z)-.5)+.001)*pow(fract(s.y*34.0),2.4)*.20;",
      "    return center+fuzz;",
      "  }",
      "  if(s.x<.22){",
      "    float t=s.y*PI*2.0;",
      "    return vec3(2.6+cos(t)*.82,-1.62+sin(t*2.0)*.34,(s.z-.5)*.18);",
      "  }",
      "  float edge=floor((s.x-.22)/.78*38.0);",
      "  vec3 a=networkNode(edge); vec3 b=networkNode(edge+17.0);",
      "  vec3 p=mix(a,b,s.y);",
      "  p+=vec3(0.0,sin(s.y*PI)*((s.z-.5)*.22),(s.w-.5)*.16);",
      "  return p;",
      "}",
      "vec3 chip(vec4 s){",
      "  float cx=1.18;",
      "  if(s.x<.30){",
      "    float side=floor(s.y*4.0); float t=s.z*2.0-1.0;",
      "    if(side<1.0) return vec3(cx-1.28,t*1.16,(s.w-.5)*.12);",
      "    if(side<2.0) return vec3(cx+1.28,t*1.16,(s.w-.5)*.12);",
      "    if(side<3.0) return vec3(cx+t*1.28,-1.16,(s.w-.5)*.12);",
      "    return vec3(cx+t*1.28,1.16,(s.w-.5)*.12);",
      "  }",
      "  if(s.x<.49){",
      "    float gx=floor(s.y*13.0)/12.0*2.0-1.0; float gy=floor(s.z*11.0)/10.0*2.0-1.0;",
      "    return vec3(cx+gx*.78,gy*.66,(s.w-.5)*.24);",
      "  }",
      "  float side=floor(s.y*4.0); float lane=floor(s.w*13.0)/6.0-1.0; float t=s.z;",
      "  if(side<1.0) return vec3(mix(cx-1.28,-5.3,t),lane*.84,(hash(s.x*91.0)-.5)*.10);",
      "  if(side<2.0) return vec3(mix(cx+1.28,5.3,t),lane*.84,(hash(s.x*91.0)-.5)*.10);",
      "  if(side<3.0) return vec3(cx+lane*.92,mix(-1.16,-3.45,t),(hash(s.x*91.0)-.5)*.10);",
      "  return vec3(cx+lane*.92,mix(1.16,3.45,t),(hash(s.x*91.0)-.5)*.10);",
      "}",
      "vec3 scaleTunnel(vec4 s){",
      "  float depth=s.y*8.0-4.0; float a=s.z*PI*2.0+depth*.72;",
      "  float r=.28+abs(depth)*.54+(s.w-.5)*.14;",
      "  return vec3(cos(a)*r,sin(a)*r,depth);",
      "}",
      "vec3 signalArc(vec4 s){",
      "  float t=s.y; float width=(s.z-.5)*.34;",
      "  return vec3(-4.4+t*8.8,-1.45+sin(t*PI)*2.8+width,(s.w-.5)*.55);",
      "}",
      "vec3 neuralFiber(vec4 s){",
      "  float lane=floor(s.x*13.0)/6.0-1.0; float along=s.y*9.4-4.7;",
      "  return vec3(along,lane*1.15+sin(along*.64+lane)*.42,(s.z-.5)*.62);",
      "}",
      "vec3 dataBus(vec4 s){",
      "  float lane=floor(s.z*13.0)/6.0-1.0; float along=s.y*10.2-5.1;",
      "  return vec3(along,lane*1.42,(s.w-.5)*.28);",
      "}",
      "vec3 shape(float stage,vec4 s){",
      "  if(stage<.5) return cosmos(s); if(stage<1.5) return atom(s);",
      "  if(stage<2.5) return brain(s); if(stage<3.5) return network(s); return chip(s);",
      "}",
      "vec3 path(float stage,vec4 s){",
      "  if(stage<.5) return scaleTunnel(s); if(stage<1.5) return signalArc(s);",
      "  if(stage<2.5) return neuralFiber(s); return dataBus(s);",
      "}",
      "vec3 palette(float stage,vec4 s){",
      "  vec3 violet=vec3(.42,.24,1.0); vec3 cyan=vec3(.20,1.0,.82);",
      "  vec3 gold=vec3(.93,.69,.32); vec3 lime=vec3(.72,1.0,.10);",
      "  if(stage<.5) return mix(violet,cyan,s.z); if(stage<1.5) return mix(gold,lime,s.w);",
      "  if(stage<2.5) return mix(gold,violet,s.y); if(stage<3.5) return mix(cyan,violet,s.z);",
      "  return mix(lime,gold,s.w);",
      "}",
      "void main(){",
      "  float lo=floor(uPhase+.0001); float hi=min(4.0,lo+1.0);",
      "  float f=smoothstep(0.0,1.0,fract(uPhase));",
      "  vec3 direct=mix(shape(lo,aSeed),shape(hi,aSeed),f);",
      "  float pathAmount=pow(sin(f*PI),1.25)*.78;",
      "  vec3 p=mix(direct,path(lo,aSeed),pathAmount);",
      "  p.xz=rot(-.13+uPhase*.055)*p.xz; p.yz=rot(.13-uPhase*.026)*p.yz;",
      "  float perspective=7.2/(7.2-p.z*.5);",
      "  vec2 projected=vec2(p.x/uAspect,p.y)*perspective*.31;",
      "  gl_Position=vec4(projected,0.0,1.0);",
      "  float special=step(.965,aSeed.w);",
      "  gl_PointSize=uPointScale*perspective*(1.08+special*1.55);",
      "  vColor=mix(palette(lo,aSeed),palette(hi,aSeed),f);",
      "  vAlpha=.32+aSeed.w*.54+special*.20;",
      "}"
    ].join("\n");

    var fragmentSource = [
      "precision mediump float;",
      "varying vec3 vColor; varying float vAlpha;",
      "void main(){",
      "  vec2 uv=gl_PointCoord-.5; float d=length(uv);",
      "  if(d>.5) discard;",
      "  float light=smoothstep(.5,.06,d)+smoothstep(.5,0.0,d)*.24;",
      "  gl_FragColor=vec4(vColor*light,vAlpha*light);",
      "}"
    ].join("\n");

    function compile(type, source) {
      var shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
      return shader;
    }

    var program;
    try {
      program = gl.createProgram();
      gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    } catch (error) {
      shell.classList.add("field-static");
      if (qualityLabel) qualityLabel.textContent = "STATIC / SHADER FALLBACK";
      return;
    }

    var memory = Number(navigator.deviceMemory || 4);
    var cores = Number(navigator.hardwareConcurrency || 4);
    var mobile = innerWidth < 760;
    var constrained = memory <= 4 || cores <= 4;
    var particleCount = mobile ? 2200 : (constrained ? 3200 : 4800);
    var seeds = new Float32Array(particleCount * 4);
    var state = 192837465;
    function random() {
      state ^= state << 13; state ^= state >>> 17; state ^= state << 5;
      return (state >>> 0) / 4294967295;
    }
    for (var index = 0; index < seeds.length; index++) seeds[index] = random();

    gl.useProgram(program);
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW);
    var seedLocation = gl.getAttribLocation(program, "aSeed");
    gl.enableVertexAttribArray(seedLocation);
    gl.vertexAttribPointer(seedLocation, 4, gl.FLOAT, false, 0, 0);
    var uniforms = {
      phase: gl.getUniformLocation(program, "uPhase"),
      aspect: gl.getUniformLocation(program, "uAspect"),
      pointScale: gl.getUniformLocation(program, "uPointScale")
    };
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.disable(gl.DEPTH_TEST);

    var targetPhase = 0;
    var visible = !document.hidden;
    var lastDraw = -Infinity;
    var renderFrame = 0;
    var renderTimer = 0;
    var renderPending = false;
    var pixelScale = 1;
    var chapterCenters = [];
    var phaseFrame = 0;

    function render(now) {
      renderFrame = 0;
      renderPending = false;
      if (!visible || !journeyVisible) return;
      lastDraw = now;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uniforms.phase, targetPhase);
      gl.uniform1f(uniforms.aspect, innerWidth / Math.max(1, innerHeight));
      gl.uniform1f(uniforms.pointScale, (mobile ? 1.28 : 1.42) * pixelScale);
      gl.drawArrays(gl.POINTS, 0, particleCount);
      if (!shell.classList.contains("field-rendered")) shell.classList.add("field-rendered");
    }

    function requestRender() {
      if (!visible || !journeyVisible) return;
      renderPending = true;
      if (renderFrame || renderTimer) return;
      var delay = 34 - (performance.now() - lastDraw);
      if (delay <= 0) renderFrame = requestAnimationFrame(render);
      else {
        renderTimer = setTimeout(function () {
          renderTimer = 0;
          if (renderPending) renderFrame = requestAnimationFrame(render);
        }, delay);
      }
    }

    function resize() {
      mobile = innerWidth < 760;
      pixelScale = Math.min(1, 1800 / Math.max(1, innerWidth));
      var width = Math.max(1, Math.round(innerWidth * pixelScale));
      var height = Math.max(1, Math.round(innerHeight * pixelScale));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width; canvas.height = height;
        canvas.style.width = innerWidth + "px"; canvas.style.height = innerHeight + "px";
        gl.viewport(0, 0, width, height);
      }
      chapterCenters = chapters.map(function (chapter) {
        var rect = chapter.getBoundingClientRect();
        return scrollY + rect.top + rect.height * .5;
      });
      updatePhase();
    }

    function updatePhase() {
      phaseFrame = 0;
      var center = scrollY + innerHeight * .52;
      var centers = chapterCenters;
      if (!centers.length) return;
      if (center <= centers[0]) targetPhase = 0;
      else if (center >= centers[centers.length - 1]) targetPhase = 4;
      else {
        for (var i = 0; i < centers.length - 1; i++) {
          if (center >= centers[i] && center < centers[i + 1]) {
            var t = (center - centers[i]) / (centers[i + 1] - centers[i]);
            targetPhase = i + t * t * (3 - 2 * t);
            break;
          }
        }
      }
      var active = Math.max(0, Math.min(4, Math.round(targetPhase)));
      var lower = Math.min(3, Math.floor(targetPhase));
      var fraction = targetPhase - Math.floor(targetPhase);
      var onPath = targetPhase < 4 && fraction > .18 && fraction < .82;
      if (stageLabel) {
        stageLabel.textContent = onPath
          ? String(lower + 1).padStart(2, "0") + "→" + String(lower + 2).padStart(2, "0") + " / " + pathLabels[lower]
          : String(active + 1).padStart(2, "0") + " / " + labels[active];
      }
      scaleSteps.forEach(function (step, stepIndex) { step.classList.toggle("is-active", stepIndex === active); });
      requestRender();
    }

    function requestPhaseUpdate() {
      if (!phaseFrame) phaseFrame = requestAnimationFrame(updatePhase);
    }

    addEventListener("scroll", requestPhaseUpdate, { passive: true });
    addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", function () {
      visible = !document.hidden;
      if (visible) requestRender();
    });
    canvas.addEventListener("webglcontextlost", function (event) {
      event.preventDefault();
      shell.classList.add("field-static");
      visible = false;
      if (renderTimer) clearTimeout(renderTimer);
    }, false);

    if (qualityLabel) qualityLabel.textContent = particleCount.toLocaleString() + " POINTS / SCROLL DRIVEN";
    shell.classList.add("field-live");
    resize();
  }

  if ("requestIdleCallback" in window) {
    requestIdleCallback(initParticleWorld, { timeout: 650 });
  } else {
    setTimeout(initParticleWorld, 120);
  }
})();
