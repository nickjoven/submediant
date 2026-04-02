# [submediant](https://nickjoven.github.io/submediant-site/intro.html)
- https://nickjoven.github.io/submediant-site/intro.html

This site presents the derivation chain from `x² - x - 1 = 0` to
the Einstein field equations and the Schrödinger equation, starting
from the algebra and branching outward to the evidence.

## Reading order

1. **The alphabet** — four irreducible primitives generate all structure
2. **The field equation** — self-consistency on the Stern-Brocot tree
3. **K = 1: Einstein** — the unique continuum limit (Lovelock)
4. **K < 1: Schrödinger** — the linearized limit (Madelung + Nelson)
5. **Predictions** — three from one polynomial, one testable by CMB-S4
6. **Evidence** — Stribeck lattice, high-z galaxies, σ² running
7. **Prior work** — the repositories that led here

## Source

All derivations and computational scripts live in
[harmonics](https://github.com/nickjoven/harmonics). This site
aggregates and presents them in reverse order — polynomial first,
evidence last.

## Build

```sh
python build.py --local ../       # from local sibling repos
python build.py                   # fetch from GitHub
```

Requires: jupyter-book, Python 3.10+

## License

[CC0 1.0 Universal](LICENSE) — No rights reserved.
