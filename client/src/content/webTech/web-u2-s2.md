### Exhaustive Comparison: Static vs. Dynamic Websites

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
| **11** | **File Extensions** | Files saved strictly as `.html` or `.htm`. | Files historically saved as `.php`, `.jsp`, `.aspx`, or routed URL endpoints. |
| **12** | **Real-World Examples** | Personal portfolios, restaurant menus, product documentation, brochures. | Amazon, Facebook, Netflix, University ERP systems, Net-Banking portals. |