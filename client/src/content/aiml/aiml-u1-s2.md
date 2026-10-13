### 1. Mathematical Architecture of Intelligent Agents

> 🟢 **Rigorous Definition:** An **Agent** is anything that can view its environment through **Sensors** and act upon that environment through **Actuators**.

#### The Agent Function vs Agent Program:
1. **Percept:** The agent's perceptual input at any given instant.
2. **Percept Sequence ($P^*$):** The complete historical trajectory of all percepts the agent has ever received since initialization.
3. **Agent Function ($f$):** An abstract mathematical mapping from percept sequences to actions:
   $$\mathbf{f: P^* \to  \mathcal{A}}$$
4. **Agent Program:** The concrete software algorithm executing on the physical computing architecture implementing the agent function $f$.

<div class="circuit-diagram-card">
  <svg class="circuit-svg" viewBox="0 0 680 230" width="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="ag-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
      </marker>
      <marker id="ag-arr-g" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" />
      </marker>
    </defs>
    <rect x="5" y="5" width="670" height="220" rx="12" class="schematic-bg" fill="rgba(15,23,42,0.75)" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="5 4" />
    <text x="340" y="25" text-anchor="middle" fill="#38bdf8" font-size="12.5" font-weight="bold" letter-spacing="1">INTELLIGENT AGENT – ENVIRONMENT FEEDBACK LOOP</text>
    <!-- Environment Box -->
    <rect x="160" y="36" width="360" height="42" rx="8" fill="rgba(30,58,138,0.85)" stroke="#60a5fa" stroke-width="2" />
    <text x="340" y="62" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">EXTERNAL TASK ENVIRONMENT</text>
    <!-- Left Down Arrow: Percepts -->
    <line x1="230" y1="78" x2="230" y2="106" stroke="#38bdf8" stroke-width="2" marker-end="url(#ag-arr)" />
    <text x="175" y="97" text-anchor="end" fill="#7dd3fc" font-size="11" font-weight="bold">Percepts P*</text>
    <!-- Sensors Box -->
    <rect x="150" y="108" width="160" height="36" rx="8" fill="rgba(15,118,110,0.85)" stroke="#2dd4bf" stroke-width="1.8" />
    <text x="230" y="131" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="bold">SENSORS</text>
    <!-- Arrow Sensors -> Agent Program -->
    <line x1="230" y1="144" x2="230" y2="166" stroke="#38bdf8" stroke-width="2" marker-end="url(#ag-arr)" />
    <!-- Agent Program Box -->
    <rect x="140" y="168" width="400" height="46" rx="8" fill="rgba(88,28,135,0.85)" stroke="#c084fc" stroke-width="2" />
    <text x="340" y="188" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="bold">AGENT PROGRAM: f(P*) → Action</text>
    <text x="340" y="205" text-anchor="middle" fill="#e9d5ff" font-size="10.5">Tracks World State &amp; Selects Utility-Maximizing Action</text>
    <!-- Arrow Agent Program -> Actuators -->
    <line x1="450" y1="168" x2="450" y2="146" stroke="#34d399" stroke-width="2" marker-end="url(#ag-arr-g)" />
    <!-- Actuators Box -->
    <rect x="370" y="108" width="160" height="36" rx="8" fill="rgba(6,78,59,0.85)" stroke="#34d399" stroke-width="1.8" />
    <text x="450" y="131" text-anchor="middle" fill="#ffffff" font-size="12.5" font-weight="bold">ACTUATORS</text>
    <!-- Right Up Arrow: Actions -->
    <line x1="450" y1="108" x2="450" y2="80" stroke="#34d399" stroke-width="2" marker-end="url(#ag-arr-g)" />
    <text x="505" y="97" text-anchor="start" fill="#6ee7b7" font-size="11" font-weight="bold">Actions A</text>
  </svg>
</div>

---

### 2. Rationality & The PEAS Framework

> 🟢 **Definition of Rationality:** A **Rational Agent** is one that, for each possible percept sequence, selects an action that is expected to maximize its **Performance Measure**, given the evidence provided by the percept sequence and whatever built-in knowledge the agent possesses.
> 🔴 **Rationality $≠$ Omniscience:** Rationality maximizes *expected* performance, not *actual* performance (an agent cannot anticipate unpredictable future events like a sudden flat tire).

#### The PEAS Specification:
To engineer an autonomous system, four components must be formally defined:
- P = **Performance Measure:** Objective mathematical metric evaluated by an external designer.
- E = **Environment:** External physical or digital world containing obstacles and uncertainties.
- A = **Actuators:** Hardware mechanisms or software APIs through which the agent acts.
- S = **Sensors:** Sensory hardware or data feeds collecting environmental signals.

---

### 3. The 6 Fundamental Dimensions of Task Environments

1. **Fully Observable vs Partially Observable:**
   - *Fully Observable:* Sensors capture the complete state of the world at each point in time (e.g., Chess, Go).
   - *Partially Observable:* Sensor noise, occlusions, or fog prevent complete state awareness (e.g., Poker, Autonomous Driving).
2. **Deterministic vs Stochastic:**
   - *Deterministic:* The next state is completely dictated by current state and agent action.
   - *Stochastic:* Environmental transitions involve random physical probabilities or unpredictable external agents.
3. **Episodic vs Sequential:**
   - *Episodic:* The agent's experience is split into atomic independent episodes (e.g., Image Classification). Current action does not affect future inputs.
   - *Sequential:* Current action alters all future states, requiring long-term planning (e.g., Chess, Driving).
