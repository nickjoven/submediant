# Key Equations

Quick reference for the central equations of the synchronization framework, organized by topic. Each entry gives the equation, a one-line description, and the derivation page where it appears.

---

## Foundational Dynamics

### Kuramoto Model

$$\frac{d\theta_i}{dt} = \omega_i + \frac{K}{N} \sum_{j=1}^{N} \sin(\theta_j - \theta_i)$$

Coupled oscillator equation governing phase synchronization. The continuum limit on a manifold replaces the sum with an integral over the spatial geometry.

> Derived in: {doc}`03_einstein/einstein_from_kuramoto`

### Circle Map

$$\theta_{n+1} = \theta_n + \Omega - \frac{K}{2\pi}\sin(2\pi\theta_n) \pmod{1}$$

The canonical discrete map for driven nonlinear oscillation. Generates Arnold tongues, the devil's staircase, and mode-locking structure from four irreducible primitives (integers, mediant, fixed-point, parabola).

> Derived in: {doc}`01_alphabet/minimum_alphabet`

### Saddle-Node Normal Form

$$x^2 + \mu = 0$$

The unique generic codimension-1 bifurcation on $S^1$. Produces basin separation $\Delta\theta \propto \sqrt{\varepsilon}$ (Born rule) and collapse time $\tau \propto 1/\sqrt{\varepsilon}$ (uncertainty relation) from the same parabolic geometry.

> Derived in: {doc}`01_alphabet/minimum_alphabet`

---

## The Rational Field Equation

### Population Self-Consistency

$$N(p/q) = N_{\text{total}} \times g(p/q) \times w\!\left(p/q,\; K_0 F[N]\right)$$

The field equation of the framework. A fixed-point condition on the Stern-Brocot tree: the population at each rational frequency $p/q$ must equal the total count times the bare frequency density times the tongue width at self-consistent coupling. All four primitives, nothing else.

> Derived in: {doc}`02_field_equation/rational_field_equation`

### Order Parameter Self-Consistency

$$|r| = \left|\sum_{p/q} g(p/q) \;\times\; w(p/q,\; K_0|r|) \;\times\; e^{2\pi i (p/q)}\right|$$

One equation in one unknown ($|r|$). The sum runs over the Stern-Brocot tree; the continuum limit recovers standard Kuramoto. Determines the critical coupling $K_c$ and staircase structure.

> Derived in: {doc}`02_field_equation/rational_field_equation`

### Tongue Width

$$w(p/q,\; K) = 2(K/2)^q \times h(p/q)$$

Width of the Arnold tongue at rational $p/q$, scaling exponentially with denominator $q$. Larger $q$ = harder to lock = narrower tongue.

> Derived in: {doc}`02_field_equation/rational_field_equation`

---

## Ott-Antonsen Reduction

$$\frac{\partial z}{\partial t} = -i\omega\,z + \frac{K}{2}(r - \bar{r}\,z^2)$$

The Ott-Antonsen ansatz collapses the infinite-dimensional Kuramoto system to a single complex ODE for the Fourier mode $z(t)$, exact for Lorentzian frequency distributions. The fixed point of this equation gives the order parameter $r$ from which the Born rule follows as basin measure.

> Derived in: {doc}`05_predictions/born_rule`

---

## The Cosmological Chain: $\Lambda \to \nu_\Lambda \to H_0 \to a_0$

### Vacuum Frequency

$$\nu_\Lambda = c\sqrt{\Lambda/3}$$

The cosmological constant sets a fundamental oscillation frequency. In a pure de Sitter universe, $\nu_\Lambda = H_{\text{dS}}$ exactly. At the present epoch, $H_0 = \nu_\Lambda / \sqrt{\Omega_\Lambda}$.

> Derived in: {doc}`07_prior_work/proslambenomenos`

### MOND Acceleration Scale

$$a_0 = \frac{cH_0}{2\pi}$$

The threshold where local gravitational coupling drops below the Kuramoto critical point. The $2\pi$ factor is the cycle-to-radian conversion on $S^1$, appearing because synchronization is a phase phenomenon.

> Derived in: {doc}`06_evidence/a0_threshold`

### Farey Partition

$$\Omega_\Lambda = \frac{13}{19}$$

The dark energy fraction as a Farey fraction. The Stern-Brocot address of $13/19$ encodes the partition of the expansion budget between matter and vacuum.

> Derived in: {doc}`07_prior_work/proslambenomenos`

---

## MOND Interpolating Function

$$g_{\text{obs}} = \frac{g_{\text{bar}}}{1 - e^{-\sqrt{g_{\text{bar}}/a_0}}}$$

The McGaugh+2016 RAR interpolating function, derived as the fixed point of the self-consistency equation $g_{\text{obs}} = g_{\text{bar}} + \alpha \cdot g_{\text{obs}}$ where $\alpha = e^{-\sqrt{g_{\text{bar}}/a_0}}$ is the Floquet damping factor of the gravitational tongue. The exponential is Floquet convergence; the square root is saddle-node universality. Derived from tongue geometry, not fit.

