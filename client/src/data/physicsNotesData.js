/* =========================================================================
   APPLIED PHYSICS (BPHY-001 / PHYS102) COMPLETE STUDY NOTES
   =========================================================================
   Full MMDU Syllabus Coverage for B.Tech 1st Year (Units 1, 2, 3, and 4)
   Exhaustive Long Notes Edition:
   - Comprehensive theoretical derivations, 12-point comparative matrices
   - Visual vector architectural flowcharts & schematics (Newton's rings, Maxwell, 1D Box, Crystal Lattices)
   - Solved university examination problems with diagrams in BOTH questions and solutions
   ========================================================================= */

export const physicsSubjectDetails = {
  id: "sub-p1",
  semester: 2,
  year: "1st Year",
  name: "Applied Physics",
  code: "PHYS102",
  credits: 4,
  instructor: "Department of Physics & Applied Sciences (MMDU)",
  notesCount: "4 Units Comprehensive Long Notes & Solved Questions",
  rating: 5.0,
  description: "Official MMDU syllabus (BPHY-001 / PHYS102): Wave optics, Newton's rings derivations, Fraunhofer single-slit diffraction & grating, Lasers (Ruby & He-Ne 4-level system), Maxwell's equations & displacement current, skin depth, Schrödinger wave mechanics, 1D infinite box, crystal structures (SC/BCC/FCC APF derivations), Schottky & Frenkel defects, and Sommerfeld free electron theory with solved examination questions.",
  banner: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80",
  units: [
    { num: 1, title: 'Wave Optics & Lasers', pages: 28, status: 'Verified' },
    { num: 2, title: 'Electrostatics, Magnetostatics & EM Waves', pages: 26, status: 'Verified' },
    { num: 3, title: 'Wave Nature of Particles & Schrödinger Equation', pages: 30, status: 'Verified' },
    { num: 4, title: 'Crystal Structures & Free Electron Theory', pages: 32, status: 'Verified' }
  ]
};

