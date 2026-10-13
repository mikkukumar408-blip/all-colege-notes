### The Complete DMA Lifecycle

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 680 125" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="dm-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
      </marker>
    </defs>
    <rect x="5" y="5" width="670" height="115" rx="12" class="schematic-bg" fill="rgba(15,23,42,0.75)" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5 4" />
    <text x="340" y="25" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="bold" letter-spacing="1">DYNAMIC MEMORY ALLOCATION (DMA) SAFE LIFECYCLE IN C</text>
    <!-- Step 1 -->
    <rect x="18" y="42" width="142" height="60" rx="8" fill="rgba(30,58,138,0.85)" stroke="#60a5fa" stroke-width="1.8" />
    <text x="89" y="65" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">1. Heap Allocation</text>
    <text x="89" y="84" text-anchor="middle" fill="#bae6fd" font-size="10">malloc() / calloc()</text>
    <line x1="160" y1="72" x2="180" y2="72" stroke="#38bdf8" stroke-width="2" marker-end="url(#dm-arr)" />
    <!-- Step 2 -->
    <rect x="182" y="42" width="148" height="60" rx="8" fill="rgba(136,19,55,0.85)" stroke="#f43f5e" stroke-width="1.8" />
    <text x="256" y="65" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">2. NULL Guard</text>
    <text x="256" y="84" text-anchor="middle" fill="#fecdd3" font-size="10">if (ptr == NULL) exit(1)</text>
    <line x1="330" y1="72" x2="350" y2="72" stroke="#38bdf8" stroke-width="2" marker-end="url(#dm-arr)" />
    <!-- Step 3 -->
    <rect x="352" y="42" width="148" height="60" rx="8" fill="rgba(88,28,135,0.85)" stroke="#c084fc" stroke-width="1.8" />
    <text x="426" y="65" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">3. Dynamic Resize</text>
    <text x="426" y="84" text-anchor="middle" fill="#e9d5ff" font-size="10">realloc(ptr, new_sz)</text>
    <line x1="500" y1="72" x2="520" y2="72" stroke="#38bdf8" stroke-width="2" marker-end="url(#dm-arr)" />
    <!-- Step 4 -->
    <rect x="522" y="42" width="140" height="60" rx="8" fill="rgba(6,78,59,0.85)" stroke="#34d399" stroke-width="1.8" />
    <text x="592" y="65" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">4. Safe Release</text>
    <text x="592" y="84" text-anchor="middle" fill="#a7f3d0" font-size="10">free(ptr); ptr = NULL;</text>
  </svg>
</div>

**DMA Functions (`<stdlib.h>`):**
- `malloc(size_t size)`: Allocates raw, uninitialized bytes from the heap pool (contains garbage).
- `calloc(size_t n, size_t size)`: Allocates memory and initializes all bits to zero.
- `realloc(void *ptr, size_t new_size)`: Resizes an existing heap block without losing existing data.
- `free(void *ptr)`: Returns memory back to the heap pool to prevent memory leaks.