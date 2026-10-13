### MMDU Official University Solved Examination Questions (Unit 1)
**Course:** Basic Electrical & Electronics Engineering (`BELE-001`)  
**Pattern:** Sections A (1 Mark Compulsory), B (2 Marks Analytical), C (6 Marks In-Depth), D (6 Marks Design/Long)

---
<example level="easy" title="Question 1 (1 Mark): Physical Meaning of Power Factor">
**Question:**  
Explain why low power factor is detrimental to industrial electrical transmission networks.

> 📊 **Question Schematic / State Specification:**
```
Question Power Triangle: Apparent Power S (kVA) = Active Power P (kW) + j Reactive Power Q (kVAR).
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Current Vector Magnification:

        `I = P / (V cosϕ)`. As `cosϕ &darr; ⇒ I &uarr; ⇒ I² R  Losses &uarr;`.
```

For a fixed real power P, drawing at low power factor forces current I to increase inversely. This magnifies `I² R` transmission line heating losses, induces excessive line voltage drops, and demands larger conductor cross-sections and transformer ratings.

<div class="example-answer-box">
🎯 **Verified Result:** Question 1 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="easy" title="Question 2 (1 Mark): Resonance Condition in Series RLC Circuit">
**Question:**  
State why the net impedance of a series RLC circuit is purely resistive at resonant frequency.

> 📊 **Question Schematic / State Specification:**
```
Question Reactance Cancellation: Inductive Reactance +jXL balances Capacitive Reactance -jXC.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Phasor Cancellation Model:

        `Z = R + j\frac{ωL - 1}{ωC}`. At `ω₀ = 1/√(LC) ⇒ XL = XC ⇒ Z = R + j0 = R`.
```

At resonance, the counter-phase voltages across the inductor and capacitor cancel each other exactly (`VL = -VC`). The network behaves as a pure resistance with minimum impedance and unity power factor.

<div class="example-answer-box">
🎯 **Verified Result:** Question 2 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="easy" title="Question 3 (1 Mark): Maximum Power Transfer Efficiency Paradox">
**Question:**  
Why is the Maximum Power Transfer Theorem not applied to commercial electrical power utility grids?

> 📊 **Question Schematic / State Specification:**
```
Question Efficiency vs Transfer: Utility Goal = 95–98% Efficiency | MPT Goal = Maximum Watts to Load (50% Efficiency).
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Energy Loss Formulation:

        `Efficiency &eta; = PL / (PL + Pᵢₙₜ) = RL / (RL + Rₜₕ) = 50%` when `RL = Rₜₕ`.
```

Operating a utility grid at maximum power transfer wastes 50% of generated power as internal heat inside generators and transmission lines. Power systems operate at maximum efficiency (`RL &gt;&gt; Rᵢₙₜₑᵣₙₐₗ`) rather than maximum power transfer.

<div class="example-answer-box">
🎯 **Verified Result:** Question 3 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="medium" title="Question 13 (2 Marks): Thevenin Equivalent Circuit Derivation">
**Question:**  
Find the Thevenin equivalent circuit across terminals A-B for a circuit with a 24V DC source in series with 6Ω, connected across a parallel 12Ω resistor.

> 📊 **Question Schematic / State Specification:**
```
Question Voltage Divider Topology: 24V source ➔ 6Ω resistor ➔ Node A [12Ω connected to Node B/ground].
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Thevenin Derivation Equations:

        `Vₜₕ = Vₒc = 24 × [ 12 / (6 + 12) ] = 24 × \frac{12}{18} = 16  V`

        `Rₜₕ = 6 \parallel 12 = \frac{6 × 12}{6 + 12} = 72 / 18 = 4  Ω`
```

The entire circuit across terminals A-B simplifies to a Thevenin voltage source `Vₜₕ = 16  V` in series with a resistance `Rₜₕ = 4  Ω`.

<div class="example-answer-box">
🎯 **Verified Result:** Question 13 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="hard" title="Question 17 (4 Marks): Complete AC Series RLC Circuit Analysis">
**Question:**  
A coil of resistance R = 10Ω and inductance L = 0.1H is connected in series with capacitor C = 50μF across a 230V, 50Hz AC supply. Calculate: (1) Inductive & capacitive reactance, (2) Total impedance, (3) Current and power factor, (4) Active and reactive power.

