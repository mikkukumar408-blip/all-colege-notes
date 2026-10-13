### 1. Huygens' Principle & Superposition of Waves

**Huygens' Principle** forms the physical basis of wave optics:
1. Every point on an advancing primary wavefront serves as an independent secondary source of spherical wavelets radiating forward with wave speed $c$.
2. The envelope surface tangential to these forward wavelets at any later time $t + \Delta t$ establishes the new primary wavefront.

---

### 2. Division of Wavefront vs. Division of Amplitude

| Dimension | Division of Wavefront | Division of Amplitude |
| :--- | :--- | :--- |
| **Physical Mechanism** | Wavefront from a localized source is physically divided into two by apertures/prisms. | Wave amplitude is split by partial reflection and partial refraction at boundaries. |
| **Source Geometry** | Demands a narrow pinhole or slit source. | Can utilize broad, extended light sources. |
| **Interference Fringes** | Fringes are non-localized in space. | Fringes are localized (e.g. localized at film surface). |
| **Prototypical Systems** | **Young's Double Slit (YDSE), Fresnel Biprism, Lloyd's Mirror.** | **Newton's Rings, Thin Dielectric Films, Michelson Interferometer.** |

---

### 3. Newton's Rings: Derivation of Ring Diameters

When a plano-convex lens of large radius of curvature $R$ rests upon an optically flat glass plate, an air film of circular symmetry and varying thickness $t$ is formed.

> 🟢 **Stokes' Phase Shift Theorem:**
> When light reflects at the boundary of an optically denser medium (air-to-glass interface at the flat plate), an abrupt phase reversal of $\pi$ radians occurs, introducing an additional optical path difference of **$\pm \lambda / 2$**.

For normal incidence ($\cos r = 1$) in an air film ($\mu = 1$), the net optical path difference is:
$$\Delta = 2t - \frac{\lambda}{2}$$

From the geometry of a sphere of radius $R$ enclosing contact radius $r_n$ and film thickness $t$:
$$r_n^2 = t(2R - t) \approx 2Rt \implies 2t = \frac{r_n^2}{R} = \frac{D_n^2}{4R}$$
where $D_n = 2r_n$ is the diameter of the $n^{\text{th}}$ fringe ring.

#### (A) Condition for Dark Rings (Destructive Interference)
$$\Delta = 2t - \frac{\lambda}{2} = (2n - 1)\frac{\lambda}{2} \implies 2t = n\lambda$$
$$\frac{D_n^2}{4R} = n\lambda \implies D_n = 2\sqrt{n\lambda R} \implies D_n \propto \sqrt{n}$$
**Conclusion:** Diameters of dark rings are directly proportional to square roots of consecutive natural numbers ($0, 1, 2, 3...$).

#### (B) Condition for Bright Rings (Constructive Interference)
$$\Delta = 2t - \frac{\lambda}{2} = n\lambda \implies 2t = (2n - 1)\frac{\lambda}{2}$$
$$\frac{D_n^2}{4R} = (2n - 1)\frac{\lambda}{2} \implies D_n = \sqrt{2(2n - 1)\lambda R} \implies D_n \propto \sqrt{2n - 1}$$
**Conclusion:** Diameters of bright rings are proportional to square roots of consecutive odd numbers ($1, 3, 5...$).

#### (C) Measurement of Wavelength $\lambda$ & Refractive Index $\mu$
$$\lambda = \frac{D_{n+p}^2 - D_n^2}{4pR} \qquad \mu = \frac{(D_{n+p}^2 - D_n^2)_{\text{air}}}{(D_{n+p}^2 - D_n^2)_{\text{liquid}}}$$
*Why is the center dark in reflection?* At point of contact $O$, film thickness $t = 0$. Hence path difference $\Delta = -\lambda/2$, fulfilling the exact condition for destructive interference!