4. **Static vs Dynamic:**
   - *Static:* Environment does not change while the agent is deliberating (e.g., Crossword puzzle).
   - *Dynamic:* Environment evolves continuously during calculation (e.g., Driving at $100,\text{km/h}$).
   - *Semistatic:* Environment does not change, but the agent's performance score decreases with deliberation time (e.g., Speed chess with clock).
5. **Discrete vs Continuous:**
   - *Discrete:* State, time, percepts, and actions are finite and countable (e.g., Tic-Tac-Toe, Chess).
   - *Continuous:* Variables are continuous real numbers (e.g., Steering angle, vehicle velocity).
6. **Single-Agent vs Multi-Agent:**
   - *Single-Agent:* Agent operates alone in world (e.g., Solitaire, Robot vacuuming empty room).
   - *Multi-Agent:* World contains other decision-making agents (Competitive: Chess; Cooperative: Multi-robot warehouse swarm).

---

---


**Problem:**
Specify the PEAS framework (Performance, Environment, Actuators, Sensors) for a smart domestic robotic vacuum cleaner (e.g. Roomba).

---

**Step 1 🚀: Performance Measure (P)**
- Percentage of floor area cleaned, cleaning speed, battery energy efficiency, minimal noise, avoidance of furniture collision.

**Step 2 ⚡: Environment (E)**
- Living room, wooden floors, carpets, furniture legs, pets, stairs (drop-off hazards).

**Step 3 🎯: Actuators (A)**
- Left & right drive wheels, spinning edge brushes, suction motor vacuum, dirt bin release, speaker chime.

**Step 4 🏁: Sensors (S)**
- Front bumper touch sensors, downward cliff-detection infrared sensors, LiDAR / optical floor tracking camera, battery voltage sensor, dirt-detection acoustic sensor.


🎯 P: Clean area / efficiency | E: Living room / carpets | A: Wheels / brushes / vacuum | S: LiDAR / bumper / cliff sensors.




**University Question (8 Marks):**
Classify the task environment of: (A) A Chess Tournament Game, and (B) An Autonomous Waymo Robotaxi on a rainy city street, across all 6 environmental dimensions:
1. Observable
2. Deterministic vs Stochastic
3. Episodic vs Sequential
4. Static vs Dynamic
5. Discrete vs Continuous
6. Single-Agent vs Multi-Agent

---

**Step 1 🚀: Chess Tournament Classification**
1. **Fully Observable:** Both players can see all 64 squares and piece positions.
2. **Deterministic:** No dice or random noise; moves dictate exact new board states.
3. **Sequential:** Opening moves directly dictate middle-game tactics and endgame survival.
4. **Static:** The board pieces do not move while a player is thinking.
5. **Discrete:** Exact finite 64 squares and countable legal piece moves.
6. **Multi-Agent (Competitive):** Two competing adversarial rational agents.

**Step 2 ⚡: Autonomous Waymo Robotaxi on Rainy Highway**
1. **Partially Observable:** Fog, rain, and blind spots block sensor views.
2. **Stochastic:** Pedestrians, traffic, and wheel skids have random physical probabilities.
3. **Sequential:** Speeding up or changing lanes influences all future traffic states.
4. **Dynamic:** Traffic, pedestrians, and road obstacles move continuously while the CPU computes.
5. **Continuous:** Steering wheel angle, brake pedal pressure, and vehicle velocity are continuous real numbers.
6. **Multi-Agent (Mixed):** Cooperating and competing with thousands of other human and AI drivers.


🎯 Chess: Fully Observable, Deterministic, Sequential, Static, Discrete, Multi-Agent.
Robotaxi: Partially Observable, Stochastic, Sequential, Dynamic, Continuous, Multi-Agent.




**University Question (10 Marks):**
An automated delivery drone must choose between two flight paths to reach a hospital with emergency blood:
- **Path 1 (Highway Corridor):** Takes 10,mins with probability 0.80, but has severe wind turbulence risk adding 30,mins with probability 0.20.
- **Path 2 (Valley Route):** Takes a steady 16,mins with certainty (p = 1.0).
The hospital utility function is modeled as U(T) = 100 - 2T - 0.05 T² (where T is delivery time in minutes).
Calculate the Expected Utility (EU) for both routes and determine which path a rational agent must execute.

---

**Step 1 🚀: Calculate Utility for Highway Outcomes**
- Outcome 1A: T₁ = 10,mins
  U(10) = 100 - 2(10) - 0.05(10)² = 100 - 20 - 5 = 75.0
- Outcome 1B: T₂ = 10 + 30 = 40,mins
  U(40) = 100 - 2(40) - 0.05(40)² = 100 - 80 - 0.05(1600) = 20 - 80 = -60.0

**Step 2 ⚡: Expected Utility for Path 1 (Highway Corridor)**
EU(Path 1) = P(10) · U(10) + P(40) · U(40)
EU(Path 1) = (0.80)(75.0) + (0.20)(-60.0) = 60.0 - 12.0 = +48.0

**Step 3 🎯: Expected Utility for Path 2 (Valley Route with Certainty T = 16)**
U(16) = 100 - 2(16) - 0.05(16)² = 100 - 32 - 0.05(256) = 68 - 12.8 = 55.2
EU(Path 2) = 1.0 × 55.2 = +55.2

**Step 4 🏁: Rational Agent Decision**
EU(Path 2) = 55.2 > EU(Path 1) = 48.0
Even though Path 1 has the fastest best-case (10,mins vs 16,mins), its severe downside risk makes the expected utility worse. A rational agent **must choose Path 2**!


🎯 $EU(\text{Path 1}) = 48.0$ | $EU(\text{Path 2}) = 55.2$ $⇒$ Rational Agent selects **Path 2 (Valley Route)**.