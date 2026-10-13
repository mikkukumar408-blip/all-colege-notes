### 1. The Expert System Triad & Human Collaboration Dynamics

Building a production expert system requires a symbiotic triad of three distinct human roles:

```
    [ DOMAIN EXPERT ]  <====== Knowledge ======>  [ KNOWLEDGE ENGINEER ]
    - 20+ years field                              - Computer / AI Scientist
      experience                                   - Interviews expert
    - Possesses rules of thumb                     - Encodes heuristics into
      and domain intuition                           rules, frames, and logic
                                                              |
                                                              | Synthesizes
                                                              v
                                                   [ SYSTEM / INFERENCE ENGINE ]
                                                              ^
                                                              | Consults
                                                              v
                                                       [ END USER ]
                                                       - Doctor, technician, clerk
                                                       - Obtains expert diagnosis
```

---

### 2. Conflict Resolution Strategies in the Inference Engine

When multiple rules have their antecedents satisfied simultaneously, they enter the **Conflict Set**. The inference engine must select exactly one rule to fire using a deterministic strategy:
1. **Rule Specificity (Maximal Specialization):** Rules with more specific preconditions take precedence over general rules (e.g., `IF Bird AND CannotFly AND InWater THEN Penguin` overrides `IF Bird THEN AnimalCanFly`).
2. **Recency (Temporal Priority):** Rules that match facts most recently inserted into working memory fire first.
3. **Salience / Priority Weights:** Rules with explicitly assigned numerical priorities (e.g., `Priority = 100` for emergency shutdown rules) take precedence.
4. **Refraction:** A rule is never allowed to fire more than once on the exact same set of facts to prevent infinite execution loops!

---

### 3. Certainty Factors & Reasoning Under Uncertainty (The MYCIN Model)

In real-world domains (medicine, geology), knowledge is rarely binary. Stanford's **MYCIN** introduced the **Certainty Factor (CF)** framework:
CF(H, E) = MB(H, E) - MD(H, E)
where MB \in [0, 1] is Measure of Increased Belief, and MD \in [0, 1] is Measure of Increased Disbelief.
-1.0 ≤ CF(H, E) ≤ +1.0

#### Combining Evidence Rules:
- Conjunction: CF(E₁ \land E₂) = \min(CF(E₁), CF(E₂)).
- Rule Propagation: CF(H) = CF(Rule) × \max(0, CF(E)).
- Combining Independent Hypotheses (CF₁, CF₂ > 0):
  CFcₒₘbᵢₙₑ ₌ CF_₁ ₊ CF_₂ ₋ ₍CF_₁ × CF_₂₎

---

---

<example level="easy" title="Level 1 (Easy): Roles in the Expert System Triad">
**Problem:**
Identify the primary responsibility of each participant in the Expert System Triad:
1. Domain Expert
2. Knowledge Engineer
3. End User

---

**Step 1 🚀: Domain Expert**
The human specialist (e.g. Cardiologist, Geologist) who possesses decades of accumulated heuristics, empirical rules of thumb, and domain wisdom.

**Step 2 ⚡: Knowledge Engineer**
The computer scientist who interviews the expert, extracts unstructured knowledge, and formalizes it into IF-THEN production rules and ontology networks.

**Step 3 🎯: End User**
The non-specialist technician, doctor, or operator who queries the system to obtain diagnoses and actionable advice.

<div class="example-answer-box">
🎯 Domain Expert (Provides knowledge) → Knowledge Engineer (Codes rules) → End User (Queries advice).
</div>
</example>

<example level="medium" title="Level 2 (Medium): Knowledge Extraction Protocol (Interview to Rules)">
**University Question (6 Marks):**
A geologist explains: *"Whenever soil has high quartz content and low moisture, seismic vibration decay is slow."*
Translate this into a formal production rule with appropriate certainty factor.

---

**Step 1 🚀: Identify Antecedents & Consequent**
- Antecedent 1: `Soil.Quartz_Content == High`
- Antecedent 2: `Soil.Moisture == Low`
- Consequent: `Seismic_Decay_Rate = Slow`

**Step 2 ⚡: Formal Rule Syntax**
```
RULE 104 [GeologicalDecay]
IF:
    SoilType IS SandyQuartz AND
    MoistureLevel < 15%
THEN:
    VibrationDecayRate = SLOW (CF = 0.85)
```

<div class="example-answer-box">
🎯 Formalized Production Rule with multi-attribute conditions and 85% confidence weight.
</div>
</example>

<example level="hard" title="Level 3 (Hard): Conflict Resolution Strategies in Inference Engines">
**University Question (8 Marks):**
When 3 rules are simultaneously triggered into the Conflict Set:
- R₁: IF `Fever`, THEN `Paracetamol` (Rule added on day 1).
- R₂: IF `Fever` AND `Age < 2`, THEN `PediatricDrops` (More specific rule).
- R₃: IF `Fever` AND `HighBloodPressure`, THEN `ConsultPhysician` (Priority = 10).
Analyze how the inference engine resolves this conflict using: (1) Specificity, (2) Rule Priority, (3) Recency.

---

**Step 1 🚀: Specificity (Most Specific / Longest Antecedent Rule Wins)**
R₂ and R₃ have 2 conditions, while R₁ has only 1 condition.
Specificity eliminates the generic rule R₁, choosing between R₂ and R₃.

**Step 2 ⚡: Rule Priority (Salience Weights)**
If R₃ has explicit priority `Salience = 10` (danger of hypertension stroke), the inference engine executes **R₃ first** to ensure patient safety!

**Step 3 🎯: Recency (Refractoriness)**
Executes rules matching facts most recently added to the working memory, avoiding infinite loops.

<div class="example-answer-box">
🎯 Conflict resolution selects **$R₃$** due to highest medical priority/salience and high specificity.
</div>
</example>