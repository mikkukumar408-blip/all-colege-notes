### 1. Infix, Postfix and Prefix Notations
- **Infix:** Operator placed between operands (human standard): A + B * C
- **Postfix (Reverse Polish Notation):** Operator follows operands: A B C * +
- **Prefix (Polish Notation):** Operator precedes operands: + A * B C

### 2. Operator Precedence & Associativity
1. **Parentheses (), []:** Evaluated first
2. **Exponentiation ^:** Highest precedence, **Right-to-Left** associativity
3. **Multiplication & Division *, /, %:** High precedence, **Left-to-Right**
4. **Addition & Subtraction +, -:** Lowest precedence, **Left-to-Right**

### 3. Algorithm: Infix to Postfix (Shunting-Yard)
1. Initialize an empty operator stack.
2. Scan infix token by token from Left to Right:
   - **Operand:** Append directly to output postfix expression.
   - **Left Parenthesis (:** Push onto stack.
   - **Right Parenthesis ):** Pop operators and append to output until ( is encountered; discard both parentheses.
   - **Operator op:** While stack is not empty and precedence(stack[top]) >= precedence(op) (strictly > if op is right-associative), pop and append to output. Push op onto stack.
3. Pop and append all remaining operators from stack to output.

### 4. Algorithm: Postfix Expression Evaluation
1. Scan postfix expression from Left to Right.
2. If token is an **operand**, push onto operand stack.
3. If token is an **operator**:
   - Pop op2 = pop() (Second operand popped first!).
   - Pop op1 = pop() (First operand popped second!).
   - Calculate result = op1 [operator] op2.
   - Push result back onto stack.
4. When scan completes, the single value remaining on the stack is the final expression value.