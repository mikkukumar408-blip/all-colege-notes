### 1. Classical Expert Systems: Architectural Decomposition

An **Expert System (ES)** is a knowledge-intensive AI software program that achieves performance comparable to human domain experts in a specialized, narrow problem domain (e.g., medical diagnosis, geological prospecting, configuration engineering).

#### Decoupled Architecture Principle:
Unlike conventional software where domain rules and algorithmic execution logic are tangled together in procedural code (`if-else`), an Expert System enforces a strict mathematical separation:
$$\mathbf{\text{Expert System} = \text{Knowledge Base} + \text{Inference Engine}}$$

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 680 250" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="es-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
      </marker>
    </defs>
    <rect x="5" y="5" width="670" height="240" rx="12" class="schematic-bg" fill="rgba(15,23,42,0.75)" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5 4" />
    <text x="340" y="25" text-anchor="middle" fill="#38bdf8" font-size="12.5" font-weight="bold" letter-spacing="1">CLASSICAL EXPERT SYSTEM ARCHITECTURAL DECOMPOSITION</text>
    <!-- Top Left: Knowledge Base -->
    <rect x="55" y="38" width="250" height="52" rx="8" fill="rgba(30,58,138,0.85)" stroke="#60a5fa" stroke-width="2" />
    <text x="180" y="59" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">DOMAIN KNOWLEDGE BASE</text>
    <text x="180" y="77" text-anchor="middle" fill="#bae6fd" font-size="10.5">Static IF-THEN Production Rules &amp; Heuristics</text>
    <!-- Top Right: Working Memory -->
    <rect x="375" y="38" width="250" height="52" rx="8" fill="rgba(15,118,110,0.85)" stroke="#2dd4bf" stroke-width="2" />
    <text x="500" y="59" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">WORKING MEMORY (BLACKBOARD)</text>
    <text x="500" y="77" text-anchor="middle" fill="#99f6e4" font-size="10.5">Dynamic Case Facts (e.g. Fever = 103°F)</text>
    <!-- Arrows to Inference Engine -->
    <line x1="210" y1="90" x2="280" y2="114" stroke="#38bdf8" stroke-width="2" marker-end="url(#es-arr)" />
    <line x1="470" y1="90" x2="400" y2="114" stroke="#38bdf8" stroke-width="2" marker-end="url(#es-arr)" />
    <!-- Center: Inference Engine -->
    <rect x="155" y="116" width="370" height="54" rx="10" fill="rgba(88,28,135,0.85)" stroke="#c084fc" stroke-width="2" />
    <text x="340" y="137" text-anchor="middle" fill="#ffffff" font-size="13.5" font-weight="bold">INFERENCE ENGINE (REASONING CORE)</text>
    <text x="340" y="156" text-anchor="middle" fill="#e9d5ff" font-size="10.5">Rete Pattern Matcher • Conflict Resolution • Rule Firing</text>
    <!-- Arrows to Explanation & UI -->
    <line x1="270" y1="170" x2="195" y2="190" stroke="#38bdf8" stroke-width="2" marker-end="url(#es-arr)" />
    <line x1="410" y1="170" x2="485" y2="190" stroke="#38bdf8" stroke-width="2" marker-end="url(#es-arr)" />
    <!-- Bottom Left: Explanation Module -->
    <rect x="65" y="192" width="240" height="44" rx="8" fill="rgba(6,78,59,0.85)" stroke="#34d399" stroke-width="1.8" />
    <text x="185" y="211" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="bold">EXPLANATION SUBSYSTEM</text>
    <text x="185" y="227" text-anchor="middle" fill="#a7f3d0" font-size="10.5">Answers HOW &amp; WHY Queries</text>
    <!-- Bottom Right: User Interface -->
    <rect x="375" y="192" width="240" height="44" rx="8" fill="rgba(124,45,18,0.85)" stroke="#fb923c" stroke-width="1.8" />
    <text x="495" y="211" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="bold">USER INTERFACE</text>
    <text x="495" y="227" text-anchor="middle" fill="#fed7aa" font-size="10.5">Interactive Consultation Modal</text>
  </svg>
</div>

---

### 2. Forward Chaining (Data-Driven) vs Backward Chaining (Goal-Driven)

