### 1. Conditional Branching & Truth Value Testing

Python evaluates conditional expressions using **truthy** and **falsy** semantics.
- **Falsy Constants:** `False`, `None`, `0`, `0.0`, `""` (empty string), `[]` (empty list), `()` (empty tuple), `{}` (empty dict), `set()`.
- **Truthy Values:** Any non-zero number or non-empty sequence/collection.

### 2. Comparative Analysis: break vs continue vs pass

| Feature | `break` | `continue` | `pass` |
| :--- | :--- | :--- | :--- |
| **Action** | Terminates loop immediately | Aborts current iteration cycle | Null operation (NOP stub) |
| **Target** | First statement outside loop | Next loop cycle evaluation | Next sequential statement |
| **Loop-else Effect** | **Suppresses loop-else block!** | Loop-else executes normally | Zero effect |
| **Use Case** | Early exit upon finding item | Filtering invalid data items | Syntactic placeholder for empty code |

```python
# The for-else Search Idiom
for n in range(2, 10):
    for x in range(2, n):
        if n % x == 0:
            print(f"{n} equals {x} * {n//x}")
            break
    else:
        # Loop fell through without hitting a break!
        print(f"{n} is a prime number")
```