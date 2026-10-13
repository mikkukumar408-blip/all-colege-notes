### 1. Recursion Mechanics & System Call Stack
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
```c
void towerOfHanoi(int n, char S, char A, char D) {
    if (n == 1) {
        printf("Move disk 1 from %c to %c
", S, D);
        return;
    }
    towerOfHanoi(n - 1, S, D, A); // Step 1: Move n-1 disks from S to A using D
    printf("Move disk %d from %c to %c
", n, S, D); // Step 2: Move disk n to D
    towerOfHanoi(n - 1, A, S, D); // Step 3: Move n-1 disks from A to D using S
}
```

#### Recurrence Relation & Solution:
T(n) = 2·T(n-1) + 1 with T(1) = 1
Using repeated backward substitution:
T(n) = 2¹·T(n-1) + 1 = 2²·T(n-2) + 2 + 1 = ... = Σ_{i=0}^{n-1} 2ⁱ = 2ⁿ - 1
Total moves required: 2ⁿ - 1. Time complexity is strictly Θ(2ⁿ).