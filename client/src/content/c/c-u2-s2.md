### Complete 9-Tier Operator Hierarchy Master Table

| Tier | Category | Operators | Associativity | Key Exam Rules & Behaviors |
| :--- | :--- | :--- | :--- | :--- |
| **1 (Highest)** | Postfix / Subscript | `()  []  ->  .  ++  --` | Left-to-Right | Function call `()`, array subscript `[]`, and member access `->` resolve first. |
| **2** | Unary | `+  -  !  ~  ++  --  (type)  *  &  sizeof` | **Right-to-Left** | Prefix operators, address-of `&`, dereference `*`, and explicit cast evaluate right-to-left. |
| **3** | Multiplicative | `*  /  %` | Left-to-Right | Modulus `%` requires integral operands only (compiler error on floats). |
| **4** | Additive | `+  -` | Left-to-Right | Standard arithmetic addition and subtraction. |
| **5** | Relational | `<  <=  >  >=` | Left-to-Right | Yields Boolean 1 (True) or 0 (False). |
| **6** | Equality | `==  !=` | Left-to-Right | Lower precedence than relational: `a < b == c` evaluates as `(a < b) == c`. |
| **7** | Logical | `&&` (AND) then `&#124;&#124;` (OR) | Left-to-Right | **Short-Circuit:** In `A && B`, if A=0, B is skipped! In `A &#124;&#124; B`, if A=1, B is skipped! |
| **8** | Ternary Conditional | `? :` | **Right-to-Left** | `condition ? expr1 : expr2`. Nested ternaries group right-to-left. |
| **9 (Lowest)** | Assignment & Comma | `=  +=  -=  *=  /=  %=  ,` | **R-to-L** (`=`), **L-to-R** (`,`) | Comma operator evaluates left-to-right and returns rightmost expression. |