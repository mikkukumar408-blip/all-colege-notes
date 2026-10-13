### MMDU Official University Solved Examination Questions (Unit 3)
**Course:** Fundamentals of AI & ML (`BCSE-011`)  
**Pattern:** Sections A (1 Mark Compulsory), B (2 Marks Analytical), C (6 Marks In-Depth), D (6 Marks Design/Long)

---
<example level="easy" title="Question 7 (1 Mark): Explanation Facility in Expert Systems">
**Question:**  
Explain how an Expert System dynamically generates an answer to a user's "HOW" query.

> 📊 **Question Schematic / State Specification:**
```
Question Query Flow: User prompts "HOW was Diagnosis D reached?" ➔ Inference Engine traces active rule stack.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Derivation Tree Traceback:

        `Conclusion D ← Rule R14(Fact A &and; Fact B) ← Rule R2(Percept X)`. Displays rule antecedents to user.
```

The Explanation Facility inspects the execution log of fired rules stored in working memory. To answer "HOW D", it displays the specific rule that concluded D along with the antecedent facts that triggered it.

<div class="example-answer-box">
🎯 **Verified Result:** Question 7 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="easy" title="Question 8 (1 Mark): Forward Chaining vs. Backward Chaining Trigger Criteria">
**Question:**  
Under what condition is Backward Chaining vastly superior to Forward Chaining?

> 📊 **Question Schematic / State Specification:**
```
Question Search Tree Comparison: Forward Chaining [Branching Factor 100 facts ➔ massive tree] vs Backward Chaining [1 specific goal hypothesis].
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Directed Goal Sub-tree Pruning:

        `Target Hypothesis ➔ checks ONLY rules establishing Goal ➔ prunes 95% irrelevant facts`.
```

Backward Chaining is superior when the number of known input facts is enormous but the system needs to verify one specific hypothesis (e.g. medical diagnosis: "Does the patient have Meningitis?"), avoiding millions of irrelevant forward rule deductions.

<div class="example-answer-box">
🎯 **Verified Result:** Question 8 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="easy" title="Question 9 (1 Mark): The Knowledge Acquisition Bottleneck">
**Question:**  
Define the Knowledge Acquisition Bottleneck encountered by knowledge engineers.

> 📊 **Question Schematic / State Specification:**
```
Question Communication Gap: Human Expert (Tacit, intuitive wisdom) ➔ [Semantic Gap] ➔ Knowledge Engineer (Formal IF-THEN code).
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Knowledge Engineering Protocol:

        `Structured Interviews + Protocol Analysis ➔ Intermediate Conceptual Models ➔ Formal Executable Rules`.
```

The Knowledge Acquisition Bottleneck refers to the difficulty of extracting intuitive, unstructured domain heuristics from human experts who cannot easily articulate their internal reasoning, and translating them into formal production rules.

<div class="example-answer-box">
🎯 **Verified Result:** Question 9 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="medium" title="Question 15 (2 Marks): Certainty Factor (CF) Propagation in Rule-Based Systems">
**Question:**  
In MYCIN, if evidence E has certainty CF(E) = 0.8 and Rule R is "IF E THEN H (CF = 0.7)", compute the final hypothesis certainty CF(H, E).

> 📊 **Question Schematic / State Specification:**
```
Question Evidence-to-Hypothesis Flow: Evidence E [CF = 0.8] ➔ Rule R [Attenuation Factor CFᵣule = 0.7] ➔ Hypothesis H.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution MYCIN Certainty Multiplication Model:

        `CF(H, E) = CF(E) × CFᵣᵤₗₑ = 0.8 × 0.7 = 0.56`.
```

When an antecedent fact is not known with absolute certainty, MYCIN scales the rule's confidence by the evidence certainty. Here, the final certainty in hypothesis H is exactly 0.56 (56% confidence).

<div class="example-answer-box">
🎯 **Verified Result:** Question 15 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="hard" title="Question 19 (4 Marks): Conflict Resolution Strategies in Expert System Production Rules">
**Question:**  
Explain the Conflict Resolution problem when multiple rules match working memory simultaneously. Discuss Refractoriness, Recency, and Specificity.

> 📊 **Question Schematic / State Specification:**
```
Question Conflict Set: Working Memory (Fact 1, Fact 2) ➔ Matches Rule 1, Rule 5, Rule 12 ➔ Which rule fires?
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Conflict Resolution Engine Model:

        `1. Specificity: Fire rule with most antecedents (IF A &and; B &and; C fires over IF A)`

        `2. Recency: Fire rule matching most recently asserted facts in Working Memory`

        `3. Refractoriness: Never fire same rule instance twice on identical data (prevents loops)`

        `4. Rule Priorities / Weights: Pre-assigned static salience integers`
```

Without conflict resolution, the inference engine enters infinite loops or applies broad generic rules instead of domain-specific exceptions. Applying Specificity ensures specialized knowledge takes precedence over general defaults.

<div class="example-answer-box">
🎯 **Verified Result:** Question 19 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="hard" title="Question 23 (6 Marks): Complete Engineering Design of a Medical Expert System">
**Question:**  
Design an Expert System for Infectious Disease Diagnosis. Specify the Knowledge Representation format, Inference Chaining Strategy, Explanation Dialogue, and Certainty Combination rules.

> 📊 **Question Schematic / State Specification:**
```
Question Clinical Diagnostic Architecture: Patient Bloodwork ➔ Rule Pattern Matcher ➔ Working Memory ➔ Explanation Generator.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Multi-Tier Production System Design:

        `1. KB Rule Formalism: IF (Culture = GramNegative) &and; (Morphology = Rod) &and; (Aerobicity = Anaerobic) THEN (Organism = Bacteroides [CF = 0.85])`

        `2. Inference: Backward Chaining from suspected critical pathogens; triggers Forward Chaining on emergency vital flags`

        `3. Combining Uncertainties: CFcₒₘb(CF₁, CF₂) = CF₁ + CF₂ - (CF₁ × CF₂) for positive certitudes`

        `4. Explanation Engine: Implements execution-stack unwinding for user inquiries`
```

This system decouples patient data from clinical disease rules. By maintaining certainty factors, it safely handles partial and ambiguous lab cultures. The explanation engine generates trust among clinicians by detailing the exact evidence trail behind every prescribed antibiotic regimen.

<div class="example-answer-box">
🎯 **Verified Result:** Question 23 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

