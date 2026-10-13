### 1. Computational Problem Classifications

In computer science and software engineering, computational problems are systematically categorized based on the nature of their output space:

1. **Decision Problems:** Problems requiring a deterministic Boolean output (`True` or `False`, `1` or `0`). Example: Given an integer $N$, decide whether $N$ is prime.
2. **Counting Problems:** Problems that compute the cardinality of valid solutions satisfying specific constraints. Example: Counting the number of distinct paths in a grid.
3. **Optimization Problems:** Problems requiring the identification of the globally best candidate among all feasible configurations according to an objective function. Example: Shortest path routing in network packet switching.

---

### 2. Logic Paradigms: Deductive vs. Inductive Reasoning

Program construction and formal algorithmic proofs rely on two core logic frameworks:

| # | Dimension | Deductive Logic | Inductive Logic |
| :--- | :--- | :--- | :--- |
| **1** | **Direction** | **Top-Down:** Starts with general axioms/theories and deduces specific guaranteed truths. | **Bottom-Up:** Starts with specific empirical observations and infers general probabilistic patterns. |
| **2** | **Validation Guarantee** | **Guaranteed Absolute Truth:** If premises are valid and logic rules hold, conclusions are incontrovertible. | **Probabilistic / Plausible:** True for observed training sample, but unverified for unobserved edge cases. |
| **3** | **Software Role** | Formal program verification, loop invariants, and algorithmic correctness proofs. | Test-driven development (TDD), heuristic AI search, and empirical profiling. |
| **4** | **C Engineering Example** | Proving loop invariant: If loop starts at `i=0` and increments by 1, `while(i < N)` executes exactly $N$ iterations. | Running 10 unit test cases with positive inputs: it suggests the code works, but does not mathematically prove absence of memory leaks. |