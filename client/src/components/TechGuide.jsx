/* =========================================================================
   SECTION 3: SYLLABUS & ACADEMIC CURRICULUM GUIDE (TechGuide.jsx)
   =========================================================================
   EDIT THIS FILE to:
   1. Change semester curriculum tabs (Semester 1 to Semester 8)
   2. Modify credit distribution calculation (Theory, Internal, End-Sem)
   3. Edit course syllabus listings per semester
   4. Update prescribed university reference textbooks
   ========================================================================= */

import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Layers, 
  Bookmark, 
  SlidersHorizontal 
} from 'lucide-react';
import { initialSubjects, academicYears } from '../data/mockData';

export default function TechGuide() {
  /* -----------------------------------------------------------------------
     STATE: Currently viewed semester (defaults to Semester 1)
     ----------------------------------------------------------------------- */
  const [selectedSem, setSelectedSem] = useState(1);
  const [subjects] = useState(initialSubjects);

  // Filter subjects for the chosen semester
  const semSubjects = subjects.filter(s => s.semester === selectedSem);
  // Calculate total credit sum for the semester
  const totalCredits = semSubjects.reduce((acc, curr) => acc + curr.credits, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* -------------------------------------------------------------------
         PART A: SYLLABUS HEADER
         ------------------------------------------------------------------- */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge-neon font-display">OFFICIAL CURRICULUM SCHEME</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>University Academic Council Approved</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff' }}>Syllabus & Credit Distribution</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', maxWidth: '750px' }}>
          Explore the official semester curriculum, credit hours, unit breakdown, and recommended reference textbooks across all 8 semesters.
        </p>
      </div>

      {/* -------------------------------------------------------------------
         PART B: SEMESTER SELECTOR PILLS (Clean, active semesters only)
         ------------------------------------------------------------------- */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
        {[
          { num: 1, label: 'Semester 1', count: subjects.filter(s => s.semester === 1).length },
          { num: 2, label: 'Semester 2', count: subjects.filter(s => s.semester === 2).length }
        ].map(sem => {
          const isSelected = selectedSem === sem.num;
          return (
            <button
              key={sem.num}
              onClick={() => setSelectedSem(sem.num)}
              className="glass-panel"
              style={{
                padding: '10px 22px',
                borderRadius: '24px',
                fontSize: '0.88rem',
                fontWeight: isSelected ? 800 : 600,
                cursor: 'pointer',
                color: isSelected ? '#030a16' : '#e2e8f0',
                background: isSelected ? 'var(--neon-cyan)' : 'rgba(255, 255, 255, 0.06)',
                border: isSelected ? 'none' : '1px solid var(--border-dim)',
                boxShadow: isSelected ? '0 0 16px rgba(0, 240, 255, 0.35)' : 'none',
                userSelect: 'none',
                transition: 'all 0.15s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{sem.label}</span>
              <span style={{
                fontSize: '0.75rem',
                padding: '2px 8px',
                borderRadius: '12px',
                background: isSelected ? 'rgba(3, 10, 22, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                color: isSelected ? '#030a16' : 'var(--neon-cyan)',
                fontWeight: 700
              }}>
                {sem.count} Courses
              </span>
            </button>
          );
        })}
      </div>

      {/* -------------------------------------------------------------------
         PART C: SEMESTER EVALUATION SCHEME BANNER
         Shows Internal vs Mid-term vs End-Sem weightage
         ------------------------------------------------------------------- */}
      <div 
        className="glass-panel"
        style={{
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(14, 18, 29, 0.9), rgba(9, 21, 38, 0.9))',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <span className="badge-crimson" style={{ marginBottom: '6px' }}>SEMESTER {selectedSem} PROFILE</span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
            Curriculum Structure & Evaluation Scheme
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Internal Assessment: 30% | Mid-Term Exam: 20% | University End-Sem Theory: 50%
          </p>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--neon-cyan)', textTransform: 'uppercase' }}>Subjects Count</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>{semSubjects.length} Core Courses</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--neon-green)', textTransform: 'uppercase' }}>Total Credits</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>{totalCredits || 18} Credits</div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------
         PART D: SUBJECT SYLLABUS CARDS WITH PRESCRIBED TEXTBOOKS
         ------------------------------------------------------------------- */}
      <div className="syllabus-cards-grid">
        {semSubjects.map(sub => (
          <div key={sub.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="badge-neon" style={{ marginBottom: '6px' }}>{sub.code}</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginTop: '6px' }}>
                  {sub.name}
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                  Course Lead: {sub.instructor}
                </div>
              </div>
              <span className="badge-amber">{sub.credits} Credits</span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: 1.5 }}>
              {sub.description}
            </p>

            {/* Units Checklist */}
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--neon-cyan)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                Course Units Syllabus (100% Coded):
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {sub.units.map(u => (
                  <div key={u.num} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#d0d8e8' }}>
                    <CheckCircle2 size={14} color="var(--neon-green)" />
                    <span><strong>Unit {u.num}:</strong> {u.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Reference Books */}
            <div style={{
              marginTop: 'auto',
              background: 'rgba(7, 9, 14, 0.6)',
              padding: '12px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border-dim)'
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Prescribed University Textbooks:
              </div>
              <div style={{ fontSize: '0.78rem', color: '#fff', fontStyle: 'italic' }}>
                1. Standard Text by Cormen / Galvin / Tanenbaum (Latest Edition)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
