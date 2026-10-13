### 1. The Expert System Triad & Human Collaboration Dynamics

Building a production expert system requires a symbiotic triad of three distinct human roles:

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 680 220" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="tr-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
      </marker>
    </defs>
    <rect x="5" y="5" width="670" height="210" rx="12" class="schematic-bg" fill="rgba(15,23,42,0.75)" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5 4" />
    <text x="340" y="25" text-anchor="middle" fill="#38bdf8" font-size="12.5" font-weight="bold" letter-spacing="1">THE EXPERT SYSTEM KNOWLEDGE ENGINEERING TRIAD</text>
    <!-- Domain Expert -->
    <rect x="35" y="42" width="215" height="62" rx="8" fill="rgba(30,58,138,0.85)" stroke="#60a5fa" stroke-width="2" />
    <text x="142" y="63" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">1. DOMAIN EXPERT</text>
    <text x="142" y="80" text-anchor="middle" fill="#bae6fd" font-size="10.5">20+ Yrs Field Experience</text>
    <text x="142" y="95" text-anchor="middle" fill="#bae6fd" font-size="10.5">Heuristics &amp; Tacit Intuition</text>
    <!-- Bidirectional Arrow -->
    <line x1="252" y1="73" x2="428" y2="73" stroke="#38bdf8" stroke-width="2" marker-start="url(#tr-arr)" marker-end="url(#tr-arr)" />
    <text x="340" y="64" text-anchor="middle" fill="#fde047" font-size="10.5" font-weight="bold">Knowledge Acquisition</text>
    <!-- Knowledge Engineer -->
    <rect x="430" y="42" width="215" height="62" rx="8" fill="rgba(88,28,135,0.85)" stroke="#c084fc" stroke-width="2" />
    <text x="537" y="63" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">2. KNOWLEDGE ENGINEER</text>
    <text x="537" y="80" text-anchor="middle" fill="#e9d5ff" font-size="10.5">AI Scientist / System Architect</text>
    <text x="537" y="95" text-anchor="middle" fill="#e9d5ff" font-size="10.5">Encodes Rules, Frames &amp; Logic</text>
    <!-- Arrow down to Expert System -->
    <line x1="537" y1="104" x2="537" y2="142" stroke="#38bdf8" stroke-width="2" marker-end="url(#tr-arr)" />
    <text x="585" y="127" text-anchor="middle" fill="#7dd3fc" font-size="10.5" font-weight="bold">Synthesizes</text>
    <!-- Expert System Shell -->
    <rect x="415" y="144" width="235" height="54" rx="8" fill="rgba(6,78,59,0.85)" stroke="#34d399" stroke-width="2" />
    <text x="532" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">EXPERT SYSTEM ENGINE</text>
    <text x="532" y="185" text-anchor="middle" fill="#a7f3d0" font-size="10.5">Knowledge Base + Inference Engine</text>
    <!-- Bidirectional Consultation Arrow -->
    <line x1="252" y1="171" x2="413" y2="171" stroke="#38bdf8" stroke-width="2" marker-start="url(#tr-arr)" marker-end="url(#tr-arr)" />
    <text x="332" y="162" text-anchor="middle" fill="#6ee7b7" font-size="10.5" font-weight="bold">Interactive Consultation</text>
    <!-- End User -->
    <rect x="35" y="144" width="215" height="54" rx="8" fill="rgba(124,45,18,0.85)" stroke="#fb923c" stroke-width="2" />
    <text x="142" y="166" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">3. END USER (CLIENT)</text>
    <text x="142" y="185" text-anchor="middle" fill="#fed7aa" font-size="10.5">Clinician / Technician / Analyst</text>
  </svg>
</div>

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