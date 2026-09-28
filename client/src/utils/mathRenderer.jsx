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
  clean = clean.replace(/,\s*\\*text\{/g, '\\,\\text{');
  clean = clean.replace(/,\s*\\*(?:Omega|Ω)\b/g, '\\,\\Omega');
  clean = clean.replace(/(?<=\d|\s|^|[,\(\[])ext\{/g, '\\text{');
  clean = clean.replace(/(?<=\d|\s|^|[,\(\[])imes\b/g, '\\times');
  clean = clean.replace(/\\sin\s+heta/g, '\\sin\\theta');
  clean = clean.replace(/\\cos\s+heta/g, '\\cos\\theta');
  clean = clean.replace(/d\s*heta/g, 'd\\theta');

  // 2. Normalize double-escaped keywords (\\\\frac -> \\frac)
  clean = clean.replace(/\\\\([a-zA-Z]+)/g, '\\$1');

  // Fix augmented matrix notation [A | I] -> [A \mid I] or [A | B]
  clean = clean.replace(/\[\s*([A-Za-z0-9])\s*\|\s*([A-Za-z0-9])\s*\]/g, '[$1 \\mid $2]');

  // 3. Fix missing backslashes on common mathematical symbols & operators
  clean = clean.replace(/(?<!\\)\b(cos|sin|tan|sec|csc|cot|sinh|cosh|tanh|ln|log|lim|rho|theta|lambda|mu|pi|sigma|omega|phi|psi|Delta|nabla|partial|implies|iff|pm|le|ge|ne|neq|times|cdot|approx|kappa|Gamma|alpha|beta|eta|zeta|xi|tau|epsilon|oint|iint|sum|prod)\b/g, '\\$1');

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
  clean = clean.replace(/(?<![\\-])->/g, '\\to ');
  clean = clean.replace(/(?<![\\=])=>/g, '\\implies ');
  clean = clean.replace(/·/g, '\\cdot ');

  // 6. Fix simple square roots like \sqrt(L*C) -> \sqrt{L*C}
  clean = clean.replace(/\\sqrt\(([^)]+)\)/g, '\\sqrt{$1}');

  // Strip trailing punctuation attached to formula end (e.g. "A = \begin{bmatrix}...\end{bmatrix}.")
  clean = clean.replace(/[\.,;:]+$/, '');

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
 * - LaTeX environments like \begin{bmatrix}, \begin{vmatrix}, \begin{cases}, etc.
 * - Row operations (R_1 \leftrightarrow R_2, R_2 \to R_2 - 2R_1)
 * - Matrix powers (A^{-1}, A^8, 5I, 25I, I_3)
 * - Unwrapped mathematical equations and derivations
 * - Subscripted variables like V_{dc}, V_{rms}, I_L, y_1, y_2
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

  // Auto-detect and wrap unadorned C/C++ code blocks starting with #include
  if (!html.includes('```') && html.includes('#include')) {
    html = html.replace(/(#include\s*<[^\n]+>[\s\S]*?)(?=(?:\n\s*(?:Trace|Output|Explanation|Marking|Complexit|Sample Run)|$))/i, (match) => {
      return `\`\`\`c\n${match.trim()}\n\`\`\``;
    });
  }

  // Protect C/C++ #include <header.h> from being parsed as unclosed HTML elements
  html = html.replace(/#include\s*<([^>]+)>/g, '#include &lt;$1&gt;');
  html = html.replace(/<([a-zA-Z0-9_\.]+\.h)>/g, '&lt;$1&gt;');

  // Protect Markdown code blocks ```lang ... ```
  const codePlaceholders = [];
  html = html.replace(/```([a-zA-Z0-9_]*)\n?([\s\S]*?)```/g, (match, lang, code) => {
    const key = `@@@ACN_CODE_${codePlaceholders.length}@@@`;
    const isTerminal = ['terminal', 'output', 'text', 'sh', 'bash', 'console'].includes((lang || '').toLowerCase());
    const escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    let blockHtml = '';
    if (isTerminal) {
      blockHtml = `<div class="terminal-editor-box" style="margin: 14px 0; border: 1px solid rgba(16, 185, 129, 0.35); border-radius: 8px; overflow: hidden; background: #030712; box-shadow: 0 4px 16px rgba(0,0,0,0.6);">
        <div style="display:flex; justify-content:space-between; align-items:center; padding: 6px 12px; background: rgba(6, 78, 59, 0.4); border-bottom: 1px solid rgba(16, 185, 129, 0.2);">
          <div style="display:flex; gap:6px; align-items:center;">
            <span style="width:8px; height:8px; border-radius:50%; background:#10b981; display:inline-block;"></span>
            <span style="font-size:0.75rem; color:#6ee7b7; font-family:monospace; font-weight:700;">💻 Terminal Execution &amp; Output</span>
          </div>
          <span style="font-size:0.68rem; color:#34d399; font-weight:700; text-transform:uppercase;">CLI TRACE</span>
        </div>
        <div style="padding: 12px 14px; font-family: 'Fira Code', Consolas, Monaco, monospace; font-size: 0.82rem; line-height: 1.55; overflow-x: auto; background: #030712; color: #a7f3d0;">
          <pre style="margin:0; white-space:pre; font-family:inherit;"><code>${escapedCode}</code></pre>
        </div>
      </div>`;
    } else {
      const codeLines = escapedCode.split('\n');
      const lineGutter = codeLines.map((_, i) => `<div style="color: #475569; user-select: none; text-align: right; padding-right: 12px; font-size: 0.78rem;">${i + 1}</div>`).join('');
      const formattedLines = codeLines.map(line => `<div style="white-space: pre;">${line || ' '}</div>`).join('');
      
      const fileBadge = lang ? (lang === 'c' ? 'solution.c' : (lang === 'cpp' ? 'solution.cpp' : (lang === 'py' || lang === 'python' ? 'solution.py' : (lang === 'java' ? 'Solution.java' : `solution.${lang}`)))) : 'solution.c';
      const langBadge = lang ? (lang === 'c' ? 'C11 STANDARD' : (lang === 'cpp' ? 'C++17' : lang.toUpperCase())) : 'C SOURCE';

      blockHtml = `<div class="code-editor-box" style="margin: 14px 0; border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 8px; overflow: hidden; background: #070c14; box-shadow: 0 6px 24px rgba(0,0,0,0.6);">
        <div style="display:flex; justify-content:space-between; align-items:center; padding: 7px 14px; background: rgba(15, 23, 42, 0.95); border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
          <div style="display:flex; gap:6px; align-items:center;">
            <span style="width:10px; height:10px; border-radius:50%; background:#ff5f56; display:inline-block;"></span>
            <span style="width:10px; height:10px; border-radius:50%; background:#ffbd2e; display:inline-block;"></span>
            <span style="width:10px; height:10px; border-radius:50%; background:#27c93f; display:inline-block;"></span>
            <span style="font-size:0.75rem; color:#94a3b8; font-family:monospace; margin-left:8px; font-weight:600;">📁 ${fileBadge}</span>
          </div>
          <span style="font-size:0.7rem; color:#00f0ff; font-weight:800; letter-spacing:0.05em; text-transform:uppercase;">${langBadge}</span>
        </div>
        <div style="display:flex; padding: 12px 14px; font-family: 'Fira Code', Consolas, Monaco, monospace; font-size: 0.83rem; line-height: 1.6; overflow-x: auto; background: #070c14;">
          <div style="min-width: 28px; border-right: 1px solid rgba(255, 255, 255, 0.1); margin-right: 14px;">
            ${lineGutter}
          </div>
          <div style="color: #e2e8f0; font-family: inherit; flex: 1;">
            ${formattedLines}
          </div>
        </div>
      </div>`;
    }

    codePlaceholders.push({ key, html: blockHtml });
    return key;
  });

  const mathBlocks = [];

  function addBlock(rawLatex, isDisplay = false) {
    const key = `@@@ACN_MATH_${mathBlocks.length}@@@`;
    const cleanRaw = rawLatex.trim();
    const rendered = renderKaTeXSafe(cleanRaw, isDisplay);
    const htmlWrapper = isDisplay
      ? `<div class="katex-display-wrapper" style="margin: 8px 0; overflow-x: auto; text-align: center;">${rendered}</div>`
      : `<span class="katex-inline-wrapper" style="margin: 0 2px;">${rendered}</span>`;

    mathBlocks.push({ key, rendered: htmlWrapper, rawLatex: cleanRaw });
    return key;
  }

  // 3. Extract $$...$$ display math blocks
  html = html.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
    return addBlock(math, true);
  });

  // 4. Extract $...$ inline math blocks
  html = html.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    return addBlock(math, false);
  });

  // 5. LaTeX environments: bmatrix, vmatrix, pmatrix, matrix, cases, aligned, array
  // Handles optional LHS assignment (e.g., "A = \begin{bmatrix}...", "[A | I] = \begin{bmatrix}...", "J = \begin{vmatrix}...")
  const envRegex = /(?:([A-Za-z0-9_\|\^\-\[\]\(\)\s\\~]+)=\s*)?\\begin\{(bmatrix|vmatrix|pmatrix|matrix|cases|aligned|array|Bmatrix|Vmatrix)\}([\s\S]*?)\\end\{\2\}/g;
  html = html.replace(envRegex, (match, prefix, envName, inner) => {
    if (prefix && prefix.trim().length > 0 && prefix.trim().length < 35 && !prefix.includes('\n')) {
      return addBlock(match.trim(), true);
    }
    return (prefix || '') + addBlock(`\\begin{${envName}}${inner}\\end{${envName}}`, true);
  });

  // 6. Row operations: R_1 \leftrightarrow R_2, R_2 \to R_2 - 2R_1, R_3 \to -1/4 R_3, etc.
  const rowOpTarget = '(?:[+-]?\\s*(?:\\d+(?:\\/\\d+)?|\\\\frac\\{\\d+\\}\\{\\d+\\})?\\s*R_?[1-9])';
  const rowOpRegex = new RegExp(`\\b(R_?[1-9]\\s*(?:\\\\leftrightarrow|\\\\to|->)\\s*${rowOpTarget}(?:\\s*[+-]\\s*${rowOpTarget})?)`, 'g');
  html = html.replace(rowOpRegex, (match) => {
    return addBlock(match.trim(), false);
  });

  // 7. Augmented matrix notation in prose like "[A | I] ~" or "[A | I]" or "[A | B]"
  html = html.replace(/\[\s*([A-Za-z])\s*\|\s*([A-Za-z0-9])\s*\](?:\s*(~|=))?/g, (_, m1, m2, rel) => {
    const expr = rel ? `[${m1} \\mid ${m2}] ${rel === '~' ? '\\sim' : rel}` : `[${m1} \\mid ${m2}]`;
    return addBlock(expr, false);
  });

  // 8. Matrix & variable powers: A^{-1}, A^8, A^2, A^4, 5I, 25I, 625I, I_3
  html = html.replace(/\b([A-Z])\^\{?(-?1|\d+)\}?(?=[^a-zA-Z0-9_\^]|$)/g, (match) => {
    return addBlock(match, false);
  });
  html = html.replace(/\b(\d+I|I_[1-9])\b/g, (match) => {
    return addBlock(match, false);
  });

  // 9. Full mathematical lines containing LaTeX symbols and relations
  // E.g., \frac{dx}{dt} = x' = a(1 + \cos t) = 2a \cos^2(t/2)
  // E.g., \rho(A) \ne \rho(A|B) \implies \lambda = 3 \text{ and } \mu \ne 10
  // E.g., \rho = \frac{8a^3 \cos^3(t/2)}{2a^2 \cos^2(t/2)} = 4a \cos(t/2)
  // E.g., \lambda_1 = 3, \quad \lambda_2 = 2, \quad \lambda_3 = 5
  // E.g., |A - \lambda I| = 0
  html = html.replace(/(?:^|\n|(?<=[;:\.]\s))([^\n]*?(?:\\(?:frac|partial|nabla|vec|hat|int|sum|lim|rho|lambda|mu|alpha|beta|gamma|theta|phi|psi|Gamma|Delta|Omega)|[A-Za-z]_[0-9]|[A-Za-z]'\b)[^\n]*?(?:=|\ne|\\ne|\\implies|\\leftrightarrow|\\to|<|>|\\quad)[^\n]*?)(?=[;\.]?(?:\n|$|\s{2,}))/g, (match) => {
    const trimmed = match.trim();
    if (trimmed.length > 3 && !trimmed.includes('@@@ACN_MATH_')) {
      return addBlock(trimmed, false);
    }
    return match;
  });

  // 10. Balanced brace macros: \sqrt{...}, \mathcal{...}, \vec{...}, \hat{...}, \bar{...}, \Gamma{...}
  ['\\sqrt', '\\mathcal', '\\vec', '\\hat', '\\bar', '\\Gamma', '\\text'].forEach(cmd => {
    let safety = 0;
    while (safety++ < 30) {
      const idx = html.indexOf(cmd + '{');
      if (idx === -1) break;
      const body = extractBalancedBraces(html, idx + cmd.length);
      if (!body) break;
      const fullExpr = html.slice(idx, body.endIndex + 1);
      html = html.slice(0, idx) + addBlock(fullExpr, false) + html.slice(body.endIndex + 1);
    }
  });

  // Balanced \frac{num}{den}
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
    html = html.slice(0, idx) + addBlock(fullFrac, false) + html.slice(den.endIndex + 1);
  }

  // 11. Numbers with Ohm unit: 10 \Omega, 12\Omega, 10 \,\Omega
  html = html.replace(/(\d+(?:\.\d+)?)\s*(?:\\,|\\ )?(?:\\Omega|Ω)\b/g, (_, num) => {
    return addBlock(`${num}\\,\\Omega`, false);
  });

  // 12. Degree notations like 30^\circ or (30^\circ)
  html = html.replace(/(\d+(?:\.\d+)?)\s*(?:\^\{?\\circ\}?|\\circ)/g, (_, num) => {
    return addBlock(`${num}^\\circ`, false);
  });

  // 13. Trigonometric & function applications: \cos(30^\circ), \cos\phi, \sin\theta, etc.
  html = html.replace(/\\(cos|sin|tan|sec|csc|cot|ln|log)\s*(?:\(?\s*\\?[a-zA-Z0-9\^\circ\_\{\}]+\s*\)?|[a-zA-Z0-9\\]+)/g, (match) => {
    return addBlock(match, false);
  });

  // 14. Subscripted variables: V_{dc}, V_{rms}, I_L, R_th, I_{ph}, V_L, y_1, y_2, u_n, C_1, C_2
  html = html.replace(/\b([A-Za-z]+)_(?:\{([^{}]+)\}|([a-zA-Z0-9]+))(?=[^a-zA-Z0-9_]|$)/g, (match) => {
    return addBlock(match, false);
  });

  // 15. Exponents: 10^{-3}, 10^6, x^2, e^{2x}, e^{-3t}
  html = html.replace(/(\b[A-Za-z0-9]+|\([^\(\)]+\))\^(?:\{([^{}]+)\}|([0-9a-zA-Z\+\-]+))(?=[^a-zA-Z0-9_\^]|$)/g, (match) => {
    return addBlock(match, false);
  });

  // 16. Standalone Greek letters & LaTeX math symbols
  html = html.replace(/\\(rho|lambda|mu|pi|sigma|omega|phi|psi|theta|eta|gamma|Delta|Gamma|Omega|nabla|partial|times|cdot|approx|ne|neq|le|ge|pm|infty|parallel|to|implies|iff|leftrightarrow|rightarrow|leftarrow|hat|vec|int|iint|oint|sum|prod|lim|in|notin|subset|cup|cap|forall|exists|propto)\b/g, (match) => {
    return addBlock(match, false);
  });

  // Convert any remaining raw \text{ ... } units in text (like "1.667 \text{ A}") to clean text "1.667 A"
  html = html.replace(/\\text\{\s*([^{}]+)\s*\}/g, '$1');

  // Clean up any stray thin spaces \, outside of math
  html = html.replace(/\\,/g, ' ');

  // 17. Format Markdown Bold **bold** and Italics *italic*
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong style="color: #67e8f9; font-weight: 700;">$1</strong>');
  html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');

  // 18. Numbered list formatting: ensure clear visual separation
  html = html.replace(/\n(?=(\d+[\.\)]|\([a-z0-9]+\))\s+)/gi, '\n\n');
  html = html.replace(/\n{2,}/g, '<div style="margin-top: 10px;"></div>');
  html = html.replace(/\n/g, '<br />');

  // 19. Restore math blocks safely using token replacements
  for (let i = 0; i < mathBlocks.length; i++) {
    const { key, rendered } = mathBlocks[i];
    html = html.replace(key, rendered);
  }

  // 20. Restore code blocks safely
  for (let i = 0; i < codePlaceholders.length; i++) {
    const { key, html: blockHtml } = codePlaceholders[i];
    html = html.replace(key, blockHtml);
  }

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
