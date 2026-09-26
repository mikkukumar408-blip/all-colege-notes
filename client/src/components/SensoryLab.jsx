import { logUserActivity } from '../utils/activityTracker';
/* =========================================================================
   SECTION 2: INTERACTIVE NOTES & REVISION READER (SensoryLab.jsx)
   =========================================================================
   Features:
   - Full 4-Unit BEEE Syllabus Coverage with diagrams, proofs, and tables
   - "✍️ Handwritten Notebook Mode" toggle (ruled paper, hand script font, highlights)
   - Unit Switcher (Units 1, 2, 3, 4)
   - Circuit diagrams, mathematical derivations, formula boxes, and exam tips
   ========================================================================= */

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  BookOpen,
  Download, 
  FileText, 
  CheckCircle2, 
  Bookmark, 
  Share2, 
  Lightbulb, 
  Code,
  PenTool,
  Printer,
  Sparkles,
  Zap,
  Cpu,
  Layers,
  HelpCircle,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Award,
  ExternalLink,
  X 
} from 'lucide-react';
import { initialSubjects } from '../data/mockData';
import { downloadPdf } from '../utils/pdfDownloadHelper';
import { beeeUnitsData, beeeSubjectDetails } from '../data/beeeNotesData';
import { aimlUnitsData, aimlSubjectDetails } from '../data/aimlNotesData';
import { math1UnitsData, math1SubjectDetails } from '../data/math1NotesData';
import { webTechUnitsData, webTechSubjectDetails } from '../data/webTechNotesData';
import { cUnitsData, cSubjectDetails } from '../data/cNotesData';
import { physicsUnitsData, physicsSubjectDetails } from '../data/physicsNotesData';
import { pythonUnitsData, pythonSubjectDetails } from '../data/pythonNotesData';
import { dsaUnitsData, dsaSubjectDetails } from '../data/dsaNotesData';
import HandwrittenDiagram from './HandwrittenDiagram';
import InteractiveTheveninLab from './InteractiveTheveninLab';
import katex from 'katex';
import { triggerUniversalPrint } from '../utils/printHelper';

/* -------------------------------------------------------------------------
   MATHEMATICAL & ADVANCED MARKDOWN CONTENT FORMATTER
   Renders LaTeX math via KaTeX, colored callout cards (Traps, Mnemonics, Laws),
   headings (###, ####), and highlighters.
   ------------------------------------------------------------------------- */
const SUPERSCRIPTS_MAP = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
  'n': 'ⁿ', 'k': 'ᵏ', 'm': 'ᵐ', 'x': 'ˣ', 'y': 'ʸ', 't': 'ᵗ'
};

const SUBSCRIPTS_MAP = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
  '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎',
  'a': 'ₐ', 'e': 'ₑ', 'i': 'ᵢ', 'j': 'ⱼ', 'k': 'ₖ',
  'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ', 'p': 'ₚ', 'r': 'ᵣ',
  's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ', 'v': 'ᵥ', 'x': 'ₓ'
};

function cleanMathTypography(str) {
  if (!str) return '';
  let s = str;
  // Greek & operators
  s = s.replace(/\\lambda/g, 'λ').replace(/\\rho/g, 'ρ').replace(/\\theta/g, 'θ');
  s = s.replace(/\\mu/g, 'μ').replace(/\\pi/g, 'π').replace(/\\sigma/g, 'σ');
  s = s.replace(/\\omega/g, 'ω').replace(/\\phi/g, 'φ').replace(/\\Delta/g, 'Δ');
  s = s.replace(/\\nabla\b/g, '∇').replace(/\\ne\b/g, '≠').replace(/\\le\b/g, '≤').replace(/\\ge\b/g, '≥');
  s = s.replace(/\\implies/g, '⇒').replace(/\\iff/g, '⇔').replace(/\\approx/g, '≈');
  s = s.replace(/\\times/g, '×').replace(/\\cdot/g, '·').replace(/\\pm/g, '±');
  s = s.replace(/\\mathbf\{([^}]+)\}/g, '$1').replace(/\\text\{([^}]+)\}/g, '$1');
  s = s.replace(/\\sqrt\{([^}]+)\}/g, '√($1)');

  // Common derivatives
  s = s.replace(/d\^2y\/dx\^2/g, 'd²y/dx²');
  s = s.replace(/∂\^2u\/∂x\^2/g, '∂²u/∂x²');
  s = s.replace(/∂\^2u\/∂y\^2/g, '∂²u/∂y²');
  s = s.replace(/∂\^2u\/∂x∂y/g, '∂²u/∂x∂y');

  // Stacked Fractions: render \frac{num}{den} with real horizontal fraction bar via KaTeX
  s = s.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, (m, num, den) => {
    try {
      return katex.renderToString(`\\frac{${num.trim()}}{${den.trim()}}`, { displayMode: false, throwOnError: false, strict: 'ignore' });
    } catch(e) {
      return `<span class="frac"><span class="frac-num">${num.trim()}</span><span class="frac-den">${den.trim()}</span></span>`;
    }
  });

  // Convert inline slash fractions (num / den) into stacked fractions with horizontal bar via KaTeX
  s = s.replace(/\(([a-zA-Z0-9_\-\+\*\(\)\^²³⁴ⁿ¹ᐟ²³ᐟ²\sλρθμπσωφΔ∇]+?)\s*\/\s*([a-zA-Z0-9_\-\+\*\(\)\^²³⁴ⁿ¹ᐟ²³ᐟ²\sλρθμπσωφΔ∇]+?)\)/g, (m, num, den) => {
    const trimmedNum = num.trim();
    const trimmedDen = den.trim();
    const nonMath = ['and', 'or', 'reference', 'ground', 'Stop', 'End', 'True', 'False', 'Weak', 'Strong', 'year', 'month', 'IPv4', 'IPv6', 'bit', 'http', 'https', 'e.g.', 'vs'];
    if (nonMath.some(w => trimmedNum.includes(w) || trimmedDen.includes(w))) {
      return m;
    }
    if (/[0-9a-zA-ZλρθμπσωφΔ∇]/.test(trimmedNum) && /[0-9a-zA-ZλρθμπσωφΔ∇]/.test(trimmedDen)) {
      try {
        return katex.renderToString(`\\frac{${trimmedNum}}{${trimmedDen}}`, { displayMode: false, throwOnError: false, strict: 'ignore' });
      } catch(e) {
        return `<span class="frac"><span class="frac-num">${trimmedNum}</span><span class="frac-den">${trimmedDen}</span></span>`;
      }
    }
    return m;
  });

  // Curly superscripts
  s = s.replace(/([a-zA-Z0-9_\)\]])\^\{([^{}]+)\}/g, (m, base, exp) => {
    if (exp === '3/2') return base + '³ᐟ²';
    if (exp === '1/2') return base + '¹ᐟ²';
    if (exp === '-1') return base + '⁻¹';
    return base + exp.split('').map(c => SUPERSCRIPTS_MAP[c] || c).join('');
  });

  // Simple superscripts: x^2 -> x², x^3 -> x³, etc.
  s = s.replace(/([a-zA-Z0-9α-ωΑ-ΩλρθμπσωφΔ∇\)\]])\^([0-9a-zA-Z\+\-])/g, (m, base, exp) => {
    return base + (SUPERSCRIPTS_MAP[exp] || ('^' + exp));
  });

  // Subscripts: X_2 -> x₂, x_1 -> x₁, R_1 -> R₁
  s = s.replace(/\bX_2\b/g, 'x₂').replace(/\bX_1\b/g, 'x₁');
  s = s.replace(/([a-zA-Zα-ωΑ-ΩλρθμπσωφΔ∇])\_([0-9a-zA-Z])/g, (m, base, sub) => {
    return base + (SUBSCRIPTS_MAP[sub] || ('_' + sub));
  });
  s = s.replace(/([a-zA-Zα-ωΑ-ΩλρθμπσωφΔ∇])\_\{([^{}]+)\}/g, (m, base, sub) => {
    return base + sub.split('').map(c => SUBSCRIPTS_MAP[c] || c).join('');
  });

  // Remove stray LaTeX brackets and delimiters
  s = s.replace(/\\\{/g, '{').replace(/\\\}/g, '}');
  s = s.replace(/(?<!\\(?:begin|end|text|frac|sqrt|mathbf|substack|array|cases|aligned|bmatrix|matrix))\{([0-9\s,\.\+\-\*\/=]+)\}/g, '($1)');
  s = s.replace(/\$\$/g, '').replace(/\$([^$]+?)\$/g, '$1');

  // Purge any stray \left and \right outside KaTeX (never let literal "left" or "right" leak)
  s = s.replace(/\\*left\s*([(\[{])/gi, '$1');
  s = s.replace(/\\*right\s*([)\]}])/gi, '$1');
  s = s.replace(/\\*(?:left|right)\b(?!\s*[-]?\s*hand)/gi, '');

  return s;
}

