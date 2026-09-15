/* =========================================================================
   ACADEMIC DATA CONFIGURATION (mockData.js)
   =========================================================================
   EDIT THIS FILE to customize:
   1. academicYears     -> Define Years & Semesters (1st to 4th Year, Sem 1 to 8)
   2. initialSubjects   -> Add, edit, or remove subjects, unit titles & notes
   3. initialPYQs       -> Past year university question papers & download links
   4. initialLabManuals -> Practical laboratory records, codes, and viva questions
   5. initialForumDoubts-> Community Q&A questions and verified peer answers
   ========================================================================= */

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
    id: 'sub-p1',
    semester: 1,
    year: '1st Year',
    name: 'Applied Physics',
    code: 'PHYS102',
    credits: 4,
    instructor: 'Prof. Ananya Sen',
    notesCount: '5 Units Complete',
    rating: 4.8,
    description: 'Wave optics, lasers, fiber optics, quantum mechanics, and solid-state crystal physics with diagrams.',
    banner: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    units: [
      { num: 1, title: 'Wave Optics & Interference', pages: 26, status: 'Verified' },
      { num: 2, title: 'Lasers & Holography', pages: 22, status: 'Verified' },
      { num: 3, title: 'Fiber Optics Communication', pages: 24, status: 'Verified' },
      { num: 4, title: 'Quantum Mechanics Basics', pages: 34, status: 'Verified' },
      { num: 5, title: 'Solid State & Band Theory', pages: 30, status: 'Verified' }
    ]
  },

  // ==================== SEMESTER 2 ====================
  {
    id: 'sub-aiml',
    semester: 2,
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
    semester: 2,
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
  {
    id: 'sub-c1',
    semester: 2,
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
   3. PREVIOUS YEAR QUESTION PAPERS (PYQs)
   Add new past exam papers here.
   ------------------------------------------------------------------------- */
export const initialPYQs = [
  {
    id: 'pyq-beee-2024',
    subject: 'Basic Electrical & Electronics (BEEE)',
    code: 'BELE-001',
    semester: 'Semester 1',
    year: '2024',
    type: 'End-Semester University Exam (Solved)',
    downloads: 2480,
    hasSolutions: true,
    fileSize: '3.8 MB'
  },
  {
    id: 'pyq-beee-2023',
    subject: 'Basic Electrical & Electronics (BEEE)',
    code: 'BELE-001',
    semester: 'Semester 1',
    year: '2023',
    type: 'Mid-Semester Exam + Model Keys',
    downloads: 1940,
    hasSolutions: true,
    fileSize: '2.7 MB'
  },
  {
    id: 'pyq-1',
    subject: 'Data Structures & Algorithms',
    code: 'CS301',
    semester: 'Semester 3',
    year: '2024',
    type: 'End-Semester University Exam',
    downloads: 1420,
    hasSolutions: true,
    fileSize: '2.4 MB'
  },
  {
    id: 'pyq-2',
    subject: 'Operating Systems',
    code: 'CS401',
    semester: 'Semester 4',
    year: '2024',
    type: 'End-Semester University Exam',
    downloads: 1180,
    hasSolutions: true,
    fileSize: '3.1 MB'
  },
  {
    id: 'pyq-3',
    subject: 'Database Management Systems',
    code: 'CS402',
    semester: 'Semester 4',
    year: '2023',
    type: 'Mid-Semester Examination',
    downloads: 980,
    hasSolutions: true,
    fileSize: '1.8 MB'
  },
  {
    id: 'pyq-4',
    subject: 'Engineering Mathematics I',
    code: 'MATH101',
    semester: 'Semester 1',
    year: '2024',
    type: 'End-Semester University Exam',
    downloads: 1850,
    hasSolutions: true,
    fileSize: '4.2 MB'
  },
  {
    id: 'pyq-5',
    subject: 'Artificial Intelligence & ML',
    code: 'CS601',
    semester: 'Semester 6',
    year: '2023',
    type: 'Model Test Paper with Solved Keys',
    downloads: 1650,
    hasSolutions: true,
    fileSize: '2.9 MB'
  }
];

/* -------------------------------------------------------------------------
   4. PRACTICAL LABORATORY MANUALS & CODE SOLUTIONS
   Add new lab experiments, programs, or viva question banks here.
   ------------------------------------------------------------------------- */
export const initialLabManuals = [
  {
    id: 'lab-beee',
    title: 'Basic Electrical & Electronics Lab Manual & Circuit Theorems',
    subject: 'BEEE Laboratory (EE102)',
    semester: 'Semester 1',
    experimentsCount: '16 Experiments',
    includesViva: true,
    fileSize: '6.4 MB'
  },
  {
    id: 'lab-1',
    title: 'Data Structures Lab Manual & Verified Code Solutions',
    subject: 'Data Structures (CS301)',
    semester: 'Semester 3',
    experimentsCount: '14 Programs',
    includesViva: true,
    fileSize: '5.6 MB'
  },
  {
    id: 'lab-2',
    title: 'Operating Systems System Calls & Shell Scripting Manual',
    subject: 'Operating Systems (CS401)',
    semester: 'Semester 4',
    experimentsCount: '12 Experiments',
    includesViva: true,
    fileSize: '4.8 MB'
  },
  {
    id: 'lab-3',
    title: 'DBMS SQL & PL/SQL Trigger Execution Record',
    subject: 'Database Management (CS402)',
    semester: 'Semester 4',
    experimentsCount: '15 Practicals',
    includesViva: true,
    fileSize: '6.2 MB'
  },
  {
    id: 'lab-4',
    title: 'Computer Networks Packet Tracer Simulation Manual',
    subject: 'Computer Networks (CS501)',
    semester: 'Semester 5',
    experimentsCount: '10 Topologies',
    includesViva: true,
    fileSize: '7.1 MB'
  }
];

/* -------------------------------------------------------------------------
   5. STUDENT PEER FORUM DOUBTS & Q&A THREADS
   Add initial community questions or sample doubts here.
   ------------------------------------------------------------------------- */
export const initialForumDoubts = [
  {
    id: 'f1',
    author: 'Aakash Verma (3rd Year)',
    subject: 'Operating Systems',
    question: 'How to clearly differentiate between Banker\'s Algorithm for Deadlock Avoidance vs Deadlock Detection in university exams?',
    answersCount: 4,
    upvotes: 18,
    date: '2 hours ago',
    bestAnswer: 'Avoidance requires the system to know maximum resource demand a priori and ensures state remains Safe before allocation. Detection runs periodically to identify deadlocks after they occur.'
  },
  {
    id: 'f2',
    author: 'Sneha Roy (2nd Year)',
    subject: 'Data Structures',
    question: 'What is the most repeated AVL Tree rotation problem in Semester 3 papers?',
    answersCount: 6,
    upvotes: 24,
    date: 'Yesterday',
    bestAnswer: 'Double rotations (LR and RL rotations) are asked in almost every 10-mark question. Focus on inserting sequential numbers into an initially empty AVL tree.'
  },
  {
    id: 'f3',
    author: 'Rohan Patil (1st Year)',
    subject: 'Engineering Math I',
    question: 'Are Cayley-Hamilton theorem inverse matrix proofs frequently tested?',
    answersCount: 3,
    upvotes: 15,
    date: '3 days ago',
    bestAnswer: 'Yes! Proving $A^{-1}$ using $A^3 - 4A^2 + 5A - I = 0$ is a guaranteed 7-mark question in Unit 1.'
  }
];
