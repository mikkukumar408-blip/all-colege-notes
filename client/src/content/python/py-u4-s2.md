### 1. Classes, Objects & The `self` Parameter

- **Class:** A user-defined structural blueprint bundling data attributes and operational methods.
- **Object:** A concrete heap instance of a class.
- **`self`:** An explicit first parameter in instance methods representing the calling object instance (`obj.method()` &equiv; `Class.method(obj)`).
- **Class Variables vs Instance Variables:** Class variables are defined in the class body and shared across all instances. Instance variables are bound to `self.var` inside `__init__` and are unique per object.

### 2. Magic (Dunder) Methods & Operator Overloading

```python
class ComplexNum:
    def __init__(self, real, imag):
        self.real = real
        self.imag = imag

    def __add__(self, other):
        # Overloads the '+' operator
        return ComplexNum(self.real + other.real, self.imag + other.imag)

    def __str__(self):
        # Overloads print() and str()
        return f"{self.real} + {self.imag}j"

c1 = ComplexNum(3, 4)
c2 = ComplexNum(1, 2)
c3 = c1 + c2  # Invokes c1.__add__(c2)
print("Resultant Sum:", c3)  # Output: 4 + 6j
```

### 3. Multiple Inheritance, MRO & The Diamond Problem

When a class inherits from multiple parents with overlapping method names, Python eliminates ambiguity using the **C3 Linearization Algorithm (Method Resolution Order - MRO)**:

```python
class A:
    def action(self): print("Base A")

class B(A):
    def action(self): print("Derived B")

class C(A):
    def action(self): print("Derived C")

class D(B, C):
    pass

d = D()
d.action()  # Prints: "Derived B" because B precedes C in declaration!
print([cls.__name__ for cls in D.__mro__])
# Output: ['D', 'B', 'C', 'A', 'object']
```

> ⚡ **KEY TAKEAWAY & BOTTOM LINE:**
> **Composition over Inheritance:** Inheritance models an "Is-A" relationship (tight coupling, fragile base class problem). Composition models a "Has-A" relationship (a class stores references to other objects, loose coupling, higher testability).