/**
 * Playwright test: verify all LaTeX math renders via MathJax.
 *
 * Catches: unprocessed \(...\), $$...$$, or raw LaTeX commands
 * left visible in the rendered DOM after MathJax completes.
 *
 * Usage:
 *   npx playwright test tests/math-rendering.spec.mjs
 *
 * Requires:
 *   npm init -y && npm i -D @playwright/test && npx playwright install chromium
 *
 * Expects a built site at book/_build/html/ (run `python build.py` first).
 */

import { test, expect } from "@playwright/test";
import { readdirSync, statSync } from "fs";
import { join } from "path";

const BUILD_DIR = "book/_build/html";

function collectHtmlFiles(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (entry.startsWith("_") || entry.startsWith(".")) continue;
    if (statSync(full).isDirectory()) {
      collectHtmlFiles(full, files);
    } else if (entry.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

const pages = collectHtmlFiles(BUILD_DIR);

for (const page of pages) {
  const rel = page.replace(BUILD_DIR + "/", "");

  test(`math renders on ${rel}`, async ({ page: p }) => {
    await p.goto("file://" + join(process.cwd(), page));

    // Wait for MathJax to finish processing
    await p.waitForFunction(() => {
      if (!window.MathJax) return true; // no MathJax on this page
      if (!window.MathJax.startup) return true;
      return window.MathJax.startup.promise
        ? window.MathJax.startup.promise.then(() => true)
        : true;
    }, { timeout: 10000 }).catch(() => {
      // MathJax may not be present on standalone HTML pages
    });

    // Extra settle time for rendering
    await p.waitForTimeout(1000);

    // Find all elements that Sphinx marked as math
    const failures = await p.evaluate(() => {
      const bad = [];
      // Check <span class="math"> elements — these should be processed by MathJax
      document.querySelectorAll("span.math").forEach((el) => {
        const text = el.textContent || "";
        // If span still contains raw \( or \[ delimiters, MathJax didn't process it
        if (/\\[(\[]/.test(text) && !el.querySelector("mjx-container, .MathJax")) {
          bad.push({
            raw: text.slice(0, 80),
            tag: el.tagName,
            classes: el.className,
          });
        }
      });
      // Check for raw LaTeX leaked into visible text (outside math spans)
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
      );
      let node;
      while ((node = walker.nextNode())) {
        const t = node.textContent;
        if (!t) continue;
        const parent = node.parentElement;
        if (!parent) continue;
        // Skip script, style, code, pre, and already-processed MathJax
        const tag = parent.tagName;
        if (["SCRIPT","STYLE","CODE","PRE","MJX-CONTAINER"].includes(tag)) continue;
        if (parent.closest("mjx-container, .MathJax, script, style, code, pre, noscript")) continue;
        // Check for raw LaTeX commands that suggest unprocessed math
        if (/\\(phi|psi|sqrt|frac|sum|int|partial|nabla|lvert|rvert|mathrm|mathbb|approx|times|infty)\b/.test(t)) {
          bad.push({
            raw: t.trim().slice(0, 80),
            tag: parent.tagName,
            classes: parent.className,
          });
        }
      }
      return bad;
    });

    if (failures.length > 0) {
      const msg = failures
        .map((f, i) => `  ${i + 1}. <${f.tag} class="${f.classes}">: ${f.raw}`)
        .join("\n");
      expect(failures.length, `Unrendered math on ${rel}:\n${msg}`).toBe(0);
    }
  });
}
