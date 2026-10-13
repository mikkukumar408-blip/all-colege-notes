### 1. Linear Queue & The False Overflow Problem
A **Queue** enforces **FIFO (First-In, First-Out)** order. Additions occur at rear, deletions at front.
In an array-based linear queue, after repeated enqueues and dequeues, rear reaches MAX - 1 while free slots exist at the front. This is known as **False Overflow** or memory wastage.

### 2. Circular Queue Solution (Modulo Arithmetic)
A circular queue logically connects the last position back to index 0:
- **Empty Condition:** front == -1 && rear == -1
- **Full Condition:** (rear + 1) % MAX == front
- **Enqueue Operation:**
  ```c
  if ((rear + 1) % MAX == front) { printf("Queue Overflow
"); return; }
  if (front == -1) { front = 0; rear = 0; }
  else { rear = (rear + 1) % MAX; }
  queue[rear] = val;
  ```
- **Dequeue Operation:**
  ```c
  if (front == -1) { printf("Queue Underflow
"); return -1; }
  int val = queue[front];
  if (front == rear) { front = -1; rear = -1; } // Queue becomes empty
  else { front = (front + 1) % MAX; }
  return val;
  ```

### 3. Deque & Priority Queue
- **Deque (Double-Ended Queue):** Insertion and deletion can be performed at both the front and rear ends.
  - *Input-Restricted Deque:* Insertion at one end only, deletion at both ends.
  - *Output-Restricted Deque:* Deletion at one end only, insertion at both ends.
- **Priority Queue:** Elements are dequeued based on priority value rather than arrival order. Efficiently implemented using a **Binary Heap** (O(log n) insertion/extraction).