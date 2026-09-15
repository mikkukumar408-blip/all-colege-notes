/* =========================================================================
   INTERACTIVE CIRCUIT LAB: THEVENIN & MPTT SIMULATOR
   =========================================================================
   Allows students to interact with circuit parameters live:
   - Move Vth, Rth, and RL sliders
   - See IL, PL, Pmax, and Efficiency update in real time
   - Visualizes why RL = Rth gives maximum power transfer (50% efficiency)
   ========================================================================= */

import React, { useState } from 'react';
import { Zap, Gauge, Award, Sparkles } from 'lucide-react';

export default function InteractiveTheveninLab({ themeMode = 'cyber' }) {
  const [vth, setVth] = useState(12); // Volts
  const [rth, setRth] = useState(20); // Ohms
  const [rl, setRl] = useState(20);   // Ohms

  const isPaper = themeMode === 'paper';
  const isClean = themeMode === 'clean';

  // Real-time calculations
  const totalR = rth + rl;
  const il = totalR > 0 ? (vth / totalR) : 0; // Amperes
  const pl = il * il * rl; // Watts
  const pmax = (vth * vth) / (4 * rth); // Maximum theoretical power
  const efficiency = totalR > 0 ? ((rl / totalR) * 100) : 0;
  const isOptimal = Math.abs(rl - rth) < 1;

  const containerBg = isPaper
    ? '#fefcf6'
    : isClean
      ? '#ffffff'
      : 'linear-gradient(135deg, rgba(14, 21, 37, 0.95), rgba(7, 10, 20, 0.95))';

  const containerBorder = isPaper
    ? '2px solid #f59e0b'
    : isClean
      ? '1px solid #e2e8f0'
      : '2px solid rgba(0, 240, 255, 0.4)';

  const containerShadow = isPaper
    ? '0 4px 20px rgba(0, 0, 0, 0.08)'
    : isClean
      ? '0 4px 20px rgba(0, 0, 0, 0.05)'
      : '0 8px 32px rgba(0, 240, 255, 0.15)';

  const titleColor = isPaper ? '#1e3a8a' : isClean ? '#0f172a' : '#fff';
  const subtextColor = isPaper ? '#334155' : isClean ? '#475569' : 'var(--text-muted)';
  const cardBg = isPaper ? '#ffffff' : isClean ? '#f8fafc' : 'rgba(255,255,255,0.03)';
  const cardBorder = isPaper ? '1.5px solid #cbd5e1' : isClean ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.08)';
  const gaugeBg = isPaper ? '#f8fafc' : isClean ? '#f1f5f9' : 'rgba(0,0,0,0.4)';
  const isLight = isPaper || isClean;

  return (
    <div style={{
      background: containerBg,
      border: containerBorder,
      borderRadius: '14px',
      padding: '24px',
      margin: '24px 0',
      boxShadow: containerShadow,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            background: isPaper ? '#fef3c7' : isClean ? '#eff6ff' : 'rgba(0, 240, 255, 0.2)', 
            padding: '8px', 
            borderRadius: '8px', 
            color: isPaper ? '#b45309' : isClean ? '#2563eb' : 'var(--neon-cyan)' 
          }}>
            <Zap size={22} />
          </div>
          <div>
            <h4 style={{ color: titleColor, fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
              ⚡ Interactive MPTT & Thevenin Circuit Simulator
            </h4>
            <p style={{ color: subtextColor, fontSize: '0.82rem', margin: 0 }}>
              Live Experiment: Adjust sliders below to verify Maximum Power Transfer theorem in real-time.
            </p>
          </div>
        </div>

        {isOptimal && (
          <div style={{
            background: isLight ? '#dcfce7' : 'rgba(34, 197, 94, 0.2)',
            border: `1.5px solid ${isLight ? '#16a34a' : '#22c55e'}`,
            color: isLight ? '#14532d' : '#86efac',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '0.82rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Award size={16} /> MAXIMUM POWER REACHED! (RL = Rth)
          </div>
        )}
      </div>

      {/* Sliders Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', marginBottom: '22px' }}>
        {/* Vth Slider */}
        <div style={{ background: cardBg, padding: '14px', borderRadius: '10px', border: cardBorder }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: isLight ? '#1e293b' : '#94a3b8', fontWeight: 700 }}>Thevenin Voltage (Vth):</span>
            <strong style={{ color: isLight ? '#1d4ed8' : '#38bdf8', fontSize: '1.05rem' }}>{vth} V</strong>
          </div>
          <input 
            type="range" 
            min="2" 
            max="30" 
            value={vth} 
            onChange={(e) => setVth(Number(e.target.value))}
            onWheel={(e) => e.target.blur()}
            style={{ width: '100%', accentColor: isLight ? '#1d4ed8' : '#38bdf8', cursor: 'pointer', touchAction: 'pan-y' }}
          />
        </div>

        {/* Rth Slider */}
        <div style={{ background: cardBg, padding: '14px', borderRadius: '10px', border: cardBorder }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: isLight ? '#1e293b' : '#94a3b8', fontWeight: 700 }}>Internal Resistance (Rth):</span>
            <strong style={{ color: isLight ? '#b45309' : '#f59e0b', fontSize: '1.05rem' }}>{rth} Ω</strong>
          </div>
          <input 
            type="range" 
            min="5" 
            max="100" 
            value={rth} 
            onChange={(e) => setRth(Number(e.target.value))}
            onWheel={(e) => e.target.blur()}
            style={{ width: '100%', accentColor: isLight ? '#b45309' : '#f59e0b', cursor: 'pointer', touchAction: 'pan-y' }}
          />
        </div>

        {/* RL Slider */}
        <div style={{ background: cardBg, padding: '14px', borderRadius: '10px', border: cardBorder }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: isLight ? '#1e293b' : '#94a3b8', fontWeight: 700 }}>Load Resistance (RL):</span>
            <strong style={{ color: isOptimal ? (isLight ? '#15803d' : '#22c55e') : (isLight ? '#b91c1c' : '#ec4899'), fontSize: '1.05rem' }}>{rl} Ω</strong>
          </div>
          <input 
            type="range" 
            min="1" 
            max="100" 
            value={rl} 
            onChange={(e) => setRl(Number(e.target.value))}
            onWheel={(e) => e.target.blur()}
            style={{ width: '100%', accentColor: isOptimal ? '#16a34a' : (isLight ? '#dc2626' : '#ec4899'), cursor: 'pointer', touchAction: 'pan-y' }}
          />
        </div>
      </div>

      {/* Live Calculated Gauges */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px', marginBottom: '16px' }}>
        {/* Current IL */}
        <div style={{ background: gaugeBg, padding: '14px', borderRadius: '8px', borderLeft: '4px solid #38bdf8' }}>
          <div style={{ fontSize: '0.72rem', color: isLight ? '#334155' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Load Current (IL)</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: isLight ? '#0369a1' : '#38bdf8', marginTop: '4px' }}>
            {il.toFixed(3)} <span style={{ fontSize: '0.85rem' }}>A</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : 'var(--text-dim)', fontWeight: 600 }}>IL = Vth / (Rth + RL)</div>
        </div>

        {/* Load Power PL */}
        <div style={{ background: gaugeBg, padding: '14px', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
          <div style={{ fontSize: '0.72rem', color: isLight ? '#334155' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Delivered Power (PL)</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: isLight ? '#b45309' : '#f59e0b', marginTop: '4px' }}>
            {pl.toFixed(3)} <span style={{ fontSize: '0.85rem' }}>W</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : 'var(--text-dim)', fontWeight: 600 }}>PL = IL² · RL</div>
        </div>

        {/* Max Power Pmax */}
        <div style={{ background: gaugeBg, padding: '14px', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
          <div style={{ fontSize: '0.72rem', color: isLight ? '#334155' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Max Potential (Pmax)</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: isLight ? '#15803d' : '#22c55e', marginTop: '4px' }}>
            {pmax.toFixed(3)} <span style={{ fontSize: '0.85rem' }}>W</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : 'var(--text-dim)', fontWeight: 600 }}>Pmax = Vth² / (4·Rth)</div>
        </div>

        {/* Efficiency */}
        <div style={{ background: gaugeBg, padding: '14px', borderRadius: '8px', borderLeft: '4px solid #ec4899' }}>
          <div style={{ fontSize: '0.72rem', color: isLight ? '#334155' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Circuit Efficiency (η)</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: isLight ? '#9d174d' : '#ec4899', marginTop: '4px' }}>
            {efficiency.toFixed(1)} <span style={{ fontSize: '0.85rem' }}>%</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : 'var(--text-dim)', fontWeight: 600 }}>η = (RL / (Rth + RL)) · 100</div>
        </div>
      </div>

      {/* Real-time Insight Tip */}
      <div style={{
        background: isOptimal 
          ? (isLight ? '#ecfdf5' : 'rgba(34, 197, 94, 0.12)')
          : (isLight ? '#fffbeb' : 'rgba(245, 158, 11, 0.12)'),
        border: `1.5px solid ${isOptimal ? (isLight ? '#10b981' : '#22c55e') : (isLight ? '#f59e0b' : '#f59e0b')}`,
        borderRadius: '8px',
        padding: '14px 18px',
        fontSize: '0.88rem',
        lineHeight: 1.5,
        color: isOptimal 
          ? (isLight ? '#064e3b' : '#86efac')
          : (isLight ? '#78350f' : '#fef08a')
      }}>
        💡 <strong>Key Exam Takeaway:</strong> {isOptimal ? (
          <span>When RL equals Rth ({rth} Ω), delivered power reaches its absolute peak of <strong>{pmax.toFixed(3)} W</strong>, and efficiency is precisely <strong>50.0%</strong>! (Remaining 50% power is dissipated inside Rth as heat).</span>
        ) : (
          <span>Currently RL ({rl} Ω) ≠ Rth ({rth} Ω). Slide RL to <strong>{rth} Ω</strong> to observe peak power transfer!</span>
        )}
      </div>
    </div>
  );
}
