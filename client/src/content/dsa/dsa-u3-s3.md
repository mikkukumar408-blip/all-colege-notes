### 1. Singly Linked List: Insertion at Beginning
```c
struct Node {
    int data;
    struct Node* next;
};

void insertAtBeginning(struct Node** head, int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = *head; // Point new node to current head
    *head = newNode;       // Update head to new node
}
```

### 2. Singly Linked List: Deleting a Node by Value
```c
void deleteNode(struct Node** head, int key) {
    struct Node *temp = *head, *prev = NULL;
    if (temp != NULL && temp->data == key) {
        *head = temp->next; // Head deleted
        free(temp);
        return;
    }
    while (temp != NULL && temp->data != key) {
        prev = temp;
        temp = temp->next;
    }
    if (temp == NULL) return; // Key not found
    prev->next = temp->next;  // Unlink target node
    free(temp);               // Free heap memory
}
```

### 3. Doubly Linked List: Insertion After Given Node
```c
void insertAfter(struct Node* prevNode, int val) {
    if (prevNode == NULL) return;
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = prevNode->next;
    newNode->prev = prevNode;
    if (prevNode->next != NULL) {
        prevNode->next->prev = newNode;
    }
    prevNode->next = newNode;
}
```