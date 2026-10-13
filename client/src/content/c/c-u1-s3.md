### 1. Black-Box vs. White-Box Testing Methodologies

Quality assurance in compiled systems incorporates two complementary testing paradigms:

- **Black-Box Testing (Functional Testing):**
  - Assesses software behavior purely against specification inputs and expected outputs.
  - The tester has **zero visibility** into the internal source code architecture.
  - Primary Techniques: **Equivalence Class Partitioning** and **Boundary Value Analysis (BVA)**.
- **White-Box Testing (Structural Testing):**
  - Inspects internal control structures, branches, and execution paths with full source code visibility.
  - Primary Metrics: **Statement Coverage**, **Branch/Decision Coverage**, and **Cyclomatic Complexity**.

---

### 2. The 4 Tiers of Programming Defects

Software defects are classified into four distinct phases of the software lifecycle:

| Error Tier | Detection Phase | Root Cause & Characteristics | C Concrete Example |
| :--- | :--- | :--- | :--- |
| **1. Syntax Error** | Translation / Compile Time | Violation of C grammar rules; caught by compiler tokenizer or parser. | Missing semicolon `;`, mismatched braces `{`, misspelled keyword `whlie`. |
| **2. Linker Error** | Linking Time (`ld`) | Unresolved external symbols; function declared but missing object definition. | Calling `clrscr()` or `foo()` without linking their object library. |
| **3. Runtime Error** | Program Execution Time | Illegal CPU instructions or OS protection faults causing abnormal termination. | Division by zero (`x / 0`), Segmentation Fault (SIGSEGV) accessing address 0x0. |
| **4. Semantic / Logic Error** | User Testing / Output Validation | Program compiles and runs without crashing, but generates incorrect results. | Using `i <= n` instead of `i < n` causing an off-by-one array overwrite. |