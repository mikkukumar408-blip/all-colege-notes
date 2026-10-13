### 1. Program, Algorithm & Language Classification

A **program** is a sequence of deterministic instructions executed by a computer to solve a problem. An **algorithm** is the logical foundation of a program: a finite, unambiguous, step-by-step procedure accepting specified inputs and yielding a well-defined output in finite time.

| Language Generation | Level | Translation Mechanism | Portability | Examples |
| :--- | :--- | :--- | :--- | :--- |
| **Machine Code (1GL)** | Binary (0s & 1s) | Executed directly by CPU microcode | None | `10110000 01100001` |
| **Assembly (2GL)** | Low (Mnemonics) | Translated via *Assembler* | Low | `MOV AX, 1; ADD BX, AX` |
| **Compiled (3GL)** | High-level | Ahead-Of-Time (AOT) to machine code | Source-portable only | C, C++, Rust |
| **Interpreted (4GL)** | Very High-level | Bytecode interpretation in Virtual Machine | **100% Portable** | **Python**, JavaScript |

### 2. CPython Architecture: Compiler & Python Virtual Machine (PVM)

Python uses a **two-tier hybrid execution pipeline**:
1. **Compilation Step:** The CPython compiler parses source code (`.py`) into an Abstract Syntax Tree (AST) and translates it into platform-independent intermediate **Bytecode** (`.pyc` files cached inside the `__pycache__` directory).
2. **Execution Step:** The **Python Virtual Machine (PVM)** is the runtime engine of CPython. It loops through the bytecode instructions line-by-line and maps them to native OS/CPU system calls.

> ⚡ **KEY TAKEAWAY & BOTTOM LINE:**
> Python is neither purely compiled nor purely interpreted. It compiles source code to Bytecode once and interprets Bytecode inside the PVM, combining the portability of interpretation with the speed of bytecode.