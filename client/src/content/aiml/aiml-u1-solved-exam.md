### MMDU Official University Solved Examination Questions (Unit 1)
**Course:** Fundamentals of AI & ML (`BCSE-011`)  
**Pattern:** Sections A (1 Mark Compulsory), B (2 Marks Analytical), C (6 Marks In-Depth), D (6 Marks Design/Long)

---
<example level="easy" title="Question 1 (1 Mark): The Chinese Room Thought Experiment vs. Turing Test">
**Question:**  
Explain John Searle's Chinese Room argument in refuting the Turing Test as a measure of true machine consciousness.

> 📊 **Question Schematic / State Specification:**
```
Question Thought Experiment Setup: Input (Chinese Glyphs) ➔ Room [Human + English Rulebook] ➔ Output (Syntactically Correct Glyphs).
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Syntax vs Semantics Bridge:

        `Symbol Manipulation (Syntax) ≠ Understanding / Intentionality (Semantics)`.

        The person inside passes the Turing test externally without understanding a single word of Chinese.
```

Searle demonstrated that passing the Turing Test requires only syntactic symbol manipulation, which computers execute effortlessly. True understanding requires semantic intentionality, proving that behavioral mimicry does not equate to cognitive consciousness.

<div class="example-answer-box">
🎯 **Verified Result:** Question 1 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="easy" title="Question 2 (1 Mark): Rationality vs. Omniscience in AI Agents">
**Question:**  
Distinguish between a Rational Agent and an Omniscient Agent with respect to environmental percepts.

> 📊 **Question Schematic / State Specification:**
```
Question Conceptual Axis: Omniscience [Knows Actual Future] vs Rationality [Maximizes Expected Utility given Past Percepts].
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Utility Horizon Vector:

        `Rational Action = argmaxₐ E[U(s') | Percept History P*]` whereas `Omniscient Action = argmaxₐ U(Actual s')`.
```

An omniscient agent knows the actual outcome of its actions in advance (impossible in non-deterministic environments). A rational agent is realistic: it selects the action that maximizes its expected performance measure given its percept history to date.

<div class="example-answer-box">
🎯 **Verified Result:** Question 2 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="easy" title="Question 3 (1 Mark): Algorithmic Bias in Intelligent Systems">
**Question:**  
Identify how historical data skew leads to algorithmic discrimination in machine learning models.

> 📊 **Question Schematic / State Specification:**
```
Question Bias Flowchart: Skewed Historical Data ➔ Objective Loss Minimization ➔ Amplified Disparate Impact.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Debiasing Intervention Model:

        `Input Data Pipeline [Re-sampling/Re-weighting] ➔ Fair Loss Formulation Lfair = Lₜask + λ · Disparity ➔ Unbiased Decisions`.
```

Supervised models minimize statistical loss over training data distributions. If historical datasets contain societal prejudices (e.g. loan approval gender disparity), the optimizer treats these disparities as genuine predictive signals, codifying systemic bias into automated policy.

<div class="example-answer-box">
🎯 **Verified Result:** Question 3 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="medium" title="Question 13 (2 Marks): Formal Mathematical Formulation of PEAS for an Automated Diagnostic System">
**Question:**  
Formulate the complete PEAS descriptor matrix for an Automated Medical Diagnostic Expert Agent.

> 📊 **Question Schematic / State Specification:**
```
Question Entity Relational Architecture: Patient Symptoms ➔ Diagnostic System ➔ Recommended Treatment Plan.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution PEAS System Grid:

        `Performance [Diagnostic accuracy &gt; 99%, Recovery time minimization, Zero misdiagnosis toxicity]`

        `Environment [Hospital ward, Pathology lab reports, Dynamic patient physiological records]`

        `Actuators [Display monitor, Electronic prescription generator, Automated infusion pump]`

        `Sensors [Digital thermometer, ECG sensors, Blood chemistry analyzer, Keyboard entry]`
```

The agent optimizes its decision function `f: P^* → A` by mapping incoming clinical lab observations to targeted treatment regimens while strictly enforcing toxicity safety bounds.

<div class="example-answer-box">
🎯 **Verified Result:** Question 13 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="hard" title="Question 17 (4 Marks): Complete Architecture and Internal Control Loop of Learning Agents">
**Question:**  
Illustrate and explain the detailed four-component architectural decomposition of a Learning Agent.

> 📊 **Question Schematic / State Specification:**
```
Question Architectural Feedback Loop: Environment ➔ Sensors ➔ Critic & Performance Element ➔ Learning Element ➔ Problem Generator ➔ Actuators.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution 4-Component Decomposition Model:

        `1. Critic: Evaluates agent performance against fixed external standard; generates scalar feedback`

        `2. Learning Element: Responsible for making improvements; adjusts internal policy weights`

        `3. Learning Goals: Specifies target quality standards to the critic`

        `4. Problem Generator: Suggests exploratory actions leading to novel perceptual experiences`
```

The **Performance Element** is the traditional agent selecting actions based on percepts. The **Critic** compares real outcomes against performance standards and feeds errors to the **Learning Element**. Crucially, the **Problem Generator** prevents the agent from getting trapped in local sub-optimal routines by deliberately proposing exploratory actions to discover better policies.

<div class="example-answer-box">
🎯 **Verified Result:** Question 17 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="hard" title="Question 21 (6 Marks): Complete Architectural Comparison of 5 Core Intelligent Agent Classes">
**Question:**  
Provide the structural internal architectures, operational rules, advantages, and terminal failure conditions for Simple Reflex, Model-Based, Goal-Based, Utility-Based, and Learning Agents.

> 📊 **Question Schematic / State Specification:**
```
Question Agent Evolution Continuum: Condition-Action Lookup ➔ Internal State Tracking ➔ Multi-Step Goal Planning ➔ Utility Trade-offs ➔ Adaptive Self-Improvement.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution 5-Agent Architecture Comparison Matrix:

        `1. Simple Reflex: Sensor ➔ Condition-Action Rule ➔ Actuator. Fails completely in partially observable worlds`

        `2. Model-Based: Maintains internal state ("How the world evolves" + "How my actions affect world")`

        `3. Goal-Based: Combines State + Goals; uses search/planning to achieve target states`

        `4. Utility-Based: Evaluates trade-offs using continuous Utility Function U(s) when goals conflict`

        `5. Learning Agent: Decoupled into Performance Element, Critic, Learning Element, and Problem Generator`
```

**Detailed Analysis:** Simple reflex agents are paralyzed by unobserved environmental features because their mapping `f: P \to  A` ignores history. Model-based agents overcome this by preserving a hidden state vector. Goal-based agents add planning foresight but treat success as a binary binary variable. Utility-based agents map states to real numbers, allowing rational trade-offs (e.g. trading speed for passenger safety). Learning agents adapt their decision boundaries continuously from experience.

<div class="example-answer-box">
🎯 **Verified Result:** Question 21 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

