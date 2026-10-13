### 1. Modern Generative AI & Transformer Architecture Deep-Dive

Modern Generative AI (ChatGPT, Google Gemini, Claude) is powered by the **Transformer Architecture** introduced by Vaswani et al. (2017) in the seminal paper *"Attention Is All You Need"*.

#### A. The Scaled Dot-Product Self-Attention Mechanism:
Given input token embeddings packed into Query ($Q$), Key ($K$), and Value ($V$) matrices:
$$\mathbf{\text{Attention}(Q, K, V) = \text{softmax}\left( \frac{Q K^T}{\sqrt{d_k}} \right) V}$$
- **$Q K^T$:** Computes pairwise dot-product alignment affinities between every pair of words in a sentence simultaneously.
- **$\sqrt{d_k}$ Scaling Factor:** Prevents the dot products from growing excessively large for large projection dimensions $d_k$, which would push the softmax function into regions with vanishing gradients.
- **$\text{softmax}(cdot )$:** Normalizes affinities into an attention probability distribution summing to $1.0$.

#### B. Multi-Head Attention (MHA):
Instead of computing attention once, the model projects $Q, K, V$ into $h$ independent representation subspaces:
$$\mathbf{\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, ..., \text{head}_h) W^O}$$
$$\text{where } \text{head}_i = \text{Attention}(Q W_i^Q, K W_i^K, V W_i^V)$$
This allows the network to simultaneously attend to syntax, co-reference, factual associations, and grammar across different attention heads!

---

### 2. The Three-Phase Foundation Model Training Lifecycle

```
    [ 1. SELF-SUPERVISED PRETRAINING ]
    - Trillions of web tokens (Common Crawl, Books, GitHub)
    - Objective: Next-Token Prediction (Causal Language Modeling)
    - Loss: L = -sum log P(wₜ | w yₗ)
    - Optimize policy piₜheta using Proximal Policy Optimization (PPO):
      max E [ rₚhi(x, y) - beta * DKL( piₜheta(y|x) || piᵣef(y|x) ) ]
    - Output: Production AI Assistant (Helpful, Honest, Harmless)
```

---

### 3. Sampling Hyperparameters in Large Language Models

1. **Temperature (T):** Scales raw model logits zᵢ prior to the softmax layer:
   P(wᵢ) = (eᶻ_ⁱ / ᵀ / ∑_j eᶻ_ʲ / ᵀ)
   - **Low T → 0 (Argmax / Greedy):** Sharpens probability distribution toward the single highest-probability token. Produces deterministic, factual, and analytical code outputs.
   - **High T > 1:** Flattens distribution toward a uniform random spread. Encourages diverse, novel, and creative responses.
2. **Top-p (Nucleus Sampling):** Selects only from the smallest set of tokens whose cumulative probability exceeds threshold p (e.g., p = 0.90), dynamically truncating the tail of low-probability words.

---

---


**Problem:**
A tiny language model is trained on a vocabulary of 5 words: `["cat", "dog", "sat", "mat", "ran"]`.
Given context *"The dog"*, the unnormalized model logits are:
`cat`: 0.5, `dog`: -1.0, `sat`: 2.5, `mat`: 0.0, `ran`: $2.0$.
Calculate the probability of the most likely next word using the Softmax function.

---

**Step 1 🚀: Softmax Formula**
$$P(w_i) = \frac{e^{z_i}}{\sum_{j} e^{z_j}}$$

**Step 2 ⚡: Exponentiate Logits**
- $e^{0.5} = 1.649$
- $e^{-1.0} = 0.368$
- $e^{2.5} = 12.182$
- $e^{0.0} = 1.000$
- $e^{2.0} = 7.389$
$$\text{Sum} = 1.649 + 0.368 + 12.182 + 1.000 + 7.389 = \mathbf{22.588}$$

**Step 3 🎯: Most Likely Next Token ("sat")**
$$P(\text{"sat"}) = \frac{12.182}{22.588} = \mathbf{0.5393 = 53.93%}$$
Next token predicted by the model is **"sat"**!


🎯 Selected Token: **"sat"** with probability $\mathbf{P = 53.9%}$.




**University Question (6 Marks):**
In LLM generation, temperature T scales logits: zᵢ' = zᵢ / T.
For logits z₁ = 4.0 and z₂ = 2.0:
1. Calculate probabilities at low temperature T = 0.5 (Deterministic mode).
2. Calculate probabilities at high temperature T = 2.0 (Creative mode).
Explain the physical effect of temperature.

---

**Step 1 🚀: Low Temperature T = 0.5**
- Scaled logits: z₁' = 4.0 / 0.5 = 8.0, ; z₂' = 2.0 / 0.5 = 4.0
- e⁸ = 2980.96, ; e⁴ = 54.60 ⇒ Sum = 3035.56
P₁ = (2980.96 / 3035.56) = 98.2%,      P₂ = (54.60 / 3035.56) = 1.8%
Peak becomes extremely sharp → Model gives predictable, factual answers.

**Step 2 ⚡: High Temperature T = 2.0**
- Scaled logits: z₁' = 4.0 / 2.0 = 2.0, ; z₂' = 2.0 / 2.0 = 1.0
- e² = 7.389, ; e¹ = 2.718 ⇒ Sum = 10.107
P₁ = (7.389 / 10.107) = 73.1%,      P₂ = (2.718 / 10.107) = 26.9%
Distribution flattens out → Alternative creative words have a much higher chance to be selected!


🎯 At $T=0.5$: $P_1 = 98.2%$ (Precise/Cold) | At $T=2.0$: $P_1 = 73.1%, P_2 = 26.9%$ (Diverse/Creative).




**University Question (10 Marks - Modern AI Paper):**
Calculate the scaled dot-product attention score for a query vector Q and key matrix K of dimension dₖ = 4:
Q = [1, , 0, , 1, , 0],      $$K = \begin{bmatrix} 1 & 0 & 1 & 0 \\ 0 & 1 & 0 & 1 \\ 1 & 1 & 0 & 0 \end{bmatrix}$$
Find the attention weight vector A = softmax\left( (Q Kᵀ / √(dₖ)) \right).

---

**Step 1 🚀: Compute Dot Product Q Kᵀ**
- Q · K₁ = (1)(1) + (0)(0) + (1)(1) + (0)(0) = 1 + 1 = 2
- Q · K₂ = (1)(0) + (0)(1) + (1)(0) + (0)(1) = 0
- Q · K₃ = (1)(1) + (0)(1) + (1)(0) + (0)(0) = 1
Q Kᵀ = [2, ; 0, ; 1]

**Step 2 ⚡: Scale by √(dₖ) = √(4) = 2**
(Q Kᵀ / √(dₖ)) = \left[ \frac{2}{2}, ; \frac{0}{2}, ; \frac{1}{2} \right] = [1.0, ; 0.0, ; 0.5]

**Step 3 🎯: Apply Softmax**
- e¹.⁰ = 2.7183
- e⁰.⁰ = 1.0000
- e⁰.⁵ = 1.6487
Sum = 2.7183 + 1.0000 + 1.6487 = 5.367
- A₁ = (2.7183 / 5.367) = 0.506
- A₂ = (1.0000 / 5.367) = 0.186
- A₃ = (1.6487 / 5.367) = 0.307


🎯 Attention Weights: $\mathbf{A = [0.506, ; 0.186, ; 0.307]}$ (Token 1 receives $50.6%$ of attention).