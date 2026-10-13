### 1. Mathematical Logic: Propositional & First-Order Predicate Calculus

Logic provides a formal language for representing knowledge with unambiguous syntax and formal model-theoretic semantics.

#### Expressive Hierarchy:
1. **Propositional Logic (Zero-Order Logic):** Deals with Boolean facts and atomic propositions connected by logical connectives ($\land, \lor, ≠g, ⇒, \iff$). Incapable of expressing objects, relations, or generalizations over infinite sets.
2. **First-Order Predicate Logic (FOL):** Extends propositional logic with:
   - **Objects / Constants:** `John`, `Mars`, `5`.
   - **Predicates / Relations:** `IsHuman(x)`, `GreaterThan(x, y)`.
   - **Functions:** `MotherOf(x)`, `Square(x)`.
   - **Quantifiers:** Universal ($\forall x$) and Existential ($\exists x$).

---

### 2. The 8-Step Canonical Pipeline: FOL to Conjunctive Normal Form (CNF)

To execute automated Robinson Resolution proofs, any First-Order Logic formula must be systematically converted into **Conjunctive Normal Form (CNF)** (a conjunction of clauses, where each clause is a disjunction of literals):

1. **Step 1: Eliminate Implications ($⇒$) and Biconditionals ($\iff$):**
   $$A ⇒ B \equiv ≠g A \lor B,      A \iff B \equiv (≠g A \lor B) \land (≠g B \lor A)$$
