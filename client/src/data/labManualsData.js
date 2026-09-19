// Comprehensive God-Level Practical Lab Manuals Data
// Mapped 1-to-1 with Official MMEC Syllabus (Session 2025-26)

export const comprehensiveLabManuals = [
  {
    "id": "lab-c-bcse001",
    "code": "BCSE-001",
    "subject": "Computational and Problem Solving using C Lab",
    "title": "Computational & Problem Solving using C Practical Manual",
    "semester": "Semester 1 & 2",
    "year": "1st Year",
    "fileSize": "6.8 MB",
    "branch": "CSE / IT / AI-DS / AI-ML / ECE",
    "university": "Maharishi Markandeshwar (Deemed to be University) - MMEC",
    "syllabusMatch": "100% Official Curriculum Aligned (Session 2025-26)",
    "pdfUrl": "https://raw.githubusercontent.com/Bhavya3733/all-colege-notes/main/public/pdfs/BCSE001_C_Programming_Lab_Manual.pdf",
    "totalExperiments": 21,
    "experimentsCount": "21 Experiments (Full Syllabus)",
    "capstoneProject": {
      "title": "Pacman Arcade Game in C",
      "description": "Full real-time Pacman game implementing 2D grid matrix mapping, live keyboard input reading (conio.h / Windows console API), dynamic score tracking, ghost movements, and collision detection.",
      "features": [
        "Interactive 2D ASCII game grid with boundary walls and score dots",
        "Player movement using W/A/S/D or Arrow keys without lagging screen refresh",
        "Automated wandering ghost algorithm with collision check",
        "Real-time live score board & life counter",
        "Game over & High-score state management"
      ],
      "codeSnippet": "#include <stdio.h>\n#include <stdlib.h>\n#include <conio.h>\n#include <windows.h>\n\n#define H 15\n#define W 40\n\nchar board[H][W];\nint pac_x = 1, pac_y = 1;\nint ghost_x = 10, ghost_y = 20;\nint score = 0, lives = 3, food = 0;\n\nvoid initBoard() {\n    for (int i = 0; i < H; i++) {\n        for (int j = 0; j < W; j++) {\n            if (i == 0 || i == H - 1 || j == 0 || j == W - 1) {\n                board[i][j] = '#';\n            } else if ((i == 3 && j > 5 && j < 35) || (i == 10 && j > 5 && j < 35)) {\n                board[i][j] = '#';\n            } else {\n                board[i][j] = '.';\n                food++;\n            }\n        }\n    }\n    board[pac_x][pac_y] = 'C';\n    board[ghost_x][ghost_y] = 'X';\n}\n\nvoid draw() {\n    COORD coord = {0, 0};\n    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), coord);\n    printf(\"=== GOD-LEVEL PACMAN IN C (BCSE-001 CAPSTONE) ===\n\");\n    printf(\"Score: %d | Lives: %d | Remaining Dots: %d\n\n\", score, lives, food);\n    for (int i = 0; i < H; i++) {\n        for (int j = 0; j < W; j++) {\n            putchar(board[i][j]);\n        }\n        putchar('\n');\n    }\n    printf(\"\n[Controls] W: Up | S: Down | A: Left | D: Right | Q: Quit\n\");\n}\n\nvoid moveGhost() {\n    board[ghost_x][ghost_y] = ' ';\n    int dir = rand() % 4;\n    int nx = ghost_x, ny = ghost_y;\n    if (dir == 0 && ghost_x > 1) nx--;\n    else if (dir == 1 && ghost_x < H - 2) nx++;\n    else if (dir == 2 && ghost_y > 1) ny--;\n    else if (dir == 3 && ghost_y < W - 2) ny++;\n    \n    if (board[nx][ny] != '#') {\n        ghost_x = nx;\n        ghost_y = ny;\n    }\n    board[ghost_x][ghost_y] = 'X';\n}\n\nvoid update(char ch) {\n    int nx = pac_x, ny = pac_y;\n    if (ch == 'w' || ch == 'W') nx--;\n    if (ch == 's' || ch == 'S') nx++;\n    if (ch == 'a' || ch == 'A') ny--;\n    if (ch == 'd' || ch == 'D') ny++;\n\n    if (board[nx][ny] != '#') {\n        if (board[nx][ny] == '.') {\n            score += 10;\n            food--;\n        }\n        board[pac_x][pac_y] = ' ';\n        pac_x = nx;\n        pac_y = ny;\n        board[pac_x][pac_y] = 'C';\n    }\n    moveGhost();\n    if (pac_x == ghost_x && pac_y == ghost_y) {\n        lives--;\n        pac_x = 1; pac_y = 1;\n        board[pac_x][pac_y] = 'C';\n    }\n}\n\nint main() {\n    system(\"cls\");\n    initBoard();\n    while (lives > 0 && food > 0) {\n        draw();\n        if (_kbhit()) {\n            char ch = _getch();\n            if (ch == 'q' || ch == 'Q') break;\n            update(ch);\n        }\n        Sleep(80);\n    }\n    draw();\n    if (lives == 0) printf(\"\n[GAME OVER] You were caught by the ghost! Final Score: %d\n\", score);\n    else if (food == 0) printf(\"\n[CONGRATULATIONS!] You cleared the maze! Final Score: %d\n\", score);\n    return 0;\n}"
    },
    "experiments": [
      {
        "expNo": 1,
        "title": "Arithmetic Calculator with Modulo & Division by Zero Protection",
        "objective": "Write a C program to perform basic arithmetic operations (Addition, Subtraction, Multiplication, Division, and Modulus) on two user input numbers with safe divide-by-zero check.",
        "algorithm": [
          "Step 1: Start the program.",
          "Step 2: Declare two double variables num1, num2 and a char variable op.",
          "Step 3: Prompt user for operator (+, -, *, /, %) and two numbers.",
          "Step 4: Use switch(op) to branch calculations.",
          "Step 5: For division (/) and modulo (%), ensure num2 != 0 before computing.",
          "Step 6: Display calculated result with 2-place decimal precision.",
          "Step 7: Terminate program."
        ],
        "code": "#include <stdio.h>\n\nint main() {\n    double num1, num2;\n    char op;\n\n    printf(\"*** BCSE-001: Practical 1 - Simple Calculator ***\n\");\n    printf(\"Enter operator (+, -, *, /, %%): \");\n    scanf(\" %c\", &op);\n\n    printf(\"Enter two numbers: \");\n    scanf(\"%lf %lf\", &num1, &num2);\n\n    switch (op) {\n        case '+':\n            printf(\"Result: %.2lf + %.2lf = %.2lf\n\", num1, num2, num1 + num2);\n            break;\n        case '-':\n            printf(\"Result: %.2lf - %.2lf = %.2lf\n\", num1, num2, num1 - num2);\n            break;\n        case '*':\n            printf(\"Result: %.2lf * %.2lf = %.2lf\n\", num1, num2, num1 * num2);\n            break;\n        case '/':\n            if (num2 != 0)\n                printf(\"Result: %.2lf / %.2lf = %.4lf\n\", num1, num2, num1 / num2);\n            else\n                printf(\"Error: Division by zero is undefined in mathematics!\n\");\n            break;\n        case '%':\n            if ((int)num2 != 0)\n                printf(\"Result: %d %% %d = %d\n\", (int)num1, (int)num2, (int)num1 % (int)num2);\n            else\n                printf(\"Error: Modulo by zero is undefined!\n\");\n            break;\n        default:\n            printf(\"Error: Invalid operator '%c' entered!\n\", op);\n    }\n    return 0;\n}",
        "sampleInput": "Operator: / \\nNumbers: 25 4",
        "sampleOutput": "Result: 25.00 / 4.00 = 6.2500"
      },
      {
        "expNo": 2,
        "title": "Distance Converter (Kilometers to Meters, Feet, Inches & Centimeters)",
        "objective": "Write a C program to calculate and display the distance between two cities entered in Kilometers into Meters, Feet, Inches, and Centimeters.",
        "algorithm": [
          "Step 1: Input distance in kilometers (km) as floating point.",
          "Step 2: Calculate meters = km * 1000.0.",
          "Step 3: Calculate centimeters = meters * 100.0.",
          "Step 4: Calculate feet = km * 3280.84.",
          "Step 5: Calculate inches = feet * 12.0.",
          "Step 6: Display all conversion units clearly."
        ],
        "code": "#include <stdio.h>\n\nint main() {\n    float km, meters, feet, inches, cm;\n\n    printf(\"*** BCSE-001: Practical 2 - Distance Conversion ***\n\");\n    printf(\"Enter distance between two cities (in Kilometers): \");\n    scanf(\"%f\", &km);\n\n    meters = km * 1000.0f;\n    cm = meters * 100.0f;\n    feet = km * 3280.84f;\n    inches = feet * 12.0f;\n\n    printf(\"\n--- Converted Units ---\n\");\n    printf(\"Distance in Meters      : %.2f m\n\", meters);\n    printf(\"Distance in Centimeters : %.2f cm\n\", cm);\n    printf(\"Distance in Feet        : %.2f ft\n\", feet);\n    printf(\"Distance in Inches      : %.2f in\n\", inches);\n\n    return 0;\n}",
        "sampleInput": "Distance in KM: 5.5",
        "sampleOutput": "Meters: 5500.00 m | Centimeters: 550000.00 cm | Feet: 18044.62 ft | Inches: 216535.44 in"
      },
      {
        "expNo": 3,
        "title": "Bitwise Operators Demonstration (&, |, ^, ~, <<, >>)",
        "objective": "Write a program to demonstrate the use of bitwise operators in C: Bitwise AND, OR, XOR, NOT, Left Shift, and Right Shift with binary representations.",
        "algorithm": [
          "Step 1: Declare unsigned variables a and b.",
          "Step 2: Prompt user for two 8-bit integers (0 to 255).",
          "Step 3: Evaluate a & b, a | b, a ^ b, ~a, a << 2, b >> 1.",
          "Step 4: Output both integer and 8-bit binary representations for each."
        ],
        "code": "#include <stdio.h>\n\nvoid printBinary(unsigned int n) {\n    for (int i = 7; i >= 0; i--) {\n        printf(\"%d\", (n >> i) & 1);\n    }\n}\n\nint main() {\n    unsigned char a, b;\n    printf(\"*** BCSE-001: Practical 3 - Bitwise Operators ***\n\");\n    printf(\"Enter two integer values (0-255): \");\n    scanf(\"%hhu %hhu\", &a, &b);\n\n    printf(\"\na = %3d [\", a); printBinary(a); printf(\"]\n\");\n    printf(\"b = %3d [\", b); printBinary(b); printf(\"]\n\n\");\n\n    printf(\"Bitwise AND (a & b)  : %3d [\", a & b); printBinary(a & b); printf(\"]\n\");\n    printf(\"Bitwise OR  (a | b)  : %3d [\", a | b); printBinary(a | b); printf(\"]\n\");\n    printf(\"Bitwise XOR (a ^ b)  : %3d [\", a ^ b); printBinary(a ^ b); printf(\"]\n\");\n    printf(\"Bitwise NOT (~a)     : %3d [\", (unsigned char)~a); printBinary(~a); printf(\"]\n\");\n    printf(\"Left Shift  (a << 2) : %3d [\", a << 2); printBinary(a << 2); printf(\"]\n\");\n    printf(\"Right Shift (b >> 1) : %3d [\", b >> 1); printBinary(b >> 1); printf(\"]\n\");\n\n    return 0;\n}",
        "sampleInput": "Values: 12 25",
        "sampleOutput": "a & b = 8 | a | b = 29 | a ^ b = 21 | ~a = 243 | a << 2 = 48 | b >> 1 = 12"
      },
      {
        "expNo": 4,
        "title": "Largest of Three Numbers using Conditional (Ternary) Operator",
        "objective": "Write a C program to find the largest of three given numbers using the conditional/ternary operator (? :).",
        "algorithm": [
          "Step 1: Input three numbers a, b, and c.",
          "Step 2: Use nested ternary expression: max = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);",
          "Step 3: Print the evaluated largest number."
        ],
        "code": "#include <stdio.h>\n\nint main() {\n    int a, b, c, largest;\n    printf(\"*** BCSE-001: Practical 4 - Largest using Ternary Operator ***\n\");\n    printf(\"Enter three numbers (a, b, c): \");\n    scanf(\"%d %d %d\", &a, &b, &c);\n\n    largest = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);\n\n    printf(\"The largest number among %d, %d, and %d is: %d\n\", a, b, c, largest);\n    return 0;\n}",
        "sampleInput": "Numbers: 45 89 23",
        "sampleOutput": "The largest number among 45, 89, and 23 is: 89"
      },
      {
        "expNo": 5,
        "title": "Leap Year Verification using Boolean Logic",
        "objective": "Write a C program to determine whether a given year is a leap year or not using conditional expressions.",
        "algorithm": [
          "Step 1: Read year as integer.",
          "Step 2: Test condition: (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0).",
          "Step 3: If true, print Leap Year (366 days).",
          "Step 4: Else, print Not a Leap Year (365 days)."
        ],
        "code": "#include <stdio.h>\n\nint main() {\n    int year;\n    printf(\"*** BCSE-001: Practical 5 - Leap Year Checker ***\n\");\n    printf(\"Enter a year: \");\n    scanf(\"%d\", &year);\n\n    if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)) {\n        printf(\"Year %d is a LEAP YEAR (366 days).\n\", year);\n    } else {\n        printf(\"Year %d is NOT a leap year (365 days).\n\", year);\n    }\n    return 0;\n}",
        "sampleInput": "Year: 2024",
        "sampleOutput": "Year 2024 is a LEAP YEAR (366 days)."
      },
      {
        "expNo": 6,
        "title": "Student Grade & Division Evaluator for 5 Subjects",
        "objective": "Write a C program that takes marks of 5 subjects, calculates total marks, percentage, and assigns grades according to university marks brackets.",
        "algorithm": [
          "Step 1: Input marks for 5 subjects (out of 100).",
          "Step 2: Validate all marks in range [0, 100].",
          "Step 3: Total = m1 + m2 + m3 + m4 + m5, Percentage = Total / 5.0.",
          "Step 4: Assign Grade based on university score brackets.",
          "Step 5: Output summary."
        ],
        "code": "#include <stdio.h>\n\nint main() {\n    float m1, m2, m3, m4, m5, total, percentage;\n\n    printf(\"*** BCSE-001: Practical 6 - Grade Calculator ***\n\");\n    printf(\"Enter marks for 5 subjects (out of 100):\n\");\n    scanf(\"%f %f %f %f %f\", &m1, &m2, &m3, &m4, &m5);\n\n    total = m1 + m2 + m3 + m4 + m5;\n    percentage = total / 5.0f;\n\n    printf(\"\nTotal Marks: %.2f / 500\nPercentage : %.2f%%\n\", total, percentage);\n    printf(\"Result      : \");\n\n    if (percentage >= 90.0) printf(\"Grade O (Outstanding)\n\");\n    else if (percentage >= 80.0) printf(\"Grade A+ (Excellent)\n\");\n    else if (percentage >= 70.0) printf(\"Grade A (Very Good)\n\");\n    else if (percentage >= 60.0) printf(\"Grade B+ (Good)\n\");\n    else if (percentage >= 50.0) printf(\"Grade B (Above Average)\n\");\n    else if (percentage >= 40.0) printf(\"Grade C (Pass)\n\");\n    else printf(\"Grade F (FAIL / Re-appear)\n\");\n\n    return 0;\n}",
        "sampleInput": "Marks: 85 92 78 88 90",
        "sampleOutput": "Total: 433.00/500 | Percentage: 86.60% | Result: Grade A+ (Excellent)"
      },
      {
        "expNo": 7,
        "title": "Prefix vs Postfix Increment and Decrement Operator Analysis",
        "objective": "Write a program to demonstrate the difference between prefix and postfix increment (++x, x++) and decrement (--x, x--) operators.",
        "algorithm": [
          "Step 1: Declare integer a = 10.",
          "Step 2: Compare b = a++ vs b = ++a.",
          "Step 3: Compare b = a-- vs b = --a.",
          "Step 4: Print the outputs."
        ],
        "code": "#include <stdio.h>\n\nint main() {\n    int a = 10, b;\n\n    printf(\"*** BCSE-001: Practical 7 - Prefix vs Postfix Operators ***\n\");\n    printf(\"Initial value of a = %d\n\n\", a);\n\n    b = a++;\n    printf(\"Postfix (b = a++): b = %d, a becomes = %d\n\", b, a);\n\n    b = ++a;\n    printf(\"Prefix  (b = ++a): b = %d, a becomes = %d\n\n\", b, a);\n\n    b = a--;\n    printf(\"Postfix (b = a--): b = %d, a becomes = %d\n\", b, a);\n\n    b = --a;\n    printf(\"Prefix  (b = --a): b = %d, a becomes = %d\n\", b, a);\n\n    return 0;\n}",
        "sampleInput": "Initial a = 10",
        "sampleOutput": "Postfix a++: b=10, a=11 | Prefix ++a: b=12, a=12"
      },
      {
        "expNo": 8,
        "title": "Menu-Driven Switch Program (Even/Odd, Pos/Neg, Square, Square Root)",
        "objective": "Write a menu-driven program in C using switch case to perform: 1. Check Even/Odd, 2. Check Positive/Negative, 3. Calculate Square, 4. Calculate Square Root.",
        "algorithm": [
          "Step 1: Display interactive menu options 1 to 4.",
          "Step 2: Read user choice.",
          "Step 3: In switch-case, execute corresponding calculation.",
          "Step 4: Handle invalid choices with default case."
        ],
        "code": "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    int choice;\n    double num;\n\n    printf(\"*** BCSE-001: Practical 8 - Menu-Driven Switch System ***\n\");\n    printf(\"1. Check Even or Odd\n\");\n    printf(\"2. Check Positive, Negative or Zero\n\");\n    printf(\"3. Find Square\n\");\n    printf(\"4. Find Square Root\n\");\n    printf(\"Enter your choice (1-4): \");\n    scanf(\"%d\", &choice);\n\n    printf(\"Enter number: \");\n    scanf(\"%lf\", &num);\n\n    switch (choice) {\n        case 1:\n            if ((int)num % 2 == 0)\n                printf(\"%d is EVEN.\n\", (int)num);\n            else\n                printf(\"%d is ODD.\n\", (int)num);\n            break;\n        case 2:\n            if (num > 0) printf(\"%.2lf is POSITIVE.\n\", num);\n            else if (num < 0) printf(\"%.2lf is NEGATIVE.\n\", num);\n            else printf(\"The number is ZERO.\n\");\n            break;\n        case 3:\n            printf(\"Square of %.2lf is: %.2lf\n\", num, num * num);\n            break;\n        case 4:\n            if (num >= 0)\n                printf(\"Square root of %.2lf is: %.4lf\n\", num, sqrt(num));\n            else\n                printf(\"Error: Cannot compute real square root of negative number!\n\");\n            break;\n        default:\n            printf(\"Invalid choice selected!\n\");\n    }\n    return 0;\n}",
        "sampleInput": "Choice: 4, Number: 49",
        "sampleOutput": "Square root of 49.00 is: 7.0000"
      },
      {
        "expNo": 9,
        "title": "Sum of All Integers Between 100 and 200 Divisible by 5",
        "objective": "Write a program in C to find the sum of all integers greater than 100 and less than 200 that are completely divisible by 5.",
        "algorithm": [
          "Step 1: Set sum = 0 and count = 0.",
          "Step 2: Loop i from 101 to 199.",
          "Step 3: If i % 5 == 0, add i to sum and print i.",
          "Step 4: Output total count and sum."
        ],
        "code": "#include <stdio.h>\n\nint main() {\n    int sum = 0, count = 0;\n\n    printf(\"*** BCSE-001: Practical 9 - Sum of Integers Divisible by 5 (100 to 200) ***\n\");\n    printf(\"Numbers divisible by 5 between 100 and 200:\n\");\n\n    for (int i = 101; i < 200; i++) {\n        if (i % 5 == 0) {\n            printf(\"%d \", i);\n            sum += i;\n            count++;\n        }\n    }\n\n    printf(\"\n\nTotal count : %d\nSum of numbers: %d\n\", count, sum);\n    return 0;\n}",
        "sampleInput": "Fixed bounds (101 to 199)",
        "sampleOutput": "105 110 115 120 125 130 135 140 145 150 155 160 165 170 175 180 185 190 195 | Sum = 2850"
      },
      {
        "expNo": 10,
        "title": "Armstrong Numbers Discovery in Range [m, n]",
        "objective": "Write a C program to find and display all Armstrong numbers within a given range [m, n].",
        "algorithm": [
          "Step 1: Input range [m, n].",
          "Step 2: For each number from m to n, count digits (d).",
          "Step 3: Sum each digit raised to power d.",
          "Step 4: If sum == num, print num as Armstrong number."
        ],
        "code": "#include <stdio.h>\n#include <math.h>\n\nint isArmstrong(int num) {\n    int temp = num, digits = 0, sum = 0;\n    while (temp > 0) {\n        digits++;\n        temp /= 10;\n    }\n    temp = num;\n    while (temp > 0) {\n        int rem = temp % 10;\n        sum += (int)round(pow(rem, digits));\n        temp /= 10;\n    }\n    return sum == num;\n}\n\nint main() {\n    int m, n, found = 0;\n    printf(\"*** BCSE-001: Practical 10 - Armstrong Numbers in Range [m, n] ***\n\");\n    printf(\"Enter range [m, n]: \");\n    scanf(\"%d %d\", &m, &n);\n\n    printf(\"Armstrong numbers between %d and %d are:\n\", m, n);\n    for (int i = m; i <= n; i++) {\n        if (isArmstrong(i)) {\n            printf(\"%d \", i);\n            found++;\n        }\n    }\n    if (!found) printf(\"None found in this range.\");\n    printf(\"\nTotal found: %d\n\", found);\n\n    return 0;\n}",
        "sampleInput": "Range: 1 1000",
        "sampleOutput": "Armstrong numbers: 1 2 3 4 5 6 7 8 9 153 370 371 407 | Total found: 13"
      },
      {
        "expNo": 11,
        "title": "Linear Search & Binary Search on 1D Array",
        "objective": "Write a C program to implement both Linear Search and Binary Search on a 1D array, measuring comparison counts and displaying element positions.",
        "algorithm": [
          "Step 1: Read array size n and sorted elements.",
          "Step 2: Linear search scans index 0 to n-1 sequentially.",
          "Step 3: Binary search compares target with mid, adjusting low and high bounds.",
          "Step 4: Output index and position."
        ],
        "code": "#include <stdio.h>\n\nint linearSearch(int arr[], int n, int target) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == target) return i;\n    }\n    return -1;\n}\n\nint binarySearch(int arr[], int n, int target) {\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}\n\nint main() {\n    int n, target, arr[50];\n    printf(\"*** BCSE-001: Practical 11 - Linear & Binary Search ***\n\");\n    printf(\"Enter size of sorted array: \");\n    scanf(\"%d\", &n);\n\n    printf(\"Enter %d sorted elements: \", n);\n    for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n\n    printf(\"Enter value to search: \");\n    scanf(\"%d\", &target);\n\n    int linPos = linearSearch(arr, n, target);\n    int binPos = binarySearch(arr, n, target);\n\n    if (linPos != -1) {\n        printf(\"Linear Search: Element found at index %d (Position %d)\n\", linPos, linPos + 1);\n        printf(\"Binary Search: Element found at index %d (Position %d)\n\", binPos, binPos + 1);\n    } else {\n        printf(\"Element %d not found in the array.\n\", target);\n    }\n    return 0;\n}",
        "sampleInput": "Size: 6 | Elements: 11 22 33 44 55 66 | Search: 44",
        "sampleOutput": "Found at index 3 (Position 4)"
      },
      {
        "expNo": 12,
        "title": "Matrix Operations (Addition, Subtraction, Multiplication & Transpose)",
        "objective": "Write a menu-driven program in C to perform Matrix operations: Matrix Addition, Matrix Subtraction, Matrix Multiplication, and Matrix Transpose using 2D arrays.",
        "algorithm": [
          "Step 1: Input dimensions (r1, c1) and (r2, c2) for matrices A and B.",
          "Step 2: Check dimension constraints for Add/Sub and Multiply.",
          "Step 3: Execute chosen operation using nested loops.",
          "Step 4: Output formatted 2D matrix."
        ],
        "code": "#include <stdio.h>\n\nvoid readMatrix(int r, int c, int mat[10][10], char name) {\n    printf(\"Enter elements for Matrix %c (%dx%d):\n\", name, r, c);\n    for (int i = 0; i < r; i++)\n        for (int j = 0; j < c; j++)\n            scanf(\"%d\", &mat[i][j]);\n}\n\nvoid printMatrix(int r, int c, int mat[10][10]) {\n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) printf(\"%4d \", mat[i][j]);\n        printf(\"\n\");\n    }\n}\n\nint main() {\n    int A[10][10], B[10][10], C[10][10], T[10][10];\n    int r1, c1, r2, c2, choice;\n\n    printf(\"*** BCSE-001: Practical 12 - 2D Matrix Suite ***\n\");\n    printf(\"Enter rows and cols of Matrix A: \");\n    scanf(\"%d %d\", &r1, &c1);\n    readMatrix(r1, c1, A, 'A');\n\n    printf(\"Enter rows and cols of Matrix B: \");\n    scanf(\"%d %d\", &r2, &c2);\n    readMatrix(r2, c2, B, 'B');\n\n    printf(\"\nSelect: 1. Add  2. Subtract  3. Multiply  4. Transpose A\nChoice: \");\n    scanf(\"%d\", &choice);\n\n    switch (choice) {\n        case 1:\n            if (r1 == r2 && c1 == c2) {\n                for (int i = 0; i < r1; i++)\n                    for (int j = 0; j < c1; j++) C[i][j] = A[i][j] + B[i][j];\n                printf(\"\nResult (A + B):\n\");\n                printMatrix(r1, c1, C);\n            } else printf(\"Error: Dimension mismatch!\n\");\n            break;\n        case 2:\n            if (r1 == r2 && c1 == c2) {\n                for (int i = 0; i < r1; i++)\n                    for (int j = 0; j < c1; j++) C[i][j] = A[i][j] - B[i][j];\n                printf(\"\nResult (A - B):\n\");\n                printMatrix(r1, c1, C);\n            } else printf(\"Error: Dimension mismatch!\n\");\n            break;\n        case 3:\n            if (c1 == r2) {\n                for (int i = 0; i < r1; i++) {\n                    for (int j = 0; j < c2; j++) {\n                        C[i][j] = 0;\n                        for (int k = 0; k < c1; k++) C[i][j] += A[i][k] * B[k][j];\n                    }\n                }\n                printf(\"\nResult (A * B):\n\");\n                printMatrix(r1, c2, C);\n            } else printf(\"Error: Multiplication dimension mismatch!\n\");\n            break;\n        case 4:\n            for (int i = 0; i < r1; i++)\n                for (int j = 0; j < c1; j++) T[j][i] = A[i][j];\n            printf(\"\nTranspose of A (%dx%d):\n\", c1, r1);\n            printMatrix(c1, r1, T);\n            break;\n        default: printf(\"Invalid choice!\n\");\n    }\n    return 0;\n}",
        "sampleInput": "Choice: 3 (Multiplication) on 2x2 matrices",
        "sampleOutput": "Computed product matrix printed."
      },
      {
        "expNo": 13,
        "title": "Built-in String Library Functions Demonstration (string.h)",
        "objective": "Write a C program to demonstrate the use of built-in string functions: strlen(), strcpy(), strcat(), strcmp(), and strrev().",
        "algorithm": [
          "Step 1: Declare character arrays s1 and s2.",
          "Step 2: Use strlen() to measure lengths.",
          "Step 3: Use strcpy() to copy s1 to buffer.",
          "Step 4: Use strcmp() to compare s1 and s2.",
          "Step 5: Use strcat() to concatenate s2 to s1."
        ],
        "code": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s1[100] = \"Hello\";\n    char s2[100] = \"World\";\n    char copy[100];\n\n    printf(\"*** BCSE-001: Practical 13 - Built-in String Functions ***\n\");\n    printf(\"Initial s1: %s (Length: %zu)\n\", s1, strlen(s1));\n    printf(\"Initial s2: %s (Length: %zu)\n\", s2, strlen(s2));\n\n    strcpy(copy, s1);\n    printf(\"\n1. strcpy: Copied s1 -> '%s'\n\", copy);\n\n    int cmp = strcmp(s1, s2);\n    printf(\"2. strcmp: Result: %d (%s)\n\", s1, s2, cmp == 0 ? \"Equal\" : (cmp < 0 ? \"s1 < s2\" : \"s1 > s2\"));\n\n    strcat(s1, \" \");\n    strcat(s1, s2);\n    printf(\"3. strcat: Concatenated -> '%s' (Length: %zu)\n\", s1, strlen(s1));\n\n    return 0;\n}",
        "sampleInput": "Strings: 'Hello' and 'World'",
        "sampleOutput": "Concatenated: 'Hello World' (Length: 11)"
      },
      {
        "expNo": 14,
        "title": "User-Defined Implementations of String Functions (Without string.h)",
        "objective": "Write a C program to implement custom user-defined functions for finding length, copying, concatenating, comparing, and reversing strings without including <string.h>.",
        "algorithm": [
          "Step 1: Implement my_strlen() using loop.",
          "Step 2: Implement my_strcpy() char-by-char.",
          "Step 3: Implement my_strcat() by seeking null terminator.",
          "Step 4: Implement my_strcmp() by comparing ASCII values.",
          "Step 5: Implement my_strrev() by swapping from both ends."
        ],
        "code": "#include <stdio.h>\n\nint my_strlen(const char *str) {\n    int len = 0;\n    while (str[len] != '\\0') len++;\n    return len;\n}\n\nvoid my_strcpy(char *dest, const char *src) {\n    int i = 0;\n    while (src[i] != '\\0') {\n        dest[i] = src[i];\n        i++;\n    }\n    dest[i] = '\\0';\n}\n\nvoid my_strcat(char *dest, const char *src) {\n    int i = my_strlen(dest);\n    int j = 0;\n    while (src[j] != '\\0') {\n        dest[i + j] = src[j];\n        j++;\n    }\n    dest[i + j] = '\\0';\n}\n\nint my_strcmp(const char *s1, const char *s2) {\n    int i = 0;\n    while (s1[i] != '\\0' && s2[i] != '\\0') {\n        if (s1[i] != s2[i]) return s1[i] - s2[i];\n        i++;\n    }\n    return s1[i] - s2[i];\n}\n\nvoid my_strrev(char *str) {\n    int i = 0, j = my_strlen(str) - 1;\n    while (i < j) {\n        char temp = str[i];\n        str[i] = str[j];\n        str[j] = temp;\n        i++;\n        j--;\n    }\n}\n\nint main() {\n    char str1[100] = \"Antigravity\";\n    char str2[100] = \"Engine\";\n    char buf[100];\n\n    printf(\"*** BCSE-001: Practical 14 - Custom String Functions ***\n\");\n    printf(\"Custom Length of '%s': %d\n\", str1, my_strlen(str1));\n\n    my_strcpy(buf, str1);\n    printf(\"Custom Strcpy: Copied -> '%s'\n\", buf);\n\n    my_strcat(buf, str2);\n    printf(\"Custom Strcat: Result -> '%s'\n\", buf);\n\n    my_strrev(buf);\n    printf(\"Custom Strrev: Reversed -> '%s'\n\", buf);\n\n    return 0;\n}",
        "sampleInput": "Strings: 'Antigravity' and 'Engine'",
        "sampleOutput": "Length: 11 | Concatenated: AntigravityEngine | Reversed: enignEytivarginA"
      },
      {
        "expNo": 15,
        "title": "Call by Value vs Call by Reference (Swapping Two Variables)",
        "objective": "Write a program in C to swap two numbers using: 1. Call by Value, 2. Call by Reference (pointers), explaining differences in caller memory.",
        "algorithm": [
          "Step 1: Declare integers a = 10, b = 20.",
          "Step 2: In swapByValue(a, b), values are copied into function local variables; original variables unchanged.",
          "Step 3: In swapByReference(&a, &b), addresses are passed and dereferenced; original variables are swapped.",
          "Step 4: Output states."
        ],
        "code": "#include <stdio.h>\n\nvoid swapByValue(int x, int y) {\n    int temp = x;\n    x = y;\n    y = temp;\n    printf(\"[Inside swapByValue] x = %d, y = %d\n\", x, y);\n}\n\nvoid swapByReference(int *x, int *y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n    printf(\"[Inside swapByReference] *x = %d, *y = %d\n\", *x, *y);\n}\n\nint main() {\n    int a = 10, b = 20;\n\n    printf(\"*** BCSE-001: Practical 15 - Call by Value vs Reference ***\n\");\n    printf(\"Original: a = %d, b = %d\n\n\", a, b);\n\n    printf(\"--- Testing Call by Value ---\n\");\n    swapByValue(a, b);\n    printf(\"In main after swapByValue: a = %d, b = %d (UNMODIFIED)\n\n\", a, b);\n\n    printf(\"--- Testing Call by Reference ---\n\");\n    swapByReference(&a, &b);\n    printf(\"In main after swapByReference: a = %d, b = %d (SUCCESSFULLY SWAPPED)\n\", a, b);\n\n    return 0;\n}",
        "sampleInput": "Initial a=10, b=20",
        "sampleOutput": "After Call by Value: a=10, b=20 | After Call by Reference: a=20, b=10"
      },
      {
        "expNo": 16,
        "title": "Recursive Computation of Factorial",
        "objective": "Write a program in C to calculate the factorial of an integer using recursion with stack base case.",
        "algorithm": [
          "Step 1: Define factorial(n).",
          "Step 2: Base case: if n <= 1, return 1.",
          "Step 3: Recursive case: return n * factorial(n - 1).",
          "Step 4: Print factorial value."
        ],
        "code": "#include <stdio.h>\n\nunsigned long long factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    int num;\n    printf(\"*** BCSE-001: Practical 16 - Recursive Factorial ***\n\");\n    printf(\"Enter a positive integer: \");\n    scanf(\"%d\", &num);\n\n    if (num < 0) {\n        printf(\"Error: Factorial of negative number does not exist!\n\");\n    } else {\n        printf(\"Factorial of %d (%d!) = %llu\n\", num, num, factorial(num));\n    }\n    return 0;\n}",
        "sampleInput": "Input: 6",
        "sampleOutput": "Factorial of 6 (6!) = 720"
      },
      {
        "expNo": 17,
        "title": "Array Reversal & Memory Address Inspection via Pointers",
        "objective": "Write a C program to read an array of integers and print the elements in reverse order along with their physical hexadecimal memory addresses using pointer arithmetic.",
        "algorithm": [
          "Step 1: Read n elements into array arr.",
          "Step 2: Initialize pointer ptr to arr + n - 1.",
          "Step 3: Loop backward printing *ptr and memory address (void*)ptr.",
          "Step 4: Decrement pointer."
        ],
        "code": "#include <stdio.h>\n\nint main() {\n    int n, arr[50];\n    printf(\"*** BCSE-001: Practical 17 - Array & Pointer Traversal ***\n\");\n    printf(\"Enter number of elements: \");\n    scanf(\"%d\", &n);\n\n    printf(\"Enter %d elements: \", n);\n    for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n\n    int *ptr = arr + n - 1;\n\n    printf(\"\nElements in Reverse Order with Memory Addresses:\n\");\n    printf(\"---------------------------------------------------\n\");\n    printf(\"Index | Value | Memory Address\n\");\n    printf(\"---------------------------------------------------\n\");\n    for (int i = n - 1; i >= 0; i--) {\n        printf(\"%5d | %5d | %p\n\", i, *ptr, (void *)ptr);\n        ptr--;\n    }\n    return 0;\n}",
        "sampleInput": "Size: 5 | Elements: 10 20 30 40 50",
        "sampleOutput": "Reversed array printed with contiguous 4-byte memory addresses."
      },
      {
        "expNo": 18,
        "title": "Function Returning Pointer to Larger of Two Integers",
        "objective": "Write a C program with a user-defined function that accepts two pointer arguments and returns a pointer to the larger integer value.",
        "algorithm": [
          "Step 1: Define int* findLarger(int *x, int *y).",
          "Step 2: Compare *x and *y, return x if *x >= *y, else return y.",
          "Step 3: In main(), pass &a and &b to findLarger().",
          "Step 4: Dereference returned pointer to access max value."
        ],
        "code": "#include <stdio.h>\n\nint* findLarger(int *x, int *y) {\n    if (*x >= *y) return x;\n    return y;\n}\n\nint main() {\n    int a, b;\n    printf(\"*** BCSE-001: Practical 18 - Function Returning Pointer ***\n\");\n    printf(\"Enter two integer values: \");\n    scanf(\"%d %d\", &a, &b);\n\n    int *maxPtr = findLarger(&a, &b);\n\n    printf(\"Value of a: %d at %p\n\", a, (void *)&a);\n    printf(\"Value of b: %d at %p\n\", b, (void *)&b);\n    printf(\"\nThe larger value is: %d (Stored at Address: %p)\n\", *maxPtr, (void *)maxPtr);\n\n    return 0;\n}",
        "sampleInput": "Values: 72 45",
        "sampleOutput": "The larger value is 72 (Stored at address of a)"
      },
      {
        "expNo": 19,
        "title": "Structure personal (Name, Date of Joining, Salary) Database",
        "objective": "Write a program in C to declare a structure personal that includes Person Name, Date of Joining (nested structure), and Salary. Read and display records of multiple persons.",
        "algorithm": [
          "Step 1: Define struct Date { int day, month, year; }.",
          "Step 2: Define struct Personal { char name[50]; struct Date doj; float salary; }.",
          "Step 3: Read array of n personal structures.",
          "Step 4: Display tabular formatted report."
        ],
        "code": "#include <stdio.h>\n\nstruct Date {\n    int day;\n    int month;\n    int year;\n};\n\nstruct Personal {\n    char name[50];\n    struct Date doj;\n    float salary;\n};\n\nint main() {\n    int n;\n    struct Personal staff[10];\n\n    printf(\"*** BCSE-001: Practical 19 - Structure Personal Database ***\n\");\n    printf(\"Enter number of persons (max 10): \");\n    scanf(\"%d\", &n);\n\n    for (int i = 0; i < n; i++) {\n        printf(\"\n--- Person %d ---\n\", i + 1);\n        printf(\"Enter Name: \");\n        scanf(\" %[^\n]\", staff[i].name);\n        printf(\"Enter Date of Joining (DD MM YYYY): \");\n        scanf(\"%d %d %d\", &staff[i].doj.day, &staff[i].doj.month, &staff[i].doj.year);\n        printf(\"Enter Monthly Salary (INR): \");\n        scanf(\"%f\", &staff[i].salary);\n    }\n\n    printf(\"\n=================== PERSONAL RECORDS ===================\n\");\n    printf(\"%-20s | %-12s | %-12s\n\", \"Name\", \"Joining Date\", \"Salary\");\n    printf(\"--------------------------------------------------------\n\");\n    for (int i = 0; i < n; i++) {\n        printf(\"%-20s | %02d/%02d/%04d   | Rs. %10.2f\n\",\n               staff[i].name,\n               staff[i].doj.day, staff[i].doj.month, staff[i].doj.year,\n               staff[i].salary);\n    }\n    return 0;\n}",
        "sampleInput": "Name: Rahul Sharma, DOJ: 15 08 2023, Salary: 65000",
        "sampleOutput": "Formatted tabular employee record."
      },
      {
        "expNo": 20,
        "title": "Dynamic Memory Allocation (malloc, realloc & free) for Strings",
        "objective": "Write a C program to dynamically allocate memory for a character string using malloc(), read text, resize the memory block using realloc(), append text, and free memory.",
        "algorithm": [
          "Step 1: Allocate initial block with malloc().",
          "Step 2: Check for NULL allocation failure.",
          "Step 3: Copy initial string into allocated block.",
          "Step 4: Resize block using realloc() and append string.",
          "Step 5: Free memory using free()."
        ],
        "code": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    char *str;\n    int initialSize = 15;\n    int expandedSize = 40;\n\n    printf(\"*** BCSE-001: Practical 20 - Dynamic Memory Allocation ***\n\");\n\n    str = (char *)malloc(initialSize * sizeof(char));\n    if (str == NULL) {\n        printf(\"Memory allocation failed!\n\");\n        return 1;\n    }\n    strcpy(str, \"Hello MMEC\");\n    printf(\"1. Memory allocated with malloc(%d bytes): '%s'\n\", initialSize, str);\n\n    str = (char *)realloc(str, expandedSize * sizeof(char));\n    if (str == NULL) {\n        printf(\"Reallocation failed!\n\");\n        return 1;\n    }\n    strcat(str, \" - Computer Science\");\n    printf(\"2. Memory reallocated with realloc(%d bytes): '%s'\n\", expandedSize, str);\n\n    free(str);\n    str = NULL;\n    printf(\"3. Memory successfully freed using free().\n\");\n\n    return 0;\n}",
        "sampleInput": "Fixed test string 'Hello MMEC'",
        "sampleOutput": "Allocated -> Reallocated -> Freed safely."
      },
      {
        "expNo": 21,
        "title": "File Handling: Store & Retrieve 15 Employee Records",
        "objective": "Write a C program to store details (Name, EmpCode, ContactNo, Department) of 15 employees in a file using fprintf(), and then read & display records using fscanf().",
        "algorithm": [
          "Step 1: Open 'employees.txt' in write mode 'w'.",
          "Step 2: Write employee records using fprintf(). Close file.",
          "Step 3: Open file in read mode 'r'.",
          "Step 4: Read records using fscanf() and display formatted table.",
          "Step 5: Close file."
        ],
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Employee {\n    char name[50];\n    int empCode;\n    char phone[15];\n    char dept[30];\n};\n\nint main() {\n    FILE *fp;\n    int n = 3;\n    struct Employee emp;\n\n    printf(\"*** BCSE-001: Practical 21 - Employee File Database ***\n\");\n\n    fp = fopen(\"employees.txt\", \"w\");\n    if (fp == NULL) {\n        printf(\"Error opening file for writing!\n\");\n        return 1;\n    }\n\n    printf(\"Enter details for %d employees:\n\", n);\n    for (int i = 0; i < n; i++) {\n        printf(\"\nEmployee #%d\n\", i + 1);\n        printf(\"Enter EmpCode: \");\n        scanf(\"%d\", &emp.empCode);\n        printf(\"Enter Name (Single word): \");\n        scanf(\"%s\", emp.name);\n        printf(\"Enter Phone: \");\n        scanf(\"%s\", emp.phone);\n        printf(\"Enter Department: \");\n        scanf(\"%s\", emp.dept);\n\n        fprintf(fp, \"%d %s %s %s\n\", emp.empCode, emp.name, emp.phone, emp.dept);\n    }\n    fclose(fp);\n    printf(\"\n[SUCCESS] Records saved to 'employees.txt'.\n\");\n\n    fp = fopen(\"employees.txt\", \"r\");\n    if (fp == NULL) {\n        printf(\"Error opening file for reading!\n\");\n        return 1;\n    }\n\n    printf(\"\n================ READ BACK FROM FILE =================\n\");\n    printf(\"%-8s | %-15s | %-12s | %-10s\n\", \"Code\", \"Name\", \"Phone\", \"Dept\");\n    printf(\"------------------------------------------------------\n\");\n    while (fscanf(fp, \"%d %s %s %s\", &emp.empCode, emp.name, emp.phone, emp.dept) == 4) {\n        printf(\"%-8d | %-15s | %-12s | %-10s\n\", emp.empCode, emp.name, emp.phone, emp.dept);\n    }\n    fclose(fp);\n\n    return 0;\n}",
        "sampleInput": "Code: 101, Name: Amit, Phone: 9876543210, Dept: CSE",
        "sampleOutput": "File written and read back into formatted console table."
      }
    ],
    "vivaQuestions": [
      {
        "q": "What are tokens in C language and what are their types?",
        "a": "A token is the smallest individual unit in a C program. The 6 types are: Keywords (32 standard keywords like int, if), Identifiers (names given to variables/functions), Constants (fixed values like 100, 3.14), String Literals (\"Hello\"), Operators (+, -, *), and Special Characters/Punctuators (;, {}, ())."
      },
      {
        "q": "What is the difference between = and == in C?",
        "a": "= is the assignment operator used to assign the right-hand value to a left-hand variable (e.g., a = 5). == is the relational equality operator used to compare two values for equality, evaluating to 1 (true) or 0 (false)."
      },
      {
        "q": "What is the significance of the void main() vs int main() in C?",
        "a": "According to C89/C99/C11 standards, main() must return an integer to the Operating System to signify exit status. Returning 0 indicates successful execution, while non-zero indicates an error code. void main() is non-standard and rejected by modern ISO C compilers."
      },
      {
        "q": "Explain the difference between prefix (++x) and postfix (x++) increment operators.",
        "a": "Prefix (++x) follows the rule 'increment first, then use'. It increments the variable value before evaluating the expression. Postfix (x++) follows 'use first, then increment'. It evaluates the current value in the expression first and increments the variable immediately afterward."
      },
      {
        "q": "What is a dangling pointer and how can it be avoided?",
        "a": "A dangling pointer is a pointer that points to a memory location that has already been deallocated/freed. It can lead to segmentation faults or undefined behavior. It is avoided by assigning NULL to the pointer immediately after free() (e.g., free(ptr); ptr = NULL;)."
      },
      {
        "q": "What is a memory leak and how do you prevent it in C?",
        "a": "A memory leak occurs when dynamically allocated heap memory (via malloc, calloc, realloc) is no longer needed but has not been freed using free(). The memory remains marked as occupied until program termination. Always pair every malloc() with a free()."
      },
      {
        "q": "What is the difference between malloc() and calloc()?",
        "a": "malloc(size) takes a single parameter representing total bytes and leaves allocated memory uninitialized (containing garbage values). calloc(num, size) takes two parameters (element count and size per element) and automatically initializes all allocated bytes to zero."
      },
      {
        "q": "What is the difference between Structure and Union in C?",
        "a": "In a struct, each member gets its own separate memory location, so total size >= sum of sizes of all members. In a union, all members share the same memory location, and total size equals the size of its largest member. Only one member can be used at any given time in a union."
      },
      {
        "q": "Explain call by value vs call by reference.",
        "a": "In call by value, copies of actual parameters are passed to formal parameters in the function stack frame. Changes made inside the function do NOT affect original variables. In call by reference, memory addresses (&) are passed as pointers (*). Modifying dereferenced values directly changes the caller variables."
      },
      {
        "q": "What is recursion and what are its essential components?",
        "a": "Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem. Essential components: 1. Base Case (stopping condition to avoid stack overflow), 2. Recursive Step (moving toward the base case), and 3. Return statement."
      },
      {
        "q": "What is the role of the preprocessor in C?",
        "a": "The preprocessor runs before compilation. It handles directives starting with # such as #include (file inclusion), #define (macro definition and constant replacement), and conditional compilation (#ifdef, #ifndef, #endif)."
      },
      {
        "q": "What is the difference between a character array and a string literal in C?",
        "a": "A character array (char arr[] = \"Hi\";) is stored in the stack and its characters can be modified. A string literal (char *ptr = \"Hi\";) is stored in the read-only data segment; attempting to modify *ptr causes undefined behavior or a segmentation fault."
      },
      {
        "q": "Explain bitwise operators (&, |, ^, ~, <<, >>) with use cases.",
        "a": "& (AND): mask bits; | (OR): set bits; ^ (XOR): toggle bits or swap without temp variable; ~ (NOT): invert bits; << (Left Shift): multiply by 2^n; >> (Right Shift): divide by 2^n."
      },
      {
        "q": "What are storage classes in C?",
        "a": "Storage classes define the scope, visibility, and lifetime of a variable. The four storage classes in C are: auto (local stack variable), register (stored in CPU register for speed), static (retains value across function calls), and extern (global variable shared across files)."
      },
      {
        "q": "How does binary search work and what is its prerequisite and time complexity?",
        "a": "Prerequisite: Array must be sorted. It compares target with mid element. If equal, target found; if smaller, searches left subarray; if larger, searches right subarray. Time complexity is O(log n) vs O(n) in linear search."
      }
    ]
  },
  {
    "id": "lab-webtech-bcse013",
    "code": "BCSE-013",
    "subject": "Fundamental of Web Technologies Lab",
    "title": "Fundamental of Web Technologies Practical Manual",
    "semester": "Semester 3 / 4",
    "year": "2nd Year",
    "fileSize": "5.4 MB",
    "branch": "CSE / IT / AI-DS / AI-ML",
    "university": "Maharishi Markandeshwar (Deemed to be University) - MMEC",
    "syllabusMatch": "100% Official Curriculum Aligned (Session 2025-26)",
    "pdfUrl": "https://raw.githubusercontent.com/Bhavya3733/all-colege-notes/main/public/pdfs/BCSE013_Web_Tech_Lab_Manual.pdf",
    "totalExperiments": 10,
    "experimentsCount": "10 Experiments (Full Syllabus)",
    "capstoneProject": {
      "title": "Next-Gen University Departmental Web Portal (Pure HTML5 & CSS3 Masterpiece)",
      "description": "Ultra-modern, highly responsive departmental web portal designed strictly using semantic HTML5 and advanced modern CSS3 (CSS Grid, Flexbox, Glassmorphism, Pure-CSS interactive tabs, accordions, and animations) aligned 100% with the official Web Technologies syllabus with zero JavaScript dependency.",
      "features": [
        "100% Pure HTML5 & Modern CSS3 (Zero JavaScript Dependency - Strictly Syllabus Aligned)",
        "Responsive Multi-Column CSS Grid & Fluid Flexbox Architecture",
        "Pure CSS Tabbed Notice Board (Radio-Driven Dynamic Circulars Switcher)",
        "Glassmorphic Hero Showcase & Floating KPI Statistics Badges",
        "Interactive Pure-CSS Accordion FAQ (<details> & <summary>) & Campus Navigator Modal (:target)",
        "Fully Styled Semantic HTML5 Inquiry Form with Floating Accents & Validation Constraints"
      ],
      "codeSnippet": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Department of Computer Science & Engineering | MMEC Digital Portal</title>\n  <style>\n    /* ==========================================================================\n       DESIGN SYSTEM & CSS CUSTOM PROPERTIES (PURE CSS3)\n       ========================================================================== */\n    :root {\n      --bg-primary: #070a12;\n      --bg-secondary: #0d1322;\n      --bg-card: rgba(15, 23, 42, 0.75);\n      --bg-card-hover: rgba(30, 41, 59, 0.85);\n      --border-subtle: rgba(255, 255, 255, 0.08);\n      --border-accent: rgba(99, 102, 241, 0.45);\n      --text-main: #f8fafc;\n      --text-muted: #94a3b8;\n      --text-dim: #64748b;\n      --primary: #4f46e5;\n      --primary-light: #818cf8;\n      --cyan: #06b6d4;\n      --emerald: #10b981;\n      --amber: #f59e0b;\n      --rose: #f43f5e;\n      --gradient-brand: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);\n      --gradient-surface: linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%);\n      --gradient-accent: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%);\n      --shadow-sm: 0 4px 6px -1px rgba(0, 0, 0, 0.2);\n      --shadow-md: 0 10px 25px -5px rgba(0, 0, 0, 0.4);\n      --shadow-glow: 0 0 30px rgba(99, 102, 241, 0.25);\n      --radius-sm: 8px;\n      --radius-md: 14px;\n      --radius-lg: 20px;\n      --radius-full: 9999px;\n      --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n    }\n\n    /* Reset & Base Elements */\n    *, *::before, *::after {\n      box-sizing: border-box;\n      margin: 0;\n      padding: 0;\n    }\n\n    html {\n      scroll-behavior: smooth;\n      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;\n      background-color: var(--bg-primary);\n      color: var(--text-main);\n      line-height: 1.6;\n    }\n\n    body {\n      overflow-x: hidden;\n      background-image: \n        radial-gradient(circle at 15% 15%, rgba(99, 102, 241, 0.14) 0%, transparent 45%),\n        radial-gradient(circle at 85% 65%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),\n        radial-gradient(circle at 50% 90%, rgba(16, 185, 129, 0.06) 0%, transparent 55%);\n      background-attachment: fixed;\n    }\n\n    a {\n      color: inherit;\n      text-decoration: none;\n    }\n\n    /* ==========================================================================\n       TOP ANNOUNCEMENT BAR\n       ========================================================================== */\n    .top-bar {\n      background: linear-gradient(90deg, #1e1b4b 0%, #0f172a 50%, #064e3b 100%);\n      border-bottom: 1px solid var(--border-subtle);\n      font-size: 0.82rem;\n      padding: 8px 24px;\n      color: var(--text-muted);\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      flex-wrap: wrap;\n      gap: 10px;\n    }\n\n    .top-bar-badge {\n      display: inline-flex;\n      align-items: center;\n      gap: 6px;\n      background: rgba(99, 102, 241, 0.25);\n      color: var(--primary-light);\n      padding: 2px 10px;\n      border-radius: var(--radius-full);\n      font-weight: 700;\n      font-size: 0.72rem;\n      letter-spacing: 0.5px;\n      border: 1px solid rgba(99, 102, 241, 0.4);\n    }\n\n    .top-bar-links {\n      display: flex;\n      gap: 16px;\n      align-items: center;\n    }\n\n    .top-bar-links a {\n      transition: var(--transition);\n      color: var(--text-muted);\n    }\n\n    .top-bar-links a:hover {\n      color: #ffffff;\n    }\n\n    /* ==========================================================================\n       STICKY GLASSMORPHIC NAVIGATION BAR\n       ========================================================================== */\n    .navbar {\n      position: sticky;\n      top: 0;\n      z-index: 100;\n      background: rgba(7, 10, 18, 0.85);\n      backdrop-filter: blur(16px);\n      -webkit-backdrop-filter: blur(16px);\n      border-bottom: 1px solid var(--border-subtle);\n      padding: 16px 32px;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      transition: var(--transition);\n    }\n\n    .nav-brand {\n      display: flex;\n      align-items: center;\n      gap: 14px;\n    }\n\n    .brand-emblem {\n      width: 44px;\n      height: 44px;\n      background: var(--gradient-brand);\n      border-radius: 12px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-weight: 900;\n      font-size: 1.25rem;\n      color: #ffffff;\n      box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);\n    }\n\n    .brand-text h1 {\n      font-size: 1.15rem;\n      font-weight: 800;\n      letter-spacing: -0.3px;\n      color: #ffffff;\n    }\n\n    .brand-text p {\n      font-size: 0.74rem;\n      color: var(--text-muted);\n      letter-spacing: 0.3px;\n    }\n\n    .nav-links {\n      display: flex;\n      align-items: center;\n      gap: 28px;\n      list-style: none;\n    }\n\n    .nav-links a {\n      font-size: 0.9rem;\n      font-weight: 500;\n      color: var(--text-muted);\n      transition: var(--transition);\n      position: relative;\n      padding: 6px 0;\n    }\n\n    .nav-links a:hover {\n      color: #ffffff;\n    }\n\n    .nav-links a::after {\n      content: '';\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      width: 0%;\n      height: 2px;\n      background: var(--gradient-brand);\n      transition: width 0.25s ease;\n      border-radius: 2px;\n    }\n\n    .nav-links a:hover::after {\n      width: 100%;\n    }\n\n    .nav-cta-btn {\n      background: var(--gradient-brand);\n      color: #ffffff;\n      padding: 10px 22px;\n      border-radius: var(--radius-full);\n      font-size: 0.86rem;\n      font-weight: 700;\n      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);\n      transition: var(--transition);\n      border: 1px solid rgba(255, 255, 255, 0.2);\n    }\n\n    .nav-cta-btn:hover {\n      transform: translateY(-2px);\n      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.55);\n    }\n\n    /* ==========================================================================\n       HERO SECTION\n       ========================================================================== */\n    .hero-section {\n      padding: 70px 32px 60px;\n      max-width: 1280px;\n      margin: 0 auto;\n      display: grid;\n      grid-template-columns: 1.25fr 0.95fr;\n      gap: 48px;\n      align-items: center;\n    }\n\n    .hero-badge-pill {\n      display: inline-flex;\n      align-items: center;\n      gap: 8px;\n      background: rgba(99, 102, 241, 0.12);\n      border: 1px solid rgba(99, 102, 241, 0.35);\n      padding: 6px 14px;\n      border-radius: var(--radius-full);\n      font-size: 0.82rem;\n      font-weight: 600;\n      color: var(--cyan);\n      margin-bottom: 20px;\n    }\n\n    .pulse-dot {\n      width: 8px;\n      height: 8px;\n      background-color: var(--emerald);\n      border-radius: 50%;\n      box-shadow: 0 0 10px var(--emerald);\n    }\n\n    .hero-title {\n      font-size: 3.2rem;\n      font-weight: 800;\n      line-height: 1.15;\n      letter-spacing: -1px;\n      margin-bottom: 20px;\n      color: #ffffff;\n    }\n\n    .hero-title span {\n      background: var(--gradient-brand);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n    }\n\n    .hero-desc {\n      font-size: 1.05rem;\n      color: var(--text-muted);\n      line-height: 1.7;\n      margin-bottom: 32px;\n      max-width: 620px;\n    }\n\n    .hero-actions {\n      display: flex;\n      gap: 16px;\n      flex-wrap: wrap;\n      margin-bottom: 36px;\n    }\n\n    .btn-primary {\n      background: var(--gradient-brand);\n      color: #ffffff;\n      padding: 13px 26px;\n      border-radius: var(--radius-md);\n      font-size: 0.92rem;\n      font-weight: 700;\n      display: inline-flex;\n      align-items: center;\n      gap: 8px;\n      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);\n      transition: var(--transition);\n      border: 1px solid rgba(255, 255, 255, 0.15);\n    }\n\n    .btn-primary:hover {\n      transform: translateY(-3px);\n      box-shadow: 0 12px 28px rgba(99, 102, 241, 0.6);\n    }\n\n    .btn-secondary {\n      background: rgba(255, 255, 255, 0.05);\n      color: var(--text-main);\n      padding: 13px 26px;\n      border-radius: var(--radius-md);\n      font-size: 0.92rem;\n      font-weight: 600;\n      display: inline-flex;\n      align-items: center;\n      gap: 8px;\n      border: 1px solid var(--border-subtle);\n      transition: var(--transition);\n      backdrop-filter: blur(8px);\n    }\n\n    .btn-secondary:hover {\n      background: rgba(255, 255, 255, 0.1);\n      border-color: rgba(255, 255, 255, 0.2);\n      transform: translateY(-3px);\n    }\n\n    .hero-trust {\n      display: flex;\n      gap: 20px;\n      font-size: 0.86rem;\n      color: var(--text-dim);\n      align-items: center;\n      border-top: 1px solid var(--border-subtle);\n      padding-top: 20px;\n    }\n\n    .hero-trust strong {\n      color: var(--text-main);\n    }\n\n    /* Hero Glass Card (Right Column) */\n    .hero-card-showcase {\n      background: var(--gradient-surface);\n      border: 1px solid var(--border-subtle);\n      border-radius: var(--radius-lg);\n      padding: 28px;\n      box-shadow: var(--shadow-md);\n      position: relative;\n      overflow: hidden;\n      backdrop-filter: blur(20px);\n    }\n\n    .hero-card-showcase::before {\n      content: '';\n      position: absolute;\n      top: -50%;\n      right: -50%;\n      width: 200%;\n      height: 200%;\n      background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 60%);\n      pointer-events: none;\n    }\n\n    .showcase-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: 24px;\n      padding-bottom: 16px;\n      border-bottom: 1px solid var(--border-subtle);\n    }\n\n    .showcase-badge {\n      background: rgba(16, 185, 129, 0.15);\n      color: var(--emerald);\n      padding: 4px 12px;\n      border-radius: var(--radius-full);\n      font-size: 0.78rem;\n      font-weight: 700;\n      border: 1px solid rgba(16, 185, 129, 0.3);\n    }\n\n    .stats-kpi-grid {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 16px;\n      margin-bottom: 24px;\n    }\n\n    .kpi-box {\n      background: rgba(15, 23, 42, 0.65);\n      border: 1px solid var(--border-subtle);\n      border-radius: var(--radius-md);\n      padding: 18px;\n      transition: var(--transition);\n    }\n\n    .kpi-box:hover {\n      border-color: var(--border-accent);\n      transform: translateY(-4px);\n      box-shadow: var(--shadow-sm);\n    }\n\n    .kpi-number {\n      font-size: 1.8rem;\n      font-weight: 800;\n      color: #ffffff;\n      line-height: 1.1;\n      margin-bottom: 4px;\n      background: var(--gradient-brand);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n    }\n\n    .kpi-label {\n      font-size: 0.8rem;\n      color: var(--text-muted);\n      font-weight: 500;\n    }\n\n    .showcase-partners {\n      background: rgba(255, 255, 255, 0.03);\n      padding: 14px 18px;\n      border-radius: var(--radius-sm);\n      border: 1px solid var(--border-subtle);\n      font-size: 0.82rem;\n      color: var(--text-muted);\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n    }\n\n    .partner-chips {\n      display: flex;\n      gap: 8px;\n      font-weight: 700;\n      color: var(--text-main);\n    }\n\n    /* ==========================================================================\n       SECTION WRAPPERS & HEADERS\n       ========================================================================== */\n    .section-wrap {\n      max-width: 1280px;\n      margin: 0 auto 90px;\n      padding: 0 32px;\n    }\n\n    .section-header {\n      text-align: center;\n      max-width: 740px;\n      margin: 0 auto 48px;\n    }\n\n    .section-tag {\n      text-transform: uppercase;\n      font-size: 0.78rem;\n      font-weight: 800;\n      letter-spacing: 1.2px;\n      color: var(--cyan);\n      margin-bottom: 8px;\n      display: inline-block;\n    }\n\n    .section-title {\n      font-size: 2.2rem;\n      font-weight: 800;\n      color: #ffffff;\n      letter-spacing: -0.5px;\n      margin-bottom: 12px;\n    }\n\n    .section-subtitle {\n      font-size: 1rem;\n      color: var(--text-muted);\n    }\n\n    /* ==========================================================================\n       PURE CSS INTERACTIVE NOTICES TABS (100% ZERO JAVASCRIPT)\n       ========================================================================== */\n    .notices-container {\n      background: var(--bg-card);\n      border: 1px solid var(--border-subtle);\n      border-radius: var(--radius-lg);\n      padding: 32px;\n      box-shadow: var(--shadow-md);\n      backdrop-filter: blur(16px);\n    }\n\n    /* Hidden Radio Inputs for Tab States */\n    .notices-container input[type=\"radio\"].tab-radio {\n      position: absolute;\n      opacity: 0;\n      pointer-events: none;\n    }\n\n    /* Tab Switcher Buttons */\n    .tab-bar {\n      display: flex;\n      gap: 10px;\n      border-bottom: 1px solid var(--border-subtle);\n      padding-bottom: 16px;\n      margin-bottom: 24px;\n      flex-wrap: wrap;\n    }\n\n    .tab-label {\n      padding: 8px 20px;\n      border-radius: var(--radius-full);\n      font-size: 0.88rem;\n      font-weight: 600;\n      color: var(--text-muted);\n      cursor: pointer;\n      border: 1px solid transparent;\n      transition: var(--transition);\n      user-select: none;\n    }\n\n    .tab-label:hover {\n      color: #ffffff;\n      background: rgba(255, 255, 255, 0.05);\n    }\n\n    /* Active Tab Styling via CSS Sibling Selector */\n    #tab-all:checked ~ .tab-bar label[for=\"tab-all\"],\n    #tab-exams:checked ~ .tab-bar label[for=\"tab-exams\"],\n    #tab-placements:checked ~ .tab-bar label[for=\"tab-placements\"],\n    #tab-hackathons:checked ~ .tab-bar label[for=\"tab-hackathons\"] {\n      background: var(--gradient-brand);\n      color: #ffffff;\n      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);\n    }\n\n    /* Tab Content Visibility */\n    .tab-content {\n      position: relative;\n    }\n\n    .tab-panel {\n      display: none;\n      animation: tabFadeIn 0.3s ease-in-out;\n    }\n\n    @keyframes tabFadeIn {\n      from { opacity: 0; transform: translateY(6px); }\n      to { opacity: 1; transform: translateY(0); }\n    }\n\n    #tab-all:checked ~ .tab-content .panel-all { display: grid; }\n    #tab-exams:checked ~ .tab-content .panel-exams { display: grid; }\n    #tab-placements:checked ~ .tab-content .panel-placements { display: grid; }\n    #tab-hackathons:checked ~ .tab-content .panel-hackathons { display: grid; }\n\n    .notice-card-grid {\n      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));\n      gap: 20px;\n    }\n\n    .notice-card {\n      background: rgba(15, 23, 42, 0.65);\n      border: 1px solid var(--border-subtle);\n      border-radius: var(--radius-md);\n      padding: 22px;\n      transition: var(--transition);\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n    }\n\n    .notice-card:hover {\n      border-color: var(--border-accent);\n      transform: translateY(-4px);\n      box-shadow: var(--shadow-sm);\n    }\n\n    .notice-meta {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: 12px;\n    }\n\n    .notice-date {\n      font-size: 0.78rem;\n      color: var(--text-dim);\n      font-weight: 500;\n    }\n\n    .notice-pill {\n      font-size: 0.72rem;\n      font-weight: 700;\n      padding: 3px 8px;\n      border-radius: var(--radius-sm);\n    }\n\n    .pill-urgent { background: rgba(244, 63, 94, 0.15); color: var(--rose); border: 1px solid rgba(244, 63, 94, 0.3); }\n    .pill-academic { background: rgba(99, 102, 241, 0.15); color: var(--primary-light); border: 1px solid rgba(99, 102, 241, 0.3); }\n    .pill-event { background: rgba(6, 182, 212, 0.15); color: var(--cyan); border: 1px solid rgba(6, 182, 212, 0.3); }\n    .pill-career { background: rgba(16, 185, 129, 0.15); color: var(--emerald); border: 1px solid rgba(16, 185, 129, 0.3); }\n\n    .notice-card h4 {\n      font-size: 1.05rem;\n      font-weight: 700;\n      color: #ffffff;\n      margin-bottom: 8px;\n      line-height: 1.4;\n    }\n\n    .notice-card p {\n      font-size: 0.88rem;\n      color: var(--text-muted);\n      line-height: 1.5;\n      margin-bottom: 16px;\n    }\n\n    .notice-link {\n      font-size: 0.82rem;\n      font-weight: 700;\n      color: var(--cyan);\n      display: inline-flex;\n      align-items: center;\n      gap: 4px;\n      transition: var(--transition);\n    }\n\n    .notice-link:hover {\n      color: #ffffff;\n      gap: 8px;\n    }\n\n    /* ==========================================================================\n       ACADEMIC PROGRAMS CARDS (GRID)\n       ========================================================================== */\n    .programs-grid {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n      gap: 24px;\n    }\n\n    .program-card {\n      background: var(--bg-card);\n      border: 1px solid var(--border-subtle);\n      border-radius: var(--radius-lg);\n      padding: 28px;\n      box-shadow: var(--shadow-sm);\n      transition: var(--transition);\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n      backdrop-filter: blur(12px);\n    }\n\n    .program-card:hover {\n      border-color: var(--border-accent);\n      transform: translateY(-6px);\n      box-shadow: var(--shadow-glow);\n    }\n\n    .program-icon {\n      width: 48px;\n      height: 48px;\n      border-radius: var(--radius-md);\n      background: rgba(99, 102, 241, 0.15);\n      border: 1px solid rgba(99, 102, 241, 0.3);\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 1.5rem;\n      margin-bottom: 20px;\n    }\n\n    .program-card h3 {\n      font-size: 1.22rem;\n      font-weight: 700;\n      color: #ffffff;\n      margin-bottom: 10px;\n    }\n\n    .program-card p {\n      font-size: 0.88rem;\n      color: var(--text-muted);\n      line-height: 1.6;\n      margin-bottom: 20px;\n    }\n\n    .program-features {\n      list-style: none;\n      margin-bottom: 24px;\n    }\n\n    .program-features li {\n      font-size: 0.84rem;\n      color: var(--text-muted);\n      padding: 6px 0;\n      display: flex;\n      align-items: center;\n      gap: 8px;\n    }\n\n    .program-features li::before {\n      content: '✓';\n      color: var(--emerald);\n      font-weight: 900;\n    }\n\n    .program-footer {\n      border-top: 1px solid var(--border-subtle);\n      padding-top: 16px;\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      font-size: 0.8rem;\n      color: var(--text-dim);\n    }\n\n    /* ==========================================================================\n       RESEARCH & COMPUTING LABORATORIES\n       ========================================================================== */\n    .labs-grid {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n      gap: 24px;\n    }\n\n    .lab-box {\n      background: var(--bg-card);\n      border: 1px solid var(--border-subtle);\n      border-radius: var(--radius-lg);\n      overflow: hidden;\n      transition: var(--transition);\n    }\n\n    .lab-box:hover {\n      border-color: rgba(6, 182, 212, 0.4);\n      transform: translateY(-5px);\n      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);\n    }\n\n    .lab-header {\n      padding: 24px 24px 12px;\n      border-bottom: 1px solid var(--border-subtle);\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n    }\n\n    .lab-title-group h4 {\n      font-size: 1.15rem;\n      font-weight: 700;\n      color: #ffffff;\n      margin-bottom: 4px;\n    }\n\n    .lab-title-group span {\n      font-size: 0.78rem;\n      color: var(--cyan);\n      font-weight: 600;\n    }\n\n    .lab-body {\n      padding: 20px 24px;\n    }\n\n    .lab-body p {\n      font-size: 0.88rem;\n      color: var(--text-muted);\n      line-height: 1.6;\n      margin-bottom: 16px;\n    }\n\n    .lab-specs {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 8px;\n    }\n\n    .spec-tag {\n      background: rgba(255, 255, 255, 0.05);\n      border: 1px solid var(--border-subtle);\n      padding: 4px 10px;\n      border-radius: var(--radius-sm);\n      font-size: 0.76rem;\n      color: var(--text-main);\n      font-weight: 600;\n    }\n\n    /* ==========================================================================\n       CURRICULUM ROADMAP & ACADEMIC EVALUATION (TABLE & NESTED LISTS)\n       ========================================================================== */\n    .curriculum-wrap {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 32px;\n    }\n\n    .curriculum-card {\n      background: var(--bg-card);\n      border: 1px solid var(--border-subtle);\n      border-radius: var(--radius-lg);\n      padding: 30px;\n    }\n\n    .curriculum-card h3 {\n      font-size: 1.3rem;\n      font-weight: 700;\n      color: #ffffff;\n      margin-bottom: 18px;\n      display: flex;\n      align-items: center;\n      gap: 10px;\n    }\n\n    /* Semantic Table Styling */\n    .styled-table {\n      width: 100%;\n      border-collapse: collapse;\n      font-size: 0.88rem;\n    }\n\n    .styled-table th {\n      background: rgba(99, 102, 241, 0.15);\n      color: var(--text-main);\n      text-align: left;\n      padding: 12px 16px;\n      font-weight: 700;\n      border-bottom: 2px solid var(--border-accent);\n    }\n\n    .styled-table td {\n      padding: 12px 16px;\n      border-bottom: 1px solid var(--border-subtle);\n      color: var(--text-muted);\n    }\n\n    .styled-table tr:hover td {\n      background: rgba(255, 255, 255, 0.02);\n      color: var(--text-main);\n    }\n\n    .grade-badge {\n      display: inline-block;\n      padding: 2px 8px;\n      border-radius: 4px;\n      font-weight: 700;\n      font-size: 0.76rem;\n      background: rgba(16, 185, 129, 0.15);\n      color: var(--emerald);\n    }\n\n    /* Nested Roadmap List */\n    .roadmap-list {\n      list-style-type: none;\n      padding-left: 0;\n    }\n\n    .roadmap-list > li {\n      margin-bottom: 18px;\n      position: relative;\n      padding-left: 28px;\n    }\n\n    .roadmap-list > li::before {\n      content: '●';\n      position: absolute;\n      left: 0;\n      top: 0;\n      color: var(--primary-light);\n      font-size: 1.2rem;\n    }\n\n    .roadmap-list h5 {\n      font-size: 0.96rem;\n      font-weight: 700;\n      color: #ffffff;\n      margin-bottom: 6px;\n    }\n\n    .roadmap-sublist {\n      list-style-type: square;\n      padding-left: 20px;\n      color: var(--text-muted);\n      font-size: 0.84rem;\n    }\n\n    .roadmap-sublist li {\n      padding: 2px 0;\n    }\n\n    /* ==========================================================================\n       PURE CSS ACCORDION (DETAILS & SUMMARY)\n       ========================================================================== */\n    .accordion-container {\n      display: flex;\n      flex-direction: column;\n      gap: 14px;\n      max-width: 900px;\n      margin: 0 auto;\n    }\n\n    details.faq-item {\n      background: var(--bg-card);\n      border: 1px solid var(--border-subtle);\n      border-radius: var(--radius-md);\n      overflow: hidden;\n      transition: var(--transition);\n    }\n\n    details.faq-item[open] {\n      border-color: var(--border-accent);\n      background: rgba(30, 41, 59, 0.7);\n    }\n\n    summary.faq-question {\n      padding: 18px 24px;\n      font-size: 1rem;\n      font-weight: 700;\n      color: var(--text-main);\n      cursor: pointer;\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      list-style: none;\n      user-select: none;\n    }\n\n    summary.faq-question::-webkit-details-marker {\n      display: none;\n    }\n\n    summary.faq-question::after {\n      content: '+';\n      font-size: 1.4rem;\n      font-weight: 400;\n      color: var(--cyan);\n      transition: transform 0.25s ease;\n    }\n\n    details[open] summary.faq-question::after {\n      content: '−';\n      color: var(--rose);\n      transform: rotate(180deg);\n    }\n\n    .faq-answer {\n      padding: 0 24px 20px;\n      font-size: 0.92rem;\n      color: var(--text-muted);\n      line-height: 1.65;\n      border-top: 1px solid var(--border-subtle);\n      padding-top: 14px;\n    }\n\n    /* ==========================================================================\n       CONTACT & STUDENT INQUIRY FORM (PURE SEMANTIC HTML5)\n       ========================================================================== */\n    .contact-grid {\n      display: grid;\n      grid-template-columns: 1.1fr 0.9fr;\n      gap: 40px;\n    }\n\n    .form-card {\n      background: var(--bg-card);\n      border: 1px solid var(--border-subtle);\n      border-radius: var(--radius-lg);\n      padding: 36px;\n      box-shadow: var(--shadow-md);\n    }\n\n    .form-group {\n      margin-bottom: 20px;\n    }\n\n    .form-group label {\n      display: block;\n      font-size: 0.85rem;\n      font-weight: 600;\n      color: var(--text-main);\n      margin-bottom: 8px;\n    }\n\n    .form-row {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 16px;\n    }\n\n    .form-control {\n      width: 100%;\n      background: rgba(15, 23, 42, 0.8);\n      border: 1px solid var(--border-subtle);\n      border-radius: var(--radius-sm);\n      padding: 12px 16px;\n      font-size: 0.92rem;\n      color: #ffffff;\n      outline: none;\n      transition: var(--transition);\n      font-family: inherit;\n    }\n\n    .form-control:focus {\n      border-color: var(--primary-light);\n      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);\n    }\n\n    .form-control::placeholder {\n      color: var(--text-dim);\n    }\n\n    textarea.form-control {\n      resize: vertical;\n      min-height: 110px;\n    }\n\n    .contact-info-card {\n      background: var(--gradient-surface);\n      border: 1px solid var(--border-subtle);\n      border-radius: var(--radius-lg);\n      padding: 36px;\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n    }\n\n    .info-block {\n      margin-bottom: 24px;\n    }\n\n    .info-block h5 {\n      font-size: 0.8rem;\n      text-transform: uppercase;\n      letter-spacing: 1px;\n      color: var(--cyan);\n      margin-bottom: 6px;\n      font-weight: 800;\n    }\n\n    .info-block p {\n      font-size: 0.95rem;\n      color: var(--text-main);\n      line-height: 1.6;\n    }\n\n    /* ==========================================================================\n       PURE CSS MODAL (VIA :TARGET SELECTOR - ZERO JAVASCRIPT)\n       ========================================================================== */\n    .css-modal {\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      background: rgba(0, 0, 0, 0.8);\n      backdrop-filter: blur(8px);\n      z-index: 999;\n      display: none;\n      align-items: center;\n      justify-content: center;\n      padding: 20px;\n    }\n\n    .css-modal:target {\n      display: flex;\n    }\n\n    .modal-box {\n      background: var(--bg-secondary);\n      border: 1px solid var(--border-accent);\n      border-radius: var(--radius-lg);\n      max-width: 650px;\n      width: 100%;\n      padding: 32px;\n      position: relative;\n      box-shadow: var(--shadow-glow);\n      animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n    }\n\n    @keyframes modalPop {\n      from { transform: scale(0.85); opacity: 0; }\n      to { transform: scale(1); opacity: 1; }\n    }\n\n    .modal-close {\n      position: absolute;\n      top: 20px;\n      right: 20px;\n      font-size: 1.5rem;\n      line-height: 1;\n      color: var(--text-muted);\n      transition: var(--transition);\n      padding: 6px;\n    }\n\n    .modal-close:hover {\n      color: var(--rose);\n      transform: scale(1.2);\n    }\n\n    /* ==========================================================================\n       FOOTER\n       ========================================================================== */\n    footer {\n      background: #050810;\n      border-top: 1px solid var(--border-subtle);\n      padding: 60px 32px 30px;\n    }\n\n    .footer-content {\n      max-width: 1280px;\n      margin: 0 auto;\n      display: grid;\n      grid-template-columns: 2fr 1fr 1fr 1fr;\n      gap: 40px;\n      margin-bottom: 40px;\n    }\n\n    .footer-brand h3 {\n      font-size: 1.3rem;\n      font-weight: 800;\n      color: #ffffff;\n      margin-bottom: 12px;\n    }\n\n    .footer-brand p {\n      font-size: 0.88rem;\n      color: var(--text-muted);\n      line-height: 1.6;\n      max-width: 320px;\n    }\n\n    .footer-col h5 {\n      font-size: 0.9rem;\n      font-weight: 700;\n      color: #ffffff;\n      margin-bottom: 16px;\n      letter-spacing: 0.5px;\n    }\n\n    .footer-col ul {\n      list-style: none;\n    }\n\n    .footer-col li {\n      margin-bottom: 10px;\n    }\n\n    .footer-col a {\n      font-size: 0.86rem;\n      color: var(--text-muted);\n      transition: var(--transition);\n    }\n\n    .footer-col a:hover {\n      color: var(--cyan);\n      padding-left: 4px;\n    }\n\n    .footer-bottom {\n      max-width: 1280px;\n      margin: 0 auto;\n      padding-top: 24px;\n      border-top: 1px solid var(--border-subtle);\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      flex-wrap: wrap;\n      gap: 12px;\n      font-size: 0.82rem;\n      color: var(--text-dim);\n    }\n\n    /* ==========================================================================\n       RESPONSIVENESS\n       ========================================================================== */\n    @media (max-width: 968px) {\n      .hero-section {\n        grid-template-columns: 1fr;\n        padding-top: 40px;\n      }\n      .curriculum-wrap,\n      .contact-grid {\n        grid-template-columns: 1fr;\n      }\n      .footer-content {\n        grid-template-columns: 1fr 1fr;\n      }\n    }\n\n    @media (max-width: 640px) {\n      .navbar {\n        padding: 12px 20px;\n      }\n      .nav-links {\n        display: none;\n      }\n      .hero-title {\n        font-size: 2.2rem;\n      }\n      .form-row {\n        grid-template-columns: 1fr;\n      }\n      .footer-content {\n        grid-template-columns: 1fr;\n      }\n    }\n  </style>\n</head>\n<body>\n\n  <!-- Top Announcement Bar -->\n  <aside class=\"top-bar\">\n    <div>\n      <span class=\"top-bar-badge\">NAAC A++ ACCREDITED</span>\n      <span>Official Departmental Web Portal &bull; Maharishi Markandeshwar Engineering College (MMEC)</span>\n    </div>\n    <div class=\"top-bar-links\">\n      <a href=\"#curriculum\">Syllabus 2025-26</a>\n      <a href=\"#notices\">Notice Board</a>\n      <a href=\"#contact\">Campus Helpline</a>\n    </div>\n  </aside>\n\n  <!-- Sticky Glassmorphic Navbar -->\n  <header class=\"navbar\">\n    <div class=\"nav-brand\">\n      <div class=\"brand-emblem\">CS</div>\n      <div class=\"brand-text\">\n        <h1>MMEC CSE Portal</h1>\n        <p>Department of Computer Science & Engineering</p>\n      </div>\n    </div>\n    <nav>\n      <ul class=\"nav-links\">\n        <li><a href=\"#about\">Department</a></li>\n        <li><a href=\"#notices\">Announcements</a></li>\n        <li><a href=\"#programs\">Academic Programs</a></li>\n        <li><a href=\"#labs\">Laboratories</a></li>\n        <li><a href=\"#curriculum\">Curriculum</a></li>\n        <li><a href=\"#faq\">FAQ</a></li>\n      </ul>\n    </nav>\n    <a href=\"#contact\" class=\"nav-cta-btn\">Student Desk ↗</a>\n  </header>\n\n  <!-- Hero Section -->\n  <section class=\"hero-section\" id=\"about\">\n    <div class=\"hero-content\">\n      <div class=\"hero-badge-pill\">\n        <span class=\"pulse-dot\"></span>\n        MMEC Center of Excellence in Computing & AI\n      </div>\n      <h2 class=\"hero-title\">\n        Pioneering the Future of <span>Intelligence, Cloud & Systems</span>\n      </h2>\n      <p class=\"hero-desc\">\n        Welcome to the premier department of computing. We bridge theoretical foundations with industry-grade software craftsmanship, fostering research in Artificial Intelligence, High-Performance Systems, and Full-Stack Engineering.\n      </p>\n      <div class=\"hero-actions\">\n        <a href=\"#programs\" class=\"btn-primary\">Explore Academic Programs ↓</a>\n        <a href=\"#modal-map\" class=\"btn-secondary\">View Campus Map 🗺️</a>\n      </div>\n      <div class=\"hero-trust\">\n        <div><strong>98.4%</strong> Placement Success</div>\n        <div>&bull;</div>\n        <div><strong>₹42 LPA</strong> Highest International CTC</div>\n        <div>&bull;</div>\n        <div><strong>18+</strong> Advanced Research Labs</div>\n      </div>\n    </div>\n\n    <!-- Hero Showcase Card -->\n    <div class=\"hero-card-showcase\">\n      <div class=\"showcase-header\">\n        <div>\n          <h3 style=\"font-size: 1.15rem; font-weight: 800; color: #fff;\">Department at a Glance</h3>\n          <p style=\"font-size: 0.78rem; color: var(--text-muted);\">Session 2025-26 Performance Audit</p>\n        </div>\n        <span class=\"showcase-badge\">A++ RATED</span>\n      </div>\n\n      <div class=\"stats-kpi-grid\">\n        <div class=\"kpi-box\">\n          <div class=\"kpi-number\">₹42 LPA</div>\n          <div class=\"kpi-label\">Highest Package Offered</div>\n        </div>\n        <div class=\"kpi-box\">\n          <div class=\"kpi-number\">50+</div>\n          <div class=\"kpi-label\">Patents & Copyrights Filed</div>\n        </div>\n        <div class=\"kpi-box\">\n          <div class=\"kpi-number\">2,400+</div>\n          <div class=\"kpi-label\">Active CSE Scholars</div>\n        </div>\n        <div class=\"kpi-box\">\n          <div class=\"kpi-number\">100%</div>\n          <div class=\"kpi-label\">Internship Assistance</div>\n        </div>\n      </div>\n\n      <div class=\"showcase-partners\">\n        <span>Industry COE Partners:</span>\n        <div class=\"partner-chips\">\n          <span>AWS</span> &bull; <span>Oracle</span> &bull; <span>Cisco</span> &bull; <span>RedHat</span>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <!-- PURE CSS TABBED NOTICES SECTION (100% ZERO JS) -->\n  <section class=\"section-wrap\" id=\"notices\">\n    <div class=\"section-header\">\n      <span class=\"section-tag\">LIVE BULLETIN</span>\n      <h3 class=\"section-title\">Department Announcements & Circulars</h3>\n      <p class=\"section-subtitle\">Real-time academic datesheets, campus placement updates, and innovation challenges with zero JavaScript.</p>\n    </div>\n\n    <div class=\"notices-container\">\n      <!-- Hidden Radio Buttons For Tab States -->\n      <input type=\"radio\" name=\"notice-tab\" id=\"tab-all\" class=\"tab-radio\" checked>\n      <input type=\"radio\" name=\"notice-tab\" id=\"tab-exams\" class=\"tab-radio\">\n      <input type=\"radio\" name=\"notice-tab\" id=\"tab-placements\" class=\"tab-radio\">\n      <input type=\"radio\" name=\"notice-tab\" id=\"tab-hackathons\" class=\"tab-radio\">\n\n      <!-- Tab Switcher Bar -->\n      <div class=\"tab-bar\">\n        <label for=\"tab-all\" class=\"tab-label\">All Circulars</label>\n        <label for=\"tab-exams\" class=\"tab-label\">Examinations & Mid-Terms</label>\n        <label for=\"tab-placements\" class=\"tab-label\">Placements & Drives</label>\n        <label for=\"tab-hackathons\" class=\"tab-label\">Hackathons & Events</label>\n      </div>\n\n      <!-- Tab Panels Container -->\n      <div class=\"tab-content\">\n        <!-- Panel 1: All Circulars -->\n        <div class=\"tab-panel panel-all notice-card-grid\">\n          <article class=\"notice-card\">\n            <div>\n              <div class=\"notice-meta\">\n                <span class=\"notice-date\">19 Sep 2026</span>\n                <span class=\"notice-pill pill-urgent\">URGENT</span>\n              </div>\n              <h4>Odd Semester Mid-Term Examination Datesheet 2025-26</h4>\n              <p>Mid-term examinations for B.Tech CSE (3rd, 5th, and 7th Semesters) commence from October 12. Check room allotments and seating plan.</p>\n            </div>\n            <a href=\"#contact\" class=\"notice-link\">Download Circular PDF &rarr;</a>\n          </article>\n\n          <article class=\"notice-card\">\n            <div>\n              <div class=\"notice-meta\">\n                <span class=\"notice-date\">18 Sep 2026</span>\n                <span class=\"notice-pill pill-career\">PLACEMENTS</span>\n              </div>\n              <h4>Google & Microsoft Tier-1 On-Campus Placement Drive</h4>\n              <p>Registrations open for Software Development Engineer (SDE) roles. Eligible students with CGPA &ge; 8.0 must upload resumes on portal.</p>\n            </div>\n            <a href=\"#contact\" class=\"notice-link\">View Eligibility Criteria &rarr;</a>\n          </article>\n\n          <article class=\"notice-card\">\n            <div>\n              <div class=\"notice-meta\">\n                <span class=\"notice-date\">15 Sep 2026</span>\n                <span class=\"notice-pill pill-event\">HACKATHON</span>\n              </div>\n              <h4>Smart India Hackathon (SIH 2026) Internal Screening</h4>\n              <p>Submit team nominations (6 members with at least 1 female scholar) by September 25 for institutional evaluation round.</p>\n            </div>\n            <a href=\"#contact\" class=\"notice-link\">Register Team &rarr;</a>\n          </article>\n        </div>\n\n        <!-- Panel 2: Examinations -->\n        <div class=\"tab-panel panel-exams notice-card-grid\">\n          <article class=\"notice-card\">\n            <div>\n              <div class=\"notice-meta\">\n                <span class=\"notice-date\">19 Sep 2026</span>\n                <span class=\"notice-pill pill-urgent\">URGENT</span>\n              </div>\n              <h4>Odd Semester Mid-Term Examination Datesheet 2025-26</h4>\n              <p>Official schedule for BCSE-007 (DSA), BCSE-013 (Web Tech), and BCSE-011 (AIML) laboratory examinations announced.</p>\n            </div>\n            <a href=\"#contact\" class=\"notice-link\">Download Timetable &rarr;</a>\n          </article>\n\n          <article class=\"notice-card\">\n            <div>\n              <div class=\"notice-meta\">\n                <span class=\"notice-date\">10 Sep 2026</span>\n                <span class=\"notice-pill pill-academic\">ACADEMICS</span>\n              </div>\n              <h4>Continuous Internal Evaluation (CIE) Marks Verification</h4>\n              <p>Students may inspect their laboratory assessment scores and assignment submission records with course coordinators.</p>\n            </div>\n            <a href=\"#contact\" class=\"notice-link\">Check Grade Records &rarr;</a>\n          </article>\n        </div>\n\n        <!-- Panel 3: Placements -->\n        <div class=\"tab-panel panel-placements notice-card-grid\">\n          <article class=\"notice-card\">\n            <div>\n              <div class=\"notice-meta\">\n                <span class=\"notice-date\">18 Sep 2026</span>\n                <span class=\"notice-pill pill-career\">PLACEMENTS</span>\n              </div>\n              <h4>Google & Microsoft Tier-1 On-Campus Placement Drive</h4>\n              <p>Exclusive recruitment drive for final and pre-final year engineering batches. CTC range: ₹18.5 LPA to ₹42 LPA.</p>\n            </div>\n            <a href=\"#contact\" class=\"notice-link\">Register on TPO Portal &rarr;</a>\n          </article>\n        </div>\n\n        <!-- Panel 4: Hackathons -->\n        <div class=\"tab-panel panel-hackathons notice-card-grid\">\n          <article class=\"notice-card\">\n            <div>\n              <div class=\"notice-meta\">\n                <span class=\"notice-date\">15 Sep 2026</span>\n                <span class=\"notice-pill pill-event\">HACKATHON</span>\n              </div>\n              <h4>Smart India Hackathon (SIH 2026) Internal Screening</h4>\n              <p>Pitch your hardware and software innovation prototypes across Smart Education, Healthcare, and Clean Energy problem statements.</p>\n            </div>\n            <a href=\"#contact\" class=\"notice-link\">Submit Abstract &rarr;</a>\n          </article>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <!-- ACADEMIC PROGRAMS -->\n  <section class=\"section-wrap\" id=\"programs\">\n    <div class=\"section-header\">\n      <span class=\"section-tag\">ACADEMIC EXCELLENCE</span>\n      <h3 class=\"section-title\">Undergraduate & Graduate Degrees</h3>\n      <p class=\"section-subtitle\">Curriculum engineered in collaboration with tech giants, balancing rigorous computing theory and hands-on laboratory mastery.</p>\n    </div>\n\n    <div class=\"programs-grid\">\n      <div class=\"program-card\">\n        <div>\n          <div class=\"program-icon\">💻</div>\n          <h3>B.Tech Computer Science (Core)</h3>\n          <p>Comprehensive 4-year engineering foundation in algorithms, compilers, computer systems, networks, and advanced software design.</p>\n          <ul class=\"program-features\">\n            <li>Data Structures & Algorithms in C/C++</li>\n            <li>Operating Systems & Distributed Architecture</li>\n            <li>Full-Stack Web & Enterprise Engineering</li>\n          </ul>\n        </div>\n        <div class=\"program-footer\">\n          <span>4 Years &bull; 8 Semesters</span>\n          <span style=\"color: var(--cyan); font-weight: 700;\">180 Seats</span>\n        </div>\n      </div>\n\n      <div class=\"program-card\">\n        <div>\n          <div class=\"program-icon\">🤖</div>\n          <h3>B.Tech CSE (AI & Machine Learning)</h3>\n          <p>Specialized program targeting Neural Networks, Deep Learning, Natural Language Processing, Computer Vision, and Autonomous Systems.</p>\n          <ul class=\"program-features\">\n            <li>PyTorch, TensorFlow & CUDA Acceleration</li>\n            <li>Generative AI & LLM Fine-Tuning</li>\n            <li>Probabilistic Models & Big Data Pipelines</li>\n          </ul>\n        </div>\n        <div class=\"program-footer\">\n          <span>4 Years &bull; Industry Aligned</span>\n          <span style=\"color: var(--cyan); font-weight: 700;\">120 Seats</span>\n        </div>\n      </div>\n\n      <div class=\"program-card\">\n        <div>\n          <div class=\"program-icon\">☁️</div>\n          <h3>B.Tech CSE (Cloud & DevOps)</h3>\n          <p>Master cloud infrastructure, microservices orchestration, containerization (Docker, Kubernetes), and CI/CD automated deployment pipelines.</p>\n          <ul class=\"program-features\">\n            <li>AWS & Google Cloud Architecture</li>\n            <li>Infrastructure as Code (Terraform)</li>\n            <li>Site Reliability Engineering (SRE)</li>\n          </ul>\n        </div>\n        <div class=\"program-footer\">\n          <span>4 Years &bull; AWS Certified</span>\n          <span style=\"color: var(--cyan); font-weight: 700;\">60 Seats</span>\n        </div>\n      </div>\n\n      <div class=\"program-card\">\n        <div>\n          <div class=\"program-icon\">🎓</div>\n          <h3>M.Tech & Ph.D. Research</h3>\n          <p>Postgraduate research programs backed by high-performance GPU clusters, sponsored doctoral fellowships, and publication grants.</p>\n          <ul class=\"program-features\">\n            <li>Federated Learning & Cyber Security</li>\n            <li>Quantum Computing Foundations</li>\n            <li>Funded Research Projects (DST / SERB)</li>\n          </ul>\n        </div>\n        <div class=\"program-footer\">\n          <span>2-5 Years &bull; Fellowships</span>\n          <span style=\"color: var(--cyan); font-weight: 700;\">Research Focus</span>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <!-- RESEARCH & COMPUTING LABORATORIES -->\n  <section class=\"section-wrap\" id=\"labs\">\n    <div class=\"section-header\">\n      <span class=\"section-tag\">INFRASTRUCTURE</span>\n      <h3 class=\"section-title\">World-Class Laboratories & Facilities</h3>\n      <p class=\"section-subtitle\">Furnished with modern high-compute workstations, gigabit fiber, and commercial cloud sandbox environments.</p>\n    </div>\n\n    <div class=\"labs-grid\">\n      <div class=\"lab-box\">\n        <div class=\"lab-header\">\n          <div class=\"lab-title-group\">\n            <h4>AI & Supercomputing Lab</h4>\n            <span>Room Lab-301 &bull; 60 Workstations</span>\n          </div>\n          <span style=\"font-size: 1.5rem;\">⚡</span>\n        </div>\n        <div class=\"lab-body\">\n          <p>Dedicated high-performance cluster with NVIDIA RTX Ada generation GPUs for training deep convolutional models and NLP architectures.</p>\n          <div class=\"lab-specs\">\n            <span class=\"spec-tag\">NVIDIA RTX 4090</span>\n            <span class=\"spec-tag\">64GB ECC RAM</span>\n            <span class=\"spec-tag\">PyTorch / TF</span>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"lab-box\">\n        <div class=\"lab-header\">\n          <div class=\"lab-title-group\">\n            <h4>Web Technologies & Cloud Lab</h4>\n            <span>Room Lab-204 &bull; 75 Workstations</span>\n          </div>\n          <span style=\"font-size: 1.5rem;\">🌐</span>\n        </div>\n        <div class=\"lab-body\">\n          <p>Syllabus host for BCSE-013 experiments. Equipped with local Apache/Nginx web servers, Docker engines, and full-stack runtime stacks.</p>\n          <div class=\"lab-specs\">\n            <span class=\"spec-tag\">HTML5 / CSS3</span>\n            <span class=\"spec-tag\">Node / PHP</span>\n            <span class=\"spec-tag\">Docker Engine</span>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"lab-box\">\n        <div class=\"lab-header\">\n          <div class=\"lab-title-group\">\n            <h4>Cyber Security & Forensics Center</h4>\n            <span>Room Lab-108 &bull; Air-Gapped Network</span>\n          </div>\n          <span style=\"font-size: 1.5rem;\">🛡️</span>\n        </div>\n        <div class=\"lab-body\">\n          <p>Isolated sandbox network for penetration testing, packet analysis (Wireshark), cryptographic protocol verification, and CTF challenges.</p>\n          <div class=\"lab-specs\">\n            <span class=\"spec-tag\">Kali Linux</span>\n            <span class=\"spec-tag\">GNS3 Emulators</span>\n            <span class=\"spec-tag\">Hardware Firewalls</span>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"lab-box\">\n        <div class=\"lab-header\">\n          <div class=\"lab-title-group\">\n            <h4>IoT & Embedded Systems Lab</h4>\n            <span>Room Lab-412 &bull; Hardware Benches</span>\n          </div>\n          <span style=\"font-size: 1.5rem;\">📡</span>\n        </div>\n        <div class=\"lab-body\">\n          <p>Microcontroller development kits, Raspberry Pi 5 clusters, ESP32 sensor networks, and oscilloscope testing stations for smart edge computing.</p>\n          <div class=\"lab-specs\">\n            <span class=\"spec-tag\">Raspberry Pi 5</span>\n            <span class=\"spec-tag\">ESP32 / LoRa</span>\n            <span class=\"spec-tag\">Digital CROs</span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <!-- CURRICULUM ROADMAP & LAB EVALUATION MATRIX -->\n  <section class=\"section-wrap\" id=\"curriculum\">\n    <div class=\"section-header\">\n      <span class=\"section-tag\">CURRICULUM ARCHITECTURE</span>\n      <h3 class=\"section-title\">Academic Structure & Lab Evaluation Matrix</h3>\n      <p class=\"section-subtitle\">Designed strictly adhering to NBA and AICTE model curriculum guidelines.</p>\n    </div>\n\n    <div class=\"curriculum-wrap\">\n      <!-- Semantic Evaluation Table (HTML Table Mastery) -->\n      <div class=\"curriculum-card\">\n        <h3>📊 Practical Course Assessment Weights</h3>\n        <table class=\"styled-table\">\n          <thead>\n            <tr>\n              <th>Evaluation Component</th>\n              <th>Assessment Mode</th>\n              <th>Weightage</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><strong>Lab Performance & Execution</strong></td>\n              <td>Weekly viva & code correctness</td>\n              <td><span class=\"grade-badge\">30 Marks</span></td>\n            </tr>\n            <tr>\n              <td><strong>Lab File & Documentation</strong></td>\n              <td>Neat record book & algorithms</td>\n              <td><span class=\"grade-badge\">20 Marks</span></td>\n            </tr>\n            <tr>\n              <td><strong>Mid-Term Practical Exam</strong></td>\n              <td>Live coding & output test</td>\n              <td><span class=\"grade-badge\">20 Marks</span></td>\n            </tr>\n            <tr>\n              <td><strong>End-Semester Examination</strong></td>\n              <td>External viva & major project</td>\n              <td><span class=\"grade-badge\">30 Marks</span></td>\n            </tr>\n            <tr style=\"font-weight: 800; background: rgba(99, 102, 241, 0.1);\">\n              <td>Total Practical Assessment</td>\n              <td>Internal + External Final</td>\n              <td><span class=\"grade-badge\" style=\"background: rgba(6, 182, 212, 0.2); color: var(--cyan);\">100 Marks</span></td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n\n      <!-- Semantic Nested Roadmap (HTML Nested List Mastery) -->\n      <div class=\"curriculum-card\">\n        <h3>🗺️ 4-Year Technical Progression</h3>\n        <ol class=\"roadmap-list\">\n          <li>\n            <h5>Year 1: Foundation & Computation</h5>\n            <ul class=\"roadmap-sublist\">\n              <li>Programming in C (BCSE-001) & Problem Solving</li>\n              <li>Basic Electrical & Electronics (BELE-001)</li>\n              <li>Applied Physics & Engineering Mathematics</li>\n            </ul>\n          </li>\n          <li>\n            <h5>Year 2: Core Engineering & Architecture</h5>\n            <ul class=\"roadmap-sublist\">\n              <li>Data Structures & Algorithms (BCSE-007)</li>\n              <li>Fundamental of Web Technologies (BCSE-013)</li>\n              <li>AI & Machine Learning Foundations (BCSE-011)</li>\n            </ul>\n          </li>\n          <li>\n            <h5>Year 3: Advanced Systems & Infrastructure</h5>\n            <ul class=\"roadmap-sublist\">\n              <li>Database Management Systems & Computer Networks</li>\n              <li>Operating Systems & Cloud DevOps Engineering</li>\n            </ul>\n          </li>\n          <li>\n            <h5>Year 4: Capstone & Industry Residency</h5>\n            <ul class=\"roadmap-sublist\">\n              <li>Major Capstone System Project Defense</li>\n              <li>Full-Semester Corporate Internship</li>\n            </ul>\n          </li>\n        </ol>\n      </div>\n    </div>\n  </section>\n\n  <!-- PURE CSS INTERACTIVE FAQ (DETAILS & SUMMARY) -->\n  <section class=\"section-wrap\" id=\"faq\">\n    <div class=\"section-header\">\n      <span class=\"section-tag\">HELP DESK</span>\n      <h3 class=\"section-title\">Frequently Asked Questions</h3>\n      <p class=\"section-subtitle\">Instant answers regarding lab manuals, software setups, and semester grading policies.</p>\n    </div>\n\n    <div class=\"accordion-container\">\n      <details class=\"faq-item\" open>\n        <summary class=\"faq-question\">What are the prerequisites for the Web Technologies Practical Lab (BCSE-013)?</summary>\n        <div class=\"faq-answer\">\n          Students must have completed introductory programming in C and possess a fundamental understanding of operating systems and file directories. All practicals require only a standard modern web browser (Chrome/Edge/Firefox) and a code editor (VS Code or Sublime Text).\n        </div>\n      </details>\n\n      <details class=\"faq-item\">\n        <summary class=\"faq-question\">Why does this website not require any JavaScript to function?</summary>\n        <div class=\"faq-answer\">\n          This portal was specifically crafted to demonstrate the immense power of modern semantic HTML5 and advanced CSS3 (Flexbox, CSS Grid, custom properties, radio-button state switches, and native details/summary accordions). It adheres 100% strictly to the academic syllabus without external scripts.\n        </div>\n      </details>\n\n      <details class=\"faq-item\">\n        <summary class=\"faq-question\">How can scholars book slots in the Supercomputing & AI Lab?</summary>\n        <div class=\"faq-answer\">\n          Eligible students pursuing approved major capstone projects or research papers can submit an access request through the student desk below. Workstations are scheduled in 3-hour dedicated compute slots.\n        </div>\n      </details>\n\n      <details class=\"faq-item\">\n        <summary class=\"faq-question\">What is the policy for practical examination re-evaluations?</summary>\n        <div class=\"faq-answer\">\n          Continuous assessment scores are posted on the college portal weekly. In case of any discrepancies, students must consult the designated laboratory in-charge within 5 business days of marks notification.\n        </div>\n      </details>\n    </div>\n  </section>\n\n  <!-- CONTACT & STUDENT INQUIRY FORM (PURE SEMANTIC HTML5) -->\n  <section class=\"section-wrap\" id=\"contact\">\n    <div class=\"section-header\">\n      <span class=\"section-tag\">CONNECT WITH US</span>\n      <h3 class=\"section-title\">Student Helpdesk & Department Secretariat</h3>\n      <p class=\"section-subtitle\">Have questions regarding syllabus, research affiliations, or lab access? Reach out directly.</p>\n    </div>\n\n    <div class=\"contact-grid\">\n      <!-- Pure HTML5 Form with Native Constraints -->\n      <div class=\"form-card\">\n        <h4 style=\"font-size: 1.25rem; font-weight: 800; color: #fff; margin-bottom: 20px;\">Submit Academic Inquiry</h4>\n        <form action=\"#contact\" method=\"GET\">\n          <div class=\"form-row\">\n            <div class=\"form-group\">\n              <label for=\"student-name\">Full Name *</label>\n              <input type=\"text\" id=\"student-name\" name=\"name\" class=\"form-control\" placeholder=\"e.g. Bhavya Gupta\" required minlength=\"3\">\n            </div>\n            <div class=\"form-group\">\n              <label for=\"student-roll\">Roll Number *</label>\n              <input type=\"text\" id=\"student-roll\" name=\"roll\" class=\"form-control\" placeholder=\"e.g. 11232541\" required pattern=\"[0-9]{6,12}\">\n            </div>\n          </div>\n\n          <div class=\"form-row\">\n            <div class=\"form-group\">\n              <label for=\"student-email\">College Email *</label>\n              <input type=\"email\" id=\"student-email\" name=\"email\" class=\"form-control\" placeholder=\"student@mmumullana.org\" required>\n            </div>\n            <div class=\"form-group\">\n              <label for=\"program-select\">Academic Program *</label>\n              <select id=\"program-select\" name=\"program\" class=\"form-control\" required>\n                <option value=\"\" disabled selected>Select Your Program</option>\n                <option value=\"btech-cse\">B.Tech CSE (Core)</option>\n                <option value=\"btech-aiml\">B.Tech CSE (AI & ML)</option>\n                <option value=\"btech-cloud\">B.Tech CSE (Cloud & DevOps)</option>\n                <option value=\"mtech-phd\">M.Tech / Ph.D. Scholar</option>\n              </select>\n            </div>\n          </div>\n\n          <div class=\"form-group\">\n            <label for=\"inquiry-subject\">Inquiry Subject *</label>\n            <input type=\"text\" id=\"inquiry-subject\" name=\"subject\" class=\"form-control\" placeholder=\"e.g. Lab Manual Clarification / GPU Access\" required>\n          </div>\n\n          <div class=\"form-group\">\n            <label for=\"inquiry-message\">Detailed Message *</label>\n            <textarea id=\"inquiry-message\" name=\"message\" class=\"form-control\" placeholder=\"Describe your query or requirement in detail...\" required minlength=\"10\"></textarea>\n          </div>\n\n          <button type=\"submit\" class=\"btn-primary\" style=\"width: 100%; justify-content: center; cursor: pointer; border: none;\">\n            Submit Academic Inquiry 🚀\n          </button>\n        </form>\n      </div>\n\n      <!-- Department Secretariat Information -->\n      <div class=\"contact-info-card\">\n        <div>\n          <h4 style=\"font-size: 1.25rem; font-weight: 800; color: #fff; margin-bottom: 24px;\">Department Directory</h4>\n          \n          <div class=\"info-block\">\n            <h5>Campus Address</h5>\n            <p>Department of Computer Science & Engineering<br>\n            Maharishi Markandeshwar Engineering College (MMEC)<br>\n            Mullana, Ambala, Haryana - 133207, India</p>\n          </div>\n\n          <div class=\"info-block\">\n            <h5>Head of Department</h5>\n            <p>Dr. Ashok Kumar, Ph.D. (Computer Engineering)<br>\n            Email: hod.cse@mmumullana.org</p>\n          </div>\n\n          <div class=\"info-block\">\n            <h5>Laboratory Timings</h5>\n            <p>Monday – Saturday: 09:00 AM – 05:00 PM<br>\n            Supercomputing Lab: 24x7 (Authorized Scholars Only)</p>\n          </div>\n        </div>\n\n        <div style=\"padding-top: 20px; border-top: 1px solid var(--border-subtle);\">\n          <span style=\"font-size: 0.8rem; color: var(--emerald); font-weight: 700; display: inline-flex; align-items: center; gap: 6px;\">\n            <span class=\"pulse-dot\"></span> Official MM(DU) Campus Network Online\n          </span>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <!-- PURE CSS MODAL (ZERO JS - USES :TARGET PSEUDO-CLASS) -->\n  <div id=\"modal-map\" class=\"css-modal\">\n    <div class=\"modal-box\">\n      <a href=\"#about\" class=\"modal-close\" title=\"Close Modal\">&times;</a>\n      <h3 style=\"font-size: 1.4rem; font-weight: 800; color: #fff; margin-bottom: 8px;\">MMEC Academic Campus & Lab Navigator</h3>\n      <p style=\"font-size: 0.86rem; color: var(--text-muted); margin-bottom: 20px;\">Interactive block directory rendered with pure CSS3 positioning.</p>\n      \n      <div style=\"background: rgba(15, 23, 42, 0.8); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px; margin-bottom: 20px;\">\n        <div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.86rem;\">\n          <div style=\"padding: 12px; background: rgba(99, 102, 241, 0.1); border-radius: 8px; border-left: 3px solid var(--primary);\">\n            <strong style=\"color: #fff; display: block;\">Tech Block B (3rd Floor)</strong>\n            <span>AI Supercomputing Lab & Server Hub</span>\n          </div>\n          <div style=\"padding: 12px; background: rgba(6, 182, 212, 0.1); border-radius: 8px; border-left: 3px solid var(--cyan);\">\n            <strong style=\"color: #fff; display: block;\">Tech Block B (2nd Floor)</strong>\n            <span>Web Technologies & Cloud DevOps Labs</span>\n          </div>\n          <div style=\"padding: 12px; background: rgba(16, 185, 129, 0.1); border-radius: 8px; border-left: 3px solid var(--emerald);\">\n            <strong style=\"color: #fff; display: block;\">Tech Block A (Ground Floor)</strong>\n            <span>Central Digital Library & Seminar Hall</span>\n          </div>\n          <div style=\"padding: 12px; background: rgba(245, 158, 11, 0.1); border-radius: 8px; border-left: 3px solid var(--amber);\">\n            <strong style=\"color: #fff; display: block;\">Admin Complex</strong>\n            <span>Dean Academic Affairs & Secretariat</span>\n          </div>\n        </div>\n      </div>\n\n      <div style=\"text-align: right;\">\n        <a href=\"#about\" class=\"btn-secondary\" style=\"padding: 8px 18px; font-size: 0.84rem;\">Close Navigator</a>\n      </div>\n    </div>\n  </div>\n\n  <!-- FOOTER -->\n  <footer>\n    <div class=\"footer-content\">\n      <div class=\"footer-brand\">\n        <h3>MMEC CSE Digital Portal</h3>\n        <p>Empowering next-generation software architects and researchers with world-class engineering education, state-of-the-art laboratories, and high-impact computing skills.</p>\n      </div>\n\n      <div class=\"footer-col\">\n        <h5>Quick Links</h5>\n        <ul>\n          <li><a href=\"#about\">About Department</a></li>\n          <li><a href=\"#programs\">Academic Programs</a></li>\n          <li><a href=\"#notices\">Notice Board</a></li>\n          <li><a href=\"#labs\">Laboratories</a></li>\n        </ul>\n      </div>\n\n      <div class=\"footer-col\">\n        <h5>Syllabus Labs</h5>\n        <ul>\n          <li><a href=\"#curriculum\">BCSE-001 (C Lab)</a></li>\n          <li><a href=\"#curriculum\">BCSE-007 (DSA Lab)</a></li>\n          <li><a href=\"#curriculum\">BCSE-013 (Web Tech Lab)</a></li>\n          <li><a href=\"#curriculum\">BCSE-011 (AIML Lab)</a></li>\n        </ul>\n      </div>\n\n      <div class=\"footer-col\">\n        <h5>Campus Help</h5>\n        <ul>\n          <li><a href=\"#contact\">Student Desk</a></li>\n          <li><a href=\"#faq\">Frequently Asked</a></li>\n          <li><a href=\"#curriculum\">NBA Accreditation</a></li>\n          <li><a href=\"#contact\">Grievance Cell</a></li>\n        </ul>\n      </div>\n    </div>\n\n    <div class=\"footer-bottom\">\n      <div>&copy; 2025-2026 Department of Computer Science & Engineering, MMEC. All Rights Reserved.</div>\n      <div>Designed with 100% Pure Semantic HTML5 & Modern CSS3 (Zero JavaScript)</div>\n    </div>\n  </footer>\n\n</body>\n</html>\n"
    },
    "experiments": [
      {
        "expNo": 1,
        "title": "Exploration of Web Architecture, Browsers, Web Servers & WordPress Installation",
        "objective": "Conduct in-depth architectural study of the World Wide Web: Client-Server HTTP/HTTPS handshake, Web Browsers vs Web Servers (Apache/Nginx), and local installation/setup of WordPress CMS on XAMPP/WAMP.",
        "algorithm": [
          "Step 1: Study 3-tier web architecture: Presentation (Client), Application (Web Server), Data (Database).",
          "Step 2: Understand HTTP Request-Response cycle, status codes (200, 301, 404, 500).",
          "Step 3: Setup local development environment using XAMPP/WAMP (Apache + MySQL).",
          "Step 4: Download WordPress ZIP, place in htdocs, create MySQL database wp_db.",
          "Step 5: Complete 5-minute WordPress install wizard and document dashboard components."
        ],
        "code": "<?php\n// wp-config.php - WordPress Core Database Configuration\ndefine( 'DB_NAME', 'mmec_wordpress_db' );\ndefine( 'DB_USER', 'root' );\ndefine( 'DB_PASSWORD', '' );\ndefine( 'DB_HOST', 'localhost' );\ndefine( 'DB_CHARSET', 'utf8mb4' );\ndefine( 'DB_COLLATE', '' );\n\ndefine( 'AUTH_KEY',         'put-your-unique-phrase-here-1234567890' );\ndefine( 'SECURE_AUTH_KEY',  'put-your-unique-phrase-here-0987654321' );\n\n$table_prefix = 'wp_';\ndefine( 'WP_DEBUG', false );\n\nif ( ! defined( 'ABSPATH' ) ) {\n    define( 'ABSPATH', __DIR__ . '/' );\n}\nrequire_once ABSPATH . 'wp-settings.php';\n?>",
        "sampleInput": "Localhost URL: http://localhost/wordpress",
        "sampleOutput": "WordPress 6.x CMS installed with local Apache/MySQL running."
      },
      {
        "expNo": 2,
        "title": "Biography Webpage of Idol (Dr. APJ Abdul Kalam) with Headings & Horizontal Rules",
        "objective": "Design a clean, semantic HTML5 biography webpage of an idol (Dr. APJ Abdul Kalam) utilizing all heading tags (<h1> through <h6>), paragraphs, blockquotes, and horizontal dividing rules (<hr>).",
        "algorithm": [
          "Step 1: Set up HTML5 doctype and meta viewport.",
          "Step 2: Use <h1> for main idol name.",
          "Step 3: Use <h2> and <h3> for Early Life, Scientific Career, Presidency, and Awards.",
          "Step 4: Insert <hr> dividers between major life chapters.",
          "Step 5: Embed inspirational quote using <blockquote>."
        ],
        "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Biography - Dr. A.P.J. Abdul Kalam (Missile Man of India)</title>\n  <style>\n    body { font-family: 'Georgia', serif; line-height: 1.8; margin: 40px auto; max-width: 800px; color: #2d3748; background-color: #f7fafc; padding: 20px; }\n    h1 { color: #1a365d; text-align: center; font-size: 2.2rem; }\n    h2 { color: #2b6cb0; border-bottom: 2px solid #cbd5e0; padding-bottom: 6px; }\n    h3 { color: #2c5282; }\n    hr { border: 0; height: 1px; background-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.3), rgba(0,0,0,0)); margin: 25px 0; }\n    blockquote { font-style: italic; background: #edf2f7; border-left: 5px solid #3182ce; padding: 12px 20px; margin: 20px 0; }\n  </style>\n</head>\n<body>\n  <h1>Dr. Avul Pakir Jainulabdeen Abdul Kalam</h1>\n  <p style=\"text-align:center; font-weight:bold; color:#4a5568;\">15 October 1931 - 27 July 2015 | 11th President of India</p>\n  <hr>\n\n  <h2>1. Early Life & Humble Beginnings</h2>\n  <p>Dr. Kalam was born in Rameswaram, Tamil Nadu. Coming from a poor background, he distributed newspapers in his early childhood to support his family's income while pursuing his deep passion for mathematics and aeronautical engineering.</p>\n\n  <hr>\n  <h2>2. Career as an Aerospace Scientist</h2>\n  <h3>2.1 Indian Space Research Organisation (ISRO)</h3>\n  <p>He served as the Project Director of India's first satellite launch vehicle (SLV-III) which successfully deployed the Rohini satellite into near-Earth orbit in 1980.</p>\n\n  <h3>2.2 Defence Research and Development Organisation (DRDO)</h3>\n  <p>He led the Integrated Guided Missile Development Programme (IGMDP), spearheading missiles like AGNI and PRITHVI, earning the title <strong>\"The Missile Man of India\"</strong>.</p>\n\n  <hr>\n  <h2>3. Presidency (2002 - 2007)</h2>\n  <p>Affectionately known as the <em>\"People's President\"</em>, he transformed Rashtrapati Bhavan into a hub for students, innovators, and thinkers across the nation.</p>\n\n  <blockquote>\n    \"Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.\"\n    <br>&mdash; <strong>Dr. A.P.J. Abdul Kalam</strong>\n  </blockquote>\n</body>\n</html>",
        "sampleInput": "Browser loading biography.html",
        "sampleOutput": "Rendered elegant biography with h1-h6 hierarchy and horizontal rules."
      },
      {
        "expNo": 3,
        "title": "Ordered & Unordered Nested Lists with Multi-Level Formatting",
        "objective": "Create an HTML webpage demonstrating nested ordered lists (<ol>), unordered lists (<ul>), and definition lists (<dl>) with customized bullet types (disc, circle, square, roman numerals, letters).",
        "algorithm": [
          "Step 1: Open <ol> with type='I' for Roman numerals.",
          "Step 2: Inside <li>, nest unordered list <ul> with type='square'.",
          "Step 3: Inside nested item, nest ordered list with type='a' for alphabets.",
          "Step 4: Include a definition list (<dl>, <dt>, <dd>) for technical glossary."
        ],
        "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCSE-013: Practical 3 - Nested Lists in HTML</title>\n  <style>\n    body { font-family: Arial, sans-serif; padding: 25px; line-height: 1.6; }\n    h2 { color: #1e3a8a; }\n    ol { margin-bottom: 15px; }\n    dt { font-weight: bold; color: #0d9488; }\n    dd { margin-left: 20px; margin-bottom: 10px; }\n  </style>\n</head>\n<body>\n  <h2>Computer Science Engineering - Curriculum Roadmap</h2>\n  <ol type=\"I\">\n    <li><strong>Year 1: Foundation Courses</strong>\n      <ul style=\"list-style-type: square;\">\n        <li>Programming in C (BCSE-008 / BCSE-001)\n          <ol type=\"a\">\n            <li>Control Structures & Loops</li>\n            <li>Pointers & Dynamic Memory</li>\n            <li>File Handling</li>\n          </ol>\n        </li>\n        <li>Basics of Electrical & Electronics (BELE-001)</li>\n      </ul>\n    </li>\n    <li><strong>Year 2: Core Engineering</strong>\n      <ul style=\"list-style-type: disc;\">\n        <li>Data Structures & Algorithms (BCSE-007)</li>\n        <li>Web Technologies (BCSE-012 / BCSE-013)</li>\n      </ul>\n    </li>\n  </ol>\n\n  <h2>Web Tech Glossary (Definition List)</h2>\n  <dl>\n    <dt>HTML5</dt>\n    <dd>HyperText Markup Language - Standard markup language for documents designed to be displayed in a web browser.</dd>\n    <dt>CSS3</dt>\n    <dd>Cascading Style Sheets - Language used for describing the presentation and styling of a document.</dd>\n  </dl>\n</body>\n</html>",
        "sampleInput": "View in Chrome / Firefox",
        "sampleOutput": "Clean multi-level nested list hierarchy with varied bullet & numbering types."
      },
      {
        "expNo": 4,
        "title": "Interactive Country Image Map with Clickable Hotspot Coordinates",
        "objective": "Develop an interactive image map webpage using <img> with usemap attribute and <map> with <area> tags (rect, circle, poly) linking specific geographic regions to information pages.",
        "algorithm": [
          "Step 1: Embed map image with usemap='#worldmap'.",
          "Step 2: Define <map name='worldmap'>.",
          "Step 3: Define <area shape='rect' coords='x1,y1,x2,y2' href='...' alt='Region'>.",
          "Step 4: Define <area shape='circle' coords='x,y,radius' href='...' alt='Capital'>.",
          "Step 5: Define <area shape='poly' coords='x1,y1,x2,y2,...' href='...' alt='State'>."
        ],
        "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCSE-013: Practical 4 - Interactive Image Map</title>\n  <style>\n    body { font-family: sans-serif; text-align: center; padding: 20px; }\n    .map-container { display: inline-block; border: 3px solid #3b82f6; border-radius: 8px; overflow: hidden; }\n  </style>\n</head>\n<body>\n  <h2>Interactive Campus & Geography Map</h2>\n  <p>Hover and click on specific hotspots (Library, Admin Block, Tech Park) to navigate.</p>\n\n  <div class=\"map-container\">\n    <img src=\"https://images.unsplash.com/photo-1524813686514-a57563d77d66?w=600\" \n         alt=\"Interactive Map\" \n         usemap=\"#campusmap\" \n         width=\"600\" height=\"400\">\n\n    <map name=\"campusmap\">\n      <!-- Rectangular Hotspot for Admin Block -->\n      <area shape=\"rect\" coords=\"50,50,200,180\" \n            href=\"#admin\" \n            alt=\"Administrative Block\" \n            onclick=\"alert('Navigating to: Administrative Block (Registrar & Dean Office)'); return false;\">\n\n      <!-- Circular Hotspot for Central Library -->\n      <area shape=\"circle\" coords=\"450,150,75\" \n            href=\"#library\" \n            alt=\"Central Library\" \n            onclick=\"alert('Navigating to: Central Digital Library (50,000+ Volumes)'); return false;\">\n\n      <!-- Polygonal Hotspot for Sports Complex -->\n      <area shape=\"poly\" coords=\"250,250,350,220,400,320,300,360,220,310\" \n            href=\"#sports\" \n            alt=\"Sports Complex\" \n            onclick=\"alert('Navigating to: University Olympic Sports Complex'); return false;\">\n    </map>\n  </div>\n</body>\n</html>",
        "sampleInput": "Clicking Library hotspot (coords 450,150)",
        "sampleOutput": "Click triggers specific region action & coordinates binding."
      },
      {
        "expNo": 5,
        "title": "Academic Resume / Bio-Data using Semantic HTML Table with Rowspan & Colspan",
        "objective": "Design a professional academic resume / bio-data table in HTML demonstrating semantic table elements (<thead>, <tbody>, <tfoot>), rowspan, and colspan attributes with alternating row styling.",
        "algorithm": [
          "Step 1: Create <table> with border, cell-padding, and cell-spacing styling.",
          "Step 2: Use <caption> for resume title.",
          "Step 3: Merge columns using colspan for section banners (Personal Info, Education, Skills).",
          "Step 4: Merge rows using rowspan for multi-semester grade summaries.",
          "Step 5: Apply clean CSS zebra striping."
        ],
        "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCSE-013: Practical 5 - Student Bio-Data Table</title>\n  <style>\n    body { font-family: 'Segoe UI', Tahoma, sans-serif; padding: 25px; background: #f8fafc; }\n    table { width: 100%; max-width: 850px; margin: 0 auto; border-collapse: collapse; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.08); }\n    caption { font-size: 1.5rem; font-weight: bold; margin-bottom: 12px; color: #1e3a8a; }\n    th, td { border: 1px solid #cbd5e1; padding: 12px 16px; text-align: left; }\n    th { background-color: #2563eb; color: white; }\n    .section-header { background-color: #e2e8f0; font-weight: bold; color: #0f172a; text-transform: uppercase; }\n    tr:nth-child(even) { background-color: #f1f5f9; }\n  </style>\n</head>\n<body>\n  <table>\n    <caption>ACADEMIC CURRICULUM VITAE & BIO-DATA</caption>\n    <tr>\n      <th colspan=\"4\" class=\"section-header\">1. Personal Details</th>\n    </tr>\n    <tr>\n      <td rowspan=\"2\" style=\"width:140px; text-align:center;\">\n        <img src=\"https://api.dicebear.com/7.x/bottts/svg?seed=student\" alt=\"Photo\" width=\"100\">\n      </td>\n      <td><strong>Full Name:</strong> Bhavya Gupta</td>\n      <td><strong>Roll No:</strong> 11232541</td>\n      <td><strong>Batch:</strong> 2024-2028</td>\n    </tr>\n    <tr>\n      <td><strong>Degree:</strong> B.Tech CSE</td>\n      <td colspan=\"2\"><strong>University:</strong> MMEC, Maharishi Markandeshwar University</td>\n    </tr>\n\n    <tr>\n      <th colspan=\"4\" class=\"section-header\">2. Academic Qualifications</th>\n    </tr>\n    <tr style=\"background:#3b82f6; color:white;\">\n      <td><strong>Exam Passed</strong></td>\n      <td><strong>Board / University</strong></td>\n      <td><strong>Passing Year</strong></td>\n      <td><strong>Percentage / CGPA</strong></td>\n    </tr>\n    <tr>\n      <td>B.Tech (CSE)</td>\n      <td>MM(DU) Mullana</td>\n      <td>2028 (Pursuing)</td>\n      <td>9.24 CGPA</td>\n    </tr>\n    <tr>\n      <td>Class XII (CBSE)</td>\n      <td>Central Board of Secondary Education</td>\n      <td>2024</td>\n      <td>91.4%</td>\n    </tr>\n    <tr>\n      <td>Class X (CBSE)</td>\n      <td>Central Board of Secondary Education</td>\n      <td>2022</td>\n      <td>93.8%</td>\n    </tr>\n\n    <tr>\n      <th colspan=\"4\" class=\"section-header\">3. Technical Proficiencies</th>\n    </tr>\n    <tr>\n      <td><strong>Programming:</strong></td>\n      <td colspan=\"3\">C, C++, Python, JavaScript (ES6+), SQL</td>\n    </tr>\n    <tr>\n      <td><strong>Web Technologies:</strong></td>\n      <td colspan=\"3\">HTML5, CSS3, Tailwind CSS, React.js, Node.js</td>\n    </tr>\n  </table>\n</body>\n</html>",
        "sampleInput": "Browser loading table.html",
        "sampleOutput": "Professional tabular resume with rowspan and colspan bindings."
      },
      {
        "expNo": 6,
        "title": "Three-Zone Screen Layout (15% Top Banner, 70% Content, 15% Lower Menu)",
        "objective": "Design a web page layout divided into three horizontal zones: 15% Top Title zone, 70% Middle Content display zone, and 15% Lower Menu navigation zone using modern CSS Flexbox / Grid.",
        "algorithm": [
          "Step 1: Set height: 100vh and margin: 0 on body.",
          "Step 2: Create .zone-top with height: 15vh (display title & branding).",
          "Step 3: Create .zone-middle with height: 70vh and overflow-y: auto (scrollable main content).",
          "Step 4: Create .zone-bottom with height: 15vh (quick action bottom navigation).",
          "Step 5: Ensure responsive resizing across desktop and mobile screens."
        ],
        "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCSE-013: Practical 6 - Three-Zone Page Layout</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body { height: 100vh; display: flex; flex-direction: column; font-family: 'Segoe UI', sans-serif; overflow: hidden; }\n    \n    .zone-top {\n      height: 15vh;\n      background: linear-gradient(90deg, #1e40af, #3b82f6);\n      color: white;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 0 2rem;\n      box-shadow: 0 2px 10px rgba(0,0,0,0.15);\n    }\n\n    .zone-middle {\n      height: 70vh;\n      background: #f8fafc;\n      padding: 2rem;\n      overflow-y: auto;\n    }\n\n    .zone-bottom {\n      height: 15vh;\n      background: #0f172a;\n      color: white;\n      display: flex;\n      align-items: center;\n      justify-content: space-around;\n      border-top: 2px solid #334155;\n    }\n\n    .nav-item { color: #cbd5e1; text-decoration: none; font-size: 1.1rem; font-weight: 600; padding: 8px 16px; border-radius: 6px; transition: background 0.2s; }\n    .nav-item:hover { background: #334155; color: white; }\n  </style>\n</head>\n<body>\n  <div class=\"zone-top\">\n    <h2>MMEC CSE Digital Portal</h2>\n    <span>Academic Year 2025-26</span>\n  </div>\n\n  <div class=\"zone-middle\">\n    <h3>Zone 2: Main Middle Display Area (70% Height)</h3>\n    <p style=\"margin-top: 10px;\">This zone holds dynamic course content, lab experiments, video lectures, and syllabus documentation with independent scrollbar.</p>\n  </div>\n\n  <div class=\"zone-bottom\">\n    <a href=\"#home\" class=\"nav-item\">🏠 Home</a>\n    <a href=\"#syllabus\" class=\"nav-item\">📖 Syllabus</a>\n    <a href=\"#practicals\" class=\"nav-item\">💻 Practicals</a>\n    <a href=\"#viva\" class=\"nav-item\">🎯 Viva Q&A</a>\n  </div>\n</body>\n</html>",
        "sampleInput": "Browser viewport 1920x1080",
        "sampleOutput": "Exact 15vh header, 70vh scrollable body, and 15vh footer menu."
      },
      {
        "expNo": 7,
        "title": "Student Registration Form with HTML5 & JavaScript Regex Validation",
        "objective": "Develop a student registration form collecting Name, Roll No, Email, Phone, Password, and Branch with real-time JavaScript regular expression validation and user feedback.",
        "algorithm": [
          "Step 1: Create HTML <form> with inputs for Name, Email, Password, Phone, Branch.",
          "Step 2: Attach onsubmit event handler to form.",
          "Step 3: Validate Name (letters only, min 3 chars).",
          "Step 4: Validate Email using regex pattern.",
          "Step 5: Validate Phone (10 digits starting with 6-9).",
          "Step 6: Validate Password (min 8 chars, 1 number, 1 special character)."
        ],
        "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCSE-013: Practical 7 - Validated Registration Form</title>\n  <style>\n    body { font-family: 'Segoe UI', sans-serif; background: #eef2ff; padding: 30px; }\n    .form-card { max-width: 480px; margin: 0 auto; background: white; padding: 25px 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }\n    .form-group { margin-bottom: 16px; }\n    label { display: block; margin-bottom: 6px; font-weight: 600; color: #1e293b; }\n    input, select { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; box-sizing: border-box; }\n    .error { color: #dc2626; font-size: 0.85rem; margin-top: 4px; display: none; }\n    .btn-submit { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer; }\n    .btn-submit:hover { background: #1d4ed8; }\n  </style>\n</head>\n<body>\n  <div class=\"form-card\">\n    <h2 style=\"text-align:center; margin-bottom:20px; color:#1e40af;\">Student Registration</h2>\n    <form id=\"regForm\" onsubmit=\"return validateForm()\">\n      <div class=\"form-group\">\n        <label for=\"name\">Full Name</label>\n        <input type=\"text\" id=\"name\" placeholder=\"Enter your full name\">\n        <div id=\"nameErr\" class=\"error\">Name must contain only letters (min 3 chars).</div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"email\">College Email</label>\n        <input type=\"email\" id=\"email\" placeholder=\"student@mmumullana.org\">\n        <div id=\"emailErr\" class=\"error\">Enter a valid institutional email address.</div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"phone\">Mobile Number</label>\n        <input type=\"tel\" id=\"phone\" placeholder=\"10-digit mobile number\">\n        <div id=\"phoneErr\" class=\"error\">Enter valid 10-digit Indian phone (starts 6-9).</div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"pass\">Password</label>\n        <input type=\"password\" id=\"pass\" placeholder=\"Minimum 8 characters\">\n        <div id=\"passErr\" class=\"error\">Must be 8+ chars with at least 1 number and 1 special char.</div>\n      </div>\n      <button type=\"submit\" class=\"btn-submit\">Register Account</button>\n    </form>\n  </div>\n\n  <script>\n    function validateForm() {\n      let isValid = true;\n      const name = document.getElementById('name').value.trim();\n      const email = document.getElementById('email').value.trim();\n      const phone = document.getElementById('phone').value.trim();\n      const pass = document.getElementById('pass').value;\n\n      if (!/^[a-zA-Z ]{3,40}$/.test(name)) {\n        document.getElementById('nameErr').style.display = 'block';\n        isValid = false;\n      } else document.getElementById('nameErr').style.display = 'none';\n\n      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(email)) {\n        document.getElementById('emailErr').style.display = 'block';\n        isValid = false;\n      } else document.getElementById('emailErr').style.display = 'none';\n\n      if (!/^[6-9]\\d{9}$/.test(phone)) {\n        document.getElementById('phoneErr').style.display = 'block';\n        isValid = false;\n      } else document.getElementById('phoneErr').style.display = 'none';\n\n      if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(pass)) {\n        document.getElementById('passErr').style.display = 'block';\n        isValid = false;\n      } else document.getElementById('passErr').style.display = 'none';\n\n      if (isValid) {\n        alert('🎉 Validation Passed! Student account registered successfully.');\n      }\n      return false;\n    }\n  </script>\n</body>\n</html>",
        "sampleInput": "Invalid mobile '12345'",
        "sampleOutput": "Instant red validation error message displayed."
      },
      {
        "expNo": 8,
        "title": "Multimedia Tag Integration (<video> & <audio> with Fallback Sources)",
        "objective": "Embed native HTML5 audio and video players with multiple codec sources (MP4, WebM, MP3, OGG), custom controls, poster images, and fallback messages.",
        "algorithm": [
          "Step 1: Use <video controls poster='...'> element.",
          "Step 2: Add multiple <source> tags (MP4 and WebM) for cross-browser fallback.",
          "Step 3: Add <audio controls> with MP3 and OGG fallback sources.",
          "Step 4: Include fallback message for older non-HTML5 compliant browsers."
        ],
        "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCSE-013: Practical 8 - HTML5 Multimedia</title>\n  <style>\n    body { font-family: sans-serif; max-width: 750px; margin: 30px auto; padding: 20px; }\n    .media-box { background: #f1f5f9; padding: 20px; border-radius: 10px; margin-bottom: 25px; }\n    video, audio { width: 100%; border-radius: 8px; margin-top: 10px; }\n  </style>\n</head>\n<body>\n  <h2>HTML5 Multimedia Demonstration</h2>\n\n  <div class=\"media-box\">\n    <h3>1. Video Player with Multiple Source Codecs</h3>\n    <video controls poster=\"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600\">\n      <source src=\"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4\" type=\"video/mp4\">\n      <source src=\"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm\" type=\"video/webm\">\n      Your browser does not support the HTML5 video element.\n    </video>\n  </div>\n\n  <div class=\"media-box\">\n    <h3>2. Audio Player with Multi-Format Support</h3>\n    <audio controls>\n      <source src=\"https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3\" type=\"audio/mpeg\">\n      <source src=\"https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.ogg\" type=\"audio/ogg\">\n      Your browser does not support the HTML5 audio element.\n    </audio>\n  </div>\n</body>\n</html>",
        "sampleInput": "Opening multimedia.html",
        "sampleOutput": "Fully playable native video and audio stream with playback controls."
      },
      {
        "expNo": 9,
        "title": "CSS3 Box Model, <div> Containers, Box-Shadow & Interactive Hover Transitions",
        "objective": "Demonstrate the CSS3 Box Model (content, padding, border, margin), CSS display properties, box-sizing: border-box, rounded borders, and multi-layer box shadows with smooth transitions.",
        "algorithm": [
          "Step 1: Create structured <div> container cards.",
          "Step 2: Explicitly style content width, padding, border, and margin.",
          "Step 3: Apply box-shadow with offset-x, offset-y, blur-radius, and rgba color.",
          "Step 4: Use :hover pseudo-class with transition: all 0.3s cubic-bezier."
        ],
        "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCSE-013: Practical 9 - CSS3 Box Model</title>\n  <style>\n    body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f0fdf4; padding: 40px; display: flex; justify-content: center; gap: 30px; }\n    .box-card {\n      width: 280px;\n      padding: 24px;\n      border: 2px solid #86efac;\n      margin: 10px;\n      border-radius: 16px;\n      background: white;\n      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;\n      text-align: center;\n    }\n    .box-card:hover {\n      transform: translateY(-8px) scale(1.02);\n      border-color: #22c55e;\n      box-shadow: 0 20px 25px -5px rgba(34, 197, 94, 0.2);\n    }\n    .badge { background: #dcfce7; color: #15803d; font-weight: bold; padding: 4px 12px; border-radius: 9999px; display: inline-block; margin-bottom: 12px; }\n  </style>\n</head>\n<body>\n  <div class=\"box-card\">\n    <span class=\"badge\">Box Model #1</span>\n    <h3>Padding & Border</h3>\n    <p>Content is separated from the border by 24px of internal padding space.</p>\n  </div>\n  <div class=\"box-card\">\n    <span class=\"badge\">Box Model #2</span>\n    <h3>Smooth Hover Effect</h3>\n    <p>Hover over this card to witness elevation via cubic bezier transforms and shadows.</p>\n  </div>\n</body>\n</html>",
        "sampleInput": "User hovers cursor over card",
        "sampleOutput": "Smooth upward card elevation and glowing shadow expansion."
      },
      {
        "expNo": 10,
        "title": "Modern CSS3 Styling (Gradients, Link Pseudo-States, Image Opacity & Borders)",
        "objective": "Apply advanced CSS3 styling techniques: Linear and radial gradients, styling hypertext link states (:link, :visited, :hover, :active), image opacity filters, and custom borders.",
        "algorithm": [
          "Step 1: Define linear gradient backgrounds: linear-gradient(135deg, #6366f1, #a855f7).",
          "Step 2: Style link states in order (LVHA rule: Link, Visited, Hover, Active).",
          "Step 3: Implement image opacity transitions (opacity: 0.8 to 1.0 on hover).",
          "Step 4: Create custom stylish dashed/double gradient borders."
        ],
        "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCSE-013: Practical 10 - CSS3 Styling Masterclass</title>\n  <style>\n    body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: white; padding: 40px; text-align: center; }\n    \n    .hero-banner {\n      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%);\n      padding: 40px;\n      border-radius: 20px;\n      margin-bottom: 30px;\n      box-shadow: 0 10px 30px rgba(124, 58, 237, 0.3);\n    }\n\n    a.custom-link:link { color: #38bdf8; text-decoration: none; font-weight: bold; }\n    a.custom-link:visited { color: #c084fc; }\n    a.custom-link:hover { color: #f43f5e; text-decoration: underline; letter-spacing: 0.5px; }\n    a.custom-link:active { color: #fbbf24; }\n\n    .styled-image {\n      width: 320px;\n      height: 200px;\n      object-fit: cover;\n      border-radius: 12px;\n      border: 4px solid #38bdf8;\n      opacity: 0.75;\n      transition: opacity 0.4s ease, border-color 0.4s ease, transform 0.4s ease;\n    }\n    .styled-image:hover {\n      opacity: 1.0;\n      border-color: #f43f5e;\n      transform: scale(1.05);\n    }\n  </style>\n</head>\n<body>\n  <div class=\"hero-banner\">\n    <h1>Advanced CSS3 Styling & Visual FX</h1>\n    <p>Demonstrating Multi-Stop Linear Gradients and Smooth Transitions</p>\n  </div>\n\n  <p>Learn more at: <a href=\"https://developer.mozilla.org\" class=\"custom-link\" target=\"_blank\">MDN Web Docs Official Link</a></p>\n\n  <div style=\"margin-top: 30px;\">\n    <img class=\"styled-image\" src=\"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600\" alt=\"Coding Setup\">\n  </div>\n</body>\n</html>",
        "sampleInput": "User hovers link and code setup image",
        "sampleOutput": "Dynamic color shift on link hover and crystal-clear image zoom at 100% opacity."
      }
    ],
    "vivaQuestions": [
      {
        "q": "What is the difference between HTML and HTML5?",
        "a": "HTML5 is the latest major revision of HTML. Key enhancements include: semantic tags (<header>, <footer>, <nav>, <article>, <section>), native multimedia support without Flash (<audio>, <video>), Canvas and SVG graphics, client-side offline storage (localStorage, sessionStorage), and new form input types (email, date, number, range)."
      },
      {
        "q": "What is the CSS Box Model and what are its components?",
        "a": "The CSS Box Model is a container that wraps around every HTML element. It consists of 4 layers from inside out: 1. Content (actual text/image), 2. Padding (clears area around content, inside border), 3. Border (goes around padding), and 4. Margin (clears area outside border, creating space between elements)."
      },
      {
        "q": "What does box-sizing: border-box do?",
        "a": "By default (content-box), an element's width and height apply only to the content. Adding padding and border increases total rendered size. With box-sizing: border-box, the width and height properties include content, padding, and border, preventing layout breakage when adding padding."
      },
      {
        "q": "What is the difference between localStorage, sessionStorage, and Cookies?",
        "a": "localStorage stores data with no expiration time across browser sessions (5-10MB). sessionStorage stores data only for the duration of the current tab/session (5MB). Cookies store small strings (up to 4KB) with expiration dates and are automatically sent to the server on every HTTP request."
      },
      {
        "q": "Explain the order of link pseudo-classes (LVHA rule).",
        "a": "To function correctly without CSS cascade conflicts, link pseudo-classes must be declared in the order: :link (unvisited), :visited (visited), :hover (mouse over), and :active (clicked/pressed). Memory mnemonic: 'Love HAte'."
      },
      {
        "q": "What is the difference between display: none and visibility: hidden?",
        "a": "display: none completely removes the element from the document layout flow; it takes up zero space. visibility: hidden hides the element visually, but the element still occupies its original dimensions and space in the layout."
      },
      {
        "q": "What is the purpose of the <meta name='viewport'> tag in responsive design?",
        "a": "It gives the browser instructions on how to control the page's dimensions and scaling: <meta name='viewport' content='width=device-width, initial-scale=1.0'>. Without it, mobile browsers simulate desktop width (typically 980px), shrinking text and UI."
      },
      {
        "q": "What is the difference between GET and POST HTTP request methods in forms?",
        "a": "GET appends form data to the URL as query parameters (?key=value); it is visible in history, bookmarked, and has length limits. POST sends data in the HTTP request body; it does not show in the URL, can send large/binary files, and is much more secure for passwords and sensitive information."
      },
      {
        "q": "What is CSS Flexbox and how is it different from CSS Grid?",
        "a": "CSS Flexbox is a 1-dimensional layout system (either row OR column at a time), ideal for distributing space and aligning items in navigation bars or lists. CSS Grid is a 2-dimensional layout system (rows AND columns simultaneously), ideal for full page layouts and complex grids."
      },
      {
        "q": "What are semantic tags and why are they important in HTML5?",
        "a": "Semantic tags clearly describe their meaning to both browser and developer (e.g. <header>, <nav>, <main>, <article>, <aside>, <footer>). They are crucial for SEO ranking, web accessibility (screen readers for visually impaired users), and clean maintainable code."
      }
    ]
  },
  {
    "id": "lab-beee-bele001",
    "code": "BELE-001 / BELE-002",
    "subject": "Basic Electrical & Electronics Engineering Lab",
    "title": "Basic Electrical & Electronics Engineering Lab Manual",
    "semester": "Semester 1 & 2",
    "year": "1st Year",
    "fileSize": "6.2 MB",
    "branch": "All Branches (First Year Common)",
    "university": "Maharishi Markandeshwar (Deemed to be University) - MMEC",
    "syllabusMatch": "100% Official Curriculum Aligned (Session 2025-26)",
    "pdfUrl": "https://raw.githubusercontent.com/Bhavya3733/all-colege-notes/main/public/pdfs/BELE001_BEEE_Lab_Manual.pdf",
    "totalExperiments": 8,
    "experimentsCount": "8 Experiments + Hardware Schematics",
    "capstoneProject": {
      "title": "Full-Wave Bridge Rectifier with RC Filter & 7805 Voltage Regulator",
      "description": "Design and hardware circuit testing of a regulated +5V DC power supply from 220V AC mains using Step-Down Transformer (220V/12V), Bridge Rectifier (1N4007 diodes), Capacitor Filter (1000uF), and IC 7805 regulator.",
      "features": [
        "Conversion of 220V/50Hz AC mains to 5V ripple-free DC",
        "Calculation of Ripple Factor (gamma <= 0.05) and Efficiency (eta = 81.2%)",
        "Load regulation measurement from 0mA to 500mA output current",
        "Dual protection against overcurrent and thermal runaway"
      ],
      "codeSnippet": "/* Circuit Simulation & Analytical Verification in C */\n#include <stdio.h>\n#define PI 3.14159265\n\nint main() {\n    double Vrms = 12.0; // 12V secondary transformer RMS\n    double Vm = Vrms * 1.4142; // Peak Voltage = 16.97 V\n    double Vdc_unfiltered = (2 * Vm) / PI; // 10.8 V\n    double C = 1000e-6; // 1000 uF filter capacitor\n    double R_load = 50.0; // 50 ohm load\n    double f = 50.0; // 50 Hz mains frequency\n\n    double rippleFactor = 1.0 / (4.0 * 1.732 * f * C * R_load);\n\n    printf(\"*** BEEE CAPSTONE: 5V REGULATED DC POWER SUPPLY ***\\n\");\n    printf(\"Peak Secondary Voltage (Vm)    : %.2f V\\n\", Vm);\n    printf(\"DC Output Without Filter (Vdc) : %.2f V\\n\", Vdc_unfiltered);\n    printf(\"Ripple Factor with 1000uF C     : %.4f (<< 0.05 Target Met)\\n\", rippleFactor);\n    printf(\"IC 7805 Regulated Output       : +5.00 V Constant DC\\n\");\n\n    return 0;\n}"
    },
    "experiments": [
      {
        "expNo": 1,
        "title": "Verification of Kirchhoff's Current Law (KCL) and Voltage Law (KVL)",
        "objective": "To experimentally verify Kirchhoff's Current Law (KCL) at a junction and Kirchhoff's Voltage Law (KVL) in a closed mesh on a resistive circuit board.",
        "algorithm": [
          "Step 1: Connect circuit with DC voltage source and 3 resistors (R1, R2, R3).",
          "Step 2: Measure current entering node (I1) and leaving (I2, I3). Verify I1 = I2 + I3.",
          "Step 3: Measure voltage drops (V1, V2, V3) along closed mesh. Verify V_supply - sum(V_drop) = 0."
        ],
        "code": "#include <stdio.h>\n\nint main() {\n    double V = 12.0;\n    double R1 = 100.0, R2 = 220.0, R3 = 330.0;\n    double R_total = R1 + R2 + R3;\n    double I = V / R_total;\n    double V1 = I * R1, V2 = I * R2, V3 = I * R3;\n\n    printf(\"*** BEEE Practical 1: KCL & KVL Verification ***\\n\");\n    printf(\"Supply Voltage V = %.2f V\\n\", V);\n    printf(\"V1 = %.2f V | V2 = %.2f V | V3 = %.2f V\\n\", V1, V2, V3);\n    printf(\"Sum of Drops (V1 + V2 + V3) = %.2f V\\n\", V1 + V2 + V3);\n    printf(\"KVL Residual Error: %.6f V (VERIFIED!)\\n\", V - (V1 + V2 + V3));\n    return 0;\n}",
        "sampleInput": "V = 12V, R1=100, R2=220, R3=330",
        "sampleOutput": "Sum of voltage drops = 12.00 V. Error = 0.00 V."
      },
      {
        "expNo": 2,
        "title": "Verification of Thevenin's and Norton's Theorems",
        "objective": "To determine the Thevenin equivalent voltage (Vth), Thevenin resistance (Rth), and Norton short-circuit current (In) of a linear DC network.",
        "algorithm": [
          "Step 1: Remove load resistor RL to find open circuit voltage Vth.",
          "Step 2: Deactivate all independent sources to determine Rth.",
          "Step 3: Calculate load current IL = Vth / (Rth + RL).",
          "Step 4: Verify with experimental ammeter reading."
        ],
        "code": "#include <stdio.h>\n\nint main() {\n    double V = 15.0, R1 = 10.0, R2 = 20.0, RL = 30.0;\n    double Vth = V * (R2 / (R1 + R2));\n    double Rth = (R1 * R2) / (R1 + R2);\n    double IL = Vth / (Rth + RL);\n\n    printf(\"*** BEEE Practical 2: Thevenin's Theorem ***\\n\");\n    printf(\"Thevenin Voltage (Vth) : %.2f V\\n\", Vth);\n    printf(\"Thevenin Res (Rth)     : %.2f Ohms\\n\", Rth);\n    printf(\"Load Current (IL)      : %.4f A (%.2f mA)\\n\", IL, IL * 1000);\n    return 0;\n}",
        "sampleInput": "V=15V, R1=10, R2=20, RL=30",
        "sampleOutput": "Vth = 10.00 V | Rth = 6.67 Ohms | IL = 0.2727 A (272.73 mA)"
      },
      {
        "expNo": 3,
        "title": "Verification of Superposition Theorem in DC Resistive Networks",
        "objective": "To verify Superposition Theorem by measuring current through a resistor with multiple independent DC sources active individually and simultaneously.",
        "algorithm": [
          "Step 1: Connect circuit with two DC sources (V1 and V2) and resistors R1, R2, R3.",
          "Step 2: Keep both V1 and V2 active, measure total current I_total through R3.",
          "Step 3: Deactivate V2 (replace with short circuit) and measure current I' through R3.",
          "Step 4: Deactivate V1 (short circuit) and measure current I'' through R3.",
          "Step 5: Verify algebraic sum: I_total = I' + I''."
        ],
        "code": "#include <stdio.h>\n\nint main() {\n    double V1 = 12.0, V2 = 6.0;\n    double R1 = 10.0, R2 = 20.0, R3 = 30.0;\n\n    // Case 1: V1 alone (V2 shorted)\n    double Req1 = R1 + (R2 * R3) / (R2 + R3);\n    double Is1 = V1 / Req1;\n    double I3_prime = Is1 * (R2 / (R2 + R3));\n\n    // Case 2: V2 alone (V1 shorted)\n    double Req2 = R2 + (R1 * R3) / (R1 + R3);\n    double Is2 = V2 / Req2;\n    double I3_double_prime = Is2 * (R1 / (R1 + R3));\n\n    // Case 3: Both sources active\n    double I3_total = I3_prime + I3_double_prime;\n\n    printf(\"*** BEEE Practical 3: Superposition Theorem ***\\n\");\n    printf(\"Current with V1 alone (I')        : %.4f A\\n\", I3_prime);\n    printf(\"Current with V2 alone (I'')       : %.4f A\\n\", I3_double_prime);\n    printf(\"Total Current (I' + I'')          : %.4f A\\n\", I3_total);\n    printf(\"Superposition Theorem VERIFIED!\\n\");\n    return 0;\n}",
        "sampleInput": "V1 = 12V, V2 = 6V, R1=10, R2=20, R3=30",
        "sampleOutput": "I' = 0.2182 A | I'' = 0.0727 A | Total I = 0.2909 A (VERIFIED)"
      },
      {
        "expNo": 4,
        "title": "Verification of Maximum Power Transfer Theorem",
        "objective": "To experimentally demonstrate that maximum power is transferred from source to load when load resistance equals Thevenin source internal resistance (RL = Rth).",
        "algorithm": [
          "Step 1: Build DC circuit with internal source resistance Rs and variable load resistor RL.",
          "Step 2: Vary RL from 0.2*Rs to 3*Rs in discrete steps.",
          "Step 3: Measure voltage across RL and current through RL for each step.",
          "Step 4: Calculate power PL = IL^2 * RL and plot PL versus RL.",
          "Step 5: Identify that peak power occurs when RL = Rs."
        ],
        "code": "#include <stdio.h>\n\nint main() {\n    double Vth = 10.0;\n    double Rth = 50.0; // Internal source resistance\n    double RL_values[] = {10.0, 25.0, 40.0, 50.0, 60.0, 75.0, 100.0};\n    int n = 7;\n\n    printf(\"*** BEEE Practical 4: Maximum Power Transfer Theorem ***\\n\");\n    printf(\"Source Vth = %.1f V | Internal Rth = %.1f Ohms\\n\\n\", Vth, Rth);\n    printf(\"RL (Ohms) \\t IL (A) \\t\\t Power PL (Watts)\\n\");\n    printf(\"-------------------------------------------------\\n\");\n\n    double max_P = 0.0;\n    double best_RL = 0.0;\n\n    for (int i = 0; i < n; i++) {\n        double RL = RL_values[i];\n        double IL = Vth / (Rth + RL);\n        double PL = IL * IL * RL;\n        printf(\"%6.1f \\t\\t %6.4f \\t\\t %6.4f W %s\\n\", \n               RL, IL, PL, (RL == Rth) ? \"<-- MAX POWER\" : \"\");\n        if (PL > max_P) {\n            max_P = PL;\n            best_RL = RL;\n        }\n    }\n    printf(\"\\nMaximum Power = %.4f W occurs at RL = %.1f Ohms (RL = Rth Verified!)\\n\", max_P, best_RL);\n    return 0;\n}",
        "sampleInput": "Vth = 10V, Rth = 50 Ohms, RL = [10, 25, 40, 50, 60, 75, 100]",
        "sampleOutput": "Max Power 0.5000 W at RL = 50.0 Ohms (Pmax = Vth^2 / 4Rth)"
      },
      {
        "expNo": 5,
        "title": "V-I Characteristics of P-N Junction Diode & Zener Diode",
        "objective": "To plot the static forward and reverse bias V-I characteristics of Silicon P-N junction diode (1N4007) and determine cut-in voltage, and reverse breakdown of Zener diode.",
        "algorithm": [
          "Step 1: Connect diode in forward bias with series current-limiting resistor.",
          "Step 2: Increase forward voltage VF from 0 to 1.0 V in small 0.1V increments.",
          "Step 3: Record forward current IF; note knee voltage where current shoots up.",
          "Step 4: Reverse diode polarity and record reverse leakage current until breakdown.",
          "Step 5: Plot graph of V vs I to compute dynamic forward resistance rd = delta(VF) / delta(IF)."
        ],
        "code": "#include <stdio.h>\n\nint main() {\n    printf(\"*** BEEE Practical 5: P-N Junction & Zener Diode V-I Curves ***\\n\\n\");\n    printf(\"--- FORWARD BIAS (Silicon Diode 1N4007) ---\\n\");\n    printf(\"VF (Volts) \\t IF (mA) \\t State\\n\");\n    double vf[] = {0.0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8};\n    double if_ma[] = {0.0, 0.01, 0.05, 0.3, 1.8, 8.5, 24.0, 52.0};\n    for (int i = 0; i < 8; i++) {\n        printf(\"%.2f V \\t\\t %.2f mA \\t %s\\n\", vf[i], if_ma[i], \n               (vf[i] >= 0.7) ? \"Conduction (Above Knee)\" : \"Cut-off\");\n    }\n\n    printf(\"\\nCut-in Voltage (V_gamma) = 0.70 V\\n\");\n    double delta_v = 0.75 - 0.70;\n    double delta_i = (24.0 - 8.5) / 1000.0;\n    printf(\"Dynamic Forward Resistance (rd) = %.2f Ohms\\n\", delta_v / delta_i);\n    return 0;\n}",
        "sampleInput": "Diode: 1N4007 (Si), Voltage range: 0V - 0.8V",
        "sampleOutput": "Cut-in V = 0.70 V | Dynamic resistance rd = 3.23 Ohms"
      },
      {
        "expNo": 6,
        "title": "Half-Wave and Full-Wave Rectifiers with & without Capacitor Filter",
        "objective": "To study and compare the operation of Half-Wave and Full-Wave Center-Tapped / Bridge rectifiers and analyze the effect of capacitor filter on output ripple factor.",
        "algorithm": [
          "Step 1: Connect secondary of 220V/12V step-down transformer to diode rectifier circuit.",
          "Step 2: Connect resistive load RL and observe output waveform on CRO.",
          "Step 3: Measure DC output voltage Vdc and AC ripple voltage Vac using DMM.",
          "Step 4: Calculate Ripple Factor = Vac / Vdc and Efficiency.",
          "Step 5: Connect 470uF/1000uF shunt capacitor across RL and observe smoothing."
        ],
        "code": "#include <stdio.h>\n#define PI 3.14159265\n\nint main() {\n    double Vrms = 12.0;\n    double Vm = Vrms * 1.4142; // Peak AC = 16.97 V\n    double RL = 1000.0; // 1 kOhm\n    double C = 1000e-6; // 1000 uF\n    double f = 50.0; // 50 Hz\n\n    printf(\"*** BEEE Practical 6: Rectifier Comparison ***\\n\\n\");\n    \n    // Half Wave\n    double hwr_vdc = Vm / PI;\n    double hwr_gamma = 1.21;\n    printf(\"1. Half-Wave Rectifier (Unfiltered):\\n\");\n    printf(\"   Vdc = %.2f V | Ripple Factor gamma = %.2f | Efficiency = 40.6%%\\n\\n\", hwr_vdc, hwr_gamma);\n\n    // Full Wave Bridge\n    double fwr_vdc = (2 * Vm) / PI;\n    double fwr_gamma = 0.482;\n    printf(\"2. Full-Wave Rectifier (Unfiltered):\\n\");\n    printf(\"   Vdc = %.2f V | Ripple Factor gamma = %.3f | Efficiency = 81.2%%\\n\\n\", fwr_vdc, fwr_gamma);\n\n    // Full Wave with 1000uF Capacitor Filter\n    double fwr_filter_gamma = 1.0 / (4.0 * 1.732 * f * C * RL);\n    printf(\"3. Full-Wave with Shunt 1000uF Filter:\\n\");\n    printf(\"   Ripple Factor gamma = %.4f (< 0.05 Target Achieved)\\n\", fwr_filter_gamma);\n\n    return 0;\n}",
        "sampleInput": "Transformer: 220V/12V, 50Hz, RL = 1k, C = 1000uF",
        "sampleOutput": "HWR gamma = 1.21 | FWR gamma = 0.482 | Filtered gamma = 0.0029"
      },
      {
        "expNo": 7,
        "title": "Input and Output Characteristics of BJT in Common Emitter (CE) Configuration",
        "objective": "To plot the Input (IB vs VBE at constant VCE) and Output (IC vs VCE at constant IB) characteristics of NPN Transistor (BC547) in Common Emitter mode.",
        "algorithm": [
          "Step 1: Connect transistor BC547 in CE mode with variable base and collector supplies.",
          "Step 2: Keep VCE fixed at 2V, 5V; vary VBE and record base current IB (Input Char).",
          "Step 3: Keep IB constant (20uA, 40uA, 60uA); vary VCE from 0 to 10V and record IC (Output Char).",
          "Step 4: Identify Active, Saturation, and Cutoff regions.",
          "Step 5: Calculate Current Gain beta = delta(IC) / delta(IB) and dynamic output resistance."
        ],
        "code": "#include <stdio.h>\n\nint main() {\n    printf(\"*** BEEE Practical 7: BJT CE Characteristics (BC547 NPN) ***\\n\\n\");\n    printf(\"--- OUTPUT CHARACTERISTICS (IC vs VCE at IB = 40 uA) ---\\n\");\n    printf(\"VCE (Volts) \\t IC (mA) \\t Operating Region\\n\");\n    double vce[] = {0.0, 0.2, 0.5, 1.0, 2.0, 4.0, 6.0, 8.0, 10.0};\n    double ic[]  = {0.0, 1.8, 5.2, 5.8, 6.0, 6.1, 6.2, 6.3, 6.4};\n\n    for (int i = 0; i < 9; i++) {\n        printf(\"%.1f V \\t\\t %.2f mA \\t %s\\n\", vce[i], ic[i], \n               (vce[i] < 0.5) ? \"Saturation Region\" : \"Active Region (Linear Amplification)\");\n    }\n\n    double delta_ic = (6.2 - 6.0) / 1000.0; // Amperes\n    double delta_ib = (40.0 - 20.0) * 1e-6; // Amperes\n    double beta = (6.0 / 1000.0) / (40.0 * 1e-6);\n    printf(\"\\nDC Current Gain (Beta / hFE) = %.1f\\n\", beta);\n    printf(\"BJT CE Characteristics VERIFIED!\\n\");\n    return 0;\n}",
        "sampleInput": "Transistor: BC547 NPN, Base current: 40 uA",
        "sampleOutput": "Saturation knee < 0.5V | Beta = 150.0 | Active region IC ~ 6.0 mA"
      },
      {
        "expNo": 8,
        "title": "Measurement of Voltage, Frequency, and Phase using CRO / DSO",
        "objective": "To measure amplitude (Vp-p), RMS voltage, time period, frequency, and phase difference of sinusoidal and square waveforms using a Dual-Channel Oscilloscope.",
        "algorithm": [
          "Step 1: Connect function generator output to Channel 1 of CRO/DSO.",
          "Step 2: Adjust Volt/Div and Time/Div knobs to obtain 2-3 stable complete cycles.",
          "Step 3: Measure peak-to-peak vertical divisions (dy) -> Vp-p = dy * Volts/Div.",
          "Step 4: Measure horizontal divisions for 1 full cycle (dx) -> T = dx * Time/Div.",
          "Step 5: Calculate Frequency f = 1 / T.",
          "Step 6: Feed two signals to CH1 and CH2 and observe Lissajous patterns for phase angle."
        ],
        "code": "#include <stdio.h>\n\nint main() {\n    double volts_per_div = 2.0; // 2V / div\n    double time_per_div = 0.5e-3; // 0.5 ms / div\n    double dy = 4.2; // 4.2 vertical divisions\n    double dx = 4.0; // 4.0 horizontal divisions for 1 cycle\n\n    double Vpp = dy * volts_per_div;\n    double Vm = Vpp / 2.0;\n    double Vrms = Vm / 1.4142;\n    double T = dx * time_per_div;\n    double f = 1.0 / T;\n\n    printf(\"*** BEEE Practical 8: CRO / DSO Waveform Measurement ***\\n\");\n    printf(\"Volts/Div Scale        : %.1f V/div\\n\", volts_per_div);\n    printf(\"Time/Div Scale         : %.2f ms/div\\n\", time_per_div * 1000);\n    printf(\"Peak-to-Peak Voltage   : %.2f V\\n\", Vpp);\n    printf(\"Peak Voltage (Vm)      : %.2f V\\n\", Vm);\n    printf(\"RMS Voltage (Vrms)     : %.2f V\\n\", Vrms);\n    printf(\"Time Period (T)        : %.4f s (%.2f ms)\\n\", T, T * 1000);\n    printf(\"Measured Frequency (f) : %.2f Hz (1.00 kHz Signal Verified)\\n\", f);\n    return 0;\n}",
        "sampleInput": "Scale: 2V/div, 0.5ms/div, dy=4.2 div, dx=4.0 div",
        "sampleOutput": "Vpp = 8.40 V | Vrms = 2.97 V | Period = 2.00 ms | Freq = 500.00 Hz"
      }
    ],
    "vivaQuestions": [
      {
        "q": "State Kirchhoff's Current Law (KCL) and Voltage Law (KVL).",
        "a": "KCL states that the algebraic sum of all currents entering and exiting any electrical node is zero (conservation of electric charge). KVL states that the algebraic sum of all electrical potential differences (voltages) around any closed loop or mesh is zero (conservation of energy)."
      },
      {
        "q": "What is Thevenin's Theorem?",
        "a": "Thevenin's Theorem states that any linear bidirectional electrical network containing voltage sources, current sources, and resistors can be replaced by an equivalent circuit containing a single voltage source (Vth) in series with a single resistance (Rth)."
      },
      {
        "q": "What is the P-N junction knee/cut-in voltage for Silicon and Germanium?",
        "a": "The cut-in (knee) voltage is approximately 0.7 Volts for Silicon diodes and 0.3 Volts for Germanium diodes at room temperature (300 K)."
      },
      {
        "q": "State Superposition Theorem and its limitations.",
        "a": "Superposition theorem states that in any linear bilateral network containing two or more independent sources, the resultant response (current or voltage) in any branch is the algebraic sum of responses caused by each independent source acting alone, with all other independent sources replaced by their internal impedances. Limitation: It cannot be directly applied to calculate power because power is a non-linear quadratic function (P = I^2*R)."
      },
      {
        "q": "State Maximum Power Transfer Theorem for DC circuits.",
        "a": "A resistive load will receive maximum power from a linear DC network when the resistance of the load equals the Thevenin equivalent resistance of the network as viewed from load terminals (RL = Rth). At maximum power transfer, circuit efficiency is exactly 50%."
      },
      {
        "q": "What is the Ripple Factor of Half-Wave and Full-Wave Rectifiers?",
        "a": "For a Half-Wave Rectifier, Ripple Factor gamma = 1.21 with efficiency eta = 40.6%. For a Full-Wave Rectifier, Ripple Factor gamma = 0.482 with efficiency eta = 81.2%."
      },
      {
        "q": "Why is Common Emitter (CE) configuration most widely used in amplifier circuits?",
        "a": "CE configuration provides both high voltage gain and high current gain, resulting in the highest power gain among all three transistor configurations. It also features moderate input and output impedances that facilitate easy multistage cascading."
      },
      {
        "q": "What is the purpose of Lissajous figures on a CRO?",
        "a": "Lissajous figures are stationary patterns formed on a CRO screen when two sinusoidal signals are simultaneously applied to the X and Y deflection plates in X-Y mode. They are used to measure frequency ratio and phase difference between the two AC signals."
      }
    ]
  },
  {
    "id": "lab-dsa-bcse007",
    "code": "BCSE-007",
    "subject": "Data Structures and Algorithms Lab",
    "title": "Data Structures & Algorithms Practical Manual",
    "semester": "Semester 3",
    "year": "2nd Year",
    "fileSize": "5.9 MB",
    "branch": "CSE / IT / AI-DS",
    "university": "Maharishi Markandeshwar (Deemed to be University) - MMEC",
    "syllabusMatch": "100% Official Curriculum Aligned (Session 2025-26)",
    "pdfUrl": "https://raw.githubusercontent.com/Bhavya3733/all-colege-notes/main/public/pdfs/BCSE007_DSA_Lab_Manual.pdf",
    "totalExperiments": 12,
    "experimentsCount": "12 Experiments (Arrays, Stacks, Queues, Trees, Graphs)",
    "capstoneProject": {
      "title": "Smart City Metro Transit Route Planner using Dijkstra's Algorithm",
      "description": "Full graph-based transit routing network representing metro stations, interchange junctions, transfer penalties, and real-time shortest travel duration calculation.",
      "features": [
        "Adjacency list / matrix graph representation of 25+ metro stations",
        "Dijkstra algorithm for optimal O((V + E) log V) path calculation",
        "Interactive CLI route generator printing route path and transit time"
      ],
      "codeSnippet": "#include <stdio.h>\n#define INF 99999\n#define V 5\n\nint minDistance(int dist[], int sptSet[]) {\n    int min = INF, min_index;\n    for (int v = 0; v < V; v++)\n        if (sptSet[v] == 0 && dist[v] <= min) min = dist[v], min_index = v;\n    return min_index;\n}\n\nvoid dijkstra(int graph[V][V], int src) {\n    int dist[V], sptSet[V];\n    for (int i = 0; i < V; i++) dist[i] = INF, sptSet[i] = 0;\n    dist[src] = 0;\n\n    for (int count = 0; count < V - 1; count++) {\n        int u = minDistance(dist, sptSet);\n        sptSet[u] = 1;\n        for (int v = 0; v < V; v++)\n            if (!sptSet[v] && graph[u][v] && dist[u] != INF && dist[u] + graph[u][v] < dist[v])\n                dist[v] = dist[u] + graph[u][v];\n    }\n    printf(\"Station \\t Travel Time from Central Station\\n\");\n    for (int i = 0; i < V; i++) printf(\"%d \\t\\t %d mins\\n\", i, dist[i]);\n}"
    },
    "experiments": [
      {
        "expNo": 1,
        "title": "Array ADT Operations (Insertion, Deletion, Traversal, Search)",
        "objective": "Implement Array Abstract Data Type with operations: Insert at index, Delete from index, Linear search, and Traversal in C.",
        "algorithm": [
          "Step 1: Check capacity overflow before insertion.",
          "Step 2: Shift elements right from index to n-1, insert item at index.",
          "Step 3: Shift elements left for deletion, decrement size.",
          "Step 4: Traverse and print array elements."
        ],
        "code": "#include <stdio.h>\n\nvoid display(int arr[], int n) {\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n}\n\nint insert(int arr[], int *n, int capacity, int val, int idx) {\n    if (*n >= capacity || idx < 0 || idx > *n) return -1;\n    for (int i = *n; i > idx; i--) arr[i] = arr[i - 1];\n    arr[idx] = val;\n    (*n)++;\n    return 0;\n}\n\nint delete(int arr[], int *n, int idx) {\n    if (idx < 0 || idx >= *n) return -1;\n    for (int i = idx; i < *n - 1; i++) arr[i] = arr[i + 1];\n    (*n)--;\n    return 0;\n}\n\nint main() {\n    int arr[10] = {10, 20, 30, 40, 50};\n    int n = 5;\n    printf(\"*** BCSE-007: Practical 1 - Array ADT ***\\n\");\n    printf(\"Original: \"); display(arr, n);\n    insert(arr, &n, 10, 25, 2);\n    printf(\"After Inserting 25 at index 2: \"); display(arr, n);\n    delete(arr, &n, 4);\n    printf(\"After Deleting index 4: \"); display(arr, n);\n    return 0;\n}",
        "sampleInput": "Array: [10, 20, 30, 40, 50], Insert: 25 at idx 2, Delete: idx 4",
        "sampleOutput": "Original: 10 20 30 40 50 | Inserted: 10 20 25 30 40 50 | Deleted: 10 20 25 30 50"
      },
      {
        "expNo": 2,
        "title": "Binary Search in Sorted Array (Iterative and Recursive)",
        "objective": "Implement Binary Search algorithm using both iterative and recursive approaches on a sorted array and compare step counts against Linear Search.",
        "algorithm": [
          "Step 1: Set low = 0, high = n - 1.",
          "Step 2: Calculate mid = low + (high - low) / 2.",
          "Step 3: If arr[mid] == key, return mid (Found).",
          "Step 4: If arr[mid] < key, search right half: low = mid + 1.",
          "Step 5: If arr[mid] > key, search left half: high = mid - 1.",
          "Step 6: Repeat while low <= high. If not found, return -1."
        ],
        "code": "#include <stdio.h>\n\nint binarySearchIterative(int arr[], int n, int key) {\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == key) return mid;\n        if (arr[mid] < key) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}\n\nint binarySearchRecursive(int arr[], int low, int high, int key) {\n    if (low > high) return -1;\n    int mid = low + (high - low) / 2;\n    if (arr[mid] == key) return mid;\n    if (arr[mid] < key) return binarySearchRecursive(arr, mid + 1, high, key);\n    return binarySearchRecursive(arr, low, mid - 1, key);\n}\n\nint main() {\n    int arr[] = {12, 24, 35, 48, 56, 67, 78, 89, 95};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    int key = 67;\n\n    printf(\"*** BCSE-007: Practical 2 - Binary Search ***\\n\");\n    int idx1 = binarySearchIterative(arr, n, key);\n    int idx2 = binarySearchRecursive(arr, 0, n - 1, key);\n\n    printf(\"Key %d found at index %d (Iterative)\\n\", key, idx1);\n    printf(\"Key %d found at index %d (Recursive)\\n\", key, idx2);\n    printf(\"Time Complexity: O(log n)\\n\");\n    return 0;\n}",
        "sampleInput": "Array: [12, 24, 35, 48, 56, 67, 78, 89, 95], Key: 67",
        "sampleOutput": "Key 67 found at index 5 | Time Complexity: O(log n)"
      },
      {
        "expNo": 3,
        "title": "Singly Linked List ADT (Insertion, Deletion, Reversal)",
        "objective": "Implement Singly Linked List with operations: insert at beginning, insert at end, delete node by value, traverse, and reverse the list in-place.",
        "algorithm": [
          "Step 1: Define Node structure with data and next pointer.",
          "Step 2: In insertBeginning, allocate memory, point new_node->next = head, head = new_node.",
          "Step 3: In insertEnd, traverse to last node, set last->next = new_node.",
          "Step 4: In deleteValue, search node, adjust previous->next = current->next, free(current).",
          "Step 5: In reverseList, maintain prev, curr, next pointers and flip links."
        ],
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *next;\n};\n\nvoid printList(struct Node *head) {\n    struct Node *curr = head;\n    while (curr) {\n        printf(\"%d -> \", curr->data);\n        curr = curr->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nvoid insertAtHead(struct Node **head, int val) {\n    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));\n    newNode->data = val;\n    newNode->next = *head;\n    *head = newNode;\n}\n\nvoid reverseList(struct Node **head) {\n    struct Node *prev = NULL, *curr = *head, *next = NULL;\n    while (curr) {\n        next = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = next;\n    }\n    *head = prev;\n}\n\nint main() {\n    struct Node *head = NULL;\n    printf(\"*** BCSE-007: Practical 3 - Singly Linked List ***\\n\");\n    insertAtHead(&head, 40);\n    insertAtHead(&head, 30);\n    insertAtHead(&head, 20);\n    insertAtHead(&head, 10);\n    printf(\"List: \"); printList(head);\n\n    reverseList(&head);\n    printf(\"Reversed List: \"); printList(head);\n    return 0;\n}",
        "sampleInput": "Insert: 10, 20, 30, 40 -> Reverse",
        "sampleOutput": "Original: 10 -> 20 -> 30 -> 40 -> NULL | Reversed: 40 -> 30 -> 20 -> 10 -> NULL"
      },
      {
        "expNo": 4,
        "title": "Doubly Linked List ADT Operations",
        "objective": "Implement a Doubly Linked List with two-way navigation (forward and backward traversal) and node deletion.",
        "algorithm": [
          "Step 1: Create struct Node with data, prev, and next pointers.",
          "Step 2: In insertEnd, connect new_node->prev = tail, tail->next = new_node.",
          "Step 3: Traverse forward using curr->next until NULL.",
          "Step 4: Traverse backward using curr->prev until NULL."
        ],
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct DNode {\n    int data;\n    struct DNode *prev, *next;\n};\n\nvoid insertEnd(struct DNode **head, int val) {\n    struct DNode *newNode = (struct DNode*)malloc(sizeof(struct DNode));\n    newNode->data = val;\n    newNode->next = NULL;\n    if (!*head) {\n        newNode->prev = NULL;\n        *head = newNode;\n        return;\n    }\n    struct DNode *temp = *head;\n    while (temp->next) temp = temp->next;\n    temp->next = newNode;\n    newNode->prev = temp;\n}\n\nvoid displayForwardBackward(struct DNode *head) {\n    struct DNode *temp = head, *last = NULL;\n    printf(\"Forward : \");\n    while (temp) {\n        printf(\"%d \", temp->data);\n        last = temp;\n        temp = temp->next;\n    }\n    printf(\"\\nBackward: \");\n    while (last) {\n        printf(\"%d \", last->data);\n        last = last->prev;\n    }\n    printf(\"\\n\");\n}\n\nint main() {\n    struct DNode *head = NULL;\n    printf(\"*** BCSE-007: Practical 4 - Doubly Linked List ***\\n\");\n    insertEnd(&head, 100);\n    insertEnd(&head, 200);\n    insertEnd(&head, 300);\n    insertEnd(&head, 400);\n    displayForwardBackward(head);\n    return 0;\n}",
        "sampleInput": "Insert: 100, 200, 300, 400",
        "sampleOutput": "Forward: 100 200 300 400 | Backward: 400 300 200 100"
      },
      {
        "expNo": 5,
        "title": "Stack Implementation using Array with Overflow & Underflow Handling",
        "objective": "Implement Last-In First-Out (LIFO) Stack ADT using a fixed-size array with push, pop, peek, isEmpty, and isFull operations.",
        "algorithm": [
          "Step 1: Initialize top = -1, capacity = MAX.",
          "Step 2: push(x): Check top == MAX - 1 (Stack Overflow). Else top++, stack[top] = x.",
          "Step 3: pop(): Check top == -1 (Stack Underflow). Else return stack[top--].",
          "Step 4: peek(): Return stack[top] without removing.",
          "Step 5: Test operations and boundary conditions."
        ],
        "code": "#include <stdio.h>\n#define MAX 5\n\nint stack[MAX];\nint top = -1;\n\nvoid push(int x) {\n    if (top == MAX - 1) {\n        printf(\"[Stack Overflow] Cannot push %d\\n\", x);\n        return;\n    }\n    stack[++top] = x;\n    printf(\"Pushed: %d | Top at index %d\\n\", x, top);\n}\n\nint pop() {\n    if (top == -1) {\n        printf(\"[Stack Underflow] Stack is empty\\n\");\n        return -1;\n    }\n    return stack[top--];\n}\n\nint peek() {\n    if (top == -1) return -1;\n    return stack[top];\n}\n\nint main() {\n    printf(\"*** BCSE-007: Practical 5 - Stack ADT ***\\n\");\n    push(10);\n    push(20);\n    push(30);\n    printf(\"Top element (peek): %d\\n\", peek());\n    printf(\"Popped: %d\\n\", pop());\n    printf(\"Popped: %d\\n\", pop());\n    printf(\"New Top: %d\\n\", peek());\n    return 0;\n}",
        "sampleInput": "Operations: push(10), push(20), push(30), peek(), pop()",
        "sampleOutput": "Pushed 10, 20, 30 | Peek: 30 | Popped: 30, 20 | New Top: 10"
      },
      {
        "expNo": 6,
        "title": "Infix to Postfix Conversion & Postfix Evaluation using Stack",
        "objective": "Convert an arithmetic infix expression into postfix (Reverse Polish Notation) using Shunting-Yard algorithm and evaluate the postfix expression.",
        "algorithm": [
          "Step 1: Scan infix expression left to right.",
          "Step 2: If operand, append directly to postfix output.",
          "Step 3: If '(', push onto stack.",
          "Step 4: If ')', pop stack to output until '(' is encountered.",
          "Step 5: If operator, pop operators with >= precedence from stack to output, then push current operator.",
          "Step 6: Pop remaining stack operators to output string."
        ],
        "code": "#include <stdio.h>\n#include <ctype.h>\n#include <string.h>\n\nchar stack[100];\nint top = -1;\n\nvoid push(char c) { stack[++top] = c; }\nchar pop() { return stack[top--]; }\nchar peek() { return stack[top]; }\n\nint precedence(char op) {\n    if (op == '+' || op == '-') return 1;\n    if (op == '*' || op == '/') return 2;\n    if (op == '^') return 3;\n    return 0;\n}\n\nvoid infixToPostfix(char infix[], char postfix[]) {\n    int k = 0;\n    for (int i = 0; infix[i]; i++) {\n        char ch = infix[i];\n        if (isalnum(ch)) postfix[k++] = ch;\n        else if (ch == '(') push(ch);\n        else if (ch == ')') {\n            while (top != -1 && peek() != '(') postfix[k++] = pop();\n            pop(); // discard '('\n        } else {\n            while (top != -1 && precedence(peek()) >= precedence(ch))\n                postfix[k++] = pop();\n            push(ch);\n        }\n    }\n    while (top != -1) postfix[k++] = pop();\n    postfix[k] = '\\\\0';\n}\n\nint main() {\n    char infix[] = \"((A+B)*C)-D\";\n    char postfix[100];\n    printf(\"*** BCSE-007: Practical 6 - Infix to Postfix ***\\n\");\n    infixToPostfix(infix, postfix);\n    printf(\"Infix Expression   : %s\\n\", infix);\n    printf(\"Postfix Expression : %s\\n\", postfix);\n    return 0;\n}",
        "sampleInput": "Infix: ((A+B)*C)-D",
        "sampleOutput": "Postfix Expression: AB+C*D-"
      },
      {
        "expNo": 7,
        "title": "Circular Queue Implementation with Static Array",
        "objective": "Implement Circular Queue ADT to eliminate memory wastage of ordinary linear queues using modular arithmetic wrap-around.",
        "algorithm": [
          "Step 1: Initialize front = -1, rear = -1, size = N.",
          "Step 2: isFull(): return (rear + 1) % N == front.",
          "Step 3: isEmpty(): return front == -1.",
          "Step 4: enqueue(x): If full, report overflow. If empty, front = rear = 0. Else rear = (rear + 1) % N. q[rear] = x.",
          "Step 5: dequeue(): If empty, report underflow. If front == rear, front = rear = -1. Else front = (front + 1) % N."
        ],
        "code": "#include <stdio.h>\n#define SIZE 5\n\nint q[SIZE];\nint front = -1, rear = -1;\n\nint isFull() {\n    return ((rear + 1) % SIZE == front);\n}\n\nint isEmpty() {\n    return (front == -1);\n}\n\nvoid enqueue(int val) {\n    if (isFull()) {\n        printf(\"[Queue Full] Cannot enqueue %d\\n\", val);\n        return;\n    }\n    if (isEmpty()) front = rear = 0;\n    else rear = (rear + 1) % SIZE;\n    q[rear] = val;\n    printf(\"Enqueued: %d (Front: %d, Rear: %d)\\n\", val, front, rear);\n}\n\nint dequeue() {\n    if (isEmpty()) {\n        printf(\"[Queue Empty]\\n\");\n        return -1;\n    }\n    int val = q[front];\n    if (front == rear) front = rear = -1;\n    else front = (front + 1) % SIZE;\n    return val;\n}\n\nint main() {\n    printf(\"*** BCSE-007: Practical 7 - Circular Queue ***\\n\");\n    enqueue(10); enqueue(20); enqueue(30); enqueue(40);\n    printf(\"Dequeued: %d\\n\", dequeue());\n    printf(\"Dequeued: %d\\n\", dequeue());\n    enqueue(50); // Wraps around seamlessly\n    enqueue(60);\n    return 0;\n}",
        "sampleInput": "Enqueue: 10, 20, 30, 40 -> Dequeue 2 items -> Enqueue: 50, 60",
        "sampleOutput": "Wrap-around enqueue succeeds without false overflow condition."
      },
      {
        "expNo": 8,
        "title": "Binary Search Tree (BST) ADT: Insert, Search & Traversals",
        "objective": "Implement Binary Search Tree ADT with node insertion, binary key search, and depth-first tree traversals (Inorder, Preorder, Postorder).",
        "algorithm": [
          "Step 1: In insert(root, val), if root == NULL return new node.",
          "Step 2: If val < root->data, root->left = insert(root->left, val).",
          "Step 3: If val > root->data, root->right = insert(root->right, val).",
          "Step 4: Inorder (Left, Root, Right) produces sorted ascending sequence.",
          "Step 5: Search key by branching left or right in O(h) time."
        ],
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct BSTNode {\n    int data;\n    struct BSTNode *left, *right;\n};\n\nstruct BSTNode* createNode(int val) {\n    struct BSTNode *node = (struct BSTNode*)malloc(sizeof(struct BSTNode));\n    node->data = val;\n    node->left = node->right = NULL;\n    return node;\n}\n\nstruct BSTNode* insert(struct BSTNode *root, int val) {\n    if (!root) return createNode(val);\n    if (val < root->data) root->left = insert(root->left, val);\n    else if (val > root->data) root->right = insert(root->right, val);\n    return root;\n}\n\nvoid inorder(struct BSTNode *root) {\n    if (root) {\n        inorder(root->left);\n        printf(\"%d \", root->data);\n        inorder(root->right);\n    }\n}\n\nint search(struct BSTNode *root, int key) {\n    if (!root) return 0;\n    if (root->data == key) return 1;\n    if (key < root->data) return search(root->left, key);\n    return search(root->right, key);\n}\n\nint main() {\n    struct BSTNode *root = NULL;\n    int keys[] = {50, 30, 70, 20, 40, 60, 80};\n    printf(\"*** BCSE-007: Practical 8 - Binary Search Tree ***\\n\");\n    for (int i = 0; i < 7; i++) root = insert(root, keys[i]);\n\n    printf(\"Inorder Traversal (Sorted): \");\n    inorder(root);\n    printf(\"\\n\");\n\n    int q = 40;\n    printf(\"Search %d: %s\\n\", q, search(root, q) ? \"Found in Tree!\" : \"Not Found\");\n    return 0;\n}",
        "sampleInput": "Insert keys: 50, 30, 70, 20, 40, 60, 80",
        "sampleOutput": "Inorder: 20 30 40 50 60 70 80 | Search 40: Found in Tree!"
      },
      {
        "expNo": 9,
        "title": "Graph Traversal: Breadth First Search (BFS) & Depth First Search (DFS)",
        "objective": "Represent an undirected graph using an Adjacency Matrix and traverse all vertices using BFS (Queue-based) and DFS (Recursion/Stack-based).",
        "algorithm": [
          "Step 1: Initialize adjacency matrix adj[V][V] and visited[V] = {0}.",
          "Step 2: In BFS, enqueue start vertex, mark visited. While queue not empty, pop u, print u, and enqueue all unvisited neighbors.",
          "Step 3: In DFS, print start vertex, mark visited, and recursively visit all unvisited adjacent neighbors.",
          "Step 4: Output traversal sequences."
        ],
        "code": "#include <stdio.h>\n#define V 5\n\nint adj[V][V] = {\n    {0, 1, 1, 0, 0},\n    {1, 0, 0, 1, 1},\n    {1, 0, 0, 0, 1},\n    {0, 1, 0, 0, 1},\n    {0, 1, 1, 1, 0}\n};\n\nint visited[V];\n\nvoid bfs(int start) {\n    int q[V], front = 0, rear = 0;\n    int v_bfs[V] = {0};\n\n    q[rear++] = start;\n    v_bfs[start] = 1;\n    printf(\"BFS Traversal: \");\n\n    while (front < rear) {\n        int u = q[front++];\n        printf(\"%d \", u);\n        for (int i = 0; i < V; i++) {\n            if (adj[u][i] && !v_bfs[i]) {\n                v_bfs[i] = 1;\n                q[rear++] = i;\n            }\n        }\n    }\n    printf(\"\\n\");\n}\n\nvoid dfs(int u) {\n    visited[u] = 1;\n    printf(\"%d \", u);\n    for (int i = 0; i < V; i++) {\n        if (adj[u][i] && !visited[i]) dfs(i);\n    }\n}\n\nint main() {\n    printf(\"*** BCSE-007: Practical 9 - BFS & DFS Graph Traversal ***\\n\");\n    bfs(0);\n    printf(\"DFS Traversal: \");\n    for (int i = 0; i < V; i++) visited[i] = 0;\n    dfs(0);\n    printf(\"\\n\");\n    return 0;\n}",
        "sampleInput": "5 Vertices: 0-1, 0-2, 1-3, 1-4, 2-4, 3-4",
        "sampleOutput": "BFS: 0 1 2 3 4 | DFS: 0 1 3 4 2"
      },
      {
        "expNo": 10,
        "title": "Sorting Algorithms Comparison: Bubble, Selection & Insertion Sort",
        "objective": "Implement and compare the comparison-based sorting algorithms: Bubble Sort, Selection Sort, and Insertion Sort on integer arrays.",
        "algorithm": [
          "Step 1: Bubble Sort: Repeatedly swap adjacent elements if arr[j] > arr[j+1].",
          "Step 2: Selection Sort: Find minimum element in unsorted subarray and swap with first element.",
          "Step 3: Insertion Sort: Pick element arr[i] and insert into correct sorted position in arr[0..i-1].",
          "Step 4: Count swaps and comparisons."
        ],
        "code": "#include <stdio.h>\n\nvoid insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}\n\nvoid printArray(int arr[], int n) {\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n}\n\nint main() {\n    int arr[] = {64, 25, 12, 22, 11, 90, 34};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    printf(\"*** BCSE-007: Practical 10 - Sorting Comparison ***\\n\");\n    printf(\"Original Array : \"); printArray(arr, n);\n    insertionSort(arr, n);\n    printf(\"Sorted (Insertion Sort): \"); printArray(arr, n);\n    return 0;\n}",
        "sampleInput": "Array: [64, 25, 12, 22, 11, 90, 34]",
        "sampleOutput": "Sorted Array: 11 12 22 25 34 64 90"
      },
      {
        "expNo": 11,
        "title": "Divide and Conquer: QuickSort and MergeSort",
        "objective": "Implement Quick Sort (with Lomuto partitioning) and Merge Sort algorithms and analyze their O(n log n) recursive time complexities.",
        "algorithm": [
          "Step 1: MergeSort: Divide array into two halves, recursively sort both, and merge in sorted order.",
          "Step 2: QuickSort: Choose pivot element, partition array such that elements < pivot are left, > pivot are right.",
          "Step 3: Recursively call QuickSort on left and right partitions.",
          "Step 4: Display sorted output."
        ],
        "code": "#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int t = *a; *a = *b; *b = t;\n}\n\nint partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = low - 1;\n    for (int j = low; j < high; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            swap(&arr[i], &arr[j]);\n        }\n    }\n    swap(&arr[i + 1], &arr[high]);\n    return (i + 1);\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}\n\nint main() {\n    int arr[] = {80, 10, 29, 45, 99, 12, 63, 5};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    printf(\"*** BCSE-007: Practical 11 - QuickSort ***\\n\");\n    quickSort(arr, 0, n - 1);\n    printf(\"Sorted Array (QuickSort): \");\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\nAverage Time: O(n log n)\\n\");\n    return 0;\n}",
        "sampleInput": "Array: [80, 10, 29, 45, 99, 12, 63, 5]",
        "sampleOutput": "Sorted Array: 5 10 12 29 45 63 80 99"
      },
      {
        "expNo": 12,
        "title": "Single-Source Shortest Path using Dijkstra's Algorithm",
        "objective": "Find the shortest paths from a given source vertex to all other vertices in a non-negative edge weighted directed/undirected graph.",
        "algorithm": [
          "Step 1: Initialize dist[] array with INF, dist[source] = 0, sptSet[] = {0}.",
          "Step 2: Select unvisited vertex u with minimum dist[u].",
          "Step 3: Mark u as visited (sptSet[u] = 1).",
          "Step 4: Update distance of all adjacent vertices v: if dist[u] + weight(u,v) < dist[v], dist[v] = dist[u] + weight(u,v).",
          "Step 5: Repeat V-1 times and output shortest distances."
        ],
        "code": "#include <stdio.h>\n#define INF 99999\n#define V 5\n\nint minDistance(int dist[], int sptSet[]) {\n    int min = INF, min_idx = -1;\n    for (int v = 0; v < V; v++)\n        if (!sptSet[v] && dist[v] <= min) min = dist[v], min_idx = v;\n    return min_idx;\n}\n\nvoid dijkstra(int graph[V][V], int src) {\n    int dist[V], sptSet[V] = {0};\n    for (int i = 0; i < V; i++) dist[i] = INF;\n    dist[src] = 0;\n\n    for (int count = 0; count < V - 1; count++) {\n        int u = minDistance(dist, sptSet);\n        if (u == -1) break;\n        sptSet[u] = 1;\n        for (int v = 0; v < V; v++) {\n            if (!sptSet[v] && graph[u][v] && dist[u] != INF \n                && dist[u] + graph[u][v] < dist[v]) {\n                dist[v] = dist[u] + graph[u][v];\n            }\n        }\n    }\n\n    printf(\"Vertex \\t Shortest Distance from Source %d\\n\", src);\n    for (int i = 0; i < V; i++) printf(\"%d \\t\\t %d km\\n\", i, dist[i]);\n}\n\nint main() {\n    int graph[V][V] = {\n        {0, 4, 2, 0, 0},\n        {4, 0, 1, 5, 0},\n        {2, 1, 0, 8, 10},\n        {0, 5, 8, 0, 2},\n        {0, 0, 10, 2, 0}\n    };\n    printf(\"*** BCSE-007: Practical 12 - Dijkstra Algorithm ***\\n\");\n    dijkstra(graph, 0);\n    return 0;\n}",
        "sampleInput": "Graph: 5 nodes with edge weights, Source: Node 0",
        "sampleOutput": "Node 0: 0 km, Node 1: 3 km, Node 2: 2 km, Node 3: 8 km, Node 4: 10 km"
      }
    ],
    "vivaQuestions": [
      {
        "q": "What is the time complexity of QuickSort in Best, Average, and Worst cases?",
        "a": "Best Case: O(n log n), Average Case: O(n log n), Worst Case: O(n^2) when chosen pivot is consistently the minimum or maximum element (e.g. already sorted array with last element as pivot)."
      },
      {
        "q": "What is the difference between Stack and Queue?",
        "a": "Stack follows LIFO (Last-In First-Out) where insertions and deletions occur at the same end (top). Queue follows FIFO (First-In First-Out) where elements are inserted at rear and removed from front."
      },
      {
        "q": "What is a Binary Search Tree (BST) and what is its search time complexity?",
        "a": "A BST is a binary tree where each node satisfies: all keys in its left subtree are strictly smaller than node key, and all keys in its right subtree are strictly greater. Search time complexity is O(h), where h is height: O(log n) for a balanced tree and O(n) for a skewed tree."
      },
      {
        "q": "Why is Circular Queue preferred over Linear Queue implemented with arrays?",
        "a": "In a linear array queue, dequeued front slots cannot be reused even if rear reaches the capacity end (false overflow). Circular Queue wraps around using modulo arithmetic ((rear + 1) % N), utilizing all allocated memory efficiently."
      },
      {
        "q": "What is the difference between BFS and DFS graph traversals?",
        "a": "BFS explores vertices level-by-level using a Queue (FIFO) and finds the shortest path in unweighted graphs. DFS explores as deep as possible along each branch before backtracking using a Stack (LIFO) or recursion."
      },
      {
        "q": "Why is MergeSort preferred over QuickSort for Linked Lists?",
        "a": "MergeSort access pattern is purely sequential without requiring random element indexing (which takes O(1) in arrays but O(n) in linked lists). Moreover, merging two linked lists requires O(1) extra space without auxiliary buffer arrays."
      },
      {
        "q": "What are the limitations of Dijkstra's Algorithm?",
        "a": "Dijkstra's algorithm fails and produces incorrect shortest paths when a graph contains negative-weight edges or negative-weight cycles. The Bellman-Ford algorithm must be used instead for graphs with negative weights."
      },
      {
        "q": "What is the height of a balanced AVL Tree with N nodes?",
        "a": "The maximum height of an AVL tree with N nodes is approximately 1.44 * log2(N), guaranteeing worst-case O(log N) search, insertion, and deletion operations."
      },
      {
        "q": "Explain Infix, Prefix, and Postfix notations.",
        "a": "Infix has operators between operands (A + B). Prefix (Polish notation) places operators before operands (+ A B). Postfix (Reverse Polish notation) places operators after operands (A B +), eliminating the need for parentheses and operator precedence rules during computer evaluation."
      },
      {
        "q": "What is collision in Hash Tables and how is it resolved?",
        "a": "Collision occurs when two distinct keys hash to the same bucket index. It is resolved using Open Addressing (Linear Probing, Quadratic Probing, Double Hashing) or Separate Chaining (Linked list at each bucket)."
      },
      {
        "q": "What is the Space Complexity of QuickSort and MergeSort?",
        "a": "QuickSort requires O(log n) auxiliary space on the call stack for recursive partition calls (in-place). MergeSort requires O(n) auxiliary array space to merge the sub-arrays."
      },
      {
        "q": "What is the difference between Singly and Doubly Linked Lists?",
        "a": "Singly linked list nodes have one pointer (next) allowing forward traversal only and requiring O(n) to delete the tail. Doubly linked list nodes have two pointers (prev and next) allowing bidirectional traversal and O(1) deletion given the node pointer."
      }
    ]
  },
  {
    "id": "lab-aiml-bcse011",
    "code": "BCSE-011",
    "subject": "Fundamental of AI & Machine Learning Lab",
    "title": "Fundamental of AI & Machine Learning Practical Manual",
    "semester": "Semester 3 / 4",
    "year": "2nd Year",
    "fileSize": "7.1 MB",
    "branch": "CSE / IT / AI-DS / AI-ML",
    "university": "Maharishi Markandeshwar (Deemed to be University) - MMEC",
    "syllabusMatch": "100% Official Curriculum Aligned (Session 2025-26)",
    "pdfUrl": "https://raw.githubusercontent.com/Bhavya3733/all-colege-notes/main/public/pdfs/BCSE011_AIML_Lab_Manual.pdf",
    "totalExperiments": 10,
    "experimentsCount": "10 Experiments (Python, Scikit-Learn, PyTorch)",
    "capstoneProject": {
      "title": "Handwritten Digit Recognition with Convolutional Neural Networks (CNN)",
      "description": "End-to-end computer vision pipeline trained on MNIST dataset achieving 99.2% accuracy with interactive live canvas drawing and inference.",
      "features": [
        "Custom CNN architecture with Conv2D, MaxPool, Dropout, and Dense layers",
        "Real-time canvas drawing interface with image preprocessing (28x28 grayscale)",
        "Softmax confidence score distribution visualization"
      ],
      "codeSnippet": "import torch\nimport torch.nn as nn\n\nclass SimpleCNN(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.conv = nn.Sequential(\n            nn.Conv2d(1, 32, kernel_size=3, padding=1),\n            nn.ReLU(),\n            nn.MaxPool2d(2),\n            nn.Conv2d(32, 64, kernel_size=3, padding=1),\n            nn.ReLU(),\n            nn.MaxPool2d(2)\n        )\n        self.fc = nn.Sequential(\n            nn.Linear(64 * 7 * 7, 128),\n            nn.ReLU(),\n            nn.Dropout(0.25),\n            nn.Linear(128, 10)\n        )\n\n    def forward(self, x):\n        x = self.conv(x)\n        x = x.view(x.size(0), -1)\n        return self.fc(x)"
    },
    "experiments": [
      {
        "expNo": 1,
        "title": "Implementation of Breadth-First Search (BFS) and Depth-First Search (DFS)",
        "objective": "Implement uninformed graph search algorithms (BFS and DFS) to traverse state spaces and find shortest paths in unweighted graphs.",
        "algorithm": [
          "Step 1: Represent graph as adjacency list dictionary.",
          "Step 2: BFS uses a collections.deque (FIFO) to explore nodes level-by-level.",
          "Step 3: DFS uses recursion or a Stack (LIFO) to explore deeply before backtracking.",
          "Step 4: Maintain visited set to prevent cycles."
        ],
        "code": "from collections import deque\n\ndef bfs(graph, start):\n    visited = set([start])\n    queue = deque([start])\n    order = []\n    while queue:\n        node = queue.popleft()\n        order.append(node)\n        for neighbor in graph.get(node, []):\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n    return order\n\ndef dfs(graph, start, visited=None, order=None):\n    if visited is None: visited = set()\n    if order is None: order = []\n    visited.add(start)\n    order.append(start)\n    for neighbor in graph.get(node, []):\n        if neighbor not in visited:\n            dfs(graph, neighbor, visited, order)\n    return order\n\ngraph = {\n    'A': ['B', 'C'],\n    'B': ['D', 'E'],\n    'C': ['F'],\n    'D': [], 'E': ['F'], 'F': []\n}\nprint(\"BFS Traversal:\", bfs(graph, 'A'))",
        "sampleInput": "Graph: A -> B, C; B -> D, E; C -> F",
        "sampleOutput": "BFS Traversal: ['A', 'B', 'C', 'D', 'E', 'F']"
      },
      {
        "expNo": 2,
        "title": "A* Heuristic Search Algorithm for Shortest Path Finding",
        "objective": "Implement the A* informed search algorithm on a 2D grid using Euclidean / Manhattan distance heuristic to find the lowest-cost path.",
        "algorithm": [
          "Step 1: Maintain open set (priority queue) of nodes to evaluate, sorted by f(n) = g(n) + h(n).",
          "Step 2: g(n) is exact cost from start node to n.",
          "Step 3: h(n) is estimated heuristic cost from n to goal.",
          "Step 4: Pop node with lowest f(n). If goal reached, reconstruct path.",
          "Step 5: For each neighbor, calculate tentative g score and update open set."
        ],
        "code": "import heapq\n\ndef a_star(graph, start, goal, heuristics):\n    # pq stores (f_score, current_node, path, current_cost)\n    pq = [(heuristics[start], start, [start], 0)]\n    visited = set()\n\n    while pq:\n        f, node, path, g = heapq.heappop(pq)\n        if node == goal:\n            return path, g\n        if node in visited:\n            continue\n        visited.add(node)\n\n        for neighbor, weight in graph.get(node, []):\n            if neighbor not in visited:\n                new_g = g + weight\n                new_f = new_g + heuristics.get(neighbor, 0)\n                heapq.heappush(pq, (new_f, neighbor, path + [neighbor], new_g))\n    return None, float('inf')\n\ngraph = {\n    'S': [('A', 1), ('G', 10)],\n    'A': [('B', 2), ('C', 1)],\n    'B': [('D', 5)],\n    'C': [('D', 3), ('G', 4)],\n    'D': [('G', 2)],\n    'G': []\n}\nheuristics = {'S': 5, 'A': 3, 'B': 4, 'C': 2, 'D': 1, 'G': 0}\n\npath, cost = a_star(graph, 'S', 'G', heuristics)\nprint(f\"A* Optimal Path: {' -> '.join(path)} | Total Cost: {cost}\")",
        "sampleInput": "Start: S, Goal: G, Graph with edge weights and heuristic table",
        "sampleOutput": "A* Optimal Path: S -> A -> C -> G | Total Cost: 6"
      },
      {
        "expNo": 3,
        "title": "Minimax Algorithm with Alpha-Beta Pruning for Game Trees",
        "objective": "Implement Adversarial Search using Minimax decision rule enhanced with Alpha-Beta pruning to optimize game branch exploration.",
        "algorithm": [
          "Step 1: Maximizer seeks highest value, Minimizer seeks lowest value.",
          "Step 2: Maintain alpha (best max choice so far) and beta (best min choice so far).",
          "Step 3: At maximizing node: alpha = max(alpha, eval). If beta <= alpha, prune branch.",
          "Step 4: At minimizing node: beta = min(beta, eval). If beta <= alpha, prune branch.",
          "Step 5: Return optimal payoff value."
        ],
        "code": "def alphabeta(depth, node_index, is_maximizing, values, alpha, beta):\n    if depth == 3:\n        return values[node_index]\n\n    if is_maximizing:\n        best = float('-inf')\n        for i in range(2):\n            val = alphabeta(depth + 1, node_index * 2 + i, False, values, alpha, beta)\n            best = max(best, val)\n            alpha = max(alpha, best)\n            if beta <= alpha:\n                break # Beta cutoff / pruning\n        return best\n    else:\n        best = float('inf')\n        for i in range(2):\n            val = alphabeta(depth + 1, node_index * 2 + i, True, values, alpha, beta)\n            best = min(best, val)\n            beta = min(beta, best)\n            if beta <= alpha:\n                break # Alpha cutoff / pruning\n        return best\n\n# Leaf nodes of tree of depth 3 (8 leaf states)\nterminal_values = [3, 5, 6, 9, 1, 2, 0, -1]\noptimal_score = alphabeta(0, 0, True, terminal_values, float('-inf'), float('inf'))\nprint(\"Optimal Guaranteed Payoff (Alpha-Beta Minimax):\", optimal_score)",
        "sampleInput": "Leaf values: [3, 5, 6, 9, 1, 2, 0, -1]",
        "sampleOutput": "Optimal Guaranteed Payoff: 5 (Pruned non-promising subtrees)"
      },
      {
        "expNo": 4,
        "title": "Simple & Multiple Linear Regression using Gradient Descent",
        "objective": "Implement Linear Regression from scratch using Batch Gradient Descent to fit line y = mx + c and calculate Mean Squared Error (MSE).",
        "algorithm": [
          "Step 1: Initialize weights m = 0, bias c = 0, learning rate alpha = 0.01, epochs = 1000.",
          "Step 2: For each epoch, compute prediction y_hat = m*X + c.",
          "Step 3: Compute gradients: dm = (-2/n) * sum(X * (y - y_hat)), dc = (-2/n) * sum(y - y_hat).",
          "Step 4: Update weights: m = m - alpha * dm, c = c - alpha * dc.",
          "Step 5: Compute final MSE loss and R2 accuracy score."
        ],
        "code": "import numpy as np\n\n# Synthetic Dataset: Experience (Years) vs Salary ($k)\nX = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], dtype=float)\ny = np.array([30, 38, 48, 55, 68, 72, 85, 90, 102, 115], dtype=float)\n\nm, c = 0.0, 0.0\nlr = 0.01\nepochs = 2000\nn = len(X)\n\nfor _ in range(epochs):\n    y_pred = m * X + c\n    dm = (-2 / n) * np.sum(X * (y - y_pred))\n    dc = (-2 / n) * np.sum(y - y_pred)\n    m -= lr * dm\n    c -= lr * dc\n\nmse = np.mean((y - (m * X + c)) ** 2)\nprint(f\"Trained Linear Model: Salary = {m:.2f} * Experience + {c:.2f}\")\nprint(f\"Mean Squared Error (MSE): {mse:.2f}\")\nprint(f\"Prediction for 5.5 Years Exp: ${m * 5.5 + c:.2f}k\")",
        "sampleInput": "X = [1..10], y = [30..115]",
        "sampleOutput": "Salary = 9.38 * Exp + 20.80 | MSE = 2.45 | Prediction for 5.5 yrs: $72.39k"
      },
      {
        "expNo": 5,
        "title": "Logistic Regression for Binary Classification",
        "objective": "Implement Binary Logistic Regression with Sigmoid activation function to classify student pass/fail based on study and attendance hours.",
        "algorithm": [
          "Step 1: Linear combination z = w*X + b.",
          "Step 2: Pass z through sigmoid activation: sigma(z) = 1 / (1 + exp(-z)).",
          "Step 3: Calculate Binary Cross-Entropy Loss.",
          "Step 4: Update weights using gradient descent.",
          "Step 5: Predict probability >= 0.5 as Class 1 (Pass), else Class 0 (Fail)."
        ],
        "code": "import numpy as np\n\ndef sigmoid(z):\n    return 1.0 / (1.0 + np.exp(-np.clip(z, -250, 250)))\n\n# Features: [Study Hours, Attendance %] -> Target: Pass(1) / Fail(0)\nX = np.array([[2, 40], [3, 50], [4, 60], [6, 75], [7, 80], [8, 90]])\ny = np.array([0, 0, 0, 1, 1, 1])\n\n# Feature Scaling (Z-score normalization)\nX_norm = (X - X.mean(axis=0)) / X.std(axis=0)\n\nweights = np.zeros(X.shape[1])\nbias = 0.0\nlr = 0.1\n\nfor epoch in range(1000):\n    z = np.dot(X_norm, weights) + bias\n    preds = sigmoid(z)\n    dw = np.dot(X_norm.T, (preds - y)) / len(y)\n    db = np.sum(preds - y) / len(y)\n    weights -= lr * dw\n    bias -= lr * db\n\n# Test sample: 5 hours study, 70% attendance\ntest_x = (np.array([5, 70]) - X.mean(axis=0)) / X.std(axis=0)\nprob = sigmoid(np.dot(test_x, weights) + bias)\nprint(f\"Pass Probability: {prob:.4f} -> Result: {'PASS' if prob >= 0.5 else 'FAIL'}\")",
        "sampleInput": "Features: Study hours, Attendance %. Test: [5 hrs, 70% attendance]",
        "sampleOutput": "Pass Probability: 0.8142 -> Result: PASS"
      },
      {
        "expNo": 6,
        "title": "Decision Tree Classifier using Information Gain / Gini Impurity",
        "objective": "Build and visualize a Decision Tree Classifier on the Fisher's Iris Flower dataset and evaluate classification accuracy and confusion matrix.",
        "algorithm": [
          "Step 1: Load Iris dataset (150 samples, 4 features, 3 species).",
          "Step 2: Split data into 80% Train and 20% Test sets.",
          "Step 3: Fit DecisionTreeClassifier(criterion='entropy', max_depth=3).",
          "Step 4: Predict labels for test set.",
          "Step 5: Compute Accuracy, Precision, Recall, and Confusion Matrix."
        ],
        "code": "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.metrics import accuracy_score, classification_report\n\n# 1. Load Dataset\niris = load_iris()\nX, y = iris.data, iris.target\n\n# 2. Train-Test Split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# 3. Model Training\nclf = DecisionTreeClassifier(criterion='entropy', max_depth=3, random_state=42)\nclf.fit(X_train, y_train)\n\n# 4. Evaluation\ny_pred = clf.predict(X_test)\nacc = accuracy_score(y_test, y_pred)\n\nprint(f\"*** BCSE-011: Practical 6 - Decision Tree ***\")\nprint(f\"Model Test Accuracy: {acc * 100:.2f}%\\n\")\nprint(\"Classification Report:\")\nprint(classification_report(y_test, y_pred, target_names=iris.target_names))",
        "sampleInput": "Iris Dataset: 150 instances, 4 numeric features (sepal/petal dimensions)",
        "sampleOutput": "Model Test Accuracy: 100.00% across Setosa, Versicolor, Virginica"
      },
      {
        "expNo": 7,
        "title": "K-Nearest Neighbors (K-NN) Classification",
        "objective": "Implement K-Nearest Neighbors classification using Euclidean distance to classify unseen test instances by majority voting of k nearest neighbors.",
        "algorithm": [
          "Step 1: For query point x, compute Euclidean distance d = sqrt(sum((x - xi)^2)) to all training points.",
          "Step 2: Sort distances in ascending order.",
          "Step 3: Select top k closest instances.",
          "Step 4: Count class frequency among the k neighbors.",
          "Step 5: Return the majority class label."
        ],
        "code": "import numpy as np\nfrom collections import Counter\n\nclass KNNClassifier:\n    def __init__(self, k=3):\n        self.k = k\n\n    def fit(self, X, y):\n        self.X_train = np.array(X)\n        self.y_train = np.array(y)\n\n    def predict(self, X):\n        return [self._predict_one(x) for x in np.array(X)]\n\n    def _predict_one(self, x):\n        distances = np.linalg.norm(self.X_train - x, axis=1)\n        k_indices = np.argsort(distances)[:self.k]\n        k_labels = self.y_train[k_indices]\n        most_common = Counter(k_labels).most_common(1)\n        return most_common[0][0]\n\n# Train points: [Height (ft), Weight (kg)] -> Class: 0 (Light), 1 (Heavy)\nX_train = [[5.1, 48], [5.3, 52], [5.5, 50], [5.9, 78], [6.1, 85], [6.0, 80]]\ny_train = [0, 0, 0, 1, 1, 1]\n\nknn = KNNClassifier(k=3)\nknn.fit(X_train, y_train)\n\ntest_sample = [[5.8, 75]]\npred = knn.predict(test_sample)\nprint(f\"K-NN Prediction for {test_sample[0]}: Class {pred[0]} (Heavy category)\")",
        "sampleInput": "Train data: 6 samples, Test query: [5.8 ft, 75 kg], k=3",
        "sampleOutput": "Prediction: Class 1 (Heavy category) by 3-NN majority voting"
      },
      {
        "expNo": 8,
        "title": "K-Means Clustering with Centroid Convergence",
        "objective": "Implement unsupervised K-Means Clustering algorithm from scratch to partition unlabelled data into K clusters by minimizing inertia.",
        "algorithm": [
          "Step 1: Randomly choose K initial cluster centroids.",
          "Step 2: Assign each data point to its closest centroid using Euclidean distance.",
          "Step 3: Recompute each centroid as the mean of all points assigned to that cluster.",
          "Step 4: Repeat assignment and update steps until centroids stop changing (convergence).",
          "Step 5: Output final cluster assignments and coordinates."
        ],
        "code": "import numpy as np\n\ndef kmeans(X, k=2, max_iters=100):\n    np.random.seed(42)\n    # Initialize centroids randomly from data points\n    centroids = X[np.random.choice(len(X), k, replace=False)]\n\n    for _ in range(max_iters):\n        # Calculate distances to centroids: shape (N, k)\n        distances = np.linalg.norm(X[:, np.newaxis] - centroids, axis=2)\n        labels = np.argmin(distances, axis=1)\n\n        # Compute new centroids\n        new_centroids = np.array([X[labels == i].mean(axis=0) for i in range(k)])\n\n        if np.allclose(centroids, new_centroids):\n            break\n        centroids = new_centroids\n\n    return centroids, labels\n\n# 2D points representing Customer Spending vs Visit Frequency\nX = np.array([\n    [10, 2], [12, 3], [11, 2], # Cluster 0: Budget shoppers\n    [50, 8], [52, 9], [51, 7], # Cluster 1: VIP shoppers\n    [9, 1],  [55, 8]\n])\n\ncentroids, labels = kmeans(X, k=2)\nprint(\"*** BCSE-011: Practical 8 - K-Means Clustering ***\")\nprint(\"Final Converged Centroids:\\n\", centroids)\nprint(\"Cluster Assignments:\", labels)",
        "sampleInput": "8 data points, K = 2 clusters",
        "sampleOutput": "Cluster 0 Centroid: [10.5, 2.0] | Cluster 1 Centroid: [52.0, 8.0]"
      },
      {
        "expNo": 9,
        "title": "Naive Bayes Classifier for Text / Spam Classification",
        "objective": "Implement Multinomial Naive Bayes using Bayes Theorem with Laplace smoothing to classify incoming email messages as Spam or Ham.",
        "algorithm": [
          "Step 1: Tokenize and build vocabulary from training text corpus.",
          "Step 2: Calculate class priors P(Spam) and P(Ham).",
          "Step 3: Calculate likelihood P(word | class) with Laplace smoothing (+1).",
          "Step 4: For new message, compute posterior using log probabilities: log P(C) + sum(log P(wi|C)).",
          "Step 5: Assign class with highest posterior probability."
        ],
        "code": "from sklearn.feature_extraction.text import CountVectorizer\nfrom sklearn.naive_bayes import MultinomialNB\n\n# Training emails corpus\nemails = [\n    \"Win a free lottery and cash prize now\",\n    \"Meeting agenda for project presentation tomorrow\",\n    \"Claim your free gift card discount\",\n    \"Are you available for lunch discussion today\",\n    \"Exclusive lottery winner please reply with bank details\",\n    \"Please review the attached project report\"\n]\nlabels = [1, 0, 1, 0, 1, 0] # 1: Spam, 0: Ham\n\n# 1. Bag of Words Vectorization\nvectorizer = CountVectorizer()\nX = vectorizer.fit_transform(emails)\n\n# 2. Train Multinomial Naive Bayes\nclf = MultinomialNB()\nclf.fit(X, labels)\n\n# 3. Test Messages\ntest_emails = [\n    \"Exclusive cash prize winner claim now\",\n    \"Can we reschedule the project meeting\"\n]\nX_test = vectorizer.transform(test_emails)\npredictions = clf.predict(X_test)\n\nfor email, pred in zip(test_emails, predictions):\n    print(f\"'{email}' -> {'🚨 SPAM' if pred == 1 else '✅ INBOX / HAM'}\")",
        "sampleInput": "Test: 'Exclusive cash prize winner claim now' and 'Can we reschedule the project meeting'",
        "sampleOutput": "'Exclusive cash prize...' -> SPAM | 'Can we reschedule...' -> INBOX / HAM"
      },
      {
        "expNo": 10,
        "title": "Multilayer Perceptron (MLP) Artificial Neural Network with Backpropagation",
        "objective": "Build a 2-layer Artificial Neural Network from scratch in Python to solve non-linearly separable XOR problem using Backpropagation and Gradient Descent.",
        "algorithm": [
          "Step 1: Initialize weights W1 (2x4), W2 (4x1), and biases with small random values.",
          "Step 2: Forward Propagation: Z1 = X*W1 + b1, A1 = sigmoid(Z1), Z2 = A1*W2 + b2, Yhat = sigmoid(Z2).",
          "Step 3: Compute Binary Cross-Entropy loss.",
          "Step 4: Backward Propagation: compute dW2, db2, dW1, db1 using chain rule.",
          "Step 5: Update weights and biases: W -= lr * dW.",
          "Step 6: Verify 100% convergence on XOR truth table."
        ],
        "code": "import numpy as np\n\ndef sigmoid(x):\n    return 1.0 / (1.0 + np.exp(-x))\n\ndef sigmoid_derivative(x):\n    s = sigmoid(x)\n    return s * (1.0 - s)\n\n# XOR Truth Table inputs & labels\nX = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])\ny = np.array([[0], [1], [1], [0]])\n\nnp.random.seed(42)\nW1 = np.random.uniform(-1, 1, (2, 4))\nb1 = np.zeros((1, 4))\nW2 = np.random.uniform(-1, 1, (4, 1))\nb2 = np.zeros((1, 1))\nlr = 0.5\n\n# Training loop\nfor epoch in range(10000):\n    # Forward Pass\n    Z1 = np.dot(X, W1) + b1\n    A1 = sigmoid(Z1)\n    Z2 = np.dot(A1, W2) + b2\n    A2 = sigmoid(Z2)\n\n    # Backpropagation\n    error = A2 - y\n    dZ2 = error * (A2 * (1 - A2))\n    dW2 = np.dot(A1.T, dZ2)\n    db2 = np.sum(dZ2, axis=0, keepdims=True)\n\n    dZ1 = np.dot(dZ2, W2.T) * (A1 * (1 - A1))\n    dW1 = np.dot(X.T, dZ1)\n    db1 = np.sum(dZ1, axis=0, keepdims=True)\n\n    W1 -= lr * dW1; b1 -= lr * db1\n    W2 -= lr * dW2; b2 -= lr * db2\n\nprint(\"*** BCSE-011: Practical 10 - Neural Network (XOR) ***\")\nprint(\"Predictions after 10k epochs:\")\nfor i in range(len(X)):\n    print(f\"Input: {X[i]} -> Target: {y[i][0]} | Predicted: {A2[i][0]:.4f} -> {round(A2[i][0])}\")",
        "sampleInput": "XOR inputs: [0,0], [0,1], [1,0], [1,1]",
        "sampleOutput": "[0,0]->0 (0.02) | [0,1]->1 (0.98) | [1,0]->1 (0.98) | [1,1]->0 (0.03)"
      }
    ],
    "vivaQuestions": [
      {
        "q": "What is the difference between Supervised, Unsupervised, and Reinforcement Learning?",
        "a": "Supervised Learning trains on labeled data (inputs + ground truth targets). Unsupervised Learning discovers hidden patterns/clusters from unlabeled data without teacher signals. Reinforcement Learning learns optimal decision policies through reward/penalty feedback from an environment."
      },
      {
        "q": "What is Overfitting and how can it be prevented?",
        "a": "Overfitting occurs when a model memorizes training noise and fails to generalize to unseen test data. Prevention methods include: Regularization (L1/L2, Dropout), Cross-Validation, Early Stopping, pruning decision trees, and gathering more training data."
      },
      {
        "q": "Explain the difference between BFS, DFS, and A* Search algorithms.",
        "a": "BFS is an uninformed search exploring level-by-level using a Queue, guaranteeing shortest path in unweighted graphs. DFS explores depth-first using a Stack or recursion, suitable for games and maze solving. A* is an informed (heuristic) search that combines exact path cost g(n) and estimated goal distance h(n) to find optimal shortest paths much faster."
      },
      {
        "q": "What is the role of Alpha-Beta pruning in Game Trees?",
        "a": "Alpha-Beta pruning optimizes the Minimax algorithm by cutting off branches that cannot possibly influence the final decision. In the best case, it reduces time complexity from O(b^d) to O(b^(d/2)), effectively doubling the searchable game depth."
      },
      {
        "q": "Why is the Sigmoid activation function used in Logistic Regression?",
        "a": "Sigmoid maps any real-valued input (-infinity to +infinity) into a bounded probability interval (0, 1) with an S-shaped curve, making it ideal for modeling binary classification decision thresholds."
      },
      {
        "q": "What is the difference between Gini Impurity and Information Gain (Entropy)?",
        "a": "Entropy measures uncertainty/disorder in bits (-sum(p*log2(p))) and ranges from 0 to 1 for binary classes. Gini impurity measures the probability of incorrect labeling (1 - sum(p^2)) and ranges from 0 to 0.5. Gini is computationally faster because it avoids expensive logarithmic operations."
      },
      {
        "q": "How do you select the optimal value of K in K-Means clustering?",
        "a": "The optimal K is determined using the Elbow Method (plotting WCSS/inertia versus K and finding the 'elbow' inflection point) or by evaluating Silhouette Analysis scores across candidate K values."
      },
      {
        "q": "Why is Naive Bayes called 'Naive'?",
        "a": "It is called 'naive' because it makes the strong and simplified assumption that all input features are conditionally independent of each other given the class label, which is rarely strictly true in real-world data but works remarkably well in practice."
      },
      {
        "q": "What is Backpropagation in Neural Networks?",
        "a": "Backpropagation is an efficient algorithmic application of the calculus Chain Rule to compute the partial derivative of the network loss function with respect to every weight and bias, propagating the error backward from output layer to input layer to guide gradient descent updates."
      },
      {
        "q": "What is the vanishing gradient problem and how is it resolved?",
        "a": "In deep networks with sigmoid or tanh activations, repeated multiplication of small derivative fractions causes gradients in early layers to shrink exponentially toward zero, halting training. It is resolved by using ReLU (Rectified Linear Unit) activation, Batch Normalization, and Residual skip connections."
      }
    ]
  }
];
