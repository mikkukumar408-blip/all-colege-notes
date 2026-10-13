### 1. Function Argument Mechanics

Python supports 4 primary argument configurations:
1. **Positional Arguments:** Matched left-to-right by position.
2. **Keyword Arguments:** Matched explicitly by parameter name (`func(name="Alice", age=20)`).
3. **Default Arguments:** Assigned fallbacks (`def func(a, b=10)`). *Note: Mutable default argument trap (`def f(x=[])`) causes shared state; always use `None` as sentinel!*
4. **Variable-Length Arguments:**
   - `*args`: Collects excess positional arguments into a **tuple**.
   - `**kwargs`: Collects excess keyword arguments into a **dictionary**.

### 2. The LEGB Name Resolution Protocol

When an unqualified variable is referenced inside a function, Python searches 4 concentric namespaces in strict order:
1. **L (Local):** Names assigned inside the currently executing function.
2. **E (Enclosing):** Names in local scopes of enclosing functions from inner to outer (closures).
3. **G (Global):** Names assigned at the top-level of the current module file.
4. **B (Built-in):** Pre-assigned built-ins in `builtins` module (`open`, `len`, `range`, `print`).

```python
# Date and Time Formatting Operations
from datetime import datetime, timedelta

now = datetime.now()
formatted = now.strftime("%d-%B-%Y %H:%M:%S")  # e.g., '19-September-2026 16:30:00'
parsed = datetime.strptime("19-09-2026", "%d-%m-%Y")
one_week_later = now + timedelta(days=7)       # Duration arithmetic
```