import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import katex from '../client/node_modules/katex/dist/katex.mjs';

import { beeeUnitsData } from '../client/src/data/beeeNotesData.js';
import { cUnitsData } from '../client/src/data/cNotesData.js';

console.log('=== Compiling Master Notes PDFs with Vector SVGs & Flowcharts ===');

// Read KaTeX CSS
const katexCssPath = path.resolve('client/node_modules/katex/dist/katex.min.css');
let katexCss = fs.readFileSync(katexCssPath, 'utf8');

// Safe KaTeX renderer
function renderMath(str, isDisplay = false) {
  try {
    let clean = str.trim();
    clean = clean.replace(/,\s*\\*text\{/g, '\\,\\text{');
    clean = clean.replace(/,\s*\\*(?:Omega|Ω)\b/g, '\\,\\Omega');
    clean = clean.replace(/(?<=[0-9\s\(\[\{,\.\=])imes\b/g, '\\times');
    clean = clean.replace(/(?<=[0-9\s\(\[\{,\.\=])ext\{/g, '\\text{');
    clean = clean.replace(/(?<=\\sin\s*|\\sin|\\cos\s*|\\cos|d\s*|[0-9\s\(\[\{,\.\=])heta\b/g, '\\theta');
    clean = clean.replace(/\bRL\b/g, 'R_L');
    clean = clean.replace(/\bVth\b/g, 'V_{th}');
    clean = clean.replace(/\bRth\b/g, 'R_{th}');
    clean = clean.replace(/\bPmax\b/g, 'P_{\\max}');

    return katex.renderToString(clean, {
      displayMode: isDisplay,
      throwOnError: false,
      output: 'html'
    });
  } catch (e) {
    return str;
  }
}

// Convert markdown to HTML while strictly preserving SVG vector graphics and diagrams
function processMarkdownToHtml(rawContent) {
  if (!rawContent) return '';

  let text = rawContent;

  // 1. Extract and protect all diagram / SVG / circuit cards
  const diagramBlocks = [];
  text = text.replace(/<div\s+class=["'][^"']*(?:circuit-diagram-card|flowchart-card)[^"']*["'][\s\S]*?<\/div>\s*<\/div>/gi, (match) => {
    const id = diagramBlocks.length;
    diagramBlocks.push(match);
    return `\x00DIAGRAM_BLOCK_${id}\x00`;
  });
  text = text.replace(/<svg[\s\S]*?<\/svg>/gi, (match) => {
    const id = diagramBlocks.length;
    diagramBlocks.push(`<div class="circuit-diagram-card">${match}</div>`);
    return `\x00DIAGRAM_BLOCK_${id}\x00`;
  });

  // 2. Pre-clean corrupted JS escaped commas before text/Omega
  text = text.replace(/,\s*\\*text\{/g, '~\\text{');
  text = text.replace(/,\s*\\*(?:Omega|Ω)\b/g, '~\\Omega');
  text = text.replace(/(\d+(?:\.\d+)?)\s*,\s*(V|A|W|Ω|Hz|mA|kV|mV|μA|pF|μF|nF|F|H|mH|kΩ|MΩ)\b/g, '$1 $2');

  // 3. Extract $$...$$ display math
  const displayMathBlocks = [];
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
    const id = displayMathBlocks.length;
    displayMathBlocks.push(`<div class="display-math">${renderMath(math, true)}</div>`);
    return `\x00MATH_DISPLAY_${id}\x00`;
  });

  // 4. Extract $...$ inline math
  const inlineMathBlocks = [];
  text = text.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    const id = inlineMathBlocks.length;
    inlineMathBlocks.push(renderMath(math, false));
    return `\x00MATH_INLINE_${id}\x00`;
  });

  // 5. Handle code blocks
  const codeBlocks = [];
  text = text.replace(/```([a-zA-Z0-9_\-\+]*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const id = codeBlocks.length;
    const escaped = code.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    codeBlocks.push(`<div class="code-editor-box"><pre><code>${escaped}</code></pre></div>`);
    return `\x00CODE_BLOCK_${id}\x00`;
  });

  // 6. Handle tables
  text = text.replace(/((?:\|[^\n]+\|\r?\n)+)/g, (tableMatch) => {
    const lines = tableMatch.trim().split(/\r?\n/);
    if (lines.length < 2) return tableMatch;
    let tableHtml = '<div class="table-wrap"><table class="academic-table">';
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
        cells.forEach(c => { tableHtml += `<td>${c}</td>`; });
        tableHtml += '</tr>';
      }
    }
    tableHtml += '</tbody></table></div>';
    return tableHtml;
  });

  // 7. Handle callouts / blockquotes
  text = text
    .replace(/^> 🔴 (.*?)$/gm, '<div class="callout callout-trap"><strong>🚨 EXAMINER TRAP / PITFALL:</strong><br/>$1</div>')
    .replace(/^> 💡 (.*?)$/gm, '<div class="callout callout-mnemonic"><strong>💡 TOPPER MEMORY HACK:</strong><br/>$1</div>')
    .replace(/^> 🟢 (.*?)$/gm, '<div class="callout callout-law"><strong>✅ FUNDAMENTAL LAW / RULE:</strong><br/>$1</div>')
    .replace(/^> 📌 (.*?)$/gm, '<div class="callout callout-derivation"><strong>📌 CRITICAL EXAM DERIVATION:</strong><br/>$1</div>')
    .replace(/^> 🔵 (.*?)$/gm, '<div class="callout callout-intuition"><strong>🧠 INTUITION:</strong><br/>$1</div>')
    .replace(/^> ⚡ (.*?)$/gm, '<div class="callout callout-takeaway"><strong>⚡ KEY TAKEAWAY:</strong><br/>$1</div>')
    .replace(/^>\s*(.*?)$/gm, '<blockquote>$1</blockquote>');

  // 8. Handle markdown headings
  text = text.replace(/^#### (.*$)/gim, '<h4 class="h4-heading">$1</h4>');
  text = text.replace(/^### (.*$)/gim, '<h3 class="h3-heading">$1</h3>');
  text = text.replace(/^## (.*$)/gim, '<h2 class="h2-heading">$1</h2>');
  text = text.replace(/^# (.*$)/gim, '<h1 class="h1-heading">$1</h1>');

  // 9. Handle bold & italics
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
  text = text.replace(/`([^`\n]+)`/g, '<code class="inline-code">$1</code>');

  // 10. Handle horizontal rules
  text = text.replace(/^---$/gim, '<hr class="academic-hr" />');

  // 11. Format lists
  text = text.replace(/^[-*]\s+(.*$)/gim, '<div class="list-item"><span class="bullet">&bull;</span><span>$1</span></div>');
  text = text.replace(/^(\d+)\.\s+(.*$)/gim, '<div class="list-item"><span class="list-num">$1.</span><span>$2</span></div>');

  // 12. Replace paragraph breaks
  text = text.replace(/\n{2,}/g, '<div style="margin-top: 10px;"></div>');
  text = text.replace(/\n/g, '<br/>');

  // 13. Restore code blocks
  codeBlocks.forEach((rendered, i) => {
    text = text.replace(`\x00CODE_BLOCK_${i}\x00`, rendered);
  });

  // 14. Restore math blocks
  inlineMathBlocks.forEach((rendered, i) => {
    text = text.replace(`\x00MATH_INLINE_${i}\x00`, rendered);
  });
  displayMathBlocks.forEach((rendered, i) => {
    text = text.replace(`\x00MATH_DISPLAY_${i}\x00`, rendered);
  });

  // 15. Restore diagram and SVG blocks (100% UNTOUCHED, NO BR TAGS INJECTED!)
  diagramBlocks.forEach((rendered, i) => {
    text = text.replace(`\x00DIAGRAM_BLOCK_${i}\x00`, rendered);
  });

  return text;
}

// Generate Full Master HTML Document for a Subject
function generateSubjectHtml({ title, courseCode, department, unitsData }) {
  let unitsHtml = '';

  unitsData.forEach((unit, uIdx) => {
    unitsHtml += `
      <div class="unit-wrapper">
        <div class="unit-banner">
          <div class="unit-badge">UNIT ${unit.unitNum} &bull; MMEC PREMIER ACADEMIC CURRICULUM</div>
          <h2 class="unit-title-text">${unit.title}</h2>
          <div class="unit-meta-bar">
            <span><strong>Exam Weightage:</strong> ${unit.examWeightage || '25%'}</span> &bull;
            <span><strong>Estimated Study Time:</strong> ${unit.readingTime || '45 mins'}</span>
          </div>
          ${unit.summary ? `<p class="unit-summary-text">${unit.summary}</p>` : ''}
        </div>
    `;

    (unit.sections || []).forEach((sec) => {
      unitsHtml += `
        <div class="section-card">
          <h3 class="section-card-title">${sec.title}</h3>
          <div class="section-card-content">
            ${processMarkdownToHtml(sec.content)}
          </div>
        </div>
      `;
    });

    unitsHtml += `</div><div class="page-break"></div>`;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title} — Master Study Material</title>
  <style>
    ${katexCss}

    @page {
      size: A4 portrait;
      margin: 14mm 12mm 14mm 12mm;
    }

    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 'Inter', Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.65;
      font-size: 10.5pt;
      margin: 0;
      padding: 0;
    }

    /* COVER PAGE */
    .cover-page {
      text-align: center;
      padding: 50px 20px 40px;
      page-break-after: always;
      border: 3px double #0284c7;
      border-radius: 12px;
      margin: 20px 0;
    }

    .cover-badge {
      display: inline-block;
      padding: 6px 16px;
      background: #e0f2fe;
      color: #0369a1;
      font-weight: 800;
      font-size: 10pt;
      border-radius: 20px;
      margin-bottom: 20px;
      letter-spacing: 1px;
    }

    .cover-title {
      font-size: 24pt;
      font-weight: 900;
      color: #0f172a;
      margin: 0 0 10px;
      line-height: 1.25;
    }

    .cover-subtitle {
      font-size: 13.5pt;
      color: #475569;
      margin: 0 0 25px;
    }

    .cover-divider {
      width: 100px;
      height: 4px;
      background: #0284c7;
      margin: 0 auto 25px;
      border-radius: 2px;
    }

    .cover-box {
      display: inline-block;
      text-align: left;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 20px 30px;
      border-radius: 8px;
      font-size: 11pt;
      margin-bottom: 35px;
    }

    .cover-box div {
      margin-bottom: 6px;
    }

    .cover-footer {
      font-size: 9.5pt;
      color: #64748b;
      margin-top: 40px;
    }

    /* UNITS & SECTIONS */
    .unit-wrapper {
      margin-bottom: 25px;
    }

    .unit-banner {
      background: #f0fdf4;
      border-left: 6px solid #16a34a;
      padding: 14px 18px;
      border-radius: 0 8px 8px 0;
      margin-bottom: 20px;
      page-break-after: avoid;
    }

    .unit-badge {
      font-size: 8.5pt;
      font-weight: 800;
      color: #15803d;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    .unit-title-text {
      font-size: 16pt;
      font-weight: 800;
      color: #14532d;
      margin: 0 0 6px;
    }

    .unit-meta-bar {
      font-size: 9pt;
      color: #4b5563;
      margin-bottom: 6px;
    }

    .unit-summary-text {
      font-size: 9.5pt;
      color: #374151;
      margin: 0;
      font-style: italic;
    }

    .section-card {
      margin-bottom: 22px;
    }

    .section-card-title {
      font-size: 12.5pt;
      font-weight: 700;
      color: #0369a1;
      border-bottom: 1.5px solid #e0f2fe;
      padding-bottom: 5px;
      margin: 18px 0 10px;
      page-break-after: avoid;
    }

    .section-card-content {
      font-size: 10pt;
      color: #1e293b;
    }

    /* DIAGRAMS & FLOWCHARTS (CRITICAL) */
    .circuit-diagram-card,
    .flowchart-card {
      background: #0b1329 !important;
      border: 1.5px solid #0284c7 !important;
      border-radius: 10px !important;
      padding: 14px 10px !important;
      margin: 16px 0 !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      display: block !important;
    }

    .circuit-diagram-card svg,
    .flowchart-card svg {
      display: block !important;
      max-width: 100% !important;
      height: auto !important;
      margin: 0 auto !important;
    }

    .circuit-diagram-caption {
      text-align: center;
      font-size: 9pt;
      font-weight: bold;
      color: #38bdf8;
      margin-top: 6px;
    }

    /* MATH & TABLES */
    .display-math {
      margin: 12px 0;
      padding: 8px 12px;
      background: #f8fafc;
      border-left: 3px solid #38bdf8;
      border-radius: 0 6px 6px 0;
      overflow-x: auto;
      text-align: center;
      page-break-inside: avoid;
    }

    .table-wrap {
      margin: 14px 0;
      page-break-inside: avoid;
      overflow-x: auto;
    }

    .academic-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9.5pt;
    }

    .academic-table th {
      background: #0284c7;
      color: #ffffff;
      padding: 7px 10px;
      text-align: left;
      font-weight: 700;
      border: 1px solid #0284c7;
    }

    .academic-table td {
      padding: 6px 10px;
      border: 1px solid #cbd5e1;
      color: #1e293b;
    }

    .academic-table tr:nth-child(even) td {
      background: #f8fafc;
    }

    /* CALLOUTS */
    .callout {
      margin: 12px 0;
      padding: 10px 14px;
      border-radius: 6px;
      font-size: 9.5pt;
      page-break-inside: avoid;
    }

    .callout-trap { background: #fff1f2; border-left: 4px solid #f43f5e; color: #9f1239; }
    .callout-mnemonic { background: #fefce8; border-left: 4px solid #eab308; color: #854d0e; }
    .callout-law { background: #f0fdf4; border-left: 4px solid #16a34a; color: #14532d; }
    .callout-derivation { background: #faf5ff; border-left: 4px solid #a855f7; color: #581c87; }
    .callout-intuition { background: #f0f9ff; border-left: 4px solid #0284c7; color: #075985; }
    .callout-takeaway { background: #ecfeff; border-left: 4px solid #06b6d4; color: #155e75; }

    blockquote {
      margin: 10px 0;
      padding: 8px 14px;
      background: #f1f5f9;
      border-left: 4px solid #64748b;
      font-size: 9.5pt;
      color: #475569;
    }

    .code-editor-box {
      margin: 12px 0;
      padding: 10px 14px;
      background: #0f172a;
      border-radius: 6px;
      color: #e2e8f0;
      font-family: Consolas, Monaco, "Courier New", monospace;
      font-size: 9pt;
      page-break-inside: avoid;
    }

    .code-editor-box pre { margin: 0; }
    .code-editor-box code { color: #86efac; }

    .inline-code {
      background: #f1f5f9;
      color: #0f172a;
      padding: 1px 5px;
      border-radius: 3px;
      font-size: 9pt;
      font-family: Consolas, Monaco, monospace;
    }

    .list-item {
      display: flex;
      align-items: baseline;
      margin: 4px 0;
      gap: 6px;
    }

    .bullet { color: #0284c7; font-weight: bold; }
    .list-num { color: #0284c7; font-weight: bold; min-width: 18px; }

    .academic-hr {
      border: none;
      border-top: 1.5px dashed #cbd5e1;
      margin: 20px 0;
    }

    .page-break {
      page-break-after: always;
    }

    .katex {
      font-size: 1.05em !important;
    }
  </style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div class="cover-badge">MMEC OFFICIAL SYLLABUS 2025-26</div>
    <h1 class="cover-title">${title}</h1>
    <div class="cover-subtitle">Complete 4-Unit Lecture Notes & University Solved Examination Bank</div>
    <div class="cover-divider"></div>
    <div class="cover-details cover-box">
      <div><strong>Course Code:</strong> ${courseCode}</div>
      <div><strong>Department:</strong> ${department}</div>
      <div><strong>Units Covered:</strong> Units 1, 2, 3, and 4 (Exhaustive Theory + Solved Problems)</div>
      <div><strong>Visuals Included:</strong> ANSI Flowcharts, Vector Circuit Diagrams & Schematics</div>
      <div><strong>Mathematical Rigor:</strong> Publication-grade KaTeX typesetting</div>
    </div>
    <div class="cover-footer">
      Maharishi Markandeshwar Engineering College (MMEC) &bull; 100% Offline Accessible
    </div>
  </div>

  <!-- UNITS CONTENT -->
  ${unitsHtml}

</body>
</html>`;
}

// Edge headless compiler
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

function compilePdf(htmlContent, outputPdfPath) {
  const tempHtmlPath = path.resolve(`scratch/temp_${Date.now()}.html`);
  fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');

  const fileUrl = 'file:///' + tempHtmlPath.replace(/\\/g, '/');

  try {
    console.log(`Compiling ${path.basename(outputPdfPath)} via Edge headless...`);
    execSync(`"${edgePath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${outputPdfPath}" "${fileUrl}"`, { stdio: 'pipe' });
    const size = fs.statSync(outputPdfPath).size;
    console.log(`✓ Successfully compiled ${path.basename(outputPdfPath)} (${(size / 1024 / 1024).toFixed(2)} MB)`);
    if (fs.existsSync(tempHtmlPath)) fs.unlinkSync(tempHtmlPath);
    return true;
  } catch (e) {
    console.error(`Failed to compile ${outputPdfPath}:`, e.message);
    if (fs.existsSync(tempHtmlPath)) fs.unlinkSync(tempHtmlPath);
    return false;
  }
}

// 1. Build BEEE Notes PDF
const beeeHtml = generateSubjectHtml({
  title: 'Basic Electrical & Electronics Engineering',
  courseCode: 'BELE-001 / BEEE',
  department: 'B.Tech (First Year Common Curriculum)',
  unitsData: beeeUnitsData
});

const beeePdf1 = path.resolve('client/public/BELE001_Basic_Electrical_and_Electronics_Engineering_notes.pdf');
const beeePdf2 = path.resolve('client/public/BEEE_notes.pdf');

compilePdf(beeeHtml, beeePdf1);
fs.copyFileSync(beeePdf1, beeePdf2);

// 2. Build C Programming Notes PDF (with new ANSI flowcharts!)
const cHtml = generateSubjectHtml({
  title: 'Computational & Problem Solving Using C',
  courseCode: 'BCSE-008 / C Programming',
  department: 'B.Tech Computer Science & Engineering',
  unitsData: cUnitsData
});

const cPdf = path.resolve('client/public/BCSE008_Computational_and_Problem_Solving_using_C_notes.pdf');
compilePdf(cHtml, cPdf);

console.log('=== PDF Compilation Complete ===');
