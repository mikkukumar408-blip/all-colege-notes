### 1. Graph Representations: Matrix vs List

| Feature | Adjacency Matrix | Adjacency List |
| :--- | :--- | :--- |
| **Data Structure** | 2D Array int adj[V][V] | Array of Linked Lists Node* adj[V] |
| **Space Complexity** | Θ(V²) (Fixed memory) | Θ(V + E) (Optimal for sparse graphs) |
| **Edge Lookup (u, v)** | O(1) direct array index | O(degree(u)) linked traversal |
| **Find All Neighbors** | O(V) scans whole row | O(degree(u)) traverses neighbor list |
| **Best Suited For** | **Dense Graphs** (E ≈ V²) | **Sparse Graphs** (E ≪ V²) |

### 2. Breadth-First Search (BFS)
- **Mechanism:** Level-order exploration using a **FIFO Queue** and a visited boolean array.
- **Applications:** Shortest path in unweighted graphs, minimum spanning trees, connected components.
- **Time Complexity:** O(V + E) with adjacency list; Space: O(V) queue.

### 3. Depth-First Search (DFS)
- **Mechanism:** Deep path exploration using a **LIFO Stack** (or runtime recursion) and backtracking when dead ends are reached.
- **Applications:** Cycle detection in directed/undirected graphs, Topological Sort (DAG), finding strongly connected components (Kosaraju/Tarjan).
- **Time Complexity:** O(V + E) with adjacency list; Space: O(V) call stack.