### File Stream Modes & I/O Functions

| Mode | Stream Meaning | If File Missing | If File Already Exists | Stream Functions |
| :--- | :--- | :--- | :--- | :--- |
| **`"r"`** | Read Text | Returns `NULL` error pointer | Opens file; read position at byte 0 | `fscanf()`, `fgetc()`, `fgets()` |
| **`"w"`** | Write Text | Creates a new empty file | **Truncates (erases) file to 0 bytes!** | `fprintf()`, `fputc()`, `fputs()` |
| **`"a"`** | Append Text | Creates a new empty file | Preserves data; all writes appended at EOF | `fprintf()`, `fputs()` |
| **`"r+"`** | Read & Write | Returns `NULL` error pointer | Opens file for update without truncation | `fseek()`, `ftell()`, `rewind()` |
| **`"rb"` / `"wb"`**| Binary Stream | Opens file for binary mode | No CR/LF translation; raw byte storage | `fread()`, `fwrite()` |