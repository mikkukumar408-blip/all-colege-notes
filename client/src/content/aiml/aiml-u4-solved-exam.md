### MMDU Official University Solved Examination Questions (Unit 4)
**Course:** Fundamentals of AI & ML (`BCSE-011`)  
**Pattern:** Sections A (1 Mark Compulsory), B (2 Marks Analytical), C (6 Marks In-Depth), D (6 Marks Design/Long)

---
<example level="easy" title="Question 10 (1 Mark): Limitation of Accuracy in Imbalanced Datasets">
**Question:**  
Calculate the accuracy of a naive classifier that predicts all transactions as non-fraudulent on a dataset with 990 genuine and 10 fraudulent samples.

> 📊 **Question Schematic / State Specification:**
```
Question Class Distribution: 99% Negative Class (Genuine) | 1% Positive Class (Fraud) | Classifier predicts all Negative.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Accuracy Paradox Formulation:

        `Accuracy = (TP + TN) / Total = (0 + 990) / 1000 = 99.0%`. Yet Fraud Recall is `0 / 10 = 0%` (Complete Failure!).
```

Accuracy yields a deceptive score of 99.0% despite failing completely on the minority class of interest. In imbalanced domains, Precision, Recall, and F1-score must be used instead.

<div class="example-answer-box">
🎯 **Verified Result:** Question 10 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="easy" title="Question 11 (1 Mark): Why k-Nearest Neighbors is Termed a "Lazy Learner"">
**Question:**  
Why is the k-NN algorithm classified as a Lazy Learner rather than an Eager Learner?

> 📊 **Question Schematic / State Specification:**
```
Question Training vs Inference Cost: Eager [Heavy Training, Instant Inference] vs Lazy [Zero Training, Heavy Distance Computation at Inference].
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Computation Delay Model:

        `Training Time = O(1) [Simply stores data] ➔ Test Time = O(N · d) [Computes distances to all N points]`.
```

k-NN performs zero explicit generalization during training (it simply stores the training instances in memory). It defers all computation until query time, computing distances to every stored point upon inference.

<div class="example-answer-box">
🎯 **Verified Result:** Question 11 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="easy" title="Question 12 (1 Mark): The Apriori Principle in Frequent Itemset Mining">
**Question:**  
State the anti-monotonicity property of the Apriori principle that enables search space pruning.

> 📊 **Question Schematic / State Specification:**
```
Question Pruning Lattice: If itemset (Beer, Diaper) is Infrequent ➔ Superset (Beer, Diaper, Milk) is guaranteed Infrequent!
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Anti-Monotone Lattice Formulation:

        `Support(X &cup; Y) ≤ Support(X)`. Therefore: `Support(X) &lt; min\_sup ⟹ Support(X &cup; Y) &lt; min\_sup`.
```

The Apriori Principle states that all non-empty subsets of a frequent itemset must also be frequent. Conversely, if an itemset is infrequent, all of its supersets will inevitably be infrequent, allowing entire sub-lattices to be pruned immediately.

<div class="example-answer-box">
🎯 **Verified Result:** Question 12 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="medium" title="Question 16 (2 Marks): Complete Confusion Matrix Computation">
**Question:**  
A cancer diagnostic test yields TP = 80, FP = 20, FN = 10, TN = 890. Calculate Precision, Recall, and F1-Score.

> 📊 **Question Schematic / State Specification:**
```
Question 2×2 Contingency Matrix: Actual Positives = 90 (80 TP + 10 FN) | Actual Negatives = 910 (20 FP + 890 TN).
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Performance Metrics Derivation:

        `Precision = TP / (TP + FP) = 80 / (80 + 20) = 80 / 100 = 0.80 (80.0%)`

        `Recall = TP / (TP + FN) = 80 / (80 + 10) = 80 / 90 = 0.8889 (88.89%)`

        `F1-Score = 2 × \frac{0.80 × 0.8889}{0.80 + 0.8889} = 1.4222 / 1.6889 = 0.8421 (84.21%)`
```

The model captures ~88.9% of all true cancer cases while maintaining an 80.0% precision rate, resulting in an balanced F1-score of 0.8421.

<div class="example-answer-box">
🎯 **Verified Result:** Question 16 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="hard" title="Question 20 (4 Marks): Information Gain Computation for Decision Tree Splitting">
**Question:**  
A dataset has 14 samples: 9 Positive (+), 5 Negative (-). An attribute "Wind" splits into: Weak (6+, 2-) and Strong (3+, 3-). Compute Information Gain: Gain(S, Wind).

