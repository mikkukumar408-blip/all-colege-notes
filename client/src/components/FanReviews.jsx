/* =========================================================================
   SECTION 6: STUDENT DOUBT CLEARING & DISCUSSION FORUM (FanReviews.jsx)
   =========================================================================
   EDIT THIS FILE to:
   1. Modify the doubts & academic questions feed
   2. Edit the Post-a-Doubt form fields (Name, Subject, Question)
   3. Change upvote behavior and top verified solution display
   ========================================================================= */

import React, { useState } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  User, 
  Award 
} from 'lucide-react';
import { initialForumDoubts, initialSubjects } from '../data/mockData';
import katex from 'katex';

function formatForumContent(text) {
  if (!text) return '';
  // 1. Process explicit LaTeX $...$
  let processed = text.replace(/\$([^\$]+)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { throwOnError: false, displayMode: false, strict: false });
    } catch {
      return math;
    }
  });

  // 2. Fallback: Convert common power carats like A^3 -> A³, 4A^2 -> 4A², A^-1 -> A⁻¹
  processed = processed
    .replace(/\^([0-9]+)/g, (_, exp) => {
      const supMap = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
      return exp.split('').map(c => supMap[c] || c).join('');
    })
    .replace(/\^-1/g, '⁻¹')
    .replace(/\^-2/g, '⁻²');

  return processed;
}

export default function FanReviews({ currentUser }) {
  /* -----------------------------------------------------------------------
     STATE MANAGEMENT
     - doubts: Array of student doubts and answers
     - author: Student name & year input
     - subject: Target subject dropdown
     - question: Query text area input
     ----------------------------------------------------------------------- */
  const [doubts, setDoubts] = useState(initialForumDoubts);
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('Data Structures');
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isSuperAdmin = (currentUser?.username?.toLowerCase() === 'bhavya mishra') || (currentUser?.role === 'superadmin') || (currentUser?.isSuperAdmin === true);

  /* -----------------------------------------------------------------------
     ACTION: Submit new doubt to the community feed
     ----------------------------------------------------------------------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author || !question) return;

    const newDoubt = {
      id: 'f' + (doubts.length + 1),
      author: author + ' (Student)',
      subject,
      question,
      answersCount: 1,
      upvotes: 1,
      date: 'Just now',
      bestAnswer: 'Faculty & community answers usually arrive within a few hours. Check back soon or bookmark this question.'
    };

    setDoubts([newDoubt, ...doubts]);
    setAuthor('');
    setQuestion('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  /* -----------------------------------------------------------------------
     ACTION: Increment upvote counter for helpful questions
     ----------------------------------------------------------------------- */
  const handleUpvote = (id) => {
    setDoubts(doubts.map(d => d.id === id ? { ...d, upvotes: d.upvotes + 1 } : d));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      {/* -------------------------------------------------------------------
         PART A: FORUM HEADER
         ------------------------------------------------------------------- */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge-neon font-display">STUDENT PEER COMMUNITY</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Q&A & Discussion Forum</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff' }}>Student Doubt Clearing & Discussion Forum</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>
          Ask academic doubts, discuss complex numerical questions, and get verified solutions from university peers and faculty.
        </p>
      </div>

      {/* -------------------------------------------------------------------
         PART B: 2-COLUMN LAYOUT: DOUBTS FEED + POST FORM
         ------------------------------------------------------------------- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.8fr) minmax(280px, 1.2fr)', gap: '28px' }}>
        
        {/* === COLUMN 1: RECENT DOUBTS FEED === */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
            Recent Academic Doubts & Solutions ({doubts.length})
          </h3>

          {doubts.map(d => (
            <div key={d.id} className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="badge-amber" style={{ marginBottom: '6px' }}>{d.subject}</span>
                  <h4 
                    style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}
                    dangerouslySetInnerHTML={{ __html: formatForumContent(d.question) }}
                  />
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                    Asked by {d.author} • {d.date}
                  </div>
                </div>

                {/* Upvote Button */}
                <button 
                  className="btn-outline" 
                  style={{ padding: '6px 12px', fontSize: '0.78rem', gap: '5px' }}
                  onClick={() => handleUpvote(d.id)}
                >
                  <ThumbsUp size={14} color="var(--neon-cyan)" /> {d.upvotes} Upvotes
                </button>
              </div>

              {/* Verified Solution Card */}
              {d.bestAnswer && (
                <div style={{ background: 'rgba(7, 9, 14, 0.7)', borderRadius: '10px', padding: '14px', borderLeft: '3px solid var(--neon-green)' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--neon-green)', fontWeight: 700, marginBottom: '4px' }}>
                    ✓ Top Verified Solution:
                  </div>
                  <p 
                    style={{ color: '#d0d8e8', fontSize: '0.88rem', lineHeight: 1.6 }}
                    dangerouslySetInnerHTML={{ __html: formatForumContent(d.bestAnswer) }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* === COLUMN 2: POST A DOUBT FORM === */}
        <div className="glass-panel" style={{ padding: '24px', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', borderBottom: '1px solid var(--border-dim)', paddingBottom: '12px', marginBottom: '16px' }}>
            Post an Academic Doubt
          </h3>

          {/* Success Banner */}
          {submitted && (
            <div style={{ background: 'rgba(5, 255, 161, 0.1)', border: '1px solid var(--neon-green)', padding: '12px', borderRadius: '8px', color: 'var(--neon-green)', fontSize: '0.85rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={18} /> Your question has been submitted to the community!
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Your Name & Year:</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma (2nd Year)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(7, 9, 14, 0.8)', color: '#fff', border: '1px solid var(--border-dim)', fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Subject:</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(7, 9, 14, 0.8)', color: '#fff', border: '1px solid var(--border-dim)', fontSize: '0.88rem' }}
              >
                <option value="Data Structures">Data Structures & Algorithms</option>
                <option value="Operating Systems">Operating Systems</option>
                <option value="DBMS">Database Management Systems</option>
                <option value="Engineering Mathematics">Engineering Mathematics</option>
                <option value="Computer Networks">Computer Networks</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>Question / Concept Query:</label>
              <textarea
                required
                rows="4"
                placeholder="Describe your numerical doubt or theorem question in detail..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(7, 9, 14, 0.8)', color: '#fff', border: '1px solid var(--border-dim)', fontSize: '0.88rem', resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '6px' }}>
              <Send size={16} /> Post Doubt to Peers
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
