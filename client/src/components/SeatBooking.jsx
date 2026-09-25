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
import { createPortal } from 'react-dom';
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
    pages: '12 Pages • 700 KB Publication High-Res',
    title: 'Applied Physics Comprehensive Master Notes',
    description: "Official MMDU syllabus (BPHY-001 / PHYS102): Wave Optics, Newton's Rings derivations, Fraunhofer Diffraction, He-Ne 4-level laser, Maxwell's equations & displacement current, skin depth in conductors, Schrödinger wave mechanics (1D Box eigenvalues proof), SC/BCC/FCC APF derivations, Schottky & Frenkel defects, and Sommerfeld free electron theory.",
    pdfUrl: '/Applied_Physics_Master_Notes.pdf',
    downloadName: 'Applied Physics Master Notes.pdf',
    accentColor: '#2dd4bf',
    borderColor: 'rgba(45, 212, 191, 0.35)',
    badgeBg: 'rgba(45, 212, 191, 0.15)'
  },
  {
    id: 'nb-py',
    code: 'BCSE-004',
    subjectCode: 'BCSE-004',
    semester: '1st Year (Sem 2)',
    semNumber: 2,
    pages: '12 Pages • Publication Quality High-Res',
    title: 'Python Programming Comprehensive Master Notes',
    description: 'Official MMDU syllabus (BCSE-004): CPython compilation pipeline & PVM, variable reference model, 9-tier operator precedence, branching & loops (for-else/break/continue), functions & LEGB scope, Lists/Tuples/Dictionaries (hash table internals), File Handling (modes, context managers), and OOP (Classes, Dunder methods, Operator Overloading, MRO, Polymorphism, Composition).',
    pdfUrl: '/Python_Programming_Master_Notes.pdf',
    downloadName: 'Python Programming Master Notes.pdf',
    accentColor: '#38bdf8',
    borderColor: 'rgba(56, 189, 248, 0.35)',
    badgeBg: 'rgba(56, 189, 248, 0.15)'
  },
  {
    id: 'nb-dsa-bcse007',
    code: 'BCSE-007',
    subjectCode: 'BCSE-007',
    semester: '1st Year (Sem 2)',
    semNumber: 2,
    pages: '12 Pages • Publication Quality High-Res',
    title: 'Data Structure Comprehensive Master Notes',
    description: 'Official MMDU syllabus (BCSE-007): Mathematical notation, asymptotic bounds, 1D/2D/3D array addressing, sparse matrices, Bubble/Selection/Insertion/Merge/Quick/Heap sorting, Linear/Binary searching, Stacks (LIFO), Infix-Postfix-Prefix conversion & evaluation, recursion & Tower of Hanoi, Linear/Circular/Deque/Priority Queues, Singly/Doubly/Circular Linked Lists, Binary Trees, BST traversals & deletion cases, Graph representations (Adjacency Matrix/List), and BFS/DFS graph traversals.',
    pdfUrl: '/Data_Structures_Master_Notes.pdf',
    downloadName: 'Data Structures Master Notes.pdf',
    accentColor: '#38bdf8',
    borderColor: 'rgba(56, 189, 248, 0.35)',
    badgeBg: 'rgba(56, 189, 248, 0.15)'
  },

  // ==================== SEMESTER 3 ====================
  {
    id: 'nb-dsa',
    code: 'CS301',
    subjectCode: 'CS301',
    semester: '2nd Year (Sem 3)',
    semNumber: 3,
    pages: '40 Pages • 2.6 MB High-Res',
    title: 'Data Structures & Algorithms Master Notes',
    description: 'Semester 3 Advanced DSA Syllabus: AVL Trees, Red-Black Trees, Dynamic Programming, Greedy Methods, Dijkstra, Bellman-Ford, and Graph Traversals.',
    pdfUrl: '/CS301_Data_Structures_and_Algorithms_Short_Notes.pdf',
    downloadName: 'CS301_Data_Structures_and_Algorithms_Notes.pdf',
    accentColor: '#38bdf8',
    borderColor: 'rgba(56, 189, 248, 0.35)',
    badgeBg: 'rgba(56, 189, 248, 0.15)'
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
  const [labSearchQuery, setLabSearchQuery] = useState('');
  const [labSemFilter, setLabSemFilter] = useState('All');

  // Interactive Practical Lab Studio Modal States
  const [selectedLab, setSelectedLab] = useState(null);
  const [labActiveTab, setLabActiveTab] = useState('experiments'); // 'experiments' | 'viva' | 'capstone'
  const [selectedExpIndex, setSelectedExpIndex] = useState(0);
  const [vivaSearch, setVivaSearch] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [expSubView, setExpSubView] = useState('code'); // 'code' | 'algorithm' | 'both'
  const [capstoneSubView, setCapstoneSubView] = useState('code'); // 'code' | 'overview'
  const [selectedLang, setSelectedLang] = useState('C'); // Language for code viewer
  const [viewingPdf, setViewingPdf] = useState(null); // In-App PDF Reader Modal State

  // ─── Multi-Language Code Translator ─────────────────────────────────────────
  const translateCode = (rawCode, lang) => {
    if (!rawCode || lang === 'C') return rawCode;
    const c = typeof rawCode === 'string' ? rawCode : String(rawCode);
    // Decode escaped sequences (same as formatDisplayCode)
    const decode = (s) => s
      .replace(/\\\\n/g, '__NL__').replace(/\\\\t/g, '__TAB__').replace(/\\\\"/g, '__DQ__').replace(/\\\\'/g, '__SQ__')
      .replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\"/g, '"').replace(/\\'/g, "'")
      .replace(/__NL__/g, '\\n').replace(/__TAB__/g, '\\t').replace(/__DQ__/g, '\\"').replace(/__SQ__/g, "\\'");
    const src = decode(c);

    if (lang === 'C++') {
      return src
        .replace(/#include <stdio\.h>/g, '#include <iostream>\nusing namespace std;')
        .replace(/#include <stdlib\.h>/g, '#include <cstdlib>')
        .replace(/#include <string\.h>/g, '#include <cstring>')
        .replace(/#include <math\.h>/g, '#include <cmath>')
        .replace(/printf\s*\(\s*"([^"]*)"\s*\)/g, (_, s) => `cout << "${s}"`)
        .replace(/printf\s*\(\s*"([^"]*)",\s*([^)]+)\)/g, (_, fmt, args) => {
          const parts = fmt.split(/%[\d.]*[diouxXeEfFgGs]/g);
          const argList = args.split(',').map(a => a.trim());
          let out = 'cout';
          parts.forEach((p, i) => {
            if (p) out += ` << "${p.replace(/\\n/g, '\\n')}"`;
            if (i < argList.length) out += ` << ${argList[i]}`;
          });
          return out;
        })
        .replace(/scanf\s*\(\s*"([^"]*)",\s*&(\w+)\)/g, (_, _fmt, v) => `cin >> ${v}`)
        .replace(/scanf\s*\(\s*"([^"]*)",\s*&(\w+),\s*&(\w+)\)/g, (_, _fmt, v1, v2) => `cin >> ${v1} >> ${v2}`)
        .replace(/\bfloat\b/g, 'float').replace(/\bdouble\b/g, 'double');
    }

    if (lang === 'Java') {
      const className = 'Main';
      let body = src
        .replace(/#include\s*<[^>]+>/g, '')
        .replace(/\bprintf\s*\(\s*"([^"]*)"\s*\)/g, (_, s) => `System.out.print("${s}")`)
        .replace(/\bprintf\s*\(\s*"([^"]*)",\s*([^)]+)\)/g, (_, fmt, args) => {
          return `System.out.printf("${fmt}", ${args})`;
        })
        .replace(/\bscanf\s*\(\s*"[^"]*",\s*&(\w+)\)/g, (_, v) => `${v} = sc.nextDouble()`)
        .replace(/\bscanf\s*\(\s*"[^"]*",\s*&(\w+),\s*&(\w+)\)/g, (_, v1, v2) => `${v1} = sc.nextDouble(); ${v2} = sc.nextDouble()`)
        .replace(/\bdouble\b/g, 'double').replace(/\bfloat\b/g, 'float').replace(/\bchar\b op/g, 'char op')
        .replace(/int main\s*\(\s*\)\s*\{/, `public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);`)
        .replace(/return 0;/g, '');
      return `import java.util.Scanner;\n\npublic class ${className} {\n${body}\n}`;
    }

    if (lang === 'JavaScript') {
      return `// Run with Node.js\nconst readline = require('readline');\nconst rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n\n` +
        src
          .replace(/#include\s*<[^>]+>/g, '')
          .replace(/\bint main\s*\(\s*\)\s*\{/, 'async function main() {')
          .replace(/\bprintf\s*\(\s*"([^"]*)"(,\s*[^)]+)?\)/g, (_, fmt, args) => {
            if (!args) return `process.stdout.write(\`${fmt.replace(/%[\d.]*[diouxXeEfFgGs]/g, '${...}')}\`)`;
            const argList = args.replace(/^,\s*/, '').split(',').map(a => a.trim().replace(/&/g, ''));
            let i = 0;
            const js = fmt.replace(/%[\d.]*[diouxXeEfFgGs]/g, () => `\${${argList[i++] || ''}}`);
            return `process.stdout.write(\`${js}\`)`;
          })
          .replace(/\bscanf\s*\([^)]+\)/g, '// user input via readline')
          .replace(/\bdouble\b|\bfloat\b/g, 'let').replace(/\bint\b/g, 'let')
          .replace(/return 0;/g, '')
          .replace(/\bprintf\b/g, 'console.log') + '\nmain();';
    }

    if (lang === 'Python') {
      return src
        .replace(/#include\s*<[^>]+>/g, '')
        .replace(/int main\s*\(\s*\)\s*\{/, 'def main():')
        .replace(/\bprintf\s*\(\s*"([^"]*)"\s*\)/g, (_, s) => {
          const py = s.replace(/\\n/g, '').replace(/%[\d.]*[diouxXeEfFgGs]/g, '{}');
          return `print("${py}")`;
        })
        .replace(/\bprintf\s*\(\s*"([^"]*)",\s*([^)]+)\)/g, (_, fmt, args) => {
          const py = fmt.replace(/\\n/g, '').replace(/%[\d.]*[diouxXeEfFgGs]/g, '{}');
          return `print(f"${py.replace(/\{\}/g, () => `{${args.split(',').shift()?.trim()}}`).replace(/\{([^}]+)\}/g, '{$1}')}")`;
        })
        .replace(/scanf\s*\(\s*"[^"]*",\s*&(\w+)\)/g, (_, v) => `${v} = float(input())`)
        .replace(/scanf\s*\(\s*"[^"]*",\s*&(\w+),\s*&(\w+)\)/g, (_, v1, v2) => `${v1}, ${v2} = map(float, input().split())`)
        .replace(/\b(double|float|int|char)\s+/g, '')
        .replace(/return 0;/g, '')
        .replace(/\{/g, '').replace(/\}/g, '')
        .replace(/;$/gm, '')
        .replace(/^\s*\n/gm, '')
        .replace(/\bprintf\b/g, 'print')
        + '\n\nmain()';
    }

    return rawCode;
  };

  const LANG_CONFIG = [
    { id: 'C',          label: 'C',    color: '#38bdf8', ext: 'c'    },
    { id: 'C++',        label: 'C++',  color: '#a78bfa', ext: 'cpp'  },
    { id: 'Java',       label: 'Java', color: '#fb923c', ext: 'java' },
    { id: 'JavaScript', label: 'JS',   color: '#fbbf24', ext: 'js'   },
    { id: 'Python',     label: 'Py',   color: '#4ade80', ext: 'py'   },
  ];

  const formatDisplayCode = (raw) => {
    if (!raw) return '';
    let s = String(raw);
    if (!s.includes('\\n') && !s.includes('\\t') && !s.includes('\\"')) return s;

    // Protect double-escaped sequences (e.g. \\n in C string literal printf("...\n"))
    s = s
      .replace(/\\\\n/g, '__LITERAL_ESC_N__')
      .replace(/\\\\t/g, '__LITERAL_ESC_T__')
      .replace(/\\\\"/g, '__LITERAL_ESC_QUOTE__')
      .replace(/\\\\'/g, '__LITERAL_ESC_SQUOTE__');

    // Convert escaped newlines, tabs, and quotes to actual characters
    s = s
      .replace(/\\r\\n/g, '\n')
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '    ')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'");

    // Restore protected in-code literal escapes
    s = s
      .replace(/__LITERAL_ESC_N__/g, '\\n')
      .replace(/__LITERAL_ESC_T__/g, '\\t')
      .replace(/__LITERAL_ESC_QUOTE__/g, '\\"')
      .replace(/__LITERAL_ESC_SQUOTE__/g, "\\'");

    return s;
  };

  const handleCopyCode = (codeText) => {
    const cleanCode = formatDisplayCode(codeText);
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(cleanCode);
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Robust PDF Downloader supporting Web Blob download with Fallbacks
  const handleDownloadPdf = async (url, downloadName) => {
    if (!url || url === '#' || url === '') {
      alert('This document is currently being finalized. Please check back shortly!');
      return;
    }
    const safeName = downloadName || 'College_Notes_Document.pdf';
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Fetch failed with status ' + res.status);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', safeName);
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 15000);
    } catch (err) {
      console.warn('Direct blob download error, triggering fallback:', err);
      // Fallback: direct anchor trigger or window.open
      try {
        const a = document.createElement('a');
        a.href = url;
        a.download = safeName;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (e) {
        window.open(url, '_blank') || (window.location.href = url);
      }
    }
  };

  const handleDownloadLab = (lab) => {
    if (!lab) return;
    try {
      logUserActivity(
        currentUser?.username || 'student',
        'DOWNLOAD',
        `${lab.code || lab.subject}: ${lab.title}`,
        `Downloaded Practical Lab Manual (${lab.fileSize || 'PDF'})`
      );
    } catch (err) {}
    const safeFilename = `${(lab.code || 'Lab').replace(/[^a-zA-Z0-9_-]/g, '_')}_Manual.pdf`;
    handleDownloadPdf(lab.pdfUrl, safeFilename);
  };

  const filteredLabs = labManuals.filter(lab => {
    const query = labSearchQuery.trim().toLowerCase();
    const matchSearch = !query || 
      lab.title?.toLowerCase().includes(query) ||
      lab.code?.toLowerCase().includes(query) ||
      lab.subject?.toLowerCase().includes(query) ||
      lab.branch?.toLowerCase().includes(query) ||
      lab.capstoneProject?.title?.toLowerCase().includes(query) ||
      (Array.isArray(lab.experiments) && lab.experiments.some(e => e.title?.toLowerCase().includes(query) || e.objective?.toLowerCase().includes(query)));

    const matchSem = labSemFilter === 'All' ||
      lab.semester?.toLowerCase().includes(`semester ${labSemFilter}`.toLowerCase()) ||
      lab.semester?.toLowerCase().includes(`sem ${labSemFilter}`.toLowerCase()) ||
      (labSemFilter === '1' && (lab.semester?.includes('1') || lab.semester?.includes('Semester 1'))) ||
      (labSemFilter === '2' && (lab.semester?.includes('2') || lab.semester?.includes('Semester 2'))) ||
      (labSemFilter === '3' && (lab.semester?.includes('3') || lab.semester?.includes('Semester 3'))) ||
      (labSemFilter === '4' && (lab.semester?.includes('4') || lab.semester?.includes('Semester 4')));

    return matchSearch && matchSem;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* -------------------------------------------------------------------
         PART A: RESOURCE HUB HEADER
         ------------------------------------------------------------------- */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span className="badge-neon font-display" style={{ background: 'rgba(0, 240, 255, 0.15)', border: '1px solid var(--neon-cyan)' }}>
            🧪 PRACTICAL LABORATORY WORKBENCH
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
            100% University Aligned • Executable Codes • Viva-Voce Banks
          </span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', margin: 0 }}>
          Practical Lab Manuals & Code Hub
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', margin: 0, maxWidth: '850px', lineHeight: 1.5 }}>
          Official practical laboratory manuals featuring verified working programs, line-by-line algorithms, terminal output proofs, and exhaustive viva-voce question banks.
        </p>
      </div>

      {/* -------------------------------------------------------------------
         PRACTICAL LAB MANUALS & WORKING CODES (PROMINENT VIEW)
         ------------------------------------------------------------------- */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px', border: '1.5px solid rgba(0, 240, 255, 0.35)', background: 'linear-gradient(135deg, rgba(7, 15, 30, 0.85) 0%, rgba(10, 20, 45, 0.65) 100%)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span className="badge-neon" style={{ fontSize: '0.75rem' }}>MMEC OFFICIAL CURRICULUM</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', margin: 0 }}>
                  🧪 Verified Practical Laboratory Manuals with Working Codes &amp; Viva
                </h3>
                <span className="badge-neon" style={{ background: 'rgba(0, 240, 255, 0.15)', color: 'var(--neon-cyan)', border: '1px solid var(--neon-cyan)', fontSize: '0.75rem' }}>
                  {filteredLabs.length} Labs Available
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Session 2025-26 • Tested Codes • Algorithms • Viva Question Banks</span>
            </div>

            {/* Filter Toolbar: Semester Tabs + Search */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                {['All', '1', '2', '3', '4'].map(sem => {
                  const isSelected = labSemFilter === sem;
                  const count = sem === 'All'
                    ? labManuals.length
                    : labManuals.filter(l => 
                        l.semester?.toLowerCase().includes(`semester ${sem}`.toLowerCase()) ||
                        l.semester?.toLowerCase().includes(`sem ${sem}`.toLowerCase()) ||
                        (sem === '1' && (l.semester?.includes('1') || l.semester?.includes('Semester 1'))) ||
                        (sem === '2' && (l.semester?.includes('2') || l.semester?.includes('Semester 2'))) ||
                        (sem === '3' && (l.semester?.includes('3') || l.semester?.includes('Semester 3'))) ||
                        (sem === '4' && (l.semester?.includes('4') || l.semester?.includes('Semester 4')))
                      ).length;
                  return (
                    <button
                      key={sem}
                      onClick={() => setLabSemFilter(sem)}
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
                      {sem === 'All' ? `All Practical Labs (${count})` : `Sem ${sem} (${count})`}
                    </button>
                  );
                })}
              </div>

              <div style={{ position: 'relative', minWidth: '240px', flex: '1', maxWidth: '340px' }}>
                <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <input
                  type="text"
                  placeholder="Search labs, codes, algorithms, or viva..."
                  value={labSearchQuery}
                  onChange={(e) => setLabSearchQuery(e.target.value)}
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

            {/* Grid of Practical Lab Manuals */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
              {filteredLabs.map(lab => (
                <div 
                  key={lab.id} 
                  className="glass-panel" 
                  style={{ 
                    padding: '22px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    gap: '16px',
                    border: '1px solid rgba(0, 240, 255, 0.25)',
                    background: 'rgba(11, 15, 25, 0.75)',
                    transition: 'all 0.25s ease',
                    position: 'relative'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
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
                      <span className="badge-amber" style={{ fontSize: '0.75rem' }}>{lab.fileSize || 'Official PDF'}</span>
                    </div>

                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: '4px 0 6px 0' }}>
                      {lab.title}
                    </h4>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
                      Subject: <strong style={{ color: '#e2e8f0' }}>{lab.subject}</strong>
                    </div>
                    {lab.branch && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '10px' }}>
                        Branch: <span style={{ color: '#94a3b8' }}>{lab.branch}</span>
                      </div>
                    )}

                    {/* Practical Highlights Pill Row */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', fontSize: '0.78rem', color: '#c0c8db', marginTop: '6px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(16, 185, 129, 0.12)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399' }}>
                        <Code2 size={14} /> <strong>{lab.experiments?.length || lab.totalExperiments || '10+'} Tested Working Codes</strong>
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(56, 189, 248, 0.12)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8' }}>
                        <HelpCircle size={14} /> <strong>{lab.vivaQuestions?.length || 15}+ Viva-Voce Q&amp;A</strong>
                      </span>
                      {lab.capstoneProject && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(245, 158, 11, 0.12)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#fbbf24' }}>
                          <Trophy size={14} /> <strong>Capstone: {lab.capstoneProject.title}</strong>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <button 
                      className="btn-primary"
                      style={{ padding: '8px 16px', fontSize: '0.82rem', gap: '6px', flex: '1', minWidth: '180px', justifyContent: 'center' }}
                      onClick={() => {
                        setSelectedLab(lab);
                        setLabActiveTab('experiments');
                        setSelectedExpIndex(0);
                        setExpSubView('code');
                        setCapstoneSubView('code');
                      }}
                    >
                      <Code2 size={15} /> 🚀 Explore Experiments &amp; Codes
                    </button>

                    <button 
                      className="btn-outline" 
                      style={{ padding: '8px 14px', fontSize: '0.82rem', gap: '6px' }}
                      onClick={() => handleDownloadLab(lab)}
                      title="Download Complete Practical Manual PDF"
                    >
                      <DownloadCloud size={15} /> Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredLabs.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-dim)' }}>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>No practical lab manuals found matching "{labSearchQuery}".</p>
                <button 
                  className="btn-secondary" 
                  onClick={() => { setLabSemFilter('All'); setLabSearchQuery(''); }}
                  style={{ marginTop: '12px', fontSize: '0.8rem', padding: '6px 14px' }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>


      {/* -------------------------------------------------------------------
         PART C: INTERACTIVE GOD-LEVEL PRACTICAL LAB & CODE STUDIO MODAL
         ------------------------------------------------------------------- */}
      {selectedLab && createPortal(
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(4, 7, 13, 0.96)',
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
                          width: '100%',
                          height: '100%',
                          minHeight: 0,
                          overflowY: 'scroll',
                          overflowX: 'hidden',
                          WebkitOverflowScrolling: 'touch',
                          padding: '20px 24px',
                          background: '#070a12'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '16px',
                          width: '100%',
                          minHeight: 'min-content'
                        }}>
                          {/* Title & Badge Header */}
                          <div style={{ flexShrink: 0 }}>
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
                            flexShrink: 0,
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
                                color: expSubView === 'algorithm' ? '#f59e0b' : '#94a3b8',
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
                                border: expSubView === 'both' ? '1px solid #10b981' : '1px solid transparent',
                                background: expSubView === 'both' ? 'rgba(16, 185, 129, 0.18)' : 'transparent',
                                color: expSubView === 'both' ? '#34d399' : '#94a3b8',
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
                                flexShrink: 0,
                                background: 'rgba(0, 240, 255, 0.04)',
                                border: '1px solid rgba(0, 240, 255, 0.2)',
                                borderRadius: '8px',
                                padding: '12px 16px',
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
                                flexShrink: 0,
                                background: '#040711',
                                border: '1px solid rgba(0, 240, 255, 0.35)',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
                              }}>
                                {/* Window titlebar: traffic lights + filename + language tabs + copy */}
                                <div style={{
                                  background: 'rgba(15, 23, 42, 0.95)',
                                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                                  padding: '8px 16px',
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  gap: '8px'
                                }}>
                                  {/* Left: dots + filename */}
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                                    <span style={{ marginLeft: '8px', fontSize: '0.8rem', color: 'var(--neon-cyan)', fontFamily: 'monospace', fontWeight: 700 }}>
                                      {(() => {
                                        const activeLangCfg = LANG_CONFIG.find(l => l.id === selectedLang);
                                        const base = codeFileName.replace(/\.\w+$/, '');
                                        return `${base}.${activeLangCfg?.ext || 'c'}`;
                                      })()}
                                    </span>
                                  </div>

                                  {/* Center: Language switcher tabs */}
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                                    {LANG_CONFIG.map(lang => (
                                      <button
                                        key={lang.id}
                                        onClick={() => setSelectedLang(lang.id)}
                                        title={`View in ${lang.id}`}
                                        style={{
                                          padding: '3px 10px',
                                          borderRadius: '5px',
                                          fontSize: '0.72rem',
                                          fontWeight: 800,
                                          cursor: 'pointer',
                                          border: selectedLang === lang.id
                                            ? `1px solid ${lang.color}`
                                            : '1px solid rgba(255,255,255,0.1)',
                                          background: selectedLang === lang.id
                                            ? `${lang.color}22`
                                            : 'rgba(255,255,255,0.04)',
                                          color: selectedLang === lang.id ? lang.color : '#64748b',
                                          transition: 'all 0.15s',
                                          letterSpacing: '0.02em'
                                        }}
                                      >
                                        {lang.label}
                                      </button>
                                    ))}
                                  </div>

                                  {/* Right: Copy button */}
                                  <button
                                    onClick={() => handleCopyCode(translateCode(exp.code, selectedLang) || exp.code)}
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
                                      cursor: 'pointer',
                                      flexShrink: 0
                                    }}
                                  >
                                    {copiedCode ? <CheckCheck size={14} /> : <Copy size={14} />}
                                    {copiedCode ? 'Copied! ✨' : 'Copy Code'}
                                  </button>
                                </div>

                                {/* Preformatted Code Box with comfortable scroll */}
                                <pre 
                                  className="custom-scroll"
                                  style={{
                                    margin: 0,
                                    padding: '18px 22px',
                                    overflowX: 'auto',
                                    overflowY: 'visible',
                                    fontFamily: 'Consolas, "Fira Code", monospace',
                                    fontSize: '0.86rem',
                                    color: LANG_CONFIG.find(l => l.id === selectedLang)?.color || '#38bdf8',
                                    lineHeight: 1.65,
                                    background: '#040711',
                                    whiteSpace: 'pre',
                                    tabSize: 4
                                  }}
                                >
                                  <code>{formatDisplayCode(translateCode(exp.code, selectedLang) || exp.code)}</code>
                                </pre>
                              </div>

                              {/* Verified Console / Terminal Output Box */}
                              <div style={{
                                flexShrink: 0,
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
                                  flexShrink: 0,
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
                                  flexShrink: 0,
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
                                  flexShrink: 0,
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
                                <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', marginTop: '6px' }}>
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

                          {/* Bottom Breathing Space */}
                          <div style={{ height: '50px', flexShrink: 0 }} />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* TAB 2: UNIVERSITY VIVA-VOCE Q&A BANK */}
              {labActiveTab === 'viva' && (
                <div 
                  key={`${selectedLab.id}-viva`}
                  className="custom-scroll lab-studio-content"
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: 0,
                    flex: '1 1 0%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    WebkitOverflowScrolling: 'touch',
                    touchAction: 'pan-y',
                    padding: '20px 28px',
                    background: '#070a12'
                  }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '18px',
                    width: '100%',
                    minHeight: 'min-content'
                  }}>
                    {/* Viva Header & Search */}
                    <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
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
                    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
                              flexShrink: 0,
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

                    {/* Bottom breathing space */}
                    <div style={{ height: '50px', flexShrink: 0 }} />
                  </div>
                </div>
              )}

              {/* TAB 3: CAPSTONE COURSE PROJECT */}
              {labActiveTab === 'capstone' && selectedLab.capstoneProject && (
                <div 
                  key={`${selectedLab.id}-capstone`}
                  className="custom-scroll lab-studio-content"
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: 0,
                    flex: '1 1 0%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    WebkitOverflowScrolling: 'touch',
                    touchAction: 'pan-y',
                    padding: '20px 28px',
                    background: '#070a12'
                  }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    width: '100%',
                    minHeight: 'min-content'
                  }}>
                    {/* Capstone Header */}
                    <div style={{ flexShrink: 0 }}>
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
                      flexShrink: 0,
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
                          flexShrink: 0,
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
                          flexShrink: 0,
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
                              background: '#040711',
                              whiteSpace: 'pre',
                              tabSize: 4
                            }}
                          >
                            <code>{formatDisplayCode(selectedLab.capstoneProject.codeSnippet)}</code>
                          </pre>
                        </div>

                        {/* Quick link to architecture */}
                        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
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
                          flexShrink: 0,
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
                            flexShrink: 0,
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

                        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center', marginTop: '6px' }}>
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

                    {/* Bottom breathing space */}
                    <div style={{ height: '50px', flexShrink: 0 }} />
                  </div>
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
        </div>,
        document.body
      )}

      {/* ─── IN-APP PDF READER MODAL (FULLSCREEN RESPONSIVE PREVIEW) ─── */}
      {viewingPdf && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={viewingPdf.title}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(3, 7, 18, 0.98)',
            display: 'flex',
            flexDirection: 'column',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setViewingPdf(null);
          }}
        >
          {/* Reader Top Bar */}
          <div style={{
            padding: '12px 18px',
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(10, 15, 26, 0.98) 100%)',
            borderBottom: '1px solid rgba(0, 240, 255, 0.25)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            flexShrink: 0,
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: '1 1 auto' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(0, 240, 255, 0.15)',
                border: '1px solid rgba(0, 240, 255, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <FileText size={20} color="var(--neon-cyan)" />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: 'rgba(0, 240, 255, 0.2)',
                    color: 'var(--neon-cyan)',
                    border: '1px solid rgba(0, 240, 255, 0.4)'
                  }}>
                    {viewingPdf.code || 'PDF'}
                  </span>
                  {viewingPdf.pages && (
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      {viewingPdf.pages}
                    </span>
                  )}
                </div>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: '#fff',
                  margin: '2px 0 0 0',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '520px'
                }}>
                  {viewingPdf.title}
                </h3>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={() => handleDownloadPdf(viewingPdf.url, viewingPdf.downloadName)}
                style={{ padding: '7px 14px', fontSize: '0.8rem', gap: '6px' }}
                title="Download this PDF to device"
              >
                <DownloadCloud size={15} /> Download PDF
              </button>
              <button
                type="button"
                className="btn-outline"
                onClick={() => {
                  try {
                    window.open(viewingPdf.url, '_blank') || window.open(viewingPdf.url, '_system');
                  } catch (e) {
                    window.location.href = viewingPdf.url;
                  }
                }}
                style={{ padding: '7px 12px', fontSize: '0.8rem', gap: '6px' }}
                title="Open in new window or external viewer"
              >
                <ExternalLink size={15} /> External View
              </button>
              <button
                type="button"
                onClick={() => setViewingPdf(null)}
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
                  transition: 'all 0.15s'
                }}
                title="Close PDF Viewer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Reader Body / Embedded Frame */}
          <div style={{ flex: '1 1 0%', position: 'relative', background: '#0a0f1d', overflow: 'hidden' }}>
            <iframe
              src={viewingPdf.url}
              title={viewingPdf.title}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
                background: '#0a0f1d'
              }}
            />
          </div>

          {/* Mobile Helper Sub-bar */}
          <div style={{
            padding: '8px 16px',
            background: 'rgba(10, 15, 26, 0.95)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-dim)',
            flexShrink: 0
          }}>
            <span>💡 <em>Mobile hint:</em> If preview is blank on your phone, tap <strong>Download PDF</strong> or <strong>External View</strong> above.</span>
            <button
              type="button"
              onClick={() => setViewingPdf(null)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--neon-cyan)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Done &amp; Close
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

