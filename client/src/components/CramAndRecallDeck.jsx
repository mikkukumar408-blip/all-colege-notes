import React, { useState } from 'react';
import { Zap, AlertTriangle, CheckCircle2, RotateCcw, Eye, EyeOff, BookOpen, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CramAndRecallDeck({
  subject,
  unitNum,
  unitData,
  themeMode = 'paper',
  onCloseCram,
  onMasteryUpdate
}) {
  const [flippedCards, setFlippedCards] = useState({});
  const [cardStatus, setCardStatus] = useState({});

  // Generate high-yield questions for the specific subject & unit
  const getUnitQuizData = () => {
    const code = (subject?.code || '').toUpperCase();
    const title = unitData?.title || `Unit ${unitNum}`;

    // Subject-specific tailored high-yield flashcards
    if (code.includes('BELE') || code.includes('BEEE') || code.includes('EE101')) {
      if (unitNum === 1) {
        return [
          {
            q: "State Thevenin's Theorem and the formula for Maximum Power Transfer.",
            a: "Thevenin's Theorem states that any linear bidirectional DC network across two terminals can be replaced by an equivalent voltage source Vth in series with Rth. Maximum Power Transfer occurs when Load Resistance RL = Rth, and Pmax = (Vth)² / (4 • Rth).",
            trap: "Don't forget to deactivate all independent sources (short voltage sources, open current sources) when calculating Rth."
          },
          {
            q: "What are the exact boundary conditions when converting Delta to Star network?",
            a: "R₁ = (R₁₂ • R₃₁) / (R₁₂ + R₂₃ + R₃₁). Each star resistor equals the product of adjacent delta branches divided by the perimeter sum of all delta resistors.",
            trap: "Common error: Confusing Star-to-Delta numerator with Delta-to-Star numerator."
          },
          {
            q: "Contrast Mesh Current Analysis (KVL) vs Nodal Analysis (KCL) selection criteria.",
            a: "Use Nodal Analysis if the circuit has fewer independent nodes than meshes (N-1 equations). Use Mesh Analysis if it has fewer planar loops than nodes. Nodal is preferred when parallel current sources dominate.",
            trap: "If a voltage source is shared between two non-reference nodes, you MUST use a Supernode."
          }
        ];
      }
      if (unitNum === 2) {
        return [
          {
            q: "Define Form Factor and Peak Factor of a pure sinusoidal waveform.",
            a: "Form Factor = RMS Value / Average Value = (Vm / √2) / (2Vm / π) = 1.11. Peak Factor = Peak Value / RMS Value = Vm / (Vm / √2) = 1.414 (√2).",
            trap: "Average value of a pure sine wave over a full cycle is 0; Form factor is always calculated over a HALF cycle."
          },
          {
            q: "What is Series Resonance and what is the formula for Quality Factor (Q)?",
            a: "Series Resonance occurs when inductive reactance equals capacitive reactance (XL = XC), resulting in purely resistive impedance Z = R and unity power factor. Resonance frequency fr = 1 / (2π√(LC)). Q-Factor = (ω0 • L) / R = 1 / (ω0 • C • R).",
            trap: "At series resonance, current is at MAXIMUM, whereas in parallel resonance, impedance is maximum and current is minimum."
          }
        ];
      }
    }

    if (code.includes('BCSE-011') || code.includes('AIML')) {
      return [
        {
          q: "What is the PEAS framework for an Automated Taxi Driver agent?",
          a: "Performance: Safety, speed, legal compliance, passenger comfort, max profit. Environment: Roads, other traffic, pedestrians, weather conditions. Actuators: Steering wheel, accelerator, brakes, horn, display. Sensors: Cameras, radar, lidar, GPS, speedometer, accelerometer.",
          trap: "Don't list internal variables as Environment; Environment must be the external world."
        },
        {
          q: "Prove why A* Search is optimally admissible when heuristic h(n) is admissible.",
          a: "A heuristic is admissible if it never overestimates the true cost to reach the goal: h(n) ≤ h*(n). Since A* expands nodes in order of f(n) = g(n) + h(n), when it selects a goal state G, f(G) = g(G) ≤ f(n) for any open node n, guaranteeing no suboptimal path can be chosen.",
          trap: "Admissibility applies to tree search; graph search requires the stronger condition of consistency/monotonicity."
        }
      ];
    }

    if (code.includes('BMAT') || code.includes('M1') || code.includes('MATH')) {
      return [
        {
          q: "State Cayley-Hamilton Theorem and how it calculates Matrix Inverse A⁻¹.",
          a: "Every square matrix satisfies its own characteristic equation: |A - λI| = 0 ⇒ Aⁿ + c₁Aⁿ⁻¹ + ... + cₙI = 0. Multiplying throughout by A⁻¹ gives: A⁻¹ = (-1/cₙ) • [Aⁿ⁻¹ + c₁Aⁿ⁻² + ... + cₙ₋₁I], provided |A| ≠ 0.",
          trap: "Always verify det(A) ≠ 0 before claiming inverse exists. Constant term cₙ = (-1)ⁿ • det(A)."
        },
        {
          q: "State Euler's Theorem on Homogeneous Functions of degree n.",
          a: "If u(x, y) is a homogeneous function of x and y of degree n, then: x • (∂u/∂x) + y • (∂u/∂y) = n • u. Furthermore: x²(∂²u/∂x²) + 2xy(∂²u/∂x∂y) + y²(∂²u/∂y²) = n(n-1) • u.",
          trap: "Check if the function itself is homogeneous, or if a transformed variable like f(u) is homogeneous (e.g. u = sin⁻¹(z))."
        }
      ];
    }

    // Default fallback high-yield questions for other units
    return [
      {
        q: `What is the core law and primary governing formula of ${title}?`,
        a: "Review the fundamental governing relation and primary equation highlighted in the formula box of this unit.",
        trap: "Ensure all SI units (Volts, Amperes, Ohms, Radians/sec, Joules) are standardized before substitution."
      },
      {
        q: `What is the top 10-mark derivation question frequently asked from ${title}?`,
        a: "Derive the primary relationship starting from first principles with a labeled schematic or architectural flow diagram.",
        trap: "State all assumptions (steady-state, ideal conditions, boundary values) clearly in step 1."
      }
    ];
  };

  const questions = getUnitQuizData();

  const toggleFlip = (index) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const markCard = (index, status) => {
    const updated = { ...cardStatus, [index]: status };
    setCardStatus(updated);

    // If all mastered, shoot confetti and trigger mastery update
    const masteredCount = Object.values(updated).filter(s => s === 'mastered').length;
    if (masteredCount === questions.length) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
      if (onMasteryUpdate) onMasteryUpdate();
    }
  };

  return (
    <div style={{
      background: themeMode === 'clean' ? '#f8fafc' : themeMode === 'paper' ? '#fffdf0' : '#0d1527',
      border: themeMode === 'clean' ? '2px solid #3b82f6' : themeMode === 'paper' ? '2px solid #b45309' : '2px solid var(--neon-cyan)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '28px',
      boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
      position: 'relative'
    }}>
      {/* Header Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: '#ef4444',
            color: '#fff',
            padding: '4px 10px',
            borderRadius: '6px',
            fontWeight: 900,
            fontSize: '0.78rem',
            letterSpacing: '0.05em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <Zap size={14} /> 15-MIN EXAM CRAM MODE
          </span>
          <span style={{
            fontSize: '0.9rem',
            fontWeight: 700,
            color: themeMode === 'clean' ? '#475569' : themeMode === 'paper' ? '#78350f' : 'var(--text-muted)'
          }}>
            High-Yield Focus • {subject?.name || 'Subject'} • Unit {unitNum}
          </span>
        </div>

        <button
          type="button"
          onClick={onCloseCram}
          className="btn-outline"
          style={{
            fontSize: '0.8rem',
            padding: '6px 14px',
            borderColor: themeMode === 'paper' ? '#b45309' : undefined
          }}
        >
          <BookOpen size={14} /> Back to Full Notes
        </button>
      </div>

      {/* Strategic Exam Pitfall Callout */}
      <div style={{
        background: themeMode === 'clean' ? '#fef2f2' : themeMode === 'paper' ? '#fef3c7' : 'rgba(239, 68, 68, 0.1)',
        borderLeft: '4px solid #ef4444',
        padding: '12px 16px',
        borderRadius: '8px',
        marginBottom: '22px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontWeight: 800, fontSize: '0.88rem', marginBottom: '4px' }}>
          <AlertTriangle size={16} /> EXAMINER'S TRAP WARNING: Where 80% of Students Lose Marks
        </div>
        <p style={{
          margin: 0,
          fontSize: '0.85rem',
          lineHeight: 1.5,
          color: themeMode === 'clean' ? '#7f1d1d' : themeMode === 'paper' ? '#78350f' : '#fca5a5'
        }}>
          In numerical derivations, always state the initial circuit/boundary conditions and box the final unit dimension. Examiners penalize missing signs and unreduced fractions heavily.
        </p>
      </div>

      {/* Rapid-Fire Active Recall Flashcards */}
      <h4 style={{
        fontSize: '1.05rem',
        fontWeight: 800,
        marginBottom: '14px',
        color: themeMode === 'clean' ? '#0f172a' : themeMode === 'paper' ? '#1e3a8a' : 'var(--neon-cyan)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Award size={18} /> Rapid-Fire Recall Drill (Self-Test Before Moving Ahead)
      </h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {questions.map((card, idx) => {
          const isFlipped = !!flippedCards[idx];
          const status = cardStatus[idx];

          return (
            <div
              key={idx}
              style={{
                background: themeMode === 'clean' ? '#fff' : themeMode === 'paper' ? '#fefce8' : 'rgba(255,255,255,0.03)',
                border: status === 'mastered'
                  ? '1.5px solid #10b981'
                  : status === 'review'
                    ? '1.5px solid #f59e0b'
                    : themeMode === 'clean' ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                padding: '16px 18px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
            >
              {/* Question Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: themeMode === 'clean' ? '#1e293b' : themeMode === 'paper' ? '#0f172a' : '#fff' }}>
                  <span style={{ color: '#ef4444', marginRight: '6px' }}>Q{idx + 1}.</span> {card.q}
                </div>
                <button
                  type="button"
                  onClick={() => toggleFlip(idx)}
                  style={{
                    background: isFlipped ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                    border: '1px solid #3b82f6',
                    color: '#3b82f6',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    flexShrink: 0
                  }}
                >
                  {isFlipped ? <EyeOff size={13} /> : <Eye size={13} />}
                  {isFlipped ? 'Hide Answer' : 'Flip to Reveal'}
                </button>
              </div>

              {/* Revealed Answer & Trap */}
              {isFlipped && (
                <div style={{
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: themeMode === 'clean' ? '1px dashed #cbd5e1' : '1px dashed rgba(255,255,255,0.1)'
                }}>
                  <div style={{
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    color: themeMode === 'clean' ? '#334155' : themeMode === 'paper' ? '#1e3a8a' : '#cbd5e1',
                    marginBottom: '8px'
                  }}>
                    <strong style={{ color: '#10b981' }}>Model Answer: </strong>{card.a}
                  </div>
                  {card.trap && (
                    <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontStyle: 'italic' }}>
                      ⚠️ <strong>Trap:</strong> {card.trap}
                    </div>
                  )}

                  {/* Self-Scoring Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Self-Assessment:</span>
                    <button
                      type="button"
                      onClick={() => markCard(idx, 'review')}
                      style={{
                        background: status === 'review' ? '#f59e0b' : 'transparent',
                        color: status === 'review' ? '#fff' : '#f59e0b',
                        border: '1px solid #f59e0b',
                        borderRadius: '4px',
                        padding: '3px 8px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Need Review
                    </button>
                    <button
                      type="button"
                      onClick={() => markCard(idx, 'mastered')}
                      style={{
                        background: status === 'mastered' ? '#10b981' : 'transparent',
                        color: status === 'mastered' ? '#fff' : '#10b981',
                        border: '1px solid #10b981',
                        borderRadius: '4px',
                        padding: '3px 8px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <CheckCircle2 size={12} /> Got It Mastered
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
