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
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { expectedQuestionPapers } from '../data/questionPapersData';
import { logUserActivity } from '../utils/activityTracker';
import { MathText, MathFormula } from '../utils/mathRenderer';
import { triggerUniversalPrint } from '../utils/printHelper';

// =========================================================================
// EXAMINATION BLUEPRINT CONFIGURATION (SESSIONAL-I, SESSIONAL-II, END-SEM)
// =========================================================================
export const EXAM_TYPES = {
  'sessional-1': {
    id: 'sessional-1',
    name: 'Sessional Exam - I',
    shortTitle: 'Sessional-I (Mid-Term)',
    paperTitle: 'B.Tech. SESSIONAL EXAMINATION - I (MID-TERM), 2026',
    dateBadge: '🔥 Mid-Term Exam 1',
    syllabusTag: 'Unit - I & Unit - II Only',
    unitsAllowed: ['Unit 1', 'Unit 2', 'UNIT I', 'UNIT II'],
    allowedUnitNumbers: ['UNIT I', 'UNIT II'],
    timeAllowed: '1 Hour 30 Minutes',
    timerSeconds: 90 * 60, // 5400s
    maxMarks: 30,
    passingMarks: 12,
    secAMarks: 6,
    secBMarks: 4,
    secCMarks: 8,
    secDMarks: 12,
    color: '#f59e0b',
    border: 'rgba(245, 158, 11, 0.45)',
    bg: 'rgba(245, 158, 11, 0.12)',
    description: 'Official Mid-Term Sessional Examination. Strictly 30 Marks across 4 Sections: Section A (6×1M = 6M), Section B (2×2M = 4M), Section C (Attempt 2 of 4×4M = 8M), and Section D (Attempt 2 of 4×6M = 12M).'
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
    secAMarks: 6,
    secBMarks: 4,
    secCMarks: 8,
    secDMarks: 12,
    color: '#a78bfa',
    border: 'rgba(167, 139, 250, 0.45)',
    bg: 'rgba(167, 139, 250, 0.12)',
    description: 'Upcoming Mid-Term Sessional Examination. Strictly 30 Marks across 4 Sections: Section A (6×1M = 6M), Section B (2×2M = 4M), Section C (Attempt 2 of 4×4M = 8M), and Section D (Attempt 2 of 4×6M = 12M).'
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
      isFourSectionFormat: false,
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
  // Strictly 30 Marks across 4 Sections:
  // - Section A: 6 questions x 1 Mark each = 6 Marks (Compulsory)
  // - Section B: 2 questions x 2 Marks each = 4 Marks (Compulsory)
  // - Section C: 4 questions x 4 Marks each (Attempt any 2) = 8 Marks (~1 Page model answer)
  // - Section D: 4 questions x 6 Marks each (Attempt any 2) = 12 Marks (~1.5 - 2 Pages model answer)
  // Total Attempt Marks: 6 + 4 + 8 + 12 = 30 Marks (Passing: 12 Marks, 40%, Time: 1 Hour 30 Minutes)
  const isSessional1 = examType === 'sessional-1';
  const targetUnits = isSessional1 ? ['unit 1', 'unit 2'] : ['unit 3', 'unit 4'];
  const targetBUnits = isSessional1 ? ['UNIT I', 'UNIT II'] : ['UNIT III', 'UNIT IV'];

  // All Section A questions matching target units
  const secAFiltered = (rawPaper.sectionA?.questions || []).filter(q => {
    const u = (q.unit || '').toLowerCase();
    return targetUnits.some(tu => u.includes(tu));
  });

  // Extract 4M (Section C) and 6M (Section D) questions from target Section B units
  const secBUnitsFiltered = (rawPaper.sectionB?.units || []).filter(u => {
    const un = (u.unitNumber || '').toUpperCase();
    return targetBUnits.some(tu => un.includes(tu));
  });

  const fourMarkQs = [];
  const sixMarkQs = [];

  secBUnitsFiltered.forEach(u => {
    (u.questions || []).forEach(q => {
      (q.subParts || []).forEach(sp => {
        if (sp.marks === 4) fourMarkQs.push({ ...sp, unitTitle: u.syllabusTopic || u.unitTitle, unitNumber: u.unitNumber });
        if (sp.marks === 6) sixMarkQs.push({ ...sp, unitTitle: u.syllabusTopic || u.unitTitle, unitNumber: u.unitNumber });
      });
    });
  });

  // Section C: 4 questions of 4 marks each, attempt any 2 (2 x 4 = 8 Marks)
  const secCQuestions = fourMarkQs.slice(0, 4).map((q, idx) => ({
    ...q,
    qNum: `Q${idx + 4}`,
    marks: 4,
    requiredPages: 'Approx. 1 Page',
    modelAnswer: q.solution
  }));

  // Section D: 4 questions of 6 marks each, attempt any 2 (2 x 6 = 12 Marks)
  const secDQuestions = sixMarkQs.slice(0, 4).map((q, idx) => ({
    ...q,
    qNum: `Q${idx + 8}`,
    marks: 6,
    requiredPages: 'Approx. 1.5 - 2 Pages',
    modelAnswer: q.solution
  }));

  // Pool for Section A (6 questions x 1M = 6M) and Section B (2 questions x 2M = 4M)
  const pool = [...secAFiltered];
  if (pool.length < 8) {
    const remaining = (rawPaper.sectionA?.questions || []).filter(q => !pool.includes(q));
    pool.push(...remaining);
  }

  const letters = ['a', 'b', 'c', 'd', 'e', 'f'];
  const secAQuestions = pool.slice(0, 6).map((q, idx) => ({
    ...q,
    qNum: `Q1 (${letters[idx] || (idx + 1)})`,
    marks: 1
  }));

  const secBQuestions = pool.slice(6, 8).map((q, idx) => ({
    ...q,
    qNum: `Q${idx - 4}`, // Q2, Q3
    marks: 2
  }));

  const instructions = [
    'Section A: Question No. 1 has 6 parts of 1 Mark each. ALL are COMPULSORY (Total = 6 Marks).',
    'Section B: Question Nos. 2 & 3 are COMPULSORY and carry 2 Marks each (Total = 4 Marks).',
    'Section C: Contains 4 questions of 4 Marks each. Attempt any TWO (2) questions (2 × 4 = 8 Marks; write approx. 1 page answer per question).',
    'Section D: Contains 4 questions of 6 Marks each. Attempt any TWO (2) questions (2 × 6 = 12 Marks; write approx. 1.5 to 2 pages in-depth answer per question).',
    'Total Attempt: 30 Marks. Passing Cutoff: 12 Marks (40%). Time Allowed: 1 Hour 30 Minutes.',
    'Assume suitable missing data if any and state it clearly.',
    'Neat, labeled diagrams, trace tables, step-by-step mathematical steps and proper indentation carry significant weightage.'
  ];

  return {
    ...rawPaper,
    examType,
    isFourSectionFormat: true,
    examConfig: config,
    examTitle: config.paperTitle,
    examShortTitle: config.name,
    syllabusTag: config.syllabusTag,
    dateBadge: config.dateBadge,
    timeAllowed: config.timeAllowed,
    maxMarks: 30,
    passingMarks: 12,
    timerSeconds: config.timerSeconds,
    instructions,
    sectionA: {
      title: 'SECTION A (COMPULSORY SHORT CONCEPTUAL - 6 MARKS)',
      marks: 6,
      note: 'Answer ALL SIX (6) sub-questions. Each question carries 1 Mark.',
      questions: secAQuestions
    },
    sectionB: {
      title: 'SECTION B (COMPULSORY CORE TECHNICAL - 4 MARKS)',
      marks: 4,
      note: 'Answer BOTH questions. Each question carries 2 Marks.',
      questions: secBQuestions
    },
    sectionC: {
      title: 'SECTION C (MEDIUM DESCRIPTIVE / CODE / NUMERICAL - 8 MARKS)',
      marks: 8,
      totalMarks: 16,
      note: 'Attempt any TWO (2) questions out of 4. Each question carries 4 Marks (Target: Approx. 1 Page Model Answer).',
      questions: secCQuestions
    },
    sectionD: {
      title: 'SECTION D (LONG COMPREHENSIVE / DERIVATION / ARCHITECTURE - 12 MARKS)',
      marks: 12,
      totalMarks: 24,
      note: 'Attempt any TWO (2) questions out of 4. Each question carries 6 Marks (Target: Approx. 1.5 - 2 Pages In-Depth Model Answer).',
      questions: secDQuestions
    }
  };
}

// Sub-component: SolutionCardViewer for authentic exam-standard model answers
export function SolutionCardViewer({
  questionKey,
  questionNumber,
  questionText,
  marks,
  solution,
  markingScheme,
  targetPages,
  unit,
  frequency,
  viewMode,
  isRevealed,
  onToggle
}) {
  const [copied, setCopied] = useState(false);
  const showSolution = viewMode === 'solutions' || isRevealed;

  const handleCopy = () => {
    if (!solution) return;
    try {
      navigator.clipboard.writeText(solution.replace(/```[a-zA-Z0-9]*\n?/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      style={{
        background: 'rgba(15, 23, 42, 0.55)',
        border: '1px solid rgba(255, 255, 255, 0.09)',
        borderRadius: '10px',
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      {/* Question Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', flex: 1 }}>
          <span style={{
            fontWeight: 900,
            color: 'var(--neon-cyan)',
            fontSize: '0.94rem',
            minWidth: '55px',
            paddingTop: '2px'
          }}>
            {questionNumber}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.94rem', color: '#f1f5f9', fontWeight: 600, lineHeight: 1.55 }}>
              <MathText text={questionText} as="span" />
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px', flexWrap: 'wrap' }}>
              {unit && (
                <span style={{ fontSize: '0.72rem', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 8px', borderRadius: '4px', color: '#94a3b8' }}>
                  {unit}
                </span>
              )}
              {targetPages && (
                <span style={{
                  fontSize: '0.72rem',
                  background: marks === 6 ? 'rgba(167, 139, 250, 0.16)' : 'rgba(245, 158, 11, 0.16)',
                  color: marks === 6 ? '#c084fc' : '#fbbf24',
                  border: `1px solid ${marks === 6 ? 'rgba(167, 139, 250, 0.35)' : 'rgba(245, 158, 11, 0.35)'}`,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: 700
                }}>
                  {marks === 6 ? '📑' : '📄'} Target Length: {targetPages}
                </span>
              )}
              {frequency && (
                <span style={{ fontSize: '0.72rem', background: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                  ⚡ {frequency}
                </span>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <span style={{
            fontWeight: 800,
            fontSize: '0.88rem',
            color: '#fff',
            background: marks === 6 ? 'rgba(167, 139, 250, 0.2)' : (marks === 4 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(0, 240, 255, 0.15)'),
            border: `1px solid ${marks === 6 ? 'rgba(167, 139, 250, 0.4)' : (marks === 4 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(0, 240, 255, 0.3)')}`,
            padding: '2px 8px',
            borderRadius: '4px'
          }}>
            [{marks}M]
          </span>
          {viewMode === 'questions-only' && (
            <button
              type="button"
              onClick={onToggle}
              style={{
                background: showSolution ? 'rgba(16, 185, 129, 0.15)' : 'rgba(0, 240, 255, 0.1)',
                border: `1px solid ${showSolution ? 'rgba(16, 185, 129, 0.4)' : 'rgba(0, 240, 255, 0.3)'}`,
                borderRadius: '6px',
                color: showSolution ? '#10b981' : 'var(--neon-cyan)',
                padding: '4px 10px',
                fontSize: '0.74rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 600
              }}
            >
              {showSolution ? <EyeOff size={12} /> : <Eye size={12} />}
              <span>{showSolution ? 'Hide Solution' : 'Model Answer'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Model Solution Box */}
      {showSolution && (
        <div style={{
          marginTop: '6px',
          background: 'rgba(6, 78, 59, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: '8px',
          padding: '14px 16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={14} color="#10b981" />
              <span>Model Answer &amp; Step-by-Step Working:</span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              style={{
                background: copied ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.06)',
                border: `1px solid ${copied ? '#10b981' : 'rgba(255, 255, 255, 0.15)'}`,
                borderRadius: '6px',
                padding: '3px 9px',
                color: copied ? '#10b981' : '#cbd5e1',
                fontSize: '0.72rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 600
              }}
              title="Copy Model Answer"
            >
              {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
              <span>{copied ? 'Copied!' : 'Copy Answer'}</span>
            </button>
          </div>

          <div style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.65 }}>
            <MathText text={solution} />
          </div>

          {/* Marking Scheme Points */}
          {markingScheme && (
            <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ fontSize: '0.74rem', color: '#f59e0b', fontWeight: 800, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={13} color="#f59e0b" />
                <span>Official Evaluation &amp; Marking Scheme Rubric:</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5, background: 'rgba(0, 0, 0, 0.25)', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <MathText text={markingScheme} as="span" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ExpectedQuestionPapers({ currentUser, initialSubject }) {
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePaper, setActivePaper] = useState(null);
  const [viewMode, setViewMode] = useState('solutions'); // 'questions-only' | 'solutions'
  const [revealedAnswers, setRevealedAnswers] = useState({});

  // Auto-select paper matching initialSubject if provided from Notes Reader
  useEffect(() => {
    if (initialSubject) {
      const targetCode = (initialSubject.code || '').toLowerCase().trim();
      const targetName = (initialSubject.name || '').toLowerCase().trim();
      const matched = expectedQuestionPapers.find(p => 
        (targetCode && p.code.toLowerCase().includes(targetCode)) ||
        (targetName && p.subject.toLowerCase().includes(targetName)) ||
        (initialSubject.id && p.id === initialSubject.id)
      );
      if (matched) {
        setActivePaper(matched);
      }
    }
  }, [initialSubject]);

  // Active Exam Type State (defaults to sessional-1 since it's happening on 28-30!)
  const [selectedExamType, setSelectedExamType] = useState(() => {
    try {
      return localStorage.getItem('acn_selected_exam_type') || 'sessional-1';
    } catch (e) {
      return 'sessional-1';
    }
  });

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
            onClick={() => { setSelectedSemester('All'); setSearchQuery(''); }}
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
                  {paper.isFourSectionFormat ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '8px' }}>
                      <div style={{ fontSize: '0.74rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <CheckCircle size={12} color="#00f0ff" />
                        <span><strong>Sec A:</strong> 6 Qs (6M Comp.)</span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <CheckCircle size={12} color="#00f0ff" />
                        <span><strong>Sec B:</strong> 2 Qs (4M Comp.)</span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <CheckCircle size={12} color="#f59e0b" />
                        <span><strong>Sec C:</strong> Att. 2/4 (8M, ~1pg)</span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#c084fc', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <CheckCircle size={12} color="#a78bfa" />
                        <span><strong>Sec D:</strong> Att. 2/4 (12M, ~2pg)</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle size={13} color="#10b981" />
                        <span><strong>Section A:</strong> {paper.sectionA?.questions?.length || 0} Compulsory Qs ({paper.sectionA?.marks || 0}M)</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle size={13} color="#10b981" />
                        <span><strong>Section B:</strong> {paper.sectionB?.units?.length || 0} Units with Choice ({paper.sectionB?.marks || 0}M)</span>
                      </div>
                    </>
                  )}
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
                  ⚡ SYLLABUS: {activePaper.syllabusTag?.toUpperCase()}
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
                 RENDER PAPERS: 4-SECTION BLUEPRINT (SESSIONAL) VS 2-SECTION (END-SEM)
                 ============================================================= */}
              {activePaper.isFourSectionFormat ? (
                <>
                  {/* =========================================================
                     SECTION A (COMPULSORY SHORT CONCEPTUAL - 6 MARKS)
                     ========================================================= */}
                  <div style={{ marginBottom: '32px' }}>
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
                          {activePaper.sectionA?.title}
                        </h3>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                          {activePaper.sectionA?.note}
                        </div>
                      </div>
                      <span style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--neon-cyan)' }}>
                        [{activePaper.sectionA?.marks} Marks]
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {activePaper.sectionA?.questions.map((q, idx) => {
                        const qKey = `secA_${idx}`;
                        return (
                          <SolutionCardViewer
                            key={idx}
                            questionKey={qKey}
                            questionNumber={q.qNum}
                            questionText={q.question}
                            marks={q.marks}
                            solution={q.modelAnswer || q.solution}
                            markingScheme={q.markingScheme || (q.keyMarkingPoints ? q.keyMarkingPoints.join(' • ') : '')}
                            targetPages={q.requiredPages || 'Key Points / Definition'}
                            unit={q.unit}
                            frequency={q.expectedFrequency}
                            viewMode={viewMode}
                            isRevealed={!!revealedAnswers[qKey]}
                            onToggle={() => toggleSingleAnswer(qKey)}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* =========================================================
                     SECTION B (COMPULSORY CORE TECHNICAL - 4 MARKS)
                     ========================================================= */}
                  <div style={{ marginBottom: '32px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.03) 100%)',
                      padding: '10px 16px',
                      borderRadius: '6px',
                      borderLeft: '4px solid #10b981',
                      marginBottom: '16px'
                    }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 900, color: '#fff' }}>
                          {activePaper.sectionB?.title}
                        </h3>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                          {activePaper.sectionB?.note}
                        </div>
                      </div>
                      <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#10b981' }}>
                        [{activePaper.sectionB?.marks} Marks]
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {activePaper.sectionB?.questions.map((q, idx) => {
                        const qKey = `secB_${idx}`;
                        return (
                          <SolutionCardViewer
                            key={idx}
                            questionKey={qKey}
                            questionNumber={q.qNum}
                            questionText={q.question}
                            marks={q.marks}
                            solution={q.modelAnswer || q.solution}
                            markingScheme={q.markingScheme || (q.keyMarkingPoints ? q.keyMarkingPoints.join(' • ') : '')}
                            targetPages={q.requiredPages || 'Approx. 0.5 Page'}
                            unit={q.unit}
                            frequency={q.expectedFrequency}
                            viewMode={viewMode}
                            isRevealed={!!revealedAnswers[qKey]}
                            onToggle={() => toggleSingleAnswer(qKey)}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* =========================================================
                     SECTION C (MEDIUM DESCRIPTIVE / CODE / NUMERICAL - 8 MARKS)
                     ========================================================= */}
                  <div style={{ marginBottom: '32px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.03) 100%)',
                      padding: '10px 16px',
                      borderRadius: '6px',
                      borderLeft: '4px solid #f59e0b',
                      marginBottom: '16px'
                    }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 900, color: '#fff' }}>
                          {activePaper.sectionC?.title}
                        </h3>
                        <div style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 700 }}>
                          ⚡ {activePaper.sectionC?.note}
                        </div>
                      </div>
                      <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#f59e0b' }}>
                        [{activePaper.sectionC?.marks} Marks Attempt]
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {activePaper.sectionC?.questions.map((q, idx) => {
                        const qKey = `secC_${idx}`;
                        return (
                          <SolutionCardViewer
                            key={idx}
                            questionKey={qKey}
                            questionNumber={q.qNum}
                            questionText={q.question}
                            marks={q.marks}
                            solution={q.modelAnswer || q.solution}
                            markingScheme={q.markingScheme}
                            targetPages={q.requiredPages || 'Approx. 1 Page'}
                            unit={q.unitTitle || q.unitNumber}
                            viewMode={viewMode}
                            isRevealed={!!revealedAnswers[qKey]}
                            onToggle={() => toggleSingleAnswer(qKey)}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* =========================================================
                     SECTION D (LONG COMPREHENSIVE / DERIVATION / CODE - 12 MARKS)
                     ========================================================= */}
                  <div style={{ marginBottom: '32px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'linear-gradient(90deg, rgba(167, 139, 250, 0.18) 0%, rgba(167, 139, 250, 0.03) 100%)',
                      padding: '10px 16px',
                      borderRadius: '6px',
                      borderLeft: '4px solid #a78bfa',
                      marginBottom: '16px'
                    }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 900, color: '#fff' }}>
                          {activePaper.sectionD?.title}
                        </h3>
                        <div style={{ fontSize: '0.78rem', color: '#c084fc', fontWeight: 700 }}>
                          ⚡ {activePaper.sectionD?.note}
                        </div>
                      </div>
                      <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#a78bfa' }}>
                        [{activePaper.sectionD?.marks} Marks Attempt]
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                      {activePaper.sectionD?.questions.map((q, idx) => {
                        const qKey = `secD_${idx}`;
                        return (
                          <SolutionCardViewer
                            key={idx}
                            questionKey={qKey}
                            questionNumber={q.qNum}
                            questionText={q.question}
                            marks={q.marks}
                            solution={q.modelAnswer || q.solution}
                            markingScheme={q.markingScheme}
                            targetPages={q.requiredPages || 'Approx. 1.5 - 2 Pages'}
                            unit={q.unitTitle || q.unitNumber}
                            viewMode={viewMode}
                            isRevealed={!!revealedAnswers[qKey]}
                            onToggle={() => toggleSingleAnswer(qKey)}
                          />
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                /* END-SEMESTER UNIVERSITY EXAMINATION FORMAT (SECTION A 20M + SECTION B 40M) */
                <>
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
                          {activePaper.sectionA?.title}
                        </h3>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                          {activePaper.sectionA?.note}
                        </div>
                      </div>
                      <span style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--neon-cyan)' }}>
                        [{activePaper.sectionA?.marks} Marks]
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {activePaper.sectionA?.questions.map((q, idx) => {
                        const qKey = `secA_${idx}`;
                        return (
                          <SolutionCardViewer
                            key={idx}
                            questionKey={qKey}
                            questionNumber={q.qNum}
                            questionText={q.question}
                            marks={q.marks}
                            solution={q.modelAnswer || q.solution}
                            markingScheme={q.markingScheme || (q.keyMarkingPoints ? q.keyMarkingPoints.join(' • ') : '')}
                            targetPages="Short Answer (2 Marks)"
                            unit={q.unit}
                            frequency={q.expectedFrequency}
                            viewMode={viewMode}
                            isRevealed={!!revealedAnswers[qKey]}
                            onToggle={() => toggleSingleAnswer(qKey)}
                          />
                        );
                      })}
                    </div>
                  </div>

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
                          {activePaper.sectionB?.title}
                        </h3>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                          {activePaper.sectionB?.note}
                        </div>
                      </div>
                      <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#10b981' }}>
                        [{activePaper.sectionB?.marks} Marks]
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                      {activePaper.sectionB?.units.map((unitItem, uIdx) => (
                        <div 
                          key={uIdx}
                          style={{
                            background: 'rgba(15, 23, 42, 0.5)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '10px',
                            overflow: 'hidden'
                          }}
                        >
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
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                      <span style={{ fontWeight: 800, fontSize: '0.94rem', color: isOr ? '#f59e0b' : 'var(--neon-cyan)' }}>
                                        {q.qNum}
                                      </span>
                                      <span style={{ fontWeight: 800, fontSize: '0.86rem', color: '#fff', background: 'rgba(255, 255, 255, 0.08)', padding: '2px 8px', borderRadius: '4px' }}>
                                        [{q.marks} Marks]
                                      </span>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                      {q.subParts.map((sub, sIdx) => {
                                        const subKey = `u${uIdx}_q${qIdx}_s${sIdx}`;
                                        return (
                                          <SolutionCardViewer
                                            key={sIdx}
                                            questionKey={subKey}
                                            questionNumber={sub.part}
                                            questionText={sub.question}
                                            marks={sub.marks}
                                            solution={sub.solution}
                                            markingScheme={sub.markingScheme}
                                            targetPages={sub.marks === 6 ? 'Approx. 1.5 - 2 Pages' : (sub.marks === 4 ? 'Approx. 1 Page' : '')}
                                            viewMode={viewMode}
                                            isRevealed={!!revealedAnswers[subKey]}
                                            onToggle={() => toggleSingleAnswer(subKey)}
                                          />
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
                </>
              )}

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
