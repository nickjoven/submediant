#!/usr/bin/env python3
"""Build the submediant site from the harmonics repository.

Fetches derivation markdown, computational notebooks, and data from
harmonics, arranges them into a Jupyter Book structure, and builds
an executable HTML site.

Usage:
    python build.py                  # fetch from GitHub + build
    python build.py --local ../      # use local sibling repos + build
    python build.py --fetch-only     # fetch sources, skip jb build
"""

import argparse
import hashlib
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.error import URLError

SITE_DIR = Path(__file__).parent
BOOK_DIR = SITE_DIR / "book"

# The reverse structure: polynomial first, evidence last
SECTIONS = {
    "00_narrative": {
        "title": "The Story",
        "files": [],
        "local": ["partial_agreement.md"],
    },
    "01_alphabet": {
        "title": "The Alphabet",
        "files": [
            ("harmonics", "sync_cost/derivations/10_minimum_alphabet.md"),
        ],
        "local": ["14_three_dimensions.md"],
    },
    "02_field_equation": {
        "title": "The Field Equation",
        "files": [
            ("harmonics", "sync_cost/derivations/11_rational_field_equation.md"),
        ],
    },
    "03_einstein": {
        "title": "K = 1: Einstein",
        "files": [
            ("harmonics", "sync_cost/derivations/13_einstein_from_kuramoto.md"),
            ("harmonics", "sync_cost/derivations/12_continuum_limits.md"),
        ],
    },
    "04_schrodinger": {
        "title": "K < 1: Schrödinger",
        "files": [],
        "generated": ["04_schrodinger_intro.md"],
    },
    "05_predictions": {
        "title": "Predictions",
        "files": [
            ("harmonics", "sync_cost/derivations/01_born_rule.md"),
            ("harmonics", "sync_cost/derivations/04_spectral_tilt_reframed.md"),
            ("harmonics", "sync_cost/derivations/08_high_z_mond.md"),
            ("harmonics", "sync_cost/derivations/09_fidelity_bound.md"),
        ],
    },
    "06_evidence": {
        "title": "Evidence",
        "files": [
            ("harmonics", "RESULTS.md"),
            ("harmonics", "sync_cost/FRAMEWORK.md"),
            ("harmonics", "sync_cost/derivations/03_a0_threshold.md"),
            ("harmonics", "sync_cost/derivations/06_planck_scale.md"),
            ("harmonics", "sync_cost/derivations/07_measurement_collapse.md"),
        ],
    },
    "07_prior_work": {
        "title": "Prior Work",
        "files": [
            ("proslambenomenos", "proslambenomenos.md"),
            ("201", "joven_unifying_framework.md"),
            ("intersections", "joven_stick_slip_dark_matter.md"),
        ],
    },
}

REPOS = {
    "harmonics": "nickjoven/harmonics",
    "proslambenomenos": "nickjoven/proslambenomenos",
    "201": "nickjoven/201",
    "intersections": "nickjoven/intersections",
}


def fetch_file_github(repo_slug, path):
    url = f"https://raw.githubusercontent.com/{repo_slug}/main/{path}"
    return urlopen(Request(url), timeout=30).read()


def fetch_file_local(local_root, repo_name, path):
    return (Path(local_root) / repo_name / path).read_bytes()


def fetch_sources(local_root=None):
    result = {}
    for section_id, section in SECTIONS.items():
        for repo_name, path in section.get("files", []):
            key = f"{repo_name}/{path}"
            if key in result:
                continue
            try:
                if local_root:
                    data = fetch_file_local(local_root, repo_name, path)
                else:
                    data = fetch_file_github(REPOS[repo_name], path)
                result[key] = (section_id, repo_name, path, data)
                print(f"  {key}")
            except (FileNotFoundError, URLError, OSError) as e:
                print(f"  {key} — MISSING ({e})")
    return result


CONTENT_DIR = SITE_DIR / "content"


