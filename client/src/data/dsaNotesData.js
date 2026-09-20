/* =========================================================================
   DATA STRUCTURES (BCSE-007) COMPLETE STUDY NOTES DATA
   =========================================================================
   Full MMDU Syllabus Coverage for B.Tech 2nd Semester (Units 1, 2, 3, and 4)
   Exhaustive Master Notes Edition:
   - Unit 1: Asymptotic bounds, Array addressing (1D/2D/3D), Sparse matrix, Searching & Sorting
   - Unit 2: Stack ADT, Infix/Postfix/Prefix conversion & evaluation, Recursion & Tower of Hanoi
   - Unit 3: Queues (Linear, Circular, Deque, Priority) & Linked Lists (SLL, DLL, CLL, Circular DLL, Header)
   - Unit 4: Trees, Binary Trees, BST Operations & Traversals, Graphs (Matrix/List, BFS, DFS)
   ========================================================================= */

export const dsaSubjectDetails = {
  id: "sub-dsa-bcse007",
  semester: 2,
  year: "1st Year",
  name: "Data Structures",
  code: "BCSE-007",
  credits: 3,
  instructor: "Department of Computer Science & Engineering (MMDU)",
  notesCount: "4 Units Complete Master Notes & Solved Question Papers",
  rating: 5.0,
  description: "Official MMDU syllabus (BCSE-007): Mathematical notation, asymptotic bounds, 1D/2D/3D array addressing, sparse matrices, Bubble/Selection/Insertion/Merge/Quick/Heap sorting, Linear/Binary searching, Stacks (LIFO), Infix-Postfix-Prefix conversion & evaluation, recursion & Tower of Hanoi, Linear/Circular/Deque/Priority Queues, Singly/Doubly/Circular Linked Lists, Binary Trees, BST traversals & deletion cases, Graph representations (Adjacency Matrix/List), and BFS/DFS graph traversals.",
  banner: "/images/dsa.jpg",
  units: [
    { num: 1, title: "Foundations, Arrays, Searching & Sorting", pages: 3, status: "Verified" },
    { num: 2, title: "Stacks, Expressions & Recursion (Tower of Hanoi)", pages: 3, status: "Verified" },
    { num: 3, title: "Queues & Linked Lists Topologies", pages: 3, status: "Verified" },
    { num: 4, title: "Trees, BST & Graph Algorithms (BFS/DFS)", pages: 3, status: "Verified" }
  ]
};

