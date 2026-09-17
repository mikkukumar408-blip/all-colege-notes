import { logUserActivity } from '../utils/activityTracker';
/* =========================================================================
   SECTION 5: LAB MANUALS & DOWNLOAD HUB (SeatBooking.jsx)
   =========================================================================
   EDIT THIS FILE to:
   1. Modify the verified Practical Laboratory Manuals list
   2. Edit options in the Custom Study Bundle Generator (Viva, Short Notes, Formula sheets)
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
  BookOpen,
  Search,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialSubjects, initialLabManuals } from '../data/mockData';

/* -------------------------------------------------------------------------
   ALL CURRICULUM SUBJECTS: HAND-CRAFTED MASTER NOTEBOOKS (SEMESTERS 1 - 8)
   ------------------------------------------------------------------------- */
export const handwrittenNotebooks = [
  // ==================== SEMESTER 1 ====================
  {
    id: 'nb-math1',
    code: 'MATH101',
    subjectCode: 'BMAT-001',
    semester: '1st Year (Sem 1)',
    semNumber: 1,
    pages: '9 Pages • 2.2 MB High-Res',
    title: 'Engineering Mathematics I Handwritten Notes',
    description: "Exhaustive handwritten lecture notes for Matrices & Rank, Cayley-Hamilton Theorem & Inverses, Mean Value Theorems, Leibnitz Rule, Euler's Theorem, Jacobians, Extrema, Multiple Integrals, and Vector Integral Theorems.",
    pdfUrl: '/MATH101_Engineering_Mathematics_I_Handwritten_Notes.pdf',
    downloadName: 'MATH101_Engineering_Mathematics_I_Handwritten_Notes.pdf',
    accentColor: 'var(--neon-cyan)',
    borderColor: 'rgba(0, 240, 255, 0.35)',
    badgeBg: 'rgba(0, 240, 255, 0.15)'
  },
  {
    id: 'nb-aiml',
    code: 'BCSE-011',
    subjectCode: 'BCSE-011',
    semester: '1st Year (Sem 1)',
    semNumber: 1,
    pages: '7 Pages • 2.1 MB High-Res',
    title: 'Fundamentals of AI & ML Handwritten Notes',
    description: 'Exhaustive handwritten notes covering PEAS Framework, A* Search step-by-step trace, First-Order Predicate Logic, CNF conversion recipe, Resolution Refutation proof, ID3 Decision Trees, Support Vector Machines, and Apriori.',
    pdfUrl: '/AIML_notes_handwritten.pdf',
    downloadName: 'BCSE-011_Fundamentals_of_AI_ML_Handwritten_Notes.pdf',
    accentColor: '#c084fc',
    borderColor: 'rgba(168, 85, 247, 0.35)',
    badgeBg: 'rgba(168, 85, 247, 0.15)'
  },
  {
    id: 'nb-beee',
    code: 'BELE-001',
    subjectCode: 'BELE-001',
    semester: '1st Year (Sem 1)',
    semNumber: 1,
    pages: '48 Pages • 2.6 MB High-Res',
    title: 'Basic Electrical & Electronics Engineering (BEEE) Notes',
    description: 'Exhaustive handwritten notes for Thevenin, Norton & Superposition theorems, AC Phasors & Resonance, 1-Phase Transformers, DC Machines, P-N Junction Diodes, BJT Biasing, Number Systems, and Logic Gates.',
    pdfUrl: '/BELE001_Basic_Electrical_and_Electronics_Engineering_notes.pdf',
    downloadName: 'BELE001_Basic_Electrical_and_Electronics_Engineering_notes.pdf',
    accentColor: '#fbbf24',
    borderColor: 'rgba(251, 191, 36, 0.35)',
    badgeBg: 'rgba(251, 191, 36, 0.15)'
  },
  {
    id: 'nb-c1',
    code: 'BCSE-008',
    subjectCode: 'BCSE-008',
    semester: '1st Year (Sem 1)',
    semNumber: 1,
    pages: '48 Pages • 2.8 MB High-Res',
    title: 'Computational & Problem Solving using C Notes',
    description: 'Complete handwritten syllabus notes for 4-Stage Compilation Pipeline, Memory Segmentation (Code, Data, BSS, Heap, Stack), 2D Array Row/Col Major Addressing, Pointers Arithmetic, DMA, Structures, and File Streams.',
    pdfUrl: '/BCSE008_Computational_and_Problem_Solving_using_C_notes.pdf',
    downloadName: 'BCSE008_Computational_and_Problem_Solving_using_C_notes.pdf',
    accentColor: '#60a5fa',
    borderColor: 'rgba(96, 165, 250, 0.35)',
    badgeBg: 'rgba(96, 165, 250, 0.15)'
  },
  {
    id: 'nb-webtech',
    code: 'BCSE-012',
    subjectCode: 'BCSE-012',
    semester: '1st Year (Sem 1)',
    semNumber: 1,
    pages: '46 Pages • 3.1 MB High-Res',
    title: 'Fundamentals of Web Technologies Master Notes',
    description: 'Comprehensive handwritten notes covering HTTP/1.1 vs HTTP/2 vs HTTP/3, DNS Resolution Cycles, HTML5 Semantic page blueprints, Canvas 2D Graphics, CSS3 Flexbox & Grid architecture, Box Model sizing, and DOM Event handling.',
    pdfUrl: '/BCSE012_Fundamental_of_Web_Technologies_Long_Notes.pdf',
    downloadName: 'BCSE012_Fundamental_of_Web_Technologies_Long_Notes.pdf',
    accentColor: '#f472b6',
    borderColor: 'rgba(244, 114, 182, 0.35)',
    badgeBg: 'rgba(244, 114, 182, 0.15)'
  },

  // ==================== SEMESTER 2 ====================
  {
    id: 'nb-phys',
    code: 'PHYS102',
    subjectCode: 'PHYS102',
    semester: '1st Year (Sem 2)',
    semNumber: 2,
    pages: '34 Pages • 2.4 MB High-Res',
    title: 'Applied Physics High-Yield Master Notes',
    description: "Complete handwritten lecture notes covering Wave Optics, Thin-Film Interference, Newton's Rings, Fraunhofer Diffraction, He-Ne & Semiconductor Lasers, Optical Fiber Numerical Aperture, and Schrödinger Wave Mechanics.",
    pdfUrl: '/PHYS102_Applied_Physics_Short_Notes_Exam_Ready.pdf',
    downloadName: 'PHYS102_Applied_Physics_Notes.pdf',
    accentColor: '#2dd4bf',
    borderColor: 'rgba(45, 212, 191, 0.35)',
    badgeBg: 'rgba(45, 212, 191, 0.15)'
  },

  // ==================== SEMESTER 3 ====================
  {
    id: 'nb-dsa',
    code: 'CS301',
    subjectCode: 'CS301',
    semester: '2nd Year (Sem 3)',
    semNumber: 3,
    pages: '48 Pages • 3.2 MB High-Res',
    title: 'Data Structures & Algorithms Master Notes',
    description: "Complete handwritten notes for Singly/Doubly Linked Lists, Stack Infix-to-Postfix conversion, Circular Queues, Binary Search Trees, AVL 4-Rotation cases, B-Trees, Dijkstra's Algorithm, Kruskal's MST, and Asymptotic Complexity.",
    pdfUrl: '/CS301_Data_Structures_and_Algorithms_Short_Notes.pdf',
    downloadName: 'CS301_Data_Structures_and_Algorithms_Notes.pdf',
    accentColor: '#34d399',
    borderColor: 'rgba(52, 211, 153, 0.35)',
    badgeBg: 'rgba(52, 211, 153, 0.15)'
  },
  {
    id: 'nb-dld',
    code: 'CS302',
    subjectCode: 'CS302',
    semester: '2nd Year (Sem 3)',
    semNumber: 3,
    pages: '42 Pages • 2.5 MB High-Res',
    title: 'Digital Logic & Computer Design Notes',
    description: 'Complete handwritten notes for Boolean Postulates & Minimization, 4/5-variable K-Maps, Carry Look-Ahead Adders, Decoders & Multiplexers, Flip-Flops (SR, JK, D, T excitation tables), Synchronous Counters, and FSM Design.',
    pdfUrl: '/CS302_Digital_Logic_and_Design_Short_Notes.pdf',
    downloadName: 'CS302_Digital_Logic_and_Design_Notes.pdf',
    accentColor: '#fb923c',
    borderColor: 'rgba(251, 146, 60, 0.35)',
    badgeBg: 'rgba(251, 146, 60, 0.15)'
  },

  // ==================== SEMESTER 4 ====================
  {
    id: 'nb-os',
    code: 'CS401',
    subjectCode: 'CS401',
    semester: '2nd Year (Sem 4)',
    semNumber: 4,
    pages: '44 Pages • 2.9 MB High-Res',
    title: 'Operating Systems High-Yield Master Notes',
    description: "Complete handwritten notes for Process Control Blocks (PCB), CPU Scheduling (FCFS, SJF, SRTF, Round Robin), Peterson's Mutual Exclusion, Semaphores & Deadlock Banker's Safety Algorithm, Paging EMAT, and Inode File Systems.",
    pdfUrl: '/CS401_Operating_Systems_Short_Notes.pdf',
    downloadName: 'CS401_Operating_Systems_Notes.pdf',
    accentColor: '#a78bfa',
    borderColor: 'rgba(167, 139, 250, 0.35)',
    badgeBg: 'rgba(167, 139, 250, 0.15)'
  },
  {
    id: 'nb-dbms',
    code: 'CS402',
    subjectCode: 'CS402',
    semester: '2nd Year (Sem 4)',
    semNumber: 4,
    pages: '45 Pages • 2.7 MB High-Res',
    title: 'Database Management Systems Master Notes',
    description: 'Complete handwritten notes for Entity-Relationship Diagrams, Relational Algebra & Calculus, Advanced SQL Joins/Views, Functional Dependencies & Normalization (1NF to BCNF), ACID Properties, Two-Phase Locking (2PL), and B+ Tree Indexing.',
    pdfUrl: '/CS402_Database_Management_Systems_Short_Notes.pdf',
    downloadName: 'CS402_Database_Management_Systems_Notes.pdf',
    accentColor: '#38bdf8',
    borderColor: 'rgba(56, 189, 248, 0.35)',
    badgeBg: 'rgba(56, 189, 248, 0.15)'
  },

  // ==================== SEMESTER 5 ====================
  {
    id: 'nb-cn',
    code: 'CS501',
    subjectCode: 'CS501',
    semester: '3rd Year (Sem 5)',
    semNumber: 5,
    pages: '48 Pages • 3.0 MB High-Res',
    title: 'Computer Networks Complete Master Notes',
    description: 'Complete handwritten notes for OSI 7-Layer & TCP/IP Reference Models, Sliding Window ARQ protocols (Go-Back-N & Selective Repeat), IPv4/IPv6 CIDR Subnetting, Distance Vector & Link State Routing, TCP 3-Way Handshake, and Congestion Control.',
    pdfUrl: '/CS501_Computer_Networks_Short_Notes.pdf',
    downloadName: 'CS501_Computer_Networks_Notes.pdf',
    accentColor: '#14b8a6',
    borderColor: 'rgba(20, 184, 166, 0.35)',
    badgeBg: 'rgba(20, 184, 166, 0.15)'
  },

  // ==================== SEMESTER 6 ====================
  {
    id: 'nb-ai',
    code: 'CS601',
    subjectCode: 'CS601',
    semester: '3rd Year (Sem 6)',
    semNumber: 6,
    pages: '52 Pages • 3.4 MB High-Res',
    title: 'AI & Advanced Machine Learning Notes',
    description: 'Advanced handwritten notes covering Heuristic Search, Adversarial Minimax with Alpha-Beta Pruning, Supervised Linear/Logistic Regression, Support Vector Machines (SVM), Multi-Layer Perceptrons (MLP) Backpropagation, and K-Means Clustering.',
    pdfUrl: '/AIML_Short_Notes_Exam_Ready.pdf',
    downloadName: 'CS601_AI_Machine_Learning_Notes.pdf',
    accentColor: '#e879f9',
    borderColor: 'rgba(232, 121, 249, 0.35)',
    badgeBg: 'rgba(232, 121, 249, 0.15)'
  },

  // ==================== SEMESTER 7 ====================
  {
    id: 'nb-cloud',
    code: 'CS701',
    subjectCode: 'CS701',
    semester: '4th Year (Sem 7)',
    semNumber: 7,
    pages: '48 Pages • 3.1 MB High-Res',
    title: 'Cloud Computing & Distributed Systems Notes',
    description: 'Complete handwritten master notes for Cloud Service Models (IaaS, PaaS, SaaS), Type-1/2 Hypervisors, Microservices & Docker Containerization, Kubernetes Pod Orchestration, CAP Theorem, and Distributed Consensus (Raft/Paxos).',
    pdfUrl: '/CS701_Cloud_Computing_Notes.pdf',
    downloadName: 'CS701_Cloud_Computing_Distributed_Systems_Notes.pdf',
    accentColor: '#818cf8',
    borderColor: 'rgba(129, 140, 248, 0.35)',
    badgeBg: 'rgba(129, 140, 248, 0.15)'
  },

  // ==================== SEMESTER 8 ====================
  {
    id: 'nb-devops',
    code: 'CS801',
    subjectCode: 'CS801',
    semester: '4th Year (Sem 8)',
    semNumber: 8,
    pages: '44 Pages • 2.8 MB High-Res',
    title: 'DevOps Engineering & CI/CD Pipelines Notes',
    description: 'Complete master notes for Git Flow Branching, Jenkins & GitHub Actions CI/CD automation pipelines, Infrastructure as Code with Terraform & Ansible, Docker container security, Prometheus metrics, and SRE incident response workflows.',
    pdfUrl: '/CS801_DevOps_Engineering_Notes.pdf',
    downloadName: 'CS801_DevOps_CI_CD_Pipelines_Notes.pdf',
    accentColor: '#4ade80',
    borderColor: 'rgba(74, 222, 128, 0.35)',
    badgeBg: 'rgba(74, 222, 128, 0.15)'
  }
];

