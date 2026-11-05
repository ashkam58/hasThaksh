import { Lesson } from '../types/quest';

export const LESSONS_PART_2: Lesson[] = [
  {
    id: 11,
    phase: 'PHASE 4: DATA AND FUNCTIONS',
    title: 'Function Factory',
    subtitle: 'Defining Functions (def), Calling Functions, Parameters, Arguments & Reusable Code',
    comicChapterTitle: 'CHAPTER 11: THE BLUEPRINT SUBROUTINES',
    illustrationTheme: 'toolbox',
    storyIntro:
      'What if your robot needs to fire its shield booster in 12 different rooms? Copying and pasting the same 8 lines 12 times is a nightmare! In the Function Factory, Hasthaksh learns to package code into named, reusable subroutines using def, parameters, and arguments.',
    realWorldScenario:
      'Think of a custom LEGO instruction macro or a microwave’s "Popcorn" button: you define the steps once, and press the button (call the function) whenever you need it!',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'Remember the DRY principle, Hasthaksh: Don’t Repeat Yourself! Define a function once with def, and call it anywhere.',
      },
      {
        speaker: 'Hasthaksh',
        role: 'Function Engineer',
        line: 'Parameters ready at the factory door—let’s pass in our arguments!',
      },
    ],
    learningObjectives: [
      'Define custom functions using the def keyword, parentheses, colon, and indented body.',
      'Call functions multiple times to eliminate repeated code (DRY principle).',
      'Distinguish between parameters (variables in the def header) and arguments (actual values passed when calling).',
      'Build a Mathematical Toolbox with functions for addition, subtraction, multiplication, and division.',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Intermediate Foundations',
    topics: [
      'What functions are & Why we use them (DRY)',
      'Defining functions with def',
      'Calling functions',
      'Parameters vs Arguments',
      'Multiple parameters & Default arguments',
    ],
    theoryBlocks: [
      {
        id: 'c11-t1',
        title: '1. Defining (def) & Calling Reusable Functions',
        simpleExplanation:
          'Defining a function with def name(): teaches Python a new command—but the code inside does NOT run until you CALL the function by writing name()!',
        whyProgrammersUseIt:
          'If you need to update how a banner or attack works, you only edit the function in ONE place instead of hunting down 20 copy-pasted blocks.',
        realWorldAnalogy:
          'Writing a recipe card (def make_smoothie():) doesn’t put a smoothie on the table. Calling make_smoothie() is when the blender actually turns on!',
        pythonSyntax: 'def announce_shield():\n    print("Shields at 100%!")\n\nannounce_shield()',
        workingCodeExample: `def activate_beacon():
    print("======================")
    print("ORBITAL BEACON ONLINE")
    print("======================")

print("Launching Satellite 1...")
activate_beacon()

print("Launching Satellite 2...")
activate_beacon()`,
        lineByLineExplanation: [
          { line: 'def activate_beacon():', explanation: 'Defines a new function named activate_beacon (does not print anything yet).' },
          { line: 'activate_beacon()', explanation: 'First function call: jumps into activate_beacon and prints the 3-line banner.' },
          { line: 'activate_beacon()', explanation: 'Second function call: reuses the exact same 3 lines cleanly!' },
        ],
        expectedOutput: 'Launching Satellite 1...\n======================\nORBITAL BEACON ONLINE\n======================\nLaunching Satellite 2...\n======================\nORBITAL BEACON ONLINE\n======================',
        commonMistakes: [
          'Defining a function with def my_func(): and forgetting to call my_func() at the bottom—so nothing happens!',
          'Calling a function on line 1 BEFORE its def block has been read by Python (NameError).',
        ],
        quickQuestion: {
          question: 'How many times does the code inside def greet(): run if greet() is never called?',
          options: ['1 time', '0 times', '2 times', 'Infinite times'],
          correctIndex: 1,
          explanation: 'A function body only executes when the function is called.',
        },
      },
      {
        id: 'c11-t2',
        title: '2. Parameters & Arguments: Customising Function Behaviour',
        simpleExplanation:
          'Parameters are placeholder variable names inside the def parentheses: def boost(hero, amount):. Arguments are the real values you pass in when calling: boost("Hasthaksh", 50)!',
        whyProgrammersUseIt:
          'Parameters make a single function adaptable to any player name, any numbers, or any difficulty level.',
        realWorldAnalogy:
          'A vending machine slot (parameter) accepts any coin you drop in (argument) and processes it.',
        pythonSyntax: 'def add_nums(a, b):\n    print(f"{a} + {b} = {a + b}")\n\nadd_nums(12, 8)',
        workingCodeExample: `def report_damage(target, hits, damage_per_hit):
    total = hits * damage_per_hit
    print(f"Target: {target} | Hits: {hits} | Total Damage: {total}")

report_damage("Mecha-Boss", 4, 25)
report_damage("Laser Turret", 3, 15)`,
        lineByLineExplanation: [
          { line: 'def report_damage(target, hits, damage_per_hit):', explanation: 'Declares 3 parameters: target, hits, and damage_per_hit.' },
          { line: 'report_damage("Mecha-Boss", 4, 25)', explanation: 'Passes 3 arguments in matching order: target="Mecha-Boss", hits=4, damage_per_hit=25.' },
        ],
        expectedOutput: 'Target: Mecha-Boss | Hits: 4 | Total Damage: 100\nTarget: Laser Turret | Hits: 3 | Total Damage: 45',
        commonMistakes: [
          'Passing 2 arguments to a function that expects 3 required parameters (raises a TypeError).',
        ],
        quickQuestion: {
          question: 'In def power_up(player, bonus): and the call power_up("Astra", 30), which are the parameters and which are the arguments?',
          options: [
            'player and bonus are parameters; "Astra" and 30 are arguments',
            '"Astra" and 30 are parameters; player and bonus are arguments',
            'All four are parameters',
            'power_up is the argument',
          ],
          correctIndex: 0,
          explanation: 'Parameters are the variable names in the def header; arguments are the actual values supplied in the call.',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: Mathematical Toolbox Subroutine',
      description: 'See how four clean functions handle addition, subtraction, multiplication, and safe division.',
      starterCode: `# Mathematical Toolbox Demo
def add(a, b):
    print(f"{a} + {b} = {a + b}")

def subtract(a, b):
    print(f"{a} - {b} = {a - b}")

def multiply(a, b):
    print(f"{a} * {b} = {a * b}")

def divide(a, b):
    if b == 0:
        print("Cannot divide by zero!")
    else:
        print(f"{a} / {b} = {a / b}")

x = int(input())
y = int(input())

add(x, y)
subtract(x, y)
multiply(x, y)
divide(x, y)`,
      sampleInput: '20\n4',
      stepExplanations: [
        { line: 2, text: 'Defines add, subtract, multiply, and divide with parameters (a, b).' },
        { line: 17, text: 'Reads x = 20 and y = 4 from input.' },
        { line: 20, text: 'Calls each toolbox function with (x, y).' },
      ],
      fullExplanation: 'Each operation is isolated in its own clear function—making the main program at the bottom effortless to read.',
    },
    predictChallenges: [
      {
        id: 'c11-p1',
        title: 'Trace 1: Parameter Order Matters',
        code: `def badge(rank, name):
    print(f"[{rank}] {name}")

badge("Commander", "Hasthaksh")
badge("Cadet", "Nova")`,
        expectedOutput: '[Commander] Hasthaksh\n[Cadet] Nova',
        explanation: 'Arguments match parameters left-to-right: rank receives the first string and name receives the second.',
        difficulty: 'Starter',
      },
      {
        id: 'c11-p2',
        title: 'Trace 2: Default Parameter Value',
        code: `def charge(units, multiplier=2):
    print(units * multiplier)

charge(10)
charge(10, 5)`,
        expectedOutput: '20\n50',
        explanation: 'First call uses default multiplier=2 (10*2=20). Second call overrides multiplier with 5 (10*5=50).',
        difficulty: 'Intermediate',
      },
      {
        id: 'c11-p3',
        title: 'Trace 3: Loop Inside a Function',
        code: `def echo(word, times):
    print((word + " ") * times)

echo("Go", 3)
echo("Win", 2)`,
        expectedOutput: 'Go Go Go \nWin Win ',
        explanation: 'Repeats "Go " 3 times on line 1 and "Win " 2 times on line 2.',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-11',
      lessonId: 11,
      title: 'Create a Mathematical Toolbox',
      objective: 'Build a 4-function Mathematical Toolbox (add, subtract, multiply, divide) and run all four on two numbers entered by Hasthaksh.',
      materialsOrCodeRequired: 'Python IDE with two integer inputs.',
      starterCode: `# CLASS 11 ACTIVITY: MATHEMATICAL TOOLBOX
def calc_add(a, b):
    print(f"Add: {a + b}")

def calc_sub(a, b):
    print(f"Sub: {a - b}")

def calc_mul(a, b):
    print(f"Mul: {a * b}")

def calc_div(a, b):
    print(f"Div: {a // b}")

num1 = int(input())
num2 = int(input())

calc_add(num1, num2)
calc_sub(num1, num2)
calc_mul(num1, num2)
calc_div(num1, num2)`,
      sampleInput: '18\n3',
      teacherSolution: `def calc_add(a, b):
    print(f"Add: {a + b}")

def calc_sub(a, b):
    print(f"Sub: {a - b}")

def calc_mul(a, b):
    print(f"Mul: {a * b}")

def calc_div(a, b):
    print(f"Div: {a // b}")

num1 = int(input())
num2 = int(input())

calc_add(num1, num2)
calc_sub(num1, num2)
calc_mul(num1, num2)
calc_div(num1, num2)`,
      teacherInstructions: [
        'Ask Hasthaksh to add a 5th function calc_power(a, b) that prints a ** b!',
      ],
      studentInstructions: [
        'Complete and verify all four mathematical toolbox functions.',
        'Call them in sequence using num1 and num2.',
      ],
      timeLimitMinutes: 12,
      expectedOutcome: 'Add: 21\nSub: 15\nMul: 54\nDiv: 6',
      reflectionQuestion: 'Why is it helpful to put a zero-check inside calc_div(a, b) instead of writing it every time you divide?',
    },
    debuggingMission: {
      id: 'dbg-11',
      title: 'The Missing Argument & Uncalled Function',
      storyContext: 'Engineer Bolt defined a function launch_pod(pod_name, speed) that requires 2 arguments, but he called it with only 1 argument!',
      brokenCode: `# Fix the function call so it passes both "Eagle-1" and 900!
def launch_pod(pod_name, speed):
    print(f"Pod {pod_name} launched at {speed} km/h")

launch_pod("Eagle-1")`,
      sampleInput: '',
      expectedOutput: 'Pod Eagle-1 launched at 900 km/h',
      bugType: 'Runtime Error',
      hints: [
        'How many parameters does def launch_pod(pod_name, speed): expect?',
        'How many arguments were passed in launch_pod("Eagle-1")?',
        'Pass the second argument 900: launch_pod("Eagle-1", 900)',
      ],
      teacherFixedCode: `def launch_pod(pod_name, speed):
    print(f"Pod {pod_name} launched at {speed} km/h")

launch_pod("Eagle-1", 900)`,
      explanationOfFix: 'Since launch_pod defines 2 required parameters (pod_name, speed), calling it requires 2 arguments.',
    },
    exitQuiz: [
      {
        id: 'c11-q1',
        type: 'mcq',
        prompt: 'Which keyword is used to define a new function in Python?',
        options: ['function', 'def', 'fun', 'create'],
        correctAnswer: 'def',
        points: 10,
        conceptTag: 'Function Definition',
        explanation: 'Python uses def (short for define) to create functions.',
      },
      {
        id: 'c11-q2',
        type: 'predict',
        prompt: 'What does this code print?',
        codeSnippet: `def double(n):\n    print(n * 2)\n\ndouble(6)\ndouble(15)`,
        correctAnswer: '12\n30',
        points: 15,
        conceptTag: 'Function Calls',
        explanation: 'First call prints 6 * 2 = 12; second call prints 15 * 2 = 30.',
      },
      {
        id: 'c11-q3',
        type: 'identify_error',
        prompt: 'Why does greet("Hasthaksh") raise a NameError if def greet(name): is written at the very bottom of the file?',
        correctAnswer: 'A function must be defined with def before it is called',
        acceptableKeywords: ['before', 'defined', 'order', 'above'],
        points: 15,
        conceptTag: 'Definition Order',
        explanation: 'Python reads top-to-bottom, so def greet(name): must appear above any call to greet().',
      },
      {
        id: 'c11-q4',
        type: 'fill_code',
        prompt: 'Fill in the missing punctuation at the end of a function header: def start_game()___',
        codeSnippet: `def start_game()___`,
        correctAnswer: ':',
        points: 10,
        conceptTag: 'Function Syntax',
        explanation: 'Every def header ends with a colon (:).',
      },
      {
        id: 'c11-q5',
        type: 'predict',
        prompt: 'Predict the output:',
        codeSnippet: `def box(w, h=3):\n    print(w * h)\n\nbox(4)\nbox(4, 5)`,
        correctAnswer: '12\n20',
        points: 15,
        conceptTag: 'Default Parameters',
        explanation: 'box(4) uses default h=3 (4*3=12), while box(4, 5) uses h=5 (4*5=20).',
      },
      {
        id: 'c11-q6',
        type: 'coding',
        prompt: 'Write the function header (with colon) for a function named welcome_hero that accepts one parameter named hero.',
        correctAnswer: 'def welcome_hero(hero):',
        acceptableKeywords: ['def', 'welcome_hero(hero):'],
        points: 20,
        conceptTag: 'Function Header',
        explanation: 'def welcome_hero(hero): defines the function with one parameter.',
      },
    ],
    standards: {
      lessonId: 11,
      englandKS2: [
        'Design and write modular programs using procedures and functions',
        'Solve problems by decomposing them into reusable sub-programs',
      ],
      cstaDomain: 'Programming',
      cstaOutcomeCode: 'CSTA-5-PRO-05',
      cstaOutcomeDescription: 'Create and invoke functions with parameters to organise code and reduce duplication.',
      cstaPractice: 'Computational Thinking',
      relatedActivity: 'Mathematical Toolbox',
      assessmentEvidence: 'Class 11 Exit Quiz & Function Factory Drills',
      masteryIndicator: 'Defines and calls multi-parameter functions cleanly.',
      coverageStatus: 'Covered in Depth',
      responsibleComputingNote: 'Clear, descriptive function names (like calculate_tax instead of f1) help teammates understand and trust your code.',
    },
  },
  {
    id: 12,
    phase: 'PHASE 4: DATA AND FUNCTIONS',
    title: 'Modular Programmer',
    subtitle: 'return Statements, print() vs return, Local vs Global Scope & Modular Design',
    comicChapterTitle: 'CHAPTER 12: THE RETURN TELEPORTER',
    illustrationTheme: 'modular',
    storyIntro:
      'Printing a value on screen only shows it to a human—other parts of your program cannot use a printed value in further calculations! In the Modular Core, Hasthaksh unlocks the return teleporter, sending calculated answers back from functions and mastering local vs global variable scope.',
    realWorldScenario:
      'Think of a calculator chip: when one function computes the subtotal and returns it, a second function can take that returned number, add tax, and return the final bill!',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'print() just displays text on the console screen. return actually hands the data value back to the caller so you can store it in a variable!',
      },
      {
        speaker: 'Hasthaksh',
        role: 'Modular Architect',
        line: 'And as soon as return executes, the function teleports back immediately!',
      },
    ],
    learningObjectives: [
      'Send calculated values back from a function using the return keyword.',
      'Explain the crucial difference between printing inside a function vs returning a value.',
      'Understand variable scope: local variables (inside a function) vs global variables (outside).',
      'Decompose a multi-step problem into smaller helper functions that pass returned values to each other.',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Accelerated Problem-Solving',
    topics: [
      'The return statement',
      'print() versus return',
      'Local and global variables (Scope)',
      'Breaking complex problems into helper functions',
    ],
    theoryBlocks: [
      {
        id: 'c12-t1',
        title: '1. return vs print(): Sending Values Back to the Caller',
        simpleExplanation:
          'When a function executes return value, it stops immediately and sends value back to wherever the function was called. If a function has no return statement, it automatically returns None!',
        whyProgrammersUseIt:
          'Returning values lets you chain functions together: total = apply_discount(calc_subtotal(price, qty)).',
        realWorldAnalogy:
          'print() is a chef holding up a photo of a pizza behind glass; return is the chef actually handing you the pizza box so you can eat it or share it!',
        pythonSyntax: 'def square(n):\n    return n * n\n\nans = square(5) + 10\nprint(ans)  # 35',
        workingCodeExample: `def calc_area(width, height):
    return width * height

room_a = calc_area(5, 4)
room_b = calc_area(6, 3)
total_floor = room_a + room_b

print("Room A:", room_a)
print("Room B:", room_b)
print("Total Floor Area:", total_floor)`,
        lineByLineExplanation: [
          { line: 'return width * height', explanation: 'Computes the product and hands the number back to the caller.' },
          { line: 'room_a = calc_area(5, 4)', explanation: 'Stores the returned value (20) inside variable room_a.' },
          { line: 'total_floor = room_a + room_b', explanation: 'Uses both returned integers (20 + 18) to calculate 38!' },
        ],
        expectedOutput: 'Room A: 20\nRoom B: 18\nTotal Floor Area: 38',
        commonMistakes: [
          'Using print(width * height) inside calc_area instead of return—which causes room_a to become None and room_a + room_b to crash with a TypeError!',
          'Writing code lines directly underneath return in the same block (they never run because return exits the function immediately).',
        ],
        quickQuestion: {
          question: 'What does a Python function return if it finishes without executing a return statement?',
          options: ['0', '""', 'None', 'False'],
          correctIndex: 2,
          explanation: 'Every function without an explicit return value returns None by default.',
        },
      },
      {
        id: 'c12-t2',
        title: '2. Variable Scope (Local vs Global) & Modular Composition',
        simpleExplanation:
          'Variables created inside a function have LOCAL scope—they exist only while that function is running and are invisible outside. Variables created at the top level have GLOBAL scope. Best practice: pass values in as parameters and return the new value rather than relying on global variables!',
        whyProgrammersUseIt:
          'Local scope protects functions from accidentally overwriting variables in other parts of a large project.',
        realWorldAnalogy:
          'Notes written on a private scratchpad inside your bedroom (local scope) vs a noticeboard in the school hallway (global scope).',
        pythonSyntax: 'def add_bonus(score):\n    bonus = 50  # local variable\n    return score + bonus\n\nplayer_score = add_bonus(100)',
        workingCodeExample: `base_tax = 10  # Global variable

def compute_bill(item_price, qty):
    subtotal = item_price * qty  # Local variable
    return subtotal + base_tax

final_amount = compute_bill(45, 2)
print("Final Amount:", final_amount)`,
        lineByLineExplanation: [
          { line: 'subtotal = item_price * qty', explanation: 'subtotal is local to compute_bill; trying to print(subtotal) outside would cause a NameError.' },
          { line: 'return subtotal + base_tax', explanation: 'Reads global base_tax (10) and returns 90 + 10 = 100.' },
        ],
        expectedOutput: 'Final Amount: 100',
        commonMistakes: [
          'Trying to print a local variable outside the function where it was created (raises NameError).',
        ],
        quickQuestion: {
          question: 'If variable temp_val is created inside def helper():, what happens if you write print(temp_val) outside the function?',
          options: [
            'It prints 0',
            'It raises a NameError because temp_val has local scope inside helper()',
            'It prints "temp_val"',
            'It restarts the function',
          ],
          correctIndex: 1,
          explanation: 'Local variables only exist inside the function where they are defined.',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: Modular Smart Calculator Pipeline',
      description: 'See how three modular functions collaborate by returning values into a final mission report.',
      starterCode: `# Modular Smart Calculator Pipeline
def calc_base_score(coins, gems):
    return coins * 10 + gems * 50

def apply_multiplier(score, streak):
    if streak >= 5:
        return score * 2
    return score

def get_rank(final_score):
    if final_score >= 500:
        return "Legend"
    elif final_score >= 250:
        return "Master"
    else:
        return "Explorer"

c = int(input())
g = int(input())
s = int(input())

base = calc_base_score(c, g)
boosted = apply_multiplier(base, s)
rank = get_rank(boosted)

print(f"Base Score: {base}")
print(f"Boosted Score: {boosted}")
print(f"Title: {rank}")`,
      sampleInput: '15\n3\n6',
      stepExplanations: [
        { line: 2, text: 'calc_base_score returns 15*10 + 3*50 = 300.' },
        { line: 5, text: 'apply_multiplier checks streak 6 >= 5 and returns 300 * 2 = 600.' },
        { line: 10, text: 'get_rank checks 600 >= 500 and returns "Legend".' },
      ],
      fullExplanation: 'Notice how each function has a single clear job and returns its output to feed the next function!',
    },
    predictChallenges: [
      {
        id: 'c12-p1',
        title: 'Trace 1: Early Return Exit',
        code: `def check_temp(t):
    if t > 100:
        return "Danger"
    return "Safe"

print(check_temp(120))
print(check_temp(80))`,
        expectedOutput: 'Danger\nSafe',
        explanation: 'When t=120, return "Danger" exits immediately. When t=80, the if is skipped and return "Safe" runs.',
        difficulty: 'Starter',
      },
      {
        id: 'c12-p2',
        title: 'Trace 2: Nested Function Calls',
        code: `def add_two(x):
    return x + 2

def triple(x):
    return x * 3

print(triple(add_two(4)))`,
        expectedOutput: '18',
        explanation: 'Inner call add_two(4) returns 6. Outer call triple(6) returns 6 * 3 = 18.',
        difficulty: 'Intermediate',
      },
      {
        id: 'c12-p3',
        title: 'Trace 3: Local vs Global Shadowing',
        code: `energy = 50

def boost(energy):
    energy = energy + 30
    return energy

print(boost(energy))
print(energy)`,
        expectedOutput: '80\n50',
        explanation: 'Inside boost(), energy is a local parameter that becomes 80 and is returned. The global energy outside remains 50!',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-12',
      lessonId: 12,
      title: 'Build a Smart Calculator Using Functions',
      objective: 'Build a modular Smart Calculator that takes an operation ("+", "-", "*", "//") and two numbers, delegates to a calculation function that returns the result, and prints the answer.',
      materialsOrCodeRequired: 'Python IDE with operator and two numbers in Input Panel.',
      starterCode: `# CLASS 12 ACTIVITY: MODULAR SMART CALCULATOR
def smart_calc(op, a, b):
    if op == "+":
        return a + b
    elif op == "-":
        return a - b
    elif op == "*":
        return a * b
    elif op == "//":
        return a // b
    else:
        return 0

operator = input()
num1 = int(input())
num2 = int(input())

answer = smart_calc(operator, num1, num2)
print(f"{num1} {operator} {num2} = {answer}")`,
      sampleInput: '*\n12\n7',
      teacherSolution: `def smart_calc(op, a, b):
    if op == "+":
        return a + b
    elif op == "-":
        return a - b
    elif op == "*":
        return a * b
    elif op == "//":
        return a // b
    else:
        return 0

operator = input()
num1 = int(input())
num2 = int(input())

answer = smart_calc(operator, num1, num2)
print(f"{num1} {operator} {num2} = {answer}")`,
      teacherInstructions: [
        'Ask Hasthaksh why smart_calc uses return instead of print—and demonstrate how we can do answer * 2 right after calling smart_calc!',
      ],
      studentInstructions: [
        'Complete smart_calc so it returns the result for +, -, *, and //.',
        'Store the returned value in answer and print the formatted equation.',
      ],
      timeLimitMinutes: 12,
      expectedOutcome: '12 * 7 = 84',
      reflectionQuestion: 'Why is returning a value from smart_calc much more flexible than printing inside smart_calc?',
    },
    debuggingMission: {
      id: 'dbg-12',
      title: 'The Missing Return Value Crash',
      storyContext: 'Cadet Ria wrote get_bonus(level) using print() instead of return, so adding total = 100 + get_bonus(5) crashes with a TypeError!',
      brokenCode: `# Change print() inside the function to return so total calculates properly!
def get_bonus(level):
    print(level * 20)

total = 100 + get_bonus(5)
print("Total Score:", total)`,
      sampleInput: '',
      expectedOutput: 'Total Score: 200',
      bugType: 'Runtime Error',
      hints: [
        'What does get_bonus(5) return right now when it only has print(level * 20)? (It returns None!)',
        'Can Python calculate 100 + None? No, that raises a TypeError!',
        'Replace print(level * 20) inside get_bonus with return level * 20.',
      ],
      teacherFixedCode: `def get_bonus(level):
    return level * 20

total = 100 + get_bonus(5)
print("Total Score:", total)`,
      explanationOfFix: 'Using return level * 20 sends the integer 100 back to the caller so 100 + 100 evaluates to 200.',
    },
    exitQuiz: [
      {
        id: 'c12-q1',
        type: 'mcq',
        prompt: 'What happens to any lines of code placed directly after a return statement inside the same block?',
        options: [
          'They run twice',
          'They never execute because return exits the function immediately',
          'They run before the return statement',
          'They cause a SyntaxError',
        ],
        correctAnswer: 'They never execute because return exits the function immediately',
        points: 10,
        conceptTag: 'return Execution',
        explanation: 'As soon as return runs, the function terminates and hands back the result.',
      },
      {
        id: 'c12-q2',
        type: 'predict',
        prompt: 'Predict the output:',
        codeSnippet: `def calc(x):\n    return x * 4\n\nres = calc(3) + calc(2)\nprint(res)`,
        correctAnswer: '20',
        points: 15,
        conceptTag: 'Return Values',
        explanation: 'calc(3) returns 12 and calc(2) returns 8. 12 + 8 = 20.',
      },
      {
        id: 'c12-q3',
        type: 'mcq',
        prompt: 'What is a "local variable"?',
        options: [
          'A variable defined inside a function that can only be accessed inside that function',
          'A variable that is saved to the hard drive',
          'A variable that never changes',
          'A variable accessible in every file',
        ],
        correctAnswer: 'A variable defined inside a function that can only be accessed inside that function',
        points: 15,
        conceptTag: 'Variable Scope',
        explanation: 'Variables assigned inside a function have local scope unless declared global.',
      },
      {
        id: 'c12-q4',
        type: 'identify_error',
        prompt: 'Why does x = add(2, 3) set x to None if def add(a, b): only has print(a + b)?',
        correctAnswer: 'Because the function prints instead of using return to send the value back',
        acceptableKeywords: ['return', 'print', 'None'],
        points: 15,
        conceptTag: 'print vs return',
        explanation: 'A function must use return a + b for the caller to receive the value.',
      },
      {
        id: 'c12-q5',
        type: 'fill_code',
        prompt: 'Which keyword inside a function tells Python to modify a global variable named score defined outside?',
        codeSnippet: `def add_point():\n    ______ score\n    score += 1`,
        correctAnswer: 'global',
        points: 15,
        conceptTag: 'global Keyword',
        explanation: 'global score declares that assignments to score refer to the global variable.',
      },
      {
        id: 'c12-q6',
        type: 'coding',
        prompt: 'Write the return statement that sends back the sum of parameters a and b.',
        correctAnswer: 'return a + b',
        acceptableKeywords: ['return', 'a + b'],
        points: 20,
        conceptTag: 'return Syntax',
        explanation: 'return a + b evaluates a + b and returns the result.',
      },
    ],
    standards: {
      lessonId: 12,
      englandKS2: [
        'Solve problems by decomposing them into smaller modular functions',
        'Use logical reasoning to trace data flow through parameters and return values',
      ],
      cstaDomain: 'Programming',
      cstaOutcomeCode: 'CSTA-5-PRO-06',
      cstaOutcomeDescription: 'Design modular programs using functions that accept parameters, manage local scope, and return values.',
      cstaPractice: 'Computational Thinking & Testing and Refinement',
      relatedActivity: 'Smart Calculator Using Functions',
      assessmentEvidence: 'Class 12 Exit Quiz & Modular Programmer Drills',
      masteryIndicator: 'Distinguishes print vs return and decomposes problems into clean helper functions.',
      coverageStatus: 'Covered in Depth',
      responsibleComputingNote: 'Modular functions make software easier to test one piece at a time—reducing bugs in critical calculators and medical devices.',
    },
  },
  {
    id: 13,
    phase: 'PHASE 4: DATA AND FUNCTIONS',
    title: 'Dictionary Database',
    subtitle: 'Dictionaries {key: value}, Reading, Updating, Adding/Removing Keys & Combining with Lists',
    comicChapterTitle: 'CHAPTER 13: ARCHIVES OF THE NEXUS',
    illustrationTheme: 'database',
    storyIntro:
      'Lists find items by position number (0, 1, 2), but what if you want to look up a student’s marks by their subject name, or a superhero’s gadget by its key? In the Nexus Archives, Hasthaksh masters Python Dictionaries—lightning-fast key-value databases enclosed in curly braces { }!',
    realWorldScenario:
      'Think of a contact list on a phone (look up "Mom" -> get phone number) or a game character profile ({"name": "Hasthaksh", "level": 5, "xp": 1200}).',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'Every item in a dictionary is a key: value pair! Instead of index numbers, you use the key inside square brackets: profile["level"]!',
      },
      {
        speaker: 'Hasthaksh',
        role: 'Database Architect',
        line: 'And when we put dictionaries inside a list, we can build an entire quiz or student database!',
      },
    ],
    learningObjectives: [
      'Create dictionaries using curly braces {key: value} and look up values by key.',
      'Add new key-value pairs, update existing values, and delete keys using del or .pop().',
      'Iterate over dictionary keys, values, and .items() using a for loop.',
      'Combine lists and dictionaries to model structured records (like Project 1’s quiz questions!).',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Accelerated Problem-Solving',
    topics: [
      'Dictionaries & Key-value pairs {k: v}',
      'Reading, adding, updating & removing keys',
      'Iterating through dictionaries (.keys(), .values(), .items())',
      'Combining lists and dictionaries',
    ],
    theoryBlocks: [
      {
        id: 'c13-t1',
        title: '1. Key-Value Pairs: Reading, Adding, Updating & Removing',
        simpleExplanation:
          'A dictionary maps unique keys to values: student = {"name": "Hasthaksh", "maths": 98}. Read a value with student["maths"]. Assign to an existing key to update it, or assign to a brand-new key to add it automatically!',
        whyProgrammersUseIt:
          'Looking up data by meaningful label ("maths", "science") is much clearer and less error-prone than remembering what index 3 meant in a list.',
        realWorldAnalogy:
          'A real dictionary: you don’t search for "word #4,812"—you look up the key word "Python" and read its definition value.',
        pythonSyntax: 'hero = {"name": "Volt", "hp": 100}\nhero["hp"] = 120       # Update\nhero["shield"] = 50    # Add new key',
        workingCodeExample: `cadet = {
    "name": "Hasthaksh",
    "grade": 5,
    "xp": 450
}

# Update xp and add a new key 'rank'
cadet["xp"] = cadet["xp"] + 150
cadet["rank"] = "Logic Detective"

print("Name:", cadet["name"])
print("Updated XP:", cadet["xp"])
print("Rank:", cadet["rank"])`,
        lineByLineExplanation: [
          { line: 'cadet = { ... }', explanation: 'Creates a dictionary with 3 keys: "name", "grade", and "xp".' },
          { line: 'cadet["xp"] = cadet["xp"] + 150', explanation: 'Updates the existing "xp" key from 450 to 600.' },
          { line: 'cadet["rank"] = "Logic Detective"', explanation: 'Adds a brand-new key "rank" to the dictionary.' },
        ],
        expectedOutput: 'Name: Hasthaksh\nUpdated XP: 600\nRank: Logic Detective',
        commonMistakes: [
          'Accessing a key that does not exist (e.g. cadet["age"]) raises a KeyError! Check if "age" in cadet: or use cadet.get("age", 0).',
        ],
        quickQuestion: {
          question: 'What happens if you execute bag["potion"] = 3 when "potion" is NOT yet a key in dictionary bag?',
          options: [
            'It raises a KeyError',
            'Python adds the new key "potion" with value 3 to bag',
            'It deletes the dictionary',
            'Nothing happens',
          ],
          correctIndex: 1,
          explanation: 'Assigning to a new key in a dictionary adds that key-value pair automatically.',
        },
      },
      {
        id: 'c13-t2',
        title: '2. Looping Over Dictionaries & Combining Lists with Dictionaries',
        simpleExplanation:
          'Use for k, v in my_dict.items(): to loop through both keys and values at the same time! You can also store a list inside a dictionary, or a list of dictionaries—the exact data structure we will use in Project 1 (Quiz Master)!',
        whyProgrammersUseIt:
          'Every modern web API (JSON), game database, and leaderboard stores records as lists of dictionaries.',
        realWorldAnalogy:
          'A filing cabinet (a list) where each folder inside is a labelled profile card with named fields (a dictionary).',
        pythonSyntax: 'for subject, mark in marks.items():\n    print(f"{subject}: {mark}")',
        workingCodeExample: `marks = {
    "Coding": 98,
    "Maths": 95,
    "Science": 92
}

total = 0
for subject, score in marks.items():
    print(f"{subject} -> {score}")
    total += score

print("Total Marks:", total)`,
        lineByLineExplanation: [
          { line: 'for subject, score in marks.items():', explanation: 'Unpacks each key into subject and each value into score.' },
          { line: 'total += score', explanation: 'Adds each subject’s score (98 + 95 + 92) into total (285).' },
        ],
        expectedOutput: 'Coding -> 98\nMaths -> 95\nScience -> 92\nTotal Marks: 285',
        commonMistakes: [
          'Writing for k, v in marks: without .items()—looping over a dictionary directly only gives the keys!',
        ],
        quickQuestion: {
          question: 'Which dictionary method lets you loop over both keys and values together as pairs?',
          options: ['.keys()', '.values()', '.items()', '.pairs()'],
          correctIndex: 2,
          explanation: '.items() returns (key, value) pairs for iteration.',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: Student Profile & Subject Marks Database',
      description: 'Update a subject mark dynamically, add a new subject, and compute the student’s grand total.',
      starterCode: `# Student Profile Database Demo
report_card = {
    "Python": 96,
    "Robotics": 90,
    "Maths": 94
}

new_subject = input()
new_mark = int(input())

report_card[new_subject] = new_mark

total = 0
for sub, mark in report_card.items():
    print(f"{sub}: {mark}")
    total += mark

print(f"Total across {len(report_card)} subjects: {total}")`,
      sampleInput: 'Astronomy\n98',
      stepExplanations: [
        { line: 11, text: 'Adds the new subject "Astronomy" with mark 98 to report_card.' },
        { line: 14, text: 'Iterates through all key-value pairs using .items() and sums the marks.' },
      ],
      fullExplanation: 'Dictionaries make adding and summarising named fields effortless.',
    },
    predictChallenges: [
      {
        id: 'c13-p1',
        title: 'Trace 1: Key Update & Lookup',
        code: `prices = {"apple": 30, "mango": 50}
prices["apple"] = prices["apple"] + 10
prices["banana"] = 20
print(prices["apple"], len(prices))`,
        expectedOutput: '40 3',
        explanation: 'apple increases from 30 to 40, and adding banana brings the number of keys to 3.',
        difficulty: 'Starter',
      },
      {
        id: 'c13-p2',
        title: 'Trace 2: Safe Lookup with .get()',
        code: `stock = {"bolts": 15, "gears": 8}
print(stock.get("bolts", 0))
print(stock.get("lasers", 0))`,
        expectedOutput: '15\n0',
        explanation: '.get("bolts", 0) finds 15; .get("lasers", 0) returns the default value 0 instead of crashing with a KeyError.',
        difficulty: 'Intermediate',
      },
      {
        id: 'c13-p3',
        title: 'Trace 3: List of Dictionaries',
        code: `heroes = [
    {"name": "Nova", "power": 80},
    {"name": "Bolt", "power": 95}
]
print(heroes[1]["name"], heroes[0]["power"] + 10)`,
        expectedOutput: 'Bolt 90',
        explanation: 'heroes[1]["name"] is "Bolt" and heroes[0]["power"] + 10 is 80 + 10 = 90.',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-13',
      lessonId: 13,
      title: 'Build a Student Profile Database',
      objective: 'Create a Student Profile Database dictionary storing name, favourite subject, marks, and badge count, update the marks with bonus points, and display a formatted summary.',
      materialsOrCodeRequired: 'Python IDE with student name and bonus marks inputs.',
      starterCode: `# CLASS 13 ACTIVITY: STUDENT PROFILE DATABASE
name_in = input()
bonus = int(input())

profile = {
    "name": name_in,
    "subject": "Python Programming",
    "marks": 88,
    "badges": 5
}

profile["marks"] = profile["marks"] + bonus
profile["badges"] = profile["badges"] + 1

print(f"Student: {profile['name']}")
print(f"Subject: {profile['subject']}")
print(f"Updated Marks: {profile['marks']}")
print(f"Badges Earned: {profile['badges']}")`,
      sampleInput: 'Hasthaksh\n12',
      teacherSolution: `name_in = input()
bonus = int(input())

profile = {
    "name": name_in,
    "subject": "Python Programming",
    "marks": 88,
    "badges": 5
}

profile["marks"] = profile["marks"] + bonus
profile["badges"] = profile["badges"] + 1

print(f"Student: {profile['name']}")
print(f"Subject: {profile['subject']}")
print(f"Updated Marks: {profile['marks']}")
print(f"Badges Earned: {profile['badges']}")`,
      teacherInstructions: [
        'Point out how single quotes \'name\' are used inside the double-quoted f-string f"Student: {profile[\'name\']}".',
      ],
      studentInstructions: [
        'Update profile["marks"] by adding bonus and increment profile["badges"] by 1.',
        'Run the code and verify the updated profile output.',
      ],
      timeLimitMinutes: 12,
      expectedOutcome: 'Student: Hasthaksh\nSubject: Python Programming\nUpdated Marks: 100\nBadges Earned: 6',
      reflectionQuestion: 'When is a dictionary a better choice than a list for storing a student profile?',
    },
    debuggingMission: {
      id: 'dbg-13',
      title: 'The Missing Key & Wrong Brackets Crash',
      storyContext: 'Archivist Neo tried to read the "score" key using parentheses and misspelled "player", crashing the archive terminal!',
      brokenCode: `# Fix the 2 dictionary access bugs!
record = {"player": "Astra", "score": 420}

print("Player:", record["playr"])
print("Score:", record("score"))`,
      sampleInput: '',
      expectedOutput: 'Player: Astra\nScore: 420',
      bugType: 'Runtime Error',
      hints: [
        'Line 4: Look closely at the spelling of "playr" vs the key "player" in record!',
        'Line 5: Do we look up dictionary keys using parentheses record("score") or square brackets record["score"]?',
        'Fix the key spelling to "player" and use square brackets record["score"].',
      ],
      teacherFixedCode: `record = {"player": "Astra", "score": 420}

print("Player:", record["player"])
print("Score:", record["score"])`,
      explanationOfFix: 'Dictionary keys must match exact spelling ("player") and use square brackets record["score"] for subscript lookup.',
    },
    exitQuiz: [
      {
        id: 'c13-q1',
        type: 'mcq',
        prompt: 'How is data stored inside a Python dictionary?',
        options: [
          'As key: value pairs inside curly braces { }',
          'As single items inside square brackets [ ]',
          'In alphabetical paragraphs',
          'Inside comments',
        ],
        correctAnswer: 'As key: value pairs inside curly braces { }',
        points: 10,
        conceptTag: 'Dictionary Structure',
        explanation: 'Dictionaries map unique keys to values using {key: value}.',
      },
      {
        id: 'c13-q2',
        type: 'predict',
        prompt: 'What does this code print?',
        codeSnippet: `car = {"brand": "Tesla", "wheels": 4}\ncar["wheels"] = 6\nprint(car["wheels"])`,
        correctAnswer: '6',
        points: 15,
        conceptTag: 'Updating Keys',
        explanation: 'Assigning to an existing key overwrites its previous value.',
      },
      {
        id: 'c13-q3',
        type: 'identify_error',
        prompt: 'What error is raised when you try to access d["unknown"] and "unknown" is not a key in dictionary d?',
        correctAnswer: 'KeyError',
        acceptableKeywords: ['KeyError', 'key error'],
        points: 15,
        conceptTag: 'KeyError',
        explanation: 'Python raises a KeyError when looking up a non-existent key with [ ].',
      },
      {
        id: 'c13-q4',
        type: 'fill_code',
        prompt: 'Fill in the operator to check whether "gold" is a key in dictionary chest:',
        codeSnippet: `if "gold" ___ chest:\n    print(chest["gold"])`,
        correctAnswer: 'in',
        points: 15,
        conceptTag: 'Key Membership',
        explanation: '"gold" in chest checks whether "gold" exists as a key in chest.',
      },
      {
        id: 'c13-q5',
        type: 'predict',
        prompt: 'Predict the output:',
        codeSnippet: `d = {"a": 10, "b": 20, "c": 30}\nprint(sum(d.values()))`,
        correctAnswer: '60',
        points: 15,
        conceptTag: '.values()',
        explanation: 'd.values() contains 10, 20, and 30. Their sum is 60.',
      },
      {
        id: 'c13-q6',
        type: 'coding',
        prompt: 'Write the single statement that adds a key "level" with integer value 10 to a dictionary named hero.',
        correctAnswer: 'hero["level"] = 10',
        acceptableKeywords: ['hero[', 'level', '=', '10'],
        points: 20,
        conceptTag: 'Adding Keys',
        explanation: 'hero["level"] = 10 adds or updates the "level" key.',
      },
    ],
    standards: {
      lessonId: 13,
      englandKS2: [
        'Design and create programs that store, retrieve and manipulate structured key-value records',
        'Combine lists and dictionaries to model real-world datasets',
      ],
      cstaDomain: 'Data & Analysis',
      cstaOutcomeCode: 'CSTA-5-DAA-04',
      cstaOutcomeDescription: 'Organise and query structured records using key-value dictionaries and nested collections.',
      cstaPractice: 'Computational Thinking',
      relatedActivity: 'Student Profile Database',
      assessmentEvidence: 'Class 13 Exit Quiz & Dictionary Database Drills',
      masteryIndicator: 'Creates, updates, and iterates through dictionaries and lists of dictionaries.',
      coverageStatus: 'Covered in Depth',
      responsibleComputingNote: 'Real school databases store student records in dictionary-like tables—always keep student grades confidential and accurate!',
    },
  },
  {
    id: 14,
    phase: 'PHASE 4: DATA AND FUNCTIONS',
    title: 'Randomness Lab',
    subtitle: 'import random, random.randint(), random.choice() & Game Simulations',
    comicChapterTitle: 'CHAPTER 14: THE PROBABILITY REACTOR',
    illustrationTheme: 'dice',
    storyIntro:
      'A game where the monster always makes the exact same move is boring after one play! In the Probability Reactor, Hasthaksh imports Python’s random module to roll virtual dice, pick surprise loot drops, and build unpredictable AI opponents.',
    realWorldScenario:
      'How does Minecraft decide where treasure chests spawn, or how does a computer opponent choose Rock, Paper, or Scissors fairly?',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'Watch out for this twist, Hasthaksh: unlike range(), random.randint(1, 6) INCLUDES both 1 AND 6!',
      },
      {
        speaker: 'Hasthaksh',
        role: 'Game Designer',
        line: 'import random at the top, and let the Dice Battle begin!',
      },
    ],
    learningObjectives: [
      'Import standard-library modules using import random and import math.',
      'Generate random integers within an inclusive range using random.randint(a, b).',
      'Select random elements from a list using random.choice(sequence).',
      'Combine randomness, loops, conditionals, and functions to build a Dice Battle game.',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Intermediate Foundations',
    topics: [
      'import statement & standard-library modules',
      'random.randint(a, b) (inclusive bounds!)',
      'random.choice(list)',
      'Simulating dice rolls & computer opponents',
    ],
    theoryBlocks: [
      {
        id: 'c14-t1',
        title: '1. Importing Modules & random.randint(a, b)',
        simpleExplanation:
          'Python comes with "batteries included"—extra toolkits called modules that you unlock with import random at the top of your file. random.randint(1, 6) returns a random integer from 1 to 6 INCLUSIVE (both 1 and 6 can be picked!).',
        whyProgrammersUseIt:
          'Simulations, dice rolls, random maths quiz generators, and procedural game worlds all rely on random.randint().',
        realWorldAnalogy:
          'Opening a locked attachment case (import random) to pull out a 6-sided or 20-sided die (random.randint(1, 20)).',
        pythonSyntax: 'import random\n\nroll = random.randint(1, 6)\nprint("You rolled:", roll)',
        workingCodeExample: `import random

die1 = random.randint(1, 6)
die2 = random.randint(1, 6)
total = die1 + die2

print(f"Die 1: {die1} | Die 2: {die2} | Total: {total}")
if total >= 7:
    print("Lucky High Roll!")
else:
    print("Low Roll!")`,
        lineByLineExplanation: [
          { line: 'import random', explanation: 'Loads the random module so its functions can be used.' },
          { line: 'die1 = random.randint(1, 6)', explanation: 'Picks a random whole number between 1 and 6 inclusive.' },
        ],
        expectedOutput: 'Die 1: 4 | Die 2: 5 | Total: 9\nLucky High Roll!',
        commonMistakes: [
          'Forgetting import random at the top of the file (causes NameError: name "random" is not defined).',
          'Thinking random.randint(1, 6) stops at 5 like range()—randint(1, 6) DOES include 6!',
        ],
        quickQuestion: {
          question: 'What are the possible values returned by random.randint(1, 3)?',
          options: ['1 or 2', '1, 2, or 3', '0, 1, 2, or 3', 'Only 3'],
          correctIndex: 1,
          explanation: 'random.randint(a, b) is inclusive on both ends, so it can return 1, 2, or 3.',
        },
      },
      {
        id: 'c14-t2',
        title: '2. Picking from Lists with random.choice()',
        simpleExplanation:
          'When you have a list of options—like ["rock", "paper", "scissors"] or ["Gold Sword", "Shield", "Potion"]—use random.choice(my_list) to pick one element at random!',
        whyProgrammersUseIt:
          'random.choice() is the cleanest way to make a computer opponent pick a move or select a random question from a bank.',
        realWorldAnalogy:
          'Reaching into a mystery prize hat containing 5 tickets and pulling one out without looking.',
        pythonSyntax: 'import random\nmoves = ["rock", "paper", "scissors"]\ncomp = random.choice(moves)',
        workingCodeExample: `import random

loot_box = ["Plasma Shield", "Turbo Boots", "Star Map", "Nano Medkit"]
picked = random.choice(loot_box)

print("Available LootCount:", len(loot_box))
print("Mystery Drop:", picked)
print("Valid Drop:", picked in loot_box)`,
        lineByLineExplanation: [
          { line: 'picked = random.choice(loot_box)', explanation: 'Selects one random string from the loot_box list.' },
          { line: 'print("Valid Drop:", picked in loot_box)', explanation: 'Confirms that the chosen item came from loot_box (True).' },
        ],
        expectedOutput: 'Available LootCount: 4\nMystery Drop: Turbo Boots\nValid Drop: True',
        commonMistakes: [
          'Passing an empty list [] to random.choice()—which raises an error because there is nothing to choose from!',
        ],
        quickQuestion: {
          question: 'Which function picks one random item from a list named colours?',
          options: ['random.randint(colours)', 'random.choice(colours)', 'random.pick(colours)', 'colours.random()'],
          correctIndex: 1,
          explanation: 'random.choice(colours) selects a random element from any non-empty sequence.',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: 3-Round Player vs Computer Dice Battle',
      description: 'Run this multiple times to watch random rolls change every round!',
      starterCode: `# 3-Round Dice Battle Demo
import random

player_wins = 0
comp_wins = 0

for r in range(1, 4):
    p_roll = random.randint(1, 6)
    c_roll = random.randint(1, 6)
    print(f"Round {r}: Hasthaksh rolled {p_roll} vs Droid {c_roll}")
    if p_roll > c_roll:
        player_wins += 1
    elif c_roll > p_roll:
        comp_wins += 1

print(f"Final Score -> Hasthaksh: {player_wins} | Droid: {comp_wins}")`,
      sampleInput: '',
      stepExplanations: [
        { line: 2, text: 'Imports the random module.' },
        { line: 8, text: 'Generates independent 1-to-6 dice rolls for both Hasthaksh and the Droid.' },
        { line: 11, text: 'Compares rolls and awards a point to the higher roller.' },
      ],
      fullExplanation: 'Every time you click Run Code, random.randint(1, 6) generates fresh dice rolls!',
    },
    predictChallenges: [
      {
        id: 'c14-p1',
        title: 'Trace 1: Equal Bounds in randint',
        code: `import random
x = random.randint(7, 7)
print(x * 3)`,
        expectedOutput: '21',
        explanation: 'Since the minimum and maximum are both 7, random.randint(7, 7) is guaranteed to return 7, and 7 * 3 = 21!',
        difficulty: 'Starter',
      },
      {
        id: 'c14-p2',
        title: 'Trace 2: Single-Element Choice',
        code: `import random
ranks = ["Champion"]
winner = random.choice(ranks)
print(f"Rank: {winner}")`,
        expectedOutput: 'Rank: Champion',
        explanation: 'With only one item in the list, random.choice(ranks) always returns "Champion".',
        difficulty: 'Intermediate',
      },
      {
        id: 'c14-p3',
        title: 'Trace 3: Bounded Range Check',
        code: `import random
n = random.randint(10, 20)
print(n >= 10 and n <= 20)`,
        expectedOutput: 'True',
        explanation: 'Any integer generated by random.randint(10, 20) is guaranteed to be >= 10 and <= 20, so the condition is always True!',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-14',
      lessonId: 14,
      title: 'Dice Battle Arena',
      objective: 'Create a Dice Battle Arena where Hasthaksh enters his bonus modifier, rolls a 6-sided die, and battles the computer’s roll.',
      materialsOrCodeRequired: 'Python IDE with import random.',
      starterCode: `# CLASS 14 ACTIVITY: DICE BATTLE ARENA
import random

hero_name = input()
bonus = int(input())

base_roll = random.randint(1, 6)
final_roll = base_roll + bonus

print(f"Hero: {hero_name}")
print("Valid Die (1-6):", base_roll >= 1 and base_roll <= 6)
print("Boosted Roll >= Bonus + 1:", final_roll >= bonus + 1)`,
      sampleInput: 'Hasthaksh\n5',
      teacherSolution: `import random

hero_name = input()
bonus = int(input())

base_roll = random.randint(1, 6)
final_roll = base_roll + bonus

print(f"Hero: {hero_name}")
print("Valid Die (1-6):", base_roll >= 1 and base_roll <= 6)
print("Boosted Roll >= Bonus + 1:", final_roll >= bonus + 1)`,
      teacherInstructions: [
        'Have Hasthaksh also print base_roll and final_roll to watch them change on each run.',
      ],
      studentInstructions: [
        'Use random.randint(1, 6) to roll a 6-sided die.',
        'Add bonus to base_roll and verify the roll bounds.',
      ],
      timeLimitMinutes: 12,
      expectedOutcome: 'Hero: Hasthaksh\nValid Die (1-6): True\nBoosted Roll >= Bonus + 1: True',
      reflectionQuestion: 'Why does random.randint(1, 6) include 6 while range(1, 6) stops at 5?',
    },
    debuggingMission: {
      id: 'dbg-14',
      title: 'The Forgotten Import Crash',
      storyContext: 'Game Master Leo wrote a loot generator using random.choice(), but forgot to import the module and passed two separate strings instead of a list!',
      brokenCode: `# Fix the missing import and verify the choice!
items = ["Ruby", "Ruby"]
picked = random.choice(items)
print("Loot:", picked)`,
      sampleInput: '',
      expectedOutput: 'Loot: Ruby',
      bugType: 'Runtime Error',
      hints: [
        'Why does Python say NameError: name "random" is not defined?',
        'What line must go at the very top of the program before using random.choice()?',
        'Add import random on line 1!',
      ],
      teacherFixedCode: `import random
items = ["Ruby", "Ruby"]
picked = random.choice(items)
print("Loot:", picked)`,
      explanationOfFix: 'You must include import random before calling random.choice() or random.randint().',
    },
    exitQuiz: [
      {
        id: 'c14-q1',
        type: 'mcq',
        prompt: 'Which line must be at the top of your Python file to use random.randint()?',
        options: ['use random', 'import random', 'include random', 'random.start()'],
        correctAnswer: 'import random',
        points: 10,
        conceptTag: 'import',
        explanation: 'import random loads the standard random module.',
      },
      {
        id: 'c14-q2',
        type: 'mcq',
        prompt: 'What is the highest number that random.randint(1, 10) can return?',
        options: ['9', '10', '11', '1'],
        correctAnswer: '10',
        points: 15,
        conceptTag: 'randint Bounds',
        explanation: 'Unlike range(), random.randint(1, 10) includes the upper bound 10.',
      },
      {
        id: 'c14-q3',
        type: 'fill_code',
        prompt: 'Complete the code to pick one random fruit from a list named fruits: random.___(fruits)',
        codeSnippet: `pick = random.___(fruits)`,
        correctAnswer: 'choice',
        points: 15,
        conceptTag: 'random.choice()',
        explanation: 'random.choice(fruits) picks a random item from the list.',
      },
      {
        id: 'c14-q4',
        type: 'predict',
        prompt: 'Predict the output of this code:',
        codeSnippet: `import random\nx = random.randint(5, 5)\nprint(x + 10)`,
        correctAnswer: '15',
        points: 15,
        conceptTag: 'Deterministic Bounds',
        explanation: 'random.randint(5, 5) must return 5, and 5 + 10 = 15.',
      },
      {
        id: 'c14-q5',
        type: 'identify_error',
        prompt: 'Why does random.randint(10, 1) fail?',
        correctAnswer: 'The first argument (minimum) must be less than or equal to the second argument (maximum)',
        acceptableKeywords: ['first', 'smaller', 'less', 'min', 'max', 'order'],
        points: 15,
        conceptTag: 'Argument Order',
        explanation: 'In random.randint(a, b), a must be <= b (e.g., random.randint(1, 10)).',
      },
      {
        id: 'c14-q6',
        type: 'coding',
        prompt: 'Write the expression that generates a random integer between 1 and 20 inclusive.',
        correctAnswer: 'random.randint(1, 20)',
        acceptableKeywords: ['random.randint(1, 20)'],
        points: 20,
        conceptTag: 'randint Syntax',
        explanation: 'random.randint(1, 20) returns an integer from 1 to 20 inclusive.',
      },
    ],
    standards: {
      lessonId: 14,
      englandKS2: [
        'Design and write programs that simulate physical systems and games using randomisation',
        'Combine sequence, selection, repetition, and functions in interactive games',
      ],
      cstaDomain: 'Algorithms & Design',
      cstaOutcomeCode: 'CSTA-5-ALG-03',
      cstaOutcomeDescription: 'Incorporate randomness and probability modules to simulate events and game mechanics.',
      cstaPractice: 'Computational Thinking & Human-Centred Design',
      relatedActivity: 'Dice Battle Arena',
      assessmentEvidence: 'Class 14 Exit Quiz & Randomness Lab Drills',
      masteryIndicator: 'Uses random.randint() and random.choice() with loops and conditionals.',
      coverageStatus: 'Covered in Depth',
      responsibleComputingNote: 'Fair games disclose their odds honestly rather than secretly rigging loot-box probabilities against players.',
    },
  },
  {
    id: 15,
    phase: 'PHASE 4: DATA AND FUNCTIONS',
    title: 'Algorithm Lab',
    subtitle: 'Linear Search, Bubble Sort Enrichment, Counting Duplicates & Step Efficiency',
    comicChapterTitle: 'CHAPTER 15: THE SEARCH FOR ARTIFACT ZERO',
    illustrationTheme: 'treasure',
    storyIntro:
      'Thousands of ancient data crystals fill the Vault, and only one holds Artifact Zero! How does a computer search a list of items or sort scrambled numbers without built-in shortcuts? In the Algorithm Lab, Hasthaksh builds Linear Search and Bubble Sort from scratch and compares algorithm efficiency!',
    realWorldScenario:
      'When you search for a contact or sort products by price on an online store, searching and sorting algorithms are doing the heavy lifting behind the scenes.',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'Two programs can give the exact same answer, Hasthaksh—but a smart algorithm uses far fewer steps!',
      },
      {
        speaker: 'Hasthaksh',
        role: 'Lead Algorithmist',
        line: 'Let’s trace Linear Search step-by-step and bubble the largest numbers to the top!',
      },
    ],
    learningObjectives: [
      'Implement and manually trace a Linear Search function that returns the index of a target item (or -1 if not found).',
      'Count occurrences and detect duplicate values in a collection.',
      'Understand how Bubble Sort compares adjacent pairs and swaps them when out of order.',
      'Compare two algorithms and explain why one uses fewer steps than another.',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Advanced Challenge',
    topics: [
      'Linear search & step counting',
      'Finding an item’s index in a list',
      'Counting duplicates & basic data analysis',
      'Bubble sort (enrichment)',
      'Comparing algorithm efficiency',
    ],
    theoryBlocks: [
      {
        id: 'c15-t1',
        title: '1. Linear Search: Checking Items One by One',
        simpleExplanation:
          'Linear Search checks each slot in a list from index 0 to the end. As soon as it finds a match (items[i] == target), it returns index i and stops searching! If the loop finishes without finding the target, it returns -1.',
        whyProgrammersUseIt:
          'Linear search works on ANY list—even completely unsorted data—and stopping early with return or break saves wasted checks.',
        realWorldAnalogy:
          'Checking classroom lockers 0, 1, 2, 3 in order until you find your jacket.',
        pythonSyntax: 'def linear_search(items, target):\n    for i in range(len(items)):\n        if items[i] == target:\n            return i\n    return -1',
        workingCodeExample: `def linear_search(vault, target):
    steps = 0
    for i in range(len(vault)):
        steps += 1
        if vault[i] == target:
            print(f"Found {target} at index {i} in {steps} steps!")
            return i
    print(f"{target} not found after {steps} steps.")
    return -1

crystals = ["Ruby", "Sapphire", "Artifact-Zero", "Emerald", "Topaz"]
linear_search(crystals, "Artifact-Zero")
linear_search(crystals, "Diamond")`,
        lineByLineExplanation: [
          { line: 'for i in range(len(vault)):', explanation: 'Loops index i through 0, 1, 2, 3, 4.' },
          { line: 'if vault[i] == target:', explanation: 'Compares the item at index i against target.' },
          { line: 'return i', explanation: 'Immediately exits and returns the index as soon as the target is found (after 3 steps instead of 5!).' },
        ],
        expectedOutput: 'Found Artifact-Zero at index 2 in 3 steps!\nDiamond not found after 5 steps.',
        commonMistakes: [
          'Putting return -1 inside the else branch of the if statement inside the loop—which makes the search give up after checking only index 0!',
        ],
        quickQuestion: {
          question: 'Why must return -1 (not found) be placed OUTSIDE and AFTER the for loop in linear_search?',
          options: [
            'So the function checks ALL items in the list before concluding the target is not there',
            'Because return is not allowed inside a for loop',
            'To make the loop run backwards',
            'Because -1 is a negative number',
          ],
          correctIndex: 0,
          explanation: 'If return -1 is inside the loop, the function stops on the very first non-matching item at index 0!',
        },
      },
      {
        id: 'c15-t2',
        title: '2. Bubble Sort Enrichment & Comparing Step Efficiency',
        simpleExplanation:
          'Bubble Sort works by repeatedly stepping through the list, comparing neighbouring pairs (nums[j] and nums[j + 1]), and swapping them if the left one is bigger than the right one. Each pass "bubbles" the next largest number to the end!',
        whyProgrammersUseIt:
          'Learning Bubble Sort reveals how sorting actually works under the hood when you call .sort()!',
        realWorldAnalogy:
          'Students lining up by height: neighbours compare heights and swap places until the tallest student reaches the back of the line.',
        pythonSyntax: 'if nums[j] > nums[j + 1]:\n    nums[j], nums[j + 1] = nums[j + 1], nums[j]',
        workingCodeExample: `nums = [40, 10, 30, 20]
swaps = 0

n = len(nums)
for i in range(n):
    for j in range(0, n - i - 1):
        if nums[j] > nums[j + 1]:
            nums[j], nums[j + 1] = nums[j + 1], nums[j]
            swaps += 1

print("Sorted List:", nums)
print("Total Swaps:", swaps)`,
        lineByLineExplanation: [
          { line: 'if nums[j] > nums[j + 1]:', explanation: 'Checks if the left neighbour is greater than the right neighbour.' },
          { line: 'nums[j], nums[j + 1] = nums[j + 1], nums[j]', explanation: 'Python tuple swap: exchanges the two neighbouring items in one clean line!' },
        ],
        expectedOutput: 'Sorted List: [10, 20, 30, 40]\nTotal Swaps: 4',
        commonMistakes: [
          'Looping j all the way to len(nums) instead of len(nums) - 1, which causes nums[j + 1] to crash with an IndexError!',
        ],
        quickQuestion: {
          question: 'In a list of 100 items, what is the maximum number of comparisons Linear Search makes in the worst case?',
          options: ['1 comparison', '10 comparisons', '100 comparisons', '10,000 comparisons'],
          correctIndex: 2,
          explanation: 'In the worst case (item at the very end or not in the list), Linear Search checks all 100 items once.',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: Treasure Vault Linear Search & Duplicate Counter',
      description: 'Search for a target chest code, record the first index found, and count total duplicates.',
      starterCode: `# Treasure Vault Search & Duplicate Analysis
chests = [104, 209, 305, 209, 412, 209, 501]
target = int(input())

first_index = -1
count = 0

for i in range(len(chests)):
    if chests[i] == target:
        count += 1
        if first_index == -1:
            first_index = i

print(f"Searching for Chest #{target}")
print(f"First Found at Index: {first_index}")
print(f"Total Matches: {count}")`,
      sampleInput: '209',
      stepExplanations: [
        { line: 8, text: 'Loops index i from 0 to 6 across all 7 chests.' },
        { line: 11, text: 'Records first_index = 1 the very first time 209 is seen, while continuing to count all 3 occurrences.' },
      ],
      fullExplanation: 'By tracking both first_index and count, a single pass over the list answers two questions at once!',
    },
    predictChallenges: [
      {
        id: 'c15-p1',
        title: 'Trace 1: Linear Search Step Count',
        code: `items = [11, 22, 33, 44, 55]
steps = 0
for x in items:
    steps += 1
    if x == 33:
        break
print(steps)`,
        expectedOutput: '3',
        explanation: 'Checks 11 (step 1), 22 (step 2), 33 (step 3 -> break!). Total steps: 3.',
        difficulty: 'Starter',
      },
      {
        id: 'c15-p2',
        title: 'Trace 2: Single Bubble Pass',
        code: `arr = [50, 20, 40, 10]
for j in range(len(arr) - 1):
    if arr[j] > arr[j + 1]:
        arr[j], arr[j + 1] = arr[j + 1], arr[j]
print(arr)`,
        expectedOutput: '[20, 40, 10, 50]',
        explanation: 'One pass bubbles the largest number (50) all the way to the rightmost index!',
        difficulty: 'Intermediate',
      },
      {
        id: 'c15-p3',
        title: 'Trace 3: Duplicate Detector',
        code: `nums = [4, 7, 4, 9, 7, 2]
seen = []
dups = []
for n in nums:
    if n in seen:
        dups.append(n)
    else:
        seen.append(n)
print(dups)`,
        expectedOutput: '[4, 7]',
        explanation: 'The second time 4 and 7 appear, they are already in seen, so they get added to dups.',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-15',
      lessonId: 15,
      title: 'Find the Hidden Treasure',
      objective: 'Write a searching function find_treasure(rooms, target) that searches through a list of room names, counts how many doors were opened, and reports where the treasure was found.',
      materialsOrCodeRequired: 'Python IDE with target treasure room input.',
      starterCode: `# CLASS 15 ACTIVITY: FIND THE HIDDEN TREASURE
rooms = ["Armoury", "Library", "Laboratory", "Golden Vault", "Observatory"]
target_room = input()

steps = 0
found_index = -1

for i in range(len(rooms)):
    steps += 1
    if rooms[i] == target_room:
        found_index = i
        break

if found_index != -1:
    print(f"Treasure found in {target_room} at index {found_index}!")
    print(f"Doors opened: {steps}")
else:
    print(f"{target_room} not in castle. Doors checked: {steps}")`,
      sampleInput: 'Golden Vault',
      teacherSolution: `rooms = ["Armoury", "Library", "Laboratory", "Golden Vault", "Observatory"]
target_room = input()

steps = 0
found_index = -1

for i in range(len(rooms)):
    steps += 1
    if rooms[i] == target_room:
        found_index = i
        break

if found_index != -1:
    print(f"Treasure found in {target_room} at index {found_index}!")
    print(f"Doors opened: {steps}")
else:
    print(f"{target_room} not in castle. Doors checked: {steps}")`,
      teacherInstructions: [
        'Compare what happens with and without the break statement when searching for "Armoury" (1 door vs 5 doors!).',
      ],
      studentInstructions: [
        'Search rooms using a for loop and stop as soon as target_room is found.',
        'Print the index and how many doors were opened.',
      ],
      timeLimitMinutes: 12,
      expectedOutcome: 'Treasure found in Golden Vault at index 3!\nDoors opened: 4',
      reflectionQuestion: 'How many steps does break save if the treasure is in the very first room ("Armoury") of a 1,000-room castle?',
    },
    debuggingMission: {
      id: 'dbg-15',
      title: 'The Premature "Not Found" Search Bug',
      storyContext: 'Explorer Kai put return -1 inside the else branch of the loop, so his search function only ever checks index 0 and gives up!',
      brokenCode: `# Fix the indentation of return -1 so search_list checks every item!
def search_list(items, target):
    for i in range(len(items)):
        if items[i] == target:
            return i
        else:
            return -1

nums = [10, 25, 40, 55]
print("Index of 40:", search_list(nums, 40))`,
      sampleInput: '',
      expectedOutput: 'Index of 40: 2',
      bugType: 'Logic Error',
      hints: [
        'Trace what happens on i = 0: items[0] is 10, which is not 40. The else branch immediately executes return -1!',
        'We should only return -1 AFTER the entire for loop has finished checking every item.',
        'Remove the else: and unindent return -1 so it lines up with for i in range(len(items)):.',
      ],
      teacherFixedCode: `def search_list(items, target):
    for i in range(len(items)):
        if items[i] == target:
            return i
    return -1

nums = [10, 25, 40, 55]
print("Index of 40:", search_list(nums, 40))`,
      explanationOfFix: 'Placing return -1 outside the for loop ensures all indices are checked before returning -1.',
    },
    exitQuiz: [
      {
        id: 'c15-q1',
        type: 'mcq',
        prompt: 'How does Linear Search find a target item in a list?',
        options: [
          'It checks elements sequentially one by one from start to end until a match is found',
          'It deletes half the list at random',
          'It requires the list to be sorted alphabetically first',
          'It only checks the first and last element',
        ],
        correctAnswer: 'It checks elements sequentially one by one from start to end until a match is found',
        points: 10,
        conceptTag: 'Linear Search',
        explanation: 'Linear search inspects each item in order from index 0.',
      },
      {
        id: 'c15-q2',
        type: 'predict',
        prompt: 'How many comparisons does Linear Search make to find 80 in [20, 40, 60, 80, 100] if it stops on match?',
        codeSnippet: `nums = [20, 40, 60, 80, 100]`,
        correctAnswer: '4',
        points: 15,
        conceptTag: 'Step Counting',
        explanation: 'It checks 20 (1), 40 (2), 60 (3), and 80 (4 — match!).',
      },
      {
        id: 'c15-q3',
        type: 'predict',
        prompt: 'What does this Python swap line print?',
        codeSnippet: `a, b = 10, 99\na, b = b, a\nprint(a, b)`,
        correctAnswer: '99 10',
        points: 15,
        conceptTag: 'Tuple Swap',
        explanation: 'a, b = b, a swaps the values of a and b simultaneously.',
      },
      {
        id: 'c15-q4',
        type: 'mcq',
        prompt: 'In Bubble Sort, after the very first complete pass through a list of numbers, which number is guaranteed to be in its final position?',
        options: [
          'The smallest number is at index 0',
          'The largest number has bubbled to the very last index',
          'All numbers are completely sorted',
          'The middle number',
        ],
        correctAnswer: 'The largest number has bubbled to the very last index',
        points: 15,
        conceptTag: 'Bubble Sort',
        explanation: 'Each pass of Bubble Sort moves the largest unsorted element to the right end.',
      },
      {
        id: 'c15-q5',
        type: 'identify_error',
        prompt: 'Why does returning -1 inside the first iteration of a search loop break the algorithm?',
        correctAnswer: 'It stops after checking only the first element at index 0 instead of checking the rest of the list',
        acceptableKeywords: ['first', 'index 0', 'stops', 'rest', 'all'],
        points: 15,
        conceptTag: 'Search Logic',
        explanation: 'The "not found" return must execute only after the loop has checked all elements.',
      },
      {
        id: 'c15-q6',
        type: 'coding',
        prompt: 'Write the single Python line that swaps the adjacent list elements arr[j] and arr[j + 1].',
        correctAnswer: 'arr[j], arr[j + 1] = arr[j + 1], arr[j]',
        acceptableKeywords: ['arr[j]', 'arr[j + 1]', '='],
        points: 20,
        conceptTag: 'Adjacent Swap',
        explanation: 'arr[j], arr[j + 1] = arr[j + 1], arr[j] swaps the two neighbouring elements.',
      },
    ],
    standards: {
      lessonId: 15,
      englandKS2: [
        'Use logical reasoning to explain how searching and sorting algorithms work',
        'Compare different algorithms for the same problem and evaluate efficiency',
      ],
      cstaDomain: 'Algorithms & Design',
      cstaOutcomeCode: 'CSTA-5-ALG-04',
      cstaOutcomeDescription: 'Trace searching and sorting algorithms and compare the number of steps required for different inputs.',
      cstaPractice: 'Computational Thinking',
      relatedActivity: 'Find the Hidden Treasure',
      assessmentEvidence: 'Class 15 Exit Quiz & Algorithm Lab Drills',
      masteryIndicator: 'Implements linear search, counts steps, and traces adjacent swaps.',
      coverageStatus: 'Covered in Depth',
      responsibleComputingNote: 'Efficient algorithms use less CPU time and less electricity across millions of servers worldwide!',
    },
  },
  {
    id: 16,
    phase: 'PHASE 4: DATA AND FUNCTIONS',
    title: 'Debugging Academy',
    subtitle: 'Syntax, Runtime & Logic Errors, Edge Cases, Testing & try / except',
    comicChapterTitle: 'CHAPTER 16: SHIELD AGAINST THE GLITCH SWARM',
    illustrationTheme: 'bug',
    storyIntro:
      'Every great programmer spends time hunting bugs! Before tackling the Three Major Capstone Projects, Hasthaksh enters the Debugging Academy to master the three families of bugs (Syntax, Runtime, and Logic Errors), test edge cases, and build crash-proof shields with try and except!',
    realWorldScenario:
      'What happens if a player types "banana" when a game asks for an integer age, or types 0 when dividing loot among teammates? Without try and except, the entire game crashes!',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'Syntax Errors stop code from starting. Runtime Errors crash while running. Logic Errors run without crashing—but give the wrong answer!',
      },
      {
        speaker: 'Hasthaksh',
        role: 'Master Bug Hunter',
        line: 'And with try / except, our programs handle invalid user inputs gracefully without crashing!',
      },
    ],
    learningObjectives: [
      'Classify bugs into Syntax Errors, Runtime Errors (ValueError, ZeroDivisionError, IndexError), and Logic Errors.',
      'Read Python error messages and line numbers to pinpoint the cause of a bug.',
      'Use try and except blocks to catch and handle invalid inputs or division by zero.',
      'Design test cases covering normal inputs, boundary values, and invalid edge cases.',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Advanced Challenge',
    topics: [
      'Syntax errors, Runtime errors & Logic errors',
      'Reading error messages',
      'try and except error handling',
      'Testing & Edge cases',
      'Improving code quality',
    ],
    theoryBlocks: [
      {
        id: 'c16-t1',
        title: '1. The Three Bug Families: Syntax, Runtime & Logic Errors',
        simpleExplanation:
          '1) Syntax Error: broken Python grammar (missing colon, unclosed quote)—Python refuses to start. 2) Runtime Error: valid grammar that does something impossible while running (dividing by 0, int("abc"), index out of range). 3) Logic Error: runs smoothly with zero error messages, but uses the wrong formula (like + instead of *)!',
        whyProgrammersUseIt:
          'Knowing which family a bug belongs to tells you immediately whether to check grammar, add a safety check, or trace your math formula.',
        realWorldAnalogy:
          'Syntax error = a sentence with scrambled grammar. Runtime error = instructions saying "walk through the locked wall". Logic error = following directions perfectly, but turning left instead of right.',
        pythonSyntax: '# Syntax: if x == 5 (missing :)\n# Runtime: 10 / 0 (ZeroDivisionError)\n# Logic: avg = a + b / 2 (missing parens)',
        workingCodeExample: `# Fixing a classic Logic Error in Average Calculation
score1 = 80
score2 = 100

wrong_avg = score1 + score2 / 2
correct_avg = (score1 + score2) / 2

print("Buggy Average (Logic Error):", wrong_avg)
print("Fixed Average:", correct_avg)`,
        lineByLineExplanation: [
          { line: 'wrong_avg = score1 + score2 / 2', explanation: 'Logic error! Divides 100 / 2 = 50 first, then adds 80 = 130 (impossible average for 80 and 100!).' },
          { line: 'correct_avg = (score1 + score2) / 2', explanation: 'Parentheses force addition first: 180 / 2 = 90.0.' },
        ],
        expectedOutput: 'Buggy Average (Logic Error): 130.0\nFixed Average: 90.0',
        commonMistakes: [
          'Assuming that "no error message" means the program is 100% correct—always test with known numbers to catch Logic Errors!',
        ],
        quickQuestion: {
          question: 'A program runs without any error message, but prints the perimeter of a rectangle when asked for the area. What kind of error is this?',
          options: ['Syntax Error', 'Runtime Error', 'Logic Error', 'Hardware Error'],
          correctIndex: 2,
          explanation: 'When a program runs without crashing but produces the wrong result due to a flawed formula, it is a Logic Error.',
        },
      },
      {
        id: 'c16-t2',
        title: '2. Crash-Proof Programs with try and except',
        simpleExplanation:
          'Place risky code (like int(input()) or a / b) inside a try: block. If a Runtime Error occurs inside try:, Python does NOT crash—instead, it jumps smoothly into the except: block and prints your friendly recovery message!',
        whyProgrammersUseIt:
          'Real users make typos all the time. try and except keep apps and games running smoothly when unexpected input arrives.',
        realWorldAnalogy:
          'A circus trapeze safety net: the acrobat performs in the try: zone, and if they slip, the except: net catches them safely.',
        pythonSyntax: 'try:\n    age = int(input())\n    print("Next year:", age + 1)\nexcept ValueError:\n    print("Please enter digits only!")',
        workingCodeExample: `raw_coins = input()
raw_players = input()

try:
    coins = int(raw_coins)
    players = int(raw_players)
    share = coins // players
    print(f"Each player gets {share} coins!")
except ValueError:
    print("Error: Please enter whole numbers only!")
except ZeroDivisionError:
    print("Error: Cannot split coins among 0 players!")`,
        sampleInput: '100\n0',
        lineByLineExplanation: [
          { line: 'try:', explanation: 'Starts the protected block.' },
          { line: 'share = coins // players', explanation: 'When players is 0, 100 // 0 raises ZeroDivisionError.' },
          { line: 'except ZeroDivisionError:', explanation: 'Catches the division by zero and prints a helpful message instead of crashing!' },
        ],
        expectedOutput: 'Error: Cannot split coins among 0 players!',
        commonMistakes: [
          'Putting the entire 100-line program inside one giant try: block—only wrap the specific lines that might raise an error.',
        ],
        quickQuestion: {
          question: 'Which exception type is raised when int("hello") executes?',
          options: ['ZeroDivisionError', 'ValueError', 'IndexError', 'KeyError'],
          correctIndex: 1,
          explanation: 'int("hello") raises a ValueError because "hello" cannot be converted into a base-10 integer.',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: Crash-Proof Shield Energy Converter',
      description: 'Test valid numbers, zero, or text words in the Input Panel to see try / except catch every error!',
      starterCode: `# Crash-Proof Shield Energy Converter
raw_energy = input()
raw_pods = input()

try:
    energy = int(raw_energy)
    pods = int(raw_pods)
    per_pod = energy // pods
    print(f"Success: {per_pod} energy units per pod.")
except ValueError:
    print("Shield Alert: Input was not a valid whole number!")
except ZeroDivisionError:
    print("Shield Alert: Pod count cannot be zero!")`,
      sampleInput: '120\nfour',
      stepExplanations: [
        { line: 6, text: 'energy = int("120") succeeds (120).' },
        { line: 7, text: 'pods = int("four") raises ValueError!' },
        { line: 10, text: 'Jumps directly to except ValueError: and prints the friendly alert.' },
      ],
      fullExplanation: 'Try changing the second line of input from "four" to "0" or "4" and run the code to test all three paths!',
    },
    predictChallenges: [
      {
        id: 'c16-p1',
        title: 'Trace 1: Catching ValueError',
        code: `try:
    n = int("75a")
    print("Converted:", n)
except ValueError:
    print("Bad Number")
print("Done")`,
        expectedOutput: 'Bad Number\nDone',
        explanation: 'int("75a") fails with ValueError, jumping to except ValueError ("Bad Number"), and then continues to "Done".',
        difficulty: 'Starter',
      },
      {
        id: 'c16-p2',
        title: 'Trace 2: No Error Path',
        code: `try:
    ans = 20 // 4
    print("Result:", ans)
except ZeroDivisionError:
    print("Zero Error")`,
        expectedOutput: 'Result: 5',
        explanation: '20 // 4 succeeds (5), so the except block is completely skipped.',
        difficulty: 'Intermediate',
      },
      {
        id: 'c16-p3',
        title: 'Trace 3: Edge-Case Boundary Bug',
        code: `def is_teen(age):
    return age > 13 and age < 19

print(is_teen(13))
print(is_teen(15))`,
        expectedOutput: 'False\nTrue',
        explanation: 'Because the programmer used > 13 instead of >= 13, the edge case age=13 returns False!',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-16',
      lessonId: 16,
      title: 'The Bug Hunter Challenge',
      objective: 'Diagnose and repair a broken Academy Score Splitter that has a Syntax Error, a Logic Error, and needs a try/except shield against invalid input.',
      materialsOrCodeRequired: 'Python IDE with test inputs.',
      starterCode: `# CLASS 16 ACTIVITY: THE BUG HUNTER CHALLENGE
raw_total = input()
raw_matches = input()

try:
    total = int(raw_total)
    matches = int(raw_matches)
    avg = total // matches
    print(f"Average per match: {avg}")
except ValueError:
    print("Invalid number entered!")
except ZeroDivisionError:
    print("Matches cannot be zero!")`,
      sampleInput: '240\n6',
      teacherSolution: `raw_total = input()
raw_matches = input()

try:
    total = int(raw_total)
    matches = int(raw_matches)
    avg = total // matches
    print(f"Average per match: {avg}")
except ValueError:
    print("Invalid number entered!")
except ZeroDivisionError:
    print("Matches cannot be zero!")`,
      teacherInstructions: [
        'Test 3 input sets with Hasthaksh: 1) Normal: 240 and 6, 2) Zero edge case: 240 and 0, 3) Text edge case: "two hundred" and 6.',
      ],
      studentInstructions: [
        'Verify the try / except blocks handle both ValueError and ZeroDivisionError.',
        'Test all three cases in the Input Panel.',
      ],
      timeLimitMinutes: 12,
      expectedOutcome: 'Average per match: 40',
      reflectionQuestion: 'What is an "edge case", and why do good programmers test inputs like 0, negative numbers, and empty strings?',
    },
    debuggingMission: {
      id: 'dbg-16',
      title: 'Triple-Threat Bug Repair',
      storyContext: 'This fuel efficiency calculator has a missing colon (Syntax Error) and uses subtraction instead of division (Logic Error)!',
      brokenCode: `# Fix the Syntax Error and the Logic Error!
km = int(input())
litres = int(input())

if litres > 0
    efficiency = km - litres
    print("km per litre:", efficiency)`,
      sampleInput: '120\n8',
      expectedOutput: 'km per litre: 15.0',
      bugType: 'Syntax Error',
      hints: [
        'Line 5: What punctuation mark is missing at the end of if litres > 0?',
        'Line 6: How do you calculate km per litre? Divide km / litres instead of subtracting!',
        'Add the colon on line 5 and change km - litres to km / litres.',
      ],
      teacherFixedCode: `km = int(input())
litres = int(input())

if litres > 0:
    efficiency = km / litres
    print("km per litre:", efficiency)`,
      explanationOfFix: 'Added the missing colon after if litres > 0: and fixed the formula to km / litres.',
    },
    exitQuiz: [
      {
        id: 'c16-q1',
        type: 'mcq',
        prompt: 'Which type of error occurs when you forget a closing parenthesis or colon?',
        options: ['Logic Error', 'Syntax Error', 'ZeroDivisionError', 'Network Error'],
        correctAnswer: 'Syntax Error',
        points: 10,
        conceptTag: 'Error Types',
        explanation: 'Broken code grammar is a Syntax Error.',
      },
      {
        id: 'c16-q2',
        type: 'mcq',
        prompt: 'Which pair of keywords is used in Python to catch and handle runtime exceptions without crashing?',
        options: ['if / else', 'try / except', 'check / catch', 'for / while'],
        correctAnswer: 'try / except',
        points: 15,
        conceptTag: 'try and except',
        explanation: 'Python uses try: and except: blocks for exception handling.',
      },
      {
        id: 'c16-q3',
        type: 'predict',
        prompt: 'What is printed by this code?',
        codeSnippet: `try:\n    x = 10 // 0\n    print("A")\nexcept ZeroDivisionError:\n    print("B")`,
        correctAnswer: 'B',
        points: 15,
        conceptTag: 'ZeroDivisionError',
        explanation: '10 // 0 raises ZeroDivisionError, skipping print("A") and jumping to print("B").',
      },
      {
        id: 'c16-q4',
        type: 'identify_error',
        prompt: 'A function to calculate rectangle area returns width + height instead of width * height. What category of error is this?',
        correctAnswer: 'Logic Error',
        acceptableKeywords: ['logic'],
        points: 15,
        conceptTag: 'Logic Errors',
        explanation: 'Using the wrong mathematical operator while running without crashing is a Logic Error.',
      },
      {
        id: 'c16-q5',
        type: 'fill_code',
        prompt: 'Complete the handler to catch invalid integer conversions: ______ ValueError:',
        codeSnippet: `______ ValueError:`,
        correctAnswer: 'except',
        points: 15,
        conceptTag: 'except Syntax',
        explanation: 'except ValueError: catches failed conversions like int("abc").',
      },
      {
        id: 'c16-q6',
        type: 'short_explanation',
        prompt: 'Why should you test a grading program with boundary numbers like 0, 50, and 100?',
        correctAnswer: 'To check edge cases and make sure < vs <= conditions do not have off-by-one bugs',
        acceptableKeywords: ['edge', 'boundary', 'off-by-one', '<=', 'limit', 'corner'],
        points: 20,
        conceptTag: 'Edge Cases',
        explanation: 'Boundary / edge-case testing catches off-by-one errors in comparison operators.',
      },
    ],
    standards: {
      lessonId: 16,
      englandKS2: [
        'Use logical reasoning to detect and correct errors in algorithms and programs',
        'Design resilient programs that handle unexpected inputs gracefully',
      ],
      cstaDomain: 'Programming',
      cstaOutcomeCode: 'CSTA-5-PRO-07',
      cstaOutcomeDescription: 'Systematically test and debug programs for syntax, runtime, and logic errors using edge cases and exception handling.',
      cstaPractice: 'Testing and Refinement',
      relatedActivity: 'The Bug Hunter Challenge',
      assessmentEvidence: 'Class 16 Exit Quiz & Debugging Academy Drills',
      masteryIndicator: 'Diagnoses all 3 error types and writes try/except handlers.',
      coverageStatus: 'Covered in Depth',
      responsibleComputingNote: 'Helpful, polite error messages guide users on how to fix their input without blaming or confusing them.',
    },
  },
  {
    id: 17,
    phase: 'PHASE 5: THREE MAJOR PROJECTS',
    title: 'PROJECT 1 - QUIZ MASTER',
    subtitle: 'Build an Interactive Multi-Question Quiz Application with Dictionaries, Loops & Functions',
    comicChapterTitle: 'CHAPTER 17: THE GRAND TRIVIA ARENA',
    illustrationTheme: 'quiz_project',
    storyIntro:
      'Welcome to Phase 5: The Capstone Project Labs! In Project 1, Hasthaksh combines variables, lists of dictionaries, loops, conditions, and functions to build QUIZ MASTER—a complete interactive trivia engine with score tracking and rank evaluation!',
    realWorldScenario:
      'Interactive quiz apps like Kahoot and Duolingo store each question as a dictionary inside a list, loop through the bank, validate user input, and compute final percentages.',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'Look at how clean the architecture is: a list of question dictionaries, an ask_question() function that returns True/False, and a run_quiz() controller!',
      },
      {
        speaker: 'Hasthaksh',
        role: 'Lead Game Developer',
        line: 'Let’s wire up all 8 TODO milestones and launch Quiz Master!',
      },
    ],
    learningObjectives: [
      'Structure a question bank as a list of dictionaries containing "question", "options", and "answer" keys.',
      'Implement ask_question(question_data) to display prompts, capture user input, and return a boolean result.',
      'Implement run_quiz() to iterate through all questions, update the global score, and display final feedback.',
      'Extend the quiz with custom questions, percentage scores, and replay options.',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Capstone Project',
    topics: [
      'Lists of dictionaries data structure',
      'ask_question() helper function',
      'Case-insensitive input comparison (.strip().upper())',
      'Score accumulation & percentage calculation',
    ],
    theoryBlocks: [
      {
        id: 'c17-t1',
        title: '1. Architecting the Question Bank (List of Dictionaries)',
        simpleExplanation:
          'Each question needs three pieces of data: the question text ("question"), a list of 4 choices ("options"), and the correct letter ("answer"). Storing each question as a dictionary inside a master questions list keeps everything organised!',
        whyProgrammersUseIt:
          'Adding 50 more questions requires zero changes to your quiz engine code—you simply add more dictionaries to the list!',
        realWorldAnalogy:
          'A deck of trivia flashcards where every card has the same 3 printed sections: Question, 4 Options, and Correct Letter.',
        pythonSyntax: 'q = {"question": "2 + 2?", "options": ["A. 3", "B. 4"], "answer": "B"}',
        workingCodeExample: `question_data = {
    "question": "Which planet is known as the Red Planet?",
    "options": ["A. Earth", "B. Mars", "C. Venus", "D. Jupiter"],
    "answer": "B"
}

print(question_data["question"])
for opt in question_data["options"]:
    print(opt)
print("Correct Key:", question_data["answer"])`,
        lineByLineExplanation: [
          { line: 'print(question_data["question"])', explanation: 'Prints the question prompt string.' },
          { line: 'for opt in question_data["options"]:', explanation: 'Loops through the 4 option strings and prints each on its own line.' },
        ],
        expectedOutput: 'Which planet is known as the Red Planet?\nA. Earth\nB. Mars\nC. Venus\nD. Jupiter\nCorrect Key: B',
        commonMistakes: [
          'Printing question_data["options"] directly as a raw bracketed list instead of looping over each option cleanly.',
        ],
        quickQuestion: {
          question: 'If q is a question dictionary, how do you access its list of answer choices?',
          options: ['q.options', 'q["options"]', 'q[0]', 'options["q"]'],
          correctIndex: 1,
          explanation: 'q["options"] retrieves the list stored under the "options" key.',
        },
      },
      {
        id: 'c17-t2',
        title: '2. Connecting ask_question() and run_quiz()',
        simpleExplanation:
          'ask_question(question_data) handles ONE question and returns True if the user’s cleaned answer (.strip().upper()) equals question_data["answer"]. Then run_quiz() loops over all questions and adds 1 to score whenever ask_question() returns True!',
        whyProgrammersUseIt:
          'Separating single-question logic from the full-game loop makes testing and adding features (like hints or lifelines) super clean.',
        realWorldAnalogy:
          'A referee judging each round (ask_question) and reporting the point to the scoreboard keeper (run_quiz).',
        pythonSyntax: 'if ask_question(q):\n    score += 1',
        workingCodeExample: `def check_answer(user_ans, correct_ans):
    cleaned = user_ans.strip().upper()
    if cleaned == correct_ans:
        print("Correct!")
        return True
    else:
        print(f"Incorrect! The answer was {correct_ans}.")
        return False

res1 = check_answer(" b ", "B")
res2 = check_answer("a", "B")
print("Results:", res1, res2)`,
        lineByLineExplanation: [
          { line: 'cleaned = user_ans.strip().upper()', explanation: 'Ensures lowercase "b" or spaces " b " still match "B"!' },
          { line: 'return True', explanation: 'Sends True back so run_quiz() knows to increment score.' },
        ],
        expectedOutput: 'Correct!\nIncorrect! The answer was B.\nResults: True False',
        commonMistakes: [
          'Not using .upper() on user input—so a student who types "b" instead of "B" gets marked wrong unfairly!',
        ],
        quickQuestion: {
          question: 'Why should we apply .strip().upper() to the user’s quiz input?',
          options: [
            'So lowercase answers like "b" and accidental spaces like " B " are accepted as "B"',
            'To make the question harder',
            'Because Python only prints uppercase letters',
            'To sort the options',
          ],
          correctIndex: 0,
          explanation: '.strip().upper() normalises user input so lowercase letters and stray spaces don’t cause false negatives.',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: Complete Working Quiz Master Engine',
      description: 'Run a 5-question Quiz Master session with input answers B, C, A, D, B!',
      starterCode: `# PROJECT 1 LIVE DEMO: QUIZ MASTER
questions = [
    {
        "question": "Which planet is known as the Red Planet?",
        "options": ["A. Earth", "B. Mars", "C. Venus", "D. Jupiter"],
        "answer": "B"
    },
    {
        "question": "Which language are we learning?",
        "options": ["A. HTML", "B. CSS", "C. Python", "D. SQL"],
        "answer": "C"
    },
    {
        "question": "What does len('QUEST') return?",
        "options": ["A. 5", "B. 4", "C. 6", "D. 0"],
        "answer": "A"
    },
    {
        "question": "Which keyword defines a function in Python?",
        "options": ["A. fun", "B. func", "C. define", "D. def"],
        "answer": "D"
    },
    {
        "question": "What is 2 ** 4 in Python?",
        "options": ["A. 8", "B. 16", "C. 6", "D. 24"],
        "answer": "B"
    }
]

score = 0

def ask_question(question_data):
    print(question_data["question"])
    for opt in question_data["options"]:
        print(opt)
    user_ans = input().strip().upper()
    if user_ans == question_data["answer"]:
        print("Correct!")
        return True
    else:
        print(f"Incorrect! Answer was {question_data['answer']}")
        return False

def run_quiz():
    global score
    score = 0
    for q in questions:
        if ask_question(q):
            score += 1
    pct = (score * 100) // len(questions)
    print(f"Final Score: {score}/{len(questions)} ({pct}%)")

run_quiz()`,
      sampleInput: 'B\nC\nA\nD\nB',
      stepExplanations: [
        { line: 31, text: 'ask_question prints the prompt and options, reads input, and returns True/False.' },
        { line: 44, text: 'run_quiz loops through all 5 questions, updates score, and prints the final percentage.' },
      ],
      fullExplanation: 'You can open the Three Major Projects tab anytime to build Quiz Master step-by-step from its starter boilerplate!',
    },
    predictChallenges: [
      {
        id: 'c17-p1',
        title: 'Trace 1: Option Printer',
        code: `q = {"options": ["A. 10", "B. 20"]}
for opt in q["options"]:
    print(opt)`,
        expectedOutput: 'A. 10\nB. 20',
        explanation: 'Loops over the two strings in q["options"] and prints each one.',
        difficulty: 'Starter',
      },
      {
        id: 'c17-p2',
        title: 'Trace 2: Percentage Calculator',
        code: `score = 4
total = 5
pct = (score * 100) // total
print(f"{score}/{total} ({pct}%)")`,
        expectedOutput: '4/5 (80%)',
        explanation: '4 * 100 = 400, and 400 // 5 = 80%.',
        difficulty: 'Intermediate',
      },
      {
        id: 'c17-p3',
        title: 'Trace 3: Boolean Score Loop',
        code: `results = [True, False, True, True]
pts = 0
for r in results:
    if r:
        pts += 10
print(pts)`,
        expectedOutput: '30',
        explanation: 'Three True values each add 10 points, giving 30.',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-17',
      lessonId: 17,
      title: 'Quiz Master Question Designer',
      objective: 'Complete a 3-question mini Quiz Master engine and test it with player answers.',
      materialsOrCodeRequired: 'Python IDE or Three Major Projects Studio.',
      starterCode: `# CLASS 17 ACTIVITY: MINI QUIZ MASTER
questions = [
    {"question": "Capital of India?", "options": ["A. Mumbai", "B. New Delhi"], "answer": "B"},
    {"question": "5 * 6 = ?", "options": ["A. 30", "B. 11"], "answer": "A"}
]

score = 0
for q in questions:
    print(q["question"])
    ans = input().strip().upper()
    if ans == q["answer"]:
        score += 1
        print("Correct!")
    else:
        print("Wrong!")

print(f"Final Score: {score}/{len(questions)}")`,
      sampleInput: 'B\nA',
      teacherSolution: `questions = [
    {"question": "Capital of India?", "options": ["A. Mumbai", "B. New Delhi"], "answer": "B"},
    {"question": "5 * 6 = ?", "options": ["A. 30", "B. 11"], "answer": "A"}
]

score = 0
for q in questions:
    print(q["question"])
    ans = input().strip().upper()
    if ans == q["answer"]:
        score += 1
        print("Correct!")
    else:
        print("Wrong!")

print(f"Final Score: {score}/{len(questions)}")`,
      teacherInstructions: [
        'Guide Hasthaksh to the "Three Major Projects" section to build the full 5-question Quiz Master with all stretch goals!',
      ],
      studentInstructions: [
        'Run the mini quiz and then open the Three Major Projects tab to build your full Quiz Master.',
      ],
      timeLimitMinutes: 15,
      expectedOutcome: 'Capital of India?\nCorrect!\n5 * 6 = ?\nCorrect!\nFinal Score: 2/2',
      reflectionQuestion: 'How would you add a "category" or "difficulty" field to each question dictionary?',
    },
    debuggingMission: {
      id: 'dbg-17',
      title: 'The Unfair Case-Sensitive Quiz Bug',
      storyContext: 'A player typed lowercase "b" for Mars, and the quiz marked it wrong because it didn’t convert the input to uppercase!',
      brokenCode: `# Fix the input normalisation so lowercase "b" is marked Correct!
correct = "B"
user = input()

if user == correct:
    print("Correct!")
else:
    print("Wrong!")`,
      sampleInput: 'b',
      expectedOutput: 'Correct!',
      bugType: 'Logic Error',
      hints: [
        'What is the difference between "b" and "B"?',
        'Use .strip().upper() on input() so lowercase answers match uppercase answer keys!',
        'Change line 3 to user = input().strip().upper()',
      ],
      teacherFixedCode: `correct = "B"
user = input().strip().upper()

if user == correct:
    print("Correct!")
else:
    print("Wrong!")`,
      explanationOfFix: 'Calling .strip().upper() converts "b" to "B", matching the stored answer key.',
    },
    exitQuiz: [
      {
        id: 'c17-q1',
        type: 'mcq',
        prompt: 'In Quiz Master, what data structure represents the entire list of questions?',
        options: ['A list of dictionaries', 'A single integer', 'A boolean', 'A float'],
        correctAnswer: 'A list of dictionaries',
        points: 10,
        conceptTag: 'Data Structures',
        explanation: 'Each question is a dictionary, and all questions are stored in a list.',
      },
      {
        id: 'c17-q2',
        type: 'predict',
        prompt: 'What does "  c ".strip().upper() return?',
        codeSnippet: `ans = "  c ".strip().upper()\nprint(ans)`,
        correctAnswer: 'C',
        points: 15,
        conceptTag: 'Input Cleaning',
        explanation: '.strip() removes spaces and .upper() converts "c" to "C".',
      },
      {
        id: 'c17-q3',
        type: 'fill_code',
        prompt: 'Inside run_quiz(), which keyword lets the function modify the top-level score variable?',
        codeSnippet: `def run_quiz():\n    ______ score`,
        correctAnswer: 'global',
        points: 15,
        conceptTag: 'Global Score',
        explanation: 'global score allows run_quiz() to update the global score variable.',
      },
      {
        id: 'c17-q4',
        type: 'predict',
        prompt: 'If score = 3 and len(questions) = 5, what does (score * 100) // len(questions) evaluate to?',
        codeSnippet: `print((3 * 100) // 5)`,
        correctAnswer: '60',
        points: 15,
        conceptTag: 'Score Percentage',
        explanation: '300 // 5 = 60.',
      },
      {
        id: 'c17-q5',
        type: 'identify_error',
        prompt: 'Why does ask_question() need to return True or False to run_quiz()?',
        correctAnswer: 'So run_quiz knows whether to add 1 to the player score',
        acceptableKeywords: ['score', 'add', 'increment', 'correct', 'know'],
        points: 15,
        conceptTag: 'Modular Design',
        explanation: 'Returning True/False lets run_quiz() update the score when the answer is correct.',
      },
      {
        id: 'c17-q6',
        type: 'coding',
        prompt: 'Write a for loop header (with colon) that loops variable q through a list named questions.',
        correctAnswer: 'for q in questions:',
        acceptableKeywords: ['for', 'q', 'in', 'questions:'],
        points: 20,
        conceptTag: 'Quiz Loop',
        explanation: 'for q in questions: visits each question dictionary in order.',
      },
    ],
    standards: {
      lessonId: 17,
      englandKS2: [
        'Design, write and debug modular programs that accomplish specific goals',
        'Combine variables, lists, dictionaries, loops, conditions, and functions in a complete application',
      ],
      cstaDomain: 'Programming',
      cstaOutcomeCode: 'CSTA-5-PRO-08',
      cstaOutcomeDescription: 'Develop an interactive quiz application integrating structured data, functions, and user input validation.',
      cstaPractice: 'Human-Centred Design & Testing and Refinement',
      relatedActivity: 'Project 1: Quiz Master',
      assessmentEvidence: 'Completed Quiz Master Project & Class 17 Quiz',
      masteryIndicator: 'Completes all 8 TODO milestones in Quiz Master and passes acceptance tests.',
      coverageStatus: 'Extended Application',
      responsibleComputingNote: 'Good educational software gives encouraging, clear feedback on wrong answers so learners understand why an answer was right.',
    },
  },
  {
    id: 18,
    phase: 'PHASE 5: THREE MAJOR PROJECTS',
    title: 'PROJECT 2 - TREASURE MAZE',
    subtitle: 'Build a 2D Grid Adventure Game with Nested Lists, Coordinates & Wall Collision',
    comicChapterTitle: 'CHAPTER 18: LABYRINTH OF THE ANCIENTS',
    illustrationTheme: 'maze_project',
    storyIntro:
      'In Project 2, Hasthaksh builds TREASURE MAZE—a 2D grid adventure where the player navigates rows and columns using W, A, S, D commands, detects "#" walls before moving, tracks step counts, and discovers the hidden "T" treasure!',
    realWorldScenario:
      'Every 2D tile game—from Pac-Man and Pokémon to dungeon crawlers—represents the map as a 2D nested list (maze[row][col]) and checks whether the target tile is a wall before updating player coordinates!',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'Golden rule of collision detection: calculate next_row and next_col FIRST, check if maze[next_row][next_col] == "#", and only move if it’s not a wall!',
      },
      {
        speaker: 'Hasthaksh',
        role: 'Dungeon Architect',
        line: 'W goes up (row - 1), S goes down (row + 1), A goes left (col - 1), D goes right (col + 1)!',
      },
    ],
    learningObjectives: [
      'Represent a 2D game map as a nested list of rows and columns (maze[r][c]).',
      'Render the maze grid with the player "P" shown at (player_row, player_col).',
      'Translate W, A, S, D commands into coordinate deltas and prevent movement into "#" walls.',
      'Track total moves and end the game loop when the player reaches the "T" treasure.',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Capstone Project',
    topics: [
      '2D nested lists maze[row][col]',
      'Coordinate navigation (W/A/S/D)',
      'Look-ahead wall collision detection',
      'Game loop & winning condition',
    ],
    theoryBlocks: [
      {
        id: 'c18-t1',
        title: '1. 2D Nested Lists & Coordinate Math (W, A, S, D)',
        simpleExplanation:
          'In a 2D grid maze[row][col], row 0 is the top row and col 0 is the leftmost column. Moving UP ("W") decreases row by 1 (row - 1). Moving DOWN ("S") increases row by 1 (row + 1). Moving LEFT ("A") is col - 1, and Moving RIGHT ("D") is col + 1!',
        whyProgrammersUseIt:
          '2D coordinate indexing lets you check any tile on the map in a single expression: maze[r][c].',
        realWorldAnalogy:
          'A chessboard or spreadsheet where row numbers go down the left side and column numbers go across the top.',
        pythonSyntax: 'tile = maze[player_row][player_col]\n# W: next_r = player_row - 1\n# S: next_r = player_row + 1\n# A: next_c = player_col - 1\n# D: next_c = player_col + 1',
        workingCodeExample: `maze = [
    ["#", "#", "#", "#"],
    ["#", "S", ".", "#"],
    ["#", ".", "T", "#"],
    ["#", "#", "#", "#"]
]

print("Start tile at (1, 1):", maze[1][1])
print("Treasure tile at (2, 2):", maze[2][2])
print("Top wall at (0, 1):", maze[0][1])`,
        lineByLineExplanation: [
          { line: 'maze[1][1]', explanation: 'Accesses Row 1, Column 1 ("S" for Start).' },
          { line: 'maze[2][2]', explanation: 'Accesses Row 2, Column 2 ("T" for Treasure).' },
        ],
        expectedOutput: 'Start tile at (1, 1): S\nTreasure tile at (2, 2): T\nTop wall at (0, 1): #',
        commonMistakes: [
          'Mixing up maze[row][col] as maze[x][y]—remember the first bracket is always the vertical ROW (top-to-bottom), and the second bracket is the horizontal COLUMN (left-to-right)!',
        ],
        quickQuestion: {
          question: 'In a 2D grid where row 0 is at the top, how does player_row change when the player moves UP ("W")?',
          options: ['player_row increases by 1', 'player_row decreases by 1', 'player_col decreases by 1', 'Nothing changes'],
          correctIndex: 1,
          explanation: 'Since row 0 is at the top, moving UP moves toward row 0, which decreases player_row by 1.',
        },
      },
      {
        id: 'c18-t2',
        title: '2. Look-Ahead Wall Collision Detection',
        simpleExplanation:
          'Never move the player blindly into a wall! Instead, store the proposed destination in next_row and next_col. Check if maze[next_row][next_col] == "#": if it is a wall, print "Blocked by a wall!" and keep the player where they are; otherwise, update player_row and player_col!',
        whyProgrammersUseIt:
          'Look-ahead collision prevents players from walking through walls or falling off the edge of the map.',
        realWorldAnalogy:
          'Looking in front of you before taking a step so you don’t bump into a closed door.',
        pythonSyntax: 'if maze[next_r][next_c] == "#":\n    print("Wall!")\nelse:\n    player_row = next_r\n    player_col = next_c',
        workingCodeExample: `maze = [
    ["#", "#", "#"],
    ["#", "S", "."],
    ["#", "#", "#"]
]
r, c = 1, 1

# Try moving UP ("W") into (0, 1) and then RIGHT ("D") into (1, 2)
for cmd in ["W", "D"]:
    nr, nc = r, c
    if cmd == "W":
        nr -= 1
    elif cmd == "D":
        nc += 1
    if maze[nr][nc] == "#":
        print(f"Move {cmd}: Blocked by wall at ({nr},{nc})!")
    else:
        r, c = nr, nc
        print(f"Move {cmd}: Moved to ({r},{c})")`,
        lineByLineExplanation: [
          { line: 'nr, nc = r, c', explanation: 'Starts look-ahead coordinates at current position (1, 1).' },
          { line: 'if maze[nr][nc] == "#":', explanation: 'Checks if the target tile is a "#" wall before updating r, c.' },
        ],
        expectedOutput: 'Move W: Blocked by wall at (0,1)!\nMove D: Moved to (1,2)',
        commonMistakes: [
          'Updating player_row and player_col BEFORE checking if the new spot is a "#" wall.',
        ],
        quickQuestion: {
          question: 'Why do we calculate next_row and next_col before changing player_row and player_col?',
          options: [
            'So we can check if the target tile is a "#" wall before actually moving the player',
            'Because Python variables cannot be changed directly',
            'To make the maze bigger',
            'To delete the walls',
          ],
          correctIndex: 0,
          explanation: 'Checking maze[next_row][next_col] first keeps the player in their valid spot if they hit a wall.',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: Complete Treasure Maze Walkthrough',
      description: 'Watch the player navigate from (1, 1) around the inner walls to find the Treasure at (1, 5)!',
      starterCode: `# PROJECT 2 LIVE DEMO: TREASURE MAZE
maze = [
    ["#", "#", "#", "#", "#", "#", "#"],
    ["#", "S", ".", ".", "#", "T", "#"],
    ["#", ".", "#", ".", ".", ".", "#"],
    ["#", ".", ".", ".", "#", ".", "#"],
    ["#", "#", "#", "#", "#", "#", "#"]
]

player_row = 1
player_col = 1
moves = 0

def show_maze():
    for r in range(len(maze)):
        line = ""
        for c in range(len(maze[r])):
            if r == player_row and c == player_col:
                line += "P "
            else:
                line += maze[r][c] + " "
        print(line.strip())

def move_player(command):
    global player_row, player_col, moves
    cmd = command.strip().upper()
    nr, nc = player_row, player_col
    if cmd == "W":
        nr -= 1
    elif cmd == "S":
        nr += 1
    elif cmd == "A":
        nc -= 1
    elif cmd == "D":
        nc += 1
    else:
        print("Invalid command! Use W, A, S, or D.")
        return

    if maze[nr][nc] == "#":
        print("Blocked by a wall!")
    else:
        player_row, player_col = nr, nc
        moves += 1

commands = ["D", "D", "S", "D", "D", "W"]
for m in commands:
    move_player(m)
    if maze[player_row][player_col] == "T":
        show_maze()
        print(f"TREASURE FOUND in {moves} moves!")
        break`,
      sampleInput: '',
      stepExplanations: [
        { line: 14, text: 'show_maze() prints "P" at the player’s current (row, col) and the maze symbol everywhere else.' },
        { line: 24, text: 'move_player() validates W/A/S/D and checks for "#" walls.' },
        { line: 47, text: 'Following ["D", "D", "S", "D", "D", "W"] reaches (1, 5) where "T" is located in 6 moves!' },
      ],
      fullExplanation: 'Open the Three Major Projects tab to build and customise Treasure Maze with your own commands!',
    },
    predictChallenges: [
      {
        id: 'c18-p1',
        title: 'Trace 1: 2D Grid Lookup',
        code: `grid = [
    ["A", "B", "C"],
    ["D", "E", "F"]
]
print(grid[1][0], grid[0][2])`,
        expectedOutput: 'D C',
        explanation: 'Row 1, Col 0 is "D". Row 0, Col 2 is "C".',
        difficulty: 'Starter',
      },
      {
        id: 'c18-p2',
        title: 'Trace 2: Coordinate Command Sequence',
        code: `r, c = 2, 2
for cmd in ["W", "D", "D", "S"]:
    if cmd == "W": r -= 1
    elif cmd == "S": r += 1
    elif cmd == "A": c -= 1
    elif cmd == "D": c += 1
print(r, c)`,
        expectedOutput: '2 4',
        explanation: 'W -> (1,2), D -> (1,3), D -> (1,4), S -> (2,4).',
        difficulty: 'Intermediate',
      },
      {
        id: 'c18-p3',
        title: 'Trace 3: Wall Bounce Count',
        code: `row = ["#","#",".","T","#"]
pos = 2
for step in [-1, 1]:
    if row[pos + step] == "#":
        print("Wall")
    else:
        pos += step
        print("Moved to", row[pos])`,
        expectedOutput: 'Wall\nMoved to T',
        explanation: 'From index 2 ("."), step -1 checks index 1 ("#" -> Wall). Next step +1 checks index 3 ("T" -> Moved to T).',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-18',
      lessonId: 18,
      title: 'Maze Navigator Challenge',
      objective: 'Test a 1-move look-ahead collision checker in a mini maze and report whether the move succeeds or hits a wall.',
      materialsOrCodeRequired: 'Python IDE or Three Major Projects Studio.',
      starterCode: `# CLASS 18 ACTIVITY: MAZE NAVIGATOR
maze = [
    ["#", "#", "#", "#"],
    ["#", "S", ".", "#"],
    ["#", ".", "T", "#"],
    ["#", "#", "#", "#"]
]
r, c = 1, 1
cmd = input().strip().upper()

nr, nc = r, c
if cmd == "W": nr -= 1
elif cmd == "S": nr += 1
elif cmd == "A": nc -= 1
elif cmd == "D": nc += 1

if maze[nr][nc] == "#":
    print("Blocked by wall!")
else:
    r, c = nr, nc
    print(f"Moved to ({r}, {c}) -> Tile: {maze[r][c]}")`,
      sampleInput: 'D',
      teacherSolution: `maze = [
    ["#", "#", "#", "#"],
    ["#", "S", ".", "#"],
    ["#", ".", "T", "#"],
    ["#", "#", "#", "#"]
]
r, c = 1, 1
cmd = input().strip().upper()

nr, nc = r, c
if cmd == "W": nr -= 1
elif cmd == "S": nr += 1
elif cmd == "A": nc -= 1
elif cmd == "D": nc += 1

if maze[nr][nc] == "#":
    print("Blocked by wall!")
else:
    r, c = nr, nc
    print(f"Moved to ({r}, {c}) -> Tile: {maze[r][c]}")`,
      teacherInstructions: [
        'Test "W" (Blocked by wall!) and "D" (Moved to (1, 2) -> Tile: .) with Hasthaksh.',
      ],
      studentInstructions: [
        'Test different movement commands ("W", "A", "S", "D") from starting position (1, 1).',
      ],
      timeLimitMinutes: 15,
      expectedOutcome: 'Moved to (1, 2) -> Tile: .',
      reflectionQuestion: 'How would you add a trap tile "X" to the maze that costs the player 2 extra moves if stepped on?',
    },
    debuggingMission: {
      id: 'dbg-18',
      title: 'The Swapped Row/Column Bug',
      storyContext: 'Explorer Sam swapped W and D so pressing "D" (Right) moves the player down a row instead of across a column!',
      brokenCode: `# Fix the coordinate update for command "D" (Right)!
r, c = 1, 1
cmd = "D"

if cmd == "D":
    r += 1

print(f"Row: {r}, Col: {c}")`,
      sampleInput: '',
      expectedOutput: 'Row: 1, Col: 2',
      bugType: 'Logic Error',
      hints: [
        'Does moving RIGHT ("D") change the vertical row r or the horizontal column c?',
        'Moving right increases the column c by 1!',
        'Change r += 1 to c += 1.',
      ],
      teacherFixedCode: `r, c = 1, 1
cmd = "D"

if cmd == "D":
    c += 1

print(f"Row: {r}, Col: {c}")`,
      explanationOfFix: 'Moving right ("D") increments column c by 1 while keeping row r unchanged.',
    },
    exitQuiz: [
      {
        id: 'c18-q1',
        type: 'mcq',
        prompt: 'In maze[r][c], what do r and c stand for?',
        options: ['r = row index, c = column index', 'r = random, c = choice', 'r = right, c = centre', 'r = return, c = continue'],
        correctAnswer: 'r = row index, c = column index',
        points: 10,
        conceptTag: '2D Coordinates',
        explanation: 'The first index selects the row list, and the second index selects the column within that row.',
      },
      {
        id: 'c18-q2',
        type: 'mcq',
        prompt: 'Which coordinate changes when moving DOWN ("S") in a 2D grid?',
        options: ['player_row increases by 1', 'player_row decreases by 1', 'player_col increases by 1', 'player_col decreases by 1'],
        correctAnswer: 'player_row increases by 1',
        points: 15,
        conceptTag: 'Grid Movement',
        explanation: 'Moving down advances to the next row, increasing player_row by 1.',
      },
      {
        id: 'c18-q3',
        type: 'predict',
        prompt: 'What is printed?',
        codeSnippet: `m = [[1, 2], [3, 4], [5, 6]]\nprint(len(m), len(m[0]))`,
        correctAnswer: '3 2',
        points: 15,
        conceptTag: 'Grid Dimensions',
        explanation: 'm has 3 rows, and m[0] has 2 columns.',
      },
      {
        id: 'c18-q4',
        type: 'fill_code',
        prompt: 'Complete the condition to check if the player is standing on the treasure "T":',
        codeSnippet: `if maze[player_row][player_col] ___ "T":`,
        correctAnswer: '==',
        points: 15,
        conceptTag: 'Win Condition',
        explanation: 'Use == to check if the current tile equals "T".',
      },
      {
        id: 'c18-q5',
        type: 'identify_error',
        prompt: 'What happens if a maze game updates player_row = next_row BEFORE checking if maze[next_row][next_col] == "#"?',
        correctAnswer: 'The player walks right into the wall instead of being blocked',
        acceptableKeywords: ['wall', 'into', 'walk', 'inside', 'blocked'],
        points: 15,
        conceptTag: 'Collision Order',
        explanation: 'You must check if the destination tile is a wall before updating the player coordinates.',
      },
      {
        id: 'c18-q6',
        type: 'coding',
        prompt: 'Write the line that accesses Row 2, Column 4 of a 2D list named maze.',
        correctAnswer: 'maze[2][4]',
        acceptableKeywords: ['maze[2][4]'],
        points: 20,
        conceptTag: '2D Indexing',
        explanation: 'maze[2][4] accesses row index 2, column index 4.',
      },
    ],
    standards: {
      lessonId: 18,
      englandKS2: [
        'Design, write and debug programs that simulate 2D spatial environments',
        'Use nested lists, loops, conditionals, and functions to manage game state',
      ],
      cstaDomain: 'Programming',
      cstaOutcomeCode: 'CSTA-5-PRO-09',
      cstaOutcomeDescription: 'Build a grid-based adventure game using 2D nested lists, coordinate logic, and input validation.',
      cstaPractice: 'Computational Thinking & Human-Centred Design',
      relatedActivity: 'Project 2: Treasure Maze',
      assessmentEvidence: 'Completed Treasure Maze Project & Class 18 Quiz',
      masteryIndicator: 'Implements 2D maze rendering, W/A/S/D movement, wall collision, and win detection.',
      coverageStatus: 'Extended Application',
      responsibleComputingNote: 'Clear instructions when an invalid move is entered make games accessible and friendly for players of all ages.',
    },
  },
  {
    id: 19,
    phase: 'PHASE 5: THREE MAJOR PROJECTS',
    title: 'PROJECT 3 - ROCK, PAPER, SCISSORS LEAGUE',
    subtitle: 'Build a Computer-Opponent Championship Game with Randomisation & Score Tracking',
    comicChapterTitle: 'CHAPTER 19: DUEL AGAINST THE AI ARBITER',
    illustrationTheme: 'rps_project',
    storyIntro:
      'In Project 3, Hasthaksh enters the ROCK, PAPER, SCISSORS LEAGUE! Using the random module, compound Boolean logic, functions, and loops, you will programme an AI opponent, judge every winning combination, display a live scoreboard after each round, and crown the League Champion!',
    realWorldScenario:
      'Competitive turn-based games pair player input validation with an AI choice generator, a rule-evaluation engine (find_winner), and a multi-round scoreboard loop.',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'Look at the circular rule of Rock, Paper, Scissors: Rock crushes Scissors, Scissors cuts Paper, and Paper covers Rock!',
      },
      {
        speaker: 'Hasthaksh',
        role: 'League Contender',
        line: 'If both choices are equal it’s a "tie"—otherwise we check the 3 player-winning combos!',
      },
    ],
    learningObjectives: [
      'Implement find_winner(player, computer) using compound if/elif/else conditions to return "player", "computer", or "tie".',
      'Use random.choice(["rock", "paper", "scissors"]) to generate fair computer moves.',
      'Manage global scoreboard variables across multiple rounds.',
      'Announce round-by-round scores and declare the overall League Winner.',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Capstone Project',
    topics: [
      'Circular win-condition logic',
      'find_winner(player, computer) function',
      'random.choice() computer opponent',
      'Multi-round loop & Scoreboard tracking',
    ],
    theoryBlocks: [
      {
        id: 'c19-t1',
        title: '1. Designing the Winner Logic: find_winner(player, computer)',
        simpleExplanation:
          'First, check if player == computer: if so, return "tie"! Next, check if the player has any of the 3 winning matchups: (player == "rock" and computer == "scissors") or (player == "paper" and computer == "rock") or (player == "scissors" and computer == "paper"). If so, return "player"! Otherwise, return "computer"!',
        whyProgrammersUseIt:
          'Grouping all 3 player-win conditions reduced what could have been 9 separate if statements into just 3 clean branches (tie, player wins, computer wins)!',
        realWorldAnalogy:
          'A referee’s rulebook: 1) Same sign = Tie. 2) Did Player beat Computer? = Player point. 3) Anything else = Computer point!',
        pythonSyntax: 'if player == computer:\n    return "tie"\nelif (player == "rock" and computer == "scissors") or ...:\n    return "player"\nelse:\n    return "computer"',
        workingCodeExample: `def find_winner(player, computer):
    if player == computer:
        return "tie"
    elif (
        (player == "rock" and computer == "scissors") or
        (player == "paper" and computer == "rock") or
        (player == "scissors" and computer == "paper")
    ):
        return "player"
    else:
        return "computer"

print("rock vs scissors ->", find_winner("rock", "scissors"))
print("paper vs scissors ->", find_winner("paper", "scissors"))
print("rock vs rock ->", find_winner("rock", "rock"))`,
        lineByLineExplanation: [
          { line: 'if player == computer:', explanation: 'Handles all 3 tie cases (rock-rock, paper-paper, scissors-scissors) in one check!' },
          { line: 'elif (...):', explanation: 'Checks the 3 combinations where the player wins.' },
          { line: 'else:\n        return "computer"', explanation: 'If it wasn’t a tie and the player didn’t win, the computer won!' },
        ],
        expectedOutput: 'rock vs scissors -> player\npaper vs scissors -> computer\nrock vs rock -> tie',
        commonMistakes: [
          'Forgetting to convert the player’s input to .strip().lower() before calling find_winner—so "Rock" doesn’t match "rock"!',
        ],
        quickQuestion: {
          question: 'Out of the 9 possible (player, computer) combinations in Rock, Paper, Scissors, how many are Ties, how many are Player Wins, and how many are Computer Wins?',
          options: [
            '3 Ties, 3 Player Wins, 3 Computer Wins',
            '1 Tie, 4 Player Wins, 4 Computer Wins',
            '9 Player Wins',
            '2 Ties, 5 Player Wins, 2 Computer Wins',
          ],
          correctIndex: 0,
          explanation: 'The game is perfectly symmetrical: 3 ties, 3 player-winning combos, and 3 computer-winning combos.',
        },
      },
      {
        id: 'c19-t2',
        title: '2. Multi-Round Scoreboard & Match Summary',
        simpleExplanation:
          'Inside play_game(), loop through the rounds, call result = find_winner(p, c), increment player_score or computer_score accordingly, and print the live scoreboard after each round!',
        whyProgrammersUseIt:
          'Clear round-by-round telemetry keeps players engaged and makes verifying game rules easy.',
        realWorldAnalogy:
          'A stadium scoreboard that updates after every tennis set before announcing the trophy winner at the end.',
        pythonSyntax: 'if result == "player":\n    player_score += 1\nelif result == "computer":\n    computer_score += 1',
        workingCodeExample: `player_score = 0
computer_score = 0
outcomes = ["player", "computer", "player", "tie", "player"]

for r in range(len(outcomes)):
    res = outcomes[r]
    if res == "player":
        player_score += 1
    elif res == "computer":
        computer_score += 1
    print(f"After Round {r + 1}: Player {player_score} - {computer_score} Computer")`,
        lineByLineExplanation: [
          { line: 'if res == "player":', explanation: 'Awards 1 point to player_score when find_winner returns "player".' },
          { line: 'elif res == "computer":', explanation: 'Awards 1 point to computer_score when find_winner returns "computer" (ties add 0).' },
        ],
        expectedOutput: 'After Round 1: Player 1 - 0 Computer\nAfter Round 2: Player 1 - 1 Computer\nAfter Round 3: Player 2 - 1 Computer\nAfter Round 4: Player 2 - 1 Computer\nAfter Round 5: Player 3 - 1 Computer',
        commonMistakes: [
          'Using else: computer_score += 1 instead of elif res == "computer": — which accidentally awards the computer a point on every "tie"!',
        ],
        quickQuestion: {
          question: 'Why must we use elif result == "computer": instead of else: when updating computer_score?',
          options: [
            'Because if we used else:, a "tie" would also give a point to the computer!',
            'Because else is not allowed in functions',
            'To make the computer lose',
            'Because tie is an integer',
          ],
          correctIndex: 0,
          explanation: 'There are 3 outcomes ("player", "computer", "tie"). Using else after checking "player" would wrongly award ties to the computer.',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: 5-Round Rock, Paper, Scissors League',
      description: 'Run a full 5-round championship match against the AI opponent!',
      starterCode: `# PROJECT 3 LIVE DEMO: ROCK, PAPER, SCISSORS LEAGUE
import random

choices = ["rock", "paper", "scissors"]
player_score = 0
computer_score = 0

def find_winner(player, computer):
    if player == computer:
        return "tie"
    elif (
        (player == "rock" and computer == "scissors") or
        (player == "paper" and computer == "rock") or
        (player == "scissors" and computer == "paper")
    ):
        return "player"
    else:
        return "computer"

def play_game():
    global player_score, computer_score
    player_score = 0
    computer_score = 0
    rounds = 5

    for round_number in range(1, rounds + 1):
        print("ROUND", round_number)
        p_choice = input().strip().lower()
        c_choice = random.choice(choices)
        print(f"Player: {p_choice} | Computer: {c_choice}")
        winner = find_winner(p_choice, c_choice)
        if winner == "player":
            player_score += 1
            print("Round Winner: Hasthaksh!")
        elif winner == "computer":
            computer_score += 1
            print("Round Winner: Computer!")
        else:
            print("Round Result: Tie!")
        print(f"Scoreboard -> Hasthaksh: {player_score} | Computer: {computer_score}")

    if player_score > computer_score:
        print("LEAGUE CHAMPION: HASTHAKSH!")
    elif computer_score > player_score:
        print("LEAGUE CHAMPION: COMPUTER!")
    else:
        print("LEAGUE RESULT: GRAND DRAW!")

play_game()`,
      sampleInput: 'rock\npaper\nscissors\nrock\npaper',
      stepExplanations: [
        { line: 8, text: 'find_winner() evaluates the round and returns "player", "computer", or "tie".' },
        { line: 26, text: 'play_game() runs 5 rounds, updating and printing the scoreboard after each round.' },
      ],
      fullExplanation: 'Head to the Three Major Projects tab to build and customise your Rock, Paper, Scissors League!',
    },
    predictChallenges: [
      {
        id: 'c19-p1',
        title: 'Trace 1: Matchup Judge',
        code: `p = "scissors"
c = "paper"
if p == c:
    print("tie")
elif p == "scissors" and c == "paper":
    print("player")
else:
    print("computer")`,
        expectedOutput: 'player',
        explanation: 'Scissors cuts paper, matching the elif condition and printing "player".',
        difficulty: 'Starter',
      },
      {
        id: 'c19-p2',
        title: 'Trace 2: Scoreboard Tie Handling',
        code: `p_score = 2
c_score = 2
for res in ["tie", "player"]:
    if res == "player": p_score += 1
    elif res == "computer": c_score += 1
print(p_score, c_score)`,
        expectedOutput: '3 2',
        explanation: '"tie" changes neither score; "player" increments p_score to 3.',
        difficulty: 'Intermediate',
      },
      {
        id: 'c19-p3',
        title: 'Trace 3: Win Percentage Formula',
        code: `wins = 3
rounds = 5
win_rate = (wins * 100) / rounds
print(f"Win Rate: {win_rate}%")`,
        expectedOutput: 'Win Rate: 60.0%',
        explanation: '300 / 5 = 60.0%.',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-19',
      lessonId: 19,
      title: 'RPS Referee Engine Test',
      objective: 'Test your find_winner(player, computer) referee function against two inputs and print the official verdict.',
      materialsOrCodeRequired: 'Python IDE with player move and computer move inputs.',
      starterCode: `# CLASS 19 ACTIVITY: RPS REFEREE ENGINE
def find_winner(player, computer):
    if player == computer:
        return "tie"
    elif (
        (player == "rock" and computer == "scissors") or
        (player == "paper" and computer == "rock") or
        (player == "scissors" and computer == "paper")
    ):
        return "player"
    else:
        return "computer"

p_move = input().strip().lower()
c_move = input().strip().lower()

verdict = find_winner(p_move, c_move)
print(f"{p_move} vs {c_move} -> Winner: {verdict}")`,
      sampleInput: 'paper\nrock',
      teacherSolution: `def find_winner(player, computer):
    if player == computer:
        return "tie"
    elif (
        (player == "rock" and computer == "scissors") or
        (player == "paper" and computer == "rock") or
        (player == "scissors" and computer == "paper")
    ):
        return "player"
    else:
        return "computer"

p_move = input().strip().lower()
c_move = input().strip().lower()

verdict = find_winner(p_move, c_move)
print(f"{p_move} vs {c_move} -> Winner: {verdict}")`,
      teacherInstructions: [
        'Test all 3 winning matchups and a tie with Hasthaksh, then open Project 3 in the Project Studio!',
      ],
      studentInstructions: [
        'Verify find_winner returns "player", "computer", or "tie" accurately.',
      ],
      timeLimitMinutes: 15,
      expectedOutcome: 'paper vs rock -> Winner: player',
      reflectionQuestion: 'How would the rules change if we added "lizard" and "spock" to the choices list?',
    },
    debuggingMission: {
      id: 'dbg-19',
      title: 'The Tie-Gives-Computer-A-Point Bug',
      storyContext: 'Referee Bot used else: instead of elif winner == "computer":, so every time a round ends in a tie, the computer gets a free point!',
      brokenCode: `# Fix the scoreboard bug so "tie" does NOT give a point to computer_score!
player_score = 0
computer_score = 0
winner = "tie"

if winner == "player":
    player_score += 1
else:
    computer_score += 1

print(f"Player: {player_score} | Computer: {computer_score}")`,
      sampleInput: '',
      expectedOutput: 'Player: 0 | Computer: 0',
      bugType: 'Logic Error',
      hints: [
        'When winner is "tie", winner == "player" is False, so the else: branch runs and adds 1 to computer_score!',
        'Change else: to elif winner == "computer": so points are only added when the computer actually wins.',
        'Replace line 8 with elif winner == "computer":',
      ],
      teacherFixedCode: `player_score = 0
computer_score = 0
winner = "tie"

if winner == "player":
    player_score += 1
elif winner == "computer":
    computer_score += 1

print(f"Player: {player_score} | Computer: {computer_score}")`,
      explanationOfFix: 'Using elif winner == "computer": ensures ties leave both scores unchanged.',
    },
    exitQuiz: [
      {
        id: 'c19-q1',
        type: 'mcq',
        prompt: 'In Rock, Paper, Scissors League, how does the computer select its move each round?',
        options: [
          'random.choice(["rock", "paper", "scissors"])',
          'Always picking "rock"',
          'Asking a second human player',
          'Sorting the list',
        ],
        correctAnswer: 'random.choice(["rock", "paper", "scissors"])',
        points: 10,
        conceptTag: 'AI Choice',
        explanation: 'random.choice(choices) selects one of the three moves at random.',
      },
      {
        id: 'c19-q2',
        type: 'predict',
        prompt: 'What does find_winner("scissors", "rock") return?',
        codeSnippet: `# Rock crushes Scissors`,
        correctAnswer: 'computer',
        points: 15,
        conceptTag: 'Game Rules',
        explanation: 'Rock crushes scissors, so the computer wins the round.',
      },
      {
        id: 'c19-q3',
        type: 'fill_code',
        prompt: 'Complete the loop header to play 5 rounds numbered 1 to 5: for round_number in range(1, ___):',
        codeSnippet: `for round_number in range(1, ___):`,
        correctAnswer: '6',
        points: 15,
        conceptTag: 'Round Loop',
        explanation: 'range(1, 6) generates round numbers 1, 2, 3, 4, and 5.',
      },
      {
        id: 'c19-q4',
        type: 'identify_error',
        prompt: 'Why should player input be converted with .lower() before comparing to ["rock", "paper", "scissors"]?',
        correctAnswer: 'So capitalised inputs like "Rock" or "PAPER" match the lowercase strings',
        acceptableKeywords: ['lowercase', 'capital', 'match', 'case'],
        points: 15,
        conceptTag: 'Input Normalisation',
        explanation: 'Converting to .lower() ensures "Rock" and "ROCK" match "rock".',
      },
      {
        id: 'c19-q5',
        type: 'predict',
        prompt: 'If player_score = 3 and computer_score = 1 after 5 rounds (with 1 tie), who wins the league?',
        codeSnippet: `player_score = 3\ncomputer_score = 1`,
        correctAnswer: 'player',
        points: 15,
        conceptTag: 'Final Winner',
        explanation: '3 > 1, so the player wins the league.',
      },
      {
        id: 'c19-q6',
        type: 'coding',
        prompt: 'Write the condition that checks if player equals "paper" and computer equals "rock".',
        correctAnswer: 'player == "paper" and computer == "rock"',
        acceptableKeywords: ['player == "paper"', 'and', 'computer == "rock"'],
        points: 20,
        conceptTag: 'Winning Combo',
        explanation: 'player == "paper" and computer == "rock" checks the paper-covers-rock win case.',
      },
    ],
    standards: {
      lessonId: 19,
      englandKS2: [
        'Design, write and debug interactive games with computer opponents and scoreboards',
        'Use sequence, selection, repetition, variables, functions, and randomisation',
      ],
      cstaDomain: 'Programming',
      cstaOutcomeCode: 'CSTA-5-PRO-10',
      cstaOutcomeDescription: 'Create a multi-round game incorporating randomisation, compound conditional logic, and state tracking.',
      cstaPractice: 'Computational Thinking & Testing and Refinement',
      relatedActivity: 'Project 3: Rock, Paper, Scissors League',
      assessmentEvidence: 'Completed Rock, Paper, Scissors League Project & Class 19 Quiz',
      masteryIndicator: 'Completes all 9 TODO milestones in Project 3 and verifies all 9 move combinations.',
      coverageStatus: 'Extended Application',
      responsibleComputingNote: 'Fair AI opponents use genuine randomness rather than peeking at the human player’s input before choosing!',
    },
  },
  {
    id: 20,
    phase: 'PHASE 5: THREE MAJOR PROJECTS',
    title: 'GRAND SHOWCASE',
    subtitle: 'Project Demonstration, Code Walkthrough, Computational Portfolio & Final Assessment',
    comicChapterTitle: 'CHAPTER 20: ASCENSION OF THE PYTHON CHAMPION',
    illustrationTheme: 'showcase',
    storyIntro:
      'The Hall of Inventors is packed! Across 20 classes, Commander Hasthaksh has mastered variables, strings, algorithms, conditionals, Boolean logic, loops, nested grids, lists, dictionaries, functions, randomness, searching, debugging, and three full games. Today is the GRAND SHOWCASE!',
    realWorldScenario:
      'In the real world, software engineers present their finished applications, explain how their functions and data structures work, answer questions about edge cases, and celebrate their launch!',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'Every great programmer starts with a question. Look at everything you’ve built, Hasthaksh—you are ready for the Grand Showcase!',
      },
      {
        speaker: 'Hasthaksh',
        role: 'Python Champion',
        line: 'Quiz Master, Treasure Maze, and Rock Paper Scissors League are online. Let’s run the Grand Showcase!',
      },
    ],
    learningObjectives: [
      'Demonstrate all three major projects (Quiz Master, Treasure Maze, Rock Paper Scissors League) live.',
      'Explain the data structures, functions, loops, and conditional logic powering each project.',
      'Synthesise multiple Python concepts to solve an end-to-end capstone coding challenge.',
      'Complete the 25-item Final Assessment to earn the Python Champion seal.',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Capstone Project',
    topics: [
      'Live demonstration of all 3 Major Projects',
      'Explaining code architecture & design choices',
      'Integrating lists, dictionaries, loops, conditions & functions',
      '25-item Final Assessment',
    ],
    theoryBlocks: [
      {
        id: 'c20-t1',
        title: '1. How to Present & Explain Your Code Like an Engineer',
        simpleExplanation:
          'When presenting a project, follow the 4-Part Showcase Structure: 1) Mission Goal (what the app does), 2) Data Architecture (how lists/dictionaries store state), 3) Core Algorithm (how loops/functions process turns), and 4) Live Demo + Edge-Case Defense!',
        whyProgrammersUseIt:
          'Communicating clearly about how your code works proves true mastery and helps others collaborate with you.',
        realWorldAnalogy:
          'An inventor unveiling a new spacecraft by showing the cockpit first, then explaining the engine blueprint, and finally flying a test mission.',
        pythonSyntax: '# 1. Data Structure\n# 2. Helper Functions\n# 3. Main Controller Loop\n# 4. Final Summary Output',
        workingCodeExample: `# Grand Showcase Portfolio Summary Generator
projects = [
    {"title": "Quiz Master", "skills": "Dicts, Lists, Functions", "score": 100},
    {"title": "Treasure Maze", "skills": "2D Grids, Coordinates, Loops", "score": 100},
    {"title": "RPS League", "skills": "Random, Boolean Logic, State", "score": 100}
]

def print_portfolio(architect, items):
    print(f"=== {architect.upper()}'S PYTHON PORTFOLIO ===")
    total = 0
    for p in items:
        print(f"* {p['title']} [{p['skills']}] -> {p['score']}%")
        total += p["score"]
    print(f"Portfolio Average: {total // len(items)}% | Status: PYTHON CHAMPION")

print_portfolio("Hasthaksh", projects)`,
        lineByLineExplanation: [
          { line: 'projects = [ ... ]', explanation: 'Stores all 3 capstone projects as a list of dictionaries.' },
          { line: 'def print_portfolio(architect, items):', explanation: 'Encapsulates the portfolio generator in a reusable function.' },
        ],
        expectedOutput: "=== HASTHAKSH'S PYTHON PORTFOLIO ===\n* Quiz Master [Dicts, Lists, Functions] -> 100%\n* Treasure Maze [2D Grids, Coordinates, Loops] -> 100%\n* RPS League [Random, Boolean Logic, State] -> 100%\nPortfolio Average: 100% | Status: PYTHON CHAMPION",
        commonMistakes: [
          'Reading every character of code out loud instead of explaining the purpose of each function and data structure.',
        ],
        quickQuestion: {
          question: 'When explaining a function during your Grand Showcase, what are the 3 clearest things to describe?',
          options: [
            'What parameters it takes in, what logic it performs, and what value it returns or outputs',
            'How many spaces are on each line',
            'What font the code editor uses',
            'Only the variable names',
          ],
          correctIndex: 0,
          explanation: 'Describing inputs (parameters), process (logic), and output (return value) clearly communicates any function.',
        },
      },
      {
        id: 'c20-t2',
        title: '2. Full-Stack Python Synthesis: Combining All Course Tools',
        simpleExplanation:
          'You can now combine strings, lists, dictionaries, loops, conditionals, functions, and error handling inside one cohesive program to solve any computational challenge!',
        whyProgrammersUseIt:
          'Real software is built by combining these exact fundamental building blocks in creative ways.',
        realWorldAnalogy:
          'Mastering all the musical notes and chords so you can compose your own original symphony.',
        pythonSyntax: 'def analyse_mission(logs):\n    # Combines loop + dict + condition + return',
        workingCodeExample: `def evaluate_cadet(name, scores):
    best = max(scores)
    avg = sum(scores) // len(scores)
    if avg >= 85:
        badge = "Python Champion"
    else:
        badge = "Rising Coder"
    return f"{name} | Avg: {avg} | Best: {best} | Badge: {badge}"

report = evaluate_cadet("Hasthaksh", [92, 96, 88, 100, 94])
print(report)`,
        lineByLineExplanation: [
          { line: 'best = max(scores)', explanation: 'Finds the highest score in the list.' },
          { line: 'avg = sum(scores) // len(scores)', explanation: 'Calculates the integer average.' },
          { line: 'return f"..."', explanation: 'Formats and returns the complete champion credential string.' },
        ],
        expectedOutput: 'Hasthaksh | Avg: 94 | Best: 100 | Badge: Python Champion',
        commonMistakes: [
          'Forgetting to test your program with at least two different input sets before submitting your final assessment.',
        ],
        quickQuestion: {
          question: 'Which section of the app should Hasthaksh open after completing the Grand Showcase demonstration to take the 25-item Final Assessment?',
          options: [
            'Quizzes and Assessments -> Final Assessment',
            'Only the home screen',
            'Browser settings',
            'None',
          ],
          correctIndex: 0,
          explanation: 'The 25-item Final Assessment in Quizzes and Assessments evaluates all 20 classes of Python mastery.',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: Grand Showcase Command Console',
      description: 'Generate Hasthaksh’s official 20-Class Graduation Certificate and Mastery Telemetry!',
      starterCode: `# GRAND SHOWCASE GRADUATION GENERATOR
student = input()
favourite_project = input()
scores = [95, 98, 92, 100, 96]

def generate_certificate(name, proj, score_list):
    avg = sum(score_list) / len(score_list)
    print("==========================================")
    print("   HASTHAKSH'S PYTHON QUEST GRADUATION    ")
    print("==========================================")
    print(f"Champion: {name.upper()}")
    print(f"Featured Capstone: {proj}")
    print(f"Final Mastery Rating: {round(avg, 1)}%")
    print("Rank Achieved: LEVEL 9 PYTHON CHAMPION")
    print("==========================================")

generate_certificate(student, favourite_project, scores)`,
      sampleInput: 'Hasthaksh\nTreasure Maze',
      stepExplanations: [
        { line: 6, text: 'Defines generate_certificate() combining list math, string methods, and f-strings.' },
        { line: 17, text: 'Calls generate_certificate() to print the official graduation banner.' },
      ],
      fullExplanation: 'Congratulations on reaching Class 20! Present your 3 projects and complete the 25-item Final Assessment.',
    },
    predictChallenges: [
      {
        id: 'c20-p1',
        title: 'Trace 1: Combined List & String Synthesis',
        code: `words = ["python", "quest", "champion"]
code = ""
for w in words:
    code += w[0].upper()
print(code)`,
        expectedOutput: 'PQC',
        explanation: 'Takes index 0 of each word in uppercase ("P", "Q", "C") and joins them into "PQC".',
        difficulty: 'Starter',
      },
      {
        id: 'c20-p2',
        title: 'Trace 2: Dictionary Score Filter Function',
        code: `def top_players(scores_dict):
    winners = []
    for name, val in scores_dict.items():
        if val >= 90:
            winners.append(name)
    return winners

data = {"Astra": 85, "Hasthaksh": 98, "Nova": 92}
print(top_players(data))`,
        expectedOutput: "['Hasthaksh', 'Nova']",
        explanation: 'Filters keys whose values are >= 90 into the winners list and returns it.',
        difficulty: 'Intermediate',
      },
      {
        id: 'c20-p3',
        title: 'Trace 3: Recursive Countdown Bonus',
        code: `def calc_triangular(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    return total

print(calc_triangular(4) + calc_triangular(3))`,
        expectedOutput: '16',
        explanation: 'calc_triangular(4) is 1+2+3+4 = 10. calc_triangular(3) is 1+2+3 = 6. 10 + 6 = 16.',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-20',
      lessonId: 20,
      title: 'Grand Showcase Capstone Presentation',
      objective: 'Run the Showcase Score Aggregator across all 3 projects, explain how each project works to your teacher, and unlock the Final Assessment.',
      materialsOrCodeRequired: 'Python IDE & Three Major Projects Studio.',
      starterCode: `# CLASS 20 ACTIVITY: GRAND SHOWCASE SCORE AGGREGATOR
p1 = int(input())
p2 = int(input())
p3 = int(input())

scores = [p1, p2, p3]
total = sum(scores)
avg = round(total / len(scores), 1)

print(f"Project Scores: {scores}")
print(f"Total Points: {total}/300")
print(f"Showcase Average: {avg}%")
if avg >= 85:
    print("VERDICT: DISTINCTION - PYTHON CHAMPION!")
else:
    print("VERDICT: MERIT - GREAT WORK!")`,
      sampleInput: '95\n98\n100',
      teacherSolution: `p1 = int(input())
p2 = int(input())
p3 = int(input())

scores = [p1, p2, p3]
total = sum(scores)
avg = round(total / len(scores), 1)

print(f"Project Scores: {scores}")
print(f"Total Points: {total}/300")
print(f"Showcase Average: {avg}%")
if avg >= 85:
    print("VERDICT: DISTINCTION - PYTHON CHAMPION!")
else:
    print("VERDICT: MERIT - GREAT WORK!")`,
      teacherInstructions: [
        'Invite Hasthaksh to screen-share / demonstrate Quiz Master, Treasure Maze, and Rock Paper Scissors League.',
        'Ask him 1 question per project about how he would modify or extend a feature, then enter his 3 project scores above!',
      ],
      studentInstructions: [
        'Demonstrate your 3 projects, explain your code, and run the Showcase Score Aggregator.',
      ],
      timeLimitMinutes: 20,
      expectedOutcome: 'Project Scores: [95, 98, 100]\nTotal Points: 293/300\nShowcase Average: 97.7%\nVERDICT: DISTINCTION - PYTHON CHAMPION!',
      reflectionQuestion: 'Which of the three projects was your favourite to build, and what new game or tool do you want to invent next with Python?',
    },
    debuggingMission: {
      id: 'dbg-20',
      title: 'The Final Showcase Trophy Glitch',
      storyContext: 'The Trophy Ceremony script has both a dictionary key bug and a missing return statement in its rank helper!',
      brokenCode: `# Fix the 2 bugs so the Champion Trophy prints properly!
def get_title(xp):
    if xp >= 1000:
        print("Python Champion")
    else:
        return "Explorer"

hero = {"name": "Hasthaksh", "xp": 1500}
title = get_title(hero["xp"])
print(f"{hero['name']} -> {title}")`,
      sampleInput: '',
      expectedOutput: 'Hasthaksh -> Python Champion',
      bugType: 'Logic Error',
      hints: [
        'Look at line 4 inside get_title(xp): when xp >= 1000, it uses print("Python Champion") instead of return!',
        'Because it didn’t return the string, title becomes None!',
        'Change print("Python Champion") on line 4 to return "Python Champion".',
      ],
      teacherFixedCode: `def get_title(xp):
    if xp >= 1000:
        return "Python Champion"
    else:
        return "Explorer"

hero = {"name": "Hasthaksh", "xp": 1500}
title = get_title(hero["xp"])
print(f"{hero['name']} -> {title}")`,
      explanationOfFix: 'Replacing print("Python Champion") with return "Python Champion" returns the title string so it formats cleanly in the final output.',
    },
    exitQuiz: [
      {
        id: 'c20-q1',
        type: 'mcq',
        prompt: 'Which data structure is best for storing a single record with named fields like {"name": "Hasthaksh", "level": 9}?',
        options: ['Dictionary', 'Integer', 'Boolean', 'Float'],
        correctAnswer: 'Dictionary',
        points: 10,
        conceptTag: 'Data Structures',
        explanation: 'Dictionaries store key-value pairs for named fields.',
      },
      {
        id: 'c20-q2',
        type: 'predict',
        prompt: 'What is printed by this synthesis snippet?',
        codeSnippet: `nums = [2, 5, 8, 11]\nres = [x * 2 for x in nums if x > 4]\nprint(res)`,
        correctAnswer: '[10, 16, 22]',
        points: 15,
        conceptTag: 'List Filtering',
        explanation: 'Numbers > 4 are 5, 8, 11. Doubled: [10, 16, 22].',
      },
      {
        id: 'c20-q3',
        type: 'predict',
        prompt: 'Predict the output:',
        codeSnippet: `def mystery(s):\n    return s[::-1].upper()\n\nprint(mystery("quest"))`,
        correctAnswer: 'TSEUQ',
        points: 15,
        conceptTag: 'Functions & Strings',
        explanation: 'Reverses "quest" to "tseuq" and uppercases to "TSEUQ".',
      },
      {
        id: 'c20-q4',
        type: 'identify_error',
        prompt: 'Why is it better to break a 100-line game into smaller functions like show_maze() and move_player()?',
        correctAnswer: 'It makes the code modular, easier to read, reuse, test, and debug',
        acceptableKeywords: ['modular', 'read', 'reuse', 'debug', 'test', 'easier', 'organise'],
        points: 15,
        conceptTag: 'Software Engineering',
        explanation: 'Modular functions make programs readable, reusable, and much easier to debug.',
      },
      {
        id: 'c20-q5',
        type: 'fill_code',
        prompt: 'Complete the safe dictionary lookup that returns 0 if "bonus" is not in player_dict: player_dict.___("bonus", 0)',
        codeSnippet: `val = player_dict.___("bonus", 0)`,
        correctAnswer: 'get',
        points: 15,
        conceptTag: 'Dictionary .get()',
        explanation: '.get(key, default) returns default if key is missing.',
      },
      {
        id: 'c20-q6',
        type: 'coding',
        prompt: 'Write a function header (with colon) named calculate_win_rate that takes two parameters: wins and total_games.',
        correctAnswer: 'def calculate_win_rate(wins, total_games):',
        acceptableKeywords: ['def', 'calculate_win_rate(wins,', 'total_games):'],
        points: 20,
        conceptTag: 'Function Synthesis',
        explanation: 'def calculate_win_rate(wins, total_games): defines the two-parameter function.',
      },
    ],
    standards: {
      lessonId: 20,
      englandKS2: [
        'Design, write and debug programs that accomplish specific goals and present digital artefacts',
        'Evaluate and communicate how algorithms and data structures work together',
      ],
      cstaDomain: 'Computing & Society',
      cstaOutcomeCode: 'CSTA-5-CAS-01',
      cstaOutcomeDescription: 'Present completed software artefacts, explain design trade-offs, and reflect on responsible computing practices.',
      cstaPractice: 'Communication about Computing & Inclusive Collaboration',
      relatedActivity: 'Grand Showcase Capstone Presentation & Final Assessment',
      assessmentEvidence: 'Three Completed Major Projects & 25-Item Final Assessment',
      masteryIndicator: 'Independently explains project code and scores 80%+ on the Final Assessment.',
      coverageStatus: 'Extended Application',
      responsibleComputingNote: 'Give credit to teammates and inspirations, share knowledge generously, and build technology that helps people!',
    },
  },
];
