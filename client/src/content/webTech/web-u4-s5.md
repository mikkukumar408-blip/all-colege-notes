### University Examination Solved Questions (Unit IV)

<example level="easy" title="Section A (1 Mark): CSS Specificity Calculation">
**University Question (1 Mark):**
Calculate the total specificity score of the selector shown in Figure Q4: `nav#primary-menu ul.dropdown > li a:hover`.

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 640 120" width="100%" style="height:auto;" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="630" height="110" rx="8" fill="rgba(15,23,42,0.6)" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4 4" />
    <text x="320" y="24" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="bold">FIGURE Q4: SELECTOR COMPONENT MATRIX</text>
    
    <rect x="30" y="45" width="580" height="40" rx="4" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" stroke-width="1.5" />
    <text x="320" y="70" text-anchor="middle" fill="#38bdf8" font-size="12" font-family="monospace">
      nav#primary-menu ul.dropdown &gt; li a:hover
    </text>
  </svg>
  <div class="circuit-diagram-caption">Fig Q4: Compound Selector Specificity Parsing</div>
</div>

---

**Step-by-Step Solution:**
- Inline styles: `0`
- IDs (`#primary-menu`): `1` $\implies 1 \times 100$
- Classes & Pseudo-classes (`.dropdown`, `:hover`): `2` $\implies 2 \times 10$
- Elements / Tags (`nav`, `ul`, `li`, `a`): `4` $\implies 4 \times 1$

$$\mathbf{\text{Specificity} = (0, 1, 2, 4) = 0124}$$

<div class="example-answer-box">
🎯 Specificity Score = **0124** (or 124 points).
</div>
</example>

<example level="medium" title="Section B (2 Marks): CSS Box-Sizing Calculation">
**University Question (2 Marks):**
Calculate the total rendered width of a box with `width: 200px`, `padding: 20px`, and `border: 5px` under: (1) `box-sizing: content-box`, and (2) `box-sizing: border-box`.

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 640 150" width="100%" style="height:auto;" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="630" height="140" rx="8" fill="rgba(15,23,42,0.6)" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4 4" />
    <text x="320" y="24" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="bold">FIGURE Q8: BOX SIZING DIMENSIONAL PARAMETERS</text>
    
    <rect x="40" y="45" width="260" height="75" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" stroke-width="2" />
    <text x="170" y="70" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">content-box (Default)</text>
    <text x="170" y="90" text-anchor="middle" fill="#e2e8f0" font-size="9.5">Width=200 + Pad=40 + Bor=10 = 250px</text>
    
    <rect x="340" y="45" width="260" height="75" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="2" />
    <text x="470" y="70" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold">border-box (Reset)</text>
    <text x="470" y="90" text-anchor="middle" fill="#e2e8f0" font-size="9.5">Width clamped to exact 200px!</text>
  </svg>
  <div class="circuit-diagram-caption">Fig Q8: Box Sizing Model Physical Dimensions</div>
</div>

---

**Step-by-Step Solution:**
1. **`content-box`:** $\text{Total} = 200 + 2(20) + 2(5) = 200 + 40 + 10 = \mathbf{250,\text{px}}$.
2. **`border-box`:** $\text{Total} = \mathbf{200,\text{px}}$ (Content shrinks to $200 - 40 - 10 = 150,\text{px}$).

<div class="example-answer-box">
🎯 content-box: **250px** | border-box: **200px** (Prevents layout overflow).
</div>
</example>