### University Examination Solved Questions (Unit I)

The following questions feature diagrams in **both the question statement and the step-by-step solution**:

<example level="easy" title="Section A (1 Mark): Root Name Server Purpose in DNS">
**University Question (1 Mark):**
State the primary purpose of the Root Name Server in the DNS resolution hierarchy shown in Figure Q1.

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 640 130" width="100%" style="height:auto;" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="630" height="120" rx="8" fill="rgba(15,23,42,0.6)" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4 4" />
    <text x="320" y="24" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="bold">FIGURE Q1: GIVEN HIERARCHICAL DNS RESOLUTION TREE</text>
    
    <rect x="30" y="45" width="140" height="40" rx="4" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" stroke-width="1.5" />
    <text x="100" y="70" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="bold">Root (.) Nameserver</text>
    
    <path d="M 170 65 L 240 65" stroke="#38bdf8" stroke-width="2" marker-end="url(#arr)" />
    <text x="205" y="58" text-anchor="middle" fill="#94a3b8" font-size="9">Points to</text>
    
    <rect x="240" y="45" width="150" height="40" rx="4" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" stroke-width="1.5" />
    <text x="315" y="70" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="bold">TLD (.org/.in) Server</text>
    
    <path d="M 390 65 L 460 65" stroke="#38bdf8" stroke-width="2" marker-end="url(#arr)" />
    <text x="425" y="58" text-anchor="middle" fill="#94a3b8" font-size="9">Points to</text>
    
    <rect x="460" y="45" width="150" height="40" rx="4" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1.5" />
    <text x="535" y="70" text-anchor="middle" fill="#10b981" font-size="11" font-weight="bold">Authoritative DNS</text>
    
    <text x="320" y="108" text-anchor="middle" fill="#e2e8f0" font-size="10">Question Focus: What specific function does the Root (.) perform when querying "mmumullana.org"?</text>
  </svg>
  <div class="circuit-diagram-caption">Fig Q1: Hierarchical Domain Name System Nameserver Query Tree</div>
</div>

---

**Step-by-Step Solution:**
The **Root Name Server (`.`)** stands at the apex of the global DNS namespace. It does not contain end-user host IPs; instead, it parses the Top-Level Domain suffix (e.g. `.org`) and returns the IP address of the designated **TLD Nameserver** to the recursive resolver.

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 640 120" width="100%" style="height:auto;" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="630" height="110" rx="8" fill="rgba(15,23,42,0.6)" stroke="#10b981" stroke-width="1.2" stroke-dasharray="4 4" />
    <text x="320" y="24" text-anchor="middle" fill="#10b981" font-size="11" font-weight="bold">FIGURE S1: SOLVED REDIRECTION VECTOR</text>
    
    <rect x="40" y="45" width="160" height="40" rx="4" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" stroke-width="1.5" />
    <text x="120" y="65" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="bold">Query: mmumullana.org</text>
    <text x="120" y="78" text-anchor="middle" fill="#94a3b8" font-size="8.5">Sent to Root (.)</text>

    <path d="M 200 65 L 290 65" stroke="#10b981" stroke-width="2.5" />
    
    <rect x="290" y="40" width="310" height="50" rx="4" fill="rgba(16,185,129,0.2)" stroke="#10b981" stroke-width="1.5" />
    <text x="445" y="62" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold">Root Action: Evaluates suffix ".org"</text>
    <text x="445" y="78" text-anchor="middle" fill="#a7f3d0" font-size="8.2">Returns: Delegated IPs for .org TLD Cluster ➔ Query Continues ✓</text>
  </svg>
  <div class="circuit-diagram-caption">Fig S1: Solved Root Server Referral Mechanism</div>
</div>

<div class="example-answer-box">
🎯 Root Name Server reads domain TLD (`.org`) and refers resolver to TLD Authoritative Cluster.
</div>
</example>

