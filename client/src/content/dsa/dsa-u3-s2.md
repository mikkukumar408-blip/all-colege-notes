### 1. Dynamic Linked Allocation vs Sequential Arrays
- **Sequential Array:** Fixed contiguous memory, O(1) random access by index, costly O(n) element shifts during insertions/deletions.
- **Linked List:** Non-contiguous dynamic nodes connected via pointers. Dynamic resizing, O(1) insertion/deletion given pointer reference, O(n) sequential access, additional memory overhead for storing pointer addresses.

### 2. Structural Comparison of Linked List Topologies

| List Type | Node Structure | Traversal Direction | End Condition | Header Overhead |
| :--- | :--- | :--- | :--- | :--- |
| **Singly (SLL)** | `[Data &#124; Next*]` | Unidirectional (Forward) | `ptr->next == NULL` | Single pointer (`head`) |
| **Doubly (DLL)** | `[*Prev &#124; Data &#124; *Next]` | Bidirectional (Fwd/Bwd) | `next == NULL, prev == NULL` | Two pointers per node |
| **Circular SLL** | `[Data &#124; Next*]` | Circular Unidirectional | `ptr->next == head` | No `NULL` pointers |
| **Circular DLL** | `[*Prev &#124; Data &#124; *Next]` | Circular Bidirectional | `head->prev == last, last->next == head` | Fast access to `head` & `tail` |
| **Header List** | `[Dummy Header] -> [Nodes]` | As per underlying list | `ptr->next == NULL` | Dummy node storing list size/metadata |