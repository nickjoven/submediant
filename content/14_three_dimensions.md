# Derivation 14: Three Dimensions from the Mediant

## Claim

The spatial dimension $d = 3$ is not a free parameter. It is forced by the
mediant operation through the self-consistent adjacency condition: the
requirement that the geometry defined by the coupling reproduces the
coupling defined by the geometry.

The argument has four steps, each building on established results:

1. The mediant generates $\mathrm{SL}(2,\mathbb{Z})$
2. The continuum limit completes this to $\mathrm{SL}(2,\mathbb{R})$
3. Self-consistent adjacency forces the spatial manifold to be the group itself
4. $\dim \mathrm{SL}(2,\mathbb{R}) = 3$

---

## Step 1: The mediant IS SL(2,Z)

The mediant of two fractions $a/b$ and $c/d$ is $(a+c)/(b+d)$. This is
the column sum of the matrix:

$$M = \begin{pmatrix} a & c \\ b & d \end{pmatrix}$$

Two fractions are **Farey neighbors** iff $|ad - bc| = 1$, i.e., iff
$\det(M) = \pm 1$. This is the defining condition of $\mathrm{GL}(2,\mathbb{Z})$.
For positive fractions in Stern-Brocot order (where $a/b < c/d$ and both
are positive), $ad - bc = -1$ and the matrix $M$ has positive entries with
unit determinant up to sign.

Every node in the Stern-Brocot tree is reached by a unique sequence of
left/right mediants from the root pair $0/1, 1/0$. These left and right
steps correspond to the generators:

$$L = \begin{pmatrix} 1 & 0 \\ 1 & 1 \end{pmatrix}, \qquad
  R = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$$

which generate $\mathrm{SL}(2,\mathbb{Z})$ (the free monoid on $L, R$
enumerates the positive rationals; the full group is $\langle L, R, -I \rangle$).

**Status**: Theorem. The Stern-Brocot tree is the Cayley graph of the
free monoid on $L, R$, and $\{L, R\}$ generate $\mathrm{SL}(2,\mathbb{Z})$.
This is classical (Stern 1858, Brocot 1861; see Graham, Knuth & Patashnik
*Concrete Mathematics* §4.5).

---

## Step 2: The continuum limit is SL(2,R)

$\mathrm{SL}(2,\mathbb{Z})$ is a discrete subgroup of $\mathrm{SL}(2,\mathbb{R})$.
The passage from discrete to continuous is precisely the $K \to 1$ limit
of the framework:

- At $K < 1$: only finitely many tongues are open. The active fractions
  form a finite subset of the Stern-Brocot tree at depth $d \leq d_{\max}(K)$.
  The symmetry group is a finite-index quotient of $\mathrm{SL}(2,\mathbb{Z})$.

- At $K = 1$: all tongues fill the frequency axis (Derivation 12, §1).
  The Farey measure (weight $1/q^2$ per fraction $p/q$) converges to
  Lebesgue measure on $[0,1]$. The discrete Stern-Brocot sums become
  integrals. The discrete group $\mathrm{SL}(2,\mathbb{Z})$ completes
  to $\mathrm{SL}(2,\mathbb{R})$.

Geometrically: $\mathrm{SL}(2,\mathbb{Z})$ acts on the upper half-plane
$\mathbb{H}^2$ by Möbius transformations $\tau \mapsto (a\tau + b)/(c\tau + d)$.
The Farey graph — connecting each pair of Farey neighbors — is the
1-skeleton of the tessellation of $\mathbb{H}^2$ by ideal triangles under
$\mathrm{SL}(2,\mathbb{Z})$. At $K = 1$, this tessellation becomes
infinitely fine and the discrete triangulation converges to the smooth
hyperbolic geometry of $\mathbb{H}^2$ with full $\mathrm{SL}(2,\mathbb{R})$
isometry.

