### 1. Inconsistency of Ampere's Law & Continuity Equation

The **Equation of Continuity** expresses conservation of electric charge:
$$\nabla \cdot \vec{J} + \frac{\partial\rho}{\partial t} = 0$$
Taking the divergence of static Ampere's Law ($\nabla \times \vec{B} = \mu_0 \vec{J}$):
$$\nabla \cdot (\nabla \times \vec{B}) = \mu_0 (\nabla \cdot \vec{J})$$
Since divergence of any curl is identically zero ($\nabla \cdot (\nabla \times \vec{B}) \equiv 0$), static Ampere's Law demands $\nabla \cdot \vec{J} = 0$. This violates charge conservation whenever charge density varies with time ($\partial\rho/\partial t \neq 0$, such as during charging of a capacitor!).

---

### 2. Maxwell's Displacement Current Modification

Maxwell eliminated this contradiction by replacing $\rho$ using Gauss's Law ($\rho = \varepsilon_0 \nabla \cdot \vec{E}$):
$$\nabla \cdot \vec{J} + \frac{\partial}{\partial t}(\varepsilon_0 \nabla \cdot \vec{E}) = 0 \implies \nabla \cdot \left[ \vec{J} + \varepsilon_0 \frac{\partial\vec{E}}{\partial t} \right] = 0$$
Thus, total current density consists of conduction current $\vec{J}$ plus **Displacement Current Density $\vec{J}_d$**:
$$\vec{J}_d = \frac{\partial \vec{D}}{\partial t} = \varepsilon_0 \frac{\partial \vec{E}}{\partial t}$$

---

### 3. Maxwell's 4 Equations Matrix

| Law | Differential Form | Integral Form | Physical Significance |
| :--- | :--- | :--- | :--- |
| **Gauss (E)** | $\nabla \cdot \vec{E} = \frac{\rho}{\varepsilon_0}$ | $\oint \vec{E} \cdot d\vec{A} = \frac{Q_{\text{enc}}}{\varepsilon_0}$ | Charges produce electric divergence. |
| **Gauss (B)** | $\nabla \cdot \vec{B} = 0$ | $\oint \vec{B} \cdot d\vec{A} = 0$ | Non-existence of isolated magnetic monopoles. |
| **Faraday** | $\nabla \times \vec{E} = -\frac{\partial\vec{B}}{\partial t}$ | $\oint \vec{E} \cdot d\vec{l} = -\frac{d}{dt} \int \vec{B} \cdot d\vec{A}$ | Changing magnetic field induces circular electric field. |
| **Ampere-Maxwell** | $\nabla \times \vec{B} = \mu_0 \vec{J} + \mu_0\varepsilon_0 \frac{\partial\vec{E}}{\partial t}$ | $\oint \vec{B} \cdot d\vec{l} = \mu_0 I_c + \mu_0\varepsilon_0 \frac{d}{dt} \int \vec{E} \cdot d\vec{A}$ | Conduction + displacement currents generate magnetic fields. |