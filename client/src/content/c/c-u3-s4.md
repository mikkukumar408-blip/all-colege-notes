### 1. Call by Value vs. Call by Reference

| Feature | Call by Value | Call by Reference |
| :--- | :--- | :--- |
| **Passed Entity** | Copy of actual argument value is passed. | Memory address of variable (`&x`) is passed via pointers. |
| **Caller Modification** | Mutations to formal parameters do NOT affect caller. | Dereferencing (`*p`) directly mutates caller variable. |
| **Memory Cost** | Duplicates memory for large structs. | Zero copying overhead; passes a single 4/8-byte pointer. |
| **C Syntax** | `void swap(int a, int b)` | `void swap(int *a, int *b)` |

---

### 2. Recursion & Call Stack Frame Execution

Every recursive invocation allocates a new **Stack Frame** on the process stack. Execution must have a well-defined **Base Condition**; omitting it causes **Stack Overflow**:

```
Calling fact(3):
[ Stack Frame 3: fact(3) waiting on 3 * fact(2) ] (Pushed)
[ Stack Frame 2: fact(2) waiting on 2 * fact(1) ] (Pushed)
[ Stack Frame 1: fact(1) hits base condition n <= 1 ] (Returns 1)
---------------- Unwinding Phase ----------------
Frame 2 receives 1 ➔ computes 2 * 1 = 2 (Popped)
Frame 3 receives 2 ➔ computes 3 * 2 = 6 (Popped ➔ Final Result = 6)
```