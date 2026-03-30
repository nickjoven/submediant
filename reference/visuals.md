# Visual Assets

Gallery of all visual and interactive resources across the framework, organized by type.

---

## Interactive HTML Applications

| Application | Description |
|---|---|
| [Stern-Brocot Walk](https://github.com/nickjoven/harmonics/blob/main/sync_cost/applications/stern_brocot_walk.html) | Navigate the Stern-Brocot tree interactively. Explore mediant construction, Farey neighbors, and the rational hierarchy. |
| [Ontology Viewer](https://github.com/nickjoven/harmonics/blob/main/sync_cost/applications/ontology.html) | Framework concept map. Visual index of how derivations, primitives, and predictions connect. |
| [Mobius Views](https://github.com/nickjoven/harmonics/blob/main/sync_cost/applications/mobius_views.html) | Mobius strip visualizations. The non-orientable topology underlying the two-root structure. |
| [Mobius Projector](https://github.com/nickjoven/harmonics/blob/main/sync_cost/applications/mobius_projector.html) | Projection tool for Mobius strip geometry. |
| [Our Address](https://github.com/nickjoven/harmonics/blob/main/sync_cost/derivations/our_address.html) | Farey address locator. Find the Stern-Brocot coordinates of any rational. |
| [Intersections](https://nickjoven.github.io/intersections/) | Stick-slip dynamics with interactive Plotly and Canvas visualizations. Lagrangian relaxation, Stribeck curves, and bifurcation thresholds. |
| [Stribeck Optics](https://nickjoven.github.io/stribeck-optics/) | Optical friction visualization. Stribeck curve mapped to refractive phenomena. |
| [Derivation Graph](graph) | Interactive D3 force-directed graph of the framework's derivation chain and repository structure. |

---

## Animations

| File | Description |
|---|---|
| [stairs.gif](https://github.com/nickjoven/harmonics/blob/main/stairs.gif) | Devil's staircase construction. Tongues filling the frequency axis as coupling increases. |
| [triangles.gif](https://github.com/nickjoven/harmonics/blob/main/triangles.gif) | Stern-Brocot tree triangulation. Mediant insertion building the rational hierarchy. |
| [orbit.gif](https://github.com/nickjoven/harmonics/blob/main/orbit.gif) | Circle map orbit. Phase evolution showing mode-locking and quasiperiodicity. |
| [spiral.gif](https://github.com/nickjoven/harmonics/blob/main/spiral.gif) | Spiral convergence. Floquet decay inside an Arnold tongue. |
| [rose.gif](https://github.com/nickjoven/harmonics/blob/main/rose.gif) | Rose curve from rational frequency ratios. Winding number geometry on the circle. |

---

## Diagrams

| File | Description |
|---|---|
| [minimum_self_predicting_universe.svg](https://github.com/nickjoven/harmonics/blob/main/sync_cost/minimum_self_predicting_universe.svg) | The minimum self-predicting universe. Schematic of the four-primitive alphabet and its compositions. |
| [staircase_forming.svg](https://github.com/nickjoven/harmonics/blob/main/sync_cost/staircase_forming.svg) | Staircase formation. How Arnold tongues fill the frequency axis at increasing coupling. |

---

## Product Visualizations

Applied Farey geometry to physical engineering problems.

| File | Description |
|---|---|
| [Farey Heat Sinks](https://github.com/nickjoven/product/blob/main/farey_heat_sinks.html) | Heat sink fin spacing optimized by Farey fractions. |
| [Farey Integral Suppression](https://github.com/nickjoven/product/blob/main/farey_integral_suppression.html) | Vibration suppression via Farey-rational tuning. |
| [Farey Muzzle Devices](https://github.com/nickjoven/product/blob/main/farey_muzzle_devices.html) | Muzzle device port geometry from Stern-Brocot structure. |
| [Farey PC Cooling](https://github.com/nickjoven/product/blob/main/farey_pc_cooling.html) | PC cooling fan placement using Farey-spaced harmonics. |

---

## Phase Portraits and Plots

### Proslambenomenos

Phase portraits from the original Kuramoto-Einstein mapping.

| File | Description |
|---|---|
| [phase_newtonian.png](https://github.com/nickjoven/proslambenomenos/blob/main/docs/phase_newtonian.png) | Phase portrait: Newtonian regime ($g \gg a_0$). Decoupled orbits. |
| [phase_mond.png](https://github.com/nickjoven/proslambenomenos/blob/main/docs/phase_mond.png) | Phase portrait: MOND regime ($g \ll a_0$). Entrained orbits. |
| [phase_transition.png](https://github.com/nickjoven/proslambenomenos/blob/main/docs/phase_transition.png) | Phase portrait: transition regime ($g \approx a_0$). The synchronization boundary. |

### Harmonics Derivation Plots

Computational outputs from the derivation scripts.

| Script source | Content |
|---|---|
| `circle_map.py` | Arnold tongues, devil's staircase at varying $K$ |
| `golden_ratio_pivot.py` | Zoom into $1/\varphi$, identifying the pivot scale |
| `phi_squared_zoom.py` | Exact $\varphi^2$ self-similarity at the golden ratio |
| `k_omega_mapping.py` | The $k \leftrightarrow \Omega$ mapping: spectral tilt rate and amplitude |
| `staircase_geometry.py` | 3D representations: Arnold surface, Poincare disk, curvature |
| `born_rule_tongues.py` | Tongue boundary geometry confirming $\Delta\theta \propto \sqrt{\varepsilon}$ |
| `collapse_tongues.py` | Floquet convergence rate and collapse duration |
| `fidelity_calibration.py` | RAR interpolating function from tongue self-consistency |
| `a0_high_z.py` | High-redshift $a_0(z)$ predictions and observational comparison |

All scripts are in the [harmonics/sync_cost/derivations](https://github.com/nickjoven/harmonics/tree/main/sync_cost/derivations) directory.
