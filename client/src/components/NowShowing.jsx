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
  'sub-dsa',
  'sub-dsa-bcse007',
  'sub-bcse007'
]);

export const isSubjectCardActive = (sub) => {
  if (!sub) return false;
  // Explicitly dead cards
  if (sub.id === 'sub-ai' || sub.code === 'CS601') return false;

  if (ACTIVE_SUBJECT_IDS.has(sub.id)) return true;

  const code = (sub.code || '').toUpperCase().trim();
  if (code === 'BELE-001' || code === 'EE101') return true;
  if (code === 'BCSE-011') return true;
  if (code === 'BMAT-001') return true;
  if (code === 'BCSE-008' || code === 'CS102') return true;
  if (code === 'BCSE-012') return true;
  if (code === 'PHYS102' || code === 'BPHY-001') return true;
  if (code === 'BCSE-004' || code === 'PYTHON') return true;
  if (code === 'BCSE-007' || code === 'CS301' || code === 'DSA') return true;

  return false;
};

export default function NowShowing({ onSelectSubject, onReadNotes }) {
  /* -----------------------------------------------------------------------
     STATE MANAGEMENT
     - selectedYear: Active Year filter ('All', '1st Year', '2nd Year', etc.)
     - selectedSem: Active Semester filter ('All', '1', '2', ..., '8')
     - searchQuery: User text input in search field
     - featuredSubject: Subject shown in the top hero spotlight banner
     ----------------------------------------------------------------------- */
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedSem, setSelectedSem] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [subjects] = useState(initialSubjects);
  const [hoveredSubId, setHoveredSubId] = useState(null);
  const [featuredSubject, setFeaturedSubject] = useState(
    initialSubjects.find(s => s.id === 'sub-beee') || initialSubjects[0]
  ); // Defaults to BEEE (BELE-001) Flagship Subject

  /* -----------------------------------------------------------------------
     FILTER LOGIC
     Filters subjects by Year, Semester, and Subject Name / Course Code
     ----------------------------------------------------------------------- */
  const filteredSubjects = subjects.filter(sub => {
    const matchesYear = selectedYear === 'All' || sub.year === selectedYear;
    const matchesSem = selectedSem === 'All' || sub.semester === Number(selectedSem);
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sub.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesSem && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* -------------------------------------------------------------------
         PART A: HERO SPOTLIGHT SUBJECT BANNER
         Shows featured subject with detailed info and direct launch buttons
         ------------------------------------------------------------------- */}
      {featuredSubject && (
        <div 
          className="glass-panel" 
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '340px',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '36px',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)'
          }}
        >
          <img 
            src={featuredSubject.banner} 
            alt={featuredSubject.name}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.3) contrast(1.1)',
              zIndex: 0
            }}
          />
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, #07090e 10%, rgba(7,9,14,0.7) 60%, transparent 100%)',
              zIndex: 1
            }}
          />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '780px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span className="badge-crimson font-display">FEATURED STUDY MODULE</span>
              <span className="badge-neon">{featuredSubject.year} • Semester {featuredSubject.semester}</span>
              <span className="badge-amber">{featuredSubject.code}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{featuredSubject.credits} Credits</span>
            </div>

            <h1 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '12px', lineHeight: 1.1, color: '#fff' }}>
              {featuredSubject.name}
            </h1>
            <p style={{ color: '#d0d8e8', fontSize: '0.96rem', marginBottom: '20px', lineHeight: 1.6 }}>
              {featuredSubject.description}
            </p>

            {/* Coverage & Verification Metrics */}
            <div style={{ 
              background: 'rgba(14, 18, 29, 0.85)', 
              padding: '14px 18px', 
              borderRadius: '12px', 
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '22px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--neon-cyan)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Coverage
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
                  {featuredSubject.notesCount}
                </div>
              </div>
              <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.1)' }} />
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--neon-green)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Verified Notes
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
                  Topper & Faculty Notes
                </div>
              </div>
              <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.1)' }} />
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--neon-amber)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Instructor
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
                  {featuredSubject.instructor}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button 
                className="btn-primary"
                onClick={() => {
                  if (!isSubjectCardActive(featuredSubject)) return;
                  onReadNotes && onReadNotes(featuredSubject);
                }}
              >
                <BookOpen size={16} /> Open Notes Reader <ChevronRight size={18} />
              </button>
              <button 
                className="btn-outline"
                onClick={() => {
                  if (!isSubjectCardActive(featuredSubject)) return;
                  onSelectSubject && onSelectSubject(featuredSubject);
                }}
              >
                <Download size={16} color="var(--neon-cyan)" /> Download Study Materials
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------
         PART B: YEAR & SEMESTER FILTER TABS + SEARCH BAR
         Allows students to switch between 1st, 2nd, 3rd, 4th Year and Sem 1-8
         ------------------------------------------------------------------- */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>Academic Year Filter</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Select your academic year to view relevant semester subjects</p>
          </div>

          {/* Quick Search Input */}
          <div style={{ position: 'relative', width: '280px' }}>
            <input
              type="text"
              placeholder="Search subject or code (e.g. CS301)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 36px',
                borderRadius: '8px',
                background: 'rgba(7, 9, 14, 0.8)',
                color: '#fff',
                border: '1px solid var(--border-dim)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        {/* 1st, 2nd, 3rd, 4th Year Filter Buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['All', '1st Year', '2nd Year', '3rd Year', '4th Year'].map(yr => {
            const isDead = yr === '2nd Year' || yr === '3rd Year' || yr === '4th Year';
            return (
              <button
                key={yr}
                disabled={isDead}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isDead) {
                    return false; // Dead button: clicking does nothing
                  }
                  setSelectedYear(yr);
                  setSelectedSem('All');
                }}
                title={isDead ? `${yr} (Unavailable)` : undefined}
                style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  cursor: isDead ? 'not-allowed' : 'pointer',
                  opacity: isDead ? 0.35 : 1,
                  background: (!isDead && selectedYear === yr) ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.05)',
                  color: (!isDead && selectedYear === yr) ? '#030a16' : isDead ? 'var(--text-dim)' : '#fff',
                  border: (!isDead && selectedYear === yr) ? 'none' : '1px solid var(--border-dim)',
                  transition: 'all 0.2s ease',
                  userSelect: 'none'
                }}
              >
                {yr}
              </button>
            );
          })}
        </div>

        {/* Semester 1 to 8 Filter Pills */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center', borderTop: '1px solid var(--border-dim)', paddingTop: '12px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginRight: '6px' }}>Semester:</span>
          {['All', '1', '2', '3', '4', '5', '6', '7', '8'].map(sem => {
            const isDead = sem !== 'All' && sem !== '1' && sem !== '2';
            return (
              <button
                key={sem}
                disabled={isDead}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isDead) {
                    return false; // Dead button: clicking does nothing
                  }
                  setSelectedSem(sem);
                }}
                title={isDead ? `Semester ${sem} (Unavailable)` : undefined}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: isDead ? 'not-allowed' : 'pointer',
                  opacity: isDead ? 0.35 : 1,
                  background: (!isDead && selectedSem === sem) ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
                  color: (!isDead && selectedSem === sem) ? 'var(--neon-cyan)' : 'var(--text-muted)',
                  border: (!isDead && selectedSem === sem) ? '1px solid var(--neon-cyan)' : '1px solid transparent',
                  transition: 'all 0.2s ease',
                  userSelect: 'none'
                }}
              >
                {sem === 'All' ? 'All Semesters' : `Semester ${sem}`}
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '22px' }}>
          {filteredSubjects.map(sub => {
            const isHovered = hoveredSubId === sub.id;
            const isFeatured = featuredSubject?.id === sub.id;
            const isCardActive = isSubjectCardActive(sub);
            const isDead = !isCardActive;

            return (
              <div 
                key={sub.id}
                className="glass-panel"
                style={{
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: isDead ? 'not-allowed' : 'pointer',
                  opacity: isDead ? 0.45 : 1,
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: (!isDead && isHovered) ? 'translateY(-4px)' : 'translateY(0)',
                  border: (!isDead && isHovered)
                    ? '1px solid var(--neon-cyan)'
                    : isDead
                      ? '1px solid rgba(255, 255, 255, 0.05)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: (!isDead && isHovered)
                    ? '0 8px 24px rgba(0, 240, 255, 0.22)'
                    : undefined,
                  userSelect: 'none'
                }}
                onMouseEnter={() => {
                  if (!isDead) setHoveredSubId(sub.id);
                }}
                onMouseLeave={() => {
                  if (!isDead) setHoveredSubId(null);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isDead) {
                    return false; // Dead card: clicking does nothing
                  }
                  setFeaturedSubject(sub);
                }}
                title={isDead ? `${sub.name} (Unavailable)` : undefined}
              >
              {/* Subject Thumbnail Banner */}
              <div style={{ position: 'relative', height: '140px', overflow: 'hidden' }}>
                <img 
                  src={sub.banner} 
                  alt={sub.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=800&q=80';
                  }}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: isDead ? 'grayscale(85%) brightness(0.7)' : 'none'
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
                  color: isDead ? 'var(--text-dim)' : 'var(--neon-cyan)',
                  border: isDead ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,240,255,0.3)'
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
                  <span style={{ background: 'rgba(7,9,14,0.9)', color: isDead ? 'var(--text-dim)' : 'var(--neon-amber)', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                    Semester {sub.semester}
                  </span>
                  <span style={{ background: 'rgba(7,9,14,0.9)', color: isDead ? 'var(--text-dim)' : '#fff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px' }}>
                    {sub.credits} Credits
                  </span>
                </div>
              </div>

              {/* Subject Information */}
              <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: isDead ? 'var(--text-dim)' : '#fff', marginBottom: '6px' }}>
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
                      <span key={u.num} style={{ background: 'rgba(255,255,255,0.05)', color: isDead ? 'var(--text-dim)' : 'var(--text-main)', fontSize: '0.68rem', padding: '2px 6px', borderRadius: '4px' }}>
                        U{u.num} ({u.pages}p)
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div style={{ borderTop: '1px solid var(--border-dim)', paddingTop: '12px', marginTop: 'auto', display: 'flex', gap: '8px' }}>
                  <button 
                    className={isDead ? "btn-secondary" : "btn-primary"} 
                    disabled={isDead}
                    style={{ 
                      flex: 1, 
                      padding: '8px 10px', 
                      fontSize: '0.82rem', 
                      justifyContent: 'center',
                      cursor: isDead ? 'not-allowed' : 'pointer',
                      opacity: isDead ? 0.35 : 1,
                      background: isDead ? 'rgba(255,255,255,0.05)' : undefined,
                      color: isDead ? 'var(--text-dim)' : undefined,
                      borderColor: isDead ? 'rgba(255,255,255,0.1)' : undefined
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isDead) {
                        return false; // Dead card: clicking does nothing
                      }
                      onReadNotes && onReadNotes(sub);
                    }}
                    title={isDead ? `${sub.name} (Unavailable)` : 'Read Notes'}
                  >
                    <BookOpen size={14} /> Read Notes
                  </button>
                  <button 
                    className="btn-outline" 
                    disabled={isDead}
                    style={{ 
                      padding: '8px 12px', 
                      fontSize: '0.82rem', 
                      cursor: isDead ? 'not-allowed' : 'pointer',
                      opacity: isDead ? 0.35 : 1,
                      borderColor: isDead ? 'rgba(255,255,255,0.1)' : undefined
                    }}
                    title={isDead ? `${sub.name} (Unavailable)` : 'Download PDFs'}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isDead) {
                        return false; // Dead card: clicking does nothing
                      }
                      onSelectSubject && onSelectSubject(sub);
                    }}
                  >
                    <Download size={14} color={isDead ? "var(--text-dim)" : "var(--neon-cyan)"} />
                  </button>
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
