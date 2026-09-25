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
import { MathText, MathFormula } from '../utils/mathRenderer';
import { triggerUniversalPrint } from '../utils/printHelper';

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

// =========================================================================
// EXAMINATION BLUEPRINT CONFIGURATION (SESSIONAL-I, SESSIONAL-II, END-SEM)
// =========================================================================
export const EXAM_TYPES = {
  'sessional-1': {
    id: 'sessional-1',
    name: 'Sessional Exam - I',
    shortTitle: 'Sessional-I (Mid-Term)',
    paperTitle: 'B.Tech. SESSIONAL EXAMINATION - I (MID-TERM), 2026',
    dateBadge: '🔥 Happening This 28th–30th',
    syllabusTag: 'Unit - I & Unit - II Only',
    unitsAllowed: ['Unit 1', 'Unit 2', 'UNIT I', 'UNIT II'],
    allowedUnitNumbers: ['UNIT I', 'UNIT II'],
    timeAllowed: '1 Hour 30 Minutes',
    timerSeconds: 90 * 60, // 5400s
    maxMarks: 30,
    passingMarks: 12,
    secAMarks: 10,
    secBMarks: 20,
    color: '#f59e0b',
    border: 'rgba(245, 158, 11, 0.45)',
    bg: 'rgba(245, 158, 11, 0.12)',
    description: 'Scheduled on Sept 28th – 30th. Strictly covers Unit-I & Unit-II syllabus.'
  },
  'sessional-2': {
    id: 'sessional-2',
    name: 'Sessional Exam - II',
    shortTitle: 'Sessional-II (Mid-Term)',
    paperTitle: 'B.Tech. SESSIONAL EXAMINATION - II (MID-TERM), 2026',
    dateBadge: '📘 Mid-Term 2',
    syllabusTag: 'Unit - III & Unit - IV Only',
    unitsAllowed: ['Unit 3', 'Unit 4', 'UNIT III', 'UNIT IV'],
    allowedUnitNumbers: ['UNIT III', 'UNIT IV'],
    timeAllowed: '1 Hour 30 Minutes',
    timerSeconds: 90 * 60, // 5400s
    maxMarks: 30,
    passingMarks: 12,
    secAMarks: 10,
    secBMarks: 20,
    color: '#a78bfa',
    border: 'rgba(167, 139, 250, 0.45)',
    bg: 'rgba(167, 139, 250, 0.12)',
    description: 'Upcoming mid-term evaluation. Strictly covers Unit-III & Unit-IV syllabus.'
  },
  'end-sem': {
    id: 'end-sem',
    name: 'End-Semester Examination',
    shortTitle: 'End-Semester (Finals)',
    paperTitle: 'B.Tech. END-SEMESTER UNIVERSITY EXAMINATION, 2026',
    dateBadge: '🏛️ University Finals',
    syllabusTag: 'Complete Syllabus (Units I, II, III & IV)',
    unitsAllowed: ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'UNIT I', 'UNIT II', 'UNIT III', 'UNIT IV'],
    allowedUnitNumbers: ['UNIT I', 'UNIT II', 'UNIT III', 'UNIT IV'],
    timeAllowed: '3 Hours',
    timerSeconds: 180 * 60, // 10800s
    maxMarks: 60,
    passingMarks: 24,
    secAMarks: 20,
    secBMarks: 40,
    color: '#00f0ff',
    border: 'rgba(0, 240, 255, 0.45)',
    bg: 'rgba(0, 240, 255, 0.12)',
    description: 'Official university final examination covering 100% syllabus (all 4 units).'
  }
};

