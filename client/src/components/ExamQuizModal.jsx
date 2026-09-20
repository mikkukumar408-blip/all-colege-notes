import React, { useState, useMemo } from 'react';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Award, 
  RotateCcw, 
  Timer, 
  BookOpen, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';
import katex from 'katex';

// Curated university exam quiz banks for active recall
const QUIZ_DATABASE = {
  'BEEE': [
    {
      id: 'beee-1',
      question: 'In a linear bilateral DC network, maximum power is delivered to a load resistor $R_L$ when:',
      options: [
        { label: 'A', text: '$R_L = 0\\,\\Omega$ (Short circuit)', correct: false },
        { label: 'B', text: '$R_L = R_{th}$ (Thevenin resistance)', correct: true },
        { label: 'C', text: '$R_L = 2 R_{th}$', correct: false },
        { label: 'D', text: '$R_L = \\infty$ (Open circuit)', correct: false }
      ],
      explanation: 'By the Maximum Power Transfer Theorem (MPTT), $\\frac{dP_L}{dR_L} = 0 \\implies R_L = R_{th}$. At this peak point, efficiency is exactly 50% with $P_{max} = \\frac{V_{th}^2}{4R_{th}}$.',
      marks: 2
    },
    {
      id: 'beee-2',
      question: 'A 100V DC source with internal resistance of $25\\,\\Omega$ powers a load. What is the maximum power that can be drawn by the load?',
      options: [
        { label: 'A', text: '$50\\text{ Watts}$', correct: false },
        { label: 'B', text: '$100\\text{ Watts}$', correct: true },
        { label: 'C', text: '$200\\text{ Watts}$', correct: false },
        { label: 'D', text: '$400\\text{ Watts}$', correct: false }
      ],
      explanation: 'Using $P_{max} = \\frac{V_{th}^2}{4R_{th}} = \\frac{(100)^2}{4 \\times 25} = \\frac{10000}{100} = 100\\text{ Watts}$.',
      marks: 3
    },
    {
      id: 'beee-3',
      question: 'Norton short-circuit current $I_N$ and Thevenin open-circuit voltage $V_{th}$ are related through source transformation by:',
      options: [
        { label: 'A', text: '$V_{th} = I_N \\cdot R_{th}$', correct: true },
        { label: 'B', text: '$I_N = V_{th} \\cdot R_{th}$', correct: false },
        { label: 'C', text: '$V_{th} = \\frac{I_N}{R_{th}}$', correct: false },
        { label: 'D', text: '$R_{th} = V_{th} \\cdot I_N$', correct: false }
      ],
      explanation: 'By Ohm\'s Law duality, an ideal voltage source $V_{th}$ in series with $R_{th}$ equals an ideal current source $I_N = \\frac{V_{th}}{R_{th}}$ in parallel with $R_{th}$.',
      marks: 2
    },
    {
      id: 'beee-4',
      question: 'Kirchhoff\'s Current Law (KCL) at any node is a direct consequence of which fundamental physical conservation law?',
      options: [
        { label: 'A', text: 'Conservation of Energy', correct: false },
        { label: 'B', text: 'Conservation of Electric Charge', correct: true },
        { label: 'C', text: 'Conservation of Momentum', correct: false },
        { label: 'D', text: 'Faraday\'s Law of Induction', correct: false }
      ],
      explanation: 'KCL states that charge cannot accumulate at an ideal node: $\\sum I_{entering} = \\sum I_{leaving} \\implies \\frac{dQ}{dt} = 0$. (KVL represents Conservation of Energy).',
      marks: 2
    },
    {
      id: 'beee-5',
      question: 'In a balanced 3-phase Star (Y) connection, the relationship between Line Voltage ($V_L$) and Phase Voltage ($V_{ph}$) is:',
      options: [
        { label: 'A', text: '$V_L = V_{ph}$', correct: false },
        { label: 'B', text: '$V_L = \\sqrt{3}\\,V_{ph}$ with line voltage leading phase voltage by $30^\\circ$', correct: true },
        { label: 'C', text: '$V_L = \\frac{V_{ph}}{\\sqrt{3}}$', correct: false },
        { label: 'D', text: '$V_L = 3\\,V_{ph}$', correct: false }
      ],
      explanation: 'In Star connection, Line voltage is the phasor difference of two phase voltages: $|V_{RY}| = \\sqrt{3}\\,V_{ph}$ and leads by $30^\\circ$, while line current equals phase current ($I_L = I_{ph}$).',
      marks: 3
    }
  ],
  'Data Structures': [
    {
      id: 'dsa-1',
      question: 'What is the worst-case time complexity of searching an element in a balanced AVL Search Tree with $n$ nodes?',
      options: [
        { label: 'A', text: '$\\mathcal{O}(1)$', correct: false },
        { label: 'B', text: '$\\mathcal{O}(\\log n)$', correct: true },
        { label: 'C', text: '$\\mathcal{O}(n)$', correct: false },
        { label: 'D', text: '$\\mathcal{O}(n \\log n)$', correct: false }
      ],
      explanation: 'An AVL tree guarantees balance factor $|h_L - h_R| \\le 1$, maintaining tree height $h \\le 1.44 \\log_2 n$. Hence worst-case search, insert, and delete are all strictly $\\mathcal{O}(\\log n)$.',
      marks: 2
    },
    {
      id: 'dsa-2',
      question: 'Which of the following data structures is strictly used for Breadth-First Search (BFS) graph traversal?',
      options: [
        { label: 'A', text: 'Stack (LIFO)', correct: false },
        { label: 'B', text: 'Queue (FIFO)', correct: true },
        { label: 'C', text: 'Priority Queue (Min-Heap)', correct: false },
        { label: 'D', text: 'Binary Search Tree', correct: false }
      ],
      explanation: 'BFS explores vertices level by level, requiring a FIFO Queue. DFS uses a LIFO Stack (or recursion call stack), and Dijkstra\'s algorithm uses a Priority Queue.',
      marks: 2
    },
    {
      id: 'dsa-3',
      question: 'In QuickSort with Median-of-Three pivot selection, the average-case and worst-case time complexities are respectively:',
      options: [
        { label: 'A', text: '$\\mathcal{O}(n \\log n)$ and $\\mathcal{O}(n^2)$', correct: true },
        { label: 'B', text: '$\\mathcal{O}(n)$ and $\\mathcal{O}(n \\log n)$', correct: false },
        { label: 'C', text: '$\\mathcal{O}(n \\log n)$ and $\\mathcal{O}(n \\log n)$', correct: false },
        { label: 'D', text: '$\\mathcal{O}(n^2)$ and $\\mathcal{O}(n^2)$', correct: false }
      ],
      explanation: 'Average case divides array evenly: $T(n) = 2T(n/2) + \\mathcal{O}(n) = \\mathcal{O}(n \\log n)$. In the worst case (unbalanced partition $1$ vs $n-1$), complexity degrades to $\\mathcal{O}(n^2)$.',
      marks: 3
    },
    {
      id: 'dsa-4',
      question: 'A circular queue of capacity $N$ implemented using an array uses front and rear pointers. The queue full condition is:',
      options: [
        { label: 'A', text: '`front == rear`', correct: false },
        { label: 'B', text: '`(rear + 1) % N == front`', correct: true },
        { label: 'C', text: '`rear == N - 1`', correct: false },
        { label: 'D', text: '`front == (rear + 1)`', correct: false }
      ],
      explanation: 'In circular arrays, keeping one slot empty differentiates between Full and Empty: Full is `(rear + 1) % N == front`, while Empty is `front == rear`.',
      marks: 2
    },
    {
      id: 'dsa-5',
      question: 'What is the maximum number of nodes in a strictly binary tree of depth $h$ (where root is at depth $0$)?',
      options: [
        { label: 'A', text: '$2^h - 1$', correct: false },
        { label: 'B', text: '$2^{h+1} - 1$', correct: true },
        { label: 'C', text: '$2^h$', correct: false },
        { label: 'D', text: '$2h + 1$', correct: false }
      ],
      explanation: 'Sum of geometric progression $\\sum_{i=0}^h 2^i = 2^{h+1} - 1$. For height $h=2$, max nodes = $2^3 - 1 = 7$.',
      marks: 3
    }
  ],
  'Mathematics 1': [
    {
      id: 'math-1',
      question: 'Euler\'s Theorem for a homogeneous function $u = f(x, y)$ of degree $n$ states that:',
      options: [
        { label: 'A', text: '$x\\frac{\\partial u}{\\partial x} + y\\frac{\\partial u}{\\partial y} = n \\cdot u$', correct: true },
        { label: 'B', text: '$\\frac{\\partial^2 u}{\\partial x^2} + \\frac{\\partial^2 u}{\\partial y^2} = 0$', correct: false },
        { label: 'C', text: '$x\\frac{\\partial u}{\\partial x} - y\\frac{\\partial u}{\\partial y} = n^2 u$', correct: false },
        { label: 'D', text: '$x\\frac{\\partial u}{\\partial x} + y\\frac{\\partial u}{\\partial y} = \\frac{u}{n}$', correct: false }
      ],
      explanation: 'Euler\'s fundamental homogeneous theorem: $x\\frac{\\partial u}{\\partial x} + y\\frac{\\partial u}{\\partial y} = n u$. For second derivatives: $x^2 u_{xx} + 2xy u_{xy} + y^2 u_{yy} = n(n-1)u$.',
      marks: 2
    },
    {
      id: 'math-2',
      question: 'The value of the Gaussian Definite Integral $\\int_0^\\infty e^{-x^2} dx$ evaluated via double integrals in polar coordinates is:',
      options: [
        { label: 'A', text: '$\\sqrt{\\pi}$', correct: false },
        { label: 'B', text: '$\\frac{\\sqrt{\\pi}}{2}$', correct: true },
        { label: 'C', text: '$\\pi$', correct: false },
        { label: 'D', text: '$\\frac{\\pi}{4}$', correct: false }
      ],
      explanation: '$I^2 = \\int_0^\\infty \\int_0^\\infty e^{-(x^2+y^2)} dx dy = \\int_0^{\\pi/2} d\\theta \\int_0^\\infty e^{-r^2} r dr = \\frac{\\pi}{2} \\cdot \\frac{1}{2} = \\frac{\\pi}{4} \\implies I = \\frac{\\sqrt{\\pi}}{2}$.',
      marks: 3
    },
    {
      id: 'math-3',
      question: 'If $\\lambda$ is an eigenvalue of an invertible matrix $A$, then the eigenvalue of $A^{-1}$ is:',
      options: [
        { label: 'A', text: '$-\\lambda$', correct: false },
        { label: 'B', text: '$\\frac{1}{\\lambda}$', correct: true },
        { label: 'C', text: '$\\lambda^2$', correct: false },
        { label: 'D', text: '$\\det(A)$', correct: false }
      ],
      explanation: 'Since $A X = \\lambda X$, multiplying both sides by $A^{-1}$ gives $X = \\lambda A^{-1} X \\implies A^{-1} X = \\frac{1}{\\lambda} X$.',
      marks: 2
    },
    {
      id: 'math-4',
      question: 'The Jacobian $J = \\frac{\\partial(x, y)}{\\partial(r, \\theta)}$ for transformation to Polar Coordinates ($x = r\\cos\\theta, y = r\\sin\\theta$) equals:',
      options: [
        { label: 'A', text: '$1$', correct: false },
        { label: 'B', text: '$r$', correct: true },
        { label: 'C', text: '$r^2$', correct: false },
        { label: 'D', text: '$\\frac{1}{r}$', correct: false }
      ],
      explanation: '$J = \\begin{vmatrix} \\cos\\theta & -r\\sin\\theta \\\\ \\sin\\theta & r\\cos\\theta \\end{vmatrix} = r\\cos^2\\theta + r\\sin^2\\theta = r(1) = r$. Area element $dx dy = r\\,dr\\,d\\theta$.',
      marks: 2
    },
    {
      id: 'math-5',
      question: 'For a function $f(x, y)$ to have a local minimum at critical point $(a, b)$, the conditions on Hessian elements $r = f_{xx}, s = f_{xy}, t = f_{yy}$ are:',
      options: [
        { label: 'A', text: '$rt - s^2 > 0$ and $r > 0$', correct: true },
        { label: 'B', text: '$rt - s^2 > 0$ and $r < 0$', correct: false },
        { label: 'C', text: '$rt - s^2 < 0$', correct: false },
        { label: 'D', text: '$rt - s^2 = 0$', correct: false }
      ],
      explanation: 'If discriminant $\\Delta = rt - s^2 > 0$, the point is an extremum: $r > 0$ gives a Local Minimum, while $r < 0$ gives a Local Maximum. If $rt - s^2 < 0$, it is a Saddle Point.',
      marks: 3
    }
  ]
};

