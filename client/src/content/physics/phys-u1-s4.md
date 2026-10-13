### 1. Fundamental Characteristics of Laser Light

LASER stands for **Light Amplification by Stimulated Emission of Radiation**.
1. **Extreme Monochromaticity:** Spectral linewidth $\Delta\lambda \approx 10^{-6}\text{ \AA}$.
2. **Directionality & Low Divergence:** Beam divergence angle $\theta < 1\text{ mrad}$.
3. **High Coherence:** Exceptional temporal coherence length (kilometers) and spatial wavefront coherence.
4. **Enormous Intensity:** Focused laser beams exceed solar core flux density ($>10^{12}\text{ W/cm}^2$).

---

### 2. Einstein's A and B Coefficients Derivation

Consider two atomic levels $E_1$ and $E_2$ in thermal equilibrium with radiation density $u(\nu)$ at temperature $T$:
1. **Absorption:** $R_{12} = B_{12} N_1 u(\nu)$
2. **Spontaneous Emission:** $R_{21,\text{sp}} = A_{21} N_2$
3. **Stimulated Emission:** $R_{21,\text{st}} = B_{21} N_2 u(\nu)$

At thermodynamic equilibrium: Rate of Upward Transitions = Rate of Downward Transitions:
$$B_{12} N_1 u(\nu) = A_{21} N_2 + B_{21} N_2 u(\nu) \implies u(\nu) = \frac{A_{21}}{B_{12}\frac{N_1}{N_2} - B_{21}}$$
From Maxwell-Boltzmann statistics: $N_1/N_2 = e^{(E_2 - E_1)/k_B T} = e^{h\nu/k_B T}$:
$$u(\nu) = \frac{A_{21}}{B_{21}} \left[ \frac{1}{\frac{B_{12}}{B_{21}} e^{h\nu/k_B T} - 1} \right]$$
Comparing directly with **Planck's Law of Blackbody Radiation**:
$$u(\nu) = \frac{8\pi h \nu^3}{c^3} \left[ \frac{1}{e^{h\nu/k_B T} - 1} \right]$$
We arrive at two fundamental Einstein identities:
$$B_{12} = B_{21} \qquad \frac{A_{21}}{B_{21}} = \frac{8\pi h \nu^3}{c^3} \propto \nu^3$$
*Physical Implication:* The probability of spontaneous emission increases dramatically with frequency $\nu^3$, explaining why gamma-ray and X-ray lasers require astronomical pumping powers compared to microwave MASERs.

---

### 3. Population Inversion & Metastable States
Under thermal equilibrium, $N_1 > N_2$. For net optical gain, one must enforce **Population Inversion ($N_2 > N_1$)**. This is achieved by pumping atoms into a **Metastable State** having an unusually long lifetime ($\sim 10^{-3}\text{ s}$ compared to normal $10^{-8}\text{ s}$).

---

### 4. Four-Level Helium-Neon (He-Ne) Gas Laser
- **Active Medium:** Gas mixture of Helium and Neon in a 10:1 ratio at low pressure ($\sim 1\text{ torr}$).
- **Pumping Mechanism:** High-voltage DC electrical discharge. Fast electrons excite He atoms from ground state $1^1S_0$ to metastable levels $2^1S_0$ ($20.61\text{ eV}$) and $2^3S_1$ ($19.82\text{ eV}$).
- **Resonant Energy Transfer:** Excited He atoms collide inelastically with ground state Neon atoms, transferring energy with minimal mismatch ($\Delta E \approx 0.05\text{ eV}$) to excite Neon into $3s$ ($20.66\text{ eV}$) and $2s$ ($19.78\text{ eV}$) states.
- **Laser Emission:** Stimulated radiative transition occurs from Neon $3s \to 2p$, emitting a continuous, highly coherent red laser beam at:
  $$\lambda = 632.8\text{ nm}$$
- **Depopulation:** Fast spontaneous decay occurs from $2p \to 1s$, followed by non-radiative de-excitation to the ground state via physical collisions with the capillary tube walls.