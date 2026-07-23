(function () {
  "use strict";

  var story = document.querySelector("[data-cinema-story]");
  var stage = story && story.querySelector("[data-decision-engine]");
  if (!story || !stage) return;

  var camera = story.querySelector("[data-cinema-camera]");
  var copies = Array.prototype.slice.call(story.querySelectorAll("[data-cinema-copy]"));
  var progressBar = story.querySelector("[data-cinema-progress]");
  var readout = story.querySelector("[data-cinema-readout]");
  var phaseLabel = story.querySelector("[data-cinema-phase]");
  var gateStatus = story.querySelector("[data-cinema-gate-status]");
  var layers = {};
  var callouts = {};
  var layerNames = ["signal", "context", "decision", "boundary", "action", "evidence"];
  var phaseNames = ["Attract", "Collide", "Open", "Inspect", "Gate", "Reassemble", "Emit"];
  var phaseStops = [0, 0.11, 0.19, 0.34, 0.48, 0.64, 0.79];
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var saveData = Boolean(navigator.connection && navigator.connection.saveData);
  var target = 0;
  var display = 0;
  var frame = 0;
  var lastFrame = performance.now();
  var visible = true;
  var pointerX = 0;
  var pointerY = 0;
  var manual = false;

  layerNames.forEach(function (name) {
    layers[name] = story.querySelector('[data-cinema-layer="' + name + '"]');
    callouts[name] = story.querySelector('[data-cinema-callout="' + name + '"]');
  });

  var compact = {
    evidence: { x: 0, y: 0, z: -105, scale: 0.82, rotate: 0 },
    action: { x: 0, y: 0, z: -63, scale: 0.82, rotate: 0 },
    boundary: { x: 0, y: 0, z: -21, scale: 0.82, rotate: 0 },
    decision: { x: 0, y: 0, z: 21, scale: 0.82, rotate: 0 },
    context: { x: 0, y: 0, z: 63, scale: 0.82, rotate: 0 },
    signal: { x: 0, y: 0, z: 105, scale: 0.82, rotate: 0 }
  };
  var exploded = {
    signal: { x: -265, y: -258, z: 145, scale: 0.56, rotate: -7 },
    context: { x: 252, y: -246, z: 105, scale: 0.56, rotate: 6 },
    decision: { x: -285, y: 0, z: 70, scale: 0.56, rotate: -7 },
    boundary: { x: 278, y: 3, z: 35, scale: 0.56, rotate: 7 },
    action: { x: -250, y: 248, z: 5, scale: 0.56, rotate: -6 },
    evidence: { x: 255, y: 255, z: -30, scale: 0.56, rotate: 6 }
  };

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

  function range(value, start, end) {
    return smooth((value - start) / Math.max(0.0001, end - start));
  }

  function progressFromScroll() {
    var rect = story.getBoundingClientRect();
    var travel = Math.max(1, story.offsetHeight - window.innerHeight);
    return clamp(-rect.top / travel, 0, 1);
  }

  function phaseAt(progress) {
    var phase = 0;
    phaseStops.forEach(function (stop, index) {
      if (progress >= stop) phase = index;
    });
    return phase;
  }

  function copyWeights(progress) {
    return [
      1 - range(progress, 0.15, 0.205),
      range(progress, 0.17, 0.225) * (1 - range(progress, 0.40, 0.455)),
      range(progress, 0.42, 0.475) * (1 - range(progress, 0.61, 0.665)),
      range(progress, 0.63, 0.69) * (1 - range(progress, 0.82, 0.875)),
      range(progress, 0.84, 0.91)
    ];
  }

  function positionLayer(name, index, progress, scaleFactor) {
    var element = layers[name];
    var from = compact[name];
    var to = exploded[name];
    var explode = range(progress, 0.155 + index * 0.009, 0.305 + index * 0.009);
    var collapse = range(progress, 0.605 + (5 - index) * 0.008, 0.755 + (5 - index) * 0.008);
    var outward = explode * (1 - collapse);
    var settle = Math.sin(collapse * Math.PI) * 0.025 * (1 - outward);
    var x = mix(from.x, to.x, outward) * scaleFactor;
    var y = mix(from.y, to.y, outward) * scaleFactor;
    var z = mix(from.z, to.z, outward) * scaleFactor;
    var size = mix(from.scale, to.scale, outward) + settle;
    var rotate = mix(from.rotate, to.rotate, outward);
    element.style.transform =
      "translate(-50%,-50%) translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px," + z.toFixed(2) + "px) rotateZ(" + rotate.toFixed(2) + "deg) scale(" + size.toFixed(4) + ")";
  }

  function render(progress) {
    progress = clamp(progress, 0, 1);
    var stageSize = Math.min(stage.clientWidth || 800, stage.clientHeight || 800);
    var scaleFactor = clamp(stageSize / 800, 0.43, 1.08);
    var arrive = range(progress, 0.025, 0.14);
    var collisionWindow = range(progress, 0.115, 0.205) * (1 - range(progress, 0.205, 0.255));
    var collision = Math.sin(collisionWindow * Math.PI);
    var inspect = range(progress, 0.29, 0.37) * (1 - range(progress, 0.57, 0.635));
    var gate = range(progress, 0.455, 0.565);
    var collapse = range(progress, 0.61, 0.775);
    var emit = range(progress, 0.755, 0.855);
    var remember = range(progress, 0.81, 0.92);
    var dark = range(progress, 0.22, 0.31) * (1 - range(progress, 0.70, 0.79));

    layerNames.forEach(function (name, index) {
      positionLayer(name, index, progress, scaleFactor);
      if (callouts[name]) {
        callouts[name].style.opacity = inspect.toFixed(3);
        callouts[name].style.transform = "translateY(" + (14 * (1 - inspect)).toFixed(2) + "px)";
      }
    });

    var yaw = mix(-4, 8, range(progress, 0.14, 0.36)) - mix(0, 10, collapse) + pointerX * 1.8;
    var pitch = mix(50, 61, range(progress, 0.15, 0.34)) - mix(0, 5, collapse) - pointerY * 1.2;
    var roll = -3 + Math.sin(progress * Math.PI * 2) * 1.4 + collision * 1.8;
    var cameraScale = mix(0.84, 1.03, arrive) * (1 + collision * 0.065) * mix(1, 0.88, range(progress, 0.84, 0.96));
    camera.style.transform =
      "translate(-50%,-50%) translate3d(0," + (-34 * range(progress, 0.84, 0.96)).toFixed(2) + "px,0) rotateX(" + pitch.toFixed(2) + "deg) rotateY(" + yaw.toFixed(2) + "deg) rotateZ(" + roll.toFixed(2) + "deg) scale(" + cameraScale.toFixed(4) + ")";

    stage.style.setProperty("--cinema-field-opacity", (1 - range(progress, 0.14, 0.3) * 0.84).toFixed(3));
    stage.style.setProperty("--cinema-tether-opacity", inspect.toFixed(3));
    stage.style.setProperty("--cinema-input-x", mix(7, 50, arrive).toFixed(2) + "%");
    stage.style.setProperty("--cinema-input-y", mix(67, 51, arrive).toFixed(2) + "%");
    stage.style.setProperty("--cinema-input-opacity", (1 - range(progress, 0.18, 0.235)).toFixed(3));
    stage.style.setProperty("--cinema-input-scale", (1 + collision * 0.72).toFixed(3));
    stage.style.setProperty("--cinema-impact-opacity", collision.toFixed(3));
    stage.style.setProperty("--cinema-impact-scale", (0.2 + collision * 2.15).toFixed(3));
    stage.style.setProperty("--cinema-gate-turn", mix(0, -34, gate).toFixed(2) + "deg");
    stage.style.setProperty("--cinema-output-x", mix(50, 87, emit).toFixed(2) + "%");
    stage.style.setProperty("--cinema-output-y", mix(51, 72, emit).toFixed(2) + "%");
    stage.style.setProperty("--cinema-output-opacity", (emit * (1 - range(progress, 0.94, 1))).toFixed(3));
    stage.style.setProperty("--cinema-output-scale", mix(0.3, 1, emit).toFixed(3));
    stage.style.setProperty("--cinema-return-progress", remember.toFixed(3));
    story.style.setProperty("--cinema-dark-opacity", dark.toFixed(3));
    story.classList.toggle("cinema-dark", dark > 0.52);
    story.classList.toggle("cinema-gate-passed", gate > 0.54 || progress > 0.565);
    story.classList.toggle("cinema-resolved", progress > 0.82);
    gateStatus.textContent = gate > 0.54 || progress > 0.565 ? "Pass / logged" : "Hold / human";

    var weights = copyWeights(progress);
    var currentCopy = 0;
    weights.forEach(function (weight, index) {
      copies[index].style.setProperty("--cinema-copy-opacity", weight.toFixed(3));
      copies[index].classList.toggle("is-current", weight > 0.45);
      if (weight > weights[currentCopy]) currentCopy = index;
    });

    var phase = phaseAt(progress);
    phaseLabel.textContent = phaseNames[phase];
    readout.textContent = String(phase + 1).padStart(2, "0") + " / " + phaseNames[phase].toUpperCase();
    progressBar.style.transform = "scaleX(" + progress.toFixed(5) + ")";
    story.dataset.cinemaPhase = String(phase);
    story.dataset.cinemaFrame = progress.toFixed(4);
  }

  function tick(now) {
    frame = 0;
    if (!visible && !manual) return;
    var delta = Math.min(0.1, (now - lastFrame) / 1000);
    lastFrame = now;
    display += (target - display) * (1 - Math.exp(-10 * delta));
    if (Math.abs(target - display) < 0.00035) display = target;
    render(display);
    if (display !== target && !manual) wake();
  }

  function wake() {
    if (!frame) frame = requestAnimationFrame(tick);
  }

  function updateTarget() {
    if (manual || reducedMotion.matches || saveData) return;
    target = progressFromScroll();
    wake();
  }

  function configure() {
    manual = false;
    story.classList.toggle("cinema-static", reducedMotion.matches || saveData);
    if (reducedMotion.matches || saveData) {
      target = display = 0.36;
      render(display);
    } else {
      target = display = progressFromScroll();
      render(display);
      wake();
    }
    document.documentElement.classList.add("decision-engine-ready");
  }

  window.renderDecisionEngineFrame = function (progress) {
    manual = true;
    target = display = clamp(Number(progress) || 0, 0, 1);
    render(display);
  };

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) updateTarget();
    }, { rootMargin: "100px 0px" }).observe(story);
  }

  window.addEventListener("scroll", updateTarget, { passive: true });
  window.addEventListener("resize", function () { updateTarget(); render(display); }, { passive: true });
  stage.addEventListener("pointermove", function (event) {
    if (reducedMotion.matches || window.innerWidth < 761) return;
    var rect = stage.getBoundingClientRect();
    pointerX = clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1);
    pointerY = clamp((event.clientY - rect.top) / rect.height * 2 - 1, -1, 1);
    render(display);
  }, { passive: true });
  stage.addEventListener("pointerleave", function () {
    pointerX = pointerY = 0;
    render(display);
  }, { passive: true });
  if (typeof reducedMotion.addEventListener === "function") reducedMotion.addEventListener("change", configure);

  configure();
})();
