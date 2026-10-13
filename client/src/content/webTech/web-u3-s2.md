### Structural Semantic Architecture of a Modern HTML5 Webpage

HTML5 introduces structural semantic elements that explicitly describe their meaning to both browser rendering engines and screen readers:

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 680 250" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="670" height="240" rx="12" class="schematic-bg" fill="rgba(15,23,42,0.75)" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5 4" />
    <!-- <header> -->
    <rect x="25" y="16" width="630" height="36" rx="6" fill="rgba(30,58,138,0.85)" stroke="#60a5fa" stroke-width="1.8" />
    <text x="340" y="38" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="bold">&lt;header&gt; — Brand Logo, Site Title &amp; Global Search Utility</text>
    <!-- <nav> -->
    <rect x="25" y="58" width="630" height="30" rx="6" fill="rgba(15,118,110,0.85)" stroke="#2dd4bf" stroke-width="1.8" />
    <text x="340" y="77" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">&lt;nav&gt; — Primary Navigation Links: Home • Syllabus • Faculty • Exams</text>
    <!-- <main> -->
    <rect x="25" y="95" width="445" height="104" rx="8" fill="rgba(88,28,135,0.55)" stroke="#c084fc" stroke-width="2" />
    <text x="247" y="114" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="bold">&lt;main&gt; — Dominant Central Document Content</text>
    <!-- <article> & <section> inside <main> -->
    <rect x="40" y="124" width="200" height="64" rx="6" fill="rgba(88,28,135,0.9)" stroke="#e879f9" stroke-width="1.5" />
    <text x="140" y="148" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">&lt;article&gt;</text>
    <text x="140" y="166" text-anchor="middle" fill="#f5d0fe" font-size="9.5">Self-contained syndicatable post</text>
    <rect x="255" y="124" width="200" height="64" rx="6" fill="rgba(30,58,138,0.9)" stroke="#38bdf8" stroke-width="1.5" />
    <text x="355" y="148" text-anchor="middle" fill="#ffffff" font-size="11.5" font-weight="bold">&lt;section&gt;</text>
    <text x="355" y="166" text-anchor="middle" fill="#bae6fd" font-size="9.5">Thematic chapter grouping</text>
    <!-- <aside> -->
    <rect x="482" y="95" width="173" height="104" rx="8" fill="rgba(124,45,18,0.85)" stroke="#fb923c" stroke-width="1.8" />
    <text x="568" y="135" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="bold">&lt;aside&gt;</text>
    <text x="568" y="155" text-anchor="middle" fill="#fed7aa" font-size="10">Sidebar Callouts,</text>
    <text x="568" y="170" text-anchor="middle" fill="#fed7aa" font-size="10">Related Links &amp; Bio</text>
    <!-- <footer> -->
    <rect x="25" y="206" width="630" height="30" rx="6" fill="rgba(6,78,59,0.85)" stroke="#34d399" stroke-width="1.8" />
    <text x="340" y="225" text-anchor="middle" fill="#a7f3d0" font-size="11.5" font-weight="bold">&lt;footer&gt; — Copyright © 2026 MMU Mullana • Privacy Policy • Terms of Service</text>
  </svg>
</div>

#### Detailed Definitions of Semantic Tags:
- **`<header>`:** Represents introductory content, branding logos, navigational search utilities, or author headings.
- **`<nav>`:** Encloses the major primary navigation blocks containing links to other pages or sections.
- **`<main>`:** Contains the central dominant content unique to that document; must not be duplicated inside headers or footers.
- **`<article>`:** A complete, self-contained composition that is independently distributable or reusable (e.g. blog post, news story).
- **`<section>`:** Represents a standalone thematic grouping of content, typically with its own heading (e.g. chapters, tabs).
- **`<aside>`:** Content tangentially related to the main content (e.g. sidebars, callout boxes, related article links).
- **`<footer>`:** Houses author information, copyright notices, terms of service, and back-to-top links.