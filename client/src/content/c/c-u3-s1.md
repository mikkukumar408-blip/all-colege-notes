### 1. Array Memory Architecture

An array is a homogeneous collection of elements stored sequentially in contiguous memory locations.
- **1D Array Physical Address Formula:**
  $$\text{Address}(A[i]) = \text{Base Address} + (i \times \text{sizeof}(T))$$

---

### 2. Mathematical Derivation: 2D Array Row-Major Order

In C, multi-dimensional arrays are mapped into linear RAM in **Row-Major Order** (row 0 stored first, followed by row 1, etc.).

For an array declared as `T A[R][C]` with base address `Base` and element size `S`:
- To locate element `A[i][j]`, the program must skip `i` full preceding rows.
- Each row contains exactly `C` columns (elements).
- Within row `i`, the program must skip `j` preceding column elements.

$$\text{Total Elements Skipped} = (i \times C) + j$$
$$\mathbf{\text{Address}(A[i][j]) = \text{Base Address} + left[(i \times C) + j\right] \times \text{sizeof}(T)}$$

> 🟢 **Numerical Examination Example:**
> Given `int A[4][5]` starting at `Base = 2000` with `sizeof(int) = 4` bytes:
> Find the physical address of element `A[2][3]`:
> - `i = 2, C = 5, j = 3, S = 4`
> - $\text{Offset} = (2 \times 5 + 3) \times 4 = 13 \times 4 = 52\text{ bytes}$
> - $\text{Address}(A[2][3]) = 2000 + 52 = mathbf{2052}$