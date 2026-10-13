### 1. Variables as Named References (Pointers)

In C, a variable is a named memory box storing raw values directly. In Python, variables are **symbolic references (pointers)** bound to dynamic heap objects:

```python
a = 256
b = 256
print(a is b)        # True (Integer interning cache for range -5 to 256)
print(id(a), id(b))  # Identical memory addresses

x = [1, 2, 3]
y = x                # y points to the SAME list object in heap
y.append(4)
print(x)             # Output: [1, 2, 3, 4] (x reflects mutation!)
```

### 2. Complete 9-Tier Operator Precedence Matrix

| Rank | Operator Group | Symbols | Associativity |
| :---: | :--- | :--- | :---: |
| **1** | Parentheses & Indexing | `()`, `[]`, `{}`, calls, slicing | Left-to-Right |
| **2** | Exponentiation | `**` | **Right-to-Left** |
| **3** | Unary Operators | `+x`, `-x`, `~x` (Bitwise NOT: `~x = -x-1`) | Right-to-Left |
| **4** | Multiplicative | `*`, `/` (float div), `//` (floor div), `%` (mod) | Left-to-Right |
| **5** | Additive | `+`, `-` | Left-to-Right |
| **6** | Bitwise Shifts | `<<`, `>>` | Left-to-Right |
| **7** | Bitwise Logic | `&` (AND) &rarr; `^` (XOR) &rarr; `&#124;` (OR) | Left-to-Right |
| **8** | Comparisons & Identity | `==`, `!=`, `<`, `>`, `<=`, `>=`, `is`, `in` | Left-to-Right |
| **9** | Boolean Logic | `not` &rarr; `and` &rarr; `or` (Short-circuit) | Left-to-Right |

> 💡 **TOPPER EXAM TIP & QUESTION BLUEPRINT:**
> **Why Python has no ++ or --:** Integers in Python are immutable heap objects. In-place increment would violate object immutability. Writing `++x` is parsed as two unary positives `+(+(x))`, evaluating to `x`. Always use `x += 1`.