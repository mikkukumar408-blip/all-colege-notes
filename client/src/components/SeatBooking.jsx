import { logUserActivity } from '../utils/activityTracker';
/* =========================================================================
   SECTION 5: LAB MANUALS & DOWNLOAD HUB (SeatBooking.jsx)
   =========================================================================
   EDIT THIS FILE to:
   1. Modify the verified Practical Laboratory Manuals list
   2. Edit options in the Custom Study Bundle Generator (Viva, PYQs, Formula sheets)
   3. Update download confirmation card and confetti trigger
   ========================================================================= */

import React, { useState } from 'react';
import { 
  DownloadCloud, 
  FileText, 
  CheckCircle2, 
  FolderArchive, 
  Sparkles, 
  Check, 
  Code2, 
  HelpCircle,
  Eye,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialSubjects, initialLabManuals } from '../data/mockData';

export default function SeatBooking({ currentUser, preselectedMovie }) {
  /* -----------------------------------------------------------------------
     STATE MANAGEMENT
     - selectedSubjectId: Chosen subject for bundle compilation
     - includeViva: Checkbox for viva-voce answers
     - includePYQs: Checkbox for solved past exam questions
     - includeFormulaSheets: Checkbox for formula cheat sheet
     - downloadSuccess: Triggers confirmation view with confetti
     ----------------------------------------------------------------------- */
  const [subjects] = useState(initialSubjects);
  const [labManuals] = useState(initialLabManuals);
  const [selectedSubjectId, setSelectedSubjectId] = useState(preselectedMovie?.id || initialSubjects[3].id);
  const [includeViva, setIncludeViva] = useState(true);
  const [includePYQs, setIncludePYQs] = useState(true);
  const [includeFormulaSheets, setIncludeFormulaSheets] = useState(true);
  const [studentRollNo, setStudentRollNo] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const activeSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  /* -----------------------------------------------------------------------
     ACTION: Compiles bundle and triggers confetti celebration
     ----------------------------------------------------------------------- */
  const handleGenerateBundle = (e) => {
    e.preventDefault();
    setDownloadSuccess(true);
    try {
      logUserActivity(
        currentUser?.username || 'student',
        'DOWNLOAD',
        `${activeSubject.code || ''}: ${activeSubject.name} Complete Study Bundle`,
        `Generated custom bundle with Viva Q&A and Formula sheets`
      );
    } catch (err) {}
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {}
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* -------------------------------------------------------------------
         PART A: RESOURCE HUB HEADER
         ------------------------------------------------------------------- */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge-neon font-display">RESOURCE REPOSITORY</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Free & High-Speed Direct Downloads</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff' }}>Lab Manuals & Subject Download Bundles</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>
          Download official practical lab manuals, executable experiment programs, viva-voce answers, and complete 5-unit semester note packages.
        </p>
      </div>

      {/* -------------------------------------------------------------------
         PART B: DOWNLOAD CONFIRMATION VOUCHER (Shown after clicking compile)
         ------------------------------------------------------------------- */}
      {downloadSuccess ? (
        <div 
          className="glass-panel" 
          style={{ 
            padding: '40px', 
            maxWidth: '650px', 
            margin: '0 auto', 
            textAlign: 'center', 
            border: '2px solid var(--neon-cyan)',
            boxShadow: '0 0 40px rgba(0, 240, 255, 0.25)'
          }}
        >
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(5, 255, 161, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--neon-green)' }}>
            <CheckCircle2 size={36} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginBottom: '10px' }}>
            Study Material Ready for Download!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '24px' }}>
            Your bundle for <strong>{activeSubject.name} ({activeSubject.code})</strong> has been compiled.
          </p>

          <div style={{ background: 'rgba(7, 9, 14, 0.7)', borderRadius: '12px', padding: '20px', textAlign: 'left', marginBottom: '24px', border: '1px solid var(--border-dim)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Package Contents:</span>
              <strong style={{ color: '#fff' }}>Units 1–5 Complete Lecture Notes</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Included Supplements:</span>
              <strong style={{ color: 'var(--neon-green)' }}>
                {includeViva ? 'Viva Q&A • ' : ''}{includePYQs ? 'Solved PYQs • ' : ''}{includeFormulaSheets ? 'Formula Cheatsheet' : ''}
              </strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Total File Size:</span>
              <strong style={{ color: 'var(--neon-cyan)', fontSize: '1rem' }}>14.8 MB (High-Quality PDF)</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {activeSubject.code === 'MATH101' || activeSubject.id === 'sub-m1' ? (
              <>
                <a
                  href="/MATH101_Engineering_Mathematics_I_Handwritten_Notes.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Eye size={18} /> Open & Review Notes PDF
                </a>
                <a
                  href="/MATH101_Engineering_Mathematics_I_Handwritten_Notes.pdf"
                  download="MATH101_Engineering_Mathematics_I_Handwritten_Notes.pdf"
                  className="btn-primary"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <DownloadCloud size={18} /> Download Mathematics 1 PDF
                </a>
              </>
            ) : activeSubject.code === 'BCSE-011' || activeSubject.id === 'sub-aiml' ? (
              <>
                <a
                  href="/AIML_notes_handwritten.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Eye size={18} /> Open & Review Notes PDF
                </a>
                <a
                  href="/AIML_notes_handwritten.pdf"
                  download="BCSE-011_Fundamentals_of_AI_ML_Handwritten_Notes.pdf"
                  className="btn-primary"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <DownloadCloud size={18} /> Download Handwritten Notes PDF
                </a>
              </>
            ) : (
              <a
                href={`#download-${activeSubject.code}`}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Starting download for ${activeSubject.name} (${activeSubject.code}) Complete Verified Package!`);
                }}
                className="btn-primary"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <DownloadCloud size={18} /> Save Complete ZIP Bundle
              </a>
            )}
            <button 
              className="btn-outline"
              onClick={() => setDownloadSuccess(false)}
            >
              Choose Another Subject
            </button>
          </div>
        </div>
      ) : (
        /* -----------------------------------------------------------------
           PART C: FEATURED HANDWRITTEN NOTEBOOKS + 2-COLUMN LAYOUT
           ----------------------------------------------------------------- */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Featured Authentic Handwritten Master Notebooks */}
          <div className="glass-panel" style={{ padding: '24px', border: '1.5px solid rgba(0, 240, 255, 0.3)', background: 'linear-gradient(135deg, rgba(7, 15, 30, 0.8) 0%, rgba(10, 20, 45, 0.6) 100%)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge-neon" style={{ fontSize: '0.75rem' }}>OFFICIAL VERIFIED REPOSITORY</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', margin: 0 }}>
                  ✍️ Hand-Crafted Master Notebooks (High-Definition Print PDFs)
                </h3>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Authentic Lined Paper • Human Handwriting • KaTeX Formatted</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              
              {/* Card 1: Engineering Mathematics I (MATH101) */}
              <div 
                className="glass-panel" 
                style={{ 
                  padding: '20px', 
                  border: '1px solid rgba(0, 240, 255, 0.35)', 
                  background: 'rgba(11, 15, 25, 0.7)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  gap: '14px' 
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="badge-neon" style={{ background: 'rgba(0, 240, 255, 0.15)', color: 'var(--neon-cyan)', border: '1px solid var(--neon-cyan)' }}>
                      MATH101 • 1st Year (Sem 1)
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700 }}>
                      9 Pages • 2.2 MB High-Res
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
                    Engineering Mathematics I Handwritten Notes
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: '1.45', margin: 0 }}>
                    Exhaustive handwritten lecture notes for Matrices &amp; Rank, Cayley-Hamilton Theorem &amp; Inverses, Mean Value Theorems, Leibnitz Rule, Euler's Theorem, Jacobians, Extrema, Multiple Integrals, and Vector Integral Theorems.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <a
                    href="/MATH101_Engineering_Mathematics_I_Handwritten_Notes.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', padding: '8px 14px' }}
                  >
                    <Eye size={15} /> Open &amp; Review PDF
                  </a>
                  <a
                    href="/MATH101_Engineering_Mathematics_I_Handwritten_Notes.pdf"
                    download="MATH101_Engineering_Mathematics_I_Handwritten_Notes.pdf"
                    className="btn-primary"
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', padding: '8px 14px' }}
                  >
                    <DownloadCloud size={15} /> Download PDF
                  </a>
                </div>
              </div>

              {/* Card 2: Fundamentals of AI & ML (BCSE-011) */}
              <div 
                className="glass-panel" 
                style={{ 
                  padding: '20px', 
                  border: '1px solid rgba(168, 85, 247, 0.35)', 
                  background: 'rgba(11, 15, 25, 0.7)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  gap: '14px' 
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="badge-neon" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid #a855f7' }}>
                      BCSE-011 • 1st Year (Sem 1)
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700 }}>
                      7 Pages • 2.1 MB High-Res
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
                    Fundamentals of AI &amp; ML Handwritten Notes
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: '1.45', margin: 0 }}>
                    Exhaustive handwritten notes covering PEAS Framework, A* Search step-by-step trace, First-Order Predicate Logic, CNF conversion recipe, Resolution Refutation proof, ID3 Decision Trees, Support Vector Machines, and Apriori.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <a
                    href="/AIML_notes_handwritten.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', padding: '8px 14px' }}
                  >
                    <Eye size={15} /> Open &amp; Review PDF
                  </a>
                  <a
                    href="/AIML_notes_handwritten.pdf"
                    download="BCSE-011_Fundamentals_of_AI_ML_Handwritten_Notes.pdf"
                    className="btn-primary"
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', padding: '8px 14px' }}
                  >
                    <DownloadCloud size={15} /> Download PDF
                  </a>
                </div>
              </div>

            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.7fr) minmax(280px, 1.3fr)', gap: '28px' }}>
          
          {/* Column 1: Verified Practical Lab Manuals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
              Practical Lab Manuals with Working Codes & Viva
            </h3>

            {labManuals.map(lab => (
              <div key={lab.id} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="badge-neon" style={{ marginBottom: '6px' }}>{lab.semester}</span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
                      {lab.title}
                    </h4>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                      Subject: {lab.subject}
                    </div>
                  </div>
                  <span className="badge-amber">{lab.fileSize}</span>
                </div>

                <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: '#c0c8db' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Code2 size={15} color="var(--neon-green)" /> {lab.experimentsCount}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <HelpCircle size={15} color="var(--neon-cyan)" /> 50+ Viva Questions Included
                  </span>
                </div>

                <button 
                  className="btn-outline" 
                  style={{ alignSelf: 'flex-start', padding: '8px 16px', fontSize: '0.82rem' }}
                  onClick={() => alert(`Downloading ${lab.title}...`)}
                >
                  <DownloadCloud size={15} /> Download PDF Manual ({lab.fileSize})
                </button>
              </div>
            ))}
          </div>

          {/* Column 2: Custom Note Bundle Generator Form */}
          <div className="glass-panel" style={{ padding: '24px', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', borderBottom: '1px solid var(--border-dim)', paddingBottom: '12px' }}>
              Create Custom Study Bundle
            </h3>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
                Select Subject:
              </label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(7, 9, 14, 0.8)', color: '#fff', border: '1px solid var(--border-dim)', fontSize: '0.85rem' }}
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.code}: {s.name} (Sem {s.semester})</option>
                ))}
              </select>
            </div>

            {/* Inclusions checkboxes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Include in your PDF Bundle:</label>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#fff', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={includeViva} 
                  onChange={(e) => setIncludeViva(e.target.checked)} 
                  style={{ accentColor: 'var(--neon-cyan)', width: 16, height: 16 }}
                />
                <span>Comprehensive Viva & Interview Prep Questions</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#fff', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={includePYQs} 
                  onChange={(e) => setIncludePYQs(e.target.checked)} 
                  style={{ accentColor: 'var(--neon-cyan)', width: 16, height: 16 }}
                />
                <span>Past 3 Years Solved Exam Questions</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#fff', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={includeFormulaSheets} 
                  onChange={(e) => setIncludeFormulaSheets(e.target.checked)} 
                  style={{ accentColor: 'var(--neon-cyan)', width: 16, height: 16 }}
                />
                <span>1-Page Exam Formula & Algorithm Cheat Sheet</span>
              </label>
            </div>

            {/* Submission Form */}
            <form onSubmit={handleGenerateBundle} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              <input
                type="text"
                placeholder="Student Roll / Registration No. (Optional)"
                value={studentRollNo}
                onChange={(e) => setStudentRollNo(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(7, 9, 14, 0.8)', color: '#fff', border: '1px solid var(--border-dim)', fontSize: '0.85rem' }}
              />

              <button 
                type="submit" 
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '6px' }}
              >
                <FolderArchive size={16} /> Compile & Download Full PDF Bundle
              </button>
            </form>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