> 📊 **Question Schematic / State Specification:**
```
Question Partition Tree: Root S [9+, 5-] ➔ Weak [6+, 2-] (8 samples) and Strong [3+, 3-] (6 samples).
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Entropy & Gain Derivation:

        `Entropy(S) = - \frac{9}{14} log₂\frac{9}{14} - \frac{5}{14} log₂\frac{5}{14} = 0.9403 bits`

        `Entropy(SWₑₐₖ) = - \frac{6}{8} log₂\frac{6}{8} - \frac{2}{8} log₂\frac{2}{8} = 0.8113 bits`

        `Entropy(SSₜᵣₒₙg) = - \frac{3}{6} log₂\frac{3}{6} - \frac{3}{6} log₂\frac{3}{6} = 1.0000 bits`

        `Expected Entropy = \frac{8}{14} × 0.8113 + \frac{6}{14} × 1.0000 = 0.4636 + 0.4286 = 0.8922 bits`

        `Gain(S, Wind) = 0.9403 - 0.8922 = 0.0481 bits`
```

Attribute "Wind" reduces disorder by **0.0481 bits**. The decision tree compares this Gain against all remaining candidate attributes and selects the maximum for the root split.

<div class="example-answer-box">
🎯 **Verified Result:** Question 20 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

<example level="hard" title="Question 24 (6 Marks): Mathematical Derivation and Step-by-Step Execution of k-Means Clustering">
**Question:**  
Given 1D data points X = (2, 4, 10, 12, 3, 20, 30, 11, 25). Cluster into k=2 groups using initial centroids μ₁ = 2 and μ₂ = 4. Perform complete iterations until convergence.

> 📊 **Question Schematic / State Specification:**
```
Question Centroid Displacement Vector: μ₁ = 2, μ₂ = 4 ➔ Assign all points ➔ Recalculate means ➔ Check Δμ = 0.
```

---

**Step-by-Step Solution:**

> ⚡ **Solution Analytical Derivation & Schematic:**
```
Solution Iterative Centroid Convergence Trace:

        `Iteration 1 Assignment:`

        `Distance to μ₁(2) vs μ₂(4):`

        `Point 2: |2-2|=0 ≤ |2-4|=2 ⟹ Cluster 1`

        `Point 3: |3-2|=1 = |3-4|=1 ⟹ Cluster 1 (tie break)`

        `Points (4, 10, 11, 12, 20, 25, 30) all closer to μ₂=4 ⟹ Cluster 2`

        `Cluster 1 = (2, 3) ⟹ New Centroid μ₁' = (2+3)/2 = 2.5`

        `Cluster 2 = (4, 10, 11, 12, 20, 25, 30) ⟹ New Centroid μ₂' = 112 / 7 = 16.0`

        

        `Iteration 2 Assignment (μ₁=2.5, μ₂=16.0):`

        `Points (2, 3, 4) closer to 2.5 ⟹ Cluster 1`

        `Points (10, 11, 12, 20, 25, 30) closer to 16.0 ⟹ Cluster 2`

        `New Centroid μ₁'' = (2+3+4)/3 = 3.0`

        `New Centroid μ₂'' = (10+11+12+20+25+30)/6 = 108 / 6 = 18.0`

        

        `Iteration 3 Assignment (μ₁=3.0, μ₂=18.0):`

        `Points (2, 3, 4, 10) closer to 3.0? |10-3|=7 vs |10-18|=8 ⟹ Point 10 moves to Cluster 1!`

        `Cluster 1 = (2, 3, 4, 10) ⟹ μ₁''' = 19 / 4 = 4.75`

        `Cluster 2 = (11, 12, 20, 25, 30) ⟹ μ₂''' = 98 / 5 = 19.6`

        

        `Iteration 4 Assignment (μ₁=4.75, μ₂=19.6):`

        `Cluster 1 = (2, 3, 4, 10, 11, 12); Cluster 2 = (20, 25, 30)`

        `μ₁ = 42/6 = 7.0; μ₂ = 75/3 = 25.0`

        

        `Iteration 5 Assignment: Assignments remain identical! NO SHIFT ⟹ CONVERGENCE ACHIEVED!`
```

**Final Converged Clusters:**

      • **Cluster 1:** `(2, 3, 4, 10, 11, 12)` with final mean centroid `μ₁ = 7.0`.

      • **Cluster 2:** `(20, 25, 30)` with final mean centroid `μ₂ = 25.0`.

<div class="example-answer-box">
🎯 **Verified Result:** Question 24 step-by-step resolution per MMDU university marking scheme.
</div>
</example>

---

