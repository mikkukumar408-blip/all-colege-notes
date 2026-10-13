### Complete 12-Point Storage Classes Matrix

| Storage Class | Keyword | Storage Location | Initial Default | Scope / Visibility | Lifetime | Linkage | Exam Key Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Automatic** | `auto` | Stack Memory | Garbage value | Local to block | Block execution | None | Default for all local variables. Destroyed upon function return. |
| **Register** | `register` | CPU Microprocessor Register | Garbage value | Local to block | Block execution | None | Fast access hint for loop counters. Address-of `&var` is ILLEGAL! |
| **Static** | `static` | Data Segment (BSS / Data) | Zero (`0` / `'0'`) | Local to block or file | Entire program run | Internal | Retains value across function invocations. Initialized once at compile time. |
| **External** | `extern` | Data Segment | Zero (`0` / `'0'`) | Global across all files | Entire program run | External | References a global variable defined in another file. Allocates no new memory. |