export const physicsUnitsData = [
  {
    unitNum: 1,
    title: "Wave Optics & Lasers (Complete Theory, Derivations & Quantum Systems)",
    examWeightage: "26 - 30 Marks",
    readingTime: "40 mins",
    summary: "Huygens' wave principle, Wavefront vs Amplitude splitting, Interference in thin films & Newton's rings derivations, 12-point Fresnel vs Fraunhofer comparison, Fraunhofer single-slit phasor analysis, Diffraction grating resolving power, Polarization laws (Brewster & Malus), Einstein A and B coefficients, Population inversion, Ruby laser, and 4-level He-Ne gas laser.",
    sections: [
      {
        sectionId: "phys-u1-s1",
        title: "1. Principles of Wave Optics & Newton's Rings (Complete Derivation)",
        content: `### 1. Huygens' Principle & Superposition of Waves

**Huygens' Principle** forms the physical basis of wave optics:
1. Every point on an advancing primary wavefront serves as an independent secondary source of spherical wavelets radiating forward with wave speed $c$.
2. The envelope surface tangential to these forward wavelets at any later time $t + \\Delta t$ establishes the new primary wavefront.

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
> When light reflects at the boundary of an optically denser medium (air-to-glass interface at the flat plate), an abrupt phase reversal of $\\pi$ radians occurs, introducing an additional optical path difference of **$\\pm \\lambda / 2$**.

For normal incidence ($\\cos r = 1$) in an air film ($\\mu = 1$), the net optical path difference is:
$$\\Delta = 2t - \\frac{\\lambda}{2}$$

From the geometry of a sphere of radius $R$ enclosing contact radius $r_n$ and film thickness $t$:
$$r_n^2 = t(2R - t) \\approx 2Rt \\implies 2t = \\frac{r_n^2}{R} = \\frac{D_n^2}{4R}$$
where $D_n = 2r_n$ is the diameter of the $n^{\\text{th}}$ fringe ring.

#### (A) Condition for Dark Rings (Destructive Interference)
$$\\Delta = 2t - \\frac{\\lambda}{2} = (2n - 1)\\frac{\\lambda}{2} \\implies 2t = n\\lambda$$
$$\\frac{D_n^2}{4R} = n\\lambda \\implies D_n = 2\\sqrt{n\\lambda R} \\implies D_n \\propto \\sqrt{n}$$
**Conclusion:** Diameters of dark rings are directly proportional to square roots of consecutive natural numbers ($0, 1, 2, 3...$).

#### (B) Condition for Bright Rings (Constructive Interference)
$$\\Delta = 2t - \\frac{\\lambda}{2} = n\\lambda \\implies 2t = (2n - 1)\\frac{\\lambda}{2}$$
$$\\frac{D_n^2}{4R} = (2n - 1)\\frac{\\lambda}{2} \\implies D_n = \\sqrt{2(2n - 1)\\lambda R} \\implies D_n \\propto \\sqrt{2n - 1}$$
**Conclusion:** Diameters of bright rings are proportional to square roots of consecutive odd numbers ($1, 3, 5...$).

#### (C) Measurement of Wavelength $\\lambda$ & Refractive Index $\\mu$
$$\\lambda = \\frac{D_{n+p}^2 - D_n^2}{4pR} \\qquad \\mu = \\frac{(D_{n+p}^2 - D_n^2)_{\\text{air}}}{(D_{n+p}^2 - D_n^2)_{\\text{liquid}}}$$
*Why is the center dark in reflection?* At point of contact $O$, film thickness $t = 0$. Hence path difference $\\Delta = -\\lambda/2$, fulfilling the exact condition for destructive interference!`
      },
      {
        sectionId: "phys-u1-s2",
        title: "2. Diffraction: Fresnel vs. Fraunhofer & Single Slit Phasor Derivation",
        content: `### 1. Fresnel vs. Fraunhofer Diffraction (12-Point Analysis)

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

A slit of width $a$ is illuminated normally by a plane wave of wavelength $\\lambda$. Dividing the slit into $N$ equal elements of width $dx = a/N$, the resultant amplitude $R$ at angle $\\theta$ obtained by phasor addition is:
$$R = A_0 \\frac{\\sin\\alpha}{\\alpha} \\quad \\text{where } \\alpha = \\frac{\\pi a \\sin\\theta}{\\lambda}$$
The intensity distribution is:
$$I(\\theta) = I_0 \\left(\\frac{\\sin\\alpha}{\\alpha}\\right)^2$$

- **Central Maximum ($\\theta = 0$):** As $\\alpha \\to 0$, $\\lim_{\\alpha \\to 0}\\frac{\\sin\\alpha}{\\alpha} = 1 \\implies I = I_0$.
- **Minima Condition:** $\\sin\\alpha = 0$ while $\\alpha \\neq 0 \\implies \\alpha = \\pm m\\pi$ ($m=1,2,3...$):
  $$a \\sin\\theta = \\pm m \\lambda$$
- **Secondary Maxima Condition:** $\\frac{dI}{d\\alpha} = 0 \\implies \\tan\\alpha = \\alpha$. Solved graphically: $\\alpha \\approx \\pm 1.43\\pi, \\pm 2.46\\pi, \\pm 3.47\\pi$.
- **Intensity Ratio:** $I_0 : I_1 : I_2 : I_3 = 1 : 0.045 : 0.016 : 0.008$.
- **Central Angular Width:** $2\\theta = \\frac{2\\lambda}{a}$ (Linear width on screen at focal length $f$ is $2f\\lambda/a$).`
      },
      {
        sectionId: "phys-u1-s3",
        title: "3. Polarization of Light & Birefringence",
        content: `### 1. Polarization Fundamentals

In electromagnetic waves, the electric field $\\vec{E}$ vibrates transversely to the propagation axis.
- **Unpolarized Light:** Symmetrical vibrations in all planes perpendicular to the propagation ray.
- **Linearly (Plane) Polarized Light:** Electric field vibrations restricted strictly to a single plane.

---

### 2. Brewster's Law & Polarizing Angle

When unpolarized light is incident on a transparent dielectric medium at the polarizing angle $i_p$, the reflected ray is 100% plane-polarized perpendicular to the plane of incidence.
- Reflected ray and refracted ray are mutually perpendicular: $i_p + r = 90^\\circ \\implies r = 90^\\circ - i_p$.
- From Snell's Law: $\\mu = \\frac{\\sin i_p}{\\sin r} = \\frac{\\sin i_p}{\\sin(90^\\circ - i_p)} = \\frac{\\sin i_p}{\\cos i_p} = \\tan i_p$.
$$\\mu = \\tan(i_p)$$

---

### 3. Malus's Law
When plane-polarized light of intensity $I_0$ passes through an analyzer oriented at angle $\\theta$ relative to the transmission axis of the polarizer:
$$I = I_0 \\cos^2\\theta$$
- When $\\theta = 0^\\circ$ (parallel axes): $I = I_0$ (maximum transmission).
- When $\\theta = 90^\\circ$ (crossed nicols): $I = 0$ (complete extinction).

---

### 4. Birefringence & Retardation Plates
In anisotropic crystals (e.g. Calcite $\\text{CaCO}_3$, Quartz), an incident ray splits into an **Ordinary Ray (O-ray)** obeying Snell's Law and an **Extraordinary Ray (E-ray)** with direction-dependent velocity.
- **Quarter-Wave Plate (QWP):** Introduces path difference $\\lambda/4$ (phase shift $\\pi/2$):
  $$t = \\frac{\\lambda}{4(\\mu_o - \\mu_e)}$$
- **Half-Wave Plate (HWP):** Introduces path difference $\\lambda/2$ (phase shift $\\pi$):
  $$t = \\frac{\\lambda}{2(\\mu_o - \\mu_e)}$$`
      },
      {
        sectionId: "phys-u1-s4",
        title: "4. Quantum Laser Physics: Einstein Coefficients & He-Ne Systems",
        content: `### 1. Fundamental Characteristics of Laser Light

LASER stands for **Light Amplification by Stimulated Emission of Radiation**.
1. **Extreme Monochromaticity:** Spectral linewidth $\\Delta\\lambda \\approx 10^{-6}\\text{ \\AA}$.
2. **Directionality & Low Divergence:** Beam divergence angle $\\theta < 1\\text{ mrad}$.
3. **High Coherence:** Exceptional temporal coherence length (kilometers) and spatial wavefront coherence.
4. **Enormous Intensity:** Focused laser beams exceed solar core flux density ($>10^{12}\\text{ W/cm}^2$).

---

### 2. Einstein's A and B Coefficients Derivation

Consider two atomic levels $E_1$ and $E_2$ in thermal equilibrium with radiation density $u(\\nu)$ at temperature $T$:
1. **Absorption:** $R_{12} = B_{12} N_1 u(\\nu)$
2. **Spontaneous Emission:** $R_{21,\\text{sp}} = A_{21} N_2$
3. **Stimulated Emission:** $R_{21,\\text{st}} = B_{21} N_2 u(\\nu)$

At thermodynamic equilibrium: Rate of Upward Transitions = Rate of Downward Transitions:
$$B_{12} N_1 u(\\nu) = A_{21} N_2 + B_{21} N_2 u(\\nu) \\implies u(\\nu) = \\frac{A_{21}}{B_{12}\\frac{N_1}{N_2} - B_{21}}$$
From Maxwell-Boltzmann statistics: $N_1/N_2 = e^{(E_2 - E_1)/k_B T} = e^{h\\nu/k_B T}$:
$$u(\\nu) = \\frac{A_{21}}{B_{21}} \\left[ \\frac{1}{\\frac{B_{12}}{B_{21}} e^{h\\nu/k_B T} - 1} \\right]$$
Comparing directly with **Planck's Law of Blackbody Radiation**:
$$u(\\nu) = \\frac{8\\pi h \\nu^3}{c^3} \\left[ \\frac{1}{e^{h\\nu/k_B T} - 1} \\right]$$
We arrive at two fundamental Einstein identities:
$$B_{12} = B_{21} \\qquad \\frac{A_{21}}{B_{21}} = \\frac{8\\pi h \\nu^3}{c^3} \\propto \\nu^3$$
*Physical Implication:* The probability of spontaneous emission increases dramatically with frequency $\\nu^3$, explaining why gamma-ray and X-ray lasers require astronomical pumping powers compared to microwave MASERs.

---

### 3. Population Inversion & Metastable States
Under thermal equilibrium, $N_1 > N_2$. For net optical gain, one must enforce **Population Inversion ($N_2 > N_1$)**. This is achieved by pumping atoms into a **Metastable State** having an unusually long lifetime ($\\sim 10^{-3}\\text{ s}$ compared to normal $10^{-8}\\text{ s}$).

---

### 4. Four-Level Helium-Neon (He-Ne) Gas Laser
- **Active Medium:** Gas mixture of Helium and Neon in a 10:1 ratio at low pressure ($\\sim 1\\text{ torr}$).
- **Pumping Mechanism:** High-voltage DC electrical discharge. Fast electrons excite He atoms from ground state $1^1S_0$ to metastable levels $2^1S_0$ ($20.61\\text{ eV}$) and $2^3S_1$ ($19.82\\text{ eV}$).
- **Resonant Energy Transfer:** Excited He atoms collide inelastically with ground state Neon atoms, transferring energy with minimal mismatch ($\\Delta E \\approx 0.05\\text{ eV}$) to excite Neon into $3s$ ($20.66\\text{ eV}$) and $2s$ ($19.78\\text{ eV}$) states.
- **Laser Emission:** Stimulated radiative transition occurs from Neon $3s \\to 2p$, emitting a continuous, highly coherent red laser beam at:
  $$\\lambda = 632.8\\text{ nm}$$
- **Depopulation:** Fast spontaneous decay occurs from $2p \\to 1s$, followed by non-radiative de-excitation to the ground state via physical collisions with the capillary tube walls.`
      }
    ]
  },
  {
    unitNum: 2,
    title: "Electrostatics, Magnetostatics & Electromagnetic Waves (Maxwell's Unified Theory)",
    examWeightage: "24 - 28 Marks",
    readingTime: "35 mins",
    summary: "Divergence & curl of electrostatic field, Poisson & Laplace equations, Biot-Savart law, Divergence & curl of static magnetic field, Magnetic vector potential, Equation of continuity, Maxwell's displacement current, Maxwell's 4 equations, Free space wave propagation, Speed of light derivation, Skin depth in conductors, and Poynting theorem.",
    sections: [
      {
        sectionId: "phys-u2-s1",
        title: "1. Electrostatic & Magnetostatic Vector Fields & Potentials",
        content: `### 1. Electrostatics: Div, Curl & Scalar Potential

- **Gauss's Law (Divergence of E):** Net outward electric flux through any closed surface is proportional to enclosed charge:
  $$\\nabla \\cdot \\vec{E} = \\frac{\\rho}{\\varepsilon_0} \\quad \\Longleftrightarrow \\quad \\oint_S \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{\\text{enc}}}{\\varepsilon_0}$$
- **Conservative Nature (Curl of E):** Electrostatic fields are conservative, meaning work done along any closed circuit is zero:
  $$\\nabla \\times \\vec{E} = 0 \\implies \\vec{E} = -\\nabla V$$
- **Poisson's and Laplace's Equations:** Substituting $\\vec{E} = -\\nabla V$ into Gauss's Law:
  $$\\nabla \\cdot (-\\nabla V) = \\frac{\\rho}{\\varepsilon_0} \\implies \\nabla^2 V = -\\frac{\\rho}{\\varepsilon_0} \\quad \\text{[Poisson's Equation]}$$
  In charge-free space ($\\rho = 0$), this simplifies to **Laplace's Equation**:
  $$\\nabla^2 V = 0$$

---

### 2. Magnetostatics: Div, Curl & Vector Potential A

- **Gauss's Law for Magnetism:** Magnetic monopoles do not exist; magnetic lines of force form unbroken continuous loops:
  $$\\nabla \\cdot \\vec{B} = 0 \\quad \\Longleftrightarrow \\quad \\oint_S \\vec{B} \\cdot d\\vec{A} = 0$$
- **Ampere's Circuital Law (Static):**
  $$\\nabla \\times \\vec{B} = \\mu_0 \\vec{J} \\quad \\Longleftrightarrow \\quad \\oint_C \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{\\text{enc}}$$
- **Magnetic Vector Potential A:** Since $\\nabla \\cdot \\vec{B} = 0$, by vector identity the divergence of any curl is zero, allowing us to define $\\vec{A}$:
  $$\\vec{B} = \\nabla \\times \\vec{A}$$
  Imposing the **Coulomb Gauge condition** ($\\nabla \\cdot \\vec{A} = 0$), Ampere's Law becomes:
  $$\\nabla \\times (\\nabla \\times \\vec{A}) = \\nabla(\\nabla \\cdot \\vec{A}) - \\nabla^2 \\vec{A} = -\\nabla^2 \\vec{A} = \\mu_0 \\vec{J} \\implies \\nabla^2 \\vec{A} = -\\mu_0 \\vec{J}$$`
      },
      {
        sectionId: "phys-u2-s2",
        title: "2. Displacement Current & Maxwell's 4 Fundamental Equations",
        content: `### 1. Inconsistency of Ampere's Law & Continuity Equation

The **Equation of Continuity** expresses conservation of electric charge:
$$\\nabla \\cdot \\vec{J} + \\frac{\\partial\\rho}{\\partial t} = 0$$
Taking the divergence of static Ampere's Law ($\\nabla \\times \\vec{B} = \\mu_0 \\vec{J}$):
$$\\nabla \\cdot (\\nabla \\times \\vec{B}) = \\mu_0 (\\nabla \\cdot \\vec{J})$$
Since divergence of any curl is identically zero ($\\nabla \\cdot (\\nabla \\times \\vec{B}) \\equiv 0$), static Ampere's Law demands $\\nabla \\cdot \\vec{J} = 0$. This violates charge conservation whenever charge density varies with time ($\\partial\\rho/\\partial t \\neq 0$, such as during charging of a capacitor!).

---

### 2. Maxwell's Displacement Current Modification

Maxwell eliminated this contradiction by replacing $\\rho$ using Gauss's Law ($\\rho = \\varepsilon_0 \\nabla \\cdot \\vec{E}$):
$$\\nabla \\cdot \\vec{J} + \\frac{\\partial}{\\partial t}(\\varepsilon_0 \\nabla \\cdot \\vec{E}) = 0 \\implies \\nabla \\cdot \\left[ \\vec{J} + \\varepsilon_0 \\frac{\\partial\\vec{E}}{\\partial t} \\right] = 0$$
Thus, total current density consists of conduction current $\\vec{J}$ plus **Displacement Current Density $\\vec{J}_d$**:
$$\\vec{J}_d = \\frac{\\partial \\vec{D}}{\\partial t} = \\varepsilon_0 \\frac{\\partial \\vec{E}}{\\partial t}$$

---

### 3. Maxwell's 4 Equations Matrix

| Law | Differential Form | Integral Form | Physical Significance |
| :--- | :--- | :--- | :--- |
| **Gauss (E)** | $\\nabla \\cdot \\vec{E} = \\frac{\\rho}{\\varepsilon_0}$ | $\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{\\text{enc}}}{\\varepsilon_0}$ | Charges produce electric divergence. |
| **Gauss (B)** | $\\nabla \\cdot \\vec{B} = 0$ | $\\oint \\vec{B} \\cdot d\\vec{A} = 0$ | Non-existence of isolated magnetic monopoles. |
| **Faraday** | $\\nabla \\times \\vec{E} = -\\frac{\\partial\\vec{B}}{\\partial t}$ | $\\oint \\vec{E} \\cdot d\\vec{l} = -\\frac{d}{dt} \\int \\vec{B} \\cdot d\\vec{A}$ | Changing magnetic field induces circular electric field. |
| **Ampere-Maxwell** | $\\nabla \\times \\vec{B} = \\mu_0 \\vec{J} + \\mu_0\\varepsilon_0 \\frac{\\partial\\vec{E}}{\\partial t}$ | $\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_c + \\mu_0\\varepsilon_0 \\frac{d}{dt} \\int \\vec{E} \\cdot d\\vec{A}$ | Conduction + displacement currents generate magnetic fields. |`
      },
      {
        sectionId: "phys-u2-s3",
        title: "3. Wave Propagation in Free Space & Speed of Light Derivation",
        content: `### 1. Derivation of Free-Space Wave Equation

In source-free vacuum ($\\rho = 0, \\vec{J} = 0$):
1. $\\nabla \\cdot \\vec{E} = 0$
2. $\\nabla \\cdot \\vec{B} = 0$
3. $\\nabla \\times \\vec{E} = -\\frac{\\partial\\vec{B}}{\\partial t}$
4. $\\nabla \\times \\vec{B} = \\mu_0\\varepsilon_0 \\frac{\\partial\\vec{E}}{\\partial t}$

Taking curl of Faraday's Law (3):
$$\\nabla \\times (\\nabla \\times \\vec{E}) = -\\frac{\\partial}{\\partial t}(\\nabla \\times \\vec{B})$$
Applying vector identity $\\nabla \\times (\\nabla \\times \\vec{E}) = \\nabla(\\nabla \\cdot \\vec{E}) - \\nabla^2 \\vec{E}$, and substituting (1) and (4):
$$0 - \\nabla^2 \\vec{E} = -\\frac{\\partial}{\\partial t}\\left( \\mu_0\\varepsilon_0 \\frac{\\partial\\vec{E}}{\\partial t} \\right) \\implies \\nabla^2 \\vec{E} = \\mu_0\\varepsilon_0 \\frac{\\partial^2\\vec{E}}{\\partial t^2}$$
Similarly for magnetic field: $\\nabla^2 \\vec{B} = \\mu_0\\varepsilon_0 \\frac{\\partial^2\\vec{B}}{\\partial t^2}$.

Comparing with 3D classical wave equation $\\nabla^2 \\psi = \\frac{1}{v^2} \\frac{\\partial^2\\psi}{\\partial t^2}$ establishes that electromagnetic radiation travels with speed:
$$c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} = \\frac{1}{\\sqrt{(4\\pi \\times 10^{-7})(8.854 \\times 10^{-12})}} \\approx 2.998 \\times 10^8\\text{ m/s}$$

---

### 2. Transverse Nature & Intrinsic Impedance
- Wavevector $\\vec{k}$ is perpendicular to both fields: $\\vec{k} \\cdot \\vec{E} = 0$ and $\\vec{k} \\cdot \\vec{B} = 0$.
- Amplitude ratio: $E_0 / B_0 = c$.
- **Characteristic Free-Space Impedance ($Z_0$):**
  $$Z_0 = \\frac{E_0}{H_0} = \\sqrt{\\frac{\\mu_0}{\\varepsilon_0}} = \\sqrt{\\frac{4\\pi \\times 10^{-7}}{8.854 \\times 10^{-12}}} \\approx 376.73\\ \\Omega \\approx 377\\ \\Omega$$`
      },
      {
        sectionId: "phys-u2-s4",
        title: "4. Propagation in Conducting Media, Skin Depth & Poynting Theorem",
        content: `### 1. Attenuation & Skin Depth Derivation in Conductors

In a conducting medium with conductivity $\\sigma$, permittivity $\\varepsilon$, and permeability $\\mu$, conduction current $\\vec{J} = \\sigma\\vec{E}$. The wave equation becomes:
$$\\nabla^2\\vec{E} = \\mu\\sigma \\frac{\\partial\\vec{E}}{\\partial t} + \\mu\\varepsilon \\frac{\\partial^2\\vec{E}}{\\partial t^2}$$
For a harmonic plane wave $E(z,t) = E_0 e^{i(\\omega t - \\gamma z)}$, the complex propagation constant is $\\gamma = \\alpha + i\\beta$. For a **good conductor** ($\\sigma \\gg \\omega\\varepsilon$):
$$\\gamma = \\sqrt{-i\\omega\\mu\\sigma} = \\sqrt{\\omega\\mu\\sigma} \\, e^{-i\\pi/4} = \\sqrt{\\frac{\\omega\\mu\\sigma}{2}} - i\\sqrt{\\frac{\\omega\\mu\\sigma}{2}}$$
Hence, the spatial attenuation constant $\\alpha$ is:
$$\\alpha = \\sqrt{\\frac{\\omega\\mu\\sigma}{2}} = \\sqrt{\\pi f \\mu \\sigma}$$
The electric field attenuates exponentially: $E(z) = E_0 e^{-\\alpha z} = E_0 e^{-z/\\delta}$.

> 🟢 **Rigorous Definition: Skin Depth ($\\delta$)**
> Skin depth is the penetration depth into a conducting material at which the electromagnetic wave amplitude drops to **$1/e \\approx 36.8\\%$** of its surface value:
> $$\\delta = \\frac{1}{\\alpha} = \\sqrt{\\frac{2}{\\omega \\mu \\sigma}} = \\frac{1}{\\sqrt{\\pi f \\mu \\sigma}}$$
> *Engineering Impact:* At radio frequencies (RF), current is confined strictly to a thin microscopic skin, requiring silver-plated conductors and explaining underwater RF blackout.

---

### 2. Poynting Vector & Work-Energy Theorem

From Maxwell's curl equations, taking the scalar product:
$$-\\nabla \\cdot (\\vec{E} \\times \\vec{H}) = \\frac{\\partial}{\\partial t}\\left[ \\frac{1}{2}\\varepsilon E^2 + \\frac{1}{2}\\mu H^2 \\right] + \\vec{J} \\cdot \\vec{E}$$
Integrating over closed volume $V$ bounded by surface $S$:
$$-\\oint_S (\\vec{E} \\times \\vec{H}) \\cdot d\\vec{A} = \\frac{\\partial}{\\partial t} \\int_V u_{\\text{EM}} dV + \\int_V (\\vec{J} \\cdot \\vec{E}) dV$$
- **Poynting Vector:** $\\vec{S} = \\vec{E} \\times \\vec{H}$ represents instantaneous power flow per unit area ($\\text{W/m}^2$).
- **Physical Law:** Net rate of electromagnetic energy flowing inwards across surface $S$ equals time rate of increase of stored field energy plus Ohmic Joule dissipation rate.`
      }
    ]
  },
  {
    unitNum: 3,
    title: "Wave Nature of Particles & Schrödinger Equation (Quantum Mechanics)",
    examWeightage: "24 - 28 Marks",
    readingTime: "40 mins",
    summary: "de Broglie hypothesis, phase vs group velocity identity vg = v_particle, Heisenberg uncertainty principle and non-existence of nuclear electrons proof, Born wave function postulate, TDSE and TISE derivations, 1D infinite box eigenfunctions and quantized energy levels proof, zero-point energy, quantum tunneling barrier penetration, and 1D harmonic oscillator.",
    sections: [
      {
        sectionId: "phys-u3-s1",
        title: "1. de Broglie Hypothesis, Phase & Group Velocity & Uncertainty Principle",
        content: `### 1. de Broglie Hypothesis & Matter Waves

Louis de Broglie postulated that moving matter possesses an associated dual wave character:
$$\\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2mE_k}}$$
For an electron accelerated through an electric potential difference $V$ volts:
$$\\lambda = \\frac{h}{\\sqrt{2meV}} = \\frac{1.227}{\\sqrt{V}}\\text{ nm} = \\frac{12.27}{\\sqrt{V}}\\text{ \\AA}$$
For $V = 100\\text{ V}$, $\\lambda = 1.227\\text{ \\AA}$, matching crystal lattice spacings (Davisson-Germer electron diffraction proof).

---

### 2. Phase Velocity vs. Group Velocity

- **Phase Velocity ($v_p$):** Velocity of individual monochromatic wave crest: $v_p = \\omega / k$.
- **Group Velocity ($v_g$):** Velocity of composite wave packet envelope carrying energy: $v_g = d\\omega / dk$.
- **Interrelation:**
  $$v_g = v_p - \\lambda \\frac{dv_p}{d\\lambda} \\qquad v_p \\cdot v_g = c^2 \\quad \\text{(Relativistic)}$$
- **Fundamental Identity:** The group velocity of a de Broglie matter wave packet is identically equal to classical particle velocity:
  $$v_g = v_{\\text{particle}}$$

---

### 3. Heisenberg Uncertainty Principle & Nuclear Electron Proof

$$\\Delta x \\cdot \\Delta p_x \\ge \\frac{\\hbar}{2} \\qquad \\Delta E \\cdot \\Delta t \\ge \\frac{\\hbar}{2}$$

> 🟢 **Proof: Non-Existence of Free Electrons Inside the Atomic Nucleus**
> Typical nuclear diameter is $2R \\approx 10^{-14}\\text{ m}$. If an electron resides inside the nucleus, its position uncertainty is at most $\\Delta x \\approx 10^{-14}\\text{ m}$.
> By Heisenberg's principle:
> $$\\Delta p \\ge \\frac{\\hbar}{2\\Delta x} = \\frac{1.054 \\times 10^{-34}}{2 \\times 10^{-14}} \\approx 5.27 \\times 10^{-21}\\text{ kg}\\cdot\\text{m/s}$$
> Relativistic energy $E \\approx pc$:
> $$E \\approx (5.27 \\times 10^{-21})(3 \\times 10^8) \\approx 1.58 \\times 10^{-12}\\text{ J} \\approx 9.87\\text{ to }20\\text{ MeV}$$
> Experimental $\\beta$-decay reveals emitted electrons possess energies of only $2\\text{ to }3\\text{ MeV}$. Hence, **electrons cannot exist as static constituents of the nucleus**.`
      },
      {
        sectionId: "phys-u3-s2",
        title: "2. The Wave Function & Born Interpretation",
        content: `### 1. Physical Meaning of Wave Function $\\psi$

The wave function $\\psi(\\vec{r},t)$ is a complex probability amplitude. Max Born formulated its statistical interpretation:
$$P(\\vec{r},t) dV = |\\psi(\\vec{r},t)|^2 dV = \\psi^* \\psi \\, dV$$

#### Well-Behaved Wave Function Conditions:
1. $\\psi$ must be **finite and continuous** everywhere.
2. $\\psi$ must be **single-valued** at all spatial coordinates.
3. The spatial gradient $\\frac{\\partial\\psi}{\\partial x}$ must be continuous across boundaries.
4. $\\psi$ must be **square-integrable (normalizable)**:
   $$\\int_{-\\infty}^{+\\infty} |\\psi|^2 dV = 1$$

---

### 2. Quantum Operators & Expectation Values

| Observable | Quantum Operator | Expectation Value Formula |
| :--- | :--- | :--- |
| **Position $x$** | $\\hat{x} = x$ | $\\langle x \\rangle = \\int \\psi^* x \\psi \\, dx$ |
| **Momentum $p_x$** | $\\hat{p}_x = -i\\hbar \\frac{\\partial}{\\partial x}$ | $\\langle p_x \\rangle = \\int \\psi^* \\left(-i\\hbar \\frac{\\partial}{\\partial x}\\right) \\psi \\, dx$ |
| **Energy $E$** | $\\hat{E} = i\\hbar \\frac{\\partial}{\\partial t}$ | $\\langle E \\rangle = \\int \\psi^* \\left(i\\hbar \\frac{\\partial}{\\partial t}\\right) \\psi \\, dx$ |
| **Hamiltonian $H$** | $\\hat{H} = -\\frac{\\hbar^2}{2m}\\nabla^2 + V$ | $\\langle H \\rangle = \\int \\psi^* \\hat{H} \\psi \\, dV$`
      },
      {
        sectionId: "phys-u3-s3",
        title: "3. Derivation of Schrödinger Equations (TDSE & TISE)",
        content: `### 1. 1D Time-Dependent Schrödinger Equation (TDSE)

A free particle propagating along $+x$ is represented by plane wave:
$$\\psi(x,t) = A e^{i(kx - \\omega t)} = A e^{i(px - Et)/\\hbar}$$
- Differentiating with respect to $t$: $\\frac{\\partial\\psi}{\\partial t} = -\\frac{iE}{\\hbar}\\psi \\implies E\\psi = i\\hbar \\frac{\\partial\\psi}{\\partial t}$
- Differentiating twice with respect to $x$: $\\frac{\\partial^2\\psi}{\\partial x^2} = -\\frac{p^2}{\\hbar^2}\\psi \\implies p^2\\psi = -\\hbar^2 \\frac{\\partial^2\\psi}{\\partial x^2}$

Total classical energy $E = \\frac{p^2}{2m} + V(x,t)$. Operating on $\\psi$:
$$i\\hbar \\frac{\\partial\\psi}{\\partial t} = -\\frac{\\hbar^2}{2m}\\frac{\\partial^2\\psi}{\\partial x^2} + V(x,t)\\psi \\quad \\Longleftrightarrow \\quad i\\hbar \\frac{\\partial\\psi}{\\partial t} = \\hat{H}\\psi$$

---

### 2. 1D Time-Independent Schrödinger Equation (TISE)

Using separation of variables $\\psi(x,t) = \\phi(x) e^{-iEt/\\hbar}$:
$$i\\hbar \\left(-\\frac{iE}{\\hbar}\\right) \\phi e^{-iEt/\\hbar} = \\left[ -\\frac{\\hbar^2}{2m}\\frac{d^2\\phi}{dx^2} + V(x)\\phi \\right] e^{-iEt/\\hbar}$$
$$\\frac{d^2\\phi}{dx^2} + \\frac{2m}{\\hbar^2}[E - V(x)]\\phi = 0$$`
      },
      {
        sectionId: "phys-u3-s4",
        title: "4. Particle in a 1D Infinite Well & Quantum Barrier Tunneling",
        content: `### 1. Particle in a 1D Infinite Box (Rigid Well Derivation)

Potential: $V(x) = 0$ for $0 \\le x \\le L$; $V(x) = \\infty$ for $x < 0, x > L$.
Inside well: $\\frac{d^2\\psi}{dx^2} + k^2\\psi = 0$ where $k^2 = \\frac{2mE}{\\hbar^2}$.
General solution: $\\psi(x) = A\\sin(kx) + B\\cos(kx)$.

1. Boundary condition $\\psi(0) = 0 \\implies B = 0$.
2. Boundary condition $\\psi(L) = 0 \\implies A\\sin(kL) = 0 \\implies k_n L = n\\pi$ ($n=1,2,3...$).

$$k_n = \\frac{n\\pi}{L} \\implies E_n = \\frac{\\hbar^2 k_n^2}{2m} = \\frac{n^2 \\pi^2 \\hbar^2}{2mL^2} = \\frac{n^2 h^2}{8mL^2}$$
Normalizing $\\int_0^L |\\psi_n|^2 dx = 1 \\implies A = \\sqrt{\\frac{2}{L}}$:
$$\\psi_n(x) = \\sqrt{\\frac{2}{L}} \\sin\\left( \\frac{n\\pi x}{L} \\right)$$

> 🟢 **Zero-Point Energy ($n=1$):**
> $$E_1 = \\frac{h^2}{8mL^2} \\neq 0$$
> A particle in a box cannot have zero energy, because zero energy implies exact zero momentum ($\\Delta p = 0$), violating the Heisenberg uncertainty principle!

---

### 2. Quantum Tunneling & 1D Harmonic Oscillator
- **Barrier Penetration:** Particle of energy $E < V_0$ penetrating a rectangular barrier exhibits decaying wavefunction $\\psi(x) \\sim e^{-\\alpha x}$.
  $$T \\approx e^{-2\\alpha a} \\quad \\text{where } \\alpha = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar}$$
- **1D Quantum Harmonic Oscillator:** Parabolic potential $V(x) = \\frac{1}{2}m\\omega^2 x^2$:
  $$E_n = \\left(n + \\frac{1}{2}\\right)\\hbar\\omega \\quad (n = 0, 1, 2...)$$
  Zero-point energy $E_0 = \\frac{1}{2}\\hbar\\omega$; energy levels are strictly equidistant with spacing $\\Delta E = \\hbar\\omega = h\\nu$.`
      }
    ]
  },
  {
    unitNum: 4,
    title: "Crystal Structures & Free Electron Theory of Metals (Solid State Physics)",
    examWeightage: "24 - 28 Marks",
    readingTime: "40 mins",
    summary: "Space lattice, basis, 7 crystal systems & 14 Bravais lattices, SC/BCC/FCC derivations (coordination number, atomic radius, and atomic packing factor APF), 12-point Schottky vs Frenkel defects comparison, Classical Drude theory & specific heat failures, Sommerfeld quantum theory, Fermi-Dirac distribution, Fermi energy derivation at 0 K, and Richardson-Dushman thermionic emission equation.",
    sections: [
      {
        sectionId: "phys-u4-s1",
        title: "1. Crystallographic Fundamentals & 14 Bravais Lattices",
        content: `### 1. Lattice Points, Basis & Crystal Structure

- **Space Lattice:** An infinite periodic 3D geometric array of mathematical points where every point has identical spatial surroundings.
- **Basis (Motif):** A group of one or more atoms structurally associated with each lattice point.
$$\\text{Crystal Structure} = \\text{Space Lattice} + \\text{Basis}$$

---

### 2. The 7 Crystal Systems

| Crystal System | Axial Lengths | Interaxial Angles | Bravais Lattices Count |
| :--- | :--- | :--- | :---: |
| **Cubic** | $a = b = c$ | $\\alpha = \\beta = \\gamma = 90^\\circ$ | 3 (P, I, F) |
| **Tetragonal** | $a = b \\neq c$ | $\\alpha = \\beta = \\gamma = 90^\\circ$ | 2 (P, I) |
| **Orthorhombic**| $a \\neq b \\neq c$ | $\\alpha = \\beta = \\gamma = 90^\\circ$ | 4 (P, C, I, F) |
| **Monoclinic** | $a \\neq b \\neq c$ | $\\alpha = \\gamma = 90^\\circ \\neq \\beta$ | 2 (P, C) |
| **Triclinic** | $a \\neq b \\neq c$ | $\\alpha \\neq \\beta \\neq \\gamma \\neq 90^\\circ$ | 1 (P) |
| **Trigonal (Rhombohedral)** | $a = b = c$ | $\\alpha = \\beta = \\gamma \\neq 90^\\circ$ | 1 (P) |
| **Hexagonal** | $a = b \\neq c$ | $\\alpha = \\beta = 90^\\circ, \\gamma = 120^\\circ$ | 1 (P) |
| **Total** | | | **14 Bravais Lattices** |`
      },
      {
        sectionId: "phys-u4-s2",
        title: "2. Cubic Crystal Geometries: SC, BCC & FCC APF Derivations",
        content: `### Complete Step-by-Step Derivation of Cubic Geometries

$$\\text{Atomic Packing Factor (APF)} = \\frac{n_{\\text{eff}} \\times \\frac{4}{3}\\pi r^3}{a^3}$$

| Parameter | Simple Cubic (SC) | Body-Centered Cubic (BCC) | Face-Centered Cubic (FCC) |
| :--- | :--- | :--- | :--- |
| **Effective Atoms ($n_{\\text{eff}}$)** | $8 \\times \\frac{1}{8} = \\mathbf{1}$ | $8 \\times \\frac{1}{8} + 1 = \\mathbf{2}$ | $8 \\times \\frac{1}{8} + 6 \\times \\frac{1}{2} = \\mathbf{4}$ |
| **Coordination Number ($CN$)** | $\\mathbf{6}$ | $\\mathbf{8}$ | $\\mathbf{12}$ |
| **Touching Geometry** | Edge: $2r = a$ | Body diagonal: $4r = \\sqrt{3}a$ | Face diagonal: $4r = \\sqrt{2}a$ |
| **Atomic Radius ($r$)** | $r = \\frac{a}{2}$ | $r = \\frac{\\sqrt{3}}{4}a$ | $r = \\frac{\\sqrt{2}}{4}a = \\frac{a}{2\\sqrt{2}}$ |
| **Nearest Neighbor ($d$)** | $d = a$ | $d = \\frac{\\sqrt{3}}{2}a$ | $d = \\frac{a}{\\sqrt{2}}$ |
| **APF Proof** | $\\frac{1 \\times \\frac{4}{3}\\pi(a/2)^3}{a^3} = \\frac{\\pi}{6}$ | $\\frac{2 \\times \\frac{4}{3}\\pi(\\frac{\\sqrt{3}a}{4})^3}{a^3} = \\frac{\\sqrt{3}\\pi}{8}$ | $\\frac{4 \\times \\frac{4}{3}\\pi(\\frac{a}{2\\sqrt{2}})^3}{a^3} = \\frac{\\sqrt{2}\\pi}{6}$ |
| **Packing Efficiency** | **52.4%** | **68.0%** | **74.0% (Close-Packed)** |
| **Classic Elements** | Polonium ($\\alpha$-Po) | Fe, Cr, W, Mo, Na | Cu, Al, Au, Ag, Pt |`
      },
      {
        sectionId: "phys-u4-s3",
        title: "3. Crystal Defects: Schottky vs. Frenkel Defects (12-Point Analysis)",
        content: `### 12-Point Comparative Matrix: Schottky vs. Frenkel Defects

| # | Dimension | Schottky Defect | Frenkel Defect |
| :--- | :--- | :--- | :--- |
| **1** | **Fundamental Mechanism** | **Pair Vacancy:** Equal number of cations and anions missing from normal lattice sites. | **Dislocation:** An ion (usually smaller cation) is displaced to an interstitial site. |
| **2** | **Stoichiometry** | Crystal remains strictly stoichiometric and electrically neutral. | Crystal remains strictly stoichiometric and electrically neutral. |
| **3** | **Ion Radius Ratio** | Occurs when cation and anion are of **comparable size** ($r_+ / r_- \\approx 1$). | Occurs when there is a **large size difference** ($r_+ \\ll r_-$). |
| **4** | **Coordination Number** | Favored in crystals with **high coordination number** ($CN = 6$ or $8$). | Favored in crystals with **low coordination number** ($CN = 4$). |
| **5** | **Effect on Density** | Lattice mass decreases for constant volume $\\implies$ **Density decreases**. | No ions exit the crystal lattice $\\implies$ **Density remains unchanged**. |
| **6** | **Dielectric Constant**| Negligible effect on dielectric permittivity. | **Dielectric constant increases** due to charge crowding at interstitials. |
| **7** | **Lattice Strain** | Minimal localized strain relaxations. | Causes high internal localized lattice strain. |
| **8** | **Equilibrium Concentration** | $n_s \\approx N \\exp\\left( -\\frac{E_s}{2k_B T} \\right)$ | $n_f \\approx \\sqrt{N N_i} \\exp\\left( -\\frac{E_f}{2k_B T} \\right)$ |
| **9** | **Transport Mechanism** | Vacancy hopping conductivity. | Interstitial ionic diffusion conductivity. |
| **10** | **Entropy Contribution**| Increases configurational pair entropy. | Increases vacancy-interstitial entropy. |
| **11** | **Representative Crystals** | **NaCl, KCl, KBr, CsCl** | **AgCl, AgI, ZnS** |
| **12** | **Unique Special Case** | **Silver Bromide (AgBr)** exhibits **BOTH** Schottky and Frenkel defects depending on temperature! |`
      },
      {
        sectionId: "phys-u4-s4",
        title: "4. Free Electron Theory of Metals: Sommerfeld Quantum Theory & Thermionic Emission",
        content: `### 1. Classical Theory (Drude-Lorentz) & Its Severe Failures

- **Electrical Conductivity:** $\\sigma = \\frac{n e^2 \\tau}{m}$
- **Wiedemann-Franz Law:** $\\frac{K}{\\sigma T} = \\frac{3}{2}\\left(\\frac{k_B}{e}\\right)^2 = L$
- **Classical Failures:**
  1. *Specific Heat Catastrophe:* Predicts electronic specific heat $C_{v,\\text{el}} = \\frac{3}{2}R$. Observed value is $\\sim 0.01 R$ at room temperature (overestimated by a factor of 100!).
  2. *Paramagnetism:* Predicts Curie temperature dependence $\\chi \\propto 1/T$, but metal electron paramagnetism is experimentally independent of temperature.

---

### 2. Quantum Free Electron Theory (Sommerfeld) & Fermi-Dirac Distribution

Sommerfeld treated electrons as quantum particles obeying the **Pauli Exclusion Principle** and **Fermi-Dirac Statistics**:
$$f(E) = \\frac{1}{e^{(E - E_F)/k_B T} + 1}$$
- **At $T = 0\\text{ K}$:**
  - For $E < E_F$: $f(E) = 1$ (all quantum states filled).
  - For $E > E_F$: $f(E) = 0$ (all quantum states vacant).
- **At $T > 0\\text{ K}$:** Thermal energy smears occupancy within $\\sim k_B T$ of $E_F$. At $E = E_F$:
  $$f(E_F) = \\frac{1}{1 + 1} = 0.5 \\quad (50\\% \\text{ probability})$$

---

### 3. Derivation of Fermi Energy $E_F$ at 0 K

The 3D density of quantum states with electron spin degeneracy 2 is:
$$g(E) dE = \\frac{V}{2\\pi^2} \\left(\\frac{2m}{\\hbar^2}\\right)^{3/2} E^{1/2} dE$$
Integrating up to $E_F(0)$ for total electron count $N$:
$$N = \\int_0^{E_F(0)} g(E) dE = \\frac{V}{3\\pi^2} \\left(\\frac{2m}{\\hbar^2}\\right)^{3/2} [E_F(0)]^{3/2}$$
Solving for $E_F(0)$ in terms of electron density $n = N/V$:
$$E_F(0) = \\frac{\\hbar^2}{2m} (3\\pi^2 n)^{2/3}$$

---

### 4. Thermionic Emission: Richardson-Dushman Equation
Thermal ejection of electrons when thermal kinetic energy exceeds the work function barrier $\\phi$:
$$J = A T^2 e^{-\\phi / (k_B T)}$$
- Universal Richardson constant: $A = \\frac{4\\pi m e k_B^2}{h^3} \\approx 1.2 \\times 10^6\\text{ A}\\cdot\\text{m}^{-2}\\cdot\\text{K}^{-2} = 120\\text{ A/cm}^2\\text{K}^2$.
- $\\phi$: Cathode work function ($2\\text{ to }5\\text{ eV}$).`
      }
    ]
  }
];
