### 1. Definition & Abstract Data Type (ADT)

A **Stack** is a linear, restricted list in which additions (push) and deletions (pop) take place exclusively at a single designated end called the **Top**. It strictly enforces **LIFO (Last-In, First-Out)** order.

### 2. Primitive Operations on Array-Based Stack
```c
#define MAX 100
int stack[MAX], top = -1;

void push(int val) {
    if (top == MAX - 1) {
        printf("Stack Overflow!
");
        return;
    }
    stack[++top] = val; // Increment top, then store value
}

int pop() {
    if (top == -1) {
        printf("Stack Underflow!
");
        return -1;
    }
    return stack[top--]; // Retrieve value, then decrement top
}

int peek() {
    if (top == -1) return -1;
    return stack[top]; // O(1) query without removal
}
```