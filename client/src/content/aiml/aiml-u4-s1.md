### 1. Machine Learning Foundations & Tom Mitchell's Paradigm

Machine Learning (ML) is the subfield of Artificial Intelligence concerned with algorithms that improve automatically through experience.

#### Tom Mitchell's Formal Operational Definition (1997):
> 🟢 **Theorem:** A computer program is said to **learn** from experience $\mathcal{E}$ with respect to some class of tasks $\mathcal{T}$ and performance measure $\mathcal{P}$, if its performance at tasks in $\mathcal{T}$, as measured by $\mathcal{P}$, improves with experience $\mathcal{E}$:
> $$\mathbf{\mathcal{M} = \langle \mathcal{T}, ; \mathcal{P}, ; \mathcal{E} \rangle}$$

- **Example (Autonomous Vehicle):**
  - Task $\mathcal{T}$: Driving safely along a highway with lane changes.
  - Performance $\mathcal{P}$: Distance traveled without human intervention / collision.
  - Experience $\mathcal{E}$: Millions of camera frames and steering telemetry logged.

---

### 2. The Three Major Paradigms of Machine Learning

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 680 235" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="ml-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
      </marker>
    </defs>
    <rect x="5" y="5" width="670" height="225" rx="12" class="schematic-bg" fill="rgba(15,23,42,0.75)" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5 4" />
    <!-- Root Node -->
    <rect x="220" y="18" width="240" height="36" rx="8" fill="rgba(30,58,138,0.9)" stroke="#38bdf8" stroke-width="2" />
    <text x="340" y="41" text-anchor="middle" fill="#ffffff" font-size="13.5" font-weight="bold">MACHINE LEARNING PARADIGMS</text>
    <!-- Tree Branches -->
    <path d="M 340 54 L 340 68 M 115 68 L 565 68 M 115 68 L 115 82 M 340 68 L 340 82 M 565 68 L 565 82" stroke="#38bdf8" stroke-width="2" fill="none" />
    <!-- 1. Supervised -->
    <rect x="20" y="84" width="190" height="58" rx="8" fill="rgba(6,78,59,0.85)" stroke="#34d399" stroke-width="1.8" />
    <text x="115" y="103" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="bold">SUPERVISED LEARNING</text>
    <text x="115" y="119" text-anchor="middle" fill="#a7f3d0" font-size="10">Labeled Data: (X, Y)</text>
    <text x="115" y="133" text-anchor="middle" fill="#6ee7b7" font-size="10">Learn Mapping f: X → Y</text>
    <!-- 2. Unsupervised -->
    <rect x="245" y="84" width="190" height="58" rx="8" fill="rgba(88,28,135,0.85)" stroke="#c084fc" stroke-width="1.8" />
    <text x="340" y="103" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="bold">UNSUPERVISED LEARNING</text>
    <text x="340" y="119" text-anchor="middle" fill="#e9d5ff" font-size="10">Unlabeled Data: (X only)</text>
    <text x="340" y="133" text-anchor="middle" fill="#d8b4fe" font-size="10">Discover Latent Structure</text>
    <!-- 3. Reinforcement -->
    <rect x="470" y="84" width="190" height="58" rx="8" fill="rgba(124,45,18,0.85)" stroke="#fb923c" stroke-width="1.8" />
    <text x="565" y="103" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="bold">REINFORCEMENT (RL)</text>
    <text x="565" y="119" text-anchor="middle" fill="#fed7aa" font-size="10">State-Action-Reward (s, a, r)</text>
    <text x="565" y="133" text-anchor="middle" fill="#fdba74" font-size="10">Maximize Cumulative Return</text>
    <!-- Sub-branches -->
    <path d="M 115 142 L 115 154 M 65 154 L 165 154 M 65 154 L 65 166 M 165 154 L 165 166" stroke="#34d399" stroke-width="1.5" fill="none" />
    <path d="M 340 142 L 340 154 M 290 154 L 390 154 M 290 154 L 290 166 M 390 154 L 390 166" stroke="#c084fc" stroke-width="1.5" fill="none" />
    <path d="M 565 142 L 565 154 M 515 154 L 615 154 M 515 154 L 515 166 M 615 154 L 615 166" stroke="#fb923c" stroke-width="1.5" fill="none" />
    <!-- Leaf Nodes -->
    <rect x="18" y="167" width="92" height="46" rx="6" fill="#0f172a" stroke="#34d399" stroke-width="1.3" />
    <text x="64" y="186" text-anchor="middle" fill="#ffffff" font-size="10.5" font-weight="bold">Classification</text>
    <text x="64" y="202" text-anchor="middle" fill="#6ee7b7" font-size="9.5">Discrete Y</text>
    <rect x="118" y="167" width="92" height="46" rx="6" fill="#0f172a" stroke="#34d399" stroke-width="1.3" />
    <text x="164" y="186" text-anchor="middle" fill="#ffffff" font-size="10.5" font-weight="bold">Regression</text>
    <text x="164" y="202" text-anchor="middle" fill="#6ee7b7" font-size="9.5">Continuous Y</text>
    <rect x="243" y="167" width="92" height="46" rx="6" fill="#0f172a" stroke="#c084fc" stroke-width="1.3" />
    <text x="289" y="186" text-anchor="middle" fill="#ffffff" font-size="10.5" font-weight="bold">Clustering</text>
    <text x="289" y="202" text-anchor="middle" fill="#d8b4fe" font-size="9.5">k-Means / Hierarchical</text>
    <rect x="343" y="167" width="92" height="46" rx="6" fill="#0f172a" stroke="#c084fc" stroke-width="1.3" />
    <text x="389" y="186" text-anchor="middle" fill="#ffffff" font-size="10.5" font-weight="bold">Association</text>
    <text x="389" y="202" text-anchor="middle" fill="#d8b4fe" font-size="9.5">Apriori / FP-Growth</text>
    <rect x="468" y="167" width="92" height="46" rx="6" fill="#0f172a" stroke="#fb923c" stroke-width="1.3" />
    <text x="514" y="186" text-anchor="middle" fill="#ffffff" font-size="10.5" font-weight="bold">Model-Free</text>
    <text x="514" y="202" text-anchor="middle" fill="#fdba74" font-size="9.5">Q-Learning / PPO</text>
    <rect x="568" y="167" width="92" height="46" rx="6" fill="#0f172a" stroke="#fb923c" stroke-width="1.3" />
    <text x="614" y="186" text-anchor="middle" fill="#ffffff" font-size="10.5" font-weight="bold">Model-Based</text>
    <text x="614" y="202" text-anchor="middle" fill="#fdba74" font-size="9.5">Markov (MDP)</text>
  </svg>