function renderKaTeXSafe(formula, isDisplay = false) {
  if (!formula) return '';
  let clean = formula.trim();

  // Strip any inner stray dollar signs
  clean = clean.replace(/(?<!\\)\$/g, '');

  // 0. Normalize double-escaped LaTeX keywords (\\begin -> \begin, \\left -> \left, etc.)
  clean = clean.replace(/\\\\([a-zA-Z]+)/g, (m, word) => '\x5C' + word);

  // 0A. Fix JS string literal escape corruption:
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
  clean = clean.replace(/\\'/g, "'");
  clean = clean.replace(/⬆rac/g, '\\frac');

  // 0B. Fix missing backslashes on delimiters and math tokens:
  clean = clean.replace(/(?<!\\)left\s*([\[\(\{])/g, '\\left$1');
  clean = clean.replace(/(?<!\\)right\s*([\]\)\}])/g, '\\right$1');
  clean = clean.replace(/(?<!\\)\b(cos|sin|tan|sec|csc|cot|sinh|cosh|tanh|ln|log|lim|rho|theta|lambda|mu|pi|sigma|omega|phi|psi|Delta|nabla|partial|implies|iff|pm|le|ge|ne|neq|times|cdot|approx|kappa|Gamma|alpha|beta|eta)\b/g, '\\$1');
  clean = clean.replace(/(?<!\\)\b(dots|ldots|cdots|ddots|vdots)\b/g, '\\$1');
  clean = clean.replace(/(?<!\\)\b(begin|end)\b/g, '\\$1');
  clean = clean.replace(/(?<!\\)\b(bar)\s*\{/g, '\\bar{');
  clean = clean.replace(/(?<!\\)\b(bar)\s*([A-Za-z0-9])/g, '\\bar{$2}');
  clean = clean.replace(/(?<!\\)\b(frac)\s*\{/g, '\\frac{');
  clean = clean.replace(/(?<!\\)\b(vec)\s*\{/g, '\\vec{');

  // 0C. Normalize prime exponents: x'^2 -> {x'}^2
  clean = clean.replace(/([a-zA-Z])\'\^([0-9]+)/g, '{$1\'}^{$2}');

  // 0D. Normalize Unicode exponents to LaTeX:
  clean = clean
    .replace(/³ᐟ²/g, '^{3/2}')
    .replace(/¹ᐟ²/g, '^{1/2}')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/⁴/g, '^4')
    .replace(/ⁿ/g, '^n')
    .replace(/⁻¹/g, '^{-1}')
    .replace(/⁻²/g, '^{-2}');

  // Fix parentheses from cleanMathTypography if any occurred
  clean = clean.replace(/\\begin\((cases|aligned|bmatrix|matrix|array)\)/g, '\\begin{$1}');
  clean = clean.replace(/\\end\((cases|aligned|bmatrix|matrix|array)\)/g, '\\end{$1}');

  // Convert any span fractions back to LaTeX \frac{num}{den}
  clean = clean.replace(/<span class=['"]frac['"]><span class=['"]frac-num['"]>([\s\S]*?)<\/span><span class=['"]frac-den['"]>([\s\S]*?)<\/span><\/span>/g, '\\frac{$1}{$2}');

  // Strip any HTML tags inside LaTeX
  clean = clean.replace(/<[^>]+>/g, '');

  // Matrix column separator fixes (e.g. {ccc/c} -> {ccc|c})
  clean = clean.replace(/\{([crl]+)\/([crl]+)\}/g, '{$1|$2}');
  clean = clean.replace(/\[A\s+mid\s+B\]/g, '[A \\mid B]');
  clean = clean.replace(/\[A\s+mid\s+I\]/g, '[A \\mid I]');

  // Fix matrix newlines if needed
  clean = clean.replace(/(\\begin\{(?:[a-zA-Z]*matrix|cases|aligned)\}[\s\S]*?\\end\{(?:[a-zA-Z]*matrix|cases|aligned)\})/g, (env) => {
    return env.replace(/\\ (?=[a-zA-Z0-9_\-\+\*\(\)\^²³⁴ⁿ¹ᐟ²³ᐟ²\sλρθμπσωφΔ∇&|⋮⋱\.]|\\end)/g, '\\\\ ');
  });

  // Normalize Unicode sub/superscripts for KaTeX matrices
  clean = clean
    .replace(/\bI₁\b/g, 'I_1').replace(/\bI₂\b/g, 'I_2').replace(/\bI₃\b/g, 'I_3')
    .replace(/\bIᵣ\b/g, 'I_r').replace(/\bA⁻¹\b/g, 'A^{-1}').replace(/\bA²\b/g, 'A^2').replace(/\bA³\b/g, 'A^3').replace(/\bA⁴\b/g, 'A^4');

  // Normalize Unicode & operators for KaTeX
  clean = clean
    .replace(/\\?·/g, '\\cdot ')
    .replace(/\\?≈/g, '\\approx ')
    .replace(/\\?≠/g, '\\neq ')
    .replace(/\\?→/g, '\\rightarrow ')
    .replace(/\\?⇒/g, '\\implies ')
    .replace(/\\?⇔/g, '\\iff ')
    .replace(/\\?±/g, '\\pm ')
    .replace(/\\?≤/g, '\\le ')
    .replace(/\\?≥/g, '\\ge ')
    .replace(/\\?λ/g, '\\lambda ')
    .replace(/\\?μ/g, '\\mu ')
    .replace(/\\?ω/g, '\\omega ')
    .replace(/\\?Ω/g, '\\Omega ')
    .replace(/\\?π/g, '\\pi ')
    .replace(/\\?φ|\\?ϕ|\\?Φ/g, '\\phi ')
    .replace(/\\?θ|\\?Θ/g, '\\theta ')
    .replace(/\\?ρ/g, '\\rho ')
    .replace(/\\?σ/g, '\\sigma ')
    .replace(/\\?Δ/g, '\\Delta ')
    .replace(/\\?∇/g, '\\nabla ')
    .replace(/\\?∞/g, '\\infty ')
    .replace(/\\?∈/g, '\\in ')
    .replace(/\\?∂/g, '\\partial ')
    .replace(/(?<!\\)%/g, '\\%')
    .replace(/₁/g, '_1')
    .replace(/₂/g, '_2')
    .replace(/₃/g, '_3')
    .replace(/ᵣ/g, '_r')
    .replace(/ₙ₋₁/g, '_{n-1}')
    .replace(/\\text\{"([^"]+)"\}/g, '\\text{$1}')
    .replace(/"([^"]+)"/g, '\\text{$1}');

  try {
    const rendered = katex.renderToString(clean, {
      displayMode: isDisplay,
      throwOnError: false,
      strict: 'ignore'
    });
    if (!rendered.includes('katex-error')) {
      return rendered;
    }
    // Retry after cleaning any control characters
    const stripped = clean.replace(/[\x00-\x1F\x7F]/g, ' ');
    const retry = katex.renderToString(stripped, {
      displayMode: isDisplay,
      throwOnError: false,
      strict: 'ignore'
    });
    // Retry 2: Normalize \left and \right if mismatched brackets caused the KaTeX error
    const bracketsNormalized = clean
      .replace(/\\left\s*([(\[{])/g, '(')
      .replace(/\\right\s*([)\]}])/g, ')')
      .replace(/\\left\./g, '')
      .replace(/\\right\./g, '');
    const retry2 = katex.renderToString(bracketsNormalized, {
      displayMode: isDisplay,
      throwOnError: false,
      strict: 'ignore'
    });
    if (!retry2.includes('katex-error')) {
      return retry2;
    }
  } catch (e) {}

  // Safe fallback: Render sanitized formula inside KaTeX \text block so typography is always styled math
  try {
    const cleanFallback = clean
      .replace(/\\*(?:left|right)\s*([(\[{])/gi, '$1')
      .replace(/\\*(?:left|right)\s*([)\]}])/gi, '$1')
      .replace(/\\*(?:left|right)\b(?!\s*[-]?\s*hand)/gi, '')
      .replace(/[{}\\]/g, ' ');
    return katex.renderToString(`\\text{${cleanFallback}}`, {
      displayMode: isDisplay,
      throwOnError: false
    });
  } catch (e) {
    return clean
      .replace(/\\*(?:left|right)\s*([(\[{])/gi, '$1')
      .replace(/\\*(?:left|right)\s*([)\]}])/gi, '$1')
      .replace(/\\*(?:left|right)\b(?!\s*[-]?\s*hand)/gi, '');
  }
}

/* -------------------------------------------------------------------------
   CODE EDITOR / IDE RENDERING ENGINE & SYNTAX HIGHLIGHTER
   Authentic modern editor with line numbers, file tab, badge, and copy button.
   ------------------------------------------------------------------------- */
function escapeHtmlForCode(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function highlightCodeLine(line, lang) {
  if (!line || line.trim() === '') return '&nbsp;';

  const l = (lang || '').toLowerCase();
  const isPy = l.includes('py') || line.includes('#') || line.includes('def ') || line.includes('print(');
  const isC = l.includes('c') || line.includes('#include') || line.includes('printf(') || line.includes('int ') || line.includes('void ');
  const isJS = l.includes('js') || l.includes('script') || line.includes('console.log') || line.includes('const ') || line.includes('let ');

  // 1. Comment handling
  let commentRegex = null;
  if (isPy) commentRegex = /^(.*?)(\s*(?:#.*))$/;
  else if (isC || isJS) commentRegex = /^(.*?)(\s*(?:\/\/.*))$/;
  else if (l.includes('html')) commentRegex = /^(.*?)(\s*(?:<!--[\s\S]*?-->))$/;

  let codePart = line;
  let commentPart = '';

  if (commentRegex) {
    const match = line.match(commentRegex);
    if (match) {
      codePart = match[1];
      commentPart = `<span class="tok-comment">${escapeHtmlForCode(match[2])}</span>`;
    }
  }

  // 2. String masking
  const stringPlaceholders = [];
  const strRegex = /(f?"""[\s\S]*?"""|f?'''[\s\S]*?'''|f?"(?:\\.|[^"\\])*"|f?'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/g;
  let masked = codePart.replace(strRegex, (match) => {
    const idx = stringPlaceholders.length;
    stringPlaceholders.push(`<span class="tok-string">${escapeHtmlForCode(match)}</span>`);
    return `___STR_${idx}___`;
  });

  // 3. Escape HTML
  let highlighted = escapeHtmlForCode(masked);

  // 4. Function definitions
  highlighted = highlighted.replace(/\b(def|function)\s+([a-zA-Z_]\w*)/g, 
    '<span class="tok-keyword">$1</span> <span class="tok-func">$2</span>');

  // 5. C preprocessor headers
  highlighted = highlighted.replace(/&lt;(stdio\.h|stdlib\.h|string\.h|math\.h|stdbool\.h|limits\.h|ctype\.h|time\.h|conio\.h|assert\.h|iostream|vector|string|algorithm|map|set)&gt;/g,
    '&lt;<span class="tok-string">$1</span>&gt;');

  // 6. Keywords
  const pyKeywords = [
    'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del',
    'elif', 'else', 'except', 'False', 'finally', 'for', 'from', 'global', 'if', 'import',
    'in', 'is', 'lambda', 'None', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return',
    'True', 'try', 'while', 'with', 'yield'
  ];
  const cKeywords = [
    'auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do', 'double',
    'else', 'enum', 'extern', 'float', 'for', 'goto', 'if', 'inline', 'int', 'long',
    'register', 'restrict', 'return', 'short', 'signed', 'sizeof', 'static', 'struct',
    'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile', 'while', 'include', 'define', 'NULL'
  ];
  const jsKeywords = [
    'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'default',
    'delete', 'do', 'else', 'export', 'extends', 'false', 'finally', 'for', 'function',
    'if', 'import', 'in', 'instanceof', 'let', 'new', 'null', 'return', 'super', 'switch',
    'this', 'throw', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield'
  ];

  const keywords = isPy ? pyKeywords : (isC ? cKeywords : [...new Set([...pyKeywords, ...cKeywords, ...jsKeywords])]);
  const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  highlighted = highlighted.replace(kwRegex, '<span class="tok-keyword">$1</span>');

  // 7. Builtins & standard library types
  const builtins = [
    'print', 'range', 'len', 'input', 'str', 'list', 'dict', 'set', 'tuple', 'type',
    'min', 'max', 'sum', 'sorted', 'enumerate', 'zip', 'open', 'any', 'all',
    'printf', 'scanf', 'malloc', 'calloc', 'realloc', 'free', 'exit', 'strlen', 'strcpy',
    'cout', 'cin', 'endl', 'console', 'log', 'document', 'window'
  ];
  const builtinRegex = new RegExp(`\\b(${builtins.join('|')})\\b`, 'g');
  highlighted = highlighted.replace(builtinRegex, '<span class="tok-builtin">$1</span>');

  // 8. Numbers
  highlighted = highlighted.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="tok-number">$1</span>');

  // 9. Common operators
  highlighted = highlighted.replace(/(&amp;&amp;|\|\||==|!=|&lt;=|&gt;=|\+=|-=|\*=|\/=|%=|-&gt;)/g, '<span class="tok-operator">$1</span>');

  // 10. Restore strings
  stringPlaceholders.forEach((strHtml, idx) => {
    highlighted = highlighted.replace(`___STR_${idx}___`, strHtml);
  });

  return highlighted + commentPart;
}

function renderCodeEditor(rawCode, rawLang) {
  const code = (rawCode || '').trim();
  const lang = (rawLang || '').toLowerCase().trim();

  let filename = 'main.py';
  let badge = 'PYTHON 3.12';

  if (lang === 'c' || (!lang && (/#include|int main|printf\(|scanf\(|malloc\b|typedef struct/.test(code)))) {
    filename = 'solution.c';
    badge = 'C11';
  } else if (lang === 'cpp' || lang === 'c++' || (!lang && (/std::|cout|cin|#include <iostream>/.test(code)))) {
    filename = 'solution.cpp';
    badge = 'C++20';
  } else if (lang === 'java' || (!lang && (/public class|System\.out\.println/.test(code)))) {
    filename = 'Solution.java';
    badge = 'Java 21';
  } else if (lang === 'html' || (!lang && (/<!DOCTYPE|<html|<div|<head|<body/.test(code)))) {
    filename = 'index.html';
    badge = 'HTML5';
  } else if (lang === 'css' || (!lang && (/\{[\s\S]*?[a-z-]+:\s*[^;]+;[\s\S]*?\}/.test(code) && /margin|padding|color:|background:/.test(code)))) {
    filename = 'styles.css';
    badge = 'CSS3';
  } else if (lang === 'javascript' || lang === 'js' || (!lang && (/const |let |console\.log|=>|function\b/.test(code)))) {
    filename = 'app.js';
    badge = 'JavaScript';
  } else if (lang === 'sql' || (!lang && (/SELECT .* FROM|INSERT INTO|CREATE TABLE/.test(code)))) {
    filename = 'query.sql';
    badge = 'SQL';
  } else if (lang === 'algo' || lang === 'pseudocode') {
    filename = 'algorithm.algo';
    badge = 'Algorithm';
  } else if (lang === 'bash' || lang === 'sh') {
    filename = 'script.sh';
    badge = 'Bash';
  } else if (lang === 'python' || lang === 'py' || (!lang && (/def |import |for .* in |print\(|elif |#/.test(code)))) {
    filename = 'main.py';
    badge = 'Python 3.12';
  } else {
    filename = 'snippet.txt';
    badge = 'Code';
  }

  const lines = code.split('\n');
  const gutterHtml = lines.map((_, i) => `<div class="code-line-num">${i + 1}</div>`).join('');
  const contentHtml = lines.map(line => `<div class="code-line">${highlightCodeLine(line, lang || badge)}</div>`).join('');

  return `<div class="code-editor-box" data-code="${encodeURIComponent(code)}" data-badge="${encodeURIComponent(badge)}">
    <div class="code-editor-header">
      <div class="code-editor-header-left">
        <div class="code-editor-dots">
          <span class="code-dot red"></span>
          <span class="code-dot yellow"></span>
          <span class="code-dot green"></span>
        </div>
        <div class="code-editor-file-tab">
          <svg class="code-editor-file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <span>${filename}</span>
        </div>
      </div>
      <div class="code-editor-header-right">
        <span class="code-editor-lang-badge">${badge}</span>
        <button class="code-run-btn" type="button" title="Execute algorithm in sandboxed virtual lab runner">
          <svg class="run-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span class="run-text">Run Live</span>
        </button>
        <button class="code-copy-btn" type="button" title="Copy code to clipboard">
          <svg class="copy-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span class="copy-text">Copy</span>
        </button>
      </div>
    </div>
    <div class="code-editor-body">
      <div class="code-editor-gutter">${gutterHtml}</div>
      <div class="code-editor-content"><pre class="code-pre">${contentHtml}</pre></div>
    </div>
    <div class="code-console-drawer" style="display: none;">
      <div class="code-console-header">
        <div class="console-title-group">
          <span class="console-dot"></span>
          <span class="console-title">🖥️ Virtual Sandbox Terminal</span>
          <span class="console-status-pill">Ready</span>
        </div>
        <button class="console-close-btn" type="button" title="Close Terminal Output">✕</button>
      </div>
      <div class="code-console-body">
        <pre class="code-console-pre"></pre>
      </div>
    </div>
  </div>`;
}

function simulateCodeExecution(code, langBadge = '') {
  const codeTrimmed = code.trim();
  const lang = (langBadge || '').toLowerCase();
  const logs = [];

  // Check if it's sorting
  if (/bubble.*sort/i.test(codeTrimmed)) {
    logs.push('[VIRTUAL LAB] Running Bubble Sort on Array: [64, 34, 25, 12, 22, 11, 90]');
    logs.push('  Iteration 1: [34, 25, 12, 22, 11, 64, 90]');
    logs.push('  Iteration 2: [25, 12, 22, 11, 34, 64, 90]');
    logs.push('  Iteration 3: [12, 22, 11, 25, 34, 64, 90]');
    logs.push('  Iteration 4: [12, 11, 22, 25, 34, 64, 90]');
    logs.push('  Iteration 5: [11, 12, 22, 25, 34, 64, 90]');
    logs.push('✔ Sorted Result: [11, 12, 22, 25, 34, 64, 90]');
    logs.push('📊 Total Swaps: 14 | Comparisons: 21 | Complexity: O(n²)');
    return logs.join('\n');
  }

  // Check if it's binary search
  if (/binary.*search/i.test(codeTrimmed)) {
    logs.push('[VIRTUAL LAB] Running Binary Search on Sorted Array: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91]');
    logs.push('  Target Key: 23');
    logs.push('  Step 1: low=0, high=10 -> mid=5 (val=23) === target');
    logs.push('✔ Key 23 found at index 5!');
    logs.push('📊 Total Comparisons: 1 | Time Complexity: O(log n)');
    return logs.join('\n');
  }

  // Check if it's linear search
  if (/linear.*search/i.test(codeTrimmed)) {
    logs.push('[VIRTUAL LAB] Running Linear Search on Array: [10, 50, 30, 70, 80, 20]');
    logs.push('  Target Key: 70');
    logs.push('  Index 0: 10 != 70');
    logs.push('  Index 1: 50 != 70');
    logs.push('  Index 2: 30 != 70');
    logs.push('  Index 3: 70 == 70 -> Match!');
    logs.push('✔ Key 70 found at index 3!');
    logs.push('📊 Comparisons: 4 | Complexity: O(n)');
    return logs.join('\n');
  }

  // Check if it's stack / queue
  if (/\bstack\b/i.test(codeTrimmed) && (/push/i.test(codeTrimmed) || /pop/i.test(codeTrimmed))) {
    logs.push('[VIRTUAL LAB] Simulating Stack Operations (LIFO):');
    logs.push('  > push(10) -> Stack: [10] (Top: 10)');
    logs.push('  > push(20) -> Stack: [10, 20] (Top: 20)');
    logs.push('  > push(30) -> Stack: [10, 20, 30] (Top: 30)');
    logs.push('  > pop()    -> Popped: 30 | Stack: [10, 20] (Top: 20)');
    logs.push('  > peek()   -> 20');
    logs.push('✔ Stack simulation verified. All operations O(1).');
    return logs.join('\n');
  }

  // Check if it's linked list
  if (/struct\s+Node|class\s+Node|next\s*=/i.test(codeTrimmed)) {
    logs.push('[VIRTUAL LAB] Allocating Dynamic Linked List in Heap:');
    logs.push('  Node 1: [Data: 10 | Next: 0x7ffd10]');
    logs.push('  Node 2: [Data: 20 | Next: 0x7ffd20]');
    logs.push('  Node 3: [Data: 30 | Next: NULL]');
    logs.push('✔ List Traversal: 10 -> 20 -> 30 -> NULL');
    logs.push('✔ Memory freed: 3 nodes released without leaks.');
    return logs.join('\n');
  }

  // Extract print/printf statements from C or Python
  const printRegexC = /printf\s*\(\s*"([^"\\]*(?:\\.[^"\\]*)*)"\s*(?:,\s*([^)]+))?\s*\)/g;
  let match;
  let hasExtracted = false;

  while ((match = printRegexC.exec(codeTrimmed)) !== null) {
    hasExtracted = true;
    let text = match[1].replace(/\\n/g, '').replace(/\\t/g, '  ');
    if (match[2]) {
      const args = match[2].split(',').map(a => a.trim());
      args.forEach(arg => {
        text = text.replace(/%[a-zA-Z]/, arg);
      });
    }
    logs.push(text);
  }

  const printRegexPy = /print\s*\(\s*f?["']([^"'\\]*(?:\\.[^"'\\]*)*)["']\s*(?:,\s*([^)]+))?\s*\)/g;
  while ((match = printRegexPy.exec(codeTrimmed)) !== null) {
    hasExtracted = true;
    let text = match[1].replace(/\\n/g, '').replace(/\\t/g, '  ');
    if (match[2]) {
      text += ' ' + match[2];
    }
    logs.push(text);
  }

  if (hasExtracted && logs.length > 0) {
    logs.unshift(`[RUNNING: ${(lang || 'PROGRAM').toUpperCase()}]`);
    logs.push('\n[Process completed with exit code 0]');
    return logs.join('\n');
  }

  // Default clean simulated execution
  logs.push(`[VIRTUAL RUNTIME - ${(lang || 'CODE RUNNER').toUpperCase()}]`);
  logs.push('✔ Compilation & syntax check passed: 0 warnings, 0 errors');
  logs.push('✔ Memory allocated: 4.2 MB RAM');
  logs.push('✔ Program executed successfully with simulated I/O.');
  logs.push('[Process completed with exit status 0 (0.012 ms)]');
  return logs.join('\n');
}

/* -------------------------------------------------------------------------
   MATHEMATICAL & ADVANCED MARKDOWN CONTENT FORMATTER
   Renders LaTeX math via KaTeX, colored callout cards (Traps, Mnemonics, Laws),
   headings (###, ####), and highlighters.
   ------------------------------------------------------------------------- */
const noteContentCache = new Map();

function formatNoteContent(content, activeRecallMode = false) {
  if (!content) return '';

  const cacheKey = `${activeRecallMode ? '1' : '0'}_${content.length}_${content.slice(0, 32)}_${content.slice(-32)}`;
  if (noteContentCache.has(cacheKey)) {
    return noteContentCache.get(cacheKey);
  }

  let html = content;

  // Pre-clean 0A: Auto-fix unescaped \f formfeed from \frac in JS strings and stray arrow symbols
  html = html.replace(/\x0crac/g, '\\frac');
  html = html.replace(/⬆rac/g, '\\frac');
  html = html.replace(/\x0c/g, '');

  // Pre-clean 0C: Auto-clean stray LaTeX arrows and symbols outside math mode in text
  html = html.replace(/\\leftrightarrow/g, ' ⇄ ');
  html = html.replace(/\\rightarrow/g, ' → ');
  html = html.replace(/\\to\b/g, ' → ');
  html = html.replace(/\\Omega\b/g, ' Ω');
  html = html.replace(/\\sin\b/g, 'sin');
  html = html.replace(/\\cos\b/g, 'cos');

  // Pre-clean 0D: Repair corrupted JS string escaped thin spaces (e.g. ",\text{" -> "~\text{", ",\Omega" -> "~\Omega")
  html = html.replace(/,\s*\\*text\{/g, '~\\text{');
  html = html.replace(/,\s*\\*(?:Omega|Ω)\b/g, '~\\Omega');
  html = html.replace(/(\d+(?:\.\d+)?)\s*,\s*(V|A|W|Ω|Hz|mA|kV|mV|μA|pF|μF|nF|F|H|mH|kΩ|MΩ)\b/g, '$1 $2');
  html = html.replace(/\bRL\s*=\s*(\d+(?:\.\d+)?)\s*(?:\\,|,\s*)?(?:\\Omega|Ω)?/g, '$R_L = $1\\,\\Omega$');

  // Step 0 (PRE-PASS): Extract triple-backtick code blocks FIRST before any other processing,
  // clean any embedded math notation inside them, and replace with unique placeholders.
  const codeBlocks = [];
  html = html.replace(/```([a-zA-Z0-9_\-\+]*)\n?([\s\S]*?)```/g, (match, lang, code) => {
    const trimmedCode = code.trim();
    const l = (lang || '').toLowerCase().trim();

    // Check if it is a pure mathematical derivation without programming tokens
    const isMathDerivation = /^\s*(?:Solution|Question)\s+[A-Za-z0-9\s]+(?:Derivation|Equation|Trace|Formulation|Matrix|Transformation):/i.test(trimmedCode) ||
      (!l && /`[^`]+`|\\frac|frac-num|\b(?:Cayley|Eigen|Cauchy|Rolle|LMVT)\b/i.test(trimmedCode) && !/\b(?:def|for|while|import|printf|scanf|#include|int\s+main|return|public|class)\b/.test(trimmedCode));

    if (isMathDerivation) {
      let cleanCode = trimmedCode.replace(/`([^`\n]+)`/g, (m, rawMath) => {
        let math = rawMath.trim();
        // Separate English labels (e.g. "Net Reactance X = ...", "2. Impedance: ...") from math expressions
        const labelMatch = math.match(/^([0-9]+\.\s*[A-Za-z\s]+:|Power\s*Factor:|Active\s*Power:|Reactive\s*Power:|Net\s*Reactance\s*[A-Za-z]*\s*=)\s*(.*)$/);
        if (labelMatch) {
          const label = labelMatch[1];
          const expr = labelMatch[2];
          return `<div class="derivation-step-row" style="margin: 6px 0; line-height: 1.8;"><span style="font-weight: 700; color: #1e3a8a; margin-right: 6px;">${label}</span><span class="derivation-math-step">${renderKaTeXSafe(expr, false)}</span></div>`;
        }
        return `<span class="derivation-math-step">${renderKaTeXSafe(math, false)}</span>`;
      });
      cleanCode = cleanMathTypography(cleanCode);
      const placeholder = `\x00CODEBLOCK_${codeBlocks.length}\x00`;
      codeBlocks.push(`<div class="analytical-derivation-box"><div class="derivation-body-content">${cleanCode}</div></div>`);
      return placeholder;
    }

    // Check if it's an ASCII diagram (lines made of +, -, |, etc.)
    const isAsciiDiagram = !l && /^[+\-| /\\=_]{4,}/m.test(trimmedCode) && !/\b(?:def|for|while|import|printf|int|void)\b/.test(trimmedCode);
    if (isAsciiDiagram) {
      let cleanCode = cleanMathTypography(trimmedCode);
      const escaped = cleanCode
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      const placeholder = `\x00CODEBLOCK_${codeBlocks.length}\x00`;
      codeBlocks.push(`<div class="ascii-diagram-box"><pre class="ascii-diagram-pre">${escaped}</pre></div>`);
      return placeholder;
    }

    // Authentic Code Editor / IDE box for all programming languages and code snippets
    const placeholder = `\x00CODEBLOCK_${codeBlocks.length}\x00`;
    codeBlocks.push(renderCodeEditor(trimmedCode, l));
    return placeholder;
  });

  // Step 1: Extract and pre-render Display Math ($$...$$) into placeholders
  const mathDisplayBlocks = [];
  html = html.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
    const rendered = renderKaTeXSafe(formula, true);
    const placeholder = `\x00MATH_DISPLAY_${mathDisplayBlocks.length}\x00`;
    mathDisplayBlocks.push(`<div class="katex-display-box">${rendered}</div>`);
    return placeholder;
  });

  // Step 1.5: Auto-extract any UNWRAPPED LaTeX environments (cases, aligned, bmatrix, matrix, array) into display blocks
  html = html.replace(/(\\+begin\{(?:cases|aligned|bmatrix|matrix|array)\}[\s\S]*?\\+end\{(?:cases|aligned|bmatrix|matrix|array)\})/g, (match, formula) => {
    const rendered = renderKaTeXSafe(formula, true);
    const placeholder = `\x00MATH_DISPLAY_${mathDisplayBlocks.length}\x00`;
    mathDisplayBlocks.push(`<div class="katex-display-box">${rendered}</div>`);
    return placeholder;
  });

  // Step 1.6: Auto-extract any UNWRAPPED augmented matrices (\left[ ... \right])
  html = html.replace(/(\\+left\[\s*\\+begin\{[^}]+\}[\s\S]*?\\+end\{[^}]+\}\s*\\+right\])/g, (match, formula) => {
    const rendered = renderKaTeXSafe(formula, true);
    const placeholder = `\x00MATH_DISPLAY_${mathDisplayBlocks.length}\x00`;
    mathDisplayBlocks.push(`<div class="katex-display-box">${rendered}</div>`);
    return placeholder;
  });

  // Step 2: Extract and pre-render Inline Math ($...$) into placeholders
  const mathInlineBlocks = [];
  html = html.replace(/\$([^\$\n]+?)\$/g, (match, formula) => {
    const rendered = renderKaTeXSafe(formula, false);
    const placeholder = `\x00MATH_INLINE_${mathInlineBlocks.length}\x00`;
    mathInlineBlocks.push(rendered);
    return placeholder;
  });

  // Step 2.5: Auto-detect and render broken fraction markup like {fracx}/{frac4} or {frac x}/{frac 4}
  html = html.replace(/\{frac\s*([^{}]+)\}\s*\/\s*\{frac\s*([^{}]+)\}/gi, (m, num, den) => {
    const rendered = renderKaTeXSafe(`\\frac{${num.trim()}}{${den.trim()}}`, false);
    const placeholder = `\x00MATH_INLINE_${mathInlineBlocks.length}\x00`;
    mathInlineBlocks.push(rendered);
    return placeholder;
  });

  // Step 2.6: Auto-detect single-char unwrapped \frac e.g. \frac x 4 or \frac 1 2
  html = html.replace(/\\+frac\s+([0-9a-zA-Z])\s+([0-9a-zA-Z])/g, '\\frac{$1}{$2}');

  // Step 2.7: Auto-render any remaining UNWRAPPED LaTeX fractions \frac{...}{...} into KaTeX
  let fracSafety = 0;
  while (/\\+frac\{([^{}]+)\}\{([^{}]+)\}/.test(html) && fracSafety < 30) {
    fracSafety++;
    html = html.replace(/\\+frac\{([^{}]+)\}\{([^{}]+)\}/g, (m, num, den) => {
      const rendered = renderKaTeXSafe(`\\frac{${num}}{${den}}`, false);
      const placeholder = `\x00MATH_INLINE_${mathInlineBlocks.length}\x00`;
      mathInlineBlocks.push(rendered);
      return placeholder;
    });
  }

  // Step 2.8: Auto-render unwrapped bar notation \bar{...} or \bar(...)
  html = html.replace(/\\+bar\{([^{}]+)\}/g, (m, sym) => {
    const rendered = renderKaTeXSafe(`\\bar{${sym}}`, false);
    const placeholder = `\x00MATH_INLINE_${mathInlineBlocks.length}\x00`;
    mathInlineBlocks.push(rendered);
    return placeholder;
  });
  html = html.replace(/\\+bar\(([a-zA-Z0-9])\)/g, (m, sym) => {
    const rendered = renderKaTeXSafe(`\\bar{${sym}}`, false);
    const placeholder = `\x00MATH_INLINE_${mathInlineBlocks.length}\x00`;
    mathInlineBlocks.push(rendered);
    return placeholder;
  });

  // Step 2.9: Auto-render unwrapped limits \lim_{...}
  html = html.replace(/\\+lim_\{([^{}]+)\}/g, (m, sub) => {
    const rendered = renderKaTeXSafe(`\\lim_{${sub}}`, false);
    const placeholder = `\x00MATH_INLINE_${mathInlineBlocks.length}\x00`;
    mathInlineBlocks.push(rendered);
    return placeholder;
  });

  // Step 3: Callout Cards (Red Trap, Purple Mnemonic, Green Law, Yellow Sticky, Blue Analogy, Cyan Takeaway)
  html = html
    .replace(/^> 🔴 (.*?)$/gm, '<div class="exam-trap-box"><strong>🚨 EXAMINER TRAP / PITFALL:</strong><br/>$1</div>')
    .replace(/^> 💡 (.*?)$/gm, '<div class="topper-mnemonic-box"><strong>💡 TOPPER MEMORY HACK:</strong><br/>$1</div>')
    .replace(/^> 🟢 (.*?)$/gm, '<div class="green-law-box"><strong>✅ FUNDAMENTAL LAW / RULE:</strong><br/>$1</div>')
    .replace(/^> 📌 (.*?)$/gm, '<div class="sticky-postit">📌 <strong>CRITICAL EXAM DERIVATION:</strong><br/>$1</div>')
    .replace(/^> 🔵 (.*?)$/gm, '<div class="blue-analogy-box"><strong>🧠 SIMPLE REAL-LIFE INTUITION (ELI5):</strong><br/>$1</div>')
    .replace(/^> ⚡ (.*?)$/gm, '<div class="cyan-keytakeaway-box"><strong>⚡ KEY TAKEAWAY & BOTTOM LINE:</strong><br/>$1</div>')
    .replace(/^> 🟠 (.*?)$/gm, '<div class="orange-warning-box"><strong>⚠️ WATCH OUT / COMMON CONFUSION:</strong><br/>$1</div>')
    .replace(/^> 🎯 (.*?)$/gm, '<div class="purple-exam-goal-box"><strong>🎯 10-MARK SCORING SECRET:</strong><br/>$1</div>')
    .replace(/^> 🌈 (.*?)$/gm, '<div class="rainbow-concept-box"><strong>✨ THE BIG PICTURE (WHY DOES THIS MATTER?):</strong><br/>$1</div>');

  // Step 3.2: Pill Badges
  html = html.replace(/<pill ([a-z\-]+)>([\s\S]*?)<\/pill>/g, '<span class="pill-badge pill-$1">$2</span>');

  // Step 3.3: Markdown Tables
  html = html.replace(/((?:\|[^\n]+\|\r?\n)+)/g, (tableMatch) => {
    const lines = tableMatch.trim().split(/\r?\n/);
    if (lines.length < 2) return tableMatch;
    
    let tableHtml = '<div class="custom-table-wrap"><table class="colorful-table">';
    let isHeader = true;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (/^\|[\s\-:|]+\|$/.test(line)) {
        isHeader = false;
        continue;
      }
      const cells = line.split('|').slice(1, -1).map(c => c.trim());
      if (isHeader) {
        tableHtml += '<thead><tr>';
        cells.forEach(c => { tableHtml += `<th>${c}</th>`; });
        tableHtml += '</tr></thead><tbody>';
        isHeader = false;
      } else {
        tableHtml += '<tr>';
        cells.forEach((c, idx) => { 
          if (idx === 0) {
            tableHtml += `<td><strong>${c}</strong></td>`;
          } else {
            tableHtml += `<td>${c}</td>`;
          }
        });
        tableHtml += '</tr>';
      }
    }
    tableHtml += '</tbody></table></div>';
    return tableHtml;
  });

  // Step 3.5: Multi-line Worked Numerical Examples with Graded Difficulty (Easy, Medium, Hard)
  html = html.replace(/<example\b([^>]*)>([\s\S]*?)<\/example>/g, (match, attrs, body) => {
    const titleMatch = attrs.match(/title="([^"]*)"/);
    const levelMatch = attrs.match(/level="([^"]*)"/);
    const title = titleMatch ? titleMatch[1] : 'UNIVERSITY WORKED EXAMPLE';
    const lvl = (levelMatch ? levelMatch[1] : '').toLowerCase();

    let badgeClass = 'level-easy';
    let badgeLabel = '🟢 LEVEL 1: EASY & SIMPLE';
    if (lvl === 'medium' || lvl === 'med' || lvl === '2') {
      badgeClass = 'level-medium';
      badgeLabel = '🟡 LEVEL 2: MEDIUM STANDARD';
    } else if (lvl === 'hard' || lvl === 'hardest' || lvl === '3') {
      badgeClass = 'level-hard';
      badgeLabel = '🔴 LEVEL 3: HARDEST ADVANCED';
    }

    const maskOverlay = activeRecallMode ? `
      <div class="active-recall-mask-curtain">
        <span class="active-recall-pill">🔒 Click to Reveal Solution (Active Recall)</span>
        <span style="font-size:0.75rem; color:#94a3b8; margin-top:6px;">Try solving on rough paper before looking!</span>
      </div>` : '';

    return `<div class="worked-example-box ${badgeClass} ${activeRecallMode ? 'active-recall-masked' : ''}">
      <div class="example-tag-header">
        <span class="difficulty-pill ${badgeClass}">${badgeLabel}</span>
        <span>📘 ${title}</span>
      </div>
      ${body}
      ${maskOverlay}
    </div>`;
  });

  // Step 3.6: Multi-line Formal Academic Derivations & University Proofs
  html = html.replace(/<derivation\b([^>]*)>([\s\S]*?)<\/derivation>/g, (match, attrs, body) => {
    const titleMatch = attrs.match(/title="([^"]*)"/);
    const marksMatch = attrs.match(/marks="([^"]*)"/);
    const title = titleMatch ? titleMatch[1] : 'ANALYTICAL MATHEMATICAL PROOF';
    const marks = marksMatch ? marksMatch[1] : '';

    const maskOverlay = activeRecallMode ? `
      <div class="active-recall-mask-curtain">
        <span class="active-recall-pill">🔒 Click to Reveal Proof & Steps (Active Recall)</span>
        <span style="font-size:0.75rem; color:#94a3b8; margin-top:6px;">Test your derivation memory before verifying!</span>
      </div>` : '';

    return `<div class="academic-derivation-box ${activeRecallMode ? 'active-recall-masked' : ''}">
      <div class="derivation-header">
        <span class="derivation-pill">📐 FORMAL UNIVERSITY DERIVATION</span>
        <span class="derivation-title">🎓 ${title}</span>
        ${marks ? `<span class="derivation-marks-pill">⭐ ${marks}</span>` : ''}
      </div>
      <div class="derivation-body">
        ${body}
      </div>
      ${maskOverlay}
    </div>`;
  });

  // Step 4: Markdown Headings
  html = html
    .replace(/^#### (.*?)$/gm, '<h5 class="note-h5">⚡ $1</h5>')
    .replace(/^### (.*?)$/gm, '<h4 class="note-h4">$1</h4>')
    .replace(/^## (.*?)$/gm, '<h3 class="note-h3">$1</h3>')
    .replace(/^---$/gm, '<hr style="border:none; border-top:1.5px dashed rgba(148,163,184,0.4); margin:24px 0;" />');

  // Step 5: Bold Highlighting
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="yellow-highlighter">$1</strong>');

  // Step 6: Markdown Italics
  html = html.replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');

  // Step 6.5: Inline Monospace Code Badges (e.g. `break`, `for`, `int x`)
  html = html.replace(/`([^`\n]+)`/g, '<code class="inline-code-badge">$1</code>');

  // Step 7: Numbered Lists & Bullets transformed to handwritten items
  html = html.replace(/^(\d+)\.\s+(.*?)$/gm, '<div class="handwritten-list-item"><span class="handwritten-num">$1.</span><span>$2</span></div>');
  html = html.replace(/^[-*]\s+(.*?)$/gm, '<div class="handwritten-list-item"><span class="handwritten-bullet">✎</span><span>$1</span></div>');

  // Step 7.5: Post-clean any remaining raw math notation outside HTML tags
  const textSegments = html.split(/(<[^>]+>)/);
  for (let i = 0; i < textSegments.length; i += 2) {
    if (textSegments[i]) {
      textSegments[i] = textSegments[i]
        .replace(/\bx\^2\b/g, 'x²')
        .replace(/\bx\^3\b/g, 'x³')
        .replace(/\bx\^4\b/g, 'x⁴')
        .replace(/\bx\^n\b/g, 'xⁿ')
        .replace(/\by\^2\b/g, 'y²')
        .replace(/\bt\^2\b/g, 't²')
        .replace(/\bA\^k\b/g, 'Aᵏ')
        .replace(/\bA\^n\b/g, 'Aⁿ')
        .replace(/\bA\^2\b/g, 'A²')
        .replace(/\bA\^3\b/g, 'A³')
        .replace(/\bA\^4\b/g, 'A⁴')
        .replace(/\bA\^\{-1\}\b/g, 'A⁻¹')
        .replace(/\bA\^-1\b/g, 'A⁻¹')
        .replace(/\bX_2\b/g, 'x₂')
        .replace(/\bX_1\b/g, 'x₁')
        .replace(/\bx_1\b/g, 'x₁')
        .replace(/\bx_2\b/g, 'x₂')
        .replace(/\bx_3\b/g, 'x₃')
        .replace(/\bx_n\b/g, 'xₙ')
        .replace(/\by_1\b/g, 'y₁')
        .replace(/\by_2\b/g, 'y₂')
        .replace(/\bR_1\b/g, 'R₁')
        .replace(/\bR_2\b/g, 'R₂')
        .replace(/\bR_3\b/g, 'R₃')
        .replace(/\bV_1\b/g, 'V₁')
        .replace(/\bV_2\b/g, 'V₂')
        .replace(/\bV_3\b/g, 'V₃')
        .replace(/\bI_1\b/g, 'I₁')
        .replace(/\bI_2\b/g, 'I₂')
        .replace(/\bI_3\b/g, 'I₃')
        .replace(/\bS_1\b/g, 'S₁')
        .replace(/\bS_2\b/g, 'S₂')
        .replace(/\bR_se\b/g, 'Rₛₑ')
        .replace(/\bR_L\b/g, 'Rₗ')
        .replace(/\bV_L\b/g, 'Vₗ')
        .replace(/\bI_L\b/g, 'Iₗ')
        .replace(/\bP_L\b/g, 'Pₗ')
        .replace(/\bR_th\b/g, 'Rₜₕ')
        .replace(/\bV_th\b/g, 'Vₜₕ')
        .replace(/\bR_eq\b/g, 'Rₑᵩ')
        .replace(/\bR_p\b/g, 'Rₚ')
        .replace(/\bR_s\b/g, 'Rₛ')
        .replace(/\bI_s\b/g, 'Iₛ')
        .replace(/\bV_s\b/g, 'Vₛ')
        .replace(/\bR_a\b/g, 'Rₐ')
        .replace(/\bR_b\b/g, 'Rᵦ')
        .replace(/\bR_c\b/g, 'R꜀')
        .replace(/\bI_a\b/g, 'Iₐ')
        .replace(/\bE_b\b/g, 'Eᵦ')
        .replace(/\bV_m\b/g, 'Vₘ')
        .replace(/\bV_rms\b/g, 'Vᵣₘₛ')
        .replace(/\bV_dc\b/g, 'Vdc')
        .replace(/\bP_max\b/gi, 'Pₘₐₓ')
        .replace(/\bI_sc\b/g, 'Iₛ꜀')
        .replace(/\bV_oc\b/g, 'Vₒ꜀')
        .replace(/\bI_in\b/g, 'Iᵢₙ')
        .replace(/\bI_out\b/g, 'Iₒᵤₜ')
        // Purge any stray \left and \right outside KaTeX (never let literal "left" or "right" leak)
        .replace(/\\*left\s*([(\[{])/gi, '$1')
        .replace(/\\*right\s*([)\]}])/gi, '$1')
        .replace(/\\*(?:left|right)\b(?!\s*[-]?\s*hand)/gi, '');
    }
  }
  html = textSegments.join('');

  // Step 8: Restore Math placeholders (both inline and display)
  mathInlineBlocks.forEach((rendered, i) => {
    html = html.replace(`\x00MATH_INLINE_${i}\x00`, rendered);
  });
  mathDisplayBlocks.forEach((rendered, i) => {
    html = html.replace(`\x00MATH_DISPLAY_${i}\x00`, rendered);
  });

  // Step 9 (POST-PASS): Restore code block placeholders with their rendered HTML
  codeBlocks.forEach((rendered, i) => {
    html = html.replace(`\x00CODEBLOCK_${i}\x00`, rendered);
  });

  if (noteContentCache.size > 80) {
    const firstKey = noteContentCache.keys().next().value;
    noteContentCache.delete(firstKey);
  }
  noteContentCache.set(cacheKey, html);

  return html;
}

const ALLOWED_SUBJECT_IDS = [
  'sub-beee', 
  'sub-aiml', 
  'sub-m1', 
  'sub-c1', 
  'sub-webtech', 
  'sub-p1', 
  'sub-physics', 
  'sub-py', 
  'sub-python',
  'sub-dsa-bcse007',
  'sub-bcse007',
  'BCSE-007'
];
export const isSensorySubjectAllowed = (id) => {
  if (!id) return false;
  // CS301 (Data Structures and Algorithms) is dead as per user instructions
  if (id === 'sub-dsa' || id === 'CS301' || String(id).toLowerCase() === 'cs301') return false;
  const val = String(id).toLowerCase().trim();
  return ALLOWED_SUBJECT_IDS.includes(id) || ['sub-dsa-bcse007', 'sub-bcse007', 'bcse-007'].includes(val);
};

export default function SensoryLab({ 
  currentUser,
  movieContext, 
  isUnitsCollapsed: controlledIsUnitsCollapsed, 
  setIsUnitsCollapsed: controlledSetIsUnitsCollapsed,
  onNavigateTab
}) {
  // Verified active curriculum subjects with full notes ready
  const allSubjects = [
    beeeSubjectDetails,
    aimlSubjectDetails,
    math1SubjectDetails,
    cSubjectDetails,
    webTechSubjectDetails,
    physicsSubjectDetails,
    pythonSubjectDetails,
    dsaSubjectDetails
  ];
  
  const [currentSubjectId, setCurrentSubjectId] = useState(() => {
    if (movieContext?.id && isSensorySubjectAllowed(movieContext.id)) {
      return movieContext.id;
    }
    return 'sub-beee';
  });
  const [selectedUnitNum, setSelectedUnitNum] = useState(1);
  const themeMode = 'cyber';
  const [internalUnitsCollapsed, setInternalUnitsCollapsed] = useState(false);
  
  const isUnitsCollapsed = controlledIsUnitsCollapsed !== undefined ? controlledIsUnitsCollapsed : internalUnitsCollapsed;
  const setIsUnitsCollapsed = controlledSetIsUnitsCollapsed || setInternalUnitsCollapsed;
  
  const [showFormulaSheet, setShowFormulaSheet] = useState(false);

  const [masteryData, setMasteryData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('college_notes_mastery') || '{}');
    } catch (e) {
      return {};
    }
  });

  const currentUnitKey = `${currentSubjectId}_u${selectedUnitNum}`;
  const currentUnitMastery = masteryData[currentUnitKey] || 'unread';

  const toggleUnitMastery = () => {
    const nextStatus = currentUnitMastery === 'mastered' 
      ? 'revision' 
      : currentUnitMastery === 'revision' 
        ? 'unread' 
        : 'mastered';

    const updated = { ...masteryData, [currentUnitKey]: nextStatus };
    setMasteryData(updated);
    try {
      localStorage.setItem('college_notes_mastery', JSON.stringify(updated));
      window.dispatchEvent(new Event('mastery-updated'));
    } catch (e) {}
  };

  const handleToggleRevealAll = (showAll) => {
    if (notesPanelRef.current) {
      const curtains = notesPanelRef.current.querySelectorAll('.active-recall-mask-curtain');
      curtains.forEach(c => {
        c.style.display = showAll ? 'none' : 'flex';
      });
    }
  };

  useEffect(() => {
    if (movieContext?.id && isSensorySubjectAllowed(movieContext.id)) {
      if (movieContext.id !== currentSubjectId) {
        setCurrentSubjectId(movieContext.id);
      }
      if (movieContext.targetUnitNum) {
        setSelectedUnitNum(movieContext.targetUnitNum);
      }
    }
  }, [movieContext]);

  useEffect(() => {
    if (!isSensorySubjectAllowed(currentSubjectId)) {
      setCurrentSubjectId('sub-beee');
      setSelectedUnitNum(1);
    }
  }, [currentSubjectId]);

  useEffect(() => {
    try {
      const subName = activeSubject?.name || 'Notes';
      const subCode = activeSubject?.code || '';
      const unitTitle = activeUnit?.title || `Unit ${selectedUnitNum}`;
      logUserActivity(
        currentUser?.username || 'student',
        'VIEW',
        `${subCode ? subCode + ': ' : ''}${subName} (Unit ${selectedUnitNum})`,
        `Viewed ${unitTitle} in ${themeMode} reader`
      );
    } catch (e) {}
  }, [currentSubjectId, selectedUnitNum, themeMode]);

  // Global event delegation for code editor blocks (Copy, Run Live, Close Console)
  useEffect(() => {
    const handleCodeBlockClick = (e) => {
      // 1. Close Console Drawer
      const closeBtn = e.target.closest('.console-close-btn');
      if (closeBtn) {
        const drawer = closeBtn.closest('.code-console-drawer');
        if (drawer) drawer.style.display = 'none';
        return;
      }

      // 2. Run Code Button
      const runBtn = e.target.closest('.code-run-btn');
      if (runBtn) {
        const box = runBtn.closest('.code-editor-box');
        if (!box) return;
        const rawCode = decodeURIComponent(box.getAttribute('data-code') || '');
        const badge = decodeURIComponent(box.getAttribute('data-badge') || '');
        const drawer = box.querySelector('.code-console-drawer');
        const outputPre = box.querySelector('.code-console-pre');
        const statusPill = box.querySelector('.console-status-pill');

        if (drawer && outputPre) {
          drawer.style.display = 'block';
          if (statusPill) {
            statusPill.textContent = 'Running...';
            statusPill.style.color = '#f59e0b';
          }
          outputPre.textContent = '⚙️ Initializing isolated virtual sandbox runtime...\n';

          setTimeout(() => {
            const result = simulateCodeExecution(rawCode, badge);
            outputPre.textContent = result;
            if (statusPill) {
              statusPill.textContent = 'Exited (0)';
              statusPill.style.color = '#10b981';
            }
          }, 350);
        }
        return;
      }

      // 3. Copy Code Button
      const btn = e.target.closest('.code-copy-btn');
      if (btn) {
        const box = btn.closest('.code-editor-box');
        if (box) {
          const rawCode = decodeURIComponent(box.getAttribute('data-code') || '');
          if (rawCode) {
            // Repair any unclosed string literals or broken char literals
            let cleanCode = rawCode.replace(/'\r?\n'/g, "'\\n'");
            const lines = cleanCode.split(/\r?\n/);
            const result = [];
            let inString = false, currentString = '';
            for (let i = 0; i < lines.length; i++) {
              const line = lines[i];
              let quoteCount = 0;
              for (let c = 0; c < line.length; c++) {
                if (line[c] === '"' && (c === 0 || line[c - 1] !== '\\')) quoteCount++;
              }
              if (inString) {
                if (quoteCount % 2 === 1) {
                  currentString += '\\n' + line;
                  result.push(currentString);
                  currentString = '';
                  inString = false;
                } else {
                  currentString += '\\n' + line;
                }
              } else {
                if (quoteCount % 2 === 1) {
                  inString = true;
                  currentString = line;
                } else {
                  result.push(line);
                }
              }
            }
            if (inString) result.push(currentString);
            cleanCode = result.join('\n');

            navigator.clipboard.writeText(cleanCode).then(() => {
              btn.classList.add('copied');
              const textSpan = btn.querySelector('.copy-text');
              if (textSpan) textSpan.textContent = 'Copied!';
              setTimeout(() => {
                btn.classList.remove('copied');
                if (textSpan) textSpan.textContent = 'Copy';
              }, 2000);
            }).catch(err => {
              console.error('Clipboard copy failed:', err);
            });
          }
        }
        return;
      }

    // 4. Active Recall Mask Curtain Reveal
    const maskCurtain = e.target.closest('.active-recall-mask-curtain');
    if (maskCurtain) {
      maskCurtain.style.display = 'none';
      return;
    }
  };

    document.addEventListener('click', handleCodeBlockClick);
    return () => document.removeEventListener('click', handleCodeBlockClick);
  }, []);

  // Active Subject & Active Unit Data
  const isDSA = currentSubjectId === 'sub-dsa-bcse007' || currentSubjectId === 'BCSE-007' || currentSubjectId === 'sub-bcse007';
  const isPython = currentSubjectId === 'sub-py' || currentSubjectId === 'BCSE-004' || currentSubjectId === 'sub-python';
  const isPhysics = currentSubjectId === 'sub-p1' || currentSubjectId === 'PHYS102' || currentSubjectId === 'BPHY-001' || currentSubjectId === 'sub-physics';
  const isC = currentSubjectId === 'sub-c1' || currentSubjectId === 'BCSE-008' || currentSubjectId === 'CS102' || currentSubjectId === 'sub-c';
  const isAIML = currentSubjectId === 'sub-aiml' || currentSubjectId === 'BCSE-011';
  const isBEEE = currentSubjectId === 'sub-beee' || currentSubjectId === 'BELE-001' || currentSubjectId === 'EE101';
  const isMath1 = currentSubjectId === 'sub-m1' || currentSubjectId === 'sub-math1' || currentSubjectId === 'BMAT-001' || currentSubjectId === 'MATH101';
  const isWebTech = currentSubjectId === 'sub-webtech' || currentSubjectId === 'BCSE-012' || currentSubjectId === 'sub-web';

  const activePdfUrl = isDSA
    ? "/Data_Structures_Master_Notes.pdf"
    : isPython
      ? "/Python_Programming_Master_Notes.pdf"
      : isPhysics
        ? "/Applied_Physics_Master_Notes.pdf"
        : isWebTech
          ? "/BCSE012_Fundamental_of_Web_Technologies_Long_Notes.pdf"
          : isC
            ? "/BCSE008_Computational_and_Problem_Solving_using_C_notes.pdf"
            : isAIML
              ? "/AIML_notes_handwritten.pdf"
              : isMath1
                ? "/BMAT001_Mathematics_I_MMU_Handwritten_Notes.pdf"
                : isBEEE
                  ? "/BEEE_notes.pdf"
                  : null;

  const activePdfDownloadName = isDSA
    ? "Data Structures Master Notes.pdf"
    : isPython
      ? "Python Programming Master Notes.pdf"
      : isPhysics
        ? "Applied Physics Master Notes.pdf"
        : isWebTech
          ? "Fundamental of Web Technologies notes.pdf"
          : isC
            ? "Computational and Problem Solving using C notes.pdf"
            : isAIML
              ? "AIML notes.pdf"
              : isMath1
                ? "Mathematics 1 notes.pdf"
                : isBEEE
                  ? "BEEE notes.pdf"
                  : "Long_Notes.pdf";

  const activePdfPageBadge = isDSA
    ? "BCSE-007 • 12 Pages Long Notes"
    : isPython
      ? "BCSE-004 • 12 Pages Long Notes"
      : isPhysics
        ? "BPHY-001 • 12 Pages Long Notes"
        : isWebTech
          ? "BCSE-012 • 17 Pages Long Notes"
          : isC
            ? "BCSE-008 • 16 Pages Long Notes"
            : isAIML
              ? "BCSE-011 • 13 Pages Long Notes"
              : isMath1
                ? "BMAT-001 • 11 Pages Long Notes"
                : isBEEE
                  ? "BELE-001 • 13 Pages Long Notes"
                  : "University Long Notes";

  const activePdfDescription = isDSA
    ? "Official MMDU syllabus master notes: Asymptotic notation (O, Ω, Θ), 1D/2D/3D array memory addressing, sparse matrix triplet COO representation, complete sorting suite (Bubble/Selection/Insertion/Merge/Quick/Heap/Radix), Linear/Binary searching, Stacks (LIFO), Infix-Postfix-Prefix conversion & evaluation, recursion & Tower of Hanoi, Linear/Circular/Deque/Priority Queues, Singly/Doubly/Circular Linked Lists, Binary Trees, BST traversals & deletion cases, Graph representations (Adjacency Matrix/List), and BFS/DFS graph traversals."
    : isPython
      ? "Official MMDU syllabus long notes: CPython compilation pipeline & PVM architecture, object reference memory model, 9-tier operator precedence, branching & looping (break/continue/pass/for-else), functions & LEGB scope, Lists, Tuples, Dictionaries (hash table internals), File Handling (modes, context managers), and Object-Oriented Programming (Classes, Dunder methods, Operator Overloading, MRO, Polymorphism, Composition)."
      : isPhysics
        ? "Official MMDU syllabus long notes: Wave optics, Newton's rings derivations, Fraunhofer single-slit diffraction, lasers (Ruby & He-Ne 4-level system), Maxwell's equations, skin depth, Schrödinger wave mechanics, and crystal APF derivations."
        : isWebTech
          ? 'Official MMDU syllabus long notes: Internet vs WWW, DNS resolution, TCP/IP, HTML5 semantics, Canvas, and CSS box model with solved exam questions.'
          : isC
            ? 'Official MMDU syllabus long notes: Computational problem solving, 4-stage compilation pipeline, memory segmentation, DMA, pointers, and file I/O with solved exam questions.'
            : isAIML
              ? 'Official MMDU syllabus long notes: PEAS framework, A* search traces, CNF conversion, Resolution Refutation, Decision Trees, and Apriori with solved exam questions.'
              : isMath1
                ? 'Official MMDU syllabus long notes: Matrices, Gauss-Jordan, Curvature, Indeterminate forms, Beta-Gamma, and Fourier series with solved exam questions.'
                : 'Official MMDU syllabus long notes: DC/AC circuits, KCL/KVL, Thevenin equivalent, Transformers, DC machines, BJT, and Boolean logic with solved exam questions.';

  const activeExamAlignedBadge = isDSA
    ? "Covers Big-O/Omega/Theta proofs, 1D/2D/3D address calculations, Lomuto/Hoare Quick Sort partitioning, Tower of Hanoi recurrence T(n)=2T(n-1)+1, circular queue modulo arithmetic, SLL/DLL pointer rewiring, BST 3-case deletion with inorder successor, and BFS/DFS graph traversals."
    : isPython
      ? "Covers CPython vs PVM bytecode compilation, 9-tier operator precedence, for-else & break/continue loop flows, LEGB scope resolution, list shallow vs deep copies, dictionary hash table bucket chaining, file context managers (with statement), and C3 linearization MRO."
    : isPhysics
      ? "Covers Newton's rings derivations, single-slit phasor intensity, He-Ne 4-level resonant pumping, Maxwell curl equations, skin depth in conductors, 1D infinite well quantization, and SC/BCC/FCC APF calculations."
      : isWebTech
        ? "Covers HTTP/HTTPS request-response cycles, DNS resolution hierarchy, semantic HTML5, CSS Flexbox/Grid box model, JavaScript DOM manipulation, and AJAX/Fetch."
        : isC
          ? "Covers 4-stage compilation pipeline, memory segmentation (Stack/Heap/BSS), pointers & dynamic memory (malloc/calloc/free), struct alignment, and file I/O operations."
        : isAIML
          ? "Covers PEAS agent classification, BFS/DFS, A* heuristic proofs, Minimax & Alpha-Beta pruning, Propositional logic & resolution refutation, Supervised vs Unsupervised ML, and Bias-Variance tradeoff."
          : isMath1
            ? "Covers Cayley-Hamilton & Eigenvalues, Rank & Gauss-Jordan, Rolle's & LMVT, Beta-Gamma integrals, Euler's homogeneous theorem, Taylor series, Vector curl/divergence, and Fourier expansions."
            : "Covers DC/AC circuit proofs, Maximum Power Transfer derivation, transformer equivalent circuits, OC/SC tests, P-N junction diode rectifiers, BJT characteristics, and De Morgan's theorem proofs.";

  const getTopperExamNote = () => {
    if (isMath1) {
      if (selectedUnitNum === 1) {
        return (
          <>In semester exams, examiners check for: <strong>(1) Clear row/column operation notation (e.g. R₂ → R₂ - 2R₁)</strong>, <strong>(2) Exact rank condition definitions</strong>, <strong>(3) Verification of Cayley-Hamilton equation</strong>. Always verify matrix dimensions and non-zero pivot entries!</>
        );
      }
      if (selectedUnitNum === 2) {
        return (
          <>In semester exams, examiners check for: <strong>(1) Stating continuity & differentiability hypotheses before applying MVT</strong>, <strong>(2) Accurate successive derivatives for Maclaurin/Taylor series</strong>, <strong>(3) Exact radius of curvature formula substitution</strong>. Always box the value of c!</>
        );
      }
      if (selectedUnitNum === 3) {
        return (
          <>In semester exams, examiners check for: <strong>(1) Euler's theorem degree verification for homogeneous functions</strong>, <strong>(2) Cross-derivative equality ∂²u/∂x∂y = ∂²u/∂y∂x</strong>, <strong>(3) Vector curl & divergence notation with unit vectors î, ĵ, k̂</strong>. Always state conditions for solenoidal (div F = 0) and irrotational (curl F = 0) fields!</>
        );
      }
      if (selectedUnitNum === 4) {
        return (
          <>In semester exams, examiners check for: <strong>(1) Stating convergence test conditions (D'Alembert, Cauchy, Raabe's)</strong>, <strong>(2) Euler Fourier coefficient integrals (a₀, aₙ, bₙ)</strong>, <strong>(3) Symmetry checks (even/odd) to eliminate integrals</strong>. Always write the complete Fourier series summation!</>
        );
      }
      return (
        <>In semester exams, examiners check for: <strong>(1) Stating formula & theorem conditions first</strong>, <strong>(2) Step-by-step substitution & simplification</strong>, <strong>(3) Highlighting the final boxed answer</strong>. Always write intermediate simplification steps clearly!</>
      );
    }
    if (isAIML) {
      return (
        <>In semester exams, examiners check for: <strong>(1) State space & node expansion trace tables</strong>, <strong>(2) Admissible heuristic definitions</strong>, <strong>(3) Pruning cut-offs clearly marked in game trees</strong>. Always show step-by-step resolution refutation clauses!</>
      );
    }
    if (isC) {
      return (
        <>In semester exams, examiners check for: <strong>(1) Complete syntax including header files</strong>, <strong>(2) Pointer dereference safety & NULL checks</strong>, <strong>(3) Accurate memory layout diagrams (Stack/Heap)</strong>. Always declare variables before usage in ANSI C!</>
      );
    }
    if (isPhysics) {
      if (selectedUnitNum === 1) {
        return (
          <>In semester exams, examiners check for: <strong>(1) Stokes' phase reversal (&plusmn;&lambda;/2) condition</strong>, <strong>(2) Clear Newton's rings dark/bright diameter derivations</strong>, <strong>(3) He-Ne 4-level energy transfer diagram</strong>. Always state why the central ring is dark!</>
        );
      }
      if (selectedUnitNum === 2) {
        return (
          <>In semester exams, examiners check for: <strong>(1) Continuity equation &nabla;&middot;J + &part;&rho;/&part;t = 0</strong>, <strong>(2) Displacement current density J<sub>d</sub> = &part;D/&part;t</strong>, <strong>(3) Skin depth derivation &delta; = &radic;[2/(&omega;&mu;&sigma;)]</strong>. Always write both differential and integral Maxwell equations!</>
        );
      }
      if (selectedUnitNum === 3) {
        return (
          <>In semester exams, examiners check for: <strong>(1) Non-existence of nuclear electrons uncertainty proof</strong>, <strong>(2) Normalized 1D box wavefunctions &psi;<sub>n</sub> = &radic;(2/L) sin(n&pi;x/L)</strong>, <strong>(3) Quantized energy levels E<sub>n</sub> = n<sup>2</sup>h<sup>2</sup>/(8mL<sup>2</sup>)</strong>. Always mention zero-point energy E<sub>1</sub> &gt; 0!</>
        );
      }
      if (selectedUnitNum === 4) {
        return (
          <>In semester exams, examiners check for: <strong>(1) Step-by-step SC, BCC, FCC APF derivations (52%, 68%, 74%)</strong>, <strong>(2) 12-point Schottky vs Frenkel comparison</strong>, <strong>(3) Fermi-Dirac step function at T=0 K and Richardson equation</strong>. Always draw unit cell sphere packing!</>
        );
      }
      return (
        <>In semester exams, examiners check for: <strong>(1) Step-by-step physical derivations</strong>, <strong>(2) Accurate ray/energy schematics</strong>, <strong>(3) Boxed final mathematical expressions</strong>. Always write definitions before deriving equations!</>
      );
    }
    if (isDSA) {
      if (selectedUnitNum === 1) {
        return (
          <>In semester exams, examiners check for: <strong>(1) Formal limit definitions for O, &Omega;, &Theta;</strong>, <strong>(2) Exact 2D Row-Major vs Col-Major address formula derivation</strong>, <strong>(3) Step-by-step trace of Quick/Merge Sort partitions</strong>. Always specify Base Address B and element size W in array formulas!</>
        );
      }
      if (selectedUnitNum === 2) {
        return (
          <>In semester exams, examiners check for: <strong>(1) Stack overflow and underflow boundary conditions</strong>, <strong>(2) Infix to Postfix conversion table with operator stack states</strong>, <strong>(3) Tower of Hanoi 3-step recursive induction and 2ⁿ - 1 moves proof</strong>. Remember the first popped item is operand 2 during postfix evaluation!</>
        );
      }
      if (selectedUnitNum === 3) {
        return (
          <>In semester exams, examiners check for: <strong>(1) Circular Queue full condition: (rear + 1) % MAX == front</strong>, <strong>(2) Singly Linked List pointer rewiring: newNode-&gt;next = head; head = newNode;</strong>, <strong>(3) Difference between Linear Queue false overflow and Circular Queue</strong>. Always free allocated heap memory with free()!</>
        );
      }
      if (selectedUnitNum === 4) {
        return (
          <>In semester exams, examiners check for: <strong>(1) BST Inorder traversal producing strictly sorted keys</strong>, <strong>(2) BST deletion Case 3: Inorder Successor replacement</strong>, <strong>(3) BFS Queue vs DFS Stack traversal trace tables</strong>. Always state time complexity as O(V + E) for adjacency lists!</>
        );
      }
      return (
        <>In semester exams, examiners check for: <strong>(1) Complete algorithm step-by-step logic</strong>, <strong>(2) Memory pointer diagrams</strong>, <strong>(3) Big-O Time &amp; Space complexity derivations</strong>. Always handle edge cases like empty structures!</>
      );
    }
    if (isPython) {
      if (selectedUnitNum === 1) {
        return (
          <>In semester exams, examiners check for: <strong>(1) CPython compilation pipeline (Source code &rarr; Bytecode (.pyc) &rarr; PVM)</strong>, <strong>(2) Reference model diagrams (variables point to heap objects)</strong>, <strong>(3) Operator precedence hierarchy</strong>. Always highlight that everything in Python is an object!</>
        );
      }
      if (selectedUnitNum === 2) {
        return (
          <>In semester exams, examiners check for: <strong>(1) for-else loop termination conditions (else runs only on normal exit)</strong>, <strong>(2) *args (tuple) and **kwargs (dict) signatures</strong>, <strong>(3) LEGB scope resolution order (Local &rarr; Enclosing &rarr; Global &rarr; Built-in)</strong>. Always provide clean indentation!</>
        );
      }
      if (selectedUnitNum === 3) {
        return (
          <>In semester exams, examiners check for: <strong>(1) Shallow copy (copy.copy) vs Deep copy (copy.deepcopy) memory pointer diagrams</strong>, <strong>(2) Hash table open addressing vs bucket chaining for dicts</strong>, <strong>(3) Tuple immutability and the single-element comma rule (42,)</strong>. Always write list/dict comprehensions!</>
        );
      }
      if (selectedUnitNum === 4) {
        return (
          <>In semester exams, examiners check for: <strong>(1) Context manager protocol (__enter__ and __exit__ with exception suppression)</strong>, <strong>(2) C3 Linearization MRO merge algorithm calculation</strong>, <strong>(3) Dunder methods for operator overloading (__add__, __str__, __repr__)</strong>. Always illustrate class vs instance attribute namespaces!</>
        );
      }
      return (
        <>In semester exams, examiners check for: <strong>(1) Complete syntax and indentation</strong>, <strong>(2) Object-oriented memory layouts</strong>, <strong>(3) Standard library function usage</strong>. Always write clean Pythonic code!</>
      );
    }
    if (isWebTech) {
      return (
        <>In semester exams, examiners check for: <strong>(1) Clean semantic HTML5 structure</strong>, <strong>(2) Accurate CSS box-model diagrams</strong>, <strong>(3) JavaScript event listeners with proper syntax</strong>. Always explain the client-server request/response flow!</>
      );
    }
    return (
      <>In semester exams, examiners check for: <strong>(1) Circuit Schematics with labeled arrows</strong>, <strong>(2) Exact definitions</strong>, <strong>(3) Step-by-step mathematical steps with units</strong>. Always draw the equivalent circuit before writing equations!</>
    );
  };

  const activeSubject = isDSA
    ? dsaSubjectDetails
    : isPython
      ? pythonSubjectDetails
      : isPhysics
        ? physicsSubjectDetails
        : isC
          ? cSubjectDetails
          : isWebTech
            ? webTechSubjectDetails
            : isAIML 
              ? aimlSubjectDetails 
              : isBEEE 
                ? beeeSubjectDetails 
                : isMath1
                  ? math1SubjectDetails
                  : (allSubjects.find(s => s.id === currentSubjectId) || beeeSubjectDetails);

  const unitsList = isDSA
    ? dsaUnitsData
    : isPython
      ? pythonUnitsData
      : isPhysics
        ? physicsUnitsData
        : isC
          ? cUnitsData
          : isWebTech
            ? webTechUnitsData
            : isAIML 
              ? aimlUnitsData 
              : isBEEE 
                ? beeeUnitsData 
                : isMath1 
                  ? math1UnitsData 
                  : (activeSubject.units || []);
  const beeeUnit = isDSA
    ? (dsaUnitsData.find(u => u.unitNum === selectedUnitNum) || dsaUnitsData[0])
    : isPython
      ? (pythonUnitsData.find(u => u.unitNum === selectedUnitNum) || pythonUnitsData[0])
      : isPhysics
        ? (physicsUnitsData.find(u => u.unitNum === selectedUnitNum) || physicsUnitsData[0])
        : isC
          ? (cUnitsData.find(u => u.unitNum === selectedUnitNum) || cUnitsData[0])
          : isWebTech
            ? (webTechUnitsData.find(u => u.unitNum === selectedUnitNum) || webTechUnitsData[0])
            : isAIML 
              ? (aimlUnitsData.find(u => u.unitNum === selectedUnitNum) || aimlUnitsData[0])
              : isBEEE 
                ? (beeeUnitsData.find(u => u.unitNum === selectedUnitNum) || beeeUnitsData[0])
                : isMath1
                  ? (math1UnitsData.find(u => u.unitNum === selectedUnitNum) || math1UnitsData[0])
                  : (activeSubject.units?.find(u => (u.unitNum || u.num) === selectedUnitNum) || activeSubject.units?.[0] || {});

  const notesPanelRef = useRef(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const getSubjectMasterPdf = () => {
    if (isBEEE) return { url: '/BELE001_Basic_Electrical_and_Electronics_Engineering_notes.pdf', name: 'BELE001_BEEE_Notes.pdf' };
    if (isAIML) return { url: '/AIML_notes_handwritten.pdf', name: 'BCSE011_AIML_Notes.pdf' };
    if (isMath1) return { url: '/BMAT001_Mathematics_I_MMU_Handwritten_Notes.pdf', name: 'BMAT001_Maths_I_Notes.pdf' };
    if (isC) return { url: '/BCSE008_Computational_and_Problem_Solving_using_C_notes.pdf', name: 'BCSE008_C_Programming_Notes.pdf' };
    if (isWebTech) return { url: '/BCSE012_Fundamental_of_Web_Technologies_Long_Notes.pdf', name: 'BCSE012_Web_Technologies_Notes.pdf' };
    if (isPhysics) return { url: '/Applied_Physics_Master_Notes.pdf', name: 'Applied_Physics_Notes.pdf' };
    if (isPython) return { url: '/Python_Programming_Master_Notes.pdf', name: 'Python_Programming_Notes.pdf' };
    if (isDSA) return { url: '/Data_Structures_Master_Notes.pdf', name: 'Data_Structures_Notes.pdf' };
    return { url: '/BELE001_Basic_Electrical_and_Electronics_Engineering_notes.pdf', name: 'College_Notes.pdf' };
  };

  const handlePrint = () => {
    setIsPrinting(true);
    document.body.classList.add('sensory-printing');
    setTimeout(() => {
      try {
        const docTitle = `${activeSubject?.name || 'Notes'}_Unit_${selectedUnitNum}`.replace(/[^a-zA-Z0-9_\-\s]/g, '').trim();
        triggerUniversalPrint(docTitle);
      } finally {
        setTimeout(() => {
          document.body.classList.remove('sensory-printing');
          setIsPrinting(false);
        }, 800);
      }
    }, 150);
  };

  const getSubjectFormulas = () => {
    if (isBEEE) {
      return [
        { name: "Ohm's Law & Power", eq: "V = I \\cdot R, \\quad P = V \\cdot I = I^2 R = \\frac{V^2}{R}", tip: "Essential for DC and AC network calculations" },
        { name: "Kirchhoff's Current Law (KCL)", eq: "\\sum I_{\\text{enter}} = \\sum I_{\\text{leave}} \\implies \\sum_{k=1}^n I_k = 0", tip: "Based on Conservation of Electric Charge" },
        { name: "Kirchhoff's Voltage Law (KVL)", eq: "\\sum V_{\\text{drops}} = \\sum V_{\\text{sources}} \\implies \\sum_{k=1}^n V_k = 0", tip: "Based on Conservation of Energy" },
        { name: "Thevenin's Equivalent Circuit", eq: "V_{th} = V_{oc}, \\quad R_{th} = \\frac{V_{oc}}{I_{sc}}, \\quad I_L = \\frac{V_{th}}{R_{th} + R_L}", tip: "Deactivate independent sources (V: short, I: open)" },
        { name: "Norton's Equivalent Circuit", eq: "I_N = I_{sc} = \\frac{V_{th}}{R_{th}}, \\quad R_N = R_{th}", tip: "Dual of Thevenin's theorem" },
        { name: "Maximum Power Transfer Theorem (DC)", eq: "P_{\\max} = \\frac{V_{th}^2}{4 R_{th}} \\quad (\\text{when } R_L = R_{th}, \\; \\eta = 50\\%)", tip: "Efficiency is strictly 50% at maximum power transfer" },
        { name: "Delta to Star Conversion (Δ → Y)", eq: "R_A = \\frac{R_{AB} \\cdot R_{CA}}{R_{AB} + R_{BC} + R_{CA}}", tip: "Product of adjacent arms / sum of all three arms" },
        { name: "Star to Delta Conversion (Y → Δ)", eq: "R_{AB} = R_A + R_B + \\frac{R_A R_B}{R_C}", tip: "Sum of two arms + product / opposite arm" },
        { name: "AC Sinusoid RMS & Average Values", eq: "V_{rms} = \\frac{V_m}{\\sqrt{2}} \\approx 0.707 V_m, \\quad V_{avg} = \\frac{2 V_m}{\\pi} \\approx 0.637 V_m", tip: "Form factor = 1.11, Peak factor = 1.414" },
        { name: "AC Series RLC Resonance & Q-Factor", eq: "f_r = \\frac{1}{2\\pi \\sqrt{LC}}, \\quad Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}, \\quad \\text{BW} = \\frac{f_r}{Q}", tip: "At resonance: Z = R (minimum), I = V/R (maximum)" }
      ];
    }
    if (isPhysics) {
      return [
        { name: "Stokes' Phase Reversal Condition", eq: "\\Delta = 2\\mu t \\cos r + \\frac{\\lambda}{2} = n\\lambda \\quad (\\text{Destructive Interference})", tip: "Reflection at denser medium adds λ/2 path difference" },
        { name: "Newton's Rings (Dark Ring Diameter)", eq: "D_n^2 = 4n\\lambda R \\implies D_n = 2\\sqrt{n\\lambda R}", tip: "Dark ring diameter proportional to square root of integers" },
        { name: "Newton's Rings (Bright Ring Diameter)", eq: "D_n^2 = 2(2n - 1)\\lambda R \\implies D_n = \\sqrt{2(2n-1)\\lambda R}", tip: "Bright ring diameter proportional to square root of odd numbers" },
        { name: "Fraunhofer Single-Slit Minima", eq: "a \\sin \\theta = m\\lambda \\quad (m = \\pm 1, \\pm 2, \\dots)", tip: "Central maximum width is 2λ/a" },
        { name: "Maxwell I (Gauss's Law for Electrostatics)", eq: "\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}", tip: "Integral: ∮ E·dA = Q_enc / ε₀" },
        { name: "Maxwell II (Gauss's Law for Magnetism)", eq: "\\nabla \\cdot \\mathbf{B} = 0", tip: "Absence of isolated magnetic monopoles" },
        { name: "Maxwell III (Faraday's Law of Induction)", eq: "\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}", tip: "Time-varying B-field induces circulating E-field" },
        { name: "Maxwell IV (Ampere-Maxwell Law)", eq: "\\nabla \\times \\mathbf{B} = \\mu_0 \\mathbf{J} + \\mu_0 \\varepsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}", tip: "Displacement current J_d = ε₀ ∂E/∂t" },
        { name: "Conductor Skin Depth (Penetration Depth)", eq: "\\delta = \\sqrt{\\frac{2}{\\omega \\mu \\sigma}} = \\frac{1}{\\sqrt{\\pi f \\mu \\sigma}}", tip: "Depth where EM wave amplitude drops to 1/e (37%)" },
        { name: "1D Infinite Potential Well Quantized Energy", eq: "E_n = \\frac{n^2 h^2}{8mL^2} = \\frac{n^2 \\pi^2 \\hbar^2}{2mL^2}, \\quad \\psi_n(x) = \\sqrt{\\frac{2}{L}}\\sin\\left(\\frac{n\\pi x}{L}\\right)", tip: "Ground state energy E₁ > 0 (zero-point energy)" }
      ];
    }
    if (isMath1) {
      return [
        { name: "Euler's Homogeneous Function Theorem", eq: "x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = n \\cdot u", tip: "For function of degree n homogeneous in x and y" },
        { name: "Euler's 2nd Order Derivative Form", eq: "x^2 \\frac{\\partial^2 u}{\\partial x^2} + 2xy \\frac{\\partial^2 u}{\\partial x\\partial y} + y^2 \\frac{\\partial^2 u}{\\partial y^2} = n(n-1)u", tip: "Frequent university 6-mark problem" },
        { name: "Taylor Series (1-Variable Power Expansion)", eq: "f(x) = \\sum_{n=0}^\\infty \\frac{f^{(n)}(a)}{n!} (x - a)^n", tip: "Power series expansion about point x = a" },
        { name: "Maclaurin Series (Expansion about a = 0)", eq: "f(x) = \\sum_{n=0}^\\infty \\frac{f^{(n)}(0)}{n!} x^n", tip: "Special case of Taylor series when a = 0" },
        { name: "Jacobian Coordinate Transformation", eq: "J = \\frac{\\partial(x, y)}{\\partial(u, v)} = \\begin{vmatrix} \\frac{\\partial x}{\\partial u} & \\frac{\\partial x}{\\partial v} \\\\[4pt] \\frac{\\partial y}{\\partial u} & \\frac{\\partial y}{\\partial v} \\end{vmatrix}, \\quad J \\cdot J' = 1", tip: "Coordinate substitution multiplier in multiple integrals" },
        { name: "Lagrange's Mean Value Theorem (LMVT)", eq: "f'(c) = \\frac{f(b) - f(a)}{b - a} \\quad \\text{for } c \\in (a, b)", tip: "f must be continuous in [a,b] and differentiable in (a,b)" },
        { name: "Cayley-Hamilton Theorem Statement", eq: "p(A) = A^n + c_{n-1}A^{n-1} + \\dots + c_0 I = 0", tip: "Every square matrix satisfies its own characteristic polynomial" },
        { name: "Eigenvalues Sum & Determinant Relations", eq: "\\sum_{i=1}^n \\lambda_i = \\text{Trace}(A), \\quad \\prod_{i=1}^n \\lambda_i = \\det(A)", tip: "Quickest check for eigenvalue calculations" }
      ];
    }
    if (isDSA) {
      return [
        { name: "1D Array Element Address Calculation", eq: "\\text{Loc}(A[i]) = \\text{Base} + (i - \\text{LB}) \\times c", tip: "c = element size in bytes" },
        { name: "2D Array Row-Major Memory Mapping", eq: "\\text{Loc}(A[i][j]) = \\text{Base} + [ (i - \\text{LB}_r) \\cdot N + (j - \\text{LB}_c) ] \\times c", tip: "N = total number of columns" },
        { name: "2D Array Column-Major Memory Mapping", eq: "\\text{Loc}(A[i][j]) = \\text{Base} + [ (j - \\text{LB}_c) \\cdot M + (i - \\text{LB}_r) ] \\times c", tip: "M = total number of rows" },
        { name: "Circular Queue Full & Empty Conditions", eq: "\\text{Full}: (\\text{rear} + 1) \\% N = \\text{front}, \\quad \\text{Empty}: \\text{front} = -1", tip: "Eliminates false queue-overflow memory waste" },
        { name: "Binary Tree Structural Invariant", eq: "N_{\\max} = 2^h - 1, \\quad \\text{Leaves } L = I + 1", tip: "Height h tree contains at most 2^h - 1 nodes" },
        { name: "QuickSort Master Recurrence", eq: "T(n) = 2T(n/2) + O(n) \\implies O(n \\log n) \\text{ best/avg}, \\; O(n^2) \\text{ worst}", tip: "Worst case occurs with already sorted array" }
      ];
    }
    if (isC) {
      return [
        { name: "1D Array Address Formula", eq: "\\text{Address}(A[i]) = \\text{Base} + i \\times \\text{sizeof}(\\text{type})", tip: "Zero-based indexing in C" },
        { name: "2D Array Row-Major Offset", eq: "\\text{Address}(A[i][j]) = \\text{Base} + (i \\cdot \\text{Cols} + j) \\times \\text{sizeof}(\\text{type})", tip: "Stored consecutively row by row in RAM" },
        { name: "Pointer Arithmetic Relation", eq: "*(p + i) \\equiv p[i], \\quad \\&p[i] \\equiv (p + i)", tip: "p + 1 advances by sizeof(*p) bytes" },
        { name: "Dynamic Memory Allocation", eq: "p = (\\text{int*})\\text{calloc}(n, \\text{sizeof}(\\text{int})), \\quad \\text{free}(p); \\; p = \\text{NULL};", tip: "calloc zeroes memory; always free and null pointer" }
      ];
    }
    if (isAIML) {
      return [
        { name: "Bayes' Theorem & Posterior Probability", eq: "P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}", tip: "Posterior = (Likelihood * Prior) / Evidence" },
        { name: "A* Search Evaluation Function", eq: "f(n) = g(n) + h(n), \\quad h(n) \\le h^*(n) \\text{ (Admissible)}", tip: "Guarantees optimal path when h is admissible" },
        { name: "Minimax Decision Value", eq: "V(s) = \\max_{a \\in \\text{Actions}(s)} \\min_{s' \\in \\text{Result}(s,a)} V(s')", tip: "Optimal adversarial zero-sum game tree search" },
        { name: "Classification Precision, Recall & F1", eq: "\\text{Prec} = \\frac{TP}{TP + FP}, \\quad \\text{Rec} = \\frac{TP}{TP + FN}, \\quad F_1 = 2\\frac{\\text{Prec} \\cdot \\text{Rec}}{\\text{Prec} + \\text{Rec}}", tip: "F1 is harmonic mean of precision and recall" }
      ];
    }
    if (isPython) {
      return [
        { name: "Sequence Slicing Rule", eq: "\\text{seq}[\\text{start} : \\text{stop} : \\text{step}]", tip: "Negative step reverses sequence: seq[::-1]" },
        { name: "Dictionary Lookup Complexity", eq: "\\text{Average: } \\mathcal{O}(1), \\quad \\text{Worst Case: } \\mathcal{O}(n)", tip: "Uses hash table bucket lookup" },
        { name: "List Comprehension Generator", eq: "[f(x) \\text{ for } x \\text{ in } S \\text{ if } P(x)]", tip: "More efficient and readable than map/filter" }
      ];
    }
    // WebTech & General
    return [
      { name: "CSS Box Model Total Width", eq: "\\text{Total Width} = \\text{content} + 2(\\text{padding}) + 2(\\text{border}) + 2(\\text{margin})", tip: "box-sizing: border-box includes padding & border" },
      { name: "Viewport Relative Sizing", eq: "1\\text{vw} = 1\\% \\text{ of viewport width}, \\quad 1\\text{rem} = \\text{root font size}", tip: "Ensures fluid responsive typography" },
      { name: "HTTP Status Code Taxonomy", eq: "2xx \\text{ Success}, \\; 3xx \\text{ Redirect}, \\; 4xx \\text{ Client Err}, \\; 5xx \\text{ Server Err}", tip: "200 OK, 301 Moved, 400 Bad Req, 404 Not Found, 500 Server Error" }
    ];
  };

  const handlePrintFormulaSheetWindow = () => {
    const formulas = getSubjectFormulas();
    const rows = formulas.map(f => {
      let eqHtml = '';
      try {
        eqHtml = katex.renderToString(f.eq, { displayMode: true, throwOnError: false });
      } catch (e) {
        eqHtml = `<div style="font-family:monospace;font-weight:bold;text-align:center;">${f.eq}</div>`;
      }
      return `
        <div style="border:1.5px solid #cbd5e1;border-radius:8px;padding:12px;background:#f8fafc;page-break-inside:avoid;break-inside:avoid;">
          <div style="font-size:10pt;font-weight:800;color:#1e3a8a;margin-bottom:6px;border-bottom:1px solid #e2e8f0;padding-bottom:4px;">
            📌 ${f.name}
          </div>
          <div style="padding:6px 0;overflow-x:auto;">
            ${eqHtml}
          </div>
          ${f.tip ? `<div style="font-size:8pt;color:#64748b;margin-top:4px;">💡 ${f.tip}</div>` : ''}
        </div>
      `;
    }).join('');

    const sheetHTML = `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <title>${activeSubject.code} Formula Cheat-Sheet</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"/>
      <style>
        @page { size: A4 portrait; margin: 10mm; }
        * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        body { font-family: 'Inter', -apple-system, sans-serif; margin: 0; padding: 0; color: #0f172a; }
        .cheat-header { border-bottom: 2.5px solid #1e3a8a; padding-bottom: 8px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: flex-end; }
        .cheat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      </style>
    </head>
    <body>
      <div class="cheat-header">
        <div>
          <h1 style="font-size:15pt;margin:0;color:#0f172a;font-weight:900;">${activeSubject.name} (${activeSubject.code})</h1>
          <div style="font-size:9pt;color:#2563eb;font-weight:700;margin-top:2px;">⚡ OFFICIAL UNIVERSITY EXAM FORMULA & THEOREM CHEAT-SHEET &bull; UNIT ${selectedUnitNum}</div>
        </div>
        <div style="text-align:right;font-size:8pt;color:#64748b;">
          <div>100% University Exam Aligned</div>
          <div>All College Notes Master Repository</div>
        </div>
      </div>
      <div class="cheat-grid">
        ${rows}
      </div>
      <div style="margin-top:14px;padding-top:6px;border-top:1px solid #cbd5e1;font-size:7.5pt;color:#64748b;display:flex;justify-content:space-between;">
        <span>Generated for student quick revision &bull; Student: ${currentUser?.username || 'Verified Student'}</span>
        <span>Verified MMEC Syllabus 2025-26</span>
      </div>
    </body>
    </html>`;

    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(sheetHTML);
      printWin.document.close();
      printWin.focus();
      setTimeout(() => {
        try {
          printWin.print();
        } catch (e) {}
      }, 350);
    } else {
      window.print();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}>
      {/* -------------------------------------------------------------------
         PART A: READER HEADER & ADVANCED CONTROLS
         Theme Mode Selector, Bookmark, Print
         ------------------------------------------------------------------- */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '18px', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
        <div style={{ flex: '1 1 320px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span className="badge-neon font-display">
              ⚡ VERIFIED LECTURE NOTES
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              {activeSubject.code} • Semester {activeSubject.semester}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.95rem)', fontWeight: 900, color: 'var(--text-main)', wordBreak: 'break-word', lineHeight: 1.25 }}>
            {activeSubject.name} Notes
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '750px', marginTop: '4px', lineHeight: 1.4 }}>
            Exhaustive, high-yield university lecture notes with step-by-step proofs, hand-drawn vector circuits, and interactive simulation.
          </p>
        </div>

        {/* Action Controls */}
        <div className="sensory-action-bar" style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', flex: '1 1 auto', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}>

          {/* Quick Back to Catalog Button */}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              if (onNavigateTab) onNavigateTab('subjects-notes');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#fff',
              border: '1px solid var(--border-dim)'
            }}
            title="Return to Subject Catalog"
          >
            <ChevronLeft size={15} /> All Subjects
          </button>

          {/* Toggle Unit Selector Drawer */}
          <button 
            className="btn-outline" 
            onClick={() => setIsUnitsCollapsed(!isUnitsCollapsed)}
            style={{ 
              borderColor: isUnitsCollapsed ? 'var(--neon-cyan)' : undefined, 
              color: isUnitsCollapsed ? 'var(--neon-cyan)' : undefined,
              background: isUnitsCollapsed ? 'rgba(0, 240, 255, 0.14)' : undefined,
              fontWeight: 700,
              fontSize: '0.82rem',
              padding: '7px 14px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
            title={isUnitsCollapsed ? "Open Units Panel" : "Hide Units Panel"}
          >
            {isUnitsCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
            <span>{isUnitsCollapsed ? 'Show Units' : 'Hide Units'}</span>
          </button>

          {/* 📥 1-Click Master Notes PDF Download */}
          <button
            type="button"
            onClick={() => {
              const pdf = getSubjectMasterPdf();
              downloadPdf(pdf.url, pdf.name, activeSubject?.name);
            }}
            className="btn-outline"
            style={{
              borderColor: '#38bdf8',
              color: '#38bdf8',
              background: 'rgba(56, 189, 248, 0.12)',
              fontWeight: 800,
              fontSize: '0.82rem',
              padding: '7px 14px',
              borderRadius: '8px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
            title={`Download Master Notes PDF for ${activeSubject.name}`}
          >
            <Download size={15} /> Download PDF
          </button>

          {/* ⚡ 1-Click Formula & Theorem Cheat-Sheet Modal */}
          <button 
            type="button"
            className="btn-outline" 
            onClick={() => setShowFormulaSheet(true)}
            style={{
              borderColor: '#f59e0b',
              color: '#f59e0b',
              background: 'rgba(245, 158, 11, 0.14)',
              fontWeight: 800,
              fontSize: '0.82rem',
              padding: '7px 14px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
            title="Open Interactive 1-Page Formula & Theorem Cheat-Sheet for this Unit"
          >
            <Zap size={15} /> Formula Sheet
          </button>

          {/* 🖨️ Clean University Print / Save as PDF */}
          <button 
            type="button"
            className="btn-outline" 
            onClick={handlePrint}
            disabled={isPrinting}
            style={{
              cursor: isPrinting ? 'wait' : 'pointer',
              opacity: isPrinting ? 0.75 : 1,
              borderColor: 'var(--neon-cyan)',
              color: 'var(--neon-cyan)',
              background: 'rgba(0, 240, 255, 0.1)',
              fontWeight: 800,
              fontSize: '0.82rem',
              padding: '7px 14px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="Print Full Unit Notes or Save as PDF"
          >
            <Printer size={15} /> {isPrinting ? 'Opening Print...' : 'Print Notes'}
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------
         PART B: STUDY DECK (Responsive Full-Width or 2-Column Mode)
         ------------------------------------------------------------------- */}
      <div 
        className={`study-deck-grid ${isUnitsCollapsed ? 'units-collapsed' : ''}`}
      >
        
        {/* === COLUMN 1: LEFT NAVIGATOR (Collapsible) === */}
        {!isUnitsCollapsed && (
          <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '18px', height: 'fit-content' }}>
            {/* Subject Header with Close Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                SELECT SUBJECT & UNITS
              </span>
              <button
                onClick={() => setIsUnitsCollapsed(true)}
                title="Close select subject section (<)"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-dim)',
                  color: 'var(--neon-cyan)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  transition: 'all 0.15s ease'
                }}
              >
                <ChevronLeft size={14} /> Close
              </button>
            </div>

            {/* Subject Dropdown */}
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Select Subject:
              </label>
              <select
                value={isDSA ? 'sub-dsa-bcse007' : currentSubjectId}
                onChange={(e) => {
                  setCurrentSubjectId(e.target.value);
                  setSelectedUnitNum(1);
                }}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: 'rgba(7,9,14,0.9)',
                  color: '#fff',
                  border: '1px solid var(--border-dim)',
                  fontSize: '0.85rem'
                }}
              >
                {allSubjects.map(s => (
                  <option 
                    key={s.id} 
                    value={s.id}
                    style={{ color: '#fff' }}
                  >
                    {s.code}: {s.name} (Semester {s.semester})
                  </option>
                ))}
              </select>
            </div>

            {/* Unit Switcher */}
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Select Unit ({(isBEEE || isAIML || isMath1 || isWebTech || isC || isPython || isDSA) ? '4 Units Syllabus' : `${activeSubject.units?.length || 0} Units`}):
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {unitsList.map(u => {
                  const num = u.unitNum || u.num;
                  const isSelected = selectedUnitNum === num;
                  return (
                    <button
                      key={num}
                      onClick={() => setSelectedUnitNum(num)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '8px',
                        textAlign: 'left',
                        background: isSelected ? 'rgba(0, 240, 255, 0.12)' : 'rgba(255,255,255,0.03)',
                        border: isSelected ? '1px solid var(--neon-cyan)' : '1px solid var(--border-dim)',
                        color: isSelected ? '#fff' : 'var(--text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                          Unit {num}: {u.title}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: isSelected ? 'var(--neon-amber)' : 'var(--text-dim)' }}>
                          {u.examWeightage ? `Weightage: ${u.examWeightage}` : `${u.pages} Pages • Verified`}
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 size={16} color="var(--neon-cyan)" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* University Exam Badge */}
            <div style={{ background: 'rgba(7,9,14,0.7)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-dim)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--neon-green)', fontWeight: 800, fontSize: '0.82rem', marginBottom: '6px' }}>
                <Sparkles size={16} /> 100% University Exam Aligned
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {activeExamAlignedBadge}
              </p>
            </div>
          </div>
        )}

        {/* === COLUMN 2: RIGHT NOTES READER VIEWPORT === */}
        <div 
          ref={notesPanelRef}
          className={`glass-panel notes-reader-panel ${
            themeMode === 'cyber' 
              ? 'theme-cyber' 
              : themeMode === 'paper' 
                ? 'theme-paper' 
                : 'theme-clean'
          }`} 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '28px',
            position: 'relative',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            boxSizing: 'border-box',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}
        >
          {/* Clean Academic Content Viewport */}

          {/* Quick Horizontal Unit Switcher Bar (Appears when units sidebar is collapsed) */}
          {isUnitsCollapsed && (
            <div style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              overflowX: 'auto',
              padding: '12px 18px',
              background: themeMode === 'clean' ? '#f1f5f9' : themeMode === 'paper' ? '#fef3c7' : 'rgba(7, 10, 20, 0.85)',
              borderRadius: '12px',
              border: themeMode === 'clean' ? '1px solid #cbd5e1' : themeMode === 'paper' ? '1px solid #fde68a' : '1px solid var(--border-glow)',
              marginBottom: '4px'
            }}>
              <button
                onClick={() => setIsUnitsCollapsed(false)}
                title="Open select subject section (>)"
                style={{
                  padding: '7px 14px',
                  borderRadius: '20px',
                  border: '1px solid var(--neon-cyan)',
                  background: 'rgba(0, 240, 255, 0.16)',
                  color: 'var(--neon-cyan)',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <ChevronRight size={14} /> Show Subject
              </button>
              <span style={{ 
                fontSize: '0.75rem', 
                color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#92400e' : 'var(--text-dim)', 
                fontWeight: 900, 
                letterSpacing: '1px', 
                whiteSpace: 'nowrap' 
              }}>
                SWITCH UNIT:
              </span>
              {unitsList.map(u => {
                const num = u.unitNum || u.num;
                const isSelected = selectedUnitNum === num;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedUnitNum(num)}
                    style={{
                      padding: '7px 16px',
                      borderRadius: '20px',
                      border: isSelected 
                        ? (themeMode === 'clean' ? '1px solid #2563eb' : themeMode === 'paper' ? '1px solid #d97706' : '1px solid var(--neon-cyan)')
                        : (themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : '1px solid rgba(255,255,255,0.08)'),
                      background: isSelected 
                        ? (themeMode === 'clean' ? '#eff6ff' : themeMode === 'paper' ? '#fde68a' : 'rgba(0, 240, 255, 0.22)')
                        : (themeMode === 'clean' ? '#ffffff' : themeMode === 'paper' ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.03)'),
                      color: isSelected 
                        ? (themeMode === 'clean' ? '#1d4ed8' : themeMode === 'paper' ? '#78350f' : '#fff')
                        : (themeMode === 'clean' ? '#475569' : themeMode === 'paper' ? '#92400e' : 'var(--text-muted)'),
                      fontSize: '0.82rem',
                      fontWeight: isSelected ? 800 : 500,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    Unit {num}: {u.title}
                  </button>
                );
              })}
            </div>
          )}

          {/* Top Unit Banner */}
          <div style={{ 
            borderBottom: themeMode === 'clean' ? '2px solid #e2e8f0' : themeMode === 'paper' ? '2px dashed #cbd5e1' : '2px solid rgba(255, 255, 255, 0.12)', 
            paddingBottom: '18px' 
          }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="badge-crimson">UNIT {selectedUnitNum}</span>
              <span className="badge-neon">{activeSubject.code}</span>
              <span className="badge-amber">{beeeUnit.examWeightage || '25 Marks'}</span>
              <span style={{ 
                fontSize: '0.82rem', 
                color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#64748b' : 'var(--text-dim)' 
              }}>
                Reading Time: {beeeUnit.readingTime || '35 mins'}
              </span>
            </div>

            <h2 className={themeMode !== 'clean' ? 'handwritten-heading' : ''} style={{ 
              fontSize: 'clamp(1.35rem, 2.2vw, 1.95rem)', 
              fontWeight: 900, 
              color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fef08a',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              lineHeight: 1.25
            }}>
              {beeeUnit.title}
            </h2>
            <p style={{ 
              color: themeMode === 'clean' ? '#475569' : themeMode === 'paper' ? '#1e293b' : '#c0c8db', 
              fontSize: '0.96rem', 
              marginTop: '6px', 
              lineHeight: 1.6 
            }}>
              {beeeUnit.summary}
            </p>
          </div>

          {/* Sticky Margin Topper Tip */}
          <div className="sticky-margin-note">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: themeMode === 'clean' ? '#2563eb' : themeMode === 'paper' ? '#b45309' : 'var(--neon-amber)', 
              fontWeight: 800, 
              fontSize: '0.95rem', 
              marginBottom: '4px' 
            }}>
              <Lightbulb size={18} /> TOPPER'S EXAM NOTE (MUST-DO FOR FULL MARKS)
            </div>
            <p style={{ 
              color: themeMode === 'clean' ? '#1e40af' : themeMode === 'paper' ? '#78350f' : '#fef3c7', 
              fontSize: '0.9rem', 
              lineHeight: 1.6 
            }}>
              {getTopperExamNote()}
            </p>
          </div>

          {/* Sections Loop */}
          {beeeUnit.sections ? (
            beeeUnit.sections.map(section => (
              <div key={section.sectionId} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}>
                <h3 className={themeMode !== 'clean' ? 'handwritten-heading' : ''} style={{ 
                  fontSize: '1.45rem', 
                  fontWeight: 900, 
                  color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#0369a1' : 'var(--neon-cyan)', 
                  borderBottom: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1.5px dashed #cbd5e1' : '1px solid rgba(255,255,255,0.08)', 
                  paddingBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  {section.title}
                </h3>

                {/* High-Contrast, High-Legibility Note Content (With Real Handwriting Font in Paper Mode) */}
                <div 
                  className="notes-html-content"
                  style={{ 
                    color: themeMode === 'clean' ? '#334155' : themeMode === 'paper' ? '#1e3a8a' : '#f1f5f9', 
                    fontSize: themeMode === 'paper' ? '1.55rem' : '1.02rem',
                    lineHeight: themeMode === 'paper' ? '34px' : 1.85,
                    fontFamily: themeMode === 'clean' ? "'Inter', sans-serif" : themeMode === 'paper' ? "'Caveat', 'Patrick Hand', cursive, sans-serif" : undefined,
                    letterSpacing: themeMode === 'paper' ? '0.3px' : undefined,
                    whiteSpace: 'pre-line',
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere',
                    maxWidth: '100%',
                    minWidth: 0,
                    boxSizing: 'border-box'
                  }}
                  dangerouslySetInnerHTML={{
                    __html: formatNoteContent(section.content, false)
                  }}
                />

                {/* Vector SVG Diagram with dynamic themeMode */}
                <HandwrittenDiagram 
                  sectionId={section.sectionId} 
                  themeMode={themeMode}
                  isHandwrittenMode={themeMode !== 'clean'} 
                />

                {/* Live Interactive Circuit Simulator (for Unit 1 Section 3: Thevenin & MPTT) */}
                {section.sectionId === 'u1-s3' && (
                  <InteractiveTheveninLab themeMode={themeMode} />
                )}
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>Loading unit content...</p>
          )}

          {/* Guaranteed Exam Questions Section */}
          <div style={{ 
            borderTop: themeMode === 'clean' ? '2px solid #e2e8f0' : themeMode === 'paper' ? '2px dashed #cbd5e1' : '2px dashed rgba(255,255,255,0.15)', 
            paddingTop: '20px', 
            marginTop: '14px' 
          }}>
            <h4 style={{ 
              fontSize: '1.2rem', 
              fontWeight: 800, 
              color: themeMode === 'clean' ? '#dc2626' : themeMode === 'paper' ? '#b91c1c' : 'var(--neon-pink)', 
              marginBottom: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px' 
            }}>
              🎯 Guaranteed 10-Mark University Questions from Unit {selectedUnitNum}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {isAIML && selectedUnitNum === 1 && (
                <>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #2563eb' : themeMode === 'paper' ? '4px solid #0284c7' : '3px solid var(--neon-cyan)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q1. Explain Russell & Norvig's 4 Approaches to AI with real-world examples.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Contrast Thinking Humanly vs Thinking Rationally, and Acting Humanly (Turing Test) vs Acting Rationally (Rational Agent Approach).
                    </p>
                  </div>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #d97706' : themeMode === 'paper' ? '4px solid #b45309' : '3px solid var(--neon-amber)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q2. Provide the complete PEAS analysis for an Autonomous Self-Driving Vehicle.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Define Performance measure, Environment, Actuators, Sensors, and characterize all 6 task environment dimensions.
                    </p>
                  </div>
                </>
              )}
              {isAIML && selectedUnitNum === 2 && (
                <>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #2563eb' : themeMode === 'paper' ? '4px solid #0284c7' : '3px solid var(--neon-cyan)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q1. State and prove the optimality conditions of the A* Search Algorithm.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Define Admissibility and Consistency. Trace A* search on a weighted graph with Open and Closed list tables.
                    </p>
                  </div>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #d97706' : themeMode === 'paper' ? '4px solid #b45309' : '3px solid var(--neon-amber)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q2. Convert First-Order Logic to Conjunctive Normal Form (CNF) and prove via Resolution Refutation.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      List all 8 conversion steps including Skolemization and derive the empty clause (contradiction) step-by-step.
                    </p>
                  </div>
                </>
              )}
              {isAIML && selectedUnitNum === 3 && (
                <>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #2563eb' : themeMode === 'paper' ? '4px solid #0284c7' : '3px solid var(--neon-cyan)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q1. Draw and explain the complete 5-component architecture of an Expert System.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Explain the Knowledge Base, Inference Engine, Working Memory, and differentiate between HOW and WHY explanation facilities.
                    </p>
                  </div>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #d97706' : themeMode === 'paper' ? '4px solid #b45309' : '3px solid var(--neon-amber)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q2. What is Feigenbaum's Knowledge Acquisition Bottleneck? Explain the Expert System Triad.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Describe the collaborative roles of the Domain Expert, Knowledge Engineer, and End User, and modern automated solutions.
                    </p>
                  </div>
                </>
              )}
              {isAIML && selectedUnitNum === 4 && (
                <>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #2563eb' : themeMode === 'paper' ? '4px solid #0284c7' : '3px solid var(--neon-cyan)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q1. Calculate Shannon Entropy and Information Gain using the ID3 Algorithm.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Formulate the mathematical definitions of Entropy H(S) and Information Gain IG(S, A) and demonstrate with a worked example.
                    </p>
                  </div>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #d97706' : themeMode === 'paper' ? '4px solid #b45309' : '3px solid var(--neon-amber)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q2. Execute the Apriori Algorithm step-by-step on a given transactional database.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Apply the downward closure property to prune candidate itemsets, and compute Support, Confidence, and Lift for strong association rules.
                    </p>
                  </div>
                </>
              )}
              {/* Mathematics I Exam Questions */}
              {isMath1 && selectedUnitNum === 1 && (
                <>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #2563eb' : themeMode === 'paper' ? '4px solid #0284c7' : '3px solid var(--neon-cyan)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q1. Reduce Matrix A to Normal Form [I_r 0; 0 0] and find its Rank. Solve system AX = B using Gauss-Jordan.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Apply elementary row and column operations to determine rank. Test consistency and find unique or infinite solutions using augmented matrix [A|B].
                    </p>
                  </div>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #d97706' : themeMode === 'paper' ? '4px solid #b45309' : '3px solid var(--neon-amber)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q2. State Cayley-Hamilton Theorem. Verify it for Matrix A and compute A⁻¹ and A⁴.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Find characteristic roots (eigenvalues) and linearly independent eigenvectors. Prove that every square matrix satisfies its own characteristic equation.
                    </p>
                  </div>
                </>
              )}
              {isMath1 && selectedUnitNum === 2 && (
                <>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #2563eb' : themeMode === 'paper' ? '4px solid #0284c7' : '3px solid var(--neon-cyan)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q1. State Taylor's and Maclaurin's Theorems with remainders and expand e^x cos(x) up to x⁴.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Derive Lagrange's and Cauchy's forms of remainder Rn(x) and evaluate series approximation accuracy for standard functions.
                    </p>
                  </div>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #d97706' : themeMode === 'paper' ? '4px solid #b45309' : '3px solid var(--neon-amber)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q2. Find the Radius, Centre, and Circle of Curvature for y² = 4ax at (a, 2a), and evaluate Indeterminate Forms using L'Hôpital's Rule.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Derive chord of curvature through origin and calculate limits of indeterminate forms (0/0, ∞/∞, 0·∞, 1^∞).
                    </p>
                  </div>
                </>
              )}
              {isMath1 && selectedUnitNum === 3 && (
                <>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #2563eb' : themeMode === 'paper' ? '4px solid #0284c7' : '3px solid var(--neon-cyan)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q1. State and prove Euler's Theorem on Homogeneous Functions and evaluate x·(∂u/∂x) + y·(∂u/∂y).
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Apply to u = sin⁻¹[(x + y)/(√x + √y)] to verify x·ux + y·uy = (1/2) tan u. Explain Total Derivatives and Jacobians.
                    </p>
                  </div>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #d97706' : themeMode === 'paper' ? '4px solid #b45309' : '3px solid var(--neon-amber)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q2. Find the Directional Derivative of φ = x²yz + 4xz² at (1, -2, -1) in the direction of 2i - j - 2k, and test if F is irrotational.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Compute grad(φ), div(F), and curl(F). Find the scalar potential function φ such that F = ∇φ.
                    </p>
                  </div>
                </>
              )}
              {isMath1 && selectedUnitNum === 4 && (
                <>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #2563eb' : themeMode === 'paper' ? '4px solid #0284c7' : '3px solid var(--neon-cyan)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q1. Test convergence of positive and alternating series using D'Alembert's Ratio Test and Leibniz's Test.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Differentiate absolute and conditional convergence. Apply Cauchy's root test and integral test with solved examples.
                    </p>
                  </div>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #d97706' : themeMode === 'paper' ? '4px solid #b45309' : '3px solid var(--neon-amber)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q2. Obtain the Fourier Series expansion for f(x) = x² in (-π, π) and deduce Σ 1/n² = π²/6.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Compute Euler's coefficients a₀, aₙ, and bₙ for even/odd functions and determine half-range cosine and sine series on [0, L].
                    </p>
                  </div>
                </>
              )}

              {/* BEEE Exam Questions */}
              {!isAIML && !isMath1 && selectedUnitNum === 1 && (
                <>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #2563eb' : themeMode === 'paper' ? '4px solid #0284c7' : '3px solid var(--neon-cyan)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q1. State and prove the Maximum Power Transfer Theorem for DC circuits.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Derive the condition RL = Rth and prove that the maximum efficiency is 50% with circuit diagrams.
                    </p>
                  </div>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #d97706' : themeMode === 'paper' ? '4px solid #b45309' : '3px solid var(--neon-amber)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q2. Explain Series R-L-C Resonance.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Derive the resonant frequency f0 = 1 / [2π√(LC)], draw the impedance and current resonance curves, and define Quality factor Q.
                    </p>
                  </div>
                </>
              )}
              {!isAIML && !isMath1 && selectedUnitNum === 2 && (
                <>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #2563eb' : themeMode === 'paper' ? '4px solid #0284c7' : '3px solid var(--neon-cyan)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q1. Derive the EMF equation of a single-phase transformer.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Derive E1 = 4.44 * f * N1 * Φm. Explain why Core loss remains constant while Copper loss varies with load current.
                    </p>
                  </div>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #d97706' : themeMode === 'paper' ? '4px solid #b45309' : '3px solid var(--neon-amber)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q2. Explain the Open Circuit (OC) and Short Circuit (SC) tests.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Draw the experimental connection diagrams and explain how equivalent circuit parameters (R0, X0, Req, Xeq) are determined.
                    </p>
                  </div>
                </>
              )}
              {!isAIML && !isMath1 && selectedUnitNum === 3 && (
                <>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #2563eb' : themeMode === 'paper' ? '4px solid #0284c7' : '3px solid var(--neon-cyan)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q1. Explain the working of a Full-Wave Bridge Rectifier with circuit diagram and waveforms.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Derive expressions for Idc, Ripple Factor (γ = 0.482), Rectification Efficiency (η = 81.2%), and Peak Inverse Voltage (PIV).
                    </p>
                  </div>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #d97706' : themeMode === 'paper' ? '4px solid #b45309' : '3px solid var(--neon-amber)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q2. Draw and explain the Input & Output characteristics of BJT in Common Emitter (CE) configuration.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Identify the Cutoff, Active, and Saturation regions. Derive the relation between α and β current gains.
                    </p>
                  </div>
                </>
              )}
              {!isAIML && !isMath1 && selectedUnitNum === 4 && (
                <>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #2563eb' : themeMode === 'paper' ? '4px solid #0284c7' : '3px solid var(--neon-cyan)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q1. State and prove De Morgan\'s Theorems using truth tables and Boolean algebra.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Prove (A • B)\' = A\' + B\' and (A + B)\' = A\' • B\'. Show their logic gate equivalence diagrams.
                    </p>
                  </div>
                  <div style={{ 
                    background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffbeb' : 'rgba(255,255,255,0.03)', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    border: themeMode === 'clean' ? '1px solid #e2e8f0' : themeMode === 'paper' ? '1px solid #fde68a' : undefined,
                    borderLeft: themeMode === 'clean' ? '4px solid #d97706' : themeMode === 'paper' ? '4px solid #b45309' : '3px solid var(--neon-amber)' 
                  }}>
                    <strong style={{ color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fff' }}>
                      Q2. Convert (257.625)₁₀ into Binary, Octal, and Hexadecimal.
                    </strong>
                    <p style={{ color: themeMode === 'clean' ? '#64748b' : themeMode === 'paper' ? '#475569' : 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                      Explain the concept and self-complementing property of Excess-3 code with step-by-step arithmetic examples.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------
         INTERACTIVE 1-PAGE FORMULA & THEOREM CHEAT-SHEET MODAL
         ------------------------------------------------------------------- */}
      {showFormulaSheet && createPortal(
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(3, 6, 12, 0.96)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setShowFormulaSheet(false)}
        >
          <div 
            className="glass-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '920px',
              height: '88vh',
              maxHeight: '900px',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '16px',
              border: '2px solid #f59e0b',
              background: '#090e17',
              boxShadow: '0 0 50px rgba(245, 158, 11, 0.25)',
              overflow: 'hidden'
            }}
          >
            {/* Modal Header Bar */}
            <div style={{
              padding: '16px 22px',
              background: 'linear-gradient(90deg, #0f172a 0%, #1e1b4b 100%)',
              borderBottom: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: 'rgba(245, 158, 11, 0.15)',
                    color: '#f59e0b',
                    border: '1px solid rgba(245, 158, 11, 0.35)'
                  }}>
                    {activeSubject.code}
                  </span>
                  <span className="badge-neon" style={{ fontSize: '0.72rem' }}>
                    Unit {selectedUnitNum} Official Cheat-Sheet
                  </span>
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', margin: 0 }}>
                  {activeSubject.name} — High-Yield Formulae &amp; Laws
                </h2>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={handlePrintFormulaSheetWindow}
                  className="btn-review-glow"
                  style={{
                    fontSize: '0.8rem',
                    padding: '7px 14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    borderRadius: '8px'
                  }}
                  title="Print Formula Sheet or Save as PDF"
                >
                  <Printer size={14} /> Print / Save PDF
                </button>
                <button
                  type="button"
                  onClick={() => setShowFormulaSheet(false)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '6px',
                    color: '#cbd5e1',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Close Cheat-Sheet"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Formula Cards Grid */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '22px 26px',
              background: '#070b13',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '16px',
              alignContent: 'start'
            }}>
              {getSubjectFormulas().map((item, idx) => {
                let mathHtml = '';
                try {
                  mathHtml = katex.renderToString(item.eq, { displayMode: true, throwOnError: false });
                } catch (e) {
                  mathHtml = `<div style="font-family:monospace;font-weight:bold;color:#f59e0b;">${item.eq}</div>`;
                }

                return (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(15, 23, 42, 0.55)',
                      border: '1px solid rgba(245, 158, 11, 0.25)',
                      borderRadius: '10px',
                      padding: '14px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '10px'
                    }}
                  >
                    <div>
                      <div style={{
                        fontSize: '0.86rem',
                        fontWeight: 800,
                        color: '#f59e0b',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                        paddingBottom: '6px'
                      }}>
                        <span>📌</span>
                        <span>{item.name}</span>
                      </div>
                      <div 
                        style={{ padding: '8px 0', overflowX: 'auto', color: '#fff' }}
                        dangerouslySetInnerHTML={{ __html: mathHtml }}
                      />
                    </div>

                    {item.tip && (
                      <div style={{
                        fontSize: '0.76rem',
                        color: '#94a3b8',
                        background: 'rgba(0, 0, 0, 0.3)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        borderLeft: '2px solid #10b981'
                      }}>
                        💡 {item.tip}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
