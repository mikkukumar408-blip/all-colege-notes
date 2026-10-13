### 1. Structured Knowledge Representation Paradigms

While mathematical logic offers formal precision, human cognition structures knowledge into associative networks and relational hierarchies.

#### A. Semantic Networks (Quillian, 1968):
A **Semantic Network** represents knowledge as a directed graph consisting of:
- **Nodes:** Represent objects, concepts, classes, or situations.
- **Directed Arcs (Edges):** Represent relationships between nodes.
- **Standard Structural Relationships:**
  1. **`IS-A` (Specialization / Subclass):** `Canary IS-A Bird` (Inherits all superclass properties!).
  2. **`INSTANCE-OF` (Membership):** `Tweety INSTANCE-OF Canary`.
  3. **`HAS-PART` (Aggregation):** `Bird HAS-PART Wings`.
  4. **Property Links:** `Canary COLOR Yellow`.

```
       [ Animal ] <---( IS-A )--- [ Bird ] <---( IS-A )--- [ Canary ]
           |                         |                         |
     (HAS-PROP)                  (CAN-DO)                  (IS-A)
           v                         v                         v
     [ Alive ]                   [ Fly ]                   [ Tweety ]
```

---

### 2. Minsky's Frame Systems (1975)

Marvin Minsky proposed **Frames** to represent stereotyped, prototypical situations:
- A frame is an object-oriented data structure consisting of named **Slots** and **Fillers (Values)**.
- **Slot Attributes:**
  - `Default Values:` Assumed true until overridden by explicit contradictory evidence.
  - `Inheritance Facets:` Inherits parent frame slot values via `Superclass` pointers.
  - `Procedural Attachments (Daemons):`
    - **`If-Needed` (Lazy Evaluation):** Triggered when a slot value is requested but empty.
    - **`If-Added` (Active Monitoring):** Triggered when a new value is written to a slot.
    - **`If-Removed`:** Triggered when a value is deleted.

---

### 3. Schank & Abelson's Scripts (1977)

A **Script** is a structured representation that describes a stereotyped, predetermined sequence of events in a particular context (e.g., *Going to a Restaurant*, *Visiting a Dentist*).

#### The 5 Architectural Components of a Script:
1. **Entry Conditions:** Preconditions that must hold before script execution (e.g., Customer is hungry, has money).
2. **Roles:** Human and agent participants (e.g., Customer, Waiter, Chef, Cashier).
3. **Props:** Physical objects involved in the scenario (e.g., Menu, Food, Table, Check/Bill).
4. **Track:** Specific variations of the general scenario (e.g., Fast food counter vs 5-star fine dining).
5. **Scenes:** Chronological sequence of narrative scenes:
   - *Scene 1: Entering* (Entering, waiting, seating).
   - *Scene 2: Ordering* (Menu inspection, waiter takes order, chef prepares).
   - *Scene 3: Eating* (Food delivery, consumption).
   - *Scene 4: Exiting* (Bill presentation, payment, tipping, departure).

---

---

<example level="easy" title="Level 1 (Easy): Semantic Network Inheritance Query">
**Problem:**
Given the Semantic Network hierarchy:
- `Canary` \to {is-a} `Bird` \to {is-a} `Animal`
- `Animal` \to {has-prop} `Breathes Air`
- `Bird` \to {can} `Fly`
- `Canary` \to {color} `Yellow`
What properties does `Canary` possess through inheritance?

---

**Step 1 🚀: Direct Properties**
- `Canary` has color **Yellow**.

**Step 2 ⚡: 1st Level Inheritance (from Bird)**
- Inherits ability to **Fly**.

**Step 3 🎯: 2nd Level Inheritance (from Animal)**
- Inherits ability to **Breathe Air**.

<div class="example-answer-box">
🎯 Inherited Properties of Canary: **Yellow**, **Can Fly**, **Breathes Air**.
</div>
</example>

<example level="medium" title="Level 2 (Medium): Frame Structure with Default Inheritance & Daemons">
**University Question (6 Marks):**
Design a Frame representation for a `Hospital Patient`, including slots, default values, and an `if-needed` daemon for patient age.

---

**Step 1 🚀: Frame Structure Definition**
```
Frame: HospitalPatient
  Specialization-of: Person
  Slots:
    PatientID: Integer
    Name: String
    DOB: Date
    Age: Integer
      daemon: if-needed (CurrentDate - DOB)
    BloodGroup: Enum (A, B, AB, O)
    InsuranceCovered: Boolean (default = True)
```

**Step 2 ⚡: Daemon Functionality**
When an admitting nurse queries `Patient.Age`, the `if-needed` daemon triggers automatically and computes exact age from `DOB` without requiring manual typing!

<div class="example-answer-box">
🎯 Frame designed with slot attributes, default values, and active computational daemons.
</div>
</example>

<example level="hard" title="Level 3 (Hard): Roger Schank's Restaurant Script Formal Specification">
**University Question (10 Marks):**
Formulate Roger Schank's complete Script for a standard restaurant visit. Detail the 4 core components: Props, Roles, Entry Conditions, and the 4 sequential Scenes.

---

**Step 1 🚀: Track & Role Setup**
- **Props:** Tables, Menu, Food dishes, Bill/Check, Cash/Credit card.
- **Roles:** Customer (C), Server/Waiter (W), Chef (CH), Cashier (K).
- **Entry Conditions:** Customer is hungry; Customer has money.

**Step 2 ⚡: Scene Progression (Chronological Flow)**
1. **Scene 1 (Entering):**
   - C enters restaurant → looks for table → W seats C → W hands Menu to C.
2. **Scene 2 (Ordering):**
   - C reads menu → chooses meal → signals W → W records order → W transfers ticket to CH.
3. **Scene 3 (Eating):**
   - CH prepares meal → W serves dish to C → C consumes food.
4. **Scene 4 (Exiting):**
   - C requests bill → W delivers check → C gives payment to K → C leaves tip and exits.

**Step 3 🎯: Results / Post-Conditions**
- C is no longer hungry; C has less money; Restaurant owner has more profit.

<div class="example-answer-box">
🎯 Complete 4-Scene Script structured with causal transitions and pre/post conditions.
</div>
</example>