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
  // SEMESTER 1 - FUNDAMENTALS OF AI & ML (BCSE-011) - MMEC SYLLABUS ALIGNED
  // =========================================================================
  {
    id: 'rev-aiml',
    code: 'BCSE-011',
    subject: 'Fundamentals of AI & ML',
    semester: 'Semester 1',
    semNumber: 1,
    year: '1st Year',
    category: 'Artificial Intelligence',
    pageEstimate: '12 Pages Fast-Track Master',
    readTime: '30 Mins Cram',
    examWeightage: '60 Marks (Units 1-4) • 30M Sessional-I (Units 1-2)',
    pdfUrl: '/AIML_Short_Notes_Exam_Ready.pdf',
    downloadName: 'BCSE-011_AIML_Exam_Revision_Notes.pdf',
    fileSize: '3.8 MB',
    summary: '100% MMEC syllabus aligned fast-track revision notes covering all 4 units: Foundations of AI & Industry Applications, Searching Algorithms & Knowledge Representation Schemes, Expert Systems Architecture & Knowledge Acquisition, and Machine Learning Workflow with Supervised & Unsupervised Algorithms.',
    highlights: [
      'Unit 1: Evolution of AI, Types (Narrow/General/Super), Key Domains (NLP, CV, ES), AI vs ML vs DL, Healthcare & Smart Cities',
      'Unit 2: BFS vs DFS, Data-Driven vs Goal-Driven Search, A* Heuristic Search, Propositional/Predicate Logic, Resolution Refutation, Semantic Nets & Frames',
      'Unit 3: Expert Systems Architecture, Human Elements, MYCIN/DENDRAL Applications, Feigenbaum Knowledge Acquisition Bottleneck',
      'Unit 4: Supervised/Unsupervised/Reinforcement, ML Lifecycle, ID3 Decision Tree Entropy/Gain, K-Means Clustering & Apriori Mining'
    ],
    units: [
      {
        unitNum: 1,
        title: 'Foundations of Artificial Intelligence',
        weightage: '15 Marks (30M Sessional-I)',
        summary: 'Evolution and definition of AI, Turing Test, Types of AI (ANI, AGI, ASI; Reactive, Limited Memory, Theory of Mind, Self-Aware), Key domains (NLP, Computer Vision, Expert Systems), AI vs ML vs Deep Learning, Characteristics of intelligent systems, Industry applications (Healthcare, Agriculture, Finance, Smart Cities), and Use Cases (Virtual Assistants, Autonomous Systems, Chatbots).',
        keyTheories: [
          {
            term: "Evolution & Definition of AI",
            definition: "Artificial Intelligence is the branch of computer science dedicated to creating computational systems capable of performing cognitive tasks typically requiring human intelligence—including learning, reasoning, visual perception, decision-making, and natural language communication.",
            bulletPoints: [
              "Genesis & Turing Test (1950): Alan Turing proposed the Imitation Game to evaluate machine intelligence via natural conversation.",
              "Dartmouth Conference (1956): John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon coined the term 'Artificial Intelligence'.",
              "Golden Era to AI Winters (1970s–1980s): Early symbolic AI (Logic Theorist, GPS) met computational limits; Lighthill report triggered funding freeze; revival via commercial Expert Systems (XCON).",
              "Deep Learning Era (2012–Present): Modern renaissance powered by big data, massive GPU parallelism, and deep neural architectures."
            ]
          },
          {
            term: "Classification & Types of Artificial Intelligence",
            definition: "AI systems are categorized along two primary dimensions: by capability/scope and by functional mechanisms.",
            bulletPoints: [
              "1. By Capability Scope:\n  • Artificial Narrow Intelligence (ANI / Weak AI): Specialized for one specific task (e.g. Siri, AlphaGo, Tesla Autopilot). 100% of current real-world AI is ANI.\n  • Artificial General Intelligence (AGI / Strong AI): Human-level cognitive capability to understand, learn, and generalize across any intellectual task.\n  • Artificial Super Intelligence (ASI): Theoretical future AI surpassing human intellectual capability across all domains.",
              "2. By Functional Architecture:\n  • Reactive Machines: No memory; react purely to present inputs (e.g. IBM Deep Blue).\n  • Limited Memory: Uses past observations to make near-future decisions (e.g. Self-driving cars tracking lane markers and surrounding vehicles).\n  • Theory of Mind: Understands emotions, beliefs, and intentions of other agents (active research).\n  • Self-Aware AI: Possesses conscious self-hood (theoretical)."
            ]
          },
          {
            term: "Difference Between AI, Machine Learning, and Deep Learning",
            definition: "A hierarchical, concentric relationship where AI is the overarching discipline, ML is its statistical subset, and DL is specialized deep neural representation learning.",
            bulletPoints: [
              "Artificial Intelligence (Broadest Circle): The entire umbrella science of synthesizing intelligent machines (includes symbolic logic, search algorithms, expert systems, and ML).",
              "Machine Learning (Middle Circle): Computational algorithms that learn predictive patterns from historical data without being explicitly hand-coded with rigid rules (e.g. Decision Trees, SVM, Linear Regression).",
              "Deep Learning (Innermost Circle): A subfield of ML utilizing multi-layered Artificial Neural Networks (ANNs, CNNs, Transformers) that automatically extract hierarchical feature representations directly from raw data."
            ]
          },
          {
            term: "Key Domains & Industry Applications",
            definition: "Core foundational domains of AI and their high-impact real-world deployment across global sectors.",
            bulletPoints: [
              "Key Domains: Natural Language Processing (NLP: sentiment analysis, translation), Computer Vision (CV: image recognition, medical imaging, face unlock), Expert Systems (rule-based diagnostic and configuration engines).",
              "Healthcare: AI-driven diagnostic imaging (detecting tumors in X-rays/MRIs), predictive patient vitals monitoring, personalized drug discovery.",
              "Agriculture: Precision farming, drone crop-health monitoring, automated soil nutrient and irrigation management.",
              "Finance: Algorithmic high-frequency trading, automated credit scoring, real-time transaction fraud detection.",
              "Smart Cities: Intelligent traffic signal synchronization, energy grid load balancing, automated waste management.",
              "Core Use Cases: Virtual Assistants (Apple Siri, Google Assistant, Amazon Alexa), Autonomous Systems (Waymo Robotaxis, industrial drones), Chatbots (Customer service bots, ChatGPT)."
            ]
          }
        ],
        derivations: [
          {
            title: "Turing Test Behavioral Indistinguishability Criterion",
            steps: [
              "1. An interrogator C communicates with player A (computer) and player B (human) via teletype terminals.",
              "2. C asks unconstrained questions across natural language, philosophy, arithmetic, and ethics.",
              "3. C's objective is to correctly identify which participant is the machine.",
              "4. Alan Turing's Empirical Metric: The machine passes if the interrogator makes no more than 70% correct identifications after 5 minutes of questioning.",
              "5. If judge identification accuracy approaches random guessing probability p = 0.50, the machine exhibits behavioral intelligence indistinguishable from a human."
            ],
            finalFormula: "P(\\text{Correct Identification}) \\approx 0.50 \\implies \\text{Turing Test Passed}",
            examFrequency: "Frequently asked 2M & 4M theory question"
          }
        ],
        formulas: [
          { name: "Hierarchical Relationship", formula: "\\text{Deep Learning} \\subset \\text{Machine Learning} \\subset \\text{Artificial Intelligence}", whereUsed: "Venn diagram classification" }
        ],
        solvedQuestions: [
          {
            question: "Differentiate between Artificial Intelligence (AI), Machine Learning (ML), and Deep Learning (DL) with an illustrative diagram and real-world examples.",
            marks: "6 Marks",
            solution: "1. Definition & Scope: AI is the broad superset of intelligent machines; ML uses statistical algorithms to learn from data; DL uses deep multi-layer neural networks for automatic feature extraction.\\n2. Feature Extraction: In classical ML (e.g. SVM), human engineers must manually extract features; in DL (e.g. CNN), the network learns hierarchical features directly from raw pixels.\\n3. Data Dependency: ML performs well on smaller tabular datasets; DL requires massive data scales to prevent overfitting.\\n4. Real-World Mapping:\\n- Rule-based Chess Engine = Pure AI.\\n- Spam Email Classifier with Naive Bayes = Classical ML.\\n- Autonomous vehicle pedestrian detection with YOLO/CNN = Deep Learning.",
            keyPoints: ["Draw concentric circle Venn diagram", "Highlight manual feature engineering (ML) vs automated representation learning (DL)"]
          },
          {
            question: "Discuss the characteristics of an Intelligent System and outline four real-world use cases across Healthcare, Agriculture, Finance, and Smart Cities.",
            marks: "4 Marks",
            solution: "1. Characteristics: Perception (sensing inputs), Reasoning (inferring conclusions), Learning (improving from experience), Adaptability (handling dynamic changes), and Communication (interacting in human modalities).\\n2. Applications:\\n- Healthcare: AI detection of diabetic retinopathy and early oncology screening.\\n- Agriculture: Autonomous drone spraying targeting only weed-infected crop zones.\\n- Finance: Real-time credit card fraud detection anomaly models.\\n- Smart Cities: Real-time adaptive traffic light scheduling reducing intersection congestion.",
            keyPoints: ["State at least 4 intelligent characteristics", "Provide concrete industry impact examples"]
          }
        ],
        examinerTips: "Always draw the 3 concentric circles for AI-ML-DL and mention the Dartmouth 1956 conference and John McCarthy for history questions."
      },
      {
        unitNum: 2,
        title: 'Searching Algorithms & Knowledge Representation',
        weightage: '15 Marks (30M Sessional-I)',
        summary: 'Searching for solutions, Uninformed search strategies: Breadth-First Search (BFS) and Depth-First Search (DFS), Data-driven (Forward chaining) vs Goal-driven (Backward chaining) search, Heuristic search (A* search algorithm), and Knowledge Representation schemes: Logical (Propositional & Predicate calculus, Unification, Resolution Refutation), Procedural (Production systems), Network (Semantic networks, Conceptual graphs), and Structured (Scripts, Frames, Objects).',
        keyTheories: [
          {
            term: "Searching for Solutions & Uninformed Search (BFS vs DFS)",
            definition: "State space search formalizes a problem as: Initial State, Actions/Operators, Transition Model, Goal State Test, and Path Cost. Uninformed (blind) search explores without domain heuristic guidance.",
            bulletPoints: [
              "Breadth-First Search (BFS): Explores nodes level-by-level using a FIFO queue. Properties: Complete (if branching factor b is finite), Optimal for uniform step cost, Time Complexity O(b^d), Space Complexity O(b^d) (severe memory bottleneck).",
              "Depth-First Search (DFS): Explores deepest unvisited child first using a LIFO stack. Properties: Incomplete (can trap in infinite loops), Not Optimal, Time Complexity O(b^m), Space Complexity O(b · m) (highly memory efficient, linear).",
              "Data-Driven Search (Forward Chaining): Starts from known initial facts/assertions and applies inference rules forward to deduce new facts until the goal is proved (bottom-up).",
              "Goal-Driven Search (Backward Chaining): Starts from the goal hypothesis and works backward to find supporting subgoals and matching axioms (top-down, ideal for diagnosis)."
            ]
          },
          {
            term: "Heuristic Search & The A* Algorithm",
            definition: "Informed search uses heuristic evaluation function h(n) estimating the cost from current state n to the goal state.",
            bulletPoints: [
              "Evaluation Function: f(n) = g(n) + h(n), where g(n) is exact cost from start to n, and h(n) is heuristic estimate to goal.",
              "Admissibility Condition: A heuristic is admissible if it NEVER overestimates the true minimal cost to reach the goal: 0 ≤ h(n) ≤ h*(n) for all n.",
              "Optimality Theorem: A* tree search is optimal if h(n) is admissible. A* graph search is optimal if h(n) is consistent (monotonic: h(n) ≤ c(n, a, n') + h(n')).",
              "Data Structures: OPEN list (priority queue sorted by lowest f(n)) and CLOSED list (visited set)."
            ]
          },
          {
            term: "Knowledge Representation: Four Core Schemes",
            definition: "Formal mechanisms to store and reason over knowledge in symbolic AI:",
            bulletPoints: [
              "1. Logical Representation Scheme:\n  • Propositional Calculus: Boolean propositions connected via AND, OR, NOT, IMPLIES, EQUIVALENT. Simple but lacks entity-relation quantification.\n  • Predicate Calculus (FOPC): Adds predicates, variables, constants, and quantifiers (∀, ∃). Enables expressive statements like ∀x [Human(x) ⇒ Mortal(x)].\n  • Unification & Resolution Refutation: Algorithmic proof technique converting premises to Conjunctive Normal Form (CNF) and deriving the empty clause (contradiction) from negated goal.",
              "2. Procedural Representation Scheme:\n  • Production Systems: Consist of Rule Base (IF premise THEN action), Working Memory (active facts), and Inference Engine (Match-Resolve-Act cycle).",
              "3. Network Representation Scheme:\n  • Semantic Networks: Directed graphs where nodes represent concepts/objects and labeled edges represent relationships (e.g. 'is-a', 'has-a') with property inheritance.\n  • Conceptual Graphs: Bipartite graph representations of natural language assertions (concept nodes and relation nodes).",
              "4. Structured Representation Scheme:\n  • Frames: Record-like structures with named attributes ('slots') and values ('fillers'), default values, and procedural attachments ('demons').\n  • Scripts: Schema for stereotypic sequence of events in a known context (e.g. Restaurant Script: Entry, Ordering, Eating, Paying, Exiting) containing Props, Roles, Entry Conditions, and Scenes."
            ]
          }
        ],
        derivations: [
          {
            title: "Resolution Refutation in Propositional Logic",
            steps: [
              "1. Convert all given KB premises into Conjunctive Normal Form (CNF clauses).",
              "2. Negate the goal theorem: to prove α, add ¬α to the set of clauses.",
              "3. Identify two clauses containing complementary literals (e.g. P and ¬P).",
              "4. Resolve them by generating the resolvent clause without the complementary pair.",
              "5. Repeat until the Empty Clause (Contradiction / □) is derived, proving KB ⊨ α."
            ],
            finalFormula: "(P \\lor Q) \\land (\\neg P \\lor Q) \\land \\neg Q \\implies \\square \\text{ (Contradiction)}",
            examFrequency: "Guaranteed 4M or 6M question in Section C/D"
          }
        ],
        formulas: [
          { name: "A* Evaluation Function", formula: "f(n) = g(n) + h(n)", whereUsed: "Best-first node selection" },
          { name: "Admissibility Constraint", formula: "0 \\le h(n) \\le h^*(n)", whereUsed: "Guaranteeing A* optimality" }
        ],
        solvedQuestions: [
          {
            question: "Compare BFS and DFS across Completeness, Time Complexity, Space Complexity, and Optimality. When is Heuristic search preferred?",
            marks: "6 Marks",
            solution: "| Metric | Breadth-First Search (BFS) | Depth-First Search (DFS) |\\n| :--- | :--- | :--- |\\n| Completeness | Yes (if branching b is finite) | No (can loop in infinite paths) |\\n| Time Complexity | O(b^d) | O(b^m) |\\n| Space Complexity | O(b^d) (Exponential!) | O(b · m) (Linear!) |\\n| Optimality | Yes (for unit step costs) | No |\\nHeuristic search (like A*) is preferred when the state space is too vast for blind search (e.g. chess, shortest path on large maps), because the heuristic function h(n) prunes unpromising search branches and guides the search directly towards the goal.",
            keyPoints: ["Provide complete 4-metric comparison table", "Explain heuristic pruning advantage"]
          },
          {
            question: "Explain Knowledge Representation using Semantic Networks and Frames with an illustrative example of property inheritance.",
            marks: "4 Marks",
            solution: "1. Semantic Network: A graph where nodes represent objects/classes (e.g. Animal, Bird, Canary) and directed edges represent relations ('is-a', 'can-fly', 'color').\\n2. Inheritance: Properties at higher nodes are automatically inherited by lower nodes. Example: Animal has property 'alive=True'; Bird is-a Animal (inherits 'alive=True' and adds 'can-fly=True'); Canary is-a Bird (inherits 'alive=True', 'can-fly=True' and adds 'color=Yellow').\\n3. Exception Handling: If Penguin is-a Bird, the inherited property 'can-fly=True' is overridden locally with 'can-fly=False'.\\n4. Frames: Represent the same structure using slots and fillers (e.g. Frame: Bird; Slot: can-fly; Value: True).",
            keyPoints: ["Define both representation schemes", "Show inheritance hierarchy and exception overriding"]
          }
        ],
        examinerTips: "In A* search numericals, always write down the OPEN and CLOSED lists explicitly at every single step to score full marks."
      },
      {
        unitNum: 3,
        title: 'Expert Systems & Knowledge Engineering',
        weightage: '15 Marks (30M Sessional-II)',
        summary: 'Introduction and structure of expert systems, The human element in expert systems (Domain Expert, Knowledge Engineer, System Engineer, End User), Architecture of expert systems (Knowledge Base, Inference Engine, Explanation Facility, User Interface, Working Memory), Problem areas addressed, Success factors, Types of expert systems, Knowledge Engineering: scope of knowledge, difficulties in knowledge acquisition (Feigenbaum\'s bottleneck), and methods of knowledge acquisition.',
        keyTheories: [
          {
            term: "Introduction & Architecture of Expert Systems",
            definition: "An Expert System (ES) is an interactive, domain-specific AI program that emulates the decision-making and problem-solving capability of a human domain expert using heuristic knowledge and formal inference.",
            bulletPoints: [
              "1. Knowledge Base (KB): Contains domain-specific heuristics and factual rules in the form of IF <condition/antecedent> THEN <action/consequent>.",
              "2. Working Memory (Fact Base): Dynamic global database storing observations, user responses, and deduced intermediate assertions for the active session.",
              "3. Inference Engine: The reasoning brain executing the Match-Resolve-Act cycle: matches rule premises against working memory facts, resolves rule conflicts via strategies (specificity, recency, priority), and fires the chosen rule.",
              "4. Explanation Facility: Answers user transparency queries: 'WHY is this question being asked?' (explains current active rule) and 'HOW was this conclusion derived?' (shows deductive inference rule chain).",
              "5. User Interface: Provides natural, friendly interaction between the non-expert user and the consultation engine."
            ]
          },
          {
            term: "The Human Element in Expert Systems",
            definition: "The four key human stakeholders involved in the conception, development, and operational lifecycle of an expert system:",
            bulletPoints: [
              "1. Domain Expert: The human specialist possessing deep, tacit knowledge, experience, heuristics, and problem-solving skills in the specialized field (e.g. senior oncologist).",
              "2. Knowledge Engineer: The AI professional who interviews the domain expert, translates unstructured human rules of thumb into formal structured representations (rules/frames), and encodes them into the knowledge base.",
              "3. System Engineer / Builder: The software developer who designs the inference algorithms, working memory architecture, and user interface.",
              "4. End User: The practitioner, technician, or student who consults the system to obtain expert advice, diagnosis, or recommendations."
            ]
          },
          {
            term: "Problem Areas Addressed & Types of Expert Systems",
            definition: "Major application categories and structural paradigms of expert systems:",
            bulletPoints: [
              "Problem Areas Addressed:\n  • Interpretation: Analyzing raw sensor data to infer meaning (e.g. DENDRAL for chemical spectroscopy).\n  • Prediction: Forecasting future outcomes from current trends (e.g. financial forecasting).\n  • Diagnosis: Inferring system malfunctions or diseases from observed symptoms (e.g. MYCIN for bacterial blood infections).\n  • Design & Configuration: Synthesizing system configurations that satisfy constraints (e.g. DEC's XCON/R1 for VAX computer systems).\n  • Planning, Monitoring, Instruction & Control.",
              "Types of Expert Systems:\n  • Rule-Based Expert Systems: Most common; knowledge represented as IF-THEN rules.\n  • Frame-Based Expert Systems: Knowledge organized in hierarchical frame records.\n  • Fuzzy Expert Systems: Uses fuzzy logic membership functions to reason under vagueness and linguistic ambiguity.\n  • Neural / Hybrid Expert Systems: Combines connectionist neural pattern recognition with symbolic rule explanation."
            ]
          },
          {
            term: "Knowledge Engineering & Knowledge Acquisition",
            definition: "The process of extracting, structuring, and formalizing knowledge from human experts and empirical sources into a machine-executable knowledge base.",
            bulletPoints: [
              "Scope of Knowledge: Declarative (facts, concepts), Procedural (rules, action sequences), and Heuristic (practical rules of thumb and expert intuition).",
              "The Knowledge Acquisition Bottleneck (Feigenbaum's Bottleneck): The most difficult, time-consuming phase of ES development because human experts rely on tacit, subconscious intuition that is difficult to articulate verbally in discrete rules.",
              "Methods of Knowledge Acquisition:\n  • Structured & Semi-Structured Interviews: Knowledge engineer systematically questions the expert.\n  • Protocol Analysis (Think-Aloud Protocols): Expert speaks their entire thought process aloud while solving a real diagnostic case.\n  • Automated Knowledge Acquisition: Machine learning and rule induction algorithms extracting rules directly from historical case databases."
            ]
          }
        ],
        derivations: [],
        formulas: [
          { name: "Production Rule Formulation", formula: "\\text{IF } \\langle \\text{Antecedent}_1 \\land \\dots \\land \\text{Antecedent}_n \\rangle \\implies \\text{THEN } \\langle \\text{Consequent Action} \\rangle", whereUsed: "Knowledge base rule encoding" }
        ],
        solvedQuestions: [
          {
            question: "Draw the architectural block diagram of an Expert System. Explain the role of the Knowledge Base, Inference Engine, and Explanation Facility.",
            marks: "6 Marks",
            solution: "1. Block Diagram: User <-> User Interface <-> Inference Engine & Explanation Facility <-> Working Memory & Knowledge Base. Knowledge Engineer <-> Knowledge Base via Acquisition module.\\n2. Knowledge Base: Encodes domain expertise as production rules (IF-THEN).\\n3. Inference Engine: Executes the Match-Resolve-Act reasoning cycle to infer new facts from known working memory assertions.\\n4. Explanation Facility: Provides explainability by tracing rule firings to answer 'WHY' a question is needed and 'HOW' a conclusion was reached, building user trust.",
            keyPoints: ["Draw clear block diagram with data flow arrows", "Explain Match-Resolve-Act cycle", "Explain WHY and HOW explanation facilities"]
          },
          {
            question: "Explain the role of the Knowledge Engineer and discuss why Knowledge Acquisition is considered the major bottleneck in Expert System development.",
            marks: "4 Marks",
            solution: "1. Role of Knowledge Engineer: Acts as the conceptual bridge between the domain expert and the computer system—eliciting, structuring, verifying, and encoding expert heuristic knowledge.\\n2. Why it is a Bottleneck: Human experts often use subconscious tacit knowledge that is difficult to articulate in formal terms; experts may disagree; domain rules often have exceptions; and translating spoken jargon into consistent formal production rules requires hundreds of hours of iterative interviews.",
            keyPoints: ["Define Knowledge Engineer's bridge role", "Explain Feigenbaum's tacit knowledge articulacy problem"]
          }
        ],
        examinerTips: "Remember classic expert systems names: MYCIN (medical diagnosis), DENDRAL (molecular structure), and XCON/R1 (computer hardware configuration)."
      },
      {
        unitNum: 4,
        title: 'Introduction to Machine Learning Concepts',
        weightage: '15 Marks (30M Sessional-II)',
        summary: 'Overview of Machine Learning and its significance, Categories of learning: Supervised, Unsupervised, and Reinforcement Learning, ML application areas (Recommendation systems, Automation, Smart devices), Machine Learning workflow and model development lifecycle, Supervised Machine Learning: Classification algorithms & Regression algorithms, Unsupervised Machine Learning: Clustering algorithms and Association algorithms.',
        keyTheories: [
          {
            term: "Overview & Three Paradigms of Machine Learning",
            definition: "Machine Learning (Arthur Samuel, 1959) is the field of study that gives computers the ability to learn without being explicitly programmed, optimizing a performance metric P using experience E over task T.",
            bulletPoints: [
              "1. Supervised Learning: Model learns from labeled dataset D = {(x_i, y_i)}. Objective is to learn a mapping function f: X -> Y that generalizes accurately to unseen test data. Tasks: Classification (discrete classes) and Regression (continuous values).",
              "2. Unsupervised Learning: Model learns from unlabelled data D = {x_i}. Objective is to discover latent patterns, clusters, density distributions, or association rules without ground truth supervision. Tasks: Clustering, Dimensionality Reduction, and Association Rule Mining.",
              "3. Reinforcement Learning: An autonomous agent learns an optimal policy π(s) -> a through trial-and-error interaction with a dynamic environment, receiving scalar rewards or penalties to maximize cumulative long-term return."
            ]
          },
          {
            term: "Machine Learning Workflow & Model Development Lifecycle",
            definition: "The standardized 7-stage engineering pipeline for developing and deploying production ML systems:",
            bulletPoints: [
              "1. Problem Definition: Formulating business objective as an ML task (Classification, Regression, Clustering).",
              "2. Data Collection: Sourcing representative training and validation datasets.",
              "3. Data Preprocessing & Cleaning: Handling missing values, outlier removal, categorical encoding (One-Hot), feature scaling (Min-Max normalization, Standardization).",
              "4. Feature Engineering & Selection: Creating domain features and selecting most predictive subset.",
              "5. Model Selection & Training: Splitting data into Train/Validation/Test sets (e.g. 70/15/15) and fitting parameters.",
              "6. Model Evaluation: Evaluating generalization using appropriate metrics (Accuracy, Precision, Recall, F1-Score, ROC-AUC for classification; MSE, RMSE, R² for regression).",
              "7. Deployment & Continuous Monitoring: Serving model via REST APIs, tracking concept drift and data drift over time."
            ]
          },
          {
            term: "Supervised Learning: Classification vs Regression",
            definition: "The two foundational branches of supervised machine learning:",
            bulletPoints: [
              "Classification: Predicting categorical class labels.\n  • Decision Trees (ID3): Recursively partitions data using Shannon Entropy H(S) = -Σ p_i log₂(p_i) and Information Gain IG(S, A) = H(S) - Σ (|S_v|/|S|) H(S_v). The attribute maximizing Information Gain becomes the split node.\n  • Logistic Regression: Uses the Sigmoid activation function σ(z) = 1 / (1 + e^-z) to map linear inputs into probability scores between 0 and 1 for binary classification.\n  • Support Vector Machines (SVM): Finds the optimal separating hyperplane maximizing the geometric margin M = 2 / ||w|| between classes.\n  • Naive Bayes: Probabilistic classifier applying Bayes' Theorem with strong class-conditional feature independence assumptions.",
              "Regression: Predicting continuous numeric outcomes.\n  • Linear Regression: Fits line/hyperplane y = w^T x + b to minimize Mean Squared Error (MSE) loss L = (1/2N) Σ (y_i - ŷ_i)² via Gradient Descent."
            ]
          },
          {
            term: "Unsupervised Learning: Clustering & Association Mining",
            definition: "Key algorithms for discovering structure in unlabeled data:",
            bulletPoints: [
              "Clustering (K-Means):\n  • Partitions N data points into K clusters. Steps: (1) Randomly initialize K centroids; (2) Assign each point to the closest centroid (Euclidean distance); (3) Recalculate centroids as the mean of assigned points; (4) Repeat until centroids converge.\n  • Elbow Method: Plots Within-Cluster Sum of Squares (WCSS) against K. The 'elbow' bend indicates the optimal balance between compactness and simplicity.",
              "Association Rule Mining (Apriori Algorithm):\n  • Discovers interesting correlations in transactional databases (Market Basket Analysis: 'If customer buys Bread, they also buy Butter with 80% confidence').\n  • Support(A => B) = P(A ∪ B) = (Count of transactions with A and B) / (Total transactions).\n  • Confidence(A => B) = P(B | A) = Support(A ∪ B) / Support(A).\n  • Apriori Downward Closure Property: Any subset of a frequent itemset must also be frequent. If an itemset is infrequent, all of its supersets are immediately pruned!"
            ]
          }
        ],
        derivations: [
          {
            title: "Shannon Entropy & Information Gain Formulation",
            steps: [
              "1. Total Dataset Entropy: H(S) = - \\sum_{i=1}^c p_i \\log_2(p_i), where p_i is probability of class i.",
              "2. Expected Entropy of Attribute A: E(S, A) = \\sum_{v \\in \\text{Values}(A)} \\frac{|S_v|}{|S|} H(S_v).",
              "3. Information Gain: IG(S, A) = H(S) - E(S, A).",
              "4. The ID3 decision tree selects the attribute A* that yields maximum Information Gain: A* = \\arg\\max_A IG(S, A)."
            ],
            finalFormula: "IG(S, A) = H(S) - \\sum_{v} \\frac{|S_v|}{|S|} H(S_v)",
            examFrequency: "Appears in every semester exam numerical (6 Marks)"
          }
        ],
        formulas: [
          { name: "Sigmoid Function", formula: "\\sigma(z) = \\frac{1}{1 + e^{-z}}", whereUsed: "Logistic regression probability squashing" },
          { name: "Association Confidence", formula: "\\text{Confidence}(A \\to B) = \\frac{\\text{Support}(A \\cup B)}{\\text{Support}(A)}", whereUsed: "Apriori market basket analysis" }
        ],
        solvedQuestions: [
          {
            question: "A training dataset has 14 examples: 9 Yes and 5 No. Calculate the total Shannon Entropy H(S). An attribute 'Wind' splits the dataset into Weak (6 Yes, 2 No) and Strong (3 Yes, 3 No). Calculate the Information Gain of Wind.",
            marks: "6 Marks",
            solution: "1. Total Entropy H(S):\\np_+ = 9/14 = 0.643, p_- = 5/14 = 0.357.\\nH(S) = - [ 0.643 \\log_2(0.643) + 0.357 \\log_2(0.357) ] = - [ 0.643(-0.637) + 0.357(-1.486) ] = 0.410 + 0.530 = 0.940 bits.\\n2. Subset Entropies:\\n- Weak (8 samples: 6+, 2-): H(S_{weak}) = - [ (6/8)\\log_2(6/8) + (2/8)\\log_2(2/8) ] = - [ 0.75(-0.415) + 0.25(-2.0) ] = 0.311 + 0.500 = 0.811 bits.\\n- Strong (6 samples: 3+, 3-): Equal split \\implies H(S_{strong}) = 1.000 bits.\\n3. Expected Entropy E(S, Wind):\\nE(S, Wind) = (8/14)(0.811) + (6/14)(1.000) = 0.463 + 0.429 = 0.892 bits.\\n4. Information Gain IG(S, Wind):\\nIG(S, Wind) = H(S) - E(S, Wind) = 0.940 - 0.892 = 0.048 bits.",
            keyPoints: ["Show step-by-step log base 2 calculations", "Box H(S) = 0.940 bits and Gain = 0.048 bits"]
          },
          {
            question: "Describe the K-Means Clustering algorithm with its objective function. Explain how the Elbow Method is used to determine the optimal number of clusters K.",
            marks: "4 Marks",
            solution: "1. Objective Function: Minimize Within-Cluster Sum of Squares (WCSS): J = \\sum_{j=1}^K \\sum_{i \\in S_j} \\|x_i - \\mu_j\\|^2.\\n2. Steps: (a) Initialize K centroids randomly; (b) Assign each point x_i to closest centroid \\mu_j; (c) Recalculate centroids as the arithmetic mean of assigned points: \\mu_j = \\frac{1}{|S_j|} \\sum x_i; (d) Repeat until centroid coordinates stabilize.\\n3. Elbow Method: Plot WCSS against K (K=1, 2, 3...). As K increases, WCSS decreases monotonically. The point where the curve abruptly bends like an elbow indicates diminishing returns, defining the optimal K.",
            keyPoints: ["State WCSS formula", "List 4-step convergence loop", "Sketch and explain Elbow Method plot"]
          }
        ],
        examinerTips: "In numericals, write log₂(x) = ln(x) / ln(2) = ln(x) / 0.6931 on non-programming scientific calculators."
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

