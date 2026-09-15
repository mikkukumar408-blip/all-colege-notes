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
  ChevronRight
} from 'lucide-react';
import { initialSubjects } from '../data/mockData';
import { beeeUnitsData, beeeSubjectDetails } from '../data/beeeNotesData';
import { aimlUnitsData, aimlSubjectDetails } from '../data/aimlNotesData';
import { math1UnitsData, math1SubjectDetails } from '../data/math1NotesData';
import { webTechUnitsData, webTechSubjectDetails } from '../data/webTechNotesData';
import { cUnitsData, cSubjectDetails } from '../data/cNotesData';
import HandwrittenDiagram from './HandwrittenDiagram';
import InteractiveTheveninLab from './InteractiveTheveninLab';
import { ForensicWatermark } from './SecurityShield';
import katex from 'katex';

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
  s = s.replace(/\\nabla/g, '∇').replace(/\\ne/g, '≠').replace(/\\le/g, '≤').replace(/\\ge/g, '≥');
  s = s.replace(/\\implies/g, '⇒').replace(/\\iff/g, '⇔').replace(/\\approx/g, '≈');
  s = s.replace(/\\times/g, '×').replace(/\\cdot/g, '·').replace(/\\pm/g, '±');
  s = s.replace(/\\mathbf\{([^}]+)\}/g, '$1').replace(/\\text\{([^}]+)\}/g, '$1');
  s = s.replace(/\\sqrt\{([^}]+)\}/g, '√($1)');

  // Common derivatives
  s = s.replace(/d\^2y\/dx\^2/g, 'd²y/dx²');
  s = s.replace(/∂\^2u\/∂x\^2/g, '∂²u/∂x²');
  s = s.replace(/∂\^2u\/∂y\^2/g, '∂²u/∂y²');
  s = s.replace(/∂\^2u\/∂x∂y/g, '∂²u/∂x∂y');

  // Stacked Fractions: render \frac{num}{den} with real horizontal fraction bar
  s = s.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, (m, num, den) => {
    return `<span class="frac"><span class="frac-num">${num.trim()}</span><span class="frac-den">${den.trim()}</span></span>`;
  });

  // Convert inline slash fractions (num / den) into stacked fractions with horizontal bar
  s = s.replace(/\(([a-zA-Z0-9_\-\+\*\(\)\^²³⁴ⁿ¹ᐟ²³ᐟ²\sλρθμπσωφΔ∇]+?)\s*\/\s*([a-zA-Z0-9_\-\+\*\(\)\^²³⁴ⁿ¹ᐟ²³ᐟ²\sλρθμπσωφΔ∇]+?)\)/g, (m, num, den) => {
    const trimmedNum = num.trim();
    const trimmedDen = den.trim();
    const nonMath = ['and', 'or', 'reference', 'ground', 'Stop', 'End', 'True', 'False', 'Weak', 'Strong', 'year', 'month', 'IPv4', 'IPv6', 'bit', 'http', 'https', 'e.g.', 'vs'];
    if (nonMath.some(w => trimmedNum.includes(w) || trimmedDen.includes(w))) {
      return m;
    }
    if (/[0-9a-zA-ZλρθμπσωφΔ∇]/.test(trimmedNum) && /[0-9a-zA-ZλρθμπσωφΔ∇]/.test(trimmedDen)) {
      return `<span class="frac"><span class="frac-num">${trimmedNum}</span><span class="frac-den">${trimmedDen}</span></span>`;
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
  s = s.replace(/\{([a-zA-Z0-9\s,\.\+\-\*\/=]+)\}/g, '($1)');
  s = s.replace(/\$\$/g, '').replace(/\$([^$]+?)\$/g, '$1');

  return s;
}

function renderKaTeXSafe(formula, isDisplay = false) {
  if (!formula) return '';
  let clean = formula.trim();

  // 0. Fix formfeed \f from unescaped \frac in JS strings
  clean = clean.replace(/\x0crac/g, '\\frac');

  // 1. Convert any span fractions back to LaTeX \frac{num}{den}
  clean = clean.replace(/<span class=['"]frac['"]><span class=['"]frac-num['"]>([\s\S]*?)<\/span><span class=['"]frac-den['"]>([\s\S]*?)<\/span><\/span>/g, '\\frac{$1}{$2}');

  // 2. Strip any other HTML tags from inside LaTeX
  clean = clean.replace(/<[^>]+>/g, '');

  // 3. Fix matrix newlines if needed
  clean = clean.replace(/(\\begin\{(?:[a-zA-Z]*matrix|cases|aligned)\}[\s\S]*?\\end\{(?:[a-zA-Z]*matrix|cases|aligned)\})/g, (env) => {
    return env.replace(/\\ (?=[a-zA-Z0-9_\-\+\*\(\)\^²³⁴ⁿ¹ᐟ²³ᐟ²\sλρθμπσωφΔ∇&|⋮⋱\.]|\\end)/g, '\\\\ ');
  });

  // 4. Normalize Unicode sub/superscripts for KaTeX matrices
  clean = clean
    .replace(/\bI₁\b/g, 'I_1').replace(/\bI₂\b/g, 'I_2').replace(/\bI₃\b/g, 'I_3')
    .replace(/\bIᵣ\b/g, 'I_r').replace(/\bA⁻¹\b/g, 'A^{-1}').replace(/\bA²\b/g, 'A^2').replace(/\bA³\b/g, 'A^3').replace(/\bA⁴\b/g, 'A^4');

  // 5. Normalize common Unicode math symbols and unescaped percent signs for flawless KaTeX parsing
  clean = clean
    .replace(/(?<!\\)%/g, '\\%')
    .replace(/→/g, '\\rightarrow ')
    .replace(/π/g, '\\pi ')
    .replace(/∞/g, '\\infty ')
    .replace(/∈/g, '\\in ')
    .replace(/·/g, '\\cdot ')
    .replace(/∂/g, '\\partial ')
    .replace(/ⁿ/g, '^n')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
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
      strict: false
    });
    if (rendered.includes('katex-error')) {
      return cleanMathTypography(clean);
    }
    return rendered;
  } catch (e) {
    return cleanMathTypography(clean);
  }
}

