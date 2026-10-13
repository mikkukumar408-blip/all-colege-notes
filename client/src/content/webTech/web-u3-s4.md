### 1. The HTML5 <canvas> 2D Context API

The `<canvas>` tag provides an immediate-mode resolution-dependent bitmap surface scriptable via JavaScript:

```html
<canvas id="barChart" width="400" height="180" style="border:1px solid #cbd5e1;"></canvas>
<script>
  const canvas = document.getElementById("barChart");
  const ctx = canvas.getContext("2d");

  // 1. Draw Rectangular Bar
  ctx.fillStyle = "#0284c7";
  ctx.fillRect(40, 50, 50, 100);

  // 2. Draw Second Bar
  ctx.fillStyle = "#10b981";
  ctx.fillRect(120, 30, 50, 120);

  // 3. Draw Circle
  ctx.beginPath();
  ctx.arc(280, 90, 40, 0, 2 * Math.PI);
  ctx.fillStyle = "#f59e0b";
  ctx.fill();
  ctx.stroke();

  // 4. Render Text Label
  ctx.font = "bold 13px Segoe UI, sans-serif";
  ctx.fillStyle = "#0f172a";
  ctx.fillText("Performance Chart", 40, 25);
</script>
```

---

### 2. Client-Side Web Storage: Cookies vs. LocalStorage vs. SessionStorage

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 680 230" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="670" height="220" rx="12" class="schematic-bg" fill="rgba(15,23,42,0.75)" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5 4" />
    <!-- Top Question -->
    <rect x="135" y="16" width="410" height="38" rx="8" fill="rgba(30,58,138,0.9)" stroke="#38bdf8" stroke-width="2" />
    <text x="340" y="39" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="bold">Q1: Is data needed by the server on every HTTP request?</text>
    <path d="M 340 54 L 340 68 M 155 68 L 485 68 M 155 68 L 155 86 M 485 68 L 485 86" stroke="#38bdf8" stroke-width="2" fill="none" />
    <text x="155" y="81" text-anchor="middle" fill="#6ee7b7" font-size="10.5" font-weight="bold">YES</text>
    <text x="485" y="81" text-anchor="middle" fill="#fda4af" font-size="10.5" font-weight="bold">NO (Client-Only)</text>
    <!-- HTTP Cookies -->
    <rect x="40" y="88" width="230" height="62" rx="8" fill="rgba(124,45,18,0.85)" stroke="#fb923c" stroke-width="2" />
    <text x="155" y="109" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">HTTP COOKIES</text>
    <text x="155" y="126" text-anchor="middle" fill="#fed7aa" font-size="10">• Max 4 KB capacity</text>
    <text x="155" y="141" text-anchor="middle" fill="#fed7aa" font-size="10">• Sent on every HTTP Header</text>
    <!-- Second Question -->
    <rect x="330" y="88" width="310" height="42" rx="8" fill="rgba(88,28,135,0.85)" stroke="#c084fc" stroke-width="1.8" />
    <text x="485" y="113" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">Q2: Must data survive tab &amp; browser closure?</text>
    <path d="M 485 130 L 485 144 M 385 144 L 585 144 M 385 144 L 385 160 M 585 144 L 585 160" stroke="#c084fc" stroke-width="1.8" fill="none" />
    <text x="385" y="156" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">YES</text>
    <text x="585" y="156" text-anchor="middle" fill="#fde047" font-size="10" font-weight="bold">NO</text>
    <!-- localStorage -->
    <rect x="295" y="162" width="180" height="54" rx="8" fill="rgba(6,78,59,0.9)" stroke="#34d399" stroke-width="1.8" />
    <text x="385" y="182" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">localStorage</text>
    <text x="385" y="198" text-anchor="middle" fill="#a7f3d0" font-size="9.5">5–10 MB • Permanent Persistence</text>
    <!-- sessionStorage -->
    <rect x="495" y="162" width="165" height="54" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="1.8" />
    <text x="577" y="182" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">sessionStorage</text>
    <text x="577" y="198" text-anchor="middle" fill="#bae6fd" font-size="9.5">5 MB • Single Tab Lifetime</text>
  </svg>
</div>

| Dimension | HTTP Cookies | LocalStorage (HTML5) | SessionStorage (HTML5) |
| :--- | :--- | :--- | :--- |
| **Storage Capacity** | Strictly ~4 Kilobytes | ~5 to 10 Megabytes | ~5 Megabytes |
| **Data Lifetime** | Configurable via `Expires` or `Max-Age` | **Permanent** (persists after browser restart) | **Session-Only** (cleared when browser tab closes) |
| **Network Transmission** | Sent automatically on every HTTP header | **Never sent to server** (Client-only) | **Never sent to server** (Client-only) |
| **Access Scope** | Domain & path scoped | Origin scoped (shared across all tabs) | Tab scoped (isolated to single window) |
| **JavaScript API** | Complex string manipulation (`document.cookie`) | `setItem()`, `getItem()`, `removeItem()` | `setItem()`, `getItem()`, `removeItem()` |