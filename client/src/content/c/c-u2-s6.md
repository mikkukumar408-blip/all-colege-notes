### University Solved Examination Problems (MMDU Pattern)

#### Question 4 (1 Mark): Operator Precedence Evaluation
**Question:** Evaluate the expression order for: `int x = 2, y = 3; int z = x + y * ++x;`
```
Binary Operator Tree with root '+' having left operand 'x' and right subtree 'y * (++x)'.
```

**Step-by-Step Solution:**
1. Prefix increment `++x` (tier 2 unary) executes first: `x` becomes `3`.
2. Multiplicative operator `*` (tier 3) evaluates: `y * x = 3 * 3 = 9`.
3. Additive operator `+` (tier 4) evaluates: `x + 9 = 3 + 9 = 12`.  
**Result:** `z = 12`.

---

#### Question 14 (2 Marks): Short-Circuit Logic Evaluation
**Question:** What are the final values of `a` and `b` after executing:
```c
int a = 0, b = 5;
if (a && ++b) { /* empty */ }
```

**Step-by-Step Solution:**
```
Left Operand (a == 0) is FALSE ➔ Short-Circuit Triggered ➔ Right expression (++b) is BYPASSED!
```
Under ANSI C rules for logical `&&`, if the left operand evaluates to `0` (false), the outcome is guaranteed false. The compiler bypasses evaluation of the right operand. Thus, `++b` is never executed, and `b` remains **5**.  
**Final Values:** `a = 0, b = 5`.

---

#### Question 18 (4 Marks): Nested Loop Matrix Multiplication
**Question:** Explain the 3-tier nested loop structure required for multiplying matrices $A_{M 	\times K}$ and $B_{K 	\times N}$.

**Step-by-Step Solution:**
```
Outer Loop (i: 0 to M-1) ➔ Iterates across Rows of Matrix A
  Middle Loop (j: 0 to N-1) ➔ Iterates across Columns of Matrix B
    Inner Accumulator (k: 0 to K-1) ➔ Dot product: C[i][j] += A[i][k] * B[k][j]
```

```c
void multiplyMatrices(int A[2][2], int B[2][2], int C[2][2]) {
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            C[i][j] = 0;
            for (int k = 0; k < 2; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
}
```
**Complexity:** Executes $M 	\times N 	\times K$ times, yielding time complexity $O(M · N · K)$ ($O(N^3)$ for square matrices).