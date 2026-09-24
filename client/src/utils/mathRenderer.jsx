/* =========================================================================
   UNIVERSAL KATEX MATHEMATICAL RENDERING ENGINE (mathRenderer.jsx)
   =========================================================================
   Converts raw LaTeX formulas, pseudo-math strings, derivations, and mixed
   notes text into crisp, authentic KaTeX mathematical typesetting.
   ========================================================================= */

import React from 'react';
import katex from 'katex';

/**
 * Normalizes and safely renders LaTeX mathematics using KaTeX.
 * Prevents throwing errors on malformed input by falling back gracefully.
 */
export function renderKaTeXSafe(rawFormula, isDisplay = false) {
  if (!rawFormula || typeof rawFormula !== 'string') return '';
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
      return rendered;
    }
  } catch (e) {
    // ignore
  }

  // Second pass: sanitize and render
  try {
    const fallbackClean = clean.replace(/[\x00-\x1F\x7F]/g, ' ');
    return katex.renderToString(fallbackClean, {
      displayMode: isDisplay,
      throwOnError: false,
      strict: 'ignore'
    });
  } catch (e) {
    return `<code>${clean}</code>`;
  }
}

/**
 * Formats a block of text, detecting:
 * - $$display math$$
 * - $inline math$
 * - Unwrapped LaTeX expressions like \frac{...}{...}, \sqrt{...}, etc.
 * - Bold markdown (**text**)
 * - Line breaks (\n)
 */
export function formatMathText(text) {
  if (!text || typeof text !== 'string') return '';

  let html = text;

  // 1. Extract $$...$$ display math blocks
  const displayMathBlocks = [];
  html = html.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
    const rendered = renderKaTeXSafe(math, true);
    const placeholder = `\x00DM_${displayMathBlocks.length}\x00`;
    displayMathBlocks.push(`<div class="katex-display-wrapper">${rendered}</div>`);
    return placeholder;
  });

  // 2. Extract $...$ inline math blocks
  const inlineMathBlocks = [];
  html = html.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    const rendered = renderKaTeXSafe(math, false);
    const placeholder = `\x00IM_${inlineMathBlocks.length}\x00`;
    inlineMathBlocks.push(`<span class="katex-inline-wrapper">${rendered}</span>`);
    return placeholder;
  });

  // 3. Extract unwrapped \frac{...}{...}
  let fracSafety = 0;
  while (/\\frac\{([^{}]+)\}\{([^{}]+)\}/.test(html) && fracSafety < 20) {
    fracSafety++;
    html = html.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, (match) => {
      const rendered = renderKaTeXSafe(match, false);
      const placeholder = `\x00IM_${inlineMathBlocks.length}\x00`;
      inlineMathBlocks.push(`<span class="katex-inline-wrapper">${rendered}</span>`);
      return placeholder;
    });
  }

  // 4. Extract unwrapped \sqrt{...}
  let sqrtSafety = 0;
  while (/\\sqrt\{([^{}]+)\}/.test(html) && sqrtSafety < 20) {
    sqrtSafety++;
    html = html.replace(/\\sqrt\{([^{}]+)\}/g, (match) => {
      const rendered = renderKaTeXSafe(match, false);
      const placeholder = `\x00IM_${inlineMathBlocks.length}\x00`;
      inlineMathBlocks.push(`<span class="katex-inline-wrapper">${rendered}</span>`);
      return placeholder;
    });
  }

  // 5. Convert common standalone formulas with equal sign and math tokens if they contain \ or ^ or _
  // e.g. "R_L = R_{th} \implies P_{\max} = \frac{V_{th}^2}{4 R_{th}}"
  if (/(?:\\implies|\\frac|\\sqrt|\\sum|\\int|\\cdot|\^\{|\\omega|\\pi|\\alpha|\\beta)/.test(html)) {
    // If the entire string is basically a formula without sentences
    if (!html.includes(' ') || /^[A-Za-z0-9_\(\)\s\+\-\*\/=,\\^{}\\]+$/.test(html)) {
      const rendered = renderKaTeXSafe(html, false);
      return rendered;
    }
  }

  // 6. Format Markdown Bold **bold**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // 7. Format line breaks
  html = html.replace(/\n/g, '<br />');

  // 8. Restore inline and display math blocks
  inlineMathBlocks.forEach((rendered, i) => {
    html = html.replace(`\x00IM_${i}\x00`, rendered);
  });

  displayMathBlocks.forEach((rendered, i) => {
    html = html.replace(`\x00DM_${i}\x00`, rendered);
  });

  return html;
}

/**
 * React Component to render pure mathematical formula with KaTeX
 */
export function MathFormula({ formula, isDisplay = false, className = '', style = {} }) {
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
}

/**
 * React Component to render mixed prose containing KaTeX math, derivations, and definitions
 */
export function MathText({ text, className = '', style = {}, as: Component = 'div' }) {
  if (!text) return null;
  const formattedHtml = formatMathText(text);

  return (
    <Component
      className={`math-text-container ${className}`}
      style={{ lineHeight: 1.6, ...style }}
      dangerouslySetInnerHTML={{ __html: formattedHtml }}
    />
  );
}

export default MathFormula;
