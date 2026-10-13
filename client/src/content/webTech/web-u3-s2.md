### Structural Semantic Architecture of a Modern HTML5 Webpage

HTML5 introduces structural semantic elements that explicitly describe their meaning to both browser rendering engines and screen readers:

```
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
```

#### Detailed Definitions of Semantic Tags:
- **`<header>`:** Represents introductory content, branding logos, navigational search utilities, or author headings.
- **`<nav>`:** Encloses the major primary navigation blocks containing links to other pages or sections.
- **`<main>`:** Contains the central dominant content unique to that document; must not be duplicated inside headers or footers.
- **`<article>`:** A complete, self-contained composition that is independently distributable or reusable (e.g. blog post, news story).
- **`<section>`:** Represents a standalone thematic grouping of content, typically with its own heading (e.g. chapters, tabs).
- **`<aside>`:** Content tangentially related to the main content (e.g. sidebars, callout boxes, related article links).
- **`<footer>`:** Houses author information, copyright notices, terms of service, and back-to-top links.