// Pure function to generate an exam-specific paper based on selected exam type
export function getExamPaperForType(rawPaper, examType = 'sessional-1') {
  if (!rawPaper) return null;
  const config = EXAM_TYPES[examType] || EXAM_TYPES['sessional-1'];

  if (examType === 'end-sem') {
    return {
      ...rawPaper,
      examType,
      examConfig: config,
      examTitle: config.paperTitle,
      examShortTitle: config.name,
      syllabusTag: config.syllabusTag,
      dateBadge: config.dateBadge,
      timeAllowed: config.timeAllowed,
      maxMarks: config.maxMarks,
      passingMarks: config.passingMarks,
      timerSeconds: config.timerSeconds,
      instructions: rawPaper.instructions,
      sectionA: rawPaper.sectionA,
      sectionB: rawPaper.sectionB
    };
  }

  // Sessional-I (Unit 1 & 2) or Sessional-II (Unit 3 & 4)
  const isSessional1 = examType === 'sessional-1';
  const targetUnits = isSessional1 ? ['unit 1', 'unit 2'] : ['unit 3', 'unit 4'];
  const targetBUnits = isSessional1 ? ['UNIT I', 'UNIT II'] : ['UNIT III', 'UNIT IV'];

  // Filter Section A questions for target units
  const secAFiltered = (rawPaper.sectionA?.questions || []).filter(q => {
    const u = (q.unit || '').toLowerCase();
    return targetUnits.some(tu => u.includes(tu));
  });

  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const formattedSecA = secAFiltered.map((q, idx) => ({
    ...q,
    qNum: `Q1 (${letters[idx] || (idx + 1)})`,
    marks: 2
  }));

  const secAMarks = formattedSecA.length * 2;

  // Filter Section B units
  const secBUnitsFiltered = (rawPaper.sectionB?.units || []).filter(u => {
    const un = (u.unitNumber || '').toUpperCase();
    return targetBUnits.some(tu => un.includes(tu));
  });

  const secBMarks = secBUnitsFiltered.length * 10;
  const totalMarks = secAMarks + secBMarks;

  const instructions = [
    `Question No. 1 in Section A is COMPULSORY and carries ${secAMarks} marks (${config.syllabusTag}).`,
    `Attempt any TWO questions from Section B, selecting ONE question from each Unit (10 marks each).`,
    'Assume suitable missing data if any and state it clearly.',
    'Use of non-programmable scientific calculators is permitted.',
    'Neat, labeled circuit/block diagrams and step-by-step mathematical steps carry significant weightage.'
  ];

  return {
    ...rawPaper,
    examType,
    examConfig: config,
    examTitle: config.paperTitle,
    examShortTitle: config.name,
    syllabusTag: config.syllabusTag,
    dateBadge: config.dateBadge,
    timeAllowed: config.timeAllowed,
    maxMarks: totalMarks || config.maxMarks,
    passingMarks: Math.round((totalMarks || config.maxMarks) * 0.4),
    timerSeconds: config.timerSeconds,
    instructions,
    sectionA: {
      title: `SECTION A (COMPULSORY - ${config.syllabusTag.toUpperCase()})`,
      marks: secAMarks,
      note: `Answer ALL ${formattedSecA.length} questions from ${config.syllabusTag}. Each question carries 2 marks.`,
      questions: formattedSecA
    },
    sectionB: {
      title: `SECTION B (UNIT-WISE LONG QUESTIONS)`,
      marks: secBMarks,
      note: `Attempt ONE question from EACH Unit below. Each question carries 10 marks.`,
      units: secBUnitsFiltered
    }
  };
}

