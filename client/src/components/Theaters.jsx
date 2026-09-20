/* =========================================================================
   SECTION 4: SHORT NOTES & EXAM REVISION SHEETS (Theaters.jsx)
   =========================================================================
   Features:
   1. Filter high-yield exam short notes by Category (All, Mathematics, Core Engineering, Computer Science, AI)
   2. Search notes by Subject Title, Course Code, or Topic keywords
   3. Direct, high-speed PDF Review and Instant Download
   4. High-yield syllabus bullet highlights with KaTeX formatting
   ========================================================================= */

import React, { useState } from 'react';
import { 
  Download, 
  Search, 
  FileText, 
  CheckCircle, 
  Sparkles,
  Award,
  Eye,
  Zap,
  BookOpen
} from 'lucide-react';
import { initialShortNotes } from '../data/mockData';
import { logUserActivity } from '../utils/activityTracker';

/* -------------------------------------------------------------------------
   ACADEMIC YEARS & SEMESTER CONFIGURATION
   Each academic year consists of exactly two semesters.
   ------------------------------------------------------------------------- */
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'All Years'];

const YEAR_CONFIG = {
  '1st Year': {
    label: '1st Year',
    semesters: [
      { id: 'Semester 1', num: 1, title: 'Semester 1', subtitle: 'Calculus, BEEE, C Programming, Web Tech & AI' },
      { id: 'Semester 2', num: 2, title: 'Semester 2', subtitle: 'Applied Physics & Python Programming' }
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
      { id: 'Semester 6', num: 6, title: 'Semester 6', subtitle: 'Software Engineering & Cloud Computing' }
    ]
  },
  '4th Year': {
    label: '4th Year',
    semesters: [
      { id: 'Semester 7', num: 7, title: 'Semester 7', subtitle: 'Compiler Design & Artificial Intelligence' },
      { id: 'Semester 8', num: 8, title: 'Semester 8', subtitle: 'Deep Learning & Blockchain Technology' }
    ]
  }
};

