### 1. Sequential Storage & Memory Mapping Formulas

Because physical computer RAM is linear (1D byte-addressable memory), multi-dimensional arrays must be flattened deterministically.

Let:
- B = Base Address (memory address of first element A[L] or A[L₁][L₂]).
- W = Width of each element in bytes (e.g., 4 bytes for int, 8 for double).
- L₁, L₂, L₃ = Lower bounds; U₁, U₂, U₃ = Upper bounds.
- M = (U₁ - L₁ + 1) (total rows); N = (U₂ - L₂ + 1) (total columns); P = (U₃ - L₃ + 1) (depth/planes).

#### 1D Array Addressing:
Loc(A[i]) = B + (i - L) × W

#### 2D Array Row-Major Order (RMO) — Stored Row by Row:
Loc(A[i][j]) = B + [(i - L₁) × N + (j - L₂)] × W

#### 2D Array Column-Major Order (CMO) — Stored Column by Column:
Loc(A[i][j]) = B + [(j - L₂) × M + (i - L₁)] × W

#### 3D Array Row-Major Order:
Loc(A[i][j][k]) = B + [(i - L₁) × N × P + (j - L₂) × P + (k - L₃)] × W

### 2. Sparse Matrices & Triplet Representation

A **Sparse Matrix** is a matrix where the vast majority (typically ≥ 70%) of elements are zero. Storing all M × N elements wastes massive RAM.

- **Triplet Array Representation (Coordinate List / COO):**
  - Stored as a 2D array of size (K + 1) × 3, where K is the number of non-zero elements.
  - **Row 0 (Metadata):** [Total_Rows, Total_Cols, Total_NonZeros]
  - **Rows 1 to K:** [Row_Index, Col_Index, NonZero_Value]
  - Space complexity drops from O(M × N) down to O(K).