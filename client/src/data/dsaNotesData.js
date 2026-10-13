// Auto-loaded from pure Markdown (.md) files in client/src/content/dsa/*.md
// No note content or LaTeX strings are stored inside JavaScript string literals.
import { getSectionMarkdown } from '../content/markdownLoader.js';

export const dsaSubjectDetails = {
  "id": "sub-dsa-bcse007",
  "semester": 2,
  "year": "1st Year",
  "name": "Data Structures",
  "code": "BCSE-007",
  "credits": 3,
  "instructor": "Department of Computer Science & Engineering (MMDU)",
  "notesCount": "4 Units Complete Master Notes & Solved Question Papers",
  "rating": 5,
  "description": "Official MMDU syllabus (BCSE-007): Mathematical notation, asymptotic bounds, 1D/2D/3D array addressing, sparse matrices, Bubble/Selection/Insertion/Merge/Quick/Heap sorting, Linear/Binary searching, Stacks (LIFO), Infix-Postfix-Prefix conversion & evaluation, recursion & Tower of Hanoi, Linear/Circular/Deque/Priority Queues, Singly/Doubly/Circular Linked Lists, Binary Trees, BST traversals & deletion cases, Graph representations (Adjacency Matrix/List), and BFS/DFS graph traversals.",
  "banner": "/images/dsa.jpg",
  "units": [
    {
      "num": 1,
      "title": "Foundations, Arrays, Searching & Sorting",
      "pages": 3,
      "status": "Verified"
    },
    {
      "num": 2,
      "title": "Stacks, Expressions & Recursion (Tower of Hanoi)",
      "pages": 3,
      "status": "Verified"
    },
    {
      "num": 3,
      "title": "Queues & Linked Lists Topologies",
      "pages": 3,
      "status": "Verified"
    },
    {
      "num": 4,
      "title": "Trees, BST & Graph Algorithms (BFS/DFS)",
      "pages": 3,
      "status": "Verified"
    }
  ]
};

const unitsMeta = [
  {
    "unitNum": 1,
    "title": "Foundations, Array Addressing, Searching & Sorting Algorithms",
    "examWeightage": "25 - 30 Marks",
    "readingTime": "40 mins",
    "summary": "Asymptotic notation (O, Ω, Θ), order of growth, Master Theorem, 1D, 2D (Row/Column major) and 3D array memory mapping, sparse matrix triplet representation, and full sorting/searching suite (Linear, Binary, Bubble, Selection, Insertion, Merge, Quick, Heap, Radix).",
    "sections": [
      {
        "sectionId": "dsa-u1-s1",
        "title": "1. Asymptotic Complexity, Order of Growth & Master Theorem"
      },
      {
        "sectionId": "dsa-u1-s2",
        "title": "2. Multi-Dimensional Array Addressing & Sparse Matrices"
      },
      {
        "sectionId": "dsa-u1-s3",
        "title": "3. Searching & Sorting Algorithms Complexity Suite"
      }
    ]
  },
  {
    "unitNum": 2,
    "title": "Stacks, Expressions (Infix/Postfix/Prefix) & Recursion (Tower of Hanoi)",
    "examWeightage": "25 Marks",
    "readingTime": "35 mins",
    "summary": "Stack ADT (LIFO), array and linked representations, push/pop/peek operations, Infix to Postfix/Prefix conversion algorithms, Postfix evaluation, recursion activation records, and Tower of Hanoi complete mathematical induction and recurrence derivation.",
    "sections": [
      {
        "sectionId": "dsa-u2-s1",
        "title": "1. Stack ADT & Primitive Operations"
      },
      {
        "sectionId": "dsa-u2-s2",
        "title": "2. Expression Conversion (Shunting-Yard) & Evaluation"
      },
      {
        "sectionId": "dsa-u2-s3",
        "title": "3. Recursion & The Tower of Hanoi Problem"
      }
    ]
  },
  {
    "unitNum": 3,
    "title": "Queues & Linked Lists Topologies",
    "examWeightage": "25 Marks",
    "readingTime": "40 mins",
    "summary": "Queue ADT (FIFO), linear queue false overflow, Circular Queue modulo arithmetic, Double-Ended Queue (Deque), Priority Queue, and linked list variants (Singly, Doubly, Circular Singly, Circular Doubly, Header linked list) with complete pointer manipulation.",
    "sections": [
      {
        "sectionId": "dsa-u3-s1",
        "title": "1. Queue Topologies: Linear, Circular, Deque & Priority"
      },
      {
        "sectionId": "dsa-u3-s2",
        "title": "2. Linked Lists Topologies: SLL, DLL, CLL & Header Lists"
      },
      {
        "sectionId": "dsa-u3-s3",
        "title": "3. Essential Pointer Rewiring Algorithms in C"
      }
    ]
  },
  {
    "unitNum": 4,
    "title": "Trees, Binary Search Trees & Graph Algorithms",
    "examWeightage": "25 - 30 Marks",
    "readingTime": "45 mins",
    "summary": "Tree terminology, binary tree theorems, Binary Search Tree (BST) operations (Search, Insert, Deletion 3 cases), Inorder/Preorder/Postorder traversals, Expression trees, Graph representations (Adjacency Matrix vs List), and BFS/DFS traversal algorithms with cycle detection.",
    "sections": [
      {
        "sectionId": "dsa-u4-s1",
        "title": "1. Binary Tree Properties & Theorems"
      },
      {
        "sectionId": "dsa-u4-s2",
        "title": "2. Binary Search Tree (BST) Operations & Traversals"
      },
      {
        "sectionId": "dsa-u4-s3",
        "title": "3. Graph Representations & Search Algorithms (BFS & DFS)"
      }
    ]
  }
];

export const dsaUnitsData = unitsMeta.map(unit => ({
  ...unit,
  sections: unit.sections.map(sec => ({
    ...sec,
    content: getSectionMarkdown('dsa', sec.sectionId),
  })),
}));