export default function Theaters({ currentUser }) {
  /* -----------------------------------------------------------------------
     STATE MANAGEMENT
     - searchQuery: Filter notes by typed query
     - selectedYear: Active Year filter ('1st Year', '2nd Year', '3rd Year', '4th Year', 'All Years')
     - selectedSemester: Active Semester filter ('All' or specific 'Semester X')
     ----------------------------------------------------------------------- */
  const [shortNotes] = useState(initialShortNotes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('1st Year');
  const [selectedSemester, setSelectedSemester] = useState('All');

  // Filter notes based on search text, selected year, and selected semester
  const filteredNotes = shortNotes.filter(item => {
    const matchesSearch = 
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.highlights && item.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase())));
      
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

  const handleDownloadClick = (item) => {
    try {
      logUserActivity(
        currentUser?.username || 'student',
        'DOWNLOAD',
        `${item.code}: ${item.subject} Short Notes`,
        `Downloaded high-yield revision sheet (${item.fileSize})`
      );
    } catch (e) {}
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
      {/* -------------------------------------------------------------------
         PART A: SHORT NOTES HEADER & SEARCH INPUT
         ------------------------------------------------------------------- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge-neon font-display">⚡ HIGH-YIELD REVISION ARCHIVE</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>All Subjects • KaTeX Exam-Ready Short Notes</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff' }}>Short Notes &amp; Exam Revision Sheets</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', maxWidth: '750px' }}>
            Fast-track, high-yield university exam revision sheets complete with core formula summaries, key derivations, memory architectures, and verified exam proofs.
          </p>
        </div>

        {/* Search by Subject, Course Code or Topic */}
        <div style={{ minWidth: '280px' }}>
          <input
            type="text"
            placeholder="Search notes, codes, formulas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 18px',
              borderRadius: '10px',
              background: 'rgba(14, 18, 29, 0.9)',
              border: '1px solid var(--border-dim)',
              color: '#fff',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* -------------------------------------------------------------------
         PART B: YEAR SELECTOR BUTTONS (1st Year, 2nd Year, 3rd Year, 4th Year)
         Replaces subject names with academic years as requested.
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
                  padding: '10px 22px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  background: isSelected ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.05)',
                  color: isSelected ? '#07090e' : '#cbd5e1',
                  border: isSelected ? 'none' : '1px solid var(--border-dim)',
                  boxShadow: isSelected ? '0 0 18px rgba(0, 240, 255, 0.35)' : 'none',
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

        {/* -----------------------------------------------------------------
           SEMESTER BOXES: Exactly two boxes appear when any Year is clicked
           ----------------------------------------------------------------- */}
        {selectedYear !== 'All Years' && YEAR_CONFIG[selectedYear] && (
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '14px',
              padding: '20px 24px',
              borderRadius: '14px',
              background: 'rgba(10, 15, 29, 0.7)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              marginTop: '4px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--neon-cyan)', fontSize: '0.92rem', fontWeight: 800 }}>⚡ {selectedYear} Semesters</span>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>• Click a semester box below to filter revision sheets</span>
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {YEAR_CONFIG[selectedYear].semesters.map(sem => {
                const isSelected = selectedSemester === sem.id;
                const semNotes = shortNotes.filter(n => n.semester === sem.id);
                const noteCount = semNotes.length;

                return (
                  <div
                    key={sem.id}
                    onClick={() => {
                      setSelectedSemester(isSelected ? 'All' : sem.id);
                    }}
                    role="button"
                    tabIndex={0}
                    style={{
                      padding: '22px 24px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: isSelected 
                        ? '2px solid var(--neon-cyan)' 
                        : '1px solid rgba(255, 255, 255, 0.12)',
                      background: isSelected 
                        ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(14, 165, 233, 0.15) 100%)' 
                        : 'rgba(14, 18, 29, 0.85)',
                      boxShadow: isSelected 
                        ? '0 0 24px rgba(0, 240, 255, 0.25), inset 0 0 16px rgba(0, 240, 255, 0.1)' 
                        : '0 4px 14px rgba(0, 0, 0, 0.3)',
                      transform: isSelected ? 'translateY(-2px)' : 'none',
                      userSelect: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div 
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: isSelected ? 'var(--neon-cyan)' : 'var(--text-dim)',
                            boxShadow: isSelected ? '0 0 10px var(--neon-cyan)' : 'none'
                          }} 
                        />
                        <h3 style={{ 
                          margin: 0, 
                          fontSize: '1.35rem', 
                          fontWeight: 900, 
                          color: isSelected ? '#fff' : '#f1f5f9' 
                        }}>
                          {sem.title}
                        </h3>
                      </div>
                      <span 
                        className="badge-neon" 
                        style={{ 
                          fontSize: '0.78rem',
                          padding: '4px 10px',
                          background: isSelected ? 'var(--neon-cyan)' : 'rgba(0, 240, 255, 0.12)',
                          color: isSelected ? '#07090e' : 'var(--neon-cyan)',
                          fontWeight: 800
                        }}
                      >
                        {noteCount} {noteCount === 1 ? 'Exam Sheet' : 'Exam Sheets'}
                      </span>
                    </div>

                    <p style={{ 
                      margin: 0, 
                      fontSize: '0.85rem', 
                      color: isSelected ? '#cbd5e1' : 'var(--text-muted)',
                      lineHeight: 1.45
                    }}>
                      {sem.subtitle}
                    </p>

                    <div style={{ 
                      marginTop: '4px',
                      paddingTop: '10px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      fontSize: '0.8rem', 
                      color: isSelected ? 'var(--neon-cyan)' : 'var(--text-dim)',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span>{isSelected ? '✓ Filter Active (Click to show both semesters)' : 'Click to filter semester notes'}</span>
                      <span style={{ fontSize: '1rem' }}>{isSelected ? '●' : '→'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* -------------------------------------------------------------------
         PART C: SHORT NOTES GRID
         ------------------------------------------------------------------- */}
      {filteredNotes.length === 0 ? (
        <div className="glass-panel" style={{ padding: '48px 24px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '16px' }}>
            No exam revision sheets found matching your selected filters.
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
          {filteredNotes.map(item => (
            <div 
              key={item.id} 
              className="glass-panel" 
              style={{ 
                padding: '24px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '16px',
                border: '1px solid rgba(0, 240, 255, 0.25)',
                background: 'linear-gradient(135deg, rgba(7, 15, 30, 0.85) 0%, rgba(10, 20, 45, 0.7) 100%)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="badge-neon" style={{ marginBottom: '6px' }}>
                    {item.category} • {item.pages}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginTop: '6px' }}>
                    {item.subject}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--neon-cyan)', marginTop: '2px', fontWeight: 600 }}>
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
                  <Zap size={15} color="var(--neon-cyan)" />
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
              <div style={{ marginTop: 'auto', paddingTop: '8px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a 
                  href={item.isDead || item.code === 'CS301' ? undefined : item.pdfUrl}
                  target={item.isDead || item.code === 'CS301' ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="btn-secondary" 
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
                  onClick={(e) => {
                    if (item.isDead || item.code === 'CS301') {
                      e.preventDefault();
                    }
                  }}
                  title={item.isDead || item.code === 'CS301' ? 'Under Preparation (Unavailable)' : 'Open & Review PDF'}
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
                  title={item.isDead || item.code === 'CS301' ? 'Under Preparation (Unavailable)' : 'Download Short Notes'}
                >
                  <Download size={16} /> Download Short Notes
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
