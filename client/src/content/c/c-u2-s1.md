### 1. C Tokens Architecture

Tokens are the atomic lexical units recognized by the C compiler. They comprise:
- **Keywords:** 32 reserved words in C89/C90 (e.g., `auto`, `volatile`, `sizeof`, `typedef`).
- **Identifiers:** User-defined symbolic names for variables and functions. Rules: Must begin with `[a-zA-Z_]`, followed by alphanumeric or underscore characters. Case-sensitive.
- **Constants:** Immutable literals (Integer literals `100`, Octal `012`, Hex `0x64`, Floating-point `3.14`, Character `'A'`, String `"Hello"`).

---

### 2. Primitive Data Types, Memory Storage & Specifiers

| Data Type | Storage in RAM | Format Specifier | Range (32-bit Architecture) | Encoding Scheme |
| :--- | :--- | :--- | :--- | :--- |
| **char** | 1 Byte (8 bits) | `%c` | -128 to 127 | ASCII / 2's Complement |
| **unsigned char** | 1 Byte | `%c`, `%u` | 0 to 255 | Pure binary magnitude |
| **int** | 4 Bytes (32 bits) | `%d`, `%i` | -2,147,483,648 to 2,147,483,647 | Signed 2's Complement |
| **unsigned int** | 4 Bytes | `%u` | 0 to 4,294,967,295 | Pure binary magnitude |
| **float** | 4 Bytes | `%f` | $\approx 3.4	\times 10^{-38}$ to $3.4	\times 10^{38}$ (6 decimals) | IEEE 754 Single Precision |
| **double** | 8 Bytes | `%lf` | $\approx 1.7	\times 10^{-308}$ to $1.7	\times 10^{308}$ (15 decimals) | IEEE 754 Double Precision |
| **void*** | 4 / 8 Bytes | `%p` | Valid Virtual Memory Addresses | Unsigned Hexadecimal |