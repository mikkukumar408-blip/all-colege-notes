/* =========================================================================
   EXPECTED UNIVERSITY QUESTION PAPERS HUB (ExpectedQuestionPapers.jsx)
   =========================================================================
   Features:
   1. Strictly Syllabus-Mapped University Question Papers (MMDU / Technical Univ).
   2. Exact University Exam Pattern:
      - 3 Hours Time Allowed | 60 Max Marks | 24 Passing Cutoff
      - Section A: Q1 Compulsory (10 Questions x 2 Marks = 20 Marks across Units 1-4)
      - Section B: 4 Units with Internal Choice (4 Units x 10 Marks = 40 Marks)
   3. Dual-Mode Reading:
      - Exam Hall Practice Mode (Paper Only)
      - Answer Key & Marking Scheme Mode (Model Answers + Step-by-Step Marks)
   4. Real-time 3-Hour Interactive Exam Countdown Timer
   5. Direct Print / Save as PDF capability for offline practice
   6. Search & Filters by Academic Year (1st-4th) and Semester (1-8)
   ========================================================================= */

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  ClipboardCheck, 
  Search, 
  Clock, 
  Award, 
  CheckCircle, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  Printer, 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  FileText, 
  Layers, 
  ChevronRight, 
  CheckCircle2, 
  Zap, 
  Flame, 
  BookOpen, 
  Compass, 
  Share2, 
  AlertCircle 
} from 'lucide-react';
import { expectedQuestionPapers } from '../data/questionPapersData';
import { logUserActivity } from '../utils/activityTracker';

const YEARS = ['All Years', '1st Year', '2nd Year', '3rd Year', '4th Year'];

const YEAR_CONFIG = {
  '1st Year': {
    label: '1st Year',
    semesters: [
      { id: 'Semester 1', num: 1, title: 'Semester 1', subtitle: 'BEEE, Calculus (Math I), C Programming, AI & ML, Web Tech' },
      { id: 'Semester 2', num: 2, title: 'Semester 2', subtitle: 'Applied Physics, Python Programming, Data Structures, Math II' }
    ]
  },
  '2nd Year': {
    label: '2nd Year',
    semesters: [
      { id: 'Semester 3', num: 3, title: 'Semester 3', subtitle: 'Data Structures, DLD, Object Oriented Programming' },
      { id: 'Semester 4', num: 4, title: 'Semester 4', subtitle: 'Operating Systems, DBMS, Theory of Computation' }
    ]
  },
  '3rd Year': {
    label: '3rd Year',
    semesters: [
      { id: 'Semester 5', num: 5, title: 'Semester 5', subtitle: 'Computer Networks, Software Engineering' },
      { id: 'Semester 6', num: 6, title: 'Semester 6', subtitle: 'Compiler Design, Machine Learning' }
    ]
  },
  '4th Year': {
    label: '4th Year',
    semesters: [
      { id: 'Semester 7', num: 7, title: 'Semester 7', subtitle: 'Cloud Computing, Cyber Security' },
      { id: 'Semester 8', num: 8, title: 'Semester 8', subtitle: 'Major Project & Capstone' }
    ]
  }
};

