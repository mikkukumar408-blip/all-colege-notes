### Searching & Sorting Master Comparative Matrix

| Algorithm | Preconditions | Best Time | Worst Time | Space | Core Operational Principle |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Linear Search** | None (Unordered) | $O(1)$ | $O(N)$ | $O(1)$ | Sequentially compares search key against indices $0$ to $N-1$. |
| **Binary Search** | **Array must be sorted!** | $O(1)$ | $O(log N)$ | $O(1)$ | Computes `mid = low + (high-low)/2`; halves search space each step. |
| **Bubble Sort** | None | $O(N)$ (optimized) | $O(N^2)$ | $O(1)$ | Repeatedly compares adjacent elements and swaps them, sinking maximum to the end. |

---

### Bubble Sort Step-by-Step Pass Trace

Tracing `[64, 34, 25, 12, 22, 11, 90]`:
- **Initial:** `[64, 34, 25, 12, 22, 11, 90]`
- **Pass 1:** Sinks **90** to index 6 ➔ `[34, 25, 12, 22, 11, 64, 90]`
- **Pass 2:** Sinks **64** to index 5 ➔ `[25, 12, 22, 11, 34, 64, 90]`
- **Pass 3:** Sinks **34** to index 4 ➔ `[12, 22, 11, 25, 34, 64, 90]`
- **Pass 4:** Sinks **25** to index 3 ➔ `[12, 11, 22, 25, 34, 64, 90]`
- **Pass 5:** Sinks **22** to index 2 ➔ `[11, 12, 22, 25, 34, 64, 90]`
- **Pass 6:** Zero swaps detected ➔ **Array completely sorted in $O(N)$ optimized time!**