### 1. Translators: Compiler vs. Interpreter vs. Assembler

| Comparative Dimension | Compiler | Interpreter | Assembler |
| :--- | :--- | :--- | :--- |
| **Input Source** | High-level language (C, C++, Rust). | High-level script (Python, JS, Ruby). | Assembly language mnemonics (8086, x86). |
| **Translation Unit** | Scans entire translation unit at once. | Interprets statement-by-statement. | 1-to-1 conversion of mnemonic to opcode. |
| **Intermediate Object** | Generates relocatable object file (`.o`/`.obj`). | No standalone object file produced. | Generates relocatable machine code. |
| **Execution Speed** | Extremely fast direct hardware execution. | Slower due to runtime interpretation overhead. | Maximum execution speed on target CPU. |
| **Error Reporting** | Compiles list of all syntax errors at once. | Halts execution immediately on first error. | Reports syntax errors during assembly pass. |

---

### 2. The 4-Stage C Compilation Pipeline

When invoking `gcc prog.c -o prog.exe`, four distinct system subsystems execute in pipeline order:

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 680 285" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="cc-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
      </marker>
    </defs>
    <rect x="5" y="5" width="670" height="275" rx="12" class="schematic-bg" fill="rgba(15,23,42,0.75)" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5 4" />
    <text x="340" y="24" text-anchor="middle" fill="#38bdf8" font-size="12.5" font-weight="bold" letter-spacing="1">THE 4-STAGE GCC COMPILATION PIPELINE (prog.c → prog.exe)</text>
    <!-- Stage 0: prog.c -->
    <rect x="85" y="34" width="510" height="32" rx="7" fill="rgba(30,58,138,0.85)" stroke="#60a5fa" stroke-width="1.8" />
    <text x="340" y="54" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">[ prog.c ] — Raw C Source Code (Headers, Macros, Functions)</text>
    <line x1="340" y1="66" x2="340" y2="84" stroke="#38bdf8" stroke-width="2" marker-end="url(#cc-arr)" />
    <text x="352" y="79" fill="#fde047" font-size="10" font-weight="bold">1. Preprocessor (cpp)</text>
    <!-- Stage 1: prog.i -->
    <rect x="85" y="86" width="510" height="32" rx="7" fill="rgba(15,118,110,0.85)" stroke="#2dd4bf" stroke-width="1.8" />
    <text x="340" y="106" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">[ prog.i ] — Expanded Pure C (Stripped comments, expanded #include &amp; #define)</text>
    <line x1="340" y1="118" x2="340" y2="136" stroke="#38bdf8" stroke-width="2" marker-end="url(#cc-arr)" />
    <text x="352" y="131" fill="#fde047" font-size="10" font-weight="bold">2. Compiler Proper (cc1)</text>
    <!-- Stage 2: prog.s -->
    <rect x="85" y="138" width="510" height="32" rx="7" fill="rgba(88,28,135,0.85)" stroke="#c084fc" stroke-width="1.8" />
    <text x="340" y="158" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">[ prog.s ] — Target Assembly Code (x86/ARM Mnemonic Instructions)</text>
    <line x1="340" y1="170" x2="340" y2="188" stroke="#38bdf8" stroke-width="2" marker-end="url(#cc-arr)" />
    <text x="352" y="183" fill="#fde047" font-size="10" font-weight="bold">3. Assembler (as)</text>
    <!-- Stage 3: prog.o -->
    <rect x="85" y="190" width="510" height="32" rx="7" fill="rgba(124,45,18,0.85)" stroke="#fb923c" stroke-width="1.8" />
    <text x="340" y="210" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">[ prog.o / prog.obj ] — Relocatable Object Binary (Unresolved external symbols)</text>
    <line x1="340" y1="222" x2="340" y2="240" stroke="#38bdf8" stroke-width="2" marker-end="url(#cc-arr)" />
    <text x="352" y="235" fill="#fde047" font-size="10" font-weight="bold">4. Linker (ld + libc.a / CRT)</text>
    <!-- Stage 4: prog.exe -->
    <rect x="85" y="242" width="510" height="32" rx="7" fill="rgba(6,78,59,0.9)" stroke="#34d399" stroke-width="2" />
    <text x="340" y="262" text-anchor="middle" fill="#a7f3d0" font-size="12.5" font-weight="bold">[ prog.exe / a.out ] — Executable Binary (Resolved addresses, ready for OS Loader)</text>
  </svg>
</div>

---

### 3. C Process Virtual Memory Layout in RAM

When an executable binary is launched by the OS loader, it is allocated a private virtual memory address space:

| Memory Segment | Growth Direction | Stored Content & Characteristics |
| :--- | :--- | :--- |
| **Stack Segment** | **Grows Downwards (High ➔ Low)** | Local automatic variables (`auto`), function parameter lists, return addresses, and stack activation records. Automatically allocated and released. |
| **Free Pool Boundary** | Stack/Heap Interface | Memory area where stack and heap grow toward each other. Depletion causes Stack Overflow. |
| **Heap Segment** | **Grows Upwards (Low ➔ High)** | Dynamically allocated memory at runtime via `malloc()`, `calloc()`, `realloc()`. Must be explicitly released via `free()`. |
| **BSS Segment** | Static / Fixed | Uninitialized global and static variables. Automatically initialized to zero by the OS loader prior to `main()`. |
| **Initialized Data** | Static / Fixed | Global and static variables explicitly initialized with non-zero literals in source code (e.g., `int global_x = 100;`). |
| **Text / Code Segment** | Static / Low Memory (0x0) | Read-only compiled CPU binary instructions. Protected by OS from runtime overwrite attempts. |