export default function ExpectedQuestionPapers({ currentUser }) {
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePaper, setActivePaper] = useState(null);
  const [viewMode, setViewMode] = useState('solutions'); // 'questions-only' | 'solutions'
  const [revealedAnswers, setRevealedAnswers] = useState({});

  // 3-Hour Exam Timer State
  const [timerSeconds, setTimerSeconds] = useState(3 * 3600);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTimerRunning(false);
            alert("⏰ TIME IS UP! 3-Hour University Examination simulation has completed. Please review your answers against the marking scheme.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const formatTimer = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleOpenPaper = (paper, mode = 'solutions') => {
    setActivePaper(paper);
    setViewMode(mode);
    setRevealedAnswers({});
    setTimerSeconds(3 * 3600);
    setIsTimerRunning(false);
    logUserActivity(currentUser?.username || 'Guest', 'VIEW_QUESTION_PAPER', `${paper.code} - ${paper.subject}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleSingleAnswer = (qKey) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [qKey]: !prev[qKey]
    }));
  };

  // Filter Papers
  const filteredPapers = expectedQuestionPapers.filter(paper => {
    const matchesYear = selectedYear === 'All Years' || paper.year === selectedYear;
    const matchesSemester = selectedSemester === 'All' || paper.semester === selectedSemester;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      paper.subject.toLowerCase().includes(query) ||
      paper.code.toLowerCase().includes(query) ||
      paper.course.toLowerCase().includes(query) ||
      paper.instructions.some(i => i.toLowerCase().includes(query));
    return matchesYear && matchesSemester && matchesSearch;
  });

  return (
    <div className="section-container animate-fade-in" style={{ paddingBottom: '80px' }}>
      {/* -------------------------------------------------------------------
         HEADER & HERO BANNER
         ------------------------------------------------------------------- */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '30px 24px', 
          marginBottom: '26px',
          background: 'linear-gradient(135deg, rgba(7, 15, 30, 0.95) 0%, rgba(13, 27, 62, 0.85) 100%)',
          border: '1.5px solid rgba(0, 240, 255, 0.35)',
          boxShadow: '0 8px 32px rgba(0, 240, 255, 0.12)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge-neon" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <ClipboardCheck size={13} style={{ marginRight: '4px' }} />
                2026 Examination Blueprint
              </span>
              <span style={{ 
                fontSize: '0.75rem', 
                background: 'rgba(16, 185, 129, 0.15)', 
                color: '#10b981', 
                border: '1px solid #10b981', 
                padding: '2px 8px', 
                borderRadius: '6px', 
                fontWeight: 700 
              }}>
                100% Syllabus-Mapped
              </span>
              <span style={{ 
                fontSize: '0.75rem', 
                background: 'rgba(245, 158, 11, 0.15)', 
                color: '#f59e0b', 
                border: '1px solid #f59e0b', 
                padding: '2px 8px', 
                borderRadius: '6px', 
                fontWeight: 700 
              }}>
                Exact MMDU Pattern
              </span>
            </div>

            <h1 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#fff', margin: '4px 0 10px 0', letterSpacing: '-0.02em' }}>
              Expected University Question Papers
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.96rem', maxWidth: '820px', lineHeight: 1.6, margin: 0 }}>
              Practice end-semester examinations with strictly syllabus-based predicted papers. Every paper follows the exact university format: 
              <strong style={{ color: '#38bdf8' }}> Section A (10 × 2 = 20M Compulsory)</strong> and 
              <strong style={{ color: '#38bdf8' }}> Section B (4 Units × 10M = 40M Choice)</strong> with step-by-step model answers, derivations, and official marking rubrics.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{
              background: 'rgba(0, 240, 255, 0.08)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              padding: '12px 18px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--neon-cyan)' }}>
                {expectedQuestionPapers.length}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Full Papers Ready
              </div>
            </div>
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              padding: '12px 18px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#10b981' }}>
                60 M
              </div>
              <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Total Marks
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Banner */}
        <div style={{ 
          marginTop: '20px', 
          paddingTop: '16px', 
          borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '14px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#cbd5e1' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(0, 240, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-cyan)' }}>
              📝
            </div>
            <span><strong>Dual Mode:</strong> Hall Exam vs Answer Key</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#cbd5e1' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
              ⏱️
            </div>
            <span><strong>3-Hour Live Timer:</strong> Realistic countdown clock</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#cbd5e1' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
              🎯
            </div>
            <span><strong>Marking Rubrics:</strong> Step-by-step score scheme</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#cbd5e1' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(192, 132, 252, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
              🖨️
            </div>
            <span><strong>Print &amp; PDF:</strong> Clean print-formatted papers</span>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------
         FILTERS & SEARCH BAR
         ------------------------------------------------------------------- */}
      <div className="glass-panel" style={{ padding: '18px 22px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Year Buttons */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {YEARS.map(year => (
              <button
                key={year}
                onClick={() => {
                  setSelectedYear(year);
                  setSelectedSemester('All');
                }}
                className={selectedYear === year ? 'btn-primary' : 'btn-secondary'}
                style={{ 
                  fontSize: '0.82rem', 
                  padding: '7px 14px',
                  borderRadius: '8px'
                }}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '260px', flex: 1, maxWidth: '400px' }}>
            <Search 
              size={16} 
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
            />
            <input
              type="text"
              placeholder="Search by subject or code (e.g. BELE-001, AI, Math)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="cyber-input"
              style={{ 
                width: '100%', 
                paddingLeft: '36px', 
                fontSize: '0.86rem', 
                paddingTop: '8px', 
                paddingBottom: '8px' 
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Semester Sub-Filter when a specific year is picked */}
        {selectedYear !== 'All Years' && YEAR_CONFIG[selectedYear] && (
          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Filter Semester:</span>
            <button
              onClick={() => setSelectedSemester('All')}
              className={selectedSemester === 'All' ? 'btn-primary' : 'btn-secondary'}
              style={{ fontSize: '0.78rem', padding: '5px 12px', borderRadius: '6px' }}
            >
              All Semesters
            </button>
            {YEAR_CONFIG[selectedYear].semesters.map(sem => (
              <button
                key={sem.id}
                onClick={() => setSelectedSemester(sem.id)}
                className={selectedSemester === sem.id ? 'btn-primary' : 'btn-secondary'}
                style={{ fontSize: '0.78rem', padding: '5px 12px', borderRadius: '6px' }}
              >
                {sem.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* -------------------------------------------------------------------
         PAPERS GRID CARDS
         ------------------------------------------------------------------- */}
      {filteredPapers.length === 0 ? (
        <div className="glass-panel" style={{ padding: '60px 24px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '16px' }}>
            No expected question papers found matching your criteria.
          </p>
          <button 
            onClick={() => { setSelectedYear('All Years'); setSelectedSemester('All'); setSearchQuery(''); }}
            className="btn-primary" 
            style={{ padding: '10px 24px' }}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '22px' }}>
          {filteredPapers.map(paper => (
            <div
              key={paper.id}
              className="glass-panel card-hover"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1.5px solid rgba(0, 240, 255, 0.25)',
                background: 'linear-gradient(135deg, rgba(7, 15, 30, 0.9) 0%, rgba(10, 24, 52, 0.75) 100%)',
                borderRadius: '14px',
                gap: '16px',
                transition: 'all 0.25s ease'
              }}
            >
              <div>
                {/* Top Badge Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                  <div>
                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: 'rgba(0, 240, 255, 0.15)',
                      color: 'var(--neon-cyan)',
                      border: '1px solid rgba(0, 240, 255, 0.35)',
                      letterSpacing: '0.04em'
                    }}>
                      {paper.code}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: '#94a3b8', marginLeft: '8px', fontWeight: 600 }}>
                      {paper.semester} • {paper.year}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#10b981',
                    border: '1px solid rgba(16, 185, 129, 0.4)'
                  }}>
                    {paper.probability}
                  </span>
                </div>

                {/* Subject Title */}
                <h3 style={{ fontSize: '1.24rem', fontWeight: 800, color: '#fff', marginTop: '12px', marginBottom: '4px', lineHeight: 1.35 }}>
                  {paper.subject}
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '14px' }}>
                  {paper.university}
                </div>

                {/* Exam Specs Box */}
                <div style={{
                  background: 'rgba(4, 8, 16, 0.65)',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#cbd5e1' }}>
                    <span>⏱️ Time: <strong style={{ color: '#fff' }}>{paper.timeAllowed}</strong></span>
                    <span>📊 Total: <strong style={{ color: 'var(--neon-cyan)' }}>{paper.maxMarks} Marks</strong></span>
                    <span>🎯 Passing: <strong style={{ color: '#10b981' }}>{paper.passingMarks} M (40%)</strong></span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={13} color="#10b981" />
                    <span><strong>Section A:</strong> 10 Compulsory Short Qs (20M)</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={13} color="#10b981" />
                    <span><strong>Section B:</strong> 4 Units with Internal Choice (40M)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleOpenPaper(paper, 'solutions')}
                  className="btn-review-glow"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '0.84rem',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontWeight: 700
                  }}
                >
                  <Eye size={15} /> Model Answers
                </button>
                <button
                  onClick={() => handleOpenPaper(paper, 'questions-only')}
                  className="btn-secondary"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '0.84rem',
                    padding: '10px 12px',
                    borderRadius: '8px'
                  }}
                >
                  <Clock size={15} /> Hall Mode
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* -------------------------------------------------------------------
         EXAM PAPER VIEWER MODAL (AUTHENTIC UNIVERSITY EXAMINATION EXPERIENCE)
         ------------------------------------------------------------------- */}
      {activePaper && createPortal(
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(3, 6, 12, 0.95)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px'
          }}
          onClick={() => setActivePaper(null)}
        >
          <div
            className="glass-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '1000px',
              height: '92vh',
              maxHeight: '940px',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '16px',
              border: '2px solid var(--neon-cyan)',
              background: '#090e17',
              boxShadow: '0 0 60px rgba(0, 240, 255, 0.25)',
              overflow: 'hidden'
            }}
          >
            {/* Modal Control Bar (Non-Printable) */}
            <div 
              className="no-print"
              style={{
                padding: '12px 20px',
                background: 'linear-gradient(90deg, #070f1e 0%, #0d1f3d 100%)',
                borderBottom: '1px solid rgba(0, 240, 255, 0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px'
              }}
            >
              {/* Left: Mode Switcher */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setViewMode('questions-only')}
                  className={viewMode === 'questions-only' ? 'btn-primary' : 'btn-secondary'}
                  style={{ 
                    fontSize: '0.78rem', 
                    padding: '6px 12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '5px',
                    background: viewMode === 'questions-only' ? 'var(--neon-cyan)' : 'rgba(15, 23, 42, 0.9)',
                    color: viewMode === 'questions-only' ? '#040711' : '#f1f5f9',
                    border: viewMode === 'questions-only' ? '1px solid var(--neon-cyan)' : '1px solid rgba(0, 240, 255, 0.35)',
                    fontWeight: 700
                  }}
                >
                  <Clock size={13} />
                  <span>Exam Hall View</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('solutions')}
                  className={viewMode === 'solutions' ? 'btn-review-glow' : 'btn-secondary'}
                  style={{ 
                    fontSize: '0.78rem', 
                    padding: '6px 12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '5px',
                    background: viewMode === 'solutions' 
                      ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.25), rgba(157, 78, 221, 0.35))' 
                      : 'rgba(15, 23, 42, 0.9)',
                    color: viewMode === 'solutions' ? '#00f0ff' : '#f1f5f9',
                    border: viewMode === 'solutions' ? '1.5px solid #00f0ff' : '1px solid rgba(0, 240, 255, 0.35)',
                    fontWeight: 700
                  }}
                >
                  <Eye size={13} />
                  <span>Solutions &amp; Marking Scheme</span>
                </button>
              </div>

              {/* Middle: 3-Hour Exam Timer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0, 0, 0, 0.5)',
                padding: '4px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(0, 240, 255, 0.25)'
              }}>
                <Clock size={14} color="var(--neon-cyan)" />
                <span style={{ 
                  fontFamily: 'monospace', 
                  fontSize: '0.94rem', 
                  fontWeight: 800, 
                  color: timerSeconds < 900 ? '#ef4444' : 'var(--neon-cyan)',
                  letterSpacing: '0.05em' 
                }}>
                  {formatTimer(timerSeconds)}
                </span>
                <button
                  type="button"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: isTimerRunning ? '#f59e0b' : '#10b981',
                    cursor: 'pointer',
                    padding: '2px 4px'
                  }}
                  title={isTimerRunning ? 'Pause Timer' : 'Start 3-Hour Exam Clock'}
                >
                  {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(3 * 3600);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    padding: '2px 4px'
                  }}
                  title="Reset Timer to 03:00:00"
                >
                  <RotateCcw size={13} />
                </button>
              </div>

              {/* Right: Print & Close */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn-secondary"
                  style={{ 
                    fontSize: '0.78rem', 
                    padding: '6px 12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '5px',
                    background: 'rgba(0, 240, 255, 0.15)',
                    color: 'var(--neon-cyan)',
                    border: '1px solid rgba(0, 240, 255, 0.4)',
                    fontWeight: 700
                  }}
                  title="Print Question Paper or Save as PDF"
                >
                  <Printer size={13} />
                  <span>Print / PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActivePaper(null)}
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
                  title="Close Paper"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Scrollable Examination Paper Sheet */}
            <div 
              className="paper-scroll-area"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '28px 36px',
                background: '#070b13',
                color: '#e2e8f0',
                lineHeight: 1.6
              }}
            >
              {/* AUTHENTIC UNIVERSITY EXAMINATION HEADER */}
              <div style={{
                textAlign: 'center',
                paddingBottom: '16px',
                marginBottom: '20px',
                borderBottom: '2px solid rgba(255, 255, 255, 0.25)'
              }}>
                {/* Roll Number Box (Authentic Exam Sheet Look) */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#94a3b8'
                  }}>
                    <span>Roll No.</span>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(10)].map((_, i) => (
                        <div 
                          key={i} 
                          style={{
                            width: '20px',
                            height: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            borderRadius: '2px',
                            background: 'rgba(255, 255, 255, 0.04)'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.1em', color: '#94a3b8', textTransform: 'uppercase' }}>
                  {activePaper.university}
                </div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fff', margin: '4px 0', letterSpacing: '0.02em' }}>
                  B.Tech. END-SEMESTER EXAMINATION, 2026
                </h2>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--neon-cyan)', marginTop: '4px' }}>
                  {activePaper.code} : {activePaper.subject.toUpperCase()}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '2px' }}>
                  ({activePaper.course} — {activePaper.year}, {activePaper.semester})
                </div>

                {/* Exam Meta Info Bar */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '16px',
                  padding: '8px 16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                  fontSize: '0.88rem',
                  fontWeight: 700
                }}>
                  <span>Time Allowed: <strong style={{ color: '#fff' }}>{activePaper.timeAllowed}</strong></span>
                  <span>Maximum Marks: <strong style={{ color: 'var(--neon-cyan)' }}>{activePaper.maxMarks}</strong></span>
                  <span>Passing Marks: <strong style={{ color: '#10b981' }}>{activePaper.passingMarks} (40%)</strong></span>
                </div>
              </div>

              {/* Instructions Section */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.65)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                borderRadius: '8px',
                padding: '12px 18px',
                marginBottom: '26px'
              }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--neon-cyan)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  General Instructions to Candidates:
                </div>
                <ol style={{ margin: 0, paddingLeft: '18px', fontSize: '0.82rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {activePaper.instructions.map((inst, idx) => (
                    <li key={idx}>{inst}</li>
                  ))}
                </ol>
              </div>

              {/* =============================================================
                 SECTION A (COMPULSORY - 20 MARKS)
                 ============================================================= */}
              <div style={{ marginBottom: '36px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.15) 0%, rgba(0, 240, 255, 0.03) 100%)',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  borderLeft: '4px solid var(--neon-cyan)',
                  marginBottom: '16px'
                }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 900, color: '#fff' }}>
                      {activePaper.sectionA.title}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                      {activePaper.sectionA.note}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--neon-cyan)' }}>
                    [{activePaper.sectionA.marks} Marks]
                  </span>
                </div>

                {/* 10 Sub-questions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {activePaper.sectionA.questions.map((q, idx) => {
                    const qKey = `secA_${idx}`;
                    const showAnswer = viewMode === 'solutions' || revealedAnswers[qKey];

                    return (
                      <div 
                        key={idx}
                        style={{
                          background: 'rgba(15, 23, 42, 0.45)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '8px',
                          padding: '14px 18px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', flex: 1 }}>
                            <span style={{ 
                              fontWeight: 800, 
                              color: 'var(--neon-cyan)', 
                              fontSize: '0.9rem', 
                              minWidth: '55px', 
                              paddingTop: '1px' 
                            }}>
                              {q.qNum}
                            </span>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '0.92rem', color: '#f1f5f9', fontWeight: 600, lineHeight: 1.5 }}>
                                {q.question}
                              </div>
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 6px', borderRadius: '4px', color: '#94a3b8' }}>
                                  {q.unit}
                                </span>
                                {q.expectedFrequency && (
                                  <span style={{ fontSize: '0.72rem', background: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                                    ⚡ {q.expectedFrequency}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#fff', background: 'rgba(255, 255, 255, 0.08)', padding: '2px 8px', borderRadius: '4px' }}>
                              [{q.marks}M]
                            </span>
                            {viewMode === 'questions-only' && (
                              <button
                                type="button"
                                onClick={() => toggleSingleAnswer(qKey)}
                                style={{
                                  background: 'none',
                                  border: '1px solid rgba(0, 240, 255, 0.3)',
                                  borderRadius: '6px',
                                  color: 'var(--neon-cyan)',
                                  padding: '4px 8px',
                                  fontSize: '0.74rem',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                {showAnswer ? <EyeOff size={12} /> : <Eye size={12} />}
                                <span>{showAnswer ? 'Hide' : 'Answer'}</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Model Solution Box */}
                        {showAnswer && (
                          <div style={{
                            marginTop: '12px',
                            paddingTop: '12px',
                            borderTop: '1px dashed rgba(16, 185, 129, 0.3)',
                            background: 'rgba(6, 78, 59, 0.12)',
                            borderRadius: '6px',
                            padding: '12px 14px'
                          }}>
                            <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <CheckCircle2 size={13} color="#10b981" />
                              <span>Model Answer &amp; Key Points:</span>
                            </div>
                            <div style={{ fontSize: '0.86rem', color: '#e2e8f0', whiteSpace: 'pre-line', lineHeight: 1.55 }}>
                              {q.modelAnswer}
                            </div>

                            {/* Marking Scheme Points */}
                            {q.keyMarkingPoints && q.keyMarkingPoints.length > 0 && (
                              <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                                <div style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 700, marginBottom: '4px' }}>
                                  🎯 Marking Scheme Rubric:
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                  {q.keyMarkingPoints.map((pt, pIdx) => (
                                    <span key={pIdx} style={{ fontSize: '0.74rem', background: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: '4px', color: '#cbd5e1', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                                      ✓ {pt}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* =============================================================
                 SECTION B (UNIT-WISE LONG QUESTIONS - 40 MARKS)
                 ============================================================= */}
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.03) 100%)',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  borderLeft: '4px solid #10b981',
                  marginBottom: '20px'
                }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 900, color: '#fff' }}>
                      {activePaper.sectionB.title}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                      {activePaper.sectionB.note}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#10b981' }}>
                    [{activePaper.sectionB.marks} Marks]
                  </span>
                </div>

                {/* 4 Units */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                  {activePaper.sectionB.units.map((unitItem, uIdx) => (
                    <div 
                      key={uIdx}
                      style={{
                        background: 'rgba(15, 23, 42, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Unit Title Bar */}
                      <div style={{
                        padding: '10px 18px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{
                            fontSize: '0.78rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            background: 'rgba(0, 240, 255, 0.15)',
                            color: 'var(--neon-cyan)'
                          }}>
                            {unitItem.unitNumber}
                          </span>
                          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                            {unitItem.syllabusTopic}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.76rem', color: '#94a3b8', fontStyle: 'italic' }}>
                          Attempt Any ONE Question (10 Marks)
                        </span>
                      </div>

                      {/* Questions within the Unit (Choice 1 vs Choice 2) */}
                      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        {unitItem.questions.map((q, qIdx) => {
                          const isOr = qIdx > 0;

                          return (
                            <React.Fragment key={qIdx}>
                              {isOr && (
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  margin: '4px 0'
                                }}>
                                  <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.15)', flex: 1 }} />
                                  <span style={{
                                    padding: '2px 14px',
                                    fontSize: '0.8rem',
                                    fontWeight: 900,
                                    color: '#f59e0b',
                                    background: 'rgba(245, 158, 11, 0.12)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(245, 158, 11, 0.3)',
                                    letterSpacing: '0.1em'
                                  }}>
                                    OR
                                  </span>
                                  <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.15)', flex: 1 }} />
                                </div>
                              )}

                              <div style={{
                                background: 'rgba(7, 12, 22, 0.6)',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                borderRadius: '8px',
                                padding: '14px 16px'
                              }}>
                                {/* Question Title */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                  <span style={{ fontWeight: 800, fontSize: '0.94rem', color: isOr ? '#f59e0b' : 'var(--neon-cyan)' }}>
                                    {q.qNum}
                                  </span>
                                  <span style={{ fontWeight: 800, fontSize: '0.86rem', color: '#fff', background: 'rgba(255, 255, 255, 0.08)', padding: '2px 8px', borderRadius: '4px' }}>
                                    [{q.marks} Marks]
                                  </span>
                                </div>

                                {/* Sub-parts (a), (b), etc. */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                  {q.subParts.map((sub, sIdx) => {
                                    const subKey = `u${uIdx}_q${qIdx}_s${sIdx}`;
                                    const showSubAnswer = viewMode === 'solutions' || revealedAnswers[subKey];

                                    return (
                                      <div key={sIdx} style={{ paddingLeft: '8px', borderLeft: '2px solid rgba(0, 240, 255, 0.25)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                                          <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '0.9rem', color: '#f1f5f9', fontWeight: 600, lineHeight: 1.5 }}>
                                              <strong style={{ color: 'var(--neon-cyan)', marginRight: '6px' }}>{sub.part}</strong>
                                              {sub.question}
                                            </div>
                                          </div>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8' }}>
                                              [{sub.marks}M]
                                            </span>
                                            {viewMode === 'questions-only' && (
                                              <button
                                                type="button"
                                                onClick={() => toggleSingleAnswer(subKey)}
                                                style={{
                                                  background: 'none',
                                                  border: '1px solid rgba(0, 240, 255, 0.3)',
                                                  borderRadius: '4px',
                                                  color: 'var(--neon-cyan)',
                                                  padding: '2px 6px',
                                                  fontSize: '0.72rem',
                                                  cursor: 'pointer'
                                                }}
                                              >
                                                {showSubAnswer ? 'Hide' : 'Solution'}
                                              </button>
                                            )}
                                          </div>
                                        </div>

                                        {/* Step-by-Step Solution & Marking Scheme */}
                                        {showSubAnswer && (
                                          <div style={{
                                            marginTop: '10px',
                                            background: 'rgba(6, 78, 59, 0.14)',
                                            border: '1px solid rgba(16, 185, 129, 0.25)',
                                            borderRadius: '6px',
                                            padding: '12px 14px'
                                          }}>
                                            <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                              <CheckCircle2 size={13} color="#10b981" />
                                              <span>Step-by-Step Solution:</span>
                                            </div>
                                            <div style={{ fontSize: '0.85rem', color: '#e2e8f0', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                                              {sub.solution}
                                            </div>

                                            {/* Marking Scheme */}
                                            {sub.markingScheme && (
                                              <div style={{
                                                marginTop: '10px',
                                                paddingTop: '8px',
                                                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                                                fontSize: '0.74rem',
                                                color: '#f59e0b',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                              }}>
                                                <span>🎯 <strong>Official Rubric:</strong> {sub.markingScheme}</span>
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* End of Examination Watermark */}
              <div style={{
                textAlign: 'center',
                margin: '40px 0 20px 0',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#64748b',
                fontSize: '0.82rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}>
                *** END OF QUESTION PAPER — ALL THE BEST ***
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
