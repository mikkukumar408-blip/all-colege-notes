### 1. Attenuation & Skin Depth Derivation in Conductors

In a conducting medium with conductivity $\sigma$, permittivity $\varepsilon$, and permeability $\mu$, conduction current $\vec{J} = \sigma\vec{E}$. The wave equation becomes:
$$\nabla^2\vec{E} = \mu\sigma \frac{\partial\vec{E}}{\partial t} + \mu\varepsilon \frac{\partial^2\vec{E}}{\partial t^2}$$
For a harmonic plane wave $E(z,t) = E_0 e^{i(\omega t - \gamma z)}$, the complex propagation constant is $\gamma = \alpha + i\beta$. For a **good conductor** ($\sigma \gg \omega\varepsilon$):
$$\gamma = \sqrt{-i\omega\mu\sigma} = \sqrt{\omega\mu\sigma} \, e^{-i\pi/4} = \sqrt{\frac{\omega\mu\sigma}{2}} - i\sqrt{\frac{\omega\mu\sigma}{2}}$$
Hence, the spatial attenuation constant $\alpha$ is:
$$\alpha = \sqrt{\frac{\omega\mu\sigma}{2}} = \sqrt{\pi f \mu \sigma}$$
The electric field attenuates exponentially: $E(z) = E_0 e^{-\alpha z} = E_0 e^{-z/\delta}$.

> 🟢 **Rigorous Definition: Skin Depth ($\delta$)**
> Skin depth is the penetration depth into a conducting material at which the electromagnetic wave amplitude drops to **$1/e \approx 36.8\%$** of its surface value:
> $$\delta = \frac{1}{\alpha} = \sqrt{\frac{2}{\omega \mu \sigma}} = \frac{1}{\sqrt{\pi f \mu \sigma}}$$
> *Engineering Impact:* At radio frequencies (RF), current is confined strictly to a thin microscopic skin, requiring silver-plated conductors and explaining underwater RF blackout.

---

### 2. Poynting Vector & Work-Energy Theorem

From Maxwell's curl equations, taking the scalar product:
$$-\nabla \cdot (\vec{E} \times \vec{H}) = \frac{\partial}{\partial t}\left[ \frac{1}{2}\varepsilon E^2 + \frac{1}{2}\mu H^2 \right] + \vec{J} \cdot \vec{E}$$
Integrating over closed volume $V$ bounded by surface $S$:
$$-\oint_S (\vec{E} \times \vec{H}) \cdot d\vec{A} = \frac{\partial}{\partial t} \int_V u_{\text{EM}} dV + \int_V (\vec{J} \cdot \vec{E}) dV$$
- **Poynting Vector:** $\vec{S} = \vec{E} \times \vec{H}$ represents instantaneous power flow per unit area ($\text{W/m}^2$).
- **Physical Law:** Net rate of electromagnetic energy flowing inwards across surface $S$ equals time rate of increase of stored field energy plus Ohmic Joule dissipation rate.