2. **Step 2: Move Negations Inward (De Morgan's Laws & Quantifier Duality):**
   $$≠g (A \land B) \equiv ≠g A \lor ≠g B,      ≠g (A \lor B) \equiv ≠g A \land ≠g B,      ≠g(≠g A) \equiv A$$
   $$≠g(\forall x , P(x)) \equiv \exists x , ≠g P(x),      ≠g(\exists x , P(x)) \equiv \forall x , ≠g P(x)$$
3. **Step 3: Standardize Variables (Rename bound variables):** Ensure every quantifier has a unique variable name:
   $$(\forall x , P(x)) \lor (\exists x , Q(x)) \longrightarrow (\forall x , P(x)) \lor (\exists y , Q(y))$$
4. **Step 4: Skolemization (Eliminate Existential Quantifiers $\exists$):**
   - If $\exists x$ is not in the scope of any universal quantifier: Replace $x$ with a unique **Skolem Constant** $k$: $\exists x , P(x) \to  P(k)$.
   - If $\exists y$ is in the scope of universal quantifier $\forall x$: Replace $y$ with a **Skolem Function** $f(x)$: $\forall x , \exists y , \text{Loves}(x, y) \to  \forall x , \text{Loves}(x, f(x))$.
5. **Step 5: Drop Universal Quantifiers ($\forall$):** All remaining variables are assumed universally quantified: $\forall x , P(x) \to  P(x)$.
6. **Step 6: Distribute $\lor$ over $\land$:** Convert into Product of Sums:
   $$A \lor (B \land C) \equiv (A \lor B) \land (A \lor C)$$
7. **Step 7: Flatten Nested Conjunctions & Disjunctions:** $(A \lor B) \lor C \to  A \lor B \lor C$.
8. **Step 8: Clause Splitting:** Split each conjunct into a separate standalone clause.

---

### 3. The Resolution Refutation Proof Architecture

> 🟢 **Alan Robinson's Resolution Principle (1965):** Let $C_1 = L_1 \lor \alpha$ and $C_2 = ≠g L_2 \lor \beta$ be two clauses. If there exists a Most General Unifier (MGU) $θ$ such that $L_1 θ = L_2 θ$:
> $$\mathbf{\frac{L_1 \lor \alpha,    ≠g L_2 \lor \beta}{(\alpha \lor \beta)θ}}$$

#### Proof by Contradiction Protocol:
1. Negate the hypothesis/goal statement to be proved: $\mathbf{\alpha \to  ≠g\alpha}$.
2. Convert knowledge base axioms and negated goal $≠g\alpha$ into CNF clauses.
3. Apply resolution rule repeatedly to resolve complementary literals.
4. If the **Empty Clause ($\square$ / Nil)** is derived, a contradiction is reached, proving the original theorem is **TRUE**!

---

---


**Problem:**
Convert the following statements into Propositional Logic symbols:
1. "If it rains ($P$), the cricket match is canceled ($Q$)."
2. "The match is canceled if and only if it rains or the pitch is wet ($R$)."

---

**Step 1 🚀: Statement 1 (Implication)**
"If $P$ then $Q$":
$$\mathbf{P \to  Q    \equiv    ≠g P \vee Q}$$

**Step 2 ⚡: Statement 2 (Biconditional with Disjunction)**
"$Q$ if and only if ($P$ or $R$)":
$$\mathbf{Q \leftrightarrow (P \vee R)}$$


🎯 1: $P \to  Q$ | 2: $Q \leftrightarrow (P \vee R)$.




**University Question (8 Marks):**
Convert the statement ∀ x [ Animal(x) → ∃ y (Loves(x, y)) ] into Conjunctive Normal Form (CNF) clauses.

---

**Step 1 🚀: Eliminate Implication (→)**
∀ x [ ≠g Animal(x) \vee ∃ y , Loves(x, y) ]

**Step 2 ⚡: Push Negations Inward (N/A here)**

**Step 3 🎯: Standardize Variable Names**
Variables x and y are distinct.

**Step 4 🏁: Skolemization (Replace ∃ y)**
Since ∃ y is inside universal ∀ x, y depends on x.
Replace y with Skolem function f(x):
∀ x [ ≠g Animal(x) \vee Loves(x, f(x)) ]

**Step 5 🚀: Drop Universal Quantifiers and Extract Clause**

e g Animal(x) \vee \text{Loves(x, f(x))}


🎯 Final CNF Clause: $\mathbf{≠g \text{Animal}(x) \vee \text{Loves}(x, f(x))}$.




**University Question (10 Marks - Classic Exam Question):**
Using Resolution Refutation in Predicate Logic, prove the conclusion: *"Socrates is mortal"* from:
1. Premise 1: "All humans are mortal." ($\forall x [ \text{Human}(x) \to  \text{Mortal}(x) ]$)
2. Premise 2: "Socrates is human." ($\text{Human}(\text{Socrates})$)

---

**Step 1 🚀: Convert Knowledge Base to CNF Clauses**
- Clause 1 from Premise 1:
  $$\text{Human}(x) \to  \text{Mortal}(x) ⇒ \mathbf{≠g \text{Human}(x) \vee \text{Mortal}(x)}$$
- Clause 2 from Premise 2:
  $$\mathbf{\text{Human}(\text{Socrates})}$$

**Step 2 ⚡: Negate the Goal (Proof by Contradiction)**
- Goal: $\text{Mortal}(\text{Socrates})$
- Negated Goal (Clause 3):
  $$\mathbf{≠g \text{Mortal}(\text{Socrates})}$$

**Step 3 🎯: Resolution Step 1 (Resolve Clause 1 and Clause 2)**
- Unify variable $x$ with constant $\text{Socrates}$ ($[x / \text{Socrates}]$):
  - Clause 1: $≠g \text{Human}(\text{Socrates}) \vee \text{Mortal}(\text{Socrates})$
  - Clause 2: $\text{Human}(\text{Socrates})$
- Literals $≠g \text{Human}(\text{Socrates})$ and $\text{Human}(\text{Socrates})$ cancel out!
- Resolvent (Clause 4):
  $$\mathbf{\text{Mortal}(\text{Socrates})}$$

**Step 4 🏁: Resolution Step 2 (Resolve Clause 4 with Negated Goal Clause 3)**
- Clause 4: $\text{Mortal}(\text{Socrates})$
- Clause 3: $≠g \text{Mortal}(\text{Socrates})$
- Both cancel out to produce the **Empty Clause ($\square$ / Contradiction)**!


🎯 Contradiction ($\square$) derived $⇒$ Negated goal is false $⇒$ **"Socrates is mortal" is undeniably TRUE**.