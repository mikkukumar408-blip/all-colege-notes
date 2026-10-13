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

```
[ prog.c ] (Source Text)
    │
    ▼ (1. Preprocessor: cpp)
[ prog.i ] (Expanded Pure C: stripped comments, expanded #include, macro constants)
    │
    ▼ (2. Compiler: ccl)
[ prog.s ] (Assembly Code: architecture-specific target CPU instructions)
    │
    ▼ (3. Assembler: as)
[ prog.o / .obj ] (Relocatable Machine Binary: binary CPU opcodes with unresolved addresses)
    │
    ▼ (4. Linker: ld + libc.a / CRT)
[ prog.exe / a.out ] (Executable Binary: fully resolved memory addresses, ready to load into RAM)
```

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