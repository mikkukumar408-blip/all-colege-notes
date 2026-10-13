### University Solved Examination Problems (MMDU Pattern)

#### Question 10 (1 Mark): Dangling Pointer Remediation
**Question:** What hazard is introduced after calling `free(p);`, and how is it resolved?

**Step-by-Step Solution:**
```
Pointer p ➔ [ Address 0x5000 ] ➔ Heap block released ➔ Pointer p still retains 0x5000
```
`p` becomes a **Dangling Pointer**. Dereferencing it leads to memory corruption or crashes. Remediation: explicitly assign `p = NULL;` immediately after calling `free(p);`.

---

#### Question 20 (4 Marks): Near, Far, and Huge Pointers in 8086
**Question:** Explain Near, Far, and Huge pointers in 16-bit 8086 architecture with segment arithmetic.

**Step-by-Step Solution:**
1. **Near Pointer:** 16-bit offset. Limited to current 64 KB segment. Fast arithmetic.
2. **Far Pointer:** 32-bit (16-bit segment : 16-bit offset). Addresses full 1 MB. Unnormalized: `0x1000:0x0010` and `0x1001:0x0000` point to the same physical byte, but relational equality evaluates to false!
3. **Huge Pointer:** 32-bit auto-normalized pointer. Converts any offset $≥ 16$: $\text{Segment} leftarrow \text{Segment} + (\text{Offset} / 16)$ and $\text{Offset} leftarrow \text{Offset} pmod{16}$. Relational comparisons are mathematically accurate.

---

#### Question 23 (6 Marks): Student Records with DMA and Binary File I/O
**Question:** Design an architecture in ANSI C to dynamically allocate an array of `Student` structures on the heap, write records to `students.dat`, and read them back.

**Step-by-Step Solution:**
```c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int rollNo;
    char name[32];
    float gpa;
} Student;

void processRecords(int n) {
    // 1. Dynamic Allocation
    Student *list = (Student*)malloc(n * sizeof(Student));
    if (!list) { printf("Heap allocation failed!
"); return; }
    
    // 2. Initialize sample record
    list[0].rollNo = 101; sprintf(list[0].name, "Aman"); list[0].gpa = 8.85f;
    
    // 3. Persist to Binary File
    FILE *fp = fopen("students.dat", "wb");
    if (fp) {
        fwrite(list, sizeof(Student), n, fp);
        fclose(fp);
    }
    
    // 4. Read back into fresh heap buffer
    Student *readList = (Student*)malloc(n * sizeof(Student));
    fp = fopen("students.dat", "rb");
    if (fp) {
        fread(readList, sizeof(Student), n, fp);
        printf("Recovered: Roll %d, Name: %s, GPA: %.2f
",
               readList[0].rollNo, readList[0].name, readList[0].gpa);
        fclose(fp);
    }
    
    // 5. Clean up heap memory
    free(list); free(readList);
}
```

---

#### Question 24 (6 Marks): Function Pointers & Callback Sorting
**Question:** Explain the mechanism of Function Pointers in C by implementing a generic bubble sort that accepts a comparison callback.

**Step-by-Step Solution:**
```c
#include <stdio.h>

int ascending(int a, int b) { return a > b; }
int descending(int a, int b) { return a < b; }

void genericSort(int arr[], int n, int (*compare)(int, int)) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (compare(arr[j], arr[j + 1])) { // Dynamic callback!
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int data[] = {45, 12, 89, 34};
    genericSort(data, 4, ascending);  // Sorts [12, 34, 45, 89]
    genericSort(data, 4, descending); // Sorts [89, 45, 34, 12]
    return 0;
}
```