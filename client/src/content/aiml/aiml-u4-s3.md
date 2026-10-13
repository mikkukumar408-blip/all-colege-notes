### 1. Unsupervised Clustering & The k-Means Algorithm

Unsupervised clustering groups an unlabeled dataset ${ \vec{x}_1, ..., \vec{x}_n }$ into $k$ distinct, non-overlapping clusters where intra-cluster similarity is maximized and inter-cluster similarity is minimized.

#### The k-Means Objective (Within-Cluster Sum of Squares — WCSS):
$$\mathbf{J = \sum_{j=1}^k \sum_{i \in S_j} |\vec{x}_i - \vec{μ}_j|^2}$$
where $\vec{μ}_j$ is the centroid (mean) of cluster $S_j$.

---

### 2. Algorithmic Execution Pipeline (Lloyd's Algorithm)

1. **Initialization:** Select $k$ initial cluster centroids $\vec{μ}_1, ..., \vec{μ}_k$ randomly from dataset (or via $k\text{-means++}$).
2. **Assignment Step:** Assign each data point $\vec{x}_i$ to the nearest cluster centroid based on Euclidean distance:
   $$\mathbf{c^{(i)} = \arg\min_j |\vec{x}_i - \vec{μ}_j|^2}$$
3. **Update Step:** Recalculate each centroid as the geometric mean of all assigned points:
   $$\mathbf{\vec{μ}_j = \frac{1}{|S_j|} \sum_{i \in S_j} \vec{x}_i}$$
4. **Convergence Check:** Repeat Assignment and Update steps until centroids stabilize ($\Delta \vec{μ} < \epsilon$) or maximum iterations are reached.

---

### 3. Determining Optimal $k$: The Elbow Method

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 680 210" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="670" height="200" rx="12" class="schematic-bg" fill="rgba(15,23,42,0.75)" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5 4" />
    <text x="340" y="25" text-anchor="middle" fill="#38bdf8" font-size="12.5" font-weight="bold" letter-spacing="1">WCSS (WITHIN-CLUSTER SUM OF SQUARES) ELBOW CURVE</text>
    <!-- Axes -->
    <line x1="90" y1="38" x2="90" y2="172" stroke="#94a3b8" stroke-width="2" />
    <line x1="90" y1="172" x2="610" y2="172" stroke="#94a3b8" stroke-width="2" />
    <text x="45" y="108" text-anchor="middle" fill="#bae6fd" font-size="11" font-weight="bold" transform="rotate(-90 45,108)">WCSS Objective Loss (J)</text>
    <text x="350" y="194" text-anchor="middle" fill="#bae6fd" font-size="11.5" font-weight="bold">Number of Clusters (k)</text>
    <!-- Curve Points: k=1..7 -->
    <polyline points="130,48 200,92 270,138 350,152 430,159 510,163 580,166" fill="none" stroke="#38bdf8" stroke-width="3" />
    <!-- Data Dots -->
    <circle cx="130" cy="48" r="4.5" fill="#38bdf8" />
    <text x="130" y="186" text-anchor="middle" fill="#cbd5e1" font-size="10">k=1</text>
    <circle cx="200" cy="92" r="4.5" fill="#38bdf8" />
    <text x="200" y="186" text-anchor="middle" fill="#cbd5e1" font-size="10">k=2</text>
    <!-- Elbow Point k=3 -->
    <circle cx="270" cy="138" r="7" fill="#f43f5e" stroke="#ffffff" stroke-width="2" />
    <text x="270" y="186" text-anchor="middle" fill="#fda4af" font-size="11" font-weight="bold">k=3</text>
    <line x1="278" y1="132" x2="345" y2="95" stroke="#f43f5e" stroke-width="1.8" stroke-dasharray="4 3" />
    <rect x="345" y="72" width="235" height="36" rx="6" fill="rgba(136,19,55,0.85)" stroke="#f43f5e" stroke-width="1.5" />
    <text x="462" y="88" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">ELBOW POINT (Optimal k = 3)</text>
    <text x="462" y="102" text-anchor="middle" fill="#fecdd3" font-size="9.5">Diminishing WCSS reduction beyond k=3</text>
    <!-- Remaining dots -->
    <circle cx="350" cy="152" r="4.5" fill="#38bdf8" />
    <text x="350" y="186" text-anchor="middle" fill="#cbd5e1" font-size="10">k=4</text>
    <circle cx="430" cy="159" r="4.5" fill="#38bdf8" />
    <text x="430" y="186" text-anchor="middle" fill="#cbd5e1" font-size="10">k=5</text>
    <circle cx="510" cy="163" r="4.5" fill="#38bdf8" />
    <text x="510" y="186" text-anchor="middle" fill="#cbd5e1" font-size="10">k=6</text>
  </svg>