export default function ExpectedQuestionPapers({ currentUser }) {
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePaper, setActivePaper] = useState(null);
  const [viewMode, setViewMode] = useState('solutions'); // 'questions-only' | 'solutions'
  const [revealedAnswers, setRevealedAnswers] = useState({});

  // Active Exam Type State (defaults to sessional-1 since it's happening on 28-30!)
  const [selectedExamType, setSelectedExamType] = useState(() => {
    try {
      return localStorage.getItem('acn_selected_exam_type') || 'sessional-1';
    } catch (e) {
      return 'sessional-1';
    }
  });

  // Initial Exam Selection Modal Dialog (false by default so students land directly on papers)
  const [showExamModal, setShowExamModal] = useState(false);

  // Live Exam Simulation Timer State
  const activeExamConfig = EXAM_TYPES[selectedExamType] || EXAM_TYPES['sessional-1'];
  const [timerSeconds, setTimerSeconds] = useState(activeExamConfig.timerSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (activePaper) {
      document.body.classList.add('exam-paper-modal-active');
    } else {
      document.body.classList.remove('exam-paper-modal-active');
    }
    return () => {
      document.body.classList.remove('exam-paper-modal-active');
    };
  }, [activePaper]);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTimerRunning(false);
            alert(`⏰ TIME IS UP! ${activePaper?.examShortTitle || activeExamConfig.name} simulation has completed. Please review your answers against the marking scheme.`);
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
  }, [isTimerRunning, activePaper, activeExamConfig]);

  const formatTimer = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSelectExamType = (type) => {
    setSelectedExamType(type);
    setShowExamModal(false);
    try {
      localStorage.setItem('acn_selected_exam_type', type);
      localStorage.setItem('acn_has_picked_exam_v2', 'true');
    } catch (e) {}
    if (activePaper) {
      const orig = expectedQuestionPapers.find(p => p.id === activePaper.id);
      if (orig) {
        const formatted = getExamPaperForType(orig, type);
        setActivePaper(formatted);
        setTimerSeconds(formatted.timerSeconds);
        setIsTimerRunning(false);
      }
    }
  };

  const handleOpenPaper = (rawPaper, mode = 'solutions') => {
    const formatted = getExamPaperForType(rawPaper, selectedExamType);
    setActivePaper(formatted);
    setViewMode(mode);
    setRevealedAnswers({});
    setTimerSeconds(formatted.timerSeconds);
    setIsTimerRunning(false);
    logUserActivity(currentUser?.username || 'Guest', 'VIEW_QUESTION_PAPER', `${formatted.code} - ${formatted.subject} (${formatted.examShortTitle})`);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(activePaper?.timerSeconds || activeExamConfig.timerSeconds);
  };

  const handlePrint = () => {
    const title = (activePaper?.paperTitle || 'University_Question_Paper').replace(/[^a-zA-Z0-9_\-\s]/g, '').trim();
    triggerUniversalPrint(title);
  };

  const toggleSingleAnswer = (qKey) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [qKey]: !prev[qKey]
    }));
  };

  // Filter Papers according to Semester and Search, and map with selected exam type
  const filteredPapers = expectedQuestionPapers
    .filter(paper => {
      const matchesSemester = selectedSemester === 'All' || paper.semester === selectedSemester;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        paper.subject.toLowerCase().includes(query) ||
        paper.code.toLowerCase().includes(query) ||
        paper.course.toLowerCase().includes(query) ||
        paper.instructions.some(i => i.toLowerCase().includes(query));
      return matchesSemester && matchesSearch;
    })
    .map(paper => getExamPaperForType(paper, selectedExamType));

  return (
    <div className="section-container animate-fade-in" style={{ paddingBottom: '80px' }}>
      {/* -------------------------------------------------------------------
         HEADER & HERO BANNER
         ------------------------------------------------------------------- */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '28px 24px', 
          marginBottom: '22px',
          background: 'linear-gradient(135deg, rgba(7, 15, 30, 0.95) 0%, rgba(13, 27, 62, 0.85) 100%)',
          border: `1.5px solid ${activeExamConfig.border}`,
          boxShadow: `0 8px 32px ${activeExamConfig.bg}`
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="badge-neon" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <ClipboardCheck size={13} style={{ marginRight: '4px' }} />
                2026 Examination Blueprint
              </span>
              <span style={{ 
                fontSize: '0.75rem', 
                background: activeExamConfig.bg, 
                color: activeExamConfig.color, 
                border: `1px solid ${activeExamConfig.border}`, 
                padding: '2px 8px', 
                borderRadius: '6px', 
                fontWeight: 800 
              }}>
                {activeExamConfig.dateBadge}
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
                {activeExamConfig.syllabusTag}
              </span>
            </div>

            <h1 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#fff', margin: '4px 0 10px 0', letterSpacing: '-0.02em' }}>
              Expected University Question Papers
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '0.94rem', maxWidth: '820px', lineHeight: 1.6, margin: 0 }}>
              Currently preparing for: <strong style={{ color: activeExamConfig.color }}>{activeExamConfig.name} ({activeExamConfig.syllabusTag})</strong>.
              All papers follow the exact university marks pattern: 
              <strong style={{ color: '#38bdf8' }}> Section A ({activeExamConfig.secAMarks}M Compulsory)</strong> and 
              <strong style={{ color: '#38bdf8' }}> Section B ({activeExamConfig.secBMarks}M Choice)</strong> with model answers and official marking schemes.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{
              background: 'rgba(0, 240, 255, 0.08)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              padding: '10px 16px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--neon-cyan)' }}>
                {filteredPapers.length}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Papers Ready
              </div>
            </div>
            <div style={{
              background: activeExamConfig.bg,
              border: `1px solid ${activeExamConfig.border}`,
              padding: '10px 16px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, color: activeExamConfig.color }}>
                {activeExamConfig.maxMarks} M
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Total Marks
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowExamModal(true)}
              className="btn-secondary"
              style={{
                padding: '10px 14px',
                fontSize: '0.82rem',
                gap: '6px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              title="Change your active examination"
            >
              <RotateCcw size={14} /> Switch Exam
            </button>
          </div>
        </div>

        {/* Feature Highlights Banner */}
        <div style={{ 
          marginTop: '18px', 
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
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: activeExamConfig.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeExamConfig.color }}>
              ⏱️
            </div>
            <span><strong>{activeExamConfig.timeAllowed} Timer:</strong> Realistic countdown clock</span>
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
         STEP 1: EXAMINATION BLUEPRINT SELECTOR (PROMINENT 3-CARD CHOOSER)
         ------------------------------------------------------------------- */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Step 1: Select Examination to Practice
          </span>
          <span style={{ fontSize: '0.78rem', color: activeExamConfig.color, fontWeight: 700 }}>
            Currently Showing: {activeExamConfig.name} ({activeExamConfig.syllabusTag})
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '14px' }}>
          {Object.values(EXAM_TYPES).map(et => {
            const isSelected = selectedExamType === et.id;
            return (
              <button
                key={et.id}
                type="button"
                onClick={() => handleSelectExamType(et.id)}
                style={{
                  background: isSelected ? 'rgba(15, 23, 42, 0.95)' : 'rgba(8, 12, 22, 0.7)',
                  border: isSelected ? `2px solid ${et.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: isSelected ? `0 0 24px ${et.border}` : 'none',
                  borderRadius: '12px',
                  padding: '16px 18px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: et.bg,
                    color: et.color,
                    border: `1px solid ${et.border}`
                  }}>
                    {et.dateBadge}
                  </span>
                  {isSelected && (
                    <span style={{ fontSize: '0.74rem', color: et.color, fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={14} /> Active
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff' }}>
                  {et.name}
                </div>
                <div style={{ fontSize: '0.82rem', color: et.color, fontWeight: 700 }}>
                  📌 Syllabus: {et.syllabusTag}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', gap: '12px' }}>
                  <span>⏱️ {et.timeAllowed}</span>
                  <span>📊 {et.maxMarks} Marks</span>
                  <span>🎯 Pass: {et.passingMarks} M</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* -------------------------------------------------------------------
         FILTERS & SEARCH BAR (Clean active semester pills, no dead filters)
         ------------------------------------------------------------------- */}
      <div className="glass-panel" style={{ padding: '18px 22px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Active Semester Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              { id: 'All', label: `All Papers (${expectedQuestionPapers.length})` },
              { id: 'Semester 1', label: `Semester 1 (${expectedQuestionPapers.filter(p => p.semester === 'Semester 1').length} Papers)` },
              { id: 'Semester 2', label: `Semester 2 (${expectedQuestionPapers.filter(p => p.semester === 'Semester 2').length} Papers)` }
            ].map(tab => {
              const isSelected = selectedSemester === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedSemester(tab.id)}
                  style={{
                    padding: '7px 16px',
                    borderRadius: '20px',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 800 : 600,
                    cursor: 'pointer',
                    background: isSelected ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.06)',
                    color: isSelected ? '#030a16' : '#e2e8f0',
                    border: isSelected ? 'none' : '1px solid var(--border-dim)',
                    transition: 'all 0.15s ease',
                    userSelect: 'none'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
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

                {/* Exam Blueprint Tag */}
                <div style={{
                  marginTop: '10px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: paper.examConfig?.bg || 'rgba(0, 240, 255, 0.1)',
                  border: `1px solid ${paper.examConfig?.border || 'rgba(0, 240, 255, 0.3)'}`,
                  color: paper.examConfig?.color || 'var(--neon-cyan)',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  fontSize: '0.73rem',
                  fontWeight: 800
                }}>
                  <span>{paper.examShortTitle || 'Exam Paper'}</span>
                  <span>•</span>
                  <span>{paper.syllabusTag}</span>
                </div>

                {/* Subject Title */}
                <h3 style={{ fontSize: '1.24rem', fontWeight: 800, color: '#fff', marginTop: '10px', marginBottom: '4px', lineHeight: 1.35 }}>
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
                    <span>📊 Total: <strong style={{ color: paper.examConfig?.color || 'var(--neon-cyan)' }}>{paper.maxMarks} Marks</strong></span>
                    <span>🎯 Passing: <strong style={{ color: '#10b981' }}>{paper.passingMarks} M (40%)</strong></span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={13} color="#10b981" />
                    <span><strong>Section A:</strong> {paper.sectionA?.questions?.length || 0} Compulsory Qs ({paper.sectionA?.marks || 0}M)</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={13} color="#10b981" />
                    <span><strong>Section B:</strong> {paper.sectionB?.units?.length || 0} Units with Choice ({paper.sectionB?.marks || 0}M)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
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
                  <Eye size={15} /> Model Answers ({paper.maxMarks}M)
                </button>
                <button
                  type="button"
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
                  <Clock size={15} /> {paper.timeAllowed?.includes('1') ? '1.5-Hr Hall Mode' : '3-Hr Hall Mode'}
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
          className="exam-paper-portal-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(3, 6, 12, 0.96)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px'
          }}
          onClick={() => setActivePaper(null)}
        >
          <div
            className="glass-panel exam-paper-modal-panel"
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

              {/* In-Modal Exam Type Switcher */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.5)', padding: '3px 8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700, paddingRight: '4px' }}>Exam:</span>
                {Object.values(EXAM_TYPES).map(et => {
                  const isAct = (activePaper.examType || selectedExamType) === et.id;
                  return (
                    <button
                      key={et.id}
                      type="button"
                      onClick={() => handleSelectExamType(et.id)}
                      style={{
                        background: isAct ? et.bg : 'transparent',
                        color: isAct ? et.color : '#94a3b8',
                        border: isAct ? `1px solid ${et.border}` : '1px solid transparent',
                        padding: '3px 8px',
                        borderRadius: '5px',
                        fontSize: '0.72rem',
                        fontWeight: isAct ? 800 : 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                    >
                      {et.shortTitle}
                    </button>
                  );
                })}
              </div>

              {/* Middle: Live Exam Timer */}
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
                  color: timerSeconds < 600 ? '#ef4444' : 'var(--neon-cyan)',
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
                  title={isTimerRunning ? 'Pause Timer' : `Start ${activePaper.timeAllowed} Countdown`}
                >
                  {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <button
                  type="button"
                  onClick={handleResetTimer}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    padding: '2px 4px'
                  }}
                  title={`Reset Timer to ${activePaper.timeAllowed}`}
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
                  {activePaper.examTitle || 'B.Tech. EXAMINATION, 2026'}
                </h2>
                <div style={{
                  display: 'inline-block',
                  margin: '4px auto 8px auto',
                  padding: '3px 12px',
                  borderRadius: '20px',
                  background: activePaper.examConfig?.bg || 'rgba(0, 240, 255, 0.15)',
                  color: activePaper.examConfig?.color || 'var(--neon-cyan)',
                  border: `1px solid ${activePaper.examConfig?.border || 'rgba(0, 240, 255, 0.4)'}`,
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em'
                }}>
                  ⚡ SYLLABUS: {activePaper.syllabusTag?.toUpperCase()} {activePaper.examType === 'sessional-1' ? '• DATES: 28th – 30th' : ''}
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--neon-cyan)', marginTop: '2px' }}>
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
                  fontWeight: 700,
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  <span>Time Allowed: <strong style={{ color: '#fff' }}>{activePaper.timeAllowed}</strong></span>
                  <span>Maximum Marks: <strong style={{ color: activePaper.examConfig?.color || 'var(--neon-cyan)' }}>{activePaper.maxMarks}</strong></span>
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
                                <MathText text={q.question} as="span" />
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
                            <div style={{ fontSize: '0.86rem', color: '#e2e8f0', lineHeight: 1.55 }}>
                              <MathText text={q.modelAnswer || q.solution} />
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
                                              <MathText text={sub.question} as="span" />
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
                                            <div style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.6 }}>
                                              <MathText text={sub.solution} />
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
                                                <span>🎯 <strong>Official Rubric:</strong> <MathText text={sub.markingScheme} as="span" /></span>
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

      {/* -------------------------------------------------------------------
         INITIAL / ON-DEMAND EXAM SELECTION MODAL
         ------------------------------------------------------------------- */}
      {showExamModal && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Select Examination Blueprint"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000000,
            background: 'rgba(3, 7, 18, 0.94)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setShowExamModal(false)}
        >
          <div
            style={{
              background: '#090e17',
              border: '2px solid rgba(0, 240, 255, 0.45)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 240, 255, 0.25)',
              borderRadius: '18px',
              maxWidth: '680px',
              width: '100%',
              padding: '28px 24px',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowExamModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Close Dialog"
            >
              <X size={16} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1.5px solid rgba(245, 158, 11, 0.45)',
                color: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <ClipboardCheck size={28} />
              </div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#fff', margin: '0 0 6px 0' }}>
                Select Examination to Practice
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: 0 }}>
                Choose your upcoming exam to automatically load the exact syllabus-mapped papers, question format, and simulation timer.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.values(EXAM_TYPES).map(et => {
                const isSelected = selectedExamType === et.id;
                return (
                  <button
                    key={et.id}
                    type="button"
                    onClick={() => handleSelectExamType(et.id)}
                    style={{
                      background: isSelected ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? `2px solid ${et.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: isSelected ? `0 0 20px ${et.border}` : 'none',
                      borderRadius: '12px',
                      padding: '16px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: et.bg,
                          color: et.color,
                          border: `1px solid ${et.border}`
                        }}>
                          {et.dateBadge}
                        </span>
                        <span style={{ fontSize: '1.02rem', fontWeight: 800, color: '#fff' }}>
                          {et.name}
                        </span>
                        {et.id === 'sessional-1' && (
                          <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>
                            ★ Active This Week
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.84rem', color: et.color, fontWeight: 700 }}>
                        Syllabus: {et.syllabusTag}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '3px' }}>
                        {et.timeAllowed} • {et.maxMarks} Marks ({et.secAMarks}M Section A + {et.secBMarks}M Section B)
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      {isSelected ? (
                        <span style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: et.color,
                          fontWeight: 800,
                          fontSize: '0.8rem'
                        }}>
                          <CheckCircle2 size={16} /> Selected
                        </span>
                      ) : (
                        <ChevronRight size={18} color="#64748b" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => setShowExamModal(false)}
                className="btn-primary"
                style={{ width: '100%', padding: '10px', fontSize: '0.88rem' }}
              >
                Continue to Question Papers
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
