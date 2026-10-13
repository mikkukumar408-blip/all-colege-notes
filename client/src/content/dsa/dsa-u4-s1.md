### 1. Core Mathematical Theorems on Binary Trees
1. **Maximum nodes at level i** (root at level 0):
   N_max(i) = 2ⁱ
2. **Maximum nodes in a binary tree of height h:**
   N_max = Σ_{i=0}^h 2ⁱ = 2^(h+1) - 1
3. **Minimum height of a binary tree with n nodes:**
   h_min = ⌈log₂(n + 1)⌉ - 1
4. **Strictly Binary Tree Relation:** In any non-empty strictly binary tree, the number of leaf nodes L is always one more than the number of internal nodes with two children I:
   L = I + 1

### 2. Binary Tree Taxonomy
- **Full (Proper) Binary Tree:** Every node has either 0 or 2 children.
- **Complete Binary Tree:** All levels are completely filled except possibly the last, which is filled sequentially from left to right.
- **Perfect Binary Tree:** All internal nodes have 2 children and all leaf nodes reside at the exact same depth.