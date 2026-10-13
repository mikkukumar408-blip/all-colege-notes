### 1. Requirements for Working with Internet & WWW: The 5-Tier DNS Resolution Hierarchy

When a user enters `https://mmumullana.org` into a browser, the hostname must be resolved to a 32-bit IPv4 or 128-bit IPv6 address before TCP connection setup can occur:

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 680 245" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="dns-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
      </marker>
      <marker id="dns-arr-g" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" />
      </marker>
    </defs>
    <rect x="5" y="5" width="670" height="235" rx="12" class="schematic-bg" fill="rgba(15,23,42,0.75)" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5 4" />
    <text x="340" y="24" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="bold" letter-spacing="1">5-TIER RECURSIVE DNS RESOLUTION HIERARCHY (UDP PORT 53)</text>
    <!-- Client Browser -->
    <rect x="25" y="42" width="175" height="44" rx="8" fill="rgba(30,58,138,0.85)" stroke="#60a5fa" stroke-width="1.8" />
    <text x="112" y="61" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">1. Client Browser</text>
    <text x="112" y="77" text-anchor="middle" fill="#bae6fd" font-size="9.5">Checks OS / Hosts Cache</text>
    <!-- Arrow Client -> ISP Resolver -->
    <line x1="112" y1="86" x2="112" y2="128" stroke="#38bdf8" stroke-width="2" marker-end="url(#dns-arr)" />
    <text x="105" y="111" text-anchor="end" fill="#fde047" font-size="9.5" font-weight="bold">Cache Miss</text>
    <!-- ISP Recursive Resolver -->
    <rect x="25" y="130" width="195" height="54" rx="8" fill="rgba(88,28,135,0.85)" stroke="#c084fc" stroke-width="2" />
    <text x="122" y="152" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">2. ISP Recursive Resolver</text>
    <text x="122" y="170" text-anchor="middle" fill="#e9d5ff" font-size="9.5">Iteratively queries DNS hierarchy</text>
    <!-- Right Column: 3 Name Servers -->
    <rect x="405" y="38" width="245" height="42" rx="8" fill="rgba(15,118,110,0.85)" stroke="#2dd4bf" stroke-width="1.6" />
    <text x="527" y="57" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">3. Root Name Server (.)</text>
    <text x="527" y="72" text-anchor="middle" fill="#99f6e4" font-size="9.5">Refers to .org TLD Registry</text>
    <rect x="405" y="96" width="245" height="42" rx="8" fill="rgba(124,45,18,0.85)" stroke="#fb923c" stroke-width="1.6" />
    <text x="527" y="115" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">4. TLD Name Server (.org)</text>
    <text x="527" y="130" text-anchor="middle" fill="#fed7aa" font-size="9.5">Refers to Authoritative NS</text>
    <rect x="405" y="154" width="245" height="42" rx="8" fill="rgba(6,78,59,0.9)" stroke="#34d399" stroke-width="1.8" />
    <text x="527" y="173" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">5. Authoritative DNS Server</text>
    <text x="527" y="188" text-anchor="middle" fill="#a7f3d0" font-size="9.5">Returns A-Record: 104.21.48.12</text>
    <!-- Connecting Query Arrows -->
    <line x1="220" y1="142" x2="402" y2="62" stroke="#38bdf8" stroke-width="1.6" marker-end="url(#dns-arr)" />
    <line x1="220" y1="156" x2="402" y2="117" stroke="#38bdf8" stroke-width="1.6" marker-end="url(#dns-arr)" />
    <line x1="220" y1="170" x2="402" y2="175" stroke="#34d399" stroke-width="2" marker-end="url(#dns-arr-g)" />
    <!-- Final TCP Connect Banner -->
    <rect x="25" y="202" width="625" height="28" rx="6" fill="#0f172a" stroke="#34d399" stroke-width="1.5" />
    <text x="337" y="220" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold">✓ Resolver Caches IP &amp; Returns to Browser → Browser Opens TCP/TLS Socket to 104.21.48.12:443</text>
  </svg>
</div>

> 📌 **Key Architectural Distinction:**
> - **Recursive Resolver:** The server that performs the legwork of querying other nameservers on behalf of the client.
> - **Authoritative DNS:** The final authoritative source holding the actual DNS zone record (`A`, `AAAA`, `CNAME`, `MX`) mapped to that domain.

---

### 2. Internal Subsystems of a Modern Web Browser

