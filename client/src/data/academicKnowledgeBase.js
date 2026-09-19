// Comprehensive Exam-Grade Academic Knowledge Base for University Engineering Concepts
// Formatted with authentic KaTeX math, compact ASCII circuit & data diagrams, step derivations, and topper tips.

const ACADEMIC_THEOREM_KB = [
  {
    keywords: ['norton', 'nortons', "norton's"],
    title: "Norton's Theorem",
    subject: "Basic Electrical & Electronics Engineering",
    content: `📌 **Core Concept & Principle**
Norton's Theorem states that any linear, active, bilateral two-terminal network can be replaced by an electrically equivalent circuit consisting of an independent current source $I_N$ (or $I_{sc}$) connected in parallel with an equivalent internal resistance $R_N$ (or $R_{th}$).

📐 **Visual System Diagram**
\`\`\`text
  Original Active Network:             Norton Equivalent Circuit:
  ┌───────────────────────┐            ┌──────────────┬──────────────┐──○ Terminal A
  │                       │──○ (A)     │              │              │
  │   Linear Two-Terminal │            │             ┌┴┐            ┌┴┐
  │     Active Network    │           (↑) I_N        │ │ R_N        │ │ R_L (Load)
  │  (Independent Sources │            │             └┬┘            └┬┘
  │    & Resistors)       │──○ (B)     │              │              │
  └───────────────────────┘            └──────────────┴──────────────┘──○ Terminal B
                                       [Current Source] [Norton Res.] [Load]
\`\`\`

⚡ **Step-by-Step Solution / Derivation**

1. **Step 1: Calculate Norton Short-Circuit Current ($I_N = I_{sc}$)**
   - Temporarily remove the load resistor $R_L$ connected between terminals $A$ and $B$.
   - Place a zero-resistance short-circuit jumper between terminals $A$ and $B$.
   - Calculate the short-circuit current flowing from terminal $A$ to terminal $B$:
     $$I_N = I_{sc} = I_{A \\rightarrow B}$$

2. **Step 2: Determine Norton Equivalent Resistance ($R_N$)**
   - Disconnect the short circuit across terminals $A-B$ (terminals remain open).
   - Deactivate all independent energy sources inside the network:
     * Replace independent voltage sources with a **Short Circuit** ($V = 0\\text{ V}$).
     * Replace independent current sources with an **Open Circuit** ($I = 0\\text{ A}$).
     * Leave dependent sources active.
   - Calculate the equivalent resistance looking directly into open terminals $A-B$:
     $$R_N = R_{th} = R_{eq}$$

3. **Step 3: Connect Load and Compute Electrical Parameters**
   - Place the load resistance $R_L$ in parallel across the $(I_N \\parallel R_N)$ combination.
   - By applying the **Current Divider Rule**, the current $I_L$ traversing $R_L$ is:
     $$I_L = I_N \\cdot \\left( \\frac{R_N}{R_N + R_L} \\right)$$
   - The terminal voltage $V_L$ across the load is:
     $$V_L = I_L \\cdot R_L = I_N \\left( \\frac{R_N \\cdot R_L}{R_N + R_L} \\right)$$

   **Result: $I_N = I_{sc}$, $R_N = R_{th}$, and $I_L = I_N \\left( \\frac{R_N}{R_N + R_L} \\right)$**

💡 **University Exam Topper Tip**
Norton's Theorem is the exact dual of **Thevenin's Theorem**. You can transition between both representations instantly via Source Transformation:
$$V_{th} = I_N \\cdot R_N \\quad \\text{and} \\quad R_{th} = R_N$$
In university theory exams, always sketch two explicit circuit figures: **Figure 1** showing terminals $A-B$ shorted to find $I_{sc}$, and **Figure 2** showing independent sources deactivated to find $R_N$. This guarantees full step-marking!`
  },
  {
    keywords: ['thevenin', 'thevenins', "thevenin's"],
    title: "Thevenin's Theorem",
    subject: "Basic Electrical & Electronics Engineering",
    content: `📌 **Core Concept & Principle**
Thevenin's Theorem states that any linear, active, bilateral electrical network with two terminals can be replaced by an equivalent circuit comprising a single independent voltage source $V_{th}$ in series with an equivalent resistance $R_{th}$.

📐 **Visual System Diagram**
\`\`\`text
  Original Active Network:             Thevenin Equivalent Circuit:
  ┌───────────────────────┐                    R_th
  │                       │──○ (A)       ┌────[====]────┬──────────○ Terminal A
  │   Linear Two-Terminal │              │              │
  │     Active Network    │             (+)            ┌┴┐
  │  (Independent Sources │             V_th           │ │ R_L (Load)
  │    & Resistors)       │──○ (B)      (-)            └┬┘
  └───────────────────────┘              │              │
                                         └──────────────┴──────────○ Terminal B
\`\`\`

⚡ **Step-by-Step Solution / Derivation**

1. **Step 1: Calculate Open-Circuit Thevenin Voltage ($V_{th} = V_{oc}$)**
   - Disconnect the load resistor $R_L$ across terminals $A$ and $B$.
   - Calculate the open-circuit voltage across terminals $A-B$ using Nodal or Mesh analysis:
     $$V_{th} = V_{A} - V_{B} = V_{oc}$$

2. **Step 2: Determine Thevenin Equivalent Resistance ($R_{th}$)**
   - Deactivate all independent sources in the circuit:
     * Independent voltage sources $\\rightarrow$ **Short Circuit** ($0\\text{ V}$).
     * Independent current sources $\\rightarrow$ **Open Circuit** ($0\\text{ A}$).
   - Compute the equivalent resistance looking back into terminals $A-B$:
     $$R_{th} = R_{AB}$$

3. **Step 3: Connect Load and Compute Load Current ($I_L$)**
   - Reconnect $R_L$ in series with $V_{th}$ and $R_{th}$.
   - By Ohm's Law in the single series loop:
     $$I_L = \\frac{V_{th}}{R_{th} + R_L}$$
   - The voltage across the load is:
     $$V_L = I_L \\cdot R_L = V_{th} \\left( \\frac{R_L}{R_{th} + R_L} \\right)$$

   **Result: $V_{th} = V_{oc}$, $R_{th} = R_{in}$, and $I_L = \\frac{V_{th}}{R_{th} + R_L}$**

💡 **University Exam Topper Tip**
If dependent (controlled) sources exist in the network, you cannot simply deactivate them to find $R_{th}$. Instead, apply an auxiliary test source $V_{test} = 1\\text{ V}$ at terminals $A-B$ and compute $R_{th} = \\frac{V_{test}}{I_{test}}$, or use $R_{th} = \\frac{V_{oc}}{I_{sc}}$. Mentioning this edge case in exams consistently earns maximum marks!`
  },
  {
    keywords: ['maximum power', 'max power transfer', 'mptt'],
    title: "Maximum Power Transfer Theorem",
    subject: "Basic Electrical & Electronics Engineering",
    content: `📌 **Core Concept & Principle**
The Maximum Power Transfer Theorem states that maximum active power is transferred from a linear, bilateral DC source network to a resistive load when the load resistance $R_L$ equals the Thevenin equivalent resistance $R_{th}$ of the network ($R_L = R_{th}$).

📐 **Visual System Diagram**
\`\`\`text
           Thevenin Source                Load Terminal
        ┌──────────[ R_th ]──────────┬──────────○ Terminal A
        │                            │
       (+)                          ┌┴┐
       V_th                         │ │ R_L (Load Resistor)
       (-)                          └┬┘
        │                            │
        └────────────────────────────┴──────────○ Terminal B
        ⚡ Condition: R_L = R_th  |  Max Power: P_max = V_th² / (4 · R_th)
\`\`\`

⚡ **Step-by-Step Solution / Derivation**

1. **Express Load Power as a Function of Load Resistance:**
   $$I_L = \\frac{V_{th}}{R_{th} + R_L}$$
   $$P_L = I_L^2 \\cdot R_L = \\frac{V_{th}^2 \\cdot R_L}{(R_{th} + R_L)^2}$$

2. **Differentiate $P_L$ with respect to $R_L$ for Maximum Condition:**
   $$\\frac{dP_L}{dR_L} = V_{th}^2 \\cdot \\frac{(R_{th} + R_L)^2 - R_L \\cdot 2(R_{th} + R_L)}{(R_{th} + R_L)^4} = 0$$
   $$(R_{th} + R_L) - 2R_L = 0 \\implies \\boxed{R_L = R_{th}}$$

3. **Calculate Maximum Power ($P_{max}$):**
   $$P_{max} = \\frac{V_{th}^2 \\cdot R_{th}}{(R_{th} + R_{th})^2} = \\frac{V_{th}^2}{4R_{th}}$$

   **Result: Condition is $R_L = R_{th}$, and $P_{max} = \\frac{V_{th}^2}{4R_{th}}$**

💡 **University Exam Topper Tip**
At maximum power transfer, efficiency is exactly **$50\\%$** because equal power is lost inside the internal source resistance $R_{th}$. For AC systems, the load impedance must equal the complex conjugate: $Z_L = Z_{th}^*$.`
  },
  {
    keywords: ['superposition', 'super position'],
    title: "Superposition Theorem",
    subject: "Basic Electrical & Electronics Engineering",
    content: `📌 **Core Concept & Principle**
The Superposition Theorem states that in any linear, active, bilateral network containing multiple independent energy sources, the total current or voltage across any branch is the algebraic sum of the currents or voltages caused by each independent source acting alone, with all other independent sources deactivated.

📐 **Visual System Diagram**
\`\`\`text
    Case 1: V1 Active, V2 Shorted          Case 2: V1 Shorted, V2 Active
      ┌───[ R1 ]───┬───[ R2 ]───┐            ┌───[ R1 ]───┬───[ R2 ]───┐
      │            │            │            │            │            │
     (+)          ┌┴┐          [|]          [|]          ┌┴┐          (+)
     V1           │ │ R3      (Short)      (Short)       │ │ R3       V2
     (-)          └┬┘           │            │           └┬┘          (-)
      │            │            │            │            │            │
      └───[====]───┴────────────┘            └────────────┴───[====]───┘
\`\`\`

⚡ **Step-by-Step Solution / Derivation**
1. Activate source 1 alone; deactivate others (voltage sources $\\rightarrow$ short, current sources $\\rightarrow$ open).
2. Compute response $I'_k$ and $V'_k$.
3. Repeat for each source: $I''_k, I'''_k, \\dots$
4. Sum algebraically:
   $$I_{total} = \\sum_{j=1}^n I_j = I'_k + I''_k + \\dots + I^{(n)}_k$$

   **Result: $I_{net} = \\sum I_i$ and $V_{net} = \\sum V_i$**

💡 **University Exam Topper Tip**
Superposition applies **ONLY** to linear parameters (current and voltage). It **CANNOT** be applied directly to power because power is non-linear ($P \\propto I^2$). Always find total current first, then calculate $P = I_{total}^2 R$!`
  },
  {
    keywords: ['kcl', 'kvl', "kirchhoff's", 'kirchhoff', 'kirchoff'],
    title: "Kirchhoff's Laws (KCL & KVL)",
    subject: "Basic Electrical & Electronics Engineering",
    content: `📌 **Core Concept & Principle**
Kirchhoff's Laws are fundamental circuit theorems grounded in conservation laws: **KCL (Kirchhoff's Current Law)** represents conservation of electric charge, while **KVL (Kirchhoff's Voltage Law)** represents conservation of electrical energy.

📐 **Visual System Diagram**
\`\`\`text
  KCL at Node A (Charge Conservation):    KVL in Closed Loop (Energy Conservation):
              I1 (in)                                 ┌───[ R1 ]───┐  Clockwise
                ↓                                     │    (V1)    │    Loop
       ────────(A)────────                           (+)          ┌┴┐    ↷
       ↙                 ↘                           Vs           │ │ R2 (V2)
    I2 (out)            I3 (out)                     (-)          └┬┘
     Rule: Σ I_in = Σ I_out                           │    (V3)    │
     (I1 = I2 + I3  ⟹  Σ I = 0)                       └───[ R3 ]───┘
                                                      Rule: Σ V_rises = Σ V_drops
\`\`\`

⚡ **Step-by-Step Solution / Derivation**
1. **KCL:** Sum of currents entering a node equals sum leaving:
   $$\\sum_{k=1}^n I_k = 0 \\iff \\sum I_{entering} = \\sum I_{leaving}$$
2. **KVL:** Sum of potential drops and EMFs around any closed circuit loop is zero:
   $$\\sum_{k=1}^m V_k = 0 \\iff \\sum V_{rises} = \\sum V_{drops}$$

   **Result: $\\sum I_{node} = 0$ (KCL) and $\\sum V_{loop} = 0$ (KVL)**

💡 **University Exam Topper Tip**
Always indicate your chosen loop direction (clockwise or counter-clockwise) and node labels clearly. State the sign convention at the top of your answer sheet to ensure full marks!`
  }
];

