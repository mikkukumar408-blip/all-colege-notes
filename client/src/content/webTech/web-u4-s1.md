### 1. Introduction to Style Sheets & Specificity Calculation Formula

Cascading Style Sheets (CSS) describe the visual presentation and formatting of HTML documents, separating structural content from graphic design.

> 🟢 **The CSS Specificity Weight Matrix Formula:**
> When conflicting rules target the same element, browsers calculate a 4-part weight:
> $$mathbf{\text{Specificity} = (\text{Inline Style } [1000]) + (\text{IDs } [0100]) + (\text{Classes/Pseudo } [0010]) + (\text{Elements/Tags } [0001])}$$
> - `!important` overrides standard cascade weights and should be used with extreme caution.
> - **Inheritance:** Typography properties (`color`, `font-family`, `font-size`) inherit by default to child elements; Box Model properties (`margin`, `padding`, `border`, `width`) do NOT inherit.

---

### 2. Three Methods of Applying CSS

| Method | Syntax Location | Scope | Browser Caching & Reusability |
| :--- | :--- | :--- | :--- |
| **Inline CSS** | Inside element tag: `<p style="color: blue;">` | Strictly that single individual element. | **Worst practice.** Pollutes HTML; cannot be cached independently. |
| **Internal / Embedded** | Inside `<style>` tag in document `<head>` | Entire single HTML page. | Acceptable for standalone single pages; cannot be reused across other pages. |
| **External CSS** | In separate `.css` file linked via `<link rel="stylesheet">` | Styles entire multi-page application uniformly. | **Industry Standard.** Clean separation of concerns; cached by browser across all pages. |