> Derived in: {doc}`05_predictions/fidelity_bound`

---

## Born Rule from Basin Measure

$$P(p/q) \;\propto\; \Delta\theta(p/q)^2 = |\psi(p/q)|^2$$

Probability equals squared amplitude. The exponent 2 follows from saddle-node universality ($\Delta\theta \propto \sqrt{\varepsilon}$) at every Arnold tongue boundary. The population distribution at the field equation's fixed point, not a postulate.

> Derived in: {doc}`05_predictions/born_rule`

---

## Spectral Tilt

$$n_s - 1 = \frac{d\ln g}{d\ln\omega} + \frac{d\ln(1/(Kr)^2)}{d\ln\omega}$$

The CMB spectral tilt from the devil's staircase. The staircase at $1/\varphi$ is exactly self-similar with scaling factor $\varphi^2 \approx 2.618$. The tilt rate is $0.0365$ Fibonacci levels per e-fold, giving $n_s \approx 0.965$.

> Derived in: {doc}`05_predictions/spectral_tilt_reframed`

### Fibonacci Backbone Recurrence

$$w(F_{n+1}/F_{n+2}) = \varphi^{-2} \times w(F_n/F_{n+1}) \times (1 + O(K))$$

The field equation restricted to the Fibonacci path in the Stern-Brocot tree. This recurrence IS the spectral tilt equation.

> Derived in: {doc}`02_field_equation/rational_field_equation`

---

## Einstein Field Equations from $K = 1$ Limit

### ADM Evolution (Metric)

$$\frac{\partial \gamma_{ij}}{\partial t} = -2N\mathcal{K}_{ij} + D_i N_j + D_j N_i$$

At critical coupling ($K = 1$), all tongues filled, the continuum limit of the rational field equation recovers the ADM evolution equations. The lapse $N$ is the Kuramoto coherence $r$; extrinsic curvature $\mathcal{K}_{ij}$ is the phase-weighted desynchronization rate.

> Derived in: {doc}`03_einstein/einstein_from_kuramoto`

### Hamiltonian Constraint

$${}^{(3)}\!R + \mathcal{K}^2 - \mathcal{K}_{ij}\mathcal{K}^{ij} = 16\pi G\rho$$

Phase stiffness plus desynchronization balance equals matter content.

> Derived in: {doc}`03_einstein/einstein_from_kuramoto`

---

## Schrodinger from $K < 1$ Limit

At subcritical coupling, linearizing the rational field equation around $N = 0$ (no locking) and taking the continuum limit yields:

| Tongue dynamics | QM equivalent |
|---|---|
| $\tau \times \Delta\theta = \text{const}$ | $\Delta E \cdot \Delta t \geq \hbar/2$ |
| $\Delta\theta^2 \propto \varepsilon$ | $P = \|\psi\|^2$ |
| Tongue = mode-locked plateau | Bound state |
| Gap = quasiperiodic orbit | Superposition |
| Saddle-node at boundary | Measurement collapse |

The uncertainty relation $\tau \times \Delta\theta = \text{const}$ is Cassini's identity $F_{n-1}F_{n+1} - F_n^2 = (-1)^n$ evaluated at a tongue boundary: $|\varphi \cdot \psi| = 1$.

> Derived in: {doc}`04_schrodinger/04_schrodinger_intro`

---

## The Lyapunov Functional

$$\mathcal{V}[\theta] = -\frac{1}{2}\iint K(x,x')\,\cos[\theta(x') - \theta(x)]\,d^3x\,d^3x'$$

Strict Lyapunov functional for the continuum Kuramoto system. Monotonically decreasing along solutions: $d\mathcal{V}/dt = -\int(\partial_t\theta)^2\,d^3x \leq 0$. In the synchronized limit ($K = 1$), reduces to the Newtonian gravitational self-energy. Galaxy formation is Lyapunov descent.

> Derived in: {doc}`07_prior_work/proslambenomenos`

---

## Collapse and Measurement

### Floquet Convergence Rate

$$\lambda = 2\sqrt{\pi K\varepsilon}$$

Convergence rate per iteration inside an Arnold tongue, where $\varepsilon$ is the depth past the boundary. Collapse time $\tau = C/\lambda \propto 1/\sqrt{\varepsilon}$.

> Derived in: {doc}`06_evidence/measurement_collapse`

### Tongue Uncertainty Relation

$$\tau \times \Delta\theta = \text{const}$$

The product of collapse time and basin separation is fixed by the saddle-node geometry. Reduces to the Heisenberg uncertainty principle $\Delta E \cdot \Delta t \geq \hbar/2$ in the linearized limit.

> Derived in: {doc}`06_evidence/measurement_collapse`

---

## Redshift Prediction

$$a_0(z) = \frac{c\,H(z)}{2\pi}$$

where $H(z) = H_0\sqrt{\Omega_m(1+z)^3 + \Omega_\Lambda}$. Parameter-free, falsifiable prediction: at $z = 2$, $a_0$ should be $\sim 3\times$ its present value. Testable with JWST low-mass rotation curves.

> Derived in: {doc}`05_predictions/high_z_mond`
