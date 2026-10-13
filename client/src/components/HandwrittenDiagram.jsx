import React from 'react';

export default function HandwrittenDiagram({ sectionId, sectionTitle = '', sectionContent = '', themeMode = 'cyber', isHandwrittenMode = true }) {
  const isPaper = themeMode === 'paper';
  const isClean = themeMode === 'clean';
  const isLight = isPaper || isClean;

  const colors = isLight ? {
    wire: isPaper ? '#1e40af' : '#2563eb',         // Deep ballpoint / technical blue
    resistor: '#b45309',     // Amber / warm brown
    source: '#047857',       // Dark emerald
    ground: '#64748b',       // Slate grey
    text: '#0f172a',         // High-contrast slate black
    subtext: '#475569',      // Slate annotation
    highlight: isPaper ? '#b91c1c' : '#dc2626',    // Crimson red
    secondary: '#7c3aed',    // Deep purple / violet
    terminal: '#1d4ed8',     // Royal blue terminal node
    bg: '#ffffff',           // Crisp pure white sheet
    border: '#e2e8f0',       // Light crisp border
    
    // High-contrast theme-adaptive badge styles:
    badgeCyanBg: '#f0f9ff',
    badgeCyanBorder: '#38bdf8',
    badgeCyanText: '#0369a1',

    badgePurpleBg: '#faf5ff',
    badgePurpleBorder: '#c084fc',
    badgePurpleText: '#6b21a8',

    badgeAmberBg: '#fffbeb',
    badgeAmberBorder: '#f59e0b',
    badgeAmberText: '#92400e',

    badgeGreenBg: '#f0fdf4',
    badgeGreenBorder: '#4ade80',
    badgeGreenText: '#15803d',

    badgePinkBg: '#fdf2f8',
    badgePinkBorder: '#f472b6',
    badgePinkText: '#9d174d',

    timePeriod: '#b45309',   // Deep amber (high-contrast on white)
    waveform: '#0284c7',     // Crisp ocean blue
    formulaBg: '#f8fafc',
    formulaBorder: '#cbd5e1'
  } : {
    wire: '#00f0ff',         // Electric neon cyan
    resistor: '#f59e0b',     // Glowing amber
    source: '#10b981',       // Glowing emerald
    ground: '#94a3b8',       // Neon slate
    text: '#fef08a',         // Electric yellow
    subtext: '#cbd5e1',      // Cyber muted text
    highlight: '#ec4899',    // Neon pink
    secondary: '#a855f7',    // Neon purple
    terminal: '#00f0ff',     // Cyan node
    bg: 'rgba(10, 15, 29, 0.95)', // Dark space terminal
    border: 'rgba(0, 240, 255, 0.3)', // Glowing cyan border
    
    badgeCyanBg: 'rgba(0, 240, 255, 0.12)',
    badgeCyanBorder: '#00f0ff',
    badgeCyanText: '#a5f3fc',

    badgePurpleBg: 'rgba(168, 85, 247, 0.15)',
    badgePurpleBorder: '#a855f7',
    badgePurpleText: '#e9d5ff',

    badgeAmberBg: 'rgba(245, 158, 11, 0.15)',
    badgeAmberBorder: '#f59e0b',
    badgeAmberText: '#fef08a',

    badgeGreenBg: 'rgba(34, 197, 94, 0.15)',
    badgeGreenBorder: '#22c55e',
    badgeGreenText: '#86efac',

    badgePinkBg: 'rgba(236, 72, 153, 0.15)',
    badgePinkBorder: '#ec4899',
    badgePinkText: '#fbcfe8',

    timePeriod: '#fef08a',
    waveform: '#00f0ff',
    formulaBg: 'rgba(0, 0, 0, 0.5)',
    formulaBorder: 'rgba(255, 255, 255, 0.2)'
  };

  switch (sectionId) {
    case 'u1-s1':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Hand-Drawn Engineering Schematic</span>
            <span className="exam-tag">FIG 1.1: PRACTICAL SOURCES EQUIVALENT</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 240" className="handwritten-svg">
            <g transform="translate(20, 20)">
              <rect x="0" y="0" width="320" height="190" rx="12" fill={colors.bg} stroke={colors.border} strokeDasharray="4 4" strokeWidth="1.5" />
              <text x="160" y="28" fill={colors.highlight} textAnchor="middle" fontSize="13" fontWeight="bold">PRACTICAL VOLTAGE SOURCE</text>
              <path d="M 40 100 L 70 100" fill="none" stroke={colors.wire} strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="95" cy="100" r="24" fill="none" stroke={colors.source} strokeWidth="2.5" />
              <text x="95" y="96" fill={colors.source} textAnchor="middle" fontSize="14" fontWeight="bold">+</text>
              <text x="95" y="112" fill={colors.source} textAnchor="middle" fontSize="14" fontWeight="bold">−</text>
              <text x="95" y="145" fill={colors.text} textAnchor="middle" fontSize="12">Vs (Ideal)</text>
              <path d="M 119 100 L 145 100" fill="none" stroke={colors.wire} strokeWidth="2.5" />
              <path d="M 145 100 L 152 88 L 164 112 L 176 88 L 188 112 L 200 88 L 212 112 L 219 100" fill="none" stroke={colors.resistor} strokeWidth="2.5" strokeLinejoin="round" />
              <text x="182" y="78" fill={colors.resistor} textAnchor="middle" fontSize="12" fontWeight="bold">Rse (Series)</text>
              <path d="M 219 100 L 265 100" fill="none" stroke={colors.wire} strokeWidth="2.5" />
              <circle cx="265" cy="100" r="4" fill={colors.terminal} />
              <text x="275" y="104" fill={colors.terminal} fontSize="12" fontWeight="bold">A (+)</text>
              <path d="M 40 160 L 265 160" fill="none" stroke={colors.wire} strokeWidth="2.5" />
              <path d="M 40 100 L 40 160" fill="none" stroke={colors.wire} strokeWidth="2.5" />
              <circle cx="265" cy="160" r="4" fill={colors.terminal} />
              <text x="275" y="164" fill={colors.terminal} fontSize="12" fontWeight="bold">B (−)</text>
              <text x="160" y="180" fill={colors.subtext} textAnchor="middle" fontSize="9.5" fontStyle="italic">
                VL = Vs − (IL · Rse) → Terminal voltage drops with load
              </text>
            </g>
            <g transform="translate(380, 20)">
              <rect x="0" y="0" width="340" height="190" rx="12" fill={colors.bg} stroke={colors.border} strokeDasharray="4 4" strokeWidth="1.5" />
              <text x="170" y="28" fill={colors.secondary} textAnchor="middle" fontSize="13" fontWeight="bold">PRACTICAL CURRENT SOURCE</text>
              <circle cx="80" cy="115" r="24" fill="none" stroke={colors.source} strokeWidth="2.5" />
              <path d="M 80 128 L 80 102 M 75 108 L 80 102 L 85 108" fill="none" stroke={colors.source} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="80" y="155" fill={colors.text} textAnchor="middle" fontSize="12">Is (Ideal)</text>
              <path d="M 80 91 L 80 65 L 290 65" fill="none" stroke={colors.wire} strokeWidth="2.5" />
              <path d="M 80 139 L 80 165 L 290 165" fill="none" stroke={colors.wire} strokeWidth="2.5" />
              <path d="M 190 65 L 190 85 L 178 92 L 202 104 L 178 116 L 202 128 L 190 135 L 190 165" fill="none" stroke={colors.resistor} strokeWidth="2.5" strokeLinejoin="round" />
              <text x="228" y="118" fill={colors.resistor} textAnchor="middle" fontSize="12" fontWeight="bold">Rsh</text>
              <circle cx="290" cy="65" r="4" fill={colors.terminal} />
              <text x="305" y="70" fill={colors.terminal} fontSize="14" fontWeight="bold">A</text>
              <circle cx="290" cy="165" r="4" fill={colors.terminal} />
              <text x="305" y="170" fill={colors.terminal} fontSize="14" fontWeight="bold">B</text>
              <text x="170" y="182" fill={colors.subtext} textAnchor="middle" fontSize="9.5" fontStyle="italic">
                IL = Is − (VL / Rsh) → Shunt absorbs leakage current
              </text>
            </g>
          </svg>
        </div>
      );

    case 'u1-s2':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Hand-Drawn Engineering Schematic</span>
            <span className="exam-tag">FIG 1.2: KCL JUNCTION & KVL CLOSED MESH</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 255" className="handwritten-svg">
            <g transform="translate(30, 15)">
              <rect x="0" y="0" width="320" height="225" rx="12" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
              <text x="160" y="24" fill={colors.source} textAnchor="middle" fontSize="13" fontWeight="bold">KCL: CONSERVATION OF CHARGE</text>
              <circle cx="160" cy="95" r="7" fill={colors.terminal} />
              <text x="160" y="82" fill={colors.terminal} textAnchor="middle" fontSize="12" fontWeight="bold">Node N</text>
              <path d="M 50 48 L 155 92" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="3 3" />
              <polygon points="115,73 123,79 120,69" fill="#22c55e" />
              <text x="45" y="42" fill="#22c55e" fontSize="11" fontWeight="bold">I1 (Entering)</text>
              <path d="M 50 142 L 155 98" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="3 3" />
              <polygon points="115,117 123,111 120,121" fill="#22c55e" />
              <text x="45" y="156" fill="#22c55e" fontSize="11" fontWeight="bold">I2 (Entering)</text>
              <path d="M 165 92 L 270 48" fill="none" stroke="#ef4444" strokeWidth="2.5" />
              <polygon points="220,69 229,65 223,75" fill="#ef4444" />
              <text x="275" y="42" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="end">I3 (Leaving)</text>
              <path d="M 165 98 L 270 142" fill="none" stroke="#ef4444" strokeWidth="2.5" />
              <polygon points="220,121 229,127 223,116" fill="#ef4444" />
              <text x="275" y="156" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="end">I4 (Leaving)</text>
              <rect x="25" y="176" width="270" height="34" rx="6" fill={colors.badgeGreenBg} stroke={colors.badgeGreenBorder} strokeWidth="1" />
              <text x="160" y="198" fill={colors.badgeGreenText} textAnchor="middle" fontSize="12" fontWeight="bold">
                Σ Iᵢₙ = Σ Iₒᵤₜ ⇒ I1 + I2 = I3 + I4
              </text>
            </g>
            <g transform="translate(390, 15)">
              <rect x="0" y="0" width="320" height="225" rx="12" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
              <text x="160" y="22" fill={colors.highlight} textAnchor="middle" fontSize="13" fontWeight="bold">KVL: CONSERVATION OF ENERGY</text>
              <rect x="40" y="54" width="240" height="104" fill="none" stroke={colors.wire} strokeWidth="2" rx="4" />
              <circle cx="40" cy="106" r="16" fill={colors.bg} stroke={colors.source} strokeWidth="2" />
              <text x="40" y="102" fill={colors.source} textAnchor="middle" fontSize="11" fontWeight="bold">+</text>
              <text x="40" y="116" fill={colors.source} textAnchor="middle" fontSize="11" fontWeight="bold">−</text>
              <text x="15" y="110" fill={colors.source} fontSize="12" fontWeight="bold">E</text>
              <rect x="130" y="48" width="60" height="12" fill={colors.bg} stroke={colors.resistor} strokeWidth="2" />
              <text x="160" y="42" fill={colors.resistor} textAnchor="middle" fontSize="10.5" fontWeight="bold">R1 (−I·R1)</text>
              <rect x="274" y="86" width="12" height="40" fill={colors.bg} stroke={colors.resistor} strokeWidth="2" />
              <text x="292" y="110" fill={colors.resistor} fontSize="11" fontWeight="bold">R2</text>
              <path d="M 140 96 A 20 20 0 1 1 155 124" fill="none" stroke={colors.secondary} strokeWidth="2.5" strokeDasharray="3 3" />
              <polygon points="150,124 160,126 156,118" fill={colors.secondary} />
              <text x="160" y="111" fill={colors.secondary} textAnchor="middle" fontSize="11" fontWeight="bold">Loop I</text>
              <rect x="25" y="176" width="270" height="34" rx="6" fill={colors.badgePinkBg} stroke={colors.badgePinkBorder} strokeWidth="1" />
              <text x="160" y="198" fill={colors.badgePinkText} textAnchor="middle" fontSize="12" fontWeight="bold">
                Σ V = 0 ⇒ E − I·R1 − I·R2 = 0
              </text>
            </g>
          </svg>
        </div>
      );

    case 'u1-s3':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Hand-Drawn Engineering Schematic</span>
            <span className="exam-tag">FIG 1.3: THEVENIN, NORTON & MPTT CHARACTERISTIC</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 260" className="handwritten-svg">
            <g transform="translate(15, 20)">
              <rect x="0" y="0" width="220" height="215" rx="10" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
              <text x="110" y="24" fill={colors.terminal} textAnchor="middle" fontSize="12" fontWeight="bold">THEVENIN EQUIVALENT</text>
              <circle cx="45" cy="110" r="18" fill="none" stroke={colors.source} strokeWidth="2.5" />
              <text x="45" y="106" fill={colors.source} textAnchor="middle" fontSize="12" fontWeight="bold">+</text>
              <text x="45" y="120" fill={colors.source} textAnchor="middle" fontSize="12" fontWeight="bold">−</text>
              <text x="45" y="145" fill={colors.text} textAnchor="middle" fontSize="11">Vth</text>
              <path d="M 45 92 L 45 70 L 80 70" fill="none" stroke={colors.wire} strokeWidth="2" />
              <path d="M 80 70 L 87 60 L 97 80 L 107 60 L 117 80 L 127 60 L 137 80 L 144 70" fill="none" stroke={colors.resistor} strokeWidth="2.5" strokeLinejoin="round" />
              <text x="112" y="52" fill={colors.resistor} textAnchor="middle" fontSize="11" fontWeight="bold">Rth</text>
              <path d="M 144 70 L 185 70" fill="none" stroke={colors.wire} strokeWidth="2" />
              <circle cx="185" cy="70" r="4" fill={colors.terminal} />
              <text x="200" y="74" fill={colors.terminal} fontSize="13" fontWeight="bold">A</text>
              <path d="M 45 128 L 45 150 L 185 150" fill="none" stroke={colors.wire} strokeWidth="2" />
              <circle cx="185" cy="150" r="4" fill={colors.terminal} />
              <text x="200" y="154" fill={colors.terminal} fontSize="13" fontWeight="bold">B</text>
              <rect x="15" y="172" width="190" height="30" rx="6" fill={colors.badgeCyanBg} stroke={colors.badgeCyanBorder} strokeWidth="1" />
              <text x="110" y="192" fill={colors.badgeCyanText} textAnchor="middle" fontSize="12" fontWeight="bold">
                IL = Vth / (Rth + RL)
              </text>
            </g>
            <g transform="translate(255, 20)">
              <rect x="0" y="0" width="220" height="215" rx="10" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
              <text x="110" y="24" fill={colors.secondary} textAnchor="middle" fontSize="12" fontWeight="bold">NORTON EQUIVALENT</text>
              <circle cx="50" cy="110" r="18" fill="none" stroke={colors.source} strokeWidth="2.5" />
              <path d="M 50 120 L 50 100 M 46 105 L 50 100 L 54 105" fill="none" stroke={colors.source} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <text x="50" y="145" fill={colors.text} textAnchor="middle" fontSize="11">IN = Isc</text>
              <path d="M 50 92 L 50 70 L 185 70" fill="none" stroke={colors.wire} strokeWidth="2" />
              <path d="M 50 128 L 50 150 L 185 150" fill="none" stroke={colors.wire} strokeWidth="2" />
              <path d="M 120 70 L 120 85 L 112 92 L 128 102 L 112 112 L 128 122 L 120 130 L 120 150" fill="none" stroke={colors.resistor} strokeWidth="2.5" strokeLinejoin="round" />
              <text x="145" y="112" fill={colors.resistor} fontSize="11" fontWeight="bold">Rn=Rth</text>
              <circle cx="185" cy="70" r="4" fill={colors.terminal} />
              <text x="200" y="74" fill={colors.terminal} fontSize="13" fontWeight="bold">A</text>
              <circle cx="185" cy="150" r="4" fill={colors.terminal} />
              <text x="200" y="154" fill={colors.terminal} fontSize="13" fontWeight="bold">B</text>
              <rect x="15" y="172" width="190" height="30" rx="6" fill={colors.badgePurpleBg} stroke={colors.badgePurpleBorder} strokeWidth="1" />
              <text x="110" y="192" fill={colors.badgePurpleText} textAnchor="middle" fontSize="12" fontWeight="bold">
                Vth = IN · RN
              </text>
            </g>
            <g transform="translate(495, 20)">
              <rect x="0" y="0" width="230" height="215" rx="10" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
              <text x="115" y="24" fill={colors.resistor} textAnchor="middle" fontSize="12" fontWeight="bold">MPTT CURVE (P vs RL)</text>
              <path d="M 35 155 L 205 155 M 35 155 L 35 50" fill="none" stroke={colors.ground} strokeWidth="1.5" />
              <text x="205" y="170" fill={colors.subtext} fontSize="10">RL →</text>
              <text x="25" y="45" fill={colors.subtext} fontSize="10">PL ↑</text>
              <path d="M 35 150 Q 80 145 105 85 Q 120 60 125 60 Q 130 60 145 85 Q 170 140 200 150" fill="none" stroke="#f59e0b" strokeWidth="3" />
              <line x1="125" y1="60" x2="125" y2="155" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="125" cy="60" r="4" fill="#ef4444" />
              <text x="125" y="48" fill={colors.highlight} textAnchor="middle" fontSize="10" fontWeight="bold">Pmax = Vth²/(4Rth)</text>
              <text x="125" y="170" fill={colors.resistor} textAnchor="middle" fontSize="11" fontWeight="bold">RL = Rth</text>
              <rect x="15" y="178" width="200" height="26" rx="6" fill={colors.badgeAmberBg} stroke={colors.badgeAmberBorder} strokeWidth="1" />
              <text x="115" y="195" fill={colors.badgeAmberText} textAnchor="middle" fontSize="11" fontWeight="bold">
                Max Transfer Eff = 50%
              </text>
            </g>
          </svg>
        </div>
      );

    case 'u1-s4':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Hand-Drawn Engineering Schematic</span>
            <span className="exam-tag">FIG 1.4: SINE WAVE PARAMETERS & POWER TRIANGLE</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 240" className="handwritten-svg">
            <g transform="translate(20, 20)">
              <rect x="0" y="0" width="380" height="195" rx="10" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
              <text x="190" y="20" fill={colors.terminal} textAnchor="middle" fontSize="12" fontWeight="bold">SINUSOIDAL WAVEFORM: v(t) = Vm·sin(ωt)</text>
              <line x1="30" y1="105" x2="350" y2="105" stroke={colors.ground} strokeWidth="1.5" />
              <line x1="45" y1="35" x2="45" y2="175" stroke={colors.ground} strokeWidth="1.5" />
              <text x="350" y="120" fill={colors.subtext} fontSize="11">ωt →</text>
              <text x="45" y="38" fill={colors.subtext} fontSize="11">v(t) ↑</text>
              <path d="M 45 105 Q 115 25 185 105 Q 255 185 325 105" fill="none" stroke={colors.waveform} strokeWidth="3" strokeLinecap="round" />
              <line x1="45" y1="50" x2="115" y2="50" stroke={colors.resistor} strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="115" cy="50" r="4" fill={colors.resistor} />
              <text x="25" y="54" fill={colors.resistor} fontSize="11" fontWeight="bold">Vm</text>
              <line x1="45" y1="70" x2="330" y2="70" stroke={colors.source} strokeWidth="1" strokeDasharray="4 2" />
              <text x="255" y="65" fill={colors.source} fontSize="10" fontWeight="bold">Vrms = 0.707 Vm</text>
              <line x1="45" y1="85" x2="330" y2="85" stroke={colors.secondary} strokeWidth="1" strokeDasharray="2 2" />
              <text x="255" y="82" fill={colors.secondary} fontSize="10" fontWeight="bold">Vavg = 0.637 Vm</text>
              <line x1="45" y1="170" x2="325" y2="170" stroke={colors.timePeriod} strokeWidth="2" />
              <polygon points="45,170 54,166 54,174" fill={colors.timePeriod} />
              <polygon points="325,170 316,166 316,174" fill={colors.timePeriod} />
              <text x="185" y="164" fill={colors.timePeriod} textAnchor="middle" fontSize="12" fontWeight="bold">Time Period T = 2π / ω</text>
            </g>
            <g transform="translate(420, 20)">
              <rect x="0" y="0" width="300" height="195" rx="10" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
              <text x="150" y="24" fill={colors.highlight} textAnchor="middle" fontSize="12" fontWeight="bold">POWER TRIANGLE (AC POWER)</text>
              <line x1="45" y1="140" x2="180" y2="140" stroke={colors.source} strokeWidth="3" />
              <text x="115" y="158" fill={colors.source} textAnchor="middle" fontSize="11" fontWeight="bold">P = V·I·cosφ (Watts)</text>
              <line x1="180" y1="140" x2="180" y2="55" stroke={colors.highlight} strokeWidth="3" />
              <text x="235" y="100" fill={colors.highlight} textAnchor="middle" fontSize="10" fontWeight="bold">Q = V·I·sinφ (VAR)</text>
              <line x1="45" y1="140" x2="180" y2="55" stroke={colors.wire} strokeWidth="3.5" strokeDasharray="5 2" />
              <text x="100" y="85" fill={colors.wire} textAnchor="middle" fontSize="11" fontWeight="bold">S = V·I (VA)</text>
              <path d="M 75 140 A 30 30 0 0 0 69 125" fill="none" stroke={colors.resistor} strokeWidth="2" />
              <text x="80" y="130" fill={colors.resistor} fontSize="12" fontWeight="bold">φ</text>
              <rect x="25" y="168" width="250" height="24" rx="6" fill={colors.badgeAmberBg} stroke={colors.badgeAmberBorder} strokeWidth="1" />
              <text x="150" y="184" fill={colors.badgeAmberText} textAnchor="middle" fontSize="11" fontWeight="bold">
                Power Factor = cosφ = P / S
              </text>
            </g>
          </svg>
        </div>
      );

    case 'u1-s5':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Hand-Drawn Engineering Schematic</span>
            <span className="exam-tag">FIG 1.5: SERIES RLC RESONANCE CURVE & IMPEDANCE</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 240" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="220" rx="12" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            <g transform="translate(30, 20)">
              <text x="120" y="16" fill={colors.terminal} textAnchor="middle" fontSize="12" fontWeight="bold">SERIES RLC CIRCUIT</text>
              <rect x="0" y="44" width="240" height="110" fill="none" stroke={colors.wire} strokeWidth="2" rx="6" />
              <circle cx="0" cy="99" r="16" fill={colors.bg} stroke={colors.source} strokeWidth="2" />
              <path d="M -8 99 Q -4 94 0 99 Q 4 104 8 99" fill="none" stroke={colors.source} strokeWidth="2" />
              <text x="-25" y="104" fill={colors.source} fontSize="11" fontWeight="bold">Vs</text>
              <path d="M 40 44 L 47 34 L 57 54 L 67 34 L 77 54 L 87 34 L 94 44" fill="none" stroke={colors.resistor} strokeWidth="2" />
              <text x="67" y="30" fill={colors.resistor} textAnchor="middle" fontSize="11" fontWeight="bold">R</text>
              <path d="M 120 44 A 8 8 0 0 1 136 44 A 8 8 0 0 1 152 44 A 8 8 0 0 1 168 44" fill="none" stroke={colors.highlight} strokeWidth="2.5" />
              <text x="144" y="30" fill={colors.highlight} textAnchor="middle" fontSize="11" fontWeight="bold">L (XL)</text>
              <line x1="200" y1="36" x2="200" y2="52" stroke={colors.secondary} strokeWidth="3" />
              <line x1="208" y1="36" x2="208" y2="52" stroke={colors.secondary} strokeWidth="3" />
              <text x="204" y="30" fill={colors.secondary} textAnchor="middle" fontSize="11" fontWeight="bold">C (XC)</text>
              <rect x="10" y="120" width="220" height="26" rx="6" fill={colors.badgeCyanBg} stroke={colors.badgeCyanBorder} strokeWidth="1" />
              <text x="120" y="137" fill={colors.badgeCyanText} textAnchor="middle" fontSize="11" fontWeight="bold">
                At Resonance: XL = XC ⇒ Z = R (Min)
              </text>
            </g>
            <g transform="translate(340, 20)">
              <text x="180" y="16" fill={colors.highlight} textAnchor="middle" fontSize="12" fontWeight="bold">CURRENT vs FREQUENCY RESONANCE CURVE</text>
              <line x1="40" y1="145" x2="340" y2="145" stroke={colors.ground} strokeWidth="1.5" />
              <line x1="40" y1="145" x2="40" y2="28" stroke={colors.ground} strokeWidth="1.5" />
              <text x="340" y="160" fill={colors.subtext} fontSize="11">Frequency f →</text>
              <text x="30" y="28" fill={colors.subtext} fontSize="11">I ↑</text>
              <path d="M 60 140 Q 130 135 160 85 Q 185 40 190 40 Q 195 40 220 85 Q 250 135 320 140" fill="none" stroke="#22c55e" strokeWidth="3" />
              <line x1="190" y1="40" x2="190" y2="145" stroke={colors.resistor} strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="190" cy="40" r="4" fill={colors.resistor} />
              <text x="190" y="30" fill={colors.resistor} textAnchor="middle" fontSize="11" fontWeight="bold">Imax = V / R</text>
              <line x1="155" y1="70" x2="225" y2="70" stroke={colors.highlight} strokeWidth="1.5" strokeDasharray="2 2" />
              <text x="275" y="73" fill={colors.highlight} fontSize="10" fontWeight="bold">Imax / √2 = 0.707 Imax</text>
              <text x="155" y="158" fill={colors.subtext} fontSize="10">f1</text>
              <text x="225" y="158" fill={colors.subtext} fontSize="10">f2</text>
              <rect x="105" y="172" width="170" height="24" rx="5" fill={colors.badgeAmberBg} stroke={colors.badgeAmberBorder} strokeWidth="1" />
              <text x="190" y="188" fill={colors.badgeAmberText} textAnchor="middle" fontSize="11" fontWeight="bold">f0 = 1 / (2π√LC)</text>
            </g>
          </svg>
        </div>
      );

    case 'u2-s2':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Hand-Drawn Engineering Schematic</span>
            <span className="exam-tag">FIG 2.2: 1-PHASE TRANSFORMER CORE & EMF</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 220" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="200" rx="12" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            <g transform="translate(55, 25)">
              <rect x="60" y="20" width="160" height="140" rx="6" fill={colors.formulaBg} stroke={colors.ground} strokeWidth="3" />
              <rect x="95" y="55" width="90" height="70" rx="4" fill={colors.bg} stroke={colors.ground} strokeWidth="2.5" />
              <rect x="78" y="38" width="124" height="104" rx="4" fill="none" stroke={colors.resistor} strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="140" y="49" fill={colors.resistor} textAnchor="middle" fontSize="10.5" fontWeight="bold">Mutual Flux Φm</text>
              <g stroke={colors.resistor} strokeWidth="3.5" fill="none">
                <path d="M 40 45 L 60 45 Q 50 60 60 70 Q 50 85 60 95 Q 50 110 60 120 L 40 120" />
              </g>
              <text x="15" y="88" fill={colors.resistor} textAnchor="middle" fontSize="11" fontWeight="bold">V1 (N1)</text>
              <g stroke={colors.wire} strokeWidth="3.5" fill="none">
                <path d="M 240 50 L 220 50 Q 230 65 220 75 Q 230 90 220 100 Q 230 115 220 125 L 240 125" />
              </g>
              <text x="275" y="92" fill={colors.wire} textAnchor="middle" fontSize="11" fontWeight="bold">V2 (N2)</text>
              <text x="140" y="178" fill={colors.subtext} textAnchor="middle" fontSize="10">
                Laminated Silicon Steel Core (Reduces Eddy Current Losses)
              </text>
            </g>
            <g transform="translate(405, 30)">
              <rect x="0" y="0" width="310" height="160" rx="10" fill={colors.badgeAmberBg} stroke={colors.badgeAmberBorder} strokeWidth="1.5" />
              <text x="155" y="26" fill={colors.badgeAmberText} textAnchor="middle" fontSize="12.5" fontWeight="bold">EMF EQUATION OF TRANSFORMER</text>
              <rect x="25" y="42" width="260" height="40" rx="6" fill={colors.formulaBg} stroke={colors.badgeAmberBorder} strokeWidth="1" />
              <text x="155" y="67" fill={colors.badgeAmberText} textAnchor="middle" fontSize="14" fontWeight="bold">
                E = 4.44 · f · N · Φm
              </text>
              <text x="18" y="105" fill={colors.subtext} fontSize="9.5">• E1 / E2 = N1 / N2 = I2 / I1 = K (Turns Ratio)</text>
              <text x="18" y="125" fill={colors.subtext} fontSize="9.5">• Open Circuit (OC) Test ⇒ Core / Iron Loss (Pi)</text>
              <text x="18" y="145" fill={colors.subtext} fontSize="9.5">• Short Circuit (SC) Test ⇒ Copper Loss (Pcu)</text>
            </g>
          </svg>
        </div>
      );

    case 'u3-s1':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Hand-Drawn Engineering Schematic</span>
            <span className="exam-tag">FIG 3.1: P-N JUNCTION & V-I CHARACTERISTIC CURVE</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 245" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="225" rx="12" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            <g transform="translate(25, 30)">
              <text x="170" y="16" fill={colors.terminal} textAnchor="middle" fontSize="12" fontWeight="bold">P-N JUNCTION IN EQUILIBRIUM</text>
              <rect x="65" y="34" width="210" height="100" rx="6" fill="none" stroke={colors.wire} strokeWidth="2" />
              <rect x="65" y="34" width="75" height="100" fill={colors.badgeCyanBg} />
              <text x="102" y="84" fill={colors.badgeCyanText} textAnchor="middle" fontSize="14" fontWeight="bold">P-Type</text>
              <text x="102" y="104" fill={colors.subtext} textAnchor="middle" fontSize="9">Holes (Majority)</text>
              <rect x="140" y="34" width="60" height="100" fill={colors.badgePinkBg} stroke={colors.badgePinkBorder} strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="170" y="75" fill={colors.badgePinkText} textAnchor="middle" fontSize="9.5" fontWeight="bold">Depletion</text>
              <text x="170" y="90" fill={colors.badgePinkText} textAnchor="middle" fontSize="9.5">Layer</text>
              <text x="170" y="116" fill={colors.badgeAmberText} textAnchor="middle" fontSize="9.5" fontWeight="bold">V0 = 0.7V</text>
              <rect x="200" y="34" width="75" height="100" fill={colors.badgeGreenBg} />
              <text x="237" y="84" fill={colors.badgeGreenText} textAnchor="middle" fontSize="14" fontWeight="bold">N-Type</text>
              <text x="237" y="104" fill={colors.subtext} textAnchor="middle" fontSize="9">e⁻ (Majority)</text>
              <line x1="25" y1="84" x2="65" y2="84" stroke={colors.terminal} strokeWidth="3" />
              <text x="58" y="74" fill={colors.terminal} textAnchor="end" fontSize="10.5" fontWeight="bold">Anode (+)</text>
              <line x1="275" y1="84" x2="315" y2="84" stroke={colors.terminal} strokeWidth="3" />
              <text x="282" y="74" fill={colors.terminal} fontSize="10.5" fontWeight="bold">Cathode (−)</text>
            </g>
            <g transform="translate(390, 22)">
              <text x="160" y="14" fill={colors.highlight} textAnchor="middle" fontSize="12" fontWeight="bold">DIODE V-I CHARACTERISTIC CURVE</text>
              <line x1="20" y1="102" x2="295" y2="102" stroke={colors.ground} strokeWidth="1.5" />
              <line x1="155" y1="26" x2="155" y2="162" stroke={colors.ground} strokeWidth="1.5" />
              <text x="295" y="95" fill="#22c55e" textAnchor="end" fontSize="9.5" fontWeight="bold">+VF (V)</text>
              <text x="20" y="95" fill="#ef4444" fontSize="9.5" fontWeight="bold">−VR (V)</text>
              <text x="162" y="36" fill="#22c55e" fontSize="9.5" fontWeight="bold">+IF (mA)</text>
              <text x="162" y="158" fill="#ef4444" fontSize="9.5" fontWeight="bold">−IR (μA)</text>
              <path d="M 155 102 L 205 102 Q 220 102 230 74 L 245 30" fill="none" stroke="#22c55e" strokeWidth="3" />
              <line x1="220" y1="102" x2="220" y2="78" stroke={colors.resistor} strokeWidth="1" strokeDasharray="2 2" />
              <text x="220" y="117" fill={colors.resistor} textAnchor="middle" fontSize="9.5" fontWeight="bold">Vγ=0.7V (Si)</text>
              <path d="M 155 102 L 70 105 Q 55 107 50 132 L 45 160" fill="none" stroke="#ef4444" strokeWidth="2.5" />
              <text x="54" y="132" fill="#ef4444" fontSize="9" fontWeight="bold">Vz (Breakdown)</text>
              <rect x="20" y="172" width="280" height="24" rx="5" fill={colors.badgeAmberBg} stroke={colors.badgeAmberBorder} strokeWidth="1" />
              <text x="160" y="188" fill={colors.badgeAmberText} textAnchor="middle" fontSize="10.5" fontWeight="bold">
                Knee Voltage: Si = 0.7V | Ge = 0.3V
              </text>
            </g>
          </svg>
        </div>
      );

    case 'u3-s3':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Hand-Drawn Engineering Schematic</span>
            <span className="exam-tag">FIG 3.3: BJT CE OUTPUT CHARACTERISTICS FAMILY</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 235" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="215" rx="12" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            <g transform="translate(35, 26)">
              <text x="100" y="15" fill={colors.terminal} textAnchor="middle" fontSize="12" fontWeight="bold">NPN BJT SYMBOL</text>
              <circle cx="100" cy="82" r="34" fill="none" stroke={colors.border} strokeWidth="2" />
              <line x1="85" y1="62" x2="85" y2="102" stroke={colors.wire} strokeWidth="4" strokeLinecap="round" />
              <line x1="50" y1="82" x2="85" y2="82" stroke={colors.wire} strokeWidth="2.5" />
              <text x="38" y="87" fill={colors.terminal} fontSize="12" fontWeight="bold">B</text>
              <line x1="85" y1="69" x2="120" y2="52" stroke={colors.wire} strokeWidth="2.5" />
              <line x1="120" y1="52" x2="120" y2="34" stroke={colors.wire} strokeWidth="2.5" />
              <text x="120" y="28" fill={colors.resistor} fontSize="12" fontWeight="bold">C</text>
              <line x1="85" y1="95" x2="120" y2="112" stroke={colors.wire} strokeWidth="2.5" />
              <polygon points="112,107 120,112 110,115" fill={colors.highlight} />
              <line x1="120" y1="112" x2="120" y2="128" stroke={colors.wire} strokeWidth="2.5" />
              <text x="120" y="141" fill={colors.highlight} textAnchor="middle" fontSize="10.5" fontWeight="bold">E (Arrow Out)</text>
              <rect x="10" y="152" width="180" height="24" rx="5" fill={colors.badgePinkBg} stroke={colors.badgePinkBorder} strokeWidth="1" />
              <text x="100" y="168" fill={colors.badgePinkText} textAnchor="middle" fontSize="10.5" fontWeight="bold">
                IE = IB + IC &amp; β = α/(1−α)
              </text>
            </g>
            <g transform="translate(295, 22)">
              <text x="215" y="14" fill={colors.highlight} textAnchor="middle" fontSize="12" fontWeight="bold">CE OUTPUT CHARACTERISTICS (IC vs VCE)</text>
              <line x1="45" y1="160" x2="380" y2="160" stroke={colors.ground} strokeWidth="1.5" />
              <line x1="45" y1="160" x2="45" y2="36" stroke={colors.ground} strokeWidth="1.5" />
              <text x="380" y="175" fill={colors.subtext} textAnchor="end" fontSize="10.5">VCE (Volts) →</text>
              <text x="38" y="34" fill={colors.subtext} textAnchor="end" fontSize="10">IC (mA) ↑</text>
              <rect x="45" y="38" width="28" height="122" fill={colors.badgeCyanBg} stroke={colors.badgeCyanBorder} strokeWidth="1" />
              <text x="59" y="32" fill={colors.badgeCyanText} textAnchor="middle" fontSize="8.5" fontWeight="bold">SAT.</text>
              <path d="M 45 160 Q 70 60 345 55" fill="none" stroke="#22c55e" strokeWidth="2.5" />
              <text x="350" y="59" fill="#22c55e" fontSize="9.5" fontWeight="bold">IB = 40 μA</text>
              <path d="M 45 160 Q 70 90 345 85" fill="none" stroke={colors.wire} strokeWidth="2.5" />
              <text x="350" y="89" fill={colors.wire} fontSize="9.5" fontWeight="bold">IB = 30 μA</text>
              <path d="M 45 160 Q 70 120 345 115" fill="none" stroke={colors.resistor} strokeWidth="2.5" />
              <text x="350" y="119" fill={colors.resistor} fontSize="9.5" fontWeight="bold">IB = 20 μA</text>
              <path d="M 45 160 L 345 158" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3 3" />
              <text x="245" y="152" fill="#ef4444" fontSize="9.5" fontWeight="bold">CUTOFF REGION (IB = 0)</text>
              <text x="195" y="75" fill={colors.badgeAmberText} fontSize="11" fontWeight="bold">ACTIVE REGION (Amplifier)</text>
            </g>
          </svg>
        </div>
      );

    case 'u4-s2':
    case 'u4-s3':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Hand-Drawn Engineering Schematic</span>
            <span className="exam-tag">FIG 4.2: DE MORGAN DUALITY & LOGIC GATES</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 200" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="180" rx="12" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            <g transform="translate(30, 25)">
              <rect x="0" y="0" width="325" height="145" rx="8" fill={colors.badgeCyanBg} stroke={colors.badgeCyanBorder} strokeWidth="1.5" />
              <text x="162" y="24" fill={colors.terminal} textAnchor="middle" fontSize="13" fontWeight="bold">DE MORGAN FIRST THEOREM</text>
              <rect x="30" y="38" width="265" height="36" rx="6" fill={colors.formulaBg} stroke={colors.badgeCyanBorder} strokeWidth="1" />
              <text x="162" y="62" fill={colors.badgeCyanText} textAnchor="middle" fontSize="15" fontWeight="bold">
                (A · B)' = A' + B'
              </text>
              <text x="162" y="98" fill={colors.text} textAnchor="middle" fontSize="10.5" fontWeight="bold">
                NAND Gate ≡ Inverted-Input OR Gate (Bubbled OR)
              </text>
              <text x="162" y="125" fill={colors.subtext} textAnchor="middle" fontSize="9" fontStyle="italic">
                "Break the line across AND, change to OR with individual bars"
              </text>
            </g>
            <g transform="translate(385, 25)">
              <rect x="0" y="0" width="325" height="145" rx="8" fill={colors.badgePinkBg} stroke={colors.badgePinkBorder} strokeWidth="1.5" />
              <text x="162" y="24" fill={colors.highlight} textAnchor="middle" fontSize="13" fontWeight="bold">DE MORGAN SECOND THEOREM</text>
              <rect x="30" y="38" width="265" height="36" rx="6" fill={colors.formulaBg} stroke={colors.badgePinkBorder} strokeWidth="1" />
              <text x="162" y="62" fill={colors.badgePinkText} textAnchor="middle" fontSize="15" fontWeight="bold">
                (A + B)' = A' · B'
              </text>
              <text x="162" y="98" fill={colors.text} textAnchor="middle" fontSize="10.5" fontWeight="bold">
                NOR Gate ≡ Inverted-Input AND Gate (Bubbled AND)
              </text>
              <text x="162" y="125" fill={colors.subtext} textAnchor="middle" fontSize="9" fontStyle="italic">
                "Break the line across OR, change to AND with individual bars"
              </text>
            </g>
          </svg>
        </div>
      );
    
        case 'aiml-u1-s1':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ AI Taxonomy Schematic</span>
            <span className="exam-tag">FIG 1.1: AI vs ML vs DEEP LEARNING HIERARCHY</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 260" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="240" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* Outer Box: Artificial Intelligence */}
            <rect x="40" y="30" width="660" height="200" rx="12" fill="rgba(0, 240, 255, 0.05)" stroke={colors.wire} strokeWidth="2" strokeDasharray="5 5" />
            <text x="60" y="55" fill={colors.wire} fontSize="14" fontWeight="900" letterSpacing="1px">ARTIFICIAL INTELLIGENCE (AI)</text>
            <text x="60" y="72" fill={colors.subtext} fontSize="10.5">Machines performing tasks requiring human-like intelligence &amp; reasoning (John McCarthy, 1956)</text>
            
            {/* Middle Box: Machine Learning */}
            <rect x="180" y="85" width="500" height="135" rx="10" fill="rgba(245, 158, 11, 0.07)" stroke={colors.resistor} strokeWidth="2" />
            <text x="200" y="108" fill={colors.resistor} fontSize="13" fontWeight="900" letterSpacing="1px">MACHINE LEARNING (ML)</text>
            <text x="200" y="123" fill={colors.subtext} fontSize="9.2">Statistical algorithms learning patterns from Experience (E, T, P) without explicit coding</text>
            
            {/* Inner Box: Deep Learning */}
            <rect x="350" y="135" width="310" height="75" rx="8" fill="rgba(236, 72, 153, 0.1)" stroke={colors.highlight} strokeWidth="2" />
            <text x="365" y="160" fill={colors.highlight} fontSize="13" fontWeight="900" letterSpacing="1px">DEEP LEARNING (DL)</text>
            <text x="365" y="177" fill={colors.text} fontSize="11" fontWeight="bold">Multi-layer ANNs, Transformers &amp; LLMs</text>
            <text x="365" y="195" fill={colors.subtext} fontSize="10">Self-attention, CNNs, Generative AI (GPT-4, Gemini)</text>
          </svg>
        </div>
      );

    case 'aiml-u1-s2':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Intelligent Agent Architecture</span>
            <span className="exam-tag">FIG 1.2: AGENT-ENVIRONMENT INTERACTION LOOP</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 240" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="220" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* Environment Box */}
            <rect x="40" y="30" width="660" height="45" rx="8" fill="rgba(16, 185, 129, 0.12)" stroke={colors.source} strokeWidth="2" />
            <text x="370" y="58" fill={colors.source} textAnchor="middle" fontSize="14" fontWeight="bold" letterSpacing="1.5px">ENVIRONMENT (Task Context: Roads / Hospital / Web)</text>
            
            {/* Sensors Box */}
            <rect x="90" y="115" width="160" height="42" rx="8" fill={colors.bg} stroke={colors.wire} strokeWidth="2" />
            <text x="170" y="141" fill={colors.wire} textAnchor="middle" fontSize="13" fontWeight="bold">SENSORS</text>
            
            {/* Agent Brain Box */}
            <rect x="290" y="100" width="160" height="75" rx="10" fill="rgba(168, 85, 247, 0.12)" stroke={colors.secondary} strokeWidth="2.5" />
            <text x="370" y="128" fill={colors.secondary} textAnchor="middle" fontSize="13" fontWeight="bold">AGENT FUNCTION</text>
            <text x="370" y="148" fill={colors.text} textAnchor="middle" fontSize="12" fontWeight="bold">f: P* → A</text>
            <text x="370" y="165" fill={colors.subtext} textAnchor="middle" fontSize="10">Percept Sequence to Action</text>

            {/* Actuators Box */}
            <rect x="490" y="115" width="160" height="42" rx="8" fill={colors.bg} stroke={colors.resistor} strokeWidth="2" />
            <text x="570" y="141" fill={colors.resistor} textAnchor="middle" fontSize="13" fontWeight="bold">ACTUATORS</text>
            
            {/* Arrows */}
            {/* Environment to Sensors */}
            <line x1="170" y1="75" x2="170" y2="115" stroke={colors.wire} strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="135" y="98" fill={colors.wire} fontSize="11" fontWeight="bold">Percepts</text>

            {/* Sensors to Agent */}
            <line x1="250" y1="136" x2="290" y2="136" stroke={colors.text} strokeWidth="2" />
            
            {/* Agent to Actuators */}
            <line x1="450" y1="136" x2="490" y2="136" stroke={colors.text} strokeWidth="2" />

            {/* Actuators to Environment */}
            <line x1="570" y1="115" x2="570" y2="75" stroke={colors.resistor} strokeWidth="2.5" />
            <text x="585" y="98" fill={colors.resistor} fontSize="11" fontWeight="bold">Actions</text>
          </svg>
        </div>
      );

    case 'aiml-u2-s2':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Heuristic Search Graph</span>
            <span className="exam-tag">FIG 2.2: A* SEARCH GRAPH & OPTIMAL PATH S → B → D → G</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 240" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="220" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* Nodes: S(80, 110), A(220, 55), B(220, 165), C(380, 55), D(380, 165), E(520, 190), G(640, 110) */}
            {/* Edges */}
            {/* S -> A */}
            <line x1="95" y1="100" x2="205" y2="65" stroke={colors.subtext} strokeWidth="1.5" />
            <text x="145" y="75" fill={colors.subtext} fontSize="11">c=2</text>

            {/* S -> B (OPTIMAL) */}
            <line x1="95" y1="120" x2="205" y2="155" stroke={colors.source} strokeWidth="3.5" />
            <text x="140" y="152" fill={colors.source} fontSize="12" fontWeight="bold">c=4 ★</text>

            {/* A -> C */}
            <line x1="235" y1="55" x2="365" y2="55" stroke={colors.subtext} strokeWidth="1.5" />
            <text x="300" y="45" fill={colors.subtext} fontSize="11">c=4</text>

            {/* A -> D */}
            <line x1="230" y1="65" x2="365" y2="155" stroke={colors.subtext} strokeWidth="1.5" />
            <text x="290" y="100" fill={colors.subtext} fontSize="11">c=7</text>

            {/* B -> D (OPTIMAL) */}
            <line x1="235" y1="165" x2="365" y2="165" stroke={colors.source} strokeWidth="3.5" />
            <text x="300" y="158" fill={colors.source} fontSize="12" fontWeight="bold">c=3 ★</text>

            {/* B -> E */}
            <line x1="235" y1="175" x2="505" y2="190" stroke={colors.subtext} strokeWidth="1.5" />
            <text x="320" y="198" fill={colors.subtext} fontSize="11">c=5</text>

            {/* C -> G */}
            <line x1="395" y1="65" x2="625" y2="105" stroke={colors.subtext} strokeWidth="1.5" />
            <text x="510" y="75" fill={colors.subtext} fontSize="11">c=5</text>

            {/* D -> G (OPTIMAL) */}
            <line x1="395" y1="155" x2="625" y2="115" stroke={colors.source} strokeWidth="3.5" />
            <text x="510" y="145" fill={colors.source} fontSize="12" fontWeight="bold">c=3 ★</text>

            {/* E -> G */}
            <line x1="535" y1="185" x2="625" y2="125" stroke={colors.subtext} strokeWidth="1.5" />
            <text x="585" y="170" fill={colors.subtext} fontSize="11">c=4</text>

            {/* Node S */}
            <circle cx="80" cy="110" r="20" fill={colors.bg} stroke={colors.wire} strokeWidth="2.5" />
            <text x="80" y="115" fill={colors.wire} textAnchor="middle" fontSize="13" fontWeight="bold">S</text>
            <text x="80" y="145" fill={colors.subtext} textAnchor="middle" fontSize="10">h=8</text>

            {/* Node A */}
            <circle cx="220" cy="55" r="18" fill={colors.bg} stroke={colors.terminal} strokeWidth="2" />
            <text x="220" y="60" fill={colors.text} textAnchor="middle" fontSize="12" fontWeight="bold">A</text>
            <text x="220" y="28" fill={colors.subtext} textAnchor="middle" fontSize="10">h=6</text>

            {/* Node B (Optimal Path) */}
            <circle cx="220" cy="165" r="20" fill="rgba(16,185,129,0.15)" stroke={colors.source} strokeWidth="3" />
            <text x="220" y="170" fill={colors.source} textAnchor="middle" fontSize="13" fontWeight="bold">B</text>
            <text x="220" y="200" fill={colors.source} textAnchor="middle" fontSize="10" fontWeight="bold">h=5</text>

            {/* Node C */}
            <circle cx="380" cy="55" r="18" fill={colors.bg} stroke={colors.terminal} strokeWidth="2" />
            <text x="380" y="60" fill={colors.text} textAnchor="middle" fontSize="12" fontWeight="bold">C</text>
            <text x="380" y="28" fill={colors.subtext} textAnchor="middle" fontSize="10">h=4</text>

            {/* Node D (Optimal Path) */}
            <circle cx="380" cy="165" r="20" fill="rgba(16,185,129,0.15)" stroke={colors.source} strokeWidth="3" />
            <text x="380" y="170" fill={colors.source} textAnchor="middle" fontSize="13" fontWeight="bold">D</text>
            <text x="380" y="200" fill={colors.source} textAnchor="middle" fontSize="10" fontWeight="bold">h=2</text>

            {/* Node E */}
            <circle cx="520" cy="190" r="18" fill={colors.bg} stroke={colors.terminal} strokeWidth="2" />
            <text x="520" y="195" fill={colors.text} textAnchor="middle" fontSize="12" fontWeight="bold">E</text>
            <text x="520" y="222" fill={colors.subtext} textAnchor="middle" fontSize="10">h=3</text>

            {/* Node G (Goal) */}
            <circle cx="640" cy="110" r="22" fill="rgba(245,158,11,0.2)" stroke={colors.resistor} strokeWidth="3" />
            <text x="640" y="115" fill={colors.resistor} textAnchor="middle" fontSize="14" fontWeight="bold">GOAL G</text>
            <text x="640" y="145" fill={colors.resistor} textAnchor="middle" fontSize="10" fontWeight="bold">h=0 | Cost=10</text>
          </svg>
        </div>
      );

    case 'aiml-u3-s1':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Expert System Architecture</span>
            <span className="exam-tag">FIG 3.1: EXPERT SYSTEM 5-BLOCK ARCHITECTURE</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 230" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="210" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* Knowledge Base */}
            <rect x="35" y="30" width="190" height="75" rx="8" fill="rgba(0,240,255,0.08)" stroke={colors.wire} strokeWidth="2" />
            <text x="130" y="55" fill={colors.wire} textAnchor="middle" fontSize="13" fontWeight="bold">KNOWLEDGE BASE</text>
            <text x="130" y="75" fill={colors.text} textAnchor="middle" fontSize="11">• Domain Heuristics</text>
            <text x="130" y="92" fill={colors.subtext} textAnchor="middle" fontSize="10">• IF-THEN Production Rules</text>

            {/* Inference Engine */}
            <rect x="275" y="30" width="190" height="75" rx="8" fill="rgba(245,158,11,0.1)" stroke={colors.resistor} strokeWidth="2.5" />
            <text x="370" y="55" fill={colors.resistor} textAnchor="middle" fontSize="13" fontWeight="bold">INFERENCE ENGINE</text>
            <text x="370" y="75" fill={colors.text} textAnchor="middle" fontSize="11">• Forward Chaining</text>
            <text x="370" y="92" fill={colors.subtext} textAnchor="middle" fontSize="10">• Backward Chaining</text>

            {/* Working Memory */}
            <rect x="515" y="30" width="190" height="75" rx="8" fill="rgba(16,185,129,0.08)" stroke={colors.source} strokeWidth="2" />
            <text x="610" y="55" fill={colors.source} textAnchor="middle" fontSize="13" fontWeight="bold">WORKING MEMORY</text>
            <text x="610" y="75" fill={colors.text} textAnchor="middle" fontSize="11">• Active Case Facts</text>
            <text x="610" y="92" fill={colors.subtext} textAnchor="middle" fontSize="10">• Session Percepts</text>

            {/* Explanation Facility */}
            <rect x="200" y="130" width="340" height="40" rx="8" fill="rgba(168,85,247,0.1)" stroke={colors.secondary} strokeWidth="2" />
            <text x="370" y="155" fill={colors.secondary} textAnchor="middle" fontSize="12" fontWeight="bold">EXPLANATION FACILITY (HOW / WHY Traces)</text>

            {/* User Interface */}
            <rect x="250" y="185" width="240" height="28" rx="6" fill={colors.bg} stroke={colors.highlight} strokeWidth="1.5" />
            <text x="370" y="204" fill={colors.highlight} textAnchor="middle" fontSize="11" fontWeight="bold">USER INTERFACE ↔ END USER CONSULTATION</text>
            
            {/* Connecting lines */}
            <line x1="225" y1="67" x2="275" y2="67" stroke={colors.text} strokeWidth="2" />
            <line x1="465" y1="67" x2="515" y2="67" stroke={colors.text} strokeWidth="2" />
            <line x1="370" y1="105" x2="370" y2="130" stroke={colors.text} strokeWidth="2" />
            <line x1="370" y1="170" x2="370" y2="185" stroke={colors.text} strokeWidth="2" />
          </svg>
        </div>
      );

    case 'aiml-u4-s2':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Supervised Learning Classifier</span>
            <span className="exam-tag">FIG 4.1: SUPPORT VECTOR MACHINE (SVM) MAXIMUM MARGIN</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 240" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="220" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* Hyperplane w^T x + b = 0 */}
            <line x1="160" y1="210" x2="580" y2="30" stroke={colors.wire} strokeWidth="3" />
            <text x="595" y="40" fill={colors.wire} fontSize="12" fontWeight="bold">wᵀx + b = 0 (Decision Boundary)</text>

            {/* Positive Margin w^T x + b = +1 */}
            <line x1="210" y1="215" x2="630" y2="35" stroke={colors.source} strokeWidth="1.8" strokeDasharray="5 5" />
            <text x="640" y="60" fill={colors.source} fontSize="11">wᵀx + b = +1</text>

            {/* Negative Margin w^T x + b = -1 */}
            <line x1="110" y1="205" x2="530" y2="25" stroke={colors.highlight} strokeWidth="1.8" strokeDasharray="5 5" />
            <text x="510" y="22" fill={colors.highlight} fontSize="11">wᵀx + b = -1</text>

            {/* Margin Width Arrow */}
            <line x1="330" y1="140" x2="390" y2="105" stroke={colors.resistor} strokeWidth="2" />
            <text x="310" y="115" fill={colors.resistor} fontSize="12" fontWeight="bold">Margin = 2 / ||w||</text>

            {/* Class +1 points */}
            <circle cx="480" cy="140" r="7" fill={colors.source} />
            <circle cx="550" cy="120" r="7" fill={colors.source} />
            <circle cx="520" cy="170" r="7" fill={colors.source} />
            <circle cx="610" cy="150" r="7" fill={colors.source} />
            {/* Support Vector on margin */}
            <circle cx="435" cy="115" r="9" fill="none" stroke={colors.source} strokeWidth="2.5" />
            <text x="445" y="105" fill={colors.source} fontSize="10" fontWeight="bold">Support Vector (+1)</text>

            {/* Class -1 points */}
            <circle cx="230" cy="90" r="7" fill={colors.highlight} />
            <circle cx="280" cy="60" r="7" fill={colors.highlight} />
            <circle cx="180" cy="110" r="7" fill={colors.highlight} />
            {/* Support Vector on negative margin */}
            <circle cx="305" cy="120" r="9" fill="none" stroke={colors.highlight} strokeWidth="2.5" />
            <text x="210" y="145" fill={colors.highlight} fontSize="10" fontWeight="bold">Support Vector (-1)</text>
          </svg>
        </div>
      );

    
    /* =========================================================================
       MATHEMATICS I (BMAT-001) - 16 OFFICIAL SVG ENGINEERING DIAGRAMS
       ========================================================================= */

    // Unit I, Section 1: Matrix Rank & Normal Form Transformation
    case 'm1-u1-s1':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Linear Algebra Transformation Schematic</span>
            <span className="exam-tag">FIG 1.1: MATRIX RANK & REDUCTION TO NORMAL FORM</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 240" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="220" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* Box 1: Arbitrary Matrix A */}
            <rect x="30" y="45" width="180" height="135" rx="10" fill="rgba(0, 240, 255, 0.06)" stroke={colors.wire} strokeWidth="2" />
            <text x="120" y="75" fill={colors.wire} textAnchor="middle" fontSize="13" fontWeight="900">ORIGINAL MATRIX A</text>
            <text x="120" y="98" fill={colors.text} textAnchor="middle" fontSize="12" fontWeight="bold">Size: m × n</text>
            <text x="120" y="125" fill={colors.subtext} textAnchor="middle" fontSize="11">Row Vectors R₁, R₂, ..., Rₘ</text>
            <text x="120" y="145" fill={colors.subtext} textAnchor="middle" fontSize="11">Col Vectors C₁, C₂, ..., Cₙ</text>
            <text x="120" y="165" fill={colors.highlight} textAnchor="middle" fontSize="10" fontWeight="bold">Contains Linear Dependencies</text>

            {/* Arrow 1 */}
            <path d="M 215 112 L 265 112" stroke={colors.wire} strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="240" y="102" fill={colors.wire} textAnchor="middle" fontSize="10" fontWeight="bold">Row Ops</text>
            <text x="240" y="128" fill={colors.subtext} textAnchor="middle" fontSize="9">Echelon Form</text>

            {/* Box 2: Echelon Form */}
            <rect x="275" y="45" width="190" height="135" rx="10" fill="rgba(245, 158, 11, 0.08)" stroke={colors.resistor} strokeWidth="2" />
            <text x="370" y="75" fill={colors.resistor} textAnchor="middle" fontSize="13" fontWeight="900">ROW ECHELON FORM</text>
            {/* Staircase Graphic */}
            <path d="M 305 95 L 340 95 L 340 120 L 385 120 L 385 145 L 435 145" fill="none" stroke={colors.resistor} strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="320" cy="95" r="4" fill={colors.resistor} />
            <text x="320" y="90" fill={colors.resistor} textAnchor="middle" fontSize="9" fontWeight="bold">Pivot 1</text>
            <circle cx="360" cy="120" r="4" fill={colors.resistor} />
            <text x="360" y="115" fill={colors.resistor} textAnchor="middle" fontSize="9" fontWeight="bold">Pivot 2</text>
            <circle cx="410" cy="145" r="4" fill={colors.resistor} />
            <text x="410" y="140" fill={colors.resistor} textAnchor="middle" fontSize="9" fontWeight="bold">Pivot r</text>
            <text x="370" y="168" fill={colors.text} textAnchor="middle" fontSize="10" fontWeight="bold">Zeros below pivots</text>

            {/* Arrow 2 */}
            <path d="M 470 112 L 520 112" stroke={colors.source} strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="495" y="102" fill={colors.source} textAnchor="middle" fontSize="10" fontWeight="bold">Col Ops</text>
            <text x="495" y="128" fill={colors.subtext} textAnchor="middle" fontSize="9">Normalize</text>

            {/* Box 3: Normal Form */}
            <rect x="530" y="45" width="180" height="135" rx="10" fill="rgba(16, 185, 129, 0.1)" stroke={colors.source} strokeWidth="2" />
            <text x="620" y="75" fill={colors.source} textAnchor="middle" fontSize="13" fontWeight="900">NORMAL FORM</text>
            <rect x="560" y="90" width="55" height="40" rx="4" fill={colors.source} fillOpacity="0.2" stroke={colors.source} strokeWidth="1.5" />
            <text x="587" y="115" fill={colors.source} textAnchor="middle" fontSize="14" fontWeight="bold">Iᵣ</text>
            <text x="655" y="115" fill={colors.subtext} textAnchor="middle" fontSize="14">0</text>
            <text x="587" y="150" fill={colors.subtext} textAnchor="middle" fontSize="14">0</text>
            <text x="655" y="150" fill={colors.subtext} textAnchor="middle" fontSize="14">0</text>
            
            {/* Rank Result Ribbon */}
            <rect x="165" y="195" width="410" height="28" rx="14" fill={colors.source} fillOpacity="0.15" stroke={colors.source} strokeWidth="1.5" />
            <text x="370" y="214" fill={colors.source} textAnchor="middle" fontSize="11" fontWeight="bold">
              ★ RANK: ρ(A) = r (Order of Non-Zero Identity Block Iᵣ)
            </text>
          </svg>
        </div>
      );

    // Unit I, Section 2: Gauss-Jordan Method for Matrix Inversion
    case 'm1-u1-s2':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Algorithm Flowchart & Pipeline</span>
            <span className="exam-tag">FIG 1.2: GAUSS-JORDAN INVERSION PIPELINE [A | I] ~ [I | A⁻¹]</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 250" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="230" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* Step 1: Input */}
            <rect x="30" y="40" width="140" height="65" rx="8" fill="rgba(0, 240, 255, 0.08)" stroke={colors.wire} strokeWidth="2" />
            <text x="100" y="65" fill={colors.wire} textAnchor="middle" fontSize="12" fontWeight="bold">STEP 1: AUGMENT</text>
            <text x="100" y="85" fill={colors.text} textAnchor="middle" fontSize="13" fontWeight="bold">[ A | Iₙ ]</text>
            <text x="100" y="98" fill={colors.subtext} textAnchor="middle" fontSize="9">Size: n × 2n</text>

            {/* Arrow 1 */}
            <line x1="170" y1="72" x2="210" y2="72" stroke={colors.text} strokeWidth="2" />
            <polygon points="210,72 202,68 202,76" fill={colors.text} />

            {/* Step 2: Pivot 1 */}
            <rect x="215" y="40" width="150" height="65" rx="8" fill="rgba(245, 158, 11, 0.08)" stroke={colors.resistor} strokeWidth="2" />
            <text x="290" y="62" fill={colors.resistor} textAnchor="middle" fontSize="11" fontWeight="bold">STEP 2: COL 1 PIVOT</text>
            <text x="290" y="80" fill={colors.text} textAnchor="middle" fontSize="11">R₁ → R₁ / a₁₁</text>
            <text x="290" y="96" fill={colors.subtext} textAnchor="middle" fontSize="10">Make a₂₁, a₃₁ = 0</text>

            {/* Arrow 2 */}
            <line x1="365" y1="72" x2="405" y2="72" stroke={colors.text} strokeWidth="2" />
            <polygon points="405,72 397,68 397,76" fill={colors.text} />

            {/* Step 3: Successive Pivots */}
            <rect x="410" y="40" width="160" height="65" rx="8" fill="rgba(168, 85, 247, 0.1)" stroke={colors.secondary} strokeWidth="2" />
            <text x="490" y="62" fill={colors.secondary} textAnchor="middle" fontSize="11" fontWeight="bold">STEP 3: DIAGONALIZE</text>
            <text x="490" y="80" fill={colors.text} textAnchor="middle" fontSize="11">Eliminate Above &</text>
            <text x="490" y="96" fill={colors.text} textAnchor="middle" fontSize="11">Below Remaining Pivots</text>

            {/* Arrow 3 */}
            <line x1="570" y1="72" x2="605" y2="72" stroke={colors.text} strokeWidth="2" />
            <polygon points="605,72 597,68 597,76" fill={colors.text} />

            {/* Step 4: Output */}
            <rect x="610" y="35" width="105" height="75" rx="10" fill="rgba(16, 185, 129, 0.15)" stroke={colors.source} strokeWidth="2.5" />
            <text x="662" y="60" fill={colors.source} textAnchor="middle" fontSize="11" fontWeight="bold">STEP 4</text>
            <text x="662" y="80" fill={colors.source} textAnchor="middle" fontSize="14" fontWeight="900">[ Iₙ | A⁻¹ ]</text>
            <text x="662" y="98" fill={colors.source} textAnchor="middle" fontSize="10" fontWeight="bold">Inverse Found!</text>

            {/* Bottom Row: Detailed Example Matrix Partition Visual */}
            <rect x="30" y="130" width="680" height="90" rx="10" fill={colors.bg} stroke={colors.border} strokeWidth="1" strokeDasharray="4 4" />
            <text x="50" y="155" fill={colors.highlight} fontSize="12" fontWeight="bold">EXAM NOTEBOOK WORKING TRACE (2×2 SOLVED EXAMPLE):</text>
            
            <g transform="translate(45, 165)">
              <text x="0" y="20" fill={colors.text} fontSize="10.5" fontFamily="monospace">[ 1  2 | 1  0 ]</text>
              <text x="0" y="38" fill={colors.text} fontSize="10.5" fontFamily="monospace">[ 3  4 | 0  1 ]</text>

              <text x="125" y="30" fill={colors.wire} fontSize="11" fontWeight="bold">⎯ R₂→R₂−3R₁ →</text>

              <text x="260" y="20" fill={colors.text} fontSize="10.5" fontFamily="monospace">[ 1  2 |  1  0 ]</text>
              <text x="260" y="38" fill={colors.text} fontSize="10.5" fontFamily="monospace">[ 0 -2 | -3  1 ]</text>

              <text x="395" y="30" fill={colors.source} fontSize="11" fontWeight="bold">⎯ Norm &amp; Clear →</text>

              <text x="520" y="20" fill={colors.source} fontSize="10.5" fontWeight="bold" fontFamily="monospace">[ 1 0 | -2   1  ]</text>
              <text x="520" y="38" fill={colors.source} fontSize="10.5" fontWeight="bold" fontFamily="monospace">[ 0 1 | 1.5 -0.5]</text>
            </g>
          </svg>
        </div>
      );

    // Unit I, Section 3: Consistency of System of Linear Equations AX = B
    case 'm1-u1-s3':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Rouché–Capelli Consistency Decision Tree</span>
            <span className="exam-tag">FIG 1.3: CLASSIFICATION OF LINEAR SYSTEMS AX = B</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 250" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="230" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* Root: System AX = B */}
            <rect x="250" y="25" width="240" height="42" rx="8" fill="rgba(0, 240, 255, 0.1)" stroke={colors.wire} strokeWidth="2" />
            <text x="370" y="51" fill={colors.wire} textAnchor="middle" fontSize="13" fontWeight="900">SYSTEM AX = B (n unknowns)</text>

            {/* Split Lines */}
            <line x1="300" y1="67" x2="160" y2="105" stroke={colors.text} strokeWidth="2" />
            <line x1="440" y1="67" x2="520" y2="105" stroke={colors.text} strokeWidth="2" />

            {/* Left Branch: Inconsistent */}
            <rect x="70" y="105" width="200" height="40" rx="8" fill="rgba(239, 68, 68, 0.12)" stroke={colors.highlight} strokeWidth="2" />
            <text x="170" y="130" fill={colors.highlight} textAnchor="middle" fontSize="12" fontWeight="bold">ρ(A) ≠ ρ([A | B])</text>

            <line x1="170" y1="145" x2="170" y2="170" stroke={colors.highlight} strokeWidth="2" />
            <rect x="50" y="170" width="240" height="55" rx="8" fill="rgba(239, 68, 68, 0.06)" stroke={colors.highlight} strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="170" y="192" fill={colors.highlight} textAnchor="middle" fontSize="13" fontWeight="900">INCONSISTENT</text>
            <text x="170" y="210" fill={colors.subtext} textAnchor="middle" fontSize="11">NO SOLUTION (Parallel Hyperplanes)</text>

            {/* Right Branch: Consistent */}
            <rect x="420" y="105" width="200" height="40" rx="8" fill="rgba(16, 185, 129, 0.12)" stroke={colors.source} strokeWidth="2" />
            <text x="520" y="130" fill={colors.source} textAnchor="middle" fontSize="12" fontWeight="bold">ρ(A) = ρ([A | B]) = r</text>

            {/* Sub-split from Consistent */}
            <line x1="470" y1="145" x2="410" y2="170" stroke={colors.source} strokeWidth="1.5" />
            <line x1="570" y1="145" x2="620" y2="170" stroke={colors.source} strokeWidth="1.5" />

            {/* Case 1: Unique */}
            <rect x="320" y="170" width="180" height="55" rx="8" fill="rgba(16, 185, 129, 0.08)" stroke={colors.source} strokeWidth="1.5" />
            <text x="410" y="192" fill={colors.source} textAnchor="middle" fontSize="12" fontWeight="bold">r = n (Full Rank)</text>
            <text x="410" y="212" fill={colors.text} textAnchor="middle" fontSize="11" fontWeight="bold">UNIQUE SOLUTION ★</text>

            {/* Case 2: Infinite */}
            <rect x="520" y="170" width="190" height="55" rx="8" fill="rgba(245, 158, 11, 0.08)" stroke={colors.resistor} strokeWidth="1.5" />
            <text x="615" y="192" fill={colors.resistor} textAnchor="middle" fontSize="12" fontWeight="bold">r &lt; n (Rank Deficit)</text>
            <text x="615" y="212" fill={colors.text} textAnchor="middle" fontSize="10" fontWeight="bold">INFINITE SOL. ((n-r) free vars)</text>
          </svg>
        </div>
      );

    // Unit I, Section 4: Eigenvalues & Cayley-Hamilton
    case 'm1-u1-s4':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Geometric Eigen-Action & Cayley-Hamilton</span>
            <span className="exam-tag">FIG 1.4: EIGENVECTOR TRANSFORMATION & INVERSE FORMULA</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 240" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="220" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* Left Box: Geometric Eigenvector Action */}
            <g transform="translate(30, 30)">
              <rect x="0" y="0" width="330" height="180" rx="10" fill={colors.bg} stroke={colors.wire} strokeWidth="1.5" />
              <text x="165" y="24" fill={colors.wire} textAnchor="middle" fontSize="12" fontWeight="bold">EIGENVECTOR SCALING: A·X = λ·X</text>
              
              {/* Axes */}
              <line x1="30" y1="140" x2="300" y2="140" stroke={colors.border} strokeWidth="1.5" />
              <line x1="60" y1="160" x2="60" y2="35" stroke={colors.border} strokeWidth="1.5" />
              
              {/* Eigenvector line */}
              <line x1="60" y1="140" x2="260" y2="50" stroke={colors.subtext} strokeWidth="1" strokeDasharray="3 3" />
              
              {/* Original Vector X */}
              <line x1="60" y1="140" x2="140" y2="104" stroke={colors.wire} strokeWidth="3" markerEnd="url(#arrow)" />
              <text x="125" y="98" fill={colors.wire} fontSize="11" fontWeight="bold">X (Eigenvector)</text>

              {/* Transformed Vector AX = lambda X */}
              <line x1="60" y1="140" x2="230" y2="63" stroke={colors.source} strokeWidth="3" markerEnd="url(#arrow)" />
              <text x="180" y="54" fill={colors.source} fontSize="11" fontWeight="900">A·X = λ·X (Scaled!)</text>

              {/* Non-eigenvector showing rotation */}
              <line x1="60" y1="140" x2="160" y2="145" stroke={colors.highlight} strokeWidth="1.5" strokeDasharray="2 2" />
              <text x="165" y="158" fill={colors.highlight} fontSize="9">Non-eigenvectors rotate off-axis</text>
            </g>

            {/* Right Box: Cayley-Hamilton Applications */}
            <g transform="translate(380, 30)">
              <rect x="0" y="0" width="330" height="180" rx="10" fill={colors.bg} stroke={colors.resistor} strokeWidth="1.5" />
              <text x="165" y="24" fill={colors.resistor} textAnchor="middle" fontSize="12" fontWeight="bold">CAYLEY-HAMILTON THEOREM ENGINE</text>
              
              <rect x="20" y="40" width="290" height="36" rx="6" fill="rgba(245, 158, 11, 0.1)" stroke={colors.resistor} strokeWidth="1" />
              <text x="165" y="63" fill={colors.text} textAnchor="middle" fontSize="11" fontWeight="bold">
                Every Matrix Satisfies: |A − λI| = 0
              </text>

              {/* Application Formula 1: Inverse */}
              <rect x="20" y="85" width="290" height="38" rx="6" fill="rgba(16, 185, 129, 0.1)" stroke={colors.source} strokeWidth="1" />
              <text x="165" y="103" fill={colors.source} textAnchor="middle" fontSize="11" fontWeight="bold">1. Matrix Inverse Shortcut:</text>
              <text x="165" y="117" fill={colors.text} textAnchor="middle" fontSize="10">A⁻¹ = −(1/c₀) · [ Aⁿ⁻¹ + cₙ₋₁Aⁿ⁻² + ... + c₁I ]</text>

              {/* Application Formula 2: Powers */}
              <rect x="20" y="130" width="290" height="38" rx="6" fill="rgba(168, 85, 247, 0.1)" stroke={colors.secondary} strokeWidth="1" />
              <text x="165" y="148" fill={colors.secondary} textAnchor="middle" fontSize="11" fontWeight="bold">2. High Matrix Powers (A⁴, A⁸):</text>
              <text x="165" y="162" fill={colors.text} textAnchor="middle" fontSize="10">A² = 5I ⟹ A⁴ = (A²)² = (5I)² = 25I</text>
            </g>
          </svg>
        </div>
      );

    // Unit II, Section 1: Rolle's & Mean Value Theorems
    case 'm1-u2-s1':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Geometric Calculus Visualization</span>
            <span className="exam-tag">FIG 2.1: ROLLE'S & LAGRANGE'S MEAN VALUE THEOREMS</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 240" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="220" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* Panel 1: Rolle's Theorem */}
            <g transform="translate(30, 25)">
              <rect x="0" y="0" width="330" height="190" rx="10" fill={colors.bg} stroke={colors.border} strokeWidth="1" />
              <text x="165" y="25" fill={colors.wire} textAnchor="middle" fontSize="13" fontWeight="bold">ROLLE'S THEOREM: f'(c) = 0</text>
              
              {/* Axes */}
              <line x1="20" y1="160" x2="310" y2="160" stroke={colors.border} strokeWidth="1.5" />
              <line x1="40" y1="170" x2="40" y2="35" stroke={colors.border} strokeWidth="1.5" />

              {/* Curve y = f(x) with peak */}
              <path d="M 60 160 Q 160 50 260 160" fill="none" stroke={colors.wire} strokeWidth="2.5" />
              
              {/* End points a and b */}
              <circle cx="60" cy="160" r="4" fill={colors.wire} />
              <text x="60" y="178" fill={colors.subtext} textAnchor="middle" fontSize="11">a (f(a)=0)</text>
              
              <circle cx="260" cy="160" r="4" fill={colors.wire} />
              <text x="260" y="178" fill={colors.subtext} textAnchor="middle" fontSize="11">b (f(b)=0)</text>

              {/* Point c with horizontal tangent */}
              <circle cx="160" cy="105" r="5" fill={colors.highlight} />
              <line x1="100" y1="105" x2="220" y2="105" stroke={colors.highlight} strokeWidth="2" strokeDasharray="4 3" />
              <line x1="160" y1="105" x2="160" y2="160" stroke={colors.subtext} strokeWidth="1" strokeDasharray="2 2" />
              <text x="160" y="178" fill={colors.highlight} textAnchor="middle" fontSize="12" fontWeight="bold">c</text>
              <text x="160" y="95" fill={colors.highlight} textAnchor="middle" fontSize="11" fontWeight="bold">Horizontal Tangent: f'(c) = 0</text>
            </g>

            {/* Panel 2: Lagrange's MVT */}
            <g transform="translate(380, 25)">
              <rect x="0" y="0" width="330" height="190" rx="10" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
              <text x="165" y="25" fill={colors.resistor} textAnchor="middle" fontSize="13" fontWeight="bold">LAGRANGE'S MVT: PARALLEL TANGENT</text>
              
              {/* Axes */}
              <line x1="20" y1="160" x2="310" y2="160" stroke={colors.border} strokeWidth="1.5" />
              <line x1="40" y1="170" x2="40" y2="35" stroke={colors.border} strokeWidth="1.5" />

              {/* Curve */}
              <path d="M 60 140 Q 150 50 270 70" fill="none" stroke={colors.resistor} strokeWidth="2.5" />
              
              {/* Secant line joining A and B */}
              <circle cx="60" cy="140" r="4" fill={colors.text} />
              <text x="50" y="130" fill={colors.text} fontSize="10">A(a, f(a))</text>
              <circle cx="270" cy="70" r="4" fill={colors.text} />
              <text x="260" y="60" fill={colors.text} fontSize="10">B(b, f(b))</text>
              <line x1="60" y1="140" x2="270" y2="70" stroke={colors.text} strokeWidth="1.5" strokeDasharray="4 3" />

              {/* Tangent at c parallel to secant */}
              <circle cx="150" cy="80" r="5" fill={colors.source} />
              <line x1="80" y1="103" x2="220" y2="57" stroke={colors.source} strokeWidth="2.5" />
              <text x="175" y="98" fill={colors.source} fontSize="11" fontWeight="bold">Tangent // Chord</text>
              <text x="165" y="180" fill={colors.source} textAnchor="middle" fontSize="11" fontWeight="bold">
                f'(c) = [f(b) − f(a)] / (b − a)
              </text>
            </g>
          </svg>
        </div>
      );

    // Unit II, Section 2: Taylor's & Maclaurin's Theorems with Remainders
    case 'm1-u2-s2':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Polynomial Approximation Convergence</span>
            <span className="exam-tag">FIG 2.2: TAYLOR & MACLAURIN POLYNOMIAL FITTING</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 240" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="220" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* Graph: f(x) vs P1(x) vs P2(x) */}
            <g transform="translate(40, 30)">
              {/* Axes */}
              <line x1="30" y1="150" x2="380" y2="150" stroke={colors.border} strokeWidth="1.5" />
              <line x1="80" y1="170" x2="80" y2="15" stroke={colors.border} strokeWidth="1.5" />
              <text x="375" y="145" fill={colors.subtext} fontSize="11">x</text>
              <text x="85" y="25" fill={colors.subtext} fontSize="11">y</text>

              {/* Exact Curve f(x) = e^x */}
              <path d="M 40 145 Q 160 140 240 80 T 320 20" fill="none" stroke={colors.text} strokeWidth="3" />
              <text x="325" y="30" fill={colors.text} fontSize="12" fontWeight="bold">Exact: f(x)</text>

              {/* Expansion Point a */}
              <circle cx="160" cy="132" r="5" fill={colors.highlight} />
              <line x1="160" y1="132" x2="160" y2="150" stroke={colors.highlight} strokeWidth="1" strokeDasharray="2 2" />
              <text x="160" y="165" fill={colors.highlight} textAnchor="middle" fontSize="11" fontWeight="bold">x = a</text>

              {/* Tangent Line P1(x) */}
              <line x1="70" y1="155" x2="245" y2="108" stroke={colors.wire} strokeWidth="2" strokeDasharray="4 2" />
              <text x="250" y="112" fill={colors.wire} fontSize="9">P₁(x) = f(a) + f'(a)(x−a)</text>

              {/* Parabola P2(x) */}
              <path d="M 80 152 Q 160 132 245 68" fill="none" stroke={colors.source} strokeWidth="2" />
              <text x="250" y="70" fill={colors.source} fontSize="9" fontWeight="bold">P₂(x) = P₁ + f''(a)/2!(x−a)²</text>
            </g>

            {/* Right Card: Remainder Formulas */}
            <g transform="translate(460, 35)">
              <rect x="0" y="0" width="250" height="170" rx="10" fill={colors.bg} stroke={colors.resistor} strokeWidth="1.5" />
              <text x="125" y="26" fill={colors.resistor} textAnchor="middle" fontSize="12" fontWeight="bold">EXAM REMAINDER FORMS</text>
              
              <rect x="15" y="42" width="220" height="50" rx="6" fill="rgba(245, 158, 11, 0.08)" stroke={colors.border} strokeWidth="1" />
              <text x="25" y="60" fill={colors.highlight} fontSize="10" fontWeight="bold">Lagrange's Form:</text>
              <text x="25" y="80" fill={colors.text} fontSize="10">Rₙ = [hⁿ / n!] · fⁿ(a + θh)</text>

              <rect x="15" y="102" width="220" height="50" rx="6" fill="rgba(0, 240, 255, 0.08)" stroke={colors.border} strokeWidth="1" />
              <text x="25" y="120" fill={colors.wire} fontSize="10" fontWeight="bold">Cauchy's Form:</text>
              <text x="25" y="140" fill={colors.text} fontSize="9">Rₙ = [hⁿ(1−θ)ⁿ⁻¹/(n−1)!]·fⁿ(a+θh)</text>
            </g>
          </svg>
        </div>
      );

    // Unit II, Section 3: Curvature & Centre of Curvature
    case 'm1-u2-s3':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Differential Geometry Schematic</span>
            <span className="exam-tag">FIG 2.3: CURVATURE, RADIUS ρ & OSCULATING CIRCLE</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 260" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="240" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* Curve C */}
            <path d="M 50 200 Q 220 220 360 120 T 680 40" fill="none" stroke={colors.text} strokeWidth="3" />
            <text x="685" y="50" fill={colors.text} fontSize="12" fontWeight="bold">Curve C: y = f(x)</text>

            {/* Point P on curve */}
            <circle cx="280" cy="160" r="5" fill={colors.highlight} />
            <text x="270" y="180" fill={colors.highlight} fontSize="12" fontWeight="bold">P(x, y)</text>

            {/* Tangent line at P */}
            <line x1="170" y1="200" x2="390" y2="120" stroke={colors.wire} strokeWidth="2" strokeDasharray="4 2" />
            <text x="395" y="125" fill={colors.wire} fontSize="11">Tangent (ψ)</text>

            {/* Normal line pointing toward center */}
            <line x1="280" y1="160" x2="210" y2="50" stroke={colors.source} strokeWidth="2.5" />
            <text x="255" y="105" fill={colors.source} fontSize="11" fontWeight="bold">Radius ρ</text>

            {/* Centre of Curvature C(alpha, beta) */}
            <circle cx="210" cy="50" r="6" fill={colors.resistor} />
            <text x="210" y="38" fill={colors.resistor} textAnchor="middle" fontSize="12" fontWeight="900">Centre C(α, β)</text>

            {/* Osculating Circle */}
            <circle cx="210" cy="50" r="130" fill="rgba(16, 185, 129, 0.08)" stroke={colors.source} strokeWidth="2" strokeDasharray="5 4" />
            <text x="100" y="70" fill={colors.source} fontSize="11" fontWeight="bold">OSCULATING CIRCLE</text>

            {/* Formula Box Bottom-Right */}
            <g transform="translate(420, 140)">
              <rect x="0" y="0" width="290" height="90" rx="8" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
              <text x="145" y="22" fill={colors.highlight} textAnchor="middle" fontSize="11" fontWeight="bold">RADIUS OF CURVATURE FORMULA:</text>
              <text x="145" y="45" fill={colors.text} textAnchor="middle" fontSize="12" fontWeight="bold">
                ρ = [ 1 + (y₁)² ]^(3/2) / y₂
              </text>
              <text x="145" y="66" fill={colors.subtext} textAnchor="middle" fontSize="10">
                α = x − [ y₁(1 + y₁²) / y₂ ]
              </text>
              <text x="145" y="80" fill={colors.subtext} textAnchor="middle" fontSize="10">
                β = y + [ (1 + y₁²) / y₂ ]
              </text>
            </g>
          </svg>
        </div>
      );

    // Unit II, Section 4: Indeterminate Forms & L'Hôpital's Rule
    case 'm1-u2-s4':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Limits Resolution Strategy Map</span>
            <span className="exam-tag">FIG 2.4: 7 INDETERMINATE FORMS & L'HÔPITAL WORKFLOW</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 250" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="230" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* Center: Input Limit */}
            <rect x="250" y="25" width="240" height="45" rx="8" fill="rgba(0, 240, 255, 0.1)" stroke={colors.wire} strokeWidth="2" />
            <text x="370" y="52" fill={colors.wire} textAnchor="middle" fontSize="13" fontWeight="bold">LIMIT: lim x→a [ f(x) / g(x) ]</text>

            {/* Direct Forms: 0/0 and inf/inf */}
            <rect x="40" y="100" width="180" height="60" rx="8" fill="rgba(16, 185, 129, 0.12)" stroke={colors.source} strokeWidth="2" />
            <text x="130" y="122" fill={colors.source} textAnchor="middle" fontSize="12" fontWeight="bold">DIRECT QUOTIENTS</text>
            <text x="130" y="142" fill={colors.text} textAnchor="middle" fontSize="13" fontWeight="bold">0 / 0   or   ∞ / ∞</text>

            <path d="M 130 160 L 130 185" stroke={colors.source} strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="30" y="185" width="200" height="42" rx="6" fill={colors.bg} stroke={colors.source} strokeWidth="1.5" />
            <text x="130" y="210" fill={colors.source} textAnchor="middle" fontSize="11" fontWeight="bold">L'Hôpital: lim f'(x) / g'(x)</text>

            {/* Products & Differences: 0 * inf and inf - inf */}
            <rect x="270" y="100" width="200" height="60" rx="8" fill="rgba(245, 158, 11, 0.12)" stroke={colors.resistor} strokeWidth="2" />
            <text x="370" y="122" fill={colors.resistor} textAnchor="middle" fontSize="12" fontWeight="bold">ALGEBRAIC CONVERSIONS</text>
            <text x="370" y="142" fill={colors.text} textAnchor="middle" fontSize="13" fontWeight="bold">0 · ∞   or   ∞ − ∞</text>

            <path d="M 370 160 L 370 185" stroke={colors.resistor} strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="260" y="185" width="220" height="42" rx="6" fill={colors.bg} stroke={colors.resistor} strokeWidth="1.5" />
            <text x="370" y="210" fill={colors.resistor} textAnchor="middle" fontSize="11" fontWeight="bold">Rewrite f·g = f / (1/g) ⟹ 0/0</text>

            {/* Exponential Forms: 1^inf, 0^0, inf^0 */}
            <rect x="515" y="100" width="190" height="60" rx="8" fill="rgba(236, 72, 153, 0.12)" stroke={colors.highlight} strokeWidth="2" />
            <text x="610" y="122" fill={colors.highlight} textAnchor="middle" fontSize="12" fontWeight="bold">EXPONENTIAL FORMS</text>
            <text x="610" y="142" fill={colors.text} textAnchor="middle" fontSize="13" fontWeight="bold">1^∞ ,  0⁰ ,  ∞⁰</text>

            <path d="M 610 160 L 610 185" stroke={colors.highlight} strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="500" y="185" width="220" height="42" rx="6" fill={colors.bg} stroke={colors.highlight} strokeWidth="1.5" />
            <text x="610" y="210" fill={colors.highlight} textAnchor="middle" fontSize="11" fontWeight="bold">Take ln: ln(y) = g(x) ln f(x)</text>
          </svg>
        </div>
      );

    // Unit III, Section 1: Partial Differentiation
    case 'm1-u3-s1':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ 3D Multivariable Geometry</span>
            <span className="exam-tag">FIG 3.1: 3D SURFACE SLICING & PARTIAL DERIVATIVES</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 250" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="230" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* 3D Coordinate Axes */}
            <g transform="translate(60, 40)">
              <line x1="50" y1="160" x2="350" y2="160" stroke={colors.border} strokeWidth="1.5" />
              <text x="355" y="165" fill={colors.subtext} fontSize="11">y</text>
              <line x1="50" y1="160" x2="50" y2="20" stroke={colors.border} strokeWidth="1.5" />
              <text x="50" y="15" fill={colors.subtext} fontSize="11">z</text>
              <line x1="50" y1="160" x2="10" y2="195" stroke={colors.border} strokeWidth="1.5" />
              <text x="5" y="205" fill={colors.subtext} fontSize="11">x</text>

              {/* Surface z = f(x, y) */}
              <path d="M 80 130 Q 180 50 320 80 Q 280 150 140 160 Z" fill="rgba(0, 240, 255, 0.08)" stroke={colors.wire} strokeWidth="2" />
              <text x="210" y="70" fill={colors.wire} fontSize="12" fontWeight="bold">Surface z = f(x, y)</text>

              {/* Slice along y = y0 (x-direction) */}
              <path d="M 90 145 Q 160 90 270 110" fill="none" stroke={colors.highlight} strokeWidth="2.5" />
              <text x="120" y="110" fill={colors.highlight} fontSize="10" fontWeight="bold">Slope = ∂z/∂x (y const)</text>

              {/* Slice along x = x0 (y-direction) */}
              <path d="M 170 85 Q 200 120 230 155" fill="none" stroke={colors.source} strokeWidth="2.5" />
              <text x="225" y="135" fill={colors.source} fontSize="10" fontWeight="bold">Slope = ∂z/∂y (x const)</text>
            </g>

            {/* Right Card: Clairaut's Theorem on Mixed Partials */}
            <g transform="translate(460, 45)">
              <rect x="0" y="0" width="250" height="155" rx="10" fill={colors.bg} stroke={colors.resistor} strokeWidth="1.5" />
              <text x="125" y="25" fill={colors.resistor} textAnchor="middle" fontSize="12" fontWeight="bold">CLAIRAUT'S THEOREM</text>
              <rect x="15" y="40" width="220" height="42" rx="6" fill="rgba(245, 158, 11, 0.1)" stroke={colors.border} strokeWidth="1" />
              <text x="125" y="65" fill={colors.text} textAnchor="middle" fontSize="13" fontWeight="bold">∂²u / (∂x ∂y) = ∂²u / (∂y ∂x)</text>
              <text x="125" y="105" fill={colors.subtext} textAnchor="middle" fontSize="10">Order of differentiation</text>
              <text x="125" y="120" fill={colors.subtext} textAnchor="middle" fontSize="10">does not matter if partial</text>
              <text x="125" y="135" fill={colors.source} textAnchor="middle" fontSize="10" fontWeight="bold">derivatives are continuous!</text>
            </g>
          </svg>
        </div>
      );

    // Unit III, Section 2: Euler's Theorem on Homogeneous Functions
    case 'm1-u3-s2':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Scaling Geometry & Degree Analysis</span>
            <span className="exam-tag">FIG 3.2: EULER'S THEOREM FOR HOMOGENEOUS FUNCTIONS</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 240" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="220" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* Left Diagram: Homogeneous Scaling */}
            <g transform="translate(40, 30)">
              <rect x="0" y="0" width="320" height="165" rx="10" fill={colors.bg} stroke={colors.wire} strokeWidth="1.5" />
              <text x="160" y="24" fill={colors.wire} textAnchor="middle" fontSize="12" fontWeight="bold">HOMOGENEOUS SCALING BY FACTOR t</text>

              {/* Ray from origin */}
              <line x1="30" y1="125" x2="280" y2="40" stroke={colors.border} strokeWidth="1.5" />
              <circle cx="30" cy="125" r="4" fill={colors.text} />
              <text x="35" y="116" fill={colors.text} fontSize="9.5">Origin (0,0)</text>

              {/* Base point (x, y) */}
              <circle cx="115" cy="96" r="5" fill={colors.source} />
              <text x="105" y="86" fill={colors.source} fontSize="10.5" fontWeight="bold">P(x, y) ⟹ u</text>

              {/* Scaled point (tx, ty) */}
              <circle cx="215" cy="62" r="5" fill={colors.highlight} />
              <text x="200" y="52" fill={colors.highlight} fontSize="10.5" fontWeight="bold">P'(tx, ty) ⟹ tⁿ · u</text>

              <text x="160" y="150" fill={colors.text} textAnchor="middle" fontSize="10.5">
                Degree n = Power of scaling factor t
              </text>
            </g>

            {/* Right Card: Master Exam Formulas */}
            <g transform="translate(390, 30)">
              <rect x="0" y="0" width="310" height="165" rx="10" fill={colors.bg} stroke={colors.resistor} strokeWidth="1.5" />
              <text x="155" y="24" fill={colors.resistor} textAnchor="middle" fontSize="12" fontWeight="bold">EULER'S EXAM FORMULAE (10 MARKS)</text>
              
              <rect x="15" y="40" width="280" height="48" rx="6" fill="rgba(16, 185, 129, 0.1)" stroke={colors.source} strokeWidth="1" />
              <text x="25" y="58" fill={colors.source} fontSize="11" fontWeight="bold">1st Order Euler's Relation:</text>
              <text x="25" y="77" fill={colors.text} fontSize="12" fontWeight="bold">x·(∂u/∂x) + y·(∂u/∂y) = n · u</text>

              <rect x="15" y="100" width="280" height="52" rx="6" fill="rgba(236, 72, 153, 0.1)" stroke={colors.highlight} strokeWidth="1" />
              <text x="25" y="118" fill={colors.highlight} fontSize="11" fontWeight="bold">2nd Order Extension:</text>
              <text x="25" y="138" fill={colors.text} fontSize="11" fontWeight="bold">x²uₓₓ + 2xy uₓᵧ + y²uᵧᵧ = n(n−1) u</text>
            </g>
          </svg>
        </div>
      );

    // Unit III, Section 3: Total Derivative & Jacobians
    case 'm1-u3-s3':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Chain Rule Tree & Coordinate Transformation</span>
            <span className="exam-tag">FIG 3.3: TOTAL DERIVATIVE TREE & JACOBIAN AREA MAPPING</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 250" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="230" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* Left Panel: Chain Rule Dependency Tree */}
            <g transform="translate(40, 25)">
              <rect x="0" y="0" width="320" height="180" rx="10" fill={colors.bg} stroke={colors.wire} strokeWidth="1.5" />
              <text x="160" y="24" fill={colors.wire} textAnchor="middle" fontSize="12" fontWeight="bold">TOTAL DERIVATIVE CHAIN TREE</text>

              {/* Top Node: u */}
              <circle cx="160" cy="55" r="16" fill="rgba(0, 240, 255, 0.15)" stroke={colors.wire} strokeWidth="2" />
              <text x="160" y="60" fill={colors.wire} textAnchor="middle" fontSize="14" fontWeight="bold">u</text>

              {/* Mid Nodes: x and y */}
              <circle cx="90" cy="115" r="14" fill="rgba(245, 158, 11, 0.15)" stroke={colors.resistor} strokeWidth="2" />
              <text x="90" y="120" fill={colors.resistor} textAnchor="middle" fontSize="13" fontWeight="bold">x</text>

              <circle cx="230" cy="115" r="14" fill="rgba(245, 158, 11, 0.15)" stroke={colors.resistor} strokeWidth="2" />
              <text x="230" y="120" fill={colors.resistor} textAnchor="middle" fontSize="13" fontWeight="bold">y</text>

              {/* Bottom Node: t */}
              <circle cx="160" cy="165" r="12" fill="rgba(16, 185, 129, 0.15)" stroke={colors.source} strokeWidth="2" />
              <text x="160" y="170" fill={colors.source} textAnchor="middle" fontSize="12" fontWeight="bold">t</text>

              {/* Tree Branches */}
              <line x1="148" y1="67" x2="100" y2="103" stroke={colors.text} strokeWidth="1.5" />
              <text x="110" y="80" fill={colors.subtext} fontSize="10">∂u/∂x</text>

              <line x1="172" y1="67" x2="220" y2="103" stroke={colors.text} strokeWidth="1.5" />
              <text x="205" y="80" fill={colors.subtext} fontSize="10">∂u/∂y</text>

              <line x1="90" y1="130" x2="150" y2="160" stroke={colors.text} strokeWidth="1.5" />
              <text x="110" y="152" fill={colors.subtext} fontSize="10">dx/dt</text>

              <line x1="230" y1="130" x2="170" y2="160" stroke={colors.text} strokeWidth="1.5" />
              <text x="205" y="152" fill={colors.subtext} fontSize="10">dy/dt</text>
            </g>

            {/* Right Panel: Jacobian Area Transformation */}
            <g transform="translate(390, 25)">
              <rect x="0" y="0" width="310" height="180" rx="10" fill={colors.bg} stroke={colors.source} strokeWidth="1.5" />
              <text x="155" y="24" fill={colors.source} textAnchor="middle" fontSize="12" fontWeight="bold">JACOBIAN COORDINATE TRANSFORMATION</text>

              {/* Area dx dy */}
              <rect x="30" y="60" width="50" height="50" fill="rgba(0, 240, 255, 0.2)" stroke={colors.wire} strokeWidth="1.5" />
              <text x="55" y="90" fill={colors.wire} textAnchor="middle" fontSize="10" fontWeight="bold">dx dy</text>

              {/* Mapping Arrow */}
              <line x1="95" y1="85" x2="155" y2="85" stroke={colors.text} strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="125" y="78" fill={colors.text} textAnchor="middle" fontSize="10">J(u, v)</text>

              {/* Skewed Parallelogram du dv */}
              <polygon points="175,95 215,65 255,80 215,110" fill="rgba(16, 185, 129, 0.2)" stroke={colors.source} strokeWidth="1.5" />
              <text x="215" y="92" fill={colors.source} textAnchor="middle" fontSize="10" fontWeight="bold">du dv</text>

              {/* Determinant Box */}
              <rect x="20" y="125" width="270" height="42" rx="6" fill={colors.bg} stroke={colors.border} strokeWidth="1" />
              <text x="155" y="150" fill={colors.highlight} textAnchor="middle" fontSize="11" fontWeight="bold">
                J = ∂(u, v) / ∂(x, y) = uₓ · vᵧ − uᵧ · vₓ
              </text>
            </g>
          </svg>
        </div>
      );

    // Unit III, Section 4: Vector Differentiation (Grad, Div, Curl)
    case 'm1-u3-s4':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Vector Field Operator Anatomy</span>
            <span className="exam-tag">FIG 3.4: GRADIENT ∇φ, DIVERGENCE ∇·F & CURL ∇×F</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 240" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="220" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* 1. Gradient Panel */}
            <g transform="translate(30, 25)">
              <rect x="0" y="0" width="210" height="180" rx="10" fill={colors.bg} stroke={colors.wire} strokeWidth="1.5" />
              <text x="105" y="24" fill={colors.wire} textAnchor="middle" fontSize="12" fontWeight="bold">1. GRADIENT: ∇φ</text>
              {/* Contour Curves */}
              <path d="M 20 140 Q 105 130 190 140" fill="none" stroke={colors.subtext} strokeWidth="1" />
              <text x="195" y="142" fill={colors.subtext} fontSize="8">φ=10</text>
              <path d="M 20 100 Q 105 90 190 100" fill="none" stroke={colors.subtext} strokeWidth="1" />
              <text x="195" y="102" fill={colors.subtext} fontSize="8">φ=20</text>
              <path d="M 20 60 Q 105 50 190 60" fill="none" stroke={colors.subtext} strokeWidth="1" />
              <text x="195" y="62" fill={colors.subtext} fontSize="8">φ=30</text>
              
              {/* Perpendicular Arrows */}
              <line x1="105" y1="130" x2="105" y2="55" stroke={colors.wire} strokeWidth="3" markerEnd="url(#arrow)" />
              <text x="105" y="165" fill={colors.wire} textAnchor="middle" fontSize="10" fontWeight="bold">Normal to Contours</text>
              <text x="105" y="177" fill={colors.subtext} textAnchor="middle" fontSize="9">Max rate of increase</text>
            </g>

            {/* 2. Divergence Panel */}
            <g transform="translate(265, 25)">
              <rect x="0" y="0" width="210" height="180" rx="10" fill={colors.bg} stroke={colors.source} strokeWidth="1.5" />
              <text x="105" y="24" fill={colors.source} textAnchor="middle" fontSize="12" fontWeight="bold">2. DIVERGENCE: ∇·F</text>
              
              {/* Source Node (+div) */}
              <circle cx="105" cy="95" r="14" fill="rgba(16, 185, 129, 0.2)" stroke={colors.source} strokeWidth="2" />
              <text x="105" y="99" fill={colors.source} textAnchor="middle" fontSize="10" fontWeight="bold">+div</text>

              {/* Outward arrows */}
              <line x1="105" y1="75" x2="105" y2="45" stroke={colors.source} strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="105" y1="115" x2="105" y2="145" stroke={colors.source} strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="85" y1="95" x2="55" y2="95" stroke={colors.source} strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="125" y1="95" x2="155" y2="95" stroke={colors.source} strokeWidth="2" markerEnd="url(#arrow)" />

              <text x="105" y="165" fill={colors.source} textAnchor="middle" fontSize="10" fontWeight="bold">Net Outward Flux</text>
              <text x="105" y="177" fill={colors.subtext} textAnchor="middle" fontSize="9">∇·F = 0 ⟹ Solenoidal</text>
            </g>

            {/* 3. Curl Panel */}
            <g transform="translate(500, 25)">
              <rect x="0" y="0" width="210" height="180" rx="10" fill={colors.bg} stroke={colors.highlight} strokeWidth="1.5" />
              <text x="105" y="24" fill={colors.highlight} textAnchor="middle" fontSize="12" fontWeight="bold">3. CURL: ∇×F</text>
              
              {/* Vortex Swirl */}
              <path d="M 65 95 A 40 40 0 1 1 145 95 A 40 40 0 0 1 68 105" fill="none" stroke={colors.highlight} strokeWidth="2.5" />
              <polygon points="65,108 68,98 76,105" fill={colors.highlight} />

              {/* Rotation Axis */}
              <line x1="105" y1="95" x2="105" y2="45" stroke={colors.resistor} strokeWidth="2.5" markerEnd="url(#arrow)" />
              <text x="110" y="45" fill={colors.resistor} fontSize="10" fontWeight="bold">Axis ω</text>

              <text x="105" y="165" fill={colors.highlight} textAnchor="middle" fontSize="10" fontWeight="bold">Fluid Circulation / Vortex</text>
              <text x="105" y="177" fill={colors.subtext} textAnchor="middle" fontSize="9">∇×F = 0 ⟹ Irrotational</text>
            </g>
          </svg>
        </div>
      );

    // Unit IV, Section 1: Infinite Series & Convergence Tests Roadmap
    case 'm1-u4-s1':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Infinite Series Decision Flowchart</span>
            <span className="exam-tag">FIG 4.1: CONVERGENCE TESTS SELECTION ROADMAP</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 250" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="230" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* Root: Infinite Series sum(uₙ) */}
            <rect x="250" y="25" width="240" height="42" rx="8" fill="rgba(0, 240, 255, 0.1)" stroke={colors.wire} strokeWidth="2" />
            <text x="370" y="51" fill={colors.wire} textAnchor="middle" fontSize="13" fontWeight="bold">GIVEN SERIES: Σ uₙ</text>

            {/* Test 1: n-th term limit */}
            <line x1="300" y1="67" x2="150" y2="95" stroke={colors.text} strokeWidth="1.5" />
            <line x1="440" y1="67" x2="520" y2="95" stroke={colors.text} strokeWidth="1.5" />

            {/* Left: Divergence Test */}
            <rect x="60" y="95" width="180" height="48" rx="8" fill="rgba(239, 68, 68, 0.1)" stroke={colors.highlight} strokeWidth="1.5" />
            <text x="150" y="115" fill={colors.highlight} textAnchor="middle" fontSize="11" fontWeight="bold">lim (uₙ) ≠ 0</text>
            <text x="150" y="132" fill={colors.highlight} textAnchor="middle" fontSize="12" fontWeight="900">DIVERGES IMMEDIATELY!</text>

            {/* Right: lim uₙ = 0 */}
            <rect x="405" y="95" width="230" height="40" rx="8" fill="rgba(16, 185, 129, 0.1)" stroke={colors.source} strokeWidth="1.5" />
            <text x="520" y="120" fill={colors.source} textAnchor="middle" fontSize="10.5" fontWeight="bold">lim (uₙ) = 0 (Apply specific test)</text>

            {/* Split from specific test: Ratio vs Root vs p-Series */}
            <line x1="450" y1="135" x2="330" y2="165" stroke={colors.source} strokeWidth="1.5" />
            <line x1="520" y1="135" x2="520" y2="165" stroke={colors.source} strokeWidth="1.5" />
            <line x1="590" y1="135" x2="650" y2="165" stroke={colors.source} strokeWidth="1.5" />

            {/* Ratio Test */}
            <rect x="240" y="165" width="165" height="60" rx="6" fill={colors.bg} stroke={colors.resistor} strokeWidth="1.5" />
            <text x="322" y="185" fill={colors.resistor} textAnchor="middle" fontSize="11" fontWeight="bold">D'Alembert Ratio Test:</text>
            <text x="322" y="200" fill={colors.text} textAnchor="middle" fontSize="10">lim |uₙ₊₁ / uₙ| = L</text>
            <text x="322" y="215" fill={colors.source} textAnchor="middle" fontSize="9" fontWeight="bold">L&lt;1 Conv | L&gt;1 Div</text>

            {/* Root Test */}
            <rect x="420" y="165" width="165" height="60" rx="6" fill={colors.bg} stroke={colors.secondary} strokeWidth="1.5" />
            <text x="502" y="185" fill={colors.secondary} textAnchor="middle" fontSize="11" fontWeight="bold">Cauchy's Root Test:</text>
            <text x="502" y="200" fill={colors.text} textAnchor="middle" fontSize="10">lim (uₙ)^(1/n) = L</text>
            <text x="502" y="215" fill={colors.source} textAnchor="middle" fontSize="9" fontWeight="bold">L&lt;1 Conv | L&gt;1 Div</text>

            {/* p-Series Test */}
            <rect x="600" y="165" width="120" height="60" rx="6" fill={colors.bg} stroke={colors.wire} strokeWidth="1.5" />
            <text x="660" y="185" fill={colors.wire} textAnchor="middle" fontSize="11" fontWeight="bold">p-Series:</text>
            <text x="660" y="200" fill={colors.text} textAnchor="middle" fontSize="10">Σ 1 / n^p</text>
            <text x="660" y="215" fill={colors.source} textAnchor="middle" fontSize="9" fontWeight="bold">p&gt;1 Conv | p≤1 Div</text>
          </svg>
        </div>
      );

    // Unit IV, Section 2: Alternating Series & Leibniz's Test
    case 'm1-u4-s2':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Alternating Trajectory & Absolute Convergence</span>
            <span className="exam-tag">FIG 4.2: LEIBNIZ CRITERIA & CONVERGENCE CLASSIFICATION</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 240" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="220" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* Left Diagram: Alternating Trajectory */}
            <g transform="translate(30, 25)">
              <rect x="0" y="0" width="330" height="180" rx="10" fill={colors.bg} stroke={colors.wire} strokeWidth="1.5" />
              <text x="165" y="20" fill={colors.wire} textAnchor="middle" fontSize="11.5" fontWeight="bold">LEIBNIZ ALTERNATING OSCILLATION</text>

              {/* Equilibrium Line */}
              <line x1="20" y1="100" x2="285" y2="100" stroke={colors.source} strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="290" y="104" fill={colors.source} fontSize="10" fontWeight="bold">Sum S</text>

              {/* Zigzag Partial Sums */}
              <path d="M 30 155 L 70 48 L 120 140 L 170 70 L 220 120 L 260 90 L 285 100" fill="none" stroke={colors.highlight} strokeWidth="2.5" />
              
              <circle cx="70" cy="48" r="4" fill={colors.highlight} />
              <text x="70" y="38" fill={colors.highlight} textAnchor="middle" fontSize="9">S₁</text>

              <circle cx="120" cy="140" r="4" fill={colors.highlight} />
              <text x="120" y="155" fill={colors.highlight} textAnchor="middle" fontSize="9">S₂</text>

              <circle cx="170" cy="70" r="4" fill={colors.highlight} />
              <text x="170" y="60" fill={colors.highlight} textAnchor="middle" fontSize="9">S₃</text>

              <text x="165" y="172" fill={colors.text} textAnchor="middle" fontSize="9.5">
                1. uₙ₊₁ ≤ uₙ (Monotonic) &amp; 2. lim uₙ = 0 ⟹ CONVERGES!
              </text>
            </g>

            {/* Right Card: Absolute vs Conditional */}
            <g transform="translate(380, 25)">
              <rect x="0" y="0" width="330" height="180" rx="10" fill={colors.bg} stroke={colors.resistor} strokeWidth="1.5" />
              <text x="165" y="24" fill={colors.resistor} textAnchor="middle" fontSize="12" fontWeight="bold">CONVERGENCE CLASSIFICATION</text>

              <rect x="20" y="45" width="290" height="52" rx="6" fill="rgba(16, 185, 129, 0.1)" stroke={colors.source} strokeWidth="1" />
              <text x="30" y="66" fill={colors.source} fontSize="11" fontWeight="bold">ABSOLUTE CONVERGENCE (Strongest):</text>
              <text x="30" y="85" fill={colors.text} fontSize="9.5">Both Σ uₙ and Σ |uₙ| converge (e.g. Σ (-1)ⁿ/n²)</text>

              <rect x="20" y="110" width="290" height="52" rx="6" fill="rgba(245, 158, 11, 0.1)" stroke={colors.resistor} strokeWidth="1" />
              <text x="30" y="131" fill={colors.resistor} fontSize="11" fontWeight="bold">CONDITIONAL CONVERGENCE:</text>
              <text x="30" y="150" fill={colors.text} fontSize="9.2">Σ uₙ converges, but Σ |uₙ| diverges (e.g. Σ (-1)ⁿ/n)</text>
            </g>
          </svg>
        </div>
      );

    // Unit IV, Section 3: Fourier Series Expansion (Euler's Formulae)
    case 'm1-u4-s3':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Harmonic Waveform Synthesis</span>
            <span className="exam-tag">FIG 4.3: FOURIER SERIES HARMONIC SUMMATION TO SQUARE WAVE</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 250" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="230" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* Left Graph: Harmonic Synthesis */}
            <g transform="translate(40, 30)">
              {/* Axes */}
              <line x1="20" y1="100" x2="340" y2="100" stroke={colors.border} strokeWidth="1.5" />
              <line x1="180" y1="180" x2="180" y2="20" stroke={colors.border} strokeWidth="1.5" />
              <text x="180" y="195" fill={colors.subtext} textAnchor="middle" fontSize="10">0</text>
              <text x="330" y="115" fill={colors.subtext} fontSize="10">π</text>
              <text x="25" y="115" fill={colors.subtext} fontSize="10">-π</text>

              {/* Discontinuous Target: Square Wave */}
              <path d="M 30 150 L 180 150 L 180 50 L 330 50" fill="none" stroke={colors.text} strokeWidth="2.5" strokeDasharray="4 2" />
              <text x="280" y="42" fill={colors.text} fontSize="10">f(x) Square</text>

              {/* 1st Harmonic (Fundamental Sine) */}
              <path d="M 30 100 Q 105 170 180 100 Q 255 30 330 100" fill="none" stroke={colors.wire} strokeWidth="1.5" />
              <text x="270" y="80" fill={colors.wire} fontSize="9">n=1 (Fund.)</text>

              {/* 3-Harmonic Sum */}
              <path d="M 30 100 C 60 160 120 155 180 100 C 240 45 300 40 330 100" fill="none" stroke={colors.source} strokeWidth="2.5" />
              <text x="285" y="125" fill={colors.source} fontSize="11" fontWeight="bold">Σ n=1,3,5</text>
            </g>

            {/* Right Card: Euler's Coefficients */}
            <g transform="translate(410, 30)">
              <rect x="0" y="0" width="300" height="180" rx="10" fill={colors.bg} stroke={colors.resistor} strokeWidth="1.5" />
              <text x="150" y="24" fill={colors.resistor} textAnchor="middle" fontSize="12" fontWeight="bold">EULER'S FORMULAE ON (-π, π)</text>

              <rect x="15" y="40" width="270" height="36" rx="6" fill="rgba(0, 240, 255, 0.08)" stroke={colors.wire} strokeWidth="1" />
              <text x="25" y="63" fill={colors.wire} fontSize="11" fontWeight="bold">a₀ = (1/π) ∫₋π^π f(x) dx</text>

              <rect x="15" y="84" width="270" height="36" rx="6" fill="rgba(16, 185, 129, 0.08)" stroke={colors.source} strokeWidth="1" />
              <text x="25" y="107" fill={colors.source} fontSize="11" fontWeight="bold">aₙ = (1/π) ∫₋π^π f(x) cos(nx) dx</text>

              <rect x="15" y="128" width="270" height="36" rx="6" fill="rgba(236, 72, 153, 0.08)" stroke={colors.highlight} strokeWidth="1" />
              <text x="25" y="151" fill={colors.highlight} fontSize="11" fontWeight="bold">bₙ = (1/π) ∫₋π^π f(x) sin(nx) dx</text>
            </g>
          </svg>
        </div>
      );

    // Unit IV, Section 4: Half-Range Fourier Expansions
    case 'm1-u4-s4':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Symmetry Extensions & Half-Range Series</span>
            <span className="exam-tag">FIG 4.4: EVEN (COSINE) vs ODD (SINE) EXTENSIONS ON (0, L)</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 240" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="220" rx="14" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            
            {/* Panel 1: Even Extension (Cosine) */}
            <g transform="translate(30, 25)">
              <rect x="0" y="0" width="330" height="180" rx="10" fill={colors.bg} stroke={colors.source} strokeWidth="1.5" />
              <text x="165" y="24" fill={colors.source} textAnchor="middle" fontSize="12" fontWeight="bold">HALF-RANGE COSINE (EVEN SYMMETRY)</text>

              {/* Axes */}
              <line x1="20" y1="120" x2="300" y2="120" stroke={colors.border} strokeWidth="1.5" />
              <line x1="160" y1="160" x2="160" y2="35" stroke={colors.border} strokeWidth="1.5" />

              {/* Original f(x) on (0, L) */}
              <path d="M 160 120 L 260 50" stroke={colors.wire} strokeWidth="3" />
              <text x="230" y="75" fill={colors.wire} fontSize="10" fontWeight="bold">f(x) on (0, L)</text>

              {/* Reflection across y-axis */}
              <path d="M 160 120 L 60 50" stroke={colors.source} strokeWidth="2.5" strokeDasharray="4 2" />
              <text x="90" y="75" fill={colors.source} fontSize="10" fontWeight="bold">Reflected: f(-x)</text>

              <rect x="20" y="135" width="290" height="35" rx="6" fill="rgba(16, 185, 129, 0.1)" stroke={colors.source} strokeWidth="1" />
              <text x="165" y="157" fill={colors.source} textAnchor="middle" fontSize="11" fontWeight="bold">bₙ = 0 ⟹ Pure Cosine Series</text>
            </g>

            {/* Panel 2: Odd Extension (Sine) */}
            <g transform="translate(380, 25)">
              <rect x="0" y="0" width="330" height="180" rx="10" fill={colors.bg} stroke={colors.highlight} strokeWidth="1.5" />
              <text x="165" y="24" fill={colors.highlight} textAnchor="middle" fontSize="12" fontWeight="bold">HALF-RANGE SINE (ODD SYMMETRY)</text>

              {/* Axes */}
              <line x1="20" y1="100" x2="300" y2="100" stroke={colors.border} strokeWidth="1.5" />
              <line x1="160" y1="160" x2="160" y2="35" stroke={colors.border} strokeWidth="1.5" />

              {/* Original f(x) on (0, L) */}
              <path d="M 160 100 L 260 50" stroke={colors.wire} strokeWidth="3" />
              <text x="230" y="65" fill={colors.wire} fontSize="10" fontWeight="bold">f(x) on (0, L)</text>

              {/* Inversion through origin */}
              <path d="M 160 100 L 60 150" stroke={colors.highlight} strokeWidth="2.5" strokeDasharray="4 2" />
              <text x="80" y="145" fill={colors.highlight} fontSize="10" fontWeight="bold">Rotated: -f(-x)</text>

              <rect x="20" y="135" width="290" height="35" rx="6" fill="rgba(236, 72, 153, 0.1)" stroke={colors.highlight} strokeWidth="1" />
              <text x="165" y="157" fill={colors.highlight} textAnchor="middle" fontSize="11" fontWeight="bold">a₀ = 0, aₙ = 0 ⟹ Pure Sine Series</text>
            </g>
          </svg>
        </div>
      );

    case 'u2-s1':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Hand-Drawn Engineering Schematic</span>
            <span className="exam-tag">FIG 2.1: MAGNETIC vs ELECTRIC CIRCUIT ANALOGY &amp; B-H HYSTERESIS LOOP</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 230" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="210" rx="12" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            <g transform="translate(25, 25)">
              <rect x="0" y="0" width="330" height="180" rx="10" fill={colors.badgeCyanBg} stroke={colors.badgeCyanBorder} strokeWidth="1.5" />
              <text x="165" y="24" fill={colors.terminal} textAnchor="middle" fontSize="12" fontWeight="bold">ROWLAND RING MAGNETIC CIRCUIT</text>
              <circle cx="115" cy="95" r="46" fill="none" stroke={colors.ground} strokeWidth="16" />
              <circle cx="115" cy="95" r="46" fill="none" stroke={colors.resistor} strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="115" y="99" fill={colors.resistor} textAnchor="middle" fontSize="11" fontWeight="bold">Flux Φ</text>
              <rect x="180" y="45" width="135" height="36" rx="6" fill={colors.formulaBg} stroke={colors.badgeCyanBorder} strokeWidth="1" />
              <text x="247" y="67" fill={colors.badgeCyanText} textAnchor="middle" fontSize="11" fontWeight="bold">MMF = N·I = Φ · S</text>
              <rect x="180" y="92" width="135" height="36" rx="6" fill={colors.formulaBg} stroke={colors.badgeAmberBorder} strokeWidth="1" />
              <text x="247" y="114" fill={colors.badgeAmberText} textAnchor="middle" fontSize="10.5" fontWeight="bold">S = l / (μ₀·μr·A)</text>
              <text x="165" y="164" fill={colors.subtext} textAnchor="middle" fontSize="10">Hopkinson Law: Φ = MMF / Reluctance (AT/Wb)</text>
            </g>
            <g transform="translate(380, 25)">
              <rect x="0" y="0" width="335" height="180" rx="10" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
              <text x="167" y="24" fill={colors.highlight} textAnchor="middle" fontSize="12" fontWeight="bold">B-H HYSTERESIS LOOP (CORE LOSS)</text>
              <line x1="35" y1="100" x2="300" y2="100" stroke={colors.ground} strokeWidth="1.5" />
              <line x1="167" y1="36" x2="167" y2="164" stroke={colors.ground} strokeWidth="1.5" />
              <text x="295" y="94" fill={colors.subtext} textAnchor="end" fontSize="9.5">+H (AT/m)</text>
              <text x="174" y="46" fill={colors.subtext} fontSize="9.5">+B (Tesla)</text>
              <path d="M 85 145 Q 130 140 195 100 Q 225 60 255 50 Q 195 55 140 100 Q 110 135 85 145" fill="rgba(236, 72, 153, 0.1)" stroke={colors.highlight} strokeWidth="2.5" />
              <text x="135" y="75" fill={colors.source} fontSize="9.5" fontWeight="bold">Br (Retentivity)</text>
              <text x="225" y="116" fill={colors.resistor} fontSize="9.5" fontWeight="bold">Hc (Coercivity)</text>
              <text x="167" y="172" fill={colors.badgePinkText} textAnchor="middle" fontSize="10" fontWeight="bold">Wh = η · Bmax^1.6 · f · V (Steinmetz)</text>
            </g>
          </svg>
        </div>
      );

    case 'u2-s3':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Hand-Drawn Engineering Schematic</span>
            <span className="exam-tag">FIG 2.3: DC MACHINE EQUIVALENT CIRCUIT &amp; BACK-EMF</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 225" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="205" rx="12" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            <g transform="translate(25, 22)">
              <rect x="0" y="0" width="335" height="180" rx="10" fill={colors.badgeCyanBg} stroke={colors.badgeCyanBorder} strokeWidth="1.5" />
              <text x="167" y="24" fill={colors.terminal} textAnchor="middle" fontSize="12" fontWeight="bold">DC GENERATOR: Eg = V + Ia·Ra</text>
              <circle cx="105" cy="95" r="28" fill={colors.bg} stroke={colors.source} strokeWidth="2.5" />
              <text x="105" y="99" fill={colors.source} textAnchor="middle" fontSize="12" fontWeight="bold">Eg</text>
              <rect x="97" y="55" width="16" height="10" fill={colors.ground} />
              <rect x="97" y="125" width="16" height="10" fill={colors.ground} />
              <text x="180" y="68" fill={colors.source} fontSize="10.5" fontWeight="bold">Ia → (Out to Load)</text>
              <rect x="155" y="88" width="165" height="32" rx="6" fill={colors.formulaBg} stroke={colors.badgeCyanBorder} strokeWidth="1" />
              <text x="237" y="108" fill={colors.badgeCyanText} textAnchor="middle" fontSize="10" fontWeight="bold">Eg = (Φ·Z·N)/60 · (P/A)</text>
              <text x="167" y="160" fill={colors.subtext} textAnchor="middle" fontSize="10">Lap Winding: A = P | Wave Winding: A = 2</text>
            </g>
            <g transform="translate(380, 22)">
              <rect x="0" y="0" width="335" height="180" rx="10" fill={colors.badgeAmberBg} stroke={colors.badgeAmberBorder} strokeWidth="1.5" />
              <text x="167" y="24" fill={colors.badgeAmberText} textAnchor="middle" fontSize="12" fontWeight="bold">DC MOTOR: V = Eb + Ia·Ra</text>
              <circle cx="105" cy="95" r="28" fill={colors.bg} stroke={colors.resistor} strokeWidth="2.5" />
              <text x="105" y="99" fill={colors.resistor} textAnchor="middle" fontSize="12" fontWeight="bold">Eb</text>
              <rect x="97" y="55" width="16" height="10" fill={colors.ground} />
              <rect x="97" y="125" width="16" height="10" fill={colors.ground} />
              <text x="180" y="68" fill={colors.resistor} fontSize="10.5" fontWeight="bold">← Ia (From Supply V)</text>
              <rect x="155" y="88" width="165" height="32" rx="6" fill={colors.formulaBg} stroke={colors.badgeAmberBorder} strokeWidth="1" />
              <text x="237" y="108" fill={colors.badgeAmberText} textAnchor="middle" fontSize="9.5" fontWeight="bold">Ta = 0.159·Φ·Z·Ia·(P/A)</text>
              <text x="167" y="160" fill={colors.subtext} textAnchor="middle" fontSize="10">Speed Control: N ∝ Eb / Φ = (V − Ia·Ra) / Φ</text>
            </g>
          </svg>
        </div>
      );

    case 'u2-s4':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Hand-Drawn Engineering Schematic</span>
            <span className="exam-tag">FIG 2.4: 3-PHASE INDUCTION MOTOR SLIP &amp; TORQUE-SLIP CURVE</span>
          </div>
          <svg width="100%" style={{ height: 'auto' }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 740 225" className="handwritten-svg">
            <rect x="10" y="10" width="720" height="205" rx="12" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
            <g transform="translate(25, 22)">
              <rect x="0" y="0" width="330" height="180" rx="10" fill={colors.badgeGreenBg} stroke={colors.badgeGreenBorder} strokeWidth="1.5" />
              <text x="165" y="24" fill={colors.badgeGreenText} textAnchor="middle" fontSize="12" fontWeight="bold">ROTATING MAGNETIC FIELD &amp; SLIP</text>
              <rect x="20" y="40" width="290" height="34" rx="6" fill={colors.formulaBg} stroke={colors.badgeGreenBorder} strokeWidth="1" />
              <text x="165" y="62" fill={colors.badgeGreenText} textAnchor="middle" fontSize="12" fontWeight="bold">Ns = (120 · f) / P  (Synchronous RPM)</text>
              <rect x="20" y="84" width="290" height="34" rx="6" fill={colors.formulaBg} stroke={colors.badgeCyanBorder} strokeWidth="1" />
              <text x="165" y="106" fill={colors.badgeCyanText} textAnchor="middle" fontSize="11.5" fontWeight="bold">Slip s = (Ns − Nr) / Ns  |  fr = s · f</text>
              <text x="165" y="142" fill={colors.text} textAnchor="middle" fontSize="10.5" fontWeight="bold">Power Stages: P2 : Pcu2 : Pm = 1 : s : (1 − s)</text>
              <text x="165" y="164" fill={colors.subtext} textAnchor="middle" fontSize="10">Max Torque Condition: s_max = R2 / X20</text>
            </g>
            <g transform="translate(380, 22)">
              <rect x="0" y="0" width="335" height="180" rx="10" fill={colors.bg} stroke={colors.border} strokeWidth="1.5" />
              <text x="167" y="24" fill={colors.highlight} textAnchor="middle" fontSize="12" fontWeight="bold">TORQUE-SLIP CHARACTERISTIC</text>
              <line x1="40" y1="150" x2="305" y2="150" stroke={colors.ground} strokeWidth="1.5" />
              <line x1="40" y1="150" x2="40" y2="40" stroke={colors.ground} strokeWidth="1.5" />
              <path d="M 40 150 L 115 52 Q 175 95 290 115" fill="none" stroke={colors.highlight} strokeWidth="3" />
              <line x1="115" y1="52" x2="115" y2="150" stroke={colors.resistor} strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="115" y="44" fill={colors.resistor} textAnchor="middle" fontSize="10" fontWeight="bold">Tmax (Pull-out)</text>
              <text x="45" y="166" fill={colors.subtext} fontSize="9.5">s=0 (N=Ns)</text>
              <text x="290" y="166" fill={colors.subtext} textAnchor="end" fontSize="9.5">s=1 (Standstill)</text>
            </g>
          </svg>
        </div>
      );

    case 'u3-s2':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Engineering Comparison Blueprint</span>
            <span className="exam-tag">FIG 3.2: RECTIFIER EFFICIENCY, RIPPLE &amp; PIV COMPARISON</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px', padding: '14px', background: colors.bg, borderRadius: '12px', border: `1.5px solid ${colors.border}` }}>
            {[
              { title: 'HALF-WAVE (HWR)', bg: colors.badgeCyanBg, border: colors.badgeCyanBorder, accent: colors.terminal, items: ['Idc = Im / π  |  Irms = Im / 2', 'Max Efficiency η = 40.6%', 'Ripple Factor γ = 1.21', 'PIV = Vm  |  fout = fin'] },
              { title: 'CENTER-TAP FWR (2 Diodes)', bg: colors.badgeAmberBg, border: colors.badgeAmberBorder, accent: colors.badgeAmberText, items: ['Idc = 2Im / π  |  Irms = Im / √2', 'Max Efficiency η = 81.2%', 'Ripple Factor γ = 0.482', 'PIV = 2Vm  |  fout = 2·fin'] },
              { title: 'BRIDGE FWR (4 Diodes)', bg: colors.badgeGreenBg, border: colors.badgeGreenBorder, accent: colors.badgeGreenText, items: ['Idc = 2Im / π  |  Irms = Im / √2', 'Max Efficiency η = 81.2%', 'Ripple Factor γ = 0.482', 'PIV = Vm  |  TUF = 0.812'] },
            ].map((card, i) => (
              <div key={i} style={{ background: card.bg, border: `1.5px solid ${card.border}`, borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ color: card.accent, fontWeight: 800, fontSize: '0.82rem', textAlign: 'center', borderBottom: `1px dashed ${card.border}`, paddingBottom: '6px' }}>{card.title}</div>
                {card.items.map((line, j) => (
                  <div key={j} style={{ color: j === 1 ? card.accent : colors.text, fontWeight: j % 2 === 0 ? 700 : 600, fontSize: '0.78rem', textAlign: 'center', lineHeight: 1.4 }}>{line}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );

    case 'u3-s4':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Engineering Comparison Blueprint</span>
            <span className="exam-tag">FIG 3.4: BJT vs FET (JFET / MOSFET) VOLTAGE-CONTROLLED ARCHITECTURE</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', padding: '14px', background: colors.bg, borderRadius: '12px', border: `1.5px solid ${colors.border}` }}>
            <div style={{ background: colors.badgeCyanBg, border: `1.5px solid ${colors.badgeCyanBorder}`, borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ color: colors.terminal, fontWeight: 800, fontSize: '0.85rem', textAlign: 'center' }}>JFET SHOCKLEY EQUATION</div>
              <div style={{ background: colors.formulaBg, border: `1px solid ${colors.badgeCyanBorder}`, borderRadius: '6px', padding: '8px', color: colors.badgeCyanText, fontWeight: 800, fontSize: '0.88rem', textAlign: 'center' }}>
                ID = IDSS · [ 1 − (VGS / VP) ]²
              </div>
              <div style={{ color: colors.text, fontWeight: 700, fontSize: '0.78rem', textAlign: 'center' }}>Unipolar (Majority Carriers Only) • High Zin (&gt;10⁹ Ω)</div>
              <div style={{ color: colors.subtext, fontSize: '0.76rem', textAlign: 'center' }}>Transconductance: gm = gm0 · [ 1 − (VGS / VP) ]</div>
              <div style={{ color: colors.source, fontWeight: 700, fontSize: '0.76rem', textAlign: 'center' }}>Zero Thermal Runaway (Negative Temp Coefficient)</div>
            </div>
            <div style={{ background: colors.badgePurpleBg, border: `1.5px solid ${colors.badgePurpleBorder}`, borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ color: colors.badgePurpleText, fontWeight: 800, fontSize: '0.85rem', textAlign: 'center' }}>D-MOSFET vs E-MOSFET MODES</div>
              <div style={{ background: colors.formulaBg, border: `1px solid ${colors.badgePurpleBorder}`, borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                <div style={{ color: colors.badgePurpleText, fontWeight: 800, fontSize: '0.8rem' }}>Depletion MOSFET: Physical Channel Present</div>
                <div style={{ color: colors.subtext, fontSize: '0.75rem', marginTop: '3px' }}>Operates in BOTH Depletion (VGS &lt; 0) &amp; Enhancement (VGS &gt; 0)</div>
              </div>
              <div style={{ background: colors.formulaBg, border: `1px solid ${colors.badgeAmberBorder}`, borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                <div style={{ color: colors.badgeAmberText, fontWeight: 800, fontSize: '0.8rem' }}>Enhancement MOSFET: No Initial Channel</div>
                <div style={{ color: colors.subtext, fontSize: '0.75rem', marginTop: '3px' }}>Conducts only when VGS &gt; Vth: ID = k · (VGS − Vth)²</div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'u4-s1':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Digital Logic Blueprint</span>
            <span className="exam-tag">FIG 4.1: NUMBER SYSTEM RADIX CONVERSION &amp; 2's COMPLEMENT</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', padding: '14px', background: colors.bg, borderRadius: '12px', border: `1.5px solid ${colors.border}` }}>
            <div style={{ background: colors.badgeCyanBg, border: `1.5px solid ${colors.badgeCyanBorder}`, borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'center' }}>
              <div style={{ color: colors.terminal, fontWeight: 800, fontSize: '0.85rem' }}>RADIX CONVERSION PIPELINE</div>
              <div style={{ color: colors.text, fontWeight: 700, fontSize: '0.78rem' }}>Decimal (Base 10) → Base r: Divide Integer / Multiply Fraction</div>
              <div style={{ color: colors.badgeCyanText, fontWeight: 700, fontSize: '0.78rem' }}>Octal (Base 8) ↔ Binary: 3-Bit Grouping (4-2-1)</div>
              <div style={{ color: colors.badgePurpleText, fontWeight: 700, fontSize: '0.78rem' }}>Hex (Base 16) ↔ Binary: 4-Bit Grouping (8-4-2-1)</div>
              <div style={{ color: colors.subtext, fontSize: '0.75rem' }}>BCD (8421): Valid 0000–1001 • Add 0110 (6) if Sum &gt; 9</div>
            </div>
            <div style={{ background: colors.badgeAmberBg, border: `1.5px solid ${colors.badgeAmberBorder}`, borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'center' }}>
              <div style={{ color: colors.badgeAmberText, fontWeight: 800, fontSize: '0.85rem' }}>COMPLEMENT SUBTRACTION: A − B</div>
              <div style={{ background: colors.formulaBg, border: `1px solid ${colors.badgeAmberBorder}`, borderRadius: '6px', padding: '7px', color: colors.badgeAmberText, fontWeight: 800, fontSize: '0.82rem' }}>
                2's Complement = (1's Complement) + 1
              </div>
              <div style={{ color: colors.source, fontWeight: 700, fontSize: '0.78rem' }}>If Carry Out = 1: Discard Carry → Result is Positive</div>
              <div style={{ color: colors.highlight, fontWeight: 700, fontSize: '0.78rem' }}>If Carry Out = 0: Take 2's Comp → Result is Negative</div>
              <div style={{ color: colors.subtext, fontSize: '0.75rem' }}>1's Comp Carry Out = 1: Add End-Around Carry to LSB</div>
            </div>
          </div>
        </div>
      );

    case 'u4-s4':
      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Digital Logic Blueprint</span>
            <span className="exam-tag">FIG 4.4: 4-VARIABLE KARNAUGH MAP (GRAY CODE ADJACENCY)</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', padding: '14px', background: colors.bg, borderRadius: '12px', border: `1.5px solid ${colors.border}` }}>
            <div style={{ background: colors.badgeCyanBg, border: `1.5px solid ${colors.badgeCyanBorder}`, borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'center' }}>
              <div style={{ color: colors.terminal, fontWeight: 800, fontSize: '0.85rem' }}>GRAY CODE ORDER: 00 → 01 → 11 → 10</div>
              <div style={{ color: colors.text, fontWeight: 700, fontSize: '0.78rem' }}>Row 00: m0, m1, m3, m2 • Row 01: m4, m5, m7, m6</div>
              <div style={{ color: colors.text, fontWeight: 700, fontSize: '0.78rem' }}>Row 11: m12, m13, m15, m14 • Row 10: m8, m9, m11, m10</div>
              <div style={{ background: colors.formulaBg, border: `1px solid ${colors.badgeCyanBorder}`, borderRadius: '6px', padding: '8px' }}>
                <div style={{ color: colors.badgeCyanText, fontWeight: 800, fontSize: '0.78rem' }}>4 Corners Wrap-Around (m0, m2, m8, m10) = B'·D'</div>
                <div style={{ color: colors.subtext, fontSize: '0.74rem', marginTop: '3px' }}>Group of 2^k adjacent cells eliminates exactly k variables</div>
              </div>
            </div>
            <div style={{ background: colors.badgeGreenBg, border: `1.5px solid ${colors.badgeGreenBorder}`, borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'center' }}>
              <div style={{ color: colors.badgeGreenText, fontWeight: 800, fontSize: '0.85rem' }}>COMBINATIONAL ARITHMETIC BLOCKS</div>
              <div style={{ color: colors.text, fontWeight: 700, fontSize: '0.8rem' }}>Half Adder: Sum = A ⊕ B  |  Carry = A · B</div>
              <div style={{ color: colors.badgeGreenText, fontWeight: 800, fontSize: '0.8rem' }}>Full Adder: Sum = A ⊕ B ⊕ Cin</div>
              <div style={{ color: colors.source, fontWeight: 800, fontSize: '0.8rem' }}>Cout = A·B + Cin·(A ⊕ B)</div>
              <div style={{ color: colors.subtext, fontSize: '0.75rem' }}>Don't Care (X/d): Include only when it enlarges a 2^k group</div>
            </div>
          </div>
        </div>
      );

    default: {
      if (!sectionTitle && !sectionContent) return null;
      const rawHeadings = [...(sectionContent || '').matchAll(/^###\s+([^\n]+)/gm)]
        .map(m => m[1].replace(/[*`$\\]/g, '').replace(/\s+/g, ' ').trim())
        .filter(Boolean);
      const pill1 = rawHeadings[0] || sectionTitle || 'Core Concept & Architecture';
      const pill2 = rawHeadings[1] || 'Mathematical Formulation & Governing Rules';
      const pill3 = rawHeadings[2] || 'University Exam Implementation & Verification';
      const cleanHeader = (sectionTitle || sectionId || 'CONCEPT SCHEMATIC').replace(/[*`$]/g, '').toUpperCase();

      return (
        <div className="handwritten-diagram-container">
          <div className="diagram-header">
            <span>✍️ Architectural Concept Blueprint</span>
            <span className="exam-tag">{cleanHeader}</span>
          </div>
          <div style={{ background: colors.bg, border: `1.5px solid ${colors.border}`, borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ color: colors.terminal, fontWeight: 800, fontSize: '0.85rem', textAlign: 'center', letterSpacing: '0.4px' }}>
              {cleanHeader}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', alignItems: 'stretch' }}>
              <div style={{ background: colors.badgeCyanBg, border: `1.5px solid ${colors.badgeCyanBorder}`, borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '6px', textAlign: 'center' }}>
                <div style={{ color: colors.terminal, fontWeight: 800, fontSize: '0.74rem', letterSpacing: '0.5px' }}>STAGE 1: FOUNDATION</div>
                <div style={{ color: colors.text, fontWeight: 700, fontSize: '0.82rem', lineHeight: 1.4, wordBreak: 'break-word' }}>{pill1}</div>
                <div style={{ color: colors.subtext, fontSize: '0.72rem' }}>Definitions &amp; Core Principles</div>
              </div>
              <div style={{ background: colors.badgeAmberBg, border: `1.5px solid ${colors.badgeAmberBorder}`, borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '6px', textAlign: 'center' }}>
                <div style={{ color: colors.badgeAmberText, fontWeight: 800, fontSize: '0.74rem', letterSpacing: '0.5px' }}>STAGE 2: MECHANISM</div>
                <div style={{ color: colors.text, fontWeight: 700, fontSize: '0.82rem', lineHeight: 1.4, wordBreak: 'break-word' }}>{pill2}</div>
                <div style={{ color: colors.subtext, fontSize: '0.72rem' }}>Derivation &amp; Governing Logic</div>
              </div>
              <div style={{ background: colors.badgeGreenBg, border: `1.5px solid ${colors.badgeGreenBorder}`, borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '6px', textAlign: 'center' }}>
                <div style={{ color: colors.badgeGreenText, fontWeight: 800, fontSize: '0.74rem', letterSpacing: '0.5px' }}>STAGE 3: APPLICATION</div>
                <div style={{ color: colors.text, fontWeight: 700, fontSize: '0.82rem', lineHeight: 1.4, wordBreak: 'break-word' }}>{pill3}</div>
                <div style={{ color: colors.subtext, fontSize: '0.72rem' }}>Solved Numerical &amp; Exam Proof</div>
              </div>
            </div>
            <div style={{ background: colors.formulaBg, border: `1px solid ${colors.border}`, borderRadius: '6px', padding: '6px 10px', color: colors.subtext, fontSize: '0.74rem', fontWeight: 700, textAlign: 'center' }}>
              Section ID: {sectionId} • Auto-Sizing Responsive HTML/CSS Blueprint
            </div>
          </div>
        </div>
      );
    }
  }
}
