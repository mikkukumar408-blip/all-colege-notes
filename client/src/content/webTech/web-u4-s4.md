### 1. The `display` Property

- **`display: block`:** Takes up the full available line width; breaks onto a new line (e.g. `<div>`, `<p>`, `<h1>`).
- **`display: inline`:** Takes up only content width; does not force line breaks; ignores top/bottom margins (e.g. `<span>`, `<a>`).
- **`display: inline-block`:** Flows inline like text, but accepts custom `width`, `height`, and vertical `padding`.
- **`display: none`:** Removes element completely from rendering tree (contrast with `visibility: hidden` which hides pixels but preserves the blank space).

---

### 2. Visual Comparison of the 5 CSS Positioning Schemes

| Scheme | Origin / Reference Anchor | Document Flow Impact | Typical Use Case |
| :--- | :--- | :--- | :--- |
| **`static`** | Normal document flow | Default sequential flow; ignores `top`, `left`, `z-index`. | Default flow elements. |
| **`relative`** | Its own original position | Preserves original layout space; nudged via offsets. | Parent anchor for absolute children. |
| **`absolute`** | Nearest positioned (non-static) ancestor | Removed completely from flow; zero space reserved. | Dropdown menus, tooltips, modal dialogs. |
| **`fixed`** | Browser viewport window | Removed from flow; locked in place during page scroll. | Sticky headers, back-to-top buttons. |
| **`sticky`** | Normal flow until scroll threshold | Acts relative until threshold, then locks fixed. | Sticky table column headers, directory alphabets. |

---

### 3. Floating Elements, Micro-Clearfix & Zebra Tables

```css
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
```