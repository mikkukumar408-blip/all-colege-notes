### 1. Market Basket Analysis & Association Rule Mining

Market Basket Analysis uncovers actionable co-occurrence relationships among products frequently purchased together in retail transactional databases.

#### Formal Mathematical Definitions:
Let $\mathcal{I} = {i_1, i_2, ..., i_m}$ be a universe of items, and $\mathcal{D} = {T_1, T_2, ..., T_n}$ be a database of transactions where $T_k \subseteq \mathcal{I}$.
An **Association Rule** is an implication of the form:
$$\mathbf{X ⇒ Y    (X, Y \subset \mathcal{I}, ; X \cap Y = \emptyset)}$$

---

### 2. The Three Fundamental Evaluation Metrics

1. **Support ($s$):** Probability that a transaction contains both itemsets $X$ and $Y$:
   $$\mathbf{\text{Support}(X ⇒ Y) = P(X \cup Y) = \frac{\text{Transactions containing } (X \cup Y)}{\text{Total number of transactions } |\mathcal{D}|}}$$
2. **Confidence ($c$):** Conditional probability that a transaction contains $Y$, given that it already contains $X$:
   $$\mathbf{\text{Confidence}(X ⇒ Y) = P(Y \mid X) = \frac{\text{Support}(X \cup Y)}{\text{Support}(X)} = \frac{\text{count}(X \cup Y)}{\text{count}(X)}}$$
3. **Lift ($L$):** Measures the correlation strength between $X$ and $Y$ relative to independent chance:
   $$\mathbf{\text{Lift}(X ⇒ Y) = \frac{\text{Confidence}(X ⇒ Y)}{\text{Support}(Y)} = \frac{P(X \cup Y)}{P(X) cdot  P(Y)}}$$
   - $\mathbf{\text{Lift} = 1.0} ⇒ X$ and $Y$ are statistically **independent**.
   - $\mathbf{\text{Lift} > 1.0} ⇒$ **Positive correlation** (buying $X$ strongly drives purchase of $Y$).
   - $\mathbf{\text{Lift} < 1.0} ⇒$ **Negative correlation** (substitutes; buying $X$ decreases likelihood of buying $Y$).

---

### 3. The Apriori Algorithm & Downward Closure Property

> 🟢 **The Apriori Principle (Downward Closure Property):**
> *"Every subset of a frequent itemset must also be frequent."*
> 🔴 **Crucial Contrapositive (Pruning Principle):**
> *"If any candidate itemset is INFREQUENT, then all of its supersets are GUARANTEED TO BE INFREQUENT and can be pruned immediately without scanning the database!"*

#### Algorithmic Loop:
1. Generate candidate 1-itemsets $C_1$. Prune those below minimum support to obtain $L_1$.
2. For $k = 2, 3, ...$:
   - **Join Step:** Generate candidate itemsets $C_k$ by joining $L_{k-1}$ with itself: $L_{k-1} \bowtie L_{k-1}$.
   - **Prune Step:** Check if any $(k-1)$-subset of $c \in C_k$ is not in $L_{k-1}$. If so, discard $c$.
   - **Scan Database:** Count frequencies of remaining candidates in $\mathcal{D}$.
   - Filter by $\text{min\_support}$ to obtain frequent itemset $L_k$.
3. Stop when $L_k$ is empty.

---

---


**Problem:**
A grocery store records $N = 100$ customer transactions:
- 40 transactions contained `Milk`.
- 30 transactions contained `Bread`.
- 20 transactions contained both `Milk` and `Bread`.
Calculate the Support and Confidence of the association rule: $\text{Milk} \to  \text{Bread}$.

---

**Step 1 🚀: Support of Rule**
$$\text{Support}(\text{Milk} \to  \text{Bread}) = \frac{\text{Transactions containing both}}{\text{Total transactions}} = \frac{20}{100} = \mathbf{0.20 = 20%}$$

**Step 2 ⚡: Confidence of Rule**
$$\text{Confidence}(\text{Milk} \to  \text{Bread}) = \frac{\text{Support}(\text{Milk} \cup \text{Bread})}{\text{Support}(\text{Milk})} = \frac{20}{40} = \mathbf{0.50 = 50%}$$


🎯 $\text{Support} = 20%$ | $\text{Confidence} = 50%$ (Half of milk buyers also purchase bread).




**University Question (6 Marks):**
For the rule Beer → Diapers, given:
- P(Beer) = 0.25
- P(Diapers) = 0.40
- P(Beer ∩ Diapers) = 0.20
Calculate the **Lift** of the rule and explain whether buying beer increases the probability of buying diapers.

---

**Step 1 🚀: Lift Formula**
Lift(A → B) = (P(A ∩ B) / P(A) × P(B))

**Step 2 ⚡: Substitute Probabilities**
Lift = (0.20 / 0.25 × 0.40) = (0.20 / 0.10) = 2.0

**Step 3 🎯: Interpretation**
- Lift = 1: Independent.
- Lift > 1: Positive association.
A Lift of 2.0 indicates that customers who buy beer are **twice as likely** to purchase diapers compared to random chance!


🎯 $\text{Lift} = 2.0 > 1$ $⇒$ Strong positive association between Beer and Diapers.




**University Question (10 Marks - University Exam):**
Given transactions database T = { {A, B, C}, {A, C}, {B, D}, {A, B, C, D}, {A, B} } with minimum support threshold sₘᵢₙ = 2 (40%):
Generate all frequent itemsets using the Apriori property and list the candidate generation and pruning steps for L₁, C₂, L₂, C₃, L₃.

---

**Step 1 🚀: Frequent 1-Itemsets (L₁)**
- {A}: count 4 (4 ≥ 2) → Frequent
- {B}: count 4 (4 ≥ 2) → Frequent
- {C}: count 3 (3 ≥ 2) → Frequent
- {D}: count 2 (2 ≥ 2) → Frequent
L₁ = { {A}, {B}, {C}, {D} }

**Step 2 ⚡: Candidate 2-Itemsets (C₂) and Frequent (L₂)**
Join L₁: C₂ = { {A, B}, {A, C}, {A, D}, {B, C}, {B, D}, {C, D} }.
Count support:
- {A, B}: 3 transactions → Frequent
- {A, C}: 3 transactions → Frequent
- {A, D}: 1 transaction → **PRUNED!** (
🎯 Frequent Itemsets: $L_1$ (4 itemsets), $L_2 = {{A,B}, {A,C}, {B,C}, {B,D}}$, $L_3 = {{A,B,C}}$.