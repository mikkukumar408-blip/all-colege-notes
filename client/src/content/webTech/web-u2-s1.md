### 1. Professional Website Engineering Lifecycle (SDLC)

Building enterprise web platforms requires systematic adherence to an 8-stage lifecycle:

| SDLC Stage | Engineering Phase | Core Deliverables & Technical Activities |
| :--- | :--- | :--- |
| **Stage 1** | **Planning & Feasibility** | Define Software Requirements Specification (SRS), user personas, scope, and hosting budget. |
| **Stage 2** | **UI/UX Wireframing & Design** | Information Architecture (IA) sitemaps, user journeys, and interactive Figma prototypes. |
| **Stage 3** | **Frontend Client Engineering** | Semantic HTML5 DOM structure, responsive mobile-first CSS3 layouts, and JS interactivity. |
| **Stage 4** | **Backend API & Database** | Server-side business logic (Node.js/Python/Java), SQL/NoSQL schema modeling, and REST APIs. |
| **Stage 5** | **QA & Security Testing** | Cross-browser testing, WCAG accessibility audits, OWASP Top-10 security checks, and unit tests. |
| **Stage 6** | **Domain & DNS Provisioning** | ICANN registrar domain registration and authoritative DNS zone records (`A`, `AAAA`, `CNAME`). |
| **Stage 7** | **CI/CD & Cloud Deployment** | Automated build pipelines (GitHub Actions) deploying to cloud VPS, Kubernetes, or edge CDNs. |
| **Stage 8** | **Maintenance & SEO Audits** | Real-time uptime telemetry, security patching, automated DB backups, and Core Web Vitals SEO. |

---

### 2. Website Hosting Architectures

1. **Shared Hosting:** Multiple customer websites reside on a single physical server machine, sharing CPU, RAM, and web server software. Low cost, but vulnerable to neighboring resource spikes ("noisy neighbor" problem).
2. **Virtual Private Server (VPS):** A physical server partitioned via hardware hypervisors (KVM) into dedicated virtual slices. Each VPS runs its own isolated operating system kernel with dedicated RAM and CPU guarantees.
3. **Dedicated Server Hosting:** An entire physical computer hardware machine leased exclusively to one organization. Maximum security and compute power; requires dedicated systems administration.
4. **Cloud & Edge CDN Hosting:** Web applications deployed across elastic distributed cloud instances (AWS, Google Cloud) with static assets cached worldwide at edge Point of Presence (PoP) locations for sub-millisecond global delivery.