</div>

---

### 3. The Bias-Variance Tradeoff & Generalization Error

For any supervised learning model, the expected test mean squared error decomposes into three fundamental components:
\mathbb{E[Test Error] = Bias² + Variance + σᵢᵣᵣₑdᵤcᵢbₗₑ^2}
- **Bias:** Error introduced by approximating a complicated real-world problem with an overly simplistic model (e.g., fitting a linear line to a parabolic curve). High bias ⇒ **Underfitting**.
- **Variance:** Sensitivity of the model to tiny random fluctuations in the training dataset. High variance ⇒ **Overfitting** (memorizing training noise instead of true underlying distribution).
- **Irreducible Error (σ²):** Inherent statistical noise in the physical measurements.

---

---


**Problem:**
Define Tom Mitchell's Machine Learning triad \langle T, P, E \rangle for an automated Email Spam Detection filter.

---

**Step 1 🚀: Task (T)**
- Classify incoming emails as either `Spam` or `Ham` (Legitimate).

**Step 2 ⚡: Performance Measure (P)**
- Precision, recall, and classification accuracy percentage (fraction of spam caught without flagging real emails).

**Step 3 🎯: Experience (E)**
- A database of 50,000 historical emails previously marked by users as spam or not spam.


🎯 Task: Filter spam | Performance: Accuracy / F1-score | Experience: Historical labeled email corpus.




**University Question (8 Marks):**
Given 3 data points (x, y): (1, 2), (2, 3), (3, 7). Find the line of best fit y = m x + c using least squares regression.

---

**Step 1 🚀: Means \bar(x) and \bar(y)**
\bar(x) = \frac{1 + 2 + 3}{3} = 2.0,      \bar(y) = \frac{2 + 3 + 7}{3} = \frac{12}{3} = 4.0

**Step 2 ⚡: Slope m**
∑ (xᵢ - \bar(x))(yᵢ - \bar(y)) = (1-2)(2-4) + (2-2)(3-4) + (3-2)(7-4)
= (-1)(-2) + (0)(-1) + (1)(3) = 2 + 0 + 3 = 5.0
∑ (xᵢ - \bar(x))² = (1-2)² + (2-2)² + (3-2)² = 1 + 0 + 1 = 2.0
m = (5.0 / 2.0) = 2.5

**Step 3 🎯: Intercept c**
c = \bar(y) - m \bar(x) = 4.0 - (2.5)(2.0) = 4.0 - 5.0 = -1.0


🎯 Linear Regression Equation: $\mathbf{y = 2.5 x - 1.0}$.




**University Question (10 Marks):**
In linear regression with Mean Squared Error loss J(w) = \frac{1}{2N} ∑_(i=1)^N (w xᵢ - yᵢ)²:
Given data points (1, 2) and (2, 4), initial weight w = 0.5, and learning rate α = 0.1.
Compute the gradient (∂ J / ∂ w) and the updated weight wₙₑw after 1 iteration of gradient descent.

---

**Step 1 🚀: Compute Predictions and Errors**
- For x₁ = 1: \hat(y)_1 = w x₁ = 0.5(1) = 0.5. Error e₁ = \hat(y)_1 - y₁ = 0.5 - 2 = -1.5.
- For x₂ = 2: \hat(y)_2 = w x₂ = 0.5(2) = 1.0. Error e₂ = \hat(y)_2 - y₂ = 1.0 - 4 = -3.0.

**Step 2 ⚡: Compute Gradient (∂ J / ∂ w)**
(∂ J / ∂ w) = \frac{1}{N} ∑_(i=1)^N (\hat(y)_i - yᵢ) xᵢ = \frac{1}{2} [ (-1.5)(1) + (-3.0)(2) ] = \frac{1}{2} [ -1.5 - 6.0 ] = (-7.5 / 2) = -3.75

**Step 3 🎯: Update Weight**
wₙₑw = w - α (∂ J / ∂ w) = 0.5 - (0.1)(-3.75) = 0.5 + 0.375 = 0.875
The weight moved from 0.5 closer to the true value 2.0!


🎯 Gradient = $-3.75$ | Updated Weight after 1 epoch: $\mathbf{w_{\text{new}} = 0.875}$.