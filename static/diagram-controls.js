/* ── diagram-controls.js ─────────────────────────────────────────────────
 *  Uninvasive interactive controls for canvas-based diagrams.
 *
 *  Spacebar  → pause / play all requestAnimationFrame loops
 *  Scroll    → zoom foreground canvases (not canvas#bg)
 *
 *  No visible chrome. A brief, translucent indicator appears on state
 *  change and fades within ~0.7 s.
 * ────────────────────────────────────────────────────────────────────── */
(function () {
  "use strict";

  // ── Play / Pause via requestAnimationFrame interception ────────────

  var _raf = window.requestAnimationFrame.bind(window);
  var _caf = window.cancelAnimationFrame.bind(window);
  var paused = false;
  var pending = [];          // callbacks queued while paused
  var nextId = 1;
  var idMap = {};            // our id → real id (when running)

  window.requestAnimationFrame = function (cb) {
    if (paused) {
      var id = nextId++;
      pending.push({ id: id, cb: cb });
      return id;
    }
    var realId = _raf(cb);
    var id = nextId++;
    idMap[id] = realId;
    return id;
  };

  window.cancelAnimationFrame = function (id) {
    if (idMap[id] !== undefined) {
      _caf(idMap[id]);
      delete idMap[id];
    } else {
      // might be in the pending queue
      pending = pending.filter(function (p) { return p.id !== id; });
    }
  };

  function pause() {
    paused = true;
    showIndicator("pause");
  }

  function play() {
    paused = false;
    // flush all queued callbacks on next real frame
    var queued = pending.slice();
    pending.length = 0;
    if (queued.length) {
      _raf(function (ts) {
        for (var i = 0; i < queued.length; i++) {
          try { queued[i].cb(ts); } catch (e) { /* keep going */ }
        }
      });
    }
    showIndicator("play");
  }

  // Spacebar toggle (ignore when typing)
  document.addEventListener("keydown", function (e) {
    if (e.key !== " " && e.code !== "Space") return;
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select" ||
        e.target.isContentEditable) return;
    e.preventDefault();
    if (paused) play(); else pause();
  });

  // ── Wheel-to-zoom on foreground canvases ───────────────────────────

  var zoomState = new WeakMap();   // canvas → { scale, ox, oy }

  function getZoom(canvas) {
    var z = zoomState.get(canvas);
    if (!z) { z = { scale: 1, ox: 0.5, oy: 0.5 }; zoomState.set(canvas, z); }
    return z;
  }

  function applyZoom(canvas, z) {
    canvas.style.transformOrigin = (z.ox * 100) + "% " + (z.oy * 100) + "%";
    canvas.style.transform = z.scale === 1
      ? ""
      : "scale(" + z.scale.toFixed(4) + ")";
  }

  document.addEventListener("wheel", function (e) {
    var canvas = e.target;
    if (canvas.tagName !== "CANVAS" || canvas.id === "bg") return;

    // Only zoom when Ctrl/Meta is held, or when the canvas is in a
    // .viz-container (where scroll-jacking is expected)
    var inViz = !!canvas.closest(".viz-container");
    if (!inViz && !e.ctrlKey && !e.metaKey) return;

    e.preventDefault();

    var z = getZoom(canvas);
    var rect = canvas.getBoundingClientRect();

    // cursor position as fraction of canvas bounds
    z.ox = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    z.oy = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    var delta = e.deltaY > 0 ? -1 : 1;
    var factor = 1 + delta * 0.1;
    z.scale = Math.max(0.5, Math.min(4, z.scale * factor));

    // Snap back to 1 when close
    if (Math.abs(z.scale - 1) < 0.05) z.scale = 1;

    applyZoom(canvas, z);
  }, { passive: false });

  // Double-click resets zoom
  document.addEventListener("dblclick", function (e) {
    var canvas = e.target;
    if (canvas.tagName !== "CANVAS" || canvas.id === "bg") return;
    var z = getZoom(canvas);
    if (z.scale === 1) return;
    z.scale = 1;
    applyZoom(canvas, z);
  });

  // ── Minimal on-screen indicator ────────────────────────────────────

  var indicator = null;

  function ensureIndicator() {
    if (indicator) return indicator;
    indicator = document.createElement("div");
    var s = indicator.style;
    s.position = "fixed";
    s.top = "50%";
    s.left = "50%";
    s.transform = "translate(-50%,-50%)";
    s.zIndex = "99999";
    s.pointerEvents = "none";
    s.fontSize = "48px";
    s.lineHeight = "1";
    s.color = "rgba(255,255,255,0.55)";
    s.textShadow = "0 2px 12px rgba(0,0,0,0.5)";
    s.opacity = "0";
    s.transition = "opacity 0.15s ease-in";
    s.userSelect = "none";
    s.fontFamily = "system-ui, sans-serif";
    document.body.appendChild(indicator);
    return indicator;
  }

  var fadeTimer = null;

  function showIndicator(mode) {
    var el = ensureIndicator();
    el.textContent = mode === "pause" ? "\u23F8" : "\u25B6";
    // brief flash
    el.style.transition = "none";
    el.style.opacity = "0.7";
    // force reflow
    void el.offsetWidth;
    el.style.transition = "opacity 0.6s ease-out";
    if (fadeTimer) clearTimeout(fadeTimer);
    fadeTimer = setTimeout(function () { el.style.opacity = "0"; }, 120);
  }
})();
