### MMDU Official University Solved Examination Questions (Unit 4)
**Course:** Basic Electrical & Electronics Engineering (`BELE-001`)  
**Pattern:** Sections A (1 Mark Compulsory), B (2 Marks Analytical), C (6 Marks In-Depth), D (6 Marks Design/Long)

---
<example level="easy" title="Question 10 (1 Mark): Self-Complementing Property of Excess-3 Code">
**Question:**  
Demonstrate why Excess-3 code is termed a self-complementing code using decimal digit 4.

> 📊 **Question Schematic / State Specification:**
```
Question 9's Complement Inversion: 9's complement of decimal 4 is (9 - 4) = 5.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Bitwise Inversion Trace:

        `Excess-3(4) = 4 + 3 = 7 = 0111_2`.

        `Bitwise NOT(0111_2) = 1000_2 = 8₁₀ = 5 + 3 = Excess-3(5)`!
```

Taking the 1's complement of an Excess-3 codeword directly produces the Excess-3 representation of its 9's complement, greatly simplifying digital decimal subtraction arithmetic.

<div class="example-answer-box">
🎯 **Verified Result:** Question 10 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="easy" title="Question 11 (1 Mark): Why NAND is Termed a Universal Gate">
**Question:**  
Prove that a NOT gate can be synthesized using a single 2-input NAND gate.

> 📊 **Question Schematic / State Specification:**
```
Question Input Tie-Together: Connect both inputs of NAND together to input signal A.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Boolean Idempotence Formulation:

        `Y = (A · A)' = A'` (By Boolean Idempotent Law).
```

By connecting both inputs of a 2-input NAND gate to common signal A, the output becomes `(A · A)' = A'`, functioning identically to an inverter (NOT gate).

<div class="example-answer-box">
🎯 **Verified Result:** Question 11 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="easy" title="Question 12 (1 Mark): Gray Code Usage in Rotary Optical Encoders">
**Question:**  
Why is Gray code preferred over standard Binary code in optical shaft position encoders?

> 📊 **Question Schematic / State Specification:**
```
Question Binary Transition Glitch: Binary 7 (0111) ➔ 8 (1000) flips 4 bits simultaneously; Gray flips only 1 bit.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Unit Distance Property:

        `Hamming Distance = 1` between adjacent counts ⟹ eliminates intermediate spurious read codes.
```

In standard binary, multiple bits switch simultaneously (e.g. 0111 to 1000). Due to physical sensor misalignment, bits switch at slightly different nanoseconds, creating erroneous intermediate spikes. Gray code changes only one bit at a time, preventing read errors.

<div class="example-answer-box">
🎯 **Verified Result:** Question 12 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="medium" title="Question 16 (2 Marks): 2's Complement Subtraction">
**Question:**  
Perform subtraction (28)_(10) - (15)_(10) using 8-bit 2's complement arithmetic.

> 📊 **Question Schematic / State Specification:**
```
Question Binary Operand Conversion: 28 = 00011100_2 | 15 = 00001111_2.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution 2's Complement Addition Trace:

        `1's Complement of 15: 11110000_2`

        `2's Complement of 15: 11110000 + 1 = 11110001_2`

        `Add to 28: 00011100 + 11110001 = 1 00001101_2`

        `Discard End Carry (1) ⟹ Result = 00001101_2 = 8 + 4 + 1 = (13)_(10) (Correct!)`
```

The end carry indicates a positive result, yielding `00001101_2 = 13₁₀`, matching 28 - 15 = 13.

<div class="example-answer-box">
🎯 **Verified Result:** Question 16 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="hard" title="Question 20 (4 Marks): 4-Variable K-Map Minimization with Don't Cares">
**Question:**  
Minimize the Boolean function: F(A, B, C, D) = &Sigma;m(1, 3, 7, 11, 15) + d(0, 2, 5) using a 4-variable K-Map. Implement using basic gates.

> 📊 **Question Schematic / State Specification:**
```
Question K-Map Cell Mapping: Minterms at 1, 3, 7, 11, 15; Don't cares at 0, 2, 5.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Optimal Grouping Strategy:

        `Group 1 (Octet): Combine minterms m₁, m₃, m₇, m₁1, m₁5 with don't cares d₀, d₂, d₅!`

        `Cells (0, 1, 2, 3, 5, 7, 11, 15): Notice column CD = (m₃, m₇, m₁1, m₁5) forms a Quad CD`

        `Row A'B' (0, 1, 2, 3) + (5, 7): Combine (1, 3, 5, 7) with (3, 7, 11, 15) ⟹`

        `Quad 1: (3, 7, 11, 15) yields CD`

        `Quad 2: (1, 3, 5, 7) yields A'D`

        `Quad 3: (0, 1, 2, 3) with d₀, d₂ yields A'B'`

        `Minimal SOP Expression: F = CD + A'B' + A'D (or F = CD + A'B')`
```

By leveraging Don't Care cells d(0, 2), the function simplifies down to `F = CD + A'B'`, eliminating 3 gates.

<div class="example-answer-box">
🎯 **Verified Result:** Question 20 step-by-step resolution per MMDU university marking scheme.
</div>
</example>