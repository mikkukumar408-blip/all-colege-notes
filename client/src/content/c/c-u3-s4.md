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

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 680 210" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="rc-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
      </marker>
      <marker id="rc-arr-g" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" />
      </marker>
    </defs>
    <rect x="5" y="5" width="670" height="200" rx="12" class="schematic-bg" fill="rgba(15,23,42,0.75)" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5 4" />
    <text x="340" y="25" text-anchor="middle" fill="#38bdf8" font-size="12.5" font-weight="bold" letter-spacing="1">RECURSIVE CALL STACK EXECUTION &amp; UNWINDING TRACE: fact(3)</text>
    <!-- Left Column: Winding (Push) -->
    <text x="175" y="46" text-anchor="middle" fill="#7dd3fc" font-size="11" font-weight="bold">PHASE 1: STACK WINDING (PUSH)</text>
    <rect x="35" y="55" width="280" height="36" rx="7" fill="rgba(30,58,138,0.85)" stroke="#60a5fa" stroke-width="1.6" />
    <text x="175" y="77" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">Frame 3: fact(3) → waits on 3 * fact(2)</text>
    <line x1="175" y1="91" x2="175" y2="105" stroke="#38bdf8" stroke-width="1.8" marker-end="url(#rc-arr)" />
    <rect x="35" y="107" width="280" height="36" rx="7" fill="rgba(88,28,135,0.85)" stroke="#c084fc" stroke-width="1.6" />
    <text x="175" y="129" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">Frame 2: fact(2) → waits on 2 * fact(1)</text>
    <line x1="175" y1="143" x2="175" y2="157" stroke="#38bdf8" stroke-width="1.8" marker-end="url(#rc-arr)" />
    <rect x="35" y="159" width="280" height="36" rx="7" fill="rgba(136,19,55,0.85)" stroke="#f43f5e" stroke-width="1.8" />
    <text x="175" y="181" text-anchor="middle" fill="#fecdd3" font-size="11.5" font-weight="bold">Frame 1: fact(1) → Base Case (n ≤ 1) = 1</text>
    <!-- Bridge Arrow -->
    <line x1="315" y1="177" x2="365" y2="177" stroke="#34d399" stroke-width="2" marker-end="url(#rc-arr-g)" />
    <!-- Right Column: Unwinding (Pop) -->
    <text x="505" y="46" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold">PHASE 2: STACK UNWINDING (POP)</text>
    <rect x="365" y="159" width="280" height="36" rx="7" fill="rgba(6,78,59,0.85)" stroke="#34d399" stroke-width="1.6" />
    <text x="505" y="181" text-anchor="middle" fill="#a7f3d0" font-size="11.5" font-weight="bold">Pop Frame 1 → Returns 1 to Frame 2</text>
    <line x1="505" y1="159" x2="505" y2="145" stroke="#34d399" stroke-width="1.8" marker-end="url(#rc-arr-g)" />
    <rect x="365" y="107" width="280" height="36" rx="7" fill="rgba(6,78,59,0.85)" stroke="#34d399" stroke-width="1.6" />
    <text x="505" y="129" text-anchor="middle" fill="#a7f3d0" font-size="11.5" font-weight="bold">Pop Frame 2 → Returns 2 × 1 = 2</text>
    <line x1="505" y1="107" x2="505" y2="93" stroke="#34d399" stroke-width="1.8" marker-end="url(#rc-arr-g)" />
    <rect x="365" y="55" width="280" height="36" rx="7" fill="rgba(6,78,59,0.95)" stroke="#34d399" stroke-width="2" />
    <text x="505" y="77" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">Pop Frame 3 → Final Result: 3 × 2 = 6</text>
  </svg>
</div>