<example level="medium" title="Section B (2 Marks): TCP 3-Way Handshake Timing Sequence">
**University Question (2 Marks):**
Illustrate the 3-way handshake connection sequence between a client browser and an Apache web server.

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 640 140" width="100%" style="height:auto;" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="630" height="130" rx="8" fill="rgba(15,23,42,0.6)" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4 4" />
    <text x="320" y="24" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="bold">FIGURE Q5: ENDPOINT INITIAL STATES</text>
    <rect x="40" y="45" width="180" height="55" rx="5" fill="rgba(56,189,248,0.12)" stroke="#38bdf8" stroke-width="1.5" />
    <text x="130" y="68" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="bold">Client Browser</text>
    <text x="130" y="85" text-anchor="middle" fill="#94a3b8" font-size="9">Socket State: CLOSED</text>
    
    <text x="320" y="78" text-anchor="middle" fill="#fbbf24" font-size="14" font-weight="bold">⚡ Handshake ?</text>
    
    <rect x="420" y="45" width="180" height="55" rx="5" fill="rgba(16,185,129,0.12)" stroke="#10b981" stroke-width="1.5" />
    <text x="510" y="68" text-anchor="middle" fill="#10b981" font-size="11" font-weight="bold">Web Server</text>
    <text x="510" y="85" text-anchor="middle" fill="#94a3b8" font-size="9">Socket State: LISTEN (Port 80/443)</text>
  </svg>
  <div class="circuit-diagram-caption">Fig Q5: Client-Server Socket Initial Endpoints</div>
</div>

---

**Step-by-Step Solution:**
1. **SYN:** Client sends initial sequence number $x$ with `SYN` flag set.
2. **SYN-ACK:** Server responds with `SYN` (ISN $y$) and `ACK = x + 1`.
3. **ACK:** Client confirms with `ACK = y + 1`. Connection established!

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 640 170" width="100%" style="height:auto;" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="630" height="160" rx="8" fill="rgba(15,23,42,0.6)" stroke="#10b981" stroke-width="1.2" stroke-dasharray="4 4" />
    <text x="320" y="24" text-anchor="middle" fill="#10b981" font-size="11" font-weight="bold">FIGURE S5: SOLVED TCP 3-WAY HANDSHAKE FLOW</text>
    
    <line x1="120" y1="45" x2="120" y2="145" stroke="#38bdf8" stroke-width="2" />
    <text x="120" y="40" text-anchor="middle" fill="#38bdf8" font-size="10" font-weight="bold">Client</text>
    
    <line x1="520" y1="45" x2="520" y2="145" stroke="#10b981" stroke-width="2" />
    <text x="520" y="40" text-anchor="middle" fill="#10b981" font-size="10" font-weight="bold">Server</text>
    
    <!-- Step 1 SYN -->
    <line x1="120" y1="65" x2="520" y2="85" stroke="#38bdf8" stroke-width="2" />
    <text x="320" y="70" text-anchor="middle" fill="#38bdf8" font-size="9.5" font-weight="bold">1. SYN (seq = x) ──────▶</text>
    
    <!-- Step 2 SYN-ACK -->
    <line x1="520" y1="95" x2="120" y2="115" stroke="#f59e0b" stroke-width="2" />
    <text x="320" y="100" text-anchor="middle" fill="#fbbf24" font-size="9.5" font-weight="bold">◀────── 2. SYN-ACK (seq = y, ack = x + 1)</text>
    
    <!-- Step 3 ACK -->
    <line x1="120" y1="125" x2="520" y2="140" stroke="#10b981" stroke-width="2" />
    <text x="320" y="130" text-anchor="middle" fill="#86efac" font-size="9.5" font-weight="bold">3. ACK (ack = y + 1) + HTTP GET ──────▶</text>
  </svg>
  <div class="circuit-diagram-caption">Fig S5: Solved 3-Way Handshake Connection Sequence</div>
</div>

<div class="example-answer-box">
🎯 Handshake completes in 3 steps: SYN ➔ SYN-ACK ➔ ACK, transitioning sockets to ESTABLISHED state.
</div>
</example>