> 📊 **Question Schematic / State Specification:**
```
Question Series RLC Schematic: 230V, 50Hz ➔ R (10Ω) ➔ L (0.1H) ➔ C (50μF).
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
**Step-by-Step Impedance & Power Calculations:**

- **1. Reactances:**
  $$X_L = 2\pi f L = 2 \times 3.1416 \times 50 \times 0.1 = \mathbf{31.42,Omega}$$
  $$X_C = \frac{1}{2\pi f C} = \frac{1}{2 \times 3.1416 \times 50 \times (50 \times 10^{-6})} = \mathbf{63.66,Omega}$$
  $$\text{Net Reactance: } X = X_L - X_C = 31.42 - 63.66 = \mathbf{-32.24,Omega \quad (Capacitive!)}$$

- **2. Circuit Impedance:**
  $$|Z| = \sqrt{R^2 + X^2} = \sqrt{10^2 + (-32.24)^2} = \sqrt{100 + 1039.4} = \mathbf{33.76,Omega}$$

- **3. Circuit Current:**
  $$I = \frac{V}{|Z|} = \frac{230}{33.76} = \mathbf{6.813~\text{A}}$$

- **4. Power Factor & Power Calculations:**
  $$\text{Power Factor: } \cos\phi = \frac{R}{|Z|} = \frac{10}{33.76} = \mathbf{0.2962 \quad (Leading)}$$
  $$\text{Active Power: } P = V I \cos\phi = 230 \times 6.813 \times 0.2962 = \mathbf{464.15~\text{W}}$$
  $$\text{Reactive Power: } Q = V I \sin\phi = 230 \times 6.813 \times \sqrt{1 - 0.2962^2} = \mathbf{1494.5~\text{VAR (Leading)}}$$



Because capacitive reactance dominates (`XC &gt; XL`), the circuit draws a leading current of 6.81 A at a power factor of 0.296 leading.

<div class="example-answer-box">
🎯 **Verified Result:** Question 17 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="hard" title="Question 21 (6 Marks): Superposition and Thevenin Verification on Multi-Source Network">
**Question:**  
For a network with two DC voltage sources V₁ = 30V (with internal resistance 2Ω) and V₂ = 20V (with internal resistance 4Ω) connected in parallel across a common load resistor RL = 8Ω. Find current through RL using: (1) Superposition Theorem, (2) Thevenin's Theorem. Verify both methods give identical results.

> 📊 **Question Schematic / State Specification:**
```
Question Parallel Source Bridge Topology: Branch 1 (30V, 2Ω) &parallel; Branch 2 (20V, 4Ω) ➔ Load RL (8Ω).
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Step-by-Step Dual Theorem Verification:

        `Method 1: Superposition Theorem`

        `Case A: V₁ (30V) active, V₂ shorted:`

        `Rₑq,₁ = 2 + (4 \parallel 8) = 2 + \frac{32}{12} = 2 + 2.667 = 4.667  Ω ⇒ I₁ = 30 / 4.667 = 6.429  A`

        `Current through RL: IL₁ = 6.429 × [ 4 / (4 + 8) ] = 6.429 × \frac{4}{12} = 2.143  A (&darr;)`

        `Case B: V₂ (20V) active, V₁ shorted:`

        `Rₑq,₂ = 4 + (2 \parallel 8) = 4 + \frac{16}{10} = 5.60  Ω ⇒ I₂ = 20 / 5.60 = 3.571  A`

        `Current through RL: IL₂ = 3.571 × [ 2 / (2 + 8) ] = 3.571 × \frac{2}{10} = 0.714  A (&darr;)`

        `Total Load Current: IL = IL₁ + IL₂ = 2.143 + 0.714 = 2.857  A`

        

        `Method 2: Thevenin's Theorem`

        `Open circuit terminals of RL: Vₜₕ = V₂ + (V₁ - V₂) × [ 4 / (2 + 4) ] = 20 + 10 × \frac{4}{6} = 26.67  V`

        `Rₜₕ = 2 \parallel 4 = \frac{2 × 4}{2 + 4} = 8 / 6 = 1.333  Ω`

        `Load Current: IL = Vₜₕ / (Rₜₕ + RL) = 26.67 / (1.333 + 8) = 26.67 / 9.333 = 2.857  A`
```

Both Superposition and Thevenin theorems converge to an identical load current of **2.857 A**.

<div class="example-answer-box">
🎯 **Verified Result:** Question 21 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

