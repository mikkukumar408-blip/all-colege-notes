### University Examination Solved Questions (Unit III)

<example level="easy" title="Section A (1 Mark): LocalStorage vs SessionStorage Lifetimes">
**University Question (1 Mark):**
Differentiate the persistence lifetime of localStorage vs. sessionStorage as illustrated in Figure Q3.

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 640 130" width="100%" style="height:auto;" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="630" height="120" rx="8" fill="rgba(15,23,42,0.6)" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4 4" />
    <text x="320" y="24" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="bold">FIGURE Q3: CLIENT STORAGE PERSISTENCE BRANCHES</text>
    
    <rect x="50" y="45" width="150" height="40" rx="4" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" stroke-width="1.5" />
    <text x="125" y="70" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="bold">Client Data Stored</text>
    
    <path d="M 200 55 L 300 45" stroke="#f43f5e" stroke-width="2" />
    <text x="240" y="44" fill="#f43f5e" font-size="9">Tab Closes</text>
    <rect x="300" y="30" width="280" height="30" rx="4" fill="rgba(244,63,94,0.15)" stroke="#f43f5e" stroke-width="1.5" />
    <text x="440" y="50" text-anchor="middle" fill="#fda4af" font-size="10" font-weight="bold">sessionStorage ➔ Cleared Immediately!</text>
    
    <path d="M 200 75 L 300 85" stroke="#10b981" stroke-width="2" />
    <text x="240" y="92" fill="#10b981" font-size="9">OS Restarts</text>
    <rect x="300" y="70" width="280" height="30" rx="4" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1.5" />
    <text x="440" y="90" text-anchor="middle" fill="#86efac" font-size="10" font-weight="bold">localStorage ➔ Persists Indefinitely!</text>
  </svg>
  <div class="circuit-diagram-caption">Fig Q3: Storage Decision Lifecycle Paths</div>
</div>

---

**Step-by-Step Solution:**
- **`localStorage`:** Persists across browser sessions and computer reboots until explicitly cleared by the user or script (`localStorage.clear()`).
- **`sessionStorage`:** Confined to the lifespan of the specific browser tab; automatically purged upon tab closure.

<div class="example-answer-box">
🎯 `sessionStorage` = Tab Lifetime (Temporary) | `localStorage` = Permanent (Across Restarts).
</div>
</example>

<example level="hard" title="Section D (6 Marks): Dynamic Canvas Bar Chart Implementation">
**University Question (6 Marks):**
Develop complete JavaScript and HTML5 code to draw a dynamic comparison bar chart with three subject scores on a `<canvas>` as shown in Figure Q15.

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 640 180" width="100%" style="height:auto;" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="630" height="170" rx="8" fill="rgba(15,23,42,0.6)" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4 4" />
    <text x="320" y="15" text-anchor="middle" fill="#38bdf8" font-size="10.5" font-weight="bold">FIGURE Q15: CANVAS ACADEMIC BAR CHART TARGET</text>
    
    <!-- Baseline Axis -->
    <line x1="60" y1="130" x2="580" y2="130" stroke="#94a3b8" stroke-width="2" />
    <text x="40" y="134" text-anchor="end" fill="#94a3b8" font-size="10">Baseline</text>
    
    <!-- Bar 1: Math-I 85% -->
    <rect x="120" y="45" width="60" height="85" fill="#0284c7" />
    <text x="150" y="38" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="bold">85%</text>
    <text x="150" y="148" text-anchor="middle" fill="#e2e8f0" font-size="10">Math-I</text>
    
    <!-- Bar 2: BEEE 90% -->
    <rect x="270" y="40" width="60" height="90" fill="#10b981" />
    <text x="300" y="33" text-anchor="middle" fill="#86efac" font-size="10" font-weight="bold">90%</text>
    <text x="300" y="148" text-anchor="middle" fill="#e2e8f0" font-size="10">BEEE</text>
    
    <!-- Bar 3: WebTech 95% -->
    <rect x="420" y="35" width="60" height="95" fill="#7c3aed" />
    <text x="450" y="28" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="bold">95%</text>
    <text x="450" y="148" text-anchor="middle" fill="#e2e8f0" font-size="10">WebTech</text>
  </svg>
  <div class="circuit-diagram-caption">Fig Q15: Procedural Canvas Raster Visualization Target</div>
</div>

---

**Step-by-Step Solution:**
```html
<canvas id="chart" width="450" height="200" style="background:#f8fafc; border:1px solid #cbd5e1;"></canvas>
<script>
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");

  const subjects = [
    { name: "Math-I", marks: 85, color: "#0284c7" },
    { name: "BEEE", marks: 90, color: "#10b981" },
    { name: "WebTech", marks: 95, color: "#7c3aed" }
  ];

  const startX = 60;
  const barWidth = 60;
  const gap = 50;
  const baselineY = 150;

  // Draw Baseline Axis
  ctx.beginPath();
  ctx.moveTo(30, baselineY);
  ctx.lineTo(420, baselineY);
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw Bars & Labels
  subjects.forEach((sub, i) => {
    const x = startX + i * (barWidth + gap);
    const barHeight = sub.marks * 1.1;
    const y = baselineY - barHeight;

    // Bar Fill
    ctx.fillStyle = sub.color;
    ctx.fillRect(x, y, barWidth, barHeight);

    // Score Text
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(sub.marks + "%", x + barWidth / 2, y - 6);

    // Subject Name Text
    ctx.font = "600 11px sans-serif";
    ctx.fillStyle = "#334155";
    ctx.fillText(sub.name, x + barWidth / 2, baselineY + 18);
  });
</script>
```

<div class="example-answer-box">
🎯 Complete script renders baseline axis, scaled dynamic bars, and dual centered text annotations.
</div>
</example>