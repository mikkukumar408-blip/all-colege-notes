### 1. Supervised Learning Algorithms: In-Depth Mathematical Theory

#### A. Decision Trees (ID3 Algorithm & Shannon Entropy):
Ross Quinlan's ID3 algorithm constructs decision trees using a greedy top-down divide-and-conquer heuristic guided by Information Theory:
1. **Shannon Entropy of Dataset $S$:** Measures the impurity or randomness:
   $$\mathbf{H(S) = - \sum_{i=1}^c p_i \log_2(p_i)}$$
   where $p_i$ is the proportion of samples belonging to class $i$.
   - Pure node ($p_1 = 1$): $H(S) = 0$ (Zero uncertainty).
   - Maximum impurity ($p_1 = p_2 = 0.5$): $H(S) = -2(0.5\log_2 0.5) = 1.0,\text{bit}$.
2. **Information Gain ($IG$):** Expected reduction in entropy caused by partitioning $S$ on attribute $A$:
   $$\mathbf{IG(S, A) = H(S) - \sum_{v \in \text{Values}(A)} \frac{|S_v|}{|S|} H(S_v)}$$
   - **Splitting Criterion:** Select the attribute that maximizes Information Gain: $A^* = \operatorname*{argmax}_A IG(S, A)$.

---

### 2. Support Vector Machines (SVM) & Maximum Margin Hyperplane

SVM finds an optimal separating hyperplane $\vec{w} cdot  \vec{x} + b = 0$ that maximizes the geometric margin $2/|\vec{w}|$ separating two linearly separable classes:

#### Constrained Optimization Formulation:
$$\min_{\vec{w}, b} \frac{1}{2} |\vec{w}|^2    \text{subject to}    y_i (\vec{w} cdot  \vec{x}_i + b) ≥ 1    (\forall i)$$
- **Support Vectors:** The critical training instances lying strictly on the margin boundaries $y_i(\vec{w} cdot  \vec{x}_i + b) = 1$. Moving or deleting any other training point has zero effect on the decision boundary!
- **The Kernel Trick:** Maps non-linearly separable inputs into an infinite-dimensional Hilbert space via kernel function $K(\vec{x}_i, \vec{x}_j) = \phi(\vec{x}_i) cdot  \phi(\vec{x}_j)$ (e.g., Radial Basis Function RBF Gaussian Kernel: $K(x, z) = \exp(-\gamma |x - z|^2)$).

---

### 3. Naive Bayes Classifier & Maximum A Posteriori (MAP)

Based on Bayes' Theorem with the "naive" conditional independence assumption that features are mutually independent given the class label:
$$\mathbf{P(y \mid x₁, ..., xₙ) = \frac{P(y) \prod_{i=1}^n P(x_i \mid y)}{P(x₁, ..., xₙ)}}$$
$$\mathbf{\hat{y} = \operatorname*{argmax}_{y \in \mathcal{Y}} \left[ P(y) \prod_{i=1}^n P(x_i \mid y) \right]}$$
- **Laplace (Add-1) Smoothing:** Prevents zero-probability catastrophe when a feature never appears in the training set for a given class:
  $$\mathbf{P(x_i \mid y) = \frac{\text{count}(x_i, y) + 1}{\text{count}(y) + |V|}}$$

---

---


**Problem:**
A dataset of 16 students contains 12 who passed an exam and 4 who failed. Calculate the Shannon Entropy $H(S)$ of this dataset.

---

**Step 1 🚀: Probabilities**
$$p_+ = \frac{12}{16} = 0.75,      p_- = \frac{4}{16} = 0.25$$

**Step 2 ⚡: Shannon Entropy Formula**
$$H(S) = -p_+ \log_2(p_+) - p_- \log_2(p_-)$$
- $\log_2(0.75) = -0.415$
- $\log_2(0.25) = -2.000$
$$H(S) = -(0.75)(-0.415) - (0.25)(-2.0) = 0.311 + 0.500 = \mathbf{0.811,\text{bits}}$$


🎯 Entropy: $\mathbf{H(S) = 0.811,\text{bits}}$ (Impure dataset with moderate uncertainty).




**University Question (8 Marks):**
Total dataset has 14 instances (9 Yes, 5 No), with initial entropy H(S) = 0.940,\,\text{bits}.
Splitting by feature `Wind`:
- `Weak` (8 instances: 6 Yes, 2 No): Entropy H(SWₑₐₖ) = 0.811
- `Strong` (6 instances: 3 Yes, 3 No): Entropy H(SSₜᵣₒₙg) = 1.000
Calculate the Information Gain IG(S, Wind).

---

**Step 1 🚀: Weighted Average Entropy after Split**
H(S, Wind) = \frac{8}{14} H(SWₑₐₖ) + \frac{6}{14} H(SSₜᵣₒₙg)
= \frac{8}{14}(0.811) + \frac{6}{14}(1.000) = 0.463 + 0.429 = 0.892,\,\text{bits}

**Step 2 ⚡: Information Gain Formula**
IG(S, Wind) = H(S) - H(S, Wind) = 0.940 - 0.892 = 0.048,\,\text{bits}


🎯 Information Gain: $\mathbf{IG(S, \text{Wind}) = 0.048,\text{bits}}$.




**University Question (10 Marks - Classic ML Problem):**
Given a training dataset for loan approval based on Credit Score and Income:
- Prior probabilities: P(Yes) = 0.60, ; P(No) = 0.40
- Likelihoods:
  - P(Credit=Fair \mid Yes) = 0.30,    P(Credit=Fair \mid No) = 0.70
  - P(Income=High \mid Yes) = 0.80,    P(Income=High \mid No) = 0.20
Predict whether a customer with Credit=Fair and Income=High will be approved (Yes or No).

---

**Step 1 🚀: Calculate Unnormalized Posterior for 'Yes'**
P(Yes \mid X) \propto P(Yes) × P(Credit=Fair \mid Yes) × P(Income=High \mid Yes)
= 0.60 × 0.30 × 0.80 = 0.144

**Step 2 ⚡: Calculate Unnormalized Posterior for 'No'**
P(No \mid X) \propto P(No) × P(Credit=Fair \mid No) × P(Income=High \mid No)
= 0.40 × 0.70 × 0.20 = 0.056

**Step 3 🎯: Normalize Probabilities**
Total = 0.144 + 0.056 = 0.200
P(Yes \mid X) = (0.144 / 0.200) = 72.0%,      P(No \mid X) = (0.056 / 0.200) = 28.0%


🎯 Naive Bayes Decision: **APPROVED (YES)** with $\mathbf{72.0%}$ confidence.