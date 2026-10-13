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

```
  [ Coordinates Geometry for Image Maps ]
  
  1. RECTANGLE: coords="x1, y1, x2, y2"
     (x1,y1) Top-Left ──────────┐
          │                     │
          └─────────── (x2,y2) Bottom-Right

  2. CIRCLE: coords="center_x, center_y, radius"
              (cx,cy) ───[radius]───> Perimeter

  3. POLYGON: coords="x1, y1, x2, y2, x3, y3, ..."
     Ordered list of closed vertices connecting the perimeter.
```

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