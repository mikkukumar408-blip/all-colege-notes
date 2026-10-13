### 8086 Segmented Memory Pointer Architecture

In 16-bit real-mode architecture (such as the 8086 microprocessor with 20-bit address bus addressing 1 MB of RAM), pointers are classified into three types:

$$\text{Physical Address} = (\text{Segment Register} \times 16) + \text{Offset}$$

| Pointer Classification | Address Width | Internal Structure | Accessible Memory Span | Key Characteristics & Comparison Rules |
| :--- | :--- | :--- | :--- | :--- |
| **Near Pointer** | **16-bit (2 Bytes)** | Offset only | **64 KB** (within default DS/CS) | Fastest address arithmetic; cannot access data outside the current 64 KB segment. |
| **Far Pointer** | **32-bit (4 Bytes)** | 16-bit Segment : 16-bit Offset | **1 MB** (Full real-mode RAM) | Can address any byte in 1 MB. **Hazard:** Addresses are unnormalized. `0x1000:0x0010` and `0x1001:0x0000` point to the identical byte, but `p1 == p2` evaluates to FALSE! |
| **Huge Pointer** | **32-bit (4 Bytes)** | Normalized Segment : Offset | **1 MB** (Full real-mode RAM) | **Auto-Normalizing:** Any offset $≥ 16$ is converted: $\text{Segment} leftarrow \text{Segment} + (\text{Offset} / 16)$ and $\text{Offset} leftarrow \text{Offset} pmod{16}$. Relational comparisons are mathematically accurate across segments. |