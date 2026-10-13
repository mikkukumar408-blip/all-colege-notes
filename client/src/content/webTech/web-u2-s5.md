### University Examination Solved Questions (Unit II)

<example level="easy" title="Section A (1 Mark): Client-Side Image Map Rectangular Syntax">
**University Question (1 Mark):**
Given the clickable button area shown in Figure Q2, write the exact HTML `<area>` tag.

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 640 140" width="100%" style="height:auto;" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="630" height="130" rx="8" fill="rgba(15,23,42,0.6)" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4 4" />
    <text x="320" y="24" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="bold">FIGURE Q2: IMAGE MAP COORDINATE SYSTEM</text>
    
    <rect x="180" y="45" width="280" height="60" rx="4" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1.5" />
    <circle cx="180" cy="45" r="4" fill="#38bdf8" />
    <text x="175" y="38" text-anchor="end" fill="#38bdf8" font-size="10" font-weight="bold">(x1=20, y1=30)</text>
    
    <circle cx="460" cy="105" r="4" fill="#f43f5e" />
    <text x="465" y="122" text-anchor="start" fill="#f43f5e" font-size="10" font-weight="bold">(x2=150, y2=120)</text>
    
    <text x="320" y="80" text-anchor="middle" fill="#86efac" font-size="12" font-weight="bold">Clickable Target: "info.html"</text>
  </svg>
  <div class="circuit-diagram-caption">Fig Q2: Rectangular Area Bounding Box on Image Surface</div>
</div>

---

**Step-by-Step Solution:**
For `shape="rect"`, coords takes 4 values: `x1, y1, x2, y2`:
```html
<area shape="rect" coords="20,30,150,120" href="info.html" alt="Information Portal">
```

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 640 100" width="100%" style="height:auto;" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="630" height="90" rx="8" fill="rgba(15,23,42,0.6)" stroke="#10b981" stroke-width="1.2" stroke-dasharray="4 4" />
    <text x="320" y="24" text-anchor="middle" fill="#10b981" font-size="11" font-weight="bold">FIGURE S2: AREA ATTRIBUTE MAPPING</text>
    <rect x="60" y="38" width="520" height="38" rx="4" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1.5" />
    <text x="320" y="62" text-anchor="middle" fill="#86efac" font-size="11" font-family="monospace">
      &lt;area shape="rect" coords="20,30,150,120" href="info.html" alt="Info"&gt;
    </text>
  </svg>
  <div class="circuit-diagram-caption">Fig S2: Solved HTML Tag Coordinate Formulation</div>
</div>

<div class="example-answer-box">
🎯 `<area shape="rect" coords="20,30,150,120" href="info.html" alt="Information Portal">`
</div>
</example>

<example level="medium" title="Section C (4 Marks): University Course Schedule Table with Rowspan/Colspan">
**University Question (4 Marks):**
Write standard HTML markup to generate the multi-branch fee schedule table shown in Figure Q10.

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 640 160" width="100%" style="height:auto;" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="630" height="150" rx="8" fill="rgba(15,23,42,0.6)" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4 4" />
    <text x="320" y="24" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="bold">FIGURE Q10: TARGET TABLE LAYOUT WIREFRAME</text>
    
    <rect x="40" y="40" width="160" height="30" fill="#1e293b" stroke="#cbd5e1" />
    <text x="120" y="60" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">Course Code</text>
    
    <rect x="200" y="40" width="240" height="30" fill="#1e293b" stroke="#cbd5e1" />
    <text x="320" y="60" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">Engineering Discipline</text>
    
    <rect x="440" y="40" width="160" height="30" fill="#1e293b" stroke="#cbd5e1" />
    <text x="520" y="60" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">Semester Fee</text>
    
    <!-- Rowspan = 2 -->
    <rect x="40" y="70" width="160" height="50" fill="rgba(56,189,248,0.1)" stroke="#cbd5e1" />
    <text x="120" y="100" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="bold">BCSE-012 (rowspan=2)</text>
    
    <rect x="200" y="70" width="240" height="25" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="320" y="87" text-anchor="middle" fill="#0f172a" font-size="9.5">Computer Science & Engineering</text>
    <rect x="440" y="70" width="160" height="25" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="520" y="87" text-anchor="middle" fill="#0f172a" font-size="9.5">₹75,000</text>
    
    <rect x="200" y="95" width="240" height="25" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="320" y="112" text-anchor="middle" fill="#0f172a" font-size="9.5">Information Technology</text>
    <rect x="440" y="95" width="160" height="25" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="520" y="112" text-anchor="middle" fill="#0f172a" font-size="9.5">₹75,000</text>
    
    <!-- Colspan = 2 -->
    <rect x="40" y="120" width="400" height="25" fill="#f1f5f9" stroke="#cbd5e1" />
    <text x="240" y="137" text-anchor="middle" fill="#334155" font-size="9.5" font-weight="bold">Total Tuition Fee (colspan=2):</text>
    <rect x="440" y="120" width="160" height="25" fill="#f1f5f9" stroke="#cbd5e1" />
    <text x="520" y="137" text-anchor="middle" fill="#059669" font-size="10" font-weight="bold">₹1,50,000</text>
  </svg>
  <div class="circuit-diagram-caption">Fig Q10: Target HTML Table Grid with Rowspan and Colspan Partitions</div>
</div>

---

**Step-by-Step Solution:**
```html
<table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse; width:100%;">
  <thead style="background:#1e293b; color:#fff;">
    <tr>
      <th>Course Code</th>
      <th>Engineering Discipline</th>
      <th>Semester Fee (INR)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2" align="center"><strong>BCSE-012</strong></td>
      <td>Computer Science & Engineering</td>
      <td align="right">&#8377;75,000</td>
    </tr>
    <tr>
      <td>Information Technology</td>
      <td align="right">&#8377;75,000</td>
    </tr>
  </tbody>
  <tfoot style="background:#f1f5f9; font-weight:bold;">
    <tr>
      <td colspan="2" align="right">Total Tuition Fee:</td>
      <td align="right">&#8377;1,50,000</td>
    </tr>
  </tfoot>
</table>
```

<div class="example-answer-box">
🎯 Solution produces valid semantic HTML `<table>`, `<thead>`, `<tbody>`, and `<tfoot>` structure.
</div>
</example>