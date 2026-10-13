### University Solved Examination Problems (MMDU Pattern)

#### Question 7 (1 Mark): 2D Row-Major Address Calculation
**Question:** In a row-major 2D array `int A[3][4]` starting at `Base = 1000` with `sizeof(int) = 4`, find the linear address of `A[1][2]`.

**Step-by-Step Solution:**
$$\text{Offset} = (i \times C + j) \times \text{Size} = (1 \times 4 + 2) \times 4 = 6 \times 4 = 24\text{ bytes}$$
$$\text{Physical Address} = 1000 + 24 = mathbf{1024}$$

---

#### Question 15 (2 Marks): Swap Implementation via Call by Reference
**Question:** Implement the classic integer swap function using pointers and explain why Call by Value fails.

**Step-by-Step Solution:**
```c
// Call by Reference Swap:
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
} // In main: swap(&x, &y);
```
Call by Value passes copies of `x` and `y`; mutating the copies leaves the caller's variables unchanged. Call by Reference passes memory addresses `&x` and `&y`, mutating actual values in the caller's stack frame.

---

#### Question 19 (4 Marks): Binary Search Implementation & Complexity
**Question:** Present the Binary Search algorithm and prove its $O(log N)$ time complexity.

**Step-by-Step Solution:**
```c
int binarySearch(int arr[], int n, int key) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2; // Prevents arithmetic overflow
        if (arr[mid] == key) return mid;
        else if (arr[mid] < key) low = mid + 1;
        else high = mid - 1;
    }
    return -1; // Not found
}
```
**Proof:** Each comparison step halves the remaining array interval: $N \rightarrow N/2 \rightarrow N/4 ... \rightarrow N/2^k = 1$. Solving $2^k = N$ gives $k = log_2 N$. Maximum comparisons are $O(log N)$.