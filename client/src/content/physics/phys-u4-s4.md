### 1. Classical Theory (Drude-Lorentz) & Its Severe Failures

- **Electrical Conductivity:** $\sigma = \frac{n e^2 \tau}{m}$
- **Wiedemann-Franz Law:** $\frac{K}{\sigma T} = \frac{3}{2}\left(\frac{k_B}{e}\right)^2 = L$
- **Classical Failures:**
  1. *Specific Heat Catastrophe:* Predicts electronic specific heat $C_{v,\text{el}} = \frac{3}{2}R$. Observed value is $\sim 0.01 R$ at room temperature (overestimated by a factor of 100!).
  2. *Paramagnetism:* Predicts Curie temperature dependence $\chi \propto 1/T$, but metal electron paramagnetism is experimentally independent of temperature.

---

### 2. Quantum Free Electron Theory (Sommerfeld) & Fermi-Dirac Distribution

Sommerfeld treated electrons as quantum particles obeying the **Pauli Exclusion Principle** and **Fermi-Dirac Statistics**:
$$f(E) = \frac{1}{e^{(E - E_F)/k_B T} + 1}$$
- **At $T = 0\text{ K}$:**
  - For $E < E_F$: $f(E) = 1$ (all quantum states filled).
  - For $E > E_F$: $f(E) = 0$ (all quantum states vacant).
- **At $T > 0\text{ K}$:** Thermal energy smears occupancy within $\sim k_B T$ of $E_F$. At $E = E_F$:
  $$f(E_F) = \frac{1}{1 + 1} = 0.5 \quad (50\% \text{ probability})$$

---

### 3. Derivation of Fermi Energy $E_F$ at 0 K

The 3D density of quantum states with electron spin degeneracy 2 is:
$$g(E) dE = \frac{V}{2\pi^2} \left(\frac{2m}{\hbar^2}\right)^{3/2} E^{1/2} dE$$
Integrating up to $E_F(0)$ for total electron count $N$:
$$N = \int_0^{E_F(0)} g(E) dE = \frac{V}{3\pi^2} \left(\frac{2m}{\hbar^2}\right)^{3/2} [E_F(0)]^{3/2}$$
Solving for $E_F(0)$ in terms of electron density $n = N/V$:
$$E_F(0) = \frac{\hbar^2}{2m} (3\pi^2 n)^{2/3}$$

---

### 4. Thermionic Emission: Richardson-Dushman Equation
Thermal ejection of electrons when thermal kinetic energy exceeds the work function barrier $\phi$:
$$J = A T^2 e^{-\phi / (k_B T)}$$
- Universal Richardson constant: $A = \frac{4\pi m e k_B^2}{h^3} \approx 1.2 \times 10^6\text{ A}\cdot\text{m}^{-2}\cdot\text{K}^{-2} = 120\text{ A/cm}^2\text{K}^2$.
- $\phi$: Cathode work function ($2\text{ to }5\text{ eV}$).