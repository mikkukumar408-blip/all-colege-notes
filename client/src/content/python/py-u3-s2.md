### 1. Tuples vs Lists (12-Point Comparative Matrix)

- **Immutability:** Tuples cannot be modified in-place; provides read-only data integrity.
- **Memory Optimization:** Sized precisely to element count with zero spare capacity overhead.
- **Hashability:** Tuples can serve as dictionary keys and set elements if all contained items are immutable.
- **Single-Element Trap:** `t = (5)` is an `int`. Must write `t = (5,)` with trailing comma!

### 2. Dictionaries & Hash Table Architecture

Dictionaries store associative `{key: value}` pairs. In modern Python (3.7+), dicts maintain **insertion order** via a two-array architecture: a sparse hash index table referencing a dense array of entries.

| Key Property | Academic Rule & University Justification |
| :--- | :--- |
| **1. Must be Hashable** | Keys must implement `__hash__()` and `__eq__()`. Immutable types (`str`, `int`, `tuple`) are hashable. Mutable types (`list`, `dict`, `set`) raise `TypeError: unhashable type`. |
| **2. Keys Must be Unique** | Duplicate keys cannot exist; assigning to an existing key silently overwrites the previous value. |

```python
# Dictionary Comprehension & Safe Lookup
students = {"Bhavya": 98, "Aarav": 85, "Diya": 92}
distinction = {k: v for k, v in students.items() if v >= 90}
print(distinction)  # {'Bhavya': 98, 'Diya': 92}

# Safe lookup prevents KeyError crashes
score = students.get("Karan", 0)  # Returns 0 default instead of crashing!
```