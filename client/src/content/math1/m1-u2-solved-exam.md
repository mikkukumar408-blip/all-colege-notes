### MMDU Official University Solved Examination Questions (Unit 2)
**Course:** Mathematics I (`BMAT-001`)  
**Pattern:** Sections A (1 Mark Compulsory), B (2 Marks Analytical), C (4 Marks Short Long), D (6 Marks Long)

---

<example level="easy" title="Question 4 (1 Mark): Geometric Interpretation of Rolle's Theorem">
**Question:**  
State the geometric meaning of the point $c$ in Rolle's Theorem.

**Step-by-Step Solution:**
If a continuous, differentiable curve $y = f(x)$ has equal values at the endpoints $f(a) = f(b)$, there exists at least one interior point $c \in (a, b)$ where $f'(c) = 0$, meaning the **tangent line at $(c, f(c))$ is parallel to the $x$-axis**.

<div class="example-answer-box">
🎯 **Verified Result:** Horizontal tangent parallel to $x$-axis at $x = c$.
</div>
</example>

---

<example level="medium" title="Question 14 (2 Marks): Radius of Curvature of Catenary Curve">
**Question:**  
Find the radius of curvature $\rho$ for the catenary $y = c \cosh(x / c)$.

**Step-by-Step Solution:**
Given $y = c \cosh(x/c)$, we have $y_1 = \sinh(x/c)$ and $y_2 = \frac{1}{c}\cosh(x/c)$.
Since $1 + y_1^2 = 1 + \sinh^2(x/c) = \cosh^2(x/c)$:
$$\rho = \frac{(1 + y_1^2)^{3/2}}{y_2} = \frac{\cosh^3(x/c)}{\frac{1}{c}\cosh(x/c)} = c \cosh^2(x/c) = \frac{y^2}{c}$$

<div class="example-answer-box">
🎯 **Verified Result:** $\mathbf{\rho = \frac{y^2}{c}}$.
</div>
</example>

---

<example level="hard" title="Question 22 (6 Marks): Relation Between Beta and Gamma Functions">
**Question:**  
State and prove $B(m, n) = \frac{\Gamma(m)\Gamma(n)}{\Gamma(m+n)}$ and hence evaluate $\int_0^{\pi/2} \sqrt{\tan\theta}\,d\theta$.

**Step-by-Step Solution:**
Using polar coordinates $x = r\cos\theta, y = r\sin\theta$ in $\Gamma(m)\Gamma(n) = 4\int_0^\infty \int_0^\infty e^{-(x^2+y^2)} x^{2m-1} y^{2n-1} dx\,dy$ yields $\Gamma(m)\Gamma(n) = B(m, n)\Gamma(m+n)$.
For $\int_0^{\pi/2} \sin^{1/2}\theta \cos^{-1/2}\theta\,d\theta$: here $p = 1/2, q = -1/2$, so:
$$I = \frac{\Gamma(3/4)\Gamma(1/4)}{2\Gamma(1)} = \frac{1}{2} \cdot \frac{\pi}{\sin(\pi/4)} = \frac{\pi}{\sqrt{2}}$$

<div class="example-answer-box">
🎯 **Verified Result:** $\mathbf{\int_0^{\pi/2} \sqrt{\tan\theta}\,d\theta = \frac{\pi}{\sqrt{2}}}$.
</div>
</example>