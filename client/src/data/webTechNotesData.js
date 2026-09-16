/* =========================================================================
   FUNDAMENTALS OF WEB TECHNOLOGIES (BCSE-012) COMPLETE STUDY NOTES
   =========================================================================
   Full MMDU Syllabus Coverage for B.Tech 1st Year (Units 1, 2, 3, and 4)
   Exhaustive Long Notes Edition:
   - Comprehensive theoretical derivations, 12-point comparative matrices
   - Visual vector architectural flowcharts & schematics (DNS, HTTP, SDLC, DOM, Box Model)
   - Solved university examination problems with diagrams in BOTH questions and solutions
   ========================================================================= */

export const webTechSubjectDetails = {
  id: "sub-webtech",
  semester: 1,
  year: "1st Year",
  name: "Fundamentals of Web Technologies",
  code: "BCSE-012",
  credits: 2,
  instructor: "Department of Computer Science & Engineering (MMDU)",
  notesCount: "4 Units Comprehensive Long Notes & Solved Questions",
  rating: 5.0,
  description: "Official MMDU syllabus (BCSE-012): Internet & WWW Architecture, DNS 5-tier resolution, HTTP transaction cycles, HTML5 Semantic page blueprints, Client-side image maps, Multimedia APIs, Canvas 2D graphics, Web Storage, and CSS architecture with solved university questions.",
  banner: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80"
};

