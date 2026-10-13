### 1. Polarization Fundamentals

In electromagnetic waves, the electric field $\vec{E}$ vibrates transversely to the propagation axis.
- **Unpolarized Light:** Symmetrical vibrations in all planes perpendicular to the propagation ray.
- **Linearly (Plane) Polarized Light:** Electric field vibrations restricted strictly to a single plane.

---

### 2. Brewster's Law & Polarizing Angle

When unpolarized light is incident on a transparent dielectric medium at the polarizing angle $i_p$, the reflected ray is 100% plane-polarized perpendicular to the plane of incidence.
- Reflected ray and refracted ray are mutually perpendicular: $i_p + r = 90^\circ \implies r = 90^\circ - i_p$.
- From Snell's Law: $\mu = \frac{\sin i_p}{\sin r} = \frac{\sin i_p}{\sin(90^\circ - i_p)} = \frac{\sin i_p}{\cos i_p} = \tan i_p$.
$$\mu = \tan(i_p)$$

---

### 3. Malus's Law
When plane-polarized light of intensity $I_0$ passes through an analyzer oriented at angle $\theta$ relative to the transmission axis of the polarizer:
$$I = I_0 \cos^2\theta$$
- When $\theta = 0^\circ$ (parallel axes): $I = I_0$ (maximum transmission).
- When $\theta = 90^\circ$ (crossed nicols): $I = 0$ (complete extinction).

---

### 4. Birefringence & Retardation Plates
In anisotropic crystals (e.g. Calcite $\text{CaCO}_3$, Quartz), an incident ray splits into an **Ordinary Ray (O-ray)** obeying Snell's Law and an **Extraordinary Ray (E-ray)** with direction-dependent velocity.
- **Quarter-Wave Plate (QWP):** Introduces path difference $\lambda/4$ (phase shift $\pi/2$):
  $$t = \frac{\lambda}{4(\mu_o - \mu_e)}$$
- **Half-Wave Plate (HWP):** Introduces path difference $\lambda/2$ (phase shift $\pi$):
  $$t = \frac{\lambda}{2(\mu_o - \mu_e)}$$