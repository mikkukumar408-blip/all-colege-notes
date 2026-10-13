// Auto-loaded from pure Markdown (.md) files in client/src/content/c/*.md
// No note content or LaTeX strings are stored inside JavaScript string literals.
import { getSectionMarkdown } from '../content/markdownLoader.js';

export const cSubjectDetails = {
  "id": "sub-c1",
  "semester": 1,
  "year": "1st Year",
  "name": "Computational and Problem Solving using C",
  "code": "BCSE-008",
  "credits": 2,
  "instructor": "Department of Computer Science & Engineering (MMDU)",
  "notesCount": "4 Units Comprehensive Long Notes & Solved Questions",
  "rating": 5,
  "description": "Official MMDU syllabus (BCSE-008): Computational problem types, logic paradigms, 4-stage compilation pipeline, memory segmentation, 9-tier operator precedence, typecasting, 2D array row-major addressing, 12-point storage classes matrix, Near/Far/Huge pointers, DMA, and file streams with solved examination questions.",
  "banner": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80"
};

const unitsMeta = [
  {
    "unitNum": 1,
    "title": "Programming Fundamentals, Compilation Pipeline & Problem Solving",
    "examWeightage": "24 - 28 Marks",
    "readingTime": "40 mins",
    "summary": "Computational problem classifications, Deductive vs Inductive reasoning, Top-down design & flowchart standards, Black-box vs White-box testing, 4 error tiers, Big-O complexity matrix, dry-run trace tables, translators comparison, 4-stage compilation pipeline, and virtual process memory layout.",
    "sections": [
      {
        "sectionId": "c-u1-s1",
        "title": "1. Computational Problem Classification & Logic Types"
      },
      {
        "sectionId": "c-u1-s2",
        "title": "2. Algorithmic Design, Flowcharts & Stepwise Refinement"
      },
      {
        "sectionId": "c-u1-s3",
        "title": "3. Testing Strategies & 4 Tiers of Program Defects"
      },
      {
        "sectionId": "c-u1-s4",
        "title": "4. Algorithmic Complexity (Big-O) & Dry-Run Trace Tables"
      },
      {
        "sectionId": "c-u1-s5",
        "title": "5. Translators, 4-Stage Compilation Pipeline & Process Memory Layout"
      },
      {
        "sectionId": "c-u1-s6",
        "title": "6. University Examination Solved Questions (Unit 1)"
      }
    ]
  },
  {
    "unitNum": 2,
    "title": "Core Programming Concepts, Operators & Control Structures",
    "examWeightage": "24 - 28 Marks",
    "readingTime": "38 mins",
    "summary": "C Tokens, 32 ANSI keywords, identifier grammar, constants, primitive data types table, 9-tier operator precedence hierarchy, implicit integer promotions vs explicit typecasting, header files taxonomy, switch fall-through, and loop lifecycles with nested 2D matrix traversal.",
    "sections": [
      {
        "sectionId": "c-u2-s1",
        "title": "1. Tokens, Keywords, Identifiers & Primitive Data Types"
      },
      {
        "sectionId": "c-u2-s2",
        "title": "2. Complete 9-Tier Operator Precedence & Associativity Hierarchy"
      },
      {
        "sectionId": "c-u2-s3",
        "title": "3. Type Conversion: Implicit Promotion vs Explicit Typecasting"
      },
      {
        "sectionId": "c-u2-s4",
        "title": "4. Standard Header Files Taxonomy"
      },
      {
        "sectionId": "c-u2-s5",
        "title": "5. Control Structures: Decision-Making, Loops & Jump Statements"
      },
      {
        "sectionId": "c-u2-s6",
        "title": "6. University Examination Solved Questions (Unit 2)"
      }
    ]
  },
  {
    "unitNum": 3,
    "title": "Arrays, Strings, Functions & Modular Programming",
    "examWeightage": "24 - 28 Marks",
    "readingTime": "45 mins",
    "summary": "1D & 2D arrays, mathematical derivation of row-major order addressing, Linear Search, Binary Search, Bubble Sort step trace, string library functions, 12-point storage classes matrix, and call by value vs reference.",
    "sections": [
      {
        "sectionId": "c-u3-s1",
        "title": "1. 1D & 2D Arrays: Memory Mapping & Row-Major Formula Derivation"
      },
      {
        "sectionId": "c-u3-s2",
        "title": "2. Searching & Sorting Algorithms: Linear, Binary & Bubble Sort"
      },
      {
        "sectionId": "c-u3-s3",
        "title": "3. Exhaustive 12-Point Master Storage Classes Matrix"
      },
      {
        "sectionId": "c-u3-s4",
        "title": "4. Parameter Passing: Call by Value vs Reference & Recursion"
      },
      {
        "sectionId": "c-u3-s5",
        "title": "5. University Examination Solved Questions (Unit 3)"
      }
    ]
  },
  {
    "unitNum": 4,
    "title": "Advanced Data Handling, Pointers, Structures, DMA & File I/O",
    "examWeightage": "24 - 28 Marks",
    "readingTime": "45 mins",
    "summary": "Address arithmetic, pointer taxonomy, Near, Far, and Huge Pointers (16-bit offset vs 32-bit segment:offset and auto-normalization), Struct vs Union memory alignment, Dynamic Memory Allocation (malloc, calloc, realloc, free), and File I/O streams.",
    "sections": [
      {
        "sectionId": "c-u4-s1",
        "title": "1. Pointer Taxonomy: Wild, Dangling, Void & Function Pointers"
      },
      {
        "sectionId": "c-u4-s2",
        "title": "2. Real-Mode 16-Bit Architecture: Near, Far, and Huge Pointers"
      },
      {
        "sectionId": "c-u4-s3",
        "title": "3. Structures, Unions & Memory Alignment Architecture"
      },
      {
        "sectionId": "c-u4-s4",
        "title": "4. Dynamic Memory Allocation (DMA) Complete Lifecycle"
      },
      {
        "sectionId": "c-u4-s5",
        "title": "5. File Handling Operations & Stream Modes"
      },
      {
        "sectionId": "c-u4-s6",
        "title": "6. University Examination Solved Questions (Unit 4)"
      }
    ]
  }
];

export const cUnitsData = unitsMeta.map(unit => ({
  ...unit,
  sections: unit.sections.map(sec => ({
    ...sec,
    content: getSectionMarkdown('c', sec.sectionId),
  })),
}));
