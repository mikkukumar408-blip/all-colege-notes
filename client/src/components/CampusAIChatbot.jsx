/* =========================================================================
   CAMPUS AI STUDY COPILOT CHATBOT (CampusAIChatbot.jsx)
   =========================================================================
   Modern floating AI Study Assistant with:
   1. Floating launcher with neon pulse & live status
   2. Floating expandable chat window (glassmorphism cyber-luxe theme)
   3. KaTeX mathematical formula rendering & ASCII diagrams
   4. Comprehensive engineering knowledge base (Physics, BEEE, Math, Web, AI)
   5. Direct interactive action links (Open Notes Reader, Download PDFs, Slides)
   6. Suggested quick prompt chips, clear history, and minimize/expand
   ========================================================================= */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  Trash2, 
  Copy, 
  Check, 
  BookOpen, 
  Download, 
  ExternalLink, 
  HelpCircle,
  Zap,
  GraduationCap,
  Layers,
  ChevronDown
} from 'lucide-react';
import katex from 'katex';
import { matchAcademicKB, generateAnalyticalSolution } from '../data/academicKnowledgeBase';

/* -------------------------------------------------------------------------
   MATH & MARKDOWN PARSER FOR CHATBOT MESSAGES
   ------------------------------------------------------------------------- */
function formatChatMessage(text) {
  if (!text) return '';

  // 1. Code / ASCII Diagram blocks
  let processed = text.replace(/```(?:text|ascii|[\w-]*)\n?([\s\S]*?)```/g, (_, code) => {
    return `<pre style="background: rgba(4, 7, 13, 0.95); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 8px; padding: 10px 12px; font-family: 'Consolas', 'Fira Code', monospace; font-size: 0.78rem; line-height: 1.35; color: #00f0ff; overflow-x: auto; white-space: pre; margin: 8px 0; box-shadow: inset 0 0 12px rgba(0,240,255,0.06);">${code.trim()}</pre>`;
  });

  // 2. Display Math: \[ ... \] or $$ ... $$
  processed = processed.replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => {
    try {
      return `<div style="overflow-x: auto; margin: 8px 0; text-align: center;">${katex.renderToString(math.trim(), { throwOnError: false, displayMode: true, strict: false })}</div>`;
    } catch {
      return `<div style="font-family: monospace; color: #00f0ff; margin: 6px 0;">${math}</div>`;
    }
  });

  processed = processed.replace(/\$\$([^\$]+)\$\$/g, (_, math) => {
    try {
      return `<div style="overflow-x: auto; margin: 8px 0; text-align: center;">${katex.renderToString(math.trim(), { throwOnError: false, displayMode: true, strict: false })}</div>`;
    } catch {
      return `<div style="font-family: monospace; color: #00f0ff; margin: 6px 0;">${math}</div>`;
    }
  });

  // 3. Inline Math: \( ... \) or $ ... $
  processed = processed.replace(/\\\(([\s\S]*?)\\\)/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { throwOnError: false, displayMode: false, strict: false });
    } catch {
      return math;
    }
  });

  processed = processed.replace(/\$([^\$]+)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { throwOnError: false, displayMode: false, strict: false });
    } catch {
      return math;
    }
  });

  // 4. Bold and Italics
  processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong style="color: #fff; font-weight: 700;">$1</strong>');
  processed = processed.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em style="color: #cbd5e1;">$1</em>');

  // 5. Line breaks outside <pre>
  const parts = processed.split(/(<pre[\s\S]*?<\/pre>|<div[\s\S]*?<\/div>)/g);
  return parts.map(part => {
    if (part.startsWith('<pre') || part.startsWith('<div')) return part;
    return part.replace(/\n/g, '<br/>');
  }).join('');
}

/* -------------------------------------------------------------------------
   COMPREHENSIVE KNOWLEDGE RESOLVER FOR ENGINEERING SUBJECTS
   ------------------------------------------------------------------------- */
