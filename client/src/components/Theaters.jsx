/* =========================================================================
   SECTION 4: EXAM REVISION & SHORT NOTES HUB (Theaters.jsx)
   =========================================================================
   Features:
   1. "⚡ Exam Revision Notes (Balanced Length)" - The Golden Medium notes
      (8-12 pages, high-yield, complete unit coverage, derivations, formulas,
      and solved university exam questions with step-by-step model answers).
   2. "📄 Ultra-Short Cheat Sheets" - 2-page KaTeX formula summaries for rapid 30-min cram.
   3. Interactive in-app Exam Revision Reader Modal with unit tabs & print support.
   4. Filter by Year (1st-4th) & Semester (1-8), plus instant keyword search.
   ========================================================================= */

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  Download, 
  Search, 
  FileText, 
  CheckCircle, 
  Sparkles,
  Award,
  Eye,
  Zap,
  BookOpen,
  Printer,
  X,
  ChevronRight,
  Layers,
  HelpCircle,
  AlertTriangle,
  Copy,
  CheckCheck,
  Flame,
  CheckCircle2,
  Clock,
  Compass,
  FileCode2
} from 'lucide-react';
import { initialShortNotes } from '../data/mockData';
import { examRevisionNotes } from '../data/examRevisionNotesData';
import { logUserActivity } from '../utils/activityTracker';
import { MathFormula, MathText } from '../utils/mathRenderer';
import { triggerUniversalPrint } from '../utils/printHelper';

/* -------------------------------------------------------------------------
   ACADEMIC YEARS & SEMESTER CONFIGURATION
   ------------------------------------------------------------------------- */
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'All Years'];

const YEAR_CONFIG = {
  '1st Year': {
    label: '1st Year',
    semesters: [
      { id: 'Semester 1', num: 1, title: 'Semester 1', subtitle: 'Calculus, BEEE, C Programming, Web Tech & AI' },
      { id: 'Semester 2', num: 2, title: 'Semester 2', subtitle: 'Applied Physics, Python & Data Structures' }
    ]
  },
  '2nd Year': {
    label: '2nd Year',
    semesters: [
      { id: 'Semester 3', num: 3, title: 'Semester 3', subtitle: 'Data Structures & Algorithms, Digital Logic Design' },
      { id: 'Semester 4', num: 4, title: 'Semester 4', subtitle: 'Operating Systems & Database Management Systems' }
    ]
  },
  '3rd Year': {
    label: '3rd Year',
    semesters: [
      { id: 'Semester 5', num: 5, title: 'Semester 5', subtitle: 'Computer Networks & Full Stack Web Development' },
      { id: 'Semester 6', num: 6, title: 'Semester 6', subtitle: 'Software Engineering & Artificial Intelligence' }
    ]
  },
  '4th Year': {
    label: '4th Year',
    semesters: [
      { id: 'Semester 7', num: 7, title: 'Semester 7', subtitle: 'Cloud Computing & Distributed Systems' },
      { id: 'Semester 8', num: 8, title: 'Semester 8', subtitle: 'DevOps Engineering & CI/CD Pipelines' }
    ]
  }
};

