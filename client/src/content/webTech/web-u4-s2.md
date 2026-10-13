### 1. Professional Typography in CSS

```css
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
```

---

### 2. CSS Color Gradients

```css
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
```