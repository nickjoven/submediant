# Submediant

[N. Joven](https://github.com/nickjoven) — 2026 — [ORCID 0009-0008-0679-0812](https://orcid.org/0009-0008-0679-0812) — CC0 1.0

---

You know this pattern.

Take two numbers. Add them. Use the last two to make the next.
1, 1, 2, 3, 5, 8, 13, 21 ...

The ratio between consecutive terms settles to $\phi = (1 + \sqrt{5})/2$.
This is the golden ratio — the number that appears in sunflower spirals,
nautilus shells, and the branching of trees.

It also appears in the cosmic microwave background.

The polynomial behind the Fibonacci sequence, $x^2 - x - 1 = 0$,
has two roots. Three properties of these roots correspond to three
physical measurements:

| What the roots do | What we observe | Residual |
|---|---|---|
| Their product is $\pm 1$ | Born rule: $P = |\psi|^2$ | exact |
| $\phi^2 = \phi + 1$ (self-similarity) | CMB spectral tilt $n_s \approx 0.965$ | 0.2% |
| $\phi - \psi = \sqrt{5}$ (gap width) | Inflation lasted $\sim 61$ e-folds | CMB-S4, ~2028 |

The same polynomial also determines that space has **three dimensions**
(because fractions have two parts: $\dim \mathrm{SL}(2) = 2^2 - 1 = 3$)
and that the MOND acceleration scale is $a_0 = 1.25 \times 10^{-10}$ m/s$^2$
(observed: $1.2 \times 10^{-10}$, residual: 4%).

The frequency distribution $g(\omega)$ — the one remaining free input —
determines itself: the distribution that produces dynamics reproducing
that distribution is unique. Zero free parameters. Zero free functions.

This site walks through the derivation chain, starting from the polynomial
and arriving at known physics:

**Counting** $\to$ **fractions** $\to$ **the golden ratio** $\to$
**mode-locking** $\to$ **the devil's staircase** $\to$ **a self-consistency
equation** $\to$ **general relativity and quantum mechanics**

Each step is a composition of the previous ones. The
[derivation chain](https://github.com/nickjoven/harmonics) is 14 steps.
The [engine](https://github.com/nickjoven/rfe) solves the equation
numerically and produces all predictions from a single run.

## Where to start

- **Curious about the math?** Start with [First Principles](reference/first-principles.html) —
  four primitives that generate all the structure
- **Curious about the physics?** Start with [Constants](reference/constants.html) —
  what the framework says and how it compares to measurement
- **Want the punchline?** [K = 1: Einstein](reference/first-principles.html) —
  how one equation produces general relativity, uniquely
- **Want to run it?** [rfe](https://github.com/nickjoven/rfe) —
  `python -m rfe --observables`

## Source

- [harmonics](https://github.com/nickjoven/harmonics) — the derivation chain (Derivations 1–14)
- [rfe](https://github.com/nickjoven/rfe) — the engine (one equation, all observables)
- [proslambenomenos](https://github.com/nickjoven/proslambenomenos) — one frequency, zero free parameters
- [201](https://github.com/nickjoven/201) — gravity as synchronization in a frictional medium
- [intersections](https://github.com/nickjoven/intersections) — stick-slip dynamics and dark matter
