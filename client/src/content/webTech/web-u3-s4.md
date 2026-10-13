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

```
                        [ Client Storage Decision Tree ]
                                       │
                  Is data needed by the web server on every HTTP hit?
                                  /                                      YES /            NO
                                v             v
                       [ HTTP Cookies ]    Does data need to survive
                       • 4KB Max             tab & browser restarts?
                       • Sent on headers          /                                                       YES /             NO
                                                v              v
                                        [ localStorage ]  [ sessionStorage ]
                                        • 5MB–10MB        • 5MB
                                        • Permanent       • Tab lifetime
```

| Dimension | HTTP Cookies | LocalStorage (HTML5) | SessionStorage (HTML5) |
| :--- | :--- | :--- | :--- |
| **Storage Capacity** | Strictly ~4 Kilobytes | ~5 to 10 Megabytes | ~5 Megabytes |
| **Data Lifetime** | Configurable via `Expires` or `Max-Age` | **Permanent** (persists after browser restart) | **Session-Only** (cleared when browser tab closes) |
| **Network Transmission** | Sent automatically on every HTTP header | **Never sent to server** (Client-only) | **Never sent to server** (Client-only) |
| **Access Scope** | Domain & path scoped | Origin scoped (shared across all tabs) | Tab scoped (isolated to single window) |
| **JavaScript API** | Complex string manipulation (`document.cookie`) | `setItem()`, `getItem()`, `removeItem()` | `setItem()`, `getItem()`, `removeItem()` |