/* -------------------------------------------------------------------------
   MATHEMATICAL & ADVANCED MARKDOWN CONTENT FORMATTER
   Renders LaTeX math via KaTeX, colored callout cards (Traps, Mnemonics, Laws),
   headings (###, ####), and highlighters.
   ------------------------------------------------------------------------- */
function formatNoteContent(content) {
  if (!content) return '';

  let html = content;

  // Pre-clean 0A: Auto-fix unescaped \f formfeed from \frac in JS strings and stray arrow symbols
  html = html.replace(/\x0crac/g, '\\frac');
  html = html.replace(/⬆rac/g, '\\frac');
  html = html.replace(/\x0c/g, '');

  // Pre-clean 0B: Auto-wrap standalone LaTeX matrix blocks (\left[ \begin{array}... or \begin{bmatrix}) in $$...$$
  html = html.replace(/(?<!\$)\s*(\\+left\[\s*\\+begin\{(?:array|bmatrix|matrix)\}[\s\S]*?\\+end\{(?:array|bmatrix|matrix)\}\s*\\+right\])\s*(?!\$)/g, '\n\n$$$1$$\n\n');

  // Pre-clean 0C: Auto-clean stray LaTeX arrows and symbols outside math mode in text
  html = html.replace(/\\leftrightarrow/g, ' ⇄ ');
  html = html.replace(/\\rightarrow/g, ' → ');
  html = html.replace(/\\to\b/g, ' → ');
  html = html.replace(/\\Omega\b/g, ' Ω');
  html = html.replace(/\\sin\b/g, 'sin');
  html = html.replace(/\\cos\b/g, 'cos');

  // Step 0 (PRE-PASS): Extract triple-backtick code blocks FIRST before any other processing,
  // clean any embedded math notation inside them, and replace with unique placeholders.
  const codeBlocks = [];
  html = html.replace(/```(?:[a-zA-Z]*)\n?([\s\S]*?)```/g, (match, code) => {
    // If the block contains math derivations or LaTeX:
    const isMathDerivation = /`[^`]+`|\\frac|frac-num|\b(?:Solution|Derivation|Slope|LMVT|Rolle|Rank|Eigen|Cauchy|Trace)\b|[=≠≤≥⇒⇔]/.test(code);
    if (isMathDerivation) {
      let cleanCode = cleanMathTypography(code);
      // Clean backticks inside derivations to render math
      cleanCode = cleanCode.replace(/`([^`\n]+)`/g, (m, rawMath) => {
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
      const placeholder = `\x00CODEBLOCK_${codeBlocks.length}\x00`;
      codeBlocks.push(`<div class="analytical-derivation-box"><div class="derivation-body-content">${cleanCode}</div></div>`);
      return placeholder;
    }

    let cleanCode = cleanMathTypography(code);
    const escaped = cleanCode
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const placeholder = `\x00CODEBLOCK_${codeBlocks.length}\x00`;
    codeBlocks.push(`<div class="ascii-diagram-box"><pre class="ascii-diagram-pre">${escaped}</pre></div>`);
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

  // Step 2: Extract and pre-render Inline Math ($...$) into placeholders
  const mathInlineBlocks = [];
  html = html.replace(/\$([^\$\n]+?)\$/g, (match, formula) => {
    const rendered = renderKaTeXSafe(formula, false);
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

    return `<div class="worked-example-box ${badgeClass}">
      <div class="example-tag-header">
        <span class="difficulty-pill ${badgeClass}">${badgeLabel}</span>
        <span>📘 ${title}</span>
      </div>
      ${body}
    </div>`;
  });

  // Step 3.6: Multi-line Formal Academic Derivations & University Proofs
  html = html.replace(/<derivation\b([^>]*)>([\s\S]*?)<\/derivation>/g, (match, attrs, body) => {
    const titleMatch = attrs.match(/title="([^"]*)"/);
    const marksMatch = attrs.match(/marks="([^"]*)"/);
    const title = titleMatch ? titleMatch[1] : 'ANALYTICAL MATHEMATICAL PROOF';
    const marks = marksMatch ? marksMatch[1] : '';

    return `<div class="academic-derivation-box">
      <div class="derivation-header">
        <span class="derivation-pill">📐 FORMAL UNIVERSITY DERIVATION</span>
        <span class="derivation-title">🎓 ${title}</span>
        ${marks ? `<span class="derivation-marks-pill">⭐ ${marks}</span>` : ''}
      </div>
      <div class="derivation-body">
        ${body}
      </div>
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
        .replace(/\bV_1\b/g, 'V₁')
        .replace(/\bV_2\b/g, 'V₂')
        .replace(/\bI_1\b/g, 'I₁')
        .replace(/\bI_2\b/g, 'I₂')
        .replace(/\bS_1\b/g, 'S₁')
        .replace(/\bS_2\b/g, 'S₂');
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

  return html;
}

const ALLOWED_SUBJECT_IDS = ['sub-beee', 'sub-aiml', 'sub-m1', 'sub-c1', 'sub-webtech'];
export const isSensorySubjectAllowed = (id) => ALLOWED_SUBJECT_IDS.includes(id);

export default function SensoryLab({ 
  currentUser,
  movieContext, 
  isUnitsCollapsed: controlledIsUnitsCollapsed, 
  setIsUnitsCollapsed: controlledSetIsUnitsCollapsed 
}) {
  // Combine C, Web Tech, BEEE, AIML, and Math 1 with other subjects
  const allSubjects = [
    cSubjectDetails,
    webTechSubjectDetails,
    beeeSubjectDetails,
    aimlSubjectDetails,
    math1SubjectDetails,
    ...initialSubjects.filter(s => s.id !== 'sub-c1' && s.id !== 'sub-webtech' && s.id !== 'sub-beee' && s.id !== 'sub-aiml' && s.id !== 'sub-m1' && s.id !== 'sub-math1')
  ];
  
  const [currentSubjectId, setCurrentSubjectId] = useState(() => {
    if (movieContext?.id && isSensorySubjectAllowed(movieContext.id)) {
      return movieContext.id;
    }
    return 'sub-beee';
  });
  const [selectedUnitNum, setSelectedUnitNum] = useState(1);
  const [themeMode, setThemeMode] = useState(() => {
    try {
      const saved = localStorage.getItem('notes_theme_mode');
      if (saved && saved !== 'cyber') return saved;
      return 'paper';
    } catch (e) {
      return 'paper';
    }
  });
  const [paperViewMode, setPaperViewMode] = useState('notes'); // 'notes' | 'scanned-pdf'
  const [internalUnitsCollapsed, setInternalUnitsCollapsed] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('notes_theme_mode', themeMode);
    } catch (e) {}
  }, [themeMode]);
  
  const isUnitsCollapsed = controlledIsUnitsCollapsed !== undefined ? controlledIsUnitsCollapsed : internalUnitsCollapsed;
  const setIsUnitsCollapsed = controlledSetIsUnitsCollapsed || setInternalUnitsCollapsed;
  
  const [fontSize, setFontSize] = useState('normal'); // 'normal' | 'large'
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (movieContext?.id && isSensorySubjectAllowed(movieContext.id) && movieContext.id !== currentSubjectId) {
      setCurrentSubjectId(movieContext.id);
      setSelectedUnitNum(1);
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

  // Active Subject & Active Unit Data
  const isC = currentSubjectId === 'sub-c1' || currentSubjectId === 'BCSE-008' || currentSubjectId === 'CS102' || currentSubjectId === 'sub-c';
  const isAIML = currentSubjectId === 'sub-aiml' || currentSubjectId === 'BCSE-011';
  const isBEEE = currentSubjectId === 'sub-beee' || currentSubjectId === 'BELE-001' || currentSubjectId === 'EE101';
  const isMath1 = currentSubjectId === 'sub-m1' || currentSubjectId === 'sub-math1' || currentSubjectId === 'BMAT-001' || currentSubjectId === 'MATH101';
  const isWebTech = currentSubjectId === 'sub-webtech' || currentSubjectId === 'BCSE-012' || currentSubjectId === 'sub-web';

  const activePdfUrl = isWebTech
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

  const activePdfDownloadName = isWebTech
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

  const activePdfPageBadge = isWebTech
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

  const activePdfDescription = isWebTech
    ? 'Official MMDU syllabus long notes: Internet vs WWW, DNS resolution, TCP/IP, HTML5 semantics, Canvas, and CSS box model with solved exam questions.'
    : isC
      ? 'Official MMDU syllabus long notes: Computational problem solving, 4-stage compilation pipeline, memory segmentation, DMA, pointers, and file I/O with solved exam questions.'
      : isAIML
        ? 'Official MMDU syllabus long notes: PEAS framework, A* search traces, CNF conversion, Resolution Refutation, Decision Trees, and Apriori with solved exam questions.'
        : isMath1
          ? 'Official MMDU syllabus long notes: Matrices, Gauss-Jordan, Curvature, Indeterminate forms, Beta-Gamma, and Fourier series with solved exam questions.'
          : 'Official MMDU syllabus long notes: DC/AC circuits, KCL/KVL, Thevenin equivalent, Transformers, DC machines, BJT, and Boolean logic with solved exam questions.';

  const activeSubject = isC
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

  const unitsList = isC
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
  const beeeUnit = isC
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

  const handlePrint = () => {
    setIsPrinting(true);
    try {
      const notesEl = notesPanelRef.current;
      if (!notesEl) { setIsPrinting(false); return; }

      // Remove stale print frame
      const oldFrame = document.getElementById('academic-print-frame');
      if (oldFrame) oldFrame.remove();

      // Clone only the notes panel
      const contentClone = notesEl.cloneNode(true);

      // Strip UI chrome, watermarks, and the PDF download banner
      contentClone.querySelectorAll(
        '.forensic-watermark-overlay, .sticky-margin-note, button, a[href*=".pdf"], ' +
        '[title*="PDF"], [title*="Subject"], .handwritten-pdf-banner, .notes-reader-banner, ' +
        '.pdf-banner, .paper-mode-banner'
      ).forEach(el => el.remove());

      // Extra safeguard: remove any element containing "Real Classroom Handwritten Notebook Attached"
      contentClone.querySelectorAll('div').forEach(el => {
        if (el.textContent && el.textContent.includes('Real Classroom Handwritten Notebook Attached') && el.querySelector('button, a')) {
          el.remove();
        }
      });

      // Fix SVG height="auto"
      contentClone.querySelectorAll('svg').forEach(svg => {
        const h = svg.getAttribute('height');
        if (h === 'auto' || h === '') {
          const vb = svg.getAttribute('viewBox');
          if (vb) {
            const parts = vb.trim().split(/[\s,]+/);
            if (parts.length === 4) {
              const ratio = parseFloat(parts[3]) / parseFloat(parts[2]);
              svg.setAttribute('height', String(Math.round(ratio * 680)));
            } else {
              svg.removeAttribute('height');
            }
          } else {
            svg.removeAttribute('height');
          }
        }
      });

      // Collect ALL inline CSS from living stylesheets
      let inlineCSS = '';
      try {
        Array.from(document.styleSheets).forEach(sheet => {
          try {
            Array.from(sheet.cssRules || []).forEach(r => { inlineCSS += r.cssText + '\n'; });
          } catch (_) { /* skip cross-origin */ }
        });
      } catch (_) {}

      const isPaperMode = themeMode === 'paper';

      const printHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>${activeSubject.code || ''} \u2013 Unit ${selectedUnitNum} Notes</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Patrick+Hand&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" crossorigin="anonymous"/>
<style>
${inlineCSS}

@page { 
  size: A4 portrait; 
  margin: 14mm 12mm 14mm 12mm; 
}
*, *::before, *::after { 
  box-sizing: border-box !important; 
  -webkit-print-color-adjust: exact !important; 
  print-color-adjust: exact !important; 
  text-shadow: none !important; 
}
html, body { 
  background: #ffffff !important; 
  margin: 0 !important; 
  padding: 0 !important; 
}

/* Base resets */
.notes-reader-panel, .glass-panel { 
  background: #ffffff !important; 
  border: none !important; 
  box-shadow: none !important; 
  overflow: visible !important; 
  padding: 0 !important; 
}
.notes-html-content { 
  line-height: 1.65 !important; 
  white-space: normal !important; 
}
.yellow-highlighter { 
  background: rgba(254, 240, 138, 0.5) !important; 
  color: #854d0e !important; 
  font-weight: 700 !important; 
  padding: 0 4px !important;
  border-radius: 3px !important;
}

/* =========================================================================
   THEME-AWARE PRINT STYLING
   ========================================================================= */
${isPaperMode ? `
body, body.theme-paper, .theme-paper, .notes-reader-panel.theme-paper {
  font-family: 'Caveat', 'Patrick Hand', cursive !important;
  color: #1e3a8a !important; /* Authentic ballpoint royal blue ink */
  font-size: 13.5pt !important;
  line-height: 1.55 !important;
}

#print-root {
  border-left: 2.5px solid #f87171 !important; /* Classic notebook red margin line */
  padding-left: 20px !important;
  margin-left: 6px !important;
}

.theme-paper h1, .theme-paper h2, .theme-paper h3, .theme-paper h4, .theme-paper h5,
.theme-paper .handwritten-heading, .theme-paper .note-h3, .theme-paper .note-h4, .theme-paper .note-h5 {
  font-family: 'Patrick Hand', 'Caveat', cursive !important;
  color: #0f2b5c !important; /* Rich deep blue heading ink */
  font-weight: 700 !important;
  page-break-after: avoid !important;
  break-after: avoid !important;
}

.theme-paper .notes-html-content,
.theme-paper .notes-html-content p,
.theme-paper .notes-html-content li,
.theme-paper .notes-html-content span:not(.katex *):not(.pill-badge),
.theme-paper .handwritten-list-item span {
  font-family: 'Caveat', 'Patrick Hand', cursive !important;
  color: #1e3a8a !important;
  font-size: 13.5pt !important;
}

.theme-paper .handwritten-bullet,
.theme-paper .handwritten-num {
  font-family: 'Patrick Hand', cursive !important;
  color: #dc2626 !important; /* Red pen margin bullets */
  font-weight: bold !important;
}

.theme-paper .circuit-diagram-card {
  background: #ffffff !important;
  border: 1.5px solid #cbd5e1 !important;
  border-left: 4px solid #3b82f6 !important;
}
.theme-paper .circuit-diagram-card .schematic-wire { stroke: #1e3a8a !important; }
.theme-paper .circuit-diagram-card .schematic-resistor { stroke: #b45309 !important; }
.theme-paper .circuit-diagram-card .schematic-title { fill: #1e40af !important; }
` : `
body, body.theme-clean, .theme-clean, .notes-reader-panel.theme-clean {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  color: #0f172a !important;
  font-size: 11pt !important;
  line-height: 1.65 !important;
}

.theme-clean h1, .theme-clean h2, .theme-clean h3, .theme-clean h4, .theme-clean h5,
.theme-clean .handwritten-heading, .theme-clean .note-h3, .theme-clean .note-h4, .theme-clean .note-h5 {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  color: #0f172a !important;
  font-weight: 800 !important;
  page-break-after: avoid !important;
  break-after: avoid !important;
}

.theme-clean .notes-html-content,
.theme-clean .notes-html-content p,
.theme-clean .notes-html-content li {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  color: #0f172a !important;
}
`}

/* Circuit diagrams across all print modes */
.circuit-diagram-card {
  background: #ffffff !important;
  border: 1px solid #cbd5e1 !important;
  box-shadow: none !important;
  page-break-inside: avoid !important;
  break-inside: avoid !important;
  margin: 16px 0 !important;
  padding: 12px !important;
}
.circuit-diagram-card svg {
  max-width: 100% !important;
  width: 100% !important;
  height: auto !important;
  display: block !important;
}
.circuit-diagram-caption {
  color: #1e3a8a !important;
  font-weight: 800 !important;
  font-size: 9pt !important;
  margin-top: 6px !important;
}
.circuit-diagram-card .schematic-bg { fill: #ffffff !important; stroke: #cbd5e1 !important; }
.circuit-diagram-card text[fill="#e2e8f0"], .circuit-diagram-card text[fill="#94a3b8"], .circuit-diagram-card text[fill="#38bdf8"] { fill: #0f172a !important; }
.circuit-diagram-card text[fill="#fbbf24"], .circuit-diagram-card text[fill="#fef08a"] { fill: #92400e !important; }
.circuit-diagram-card text[fill="#10b981"], .circuit-diagram-card text[fill="#34d399"] { fill: #065f46 !important; }
.circuit-diagram-card rect[fill*="rgba(15,23,42"], .circuit-diagram-card rect[fill*="rgba(10,15,29"] { fill: #f8fafc !important; }

/* Callout boxes */
.worked-example-box, .academic-derivation-box, .exam-trap-box, .topper-mnemonic-box,
.green-law-box, .blue-analogy-box, .cyan-keytakeaway-box, .orange-warning-box,
.purple-exam-goal-box, .custom-table-wrap, .katex-display-box, .analytical-derivation-box,
.ascii-diagram-box {
  page-break-inside: avoid !important;
  break-inside: avoid !important;
  box-shadow: none !important;
  margin: 14px 0 !important;
}
.exam-trap-box { background: #fff1f2 !important; border-left: 4px solid #e11d48 !important; color: #881337 !important; }
.topper-mnemonic-box { background: #faf5ff !important; border-left: 4px solid #9333ea !important; color: #581c87 !important; }
.green-law-box { background: #f0fdf4 !important; border-left: 4px solid #16a34a !important; color: #14532d !important; }
.blue-analogy-box { background: #eff6ff !important; border-left: 4px solid #2563eb !important; color: #1e3a8a !important; }
.cyan-keytakeaway-box { background: #ecfeff !important; border-left: 4px solid #0891b2 !important; color: #164e63 !important; }
.orange-warning-box { background: #fffbeb !important; border-left: 4px solid #d97706 !important; color: #78350f !important; }
.purple-exam-goal-box { background: #f5f3ff !important; border-left: 4px solid #7c3aed !important; color: #4c1d95 !important; }

.custom-table-wrap table { border-collapse: collapse !important; width: 100% !important; }
.custom-table-wrap th { background: #f1f5f9 !important; color: #0f172a !important; border: 1px solid #cbd5e1 !important; padding: 6px 10px !important; }
.custom-table-wrap td { border: 1px solid #e2e8f0 !important; color: #1e293b !important; padding: 6px 10px !important; }

/* Print academic banner & footer */
.print-academic-banner {
  border-bottom: 2.5px solid #0f172a;
  padding-bottom: 12px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.print-academic-banner h1 { font-size: 18pt !important; font-weight: 900 !important; color: #0f172a !important; margin: 0 0 4px !important; }
.print-academic-banner h2 { font-size: 13pt !important; font-weight: 800 !important; color: #1e3a8a !important; margin: 0 0 6px !important; }
.print-academic-banner p  { font-size: 9.5pt !important; color: #475569 !important; margin: 0 !important; }
.print-doc-footer {
  margin-top: 30px;
  border-top: 1px solid #cbd5e1;
  padding-top: 8px;
  font-size: 8pt;
  color: #64748b;
  display: flex;
  justify-content: space-between;
}
</style>
</head>
<body class="theme-${themeMode}">
<div class="print-academic-banner">
  <div>
    <h1>${activeSubject.name || ''} (${activeSubject.code || ''})</h1>
    <h2>Unit ${selectedUnitNum}: ${beeeUnit.title || ''}</h2>
    <p>Semester ${activeSubject.semester || '1'} &bull; ${isPaperMode ? 'Handwritten Classroom Notebook Study Material' : 'Official University Exam Study Notes'} &bull; Verified Syllabus</p>
  </div>
  <div style="text-align:right;font-size:9pt;color:#64748b">
    <strong>Theme:</strong> ${isPaperMode ? 'Handwritten Notebook' : 'Clean Digital'}<br/>
    <strong>Print Date:</strong> ${new Date().toLocaleDateString('en-GB')}<br/>
    <strong>Status:</strong> Exam Verified &#10003;
  </div>
</div>
<div id="print-root" class="notes-reader-panel theme-${themeMode}">${contentClone.innerHTML}</div>
<div class="print-doc-footer">
  <span>Academic Study Portal &bull; Authorized Single-Student Study License</span>
  <span>Student: ${currentUser?.username || 'Verified Student'}</span>
</div>
</body>
</html>`;

      // Create iframe, print on load
      const iframe = document.createElement('iframe');
      iframe.id = 'academic-print-frame';
      iframe.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;border:0;pointer-events:none;';
      document.body.appendChild(iframe);

      iframe.onload = () => {
        try {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
        } finally {
          setIsPrinting(false);
          setTimeout(() => { if (iframe.parentNode) iframe.parentNode.removeChild(iframe); }, 3000);
        }
      };

      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.open();
      iframeDoc.write(printHTML);
      iframeDoc.close();

    } catch (err) {
      console.warn('Print error:', err);
      setIsPrinting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}>
      {/* -------------------------------------------------------------------
         PART A: READER HEADER & ADVANCED CONTROLS
         Theme Mode Selector, Bookmark, Print
         ------------------------------------------------------------------- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span className="badge-neon font-display">
              {themeMode === 'cyber' ? '⚡ CYBER NEON NOTES' : themeMode === 'paper' ? '📝 REAL COLLEGE NOTEBOOK' : '📖 CLEAN DIGITAL READER'}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              {activeSubject.code} • Semester {activeSubject.semester}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 900, color: '#fff', wordBreak: 'break-word' }}>
            {activeSubject.name} Notes
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '750px' }}>
            Exhaustive, high-yield university lecture notes with step-by-step proofs, hand-drawn vector circuits, and interactive simulation.
          </p>
        </div>

        {/* Action Controls & Multi-Theme Selector */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* 3 Theme Options */}
          <div style={{ 
            display: 'flex', 
            background: 'rgba(255,255,255,0.06)', 
            borderRadius: '10px', 
            padding: '4px', 
            gap: '4px', 
            border: '1px solid var(--border-dim)' 
          }}>
            <button 
              onClick={() => setThemeMode('cyber')}
              title="Dark theme with electric neon & gold ink"
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: themeMode === 'cyber' ? '1px solid #00f0ff' : '1px solid transparent',
                background: themeMode === 'cyber' ? 'linear-gradient(135deg, #00f0ff, #3b82f6)' : 'transparent',
                color: themeMode === 'cyber' ? '#07090e' : '#cbd5e1',
                fontWeight: 800,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sparkles size={14} /> ⚡ Cyber Neon
            </button>

            <button 
              onClick={() => setThemeMode('paper')}
              title="Crisp white notebook with margin and deep blue handwritten styling"
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: themeMode === 'paper' ? '1px solid #3b82f6' : '1px solid transparent',
                background: themeMode === 'paper' ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : 'transparent',
                color: themeMode === 'paper' ? '#ffffff' : '#cbd5e1',
                fontWeight: 800,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: themeMode === 'paper' ? '0 2px 10px rgba(37, 99, 235, 0.3)' : 'none'
              }}
            >
              <PenTool size={14} /> 📝 Real Notebook
            </button>

            <button 
              onClick={() => setThemeMode('clean')}
              title="Modern crisp white textbook reading mode"
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: themeMode === 'clean' ? '1px solid #94a3b8' : '1px solid transparent',
                background: themeMode === 'clean' ? '#ffffff' : 'transparent',
                color: themeMode === 'clean' ? '#0f172a' : '#cbd5e1',
                fontWeight: 800,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: themeMode === 'clean' ? '0 2px 8px rgba(255,255,255,0.25)' : 'none'
              }}
            >
              <BookOpen size={14} /> 📖 Clean Digital
            </button>
          </div>

          {/* Collapse / Expand Select Subject Column Toggle */}
          <button 
            className="btn-outline" 
            onClick={() => setIsUnitsCollapsed(!isUnitsCollapsed)}
            style={{ 
              borderColor: isUnitsCollapsed ? 'var(--neon-cyan)' : undefined, 
              color: isUnitsCollapsed ? 'var(--neon-cyan)' : undefined,
              background: isUnitsCollapsed ? 'rgba(0, 240, 255, 0.14)' : undefined,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title={isUnitsCollapsed ? "Open Select Subject Section (>)" : "Close Select Subject Section (<)"}
          >
            {isUnitsCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            {isUnitsCollapsed ? 'Show Subject (>)' : 'Close Subject (<)'}
          </button>

          <button 
            className="btn-outline" 
            onClick={() => setBookmarked(!bookmarked)}
            style={{ borderColor: bookmarked ? 'var(--neon-green)' : undefined, color: bookmarked ? 'var(--neon-green)' : undefined }}
          >
            <Bookmark size={16} /> {bookmarked ? 'Saved' : 'Bookmark'}
          </button>

          {isAIML && (
            <a
              href="/AIML_notes_handwritten.pdf"
              download="BCSE-011_Fundamentals_of_AI_ML_Handwritten_Notes.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{
                borderColor: '#f59e0b',
                color: '#f59e0b',
                background: 'rgba(245, 158, 11, 0.12)',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Download Scanned Handwritten Notes PDF (12 Pages)"
            >
              <Download size={16} /> Handwritten PDF (12 Pgs)
            </a>
          )}

          {isMath1 && (
            <a
              href="/BMAT001_Mathematics_I_MMU_Handwritten_Notes.pdf"
              download="BMAT-001_Mathematics_I_MMU_Handwritten_Notes.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{
                borderColor: '#0284c7',
                color: '#0284c7',
                background: 'rgba(2, 132, 199, 0.12)',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Download MMU BMAT-001 Official Handwritten Notes PDF (11 Pages)"
            >
              <Download size={16} /> Handwritten PDF (11 Pgs)
            </a>
          )}

          {isWebTech && (
            <a
              href="/BCSE012_Fundamental_of_Web_Technologies_Long_Notes.pdf"
              download="Fundamental of Web Technologies notes.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{
                borderColor: '#10b981',
                color: '#10b981',
                background: 'rgba(16, 185, 129, 0.12)',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Download Official BCSE-012 Comprehensive Long Notes PDF"
            >
              <Download size={16} /> Official Long Notes PDF
            </a>
          )}

          {isC && (
            <a
              href="/BCSE008_Computational_and_Problem_Solving_using_C_notes.pdf"
              download="Computational and Problem Solving using C notes.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{
                borderColor: '#0284c7',
                color: '#0284c7',
                background: 'rgba(2, 132, 199, 0.12)',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Download Official BCSE-008 Comprehensive Long Notes PDF (16 Pages)"
            >
              <Download size={16} /> Official Long Notes PDF (16 Pgs)
            </a>
          )}

          <button 
            type="button"
            className="btn-outline" 
            onClick={handlePrint}
            disabled={isPrinting}
            style={{
              cursor: isPrinting ? 'wait' : 'pointer',
              opacity: isPrinting ? 0.75 : 1,
              borderColor: isPrinting ? 'var(--neon-cyan)' : undefined,
              color: isPrinting ? 'var(--neon-cyan)' : undefined,
              fontWeight: 800
            }}
            title="Print or Save as PDF"
          >
            <Printer size={16} /> {isPrinting ? 'Preparing Print...' : 'Print Notes'}
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------
         PART B: STUDY DECK (Responsive Full-Width or 2-Column Mode)
         ------------------------------------------------------------------- */}
      <div 
        className={`study-deck-grid ${isUnitsCollapsed ? 'units-collapsed' : ''}`}
        style={{ 
          display: 'grid', 
          gridTemplateColumns: isUnitsCollapsed ? 'minmax(0, 1fr)' : 'minmax(240px, 280px) minmax(0, 1fr)', 
          gap: '24px',
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
          boxSizing: 'border-box',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
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
                value={currentSubjectId}
                onChange={(e) => {
                  const targetId = e.target.value;
                  if (!isSensorySubjectAllowed(targetId)) {
                    e.preventDefault();
                    return; // Dead: cannot select
                  }
                  setCurrentSubjectId(targetId);
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
                {allSubjects.map(s => {
                  const active = isSensorySubjectAllowed(s.id);
                  return (
                    <option 
                      key={s.id} 
                      value={s.id}
                      disabled={!active}
                      style={{ color: active ? '#fff' : '#64748b' }}
                    >
                      {s.code}: {s.name} {!active ? '(Unavailable)' : `(Sem ${s.semester})`}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Unit Switcher */}
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Select Unit ({(isBEEE || isAIML || isMath1 || isWebTech || isC) ? '4 Units Syllabus' : `${activeSubject.units?.length || 0} Units`}):
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
                Covers DC/AC circuit proofs, Maximum Power Transfer derivation, transformer equivalent circuits, OC/SC tests, P-N junction diode rectifiers, BJT characteristics, and De Morgan's theorem proofs.
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
          {/* Forensic Dynamic Anti-Leak Watermark Layer */}
          <ForensicWatermark watermarkText="ACADEMIC LICENSE • STU-BEEE-8491 • CONFIDENTIAL DO NOT LEAK" />

          {/* Real Notebook Mode Dedicated Handwritten PDF Banner */}
          {themeMode === 'paper' && (
            <div className="handwritten-pdf-banner" style={{
              background: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderLeft: '5px solid #2563eb',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '10px', 
                  background: '#2563eb', 
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0 
                }}>
                  <PenTool size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span>Real Classroom Handwritten Notebook Attached</span>
                    <div style={{ display: 'flex', gap: '6px', background: '#f8fafc', padding: '3px', borderRadius: '8px', border: '1px solid #e2e8f0', marginLeft: 'auto' }}>
                      <button
                        onClick={() => setPaperViewMode('notes')}
                        style={{
                          padding: '5px 12px',
                          borderRadius: '6px',
                          border: 'none',
                          background: paperViewMode === 'notes' ? '#2563eb' : 'transparent',
                          color: paperViewMode === 'notes' ? '#fff' : '#475569',
                          fontWeight: 800,
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        ✍️ Hand-Scripted Notes
                      </button>
                      {activePdfUrl && (
                        <button
                          onClick={() => setPaperViewMode('scanned-pdf')}
                          style={{
                            padding: '5px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            background: paperViewMode === 'scanned-pdf' ? '#1e40af' : 'transparent',
                            color: paperViewMode === 'scanned-pdf' ? '#fff' : '#475569',
                            fontWeight: 800,
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          📄 View Long Notes PDF ({activePdfPageBadge.split('•')[1]?.trim() || 'Complete'})
                        </button>
                      )}
                    </div>
                    <span style={{ fontSize: '0.72rem', background: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                      {activePdfPageBadge}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: '#475569' }}>
                    {activePdfDescription}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <a
                  href={activePdfUrl || "#"}
                  download={activePdfDownloadName}
                  target={activePdfUrl ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!activePdfUrl) {
                      e.preventDefault();
                      handlePrint();
                    }
                  }}
                  style={{
                    background: '#047857',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 8px rgba(4, 120, 87, 0.3)',
                    cursor: 'pointer'
                  }}
                >
                  <Download size={16} /> Download Long Notes PDF
                </a>
                {activePdfUrl && (
                  <a
                    href={activePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'transparent',
                      color: '#047857',
                      border: '1px solid #047857',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      padding: '9px 14px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <FileText size={14} /> Open Fullscreen PDF
                  </a>
                )}
              </div>
            </div>
          )}

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
              fontSize: '2.1rem', 
              fontWeight: 900, 
              color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : '#fef08a' 
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
              In semester exams, examiners check for: <strong>(1) Circuit Schematics with labeled arrows</strong>, <strong>(2) Exact definitions</strong>, <strong>(3) Step-by-step mathematical steps with units</strong>. Always draw the equivalent circuit before writing equations!
            </p>
          </div>

          {/* Real Notebook Embedded Scanned PDF Viewer */}
          {themeMode === 'paper' && paperViewMode === 'scanned-pdf' && activePdfUrl ? (
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              border: '2px solid #b45309',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              background: '#ffffff',
              margin: '12px 0'
            }}>
              <div style={{
                padding: '12px 20px',
                background: '#fef3c7',
                borderBottom: '1.5px solid #fde68a',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={20} color="#b45309" />
                  <strong style={{ color: '#78350f', fontSize: '1rem', fontFamily: "'Kalam', cursive" }}>
                    {activeSubject?.name} Official University Long Notes ({activePdfPageBadge})
                  </strong>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => setPaperViewMode('notes')}
                    className="btn-outline"
                    style={{ borderColor: '#d97706', color: '#78350f', padding: '6px 14px', fontSize: '0.8rem', background: '#fff' }}
                  >
                    Switch to Hand-Scripted Text
                  </button>
                  <a
                    href={activePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{ borderColor: '#b45309', color: '#78350f', padding: '6px 14px', fontSize: '0.8rem', textDecoration: 'none' }}
                  >
                    <Maximize2 size={14} /> Fullscreen
                  </a>
                  <a
                    href={activePdfUrl}
                    download={activePdfDownloadName}
                    className="btn-primary"
                    style={{ background: '#b45309', color: '#fff', padding: '6px 16px', fontSize: '0.8rem', textDecoration: 'none' }}
                  >
                    <Download size={14} /> Download PDF
                  </a>
                </div>
              </div>
              <iframe
                src={`${activePdfUrl}#view=FitH`}
                title={`${activeSubject?.name} Official Long Notes PDF`}
                style={{
                  width: '100%',
                  height: '920px',
                  border: 'none',
                  display: 'block'
                }}
              />
            </div>
          ) : null}

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
                    __html: formatNoteContent(section.content)
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
    </div>
  );
}
