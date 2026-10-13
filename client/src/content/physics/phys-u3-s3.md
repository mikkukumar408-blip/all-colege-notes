### 1. 1D Time-Dependent Schrödinger Equation (TDSE)

A free particle propagating along $+x$ is represented by plane wave:
$$\psi(x,t) = A e^{i(kx - \omega t)} = A e^{i(px - Et)/\hbar}$$
- Differentiating with respect to $t$: $\frac{\partial\psi}{\partial t} = -\frac{iE}{\hbar}\psi \implies E\psi = i\hbar \frac{\partial\psi}{\partial t}$
- Differentiating twice with respect to $x$: $\frac{\partial^2\psi}{\partial x^2} = -\frac{p^2}{\hbar^2}\psi \implies p^2\psi = -\hbar^2 \frac{\partial^2\psi}{\partial x^2}$

Total classical energy $E = \frac{p^2}{2m} + V(x,t)$. Operating on $\psi$:
$$i\hbar \frac{\partial\psi}{\partial t} = -\frac{\hbar^2}{2m}\frac{\partial^2\psi}{\partial x^2} + V(x,t)\psi \quad \Longleftrightarrow \quad i\hbar \frac{\partial\psi}{\partial t} = \hat{H}\psi$$

---

### 2. 1D Time-Independent Schrödinger Equation (TISE)

Using separation of variables $\psi(x,t) = \phi(x) e^{-iEt/\hbar}$:
$$i\hbar \left(-\frac{iE}{\hbar}\right) \phi e^{-iEt/\hbar} = \left[ -\frac{\hbar^2}{2m}\frac{d^2\phi}{dx^2} + V(x)\phi \right] e^{-iEt/\hbar}$$
$$\frac{d^2\phi}{dx^2} + \frac{2m}{\hbar^2}[E - V(x)]\phi = 0$$