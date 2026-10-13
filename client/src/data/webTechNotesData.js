// Auto-loaded from pure Markdown (.md) files in client/src/content/webTech/*.md
// No note content or LaTeX strings are stored inside JavaScript string literals.
import { getSectionMarkdown } from '../content/markdownLoader.js';

export const webTechSubjectDetails = {
  "id": "sub-webtech",
  "semester": 1,
  "year": "1st Year",
  "name": "Fundamentals of Web Technologies",
  "code": "BCSE-012",
  "credits": 2,
  "instructor": "Department of Computer Science & Engineering (MMDU)",
  "notesCount": "4 Units Comprehensive Long Notes & Solved Questions",
  "rating": 5,
  "description": "Official MMDU syllabus (BCSE-012): Internet & WWW Architecture, DNS 5-tier resolution, HTTP transaction cycles, HTML5 Semantic page blueprints, Client-side image maps, Multimedia APIs, Canvas 2D graphics, Web Storage, and CSS architecture with solved university questions.",
  "banner": "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80"
};

const unitsMeta = [
  {
    "unitNum": 1,
    "title": "Internet & World Wide Web Architecture (Complete Theory & Schematics)",
    "examWeightage": "24 - 28 Marks",
    "readingTime": "35 mins",
    "summary": "Technical foundations of global networking; 12-point Internet vs WWW comparative matrix; Historical progression from ARPANET to Web 3.0; 5-tier DNS resolution sequence; Browser subsystems & HTTP transaction cycles; Web search crawler indexing pipeline.",
    "sections": [
      {
        "sectionId": "web-u1-s1",
        "title": "1. Technical Definitions & 12-Point Internet vs. WWW Analysis"
      },
      {
        "sectionId": "web-u1-s2",
        "title": "2. Historical Evolution: ARPANET to Web 3.0 & Application Domains"
      },
      {
        "sectionId": "web-u1-s3",
        "title": "3. DNS Resolution Architecture & Web Client-Server Subsystems"
      },
      {
        "sectionId": "web-u1-s4",
        "title": "4. Web Searching Architectures & Web-Casting Techniques"
      },
      {
        "sectionId": "web-u1-s5",
        "title": "5. University Solved Exam Questions (With Schematics)"
      }
    ]
  },
  {
    "unitNum": 2,
    "title": "Basics of HTML & Website Engineering (Structure, Elements & Mapping)",
    "examWeightage": "24 - 28 Marks",
    "readingTime": "35 mins",
    "summary": "Professional 8-stage website development lifecycle (SDLC); Hosting models; 12-point static vs dynamic website matrix; Fundamental HTML document structure; Core formatting tags; List models; Hyperlink targets; Client-side image mapping geometry; Frames vs modern IFrames.",
    "sections": [
      {
        "sectionId": "web-u2-s1",
        "title": "1. Website Engineering: The 8-Stage Systems Development Life Cycle (SDLC)"
      },
      {
        "sectionId": "web-u2-s2",
        "title": "2. Static vs. Dynamic Websites: Comprehensive 12-Point Analysis"
      },
      {
        "sectionId": "web-u2-s3",
        "title": "3. HTML Fundamental Structure, Core Tags & Text Formatting"
      },
      {
        "sectionId": "web-u2-s4",
        "title": "4. Hyperlinks, Client-Side Image Mapping & Modern IFrames"
      },
      {
        "sectionId": "web-u2-s5",
        "title": "5. University Solved Exam Questions (With Schematics)"
      }
    ]
  },
  {
    "unitNum": 3,
    "title": "HTML5 & Modern Web Application APIs (Semantics, Canvas, Storage & Media)",
    "examWeightage": "24 - 28 Marks",
    "readingTime": "40 mins",
    "summary": "HTML5 paradigm shift; 5 major limitations of HTML4; Structural semantic page layout blueprint; Native multimedia multi-codec fallback (<video> & <audio>); Canvas 2D API & procedural drawing; Web Storage decision matrix; Modern HTML5 form inputs.",
    "sections": [
      {
        "sectionId": "web-u3-s1",
        "title": "1. Evolution & Advantages of HTML5 over HTML4"
      },
      {
        "sectionId": "web-u3-s2",
        "title": "2. HTML5 Structural Semantic Elements Layout Blueprint"
      },
      {
        "sectionId": "web-u3-s3",
        "title": "3. Native Multimedia & Modern HTML5 Form Controls"
      },
      {
        "sectionId": "web-u3-s4",
        "title": "4. Canvas 2D Graphics API & Web Storage (Cookies vs LocalStorage)"
      },
      {
        "sectionId": "web-u3-s5",
        "title": "5. University Solved Exam Questions (With Schematics)"
      }
    ]
  },
  {
    "unitNum": 4,
    "title": "Cascading Style Sheets (CSS) Architecture (Cascade, Box Model & Layouts)",
    "examWeightage": "24 - 28 Marks",
    "readingTime": "40 mins",
    "summary": "CSS Cascade & specificity calculation formula matrix; 3 applying methods compared; Typography, line-height & color gradients; Standard CSS box model & universal box-sizing reset; 5 CSS positioning schemes; Floats, micro-clearfix hack & zebra data tables.",
    "sections": [
      {
        "sectionId": "web-u4-s1",
        "title": "1. Cascade, Specificity Weight Matrix & 3 Applying Methods"
      },
      {
        "sectionId": "web-u4-s2",
        "title": "2. Typography, Text Formatting & Linear / Radial Gradients"
      },
      {
        "sectionId": "web-u4-s3",
        "title": "3. The Standard CSS Box Model & Universal Sizing Reset"
      },
      {
        "sectionId": "web-u4-s4",
        "title": "4. Display, 5 Positioning Schemes, Floats & Zebra Tables"
      },
      {
        "sectionId": "web-u4-s5",
        "title": "5. University Solved Exam Questions (With Schematics)"
      }
    ]
  }
];

export const webTechUnitsData = unitsMeta.map(unit => ({
  ...unit,
  sections: unit.sections.map(sec => ({
    ...sec,
    content: getSectionMarkdown('webTech', sec.sectionId),
  })),
}));