export const dsaUnitsData = [
  {
    unitNum: 1,
    title: "Foundations, Array Addressing, Searching & Sorting Algorithms",
    examWeightage: "25 - 30 Marks",
    readingTime: "40 mins",
    summary: "Asymptotic notation (O, Ω, Θ), order of growth, Master Theorem, 1D, 2D (Row/Column major) and 3D array memory mapping, sparse matrix triplet representation, and full sorting/searching suite (Linear, Binary, Bubble, Selection, Insertion, Merge, Quick, Heap, Radix).",
    sections: [
      {
        sectionId: "dsa-u1-s1",
        title: "1. Asymptotic Complexity, Order of Growth & Master Theorem",
        content: `### 1. Mathematical Notation & Asymptotic Bounds

In algorithmic analysis, **asymptotic notation** describes the limiting behavior of an algorithm's execution time or memory footprint as input size n approaches infinity:

- **Big-O (O) — Asymptotic Upper Bound:**
  f(n) = O(g(n)) if and only if there exist positive constants c > 0 and n₀ ≥ 1 such that 0 ≤ f(n) ≤ c · g(n) for all n ≥ n₀.
  Represents the mathematical **worst-case** performance guarantee.

- **Big-Omega (Ω) — Asymptotic Lower Bound:**
  f(n) = Ω(g(n)) if and only if there exist positive constants c > 0 and n₀ ≥ 1 such that 0 ≤ c · g(n) ≤ f(n) for all n ≥ n₀.
  Represents the mathematical **best-case** performance bound.

- **Big-Theta (Θ) — Asymptotically Tight Bound:**
  f(n) = Θ(g(n)) if and only if there exist positive constants c₁, c₂ > 0 and n₀ ≥ 1 such that c₁ · g(n) ≤ f(n) ≤ c₂ · g(n) for all n ≥ n₀.
  Holds when an algorithm is bounded both from above and below by the same growth rate.

### 2. Standard Hierarchy of Algorithmic Growth Rates
O(1) < O(log n) < O(√n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!)

### 3. Master Theorem for Divide-and-Conquer Recurrences
For recurrences of the standard form T(n) = a·T(n/b) + f(n) where a ≥ 1, b > 1, and f(n) = Θ(n^k · log^p n):
1. **Case 1:** If log_b(a) > k ⟹ T(n) = Θ(n^(log_b a)).
2. **Case 2:** If log_b(a) = k:
   - If p > -1 ⟹ T(n) = Θ(n^k · log^(p+1) n).
   - If p = -1 ⟹ T(n) = Θ(n^k · log log n).
3. **Case 3:** If log_b(a) < k and regularity condition a·f(n/b) ≤ c·f(n) holds ⟹ T(n) = Θ(f(n)).`
      },
      {
        sectionId: "dsa-u1-s2",
        title: "2. Multi-Dimensional Array Addressing & Sparse Matrices",
        content: `### 1. Sequential Storage & Memory Mapping Formulas

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
  - Space complexity drops from O(M × N) down to O(K).`
      },
      {
        sectionId: "dsa-u1-s3",
        title: "3. Searching & Sorting Algorithms Complexity Suite",
        content: `### 1. Searching Algorithms Comparison
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
| **Radix Sort** | O(d(n + k)) | O(d(n + k)) | O(d(n + k)) | O(n + k) | Yes | Non-comparative digit buckets |`
      }
    ]
  },
  {
    unitNum: 2,
    title: "Stacks, Expressions (Infix/Postfix/Prefix) & Recursion (Tower of Hanoi)",
    examWeightage: "25 Marks",
    readingTime: "35 mins",
    summary: "Stack ADT (LIFO), array and linked representations, push/pop/peek operations, Infix to Postfix/Prefix conversion algorithms, Postfix evaluation, recursion activation records, and Tower of Hanoi complete mathematical induction and recurrence derivation.",
    sections: [
      {
        sectionId: "dsa-u2-s1",
        title: "1. Stack ADT & Primitive Operations",
        content: `### 1. Definition & Abstract Data Type (ADT)

A **Stack** is a linear, restricted list in which additions (push) and deletions (pop) take place exclusively at a single designated end called the **Top**. It strictly enforces **LIFO (Last-In, First-Out)** order.

### 2. Primitive Operations on Array-Based Stack
\`\`\`c
#define MAX 100
int stack[MAX], top = -1;

void push(int val) {
    if (top == MAX - 1) {
        printf("Stack Overflow!\n");
        return;
    }
    stack[++top] = val; // Increment top, then store value
}

int pop() {
    if (top == -1) {
        printf("Stack Underflow!\n");
        return -1;
    }
    return stack[top--]; // Retrieve value, then decrement top
}

int peek() {
    if (top == -1) return -1;
    return stack[top]; // O(1) query without removal
}
\`\`\``
      },
      {
        sectionId: "dsa-u2-s2",
        title: "2. Expression Conversion (Shunting-Yard) & Evaluation",
        content: `### 1. Infix, Postfix and Prefix Notations
- **Infix:** Operator placed between operands (human standard): A + B * C
- **Postfix (Reverse Polish Notation):** Operator follows operands: A B C * +
- **Prefix (Polish Notation):** Operator precedes operands: + A * B C

### 2. Operator Precedence & Associativity
1. **Parentheses (), []:** Evaluated first
2. **Exponentiation ^:** Highest precedence, **Right-to-Left** associativity
3. **Multiplication & Division *, /, %:** High precedence, **Left-to-Right**
4. **Addition & Subtraction +, -:** Lowest precedence, **Left-to-Right**

### 3. Algorithm: Infix to Postfix (Shunting-Yard)
1. Initialize an empty operator stack.
2. Scan infix token by token from Left to Right:
   - **Operand:** Append directly to output postfix expression.
   - **Left Parenthesis (:** Push onto stack.
   - **Right Parenthesis ):** Pop operators and append to output until ( is encountered; discard both parentheses.
   - **Operator op:** While stack is not empty and precedence(stack[top]) >= precedence(op) (strictly > if op is right-associative), pop and append to output. Push op onto stack.
3. Pop and append all remaining operators from stack to output.

### 4. Algorithm: Postfix Expression Evaluation
1. Scan postfix expression from Left to Right.
2. If token is an **operand**, push onto operand stack.
3. If token is an **operator**:
   - Pop op2 = pop() (Second operand popped first!).
   - Pop op1 = pop() (First operand popped second!).
   - Calculate result = op1 [operator] op2.
   - Push result back onto stack.
4. When scan completes, the single value remaining on the stack is the final expression value.`
      },
      {
        sectionId: "dsa-u2-s3",
        title: "3. Recursion & The Tower of Hanoi Problem",
        content: `### 1. Recursion Mechanics & System Call Stack
Recursion occurs when a function invokes itself directly or indirectly. The runtime system allocates an **Activation Record (Stack Frame)** on the call stack containing:
1. Actual parameters
2. Local variables
3. Return memory address to the calling routine

Omission of a valid **base case** causes unbounded recursive expansion, exhausting available stack memory and triggering a runtime **Stack Overflow**.

### 2. Tower of Hanoi
Problem Statement: Move n disks from Source Peg S to Destination Peg D using Auxiliary Peg A, subject to:
1. Only one disk can be moved at a time.
2. A larger disk may never be placed on top of a smaller disk.

#### Recursive Algorithm:
\`\`\`c
void towerOfHanoi(int n, char S, char A, char D) {
    if (n == 1) {
        printf("Move disk 1 from %c to %c\n", S, D);
        return;
    }
    towerOfHanoi(n - 1, S, D, A); // Step 1: Move n-1 disks from S to A using D
    printf("Move disk %d from %c to %c\n", n, S, D); // Step 2: Move disk n to D
    towerOfHanoi(n - 1, A, S, D); // Step 3: Move n-1 disks from A to D using S
}
\`\`\`

#### Recurrence Relation & Solution:
T(n) = 2·T(n-1) + 1 with T(1) = 1
Using repeated backward substitution:
T(n) = 2¹·T(n-1) + 1 = 2²·T(n-2) + 2 + 1 = ... = Σ_{i=0}^{n-1} 2ⁱ = 2ⁿ - 1
Total moves required: 2ⁿ - 1. Time complexity is strictly Θ(2ⁿ).`
      }
    ]
  },
  {
    unitNum: 3,
    title: "Queues & Linked Lists Topologies",
    examWeightage: "25 Marks",
    readingTime: "40 mins",
    summary: "Queue ADT (FIFO), linear queue false overflow, Circular Queue modulo arithmetic, Double-Ended Queue (Deque), Priority Queue, and linked list variants (Singly, Doubly, Circular Singly, Circular Doubly, Header linked list) with complete pointer manipulation.",
    sections: [
      {
        sectionId: "dsa-u3-s1",
        title: "1. Queue Topologies: Linear, Circular, Deque & Priority",
        content: `### 1. Linear Queue & The False Overflow Problem
A **Queue** enforces **FIFO (First-In, First-Out)** order. Additions occur at rear, deletions at front.
In an array-based linear queue, after repeated enqueues and dequeues, rear reaches MAX - 1 while free slots exist at the front. This is known as **False Overflow** or memory wastage.

### 2. Circular Queue Solution (Modulo Arithmetic)
A circular queue logically connects the last position back to index 0:
- **Empty Condition:** front == -1 && rear == -1
- **Full Condition:** (rear + 1) % MAX == front
- **Enqueue Operation:**
  \`\`\`c
  if ((rear + 1) % MAX == front) { printf("Queue Overflow\n"); return; }
  if (front == -1) { front = 0; rear = 0; }
  else { rear = (rear + 1) % MAX; }
  queue[rear] = val;
  \`\`\`
- **Dequeue Operation:**
  \`\`\`c
  if (front == -1) { printf("Queue Underflow\n"); return -1; }
  int val = queue[front];
  if (front == rear) { front = -1; rear = -1; } // Queue becomes empty
  else { front = (front + 1) % MAX; }
  return val;
  \`\`\`

### 3. Deque & Priority Queue
- **Deque (Double-Ended Queue):** Insertion and deletion can be performed at both the front and rear ends.
  - *Input-Restricted Deque:* Insertion at one end only, deletion at both ends.
  - *Output-Restricted Deque:* Deletion at one end only, insertion at both ends.
- **Priority Queue:** Elements are dequeued based on priority value rather than arrival order. Efficiently implemented using a **Binary Heap** (O(log n) insertion/extraction).`
      },
      {
        sectionId: "dsa-u3-s2",
        title: "2. Linked Lists Topologies: SLL, DLL, CLL & Header Lists",
        content: `### 1. Dynamic Linked Allocation vs Sequential Arrays
- **Sequential Array:** Fixed contiguous memory, O(1) random access by index, costly O(n) element shifts during insertions/deletions.
- **Linked List:** Non-contiguous dynamic nodes connected via pointers. Dynamic resizing, O(1) insertion/deletion given pointer reference, O(n) sequential access, additional memory overhead for storing pointer addresses.

### 2. Structural Comparison of Linked List Topologies

| List Type | Node Structure | Traversal Direction | End Condition | Header Overhead |
| :--- | :--- | :--- | :--- | :--- |
| **Singly (SLL)** | [Data | Next*] | Unidirectional (Forward) | ptr->next == NULL | Single pointer (head) |
| **Doubly (DLL)** | [*Prev | Data | *Next] | Bidirectional (Fwd/Bwd) | next == NULL, prev == NULL | Two pointers per node |
| **Circular SLL** | [Data | Next*] | Circular Unidirectional | ptr->next == head | No NULL pointers |
| **Circular DLL** | [*Prev | Data | *Next] | Circular Bidirectional | head->prev == last, last->next == head | Fast access to head & tail |
| **Header List** | [Dummy Header] -> [Nodes] | As per underlying list | ptr->next == NULL | Dummy node storing list size/metadata |`
      },
      {
        sectionId: "dsa-u3-s3",
        title: "3. Essential Pointer Rewiring Algorithms in C",
        content: `### 1. Singly Linked List: Insertion at Beginning
\`\`\`c
struct Node {
    int data;
    struct Node* next;
};

void insertAtBeginning(struct Node** head, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = *head; // Point new node to current head
    *head = newNode;       // Update head to new node
}
\`\`\`

### 2. Singly Linked List: Deleting a Node by Value
\`\`\`c
void deleteNode(struct Node** head, int key) {
    struct Node *temp = *head, *prev = NULL;
    if (temp != NULL && temp->data == key) {
        *head = temp->next; // Head deleted
        free(temp);
        return;
    }
    while (temp != NULL && temp->data != key) {
        prev = temp;
        temp = temp->next;
    }
    if (temp == NULL) return; // Key not found
    prev->next = temp->next;  // Unlink target node
    free(temp);               // Free heap memory
}
\`\`\`

### 3. Doubly Linked List: Insertion After Given Node
\`\`\`c
void insertAfter(struct Node* prevNode, int val) {
    if (prevNode == NULL) return;
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = prevNode->next;
    newNode->prev = prevNode;
    if (prevNode->next != NULL) {
        prevNode->next->prev = newNode;
    }
    prevNode->next = newNode;
}
\`\`\``
      }
    ]
  },
  {
    unitNum: 4,
    title: "Trees, Binary Search Trees & Graph Algorithms",
    examWeightage: "25 - 30 Marks",
    readingTime: "45 mins",
    summary: "Tree terminology, binary tree theorems, Binary Search Tree (BST) operations (Search, Insert, Deletion 3 cases), Inorder/Preorder/Postorder traversals, Expression trees, Graph representations (Adjacency Matrix vs List), and BFS/DFS traversal algorithms with cycle detection.",
    sections: [
      {
        sectionId: "dsa-u4-s1",
        title: "1. Binary Tree Properties & Theorems",
        content: `### 1. Core Mathematical Theorems on Binary Trees
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
- **Perfect Binary Tree:** All internal nodes have 2 children and all leaf nodes reside at the exact same depth.`
      },
      {
        sectionId: "dsa-u4-s2",
        title: "2. Binary Search Tree (BST) Operations & Traversals",
        content: `### 1. The BST Invariant Property
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
   - Recursively delete the inorder successor (which is guaranteed to have at most 1 child!).`
      },
      {
        sectionId: "dsa-u4-s3",
        title: "3. Graph Representations & Search Algorithms (BFS & DFS)",
        content: `### 1. Graph Representations: Matrix vs List

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
- **Time Complexity:** O(V + E) with adjacency list; Space: O(V) call stack.`
      }
    ]
  }
];
