/* =========================================================================
   SECTION 1: SEMESTER NOTES & SUBJECTS CATALOG (NowShowing.jsx)
   =========================================================================
   EDIT THIS FILE to:
   1. Change the top Featured Subject banner layout
   2. Edit Year filter tabs (1st Year, 2nd Year, 3rd Year, 4th Year)
   3. Edit Semester filter pills (Semester 1 through 8)
   4. Customize the Subject Cards grid (course code badges, units pills)
   5. Modify the Search bar behavior
   ========================================================================= */

import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Download, 
  Search, 
  GraduationCap, 
  CheckCircle, 
  Clock, 
  Layers, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { initialSubjects, academicYears } from '../data/mockData';

/* -------------------------------------------------------------------------
   ACTIVE 5 CORE SUBJECTS (All other subject cards are inactive / dead)
   1. Basic Electrical & Electronics Engineering (sub-beee)
   2. Fundamentals of AI & ML (sub-aiml)
   3. Mathematics I (sub-m1)
   4. Computational & Problem Solving in C (sub-c1)
   5. Fundamentals of Web Technologies (sub-webtech)
   6. Applied Physics (sub-p1 / PHYS102 / BPHY-001)
   ------------------------------------------------------------------------- */
const ACTIVE_SUBJECT_IDS = new Set([
  'sub-beee',
  'sub-aiml',
  'sub-m1',
  'sub-c1',
  'sub-webtech',
  'sub-p1',
  'sub-physics',
  'sub-py',
  'sub-python',
  'sub-dsa-bcse007',
  'sub-bcse007'
]);

export const isSubjectCardActive = (sub) => {
  if (!sub) return false;
  // Explicitly dead cards: AI, CS601, and CS301 (Data Structures & Algorithms)
  if (sub.id === 'sub-ai' || sub.code === 'CS601') return false;
  if (sub.id === 'sub-dsa' || sub.code === 'CS301') return false;

  if (ACTIVE_SUBJECT_IDS.has(sub.id)) return true;

  const code = (sub.code || '').toUpperCase().trim();
  if (code === 'BELE-001' || code === 'EE101') return true;
  if (code === 'BCSE-011') return true;
  if (code === 'BMAT-001') return true;
  if (code === 'BCSE-008' || code === 'CS102') return true;
  if (code === 'BCSE-012') return true;
  if (code === 'PHYS102' || code === 'BPHY-001') return true;
  if (code === 'BCSE-004' || code === 'PYTHON') return true;
  if (code === 'BCSE-007') return true;

  return false;
};

export const getSubjectPdf = (sub) => {
  if (!sub) return { url: '/BELE001_Basic_Electrical_and_Electronics_Engineering_notes.pdf', name: 'BELE001_BEEE_Notes.pdf' };
  const id = (sub.id || '').toLowerCase();
  const code = (sub.code || '').toUpperCase();
  const name = (sub.name || '').toLowerCase();

  if (id.includes('beee') || code.includes('BELE') || name.includes('electrical')) {
    return { url: '/BELE001_Basic_Electrical_and_Electronics_Engineering_notes.pdf', name: 'BELE001_BEEE_Notes.pdf' };
  }
  if (id.includes('aiml') || code.includes('BCSE-011') || code.includes('BCSE011') || name.includes('ai & ml')) {
    return { url: '/AIML_notes_handwritten.pdf', name: 'BCSE011_AIML_Notes.pdf' };
  }
  if (id.includes('m1') || id.includes('math') || code.includes('BMAT') || name.includes('mathematics')) {
    return { url: '/BMAT001_Mathematics_I_MMU_Handwritten_Notes.pdf', name: 'BMAT001_Maths_I_Notes.pdf' };
  }
  if (id.includes('c1') || id.includes('c-prog') || code.includes('BCSE-008') || code.includes('BCSE008') || name.includes('using c')) {
    return { url: '/BCSE008_Computational_and_Problem_Solving_using_C_notes.pdf', name: 'BCSE008_C_Programming_Notes.pdf' };
  }
  if (id.includes('webtech') || code.includes('BCSE-012') || code.includes('BCSE012') || name.includes('web')) {
    return { url: '/BCSE012_Fundamental_of_Web_Technologies_Long_Notes.pdf', name: 'BCSE012_Web_Technologies_Notes.pdf' };
  }
  if (id.includes('p1') || id.includes('phy') || code.includes('PHYS') || code.includes('BPHY') || name.includes('physics')) {
    return { url: '/Applied_Physics_Master_Notes.pdf', name: 'Applied_Physics_Notes.pdf' };
  }
  if (id.includes('py') || code.includes('BCSE-004') || code.includes('BCSE004') || name.includes('python')) {
    return { url: '/Python_Programming_Master_Notes.pdf', name: 'Python_Programming_Notes.pdf' };
  }
  if (id.includes('dsa') || code.includes('BCSE-007') || code.includes('BCSE007') || name.includes('data structure')) {
    return { url: '/Data_Structures_Master_Notes.pdf', name: 'Data_Structures_Notes.pdf' };
  }
  return { url: '/BELE001_Basic_Electrical_and_Electronics_Engineering_notes.pdf', name: `${sub.code || 'College'}_Notes.pdf` };
};

