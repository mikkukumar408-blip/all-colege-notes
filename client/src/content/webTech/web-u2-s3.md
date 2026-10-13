### 1. Fundamental Structure of an HTML Webpage

Every valid modern HTML5 document conforms to the following skeleton:

```html
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
```

#### Key Document Structure Tags Explained:
- **`<!DOCTYPE html>`:** Directs the browser rendering engine to parse the document according to modern HTML5 standards, preventing quirks mode.
- **`<html lang="en">`:** The root wrapper element; `lang="en"` declares the primary human language for accessibility screen readers.
- **`<head>`:** Houses metadata, external stylesheets, fonts, and scripts not directly painted on the visual canvas.
- **`<meta charset="UTF-8">`:** Specifies Unicode character encoding covering worldwide languages and symbols.
- **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`:** Critical for responsive mobile design; sets page width to match device screen width.
- **`<title>`:** Page title displayed on the browser tab and indexed by search engine spiders.
- **`<body>`:** Encloses all visible elements (headings, text, graphics, tables, links, media).

---

### 2. Core HTML Tags & Formatting Elements

#### A. Headings, Paragraphs, Line Breaks & Rules:
```html
<h1>Heading 1 (Main Document Title)</h1>
<h2>Heading 2 (Major Unit Header)</h2>
<h3>Heading 3 (Sub-Topic Header)</h3>
<p>Paragraph tag defines standard blocks of body text.<br>The br tag forces an immediate line break.</p>
<hr> <!-- Horizontal thematic break rule -->
```

#### B. Text Styles & Semantic Elements:
- **`<b>` vs. `<strong>`:** `<b>` provides visual bolding; `<strong>` conveys semantic importance for screen readers.
- **`<i>` vs. `<em>`:** `<i>` italicizes text visually; `<em>` indicates emphasized semantic stress.
- **`<mark>`:** Highlights text with a yellow background.
- **`<del>` and `<ins>`:** Represents deleted (strikethrough) and inserted (underlined) text.
- **`<sup>` and `<sub>`:** Superscripts ($x²$) and Subscripts ($H_2O$).

#### C. Ordered, Unordered, and Definition Lists:
```html
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
```