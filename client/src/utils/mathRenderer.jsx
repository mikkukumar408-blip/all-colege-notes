/* =========================================================================
   UNIVERSAL KATEX MATHEMATICAL RENDERING ENGINE (mathRenderer.jsx)
   =========================================================================
   Converts raw LaTeX formulas, pseudo-math strings, derivations, and mixed
   notes text into crisp, authentic KaTeX mathematical typesetting.
   ========================================================================= */

import React from 'react';
import katex from 'katex';

// High-Performance In-Memory String Caches (Eliminates repeated KaTeX parsing & regex executions)
const MAX_CACHE_SIZE = 2500;
const formulaCache = new Map();
const textCache = new Map();

function setCacheEntry(cache, key, value) {
  if (cache.size >= MAX_CACHE_SIZE) {
    // Evict oldest 500 entries to prevent memory buildup
    const it = cache.keys();
    for (let i = 0; i < 500; i++) {
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

  // 2. Normalize double-escaped keywords (\\\\frac -> \\frac)
  clean = clean.replace(/\\\\([a-zA-Z]+)/g, '\\$1');

  // 3. Fix missing backslashes on common mathematical symbols & operators
  clean = clean.replace(/(?<!\\)\b(cos|sin|tan|sec|csc|cot|sinh|cosh|tanh|ln|log|lim|rho|theta|lambda|mu|pi|sigma|omega|phi|psi|Delta|nabla|partial|implies|iff|pm|le|ge|ne|neq|times|cdot|approx|kappa|Gamma|alpha|beta|eta)\b/g, '\\$1');

  // 4. Common variable conventions in engineering (Vth -> V_{th}, Rth -> R_{th}, RL -> R_L, Pmax -> P_{\max})
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

  // 6. Fix simple square roots like \sqrt(L*C) or \sqrt(R^2 + ...) -> \sqrt{...}
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

function extractUnwrappedFractions(str, inlineMathBlocks) {
  let s = str;
  let safety = 0;
  while (safety++ < 60) {
    const idx = s.indexOf('\\frac{');
    if (idx === -1) break;
    const num = extractBalancedBraces(s, idx + 5);
    if (!num) break;
    const denStart = num.endIndex + 1;
    if (s[denStart] !== '{') break;
    const den = extractBalancedBraces(s, denStart);
    if (!den) break;

    const fullFrac = s.slice(idx, den.endIndex + 1);
    const rendered = renderKaTeXSafe(fullFrac, false);
    const placeholder = `\x00IM_${inlineMathBlocks.length}\x00`;
    inlineMathBlocks.push(`<span class="katex-inline-wrapper">${rendered}</span>`);
    s = s.slice(0, idx) + placeholder + s.slice(den.endIndex + 1);
  }
  return s;
}

function extractUnwrappedSqrt(str, inlineMathBlocks) {
  let s = str;
  let safety = 0;
  while (safety++ < 60) {
    const idx = s.indexOf('\\sqrt{');
    if (idx === -1) break;
    const body = extractBalancedBraces(s, idx + 5);
    if (!body) break;

    const fullSqrt = s.slice(idx, body.endIndex + 1);
    const rendered = renderKaTeXSafe(fullSqrt, false);
    const placeholder = `\x00IM_${inlineMathBlocks.length}\x00`;
    inlineMathBlocks.push(`<span class="katex-inline-wrapper">${rendered}</span>`);
    s = s.slice(0, idx) + placeholder + s.slice(body.endIndex + 1);
  }
  return s;
}

/**
 * Formats a block of text, detecting:
 * - $$display math$$
 * - $inline math$
 * - Unwrapped LaTeX expressions like \frac{...}{...}, \sqrt{...}, etc.
 * - Bold markdown (**text**)
 * - Line breaks (\n or \\n)
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
    .replace(/\\t/g, ' ')
    .trim();

  // 2. Extract $$...$$ display math blocks
  const displayMathBlocks = [];
  html = html.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
    const rendered = renderKaTeXSafe(math, true);
    const placeholder = `\x00DM_${displayMathBlocks.length}\x00`;
    displayMathBlocks.push(`<div class="katex-display-wrapper">${rendered}</div>`);
    return placeholder;
  });

  // 3. Extract $...$ inline math blocks
  const inlineMathBlocks = [];
  html = html.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    const rendered = renderKaTeXSafe(math, false);
    const placeholder = `\x00IM_${inlineMathBlocks.length}\x00`;
    inlineMathBlocks.push(`<span class="katex-inline-wrapper">${rendered}</span>`);
    return placeholder;
  });

  // 4. Extract unwrapped balanced-brace \frac{...}{...}
  html = extractUnwrappedFractions(html, inlineMathBlocks);

  // 5. Extract unwrapped balanced-brace \sqrt{...}
  html = extractUnwrappedSqrt(html, inlineMathBlocks);

  // 6. Standalone LaTeX math symbols & operators outside $...$
  html = html.replace(/\\(approx|propto|implies|to|pm|mp|times|cdot|neq|le|ge|ll|gg|alpha|beta|gamma|delta|epsilon|theta|lambda|mu|pi|rho|sigma|tau|phi|psi|omega|Delta|Phi|Omega|sum|int|infty|parallel|degree)\b/g, (match) => {
    const rendered = renderKaTeXSafe(match, false);
    const placeholder = `\x00IM_${inlineMathBlocks.length}\x00`;
    inlineMathBlocks.push(`<span class="katex-inline-wrapper">${rendered}</span>`);
    return placeholder;
  });

  // 7. Format Markdown Bold **bold** and Italics *italic*
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong style="color: #67e8f9; font-weight: 700;">$1</strong>');
  html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');

  // 8. Numbered list formatting: ensure clear visual separation
  // Add extra spacing before numbered items (e.g. \n2. or \n(b))
  html = html.replace(/\n(?=(\d+[\.\)]|\([a-z0-9]+\))\s+)/gi, '\n\n');
  
  // Format double newlines into margin-spaced blocks
  html = html.replace(/\n{2,}/g, '<div style="margin-top: 10px;"></div>');
  html = html.replace(/\n/g, '<br />');

  // 9. Restore inline and display math blocks
  inlineMathBlocks.forEach((rendered, i) => {
    html = html.replace(`\x00IM_${i}\x00`, rendered);
  });

  displayMathBlocks.forEach((rendered, i) => {
    html = html.replace(`\x00DM_${i}\x00`, rendered);
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
