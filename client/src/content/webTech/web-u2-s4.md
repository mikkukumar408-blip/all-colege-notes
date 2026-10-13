### 1. Hyperlinks (<a> Anchor Tag)

The anchor tag enables hypermedia navigation across the web:

```html
<!-- 1. External link opening securely in a new browser tab -->
<a href="https://www.w3.org" target="_blank" rel="noopener noreferrer">Visit W3C Official</a>

<!-- 2. Internal bookmark anchor jump -->
<a href="#unit4-css">Jump directly to Unit IV Notes</a>

<!-- 3. Email and Telephone protocols -->
<a href="mailto:contact@mmumullana.org">Email University</a>
<a href="tel:+911731274475">Call Office</a>
```

> 🚨 **Security Pitfall (`rel="noopener noreferrer"`):**
> When using `target="_blank"`, always include `rel="noopener noreferrer"` to prevent the opened page from accessing `window.opener`, protecting against reverse tab-nabbing security exploits.

---

### 2. Client-Side Image Mapping (<map> and <area>)

Client-side image mapping links distinct geometric coordinate regions within a single image to different destination URLs:

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 680 175" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="670" height="165" rx="12" class="schematic-bg" fill="rgba(15,23,42,0.75)" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5 4" />
    <text x="340" y="24" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="bold" letter-spacing="1">HTML CLIENT-SIDE IMAGE MAP (&lt;area&gt;) COORDINATE GEOMETRIES</text>
    <!-- 1. Rectangle -->
    <rect x="25" y="38" width="195" height="118" rx="8" fill="#0f172a" stroke="#60a5fa" stroke-width="1.5" />
    <text x="122" y="55" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">1. shape="rect"</text>
    <rect x="65" y="70" width="115" height="52" fill="rgba(30,58,138,0.65)" stroke="#38bdf8" stroke-width="2" />
    <circle cx="65" cy="70" r="3.5" fill="#fde047" />
    <text x="65" y="65" text-anchor="middle" fill="#fde047" font-size="9.5">(x1, y1)</text>
    <circle cx="180" cy="122" r="3.5" fill="#fde047" />
    <text x="180" y="135" text-anchor="middle" fill="#fde047" font-size="9.5">(x2, y2)</text>
    <text x="122" y="149" text-anchor="middle" fill="#bae6fd" font-size="9.5">coords="x1, y1, x2, y2"</text>
    <!-- 2. Circle -->
    <rect x="242" y="38" width="195" height="118" rx="8" fill="#0f172a" stroke="#34d399" stroke-width="1.5" />
    <text x="340" y="55" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">2. shape="circle"</text>
    <circle cx="340" cy="98" r="32" fill="rgba(6,78,59,0.65)" stroke="#34d399" stroke-width="2" />
    <circle cx="340" cy="98" r="3.5" fill="#fde047" />
    <line x1="340" y1="98" x2="372" y2="98" stroke="#fde047" stroke-width="1.6" />
    <text x="356" y="92" text-anchor="middle" fill="#fde047" font-size="9.5">r</text>
    <text x="322" y="102" text-anchor="end" fill="#ffffff" font-size="9">(cx,cy)</text>
    <text x="340" y="149" text-anchor="middle" fill="#a7f3d0" font-size="9.5">coords="cx, cy, radius"</text>
    <!-- 3. Polygon -->
    <rect x="460" y="38" width="195" height="118" rx="8" fill="#0f172a" stroke="#c084fc" stroke-width="1.5" />
    <text x="557" y="55" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">3. shape="poly"</text>
    <polygon points="557,66 602,92 582,128 532,128 512,92" fill="rgba(88,28,135,0.65)" stroke="#c084fc" stroke-width="2" />
    <circle cx="557" cy="66" r="3" fill="#fde047" />
    <circle cx="602" cy="92" r="3" fill="#fde047" />
    <circle cx="582" cy="128" r="3" fill="#fde047" />
    <circle cx="532" cy="128" r="3" fill="#fde047" />
    <circle cx="512" cy="92" r="3" fill="#fde047" />
    <text x="557" y="149" text-anchor="middle" fill="#e9d5ff" font-size="9.5">coords="x1,y1, x2,y2, x3,y3..."</text>
  </svg>
</div>

```html
<img src="motherboard.jpg" usemap="#boardmap" alt="Computer Motherboard">
<map name="boardmap">
  <area shape="rect" coords="20,20,180,180" href="cpu.html" alt="CPU Socket Details">
  <area shape="circle" coords="250,150,45" href="cmos.html" alt="CMOS Battery Info">
  <area shape="poly" coords="300,50,380,50,380,120,300,120" href="ram.html" alt="RAM Slots">
</map>
```

---

### 3. Frames vs. Modern IFrames

- **Legacy `<frameset>` & `<frame>` Deprecation:** In HTML4, `<frameset>` replaced the document `<body>` to partition the browser window into multiple independent HTML pages. This broke browser bookmarking, back buttons, printing, and search engine crawling, and was **completely removed from HTML5**.
- **Modern `<iframe>` (Inline Frame):** Embeds an independent browsing context seamlessly inside the standard HTML5 document body:

```html
<iframe
  src="https://www.google.com/maps/embed?..."
  width="100%"
  height="250"
  style="border:0;"
  sandbox="allow-scripts allow-same-origin"
  loading="lazy"
  title="MMU Campus Location">
</iframe>
```
> 🔒 **The `sandbox` Attribute:** Restricts scripts, form submissions, and popups inside the embedded iframe, mitigating clickjacking and malicious script execution.