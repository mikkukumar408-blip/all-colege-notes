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

```
                            [ MACHINE LEARNING ]
                                     |
         +---------------------------+---------------------------+
         |                           |                           |
  [ SUPERVISED ]              [ UNSUPERVISED ]          [ REINFORCEMENT ]
  Data: (X, Y)                Data: (X) unlabeled        Data: Agent in World
  Goal: Learn mapping         Goal: Find intrinsic       Goal: Learn policy pi(a|s)
        f: X -> Y                   clusters / patterns         maximizing reward R
         |                           |                           |
   +-----+-----+               +-----+-----+               +-----+-----+
   |           |               |           |               |           |
Classification Regression   Clustering  Association      Q-Learning   PPO
(Discrete Y)  (Continuous Y)(k-Means)   (Apriori)        (Markov Decision Process)
```

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