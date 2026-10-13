### Structure vs. Union Architecture

| Dimension | Structure (`struct`) | Union (`union`) |
| :--- | :--- | :--- |
| **Keyword** | `struct Record { int id; char grade; double score; };` | `union Record { int id; char grade; double score; };` |
| **Memory Allocation** | Sum of all member sizes + structure padding bytes. | Space equal only to the size of its largest member. |
| **Memory Sharing** | Each member has its own distinct, sequential address offset. | **All members share the exact same starting memory address.** |
| **Active Members** | All members can store valid values simultaneously. | Only **ONE** member can hold a valid value at any given instant. |
| **Size Calculation** | $\text{sizeof}(\text{struct}) = 4 + 1\text{ (pad 3)} + 8 = mathbf{16\text{ Bytes}}$ | $\text{sizeof}(\text{union}) = max(4, 1, 8) = mathbf{8\text{ Bytes}}$ |
| **Member Access** | `var.id` (Direct) or `ptr->id` (Indirect via pointer) | `u.id` (Direct) or `u_ptr->id` (Indirect via pointer) |