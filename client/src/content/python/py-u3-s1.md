### 1. Internal Implementation of Lists

A Python **List** is implemented in CPython as a **contiguous array of 8-byte pointers** to heap objects. To achieve amortized $O(1)$ appends, Python uses a geometric over-allocation strategy: `allocated_slots = (newsize + (newsize >> 3) + 6) & ~3`.

### 2. List Slicing & Method Complexities

| Method | Time Complexity | Description & In-place Mutation |
| :--- | :---: | :--- |
| `lst.append(x)` | $O(1)$ amortized | Appends element to end of array |
| `lst.pop()` | $O(1)$ | Removes and returns last element |
| `lst.pop(0)` / `insert(0, x)` | $O(n)$ | Forces $n$ memory pointer shifts |
| `lst.remove(val)` | $O(n)$ | Linear scan; removes first occurrence or raises `ValueError` |
| `lst.sort()` | $O(n log n)$ | In-place **Timsort** (hybrid merge + insertion sort) |

```python
# Shallow Copy vs Deep Copy
import copy
orig = [[1, 2], [3, 4]]
shallow = orig.copy()        # Inner sublists share identical references!
deep = copy.deepcopy(orig)   # Completely independent recursive duplication

orig[0][0] = 999
print(shallow[0][0])         # 999 (Mutated!)
print(deep[0][0])            # 1 (Safe & untouched!)
```