def write_book_sources(sources):
    if BOOK_DIR.exists():
        shutil.rmtree(BOOK_DIR)

    for key, (section_id, repo_name, path, data) in sources.items():
        dest = BOOK_DIR / section_id / Path(path).name
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data)

    # Copy local content files
    for section_id, section in SECTIONS.items():
        for filename in section.get("local", []):
            src = CONTENT_DIR / filename
            dest = BOOK_DIR / section_id / filename
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dest)
            print(f"  {section_id}/{filename} (local)")


def generate_schrodinger_intro():
    """Generate the K < 1 bridging page pointing to Derivation 12 Part II."""
    text = """\
# K < 1: Schrödinger

At subcritical coupling ($K < 1$), the order parameter $r$ is small and a
finite fraction of oscillators remain **unlocked** — they sit in the gaps
of the devil's staircase with no definite winding number. These are the
quantum states.

The linearized Kuramoto equation in this regime, with nearest-neighbor
diffusive coupling on a spatial lattice, reduces to the **Schrödinger
equation** via the Madelung transform:

$$i\\hbar\\partial_t\\Psi = -\\frac{\\hbar^2}{2m}\\nabla^2\\Psi + V\\Psi$$

where:

| Kuramoto quantity | QM quantity |
|---|---|
| Unlocked oscillator density $\\rho(x,t)$ | $|\\Psi|^2$ |
| Accumulated phase perturbation $S(x,t)$ | Action / phase |
| Tongue-structure effective potential | $V(x)$ |
| Stern-Brocot RG diffusion $D_{\\text{eff}}$ | Quantum potential $\\frac{\\hbar^2}{2m}\\frac{\\nabla^2\\sqrt{\\rho}}{\\sqrt{\\rho}}$ |

The quantum potential — the term that distinguishes quantum from classical
mechanics — arises from the **Stern-Brocot renormalization group flow**:
per-level variance $\\sigma^2(d) \\sim \\phi^{-4d}$ sums to a convergent
constant $D_{\\text{eff}} = D_0 / (1 - \\phi^{-4})$.

The full derivation is in [Derivation 12: The Two Continuum Limits](../03_einstein/12_continuum_limits.md),
Part II (§156 ff.).

## Three regimes, one equation

| Coupling | Regime | Physics |
|---|---|---|
| $K = 1$ | Critical — all oscillators locked | **General relativity** (Lovelock uniqueness) |
| $0 < K < 1$ | Subcritical — partial locking | **Quantum mechanics** (Madelung / Nelson) |
| $K \\to 0$ | No coupling | Free particles — no structure |

The transition between regimes is controlled by the **same** self-consistency
equation on the Stern-Brocot tree (Derivation 11). There is no
quantization postulate.
"""
    dest = BOOK_DIR / "04_schrodinger" / "04_schrodinger_intro.md"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(text)
    print("  04_schrodinger/04_schrodinger_intro.md")


def generate_schrodinger_intro():
    """Generate the K < 1 bridging page pointing to Derivation 12 Part II."""
    text = """\
# K < 1: Schrödinger

At subcritical coupling ($K < 1$), the order parameter $r$ is small and a
finite fraction of oscillators remain **unlocked** — they sit in the gaps
of the devil's staircase with no definite winding number. These are the
quantum states.

The linearized Kuramoto equation in this regime, with nearest-neighbor
diffusive coupling on a spatial lattice, reduces to the **Schrödinger
equation** via the Madelung transform:

$$i\\hbar\\partial_t\\Psi = -\\frac{\\hbar^2}{2m}\\nabla^2\\Psi + V\\Psi$$

where:

| Kuramoto quantity | QM quantity |
|---|---|
| Unlocked oscillator density $\\rho(x,t)$ | $|\\Psi|^2$ |
| Accumulated phase perturbation $S(x,t)$ | Action / phase |
| Tongue-structure effective potential | $V(x)$ |
| Stern-Brocot RG diffusion $D_{\\text{eff}}$ | Quantum potential $\\frac{\\hbar^2}{2m}\\frac{\\nabla^2\\sqrt{\\rho}}{\\sqrt{\\rho}}$ |

The quantum potential — the term that distinguishes quantum from classical
mechanics — arises from the **Stern-Brocot renormalization group flow**:
per-level variance $\\sigma^2(d) \\sim \\phi^{-4d}$ sums to a convergent
constant $D_{\\text{eff}} = D_0 / (1 - \\phi^{-4})$.

The full derivation is in [Derivation 12: The Two Continuum Limits](../03_einstein/12_continuum_limits.md),
Part II (§156 ff.).

## Three regimes, one equation

| Coupling | Regime | Physics |
|---|---|---|
| $K = 1$ | Critical — all oscillators locked | **General relativity** (Lovelock uniqueness) |
| $0 < K < 1$ | Subcritical — partial locking | **Quantum mechanics** (Madelung / Nelson) |
| $K \\to 0$ | No coupling | Free particles — no structure |

The transition between regimes is controlled by the **same** self-consistency
equation on the Stern-Brocot tree (Derivation 11). There is no
quantization postulate.
"""
    dest = BOOK_DIR / "04_schrodinger" / "04_schrodinger_intro.md"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(text)
    print("  04_schrodinger/04_schrodinger_intro.md")