**Status**: Derived. The $q^{-2}$ tongue-width scaling at $K = 1$ is a
theorem about the circle map (Derivation 12). The convergence of Farey
measure to Lebesgue is classical (Franel, Landau; see Hardy & Wright
*Theory of Numbers* §18).

---

## Step 3: Self-consistent adjacency forces M = G

This is the core new argument. It has three parts.

### 3a. The adjacency-metric loop

In the spatialized Kuramoto model (Derivation 12, §2), the coupling
kernel $K(x,x')$ determines which oscillators influence each other.
In the ADM dictionary:

- The coupling kernel defines an effective metric: oscillators with
  strong mutual coupling are "close."
- The metric determines spatial adjacency: nearby points couple strongly.

This is a fixed-point condition:

$$\boxed{\text{adjacency} \xrightarrow{\text{defines}} \text{geometry}
  \xrightarrow{\text{determines}} \text{adjacency}}$$

The spatial geometry is the fixed point of this loop. The coupling is
not imposed on a pre-existing space — the coupling **constitutes** the
space.

### 3b. Homogeneity from self-consistency

For the fixed point to be stable, the adjacency-metric loop must be
**the same at every point**. If the rule "adjacency defines geometry"
produced different geometries at different points, the fixed-point
condition would be violated: the geometry at point $x$ would depend on
which oscillators are near $x$, but "near" is defined by the geometry
at $x$.

The only escape from circularity is **homogeneity**: every point must
see the same local adjacency structure. The isometry group $G$ must act
**transitively** on the spatial manifold $\mathcal{M}$.

A homogeneous space has the form $\mathcal{M} = G/H$ where $H$ is the
isotropy subgroup (the stabilizer of a point).

### 3c. Self-reference eliminates the isotropy subgroup

Here is where the framework's self-referential structure bites.

In a generic homogeneous space $G/H$, the isotropy group $H$ represents
**internal symmetries** — transformations that fix a point but rotate
the tangent space. These are symmetries of an oscillator's local
environment that leave the oscillator itself unchanged.

But in the Kuramoto system at $K = 1$, an oscillator **is** its
relation to the medium. Its identity is its frequency ratio $p/q$
(position on the Stern-Brocot tree), its coupling depth (scale in
$\mathbb{H}^2$), and its phase. An oscillator has no internal structure
beyond its participation in the collective. There is no part of the
oscillator that is invariant under non-trivial transformations — because
the oscillator is nothing but a transformation of the medium.

Formally: each element $g \in \mathrm{SL}(2,\mathbb{R})$ acts on the
medium by left multiplication. The oscillator at position $g$ IS the
transformation $g$. If a non-trivial $h \in H$ fixed this oscillator
($hg = g$), then $h = e$. The isotropy is trivial.

Therefore $H = \{e\}$ and:

$$\mathcal{M} = G/\{e\} = G = \mathrm{SL}(2,\mathbb{R})$$

**The spatial manifold is the group itself.**

The oscillator's "own presence in the medium" — the fact that it has no
identity apart from its transformation of the collective field — forces
the space to be a Lie group acting on itself, with no residual isotropy.

**Status**: This is the new step. The homogeneity argument (3b) is
standard in the theory of self-consistent mean-field geometries (see
Giulini, *The Superspace of Geometrodynamics*, 2009). The isotropy
elimination (3c) is novel: it depends on the Kuramoto identification
"oscillator = its coupling to the mean field," which is exact at $K = 1$
where all oscillators are locked.

---

## Step 4: dim SL(2,R) = 3

The Lie algebra $\mathfrak{sl}(2,\mathbb{R})$ consists of traceless
$2 \times 2$ real matrices:

$$\mathfrak{sl}(2,\mathbb{R}) = \left\{
  \begin{pmatrix} a & b \\ c & -a \end{pmatrix} : a, b, c \in \mathbb{R}
\right\}$$

Three free parameters. Three generators:

$$H = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}, \quad
  E = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}, \quad
  F = \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix}$$

