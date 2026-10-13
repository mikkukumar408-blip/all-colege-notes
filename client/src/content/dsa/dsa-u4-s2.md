### 1. The BST Invariant Property
For every node X in a Binary Search Tree:
key(LeftSubtree(X)) < key(X) < key(RightSubtree(X))

### 2. BST Traversal Orders
- **Inorder (Left, Root, Right):** Recursively traverses left, visits root, traverses right. **Crucial Property:** Inorder traversal of a BST always yields keys in strictly ascending sorted order!
- **Preorder (Root, Left, Right):** Used for creating tree duplicates / prefix serialization.
- **Postorder (Left, Right, Root):** Used for deleting trees / evaluating expression trees bottom-up.

### 3. BST Node Deletion (The 3 Canonical Cases)
1. **Case 1 (Leaf Node):** Target node has zero children. Simply set parent's reference to NULL and free(node).
2. **Case 2 (Node with One Child):** Bypass the node by linking its parent directly to its sole child.
3. **Case 3 (Node with Two Children):**
   - Find the node's **Inorder Successor** (smallest key in right subtree, i.e., leftmost node in right child) OR **Inorder Predecessor** (largest key in left subtree).
   - Copy the successor's data value into the target node.
   - Recursively delete the inorder successor (which is guaranteed to have at most 1 child!).