def generate_toc():
    lines = [
        "format: jb-book",
        "root: intro",
        "parts:",
    ]
    for section_id in sorted(SECTIONS.keys()):
        section = SECTIONS[section_id]
        lines.append(f'  - caption: "{section["title"]}"')
        lines.append("    chapters:")
        for gen_name in section.get("generated", []):
            name = Path(gen_name).stem
            lines.append(f"      - file: {section_id}/{name}")
        for repo_name, path in section.get("files", []):
            name = Path(path).stem
            lines.append(f"      - file: {section_id}/{name}")
        for local_name in section.get("local", []):
            name = Path(local_name).stem
            lines.append(f"      - file: {section_id}/{name}")

    toc_path = BOOK_DIR / "_toc.yml"
    toc_path.write_text("\n".join(lines) + "\n")
    print(f"  _toc.yml")


def generate_config():
    config = """\
title: "Submediant"
author: "N. Joven"
copyright: "2026"
logo: ""

execute:
  execute_notebooks: cache
  timeout: 300
  allow_errors: false

repository:
  url: https://github.com/nickjoven/submediant-site

html:
  use_issues_button: false
  use_repository_button: true
  use_edit_page_button: false
  favicon: ""
  extra_css:
    - _static/custom.css

sphinx:
  config:
    mathjax3_config:
      tex:
        macros:
          "RR": "\\\\mathbb{R}"
          "NN": "\\\\mathbb{N}"
    html_theme_options:
      navigation_with_keys: false
"""
    (BOOK_DIR / "_config.yml").write_text(config)

    static_dir = BOOK_DIR / "_static"
    static_dir.mkdir(exist_ok=True)
    (static_dir / "custom.css").write_text("""\
:root {
  --pst-color-primary: #58a6ff;
  --pst-color-secondary: #7ee787;
}
""")
    print("  _config.yml")


