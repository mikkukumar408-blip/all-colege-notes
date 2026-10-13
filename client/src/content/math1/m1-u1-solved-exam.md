### MMDU Official University Solved Examination Questions (Unit 1)
**Course:** Mathematics I (`BMAT-001`)  
**Pattern:** Sections A (1 Mark Compulsory), B (2 Marks Analytical), C (4 Marks Short Long), D (6 Marks Long)

---

<example level="easy" title="Question 1 (1 Mark): Rank of a Matrix & Row Echelon Form">
**Question:**  
Define the rank of a matrix and state the rank of a matrix in Row Echelon Form.

**Step-by-Step Solution:**
The rank $\rho(A)$ of an $m \times n$ matrix $A$ is the order of its largest non-vanishing minor (or the number of linearly independent rows). In Row Echelon Form, $\rho(A)$ equals the **total number of non-zero rows**.

<div class="example-answer-box">
🎯 **Verified Result:** $\rho(A) = \text{Number of non-zero rows in echelon form}$.
</div>
</example>

---

<example level="easy" title="Question 2 (1 Mark): Eigenvalues of Upper Triangular Matrix">
**Question:**  
Find the sum and product of the eigenvalues of $A = \begin{bmatrix} 3 & 1 & 4 \\ 0 & 2 & 6 \\ 0 & 0 & 5 \end{bmatrix}$.

**Step-by-Step Solution:**
Since $A$ is upper triangular, its eigenvalues are its diagonal elements: $\lambda_1 = 3, \lambda_2 = 2, \lambda_3 = 5$.
- **Sum of eigenvalues** $= \text{Tr}(A) = 3 + 2 + 5 = 10$.
- **Product of eigenvalues** $= |A| = 3 \times 2 \times 5 = 30$.

<div class="example-answer-box">
🎯 **Verified Result:** Sum $= 10$, Product $= 30$.
</div>
</example>

---

<example level="medium" title="Question 13 (2 Marks): Inverse via Cayley-Hamilton Theorem">
**Question:**  
State Cayley-Hamilton Theorem. If $A^2 - 4A + 3I = 0$, find $A^{-1}$ in terms of $A$ and $I$.

**Step-by-Step Solution:**
Every square matrix satisfies its own characteristic equation $|A - \lambda I| = 0$.
Pre-multiplying $A^2 - 4A + 3I = 0$ by $A^{-1}$:
$$A - 4I + 3A^{-1} = 0 \implies A^{-1} = \frac{1}{3}(4I - A)$$

<div class="example-answer-box">
🎯 **Verified Result:** $A^{-1} = \frac{1}{3}(4I - A)$.
</div>
</example>