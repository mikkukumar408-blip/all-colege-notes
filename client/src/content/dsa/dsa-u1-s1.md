### 1. Mathematical Notation & Asymptotic Bounds

In algorithmic analysis, **asymptotic notation** describes the limiting behavior of an algorithm's execution time or memory footprint as input size n approaches infinity:

- **Big-O (O) — Asymptotic Upper Bound:**
  f(n) = O(g(n)) if and only if there exist positive constants c > 0 and n₀ ≥ 1 such that 0 ≤ f(n) ≤ c · g(n) for all n ≥ n₀.
  Represents the mathematical **worst-case** performance guarantee.

- **Big-Omega (Ω) — Asymptotic Lower Bound:**
  f(n) = Ω(g(n)) if and only if there exist positive constants c > 0 and n₀ ≥ 1 such that 0 ≤ c · g(n) ≤ f(n) for all n ≥ n₀.
  Represents the mathematical **best-case** performance bound.

- **Big-Theta (Θ) — Asymptotically Tight Bound:**
  f(n) = Θ(g(n)) if and only if there exist positive constants c₁, c₂ > 0 and n₀ ≥ 1 such that c₁ · g(n) ≤ f(n) ≤ c₂ · g(n) for all n ≥ n₀.
  Holds when an algorithm is bounded both from above and below by the same growth rate.

### 2. Standard Hierarchy of Algorithmic Growth Rates
O(1) < O(log n) < O(√n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!)

### 3. Master Theorem for Divide-and-Conquer Recurrences
For recurrences of the standard form T(n) = a·T(n/b) + f(n) where a ≥ 1, b > 1, and f(n) = Θ(n^k · log^p n):
1. **Case 1:** If log_b(a) > k ⟹ T(n) = Θ(n^(log_b a)).
2. **Case 2:** If log_b(a) = k:
   - If p > -1 ⟹ T(n) = Θ(n^k · log^(p+1) n).
   - If p = -1 ⟹ T(n) = Θ(n^k · log log n).
3. **Case 3:** If log_b(a) < k and regularity condition a·f(n/b) ≤ c·f(n) holds ⟹ T(n) = Θ(f(n)).