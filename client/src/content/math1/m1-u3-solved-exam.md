### MMDU Official University Solved Examination Questions (Unit 3)
**Course:** Mathematics I (`BMAT-001`)  
**Pattern:** Sections A (1 Mark Compulsory), B (2 Marks Analytical), C (4 Marks Short Long), D (6 Marks Long)

---

<example level="easy" title="Question 7 (1 Mark): Homogeneous Degree via Euler's Theorem">
**Question:**  
Find the degree of homogeneity for $u(x, y) = \frac{x^3 + y^3}{x - y}$ and evaluate $x u_x + y u_y$.

**Step-by-Step Solution:**
Since $u(tx, ty) = \frac{t^3(x^3 + y^3)}{t(x - y)} = t^2 u(x, y)$, the degree is $n = 2$. By Euler's theorem, $x u_x + y u_y = 2u$.

<div class="example-answer-box">
🎯 **Verified Result:** Degree $n = 2$ | $x u_x + y u_y = 2u$.
</div>
</example>

---

<example level="hard" title="Question 19 (4 Marks): Two-Variable Extrema Determination">
**Question:**  
Find and classify all local extrema and saddle points of $f(x, y) = x^3 + y^3 - 3axy$ ($a > 0$).

**Step-by-Step Solution:**
Stationary system: $f_x = 3x^2 - 3ay = 0$ and $f_y = 3y^2 - 3ax = 0 \implies$ critical points $(0, 0)$ and $(a, a)$.
With $r = 6x, s = -3a, t = 6y$ and $\Delta = rt - s^2 = 36xy - 9a^2$:
- At $(0, 0)$: $\Delta = -9a^2 < 0 \implies$ **Saddle Point**.
- At $(a, a)$: $\Delta = 27a^2 > 0, r = 6a > 0 \implies$ **Local Minimum** with $f_{\min} = -a^3$.

<div class="example-answer-box">
🎯 **Verified Result:** $(0, 0)$ is a Saddle Point; $(a, a)$ is a Local Minimum with value $-a^3$.
</div>
</example>

---

<example level="hard" title="Question 23 (6 Marks): Constrained Optimization via Lagrange Multipliers">
**Question:**  
Find the maximum and minimum distances from the origin to the ellipsoid $\frac{x^2}{a^2} + \frac{y^2}{b^2} + \frac{z^2}{c^2} = 1$ ($a > b > c > 0$).

**Step-by-Step Solution:**
Using $F = (x^2 + y^2 + z^2) + \lambda\left(\frac{x^2}{a^2} + \frac{y^2}{b^2} + \frac{z^2}{c^2} - 1\right)$, setting $F_x = F_y = F_z = 0$ yields $\lambda = -a^2, -b^2, -c^2$, corresponding to distances $d_{\max} = a$ and $d_{\min} = c$.

<div class="example-answer-box">
🎯 **Verified Result:** Maximum distance $= a$ | Minimum distance $= c$.
</div>
</example>