function getAssistantResponse(query, subjects = []) {
  const q = query.toLowerCase().trim();

  // Helper to find subject by query key
  const findSubject = (codeOrId) => {
    return subjects.find(s => 
      s.id.toLowerCase() === codeOrId.toLowerCase() || 
      (s.code && s.code.toLowerCase() === codeOrId.toLowerCase())
    );
  };

  const physicsSub = findSubject('sub-p1') || findSubject('PHYS102');
  const beeeSub = findSubject('sub-beee') || findSubject('BELE-001');
  const mathSub = findSubject('sub-m1') || findSubject('BMAT-001');
  const aimlSub = findSubject('sub-aiml') || findSubject('BCSE-011');
  const webSub = findSubject('sub-webtech') || findSubject('BCSE-012');
  const pythonSub = findSubject('sub-py') || findSubject('BCSE-004') || findSubject('sub-python');
  const dsaSub = findSubject('sub-dsa-bcse007') || findSubject('BCSE-007');

  // =========================================================================
  // 0. NATURAL CONVERSATIONAL GREETINGS & INTENTS
  // =========================================================================
  const cleanQ = q.replace(/[^\w\s]/gi, '').trim();

  // Greetings: "hi", "hello", "hey", etc.
  const greetings = ['hi', 'hello', 'hey', 'heya', 'hola', 'yo', 'sup', 'good morning', 'good afternoon', 'good evening', 'howdy', 'namaste', 'hii', 'hiii', 'hi bot', 'hello bot'];
  if (greetings.includes(cleanQ) || greetings.some(g => cleanQ === g || cleanQ.startsWith(g + ' '))) {
    return {
      text: `Hey Bhavya! 👋 How can I help with your studies today?

Feel free to ask me:
• ⚡ Any formula or derivation (*Newton's rings*, *Schrödinger equation*, *Norton's theorem*)
• 📖 To open any unit in the interactive notes reader
• 📥 To download 12-page Master Notes or 2-page Revision Sheets`,
      actions: [
        { label: "⚡ Newton's Rings formula", type: 'prompt', text: "Explain Newton's Rings formula" },
        { label: "🔬 Schrödinger 1D Box", type: 'prompt', text: "Derive Schrödinger 1D box" },
        { label: "📖 Open Physics Reader", type: 'reader', subject: physicsSub },
        { label: "📥 Download Physics PDF", type: 'download', url: '/Applied_Physics_Master_Notes.pdf' }
      ]
    };
  }

  // Pleasantries / How are you
  if (cleanQ.includes('how are you') || cleanQ.includes('how r u') || cleanQ.includes('how do you do') || cleanQ === 'whats up' || cleanQ === 'sup') {
    return {
      text: `I'm doing great, fully online and ready! 🚀 Which topic or subject are you revising right now?`,
      actions: [
        { label: "📘 Applied Physics", type: 'reader', subject: physicsSub },
        { label: "⚡ BEEE Theorems", type: 'reader', subject: beeeSub },
        { label: "📐 Engineering Math", type: 'reader', subject: mathSub }
      ]
    };
  }

  // Identity / Capabilities / Help
  if (cleanQ.includes('who are you') || cleanQ.includes('what are you') || cleanQ.includes('your name') || cleanQ === 'help' || cleanQ.includes('what can you do')) {
    return {
      text: `I'm your **Campus AI Study Copilot**! 🤖

I'm built right into your notes portal to help you:
• 📐 **Explain Derivations & Formulas**: Step-by-step mathematical proofs with KaTeX
• 📚 **Direct You to Notes & PDFs**: Master Notes (12 pages) & Exam Revision Sheets (2 pages)
• 💡 **Exam Preparation Advice**: High-yield university questions & scoring tips
• 📊 **16:9 Presentation Slides**: Fullscreen visual slide decks via DeepSearch

What subject would you like to explore?`,
      actions: [
        { label: "📖 Applied Physics Reader", type: 'reader', subject: physicsSub },
        { label: "⚡ Short Notes Hub", type: 'navigate', tab: 'short-notes' },
        { label: "📥 Download Center", type: 'navigate', tab: 'downloads-lab' }
      ]
    };
  }

  // Gratitude / Polite closures
  if (cleanQ.includes('thank') || cleanQ === 'thx' || cleanQ === 'thanks' || cleanQ.includes('thank you') || cleanQ === 'awesome' || cleanQ === 'great' || cleanQ === 'perfect' || cleanQ === 'cool' || cleanQ === 'ok' || cleanQ === 'okay' || cleanQ === 'got it') {
    return {
      text: `You're very welcome! 😊 Keep up the great prep, and let me know whenever you need another formula or derivation!`,
      actions: []
    };
  }

  // Farewells
  if (cleanQ === 'bye' || cleanQ === 'goodbye' || cleanQ === 'cya' || cleanQ === 'see you' || cleanQ.includes('good night') || cleanQ === 'gn') {
    return {
      text: `Goodbye and happy studying! 🎓 Feel free to tap me anytime you have another question.`,
      actions: []
    };
  }

  // Short single-subject triggers: "physics"
  if (cleanQ === 'physics' || cleanQ === 'applied physics' || cleanQ === 'bphy001' || cleanQ === 'phys102') {
    return {
      text: `📘 **Applied Physics (PHYS102 / BPHY-001)**
Here is what's available for Applied Physics:
• **Unit 1**: Wave Optics, Newton's Rings & Lasers
• **Unit 2**: Electrostatics, Magnetostatics & Maxwell's Equations
• **Unit 3**: Quantum Mechanics & 1D Schrödinger Infinite Well
• **Unit 4**: Crystal Structures (SC, BCC, FCC) & Free Electron Theory

Both the **12-Page Master Notes** and **2-Page Rapid Revision Sheet** are ready!`,
      actions: [
        { label: '📖 Open Physics Reader', type: 'reader', subject: physicsSub },
        { label: '📥 Download 12-Page Master PDF', type: 'download', url: '/Applied_Physics_Master_Notes.pdf' },
        { label: '⚡ Download 2-Page Revision Sheet', type: 'download', url: '/Applied_Physics_Exam_Revision_Sheet.pdf' }
      ]
    };
  }

  // Short single-subject trigger: "beee"
  if (cleanQ === 'beee' || cleanQ === 'basic electrical' || cleanQ === 'ee101' || cleanQ === 'bele001') {
    return {
      text: `⚡ **Basic Electrical & Electronics Engineering (BEEE)**
Covering:
• **Unit 1**: DC Circuits & Network Theorems (Thevenin, Norton, Superposition)
• **Unit 2**: Transformers & Electrical Machines
• **Unit 3**: Semiconductor Devices, Diodes & BJTs
• **Unit 4**: Number Systems & Boolean Algebra`,
      actions: [
        { label: '📖 Open BEEE Reader', type: 'reader', subject: beeeSub },
        { label: '⚡ Thevenin Lab Simulator', type: 'navigate', tab: 'notes-reader' }
      ]
    };
  }

  // Short single-subject trigger: "math"
  if (cleanQ === 'math' || cleanQ === 'maths' || cleanQ === 'mathematics' || cleanQ === 'bmat001' || cleanQ === 'math101') {
    return {
      text: `📐 **Engineering Mathematics I (BMAT-001)**
Covering:
• **Unit 1**: Matrices, Cayley-Hamilton & Gauss-Jordan Inversion
• **Unit 2**: Calculus, Curvature & Beta-Gamma Functions
• **Unit 3**: Multivariable Calculus & Vector Differentiation
• **Unit 4**: Sequences, Series & Fourier Series`,
      actions: [
        { label: '📖 Open Math Reader', type: 'reader', subject: mathSub },
        { label: '📥 Download Math PDF', type: 'navigate', tab: 'downloads-lab' }
      ]
    };
  }

  // Short single-subject trigger: "python"
  if (cleanQ === 'python' || cleanQ === 'py' || cleanQ === 'bcse004' || cleanQ === 'bcse 004' || cleanQ === 'python programming') {
    return {
      text: `🐍 **Python Programming (BCSE-004)**
Official MMDU B.Tech 2nd Semester Curriculum:
• **Unit 1**: Introduction to Programming, CPython Architecture, PVM, Reference Model, Tokens, Indentation & 9-Tier Operators
• **Unit 2**: Decision Making, Branching, Loops (\`for-else\`, \`break\`, \`continue\`), Functions, \`*args\`/\`**kwargs\`, LEGB Scope & Lambda
• **Unit 3**: Data Structures (Lists, Tuples, Dictionaries), Shallow vs Deep Copy, Hash Table Buckets & Comprehensions
• **Unit 4**: File Handling (9 modes, Context Managers \`with\`, \`seek\`/\`tell\`) & OOP (Classes, Dunder methods, Operator Overloading, MRO & C3 Linearization)`,
      actions: [
        { label: '📖 Open Python Reader', type: 'reader', subject: pythonSub },
        { label: '📥 Download 12-Page Master Notes', type: 'download', url: '/Python_Programming_Master_Notes.pdf' },
        { label: '⚡ 2-Page Flowchart Revision Sheet', type: 'download', url: '/Python_Programming_Exam_Revision_Sheet.pdf' }
      ]
    };
  }

  // Short single-subject trigger: "dsa" / "data structure"
  if (cleanQ === 'dsa' || cleanQ === 'data structure' || cleanQ === 'data structures' || cleanQ === 'bcse007' || cleanQ === 'bcse 007') {
    return {
      text: `🌳 **Data Structure (BCSE-007)**
Official MMDU B.Tech 2nd Semester Curriculum:
• **Unit 1**: Asymptotic Notations (O, Ω, Θ), Order of Growth, 1D/2D/3D Array Memory Addressing, Sparse Matrix Triplet Representation, Searching (Linear, Binary) & Sorting (Bubble, Selection, Insertion, Merge, Quick, Heap, Radix)
• **Unit 2**: Stack ADT (LIFO), Primitive Push/Pop/Peek Operations, Infix to Postfix/Prefix (Shunting-Yard), Postfix Evaluation, Recursion Activation Records & Tower of Hanoi (2ⁿ - 1 moves)
• **Unit 3**: Queue ADT (FIFO), Linear Queue False Overflow, Circular Queue Modulo Arithmetic, Deque, Priority Queue & Linked Lists (Singly, Doubly, Circular, Header List) with Pointer Rewiring
• **Unit 4**: Trees Terminology, Binary Trees Properties, Binary Search Trees (BST Search, Insert, 3-Case Deletion), Traversals (Inorder, Preorder, Postorder), Graph Representations (Matrix vs List) & BFS/DFS Traversals`,
      actions: [
        { label: '📖 Open Data Structure Reader', type: 'reader', subject: dsaSub },
        { label: '📥 Download 12-Page Master Notes', type: 'download', url: '/Data_Structures_Master_Notes.pdf' },
        { label: '⚡ 2-Page Flowchart Revision Sheet', type: 'download', url: '/Data_Structures_Exam_Revision_Sheet.pdf' }
      ]
    };
  }

  // DSA: Array Addressing & Sparse Matrices
  if ((q.includes('array') && (q.includes('address') || q.includes('row major') || q.includes('column major') || q.includes('3d'))) || q.includes('sparse matrix')) {
    return {
      text: `📌 **Array Memory Addressing & Sparse Matrix Triplet Representation**

⚡ **1D Array:**
\`Loc(A[i]) = B + (i - L) * W\`

⚡ **2D Array Row-Major Order (RMO):**
\`Loc(A[i][j]) = B + [(i - L1) * N + (j - L2)] * W\`
*(N = Total columns = U2 - L2 + 1)*

⚡ **2D Array Column-Major Order (CMO):**
\`Loc(A[i][j]) = B + [(j - L2) * M + (i - L1)] * W\`
*(M = Total rows = U1 - L1 + 1)*

⚡ **Sparse Matrix Triplet (Coordinate List):**
Matrix having ≥70% zero elements. Stored in (K+1) × 3 table where Row 0 is \`[Total_Rows, Total_Cols, NonZeros]\`, reducing storage from O(M*N) to O(K).`,
      actions: [
        { label: '📖 Read Unit 1 in DSA Reader', type: 'reader', subject: dsaSub },
        { label: '📥 Download DSA Master Notes', type: 'download', url: '/Data_Structures_Master_Notes.pdf' },
        { label: '⚡ 2-Page Revision Sheet', type: 'download', url: '/Data_Structures_Exam_Revision_Sheet.pdf' }
      ]
    };
  }

  // DSA: Tower of Hanoi & Infix/Postfix
  if (q.includes('hanoi') || q.includes('shunting yard') || q.includes('infix to postfix') || q.includes('postfix evaluation')) {
    return {
      text: `📌 **Tower of Hanoi & Stack Expression Conversion**

⚡ **Tower of Hanoi:**
- Move n disks from Source (S) to Destination (D) using Auxiliary (A).
- Recurrence: \`T(n) = 2*T(n-1) + 1\`, with \`T(1) = 1\`
- Solution: \`T(n) = 2ⁿ - 1 moves\`, Time Complexity: \`O(2ⁿ)\`.

⚡ **Infix to Postfix (Shunting-Yard):**
- Operands go directly to output.
- Left parenthesis '(' pushed to operator stack; right parenthesis ')' pops to output until '('.
- Operators pop higher/equal precedence operators from stack before pushing incoming operator.

⚡ **Postfix Evaluation:**
- Operands pushed to stack.
- On operator: \`op2 = pop()\`, \`op1 = pop()\`, compute \`op1 [op] op2\`, push result. First popped item is always operand 2!`,
      actions: [
        { label: '📖 Read Unit 2 in DSA Reader', type: 'reader', subject: dsaSub },
        { label: '📥 Download DSA Master Notes', type: 'download', url: '/Data_Structures_Master_Notes.pdf' },
        { label: '⚡ 2-Page Revision Sheet', type: 'download', url: '/Data_Structures_Exam_Revision_Sheet.pdf' }
      ]
    };
  }

  // DSA: Circular Queue, BST & Graphs
  if (q.includes('circular queue') || q.includes('bst') || (q.includes('binary search tree') && q.includes('delet')) || (q.includes('bfs') && q.includes('dfs'))) {
    return {
      text: `📌 **Circular Queue Modulo Math, BST Deletion & Graph Search**

⚡ **Circular Queue Modulo Arithmetic:**
- Full condition: \`(rear + 1) % MAX == front\`
- Enqueue: \`rear = (rear + 1) % MAX; queue[rear] = val;\`
- Dequeue: \`val = queue[front]; front = (front + 1) % MAX;\`

⚡ **BST 3-Case Deletion:**
1. **Leaf node:** Set parent link to NULL, free node.
2. **One child:** Bypass node directly to child.
3. **Two children:** Replace with **Inorder Successor** (minimum node of right subtree), then delete successor recursively.

⚡ **BFS vs DFS:**
- **BFS (Breadth-First):** Uses FIFO Queue. Level-order exploration. Finds shortest path in unweighted graphs. Time: O(V + E).
- **DFS (Depth-First):** Uses LIFO Stack / recursion. Cycle detection, topological sort. Time: O(V + E).`,
      actions: [
        { label: '📖 Read Units 3 & 4 in DSA Reader', type: 'reader', subject: dsaSub },
        { label: '📥 Download DSA Master Notes', type: 'download', url: '/Data_Structures_Master_Notes.pdf' },
        { label: '⚡ 2-Page Revision Sheet', type: 'download', url: '/Data_Structures_Exam_Revision_Sheet.pdf' }
      ]
    };
  }

  // PYTHON: CPython, PVM, Bytecode & Reference Model
  if (q.includes('cpython') || q.includes('pvm') || (q.includes('bytecode') && q.includes('python')) || q.includes('reference model') || (q.includes('mutable') && q.includes('immutable') && q.includes('python'))) {
    return {
      text: `📌 **CPython Architecture, Bytecode & Memory Reference Model**

⚡ **CPython 2-Tier Execution Pipeline:**
1. **Source Code (\`.py\`)** &rarr; Parsed by CPython Compiler into AST.
2. **Bytecode (\`.pyc\`)** &rarr; Stored in \`__pycache__/\` as stack-oriented virtual instructions.
3. **Python Virtual Machine (PVM)** &rarr; Runtime loop converting bytecode to native OS system calls.

⚡ **C "Box Model" vs Python "Object Reference Model":**
• **C / C++:** \`int x = 10;\` allocates a named 4-byte memory box at \`&x\`. Writing \`x = 20;\` overwrites the contents of the box.
• **Python:** \`x = 10\` creates an **integer object** \`10\` in heap memory (\`PyObject\` with type \`int\`, value \`10\`, and \`ref_count=1\`). \`x\` is purely a **pointer/reference binding**. Writing \`x = 20\` binds \`x\` to a brand new object \`20\`!

⚡ **Mutable vs Immutable Types:**
• **Immutable (Cannot be altered in-place):** \`int\`, \`float\`, \`str\`, \`tuple\`, \`frozenset\`, \`bool\`.
• **Mutable (Altered in-place, same \`id()\`)**: \`list\`, \`dict\`, \`set\`, \`bytearray\`.`,
      actions: [
        { label: '📖 Read Unit 1 in Python Reader', type: 'reader', subject: pythonSub },
        { label: '📥 Download Master Notes PDF', type: 'download', url: '/Python_Programming_Master_Notes.pdf' },
        { label: '⚡ 2-Page Revision Sheet', type: 'download', url: '/Python_Programming_Exam_Revision_Sheet.pdf' }
      ]
    };
  }

  // PYTHON: Lists, Tuples, Dicts, Hash Tables & Copies
  if ((q.includes('list') && q.includes('tuple')) || q.includes('shallow copy') || q.includes('deep copy') || (q.includes('dict') && q.includes('hash')) || q.includes('hash table') || (q.includes('comprehension') && q.includes('python'))) {
    return {
      text: `📌 **Python Data Types: Lists, Tuples, Dictionaries & Hash Tables**

⚡ **Lists vs Tuples vs Dictionaries:**
| Property | List (\`[]\`) | Tuple (\`()\`) | Dictionary (\`{}\`) |
| :--- | :--- | :--- | :--- |
| **Mutability** | Mutable (\`append\`, \`pop\`) | **Immutable** | Keys: Immutable; Values: Mutable |
| **Indexing** | Integer (\`0, 1, ...\`) | Integer (\`0, 1, ...\`) | **Hashable Key** (\`dict[key]\`) |
| **Lookup Time** | $O(n)$ search | $O(n)$ search | **Average $O(1)$** via Hash Table |
| **Overhead** | Over-allocates dynamic array | Compact fixed array | Sparse hash table array |

⚡ **Shallow Copy (\`copy.copy\`) vs Deep Copy (\`copy.deepcopy\`):**
• **Shallow Copy:** Constructs a new compound object and inserts *references* to the original children. Modifying nested mutable objects affects **both** copies!
• **Deep Copy:** Recursively constructs new objects and duplicates all nested children. Completely independent memory trees.

⚡ **Dictionary Hash Table Internals:**
1. Calls \`hash(key)\` and maps to array index: \`idx = hash(key) % capacity\`.
2. Resolves collisions using perturbation open addressing or bucket chaining.
3. Every key must be **hashable** (must implement \`__hash__\` and \`__eq__\`). Hence lists cannot be dictionary keys!`,
      actions: [
        { label: '📖 Read Unit 3 in Python Reader', type: 'reader', subject: pythonSub },
        { label: '📥 Download Python Master Notes', type: 'download', url: '/Python_Programming_Master_Notes.pdf' },
        { label: '⚡ 2-Page Revision Sheet', type: 'download', url: '/Python_Programming_Exam_Revision_Sheet.pdf' }
      ]
    };
  }

  // PYTHON: OOP, MRO & C3 Linearization, Dunder Methods
  if (q.includes('mro') || (q.includes('c3') && q.includes('linearization')) || q.includes('dunder') || q.includes('magic method') || (q.includes('operator overloading') && q.includes('python')) || (q.includes('inheritance') && q.includes('python'))) {
    return {
      text: `📌 **Python OOP, Dunder Methods & C3 Linearization (MRO)**

⚡ **C3 Linearization Algorithm for Method Resolution Order (MRO):**
The MRO of class $C$ inheriting from parents $B_1, B_2, \\dots, B_n$ is:
$$L[C] = [C] + \\text{merge}(L[B_1], L[B_2], \\dots, L[B_n], [B_1, B_2, \\dots, B_n])$$
• **Merge Rule:** Pick the head of the first list whose head does **not** appear in the tail of any other list. Append to result and remove from all lists. Repeat until all lists are exhausted.

⚡ **Essential Dunder (Magic) Methods:**
• **Object Lifecycle:** \`__new__(cls)\` (creates object), \`__init__(self)\` (initializes instance).
• **String Representations:** \`__str__(self)\` (human-friendly), \`__repr__(self)\` (unambiguous developer debug view).
• **Operator Overloading:**
  - Addition (\`+\`): \`__add__(self, other)\`
  - Equality (\`==\`): \`__eq__(self, other)\`
  - Indexing (\`obj[k]\`): \`__getitem__(self, key)\`
• **Context Managers:** \`__enter__(self)\` and \`__exit__(self, exc_type, exc_val, exc_tb)\`.`,
      actions: [
        { label: '📖 Read Unit 4 in Python Reader', type: 'reader', subject: pythonSub },
        { label: '📥 Download Python Master Notes', type: 'download', url: '/Python_Programming_Master_Notes.pdf' },
        { label: '⚡ 2-Page Revision Sheet', type: 'download', url: '/Python_Programming_Exam_Revision_Sheet.pdf' }
      ]
    };
  }

  // PYTHON: File Handling, Modes & Context Managers
  if ((q.includes('file') && (q.includes('python') || q.includes('seek') || q.includes('tell') || (q.includes('mode') && q.includes('read')))) || q.includes('context manager') || q.includes('with statement')) {
    return {
      text: `📌 **Python File Handling & Context Managers**

⚡ **File Access Modes Matrix:**
| Mode | Meaning | File Must Exist? | Pointer Starts At | Overwrites or Preserves? |
| :---: | :--- | :---: | :---: | :--- |
| \`'r'\` | Read only (Default) | **Yes** (Raises \`FileNotFoundError\`) | Beginning (\`0\`) | Preserves (read-only) |
| \`'w'\` | Write only | No (Creates if absent) | Beginning (\`0\`) | **Truncates (overwrites)** |
| \`'a'\` | Append only | No (Creates if absent) | End of file | **Preserves existing data** |
| \`'r+'\`| Read + Write | **Yes** | Beginning (\`0\`) | Overwrites characters in-place |
| \`'w+'\`| Write + Read | No | Beginning (\`0\`) | **Truncates to 0 bytes** |
| \`'a+'\`| Append + Read | No | End (Writes at end) | Preserves existing data |

⚡ **The \`with\` Context Manager Protocol:**
\`\`\`python
with open('data.txt', 'r') as f:
    content = f.read()
# Automatically invokes f.__exit__() even if an exception occurs!
\`\`\`

⚡ **Cursor Navigation (\`seek\` and \`tell\`):**
• \`f.tell()\` &rarr; Returns integer byte position of current file pointer.
• \`f.seek(offset, whence)\`:
  - \`whence = 0\` (Default): Absolute offset from start of file.
  - \`whence = 1\`: Relative to current cursor position (binary files \`'rb'\`).
  - \`whence = 2\`: Relative to end of file.`,
      actions: [
        { label: '📖 Read Unit 4 in Python Reader', type: 'reader', subject: pythonSub },
        { label: '📥 Download Python Master Notes', type: 'download', url: '/Python_Programming_Master_Notes.pdf' },
        { label: '⚡ 2-Page Revision Sheet', type: 'download', url: '/Python_Programming_Exam_Revision_Sheet.pdf' }
      ]
    };
  }

  // 1. APPLIED PHYSICS: Newton's Rings
  if (q.includes('newton') || (q.includes('ring') && (q.includes('diameter') || q.includes('physics')))) {
    return {
      text: `📌 **Newton's Rings: Derivation & Formulas**
Newton's rings are interference fringes formed by division of amplitude when a plano-convex lens of large radius $R$ is placed on an optically flat glass plate.

⚡ **Key Diameters Derivation:**
• **Dark Rings (Destructive Interference):**
$$2t + \\frac{\\lambda}{2} = (2n + 1)\\frac{\\lambda}{2} \\implies 2t = n\\lambda$$
Since $t \\approx \\frac{r_n^2}{2R} = \\frac{D_n^2}{8R}$, we obtain:
$$D_n^2 = 4nR\\lambda \\iff D_n = 2\\sqrt{nR\\lambda} \\propto \\sqrt{n}$$
*(Dark rings have diameters proportional to square roots of natural numbers)*

• **Bright Rings (Constructive Interference):**
$$D_n = \\sqrt{2(2n-1)R\\lambda} \\propto \\sqrt{2n - 1}$$

• **Wavelength Calculation:**
$$\\lambda = \\frac{D_{n+p}^2 - D_n^2}{4pR}$$

• **Refractive Index of Liquid:**
$$\\mu = \\frac{(D_{n+p}^2 - D_n^2)_{\\text{air}}}{(D_{n+p}^2 - D_n^2)_{\\text{liquid}}}$$

💡 **Exam Tip:** Center spot is always **dark in reflected light** because at $t=0$, path difference $\\Delta = \\lambda/2$ due to Stokes' phase reversal upon reflection at the glass plate!`,
      actions: [
        { label: '📖 Open Applied Physics Reader', type: 'reader', subject: physicsSub },
        { label: '📥 Download Physics Master Notes (12 Pages)', type: 'download', url: '/Applied_Physics_Master_Notes.pdf' },
        { label: '⚡ Download 2-Page Exam Revision Sheet', type: 'download', url: '/Applied_Physics_Exam_Revision_Sheet.pdf' },
        { label: '📊 View 16:9 Slides', type: 'slides', query: "Newton's Rings Derivation" }
      ]
    };
  }

  // 2. APPLIED PHYSICS: Schrödinger Equation & Quantum Mechanics
  if (q.includes('schrodinger') || q.includes('schrödinger') || (q.includes('particle') && q.includes('box')) || q.includes('infinite well') || q.includes('quantum')) {
    return {
      text: `📌 **Schrödinger Equation & Particle in 1D Infinite Well**

⚡ **1D Time-Independent Schrödinger Equation (TISE):**
$$-\\frac{\\hbar^2}{2m}\\frac{d^2\\psi(x)}{dx^2} + V(x)\\psi(x) = E\\psi(x)$$

⚡ **Particle in a 1D Box of Width $L$ ($V(x)=0$ for $0 \\le x \\le L$, $\\infty$ elsewhere):**
1. Boundary conditions: $\\psi(0) = 0$ and $\\psi(L) = 0$.
2. **Normalized Eigenfunctions:**
$$\\psi_n(x) = \\sqrt{\\frac{2}{L}} \\sin\\left(\\frac{n\\pi x}{L}\\right) \\quad (n = 1, 2, 3, \\dots)$$
3. **Quantized Energy Eigenvalues:**
$$E_n = \\frac{n^2 h^2}{8mL^2} = \\frac{n^2 \\pi^2 \\hbar^2}{2mL^2}$$
4. **Zero-Point Energy ($n=1$):**
$$E_1 = \\frac{h^2}{8mL^2} > 0$$
*(Consistent with Heisenberg's Uncertainty Principle: a confined particle can never be completely at rest!)*

💡 **Exam Tip:** Sketch both $\\psi_n(x)$ (wavefunction) and $|\\psi_n(x)|^2$ (probability density) for $n=1, 2, 3$. The number of nodes inside the box is $(n - 1)$.`,
      actions: [
        { label: '📖 Read Unit 3 in Physics Reader', type: 'reader', subject: physicsSub },
        { label: '📥 Download Physics Master Notes PDF', type: 'download', url: '/Applied_Physics_Master_Notes.pdf' },
        { label: '📊 View 16:9 Slides', type: 'slides', query: 'Schrödinger Equation 1D Infinite Well' }
      ]
    };
  }

  // 3. APPLIED PHYSICS: Maxwell's Equations, Skin Depth & Displacement Current
  if (q.includes('maxwell') || q.includes('displacement current') || q.includes('skin depth') || q.includes('poynting') || q.includes('em waves')) {
    return {
      text: `📌 **Maxwell's Equations & Electromagnetic Waves**

⚡ **4 Fundamental Maxwell's Equations (Differential Form):**
1. **Gauss's Law for Electrostatics:** $\\nabla \\cdot \\vec{E} = \\frac{\\rho}{\\varepsilon_0}$
2. **Gauss's Law for Magnetism:** $\\nabla \\cdot \\vec{B} = 0$ *(No magnetic monopoles)*
3. **Faraday's Law of Induction:** $\\nabla \\times \\vec{E} = -\\frac{\\partial\\vec{B}}{\\partial t}$
4. **Ampere-Maxwell Law:** $\\nabla \\times \\vec{B} = \\mu_0 \\vec{J} + \\mu_0\\varepsilon_0 \\frac{\\partial\\vec{E}}{\\partial t}$

⚡ **Displacement Current Density:**
$$\\vec{J}_d = \\frac{\\partial\\vec{D}}{\\partial t} = \\varepsilon_0 \\frac{\\partial\\vec{E}}{\\partial t}$$
*(Needed to resolve contradiction between Ampere's law and charge continuity $\\nabla \\cdot \\vec{J} + \\partial\\rho/\\partial t = 0$)*

⚡ **Skin Depth in Good Conductors:**
$$\\delta = \\sqrt{\\frac{2}{\\omega \\mu \\sigma}} = \\frac{1}{\\sqrt{\\pi f \\mu \\sigma}}$$
*(Distance over which field amplitude decays to $1/e \\approx 36.8\\%$ of surface value)*

⚡ **Poynting Vector (Energy Flux):**
$$\\vec{S} = \\vec{E} \\times \\vec{H} \\quad (\\text{W/m}^2)$$`,
      actions: [
        { label: '📖 Read Unit 2 in Physics Reader', type: 'reader', subject: physicsSub },
        { label: '📥 Download Physics Notes', type: 'download', url: '/Applied_Physics_Master_Notes.pdf' },
        { label: '📊 View 16:9 Slides', type: 'slides', query: "Maxwell's Equations and Skin Depth" }
      ]
    };
  }

  // 4. APPLIED PHYSICS: Crystal Structures & Free Electron Theory
  if (q.includes('crystal') || q.includes('bcc') || q.includes('fcc') || q.includes('apf') || q.includes('fermi') || q.includes('schottky') || q.includes('frenkel')) {
    return {
      text: `📌 **Cubic Crystal Structures & Solid State Physics**

⚡ **Cubic Unit Cells Comparative Matrix:**
| Metric | Simple Cubic (SC) | Body-Centered (BCC) | Face-Centered (FCC) |
| :--- | :---: | :---: | :---: |
| **Effective Atoms ($n_{\\text{eff}}$)** | 1 | 2 | 4 |
| **Coordination No. ($CN$)** | 6 | 8 | 12 |
| **Atomic Radius ($r$)** | $a/2$ | $\\frac{\\sqrt{3}}{4}a$ | $\\frac{\\sqrt{2}}{4}a$ |
| **Atomic Packing Factor (APF)** | **52.4%** | **68.0%** | **74.0%** |

⚡ **Schottky vs Frenkel Defects:**
• **Schottky Defect:** Equal number of cations and anions missing. Density decreases. Favored when cation/anion radii are comparable (e.g., $\\text{NaCl}, \\text{KCl}$).
• **Frenkel Defect:** Smaller ion (usually cation) dislocated into an interstitial void. Density remains unchanged. (e.g., $\\text{AgCl}, \\text{ZnS}$).
• **Special Case:** $\\text{AgBr}$ exhibits **both** Schottky and Frenkel defects!

⚡ **Fermi-Dirac Distribution:**
$$f(E) = \\frac{1}{e^{(E - E_F)/k_B T} + 1}$$
At absolute zero ($T=0\\text{ K}$), $f(E)=1$ for $E < E_F$ and $0$ for $E > E_F$. At $E=E_F$ for any $T>0$, $f(E_F) = 0.5$.`,
      actions: [
        { label: '📖 Read Unit 4 in Physics Reader', type: 'reader', subject: physicsSub },
        { label: '📥 Download Master Notes PDF', type: 'download', url: '/Applied_Physics_Master_Notes.pdf' },
        { label: '⚡ 2-Page Revision Sheet', type: 'download', url: '/Applied_Physics_Exam_Revision_Sheet.pdf' }
      ]
    };
  }

  // 5. APPLIED PHYSICS: Lasers & Diffraction
  if (q.includes('laser') || q.includes('einstein') || q.includes('ruby') || q.includes('he-ne') || q.includes('diffraction') || q.includes('grating')) {
    return {
      text: `📌 **Lasers & Diffraction Grating Formulas**

⚡ **Einstein Coefficients & Relations:**
$$B_{12} = B_{21} \\quad \\text{and} \\quad \\frac{A_{21}}{B_{21}} = \\frac{8\\pi h\\nu^3}{c^3}$$
• **3 Conditions for Laser Action:** (1) Population inversion ($N_2 > N_1$), (2) Metastable energy state, (3) Optical feedback resonator cavity.
• **Ruby Laser:** 3-level solid state, pulsed operation at $694.3\\text{ nm}$ (red).
• **He-Ne Laser:** 4-level gas laser, continuous wave (CW) operation at $632.8\\text{ nm}$ (resonant collision transfer $\\text{He}(2^1S) \\to \\text{Ne}(3s)$).

⚡ **Fraunhofer Diffraction & Grating:**
• **Single slit minima:** $a \\sin\\theta = \\pm m\\lambda$
• **Diffraction Grating Equation:** $(a + b)\\sin\\theta = n\\lambda$
• **Resolving Power of Grating:**
$$R = \\frac{\\lambda}{d\\lambda} = n \\cdot N$$
*(where $n$ is diffraction order and $N$ is total number of illuminated grating lines)*`,
      actions: [
        { label: '📖 Open Physics Notes Reader', type: 'reader', subject: physicsSub },
        { label: '📥 Download Master Notes PDF', type: 'download', url: '/Applied_Physics_Master_Notes.pdf' }
      ]
    };
  }

  // 6. BEEE: Thevenin, Norton, Superposition, Circuits
  if (q.includes('thevenin') || q.includes('norton') || q.includes('superposition') || q.includes('kcl') || q.includes('kvl') || q.includes('beee')) {
    const kbEntry = matchAcademicKB(query, 'BEEE');
    if (kbEntry) {
      return {
        text: kbEntry.content,
        actions: [
          { label: '📖 Open BEEE Notes Reader', type: 'reader', subject: beeeSub },
          { label: '⚡ Open Thevenin Lab', type: 'navigate', tab: 'notes-reader' },
          { label: '📊 View 16:9 Slides', type: 'slides', query: kbEntry.title }
        ]
      };
    }
    return {
      text: `📌 **BEEE Network Theorems Overview**

⚡ **Thevenin's Theorem:** Any linear active two-terminal bilateral network can be replaced by an equivalent voltage source $V_{th}$ in series with $R_{th}$.
$$I_L = \\frac{V_{th}}{R_{th} + R_L}$$

⚡ **Norton's Theorem (Dual of Thevenin):** Any linear active network can be replaced by an equivalent current source $I_N$ in parallel with $R_N$ ($R_N = R_{th}$, $I_N = V_{th}/R_{th}$).
$$I_L = I_N \\cdot \\left(\\frac{R_N}{R_N + R_L}\\right)$$

⚡ **Maximum Power Transfer Theorem:**
$$R_L = R_{th} \\implies P_{\\max} = \\frac{V_{th}^2}{4R_{th}} \\quad (\\eta = 50\\%)$$`,
      actions: [
        { label: '📖 Open BEEE Notes Reader', type: 'reader', subject: beeeSub },
        { label: '📥 Download BEEE Notes', type: 'navigate', tab: 'downloads-lab' }
      ]
    };
  }

  // 7. MATHEMATICS: Cayley-Hamilton, Eigenvalues, Taylor Series
  if (q.includes('cayley') || q.includes('eigen') || q.includes('taylor') || q.includes('math') || q.includes('matrix') || q.includes('euler')) {
    return {
      text: `📌 **Engineering Mathematics Key Theorems**

⚡ **Cayley-Hamilton Theorem:**
Every square matrix $A$ satisfies its own characteristic polynomial:
$$\\det(A - \\lambda I) = 0 \\implies A^n + c_{n-1}A^{n-1} + \\dots + c_1 A + c_0 I = 0$$
• **Matrix Inversion:** Multiplying by $A^{-1}$:
$$A^{-1} = -\\frac{1}{c_0}\\left(A^{n-1} + c_{n-1}A^{n-2} + \\dots + c_1 I\\right)$$

⚡ **Euler's Theorem for Homogeneous Functions:**
If $u(x, y)$ is a homogeneous function of degree $n$:
$$x\\frac{\\partial u}{\\partial x} + y\\frac{\\partial u}{\\partial y} = n \\cdot u$$

⚡ **Taylor Series in One Variable:**
$$f(x) = f(a) + (x - a)f'(a) + \\frac{(x - a)^2}{2!}f''(a) + \\dots + \\frac{(x - a)^n}{n!}f^{(n)}(a) + \\dots$$`,
      actions: [
        { label: '📖 Open Mathematics Notes', type: 'reader', subject: mathSub },
        { label: '📥 Download Math 1 PDF', type: 'navigate', tab: 'downloads-lab' }
      ]
    };
  }

  // 8. EXAM PREPARATION & NOTES GUIDANCE
  if (q.includes('exam') || q.includes('tip') || q.includes('score') || q.includes('revision') || q.includes('difference') || q.includes('notes')) {
    return {
      text: `📌 **University Examination High-Score Blueprint & Notes Guide**

💡 **Difference Between Master Notes & Revision Sheets:**
• **Master Notes (12 Pages):** Comprehensive textbook-replacement covering every single derivation, physical assumption, step-by-step calculus, 12-point comparative tables, and university questions.
• **Exam Revision Sheet (2 Pages):** Flowchart-first, high-yield formula matrix, and decision trees designed specifically for 5–10 minute quick cramming before entering the exam hall!

⚡ **Top 4 Exam Scoring Rules:**
1. **State Governing Laws First:** Always write the fundamental theorem or Maxwell/Newton/Thevenin formula at the start before substituting numbers.
2. **Draw Labeled Diagrams:** Examiners award partial marks for neat circuit diagrams and wave optics sketches even if an arithmetic step fails.
3. **Include Units & Assumptions:** Never write an answer without proper SI units (e.g., $\\text{W/m}^2$, $\\text{nm}$, $\\Omega$).
4. **Highlight Final Boxed Answers:** Enclose final derivations and numerical results in a clear box.`,
      actions: [
        { label: '⚡ Open Short Notes Hub', type: 'navigate', tab: 'short-notes' },
        { label: '📥 Open Downloads Lab', type: 'navigate', tab: 'downloads-lab' },
        { label: '📖 Browse All Subjects', type: 'navigate', tab: 'subjects-notes' }
      ]
    };
  }

  // 9. WEB TECH & AI/ML
  if (q.includes('html') || q.includes('css') || q.includes('react') || q.includes('web') || q.includes('ml') || q.includes('ai') || q.includes('learning')) {
    return {
      text: `📌 **Web Technologies & AI/ML Overview**

• **Web Technologies (BCSE-012):** Semantic HTML5, CSS Flexbox/Grid, JavaScript DOM manipulation, ES6 Promises/Async-Await, and React component state management.
• **Artificial Intelligence & Machine Learning (BCSE-011):** PEAS agent framework, state space search ($A^*$, BFS, DFS), Decision Trees (ID3 entropy), Support Vector Machines (SVM), and Neural Networks with backpropagation.

Which subject would you like to explore in detail?`,
      actions: [
        { label: '📖 Open Web Tech Notes', type: 'reader', subject: webSub },
        { label: '📖 Open AI & ML Notes', type: 'reader', subject: aimlSub }
      ]
    };
  }

  // 10. Fallback: Check if query is very short or vague (under 4 words and not clearly academic)
  const words = cleanQ.split(/\s+/).filter(Boolean);
  const isClearlyAcademic = q.includes('derive') || q.includes('formula') || q.includes('law') || q.includes('explain') || q.includes('what is') || q.includes('how does') || q.includes('theorem') || q.includes('equation') || q.includes('solve') || q.includes('calculate');

  if (words.length <= 3 && !isClearlyAcademic) {
    return {
      text: `I'm here to help! Could you specify what topic or question you'd like to explore?

For example, you can ask:
• *"Explain Newton's Rings formula"*
• *"Derive 1D Schrödinger box"*
• *"What is Norton's theorem?"*
• *"Show Applied Physics notes"*`,
      actions: [
        { label: "⚡ Newton's Rings", type: 'prompt', text: "Explain Newton's Rings formula" },
        { label: "🔬 Schrödinger 1D Box", type: 'prompt', text: "Derive Schrödinger 1D box" },
        { label: "🔌 Norton's Theorem", type: 'prompt', text: "Norton's Theorem derivation" },
        { label: "📖 Applied Physics Reader", type: 'reader', subject: physicsSub }
      ]
    };
  }

  // Genuine academic query fallback
  const analyticalText = generateAnalyticalSolution('University Engineering', query);
  return {
    text: analyticalText,
    actions: [
      { label: '📖 Browse Notes Reader', type: 'navigate', tab: 'notes-reader' },
      { label: '📊 View 16:9 Slides', type: 'slides', query: query }
    ]
  };
}

