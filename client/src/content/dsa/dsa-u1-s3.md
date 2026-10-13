### 1. Searching Algorithms Comparison
- **Linear Search:** Scans sequentially from index 0 to n-1. Best: O(1), Worst: O(n), Space: O(1). Works on unsorted collections.
- **Binary Search:** Divide-and-conquer on **sorted** arrays. Computes mid = low + (high - low)/2. Best: O(1), Average/Worst: O(log n), Space: O(1) iterative, O(log n) recursive.

### 2. Comprehensive Sorting Algorithm Master Matrix

| Algorithm | Best Time | Average Time | Worst Time | Space | Stable? | Method / In-Place |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Bubble Sort** | O(n) [flagged] | O(n²) | O(n²) | O(1) | Yes | Adjacent swaps; in-place |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(1) | No | Min selection; in-place |
| **Insertion Sort** | O(n) [sorted] | O(n²) | O(n²) | O(1) | Yes | Shift & insert; in-place |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | Divide & Conquer; out-of-place |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) [skewed] | O(log n) | No | Partitioning; in-place |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | No | Complete binary heap; in-place |
| **Radix Sort** | O(d(n + k)) | O(d(n + k)) | O(d(n + k)) | O(n + k) | Yes | Non-comparative digit buckets |