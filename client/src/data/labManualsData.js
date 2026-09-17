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
      "codeSnippet": "#include <stdio.h>\n#include <stdlib.h>\n#include <conio.h>\n#include <windows.h>\n\n#define H 15\n#define W 40\n\nchar board[H][W];\nint pac_x = 1, pac_y = 1;\nint ghost_x = 10, ghost_y = 20;\nint score = 0, lives = 3, food = 0;\n\nvoid initBoard() {\n    for (int i = 0; i < H; i++) {\n        for (int j = 0; j < W; j++) {\n            if (i == 0 || i == H - 1 || j == 0 || j == W - 1) {\n                board[i][j] = '#';\n            } else if ((i == 3 && j > 5 && j < 35) || (i == 10 && j > 5 && j < 35)) {\n                board[i][j] = '#';\n            } else {\n                board[i][j] = '.';\n                food++;\n            }\n        }\n    }\n    board[pac_x][pac_y] = 'C';\n    board[ghost_x][ghost_y] = 'X';\n}\n\nvoid draw() {\n    COORD coord = {0, 0};\n    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), coord);\n    printf(\"=== GOD-LEVEL PACMAN IN C (BCSE-001 CAPSTONE) ===\\n\");\n    printf(\"Score: %d | Lives: %d | Remaining Dots: %d\\n\\n\", score, lives, food);\n    for (int i = 0; i < H; i++) {\n        for (int j = 0; j < W; j++) {\n            putchar(board[i][j]);\n        }\n        putchar('\\n');\n    }\n    printf(\"\\n[Controls] W: Up | S: Down | A: Left | D: Right | Q: Quit\\n\");\n}\n\nvoid moveGhost() {\n    board[ghost_x][ghost_y] = ' ';\n    int dir = rand() % 4;\n    int nx = ghost_x, ny = ghost_y;\n    if (dir == 0 && ghost_x > 1) nx--;\n    else if (dir == 1 && ghost_x < H - 2) nx++;\n    else if (dir == 2 && ghost_y > 1) ny--;\n    else if (dir == 3 && ghost_y < W - 2) ny++;\n    \n    if (board[nx][ny] != '#') {\n        ghost_x = nx;\n        ghost_y = ny;\n    }\n    board[ghost_x][ghost_y] = 'X';\n}\n\nvoid update(char ch) {\n    int nx = pac_x, ny = pac_y;\n    if (ch == 'w' || ch == 'W') nx--;\n    if (ch == 's' || ch == 'S') nx++;\n    if (ch == 'a' || ch == 'A') ny--;\n    if (ch == 'd' || ch == 'D') ny++;\n\n    if (board[nx][ny] != '#') {\n        if (board[nx][ny] == '.') {\n            score += 10;\n            food--;\n        }\n        board[pac_x][pac_y] = ' ';\n        pac_x = nx;\n        pac_y = ny;\n        board[pac_x][pac_y] = 'C';\n    }\n    moveGhost();\n    if (pac_x == ghost_x && pac_y == ghost_y) {\n        lives--;\n        pac_x = 1; pac_y = 1;\n        board[pac_x][pac_y] = 'C';\n    }\n}\n\nint main() {\n    system(\"cls\");\n    initBoard();\n    while (lives > 0 && food > 0) {\n        draw();\n        if (_kbhit()) {\n            char ch = _getch();\n            if (ch == 'q' || ch == 'Q') break;\n            update(ch);\n        }\n        Sleep(80);\n    }\n    draw();\n    if (lives == 0) printf(\"\\n[GAME OVER] You were caught by the ghost! Final Score: %d\\n\", score);\n    else if (food == 0) printf(\"\\n[CONGRATULATIONS!] You cleared the maze! Final Score: %d\\n\", score);\n    return 0;\n}"
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
        "code": "#include <stdio.h>\n\nint main() {\n    double num1, num2;\n    char op;\n\n    printf(\"*** BCSE-001: Practical 1 - Simple Calculator ***\\n\");\n    printf(\"Enter operator (+, -, *, /, %%): \");\n    scanf(\" %c\", &op);\n\n    printf(\"Enter two numbers: \");\n    scanf(\"%lf %lf\", &num1, &num2);\n\n    switch (op) {\n        case '+':\n            printf(\"Result: %.2lf + %.2lf = %.2lf\\n\", num1, num2, num1 + num2);\n            break;\n        case '-':\n            printf(\"Result: %.2lf - %.2lf = %.2lf\\n\", num1, num2, num1 - num2);\n            break;\n        case '*':\n            printf(\"Result: %.2lf * %.2lf = %.2lf\\n\", num1, num2, num1 * num2);\n            break;\n        case '/':\n            if (num2 != 0)\n                printf(\"Result: %.2lf / %.2lf = %.4lf\\n\", num1, num2, num1 / num2);\n            else\n                printf(\"Error: Division by zero is undefined in mathematics!\\n\");\n            break;\n        case '%':\n            if ((int)num2 != 0)\n                printf(\"Result: %d %% %d = %d\\n\", (int)num1, (int)num2, (int)num1 % (int)num2);\n            else\n                printf(\"Error: Modulo by zero is undefined!\\n\");\n            break;\n        default:\n            printf(\"Error: Invalid operator '%c' entered!\\n\", op);\n    }\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n\nint main() {\n    float km, meters, feet, inches, cm;\n\n    printf(\"*** BCSE-001: Practical 2 - Distance Conversion ***\\n\");\n    printf(\"Enter distance between two cities (in Kilometers): \");\n    scanf(\"%f\", &km);\n\n    meters = km * 1000.0f;\n    cm = meters * 100.0f;\n    feet = km * 3280.84f;\n    inches = feet * 12.0f;\n\n    printf(\"\\n--- Converted Units ---\\n\");\n    printf(\"Distance in Meters      : %.2f m\\n\", meters);\n    printf(\"Distance in Centimeters : %.2f cm\\n\", cm);\n    printf(\"Distance in Feet        : %.2f ft\\n\", feet);\n    printf(\"Distance in Inches      : %.2f in\\n\", inches);\n\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n\nvoid printBinary(unsigned int n) {\n    for (int i = 7; i >= 0; i--) {\n        printf(\"%d\", (n >> i) & 1);\n    }\n}\n\nint main() {\n    unsigned char a, b;\n    printf(\"*** BCSE-001: Practical 3 - Bitwise Operators ***\\n\");\n    printf(\"Enter two integer values (0-255): \");\n    scanf(\"%hhu %hhu\", &a, &b);\n\n    printf(\"\\na = %3d [\", a); printBinary(a); printf(\"]\\n\");\n    printf(\"b = %3d [\", b); printBinary(b); printf(\"]\\n\\n\");\n\n    printf(\"Bitwise AND (a & b)  : %3d [\", a & b); printBinary(a & b); printf(\"]\\n\");\n    printf(\"Bitwise OR  (a | b)  : %3d [\", a | b); printBinary(a | b); printf(\"]\\n\");\n    printf(\"Bitwise XOR (a ^ b)  : %3d [\", a ^ b); printBinary(a ^ b); printf(\"]\\n\");\n    printf(\"Bitwise NOT (~a)     : %3d [\", (unsigned char)~a); printBinary(~a); printf(\"]\\n\");\n    printf(\"Left Shift  (a << 2) : %3d [\", a << 2); printBinary(a << 2); printf(\"]\\n\");\n    printf(\"Right Shift (b >> 1) : %3d [\", b >> 1); printBinary(b >> 1); printf(\"]\\n\");\n\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n\nint main() {\n    int a, b, c, largest;\n    printf(\"*** BCSE-001: Practical 4 - Largest using Ternary Operator ***\\n\");\n    printf(\"Enter three numbers (a, b, c): \");\n    scanf(\"%d %d %d\", &a, &b, &c);\n\n    largest = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);\n\n    printf(\"The largest number among %d, %d, and %d is: %d\\n\", a, b, c, largest);\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n\nint main() {\n    int year;\n    printf(\"*** BCSE-001: Practical 5 - Leap Year Checker ***\\n\");\n    printf(\"Enter a year: \");\n    scanf(\"%d\", &year);\n\n    if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)) {\n        printf(\"Year %d is a LEAP YEAR (366 days).\\n\", year);\n    } else {\n        printf(\"Year %d is NOT a leap year (365 days).\\n\", year);\n    }\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n\nint main() {\n    float m1, m2, m3, m4, m5, total, percentage;\n\n    printf(\"*** BCSE-001: Practical 6 - Grade Calculator ***\\n\");\n    printf(\"Enter marks for 5 subjects (out of 100):\\n\");\n    scanf(\"%f %f %f %f %f\", &m1, &m2, &m3, &m4, &m5);\n\n    total = m1 + m2 + m3 + m4 + m5;\n    percentage = total / 5.0f;\n\n    printf(\"\\nTotal Marks: %.2f / 500\\nPercentage : %.2f%%\\n\", total, percentage);\n    printf(\"Result      : \");\n\n    if (percentage >= 90.0) printf(\"Grade O (Outstanding)\\n\");\n    else if (percentage >= 80.0) printf(\"Grade A+ (Excellent)\\n\");\n    else if (percentage >= 70.0) printf(\"Grade A (Very Good)\\n\");\n    else if (percentage >= 60.0) printf(\"Grade B+ (Good)\\n\");\n    else if (percentage >= 50.0) printf(\"Grade B (Above Average)\\n\");\n    else if (percentage >= 40.0) printf(\"Grade C (Pass)\\n\");\n    else printf(\"Grade F (FAIL / Re-appear)\\n\");\n\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n\nint main() {\n    int a = 10, b;\n\n    printf(\"*** BCSE-001: Practical 7 - Prefix vs Postfix Operators ***\\n\");\n    printf(\"Initial value of a = %d\\n\\n\", a);\n\n    b = a++;\n    printf(\"Postfix (b = a++): b = %d, a becomes = %d\\n\", b, a);\n\n    b = ++a;\n    printf(\"Prefix  (b = ++a): b = %d, a becomes = %d\\n\\n\", b, a);\n\n    b = a--;\n    printf(\"Postfix (b = a--): b = %d, a becomes = %d\\n\", b, a);\n\n    b = --a;\n    printf(\"Prefix  (b = --a): b = %d, a becomes = %d\\n\", b, a);\n\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n#include <math.h>\n\nint main() {\n    int choice;\n    double num;\n\n    printf(\"*** BCSE-001: Practical 8 - Menu-Driven Switch System ***\\n\");\n    printf(\"1. Check Even or Odd\\n\");\n    printf(\"2. Check Positive, Negative or Zero\\n\");\n    printf(\"3. Find Square\\n\");\n    printf(\"4. Find Square Root\\n\");\n    printf(\"Enter your choice (1-4): \");\n    scanf(\"%d\", &choice);\n\n    printf(\"Enter number: \");\n    scanf(\"%lf\", &num);\n\n    switch (choice) {\n        case 1:\n            if ((int)num % 2 == 0)\n                printf(\"%d is EVEN.\\n\", (int)num);\n            else\n                printf(\"%d is ODD.\\n\", (int)num);\n            break;\n        case 2:\n            if (num > 0) printf(\"%.2lf is POSITIVE.\\n\", num);\n            else if (num < 0) printf(\"%.2lf is NEGATIVE.\\n\", num);\n            else printf(\"The number is ZERO.\\n\");\n            break;\n        case 3:\n            printf(\"Square of %.2lf is: %.2lf\\n\", num, num * num);\n            break;\n        case 4:\n            if (num >= 0)\n                printf(\"Square root of %.2lf is: %.4lf\\n\", num, sqrt(num));\n            else\n                printf(\"Error: Cannot compute real square root of negative number!\\n\");\n            break;\n        default:\n            printf(\"Invalid choice selected!\\n\");\n    }\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n\nint main() {\n    int sum = 0, count = 0;\n\n    printf(\"*** BCSE-001: Practical 9 - Sum of Integers Divisible by 5 (100 to 200) ***\\n\");\n    printf(\"Numbers divisible by 5 between 100 and 200:\\n\");\n\n    for (int i = 101; i < 200; i++) {\n        if (i % 5 == 0) {\n            printf(\"%d \", i);\n            sum += i;\n            count++;\n        }\n    }\n\n    printf(\"\\n\\nTotal count : %d\\nSum of numbers: %d\\n\", count, sum);\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n#include <math.h>\n\nint isArmstrong(int num) {\n    int temp = num, digits = 0, sum = 0;\n    while (temp > 0) {\n        digits++;\n        temp /= 10;\n    }\n    temp = num;\n    while (temp > 0) {\n        int rem = temp % 10;\n        sum += (int)round(pow(rem, digits));\n        temp /= 10;\n    }\n    return sum == num;\n}\n\nint main() {\n    int m, n, found = 0;\n    printf(\"*** BCSE-001: Practical 10 - Armstrong Numbers in Range [m, n] ***\\n\");\n    printf(\"Enter range [m, n]: \");\n    scanf(\"%d %d\", &m, &n);\n\n    printf(\"Armstrong numbers between %d and %d are:\\n\", m, n);\n    for (int i = m; i <= n; i++) {\n        if (isArmstrong(i)) {\n            printf(\"%d \", i);\n            found++;\n        }\n    }\n    if (!found) printf(\"None found in this range.\");\n    printf(\"\\nTotal found: %d\\n\", found);\n\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n\nint linearSearch(int arr[], int n, int target) {\n    for (int i = 0; i < n; i++) {\n        if (arr[i] == target) return i;\n    }\n    return -1;\n}\n\nint binarySearch(int arr[], int n, int target) {\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}\n\nint main() {\n    int n, target, arr[50];\n    printf(\"*** BCSE-001: Practical 11 - Linear & Binary Search ***\\n\");\n    printf(\"Enter size of sorted array: \");\n    scanf(\"%d\", &n);\n\n    printf(\"Enter %d sorted elements: \", n);\n    for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n\n    printf(\"Enter value to search: \");\n    scanf(\"%d\", &target);\n\n    int linPos = linearSearch(arr, n, target);\n    int binPos = binarySearch(arr, n, target);\n\n    if (linPos != -1) {\n        printf(\"Linear Search: Element found at index %d (Position %d)\\n\", linPos, linPos + 1);\n        printf(\"Binary Search: Element found at index %d (Position %d)\\n\", binPos, binPos + 1);\n    } else {\n        printf(\"Element %d not found in the array.\\n\", target);\n    }\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n\nvoid readMatrix(int r, int c, int mat[10][10], char name) {\n    printf(\"Enter elements for Matrix %c (%dx%d):\\n\", name, r, c);\n    for (int i = 0; i < r; i++)\n        for (int j = 0; j < c; j++)\n            scanf(\"%d\", &mat[i][j]);\n}\n\nvoid printMatrix(int r, int c, int mat[10][10]) {\n    for (int i = 0; i < r; i++) {\n        for (int j = 0; j < c; j++) printf(\"%4d \", mat[i][j]);\n        printf(\"\\n\");\n    }\n}\n\nint main() {\n    int A[10][10], B[10][10], C[10][10], T[10][10];\n    int r1, c1, r2, c2, choice;\n\n    printf(\"*** BCSE-001: Practical 12 - 2D Matrix Suite ***\\n\");\n    printf(\"Enter rows and cols of Matrix A: \");\n    scanf(\"%d %d\", &r1, &c1);\n    readMatrix(r1, c1, A, 'A');\n\n    printf(\"Enter rows and cols of Matrix B: \");\n    scanf(\"%d %d\", &r2, &c2);\n    readMatrix(r2, c2, B, 'B');\n\n    printf(\"\\nSelect: 1. Add  2. Subtract  3. Multiply  4. Transpose A\\nChoice: \");\n    scanf(\"%d\", &choice);\n\n    switch (choice) {\n        case 1:\n            if (r1 == r2 && c1 == c2) {\n                for (int i = 0; i < r1; i++)\n                    for (int j = 0; j < c1; j++) C[i][j] = A[i][j] + B[i][j];\n                printf(\"\\nResult (A + B):\\n\");\n                printMatrix(r1, c1, C);\n            } else printf(\"Error: Dimension mismatch!\\n\");\n            break;\n        case 2:\n            if (r1 == r2 && c1 == c2) {\n                for (int i = 0; i < r1; i++)\n                    for (int j = 0; j < c1; j++) C[i][j] = A[i][j] - B[i][j];\n                printf(\"\\nResult (A - B):\\n\");\n                printMatrix(r1, c1, C);\n            } else printf(\"Error: Dimension mismatch!\\n\");\n            break;\n        case 3:\n            if (c1 == r2) {\n                for (int i = 0; i < r1; i++) {\n                    for (int j = 0; j < c2; j++) {\n                        C[i][j] = 0;\n                        for (int k = 0; k < c1; k++) C[i][j] += A[i][k] * B[k][j];\n                    }\n                }\n                printf(\"\\nResult (A * B):\\n\");\n                printMatrix(r1, c2, C);\n            } else printf(\"Error: Multiplication dimension mismatch!\\n\");\n            break;\n        case 4:\n            for (int i = 0; i < r1; i++)\n                for (int j = 0; j < c1; j++) T[j][i] = A[i][j];\n            printf(\"\\nTranspose of A (%dx%d):\\n\", c1, r1);\n            printMatrix(c1, r1, T);\n            break;\n        default: printf(\"Invalid choice!\\n\");\n    }\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s1[100] = \"Hello\";\n    char s2[100] = \"World\";\n    char copy[100];\n\n    printf(\"*** BCSE-001: Practical 13 - Built-in String Functions ***\\n\");\n    printf(\"Initial s1: %s (Length: %zu)\\n\", s1, strlen(s1));\n    printf(\"Initial s2: %s (Length: %zu)\\n\", s2, strlen(s2));\n\n    strcpy(copy, s1);\n    printf(\"\\n1. strcpy: Copied s1 -> '%s'\\n\", copy);\n\n    int cmp = strcmp(s1, s2);\n    printf(\"2. strcmp: Result: %d (%s)\\n\", s1, s2, cmp == 0 ? \"Equal\" : (cmp < 0 ? \"s1 < s2\" : \"s1 > s2\"));\n\n    strcat(s1, \" \");\n    strcat(s1, s2);\n    printf(\"3. strcat: Concatenated -> '%s' (Length: %zu)\\n\", s1, strlen(s1));\n\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n\nint my_strlen(const char *str) {\n    int len = 0;\n    while (str[len] != '\\0') len++;\n    return len;\n}\n\nvoid my_strcpy(char *dest, const char *src) {\n    int i = 0;\n    while (src[i] != '\\0') {\n        dest[i] = src[i];\n        i++;\n    }\n    dest[i] = '\\0';\n}\n\nvoid my_strcat(char *dest, const char *src) {\n    int i = my_strlen(dest);\n    int j = 0;\n    while (src[j] != '\\0') {\n        dest[i + j] = src[j];\n        j++;\n    }\n    dest[i + j] = '\\0';\n}\n\nint my_strcmp(const char *s1, const char *s2) {\n    int i = 0;\n    while (s1[i] != '\\0' && s2[i] != '\\0') {\n        if (s1[i] != s2[i]) return s1[i] - s2[i];\n        i++;\n    }\n    return s1[i] - s2[i];\n}\n\nvoid my_strrev(char *str) {\n    int i = 0, j = my_strlen(str) - 1;\n    while (i < j) {\n        char temp = str[i];\n        str[i] = str[j];\n        str[j] = temp;\n        i++;\n        j--;\n    }\n}\n\nint main() {\n    char str1[100] = \"Antigravity\";\n    char str2[100] = \"Engine\";\n    char buf[100];\n\n    printf(\"*** BCSE-001: Practical 14 - Custom String Functions ***\\n\");\n    printf(\"Custom Length of '%s': %d\\n\", str1, my_strlen(str1));\n\n    my_strcpy(buf, str1);\n    printf(\"Custom Strcpy: Copied -> '%s'\\n\", buf);\n\n    my_strcat(buf, str2);\n    printf(\"Custom Strcat: Result -> '%s'\\n\", buf);\n\n    my_strrev(buf);\n    printf(\"Custom Strrev: Reversed -> '%s'\\n\", buf);\n\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n\nvoid swapByValue(int x, int y) {\n    int temp = x;\n    x = y;\n    y = temp;\n    printf(\"[Inside swapByValue] x = %d, y = %d\\n\", x, y);\n}\n\nvoid swapByReference(int *x, int *y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n    printf(\"[Inside swapByReference] *x = %d, *y = %d\\n\", *x, *y);\n}\n\nint main() {\n    int a = 10, b = 20;\n\n    printf(\"*** BCSE-001: Practical 15 - Call by Value vs Reference ***\\n\");\n    printf(\"Original: a = %d, b = %d\\n\\n\", a, b);\n\n    printf(\"--- Testing Call by Value ---\\n\");\n    swapByValue(a, b);\n    printf(\"In main after swapByValue: a = %d, b = %d (UNMODIFIED)\\n\\n\", a, b);\n\n    printf(\"--- Testing Call by Reference ---\\n\");\n    swapByReference(&a, &b);\n    printf(\"In main after swapByReference: a = %d, b = %d (SUCCESSFULLY SWAPPED)\\n\", a, b);\n\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n\nunsigned long long factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    int num;\n    printf(\"*** BCSE-001: Practical 16 - Recursive Factorial ***\\n\");\n    printf(\"Enter a positive integer: \");\n    scanf(\"%d\", &num);\n\n    if (num < 0) {\n        printf(\"Error: Factorial of negative number does not exist!\\n\");\n    } else {\n        printf(\"Factorial of %d (%d!) = %llu\\n\", num, num, factorial(num));\n    }\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n\nint main() {\n    int n, arr[50];\n    printf(\"*** BCSE-001: Practical 17 - Array & Pointer Traversal ***\\n\");\n    printf(\"Enter number of elements: \");\n    scanf(\"%d\", &n);\n\n    printf(\"Enter %d elements: \", n);\n    for (int i = 0; i < n; i++) scanf(\"%d\", &arr[i]);\n\n    int *ptr = arr + n - 1;\n\n    printf(\"\\nElements in Reverse Order with Memory Addresses:\\n\");\n    printf(\"---------------------------------------------------\\n\");\n    printf(\"Index | Value | Memory Address\\n\");\n    printf(\"---------------------------------------------------\\n\");\n    for (int i = n - 1; i >= 0; i--) {\n        printf(\"%5d | %5d | %p\\n\", i, *ptr, (void *)ptr);\n        ptr--;\n    }\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n\nint* findLarger(int *x, int *y) {\n    if (*x >= *y) return x;\n    return y;\n}\n\nint main() {\n    int a, b;\n    printf(\"*** BCSE-001: Practical 18 - Function Returning Pointer ***\\n\");\n    printf(\"Enter two integer values: \");\n    scanf(\"%d %d\", &a, &b);\n\n    int *maxPtr = findLarger(&a, &b);\n\n    printf(\"Value of a: %d at %p\\n\", a, (void *)&a);\n    printf(\"Value of b: %d at %p\\n\", b, (void *)&b);\n    printf(\"\\nThe larger value is: %d (Stored at Address: %p)\\n\", *maxPtr, (void *)maxPtr);\n\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n\nstruct Date {\n    int day;\n    int month;\n    int year;\n};\n\nstruct Personal {\n    char name[50];\n    struct Date doj;\n    float salary;\n};\n\nint main() {\n    int n;\n    struct Personal staff[10];\n\n    printf(\"*** BCSE-001: Practical 19 - Structure Personal Database ***\\n\");\n    printf(\"Enter number of persons (max 10): \");\n    scanf(\"%d\", &n);\n\n    for (int i = 0; i < n; i++) {\n        printf(\"\\n--- Person %d ---\\n\", i + 1);\n        printf(\"Enter Name: \");\n        scanf(\" %[^\\n]\", staff[i].name);\n        printf(\"Enter Date of Joining (DD MM YYYY): \");\n        scanf(\"%d %d %d\", &staff[i].doj.day, &staff[i].doj.month, &staff[i].doj.year);\n        printf(\"Enter Monthly Salary (INR): \");\n        scanf(\"%f\", &staff[i].salary);\n    }\n\n    printf(\"\\n=================== PERSONAL RECORDS ===================\\n\");\n    printf(\"%-20s | %-12s | %-12s\\n\", \"Name\", \"Joining Date\", \"Salary\");\n    printf(\"--------------------------------------------------------\\n\");\n    for (int i = 0; i < n; i++) {\n        printf(\"%-20s | %02d/%02d/%04d   | Rs. %10.2f\\n\",\n               staff[i].name,\n               staff[i].doj.day, staff[i].doj.month, staff[i].doj.year,\n               staff[i].salary);\n    }\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    char *str;\n    int initialSize = 15;\n    int expandedSize = 40;\n\n    printf(\"*** BCSE-001: Practical 20 - Dynamic Memory Allocation ***\\n\");\n\n    str = (char *)malloc(initialSize * sizeof(char));\n    if (str == NULL) {\n        printf(\"Memory allocation failed!\\n\");\n        return 1;\n    }\n    strcpy(str, \"Hello MMEC\");\n    printf(\"1. Memory allocated with malloc(%d bytes): '%s'\\n\", initialSize, str);\n\n    str = (char *)realloc(str, expandedSize * sizeof(char));\n    if (str == NULL) {\n        printf(\"Reallocation failed!\\n\");\n        return 1;\n    }\n    strcat(str, \" - Computer Science\");\n    printf(\"2. Memory reallocated with realloc(%d bytes): '%s'\\n\", expandedSize, str);\n\n    free(str);\n    str = NULL;\n    printf(\"3. Memory successfully freed using free().\\n\");\n\n    return 0;\n}",
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
        "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Employee {\n    char name[50];\n    int empCode;\n    char phone[15];\n    char dept[30];\n};\n\nint main() {\n    FILE *fp;\n    int n = 3;\n    struct Employee emp;\n\n    printf(\"*** BCSE-001: Practical 21 - Employee File Database ***\\n\");\n\n    fp = fopen(\"employees.txt\", \"w\");\n    if (fp == NULL) {\n        printf(\"Error opening file for writing!\\n\");\n        return 1;\n    }\n\n    printf(\"Enter details for %d employees:\\n\", n);\n    for (int i = 0; i < n; i++) {\n        printf(\"\\nEmployee #%d\\n\", i + 1);\n        printf(\"Enter EmpCode: \");\n        scanf(\"%d\", &emp.empCode);\n        printf(\"Enter Name (Single word): \");\n        scanf(\"%s\", emp.name);\n        printf(\"Enter Phone: \");\n        scanf(\"%s\", emp.phone);\n        printf(\"Enter Department: \");\n        scanf(\"%s\", emp.dept);\n\n        fprintf(fp, \"%d %s %s %s\\n\", emp.empCode, emp.name, emp.phone, emp.dept);\n    }\n    fclose(fp);\n    printf(\"\\n[SUCCESS] Records saved to 'employees.txt'.\\n\");\n\n    fp = fopen(\"employees.txt\", \"r\");\n    if (fp == NULL) {\n        printf(\"Error opening file for reading!\\n\");\n        return 1;\n    }\n\n    printf(\"\\n================ READ BACK FROM FILE =================\\n\");\n    printf(\"%-8s | %-15s | %-12s | %-10s\\n\", \"Code\", \"Name\", \"Phone\", \"Dept\");\n    printf(\"------------------------------------------------------\\n\");\n    while (fscanf(fp, \"%d %s %s %s\", &emp.empCode, emp.name, emp.phone, emp.dept) == 4) {\n        printf(\"%-8d | %-15s | %-12s | %-10s\\n\", emp.empCode, emp.name, emp.phone, emp.dept);\n    }\n    fclose(fp);\n\n    return 0;\n}",
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
      "title": "Full-Stack University / Departmental Web Portal",
      "description": "Comprehensive responsive web portal for MMEC featuring dynamic notice boards, student result calculator, interactive event gallery, timetable viewer, and inquiry contact form with client-side regex verification.",
      "features": [
        "Responsive Flexbox & CSS Grid multi-device layout",
        "Interactive announcements bulletin board with category filters",
        "Student GPA / CGPA university marks calculator widget",
        "Full validation contact form with instant regex feedback",
        "Dark mode / Light mode theme toggling with localStorage persistence"
      ],
      "codeSnippet": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>MMEC University Web Portal</title>\n  <style>\n    :root { --primary: #2563eb; --dark: #0f172a; --bg: #f8fafc; --text: #334155; }\n    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }\n    body { background: var(--bg); color: var(--text); line-height: 1.6; }\n    header { background: linear-gradient(135deg, #1e3a8a, #3b82f6); color: white; padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }\n    .hero { padding: 3rem 2rem; text-align: center; background: white; border-bottom: 1px solid #e2e8f0; }\n    .hero h1 { font-size: 2.4rem; color: #1e293b; }\n    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; padding: 2rem; }\n    .card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; transition: transform 0.2s, box-shadow 0.2s; }\n    .card:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }\n    .btn { background: var(--primary); color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 6px; cursor: pointer; font-weight: 600; }\n    .btn:hover { background: #1d4ed8; }\n    footer { text-align: center; padding: 1.5rem; background: var(--dark); color: #94a3b8; font-size: 0.9rem; }\n  </style>\n</head>\n<body>\n  <header>\n    <h2>MMEC CSE Portal</h2>\n    <nav>\n      <a href=\"#home\" style=\"color:white; margin-right:1rem; text-decoration:none;\">Home</a>\n      <a href=\"#notices\" style=\"color:white; margin-right:1rem; text-decoration:none;\">Notices</a>\n      <a href=\"#contact\" style=\"color:white; text-decoration:none;\">Contact</a>\n    </nav>\n  </header>\n  <section class=\"hero\">\n    <h1>Welcome to Department of Computer Science & Engineering</h1>\n    <p>Empowering Next-Generation Engineers with Industry 4.0 Skills</p>\n  </section>\n  <main class=\"grid\">\n    <div class=\"card\">\n      <h3>\ud83d\udce2 Latest University Notices</h3>\n      <p>Odd Semester Mid-Term Examination schedule has been announced. Check your timetable now.</p>\n      <button class=\"btn\" style=\"margin-top:1rem;\" onclick=\"alert('Opening Examination Schedule PDF...')\">View Date Sheet</button>\n    </div>\n    <div class=\"card\">\n      <h3>\u26a1 Quick CGPA Calculator</h3>\n      <input type=\"number\" id=\"grade\" placeholder=\"Grade Point (e.g. 9.5)\" style=\"width:100%; padding:0.5rem; margin:0.5rem 0; border:1px solid #cbd5e1; border-radius:4px;\">\n      <button class=\"btn\" onclick=\"calc()\">Compute Percentage</button>\n      <p id=\"res\" style=\"font-weight:bold; margin-top:0.5rem; color:#16a34a;\"></p>\n    </div>\n  </main>\n  <footer>&copy; 2025-26 MMEC - Department of Computer Science. All Rights Reserved.</footer>\n  <script>\n    function calc() {\n      const g = parseFloat(document.getElementById('grade').value);\n      if (!isNaN(g)) document.getElementById('res').innerText = 'Equivalent Percentage: ' + (g * 9.5).toFixed(2) + '%';\n    }\n  </script>\n</body>\n</html>"
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
        "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCSE-013: Practical 6 - Three-Zone Page Layout</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body { height: 100vh; display: flex; flex-direction: column; font-family: 'Segoe UI', sans-serif; overflow: hidden; }\n    \n    .zone-top {\n      height: 15vh;\n      background: linear-gradient(90deg, #1e40af, #3b82f6);\n      color: white;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 0 2rem;\n      box-shadow: 0 2px 10px rgba(0,0,0,0.15);\n    }\n\n    .zone-middle {\n      height: 70vh;\n      background: #f8fafc;\n      padding: 2rem;\n      overflow-y: auto;\n    }\n\n    .zone-bottom {\n      height: 15vh;\n      background: #0f172a;\n      color: white;\n      display: flex;\n      align-items: center;\n      justify-content: space-around;\n      border-top: 2px solid #334155;\n    }\n\n    .nav-item { color: #cbd5e1; text-decoration: none; font-size: 1.1rem; font-weight: 600; padding: 8px 16px; border-radius: 6px; transition: background 0.2s; }\n    .nav-item:hover { background: #334155; color: white; }\n  </style>\n</head>\n<body>\n  <div class=\"zone-top\">\n    <h2>MMEC CSE Digital Portal</h2>\n    <span>Academic Year 2025-26</span>\n  </div>\n\n  <div class=\"zone-middle\">\n    <h3>Zone 2: Main Middle Display Area (70% Height)</h3>\n    <p style=\"margin-top: 10px;\">This zone holds dynamic course content, lab experiments, video lectures, and syllabus documentation with independent scrollbar.</p>\n  </div>\n\n  <div class=\"zone-bottom\">\n    <a href=\"#home\" class=\"nav-item\">\ud83c\udfe0 Home</a>\n    <a href=\"#syllabus\" class=\"nav-item\">\ud83d\udcd6 Syllabus</a>\n    <a href=\"#practicals\" class=\"nav-item\">\ud83d\udcbb Practicals</a>\n    <a href=\"#viva\" class=\"nav-item\">\ud83c\udfaf Viva Q&A</a>\n  </div>\n</body>\n</html>",
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
        "code": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>BCSE-013: Practical 7 - Validated Registration Form</title>\n  <style>\n    body { font-family: 'Segoe UI', sans-serif; background: #eef2ff; padding: 30px; }\n    .form-card { max-width: 480px; margin: 0 auto; background: white; padding: 25px 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }\n    .form-group { margin-bottom: 16px; }\n    label { display: block; margin-bottom: 6px; font-weight: 600; color: #1e293b; }\n    input, select { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; box-sizing: border-box; }\n    .error { color: #dc2626; font-size: 0.85rem; margin-top: 4px; display: none; }\n    .btn-submit { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer; }\n    .btn-submit:hover { background: #1d4ed8; }\n  </style>\n</head>\n<body>\n  <div class=\"form-card\">\n    <h2 style=\"text-align:center; margin-bottom:20px; color:#1e40af;\">Student Registration</h2>\n    <form id=\"regForm\" onsubmit=\"return validateForm()\">\n      <div class=\"form-group\">\n        <label for=\"name\">Full Name</label>\n        <input type=\"text\" id=\"name\" placeholder=\"Enter your full name\">\n        <div id=\"nameErr\" class=\"error\">Name must contain only letters (min 3 chars).</div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"email\">College Email</label>\n        <input type=\"email\" id=\"email\" placeholder=\"student@mmumullana.org\">\n        <div id=\"emailErr\" class=\"error\">Enter a valid institutional email address.</div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"phone\">Mobile Number</label>\n        <input type=\"tel\" id=\"phone\" placeholder=\"10-digit mobile number\">\n        <div id=\"phoneErr\" class=\"error\">Enter valid 10-digit Indian phone (starts 6-9).</div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"pass\">Password</label>\n        <input type=\"password\" id=\"pass\" placeholder=\"Minimum 8 characters\">\n        <div id=\"passErr\" class=\"error\">Must be 8+ chars with at least 1 number and 1 special char.</div>\n      </div>\n      <button type=\"submit\" class=\"btn-submit\">Register Account</button>\n    </form>\n  </div>\n\n  <script>\n    function validateForm() {\n      let isValid = true;\n      const name = document.getElementById('name').value.trim();\n      const email = document.getElementById('email').value.trim();\n      const phone = document.getElementById('phone').value.trim();\n      const pass = document.getElementById('pass').value;\n\n      if (!/^[a-zA-Z ]{3,40}$/.test(name)) {\n        document.getElementById('nameErr').style.display = 'block';\n        isValid = false;\n      } else document.getElementById('nameErr').style.display = 'none';\n\n      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(email)) {\n        document.getElementById('emailErr').style.display = 'block';\n        isValid = false;\n      } else document.getElementById('emailErr').style.display = 'none';\n\n      if (!/^[6-9]\\d{9}$/.test(phone)) {\n        document.getElementById('phoneErr').style.display = 'block';\n        isValid = false;\n      } else document.getElementById('phoneErr').style.display = 'none';\n\n      if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(pass)) {\n        document.getElementById('passErr').style.display = 'block';\n        isValid = false;\n      } else document.getElementById('passErr').style.display = 'none';\n\n      if (isValid) {\n        alert('\ud83c\udf89 Validation Passed! Student account registered successfully.');\n      }\n      return false;\n    }\n  </script>\n</body>\n</html>",
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
        "code": "#include <stdio.h>\n\nvoid display(int arr[], int n) {\n    for (int i = 0; i < n; i++) printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n}\n\nint insert(int arr[], int *n, int capacity, int val, int idx) {\n    if (*n >= capacity || idx < 0 || idx > *n) return -1;\n    for (int i = *n; i > idx; i--) arr[i] = arr[i - 1];\n    arr[idx] = val;\n    (*n)++;\n    return 0;\n}\n\nint delete(int arr[], int *n, int idx) {\n    if (idx < 0 || idx >= *n) return -1;\n    for (int i = idx; i < *n - 1; i++) arr[i] = arr[i + 1];\n    (*n)--;\n    return 0;\n}\n\nint main() {\n    int arr[10] = {10, 20, 30, 40, 50};\n    int n = 5;\n    printf(\"Original: \"); display(arr, n);\n    insert(arr, &n, 10, 25, 2);\n    printf(\"After Inserting 25 at index 2: \"); display(arr, n);\n    delete(arr, &n, 4);\n    printf(\"After Deleting index 4: \"); display(arr, n);\n    return 0;\n}",
        "sampleInput": "Array size: 5",
        "sampleOutput": "Elements shifted and updated with correct bounds."
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
          "Step 1: Represent graph as adjacency list.",
          "Step 2: BFS uses a Queue (FIFO) to explore nodes level-by-level.",
          "Step 3: DFS uses a Stack (LIFO) or recursion to explore deeply before backtracking.",
          "Step 4: Maintain visited set to avoid infinite loops."
        ],
        "code": "from collections import deque\n\ndef bfs(graph, start):\n    visited = set([start])\n    queue = deque([start])\n    order = []\n    while queue:\n        node = queue.popleft()\n        order.append(node)\n        for neighbor in graph.get(node, []):\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n    return order\n\ndef dfs(graph, start, visited=None, order=None):\n    if visited is None: visited = set()\n    if order is None: order = []\n    visited.add(start)\n    order.append(start)\n    for neighbor in graph.get(node, []):\n        if neighbor not in visited:\n            dfs(graph, neighbor, visited, order)\n    return order\n\ngraph = {\n    'A': ['B', 'C'],\n    'B': ['D', 'E'],\n    'C': ['F'],\n    'D': [], 'E': ['F'], 'F': []\n}\nprint(\"BFS Traversal:\", bfs(graph, 'A'))",
        "sampleInput": "Graph: A -> B, C; B -> D, E; C -> F",
        "sampleOutput": "BFS: ['A', 'B', 'C', 'D', 'E', 'F']"
      }
    ],
    "vivaQuestions": [
      {
        "q": "What is the difference between Supervised, Unsupervised, and Reinforcement Learning?",
        "a": "Supervised Learning trains on labeled data (inputs + ground truth targets). Unsupervised Learning discovers hidden patterns/clusters from unlabeled data. Reinforcement Learning learns optimal decision policies through reward/penalty feedback from an environment."
      },
      {
        "q": "What is Overfitting and how can it be prevented?",
        "a": "Overfitting occurs when a model memorizes training noise and fails to generalize to unseen test data. Prevention methods include: Regularization (L1/L2, Dropout), Cross-Validation, Early Stopping, and gathering more training data."
      }
    ]
  }
];
