### 1. Derivation of Free-Space Wave Equation

In source-free vacuum ($\rho = 0, \vec{J} = 0$):
1. $\nabla \cdot \vec{E} = 0$
2. $\nabla \cdot \vec{B} = 0$
3. $\nabla \times \vec{E} = -\frac{\partial\vec{B}}{\partial t}$
4. $\nabla \times \vec{B} = \mu_0\varepsilon_0 \frac{\partial\vec{E}}{\partial t}$

Taking curl of Faraday's Law (3):
$$\nabla \times (\nabla \times \vec{E}) = -\frac{\partial}{\partial t}(\nabla \times \vec{B})$$
Applying vector identity $\nabla \times (\nabla \times \vec{E}) = \nabla(\nabla \cdot \vec{E}) - \nabla^2 \vec{E}$, and substituting (1) and (4):
$$0 - \nabla^2 \vec{E} = -\frac{\partial}{\partial t}\left( \mu_0\varepsilon_0 \frac{\partial\vec{E}}{\partial t} \right) \implies \nabla^2 \vec{E} = \mu_0\varepsilon_0 \frac{\partial^2\vec{E}}{\partial t^2}$$
Similarly for magnetic field: $\nabla^2 \vec{B} = \mu_0\varepsilon_0 \frac{\partial^2\vec{B}}{\partial t^2}$.

Comparing with 3D classical wave equation $\nabla^2 \psi = \frac{1}{v^2} \frac{\partial^2\psi}{\partial t^2}$ establishes that electromagnetic radiation travels with speed:
$$c = \frac{1}{\sqrt{\mu_0 \varepsilon_0}} = \frac{1}{\sqrt{(4\pi \times 10^{-7})(8.854 \times 10^{-12})}} \approx 2.998 \times 10^8\text{ m/s}$$

---

### 2. Transverse Nature & Intrinsic Impedance
- Wavevector $\vec{k}$ is perpendicular to both fields: $\vec{k} \cdot \vec{E} = 0$ and $\vec{k} \cdot \vec{B} = 0$.
- Amplitude ratio: $E_0 / B_0 = c$.
- **Characteristic Free-Space Impedance ($Z_0$):**
  $$Z_0 = \frac{E_0}{H_0} = \sqrt{\frac{\mu_0}{\varepsilon_0}} = \sqrt{\frac{4\pi \times 10^{-7}}{8.854 \times 10^{-12}}} \approx 376.73\ \Omega \approx 377\ \Omega$$