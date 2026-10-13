// Auto-loaded from pure Markdown (.md) files in client/src/content/aiml/*.md
// No note content or LaTeX strings are stored inside JavaScript string literals.
import { getSectionMarkdown } from '../content/markdownLoader.js';

export const aimlSubjectDetails = {
  "id": "sub-aiml",
  "semester": 1,
  "year": "1st Year",
  "name": "Fundamentals of AI & ML",
  "code": "BCSE-011",
  "credits": 3,
  "instructor": "AI & ML Department Faculty",
  "notesCount": "4 Units Simple & Colorful Illustrated Notes",
  "rating": 5,
  "description": "AI & Machine Learning made crystal clear! Google Maps analogies for A* search, 20-questions for Decision Trees, supermarket shopping carts for Apriori, and step-by-step solved university numericals in plain English.",
  "banner": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80"
};

const unitsMeta = [
  {
    "unitNum": 1,
    "title": "Foundations of Artificial Intelligence & Intelligent Agents (Made Simple)",
    "examWeightage": "24 - 28 Marks",
    "readingTime": "35 mins",
    "summary": "What is AI really? The Turing Test imitation game; Russell & Norvig 4 Approaches; AI vs ML vs Deep Learning concentric circles; Intelligent Agents as persons with eyes, brain & hands; The PEAS framework for Tesla/Waymo; Task environment dimensions.",
    "sections": [
      {
        "sectionId": "aiml-u1-s1",
        "title": "1. Evolution, Definition & Taxonomies of AI (The Human vs Machine Story)"
      },
      {
        "sectionId": "aiml-u1-s2",
        "title": "2. Intelligent Agents & The PEAS Framework (Eyes, Brain & Hands)"
      },
      {
        "sectionId": "aiml-u1-s3",
        "title": "3. Real-World Applications & How Modern LLMs Work"
      },
      {
        "sectionId": "aiml-u1-solved-exam",
        "title": "University Solved Examination Questions (Unit 1)"
      }
    ]
  },
  {
    "unitNum": 2,
    "title": "Searching Algorithms & Knowledge Representation (Finding the Best Path)",
    "examWeightage": "28 - 32 Marks",
    "readingTime": "40 mins",
    "summary": "State space 5-tuple; Blind search (BFS vs DFS vs UCS) compared; Google Maps heuristic A* algorithm with complete worked trace table; Logic & 8-step CNF conversion; Resolution Refutation courtroom proof; Semantic Nets, Frames, and Scripts.",
    "sections": [
      {
        "sectionId": "aiml-u2-s1",
        "title": "1. State Space Search & Blind Search (BFS vs DFS)"
      },
      {
        "sectionId": "aiml-u2-s2",
        "title": "2. Heuristic Search & The A* Algorithm (Google Maps in Action)"
      },
      {
        "sectionId": "aiml-u2-s3",
        "title": "3. Logic, 8-Step CNF Conversion & Resolution Refutation Proofs"
      },
      {
        "sectionId": "aiml-u2-s4",
        "title": "4. Structured Knowledge: Semantic Nets, Frames & Scripts"
      },
      {
        "sectionId": "aiml-u2-solved-exam",
        "title": "University Solved Examination Questions (Unit 2)"
      }
    ]
  },
  {
    "unitNum": 3,
    "title": "Expert Systems Architecture & Knowledge Acquisition (Cloning Human Experts)",
    "examWeightage": "20 - 24 Marks",
    "readingTime": "30 mins",
    "summary": "Expert systems explained as cloning a doctor's brain; 5-part architecture; The difference between HOW and WHY explanations; The Expert System Triad (Domain Expert, Knowledge Engineer, End User); Feigenbaum's Knowledge Acquisition Bottleneck.",
    "sections": [
      {
        "sectionId": "aiml-u3-s1",
        "title": "1. Expert Systems Architecture & The HOW/WHY Explanation Engine"
      },
      {
        "sectionId": "aiml-u3-s2",
        "title": "2. The Expert System Triad & Human Collaboration"
      },
      {
        "sectionId": "aiml-u3-s3",
        "title": "3. Feigenbaum's Knowledge Acquisition Bottleneck"
      },
      {
        "sectionId": "aiml-u3-solved-exam",
        "title": "University Solved Examination Questions (Unit 3)"
      }
    ]
  },
  {
    "unitNum": 4,
    "title": "Machine Learning Concepts, Supervised Learning & Apriori Algorithm",
    "examWeightage": "28 - 32 Marks",
    "readingTime": "45 mins",
    "summary": "Tom Mitchell (T, P, E) learning formulation; Supervised vs Unsupervised vs RL; Linear & Logistic Regression; Decision Trees ID3 with complete step-by-step Shannon Entropy and Information Gain calculations; Support Vector Machines (SVM) maximum margin; k-Means clustering; Apriori algorithm supermarket market basket analysis numerical solved completely.",
    "sections": [
      {
        "sectionId": "aiml-u4-s1",
        "title": "1. Machine Learning Foundations & Tom Mitchell's (T, P, E) Rule"
      },
      {
        "sectionId": "aiml-u4-s2",
        "title": "2. Supervised Learning: Decision Trees (ID3), SVM & Naive Bayes"
      },
      {
        "sectionId": "aiml-u4-s3",
        "title": "3. Unsupervised Clustering: k-Means & The Elbow Method"
      },
      {
        "sectionId": "aiml-u4-s4",
        "title": "4. Apriori Algorithm for Market Basket Analysis (The Supermarket Secret)"
      },
      {
        "sectionId": "aiml-u4-solved-exam",
        "title": "University Solved Examination Questions (Unit 4)"
      }
    ]
  }
];

export const aimlUnitsData = unitsMeta.map(unit => ({
  ...unit,
  sections: unit.sections.map(sec => ({
    ...sec,
    content: getSectionMarkdown('aiml', sec.sectionId),
  })),
}));
