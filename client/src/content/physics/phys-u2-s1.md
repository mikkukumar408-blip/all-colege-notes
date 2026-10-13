### 1. Electrostatics: Div, Curl & Scalar Potential

- **Gauss's Law (Divergence of E):** Net outward electric flux through any closed surface is proportional to enclosed charge:
  $$\nabla \cdot \vec{E} = \frac{\rho}{\varepsilon_0} \quad \Longleftrightarrow \quad \oint_S \vec{E} \cdot d\vec{A} = \frac{Q_{\text{enc}}}{\varepsilon_0}$$
- **Conservative Nature (Curl of E):** Electrostatic fields are conservative, meaning work done along any closed circuit is zero:
  $$\nabla \times \vec{E} = 0 \implies \vec{E} = -\nabla V$$
- **Poisson's and Laplace's Equations:** Substituting $\vec{E} = -\nabla V$ into Gauss's Law:
  $$\nabla \cdot (-\nabla V) = \frac{\rho}{\varepsilon_0} \implies \nabla^2 V = -\frac{\rho}{\varepsilon_0} \quad \text{[Poisson's Equation]}$$
  In charge-free space ($\rho = 0$), this simplifies to **Laplace's Equation**:
  $$\nabla^2 V = 0$$

---

### 2. Magnetostatics: Div, Curl & Vector Potential A

- **Gauss's Law for Magnetism:** Magnetic monopoles do not exist; magnetic lines of force form unbroken continuous loops:
  $$\nabla \cdot \vec{B} = 0 \quad \Longleftrightarrow \quad \oint_S \vec{B} \cdot d\vec{A} = 0$$
- **Ampere's Circuital Law (Static):**
  $$\nabla \times \vec{B} = \mu_0 \vec{J} \quad \Longleftrightarrow \quad \oint_C \vec{B} \cdot d\vec{l} = \mu_0 I_{\text{enc}}$$
- **Magnetic Vector Potential A:** Since $\nabla \cdot \vec{B} = 0$, by vector identity the divergence of any curl is zero, allowing us to define $\vec{A}$:
  $$\vec{B} = \nabla \times \vec{A}$$
  Imposing the **Coulomb Gauge condition** ($\nabla \cdot \vec{A} = 0$), Ampere's Law becomes:
  $$\nabla \times (\nabla \times \vec{A}) = \nabla(\nabla \cdot \vec{A}) - \nabla^2 \vec{A} = -\nabla^2 \vec{A} = \mu_0 \vec{J} \implies \nabla^2 \vec{A} = -\mu_0 \vec{J}$$