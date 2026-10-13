### MMDU Official University Solved Examination Questions (Unit 3)
**Course:** Basic Electrical & Electronics Engineering (`BELE-001`)  
**Pattern:** Sections A (1 Mark Compulsory), B (2 Marks Analytical), C (6 Marks In-Depth), D (6 Marks Design/Long)

---
<example level="easy" title="Question 7 (1 Mark): Barrier Potential of Silicon vs. Germanium">
**Question:**  
Why is the forward knee voltage of Silicon (0.7V) higher than that of Germanium (0.3V)?

> 📊 **Question Schematic / State Specification:**
```
Question Bandgap Atomic Dimension: Si (Eg = 1.1 eV, tightly bound valence electrons) vs Ge (Eg = 0.67 eV).
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Barrier Height Equation:

        `V₀ = VT \ln(NA ND / nᵢ²)`. Higher bandgap in Si yields lower intrinsic carrier density `nᵢ` ⟹ higher built-in potential `V₀`.
```

Silicon's larger energy bandgap (1.1 eV vs 0.67 eV) creates a stronger internal electric field across the depletion region, requiring 0.7V of forward bias to overcome compared to 0.3V for Germanium.

<div class="example-answer-box">
🎯 **Verified Result:** Question 7 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="easy" title="Question 8 (1 Mark): Peak Inverse Voltage in Bridge vs. Center-Tapped Rectifier">
**Question:**  
Compare the Peak Inverse Voltage (PIV) rating demanded of diodes in Bridge vs Center-Tapped rectifiers.

> 📊 **Question Schematic / State Specification:**
```
Question Reverse Voltage Stress: Bridge Diode sees Vₘ | Center-Tapped Diode sees 2 Vₘ.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution PIV Ratio Formulation:

        `PIVBᵣᵢdgₑ = Vₘ` versus `PIVCₑₙₜₑᵣ₋Tₐₚ = 2 Vₘ`.
```

In a center-tapped full-wave rectifier, each non-conducting diode must withstand the full secondary voltage `2 Vₘ`. In a bridge rectifier, the reverse voltage divides across two reverse diodes, requiring only `Vₘ` rating.

<div class="example-answer-box">
🎯 **Verified Result:** Question 8 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="easy" title="Question 9 (1 Mark): BJT Base Width Design Principle">
**Question:**  
Why is the base region of a BJT manufactured ultra-thin and lightly doped?

> 📊 **Question Schematic / State Specification:**
```
Question Carrier Diffusion Path: Emitter (Heavy Injection) ➔ Base (Minimal Recombination) ➔ Collector (Extraction).
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Recombination Minimization Model:

        `Base Recombination &lt; 2% ⇒ IC ≈ IE ⇒ α = IC/IE ≈ 0.98–0.99`.
```

A thin, lightly doped base ensures that almost all injected minority carriers traverse the base without recombining, allowing over 98% of carriers to be swept into the collector for high current gain β.

<div class="example-answer-box">
🎯 **Verified Result:** Question 9 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="medium" title="Question 15 (2 Marks): Zener Shunt Regulator Load Current Calculation">
**Question:**  
A 10V Zener regulator has input Vᵢₙ = 20V, series resistor RS = 200Ω, and load RL = 1 kΩ. Calculate source current IS, load current IL, and Zener current IZ.

> 📊 **Question Schematic / State Specification:**
```
Question Shunt Circuit Diagram: 20V DC ➔ RS (200Ω) ➔ Node VZ (10V) ➔ Parallel branches: Zener Diode & RL (1kΩ).
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Current Distribution Formulation:

        `IS = (Vᵢₙ - VZ) / RS = (20 - 10) / 200 = 10 / 200 = 0.05  A = 50  mA`

        `IL = VZ / RL = 10  V / 1000  Ω = 0.01  A = 10  mA`

        `IZ = IS - IL = 50  mA - 10  mA = 40  mA`
```

The Zener diode safely conducts 40 mA, maintaining a steady 10V regulated output across the 1 kΩ load.

<div class="example-answer-box">
🎯 **Verified Result:** Question 15 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="hard" title="Question 19 (4 Marks): Derivation of Full-Wave Bridge Rectifier Ripple Factor">
**Question:**  
Derive the mathematical expression for Ripple Factor &gamma; of a Full-Wave Bridge Rectifier and prove it equals 0.482.

> 📊 **Question Schematic / State Specification:**
```
Question Rectified Waveform: Pulsating DC with period T/2: v(t) = |Vₘ sin(ωt)|.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Ripple Factor Derivation Trace:

        `Ripple Factor &gamma; = Vₐc,ᵣₘₛ / Vdc = √{(Vᵣₘₛ/Vdc)² - 1}`

        `Vdc = \frac{1}{π} ∫_0^π Vₘ \sin(θ) dθ = (2 Vₘ) / π ≈ 0.6366 Vₘ`

        `Vᵣₘₛ = √{ \frac{1}{π} ∫_0^π Vₘ² \sin²(θ) dθ } = Vₘ / √2 ≈ 0.7071 Vₘ`

        `Form Factor Kf = Vᵣₘₛ / Vdc = \frac{Vₘ / √2}{2 Vₘ / π} = π / (2 √2) ≈ 1.1107`

        `&gamma; = √{(1.1107)² - 1} = √(1.2337 - 1) = √(0.2337) = 0.4834 ≈ 0.482`
```

The ripple factor evaluates to 0.482, indicating that AC harmonic content is less than half of the DC component without filtering.

<div class="example-answer-box">
🎯 **Verified Result:** Question 19 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="hard" title="Question 23 (6 Marks): BJT Common Emitter Input and Output Characteristics">
**Question:**  
Sketch and thoroughly explain the Input and Output static characteristics of an NPN Bipolar Junction Transistor in Common Emitter (CE) configuration. Define Early Effect (Base-Width Modulation) and explain how the BJT acts as a digital switch.

> 📊 **Question Schematic / State Specification:**
```
Question Characteristic Plots: Input (IB vs VBE at constant VCE) | Output (IC vs VCE at constant IB showing Cutoff, Active, and Saturation).
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution 3 Operating Regimes & Early Effect:

        `1. Cutoff (VBE ≤ 0, VCE = VCC): Both junctions reverse biased; IC ≈ 0 ⇒ Switch OFF (Open)`

        `2. Saturation (VBE &gt; 0.7V, VCE ≈ 0.2V): Both junctions forward biased; IC = IC,ₛₐₜ ⇒ Switch ON (Closed)`

        `3. Active (VBE &gt; 0.7V, VCE &gt; 1V): EBJ forward, CBJ reverse; linear relation IC = β IB ⇒ Linear Amplifier`

        `Early Effect: As VCE &uarr; ⟹ Reverse bias on CBJ &uarr; ⟹ Depletion width &uarr; ⟹ Effective base width Wb &darr; ⟹ IC slopes upward`
```

The Early Effect causes collector current curves to have a slight positive slope in the active region; projecting these curves backward intercepts the negative voltage axis at the Early Voltage `-VA`.

<div class="example-answer-box">
🎯 **Verified Result:** Question 23 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

