### MMDU Official University Solved Examination Questions (Unit 2)
**Course:** Basic Electrical & Electronics Engineering (`BELE-001`)  
**Pattern:** Sections A (1 Mark Compulsory), B (2 Marks Analytical), C (6 Marks In-Depth), D (6 Marks Design/Long)

---
<example level="easy" title="Question 4 (1 Mark): Hysteresis vs. Eddy Current Loss Frequency Dependence">
**Question:**  
How do core losses change if a 50 Hz transformer is operated on a 60 Hz supply at constant voltage?

> 📊 **Question Schematic / State Specification:**
```
Question Frequency Variation: V/f ratio changes flux density Bₘ ∝ V/f.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Loss Scaling Proportions:

        `Pₕ ∝ f · (V/f)¹.⁶ = V¹.⁶ f⁻⁰.⁶ ⇒ Decreases!`

        `Pₑ ∝ f² · (V/f)² = V² ⇒ Remains Constant!`
```

At constant voltage, flux density decreases as frequency rises. Hysteresis loss decreases slightly (proportional to `f⁻⁰.⁶`) while eddy current loss remains constant, causing total core losses to decrease.

<div class="example-answer-box">
🎯 **Verified Result:** Question 4 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="easy" title="Question 5 (1 Mark): Significance of Back EMF in DC Motors">
**Question:**  
Why does a DC motor draw dangerously high current if started without an external starter?

> 📊 **Question Schematic / State Specification:**
```
Question Starting Circuit: At N = 0 ⟹ Back EMF Eb = 0 ⟹ Armature Current Iₐ = V / Rₐ.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Current Surge Formula:

        `Iₐ,ₛₜₐᵣₜ = (V - 0) / Rₐ = 230  V / 0.5  Ω = 460  A ≈ 15–20 × Iᵣₐₜₑd`!
```

At standstill (N=0), back EMF is zero. Because armature resistance `Rₐ` is extremely small (~0.5 Ω), direct connection to rated voltage produces a destructive current surge that will burn the windings unless limited by a starter.

<div class="example-answer-box">
🎯 **Verified Result:** Question 5 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="easy" title="Question 6 (1 Mark): Slip Condition of Induction Motor at Synchronous Speed">
**Question:**  
Why can an induction motor never run at synchronous speed (N = Nₛ)?

> 📊 **Question Schematic / State Specification:**
```
Question Relative Velocity: Rotor speed N vs Stator RMF speed Nₛ ⟹ Relative motion ΔN = Nₛ - N.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Induced EMF Zero Vector:

        `If N = Nₛ ⇒ Relative Speed = 0 ⇒ d&Phi;/dt = 0 ⇒ Eᵣ = 0 ⇒ Iᵣ = 0 ⇒ T = 0`!
```

If the rotor reached synchronous speed, rotor conductors would not cut any rotating magnetic flux. Induced rotor EMF, current, and electromagnetic torque would drop to zero, causing the rotor to immediately decelerate.

<div class="example-answer-box">
🎯 **Verified Result:** Question 6 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="medium" title="Question 14 (2 Marks): Open-Circuit and Short-Circuit Test Diagnostic Roles">
**Question:**  
Explain why the wattmeter reading in an Open-Circuit (OC) test represents core loss only, while in a Short-Circuit (SC) test it represents copper loss only.

> 📊 **Question Schematic / State Specification:**
```
Question Diagnostic Regimes: OC Test [Rated Voltage, Negligible No-Load Current I₀] vs SC Test [Rated Current, Tiny Voltage Vₛc].
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Decoupled Loss Models:

        `OC Test: I₀ ≈ 2–5% × Iᵣₐₜₑd ⇒ I₀² Rcᵤ ≈ 0 ⇒ W₀ = Pᵢᵣₒₙ`

        `SC Test: Vₛc ≈ 5–10% × Vᵣₐₜₑd ⇒ Bₘ ≈ 0 ⇒ Pᵢᵣₒₙ ≈ 0 ⇒ Wₛc = Pcᵤ`
```

In the OC test, current is so low that copper loss is negligible. In the SC test, the applied voltage is tiny, so core flux and core loss are negligible, isolating the respective loss mechanisms perfectly.

<div class="example-answer-box">
🎯 **Verified Result:** Question 14 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="hard" title="Question 18 (4 Marks): Transformer Efficiency and All-Day Efficiency">
**Question:**  
A 50 kVA distribution transformer has iron loss Pᵢ = 500W and full-load copper loss Pcᵤ = 800W. Calculate: (1) Full-load efficiency at 0.8 pf lagging, (2) Load kVA at which maximum efficiency occurs.

> 📊 **Question Schematic / State Specification:**
```
Question Loss Energy Flow: Input Power ➔ [Iron Loss 500W + Copper Loss 800W] ➔ Output Power = kVA × pf.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Efficiency Formulations:

        `1. Full-Load Output = 50  kVA × 0.8 = 40  kW = 40,000  W`

        `Total Full-Load Losses = Pᵢ + Pcᵤ = 500 + 800 = 1300  W`

        `Efficiency &eta;_(fl) = [ 40000 / (40000 + 1300) ] × 100 = \frac{40000}{41300} × 100 = 96.85%`

        `2. Load fraction for Maximum Efficiency: x = √{Pᵢ / Pcᵤ,fₗ} = √\frac{500}{800} = √(0.625) = 0.7906`

        `Load kVA for Max Efficiency = x × 50  kVA = 0.7906 × 50 = 39.53  kVA`
```

Maximum efficiency occurs when the transformer is loaded to **39.53 kVA** (79% of rated capacity), where variable copper loss equals 500W.

<div class="example-answer-box">
🎯 **Verified Result:** Question 18 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="hard" title="Question 22 (6 Marks): Complete Theory and Speed Control of DC Shunt Motor">
**Question:**  
Derive the Torque equation of a DC Motor. Describe the two methods of speed control for a DC Shunt Motor (Armature Resistance Control and Field Flux Control) with relevant circuit diagrams, equations, and speed-torque characteristics.

> 📊 **Question Schematic / State Specification:**
```
Question Speed-Torque Characteristic Slopes: Rated speed Nᵣated ➔ Armature control drops speed below Nᵣated; Field control raises speed above Nᵣated.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Torque & Speed Derivations:

        `1. Electrical Power converted to Mechanical: Pₘ = Eb Iₐ = T · ω`

        `Substitute Eb = \frac{&Phi; Z N P}{60 A} and ω = 2πN / 60:`

        `T · \frac{2πN}{60} = [\frac{&Phi; Z N P}{60 A}] · Iₐ ⇒ T = [ \frac{P Z}{2π A} ] · &Phi; Iₐ = 0.159 &Phi; Z Iₐ (P/A)  N-m`

        `2. Speed Governing Relation: N = \frac{V - Iₐ Rₐ}{k &Phi;}`

        `Method A (Armature Resistance): Rₑₓₜ added in series with Rₐ ⟹ N &darr; below rated speed. Wasteful I² R loss.`

        `Method B (Field Flux): Rf added in series with shunt field ⟹ If &darr; ⟹ &Phi; &darr; ⟹ N &uarr; above rated speed. Highly efficient!`
```

Field control provides a constant-horsepower drive above base speed, whereas armature control provides a constant-torque drive below base speed.

<div class="example-answer-box">
🎯 **Verified Result:** Question 22 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

