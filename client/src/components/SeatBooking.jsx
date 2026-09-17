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
  Filter,
  Copy,
  CheckCheck,
  Terminal,
  Trophy,
  X,
  ChevronRight,
  Play
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

  // Interactive Practical Lab Studio Modal States
  const [selectedLab, setSelectedLab] = useState(null);
  const [labActiveTab, setLabActiveTab] = useState('experiments'); // 'experiments' | 'viva' | 'capstone'
  const [selectedExpIndex, setSelectedExpIndex] = useState(0);
  const [vivaSearch, setVivaSearch] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [expSubView, setExpSubView] = useState('code'); // 'code' | 'algorithm' | 'both'
  const [capstoneSubView, setCapstoneSubView] = useState('code'); // 'code' | 'overview'

  const handleCopyCode = (codeText) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(codeText);
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadLab = (lab) => {
    try {
      logUserActivity(
        currentUser?.username || 'student',
        'DOWNLOAD',
        `${lab.code || lab.subject}: ${lab.title}`,
        `Downloaded Practical Lab Manual (${lab.fileSize || 'PDF'})`
      );
    } catch (err) {}
    if (lab.pdfUrl) {
      const link = document.createElement('a');
      link.href = lab.pdfUrl;
      link.download = `${lab.code || 'Lab'}_Manual.pdf`;
      link.target = '_blank';
      link.click();
    } else {
      alert(`Downloading official PDF manual for ${lab.title}...`);
    }
  };


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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  Practical Lab Manuals with Working Codes & Viva
                </h3>
                <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  100% MMEC Syllabus-compliant working programs, step-by-step algorithms, terminal outputs & viva banks
                </p>
              </div>
              <span className="badge-neon" style={{ background: 'rgba(0, 240, 255, 0.1)', borderColor: 'rgba(0, 240, 255, 0.4)' }}>
                Session 2025-26
              </span>
            </div>

            {labManuals.map(lab => (
              <div 
                key={lab.id} 
                className="glass-panel" 
                style={{ 
                  padding: '22px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '14px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.25s ease',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '6px' }}>
                      {lab.code && (
                        <span style={{ 
                          fontSize: '0.72rem', 
                          fontWeight: 800, 
                          padding: '2px 8px', 
                          borderRadius: '4px', 
                          background: 'rgba(0, 240, 255, 0.15)', 
                          color: 'var(--neon-cyan)',
                          border: '1px solid rgba(0, 240, 255, 0.3)'
                        }}>
                          {lab.code}
                        </span>
                      )}
                      <span className="badge-neon" style={{ fontSize: '0.72rem' }}>{lab.semester}</span>
                      {lab.year && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>• {lab.year}</span>
                      )}
                    </div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: '2px 0 4px 0' }}>
                      {lab.title}
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                      Subject: <strong style={{ color: '#e2e8f0' }}>{lab.subject}</strong>
                    </div>
                  </div>
                  <span className="badge-amber" style={{ fontSize: '0.75rem' }}>{lab.fileSize || 'Official PDF'}</span>
                </div>

                {/* Practical Highlights Pill Row */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '0.8rem', color: '#c0c8db' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.25)', color: '#34d399' }}>
                    <Code2 size={15} /> <strong>{lab.experiments?.length || lab.totalExperiments || '10+'} Tested Working Codes</strong>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(56, 189, 248, 0.1)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(56, 189, 248, 0.25)', color: '#38bdf8' }}>
                    <HelpCircle size={15} /> <strong>{lab.vivaQuestions?.length || 15}+ Viva-Voce Q&A</strong>
                  </span>
                  {lab.capstoneProject && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(245, 158, 11, 0.1)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.25)', color: '#fbbf24' }}>
                      <Trophy size={14} /> <strong>Capstone: {lab.capstoneProject.title}</strong>
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '4px' }}>
                  <button 
                    className="btn-primary"
                    style={{ padding: '8px 16px', fontSize: '0.82rem', gap: '6px' }}
                    onClick={() => {
                      setSelectedLab(lab);
                      setLabActiveTab('experiments');
                      setSelectedExpIndex(0);
                      setExpSubView('code');
                      setCapstoneSubView('code');
                    }}
                  >
                    <Code2 size={15} /> 🚀 Explore Experiments & Working Codes
                  </button>

                  <button 
                    className="btn-outline" 
                    style={{ padding: '8px 14px', fontSize: '0.82rem', gap: '6px' }}
                    onClick={() => handleDownloadLab(lab)}
                  >
                    <DownloadCloud size={15} /> Download PDF Manual
                  </button>
                </div>
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

      {/* -------------------------------------------------------------------
         PART C: INTERACTIVE GOD-LEVEL PRACTICAL LAB & CODE STUDIO MODAL
         ------------------------------------------------------------------- */}
      {selectedLab && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(4, 7, 13, 0.88)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedLab(null);
          }}
        >
          <div 
            style={{
              background: '#0a0d16',
              border: '1px solid rgba(0, 240, 255, 0.4)',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '1220px',
              height: '94vh',
              maxHeight: '94vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 240, 255, 0.2)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '14px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'linear-gradient(180deg, rgba(16, 24, 40, 0.95) 0%, rgba(10, 15, 26, 0.95) 100%)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              flexShrink: 0
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 800, 
                    padding: '2px 8px', 
                    borderRadius: '4px', 
                    background: 'rgba(0, 240, 255, 0.18)', 
                    color: 'var(--neon-cyan)',
                    border: '1px solid rgba(0, 240, 255, 0.4)'
                  }}>
                    {selectedLab.code}
                  </span>
                  <span className="badge-neon" style={{ fontSize: '0.72rem' }}>{selectedLab.semester}</span>
                  <span style={{ 
                    fontSize: '0.72rem', 
                    fontWeight: 700, 
                    padding: '2px 8px', 
                    borderRadius: '4px', 
                    background: 'rgba(16, 185, 129, 0.15)', 
                    color: '#34d399',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    ✓ 100% MMEC Syllabus 2025-26 Aligned
                  </span>
                </div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', margin: '2px 0 2px 0' }}>
                  {selectedLab.title}
                </h2>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                  Subject: <strong style={{ color: '#e2e8f0' }}>{selectedLab.subject}</strong> • Maharishi Markandeshwar (Deemed to be University)
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button 
                  className="btn-primary" 
                  style={{ padding: '8px 16px', fontSize: '0.82rem', gap: '6px' }}
                  onClick={() => handleDownloadLab(selectedLab)}
                >
                  <DownloadCloud size={15} /> Download PDF Manual
                </button>
                <button 
                  onClick={() => setSelectedLab(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    borderRadius: '8px',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  title="Close Studio"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div style={{
              display: 'flex',
              gap: '4px',
              padding: '8px 20px',
              background: 'rgba(7, 10, 18, 0.95)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              overflowX: 'auto',
              flexShrink: 0
            }}>
              <button
                onClick={() => {
                  setLabActiveTab('experiments');
                  setExpSubView('code');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: labActiveTab === 'experiments' ? 'rgba(0, 240, 255, 0.18)' : 'transparent',
                  color: labActiveTab === 'experiments' ? 'var(--neon-cyan)' : 'var(--text-dim)',
                  boxShadow: labActiveTab === 'experiments' ? 'inset 0 0 0 1px rgba(0, 240, 255, 0.4)' : 'none'
                }}
              >
                <Code2 size={16} /> All Experiments & Working Codes ({selectedLab.experiments?.length || 0})
              </button>

              <button
                onClick={() => setLabActiveTab('viva')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: labActiveTab === 'viva' ? 'rgba(0, 240, 255, 0.18)' : 'transparent',
                  color: labActiveTab === 'viva' ? 'var(--neon-cyan)' : 'var(--text-dim)',
                  boxShadow: labActiveTab === 'viva' ? 'inset 0 0 0 1px rgba(0, 240, 255, 0.4)' : 'none'
                }}
              >
                <HelpCircle size={16} /> University Viva-Voce Bank ({selectedLab.vivaQuestions?.length || 0})
              </button>

              {selectedLab.capstoneProject && (
                <button
                  onClick={() => {
                    setLabActiveTab('capstone');
                    setCapstoneSubView('code');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    background: labActiveTab === 'capstone' ? 'rgba(245, 158, 11, 0.18)' : 'transparent',
                    color: labActiveTab === 'capstone' ? '#fbbf24' : 'var(--text-dim)',
                    boxShadow: labActiveTab === 'capstone' ? 'inset 0 0 0 1px rgba(245, 158, 11, 0.4)' : 'none'
                  }}
                >
                  <Trophy size={16} /> Capstone Course Project ({selectedLab.capstoneProject.title})
                </button>
              )}
            </div>

            {/* Modal Body Container */}
            <div style={{ flex: '1 1 0%', minHeight: 0, height: '100%', overflow: 'hidden', display: 'flex' }}>
              {/* TAB 1: EXPERIMENTS & WORKING CODES */}
              {labActiveTab === 'experiments' && (
                <div className="lab-studio-body" style={{ display: 'flex', width: '100%', height: '100%', minHeight: 0, flex: '1 1 0%', overflow: 'hidden' }}>
                  {/* Left Sidebar: Experiments List */}
                  <div 
                    className="custom-scroll lab-studio-sidebar"
                    style={{
                      width: '320px',
                      minWidth: '280px',
                      height: '100%',
                      minHeight: 0,
                      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                      background: 'rgba(8, 11, 19, 0.7)',
                      overflowY: 'auto',
                      WebkitOverflowScrolling: 'touch',
                      padding: '12px',
                      flexShrink: 0
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', padding: '0 8px' }}>
                      List of Practical Experiments ({selectedLab.experiments?.length || 0})
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {selectedLab.experiments?.map((exp, idx) => {
                        const isSelected = selectedExpIndex === idx;
                        return (
                          <button
                            key={exp.expNo || idx}
                            onClick={() => setSelectedExpIndex(idx)}
                            style={{
                              textAlign: 'left',
                              padding: '10px 12px',
                              borderRadius: '8px',
                              border: isSelected ? '1px solid rgba(0, 240, 255, 0.4)' : '1px solid transparent',
                              background: isSelected ? 'rgba(0, 240, 255, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                              color: isSelected ? '#fff' : '#94a3b8',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '8px',
                              transition: 'all 0.15s'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                background: isSelected ? 'var(--neon-cyan)' : 'rgba(255, 255, 255, 0.08)',
                                color: isSelected ? '#000' : '#cbd5e1',
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                {exp.expNo}
                              </span>
                              <span style={{ fontSize: '0.82rem', fontWeight: isSelected ? 700 : 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '210px' }}>
                                {exp.title}
                              </span>
                            </div>
                            {isSelected && <ChevronRight size={14} color="var(--neon-cyan)" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Content: Active Experiment Details & Verified Code */}
                  {selectedLab.experiments?.[selectedExpIndex] && (() => {
                    const exp = selectedLab.experiments[selectedExpIndex];
                    const codeFileName = selectedLab.code?.includes('BCSE-001') 
                      ? `experiment_${exp.expNo}.c` 
                      : selectedLab.code?.includes('BCSE-013') 
                        ? `practical_${exp.expNo}.html` 
                        : selectedLab.code?.includes('BELE')
                          ? `circuit_exp_${exp.expNo}.c`
                          : selectedLab.code?.includes('BCSE-007')
                            ? `dsa_exp_${exp.expNo}.c`
                            : `aiml_lab_${exp.expNo}.py`;

                    return (
                      <div 
                        key={`${selectedLab.id}-${selectedExpIndex}`}
                        className="custom-scroll lab-studio-content"
                        style={{
                          flex: '1 1 0%',
                          height: '100%',
                          minHeight: 0,
                          overflowY: 'auto',
                          WebkitOverflowScrolling: 'touch',
                          padding: '18px 24px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '14px',
                          background: '#070a12'
                        }}
                      >
                        {/* Title & Badge Header */}
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ 
                                background: 'rgba(0, 240, 255, 0.15)', 
                                color: 'var(--neon-cyan)', 
                                fontWeight: 800, 
                                fontSize: '0.75rem', 
                                padding: '3px 10px', 
                                borderRadius: '4px',
                                border: '1px solid rgba(0, 240, 255, 0.3)'
                              }}>
                                EXPERIMENT {exp.expNo} OF {selectedLab.experiments.length}
                              </span>
                              <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                                <CheckCircle2 size={13} /> Tested & Output Verified
                              </span>
                            </div>

                            {/* Prominent Quick Copy Button */}
                            <button
                              onClick={() => handleCopyCode(exp.code)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                background: copiedCode ? 'rgba(16, 185, 129, 0.25)' : 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(16, 185, 129, 0.2))',
                                border: copiedCode ? '1px solid #10b981' : '1px solid rgba(0, 240, 255, 0.4)',
                                color: copiedCode ? '#34d399' : '#fff',
                                padding: '6px 14px',
                                borderRadius: '6px',
                                fontSize: '0.8rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                              }}
                            >
                              {copiedCode ? <CheckCheck size={15} /> : <Copy size={15} />}
                              {copiedCode ? 'Copied Code! ✨' : '📋 Copy Working Code'}
                            </button>
                          </div>

                          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                            {exp.title}
                          </h3>
                        </div>

                        {/* View Switcher Bar: Code (Default) vs Algorithm & Logic vs Full Manual */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          padding: '6px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          flexWrap: 'wrap'
                        }}>
                          <button
                            onClick={() => setExpSubView('code')}
                            style={{
                              flex: 1,
                              minWidth: '180px',
                              padding: '8px 14px',
                              borderRadius: '6px',
                              fontSize: '0.82rem',
                              fontWeight: 800,
                              cursor: 'pointer',
                              border: expSubView === 'code' ? '1px solid var(--neon-cyan)' : '1px solid transparent',
                              background: expSubView === 'code' ? 'rgba(0, 240, 255, 0.18)' : 'transparent',
                              color: expSubView === 'code' ? 'var(--neon-cyan)' : '#94a3b8',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              transition: 'all 0.2s'
                            }}
                          >
                            <Code2 size={15} /> 💻 Verified Working Code (Default)
                          </button>

                          <button
                            onClick={() => setExpSubView('algorithm')}
                            style={{
                              flex: 1,
                              minWidth: '180px',
                              padding: '8px 14px',
                              borderRadius: '6px',
                              fontSize: '0.82rem',
                              fontWeight: 800,
                              cursor: 'pointer',
                              border: expSubView === 'algorithm' ? '1px solid #f59e0b' : '1px solid transparent',
                              background: expSubView === 'algorithm' ? 'rgba(245, 158, 11, 0.18)' : 'transparent',
                              color: expSubView === 'algorithm' ? '#fbbf24' : '#94a3b8',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              transition: 'all 0.2s'
                            }}
                          >
                            <FileText size={15} /> ⚡ Algorithm & Logic Flow
                          </button>

                          <button
                            onClick={() => setExpSubView('both')}
                            style={{
                              flex: 1,
                              minWidth: '180px',
                              padding: '8px 14px',
                              borderRadius: '6px',
                              fontSize: '0.82rem',
                              fontWeight: 800,
                              cursor: 'pointer',
                              border: expSubView === 'both' ? '1px solid #a855f7' : '1px solid transparent',
                              background: expSubView === 'both' ? 'rgba(168, 85, 247, 0.18)' : 'transparent',
                              color: expSubView === 'both' ? '#c084fc' : '#94a3b8',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              transition: 'all 0.2s'
                            }}
                          >
                            <BookOpen size={15} /> 📄 Full Document (Both)
                          </button>
                        </div>

                        {/* ================= VIEW 1: CODE FRONT-AND-CENTER (DEFAULT) ================= */}
                        {(expSubView === 'code' || expSubView === 'both') && (
                          <>
                            {/* Compact Objective Banner when in code-first mode */}
                            <div style={{
                              background: 'rgba(0, 240, 255, 0.04)',
                              border: '1px solid rgba(0, 240, 255, 0.2)',
                              borderRadius: '8px',
                              padding: '10px 14px',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '10px',
                              fontSize: '0.88rem',
                              color: '#cbd5e1'
                            }}>
                              <span style={{ fontWeight: 800, color: 'var(--neon-cyan)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                🎯 Objective:
                              </span>
                              <span style={{ lineHeight: 1.5 }}>{exp.objective}</span>
                            </div>

                            {/* Working Source Code Box */}
                            <div style={{
                              background: '#040711',
                              border: '1px solid rgba(0, 240, 255, 0.35)',
                              borderRadius: '12px',
                              overflow: 'hidden',
                              boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
                            }}>
                              {/* Window titlebar with filename & copy */}
                              <div style={{
                                background: 'rgba(15, 23, 42, 0.95)',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                                padding: '10px 16px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                                  <span style={{ marginLeft: '8px', fontSize: '0.8rem', color: 'var(--neon-cyan)', fontFamily: 'monospace', fontWeight: 700 }}>
                                    {codeFileName}
                                  </span>
                                </div>

                                <button
                                  onClick={() => handleCopyCode(exp.code)}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    background: copiedCode ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                                    border: copiedCode ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.15)',
                                    color: copiedCode ? '#34d399' : '#fff',
                                    padding: '5px 12px',
                                    borderRadius: '6px',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                  }}
                                >
                                  {copiedCode ? <CheckCheck size={14} /> : <Copy size={14} />}
                                  {copiedCode ? 'Copied Code! ✨' : 'Copy Complete Code'}
                                </button>
                              </div>

                              {/* Preformatted Code Box with comfortable scroll */}
                              <pre 
                                className="custom-scroll"
                                style={{
                                  margin: 0,
                                  padding: '16px 20px',
                                  overflowX: 'auto',
                                  overflowY: 'visible',
                                  fontFamily: 'Consolas, "Fira Code", monospace',
                                  fontSize: '0.86rem',
                                  color: '#38bdf8',
                                  lineHeight: 1.65,
                                  background: '#040711'
                                }}
                              >
                                <code>{exp.code}</code>
                              </pre>
                            </div>

                            {/* Verified Console / Terminal Output Box */}
                            <div style={{
                              background: '#03050c',
                              border: '1px solid rgba(16, 185, 129, 0.35)',
                              borderRadius: '10px',
                              overflow: 'hidden',
                              boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
                            }}>
                              <div style={{
                                background: 'rgba(16, 185, 129, 0.12)',
                                borderBottom: '1px solid rgba(16, 185, 129, 0.25)',
                                padding: '8px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                              }}>
                                <Terminal size={15} color="#34d399" />
                                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                  Verified Console / Terminal Execution Output
                                </span>
                              </div>

                              <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'Consolas, monospace', fontSize: '0.84rem' }}>
                                {exp.sampleInput && (
                                  <div>
                                    <span style={{ color: '#94a3b8' }}>Sample Test Input: </span>
                                    <span style={{ color: '#f59e0b', fontWeight: 600 }}>{exp.sampleInput}</span>
                                  </div>
                                )}
                                {exp.sampleOutput && (
                                  <div>
                                    <span style={{ color: '#94a3b8' }}>Console Output: </span>
                                    <span style={{ color: '#4ade80', fontWeight: 600 }}>{exp.sampleOutput}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Quick Link to Algorithm if in code-only mode */}
                            {expSubView === 'code' && (
                              <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '4px'
                              }}>
                                <button
                                  onClick={() => setExpSubView('algorithm')}
                                  style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#f59e0b',
                                    fontSize: '0.82rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    textDecoration: 'underline'
                                  }}
                                >
                                  ⚡ Need the step-by-step implementation algorithm & flowchart steps? Click here to view Algorithm
                                </button>
                              </div>
                            )}
                          </>
                        )}

                        {/* ================= VIEW 2: ALGORITHM & OBJECTIVE ================= */}
                        {(expSubView === 'algorithm' || expSubView === 'both') && (
                          <>
                            {/* Detailed Objective Card (Only shown here if in algorithm mode) */}
                            {expSubView === 'algorithm' && (
                              <div style={{
                                background: 'rgba(0, 240, 255, 0.04)',
                                border: '1px solid rgba(0, 240, 255, 0.25)',
                                borderRadius: '10px',
                                padding: '18px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px'
                              }}>
                                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--neon-cyan)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                  🎯 Practical Objective & Problem Statement
                                </span>
                                <p style={{ margin: 0, fontSize: '0.94rem', color: '#e2e8f0', lineHeight: 1.6 }}>
                                  {exp.objective}
                                </p>
                              </div>
                            )}

                            {/* Step-by-Step Algorithm Card */}
                            {exp.algorithm && exp.algorithm.length > 0 && (
                              <div style={{
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '10px',
                                padding: '18px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px'
                              }}>
                                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                  ⚡ Step-by-Step Implementation Algorithm
                                </span>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  {exp.algorithm.map((step, sIdx) => (
                                    <div key={sIdx} style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.5, display: 'flex', gap: '10px' }}>
                                      <span style={{ color: '#f59e0b', fontWeight: 700, minWidth: '22px' }}>{sIdx + 1}.</span>
                                      <span>{step.replace(/^Step \d+:\s*/i, '')}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Switch back to Code quick button if in algorithm view */}
                            {expSubView === 'algorithm' && (
                              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6px' }}>
                                <button
                                  onClick={() => setExpSubView('code')}
                                  style={{
                                    background: 'rgba(0, 240, 255, 0.15)',
                                    border: '1px solid var(--neon-cyan)',
                                    color: 'var(--neon-cyan)',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    fontSize: '0.85rem',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                  }}
                                >
                                  <Code2 size={16} /> 🚀 View & Copy Verified Working Code
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* TAB 2: UNIVERSITY VIVA-VOCE Q&A BANK */}
              {labActiveTab === 'viva' && (
                <div 
                  key={`${selectedLab.id}-viva`}
                  className="custom-scroll"
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: 0,
                    flex: '1 1 0%',
                    overflowY: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    padding: '20px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '18px',
                    background: '#070a12'
                  }}>
                  {/* Viva Header & Search */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                        Official University Viva-Voce Questions & Model Answers
                      </h3>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                        Exhaustive theoretical and practical exam questions frequently asked by university examiners.
                      </p>
                    </div>

                    <div style={{ position: 'relative', width: '300px' }}>
                      <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="text"
                        placeholder="Search viva questions (e.g. pointer, stack)..."
                        value={vivaSearch}
                        onChange={(e) => setVivaSearch(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 12px 9px 36px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#fff',
                          fontSize: '0.85rem'
                        }}
                      />
                    </div>
                  </div>

                  {/* Viva Questions List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {selectedLab.vivaQuestions
                      ?.filter(v => 
                        !vivaSearch || 
                        v.q.toLowerCase().includes(vivaSearch.toLowerCase()) || 
                        v.a.toLowerCase().includes(vivaSearch.toLowerCase())
                      )
                      .map((vivaItem, vIdx) => (
                        <div 
                          key={vIdx}
                          style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            padding: '18px 20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            transition: 'border-color 0.2s'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <span style={{
                              background: 'rgba(0, 240, 255, 0.15)',
                              color: 'var(--neon-cyan)',
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              padding: '2px 8px',
                              borderRadius: '4px',
                              marginTop: '2px',
                              flexShrink: 0
                            }}>
                              Q{vIdx + 1}
                            </span>
                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#fff', lineHeight: 1.5 }}>
                              {vivaItem.q}
                            </h4>
                          </div>

                          <div style={{
                            background: 'rgba(0, 240, 255, 0.03)',
                            borderLeft: '3px solid var(--neon-cyan)',
                            padding: '10px 14px',
                            borderRadius: '0 8px 8px 0',
                            fontSize: '0.9rem',
                            color: '#cbd5e1',
                            lineHeight: 1.6
                          }}>
                            <strong style={{ color: 'var(--neon-cyan)' }}>Examiner Model Answer: </strong>
                            {vivaItem.a}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* TAB 3: CAPSTONE COURSE PROJECT */}
              {labActiveTab === 'capstone' && selectedLab.capstoneProject && (
                <div 
                  key={`${selectedLab.id}-capstone`}
                  className="custom-scroll"
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: 0,
                    flex: '1 1 0%',
                    overflowY: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    padding: '20px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    background: '#070a12'
                  }}>
                  {/* Capstone Header */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                      <span style={{
                        background: 'rgba(245, 158, 11, 0.15)',
                        color: '#fbbf24',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                        padding: '3px 10px',
                        borderRadius: '4px',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <Trophy size={14} /> OFFICIAL SYLLABUS COURSE CAPSTONE PROJECT
                      </span>

                      {/* Prominent Quick Copy Button */}
                      <button
                        onClick={() => handleCopyCode(selectedLab.capstoneProject.codeSnippet)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: copiedCode ? 'rgba(16, 185, 129, 0.25)' : 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(234, 88, 12, 0.25))',
                          border: copiedCode ? '1px solid #10b981' : '1px solid rgba(245, 158, 11, 0.45)',
                          color: copiedCode ? '#34d399' : '#fbbf24',
                          padding: '6px 14px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                        }}
                      >
                        {copiedCode ? <CheckCheck size={15} /> : <Copy size={15} />}
                        {copiedCode ? 'Copied Project Code! ✨' : '📋 Copy Full Project Code'}
                      </button>
                    </div>

                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                      {selectedLab.capstoneProject.title}
                    </h3>
                  </div>

                  {/* Sub-view Switcher: Code (Default) vs Architecture Overview */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '6px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    flexWrap: 'wrap'
                  }}>
                    <button
                      onClick={() => setCapstoneSubView('code')}
                      style={{
                        flex: 1,
                        minWidth: '180px',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        border: capstoneSubView === 'code' ? '1px solid #fbbf24' : '1px solid transparent',
                        background: capstoneSubView === 'code' ? 'rgba(245, 158, 11, 0.18)' : 'transparent',
                        color: capstoneSubView === 'code' ? '#fbbf24' : '#94a3b8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Code2 size={15} /> 💻 Complete Working Project Code (Default)
                    </button>

                    <button
                      onClick={() => setCapstoneSubView('overview')}
                      style={{
                        flex: 1,
                        minWidth: '180px',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        border: capstoneSubView === 'overview' ? '1px solid var(--neon-cyan)' : '1px solid transparent',
                        background: capstoneSubView === 'overview' ? 'rgba(0, 240, 255, 0.18)' : 'transparent',
                        color: capstoneSubView === 'overview' ? 'var(--neon-cyan)' : '#94a3b8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s'
                      }}
                    >
                      <FileText size={15} /> 📋 Architecture & Deliverables
                    </button>
                  </div>

                  {/* CAPSTONE VIEW 1: CODE FRONT-AND-CENTER (DEFAULT) */}
                  {capstoneSubView === 'code' && (
                    <>
                      {/* Compact Summary Banner */}
                      <div style={{
                        background: 'rgba(245, 158, 11, 0.05)',
                        border: '1px solid rgba(245, 158, 11, 0.25)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        fontSize: '0.86rem',
                        color: '#cbd5e1',
                        lineHeight: 1.5
                      }}>
                        <strong style={{ color: '#fbbf24' }}>Project Architecture: </strong>
                        {selectedLab.capstoneProject.description}
                      </div>

                      {/* Project Code Box */}
                      <div style={{
                        background: '#040711',
                        border: '1px solid rgba(245, 158, 11, 0.4)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
                      }}>
                        <div style={{
                          background: 'rgba(15, 23, 42, 0.95)',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                          padding: '10px 16px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                            <span style={{ marginLeft: '8px', fontSize: '0.82rem', color: '#fbbf24', fontFamily: 'monospace', fontWeight: 700 }}>
                              {selectedLab.code.includes('BCSE-001') ? 'pacman_game_in_c.c' : selectedLab.code.includes('BCSE-013') ? 'university_portal.html' : selectedLab.code.includes('BELE') ? 'regulated_dc_power_supply.c' : selectedLab.code.includes('BCSE-007') ? 'metro_route_planner.c' : 'digit_recognition_cnn.py'}
                            </span>
                          </div>

                          <button
                            onClick={() => handleCopyCode(selectedLab.capstoneProject.codeSnippet)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              background: copiedCode ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                              border: copiedCode ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.15)',
                              color: copiedCode ? '#34d399' : '#fff',
                              padding: '5px 12px',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            {copiedCode ? <CheckCheck size={14} /> : <Copy size={14} />}
                            {copiedCode ? 'Copied Project Code! ✨' : 'Copy Full Project Code'}
                          </button>
                        </div>

                        <pre 
                          className="custom-scroll"
                          style={{
                            margin: 0,
                            padding: '16px 20px',
                            overflowX: 'auto',
                            overflowY: 'visible',
                            fontFamily: 'Consolas, "Fira Code", monospace',
                            fontSize: '0.86rem',
                            color: '#fbbf24',
                            lineHeight: 1.65,
                            background: '#040711'
                          }}
                        >
                          <code>{selectedLab.capstoneProject.codeSnippet}</code>
                        </pre>
                      </div>

                      {/* Quick link to architecture */}
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
                        <button
                          onClick={() => setCapstoneSubView('overview')}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--neon-cyan)',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            textDecoration: 'underline'
                          }}
                        >
                          📋 Need architectural deliverables & key technical highlights? Click here to view Architecture
                        </button>
                      </div>
                    </>
                  )}

                  {/* CAPSTONE VIEW 2: ARCHITECTURE & DELIVERABLES */}
                  {capstoneSubView === 'overview' && (
                    <>
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '12px',
                        padding: '18px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--neon-cyan)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Course Capstone Project Overview
                        </div>
                        <p style={{ margin: 0, fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                          {selectedLab.capstoneProject.description}
                        </p>
                      </div>

                      {/* Features List */}
                      {selectedLab.capstoneProject.features && (
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '12px',
                          padding: '18px 20px'
                        }}>
                          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
                            Architectural Deliverables & Key Technical Highlights
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                            {selectedLab.capstoneProject.features.map((feat, fIdx) => (
                              <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#e2e8f0' }}>
                                <CheckCircle2 size={16} color="#fbbf24" style={{ flexShrink: 0 }} />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6px' }}>
                        <button
                          onClick={() => setCapstoneSubView('code')}
                          style={{
                            background: 'rgba(245, 158, 11, 0.15)',
                            border: '1px solid #fbbf24',
                            color: '#fbbf24',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <Code2 size={16} /> 🚀 View & Copy Full Project Code
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer Bar */}
            <div style={{
              padding: '10px 20px',
              background: 'rgba(8, 12, 22, 0.95)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              flexShrink: 0
            }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                Certified Curriculum • <strong>Maharishi Markandeshwar Engineering College</strong> • 2025-2026
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn-outline" 
                  style={{ padding: '7px 16px', fontSize: '0.8rem' }}
                  onClick={() => setSelectedLab(null)}
                >
                  Close Studio
                </button>
                <button 
                  className="btn-primary" 
                  style={{ padding: '7px 16px', fontSize: '0.8rem', gap: '6px' }}
                  onClick={() => handleDownloadLab(selectedLab)}
                >
                  <DownloadCloud size={14} /> Download PDF Manual
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

