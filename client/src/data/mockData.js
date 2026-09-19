/* =========================================================================
   ACADEMIC DATA CONFIGURATION (mockData.js)
   =========================================================================
   EDIT THIS FILE to customize:
   1. academicYears     -> Define Years & Semesters (1st to 4th Year, Sem 1 to 8)
   2. initialSubjects   -> Add, edit, or remove subjects, unit titles & notes
   3. initialShortNotes -> High-yield short notes, formula sheets & exam revision summaries
   4. initialLabManuals -> Practical laboratory records, codes, and viva questions
   5. initialForumDoubts-> Community Q&A questions and verified peer answers
   ========================================================================= */

import { comprehensiveLabManuals } from './labManualsData';

/* -------------------------------------------------------------------------
   1. ACADEMIC YEARS & SEMESTERS HIERARCHY
   Edit this list to add more years or rename semesters.
   ------------------------------------------------------------------------- */
export const academicYears = [
  {
    year: '1st Year',
    semesters: [
      { id: 1, name: 'Semester 1', code: 'SEM-1' },
      { id: 2, name: 'Semester 2', code: 'SEM-2' }
    ]
  },
  {
    year: '2nd Year',
    semesters: [
      { id: 3, name: 'Semester 3', code: 'SEM-3' },
      { id: 4, name: 'Semester 4', code: 'SEM-4' }
    ]
  },
  {
    year: '3rd Year',
    semesters: [
      { id: 5, name: 'Semester 5', code: 'SEM-5' },
      { id: 6, name: 'Semester 6', code: 'SEM-6' }
    ]
  },
  {
    year: '4th Year',
    semesters: [
      { id: 7, name: 'Semester 7', code: 'SEM-7' },
      { id: 8, name: 'Semester 8', code: 'SEM-8' }
    ]
  }
];

/* -------------------------------------------------------------------------
   2. SUBJECTS LIST & CHAPTER / UNIT NOTES
   To ADD a new subject: Copy one of the objects below, change:
   - id: unique string (e.g. 'sub-java')
   - semester: 1 through 8
   - year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year'
   - name: Full subject title
   - code: University Course Code (e.g. 'CS301')
   - units: Array of 5 units with titles, page counts, and download links
   ------------------------------------------------------------------------- */
