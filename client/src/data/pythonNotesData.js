/* =========================================================================
   PYTHON PROGRAMMING (BCSE-004) COMPLETE STUDY NOTES DATA
   =========================================================================
   Full MMDU Syllabus Coverage for B.Tech 2nd Semester (Units 1, 2, 3, and 4)
   Exhaustive Long Notes Edition:
   - Fundamental programming logic, CPython bytecode & PVM pipeline
   - Object reference memory model, operator precedence, loop control flow
   - In-depth list/tuple/dictionary internals, hash table bucket mechanics
   - File streams, 9-tier access modes, OOP, Dunder methods, and MRO
   ========================================================================= */

export const pythonSubjectDetails = {
  id: "sub-py",
  semester: 2,
  year: "1st Year",
  name: "Python Programming",
  code: "BCSE-004",
  credits: 2,
  instructor: "Department of Computer Science & Engineering (MMDU)",
  notesCount: "4 Units Complete Long Notes & Solved Papers",
  rating: 5.0,
  description: "Official MMDU syllabus (BCSE-004): Introduction to programming, algorithms, CPython compilation & PVM architecture, object reference model, 9-tier operator precedence, branching & looping (break/continue/pass/for-else), functions & LEGB scope, Lists, Tuples, Dictionaries (hash table internals), File Handling (modes, context managers), and Object-Oriented Programming (Classes, Dunder methods, Operator Overloading, MRO, Polymorphism, Composition).",
  banner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  units: [
    { num: 1, title: "Introduction to Programming and Python", pages: 32, status: "Verified" },
    { num: 2, title: "Decision Making, Branching & Functions", pages: 28, status: "Verified" },
    { num: 3, title: "Data Types in Python (Lists, Tuples, Dictionaries)", pages: 34, status: "Verified" },
    { num: 4, title: "File Handling & Object-Oriented Programming (OOP)", pages: 36, status: "Verified" }
  ]
};

