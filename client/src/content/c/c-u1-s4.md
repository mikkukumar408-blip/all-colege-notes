### 1. Asymptotic Complexity: Big-O Mathematical Taxonomy

Big-O notation characterizes the upper bound of resource consumption (time or memory space) as input size $N$ tends to infinity:

| Notation | Complexity Name | Growth Rate for $N = 1000$ | Canonical C Algorithm |
| :--- | :--- | :--- | :--- |
| **O(1)** | Constant Time | 1 operation | Array indexing `A[i]`, pointer dereference `*p`. |
| **O(log N)** | Logarithmic Time | $\approx 10$ operations | Binary search in sorted array (halves problem space each step). |
| **O(N)** | Linear Time | 1,000 operations | Linear sequential search, single-pass array traversal. |
| **O(N log N)** | Linearithmic Time | $\approx 10,000$ operations | Merge Sort, Quick Sort (average case divide & conquer). |
| **O(N²)** | Quadratic Time | 1,000,000 operations | Bubble Sort, Selection Sort, nested 2D matrix iteration. |

---

### 2. Dry-Run Variable Execution Trace Table

A **Dry Run** is a manual code simulation tracing variable states against line numbers to expose logic defects:

```c
int sum = 0;
for (int i = 1; i <= 3; i++) {
    sum += i;
}
```

**Trace Table:**

| Step | Source Line | Variable `i` | Condition `i <= 3` | Variable `sum` | Step Action Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **0** | Line 1 | Undefined | - | 0 | Initialization of accumulator `sum = 0`. |
| **1** | Line 2 | 1 | 1 <= 3 (True) | 0 | Loop init `i = 1`; entry condition holds. |
| **2** | Line 3 | 1 | - | 1 | Accumulate: `sum = 0 + 1 = 1`. |
| **3** | Line 2 | 2 | 2 <= 3 (True) | 1 | Increment `i++`; condition holds. |
| **4** | Line 3 | 2 | - | 3 | Accumulate: `sum = 1 + 2 = 3`. |
| **5** | Line 2 | 3 | 3 <= 3 (True) | 3 | Increment `i++`; condition holds. |
| **6** | Line 3 | 3 | - | 6 | Accumulate: `sum = 3 + 3 = 6`. |
| **7** | Line 2 | 4 | 4 <= 3 (False) | 6 | Increment `i++`; condition fails ➔ Loop terminates! |