function renderMathText(text) {
  if (!text) return '';
  return text.replace(/\$([^$]+)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { throwOnError: false, displayMode: false });
    } catch {
      return math;
    }
  });
}

export default function ExamQuizModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeSubject, setActiveSubject] = useState('BEEE');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const questions = QUIZ_DATABASE[activeSubject] || QUIZ_DATABASE['BEEE'];
  const currentQuestion = questions[currentQIndex];

  const handleSelectOption = (qId, optionIdx) => {
    if (selectedAnswers[qId] !== undefined) return; // already answered
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setShowExplanation(selectedAnswers[questions[currentQIndex + 1]?.id] !== undefined);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQIndex(0);
    setShowExplanation(false);
    setIsFinished(false);
  };

  // Score computation
  const scoreData = useMemo(() => {
    let earned = 0;
    let total = 0;
    questions.forEach(q => {
      total += q.marks;
      const userChoice = selectedAnswers[q.id];
      if (userChoice !== undefined && q.options[userChoice]?.correct) {
        earned += q.marks;
      }
    });
    const percentage = total > 0 ? Math.round((earned / total) * 100) : 0;
    return { earned, total, percentage };
  }, [selectedAnswers, questions]);

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(3, 5, 12, 0.88)',
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
          maxWidth: '860px',
          maxHeight: '92vh',
          background: 'rgba(9, 13, 24, 0.96)',
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
            background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.08), rgba(168, 85, 247, 0.08))'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(0, 240, 255, 0.15)',
                border: '1px solid var(--neon-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--neon-cyan)'
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
                  AI Active-Recall University Mock Exam
                </h3>
                <span style={{ background: 'rgba(0, 240, 255, 0.12)', border: '1px solid var(--neon-cyan)', color: 'var(--neon-cyan)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 700 }}>
                  Exam Pattern 2026
                </span>
              </div>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Test your conceptual and numerical mastery with instant step-marking and derivations.
              </p>
            </div>
          </div>

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

        {/* SUBJECT SELECTOR BAR */}
        <div 
          style={{
            padding: '12px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(5, 8, 16, 0.6)',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            {Object.keys(QUIZ_DATABASE).map(sub => (
              <button
                key={sub}
                type="button"
                onClick={() => {
                  setActiveSubject(sub);
                  handleReset();
                }}
                style={{
                  padding: '6px 14px',
                  borderRadius: '16px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: activeSubject === sub ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  border: activeSubject === sub ? '1px solid var(--neon-cyan)' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: activeSubject === sub ? 'var(--neon-cyan)' : 'var(--text-dim)',
                  transition: 'all 0.15s'
                }}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Progress Indicator */}
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Question {currentQIndex + 1} of {questions.length}</span>
            <span style={{ color: 'var(--neon-green)', fontWeight: 700 }}>
              Score: {scoreData.earned} / {scoreData.total} Marks
            </span>
          </div>
        </div>

        {/* QUIZ CONTENT BODY */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {!isFinished ? (
            <div>
              {/* Question Box */}
              <div 
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  marginBottom: '20px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--neon-cyan)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    QUESTION {currentQIndex + 1} • {currentQuestion.marks} MARKS
                  </span>
                  <span style={{ fontSize: '0.74rem', color: '#fbbf24', fontWeight: 700 }}>
                    {activeSubject} University Paper
                  </span>
                </div>
                <h4 
                  style={{ fontSize: '1.05rem', color: '#fff', margin: 0, lineHeight: 1.5, fontWeight: 700 }}
                  dangerouslySetInnerHTML={{ __html: renderMathText(currentQuestion.question) }}
                />
              </div>

              {/* Multiple Choice Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === idx;
                  const isAnswered = selectedAnswers[currentQuestion.id] !== undefined;
                  const isCorrect = opt.correct;

                  let borderColor = 'rgba(255, 255, 255, 0.1)';
                  let bgColor = 'rgba(255, 255, 255, 0.02)';
                  let badgeColor = 'var(--text-dim)';

                  if (isAnswered) {
                    if (isCorrect) {
                      borderColor = '#10b981';
                      bgColor = 'rgba(16, 185, 129, 0.15)';
                      badgeColor = '#10b981';
                    } else if (isSelected) {
                      borderColor = '#f43f5e';
                      bgColor = 'rgba(244, 63, 94, 0.15)';
                      badgeColor = '#f43f5e';
                    }
                  } else if (isSelected) {
                    borderColor = 'var(--neon-cyan)';
                    bgColor = 'rgba(0, 240, 255, 0.1)';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(currentQuestion.id, idx)}
                      style={{
                        padding: '14px 18px',
                        borderRadius: '10px',
                        background: bgColor,
                        border: `1.5px solid ${borderColor}`,
                        color: '#fff',
                        textAlign: 'left',
                        cursor: isAnswered ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span 
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.82rem',
                            fontWeight: 800,
                            color: badgeColor,
                            flexShrink: 0
                          }}
                        >
                          {opt.label}
                        </span>
                        <span 
                          style={{ fontSize: '0.92rem', color: '#e2e8f0', lineHeight: 1.4 }}
                          dangerouslySetInnerHTML={{ __html: renderMathText(opt.text) }}
                        />
                      </div>

                      {isAnswered && (
                        <div>
                          {isCorrect && <CheckCircle2 size={18} color="#10b981" />}
                          {!isCorrect && isSelected && <XCircle size={18} color="#f43f5e" />}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Callout */}
              {showExplanation && (
                <div 
                  style={{
                    marginTop: '20px',
                    padding: '14px 18px',
                    borderRadius: '10px',
                    background: selectedAnswers[currentQuestion.id] !== undefined && currentQuestion.options[selectedAnswers[currentQuestion.id]]?.correct 
                      ? 'rgba(16, 185, 129, 0.08)' 
                      : 'rgba(244, 63, 94, 0.08)',
                    border: selectedAnswers[currentQuestion.id] !== undefined && currentQuestion.options[selectedAnswers[currentQuestion.id]]?.correct 
                      ? '1px solid rgba(16, 185, 129, 0.3)' 
                      : '1px solid rgba(244, 63, 94, 0.3)',
                    animation: 'fadeIn 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <ShieldCheck size={16} color="var(--neon-cyan)" />
                    <strong style={{ color: '#fff', fontSize: '0.85rem' }}>University Marking & Step Derivation:</strong>
                  </div>
                  <p 
                    style={{ margin: 0, fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.55 }}
                    dangerouslySetInnerHTML={{ __html: renderMathText(currentQuestion.explanation) }}
                  />
                </div>
              )}
            </div>
          ) : (
            /* FINISHED REPORT CARD */
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>
                {scoreData.percentage >= 80 ? '🏆' : scoreData.percentage >= 60 ? '🎓' : '📚'}
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', margin: '0 0 8px 0' }}>
                {scoreData.percentage >= 80 ? 'University Topper Grade (Distinction)!' : scoreData.percentage >= 60 ? 'First Class Pass!' : 'Good Effort! Keep Revising'}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', maxWidth: '480px', margin: '0 auto 24px auto' }}>
                You scored <strong>{scoreData.earned} out of {scoreData.total} marks ({scoreData.percentage}%)</strong> in {activeSubject}.
              </p>

              <div style={{ display: 'inline-flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    background: 'linear-gradient(135deg, #00f0ff 0%, #2563eb 100%)',
                    color: '#040711',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <RotateCcw size={16} /> Retake Exam
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer'
                  }}
                >
                  Close & Review Notes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER CONTROLS */}
        {!isFinished && (
          <div 
            style={{
              padding: '14px 24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(5, 8, 16, 0.8)'
            }}
          >
            <button
              type="button"
              onClick={handleReset}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dim)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <RotateCcw size={14} /> Restart Section
            </button>

            <button
              type="button"
              disabled={selectedAnswers[currentQuestion.id] === undefined}
              onClick={handleNext}
              style={{
                background: selectedAnswers[currentQuestion.id] === undefined ? 'rgba(255, 255, 255, 0.08)' : 'linear-gradient(135deg, #00f0ff 0%, #2563eb 100%)',
                color: selectedAnswers[currentQuestion.id] === undefined ? '#64748b' : '#040711',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.84rem',
                cursor: selectedAnswers[currentQuestion.id] === undefined ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{currentQIndex < questions.length - 1 ? 'Next Question' : 'View Exam Grade'}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
