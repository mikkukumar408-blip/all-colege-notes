### 1. Particle in a 1D Infinite Box (Rigid Well Derivation)

Potential: $V(x) = 0$ for $0 \le x \le L$; $V(x) = \infty$ for $x < 0, x > L$.
Inside well: $\frac{d^2\psi}{dx^2} + k^2\psi = 0$ where $k^2 = \frac{2mE}{\hbar^2}$.
General solution: $\psi(x) = A\sin(kx) + B\cos(kx)$.

1. Boundary condition $\psi(0) = 0 \implies B = 0$.
2. Boundary condition $\psi(L) = 0 \implies A\sin(kL) = 0 \implies k_n L = n\pi$ ($n=1,2,3...$).

$$k_n = \frac{n\pi}{L} \implies E_n = \frac{\hbar^2 k_n^2}{2m} = \frac{n^2 \pi^2 \hbar^2}{2mL^2} = \frac{n^2 h^2}{8mL^2}$$
Normalizing $\int_0^L |\psi_n|^2 dx = 1 \implies A = \sqrt{\frac{2}{L}}$:
$$\psi_n(x) = \sqrt{\frac{2}{L}} \sin\left( \frac{n\pi x}{L} \right)$$

> 🟢 **Zero-Point Energy ($n=1$):**
> $$E_1 = \frac{h^2}{8mL^2} \neq 0$$
> A particle in a box cannot have zero energy, because zero energy implies exact zero momentum ($\Delta p = 0$), violating the Heisenberg uncertainty principle!

---

### 2. Quantum Tunneling & 1D Harmonic Oscillator
- **Barrier Penetration:** Particle of energy $E < V_0$ penetrating a rectangular barrier exhibits decaying wavefunction $\psi(x) \sim e^{-\alpha x}$.
  $$T \approx e^{-2\alpha a} \quad \text{where } \alpha = \frac{\sqrt{2m(V_0 - E)}}{\hbar}$$
- **1D Quantum Harmonic Oscillator:** Parabolic potential $V(x) = \frac{1}{2}m\omega^2 x^2$:
  $$E_n = \left(n + \frac{1}{2}\right)\hbar\omega \quad (n = 0, 1, 2...)$$
  Zero-point energy $E_0 = \frac{1}{2}\hbar\omega$; energy levels are strictly equidistant with spacing $\Delta E = \hbar\omega = h\nu$.