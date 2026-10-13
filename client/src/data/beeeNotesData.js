// Auto-loaded from pure Markdown (.md) files in client/src/content/beee/*.md
// No note content or LaTeX strings are stored inside JavaScript string literals.
import { getSectionMarkdown } from '../content/markdownLoader.js';

export const beeeSubjectDetails = {
  "id": "sub-beee",
  "semester": 1,
  "year": "1st Year",
  "name": "Basic Electrical & Electronics Engineering (BEEE)",
  "code": "BELE-001",
  "credits": 4,
  "instructor": "Prof. S. K. Mukherjee & Faculty",
  "notesCount": "4 Units Simple & Colorful Illustrated Notes",
  "rating": 5,
  "description": "Textbook made super simple! Water-pipe analogies for circuits, gear-box models for transformers, turnstile models for diodes, and solved university numericals explained in plain English.",
  "banner": "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=1200&q=80"
};

const unitsMeta = [
  {
    "unitNum": 1,
    "title": "DC Circuits & AC Circuit Analysis (Made Super Simple)",
    "examWeightage": "24 - 28 Marks",
    "readingTime": "35 mins",
    "summary": "Circuit analysis explained with water pipes! Kirchhoff's Laws (Charge & Energy conservation), Thevenin's magic shortcut, Maximum Power bicycle analogy, and AC waves with R-L-C resonance.",
    "sections": [
      {
        "sectionId": "u1-s1",
        "title": "1. Voltage, Current & Electrical Sources (The Water Pipe Model)"
      },
      {
        "sectionId": "u1-s2",
        "title": "2. Kirchhoff's Laws (KCL & KVL Made Intuitive)"
      },
      {
        "sectionId": "u1-s3",
        "title": "3. Thevenin's Theorem & Maximum Power (The Ultimate Shortcut)"
      },
      {
        "sectionId": "u1-s4",
        "title": "4. AC Waveforms: RMS, Average & Phase (Why Household Sockets Say 220V)"
      },
      {
        "sectionId": "u1-s5",
        "title": "5. Series R-L-C Circuit & Electrical Resonance (The Radio Tuning Magic)"
      },
      {
        "sectionId": "beee-u1-solved-exam",
        "title": "University Solved Examination Questions (Unit 1)"
      }
    ]
  },
  {
    "unitNum": 2,
    "title": "Transformers & Electrical Machines (The Magic Gearbox)",
    "examWeightage": "24 - 28 Marks",
    "readingTime": "35 mins",
    "summary": "Transformers explained as magnetic gearboxes! Step-up vs Step-down, EMF equation derivation, Core vs Copper losses, OC/SC tests explained simply, DC Motor vs Generator working, and Fleming's Left & Right Hand Rules.",
    "sections": [
      {
        "sectionId": "u2-s1",
        "title": "1. Single-Phase Transformer Working & EMF Equation"
      },
      {
        "sectionId": "u2-s2",
        "title": "2. Transformer Losses, Efficiency & The OC/SC Tests"
      },
      {
        "sectionId": "u2-s3",
        "title": "3. DC Motors & Generators (Fleming's Hand Rules)"
      },
      {
        "sectionId": "beee-u2-solved-exam",
        "title": "University Solved Examination Questions (Unit 2)"
      }
    ]
  },
  {
    "unitNum": 3,
    "title": "Semiconductors, Diodes & Transistors (BJT Made Simple)",
    "examWeightage": "24 - 28 Marks",
    "readingTime": "35 mins",
    "summary": "Semiconductor band theory simplified; Doping (N-type vs P-type); The PN junction one-way turnstile; Zener voltage regulator design; Rectifier circuits comparison; Clippers & Clampers; BJT transistor explained with water valves.",
    "sections": [
      {
        "sectionId": "u3-s1",
        "title": "1. Semiconductors & Doping (The Secret of Silicon)"
      },
      {
        "sectionId": "u3-s2",
        "title": "2. PN Junction Diode & The One-Way Turnstile"
      },
      {
        "sectionId": "u3-s3",
        "title": "3. Rectifiers, Clippers & Clampers (AC to Clean DC)"
      },
      {
        "sectionId": "u3-s4",
        "title": "4. Bipolar Junction Transistor (BJT) — The Valve Analogy"
      },
      {
        "sectionId": "beee-u3-solved-exam",
        "title": "University Solved Examination Questions (Unit 3)"
      }
    ]
  },
  {
    "unitNum": 4,
    "title": "Number Systems & Boolean Logic (How Computers Think)",
    "examWeightage": "20 - 24 Marks",
    "readingTime": "35 mins",
    "summary": "Counting in Decimal, Binary, Octal, and Hexadecimal; 2's complement subtraction with zero tears; BCD addition with the famous +6 correction; Excess-3 self-complementing magic; Boolean algebra laws; De Morgan's theorems proven with 4 NAND gates.",
    "sections": [
      {
        "sectionId": "u4-s1",
        "title": "1. Number Systems & 2's Complement Subtraction"
      },
      {
        "sectionId": "u4-s2",
        "title": "2. BCD Code (+6 Rule) & Excess-3 Self-Complementing Magic"
      },
      {
        "sectionId": "u4-s3",
        "title": "3. Boolean Algebra & De Morgan's Theorems"
      },
      {
        "sectionId": "beee-u4-solved-exam",
        "title": "University Solved Examination Questions (Unit 4)"
      }
    ]
  }
];

export const beeeUnitsData = unitsMeta.map(unit => ({
  ...unit,
  sections: unit.sections.map(sec => ({
    ...sec,
    content: getSectionMarkdown('beee', sec.sectionId),
  })),
}));
