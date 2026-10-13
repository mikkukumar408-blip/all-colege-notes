### The Complete DMA Lifecycle

```
1. Allocation (malloc / calloc)
      │
      ▼
2. NULL Guard Check (if ptr == NULL -> exit)
      │
      ▼
3. Reallocation (realloc if size changes)
      │
      ▼
4. Safe Deallocation (free(ptr) -> ptr = NULL)
```

**DMA Functions (`<stdlib.h>`):**
- `malloc(size_t size)`: Allocates raw, uninitialized bytes from the heap pool (contains garbage).
- `calloc(size_t n, size_t size)`: Allocates memory and initializes all bits to zero.
- `realloc(void *ptr, size_t new_size)`: Resizes an existing heap block without losing existing data.
- `free(void *ptr)`: Returns memory back to the heap pool to prevent memory leaks.