</div>

- **The Elbow Criterion:** Plot WCSS ($J$) as a function of $k$. As $k$ increases, WCSS decreases monotonically (reaching $J = 0$ when $k = N$). The point of maximum inflection (the "elbow") represents the optimal balance between cluster compactness and model complexity.

---

---


**Problem:**
Calculate the Euclidean distance between a data point $P(3, 4)$ and two cluster centroids: $C_1(1, 1)$ and $C_2(5, 7)$. Determine which cluster $P$ should be assigned to.

---

**Step 1 🚀: Distance to $C_1(1, 1)$**
$$d(P, C_1) = \sqrt{(3 - 1)^2 + (4 - 1)^2} = \sqrt{2^2 + 3^2} = \sqrt{4 + 9} = \sqrt{13} approx  \mathbf{3.61}$$

**Step 2 ⚡: Distance to $C_2(5, 7)$**
$$d(P, C_2) = \sqrt{(3 - 5)^2 + (4 - 7)^2} = \sqrt{(-2)^2 + (-3)^2} = \sqrt{4 + 9} = \sqrt{13} approx  \mathbf{3.61}$$
Both distances are equal! In case of a tie, point is assigned to $C_1$ by default index rule.


🎯 Distances: $d(P, C_1) = 3.61, d(P, C_2) = 3.61$ | Tie-break assignment to **Cluster 1**.




**University Question (8 Marks):**
Given 4 one-dimensional points: x = [2, 4, 10, 12]. Initial cluster centroids are C₁ = 3 and C₂ = 11.
1. Assign each point to its nearest centroid.
2. Recompute the new centroid positions after 1 iteration.

---

**Step 1 🚀: Point Assignment**
- Point 2: |2 - 3| = 1  |10 - 11| = 1 ⇒ **Cluster 2**
- Point 12: |12 - 3| = 9 > |12 - 11| = 1 ⇒ **Cluster 2**

**Step 2 ⚡: Centroid Recomputation (Mean of Assigned Points)**
C₁,ₙₑw = \frac{2 + 4}{2} = 3.0
C₂,ₙₑw = \frac{10 + 12}{2} = 11.0
Centroids did not change ⇒ **Algorithm has fully CONVERGED in 1 iteration!**


🎯 Clusters: $C_1 = {2, 4}$ with centroid 3.0 | $C_2 = {10, 12}$ with centroid 11.0. Fully converged!




**University Question (10 Marks):**
Calculate the Within-Cluster Sum of Squares (WCSS) for k = 1 versus k = 2 on the 1D dataset {1, 2, 8, 9}. Explain how the "Elbow" indicates the optimal number of clusters.

---

**Step 1 🚀: WCSS for $k = 1$ (All points in single cluster)**
- Centroid: $μ = \frac{1 + 2 + 8 + 9}{4} = \frac{20}{4} = 5.0$
$$WCSS_1 = (1-5)^2 + (2-5)^2 + (8-5)^2 + (9-5)^2 = (-4)^2 + (-3)^2 + 3^2 + 4^2$$
$$= 16 + 9 + 9 + 16 = \mathbf{50.0}$$

**Step 2 ⚡: WCSS for $k = 2$ (Clusters: ${1, 2}$ and ${8, 9}$)**
- Centroid 1: $μ_1 = \frac{1+2}{2} = 1.5$. Sum of squares: $(1-1.5)^2 + (2-1.5)^2 = 0.25 + 0.25 = 0.5$
- Centroid 2: $μ_2 = \frac{8+9}{2} = 8.5$. Sum of squares: $(8-8.5)^2 + (9-8.5)^2 = 0.25 + 0.25 = 0.5$
$$WCSS_2 = 0.5 + 0.5 = \mathbf{1.0}$$

**Step 3 🎯: The Elbow Point**
Going from $k=1$ to $k=2$ drops WCSS dramatically from **$50.0$ down to $1.0$ (a 98% drop)**!
Further increasing $k=3$ only drops WCSS from $1.0$ to $0.5$ (insignificant gain).
Therefore, the distinct "Elbow" occurs at $\mathbf{k = 2}$!


🎯 $WCSS_1 = 50.0$, $WCSS_2 = 1.0$ $⇒$ Sharp bend at $\mathbf{k = 2}$ represents the optimal cluster count.