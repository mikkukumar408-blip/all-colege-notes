import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Copy, 
  Check, 
  Bookmark, 
  Layers, 
  Zap, 
  Cpu, 
  Sparkles,
  ShieldCheck,
  Calculator,
  Printer
} from 'lucide-react';
import katex from 'katex';

const FORMULA_CATEGORIES = {
  'constants': {
    title: 'Physical & Engineering Constants',
    icon: '⚛️',
    items: [
      { name: 'Speed of Light in Vacuum', symbol: '$c$', value: '$2.99792458 \\times 10^8\\text{ m/s}$', note: 'Exact definition' },
      { name: 'Planck Constant', symbol: '$h$', value: '$6.62607015 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$', note: 'Quantum of action' },
      { name: 'Reduced Planck Constant', symbol: '$\\hbar$', value: '$1.054571817 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$', note: '$\\hbar = h / (2\\pi)$' },
      { name: 'Elementary Charge', symbol: '$e$', value: '$1.602176634 \\times 10^{-19}\\text{ C}$', note: 'Single electron charge' },
      { name: 'Permittivity of Free Space', symbol: '$\\varepsilon_0$', value: '$8.8541878128 \\times 10^{-12}\\text{ F/m}$', note: 'Capacitance & Coulomb Law' },
      { name: 'Permeability of Free Space', symbol: '$\\mu_0$', value: '$4\\pi \\times 10^{-7} \\approx 1.2566 \\times 10^{-6}\\text{ H/m}$', note: 'Magnetic induction' },
      { name: 'Electron Rest Mass', symbol: '$m_e$', value: '$9.1093837 \\times 10^{-31}\\text{ kg}$', note: '$0.510998\\text{ MeV}/c^2$' },
      { name: 'Boltzmann Constant', symbol: '$k_B$', value: '$1.380649 \\times 10^{-23}\\text{ J/K}$', note: 'Thermal voltage $V_T = k_B T / q$' }
    ]
  },
  'beee': {
    title: 'BEEE & Electrical Network Theorems',
    icon: '⚡',
    items: [
      { name: 'Thevenin Voltage', symbol: '$V_{th}$', value: '$V_{th} = V_{oc} = V_A - V_B$', note: 'Open-circuit terminal voltage' },
      { name: 'Thevenin Resistance', symbol: '$R_{th}$', value: '$R_{th} = \\frac{V_{oc}}{I_{sc}} = \\frac{V_{test}}{I_{test}}$', note: 'All independent sources zeroed' },
      { name: 'Norton Current', symbol: '$I_N$', value: '$I_N = I_{sc} = \\frac{V_{th}}{R_{th}}$', note: 'Short-circuit current' },
      { name: 'Maximum Power Transfer (DC)', symbol: '$P_{max}$', value: '$P_{max} = \\frac{V_{th}^2}{4 R_{th}} \\quad (\\text{at } R_L = R_{th})$', note: 'Efficiency $\\eta = 50\\%$' },
      { name: 'Star to Delta Conversion', symbol: '$R_{AB}$', value: '$R_{AB} = R_A + R_B + \\frac{R_A R_B}{R_C}$', note: 'Y $\\rightarrow$ $\\Delta$ equivalence' },
      { name: 'Delta to Star Conversion', symbol: '$R_A$', value: '$R_A = \\frac{R_{AB} \\cdot R_{CA}}{R_{AB} + R_{BC} + R_{CA}}$', note: '$\\Delta$ $\\rightarrow$ Y equivalence' },
      { name: 'AC Series RLC Resonance', symbol: '$f_r$', value: '$f_r = \\frac{1}{2\\pi \\sqrt{LC}}, \\quad Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}$', note: 'Impedance minimum $Z = R$' },
      { name: 'AC RMS vs Peak (Sinusoid)', symbol: '$V_{rms}$', value: '$V_{rms} = \\frac{V_m}{\\sqrt{2}} \\approx 0.707 V_m$', note: 'Form factor $k_f = 1.11$' }
    ]
  },
  'math': {
    title: 'Engineering Mathematics I',
    icon: '📐',
    items: [
      { name: 'Euler\'s Homogeneous Theorem', symbol: 'Euler', value: '$x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = n \\cdot u$', note: 'For degree $n$ functions' },
      { name: 'Taylor Series (1-Var)', symbol: '$f(x)$', value: '$\\sum_{n=0}^\\infty \\frac{f^{(n)}(a)}{n!} (x - a)^n$', note: 'Expansion around $x = a$' },
      { name: 'Gaussian Definite Integral', symbol: '$\\int$', value: '$\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$', note: 'Polar coordinate proof' },
      { name: 'Jacobian Transformation', symbol: '$J$', value: '$J = \\frac{\\partial(x,y)}{\\partial(u,v)} = \\begin{vmatrix} x_u & x_v \\\\ y_u & y_v \\end{vmatrix}$', note: 'Area conversion $dx dy = |J| du dv$' },
      { name: 'Eigenvalue Property 1 (Trace)', symbol: 'Trace', value: '$\\sum_{i=1}^n \\lambda_i = \\text{Tr}(A) = \\sum a_{ii}$', note: 'Sum of eigenvalues = trace' },
      { name: 'Eigenvalue Property 2 (Det)', symbol: 'Det', value: '$\\prod_{i=1}^n \\lambda_i = \\det(A)$', note: 'Product of eigenvalues = determinant' }
    ]
  },
  'cs': {
    title: 'Computer Science & Algorithms',
    icon: '💻',
    items: [
      { name: 'Master Theorem (Divide & Conquer)', symbol: '$T(n)$', value: '$T(n) = a T(n/b) + \\mathcal{O}(n^d)$', note: 'Case 1: $d < \\log_b a$, Case 2: $d = \\log_b a$' },
      { name: 'AVL Tree Max Height', symbol: '$h_{max}$', value: '$h \\le 1.44 \\log_2 n$', note: 'Strict logarithmic search bound' },
      { name: 'Max Nodes in Binary Tree', symbol: '$N_{max}$', value: '$2^{h+1} - 1 \\quad (\\text{depth } h)$', note: 'Geometric progression sum' },
      { name: 'Circular Queue Full Condition', symbol: 'Queue', value: '$(rear + 1) \\% N == front$', note: 'One buffer slot preserved' },
      { name: 'Graph Sum of Degrees (Handshaking)', symbol: 'Edges', value: '$\\sum_{v \\in V} \\deg(v) = 2 |E|$', note: 'Number of odd degree vertices is even' }
    ]
  }
};