export default function Theaters({ currentUser, initialSubject }) {
  /* -----------------------------------------------------------------------
     STATE MANAGEMENT
     - activeTabMode: 'balanced' (Exam Revision Notes) | 'ultraShort' (2-Page Summaries)
     - searchQuery: Filter notes by typed query
     - selectedYear: Active Year filter ('1st Year', '2nd Year', '3rd Year', '4th Year', 'All Years')
     - selectedSemester: Active Semester filter ('All' or specific 'Semester X')
     ----------------------------------------------------------------------- */
  const [activeTabMode, setActiveTabMode] = useState('balanced'); // 'balanced' | 'ultraShort'
  const [shortNotes] = useState(initialShortNotes);
  const [revisionNotes] = useState(examRevisionNotes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('1st Year');
  const [selectedSemester, setSelectedSemester] = useState('All');

  // Interactive Reader Modal States
  const [selectedRevisionNote, setSelectedRevisionNote] = useState(null);
  const [activeModalUnit, setActiveModalUnit] = useState(1);
  const [copiedFormula, setCopiedFormula] = useState(null);

  React.useEffect(() => {
    if (selectedRevisionNote) {
      document.body.classList.add('revision-modal-active');
    } else {
      document.body.classList.remove('revision-modal-active');
    }
    return () => {
      document.body.classList.remove('revision-modal-active');
    };
  }, [selectedRevisionNote]);

  React.useEffect(() => {
    if (initialSubject) {
      const codeOrTitle = (initialSubject.code || initialSubject.name || initialSubject.title || '').toLowerCase();
      const matched = revisionNotes.find(n => 
        (initialSubject.code && (n.code.toLowerCase().includes(initialSubject.code.toLowerCase()) || initialSubject.code.toLowerCase().includes(n.code.toLowerCase()))) ||
        (initialSubject.name && (n.subject.toLowerCase().includes(initialSubject.name.toLowerCase()) || initialSubject.name.toLowerCase().includes(n.subject.toLowerCase()))) ||
        (initialSubject.id && n.id === initialSubject.id)
      );
      if (matched) {
        if (matched.year) setSelectedYear(matched.year);
        if (matched.semester) setSelectedSemester(matched.semester);
        setSelectedRevisionNote(matched);
        setActiveModalUnit(1);
      }
    }
  }, [initialSubject]);

  // ─── Filter Balanced Exam Revision Notes ─────────────────────────────────
  const filteredRevisionNotes = revisionNotes.filter(item => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      item.subject.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      (item.highlights && item.highlights.some(h => h.toLowerCase().includes(q)));
      
    // Year filter
    let matchesYear = true;
    if (selectedYear !== 'All Years') {
      const allowedSems = YEAR_CONFIG[selectedYear]?.semesters.map(s => s.id) || [];
      matchesYear = allowedSems.includes(item.semester);
    }

    // Semester filter
    let matchesSemester = true;
    if (selectedSemester !== 'All') {
      matchesSemester = item.semester === selectedSemester;
    }

    return matchesSearch && matchesYear && matchesSemester;
  });

  // ─── Filter Ultra-Short 2-Page Sheets ────────────────────────────────────
  const filteredShortNotes = shortNotes.filter(item => {
    if (item.isDead || item.code === 'CS301') return false;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      item.subject.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      (item.highlights && item.highlights.some(h => h.toLowerCase().includes(q)));
      
    // Year filter
    let matchesYear = true;
    if (selectedYear !== 'All Years') {
      const allowedSems = YEAR_CONFIG[selectedYear]?.semesters.map(s => s.id) || [];
      matchesYear = allowedSems.includes(item.semester);
    }

    // Semester filter
    let matchesSemester = true;
    if (selectedSemester !== 'All') {
      matchesSemester = item.semester === selectedSemester;
    }

    return matchesSearch && matchesYear && matchesSemester;
  });

  const handleDownloadClick = (item, isRevision = false) => {
    try {
      logUserActivity(
        currentUser?.username || 'student',
        'DOWNLOAD',
        `${item.code}: ${item.subject} ${isRevision ? 'Exam Revision Notes' : 'Short Notes'}`,
        `Downloaded ${isRevision ? item.pageEstimate : item.fileSize}`
      );
    } catch (e) {}
  };

  const handleCopyFormula = (latex) => {
    navigator.clipboard.writeText(latex);
    setCopiedFormula(latex);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  // Collect all solved questions for the active modal subject
  const allSolvedQuestions = selectedRevisionNote?.units?.flatMap(u => 
    (u.solvedQuestions || []).map(sq => ({ ...sq, unitNum: u.unitNum, unitTitle: u.title }))
  ) || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
      {/* -------------------------------------------------------------------
         PART A: EXAM REVISION & SHORT NOTES HEADER
         ------------------------------------------------------------------- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span className="badge-neon font-display">⚡ BALANCED FAST-TRACK HUB</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
              100% MMEC Syllabus • Not Too Long, Not Too Short
            </span>
          </div>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 900, color: '#fff', margin: 0 }}>
            Exam Revision &amp; Short Notes
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '780px', marginTop: '6px', lineHeight: '1.5' }}>
            Specially engineered university cram guides: balanced length covering complete syllabus units, core theories, step-by-step derivations, essential formulas, and verified university exam questions with model answers.
          </p>
        </div>

        {/* Search by Subject, Course Code or Topic */}
        <div style={{ minWidth: '280px', flex: '1', maxWidth: '380px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder="Search subjects, codes, or exam topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 18px 12px 40px',
                borderRadius: '10px',
                background: 'rgba(14, 18, 29, 0.9)',
                border: '1px solid var(--border-dim)',
                color: '#fff',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------
         PART B: TOP VIEW SWITCHER (Balanced Exam Revision vs Ultra-Short)
         ------------------------------------------------------------------- */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '6px', 
          display: 'inline-flex', 
          gap: '8px', 
          borderRadius: '12px', 
          background: 'rgba(11, 15, 25, 0.75)',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          width: 'fit-content',
          flexWrap: 'wrap'
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTabMode('balanced')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 20px',
            borderRadius: '8px',
            fontSize: '0.88rem',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            border: activeTabMode === 'balanced' ? '1px solid var(--neon-cyan)' : 'none',
            background: activeTabMode === 'balanced' ? 'rgba(0, 240, 255, 0.22)' : 'transparent',
            color: activeTabMode === 'balanced' ? '#fff' : 'var(--text-dim)',
            boxShadow: activeTabMode === 'balanced' ? '0 0 16px rgba(0, 240, 255, 0.35)' : 'none'
          }}
        >
          <Sparkles size={16} color={activeTabMode === 'balanced' ? 'var(--neon-cyan)' : 'currentColor'} />
          <span>⚡ Exam Revision Notes (Balanced Length • 8-12 Pages)</span>
          <span style={{ fontSize: '0.75rem', padding: '2px 7px', borderRadius: '12px', background: 'rgba(0,240,255,0.2)', color: 'var(--neon-cyan)' }}>
            {filteredRevisionNotes.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTabMode('ultraShort')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 20px',
            borderRadius: '8px',
            fontSize: '0.88rem',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            border: activeTabMode === 'ultraShort' ? '1px solid #c084fc' : 'none',
            background: activeTabMode === 'ultraShort' ? 'rgba(192, 132, 252, 0.22)' : 'transparent',
            color: activeTabMode === 'ultraShort' ? '#fff' : 'var(--text-dim)',
            boxShadow: activeTabMode === 'ultraShort' ? '0 0 16px rgba(192, 132, 252, 0.35)' : 'none'
          }}
        >
          <FileText size={16} color={activeTabMode === 'ultraShort' ? '#c084fc' : 'currentColor'} />
          <span>📄 Ultra-Short Cheat Sheets (2-Page Formulas)</span>
          <span style={{ fontSize: '0.75rem', padding: '2px 7px', borderRadius: '12px', background: 'rgba(192,132,252,0.2)', color: '#c084fc' }}>
            {filteredShortNotes.length}
          </span>
        </button>
      </div>

      {/* -------------------------------------------------------------------
         PART C: YEAR SELECTOR BUTTONS (1st Year, 2nd Year, 3rd Year, 4th Year)
         ------------------------------------------------------------------- */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)', fontWeight: 700, marginRight: '2px' }}>
            Select Year:
          </span>
          {YEARS.map(yr => {
            const isSelected = selectedYear === yr;
            return (
              <button
                key={yr}
                onClick={() => {
                  setSelectedYear(yr);
                  setSelectedSemester('All'); // Reset semester filter on year switch
                }}
                style={{
                  padding: '9px 20px',
                  borderRadius: '10px',
                  fontSize: '0.86rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  background: isSelected ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.05)',
                  color: isSelected ? '#07090e' : '#cbd5e1',
                  border: isSelected ? 'none' : '1px solid var(--border-dim)',
                  boxShadow: isSelected ? '0 0 16px rgba(0, 240, 255, 0.3)' : 'none',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {yr}
              </button>
            );
          })}
        </div>

        {/* Semester Boxes: Appear when specific Year is clicked */}
        {selectedYear !== 'All Years' && YEAR_CONFIG[selectedYear] && (
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '14px',
              padding: '18px 22px',
              borderRadius: '14px',
              background: 'rgba(10, 15, 29, 0.7)',
              border: '1px solid rgba(0, 240, 255, 0.25)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--neon-cyan)', fontSize: '0.9rem', fontWeight: 800 }}>⚡ {selectedYear} Semesters</span>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>• Click a semester box to filter notes</span>
              </div>
              {selectedSemester !== 'All' && (
                <button
                  onClick={() => setSelectedSemester('All')}
                  style={{
                    background: 'rgba(0, 240, 255, 0.12)',
                    border: '1px solid rgba(0, 240, 255, 0.35)',
                    color: 'var(--neon-cyan)',
                    fontSize: '0.8rem',
                    padding: '5px 14px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 700,
                    transition: 'all 0.2s ease'
                  }}
                >
                  Show Both Semesters
                </button>
              )}
            </div>

            {/* The Two Distinct Semester Boxes */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              {YEAR_CONFIG[selectedYear].semesters.map(sem => {
                const isSelected = selectedSemester === sem.id;
                const relevantCount = activeTabMode === 'balanced'
                  ? revisionNotes.filter(n => n.semester === sem.id).length
                  : shortNotes.filter(n => n.semester === sem.id).length;

                return (
                  <div
                    key={sem.id}
                    onClick={() => setSelectedSemester(isSelected ? 'All' : sem.id)}
                    role="button"
                    tabIndex={0}
                    style={{
                      padding: '18px 20px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      background: isSelected ? 'rgba(0, 240, 255, 0.12)' : 'rgba(15, 23, 42, 0.55)',
                      border: isSelected ? '1.5px solid var(--neon-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: isSelected ? '0 0 16px rgba(0, 240, 255, 0.2)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, color: isSelected ? 'var(--neon-cyan)' : '#fff' }}>
                        {sem.title}
                      </span>
                      <span style={{ 
                        fontSize: '0.74rem', 
                        fontWeight: 700, 
                        padding: '3px 9px', 
                        borderRadius: '20px', 
                        background: isSelected ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                        color: isSelected ? 'var(--neon-cyan)' : 'var(--text-muted)'
                      }}>
                        {relevantCount} Subjects
                      </span>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.82rem', color: isSelected ? '#cbd5e1' : 'var(--text-muted)', lineHeight: 1.4 }}>
                      {sem.subtitle}
                    </p>

                    <div style={{ 
                      marginTop: '2px', 
                      paddingTop: '8px', 
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)', 
                      fontSize: '0.76rem', 
                      color: isSelected ? 'var(--neon-cyan)' : 'var(--text-dim)', 
                      fontWeight: 700, 
                      display: 'flex', 
                      justifyContent: 'space-between' 
                    }}>
                      <span>{isSelected ? '✓ Filter Active' : 'Click to filter'}</span>
                      <span>{isSelected ? '●' : '→'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* -------------------------------------------------------------------
         PART D: BALANCED EXAM REVISION NOTES GRID (GOLDEN MEDIUM)
         ------------------------------------------------------------------- */}
      {activeTabMode === 'balanced' && (
        <div>
          {filteredRevisionNotes.length === 0 ? (
            <div className="glass-panel" style={{ padding: '48px 24px', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '16px' }}>
                No exam revision notes found matching "{searchQuery}".
              </p>
              <button 
                onClick={() => { setSelectedYear('1st Year'); setSelectedSemester('All'); setSearchQuery(''); }}
                className="btn-primary" 
                style={{ padding: '10px 22px', fontSize: '0.88rem' }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '22px' }}>
              {filteredRevisionNotes.map(item => (
                <div 
                  key={item.id} 
                  className="glass-panel" 
                  style={{ 
                    padding: '24px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    gap: '16px',
                    border: '1.5px solid rgba(0, 240, 255, 0.3)',
                    background: 'linear-gradient(135deg, rgba(7, 15, 30, 0.85) 0%, rgba(10, 22, 48, 0.7) 100%)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div>
                    {/* Header Badges */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ 
                          fontSize: '0.72rem', 
                          fontWeight: 800, 
                          padding: '2px 8px', 
                          borderRadius: '4px', 
                          background: 'rgba(0, 240, 255, 0.15)', 
                          color: 'var(--neon-cyan)',
                          border: '1px solid rgba(0, 240, 255, 0.35)'
                        }}>
                          {item.code}
                        </span>
                        <span className="badge-neon" style={{ fontSize: '0.72rem' }}>
                          {item.semester} • {item.year}
                        </span>
                      </div>
                      <span className="badge-neon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid #10b981', fontSize: '0.72rem' }}>
                        {item.pageEstimate}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: '4px 0 8px 0', lineHeight: '1.3' }}>
                      {item.subject}
                    </h3>

                    <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: '1.45', margin: '0 0 14px 0' }}>
                      {item.summary}
                    </p>

                    {/* Syllabus Highlights */}
                    <div style={{
                      background: 'rgba(7, 9, 14, 0.7)',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      border: '1px solid var(--border-dim)'
                    }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--neon-cyan)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Zap size={14} /> <span>HIGH-YIELD REVISION CONTENTS:</span>
                      </div>
                      {item.highlights && item.highlights.map((point, idx) => (
                        <div key={idx} style={{ fontSize: '0.79rem', color: '#d0d8e8', display: 'flex', alignItems: 'flex-start', gap: '7px', lineHeight: 1.35 }}>
                          <CheckCircle2 size={13} color="var(--neon-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions: In-App Interactive Reader & Download */}
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => {
                        setSelectedRevisionNote(item);
                        setActiveModalUnit(item.units && item.units.length > 0 ? item.units[0].unitNum : 'overview');
                      }}
                      style={{ 
                        flex: 1.3, 
                        justifyContent: 'center', 
                        padding: '10px 14px', 
                        fontSize: '0.84rem', 
                        gap: '6px' 
                      }}
                    >
                      <BookOpen size={16} /> 📖 Read Exam Revision Notes
                    </button>

                    <a
                      href={item.pdfUrl === '#' ? undefined : item.pdfUrl}
                      target={item.pdfUrl === '#' ? undefined : "_blank"}
                      download={item.pdfUrl === '#' ? undefined : item.downloadName}
                      className="btn-outline"
                      onClick={() => {
                        if (item.pdfUrl === '#') {
                          setSelectedRevisionNote(item);
                          setActiveModalUnit(item.units && item.units.length > 0 ? item.units[0].unitNum : 'overview');
                        } else {
                          handleDownloadClick(item, true);
                        }
                      }}
                      style={{ 
                        flex: 1, 
                        justifyContent: 'center', 
                        padding: '10px 14px', 
                        fontSize: '0.84rem', 
                        gap: '6px',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}
                      title="Download PDF Package or Read Online"
                    >
                      <Download size={15} /> Download PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------------
         PART E: ULTRA-SHORT 2-PAGE CHEAT SHEETS (FORMULA REVISION)
         ------------------------------------------------------------------- */}
      {activeTabMode === 'ultraShort' && (
        <div>
          {filteredShortNotes.length === 0 ? (
            <div className="glass-panel" style={{ padding: '48px 24px', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '16px' }}>
                No ultra-short formula sheets found matching your selected filters.
              </p>
              <button 
                onClick={() => { setSelectedYear('1st Year'); setSelectedSemester('All'); setSearchQuery(''); }}
                className="btn-primary" 
                style={{ padding: '10px 22px', fontSize: '0.88rem' }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="short-notes-cards-grid">
              {filteredShortNotes.map(item => (
                <div 
                  key={item.id} 
                  className="glass-panel" 
                  style={{ 
                    padding: '24px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '16px',
                    border: '1px solid rgba(192, 132, 252, 0.3)',
                    background: 'linear-gradient(135deg, rgba(7, 15, 30, 0.85) 0%, rgba(20, 10, 45, 0.7) 100%)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span className="badge-neon" style={{ marginBottom: '6px', background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc', border: '1px solid #c084fc' }}>
                        {item.category} • {item.pages}
                      </span>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginTop: '6px' }}>
                        {item.subject}
                      </h3>
                      <div style={{ fontSize: '0.8rem', color: '#c084fc', marginTop: '2px', fontWeight: 600 }}>
                        {item.code} • {item.semester}
                      </div>
                    </div>
                    <span className="badge-amber">{item.fileSize}</span>
                  </div>

                  <div style={{
                    background: 'rgba(7, 9, 14, 0.65)',
                    padding: '14px',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    border: '1px solid var(--border-dim)'
                  }}>
                    <div style={{ fontSize: '0.84rem', color: '#38bdf8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Zap size={15} color="#c084fc" />
                      <span>Format: {item.type}</span>
                    </div>

                    {/* Syllabus Highlights */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '2px' }}>
                      {item.highlights && item.highlights.map((point, idx) => (
                        <div key={idx} style={{ fontSize: '0.8rem', color: '#d0d8e8', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.4 }}>
                          <CheckCircle size={14} color="var(--neon-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <Award size={14} color="var(--neon-amber)" />
                      <span>Verified Downloads: <strong style={{ color: '#fff' }}>{item.downloads.toLocaleString()} Students</strong></span>
                    </div>
                  </div>

                  {/* Direct Open & Download Actions */}
                  <div className="short-note-card-actions">
                    <a 
                      href={item.isDead || item.code === 'CS301' ? undefined : item.pdfUrl}
                      target={item.isDead || item.code === 'CS301' ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className={item.isDead || item.code === 'CS301' ? "btn-secondary" : "btn-review-glow"} 
                      style={{ 
                        flex: 1, 
                        justifyContent: 'center', 
                        textDecoration: 'none', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '6px',
                        fontSize: '0.84rem',
                        padding: '10px 12px',
                        opacity: item.isDead || item.code === 'CS301' ? 0.35 : 1,
                        cursor: item.isDead || item.code === 'CS301' ? 'not-allowed' : 'pointer'
                      }}
                      title={item.isDead || item.code === 'CS301' ? 'Under Preparation' : 'Open & Review PDF'}
                    >
                      <Eye size={16} /> Open &amp; Review PDF
                    </a>
                    <a 
                      href={item.isDead || item.code === 'CS301' ? undefined : item.pdfUrl}
                      download={item.isDead || item.code === 'CS301' ? undefined : item.downloadName}
                      onClick={(e) => {
                        if (item.isDead || item.code === 'CS301') {
                          e.preventDefault();
                          return;
                        }
                        handleDownloadClick(item);
                      }}
                      className={item.isDead || item.code === 'CS301' ? "btn-secondary" : "btn-primary"} 
                      style={{ 
                        flex: 1.2, 
                        justifyContent: 'center', 
                        textDecoration: 'none', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '6px',
                        fontSize: '0.84rem',
                        padding: '10px 12px',
                        opacity: item.isDead || item.code === 'CS301' ? 0.35 : 1,
                        cursor: item.isDead || item.code === 'CS301' ? 'not-allowed' : 'pointer'
                      }}
                      title={item.isDead || item.code === 'CS301' ? 'Under Preparation' : 'Download Short Notes'}
                    >
                      <Download size={16} /> Download Short Notes
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------------
         PART F: INTERACTIVE IN-APP EXAM REVISION READER MODAL (FULL EXPERIENCE)
         ------------------------------------------------------------------- */}
      {selectedRevisionNote && createPortal(
        <div 
          className="revision-portal-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(4, 7, 13, 0.96)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setSelectedRevisionNote(null)}
        >
          <div 
            className="glass-panel revision-modal-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '960px',
              height: '90vh',
              maxHeight: '920px',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '16px',
              border: '1.5px solid var(--neon-cyan)',
              background: '#090e17',
              boxShadow: '0 0 50px rgba(0, 240, 255, 0.25)',
              overflow: 'hidden'
            }}
          >
            {/* Interactive Screen UI (hidden during print) */}
            <div className="revision-screen-content" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
              {/* Modal Header */}
            <div style={{
              padding: '16px 22px',
              background: 'linear-gradient(90deg, rgba(7, 15, 30, 0.95) 0%, rgba(10, 25, 55, 0.9) 100%)',
              borderBottom: '1px solid rgba(0, 240, 255, 0.25)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ 
                    fontSize: '0.72rem', 
                    fontWeight: 800, 
                    padding: '2px 8px', 
                    borderRadius: '4px', 
                    background: 'rgba(0, 240, 255, 0.15)', 
                    color: 'var(--neon-cyan)',
                    border: '1px solid rgba(0, 240, 255, 0.35)'
                  }}>
                    {selectedRevisionNote.code}
                  </span>
                  <span className="badge-neon" style={{ fontSize: '0.72rem' }}>
                    {selectedRevisionNote.semester} • {selectedRevisionNote.year}
                  </span>
                  <span style={{ fontSize: '0.76rem', color: '#10b981', fontWeight: 700 }}>
                    {selectedRevisionNote.pageEstimate}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff', margin: '4px 0 0 0' }}>
                  {selectedRevisionNote.subject} — Exam Revision Master
                </h2>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => {
                    const docTitle = `${selectedRevisionNote?.subject || 'Exam'}_${selectedRevisionNote?.code || 'Revision'}_Notes`.replace(/[^a-zA-Z0-9_\-\s]/g, '').trim();
                    triggerUniversalPrint(docTitle);
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#cbd5e1',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  title="Print or Save as PDF"
                >
                  <Printer size={15} /> Print / Save PDF
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRevisionNote(null)}
                  style={{
                    background: 'rgba(255, 42, 109, 0.15)',
                    border: '1px solid rgba(255, 42, 109, 0.4)',
                    color: '#ff2a6d',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Close Reader"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Navigation Tabs Bar (Units + Solved Questions) */}
            <div style={{
              display: 'flex',
              gap: '6px',
              padding: '10px 18px',
              background: 'rgba(11, 15, 25, 0.9)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              overflowX: 'auto',
              flexShrink: 0
            }}>
              {selectedRevisionNote.units && selectedRevisionNote.units.length > 0 ? (
                <>
                  {selectedRevisionNote.units.map(unit => {
                    const isTabActive = activeModalUnit === unit.unitNum;
                    return (
                      <button
                        key={unit.unitNum}
                        type="button"
                        onClick={() => setActiveModalUnit(unit.unitNum)}
                        style={{
                          padding: '7px 16px',
                          borderRadius: '8px',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.2s ease',
                          border: isTabActive ? '1px solid var(--neon-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
                          background: isTabActive ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                          color: isTabActive ? '#fff' : 'var(--text-dim)',
                          boxShadow: isTabActive ? '0 0 12px rgba(0, 240, 255, 0.3)' : 'none'
                        }}
                      >
                        Unit {unit.unitNum}: {unit.title.split('&')[0].trim()}
                      </button>
                    );
                  })}

                  {allSolvedQuestions.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setActiveModalUnit('questions')}
                      style={{
                        padding: '7px 16px',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s ease',
                        border: activeModalUnit === 'questions' ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.08)',
                        background: activeModalUnit === 'questions' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        color: activeModalUnit === 'questions' ? '#fff' : 'var(--text-dim)',
                        boxShadow: activeModalUnit === 'questions' ? '0 0 12px rgba(16, 185, 129, 0.3)' : 'none'
                      }}
                    >
                      🏆 Solved University Exam Questions ({allSolvedQuestions.length})
                    </button>
                  )}
                </>
              ) : (
                <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                  Comprehensive Revision Notes Loaded
                </div>
              )}
            </div>

            {/* Modal Body / Scrollable Content */}
            <div 
              className="custom-scroll" 
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}
            >
              {activeModalUnit === 'questions' ? (
                /* Solved University Questions View */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{
                    padding: '16px 20px',
                    borderRadius: '10px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <Award size={24} color="#10b981" />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', color: '#fff', fontWeight: 800 }}>
                        High-Weightage University Solved Questions &amp; Scoring Keys
                      </h4>
                      <p style={{ margin: '2px 0 0 0', fontSize: '0.82rem', color: '#94a3b8' }}>
                        Step-by-step model solutions for recurring examination problems (8-10 Marks weightage)
                      </p>
                    </div>
                  </div>

                  {allSolvedQuestions.map((q, idx) => (
                    <div 
                      key={idx}
                      className="glass-panel"
                      style={{
                        padding: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(11, 15, 25, 0.8)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{ 
                            fontSize: '0.75rem', 
                            fontWeight: 800, 
                            padding: '3px 9px', 
                            borderRadius: '4px', 
                            background: 'rgba(0, 240, 255, 0.15)', 
                            color: 'var(--neon-cyan)' 
                          }}>
                            Q{idx + 1} • Unit {q.unitNum}
                          </span>
                          <span className="badge-amber" style={{ fontSize: '0.72rem' }}>{q.marks}</span>
                        </div>
                      </div>

                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.4 }}>
                        <MathText text={q.question || q.q} as="span" />
                      </h4>

                      <div style={{
                        padding: '14px 16px',
                        borderRadius: '8px',
                        background: 'rgba(7, 9, 14, 0.8)',
                        border: '1px solid rgba(0, 240, 255, 0.2)',
                        fontSize: '0.86rem',
                        color: '#cbd5e1',
                        lineHeight: 1.55
                      }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--neon-green)', marginBottom: '6px' }}>
                          MODEL STEP-BY-STEP SOLUTION:
                        </div>
                        <MathText text={q.solution} style={{ color: '#cbd5e1' }} />
                      </div>

                      {q.keyPoints && q.keyPoints.length > 0 && (
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '2px' }}>
                          {q.keyPoints.map((kp, kpidx) => (
                            <span 
                              key={kpidx}
                              style={{
                                fontSize: '0.75rem',
                                color: '#a7f3d0',
                                background: 'rgba(16, 185, 129, 0.12)',
                                border: '1px solid rgba(16, 185, 129, 0.25)',
                                padding: '3px 8px',
                                borderRadius: '4px'
                              }}
                            >
                              ✓ {kp}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                /* Specific Unit View */
                (() => {
                  const currentUnit = selectedRevisionNote.units?.find(u => u.unitNum === activeModalUnit) || selectedRevisionNote.units?.[0];
                  
                  if (!currentUnit) {
                    return (
                      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-dim)' }}>
                        <p>Complete fast-track notes summary ready for this subject.</p>
                      </div>
                    );
                  }

                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                      {/* Unit Banner */}
                      <div style={{
                        padding: '16px 20px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.08) 0%, rgba(10, 25, 55, 0.4) 100%)',
                        border: '1px solid rgba(0, 240, 255, 0.25)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '10px'
                      }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--neon-cyan)', textTransform: 'uppercase' }}>
                            UNIT {currentUnit.unitNum} SYLLABUS CRAM
                          </span>
                          <h3 style={{ margin: '2px 0 0 0', fontSize: '1.2rem', color: '#fff', fontWeight: 800 }}>
                            {currentUnit.title}
                          </h3>
                          <p style={{ margin: '4px 0 0 0', fontSize: '0.84rem', color: '#94a3b8' }}>
                            {currentUnit.summary}
                          </p>
                        </div>
                        <span className="badge-amber" style={{ fontSize: '0.78rem' }}>
                          Weightage: {currentUnit.weightage}
                        </span>
                      </div>

                      {/* 1. Core Theories / Core Concepts & Precise Definitions */}
                      {((currentUnit.keyTheories && currentUnit.keyTheories.length > 0) || (currentUnit.coreConcepts && currentUnit.coreConcepts.length > 0)) && (
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <FileText size={18} color="var(--neon-cyan)" />
                            <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#fff', fontWeight: 800 }}>
                              📌 Core Theories, Principles &amp; Definitions
                            </h4>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                            {/* Render keyTheories if available */}
                            {currentUnit.keyTheories && currentUnit.keyTheories.map((theory, tidx) => (
                              <div 
                                key={`kt_${tidx}`}
                                style={{
                                  padding: '16px',
                                  borderRadius: '10px',
                                  background: 'rgba(15, 23, 42, 0.6)',
                                  border: '1px solid rgba(255, 255, 255, 0.08)'
                                }}
                              >
                                <h5 style={{ margin: '0 0 6px 0', fontSize: '0.96rem', color: 'var(--neon-cyan)', fontWeight: 800 }}>
                                  {theory.term}
                                </h5>
                                <MathText 
                                  text={theory.definition} 
                                  as="p" 
                                  style={{ margin: '0 0 8px 0', fontSize: '0.86rem', color: '#e2e8f0', lineHeight: 1.55 }} 
                                />
                                {theory.bulletPoints && (
                                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                                    {theory.bulletPoints.map((bp, bidx) => (
                                      <li key={bidx} style={{ marginBottom: '4px' }}>
                                        <MathText text={bp} as="span" />
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}

                            {/* Render coreConcepts if available */}
                            {currentUnit.coreConcepts && currentUnit.coreConcepts.map((c, cidx) => (
                              <div 
                                key={`cc_${cidx}`}
                                style={{
                                  padding: '16px',
                                  borderRadius: '10px',
                                  background: 'rgba(15, 23, 42, 0.6)',
                                  border: '1px solid rgba(255, 255, 255, 0.08)'
                                }}
                              >
                                <h5 style={{ margin: '0 0 6px 0', fontSize: '0.96rem', color: 'var(--neon-cyan)', fontWeight: 800 }}>
                                  {typeof c === 'string' ? c : c.title}
                                </h5>
                                {typeof c === 'object' && c.desc && (
                                  <MathText 
                                    text={c.desc} 
                                    as="p" 
                                    style={{ margin: '0 0 6px 0', fontSize: '0.86rem', color: '#e2e8f0', lineHeight: 1.55 }} 
                                  />
                                )}
                                {typeof c === 'object' && c.takeaway && (
                                  <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700, marginTop: '4px' }}>
                                    💡 Key Takeaway: <MathText text={c.takeaway} as="span" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 2. High-Yield Cheat Sheet / Rapid Facts */}
                      {currentUnit.cheatSheet && currentUnit.cheatSheet.length > 0 && (
                        <div style={{
                          padding: '14px 18px',
                          borderRadius: '10px',
                          background: 'rgba(245, 158, 11, 0.08)',
                          border: '1px solid rgba(245, 158, 11, 0.3)'
                        }}>
                          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Zap size={15} color="#fbbf24" />
                            <span>⚡ High-Yield Cheat Sheet &amp; Rapid Facts</span>
                          </div>
                          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.84rem', color: '#fef08a', lineHeight: 1.55 }}>
                            {currentUnit.cheatSheet.map((pt, pIdx) => (
                              <li key={pIdx} style={{ marginBottom: '4px' }}>
                                <MathText text={pt} as="span" />
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 3. Step-by-Step Exam Derivations with KaTeX */}
                      {currentUnit.derivations && currentUnit.derivations.length > 0 && (
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <Layers size={18} color="#38bdf8" />
                            <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#fff', fontWeight: 800 }}>
                              📐 Must-Know University Derivations (KaTeX Formatted)
                            </h4>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {currentUnit.derivations.map((d, didx) => (
                              <div 
                                key={didx}
                                style={{
                                  padding: '18px',
                                  borderRadius: '10px',
                                  background: 'rgba(7, 15, 30, 0.8)',
                                  border: '1.5px solid rgba(56, 189, 248, 0.3)'
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                                  <span style={{ fontSize: '0.98rem', fontWeight: 800, color: '#fff' }}>
                                    🎓 {d.title}
                                  </span>
                                  <span style={{ fontSize: '0.72rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.15)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                                    {d.examFrequency}
                                  </span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                                  {d.steps.map((st, sidx) => (
                                    <div key={sidx} style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                                      <MathText text={st} as="span" />
                                    </div>
                                  ))}
                                </div>

                                {d.finalFormula && (
                                  <div style={{
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    background: 'rgba(0, 240, 255, 0.08)',
                                    border: '1.5px solid var(--neon-cyan)',
                                    boxShadow: '0 0 15px rgba(0, 240, 255, 0.2)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: '10px'
                                  }}>
                                    <div className="final-boxed-formula-content" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                      <span style={{ fontSize: '0.76rem', fontWeight: 900, color: 'var(--neon-cyan)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                        FINAL BOXED FORMULA:
                                      </span>
                                      <MathFormula formula={d.finalFormula} isDisplay={false} style={{ fontSize: '1.08rem', color: 'var(--neon-cyan)' }} />
                                    </div>
                                    <button 
                                      type="button"
                                      onClick={() => handleCopyFormula(d.finalFormula)}
                                      style={{ background: 'rgba(0, 240, 255, 0.15)', border: '1px solid rgba(0, 240, 255, 0.3)', borderRadius: '6px', padding: '4px 10px', color: 'var(--neon-cyan)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', fontWeight: 700 }}
                                      title="Copy Formula LaTeX"
                                    >
                                      {copiedFormula === d.finalFormula ? <CheckCheck size={14} /> : <Copy size={14} />}
                                      <span>{copiedFormula === d.finalFormula ? 'Copied' : 'Copy'}</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 4. Essential Exam Formulas (Full KaTeX Typesetting) */}
                      {currentUnit.formulas && currentUnit.formulas.length > 0 && (
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <Flame size={18} color="var(--neon-amber)" />
                            <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#fff', fontWeight: 800 }}>
                              ⚡ Essential Formulas Cheat Sheet (KaTeX Rendered)
                            </h4>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '12px' }}>
                            {currentUnit.formulas.map((f, fidx) => (
                              <div 
                                key={fidx}
                                style={{
                                  padding: '14px 16px',
                                  borderRadius: '8px',
                                  background: 'rgba(15, 23, 42, 0.75)',
                                  border: '1px solid rgba(255, 170, 0, 0.3)',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '8px'
                                }}
                              >
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700 }}>
                                  {f.name}
                                </div>
                                <div className="essential-formula-math" style={{ fontSize: '1.05rem', color: '#ffaa00', fontWeight: 700, padding: '4px 0', overflowX: 'auto' }}>
                                  <MathFormula formula={f.formula} isDisplay={false} />
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                  Usage: <MathText text={f.whereUsed} as="span" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 5. Examiner Warnings & Pitfalls */}
                      {currentUnit.examinerTips && (
                        <div style={{
                          padding: '14px 18px',
                          borderRadius: '8px',
                          background: 'rgba(255, 42, 109, 0.1)',
                          border: '1px solid rgba(255, 42, 109, 0.3)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px'
                        }}>
                          <AlertTriangle size={18} color="#ff2a6d" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ff2a6d', textTransform: 'uppercase' }}>
                              ⚠️ TOPPER EXAM WARNING &amp; COMMON TRAP:
                            </span>
                            <div style={{ margin: '3px 0 0 0', fontSize: '0.84rem', color: '#fecdd3', lineHeight: 1.45 }}>
                              <MathText text={currentUnit.examinerTips} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()
              )}
            </div>
          </div>
          {/* End revision-screen-content */}

            {/* =============================================================
               DEDICATED FULL PRINT DOCUMENT (Hidden on screen, revealed on print)
               Renders all Units (1-4), Solved Questions, Formulas & Traps sequentially
               ============================================================= */}
            <div className="revision-print-document">
              {/* Document Master Header */}
              <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '14px', marginBottom: '20px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#475569' }}>
                  MMEC TECHNICAL UNIVERSITY EXAMINATION ARCHIVE • FAST-TRACK REVISION MASTER
                </div>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '6px 0 2px 0' }}>
                  {selectedRevisionNote.subject} ({selectedRevisionNote.code})
                </h1>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2563eb' }}>
                  {selectedRevisionNote.semester} • {selectedRevisionNote.year} • Official Syllabus Aligned Handbook
                </div>
                {selectedRevisionNote.summary && (
                  <p style={{ margin: '8px auto 0 auto', maxWidth: '800px', fontSize: '0.85rem', color: '#334155', fontStyle: 'italic', lineHeight: 1.4 }}>
                    {selectedRevisionNote.summary}
                  </p>
                )}
              </div>

              {/* Units 1 to 4 Section */}
              {selectedRevisionNote.units && selectedRevisionNote.units.map(unit => (
                <div key={unit.unitNum} className="rev-print-unit-block" style={{ marginBottom: '26px', paddingBottom: '20px', borderBottom: '1.5px solid #cbd5e1' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f1f5f9', padding: '8px 14px', borderRadius: '6px', borderLeft: '5px solid #0284c7', marginBottom: '14px' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                      UNIT {unit.unitNum}: {unit.title}
                    </div>
                    {unit.weightage && (
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0369a1', background: '#e0f2fe', padding: '2px 8px', borderRadius: '4px' }}>
                        Weightage: {unit.weightage}
                      </span>
                    )}
                  </div>

                  {/* 1. Core Theories & Formulations */}
                  {unit.keyTheories && unit.keyTheories.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', marginBottom: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                        📌 Core Theories &amp; Formulations
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {unit.keyTheories.map((th, tIdx) => (
                          <div key={tIdx} className="rev-print-avoid-break" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px 14px' }}>
                            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1e293b' }}>
                              {th.term}
                            </div>
                            <MathText text={th.definition} as="div" style={{ fontSize: '0.85rem', color: '#334155', margin: '4px 0', lineHeight: 1.5 }} />
                            {th.bulletPoints && (
                              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                                {th.bulletPoints.map((bp, bIdx) => (
                                  <li key={bIdx} style={{ marginBottom: '2px' }}>
                                    <MathText text={bp} as="span" />
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2. Core Concepts */}
                  {unit.coreConcepts && unit.coreConcepts.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', marginBottom: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                        📖 High-Yield Core Concepts
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {unit.coreConcepts.map((c, cIdx) => (
                          <div key={cIdx} className="rev-print-avoid-break" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '10px 14px' }}>
                            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1e293b' }}>
                              {typeof c === 'string' ? c : c.title}
                            </div>
                            {typeof c === 'object' && c.desc && (
                              <MathText text={c.desc} as="div" style={{ fontSize: '0.85rem', color: '#334155', marginTop: '4px', lineHeight: 1.5 }} />
                            )}
                            {typeof c === 'object' && c.takeaway && (
                              <div style={{ fontSize: '0.8rem', color: '#0369a1', fontWeight: 700, marginTop: '4px' }}>
                                💡 Key Takeaway: <MathText text={c.takeaway} as="span" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. Must-Know Derivations */}
                  {unit.derivations && unit.derivations.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', marginBottom: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
                        📐 Must-Know University Derivations (KaTeX Verified)
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {unit.derivations.map((d, dIdx) => (
                          <div key={dIdx} className="rev-print-avoid-break" style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '12px 14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                              <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>{d.title}</strong>
                              <span style={{ fontSize: '0.78rem', color: '#b45309', fontWeight: 700 }}>{d.examFrequency}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
                              {d.steps.map((st, sIdx) => (
                                <div key={sIdx} style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.5 }}>
                                  <MathText text={st} as="span" />
                                </div>
                              ))}
                            </div>
                            {d.finalFormula && (
                              <div style={{ background: '#e0f2fe', border: '1px solid #0284c7', borderRadius: '4px', padding: '6px 12px', fontSize: '0.88rem', color: '#0369a1', fontWeight: 800 }}>
                                Final Formula: <MathFormula formula={d.finalFormula} isDisplay={false} style={{ color: '#0369a1' }} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 4. Cheat Sheet Bullet Points */}
                  {unit.cheatSheet && unit.cheatSheet.length > 0 && (
                    <div className="rev-print-avoid-break" style={{ marginBottom: '16px', background: '#fefce8', border: '1px solid #fef08a', borderRadius: '6px', padding: '10px 14px' }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#854d0e', textTransform: 'uppercase', marginBottom: '6px' }}>
                        ⚡ High-Yield Cheat Sheet &amp; Rapid Facts
                      </div>
                      <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.84rem', color: '#713f12', lineHeight: 1.5 }}>
                        {unit.cheatSheet.map((pt, pIdx) => (
                          <li key={pIdx} style={{ marginBottom: '4px' }}>
                            <MathText text={pt} as="span" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 5. Formulas & Equations (KaTeX Typeset) */}
                  {unit.formulas && unit.formulas.length > 0 && (
                    <div className="rev-print-avoid-break" style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', marginBottom: '8px' }}>
                        📐 Essential Formulas, Equations &amp; Relations (KaTeX Typeset)
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
                        {unit.formulas.map((f, fIdx) => (
                          <div key={fIdx} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px 12px' }}>
                            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>{f.name}</div>
                            <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#b45309', margin: '4px 0' }}>
                              <MathFormula formula={f.formula} isDisplay={false} style={{ color: '#b45309' }} />
                            </div>
                            {f.whereUsed && <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Usage: <MathText text={f.whereUsed} as="span" /></div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 6. Examiner Tips */}
                  {unit.examinerTips && (
                    <div className="rev-print-avoid-break" style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '6px', padding: '10px 14px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#be123c', textTransform: 'uppercase' }}>
                        ⚠️ Top Ranker Exam Warning &amp; Pitfall:
                      </span>
                      <div style={{ margin: '4px 0 0 0', fontSize: '0.84rem', color: '#9f1239', lineHeight: 1.45 }}>
                        <MathText text={unit.examinerTips} />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Solved Questions Section */}
              {allSolvedQuestions && allSolvedQuestions.length > 0 && (
                <div style={{ marginTop: '28px', pageBreakBefore: 'auto' }}>
                  <div style={{ textAlign: 'center', background: '#0f172a', color: '#fff', padding: '10px 16px', borderRadius: '6px', marginBottom: '18px' }}>
                    <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900, letterSpacing: '0.04em' }}>
                      SOLVED UNIVERSITY EXAM QUESTIONS &amp; OFFICIAL MARKING SCHEMES
                    </h2>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                      Step-by-step model solutions curated from previous MMEC &amp; university examination papers
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {allSolvedQuestions.map((q, qIdx) => (
                      <div key={qIdx} className="rev-print-avoid-break" style={{ border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '14px 18px', background: '#fff' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '10px' }}>
                          <div>
                            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0369a1', background: '#e0f2fe', padding: '2px 8px', borderRadius: '4px', marginRight: '8px' }}>
                              Unit {q.unitNum}
                            </span>
                            <span style={{ fontSize: '0.94rem', fontWeight: 800, color: '#0f172a' }}>
                              Q{qIdx + 1}. <MathText text={q.question || q.q} as="span" />
                            </span>
                          </div>
                          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                            [{q.marks} Marks • {q.year}]
                          </span>
                        </div>

                        <div style={{ fontSize: '0.86rem', color: '#1e293b', lineHeight: 1.6 }}>
                          <MathText text={q.solution} />
                        </div>

                        {q.keyPoint && (
                          <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed #cbd5e1', fontSize: '0.8rem', fontWeight: 700, color: '#059669' }}>
                            🎯 Key Examiner Criterion: <MathText text={q.keyPoint} as="span" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ textAlign: 'center', margin: '30px 0 10px 0', paddingTop: '14px', borderTop: '1px solid #cbd5e1', color: '#64748b', fontSize: '0.78rem' }}>
                *** END OF EXAM REVISION HANDBOOK — ALL THE BEST FOR YOUR EXAMINATIONS ***
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