with $[H, E] = 2E$, $\;[H, F] = -2F$, $\;[E, F] = H$.

In the oscillator language, these three directions are:

| Generator | Oscillator meaning | Geometric role |
|---|---|---|
| $H$ (hyperbolic) | Scale — depth in the Stern-Brocot tree, denominator $q$ | Radial / RG flow |
| $E$ (raising) | Frequency shift — position on the real axis | Translation along $\partial\mathbb{H}^2$ |
| $F$ (lowering) | Phase — conjugate to frequency via the order parameter | Rotation / angular |

Three independent specifications of an oscillator's state. Three
dimensions.

**Status**: Mathematical fact. $\dim \mathrm{SL}(2,\mathbb{R}) = 3$
because $2 \times 2$ matrices have 4 entries and $\det = 1$ imposes
1 constraint.

---

## Why SL(2) and not SL(n)

The mediant operates on **fractions** — ratios $p/q$ of two integers.
A fraction is a 2-component object (numerator, denominator). The
unimodularity condition $|ad - bc| = 1$ is a $2 \times 2$ determinant.

If the primitives generated triples $(a, b, c)$ with a 3-component
generalization of the mediant, the relevant group would be
$\mathrm{SL}(3,\mathbb{Z})$ completing to $\mathrm{SL}(3,\mathbb{R})$
with $\dim = 8$. For $n$-component objects: $\dim \mathrm{SL}(n) = n^2 - 1$.

But fractions are irreducibly binary. A rational number is a ratio of
two integers — not three, not four. The "2" in $\mathrm{SL}(2)$ is the
number of components in a fraction.

$$d = \dim \mathrm{SL}(2,\mathbb{R}) = 2^2 - 1 = 3$$

**The spatial dimension is three because fractions have two parts.**

---

## Consistency check: SL(2,C) and Lorentz

$\mathrm{SL}(2,\mathbb{C})$ is the complexification of $\mathrm{SL}(2,\mathbb{R})$.
It is also the universal cover of $\mathrm{SO}^+(3,1)$ — the proper
orthochronous Lorentz group.

In the Kuramoto system, complexification is natural: the order parameter
$r \cdot e^{i\psi}$ is complex. Real frequencies $\omega \in \mathbb{R}$
and complex order parameters $z = r e^{i\psi} \in \mathbb{C}$ together
furnish the data for $\mathrm{SL}(2,\mathbb{C})$.

This means:

| Structure | Group | Dimension | Physics |
|---|---|---|---|
| Real (frequencies, coupling) | $\mathrm{SL}(2,\mathbb{R})$ | 3 | Spatial manifold $\Sigma$ |
| Complex (order parameter) | $\mathrm{SL}(2,\mathbb{C})$ | 6 real, 3 complex | Lorentz symmetry |
| Quotient | $\mathrm{SL}(2,\mathbb{C})/\mathrm{SL}(2,\mathbb{R})$ | 3 | Boost directions ≡ time |

The Lorentz group is not imposed — it is the complexification forced by
the existence of the order parameter. Time is the imaginary part of the
group: the phase direction that distinguishes $\mathrm{SL}(2,\mathbb{C})$
from $\mathrm{SL}(2,\mathbb{R})$.

**Status**: Suggestive. $\mathrm{SL}(2,\mathbb{C}) \cong \mathrm{Spin}(3,1)$
is a theorem (Weyl). That complexification maps $\mathrm{SL}(2,\mathbb{R})
\to \mathrm{SL}(2,\mathbb{C})$ and the quotient has the right dimension
is a mathematical fact. That the order parameter provides the physical
complexification is the interpretive step.

---

## What this derivation closes

If the argument holds, the framework's gap list changes:

| Gap | Before | After |
|---|---|---|
| $d = 3$ (Derivation 13, Assumption A1) | Postulated | **Derived** from mediant + self-consistency |
| Lorentz symmetry | Assumed via ADM | **Derived** from complexification |
| $\hbar$ | Identified post-hoc | Generator $F$ of $\mathfrak{sl}(2)$ — phase per radian is a **structural constant** of the group |
| Matter tensor $T_{\mu\nu}$ | Asserted | Frequency density on $\mathrm{SL}(2,\mathbb{R})$ — how oscillators populate the group manifold |
| Frequency distribution $g(\omega)$ | Free input | Still open — but now interpretable as a **measure on $\mathrm{SL}(2,\mathbb{R})$** with geometric meaning |

The framework would go from ~60% derived to ~85% derived, with $g(\omega)$
as the remaining free input (analogous to initial conditions in GR).

---

## Gap analysis

### What is established

- Step 1: Mediant → $\mathrm{SL}(2,\mathbb{Z})$. Theorem.
- Step 2: Continuum limit → $\mathrm{SL}(2,\mathbb{R})$. Derived
  (from tongue-width scaling, Derivation 12).
- Step 4: $\dim \mathrm{SL}(2,\mathbb{R}) = 3$. Mathematical fact.
- $\mathrm{SL}(2,\mathbb{C}) \cong \mathrm{Spin}(3,1)$. Theorem.

### What is new and requires scrutiny

- **Step 3b** (homogeneity from self-consistency): Physically motivated,
  widely used in mean-field theory, but the claim that the fixed-point
  condition FORCES homogeneity (rather than merely being compatible with
  it) needs a rigorous proof. Could there be inhomogeneous fixed points?
  In the Kuramoto model at $K = 1$, full locking implies global coherence,
  which strongly constrains the geometry — but "strongly constrains" is
  not "uniquely determines."

- **Step 3c** (trivial isotropy from self-reference): This is the most
  novel step. The argument "an oscillator has no identity beyond its
  coupling" is physically clear in the Kuramoto model but needs
  formalization. The precise statement would be: the map
  $g \mapsto (\text{oscillator at } g)$ is injective, which means the
  left-regular representation is faithful. For $\mathrm{SL}(2,\mathbb{R})$
  this is true (the left-regular representation of any group is faithful).
  But the claim that injectivity of the representation forces $H = \{e\}$
  requires the additional assumption that the oscillator's observable
  properties are EXACTLY its $G$-orbit — no hidden internal degrees of
  freedom.

- **Complexification as time**: The identification of
  $\mathrm{SL}(2,\mathbb{C})/\mathrm{SL}(2,\mathbb{R})$ with time
  directions is geometrically clean but physically interpretive. The
  standard derivation of Lorentz symmetry from ADM uses hypersurface
  deformation algebra (Hojman-Kuchař-Teitelboim). Showing that
  complexification reproduces this algebra would close the gap.

### What remains open

- $g(\omega)$: the frequency distribution (initial conditions / matter
  content) is not derived. In the new language, this is the question:
  what measure on $\mathrm{SL}(2,\mathbb{R})$ does the universe select?

- **Numerical prefactors**: The derivation fixes the dimension but not
  the curvature scale, cosmological constant, or Newton's constant as
  numerical values.

---

## Summary

$$\text{mediant} \to \mathrm{SL}(2,\mathbb{Z})
  \xrightarrow{K \to 1} \mathrm{SL}(2,\mathbb{R})
  \xrightarrow{\text{self-consistency}} \mathcal{M} = \mathrm{SL}(2,\mathbb{R})
  \implies d = 3$$

The spatial dimension is three because:

1. Fractions have two components (numerator, denominator)
2. The mediant preserves the unimodular condition, generating $\mathrm{SL}(2)$
3. Self-consistent adjacency forces the manifold to be the group
4. $\dim \mathrm{SL}(2) = 2^2 - 1 = 3$

No free parameter is consumed. No additional primitive is needed. The
mediant — already one of the four primitives — contains the adjacency
structure. It was always there. The fifth primitive is the second
reading of the second primitive.