export const initialSubjects = [
  // ==================== SEMESTER 1 (FLAGSHIP COURSE) ====================
  {
    id: 'sub-beee',
    semester: 1,
    year: '1st Year',
    name: 'Basic Electrical & Electronics Engineering (BEEE)',
    code: 'BELE-001',
    credits: 4,
    instructor: 'Prof. S. K. Mukherjee & Department Faculty',
    notesCount: '4 Units Exhaustive Notes & MMDU Solved Papers',
    rating: 5.0,
    description: 'Complete handwritten god-level notes for DC/AC circuits, transformers, electrical machines, semiconductor diodes, BJTs, number systems, and Boolean algebra with MMDU solved examination papers.',
    banner: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=800&q=80',
    units: [
      { num: 1, title: 'DC Circuits & AC Circuit Analysis', pages: 48, status: 'Verified' },
      { num: 2, title: 'Transformers & Electrical Machines', pages: 52, status: 'Verified' },
      { num: 3, title: 'Semiconductor Devices & Transistors (BJT)', pages: 46, status: 'Verified' },
      { num: 4, title: 'Number Systems & Boolean Algebra', pages: 38, status: 'Verified' }
    ]
  },
  {
    id: 'sub-m1',
    semester: 1,
    year: '1st Year',
    name: 'Mathematics I (BMAT-001)',
    code: 'BMAT-001',
    credits: 4,
    instructor: 'Department of Mathematics & Humanities (MMU)',
    notesCount: '4 Units Exhaustive Notes & Solved Numericals',
    rating: 5.0,
    description: 'Maharishi Markandeshwar University (MMU) official syllabus: Matrices & Gauss-Jordan Inversion, Mean Value Theorems, Curvature, Indeterminate Forms, Beta-Gamma Functions, Multivariable Calculus, Vector Differentiation, Sequences & Series, and Fourier Series.',
    banner: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    units: [
      { num: 1, title: 'Matrices, Rank & Gauss-Jordan Inversion', pages: 34, status: 'Verified' },
      { num: 2, title: 'Calculus, Curvature & Beta-Gamma Functions', pages: 46, status: 'Verified' },
      { num: 3, title: 'Multivariable Calculus & Vector Differentiation', pages: 38, status: 'Verified' },
      { num: 4, title: 'Sequences & Series and Fourier Series', pages: 44, status: 'Verified' }
    ]
  },
  {
    id: 'sub-c1',
    semester: 1,
    year: '1st Year',
    name: 'Computational and Problem Solving using C',
    code: 'BCSE-008',
    credits: 4,
    instructor: 'Department of Computer Science & Engineering (MMDU)',
    notesCount: '4 Units Comprehensive Long Notes & Solved Questions',
    rating: 5.0,
    description: 'Official MMDU syllabus (BCSE-008): Computational problem classifications, Deductive/Inductive logic, 4-stage compilation pipeline, memory segmentation, 9-tier operator precedence, typecasting, 2D array row-major addressing, 12-point storage classes matrix, Near/Far/Huge pointers, DMA, and file streams with solved examination questions.',
    banner: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80',
    units: [
      { num: 1, title: 'Programming Fundamentals, Compilation Pipeline & Problem Solving', pages: 36, status: 'Verified' },
      { num: 2, title: 'Core Programming Concepts, Operators & Control Structures', pages: 34, status: 'Verified' },
      { num: 3, title: 'Arrays, Strings, Functions & Modular Programming', pages: 42, status: 'Verified' },
      { num: 4, title: 'Advanced Data Handling, Pointers, Structures, DMA & File I/O', pages: 48, status: 'Verified' }
    ]
  },
  {
    id: 'sub-aiml',
    semester: 1,
    year: '1st Year',
    name: 'Fundamentals of AI & ML',
    code: 'BCSE-011',
    credits: 4,
    instructor: 'AI & ML Department Faculty',
    notesCount: '4 Units Comprehensive Notes & University Numericals',
    rating: 5.0,
    description: 'Foundations of AI, Agent architectures, PEAS framework, State Space Search, A* trace, Logic, CNF, Resolution Refutation, Semantic Nets, Frames, Scripts, Expert Systems, Decision Trees ID3, SVM, Clustering, and Apriori algorithm with solved numericals.',
    banner: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    units: [
      { num: 1, title: 'Foundations of Artificial Intelligence', pages: 32, status: 'Verified' },
      { num: 2, title: 'Searching Algorithms & Knowledge Representation', pages: 44, status: 'Verified' },
      { num: 3, title: 'Expert Systems Architecture & Acquisition', pages: 28, status: 'Verified' },
      { num: 4, title: 'Machine Learning Concepts & Algorithms', pages: 50, status: 'Verified' }
    ]
  },
  {
    id: 'sub-webtech',
    semester: 1,
    year: '1st Year',
    name: 'Fundamentals of Web Technologies',
    code: 'BCSE-012',
    credits: 2,
    instructor: 'Department of Computer Science & Engineering (MMDU)',
    notesCount: '4 Units Comprehensive Long Notes & Solved Questions',
    rating: 5.0,
    description: 'Complete university syllabus notes for BCSE-012: Internet vs WWW, DNS resolution, TCP/IP HTTP transaction cycles, HTML5 Semantic page blueprints, Client-side image maps, Multimedia APIs, Canvas 2D graphics, Web Storage, and CSS architecture with solved university questions.',
    banner: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
    units: [
      { num: 1, title: 'Internet & World Wide Web Architecture', pages: 42, status: 'Verified' },
      { num: 2, title: 'Basics of HTML & Website Engineering', pages: 38, status: 'Verified' },
      { num: 3, title: 'HTML5 & Modern Web Application APIs', pages: 46, status: 'Verified' },
      { num: 4, title: 'Cascading Style Sheets (CSS) Architecture', pages: 44, status: 'Verified' }
    ]
  },

  // ==================== SEMESTER 2 ====================
  {
    id: 'sub-p1',
    semester: 2,
    year: '1st Year',
    name: 'Applied Physics',
    code: 'PHYS102',
    credits: 4,
    instructor: 'Department of Physics & Applied Sciences',
    notesCount: '4 Units Complete',
    rating: 5.0,
    description: "Official MMDU syllabus (BPHY-001 / PHYS102): Wave optics, Newton's rings derivations, Fraunhofer diffraction, lasers, Maxwell's equations, skin depth, Schrödinger wave mechanics, and crystal APF derivations.",
    banner: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    units: [
      { num: 1, title: 'Wave Optics & Lasers', pages: 28, status: 'Verified' },
      { num: 2, title: 'Electrostatics, Magnetostatics & EM Waves', pages: 26, status: 'Verified' },
      { num: 3, title: 'Wave Nature of Particles & Schrödinger Equation', pages: 30, status: 'Verified' },
      { num: 4, title: 'Crystal Structures & Free Electron Theory', pages: 32, status: 'Verified' }
    ]
  },
  {
    id: 'sub-py',
    semester: 2,
    year: '1st Year',
    name: 'Python Programming',
    code: 'BCSE-004',
    credits: 2,
    instructor: 'Department of Computer Science & Engineering (MMDU)',
    notesCount: '4 Units Complete Long Notes & Solved Papers',
    rating: 5.0,
    description: 'Official MMDU syllabus (BCSE-004): Python programming foundations, CPython compilation & PVM execution pipeline, variable reference model, 9-tier operator precedence, branching & looping (break/continue/pass/for-else), functions & LEGB scope, Lists, Tuples, Dictionaries (hash table internals), File Handling (modes, context managers), and Object-Oriented Programming (Classes, Dunder methods, Operator Overloading, MRO, Polymorphism, Composition).',
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    units: [
      { num: 1, title: 'Introduction to Programming and Python', pages: 32, status: 'Verified' },
      { num: 2, title: 'Decision Making, Branching & Functions', pages: 28, status: 'Verified' },
      { num: 3, title: 'Data Types in Python (Lists, Tuples, Dictionaries)', pages: 34, status: 'Verified' },
      { num: 4, title: 'File Handling & Object-Oriented Programming (OOP)', pages: 36, status: 'Verified' }
    ]
  },
  {
    id: 'sub-dsa-bcse007',
    semester: 2,
    year: '1st Year',
    name: 'Data Structure',
    code: 'BCSE-007',
    credits: 3,
    instructor: 'Department of Computer Science & Engineering (MMDU)',
    notesCount: '4 Units Complete Master Notes & Solved Papers',
    rating: 5.0,
    description: 'Official MMDU syllabus (BCSE-007): Mathematical notation, asymptotic bounds, 1D/2D/3D array addressing, sparse matrices, Bubble/Selection/Insertion/Merge/Quick/Heap sorting, Linear/Binary searching, Stacks (LIFO), Infix-Postfix-Prefix conversion & evaluation, recursion & Tower of Hanoi, Linear/Circular/Deque/Priority Queues, Singly/Doubly/Circular Linked Lists, Binary Trees, BST traversals & deletion cases, Graph representations (Adjacency Matrix/List), and BFS/DFS graph traversals.',
    banner: 'https://images.unsplash.com/photo-1516116211227-bbc13c73335c?auto=format&fit=crop&w=800&q=80',
    units: [
      { num: 1, title: 'Foundations, Arrays, Searching & Sorting', pages: 3, status: 'Verified' },
      { num: 2, title: 'Stacks, Expressions & Recursion (Tower of Hanoi)', pages: 3, status: 'Verified' },
      { num: 3, title: 'Queues & Linked Lists Topologies', pages: 3, status: 'Verified' },
      { num: 4, title: 'Trees, BST & Graph Algorithms (BFS/DFS)', pages: 3, status: 'Verified' }
    ]
  },

  // ==================== SEMESTER 3 ====================
  {
    id: 'sub-dsa',
    semester: 3,
    year: '2nd Year',
    name: 'Data Structures & Algorithms',
    code: 'CS301',
    credits: 4,
    instructor: 'Dr. Priya Nair',
    notesCount: '5 Units Complete',
    rating: 5.0,
    description: 'Linked Lists, Stacks, Queues, Trees, AVL Trees, Graphs, Sorting, Dynamic Programming with asymptotic analysis.',
    banner: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    units: [
      { num: 1, title: 'Linear Structures: Stacks, Queues, Lists', pages: 40, status: 'Verified' },
      { num: 2, title: 'Binary Trees & BST & Heaps', pages: 46, status: 'Verified' },
      { num: 3, title: 'Balanced Trees: AVL & B-Trees', pages: 32, status: 'Verified' },
      { num: 4, title: 'Graph Algorithms: BFS, DFS, MST', pages: 48, status: 'Verified' },
      { num: 5, title: 'Hashing & Sorting Complexity', pages: 35, status: 'Verified' }
    ]
  },
  {
    id: 'sub-dld',
    semester: 3,
    year: '2nd Year',
    name: 'Digital Logic & Computer Design',
    code: 'CS302',
    credits: 3,
    instructor: 'Prof. Ramesh Gupta',
    notesCount: '5 Units Complete',
    rating: 4.7,
    description: 'Boolean algebra, K-maps, multiplexers, flip-flops, synchronous counters, and finite state machine design.',
    banner: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    units: [
      { num: 1, title: 'Boolean Algebra & Logic Minimization', pages: 28, status: 'Verified' },
      { num: 2, title: 'Combinational Circuit Design', pages: 36, status: 'Verified' },
      { num: 3, title: 'Sequential Circuits & Flip-Flops', pages: 42, status: 'Verified' },
      { num: 4, title: 'Registers & Synchronous Counters', pages: 30, status: 'Verified' },
      { num: 5, title: 'Memory Architecture & PLDs', pages: 25, status: 'Verified' }
    ]
  },

  // ==================== SEMESTER 4 ====================
  {
    id: 'sub-os',
    semester: 4,
    year: '2nd Year',
    name: 'Operating Systems',
    code: 'CS401',
    credits: 4,
    instructor: 'Dr. Siddharth Sen',
    notesCount: '5 Units Complete',
    rating: 4.9,
    description: 'Process scheduling, concurrency, semaphores, deadlocks, paging, virtual memory, and Linux file systems.',
    banner: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80',
    units: [
      { num: 1, title: 'OS Architecture & System Calls', pages: 28, status: 'Verified' },
      { num: 2, title: 'Process Scheduling & Threads', pages: 38, status: 'Verified' },
      { num: 3, title: 'Synchronization & Deadlocks', pages: 44, status: 'Verified' },
      { num: 4, title: 'Virtual Memory & Paging Algorithms', pages: 40, status: 'Verified' },
      { num: 5, title: 'File System & Disk Scheduling', pages: 26, status: 'Verified' }
    ]
  },
  {
    id: 'sub-dbms',
    semester: 4,
    year: '2nd Year',
    name: 'Database Management Systems',
    code: 'CS402',
    credits: 4,
    instructor: 'Prof. Neha Deshmukh',
    notesCount: '5 Units Complete',
    rating: 4.9,
    description: 'ER Modeling, Relational Algebra, SQL queries, Normalization (1NF to BCNF), ACID transactions, and indexing.',
    banner: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
    units: [
      { num: 1, title: 'ER Modeling & Relational Schema', pages: 32, status: 'Verified' },
      { num: 2, title: 'Advanced SQL & Views & Triggers', pages: 38, status: 'Verified' },
      { num: 3, title: 'Functional Dependencies & Normalization', pages: 45, status: 'Verified' },
      { num: 4, title: 'Transaction Processing & Concurrency', pages: 36, status: 'Verified' },
      { num: 5, title: 'B+ Tree Indexing & Query Optimization', pages: 30, status: 'Verified' }
    ]
  },

  // ==================== SEMESTER 5 ====================
  {
    id: 'sub-cn',
    semester: 5,
    year: '3rd Year',
    name: 'Computer Networks',
    code: 'CS501',
    credits: 4,
    instructor: 'Dr. Arvind Mehra',
    notesCount: '5 Units Complete',
    rating: 4.8,
    description: 'OSI & TCP/IP stack, routing protocols, flow control, TCP congestion avoidance, DNS, HTTP/3, and socket programming.',
    banner: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    units: [
      { num: 1, title: 'Network Layers & Physical Transmission', pages: 30, status: 'Verified' },
      { num: 2, title: 'Data Link: MAC, Sliding Window, CSMA/CD', pages: 42, status: 'Verified' },
      { num: 3, title: 'Network Layer: IP Addressing & Routing', pages: 48, status: 'Verified' },
      { num: 4, title: 'Transport Layer: TCP Congestion & UDP', pages: 40, status: 'Verified' },
      { num: 5, title: 'Application Layer & Network Security', pages: 34, status: 'Verified' }
    ]
  },

  // ==================== SEMESTER 6 ====================
  {
    id: 'sub-ai',
    semester: 6,
    year: '3rd Year',
    name: 'Artificial Intelligence & Machine Learning',
    code: 'CS601',
    credits: 4,
    instructor: 'Dr. Maya Kulkarni',
    notesCount: '5 Units Complete',
    rating: 5.0,
    description: 'Heuristic search, A* algorithm, supervised regression, classification, SVMs, neural networks, and clustering.',
    banner: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80',
    units: [
      { num: 1, title: 'Intelligent Agents & Search (A*, Minimax)', pages: 38, status: 'Verified' },
      { num: 2, title: 'Supervised Learning: Regression & Trees', pages: 46, status: 'Verified' },
      { num: 3, title: 'Classification, SVM & Logistic Models', pages: 42, status: 'Verified' },
      { num: 4, title: 'Neural Networks & Backpropagation', pages: 52, status: 'Verified' },
      { num: 5, title: 'Unsupervised Clustering & Dimensionality', pages: 36, status: 'Verified' }
    ]
  },

  // ==================== SEMESTER 7 ====================
  {
    id: 'sub-cloud',
    semester: 7,
    year: '4th Year',
    name: 'Cloud Computing & Distributed Systems',
    code: 'CS701',
    credits: 4,
    instructor: 'Prof. Tanmay Bhatnagar',
    notesCount: '5 Units Complete',
    rating: 4.8,
    description: 'Virtualization, microservices, Docker, Kubernetes, AWS architecture, CAP theorem, and distributed consensus.',
    banner: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    units: [
      { num: 1, title: 'Distributed Systems & RPC Models', pages: 32, status: 'Verified' },
      { num: 2, title: 'Virtualization & Hypervisors', pages: 28, status: 'Verified' },
      { num: 3, title: 'Cloud Models: IaaS, PaaS, SaaS', pages: 35, status: 'Verified' },
      { num: 4, title: 'Containers & Kubernetes Orchestration', pages: 48, status: 'Verified' },
      { num: 5, title: 'Cloud Security, SLA & Serverless', pages: 30, status: 'Verified' }
    ]
  },

  // ==================== SEMESTER 8 ====================
  {
    id: 'sub-devops',
    semester: 8,
    year: '4th Year',
    name: 'DevOps Engineering & CI/CD Pipelines',
    code: 'CS801',
    credits: 3,
    instructor: 'Prof. Devendra Joshi',
    notesCount: '4 Units Complete',
    rating: 4.9,
    description: 'Git workflows, automated testing, Jenkins, GitHub Actions, Terraform Infrastructure as Code, and Prometheus monitoring.',
    banner: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
    units: [
      { num: 1, title: 'Agile & DevOps Lifecycle', pages: 24, status: 'Verified' },
      { num: 2, title: 'Continuous Integration: Jenkins & Actions', pages: 40, status: 'Verified' },
      { num: 3, title: 'Infrastructure as Code: Terraform & Ansible', pages: 44, status: 'Verified' },
      { num: 4, title: 'Observability, Logging & SRE Best Practices', pages: 36, status: 'Verified' }
    ]
  }
];

