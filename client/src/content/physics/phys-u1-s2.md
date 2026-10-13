### 1. Fresnel vs. Fraunhofer Diffraction (12-Point Analysis)

| # | Parameter | Fresnel Diffraction | Fraunhofer Diffraction |
| :--- | :--- | :--- | :--- |
| **1** | **Source Distance** | Source is at **finite distance** from diffracting aperture. | Source is effectively at **infinite distance**. |
| **2** | **Screen Distance** | Screen is at **finite distance**. | Screen is effectively at **infinite distance**. |
| **3** | **Incident Wavefront** | Spherical or cylindrical wavefront. | Strictly **plane wavefront**. |
| **4** | **Diffracted Wavefront** | Spherical or cylindrical. | Strictly **plane wavefront**. |
| **5** | **Optical Lenses** | No lenses required. | Requires two convex lenses (collimator & focus). |
| **6** | **Phase Variations** | Quadratic phase terms (Fresnel integrals). | Linear phase variations across aperture. |
| **7** | **Mathematical Rigor** | Fresnel zones / Cornu spiral integration. | Fourier transform / simple phasor summation. |
| **8** | **Fringe Geometry** | Shadows of aperture; non-uniform spacing. | Spectral patterns; regular minima & maxima. |
| **9** | **Center of Pattern** | Can be bright or dark based on zone count. | Always a bright **Central Principal Maximum**. |
| **10** | **Real-Life Occurrence**| Edge of razor blade, small circular obstacle. | Spectrometers, telescope apertures, diffraction gratings. |
| **11** | **Observational Ease** | Requires critical alignment, no optical bench. | Standard spectrometer telescope configuration. |
| **12** | **Energy Concentration**| Dispersed over irregular shadow fringes. | Over **95%** of energy focused in central maximum. |

---

### 2. Fraunhofer Single Slit Diffraction Derivation

A slit of width $a$ is illuminated normally by a plane wave of wavelength $\lambda$. Dividing the slit into $N$ equal elements of width $dx = a/N$, the resultant amplitude $R$ at angle $\theta$ obtained by phasor addition is:
$$R = A_0 \frac{\sin\alpha}{\alpha} \quad \text{where } \alpha = \frac{\pi a \sin\theta}{\lambda}$$
The intensity distribution is:
$$I(\theta) = I_0 \left(\frac{\sin\alpha}{\alpha}\right)^2$$

- **Central Maximum ($\theta = 0$):** As $\alpha \to 0$, $\lim_{\alpha \to 0}\frac{\sin\alpha}{\alpha} = 1 \implies I = I_0$.
- **Minima Condition:** $\sin\alpha = 0$ while $\alpha \neq 0 \implies \alpha = \pm m\pi$ ($m=1,2,3...$):
  $$a \sin\theta = \pm m \lambda$$
- **Secondary Maxima Condition:** $\frac{dI}{d\alpha} = 0 \implies \tan\alpha = \alpha$. Solved graphically: $\alpha \approx \pm 1.43\pi, \pm 2.46\pi, \pm 3.47\pi$.
- **Intensity Ratio:** $I_0 : I_1 : I_2 : I_3 = 1 : 0.045 : 0.016 : 0.008$.
- **Central Angular Width:** $2\theta = \frac{2\lambda}{a}$ (Linear width on screen at focal length $f$ is $2f\lambda/a$).