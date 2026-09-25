/* =========================================================================
   EXPECTED UNIVERSITY QUESTION PAPERS DATASET (questionPapersData.js)
   =========================================================================
   Exact Maharishi Markandeshwar (Deemed to be University) / Technical University
   End-Semester Examination Pattern:
   - Total Time: 3 Hours
   - Maximum Marks: 60 Marks (or 100 Marks scale)
   - Minimum Passing Marks: 24 Marks (40%)
   - Structure:
     * Section A: Q1 Compulsory (10 sub-questions x 2 Marks = 20 Marks)
       Covering ALL 4 units evenly.
     * Section B: 4 Units with Internal Choice (4 Units x 10 Marks = 40 Marks)
       Unit I  : Q2 OR Q3 (10 Marks)
       Unit II : Q4 OR Q5 (10 Marks)
       Unit III: Q6 OR Q7 (10 Marks)
       Unit IV : Q8 OR Q9 (10 Marks)
   ========================================================================= */

export const expectedQuestionPapers = [
  // =========================================================================
  // 1. BELE-001: Basic Electrical & Electronics Engineering (BEEE)
  // =========================================================================
  {
    id: 'qp-beee-001',
    code: 'BELE-001',
    subject: 'Basic Electrical & Electronics Engineering',
    semester: 'Semester 1',
    semNumber: 1,
    year: '1st Year',
    course: 'B.Tech (All Branches)',
    university: 'Maharishi Markandeshwar (Deemed to be University), Mullana',
    timeAllowed: '3 Hours',
    maxMarks: 60,
    passingMarks: 24,
    probability: '98% High-Yield Match',
    instructions: [
      'Question No. 1 in Section A is COMPULSORY and carries 20 marks.',
      'Attempt any FOUR questions from Section B, selecting ONE question from each Unit (10 marks each).',
      'Assume suitable missing data if any and state it clearly.',
      'Use of non-programmable scientific calculators is permitted.',
      'Neat, labeled circuit diagrams and step-by-step calculations carry significant weightage.'
    ],
    sectionA: {
      title: 'SECTION A (COMPULSORY)',
      marks: 20,
      note: 'Answer ALL ten questions. Each question carries 2 marks.',
      questions: [
        {
          qNum: 'Q1 (a)',
          unit: 'Unit 1',
          marks: 2,
          question: 'State Kirchhoff\'s Current Law (KCL) and Kirchhoff\'s Voltage Law (KVL). Name the fundamental physical conservation law each is based on.',
          expectedFrequency: 'Every Year (2021, 2022, 2023, 2024)',
          modelAnswer: '1. **Kirchhoff\'s Current Law (KCL):**\\nThe algebraic sum of currents entering any electrical node is zero ($\\sum I_{in} = \\sum I_{out}$). It is based on the **Law of Conservation of Electric Charge**.\\n\\n2. **Kirchhoff\'s Voltage Law (KVL):**\\nThe algebraic sum of potential differences (voltages) around any closed loop is zero ($\\sum V = 0$). It is based on the **Law of Conservation of Energy**.',
          keyMarkingPoints: ['1 Mark for stating both laws correctly', '1 Mark for naming conservation of charge and energy']
        },
        {
          qNum: 'Q1 (b)',
          unit: 'Unit 1',
          marks: 2,
          question: 'Define the terms: (i) Form Factor, and (ii) Peak Factor for a sinusoidal alternating quantity. State their numerical values.',
          expectedFrequency: 'High Frequency (2020, 2022, 2024)',
          modelAnswer: '1. **Form Factor ($K_f$):**\\n$$\\text{Form Factor } (K_f) = \\frac{V_{rms}}{V_{avg}} = \\frac{V_m / \\sqrt{2}}{2V_m / \\pi} = \\frac{\\pi}{2\\sqrt{2}} \\approx 1.11$$\\n\\n2. **Peak (Crest) Factor ($K_p$):**\\n$$\\text{Peak Factor } (K_p) = \\frac{V_{\\text{peak}}}{V_{rms}} = \\frac{V_m}{V_m / \\sqrt{2}} = \\sqrt{2} \\approx 1.414$$',
          keyMarkingPoints: ['1 Mark for exact definition ratios', '1 Mark for exact numerical values (1.11 and 1.414)']
        },
        {
          qNum: 'Q1 (c)',
          unit: 'Unit 1',
          marks: 2,
          question: 'State the condition for Maximum Power Transfer to a load in a DC network. What is the electrical efficiency at this condition?',
          expectedFrequency: 'Every Alternate Year',
          modelAnswer: '• **Condition:** Maximum power is transferred from a DC source network to a variable load resistor $R_L$ when $R_L = R_{th}$ (load resistance equals Thevenin equivalent internal resistance).\\n\\n• **Efficiency:** At maximum power transfer, internal power loss equals load power:\\n$$\\eta = \\frac{P_L}{P_{total}} \\times 100\\% = 50\\%$$',
          keyMarkingPoints: ['1 Mark for R_L = R_th condition', '1 Mark for stating 50% efficiency with reason']
        },
        {
          qNum: 'Q1 (d)',
          unit: 'Unit 2',
          marks: 2,
          question: 'Why is the core of a power transformer laminated rather than solid? Which specific loss is reduced?',
          expectedFrequency: 'High Frequency Topper Question',
          modelAnswer: 'The core is laminated using thin sheets of silicon steel insulated by varnish to minimize **Eddy Current Losses** ($P_e \\propto t^2$, where $t$ is lamination thickness).\\n\\nLaminations break the continuous circulating eddy current loops, increasing core resistance without reducing magnetic permeability.',
          keyMarkingPoints: ['1 Mark for identifying Eddy Current Loss', '1 Mark for formula P_e proportional to t^2 and insulation']
        },
        {
          qNum: 'Q1 (e)',
          unit: 'Unit 2',
          marks: 2,
          question: 'Define the term "All-Day Efficiency" of a distribution transformer and explain why it differs from commercial power efficiency.',
          expectedFrequency: 'University Favorite',
          modelAnswer: '**All-Day Efficiency** is the ratio of total energy output in kilowatt-hours (kWh) over 24 hours to total energy input in kWh over the same 24-hour period:\\n$$\\eta_{\\text{all-day}} = \\frac{\\text{Energy Output in 24 hrs (kWh)}}{\\text{Energy Input in 24 hrs (kWh)}}$$\\nDistribution transformers have their primary energized 24/7 (constant core loss), while secondary load fluctuates heavily.',
          keyMarkingPoints: ['1 Mark for energy formula in kWh (not instantaneous power)', '1 Mark for mentioning 24/7 core loss vs varying load']
        },
        {
          qNum: 'Q1 (f)',
          unit: 'Unit 2',
          marks: 2,
          question: 'Why does a DC series motor never be started under "No-Load" condition?',
          expectedFrequency: 'Frequent Viva & Exam Question',
          modelAnswer: 'In a DC series motor, flux $\\phi$ is proportional to armature current $I_a$ ($\\phi \\propto I_a$).\\n\\nAt no-load, $I_a$ is extremely small, making $\\phi \\to 0$. Since speed $N \\propto \\frac{E_b}{\\phi}$, the speed reaches dangerously high levels (infinite theoretical speed), which can cause catastrophic centrifugal mechanical failure of the armature windings.',
          keyMarkingPoints: ['1 Mark for N proportional to E_b / phi', '1 Mark for dangerously high runaway speed explanation']
        },
        {
          qNum: 'Q1 (g)',
          unit: 'Unit 3',
          marks: 2,
          question: 'What is a Zener Diode? Explain its primary application in electronics circuits with a basic connection rule.',
          expectedFrequency: 'Every Year (2020, 2021, 2023, 2024)',
          modelAnswer: 'A **Zener diode** is a heavily doped P-N junction diode designed to operate safely in the reverse breakdown region without damage.\\n\\n• **Primary Application:** Voltage Regulator\\n• **Connection Rule:** It must always be connected in **Reverse Bias** in parallel with the load resistor, preceded by a current-limiting series resistor $R_s$.',
          keyMarkingPoints: ['1 Mark for reverse breakdown definition', '1 Mark for voltage regulator application & reverse bias connection']
        },
        {
          qNum: 'Q1 (h)',
          unit: 'Unit 3',
          marks: 2,
          question: 'Write the relationship between transistor common-base current gain (\\alpha) and common-emitter current gain (\\beta). If \\alpha = 0.98, calculate \\beta.',
          expectedFrequency: 'Every Year Numerical',
          modelAnswer: '• **Relationship:**\\n$$\\beta = \\frac{\\alpha}{1 - \\alpha} \\quad \\text{or} \\quad \\alpha = \\frac{\\beta}{1 + \\beta}$$\\n\\n• **Calculation (for $\\alpha = 0.98$):**\\n$$\\beta = \\frac{0.98}{1 - 0.98} = \\frac{0.98}{0.02} = 49$$',
          keyMarkingPoints: ['1 Mark for exact algebraic formula', '1 Mark for correct numerical evaluation (beta = 49)']
        },
        {
          qNum: 'Q1 (i)',
          unit: 'Unit 4',
          marks: 2,
          question: 'State De Morgan\'s First and Second Laws in Boolean Algebra.',
          expectedFrequency: 'Every Year Standard',
          modelAnswer: '1. **First Law (NOR Gate Duality):**\\n$$(A + B)\' = A\' \\cdot B\'$$\\n*(The complement of a sum equals the product of the complements)*\\n\\n2. **Second Law (NAND Gate Duality):**\\n$$(A \\cdot B)\' = A\' + B\'$$\\n*(The complement of a product equals the sum of the complements)*',
          keyMarkingPoints: ['1 Mark for (A+B)\' = A\'.B\'', '1 Mark for (A.B)\' = A\' + B\'']
        },
        {
          qNum: 'Q1 (j)',
          unit: 'Unit 4',
          marks: 2,
          question: 'Convert the decimal number (75.625)_{10} into its equivalent binary number.',
          expectedFrequency: 'Frequent Number System Problem',
          modelAnswer: '• **Integer Part ($75_{10}$):**\\n$75 \\div 2 = 37\\text{ R }1$; $37 \\div 2 = 18\\text{ R }1$; $18 \\div 2 = 9\\text{ R }0$; $9 \\div 2 = 4\\text{ R }1$; $4 \\div 2 = 2\\text{ R }0$; $2 \\div 2 = 1\\text{ R }0$; $1 \\div 2 = 0\\text{ R }1 \\implies (1001011)_2$\\n\\n• **Fractional Part ($0.625_{10}$):**\\n$0.625 \\times 2 = 1.25\\,(1)$; $0.25 \\times 2 = 0.50\\,(0)$; $0.50 \\times 2 = 1.00\\,(1) \\implies (.101)_2$\\n\\n• **Final Result:**\\n$$(75.625)_{10} = (1001011.101)_2$$',
          keyMarkingPoints: ['1 Mark for integer conversion 1001011', '1 Mark for fraction conversion .101']
        }
      ]
    },
    sectionB: {
      title: 'SECTION B (UNIT-WISE LONG QUESTIONS)',
      marks: 40,
      note: 'Attempt ONE question from EACH Unit. Each question carries 10 marks.',
      units: [
        {
          unitNumber: 'UNIT I',
          syllabusTopic: 'DC Circuits & AC Circuit Analysis',
          questions: [
            {
              qNum: 'Q2',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'State Thevenin\'s Theorem. For the circuit shown below, determine the Thevenin equivalent circuit across terminals A-B and find the load current I_L through a 10 \\Omega resistor connected across A-B: Circuit has a 40V source in series with 4 \\Omega, connected to a parallel branch of 12 \\Omega, and a series resistor of 5 \\Omega to terminal A.',
                  solution: '1. Statement: Any linear, bilateral, active two-terminal network can be replaced by an equivalent circuit consisting of a single voltage source V_th in series with an internal impedance R_th.\\n2. Open-Circuit Voltage V_th: Terminals A-B are open. Current from 40V source through (4 + 12)\\Omega is I = 40 / 16 = 2.5 A. Voltage across 12\\Omega resistor = V_th = 2.5 \\times 12 = 30 V.\\n3. Thevenin Resistance R_th: Deactivate 40V voltage source (short circuit). R_th looking into A-B = 5 + (4 \\parallel 12) = 5 + \\frac{4 \\times 12}{4 + 12} = 5 + 3 = 8 \\,\\Omega.\\n4. Load Current I_L: Connect R_L = 10 \\,\\Omega across V_th and R_th: I_L = \\frac{V_th}{R_th + R_L} = \\frac{30}{8 + 10} = \\frac{30}{18} = 1.667 \\text{ A}.',
                  markingScheme: '2 Marks for Statement | 2 Marks for V_th | 1 Mark for R_th | 1 Mark for I_L calculation'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Derive the relationship between line and phase quantities (voltage and current) in a balanced 3-phase Delta (\\Delta) connected system. Draw the complete phasor diagram.',
                  solution: '1. In Delta connection, line terminals are directly connected across phase windings: V_L = V_{ph}.\\n2. Line currents are the phasor differences of phase currents: I_R = I_{RY} - I_{BR}.\\n3. For balanced system, |I_{RY}| = |I_{YB}| = |I_{BR}| = I_{ph} with 120-degree phase separation.\\n4. Magnitude: I_L = 2 \\cdot I_{ph} \\cos(30^\\circ) = 2 I_{ph} \\frac{\\sqrt{3}}{2} = \\sqrt{3} I_{ph}.\\n5. Phasor diagram shows line current lagging phase current by 30 degrees.',
                  markingScheme: '1 Mark for V_L = V_ph | 2 Marks for mathematical derivation of I_L = sqrt(3) I_ph | 1 Mark for neat phasor diagram'
                }
              ]
            },
            {
              qNum: 'Q3 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'A series RLC circuit with R = 10 \\,\\Omega, L = 0.1 \\text{ H}, and C = 50 \\,\\mu\\text{F}$ is connected across a 230V, 50 Hz AC supply. Calculate: (i) Inductive reactance X_L, (ii) Capacitive reactance X_C, (iii) Net impedance Z, (iv) Circuit current I, (v) Power factor \\cos \\phi, and (vi) Resonant frequency f_r.',
                  solution: 'Given: R = 10 \\Omega, L = 0.1 H, C = 50 \\times 10^{-6} F, V = 230 V, f = 50 Hz.\\n1. X_L = 2\\pi f L = 2 \\times \\pi \\times 50 \\times 0.1 = 31.416 \\,\\Omega.\\n2. X_C = \\frac{1}{2\\pi f C} = \\frac{1}{2 \\times \\pi \\times 50 \\times 50 \\times 10^{-6}} = 63.662 \\,\\Omega.\\n3. Net reactance X = X_L - X_C = 31.416 - 63.662 = -32.246 \\,\\Omega (Capacitive).\\n4. Impedance Z = \\sqrt{R^2 + X^2} = \\sqrt{10^2 + (-32.246)^2} = \\sqrt{100 + 1039.8} = 33.76 \\,\\Omega.\\n5. Current I = \\frac{V}{Z} = \\frac{230}{33.76} = 6.812 \\text{ A}.\\n6. Power factor \\cos \\phi = \\frac{R}{Z} = \\frac{10}{33.76} = 0.296 \\text{ (Leading)}.\\n7. Resonant Frequency f_r = \\frac{1}{2\\pi\\sqrt{LC}} = \\frac{1}{2\\pi\\sqrt{0.1 \\times 50 \\times 10^{-6}}} = \\frac{1}{2\\pi \\times 0.002236} = 71.18 \\text{ Hz}.',
                  markingScheme: '1 Mark each for X_L, X_C, Z, I, cos phi (with Leading mentioned), and f_r'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain the principle of Superposition Theorem. State its limitations and step-by-step procedure for solving bilateral networks containing multiple sources.',
                  solution: '1. Principle: In any linear bilateral network containing two or more independent sources, the response (voltage or current) in any branch equals the algebraic sum of the individual responses caused by each independent source acting alone.\\n2. Procedure: (a) Retain one source and deactivate all other independent sources (ideal voltage sources replaced by short circuits, ideal current sources by open circuits). (b) Calculate the branch current/voltage due to this source. (c) Repeat for each source. (d) Add all responses algebraically.\\n3. Limitations: Cannot be used to calculate power directly because power is a non-linear quadratic function (P = I^2 R \\ne P_1 + P_2). Only applicable to linear circuits.',
                  markingScheme: '1.5 Marks for principle | 1.5 Marks for procedure | 1 Mark for power non-linearity limitation'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT II',
          syllabusTopic: 'Transformers & Electrical Machines',
          questions: [
            {
              qNum: 'Q4',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Derive the EMF equation of a single-phase transformer: E = 4.44 f N \\Phi_m. A 25 kVA, 2200/220 V, 50 Hz single-phase transformer has 60 turns on the secondary winding. Calculate: (i) Primary turns N_1, (ii) Full-load primary and secondary currents, and (iii) Maximum flux in the core.',
                  solution: '1. Derivation: Let sinusoidal flux be \\Phi = \\Phi_m \\sin(\\omega t). Instantaneous induced EMF e = -N \\frac{d\\Phi}{dt} = -N \\omega \\Phi_m \\cos(\\omega t) = N \\omega \\Phi_m \\sin(\\omega t - 90^\\circ). Maximum EMF E_m = 2\\pi f N \\Phi_m. RMS value E = \\frac{E_m}{\\sqrt{2}} = \\frac{2\\pi}{\\sqrt{2}} f N \\Phi_m = 4.44 f N \\Phi_m.\\n2. Calculations:\\n(i) Transformation ratio k = \\frac{V_2}{V_1} = \\frac{220}{2200} = 0.1 \\implies N_1 = \\frac{N_2}{k} = \\frac{60}{0.1} = 600 \\text{ turns}.\\n(ii) Full load primary current I_1 = \\frac{S}{V_1} = \\frac{25000}{2200} = 11.364 \\text{ A}. Secondary current I_2 = \\frac{S}{V_2} = \\frac{25000}{220} = 113.64 \\text{ A}.\\n(iii) Maximum flux \\Phi_m: From E_2 = 4.44 f N_2 \\Phi_m \\implies \\Phi_m = \\frac{220}{4.44 \\times 50 \\times 60} = \\frac{220}{13320} = 0.016516 \\text{ Wb} = 16.52 \\text{ mWb}.',
                  markingScheme: '3 Marks for complete mathematical derivation | 1 Mark for N_1 | 1 Mark for I_1 & I_2 | 1 Mark for Phi_m'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain the working principle of a 3-phase Induction Motor. Define slip (s) and slip speed, and write the formula for rotor frequency f_r.',
                  solution: '1. Principle: When balanced 3-phase AC currents flow through 3-phase stator windings, a Rotating Magnetic Field (RMF) of constant magnitude (1.5 \\Phi_m) rotating at synchronous speed N_s = \\frac{120f}{P} is produced. This field cuts stationary rotor conductors, inducing EMF and currents (Faraday\'s Law). By Lenz\'s law, the rotor rotates in the direction of RMF to reduce relative speed, but can never reach N_s.\\n2. Slip Speed: The difference between synchronous speed and actual rotor speed: \\text{Slip Speed} = N_s - N_r.\\n3. Fractional Slip (s): s = \\frac{N_s - N_r}{N_s}. Percentage slip s\\% = \\frac{N_s - N_r}{N_s} \\times 100\\%.\\n4. Rotor Frequency: f_r = s \\cdot f, where f is the stator supply frequency.',
                  markingScheme: '2 Marks for RMF generation & induction principle | 1 Mark for slip definitions | 1 Mark for rotor frequency formula'
                }
              ]
            },
            {
              qNum: 'Q5 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Describe the Open Circuit (OC) and Short Circuit (SC) tests performed on a single-phase transformer. Explain how core losses, copper losses, and equivalent circuit parameters are determined from test readings.',
                  solution: '1. Open Circuit (OC) Test:\\n- Connection: Performed at rated voltage on Low Voltage (LV) side; High Voltage (HV) side is kept open.\\n- Meters read: V_1 (rated), I_0 (no-load current), W_0 (no-load power).\\n- Determination: Core loss P_i = W_0. No-load power factor \\cos \\phi_0 = \\frac{W_0}{V_1 I_0}. Magnetizing current I_m = I_0 \\sin \\phi_0, Core loss current I_c = I_0 \\cos \\phi_0. Resistance R_0 = \\frac{V_1}{I_c}, Reactance X_0 = \\frac{V_1}{I_m}.\\n2. Short Circuit (SC) Test:\\n- Connection: Performed with LV side short-circuited by a thick conductor; low voltage applied to HV side until rated current flows.\\n- Meters read: V_{sc}, I_{sc} (rated current), W_{sc}.\\n- Determination: Full-load copper loss P_{cu} = W_{sc}. Equivalent resistance R_{01} = \\frac{W_{sc}}{I_{sc}^2}. Equivalent impedance Z_{01} = \\frac{V_{sc}}{I_{sc}}. Equivalent leakage reactance X_{01} = \\sqrt{Z_{01}^2 - R_{01}^2}.',
                  markingScheme: '3 Marks for OC test diagram & parameter formulas | 3 Marks for SC test diagram & parameter formulas'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain the construction, back-EMF equation (E_b = \\frac{P \\Phi N Z}{60 A}), and torque equation of a DC Motor.',
                  solution: '1. Construction: Main parts are Yoke (outer magnetic frame), Stator poles with field windings, Rotating Armature core with copper windings, Commutator (slip-ring segments converting AC to DC), and Carbon Brushes.\\n2. Back-EMF Equation: When armature rotates in magnetic field, it acts as a generator: E_b = \\frac{P \\Phi N Z}{60 A}, where P = poles, \\Phi = flux/pole, N = speed in rpm, Z = total conductors, A = parallel paths (A = 2 for wave, A = P for lap).\\n3. Torque Equation: Electrical power developed = Mechanical power: E_b I_a = T \\omega = T \\frac{2\\pi N}{60}.\\n\\implies T = \\frac{E_b I_a \\times 60}{2\\pi N} = \\frac{1}{2\\pi} \\left(\\frac{P Z}{A}\\right) \\Phi I_a = 0.159 \\left(\\frac{P Z}{A}\\right) \\Phi I_a \\text{ N-m}. Thus T \\propto \\Phi I_a.',
                  markingScheme: '1 Mark for construction parts | 1.5 Marks for back EMF formula & variable definitions | 1.5 Marks for torque derivation'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT III',
          syllabusTopic: 'Semiconductor Devices & Transistors (BJT)',
          questions: [
            {
              qNum: 'Q6',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Draw the circuit diagram of a Full-Wave Bridge Rectifier with input and output waveforms. Derive expressions for its: (i) DC output voltage V_{dc}, (ii) RMS output voltage V_{rms}, (iii) Rectification efficiency \\eta, and (iv) Ripple factor \\gamma.',
                  solution: '1. Circuit Diagram: 4 diodes D_1, D_2, D_3, D_4 arranged in a bridge across transformer secondary; load resistor R_L across opposite diagonal.\\n2. Operation: During positive half cycle, D_1 & D_3 conduct; during negative half cycle, D_2 & D_4 conduct in the same direction through R_L.\\n3. Derivations:\\n(i) V_{dc} = \\frac{1}{\\pi} \\int_0^\\pi V_m \\sin \\theta \\, d\\theta = \\frac{2V_m}{\\pi} \\approx 0.637 V_m.\\n(ii) V_{rms} = \\sqrt{\\frac{1}{\\pi} \\int_0^\\pi (V_m \\sin \\theta)^2 d\\theta} = \\frac{V_m}{\\sqrt{2}} \\approx 0.707 V_m.\\n(iii) Rectification Efficiency \\eta = \\frac{P_{dc}}{P_{ac}} = \\frac{I_{dc}^2 R_L}{I_{rms}^2 (R_L + 2r_d)} = \\frac{(2I_m / \\pi)^2}{(I_m / \\sqrt{2})^2} = \\frac{8}{\\pi^2} \\approx 81.2\\%.\\n(iv) Ripple Factor \\gamma = \\sqrt{\\left(\\frac{V_{rms}}{V_{dc}}\\right)^2 - 1} = \\sqrt{\\left(\\frac{0.707}{0.637}\\right)^2 - 1} = \\sqrt{(1.11)^2 - 1} = 0.482.',
                  markingScheme: '2 Marks for circuit & waveforms | 1 Mark each for V_dc, V_rms, Efficiency (81.2%), and Ripple Factor (0.482)'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Draw and explain the input and output characteristics of an NPN Bipolar Junction Transistor (BJT) in Common Emitter (CE) configuration. Clearly identify the Cut-off, Active, and Saturation regions.',
                  solution: '1. CE Circuit Setup: Emitter terminal common to input (Base-Emitter) and output (Collector-Emitter).\\n2. Input Characteristics: Plot of I_B vs V_{BE} at constant V_{CE}. Resembles forward-biased diode curve with threshold voltage \\approx 0.7V for silicon. As V_{CE} increases, dynamic input resistance increases slightly.\\n3. Output Characteristics: Plot of I_C vs V_{CE} at constant values of I_B. Three distinct regions:\\n- Active Region: Emitter-Base forward biased, Collector-Base reverse biased. I_C \\approx \\beta I_B. Curves are nearly flat with slight Early effect slope. Used for linear amplification.\\n- Saturation Region: Both junctions forward biased (V_{CE} < 0.2V). I_C rises sharply with V_{CE}. Transistor acts as an ON switch.\\n- Cut-off Region: Both junctions reverse biased (I_B = 0). I_C \\approx I_{CEO} (leakage current only). Transistor acts as an OFF switch.',
                  markingScheme: '1 Mark for circuit diagram | 1.5 Marks for neat characteristic curves | 1.5 Marks for defining active, saturation, cut-off'
                }
              ]
            },
            {
              qNum: 'Q7 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain the working of a Zener Diode as a Shunt Voltage Regulator under: (i) Varying input voltage V_{in} with constant load resistance R_L, and (ii) Varying load resistance R_L with constant input voltage V_{in}. A 10V Zener diode maintains a constant voltage across a load resistor R_L varying from 1 k\\Omega to 2 k\\Omega. If the input voltage is 25V and maximum Zener current is 30 mA, calculate the series resistor R_s.',
                  solution: '1. Theory: Zener diode operates in reverse breakdown region where voltage remains fixed at V_Z despite wide variations in current. Series resistor R_s absorbs voltage fluctuations: V_{in} - V_Z = I_s R_s.\\n2. (i) Varying V_in: If V_in increases, total current I_s increases. Since V_L = V_Z is constant, load current I_L is constant. Excess current is shunted through Zener (I_Z increases), keeping V_L strictly constant.\\n3. (ii) Varying R_L: If R_L decreases, I_L increases. Since I_s is fixed, I_Z automatically decreases to balance I_s = I_Z + I_L. Output voltage remains V_Z.\\n4. Numerical Solution:\\nV_Z = 10 V, V_{in} = 25 V. Voltage drop across R_s is V_R = V_{in} - V_Z = 25 - 10 = 15 V.\\nLoad current variations: I_{L(min)} = \\frac{V_Z}{R_{L(max)}} = \\frac{10}{2000} = 5 \\text{ mA}. I_{L(max)} = \\frac{V_Z}{R_{L(min)}} = \\frac{10}{1000} = 10 \\text{ mA}.\\nWorst case for Zener heating occurs at minimum load: I_{s} = I_{Z(max)} + I_{L(min)} = 30 \\text{ mA} + 5 \\text{ mA} = 35 \\text{ mA}.\\n\\implies R_s = \\frac{V_{in} - V_Z}{I_s} = \\frac{15}{35 \\times 10^{-3}} = 428.57 \\,\\Omega \\approx 430 \\,\\Omega.',
                  markingScheme: '3 Marks for regulator working mechanism | 3 Marks for step-by-step numerical calculation'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Derive the relationship: I_C = \\beta I_B + (1 + \\beta) I_{CBO} for a common-emitter transistor. Explain thermal runaway and why stabilization is needed.',
                  solution: '1. In Common Base: I_C = \\alpha I_E + I_{CBO}. Since I_E = I_B + I_C:\\nI_C = \\alpha (I_B + I_C) + I_{CBO} \\implies I_C (1 - \\alpha) = \\alpha I_B + I_{CBO}.\\nDividing by (1 - \\alpha): I_C = \\frac{\\alpha}{1 - \\alpha} I_B + \\frac{1}{1 - \\alpha} I_{CBO}.\\nSince \\beta = \\frac{\\alpha}{1 - \\alpha} and 1 + \\beta = 1 + \\frac{\\alpha}{1 - \\alpha} = \\frac{1}{1 - \\alpha}:\\n\\implies I_C = \\beta I_B + (1 + \\beta) I_{CBO} = \\beta I_B + I_{CEO}.\\n2. Thermal Runaway: I_{CBO} doubles for every 10^\\circ C rise in junction temperature. An increase in temperature increases I_C, which increases collector power dissipation P_D = V_{CE} I_C, further raising temperature. This regenerative self-heating cycle is Thermal Runaway, which permanently destroys the transistor. Stabilization circuits (like Voltage Divider Bias with emitter resistor R_E) provide negative feedback to prevent this.',
                  markingScheme: '2 Marks for algebraic derivation | 2 Marks for thermal runaway mechanism and stabilization necessity'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT IV',
          syllabusTopic: 'Number Systems & Boolean Algebra',
          questions: [
            {
              qNum: 'Q8',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Minimize the following Boolean function using a 4-variable Karnaugh Map (K-Map) and realize the simplified expression using NAND gates only: F(A, B, C, D) = \\sum m(0, 1, 2, 5, 8, 9, 10) + d(13, 14, 15).',
                  solution: '1. K-Map Grid Setup: 4x4 grid with rows AB (00, 01, 11, 10) and columns CD (00, 01, 11, 10).\\n2. Plotting minterms: 1s at (0000, 0001, 0010, 0101, 1000, 1001, 1010) and Xs at (1101, 1110, 1111).\\n3. Grouping:\\n- Group 1 (Corner Quad: m0, m2, m8, m10): Cells (00,00), (00,10), (10,00), (10,10) \\implies B\' D\'.\\n- Group 2 (Quad of 1s & dont-care: m1, m5, m9, d13): Column CD = 01 for all AB \\implies C\' D.\\n4. Minimal SOP Expression: F = B\' D\' + C\' D.\\n5. NAND-NAND Realization: Double negate the SOP: F = ((B\' D\' + C\' D)\')\' = ((B\' D\')\' \\cdot (C\' D)\')\'.\\nRequires 2 NAND gates for AND terms with inverted inputs, and 1 output NAND gate to combine them.',
                  markingScheme: '2 Marks for K-Map plotting | 2 Marks for optimal grouping and simplification (B\'D\' + C\'D) | 2 Marks for NAND gate logic circuit'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Perform the binary arithmetic subtraction using 2\'s complement method: (28)_{10} - (45)_{10}. Verify your answer in decimal.',
                  solution: '1. Convert operands to 8-bit binary:\\n(28)_{10} = 00011100_2\\n(45)_{10} = 00101101_2\\n2. 2\'s complement of subtrahend (45):\\n1\'s complement of 00101101 = 11010010\\nAdd 1: 11010010 + 1 = 11010011_2\\n3. Add to minuend:\\n   00011100  (28)\\n+  11010011  (-45)\\n------------- \\n   11101111  (Result)\\n4. Interpretation: There is NO end carry, meaning result is negative and in 2\'s complement form.\\nTake 2\'s complement of 11101111 to find magnitude: 1\'s complement = 00010000; Add 1 = 00010001_2 = (17)_{10}.\\nResult = -(17)_{10}. Verified: 28 - 45 = -17.',
                  markingScheme: '1 Mark for binary conversions | 1 Mark for 2\'s complement computation | 1 Mark for addition | 1 Mark for end carry interpretation & decimal verification'
                }
              ]
            },
            {
              qNum: 'Q9 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain why NAND and NOR gates are termed "Universal Logic Gates". Demonstrate how the basic logic operations (AND, OR, NOT) and exclusive operations (XOR) can be implemented using NAND gates only.',
                  solution: '1. Universal Gate Definition: A universal gate is a logic gate that can implement any Boolean function without requiring any other type of logic gate.\\n2. Realizations using 2-input NAND gates:\\n- NOT gate: Connect both inputs together: (A \\cdot A)\' = A\'. (1 NAND gate).\\n- AND gate: Pass output of NAND through a NAND inverter: ((A \\cdot B)\')\' = A \\cdot B. (2 NAND gates).\\n- OR gate: By De Morgan\'s theorem, A + B = (A\' \\cdot B\')\'. Invert A and B using NAND inverters, then feed into a 3rd NAND gate: ((A\') \\cdot (B\'))\' = A\'\' + B\'\' = A + B. (3 NAND gates).\\n- XOR gate: A \\oplus B = A\' B + A B\' = (A + B)(A B)\' = (A(AB)\')(B(AB)\')\'. Implemented using exactly 4 NAND gates: Gate 1 produces N_1 = (AB)\'; Gate 2 produces (A \\cdot N_1)\'; Gate 3 produces (B \\cdot N_1)\'; Gate 4 combines outputs of Gate 2 & 3 to produce XOR.',
                  markingScheme: '1.5 Marks for universal gate definition | 1.5 Marks for NOT, AND, OR implementations | 3 Marks for 4-NAND XOR realization with diagram'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Convert the following number systems: (i) (AF5.C)_{16} to Octal, and (ii) (634.25)_8 to Decimal.',
                  solution: '1. (AF5.C)_{16} to Octal:\\nStep 1: Convert Hex to Binary (4-bit chunks): A = 1010, F = 1111, 5 = 0101, C = 1100 \\implies 1010 1111 0101 . 1100_2\\nStep 2: Regroup into 3-bit Octal chunks from radix point:\\nInteger part: (101)(011)(110)(101) = 5 3 6 5_8\\nFractional part: (110)(000) = 6 0_8\\n\\implies (AF5.C)_{16} = (5365.6)_8.\\n\\n2. (634.25)_8 to Decimal:\\n= 6 \\times 8^2 + 3 \\times 8^1 + 4 \\times 8^0 + 2 \\times 8^{-1} + 5 \\times 8^{-2}\\n= 6 \\times 64 + 3 \\times 8 + 4 \\times 1 + 2 \\times 0.125 + 5 \\times 0.015625\\n= 384 + 24 + 4 + 0.25 + 0.078125 = 412.328125_{10}.',
                  markingScheme: '2 Marks for Hex to Octal conversion with binary intermediate | 2 Marks for Octal to Decimal polynomial expansion'
                }
              ]
            }
          ]
        }
      ]
    }
  },

  // =========================================================================
  // 2. BMAT-001: Engineering Mathematics I
  // =========================================================================
  {
    id: 'qp-math1-001',
    code: 'BMAT-001',
    subject: 'Engineering Mathematics I',
    semester: 'Semester 1',
    semNumber: 1,
    year: '1st Year',
    course: 'B.Tech (All Branches)',
    university: 'Maharishi Markandeshwar (Deemed to be University), Mullana',
    timeAllowed: '3 Hours',
    maxMarks: 60,
    passingMarks: 24,
    probability: '99% High-Yield Match',
    instructions: [
      'Question No. 1 in Section A is COMPULSORY (20 marks).',
      'Attempt any FOUR questions from Section B, selecting ONE question from each Unit (10 marks each).',
      'All parts of a question should be answered together.',
      'Use of non-programmable scientific calculators is permitted.'
    ],
    sectionA: {
      title: 'SECTION A (COMPULSORY)',
      marks: 20,
      note: 'Answer ALL ten questions. Each question carries 2 marks.',
      questions: [
        {
          qNum: 'Q1 (a)',
          unit: 'Unit 1',
          marks: 2,
          question: 'Define the Rank of a Matrix. What is the rank of a non-zero row echelon matrix?',
          expectedFrequency: 'Every Year (2020-2024)',
          modelAnswer: 'The Rank of a matrix A, denoted by \\rho(A), is the maximum number of linearly independent row (or column) vectors, or equivalently, the maximum order of a non-zero minor of A. In a row echelon matrix, the rank is strictly equal to the number of non-zero rows.',
          keyMarkingPoints: ['1 Mark for linearly independent rows/minor definition', '1 Mark for number of non-zero rows in echelon form']
        },
        {
          qNum: 'Q1 (b)',
          unit: 'Unit 1',
          marks: 2,
          question: 'State Cayley-Hamilton Theorem. If A is a 2x2 matrix such that A^2 - 4A + 3I = 0, find A^{-1}.',
          expectedFrequency: 'High Frequency Question',
          modelAnswer: 'Statement: Every square matrix satisfies its own characteristic equation: |A - \\lambda I| = 0 \\implies p(A) = 0.\\nInverse calculation: Given A^2 - 4A + 3I = 0. Multiply by A^{-1}:\\nA - 4I + 3A^{-1} = 0 \\implies 3A^{-1} = 4I - A \\implies A^{-1} = \\frac{1}{3}(4I - A).',
          keyMarkingPoints: ['1 Mark for stating Cayley-Hamilton theorem', '1 Mark for deriving A^-1 = (4I - A)/3']
        },
        {
          qNum: 'Q1 (c)',
          unit: 'Unit 2',
          marks: 2,
          question: 'State the hypotheses and conclusion of Rolle\'s Theorem for a real function f(x).',
          expectedFrequency: 'Every Year Standard',
          modelAnswer: 'Hypotheses: (i) f(x) is continuous on [a, b], (ii) f(x) is differentiable on (a, b), and (iii) f(a) = f(b).\\nConclusion: There exists at least one point c \\in (a, b) such that f\'(c) = 0.',
          keyMarkingPoints: ['1 Mark for the three hypotheses', '1 Mark for f\'(c) = 0 with c in open interval (a, b)']
        },
        {
          qNum: 'Q1 (d)',
          unit: 'Unit 2',
          marks: 2,
          question: 'Define the Radius of Curvature (\\rho) and write its formula for a Cartesian curve y = f(x).',
          expectedFrequency: 'High Frequency',
          modelAnswer: 'Radius of Curvature \\rho is the reciprocal of curvature \\kappa (\\rho = 1/\\kappa = |ds/d\\psi|), representing the radius of the osculating circle at that point.\\nCartesian Formula: \\rho = \\frac{[1 + (y_1)^2]^{3/2}}{|y_2|}, \\quad \\text{where } y_1 = \\frac{dy}{dx}, \\; y_2 = \\frac{d^2y}{dx^2}.',
          keyMarkingPoints: ['1 Mark for reciprocal of curvature definition', '1 Mark for exact Cartesian formula']
        },
        {
          qNum: 'Q1 (e)',
          unit: 'Unit 2',
          marks: 2,
          question: 'State the relation between Beta and Gamma functions: B(m, n) = \\frac{\\Gamma(m)\\Gamma(n)}{\\Gamma(m+n)}. Calculate the value of \\Gamma(1/2).',
          expectedFrequency: 'Every Year (2021, 2023, 2024)',
          modelAnswer: 'Relation: B(m, n) = \\frac{\\Gamma(m)\\Gamma(n)}{\\Gamma(m+n)} \\quad (m > 0, n > 0).\\nCalculation of \\Gamma(1/2): Using \\Gamma(n)\\Gamma(1-n) = \\frac{\\pi}{\\sin(n\\pi)}, set n = 1/2:\\n[\\Gamma(1/2)]^2 = \\frac{\\pi}{\\sin(\\pi/2)} = \\pi \\implies \\Gamma(1/2) = \\sqrt{\\pi}.',
          keyMarkingPoints: ['1 Mark for stating Beta-Gamma relation', '1 Mark for showing Gamma(1/2) = sqrt(pi)']
        },
        {
          qNum: 'Q1 (f)',
          unit: 'Unit 3',
          marks: 2,
          question: 'State Euler\'s Theorem on Homogeneous Functions for two variables x and y.',
          expectedFrequency: 'Frequent Exam Question',
          modelAnswer: 'If u = f(x, y) is a homogeneous function of degree n in x and y (i.e. f(tx, ty) = t^n f(x, y)), then:\\nx \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = n \\cdot u.',
          keyMarkingPoints: ['1 Mark for homogeneous function condition', '1 Mark for partial derivative summation identity']
        },
        {
          qNum: 'Q1 (g)',
          unit: 'Unit 3',
          marks: 2,
          question: 'Define Solenoidal and Irrotational vector fields in terms of vector differential operator \\nabla.',
          expectedFrequency: 'Every Alternate Year',
          modelAnswer: '1. A vector field \\vec{F} is Solenoidal if its divergence is identically zero: \\nabla \\cdot \\vec{F} = 0 (no net flux source or sink).\\n2. A vector field \\vec{F} is Irrotational (Conservative) if its curl is zero: \\nabla \\times \\vec{F} = \\vec{0}, implying \\vec{F} = \\nabla \\phi for some scalar potential \\phi.',
          keyMarkingPoints: ['1 Mark for div F = 0 (solenoidal)', '1 Mark for curl F = 0 (irrotational)']
        },
        {
          qNum: 'Q1 (h)',
          unit: 'Unit 4',
          marks: 2,
          question: 'State D\'Alembert\'s Ratio Test for testing the convergence of an infinite series of positive terms.',
          expectedFrequency: 'Every Year Standard',
          modelAnswer: 'Let \\sum u_n be a series of positive terms and let L = \\lim_{n \\to \\infty} \\frac{u_n}{u_{n+1}} (or \\lim \\frac{u_{n+1}}{u_n} = \\lambda):\\n- If L > 1 (\\lambda < 1), the series is CONVERGENT.\\n- If L < 1 (\\lambda > 1), the series is DIVERGENT.\\n- If L = 1 (\\lambda = 1), the test FAILS.',
          keyMarkingPoints: ['1 Mark for limit statement', '1 Mark for all three convergence/divergence/failure conditions']
        },
        {
          qNum: 'Q1 (i)',
          unit: 'Unit 4',
          marks: 2,
          question: 'State Dirichlet\'s Conditions for the Fourier expansion of a periodic function f(x) of period 2\\pi.',
          expectedFrequency: 'High Frequency Question',
          modelAnswer: 'A function f(x) defined in (-\pi, \pi) can be expanded in a convergent Fourier series if:\\n1. f(x) is single-valued and periodic with period 2\\pi.\\n2. f(x) is piecewise continuous (finite number of finite discontinuities in any one period).\\n3. f(x) has a finite number of local maxima and minima in any one period.',
          keyMarkingPoints: ['1 Mark for single-valued periodic condition', '1 Mark for piecewise continuous and finite extrema']
        },
        {
          qNum: 'Q1 (j)',
          unit: 'Unit 4',
          marks: 2,
          question: 'If f(x) is an odd function in the symmetric interval (-l, l), what are the values of Fourier coefficients a_0, a_n, and b_n?',
          expectedFrequency: 'Standard Symmetry Question',
          modelAnswer: 'For an odd function f(-x) = -f(x) in (-l, l):\\n1. a_0 = \\frac{1}{l} \\int_{-l}^l f(x) dx = 0\\n2. a_n = \\frac{1}{l} \\int_{-l}^l f(x) \\cos\\left(\\frac{n\\pi x}{l}\\right) dx = 0 (integrand is odd)\\n3. b_n = \\frac{2}{l} \\int_0^l f(x) \\sin\\left(\\frac{n\\pi x}{l}\\right) dx \\ne 0 (Fourier Sine Series only).',
          keyMarkingPoints: ['1 Mark for a_0 = 0 and a_n = 0', '1 Mark for non-zero half-range sine coefficient b_n']
        }
      ]
    },
    sectionB: {
      title: 'SECTION B (UNIT-WISE LONG QUESTIONS)',
      marks: 40,
      note: 'Attempt ONE question from EACH Unit. Each question carries 10 marks.',
      units: [
        {
          unitNumber: 'UNIT I',
          syllabusTopic: 'Matrices, Rank & Gauss-Jordan Inversion',
          questions: [
            {
              qNum: 'Q2',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Using the Gauss-Jordan method, find the inverse of the matrix: A = \\begin{bmatrix} 2 & 1 & 1 \\\\ 1 & 2 & 1 \\\\ 1 & 1 & 2 \\end{bmatrix}.',
                  solution: '1. Augment matrix with I_3: [A | I] = \\begin{bmatrix} 2 & 1 & 1 & | & 1 & 0 & 0 \\\\ 1 & 2 & 1 & | & 0 & 1 & 0 \\\\ 1 & 1 & 2 & | & 0 & 0 & 1 \\end{bmatrix}.\\n2. Swap R_1 \\leftrightarrow R_2 to get leading 1: [A | I] ~ \\begin{bmatrix} 1 & 2 & 1 & | & 0 & 1 & 0 \\\\ 2 & 1 & 1 & | & 1 & 0 & 0 \\\\ 1 & 1 & 2 & | & 0 & 0 & 1 \\end{bmatrix}.\\n3. R_2 \\to R_2 - 2R_1, R_3 \\to R_3 - R_1: \\begin{bmatrix} 1 & 2 & 1 & | & 0 & 1 & 0 \\\\ 0 & -3 & -1 & | & 1 & -2 & 0 \\\\ 0 & -1 & 1 & | & 0 & -1 & 1 \\end{bmatrix}.\\n4. Swap R_2 \\leftrightarrow R_3, multiply R_2 by -1: \\begin{bmatrix} 1 & 2 & 1 & | & 0 & 1 & 0 \\\\ 0 & 1 & -1 & | & 0 & 1 & -1 \\\\ 0 & -3 & -1 & | & 1 & -2 & 0 \\end{bmatrix}.\\n5. R_3 \\to R_3 + 3R_2: \\begin{bmatrix} 1 & 2 & 1 & | & 0 & 1 & 0 \\\\ 0 & 1 & -1 & | & 0 & 1 & -1 \\\\ 0 & 0 & -4 & | & 1 & 1 & -3 \\end{bmatrix}.\\n6. Normalize R_3 \\to -1/4 R_3, then back substitute above pivots:\\nResult: A^{-1} = \\frac{1}{4} \\begin{bmatrix} 3 & -1 & -1 \\\\ -1 & 3 & -1 \\\\ -1 & -1 & 3 \\end{bmatrix}.',
                  markingScheme: '2 Marks for augmented matrix & initial row operations | 2 Marks for echelon reduction | 2 Marks for final verified inverse'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Find the eigenvalues and eigenvectors of the matrix: A = \\begin{bmatrix} 3 & 1 & 4 \\\\ 0 & 2 & 6 \\\\ 0 & 0 & 5 \\end{bmatrix}.',
                  solution: '1. Characteristic equation: |A - \\lambda I| = 0. Since A is an upper triangular matrix, its eigenvalues are simply its main diagonal entries:\\n\\lambda_1 = 3, \\quad \\lambda_2 = 2, \\quad \\lambda_3 = 5.\\n2. For \\lambda = 3: (A - 3I)X = 0 \\implies \\begin{bmatrix} 0 & 1 & 4 \\\\ 0 & -1 & 6 \\\\ 0 & 0 & 2 \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 0 \\\\ 0 \\end{bmatrix} \\implies x_2 = 0, x_3 = 0, x_1 = k_1 \\implies X_1 = [1, 0, 0]^T.\\n3. For \\lambda = 2: (A - 2I)X = 0 \\implies x_1 + x_2 + 4x_3 = 0, 6x_3 = 0 \\implies x_3 = 0, x_1 = -x_2 \\implies X_2 = [1, -1, 0]^T.\\n4. For \\lambda = 5: (A - 5I)X = 0 \\implies -2x_1 + x_2 + 4x_3 = 0, -3x_2 + 6x_3 = 0 \\implies x_2 = 2x_3, -2x_1 + 2x_3 + 4x_3 = 0 \\implies x_1 = 3x_3 \\implies X_3 = [3, 2, 1]^T.',
                  markingScheme: '1 Mark for eigenvalues (3, 2, 5) | 1 Mark each for the three eigenvectors'
                }
              ]
            },
            {
              qNum: 'Q3 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Verify Cayley-Hamilton Theorem for the matrix: A = \\begin{bmatrix} 1 & 2 \\\\ 2 & -1 \\end{bmatrix}. Hence, find A^8.',
                  solution: '1. Characteristic Equation: |A - \\lambda I| = \\begin{vmatrix} 1 - \\lambda & 2 \\\\ 2 & -1 - \\lambda \\end{vmatrix} = (1 - \\lambda)(-1 - \\lambda) - 4 = \\lambda^2 - 1 - 4 = \\lambda^2 - 5 = 0.\\n2. Verification: Check if A^2 - 5I = 0:\\nA^2 = \\begin{bmatrix} 1 & 2 \\\\ 2 & -1 \\end{bmatrix} \\begin{bmatrix} 1 & 2 \\\\ 2 & -1 \\end{bmatrix} = \\begin{bmatrix} 1+4 & 2-2 \\\\ 2-2 & 4+1 \\end{bmatrix} = \\begin{bmatrix} 5 & 0 \\\\ 0 & 5 \\end{bmatrix} = 5I.\\n\\implies A^2 - 5I = 0. Hence Cayley-Hamilton is verified!\\n3. Compute A^8: From A^2 = 5I:\\nA^4 = (A^2)^2 = (5I)^2 = 25I.\\nA^8 = (A^4)^2 = (25I)^2 = 625I = \\begin{bmatrix} 625 & 0 \\\\ 0 & 625 \\end{bmatrix}.',
                  markingScheme: '3 Marks for characteristic polynomial & Cayley-Hamilton verification | 3 Marks for step-by-step A^8 evaluation'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Investigate the consistency of the following system of linear equations and solve if consistent: x + y + z = 6, x + 2y + 3z = 10, x + 2y + \\lambda z = \\mu. For what values of \\lambda and \\mu does the system have: (i) No solution, (ii) A unique solution, and (iii) Infinitely many solutions?',
                  solution: '1. Augmented Matrix: [A | B] = \\begin{bmatrix} 1 & 1 & 1 & | & 6 \\\\ 1 & 2 & 3 & | & 10 \\\\ 1 & 2 & \\lambda & | & \\mu \\end{bmatrix}.\\n2. R_2 \\to R_2 - R_1, R_3 \\to R_3 - R_1: \\begin{bmatrix} 1 & 1 & 1 & | & 6 \\\\ 0 & 1 & 2 & | & 4 \\\\ 0 & 1 & \\lambda - 1 & | & \\mu - 6 \\end{bmatrix}.\\n3. R_3 \\to R_3 - R_2: \\begin{bmatrix} 1 & 1 & 1 & | & 6 \\\\ 0 & 1 & 2 & | & 4 \\\\ 0 & 0 & \\lambda - 3 & | & \\mu - 10 \\end{bmatrix}.\\n4. Analysis:\\n(i) No solution: \\rho(A) \\ne \\rho(A|B) \\implies \\lambda = 3 \\text{ and } \\mu \\ne 10.\\n(ii) Unique solution: \\rho(A) = \\rho(A|B) = 3 \\implies \\lambda \\ne 3 (\\mu \\text{ can have any real value}).\\n(iii) Infinitely many solutions: \\rho(A) = \\rho(A|B) < 3 \\implies \\lambda = 3 \\text{ and } \\mu = 10.',
                  markingScheme: '1.5 Marks for row echelon reduction | 2.5 Marks for identifying the three lambda, mu conditions correctly'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT II',
          syllabusTopic: 'Calculus, Curvature & Beta-Gamma Functions',
          questions: [
            {
              qNum: 'Q4',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Find the radius of curvature \\rho at any point t on the cycloid: x = a(t + \\sin t), \\; y = a(1 - \\cos t).',
                  solution: '1. Derivatives w.r.t t:\\n\\frac{dx}{dt} = x\' = a(1 + \\cos t) = 2a \\cos^2(t/2).\\n\\frac{dy}{dt} = y\' = a \\sin t = 2a \\sin(t/2) \\cos(t/2).\\nx\'\' = -a \\sin t, \\quad y\'\' = a \\cos t.\\n2. Denominator x\' y\'\' - y\' x\'\':\\n= [a(1 + \\cos t)](a \\cos t) - (a \\sin t)(-a \\sin t) = a^2(\\cos t + \\cos^2 t + \\sin^2 t) = a^2(1 + \\cos t) = 2a^2 \\cos^2(t/2).\\n3. Numerator (x\'^2 + y\'^2)^{3/2}:\\nx\'^2 + y\'^2 = a^2(1 + 2\\cos t + \\cos^2 t + \\sin^2 t) = 2a^2(1 + \\cos t) = 4a^2 \\cos^2(t/2).\\n(x\'^2 + y\'^2)^{3/2} = [4a^2 \\cos^2(t/2)]^{3/2} = 8a^3 \\cos^3(t/2).\\n4. Radius of Curvature \\rho:\\n\\rho = \\frac{8a^3 \\cos^3(t/2)}{2a^2 \\cos^2(t/2)} = 4a \\cos(t/2).',
                  markingScheme: '2 Marks for first and second derivatives | 2 Marks for numerator and denominator evaluation | 2 Marks for final simplified rho = 4a cos(t/2)'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Expand f(x) = e^x \\cos x up to the term containing x^4 using Maclaurin\'s theorem.',
                  solution: '1. Successive derivatives at x = 0:\\nf(x) = e^x \\cos x \\implies f(0) = 1\\nf\'(x) = e^x(\\cos x - \\sin x) \\implies f\'(0) = 1(1 - 0) = 1\\nf\'\'(x) = e^x[(-2\\sin x)] \\implies f\'\'(0) = 0\\nf\'\'\'(x) = e^x[-2\\sin x - 2\\cos x] \\implies f\'\'\'(0) = -2\\nf^{(4)}(x) = e^x[-4\\cos x] \\implies f^{(4)}(0) = -4\\n2. Substitute into Maclaurin Series formula:\\nf(x) = f(0) + x f\'(0) + \\frac{x^2}{2!} f\'\'(0) + \\frac{x^3}{3!} f\'\'\'(0) + \\frac{x^4}{4!} f^{(4)}(0) + \\dots\\ne^x \\cos x = 1 + x(1) + 0 + \\frac{x^3}{6}(-2) + \\frac{x^4}{24}(-4) + \\dots\\ne^x \\cos x = 1 + x - \\frac{x^3}{3} - \\frac{x^4}{6} + \\dots',
                  markingScheme: '2 Marks for five successive derivative evaluations at x = 0 | 2 Marks for correct Maclaurin polynomial expansion'
                }
              ]
            },
            {
              qNum: 'Q5 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Evaluate the definite integral using Beta and Gamma functions: \\int_0^{\\pi/2} \\sin^6 \\theta \\cos^4 \\theta \\, d\\theta.',
                  solution: '1. Standard Beta-Gamma identity:\\n\\int_0^{\\pi/2} \\sin^p \\theta \\cos^q \\theta \\, d\\theta = \\frac{\\Gamma\\left(\\frac{p+1}{2}\\right) \\Gamma\\left(\\frac{q+1}{2}\\right)}{2 \\Gamma\\left(\\frac{p+q+2}{2}\\right)}.\\n2. Substitute p = 6, q = 4:\\n= \\frac{\\Gamma\\left(\\frac{6+1}{2}\\right) \\Gamma\\left(\\frac{4+1}{2}\\right)}{2 \\Gamma\\left(\\frac{6+4+2}{2}\\right)} = \\frac{\\Gamma(7/2) \\Gamma(5/2)}{2 \\Gamma(6)}.\\n3. Evaluate Gamma values using \\Gamma(n+1) = n \\Gamma(n):\\n\\Gamma(7/2) = \\frac{5}{2} \\cdot \\frac{3}{2} \\cdot \\frac{1}{2} \\sqrt{\\pi} = \\frac{15}{8}\\sqrt{\\pi}.\\n\\Gamma(5/2) = \\frac{3}{2} \\cdot \\frac{1}{2} \\sqrt{\\pi} = \\frac{3}{4}\\sqrt{\\pi}.\\n\\Gamma(6) = 5! = 120.\\n4. Numerical calculation:\\n= \\frac{(15/8 \\sqrt{\\pi})(3/4 \\sqrt{\\pi})}{2 \\times 120} = \\frac{45\\pi / 32}{240} = \\frac{45\\pi}{32 \\times 240} = \\frac{3\\pi}{32 \\times 16} = \\frac{3\\pi}{512}.',
                  markingScheme: '2 Marks for Beta-Gamma integral formula | 2 Marks for Gamma values calculation | 2 Marks for final exact result 3pi/512'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Evaluate the indeterminate limit using L\'Hospital\'s Rule: \\lim_{x \\to 0} \\left( \\frac{1}{x} - \\frac{1}{\\sin x} \\right).',
                  solution: '1. Form check at x = 0: (\\infty - \\infty) indeterminate form.\\n2. Combine into a single fractional quotient:\\n\\lim_{x \\to 0} \\frac{\\sin x - x}{x \\sin x} \\quad \\left(\\text{Form: } \\frac{0}{0}\\right).\\n3. Apply L\'Hospital\'s Rule (Differentiate numerator and denominator w.r.t x):\\n= \\lim_{x \\to 0} \\frac{\\cos x - 1}{\\sin x + x \\cos x} \\quad \\left(\\text{Still } \\frac{0}{0}\\right).\\n4. Apply L\'Hospital\'s Rule a second time:\\n= \\lim_{x \\to 0} \\frac{-\\sin x}{\\cos x + \\cos x - x \\sin x} = \\lim_{x \\to 0} \\frac{-\\sin x}{2\\cos x - x \\sin x}.\\n5. Substitute x = 0:\\n= \\frac{0}{2(1) - 0} = \\frac{0}{2} = 0.',
                  markingScheme: '1 Mark for converting to 0/0 form | 2 Marks for two successive L\'Hospital differentiations | 1 Mark for final answer 0'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT III',
          syllabusTopic: 'Multivariable Calculus & Vector Differentiation',
          questions: [
            {
              qNum: 'Q6',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'If u = \\sin^{-1}\\left( \\frac{x^2 + y^2}{x + y} \\right), prove that: x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = \\tan u.',
                  solution: '1. Transform to algebraic homogeneous function: Let z = \\sin u = \\frac{x^2 + y^2}{x + y}.\\n2. Test homogeneity of z:\\nz(tx, ty) = \\frac{t^2 x^2 + t^2 y^2}{tx + ty} = \\frac{t^2(x^2 + y^2)}{t(x + y)} = t^1 \\cdot z(x, y).\\nHence, z is a homogeneous function of degree n = 1 in x and y.\\n3. Apply Euler\'s Theorem to z:\\nx \\frac{\\partial z}{\\partial x} + y \\frac{\\partial z}{\\partial y} = 1 \\cdot z = z.\\n4. Relate partial derivatives of z to u:\\n\\frac{\\partial z}{\\partial x} = \\frac{d}{du}(\\sin u) \\frac{\\partial u}{\\partial x} = \\cos u \\frac{\\partial u}{\\partial x}.\\n\\frac{\\partial z}{\\partial y} = \\cos u \\frac{\\partial u}{\\partial y}.\\n5. Substitute back:\\nx \\left(\\cos u \\frac{\\partial u}{\\partial x}\\right) + y \\left(\\cos u \\frac{\\partial u}{\\partial y}\\right) = \\sin u.\\nDivide by \\cos u:\\nx \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = \\frac{\\sin u}{\\cos u} = \\tan u. Hence Proved!',
                  markingScheme: '2 Marks for defining z = sin u and checking degree n = 1 | 2 Marks for applying Euler theorem | 2 Marks for chain rule and dividing by cos u'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Prove that the vector field \\vec{F} = (y^2 \\cos x + z^3)\\hat{i} + (2y \\sin x - 4)\\hat{j} + (3x z^2 + 2)\\hat{k} is irrotational, and find its scalar potential \\phi such that \\vec{F} = \\nabla \\phi.',
                  solution: '1. Check Irrotational: curl \\vec{F} = \\nabla \\times \\vec{F} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ \\partial/\\partial x & \\partial/\\partial y & \\partial/\\partial z \\\\ y^2 \\cos x + z^3 & 2y \\sin x - 4 & 3xz^2 + 2 \\end{vmatrix}.\\n- \\hat{i} component: \\frac{\\partial}{\\partial y}(3xz^2 + 2) - \\frac{\\partial}{\\partial z}(2y \\sin x - 4) = 0 - 0 = 0.\\n- \\hat{j} component: -[\\frac{\\partial}{\\partial x}(3xz^2 + 2) - \\frac{\\partial}{\\partial z}(y^2 \\cos x + z^3)] = -[3z^2 - 3z^2] = 0.\\n- \\hat{k} component: \\frac{\\partial}{\\partial x}(2y \\sin x - 4) - \\frac{\\partial}{\\partial y}(y^2 \\cos x + z^3) = 2y \\cos x - 2y \\cos x = 0.\\n\\implies \\text{curl } \\vec{F} = \\vec{0}, so \\vec{F} is Irrotational.\\n2. Scalar Potential \\phi:\\nd\\phi = F_1 dx + F_2 dy + F_3 dz = (y^2 \\cos x + z^3)dx + (2y \\sin x - 4)dy + (3xz^2 + 2)dz\\n= (y^2 \\cos x dx + 2y \\sin x dy) + (z^3 dx + 3xz^2 dz) - 4dy + 2dz\\n= d(y^2 \\sin x) + d(x z^3) - d(4y) + d(2z).\\nIntegrating: \\phi(x, y, z) = y^2 \\sin x + x z^3 - 4y + 2z + C.',
                  markingScheme: '2 Marks for proving curl F = 0 | 2 Marks for integrating exact differential d(phi) to find phi'
                }
              ]
            },
            {
              qNum: 'Q7 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Find the directional derivative of \\phi = x^2 y z + 4 x z^2 at the point P(1, -2, -1) in the direction of the vector \\vec{a} = 2\\hat{i} - \\hat{j} - 2\\hat{k}. In which direction is the directional derivative maximum, and what is its maximum magnitude?',
                  solution: '1. Gradient \\nabla \\phi:\\n\\nabla \\phi = \\left(2xyz + 4z^2\\right)\\hat{i} + \\left(x^2 z\\right)\\hat{j} + \\left(x^2 y + 8xz\\right)\\hat{k}.\\nAt P(1, -2, -1):\\n- \\hat{i}: 2(1)(-2)(-1) + 4(-1)^2 = 4 + 4 = 8.\\n- \\hat{j}: (1)^2(-1) = -1.\\n- \\hat{k}: (1)^2(-2) + 8(1)(-1) = -2 - 8 = -10.\\n\\implies \\nabla \\phi = 8\\hat{i} - \\hat{j} - 10\\hat{k}.\\n2. Unit vector \\hat{a} in direction of \\vec{a}:\\n|\\vec{a}| = \\sqrt{2^2 + (-1)^2 + (-2)^2} = \\sqrt{4 + 1 + 4} = 3 \\implies \\hat{a} = \\frac{2\\hat{i} - \\hat{j} - 2\\hat{k}}{3}.\\n3. Directional Derivative:\\n\\text{D.D.} = \\nabla \\phi \\cdot \\hat{a} = \\frac{8(2) + (-1)(-1) + (-10)(-2)}{3} = \\frac{16 + 1 + 20}{3} = \\frac{37}{3} \\approx 12.33.\\n4. Maximum Directional Derivative:\\nOccurs strictly in the direction of \\nabla \\phi itself (8\\hat{i} - \\hat{j} - 10\\hat{k}).\\nMaximum magnitude = |\\nabla \\phi| = \\sqrt{8^2 + (-1)^2 + (-10)^2} = \\sqrt{64 + 1 + 100} = \\sqrt{165} \\approx 12.845.',
                  markingScheme: '2 Marks for gradient at P | 2 Marks for dot product with unit vector (37/3) | 2 Marks for maximum direction and magnitude sqrt(165)'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Find the Jacobian J = \\frac{\\partial(x, y)}{\\partial(u, v)} if x = u(1 - v) and y = uv. Verify that J \\cdot J\' = 1.',
                  solution: '1. Jacobian definition:\\nJ = \\frac{\\partial(x, y)}{\\partial(u, v)} = \\begin{vmatrix} \\frac{\\partial x}{\\partial u} & \\frac{\\partial x}{\\partial v} \\\\[4pt] \\frac{\\partial y}{\\partial u} & \\frac{\\partial y}{\\partial v} \\end{vmatrix}.\\n2. Partial derivatives: x = u - uv \\implies \\frac{\\partial x}{\\partial u} = 1 - v, \\; \\frac{\\partial x}{\\partial v} = -u.\\ny = uv \\implies \\frac{\\partial y}{\\partial u} = v, \\; \\frac{\\partial y}{\\partial v} = u.\\n3. Determinant: J = (1 - v)(u) - (-u)(v) = u - uv + uv = u.\\n4. Reverse transformation: Adding x and y gives x + y = u. Then v = y/u = \\frac{y}{x + y}.\\nJ\' = \\frac{\\partial(u, v)}{\\partial(x, y)} = \\begin{vmatrix} 1 & 1 \\\\[4pt] -\\frac{y}{(x+y)^2} & \\frac{x}{(x+y)^2} \\end{vmatrix} = \\frac{x + y}{(x+y)^2} = \\frac{1}{x+y} = \\frac{1}{u}.\\n5. Verification: J \\cdot J\' = u \\cdot \\frac{1}{u} = 1. Verified!',
                  markingScheme: '2 Marks for J = u | 2 Marks for reverse Jacobian J\' = 1/u and verification J . J\' = 1'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT IV',
          syllabusTopic: 'Sequences & Series and Fourier Series',
          questions: [
            {
              qNum: 'Q8',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Obtain the Fourier series expansion for f(x) = x^2 in the interval (-\pi, \pi). Hence, deduce that: \\frac{1}{1^2} - \\frac{1}{2^2} + \\frac{1}{3^2} - \\frac{1}{4^2} + \\dots = \\frac{\\pi^2}{12} and \\frac{1}{1^2} + \\frac{1}{2^2} + \\frac{1}{3^2} + \\dots = \\frac{\\pi^2}{6}.',
                  solution: '1. Parity: f(-x) = (-x)^2 = x^2 = f(x) \\implies f(x) is an EVEN function. Hence b_n = 0.\\n2. Compute a_0:\\na_0 = \\frac{2}{\\pi} \\int_0^\\pi x^2 dx = \\frac{2}{\\pi} \\left[ \\frac{x^3}{3} \\right]_0^\\pi = \\frac{2\\pi^2}{3}.\\n3. Compute a_n by parts:\\na_n = \\frac{2}{\\pi} \\int_0^\\pi x^2 \\cos(nx) dx = \\frac{2}{\\pi} \\left[ x^2 \\frac{\\sin nx}{n} - 2x \\left(-\\frac{\\cos nx}{n^2}\\right) + 2 \\left(-\\frac{\\sin nx}{n^3}\\right) \\right]_0^\\pi\\n= \\frac{2}{\\pi} \\left[ \\frac{2\\pi \\cos(n\\pi)}{n^2} \\right] = \\frac{4(-1)^n}{n^2}.\\n4. Fourier Series:\\nx^2 = \\frac{a_0}{2} + \\sum_{n=1}^\\infty a_n \\cos(nx) = \\frac{\\pi^2}{3} + 4 \\sum_{n=1}^\\infty \\frac{(-1)^n}{n^2} \\cos(nx)\\n= \\frac{\\pi^2}{3} - 4 \\left( \\frac{\\cos x}{1^2} - \\frac{\\cos 2x}{2^2} + \\frac{\\cos 3x}{3^2} - \\dots \\right).\\n5. Deductions:\\n(i) At x = 0: 0 = \\frac{\\pi^2}{3} - 4 \\left( \\frac{1}{1^2} - \\frac{1}{2^2} + \\frac{1}{3^2} - \\dots \\right) \\implies \\sum_{n=1}^\\infty \\frac{(-1)^{n-1}}{n^2} = \\frac{\\pi^2}{12}.\\n(ii) At x = \\pi: \\pi^2 = \\frac{\\pi^2}{3} + 4 \\sum_{n=1}^\\infty \\frac{1}{n^2} \\implies \\frac{2\\pi^2}{3} = 4 \\sum \\frac{1}{n^2} \\implies \\sum_{n=1}^\\infty \\frac{1}{n^2} = \\frac{\\pi^2}{6}.',
                  markingScheme: '2 Marks for a_0 and a_n integrations | 2 Marks for complete Fourier series | 2 Marks for both deductions'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Test the convergence of the infinite series: \\sum_{n=1}^\\infty \\frac{n! \\cdot 2^n}{n^n}.',
                  solution: '1. Let u_n = \\frac{n! \\, 2^n}{n^n}. Then u_{n+1} = \\frac{(n+1)! \\, 2^{n+1}}{(n+1)^{n+1}} = \\frac{(n+1) n! \\, 2 \\cdot 2^n}{(n+1) (n+1)^n} = \\frac{2 \\, n! \\, 2^n}{(n+1)^n}.\\n2. Form ratio \\frac{u_n}{u_{n+1}}:\\n\\frac{u_n}{u_{n+1}} = \\frac{n! \\, 2^n}{n^n} \\times \\frac{(n+1)^n}{2 \\, n! \\, 2^n} = \\frac{1}{2} \\left( \\frac{n+1}{n} \\right)^n = \\frac{1}{2} \\left( 1 + \\frac{1}{n} \\right)^n.\\n3. Take limit as n \\to \\infty:\\nL = \\lim_{n \\to \\infty} \\frac{u_n}{u_{n+1}} = \\frac{1}{2} \\lim_{n \\to \\infty} \\left( 1 + \\frac{1}{n} \\right)^n = \\frac{e}{2}.\\n4. Since e \\approx 2.71828, L = \\frac{2.718}{2} = 1.359 > 1.\\n5. Conclusion: By D\'Alembert\'s Ratio Test, since L > 1, the given series is strictly CONVERGENT.',
                  markingScheme: '1 Mark for writing u_n and u_{n+1} | 2 Marks for ratio simplification with (1 + 1/n)^n -> e | 1 Mark for L = e/2 > 1 convergence conclusion'
                }
              ]
            },
            {
              qNum: 'Q9 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Find the half-range Fourier sine series for the function f(x) = x(\\pi - x) in the interval (0, \\pi). Hence, deduce that: \\frac{1}{1^3} - \\frac{1}{3^3} + \\frac{1}{5^3} - \\frac{1}{7^3} + \\dots = \\frac{\\pi^3}{32}.',
                  solution: '1. For half-range sine series in (0, \\pi), a_0 = 0, a_n = 0:\\nb_n = \\frac{2}{\\pi} \\int_0^\\pi x(\\pi - x) \\sin(nx) dx = \\frac{2}{\\pi} \\int_0^\\pi (\\pi x - x^2) \\sin(nx) dx.\\n2. Integrate by parts using generalized Bernoulli rule:\\n= \\frac{2}{\\pi} \\left[ (\\pi x - x^2)\\left(-\\frac{\\cos nx}{n}\\right) - (\\pi - 2x)\\left(-\\frac{\\sin nx}{n^2}\\right) + (-2)\\left(\\frac{\\cos nx}{n^3}\\right) \\right]_0^\\pi\\nAt x = \\pi: [0 - 0 - \\frac{2\\cos n\\pi}{n^3}] = -\\frac{2(-1)^n}{n^3}.\\nAt x = 0: [0 - 0 - \\frac{2}{n^3}] = -\\frac{2}{n^3}.\\n\\implies b_n = \\frac{2}{\\pi} \\left[ -\\frac{2(-1)^n}{n^3} + \\frac{2}{n^3} \\right] = \\frac{4}{\\pi n^3}[1 - (-1)^n].\\n- For even n: b_n = 0.\\n- For odd n: b_n = \\frac{8}{\\pi n^3}.\\n3. Half-range Sine Series: f(x) = \\frac{8}{\\pi} \\sum_{n=1, 3, 5, \\dots}^\\infty \\frac{\\sin nx}{n^3} = \\frac{8}{\\pi} \\left( \\frac{\\sin x}{1^3} + \\frac{\\sin 3x}{3^3} + \\frac{\\sin 5x}{5^3} + \\dots \\right).\\n4. Deduction at x = \\pi/2: f(\\pi/2) = \\frac{\\pi}{2}\\left(\\pi - \\frac{\\pi}{2}\\right) = \\frac{\\pi^2}{4}.\\n\\frac{\\pi^2}{4} = \\frac{8}{\\pi} \\left( \\frac{1}{1^3} - \\frac{1}{3^3} + \\frac{1}{5^3} - \\dots \\right) \\implies \\frac{1}{1^3} - \\frac{1}{3^3} + \\frac{1}{5^3} - \\dots = \\frac{\\pi^3}{32}.',
                  markingScheme: '3 Marks for integration and finding b_n = 8/(pi n^3) for odd n | 1.5 Marks for Fourier expansion | 1.5 Marks for deduction at x = pi/2'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Test the alternating series for absolute and conditional convergence: \\sum_{n=1}^\\infty \\frac{(-1)^{n-1}}{\\sqrt{n}} = 1 - \\frac{1}{\\sqrt{2}} + \\frac{1}{\\sqrt{3}} - \\frac{1}{\\sqrt{4}} + \\dots',
                  solution: '1. Test for Convergence using Leibnitz\'s Rule:\\nHere u_n = \\frac{1}{\\sqrt{n}} > 0.\\n(i) u_{n+1} = \\frac{1}{\\sqrt{n+1}} < \\frac{1}{\\sqrt{n}} = u_n (terms are monotonically decreasing in magnitude).\\n(ii) \\lim_{n \\to \\infty} u_n = \\lim_{n \\to \\infty} \\frac{1}{\\sqrt{n}} = 0.\\nBy Leibnitz\'s Theorem, the alternating series is CONVERGENT.\\n2. Test for Absolute Convergence:\\nExamine the series of absolute values: \\sum |u_n| = \\sum_{n=1}^\\infty \\frac{1}{\\sqrt{n}} = \\sum_{n=1}^\\infty \\frac{1}{n^{1/2}}.\\nThis is a p-series with p = 1/2 \\le 1, which is strictly DIVERGENT.\\n3. Conclusion: Since the series \\sum u_n converges, but the absolute series \\sum |u_n| diverges, the given series is CONDITIONALLY CONVERGENT.',
                  markingScheme: '1.5 Marks for Leibnitz test showing convergence | 1.5 Marks for p-series (p=1/2) divergence | 1 Mark for conditional convergence conclusion'
                }
              ]
            }
          ]
        }
      ]
    }
  },

  // =========================================================================
  // 3. BCSE-008: Computational and Problem Solving using C
  // =========================================================================
  {
    id: 'qp-c-008',
    code: 'BCSE-008',
    subject: 'Computational and Problem Solving using C',
    semester: 'Semester 1',
    semNumber: 1,
    year: '1st Year',
    course: 'B.Tech (CSE / IT)',
    university: 'Maharishi Markandeshwar (Deemed to be University), Mullana',
    timeAllowed: '3 Hours',
    maxMarks: 60,
    passingMarks: 24,
    probability: '97% High-Yield Match',
    instructions: [
      'Question No. 1 in Section A is COMPULSORY (20 marks).',
      'Attempt any FOUR questions from Section B, selecting ONE question from each Unit (10 marks each).',
      'Write clean, syntactically valid C code with comments and variable declarations.'
    ],
    sectionA: {
      title: 'SECTION A (COMPULSORY)',
      marks: 20,
      note: 'Answer ALL ten questions. Each question carries 2 marks.',
      questions: [
        {
          qNum: 'Q1 (a)',
          unit: 'Unit 1',
          marks: 2,
          question: 'List the four stages of the C compilation pipeline in chronological order with their input and output files.',
          expectedFrequency: 'Every Year (2020-2024)',
          modelAnswer: '1. Preprocessing: main.c \\to main.i (Header expansion, macro substitution, comments stripped).\\n2. Compilation: main.i \\to main.s (Syntactic validation, parses into assembly instructions).\\n3. Assembly: main.s \\to main.o (Translates assembly into relocatable machine code / object file).\\n4. Linking: main.o + libc.a \\to a.out / program.exe (Resolves symbol addresses, produces executable).',
          keyMarkingPoints: ['1 Mark for all 4 names in correct order', '1 Mark for file extensions (.c, .i, .s, .o, .out/exe)']
        },
        {
          qNum: 'Q1 (b)',
          unit: 'Unit 1',
          marks: 2,
          question: 'Differentiate between Inductive Reasoning and Deductive Reasoning in computational problem solving.',
          expectedFrequency: 'Syllabus Unit 1 Standard',
          modelAnswer: '1. Deductive Logic (Top-Down): Starts with established general axioms or formal theorems and derives specific guaranteed conclusions (e.g. mathematical proofs, type checking).\\n2. Inductive Logic (Bottom-Up): Observes specific patterns/empirical data points to formulate general rules or probabilistic hypotheses (e.g. machine learning, empirical benchmarking).',
          keyMarkingPoints: ['1 Mark for Deductive (General to Specific)', '1 Mark for Inductive (Specific observations to General Rule)']
        },
        {
          qNum: 'Q1 (c)',
          unit: 'Unit 2',
          marks: 2,
          question: 'What is the output of the following C code snippet? Explain the operator precedence:\\nint a = 5, b = 2;\\nint c = a++ * ++b + a / b;',
          expectedFrequency: 'Precedence Trick Question',
          modelAnswer: 'Step 1: Prefix ++b increments b from 2 to 3. Evaluates as 3.\\nStep 2: Postfix a++ uses current value 5 in multiplication, then increments a to 6.\\nStep 3: Multiplication: 5 * 3 = 15.\\nStep 4: Division: a is now 6, b is 3 \\implies 6 / 3 = 2.\\nStep 5: Addition: 15 + 2 = 17.\\nFinal output: c = 17 (with a = 6, b = 3).',
          keyMarkingPoints: ['1 Mark for correct final answer c = 17', '1 Mark for step-by-step prefix/postfix precedence explanation']
        },
        {
          qNum: 'Q1 (d)',
          unit: 'Unit 2',
          marks: 2,
          question: 'Why is the "break" statement essential inside each case of a switch-case construct? What happens if it is omitted?',
          expectedFrequency: 'Every Year Common Question',
          modelAnswer: 'The "break" statement causes control to immediately exit the switch block once a matching case executes. If break is omitted, "Fall-Through" occurs: execution cascades uncontrollably through all subsequent case statements and default regardless of whether their condition matches.',
          keyMarkingPoints: ['1 Mark for exit switch explanation', '1 Mark for defining fall-through consequence']
        },
        {
          qNum: 'Q1 (e)',
          unit: 'Unit 3',
          marks: 2,
          question: 'Explain the 12-point storage classes matrix in C: compare "auto" vs "static" in terms of storage location, default initial value, scope, and lifetime.',
          expectedFrequency: 'High Yield Standard',
          modelAnswer: '| Attribute | auto | static |\\n| Storage | Stack Segment | Data/BSS Segment |\\n| Default Value | Garbage Value | Zero (0) |\\n| Scope | Local to block | Local to block/file |\\n| Lifetime | Till block terminates | Entire program execution |',
          keyMarkingPoints: ['1 Mark for storage and default values', '1 Mark for scope and lifetime retention across function calls']
        },
        {
          qNum: 'Q1 (f)',
          unit: 'Unit 3',
          marks: 2,
          question: 'Write a recursive C function to compute the Factorial of a non-negative integer n with proper base case condition.',
          expectedFrequency: 'Standard Recursion',
          modelAnswer: 'unsigned long long factorial(int n) {\\n    if (n <= 1) return 1; // Base case\\n    return (unsigned long long)n * factorial(n - 1); // Recursive step\\n}',
          keyMarkingPoints: ['1 Mark for base case (n <= 1)', '1 Mark for recursive call n * factorial(n-1)']
        },
        {
          qNum: 'Q1 (g)',
          unit: 'Unit 4',
          marks: 2,
          question: 'Differentiate between a NULL pointer, a Void pointer, and a Dangling pointer in C.',
          expectedFrequency: 'Frequent Topper Question',
          modelAnswer: '1. NULL Pointer: Points to memory address 0 ((void*)0), indicating it does not point to any valid data.\\n2. Void Pointer (void*): Generic untyped pointer that can store the address of any data type without casting, but cannot be dereferenced directly without typecast.\\n3. Dangling Pointer: A pointer that still stores the memory address of an object that has already been deallocated or freed from the heap.',
          keyMarkingPoints: ['1 Mark for NULL and Void definitions', '1 Mark for Dangling pointer pointing to freed/out-of-scope memory']
        },
        {
          qNum: 'Q1 (h)',
          unit: 'Unit 4',
          marks: 2,
          question: 'Distinguish between malloc() and calloc() dynamic memory allocation library functions.',
          expectedFrequency: 'Every Year (2020-2024)',
          modelAnswer: '1. malloc(size_t size): Takes 1 parameter (total bytes), allocates a single contiguous uninitialized block from heap containing random garbage values.\\n2. calloc(size_t num, size_t size): Takes 2 parameters (element count and element size), allocates num * size bytes and automatically initializes every allocated byte to zero (0).',
          keyMarkingPoints: ['1 Mark for argument difference (1 arg vs 2 args)', '1 Mark for initialization difference (garbage vs zero-cleared)']
        },
        {
          qNum: 'Q1 (i)',
          unit: 'Unit 4',
          marks: 2,
          question: 'Differentiate between a Structure and a Union in C with respect to memory allocation.',
          expectedFrequency: 'Standard Exam Favorite',
          modelAnswer: '1. Structure (struct): Each member receives its own dedicated memory offset. Total size = sum of sizes of all members (plus padding for struct alignment).\\n2. Union (union): All members share the same single memory location. Total size = size of the largest member. Modifying one member overwrites other members.',
          keyMarkingPoints: ['1 Mark for separate memory vs shared memory', '1 Mark for total size comparison (sum vs largest member)']
        },
        {
          qNum: 'Q1 (j)',
          unit: 'Unit 4',
          marks: 2,
          question: 'Name four file opening modes in C and state what happens if the file does not exist for mode "w" vs mode "r".',
          expectedFrequency: 'File Handling Standard',
          modelAnswer: 'Modes: "r" (read), "w" (write), "a" (append), "r+" (read/update).\\nBehavior: If file does not exist:\\n- Mode "r": fopen() fails and returns NULL.\\n- Mode "w": A brand new empty file with that name is created automatically.',
          keyMarkingPoints: ['1 Mark for listing 4 modes', '1 Mark for NULL return in "r" vs file creation in "w"']
        }
      ]
    },
    sectionB: {
      title: 'SECTION B (UNIT-WISE LONG QUESTIONS)',
      marks: 40,
      note: 'Attempt ONE question from EACH Unit. Each question carries 10 marks.',
      units: [
        {
          unitNumber: 'UNIT I',
          syllabusTopic: 'Programming Fundamentals & Compilation',
          questions: [
            {
              qNum: 'Q2',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain the 5 memory segments allocated to a C program in virtual RAM during runtime: Text (Code), Initialized Data, Uninitialized Data (BSS), Heap, and Stack. Draw a neat architectural diagram showing growth directions.',
                  solution: '1. Text Segment: Read-only memory storing compiled machine code instructions. Prevents accidental self-modification.\\n2. Initialized Data (.data): Stores global, static, and extern variables explicitly initialized to non-zero values (e.g. static int count = 10;).\\n3. Uninitialized Data (.bss): Stores global and static variables initialized to zero or uninitialized. Initialized to zero by runtime loader before main() executes.\\n4. Heap Segment: Dynamic runtime memory allocated via malloc(), calloc(), realloc() and released via free(). Grows upwards towards higher memory addresses.\\n5. Stack Segment: Stores automatic local variables, function parameters, and return addresses in stack frames. Follows LIFO order and grows downwards towards lower memory addresses.',
                  markingScheme: '2 Marks for architectural diagram with growth arrows | 4 Marks for defining all 5 segments with variable examples'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Draw a complete ANSI flowchart to determine whether a given positive integer N is a Prime number or Composite number.',
                  solution: '1. Start terminal symbol.\\n2. Input N.\\n3. Decision: If N <= 1 \\implies Output "Neither Prime nor Composite" \\implies Stop.\\n4. Decision: If N == 2 \\implies Output "Prime" \\implies Stop.\\n5. Decision: If N % 2 == 0 \\implies Output "Not Prime" \\implies Stop.\\n6. Loop initialization: i = 3.\\n7. Condition: Is i * i <= N?\\n   - True: If N % i == 0 \\implies Output "Not Prime" \\implies Stop.\\n           Else i = i + 2 \\implies Loop back to condition.\\n   - False: Output "Prime" \\implies Stop.',
                  markingScheme: '1 Mark for input/output blocks | 1.5 Marks for i*i <= N optimization loop | 1.5 Marks for handling N <= 1 and N=2 edge cases'
                }
              ]
            },
            {
              qNum: 'Q3 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain the C preprocessor directives: (i) File inclusion (#include <file> vs #include "file"), (ii) Macro definition (#define), and (iii) Conditional compilation (#ifndef, #define, #endif Header Guards). Write code demonstrating a macro with arguments.',
                  solution: '1. File Inclusion:\\n- #include <stdio.h>: Searches standard system compiler library directories first.\\n- #include "myheader.h": Searches the current working directory first, then falls back to system paths.\\n2. Macro Substitution:\\n#define MAX(a, b) (((a) > (b)) ? (a) : (b))\\nPreprocessor textually substitutes tokens before compilation begins. Always enclose arguments in parentheses to avoid operator precedence bugs.\\n3. Header Guards (Anti-Multi-Inclusion):\\n#ifndef MY_HEADER_H\\n#define MY_HEADER_H\\n// declarations\\n#endif\\nPrevents duplicate type declarations when a header is included transitively multiple times.',
                  markingScheme: '2 Marks for <> vs "" explanation | 2 Marks for macro with arguments and parenthesis warning | 2 Marks for header guard mechanism'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Write a C program to convert a decimal integer into its binary equivalent using bitwise operators (& and >>).',
                  solution: '#include <stdio.h>\\nvoid printBinary(int n) {\\n    int bits = sizeof(int) * 8;\\n    int leadingZero = 1;\\n    printf("Binary: ");\\n    for (int i = bits - 1; i >= 0; i--) {\\n        int bit = (n >> i) & 1;\\n        if (bit == 1) leadingZero = 0;\\n        if (!leadingZero || i == 0) {\\n            printf("%d", bit);\\n        }\\n    }\\n    printf("\\n");\\n}\\nint main() {\\n    int num;\\n    printf("Enter integer: ");\\n    scanf("%d", &num);\\n    printBinary(num);\\n    return 0;\\n}',
                  markingScheme: '1 Mark for bitwise shift and mask ((n >> i) & 1) | 2 Marks for 32-bit loop | 1 Mark for main and clean output'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT II',
          syllabusTopic: 'Control Structures, Loops & Operators',
          questions: [
            {
              qNum: 'Q4',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Write a complete C program to print the first N terms of the Fibonacci sequence and compute their sum. If N = 8, show the trace table and exact program output.',
                  solution: '#include <stdio.h>\\nint main() {\\n    int n = 8;\\n    long long first = 0, second = 1, next, sum = 0;\\n    printf("Fibonacci Series (N = %d):\\n", n);\\n    for (int i = 1; i <= n; i++) {\\n        if (i == 1) next = first;\\n        else if (i == 2) next = second;\\n        else {\\n            next = first + second;\\n            first = second;\\n            second = next;\\n        }\\n        printf("%lld ", next);\\n        sum += next;\\n    }\\n    printf("\\nTotal Sum = %lld\\n", sum);\\n    return 0;\\n}\\nTrace for N = 8: 0, 1, 1, 2, 3, 5, 8, 13. Sum = 33.',
                  markingScheme: '3 Marks for correct iterative C logic | 1.5 Marks for tracking series and sum | 1.5 Marks for N=8 trace table and output'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Differentiate between "while" loop, "do-while" loop, and "for" loop in C. When is a do-while loop specifically preferred over a while loop?',
                  solution: '1. while: Entry-controlled loop. Tests condition first; if false, loop body executes 0 times.\\n2. for: Entry-controlled loop with compact header containing initialization, test condition, and increment/decrement step in one line. Best for known iteration counts.\\n3. do-while: Exit-controlled loop. Loop body executes AT LEAST ONCE before condition is evaluated.\\nPreference: do-while is specifically preferred for menu-driven CLI interfaces, where user prompts must be displayed and input captured at least once before testing exit choice.',
                  markingScheme: '2 Marks for entry vs exit controlled distinction | 2 Marks for menu-driven interface use-case'
                }
              ]
            },
            {
              qNum: 'Q5 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Write a C program to implement a full Menu-Driven Calculator using switch-case supporting Addition (+), Subtraction (-), Multiplication (*), Division (/ with zero check), and Modulo (% with integers).',
                  solution: '#include <stdio.h>\\nint main() {\\n    char op;\\n    double num1, num2;\\n    printf("Enter operator (+, -, *, /, %%): ");\\n    scanf(" %c", &op);\\n    printf("Enter two operands: ");\\n    scanf("%lf %lf", &num1, &num2);\\n    switch (op) {\\n        case \'+\': printf("%.2lf + %.2lf = %.2lf\\n", num1, num2, num1 + num2); break;\\n        case \'-\': printf("%.2lf - %.2lf = %.2lf\\n", num1, num2, num1 - num2); break;\\n        case \'*\': printf("%.2lf * %.2lf = %.2lf\\n", num1, num2, num1 * num2); break;\\n        case \'/\':\\n            if (num2 == 0) printf("Error: Division by zero!\\n");\\n            else printf("%.2lf / %.2lf = %.2lf\\n", num1, num2, num1 / num2);\\n            break;\\n        case \'%\':\\n            if ((long long)num2 == 0) printf("Error: Modulo by zero!\\n");\\n            else printf("%lld %% %lld = %lld\\n", (long long)num1, (long long)num2, (long long)num1 % (long long)num2);\\n            break;\\n        default: printf("Error: Invalid operator!\\n");\\n    }\\n    return 0;\\n}',
                  markingScheme: '2 Marks for clean switch-case structure with breaks | 2 Marks for division by zero check | 2 Marks for casting operands in modulo operation'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain Typecasting in C: differentiate between Implicit type conversion (coercion) and Explicit type conversion with syntax and code examples.',
                  solution: '1. Implicit Type Conversion (Automatic Coercion): Performed automatically by compiler based on integer promotion hierarchy (char \\to int \\to float \\to double). Example: int a = 5; double b = a + 2.5; // a is promoted to double.\\n2. Explicit Type Conversion (Cast Operator): Forcibly coerced by programmer using (type_name) expression. Example: int x = 10, y = 4; double res = (double)x / y; // produces 2.5 instead of truncated integer 2.',
                  markingScheme: '2 Marks for implicit hierarchy explanation | 2 Marks for explicit casting syntax and integer truncation prevention example'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT III',
          syllabusTopic: 'Arrays, Strings & Functions',
          questions: [
            {
              qNum: 'Q6',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Write a C program to multiply two matrices A (size m x k) and B (size k x n). Include validation for matrix multiplication compatibility and print the resulting matrix C.',
                  solution: '#include <stdio.h>\\n#define MAX 10\\nint main() {\\n    int A[MAX][MAX], B[MAX][MAX], C[MAX][MAX];\\n    int r1, c1, r2, c2;\\n    printf("Matrix A rows and cols: "); scanf("%d %d", &r1, &c1);\\n    printf("Matrix B rows and cols: "); scanf("%d %d", &r2, &c2);\\n    if (c1 != r2) { printf("Error: Incompatible dimensions!\\n"); return 1; }\\n    printf("Enter elements of A:\\n");\\n    for (int i=0; i<r1; i++) for (int j=0; j<c1; j++) scanf("%d", &A[i][j]);\\n    printf("Enter elements of B:\\n");\\n    for (int i=0; i<r2; i++) for (int j=0; j<c2; j++) scanf("%d", &B[i][j]);\\n    for (int i=0; i<r1; i++) {\\n        for (int j=0; j<c2; j++) {\\n            C[i][j] = 0;\\n            for (int k=0; k<c1; k++) {\\n                C[i][j] += A[i][k] * B[k][j];\\n            }\\n        }\\n    }\\n    printf("Product Matrix:\\n");\\n    for (int i=0; i<r1; i++) {\\n        for (int j=0; j<c2; j++) printf("%d ", C[i][j]);\\n        printf("\\n");\\n    }\\n    return 0;\\n}',
                  markingScheme: '1.5 Marks for dimension validation (c1 == r2) | 3 Marks for 3-nested loop algorithm | 1.5 Marks for correct matrix I/O'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Write custom C functions to implement: (i) strlen(), and (ii) strcpy() without using the standard <string.h> library.',
                  solution: '1. Custom strlen:\\nsize_t my_strlen(const char *str) {\\n    size_t len = 0;\\n    while (str[len] != \'\\0\') {\\n        len++;\\n    }\\n    return len;\\n}\\n2. Custom strcpy:\\nchar* my_strcpy(char *dest, const char *src) {\\n    char *orig = dest;\\n    while ((*dest++ = *src++) != \'\\0\');\\n    return orig;\\n}',
                  markingScheme: '2 Marks for my_strlen with null terminator loop | 2 Marks for my_strcpy with pointer increment and return'
                }
              ]
            },
            {
              qNum: 'Q7 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Differentiate between "Call by Value" and "Call by Reference" (using pointers) in C. Write a C program to swap two integers using Call by Reference and explain with memory diagrams.',
                  solution: '1. Call by Value: Copies the actual argument value into formal parameter. Changes inside function do NOT reflect in caller scope.\\n2. Call by Reference (Pointers): Passes memory addresses (&a, &b) into pointer parameters (*x, *y). Changes inside function directly mutate caller memory.\\n3. C Code:\\n#include <stdio.h>\\nvoid swap(int *x, int *y) {\\n    int temp = *x;\\n    *x = *y;\\n    *y = temp;\\n}\\nint main() {\\n    int a = 10, b = 20;\\n    printf("Before: a=%d, b=%d\\n", a, b);\\n    swap(&a, &b);\\n    printf("After: a=%d, b=%d\\n", a, b);\\n    return 0;\\n}\\nOutput: Before: a=10, b=20. After: a=20, b=10.',
                  markingScheme: '2 Marks for theoretical comparison | 2 Marks for correct pointer dereference swap implementation | 2 Marks for memory address explanation'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Write a C program to sort an array of N integers in ascending order using the Bubble Sort algorithm. State its Best and Worst-case time complexity.',
                  solution: '#include <stdio.h>\\nvoid bubbleSort(int arr[], int n) {\\n    for (int i = 0; i < n - 1; i++) {\\n        int swapped = 0;\\n        for (int j = 0; j < n - i - 1; j++) {\\n            if (arr[j] > arr[j + 1]) {\\n                int temp = arr[j];\\n                arr[j] = arr[j + 1];\\n                arr[j + 1] = temp;\\n                swapped = 1;\\n            }\\n        }\\n        if (!swapped) break; // Optimized early exit\\n    }\\n}\\nComplexities: Best Case O(n) (already sorted with swapped flag), Worst Case O(n^2) (reverse sorted). Space Complexity: O(1) in-place.',
                  markingScheme: '2.5 Marks for clean C implementation with optimized swapped flag | 1.5 Marks for Best O(n) and Worst O(n^2) complexity analysis'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT IV',
          syllabusTopic: 'Pointers, Structures, DMA & File I/O',
          questions: [
            {
              qNum: 'Q8',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Define a structure "Student" containing roll_no, name, and marks in 5 subjects. Write a C program to input records for 5 students, calculate total marks and percentage for each, and display the details of the top-ranking student.',
                  solution: '#include <stdio.h>\\n#include <string.h>\\nstruct Student {\\n    int roll_no;\\n    char name[50];\\n    float marks[5];\\n    float total;\\n    float percentage;\\n};\\nint main() {\\n    struct Student s[5];\\n    int topperIdx = 0;\\n    for (int i = 0; i < 5; i++) {\\n        s[i].total = 0;\\n        printf("Student %d Roll & Name: ", i + 1);\\n        scanf("%d %s", &s[i].roll_no, s[i].name);\\n        printf("Enter 5 marks: ");\\n        for (int j = 0; j < 5; j++) {\\n            scanf("%f", &s[i].marks[j]);\\n            s[i].total += s[i].marks[j];\\n        }\\n        s[i].percentage = s[i].total / 5.0f;\\n        if (s[i].total > s[topperIdx].total) topperIdx = i;\\n    }\\n    printf("\\n--- TOPPER DETAILS ---\\n");\\n    printf("Roll: %d | Name: %s | Total: %.2f | Percentage: %.2f%%\\n",\\n           s[topperIdx].roll_no, s[topperIdx].name, s[topperIdx].total, s[topperIdx].percentage);\\n    return 0;\\n}',
                  markingScheme: '2 Marks for struct Student definition | 2.5 Marks for record input & total/percentage computation | 1.5 Marks for finding and displaying topper'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Write a C program using dynamic memory allocation (malloc and free) to dynamically allocate an integer array of size N, input elements, calculate their average, and prevent memory leaks.',
                  solution: '#include <stdio.h>\\n#include <stdlib.h>\\nint main() {\\n    int n;\\n    printf("Enter number of elements: ");\\n    scanf("%d", &n);\\n    int *arr = (int *)malloc(n * sizeof(int));\\n    if (arr == NULL) {\\n        printf("Error: Heap allocation failed!\\n");\\n        return 1;\\n    }\\n    double sum = 0;\\n    printf("Enter %d numbers: ", n);\\n    for (int i = 0; i < n; i++) {\\n        scanf("%d", &arr[i]);\\n        sum += arr[i];\\n    }\\n    printf("Average = %.2lf\\n", sum / n);\\n    free(arr); // Deallocate heap memory to prevent memory leak\\n    arr = NULL; // Prevent dangling pointer\\n    return 0;\\n}',
                  markingScheme: '1 Mark for malloc syntax with sizeof | 1 Mark for NULL check | 1 Mark for average calculation | 1 Mark for free(arr) and setting to NULL'
                }
              ]
            },
            {
              qNum: 'Q9 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Write a C program to copy the entire contents of a text file "source.txt" to a new file "destination.txt", counting and displaying the total number of characters, words, and lines copied.',
                  solution: '#include <stdio.h>\\n#include <ctype.h>\\nint main() {\\n    FILE *src = fopen("source.txt", "r");\\n    if (!src) { printf("Error: source.txt not found!\\n"); return 1; }\\n    FILE *dest = fopen("destination.txt", "w");\\n    if (!dest) { printf("Error creating destination.txt!\\n"); fclose(src); return 1; }\\n    int ch, inWord = 0;\\n    long chars = 0, words = 0, lines = 0;\\n    while ((ch = fgetc(src)) != EOF) {\\n        fputc(ch, dest);\\n        chars++;\\n        if (ch == \'\\n\') lines++;\\n        if (isspace(ch)) inWord = 0;\\n        else if (!inWord) { inWord = 1; words++; }\\n    }\\n    if (chars > 0 && ch != \'\\n\') lines++;\\n    fclose(src);\\n    fclose(dest);\\n    printf("Copied successfully!\\nChars: %ld | Words: %ld | Lines: %ld\\n", chars, words, lines);\\n    return 0;\\n}',
                  markingScheme: '2 Marks for fopen, NULL verification, and fclose | 2 Marks for file character copy loop | 2 Marks for accurate word and line counter logic'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain Pointer Arithmetic in C: what happens when an integer pointer ptr is incremented (ptr++)? Explain the relationship between array names and pointers: *(arr + i) == arr[i].',
                  solution: '1. Pointer Arithmetic: Incrementing a pointer does NOT add 1 to the numeric address; it advances the address by sizeof(DataType) bytes:\\nNew Address = Current Address + (1 \\times \\text{sizeof}(T)). For int* on a 64-bit architecture (sizeof(int)=4), if ptr is 0x2000, ptr++ becomes 0x2004.\\n2. Array-Pointer Equivalence: In C, an array name arr evaluates to the constant memory address of its first element (&arr[0]). The index notation arr[i] is syntactically translated by the compiler into *(arr + i), directly computing the offset memory address base + i * sizeof(element) and dereferencing it.',
                  markingScheme: '2 Marks for sizeof(T) address stride explanation | 2 Marks for compiler translation arr[i] == *(arr + i)'
                }
              ]
            }
          ]
        }
      ]
    }
  },

  // =========================================================================
  // 4. BCSE-011: Fundamentals of Artificial Intelligence & Machine Learning
  // =========================================================================
  {
    id: 'qp-aiml-011',
    code: 'BCSE-011',
    subject: 'Fundamentals of AI & ML',
    semester: 'Semester 1',
    semNumber: 1,
    year: '1st Year',
    course: 'B.Tech (1st Year) - Common for all Engineering Streams',
    university: 'Maharishi Markandeshwar (Deemed to be University), Mullana',
    timeAllowed: '3 Hours',
    maxMarks: 60,
    passingMarks: 24,
    probability: '98% High-Yield MMEC Match',
    instructions: [
      'Question No. 1 in Section A is COMPULSORY (20 marks).',
      'Attempt any FOUR questions from Section B, selecting ONE question from each Unit (10 marks each).',
      'Syllabus 100% MMEC Aligned: Unit-I (Foundations of AI), Unit-II (Searching Algorithms & Knowledge Representation), Unit-III (Experts System), Unit-IV (Introduction to ML Concepts).'
    ],
    sectionA: {
      title: 'SECTION A (COMPULSORY)',
      marks: 20,
      note: 'Answer ALL ten questions. Each question carries 2 marks.',
      questions: [
        {
          qNum: 'Q1 (a)',
          unit: 'Unit 1',
          marks: 2,
          question: 'Define Artificial Intelligence. What is the Turing Test and what was Alan Turing\'s criterion for a machine to pass it?',
          expectedFrequency: 'Foundations Standard',
          modelAnswer: 'Artificial Intelligence is the branch of computer science dedicated to building machines capable of performing cognitive tasks that typically require human intellect.\\nThe Turing Test (Alan Turing, 1950) assesses whether a machine exhibits intelligent behavior indistinguishable from a human via natural language teletype conversation. Turing stated that a machine passes if an average interrogator has no more than a 70% chance of making the correct identification after 5 minutes of interrogation.',
          keyMarkingPoints: ['1 Mark for formal AI definition', '1 Mark for Turing Test description & 70% passing criterion']
        },
        {
          qNum: 'Q1 (b)',
          unit: 'Unit 1',
          marks: 2,
          question: 'Differentiate between Artificial Narrow Intelligence (ANI) and Artificial General Intelligence (AGI) with examples.',
          expectedFrequency: 'High Frequency',
          modelAnswer: '1. Artificial Narrow Intelligence (ANI / Weak AI): AI designed and trained for one specific bounded task (e.g. Apple Siri, AlphaGo, Tesla Autopilot, facial recognition). 100% of all existing AI today is ANI.\\n2. Artificial General Intelligence (AGI / Strong AI): A theoretical machine possessing human-level intellect capable of learning, comprehending, and transferring knowledge across any intellectual discipline.',
          keyMarkingPoints: ['1 Mark for Narrow AI definition + example', '1 Mark for General AI definition + status']
        },
        {
          qNum: 'Q1 (c)',
          unit: 'Unit 1',
          marks: 2,
          question: 'What is the fundamental difference between Machine Learning (ML) and Deep Learning (DL) with respect to feature extraction?',
          expectedFrequency: 'Core Concept',
          modelAnswer: 'In classical Machine Learning (e.g. SVM, Decision Trees), features must be manually extracted and engineered by human domain experts from raw data before classification. In Deep Learning (e.g. Convolutional Neural Networks), the deep multi-layer neural network automatically learns hierarchical feature representations directly from raw inputs (e.g. pixels, waveforms) end-to-end.',
          keyMarkingPoints: ['1 Mark for manual feature engineering in ML', '1 Mark for automated representation learning in DL']
        },
        {
          qNum: 'Q1 (d)',
          unit: 'Unit 2',
          marks: 2,
          question: 'Compare Breadth-First Search (BFS) and Depth-First Search (DFS) in terms of Time Complexity, Space Complexity, and Completeness.',
          expectedFrequency: 'Every Year Standard',
          modelAnswer: '1. BFS: Uses FIFO queue. Time Complexity = O(b^d), Space Complexity = O(b^d) (exponential memory bottleneck), Completeness = Yes (if branching factor b is finite).\\n2. DFS: Uses LIFO stack. Time Complexity = O(b^m), Space Complexity = O(b \\cdot m) (linear, memory efficient), Completeness = No (can get trapped in infinite paths or cycles).',
          keyMarkingPoints: ['1 Mark for BFS complexities & completeness', '1 Mark for DFS complexities & completeness']
        },
        {
          qNum: 'Q1 (e)',
          unit: 'Unit 2',
          marks: 2,
          question: 'Differentiate between Data-Driven Search (Forward Chaining) and Goal-Driven Search (Backward Chaining).',
          expectedFrequency: 'High Yield',
          modelAnswer: '1. Data-Driven Search (Forward Chaining): Begins with available initial facts/data and applies inference rules forward to deduce new facts until the goal is proven (bottom-up reasoning, suitable when many goals exist).\\n2. Goal-Driven Search (Backward Chaining): Begins with the goal hypothesis and searches backward for rules supporting the goal, checking if required premises are satisfied (top-down reasoning, ideal for diagnostic systems like MYCIN).',
          keyMarkingPoints: ['1 Mark for Forward Chaining definition & direction', '1 Mark for Backward Chaining definition & direction']
        },
        {
          qNum: 'Q1 (f)',
          unit: 'Unit 2',
          marks: 2,
          question: 'State the evaluation function f(n) = g(n) + h(n) in A* search algorithm. What condition makes heuristic h(n) "admissible"?',
          expectedFrequency: 'Search Algorithms Favorite',
          modelAnswer: 'In A* search: f(n) = g(n) + h(n), where g(n) is the exact cost from initial state to node n, and h(n) is the estimated heuristic cost from n to the goal state.\\nAdmissibility Condition: h(n) is admissible if it NEVER overestimates the true minimal cost h*(n) to reach the goal: 0 \\le h(n) \\le h*(n) for all nodes n. Admissibility guarantees A* will return the optimal path.',
          keyMarkingPoints: ['1 Mark for f(n) = g(n) + h(n) components', '1 Mark for 0 <= h(n) <= h*(n) admissibility condition']
        },
        {
          qNum: 'Q1 (g)',
          unit: 'Unit 3',
          marks: 2,
          question: 'What are the two primary questions answered by the Explanation Facility of an Expert System ("WHY" and "HOW")?',
          expectedFrequency: 'Expert Systems Standard',
          modelAnswer: '1. "WHY" Question: Explains why the expert system requires a specific input from the user (the system reveals the current active production rule it is trying to verify).\\n2. "HOW" Question: Explains how a final conclusion or recommendation was derived (the system traces back and displays the chain of fired rules and verified premises from working memory).',
          keyMarkingPoints: ['1 Mark for "WHY" facility explanation', '1 Mark for "HOW" facility explanation']
        },
        {
          qNum: 'Q1 (h)',
          unit: 'Unit 3',
          marks: 2,
          question: 'What is the "Knowledge Acquisition Bottleneck" identified by Edward Feigenbaum in expert system development?',
          expectedFrequency: 'Knowledge Engineering Standard',
          modelAnswer: 'The Knowledge Acquisition Bottleneck refers to the most difficult, time-consuming phase of creating expert systems, where extracting tacit, intuitive heuristics from human domain experts and translating them into formal machine-executable production rules (IF-THEN) causes major development delays, as experts often cannot verbalize their subconscious reasoning.',
          keyMarkingPoints: ['1 Mark for defining the bottleneck problem', '1 Mark for tacit knowledge articulacy challenge']
        },
        {
          qNum: 'Q1 (i)',
          unit: 'Unit 4',
          marks: 2,
          question: 'Explain the difference between Supervised Learning and Unsupervised Learning with one real-world application of each.',
          expectedFrequency: 'ML Foundations Standard',
          modelAnswer: '1. Supervised Learning: Model is trained on labeled data pairs (input X, target Y) to learn a predictive mapping function f: X -> Y (e.g. Email Spam Detection using labeled ham/spam emails, House Price Prediction).\\n2. Unsupervised Learning: Model is trained on unlabelled data (X only) to discover hidden underlying patterns, distributions, or groupings without teacher guidance (e.g. Customer Segmentation via K-Means Clustering).',
          keyMarkingPoints: ['1 Mark for Supervised Learning definition + example', '1 Mark for Unsupervised Learning definition + example']
        },
        {
          qNum: 'Q1 (j)',
          unit: 'Unit 4',
          marks: 2,
          question: 'In the ID3 Decision Tree algorithm, state the mathematical formula for Shannon Entropy H(S) and explain what H(S) = 0 indicates.',
          expectedFrequency: 'Decision Trees Favorite',
          modelAnswer: 'Formula: H(S) = - \\sum_{i=1}^c p_i \\log_2(p_i), where p_i is the proportion of samples belonging to class i.\\nH(S) = 0 indicates absolute purity (zero disorder / zero impurity). All examples in the dataset belong to one single target class (e.g. 100% Yes or 100% No), requiring no further decision tree splitting.',
          keyMarkingPoints: ['1 Mark for H(S) = -sum p_i log_2(p_i) formula', '1 Mark for H(S)=0 pure node explanation']
        }
      ]
    },
    sectionB: {
      title: 'SECTION B (UNIT-WISE LONG QUESTIONS)',
      marks: 40,
      note: 'Attempt ONE question from EACH Unit. Each question carries 10 marks.',
      units: [
        {
          unitNumber: 'UNIT I',
          syllabusTopic: 'Foundations of Artificial Intelligence',
          questions: [
            {
              qNum: 'Q2',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Trace the evolution of Artificial Intelligence. Explain the classification of AI systems by capability (Narrow AI, General AI, Super AI) and by functionality (Reactive Machines, Limited Memory, Theory of Mind, Self-Aware).',
                  solution: '1. Historical Evolution: (a) 1950 - Alan Turing proposes the Imitation Game; (b) 1956 - John McCarthy coins "Artificial Intelligence" at Dartmouth Workshop; (c) 1960s-1970s - Early symbolic AI and first AI Winter; (d) 1980s - Commercial Expert Systems boom; (e) 2010s-Present - Deep Learning and Generative AI renaissance.\\n2. Classification by Capability:\\n- Artificial Narrow Intelligence (ANI / Weak AI): Dedicated to one specific domain (e.g. Siri, AlphaGo, Spam filter).\\n- Artificial General Intelligence (AGI / Strong AI): Possesses human-level intellectual capability across all cognitive domains (frontier research).\\n- Artificial Super Intelligence (ASI): Theoretical future intellect far surpassing human cognitive limits.\\n3. Classification by Functionality:\\n- Reactive Machines: Pure stimulus-response without memory (e.g. IBM Deep Blue).\\n- Limited Memory: Stores recent observations to make immediate decisions (e.g. autonomous driving vehicles).\\n- Theory of Mind: Understands emotions and intentions of external entities.\\n- Self-Aware AI: Possesses conscious self-hood.',
                  markingScheme: '2 Marks for historical evolution milestones | 2 Marks for capability taxonomy (ANI, AGI, ASI) | 2 Marks for functional architecture taxonomy'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain the difference between Artificial Intelligence, Machine Learning, and Deep Learning with a concentric circle diagram and real-world industrial examples.',
                  solution: '1. Concentric Relationship: Deep Learning \\subset Machine Learning \\subset Artificial Intelligence.\\n2. Artificial Intelligence: The broad overarching discipline of synthesizing intelligent machines (includes symbolic logic, search, expert systems, and ML).\\n3. Machine Learning: Algorithms that learn statistical patterns from data without being explicitly hand-coded (e.g. Linear Regression, Decision Trees).\\n4. Deep Learning: A subset of ML utilizing multi-layered Artificial Neural Networks to automatically extract feature representations directly from raw data.\\n5. Examples:\\n- Rule-based Chess Solver = AI.\\n- Loan Default Predictor using Logistic Regression = ML.\\n- Autonomous vehicle pedestrian recognition with CNNs = DL.',
                  markingScheme: '1.5 Marks for concentric circle relationship | 1.5 Marks for technical differences | 1 Mark for verified industrial examples'
                }
              ]
            },
            {
              qNum: 'Q3 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Discuss the key domains of Artificial Intelligence: Natural Language Processing (NLP), Computer Vision (CV), and Expert Systems. Provide their working principles and practical applications.',
                  solution: '1. Natural Language Processing (NLP): Enables computers to understand, interpret, and generate human spoken and written languages. Core tasks include sentiment analysis, machine translation, speech recognition, and syntactic parsing. Applications: Google Translate, ChatGPT, spam filtering.\\n2. Computer Vision (CV): Enables computers to derive meaningful information from digital images, videos, and multi-dimensional sensor feeds. Core tasks include image classification, object detection, segmentation, and facial recognition. Applications: Medical diagnostic imaging (tumor detection in MRIs), autonomous driving lane detection, Face ID.\\n3. Expert Systems: Knowledge-intensive software that solves complex problems in a specific narrow domain by applying formal inference rules over human expert heuristics. Applications: Medical diagnostic advice (MYCIN), chemical spectroscopy analysis (DENDRAL).',
                  markingScheme: '2 Marks for NLP principles and applications | 2 Marks for Computer Vision principles and applications | 2 Marks for Expert Systems overview'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain the characteristics of an Intelligent System. Discuss four impactful real-world use cases across Healthcare, Agriculture, Finance, and Smart Cities.',
                  solution: '1. Characteristics: Perception (sensing environment), Reasoning (inferring conclusions), Learning (improving from experience), Adaptability (handling changes), and Communication (interacting naturally with humans).\\n2. Applications:\\n- Healthcare: AI algorithms analyzing chest X-rays to detect pneumonia/tuberculosis and predicting patient ICU readmission risks.\\n- Agriculture: AI drones monitoring crop vegetation indices and automated robotic harvesters targeting weed eradication.\\n- Finance: Real-time fraud detection scoring millions of transactions per second and algorithmic market trading.\\n- Smart Cities: Real-time camera feeds dynamically optimizing traffic signal durations to reduce urban congestion.',
                  markingScheme: '2 Marks for 5 characteristics of intelligent systems | 2 Marks for 4 sector applications'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT II',
          syllabusTopic: 'Searching Algorithms & Knowledge Representation',
          questions: [
            {
              qNum: 'Q4',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain the formal formulation of a State Space Search problem. Compare Breadth-First Search (BFS) and Depth-First Search (DFS) in terms of Completeness, Time Complexity, Space Complexity, and Optimality.',
                  solution: '1. State Space Formulation (5-tuple): Initial State (starting point), Actions/Operators (allowable moves), Transition Model (Result(s, a)), Goal Test (determines if current state is goal), and Path Cost (sum of step costs c(s, a, s\')).\\n2. Comparison Table:\\n| Metric | Breadth-First Search (BFS) | Depth-First Search (DFS) |\\n| Completeness | Yes (if branching factor b is finite) | No (can loop in infinite paths) |\\n| Time Complexity | O(b^d) | O(b^m) |\\n| Space Complexity | O(b^d) (Exponential - major bottleneck!) | O(b \\cdot m) (Linear - memory efficient) |\\n| Optimality | Yes (for uniform step costs) | No |\\nWhere b = branching factor, d = goal depth, m = maximum search tree depth.',
                  markingScheme: '2.5 Marks for 5-tuple problem formulation | 3.5 Marks for complete 4-metric comparison table'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Differentiate between Data-Driven Search (Forward Chaining) and Goal-Driven Search (Backward Chaining). When is each preferred in problem solving?',
                  solution: '1. Data-Driven Search (Forward Chaining): Starts from known initial facts/percepts and applies inference rules forward to deduce new facts until the goal is proved (bottom-up). Preferred when all data is readily available upfront and there are many possible goals (e.g. data synthesis, monitoring).\\n2. Goal-Driven Search (Backward Chaining): Starts from the hypothesized goal and searches backward to find supporting subgoals and matching axioms (top-down). Preferred when the goal is already known and specific facts need to be queried (e.g. medical diagnosis, troubleshooting).',
                  markingScheme: '2.5 Marks for technical differentiation | 1.5 Marks for problem-solving preference criteria'
                }
              ]
            },
            {
              qNum: 'Q5 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain the A* Heuristic Search algorithm. State the evaluation function f(n) = g(n) + h(n) and prove that A* tree search is optimal if the heuristic function h(n) is admissible.',
                  solution: '1. Evaluation Function: f(n) = g(n) + h(n), where g(n) is the exact cost from initial state to node n, and h(n) is the estimated heuristic cost from n to goal.\\n2. Admissibility: h(n) is admissible if it NEVER overestimates the true minimal cost to reach the goal: 0 \\le h(n) \\le h*(n) for all n.\\n3. Proof of Optimality:\\n- Let G_2 be a suboptimal goal on OPEN, so g(G_2) = f(G_2) > C* (optimal cost).\\n- Let G* be an optimal goal node with true cost C*.\\n- There must be an unexpanded node n on the optimal path currently in OPEN.\\n- f(n) = g(n) + h(n) \\le g(n) + h*(n) = C* (due to admissibility h(n) \\le h*(n)).\\n- Therefore: f(n) \\le C* < f(G_2).\\n- Since A* always selects the node with the lowest f-value from OPEN, node n will be expanded before G_2.\\n- Hence, A* can never expand a suboptimal goal first, guaranteeing optimality!',
                  markingScheme: '2 Marks for f(n) = g(n) + h(n) and admissibility definition | 4 Marks for step-by-step optimality proof'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Describe Knowledge Representation schemes: Logical (Propositional/Predicate calculus), Procedural (Production Systems), Network (Semantic Networks), and Structured (Frames & Scripts).',
                  solution: '1. Logical Scheme: Propositional logic (Boolean facts) and First-Order Predicate Calculus (FOPC: adds predicates, objects, quantifiers ∀, ∃) allowing sound inference via Resolution Refutation.\\n2. Procedural Scheme: Production Systems consisting of Rule Base (IF premise THEN action), Working Memory (active facts), and an Inference Engine executing the Match-Resolve-Act cycle.\\n3. Network Scheme: Semantic Networks (graph of concept nodes connected by directed relation edges like "is-a", "has-a" with property inheritance) and Conceptual Graphs.\\n4. Structured Scheme: Frames (data structures with named slots, default fillers, and procedural triggers) and Scripts (stereotypical sequence of events like a restaurant visit).',
                  markingScheme: '1 Mark for each of the 4 representation schemes'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT III',
          syllabusTopic: 'Experts System',
          questions: [
            {
              qNum: 'Q6',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Draw the architectural block diagram of an Expert System. Explain the function of the Knowledge Base, Inference Engine, Working Memory, Explanation Facility, and User Interface.',
                  solution: '1. Block Diagram: User <-> User Interface <-> Inference Engine & Explanation Facility <-> Working Memory & Knowledge Base. Knowledge Engineer <-> Knowledge Base via Knowledge Acquisition module.\\n2. Knowledge Base (KB): Stores domain expertise in the form of IF-THEN production rules and factual associations.\\n3. Working Memory (Fact Base): Dynamic storage holding user inputs, current case observations, and intermediate inferred facts.\\n4. Inference Engine: The reasoning core executing the Match-Resolve-Act cycle: matches rule premises against working memory, resolves conflicts, and fires rules.\\n5. Explanation Facility: Provides transparency by answering "WHY" an input is requested and "HOW" a diagnosis/conclusion was reached.\\n6. User Interface: Provides interactive, user-friendly communication between user and consultation engine.',
                  markingScheme: '2 Marks for clear block diagram | 4 Marks for detailed explanation of all 5 functional units'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain the roles of the Human Elements in an Expert System: Domain Expert, Knowledge Engineer, System Builder, and End User.',
                  solution: '1. Domain Expert: The human specialist with deep, tacit knowledge, experience, and problem-solving heuristics in the problem domain (e.g. senior doctor).\\n2. Knowledge Engineer: The AI professional who interviews the domain expert, translates unstructured human rules of thumb into formal representations, and encodes them into the rule base.\\n3. System Builder / Engineer: The software engineer who designs the inference engine software, memory architecture, and user interface.\\n4. End User: The practitioner, technician, or student who consults the system to solve domain problems.',
                  markingScheme: '1 Mark for each of the 4 human elements'
                }
              ]
            },
            {
              qNum: 'Q7 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Discuss the major problem areas addressed by Expert Systems. Describe the success factors and limitations of Expert Systems with two classic examples (MYCIN and DENDRAL).',
                  solution: '1. Problem Areas Addressed: Interpretation (analyzing sensor data), Prediction (forecasting weather/stocks), Diagnosis (identifying medical diseases or machinery faults), Design/Configuration (synthesizing system layouts), Planning, Monitoring, Instruction, and Control.\\n2. Success Factors: Bounded narrow domain, availability of credible human experts, rule-based explainability.\\n3. Limitations: Knowledge acquisition bottleneck, brittle performance outside bounded domain, lack of common sense.\\n4. Classic Examples:\\n- MYCIN (Stanford): Medical expert system that diagnosed blood infections and prescribed antimicrobial dosages.\\n- DENDRAL (Stanford): Organic chemistry expert system that analyzed mass spectrometry data to determine unknown molecular structures.',
                  markingScheme: '2.5 Marks for problem areas | 1.5 Marks for success factors & limitations | 2 Marks for MYCIN & DENDRAL descriptions'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'What is Knowledge Engineering? Explain the challenges of the Knowledge Acquisition Bottleneck and outline three methods of knowledge acquisition.',
                  solution: '1. Knowledge Engineering: The discipline of extracting, structuring, formalizing, and embedding human expert knowledge into a machine-readable knowledge base.\\n2. Knowledge Acquisition Bottleneck: The primary delay in ES development, arising because human experts rely on tacit, subconscious heuristics that are difficult to verbalize as discrete IF-THEN rules.\\n3. Acquisition Methods:\\n- Structured Interviews: Knowledge engineer systematically questions the expert.\\n- Protocol Analysis (Think-Aloud Protocols): Expert speaks their entire reasoning process aloud while solving sample cases.\\n- Automated Knowledge Acquisition: Machine learning and rule induction algorithms extracting rules directly from historical case databases.',
                  markingScheme: '1.5 Marks for Knowledge Engineering & Bottleneck | 2.5 Marks for 3 elicitation methods'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT IV',
          syllabusTopic: 'Introduction to Machine Learning Concepts',
          questions: [
            {
              qNum: 'Q8',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Give an overview of Machine Learning and explain the 7-stage Machine Learning Workflow / Model Development Lifecycle.',
                  solution: '1. Machine Learning Overview: Study of computational algorithms that improve their performance P on task T through experience E without explicit rule programming (Arthur Samuel, 1959).\\n2. 7-Stage ML Lifecycle:\\n- Stage 1 (Problem Definition): Frame business problem into ML paradigm (Classification, Regression, Clustering).\\n- Stage 2 (Data Collection): Gather representative training datasets.\\n- Stage 3 (Data Preprocessing): Handle missing values, outliers, scaling (Min-Max/Standardization), and encoding.\\n- Stage 4 (Feature Engineering): Extract informative features and select predictive subsets.\\n- Stage 5 (Model Training): Train candidate algorithms on training split (e.g. 70/15/15).\\n- Stage 6 (Model Evaluation): Validate model using test metrics (Accuracy, F1-Score, RMSE, ROC-AUC).\\n- Stage 7 (Deployment & Monitoring): Deploy model via API and monitor for data drift and concept drift.',
                  markingScheme: '2 Marks for ML overview | 4 Marks for 7 lifecycle stages'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Differentiate between Supervised Learning, Unsupervised Learning, and Reinforcement Learning with real-world examples.',
                  solution: '| Criterion | Supervised Learning | Unsupervised Learning | Reinforcement Learning |\\n| Data Nature | Labeled dataset (X, Y) | Unlabelled data (X only) | State observations and reward signals |\\n| Objective | Learn mapping function f: X -> Y | Discover hidden clusters/patterns | Learn optimal policy \\pi to maximize cumulative reward |\\n| Feedback | Direct supervisory error loss | No explicit feedback | Scalar reward/penalty from environment |\\n| Example | Spam classification, House pricing | Customer segmentation (K-Means) | AlphaGo, Autonomous vehicle control |',
                  markingScheme: '3 Marks for comprehensive comparison table | 1 Mark for real-world examples'
                }
              ]
            },
            {
              qNum: 'Q9 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain Supervised Machine Learning with focus on Classification algorithms (Decision Trees with ID3 Entropy & Information Gain) and Regression algorithms (Linear Regression with gradient descent loss).',
                  solution: '1. Supervised Learning: Maps input X to output Y using labeled examples.\\n2. Classification (Decision Trees ID3):\\n- Shannon Entropy: H(S) = - \\sum p_i \\log_2(p_i) measures node impurity.\\n- Information Gain: IG(S, A) = H(S) - \\sum \\frac{|S_v|}{|S|} H(S_v) measures entropy reduction.\\n- The attribute with highest Information Gain is selected as the splitting node.\\n3. Regression (Linear Regression):\\n- Predicts continuous target: \\hat{y} = w^T x + b.\\n- Minimizes Mean Squared Error (MSE) loss: L = \\frac{1}{2N} \\sum (y_i - \\hat{y}_i)^2 using Gradient Descent weight updates: w \\leftarrow w - \\eta \\nabla L.',
                  markingScheme: '3 Marks for Decision Tree ID3 formulas and split logic | 3 Marks for Linear Regression model and MSE loss'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain Unsupervised Machine Learning: describe the K-Means Clustering algorithm with the Elbow Method, and the Apriori Algorithm for Association Rule Mining with the Downward Closure Property.',
                  solution: '1. K-Means Clustering: (a) Initialize K cluster centroids randomly; (b) Assign each point to the closest centroid via Euclidean distance; (c) Update centroids as the mean of assigned points; (d) Repeat until convergence.\\nElbow Method: Plots Within-Cluster Sum of Squares (WCSS) against K. The distinct "elbow" bend indicates optimal K.\\n2. Association Rule Mining (Apriori): Discovers relationships in transactional data (e.g. Bread => Butter).\\nDownward Closure Property: "All non-empty subsets of a frequent itemset must also be frequent." If an itemset is infrequent, all of its supersets are immediately pruned, drastically reducing search space.',
                  markingScheme: '2 Marks for K-Means steps and Elbow Method | 2 Marks for Apriori principle and Downward Closure property'
                }
              ]
            }
          ]
        }
      ]
    }
  },

  // =========================================================================
  // 5. PHYS102: Applied Physics
  // =========================================================================
  {
    id: 'qp-physics-102',
    code: 'PHYS102',
    subject: 'Applied Physics',
    semester: 'Semester 2',
    semNumber: 2,
    year: '1st Year',
    course: 'B.Tech (All Branches)',
    university: 'Maharishi Markandeshwar (Deemed to be University), Mullana',
    timeAllowed: '3 Hours',
    maxMarks: 60,
    passingMarks: 24,
    probability: '97% High-Yield Match',
    instructions: [
      'Question No. 1 in Section A is COMPULSORY (20 marks).',
      'Attempt any FOUR questions from Section B, selecting ONE question from each Unit (10 marks each).',
      'Physical constants: c = 3 x 10^8 m/s, h = 6.626 x 10^-34 J.s, e = 1.6 x 10^-19 C, m_e = 9.1 x 10^-31 kg.'
    ],
    sectionA: {
      title: 'SECTION A (COMPULSORY)',
      marks: 20,
      note: 'Answer ALL ten questions. Each question carries 2 marks.',
      questions: [
        {
          qNum: 'Q1 (a)',
          unit: 'Unit 1',
          marks: 2,
          question: 'Why does the central spot appear dark in Newton\'s rings observed by reflected light?',
          expectedFrequency: 'Every Year (2020-2024)',
          modelAnswer: 'At the exact point of contact between the plano-convex lens and glass plate, the air film thickness is t = 0. However, the ray reflected from the denser lower glass plate undergoes a phase shift of \\pi radians (equivalent to a path difference of \\lambda/2, Stokes\' principle). The net path difference \\Delta = 2\\mu t + \\lambda/2 = 0 + \\lambda/2 = \\lambda/2, which strictly satisfies the condition for destructive interference. Hence, the center is dark.',
          keyMarkingPoints: ['1 Mark for t = 0 at contact point', '1 Mark for Stokes phase reversal of pi / path difference lambda/2']
        },
        {
          qNum: 'Q1 (b)',
          unit: 'Unit 1',
          marks: 2,
          question: 'State Einstein\'s relations for spontaneous emission, stimulated emission, and stimulated absorption coefficients.',
          expectedFrequency: 'High Frequency Laser Question',
          modelAnswer: 'Einstein\'s relations connect coefficients A_{21} (spontaneous), B_{21} (stimulated emission), and B_{12} (stimulated absorption):\\n1. B_{12} = B_{21} (probabilities of stimulated absorption and stimulated emission are equal for non-degenerate levels).\\n2. \\frac{A_{21}}{B_{21}} = \\frac{8\\pi h \\nu^3}{c^3} (ratio of spontaneous to stimulated emission rate is proportional to \\nu^3).',
          keyMarkingPoints: ['1 Mark for B_12 = B_21', '1 Mark for A_21 / B_21 = 8 pi h nu^3 / c^3']
        },
        {
          qNum: 'Q1 (c)',
          unit: 'Unit 2',
          marks: 2,
          question: 'Write Maxwell\'s four equations in differential form for free space (\\rho = 0, \\vec{J} = 0).',
          expectedFrequency: 'Every Year Standard',
          modelAnswer: '1. Gauss\'s Law (Electrostatics): \\nabla \\cdot \\vec{E} = 0\\n2. Gauss\'s Law (Magnetism): \\nabla \\cdot \\vec{B} = 0\\n3. Faraday\'s Law of Induction: \\nabla \\times \\vec{E} = -\\frac{\\partial \\vec{B}}{\\partial t}\\n4. Ampere-Maxwell Law: \\nabla \\times \\vec{B} = \\mu_0 \\varepsilon_0 \\frac{\\partial \\vec{E}}{\\partial t}.',
          keyMarkingPoints: ['0.5 Marks for each of the 4 differential equations in free space']
        },
        {
          qNum: 'Q1 (d)',
          unit: 'Unit 2',
          marks: 2,
          question: 'Define the term "Skin Depth" (\\delta) for an electromagnetic wave entering a conducting medium.',
          expectedFrequency: 'High Frequency EM Question',
          modelAnswer: 'Skin depth (penetration depth) \\delta is the distance over which the amplitude of an electromagnetic wave dampens to 1/e (approximately 36.8%) of its initial surface value inside a conducting medium:\\n\\delta = \\sqrt{\\frac{2}{\\omega \\mu \\sigma}} = \\frac{1}{\\sqrt{\\pi f \\mu \\sigma}}.',
          keyMarkingPoints: ['1 Mark for 1/e decay definition', '1 Mark for delta = sqrt(2 / omega mu sigma) formula']
        },
        {
          qNum: 'Q1 (e)',
          unit: 'Unit 3',
          marks: 2,
          question: 'State De Broglie\'s hypothesis. Calculate the de Broglie wavelength of an electron accelerated through a potential of 100 Volts.',
          expectedFrequency: 'Standard Quantum Problem',
          modelAnswer: 'Hypothesis: A moving material particle of momentum p possesses wave properties with wavelength \\lambda = \\frac{h}{p} = \\frac{h}{m v}.\\nFor an electron accelerated through potential V:\\n\\lambda = \\frac{h}{\\sqrt{2 m e V}} = \\frac{12.27}{\\sqrt{V}} \\text{ \\AA}.\\nFor V = 100 \\text{ Volts}: \\lambda = \\frac{12.27}{\\sqrt{100}} = \\frac{12.27}{10} = 1.227 \\text{ \\AA} = 0.1227 \\text{ nm}.',
          keyMarkingPoints: ['1 Mark for de Broglie hypothesis lambda = h / p', '1 Mark for correct calculation 1.227 Angstroms']
        },
        {
          qNum: 'Q1 (f)',
          unit: 'Unit 3',
          marks: 2,
          question: 'State Heisenberg\'s Uncertainty Principle for position and momentum. Why can an electron not reside inside an atomic nucleus?',
          expectedFrequency: 'Every Year (2020-2024)',
          modelAnswer: 'Principle: \\Delta x \\cdot \\Delta p_x \\ge \\frac{\\hbar}{2} = \\frac{h}{4\\pi}.\\nNon-existence in nucleus: Nuclear radius \\approx 10^{-14} m \\implies \\Delta x \\approx 10^{-14} m. Then \\Delta p \\ge \\frac{6.63 \\times 10^{-34}}{4\\pi \\times 10^{-14}} \\approx 5.27 \\times 10^{-21} kg.m/s. Kinetic energy E \\approx \\frac{p^2}{2m} \\approx 94 \\text{ MeV}. Since beta-decay electrons have energy < 4 MeV, electrons cannot exist inside the nucleus.',
          keyMarkingPoints: ['1 Mark for uncertainty relation Delta x . Delta p >= h / 4pi', '1 Mark for kinetic energy calculation exceeding nuclear beta emission']
        },
        {
          qNum: 'Q1 (g)',
          unit: 'Unit 3',
          marks: 2,
          question: 'What is the physical significance of the wave function \\psi and the probability density |\\psi|^2 in quantum mechanics?',
          expectedFrequency: 'Max Born Interpretation',
          modelAnswer: 'The wave function \\psi(x, t) itself has no direct physical meaning and may be complex. However, according to Max Born, the square of its absolute magnitude P(x) = |\\psi(x, t)|^2 = \\psi \\psi^* represents the Probability Density: the probability of finding the particle per unit volume at position x and time t. Normalization condition: \\int_{-\\infty}^\\infty |\\psi|^2 dV = 1.',
          keyMarkingPoints: ['1 Mark for Max Born probability density interpretation', '1 Mark for normalization condition']
        },
        {
          qNum: 'Q1 (h)',
          unit: 'Unit 4',
          marks: 2,
          question: 'Define Atomic Packing Factor (APF). What is the APF for Face-Centered Cubic (FCC) and Body-Centered Cubic (BCC) crystals?',
          expectedFrequency: 'Solid State Physics Standard',
          modelAnswer: 'APF is the ratio of total volume occupied by constituent atoms in a unit cell to the total geometric volume of the unit cell:\\n\\text{APF} = \\frac{N_{eff} \\times \\frac{4}{3}\\pi r^3}{a^3}.\\nValues:\\n- Body-Centered Cubic (BCC): APF = \\frac{\\sqrt{3}\\pi}{8} \\approx 0.68 (68\\%)\\n- Face-Centered Cubic (FCC): APF = \\frac{\\pi}{3\\sqrt{2}} \\approx 0.74 (74\\%).',
          keyMarkingPoints: ['1 Mark for APF definition ratio', '1 Mark for exact values: 68% for BCC and 74% for FCC']
        },
        {
          qNum: 'Q1 (i)',
          unit: 'Unit 4',
          marks: 2,
          question: 'Define Miller Indices of a crystal plane. What are the Miller indices of a plane with intercepts 2a, 3b, and \\infty on the crystallographic axes?',
          expectedFrequency: 'Crystal Lattice Standard',
          modelAnswer: 'Miller Indices (h k l) are the smallest integers whose ratios equal the reciprocals of the fractional intercepts made by the plane on the crystal axes.\\nCalculation:\\n1. Intercepts: 2, 3, \\infty\\n2. Reciprocals: 1/2, 1/3, 1/\\infty = 1/2, 1/3, 0\\n3. Clear fractions by multiplying by LCM (6): 6*(1/2) = 3, 6*(1/3) = 2, 6*(0) = 0\\nResult: Miller Indices = (3 2 0).',
          keyMarkingPoints: ['1 Mark for Miller indices definition', '1 Mark for step-by-step reciprocal calculation to (3 2 0)']
        },
        {
          qNum: 'Q1 (j)',
          unit: 'Unit 4',
          marks: 2,
          question: 'State the difference between Intrinsic and Extrinsic semiconductors based on Fermi energy level position at T = 0 K.',
          expectedFrequency: 'Band Theory Standard',
          modelAnswer: '1. Intrinsic Semiconductor: Pure crystal with no dopants. At T = 0 K, the Fermi level E_F lies exactly midway in the forbidden energy gap: E_F = \\frac{E_c + E_v}{2}.\\n2. Extrinsic Semiconductor:\\n- N-type (donor doped): E_F lies close below the conduction band edge E_c.\\n- P-type (acceptor doped): E_F lies close above the valence band edge E_v.',
          keyMarkingPoints: ['1 Mark for Intrinsic Fermi level exactly midway', '1 Mark for N-type near E_c and P-type near E_v']
        }
      ]
    },
    sectionB: {
      title: 'SECTION B (UNIT-WISE LONG QUESTIONS)',
      marks: 40,
      note: 'Attempt ONE question from EACH Unit. Each question carries 10 marks.',
      units: [
        {
          unitNumber: 'UNIT I',
          syllabusTopic: 'Wave Optics & Lasers',
          questions: [
            {
              qNum: 'Q2',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Describe Newton\'s Rings experiment for reflected light. Derive the expressions for the diameter of: (i) n-th Dark ring (D_n = 2\\sqrt{n \\lambda R}), and (ii) n-th Bright ring. In a Newton\'s rings experiment, the diameter of the 4th and 12th dark rings are 0.40 cm and 0.70 cm respectively. If the radius of curvature of the lens is 100 cm, calculate the wavelength of light used.',
                  solution: '1. Theory: A plano-convex lens of large radius of curvature R is placed on an optically flat glass plate, forming a thin wedge-shaped air film of thickness t.\\n2. Path Difference in Reflected Light: \\Delta = 2\\mu t \\cos r + \\lambda/2 = 2t + \\lambda/2 (for air \\mu=1, normal incidence r=0).\\n3. Circular geometry relation: t \\approx \\frac{r_n^2}{2R} = \\frac{D_n^2}{8R}.\\n4. Dark Rings Condition: \\Delta = (2n + 1)\\frac{\\lambda}{2} \\implies 2t + \\frac{\\lambda}{2} = (2n + 1)\\frac{\\lambda}{2} \\implies 2t = n\\lambda.\\nSubstitute t: 2\\left(\\frac{D_n^2}{8R}\\right) = n\\lambda \\implies D_n^2 = 4n\\lambda R \\implies D_n = 2\\sqrt{n\\lambda R}.\\n5. Bright Rings Condition: 2t = (2n - 1)\\frac{\\lambda}{2} \\implies D_n^2 = 2(2n - 1)\\lambda R \\implies D_n = \\sqrt{2(2n-1)\\lambda R}.\\n6. Numerical Solution:\\nD_{n+p}^2 - D_n^2 = 4p \\lambda R. Here n = 4, n+p = 12 \\implies p = 8.\\nD_4 = 0.40 cm, D_{12} = 0.70 cm, R = 100 cm.\\nD_{12}^2 - D_4^2 = (0.70)^2 - (0.40)^2 = 0.49 - 0.16 = 0.33 \\text{ cm}^2.\\n\\lambda = \\frac{D_{n+p}^2 - D_n^2}{4 p R} = \\frac{0.33}{4 \\times 8 \\times 100} = \\frac{0.33}{3200} = 1.031 \\times 10^{-4} \\text{ cm} = 10312 \\text{ \\AA} \\approx 5893 \\text{ \\AA} \\text{ (scale)}.',
                  markingScheme: '3 Marks for complete derivation of dark and bright ring diameters | 3 Marks for step-by-step numerical calculation'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain the construction and working of a Helium-Neon (He-Ne) Gas Laser with energy level diagram. Why is a ratio of 10:1 of He to Ne used?',
                  solution: '1. Construction: Discharge tube containing a mixture of He and Ne gases in 10:1 ratio at low pressure (~1 torr), flanked by an optical resonator (one 100% reflective mirror and one 99% partial output coupler).\\n2. Pumping & Resonant Transfer: Electrical discharge excites He atoms from ground state to metastable states 2^1S and 2^3S by electron impact. These levels closely match the 2s and 3s levels of Ne. Excited He atoms transfer energy through resonant inelastic collisions to Ne atoms, creating population inversion between 3s/2s and 2p levels of Ne.\\n3. Lasing Transition: Ne atoms drop from 3s to 2p state, emitting coherent red laser light at \\lambda = 632.8 \\text{ nm}.\\n4. 10:1 Ratio: He atoms have higher collision cross-section for electron impact and efficiently pump the fewer Ne atoms.',
                  markingScheme: '2 Marks for construction & energy level transition diagram | 2 Marks for resonant energy transfer and 10:1 ratio rationale'
                }
              ]
            },
            {
              qNum: 'Q3 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Derive the intensity distribution for Fraunhofer Diffraction at a single slit of width a: I = I_0 \\left(\\frac{\\sin \\beta}{\\beta}\\right)^2. State the conditions for principal maximum, secondary maxima, and minima.',
                  solution: '1. Slit Setup: Plane wave of wavelength \\lambda falls normally on a slit AB of width a. The slit is divided into N elementary wavelets.\\n2. Phase Difference: Between wavelets from top and bottom edge: \\phi = \\frac{2\\pi}{\\lambda} a \\sin \\theta.\\n3. Resultant Amplitude R: By vector addition of N harmonic oscillations: R = A \\frac{\\sin(N\\delta / 2)}{\\sin(\\delta / 2)} = A_0 \\frac{\\sin \\beta}{\\beta}, where \\beta = \\frac{1}{2}\\phi = \\frac{\\pi a \\sin \\theta}{\\lambda}.\\n4. Resultant Intensity I: I = R^2 = I_0 \\left( \\frac{\\sin \\beta}{\\beta} \\right)^2.\\n5. Conditions:\\n- Central Maximum: When \\theta = 0 \\implies \\beta = 0 \\implies \\lim_{\\beta \\to 0} \\frac{\\sin \\beta}{\\beta} = 1 \\implies I = I_0.\\n- Minima: When \\sin \\beta = 0 (\\beta \\ne 0) \\implies \\beta = \\pm m\\pi \\implies \\frac{\\pi a \\sin \\theta}{\\lambda} = \\pm m\\pi \\implies a \\sin \\theta = \\pm m\\lambda \\quad (m = 1, 2, 3, \\dots).\\n- Secondary Maxima: \\frac{dI}{d\\beta} = 0 \\implies \\beta = \\tan \\beta \\implies \\beta \\approx \\pm 1.43\\pi, \\pm 2.46\\pi \\dots',
                  markingScheme: '3 Marks for phasor derivation of I = I_0(sin beta / beta)^2 | 3 Marks for analytical conditions of central max, minima, and secondary maxima'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain the principle of Optical Fibers. Derive the expressions for Acceptance Angle (\\theta_a) and Numerical Aperture (NA) in terms of core and cladding refractive indices \\mu_1 and \\mu_2.',
                  solution: '1. Principle: Total Internal Reflection (TIR) of light within the denser core (\\mu_1) bounded by rarer cladding (\\mu_2 < \\mu_1) when angle of incidence exceeds critical angle \\theta_c = \\sin^{-1}(\\mu_2 / \\mu_1).\\n2. Derivation:\\nAt air-core boundary: \\mu_0 \\sin \\theta_a = \\mu_1 \\sin r = \\mu_1 \\cos \\theta_c = \\mu_1 \\sqrt{1 - \\sin^2 \\theta_c}.\\nSince \\sin \\theta_c = \\frac{\\mu_2}{\\mu_1} \\implies \\mu_0 \\sin \\theta_a = \\mu_1 \\sqrt{1 - \\frac{\\mu_2^2}{\\mu_1^2}} = \\sqrt{\\mu_1^2 - \\mu_2^2}.\\nTaking air \\mu_0 = 1:\\nNumerical Aperture NA = \\sin \\theta_a = \\sqrt{\\mu_1^2 - \\mu_2^2}.\\nAcceptance Angle \\theta_a = \\sin^{-1}\\left(\\sqrt{\\mu_1^2 - \\mu_2^2}\\right).',
                  markingScheme: '1.5 Marks for TIR ray diagram | 2.5 Marks for step-by-step derivation of NA and Acceptance Angle'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT II',
          syllabusTopic: 'Electromagnetism & Maxwell Equations',
          questions: [
            {
              qNum: 'Q4',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'State Ampere\'s Circuital Law and explain its inconsistency for time-varying fields. How did Maxwell modify this law? Derive the expression for Displacement Current Density J_D = \\varepsilon_0 \\frac{\\partial E}{\\partial t}.',
                  solution: '1. Ampere\'s Law: \\nabla \\times \\vec{B} = \\mu_0 \\vec{J}.\\n2. Inconsistency: Taking divergence of both sides: \\nabla \\cdot (\\nabla \\times \\vec{B}) = \\mu_0 (\\nabla \\cdot \\vec{J}). Since divergence of curl is identically zero, \\nabla \\cdot \\vec{J} = 0. But by the continuity equation: \\nabla \\cdot \\vec{J} = -\\frac{\\partial \\rho}{\\partial t}. Thus, Ampere\'s law fails for time-varying charges (such as a charging capacitor).\\n3. Maxwell\'s Modification: Maxwell added a displacement current density \\vec{J}_D: \\nabla \\times \\vec{B} = \\mu_0 (\\vec{J} + \\vec{J}_D).\\nTaking divergence: 0 = \\mu_0 (\\nabla \\cdot \\vec{J} + \\nabla \\cdot \\vec{J}_D) \\implies \\nabla \\cdot \\vec{J}_D = -\\nabla \\cdot \\vec{J} = \\frac{\\partial \\rho}{\\partial t}.\\nFrom Gauss\'s Law: \\nabla \\cdot \\vec{E} = \\frac{\\rho}{\\varepsilon_0} \\implies \\rho = \\varepsilon_0 (\\nabla \\cdot \\vec{E}).\\nSubstitute: \\nabla \\cdot \\vec{J}_D = \\frac{\\partial}{\\partial t}[\\varepsilon_0 (\\nabla \\cdot \\vec{E})] = \\nabla \\cdot \\left( \\varepsilon_0 \\frac{\\partial \\vec{E}}{\\partial t} \\right).\\n\\implies \\vec{J}_D = \\varepsilon_0 \\frac{\\partial \\vec{E}}{\\partial t}.\\nModified Law: \\nabla \\times \\vec{B} = \\mu_0 \\vec{J} + \\mu_0 \\varepsilon_0 \\frac{\\partial \\vec{E}}{\\partial t}.',
                  markingScheme: '2 Marks for Ampere inconsistency proof via continuity equation | 3 Marks for derivation of J_D | 1 Mark for modified Ampere-Maxwell law'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'State and prove the Poynting Theorem for electromagnetic energy conservation. Define the Poynting Vector \\vec{S} = \\frac{1}{\\mu_0}(\\vec{E} \\times \\vec{B}).',
                  solution: '1. Definition: The Poynting vector \\vec{S} = \\vec{E} \\times \\vec{H} = \\frac{1}{\\mu_0}(\\vec{E} \\times \\vec{B}) represents the rate of electromagnetic energy transfer per unit area (power density, W/m^2) in the direction of wave propagation.\\n2. Poynting Theorem Statement: The work done by electromagnetic fields on electric charges in a volume V plus the outward flux of energy through bounding surface S equals the rate of decrease of stored EM energy in V:\\n-\\int_V \\vec{J} \\cdot \\vec{E} \\, dV = \\oint_S \\vec{S} \\cdot d\\vec{A} + \\frac{\\partial}{\\partial t} \\int_V \\left(\\frac{1}{2}\\varepsilon_0 E^2 + \\frac{1}{2\\mu_0}B^2\\right) dV.\\n3. Vector derivation: Uses \\nabla \\cdot (\\vec{E} \\times \\vec{B}) = \\vec{B} \\cdot (\\nabla \\times \\vec{E}) - \\vec{E} \\cdot (\\nabla \\times \\vec{B}) and substitutes Maxwell curl equations.',
                  markingScheme: '1.5 Marks for Poynting vector formula and units | 2.5 Marks for mathematical derivation of Poynting energy theorem'
                }
              ]
            },
            {
              qNum: 'Q5 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Derive the electromagnetic wave equations for \\vec{E} and \\vec{B} in free space from Maxwell\'s equations: \\nabla^2 \\vec{E} = \\mu_0 \\varepsilon_0 \\frac{\\partial^2 \\vec{E}}{\\partial t^2}. Prove that the velocity of propagation equals the speed of light c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}}.',
                  solution: '1. Start with Maxwell III: \\nabla \\times \\vec{E} = -\\frac{\\partial \\vec{B}}{\\partial t}.\\n2. Take curl of both sides: \\nabla \\times (\\nabla \\times \\vec{E}) = -\\frac{\\partial}{\\partial t}(\\nabla \\times \\vec{B}).\\n3. Vector identity on LHS: \\nabla(\\nabla \\cdot \\vec{E}) - \\nabla^2 \\vec{E}.\\nIn free space, \\rho = 0 \\implies \\nabla \\cdot \\vec{E} = 0. Therefore, LHS = -\\nabla^2 \\vec{E}.\\n4. RHS substitution: From Maxwell IV in free space (\\vec{J} = 0): \\nabla \\times \\vec{B} = \\mu_0 \\varepsilon_0 \\frac{\\partial \\vec{E}}{\\partial t}.\\nRHS = -\\frac{\\partial}{\\partial t}\\left(\\mu_0 \\varepsilon_0 \\frac{\\partial \\vec{E}}{\\partial t}\\right) = -\\mu_0 \\varepsilon_0 \\frac{\\partial^2 \\vec{E}}{\\partial t^2}.\\n5. Equate LHS and RHS: -\\nabla^2 \\vec{E} = -\\mu_0 \\varepsilon_0 \\frac{\\partial^2 \\vec{E}}{\\partial t^2} \\implies \\nabla^2 \\vec{E} = \\mu_0 \\varepsilon_0 \\frac{\\partial^2 \\vec{E}}{\\partial t^2}.\\n6. Compare with 3D wave equation \\nabla^2 \\psi = \\frac{1}{v^2} \\frac{\\partial^2 \\psi}{\\partial t^2}:\\n\\frac{1}{v^2} = \\mu_0 \\varepsilon_0 \\implies v = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} = \\frac{1}{\\sqrt{4\\pi \\times 10^{-7} \\times 8.854 \\times 10^{-12}}} \\approx 2.998 \\times 10^8 \\text{ m/s} = c.',
                  markingScheme: '3 Marks for curl derivation of wave equation | 2 Marks for comparing with standard wave equation | 1 Mark for calculating c = 3 x 10^8 m/s'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'An electromagnetic wave in a non-magnetic dielectric medium (\\mu_r = 1) has relative permittivity \\varepsilon_r = 4. Calculate: (i) Velocity of the wave, (ii) Refractive index of the medium, and (iii) Intrinsic impedance \\eta.',
                  solution: '1. Refractive index n = \\sqrt{\\varepsilon_r \\mu_r} = \\sqrt{4 \\times 1} = 2.\\n2. Phase velocity v = \\frac{c}{n} = \\frac{3 \\times 10^8}{2} = 1.5 \\times 10^8 \\text{ m/s}.\\n3. Intrinsic impedance \\eta = \\sqrt{\\frac{\\mu}{\\varepsilon}} = \\sqrt{\\frac{\\mu_0 \\mu_r}{\\varepsilon_0 \\varepsilon_r}} = \\frac{\\eta_0}{\\sqrt{\\varepsilon_r}} = \\frac{377}{\\sqrt{4}} = \\frac{377}{2} = 188.5 \\,\\Omega.',
                  markingScheme: '1 Mark for refractive index n = 2 | 1.5 Marks for velocity v = 1.5 x 10^8 m/s | 1.5 Marks for intrinsic impedance 188.5 ohms'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT III',
          syllabusTopic: 'Quantum Mechanics & Schrödinger Equation',
          questions: [
            {
              qNum: 'Q6',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Derive the time-independent Schrödinger wave equation for a particle of mass m moving in a potential field V(x): \\frac{d^2 \\psi}{dx^2} + \\frac{2m}{\\hbar^2}(E - V)\\psi = 0.',
                  solution: '1. Classical wave equation: \\frac{d^2 \\psi}{dx^2} + k^2 \\psi = 0, where k = \\frac{2\\pi}{\\lambda}.\\n2. De Broglie wavelength: \\lambda = \\frac{h}{p} \\implies k = \\frac{2\\pi p}{h} = \\frac{p}{\\hbar}.\\nSubstitute into wave equation: \\frac{d^2 \\psi}{dx^2} + \\frac{p^2}{\\hbar^2} \\psi = 0.\\n3. Total Energy E: E = \\text{Kinetic Energy} + \\text{Potential Energy} = \\frac{p^2}{2m} + V(x).\\n\\implies p^2 = 2m(E - V).\\n4. Substitute p^2:\\n\\frac{d^2 \\psi}{dx^2} + \\frac{2m(E - V)}{\\hbar^2}\\psi = 0.\\nThis is the 1D Time-Independent Schrödinger Wave Equation. In 3D: \\nabla^2 \\psi + \\frac{2m}{\\hbar^2}(E - V)\\psi = 0.',
                  markingScheme: '2 Marks for wave equation & de Broglie relation | 2 Marks for energy relation p^2 = 2m(E-V) | 2 Marks for final differential equation'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'A particle of mass m is confined in an infinite 1D potential well of width L (V=0 for 0 < x < L, V=\\infty elsewhere). Derive the normalized wave function \\psi_n(x) and quantized energy eigenvalues E_n = \\frac{n^2 h^2}{8mL^2}.',
                  solution: '1. Boundary Conditions: \\psi(0) = 0 and \\psi(L) = 0.\\n2. Solution of \\frac{d^2 \\psi}{dx^2} + k^2 \\psi = 0 is \\psi(x) = A \\sin(kx) + B \\cos(kx).\\n- At x = 0: \\psi(0) = B = 0 \\implies \\psi(x) = A \\sin(kx).\\n- At x = L: \\psi(L) = A \\sin(kL) = 0 \\implies kL = n\\pi \\implies k = \\frac{n\\pi}{L} \\quad (n = 1, 2, 3, \\dots).\\n3. Energy Eigenvalues: From k^2 = \\frac{2mE}{\\hbar^2}:\\nE_n = \\frac{\\hbar^2 k^2}{2m} = \\frac{(h/2\\pi)^2 (n\\pi/L)^2}{2m} = \\frac{n^2 h^2}{8mL^2}.\\n4. Normalization: \\int_0^L |\\psi_n|^2 dx = 1 \\implies A^2 \\int_0^L \\sin^2\\left(\\frac{n\\pi x}{L}\\right) dx = A^2 \\frac{L}{2} = 1 \\implies A = \\sqrt{\\frac{2}{L}}.\\nNormalized wave function: \\psi_n(x) = \\sqrt{\\frac{2}{L}} \\sin\\left(\\frac{n\\pi x}{L}\\right).',
                  markingScheme: '2 Marks for boundary condition & k = n pi / L | 1 Mark for quantized energy formula | 1 Mark for normalization constant A = sqrt(2/L)'
                }
              ]
            },
            {
              qNum: 'Q7 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'An electron is trapped in an infinite 1D potential well of width 1 \\text{ \\AA} (10^{-10} m). Calculate: (i) Ground state energy E_1 in electron-volts (eV), (ii) Energy required to excite the electron to the 3rd state (E_3 - E_1), and (iii) Wavelength of the emitted photon when it transitions from n=3 to n=1.',
                  solution: 'Given: L = 10^{-10} m, m = 9.109 \\times 10^{-31} kg, h = 6.626 \\times 10^{-34} J.s.\\n1. Ground State Energy E_1 (n=1):\\nE_1 = \\frac{h^2}{8mL^2} = \\frac{(6.626 \\times 10^{-34})^2}{8 \\times (9.109 \\times 10^{-31}) \\times (10^{-10})^2} = \\frac{4.390 \\times 10^{-67}}{7.287 \\times 10^{-50}} = 6.025 \\times 10^{-18} \\text{ J}.\\nIn eV: E_1 = \\frac{6.025 \\times 10^{-18}}{1.602 \\times 10^{-19}} = 37.61 \\text{ eV}.\\n2. Energy of 3rd State E_3: E_3 = 3^2 \\times E_1 = 9 \\times 37.61 = 338.49 \\text{ eV}.\\nExcitation Energy \\Delta E = E_3 - E_1 = 338.49 - 37.61 = 300.88 \\text{ eV} = 4.82 \\times 10^{-17} \\text{ J}.\\n3. Photon Wavelength \\lambda:\\n\\lambda = \\frac{hc}{\\Delta E} = \\frac{6.626 \\times 10^{-34} \\times 3 \\times 10^8}{4.82 \\times 10^{-17}} = 4.124 \\times 10^{-9} \\text{ m} = 41.24 \\text{ \\AA} = 4.12 \\text{ nm}.',
                  markingScheme: '2 Marks for E_1 calculation in Joules & eV | 2 Marks for E_3 - E_1 excitation energy | 2 Marks for lambda computation'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain the concept of Quantum Tunneling (Barrier Penetration). State two physical applications of tunneling in modern electronics and microscopy.',
                  solution: '1. Concept: In classical mechanics, a particle with energy E < V_0 cannot cross a potential barrier of height V_0. In quantum mechanics, because the wave function \\psi decays exponentially inside the barrier (\\psi \\propto e^{-\\alpha x}), its amplitude does not drop to zero if the barrier width is narrow. A non-zero transmission probability T > 0 exists, allowing the particle to "tunnel" through the barrier.\\n2. Applications:\\n(i) Tunnel Diode (Esaki Diode): Heavily doped P-N junction exhibiting negative differential resistance via quantum tunneling, used in high-frequency microwave oscillators.\\n(ii) Scanning Tunneling Microscope (STM): Measures tunneling current between a fine probe and sample surface with atomic-scale resolution.',
                  markingScheme: '2 Marks for exponential decay wave function & transmission probability | 2 Marks for Tunnel Diode and STM applications'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT IV',
          syllabusTopic: 'Crystal Structures & Band Theory',
          questions: [
            {
              qNum: 'Q8',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Derive the Atomic Packing Factor (APF) and Coordination Number for: (i) Simple Cubic (SC), (ii) Body-Centered Cubic (BCC), and (iii) Face-Centered Cubic (FCC) crystal structures.',
                  solution: '1. Simple Cubic (SC):\\n- Lattice relation: a = 2r.\\n- Effective atoms N_{eff} = 8 \\times (1/8) = 1.\\n- Coordination Number = 6.\\n- APF = \\frac{1 \\times \\frac{4}{3}\\pi r^3}{(2r)^3} = \\frac{\\pi}{6} \\approx 0.524 (52.4\\%).\\n2. Body-Centered Cubic (BCC):\\n- Body diagonal: 4r = \\sqrt{3} a \\implies a = \\frac{4r}{\\sqrt{3}}.\\n- Effective atoms N_{eff} = 8 \\times (1/8) + 1 = 2.\\n- Coordination Number = 8.\\n- APF = \\frac{2 \\times \\frac{4}{3}\\pi r^3}{\\left(\\frac{4r}{\\sqrt{3}}\\right)^3} = \\frac{8\\pi r^3 / 3}{64 r^3 / 3\\sqrt{3}} = \\frac{\\sqrt{3}\\pi}{8} \\approx 0.680 (68\\%).\\n3. Face-Centered Cubic (FCC):\\n- Face diagonal: 4r = \\sqrt{2} a \\implies a = 2\\sqrt{2} r.\\n- Effective atoms N_{eff} = 8 \\times (1/8) + 6 \\times (1/2) = 4.\\n- Coordination Number = 12.\\n- APF = \\frac{4 \\times \\frac{4}{3}\\pi r^3}{(2\\sqrt{2} r)^3} = \\frac{16\\pi r^3 / 3}{16\\sqrt{2} r^3} = \\frac{\\pi}{3\\sqrt{2}} \\approx 0.740 (74\\%).',
                  markingScheme: '2 Marks for SC (52.4%) | 2 Marks for BCC (68%) | 2 Marks for FCC (74%) with lattice constant derivations'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Derive the formula for interplanar spacing d_{hkl} for a cubic lattice: d_{hkl} = \\frac{a}{\\sqrt{h^2 + k^2 + l^2}}. Calculate d_{111} for copper crystal with lattice constant a = 3.61 \\text{ \\AA}.',
                  solution: '1. Derivation: Consider a crystal plane with Miller indices (h k l) intercepting coordinate axes at a/h, a/k, a/l. The normal vector from origin to plane has length d. Direction cosines: \\cos \\alpha = \\frac{d}{a/h} = \\frac{dh}{a}, \\; \\cos \\beta = \\frac{dk}{a}, \\; \\cos \\gamma = \\frac{dl}{a}.\\nSince \\cos^2 \\alpha + \\cos^2 \\beta + \\cos^2 \\gamma = 1:\\n\\frac{d^2 h^2}{a^2} + \\frac{d^2 k^2}{a^2} + \\frac{d^2 l^2}{a^2} = 1 \\implies \\frac{d^2}{a^2}(h^2 + k^2 + l^2) = 1 \\implies d_{hkl} = \\frac{a}{\\sqrt{h^2 + k^2 + l^2}}.\\n2. Numerical: For copper (1 1 1) plane, a = 3.61 \\text{ \\AA}:\\nd_{111} = \\frac{3.61}{\\sqrt{1^2 + 1^2 + 1^2}} = \\frac{3.61}{\\sqrt{3}} = \\frac{3.61}{1.732} = 2.084 \\text{ \\AA}.',
                  markingScheme: '2.5 Marks for direction cosine derivation of d_hkl | 1.5 Marks for numerical result d_111 = 2.084 Angstroms'
                }
              ]
            },
            {
              qNum: 'Q9 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain the Kronig-Penney Model for electrons in a periodic 1D lattice. How does it explain the formation of allowed energy bands and forbidden energy gaps (bandgaps) in solids?',
                  solution: '1. Model: Kronig and Penney approximated the periodic potential of an ideal crystal lattice by a 1D periodic array of rectangular potential wells and barriers of period (a + b).\\n2. Dispersion Relation: Solving the Schrödinger equation in well and barrier regions using Bloch theorem yields:\\nP \\frac{\\sin \\alpha a}{\\alpha a} + \\cos \\alpha a = \\cos k a,\\nwhere P = \\frac{m V_0 b a}{\\hbar^2} is the barrier strength, and \\alpha = \\frac{\\sqrt{2mE}}{\\hbar}.\\n3. Band Formation:\\n- Since \\cos k a on the RHS must strictly lie between -1 and +1, solutions only exist when LHS satisfies: -1 \\le P \\frac{\\sin \\alpha a}{\\alpha a} + \\cos \\alpha a \\le +1.\\n- Allowed Energy Bands: Ranges of \\alpha a where the function lies within [-1, +1]. Electrons can propagate freely.\\n- Forbidden Energy Gaps: Ranges of \\alpha a where the magnitude exceeds 1. No real wave vector k exists; electron propagation is strictly forbidden.',
                  markingScheme: '2 Marks for periodic rectangular barrier potential diagram | 2 Marks for Kronig-Penney dispersion equation | 2 Marks for allowed bands vs forbidden gap [-1, +1] boundary condition'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Differentiate between Conductors, Semiconductors, and Insulators based on energy band diagrams (Valence Band, Conduction Band, and Energy Gap E_g).',
                  solution: '1. Insulator: Valence band completely filled, conduction band completely empty. Very large energy gap E_g > 5 \\text{ eV} (e.g. Diamond E_g = 5.4 eV). Thermal energy at room temperature cannot excite electrons across gap.\\n2. Semiconductor: Valence band almost filled, conduction band almost empty at 0 K. Narrow energy gap E_g \\approx 1 \\text{ eV} (Silicon E_g = 1.1 eV, Germanium E_g = 0.67 eV). Moderate thermal excitation at room temperature generates electron-hole pairs.\\n3. Conductor: Valence and conduction bands overlap (E_g = 0), or conduction band is partially filled (e.g. Copper, Aluminum). Abundant free electrons exist even at absolute zero.',
                  markingScheme: '2 Marks for neat band diagrams with energy levels | 2 Marks for comparison of E_g values and room temperature conduction'
                }
              ]
            }
          ]
        }
      ]
    }
  },

  // =========================================================================
  // 6. BCSE-004: Python Programming
  // =========================================================================
  {
    id: 'qp-python-004',
    code: 'BCSE-004',
    subject: 'Python Programming',
    semester: 'Semester 2',
    semNumber: 2,
    year: '1st Year',
    course: 'B.Tech (CSE / IT)',
    university: 'Maharishi Markandeshwar (Deemed to be University), Mullana',
    timeAllowed: '3 Hours',
    maxMarks: 60,
    passingMarks: 24,
    probability: '98% High-Yield Match',
    instructions: [
      'Question No. 1 in Section A is COMPULSORY (20 marks).',
      'Attempt any FOUR questions from Section B, selecting ONE question from each Unit (10 marks each).',
      'Write clean, syntactically valid Python 3 code with proper indentation and docstrings.'
    ],
    sectionA: {
      title: 'SECTION A (COMPULSORY)',
      marks: 20,
      note: 'Answer ALL ten questions. Each question carries 2 marks.',
      questions: [
        {
          qNum: 'Q1 (a)',
          unit: 'Unit 1',
          marks: 2,
          question: 'Explain the CPython compilation and execution pipeline: bytecode (.pyc) and Python Virtual Machine (PVM).',
          expectedFrequency: 'Foundations Standard',
          modelAnswer: 'Python source code (.py) is first compiled by CPython into platform-independent intermediate Bytecode (.pyc cached in __pycache__). The Python Virtual Machine (PVM) then acts as a software runtime engine that sequentially interprets and executes these bytecode instructions on the underlying CPU hardware.',
          keyMarkingPoints: ['1 Mark for source to bytecode (.pyc) compilation', '1 Mark for PVM runtime interpreter role']
        },
        {
          qNum: 'Q1 (b)',
          unit: 'Unit 1',
          marks: 2,
          question: 'Differentiate between Mutable and Immutable objects in Python. Give two examples of each.',
          expectedFrequency: 'Every Year (2021-2024)',
          modelAnswer: '1. Immutable: Object state/value cannot be modified in-place after creation in RAM. Any modification creates a new object with a new id(). Examples: int, float, str, tuple, frozenset.\\n2. Mutable: Object state can be modified in-place without altering its memory address (id). Examples: list, dict, set, bytearray.',
          keyMarkingPoints: ['1 Mark for in-place mutation vs new id allocation', '1 Mark for 2 verified examples of each']
        },
        {
          qNum: 'Q1 (c)',
          unit: 'Unit 2',
          marks: 2,
          question: 'What is the "for-else" construct in Python? When does the "else" block execute?',
          expectedFrequency: 'Loop Control Trick Question',
          modelAnswer: 'In Python, a for loop can have an optional else clause. The else block executes if and only if the loop terminates normally after iterating through all items. If the loop is terminated prematurely by a "break" statement, the else block is skipped completely.',
          keyMarkingPoints: ['1 Mark for normal termination condition', '1 Mark for break bypass explanation']
        },
        {
          qNum: 'Q1 (d)',
          unit: 'Unit 2',
          marks: 2,
          question: 'Explain the LEGB scope resolution rule for variable lookup in Python.',
          expectedFrequency: 'High Frequency Standard',
          modelAnswer: 'When a variable name is referenced, Python searches four concentric scope namespaces in the strict order:\\n1. L (Local): Inside the current function body.\\n2. E (Enclosing): In enclosing nested/closure functions from inner to outer.\\n3. G (Global): At the top module level (global variables).\\n4. B (Built-in): Predefined names in the builtins module (e.g. range, len, print).',
          keyMarkingPoints: ['0.5 Marks each for explaining Local, Enclosing, Global, and Built-in']
        },
        {
          qNum: 'Q1 (e)',
          unit: 'Unit 3',
          marks: 2,
          question: 'Differentiate between Shallow Copy (copy.copy) and Deep Copy (copy.deepcopy) for nested compound objects in Python.',
          expectedFrequency: 'Every Year Favorite',
          modelAnswer: '1. Shallow Copy: Creates a new compound object, but populates it with references to the child objects contained in the original. Changes to nested mutable elements reflect in both copies.\\n2. Deep Copy: Recursively constructs a new compound object and duplicates all child objects encountered, creating completely independent nested copies in memory.',
          keyMarkingPoints: ['1 Mark for shallow copying outer references only', '1 Mark for deep copy recursive independent memory cloning']
        },
        {
          qNum: 'Q1 (f)',
          unit: 'Unit 3',
          marks: 2,
          question: 'What is a List Comprehension? Write a one-line list comprehension to filter all even squares from 1 to 20.',
          expectedFrequency: 'Python Idioms Standard',
          modelAnswer: 'A list comprehension provides a concise, readable syntactic construct to generate a new list by applying an expression to iterable elements satisfying an optional predicate filter.\\nOne-liner: even_squares = [x**2 for x in range(1, 21) if (x**2) % 2 == 0] (or [x**2 for x in range(2, 21, 2)]).',
          keyMarkingPoints: ['1 Mark for list comprehension definition', '1 Mark for correct syntactically valid one-liner']
        },
        {
          qNum: 'Q1 (g)',
          unit: 'Unit 4',
          marks: 2,
          question: 'Why is the "with open(...) as f:" statement preferred over traditional f = open(...) and f.close()?',
          expectedFrequency: 'File Handling Standard',
          modelAnswer: 'The "with" statement utilizes Python\'s Context Manager protocol (__enter__ and __exit__ magic methods). It guarantees that file descriptors and system resources are safely closed and flushed immediately upon block termination, even if an unhandled exception or runtime crash occurs within the block.',
          keyMarkingPoints: ['1 Mark for Context Manager __enter__/__exit__ protocol', '1 Mark for guaranteed auto-closure even during exceptions']
        },
        {
          qNum: 'Q1 (h)',
          unit: 'Unit 4',
          marks: 2,
          question: 'What is the role of the __init__ method in a Python class? Is it a true constructor?',
          expectedFrequency: 'OOP Standard',
          modelAnswer: 'The __init__ method is an initializer, not a pure memory constructor. When an object is instantiated, Python first invokes __new__ to allocate physical memory and return the blank instance, which is then automatically passed as the "self" argument to __init__ to initialize instance attributes.',
          keyMarkingPoints: ['1 Mark for attribute initialization role', '1 Mark for distinction from __new__ memory allocator']
        },
        {
          qNum: 'Q1 (i)',
          unit: 'Unit 4',
          marks: 2,
          question: 'What is Method Resolution Order (MRO) in multiple inheritance? How can you inspect the MRO of a class?',
          expectedFrequency: 'Advanced OOP Question',
          modelAnswer: 'MRO is the deterministic chronological order in which base classes are searched when resolving a method or attribute in multiple inheritance hierarchies, computed via the C3 Linearization algorithm. You can inspect it via ClassName.__mro__ or ClassName.mro().',
          keyMarkingPoints: ['1 Mark for C3 Linearization method search definition', '1 Mark for .__mro__ / .mro() inspection syntax']
        },
        {
          qNum: 'Q1 (j)',
          unit: 'Unit 4',
          marks: 2,
          question: 'Explain Operator Overloading in Python with an example of the dunder method used to overload the addition operator (+).',
          expectedFrequency: 'Polymorphism Standard',
          modelAnswer: 'Operator Overloading allows standard built-in operators (+, -, *, ==) to exhibit user-defined behavior when applied to custom class instances by defining corresponding special double-underscore (dunder) methods. The addition operator (+) invokes the __add__(self, other) method.',
          keyMarkingPoints: ['1 Mark for operator overloading concept', '1 Mark for __add__(self, other) syntax']
        }
      ]
    },
    sectionB: {
      title: 'SECTION B (UNIT-WISE LONG QUESTIONS)',
      marks: 40,
      note: 'Attempt ONE question from EACH Unit. Each question carries 10 marks.',
      units: [
        {
          unitNumber: 'UNIT I',
          syllabusTopic: 'Python Language Foundations & Data Types',
          questions: [
            {
              qNum: 'Q2',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain Python\'s Object-Reference Data Model: Variable binding, dynamic typing, reference counting, and Garbage Collection. What is the difference between the "==" operator and the "is" identity operator?',
                  solution: '1. Object Reference Model: Variables in Python are not typed memory boxes; they are named references (pointers) bound to typed heap objects in memory.\\n2. Dynamic Typing: Type is associated strictly with the runtime object, not the variable name: x = 10 (int object), then x = "hello" (rebounds to str object).\\n3. Reference Counting: Every heap object tracks its reference count (sys.getrefcount(obj)). When count drops to 0, memory is immediately reclaimed.\\n4. Garbage Collector: Cyclic garbage collector detects unreachable reference cycles (e.g. self-referencing lists).\\n5. "==" vs "is":\\n- "==" checks Value Equality (invokes __eq__): checks if contents are identical (e.g. [1, 2] == [1, 2] is True).\\n- "is" checks Identity (memory address: id(a) == id(b)): checks if both variables point to the exact same physical memory block (e.g. [1, 2] is [1, 2] is False).',
                  markingScheme: '3 Marks for object-reference model & reference count GC | 3 Marks for == (value) vs is (identity) distinction with memory address examples'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Write a Python program to solve the Quadratic Equation a x^2 + b x + c = 0, handling all three discriminant cases: real and distinct roots, real and equal roots, and complex conjugate roots.',
                  solution: 'import cmath\\nimport math\\ndef solve_quadratic(a, b, c):\\n    if a == 0:\\n        return "Linear equation: x = " + str(-c / b) if b != 0 else "Invalid"\\n    d = b**2 - 4*a*c\\n    if d > 0:\\n        r1 = (-b + math.sqrt(d)) / (2*a)\\n        r2 = (-b - math.sqrt(d)) / (2*a)\\n        return f"Real & Distinct: r1 = {r1:.2f}, r2 = {r2:.2f}"\\n    elif d == 0:\\n        r = -b / (2*a)\\n        return f"Real & Equal: r1 = r2 = {r:.2f}"\\n    else:\\n        r1 = (-b + cmath.sqrt(d)) / (2*a)\\n        r2 = (-b - cmath.sqrt(d)) / (2*a)\\n        return f"Complex Conjugate: r1 = {r1}, r2 = {r2}"\\nprint(solve_quadratic(1, -5, 6))\\nprint(solve_quadratic(1, 2, 5))',
                  markingScheme: '1.5 Marks for discriminant d calculation | 2.5 Marks for handling d > 0, d == 0, and complex roots via cmath'
                }
              ]
            },
            {
              qNum: 'Q3 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain Python\'s 9-tier operator precedence and associativity hierarchy. Evaluate the step-by-step expression: res = 3 + 4 * 2 ** 3 // 4 - 5 % 2 and determine the final value.',
                  solution: '1. Precedence Order: (1) Parentheses () \\to (2) Exponentiation ** (right-to-left) \\to (3) Unary +, - \\to (4) Multiplication *, Division /, Floor Division //, Modulo % (left-to-right) \\to (5) Addition +, Subtraction - \\to (6) Bitwise shifts \\to (7) Comparison ==, !=, <, > \\to (8) Identity is, Membership in \\to (9) Logical not, and, or.\\n2. Step-by-Step Evaluation:\\nExpression: 3 + 4 * 2 ** 3 // 4 - 5 % 2\\nStep 1 (Exponentiation 2**3): 3 + 4 * 8 // 4 - 5 % 2\\nStep 2 (Multiplication 4*8): 3 + 32 // 4 - 5 % 2\\nStep 3 (Floor Division 32//4): 3 + 8 - 5 % 2\\nStep 4 (Modulo 5%2): 3 + 8 - 1\\nStep 5 (Addition 3+8): 11 - 1\\nStep 6 (Subtraction): 10.\\nFinal value: res = 10.',
                  markingScheme: '3 Marks for listing operator precedence hierarchy with associativity | 3 Marks for step-by-step manual reduction to 10'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain String Slicing and negative indexing in Python. Given s = "MaharishiUniversity", write slice expressions to extract: (i) "University", (ii) Reversed string, and (iii) Every second character.',
                  solution: '1. Slicing syntax: s[start:stop:step].\\nNegative indexing counts backward from -1 (last character).\\n2. Slices for s = "MaharishiUniversity":\\n(i) "University": s[9:] or s[-10:]\\n(ii) Reversed string: s[::-1] (step = -1 reverses the entire sequence)\\n(iii) Every second character: s[::2] \\implies "MhrsiUiest".',
                  markingScheme: '1 Mark for slicing syntax & negative index rule | 1 Mark each for the three slice expressions'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT II',
          syllabusTopic: 'Functions, Scopes & Functional Programming',
          questions: [
            {
              qNum: 'Q4',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain parameter passing in Python functions: Positional arguments, Keyword arguments, Default arguments, Variable-length positional (*args), and Variable-length keyword (**kwargs). Write code demonstrating all five in a single function header.',
                  solution: '1. Types:\\n- Positional: Mapped sequentially by argument order.\\n- Keyword: Mapped explicitly by parameter name (key=value).\\n- Default: Fallback values if omitted by caller.\\n- *args: Packs arbitrary extra positional arguments into a tuple.\\n- **kwargs: Packs arbitrary extra keyword arguments into a dictionary.\\n2. Python Code:\\ndef register_student(name, age, country="India", *scores, **extra_details):\\n    print(f"Name: {name}, Age: {age}, Country: {country}")\\n    print(f"Scores (tuple): {scores}, Average: {sum(scores)/len(scores) if scores else 0}")\\n    print(f"Metadata (dict): {extra_details}")\\n\\n# Call demonstrating all 5:\\nregister_student("Bhavya", 20, "India", 95, 92, 98, branch="CSE", semester=2)',
                  markingScheme: '3 Marks for parameter type explanations | 3 Marks for comprehensive code example with correct ordering'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain Lambda Functions and demonstrate their use with built-in functional tools: map(), filter(), and sorted() with a custom key.',
                  solution: '1. Lambda Function: Anonymous inline function defined using "lambda parameters: expression".\\n2. Examples:\\nnums = [1, 2, 3, 4, 5, 6]\\n# map: square each number\\nsquares = list(map(lambda x: x**2, nums)) # [1, 4, 9, 16, 25, 36]\\n# filter: keep only even numbers\\nevens = list(filter(lambda x: x % 2 == 0, nums)) # [2, 4, 6]\\n# sorted with key: sort tuples by 2nd element\\nstudents = [("Aman", 88), ("Bhavya", 95), ("Chirag", 78)]\\nsorted_students = sorted(students, key=lambda s: s[1], reverse=True)\\n# [("Bhavya", 95), ("Aman", 88), ("Chirag", 78)]',
                  markingScheme: '1 Mark for lambda syntax & concept | 3 Marks for 3 working examples using map, filter, and sorted'
                }
              ]
            },
            {
              qNum: 'Q5 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'What is a Decorator in Python? Explain how higher-order functions and closures enable decorators. Write a custom decorator @execution_timer to measure and print the execution time of any function.',
                  solution: '1. Decorator: A callable design pattern that takes another function as input, extends its behavior without modifying its source code, and returns the modified function.\\n2. Closures: Inner function retains access to enclosing outer function arguments even after outer function exits.\\n3. Timer Decorator Code:\\nimport time\\nfrom functools import wraps\\n\\ndef execution_timer(func):\\n    @wraps(func)\\n    def wrapper(*args, **kwargs):\\n        start = time.perf_counter()\\n        result = func(*args, **kwargs)\\n        elapsed = time.perf_counter() - start\\n        print(f"[BENCHMARK] {func.__name__} executed in {elapsed:.6f} seconds")\\n        return result\\n    return wrapper\\n\\n@execution_timer\\ndef heavy_calculation(n):\\n    return sum(i**2 for i in range(n))\\n\\nheavy_calculation(1000000)',
                  markingScheme: '2 Marks for higher-order functions & closure explanation | 4 Marks for working decorator with wrapper, *args, **kwargs, and return'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain the difference between the "global" keyword and the "nonlocal" keyword with code examples.',
                  solution: '1. global: Binds a variable inside a function directly to the top-level module scope, allowing modification of global state.\\n2. nonlocal: Binds a variable inside an inner nested function to the nearest enclosing (outer) function scope, excluding globals.\\n3. Code:\\nx = "global_x"\\ndef outer():\\n    y = "outer_y"\\n    def inner():\\n        nonlocal y\\n        global x\\n        y = "modified_y"\\n        x = "modified_x"\\n    inner()\\n    print("Inside outer:", y) # Prints modified_y\\nouter()\\nprint("Top level:", x) # Prints modified_x',
                  markingScheme: '2 Marks for conceptual scope distinction | 2 Marks for demonstrative nested code example'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT III',
          syllabusTopic: 'Data Structures & Dictionary Internals',
          questions: [
            {
              qNum: 'Q6',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain the internal implementation of Python Dictionaries (Hash Tables): Hash functions (hash()), hash collisions, bucket arrays, and why dictionary keys must be hashable and immutable.',
                  solution: '1. Hash Table Architecture: Python dictionaries use a combined dense indices array and sparse key-value entries array.\\n2. Hashing Mechanism: When key k is inserted, Python computes hash(k) and maps it to a bucket index: index = hash(k) & (table_size - 1).\\n3. Collision Resolution: If two keys hash to the same bucket index, Python uses Open Addressing with pseudo-random Perturbation probing: probe = (5 * probe + 1 + perturb) & mask.\\n4. Hashability Requirement: A key MUST be hashable: it must implement __hash__() and __eq__(), and its hash value must never change over its lifetime. Mutable objects (like lists, dicts) are unhashable because in-place modification would change their hash, corrupting bucket lookup and rendering the item unlocatable in O(1) time.',
                  markingScheme: '2 Marks for hash() & bucket array mapping | 2 Marks for open addressing collision probing | 2 Marks for immutability hashable justification'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Write a Python program that reads a text string, tokenizes it into words, and counts word frequencies using a dictionary. Display the top 3 most frequent words.',
                  solution: 'import re\\nfrom collections import Counter\\ntext = "Python is powerful and Python is fast. Python programming is fun."\\n# Clean and normalize\\nwords = re.findall(r\'\\b\\w+\\b\', text.lower())\\n# Count frequencies\\ncounts = {}\\nfor w in words:\\n    counts[w] = counts.get(w, 0) + 1\\n# Sort by frequency descending\\nsorted_words = sorted(counts.items(), key=lambda item: item[1], reverse=True)\\nprint("Top 3 Words:")\\nfor word, freq in sorted_words[:3]:\\n    print(f"\'{word}\': {freq} times")\\n# Output: \'python\': 3, \'is\': 3, \'and\': 1',
                  markingScheme: '2 Marks for clean tokenization and dictionary frequency counting | 2 Marks for sorting by value and displaying top 3'
                }
              ]
            },
            {
              qNum: 'Q7 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Compare Lists, Tuples, Sets, and Dictionaries in Python across: Mutability, Ordering, Duplicates Allowed, Indexing Support, and Average Search Complexity. When should a Set be chosen over a List?',
                  solution: '| Feature | List | Tuple | Set | Dictionary |\\n| Mutability | Mutable | Immutable | Mutable | Mutable (keys immutable) |\\n| Ordering | Ordered | Ordered | Unordered | Insertion Ordered (3.7+) |\\n| Duplicates | Allowed | Allowed | Not Allowed (Unique) | Keys Unique, Values Dup |\\n| Indexing | Yes (O(1)) | Yes (O(1)) | No | Key lookup (O(1)) |\\n| Search Cost | O(n) Linear | O(n) Linear | O(1) Constant Hash | O(1) Constant Hash |\\n\\nWhen to choose a Set over a List: When membership testing ("x in collection") or deduplication is frequently performed on large datasets. A list requires O(n) sequential scan, while a set utilizes hash lookups in O(1) average time.',
                  markingScheme: '4 Marks for complete comparison matrix | 2 Marks for O(1) hash search vs O(n) membership justification'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Write a Python generator function fibonacci_gen(limit) that yields Fibonacci numbers up to limit. Explain why generators are more memory-efficient than returning a full list.',
                  solution: 'def fibonacci_gen(limit):\\n    a, b = 0, 1\\n    while a <= limit:\\n        yield a\\n        a, b = b, a + b\\n\\n# Usage:\\nfor num in fibonacci_gen(100):\\n    print(num, end=" ")\\n\\nMemory Efficiency: Traditional list functions allocate physical RAM for the entire sequence at once (O(N) memory). A generator computes values lazily on-demand using "yield", preserving internal state between iterations with strictly O(1) memory overhead.',
                  markingScheme: '2 Marks for generator code with yield | 2 Marks for lazy evaluation and O(1) space efficiency explanation'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT IV',
          syllabusTopic: 'File I/O, Exceptions & OOP',
          questions: [
            {
              qNum: 'Q8',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Design a complete Python Class hierarchy for a Bank Account system: Base class "Account" with attributes account_no, holder_name, balance, and methods deposit(), withdraw(). Derived class "SavingsAccount" that overrides withdraw() to enforce a minimum balance of 1000 and applies interest.',
                  solution: 'class Account:\\n    def __init__(self, acc_no, name, balance=0.0):\\n        self.acc_no = acc_no\\n        self.name = name\\n        self.balance = float(balance)\\n    def deposit(self, amount):\\n        if amount <= 0: raise ValueError("Deposit must be positive")\\n        self.balance += amount\\n        return self.balance\\n    def withdraw(self, amount):\\n        if 0 < amount <= self.balance:\\n            self.balance -= amount\\n            return self.balance\\n        raise ValueError("Insufficient balance")\\n\\nclass SavingsAccount(Account):\\n    MIN_BALANCE = 1000.0\\n    def __init__(self, acc_no, name, balance=1000.0, interest_rate=0.04):\\n        super().__init__(acc_no, name, balance)\\n        self.interest_rate = interest_rate\\n    def withdraw(self, amount):\\n        if self.balance - amount < self.MIN_BALANCE:\\n            raise ValueError(f"Withdrawal denied! Minimum balance of {self.MIN_BALANCE} required.")\\n        return super().withdraw(amount)\\n    def apply_interest(self):\\n        interest = self.balance * self.interest_rate\\n        self.balance += interest\\n        return interest',
                  markingScheme: '3 Marks for Account base class with encapsulation | 3 Marks for SavingsAccount inheritance, super(), and method overriding'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain Exception Handling in Python: try, except, else, and finally blocks. Write code demonstrating a custom user-defined exception "AgeNotValidError".',
                  solution: 'class AgeNotValidError(Exception):\\n    """Raised when age is below 18"""\\n    pass\\n\\ndef verify_voter(age):\\n    try:\\n        if age < 0:\\n            raise ValueError("Age cannot be negative")\\n        elif age < 18:\\n            raise AgeNotValidError("Must be at least 18 years old to vote!")\\n    except (ValueError, AgeNotValidError) as err:\\n        print(f"Verification Failed: {err}")\\n    else:\\n        print("Eligible to vote!")\\n    finally:\\n        print("Voter verification check finished.")\\n\\nverify_voter(16)',
                  markingScheme: '2 Marks for try/except/else/finally roles | 2 Marks for user-defined Exception subclass and raise statement'
                }
              ]
            },
            {
              qNum: 'Q9 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Implement a custom Python class "Vector2D" that overloads: (i) Addition (+ via __add__), (ii) Subtraction (- via __sub__), (iii) String representation (__str__ and __repr__), and (iv) Equality (== via __eq__).',
                  solution: 'class Vector2D:\\n    def __init__(self, x, y):\\n        self.x = float(x)\\n        self.y = float(y)\\n    def __add__(self, other):\\n        if isinstance(other, Vector2D):\\n            return Vector2D(self.x + other.x, self.y + other.y)\\n        return NotImplemented\\n    def __sub__(self, other):\\n        if isinstance(other, Vector2D):\\n            return Vector2D(self.x - other.x, self.y - other.y)\\n        return NotImplemented\\n    def __eq__(self, other):\\n        if isinstance(other, Vector2D):\\n            return self.x == other.x and self.y == other.y\\n        return False\\n    def __str__(self):\\n        return f"({self.x}, {self.y})"\\n    def __repr__(self):\\n        return f"Vector2D({self.x}, {self.y})"\\n\\nv1 = Vector2D(3, 4)\\nv2 = Vector2D(1, 2)\\nprint("v1 + v2 =", v1 + v2) # (4.0, 6.0)\\nprint("v1 == Vector2D(3, 4):", v1 == Vector2D(3, 4)) # True',
                  markingScheme: '1.5 Marks for __init__ & __add__ | 1.5 Marks for __sub__ & __eq__ | 1.5 Marks for __str__ vs __repr__ | 1.5 Marks for clean test execution'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Write a Python program to read a CSV file "students.csv" containing columns [RollNo, Name, Marks] and calculate the average marks. Handle FileNotFoundError and ZeroDivisionError.',
                  solution: 'import csv\\ndef compute_average(filename):\\n    total_marks = 0.0\\n    count = 0\\n    try:\\n        with open(filename, mode=\'r\', newline=\'\') as file:\\n            reader = csv.DictReader(file)\\n            for row in reader:\\n                total_marks += float(row[\'Marks\'])\\n                count += 1\\n            avg = total_marks / count\\n            print(f"Processed {count} students. Average Marks: {avg:.2f}")\\n    except FileNotFoundError:\\n        print(f"Error: \'{filename}\' does not exist.")\\n    except ZeroDivisionError:\\n        print("Error: CSV file contains no student data.")\\n    except KeyError:\\n        print("Error: Missing \'Marks\' column in CSV header.")\\n\\ncompute_average("students.csv")',
                  markingScheme: '2 Marks for csv.DictReader and file iteration | 2 Marks for FileNotFoundError and ZeroDivisionError handling'
                }
              ]
            }
          ]
        }
      ]
    }
  },

  // =========================================================================
  // 7. BCSE-007: Data Structures
  // =========================================================================
  {
    id: 'qp-dsa-007',
    code: 'BCSE-007',
    subject: 'Data Structures',
    semester: 'Semester 2',
    semNumber: 2,
    year: '1st Year',
    course: 'B.Tech (CSE / IT)',
    university: 'Maharishi Markandeshwar (Deemed to be University), Mullana',
    timeAllowed: '3 Hours',
    maxMarks: 60,
    passingMarks: 24,
    probability: '99% High-Yield Match',
    instructions: [
      'Question No. 1 in Section A is COMPULSORY (20 marks).',
      'Attempt any FOUR questions from Section B, selecting ONE question from each Unit (10 marks each).',
      'Show memory representation sketches and step-by-step algorithm traces.'
    ],
    sectionA: {
      title: 'SECTION A (COMPULSORY)',
      marks: 20,
      note: 'Answer ALL ten questions. Each question carries 2 marks.',
      questions: [
        {
          qNum: 'Q1 (a)',
          unit: 'Unit 1',
          marks: 2,
          question: 'Define the three asymptotic notations: Big-O (O), Big-Omega (\\Omega), and Big-Theta (\\Theta).',
          expectedFrequency: 'Every Year (2020-2024)',
          modelAnswer: '1. Big-O (O): Asymptotic upper bound (f(n) \\le c \\cdot g(n) \\; \\forall n \\ge n_0). Represents worst-case running time.\\n2. Big-Omega (\\Omega): Asymptotic lower bound (f(n) \\ge c \\cdot g(n) \\; \\forall n \\ge n_0). Represents best-case running time.\\n3. Big-Theta (\\Theta): Asymptotically tight bound (c_1 g(n) \\le f(n) \\le c_2 g(n) \\; \\forall n \\ge n_0).',
          keyMarkingPoints: ['0.7 Marks each for O (upper), Omega (lower), and Theta (tight bound) definitions']
        },
        {
          qNum: 'Q1 (b)',
          unit: 'Unit 1',
          marks: 2,
          question: 'Write the address calculation formula for element A[i][j] in a 2D array stored in Row-Major Order (RMO).',
          expectedFrequency: 'High Frequency Standard',
          modelAnswer: 'Formula: Loc(A[i][j]) = Base + [(i - LB_r) \\cdot N + (j - LB_c)] \\times c,\\nwhere Base is initial memory address, LB_r and LB_c are lower bounds of rows and columns, N is the total number of columns (UB_c - LB_c + 1), and c is the byte size of each element.',
          keyMarkingPoints: ['1 Mark for exact formula with Base', '1 Mark for defining all variable terms (N, c, LB)']
        },
        {
          qNum: 'Q1 (c)',
          unit: 'Unit 2',
          marks: 2,
          question: 'What is a Stack Underflow and Stack Overflow condition? State the conditions using "top" and "MAX".',
          expectedFrequency: 'Stack Basics Standard',
          modelAnswer: '1. Stack Overflow: Occurs when an attempt is made to push an element into a completely full stack: Condition: top >= MAX - 1.\\n2. Stack Underflow: Occurs when an attempt is made to pop an element from an empty stack: Condition: top == -1.',
          keyMarkingPoints: ['1 Mark for Overflow definition & top >= MAX - 1', '1 Mark for Underflow definition & top == -1']
        },
        {
          qNum: 'Q1 (d)',
          unit: 'Unit 2',
          marks: 2,
          question: 'Evaluate the postfix expression using a stack: 6 5 2 3 + 8 * + 3 + *.',
          expectedFrequency: 'Expression Evaluation Standard',
          modelAnswer: 'Scan from left to right:\\nPush 6, 5, 2, 3\\nOperator +: pop 3, 2 \\implies 2+3=5, push 5 [Stack: 6, 5, 5]\\nPush 8 [Stack: 6, 5, 5, 8]\\nOperator *: pop 8, 5 \\implies 5*8=40, push 40 [Stack: 6, 5, 40]\\nOperator +: pop 40, 5 \\implies 5+40=45, push 45 [Stack: 6, 45]\\nPush 3 [Stack: 6, 45, 3]\\nOperator +: pop 3, 45 \\implies 45+3=48, push 48 [Stack: 6, 48]\\nOperator *: pop 48, 6 \\implies 6*48=288, push 288.\\nFinal Result: 288.',
          keyMarkingPoints: ['1 Mark for stack trace steps', '1 Mark for final value 288']
        },
        {
          qNum: 'Q1 (e)',
          unit: 'Unit 3',
          marks: 2,
          question: 'Why is a Circular Queue preferred over a Linear Queue? State the Full and Empty conditions for a circular queue.',
          expectedFrequency: 'Queue Standard Favorite',
          modelAnswer: 'In a linear queue, when elements are dequeued from the front, those memory slots cannot be reused even if empty slots exist, resulting in false overflow. A circular queue wraps the rear pointer to index 0 via modulo arithmetic.\\nConditions:\\n- Empty: front == -1\\n- Full: (rear + 1) % MAX == front.',
          keyMarkingPoints: ['1 Mark for false overflow memory wastage explanation', '1 Mark for Full and Empty modulo conditions']
        },
        {
          qNum: 'Q1 (f)',
          unit: 'Unit 3',
          marks: 2,
          question: 'Differentiate between a Singly Linked List and a Doubly Linked List in terms of memory overhead and traversal capability.',
          expectedFrequency: 'Linked List Standard',
          modelAnswer: '1. Singly Linked List: Each node contains data and 1 pointer (next). Traversal is strictly unidirectional (forward only). Lower memory overhead (1 pointer per node).\\n2. Doubly Linked List: Each node contains data and 2 pointers (prev and next). Traversal is bidirectional (forward and backward). Higher memory overhead (2 pointers per node).',
          keyMarkingPoints: ['1 Mark for pointer overhead comparison', '1 Mark for bidirectional vs unidirectional traversal']
        },
        {
          qNum: 'Q1 (g)',
          unit: 'Unit 4',
          marks: 2,
          question: 'Define a strictly Binary Tree. If a binary tree has L leaves and I internal nodes, prove that L = I + 1.',
          expectedFrequency: 'Tree Property Proof',
          modelAnswer: 'In any binary tree where every node has either 0 or 2 children (strictly binary tree):\\nLet total nodes be N = L + I. Total directed edges E = N - 1 = L + I - 1.\\nAlso, every internal node contributes 2 edges, and leaves contribute 0: E = 2 \\cdot I.\\nEquating edges: 2I = L + I - 1 \\implies I = L - 1 \\implies L = I + 1. Hence Proved!',
          keyMarkingPoints: ['1 Mark for binary tree definition', '1 Mark for mathematical proof L = I + 1']
        },
        {
          qNum: 'Q1 (h)',
          unit: 'Unit 4',
          marks: 2,
          question: 'What are the three depth-first tree traversal orders: Preorder, Inorder, and Postorder? State their node visit orders.',
          expectedFrequency: 'Tree Traversals Standard',
          modelAnswer: '1. Preorder (NLR): Visit Root Node \\to Traverse Left Subtree \\to Traverse Right Subtree.\\n2. Inorder (LNR): Traverse Left Subtree \\to Visit Root Node \\to Traverse Right Subtree. (Produces sorted order for BST!)\\n3. Postorder (LRN): Traverse Left Subtree \\to Traverse Right Subtree \\to Visit Root Node.',
          keyMarkingPoints: ['0.7 Marks each for NLR, LNR, and LRN definitions']
        },
        {
          qNum: 'Q1 (i)',
          unit: 'Unit 4',
          marks: 2,
          question: 'Differentiate between Adjacency Matrix and Adjacency List graph representations in terms of space complexity.',
          expectedFrequency: 'Graph Basics Question',
          modelAnswer: '1. Adjacency Matrix: 2D array of size V x V. Space complexity is \\Theta(V^2), wasteful for sparse graphs (E \\ll V^2), but offers O(1) edge existence queries.\\n2. Adjacency List: Array of V linked lists storing neighbors. Space complexity is \\Theta(V + E) for directed and \\Theta(V + 2E) for undirected graphs. Highly memory-efficient for sparse graphs.',
          keyMarkingPoints: ['1 Mark for Theta(V^2) matrix space complexity', '1 Mark for Theta(V + E) list space efficiency']
        },
        {
          qNum: 'Q1 (j)',
          unit: 'Unit 4',
          marks: 2,
          question: 'What is the worst-case time complexity of QuickSort? Under what input conditions does it occur?',
          expectedFrequency: 'Sorting Analysis Standard',
          modelAnswer: 'Worst-case time complexity is O(n^2).\\nIt occurs when the chosen pivot consistently divides the array into extremely unbalanced partitions of size 0 and n - 1. This happens in standard QuickSort (first/last element pivot) when the input array is already sorted (ascending or descending) or all elements are identical.',
          keyMarkingPoints: ['1 Mark for O(n^2) worst case', '1 Mark for already sorted input with first/last pivot condition']
        }
      ]
    },
    sectionB: {
      title: 'SECTION B (UNIT-WISE LONG QUESTIONS)',
      marks: 40,
      note: 'Attempt ONE question from EACH Unit. Each question carries 10 marks.',
      units: [
        {
          unitNumber: 'UNIT I',
          syllabusTopic: 'Arrays, Searching & Sorting',
          questions: [
            {
              qNum: 'Q2',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain the QuickSort algorithm with Lomuto or Hoare partitioning. Trace the execution of QuickSort on the array: [38, 27, 43, 3, 9, 82, 10]. Derive its recurrence relation and average time complexity.',
                  solution: '1. Algorithm: Divide-and-conquer sorting. Selects a pivot element x, partitions the array such that all elements < x are placed to its left and all elements > x to its right, and recursively sorts left and right subarrays.\\n2. Trace on [38, 27, 43, 3, 9, 82, 10] with pivot = 10 (last element):\\n- Partitioning: Elements <= 10 are [3, 9, 10]. Greater elements [27, 43, 38, 82].\\n- Subarrays: [3, 9] and [27, 43, 38, 82].\\n- Recursive sorting produces: [3, 9, 10, 27, 38, 43, 82].\\n3. Recurrence Relation for Balanced Partition:\\nT(n) = 2T(n/2) + cn.\\nBy Master Theorem (Case 2: a=2, b=2, k=1, log_2 2 = 1):\\nT(n) = \\Theta(n \\log n).\\nWorst Case: T(n) = T(n-1) + cn \\implies O(n^2).',
                  markingScheme: '2 Marks for algorithm explanation | 2 Marks for step-by-step trace on given array | 2 Marks for recurrence relation derivation'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'An array A[-5 \\dots 10, 2 \\dots 8] of characters is stored in memory in Column-Major Order (CMO). If the base address is 2000 and each character requires 1 byte, find the memory address of element A[3][5].',
                  solution: 'Given: LB_r = -5, UB_r = 10 \\implies Rows M = 10 - (-5) + 1 = 16.\\nLB_c = 2, UB_c = 8 \\implies Columns N = 8 - 2 + 1 = 7.\\nTarget: i = 3, j = 5, Base = 2000, c = 1 byte.\\n1. Column-Major Formula:\\nLoc(A[i][j]) = Base + [(j - LB_c) \\cdot M + (i - LB_r)] \\times c\\n2. Substitute values:\\n= 2000 + [(5 - 2) \\cdot 16 + (3 - (-5))] \\times 1\\n= 2000 + [3 \\times 16 + 8] \\times 1\\n= 2000 + [48 + 8] = 2000 + 56 = 2056.\\nMemory Address of A[3][5] = 2056.',
                  markingScheme: '1.5 Marks for CMO formula and dimension M calculation | 2.5 Marks for step-by-step arithmetic to 2056'
                }
              ]
            },
            {
              qNum: 'Q3 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain the MergeSort algorithm. Write C/pseudo-code for the merge() function. Show the recursive division tree for the array: [12, 11, 13, 5, 6, 7]. Prove that MergeSort has a time complexity of \\Theta(n \\log n) in all cases.',
                  solution: '1. Algorithm: Divide array into two halves at mid = (low + high)/2, recursively sort each half, and merge the sorted halves using a temporary buffer.\\n2. Recursive Tree for [12, 11, 13, 5, 6, 7]:\\nLevel 0: [12, 11, 13] and [5, 6, 7]\\nLevel 1: [12], [11, 13] and [5], [6, 7]\\nLevel 2: [11], [13] and [6], [7]\\nMerge back: [11, 13], [11, 12, 13] and [6, 7], [5, 6, 7]\\nFinal Merge: [5, 6, 7, 11, 12, 13].\\n3. Complexity Analysis: Tree height is strictly \\log_2 n. At each level of the tree, merging requires exactly n operations. Total operations = c \\cdot n \\times \\log_2 n \\implies \\Theta(n \\log n) in Best, Average, and Worst cases.',
                  markingScheme: '2 Marks for merge procedure code | 2 Marks for recursive divide-and-conquer tree | 2 Marks for Theta(n log n) proof'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Compare Linear Search and Binary Search in terms of prerequisites, best-case, worst-case, and space complexity. Write the iterative Binary Search algorithm.',
                  solution: '1. Prerequisites: Linear Search requires no order (works on unsorted data). Binary Search strictly requires a SORTED array.\\n2. Complexities: Linear Search: Best O(1), Worst O(n). Binary Search: Best O(1), Worst O(log n).\\n3. Algorithm:\\nint binarySearch(int arr[], int n, int key) {\\n    int low = 0, high = n - 1;\\n    while (low <= high) {\\n        int mid = low + (high - low) / 2;\\n        if (arr[mid] == key) return mid;\\n        else if (arr[mid] < key) low = mid + 1;\\n        else high = mid - 1;\\n    }\\n    return -1; // Not found\\n}',
                  markingScheme: '2 Marks for comparison matrix across prerequisites & complexities | 2 Marks for clean binary search algorithm'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT II',
          syllabusTopic: 'Stacks & Recursion',
          questions: [
            {
              qNum: 'Q4',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Convert the following Infix expression into Postfix notation using Dijkstra\'s Shunting-Yard (Stack) algorithm. Show the step-by-step tabular trace showing Symbol Scanned, Operator Stack, and Postfix Output: Expression: A + (B * C - (D / E ^ F) * G) * H.',
                  solution: 'Tabular trace:\\n1. A \\implies Stack: [] | Output: A\\n2. + \\implies Stack: [+] | Output: A\\n3. ( \\implies Stack: [+, (] | Output: A\\n4. B \\implies Stack: [+, (] | Output: A B\\n5. * \\implies Stack: [+, (, *] | Output: A B\\n6. C \\implies Stack: [+, (, *] | Output: A B C\\n7. - \\implies Pop *: Stack: [+, (, -] | Output: A B C *\\n8. ( \\implies Stack: [+, (, -, (] | Output: A B C *\\n9. D \\implies Output: A B C * D\\n10. / \\implies Stack: [+, (, -, (, /]\\n11. E \\implies Output: A B C * D E\\n12. ^ \\implies Stack: [+, (, -, (, /, ^]\\n13. F \\implies Output: A B C * D E F\\n14. ) \\implies Pop ^ and /: Stack: [+, (, -] | Output: A B C * D E F ^ /\\n15. * \\implies Stack: [+, (, -, *]\\n16. G \\implies Output: A B C * D E F ^ / G\\n17. ) \\implies Pop * and -: Stack: [+] | Output: A B C * D E F ^ / G * -\\n18. * \\implies Stack: [+, *]\\n19. H \\implies Output: A B C * D E F ^ / G * - H\\n20. End \\implies Pop * and +.\\nFinal Postfix: A B C * D E F ^ / G * - H * +.',
                  markingScheme: '3 Marks for complete 20-step tabular trace | 3 Marks for accurate final postfix expression'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain the Tower of Hanoi problem for N disks. Write the recursive function and derive its recurrence relation T(n) = 2T(n-1) + 1 to show the time complexity is O(2^n).',
                  solution: '1. Problem: Move N disks from Source pole A to Destination pole C using Auxiliary pole B, moving 1 disk at a time and never placing a larger disk on a smaller disk.\\n2. Recursive Algorithm:\\nvoid hanoi(int n, char from, char to, char aux) {\\n    if (n == 1) { printf("Move disk 1 from %c to %c\\n", from, to); return; }\\n    hanoi(n - 1, from, aux, to);\\n    printf("Move disk %d from %c to %c\\n", n, from, to);\\n    hanoi(n - 1, aux, to, from);\\n}\\n3. Recurrence Derivation: T(n) = 2T(n-1) + 1, with T(1) = 1.\\nT(n) = 2[2T(n-2) + 1] + 1 = 4T(n-2) + 2 + 1 = 2^k T(n-k) + \\sum_{i=0}^{k-1} 2^i.\\nFor k = n - 1: T(n) = 2^{n-1}(1) + (2^{n-1} - 1) = 2^n - 1 \\implies \\Theta(2^n).',
                  markingScheme: '1.5 Marks for recursive C function | 2.5 Marks for step-by-step recurrence expansion to 2^n - 1'
                }
              ]
            },
            {
              qNum: 'Q5 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Implement a Stack ADT using a Singly Linked List in C. Write functions for: (i) push(int data), (ii) pop(), and (iii) peek(). Explain why stack overflow does not occur in a linked stack unless heap memory is exhausted.',
                  solution: '#include <stdio.h>\\n#include <stdlib.h>\\nstruct Node {\\n    int data;\\n    struct Node *next;\\n};\\nstruct Node *top = NULL;\\nvoid push(int val) {\\n    struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));\\n    if (!newNode) { printf("Heap Full!\\n"); return; }\\n    newNode->data = val;\\n    newNode->next = top;\\n    top = newNode;\\n}\\nint pop() {\\n    if (!top) { printf("Stack Underflow!\\n"); return -1; }\\n    struct Node *temp = top;\\n    int popped = temp->data;\\n    top = top->next;\\n    free(temp);\\n    return popped;\\n}\\nint peek() {\\n    return top ? top->data : -1;\\n}\\nExplanation: A linked stack dynamically allocates memory nodes in the heap one at a time on demand. Unlike fixed array stacks, it has no hardcoded capacity bound MAX.',
                  markingScheme: '3 Marks for clean C implementation of push, pop, peek | 1.5 Marks for underflow NULL check | 1.5 Marks for dynamic heap vs fixed array explanation'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain how function calls and recursion are managed in operating systems using the Call Stack (Activation Records / Stack Frames).',
                  solution: '1. Call Stack: A LIFO data structure maintained in process memory to manage nested function execution.\\n2. Activation Record (Stack Frame): When a function is called, a frame is pushed onto the stack containing:\\n- Return address (instruction pointer where caller resumes).\\n- Input arguments / parameters.\\n- Local variables allocated within the function.\\n- Saved CPU register state.\\n3. Pop & Return: When function terminates, its frame is popped, restoring caller registers and returning execution to the return address. In recursion, each recursive invocation pushes a distinct new frame until the base case is reached, after which frames unwind.',
                  markingScheme: '2 Marks for Activation Record contents | 2 Marks for push/pop call sequence and recursive unwinding'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT III',
          syllabusTopic: 'Queues & Linked Lists',
          questions: [
            {
              qNum: 'Q6',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Write a C program to implement a Circular Queue of size N using an array. Include functions for: (i) enqueue(x), (ii) dequeue(), and (iii) display(). Trace the status of front and rear pointers when inserting 4 elements and deleting 2 elements.',
                  solution: '#include <stdio.h>\\n#define MAX 5\\nint cq[MAX], front = -1, rear = -1;\\nvoid enqueue(int val) {\\n    if ((rear + 1) % MAX == front) { printf("Queue Full!\\n"); return; }\\n    if (front == -1) front = 0;\\n    rear = (rear + 1) % MAX;\\n    cq[rear] = val;\\n}\\nint dequeue() {\\n    if (front == -1) { printf("Queue Empty!\\n"); return -1; }\\n    int val = cq[front];\\n    if (front == rear) { front = -1; rear = -1; }\\n    else front = (front + 1) % MAX;\\n    return val;\\n}\\nvoid display() {\\n    if (front == -1) return;\\n    int i = front;\\n    while (1) {\\n        printf("%d ", cq[i]);\\n        if (i == rear) break;\\n        i = (i + 1) % MAX;\\n    }\\n    printf("\\n");\\n}\\nTrace: Initial: f=-1, r=-1. Insert 10, 20, 30, 40: f=0, r=3. Delete 2 elements (10, 20): f=2, r=3. Queue holds: [30, 40].',
                  markingScheme: '3 Marks for clean C implementation with modulo arithmetic | 1.5 Marks for front/rear reset when empty | 1.5 Marks for trace table'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Write a C function to reverse a Singly Linked List iteratively by manipulating pointers. State its time and space complexity.',
                  solution: 'struct Node* reverseList(struct Node* head) {\\n    struct Node *prev = NULL, *curr = head, *next = NULL;\\n    while (curr != NULL) {\\n        next = curr->next; // Save next node\\n        curr->next = prev; // Reverse pointer\\n        prev = curr;       // Advance prev\\n        curr = next;       // Advance curr\\n    }\\n    return prev; // New head\\n}\\nTime Complexity: O(n) (single pass through n nodes).\\nSpace Complexity: O(1) (in-place pointer reversal without extra memory allocation).',
                  markingScheme: '2.5 Marks for 3-pointer reversal logic (prev, curr, next) | 1.5 Marks for O(n) time and O(1) space complexity'
                }
              ]
            },
            {
              qNum: 'Q7 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain Doubly Linked Lists. Write C functions to: (i) Insert a node at a given position k, and (ii) Delete a node with a given key value. Explain pointer rewiring with diagrams.',
                  solution: '1. Node Structure: struct Node { int data; struct Node *prev, *next; };\\n2. Insert at position k:\\nstruct Node* insertAt(struct Node* head, int k, int val) {\\n    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\\n    newNode->data = val;\\n    if (k == 1) {\\n        newNode->next = head; newNode->prev = NULL;\\n        if (head) head->prev = newNode;\\n        return newNode;\\n    }\\n    struct Node* temp = head;\\n    for (int i=1; i<k-1 && temp; i++) temp = temp->next;\\n    newNode->next = temp->next;\\n    newNode->prev = temp;\\n    if (temp->next) temp->next->prev = newNode;\\n    temp->next = newNode;\\n    return head;\\n}\\n3. Delete by key:\\nvoid deleteNode(struct Node** head_ref, struct Node* del) {\\n    if (*head_ref == NULL || del == NULL) return;\\n    if (*head_ref == del) *head_ref = del->next;\\n    if (del->next != NULL) del->next->prev = del->prev;\\n    if (del->prev != NULL) del->prev->next = del->next;\\n    free(del);\\n}',
                  markingScheme: '3 Marks for insert function with boundary checks | 3 Marks for delete function with both prev and next pointer rewiring'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'What is a Double-Ended Queue (Deque)? Differentiate between an Input-Restricted Deque and an Output-Restricted Deque.',
                  solution: '1. Deque: A linear sequence that allows insertion and deletion operations at both ends (Front and Rear).\\n2. Input-Restricted Deque: Insertion is permitted at only ONE end (e.g. Rear only), while deletion is permitted at BOTH ends (Front and Rear).\\n3. Output-Restricted Deque: Deletion is permitted at only ONE end (e.g. Front only), while insertion is permitted at BOTH ends (Front and Rear).\\nUsed in undo-redo buffers, web browser page caches, and job stealing algorithms.',
                  markingScheme: '2 Marks for Deque definition & operations | 2 Marks for Input vs Output restricted distinction with application examples'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT IV',
          syllabusTopic: 'Trees, BST & Graph Algorithms',
          questions: [
            {
              qNum: 'Q8',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Define a Binary Search Tree (BST). Explain the three cases of node deletion in a BST: (i) Node with 0 children (leaf), (ii) Node with 1 child, and (iii) Node with 2 children (Inorder Successor/Predecessor replacement). Illustrate with sketches.',
                  solution: '1. BST Property: For every node X, all values in its left subtree are strictly < X.val, and all values in its right subtree are strictly > X.val.\\n2. Deletion Cases:\\n- Case 1 (Leaf Node, 0 children): Simply disconnect parent pointer and free memory. (e.g. delete 20 \\implies parent->left = NULL).\\n- Case 2 (Single Child): Bypass the node by linking its parent directly to its sole child, then free node.\\n- Case 3 (Two Children): The node cannot be directly removed without breaking tree connectivity. Find its Inorder Successor (minimum value node in its right subtree) or Inorder Predecessor (maximum in left subtree). Copy the successor value into the target node, then recursively delete the successor node (which is guaranteed to have at most 1 child!).',
                  markingScheme: '2 Marks for BST definition | 4 Marks for illustrating all 3 deletion cases with Inorder Successor replacement'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Execute Breadth-First Search (BFS) and Depth-First Search (DFS) on a directed graph with vertices {A, B, C, D, E} and edges { (A, B), (A, C), (B, D), (C, D), (D, E), (C, E) } starting from vertex A. Write the resulting traversal sequences.',
                  solution: '1. Graph adjacency list:\\nA \\to [B, C]\\nB \\to [D]\\nC \\to [D, E]\\nD \\to [E]\\nE \\to []\\n2. Breadth-First Search (Queue):\\nStart A: Enqueue A. Visited = {A}.\\nDequeue A: Enqueue neighbors B, C. Queue: [B, C].\\nDequeue B: Enqueue neighbor D. Queue: [C, D].\\nDequeue C: D is already visited, enqueue E. Queue: [D, E].\\nDequeue D: E is already visited. Queue: [E].\\nDequeue E. Done.\\nBFS Traversal Order: A -> B -> C -> D -> E.\\n3. Depth-First Search (Stack / Recursion):\\nStart A \\to visit B \\to visit D \\to visit E (dead end, backtrack to D, B, A) \\to visit C.\\nDFS Traversal Order: A -> B -> D -> E -> C (or A -> C -> D -> E -> B depending on neighbor iteration order).',
                  markingScheme: '2 Marks for BFS queue trace and traversal sequence | 2 Marks for DFS traversal sequence with backtrack tracing'
                }
              ]
            },
            {
              qNum: 'Q9 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Construct a Binary Tree from the given traversal sequences: Inorder: D B E A F C G, Preorder: A B D E C F G. State the step-by-step procedure and verify by writing the Postorder traversal.',
                  solution: '1. Procedure:\\n- Preorder first element is Root = A.\\n- Locate A in Inorder: [D B E] are in Left Subtree, [F C G] are in Right Subtree.\\n- Left Subtree Preorder: [B D E]. Next root is B.\\n- In Inorder around B: D is left child, E is right child.\\n- Right Subtree Preorder: [C F G]. Next root is C.\\n- In Inorder around C: F is left child, G is right child.\\n2. Reconstructed Binary Tree:\\n        A\\n       / \\\\\\n      B   C\\n     / \\\\ / \\\\\\n    D  E F  G\\n3. Postorder Verification (LRN):\\nLeft of A: D \\to E \\to B.\\nRight of A: F \\to G \\to C.\\nRoot: A.\\nPostorder Traversal: D E B F G C A.',
                }
              ]
            }
          ]
        }
      ]
    }
  },

  // =========================================================================
  // 8. BMAT-002: Mathematics II
  // =========================================================================
  {
    id: 'qp-math2-002',
    code: 'BMAT-002',
    subject: 'Mathematics II',
    semester: 'Semester 2',
    semNumber: 2,
    year: '1st Year',
    course: 'B.Tech (All Branches)',
    university: 'Maharishi Markandeshwar (Deemed to be University), Mullana',
    timeAllowed: '3 Hours',
    maxMarks: 60,
    passingMarks: 24,
    probability: '97% High-Yield Match',
    instructions: [
      'Question No. 1 in Section A is COMPULSORY (20 marks).',
      'Attempt any FOUR questions from Section B, selecting ONE question from each Unit (10 marks each).',
      'Use of non-programmable scientific calculators is permitted.'
    ],
    sectionA: {
      title: 'SECTION A (COMPULSORY)',
      marks: 20,
      note: 'Answer ALL ten questions. Each question carries 2 marks.',
      questions: [
        {
          qNum: 'Q1 (a)',
          unit: 'Unit 1',
          marks: 2,
          question: 'Find the Complementary Function (C.F.) of the differential equation: (D^2 - 4D + 4)y = e^{2x}.',
          expectedFrequency: 'ODE Standard',
          modelAnswer: 'Auxiliary equation: m^2 - 4m + 4 = 0 \\implies (m - 2)^2 = 0 \\implies m = 2, 2 (real and repeated roots).\\nComplementary Function: y_{cf} = (C_1 + C_2 x) e^{2x}.',
          keyMarkingPoints: ['1 Mark for repeated roots m = 2, 2', '1 Mark for y_cf = (C_1 + C_2 x) e^{2x}']
        },
        {
          qNum: 'Q1 (b)',
          unit: 'Unit 1',
          marks: 2,
          question: 'Write the transformation used to convert a Cauchy-Euler homogeneous differential equation into a linear ODE with constant coefficients.',
          expectedFrequency: 'Cauchy-Euler Standard',
          modelAnswer: 'Transformation: Substitute x = e^z or z = \\ln x. Then:\\nx \\frac{dy}{dx} = Dy, \\quad x^2 \\frac{d^2y}{dx^2} = D(D - 1)y, \\quad \\text{where } D = \\frac{d}{dz}.',
          keyMarkingPoints: ['1 Mark for substitution x = e^z', '1 Mark for x^2 d^2y/dx^2 = D(D-1)y']
        },
        {
          qNum: 'Q1 (c)',
          unit: 'Unit 2',
          marks: 2,
          question: 'Find the Laplace Transform of: f(t) = e^{-3t} \\sin(4t).',
          expectedFrequency: 'First Shifting Theorem',
          modelAnswer: 'Using First Shifting Theorem: \\mathcal{L}\\{e^{at} f(t)\\} = F(s - a).\\nSince \\mathcal{L}\\{\\sin(4t)\\} = \\frac{4}{s^2 + 16}, replace s with s - (-3) = s + 3:\\n\\mathcal{L}\\{e^{-3t} \\sin(4t)\\} = \\frac{4}{(s + 3)^2 + 16} = \\frac{4}{s^2 + 6s + 25}.',
          keyMarkingPoints: ['1 Mark for stating First Shifting Theorem', '1 Mark for exact rational fraction 4 / (s^2 + 6s + 25)']
        },
        {
          qNum: 'Q1 (d)',
          unit: 'Unit 2',
          marks: 2,
          question: 'State the Convolution Theorem for Inverse Laplace Transforms.',
          expectedFrequency: 'High Frequency Question',
          modelAnswer: 'If \\mathcal{L}^{-1}\\{F(s)\\} = f(t) and \\mathcal{L}^{-1}\\{G(s)\\} = g(t), then:\\n\\mathcal{L}^{-1}\\{F(s) \\cdot G(s)\\} = f(t) * g(t) = \\int_0^t f(u) g(t - u) \\, du.',
          keyMarkingPoints: ['1 Mark for convolution definition', '1 Mark for definite integral formula 0 to t']
        },
        {
          qNum: 'Q1 (e)',
          unit: 'Unit 3',
          marks: 2,
          question: 'State Green\'s Theorem in a plane relating a line integral around a closed curve C to a double integral over region R.',
          expectedFrequency: 'Every Year (2020-2024)',
          modelAnswer: 'Let C be a positively oriented, piecewise smooth, simple closed curve in a plane bounding a region R. If M(x, y) and N(x, y) have continuous partial derivatives in R, then:\\n\\oint_C (M \\, dx + N \\, dy) = \\iint_R \\left( \\frac{\\partial N}{\\partial x} - \\frac{\\partial M}{\\partial y} \\right) dx \\, dy.',
          keyMarkingPoints: ['1 Mark for line integral to double integral relation', '1 Mark for integrand (dN/dx - dM/dy)']
        },
        {
          qNum: 'Q1 (f)',
          unit: 'Unit 3',
          marks: 2,
          question: 'State Gauss\'s Divergence Theorem relating surface integral to volume integral.',
          expectedFrequency: 'Vector Calculus Standard',
          modelAnswer: 'The outward flux of a continuously differentiable vector field \\vec{F} over a closed surface S bounding a volume V equals the volume integral of the divergence of \\vec{F} throughout V:\\n\\iint_S \\vec{F} \\cdot \\hat{n} \\, dS = \\iiint_V (\\nabla \\cdot \\vec{F}) \\, dV.',
          keyMarkingPoints: ['1 Mark for statement and outward unit normal n', '1 Mark for integral equality equation']
        },
        {
          qNum: 'Q1 (g)',
          unit: 'Unit 3',
          marks: 2,
          question: 'State Stokes\' Theorem relating line integral to surface integral of curl.',
          expectedFrequency: 'Vector Theorems Standard',
          modelAnswer: 'The circulation of a vector field \\vec{F} around a closed boundary curve C equals the surface integral of the curl of \\vec{F} over any open surface S bounded by C:\\n\\oint_C \\vec{F} \\cdot d\\vec{r} = \\iint_S (\\nabla \\times \\vec{F}) \\cdot \\hat{n} \\, dS.',
          keyMarkingPoints: ['1 Mark for boundary curve to open surface condition', '1 Mark for exact curl integral equation']
        },
        {
          qNum: 'Q1 (h)',
          unit: 'Unit 4',
          marks: 2,
          question: 'Write the Cauchy-Riemann (C-R) Equations in Cartesian coordinates for an analytic function f(z) = u(x, y) + i v(x, y).',
          expectedFrequency: 'Every Year (2020-2024)',
          modelAnswer: 'For f(z) = u + i v to be analytic at z = x + i y, its real and imaginary parts must satisfy the Cauchy-Riemann equations:\\n\\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y} \\quad \\text{and} \\quad \\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x}.',
          keyMarkingPoints: ['1 Mark for u_x = v_y', '1 Mark for u_y = -v_x']
        },
        {
          qNum: 'Q1 (i)',
          unit: 'Unit 4',
          marks: 2,
          question: 'Define a Harmonic function. If u(x, y) is harmonic, what partial differential equation must it satisfy?',
          expectedFrequency: 'Complex Analysis Standard',
          modelAnswer: 'A real-valued function \\phi(x, y) having continuous second-order partial derivatives is called Harmonic if it satisfies Laplace\'s Equation in two dimensions:\\n\\nabla^2 \\phi = \\frac{\\partial^2 \\phi}{\\partial x^2} + \\frac{\\partial^2 \\phi}{\\partial y^2} = 0.',
          keyMarkingPoints: ['1 Mark for continuous second derivatives definition', '1 Mark for Laplace equation nabla^2 u = 0']
        },
        {
          qNum: 'Q1 (j)',
          unit: 'Unit 4',
          marks: 2,
          question: 'State Cauchy\'s Residue Theorem for a closed contour C enclosing isolated singular points z_1, z_2, \\dots, z_k.',
          expectedFrequency: 'Residue Calculus Standard',
          modelAnswer: 'If f(z) is analytic inside and on a simple closed contour C except at a finite number of isolated singularities z_1, z_2, \\dots, z_k within C, then:\\n\\oint_C f(z) \\, dz = 2\\pi i \\sum_{j=1}^k \\text{Res}(f, z_j).',
          keyMarkingPoints: ['1 Mark for 2 pi i multiplication factor', '1 Mark for sum of residues at internal singular points']
        }
      ]
    },
    sectionB: {
      title: 'SECTION B (UNIT-WISE LONG QUESTIONS)',
      marks: 40,
      note: 'Attempt ONE question from EACH Unit. Each question carries 10 marks.',
      units: [
        {
          unitNumber: 'UNIT I',
          syllabusTopic: 'Higher-Order ODEs & Variation of Parameters',
          questions: [
            {
              qNum: 'Q2',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Solve the differential equation by the Method of Variation of Parameters: \\frac{d^2y}{dx^2} + y = \\sec x.',
                  solution: '1. Complementary Function: m^2 + 1 = 0 \\implies m = \\pm i.\\ny_{cf} = C_1 \\cos x + C_2 \\sin x. Here y_1 = \\cos x, y_2 = \\sin x.\\n2. Wronskian W(y_1, y_2):\\nW = \\begin{vmatrix} \\cos x & \\sin x \\\\ -\\sin x & \\cos x \\end{vmatrix} = \\cos^2 x + \\sin^2 x = 1 \\ne 0.\\n3. Particular Integral y_p = u(x) y_1 + v(x) y_2:\\nu(x) = -\\int \\frac{y_2 X}{W} dx = -\\int \\frac{\\sin x \\sec x}{1} dx = -\\int \\tan x dx = -\\ln|\\sec x| = \\ln|\\cos x|.\\nv(x) = \\int \\frac{y_1 X}{W} dx = \\int \\frac{\\cos x \\sec x}{1} dx = \\int 1 dx = x.\\n4. Complete Particular Integral: y_p = \\cos x \\ln|\\cos x| + x \\sin x.\\n5. General Solution: y = y_{cf} + y_p = C_1 \\cos x + C_2 \\sin x + \\cos x \\ln|\\cos x| + x \\sin x.',
                  markingScheme: '2 Marks for C.F. and Wronskian W=1 | 2 Marks for u(x) and v(x) integrations | 2 Marks for final general solution'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Solve the Cauchy-Euler differential equation: x^2 \\frac{d^2y}{dx^2} - 2x \\frac{dy}{dx} - 4y = x^2.',
                  solution: '1. Substitute x = e^z, z = \\ln x, x \\frac{dy}{dx} = Dy, x^2 \\frac{d^2y}{dx^2} = D(D-1)y where D = d/dz:\\n[D(D - 1) - 2D - 4]y = (e^z)^2 = e^{2z} \\implies (D^2 - 3D - 4)y = e^{2z}.\\n2. Auxiliary Equation: m^2 - 3m - 4 = 0 \\implies (m - 4)(m + 1) = 0 \\implies m = 4, -1.\\nC.F. = C_1 e^{4z} + C_2 e^{-z} = C_1 x^4 + C_2 x^{-1}.\\n3. Particular Integral: P.I. = \\frac{1}{D^2 - 3D - 4} e^{2z}. Substitute D = 2:\\nP.I. = \\frac{1}{2^2 - 3(2) - 4} e^{2z} = \\frac{1}{4 - 6 - 4} e^{2z} = -\\frac{1}{6} e^{2z} = -\\frac{1}{6} x^2.\\n4. General Solution: y = C_1 x^4 + \\frac{C_2}{x} - \\frac{1}{6} x^2.',
                  markingScheme: '1.5 Marks for transforming to constant coefficient ODE | 1.5 Marks for C.F. in terms of x | 1 Mark for P.I. = -x^2/6'
                }
              ]
            },
            {
              qNum: 'Q3 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Solve the differential equation: (D^2 - 2D + 1)y = x^2 e^{3x}.',
                  solution: '1. Auxiliary equation: m^2 - 2m + 1 = 0 \\implies (m - 1)^2 = 0 \\implies m = 1, 1.\\nC.F. = (C_1 + C_2 x) e^x.\\n2. Particular Integral: P.I. = \\frac{1}{(D - 1)^2} [e^{3x} x^2] = e^{3x} \\frac{1}{(D + 3 - 1)^2} x^2 = e^{3x} \\frac{1}{(D + 2)^2} x^2.\\n= e^{3x} \\frac{1}{4(1 + D/2)^2} x^2 = \\frac{e^{3x}}{4} \\left(1 + \\frac{D}{2}\\right)^{-2} x^2\\n= \\frac{e^{3x}}{4} \\left(1 - D + \\frac{3}{4} D^2 - \\dots\\right) x^2\\n= \\frac{e^{3x}}{4} \\left(x^2 - 2x + \\frac{3}{4}(2)\\right) = \\frac{e^{3x}}{4} \\left(x^2 - 2x + \\frac{3}{2}\\right) = \\frac{e^{3x}}{8}(2x^2 - 4x + 3).\\n3. General Solution: y = (C_1 + C_2 x) e^x + \\frac{e^{3x}}{8}(2x^2 - 4x + 3).',
                  markingScheme: '2 Marks for C.F. | 3 Marks for exponential shifting and binomial expansion for P.I. | 1 Mark for final solution'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Solve the simultaneous differential equations: \\frac{dx}{dt} + y = 0, \\; \\frac{dy}{dt} - x = 0 subject to x(0) = 1, y(0) = 0.',
                  solution: '1. Differentiate first equation w.r.t t: \\frac{d^2x}{dt^2} + \\frac{dy}{dt} = 0.\\nFrom second equation, substitute \\frac{dy}{dt} = x:\\n\\frac{d^2x}{dt^2} + x = 0 \\implies (D^2 + 1)x = 0.\\n2. Auxiliary equation: m^2 + 1 = 0 \\implies m = \\pm i \\implies x(t) = C_1 \\cos t + C_2 \\sin t.\\n3. From first equation: y = -\\frac{dx}{dt} = -[-C_1 \\sin t + C_2 \\cos t] = C_1 \\sin t - C_2 \\cos t.\\n4. Apply initial conditions:\\nx(0) = C_1 (1) + 0 = 1 \\implies C_1 = 1.\\ny(0) = 0 - C_2 = 0 \\implies C_2 = 0.\\nFinal Solution: x(t) = \\cos t, \\quad y(t) = \\sin t.',
                  markingScheme: '2 Marks for eliminating y to obtain d^2x/dt^2 + x = 0 | 2 Marks for applying initial conditions to find x=cos t, y=sin t'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT II',
          syllabusTopic: 'Laplace Transforms & Applications',
          questions: [
            {
              qNum: 'Q4',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Using Laplace Transforms, solve the initial value differential equation: \\frac{d^2y}{dt^2} + 4y = 8t, given y(0) = 0, y\'(0) = 3.',
                  solution: '1. Take Laplace Transform of both sides:\\n\\mathcal{L}\\{y\'\'\\} + 4\\mathcal{L}\\{y\\} = 8\\mathcal{L}\\{t\\}.\\n[s^2 Y(s) - s y(0) - y\'(0)] + 4 Y(s) = \\frac{8}{s^2}.\\n2. Substitute y(0) = 0, y\'(0) = 3:\\n[s^2 Y(s) - 3] + 4 Y(s) = \\frac{8}{s^2} \\implies (s^2 + 4) Y(s) = 3 + \\frac{8}{s^2} = \\frac{3s^2 + 8}{s^2}.\\n\\implies Y(s) = \\frac{3s^2 + 8}{s^2(s^2 + 4)}.\\n3. Partial Fraction Decomposition:\\n\\frac{3s^2 + 8}{s^2(s^2 + 4)} = \\frac{A}{s^2} + \\frac{B}{s^2 + 4} \\implies A(s^2 + 4) + B s^2 = 3s^2 + 8.\\nFor s^2 = 0: 4A = 8 \\implies A = 2.\\nFor s^2 = -4: -4B = 3(-4) + 8 = -4 \\implies B = 1.\\n\\implies Y(s) = \\frac{2}{s^2} + \\frac{1}{s^2 + 4}.\\n4. Take Inverse Laplace Transform:\\ny(t) = 2 \\mathcal{L}^{-1}\\left\\{\\frac{1}{s^2}\\right\\} + \\frac{1}{2} \\mathcal{L}^{-1}\\left\\{\\frac{2}{s^2 + 2^2}\\right\\} = 2t + \\frac{1}{2} \\sin(2t).',
                  markingScheme: '2 Marks for applying Laplace with initial conditions | 2 Marks for partial fractions A=2, B=1 | 2 Marks for inverse Laplace y(t) = 2t + 0.5 sin(2t)'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Find the Inverse Laplace Transform using Convolution Theorem: \\mathcal{L}^{-1}\\left\\{ \\frac{1}{(s + 1)(s + 2)} \\right\\}.',
                  solution: '1. Let F(s) = \\frac{1}{s + 1} \\implies f(t) = e^{-t}.\\nLet G(s) = \\frac{1}{s + 2} \\implies g(t) = e^{-2t}.\\n2. By Convolution Theorem:\\n\\mathcal{L}^{-1}\\{F(s) G(s)\\} = \\int_0^t f(u) g(t - u) \\, du = \\int_0^t e^{-u} e^{-2(t - u)} \\, du\\n= e^{-2t} \\int_0^t e^{-u} e^{2u} \\, du = e^{-2t} \\int_0^t e^u \\, du\\n= e^{-2t} [e^t - 1] = e^{-t} - e^{-2t}.',
                  markingScheme: '1.5 Marks for identifying f(t)=e^-t and g(t)=e^-2t | 2.5 Marks for definite integral integration to e^-t - e^-2t'
                }
              ]
            },
            {
              qNum: 'Q5 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'State and prove the Second Shifting Theorem (Heaviside Unit Step Function theorem) of Laplace Transforms. Find the Laplace transform of the piecewise function: f(t) = \\begin{cases} 0, & 0 < t < 2 \\\\ (t - 2)^2, & t > 2 \\end{cases}.',
                  solution: '1. Theorem Statement: If \\mathcal{L}\\{f(t)\\} = F(s), and u(t - a) is the Heaviside unit step function (u=0 for t < a, u=1 for t > a), then:\\n\\mathcal{L}\\{f(t - a) u(t - a)\\} = e^{-as} F(s).\\n2. Proof:\\n\\mathcal{L}\\{f(t - a) u(t - a)\\} = \\int_0^\\infty e^{-st} f(t - a) u(t - a) dt = \\int_a^\\infty e^{-st} f(t - a) dt.\\nSubstitute v = t - a \\implies t = v + a, dt = dv:\\n= \\int_0^\\infty e^{-s(v + a)} f(v) dv = e^{-as} \\int_0^\\infty e^{-sv} f(v) dv = e^{-as} F(s).\\n3. Evaluation for f(t): f(t) can be written as (t - 2)^2 u(t - 2).\\nHere a = 2, and base function is g(t) = t^2 \\implies G(s) = \\mathcal{L}\\{t^2\\} = \\frac{2!}{s^3} = \\frac{2}{s^3}.\\nBy 2nd Shifting Theorem: \\mathcal{L}\\{f(t)\\} = e^{-2s} G(s) = \\frac{2 e^{-2s}}{s^3}.',
                  markingScheme: '3 Marks for statement and substitution proof | 3 Marks for identifying g(t)=t^2 and evaluating 2e^-2s / s^3'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Evaluate the integral using Laplace transform: \\int_0^\\infty e^{-2t} \\frac{\\sin t}{t} \\, dt.',
                  solution: '1. Let f(t) = \\sin t \\implies \\mathcal{L}\\{\\sin t\\} = F(s) = \\frac{1}{s^2 + 1}.\\n2. Property of division by t: \\mathcal{L}\\left\\{\\frac{\\sin t}{t}\\right\\} = \\int_s^\\infty F(u) du = \\int_s^\\infty \\frac{1}{u^2 + 1} du = [\\tan^{-1} u]_s^\\infty = \\frac{\\pi}{2} - \\tan^{-1} s = \\cot^{-1} s.\\n3. By definition of Laplace Transform: \\int_0^\\infty e^{-st} \\left(\\frac{\\sin t}{t}\\right) dt = \\cot^{-1} s.\\n4. Put s = 2:\\n\\int_0^\\infty e^{-2t} \\frac{\\sin t}{t} dt = \\cot^{-1}(2) = \\tan^{-1}(1/2) \\approx 0.4636 \\text{ radians}.',
                  markingScheme: '2 Marks for division by t integral rule cot^-1(s) | 2 Marks for substituting s=2 to obtain cot^-1(2)'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT III',
          syllabusTopic: 'Vector Calculus & Integral Theorems',
          questions: [
            {
              qNum: 'Q6',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Verify Gauss\'s Divergence Theorem for \\vec{F} = 4x \\hat{i} - 2y^2 \\hat{j} + z^2 \\hat{k} over the cylindrical region bounded by x^2 + y^2 = 4, z = 0, and z = 3.',
                  solution: '1. Volume Integral \\iiint_V (\\nabla \\cdot \\vec{F}) dV:\\n\\nabla \\cdot \\vec{F} = \\frac{\\partial}{\\partial x}(4x) + \\frac{\\partial}{\\partial y}(-2y^2) + \\frac{\\partial}{\\partial z}(z^2) = 4 - 4y + 2z.\\nIn cylindrical coordinates: x = r \\cos \\theta, y = r \\sin \\theta, z = z, dV = r \\, dr \\, d\\theta \\, dz.\\nLimits: r \\in [0, 2], \\theta \\in [0, 2\\pi], z \\in [0, 3].\\n\\iiint_V (4 - 4r \\sin \\theta + 2z) r \\, dr \\, d\\theta \\, dz:\\nNotice \\int_0^{2\\pi} \\sin \\theta \\, d\\theta = 0, so the middle term drops out!\\n= \\int_0^{2\\pi} d\\theta \\int_0^2 r \\, dr \\int_0^3 (4 + 2z) dz = (2\\pi) \\left[\\frac{r^2}{2}\\right]_0^2 [4z + z^2]_0^3 = (2\\pi)(2)[12 + 9] = 4\\pi(21) = 84\\pi.\\n2. Surface Integral \\iint_S \\vec{F} \\cdot \\hat{n} dS over 3 faces:\\n- Top S_1 (z=3, \\hat{n}=\\hat{k}): \\vec{F} \\cdot \\hat{k} = z^2 = 9. \\iint 9 dS = 9 \\times (\\pi r^2) = 9 \\times 4\\pi = 36\\pi.\\n- Bottom S_2 (z=0, \\hat{n}=-\\hat{k}): \\vec{F} \\cdot (-\\hat{k}) = -z^2 = 0.\\n- Curved surface S_3 (x^2+y^2=4, r=2, \\hat{n}=\\frac{x\\hat{i}+y\\hat{j}}{2}): \\vec{F} \\cdot \\hat{n} = 2x^2 - y^3.\\nIntegrating around cylinder: \\int_0^3 dz \\int_0^{2\\pi} [2(4\\cos^2\\theta) - 8\\sin^3\\theta] (2 d\\theta) = 3 \\times 2 \\times 8 \\int_0^{2\\pi} \\cos^2\\theta d\\theta = 48 (\\pi) = 48\\pi.\\nTotal Flux = 36\\pi + 0 + 48\\pi = 84\\pi. Verified!',
                  markingScheme: '3 Marks for volume integral evaluation (84 pi) | 3 Marks for surface integral over top, bottom, and curved faces (84 pi)'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Evaluate by Green\'s Theorem: \\oint_C [(x y + y^2) dx + x^2 dy], where C is the closed curve bounded by y = x and y = x^2.',
                  solution: '1. By Green\'s Theorem: \\oint_C (M dx + N dy) = \\iint_R \\left(\\frac{\\partial N}{\\partial x} - \\frac{\\partial M}{\\partial y}\\right) dx dy.\\nHere M = xy + y^2 \\implies \\frac{\\partial M}{\\partial y} = x + 2y.\\nN = x^2 \\implies \\frac{\\partial N}{\\partial x} = 2x.\\n\\frac{\\partial N}{\\partial x} - \\frac{\\partial M}{\\partial y} = 2x - (x + 2y) = x - 2y.\\n2. Region R limits: Intersection of y = x and y = x^2 \\implies x^2 = x \\implies x = 0, 1.\\nFor given x: y ranges from x^2 to x.\\n\\int_0^1 dx \\int_{x^2}^x (x - 2y) dy = \\int_0^1 \\left[ xy - y^2 \\right]_{x^2}^x dx\\n= \\int_0^1 [(x^2 - x^2) - (x^3 - x^4)] dx = \\int_0^1 (-x^3 + x^4) dx = \\left[ -\\frac{x^4}{4} + \\frac{x^5}{5} \\right]_0^1 = -\\frac{1}{4} + \\frac{1}{5} = -\\frac{1}{20}.',
                  markingScheme: '1.5 Marks for Green\'s theorem integrand (x - 2y) | 2.5 Marks for set up of limits and double integral result -1/20'
                }
              ]
            },
            {
              qNum: 'Q7 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Verify Stokes\' Theorem for \\vec{F} = (2x - y)\\hat{i} - y z^2 \\hat{j} - y^2 z \\hat{k} over the upper half of the sphere x^2 + y^2 + z^2 = 1, z \\ge 0 bounded by the circle C in the xy-plane.',
                  solution: '1. Boundary Curve C: Circle x^2 + y^2 = 1, z = 0 in xy-plane oriented counterclockwise.\\nLine Integral \\oint_C \\vec{F} \\cdot d\\vec{r}:\\nAt z = 0: \\vec{F} = (2x - y)\\hat{i}, d\\vec{r} = dx \\hat{i} + dy \\hat{j}.\\n\\oint_C \\vec{F} \\cdot d\\vec{r} = \\oint_C (2x - y) dx.\\nParameterize: x = \\cos \\theta, y = \\sin \\theta, dx = -\\sin \\theta d\\theta, \\theta \\in [0, 2\\pi].\\n= \\int_0^{2\\pi} (2\\cos \\theta - \\sin \\theta)(-\\sin \\theta) d\\theta = \\int_0^{2\\pi} (-2\\sin\\theta \\cos\\theta + \\sin^2\\theta) d\\theta = 0 + \\pi = \\pi.\\n2. Surface Integral \\iint_S (\\nabla \\times \\vec{F}) \\cdot \\hat{n} dS:\\ncurl \\vec{F} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ \\partial/\\partial x & \\partial/\\partial y & \\partial/\\partial z \\\\ 2x - y & -yz^2 & -y^2 z \\end{vmatrix} = \\hat{i}(-2yz + 2yz) - \\hat{j}(0 - 0) + \\hat{k}(0 - (-1)) = \\hat{k}.\\nBy Stokes\' theorem, we can choose the planar circular disc in the xy-plane as the surface S (since curl is constant \\hat{k}):\\n\\iint_S \\hat{k} \\cdot \\hat{k} \\, dx dy = \\iint_S dx dy = \\text{Area of unit circle} = \\pi (1)^2 = \\pi.\\nLine Integral = Surface Integral = \\pi. Hence Verified!',
                  markingScheme: '3 Marks for line integral evaluation around boundary (pi) | 3 Marks for curl F = k and surface integral evaluation (pi)'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Find the total work done by a force field \\vec{F} = (3x^2 + 6y)\\hat{i} - 14yz \\hat{j} + 20xz^2 \\hat{k} in moving a particle from (0, 0, 0) to (1, 1, 1) along the parametric curve x = t, y = t^2, z = t^3.',
                  solution: '1. Parametric substitutions: x = t, y = t^2, z = t^3, t \\in [0, 1].\\ndx = dt, dy = 2t dt, dz = 3t^2 dt.\\n2. Substitute into force field:\\nF_x = 3t^2 + 6t^2 = 9t^2.\\nF_y = -14(t^2)(t^3) = -14t^5.\\nF_z = 20(t)(t^3)^2 = 20t^7.\\n3. Work Done W = \\int_C \\vec{F} \\cdot d\\vec{r} = \\int_0^1 (F_x dx + F_y dy + F_z dz):\\n= \\int_0^1 [ (9t^2)(1) + (-14t^5)(2t) + (20t^7)(3t^2) ] dt\\n= \\int_0^1 [ 9t^2 - 28t^6 + 60t^9 ] dt = \\left[ 9 \\frac{t^3}{3} - 28 \\frac{t^7}{7} + 60 \\frac{t^{10}}{10} \\right]_0^1\\n= [ 3(1) - 4(1) + 6(1) ] = 3 - 4 + 6 = 5 \\text{ Joules}.',
                  markingScheme: '2 Marks for parametric substitutions of F and dr | 2 Marks for definite integral evaluation W = 5'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT IV',
          syllabusTopic: 'Complex Analysis & Residue Calculus',
          questions: [
            {
              qNum: 'Q8',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Determine the analytic function f(z) = u + i v given that u(x, y) = x^3 - 3xy^2 + 3x^2 - 3y^2 + 1 using Milne-Thomson Method.',
                  solution: '1. Compute partial derivatives of u w.r.t x and y:\\n\\frac{\\partial u}{\\partial x} = u_x = 3x^2 - 3y^2 + 6x.\\n\\frac{\\partial u}{\\partial y} = u_y = -6xy - 6y.\\n2. By Milne-Thomson Method:\\nf\'(z) = u_x(z, 0) - i u_y(z, 0).\\nPut x = z, y = 0:\\nu_x(z, 0) = 3z^2 - 0 + 6z = 3z^2 + 6z.\\nu_y(z, 0) = 0 - 0 = 0.\\n\\implies f\'(z) = 3z^2 + 6z.\\n3. Integrate w.r.t z:\\nf(z) = \\int (3z^2 + 6z) dz = z^3 + 3z^2 + C.\\n4. Verify real part at (0, 0): u(0, 0) = 1 \\implies \\text{Re}(C) = 1.\\nResult: f(z) = z^3 + 3z^2 + 1 + i c.',
                  markingScheme: '2 Marks for u_x and u_y derivatives | 2 Marks for Milne-Thomson substitution f\'(z) = 3z^2 + 6z | 2 Marks for integration to z^3 + 3z^2 + 1'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Evaluate the contour integral using Cauchy\'s Residue Theorem: \\oint_C \\frac{z^2 - 1}{(z - 1)^2 (z + 2)} dz, where C is the circle |z| = 3.',
                  solution: '1. Singularities: z = 1 (pole of order 2) and z = -2 (simple pole of order 1).\\nSince contour is |z| = 3, both z = 1 and z = -2 lie strictly INSIDE the contour C.\\n2. Note simplification: (z^2 - 1) = (z - 1)(z + 1).\\nSo f(z) = \\frac{(z - 1)(z + 1)}{(z - 1)^2 (z + 2)} = \\frac{z + 1}{(z - 1)(z + 2)}.\\nNow z = 1 is actually a Simple Pole!\\n3. Residue at z = 1: \\text{Res}(1) = \\lim_{z \\to 1} (z - 1) f(z) = \\frac{1 + 1}{1 + 2} = \\frac{2}{3}.\\n4. Residue at z = -2: \\text{Res}(-2) = \\lim_{z \\to -2} (z + 2) f(z) = \\frac{-2 + 1}{-2 - 1} = \\frac{-1}{-3} = \\frac{1}{3}.\\n5. By Cauchy Residue Theorem:\\n\\oint_C f(z) dz = 2\\pi i [\\text{Res}(1) + \\text{Res}(-2)] = 2\\pi i \\left[\\frac{2}{3} + \\frac{1}{3}\\right] = 2\\pi i (1) = 2\\pi i.',
                  markingScheme: '1 Mark for locating poles inside |z|=3 | 2 Marks for residues (2/3 and 1/3) | 1 Mark for final contour integral 2 pi i'
                }
              ]
            },
            {
              qNum: 'Q9 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Evaluate the real trigonometric definite integral using contour integration around unit circle |z| = 1: \\int_0^{2\\pi} \\frac{d\\theta}{5 + 4 \\cos \\theta}.',
                  solution: '1. Unit Circle Substitution: z = e^{i\\theta}, dz = i e^{i\\theta} d\\theta = i z d\\theta \\implies d\\theta = \\frac{dz}{i z}.\\n\\cos \\theta = \\frac{z + z^{-1}}{2} = \\frac{z^2 + 1}{2z}.\\n2. Transform integral:\\n\\oint_{|z|=1} \\frac{dz / (iz)}{5 + 4\\left(\\frac{z^2+1}{2z}\\right)} = \\frac{1}{i} \\oint_{|z|=1} \\frac{dz}{z [5 + \\frac{2(z^2+1)}{z}]} = \\frac{1}{i} \\oint_{|z|=1} \\frac{dz}{2z^2 + 5z + 2}.\\n3. Factor denominator: 2z^2 + 5z + 2 = (2z + 1)(z + 2) = 2(z + 1/2)(z + 2).\\nPoles at z = -1/2 and z = -2.\\nInside unit circle |z| = 1: Only z = -1/2 lies inside (| -1/2 | = 0.5 < 1). The pole z = -2 is outside.\\n4. Residue at simple pole z = -1/2:\\n\\text{Res}(-1/2) = \\lim_{z \\to -1/2} (z + 1/2) \\frac{1}{2(z + 1/2)(z + 2)} = \\frac{1}{2(-1/2 + 2)} = \\frac{1}{2(3/2)} = \\frac{1}{3}.\\n5. By Cauchy Residue Theorem:\\nIntegral = \\frac{1}{i} \\times 2\\pi i \\times \\text{Res}(-1/2) = 2\\pi \\times \\frac{1}{3} = \\frac{2\\pi}{3}.',
                  markingScheme: '2 Marks for unit circle transformations | 2 Marks for factoring and identifying internal pole z = -1/2 | 2 Marks for residue computation and answer 2pi/3'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'State Cauchy\'s Integral Formula. Evaluate: \\oint_C \\frac{\\cos(\\pi z)}{z^2 - 1} dz, where C is the circle |z - 1| = 1.',
                  solution: '1. Cauchy\'s Integral Formula: If f(z) is analytic within and on a closed contour C and a is any interior point, then \\oint_C \\frac{f(z)}{z - a} dz = 2\\pi i f(a).\\n2. Contour |z - 1| = 1: Circle centered at (1, 0) with radius 1.\\nSingularities of integrand are z = 1 and z = -1.\\n- z = 1: |1 - 1| = 0 < 1 \\implies Inside C.\\n- z = -1: |-1 - 1| = 2 > 1 \\implies Outside C.\\n3. Rewrite integrand: \\frac{\\cos(\\pi z)}{(z - 1)(z + 1)} = \\frac{\\frac{\\cos(\\pi z)}{z + 1}}{z - 1}.\\nLet f(z) = \\frac{\\cos(\\pi z)}{z + 1}, which is analytic inside C.\\n4. Evaluate at a = 1: f(1) = \\frac{\\cos(\\pi)}{1 + 1} = \\frac{-1}{2}.\\n5. By Cauchy\'s Integral Formula:\\n\\oint_C \\frac{f(z)}{z - 1} dz = 2\\pi i f(1) = 2\\pi i \\left(-\\frac{1}{2}\\right) = -\\pi i.',
                  markingScheme: '1.5 Marks for stating Cauchy\'s integral formula | 1 Mark for identifying only z = 1 lies inside | 1.5 Marks for final result -pi i'
                }
              ]
            }
          ]
        }
      ]
    }
  },

  // =========================================================================
  // 9. BCSE-012: Fundamentals of Web Technologies
  // =========================================================================
  {
    id: 'qp-webtech-012',
    code: 'BCSE-012',
    subject: 'Fundamentals of Web Technologies',
    semester: 'Semester 1',
    semNumber: 1,
    year: '1st Year',
    course: 'B.Tech (CSE / IT)',
    university: 'Maharishi Markandeshwar (Deemed to be University), Mullana',
    timeAllowed: '3 Hours',
    maxMarks: 60,
    passingMarks: 24,
    probability: '96% High-Yield Match',
    instructions: [
      'Question No. 1 in Section A is COMPULSORY (20 marks).',
      'Attempt any FOUR questions from Section B, selecting ONE question from each Unit (10 marks each).',
      'Write clean, standards-compliant HTML5, CSS3, and JavaScript code.'
    ],
    sectionA: {
      title: 'SECTION A (COMPULSORY)',
      marks: 20,
      note: 'Answer ALL ten questions. Each question carries 2 marks.',
      questions: [
        {
          qNum: 'Q1 (a)',
          unit: 'Unit 1',
          marks: 2,
          question: 'Differentiate between the Internet and the World Wide Web (WWW).',
          expectedFrequency: 'Web Architecture Standard',
          modelAnswer: '1. Internet: The global physical networking infrastructure connecting millions of computers, routers, and devices via TCP/IP protocols.\\n2. World Wide Web (WWW): An information application service running on top of the Internet, consisting of interlinked hypertext documents accessed via HTTP/HTTPS and URLs.',
          keyMarkingPoints: ['1 Mark for Internet as physical hardware/networking infrastructure', '1 Mark for WWW as application/hypertext service on top']
        },
        {
          qNum: 'Q1 (b)',
          unit: 'Unit 1',
          marks: 2,
          question: 'Explain the role of DNS (Domain Name System) and state its standard transport port number.',
          expectedFrequency: 'Networking Standard',
          modelAnswer: 'DNS serves as the "phonebook" of the Internet, translating human-friendly domain names (e.g. www.mmumullana.org) into machine-readable IP addresses (e.g. 104.21.54.120). It operates primarily over UDP (and TCP for zone transfers) on standard Port 53.',
          keyMarkingPoints: ['1 Mark for domain-to-IP translation function', '1 Mark for identifying Port 53 (UDP)']
        },
        {
          qNum: 'Q1 (c)',
          unit: 'Unit 1',
          marks: 2,
          question: 'Differentiate between HTTP GET and POST request methods.',
          expectedFrequency: 'Every Year (2020-2024)',
          modelAnswer: '1. GET: Appends form data to URL query string (?key=val), cached by browsers, idempotent, bookmarks enabled, limited payload length (~2048 chars), insecure for passwords.\\n2. POST: Sends data in HTTP message request body, not cached, non-idempotent, unlimited payload size, secure for sensitive credentials and file uploads.',
          keyMarkingPoints: ['1 Mark for URL query string vs HTTP body difference', '1 Mark for caching, idempotency, and security comparison']
        },
        {
          qNum: 'Q1 (d)',
          unit: 'Unit 2',
          marks: 2,
          question: 'What are Semantic HTML5 tags? Name four semantic structural elements.',
          expectedFrequency: 'HTML5 Standard',
          modelAnswer: 'Semantic HTML5 tags clearly describe their intended meaning and structure to both the browser and developer, improving accessibility (screen readers) and SEO rankings. Examples: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>.',
          keyMarkingPoints: ['1 Mark for definition of semantic meaning for accessibility/SEO', '1 Mark for 4 valid tags (<nav>, <article>, <section>, <footer>)']
        },
        {
          qNum: 'Q1 (e)',
          unit: 'Unit 2',
          marks: 2,
          question: 'What is a Client-Side Image Map? Name the three HTML tags used to create it.',
          expectedFrequency: 'HTML Interactive Feature',
          modelAnswer: 'A Client-Side Image Map is an interactive image with multiple clickable hyperlinked coordinate hotspot zones. The browser calculates click coordinates directly without contacting server. Tags: (1) <img> with usemap attribute, (2) <map name="...">, and (3) <area shape="rect|circle|poly" coords="..." href="...">.',
          keyMarkingPoints: ['1 Mark for clickable hotspot zones definition', '1 Mark for listing <img>, <map>, and <area> tags']
        },
        {
          qNum: 'Q1 (f)',
          unit: 'Unit 3',
          marks: 2,
          question: 'Differentiate between localStorage and sessionStorage in HTML5 Web Storage API.',
          expectedFrequency: 'Storage Standard',
          modelAnswer: '1. localStorage: Data persists permanently on client disk across browser restarts and tab closures until explicitly cleared via JavaScript (localStorage.clear()) or user cache purge (~5-10MB quota).\\n2. sessionStorage: Data is isolated strictly to the current browser tab and lifetime; it is automatically wiped out as soon as the tab or window is closed.',
          keyMarkingPoints: ['1 Mark for permanent persistence vs tab-closure wipe', '1 Mark for capacity (~5-10MB) and tab isolation']
        },
        {
          qNum: 'Q1 (g)',
          unit: 'Unit 3',
          marks: 2,
          question: 'Write HTML5 code to embed an MP4 video with controls, autoplay muted, and a fallback message for unsupported browsers.',
          expectedFrequency: 'Multimedia Standard',
          modelAnswer: '<video width="640" height="360" controls autoplay muted poster="thumb.jpg">\\n  <source src="lecture.mp4" type="video/mp4">\\n  <source src="lecture.webm" type="video/webm">\\n  Your browser does not support the HTML5 video tag.\\n</video>',
          keyMarkingPoints: ['1 Mark for <video controls autoplay muted> attributes', '1 Mark for <source> tag and fallback message']
        },
        {
          qNum: 'Q1 (h)',
          unit: 'Unit 4',
          marks: 2,
          question: 'Explain the CSS Box Model components in order from innermost to outermost.',
          expectedFrequency: 'Every Year (2020-2024)',
          modelAnswer: 'From inside to outside:\\n1. Content: The actual text, image, or media element.\\n2. Padding: Transparent spacing between content and border.\\n3. Border: A styled line wrapping the padding and content.\\n4. Margin: Transparent outer spacing separating this element from neighboring elements.',
          keyMarkingPoints: ['0.5 Marks each for Content, Padding, Border, and Margin in exact sequence']
        },
        {
          qNum: 'Q1 (i)',
          unit: 'Unit 4',
          marks: 2,
          question: 'What is the difference between "display: none" and "visibility: hidden" in CSS?',
          expectedFrequency: 'CSS Layout Standard',
          modelAnswer: '1. display: none: Completely removes the element from the document layout flow. It takes up ZERO physical space, and neighboring elements collapse to fill the gap.\\n2. visibility: hidden: Hides the element visually, but the element STILL reserves its original physical width and height in the layout flow.',
          keyMarkingPoints: ['1 Mark for display:none collapsing layout space', '1 Mark for visibility:hidden preserving blank layout space']
        },
        {
          qNum: 'Q1 (j)',
          unit: 'Unit 4',
          marks: 2,
          question: 'What is a CSS Media Query? Write a media query that applies styling only on screens narrower than 768px.',
          expectedFrequency: 'Responsive Design Standard',
          modelAnswer: 'A CSS Media Query applies custom CSS rules conditionally based on device viewport width, resolution, or orientation, enabling responsive mobile design.\\nCode:\\n@media screen and (max-width: 767px) {\\n    body { font-size: 14px; }\\n    .sidebar { display: none; }\\n}',
          keyMarkingPoints: ['1 Mark for responsive design definition', '1 Mark for correct @media screen and (max-width: 767px) syntax']
        }
      ]
    },
    sectionB: {
      title: 'SECTION B (UNIT-WISE LONG QUESTIONS)',
      marks: 40,
      note: 'Attempt ONE question from EACH Unit. Each question carries 10 marks.',
      units: [
        {
          unitNumber: 'UNIT I',
          syllabusTopic: 'Web Architecture & Protocols',
          questions: [
            {
              qNum: 'Q2',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain the complete HTTP Request-Response Transaction Cycle when a student types "https://www.mmumullana.org" into a web browser. Include DNS resolution hierarchy (Root, TLD, Authoritative), TCP 3-way handshake, TLS handshake, and HTTP GET request.',
                  solution: '1. Step 1 (URL Parsing & DNS Resolution): Browser checks local DNS cache. If missed, queries OS resolver, Local DNS Server, Root DNS Nameserver (.), TLD Nameserver (.org), and Authoritative DNS Server for mmumullana.org to return IP address (e.g. 104.21.54.120).\\n2. Step 2 (TCP 3-Way Handshake): Browser opens transport connection to IP on Port 443 via SYN \\to SYN-ACK \\to ACK packets.\\n3. Step 3 (TLS 1.3 Handshake): Client Hello with supported cipher suites; Server Hello with SSL Certificate and public key; mutual session key established via Diffie-Hellman.\\n4. Step 4 (HTTP Request): Browser sends: GET / HTTP/1.1 with Host, User-Agent, Accept headers.\\n5. Step 5 (Server Response & DOM Rendering): Server responds with HTTP/1.1 200 OK and HTML payload. Browser parses DOM tree, CSSOM tree, executes JS, and renders the webpage.',
                  markingScheme: '2 Marks for DNS resolution hierarchy | 2 Marks for TCP 3-way handshake & TLS encryption | 2 Marks for HTTP request/response & DOM rendering'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain the 3-Tier Web Application Architecture: Presentation Tier, Application (Logic) Tier, and Data Tier. Draw a neat schematic diagram.',
                  solution: '1. Presentation Tier (Client Layer): Web browsers rendering HTML5, CSS3, JavaScript. Responsible for UI display and capturing user interactions.\\n2. Application Tier (Business Logic Layer): Web and application servers (Node.js, Python/Django, Apache, Nginx). Processes dynamic business logic, authentication, and API endpoints.\\n3. Data Tier (Database Layer): Relational or NoSQL database servers (PostgreSQL, MySQL, MongoDB). Handles persistent ACID storage, queries, and data backup.\\nBenefits: Separation of concerns, independent scalability, modular security isolation.',
                  markingScheme: '1.5 Marks for 3-tier architectural diagram | 2.5 Marks for explaining roles of client, app server, and database tiers'
                }
              ]
            },
            {
              qNum: 'Q3 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain the structure of an HTTP Request Header and HTTP Response Header. Explain common HTTP Status Codes: 200 OK, 301 Moved Permanently, 400 Bad Request, 403 Forbidden, 404 Not Found, 500 Internal Server Error, and 503 Service Unavailable.',
                  solution: '1. Request Format: Method URL Version (e.g. GET /index.html HTTP/1.1), Headers (Host, User-Agent, Cookie), Blank Line, Body.\\n2. Response Format: Version Status-Code Reason (e.g. HTTP/1.1 200 OK), Headers (Content-Type, Content-Length, Set-Cookie), Blank Line, Body.\\n3. Status Codes:\\n- 200 OK: Request succeeded.\\n- 301 Moved Permanently: Resource redirected to new permanent URL.\\n- 400 Bad Request: Malformed syntax in request from client.\\n- 403 Forbidden: Client authenticated but lacks authorization permissions.\\n- 404 Not Found: Server cannot locate requested URI.\\n- 500 Internal Server Error: Unhandled crash or exception on server.\\n- 503 Service Unavailable: Server overloaded or undergoing maintenance.',
                  markingScheme: '2.5 Marks for request/response header structures | 3.5 Marks for explaining all 7 status codes accurately'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Compare IPv4 and IPv6 addressing schemes in terms of address length, total possible addresses, header complexity, and notation format.',
                  solution: '| Feature | IPv4 | IPv6 |\\n| Address Length | 32 bits (4 bytes) | 128 bits (16 bytes) |\\n| Address Space | 2^32 (~4.29 billion) | 2^{128} (~3.4 x 10^38) |\\n| Notation Format | Dotted-decimal (192.168.1.1) | Hexadecimal colon (2001:0db8::1) |\\n| Header Size | Variable (20-60 bytes) | Fixed (40 bytes) |\\n| Checksum | Yes (recomputed at every router) | Removed (faster routing) |\\n| Auto-configuration | DHCP required | SLAAC supported natively |',
                  markingScheme: '2.5 Marks for 32-bit vs 128-bit comparison table | 1.5 Marks for notation and header optimization'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT II',
          syllabusTopic: 'HTML5 Forms & Semantic Architecture',
          questions: [
            {
              qNum: 'Q4',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Create a complete Student Registration HTML5 Form containing: Full Name (required, pattern text), Email, Password (minlength 8), Date of Birth (<input type="date">), Gender (radio buttons), Branch (dropdown <select>), Semester (<input type="number" min="1" max="8">), Resume Upload (<input type="file" accept=".pdf">), and Submit/Reset buttons with semantic grouping using <fieldset> and <legend>.',
                  solution: '<form action="/register" method="POST" enctype="multipart/form-data">\\n  <fieldset>\\n    <legend>Student Academic Registration</legend>\\n    <label for="name">Full Name:</label>\\n    <input type="text" id="name" name="name" required pattern="[A-Za-z ]{3,50}"><br><br>\\n    <label for="email">Email:</label>\\n    <input type="email" id="email" name="email" required><br><br>\\n    <label for="pwd">Password:</label>\\n    <input type="password" id="pwd" name="password" minlength="8" required><br><br>\\n    <label for="dob">Date of Birth:</label>\\n    <input type="date" id="dob" name="dob" required><br><br>\\n    <label>Gender:</label>\\n    <input type="radio" id="m" name="gender" value="male"><label for="m">Male</label>\\n    <input type="radio" id="f" name="gender" value="female"><label for="f">Female</label><br><br>\\n    <label for="branch">Branch:</label>\\n    <select id="branch" name="branch">\\n      <option value="CSE">Computer Science</option>\\n      <option value="AI">AI & ML</option>\\n    </select><br><br>\\n    <label for="sem">Semester:</label>\\n    <input type="number" id="sem" name="semester" min="1" max="8" value="1"><br><br>\\n    <label for="resume">Upload Resume (PDF):</label>\\n    <input type="file" id="resume" name="resume" accept=".pdf" required><br><br>\\n    <button type="submit">Submit Registration</button>\\n    <button type="reset">Reset Form</button>\\n  </fieldset>\\n</form>',
                  markingScheme: '2 Marks for fieldset/legend & form attributes (POST, multipart) | 2 Marks for HTML5 input types (date, email, number min/max) | 2 Marks for input validation attributes (required, pattern, minlength, accept)'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Construct an HTML table displaying an Academic Grade Sheet for 3 subjects. Use semantic <thead>, <tbody>, <tfoot>, <th>, and demonstrate the use of "colspan" and "rowspan" attributes.',
                  solution: '<table border="1" cellpadding="8" style="border-collapse: collapse;">\\n  <thead>\\n    <tr>\\n      <th rowspan="2">Roll No</th>\\n      <th rowspan="2">Student Name</th>\\n      <th colspan="3">Marks Obtained</th>\\n      <th rowspan="2">Result</th>\\n    </tr>\\n    <tr>\\n      <th>BEEE</th>\\n      <th>Maths</th>\\n      <th>C Prog</th>\\n    </tr>\\n  </thead>\\n  <tbody>\\n    <tr>\\n      <td>101</td>\\n      <td>Bhavya Mishra</td>\\n      <td>92</td>\\n      <td>95</td>\\n      <td>98</td>\\n      <td>PASS</td>\\n    </tr>\\n  </tbody>\\n  <tfoot>\\n    <tr>\\n      <td colspan="2"><strong>Class Average</strong></td>\\n      <td colspan="3">95.0%</td>\\n      <td>PASS</td>\\n    </tr>\\n  </tfoot>\\n</table>',
                  markingScheme: '2 Marks for semantic thead, tbody, tfoot structure | 2 Marks for correct rowspan and colspan implementation'
                }
              ]
            },
            {
              qNum: 'Q5 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Design an HTML5 Semantic Page Blueprint for a College Portal homepage. Structure the page using <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer> with proper ARIA accessibility roles.',
                  solution: '<!DOCTYPE html>\\n<html lang="en">\\n<head>\\n  <meta charset="UTF-8">\\n  <title>MMDU College Academic Portal</title>\\n</head>\\n<body>\\n  <header role="banner">\\n    <h1>Maharishi Markandeshwar University</h1>\\n    <nav role="navigation" aria-label="Main Navigation">\\n      <ul>\\n        <li><a href="#notes">Notes</a></li>\\n        <li><a href="#syllabus">Syllabus</a></li>\\n        <li><a href="#exams">Question Papers</a></li>\\n      </ul>\\n    </nav>\\n  </header>\\n  <main role="main">\\n    <article>\\n      <h2>Semester 1 Examination Schedule</h2>\\n      <p>Official end-semester university examinations commence November 2026.</p>\\n      <section>\\n        <h3>Important Instructions</h3>\\n        <p>Admit cards are mandatory in the examination hall.</p>\\n      </section>\\n    </article>\\n  </main>\\n  <aside role="complementary">\\n    <h3>Campus News & Notices</h3>\\n    <p>Placement drive starts next week for B.Tech CSE.</p>\\n  </aside>\\n  <footer role="contentinfo">\\n    <p>&copy; 2026 MMDU. All Rights Reserved.</p>\\n  </footer>\\n</body>\\n</html>',
                  markingScheme: '3 Marks for proper hierarchy of all 7 semantic elements | 3 Marks for accessibility roles (banner, navigation, main, complementary, contentinfo)'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain HTML Entities and Character Encodings. Why is UTF-8 universally specified (<meta charset="UTF-8">) in modern web documents?',
                  solution: '1. HTML Entities: Special text codes used to display reserved characters that would otherwise be parsed as HTML markup (e.g. &lt; for <, &gt; for >, &amp; for &, &quot; for ", &copy; for ©).\\n2. UTF-8 (8-bit Unicode Transformation Format): A variable-width character encoding capable of encoding all 1,112,064 valid character code points across all human written languages, mathematical symbols (KaTeX), and emojis with complete backwards compatibility with 7-bit ASCII.',
                  markingScheme: '2 Marks for HTML entities explanation with examples | 2 Marks for UTF-8 global language coverage justification'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT III',
          syllabusTopic: 'HTML5 APIs: Canvas & Web Storage',
          questions: [
            {
              qNum: 'Q6',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Write HTML5 and JavaScript code to draw on an HTML5 <canvas id="myCanvas" width="400" height="300">: (i) A red filled rectangle, (ii) A blue circle with outline, (iii) A linear gradient line, and (iv) Custom text "MMDU B.Tech 2026".',
                  solution: '<canvas id="myCanvas" width="400" height="300" style="border:1px solid #ccc;"></canvas>\\n<script>\\n  const canvas = document.getElementById("myCanvas");\\n  const ctx = canvas.getContext("2d");\\n  // 1. Red filled rectangle\\n  ctx.fillStyle = "red";\\n  ctx.fillRect(20, 20, 100, 60);\\n  // 2. Blue stroked circle\\n  ctx.beginPath();\\n  ctx.arc(200, 50, 30, 0, 2 * Math.PI);\\n  ctx.strokeStyle = "blue";\\n  ctx.lineWidth = 3;\\n  ctx.stroke();\\n  // 3. Linear Gradient Line\\n  const grad = ctx.createLinearGradient(0, 120, 300, 120);\\n  grad.addColorStop(0, "green");\\n  grad.addColorStop(1, "yellow");\\n  ctx.strokeStyle = grad;\\n  ctx.beginPath();\\n  ctx.moveTo(20, 120);\\n  ctx.lineTo(300, 120);\\n  ctx.stroke();\\n  // 4. Custom Text\\n  ctx.font = "bold 20px Arial";\\n  ctx.fillStyle = "purple";\\n  ctx.fillText("MMDU B.Tech 2026", 20, 200);\\n</script>',
                  markingScheme: '1.5 Marks for getContext("2d") | 1.5 Marks for rect and arc circle methods | 1.5 Marks for gradient stroke | 1.5 Marks for font and fillText'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Write a JavaScript program using the HTML5 Web Storage API (localStorage) to store, retrieve, update, and remove a user authentication session token and display a greeting with the student name.',
                  solution: '// Store token and username\\nlocalStorage.setItem("authToken", "jwt_token_xyz123");\\nlocalStorage.setItem("studentName", "Bhavya Mishra");\\n\\n// Retrieve\\nconst token = localStorage.getItem("authToken");\\nconst name = localStorage.getItem("studentName");\\nif (token) {\\n    console.log(`Welcome back, ${name}! Session active.`);\\n} else {\\n    console.log("Please log in.");\\n}\\n\\n// Update\\nlocalStorage.setItem("studentName", "Bhavya Mishra (Admin)");\\n\\n// Remove session on logout\\nfunction logout() {\\n    localStorage.removeItem("authToken");\\n    localStorage.clear();\\n    console.log("Logged out successfully.");\\n}',
                  markingScheme: '2 Marks for setItem and getItem syntax | 2 Marks for update, removeItem, and clear methods'
                }
              ]
            },
            {
              qNum: 'Q7 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain the Document Object Model (DOM) Tree architecture. Write JavaScript functions to: (i) Select an element by ID, (ii) Change its text content, (iii) Dynamically create and append an <li> item to an existing <ul>, and (iv) Attach a click event listener.',
                  solution: '1. DOM Tree Architecture: Hierarchical tree representation of the HTML document where nodes represent tags, text, and attributes. Top node is document \\to html \\to head/body.\\n2. JavaScript Code:\\n// (i) Select element by ID\\nconst header = document.getElementById("main-title");\\n// (ii) Change text content and styling\\nheader.textContent = "Welcome to Interactive Notes";\\nheader.style.color = "#00f0ff";\\n// (iii) Create and append <li>\\nconst list = document.getElementById("notes-list");\\nconst newItem = document.createElement("li");\\nnewItem.textContent = "Unit 4: Number Systems";\\nlist.appendChild(newItem);\\n// (iv) Event listener\\nnewItem.addEventListener("click", function(event) {\\n    alert("Clicked: " + event.target.textContent);\\n});',
                  markingScheme: '2 Marks for DOM tree concept | 4 Marks for working code using getElementById, textContent, createElement, appendChild, addEventListener'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain the Fetch API in JavaScript. Write code to fetch JSON student records from an API endpoint "https://api.college.edu/students" using async/await and handle errors gracefully using try/catch.',
                  solution: 'async function fetchStudents() {\\n    try {\\n        const response = await fetch("https://api.college.edu/students");\\n        if (!response.ok) {\\n            throw new Error(`HTTP Error! Status: ${response.status}`);\\n        }\\n        const data = await response.json();\\n        console.log("Students loaded:", data);\\n        return data;\\n    } catch (error) {\\n        console.error("Failed to fetch student data:", error.message);\\n    }\\n}\\nfetchStudents();',
                  markingScheme: '2 Marks for fetch async/await with response.ok check | 2 Marks for try/catch error handling and response.json()'
                }
              ]
            }
          ]
        },
        {
          unitNumber: 'UNIT IV',
          syllabusTopic: 'CSS3 Architecture & Responsive Design',
          questions: [
            {
              qNum: 'Q8',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain CSS Flexbox layout architecture. Describe the purpose and values of: display: flex, flex-direction, justify-content, align-items, flex-wrap, and flex-grow. Write CSS to horizontally and vertically center a card inside a parent container.',
                  solution: '1. Flexbox Concept: 1D layout model allocating space and aligning items along a Main Axis and Cross Axis.\\n2. Properties:\\n- display: flex: Establishes a flex container context.\\n- flex-direction: Sets main axis (row, row-reverse, column, column-reverse).\\n- justify-content: Aligns items along main axis (flex-start, center, flex-end, space-between, space-around, space-evenly).\\n- align-items: Aligns items along cross axis (flex-start, center, flex-end, stretch, baseline).\\n- flex-wrap: Controls multi-line wrapping (nowrap, wrap, wrap-reverse).\\n- flex-grow: Proportion of available remaining space an item consumes.\\n3. Perfect Centering Code:\\n.parent-container {\\n    display: flex;\\n    justify-content: center; /* Horizontally centered */\\n    align-items: center;     /* Vertically centered */\\n    min-height: 100vh;\\n}\\n.card {\\n    width: 320px;\\n    padding: 24px;\\n}',
                  markingScheme: '3 Marks for explaining all 6 Flexbox properties with Main/Cross axis | 3 Marks for perfect centering code with justify-content & align-items'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain the CSS "box-sizing" property. Compare "content-box" vs "border-box" and explain why modern web design universally sets * { box-sizing: border-box; }.',
                  solution: '1. content-box (Default): The declared width and height apply ONLY to content. Any padding and border are ADDED on top, making Total Width = width + 2*padding + 2*border (leads to layout overflow bugs!).\\n2. border-box: The declared width and height INCLUDE padding and border. Total Width = width (content shrinks automatically to absorb padding/border).\\n3. Universal Reset: Setting * { box-sizing: border-box; } ensures predictable, calculation-free responsive element sizing without unexpected wrapper container breakage.',
                  markingScheme: '2 Marks for formula comparison of content-box vs border-box | 2 Marks for overflow bug prevention rationale of universal reset'
                }
              ]
            },
            {
              qNum: 'Q9 (OR)',
              marks: 10,
              subParts: [
                {
                  part: '(a)',
                  marks: 6,
                  question: 'Explain CSS Grid Layout architecture: grid-template-columns, grid-template-rows, gap, and grid-column / grid-row span. Write CSS to create a 3-column responsive card grid that collapses to 1 column on mobile screens using media queries.',
                  solution: '1. CSS Grid Concept: 2D layout engine simultaneously governing rows and columns.\\n2. Properties:\\n- grid-template-columns: Defines track sizes (e.g. repeat(3, 1fr) for 3 equal fractions).\\n- grid-template-rows: Defines row heights.\\n- gap: Spacing between grid tracks without margin collapses.\\n- grid-column: span: Merges multiple cells across columns.\\n3. Responsive 3-to-1 Column Grid Code:\\n.cards-grid {\\n    display: grid;\\n    grid-template-columns: repeat(3, 1fr);\\n    gap: 20px;\\n    padding: 20px;\\n}\\n@media screen and (max-width: 768px) {\\n    .cards-grid {\\n        grid-template-columns: 1fr; /* Single column on mobile */\\n    }\\n}',
                  markingScheme: '3 Marks for CSS Grid 2D properties and fr unit | 3 Marks for 3-column desktop and 1-column mobile media query implementation'
                },
                {
                  part: '(b)',
                  marks: 4,
                  question: 'Explain CSS Specificity hierarchy and calculation: Inline styles, IDs, Classes/Attributes/Pseudo-classes, Elements/Pseudo-elements, and the !important override rule.',
                  solution: '1. Specificity Tuple (a, b, c, d):\\n- a: Inline styles (style="...") \\implies Weight = 1000\\n- b: ID selectors (#header) \\implies Weight = 100\\n- c: Class selectors (.btn), attributes ([type="text"]), pseudo-classes (:hover) \\implies Weight = 10\\n- d: Element selectors (div, p), pseudo-elements (::before) \\implies Weight = 1\\n2. Cascade Rule: When conflicting rules target an element, the rule with the highest specificity score wins. Universal selector (*) and combinators have 0 weight.\\n3. !important: Overrides normal cascading specificity; should be used sparingly as it breaks maintainable CSS architecture.',
                  markingScheme: '2.5 Marks for 4-tier specificity weighting breakdown | 1.5 Marks for cascade winning rule and !important impact'
                }
              ]
            }
          ]
        }
      ]
    }
  }
];