/* -------------------------------------------------------------------------
   3. HIGH-YIELD SHORT NOTES & EXAM REVISION SHEETS
   Fast-track revision guides, formula sheets & exam summaries.
   ------------------------------------------------------------------------- */
export const initialShortNotes = [
  // ==================== SEMESTER 1 ====================
  {
    id: 'sn-math1',
    subject: 'Engineering Mathematics I (BMAT-001)',
    code: 'BMAT-001',
    semester: 'Semester 1',
    category: 'Mathematics',
    type: 'KaTeX High-Yield Formulae & Quick Proofs',
    pdfUrl: '/Mathematics_1_Short_Notes_Exam_Ready.pdf',
    downloadName: 'Mathematics_1_Short_Notes_Exam_Ready.pdf',
    fileSize: '240 KB',
    pages: '2 Pages KaTeX Revision',
    downloads: 4820,
    highlights: [
      'Matrices, Rank, Echelon Form & Cayley-Hamilton Theorem',
      'Rolle\'s, LMVT, Cauchy MVT & Radius of Curvature ρ',
      'Euler\'s Homogeneous Theorem, Beta-Gamma Function Proofs',
      'Fourier Series Dirichlet Conditions & Euler Formulas'
    ]
  },
  {
    id: 'sn-beee',
    subject: 'Basic Electrical & Electronics (BELE-001)',
    code: 'BELE-001',
    semester: 'Semester 1',
    category: 'Core Engineering',
    type: 'KaTeX Circuit Theorems & Rapid Derivations',
    pdfUrl: '/BEEE_Short_Notes_Exam_Ready.pdf',
    downloadName: 'BEEE_Short_Notes_Exam_Ready.pdf',
    fileSize: '250 KB',
    pages: '2 Pages KaTeX Revision',
    downloads: 5120,
    highlights: [
      'Thevenin, Norton & Maximum Power Transfer Proofs',
      'AC Phasors, Impedance, Resonance & Quality Factor Q',
      'Transformer EMF Equation, Losses & Efficiency',
      'P-N Diode Rectifiers, Ripple Factors & BJT Configurations'
    ]
  },
  {
    id: 'sn-c',
    subject: 'Computational Problem Solving using C (BCSE-008)',
    code: 'BCSE-008',
    semester: 'Semester 1',
    category: 'Computer Science',
    type: 'KaTeX Syntax, Memory Layout & Pointers Cheat Sheet',
    pdfUrl: '/C Programming Exam Revision Sheet.pdf',
    downloadName: 'C_Programming_Exam_Revision_Sheet.pdf',
    fileSize: '449 KB',
    pages: '2 Pages KaTeX Revision',
    downloads: 4490,
    highlights: [
      '4-Stage Compilation Pipeline & Preprocessor Directives',
      'Memory Segmentation (Code, Data, BSS, Heap, Stack)',
      '2D Array Row/Col Major Addressing & KaTeX Offsets',
      'Pointer Arithmetic, Dynamic Allocation (malloc/calloc)'
    ]
  },
  {
    id: 'sn-webtech',
    subject: 'Fundamentals of Web Technologies (BCSE-012)',
    code: 'BCSE-012',
    semester: 'Semester 1',
    category: 'Computer Science',
    type: 'KaTeX Protocols, CSS Box Model & Web Architecture',
    pdfUrl: '/Web Technologies Exam Revision Sheet.pdf',
    downloadName: 'Web_Technologies_Exam_Revision_Sheet.pdf',
    fileSize: '333 KB',
    pages: '2 Pages KaTeX Revision',
    downloads: 3780,
    highlights: [
      'HTTP Request-Response Lifecycle & DNS Resolution Cycle',
      'Semantic HTML5 Architecture & Client-Side Image Maps',
      'CSS Specificity Vectors & Total Box Model Width Formulas',
      'JavaScript Event Bubbling, Capturing & Web Storage'
    ]
  },
  {
    id: 'sn-aiml',
    subject: 'Fundamentals of Artificial Intelligence & ML (BCSE-011)',
    code: 'BCSE-011',
    semester: 'Semester 1',
    category: 'Artificial Intelligence',
    type: 'KaTeX Search Algorithms, Logic & ML Formulae',
    pdfUrl: '/AIML_Short_Notes_Exam_Ready.pdf',
    downloadName: 'AIML_Short_Notes_Exam_Ready.pdf',
    fileSize: '280 KB',
    pages: '2 Pages KaTeX Revision',
    downloads: 4340,
    highlights: [
      'PEAS Agent Architecture & State Space Search Formulations',
      'A* Evaluation Function f(n)=g(n)+h(n) & Heuristic Proofs',
      'Propositional Logic, CNF Conversion & Resolution Refutation',
      'Entropy H(S), Information Gain & Apriori Association Rules'
    ]
  },

  // ==================== SEMESTER 2 ====================
  {
    id: 'sn-physics',
    subject: 'Applied Physics (BPHY-001 / PHYS102)',
    code: 'PHYS102',
    semester: 'Semester 2',
    category: 'Core Engineering',
    type: 'Optics, Maxwell EM Waves, Quantum 1D Box & Crystal APF Formula Sheet',
    pdfUrl: '/Applied_Physics_Exam_Revision_Sheet.pdf',
    downloadName: 'Applied Physics Exam Revision Sheet.pdf',
    fileSize: '325 KB',
    pages: '2 Pages High-Yield Revision',
    downloads: 4890,
    highlights: [
      'Newton\'s Rings Radii Derivations & Optical Path Difference',
      'Maxwell\'s 4 Equations, Displacement Current & Skin Depth',
      '1D Infinite Box Wavefunctions & Nuclear Electron Uncertainty Proof',
      'Cubic Crystal Geometries: SC (52%), BCC (68%), FCC (74%) APF Derivations'
    ]
  },
  {
    id: 'sn-python',
    subject: 'Python Programming (BCSE-004)',
    code: 'BCSE-004',
    semester: 'Semester 2',
    category: 'Computer Science',
    type: 'Flowchart Architecture, 9-Tier Precedence, Hash Tables & C3 MRO Sheet',
    pdfUrl: '/Python_Programming_Exam_Revision_Sheet.pdf',
    downloadName: 'Python Programming Exam Revision Sheet.pdf',
    fileSize: '190 KB',
    pages: '2 Pages High-Yield Revision',
    downloads: 5120,
    highlights: [
      'CPython Compiler & PVM Execution Pipeline with Object Reference Model',
      '9-Tier Operator Precedence Matrix & Flowchart Decision Trees',
      'List vs Tuple vs Dictionary Hash Table Internals & Shallow vs Deep Copy',
      'Context Manager Protocol (__enter__/__exit__) & C3 Linearization MRO'
    ]
  },
  {
    id: 'sn-dsa-bcse007',
    subject: 'Data Structure (BCSE-007)',
    code: 'BCSE-007',
    semester: 'Semester 2',
    category: 'Computer Science',
    type: 'Flowchart Architecture, Array Addressing, BST Deletion & BFS/DFS Sheet',
    pdfUrl: '/Data_Structures_Exam_Revision_Sheet.pdf',
    downloadName: 'Data Structures Exam Revision Sheet.pdf',
    fileSize: '160 KB',
    pages: '2 Pages High-Yield Revision',
    downloads: 5890,
    highlights: [
      'Asymptotic Notations (O, Ω, Θ) & 1D/2D/3D Array Memory Addressing Formulas',
      'Master Sorting & Searching Matrix (Time/Space/Stability comparison)',
      'Stack LIFO, Shunting-Yard Infix-Postfix, Postfix Eval & Tower of Hanoi Recurrence',
      'Circular Queue Modulo Math, SLL/DLL Pointer Rewiring, BST 3-Case Deletion & BFS/DFS'
    ]
  },

  // ==================== SEMESTER 3 ====================
  {
    id: 'sn-dsa',
    subject: 'Data Structures & Algorithms (CS301)',
    code: 'CS301',
    semester: 'Semester 3',
    category: 'Computer Science',
    type: 'KaTeX Complexity Matrices, Trees & Graph Formula Sheet',
    pdfUrl: '/CS301_Data_Structures_and_Algorithms_Short_Notes.pdf',
    downloadName: 'CS301_Data_Structures_and_Algorithms_Short_Notes.pdf',
    fileSize: '159 KB',
    pages: '2 Pages KaTeX Revision',
    downloads: 5430,
    highlights: [
      'Master Theorem Formulas & 1D/2D Array Address Calculations',
      'Circular Queue Modulo Arithmetic & Stack Postfix Evaluation',
      'BST Inorder Successor & AVL Tree 4 Rotation Balance Factors',
      'Dijkstra, Bellman-Ford, Kruskal/Prim MST & Hashing Probing'
    ]
  },
  {
    id: 'sn-dld',
    subject: 'Digital Logic & Computer Design (CS302)',
    code: 'CS302',
    semester: 'Semester 3',
    category: 'Computer Science',
    type: 'KaTeX Boolean Theorems, K-Maps & Sequential Circuits',
    pdfUrl: '/CS302_Digital_Logic_and_Design_Short_Notes.pdf',
    downloadName: 'CS302_Digital_Logic_and_Design_Short_Notes.pdf',
    fileSize: '146 KB',
    pages: '2 Pages KaTeX Revision',
    downloads: 3890,
    highlights: [
      'Radix Complements & IEEE 754 Single Precision Floating-Point',
      'De Morgan\'s Laws, Boolean Duality & Gray Code Conversion',
      'K-Map Grouping Rules, Carry Look-Ahead (CLA) Adder Equations',
      'Flip-Flop Characteristic Equations (SR, JK, D, T) & FSM Design'
    ]
  },

  // ==================== SEMESTER 4 ====================
  {
    id: 'sn-os',
    subject: 'Operating Systems (CS401)',
    code: 'CS401',
    semester: 'Semester 4',
    category: 'Systems & Networks',
    type: 'KaTeX CPU Scheduling, Deadlock & Paging Calculations',
    pdfUrl: '/CS401_Operating_Systems_Short_Notes.pdf',
    downloadName: 'CS401_Operating_Systems_Short_Notes.pdf',
    fileSize: '142 KB',
    pages: '2 Pages KaTeX Revision',
    downloads: 4760,
    highlights: [
      'Turnaround & Waiting Time Metrics for FCFS, SJF, SRTF, RR',
      'Peterson\'s Algorithm & Banker\'s Algorithm Safety Test',
      'Paging Address Translation & Effective Memory Access Time (EMAT)',
      'Page Fault Algorithms (FIFO, LRU, Optimal) & SSTF/SCAN/C-SCAN'
    ]
  },
  {
    id: 'sn-dbms',
    subject: 'Database Management Systems (CS402)',
    code: 'CS402',
    semester: 'Semester 4',
    category: 'Computer Science',
    type: 'KaTeX Relational Algebra, Normalization & ACID Formulae',
    pdfUrl: '/CS402_Database_Management_Systems_Short_Notes.pdf',
    downloadName: 'CS402_Database_Management_Systems_Short_Notes.pdf',
    fileSize: '153 KB',
    pages: '2 Pages KaTeX Revision',
    downloads: 4980,
    highlights: [
      'Relational Algebra Operations: Selection, Projection, Natural Join',
      'Armstrong\'s Axioms & Attribute Closure Canonical Form',
      '1NF, 2NF, 3NF and BCNF Normal Forms & Lossless Join Tests',
      'Conflict Serializability Precedence Graph, 2PL & B+ Tree Capacity'
    ]
  },

  // ==================== SEMESTER 5 ====================
  {
    id: 'sn-cn',
    subject: 'Computer Networks (CS501)',
    code: 'CS501',
    semester: 'Semester 5',
    category: 'Systems & Networks',
    type: 'KaTeX Network Layer Protocols, Delays & Subnetting',
    pdfUrl: '/CS501_Computer_Networks_Short_Notes.pdf',
    downloadName: 'CS501_Computer_Networks_Short_Notes.pdf',
    fileSize: '142 KB',
    pages: '2 Pages KaTeX Revision',
    downloads: 4610,
    highlights: [
      'Transmission vs Propagation Delay & Shannon Channel Capacity',
      'Stop-and-Wait & Selective Repeat Efficiency Formulae',
      'CRC Polynomial Long Division & Minimum CSMA/CD Frame Size',
      'CIDR IPv4 Subnetting Calculations, Bellman-Ford & TCP Tahoe/Reno'
    ]
  }
];

export const initialPYQs = initialShortNotes; // Alias for backwards compatibility

/* -------------------------------------------------------------------------
   4. PRACTICAL LABORATORY MANUALS & CODE SOLUTIONS
   Add new lab experiments, programs, or viva question banks here.
   ------------------------------------------------------------------------- */
export const initialLabManuals = comprehensiveLabManuals;

/* -------------------------------------------------------------------------
   5. STUDENT PEER FORUM DOUBTS & Q&A THREADS
   Add initial community questions or sample doubts here.
   ------------------------------------------------------------------------- */
export const initialForumDoubts = [];