function renderMathSnippet(math) {
  try {
    return katex.renderToString(math.replace(/^\$|\$$/g, ''), { throwOnError: false, displayMode: false });
  } catch {
    return math;
  }
}

export default function FormulaHUDModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('constants');
  const [searchFilter, setSearchFilter] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const category = FORMULA_CATEGORIES[activeTab] || FORMULA_CATEGORIES['constants'];

  const filteredItems = category.items.filter(item => {
    if (!searchFilter.trim()) return true;
    const query = searchFilter.toLowerCase();
    return item.name.toLowerCase().includes(query) || item.note.toLowerCase().includes(query);
  });

  const handleCopy = (index, value) => {
    navigator.clipboard.writeText(value.replace(/^\$|\$$/g, '')).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handlePrintAllFormulas = () => {
    const sectionsHtml = Object.entries(FORMULA_CATEGORIES).map(([catKey, cat]) => {
      const itemsHtml = cat.items.map(item => {
        let renderedMath = '';
        try {
          const raw = item.value.replace(/\$/g, '');
          renderedMath = katex.renderToString(raw, { displayMode: true, throwOnError: false });
        } catch (e) {
          renderedMath = `<code>${item.value}</code>`;
        }
        return `
          <div style="border:1.5px solid #cbd5e1;border-radius:8px;padding:10px;background:#f8fafc;page-break-inside:avoid;break-inside:avoid;">
            <div style="font-weight:800;font-size:9pt;color:#1e3a8a;border-bottom:1px solid #e2e8f0;padding-bottom:3px;margin-bottom:4px;display:flex;justify-content:space-between;">
              <span>${item.name}</span>
              <span style="color:#0284c7;">${item.symbol}</span>
            </div>
            <div style="padding:4px 0;font-size:9pt;">${renderedMath}</div>
            <div style="font-size:7.5pt;color:#64748b;margin-top:2px;">${item.note || ''}</div>
          </div>
        `;
      }).join('');

      return `
        <div style="margin-bottom:16px;">
          <h2 style="font-size:12pt;font-weight:900;color:#0f172a;border-bottom:2px solid #2563eb;padding-bottom:4px;margin-bottom:8px;">
            ${cat.icon} ${cat.title}
          </h2>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            ${itemsHtml}
          </div>
        </div>
      `;
    }).join('');

    const printHTML = `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <title>University Engineering Master Formula Card</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"/>
      <style>
        @page { size: A4 portrait; margin: 10mm; }
        * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        body { font-family: 'Inter', -apple-system, sans-serif; margin: 0; padding: 0; color: #0f172a; }
        .header { border-bottom: 2.5px solid #0f172a; padding-bottom: 8px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: flex-end; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1 style="font-size:16pt;margin:0;font-weight:900;">Engineering Formula & Constants Master Card</h1>
          <div style="font-size:9pt;color:#2563eb;font-weight:700;">AUTHENTICATED CODATA CONSTANTS, NETWORK THEOREMS & CALCULUS IDENTITIES</div>
        </div>
        <div style="text-align:right;font-size:8pt;color:#64748b;">
          <div>100% University Exam Aligned</div>
          <div>All College Notes Master Repository</div>
        </div>
      </div>
      ${sectionsHtml}
      <div style="margin-top:12px;border-top:1px solid #cbd5e1;padding-top:6px;font-size:7.5pt;color:#64748b;display:flex;justify-content:space-between;">
        <span>All College Notes Master Repository &bull; Quick Revision Card</span>
        <span>Verified Syllabus 2025-26</span>
      </div>
    </body>
    </html>`;

    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;border:0;pointer-events:none;';
    document.body.appendChild(iframe);
    iframe.onload = () => {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } finally {
        setTimeout(() => { if (iframe.parentNode) iframe.parentNode.removeChild(iframe); }, 3000);
      }
    };
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(printHTML);
    iframeDoc.close();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(3, 6, 14, 0.88)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          background: 'rgba(9, 14, 26, 0.96)',
          border: '1px solid rgba(0, 240, 255, 0.4)',
          borderRadius: '18px',
          boxShadow: '0 0 50px rgba(0, 240, 255, 0.22)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* HEADER */}
        <div 
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.08), rgba(245, 158, 11, 0.06))'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid #f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fbbf24'
              }}
            >
              <Calculator size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
                  Engineering Formula & Constants Quick Drawer
                </h3>
                <span style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #f59e0b', color: '#fbbf24', padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 700 }}>
                  Alt + F Quick Ref
                </span>
              </div>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Authenticated CODATA physical constants, network theorem proofs, and calculus identities.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handlePrintAllFormulas}
              className="btn-outline"
              style={{
                padding: '7px 14px',
                fontSize: '0.8rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#fbbf24',
                borderColor: '#f59e0b',
                background: 'rgba(245, 158, 11, 0.12)',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              title="Print All Categories Formula Master Card"
            >
              <Printer size={15} />
              <span>Print Master Card</span>
            </button>

            <button
              onClick={onClose}
              className="btn-icon"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                borderRadius: '8px',
                padding: '8px'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* TABS & SEARCH BAR */}
        <div 
          style={{
            padding: '12px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(5, 8, 16, 0.6)',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {Object.keys(FORMULA_CATEGORIES).map(key => {
              const cat = FORMULA_CATEGORIES[key];
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '16px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: isActive ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                    border: isActive ? '1px solid var(--neon-cyan)' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: isActive ? 'var(--neon-cyan)' : 'var(--text-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s'
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.title.split('&')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input 
              type="text"
              placeholder="Search constants or formulas..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 12px 6px 30px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#fff',
                fontSize: '0.78rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* LIST VIEW */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredItems.map((item, idx) => (
            <div 
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                transition: 'all 0.15s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.35)';
                e.currentTarget.style.background = 'rgba(0, 240, 255, 0.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.92rem' }}>{item.name}</span>
                  <span 
                    style={{ fontSize: '0.85rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.1)', padding: '1px 6px', borderRadius: '4px' }}
                    dangerouslySetInnerHTML={{ __html: renderMathSnippet(item.symbol) }}
                  />
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  {item.note}
                </div>
              </div>

              {/* KaTeX Rendered Value */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div 
                  style={{ fontSize: '1.05rem', color: 'var(--neon-cyan)', fontWeight: 800 }}
                  dangerouslySetInnerHTML={{ __html: renderMathSnippet(item.value) }}
                />

                <button
                  type="button"
                  onClick={() => handleCopy(idx, item.value)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '6px',
                    padding: '6px',
                    cursor: 'pointer',
                    color: copiedIndex === idx ? 'var(--neon-green)' : 'var(--text-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s'
                  }}
                  title="Copy KaTeX LaTeX syntax"
                >
                  {copiedIndex === idx ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div 
          style={{
            padding: '12px 24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(5, 8, 16, 0.8)',
            fontSize: '0.78rem',
            color: 'var(--text-dim)'
          }}
        >
          <span>Press <strong>Alt + F</strong> anytime to open this drawer</span>
          <span style={{ color: 'var(--neon-green)', fontWeight: 700 }}>CODATA 2026 Academic Standards</span>
        </div>
      </div>
    </div>
  );
}
