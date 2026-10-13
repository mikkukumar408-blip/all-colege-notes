### MMDU Official University Solved Examination Questions (Unit 4)
**Course:** Mathematics I (`BMAT-001`)  
**Pattern:** Sections A (1 Mark Compulsory), B (2 Marks Analytical), C (4 Marks Short Long), D (6 Marks Long)

---

<example level="easy" title="Question 10 (1 Mark): Failure of Ratio Test on p-Series">
**Question:**  
Why does D'Alembert's Ratio Test fail on the $p$-series $\sum \frac{1}{n^p}$?

**Step-by-Step Solution:**
Because $L = \lim_{n \to \infty} \frac{u_n}{u_{n+1}} = \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^p = 1^p = 1$ for every $p$, so the Ratio Test provides no conclusion and Raabe's Test must be used.

<div class="example-answer-box">
🎯 **Verified Result:** $L = 1$ for all $p$, hence Ratio Test fails.
</div>
</example>

---

<example level="hard" title="Question 20 (4 Marks): Raabe's Test on Higher-Order Series">
**Question:**  
Test the convergence of $1 + \frac{1}{2}\cdot\frac{1}{3} + \frac{1\cdot 3}{2\cdot 4}\cdot\frac{1}{5} + \frac{1\cdot 3\cdot 5}{2\cdot 4\cdot 6}\cdot\frac{1}{7} + \dots$

**Step-by-Step Solution:**
Here $\frac{u_n}{u_{n+1}} = \frac{2n+2}{2n+1} \cdot \frac{2n+3}{2n+1} = \frac{4n^2 + 10n + 6}{4n^2 + 4n + 1} \to 1$ (Ratio Test fails).
Applying Raabe's Test:
$$R = \lim_{n \to \infty} n\left(\frac{u_n}{u_{n+1}} - 1\right) = \lim_{n \to \infty} \frac{6n^2 + 5n}{4n^2 + 4n + 1} = \frac{6}{4} = \frac{3}{2} > 1$$
Hence the series is **Convergent**.

<div class="example-answer-box">
🎯 **Verified Result:** Convergent by Raabe's Test ($R = 1.5 > 1$).
</div>
</example>

---

<example level="hard" title="Question 24 (6 Marks): Full Fourier Expansion of Discontinuous Square Wave">
**Question:**  
Obtain the Fourier series expansion for $f(x) = -k$ on $(-\pi, 0)$ and $f(x) = +k$ on $(0, \pi)$. Hence deduce $1 - \frac{1}{3} + \frac{1}{5} - \frac{1}{7} + \dots = \frac{\pi}{4}$.

**Step-by-Step Solution:**
Since $f(x)$ is odd, $a_0 = 0, a_n = 0$, and $b_n = \frac{2}{\pi}\int_0^\pi k\sin(nx)dx = \frac{2k}{n\pi}[1 - (-1)^n] = \frac{4k}{n\pi}$ for odd $n$.
$$f(x) = \frac{4k}{\pi}\left(\sin x + \frac{\sin 3x}{3} + \frac{\sin 5x}{5} + \dots\right)$$
Substituting $x = \frac{\pi}{2}$ where $f(\pi/2) = k$ yields $1 - \frac{1}{3} + \frac{1}{5} - \frac{1}{7} + \dots = \frac{\pi}{4}$.

<div class="example-answer-box">
🎯 **Verified Result:** $f(x) = \frac{4k}{\pi}\sum_{n=1,3,5\dots}\frac{\sin nx}{n}$ | Gregory-Leibniz series $\frac{\pi}{4}$ proved.
</div>
</example>