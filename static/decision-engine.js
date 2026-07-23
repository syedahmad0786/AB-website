(function () {
  "use strict";

  var story = document.querySelector("[data-engine-story]");
  var engine = document.querySelector("[data-decision-engine]");
  if (!story || !engine) return;

  var steps = Array.prototype.slice.call(story.querySelectorAll("[data-engine-step]"));
  var navItems = Array.prototype.slice.call(story.querySelectorAll("[data-engine-nav]"));
  var progressBar = story.querySelector("[data-engine-progress]");
  var readout = story.querySelector("[data-engine-readout]");
  var gateStatus = story.querySelector("[data-engine-gate-status]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var saveData = Boolean(navigator.connection && navigator.connection.saveData);
  var frame = 0;
  var names = ["SIGNAL", "CONTEXT", "DECISION", "BOUNDARY", "ACTION", "EVIDENCE"];
  var layerNames = ["signal", "context", "decision", "boundary", "action", "evidence"];
  var layers = {};

  layerNames.forEach(function (name) {
    layers[name] = story.querySelector('[data-engine-layer="' + name + '"]');
  });

  var compact = {
    evidence: { x: 0, y: 0, z: -90, scale: 0.82, rotate: 0 },
    action: { x: 0, y: 0, z: -54, scale: 0.82, rotate: 0 },
    boundary: { x: 0, y: 0, z: -18, scale: 0.82, rotate: 0 },
    decision: { x: 0, y: 0, z: 18, scale: 0.82, rotate: 0 },
    context: { x: 0, y: 0, z: 54, scale: 0.82, rotate: 0 },
    signal: { x: 0, y: 0, z: 90, scale: 0.82, rotate: 0 }
  };

  var exploded = {
    signal: { x: -67, y: -67, z: 18, scale: 0.58, rotate: -6 },
    context: { x: 61, y: -61, z: 12, scale: 0.58, rotate: 5 },
    decision: { x: -73, y: 0, z: 20, scale: 0.58, rotate: -6 },
    boundary: { x: 70, y: 1, z: 16, scale: 0.58, rotate: 6 },
    action: { x: -57, y: 66, z: 10, scale: 0.58, rotate: -5 },
    evidence: { x: 59, y: 67, z: 8, scale: 0.58, rotate: 5 }
  };

  var expansionFrames = [0, 0.76, 1, 1, 0.56, 0.14];

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }

  function mix(from, to, amount) {
    return from + (to - from) * amount;
  }

  function smooth(value) {
    value = clamp(value, 0, 1);
    return value * value * (3 - 2 * value);
  }

  function between(value, start, end) {
    return smooth((value - start) / (end - start));
  }

  function expansionAt(state) {
    var from = Math.floor(clamp(state, 0, expansionFrames.length - 1));
    var to = Math.min(expansionFrames.length - 1, from + 1);
    return mix(expansionFrames[from], expansionFrames[to], smooth(state - from));
  }

  function positionLayer(name, expansion, isActive) {
    var element = layers[name];
    if (!element) return;
    var from = compact[name];
    var to = exploded[name];
    var x = mix(from.x, to.x, expansion);
    var y = mix(from.y, to.y, expansion);
    var z = mix(from.z, to.z, expansion) + (isActive ? 200 : 0);
    var scale = mix(from.scale, to.scale, expansion);
    var rotate = mix(from.rotate, to.rotate, expansion);
    element.style.transform =
      "translate(-50%, -50%) translate3d(" + x.toFixed(2) + "%, " + y.toFixed(2) + "%, " + z.toFixed(2) + "px) rotate(" + rotate.toFixed(2) + "deg) scale(" + scale.toFixed(4) + ")";
  }

  function render(state, staticMode) {
    state = clamp(state, 0, steps.length - 1);
    var active = Math.round(state);
    var expansion = expansionAt(state);

    layerNames.forEach(function (name) {
      var isActive = layerNames[active] === name && !staticMode;
      positionLayer(name, expansion, isActive);
      if (layers[name]) layers[name].classList.toggle("is-active", isActive);
    });

    steps.forEach(function (step, index) {
      step.classList.toggle("is-active", index === active && !staticMode);
    });
    navItems.forEach(function (item, index) {
      item.classList.toggle("is-active", index === active);
    });

    var arrival = between(state, 0, 0.72);
    var impact = Math.sin(between(state, 0.55, 1.05) * Math.PI) * (1 - between(state, 1.05, 1.35));
    var gate = between(state, 3.08, 3.56);
    var output = between(state, 4.05, 4.92);

    engine.style.setProperty("--engine-expansion", expansion.toFixed(4));
    engine.style.setProperty("--engine-label-opacity", clamp(expansion * 1.35, 0, 1).toFixed(4));
    engine.style.setProperty("--engine-input-x", mix(5, 50, arrival).toFixed(2) + "%");
    engine.style.setProperty("--engine-input-y", mix(68, 50, arrival).toFixed(2) + "%");
    engine.style.setProperty("--engine-input-opacity", (1 - between(state, 0.9, 1.28)).toFixed(4));
    engine.style.setProperty("--engine-impact-opacity", clamp(impact, 0, 1).toFixed(4));
    engine.style.setProperty("--engine-impact-scale", (0.25 + clamp(impact, 0, 1) * 2.1).toFixed(4));
    engine.style.setProperty("--engine-gate-turn", mix(0, -34, gate).toFixed(2) + "deg");
    engine.style.setProperty("--engine-output-x", mix(50, 88, output).toFixed(2) + "%");
    engine.style.setProperty("--engine-output-y", mix(51, 72, output).toFixed(2) + "%");
    engine.style.setProperty("--engine-output-opacity", output.toFixed(4));
    engine.style.setProperty("--engine-output-scale", mix(0.35, 1, output).toFixed(4));
    engine.classList.toggle("is-gate-passed", gate > 0.54 || state > 4);

    if (gateStatus) gateStatus.textContent = gate > 0.54 || state > 4 ? "Pass / logged" : "Hold / human";
    if (readout) readout.textContent = String(active + 1).padStart(2, "0") + " / " + names[active];
    if (progressBar) progressBar.style.width = ((state / (steps.length - 1)) * 100).toFixed(2) + "%";
    story.dataset.engineState = String(active);
  }

  function mobileStateAtAnchor() {
    var anchor = window.innerHeight * 0.58;
    var centers = steps.map(function (step) {
      var copy = step.querySelector(".chapter-copy") || step;
      var rect = copy.getBoundingClientRect();
      return rect.top + rect.height / 2;
    });

    if (anchor <= centers[0]) return 0;
    if (anchor >= centers[centers.length - 1]) return centers.length - 1;

    for (var index = 0; index < centers.length - 1; index += 1) {
      if (anchor <= centers[index + 1]) {
        var span = Math.max(1, centers[index + 1] - centers[index]);
        return index + clamp((anchor - centers[index]) / span, 0, 1);
      }
    }

    return centers.length - 1;
  }

  function update() {
    frame = 0;
    if (window.matchMedia("(max-width: 760px)").matches) {
      render(mobileStateAtAnchor(), false);
      return;
    }

    var rect = story.getBoundingClientRect();
    var top = window.scrollY + rect.top;
    var travel = Math.max(1, story.offsetHeight - window.innerHeight);
    var progress = clamp((window.scrollY - top) / travel, 0, 1);
    render(progress * (steps.length - 1), false);
  }

  function requestUpdate() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  function configure() {
    var staticMode = reduceMotion.matches || saveData;
    story.classList.toggle("engine-static", staticMode);
    if (staticMode) {
      removeEventListener("scroll", requestUpdate);
      removeEventListener("resize", requestUpdate);
      render(3.5, true);
    } else {
      addEventListener("scroll", requestUpdate, { passive: true });
      addEventListener("resize", requestUpdate, { passive: true });
      update();
    }
    document.documentElement.classList.add("decision-engine-ready");
  }

  if (typeof reduceMotion.addEventListener === "function") reduceMotion.addEventListener("change", configure);
  configure();
})();