export default function NowShowing({ onReadNotes }) {
  /* -----------------------------------------------------------------------
     STATE MANAGEMENT
     - selectedSem: Active Semester filter ('All', '1', '2')
     - searchQuery: User text input in search field
     - featuredSubject: Subject shown in the top hero spotlight banner
     ----------------------------------------------------------------------- */
  const [selectedSem, setSelectedSem] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Only present verified, active subjects with full notes ready
  const activeSubjects = initialSubjects.filter(isSubjectCardActive);
  const [featuredSubject, setFeaturedSubject] = useState(
    activeSubjects.find(s => s.id === 'sub-beee') || activeSubjects[0]
  );

  /* -----------------------------------------------------------------------
     FILTER LOGIC
     Filters active subjects by Semester and Subject Name / Course Code
     ----------------------------------------------------------------------- */
  const filteredSubjects = activeSubjects.filter(sub => {
    const matchesSem = selectedSem === 'All' || sub.semester === Number(selectedSem);
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sub.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSem && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* -------------------------------------------------------------------
         PART A: HERO SPOTLIGHT SUBJECT BANNER (Desktop/Tablet Hero)
         ------------------------------------------------------------------- */}
      {featuredSubject && (
        <div 
          className="glass-panel hero-spotlight-panel" 
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '280px',
            display: 'flex',
            alignItems: 'flex-end',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)'
          }}
        >
          <img 
            src={featuredSubject.banner || '/images/dsa.jpg'} 
            alt={featuredSubject.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/dsa.jpg';
            }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.25) contrast(1.1)',
              zIndex: 0
            }}
          />
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, #07090e 15%, rgba(7,9,14,0.7) 65%, transparent 100%)',
              zIndex: 1
            }}
          />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '780px', width: '100%', padding: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
              <span className="badge-crimson font-display">VERIFIED CURRICULUM</span>
              <span className="badge-neon">1st Year • Semester {featuredSubject.semester}</span>
              <span className="badge-amber">{featuredSubject.code}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{featuredSubject.credits} Credits</span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 900, marginBottom: '8px', lineHeight: 1.2, color: '#fff', wordBreak: 'break-word' }}>
              {featuredSubject.name}
            </h1>
            <p style={{ color: '#d0d8e8', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.5 }}>
              {featuredSubject.description}
            </p>

            <div className="hero-btn-group" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button 
                className="btn-primary"
                onClick={() => onReadNotes && onReadNotes(featuredSubject)}
              >
                <BookOpen size={16} /> Open Notes Reader <ChevronRight size={18} />
              </button>
              {(() => {
                const pdf = getSubjectPdf(featuredSubject);
                return (
                  <a 
                    className="btn-outline"
                    href={pdf.url}
                    download={pdf.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download size={16} color="var(--neon-cyan)" /> Download Study Materials
                  </a>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------
         PART B: SEMESTER FILTER TABS + SEARCH BAR (Clean, fast, no dead buttons)
         ------------------------------------------------------------------- */}
      <div className="glass-panel" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: 0 }}>Subject Catalog</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: '4px 0 0 0' }}>All 8 Core B.Tech Subjects with Complete Lecture Notes</p>
          </div>

          {/* Quick Search Input */}
          <div className="catalog-search-wrapper" style={{ minWidth: '260px', flex: '1', maxWidth: '380px', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search by subject name or code (e.g. BEEE, Python)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 14px 9px 36px',
                borderRadius: '8px',
                background: 'rgba(7, 9, 14, 0.85)',
                color: '#fff',
                border: '1px solid var(--border-dim)',
                fontSize: '0.84rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <Search size={15} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        {/* Active Semester Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { id: 'All', label: `All Subjects (${activeSubjects.length})` },
            { id: '1', label: `Semester 1 (${activeSubjects.filter(s => s.semester === 1).length} Subjects)` },
            { id: '2', label: `Semester 2 (${activeSubjects.filter(s => s.semester === 2).length} Subjects)` }
          ].map(tab => {
            const isSelected = selectedSem === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedSem(tab.id)}
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
      </div>


      {/* -------------------------------------------------------------------
         PART C: SUBJECT CARDS GRID
         Renders every filtered subject with unit tags and action buttons
         ------------------------------------------------------------------- */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>Available Subjects & Unit Notes</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Showing {filteredSubjects.length} subjects for your selection</p>
          </div>
          <span className="badge-neon">{filteredSubjects.length} SUBJECTS</span>
        </div>

        <div className="subject-cards-grid">
          {filteredSubjects.map(sub => {
            const isFeatured = featuredSubject?.id === sub.id;

            return (
              <div 
                key={sub.id}
                className="glass-panel subject-catalog-card"
                onClick={() => onReadNotes && onReadNotes(sub)}
                style={{ cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                title={`Open Notes Reader for ${sub.name}`}
              >
                {/* Subject Thumbnail Banner */}
                <div style={{ position: 'relative', height: '140px', overflow: 'hidden' }}>
                  <img 
                    src={sub.banner || '/images/dsa.jpg'} 
                    alt={sub.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/dsa.jpg';
                    }}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(7,9,14,0.85)',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--neon-cyan)',
                    border: '1px solid rgba(0,240,255,0.3)'
                  }}>
                    {sub.code}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '10px',
                    display: 'flex',
                    gap: '6px'
                  }}>
                    <span style={{ background: 'rgba(7,9,14,0.9)', color: 'var(--neon-amber)', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      Semester {sub.semester}
                    </span>
                    <span style={{ background: 'rgba(7,9,14,0.9)', color: '#fff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px' }}>
                      {sub.credits} Credits
                    </span>
                  </div>
                </div>

                {/* Subject Information */}
                <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
                    {sub.name}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '14px', flex: 1, lineHeight: 1.5 }}>
                    {sub.description.slice(0, 95)}...
                  </p>

                  {/* Available Unit Pills */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Units Available:
                    </div>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {sub.units.map(u => (
                        <span key={u.num} style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', fontSize: '0.68rem', padding: '2px 6px', borderRadius: '4px' }}>
                          U{u.num} ({u.pages}p)
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div style={{ borderTop: '1px solid var(--border-dim)', paddingTop: '12px', marginTop: 'auto', display: 'flex', gap: '8px' }}>
                    <button 
                      className="btn-primary" 
                      style={{ 
                        flex: 1, 
                        padding: '8px 10px', 
                        fontSize: '0.82rem', 
                        justifyContent: 'center'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onReadNotes && onReadNotes(sub);
                      }}
                      title="Read Notes"
                    >
                      <BookOpen size={14} /> Read Notes
                    </button>
                    {(() => {
                      const pdf = getSubjectPdf(sub);
                      return (
                        <a 
                          className="btn-outline" 
                          href={pdf.url}
                          download={pdf.name}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ 
                            padding: '8px 12px', 
                            fontSize: '0.82rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none'
                          }}
                          title={`Download ${pdf.name}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download size={14} color="var(--neon-cyan)" />
                        </a>
                      );
                    })()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
