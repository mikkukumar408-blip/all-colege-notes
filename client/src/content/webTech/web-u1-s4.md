### 1. Search Engine Subsystems & Inverted Indexing

Modern web search engines process billions of documents via a 4-phase pipeline:

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 680 265" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="se-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
      </marker>
    </defs>
    <rect x="5" y="5" width="670" height="255" rx="12" class="schematic-bg" fill="rgba(15,23,42,0.75)" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5 4" />
    <text x="340" y="24" text-anchor="middle" fill="#38bdf8" font-size="12" font-weight="bold" letter-spacing="1">4-PHASE WEB SEARCH ENGINE INDEXING &amp; RANKING PIPELINE</text>
    <!-- Phase 1 -->
    <rect x="45" y="34" width="590" height="44" rx="8" fill="rgba(30,58,138,0.85)" stroke="#60a5fa" stroke-width="1.8" />
    <text x="340" y="52" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">PHASE 1: WEB CRAWLERS (SPIDERS / BOTS)</text>
    <text x="340" y="68" text-anchor="middle" fill="#bae6fd" font-size="10">Traverses hyperlink graph recursively • Respects robots.txt &amp; sitemaps</text>
    <line x1="340" y1="78" x2="340" y2="90" stroke="#38bdf8" stroke-width="2" marker-end="url(#se-arr)" />
    <!-- Phase 2 -->
    <rect x="45" y="92" width="590" height="44" rx="8" fill="rgba(15,118,110,0.85)" stroke="#2dd4bf" stroke-width="1.8" />
    <text x="340" y="110" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">PHASE 2: DOCUMENT PARSER, TOKENIZER &amp; STEMMER</text>
    <text x="340" y="126" text-anchor="middle" fill="#99f6e4" font-size="10">Strips HTML tags • Removes stop-words ("the", "is") • Porter Stemming normalization</text>
    <line x1="340" y1="136" x2="340" y2="148" stroke="#38bdf8" stroke-width="2" marker-end="url(#se-arr)" />
    <!-- Phase 3 -->
    <rect x="45" y="150" width="590" height="46" rx="8" fill="rgba(88,28,135,0.85)" stroke="#c084fc" stroke-width="1.8" />
    <text x="340" y="168" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">PHASE 3: INVERTED INDEX GENERATION (TERM → POSTINGS LIST)</text>
    <text x="340" y="185" text-anchor="middle" fill="#e9d5ff" font-size="10">"html" → [Doc 101, 104, 209]   •   "css" → [Doc 104, 312]   •   "mmu" → [Doc 101, 418]</text>
    <line x1="340" y1="196" x2="340" y2="208" stroke="#38bdf8" stroke-width="2" marker-end="url(#se-arr)" />
    <!-- Phase 4 -->
    <rect x="45" y="210" width="590" height="42" rx="8" fill="rgba(6,78,59,0.9)" stroke="#34d399" stroke-width="2" />
    <text x="340" y="228" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="bold">PHASE 4: QUERY RANKING ENGINE (TF-IDF + PAGERANK AUTHORITY)</text>
    <text x="340" y="244" text-anchor="middle" fill="#a7f3d0" font-size="10">Scores relevance &amp; link eigenvector centrality → Returns SERP in &lt; 100 ms</text>
  </svg>
</div>

---

### 2. Web-Casting Techniques: Push vs. Pull & Unicast vs. Multicast

- **Pull Technology (Traditional Client-Driven):** The client sends an explicit HTTP request to the server, and the server passively responds with data. If no request is made, no data is delivered.
- **Push Technology (Server-Driven Event Streams):** The server proactively delivers fresh information to the client as soon as new data becomes available without waiting for a new request (e.g. WebSockets, Server-Sent Events, RSS feeds).
- **Unicast Transmission:** A dedicated one-to-one point-to-point transmission stream between the server and a single client. $N$ simultaneous viewers require $N$ times the server bandwidth.
- **Multicast Transmission:** A one-to-many distribution mechanism where the source transmits a single packet stream, and intermediate network routers replicate packets at junction branches to feed multiple simultaneous viewers.