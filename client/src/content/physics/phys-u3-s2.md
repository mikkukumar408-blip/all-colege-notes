### 1. Physical Meaning of Wave Function $\psi$

The wave function $\psi(\vec{r},t)$ is a complex probability amplitude. Max Born formulated its statistical interpretation:
$$P(\vec{r},t) dV = |\psi(\vec{r},t)|^2 dV = \psi^* \psi \, dV$$

#### Well-Behaved Wave Function Conditions:
1. $\psi$ must be **finite and continuous** everywhere.
2. $\psi$ must be **single-valued** at all spatial coordinates.
3. The spatial gradient $\frac{\partial\psi}{\partial x}$ must be continuous across boundaries.
4. $\psi$ must be **square-integrable (normalizable)**:
   $$\int_{-\infty}^{+\infty} |\psi|^2 dV = 1$$

---

### 2. Quantum Operators & Expectation Values

| Observable | Quantum Operator | Expectation Value Formula |
| :--- | :--- | :--- |
| **Position $x$** | $\hat{x} = x$ | $\langle x \rangle = \int \psi^* x \psi \, dx$ |
| **Momentum $p_x$** | $\hat{p}_x = -i\hbar \frac{\partial}{\partial x}$ | $\langle p_x \rangle = \int \psi^* \left(-i\hbar \frac{\partial}{\partial x}\right) \psi \, dx$ |
| **Energy $E$** | $\hat{E} = i\hbar \frac{\partial}{\partial t}$ | $\langle E \rangle = \int \psi^* \left(i\hbar \frac{\partial}{\partial t}\right) \psi \, dx$ |
| **Hamiltonian $H$** | $\hat{H} = -\frac{\hbar^2}{2m}\nabla^2 + V$ | $\langle H \rangle = \int \psi^* \hat{H} \psi \, dV$