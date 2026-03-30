# Glossary

Terms defined in the context of the synchronization framework.

---

## Synchronization & Dynamics

**Kuramoto model**
: Mean-field model of $N$ coupled phase oscillators: $\dot{\theta}_i = \omega_i + (K/N)\sum_j \sin(\theta_j - \theta_i)$. The framework's starting point.

**Coupling strength** $K$
: How strongly oscillators pull each other toward phase alignment. Maps to the medium's impedance — the capacity of spacetime to transmit synchronization.

**Coherence** $r(x,t)$
: The Kuramoto order parameter. $r = 1$: perfect sync. $r = 0$: incoherence. In the gravitational reading, $r$ maps to the metric determinant.

**Ott-Antonsen reduction**
: Exact dimensional reduction of the Kuramoto system to a single complex variable $z(t)$ on the unit disk. Converts the $N$-body problem into a tractable ODE.

**Lyapunov functional**
: Energy-like quantity that decreases monotonically along trajectories, proving convergence to a unique stable ground state.

**Synchronization cost**
: The price of maintaining coherence at mode-locking ratio $p/q$. Scales with denominator $q$: simple ratios are cheap, complex ratios expensive.

---

## Number Theory & Structure

**Stern-Brocot tree**
: Binary tree of all positive rationals, built by iterated mediants from $0/1$ and $1/0$. The framework's fundamental discrete structure.

**Mediant**
: Given $a/b$ and $c/d$, the mediant is $(a+c)/(b+d)$. One of four irreducible primitives from which all structure is built.

**Farey sequence**
: Ordered set of reduced fractions with denominator $\leq N$. Adjacent fractions are Stern-Brocot neighbors; their mediants fill the next level.

**SL(2,$\mathbb{R}$)**
: Special linear group of $2 \times 2$ real matrices with determinant 1. The substrate Lie group from which the mediant inherits its structure. $\dim \text{SL}(2) = 3$ forces three spatial dimensions.

---

## Mode-Locking & Maps

**Arnold tongues**
: Wedge-shaped parameter regions where a driven oscillator locks to rational frequency ratio $p/q$. Encode mode-locking on the Stern-Brocot tree.

**Devil's staircase**
: Fractal step function from mode-locking. The winding number jumps between rational plateaus as the driving parameter sweeps continuously.

**Bifurcation**
: Qualitative change in behavior as a parameter crosses a threshold. The MOND boundary ($x = 1$) is a transcritical bifurcation.

**Transcritical bifurcation**
: At $x = 1$: the stable fixed point $r^* = \sqrt{1-1/x}$ collides with $r = 0$ and they exchange stability. The Newtonian-to-MOND transition.

---

## Spacetime & Gravity

**ADM formalism**
: Arnowitt-Deser-Misner decomposition of spacetime into spatial slices evolving in time. Provides lapse, shift, and extrinsic curvature.

**Lapse function** $N$
: Rate at which proper time advances relative to coordinate time. Reinterpreted as local coupling propagation speed.

**Shift vector** $N^i$
: Coordinate drift between successive time slices. Reinterpreted as the spatial drift of synchronization phase fronts.

**Extrinsic curvature** $K_{ij}$
: Rate of change of the spatial metric between time slices. Reinterpreted as phase-weighted desynchronization.

**Rational field equation**
: Self-consistency on the Stern-Brocot tree: $f(p/q) = F(f(a/b), f(c/d))$. The discrete precursor of Einstein's field equations.

**Continuum limit**
: Passage from discrete rationals to continuous fields. $K > K_c$ yields Einstein; $K < K_c$ yields Schrödinger.

---

## Cosmology & Observation

**Proslambenomenos**
: Greek: "the added tone." The cosmological constant $\Lambda$ as a reference frequency from which Hubble rate, MOND threshold, and Planck scale descend as overtones.

**a₀** (MOND acceleration scale)
: Threshold below which Newtonian gravity fails. Derived as $a_0 = cH_0/(2\pi)$: coupling drops below the synchronization critical point.

**MOND** (Modified Newtonian Dynamics)
: Milgrom (1983): galaxy dynamics below $a_0$ follow $g_{\text{obs}} = \sqrt{g_{\text{bar}} \cdot a_0}$. Derived here as the desynchronization regime.

**MDAR** (Mass Discrepancy-Acceleration Relation)
: Tight correlation between $g_{\text{bar}}$ and $g_{\text{obs}}$ in galaxies. Derived from the Ott-Antonsen reduction on a disk.

**Dark matter dual**
: The subharmonic displacement variable. Not a particle — the bookkeeping difference between baryonic prediction and observed dynamics.

**Spectral tilt** $n_s$
: Deviation from scale-invariance in the CMB ($n_s \approx 0.965$). Derived from mode-locking: cost gradient across the devil's staircase.

**Planck scale**
: Energy scale where quantum gravity matters. Derived as the self-sustaining threshold: minimum coupling for a single oscillator to maintain coherence.

---

## Quantum Mechanics

**Born rule**
: Probability $= |\psi|^2$. Derived as basin measure of the Ott-Antonsen fixed point: the fraction of initial conditions flowing to a given attractor scales as $|z|^2$.

**Fidelity bound**
: Self-referential constraint: $a_0 = cH/(2\pi)$ at every epoch. Unifies the MOND transition, Born rule normalization, and collapse threshold.

---

## Topology

**Klein bottle**
: Non-orientable surface arising from the circle map's orientation-reversing fixed point. Appears in spin-statistics and CPT symmetry.

---

## Physical Mechanism

**Stribeck curve**
: Friction vs. sliding velocity: drops from static peak, reaches minimum, rises again. Identified with the MOND interpolating function $\nu(x)$.

**Renzo's Rule**
: Every baryonic feature mirrors in the rotation curve (Sancisi 2004). Derived from Kuramoto self-consistency: coupling uniquely determines the coherence profile.
