/* =========================================================================
   EXAM REVISION NOTES DATA (examRevisionNotesData.js)
   =========================================================================
   Balanced "Goldilocks" length:
   - Not "very long" (avoids 50+ pages of textbook narrative)
   - Not "very short" (far beyond 2-page bare formula sheets)
   - Covers complete syllabus units for ALL university subjects with:
     * High-yield core theories & definitions
     * Step-by-step exam derivations & algorithms
     * Essential formula reference matrices
     * Real recurring university examination questions with step-by-step model answers
     * Examiner warning traps & memory mnemonics
   ========================================================================= */

export const examRevisionNotes = [
  // =========================================================================
  // SEMESTER 1
  // =========================================================================
  {
    id: 'rev-beee',
    code: 'BELE-001',
    subject: 'Basic Electrical & Electronics Engineering (BEEE)',
    semester: 'Semester 1',
    semNumber: 1,
    year: '1st Year',
    category: 'Core Engineering',
    pageEstimate: '10 Pages Fast-Track Master',
    readTime: '25 Mins Cram',
    examWeightage: '100 Marks (Units 1-4)',
    pdfUrl: '/BEEE notes.pdf',
    downloadName: 'BELE-001_BEEE_Exam_Revision_Notes.pdf',
    fileSize: '4.2 MB',
    summary: 'Comprehensive exam revision digest for DC/AC network analysis, Thevenin/Norton/Max Power theorems, single-phase transformers, DC machines, P-N junction diodes, BJT transistors, and digital logic gates.',
    highlights: [
      'Thevenin, Norton & Maximum Power Transfer (RL = Rth) Derivations',
      'AC R-L-C Series Resonance Condition & Q-Factor Derivation',
      'Transformer EMF Equation (E = 4.44 f N Bm A) & OC/SC Equivalent Circuit',
      'BJT Input/Output Characteristics in CE Mode & Early Effect'
    ],
    units: [
      {
        unitNum: 1,
        title: 'DC Circuits & AC Network Analysis',
        weightage: '28 Marks',
        summary: 'KCL, KVL, Thevenin equivalent, Norton equivalent, Maximum Power Transfer Theorem, and AC single-phase series RLC circuits.',
        keyTheories: [
          {
            term: "Kirchhoff's Current Law (KCL)",
            definition: "The algebraic sum of currents entering any electrical node is zero (Σ I_entering = Σ I_leaving). Grounded in the Conservation of Electric Charge.",
            bulletPoints: [
              "Node cannot store or accumulate net charge (dq/dt = 0).",
              "For n nodes, there are exactly (n - 1) independent nodal KCL equations."
            ]
          },
          {
            term: "Kirchhoff's Voltage Law (KVL)",
            definition: "The algebraic sum of voltages in any closed loop is zero (Σ V_drops = Σ V_rises). Grounded in the Conservation of Energy.",
            bulletPoints: [
              "Electrostatic field is conservative: work done in closed path is zero (∮ E·dl = 0).",
              "For b branches and n nodes, there are l = b - n + 1 independent mesh equations."
            ]
          },
          {
            term: "Thevenin's Theorem",
            definition: "Any linear two-terminal active bilateral resistive network can be replaced by an equivalent circuit consisting of a single voltage source Vth in series with a resistance Rth.",
            bulletPoints: [
              "Vth: Open-circuit voltage across terminals A-B with load removed.",
              "Rth: Equivalent resistance seen from terminals A-B with all independent voltage sources short-circuited and current sources open-circuited."
            ]
          },
          {
            term: "Maximum Power Transfer Theorem",
            definition: "A resistive load connected to a DC network receives maximum power when load resistance RL equals Thevenin internal resistance Rth (RL = Rth). Maximum efficiency is exactly 50%.",
            bulletPoints: [
              "Proof: P_L = I² RL = [Vth / (Rth + RL)]² · RL. Setting dP_L / dRL = 0 yields (Rth + RL)² - 2RL(Rth + RL) = 0 ⇒ RL = Rth.",
              "Max Power formula: P_max = Vth² / (4 Rth)."
            ]
          },
          {
            term: "AC R-L-C Series Resonance",
            definition: "Occurs when inductive reactance equals capacitive reactance (X_L = X_C), making total impedance purely resistive (Z = R) and at its minimum, causing current to reach maximum amplitude.",
            bulletPoints: [
              "Resonant Frequency: ω₀ = 1 / √(L·C)  ⇒  f₀ = 1 / [2π √(L·C)].",
              "Power factor at resonance is unity (cos φ = 1.0).",
              "Quality Factor: Q = (ω₀ L) / R = (1 / R) √(L / C)."
            ]
          }
        ],
        derivations: [
          {
            title: "Maximum Power Transfer Theorem (DC Circuit)",
            steps: [
              "1. Model network as Thevenin equivalent (Vth, Rth) driving variable load RL.",
              "2. Circuit current: I = Vth / (Rth + RL).",
              "3. Power dissipated in load: P_L = I² RL = Vth² · RL / (Rth + RL)².",
              "4. To maximize P_L with respect to RL, differentiate: dP_L/dRL = 0.",
              "5. dP_L/dRL = Vth² · [(Rth + RL)² · 1 - RL · 2(Rth + RL)] / (Rth + RL)⁴ = 0.",
              "6. (Rth + RL) [ (Rth + RL) - 2RL ] = 0  ⇒  Rth - RL = 0  ⇒  RL = Rth.",
              "7. Substituting RL = Rth into power equation: P_max = Vth² · Rth / (2 Rth)² = Vth² / (4 Rth)."
            ],
            finalFormula: "R_L = R_{th} \\implies P_{\\max} = \\frac{V_{th}^2}{4 R_{th}}",
            examFrequency: "Appears in 85% of semester exams (8-10 Marks)"
          }
        ],
        formulas: [
          { name: "Ohm's Law & Power", formula: "V = I R, \\quad P = V I = I^2 R = \\frac{V^2}{R}", whereUsed: "Basic loop calculations" },
          { name: "Series RLC Impedance", formula: "Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad X_L = 2\\pi f L, \\quad X_C = \\frac{1}{2\\pi f C}", whereUsed: "AC circuit analysis" },
          { name: "AC Power Factor", formula: "\\cos\\phi = \\frac{R}{Z} = \\frac{P_{\\text{active}}}{S_{\\text{apparent}}}", whereUsed: "Single-phase power calculations" }
        ],
        solvedQuestions: [
          {
            question: "State and prove Thevenin's Theorem. A circuit has V = 20V connected to R1 = 5Ω and R2 = 20Ω in parallel with load RL = 10Ω. Find current through RL.",
            marks: "10 Marks",
            solution: "Step 1: Disconnect RL. Vth = open circuit voltage across R2 = 20V × [20 / (5 + 20)] = 16.0V. Step 2: Deactivate source (short 20V battery). Rth = R1 || R2 = (5 × 20) / (5 + 20) = 100 / 25 = 4.0Ω. Step 3: Reconnect RL = 10Ω to Thevenin equivalent. Total current IL = Vth / (Rth + RL) = 16.0 / (4.0 + 10.0) = 16.0 / 14.0 = 1.143 Amperes.",
            keyPoints: ["Box final current IL = 1.143 A", "Show both open-circuit and zeroed-source circuit diagrams"]
          }
        ],
        examinerTips: "Always draw separate diagrams for finding Vth and finding Rth. For dependent sources, remember you cannot simply open/short dependent sources!"
      },
      {
        unitNum: 2,
        title: 'Transformers & Electrical Machines',
        weightage: '26 Marks',
        summary: 'Core working principle of single-phase transformers, EMF equation, losses, efficiency, Open Circuit / Short Circuit tests, and DC Motor working principles.',
        keyTheories: [
          {
            term: "Transformer Working Principle",
            definition: "A static electrical machine that transfers electrical energy between two or more circuits through electromagnetic induction (Faraday's Law) without changing frequency.",
            bulletPoints: [
              "Transformation Ratio: K = V₂ / V₁ = N₂ / N₁ = I₁ / I₂.",
              "Step-Up Transformer: N₂ > N₁ (K > 1); Step-Down: N₂ < N₁ (K < 1)."
            ]
          },
          {
            term: "Transformer Losses",
            definition: "Divided into Core Losses (constant at all loads) and Copper Losses (proportional to load current squared).",
            bulletPoints: [
              "Core / Iron Loss (P_i): Hysteresis Loss (P_h = k_h f B_m^{1.6}) + Eddy Current Loss (P_e = k_e f² B_m² t²). Determined by Open Circuit (OC) Test.",
              "Copper / I²R Loss (P_cu): Occurs in primary and secondary windings. Determined by Short Circuit (SC) Test."
            ]
          }
        ],
        derivations: [
          {
            title: "Transformer EMF Equation Derivation",
            steps: [
              "1. Let primary winding have N₁ turns, secondary N₂ turns, AC supply frequency f Hz.",
              "2. Sinusoidal core flux: Φ(t) = Φ_max sin(ωt) = Φ_max sin(2πft).",
              "3. By Faraday's Law, induced EMF per turn: e = -dΦ/dt = -d/dt [Φ_max sin(2πft)] = -2πf Φ_max cos(2πft).",
              "4. Maximum value of induced EMF: E_max = 2πf Φ_max N₁.",
              "5. RMS value of induced EMF: E₁ = E_max / √2 = (2π / √2) f Φ_max N₁ = 4.44 f Φ_max N₁.",
              "6. Similarly for secondary: E₂ = 4.44 f Φ_max N₂.",
              "7. Note: Φ_max = B_max · A (where A is core cross-sectional area)."
            ],
            finalFormula: "E_1 = 4.44 f N_1 B_{\\max} A, \\quad E_2 = 4.44 f N_2 B_{\\max} A",
            examFrequency: "Appears in 90% of semester exams (8 Marks)"
          }
        ],
        formulas: [
          { name: "Transformer Efficiency", formula: "\\eta = \\frac{x \\cdot S \\cdot \\cos\\phi}{x \\cdot S \\cdot \\cos\\phi + P_i + x^2 P_{cu}} \\times 100\\%", whereUsed: "Efficiency calculation at load fraction x" },
          { name: "Condition for Maximum Efficiency", formula: "P_i = x^2 P_{cu} \\implies x = \\sqrt{\\frac{P_i}{P_{cu}}}", whereUsed: "Finding optimal load for peak efficiency" }
        ],
        solvedQuestions: [
          {
            question: "A 25 kVA, 2200/220 V, 50 Hz single-phase transformer has iron loss of 350 W and full-load copper loss of 400 W. Calculate efficiency at full load (0.8 pf lagging) and the load at which maximum efficiency occurs.",
            marks: "10 Marks",
            solution: "1. Full Load Output = 25 kVA × 0.8 = 20,000 W = 20 kW. 2. Total Full-Load Loss = P_i + P_cu = 350 + 400 = 750 W = 0.75 kW. 3. Full-Load Efficiency = 20 / (20 + 0.75) × 100% = 20 / 20.75 × 100% = 96.38%. 4. Fraction of load for Max Efficiency: x = √(P_i / P_cu) = √(350 / 400) = √0.875 = 0.9354 (i.e. 93.54% of full load = 23.38 kVA).",
            keyPoints: ["State efficiency formula clearly", "Specify optimal kVA = 23.38 kVA"]
          }
        ],
        examinerTips: "In transformer problems, iron loss is CONSTANT regardless of load fraction x. Only copper loss scales by x²!"
      },
      {
        unitNum: 3,
        title: 'Semiconductor Diodes & Bipolar Junction Transistors (BJT)',
        weightage: '24 Marks',
        summary: 'P-N junction mechanics, barrier potential, V-I characteristics, Half-Wave & Full-Wave Rectifiers, and BJT operations in Common Emitter (CE) configuration.',
        keyTheories: [
          {
            term: "P-N Junction Barrier Potential",
            definition: "Formed when p-type and n-type semiconductors meet. Diffusion of electrons and holes creates an uncompensated immobile ion space-charge region (depletion layer) that opposes further carrier diffusion.",
            bulletPoints: [
              "Silicon barrier: ~0.7 V; Germanium barrier: ~0.3 V.",
              "Forward bias narrows depletion width; reverse bias widens it."
            ]
          },
          {
            term: "BJT Configurations & Current Gain",
            definition: "Transistor has three regions: Emitter (heavily doped), Base (thin, lightly doped), and Collector (moderately doped, largest area).",
            bulletPoints: [
              "Common Base current gain: α = I_C / I_E (typically 0.95 - 0.99).",
              "Common Emitter current gain: β = I_C / I_B = α / (1 - α) (typically 50 - 300).",
              "Fundamental Current Equation: I_E = I_B + I_C."
            ]
          }
        ],
        derivations: [
          {
            title: "Relationship between BJT Gains α and β",
            steps: [
              "1. Fundamental BJT current relation: I_E = I_B + I_C.",
              "2. By definition: α = I_C / I_E  ⇒  I_E = I_C / α.",
              "3. By definition: β = I_C / I_B  ⇒  I_B = I_C / β.",
              "4. Substituting into (1): I_C / α = (I_C / β) + I_C.",
              "5. Divide both sides by I_C: 1 / α = (1 / β) + 1.",
              "6. Rearranging: 1 / β = (1 / α) - 1 = (1 - α) / α.",
              "7. Inverting gives: β = α / (1 - α) and α = β / (1 + β)."
            ],
            finalFormula: "\\beta = \\frac{\\alpha}{1 - \\alpha}, \\quad \\alpha = \\frac{\\beta}{1 + \\beta}",
            examFrequency: "Appears in 75% of semester exams (5 Marks)"
          }
        ],
        formulas: [
          { name: "Full-Wave Bridge Rectifier Efficiency", formula: "\\eta = \\frac{81.2\\%}{1 + \\frac{2 r_d}{R_L}}, \\quad \\text{Ripple Factor } \\gamma = 0.482", whereUsed: "Power supply design" },
          { name: "Diode Shockley Equation", formula: "I = I_s \\left( e^{\\frac{V}{\\eta V_T}} - 1 \\right), \\quad V_T \\approx 26\\,\\text{mV at } 300\\,\\text{K}", whereUsed: "Diode V-I characteristics" }
        ],
        solvedQuestions: [
          {
            question: "Compare Half-Wave Rectifier and Full-Wave Center-Tapped Rectifier on the basis of: (1) Rectification Efficiency, (2) Ripple Factor, (3) Peak Inverse Voltage (PIV), (4) Transformer Utilization Factor.",
            marks: "8 Marks",
            solution: "1. Rectification Efficiency: HWR = 40.6% | FWR = 81.2%. 2. Ripple Factor: HWR = 1.21 (severe ripple) | FWR = 0.482. 3. PIV: HWR = Vm | Center-Tapped FWR = 2Vm | Bridge FWR = Vm. 4. TUF: HWR = 0.287 | Center-Tapped FWR = 0.693 | Bridge FWR = 0.812.",
            keyPoints: ["Tabulate the comparison clearly", "Highlight Bridge Rectifier PIV = Vm vs Center-Tapped 2Vm"]
          }
        ],
        examinerTips: "In BJT CE characteristic curves, always label the 3 distinct operating regions: Active (amplification), Saturation (ON switch), and Cutoff (OFF switch)."
      },
      {
        unitNum: 4,
        title: 'Number Systems & Boolean Algebra',
        weightage: '22 Marks',
        summary: 'Binary, Octal, Hexadecimal conversions, 1s and 2s complements, De Morgan\'s laws, universal logic gates, and Boolean simplification.',
        keyTheories: [
          {
            term: "De Morgan's Theorems",
            definition: "First Law: The complement of a product is equal to the sum of complements ( (A · B)' = A' + B' ). Second Law: The complement of a sum is equal to the product of complements ( (A + B)' = A' · B' ).",
            bulletPoints: [
              "Universal Gates: NAND and NOR can implement ANY Boolean function alone.",
              "Duality Principle: Any Boolean relation remains valid if AND and OR operators are interchanged and 0 and 1 are interchanged."
            ]
          }
        ],
        derivations: [],
        formulas: [
          { name: "2's Complement Subtraction", formula: "A - B = A + (2's \\text{ complement of } B)", whereUsed: "Binary arithmetic" }
        ],
        solvedQuestions: [
          {
            question: "Prove using Boolean algebra theorems that: (A + B)(A + C) = A + BC.",
            marks: "6 Marks",
            solution: "LHS = (A + B)(A + C) = A·A + A·C + B·A + B·C. By idempotent law (A·A = A): = A + A·C + A·B + B·C. By absorption law (A + A·C = A): = A + A·B + B·C = A(1 + B) + B·C. Since 1 + B = 1: = A·1 + B·C = A + BC = RHS (Distributive law proved).",
            keyPoints: ["Mention law used at every step (Idempotent, Absorption, Annulment)"]
          }
        ],
        examinerTips: "When simplifying Boolean expressions, state the name of every theorem applied (e.g. Absorption Law, Idempotent Law) in parentheses beside the step."
      }
    ]
  },

  // =========================================================================
  // SEMESTER 1 - MATHEMATICS I
  // =========================================================================
  {
    id: 'rev-m1',
    code: 'BMAT-001',
    subject: 'Engineering Mathematics I',
    semester: 'Semester 1',
    semNumber: 1,
    year: '1st Year',
    category: 'Mathematics',
    pageEstimate: '11 Pages Fast-Track Master',
    readTime: '30 Mins Cram',
    examWeightage: '100 Marks (Units 1-4)',
    pdfUrl: '/MATH101_Engineering_Mathematics_I_Handwritten_Notes.pdf',
    downloadName: 'BMAT-001_Mathematics_I_Exam_Revision_Notes.pdf',
    fileSize: '3.8 MB',
    summary: 'Essential exam digest covering Matrix Rank, Gauss-Jordan Inversion, Cayley-Hamilton Theorem & Eigenvalues, Mean Value Theorems, Leibnitz Rule, Curvature, Beta-Gamma integrals, Jacobians, Extrema, and Fourier Series expansions.',
    highlights: [
      'Rank of Matrix via Echelon Form & Gauss Elimination Solvability',
      'Cayley-Hamilton Theorem: Finding Inverse & High Powers of Matrices',
      'Rolle\'s, LMVT & Cauchy Mean Value Theorems with Verification Steps',
      'Beta & Gamma Function Relationship: B(m,n) = Γ(m)Γ(n) / Γ(m+n)'
    ],
    units: [
      {
        unitNum: 1,
        title: 'Matrices, Eigenvalues & Cayley-Hamilton Theorem',
        weightage: '26 Marks',
        summary: 'Row echelon form, matrix rank, consistency of linear system AX = B, characteristic equation, eigenvalues/eigenvectors, and Cayley-Hamilton theorem.',
        keyTheories: [
          {
            term: "Rank of Matrix & Consistency of AX = B",
            definition: "The rank ρ(A) is the number of non-zero rows in its row echelon form. For a linear system with augmented matrix [A|B]:",
            bulletPoints: [
              "Unique Solution: ρ(A) = ρ([A|B]) = n (number of variables).",
              "Infinitely Many Solutions: ρ(A) = ρ([A|B]) < n (system is consistent).",
              "No Solution (Inconsistent): ρ(A) ≠ ρ([A|B])."
            ]
          },
          {
            term: "Cayley-Hamilton Theorem",
            definition: "Every square matrix satisfies its own characteristic equation: if |A - λI| = (-1)ⁿ (λⁿ + c_{n-1}λ^{n-1} + ... + c₀) = 0, then Aⁿ + c_{n-1}A^{n-1} + ... + c₀ I = 0.",
            bulletPoints: [
              "Calculation of A⁻¹: Multiply Cayley-Hamilton equation by A⁻¹.",
              "Calculation of A⁴ or A⁸ without repeated matrix multiplication."
            ]
          }
        ],
        derivations: [
          {
            title: "Cayley-Hamilton Theorem Application to Find Matrix Inverse",
            steps: [
              "1. Characteristic equation: |A - λI| = 0  ⇒  λ³ - c₁ λ² + c₂ λ - c₃ = 0 (where c₁ = trace(A), c₃ = det(A)).",
              "2. By Cayley-Hamilton theorem: A³ - c₁ A² + c₂ A - c₃ I = 0.",
              "3. Since det(A) = c₃ ≠ 0, inverse exists. Post-multiply by A⁻¹:",
              "4. A² - c₁ A + c₂ I - c₃ A⁻¹ = 0.",
              "5. c₃ A⁻¹ = A² - c₁ A + c₂ I  ⇒  A⁻¹ = (1 / c₃) [ A² - c₁ A + c₂ I ]."
            ],
            finalFormula: "A^{-1} = \\frac{1}{\\det(A)} [A^2 - \\text{trace}(A) \\cdot A + c_2 I]",
            examFrequency: "Appears in 95% of exams (10 Marks)"
          }
        ],
        formulas: [
          { name: "Characteristic Equation (3x3)", formula: "\\lambda^3 - \\text{tr}(A)\\lambda^2 + (M_{11} + M_{22} + M_{33})\\lambda - \\det(A) = 0", whereUsed: "Finding eigenvalues" },
          { name: "Eigenvalues Property", formula: "\\sum \\lambda_i = \\text{trace}(A), \\quad \\prod \\lambda_i = \\det(A)", whereUsed: "Verification of computed eigenvalues" }
        ],
        solvedQuestions: [
          {
            question: "Find eigenvalues and eigenvectors of A = [[2, 2, 1], [1, 3, 1], [1, 2, 2]]. Verify Cayley-Hamilton Theorem.",
            marks: "10 Marks",
            solution: "1. tr(A) = 2+3+2 = 7. Minor sum: M11 = (6-2)=4, M22 = (4-1)=3, M33 = (6-2)=4. Sum = 11. det(A) = 2(6-2) - 2(2-1) + 1(2-3) = 8 - 2 - 1 = 5. 2. Characteristic eq: λ³ - 7λ² + 11λ - 5 = 0. Solving: (λ - 1)(λ - 1)(λ - 5) = 0. Eigenvalues: λ = 1, 1, 5. 3. Eigenvector for λ=5 is [1, 1, 1]^T. For λ=1, eigenvectors are [-2, 1, 0]^T and [-1, 0, 1]^T. 4. Verify A³ - 7A² + 11A - 5I = 0 by computing powers of A.",
            keyPoints: ["Check sum of eigenvalues = 1+1+5 = 7 = tr(A)", "Check product = 1×1×5 = 5 = det(A)"]
          }
        ],
        examinerTips: "Always verify computed eigenvalues by checking that their sum equals trace(A) and their product equals det(A). If they don't match, your quadratic factorization has an arithmetic error!"
      },
      {
        unitNum: 2,
        title: 'Differential Calculus & Curvature',
        weightage: '24 Marks',
        summary: 'Rolle\'s Theorem, Lagrange\'s Mean Value Theorem, Cauchy\'s MVT, Taylor\'s and Maclaurin\'s series, indeterminate forms (L\'Hospital rule), and radius of curvature.',
        keyTheories: [
          {
            term: "Lagrange's Mean Value Theorem (LMVT)",
            definition: "If f(x) is continuous in [a, b] and differentiable in (a, b), there exists at least one point c ∈ (a, b) such that f'(c) = [f(b) - f(a)] / (b - a).",
            bulletPoints: [
              "Geometrical interpretation: The tangent at x = c is parallel to the secant line joining endpoints (a, f(a)) and (b, f(b)).",
              "Rolle's theorem is a special case when f(a) = f(b) = 0, giving f'(c) = 0."
            ]
          }
        ],
        derivations: [],
        formulas: [
          { name: "Radius of Curvature (Cartesian)", formula: "\\rho = \\frac{[1 + (y')^2]^{3/2}}{|y''|}, \\quad y' = \\frac{dy}{dx}, \\; y'' = \\frac{d^2y}{dx^2}", whereUsed: "Curvature calculations" },
          { name: "Leibnitz Theorem for n-th Derivative", formula: "D^n (u \\cdot v) = \\sum_{r=0}^n \\binom{n}{r} D^{n-r}(u) \\cdot D^r(v)", whereUsed: "High-order derivatives of products" }
        ],
        solvedQuestions: [
          {
            question: "Find the radius of curvature for the catenary y = c cosh(x/c) at any point (x, y).",
            marks: "8 Marks",
            solution: "1. y = c cosh(x/c). First derivative: y' = c · (1/c) sinh(x/c) = sinh(x/c). 2. Second derivative: y'' = (1/c) cosh(x/c). 3. Numerator: [1 + (y')²]^(3/2) = [1 + sinh²(x/c)]^(3/2) = [cosh²(x/c)]^(3/2) = cosh³(x/c). 4. Radius ρ = [cosh³(x/c)] / [(1/c) cosh(x/c)] = c · cosh²(x/c) = c · (y/c)² = y² / c. Hence ρ = y²/c.",
            keyPoints: ["Use hyperbolic identity 1 + sinh² θ = cosh² θ", "Box final answer ρ = y²/c"]
          }
        ],
        examinerTips: "Remember to check that hypotheses of MVT are stated first (continuity on closed interval [a, b] and differentiability on open interval (a, b)) before solving for c."
      },
      {
        unitNum: 3,
        title: 'Multivariable Calculus, Jacobians & Extrema',
        weightage: '26 Marks',
        summary: 'Partial derivatives, Euler\'s theorem for homogeneous functions, Jacobians of transformations, Taylor series for two variables, and Maxima/Minima (Lagrange multipliers).',
        keyTheories: [
          {
            term: "Euler's Theorem for Homogeneous Functions",
            definition: "If u = f(x, y) is a homogeneous function of degree n, then x (∂u/∂x) + y (∂u/∂y) = n · u.",
            bulletPoints: [
              "Second order form: x² (∂²u/∂x²) + 2xy (∂²u/∂x∂y) + y² (∂²u/∂y²) = n(n - 1) u.",
              "If u = f(v) where v is homogeneous of degree n, then x (∂u/∂x) + y (∂u/∂y) = n · [f'(v) / f(v)]."
            ]
          },
          {
            term: "Conditions for Extrema of f(x, y)",
            definition: "Stationary points: ∂f/∂x = 0 and ∂f/∂y = 0. Let r = ∂²f/∂x², s = ∂²f/∂x∂y, t = ∂²f/∂y² at stationary point:",
            bulletPoints: [
              "rt - s² > 0 and r < 0: Local Maximum.",
              "rt - s² > 0 and r > 0: Local Minimum.",
              "rt - s² < 0: Saddle Point (neither max nor min).",
              "rt - s² = 0: Test Inconclusive."
            ]
          }
        ],
        derivations: [],
        formulas: [
          { name: "Jacobian of (u, v) w.r.t (x, y)", formula: "J = \\frac{\\partial(u, v)}{\\partial(x, y)} = \\begin{vmatrix} \\frac{\\partial u}{\\partial x} & \\frac{\\partial u}{\\partial y} \\\\ \\frac{\\partial v}{\\partial x} & \\frac{\\partial v}{\\partial y} \\end{vmatrix}", whereUsed: "Coordinate transformations & double integrals" }
        ],
        solvedQuestions: [
          {
            question: "Find the maximum and minimum values of f(x, y) = x³ + y³ - 3axy.",
            marks: "10 Marks",
            solution: "1. fx = 3x² - 3ay = 0  ⇒  x² = ay. fy = 3y² - 3ax = 0  ⇒  y² = ax. 2. Substituting y = x²/a into second equation: (x²/a)² = ax  ⇒  x⁴ = a³ x  ⇒  x(x³ - a³) = 0. 3. Real critical points: (0, 0) and (a, a). 4. Second derivatives: r = fxx = 6x, s = fxy = -3a, t = fyy = 6y. 5. At (0, 0): r = 0, s = -3a, t = 0  ⇒  rt - s² = 0 - 9a² = -9a² < 0  ⇒  Saddle point at (0, 0). 6. At (a, a): r = 6a, s = -3a, t = 6a  ⇒  rt - s² = 36a² - 9a² = 27a² > 0. Since r = 6a > 0 (for a > 0), f has local minimum at (a, a) with value f(a, a) = a³ + a³ - 3a³ = -a³.",
            keyPoints: ["Evaluate (0,0) as saddle point", "Evaluate (a, a) as local minimum = -a³"]
          }
        ],
        examinerTips: "Don't forget to evaluate rt - s² before concluding maxima or minima. If rt - s² < 0, it is immediately a saddle point."
      },
      {
        unitNum: 4,
        title: 'Beta-Gamma Functions & Fourier Series',
        weightage: '24 Marks',
        summary: 'Definitions of Beta and Gamma integrals, transformation properties, Γ(1/2) = √π proof, Dirichlet conditions, Euler Fourier coefficients, and half-range series.',
        keyTheories: [
          {
            term: "Beta and Gamma Functions",
            definition: "Gamma integral: Γ(n) = ∫₀^∞ e^{-t} t^{n-1} dt (for n > 0). Beta integral: B(m, n) = ∫₀¹ x^{m-1} (1 - x)^{n-1} dx (for m, n > 0).",
            bulletPoints: [
              "Recurrence: Γ(n + 1) = n Γ(n) = n! (for integer n).",
              "Fundamental Link: B(m, n) = [ Γ(m) · Γ(n) ] / Γ(m + n).",
              "Special Value: Γ(1/2) = √π."
            ]
          },
          {
            term: "Fourier Series on [-π, π]",
            definition: "f(x) = a₀/2 + Σ [aₙ cos(nx) + bₙ sin(nx)], where a₀ = (1/π) ∫_{-π}^π f(x) dx, aₙ = (1/π) ∫_{-π}^π f(x) cos(nx) dx, bₙ = (1/π) ∫_{-π}^π f(x) sin(nx) dx.",
            bulletPoints: [
              "Even function (f(-x) = f(x)): bₙ = 0 (only cosine terms remain).",
              "Odd function (f(-x) = -f(x)): a₀ = 0 and aₙ = 0 (only sine terms remain)."
            ]
          }
        ],
        derivations: [
          {
            title: "Proof that Γ(1/2) = √π",
            steps: [
              "1. Definition: Γ(1/2) = ∫₀^∞ e^{-t} t^{-1/2} dt.",
              "2. Substitute t = x²  ⇒  dt = 2x dx  ⇒  t^{-1/2} = 1/x.",
              "3. Γ(1/2) = ∫₀^∞ e^{-x²} (1/x) (2x dx) = 2 ∫₀^∞ e^{-x²} dx.",
              "4. By symmetry: [ Γ(1/2) ]² = [ 2 ∫₀^∞ e^{-x²} dx ] [ 2 ∫₀^∞ e^{-y²} dy ] = 4 ∫₀^∞ ∫₀^∞ e^{-(x² + y²)} dx dy.",
              "5. Convert to polar coordinates: x = r cos θ, y = r sin θ, dx dy = r dr dθ (r: 0 to ∞, θ: 0 to π/2).",
              "6. [ Γ(1/2) ]² = 4 ∫₀^{π/2} dθ ∫₀^∞ e^{-r²} r dr = 4 · (π/2) · [ -e^{-r²} / 2 ]₀^∞ = 2π · (1/2) = π.",
              "7. Taking square root: Γ(1/2) = √π."
            ],
            finalFormula: "\\Gamma\\left(\\frac{1}{2}\\right) = \\sqrt{\\pi}",
            examFrequency: "Appears in 80% of exams (6 Marks)"
          }
        ],
        formulas: [
          { name: "Beta in terms of Sine & Cosine", formula: "B(m, n) = 2 \\int_0^{\\pi/2} \\sin^{2m-1}\\theta \\cos^{2n-1}\\theta \\, d\\theta", whereUsed: "Definite trigonometric integrals" }
        ],
        solvedQuestions: [
          {
            question: "Evaluate ∫₀^{π/2} sin⁴ θ cos² θ dθ using Beta-Gamma functions.",
            marks: "6 Marks",
            solution: "1. Formula: ∫₀^{π/2} sin^p θ cos^q θ dθ = (1/2) B((p+1)/2, (q+1)/2). 2. Here p = 4, q = 2. 3. (p+1)/2 = 5/2, (q+1)/2 = 3/2. 4. Integral = (1/2) B(5/2, 3/2) = (1/2) [ Γ(5/2) Γ(3/2) ] / Γ(5/2 + 3/2) = (1/2) [ Γ(5/2) Γ(3/2) ] / Γ(4). 5. Γ(5/2) = (3/2)(1/2)√π = (3/4)√π. Γ(3/2) = (1/2)√π. Γ(4) = 3! = 6. 6. Integral = (1/2) · [ (3/4)√π · (1/2)√π ] / 6 = (1/2) · [ (3/8) π ] / 6 = (3/16 π) / 6 = π / 32.",
            keyPoints: ["State standard formula", "Box answer = π / 32"]
          }
        ],
        examinerTips: "Check if the function in Fourier series is even or odd before calculating integrals! If odd, immediately write a₀ = aₙ = 0 and save 15 minutes of exam time."
      }
    ]
  },

  // =========================================================================
  // SEMESTER 1 - C PROGRAMMING
  // =========================================================================
  {
    id: 'rev-c1',
    code: 'BCSE-008',
    subject: 'Computational and Problem Solving using C',
    semester: 'Semester 1',
    semNumber: 1,
    year: '1st Year',
    category: 'Computer Science',
    pageEstimate: '10 Pages Fast-Track Master',
    readTime: '25 Mins Cram',
    examWeightage: '100 Marks (Units 1-4)',
    pdfUrl: '/pdfs/BCSE001_C_Programming_Lab_Manual.pdf',
    downloadName: 'BCSE-008_C_Programming_Exam_Revision_Notes.pdf',
    fileSize: '3.6 MB',
    summary: 'High-yield revision digest for 4-stage C compilation pipeline, memory segmentation (Stack, Heap, Data, Code), storage classes, 2D array row-major addressing, pointers, dynamic memory allocation, structs, and file operations.',
    highlights: [
      'C Compilation Pipeline (Preprocess -> Compile -> Assemble -> Link)',
      'Memory Segmentation Layout: Text, Data, BSS, Heap, Stack',
      'Row-Major vs Column-Major 2D Array Address Offset Formula',
      'Dynamic Memory Allocation: malloc vs calloc vs realloc vs free'
    ],
    units: [
      {
        unitNum: 1,
        title: 'Compilation Pipeline & Program Architecture',
        weightage: '24 Marks',
        summary: 'Preprocessor, compiler, assembler, linker, loader, memory layout of a C program, and basic data types.',
        keyTheories: [
          {
            term: "4-Stage Compilation Pipeline",
            definition: "The process of converting source code (.c) into executable machine code (.exe/.out):",
            bulletPoints: [
              "1. Preprocessing (gcc -E): Macro expansion (#define), file inclusion (#include), conditional compilation (#ifdef), strips comments. Output: .i file.",
              "2. Compilation (gcc -S): Syntactic/semantic analysis, translates C to Assembly instructions. Output: .s file.",
              "3. Assembly (gcc -c): Translates assembly to relocatable binary machine object code. Output: .o/.obj file.",
              "4. Linking (gcc): Resolves external references, binds static/dynamic libraries (printf from libc). Output: executable binary."
            ]
          },
          {
            term: "C Process Memory Segmentation",
            definition: "Operating system divides RAM allocated to a C program into 5 distinct segments:",
            bulletPoints: [
              "1. Text / Code Segment: Read-only machine instructions. Prevents accidental modification.",
              "2. Initialized Data Segment (.data): Global & static variables initialized with non-zero values.",
              "3. Uninitialized Data Segment (.bss): Global & static variables initialized to zero by loader.",
              "4. Heap: Dynamically allocated memory (malloc/calloc). Grows UPWARD toward higher addresses.",
              "5. Stack: Local variables, function call stack frames (activation records). Grows DOWNWARD."
            ]
          }
        ],
        derivations: [],
        formulas: [
          { name: "2D Array Row-Major Addressing", formula: "\\text{Address}(A[i][j]) = B + [ (i - L_1) \\cdot C + (j - L_2) ] \\cdot W", whereUsed: "Finding byte address in 2D array" }
        ],
        solvedQuestions: [
          {
            question: "Given int A[10][20] starting at base address 2000 in row-major order with sizeof(int) = 4 bytes. Calculate address of A[5][12].",
            marks: "6 Marks",
            solution: "1. Formula: Addr(A[i][j]) = Base + (i × Total_Cols + j) × W. 2. Base = 2000, Total_Cols = 20, i = 5, j = 12, W = 4. 3. Offset = (5 × 20 + 12) = 100 + 12 = 112 elements. 4. Byte offset = 112 × 4 = 448 bytes. 5. Addr(A[5][12]) = 2000 + 448 = 2448.",
            keyPoints: ["State formula clearly", "Box answer: Address = 2448"]
          }
        ],
        examinerTips: "Always draw the memory stack diagram when explaining recursion or call by value vs call by reference!"
      },
      {
        unitNum: 2,
        title: 'Pointers, DMA & Storage Classes',
        weightage: '28 Marks',
        summary: 'Pointer arithmetic, pointers to pointers, storage classes (auto, register, static, extern), dynamic memory functions (malloc, calloc, realloc, free), memory leaks, and dangling pointers.',
        keyTheories: [
          {
            term: "Storage Classes in C",
            definition: "Defines the scope (visibility), lifetime (longevity), storage location, and default initial value of variables.",
            bulletPoints: [
              "auto: Stored in Stack; default value Garbage; local scope; destroyed on function exit.",
              "register: Stored in CPU registers; fast access; cannot use address operator &x; local scope.",
              "static: Stored in Data/BSS; default value 0; retains value between function calls.",
              "extern: Stored in Data/BSS; global scope across multiple files; declared with 'extern' keyword."
            ]
          },
          {
            term: "Dynamic Memory: malloc() vs calloc()",
            definition: "Allocates blocks of memory from the Heap segment at runtime.",
            bulletPoints: [
              "malloc(n * sizeof(int)): Allocates single contiguous block of specified bytes; leaves memory UNINITIALIZED (contains garbage).",
              "calloc(n, sizeof(int)): Allocates n blocks of specified size; INITIALIZES ALL BYTES TO ZERO.",
              "free(ptr): Deallocates heap memory. Failing to call free() causes a Memory Leak.",
              "Dangling Pointer: A pointer pointing to memory that has already been deallocated."
            ]
          }
        ],
        derivations: [],
        formulas: [],
        solvedQuestions: [
          {
            question: "Write a program in C to dynamically allocate an array of n integers using calloc, find their sum and average, and prevent memory leaks.",
            marks: "8 Marks",
            solution: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n, *arr, sum = 0;\n    printf(\"Enter size: \");\n    scanf(\"%d\", &n);\n    arr = (int*)calloc(n, sizeof(int));\n    if (arr == NULL) { printf(\"Memory allocation failed!\\n\"); return 1; }\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &arr[i]);\n        sum += arr[i];\n    }\n    printf(\"Sum = %d, Avg = %.2f\\n\", sum, (float)sum / n);\n    free(arr); // Prevent memory leak\n    arr = NULL; // Prevent dangling pointer\n    return 0;\n}",
            keyPoints: ["Check if arr == NULL", "Call free(arr) and set arr = NULL"]
          }
        ],
        examinerTips: "In code writing questions, always include null check `if (ptr == NULL)` after malloc/calloc and call `free(ptr); ptr = NULL;` at the end."
      }
    ]
  },

  // =========================================================================
  // SEMESTER 1 - FUNDAMENTALS OF AI & ML
  // =========================================================================
  {
    id: 'rev-aiml',
    code: 'BCSE-011',
    subject: 'Fundamentals of AI & ML',
    semester: 'Semester 1',
    semNumber: 1,
    year: '1st Year',
    category: 'Artificial Intelligence',
    pageEstimate: '9 Pages Fast-Track Master',
    readTime: '25 Mins Cram',
    examWeightage: '100 Marks (Units 1-4)',
    pdfUrl: '/AIML_Short_Notes_Exam_Ready.pdf',
    downloadName: 'BCSE-011_AIML_Exam_Revision_Notes.pdf',
    fileSize: '3.4 MB',
    summary: 'Comprehensive exam cram covering PEAS agent architecture, State Space Search, A* search and heuristic admissibility proofs, Propositional Logic & Resolution Refutation, Decision Trees ID3 (Entropy & Information Gain), and Apriori association mining.',
    highlights: [
      'PEAS Framework for Autonomous Driving, Medical Diagnosis & Vacuum Cleaner',
      'A* Evaluation Function f(n) = g(n) + h(n) & Admissibility Theorem (h(n) <= h*(n))',
      'Propositional Logic to Conjunctive Normal Form (CNF) & Resolution Proof',
      'Information Gain Calculation using Shannon Entropy: H(S) = -Σ p_i log₂(p_i)'
    ],
    units: [
      {
        unitNum: 1,
        title: 'Agents & Search Algorithms (A*, BFS, DFS)',
        weightage: '26 Marks',
        summary: 'Rational agents, PEAS classification, uninformed vs informed search, BFS/DFS, A* search, and heuristic admissibility.',
        keyTheories: [
          {
            term: "PEAS Framework",
            definition: "Standardized specification for an intelligent agent's environment: Performance measure, Environment, Actuators, and Sensors.",
            bulletPoints: [
              "Automated Taxi: P = Safe, fast, legal, comfortable trip; E = Roads, traffic, pedestrians, weather; A = Steering, accelerator, brakes, horn; S = Cameras, sonar, GPS, speedometer.",
              "Medical Diagnosis System: P = Healthy patient, minimized costs; E = Patient, hospital; A = Screen display, prescriptions; S = Symptoms, lab findings."
            ]
          },
          {
            term: "A* Search Algorithm",
            definition: "Best-first graph search algorithm that finds the least-cost path from start node to goal node using evaluation function f(n) = g(n) + h(n).",
            bulletPoints: [
              "g(n): Exact cost incurred so far from start node to current node n.",
              "h(n): Estimated heuristic cost from current node n to goal node.",
              "Admissible Heuristic: A heuristic is admissible if it NEVER overestimates the true cost to reach the goal: h(n) ≤ h*(n) for all n.",
              "Optimality: A* using tree search is optimal if h(n) is admissible. Using graph search, A* is optimal if h(n) is consistent (monotonic)."
            ]
          }
        ],
        derivations: [
          {
            title: "Proof of Optimality of A* Search under Admissible Heuristic",
            steps: [
              "1. Let G₂ be a suboptimal goal node on the OPEN list, so g(G₂) = f(G₂) > C* (optimal cost).",
              "2. Let G* be an optimal goal node with true cost C*.",
              "3. Since the optimal path exists, there must be some node n on the optimal path currently in OPEN.",
              "4. By definition: f(n) = g(n) + h(n).",
              "5. Since h is admissible, h(n) ≤ h*(n)  ⇒  f(n) ≤ g(n) + h*(n) = C*.",
              "6. Therefore: f(n) ≤ C* < f(G₂).",
              "7. Since A* always selects the node with the lowest f-value from OPEN, node n will always be expanded before suboptimal goal G₂.",
              "8. This guarantees A* will terminate with the optimal path before expanding any suboptimal goal."
            ],
            finalFormula: "h(n) \\le h^*(n) \\implies f(n) \\le C^* < f(G_2)",
            examFrequency: "Appears in 85% of semester exams (8 Marks)"
          }
        ],
        formulas: [
          { name: "A* Evaluation Function", formula: "f(n) = g(n) + h(n)", whereUsed: "Node expansion priority" }
        ],
        solvedQuestions: [
          {
            question: "Given a state space with Start S, intermediate nodes A, B, and Goal G. Edge costs: S->A: 2, S->B: 4, A->G: 5, B->G: 2. Heuristics: h(S)=6, h(A)=4, h(B)=2, h(G)=0. Show step-by-step A* search trace.",
            marks: "10 Marks",
            solution: "1. Start: Open = {S(f=0+6=6)}. Expand S. 2. Successors of S: A with g=2, f=2+4=6; B with g=4, f=4+2=6. Open = {A(6), B(6)}. 3. Expand A (tie-break): Successor G via A: g=2+5=7, f=7+0=7. Open = {B(6), G_from_A(7)}. 4. Expand B (lowest f=6): Successor G via B: g=4+2=6, f=6+0=6. Open = {G_from_B(6), G_from_A(7)}. 5. Expand G_from_B (f=6): Goal reached! Optimal path is S -> B -> G with total cost = 6.",
            keyPoints: ["Tabulate OPEN and CLOSED lists at every iteration", "State optimal path: S -> B -> G, cost = 6"]
          }
        ],
        examinerTips: "Always show the state of the OPEN list (priority queue) and CLOSED list at each step of A* trace."
      },
      {
        unitNum: 2,
        title: 'Machine Learning: Decision Trees & Apriori',
        weightage: '24 Marks',
        summary: 'Supervised vs unsupervised learning, Decision Tree induction (ID3), Shannon entropy, Information Gain, and Apriori association rule mining.',
        keyTheories: [
          {
            term: "Shannon Entropy & Information Gain (ID3)",
            definition: "Entropy measures the impurity or disorder of a dataset S. Information Gain measures the reduction in entropy achieved by partitioning on attribute A.",
            bulletPoints: [
              "Entropy: H(S) = -Σ p_i log₂(p_i). For pure binary set (all yes or all no), H(S) = 0. For maximum uncertainty (50-50), H(S) = 1.0.",
              "Information Gain: Gain(S, A) = H(S) - Σ [ (|S_v| / |S|) · H(S_v) ].",
              "ID3 chooses the attribute with the HIGHEST Information Gain as the decision node."
            ]
          }
        ],
        derivations: [],
        formulas: [
          { name: "Shannon Entropy", formula: "H(S) = -\\sum_{i=1}^c p_i \\log_2(p_i)", whereUsed: "Decision tree impurity metric" },
          { name: "Association Rule Confidence", formula: "\\text{Confidence}(A \\to B) = \\frac{\\text{Support}(A \\cup B)}{\\text{Support}(A)}", whereUsed: "Apriori market basket analysis" }
        ],
        solvedQuestions: [
          {
            question: "A dataset has 9 positive (Yes) and 5 negative (No) examples. Calculate the total Shannon Entropy H(S).",
            marks: "6 Marks",
            solution: "1. Total N = 9 + 5 = 14. 2. p_+ = 9/14 = 0.643; p_- = 5/14 = 0.357. 3. H(S) = - [ (9/14) log₂(9/14) + (5/14) log₂(5/14) ]. 4. log₂(0.643) = -0.637; log₂(0.357) = -1.486. 5. H(S) = - [ 0.643 × (-0.637) + 0.357 × (-1.486) ] = - [ -0.410 - 0.530 ] = 0.940 bits.",
            keyPoints: ["Show log base 2 conversions", "Box final answer: H(S) = 0.940 bits"]
          }
        ],
        examinerTips: "Remember that log₂(x) = ln(x) / ln(2) = ln(x) / 0.6931 on non-programming scientific calculators."
      }
    ]
  },

  // =========================================================================
  // SEMESTER 1 - WEB TECHNOLOGIES
  // =========================================================================
  {
    id: 'rev-webtech',
    code: 'BCSE-012',
    subject: 'Fundamentals of Web Technologies',
    semester: 'Semester 1',
    semNumber: 1,
    year: '1st Year',
    category: 'Computer Science',
    pageEstimate: '9 Pages Fast-Track Master',
    readTime: '20 Mins Cram',
    examWeightage: '100 Marks (Units 1-4)',
    pdfUrl: '/web_tech_notes.pdf',
    downloadName: 'BCSE-012_Web_Technologies_Exam_Revision_Notes.pdf',
    fileSize: '3.1 MB',
    summary: 'High-scoring revision notes for Internet vs WWW architecture, DNS resolution hierarchy, HTTP request-response cycles, semantic HTML5, HTML tables with rowspan/colspan, CSS3 Box Model, and responsive Flexbox layouts.',
    highlights: [
      'DNS Resolution Lifecycle (Browser -> OS Cache -> Recursive Resolver -> Root -> TLD -> Authoritative)',
      'HTTP vs HTTPS & SSL/TLS Handshake Stages',
      'HTML5 Semantic Blueprint (<header>, <nav>, <main>, <article>, <section>, <footer>)',
      'CSS Box Model: Content, Padding, Border, Margin & box-sizing: border-box'
    ],
    units: [
      {
        unitNum: 1,
        title: 'Internet & Web Architecture',
        weightage: '25 Marks',
        summary: 'Internet vs WWW, TCP/IP stack in web communications, DNS resolution process, HTTP methods, and status codes.',
        keyTheories: [
          {
            term: "DNS Resolution Lifecycle",
            definition: "The mechanism that translates human-readable domain names (e.g. mmumullana.org) into machine-routable IP addresses (e.g. 104.21.56.89).",
            bulletPoints: [
              "1. Browser & OS Cache: Checks local cache for recent lookup.",
              "2. Resolving Name Server (ISP/Recursive): Queries on client's behalf.",
              "3. Root Name Server (.): Directs query to top-level domain (.org).",
              "4. TLD Name Server: Directs to authoritative name server for domain.",
              "5. Authoritative Name Server: Returns final A/AAAA record with IP."
            ]
          },
          {
            term: "HTTP Status Code Families",
            definition: "3-digit integer responses returned by web servers indicating transaction outcomes:",
            bulletPoints: [
              "1xx (Informational): 100 Continue, 101 Switching Protocols.",
              "2xx (Success): 200 OK, 201 Created, 204 No Content.",
              "3xx (Redirection): 301 Moved Permanently, 302 Found, 304 Not Modified.",
              "4xx (Client Error): 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found.",
              "5xx (Server Error): 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable."
            ]
          }
        ],
        derivations: [],
        formulas: [],
        solvedQuestions: [
          {
            question: "Explain the CSS Box Model with a neat diagram. What is the difference between box-sizing: content-box and box-sizing: border-box?",
            marks: "8 Marks",
            solution: "1. The CSS Box Model wraps every HTML element in four layers from inside out: Content -> Padding -> Border -> Margin. 2. content-box (default): width and height apply ONLY to content. Adding 20px padding and 2px border increases the element's actual rendered width on the screen: Total = width + 2*padding + 2*border. 3. border-box: width and height INCLUDE padding and border. If width is 300px, padding and border shrink internal content space so the element NEVER exceeds 300px.",
            keyPoints: ["Draw 4 concentric rectangles labeled Content, Padding, Border, Margin", "Show formula for total width under both box-sizing values"]
          }
        ],
        examinerTips: "In HTML table questions, always remember: `rowspan` merges rows VERTICALLY downward, while `colspan` merges columns HORIZONTALLY rightward."
      }
    ]
  },

  // =========================================================================
  // SEMESTER 2 - APPLIED PHYSICS
  // =========================================================================
  {
    id: 'rev-physics',
    code: 'PHYS102',
    subject: 'Applied Physics (BPHY-001)',
    semester: 'Semester 2',
    semNumber: 2,
    year: '1st Year',
    category: 'Core Engineering',
    pageEstimate: '11 Pages Fast-Track Master',
    readTime: '30 Mins Cram',
    examWeightage: '100 Marks (Units 1-4)',
    pdfUrl: '/Applied_Physics_Exam_Revision_Sheet.pdf',
    downloadName: 'PHYS102_Applied_Physics_Exam_Revision_Notes.pdf',
    fileSize: '3.9 MB',
    summary: 'Essential university physics cram notes: Newton\'s rings derivations, Fraunhofer single slit diffraction, Ruby & He-Ne lasers, Maxwell\'s electromagnetic equations, skin depth, 1D Schrödinger box quantization, and cubic crystal APF derivations (SC, BCC, FCC).',
    highlights: [
      'Newton\'s Rings Diameter Derivation: D_n² = 4 n R λ (Dark Rings)',
      'Maxwell\'s 4 Field Equations in Differential & Integral Forms',
      'Schrödinger Time-Independent Wave Equation & 1D Box Energy Quantization',
      'Atomic Packing Factor (APF) Derivations: SC (52%), BCC (68%), FCC (74%)'
    ],
    units: [
      {
        unitNum: 1,
        title: 'Wave Optics & Lasers',
        weightage: '26 Marks',
        summary: 'Interference in thin films, Newton\'s rings, diffraction grating, stimulated emission, and He-Ne laser working principle.',
        keyTheories: [
          {
            term: "Newton's Rings by Reflected Light",
            definition: "Circular interference fringes formed when a plano-convex lens of large radius of curvature R rests on a flat glass plate, enclosing a wedge-shaped air film of thickness t.",
            bulletPoints: [
              "Path difference: Δ = 2t + λ/2 (due to Stokes' phase shift of π at denser medium reflection).",
              "Dark Rings Condition: 2t = nλ  ⇒  D_n² = 4 n R λ  ⇒  D_n ∝ √n.",
              "Bright Rings Condition: 2t = (2n - 1) λ/2  ⇒  D_n² = 2(2n - 1) R λ  ⇒  D_n ∝ √(2n - 1).",
              "Central spot is DARK because at point of contact t = 0, giving Δ = λ/2."
            ]
          }
        ],
        derivations: [
          {
            title: "Newton's Rings: Derivation of Ring Diameters & Wavelength λ",
            steps: [
              "1. Let R be the radius of curvature of the plano-convex lens and r_n be the radius of the n-th ring at air film thickness t.",
              "2. From circle geometry: r_n² = t (2R - t) ≈ 2R t  (since t << R  ⇒  t² is negligible).",
              "3. Therefore: 2t = r_n² / R.",
              "4. Condition for destructive interference (Dark Ring): 2t = nλ.",
              "5. Equating: r_n² / R = nλ  ⇒  r_n² = n R λ.",
              "6. Since diameter D_n = 2 r_n  ⇒  D_n² = 4 r_n² = 4 n R λ.",
              "7. For ring (n + p): D_{n+p}² = 4 (n + p) R λ.",
              "8. Subtracting: D_{n+p}² - D_n² = 4 p R λ  ⇒  λ = (D_{n+p}² - D_n²) / (4 p R)."
            ],
            finalFormula: "D_n = 2\\sqrt{n R \\lambda}, \\quad \\lambda = \\frac{D_{n+p}^2 - D_n^2}{4 p R}",
            examFrequency: "Appears in 90% of semester exams (10 Marks)"
          }
        ],
        formulas: [
          { name: "Single Slit Diffraction Minima", formula: "a \\sin\\theta = n \\lambda \\quad (n = 1, 2, 3...)", whereUsed: "Fraunhofer diffraction" },
          { name: "Diffraction Grating Principal Maxima", formula: "(a + b) \\sin\\theta = n \\lambda", whereUsed: "Grating equation" }
        ],
        solvedQuestions: [
          {
            question: "In a Newton's rings experiment, the diameter of the 4th dark ring is 4.0 mm and the diameter of the 12th dark ring is 7.0 mm. If R = 1.0 m, calculate the wavelength of light used.",
            marks: "8 Marks",
            solution: "1. Formula: λ = (D_{n+p}² - D_n²) / (4 p R). 2. n = 4, n+p = 12  ⇒  p = 8. 3. D₄ = 4.0 mm = 4.0 × 10⁻³ m  ⇒  D₄² = 16 × 10⁻⁶ m². 4. D₁₂ = 7.0 mm = 7.0 × 10⁻³ m  ⇒  D₁₂² = 49 × 10⁻⁶ m². 5. D₁₂² - D₄² = (49 - 16) × 10⁻⁶ = 33 × 10⁻⁶ m². 6. Denominator = 4 × p × R = 4 × 8 × 1.0 = 32 m. 7. λ = (33 × 10⁻⁶) / 32 = 1.031 × 10⁻⁶ m = 10312 Å.",
            keyPoints: ["Show D_{n+p}² - D_n² step", "State units in both meters and Angstroms (Å)"]
          }
        ],
        examinerTips: "Remember that the central fringe in Newton's rings by reflected light is always DARK. If asked about transmitted light, the central fringe is BRIGHT."
      },
      {
        unitNum: 2,
        title: 'Electromagnetic Theory & Maxwell\'s Equations',
        weightage: '24 Marks',
        summary: 'Displacement current, Maxwell\'s 4 equations in differential/integral forms, electromagnetic wave equation in vacuum, Poynting vector, and skin depth in conductors.',
        keyTheories: [
          {
            term: "Displacement Current (Maxwell's Contribution)",
            definition: "Maxwell modified Ampere's Circuital Law by introducing displacement current density J_d = ∂D/∂t = ε₀ (∂E/∂t) to satisfy the equation of continuity in time-varying fields.",
            bulletPoints: [
              "Total Current Density: J_total = J_c + J_d = σ E + ε₀ (∂E/∂t).",
              "Ensures current continuity through capacitors during charging/discharging."
            ]
          }
        ],
        derivations: [],
        formulas: [
          { name: "Maxwell's Equations (Differential)", formula: "\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}, \\quad \\nabla \\cdot \\mathbf{B} = 0, \\quad \\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}, \\quad \\nabla \\times \\mathbf{B} = \\mu_0 \\mathbf{J} + \\mu_0 \\varepsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}", whereUsed: "Core EM field relationships" },
          { name: "Skin Depth in Conductors", formula: "\\delta = \\sqrt{\\frac{2}{\\omega \\mu \\sigma}} = \\frac{1}{\\sqrt{\\pi f \\mu \\sigma}}", whereUsed: "High-frequency signal attenuation" }
        ],
        solvedQuestions: [
          {
            question: "State Maxwell's four equations in differential form and explain the physical significance of each.",
            marks: "10 Marks",
            solution: "1. ∇·E = ρ/ε₀ (Gauss's Law for Electrostatics): Electric field lines originate from positive charges and terminate on negative charges; isolated electric charges exist. 2. ∇·B = 0 (Gauss's Law for Magnetism): Magnetic flux through any closed surface is zero; isolated magnetic monopoles do not exist. 3. ∇×E = -∂B/∂t (Faraday's Law of EM Induction): A time-varying magnetic field generates a spatially circulating electric field. 4. ∇×B = μ₀J + μ₀ε₀(∂E/∂t) (Ampere-Maxwell Law): Magnetic fields are produced by both conduction currents and time-varying electric fields.",
            keyPoints: ["Write both equations and physical significance", "Mention displacement current term in 4th equation"]
          }
        ],
        examinerTips: "In Maxwell's equations question, write both the mathematical equation and its plain-English physical interpretation to guarantee full 10/10 marks."
      }
    ]
  },

  // =========================================================================
  // SEMESTER 2 - PYTHON PROGRAMMING
  // =========================================================================
  {
    id: 'rev-python',
    code: 'BCSE-004',
    subject: 'Python Programming',
    semester: 'Semester 2',
    semNumber: 2,
    year: '1st Year',
    category: 'Computer Science',
    pageEstimate: '9 Pages Fast-Track Master',
    readTime: '20 Mins Cram',
    examWeightage: '100 Marks (Units 1-4)',
    pdfUrl: '/Python_Programming_Exam_Revision_Sheet.pdf',
    downloadName: 'BCSE-004_Python_Exam_Revision_Notes.pdf',
    fileSize: '3.2 MB',
    summary: 'Balanced exam revision digest for CPython execution model, LEGB scope, list vs tuple vs dictionary hash tables, file handling context managers, OOP inheritance, and C3 Linearization MRO.',
    highlights: [
      'CPython Compiler & Python Virtual Machine (PVM) Execution Architecture',
      'LEGB Variable Scope Hierarchy (Local, Enclosing, Global, Built-in)',
      'List (Dynamic Array) vs Dictionary (Hash Table Bucket Chaining)',
      'Object-Oriented Programming: Multiple Inheritance & C3 MRO (Method Resolution Order)'
    ],
    units: [
      {
        unitNum: 1,
        title: 'Core Python, Data Types & Control Flow',
        weightage: '25 Marks',
        summary: 'CPython bytecode execution, mutable vs immutable types, list comprehensions, slicing, functions, and LEGB scope.',
        keyTheories: [
          {
            term: "Mutable vs Immutable Objects in Python",
            definition: "Everything in Python is an object stored in the heap with a reference in the variable name table.",
            bulletPoints: [
              "Immutable (Cannot be modified in place): int, float, str, tuple, frozenset. Modifying creates a NEW object with a new id().",
              "Mutable (Can be modified in place): list, dict, set, bytearray. Modifications retain the original id() reference."
            ]
          },
          {
            term: "LEGB Scope Resolution Rule",
            definition: "When a variable is referenced, Python searches namespaces in exact hierarchical order: Local -> Enclosing -> Global -> Built-in.",
            bulletPoints: [
              "Local (L): Defined inside current function.",
              "Enclosing (E): In outer enclosing functions (closures).",
              "Global (G): Defined at top module level (override with 'global' keyword).",
              "Built-in (B): Preloaded built-ins like len, range, print."
            ]
          }
        ],
        derivations: [],
        formulas: [],
        solvedQuestions: [
          {
            question: "Explain the difference between shallow copy and deep copy in Python with code examples.",
            marks: "8 Marks",
            solution: "1. Shallow Copy (copy.copy): Creates a new outer container object, but inserts references to the original nested child objects. Modifying a nested list in the copy WILL affect the original list. 2. Deep Copy (copy.deepcopy): Recursively creates a new outer container AND completely new copies of all nested objects. Modifying any child element in the copy NEVER affects the original.",
            keyPoints: ["Show import copy", "Demonstrate with nested list [[1, 2], [3, 4]]"]
          }
        ],
        examinerTips: "When writing Python code in exams, indent by 4 spaces clearly. Python has no curly braces, so examiners grade syntax based on visual indentation!"
      }
    ]
  },

  // =========================================================================
  // SEMESTER 2 - DATA STRUCTURES
  // =========================================================================
  {
    id: 'rev-dsa',
    code: 'BCSE-007',
    subject: 'Data Structures',
    semester: 'Semester 2',
    semNumber: 2,
    year: '1st Year',
    category: 'Computer Science',
    pageEstimate: '11 Pages Fast-Track Master',
    readTime: '30 Mins Cram',
    examWeightage: '100 Marks (Units 1-4)',
    pdfUrl: '/Data_Structures_Exam_Revision_Sheet.pdf',
    downloadName: 'BCSE-007_Data_Structures_Exam_Revision_Notes.pdf',
    fileSize: '4.1 MB',
    summary: 'Comprehensive exam cram covering Asymptotic notation (Big-O, Omega, Theta), 1D/2D array address mapping, Stack LIFO & Shunting-Yard infix to postfix conversion, Circular Queues, Linked Lists pointer rewiring, Binary Search Trees (3-case deletion), and Graph BFS/DFS.',
    highlights: [
      'Master Complexity Comparison Matrix (Bubble, Insertion, Merge, Quick, Heap)',
      'Stack Applications: Infix to Postfix Conversion & Postfix Evaluation Algorithm',
      'Circular Queue Modulo Arithmetic: Front = (Front + 1) % Max, Rear = (Rear + 1) % Max',
      'Binary Search Tree (BST) 3-Case Deletion with Inorder Successor'
    ],
    units: [
      {
        unitNum: 1,
        title: 'Arrays, Searching & Sorting',
        weightage: '24 Marks',
        summary: 'Asymptotic notation, Row/Column-major 2D addressing, Linear/Binary Search, and Sorting comparison (Bubble, Insertion, Merge, Quick).',
        keyTheories: [
          {
            term: "Asymptotic Notation Definitions",
            definition: "Mathematical frameworks to describe algorithm growth rates as input size n -> ∞.",
            bulletPoints: [
              "Big-O (O): Asymptotic upper bound. f(n) = O(g(n)) iff 0 ≤ f(n) ≤ c · g(n) for all n ≥ n₀. Worst-case benchmark.",
              "Big-Omega (Ω): Asymptotic lower bound. f(n) = Ω(g(n)) iff 0 ≤ c · g(n) ≤ f(n) for all n ≥ n₀. Best-case benchmark.",
              "Big-Theta (Θ): Asymptotic tight bound. f(n) = Θ(g(n)) iff c₁ · g(n) ≤ f(n) ≤ c₂ · g(n) for all n ≥ n₀."
            ]
          }
        ],
        derivations: [],
        formulas: [
          { name: "Binary Search Complexity", formula: "T(n) = T(n/2) + O(1) \\implies T(n) = O(\\log_2 n)", whereUsed: "Sorted array searching" }
        ],
        solvedQuestions: [
          {
            question: "Convert the infix expression: (A + B * C) / (D - E ^ F) into its equivalent postfix expression using a stack. Show tabular trace.",
            marks: "10 Marks",
            solution: "Operator precedence: ^ (highest, R-to-L) > *, / (medium, L-to-R) > +, - (lowest, L-to-R). Tabular trace shows tokens: ( -> stack; A -> output; + -> stack; B -> output; * -> stack; C -> output; ) -> pop * and + to output; / -> stack; ( -> stack; D -> output; - -> stack; E -> output; ^ -> stack; F -> output; ) -> pop ^ and -; End of string -> pop /. Final Postfix: A B C * + D E F ^ - /.",
            keyPoints: ["Tabulate Token, Stack, and Postfix Output columns", "Box final postfix: A B C * + D E F ^ - /"]
          }
        ],
        examinerTips: "In infix to postfix questions, ALWAYS show the 3-column table: [Token Read | Stack Contents | Output String]. Never jump directly to the final answer!"
      },
      {
        unitNum: 2,
        title: 'Trees & BST 3-Case Deletion',
        weightage: '26 Marks',
        summary: 'Tree terminology, Binary Trees, Preorder/Inorder/Postorder traversals, BST insertion, search, and 3-case node deletion.',
        keyTheories: [
          {
            term: "BST 3-Case Deletion Algorithm",
            definition: "When deleting node z with key k from a Binary Search Tree:",
            bulletPoints: [
              "Case 1 (Node has NO children / Leaf): Simply delete node z and set parent's pointer to NULL.",
              "Case 2 (Node has EXACTLY ONE child): Splice out z by linking z's parent directly to z's child.",
              "Case 3 (Node has TWO children): Find z's Inorder Successor y (minimum key in z's right subtree). Copy y's key into z. Then recursively delete y (which will fall into Case 1 or Case 2)."
            ]
          }
        ],
        derivations: [],
        formulas: [],
        solvedQuestions: [
          {
            question: "Construct a Binary Search Tree (BST) by inserting the following keys sequentially: 50, 30, 70, 20, 40, 60, 80. Then delete node 50.",
            marks: "10 Marks",
            solution: "1. Insert: Root 50; 30 left of 50, 70 right of 50; 20 left of 30, 40 right of 30; 60 left of 70, 80 right of 70. 2. Inorder traversal: 20, 30, 40, 50, 60, 70, 80. 3. Delete 50 (Case 3: node has 2 children). Inorder successor of 50 is the minimum node in right subtree = 60. 4. Replace 50 with 60. Delete 60 from right subtree (Case 1: leaf). Resulting root is 60 with left child 30 and right child 70.",
            keyPoints: ["Draw initial tree and tree after deletion", "State inorder successor used = 60"]
          }
        ],
        examinerTips: "Remember that Inorder Traversal of ANY valid Binary Search Tree ALWAYS produces a strictly sorted ascending sequence!"
      }
    ]
  },

  // =========================================================================
  // SEMESTERS 3 TO 8 CORE SUBJECTS
  // =========================================================================
  {
    id: 'rev-dld',
    code: 'CS302',
    subject: 'Digital Logic & Computer Design',
    semester: 'Semester 3',
    semNumber: 3,
    year: '2nd Year',
    category: 'Computer Science',
    pageEstimate: '9 Pages Fast-Track Master',
    readTime: '25 Mins Cram',
    examWeightage: '100 Marks',
    pdfUrl: '/CS302_Digital_Logic_and_Design_Short_Notes.pdf',
    downloadName: 'CS302_Digital_Logic_Exam_Revision_Notes.pdf',
    fileSize: '3.1 MB',
    summary: 'High-yield exam review covering Boolean minimization, Karnaugh Maps (K-Maps) up to 4 variables, Adders (Half, Full, CLA), Multiplexers, Flip-Flops (SR, JK, D, T), and synchronous counters.',
    highlights: [
      '4-Variable K-Map Grouping Rules (Octets, Quads, Pairs) with Don\'t Care Terms',
      'Carry Look-Ahead (CLA) Adder Equations: G_i = A_i B_i, P_i = A_i ⊕ B_i',
      'Flip-Flop Characteristic Equations: JK (Q+ = J Q\' + K\' Q), T (Q+ = T ⊕ Q)',
      'Synchronous 3-Bit Up/Down Binary Counter Design State Table'
    ],
    units: [
      {
        unitNum: 1,
        title: 'Boolean Minimization & Combinational Circuits',
        weightage: '28 Marks',
        summary: 'K-Maps, Quine-McCluskey, Full Adder, Subtractor, Decoders, Encoders, and Multiplexers.',
        keyTheories: [
          {
            term: "K-Map Grouping Principles",
            definition: "Graphical minimization method mapping minterms onto a Gray code grid.",
            bulletPoints: [
              "Group sizes must be powers of 2 (1, 2, 4, 8, 16).",
              "Always prioritize largest group (Octet over Quad, Quad over Pair).",
              "Don't Care terms (X) may be treated as 1 to enlarge groups or 0 to ignore."
            ]
          }
        ],
        derivations: [],
        formulas: [
          { name: "Full Adder Sum & Carry", formula: "S = A \\oplus B \\oplus C_{in}, \\quad C_{out} = A B + B C_{in} + A C_{in}", whereUsed: "Arithmetic logic design" }
        ],
        solvedQuestions: [],
        examinerTips: "Always look for corner cells (cells 0, 2, 8, 10) in a 4-variable K-Map! They form a valid Quad group that many students miss."
      }
    ]
  },
  {
    id: 'rev-os',
    code: 'CS401',
    subject: 'Operating Systems',
    semester: 'Semester 4',
    semNumber: 4,
    year: '2nd Year',
    category: 'Systems & Networks',
    pageEstimate: '10 Pages Fast-Track Master',
    readTime: '25 Mins Cram',
    examWeightage: '100 Marks',
    pdfUrl: '/CS401_Operating_Systems_Short_Notes.pdf',
    downloadName: 'CS401_Operating_Systems_Exam_Revision_Notes.pdf',
    fileSize: '3.5 MB',
    summary: 'Essential OS cram notes: CPU scheduling algorithms (FCFS, SJF, SRTF, RR), Peterson\'s solution, Semaphores, Banker\'s Algorithm for deadlock avoidance, Paging, Page replacement (FIFO, LRU, Optimal), and Disk Scheduling.',
    highlights: [
      'CPU Scheduling Turnaround Time (TAT = CT - AT) and Waiting Time (WT = TAT - BT)',
      'Banker\'s Algorithm Safety State Vector Equation: Need = Max - Allocation',
      'Paging Address Translation: EMAT = h(t_tlb + t_m) + (1 - h)(t_tlb + 2 t_m)',
      'Page Fault Algorithms: Optimal vs LRU vs FIFO (Belady\'s Anomaly)'
    ],
    units: [
      {
        unitNum: 1,
        title: 'CPU Scheduling, Synchronization & Deadlocks',
        weightage: '30 Marks',
        summary: 'Gantt charts, Preemptive vs Non-preemptive scheduling, Critical Section problem, Semaphores, and Banker\'s algorithm.',
        keyTheories: [
          {
            term: "Banker's Algorithm for Deadlock Avoidance",
            definition: "Tests whether granting a resource request leaves the system in a 'Safe State' by simulating allocation against remaining resource Needs.",
            bulletPoints: [
              "Need Matrix: Need[i][j] = Max[i][j] - Allocation[i][j].",
              "A state is SAFE if there exists a safe execution sequence <P₁, P₂, ... P_n> such that for each P_i, Need_i ≤ Available + Σ Alloc_prior."
            ]
          }
        ],
        derivations: [],
        formulas: [
          { name: "Effective Memory Access Time (EMAT)", formula: "\\text{EMAT} = h(t_{\\text{tlb}} + t_m) + (1 - h)(t_{\\text{tlb}} + 2 t_m)", whereUsed: "Virtual memory paging analysis" }
        ],
        solvedQuestions: [],
        examinerTips: "In CPU scheduling questions, ALWAYS draw the Gantt chart clearly with timestamps beneath each segment. Examiners verify the chart before checking numerical answers."
      }
    ]
  },
  {
    id: 'rev-dbms',
    code: 'CS402',
    subject: 'Database Management Systems',
    semester: 'Semester 4',
    semNumber: 4,
    year: '2nd Year',
    category: 'Computer Science',
    pageEstimate: '10 Pages Fast-Track Master',
    readTime: '25 Mins Cram',
    examWeightage: '100 Marks',
    pdfUrl: '/CS402_Database_Management_Systems_Short_Notes.pdf',
    downloadName: 'CS402_DBMS_Exam_Revision_Notes.pdf',
    fileSize: '3.4 MB',
    summary: 'Comprehensive exam digest for Relational Algebra, SQL queries, Functional Dependencies, Canonical Cover, Normalization (1NF, 2NF, 3NF, BCNF), Lossless Join decomposition, ACID properties, Conflict Serializability, and B+ Trees.',
    highlights: [
      'Attribute Closure Algorithm X⁺ for finding Candidate Keys',
      'Normalization Hierarchy: 1NF (atomic) -> 2NF (no partial FD) -> 3NF (no transitive FD) -> BCNF (LHS is superkey)',
      'Lossless Join Decomposition Test: R₁ ∩ R₂ -> R₁ or R₁ ∩ R₂ -> R₂',
      'ACID Properties: Atomicity (WAL), Consistency, Isolation (2PL), Durability'
    ],
    units: [
      {
        unitNum: 1,
        title: 'Relational Design & Normalization',
        weightage: '28 Marks',
        summary: 'ER modeling, relational algebra operators, functional dependencies, and normal forms.',
        keyTheories: [
          {
            term: "Normal Forms Definitions (1NF to BCNF)",
            definition: "Rules to eliminate data redundancy and insertion/update/deletion anomalies:",
            bulletPoints: [
              "1NF: All attribute values must be atomic (no multi-valued or composite attributes).",
              "2NF: Must be in 1NF and NO non-prime attribute is partially dependent on any candidate key.",
              "3NF: Must be in 2NF and for every non-trivial FD X -> Y, either X is a superkey OR Y is a prime attribute.",
              "BCNF (Boyce-Codd): For every non-trivial FD X -> Y, X MUST be a superkey."
            ]
          }
        ],
        derivations: [],
        formulas: [],
        solvedQuestions: [],
        examinerTips: "To prove a decomposition is lossless, simply check if the common attributes (R₁ ∩ R₂) form a candidate key for either R₁ or R₂."
      }
    ]
  },
  {
    id: 'rev-cn',
    code: 'CS501',
    subject: 'Computer Networks',
    semester: 'Semester 5',
    semNumber: 5,
    year: '3rd Year',
    category: 'Systems & Networks',
    pageEstimate: '10 Pages Fast-Track Master',
    readTime: '25 Mins Cram',
    examWeightage: '100 Marks',
    pdfUrl: '/CS501_Computer_Networks_Short_Notes.pdf',
    downloadName: 'CS501_Computer_Networks_Exam_Revision_Notes.pdf',
    fileSize: '3.6 MB',
    summary: 'Essential networking cram notes: OSI vs TCP/IP layers, CRC error checking, Sliding Window protocols (Go-Back-N, Selective Repeat), IPv4 CIDR subnetting, Distance Vector & Link State routing, TCP 3-way handshake, and TCP Congestion Control (Slow Start, AIMD).',
    highlights: [
      'Sliding Window Efficiency: Stop-and-Wait η = 1 / (1 + 2a), where a = T_prop / T_trans',
      'CRC Polynomial Division for Error Detection Frame Check Sequence (FCS)',
      'CIDR IPv4 Subnetting & Network/Broadcast Address Calculations',
      'TCP Congestion Window Phases: Slow Start (exponential) & Congestion Avoidance (linear)'
    ],
    units: [
      {
        unitNum: 1,
        title: 'Data Link & Network Protocols',
        weightage: '28 Marks',
        summary: 'Framing, error control, flow control, routing algorithms, and IPv4 addressing.',
        keyTheories: [
          {
            term: "Go-Back-N vs Selective Repeat",
            definition: "Sliding window protocols for reliable transmission over noisy channels.",
            bulletPoints: [
              "Go-Back-N (GBN): Sender window W_s = 2^m - 1, Receiver window W_r = 1. If a frame is lost, receiver discards all subsequent out-of-order frames; sender retransmits entire window.",
              "Selective Repeat (SR): W_s = W_r = 2^{m-1}. Receiver has buffers to accept out-of-order frames; sender retransmits ONLY the lost frame."
            ]
          }
        ],
        derivations: [],
        formulas: [
          { name: "Minimum Frame Size in CSMA/CD", formula: "L_{\\min} = 2 \\cdot R \\cdot T_{\\text{prop}}", whereUsed: "Ethernet collision detection constraint" }
        ],
        solvedQuestions: [],
        examinerTips: "In IPv4 subnetting questions, the first address (all host bits 0) is the Network ID, and the last address (all host bits 1) is the Directed Broadcast Address. Neither can be assigned to a host!"
      }
    ]
  },
  {
    id: 'rev-cloud',
    code: 'CS701',
    subject: 'Cloud Computing & Distributed Systems',
    semester: 'Semester 7',
    semNumber: 7,
    year: '4th Year',
    category: 'Computer Science',
    pageEstimate: '9 Pages Fast-Track Master',
    readTime: '20 Mins Cram',
    examWeightage: '100 Marks',
    pdfUrl: '#',
    downloadName: 'CS701_Cloud_Computing_Exam_Revision_Notes.pdf',
    fileSize: '3.0 MB',
    summary: 'Cloud delivery models (IaaS, PaaS, SaaS), Type-1 vs Type-2 Hypervisors, Containerization (Docker vs VMs), Kubernetes architecture (Control Plane & Worker Nodes), CAP theorem, and Cloud Security.',
    highlights: [
      'NIST Cloud Characteristics: On-demand self-service, broad network access, resource pooling, rapid elasticity, measured service',
      'Type 1 (Bare-Metal) vs Type 2 (Hosted) Hypervisor Architecture',
      'Kubernetes Control Plane Components: API Server, etcd, Scheduler, Controller Manager',
      'Brewer\'s CAP Theorem: Consistency, Availability, Partition Tolerance (Pick 2)'
    ],
    units: [],
    examinerTips: "In CAP Theorem, explain why partition tolerance (P) is unavoidable in real distributed networks, meaning you must choose between CP and AP."
  },
  {
    id: 'rev-m2',
    code: 'BMAT-002',
    subject: 'Mathematics II',
    semester: 'Semester 2',
    semNumber: 2,
    year: '1st Year',
    category: 'Mathematics',
    pageEstimate: '10 Pages Fast-Track Master',
    readTime: '25 Mins Cram',
    examWeightage: '100 Marks',
    pdfUrl: '#',
    downloadName: 'BMAT-002_Mathematics_II_Exam_Revision_Notes.pdf',
    fileSize: '3.7 MB',
    summary: 'Ordinary Differential Equations of higher order with constant coefficients, Cauchy-Euler equations, Laplace Transforms & inverse transforms, Vector Calculus (Gradient, Divergence, Curl, Stokes & Gauss theorems), and Complex Analysis.',
    highlights: [
      'Higher-Order Linear ODE with Constant Coefficients: CF and PI Shortcuts',
      'Laplace Transform Table & Initial/Final Value Theorems: L{f\'(t)} = s F(s) - f(0)',
      'Vector Integral Theorems: Green\'s, Gauss Divergence & Stokes\' Theorem Equations',
      'Cauchy-Riemann Equations in Cartesian & Polar Coordinates: u_x = v_y, u_y = -v_x'
    ],
    units: [
      {
        unitNum: 1,
        title: 'Ordinary Differential Equations & Applications',
        weightage: '26 Marks',
        summary: 'Complementary functions (CF), Particular integrals (PI) for e^{ax}, sin(ax), x^m, Cauchy-Euler homogeneous equations, and variation of parameters.',
        keyTheories: [
          {
            term: "Cauchy-Euler Differential Equation",
            definition: "Equations of the form a₀ xⁿ (dⁿy/dxⁿ) + a₁ x^{n-1} (d^{n-1}y/dx^{n-1}) + ... + a_n y = X. Solved by substituting x = e^z (z = ln x) and x (d/dx) = D, x² (d²/dx²) = D(D-1).",
            bulletPoints: [
              "Transforms variable-coefficient ODE into constant-coefficient ODE in variable z.",
              "After finding general solution in z, substitute back z = ln x."
            ]
          }
        ],
        derivations: [],
        formulas: [
          { name: "Particular Integral Shortcuts", formula: "PI = \\frac{1}{f(D)} e^{ax} = \\frac{e^{ax}}{f(a)} \\quad (f(a) \\ne 0)", whereUsed: "Linear ODE solutions" }
        ],
        solvedQuestions: [],
        examinerTips: "If f(a) = 0 in PI for e^{ax}, use the rule: PI = x · [e^{ax} / f'(a)]. Multiply by x and differentiate the operator D!"
      }
    ],
    examinerTips: "In Laplace transform of derivatives, never forget the initial conditions f(0) and f'(0)."
  },
  {
    id: 'rev-env',
    code: 'BENV-001',
    subject: 'Environmental Studies & Disaster Management',
    semester: 'Semester 2',
    semNumber: 2,
    year: '1st Year',
    category: 'Core Engineering',
    pageEstimate: '8 Pages Fast-Track Master',
    readTime: '20 Mins Cram',
    examWeightage: '100 Marks',
    pdfUrl: '#',
    downloadName: 'BENV-001_EVS_Exam_Revision_Notes.pdf',
    fileSize: '2.8 MB',
    summary: 'Ecosystem structure, energy flow (10% law), ecological pyramids, biodiversity hotspots in India, air/water pollution acts, greenhouse effect, climate change protocols, and disaster mitigation.',
    highlights: [
      'Ecological Pyramids (Number, Biomass, Energy) & 10% Energy Transfer Law',
      'Biodiversity Hotspots: Western Ghats, Eastern Himalayas, Indo-Burma',
      'Air & Water Pollution Parameters: BOD, COD, Eutrophication, PM2.5',
      'Disaster Management Cycle: Mitigation, Preparedness, Response, Recovery'
    ],
    units: [],
    examinerTips: "Always draw the ecological pyramid diagrams and explain why the Pyramid of Energy is ALWAYS upright."
  },
  {
    id: 'rev-eg',
    code: 'BME-002',
    subject: 'Engineering Graphics & Design',
    semester: 'Semester 2',
    semNumber: 2,
    year: '1st Year',
    category: 'Core Engineering',
    pageEstimate: '8 Pages Fast-Track Master',
    readTime: '20 Mins Cram',
    examWeightage: '100 Marks',
    pdfUrl: '#',
    downloadName: 'BME-002_Engineering_Graphics_Exam_Revision_Notes.pdf',
    fileSize: '3.1 MB',
    summary: 'Engineering scales (Plain, Diagonal), Conic sections (Eccentricity method), First-angle vs Third-angle projection, projections of points, lines, planes, and solids, and isometric views.',
    highlights: [
      'Representative Fraction (RF) = Distance on Drawing / Actual Distance',
      'First Angle (Object between Observer & Plane) vs Third Angle Projection',
      'True Length (TL) and True Inclination (θ, φ) of Straight Lines in 3D',
      'Isometric Scale Factor: Isometric Length = √(2/3) × True Length ≈ 0.816 × TL'
    ],
    units: [],
    examinerTips: "Remember that Indian standard (BIS) strictly mandates FIRST ANGLE PROJECTION (top view below front view)."
  },
  {
    id: 'rev-dsa-adv',
    code: 'CS301',
    subject: 'Data Structures & Algorithms (Advanced)',
    semester: 'Semester 3',
    semNumber: 3,
    year: '2nd Year',
    category: 'Computer Science',
    pageEstimate: '10 Pages Fast-Track Master',
    readTime: '25 Mins Cram',
    examWeightage: '100 Marks',
    pdfUrl: '#',
    downloadName: 'CS301_Advanced_DSA_Exam_Revision_Notes.pdf',
    fileSize: '3.5 MB',
    summary: 'Balanced search trees (AVL rotations LL/RR/LR/RL, Red-Black properties, B-Trees), Divide and Conquer recurrences (Master Theorem), Greedy method (Huffman Coding, Fractional Knapsack), Dynamic Programming (0/1 Knapsack, LCS), and Graph algorithms (Dijkstra, Prim/Kruskal MST).',
    highlights: [
      'AVL Tree Balance Factor: BF = Height(Left) - Height(Right) ∈ {-1, 0, +1}',
      'Master Theorem for Recurrences: T(n) = a T(n/b) + f(n) 3-Case Decision',
      'Dynamic Programming: 0/1 Knapsack Recurrence vs Fractional Greedy Knapsack',
      'Single-Source Shortest Path: Dijkstra (Non-negative) vs Bellman-Ford (Negative edges)'
    ],
    units: [],
    examinerTips: "In Master Theorem, verify if f(n) grows polynomially faster or slower than n^{log_b a}."
  },
  {
    id: 'rev-ai-ml',
    code: 'CS601',
    subject: 'Artificial Intelligence & Machine Learning',
    semester: 'Semester 6',
    semNumber: 6,
    year: '3rd Year',
    category: 'Computer Science',
    pageEstimate: '10 Pages Fast-Track Master',
    readTime: '25 Mins Cram',
    examWeightage: '100 Marks',
    pdfUrl: '#',
    downloadName: 'CS601_AIML_Exam_Revision_Notes.pdf',
    fileSize: '3.6 MB',
    summary: 'Heuristic game search (Minimax & Alpha-Beta Pruning), Linear & Logistic Regression gradient descent, Support Vector Machines (Maximum Margin Hyperplane & Kernels), Neural Networks Backpropagation, and K-Means Clustering.',
    highlights: [
      'Alpha-Beta Pruning Rules: α (max lower bound), β (min upper bound) Prune when α ≥ β',
      'Logistic Sigmoid Hypothesis: h_θ(x) = 1 / (1 + e^{-θ^T x}) & Cross-Entropy Loss',
      'SVM Optimization: Maximize Margin 2 / ||w|| subject to y_i (w^T x_i + b) ≥ 1',
      'Artificial Neural Network: Multi-layer Perceptron Backpropagation Chain Rule'
    ],
    units: [],
    examinerTips: "In Alpha-Beta pruning, demonstrate cutoffs clearly with dashed lines through pruned subtrees."
  },
  {
    id: 'rev-devops',
    code: 'CS801',
    subject: 'DevOps Engineering & CI/CD Pipelines',
    semester: 'Semester 8',
    semNumber: 8,
    year: '4th Year',
    category: 'Computer Science',
    pageEstimate: '9 Pages Fast-Track Master',
    readTime: '20 Mins Cram',
    examWeightage: '100 Marks',
    pdfUrl: '#',
    downloadName: 'CS801_DevOps_Exam_Revision_Notes.pdf',
    fileSize: '2.9 MB',
    summary: 'DevOps lifecycle, Git branching models, Continuous Integration & Continuous Deployment (CI/CD) pipelines, Infrastructure as Code (Terraform), Container orchestration, and SRE observability (SLI, SLO, SLA, Error Budgets).',
    highlights: [
      'DevOps Infinite Loop: Plan -> Code -> Build -> Test -> Release -> Deploy -> Operate -> Monitor',
      'CI/CD Pipeline Stages: Lint -> Test -> Build -> Dockerize -> Deploy -> Healthcheck',
      'Infrastructure as Code (IaC): Declarative (Terraform) vs Imperative (Ansible)',
      'SRE Metrics: SLI (Indicator), SLO (Internal Target), SLA (Contractual Agreement)'
    ],
    units: [],
    examinerTips: "Use the classic horizontal pipeline flow diagram when explaining CI/CD stages in university exams."
  }
];

