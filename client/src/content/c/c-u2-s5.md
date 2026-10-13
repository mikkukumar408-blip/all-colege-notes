### 1. Decision-Making & Switch Fall-Through Mechanics

In C `switch(expression)`, the expression must evaluate to an integral or character constant. Omitting the `break;` statement causes **Fall-Through**, where control cascades sequentially into subsequent cases:

```c
switch (grade) {
    case 'A': printf("Excellent "); // Omitting break causes fall-through!
    case 'B': printf("Good ");      // Executes if grade is 'A' OR 'B'!
              break;
    default:  printf("Average");
}
```

---

### 2. Looping Lifecycles & Jump Statements

| Loop Construct | Control Type | Minimum Iterations | Best Suited For |
| :--- | :--- | :--- | :--- |
| **`for` Loop** | Entry-Controlled (Condition evaluated before body) | 0 times | Deterministic iterations with known step bounds. |
| **`while` Loop** | Entry-Controlled (Condition evaluated before body) | 0 times | Event-driven loops where termination depends on runtime state. |
| **`do-while` Loop** | **Exit-Controlled** (Condition evaluated after body) | **1 time** | Interactive menu loops requiring at least one display pass. |

<div class="circuit-diagram-card flowchart-card" style="background:#0b1329; border:1.5px solid #0284c7; border-radius:12px; padding:16px; margin:20px 0;">
  <svg class="circuit-svg flowchart-svg" viewBox="0 0 720 380" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="loop-arr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8" />
      </marker>
      <marker id="loop-arr-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
      </marker>
      <marker id="loop-arr-rose" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f43f5e" />
      </marker>
    </defs>
    
    <rect x="5" y="5" width="710" height="370" rx="12" fill="rgba(15,23,42,0.7)" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="4 4" />
    <text x="360" y="28" text-anchor="middle" fill="#38bdf8" font-size="13" font-weight="bold" letter-spacing="1">ANSI ARCHITECTURAL FLOWCHART: WHILE LOOP (ENTRY-CONTROLLED) VS DO-WHILE (EXIT-CONTROLLED)</text>

    <!-- LEFT PANEL: WHILE LOOP -->
    <rect x="25" y="45" width="325" height="315" rx="8" fill="rgba(56,189,248,0.04)" stroke="#38bdf8" stroke-width="1.2" />
    <text x="187" y="68" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="bold">1. WHILE LOOP (PRE-TEST / ENTRY)</text>

    <!-- Start Entry -->
    <rect x="142" y="85" width="90" height="24" rx="12" fill="rgba(16,185,129,0.2)" stroke="#10b981" stroke-width="1.8" />
    <text x="187" y="101" text-anchor="middle" fill="#86efac" font-size="10" font-weight="bold">START / ENTRY</text>
    
    <line x1="187" y1="109" x2="187" y2="135" stroke="#38bdf8" stroke-width="2" marker-end="url(#loop-arr)" />

    <!-- Decision: Condition True? -->
    <polygon points="187,135 247,157 187,179 127,157" fill="rgba(245,158,11,0.18)" stroke="#f59e0b" stroke-width="2" />
    <text x="187" y="161" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">Condition True?</text>

    <!-- TRUE: Body -->
    <line x1="187" y1="179" x2="187" y2="215" stroke="#10b981" stroke-width="2" marker-end="url(#loop-arr-green)" />
    <text x="195" y="200" fill="#86efac" font-size="10" font-weight="bold">TRUE</text>

    <rect x="117" y="215" width="140" height="34" rx="6" fill="rgba(56,189,248,0.18)" stroke="#38bdf8" stroke-width="1.8" />
    <text x="187" y="235" text-anchor="middle" fill="#e0f2fe" font-size="11" font-weight="bold">Loop Body Statement(s)</text>

    <!-- Loopback to Condition -->
    <line x1="117" y1="232" x2="65" y2="232" stroke="#10b981" stroke-width="2" />
    <line x1="65" y1="232" x2="65" y2="122" stroke="#10b981" stroke-width="2" />
    <line x1="65" y1="122" x2="187" y2="122" stroke="#10b981" stroke-width="2" />
    <line x1="187" y1="122" x2="187" y2="135" stroke="#10b981" stroke-width="2" marker-end="url(#loop-arr-green)" />
    <text x="85" y="180" fill="#86efac" font-size="9" font-style="italic">Re-evaluate</text>

    <!-- FALSE: Exit -->
    <line x1="247" y1="157" x2="300" y2="157" stroke="#f43f5e" stroke-width="2" />
    <line x1="300" y1="157" x2="300" y2="280" stroke="#f43f5e" stroke-width="2" />
    <line x1="300" y1="280" x2="237" y2="280" stroke="#f43f5e" stroke-width="2" marker-end="url(#loop-arr-rose)" />
    <text x="255" y="150" fill="#fda4af" font-size="10" font-weight="bold">FALSE</text>

    <!-- Next Statement -->
    <rect x="127" y="265" width="110" height="28" rx="6" fill="rgba(148,163,184,0.15)" stroke="#94a3b8" stroke-width="1.5" />
    <text x="182" y="283" text-anchor="middle" fill="#cbd5e1" font-size="10" font-weight="bold">Next Statement</text>
    
    <text x="187" y="320" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="bold">★ Minimum Executions: 0 Times</text>
    <text x="187" y="338" text-anchor="middle" fill="#94a3b8" font-size="9" font-style="italic">If condition is initially false, body is NEVER entered.</text>


    <!-- RIGHT PANEL: DO-WHILE LOOP -->
    <rect x="370" y="45" width="325" height="315" rx="8" fill="rgba(168,85,247,0.04)" stroke="#a855f7" stroke-width="1.2" />
    <text x="532" y="68" text-anchor="middle" fill="#c084fc" font-size="12" font-weight="bold">2. DO-WHILE LOOP (POST-TEST / EXIT)</text>

    <!-- Start Entry -->
    <rect x="487" y="85" width="90" height="24" rx="12" fill="rgba(16,185,129,0.2)" stroke="#10b981" stroke-width="1.8" />
    <text x="532" y="101" text-anchor="middle" fill="#86efac" font-size="10" font-weight="bold">START / ENTRY</text>
    
    <line x1="532" y1="109" x2="532" y2="135" stroke="#a855f7" stroke-width="2" marker-end="url(#loop-arr)" />

    <!-- Body FIRST -->
    <rect x="462" y="135" width="140" height="34" rx="6" fill="rgba(168,85,247,0.18)" stroke="#a855f7" stroke-width="1.8" />
    <text x="532" y="155" text-anchor="middle" fill="#f3e8ff" font-size="11" font-weight="bold">Loop Body Statement(s)</text>

    <line x1="532" y1="169" x2="532" y2="200" stroke="#a855f7" stroke-width="2" marker-end="url(#loop-arr)" />

    <!-- Decision: Condition True? (Evaluated at End) -->
    <polygon points="532,200 592,222 532,244 472,222" fill="rgba(245,158,11,0.18)" stroke="#f59e0b" stroke-width="2" />
    <text x="532" y="226" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">Condition True?</text>

    <!-- TRUE: Loop Back UP to Body -->
    <line x1="472" y1="222" x2="415" y2="222" stroke="#10b981" stroke-width="2" />
    <line x1="415" y1="222" x2="415" y2="152" stroke="#10b981" stroke-width="2" />
    <line x1="415" y1="152" x2="462" y2="152" stroke="#10b981" stroke-width="2" marker-end="url(#loop-arr-green)" />
    <text x="440" y="215" fill="#86efac" font-size="10" font-weight="bold">TRUE</text>
    <text x="425" y="185" fill="#86efac" font-size="9" font-style="italic">Repeat</text>

    <!-- FALSE: Exit -->
    <line x1="532" y1="244" x2="532" y2="275" stroke="#f43f5e" stroke-width="2" marker-end="url(#loop-arr-rose)" />
    <text x="542" y="260" fill="#fda4af" font-size="10" font-weight="bold">FALSE</text>

    <!-- Next Statement -->
    <rect x="477" y="275" width="110" height="28" rx="6" fill="rgba(148,163,184,0.15)" stroke="#94a3b8" stroke-width="1.5" />
    <text x="532" y="293" text-anchor="middle" fill="#cbd5e1" font-size="10" font-weight="bold">Next Statement</text>
    
    <text x="532" y="320" text-anchor="middle" fill="#c084fc" font-size="10" font-weight="bold">★ Minimum Executions: Strictly 1 Time</text>
    <text x="532" y="338" text-anchor="middle" fill="#94a3b8" font-size="9" font-style="italic">Even if condition is immediately false, body executes once.</text>
  </svg>
  <div class="circuit-diagram-caption" style="text-align:center; font-size:10pt; font-weight:bold; color:#a855f7; margin-top:8px;">
    Fig 2.1: Architectural Control-Flow Comparison: Pre-Tested While Loop vs Post-Tested Do-While Loop
  </div>
</div>

**Jump Statements:**
- `break;`: Instantly aborts the innermost enclosing loop or switch block.
- `continue;`: Skips the remaining statements of the current pass and jumps directly to the loop update expression (`i++`).
- `goto label;`: Unconditional jump directly to a labeled statement. Strongly discouraged in structured programming.