/* =========================================================================
   MAIN COMPONENT: CampusAIChatbot
   ========================================================================= */
export default function CampusAIChatbot({
  onOpenNotesReader,
  onNavigate,
  onOpenDeepSearch,
  subjects = []
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showGreetingBubble, setShowGreetingBubble] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initial Conversation Messages
  const [messages, setMessages] = useState([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `👋 **Hi there! I'm your University AI Study Copilot.**

I can instantly explain tough derivations, formulate KaTeX equations, solve numericals, and direct you to the exact notes for:
• ⚡ **Applied Physics** (Newton's Rings, Schrödinger Eq, Maxwell, Crystals)
• 🔌 **BEEE** (Thevenin, Norton, KVL/KCL, AC Circuits, Resonance)
• 📐 **Engineering Mathematics** (Cayley-Hamilton, Matrices, Taylor Series)
• 💻 **Web Technologies** & 🤖 **AI / ML**

Ask me any academic question or pick a quick prompt below!`,
      timestamp: 'Online'
    }
  ]);

  const quickPrompts = [
    "⚡ Newton's Rings formula",
    "🔬 Schrödinger 1D Box Proof",
    "🔌 Norton's Theorem derivation",
    "📐 Cayley-Hamilton Theorem",
    "📚 Applied Physics Master Notes",
    "💡 Top Exam Scoring Tips"
  ];

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setShowGreetingBubble(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, isMinimized]);

  // Handle Query Submission
  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isTyping) return;

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const response = getAssistantResponse(query, subjects);
      const aiMsg = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        actions: response.actions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyMessage = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: `🧹 *Chat history cleared.* Ask me anything about your university syllabus, formulas, or derivations!`,
        timestamp: 'Online'
      }
    ]);
  };

  const handleActionClick = (action) => {
    if (action.type === 'reader') {
      if (action.subject && onOpenNotesReader) {
        onOpenNotesReader(action.subject);
      } else if (onNavigate) {
        onNavigate('notes-reader');
      }
    } else if (action.type === 'download' && action.url) {
      const link = document.createElement('a');
      link.href = action.url;
      link.download = action.url.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (action.type === 'navigate' && action.tab && onNavigate) {
      onNavigate(action.tab);
    } else if (action.type === 'slides' && onOpenDeepSearch) {
      onOpenDeepSearch(action.query || '');
    } else if (action.type === 'prompt' && action.text) {
      handleSendMessage(action.text);
    }
  };

  return (
    <>
      {/* -------------------------------------------------------------------
          1. FLOATING TRIGGER BUTTON (Bottom-Right)
          ------------------------------------------------------------------- */}
      <div 
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end'
        }}
      >
        {/* Optional Greeting Popover Bubble */}
        {!isOpen && showGreetingBubble && (
          <div 
            style={{
              marginBottom: '12px',
              padding: '10px 14px',
              background: 'rgba(9, 14, 28, 0.95)',
              border: '1px solid rgba(0, 240, 255, 0.4)',
              borderRadius: '14px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px rgba(0, 240, 255, 0.2)',
              backdropFilter: 'blur(12px)',
              maxWidth: '260px',
              color: '#e2e8f0',
              fontSize: '0.82rem',
              lineHeight: 1.4,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              animation: 'fadeIn 0.3s ease',
              cursor: 'pointer'
            }}
            onClick={() => setIsOpen(true)}
          >
            <Sparkles size={16} color="var(--neon-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: '#fff' }}>Campus AI Copilot</strong>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                Ask formulas, derivations, or download physics notes!
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowGreetingBubble(false);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                padding: '0 2px',
                lineHeight: 1
              }}
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Floating AI Robot Circle Button */}
        <button
          onClick={() => {
            if (isOpen && isMinimized) {
              setIsMinimized(false);
            } else {
              setIsOpen(prev => !prev);
            }
          }}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: isOpen 
              ? 'linear-gradient(135deg, #7000ff 0%, #00f0ff 100%)' 
              : 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 0 25px rgba(0, 240, 255, 0.6), 0 8px 24px rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
            position: 'relative'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          title={isOpen ? "Close AI Assistant" : "CampusNotes AI Assistant • Ask Questions & Formulate Answers"}
        >
          {isOpen ? (
            <X size={26} color="#ffffff" />
          ) : (
            <>
              <Bot size={28} color="#040711" />
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '13px',
                height: '13px',
                borderRadius: '50%',
                background: '#10b981',
                border: '2px solid #070a13',
                boxShadow: '0 0 8px #10b981'
              }} />
            </>
          )}
        </button>
      </div>

      {/* -------------------------------------------------------------------
          2. FLOATING CHAT WINDOW (Open State)
          ------------------------------------------------------------------- */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            bottom: isMinimized ? '88px' : '90px',
            right: '24px',
            width: '400px',
            maxWidth: 'calc(100vw - 32px)',
            height: isMinimized ? '56px' : '580px',
            maxHeight: 'calc(100vh - 120px)',
            background: 'rgba(8, 13, 26, 0.96)',
            border: '1px solid rgba(0, 240, 255, 0.35)',
            borderRadius: '20px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 240, 255, 0.2)',
            backdropFilter: 'blur(20px)',
            zIndex: 9998,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            transition: 'height 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            animation: 'slideUpChat 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Header */}
          <div 
            style={{
              padding: '14px 18px',
              background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.12) 0%, rgba(112, 0, 255, 0.12) 100%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              userSelect: 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 12px rgba(0, 240, 255, 0.5)'
                }}
              >
                <Bot size={20} color="#040711" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#fff', letterSpacing: '0.3px' }}>
                    Campus AI Copilot
                  </span>
                  <span style={{
                    fontSize: '0.65rem',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    background: 'rgba(0, 240, 255, 0.18)',
                    color: 'var(--neon-cyan)',
                    fontWeight: 700
                  }}>
                    24/7 AI
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                  <span>Online • All Semesters & Units</span>
                </div>
              </div>
            </div>

            {/* Header Control Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {/* DeepSearch 16:9 Slides Shortcut */}
              <button
                onClick={() => {
                  if (onOpenDeepSearch) onOpenDeepSearch('');
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.7)',
                  padding: '6px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'background 0.2s'
                }}
                title="Open 16:9 Presentation Slides (Alt+Space)"
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <Layers size={16} />
              </button>

              {/* Clear History */}
              <button
                onClick={handleClearHistory}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.7)',
                  padding: '6px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'background 0.2s'
                }}
                title="Clear Chat History"
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <Trash2 size={16} />
              </button>

              {/* Minimize / Maximize */}
              <button
                onClick={() => setIsMinimized(prev => !prev)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.7)',
                  padding: '6px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'background 0.2s'
                }}
                title={isMinimized ? "Expand Chat" : "Minimize Chat"}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                {isMinimized ? <Maximize2 size={15} /> : <Minimize2 size={15} />}
              </button>

              {/* Close Window */}
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.7)',
                  padding: '6px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'background 0.2s'
                }}
                title="Close Window"
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 75, 75, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Messages Body (Hidden if minimized) */}
          {!isMinimized && (
            <>
              <div 
                style={{
                  flex: 1,
                  padding: '16px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  background: 'rgba(5, 8, 18, 0.6)'
                }}
              >
                {messages.map((msg, index) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div 
                      key={msg.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isUser ? 'flex-end' : 'flex-start',
                        maxWidth: '100%',
                        animation: 'fadeIn 0.25s ease'
                      }}
                    >
                      <div 
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          flexDirection: isUser ? 'row-reverse' : 'row',
                          maxWidth: '92%'
                        }}
                      >
                        {!isUser && (
                          <div 
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '8px',
                              background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              marginTop: '2px'
                            }}
                          >
                            <Bot size={16} color="#040711" />
                          </div>
                        )}

                        <div 
                          style={{
                            background: isUser 
                              ? 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)' 
                              : 'rgba(15, 23, 42, 0.85)',
                            border: isUser 
                              ? '1px solid rgba(255, 255, 255, 0.2)' 
                              : '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                            padding: '12px 14px',
                            color: '#e2e8f0',
                            fontSize: '0.84rem',
                            lineHeight: 1.5,
                            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                            position: 'relative'
                          }}
                        >
                          {/* Render HTML with KaTeX and markdown */}
                          <div 
                            dangerouslySetInnerHTML={{ __html: formatChatMessage(msg.text) }} 
                            style={{ wordBreak: 'break-word' }}
                          />

                          {/* Action Buttons (Attached to bot answers) */}
                          {msg.actions && msg.actions.length > 0 && (
                            <div 
                              style={{ 
                                marginTop: '12px', 
                                paddingTop: '10px', 
                                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '6px'
                              }}
                            >
                              {msg.actions.map((act, actIdx) => (
                                <button
                                  key={actIdx}
                                  onClick={() => handleActionClick(act)}
                                  style={{
                                    padding: '5px 10px',
                                    borderRadius: '6px',
                                    background: act.type === 'download' 
                                      ? 'rgba(16, 185, 129, 0.15)' 
                                      : act.type === 'reader'
                                      ? 'rgba(0, 240, 255, 0.15)'
                                      : act.type === 'prompt'
                                      ? 'rgba(245, 158, 11, 0.18)'
                                      : 'rgba(112, 0, 255, 0.2)',
                                    border: act.type === 'download'
                                      ? '1px solid rgba(16, 185, 129, 0.4)'
                                      : act.type === 'reader'
                                      ? '1px solid rgba(0, 240, 255, 0.4)'
                                      : act.type === 'prompt'
                                      ? '1px solid rgba(245, 158, 11, 0.4)'
                                      : '1px solid rgba(112, 0, 255, 0.4)',
                                    color: act.type === 'download'
                                      ? '#34d399'
                                      : act.type === 'reader'
                                      ? 'var(--neon-cyan)'
                                      : act.type === 'prompt'
                                      ? '#fbbf24'
                                      : '#c084fc',
                                    fontSize: '0.74rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    transition: 'all 0.2s'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 240, 255, 0.25)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                  }}
                                >
                                  {act.type === 'download' && <Download size={12} />}
                                  {act.type === 'reader' && <BookOpen size={12} />}
                                  {act.type === 'slides' && <Layers size={12} />}
                                  {act.type === 'navigate' && <ExternalLink size={12} />}
                                  {act.type === 'prompt' && <Zap size={12} />}
                                  <span>{act.label}</span>
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Copy message icon */}
                          {!isUser && (
                            <button
                              onClick={() => handleCopyMessage(msg.text, index)}
                              style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                background: 'rgba(0,0,0,0.3)',
                                border: 'none',
                                borderRadius: '4px',
                                color: copiedIndex === index ? '#10b981' : 'rgba(255,255,255,0.4)',
                                padding: '3px 5px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                              title="Copy Answer"
                            >
                              {copiedIndex === index ? <Check size={12} /> : <Copy size={12} />}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Timestamp */}
                      <span 
                        style={{ 
                          fontSize: '0.68rem', 
                          color: 'rgba(255, 255, 255, 0.35)', 
                          marginTop: '4px',
                          marginRight: isUser ? '4px' : '0',
                          marginLeft: !isUser ? '36px' : '0'
                        }}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '6px' }}>
                    <div 
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Bot size={14} color="#040711" />
                    </div>
                    <div 
                      style={{
                        padding: '8px 14px',
                        borderRadius: '12px',
                        background: 'rgba(15, 23, 42, 0.7)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.78rem',
                        color: 'var(--neon-cyan)'
                      }}
                    >
                      <span className="typing-dot" style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00f0ff' }} />
                      <span className="typing-dot" style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00f0ff', animationDelay: '0.2s' }} />
                      <span className="typing-dot" style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00f0ff', animationDelay: '0.4s' }} />
                      <span style={{ marginLeft: '4px', color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem' }}>Formulating answer...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Pills (Above input) */}
              <div 
                style={{
                  padding: '8px 14px',
                  background: 'rgba(8, 12, 24, 0.9)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  gap: '6px',
                  overflowX: 'auto',
                  whiteSpace: 'nowrap'
                }}
              >
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      background: 'rgba(0, 240, 255, 0.08)',
                      border: '1px solid rgba(0, 240, 255, 0.25)',
                      color: '#cbd5e1',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 240, 255, 0.2)';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 240, 255, 0.08)';
                      e.currentTarget.style.color = '#cbd5e1';
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div 
                style={{
                  padding: '12px 14px',
                  background: 'rgba(10, 15, 30, 0.95)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask formulas, derivations, or physics questions..."
                  style={{
                    flex: 1,
                    background: 'rgba(4, 7, 16, 0.8)',
                    border: '1px solid rgba(0, 240, 255, 0.25)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: '#fff',
                    fontSize: '0.84rem',
                    outline: 'none',
                    boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.5)',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--neon-cyan)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.25)'}
                />

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: inputValue.trim() && !isTyping
                      ? 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)'
                      : 'rgba(255, 255, 255, 0.08)',
                    border: 'none',
                    color: inputValue.trim() && !isTyping ? '#040711' : 'rgba(255, 255, 255, 0.3)',
                    cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    boxShadow: inputValue.trim() && !isTyping ? '0 0 14px rgba(0, 240, 255, 0.4)' : 'none'
                  }}
                  title="Send message (Enter)"
                >
                  <Send size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