| Feature | Forward Chaining (Data-Driven) | Backward Chaining (Goal-Driven) |
| :--- | :--- | :--- |
| **Starting Point** | Starts with known available facts in working memory. | Starts with a hypothesized goal state. |
| **Reasoning Flow** | **Bottom-Up:** Facts → Rules → New Inferences → Goal. | **Top-Down:** Goal → Supporting Sub-goals → Verifying Facts. |
| **Search Mechanism** | Pattern matches facts against rule antecedent (`IF`). Fires consequent (`THEN`). | Looks for rules whose consequent (`THEN`) matches goal. Recursively proves antecedent (`IF`). |
| **Best Suited For** | Monitoring, planning, synthesis, financial alerts. | Diagnostic systems (Medical diagnosis, fault localization). |
| **Query Efficiency** | Can generate millions of irrelevant inferences. | Highly focused; asks user ONLY questions relevant to candidate hypothesis. |

---

### 3. The Explanation Subsystem: Answering HOW and WHY

A distinctive hallmark of expert systems is **transparency** (explainable AI):
1. **The `WHY` Explanation:** When the system prompts the user for information (e.g., *"Does the patient have chest pains?"*), the user can respond by asking `WHY?`.
   - The engine traces the active goal in its backward-chaining stack and prints the rule it is currently trying to establish:
     *\"I am trying to determine if the patient is suffering from Myocardial Infarction. To confirm Rule 42, I need to know if chest pains are present.\"*
2. **The `HOW` Explanation:** When the system presents a final diagnosis, the user asks `HOW did you conclude that?`.
   - The engine displays the exact sequence of fired rules and user-verified facts forming the deductive proof tree!

---

---


**Problem:**
Given the rule base:
- Rule 1: IF A and B, THEN C.
- Rule 2: IF C, THEN D.
Given facts: A is true, B is true. Determine whether D can be derived using Forward Chaining.

---

**Step 1 🚀: Cycle 1 Match**
Both antecedents of Rule 1 (A and B) are in the known fact database.
Fire Rule 1 ⇒ Add **C** to the fact base.

**Step 2 ⚡: Cycle 2 Match**
The antecedent of Rule 2 (C) is now in the fact base.
Fire Rule 2 ⇒ Add **D** to the fact base.


🎯 Forward Chaining fires Rule 1 then Rule 2 ⇒ **Fact D is proven TRUE**.




**University Question (8 Marks):**
An automotive diagnostic system has rules:
- R₁: IF `BatteryDead`, THEN `CarWontStart`.
- R₂: IF `LightsDim` AND `RadioSilent`, THEN `BatteryDead`.
- R₃: IF `AlternatorFailed`, THEN `BatteryDead`.
Goal: Prove `CarWontStart`. Trace Backward Chaining operation and specify what questions the system will ask the user.

---

**Step 1 🚀: Top-Level Goal**
Target: `CarWontStart`.
Match conclusion of R₁: Sub-goal established: Prove `BatteryDead`.

**Step 2 ⚡: Sub-Goal Resolution**
Match conclusion of R₂: Requires proving `LightsDim` AND `RadioSilent`.
Neither is in the rule conclusion database ⇒ These are **Askable Leaf Facts**!

**Step 3 🎯: User Interaction Trace**
- System queries: *"Are the car headlights dim?"* → User: *"Yes"*.
- System queries: *"Is the car radio silent?"* → User: *"Yes"*.
R₂ fires ⇒ `Battery_Dead` is established ⇒ R₁ fires ⇒ `Car_Wont_Start` is verified!


🎯 Backward Chaining asks only relevant leaf questions → Verifies car won't start due to dead battery.




**University Question (10 Marks):**
In a medical diagnostic expert system (like MYCIN), two independent diagnostic rules conclude that a patient has a bacterial infection:
- Rule 1 concludes `BacterialInfection` with Certainty Factor CF₁ = +0.70.
- Rule 2 concludes `BacterialInfection` with Certainty Factor CF₂ = +0.50.
Calculate the combined certainty factor CFcₒₘbᵢₙₑd. Then calculate the resulting certainty if a third lab test contradicts the hypothesis with CF₃ = -0.40.

---

**Step 1 🚀: Combine Two Positive Certainty Factors (CF₁, CF₂ > 0)**
CF₁₂ = CF₁ + CF₂ · (1 - CF₁)
CF₁₂ = 0.70 + 0.50 × (1 - 0.70) = 0.70 + 0.50(0.30) = 0.70 + 0.15 = +0.85

**Step 2 ⚡: Combine Positive CF₁₂ = +0.85 with Negative Contradiction CF₃ = -0.40**
When signs are opposite (CFₐ > 0 and CFb 
🎯 Combined Positive Certainty: $CF_{12} = +0.85$ | Final with Contradiction: $\mathbf{CF_{\text{final}} = +0.75}$ ($75%$ confidence).