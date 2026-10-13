### 1. Complete 9-Tier File Access Modes Matrix

| Mode | Initial Cursor Position | File Existence Requirement | Truncation Behavior |
| :---: | :--- | :--- | :--- |
| `'r'` | Beginning (offset 0) | **File must exist** (raises `FileNotFoundError`) | No truncation |
| `'w'` | Beginning (offset 0) | Created automatically if absent | **Immediate truncation to 0 bytes!** |
| `'a'` | End of File (EOF) | Created automatically if absent | No truncation; all writes append |
| `'r+'` | Beginning (offset 0) | **File must exist** | Overwrites in-place from pointer |
| `'w+'` | Beginning (offset 0) | Created automatically if absent | **Truncates existing file to 0 bytes!** |
| `'a+'` | End of File (EOF) | Created automatically if absent | Writes append; reading requires `seek(0)` |

### 2. The Context Manager Protocol (`with` Statement)

Always open files using `with open(...) as f:`. It implements the context management protocol (`__enter__` and `__exit__`), guaranteeing deterministic file handle cleanup and operating system descriptor release even if unhandled runtime exceptions occur!

```python
# File Pointer Manipulation with seek() and tell()
with open("notes.txt", "w+") as f:
    f.write("Python Master Notes")
    print("Offset after writing:", f.tell())  # 19 bytes
    f.seek(0)                                 # Reposition cursor to beginning
    content = f.read()
    print("Read Content:", content)
```