def generate_intro():
    intro = """\
# Submediant

N. Joven — 2026 — [ORCID 0009-0008-0679-0812](https://orcid.org/0009-0008-0679-0812) — CC0 1.0

---

You know this pattern.

Take two numbers. Add them. Use the last two to make the next.
1, 1, 2, 3, 5, 8, 13, 21 ...

The ratio between consecutive terms settles to $\\phi = (1 + \\sqrt{5})/2$.
This is the golden ratio — the number that appears in sunflower spirals,
nautilus shells, and the branching of trees.

It also appears in the cosmic microwave background.

The polynomial behind the Fibonacci sequence, $x^2 - x - 1 = 0$,
has two roots. Three properties of these roots correspond to three
physical measurements:

| What the roots do | What we observe | Residual |
|---|---|---|
| Their product is $\\pm 1$ | Born rule: $P = |\\psi|^2$ | exact |
| $\\phi^2 = \\phi + 1$ (self-similarity) | CMB spectral tilt $n_s \\approx 0.965$ | 0.2% |
| $\\phi - \\psi = \\sqrt{5}$ (gap width) | Inflation lasted $\\sim 61$ e-folds | CMB-S4, ~2028 |

The same polynomial also determines that space has **three dimensions**
(because fractions have two parts: $\\dim \\mathrm{SL}(2) = 2^2 - 1 = 3$)
and that the MOND acceleration scale is $a_0 = 1.25 \\times 10^{-10}$ m/s$^2$
(observed: $1.2 \\times 10^{-10}$, residual: 4%).

The frequency distribution $g(\\omega)$ — the one remaining free input —
determines itself: the distribution that produces dynamics reproducing
that distribution is unique. Zero free parameters. Zero free functions.

This site walks through the derivation chain, starting from the polynomial
and arriving at known physics:

**Counting** $\\to$ **fractions** $\\to$ **the golden ratio** $\\to$
**mode-locking** $\\to$ **the devil's staircase** $\\to$ **a self-consistency
equation** $\\to$ **general relativity and quantum mechanics**

Each step is a composition of the previous ones. The
[derivation chain](https://github.com/nickjoven/harmonics) is 14 steps.
The [engine](https://github.com/nickjoven/rfe) solves the equation
numerically and produces all predictions from a single run.

## Where to start

- **Curious about the math?** Start with [The Alphabet](01_alphabet/10_minimum_alphabet.html) —
  four primitives that generate all the structure
- **Curious about the physics?** Start with [Predictions](05_predictions/01_born_rule.html) —
  what the framework says and how it compares to measurement
- **Want the punchline?** [K = 1: Einstein](03_einstein/13_einstein_from_kuramoto.html) —
  how one equation produces general relativity, uniquely
- **Want to run it?** [rfe](https://github.com/nickjoven/rfe) —
  `python -m rfe --observables`

## Source

- [harmonics](https://github.com/nickjoven/harmonics) — the derivation chain (Derivations 1–14)
- [rfe](https://github.com/nickjoven/rfe) — the engine (one equation, all observables)
- [proslambenomenos](https://github.com/nickjoven/proslambenomenos) — one frequency, zero free parameters
- [201](https://github.com/nickjoven/201) — gravity as synchronization in a frictional medium
- [intersections](https://github.com/nickjoven/intersections) — stick-slip dynamics and dark matter
"""
    (BOOK_DIR / "intro.md").write_text(intro)
    print("  intro.md")


def build_book():
    # jupyter-book <2 exposes CLI via jupyter_book.cli.main
    # jupyter-book >=2 uses myst and has a different CLI
    # We require <2 (see requirements.txt); use the entry point directly.
    cmd = [shutil.which("jupyter-book") or "jupyter-book", "build", str(BOOK_DIR)]
    print(f"  Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=False)
    return result.returncode == 0


def main():
    parser = argparse.ArgumentParser(description="Build the submediant site")
    parser.add_argument("--local", type=str, default=None,
                        help="Path to parent directory containing sibling repos")
    parser.add_argument("--fetch-only", action="store_true",
                        help="Fetch sources and generate book structure, skip build")
    args = parser.parse_args()

    local_root = Path(args.local).resolve() if args.local else None

    print("Fetching sources...")
    sources = fetch_sources(local_root)

    print("\nWriting book sources...")
    write_book_sources(sources)

    print("\nGenerating Jupyter Book config...")
    generate_config()
    generate_schrodinger_intro()
    generate_toc()
    generate_intro()

    manifest = {k: hashlib.sha256(v[3]).hexdigest()[:16]
                for k, v in sources.items()}
    (BOOK_DIR / "manifest.json").write_text(json.dumps(manifest, indent=2))

    if args.fetch_only:
        print(f"\nFetch complete. Book sources at {BOOK_DIR}")
        return 0

    print("\nBuilding Jupyter Book...")
    if not build_book():
        return 1

    print(f"\nBuild complete: {BOOK_DIR / '_build' / 'html'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