A web browser is a multi-process software application composed of distinct subsystems:

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 680 265" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="br-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
      </marker>
    </defs>
    <rect x="5" y="5" width="670" height="255" rx="12" class="schematic-bg" fill="rgba(15,23,42,0.75)" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5 4" />
    <text x="340" y="24" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="bold" letter-spacing="1">INTERNAL SUBSYSTEM ARCHITECTURE OF A MODERN WEB BROWSER</text>
    <!-- 1. User Interface -->
    <rect x="65" y="34" width="550" height="38" rx="8" fill="rgba(30,58,138,0.85)" stroke="#60a5fa" stroke-width="1.8" />
    <text x="340" y="51" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">USER INTERFACE (UI CHROME)</text>
    <text x="340" y="65" text-anchor="middle" fill="#bae6fd" font-size="9.5">Address Bar, Back/Forward Controls, Tab Manager, Bookmarks</text>
    <line x1="340" y1="72" x2="340" y2="86" stroke="#38bdf8" stroke-width="2" marker-end="url(#br-arr)" />
    <!-- 2. Browser Engine -->
    <rect x="65" y="88" width="550" height="36" rx="8" fill="rgba(15,118,110,0.85)" stroke="#2dd4bf" stroke-width="1.8" />
    <text x="340" y="104" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">BROWSER ENGINE</text>
    <text x="340" y="118" text-anchor="middle" fill="#99f6e4" font-size="9.5">Marshals high-level actions between UI and Rendering Engine</text>
    <!-- Split Arrows -->
    <path d="M 340 124 L 340 133 M 195 133 L 485 133 M 195 133 L 195 142 M 485 133 L 485 142" stroke="#38bdf8" stroke-width="1.8" fill="none" />
    <!-- 3A. Rendering Engine -->
    <rect x="65" y="143" width="260" height="54" rx="8" fill="rgba(88,28,135,0.85)" stroke="#c084fc" stroke-width="1.8" />
    <text x="195" y="161" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">RENDERING ENGINE (Blink / Gecko)</text>
    <text x="195" y="176" text-anchor="middle" fill="#e9d5ff" font-size="9.5">HTML → DOM Tree • CSS → CSSOM Tree</text>
    <text x="195" y="190" text-anchor="middle" fill="#d8b4fe" font-size="9.5">Render Tree Layout &amp; GPU Raster Paint</text>
    <!-- 3B. JS Engine -->
    <rect x="355" y="143" width="260" height="54" rx="8" fill="rgba(124,45,18,0.85)" stroke="#fb923c" stroke-width="1.8" />
    <text x="485" y="161" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">JAVASCRIPT ENGINE (V8 / SpiderMonkey)</text>
    <text x="485" y="176" text-anchor="middle" fill="#fed7aa" font-size="9.5">JIT Compiles JS to Machine Bytecode</text>
    <text x="485" y="190" text-anchor="middle" fill="#fdba74" font-size="9.5">Manages Call Stack, Heap &amp; Event Loop</text>
    <!-- Bottom Row: Networking & Storage -->
    <rect x="65" y="207" width="260" height="44" rx="8" fill="rgba(6,78,59,0.85)" stroke="#34d399" stroke-width="1.6" />
    <text x="195" y="225" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">NETWORKING SUBSYSTEM</text>
    <text x="195" y="241" text-anchor="middle" fill="#a7f3d0" font-size="9.5">HTTP/HTTPS, TLS, DNS, WebSockets</text>
    <rect x="355" y="207" width="260" height="44" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="1.6" />
    <text x="485" y="225" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">CLIENT DATA PERSISTENCE</text>
    <text x="485" y="241" text-anchor="middle" fill="#bae6fd" font-size="9.5">Cookies, localStorage, IndexedDB, Cache</text>
  </svg>
</div>

---

### 3. Hypertext Transfer Protocol (HTTP) & The 3-Way Handshake

HTTP is an Application Layer, stateless, request-response communication protocol:

$$\text{Client Request}  [\text{Method} + \text{URI} + \text{Headers} + \text{Body}] iff \text{Server Response}  [\text{Status Code} + \text{Headers} + \text{Payload}]$$

#### Standard HTTP Methods:
- **`GET`:** Requests representation of specified resource without server side-effects. Parameters appended to URL query string.
- **`POST`:** Submits data to be processed (e.g. form submissions, file uploads). Data enclosed inside request payload body.
- **`PUT`:** Replaces target resource completely with uploaded payload.
- **`DELETE`:** Requests removal of specified resource from server storage.

#### HTTP Response Status Classifications:
- **1xx (Informational):** `100 Continue`, `101 Switching Protocols`.
- **2xx (Success):** `200 OK`, `201 Created`, `204 No Content`.
- **3xx (Redirection):** `301 Moved Permanently`, `304 Not Modified` (browser cache valid).
- **4xx (Client Error):** `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`.
- **5xx (Server Error):** `500 Internal Server Error`, `502 Bad Gateway`, `503 Service Unavailable`.