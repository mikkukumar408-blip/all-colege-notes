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

export default function Theaters({ currentUser }) {
  /* -----------------------------------------------------------------------
     STATE MANAGEMENT
     - searchQuery: Filter notes by typed query
     - selectedCategory: Filter notes by academic branch / category
     ----------------------------------------------------------------------- */
  const [shortNotes] = useState(initialShortNotes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Mathematics', 'Core Engineering', 'Computer Science', 'Artificial Intelligence', 'Systems & Networks'];

  // Filter notes based on search text and subject category
  const filteredNotes = shortNotes.filter(item => {
    const matchesSearch = 
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.highlights && item.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase())));
      
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
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
         PART B: CATEGORY FILTER BUTTONS
         ------------------------------------------------------------------- */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: selectedCategory === cat ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.05)',
              color: selectedCategory === cat ? '#07090e' : 'var(--text-muted)',
              border: selectedCategory === cat ? 'none' : '1px solid var(--border-dim)',
              transition: 'all 0.2s ease'
            }}
          >
            {cat === 'All' ? 'All Subjects' : cat}
          </button>
        ))}
      </div>

      {/* -------------------------------------------------------------------
         PART C: SHORT NOTES GRID
         ------------------------------------------------------------------- */}
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
                href={item.pdfUrl}
                target="_blank"
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
                  padding: '10px 12px'
                }}
              >
                <Eye size={16} /> Open &amp; Review PDF
              </a>
              <a 
                href={item.pdfUrl}
                download={item.downloadName}
                onClick={() => handleDownloadClick(item)}
                className="btn-primary" 
                style={{ 
                  flex: 1.2, 
                  justifyContent: 'center', 
                  textDecoration: 'none', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  fontSize: '0.84rem',
                  padding: '10px 12px'
                }}
              >
                <Download size={16} /> Download Short Notes
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
