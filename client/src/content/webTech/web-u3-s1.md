### 1. The Paradigm Shift: HTML4 Limitations vs. HTML5 Solutions

Ratified as an official W3C Recommendation in October 2014, **HTML5** modernized web development from a simple text formatting language into a robust application execution runtime.

| HTML4 Limitation | Problem Encountered | HTML5 Modern Solution |
| :--- | :--- | :--- |
| **Lack of Semantic Structure** | Heavy reliance on meaningless `<div id="nav">` and generic "div-soup". Screen readers could not parse document meaning. | Native structural semantic elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`). |
| **Plugin Vulnerabilities & Crashes** | Video and audio playback required proprietary browser plugins (Adobe Flash, Silverlight), causing crashes and severe security holes. | Native hardware-accelerated `<video>` and `<audio>` tags with multi-codec fallbacks and subtitle tracks. |
| **Inadequate Client-Side Storage** | Depended solely on 4KB HTTP Cookies transmitted across the network with every HTTP request header, causing network overhead. | Web Storage API (`localStorage` and `sessionStorage`) offering 5MB–10MB isolated client-side storage. |
| **No Native Graphics Rendering** | Drawing diagrams, charts, or game animations required complex Flash applets. | High-performance scriptable 2D raster drawing via the `<canvas>` API and native scalable vector graphics (`<svg>`). |
| **Poor Mobile & Error-Handling Discipline** | HTML4 lacked standardized rules for malformed markup, causing browsers to implement inconsistent parsing workarounds. | Strict standardized parsing algorithms, mobile-first responsive design, and offline capability via Service Workers. |