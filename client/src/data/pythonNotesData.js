// Auto-loaded from pure Markdown (.md) files in client/src/content/python/*.md
// No note content or LaTeX strings are stored inside JavaScript string literals.
import { getSectionMarkdown } from '../content/markdownLoader.js';

export const pythonSubjectDetails = {
  "id": "sub-py",
  "semester": 2,
  "year": "1st Year",
  "name": "Python Programming",
  "code": "BCSE-004",
  "credits": 2,
  "instructor": "Department of Computer Science & Engineering (MMDU)",
  "notesCount": "4 Units Complete Long Notes & Solved Papers",
  "rating": 5,
  "description": "Official MMDU syllabus (BCSE-004): Introduction to programming, algorithms, CPython compilation & PVM architecture, object reference model, 9-tier operator precedence, branching & looping (break/continue/pass/for-else), functions & LEGB scope, Lists, Tuples, Dictionaries (hash table internals), File Handling (modes, context managers), and Object-Oriented Programming (Classes, Dunder methods, Operator Overloading, MRO, Polymorphism, Composition).",
  "banner": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  "units": [
    {
      "num": 1,
      "title": "Introduction to Programming and Python",
      "pages": 32,
      "status": "Verified"
    },
    {
      "num": 2,
      "title": "Decision Making, Branching & Functions",
      "pages": 28,
      "status": "Verified"
    },
    {
      "num": 3,
      "title": "Data Types in Python (Lists, Tuples, Dictionaries)",
      "pages": 34,
      "status": "Verified"
    },
    {
      "num": 4,
      "title": "File Handling & Object-Oriented Programming (OOP)",
      "pages": 36,
      "status": "Verified"
    }
  ]
};

const unitsMeta = [
  {
    "unitNum": 1,
    "title": "Introduction to Programming and Python (Architecture, Tokens & Operators)",
    "examWeightage": "24 - 28 Marks",
    "readingTime": "35 mins",
    "summary": "Algorithms, machine vs high-level languages, compiled vs interpreted execution, Python philosophy (PEP 20), CPython compiler & PVM architecture, variable reference model vs C box model, indentation rules, keywords, literals, formatted I/O, and 9-tier operator precedence.",
    "sections": [
      {
        "sectionId": "py-u1-s1",
        "title": "1. Language Hierarchy & CPython Execution Architecture"
      },
      {
        "sectionId": "py-u1-s2",
        "title": "2. Variable Reference Model, Tokens & Operator Precedence"
      }
    ]
  },
  {
    "unitNum": 2,
    "title": "Decision Making, Branching and Functions (Modularity & Scope)",
    "examWeightage": "24 - 28 Marks",
    "readingTime": "30 mins",
    "summary": "Control structures (if-elif-else, truthy vs falsy values), while and for loops, range(), break vs continue vs pass, loop-else clause, user-defined functions, *args and **kwargs, LEGB scope hierarchy, lambda functions, and datetime module operations.",
    "sections": [
      {
        "sectionId": "py-u2-s1",
        "title": "1. Control Flow & Loop Control Primitives"
      },
      {
        "sectionId": "py-u2-s2",
        "title": "2. Function Architecture, Arguments & LEGB Scope Resolution"
      }
    ]
  },
  {
    "unitNum": 3,
    "title": "Data Types in Python (Lists, Tuples & Dictionaries)",
    "examWeightage": "26 - 30 Marks",
    "readingTime": "35 mins",
    "summary": "Lists: dynamic arrays, indexing, slicing, methods, shallow vs deep copy, comprehensions; Tuples: immutability rationale, single-element comma rule, packing/unpacking; Dictionaries: hash tables, immutable key requirements, safe access, and dictionary comprehensions.",
    "sections": [
      {
        "sectionId": "py-u3-s1",
        "title": "1. Python Lists: Dynamic Arrays & Memory Mechanics"
      },
      {
        "sectionId": "py-u3-s2",
        "title": "2. Tuples, Dictionaries & Hash Table Architecture"
      }
    ]
  },
  {
    "unitNum": 4,
    "title": "File Handling & Object-Oriented Programming (OOP in Python)",
    "examWeightage": "26 - 30 Marks",
    "readingTime": "40 mins",
    "summary": "File streams, 9-tier access modes, context managers (with open), pointer navigation (tell/seek), OOP classes, self parameter, class vs instance variables, dunder methods, operator overloading, inheritance hierarchies, MRO (C3 Linearization), polymorphism, and composition.",
    "sections": [
      {
        "sectionId": "py-u4-s1",
        "title": "1. File Handling Streams & Context Managers"
      },
      {
        "sectionId": "py-u4-s2",
        "title": "2. OOP, Dunder Methods, Operator Overloading & MRO"
      }
    ]
  }
];

export const pythonUnitsData = unitsMeta.map(unit => ({
  ...unit,
  sections: unit.sections.map(sec => ({
    ...sec,
    content: getSectionMarkdown('python', sec.sectionId),
  })),
}));
