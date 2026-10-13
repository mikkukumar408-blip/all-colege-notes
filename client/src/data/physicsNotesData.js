// Auto-loaded from pure Markdown (.md) files in client/src/content/physics/*.md
// No note content or LaTeX strings are stored inside JavaScript string literals.
import { getSectionMarkdown } from '../content/markdownLoader.js';

export const physicsSubjectDetails = {
  "id": "sub-p1",
  "semester": 2,
  "year": "1st Year",
  "name": "Applied Physics",
  "code": "PHYS102",
  "credits": 4,
  "instructor": "Department of Physics & Applied Sciences (MMDU)",
  "notesCount": "4 Units Comprehensive Long Notes & Solved Questions",
  "rating": 5,
  "description": "Official MMDU syllabus (BPHY-001 / PHYS102): Wave optics, Newton's rings derivations, Fraunhofer single-slit diffraction & grating, Lasers (Ruby & He-Ne 4-level system), Maxwell's equations & displacement current, skin depth, Schrödinger wave mechanics, 1D infinite box, crystal structures (SC/BCC/FCC APF derivations), Schottky & Frenkel defects, and Sommerfeld free electron theory with solved examination questions.",
  "banner": "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80",
  "units": [
    {
      "num": 1,
      "title": "Wave Optics & Lasers",
      "pages": 28,
      "status": "Verified"
    },
    {
      "num": 2,
      "title": "Electrostatics, Magnetostatics & EM Waves",
      "pages": 26,
      "status": "Verified"
    },
    {
      "num": 3,
      "title": "Wave Nature of Particles & Schrödinger Equation",
      "pages": 30,
      "status": "Verified"
    },
    {
      "num": 4,
      "title": "Crystal Structures & Free Electron Theory",
      "pages": 32,
      "status": "Verified"
    }
  ]
};

const unitsMeta = [
  {
    "unitNum": 1,
    "title": "Wave Optics & Lasers (Complete Theory, Derivations & Quantum Systems)",
    "examWeightage": "26 - 30 Marks",
    "readingTime": "40 mins",
    "summary": "Huygens' wave principle, Wavefront vs Amplitude splitting, Interference in thin films & Newton's rings derivations, 12-point Fresnel vs Fraunhofer comparison, Fraunhofer single-slit phasor analysis, Diffraction grating resolving power, Polarization laws (Brewster & Malus), Einstein A and B coefficients, Population inversion, Ruby laser, and 4-level He-Ne gas laser.",
    "sections": [
      {
        "sectionId": "phys-u1-s1",
        "title": "1. Principles of Wave Optics & Newton's Rings (Complete Derivation)"
      },
      {
        "sectionId": "phys-u1-s2",
        "title": "2. Diffraction: Fresnel vs. Fraunhofer & Single Slit Phasor Derivation"
      },
      {
        "sectionId": "phys-u1-s3",
        "title": "3. Polarization of Light & Birefringence"
      },
      {
        "sectionId": "phys-u1-s4",
        "title": "4. Quantum Laser Physics: Einstein Coefficients & He-Ne Systems"
      }
    ]
  },
  {
    "unitNum": 2,
    "title": "Electrostatics, Magnetostatics & Electromagnetic Waves (Maxwell's Unified Theory)",
    "examWeightage": "24 - 28 Marks",
    "readingTime": "35 mins",
    "summary": "Divergence & curl of electrostatic field, Poisson & Laplace equations, Biot-Savart law, Divergence & curl of static magnetic field, Magnetic vector potential, Equation of continuity, Maxwell's displacement current, Maxwell's 4 equations, Free space wave propagation, Speed of light derivation, Skin depth in conductors, and Poynting theorem.",
    "sections": [
      {
        "sectionId": "phys-u2-s1",
        "title": "1. Electrostatic & Magnetostatic Vector Fields & Potentials"
      },
      {
        "sectionId": "phys-u2-s2",
        "title": "2. Displacement Current & Maxwell's 4 Fundamental Equations"
      },
      {
        "sectionId": "phys-u2-s3",
        "title": "3. Wave Propagation in Free Space & Speed of Light Derivation"
      },
      {
        "sectionId": "phys-u2-s4",
        "title": "4. Propagation in Conducting Media, Skin Depth & Poynting Theorem"
      }
    ]
  },
  {
    "unitNum": 3,
    "title": "Wave Nature of Particles & Schrödinger Equation (Quantum Mechanics)",
    "examWeightage": "24 - 28 Marks",
    "readingTime": "40 mins",
    "summary": "de Broglie hypothesis, phase vs group velocity identity vg = v_particle, Heisenberg uncertainty principle and non-existence of nuclear electrons proof, Born wave function postulate, TDSE and TISE derivations, 1D infinite box eigenfunctions and quantized energy levels proof, zero-point energy, quantum tunneling barrier penetration, and 1D harmonic oscillator.",
    "sections": [
      {
        "sectionId": "phys-u3-s1",
        "title": "1. de Broglie Hypothesis, Phase & Group Velocity & Uncertainty Principle"
      },
      {
        "sectionId": "phys-u3-s2",
        "title": "2. The Wave Function & Born Interpretation"
      },
      {
        "sectionId": "phys-u3-s3",
        "title": "3. Derivation of Schrödinger Equations (TDSE & TISE)"
      },
      {
        "sectionId": "phys-u3-s4",
        "title": "4. Particle in a 1D Infinite Well & Quantum Barrier Tunneling"
      }
    ]
  },
  {
    "unitNum": 4,
    "title": "Crystal Structures & Free Electron Theory of Metals (Solid State Physics)",
    "examWeightage": "24 - 28 Marks",
    "readingTime": "40 mins",
    "summary": "Space lattice, basis, 7 crystal systems & 14 Bravais lattices, SC/BCC/FCC derivations (coordination number, atomic radius, and atomic packing factor APF), 12-point Schottky vs Frenkel defects comparison, Classical Drude theory & specific heat failures, Sommerfeld quantum theory, Fermi-Dirac distribution, Fermi energy derivation at 0 K, and Richardson-Dushman thermionic emission equation.",
    "sections": [
      {
        "sectionId": "phys-u4-s1",
        "title": "1. Crystallographic Fundamentals & 14 Bravais Lattices"
      },
      {
        "sectionId": "phys-u4-s2",
        "title": "2. Cubic Crystal Geometries: SC, BCC & FCC APF Derivations"
      },
      {
        "sectionId": "phys-u4-s3",
        "title": "3. Crystal Defects: Schottky vs. Frenkel Defects (12-Point Analysis)"
      },
      {
        "sectionId": "phys-u4-s4",
        "title": "4. Free Electron Theory of Metals: Sommerfeld Quantum Theory & Thermionic Emission"
      }
    ]
  }
];

export const physicsUnitsData = unitsMeta.map(unit => ({
  ...unit,
  sections: unit.sections.map(sec => ({
    ...sec,
    content: getSectionMarkdown('physics', sec.sectionId),
  })),
}));
