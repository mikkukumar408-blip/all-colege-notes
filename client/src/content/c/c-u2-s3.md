### 1. Implicit Type Conversion (Usual Arithmetic Conversions)

The C compiler automatically promotes lower-ranked types to higher-ranked types during binary expression evaluation to preserve precision:

```
bool ➔ char ➔ short ➔ int ➔ unsigned int ➔ long ➔ unsigned long ➔ float ➔ double ➔ long double
```

> ⚠️ **The Classic Integer Division Hazard:**
> ```c
> int a = 5, b = 2;
> float result = a / b; // result evaluates to 2.000000, NOT 2.5!
> ```
> **Root Cause:** Both `a` and `b` are integers. The compiler performs integer division (`5 / 2 = 2`), discarding the remainder before promoting the integer `2` to `float 2.000000`.

---

### 2. Explicit Typecasting

The programmer explicitly overrides default conversions using the cast operator `(target_type)expression`:

```c
int a = 5, b = 2;
float result = (float)a / b; // Promotes 'a' to float first ➔ 5.0 / 2 yields 2.500000!
```