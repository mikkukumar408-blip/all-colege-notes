/* =========================================================================
   UNIVERSAL KATEX MATHEMATICAL RENDERING ENGINE (mathRenderer.jsx)
   =========================================================================
   Converts raw LaTeX formulas, pseudo-math strings, derivations, and mixed
   notes text into crisp, authentic KaTeX mathematical typesetting.
   Eliminates all raw symbols (^, _, $, {, }, \, etc.) from student view.
   ========================================================================= */

import React from 'react';
import katex from 'katex';

// High-Performance In-Memory String Caches (Eliminates repeated KaTeX parsing & regex executions)
const MAX_CACHE_SIZE = 3000;
const formulaCache = new Map();
const textCache = new Map();

function setCacheEntry(cache, key, value) {
  if (cache.size >= MAX_CACHE_SIZE) {
    const it = cache.keys();
    for (let i = 0; i < 600; i++) {
      const nextKey = it.next().value;
      if (nextKey !== undefined) cache.delete(nextKey);
      else break;
    }
  }
  cache.set(key, value);
}

/**
 * Normalizes and safely renders LaTeX mathematics using KaTeX.
 * Prevents throwing errors on malformed input by falling back gracefully.
 */
export function renderKaTeXSafe(rawFormula, isDisplay = false) {
  if (!rawFormula || typeof rawFormula !== 'string') return '';
  const cacheKey = `${isDisplay ? 'D:' : 'I:'}${rawFormula}`;
  if (formulaCache.has(cacheKey)) {
    return formulaCache.get(cacheKey);
  }

  let clean = rawFormula.trim();

  // Strip outer dollar signs if passed as $formula$ or $$formula$$
  clean = clean.replace(/^\$\$([\s\S]*)\$\$$/, '$1').replace(/^\$([\s\S]*)\$$/, '$1').trim();

  // 1. Fix JS string literal escape corruption:
  clean = clean.replace(/\x0crac/g, '\\frac');
  clean = clean.replace(/\x0cf/g, '\\f');
  clean = clean.replace(/\x0c/g, '');
  clean = clean.replace(/\x0dight/g, '\\right');
  clean = clean.replace(/\x0dho/g, '\\rho');
  clean = clean.replace(/\x0d/g, '');
  clean = clean.replace(/\x08egin/g, '\\begin');
  clean = clean.replace(/\x08ar/g, '\\bar');
  clean = clean.replace(/\x08/g, '');
  clean = clean.replace(/\x09ext/g, '\\text');
  clean = clean.replace(/\x09/g, ' ');
  clean = clean.replace(/\x0bec/g, '\\vec');
  clean = clean.replace(/\x0b/g, ' ');
  clean = clean.replace(/⬆rac/g, '\\frac');

  // Auto-repair broken escaped tokens
  clean = clean.replace(/(?<=\d|\s|^|[,\(\[])ext\{/g, '\\text{');
  clean = clean.replace(/(?<=\d|\s|^|[,\(\[])imes\b/g, '\\times');
  clean = clean.replace(/\\sin\s+heta/g, '\\sin\\theta');
  clean = clean.replace(/\\cos\s+heta/g, '\\cos\\theta');
  clean = clean.replace(/d\s*heta/g, 'd\\theta');

  // 2. Normalize double-escaped keywords (\\\\frac -> \\frac)
  clean = clean.replace(/\\\\([a-zA-Z]+)/g, '\\$1');

  // 3. Fix missing backslashes on common mathematical symbols & operators
  clean = clean.replace(/(?<!\\)\b(cos|sin|tan|sec|csc|cot|sinh|cosh|tanh|ln|log|lim|rho|theta|lambda|mu|pi|sigma|omega|phi|psi|Delta|nabla|partial|implies|iff|pm|le|ge|ne|neq|times|cdot|approx|kappa|Gamma|alpha|beta|eta)\b/g, '\\$1');

  // 4. Common variable conventions in engineering
  clean = clean.replace(/\bVth\b/g, 'V_{th}');
  clean = clean.replace(/\bRth\b/g, 'R_{th}');
  clean = clean.replace(/\bRL\b/g, 'R_L');
  clean = clean.replace(/\bPmax\b/g, 'P_{\\max}');
  clean = clean.replace(/\bP_L\b/g, 'P_L');
  clean = clean.replace(/\bI_sc\b/g, 'I_{sc}');
  clean = clean.replace(/\bV_oc\b/g, 'V_{oc}');
  clean = clean.replace(/\bX_L\b/g, 'X_L');
  clean = clean.replace(/\bX_C\b/g, 'X_C');
  clean = clean.replace(/\bomega_0\b/g, '\\omega_0');

  // 5. Arrow corrections
  clean = clean.replace(/->/g, '\\rightarrow ');
  clean = clean.replace(/=>/g, '\\implies ');
  clean = clean.replace(/·/g, '\\cdot ');

  // 6. Fix simple square roots like \sqrt(L*C) -> \sqrt{L*C}
  clean = clean.replace(/\\sqrt\(([^)]+)\)/g, '\\sqrt{$1}');

  try {
    const rendered = katex.renderToString(clean, {
      displayMode: isDisplay,
      throwOnError: false,
      strict: 'ignore'
    });
    if (!rendered.includes('katex-error')) {
      setCacheEntry(formulaCache, cacheKey, rendered);
      return rendered;
    }
  } catch (e) {
    // ignore
  }

  // Second pass: sanitize and render
  try {
    const fallbackClean = clean.replace(/[\x00-\x1F\x7F]/g, ' ');
    const rendered = katex.renderToString(fallbackClean, {
      displayMode: isDisplay,
      throwOnError: false,
      strict: 'ignore'
    });
    setCacheEntry(formulaCache, cacheKey, rendered);
    return rendered;
  } catch (e) {
    const fallback = `<code>${clean}</code>`;
    setCacheEntry(formulaCache, cacheKey, fallback);
    return fallback;
  }
}

function extractBalancedBraces(str, startIndex) {
  if (startIndex >= str.length || str[startIndex] !== '{') return null;
  let depth = 0;
  for (let i = startIndex; i < str.length; i++) {
    if (str[i] === '{') depth++;
    else if (str[i] === '}') {
      depth--;
      if (depth === 0) {
        return {
          content: str.slice(startIndex + 1, i),
          endIndex: i
        };
      }
    }
  }
  return null;
}

/**
 * Formats a block of text, detecting:
 * - $$display math$$
 * - $inline math$
 * - Unwrapped LaTeX expressions like \frac{...}{...}, \sqrt{...}, etc.
 * - Subscripted variables like V_{dc}, V_{rms}, I_L, R_{th}, I_{ph}
 * - Bold markdown (**text**)
 * - Numbered lists (1. , 2. ) with proper paragraph spacing
 */
export function formatMathText(text) {
  if (!text || typeof text !== 'string') return '';
  if (textCache.has(text)) {
    return textCache.get(text);
  }

  // 1. Sanitize & Normalize line breaks and escaped characters
  let html = text
    .replace(/\r\n/g, '\n')
    .replace(/\\r\\n/g, '\n')
    // Convert literal \n when not a LaTeX command starting with \n
    .replace(/\\n(?!(?:abla|eq|e\b|eg\b|otin|u\b|atural|earrow|warrow|obreak|olimits|norm|normalsize|null|phantom|space))/g, '\n')
    .replace(/\t/g, ' ')
    // Protect \text, \times, \theta, \tau, \tan, \to from having \t stripped
    .replace(/\\t(?!(?:ext|imes|heta|au|an|o\b|riangle|ilde))/g, ' ')
    .trim();

  // 2. Auto-repair broken escaped tokens
  html = html.replace(/(?<=\d|\s|^|[,\(\[])ext\{/g, '\\text{');
  html = html.replace(/(?<=\d|\s|^|[,\(\[])imes\b/g, '\\times');
  html = html.replace(/\\sin\s+heta/g, '\\sin\\theta');
  html = html.replace(/\\cos\s+heta/g, '\\cos\\theta');
  html = html.replace(/d\s*heta/g, 'd\\theta');
  html = html.replace(/\\sin\s*\(?heta\)?/g, '\\sin\\theta');
  html = html.replace(/\\cos\s*\(?heta\)?/g, '\\cos\\theta');

  // Convert raw \text{ ... } units in text (like "1.667 \text{ A}") to clean text "1.667 A"
  html = html.replace(/\\text\{\s*([^{}]+)\s*\}/g, '$1');

  const mathBlocks = [];
  function addBlock(rendered, isDisplay = false) {
    const key = `\x00M_${mathBlocks.length}\x00`;
    mathBlocks.push(isDisplay ? `<div class="katex-display-wrapper">${rendered}</div>` : `<span class="katex-inline-wrapper">${rendered}</span>`);
    return key;
  }

  // 3. Extract $$...$$ display math blocks
  html = html.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
    return addBlock(renderKaTeXSafe(math, true), true);
  });

  // 4. Extract $...$ inline math blocks
  html = html.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    return addBlock(renderKaTeXSafe(math, false), false);
  });

  // 5. Extract unwrapped \sqrt{...} with balanced braces FIRST (so nested \frac inside \sqrt renders as a single KaTeX unit)
  let sqrtSafety = 0;
  while (sqrtSafety++ < 40) {
    const idx = html.indexOf('\\sqrt{');
    if (idx === -1) break;
    const body = extractBalancedBraces(html, idx + 5);
    if (!body) break;
    const fullSqrt = html.slice(idx, body.endIndex + 1);
    const rendered = renderKaTeXSafe(fullSqrt, false);
    html = html.slice(0, idx) + addBlock(rendered, false) + html.slice(body.endIndex + 1);
  }

  // 6. Extract unwrapped \frac{...}{...} with balanced braces
  let fracSafety = 0;
  while (fracSafety++ < 40) {
    const idx = html.indexOf('\\frac{');
    if (idx === -1) break;
    const num = extractBalancedBraces(html, idx + 5);
    if (!num) break;
    const denStart = num.endIndex + 1;
    if (html[denStart] !== '{') break;
    const den = extractBalancedBraces(html, denStart);
    if (!den) break;
    const fullFrac = html.slice(idx, den.endIndex + 1);
    const rendered = renderKaTeXSafe(fullFrac, false);
    html = html.slice(0, idx) + addBlock(rendered, false) + html.slice(den.endIndex + 1);
  }

  // 6. Numbers with Ohm unit: 10 \Omega, 12\Omega, 10 \,\Omega (Run BEFORE standalone Greek letters)
  html = html.replace(/(\d+(?:\.\d+)?)\s*(?:\\,|\\ )?(?:\\Omega|Ω)\b/g, (_, num) => {
    return addBlock(renderKaTeXSafe(`${num}\\,\\Omega`, false), false);
  });

  // 7. Degree notations like 30^\circ or (30^\circ)
  html = html.replace(/(\d+(?:\.\d+)?)\s*(?:\^\{?\\circ\}?|\\circ)/g, (_, num) => {
    return addBlock(renderKaTeXSafe(`${num}^\\circ`, false), false);
  });

  // 8. Trigonometric & function applications: \cos(30^\circ), \cos\phi, \sin\theta, etc.
  html = html.replace(/\\(cos|sin|tan|sec|csc|cot|ln|log)\s*(?:\(?\s*\\?[a-zA-Z0-9\^\circ\_\{\}]+\s*\)?|[a-zA-Z0-9\\]+)/g, (match) => {
    return addBlock(renderKaTeXSafe(match, false), false);
  });

  // 9. Subscripted variables: V_{dc}, V_{rms}, I_L, R_th, I_{ph}, V_L, etc. (No trailing \b so V_{dc}, works)
  html = html.replace(/\b([A-Za-z]+)_(?:\{([^{}]+)\}|([a-zA-Z0-9]+))(?=[^a-zA-Z0-9_]|$)/g, (match) => {
    return addBlock(renderKaTeXSafe(match, false), false);
  });

  // 10. Exponents: 10^{-3}, 10^6, x^2, (1.11)^2
  html = html.replace(/(\b[A-Za-z0-9]+|\([^\(\)]+\))\^(?:\{([^{}]+)\}|([0-9a-zA-Z\+\-]+))(?=[^a-zA-Z0-9_\^]|$)/g, (match) => {
    return addBlock(renderKaTeXSafe(match, false), false);
  });

  // 11. Standalone Greek letters & math symbols: \eta, \gamma, \Delta, \Omega, \times, \cdot, etc.
  html = html.replace(/\\(eta|gamma|Delta|Omega|alpha|beta|theta|phi|psi|lambda|mu|pi|sigma|omega|tau|epsilon|cdot|times|approx|ne|neq|le|ge|pm|infty|parallel|to|implies|iff)\b/g, (match) => {
    return addBlock(renderKaTeXSafe(match, false), false);
  });

  // 12. Clean up any stray thin spaces \, outside of math
  html = html.replace(/\\,/g, ' ');

  // 13. Format Markdown Bold **bold** and Italics *italic*
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong style="color: #67e8f9; font-weight: 700;">$1</strong>');
  html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');

  // 12. Numbered list formatting: ensure clear visual separation
  html = html.replace(/\n(?=(\d+[\.\)]|\([a-z0-9]+\))\s+)/gi, '\n\n');
  html = html.replace(/\n{2,}/g, '<div style="margin-top: 10px;"></div>');
  html = html.replace(/\n/g, '<br />');

  // 13. Restore math blocks
  mathBlocks.forEach((rendered, i) => {
    html = html.replace(`\x00M_${i}\x00`, rendered);
  });

  setCacheEntry(textCache, text, html);
  return html;
}

/**
 * React Component to render pure mathematical formula with KaTeX (Memoized for max 60fps performance)
 */
export const MathFormula = React.memo(function MathFormula({ formula, isDisplay = false, className = '', style = {} }) {
  if (!formula) return null;
  const renderedHtml = renderKaTeXSafe(formula, isDisplay);

  return (
    <span
      className={`katex-formula-container ${className}`}
      style={{
        display: isDisplay ? 'block' : 'inline-block',
        verticalAlign: 'middle',
        ...style
      }}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
});

/**
 * React Component to render mixed prose containing KaTeX math, derivations, and definitions (Memoized)
 */
export const MathText = React.memo(function MathText({ text, className = '', style = {}, as: Component = 'div' }) {
  if (!text) return null;
  const formattedHtml = formatMathText(text);

  return (
    <Component
      className={`math-text-container ${className}`}
      style={{ lineHeight: 1.6, ...style }}
      dangerouslySetInnerHTML={{ __html: formattedHtml }}
    />
  );
});

export default MathFormula;
