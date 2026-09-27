/* =========================================================================
   COMPUTATIONAL AND PROBLEM SOLVING USING 'C' (BCSE-008) STUDY NOTES
   =========================================================================
   Full MMDU Syllabus Coverage for B.Tech 1st Year (Units 1, 2, 3, and 4)
   Exhaustive Long Notes Edition:
   - Comprehensive theoretical derivations, 12-point comparative matrices
   - Visual vector architectural flowcharts & schematics (Compilation, Memory, DMA)
   - Solved university examination problems with diagrams in BOTH questions and solutions
   ========================================================================= */

export const cSubjectDetails = {
  id: "sub-c1",
  semester: 1,
  year: "1st Year",
  name: "Computational and Problem Solving using C",
  code: "BCSE-008",
  credits: 4,
  instructor: "Department of Computer Science & Engineering (MMDU)",
  notesCount: "4 Units Comprehensive Long Notes & Solved Questions",
  rating: 5.0,
  description: "Official MMDU syllabus (BCSE-008): Computational problem types, logic paradigms, 4-stage compilation pipeline, memory segmentation, 9-tier operator precedence, typecasting, 2D array row-major addressing, 12-point storage classes matrix, Near/Far/Huge pointers, DMA, and file streams with solved examination questions.",
  banner: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80"
};