export default function SeatBooking({ currentUser, preselectedMovie }) {
  /* -----------------------------------------------------------------------
     STATE MANAGEMENT
     - selectedSubjectId: Chosen subject for bundle compilation
     - includeViva: Checkbox for viva-voce answers
     - includeShortNotes: Checkbox for high-yield short notes & exam sheets
     - includeFormulaSheets: Checkbox for formula cheat sheet
     - downloadSuccess: Triggers confirmation view with confetti
     ----------------------------------------------------------------------- */
  const [subjects] = useState(initialSubjects);
  const [labManuals] = useState(initialLabManuals);
  const [selectedSubjectId, setSelectedSubjectId] = useState(preselectedMovie?.id || initialSubjects[3].id);
  const [includeViva, setIncludeViva] = useState(true);
  const [includeShortNotes, setIncludeShortNotes] = useState(true);
  const [includeFormulaSheets, setIncludeFormulaSheets] = useState(true);
  const [studentRollNo, setStudentRollNo] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [notebookSemFilter, setNotebookSemFilter] = useState('All');
  const [notebookSearchQuery, setNotebookSearchQuery] = useState('');

  const activeSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  // Resolve matching PDF for compiled custom study bundle
  const activeNotebook = handwrittenNotebooks.find(nb => 
    nb.code === activeSubject.code || 
    nb.subjectCode === activeSubject.code || 
    nb.id === activeSubject.id ||
    activeSubject.name.toLowerCase().includes(nb.code.toLowerCase()) ||
    nb.title.toLowerCase().includes(activeSubject.name.toLowerCase())
  ) || handwrittenNotebooks[0];

  const handleDownloadNotebook = (notebook) => {
    try {
      logUserActivity(
        currentUser?.username || 'student',
        'DOWNLOAD',
        `${notebook.code}: ${notebook.title}`,
        `Downloaded Hand-Crafted Master Notebook (${notebook.pages})`
      );
    } catch (err) {}
  };

  const handleReviewNotebook = (notebook) => {
    try {
      logUserActivity(
        currentUser?.username || 'student',
        'PREVIEW',
        `${notebook.code}: ${notebook.title}`,
        `Reviewed Hand-Crafted Master Notebook PDF`
      );
    } catch (err) {}
  };

  const filteredNotebooks = handwrittenNotebooks.filter(nb => {
    const matchSem = notebookSemFilter === 'All' || nb.semNumber === Number(notebookSemFilter);
    const query = notebookSearchQuery.trim().toLowerCase();
    const matchSearch = !query || 
      nb.title.toLowerCase().includes(query) ||
      nb.code.toLowerCase().includes(query) ||
      (nb.subjectCode && nb.subjectCode.toLowerCase().includes(query)) ||
      nb.description.toLowerCase().includes(query) ||
      nb.semester.toLowerCase().includes(query);
    return matchSem && matchSearch;
  });

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
                {includeViva ? 'Viva Q&A • ' : ''}{includeShortNotes ? 'High-Yield Short Notes • ' : ''}{includeFormulaSheets ? 'Formula Cheatsheet' : ''}
              </strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Total File Size:</span>
              <strong style={{ color: 'var(--neon-cyan)', fontSize: '1rem' }}>14.8 MB (High-Quality PDF)</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={activeNotebook.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              onClick={() => handleReviewNotebook(activeNotebook)}
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Eye size={18} /> Open &amp; Review {activeSubject.code} Notes PDF
            </a>
            <a
              href={activeNotebook.pdfUrl}
              download={activeNotebook.downloadName}
              className="btn-primary"
              onClick={() => handleDownloadNotebook(activeNotebook)}
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <DownloadCloud size={18} /> Download {activeSubject.code} PDF Package
            </a>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span className="badge-neon" style={{ fontSize: '0.75rem' }}>OFFICIAL VERIFIED REPOSITORY</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', margin: 0 }}>
                  ✍️ Hand-Crafted Master Notebooks (High-Definition Print PDFs)
                </h3>
                <span className="badge-neon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid #10b981', fontSize: '0.75rem' }}>
                  {filteredNotebooks.length} Subjects Available
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Authentic Lined Paper • Human Handwriting • KaTeX Formatted</span>
            </div>

            {/* Filter Toolbar: Semester Tabs + Search */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                {['All', '1', '2', '3', '4', '5', '6', '7', '8'].map(sem => {
                  const isSelected = notebookSemFilter === sem;
                  const count = sem === 'All' 
                    ? handwrittenNotebooks.length 
                    : handwrittenNotebooks.filter(n => n.semNumber === Number(sem)).length;
                  return (
                    <button
                      key={sem}
                      onClick={() => setNotebookSemFilter(sem)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        border: isSelected ? '1px solid var(--neon-cyan)' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: isSelected ? 'rgba(0, 240, 255, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                        color: isSelected ? '#fff' : 'var(--text-dim)',
                        boxShadow: isSelected ? '0 0 12px rgba(0, 240, 255, 0.3)' : 'none'
                      }}
                    >
                      {sem === 'All' ? `All Subjects (${count})` : `Sem ${sem} (${count})`}
                    </button>
                  );
                })}
              </div>

              <div style={{ position: 'relative', minWidth: '240px', flex: '1', maxWidth: '340px' }}>
                <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <input
                  type="text"
                  placeholder="Search subjects, codes, or topics..."
                  value={notebookSearchQuery}
                  onChange={(e) => setNotebookSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 34px',
                    borderRadius: '8px',
                    background: 'rgba(7, 9, 14, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    fontSize: '0.82rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Grid of All Hand-Crafted Master Notebooks */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {filteredNotebooks.map(nb => (
                <div 
                  key={nb.id}
                  className="glass-panel" 
                  style={{ 
                    padding: '20px', 
                    border: `1px solid ${nb.borderColor}`, 
                    background: 'rgba(11, 15, 25, 0.75)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    gap: '14px',
                    transition: 'transform 0.2s ease, border-color 0.2s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span 
                        className="badge-neon" 
                        style={{ 
                          background: nb.badgeBg, 
                          color: nb.accentColor, 
                          border: `1px solid ${nb.accentColor}`,
                          textTransform: 'uppercase'
                        }}
                      >
                        {nb.code} • {nb.semester}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700 }}>
                        {nb.pages}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
                      {nb.title}
                    </h4>
                    <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: '1.45', margin: 0 }}>
                      {nb.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <a
                      href={nb.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      onClick={() => handleReviewNotebook(nb)}
                      style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', padding: '8px 14px' }}
                    >
                      <Eye size={15} /> Open &amp; Review PDF
                    </a>
                    <a
                      href={nb.pdfUrl}
                      download={nb.downloadName}
                      className="btn-primary"
                      onClick={() => handleDownloadNotebook(nb)}
                      style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', padding: '8px 14px' }}
                    >
                      <DownloadCloud size={15} /> Download PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {filteredNotebooks.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-dim)' }}>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>No master notebooks found matching "{notebookSearchQuery}".</p>
                <button 
                  className="btn-secondary" 
                  onClick={() => { setNotebookSemFilter('All'); setNotebookSearchQuery(''); }}
                  style={{ marginTop: '12px', fontSize: '0.8rem', padding: '6px 14px' }}
                >
                  Reset Filters
                </button>
              </div>
            )}
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
                  checked={includeShortNotes} 
                  onChange={(e) => setIncludeShortNotes(e.target.checked)} 
                  style={{ accentColor: 'var(--neon-cyan)', width: 16, height: 16 }}
                />
                <span>High-Yield Short Notes & Exam Revision Summary</span>
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