export const pythonUnitsData = [
  {
    unitNum: 1,
    title: "Introduction to Programming and Python (Architecture, Tokens & Operators)",
    examWeightage: "24 - 28 Marks",
    readingTime: "35 mins",
    summary: "Algorithms, machine vs high-level languages, compiled vs interpreted execution, Python philosophy (PEP 20), CPython compiler & PVM architecture, variable reference model vs C box model, indentation rules, keywords, literals, formatted I/O, and 9-tier operator precedence.",
    sections: [
      {
        sectionId: "py-u1-s1",
        title: "1. Language Hierarchy & CPython Execution Architecture",
        content: `### 1. Program, Algorithm & Language Classification

A **program** is a sequence of deterministic instructions executed by a computer to solve a problem. An **algorithm** is the logical foundation of a program: a finite, unambiguous, step-by-step procedure accepting specified inputs and yielding a well-defined output in finite time.

| Language Generation | Level | Translation Mechanism | Portability | Examples |
| :--- | :--- | :--- | :--- | :--- |
| **Machine Code (1GL)** | Binary (0s & 1s) | Executed directly by CPU microcode | None | \`10110000 01100001\` |
| **Assembly (2GL)** | Low (Mnemonics) | Translated via *Assembler* | Low | \`MOV AX, 1; ADD BX, AX\` |
| **Compiled (3GL)** | High-level | Ahead-Of-Time (AOT) to machine code | Source-portable only | C, C++, Rust |
| **Interpreted (4GL)** | Very High-level | Bytecode interpretation in Virtual Machine | **100% Portable** | **Python**, JavaScript |

### 2. CPython Architecture: Compiler & Python Virtual Machine (PVM)

Python uses a **two-tier hybrid execution pipeline**:
1. **Compilation Step:** The CPython compiler parses source code (\`.py\`) into an Abstract Syntax Tree (AST) and translates it into platform-independent intermediate **Bytecode** (\`.pyc\` files cached inside the \`__pycache__\` directory).
2. **Execution Step:** The **Python Virtual Machine (PVM)** is the runtime engine of CPython. It loops through the bytecode instructions line-by-line and maps them to native OS/CPU system calls.

> ⚡ **KEY TAKEAWAY & BOTTOM LINE:**
> Python is neither purely compiled nor purely interpreted. It compiles source code to Bytecode once and interprets Bytecode inside the PVM, combining the portability of interpretation with the speed of bytecode.`
      },
      {
        sectionId: "py-u1-s2",
        title: "2. Variable Reference Model, Tokens & Operator Precedence",
        content: `### 1. Variables as Named References (Pointers)

In C, a variable is a named memory box storing raw values directly. In Python, variables are **symbolic references (pointers)** bound to dynamic heap objects:

\`\`\`python
a = 256
b = 256
print(a is b)        # True (Integer interning cache for range -5 to 256)
print(id(a), id(b))  # Identical memory addresses

x = [1, 2, 3]
y = x                # y points to the SAME list object in heap
y.append(4)
print(x)             # Output: [1, 2, 3, 4] (x reflects mutation!)
\`\`\`

### 2. Complete 9-Tier Operator Precedence Matrix

| Rank | Operator Group | Symbols | Associativity |
| :---: | :--- | :--- | :---: |
| **1** | Parentheses & Indexing | \`()\`, \`[]\`, \`{}\`, calls, slicing | Left-to-Right |
| **2** | Exponentiation | \`**\` | **Right-to-Left** |
| **3** | Unary Operators | \`+x\`, \`-x\`, \`~x\` (Bitwise NOT: \`~x = -x-1\`) | Right-to-Left |
| **4** | Multiplicative | \`*\`, \`/\` (float div), \`//\` (floor div), \`%\` (mod) | Left-to-Right |
| **5** | Additive | \`+\`, \`-\` | Left-to-Right |
| **6** | Bitwise Shifts | \`<<\`, \`>>\` | Left-to-Right |
| **7** | Bitwise Logic | \`&\` (AND) &rarr; \`^\` (XOR) &rarr; \`|\` (OR) | Left-to-Right |
| **8** | Comparisons & Identity | \`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`, \`is\`, \`in\` | Left-to-Right |
| **9** | Boolean Logic | \`not\` &rarr; \`and\` &rarr; \`or\` (Short-circuit) | Left-to-Right |

> 💡 **TOPPER EXAM TIP & QUESTION BLUEPRINT:**
> **Why Python has no ++ or --:** Integers in Python are immutable heap objects. In-place increment would violate object immutability. Writing \`++x\` is parsed as two unary positives \`+(+(x))\`, evaluating to \`x\`. Always use \`x += 1\`.`
      }
    ]
  },
  {
    unitNum: 2,
    title: "Decision Making, Branching and Functions (Modularity & Scope)",
    examWeightage: "24 - 28 Marks",
    readingTime: "30 mins",
    summary: "Control structures (if-elif-else, truthy vs falsy values), while and for loops, range(), break vs continue vs pass, loop-else clause, user-defined functions, *args and **kwargs, LEGB scope hierarchy, lambda functions, and datetime module operations.",
    sections: [
      {
        sectionId: "py-u2-s1",
        title: "1. Control Flow & Loop Control Primitives",
        content: `### 1. Conditional Branching & Truth Value Testing

Python evaluates conditional expressions using **truthy** and **falsy** semantics.
- **Falsy Constants:** \`False\`, \`None\`, \`0\`, \`0.0\`, \`""\` (empty string), \`[]\` (empty list), \`()\` (empty tuple), \`{}\` (empty dict), \`set()\`.
- **Truthy Values:** Any non-zero number or non-empty sequence/collection.

### 2. Comparative Analysis: break vs continue vs pass

| Feature | \`break\` | \`continue\` | \`pass\` |
| :--- | :--- | :--- | :--- |
| **Action** | Terminates loop immediately | Aborts current iteration cycle | Null operation (NOP stub) |
| **Target** | First statement outside loop | Next loop cycle evaluation | Next sequential statement |
| **Loop-else Effect** | **Suppresses loop-else block!** | Loop-else executes normally | Zero effect |
| **Use Case** | Early exit upon finding item | Filtering invalid data items | Syntactic placeholder for empty code |

\`\`\`python
# The for-else Search Idiom
for n in range(2, 10):
    for x in range(2, n):
        if n % x == 0:
            print(f"{n} equals {x} * {n//x}")
            break
    else:
        # Loop fell through without hitting a break!
        print(f"{n} is a prime number")
\`\`\``
      },
      {
        sectionId: "py-u2-s2",
        title: "2. Function Architecture, Arguments & LEGB Scope Resolution",
        content: `### 1. Function Argument Mechanics

Python supports 4 primary argument configurations:
1. **Positional Arguments:** Matched left-to-right by position.
2. **Keyword Arguments:** Matched explicitly by parameter name (\`func(name="Alice", age=20)\`).
3. **Default Arguments:** Assigned fallbacks (\`def func(a, b=10)\`). *Note: Mutable default argument trap (\`def f(x=[])\`) causes shared state; always use \`None\` as sentinel!*
4. **Variable-Length Arguments:**
   - \`*args\`: Collects excess positional arguments into a **tuple**.
   - \`**kwargs\`: Collects excess keyword arguments into a **dictionary**.

### 2. The LEGB Name Resolution Protocol

When an unqualified variable is referenced inside a function, Python searches 4 concentric namespaces in strict order:
1. **L (Local):** Names assigned inside the currently executing function.
2. **E (Enclosing):** Names in local scopes of enclosing functions from inner to outer (closures).
3. **G (Global):** Names assigned at the top-level of the current module file.
4. **B (Built-in):** Pre-assigned built-ins in \`builtins\` module (\`open\`, \`len\`, \`range\`, \`print\`).

\`\`\`python
# Date and Time Formatting Operations
from datetime import datetime, timedelta

now = datetime.now()
formatted = now.strftime("%d-%B-%Y %H:%M:%S")  # e.g., '19-September-2026 16:30:00'
parsed = datetime.strptime("19-09-2026", "%d-%m-%Y")
one_week_later = now + timedelta(days=7)       # Duration arithmetic
\`\`\``
      }
    ]
  },
  {
    unitNum: 3,
    title: "Data Types in Python (Lists, Tuples & Dictionaries)",
    examWeightage: "26 - 30 Marks",
    readingTime: "35 mins",
    summary: "Lists: dynamic arrays, indexing, slicing, methods, shallow vs deep copy, comprehensions; Tuples: immutability rationale, single-element comma rule, packing/unpacking; Dictionaries: hash tables, immutable key requirements, safe access, and dictionary comprehensions.",
    sections: [
      {
        sectionId: "py-u3-s1",
        title: "1. Python Lists: Dynamic Arrays & Memory Mechanics",
        content: `### 1. Internal Implementation of Lists

A Python **List** is implemented in CPython as a **contiguous array of 8-byte pointers** to heap objects. To achieve amortized $O(1)$ appends, Python uses a geometric over-allocation strategy: \`allocated_slots = (newsize + (newsize >> 3) + 6) & ~3\`.

### 2. List Slicing & Method Complexities

| Method | Time Complexity | Description & In-place Mutation |
| :--- | :---: | :--- |
| \`lst.append(x)\` | $O(1)$ amortized | Appends element to end of array |
| \`lst.pop()\` | $O(1)$ | Removes and returns last element |
| \`lst.pop(0)\` / \`insert(0, x)\` | $O(n)$ | Forces $n$ memory pointer shifts |
| \`lst.remove(val)\` | $O(n)$ | Linear scan; removes first occurrence or raises \`ValueError\` |
| \`lst.sort()\` | $O(n \log n)$ | In-place **Timsort** (hybrid merge + insertion sort) |

\`\`\`python
# Shallow Copy vs Deep Copy
import copy
orig = [[1, 2], [3, 4]]
shallow = orig.copy()        # Inner sublists share identical references!
deep = copy.deepcopy(orig)   # Completely independent recursive duplication

orig[0][0] = 999
print(shallow[0][0])         # 999 (Mutated!)
print(deep[0][0])            # 1 (Safe & untouched!)
\`\`\``
      },
      {
        sectionId: "py-u3-s2",
        title: "2. Tuples, Dictionaries & Hash Table Architecture",
        content: `### 1. Tuples vs Lists (12-Point Comparative Matrix)

- **Immutability:** Tuples cannot be modified in-place; provides read-only data integrity.
- **Memory Optimization:** Sized precisely to element count with zero spare capacity overhead.
- **Hashability:** Tuples can serve as dictionary keys and set elements if all contained items are immutable.
- **Single-Element Trap:** \`t = (5)\` is an \`int\`. Must write \`t = (5,)\` with trailing comma!

### 2. Dictionaries & Hash Table Architecture

Dictionaries store associative \`{key: value}\` pairs. In modern Python (3.7+), dicts maintain **insertion order** via a two-array architecture: a sparse hash index table referencing a dense array of entries.

| Key Property | Academic Rule & University Justification |
| :--- | :--- |
| **1. Must be Hashable** | Keys must implement \`__hash__()\` and \`__eq__()\`. Immutable types (\`str\`, \`int\`, \`tuple\`) are hashable. Mutable types (\`list\`, \`dict\`, \`set\`) raise \`TypeError: unhashable type\`. |
| **2. Keys Must be Unique** | Duplicate keys cannot exist; assigning to an existing key silently overwrites the previous value. |

\`\`\`python
# Dictionary Comprehension & Safe Lookup
students = {"Bhavya": 98, "Aarav": 85, "Diya": 92}
distinction = {k: v for k, v in students.items() if v >= 90}
print(distinction)  # {'Bhavya': 98, 'Diya': 92}

# Safe lookup prevents KeyError crashes
score = students.get("Karan", 0)  # Returns 0 default instead of crashing!
\`\`\``
      }
    ]
  },
  {
    unitNum: 4,
    title: "File Handling & Object-Oriented Programming (OOP in Python)",
    examWeightage: "26 - 30 Marks",
    readingTime: "40 mins",
    summary: "File streams, 9-tier access modes, context managers (with open), pointer navigation (tell/seek), OOP classes, self parameter, class vs instance variables, dunder methods, operator overloading, inheritance hierarchies, MRO (C3 Linearization), polymorphism, and composition.",
    sections: [
      {
        sectionId: "py-u4-s1",
        title: "1. File Handling Streams & Context Managers",
        content: `### 1. Complete 9-Tier File Access Modes Matrix

| Mode | Initial Cursor Position | File Existence Requirement | Truncation Behavior |
| :---: | :--- | :--- | :--- |
| \`'r'\` | Beginning (offset 0) | **File must exist** (raises \`FileNotFoundError\`) | No truncation |
| \`'w'\` | Beginning (offset 0) | Created automatically if absent | **Immediate truncation to 0 bytes!** |
| \`'a'\` | End of File (EOF) | Created automatically if absent | No truncation; all writes append |
| \`'r+'\` | Beginning (offset 0) | **File must exist** | Overwrites in-place from pointer |
| \`'w+'\` | Beginning (offset 0) | Created automatically if absent | **Truncates existing file to 0 bytes!** |
| \`'a+'\` | End of File (EOF) | Created automatically if absent | Writes append; reading requires \`seek(0)\` |

### 2. The Context Manager Protocol (\`with\` Statement)

Always open files using \`with open(...) as f:\`. It implements the context management protocol (\`__enter__\` and \`__exit__\`), guaranteeing deterministic file handle cleanup and operating system descriptor release even if unhandled runtime exceptions occur!

\`\`\`python
# File Pointer Manipulation with seek() and tell()
with open("notes.txt", "w+") as f:
    f.write("Python Master Notes")
    print("Offset after writing:", f.tell())  # 19 bytes
    f.seek(0)                                 # Reposition cursor to beginning
    content = f.read()
    print("Read Content:", content)
\`\`\``
      },
      {
        sectionId: "py-u4-s2",
        title: "2. OOP, Dunder Methods, Operator Overloading & MRO",
        content: `### 1. Classes, Objects & The \`self\` Parameter

- **Class:** A user-defined structural blueprint bundling data attributes and operational methods.
- **Object:** A concrete heap instance of a class.
- **\`self\`:** An explicit first parameter in instance methods representing the calling object instance (\`obj.method()\` &equiv; \`Class.method(obj)\`).
- **Class Variables vs Instance Variables:** Class variables are defined in the class body and shared across all instances. Instance variables are bound to \`self.var\` inside \`__init__\` and are unique per object.

### 2. Magic (Dunder) Methods & Operator Overloading

\`\`\`python
class ComplexNum:
    def __init__(self, real, imag):
        self.real = real
        self.imag = imag

    def __add__(self, other):
        # Overloads the '+' operator
        return ComplexNum(self.real + other.real, self.imag + other.imag)

    def __str__(self):
        # Overloads print() and str()
        return f"{self.real} + {self.imag}j"

c1 = ComplexNum(3, 4)
c2 = ComplexNum(1, 2)
c3 = c1 + c2  # Invokes c1.__add__(c2)
print("Resultant Sum:", c3)  # Output: 4 + 6j
\`\`\`

### 3. Multiple Inheritance, MRO & The Diamond Problem

When a class inherits from multiple parents with overlapping method names, Python eliminates ambiguity using the **C3 Linearization Algorithm (Method Resolution Order - MRO)**:

\`\`\`python
class A:
    def action(self): print("Base A")

class B(A):
    def action(self): print("Derived B")

class C(A):
    def action(self): print("Derived C")

class D(B, C):
    pass

d = D()
d.action()  # Prints: "Derived B" because B precedes C in declaration!
print([cls.__name__ for cls in D.__mro__])
# Output: ['D', 'B', 'C', 'A', 'object']
\`\`\`

> ⚡ **KEY TAKEAWAY & BOTTOM LINE:**
> **Composition over Inheritance:** Inheritance models an "Is-A" relationship (tight coupling, fragile base class problem). Composition models a "Has-A" relationship (a class stores references to other objects, loose coupling, higher testability).`
      }
    ]
  }
];