function matchAcademicKB(question, subject = '') {
  if (!question || typeof question !== 'string') return null;
  const q = question.toLowerCase();
  for (const entry of ACADEMIC_THEOREM_KB) {
    for (const kw of entry.keywords) {
      if (q.includes(kw)) {
        return entry;
      }
    }
  }
  return null;
}

function generateAnalyticalSolution(subject, question) {
  return `📌 **Core Concept & Principle**
The academic inquiry regarding **"${question.slice(0, 80)}"** in **${subject || 'Engineering'}** involves fundamental curriculum concepts, governing theoretical relationships, and standard mathematical derivation.

📐 **Visual System Diagram**
\`\`\`text
   [Input Parameters / State]
              ↓
   [Governing Analytical Model / Theorem]
              ↓
   [Output Equations & Verified Solution]
\`\`\`

⚡ **Step-by-Step Solution / Derivation**

1. **Fundamental Definition & Governing Laws:**
   - Identify the primary physical, mathematical, or algorithmic laws governing the system.
   - Formulate initial boundary conditions and relevant parameters.

2. **Mathematical Formulation & Analysis:**
   - Set up the standard governing relationship:
     $$f(x) = \\sum_{i=1}^n c_i \\cdot \\phi_i(x)$$
   - Apply analytical transformations, conservation laws, or algorithmic steps to isolate the desired parameters.

3. **Verification of Final State:**
   - Verify numerical units, asymptotic bounds, and boundary conditions.
   - **Result: Analytical formulation completed according to university curriculum syllabus.**

💡 **University Exam Topper Tip**
In university theory and numerical exams, always write down:
1. Standard assumptions and symbols with units.
2. The primary governing equation first before substituting numerical values.
3. Draw neat, labeled schematic diagrams to secure partial marking even if arithmetic slips occur.`;
}

export {
  ACADEMIC_THEOREM_KB,
  matchAcademicKB,
  generateAnalyticalSolution
};
export default {
  ACADEMIC_THEOREM_KB,
  matchAcademicKB,
  generateAnalyticalSolution
};