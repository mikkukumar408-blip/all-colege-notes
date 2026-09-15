/* =========================================================================
   SECTION 4: PREVIOUS YEAR QUESTIONS (PYQs) ARCHIVE (Theaters.jsx)
   =========================================================================
   EDIT THIS FILE to:
   1. Filter past exam papers by Year (2024, 2023, 2022, All)
   2. Search question papers by Subject Title or Course Code
   3. Update download buttons and paper metadata (file size, downloads)
   4. Customize the download trigger handler (`handleDownload`)
   ========================================================================= */

import React, { useState } from 'react';
import { 
  CheckSquare, 
  Download, 
  Search, 
  FileText, 
  CheckCircle, 
  Calendar, 
  Sparkles,
  Award
} from 'lucide-react';
import { initialPYQs } from '../data/mockData';

export default function Theaters({ onSelectTheater }) {
  /* -----------------------------------------------------------------------
     STATE MANAGEMENT
     - searchQuery: Filter papers by typed query
     - selectedYear: Filter papers by exam year ('All', '2024', '2023', '2022')
     ----------------------------------------------------------------------- */
  const [pyqs] = useState(initialPYQs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');

  // Filter papers based on search text and exam year
  const filteredPYQs = pyqs.filter(p => {
    const matchesSearch = p.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = selectedYear === 'All' || p.year === selectedYear;
    return matchesSearch && matchesYear;
  });

  /* -----------------------------------------------------------------------
     ACTION: Handles Solved PDF download button clicks
     ----------------------------------------------------------------------- */
  const handleDownload = (pyq) => {
    alert(`Downloading verified ${pyq.subject} (${pyq.year}) Solved Question Paper (${pyq.fileSize})...`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* -------------------------------------------------------------------
         PART A: PYQ ARCHIVE HEADER & SEARCH INPUT
         ------------------------------------------------------------------- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge-neon font-display">EXAMINATION QUESTION ARCHIVE</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Past 5 Years Solved Papers</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff' }}>Previous Year Question Papers (PYQs)</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>
            Download original university end-semester and mid-term examination papers complete with faculty-verified step-by-step solutions.
          </p>
        </div>

        {/* Search by Subject or Course Code */}
        <div style={{ minWidth: '280px' }}>
          <input
            type="text"
            placeholder="Search by subject or code..."
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
         PART B: EXAM YEAR FILTER BUTTONS (2024, 2023, 2022)
         ------------------------------------------------------------------- */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {['All', '2024', '2023', '2022'].map(yr => (
          <button
            key={yr}
            onClick={() => setSelectedYear(yr)}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: selectedYear === yr ? 'var(--neon-pink)' : 'rgba(255,255,255,0.05)',
              color: selectedYear === yr ? '#fff' : 'var(--text-muted)',
              border: selectedYear === yr ? 'none' : '1px solid var(--border-dim)',
              transition: 'all 0.2s ease'
            }}
          >
            {yr === 'All' ? 'All Exam Years' : `Exam Year ${yr}`}
          </button>
        ))}
      </div>

      {/* -------------------------------------------------------------------
         PART C: PYQ PAPERS GRID
         ------------------------------------------------------------------- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
        {filteredPYQs.map(pyq => (
          <div key={pyq.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="badge-crimson" style={{ marginBottom: '6px' }}>
                  {pyq.year} University Exam
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginTop: '6px' }}>
                  {pyq.subject}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--neon-cyan)', marginTop: '2px', fontWeight: 600 }}>
                  {pyq.code} • {pyq.semester}
                </div>
              </div>
              <span className="badge-neon">{pyq.fileSize}</span>
            </div>

            <div style={{
              background: 'rgba(7, 9, 14, 0.6)',
              padding: '14px',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              border: '1px solid var(--border-dim)'
            }}>
              <div style={{ fontSize: '0.82rem', color: '#d0d8e8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={14} color="var(--neon-green)" />
                <span>Paper Type: <strong>{pyq.type}</strong></span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#d0d8e8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={14} color="var(--neon-green)" />
                <span>Status: <strong>Includes Full Model Solutions</strong></span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#d0d8e8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={14} color="var(--neon-amber)" />
                <span>Verified Downloads: <strong>{pyq.downloads.toLocaleString()} Students</strong></span>
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
              <button 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => handleDownload(pyq)}
              >
                <Download size={16} /> Download Solved PDF ({pyq.fileSize})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
