import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import katex from '../client/node_modules/katex/dist/katex.mjs';

import { beeeUnitsData } from '../client/src/data/beeeNotesData.js';
import { aimlUnitsData } from '../client/src/data/aimlNotesData.js';
import { math1UnitsData } from '../client/src/data/math1NotesData.js';
import { cUnitsData } from '../client/src/data/cNotesData.js';
import { webTechUnitsData } from '../client/src/data/webTechNotesData.js';
import { physicsUnitsData } from '../client/src/data/physicsNotesData.js';
import { pythonUnitsData } from '../client/src/data/pythonNotesData.js';
import { dsaUnitsData } from '../client/src/data/dsaNotesData.js';

const execAsync = promisify(exec);

const katexCssPath = path.resolve('client/node_modules/katex/dist/katex.min.css');
const katexCss = fs.readFileSync(katexCssPath, 'utf8');

function renderMath(str, isDisplay = false) {
  try {
    let clean = (str || '').trim();
    clean = clean.replace(/,\s*\\*text\{/g, '\\,\\text{');
    clean = clean.replace(/,\s*\\*(?:Omega|Ω)\b/g, '\\,\\Omega');
    clean = clean.replace(/(?<=[0-9\s\(\[\{,\.\=])imes\b/g, '\\times');
    clean = clean.replace(/(?<=[0-9\s\(\[\{,\.\=])ext\{/g, '\\text{');
    clean = clean.replace(/(?<=\\sin\s*|\\sin|\\cos\s*|\\cos|d\s*|[0-9\s\(\[\{,\.\=])heta\b/g, '\\theta');
    clean = clean.replace(/\bRL\b/g, 'R_L');
    clean = clean.replace(/\bVth\b/g, 'V_{th}');
    clean = clean.replace(/\bRth\b/g, 'R_{th}');
    clean = clean.replace(/\bPmax\b/g, 'P_{\\max}');
    clean = clean
      .replace(/₀/g, '_0').replace(/₁/g, '_1').replace(/₂/g, '_2').replace(/₃/g, '_3')
      .replace(/₄/g, '_4').replace(/₅/g, '_5').replace(/₆/g, '_6').replace(/₇/g, '_7')
      .replace(/₈/g, '_8').replace(/₉/g, '_9').replace(/ₐ/g, '_a').replace(/ₑ/g, '_e')
      .replace(/ₕ/g, '_h').replace(/ᵢ/g, '_i').replace(/ⱼ/g, '_j').replace(/ₖ/g, '_k')
      .replace(/ₗ/g, '_l').replace(/ₘ/g, '_m').replace(/ₙ/g, '_n').replace(/ₒ/g, '_o')
      .replace(/ₚ/g, '_p').replace(/ᵣ/g, '_r').replace(/ₛ/g, '_s').replace(/ₜ/g, '_t')
      .replace(/ᵤ/g, '_u').replace(/ᵥ/g, '_v').replace(/ₓ/g, '_x');

    return katex.renderToString(clean, {
      displayMode: isDisplay,
      throwOnError: false,
      strict: 'ignore',
      output: 'html'
    });
  } catch (e) {
    return str;
  }
}

function processMarkdownToHtml(rawContent) {
  if (!rawContent) return '';
  let text = rawContent;

  // 1. Protect diagrams & SVGs
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

  // 2. Clean escaped thin spaces
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

  // 6. Handle <example> and <derivation> tags cleanly for PDF
  text = text.replace(/<example\b([^>]*)>([\s\S]*?)<\/example>/g, (match, attrs, body) => {
    const titleMatch = attrs.match(/title="([^"]*)"/);
    const title = titleMatch ? titleMatch[1] : 'Solved University Example';
    return `<div class="callout callout-intuition"><strong>📘 ${title}</strong><br/>${body}</div>`;
  });
  text = text.replace(/<derivation\b([^>]*)>([\s\S]*?)<\/derivation>/g, (match, attrs, body) => {
    const titleMatch = attrs.match(/title="([^"]*)"/);
    const title = titleMatch ? titleMatch[1] : 'Formal University Derivation';
    return `<div class="callout callout-derivation"><strong>📐 ${title}</strong><br/>${body}</div>`;
  });
  text = text.replace(/<pill ([a-z\-]+)>([\s\S]*?)<\/pill>/g, '<strong>[$2]</strong>');

  // 7. Handle tables
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

  // 8. Callouts
  text = text
    .replace(/^> 🔴 (.*?)$/gm, '<div class="callout callout-trap"><strong>🚨 EXAMINER TRAP / PITFALL:</strong><br/>$1</div>')
    .replace(/^> 💡 (.*?)$/gm, '<div class="callout callout-mnemonic"><strong>💡 TOPPER MEMORY HACK:</strong><br/>$1</div>')
    .replace(/^> 🟢 (.*?)$/gm, '<div class="callout callout-law"><strong>✅ FUNDAMENTAL LAW / RULE:</strong><br/>$1</div>')
    .replace(/^> 📌 (.*?)$/gm, '<div class="callout callout-derivation"><strong>📌 CRITICAL EXAM DERIVATION:</strong><br/>$1</div>')
    .replace(/^> 🔵 (.*?)$/gm, '<div class="callout callout-intuition"><strong>🧠 INTUITION:</strong><br/>$1</div>')
    .replace(/^> ⚡ (.*?)$/gm, '<div class="callout callout-takeaway"><strong>⚡ KEY TAKEAWAY:</strong><br/>$1</div>')
    .replace(/^>\s*(.*?)$/gm, '<blockquote>$1</blockquote>');

  // 9. Headings, bold, lists
  text = text.replace(/^#### (.*$)/gim, '<h4 class="h4-heading">$1</h4>');
  text = text.replace(/^### (.*$)/gim, '<h3 class="h3-heading">$1</h3>');
  text = text.replace(/^## (.*$)/gim, '<h2 class="h2-heading">$1</h2>');
  text = text.replace(/^# (.*$)/gim, '<h1 class="h1-heading">$1</h1>');
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
  text = text.replace(/`([^`\n]+)`/g, '<code class="inline-code">$1</code>');
  text = text.replace(/^---$/gim, '<hr class="academic-hr" />');
  text = text.replace(/^[-*]\s+(.*$)/gim, '<div class="list-item"><span class="bullet">&bull;</span><span>$1</span></div>');
  text = text.replace(/^(\d+)\.\s+(.*$)/gim, '<div class="list-item"><span class="list-num">$1.</span><span>$2</span></div>');
  text = text.replace(/\n{2,}/g, '<div style="margin-top: 10px;"></div>');
  text = text.replace(/\n/g, '<br/>');

  // Restore placeholders
  codeBlocks.forEach((rendered, i) => { text = text.replace(`\x00CODE_BLOCK_${i}\x00`, rendered); });
  inlineMathBlocks.forEach((rendered, i) => { text = text.replace(`\x00MATH_INLINE_${i}\x00`, rendered); });
  displayMathBlocks.forEach((rendered, i) => { text = text.replace(`\x00MATH_DISPLAY_${i}\x00`, rendered); });
  diagramBlocks.forEach((rendered, i) => { text = text.replace(`\x00DIAGRAM_BLOCK_${i}\x00`, rendered); });

  return text;
}

const commonStyles = `
    ${katexCss}
    @page { size: A4 portrait; margin: 14mm 12mm 14mm 12mm; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 'Inter', Helvetica, Arial, sans-serif; color: #0f172a; background: #ffffff; line-height: 1.65; font-size: 10.5pt; margin: 0; padding: 0; }
    .cover-page { text-align: center; padding: 36px 20px 30px; border: 3px double #0284c7; border-radius: 12px; margin: 10px 0 24px; }
    .cover-badge { display: inline-block; padding: 6px 16px; background: #e0f2fe; color: #0369a1; font-weight: 800; font-size: 10pt; border-radius: 20px; margin-bottom: 14px; letter-spacing: 1px; }
    .cover-title { font-size: 20pt; font-weight: 900; color: #0f172a; margin: 0 0 8px; line-height: 1.25; }
    .cover-subtitle { font-size: 12pt; color: #475569; margin: 0 0 18px; }
    .cover-divider { width: 100px; height: 4px; background: #0284c7; margin: 0 auto 18px; border-radius: 2px; }
    .cover-box { display: inline-block; text-align: left; background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px 24px; border-radius: 8px; font-size: 10pt; margin-bottom: 16px; }
    .cover-box div { margin-bottom: 4px; }
    .cover-footer { font-size: 9pt; color: #64748b; margin-top: 10px; }
    .unit-wrapper { margin-bottom: 25px; }
    .unit-banner { background: #f0fdf4; border-left: 6px solid #16a34a; padding: 14px 18px; border-radius: 0 8px 8px 0; margin-bottom: 20px; page-break-after: avoid; }
    .unit-badge { font-size: 8.5pt; font-weight: 800; color: #15803d; letter-spacing: 0.5px; margin-bottom: 4px; }
    .unit-title-text { font-size: 16pt; font-weight: 800; color: #14532d; margin: 0 0 6px; }
    .unit-meta-bar { font-size: 9pt; color: #4b5563; margin-bottom: 6px; }
    .unit-summary-text { font-size: 9.5pt; color: #374151; margin: 0; font-style: italic; }
    .roadmap-box { background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; page-break-inside: avoid; }
    .roadmap-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 10px; }
    .roadmap-title { font-size: 10.5pt; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; }
    .roadmap-stats { font-size: 8.5pt; font-weight: 700; color: #0369a1; background: #e0f2fe; padding: 3px 10px; border-radius: 12px; }
    .roadmap-mod { margin-bottom: 8px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px; page-break-inside: avoid; }
    .roadmap-mod-head { display: flex; justify-content: space-between; align-items: baseline; font-weight: 800; font-size: 9.5pt; color: #0f172a; margin-bottom: 4px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 3px; }
    .roadmap-mod-pg { font-size: 8.5pt; font-weight: 800; color: #15803d; background: #dcfce7; padding: 1px 8px; border-radius: 10px; font-family: Consolas, monospace; }
    .roadmap-item { display: flex; justify-content: space-between; align-items: baseline; font-size: 8.5pt; color: #334155; padding: 2px 0 2px 10px; }
    .roadmap-item-type { font-size: 7.5pt; font-weight: 700; padding: 0 5px; border-radius: 4px; margin-right: 6px; text-transform: uppercase; }
    .type-topic { background: #e0f2fe; color: #0369a1; }
    .type-proof { background: #f3e8ff; color: #7e22ce; }
    .type-solved { background: #dcfce7; color: #15803d; }
    .roadmap-item-pg { font-family: Consolas, monospace; font-weight: 700; color: #475569; font-size: 8pt; margin-left: 8px; white-space: nowrap; }
    .section-card { margin-bottom: 22px; }
    .section-card-title { font-size: 12.5pt; font-weight: 700; color: #0369a1; border-bottom: 1.5px solid #e0f2fe; padding-bottom: 5px; margin: 18px 0 10px; page-break-after: avoid; }
    .section-card-content { font-size: 10pt; color: #1e293b; }
    .circuit-diagram-card, .flowchart-card { background: #0b1329 !important; border: 1.5px solid #0284c7 !important; border-radius: 10px !important; padding: 14px 10px !important; margin: 16px 0 !important; page-break-inside: avoid !important; break-inside: avoid !important; display: block !important; }
    .circuit-diagram-card svg, .flowchart-card svg { display: block !important; max-width: 100% !important; height: auto !important; margin: 0 auto !important; }
    .display-math { margin: 12px 0; padding: 8px 12px; background: #f8fafc; border-left: 3px solid #38bdf8; border-radius: 0 6px 6px 0; overflow-x: auto; text-align: center; page-break-inside: avoid; }
    .table-wrap { margin: 14px 0; page-break-inside: avoid; overflow-x: auto; }
    .academic-table { width: 100%; border-collapse: collapse; font-size: 9.5pt; }
    .academic-table th { background: #0284c7; color: #ffffff; padding: 7px 10px; text-align: left; font-weight: 700; border: 1px solid #0284c7; }
    .academic-table td { padding: 6px 10px; border: 1px solid #cbd5e1; color: #1e293b; }
    .academic-table tr:nth-child(even) td { background: #f8fafc; }
    .callout { margin: 12px 0; padding: 10px 14px; border-radius: 6px; font-size: 9.5pt; page-break-inside: avoid; }
    .callout-trap { background: #fff1f2; border-left: 4px solid #f43f5e; color: #9f1239; }
    .callout-mnemonic { background: #fefce8; border-left: 4px solid #eab308; color: #854d0e; }
    .callout-law { background: #f0fdf4; border-left: 4px solid #16a34a; color: #14532d; }
    .callout-derivation { background: #faf5ff; border-left: 4px solid #a855f7; color: #581c87; }
    .callout-intuition { background: #f0f9ff; border-left: 4px solid #0284c7; color: #075985; }
    .callout-takeaway { background: #ecfeff; border-left: 4px solid #06b6d4; color: #155e75; }
    blockquote { margin: 10px 0; padding: 8px 14px; background: #f1f5f9; border-left: 4px solid #64748b; font-size: 9.5pt; color: #475569; }
    .code-editor-box { margin: 12px 0; padding: 10px 14px; background: #0f172a; border-radius: 6px; color: #e2e8f0; font-family: Consolas, Monaco, "Courier New", monospace; font-size: 9pt; page-break-inside: avoid; }
    .code-editor-box pre { margin: 0; white-space: pre-wrap; word-break: break-word; }
    .code-editor-box code { color: #86efac; }
    .inline-code { background: #f1f5f9; color: #0f172a; padding: 1px 5px; border-radius: 3px; font-size: 9pt; font-family: Consolas, Monaco, monospace; }
    .list-item { display: flex; align-items: baseline; margin: 4px 0; gap: 6px; }
    .bullet { color: #0284c7; font-weight: bold; }
    .list-num { color: #0284c7; font-weight: bold; min-width: 18px; }
    .academic-hr { border: none; border-top: 1.5px dashed #cbd5e1; margin: 20px 0; }
    .page-break { page-break-after: always; }
    .katex { font-size: 1.05em !important; }
`;

function cleanRoadmapText(raw) {
  if (!raw) return '';
  return raw
    .replace(/\$\$([\s\S]*?)\$\$/g, '$1')
    .replace(/\$([^$\n]+?)\$/g, '$1')
    .replace(/\\(?:text|mathrm|mathbf|mathcal)\{([^}]+)\}/g, '$1')
    .replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/[{}]/g, '')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildUnitRoadmapHtml(unit) {
  if (!unit || !Array.isArray(unit.sections)) return '';
  const CHARS_PER_PAGE = 2200;
  let cumulativeChars = 650;
  let totalSubTopics = 0;

  let modsHtml = '';
  unit.sections.forEach((sec, idx) => {
    const startPage = Math.max(1, Math.floor(cumulativeChars / CHARS_PER_PAGE) + 1);
    const content = sec.content || '';
    const tokenRegex = /(?:^(#{2,4})\s+(.+)$)|(?:<derivation\s+title="([^"]+)">)|(?:<example\s+title="([^"]+)">)/gm;
    let match;
    let itemsHtml = '';
    while ((match = tokenRegex.exec(content)) !== null) {
      const itemPage = Math.max(1, Math.floor((cumulativeChars + match.index) / CHARS_PER_PAGE) + 1);
      if (match[1]) {
        const cleanText = cleanRoadmapText(match[2]);
        if (cleanText) {
          totalSubTopics++;
          itemsHtml += `<div class="roadmap-item"><span><span class="roadmap-item-type type-topic">Topic</span>${cleanText}</span><span class="roadmap-item-pg">Pg. ${itemPage}</span></div>`;
        }
      } else if (match[3]) {
        const cleanTitle = cleanRoadmapText(match[3]);
        totalSubTopics++;
        itemsHtml += `<div class="roadmap-item"><span><span class="roadmap-item-type type-proof">Proof</span>${cleanTitle}</span><span class="roadmap-item-pg">Pg. ${itemPage}</span></div>`;
      } else if (match[4]) {
        const cleanTitle = cleanRoadmapText(match[4]);
        totalSubTopics++;
        itemsHtml += `<div class="roadmap-item"><span><span class="roadmap-item-type type-solved">Solved Q</span>${cleanTitle}</span><span class="roadmap-item-pg">Pg. ${itemPage}</span></div>`;
      }
    }
    cumulativeChars += content.length + 350;
    const endPage = Math.max(startPage, Math.floor(cumulativeChars / CHARS_PER_PAGE) + 1);
    const pageLabel = startPage === endPage ? `Pg. ${startPage}` : `Pg. ${startPage}–${endPage}`;

    modsHtml += `
      <div class="roadmap-mod">
        <div class="roadmap-mod-head">
          <span>${idx + 1}. ${cleanRoadmapText(sec.title)}</span>
          <span class="roadmap-mod-pg">${pageLabel}</span>
        </div>
        ${itemsHtml}
      </div>
    `;
  });

  const totalPages = Math.max(1, Math.floor(cumulativeChars / CHARS_PER_PAGE) + 1);
  const uNum = unit.unitNum || unit.num || 1;

  return `
    <div class="roadmap-box">
      <div class="roadmap-header">
        <span class="roadmap-title">🗺️ Unit ${uNum} Syllabus Roadmap &amp; Topic Index (Table of Contents)</span>
        <span class="roadmap-stats">${unit.sections.length} Modules &bull; ${totalSubTopics} Topics &bull; Pages 1–${totalPages}</span>
      </div>
      ${modsHtml}
    </div>
  `;
}

function generateSingleUnitHtml({ subjectTitle, courseCode, unit }) {
  const uNum = unit.unitNum || unit.num || 1;
  let sectionsHtml = '';
  (unit.sections || []).forEach((sec) => {
    sectionsHtml += `
      <div class="section-card">
        <h3 class="section-card-title">${sec.title}</h3>
        <div class="section-card-content">
          ${processMarkdownToHtml(sec.content)}
        </div>
      </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${courseCode} — Unit ${uNum}: ${unit.title}</title>
  <style>${commonStyles}</style>
</head>
<body>
  <div class="unit-wrapper">
    <div class="unit-banner">
      <div class="unit-badge">MMDU MULLANA OFFICIAL SYLLABUS &bull; ${courseCode} &bull; UNIT ${uNum}</div>
      <h2 class="unit-title-text">Unit ${uNum}: ${unit.title}</h2>
      <div class="unit-meta-bar">
        <span><strong>Subject:</strong> ${subjectTitle} (${courseCode})</span> &bull;
        <span><strong>Exam Weightage:</strong> ${unit.examWeightage || '15 Marks'}</span> &bull;
        <span><strong>Study Time:</strong> ${unit.readingTime || '45 mins'}</span>
      </div>
    </div>
    ${buildUnitRoadmapHtml(unit)}
    ${sectionsHtml}
  </div>
</body>
</html>`;
}

function generateMasterHtml({ subjectTitle, courseCode, unitsData }) {
  let unitsHtml = '';
  unitsData.forEach((unit) => {
    const uNum = unit.unitNum || unit.num || 1;
    unitsHtml += `
      <div class="unit-wrapper">
        <div class="unit-banner">
          <div class="unit-badge">UNIT ${uNum} &bull; MMDU MULLANA ACADEMIC CURRICULUM</div>
          <h2 class="unit-title-text">Unit ${uNum}: ${unit.title}</h2>
          <div class="unit-meta-bar">
            <span><strong>Exam Weightage:</strong> ${unit.examWeightage || '15 Marks'}</span> &bull;
            <span><strong>Estimated Study Time:</strong> ${unit.readingTime || '45 mins'}</span>
          </div>
        </div>
        ${buildUnitRoadmapHtml(unit)}
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
  <title>${subjectTitle} (${courseCode}) — Complete 4-Unit Master Notes</title>
  <style>${commonStyles}</style>
</head>
<body>
  <div class="cover-page">
    <div class="cover-badge">MMDU MULLANA OFFICIAL SYLLABUS 2025-26</div>
    <h1 class="cover-title">${subjectTitle}</h1>
    <div class="cover-subtitle">Complete 4-Unit Lecture Notes &amp; University Solved Examination Bank</div>
    <div class="cover-divider"></div>
    <div class="cover-details cover-box">
      <div><strong>Course Code:</strong> ${courseCode}</div>
      <div><strong>Units Covered:</strong> Units 1, 2, 3, and 4 (Exhaustive Theory + Solved Problems)</div>
      <div><strong>Mathematical Rigor:</strong> Publication-grade KaTeX typesetting</div>
    </div>
    <div class="cover-footer">Maharishi Markandeshwar (Deemed to be University), Mullana &bull; 100% Offline Accessible</div>
  </div>
  ${unitsHtml}
</body>
</html>`;
}

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const unitsOutDir = path.resolve('client/public/pdfs/units');
const scratchDir = path.resolve('scratch');
fs.mkdirSync(unitsOutDir, { recursive: true });
fs.mkdirSync(scratchDir, { recursive: true });

const subjects = [
  { code: 'BELE-001', title: 'Basic Electrical & Electronics Engineering', units: beeeUnitsData },
  { code: 'BCSE-011', title: 'Artificial Intelligence & Machine Learning', units: aimlUnitsData },
  { code: 'BMAT-001', title: 'Mathematics-I', units: math1UnitsData },
  { code: 'BCSE-008', title: 'Computational & Problem Solving Using C', units: cUnitsData },
  { code: 'BCSE-012', title: 'Fundamentals of Web Technologies', units: webTechUnitsData },
  { code: 'BPHY-001', title: 'Applied Physics', units: physicsUnitsData },
  { code: 'BCSE-004', title: 'Python Programming', units: pythonUnitsData },
  { code: 'BCSE-007', title: 'Data Structures & Algorithms', units: dsaUnitsData }
];

async function compileTask(job, workerId) {
  const tempHtml = path.resolve(scratchDir, `job_${workerId}_${Date.now()}_${Math.random().toString(36).slice(2)}.html`);
  const profileDir = path.resolve(scratchDir, `edge_prof_${workerId}`);
  fs.writeFileSync(tempHtml, job.html, 'utf8');
  const fileUrl = 'file:///' + tempHtml.replace(/\\/g, '/');

  try {
    await execAsync(`"${edgePath}" --headless --disable-gpu --user-data-dir="${profileDir}" --no-pdf-header-footer --print-to-pdf="${job.outPath}" "${fileUrl}"`);
    const sizeKB = (fs.statSync(job.outPath).size / 1024).toFixed(0);
    console.log(`✓ [${job.label}] -> ${path.basename(job.outPath)} (${sizeKB} KB)`);
  } finally {
    if (fs.existsSync(tempHtml)) fs.unlinkSync(tempHtml);
  }
}

async function main() {
  const jobs = [];

  // 1. All 32 Per-Unit PDFs
  for (const sub of subjects) {
    for (const unit of sub.units) {
      const uNum = unit.unitNum || unit.num;
      const html = generateSingleUnitHtml({
        subjectTitle: sub.title,
        courseCode: sub.code,
        unit
      });
      const outPath = path.join(unitsOutDir, `${sub.code}_Unit_${uNum}.pdf`);
      jobs.push({ label: `${sub.code} U${uNum}`, html, outPath });
    }
  }

  // 2. Regenerate BMAT-001 Mathematics-I Master 4-Unit PDF with new MMDU syllabus
  const math1MasterHtml = generateMasterHtml({
    subjectTitle: 'Mathematics-I',
    courseCode: 'BMAT-001',
    unitsData: math1UnitsData
  });
  const math1PrimaryPdf = path.resolve('client/public/BMAT001_Mathematics_I_MMU_Handwritten_Notes.pdf');
  jobs.push({ label: 'BMAT-001 Master', html: math1MasterHtml, outPath: math1PrimaryPdf });

  console.log(`Starting compilation of ${jobs.length} PDFs across 4 parallel workers...`);
  const CONCURRENCY = 4;
  let idx = 0;

  async function worker(workerId) {
    while (idx < jobs.length) {
      const myIdx = idx++;
      await compileTask(jobs[myIdx], workerId);
    }
  }

  await Promise.all([worker(1), worker(2), worker(3), worker(4)]);

  // Copy BMAT-001 master PDF to aliases
  fs.copyFileSync(math1PrimaryPdf, path.resolve('client/public/Mathematics_1_notes.pdf'));
  fs.copyFileSync(math1PrimaryPdf, path.resolve('client/public/MATH101_Engineering_Mathematics_I_Handwritten_Notes.pdf'));

  // Clean up edge profiles
  for (let w = 1; w <= CONCURRENCY; w++) {
    const prof = path.resolve(scratchDir, `edge_prof_${w}`);
    if (fs.existsSync(prof)) fs.rmSync(prof, { recursive: true, force: true });
  }

  console.log('=== All 32 Unit PDFs + Master PDF Compiled Successfully! ===');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
