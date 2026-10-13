### 1. Advanced Pointer Classification Matrix

| Pointer Type | Syntax & Definition | Memory Hazard / Behavior | Remediation / Safe Practice |
| :--- | :--- | :--- | :--- |
| **Wild Pointer** | `int *ptr;` (Uninitialized) | Points to arbitrary memory; dereferencing corrupts RAM or crashes process. | Always initialize to `NULL`: `int *ptr = NULL;`. |
| **Dangling Pointer** | `free(ptr);` (Target freed) | Points to deallocated storage that may be reassigned to other subsystems. | Set pointer to `NULL` immediately after freeing: `free(ptr); ptr = NULL;`. |
| **Void Pointer** | `void *vptr = &x;` | Generic memory pointer without data type association. Cannot be directly dereferenced. | Explicitly typecast before dereferencing: `*(int*)vptr`. |
| **Function Pointer** | `int (*fp)(int, int) = &add;` | Holds entry address of executable code in text segment. Enables runtime callbacks. | Invoked via `int res = fp(10, 20);`. |
| **Pointer to Array** | `int (*p)[5];` | Single pointer referencing an entire array block of 5 integers. | Used in multi-dimensional array parameter passing. |
| **Array of Pointers** | `int *p[5];` | Array containing 5 independent integer pointer variables. | Used in ragged 2D tables and string arrays (`char *argv[]`). |