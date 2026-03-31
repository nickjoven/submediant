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
      // Standalone pages: insert at the START of the page-nav bar
      const pageNav = document.getElementById("page-nav");
      const nav = pageNav || document.querySelector("nav, .navbar, .bd-header");
      if (nav) {
        nav.insertBefore(btn, nav.firstChild);
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

// ── Format Accordion: expand / collapse ──────────────────────────────────
// Click once → expand all levels. Click again → collapse to level-0 only.
function initFormatAccordion() {
  var sections = document.querySelectorAll(".fmt-section");

  sections.forEach(function(section) {
    var levels = section.querySelectorAll(".fmt-level");
    if (levels.length === 0) return;

    // Level-0 starts active (conjecture visible)
    levels[0].classList.add("active");

    // Find or create the expand trigger — place it AFTER the last visible level
    var trigger = section.querySelector(".fmt-expand");
    if (!trigger) return;

    var expanded = false;
    trigger.textContent = "expand";

    trigger.addEventListener("click", function() {
      expanded = !expanded;
      for (var i = 1; i < levels.length; i++) {
        if (expanded) {
          levels[i].classList.add("active");
        } else {
          levels[i].classList.remove("active");
        }
      }
      trigger.textContent = expanded ? "collapse" : "expand";
    });
  });
}

// ── Curved space: subtle perspective warp on scroll (JB pages) ───────────
function initCurvedSpace() {
  // Only apply to pages with .bd-content (Jupyter Book) or .main content
  var content = document.querySelector(".bd-content, .bd-article-container, main");
  if (!content) return;

  // Set up perspective on the content's parent
  var wrapper = content.parentElement || content;
  wrapper.style.perspective = "1200px";
  wrapper.style.perspectiveOrigin = "50% 50%";
  content.style.transformOrigin = "50% 0%";
  content.style.transition = "transform 0.15s ease-out";

  var lastScroll = 0;
  window.addEventListener("scroll", function() {
    var scrollY = window.scrollY;
    var maxScroll = document.body.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    // Scroll fraction: 0 at top, 1 at bottom
    var frac = scrollY / maxScroll;

    // Curve: subtle rotateX that peaks at mid-scroll
    // At top and bottom: flat. In the middle: slightly tilted.
    var curve = Math.sin(frac * Math.PI) * 0.8; // max 0.8 degrees

    // Scroll velocity for additional micro-tilt
    var delta = scrollY - lastScroll;
    lastScroll = scrollY;
    var velocity = Math.max(-2, Math.min(2, delta * 0.02)); // clamp

    content.style.transform = "rotateX(" + (curve + velocity) + "deg)";
  }, { passive: true });
}

// ── Init ─────────────────────────────────────────────────────────────────
function init() {
  createMoonToggle();  // button must exist before applyPalette sets its icon
  applyPalette();
  initFormatAccordion();
  initCurvedSpace();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

})();