export const webTechUnitsData = [
  {
    unitNum: 1,
    title: "Internet & World Wide Web Architecture (Complete Theory & Schematics)",
    examWeightage: "24 - 28 Marks",
    readingTime: "35 mins",
    summary: "Technical foundations of global networking; 12-point Internet vs WWW comparative matrix; Historical progression from ARPANET to Web 3.0; 5-tier DNS resolution sequence; Browser subsystems & HTTP transaction cycles; Web search crawler indexing pipeline.",
    sections: [
      {
        sectionId: "web-u1-s1",
        title: "1. Technical Definitions & 12-Point Internet vs. WWW Analysis",
        content: `### 1. Fundamental Principles: The Internet vs. The World Wide Web

Understanding the structural boundary between the Internet transport fabric and the World Wide Web hypermedia application is the cornerstone of web engineering.

> 🟢 **Rigorous Technical Definition: The Internet**
> A globally coordinated, packet-switched network of interconnected computing hardware and communications infrastructure governed by the **TCP/IP protocol suite**. It provides transparent physical transport pipelines for routing raw binary datagrams across subsea fiber cables, satellite uplinks, and enterprise routers regardless of device hardware vendor.

> 🟢 **Rigorous Technical Definition: The World Wide Web (WWW)**
> An abstract cyberspace application and distributed hypermedia information retrieval system operating atop the physical Internet infrastructure. It consists of interlinked documents and multimedia resources addressed globally via **Uniform Resource Locators (URLs)** and transferred using **HTTP/HTTPS**.

---

### 2. Comprehensive 12-Point Comparative Matrix

In university examinations, differentiating the Internet from the World Wide Web carries 6 to 10 marks:

| # | Dimension | The Internet | The World Wide Web (WWW) |
| :--- | :--- | :--- | :--- |
| **1** | **Fundamental Nature** | Vast physical & logical network of interconnected hardware, cables, and routers. | Cyberspace collection of hyperlinked multimedia documents and online software resources. |
| **2** | **Year of Origin** | **1969** (Launch of ARPANET by US Department of Defense DARPA). | **1989** (Invented by Sir Tim Berners-Lee at CERN, Switzerland). |
| **3** | **OSI Layer** | Operates across lower layers: Physical, Data Link, Network, and Transport. | Operates strictly at Layer 7: the **Application Layer**. |
| **4** | **Governing Protocols** | Driven by IP \frac{IPv4}{IPv6}, TCP, UDP, BGP, ICMP, ARP, RIP. | Driven by HTTP, HTTPS, WebSockets, WebRTC. |
| **5** | **Core Purpose** | Transports raw binary packets between endpoints reliably. | Structures, formats, and navigates multimedia hypermedia. |
| **6** | **Dependency Relation** | **Completely independent.** It existed 20 years before the Web and functions without it. | **Completely dependent on the Internet.** The Web cannot exist without the Internet backbone. |
| **7** | **Addressing Scheme** | Hardware MAC addresses (48-bit) and logical IP addresses (32/128 bit). | Uniform Resource Locators (URLs) and URIs (e.g. \`https://mmumullana.org\`). |
| **8** | **Services Encompassed** | Encompasses the Web, Email (SMTP/IMAP), File Transfer (FTP), Shells (SSH), VoIP. | Encompasses websites, web applications, REST APIs, and hypermedia DOM trees. |
| **9** | **Client Software** | Operating system networking stack, terminal clients, socket utilities. | Web Browsers (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari). |
| **10** | **Physical Hardware** | Submarine fiber cables, repeaters, cellular towers, ISP core routers. | Web hosting server machines, disk arrays, HTTP daemons, database clusters. |
| **11** | **Central Concept** | Packet switching, packet headers, hop-by-hop routing, congestion control. | Hypertext, hyperlinks, DOM trees, CSS cascades, rendering engines. |
| **12** | **Governing Entities** | IETF (Internet Engineering Task Force), ICANN, IANA, ITU. | W3C (World Wide Web Consortium), WHATWG. |

---

<example level="easy" title="Level 1 (Easy): Categorizing Internet Services vs Web Applications">
**Problem Statement:**
Categorize each of the following technologies as belonging strictly to the **Internet Infrastructure Layer** or the **World Wide Web (WWW) Application Layer**:
1. Domain Name System (DNS) server operating on UDP port 53.
2. A single-page interactive student portal loaded over HTTPS.
3. An SSH terminal shell session connecting to a remote Linux server on port 22.
4. An HTML5 video element streaming via native browser controls.

---

**Step 1 🚀: Analyze DNS (Port 53)**
- Operates at the transport/network abstraction level to translate domain names into IP addresses.
- **Classification:** **Internet Infrastructure Layer**.

**Step 2 ⚡: Analyze HTTPS Student Portal**
- Involves browser DOM rendering, HTML/CSS assets, and HTTP application transactions.
- **Classification:** **World Wide Web Application Layer**.

**Step 3 🎯: Analyze SSH Terminal (Port 22)**
- Runs directly over TCP transport independently of web browsers and HTTP.
- **Classification:** **Internet Service (Non-Web)**.

**Step 4 🏁: Analyze HTML5 Video Tag**
- Embedded in HTML markup and parsed by the browser layout engine.
- **Classification:** **World Wide Web Application Layer**.

<div class="example-answer-box">
🎯 1: Internet Infrastructure | 2: World Wide Web | 3: Internet Service (Non-Web) | 4: World Wide Web.
</div>
</example>`
      },
      {
        sectionId: "web-u1-s2",
        title: "2. Historical Evolution: ARPANET to Web 3.0 & Application Domains",
        content: `### 1. Technological Milestones in Global Web History

The evolution of modern web computing spans five key milestones:

1. **1969 (ARPANET):** Funded by the US Defense Advanced Research Projects Agency (DARPA). It connected four research university nodes (UCLA, Stanford, UC Santa Barbara, Utah) via Interface Message Processors (IMPs) using packet switching.
2. **January 1, 1983 ("Flag Day"):** ARPANET completed its mandatory migration from NCP to the **TCP/IP protocol suite**, marking the birth of the modern Internet.
3. **1989–1990 (Tim Berners-Lee at CERN):** Sir Tim Berners-Lee authored the proposal for an information management system using hyperlinked documents. He authored the first HTTP daemon (\`CERN httpd\`), the first graphical browser (\`WorldWideWeb\`), and the initial HTML specification.
4. **1993 (NCSA Mosaic):** Developed by Marc Andreessen at the University of Illinois Urbana-Champaign; introduced inline graphic rendering alongside text, accelerating consumer internet adoption.
5. **1994 (W3C Established):** Tim Berners-Lee founded the **World Wide Web Consortium (W3C)** at MIT to create vendor-neutral web standards.

---

### 2. The Three Generations of the Web

\`\`\`
  [ Web 1.0 (1991–2004) ]        [ Web 2.0 (2004–2016) ]        [ Web 3.0 (2016–Present) ]
     "The Read-Only Web"           "The Read-Write Web"           "The Semantic & AI Web"
  • Static HTML files            • User-generated content       • Machine-readable semantics
  • Table-based layouts          • AJAX asynchronous calls      • Decentralized storage (IPFS)
  • Centralized webmasters       • Social media & blogs         • AI search & Progressive Web Apps
  • Zero user interactivity      • Responsive mobile design     • Smart agents & WebAssembly
\`\`\`

---

### 3. Application Domains of the Internet

1. **Electronic Commerce (E-Commerce):** B2B, B2C, and C2C marketplaces with automated inventory management, UPI/credit-card payment gateways, and real-time shipment telemetry.
2. **Education & Remote Learning:** Virtual interactive classrooms, Massive Open Online Courses (MOOCs), video streaming of university lectures, and automated examination platforms.
3. **Telecommunications & Collaboration:** Voice over IP (VoIP), high-definition video conferencing, instant messaging, and distributed version control (Git/GitHub).
4. **Cloud Computing & Content Delivery:** Infrastructure as a Service (IaaS), Software as a Service (SaaS), automated container orchestration (Kubernetes), and global edge CDNs.
5. **Internet of Things (IoT) & Smart Cities:** Industrial telemetry, automated electrical grid monitoring, environmental sensing, and connected vehicles.`
      },
      {
        sectionId: "web-u1-s3",
        title: "3. DNS Resolution Architecture & Web Client-Server Subsystems",
        content: `### 1. Requirements for Working with Internet & WWW: The 5-Tier DNS Resolution Hierarchy

When a user enters \`https://mmumullana.org\` into a browser, the hostname must be resolved to a 32-bit IPv4 or 128-bit IPv6 address before TCP connection setup can occur:

\`\`\`
  [ Step 1: Client Browser ] ───(1. Checks Local Cache)───> [ OS DNS Cache / hosts File ]
              │
              ▼ (Cache Miss: Query Dispatched via UDP Port 53)
  [ Step 2: ISP Recursive Resolver ]
              │
              ├───(2. Queries Root)────────> [ Step 3: Root Server (.) ]
              │<──(Refers to .org TLD)──────┘
              │
              ├───(3. Queries TLD)─────────> [ Step 4: TLD Server (.org) ]
              │<──(Refers to MMU Auth DNS)──┘
              │
              └───(4. Queries Auth DNS)────> [ Step 5: Authoritative DNS Server ]
               <──(Returns 104.21.48.12)────┘
              │
              ▼ (Caches IP & Returns to Client)
  [ Client Browser Connects via TCP to 104.21.48.12:443 ]
\`\`\`

> 📌 **Key Architectural Distinction:**
> - **Recursive Resolver:** The server that performs the legwork of querying other nameservers on behalf of the client.
> - **Authoritative DNS:** The final authoritative source holding the actual DNS zone record (\`A\`, \`AAAA\`, \`CNAME\`, \`MX\`) mapped to that domain.

---

### 2. Internal Subsystems of a Modern Web Browser

A web browser is a multi-process software application composed of distinct subsystems:

\`\`\`
  +-------------------------------------------------------------------------+
  |                             USER INTERFACE                              |
  |  Address bar, Back/Forward buttons, Bookmark menu, Tab bar, Downloads  |
  +-------------------------------------------------------------------------+
                                       │
                                       ▼
  +-------------------------------------------------------------------------+
  |                              BROWSER ENGINE                             |
  |  Marshals actions between the UI and the underlying rendering engine   |
  +-------------------------------------------------------------------------+
                                       │
                    ┌──────────────────┴──────────────────┐
                    ▼                                     ▼
  +-----------------------------------+ +-----------------------------------+
  |          RENDERING ENGINE         | |         JAVASCRIPT ENGINE         |
  |  Parses HTML to build DOM Tree    | |  Compiles JS to machine bytecode  |
  |  Parses CSS to build CSSOM Tree   | |  Executes scripts \frac{V8}{SpiderM}  |
  |  Combines into Render Tree        | |  Manages call stack & event loop  |
  |  Calculates Layout & Paints UI    | +-----------------------------------+
  |  (Blink in Chrome/Edge, Gecko)    |
  +-----------------------------------+
                    │                                     │
                    └──────────────────┬──────────────────┘
                                       ▼
  +-------------------------------------------------------------------------+
  |                           NETWORKING SUBSYSTEM                          |
  |  DNS queries, TLS handshakes, HTTP request/response pipelines, Sockets  |
  +-------------------------------------------------------------------------+
  |                              DATA STORAGE                               |
  |  localStorage, sessionStorage, IndexedDB, Cookies, Service Worker Cache |
  +-------------------------------------------------------------------------+
\`\`\`

---

### 3. Hypertext Transfer Protocol (HTTP) & The 3-Way Handshake

HTTP is an Application Layer, stateless, request-response communication protocol:

$$\text{Client Request}  [\text{Method} + \text{URI} + \text{Headers} + \text{Body}] \iff \text{Server Response}  [\text{Status Code} + \text{Headers} + \text{Payload}]$$

#### Standard HTTP Methods:
- **\`GET\`:** Requests representation of specified resource without server side-effects. Parameters appended to URL query string.
- **\`POST\`:** Submits data to be processed (e.g. form submissions, file uploads). Data enclosed inside request payload body.
- **\`PUT\`:** Replaces target resource completely with uploaded payload.
- **\`DELETE\`:** Requests removal of specified resource from server storage.

#### HTTP Response Status Classifications:
- **1xx (Informational):** \`100 Continue\`, \`101 Switching Protocols\`.
- **2xx (Success):** \`200 OK\`, \`201 Created\`, \`204 No Content\`.
- **3xx (Redirection):** \`301 Moved Permanently\`, \`304 Not Modified\` (browser cache valid).
- **4xx (Client Error):** \`400 Bad Request\`, \`401 Unauthorized\`, \`403 Forbidden\`, \`404 Not Found\`.
- **5xx (Server Error):** \`500 Internal Server Error\`, \`502 Bad Gateway\`, \`503 Service Unavailable\`.`
      },
      {
        sectionId: "web-u1-s4",
        title: "4. Web Searching Architectures & Web-Casting Techniques",
        content: `### 1. Search Engine Subsystems & Inverted Indexing

Modern web search engines process billions of documents via a 4-phase pipeline:

\`\`\`
  [ Phase 1: Web Crawlers (Spiders / Bots) ]
  • Discovers URLs by traversing hyperlinks across the web graph.
  • Respects robots.txt directives and crawls recursively.
                    │
                    ▼
  [ Phase 2: Document Parser & Tokenizer ]
  • Strips HTML markup tags and extracts raw text.
  • Lowercases tokens, eliminates non-informative stop words ("the", "is", "at").
  • Normalizes words to linguistic stems via Porter Stemming.
                    │
                    ▼
  [ Phase 3: Inverted Index Generation ]
  • Constructs a dictionary of all distinct words mapped to Document Postings Lists:
      Term "html"    ───> [ Doc 101, Doc 104, Doc 209 ]
      Term "css"     ───> [ Doc 104, Doc 312 ]
      Term "mullana" ───> [ Doc 101, Doc 418 ]
                    │
                    ▼
  [ Phase 4: Query Ranking Engine (PageRank / AI) ]
  • Evaluates query terms using TF-IDF (Term Frequency - Inverse Document Frequency).
  • Computes PageRank authority score based on incoming link eigenvector centrality.
  • Returns top ranked results to user in under 100 milliseconds.
\`\`\`

---

### 2. Web-Casting Techniques: Push vs. Pull & Unicast vs. Multicast

- **Pull Technology (Traditional Client-Driven):** The client sends an explicit HTTP request to the server, and the server passively responds with data. If no request is made, no data is delivered.
- **Push Technology (Server-Driven Event Streams):** The server proactively delivers fresh information to the client as soon as new data becomes available without waiting for a new request (e.g. WebSockets, Server-Sent Events, RSS feeds).
- **Unicast Transmission:** A dedicated one-to-one point-to-point transmission stream between the server and a single client. $N$ simultaneous viewers require $N$ times the server bandwidth.
- **Multicast Transmission:** A one-to-many distribution mechanism where the source transmits a single packet stream, and intermediate network routers replicate packets at junction branches to feed multiple simultaneous viewers.`
      },
      {
        sectionId: "web-u1-s5",
        title: "5. University Solved Exam Questions (With Schematics)",
        content: `### University Examination Solved Questions (Unit I)

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
The **Root Name Server (\`.\`)** stands at the apex of the global DNS namespace. It does not contain end-user host IPs; instead, it parses the Top-Level Domain suffix (e.g. \`.org\`) and returns the IP address of the designated **TLD Nameserver** to the recursive resolver.

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
    <text x="445" y="78" text-anchor="middle" fill="#a7f3d0" font-size="9.5">Returns: Delegated IPs for .org TLD Cluster ➔ Query Continues ✓</text>
  </svg>
  <div class="circuit-diagram-caption">Fig S1: Solved Root Server Referral Mechanism</div>
</div>

<div class="example-answer-box">
🎯 Root Name Server reads domain TLD (\`.org\`) and refers resolver to TLD Authoritative Cluster.
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
    <text x="510" y="85" text-anchor="middle" fill="#94a3b8" font-size="9">Socket State: LISTEN \frac{Port 80}{443}</text>
  </svg>
  <div class="circuit-diagram-caption">Fig Q5: Client-Server Socket Initial Endpoints</div>
</div>

---

**Step-by-Step Solution:**
1. **SYN:** Client sends initial sequence number $x$ with \`SYN\` flag set.
2. **SYN-ACK:** Server responds with \`SYN\` (ISN $y$) and \`ACK = x + 1\`.
3. **ACK:** Client confirms with \`ACK = y + 1\`. Connection established!

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
</example>`
      }

    ]
  },
  {
    unitNum: 2,
    title: "Basics of HTML & Website Engineering (Structure, Elements & Mapping)",
    examWeightage: "24 - 28 Marks",
    readingTime: "35 mins",
    summary: "Professional 8-stage website development lifecycle (SDLC); Hosting models; 12-point static vs dynamic website matrix; Fundamental HTML document structure; Core formatting tags; List models; Hyperlink targets; Client-side image mapping geometry; Frames vs modern IFrames.",
    sections: [
      {
        sectionId: "web-u2-s1",
        title: "1. Website Engineering: The 8-Stage Systems Development Life Cycle (SDLC)",
        content: `### 1. Professional Website Engineering Lifecycle (SDLC)

Building enterprise web platforms requires systematic adherence to an 8-stage lifecycle:

\`\`\`
  [ Stage 1: Planning & Feasibility ]
  • Define Software Requirements Specification (SRS), project scope, and personas.
  • Conduct technical feasibility and hosting budget analysis.
                 │
                 ▼
  [ Stage 2: UI/UX Wireframing & Design ]
  • Information architecture (IA) mapping and user journey workflows.
  • High-fidelity interactive UI prototypes created in Figma.
                 │
                 ▼
  [ Stage 3: Frontend Client Development ]
  • Semantic HTML5 markup structure and accessible CSS3 stylesheets.
  • Responsive mobile-first layouts and client-side interactions.
                 │
                 ▼
  [ Stage 4: Backend API & Database Engineering ]
  • Server-side business logic implementation (Node.js, Python, PHP, Java).
  • Database schema modeling (MySQL, PostgreSQL) and RESTful API endpoints.
                 │
                 ▼
  [ Stage 5: Quality Assurance & Cross-Browser Testing ]
  • Cross-browser testing (Chrome, Safari, Firefox, Edge) and mobile testing.
  • WCAG accessibility compliance, security audits (OWASP Top 10), and unit testing.
                 │
                 ▼
  [ Stage 6: Domain Registration & DNS Configuration ]
  • Domain name acquisition through accredited registrars (ICANN).
  • Configuring DNS records (\`A\` for IPv4, \`AAAA\` for IPv6, \`CNAME\` for aliases).
                 │
                 ▼
  [ Stage 7: Web Publishing & Deployment ]
  • Automated CI/CD build pipelines (GitHub Actions, GitLab CI).
  • Production deployment onto cloud VPS, container clusters, or edge CDNs.
                 │
                 ▼
  [ Stage 8: Maintenance, Monitoring & SEO Audits ]
  • Uptime monitoring, server security patching, database automated backups.
  • Technical SEO audits, Core Web Vitals optimization, and analytics tracking.
\`\`\`

---

### 2. Website Hosting Architectures

1. **Shared Hosting:** Multiple customer websites reside on a single physical server machine, sharing CPU, RAM, and web server software. Low cost, but vulnerable to neighboring resource spikes ("noisy neighbor" problem).
2. **Virtual Private Server (VPS):** A physical server partitioned via hardware hypervisors (KVM) into dedicated virtual slices. Each VPS runs its own isolated operating system kernel with dedicated RAM and CPU guarantees.
3. **Dedicated Server Hosting:** An entire physical computer hardware machine leased exclusively to one organization. Maximum security and compute power; requires dedicated systems administration.
4. **Cloud & Edge CDN Hosting:** Web applications deployed across elastic distributed cloud instances (AWS, Google Cloud) with static assets cached worldwide at edge Point of Presence (PoP) locations for sub-millisecond global delivery.`
      },
      {
        sectionId: "web-u2-s2",
        title: "2. Static vs. Dynamic Websites: Comprehensive 12-Point Analysis",
        content: `### Exhaustive Comparison: Static vs. Dynamic Websites

| # | Dimension | Static Website | Dynamic Website |
| :--- | :--- | :--- | :--- |
| **1** | **Core Definition** | Displays pre-authored, fixed content stored on disk; appears identical to every visitor. | Generates and personalizes content on-the-fly based on user request, database state, and session. |
| **2** | **Technologies Employed** | Pure HTML5, CSS3, and basic vanilla client-side JavaScript. | Server-side languages (PHP, Node.js, Python, Java) paired with database engines. |
| **3** | **Database Dependency** | **Zero database requirement.** Text and media paths are hardcoded directly into files. | **Heavily database-driven** (MySQL, PostgreSQL, MongoDB, Oracle). |
| **4** | **Server Processing Overhead** | Negligible CPU overhead. Server performs direct disk I/O to socket transmission. | High computation per hit. Server executes business logic and runs SQL queries. |
| **5** | **Page Load Speed** | Ultra-fast due to lightweight payload and effortless CDN edge caching worldwide. | Slightly slower initial response time due to server processing and database latency. |
| **6** | **Development Complexity** | Very simple and straightforward; accessible to entry-level developers. | High architectural complexity requiring full-stack programming and database schema design. |
| **7** | **Hosting & Maintenance Cost** | Minimal to zero cost. Can be hosted free on static platforms (GitHub Pages, Netlify, Vercel). | High recurring cost for application servers, database instances, and auto-scaling compute. |
| **8** | **Ease of Content Updating** | Difficult at scale. Modifying a shared header requires editing every individual HTML file. | Effortless. Non-technical users update content via Content Management Systems (CMS / Admin Dashboards). |
| **9** | **User Interactivity & Auth** | No user accounts, personalized profiles, shopping carts, or interactive commenting. | Rich interactive capabilities: user authentication, e-commerce checkouts, dynamic filters. |
| **10** | **Security Vulnerability Surface** | Practically immune to server-side attacks. No SQL injection or code injection possible. | Susceptible to SQL Injection, Cross-Site Scripting (XSS), CSRF, and session exploits if unpatched. |
| **11** | **File Extensions** | Files saved strictly as \`.html\` or \`.htm\`. | Files historically saved as \`.php\`, \`.jsp\`, \`.aspx\`, or routed URL endpoints. |
| **12** | **Real-World Examples** | Personal portfolios, restaurant menus, product documentation, brochures. | Amazon, Facebook, Netflix, University ERP systems, Net-Banking portals. |`
      },
      {
        sectionId: "web-u2-s3",
        title: "3. HTML Fundamental Structure, Core Tags & Text Formatting",
        content: `### 1. Fundamental Structure of an HTML Webpage

Every valid modern HTML5 document conforms to the following skeleton:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MMU Engineering Portal</title>
</head>
<body>
  <h1>Department of Computer Science & Engineering</h1>
  <p>Welcome to B.Tech First Year Web Technologies Laboratory.</p>
</body>
</html>
\`\`\`

#### Key Document Structure Tags Explained:
- **\`<!DOCTYPE html>\`:** Directs the browser rendering engine to parse the document according to modern HTML5 standards, preventing quirks mode.
- **\`<html lang="en">\`:** The root wrapper element; \`lang="en"\` declares the primary human language for accessibility screen readers.
- **\`<head>\`:** Houses metadata, external stylesheets, fonts, and scripts not directly painted on the visual canvas.
- **\`<meta charset="UTF-8">\`:** Specifies Unicode character encoding covering worldwide languages and symbols.
- **\`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`:** Critical for responsive mobile design; sets page width to match device screen width.
- **\`<title>\`:** Page title displayed on the browser tab and indexed by search engine spiders.
- **\`<body>\`:** Encloses all visible elements (headings, text, graphics, tables, links, media).

---

### 2. Core HTML Tags & Formatting Elements

#### A. Headings, Paragraphs, Line Breaks & Rules:
\`\`\`html
<h1>Heading 1 (Main Document Title)</h1>
<h2>Heading 2 (Major Unit Header)</h2>
<h3>Heading 3 (Sub-Topic Header)</h3>
<p>Paragraph tag defines standard blocks of body text.<br>The br tag forces an immediate line break.</p>
<hr> <!-- Horizontal thematic break rule -->
\`\`\`

#### B. Text Styles & Semantic Elements:
- **\`<b>\` vs. \`<strong>\`:** \`<b>\` provides visual bolding; \`<strong>\` conveys semantic importance for screen readers.
- **\`<i>\` vs. \`<em>\`:** \`<i>\` italicizes text visually; \`<em>\` indicates emphasized semantic stress.
- **\`<mark>\`:** Highlights text with a yellow background.
- **\`<del>\` and \`<ins>\`:** Represents deleted (strikethrough) and inserted (underlined) text.
- **\`<sup>\` and \`<sub>\`:** Superscripts ($x²$) and Subscripts ($H_2O$).

#### C. Ordered, Unordered, and Definition Lists:
\`\`\`html
<!-- Unordered List with Square Bullets -->
<ul type="square">
  <li>Computer Networks</li>
  <li>Operating Systems</li>
</ul>

<!-- Ordered List with Roman Numerals starting from 3 -->
<ol type="I" start="3">
  <li>Unit III: HTML5</li>
  <li>Unit IV: CSS</li>
</ol>

<!-- Definition / Description List -->
<dl>
  <dt>HTML</dt>
  <dd>Hypertext Markup Language for structuring web documents.</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets for describing document presentation.</dd>
</dl>
\`\`\``
      },
      {
        sectionId: "web-u2-s4",
        title: "4. Hyperlinks, Client-Side Image Mapping & Modern IFrames",
        content: `### 1. Hyperlinks (<a> Anchor Tag)

The anchor tag enables hypermedia navigation across the web:

\`\`\`html
<!-- 1. External link opening securely in a new browser tab -->
<a href="https://www.w3.org" target="_blank" rel="noopener noreferrer">Visit W3C Official</a>

<!-- 2. Internal bookmark anchor jump -->
<a href="#unit4-css">Jump directly to Unit IV Notes</a>

<!-- 3. Email and Telephone protocols -->
<a href="mailto:contact@mmumullana.org">Email University</a>
<a href="tel:+911731274475">Call Office</a>
\`\`\`

> 🚨 **Security Pitfall (\`rel="noopener noreferrer"\`):**
> When using \`target="_blank"\`, always include \`rel="noopener noreferrer"\` to prevent the opened page from accessing \`window.opener\`, protecting against reverse tab-nabbing security exploits.

---

### 2. Client-Side Image Mapping (<map> and <area>)

Client-side image mapping links distinct geometric coordinate regions within a single image to different destination URLs:

\`\`\`
  [ Coordinates Geometry for Image Maps ]
  
  1. RECTANGLE: coords="x1, y1, x2, y2"
     (x1,y1) Top-Left ──────────┐
          │                     │
          └─────────── (x2,y2) Bottom-Right

  2. CIRCLE: coords="center_x, center_y, radius"
              (cx,cy) ───[radius]───> Perimeter

  3. POLYGON: coords="x1, y1, x2, y2, x3, y3, ..."
     Ordered list of closed vertices connecting the perimeter.
\`\`\`

\`\`\`html
<img src="motherboard.jpg" usemap="#boardmap" alt="Computer Motherboard">
<map name="boardmap">
  <area shape="rect" coords="20,20,180,180" href="cpu.html" alt="CPU Socket Details">
  <area shape="circle" coords="250,150,45" href="cmos.html" alt="CMOS Battery Info">
  <area shape="poly" coords="300,50,380,50,380,120,300,120" href="ram.html" alt="RAM Slots">
</map>
\`\`\`

---

### 3. Frames vs. Modern IFrames

- **Legacy \`<frameset>\` & \`<frame>\` Deprecation:** In HTML4, \`<frameset>\` replaced the document \`<body>\` to partition the browser window into multiple independent HTML pages. This broke browser bookmarking, back buttons, printing, and search engine crawling, and was **completely removed from HTML5**.
- **Modern \`<iframe>\` (Inline Frame):** Embeds an independent browsing context seamlessly inside the standard HTML5 document body:

\`\`\`html
<iframe
  src="https://www.google.com/maps/embed?..."
  width="100%"
  height="250"
  style="border:0;"
  sandbox="allow-scripts allow-same-origin"
  loading="lazy"
  title="MMU Campus Location">
</iframe>
\`\`\`
> 🔒 **The \`sandbox\` Attribute:** Restricts scripts, form submissions, and popups inside the embedded iframe, mitigating clickjacking and malicious script execution.`
      },
      {
        sectionId: "web-u2-s5",
        title: "5. University Solved Exam Questions (With Schematics)",
        content: `### University Examination Solved Questions (Unit II)

<example level="easy" title="Section A (1 Mark): Client-Side Image Map Rectangular Syntax">
**University Question (1 Mark):**
Given the clickable button area shown in Figure Q2, write the exact HTML \`<area>\` tag.

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
For \`shape="rect"\`, coords takes 4 values: \`x1, y1, x2, y2\`:
\`\`\`html
<area shape="rect" coords="20,30,150,120" href="info.html" alt="Information Portal">
\`\`\`

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
🎯 \`<area shape="rect" coords="20,30,150,120" href="info.html" alt="Information Portal">\`
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
\`\`\`html
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
\`\`\`

<div class="example-answer-box">
🎯 Solution produces valid semantic HTML \`<table>\`, \`<thead>\`, \`<tbody>\`, and \`<tfoot>\` structure.
</div>
</example>`
      }

    ]
  },
  {
    unitNum: 3,
    title: "HTML5 & Modern Web Application APIs (Semantics, Canvas, Storage & Media)",
    examWeightage: "24 - 28 Marks",
    readingTime: "40 mins",
    summary: "HTML5 paradigm shift; 5 major limitations of HTML4; Structural semantic page layout blueprint; Native multimedia multi-codec fallback (<video> & <audio>); Canvas 2D API & procedural drawing; Web Storage decision matrix; Modern HTML5 form inputs.",
    sections: [
      {
        sectionId: "web-u3-s1",
        title: "1. Evolution & Advantages of HTML5 over HTML4",
        content: `### 1. The Paradigm Shift: HTML4 Limitations vs. HTML5 Solutions

Ratified as an official W3C Recommendation in October 2014, **HTML5** modernized web development from a simple text formatting language into a robust application execution runtime.

| HTML4 Limitation | Problem Encountered | HTML5 Modern Solution |
| :--- | :--- | :--- |
| **Lack of Semantic Structure** | Heavy reliance on meaningless \`<div id="nav">\` and generic "div-soup". Screen readers could not parse document meaning. | Native structural semantic elements (\`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<aside>\`, \`<footer>\`). |
| **Plugin Vulnerabilities & Crashes** | Video and audio playback required proprietary browser plugins (Adobe Flash, Silverlight), causing crashes and severe security holes. | Native hardware-accelerated \`<video>\` and \`<audio>\` tags with multi-codec fallbacks and subtitle tracks. |
| **Inadequate Client-Side Storage** | Depended solely on 4KB HTTP Cookies transmitted across the network with every HTTP request header, causing network overhead. | Web Storage API (\`localStorage\` and \`sessionStorage\`) offering 5MB–10MB isolated client-side storage. |
| **No Native Graphics Rendering** | Drawing diagrams, charts, or game animations required complex Flash applets. | High-performance scriptable 2D raster drawing via the \`<canvas>\` API and native scalable vector graphics (\`<svg>\`). |
| **Poor Mobile & Error-Handling Discipline** | HTML4 lacked standardized rules for malformed markup, causing browsers to implement inconsistent parsing workarounds. | Strict standardized parsing algorithms, mobile-first responsive design, and offline capability via Service Workers. |`
      },
      {
        sectionId: "web-u3-s2",
        title: "2. HTML5 Structural Semantic Elements Layout Blueprint",
        content: `### Structural Semantic Architecture of a Modern HTML5 Webpage

HTML5 introduces structural semantic elements that explicitly describe their meaning to both browser rendering engines and screen readers:

\`\`\`
  +-------------------------------------------------------------------------+
  |                                <header>                                 |
  |  Website Branding, University Logo, Header Banner & Global Search Bar   |
  +-------------------------------------------------------------------------+
  |                                 <nav>                                   |
  |  Primary Navigation Menu: Home | Syllabus | Faculty | Admissions | Exam |
  +-------------------------------------------------------------------------+
  |                                                                         |
  |  +-----------------------------------------------+ +-----------------+  |
  |  |                    <main>                     | |     <aside>     |  |
  |  |  Primary Central Document Content Area        | |  Sidebar        |  |
  |  |                                               | |  Notices,       |  |
  |  |  +---------------------+ +-----------------+  | |  Related Links, |  |
  |  |  |      <article>      | |    <section>    |  | |  Advertisements,|  |
  |  |  |  Self-contained     | |  Thematic       |  | |  Author Bio     |  |
  |  |  |  reusable post,     | |  syllabus       |  | |                 |  |
  |  |  |  news item, blog    | |  chapter        |  | |                 |  |
  |  |  +---------------------+ +-----------------+  | |                 |  |
  |  +-----------------------------------------------+ +-----------------+  |
  |                                                                         |
  +-------------------------------------------------------------------------+
  |                                <footer>                                 |
  |  Copyright © 2026 MMU Mullana | Terms of Use | Privacy | Webmaster      |
  +-------------------------------------------------------------------------+
\`\`\`

#### Detailed Definitions of Semantic Tags:
- **\`<header>\`:** Represents introductory content, branding logos, navigational search utilities, or author headings.
- **\`<nav>\`:** Encloses the major primary navigation blocks containing links to other pages or sections.
- **\`<main>\`:** Contains the central dominant content unique to that document; must not be duplicated inside headers or footers.
- **\`<article>\`:** A complete, self-contained composition that is independently distributable or reusable (e.g. blog post, news story).
- **\`<section>\`:** Represents a standalone thematic grouping of content, typically with its own heading (e.g. chapters, tabs).
- **\`<aside>\`:** Content tangentially related to the main content (e.g. sidebars, callout boxes, related article links).
- **\`<footer>\`:** Houses author information, copyright notices, terms of service, and back-to-top links.`
      },
      {
        sectionId: "web-u3-s3",
        title: "3. Native Multimedia & Modern HTML5 Form Controls",
        content: `### 1. Native Multimedia (<video> and <audio> APIs)

HTML5 eliminates third-party plugins by embedding media directly in the DOM:

\`\`\`html
<!-- Native HTML5 Video Element with Multi-Codec Fallback & Subtitles -->
<video width="640" height="360" controls poster="poster_image.jpg" preload="metadata">
  <source src="lecture.mp4" type="video/mp4">
  <source src="lecture.webm" type="video/webm">
  <track src="subtitles_en.vtt" kind="subtitles" srclang="en" label="English">
  Your browser does not support native HTML5 video playback.
</video>

<!-- Native HTML5 Audio Element -->
<audio controls preload="auto">
  <source src="podcast.mp3" type="audio/mpeg">
  <source src="podcast.ogg" type="audio/ogg">
  Your browser does not support the audio element.
</audio>
\`\`\`

---

### 2. Modern HTML5 Form Inputs & Attributes

HTML5 modernized forms with built-in client-side validation without requiring custom JavaScript:

\`\`\`html
<form action="/submit_admission" method="POST">
  <!-- Email validation with regex check -->
  <label for="email">University Email:</label>
  <input type="email" id="email" name="email" placeholder="student@mmumullana.org" required>

  <!-- Numeric bounds -->
  <label for="age">Age (17-30):</label>
  <input type="number" id="age" name="age" min="17" max="30" required>

  <!-- Slider input -->
  <label for="scale">Skill Level (1-10):</label>
  <input type="range" id="scale" name="skill" min="1" max="10" value="7">

  <!-- Native Date Picker -->
  <label for="dob">Date of Birth:</label>
  <input type="date" id="dob" name="dob">

  <!-- Datalist Autocomplete -->
  <label for="course">Choose Branch:</label>
  <input list="branchList" id="course" name="branch">
  <datalist id="branchList">
    <option value="Computer Science & Engineering">
    <option value="Information Technology">
    <option value="Mechanical Engineering">
  </datalist>

  <button type="submit">Submit Application</button>
</form>
\`\`\``
      },
      {
        sectionId: "web-u3-s4",
        title: "4. Canvas 2D Graphics API & Web Storage (Cookies vs LocalStorage)",
        content: `### 1. The HTML5 <canvas> 2D Context API

The \`<canvas>\` tag provides an immediate-mode resolution-dependent bitmap surface scriptable via JavaScript:

\`\`\`html
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
\`\`\`

---

### 2. Client-Side Web Storage: Cookies vs. LocalStorage vs. SessionStorage

\`\`\`
                        [ Client Storage Decision Tree ]
                                       │
                  Is data needed by the web server on every HTTP hit?
                                  /         \
                             YES /            NO
                                v             v
                       [ HTTP Cookies ]    Does data need to survive
                       • 4KB Max             tab & browser restarts?
                       • Sent on headers          /          \
                                             YES /             NO
                                                v              v
                                        [ localStorage ]  [ sessionStorage ]
                                        • 5MB–10MB        • 5MB
                                        • Permanent       • Tab lifetime
\`\`\`

| Dimension | HTTP Cookies | LocalStorage (HTML5) | SessionStorage (HTML5) |
| :--- | :--- | :--- | :--- |
| **Storage Capacity** | Strictly ~4 Kilobytes | ~5 to 10 Megabytes | ~5 Megabytes |
| **Data Lifetime** | Configurable via \`Expires\` or \`Max-Age\` | **Permanent** (persists after browser restart) | **Session-Only** (cleared when browser tab closes) |
| **Network Transmission** | Sent automatically on every HTTP header | **Never sent to server** (Client-only) | **Never sent to server** (Client-only) |
| **Access Scope** | Domain & path scoped | Origin scoped (shared across all tabs) | Tab scoped (isolated to single window) |
| **JavaScript API** | Complex string manipulation (\`document.cookie\`) | \`setItem()\`, \`getItem()\`, \`removeItem()\` | \`setItem()\`, \`getItem()\`, \`removeItem()\` |`
      },
      {
        sectionId: "web-u3-s5",
        title: "5. University Solved Exam Questions (With Schematics)",
        content: `### University Examination Solved Questions (Unit III)

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
- **\`localStorage\`:** Persists across browser sessions and computer reboots until explicitly cleared by the user or script (\`localStorage.clear()\`).
- **\`sessionStorage\`:** Confined to the lifespan of the specific browser tab; automatically purged upon tab closure.

<div class="example-answer-box">
🎯 \`sessionStorage\` = Tab Lifetime (Temporary) | \`localStorage\` = Permanent (Across Restarts).
</div>
</example>

<example level="hard" title="Section D (6 Marks): Dynamic Canvas Bar Chart Implementation">
**University Question (6 Marks):**
Develop complete JavaScript and HTML5 code to draw a dynamic comparison bar chart with three subject scores on a \`<canvas>\` as shown in Figure Q15.

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 640 180" width="100%" style="height:auto;" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="630" height="170" rx="8" fill="rgba(15,23,42,0.6)" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4 4" />
    <text x="320" y="24" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="bold">FIGURE Q15: CANVAS ACADEMIC BAR CHART TARGET</text>
    
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
\`\`\`html
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
\`\`\`

<div class="example-answer-box">
🎯 Complete script renders baseline axis, scaled dynamic bars, and dual centered text annotations.
</div>
</example>`
      }

    ]
  },
  {
    unitNum: 4,
    title: "Cascading Style Sheets (CSS) Architecture (Cascade, Box Model & Layouts)",
    examWeightage: "24 - 28 Marks",
    readingTime: "40 mins",
    summary: "CSS Cascade & specificity calculation formula matrix; 3 applying methods compared; Typography, line-height & color gradients; Standard CSS box model & universal box-sizing reset; 5 CSS positioning schemes; Floats, micro-clearfix hack & zebra data tables.",
    sections: [
      {
        sectionId: "web-u4-s1",
        title: "1. Cascade, Specificity Weight Matrix & 3 Applying Methods",
        content: `### 1. Introduction to Style Sheets & Specificity Calculation Formula

Cascading Style Sheets (CSS) describe the visual presentation and formatting of HTML documents, separating structural content from graphic design.

> 🟢 **The CSS Specificity Weight Matrix Formula:**
> When conflicting rules target the same element, browsers calculate a 4-part weight:
> $$\mathbf{\text{Specificity} = (\text{Inline Style } [1000]) + (\text{IDs } [0100]) + (\text{Classes/Pseudo } [0010]) + (\text{Elements/Tags } [0001])}$$
> - \`!important\` overrides standard cascade weights and should be used with extreme caution.
> - **Inheritance:** Typography properties (\`color\`, \`font-family\`, \`font-size\`) inherit by default to child elements; Box Model properties (\`margin\`, \`padding\`, \`border\`, \`width\`) do NOT inherit.

---

### 2. Three Methods of Applying CSS

| Method | Syntax Location | Scope | Browser Caching & Reusability |
| :--- | :--- | :--- | :--- |
| **Inline CSS** | Inside element tag: \`<p style="color: blue;">\` | Strictly that single individual element. | **Worst practice.** Pollutes HTML; cannot be cached independently. |
| **Internal / Embedded** | Inside \`<style>\` tag in document \`<head>\` | Entire single HTML page. | Acceptable for standalone single pages; cannot be reused across other pages. |
| **External CSS** | In separate \`.css\` file linked via \`<link rel="stylesheet">\` | Styles entire multi-page application uniformly. | **Industry Standard.** Clean separation of concerns; cached by browser across all pages. |`
      },
      {
        sectionId: "web-u4-s2",
        title: "2. Typography, Text Formatting & Linear / Radial Gradients",
        content: `### 1. Professional Typography in CSS

\`\`\`css
.academic-typography {
  font-family: 'Segoe UI', Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;              /* Proportional line height for readability */
  letter-spacing: 0.5px;         /* Subtle tracking between characters */
  text-transform: capitalize;    /* uppercase | lowercase | capitalize */
  text-align: justify;           /* left | right | center | justify */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
\`\`\`

---

### 2. CSS Color Gradients

\`\`\`css
/* Linear Gradient (Angled color transition) */
.gradient-banner {
  background: linear-gradient(135deg, #0284c7 0%, #1e1b4b 100%);
  color: #ffffff;
  padding: 18px;
  border-radius: 6px;
}

/* Radial Gradient (Concentric circular transition from center) */
.radial-spotlight {
  background: radial-gradient(circle at center, #f59e0b 0%, #9a3412 100%);
  color: #ffffff;
  padding: 18px;
  border-radius: 6px;
}
\`\`\``
      },
      {
        sectionId: "web-u4-s3",
        title: "3. The Standard CSS Box Model & Universal Sizing Reset",
        content: `### 1. Architecture of the Standard CSS Box Model

Every element rendered on an HTML page is represented as a rectangular box composed of four concentric layers:

\`\`\`
  +-------------------------------------------------------------------------+
  |                  MARGIN (Outer Transparent Clearance)                   |
  |  +-------------------------------------------------------------------+  |
  |  |                      BORDER (Stroke Outline)                      |  |
  |  |  +-------------------------------------------------------------+  |  |
  |  |  |               PADDING (Inner Breathing Space)               |  |  |
  |  |  |  +-------------------------------------------------------+  |  |  |
  |  |  |  |             CONTENT (Text, Image, Video)              |  |  |  |
  |  |  |  +-------------------------------------------------------+  |  |  |
  |  |  +-------------------------------------------------------------+  |  |
  |  +-------------------------------------------------------------------+  |
  +-------------------------------------------------------------------------+
\`\`\`

#### Box Dimensions & Sizing Formulas:
1. **\`box-sizing: content-box\` (Browser Default):**
   $$\mathbf{\text{Total Rendered Width} = \text{Width} + 2(\text{Padding}) + 2(\text{Border}) + 2(\text{Margin})}$$
   - *Problem:* Adding padding causes the element to unexpectedly expand and break grid layouts!
2. **\`box-sizing: border-box\` (Modern Engineering Standard):**
   $$\mathbf{\text{Total Rendered Width} = \text{Specified Width}}$$
   - *Solution:* The browser automatically absorbs padding and borders inside the declared width, ensuring robust responsive layouts!

\`\`\`css
/* Universal Box-Sizing Reset */
*, *::before, *::after {
  box-sizing: border-box;
}
\`\`\``
      },
      {
        sectionId: "web-u4-s4",
        title: "4. Display, 5 Positioning Schemes, Floats & Zebra Tables",
        content: `### 1. The \`display\` Property

- **\`display: block\`:** Takes up the full available line width; breaks onto a new line (e.g. \`<div>\`, \`<p>\`, \`<h1>\`).
- **\`display: inline\`:** Takes up only content width; does not force line breaks; ignores top/bottom margins (e.g. \`<span>\`, \`<a>\`).
- **\`display: inline-block\`:** Flows inline like text, but accepts custom \`width\`, \`height\`, and vertical \`padding\`.
- **\`display: none\`:** Removes element completely from rendering tree (contrast with \`visibility: hidden\` which hides pixels but preserves the blank space).

---

### 2. Visual Comparison of the 5 CSS Positioning Schemes

| Scheme | Origin / Reference Anchor | Document Flow Impact | Typical Use Case |
| :--- | :--- | :--- | :--- |
| **\`static\`** | Normal document flow | Default sequential flow; ignores \`top\`, \`left\`, \`z-index\`. | Default flow elements. |
| **\`relative\`** | Its own original position | Preserves original layout space; nudged via offsets. | Parent anchor for absolute children. |
| **\`absolute\`** | Nearest positioned (non-static) ancestor | Removed completely from flow; zero space reserved. | Dropdown menus, tooltips, modal dialogs. |
| **\`fixed\`** | Browser viewport window | Removed from flow; locked in place during page scroll. | Sticky headers, back-to-top buttons. |
| **\`sticky\`** | Normal flow until scroll threshold | Acts relative until threshold, then locks fixed. | Sticky table column headers, directory alphabets. |

---

### 3. Floating Elements, Micro-Clearfix & Zebra Tables

\`\`\`css
/* Float-based 2-Column Layout */
.sidebar {
  float: left;
  width: 28%;
}
.main-content {
  float: right;
  width: 70%;
}

/* Micro-Clearfix Hack (Prevents parent container collapse) */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

/* Professional Zebra-Striped Data Table */
table.university-table {
  width: 100%;
  border-collapse: collapse; /* Merges double borders */
}
table.university-table th, table.university-table td {
  border: 1px solid #cbd5e1;
  padding: 8px 12px;
}
table.university-table th {
  background-color: #1e293b;
  color: #ffffff;
}
table.university-table tr:nth-child(even) {
  background-color: #f8fafc; /* Alternating row tint */
}
table.university-table tr:hover {
  background-color: #e0f2fe; /* Interactive hover highlight */
}
\`\`\``
      },
      {
        sectionId: "web-u4-s5",
        title: "5. University Solved Exam Questions (With Schematics)",
        content: `### University Examination Solved Questions (Unit IV)

<example level="easy" title="Section A (1 Mark): CSS Specificity Calculation">
**University Question (1 Mark):**
Calculate the total specificity score of the selector shown in Figure Q4: \`nav#primary-menu ul.dropdown > li a:hover\`.

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 640 120" width="100%" style="height:auto;" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="630" height="110" rx="8" fill="rgba(15,23,42,0.6)" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4 4" />
    <text x="320" y="24" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="bold">FIGURE Q4: SELECTOR COMPONENT MATRIX</text>
    
    <rect x="30" y="45" width="580" height="40" rx="4" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" stroke-width="1.5" />
    <text x="320" y="70" text-anchor="middle" fill="#38bdf8" font-size="12" font-family="monospace">
      nav#primary-menu ul.dropdown &gt; li a:hover
    </text>
  </svg>
  <div class="circuit-diagram-caption">Fig Q4: Compound Selector Specificity Parsing</div>
</div>

---

**Step-by-Step Solution:**
- Inline styles: \`0\`
- IDs (\`#primary-menu\`): \`1\` $\\implies 1 \\times 100$
- Classes & Pseudo-classes (\`.dropdown\`, \`:hover\`): \`2\` $\\implies 2 \\times 10$
- Elements / Tags (\`nav\`, \`ul\`, \`li\`, \`a\`): \`4\` $\\implies 4 \\times 1$

$$\\mathbf{\\text{Specificity} = (0, 1, 2, 4) = 0124}$$

<div class="example-answer-box">
🎯 Specificity Score = **0124** (or 124 points).
</div>
</example>

<example level="medium" title="Section B (2 Marks): CSS Box-Sizing Calculation">
**University Question (2 Marks):**
Calculate the total rendered width of a box with \`width: 200px\`, \`padding: 20px\`, and \`border: 5px\` under: (1) \`box-sizing: content-box\`, and (2) \`box-sizing: border-box\`.

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 640 150" width="100%" style="height:auto;" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="630" height="140" rx="8" fill="rgba(15,23,42,0.6)" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4 4" />
    <text x="320" y="24" text-anchor="middle" fill="#38bdf8" font-size="11" font-weight="bold">FIGURE Q8: BOX SIZING DIMENSIONAL PARAMETERS</text>
    
    <rect x="40" y="45" width="260" height="75" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" stroke-width="2" />
    <text x="170" y="70" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">content-box (Default)</text>
    <text x="170" y="90" text-anchor="middle" fill="#e2e8f0" font-size="9.5">Width=200 + Pad=40 + Bor=10 = 250px</text>
    
    <rect x="340" y="45" width="260" height="75" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="2" />
    <text x="470" y="70" text-anchor="middle" fill="#86efac" font-size="11" font-weight="bold">border-box (Reset)</text>
    <text x="470" y="90" text-anchor="middle" fill="#e2e8f0" font-size="9.5">Width clamped to exact 200px!</text>
  </svg>
  <div class="circuit-diagram-caption">Fig Q8: Box Sizing Model Physical Dimensions</div>
</div>

---

**Step-by-Step Solution:**
1. **\`content-box\`:** $\\text{Total} = 200 + 2(20) + 2(5) = 200 + 40 + 10 = \\mathbf{250\,\\text{px}}$.
2. **\`border-box\`:** $\\text{Total} = \\mathbf{200\,\\text{px}}$ (Content shrinks to $200 - 40 - 10 = 150\,\\text{px}$).

<div class="example-answer-box">
🎯 content-box: **250px** | border-box: **200px** (Prevents layout overflow).
</div>
</example>`
      }

    ]
  }
];