export const cUnitsData = [
  {
    unitNum: 1,
    title: "Programming Fundamentals, Compilation Pipeline & Problem Solving",
    examWeightage: "24 - 28 Marks",
    readingTime: "40 mins",
    summary: "Computational problem classifications, Deductive vs Inductive reasoning, Top-down design & flowchart standards, Black-box vs White-box testing, 4 error tiers, Big-O complexity matrix, dry-run trace tables, translators comparison, 4-stage compilation pipeline, and virtual process memory layout.",
    sections: [
      {
        sectionId: "c-u1-s1",
        title: "1. Computational Problem Classification & Logic Types",
        content: `### 1. Computational Problem Classifications

In computer science and software engineering, computational problems are systematically categorized based on the nature of their output space:

1. **Decision Problems:** Problems requiring a deterministic Boolean output (\`True\` or \`False\`, \`1\` or \`0\`). Example: Given an integer $N$, decide whether $N$ is prime.
2. **Counting Problems:** Problems that compute the cardinality of valid solutions satisfying specific constraints. Example: Counting the number of distinct paths in a grid.
3. **Optimization Problems:** Problems requiring the identification of the globally best candidate among all feasible configurations according to an objective function. Example: Shortest path routing in network packet switching.

---

### 2. Logic Paradigms: Deductive vs. Inductive Reasoning

Program construction and formal algorithmic proofs rely on two core logic frameworks:

| # | Dimension | Deductive Logic | Inductive Logic |
| :--- | :--- | :--- | :--- |
| **1** | **Direction** | **Top-Down:** Starts with general axioms/theories and deduces specific guaranteed truths. | **Bottom-Up:** Starts with specific empirical observations and infers general probabilistic patterns. |
| **2** | **Validation Guarantee** | **Guaranteed Absolute Truth:** If premises are valid and logic rules hold, conclusions are incontrovertible. | **Probabilistic / Plausible:** True for observed training sample, but unverified for unobserved edge cases. |
| **3** | **Software Role** | Formal program verification, loop invariants, and algorithmic correctness proofs. | Test-driven development (TDD), heuristic AI search, and empirical profiling. |
| **4** | **C Engineering Example** | Proving loop invariant: If loop starts at \`i=0\` and increments by 1, \`while(i < N)\` executes exactly $N$ iterations. | Running 10 unit test cases with positive inputs: it suggests the code works, but does not mathematically prove absence of memory leaks. |`
      },
      {
        sectionId: "c-u1-s2",
        title: "2. Algorithmic Design, Flowcharts & Stepwise Refinement",
        content: `### 1. Stepwise Refinement (Top-Down Decomposition)

**Stepwise Refinement** (formulated by Niklaus Wirth) is an architectural discipline where a high-level problem statement is iteratively decomposed into smaller, self-contained sub-modules until every sub-task maps directly to elementary language primitives.

> 🟢 **Core Benefits of Stepwise Refinement:**
> - **Cognitive Manageability:** Prevents cognitive overload by isolating architectural concerns.
> - **Modularity:** Subroutines can be developed, compiled, and unit-tested in isolation.
> - **Reusability:** Common computational kernels (e.g., searching, sorting) become shared utility functions.

---

### 2. Standard ANSI Flowcharting Symbols

ANSI standardized flowchart symbology enforces unambiguous visual algorithmic blueprints:

| Symbol Shape | ANSI Geometric Form | Engineering Purpose | C Language Mapping |
| :--- | :--- | :--- | :--- |
| **Terminal** | Rounded Oval / Capsule | Indicates entry point (Start) or termination point (Stop/End). | \`int main()\` / \`return 0;\` |
| **Input / Output** | Parallelogram | Data ingestion or presentation across peripheral streams. | \`scanf()\`, \`printf()\`, \`fgets()\` |
| **Process** | Rectangle | Computational operations, variable initializations, state mutations. | \`c = a + b;\`, \`i = 0;\` |
| **Decision** | Rhombus (Diamond) | Conditional evaluation producing branching Boolean pathways (True/False). | \`if (x > 0)\`, \`switch (ch)\` |
| **Connector** | Circle with alphanumeric key | Merges convergent execution paths without crossing connector arrows. | Loop junction nodes |`
      },
      {
        sectionId: "c-u1-s3",
        title: "3. Testing Strategies & 4 Tiers of Program Defects",
        content: `### 1. Black-Box vs. White-Box Testing Methodologies

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
| **1. Syntax Error** | Translation / Compile Time | Violation of C grammar rules; caught by compiler tokenizer or parser. | Missing semicolon \`;\`, mismatched braces \`{\`, misspelled keyword \`whlie\`. |
| **2. Linker Error** | Linking Time (\`ld\`) | Unresolved external symbols; function declared but missing object definition. | Calling \`clrscr()\` or \`foo()\` without linking their object library. |
| **3. Runtime Error** | Program Execution Time | Illegal CPU instructions or OS protection faults causing abnormal termination. | Division by zero (\`x / 0\`), Segmentation Fault (SIGSEGV) accessing address 0x0. |
| **4. Semantic / Logic Error** | User Testing / Output Validation | Program compiles and runs without crashing, but generates incorrect results. | Using \`i <= n\` instead of \`i < n\` causing an off-by-one array overwrite. |`
      },
      {
        sectionId: "c-u1-s4",
        title: "4. Algorithmic Complexity (Big-O) & Dry-Run Trace Tables",
        content: `### 1. Asymptotic Complexity: Big-O Mathematical Taxonomy

Big-O notation characterizes the upper bound of resource consumption (time or memory space) as input size $N$ tends to infinity:

| Notation | Complexity Name | Growth Rate for $N = 1000$ | Canonical C Algorithm |
| :--- | :--- | :--- | :--- |
| **O(1)** | Constant Time | 1 operation | Array indexing \`A[i]\`, pointer dereference \`*p\`. |
| **O(log N)** | Logarithmic Time | $\\approx 10$ operations | Binary search in sorted array (halves problem space each step). |
| **O(N)** | Linear Time | 1,000 operations | Linear sequential search, single-pass array traversal. |
| **O(N log N)** | Linearithmic Time | $\\approx 10,000$ operations | Merge Sort, Quick Sort (average case divide & conquer). |
| **O(N²)** | Quadratic Time | 1,000,000 operations | Bubble Sort, Selection Sort, nested 2D matrix iteration. |

---

### 2. Dry-Run Variable Execution Trace Table

A **Dry Run** is a manual code simulation tracing variable states against line numbers to expose logic defects:

\`\`\`c
int sum = 0;
for (int i = 1; i <= 3; i++) {
    sum += i;
}
\`\`\`

**Trace Table:**

| Step | Source Line | Variable \`i\` | Condition \`i <= 3\` | Variable \`sum\` | Step Action Summary |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **0** | Line 1 | Undefined | - | 0 | Initialization of accumulator \`sum = 0\`. |
| **1** | Line 2 | 1 | 1 <= 3 (True) | 0 | Loop init \`i = 1\`; entry condition holds. |
| **2** | Line 3 | 1 | - | 1 | Accumulate: \`sum = 0 + 1 = 1\`. |
| **3** | Line 2 | 2 | 2 <= 3 (True) | 1 | Increment \`i++\`; condition holds. |
| **4** | Line\frac{3}{2}| - | 3 | Accumulate: \`sum = 1 + 2 = 3\`. |
| **5** | Line 2 | 3 | 3 <= 3 (True) | 3 | Increment \`i++\`; condition holds. |
| **6** | Line 3 | 3 | - | 6 | Accumulate: \`sum = 3 + 3 = 6\`. |
| **7** | Line 2 | 4 | 4 <= 3 (False) | 6 | Increment \`i++\`; condition fails ➔ Loop terminates! |`
      },
      {
        sectionId: "c-u1-s5",
        title: "5. Translators, 4-Stage Compilation Pipeline & Process Memory Layout",
        content: `### 1. Translators: Compiler vs. Interpreter vs. Assembler

| Comparative Dimension | Compiler | Interpreter | Assembler |
| :--- | :--- | :--- | :--- |
| **Input Source** | High-level language (C, C++, Rust). | High-level script (Python, JS, Ruby). | Assembly language mnemonics (8086, x86). |
| **Translation Unit** | Scans entire translation unit at once. | Interprets statement-by-statement. | 1-to-1 conversion of mnemonic to opcode. |
| **Intermediate Object** | Generates relocatable object file (\`.o\`/\`.obj\`). | No standalone object file produced. | Generates relocatable machine code. |
| **Execution Speed** | Extremely fast direct hardware execution. | Slower due to runtime interpretation overhead. | Maximum execution speed on target CPU. |
| **Error Reporting** | Compiles list of all syntax errors at once. | Halts execution immediately on first error. | Reports syntax errors during assembly pass. |

---

### 2. The 4-Stage C Compilation Pipeline

When invoking \`gcc prog.c -o prog.exe\`, four distinct system subsystems execute in pipeline order:

\`\`\`
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
\`\`\`

---

### 3. C Process Virtual Memory Layout in RAM

When an executable binary is launched by the OS loader, it is allocated a private virtual memory address space:

| Memory Segment | Growth Direction | Stored Content & Characteristics |
| :--- | :--- | :--- |
| **Stack Segment** | **Grows Downwards (High ➔ Low)** | Local automatic variables (\`auto\`), function parameter lists, return addresses, and stack activation records. Automatically allocated and released. |
| **Free Pool Boundary** | Stack/Heap Interface | Memory area where stack and heap grow toward each other. Depletion causes Stack Overflow. |
| **Heap Segment** | **Grows Upwards (Low ➔ High)** | Dynamically allocated memory at runtime via \`malloc()\`, \`calloc()\`, \`realloc()\`. Must be explicitly released via \`free()\`. |
| **BSS Segment** | Static / Fixed | Uninitialized global and static variables. Automatically initialized to zero by the OS loader prior to \`main()\`. |
| **Initialized Data** | Static / Fixed | Global and static variables explicitly initialized with non-zero literals in source code (e.g., \`int global_x = 100;\`). |
| **Text / Code Segment** | Static / Low Memory (0x0) | Read-only compiled CPU binary instructions. Protected by OS from runtime overwrite attempts. |`
      },
      {
        sectionId: "c-u1-s6",
        title: "6. University Examination Solved Questions (Unit 1)",
        content: `### University Solved Examination Problems (MMDU Pattern)

#### Question 1 (1 Mark): Missing Intermediate Stage
**Question:** In the standard C compilation pipeline, complete the missing block \`[ ? ]\` generated by compiler \`ccl\` prior to machine code generation:  
\`\`\`
prog.c ➔ Preprocessor (cpp) ➔ prog.i ➔ Compiler (ccl) ➔ [ ? ] ➔ Assembler (as) ➔ prog.o
\`\`\`

**Step-by-Step Solution:**
\`\`\`
prog.i (Expanded C) ➔ Compiler (ccl) ➔ Assembly Code (prog.s) ➔ Assembler (as) ➔ prog.o
\`\`\`
The compiler \`ccl\` translates expanded pure C code into target ISA **Assembly Language Code (\`prog.s\`)**.

---

#### Question 2 (1 Mark): Memory Segment Identification
**Question:** Refer to the virtual RAM architecture below. Which labeled segment corresponds to memory allocated via \`malloc()\`?
\`\`\`
[ High Memory: Stack (↓) ] ➔ [ Free Memory Space ] ➔ [ Segment X (↑) ] ➔ [ BSS ] ➔ [ Data ] ➔ [ Text ]
\`\`\`

**Step-by-Step Solution:**
\`\`\`
Segment X = Heap Segment (Grows Upwards towards higher memory addresses)
\`\`\`
**Segment X is the Heap Segment**, managed dynamically at runtime using functions in \`<stdlib.h>\`.

---

#### Question 13 (2 Marks): Dry Run Loop Trace
**Question:** Trace the variable states during execution of the digit-sum loop for \`N = 345\`:
\`\`\`
while(n > 0) { rem = n % 10; sum += rem; n /= 10; }
\`\`\`

**Step-by-Step Solution:**

| Iteration | Initial \`n\` | Condition \`n > 0\` | \`rem = n % 10\` | \`sum += rem\` | Updated \`n /= 10\` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Init** | 345 | - | - | 0 | 345 |
| **Pass 1** | 345 | True | 5 | 0 + 5 = 5 | 34 |
| **Pass 2** | 34 | True | 4 | 5 + 4 = 9 | 3 |
| **Pass 3** | 3 | True | 3 | 9 + 3 = 12 | 0 |
| **Exit** | 0 | False (Terminates) | - | **12 (Final Result)** | 0 |

---

#### Question 17 (4 Marks): Quadratic Equation Algorithm & Flowchart
**Question:** Construct an algorithm and top-down decision structure to compute all roots of $ax^2 + bx + c = 0$.

**Step-by-Step Solution:**
1. Ingest coefficients $a, b, c$.
2. Compute Discriminant $D = b^2 - 4ac$.
3. Decision Branches:
   - If $D > 0$: Real & Distinct roots: $r_1 = \\frac{-b + \sqrt{D}}{2a}, r_2 = \\frac{-b - \sqrt{D}}{2a}$.
   - If $D = 0$: Real & Equal roots: $r_1 = r_2 = \\frac{-b}{2a}$.
   - If $D < 0$: Complex Conjugate roots: $	\text{Real} = \\frac{-b}{2a}, 	\text{Imag} = \\frac{\sqrt{-D}}{2a}$. Output: $	\text{Real} ± i·	\text{Imag}$.

<div class="circuit-diagram-card flowchart-card" style="background:#0b1329; border:1.5px solid #0284c7; border-radius:12px; padding:16px; margin:20px 0;">
  <svg class="circuit-svg flowchart-svg" viewBox="0 0 720 460" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="flow-arr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8" />
      </marker>
      <marker id="flow-arr-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
      </marker>
      <marker id="flow-arr-rose" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f43f5e" />
      </marker>
    </defs>
    
    <rect x="5" y="5" width="710" height="450" rx="12" fill="rgba(15,23,42,0.7)" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="4 4" />
    <text x="360" y="28" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="bold" letter-spacing="1">ANSI FLOWCHART: QUADRATIC EQUATION ROOTS RESOLUTION (ax² + bx + c = 0)</text>

    <!-- Start Terminal -->
    <rect x="305" y="42" width="110" height="30" rx="15" fill="rgba(16,185,129,0.2)" stroke="#10b981" stroke-width="2" />
    <text x="360" y="62" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold">START</text>
    
    <line x1="360" y1="72" x2="360" y2="92" stroke="#38bdf8" stroke-width="2" marker-end="url(#flow-arr)" />

    <!-- Input Parallelogram -->
    <polygon points="275,122 425,122 445,92 295,92" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" stroke-width="1.8" />
    <text x="360" y="112" text-anchor="middle" fill="#e0f2fe" font-size="11" font-weight="bold">Input Coefficients a, b, c</text>

    <line x1="360" y1="122" x2="360" y2="142" stroke="#38bdf8" stroke-width="2" marker-end="url(#flow-arr)" />

    <!-- Decision: a == 0? -->
    <polygon points="360,142 420,167 360,192 300,167" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" stroke-width="2" />
    <text x="360" y="171" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">Is a == 0?</text>

    <!-- Branch: a == 0 YES (Linear) -->
    <line x1="420" y1="167" x2="570" y2="167" stroke="#f43f5e" stroke-width="2" marker-end="url(#flow-arr-rose)" />
    <text x="465" y="160" fill="#fda4af" font-size="10" font-weight="bold">YES (Linear)</text>
    
    <polygon points="510,195 640,195 655,167 525,167" fill="rgba(244,63,94,0.15)" stroke="#f43f5e" stroke-width="1.5" />
    <text x="585" y="185" text-anchor="middle" fill="#fca5a5" font-size="10" font-weight="bold">Output: "Not Quadratic"</text>

    <line x1="360" y1="192" x2="360" y2="212" stroke="#38bdf8" stroke-width="2" marker-end="url(#flow-arr)" />
    <text x="368" y="206" fill="#86efac" font-size="10" font-weight="bold">NO</text>

    <!-- Process Box: D = b² - 4ac -->
    <rect x="280" y="212" width="160" height="32" rx="6" fill="rgba(129,140,248,0.15)" stroke="#818cf8" stroke-width="1.8" />
    <text x="360" y="232" text-anchor="middle" fill="#c7d2fe" font-size="11" font-weight="bold">Calculate D = b² − 4ac</text>

    <line x1="360" y1="244" x2="360" y2="264" stroke="#38bdf8" stroke-width="2" marker-end="url(#flow-arr)" />

    <!-- Decision: D > 0? -->
    <polygon points="360,264 425,289 360,314 295,289" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" stroke-width="2" />
    <text x="360" y="293" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">Is D &gt; 0?</text>

    <!-- Branch D > 0 YES: Real & Distinct -->
    <line x1="295" y1="289" x2="160" y2="289" stroke="#10b981" stroke-width="2" marker-end="url(#flow-arr-green)" />
    <text x="215" y="282" fill="#86efac" font-size="10" font-weight="bold">YES (Real &amp; Distinct)</text>

    <rect x="50" y="325" width="200" height="48" rx="6" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1.5" />
    <line x1="160" y1="289" x2="160" y2="325" stroke="#10b981" stroke-width="2" />
    <text x="150" y="344" text-anchor="middle" fill="#86efac" font-size="10" font-weight="bold">r₁ = (−b + √D) / 2a</text>
    <text x="150" y="362" text-anchor="middle" fill="#86efac" font-size="10" font-weight="bold">r₂ = (−b − √D) / 2a</text>

    <!-- Branch D > 0 NO: Check D == 0 -->
    <line x1="425" y1="289" x2="520" y2="289" stroke="#38bdf8" stroke-width="2" marker-end="url(#flow-arr)" />
    <text x="450" y="282" fill="#cbd5e1" font-size="10" font-weight="bold">NO</text>

    <!-- Decision: D == 0? -->
    <polygon points="520,289 575,310 520,331 465,310" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" stroke-width="1.8" />
    <text x="520" y="314" text-anchor="middle" fill="#fbbf24" font-size="10" font-weight="bold">Is D == 0?</text>

    <!-- D == 0 YES: Real & Equal -->
    <line x1="465" y1="310" x2="380" y2="310" stroke="#38bdf8" stroke-width="2" />
    <line x1="380" y1="310" x2="380" y2="335" stroke="#38bdf8" stroke-width="2" marker-end="url(#flow-arr)" />
    <text x="415" y="304" fill="#38bdf8" font-size="9" font-weight="bold">YES (Equal)</text>

    <rect x="290" y="335" width="180" height="38" rx="6" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" stroke-width="1.5" />
    <text x="380" y="352" text-anchor="middle" fill="#e0f2fe" font-size="10" font-weight="bold">r₁ = r₂ = −b / 2a</text>
    <text x="380" y="367" text-anchor="middle" fill="#94a3b8" font-size="9" font-style="italic">(Two Identical Real Roots)</text>

    <!-- D == 0 NO: Complex Roots -->
    <line x1="575" y1="310" x2="620" y2="310" stroke="#f43f5e" stroke-width="2" />
    <line x1="620" y1="310" x2="620" y2="335" stroke="#f43f5e" stroke-width="2" marker-end="url(#flow-arr-rose)" />
    <text x="585" y="304" fill="#fda4af" font-size="9" font-weight="bold">NO (Complex)</text>

    <rect x="510" y="335" width="200" height="38" rx="6" fill="rgba(244,63,94,0.15)" stroke="#f43f5e" stroke-width="1.5" />
    <text x="610" y="351" text-anchor="middle" fill="#fca5a5" font-size="9.5" font-weight="bold">Real = −b / 2a | Imag = √(-D)/2a</text>
    <text x="610" y="366" text-anchor="middle" fill="#fca5a5" font-size="9.5" font-weight="bold">Roots: Real ± i · Imag</text>

    <!-- Convergence lines to STOP -->
    <line x1="150" y1="373" x2="150" y2="400" stroke="#38bdf8" stroke-width="1.5" />
    <line x1="380" y1="373" x2="380" y2="400" stroke="#38bdf8" stroke-width="1.5" />
    <line x1="610" y1="373" x2="610" y2="400" stroke="#38bdf8" stroke-width="1.5" />
    <line x1="150" y1="400" x2="610" y2="400" stroke="#38bdf8" stroke-width="1.5" />
    <line x1="360" y1="400" x2="360" y2="415" stroke="#38bdf8" stroke-width="2" marker-end="url(#flow-arr)" />

    <!-- Stop Terminal -->
    <rect x="315" y="415" width="90" height="26" rx="13" fill="rgba(239,68,68,0.2)" stroke="#ef4444" stroke-width="2" />
    <text x="360" y="432" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">STOP</text>
  </svg>
  <div class="circuit-diagram-caption" style="text-align:center; font-size:10pt; font-weight:bold; color:#38bdf8; margin-top:8px;">
    Fig 1.1: Complete ANSI Standard Decision Flowchart for Quadratic Equation Roots (Discriminant Analysis)
  </div>
</div>

\`\`\`c
#include <stdio.h>
#include <math.h>

void solveQuadratic(double a, double b, double c) {
    if (a == 0) { printf("Not quadratic!\n"); return; }
    double d = b*b - 4*a*c;
    if (d > 0) {
        printf("Roots: %.2f, %.2f\n", (-b + sqrt(d))/(2*a), (-b - sqrt(d))/(2*a));
    } else if (d == 0) {
        printf("Equal Roots: %.2f\n", -b/(2*a));
    } else {
        printf("Complex: %.2f + %.2fi, %.2f - %.2fi\n", -b/(2*a), sqrt\frac{-d}{2*a}, -b/(2*a), sqrt\frac{-d}{2*a});
    }
}
\`\`\``
      }
    ]
  },
  {
    unitNum: 2,
    title: "Core Programming Concepts, Operators & Control Structures",
    examWeightage: "24 - 28 Marks",
    readingTime: "38 mins",
    summary: "C Tokens, 32 ANSI keywords, identifier grammar, constants, primitive data types table, 9-tier operator precedence hierarchy, implicit integer promotions vs explicit typecasting, header files taxonomy, switch fall-through, and loop lifecycles with nested 2D matrix traversal.",
    sections: [
      {
        sectionId: "c-u2-s1",
        title: "1. Tokens, Keywords, Identifiers & Primitive Data Types",
        content: `### 1. C Tokens Architecture

Tokens are the atomic lexical units recognized by the C compiler. They comprise:
- **Keywords:** 32 reserved words in C89/C90 (e.g., \`auto\`, \`volatile\`, \`sizeof\`, \`typedef\`).
- **Identifiers:** User-defined symbolic names for variables and functions. Rules: Must begin with \`[a-zA-Z_]\`, followed by alphanumeric or underscore characters. Case-sensitive.
- **Constants:** Immutable literals (Integer literals \`100\`, Octal \`012\`, Hex \`0x64\`, Floating-point \`3.14\`, Character \`'A'\`, String \`"Hello"\`).

---

### 2. Primitive Data Types, Memory Storage & Specifiers

| Data Type | Storage in RAM | Format Specifier | Range (32-bit Architecture) | Encoding Scheme |
| :--- | :--- | :--- | :--- | :--- |
| **char** | 1 Byte (8 bits) | \`%c\` | -128 to 127 | ASCII / 2's Complement |
| **unsigned char** | 1 Byte | \`%c\`, \`%u\` | 0 to 255 | Pure binary magnitude |
| **int** | 4 Bytes (32 bits) | \`%d\`, \`%i\` | -2,147,483,648 to 2,147,483,647 | Signed 2's Complement |
| **unsigned int** | 4 Bytes | \`%u\` | 0 to 4,294,967,295 | Pure binary magnitude |
| **float** | 4 Bytes | \`%f\` | $\\approx 3.4	\times 10^{-38}$ to $3.4	\times 10^{38}$ (6 decimals) | IEEE 754 Single Precision |
| **double** | 8 Bytes | \`%lf\` | $\\approx 1.7	\times 10^{-308}$ to $1.7	\times 10^{308}$ (15 decimals) | IEEE 754 Double Precision |
| **void*** | 4 / 8 Bytes | \`%p\` | Valid Virtual Memory Addresses | Unsigned Hexadecimal |`
      },
      {
        sectionId: "c-u2-s2",
        title: "2. Complete 9-Tier Operator Precedence & Associativity Hierarchy",
        content: `### Complete 9-Tier Operator Hierarchy Master Table

| Tier | Category | Operators | Associativity | Key Exam Rules & Behaviors |
| :--- | :--- | :--- | :--- | :--- |
| **1 (Highest)** | Postfix / Subscript | \`()  []  ->  .  ++  --\` | Left-to-Right | Function call \`()\`, array subscript \`[]\`, and member access \`->\` resolve first. |
| **2** | Unary | \`+  -  !  ~  ++  --  (type)  *  &  sizeof\` | **Right-to-Left** | Prefix operators, address-of \`&\`, dereference \`*\`, and explicit cast evaluate right-to-left. |
| **3** | Multiplicative | \`*  /  %\` | Left-to-Right | Modulus \`%\` requires integral operands only (compiler error on floats). |
| **4** | Additive | \`+  -\` | Left-to-Right | Standard arithmetic addition and subtraction. |
| **5** | Relational | \`<  <=  >  >=\` | Left-to-Right | Yields Boolean 1 (True) or 0 (False). |
| **6** | Equality | \`==  !=\` | Left-to-Right | Lower precedence than relational: \`a < b == c\` evaluates as \`(a < b) == c\`. |
| **7** | Logical | \`&&\` (AND) then \`||\` (OR) | Left-to-Right | **Short-Circuit:** In \`A && B\`, if A=0, B is skipped! In \`A || B\`, if A=1, B is skipped! |
| **8** | Ternary Conditional | \`? :\` | **Right-to-Left** | \`condition ? expr1 : expr2\`. Nested ternaries group right-to-left. |
| **9 (Lowest)** | Assignment & Comma | \`=  +=  -=  *=  /=  %=\` | \`,\` | **R-to-L** (=) | L-to-R (,) | Comma operator evaluates left-to-right and returns rightmost expression. |`
      },
      {
        sectionId: "c-u2-s3",
        title: "3. Type Conversion: Implicit Promotion vs Explicit Typecasting",
        content: `### 1. Implicit Type Conversion (Usual Arithmetic Conversions)

The C compiler automatically promotes lower-ranked types to higher-ranked types during binary expression evaluation to preserve precision:

\`\`\`
bool ➔ char ➔ short ➔ int ➔ unsigned int ➔ long ➔ unsigned long ➔ float ➔ double ➔ long double
\`\`\`

> ⚠️ **The Classic Integer Division Hazard:**
> \`\`\`c
> int a = 5, b = 2;
> float result = a / b; // result evaluates to 2.000000, NOT 2.5!
> \`\`\`
> **Root Cause:** Both \`a\` and \`b\` are integers. The compiler performs integer division (\`5 / 2 = 2\`), discarding the remainder before promoting the integer \`2\` to \`float 2.000000\`.

---

### 2. Explicit Typecasting

The programmer explicitly overrides default conversions using the cast operator \`(target_type)expression\`:

\`\`\`c
int a = 5, b = 2;
float result = (float)a / b; // Promotes 'a' to float first ➔ 5.0 / 2 yields 2.500000!
\`\`\``
      },
      {
        sectionId: "c-u2-s4",
        title: "4. Standard Header Files Taxonomy",
        content: `### Directory of Key ANSI C Standard Library Headers

| Header File | Primary Purpose & Declarations | Canonical Library Functions |
| :--- | :--- | :--- |
| **\`<stdio.h>\`** | Standard Input/Output Streams & File Operations | \`printf\`, \`scanf\`, \`fopen\`, \`fscanf\`, \`fprintf\`, \`fclose\`, \`fgets\` |
| **\`<stdlib.h>\`** | Dynamic Memory, Process Control, Conversions | \`malloc\`, \`calloc\`, \`realloc\`, \`free\`, \`exit\`, \`atoi\`, \`rand\` |
| **\`<string.h>\`** | Null-terminated string manipulation & memory blocks | \`strlen\`, \`strcpy\`, \`strncpy\`, \`strcat\`, \`strcmp\`, \`memcpy\`, \`memset\` |
| **\`<math.h>\`** | Mathematical & trigonometric computational functions | \`pow\`, \`sqrt\`, \`sin\`, \`cos\`, \`tan\`, \`floor\`, \`ceil\`, \`fabs\` |
| **\`<ctype.h>\`** | Character classification and case transformation | \`isalpha\`, \`isdigit\`, \`isalnum\`, \`isspace\`, \`toupper\`, \`tolower\` |
| **\`<stdbool.h>\`** | Standard Boolean definitions (C99 onwards) | \`bool\`, \`true\` (1), \`false\` (0) |
| **\`<limits.h>\`** | Architecture platform limits for primitive integers | \`INT_MAX\`, \`INT_MIN\`, \`CHAR_BIT\`, \`LONG_MAX\` |`
      },
      {
        sectionId: "c-u2-s5",
        title: "5. Control Structures: Decision-Making, Loops & Jump Statements",
        content: `### 1. Decision-Making & Switch Fall-Through Mechanics

In C \`switch(expression)\`, the expression must evaluate to an integral or character constant. Omitting the \`break;\` statement causes **Fall-Through**, where control cascades sequentially into subsequent cases:

\`\`\`c
switch (grade) {
    case 'A': printf("Excellent "); // Omitting break causes fall-through!
    case 'B': printf("Good ");      // Executes if grade is 'A' OR 'B'!
              break;
    default:  printf("Average");
}
\`\`\`

---

### 2. Looping Lifecycles & Jump Statements

| Loop Construct | Control Type | Minimum Iterations | Best Suited For |
| :--- | :--- | :--- | :--- |
| **\`for\` Loop** | Entry-Controlled (Condition evaluated before body) | 0 times | Deterministic iterations with known step bounds. |
| **\`while\` Loop** | Entry-Controlled (Condition evaluated before body) | 0 times | Event-driven loops where termination depends on runtime state. |
| **\`do-while\` Loop** | **Exit-Controlled** (Condition evaluated after body) | **1 time** | Interactive menu loops requiring at least one display pass. |

<div class="circuit-diagram-card flowchart-card" style="background:#0b1329; border:1.5px solid #0284c7; border-radius:12px; padding:16px; margin:20px 0;">
  <svg class="circuit-svg flowchart-svg" viewBox="0 0 720 380" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="loop-arr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8" />
      </marker>
      <marker id="loop-arr-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
      </marker>
      <marker id="loop-arr-rose" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f43f5e" />
      </marker>
    </defs>
    
    <rect x="5" y="5" width="710" height="370" rx="12" fill="rgba(15,23,42,0.7)" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="4 4" />
    <text x="360" y="28" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="bold" letter-spacing="1">ANSI ARCHITECTURAL FLOWCHART: WHILE LOOP (ENTRY-CONTROLLED) VS DO-WHILE (EXIT-CONTROLLED)</text>

    <!-- LEFT PANEL: WHILE LOOP -->
    <rect x="25" y="45" width="325" height="315" rx="8" fill="rgba(56,189,248,0.04)" stroke="#38bdf8" stroke-width="1.2" />
    <text x="187" y="68" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="bold">1. WHILE LOOP (PRE-TEST / ENTRY)</text>

    <!-- Start Entry -->
    <rect x="142" y="85" width="90" height="24" rx="12" fill="rgba(16,185,129,0.2)" stroke="#10b981" stroke-width="1.8" />
    <text x="187" y="101" text-anchor="middle" fill="#86efac" font-size="10" font-weight="bold">START / ENTRY</text>
    
    <line x1="187" y1="109" x2="187" y2="135" stroke="#38bdf8" stroke-width="2" marker-end="url(#loop-arr)" />

    <!-- Decision: Condition True? -->
    <polygon points="187,135 247,157 187,179 127,157" fill="rgba(245,158,11,0.18)" stroke="#f59e0b" stroke-width="2" />
    <text x="187" y="161" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">Condition True?</text>

    <!-- TRUE: Body -->
    <line x1="187" y1="179" x2="187" y2="215" stroke="#10b981" stroke-width="2" marker-end="url(#loop-arr-green)" />
    <text x="195" y="200" fill="#86efac" font-size="10" font-weight="bold">TRUE</text>

    <rect x="117" y="215" width="140" height="34" rx="6" fill="rgba(56,189,248,0.18)" stroke="#38bdf8" stroke-width="1.8" />
    <text x="187" y="235" text-anchor="middle" fill="#e0f2fe" font-size="11" font-weight="bold">Loop Body Statement(s)</text>

    <!-- Loopback to Condition -->
    <line x1="117" y1="232" x2="65" y2="232" stroke="#10b981" stroke-width="2" />
    <line x1="65" y1="232" x2="65" y2="122" stroke="#10b981" stroke-width="2" />
    <line x1="65" y1="122" x2="187" y2="122" stroke="#10b981" stroke-width="2" />
    <line x1="187" y1="122" x2="187" y2="135" stroke="#10b981" stroke-width="2" marker-end="url(#loop-arr-green)" />
    <text x="85" y="180" fill="#86efac" font-size="9" font-style="italic">Re-evaluate</text>

    <!-- FALSE: Exit -->
    <line x1="247" y1="157" x2="300" y2="157" stroke="#f43f5e" stroke-width="2" />
    <line x1="300" y1="157" x2="300" y2="280" stroke="#f43f5e" stroke-width="2" />
    <line x1="300" y1="280" x2="237" y2="280" stroke="#f43f5e" stroke-width="2" marker-end="url(#loop-arr-rose)" />
    <text x="255" y="150" fill="#fda4af" font-size="10" font-weight="bold">FALSE</text>

    <!-- Next Statement -->
    <rect x="127" y="265" width="110" height="28" rx="6" fill="rgba(148,163,184,0.15)" stroke="#94a3b8" stroke-width="1.5" />
    <text x="182" y="283" text-anchor="middle" fill="#cbd5e1" font-size="10" font-weight="bold">Next Statement</text>
    
    <text x="187" y="320" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="bold">★ Minimum Executions: 0 Times</text>
    <text x="187" y="338" text-anchor="middle" fill="#94a3b8" font-size="9" font-style="italic">If condition is initially false, body is NEVER entered.</text>


    <!-- RIGHT PANEL: DO-WHILE LOOP -->
    <rect x="370" y="45" width="325" height="315" rx="8" fill="rgba(168,85,247,0.04)" stroke="#a855f7" stroke-width="1.2" />
    <text x="532" y="68" text-anchor="middle" fill="#c084fc" font-size="12" font-weight="bold">2. DO-WHILE LOOP (POST-TEST / EXIT)</text>

    <!-- Start Entry -->
    <rect x="487" y="85" width="90" height="24" rx="12" fill="rgba(16,185,129,0.2)" stroke="#10b981" stroke-width="1.8" />
    <text x="532" y="101" text-anchor="middle" fill="#86efac" font-size="10" font-weight="bold">START / ENTRY</text>
    
    <line x1="532" y1="109" x2="532" y2="135" stroke="#a855f7" stroke-width="2" marker-end="url(#loop-arr)" />

    <!-- Body FIRST -->
    <rect x="462" y="135" width="140" height="34" rx="6" fill="rgba(168,85,247,0.18)" stroke="#a855f7" stroke-width="1.8" />
    <text x="532" y="155" text-anchor="middle" fill="#f3e8ff" font-size="11" font-weight="bold">Loop Body Statement(s)</text>

    <line x1="532" y1="169" x2="532" y2="200" stroke="#a855f7" stroke-width="2" marker-end="url(#loop-arr)" />

    <!-- Decision: Condition True? (Evaluated at End) -->
    <polygon points="532,200 592,222 532,244 472,222" fill="rgba(245,158,11,0.18)" stroke="#f59e0b" stroke-width="2" />
    <text x="532" y="226" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">Condition True?</text>

    <!-- TRUE: Loop Back UP to Body -->
    <line x1="472" y1="222" x2="415" y2="222" stroke="#10b981" stroke-width="2" />
    <line x1="415" y1="222" x2="415" y2="152" stroke="#10b981" stroke-width="2" />
    <line x1="415" y1="152" x2="462" y2="152" stroke="#10b981" stroke-width="2" marker-end="url(#loop-arr-green)" />
    <text x="440" y="215" fill="#86efac" font-size="10" font-weight="bold">TRUE</text>
    <text x="425" y="185" fill="#86efac" font-size="9" font-style="italic">Repeat</text>

    <!-- FALSE: Exit -->
    <line x1="532" y1="244" x2="532" y2="275" stroke="#f43f5e" stroke-width="2" marker-end="url(#loop-arr-rose)" />
    <text x="542" y="260" fill="#fda4af" font-size="10" font-weight="bold">FALSE</text>

    <!-- Next Statement -->
    <rect x="477" y="275" width="110" height="28" rx="6" fill="rgba(148,163,184,0.15)" stroke="#94a3b8" stroke-width="1.5" />
    <text x="532" y="293" text-anchor="middle" fill="#cbd5e1" font-size="10" font-weight="bold">Next Statement</text>
    
    <text x="532" y="320" text-anchor="middle" fill="#c084fc" font-size="10" font-weight="bold">★ Minimum Executions: Strictly 1 Time</text>
    <text x="532" y="338" text-anchor="middle" fill="#94a3b8" font-size="9" font-style="italic">Even if condition is immediately false, body executes once.</text>
  </svg>
  <div class="circuit-diagram-caption" style="text-align:center; font-size:10pt; font-weight:bold; color:#a855f7; margin-top:8px;">
    Fig 2.1: Architectural Control-Flow Comparison: Pre-Tested While Loop vs Post-Tested Do-While Loop
  </div>
</div>

**Jump Statements:**
- \`break;\`: Instantly aborts the innermost enclosing loop or switch block.
- \`continue;\`: Skips the remaining statements of the current pass and jumps directly to the loop update expression (\`i++\`).
- \`goto label;\`: Unconditional jump directly to a labeled statement. Strongly discouraged in structured programming.`
      },
      {
        sectionId: "c-u2-s6",
        title: "6. University Examination Solved Questions (Unit 2)",
        content: `### University Solved Examination Problems (MMDU Pattern)

#### Question 4 (1 Mark): Operator Precedence Evaluation
**Question:** Evaluate the expression order for: \`int x = 2, y = 3; int z = x + y * ++x;\`
\`\`\`
Binary Operator Tree with root '+' having left operand 'x' and right subtree 'y * (++x)'.
\`\`\`

**Step-by-Step Solution:**
1. Prefix increment \`++x\` (tier 2 unary) executes first: \`x\` becomes \`3\`.
2. Multiplicative operator \`*\` (tier 3) evaluates: \`y * x = 3 * 3 = 9\`.
3. Additive operator \`+\` (tier 4) evaluates: \`x + 9 = 3 + 9 = 12\`.  
**Result:** \`z = 12\`.

---

#### Question 14 (2 Marks): Short-Circuit Logic Evaluation
**Question:** What are the final values of \`a\` and \`b\` after executing:
\`\`\`c
int a = 0, b = 5;
if (a && ++b) { /* empty */ }
\`\`\`

**Step-by-Step Solution:**
\`\`\`
Left Operand (a == 0) is FALSE ➔ Short-Circuit Triggered ➔ Right expression (++b) is BYPASSED!
\`\`\`
Under ANSI C rules for logical \`&&\`, if the left operand evaluates to \`0\` (false), the outcome is guaranteed false. The compiler bypasses evaluation of the right operand. Thus, \`++b\` is never executed, and \`b\` remains **5**.  
**Final Values:** \`a = 0, b = 5\`.

---

#### Question 18 (4 Marks): Nested Loop Matrix Multiplication
**Question:** Explain the 3-tier nested loop structure required for multiplying matrices $A_{M 	\times K}$ and $B_{K 	\times N}$.

**Step-by-Step Solution:**
\`\`\`
Outer Loop (i: 0 to M-1) ➔ Iterates across Rows of Matrix A
  Middle Loop (j: 0 to N-1) ➔ Iterates across Columns of Matrix B
    Inner Accumulator (k: 0 to K-1) ➔ Dot product: C[i][j] += A[i][k] * B[k][j]
\`\`\`

\`\`\`c
void multiplyMatrices(int A[2][2], int B[2][2], int C[2][2]) {
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            C[i][j] = 0;
            for (int k = 0; k < 2; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
}
\`\`\`
**Complexity:** Executes $M 	\times N 	\times K$ times, yielding time complexity $O(M · N · K)$ ($O(N^3)$ for square matrices).`
      }
    ]
  },
  {
    unitNum: 3,
    title: "Arrays, Strings, Functions & Modular Programming",
    examWeightage: "24 - 28 Marks",
    readingTime: "45 mins",
    summary: "1D & 2D arrays, mathematical derivation of row-major order addressing, Linear Search, Binary Search, Bubble Sort step trace, string library functions, 12-point storage classes matrix, and call by value vs reference.",
    sections: [
      {
        sectionId: "c-u3-s1",
        title: "1. 1D & 2D Arrays: Memory Mapping & Row-Major Formula Derivation",
        content: `### 1. Array Memory Architecture

An array is a homogeneous collection of elements stored sequentially in contiguous memory locations.
- **1D Array Physical Address Formula:**
  $$\text{Address}(A[i]) = \text{Base Address} + (i \times \text{sizeof}(T))$$

---

### 2. Mathematical Derivation: 2D Array Row-Major Order

In C, multi-dimensional arrays are mapped into linear RAM in **Row-Major Order** (row 0 stored first, followed by row 1, etc.).

For an array declared as \`T A[R][C]\` with base address \`Base\` and element size \`S\`:
- To locate element \`A[i][j]\`, the program must skip \`i\` full preceding rows.
- Each row contains exactly \`C\` columns (elements).
- Within row \`i\`, the program must skip \`j\` preceding column elements.

$$\text{Total Elements Skipped} = (i \times C) + j$$
$$\\\mathbf{\\text{Address}(A[i][j]) = \text{Base Address} + \left[(i \times C) + j\\right] \times \text{sizeof}(T)}$$

> 🟢 **Numerical Examination Example:**
> Given \`int A[4][5]\` starting at \`Base = 2000\` with \`sizeof(int) = 4\` bytes:
> Find the physical address of element \`A[2][3]\`:
> - \`i = 2, C = 5, j = 3, S = 4\`
> - $\text{Offset} = (2 \times 5 + 3) \times 4 = 13 \times 4 = 52\text{ bytes}$
> - $\text{Address}(A[2][3]) = 2000 + 52 = \mathbf{2052}$`
      },
      {
        sectionId: "c-u3-s2",
        title: "2. Searching & Sorting Algorithms: Linear, Binary & Bubble Sort",
        content: `### Searching & Sorting Master Comparative Matrix

| Algorithm | Preconditions | Best Time | Worst Time | Space | Core Operational Principle |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Linear Search** | None (Unordered) | $O(1)$ | $O(N)$ | $O(1)$ | Sequentially compares search key against indices $0$ to $N-1$. |
| **Binary Search** | **Array must be sorted!** | $O(1)$ | $O(\log N)$ | $O(1)$ | Computes \`mid = low + (high-low)/2\`; halves search space each step. |
| **Bubble Sort** | None | $O(N)$ (optimized) | $O(N^2)$ | $O(1)$ | Repeatedly compares adjacent elements and swaps them, sinking maximum to the end. |

---

### Bubble Sort Step-by-Step Pass Trace

Tracing \`[64, 34, 25, 12, 22, 11, 90]\`:
- **Initial:** \`[64, 34, 25, 12, 22, 11, 90]\`
- **Pass 1:** Sinks **90** to index 6 ➔ \`[34, 25, 12, 22, 11, 64, 90]\`
- **Pass 2:** Sinks **64** to index 5 ➔ \`[25, 12, 22, 11, 34, 64, 90]\`
- **Pass 3:** Sinks **34** to index 4 ➔ \`[12, 22, 11, 25, 34, 64, 90]\`
- **Pass 4:** Sinks **25** to index 3 ➔ \`[12, 11, 22, 25, 34, 64, 90]\`
- **Pass 5:** Sinks **22** to index 2 ➔ \`[11, 12, 22, 25, 34, 64, 90]\`
- **Pass 6:** Zero swaps detected ➔ **Array completely sorted in $O(N)$ optimized time!**`
      },
      {
        sectionId: "c-u3-s3",
        title: "3. Exhaustive 12-Point Master Storage Classes Matrix",
        content: `### Complete 12-Point Storage Classes Matrix

| Storage Class | Keyword | Storage Location | Initial Default | Scope / Visibility | Lifetime | Linkage | Exam Key Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Automatic** | \`auto\` | Stack Memory | Garbage value | Local to block | Block execution | None | Default for all local variables. Destroyed upon function return. |
| **Register** | \`register\` | CPU Microprocessor Register | Garbage value | Local to block | Block execution | None | Fast access hint for loop counters. Address-of \`&var\` is ILLEGAL! |
| **Static** | \`static\` | Data Segment (BSS / Data) | Zero (\`0\` / \`'0'\`) | Local to block or file | Entire program run | Internal | Retains value across function invocations. Initialized once at compile time. |
| **External** | \`extern\` | Data Segment | Zero (\`0\` / \`'0'\`) | Global across all files | Entire program run | External | References a global variable defined in another file. Allocates no new memory. |`
      },
      {
        sectionId: "c-u3-s4",
        title: "4. Parameter Passing: Call by Value vs Reference & Recursion",
        content: `### 1. Call by Value vs. Call by Reference

| Feature | Call by Value | Call by Reference |
| :--- | :--- | :--- |
| **Passed Entity** | Copy of actual argument value is passed. | Memory address of variable (\`&x\`) is passed via pointers. |
| **Caller Modification** | Mutations to formal parameters do NOT affect caller. | Dereferencing (\`*p\`) directly mutates caller variable. |
| **Memory Cost** | Duplicates memory for large structs. | Zero copying overhead; passes a single 4/8-byte pointer. |
| **C Syntax** | \`void swap(int a, int b)\` | \`void swap(int *a, int *b)\` |

---

### 2. Recursion & Call Stack Frame Execution

Every recursive invocation allocates a new **Stack Frame** on the process stack. Execution must have a well-defined **Base Condition**; omitting it causes **Stack Overflow**:

\`\`\`
Calling fact(3):
[ Stack Frame 3: fact(3) waiting on 3 * fact(2) ] (Pushed)
[ Stack Frame 2: fact(2) waiting on 2 * fact(1) ] (Pushed)
[ Stack Frame 1: fact(1) hits base condition n <= 1 ] (Returns 1)
---------------- Unwinding Phase ----------------
Frame 2 receives 1 ➔ computes 2 * 1 = 2 (Popped)
Frame 3 receives 2 ➔ computes 3 * 2 = 6 (Popped ➔ Final Result = 6)
\`\`\``
      },
      {
        sectionId: "c-u3-s5",
        title: "5. University Examination Solved Questions (Unit 3)",
        content: `### University Solved Examination Problems (MMDU Pattern)

#### Question 7 (1 Mark): 2D Row-Major Address Calculation
**Question:** In a row-major 2D array \`int A[3][4]\` starting at \`Base = 1000\` with \`sizeof(int) = 4\`, find the linear address of \`A[1][2]\`.

**Step-by-Step Solution:**
$$\text{Offset} = (i \times C + j) \times \text{Size} = (1 \times 4 + 2) \times 4 = 6 \times 4 = 24\text{ bytes}$$
$$\text{Physical Address} = 1000 + 24 = \mathbf{1024}$$

---

#### Question 15 (2 Marks): Swap Implementation via Call by Reference
**Question:** Implement the classic integer swap function using pointers and explain why Call by Value fails.

**Step-by-Step Solution:**
\`\`\`c
// Call by Reference Swap:
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
} // In main: swap(&x, &y);
\`\`\`
Call by Value passes copies of \`x\` and \`y\`; mutating the copies leaves the caller's variables unchanged. Call by Reference passes memory addresses \`&x\` and \`&y\`, mutating actual values in the caller's stack frame.

---

#### Question 19 (4 Marks): Binary Search Implementation & Complexity
**Question:** Present the Binary Search algorithm and prove its $O(\log N)$ time complexity.

**Step-by-Step Solution:**
\`\`\`c
int binarySearch(int arr[], int n, int key) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2; // Prevents arithmetic overflow
        if (arr[mid] == key) return mid;
        else if (arr[mid] < key) low = mid + 1;
        else high = mid - 1;
    }
    return -1; // Not found
}
\`\`\`
**Proof:** Each comparison step halves the remaining array interval: $N \\rightarrow N/2 \\rightarrow N/4 ... \\rightarrow N/2^k = 1$. Solving $2^k = N$ gives $k = \log_2 N$. Maximum comparisons are $O(\log N)$.`
      }
    ]
  },
  {
    unitNum: 4,
    title: "Advanced Data Handling, Pointers, Structures, DMA & File I/O",
    examWeightage: "24 - 28 Marks",
    readingTime: "45 mins",
    summary: "Address arithmetic, pointer taxonomy, Near, Far, and Huge Pointers (16-bit offset vs 32-bit segment:offset and auto-normalization), Struct vs Union memory alignment, Dynamic Memory Allocation (malloc, calloc, realloc, free), and File I/O streams.",
    sections: [
      {
        sectionId: "c-u4-s1",
        title: "1. Pointer Taxonomy: Wild, Dangling, Void & Function Pointers",
        content: `### 1. Advanced Pointer Classification Matrix

| Pointer Type | Syntax & Definition | Memory Hazard / Behavior | Remediation / Safe Practice |
| :--- | :--- | :--- | :--- |
| **Wild Pointer** | \`int *ptr;\` (Uninitialized) | Points to arbitrary memory; dereferencing corrupts RAM or crashes process. | Always initialize to \`NULL\`: \`int *ptr = NULL;\`. |
| **Dangling Pointer** | \`free(ptr);\` (Target freed) | Points to deallocated storage that may be reassigned to other subsystems. | Set pointer to \`NULL\` immediately after freeing: \`free(ptr); ptr = NULL;\`. |
| **Void Pointer** | \`void *vptr = &x;\` | Generic memory pointer without data type association. Cannot be directly dereferenced. | Explicitly typecast before dereferencing: \`*(int*)vptr\`. |
| **Function Pointer** | \`int (*fp)(int, int) = &add;\` | Holds entry address of executable code in text segment. Enables runtime callbacks. | Invoked via \`int res = fp(10, 20);\`. |
| **Pointer to Array** | \`int (*p)[5];\` | Single pointer referencing an entire array block of 5 integers. | Used in multi-dimensional array parameter passing. |
| **Array of Pointers** | \`int *p[5];\` | Array containing 5 independent integer pointer variables. | Used in ragged 2D tables and string arrays (\`char *argv[]\`). |`
      },
      {
        sectionId: "c-u4-s2",
        title: "2. Real-Mode 16-Bit Architecture: Near, Far, and Huge Pointers",
        content: `### 8086 Segmented Memory Pointer Architecture

In 16-bit real-mode architecture (such as the 8086 microprocessor with 20-bit address bus addressing 1 MB of RAM), pointers are classified into three types:

$$\text{Physical Address} = (\text{Segment Register} \times 16) + \text{Offset}$$

| Pointer Classification | Address Width | Internal Structure | Accessible Memory Span | Key Characteristics & Comparison Rules |
| :--- | :--- | :--- | :--- | :--- |
| **Near Pointer** | **16-bit (2 Bytes)** | Offset only | **64 KB** (within default DS/CS) | Fastest address arithmetic; cannot access data outside the current 64 KB segment. |
| **Far Pointer** | **32-bit (4 Bytes)** | 16-bit Segment : 16-bit Offset | **1 MB** (Full real-mode RAM) | Can address any byte in 1 MB. **Hazard:** Addresses are unnormalized. \`0x1000:0x0010\` and \`0x1001:0x0000\` point to the identical byte, but \`p1 == p2\` evaluates to FALSE! |
| **Huge Pointer** | **32-bit (4 Bytes)** | Normalized Segment : Offset | **1 MB** (Full real-mode RAM) | **Auto-Normalizing:** Any offset $≥ 16$ is converted: $\text{Segment} \leftarrow \text{Segment} + (\text{Offset} / 16)$ and $\text{Offset} \leftarrow \text{Offset} \pmod{16}$. Relational comparisons are mathematically accurate across segments. |`
      },
      {
        sectionId: "c-u4-s3",
        title: "3. Structures, Unions & Memory Alignment Architecture",
        content: `### Structure vs. Union Architecture

| Dimension | Structure (\`struct\`) | Union (\`union\`) |
| :--- | :--- | :--- |
| **Keyword** | \`struct Record { int id; char grade; double score; };\` | \`union Record { int id; char grade; double score; };\` |
| **Memory Allocation** | Sum of all member sizes + structure padding bytes. | Space equal only to the size of its largest member. |
| **Memory Sharing** | Each member has its own distinct, sequential address offset. | **All members share the exact same starting memory address.** |
| **Active Members** | All members can store valid values simultaneously. | Only **ONE** member can hold a valid value at any given instant. |
| **Size Calculation** | $\text{sizeof}(\text{struct}) = 4 + 1\text{ (pad 3)} + 8 = \mathbf{16\text{ Bytes}}$ | $\text{sizeof}(\text{union}) = \max(4, 1, 8) = \mathbf{8\text{ Bytes}}$ |
| **Member Access** | \`var.id\` (Direct) or \`ptr->id\` (Indirect via pointer) | \`u.id\` (Direct) or \`u_ptr->id\` (Indirect via pointer) |`
      },
      {
        sectionId: "c-u4-s4",
        title: "4. Dynamic Memory Allocation (DMA) Complete Lifecycle",
        content: `### The Complete DMA Lifecycle

\`\`\`
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
\`\`\`

**DMA Functions (\`<stdlib.h>\`):**
- \`malloc(size_t size)\`: Allocates raw, uninitialized bytes from the heap pool (contains garbage).
- \`calloc(size_t n, size_t size)\`: Allocates memory and initializes all bits to zero.
- \`realloc(void *ptr, size_t new_size)\`: Resizes an existing heap block without losing existing data.
- \`free(void *ptr)\`: Returns memory back to the heap pool to prevent memory leaks.`
      },
      {
        sectionId: "c-u4-s5",
        title: "5. File Handling Operations & Stream Modes",
        content: `### File Stream Modes & I/O Functions

| Mode | Stream Meaning | If File Missing | If File Already Exists | Stream Functions |
| :--- | :--- | :--- | :--- | :--- |
| **\`"r"\`** | Read Text | Returns \`NULL\` error pointer | Opens file; read position at byte 0 | \`fscanf()\`, \`fgetc()\`, \`fgets()\` |
| **\`"w"\`** | Write Text | Creates a new empty file | **Truncates (erases) file to 0 bytes!** | \`fprintf()\`, \`fputc()\`, \`fputs()\` |
| **\`"a"\`** | Append Text | Creates a new empty file | Preserves data; all writes appended at EOF | \`fprintf()\`, \`fputs()\` |
| **\`"r+"\`** | Read & Write | Returns \`NULL\` error pointer | Opens file for update without truncation | \`fseek()\`, \`ftell()\`, \`rewind()\` |
| **\`"rb"\` / \`"wb"\`**| Binary Stream | Opens file for binary mode | No CR/LF translation; raw byte storage | \`fread()\`, \`fwrite()\` |`
      },
      {
        sectionId: "c-u4-s6",
        title: "6. University Examination Solved Questions (Unit 4)",
        content: `### University Solved Examination Problems (MMDU Pattern)

#### Question 10 (1 Mark): Dangling Pointer Remediation
**Question:** What hazard is introduced after calling \`free(p);\`, and how is it resolved?

**Step-by-Step Solution:**
\`\`\`
Pointer p ➔ [ Address 0x5000 ] ➔ Heap block released ➔ Pointer p still retains 0x5000
\`\`\`
\`p\` becomes a **Dangling Pointer**. Dereferencing it leads to memory corruption or crashes. Remediation: explicitly assign \`p = NULL;\` immediately after calling \`free(p);\`.

---

#### Question 20 (4 Marks): Near, Far, and Huge Pointers in 8086
**Question:** Explain Near, Far, and Huge pointers in 16-bit 8086 architecture with segment arithmetic.

**Step-by-Step Solution:**
1. **Near Pointer:** 16-bit offset. Limited to current 64 KB segment. Fast arithmetic.
2. **Far Pointer:** 32-bit (16-bit segment : 16-bit offset). Addresses full 1 MB. Unnormalized: \`0x1000:0x0010\` and \`0x1001:0x0000\` point to the same physical byte, but relational equality evaluates to false!
3. **Huge Pointer:** 32-bit auto-normalized pointer. Converts any offset $≥ 16$: $\text{Segment} \leftarrow \text{Segment} + (\text{Offset} / 16)$ and $\text{Offset} \leftarrow \text{Offset} \pmod{16}$. Relational comparisons are mathematically accurate.

---

#### Question 23 (6 Marks): Student Records with DMA and Binary File I/O
**Question:** Design an architecture in ANSI C to dynamically allocate an array of \`Student\` structures on the heap, write records to \`students.dat\`, and read them back.

**Step-by-Step Solution:**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int rollNo;
    char name[32];
    float gpa;
} Student;

void processRecords(int n) {
    // 1. Dynamic Allocation
    Student *list = (Student*)malloc(n * sizeof(Student));
    if (!list) { printf("Heap allocation failed!\n"); return; }
    
    // 2. Initialize sample record
    list[0].rollNo = 101; sprintf(list[0].name, "Aman"); list[0].gpa = 8.85f;
    
    // 3. Persist to Binary File
    FILE *fp = fopen("students.dat", "wb");
    if (fp) {
        fwrite(list, sizeof(Student), n, fp);
        fclose(fp);
    }
    
    // 4. Read back into fresh heap buffer
    Student *readList = (Student*)malloc(n * sizeof(Student));
    fp = fopen("students.dat", "rb");
    if (fp) {
        fread(readList, sizeof(Student), n, fp);
        printf("Recovered: Roll %d, Name: %s, GPA: %.2f\n",
               readList[0].rollNo, readList[0].name, readList[0].gpa);
        fclose(fp);
    }
    
    // 5. Clean up heap memory
    free(list); free(readList);
}
\`\`\`

---

#### Question 24 (6 Marks): Function Pointers & Callback Sorting
**Question:** Explain the mechanism of Function Pointers in C by implementing a generic bubble sort that accepts a comparison callback.

**Step-by-Step Solution:**
\`\`\`c
#include <stdio.h>

int ascending(int a, int b) { return a > b; }
int descending(int a, int b) { return a < b; }

void genericSort(int arr[], int n, int (*compare)(int, int)) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (compare(arr[j], arr[j + 1])) { // Dynamic callback!
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int data[] = {45, 12, 89, 34};
    genericSort(data, 4, ascending);  // Sorts [12, 34, 45, 89]
    genericSort(data, 4, descending); // Sorts [89, 45, 34, 12]
    return 0;
}
\`\`\``
      }
    ]
  }
];
