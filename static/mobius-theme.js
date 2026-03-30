/* Mobius Theme System
   6 moon phases · 12 colors · Möbius strip navigation · hover nav · m-for-more
   Palette positioned by golden ratio from reference color */

(function() {
"use strict";

// ── Palette: 12 colors, golden-ratio spaced from reference ──────────────
const PALETTE = [
  "#DE3373", "#FCCA28", "#08A953", "#F5712A", "#F59EAF", "#EE1B3E",
  "#1E76B8", "#7C2E87", "#7A0434", "#F98F81", "#37BA9B", "#C0C2C2"
];

// Golden ratio for spacing
const PHI = (1 + Math.sqrt(5)) / 2;
const PHI_INV = 1 / PHI; // ~0.618

// Moon phase SVG — Stern-Brocot tree as ginkgo-leaf veins, golden-ratio spacing
// Each phase reveals more of the leaf/tree; negative space is the shadow
function moonSVG(phase, color) {
  const cx = 10, cy = 10, r = 8;
  const frac = phase / 5; // illumination 0→1
  const bg = "var(--m-bg, #0d1117)";
  const d = darken(color);

  // Stern-Brocot branching lines — ginkgo leaf veins
  // Positioned at golden-ratio intervals along the central vein
  // Level 0: central stem (1/1)
  // Level 1: branches at 1/φ and 1/φ² from top (mediants 1/2, 2/3)
  // Level 2: sub-branches (mediants 1/3, 2/5, 3/5, 3/4)
  const p = PHI_INV; // 0.618...
  const veinOpacity = (0.15 + frac * 0.35).toFixed(2);
  const subVeinOpacity = (frac * 0.25).toFixed(2);

  // Central vein (trunk of the tree, stem of the ginkgo)
  const stem = `<line x1="10" y1="${18-16*p}" x2="10" y2="18" stroke="${d}" stroke-width="0.6" opacity="${veinOpacity}"/>`;

  // Level-1 branches at golden-ratio height: y = 18 - 16·φ⁻¹ ≈ 8.1 and y = 18 - 16·φ⁻² ≈ 11.9
  const y1 = (18 - 16 * p).toFixed(1);       // ~8.1
  const y2 = (18 - 16 * p * p).toFixed(1);   // ~11.9
  const branch1 = frac >= 0.2 ? `
    <line x1="10" y1="${y1}" x2="${10 - 5*p}" y2="${y1 - 3}" stroke="${d}" stroke-width="0.45" opacity="${veinOpacity}"/>
    <line x1="10" y1="${y1}" x2="${10 + 5*p}" y2="${y1 - 3}" stroke="${d}" stroke-width="0.45" opacity="${veinOpacity}"/>` : "";
  const branch2 = frac >= 0.4 ? `
    <line x1="10" y1="${y2}" x2="${10 - 4*p}" y2="${y2 - 2}" stroke="${d}" stroke-width="0.35" opacity="${veinOpacity}"/>
    <line x1="10" y1="${y2}" x2="${10 + 4*p}" y2="${y2 - 2}" stroke="${d}" stroke-width="0.35" opacity="${veinOpacity}"/>` : "";

  // Level-2 sub-branches (deeper Stern-Brocot mediants)
  const sub = frac >= 0.6 ? `
    <line x1="${(10 - 5*p).toFixed(1)}" y1="${(y1 - 3)}" x2="${(10 - 6*p).toFixed(1)}" y2="${(y1 - 5)}" stroke="${d}" stroke-width="0.3" opacity="${subVeinOpacity}"/>
    <line x1="${(10 + 5*p).toFixed(1)}" y1="${(y1 - 3)}" x2="${(10 + 6*p).toFixed(1)}" y2="${(y1 - 5)}" stroke="${d}" stroke-width="0.3" opacity="${subVeinOpacity}"/>` : "";

  // Ginkgo leaf outline: two arcs meeting at the stem top, with a notch (the negative space cleft)
  const notchD = frac < 0.2 ? 3 : frac < 0.8 ? 2 : 0.5; // cleft closes as moon fills
  const leafPath = `M10,${18-16*p - 1} C${10-r},${cy-r} ${10-r},${cy+r*0.5} 10,18
                    M10,${18-16*p - 1} C${10+r},${cy-r} ${10+r},${cy+r*0.5} 10,18`;

  if (phase === 0) {
    // New moon: pure negative space — only the ginkgo cleft visible
    return `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="0.8" opacity="0.3"/>
      <path d="M10,7 C6,5 4,10 10,18 M10,7 C14,5 16,10 10,18" fill="none" stroke="${color}" stroke-width="0.6" opacity="0.2"/>
      <circle cx="10" cy="12" r="1" fill="${color}" opacity="0.15"/>
    </svg>`;
  }

  if (phase === 5) {
    // Full moon: complete ginkgo with Stern-Brocot tree veins
    return `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <defs><clipPath id="mc5"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="0.85"/>
      <g clip-path="url(#mc5)">${stem}${branch1}${branch2}${sub}</g>
    </svg>`;
  }

  // Phases 1-4: crescent moon revealing ginkgo-leaf veins progressively
  const dx = r * (1 - 2 * frac);
  const clipId = "mc" + phase;
  return `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <defs><clipPath id="${clipId}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="0.85" clip-path="url(#${clipId})"/>
    <ellipse cx="${cx + dx}" cy="${cy}" rx="${(Math.abs(dx) + 1).toFixed(1)}" ry="${r}" fill="${bg}" clip-path="url(#${clipId})"/>
    <g clip-path="url(#${clipId})" opacity="${frac.toFixed(2)}">${stem}${branch1}${branch2}${sub}</g>
  </svg>`;
}

function darken(hex) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return `rgb(${r*0.4|0},${g*0.4|0},${b*0.4|0})`;
}

// Lift dark colors for readability on dark backgrounds.
// If a hex color's luminance is below threshold, brighten it.
function liftForDark(hex) {
  var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  // Relative luminance (simplified)
  var lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  if (lum > 0.4) return hex; // bright enough
  // Lift: blend toward white proportional to how dark it is
  var lift = 0.25 + (0.4 - lum) * 0.3;
  r = Math.min(255, Math.round(r + (255 - r) * lift));
  g = Math.min(255, Math.round(g + (255 - g) * lift));
  b = Math.min(255, Math.round(b + (255 - b) * lift));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// ── State: linked-list Möbius cycle with accumulating half-twist ─────────
//
// Structure: 12 colors in a circular linked list.
// Each cycle = 24 clicks: 12 Night pairings with Sun transitions between.
// Night shows the pair (tortoise, hare). Sun shows the hare advancing.
// The final Sun of each cycle hides a half-twist: the hare's offset
// increments by 1, shifting all pairings for the next cycle.
//
// Cycle 1 (twist=1): adjacent pairs — rose&gold, gold&green, ...
// Cycle 2 (twist=2): skip-1 — rose&green, gold&orange, ...
// Cycle 3 (twist=3): skip-2 — rose&orange, gold&pink, ...
// After 6 cycles (twist=6): diametrically opposite pairs.
// twist=7 through 11 mirrors 5 through 1 (same unordered pairs).
// Total: 66 unique pairings across 6 full cycles. Then it repeats.

// step -1 = native dark (no pairing, no toggle visible). First click → step 0.
let state = JSON.parse(localStorage.getItem("mobius-theme") || "null") ||
            { step: -1, twist: 1, mode: "dark" };
// Migration from old format
if (state.phase !== undefined) { state.step = (state.phase || 0) - 1; delete state.phase; }
if (!state.twist) state.twist = 1;
if (state.step < -1 || state.step >= 24) state.step = -1;
if (state.twist < 1 || state.twist > 6) state.twist = 1;

// Apply mode immediately to prevent flash
var initialMode = state.step < 0 ? "dark" : state.mode;
document.documentElement.setAttribute("data-mode", initialMode);
document.documentElement.setAttribute("data-theme", initialMode);
document.documentElement.style.colorScheme = initialMode;

function save() { localStorage.setItem("mobius-theme", JSON.stringify(state)); }

// Compute current pairing from step and twist
function currentPairing() {
  var pairIdx = Math.floor(state.step / 2); // which of the 12 pairings
  var isSun = state.step % 2 === 1;         // odd steps are Sun transitions
  var tortoise = pairIdx;
  var hare = (pairIdx + state.twist) % 12;
  return { tortoise: tortoise, hare: hare, isSun: isSun };
}

// Golden-ratio extras for accent3/accent4
function goldenAccents(primary, secondary) {
  var used = [primary, secondary];
  var accents = [];
  for (var i = 1; accents.length < 2; i++) {
    var idx = Math.round((primary + i * PHI_INV * 12) % 12);
    if (used.indexOf(idx) < 0 && accents.indexOf(idx) < 0) accents.push(idx);
  }
  return accents;
}

function applyPalette() {
  var root = document.documentElement;
  var btn = document.getElementById("mobius-moon-toggle");

  if (state.step < 0) {
    // Native dark: no color overrides. Toggle is a bright sun — the invitation.
    state.mode = "dark";
    root.setAttribute("data-mode", "dark");
    root.setAttribute("data-theme", "dark");
    root.style.colorScheme = "dark";
    if (btn) {
      btn.style.opacity = "1";
      btn.innerHTML = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">' +
        '<defs><filter id="sun-glow"><feGaussianBlur stdDeviation="1.5" result="blur"/>' +
        '<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>' +
        '<circle cx="10" cy="10" r="4.5" fill="#FCCA28" filter="url(#sun-glow)"/>' +
        '<g stroke="#FCCA28" stroke-width="1.8" stroke-linecap="round" opacity="0.9">' +
        '<line x1="10" y1="0.5" x2="10" y2="3.5"/><line x1="10" y1="16.5" x2="10" y2="19.5"/>' +
        '<line x1="0.5" y1="10" x2="3.5" y2="10"/><line x1="16.5" y1="10" x2="19.5" y2="10"/>' +
        '<line x1="3" y1="3" x2="5.2" y2="5.2"/><line x1="14.8" y1="14.8" x2="17" y2="17"/>' +
        '<line x1="3" y1="17" x2="5.2" y2="14.8"/><line x1="14.8" y1="5.2" x2="17" y2="3"/>' +
        '</g></svg>';
    }
    return;
  }

  // Show toggle once pairings begin
  if (btn) btn.style.opacity = "1";

  var pair = currentPairing();
  var primary, secondary;

  if (pair.isSun) {
    state.mode = "light";
    primary = pair.hare;
    secondary = (pair.hare + 1) % 12;
  } else {
    state.mode = "dark";
    primary = pair.tortoise;
    secondary = pair.hare;
  }

  var extras = goldenAccents(primary, secondary);

  // In dark mode, lift colors that are too dark for readability
  var lift = state.mode === "dark" ? liftForDark : function(c) { return c; };

  root.style.setProperty("--m-ref", lift(PALETTE[primary]));
  root.style.setProperty("--m-accent", lift(PALETTE[primary]));
  root.style.setProperty("--m-accent2", lift(PALETTE[secondary]));
  root.style.setProperty("--m-accent3", lift(PALETTE[extras[0]]));
  root.style.setProperty("--m-accent4", lift(PALETTE[extras[1]]));

  root.setAttribute("data-mode", state.mode);
  root.setAttribute("data-theme", state.mode);
  root.style.colorScheme = state.mode;

  var moonPhase = Math.floor(state.step / 2) % 6;
  if (btn) btn.innerHTML = moonSVG(moonPhase, lift(PALETTE[primary]));
}

// ── Moon Toggle ──────────────────────────────────────────────────────────
function createMoonToggle() {
  // Find or create the toggle button
  let btn = document.getElementById("mobius-moon-toggle");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "mobius-moon-toggle";
    btn.setAttribute("aria-label", "Cycle theme");
    btn.title = "Click: cycle through 12 color phases (two passes)";
    btn.style.transition = "opacity 0.3s ease";

    // Try to place next to the PyData theme-switch-button in the secondary nav
    const pyThemeBtn = document.querySelector(".theme-switch-button");
    const secondaryNav = document.querySelector(
      ".bd-header .secondary-nav, .article-header-buttons"
    ) || (pyThemeBtn && pyThemeBtn.closest(".btn-group, .secondary-nav, .article-header-buttons, .bd-header-article__inner"));

    if (pyThemeBtn && pyThemeBtn.parentNode) {
      // Insert moon toggle right before the existing theme-switch-button
      pyThemeBtn.parentNode.insertBefore(btn, pyThemeBtn);
      // Hide the PyData toggle but keep it in the DOM so PyData JS doesn't break
      pyThemeBtn.style.display = "none";
    } else if (secondaryNav) {
      secondaryNav.appendChild(btn);
    } else {
      // Fallback: look for any nav/header, otherwise use fixed positioning
      const nav = document.querySelector("nav, .navbar, .bd-header");
      if (nav) {
        nav.appendChild(btn);
      } else {
        btn.style.cssText = "position:fixed;top:12px;right:12px;z-index:999;";
        document.body.appendChild(btn);
      }
    }
  }

  btn.addEventListener("click", function(e) {
    // Advance: 12 states total, two passes through 6 moon shapes
    state.step = state.step + 1;
    if (state.step >= 24) {
      // End of cycle: half-twist increments the offset
      state.step = 0;
      state.twist = state.twist >= 6 ? 1 : state.twist + 1;
    }
    state.mode = state.step % 2 === 1 ? "light" : "dark";
    save();
    applyPalette();
    // Keep PyData theme-switch-button hidden after each click (in case PyData JS re-shows it)
    var pyToggle = document.querySelector(".theme-switch-button");
    if (pyToggle) pyToggle.style.display = "none";
  });

  // Also hide PyData toggle on initial load (covers case where btn already existed)
  var pyToggle = document.querySelector(".theme-switch-button");
  if (pyToggle) pyToggle.style.display = "none";
}

// ── Möbius Strip Data Structure ──────────────────────────────────────────
// Efficient: flat array, twist encoded as index arithmetic
// After N nodes, index wraps with reversal: node[2N - 1 - i] is the twisted pair
const MOBIUS_NODES = [
  // ── Narrative arc ──
  { id: "thesis",      title: "Thesis",                   url: "https://nickjoven.github.io/201/#thesis",          site: "201" },
  { id: "chain",       title: "The Chain: \u039b\u2192H\u2080\u2192a\u2080", url: "https://nickjoven.github.io/proslambenomenos/#chain", site: "proslambenomenos" },
  { id: "ke-mapping",  title: "Kuramoto\u2013Einstein",   url: "https://nickjoven.github.io/proslambenomenos/#mapping", site: "proslambenomenos" },
  { id: "stick-slip",  title: "Stick-Slip Mechanism",     url: "https://nickjoven.github.io/intersections/#string-and-galaxy", site: "intersections" },
  { id: "stribeck",    title: "Stribeck \u2261 MOND",     url: "https://nickjoven.github.io/intersections/#stribeck-mond", site: "intersections" },
  // ── Derivation chain ──
  { id: "alphabet",    title: "Minimum Alphabet",         url: "https://nickjoven.github.io/submediant-site/01_alphabet/10_minimum_alphabet.html", site: "submediant" },
  { id: "field-eq",    title: "Rational Field Equation",  url: "https://nickjoven.github.io/submediant-site/02_field_equation/11_rational_field_equation.html", site: "submediant" },
  { id: "einstein",    title: "Einstein from Kuramoto",   url: "https://nickjoven.github.io/submediant-site/03_einstein/13_einstein_from_kuramoto.html", site: "submediant" },
  { id: "schrodinger", title: "Schr\u00f6dinger (K<1)",   url: "https://nickjoven.github.io/submediant-site/04_schrodinger/04_schrodinger_intro.html", site: "submediant" },
  // ── Dual proofs ──
  { id: "renzo-adm",   title: "Renzo\u2019s Rule (ADM)",  url: "https://nickjoven.github.io/201/#mechanism", site: "201" },
  { id: "renzo-k",     title: "Renzo\u2019s Rule (Kuramoto)", url: "https://nickjoven.github.io/proslambenomenos/#renzo", site: "proslambenomenos" },
  { id: "lyapunov",    title: "Lyapunov Uniqueness",      url: "https://nickjoven.github.io/proslambenomenos/#lyapunov", site: "proslambenomenos" },
  // ── Predictions & evidence ──
  { id: "born",        title: "Born Rule",                url: "https://nickjoven.github.io/submediant-site/05_predictions/01_born_rule.html", site: "submediant" },
  { id: "tilt",        title: "Spectral Tilt",            url: "https://nickjoven.github.io/submediant-site/05_predictions/04_spectral_tilt_reframed.html", site: "submediant" },
  { id: "evidence",    title: "Evidence & SPARC",         url: "https://nickjoven.github.io/submediant-site/06_evidence/RESULTS.html", site: "submediant" },
  // ── Reference cluster: gallery, graph, glossary (adjacent for hierarchy) ──
  { id: "gallery",     title: "Gallery",                  url: "https://nickjoven.github.io/submediant-site/graph.html", site: "submediant", group: "reference" },
  { id: "graph",       title: "Derivation Graph",         url: "https://nickjoven.github.io/submediant-site/graph.html", site: "submediant", group: "reference" },
  { id: "glossary",    title: "Glossary",                 url: "https://nickjoven.github.io/submediant-site/glossary.html", site: "submediant", group: "reference" },
];

const N = MOBIUS_NODES.length;

// Möbius strip: at(i) returns node; at(i + N) returns twisted pair at(2N - 1 - i)
function mobiusAt(i) {
  const period = 2 * N;
  const wrapped = ((i % period) + period) % period;
  if (wrapped < N) return { node: MOBIUS_NODES[wrapped], twisted: false };
  return { node: MOBIUS_NODES[2 * N - 1 - wrapped], twisted: true };
}

function mobiusNeighbors(nodeId, radius) {
  radius = radius || 2;
  const idx = MOBIUS_NODES.findIndex(function(n) { return n.id === nodeId; });
  if (idx < 0) return [];

  // If in the reference cluster, always show all reference siblings
  var node = MOBIUS_NODES[idx];
  if (node && node.group === "reference") {
    var refs = [];
    MOBIUS_NODES.forEach(function(n) {
      if (n.group === "reference" && n.id !== nodeId) {
        refs.push({ node: n, twisted: false });
      }
    });
    // Plus a couple strip neighbors for context
    var prev = mobiusAt(idx - 1);
    if (prev.node.group !== "reference") refs.unshift(prev);
    return refs;
  }

  var result = [];
  for (var d = -radius; d <= radius; d++) {
    if (d === 0) continue;
    result.push(mobiusAt(idx + d));
  }
  return result;
}

// ── Hover Navigation ─────────────────────────────────────────────────────
var hoverNav = null;
var hoverTimeout = null;

// Check if hover enrichment is active (unified with glossary toggle)
function hoverActive() {
  return document.documentElement.getAttribute("data-glossary") !== "off";
}

function initHoverNav() {
  hoverNav = document.createElement("div");
  hoverNav.className = "mobius-hover-nav";
  document.body.appendChild(hoverNav);

  // Watch for glossary toggle changes — hide nav when glossary goes off
  var observer = new MutationObserver(function() {
    if (!hoverActive()) hoverNav.classList.remove("visible");
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-glossary"] });

  // Single delegated listener
  document.addEventListener("mouseover", function(e) {
    // All special hover behavior respects the glossary toggle
    if (!hoverActive()) return;
    // Don't overlay canvas/plotly/nav
    if (e.target.closest("canvas, .plotly-chart, .js-plotly-plot, svg, nav, .mobius-hover-nav")) return;

    // Find the best anchor: a nearby block element of reasonable size
    var target = e.target.closest("[data-mobius-id], .card, .panel, h2, h3, dt, p, blockquote, .admonition, li");
    if (!target) {
      target = e.target.closest("section, .bd-content .section");
      if (target && target.getBoundingClientRect().height > window.innerHeight * 0.8) {
        target = e.target.closest("h1, h2, h3, h4, p, dt, dd, li, blockquote") || null;
      }
    }
    if (!target) return;

    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(function() { showNav(target); }, 100);
  });

  document.addEventListener("mouseout", function(e) {
    if (e.relatedTarget && (hoverNav.contains(e.relatedTarget) || e.relatedTarget.closest("[data-mobius-id], .card, .panel, h2, h3, dt, p, section"))) return;
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(function() { hoverNav.classList.remove("visible"); }, 800);
  });
}

function showNav(el) {
  var id = el.dataset && el.dataset.mobiusId;
  // If no explicit ID, find closest section with one
  if (!id) {
    var sec = el.closest("[data-mobius-id]");
    if (sec) id = sec.dataset.mobiusId;
  }
  // Fallback: use nearest h2 text to guess
  if (!id) {
    var h = el.closest("section, .card, .panel");
    if (h) {
      var heading = h.querySelector("h2, h3");
      if (heading) id = heading.textContent.trim().toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 20);
    }
  }

  var neighbors = id ? mobiusNeighbors(id, 2) : [];
  if (neighbors.length === 0) {
    // Show generic strip navigation
    neighbors = [mobiusAt(0), mobiusAt(Math.floor(N/3)), mobiusAt(Math.floor(2*N/3))];
  }

  var html = neighbors.map(function(entry) {
    var cls = entry.twisted ? ' class="twisted"' : "";
    return '<a href="' + entry.node.url + '"' + cls + '>' + entry.node.title + '</a>';
  }).join('<span class="sep">\u00b7</span>');

  hoverNav.innerHTML = html;

  // Position at bottom of element, clamped to content area
  var rect = el.getBoundingClientRect();
  // Use the content container width if element is too narrow or too wide
  var container = el.closest(".bd-content, .container, article, main") || document.body;
  var containerRect = container.getBoundingClientRect();
  var navWidth = Math.min(Math.max(rect.width, 300), containerRect.width, 600);
  var navLeft = Math.max(rect.left, containerRect.left);

  hoverNav.style.top = (rect.bottom + window.scrollY + 4) + "px";
  hoverNav.style.left = navLeft + "px";
  hoverNav.style.width = navWidth + "px";
  hoverNav.classList.add("visible");
}

// ── "m for more, click for more" ─────────────────────────────────────────
var lastHovered = null;

function initExpand() {
  // Track last hovered expandable
  document.addEventListener("mouseover", function(e) {
    var ex = e.target.closest("[data-expandable]");
    if (ex) lastHovered = ex;
  });

  // Click on .more-hint or card
  document.addEventListener("click", function(e) {
    var hint = e.target.closest(".more-hint");
    if (hint) {
      toggleExpand(hint.closest("[data-expandable]"));
      return;
    }
  });

  // "m" key
  document.addEventListener("keydown", function(e) {
    if (e.key === "m" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // Don't trigger in inputs
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) return;
      if (lastHovered) toggleExpand(lastHovered);
    }
  });
}

function toggleExpand(el) {
  if (!el) return;
  var content = el.querySelector(".more-content");
  if (!content) return;
  content.classList.toggle("expanded");
  var hint = el.querySelector(".more-hint");
  if (hint) hint.textContent = content.classList.contains("expanded") ? "m to collapse" : "m for more, click for more";
}

// ── Auto-annotate sections with Möbius IDs ───────────────────────────────
function annotateContent() {
  // Try to match existing sections to Mobius nodes by heading text.
  // Supports both standard sites (h2[id]) and Jupyter Book / PyData Sphinx Theme
  // where sections carry the id directly (e.g. <section id="some-slug">).

  // 1. Standard heading-based matching
  var headings = document.querySelectorAll("h2[id], h2, h3[id], h3");
  headings.forEach(function(h) {
    var text = h.textContent.trim().toLowerCase();
    MOBIUS_NODES.forEach(function(node) {
      if (text.includes(node.title.toLowerCase().slice(0, 8)) ||
          (h.id && node.id.includes(h.id.slice(0, 6)))) {
        var parent = h.closest("section") || h.parentElement;
        if (parent && !parent.dataset.mobiusId) {
          parent.dataset.mobiusId = node.id;
        }
      }
    });
  });

  // 2. Jupyter Book: sections with id attributes directly (bd-content sections)
  var jbSections = document.querySelectorAll(".bd-content section[id], .bd-content .section[id]");
  jbSections.forEach(function(sec) {
    if (sec.dataset.mobiusId) return; // already annotated above
    var secId = sec.id.toLowerCase();
    MOBIUS_NODES.forEach(function(node) {
      if (!sec.dataset.mobiusId &&
          (node.id.includes(secId.slice(0, 6)) || secId.includes(node.id.slice(0, 6)))) {
        sec.dataset.mobiusId = node.id;
      }
    });
    // Also try matching via the first heading inside the section
    if (!sec.dataset.mobiusId) {
      var heading = sec.querySelector("h1, h2, h3, h4");
      if (heading) {
        var text = heading.textContent.trim().toLowerCase();
        MOBIUS_NODES.forEach(function(node) {
          if (!sec.dataset.mobiusId && text.includes(node.title.toLowerCase().slice(0, 8))) {
            sec.dataset.mobiusId = node.id;
          }
        });
      }
    }
  });
}

// ── Init ─────────────────────────────────────────────────────────────────
function init() {
  createMoonToggle();  // button must exist before applyPalette sets its icon
  applyPalette();
  annotateContent();
  initHoverNav();
  initExpand();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

})();
