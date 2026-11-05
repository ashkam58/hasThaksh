import { Lesson } from '../types/quest';

export const LESSONS_PART_1: Lesson[] = [
  {
    id: 1,
    phase: 'PHASE 1: PYTHON FOUNDATIONS',
    title: 'Python Power-Up',
    subtitle: 'Variables, Data Types, Type Conversion, Input & Expressions',
    comicChapterTitle: 'CHAPTER 01: THE CORE IGNITION',
    illustrationTheme: 'superhero',
    storyIntro:
      'In Neo-Bengaluru, the Hero Registry mainframe has lost its power core! Commander Hasthaksh is called to the bridge alongside PY-9, a tactical coding droid. Since you already know how to print messages, we are skipping the slow basics and jumping straight into high-voltage variables, live user inputs, data conversions, and superhero math formulas.',
    realWorldScenario:
      'Imagine building a character creation screen in your favourite video game. How does the game store your hero name (text), age (whole number), energy shield (decimal), and flight capability (True/False), and then calculate your total combat rating?',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'Welcome to the Command Bridge, Hasthaksh! Our scanners show you already know basic Python, so today we are igniting the full Superhero Power Core!',
      },
      {
        speaker: 'Hasthaksh',
        role: 'Lead Code Architect',
        line: 'Awesome! I’m ready to master variables, data types, live user input, and superhero math formulas!',
      },
      {
        speaker: 'Chief Engineer Meera',
        role: 'Neo-Bengaluru Grid Director',
        line: 'Watch out for the String-Input Trap, Commander! Everything typed into input() arrives as text until you convert it with int() or float().',
      },
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'Let’s power through all 6 Core Concept Modules and build your Superhero Identity Generator!',
      },
    ],
    learningObjectives: [
      'Master print() with multiple values, custom separators, and clear # code comments.',
      'Declare, name, and update variables following Python’s 4 golden naming rules.',
      'Distinguish and inspect the 4 core data types: int, float, str, and bool using type().',
      'Capture live user data via input() and convert types accurately with int(), float(), and str().',
      'Construct arithmetic expressions using +, -, *, /, //, %, ** and apply PEMDAS/BODMAS order of operations.',
      'Build an interactive 5-input Superhero Identity Generator with calculated combat ratings.',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Intermediate Foundations',
    topics: [
      '1. Quick revision of print() & comments (#)',
      '2. Variables and the 4 golden naming rules',
      '3. The 4 core data types: int, float, str, bool',
      '4. Assigning, updating (+=) & swapping values',
      '5. Live input() & Type conversion (int, float, str)',
      '6. Arithmetic operators (//, %, **) & Order of operations',
    ],
    hasDiagnostic: true,
    theoryBlocks: [
      {
        id: 'c1-t1',
        title: 'Module 1: Quick Revision — print() Superpowers & Architect Comments (#)',
        simpleExplanation:
          'The print() function projects values onto the screen. You can print text (inside quotes), numbers, or multiple items separated by commas! Lines starting with # are comments—secret notes for human programmers that Python completely ignores.',
        whyProgrammersUseIt:
          'Every program needs a way to display results, game scores, and status messages to the player, while # comments explain how your code works when you or your teacher read it later.',
        realWorldAnalogy:
          'Think of print() like the giant holographic scoreboard in a cricket stadium, while # comments are the coach’s sticky notes on the playbook that the crowd never sees.',
        pythonSyntax: '# This is a comment ignored by Python\nprint("Hero:", "Astra", "Level:", 5)\nprint(10, 20, 30)',
        workingCodeExample: `# Mission Log: Testing print() Superpowers
print("=== NEO-BENGALURU COMMAND BRIDGE ===")

# Printing multiple items separated by commas (adds a space automatically!)
print("Commander:", "Hasthaksh", "| Rank:", 1)

# Printing math directly inside print()
print("Shield Energy:", 75 + 25)
print("Boosted Speed:", 12 * 3)`,
        lineByLineExplanation: [
          { line: '# Mission Log: Testing print() Superpowers', explanation: 'A comment starting with # — Python skips this line completely.' },
          { line: 'print("Commander:", "Hasthaksh", "| Rank:", 1)', explanation: 'Commas inside print() let you combine strings and numbers on one line with spaces between them.' },
          { line: 'print("Shield Energy:", 75 + 25)', explanation: 'Python calculates 75 + 25 first (100) and then prints Shield Energy: 100.' },
        ],
        expectedOutput: '=== NEO-BENGALURU COMMAND BRIDGE ===\nCommander: Hasthaksh | Rank: 1\nShield Energy: 100\nBoosted Speed: 36',
        commonMistakes: [
          'Forgetting closing quotes around text: print("Hello) causes a SyntaxError.',
          'Putting quotes around math expressions when you want the answer: print("75 + 25") prints the literal text 75 + 25 instead of 100!',
        ],
        quickQuestion: {
          question: 'What is the difference between print("10 + 5") and print(10 + 5)?',
          options: [
            'Both print 15',
            'print("10 + 5") prints the text 10 + 5, while print(10 + 5) calculates and prints 15',
            'Both print 10 + 5',
            'print(10 + 5) causes an error',
          ],
          correctIndex: 1,
          explanation: 'Anything inside quotes "..." is treated as literal text (a string). Without quotes, Python evaluates the math expression 10 + 5 = 15.',
        },
      },
      {
        id: 'c1-t2',
        title: 'Module 2: Variables & The 4 Golden Naming Rules (Memory Capsules)',
        simpleExplanation:
          'A variable is a named memory box in the computer’s RAM that stores a value. In Python, the = sign is an assignment arrow: it takes the value on the RIGHT and stores it inside the variable name on the LEFT!',
        whyProgrammersUseIt:
          'Without variables, a game could never remember your player name, health points, or inventory items from one line of code to the next.',
        realWorldAnalogy:
          'Imagine labelled storage lockers at Superhero HQ: Locker "hero_name" holds "Solaris", and Locker "grappling_hooks" holds the number 4.',
        pythonSyntax: 'hero_name = "Solaris"   # Valid snake_case\nmax_shields_2 = 100     # Valid (numbers allowed after first letter)',
        workingCodeExample: `# Creating Superhero Memory Capsules (Variables)
hero_codename = "VoltRunner"
gadget_count = 4
home_city = "Neo-Bengaluru"

print("Agent:", hero_codename)
print("Base City:", home_city)
print("Gadgets Equipped:", gadget_count)`,
        lineByLineExplanation: [
          { line: 'hero_codename = "VoltRunner"', explanation: 'Creates a variable named hero_codename and stores the text "VoltRunner" inside it.' },
          { line: 'gadget_count = 4', explanation: 'Creates a variable named gadget_count using snake_case (words connected by underscore _).' },
          { line: 'print("Agent:", hero_codename)', explanation: 'Looks inside the hero_codename box and prints its value ("VoltRunner"). Notice we do NOT put quotes around variable names!' },
        ],
        expectedOutput: 'Agent: VoltRunner\nBase City: Neo-Bengaluru\nGadgets Equipped: 4',
        commonMistakes: [
          'Rule 1 Trap — Starting with a number: 1st_hero = "Volt" is INVALID (must start with a letter or _).',
          'Rule 2 Trap — Spaces or hyphens: hero-name or hero name is INVALID (use underscores: hero_name).',
          'Rule 3 Trap — Case sensitivity: Hero_Name and hero_name are two completely different variables!',
        ],
        quickQuestion: {
          question: 'Which of these is a 100% VALID Python variable name?',
          options: ['2nd_mission', 'mission-score', 'mission_score_2', 'mission score'],
          correctIndex: 2,
          explanation: 'mission_score_2 uses letters, underscores, and a number at the end. Variable names can never start with a digit or contain hyphens/spaces.',
        },
      },
      {
        id: 'c1-t3',
        title: 'Module 3: The 4 Core Data Types (int, float, str, bool) & type()',
        simpleExplanation:
          'Every value in Python has a Data Type that tells Python what kind of data it is and what operations it can perform: int (whole number), float (decimal number), str (text string), and bool (True/False switch).',
        whyProgrammersUseIt:
          'Python needs to know if a value is a number (so it can add or multiply it), text (so it can join words together), or a boolean switch (to decide if shields are ON or OFF).',
        realWorldAnalogy:
          'In a video game: Player Level is an int (5), Speed Multiplier is a float (1.75), Player Name is a str ("Hasthaksh"), and Shield Active is a bool (True).',
        pythonSyntax: 'level = 5          # int\nspeed = 14.5       # float\nname = "Astra"     # str\nis_flying = True   # bool',
        workingCodeExample: `# Exploring the 4 Core Python Data Types
hero_name = "Solaris"
power_level = 90
jetpack_fuel = 98.6
shields_online = True

print("Name:", hero_name, "| Type:", type(hero_name))
print("Power:", power_level, "| Type:", type(power_level))
print("Fuel:", jetpack_fuel, "| Type:", type(jetpack_fuel))
print("Shields:", shields_online, "| Type:", type(shields_online))`,
        lineByLineExplanation: [
          { line: 'power_level = 90', explanation: '90 has no decimal point and no quotes, so Python stores it as an integer (int).' },
          { line: 'jetpack_fuel = 98.6', explanation: '98.6 has a decimal point, so Python stores it as a floating-point number (float).' },
          { line: 'shields_online = True', explanation: 'True (with a capital T and no quotes) is a Boolean (bool) truth value.' },
          { line: 'type(hero_name)', explanation: 'The built-in type() function inspects any variable and reveals its data type!' },
        ],
        expectedOutput: "Name: Solaris | Type: <class 'str'>\nPower: 90 | Type: <class 'int'>\nFuel: 98.6 | Type: <class 'float'>\nShields: True | Type: <class 'bool'>",
        commonMistakes: [
          'Writing true or false in lowercase—Python booleans MUST start with a capital letter: True and False.',
          'Putting quotes around a number like "90" when you want an int—"90" with quotes is a string (str)!',
          'Thinking 5.0 is an int—any number with a decimal point (even .0) is a float!',
        ],
        quickQuestion: {
          question: 'What are the data types of: "42", 42, 42.0, and False?',
          options: [
            'int, int, float, bool',
            'str, int, float, bool',
            'str, float, int, str',
            'int, str, float, bool',
          ],
          correctIndex: 1,
          explanation: '"42" in quotes is a str, 42 is a whole int, 42.0 has a decimal so it is a float, and False is a bool.',
        },
      },
      {
        id: 'c1-t4',
        title: 'Module 4: Assigning, Updating (+=) & Swapping Variable Values',
        simpleExplanation:
          'Variables are called "variable" because their values can change! When you write score = score + 10, Python first calculates the right side using the old score, then overwrites the box with the new total.',
        whyProgrammersUseIt:
          'Every time a player collects a coin, takes damage, or levels up, the program updates existing variables using = or shortcut operators like += and -=.',
        realWorldAnalogy:
          'If your piggy bank has ₹50 and you add ₹20, you take the current 50, add 20 to get 70, and now your piggy bank holds ₹70.',
        pythonSyntax: 'coins = 50\ncoins = coins + 20  # Now 70\ncoins += 10         # Shortcut: adds 10 (now 80)\ncoins -= 5          # Shortcut: subtracts 5 (now 75)',
        workingCodeExample: `# Live Battle Telemetry: Updating Variables Over Time
energy = 100
print("Start Energy:", energy)

# Taking a laser hit (-30)
energy = energy - 30
print("After Hit:", energy)

# Picking up a Mega Battery (+45 using += shortcut!)
energy += 45
print("After Battery Pickup:", energy)

# Doubling energy with Overdrive (*= 2)
energy *= 2
print("Overdrive Energy:", energy)`,
        lineByLineExplanation: [
          { line: 'energy = 100', explanation: 'Initializes energy to 100.' },
          { line: 'energy = energy - 30', explanation: 'Takes current energy (100), subtracts 30 (70), and stores 70 back into energy.' },
          { line: 'energy += 45', explanation: 'Shortcut for energy = energy + 45. Updates energy from 70 to 115.' },
          { line: 'energy *= 2', explanation: 'Shortcut for energy = energy * 2. Doubles energy from 115 to 230.' },
        ],
        expectedOutput: 'Start Energy: 100\nAfter Hit: 70\nAfter Battery Pickup: 115\nOverdrive Energy: 230',
        commonMistakes: [
          'Writing energy + 45 without = (e.g. just energy + 45 on a line calculates 115 and throws it away without updating energy!).',
          'Reading code from bottom to top—Python always executes variable updates strictly top-to-bottom, line by line.',
        ],
        quickQuestion: {
          question: 'If shields = 40, then we run shields = shields + 15, and then shields -= 5, what is inside shields?',
          options: ['40', '55', '50', '60'],
          correctIndex: 2,
          explanation: 'shields starts at 40, increases by 15 to become 55, and then decreases by 5 to become 50.',
        },
      },
      {
        id: 'c1-t5',
        title: 'Module 5: Live input() & Type Conversion (int(), float(), str())',
        simpleExplanation:
          'The input() function pauses the program and reads a line of text typed by the user. Crucial Rule: input() ALWAYS returns a string (str)! To do math with input, convert it with int() or float().',
        whyProgrammersUseIt:
          'Without input(), a program does the exact same thing every time. With input() and type conversion, your program becomes an interactive app that responds to any user!',
        realWorldAnalogy:
          'Receiving a text message that says "50" is just characters on a screen (str). Wrapping it in int("50") turns it into actual numeric fuel that your calculator engine can add and multiply.',
        pythonSyntax: 'name = input()             # Reads a string (str)\nage = int(input())         # Reads & converts to whole int\nweight = float(input())    # Reads & converts to decimal float',
        workingCodeExample: `# Reading Live User Inputs & Converting Types
hero = input()
base_strength = int(input())
multiplier = float(input())

# Why conversion matters:
boosted_strength = base_strength * multiplier
badge_label = hero + " #" + str(base_strength)

print("Badge:", badge_label)
print("Boosted Strength:", boosted_strength)`,
        sampleInput: 'Astra\n40\n2.5',
        lineByLineExplanation: [
          { line: 'hero = input()', explanation: 'Reads line 1 ("Astra") as a string.' },
          { line: 'base_strength = int(input())', explanation: 'Reads line 2 ("40") and converts it from string "40" into integer 40.' },
          { line: 'multiplier = float(input())', explanation: 'Reads line 3 ("2.5") and converts it into float 2.5.' },
          { line: 'badge_label = hero + " #" + str(base_strength)', explanation: 'Uses str(40) to turn the number back into text so it can be joined with +.' },
        ],
        expectedOutput: 'Badge: Astra #40\nBoosted Strength: 100.0',
        commonMistakes: [
          'The String Addition Trap: If a = "5" and b = "3" (from raw input()), a + b gives "53" (glues the text together) instead of 8!',
          'Trying to glue a string and an integer with + without str(): "Level " + 5 raises a TypeError (use "Level " + str(5) or print("Level", 5)).',
        ],
        quickQuestion: {
          question: 'What is the output of print("6" + "4") versus print(int("6") + int("4"))?',
          options: [
            '10 and 10',
            '64 and 10',
            '64 and 64',
            'Error and 10',
          ],
          correctIndex: 1,
          explanation: '"6" + "4" concatenates two strings into "64", while int("6") + int("4") adds two integers to get 10.',
        },
      },
      {
        id: 'c1-t6',
        title: 'Module 6: Superhero Math (/, //, %, **) & PEMDAS Order of Operations',
        simpleExplanation:
          'Python has 7 math operators: + (add), - (subtract), * (multiply), / (exact float division), // (floor division—whole part only), % (modulo—leftover remainder), and ** (exponent power). And Python follows PEMDAS order of operations!',
        whyProgrammersUseIt:
          'Game developers use // and % to split items into equal packs and find leftovers, ** for exponential level scaling, and parentheses () to control which calculation happens first.',
        realWorldAnalogy:
          'Sharing 17 energy bars among 5 heroes: 17 / 5 = 3.4 (exact), 17 // 5 = 3 whole bars per hero, and 17 % 5 = 2 leftover bars in the vault!',
        pythonSyntax: 'exact = 17 / 5     # 3.4 (always float!)\nwhole = 17 // 5    # 3 (floor quotient)\nleft  = 17 % 5     # 2 (remainder)\npower = 2 ** 4     # 16 (2*2*2*2)',
        workingCodeExample: `# Superhero Math & Order of Operations (PEMDAS)
total_crystals = 29
squad_size = 6

exact_share = round(total_crystals / squad_size, 2)
whole_per_hero = total_crystals // squad_size
vault_leftover = total_crystals % squad_size

# PEMDAS: Parentheses () first, then **, then * / // %, then + -
raw_calc = 10 + 5 * 2 ** 3
grouped_calc = (10 + 5) * 2 ** 3

print("Exact Share:", exact_share)
print("Whole Per Hero:", whole_per_hero, "| Leftover:", vault_leftover)
print("Without ():", raw_calc, "| With ():", grouped_calc)`,
        lineByLineExplanation: [
          { line: 'whole_per_hero = total_crystals // squad_size', explanation: '29 // 6 is 4 because 6 fits into 29 four whole times (24).' },
          { line: 'vault_leftover = total_crystals % squad_size', explanation: '29 % 6 is 5 because 29 - 24 leaves a remainder of 5.' },
          { line: 'raw_calc = 10 + 5 * 2 ** 3', explanation: 'Exponents first (2**3 = 8), then multiply (5 * 8 = 40), then add 10 = 50.' },
          { line: 'grouped_calc = (10 + 5) * 2 ** 3', explanation: 'Parentheses first (10 + 5 = 15), then 2**3 = 8, then 15 * 8 = 120.' },
        ],
        expectedOutput: 'Exact Share: 4.83\nWhole Per Hero: 4 | Leftover: 5\nWithout (): 50 | With (): 120',
        commonMistakes: [
          'Forgetting that single slash / ALWAYS produces a float with a decimal (e.g. 10 / 2 prints 5.0, whereas 10 // 2 prints 5).',
          'Forgetting parentheses when finding an average: write (a + b) / 2, NOT a + b / 2!',
        ],
        quickQuestion: {
          question: 'What does print(22 // 6, 22 % 6, (2 + 3) * 2 ** 2) output?',
          options: ['3.66 4 20', '3 4 20', '4 3 100', '3 4 14'],
          correctIndex: 1,
          explanation: '22 // 6 is 3 (since 3*6=18), 22 % 6 is 4 (22-18=4), and (2+3) * 2**2 is 5 * 4 = 20.',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: Superhero Energy Core & Resource Splitter',
      description: 'Watch how Python reads 3 live inputs (str, int, float), updates variables, and computes exact division (/), floor division (//), and modulo remainder (%).',
      starterCode: `# Superhero Energy Core Demo
codename = input()
energy_cells = int(input())
core_weight = float(input())

total_power = energy_cells * 25
missions_possible = total_power // 40
leftover_energy = total_power % 40

print("Agent:", codename)
print("Total Power:", total_power)
print("Full Missions:", missions_possible)
print("Leftover Energy:", leftover_energy)
print("Power-to-Weight:", round(total_power / core_weight, 1))`,
      sampleInput: 'CyberHawk\n7\n2.5',
      stepExplanations: [
        { line: 2, text: 'Reads codename "CyberHawk" from line 1 of the Input Panel as a str.' },
        { line: 3, text: 'Reads "7" from line 2 and converts it to integer 7 using int().' },
        { line: 4, text: 'Reads "2.5" from line 3 and converts it to float 2.5 using float().' },
        { line: 6, text: 'Multiplies 7 * 25 = 175 total power units.' },
        { line: 7, text: 'Uses floor division // to find how many whole 40-unit missions fit into 175 (4).' },
        { line: 8, text: 'Uses modulo % to find the leftover energy after 4 * 40 = 160 (15).' },
      ],
      fullExplanation:
        'This demonstration combines str, int, and float variables with // (floor division) and % (modulo remainder)—two essential superpowers for splitting game resources evenly.',
    },
    predictChallenges: [
      {
        id: 'c1-p1',
        title: 'Trace 1: Variable Updates & Shortcut Operators',
        code: `shields = 50
shields = shields + 20
shields -= 10
lasers = shields // 10
print(shields, lasers)`,
        expectedOutput: '60 6',
        explanation: 'shields starts at 50, increases to 70, decreases by 10 to become 60, and 60 // 10 gives 6.',
        difficulty: 'Starter',
      },
      {
        id: 'c1-p2',
        title: 'Trace 2: The String vs Integer Trap',
        code: `a = "4"
b = 3
print(a * b)
print(int(a) + b ** 2)`,
        expectedOutput: '444\n13',
        explanation: '"4" * 3 repeats the string three times ("444"). Then int("4") is 4, and 3 ** 2 is 9, so 4 + 9 = 13.',
        difficulty: 'Intermediate',
      },
      {
        id: 'c1-p3',
        title: 'Trace 3: Floor Division (//) vs Modulo (%) Vault Split',
        code: `bolts = 38
crates = bolts // 8
leftover = bolts % 8
print("Crates:", crates, "Leftover:", leftover)`,
        expectedOutput: 'Crates: 4 Leftover: 6',
        explanation: '8 goes into 38 four whole times (4 * 8 = 32), leaving 38 - 32 = 6 bolts left over.',
        difficulty: 'Intermediate',
      },
      {
        id: 'c1-p4',
        title: 'Trace 4: PEMDAS Order of Operations Challenge',
        code: `x = 10 + 6 / 2 * 3 - 4
y = (10 + 6) // (2 * 2)
print(int(x), y)`,
        expectedOutput: '15 4',
        explanation: '6 / 2 is 3.0, times 3 is 9.0. 10 + 9.0 - 4 = 15.0 (int is 15). For y, 16 // 4 = 4.',
        difficulty: 'Advanced Trace',
      },
      {
        id: 'c1-p5',
        title: 'Trace 5: Variable Swap Challenge',
        code: `left_hand = "Shield"
right_hand = "Laser"
temp = left_hand
left_hand = right_hand
right_hand = temp
print(left_hand, right_hand)`,
        expectedOutput: 'Laser Shield',
        explanation: 'Using a temporary variable (temp) lets us swap the values of left_hand and right_hand without losing either value!',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-1',
      lessonId: 1,
      title: 'Superhero Identity Generator',
      objective: 'Combine 5 user inputs (character name, age, power, strength level, and favourite gadget) into a formatted Superhero Registry card with calculated power ratings.',
      materialsOrCodeRequired: 'Python IDE with 5 lines in the Input Panel.',
      starterCode: `# CLASS 1 ACTIVITY: SUPERHERO IDENTITY GENERATOR
hero_name = input()
age = int(input())
superpower = input()
strength = int(input())
gadget = input()

# Calculate combat rating: strength * 12 + age * 5
combat_rating = strength * 12 + age * 5

print("=== HERO REGISTRY CARD ===")
print("Hero:", hero_name)
print("Age:", age)
print("Power:", superpower)
print("Gadget:", gadget)
print("Combat Rating:", combat_rating)`,
      sampleInput: 'ThunderBolt\n10\nLightning Dash\n85\nGrapple Glove',
      teacherSolution: `hero_name = input()
age = int(input())
superpower = input()
strength = int(input())
gadget = input()

combat_rating = strength * 12 + age * 5

print("=== HERO REGISTRY CARD ===")
print("Hero:", hero_name)
print("Age:", age)
print("Power:", superpower)
print("Gadget:", gadget)
print("Combat Rating:", combat_rating)`,
      teacherInstructions: [
        'Ask Hasthaksh to invent his own superhero persona and type the 5 inputs into the Input Panel.',
        'Challenge him to explain why age and strength need int() while hero_name, superpower, and gadget do not.',
        'Ask him to add a "Next Year Age" or "Mega Boosted Rating" calculation to extend the card.',
      ],
      studentInstructions: [
        'Read the 5 inputs in order: name, age, power, strength level, and gadget.',
        'Convert age and strength into integers using int().',
        'Calculate the combat_rating and print the full Hero Registry Card.',
      ],
      timeLimitMinutes: 12,
      expectedOutcome: '=== HERO REGISTRY CARD ===\nHero: ThunderBolt\nAge: 10\nPower: Lightning Dash\nGadget: Grapple Glove\nCombat Rating: 1070',
      reflectionQuestion: 'What happens if someone types "ten" instead of "10" for the age input, and why does Python raise a ValueError?',
    },
    debuggingMission: {
      id: 'dbg-1',
      title: 'Broken Gadget Shop Receipt',
      storyContext: 'Quartermaster Rex wrote a program to calculate the total price of superhero gadgets plus a 50-coin delivery fee, but it crashes and prints wrong numbers!',
      brokenCode: `# Fix the 3 bugs in Quartermaster Rex's code!
item_name = input()
quantity = input()
unit_price = 25

total_cost = quantity * unit_price + 50
print("Item:", item_name)
print("Total Coins:", total_cost)`,
      sampleInput: 'Laser Shield\n3',
      expectedOutput: 'Item: Laser Shield\nTotal Coins: 125',
      bugType: 'Type Error',
      hints: [
        'Look closely at line 3: what data type does input() return for quantity?',
        'If quantity is a string "3", what happens when you multiply "3" * 25 and then try to add + 50?',
        'Wrap input() in int() on line 3: quantity = int(input())',
      ],
      teacherFixedCode: `item_name = input()
quantity = int(input())
unit_price = 25

total_cost = quantity * unit_price + 50
print("Item:", item_name)
print("Total Coins:", total_cost)`,
      explanationOfFix: 'Without int(), quantity is the string "3". Multiplying "3" * 25 creates a 25-character string of 3s, and adding + 50 raises a TypeError because you cannot add an integer to a string.',
    },
    exitQuiz: [
      {
        id: 'c1-q1',
        type: 'mcq',
        prompt: 'Which data type is stored in the variable shield_active = False?',
        options: ['str', 'int', 'bool', 'float'],
        correctAnswer: 'bool',
        points: 10,
        conceptTag: 'Data Types',
        explanation: 'True and False (with capital first letters) are Boolean (bool) values.',
      },
      {
        id: 'c1-q2',
        type: 'predict',
        prompt: 'Predict the exact output of this code:',
        codeSnippet: `coins = 17\npacks = coins // 5\nleft = coins % 5\nprint(packs, left)`,
        correctAnswer: '3 2',
        points: 15,
        conceptTag: 'Arithmetic Operators',
        explanation: '17 divided by 5 is 3 whole packs (15 coins) with 2 coins left over.',
      },
      {
        id: 'c1-q3',
        type: 'identify_error',
        prompt: 'Why does this code fail? score = input()\nprint(score + 10)',
        correctAnswer: 'input() returns a string so you must convert score with int(input()) before adding 10',
        acceptableKeywords: ['int', 'string', 'str', 'convert', 'type'],
        points: 15,
        conceptTag: 'Type Conversion',
        explanation: 'input() always returns a string (str). Adding an int (10) to a str raises a TypeError unless converted with int().',
      },
      {
        id: 'c1-q4',
        type: 'fill_code',
        prompt: 'What single operator calculates 2 raised to the power of 5 (which equals 32) in Python?',
        codeSnippet: `result = 2 ___ 5\nprint(result)`,
        correctAnswer: '**',
        points: 10,
        conceptTag: 'Exponentiation',
        explanation: '** is the exponentiation (power) operator in Python.',
      },
      {
        id: 'c1-q5',
        type: 'predict',
        prompt: 'Predict the output of this order-of-operations expression:',
        codeSnippet: `ans = 20 - 4 * 3 + 2\nprint(ans)`,
        correctAnswer: '10',
        points: 15,
        conceptTag: 'Order of Operations',
        explanation: '4 * 3 happens first (= 12). Then left-to-right: 20 - 12 = 8, and 8 + 2 = 10.',
      },
      {
        id: 'c1-q6',
        type: 'coding',
        prompt: 'Write the single Python line that converts a string variable called price_text into a decimal number and stores it in price.',
        correctAnswer: 'price = float(price_text)',
        acceptableKeywords: ['price', 'float', 'price_text'],
        points: 20,
        conceptTag: 'Type Conversion',
        explanation: 'Use float(price_text) to convert a string containing a decimal into a float.',
      },
    ],
    standards: {
      lessonId: 1,
      englandKS2: [
        'Work with variables and various forms of input and output',
        'Design, write and debug programs that accomplish specific goals',
      ],
      cstaDomain: 'Programming',
      cstaOutcomeCode: 'CSTA-5-PRO-01',
      cstaOutcomeDescription: 'Create programs that use variables of different data types to store, update, and process user input.',
      cstaPractice: 'Computational Thinking & Testing and Refinement',
      relatedActivity: 'Superhero Identity Generator',
      assessmentEvidence: 'Class 1 Exit Quiz & 12-item Variable/Expression Drill Bank',
      masteryIndicator: 'Independently converts input() types and applies operator precedence without TypeErrors.',
      coverageStatus: 'Covered in Depth',
      responsibleComputingNote: 'When building profile generators, use fun fictional superhero codenames rather than sharing private home addresses or passwords.',
    },
  },
  {
    id: 2,
    phase: 'PHASE 1: PYTHON FOUNDATIONS',
    title: 'String Detective',
    subtitle: 'Indexing, Slicing, String Methods & f-Strings',
    comicChapterTitle: 'CHAPTER 02: CIPHER IN THE SHADOWS',
    illustrationTheme: 'detective',
    storyIntro:
      'Encrypted transmissions are bouncing across the city satellite grid! As the Academy’s chief String Detective, Hasthaksh must slice secret codewords out of scrambled text, clean up messy spy inputs, and forge dynamic f-string clearances.',
    realWorldScenario:
      'Think about how search engines clean up your typing (ignoring extra spaces or uppercase/lowercase) or how apps automatically generate a username from your first name, last name, and birth year.',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'Every character in a Python string sits in a numbered slot starting at index 0—and we can even count backwards from the end using negative numbers!',
      },
      {
        speaker: 'Hasthaksh',
        role: 'String Detective',
        line: 'Show me the cipher text. I’ll slice out the hidden message in one line.',
      },
    ],
    learningObjectives: [
      'Access individual characters using positive indexing (0, 1, 2...) and negative indexing (-1, -2...).',
      'Extract substrings and reverse text using slicing syntax [start:stop:step].',
      'Transform and inspect strings with len(), .upper(), .lower(), .strip(), .replace(), and .find().',
      'Combine variables cleanly into formatted messages using modern Python f-strings.',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Intermediate Foundations',
    topics: [
      'String creation & length len()',
      'Positive & Negative indexing',
      'Slicing [start:stop:step]',
      'upper(), lower(), strip(), replace(), find()',
      'String concatenation & f-strings',
    ],
    theoryBlocks: [
      {
        id: 'c2-t1',
        title: '1. Positive Indexing, Negative Indexing & Slicing',
        simpleExplanation:
          'A string is a sequence of characters. Index 0 is the first character, and index -1 is the very last character. Slicing [start:stop:step] cuts out a piece from start up to (but not including) stop.',
        whyProgrammersUseIt:
          'Programmers slice strings to extract country codes from phone numbers, file extensions (.py), or initials from names.',
        realWorldAnalogy:
          'Imagine train carriages numbered 0, 1, 2, 3, 4 from the engine, or -1, -2, -3 from the guard van at the back.',
        pythonSyntax: 'word = "PYTHON"\nfirst = word[0]      # "P"\nlast = word[-1]      # "N"\npart = word[0:4]     # "PYTH"\nrev = word[::-1]     # "NOHTYP"',
        workingCodeExample: `clue = "GALAXY-2026-OMEGA"
print("Length:", len(clue))
print("First letter:", clue[0])
print("Last letter:", clue[-1])
print("Planet code:", clue[0:6])
print("Year:", clue[7:11])
print("Reversed:", clue[0:6][::-1])`,
        lineByLineExplanation: [
          { line: 'clue[0:6]', explanation: 'Grabs characters at indices 0, 1, 2, 3, 4, 5 ("GALAXY"). Index 6 is excluded!' },
          { line: 'clue[-1]', explanation: 'Negative index -1 always grabs the last character ("A").' },
          { line: 'clue[0:6][::-1]', explanation: 'A step of -1 reverses the slice ("YXALAG").' },
        ],
        expectedOutput: 'Length: 17\nFirst letter: G\nLast letter: A\nPlanet code: GALAXY\nYear: 2026\nReversed: YXALAG',
        commonMistakes: [
          'Forgetting that indexing starts at 0, so word[1] is the SECOND character.',
          'Thinking word[0:3] includes index 3 (the stop index is never included).',
        ],
        quickQuestion: {
          question: 'If code = "FALCON", what does code[1:4] evaluate to?',
          options: ['FAL', 'ALC', 'ALCO', 'LCO'],
          correctIndex: 1,
          explanation: 'Index 1 is "A", index 2 is "L", index 3 is "C". Index 4 ("O") is the stop boundary and is excluded.',
        },
      },
      {
        id: 'c2-t2',
        title: '2. Power String Methods & f-Strings',
        simpleExplanation:
          'Strings come with built-in detective tools: .strip() removes extra spaces at the edges, .upper() and .lower() change case, .replace(old, new) swaps text, .find(sub) locates a position, and f"..." embeds variables right inside curly braces!',
        whyProgrammersUseIt:
          'Users often type accidental spaces or mixed capitals. Methods clean the data, and f-strings format reports cleanly without messy + str() chains.',
        realWorldAnalogy:
          'f-strings are like VIP badge templates with blank slots {name} and {rank} that automatically fill themselves in.',
        pythonSyntax: 'clean = raw.strip().upper()\nmsg = f"Agent {clean} has {points} XP!"',
        workingCodeExample: `raw_transmission = "   agent_nova#99   "
cleaned = raw_transmission.strip().replace("#", "-").upper()
dash_pos = cleaned.find("-")

print(f"Cleaned ID: {cleaned}")
print(f"Dash found at index: {dash_pos}")
print(f"Code number: {cleaned[dash_pos + 1:]}")`,
        lineByLineExplanation: [
          { line: 'raw_transmission.strip()', explanation: 'Removes leading and trailing spaces.' },
          { line: '.replace("#", "-").upper()', explanation: 'Replaces "#" with "-" and converts all letters to uppercase.' },
          { line: 'cleaned.find("-")', explanation: 'Returns the index where "-" first appears (10).' },
          { line: 'f"Cleaned ID: {cleaned}"', explanation: 'Inserts the value of cleaned directly inside the string.' },
        ],
        expectedOutput: 'Cleaned ID: AGENT_NOVA-99\nDash found at index: 10\nCode number: 99',
        commonMistakes: [
          'Forgetting the letter f before the opening quote in an f-string: "Hello {name}" prints literal braces!',
          'Calling string methods without parentheses, e.g. word.upper instead of word.upper().',
        ],
        quickQuestion: {
          question: 'What does "  robo cat  ".strip().replace(" ", "_") return?',
          options: ['"__robo_cat__"', '"robo_cat"', '"robocat"', '"robo cat"'],
          correctIndex: 1,
          explanation: '.strip() removes the outer spaces leaving "robo cat", and .replace(" ", "_") turns the middle space into "_".',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: Secret Cipher Unscrambler',
      description: 'See how slicing, .replace(), and f-strings work together to decode an intercepted spy transmission.',
      starterCode: `# Secret Cipher Unscrambler
intercepted = input()
agent_First = input()
agent_Last = input()

# 1. Strip spaces, remove noise stars *, and reverse the cipher!
secret = intercepted.strip().replace("*", "")[::-1]

# 2. Build a sleek agency username
username = f"{agent_First[:3].lower()}_{agent_Last[-3:].lower()}_{len(secret)}"

print(f"Decoded Message: {secret}")
print(f"Assigned Handle: {username}")`,
      sampleInput: '  !E*RO*C *NO*HT*YP  \nHasthaksh\nSharma',
      stepExplanations: [
        { line: 7, text: 'Strips outer spaces, deletes all "*" characters, and reverses the remaining characters with [::-1].' },
        { line: 10, text: 'Takes first 3 letters of first name, last 3 letters of last name, and length of secret using an f-string.' },
      ],
      fullExplanation: 'Chaining string methods and slicing lets you clean and decode text in a single expressive Python line.',
    },
    predictChallenges: [
      {
        id: 'c2-p1',
        title: 'Trace 1: Slicing & Negative Indices',
        code: `planet = "NEPTUNE"
print(planet[0:3] + planet[-2:])`,
        expectedOutput: 'NEPNE',
        explanation: 'planet[0:3] is "NEP" and planet[-2:] grabs the last two characters "NE". Combined: "NEPNE".',
        difficulty: 'Starter',
      },
      {
        id: 'c2-p2',
        title: 'Trace 2: Method Chaining',
        code: `msg = "  banana boat  "
res = msg.strip().upper().replace("A", "O")
print(res)
print(res.find("BO"))`,
        expectedOutput: 'BONONO BOOT\n7',
        explanation: 'After stripping and uppercasing we get "BANANA BOAT". Replacing A with O gives "BONONO BOOT". "BO" starts at index 7.',
        difficulty: 'Intermediate',
      },
      {
        id: 'c2-p3',
        title: 'Trace 3: Step Slicing',
        code: `cipher = "H1A2S3T4H5"
print(cipher[::2])
print(cipher[1::2])`,
        expectedOutput: 'HASTH\n12345',
        explanation: 'cipher[::2] takes every 2nd character starting at 0 ("HASTH"). cipher[1::2] starts at index 1 and takes every 2nd character ("12345").',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-2',
      lessonId: 2,
      title: 'Secret Message Decoder',
      objective: 'Decode a multi-part spy message by removing decoy symbols, extracting slices, and formatting a detective report.',
      materialsOrCodeRequired: 'Python IDE with scrambled input transmission.',
      starterCode: `# CLASS 2 ACTIVITY: SECRET MESSAGE DECODER
scrambled = input()
spy_name = input()

# Step 1: Remove outer spaces and replace "@" with "A" and "3" with "E"
step1 = scrambled.strip().replace("@", "A").replace("3", "E")

# Step 2: Reverse the string to reveal the message
decoded = step1[::-1]

print(f"Detective: {spy_name.upper()}")
print(f"Decoded: {decoded}")
print(f"Characters: {len(decoded)}")`,
      sampleInput: '  T3KCOP N3DDIH @  \nHasthaksh',
      teacherSolution: `scrambled = input()
spy_name = input()

step1 = scrambled.strip().replace("@", "A").replace("3", "E")
decoded = step1[::-1]

print(f"Detective: {spy_name.upper()}")
print(f"Decoded: {decoded}")
print(f"Characters: {len(decoded)}")`,
      teacherInstructions: [
        'Have Hasthaksh trace what step1 looks like before the [::-1] reversal.',
        'Ask him to create his own encoded string for you to decode using his program!',
      ],
      studentInstructions: [
        'Strip extra spaces from scrambled and replace decoy characters "@" -> "A" and "3" -> "E".',
        'Use [::-1] to flip the string into readable English.',
        'Print the formatted detective summary using f-strings.',
      ],
      timeLimitMinutes: 12,
      expectedOutcome: 'Detective: HASTHAKSH\nDecoded: A HIDDEN POCKET\nCharacters: 15',
      reflectionQuestion: 'Why does the order of .strip() and [::-1] matter if you are also slicing the first 5 characters?',
    },
    debuggingMission: {
      id: 'dbg-2',
      title: 'The Broken Badge Formatter',
      storyContext: 'Officer Kira tried to create a badge generator that prints the first 3 letters of a city in uppercase and the agent’s score, but three string bugs broke the system!',
      brokenCode: `# Fix the 3 bugs in Kira's Badge Formatter
city = input()
points = int(input())

prefix = city[1:3].upper
print("Badge: {prefix}-{points}")`,
      sampleInput: 'Mumbai\n950',
      expectedOutput: 'Badge: MUM-950',
      bugType: 'Logic Error',
      hints: [
        'To get the FIRST 3 letters of city, what index should the slice start at? (0, not 1!)',
        'Did Kira actually call .upper() with parentheses?',
        'Look at the print statement: what letter is missing before the opening quote to make {prefix} and {points} work?',
      ],
      teacherFixedCode: `city = input()
points = int(input())

prefix = city[0:3].upper()
print(f"Badge: {prefix}-{points}")`,
      explanationOfFix: '1) Slice must be city[0:3] to get indices 0, 1, 2 ("Mum"). 2) .upper() requires parentheses. 3) The print string needs the f prefix: f"Badge: {prefix}-{points}".',
    },
    exitQuiz: [
      {
        id: 'c2-q1',
        type: 'mcq',
        prompt: 'What is the result of "QUEST"[-1]?',
        options: ['"Q"', '"T"', '"S"', 'IndexError'],
        correctAnswer: '"T"',
        points: 10,
        conceptTag: 'Negative Indexing',
        explanation: 'Index -1 always refers to the last character of a string.',
      },
      {
        id: 'c2-q2',
        type: 'predict',
        prompt: 'Predict the output of this slice:',
        codeSnippet: `word = "COMPUTER"\nprint(word[3:6])`,
        correctAnswer: 'PUT',
        points: 15,
        conceptTag: 'String Slicing',
        explanation: 'Indices 3, 4, and 5 of "COMPUTER" are "P", "U", "T". Index 6 is excluded.',
      },
      {
        id: 'c2-q3',
        type: 'fill_code',
        prompt: 'Which slice step reverses a string completely in Python? word[___]',
        codeSnippet: `rev = word[___]`,
        correctAnswer: '::-1',
        points: 15,
        conceptTag: 'String Slicing',
        explanation: '[::-1] slices from start to end with a step of -1, reversing the string.',
      },
      {
        id: 'c2-q4',
        type: 'predict',
        prompt: 'What does this code print?',
        codeSnippet: `text = "mississippi"\nprint(text.find("ss"))`,
        correctAnswer: '2',
        points: 15,
        conceptTag: 'String Methods',
        explanation: '.find("ss") returns the starting index of the first occurrence of "ss", which is index 2.',
      },
      {
        id: 'c2-q5',
        type: 'identify_error',
        prompt: 'Why does print("Score: {score}") print the literal text {score} instead of the variable value?',
        correctAnswer: 'It is missing the f prefix before the string quote to make it an f-string',
        acceptableKeywords: ['f-string', 'f ', 'prefix', 'f"'],
        points: 15,
        conceptTag: 'f-Strings',
        explanation: 'You must write f"Score: {score}" so Python evaluates expressions inside { }.',
      },
      {
        id: 'c2-q6',
        type: 'coding',
        prompt: 'Write a single expression that removes outer spaces from a variable named raw_name and converts it to lowercase.',
        correctAnswer: 'raw_name.strip().lower()',
        acceptableKeywords: ['raw_name', 'strip()', 'lower()'],
        points: 20,
        conceptTag: 'Method Chaining',
        explanation: 'Chaining raw_name.strip().lower() trims whitespace and converts all characters to lowercase.',
      },
    ],
    standards: {
      lessonId: 2,
      englandKS2: [
        'Use sequence and variables in programs; manipulate text inputs and outputs',
        'Use logical reasoning to explain how string algorithms work',
      ],
      cstaDomain: 'Data & Analysis',
      cstaOutcomeCode: 'CSTA-5-DAA-01',
      cstaOutcomeDescription: 'Manipulate, clean, and format text strings using indexing, slicing, and built-in string methods.',
      cstaPractice: 'Computational Thinking',
      relatedActivity: 'Secret Message Decoder',
      assessmentEvidence: 'Class 2 Exit Quiz & Boss Username Generator',
      masteryIndicator: 'Uses positive/negative slicing and f-strings without off-by-one errors.',
      coverageStatus: 'Covered in Depth',
      responsibleComputingNote: 'Usernames and handles in online games should protect your privacy—combine creative prefixes rather than using full legal details.',
    },
  },
  {
    id: 3,
    phase: 'PHASE 1: PYTHON FOUNDATIONS',
    title: 'Algorithm Architect',
    subtitle: 'Decomposition, Sequencing, Pseudocode, Flowcharts & Trace Tables',
    comicChapterTitle: 'CHAPTER 03: BLUEPRINT OF THE TITAN BOT',
    illustrationTheme: 'robot',
    storyIntro:
      'Before writing complex code, master inventors design the blueprint! Inside the Robotics Hangar, Hasthaksh must programme Titan-Bot to navigate obstacle courses, translate pseudocode blueprints into real Python, and track every variable change in a trace table.',
    realWorldScenario:
      'Imagine giving instructions to a Mars Rover or designing an automatic snack vending machine: if you put "dispense snack" BEFORE "check if enough coins were inserted", the machine gives away everything for free!',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'Robots have zero common sense, Hasthaksh! They follow your sequence literally—step by step.',
      },
      {
        speaker: 'Hasthaksh',
        role: 'Algorithm Architect',
        line: 'Then let’s decompose the problem, trace every variable, and make our algorithm bulletproof!',
      },
    ],
    learningObjectives: [
      'Define an algorithm as a precise, finite sequence of steps to solve a problem.',
      'Apply computational thinking: decomposition, sequencing, and Input-Process-Output (IPO) analysis.',
      'Trace variable values step-by-step using a Trace Table.',
      'Translate structured pseudocode and flowcharts into working Python 3 programs.',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Intermediate Foundations',
    topics: [
      'What is an algorithm? & Computational thinking',
      'Problem decomposition & Sequencing',
      'Inputs, Processes and Outputs (IPO)',
      'Pseudocode & Flowcharts',
      'Trace tables',
    ],
    theoryBlocks: [
      {
        id: 'c3-t1',
        title: '1. Algorithms, Decomposition & Input-Process-Output (IPO)',
        simpleExplanation:
          'An algorithm is an exact step-by-step recipe. Decomposition means breaking one giant scary problem into 3 or 4 small, easy sub-problems: what are the Inputs, what Process transforms them, and what Output is displayed?',
        whyProgrammersUseIt:
          'Even professional engineers cannot write a 1,000-line game in one go. They decompose it into movement, scoring, collision, and display modules.',
        realWorldAnalogy:
          'Building a 2,000-piece LEGO spaceship is easy when decomposed into Bag 1 (Cockpit), Bag 2 (Engines), and Bag 3 (Wings) in strict sequence.',
        pythonSyntax: '# Step 1: INPUT\n# Step 2: PROCESS\n# Step 3: OUTPUT',
        workingCodeExample: `# IPO Blueprint: Solar Rover Battery Planner
# 1. INPUT: Distance in km and solar charge rate
distance_km = int(input())
charge_per_hour = int(input())

# 2. PROCESS: 3 units of energy per km; calculate hours needed
energy_needed = distance_km * 3
hours_to_charge = energy_needed / charge_per_hour

# 3. OUTPUT: Display mission telemetry
print(f"Energy Required: {energy_needed} Wh")
print(f"Charging Time: {hours_to_charge} hours")`,
        sampleInput: '40\n15',
        lineByLineExplanation: [
          { line: 'distance_km = int(input())', explanation: 'INPUT stage: captures mission distance (40 km).' },
          { line: 'energy_needed = distance_km * 3', explanation: 'PROCESS stage: computes total watt-hours required (120).' },
          { line: 'print(f"Charging Time: {hours_to_charge} hours")', explanation: 'OUTPUT stage: reports the result clearly (8.0 hours).' },
        ],
        expectedOutput: 'Energy Required: 120 Wh\nCharging Time: 8.0 hours',
        commonMistakes: [
          'Out-of-order sequencing: trying to calculate energy_needed before reading distance_km.',
          'Ambiguous instructions like "add some energy" instead of an exact mathematical formula.',
        ],
        quickQuestion: {
          question: 'Breaking a large video game project into "Player Controls", "Scoreboard", and "Level Map" is called:',
          options: ['Concatenation', 'Decomposition', 'Indentation', 'Slicing'],
          correctIndex: 1,
          explanation: 'Decomposition is breaking a complex problem down into smaller, manageable parts.',
        },
      },
      {
        id: 'c3-t2',
        title: '2. Pseudocode & Trace Tables',
        simpleExplanation:
          'Pseudocode is a human-friendly blueprint written in plain English keywords (INPUT, SET, OUTPUT). A Trace Table lets you play "human computer", writing down the exact value of each variable after every line executes.',
        whyProgrammersUseIt:
          'Trace tables catch subtle logic bugs (like swapping two variables incorrectly) before you even run the code.',
        realWorldAnalogy:
          'A trace table is like a chess player writing down every move on a score sheet to see exactly how the board changed.',
        pythonSyntax: '# Trace each line:\nx = 5\ny = 10\ntemp = x\nx = y\ny = temp',
        workingCodeExample: `# Variable Swap & Trace Table Demo
alpha = 12
beta = 5
print(f"Start -> alpha: {alpha}, beta: {beta}")

# Step 1: Combine into alpha
alpha = alpha + beta
# Step 2: Update beta
beta = alpha - beta
# Step 3: Complete swap
alpha = alpha - beta

print(f"Swapped -> alpha: {alpha}, beta: {beta}")`,
        lineByLineExplanation: [
          { line: 'alpha = alpha + beta', explanation: 'Trace Row 1: alpha becomes 12 + 5 = 17 (beta is still 5).' },
          { line: 'beta = alpha - beta', explanation: 'Trace Row 2: beta becomes 17 - 5 = 12 (alpha is still 17).' },
          { line: 'alpha = alpha - beta', explanation: 'Trace Row 3: alpha becomes 17 - 12 = 5. The values are swapped!' },
        ],
        expectedOutput: 'Start -> alpha: 12, beta: 5\nSwapped -> alpha: 5, beta: 12',
        commonMistakes: [
          'Writing x = y and then y = x to swap variables—the first line overwrites x so both end up with y’s value!',
        ],
        quickQuestion: {
          question: 'Trace this code: a = 4; b = a * 2; a = b - 3. What are the final values of a and b?',
          options: ['a = 4, b = 8', 'a = 5, b = 8', 'a = 5, b = 5', 'a = 8, b = 5'],
          correctIndex: 1,
          explanation: 'First a = 4. Next b = 4 * 2 = 8. Finally a = 8 - 3 = 5. So a is 5 and b is 8.',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: Vending Machine Coin Dispenser Algorithm',
      description: 'Step through a greedy algorithm that breaks any change amount into ₹10, ₹5, and ₹1 coins.',
      starterCode: `# Automatic Vending Machine Algorithm
item_cost = int(input())
paid = int(input())

change = paid - item_cost
tens = change // 10
rem_after_tens = change % 10
fives = rem_after_tens // 5
ones = rem_after_tens % 5

print(f"Total Change: {change}")
print(f"10-Rupee Coins: {tens}")
print(f"5-Rupee Coins: {fives}")
print(f"1-Rupee Coins: {ones}")`,
      sampleInput: '63\n100',
      stepExplanations: [
        { line: 5, text: 'Calculates total change: 100 - 63 = 37.' },
        { line: 6, text: 'Finds how many ₹10 coins fit in 37: 37 // 10 = 3.' },
        { line: 7, text: 'Finds remainder after ₹10 coins: 37 % 10 = 7.' },
        { line: 8, text: 'Finds how many ₹5 coins fit in 7: 7 // 5 = 1.' },
        { line: 9, text: 'Finds remaining ₹1 coins: 7 % 5 = 2.' },
      ],
      fullExplanation: 'Click "Step Through" above to watch each variable update in the Trace Table as Python decomposes 37 into 3 tens, 1 five, and 2 ones!',
    },
    predictChallenges: [
      {
        id: 'c3-p1',
        title: 'Trace 1: Three-Step Mystery Trace',
        code: `p = 3
q = p + 4
p = q * 2
q = p - q
print(p, q)`,
        expectedOutput: '14 7',
        explanation: 'p=3 -> q=7 -> p=14 -> q=14-7=7. Final values: p=14, q=7.',
        difficulty: 'Starter',
      },
      {
        id: 'c3-p2',
        title: 'Trace 2: The Overwrite Trap',
        code: `cup_a = "Tea"
cup_b = "Juice"
cup_a = cup_b
cup_b = cup_a
print(cup_a, cup_b)`,
        expectedOutput: 'Juice Juice',
        explanation: 'Because no temporary variable was used, cup_a = cup_b overwrote "Tea" with "Juice", so both cups hold "Juice".',
        difficulty: 'Intermediate',
      },
      {
        id: 'c3-p3',
        title: 'Trace 3: Robot Coordinate Tracker',
        code: `x = 2
y = 5
x = x + 3
y = y - x
x = x * 2
print(f"({x}, {y})")`,
        expectedOutput: '(10, 0)',
        explanation: 'x becomes 2+3=5. Then y becomes 5-5=0. Finally x becomes 5*2=10. Output: (10, 0).',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-3',
      lessonId: 3,
      title: 'Robot Mission Control',
      objective: 'Sequence precise coordinate updates to guide Titan-Bot from start (0, 0) around a laser barrier to the charging dock (6, 4) and report total steps.',
      materialsOrCodeRequired: 'Python IDE with coordinate trace tracker.',
      starterCode: `# CLASS 3 ACTIVITY: ROBOT MISSION CONTROL
x = 0
y = 0
steps = 0

# Step 1: Move North 4 units
y = y + 4
steps = steps + 4

# Step 2: Move East 6 units
x = x + 6
steps = steps + 6

print(f"Dock Reached: ({x}, {y})")
print(f"Total Steps: {steps}")`,
      sampleInput: '',
      teacherSolution: `x = 0
y = 0
steps = 0

y = y + 4
steps = steps + 4

x = x + 6
steps = steps + 6

print(f"Dock Reached: ({x}, {y})")
print(f"Total Steps: {steps}")`,
      teacherInstructions: [
        'Use the Step Through button with Hasthaksh so he can see x, y, and steps update one instruction at a time.',
        'Ask: What if there is an obstacle at (0, 3)? How would we decompose the path into 3 segments?',
      ],
      studentInstructions: [
        'Trace the robot starting at (0, 0).',
        'Verify that y increases by 4, x increases by 6, and steps records the total distance travelled.',
      ],
      timeLimitMinutes: 12,
      expectedOutcome: 'Dock Reached: (6, 4)\nTotal Steps: 10',
      reflectionQuestion: 'Why does changing the sequence of moves matter when there is an obstacle at (3, 0) versus (0, 3)?',
    },
    debuggingMission: {
      id: 'dbg-3',
      title: 'Out-of-Order Smoothie Bot',
      storyContext: 'Chef Bot’s smoothie algorithm calculates the discounted total BEFORE applying the coupon and swaps variables without a temporary holder!',
      brokenCode: `# Fix the sequencing bug so discounted_price uses the updated coupon!
price = int(input())
coupon = 10
discounted_price = price - coupon
coupon = 25
print("Final Price:", discounted_price)`,
      sampleInput: '100',
      expectedOutput: 'Final Price: 75',
      bugType: 'Logic Error',
      hints: [
        'Trace line by line: what is the value of coupon when discounted_price = price - coupon executes on line 4?',
        'Line 5 updates coupon = 25 AFTER discounted_price was already calculated!',
        'Move discounted_price = price - coupon so it runs AFTER coupon = 25.',
      ],
      teacherFixedCode: `price = int(input())
coupon = 10
coupon = 25
discounted_price = price - coupon
print("Final Price:", discounted_price)`,
      explanationOfFix: 'Python executes top-to-bottom in strict sequence. Calculating discounted_price after setting coupon = 25 gives 100 - 25 = 75.',
    },
    exitQuiz: [
      {
        id: 'c3-q1',
        type: 'mcq',
        prompt: 'What is a Trace Table used for in programming?',
        options: [
          'Drawing 3D graphics',
          'Tracking variable values and outputs line-by-line to verify logic',
          'Making the internet faster',
          'Encrypting passwords',
        ],
        correctAnswer: 'Tracking variable values and outputs line-by-line to verify logic',
        points: 10,
        conceptTag: 'Trace Tables',
        explanation: 'A trace table simulates execution step by step to verify how variables change.',
      },
      {
        id: 'c3-q2',
        type: 'arrange',
        prompt: 'What is the correct 3-stage order for designing a data-processing algorithm?',
        options: ['Output -> Input -> Process', 'Input -> Process -> Output', 'Process -> Output -> Input', 'Input -> Output -> Process'],
        correctAnswer: 'Input -> Process -> Output',
        points: 15,
        conceptTag: 'IPO Model',
        explanation: 'First gather the Inputs, then Process the calculations, and finally Output the result.',
      },
      {
        id: 'c3-q3',
        type: 'predict',
        prompt: 'Trace this swap algorithm and predict the output:',
        codeSnippet: `a = 9\nb = 4\ntemp = a\na = b\nb = temp\nprint(a, b)`,
        correctAnswer: '4 9',
        points: 15,
        conceptTag: 'Sequencing',
        explanation: 'Using temp preserves 9 while a becomes 4, and then b receives temp (9).',
      },
      {
        id: 'c3-q4',
        type: 'mcq',
        prompt: 'In a flowchart, which shape represents a Process / Calculation step (like total = a + b)?',
        options: ['Oval', 'Rectangle', 'Diamond', 'Parallelogram'],
        correctAnswer: 'Rectangle',
        points: 15,
        conceptTag: 'Flowcharts',
        explanation: 'In standard flowcharts: Ovals are Start/End, Parallelograms are Input/Output, Rectangles are Processes, and Diamonds are Decisions.',
      },
      {
        id: 'c3-q5',
        type: 'predict',
        prompt: 'Convert this pseudocode mentally and predict the output:\nSET n TO 6\nSET n TO n * 3\nSET n TO n - 4\nOUTPUT n',
        correctAnswer: '14',
        points: 15,
        conceptTag: 'Pseudocode',
        explanation: '6 * 3 = 18, and 18 - 4 = 14.',
      },
      {
        id: 'c3-q6',
        type: 'short_explanation',
        prompt: 'In one short sentence, explain why "Add a pinch of salt" is NOT a valid computer algorithm instruction.',
        correctAnswer: 'It is ambiguous and not a precise measurable quantity',
        acceptableKeywords: ['ambiguous', 'precise', 'exact', 'clear', 'specific', 'how much'],
        points: 20,
        conceptTag: 'Algorithmic Precision',
        explanation: 'Algorithms require unambiguous, exact instructions (e.g., "Add 2 grams of salt").',
      },
    ],
    standards: {
      lessonId: 3,
      englandKS2: [
        'Solve problems by decomposing them into smaller parts',
        'Use logical reasoning to explain how some simple algorithms work and to detect and correct errors',
      ],
      cstaDomain: 'Algorithms & Design',
      cstaOutcomeCode: 'CSTA-5-ALG-01',
      cstaOutcomeDescription: 'Decompose problems into smaller tasks and represent algorithms using pseudocode, flowcharts, and trace tables.',
      cstaPractice: 'Computational Thinking',
      relatedActivity: 'Robot Mission Control',
      assessmentEvidence: 'Class 3 Trace Table Challenges & Vending Machine Boss Algorithm',
      masteryIndicator: 'Completes multi-variable trace tables and translates pseudocode into Python accurately.',
      coverageStatus: 'Covered in Depth',
      responsibleComputingNote: 'Always test algorithms with unusual cases before deploying them in real machines so nobody gets short-changed!',
    },
  },
  {
    id: 4,
    phase: 'PHASE 2: DECISION-MAKING',
    title: 'Decision Engine',
    subtitle: 'if, elif, else, Comparison Operators & Indentation',
    comicChapterTitle: 'CHAPTER 04: FORK IN THE REACTOR',
    illustrationTheme: 'decision',
    storyIntro:
      'The Academy’s autopilot reactor has reached a critical junction! Programs that only run straight top-to-bottom cannot react to changing danger levels. Hasthaksh must wire up Python’s Decision Engine using if, elif, and else branches.',
    realWorldScenario:
      'How does a smart thermometer decide whether to turn on the AC, the heater, or stay in eco-mode? Or how does an exam portal automatically assign A+, A, B, or C grades based on your score?',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'Watch the colon : and the 4-space indentation, Hasthaksh! In Python, indentation tells the computer which lines belong inside a branch.',
      },
      {
        speaker: 'Hasthaksh',
        role: 'Decision Architect',
        line: 'If temperature > 100, deploy coolant—elif temperature > 70, run fans—else all systems nominal!',
      },
    ],
    learningObjectives: [
      'Write conditional expressions using comparison operators: ==, !=, <, >, <=, >=.',
      'Construct multi-way branching programs using if, elif, and else.',
      'Use proper colon syntax and 4-space indentation to group conditional blocks.',
      'Explain why the order of elif conditions matters when ranges overlap.',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Intermediate Foundations',
    topics: [
      'Comparison operators (==, !=, <, >, <=, >=)',
      'if statements & Indentation',
      'else statements',
      'elif chains & Branch ordering',
    ],
    theoryBlocks: [
      {
        id: 'c4-t1',
        title: '1. Comparison Operators, if / else & Indentation Rules',
        simpleExplanation:
          'A condition compares two values and produces True or False. Remember: a single = assigns a value, while a double == checks if two values are equal! Every if or else line ends with a colon (:), and the lines inside are indented by 4 spaces.',
        whyProgrammersUseIt:
          'Selection (branching) allows software to make smart choices based on user input, sensor readings, or game scores.',
        realWorldAnalogy:
          'A railway track switch: if the train is an Express (score >= 80), switch to Track A; otherwise (else), take Track B.',
        pythonSyntax: 'if score >= 50:\n    print("Pass!")\nelse:\n    print("Try again!")',
        workingCodeExample: `shield_energy = int(input())

if shield_energy >= 50:
    print("Shield Status: STRONG")
    print("Ready for warp jump!")
else:
    print("Shield Status: LOW")
    print("Diverting auxiliary power...")

print("Scan complete.")`,
        sampleInput: '35',
        lineByLineExplanation: [
          { line: 'if shield_energy >= 50:', explanation: 'Checks if 35 >= 50. This is False, so Python skips the indented if block.' },
          { line: 'else:', explanation: 'Runs automatically when the if condition is False.' },
          { line: 'print("Scan complete.")', explanation: 'Not indented—so this line ALWAYS runs at the end regardless of the branch!' },
        ],
        expectedOutput: 'Shield Status: LOW\nDiverting auxiliary power...\nScan complete.',
        commonMistakes: [
          'Using = instead of == inside an if condition (e.g. if x = 10: causes a SyntaxError).',
          'Forgetting the colon : at the end of if, elif, or else.',
          'Inconsistent indentation inside the same block.',
        ],
        quickQuestion: {
          question: 'Which operator checks whether two values are NOT equal in Python?',
          options: ['<>', '!=', '==!', 'not='],
          correctIndex: 1,
          explanation: '!= means "not equal to" (and == means "equal to").',
        },
      },
      {
        id: 'c4-t2',
        title: '2. Multi-Branch Decisions with elif',
        simpleExplanation:
          'When there are more than two possibilities, chain conditions using elif (short for "else if"). Python checks from top to bottom and runs ONLY the first branch that evaluates to True!',
        whyProgrammersUseIt:
          'Grading systems, ticket pricing tiers, and game rank badges (Gold, Silver, Bronze) all rely on ordered elif chains.',
        realWorldAnalogy:
          'Sorting coins through sieves from largest holes to smallest: once a coin falls through the first matching slot, it never reaches the lower slots.',
        pythonSyntax: 'if marks >= 90:\n    grade = "A*"\nelif marks >= 75:\n    grade = "A"\nelse:\n    grade = "B"',
        workingCodeExample: `points = int(input())

if points >= 1000:
    rank = "Grandmaster"
elif points >= 500:
    rank = "Commander"
elif points >= 200:
    rank = "Cadet"
else:
    rank = "Rookie"

print(f"Points: {points} -> Rank: {rank}")`,
        sampleInput: '650',
        lineByLineExplanation: [
          { line: 'if points >= 1000:', explanation: '650 >= 1000 is False; moves to next elif.' },
          { line: 'elif points >= 500:', explanation: '650 >= 500 is True! Sets rank = "Commander" and skips the remaining elif/else branches.' },
        ],
        expectedOutput: 'Points: 650 -> Rank: Commander',
        commonMistakes: [
          'Putting smaller thresholds first: if you check if points >= 200: BEFORE elif points >= 1000:, a score of 1200 will match >= 200 first and wrongly get "Cadet"!',
        ],
        quickQuestion: {
          question: 'In an if / elif / elif / else chain, how many branches can execute during a single run?',
          options: ['All branches that are True', 'At most ONE branch (the first one that is True)', 'At least two branches', 'Always the else branch'],
          correctIndex: 1,
          explanation: 'As soon as one branch in an if/elif/else chain is True, Python executes it and skips the rest of the chain.',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: Smart Theme Park Ticket & Discount Engine',
      description: 'Test different ages and order totals to watch Python jump to the matching branch in real time.',
      starterCode: `# Smart Ticket & Discount Engine
age = int(input())
order_amount = int(input())

if age < 5:
    ticket_type = "Free Toddler Pass"
    price = 0
elif age <= 12:
    ticket_type = "Junior Explorer"
    price = 300
elif age >= 60:
    ticket_type = "Senior VIP"
    price = 250
else:
    ticket_type = "Standard Adult"
    price = 500

total = price + order_amount
if total >= 1000:
    discount = 150
else:
    discount = 0

print(f"Pass: {ticket_type} (Rs {price})")
print(f"Discount Applied: Rs {discount}")
print(f"Final Bill: Rs {total - discount}")`,
      sampleInput: '10\n800',
      stepExplanations: [
        { line: 8, text: 'age is 10, so age <= 12 is True! Assigns Junior Explorer and price = 300.' },
        { line: 17, text: 'total = 300 + 800 = 1100.' },
        { line: 18, text: '1100 >= 1000 is True, so discount = 150.' },
      ],
      fullExplanation: 'Notice how two separate if statements execute independently, while branches inside a single if/elif/else are mutually exclusive.',
    },
    predictChallenges: [
      {
        id: 'c4-p1',
        title: 'Trace 1: First-Match Wins',
        code: `temp = 85
if temp > 50:
    print("Warm")
elif temp > 80:
    print("Hot")
else:
    print("Cool")`,
        expectedOutput: 'Warm',
        explanation: 'Because temp > 50 is checked FIRST and 85 > 50 is True, Python prints "Warm" and skips elif temp > 80!',
        difficulty: 'Starter',
      },
      {
        id: 'c4-p2',
        title: 'Trace 2: Two Separate if Statements vs elif',
        code: `n = 12
if n > 10:
    print("Alpha")
if n % 2 == 0:
    print("Beta")
else:
    print("Gamma")`,
        expectedOutput: 'Alpha\nBeta',
        explanation: 'The second if is a brand-new statement (not elif!), so both n > 10 and n % 2 == 0 are checked and both print.',
        difficulty: 'Intermediate',
      },
      {
        id: 'c4-p3',
        title: 'Trace 3: Indentation Boundary',
        code: `fuel = 20
if fuel > 50:
    print("Launch")
else:
    fuel = fuel + 40
print(fuel)`,
        expectedOutput: '60',
        explanation: '20 > 50 is False, so the else block adds 40 to fuel (making 60). Then print(fuel) outside the block prints 60.',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-4',
      lessonId: 4,
      title: 'Build a Smart Quiz Grader',
      objective: 'Create an automated grading engine that takes a student name and score (out of 100) and outputs the grade badge and personalised feedback.',
      materialsOrCodeRequired: 'Python IDE with student name and marks inputs.',
      starterCode: `# CLASS 4 ACTIVITY: SMART QUIZ GRADER
student = input()
score = int(input())

if score >= 90:
    grade = "S-Rank Distinction"
elif score >= 75:
    grade = "A-Rank Honours"
elif score >= 50:
    grade = "B-Rank Pass"
else:
    grade = "Revision Needed"

print(f"Cadet: {student}")
print(f"Score: {score}/100")
print(f"Result: {grade}")`,
      sampleInput: 'Hasthaksh\n94',
      teacherSolution: `student = input()
score = int(input())

if score >= 90:
    grade = "S-Rank Distinction"
elif score >= 75:
    grade = "A-Rank Honours"
elif score >= 50:
    grade = "B-Rank Pass"
else:
    grade = "Revision Needed"

print(f"Cadet: {student}")
print(f"Score: {score}/100")
print(f"Result: {grade}")`,
      teacherInstructions: [
        'Test boundary values with Hasthaksh: what happens when score is exactly 90, 75, 50, or 49?',
        'Ask him why >= 90 is better here than > 90.',
      ],
      studentInstructions: [
        'Check the score from highest threshold (90) down to 50.',
        'Test your grader with different inputs like 94, 75, and 42.',
      ],
      timeLimitMinutes: 12,
      expectedOutcome: 'Cadet: Hasthaksh\nScore: 94/100\nResult: S-Rank Distinction',
      reflectionQuestion: 'Why is testing boundary numbers (like 90 and 50) so important when building a grading program?',
    },
    debuggingMission: {
      id: 'dbg-4',
      title: 'The Backwards Rank Sorter',
      storyContext: 'Cadet Leo wrote a program to award "Gold" for 100+ points, "Silver" for 50+ points, and "Bronze" otherwise—but even a score of 250 gets "Silver"!',
      brokenCode: `# Fix the condition order and comparison bug!
score = int(input())

if score >= 50:
    medal = "Silver"
elif score >= 100:
    medal = "Gold"
else:
    medal = "Bronze"

print("Medal:", medal)`,
      sampleInput: '150',
      expectedOutput: 'Medal: Gold',
      bugType: 'Logic Error',
      hints: [
        'When score is 150, what does the very first line if score >= 50: evaluate to?',
        'Since 150 >= 50 is True, Python picks "Silver" immediately and never reaches elif score >= 100:!',
        'Swap the order so if score >= 100: comes first, followed by elif score >= 50:.',
      ],
      teacherFixedCode: `score = int(input())

if score >= 100:
    medal = "Gold"
elif score >= 50:
    medal = "Silver"
else:
    medal = "Bronze"

print("Medal:", medal)`,
      explanationOfFix: 'Always check the most specific / highest threshold (score >= 100) before the broader threshold (score >= 50).',
    },
    exitQuiz: [
      {
        id: 'c4-q1',
        type: 'mcq',
        prompt: 'What is the difference between = and == in Python?',
        options: [
          'They do the exact same thing',
          '= assigns a value to a variable, whereas == compares two values for equality',
          '== is for numbers and = is for strings',
          '= is used inside if statements',
        ],
        correctAnswer: '= assigns a value to a variable, whereas == compares two values for equality',
        points: 10,
        conceptTag: 'Comparison Operators',
        explanation: 'Use = to store values and == to compare values.',
      },
      {
        id: 'c4-q2',
        type: 'predict',
        prompt: 'Predict the output when x = 15:',
        codeSnippet: `x = 15\nif x > 20:\n    print("High")\nelif x >= 15:\n    print("Exact")\nelse:\n    print("Low")`,
        correctAnswer: 'Exact',
        points: 15,
        conceptTag: 'elif Branching',
        explanation: '15 > 20 is False, and 15 >= 15 is True, so "Exact" is printed.',
      },
      {
        id: 'c4-q3',
        type: 'identify_error',
        prompt: 'Identify the syntax error in this line: if points == 100',
        correctAnswer: 'Missing colon : at the end of the if statement',
        acceptableKeywords: ['colon', ':'],
        points: 15,
        conceptTag: 'Syntax',
        explanation: 'Every if, elif, and else header must end with a colon (:).',
      },
      {
        id: 'c4-q4',
        type: 'fill_code',
        prompt: 'Fill in the keyword for "else if" in Python:',
        codeSnippet: `if speed > 100:\n    print("Fast")\n____ speed > 50:\n    print("Medium")`,
        correctAnswer: 'elif',
        points: 10,
        conceptTag: 'Keywords',
        explanation: 'Python uses elif as the keyword for else-if.',
      },
      {
        id: 'c4-q5',
        type: 'predict',
        prompt: 'What does this program print?',
        codeSnippet: `coins = 50\nif coins != 50:\n    print("A")\nelse:\n    print("B")\nprint("C")`,
        correctAnswer: 'B\nC',
        points: 15,
        conceptTag: 'Indentation & Flow',
        explanation: 'coins != 50 is False, so "B" prints from else, and "C" prints because it is unindented.',
      },
      {
        id: 'c4-q6',
        type: 'coding',
        prompt: 'Write an if condition header (including the colon) that checks if a variable named temperature is less than or equal to 0.',
        correctAnswer: 'if temperature <= 0:',
        acceptableKeywords: ['if', 'temperature', '<=', '0:'],
        points: 20,
        conceptTag: 'Conditions',
        explanation: 'if temperature <= 0: checks whether temperature is 0 or negative.',
      },
    ],
    standards: {
      lessonId: 4,
      englandKS2: [
        'Use selection in programs',
        'Use logical reasoning to predict the behaviour of branching algorithms',
      ],
      cstaDomain: 'Programming',
      cstaOutcomeCode: 'CSTA-5-PRO-02',
      cstaOutcomeDescription: 'Develop programs with conditionals (if, elif, else) that respond differently to varied inputs.',
      cstaPractice: 'Testing and Refinement',
      relatedActivity: 'Smart Quiz Grader',
      assessmentEvidence: 'Class 4 Exit Quiz & Branching Drills',
      masteryIndicator: 'Orders elif thresholds properly and uses ==, !=, <=, >= accurately.',
      coverageStatus: 'Covered in Depth',
      responsibleComputingNote: 'Automated decision systems (like grading or ticket rules) should be fair, transparent, and tested on edge cases.',
    },
  },
  {
    id: 5,
    phase: 'PHASE 2: DECISION-MAKING',
    title: 'Logic Master',
    subtitle: 'Boolean Operators (and, or, not), Truth Tables & Nested Conditions',
    comicChapterTitle: 'CHAPTER 05: THE THREE-STAGE VAULT',
    illustrationTheme: 'lab',
    storyIntro:
      'Deep beneath the Academy lies the Quantum Research Vault. Single conditions aren’t enough to guard it—the vault requires multi-factor Boolean logic! Hasthaksh must master and, or, not, truth tables, and nested security checks.',
    realWorldScenario:
      'How does a spacecraft launch computer verify that fuel is full AND weather is clear AND no emergency override is active before igniting the thrusters?',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'Remember the golden rule of Boolean logic: "and" needs BOTH sides True, "or" needs AT LEAST ONE side True, and "not" flips True/False upside down!',
      },
      {
        speaker: 'Hasthaksh',
        role: 'Logic Master',
        line: 'Let’s test the truth tables and unlock all three vault airlocks!',
      },
    ],
    learningObjectives: [
      'Combine conditions using the logical operators and, or, and not.',
      'Evaluate compound Boolean expressions using Truth Tables.',
      'Write nested if statements for multi-stage decision-making.',
      'Avoid common natural-language pitfalls when writing compound conditions in Python.',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Accelerated Problem-Solving',
    topics: [
      'and, or, not operators',
      'Boolean expressions & Truth tables',
      'Nested if statements',
      'Combining multiple conditions',
    ],
    theoryBlocks: [
      {
        id: 'c5-t1',
        title: '1. Logical Operators (and, or, not) & Truth Tables',
        simpleExplanation:
          'and returns True only when BOTH conditions are True. or returns True when AT LEAST ONE condition is True. not reverses a Boolean (not True becomes False). When combining them, Python evaluates not first, then and, then or.',
        whyProgrammersUseIt:
          'Real-world rules depend on multiple factors at once—like checking if a player has enough gold AND is at least level 10.',
        realWorldAnalogy:
          'An AND gate is like two security keys that must be turned simultaneously. An OR gate is like a room with two light switches where flipping either switch turns the light on.',
        pythonSyntax: 'if has_keycard and clearance >= 3:\n    print("Access Granted")\nif is_admin or is_override:\n    print("Emergency Entry")',
        workingCodeExample: `level = int(input())
has_badge = input() == "yes"
alarm_active = input() == "yes"

if level >= 5 and has_badge and not alarm_active:
    print("VAULT STATUS: UNLOCKED")
else:
    print("VAULT STATUS: LOCKED")`,
        sampleInput: '7\nyes\nno',
        lineByLineExplanation: [
          { line: 'has_badge = input() == "yes"', explanation: 'Compares input to "yes" and stores a True/False bool directly!' },
          { line: 'if level >= 5 and has_badge and not alarm_active:', explanation: '7 >= 5 is True, has_badge is True, and not False is True. All three are True!' },
        ],
        expectedOutput: 'VAULT STATUS: UNLOCKED',
        commonMistakes: [
          'Writing if choice == "A" or "B": — in Python, "B" by itself is always truthy! You must write if choice == "A" or choice == "B":.',
        ],
        quickQuestion: {
          question: 'What does (True and False) or (not False) evaluate to?',
          options: ['True', 'False', 'None', 'SyntaxError'],
          correctIndex: 0,
          explanation: 'True and False is False. not False is True. False or True evaluates to True!',
        },
      },
      {
        id: 'c5-t2',
        title: '2. Nested if Statements (Decisions Inside Decisions)',
        simpleExplanation:
          'A nested if statement places one if/else block inside another indented if block. This lets your program check Stage 1 first, and only check Stage 2 if Stage 1 succeeded—giving specific feedback at each stage!',
        whyProgrammersUseIt:
          'Nested conditions let you tell a user WHY access failed (e.g., "Wrong ID" vs "Correct ID, but Wrong PIN") instead of a vague single error.',
        realWorldAnalogy:
          'Entering an airport: first you pass the ticket gate (outer if), and only once inside do you go through the boarding gate for your specific flight (inner if).',
        pythonSyntax: 'if badge_ok:\n    if pin == 1234:\n        print("Welcome!")\n    else:\n        print("Wrong PIN!")\nelse:\n    print("No Badge!")',
        workingCodeExample: `sector = input()
pin = int(input())

if sector == "OMEGA":
    print("Stage 1 Passed: Sector Verified")
    if pin == 4096:
        print("Stage 2 Passed: Vault Open!")
    else:
        print("Stage 2 Failed: Invalid PIN!")
else:
    print("Stage 1 Failed: Unknown Sector!")`,
        sampleInput: 'OMEGA\n9999',
        lineByLineExplanation: [
          { line: 'if sector == "OMEGA":', explanation: 'Outer condition is True, so it prints Stage 1 Passed and enters the inner check.' },
          { line: 'if pin == 4096:', explanation: 'Inner condition is False (9999 != 4096), so the inner else runs.' },
        ],
        expectedOutput: 'Stage 1 Passed: Sector Verified\nStage 2 Failed: Invalid PIN!',
        commonMistakes: [
          'Misaligning the inner else with the outer if instead of indenting it by 4 spaces to match the inner if.',
        ],
        quickQuestion: {
          question: 'Why might a programmer choose a nested if over a single "if a and b:" statement?',
          options: [
            'Nested if runs 100x faster',
            'To give different messages depending on which specific stage failed',
            'Python does not allow more than one and',
            'Nested if does not require colons',
          ],
          correctIndex: 1,
          explanation: 'Nested if blocks let you handle and explain each stage separately.',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: Three-Stage Quantum Lab Security Gate',
      description: 'Test combinations of clearance role, biometric code, and radiation suit status.',
      starterCode: `# Quantum Lab Security System
role = input()
bio_code = int(input())
suit_ready = input()

if role == "Scientist" or role == "Director":
    print("Check 1: Role Authorised")
    if bio_code >= 1000 and bio_code <= 9999:
        print("Check 2: 4-Digit Bio-Code Valid")
        if suit_ready == "yes":
            print("Check 3: Suit Sealed -> LAB ACCESS GRANTED!")
        else:
            print("Check 3: Hazard Suit Required!")
    else:
        print("Check 2: Bio-Code must be 4 digits!")
else:
    print("Check 1: Unauthorised Role!")`,
      sampleInput: 'Scientist\n4821\nyes',
      stepExplanations: [
        { line: 6, text: 'Checks if role is Scientist OR Director. True!' },
        { line: 8, text: 'Checks if bio_code is between 1000 and 9999 using AND. True!' },
        { line: 10, text: 'Checks inner-most condition suit_ready == "yes". True!' },
      ],
      fullExplanation: 'This demo combines OR, AND, and three nested levels so you can see exactly how multi-stage security gates operate.',
    },
    predictChallenges: [
      {
        id: 'c5-p1',
        title: 'Trace 1: Boolean Precedence',
        code: `a = True
b = False
c = True
print(a or b and not c)
print((a or b) and not c)`,
        expectedOutput: 'True\nFalse',
        explanation: 'In line 4, not c is False, b and False is False, and a or False is True. In line 5, (a or b) is True, and True and False is False!',
        difficulty: 'Starter',
      },
      {
        id: 'c5-p2',
        title: 'Trace 2: Range & Modulo Logic',
        code: `n = 18
if n >= 10 and n <= 20 and n % 4 == 0:
    print("Match")
elif n % 3 == 0 or n > 50:
    print("Partial")
else:
    print("None")`,
        expectedOutput: 'Partial',
        explanation: '18 is between 10 and 20, but 18 % 4 is 2 (not 0), so the first branch is False. In elif, 18 % 3 == 0 is True, printing "Partial".',
        difficulty: 'Intermediate',
      },
      {
        id: 'c5-p3',
        title: 'Trace 3: Nested Decision Tree',
        code: `weather = "rain"
temp = 12
if weather == "rain":
    if temp < 5:
        print("Snow Coat")
    else:
        print("Rain Jacket")
else:
    print("Sunglasses")`,
        expectedOutput: 'Rain Jacket',
        explanation: 'weather == "rain" is True, and inside it 12 < 5 is False, so it prints "Rain Jacket".',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-5',
      lessonId: 5,
      title: 'Secret Laboratory Access System',
      objective: 'Build a security gate that grants access if the user has a valid keycard AND either knows the secret passcode OR has an emergency override token.',
      materialsOrCodeRequired: 'Python IDE with 3 inputs: keycard ("yes"/"no"), passcode, override ("yes"/"no").',
      starterCode: `# CLASS 5 ACTIVITY: SECRET LABORATORY ACCESS SYSTEM
keycard = input()
passcode = input()
override = input()

if keycard == "yes" and (passcode == "PY- TITAN" or override == "yes"):
    print("ACCESS GRANTED: Welcome to Sector 7!")
else:
    print("ACCESS DENIED: Security Lock Engaged.")`,
      sampleInput: 'yes\nWRONG\nyes',
      teacherSolution: `keycard = input()
passcode = input()
override = input()

if keycard == "yes" and (passcode == "PY-TITAN" or override == "yes"):
    print("ACCESS GRANTED: Welcome to Sector 7!")
else:
    print("ACCESS DENIED: Security Lock Engaged.")`,
      teacherInstructions: [
        'Discuss with Hasthaksh why parentheses around (passcode == "PY-TITAN" or override == "yes") are vital.',
        'Test all 8 rows of the 3-input Truth Table together!',
      ],
      studentInstructions: [
        'Verify that keycard MUST be "yes", while either the passcode OR the override can satisfy the second requirement.',
        'Test different input combinations to confirm no intruder without a keycard can enter.',
      ],
      timeLimitMinutes: 12,
      expectedOutcome: 'ACCESS GRANTED: Welcome to Sector 7!',
      reflectionQuestion: 'What would happen if we removed the parentheses around the "or" part of the condition?',
    },
    debuggingMission: {
      id: 'dbg-5',
      title: 'The "Always-True" Door Bug',
      storyContext: 'Guard Bot checks if rank is "Captain" or "Admiral", but right now ANY word typed into rank unlocks the bridge!',
      brokenCode: `# Why does typing "Pirate" still unlock the bridge? Fix the bug!
rank = input()

if rank == "Captain" or "Admiral":
    print("Bridge Unlocked")
else:
    print("Intruder Alert")`,
      sampleInput: 'Pirate',
      expectedOutput: 'Intruder Alert',
      bugType: 'Logic Error',
      hints: [
        'Look at the right side of or: what is "Admiral" being compared to?',
        'In Python, a non-empty string like "Admiral" by itself is ALWAYS considered True!',
        'Write the full comparison on both sides of or: if rank == "Captain" or rank == "Admiral":',
      ],
      teacherFixedCode: `rank = input()

if rank == "Captain" or rank == "Admiral":
    print("Bridge Unlocked")
else:
    print("Intruder Alert")`,
      explanationOfFix: 'In Python, or separates two complete conditions. Writing rank == "Captain" or rank == "Admiral" properly compares rank against both titles.',
    },
    exitQuiz: [
      {
        id: 'c5-q1',
        type: 'mcq',
        prompt: 'When does (A and B) evaluate to True?',
        options: [
          'When either A or B is True',
          'Only when BOTH A is True and B is True',
          'When both A and B are False',
          'When A is True and B is False',
        ],
        correctAnswer: 'Only when BOTH A is True and B is True',
        points: 10,
        conceptTag: 'Boolean AND',
        explanation: 'The and operator requires both operands to be True.',
      },
      {
        id: 'c5-q2',
        type: 'predict',
        prompt: 'Predict the output of this Boolean check:',
        codeSnippet: `x = 8\nprint(x > 5 and not (x == 10))`,
        correctAnswer: 'True',
        points: 15,
        conceptTag: 'Boolean Expressions',
        explanation: '8 > 5 is True. 8 == 10 is False, and not False is True. True and True is True.',
      },
      {
        id: 'c5-q3',
        type: 'identify_error',
        prompt: 'What is wrong with this condition? if day == "Sat" or "Sun":',
        correctAnswer: 'You must write day == "Sun" after or because a non-empty string "Sun" is always truthy',
        acceptableKeywords: ['day ==', 'both', 'truthy', 'compare'],
        points: 15,
        conceptTag: 'Compound Conditions',
        explanation: 'Always write the full comparison on each side of or: if day == "Sat" or day == "Sun":.',
      },
      {
        id: 'c5-q4',
        type: 'predict',
        prompt: 'What is printed when score = 70 and bonus = False?',
        codeSnippet: `score = 70\nbonus = False\nif score >= 80 or bonus:\n    print("Win")\nelse:\n    print("Retry")`,
        correctAnswer: 'Retry',
        points: 15,
        conceptTag: 'Boolean OR',
        explanation: 'Both 70 >= 80 (False) and bonus (False) are False, so False or False is False.',
      },
      {
        id: 'c5-q5',
        type: 'fill_code',
        prompt: 'Fill in the logical operator so the message prints only when age is between 10 and 15 inclusive:',
        codeSnippet: `if age >= 10 ___ age <= 15:\n    print("Junior League")`,
        correctAnswer: 'and',
        points: 15,
        conceptTag: 'Range Checks',
        explanation: 'Both lower and upper bounds must hold simultaneously, so use and.',
      },
      {
        id: 'c5-q6',
        type: 'coding',
        prompt: 'Write an if header (with colon) that checks if a boolean variable named is_locked is False using the not operator.',
        correctAnswer: 'if not is_locked:',
        acceptableKeywords: ['if', 'not', 'is_locked:'],
        points: 20,
        conceptTag: 'Logical NOT',
        explanation: 'if not is_locked: evaluates to True when is_locked is False.',
      },
    ],
    standards: {
      lessonId: 5,
      englandKS2: [
        'Use selection and compound logical conditions in programs',
        'Use logical reasoning to evaluate Boolean truth tables',
      ],
      cstaDomain: 'Systems & Security',
      cstaOutcomeCode: 'CSTA-5-SAS-01',
      cstaOutcomeDescription: 'Model multi-factor access control and decision logic using Boolean operators (and, or, not) and truth tables.',
      cstaPractice: 'Computational Thinking & Ethics and Social Responsibility',
      relatedActivity: 'Secret Laboratory Access System',
      assessmentEvidence: 'Class 5 Exit Quiz & Three-Stage Security Boss Challenge',
      masteryIndicator: 'Constructs compound Boolean conditions and truth tables without truthiness bugs.',
      coverageStatus: 'Covered in Depth',
      responsibleComputingNote: 'Multi-factor authentication (combining something you have, like a keycard, with something you know, like a PIN) keeps accounts safe online.',
    },
  },
  {
    id: 6,
    phase: 'PHASE 3: LOOP MASTERY',
    title: 'Loop Factory',
    subtitle: 'for Loops, range(start, stop, step), String Iteration & Accumulators',
    comicChapterTitle: 'CHAPTER 06: THE AUTOMATION ENGINE',
    illustrationTheme: 'factory',
    storyIntro:
      'Imagine having to tell a robot to take 100 steps. Would you write 100 separate instructions? Can you teach it one instruction that repeats? Inside the Academy’s Loop Factory, Hasthaksh harnesses the for loop to automate thousands of tasks in three lines of code!',
    realWorldScenario:
      'From printing a 12-times multiplication table to scanning every letter in a DNA strand or adding up 50 cricket scores, for loops automate definite repetition effortlessly.',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'Just like string slicing, range(start, stop, step) always stops ONE BEFORE the stop number!',
      },
      {
        speaker: 'Hasthaksh',
        role: 'Loop Engineer',
        line: 'So range(1, 11) counts 1 through 10. Let’s fire up the Loop Factory!',
      },
    ],
    learningObjectives: [
      'Use for loops with range(stop), range(start, stop), and range(start, stop, step) to repeat actions.',
      'Count forwards, count backwards using a negative step, and generate number multiples.',
      'Iterate directly over characters in a string using a for loop.',
      'Use an accumulator variable (like total = 0) inside a loop to calculate sums.',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Intermediate Foundations',
    topics: [
      'for loops & Repetition',
      'range(stop), range(start, stop), range(start, stop, step)',
      'Counting backwards & Multiples',
      'Iterating over strings',
      'Accumulator variables (calculating sums)',
    ],
    theoryBlocks: [
      {
        id: 'c6-t1',
        title: '1. The for Loop & range(start, stop, step)',
        simpleExplanation:
          'A for loop repeats an indented block of code a set number of times. range(5) produces 0, 1, 2, 3, 4. range(1, 6) produces 1, 2, 3, 4, 5. range(10, 0, -2) counts backwards by 2s: 10, 8, 6, 4, 2!',
        whyProgrammersUseIt:
          'Writing repeated code is slow and error-prone. A 3-line for loop can run 10 times or 10,000 times just by changing the range number.',
        realWorldAnalogy:
          'Setting a robotic stamping machine to stamp crates numbered 1 to 10 automatically along a conveyor belt.',
        pythonSyntax: 'for i in range(1, 6):\n    print("Crate", i)',
        workingCodeExample: `print("--- Forward 1 to 5 ---")
for num in range(1, 6):
    print(f"Step {num}")

print("--- Evens 2 to 8 ---")
for even in range(2, 10, 2):
    print(even)`,
        lineByLineExplanation: [
          { line: 'for num in range(1, 6):', explanation: 'num takes values 1, 2, 3, 4, 5 (stops before 6).' },
          { line: 'for even in range(2, 10, 2):', explanation: 'Starts at 2, steps by +2 each time (2, 4, 6, 8), stopping before 10.' },
        ],
        expectedOutput: '--- Forward 1 to 5 ---\nStep 1\nStep 2\nStep 3\nStep 4\nStep 5\n--- Evens 2 to 8 ---\n2\n4\n6\n8',
        commonMistakes: [
          'Off-by-one boundary error: writing range(1, 10) when you want to include 10 (you must write range(1, 11)).',
          'Forgetting the negative step -1 when counting backwards: range(5, 0) produces nothing unless you write range(5, 0, -1).',
        ],
        quickQuestion: {
          question: 'Which numbers are generated by range(3, 12, 3)?',
          options: ['3, 6, 9, 12', '3, 6, 9', '0, 3, 6, 9', '3, 4, 5, 6, 7, 8, 9, 10, 11'],
          correctIndex: 1,
          explanation: 'Starts at 3, adds 3 each step (3, 6, 9), and stops before reaching 12.',
        },
      },
      {
        id: 'c6-t2',
        title: '2. Accumulators (Calculating Sums) & Looping Over Strings',
        simpleExplanation:
          'To add up numbers in a loop, create an accumulator variable (total = 0) BEFORE the loop starts, and add to it inside the loop (total += i). You can also loop directly through every character in a string: for ch in word:!',
        whyProgrammersUseIt:
          'Accumulators compute total scores, bank balances, and vowel counts across text.',
        realWorldAnalogy:
          'A piggy bank (total = 0) sitting on a table: each time the loop runs, you drop new coins into the bank.',
        pythonSyntax: 'total = 0\nfor n in range(1, 6):\n    total += n\nprint(total)',
        workingCodeExample: `word = input()
vowel_count = 0

for ch in word.lower():
    if ch in "aeiou":
        vowel_count += 1

print(f"Word: {word}")
print(f"Vowels found: {vowel_count}")`,
        sampleInput: 'Astronaut',
        lineByLineExplanation: [
          { line: 'vowel_count = 0', explanation: 'Initialises the counter to 0 BEFORE the loop begins.' },
          { line: 'for ch in word.lower():', explanation: 'Loops through each character one by one ("a", "s", "t", ...).' },
          { line: 'vowel_count += 1', explanation: 'Increases vowel_count by 1 whenever ch is a vowel.' },
        ],
        expectedOutput: 'Word: Astronaut\nVowels found: 4',
        commonMistakes: [
          'Putting total = 0 INSIDE the for loop—which resets the piggy bank back to 0 on every single turn!',
        ],
        quickQuestion: {
          question: 'What happens if you place total = 0 inside the for loop body instead of above the loop?',
          options: [
            'It calculates the sum faster',
            'total gets reset to 0 on every iteration and only remembers the last value',
            'Python raises a SyntaxError',
            'The loop runs forever',
          ],
          correctIndex: 1,
          explanation: 'Resetting total = 0 inside the loop wipes out the accumulated sum on every repetition.',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: Custom Multiplication Table & Sum Factory',
      description: 'Enter any number to generate its multiplication table and the grand total of all products.',
      starterCode: `# Multiplication Table & Sum Factory
base = int(input())
limit = int(input())
grand_total = 0

for i in range(1, limit + 1):
    product = base * i
    grand_total += product
    print(f"{base} x {i} = {product}")

print(f"Sum of Table: {grand_total}")`,
      sampleInput: '7\n5',
      stepExplanations: [
        { line: 4, text: 'Initialises grand_total = 0 before starting the loop.' },
        { line: 6, text: 'Loops i from 1 to limit (5) inclusive using range(1, limit + 1).' },
        { line: 8, text: 'Adds each product (7, 14, 21, 28, 35) to grand_total.' },
      ],
      fullExplanation: 'Using limit + 1 inside range() ensures the loop includes the final number requested by the user.',
    },
    predictChallenges: [
      {
        id: 'c6-p1',
        title: 'Trace 1: Backward Step Range',
        code: `for k in range(10, 3, -3):
    print(k)`,
        expectedOutput: '10\n7\n4',
        explanation: 'Starts at 10, subtracts 3 each time: 10, 7, 4. Next would be 1, which is not > 3, so it stops.',
        difficulty: 'Starter',
      },
      {
        id: 'c6-p2',
        title: 'Trace 2: Accumulator Sum',
        code: `total = 0
for n in range(1, 5):
    total = total + n * 2
print(total)`,
        expectedOutput: '20',
        explanation: 'n takes 1, 2, 3, 4. It adds 2 + 4 + 6 + 8 = 20.',
        difficulty: 'Intermediate',
      },
      {
        id: 'c6-p3',
        title: 'Trace 3: String Filter Loop',
        code: `code = "R2-D2-C3PO"
digits = ""
for ch in code:
    if ch.isdigit():
        digits += ch
print(digits)`,
        expectedOutput: '223',
        explanation: 'The loop checks each character and appends only digits ("2", "2", "3") to digits.',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-6',
      lessonId: 6,
      title: 'Multiplication Table Generator',
      objective: 'Build an interactive Multiplication Table Generator that prints the table for any chosen number up to 10 and highlights even products.',
      materialsOrCodeRequired: 'Python IDE with table number input.',
      starterCode: `# CLASS 6 ACTIVITY: MULTIPLICATION TABLE GENERATOR
n = int(input())

print(f"=== {n} TIMES TABLE ===")
for i in range(1, 11):
    ans = n * i
    print(f"{n} x {i} = {ans}")`,
      sampleInput: '9',
      teacherSolution: `n = int(input())

print(f"=== {n} TIMES TABLE ===")
for i in range(1, 11):
    ans = n * i
    print(f"{n} x {i} = {ans}")`,
      teacherInstructions: [
        'Run the table for 9, 12, and 17 with Hasthaksh.',
        'Challenge him to modify range(1, 11) so it prints the table in reverse from 10 down to 1!',
      ],
      studentInstructions: [
        'Read the integer n from input.',
        'Use a for loop with range(1, 11) to calculate and print n x 1 through n x 10.',
      ],
      timeLimitMinutes: 12,
      expectedOutcome: '=== 9 TIMES TABLE ===\n9 x 1 = 9\n9 x 2 = 18\n9 x 3 = 27\n9 x 4 = 36\n9 x 5 = 45\n9 x 6 = 54\n9 x 7 = 63\n9 x 8 = 72\n9 x 9 = 81\n9 x 10 = 90',
      reflectionQuestion: 'How many lines of code would you have needed to change to print up to 100 instead of 10?',
    },
    debuggingMission: {
      id: 'dbg-6',
      title: 'The Missing 10th Lap & Reset Bug',
      storyContext: 'Coach Bot wants to add up the lap times for 5 laps (numbered 1 to 5), but the loop stops at 4 and forgets all earlier laps!',
      brokenCode: `# Fix the 2 bugs so total_points adds 10 + 20 + 30 + 40 + 50 = 150!
for lap in range(1, 5):
    total_points = 0
    total_points = total_points + lap * 10

print("Total Points:", total_points)`,
      sampleInput: '',
      expectedOutput: 'Total Points: 150',
      bugType: 'Logic Error',
      hints: [
        'Bug 1: Where is total_points = 0 placed right now? What happens on every lap?',
        'Bug 2: Does range(1, 5) include lap 5, or stop at 4?',
        'Move total_points = 0 ABOVE the for loop, and change the range to range(1, 6).',
      ],
      teacherFixedCode: `total_points = 0
for lap in range(1, 6):
    total_points = total_points + lap * 10

print("Total Points:", total_points)`,
      explanationOfFix: 'Initialising total_points = 0 before the loop preserves the running total, and range(1, 6) includes lap 5.',
    },
    exitQuiz: [
      {
        id: 'c6-q1',
        type: 'mcq',
        prompt: 'How many times does the loop body execute in: for i in range(4):?',
        options: ['3 times', '4 times (for i = 0, 1, 2, 3)', '5 times', '1 time'],
        correctAnswer: '4 times (for i = 0, 1, 2, 3)',
        points: 10,
        conceptTag: 'range()',
        explanation: 'range(4) produces 4 values: 0, 1, 2, and 3.',
      },
      {
        id: 'c6-q2',
        type: 'predict',
        prompt: 'What is the output of this loop?',
        codeSnippet: `for x in range(2, 9, 3):\n    print(x)`,
        correctAnswer: '2\n5\n8',
        points: 15,
        conceptTag: 'range(start, stop, step)',
        explanation: 'Starts at 2, adds 3 each time (2, 5, 8), stopping before 9.',
      },
      {
        id: 'c6-q3',
        type: 'fill_code',
        prompt: 'Complete the range to count backwards from 5 down to 1: range(5, 0, ___)',
        codeSnippet: `for i in range(5, 0, ___):`,
        correctAnswer: '-1',
        points: 15,
        conceptTag: 'Counting Backwards',
        explanation: 'A step of -1 counts down by 1 each iteration.',
      },
      {
        id: 'c6-q4',
        type: 'predict',
        prompt: 'Predict the final value printed:',
        codeSnippet: `s = 0\nfor i in range(1, 4):\n    s += i\nprint(s)`,
        correctAnswer: '6',
        points: 15,
        conceptTag: 'Accumulators',
        explanation: '1 + 2 + 3 = 6.',
      },
      {
        id: 'c6-q5',
        type: 'identify_error',
        prompt: 'Why does for i in range(1, 10): only print up to 9 when the student wanted 1 to 10?',
        correctAnswer: 'The stop value in range is exclusive so it must be range(1, 11)',
        acceptableKeywords: ['11', 'stop', 'exclusive', 'before'],
        points: 15,
        conceptTag: 'Loop Boundaries',
        explanation: 'range(start, stop) stops at stop - 1, so use range(1, 11) to include 10.',
      },
      {
        id: 'c6-q6',
        type: 'coding',
        prompt: 'Write a for loop header (with colon) that iterates through each character ch in a string variable called message.',
        correctAnswer: 'for ch in message:',
        acceptableKeywords: ['for', 'ch', 'in', 'message:'],
        points: 20,
        conceptTag: 'String Iteration',
        explanation: 'for ch in message: visits each character of message in sequence.',
      },
    ],
    standards: {
      lessonId: 6,
      englandKS2: [
        'Use repetition in programs',
        'Design and write programs that accomplish specific goals using count-controlled loops',
      ],
      cstaDomain: 'Programming',
      cstaOutcomeCode: 'CSTA-5-PRO-03',
      cstaOutcomeDescription: 'Construct programs using count-controlled loops (for and range) to automate repetitive computations.',
      cstaPractice: 'Computational Thinking',
      relatedActivity: 'Multiplication Table Generator',
      assessmentEvidence: 'Class 6 Exit Quiz & Loop Factory Practice Bank',
      masteryIndicator: 'Uses range(start, stop, step) and accumulator variables accurately.',
      coverageStatus: 'Covered in Depth',
      responsibleComputingNote: 'Automation saves huge amounts of human effort—double-check loop boundaries so automated reports never skip the last item!',
    },
  },
  {
    id: 7,
    phase: 'PHASE 3: LOOP MASTERY',
    title: 'Countdown Mission',
    subtitle: 'while Loops, Loop Conditions, Counters, break, continue & Infinite Loops',
    comicChapterTitle: 'CHAPTER 07: IGNITION AT T-MINUS ZERO',
    illustrationTheme: 'rocket',
    storyIntro:
      'What happens when you don’t know in advance how many times a loop needs to repeat—like waiting for a secret launch code or guessing a hidden number? At Orbital Pad 7, Hasthaksh takes command of Python’s condition-controlled while loop!',
    realWorldScenario:
      'Think of a rocket launch countdown, a password prompt that keeps asking until you enter the right PIN or run out of tries, or a game loop that runs while player_health > 0.',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'Warning, Commander! Every while loop MUST update its loop variable inside the body—otherwise you trigger a dreaded Infinite Loop!',
      },
      {
        speaker: 'Hasthaksh',
        role: 'Launch Director',
        line: 'Counter set, break override armed. Commencing countdown!',
      },
    ],
    learningObjectives: [
      'Write condition-controlled while loops that repeat as long as a condition is True.',
      'Initialise and update counter variables inside while loops to prevent infinite loops.',
      'Control loop flow using break (to exit early) and continue (to skip to the next iteration).',
      'Predict the exact number of iterations a while loop will execute.',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Accelerated Problem-Solving',
    topics: [
      'while loops & Loop conditions',
      'Updating counters',
      'Infinite loops & how to fix them',
      'break and continue statements',
      'Repeated user input & guessing loops',
    ],
    theoryBlocks: [
      {
        id: 'c7-t1',
        title: '1. How while Loops Work & Preventing Infinite Loops',
        simpleExplanation:
          'A while loop checks a condition before every turn. As long as the condition is True, the indented body runs. You must follow the 3-Step Rule: 1) Initialise the variable before the loop, 2) Test the condition in while, 3) Update the variable inside the loop!',
        whyProgrammersUseIt:
          'for loops are great when you know the count ahead of time, but while loops are essential when repetition depends on user input or changing game state.',
        realWorldAnalogy:
          'Stirring soup while it is not boiling: you check the pot, stir once, and check again until bubbles appear.',
        pythonSyntax: 'count = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint("Liftoff!")',
        workingCodeExample: `timer = 5
while timer > 0:
    print(f"T-minus {timer}...")
    timer = timer - 1

print("BOOSTER IGNITION! LIFTOFF!")`,
        lineByLineExplanation: [
          { line: 'timer = 5', explanation: 'Rule 1 (Initialise): starts timer at 5.' },
          { line: 'while timer > 0:', explanation: 'Rule 2 (Condition): keeps looping while timer is greater than 0.' },
          { line: 'timer = timer - 1', explanation: 'Rule 3 (Update): decreases timer by 1 each turn so it eventually reaches 0 and stops!' },
        ],
        expectedOutput: 'T-minus 5...\nT-minus 4...\nT-minus 3...\nT-minus 2...\nT-minus 1...\nBOOSTER IGNITION! LIFTOFF!',
        commonMistakes: [
          'Forgetting timer = timer - 1 inside the loop—causing timer to stay 5 forever (an Infinite Loop!).',
          'Writing timer = timer + 1 when counting down toward 0.',
        ],
        quickQuestion: {
          question: 'Why does while x < 10: print(x) cause an infinite loop if x starts at 1 and there are no other lines?',
          options: [
            'Because 1 is an odd number',
            'Because x is never updated inside the loop, so x < 10 stays True forever',
            'Because while loops cannot print numbers',
            'Because 10 is too small',
          ],
          correctIndex: 1,
          explanation: 'Without changing x inside the loop, x remains 1 forever and x < 10 never becomes False.',
        },
      },
      {
        id: 'c7-t2',
        title: '2. Emergency Controls: break and continue',
        simpleExplanation:
          'break immediately exits the loop—like pulling an emergency stop lever when the player guesses the right answer! continue skips the rest of the current turn and jumps straight back to the top of the loop.',
        whyProgrammersUseIt:
          'break lets you stop a search or guessing game the instant the target is found, without wasting remaining attempts.',
        realWorldAnalogy:
          'Searching through your backpack for a house key: once you find the key, you STOP searching (break)—you don’t keep emptying the rest of the bag!',
        pythonSyntax: 'while True:\n    cmd = input()\n    if cmd == "stop":\n        break',
        workingCodeExample: `secret_number = 7
attempts = 0

while attempts < 5:
    guess = int(input())
    attempts += 1
    if guess == secret_number:
        print(f"Unlocked in {attempts} tries!")
        break
    else:
        print("Wrong code, try again.")`,
        sampleInput: '3\n9\n7',
        lineByLineExplanation: [
          { line: 'while attempts < 5:', explanation: 'Allows up to 5 attempts.' },
          { line: 'if guess == secret_number:', explanation: 'When guess is 7 (on try 3), prints success and hits break.' },
          { line: 'break', explanation: 'Exits the while loop immediately without asking for guesses 4 or 5!' },
        ],
        expectedOutput: 'Wrong code, try again.\nWrong code, try again.\nUnlocked in 3 tries!',
        commonMistakes: [
          'Putting code right after break inside the same block—any line immediately below break will never be reached.',
        ],
        quickQuestion: {
          question: 'What is the difference between break and continue inside a loop?',
          options: [
            'break exits the entire loop immediately; continue skips the rest of the current turn and starts the next turn',
            'break pauses for 5 seconds; continue deletes variables',
            'They do the exact same thing',
            'continue exits the loop; break restarts the computer',
          ],
          correctIndex: 0,
          explanation: 'break terminates the loop completely; continue jumps to the next iteration.',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: Rocket Fuel Burn & Emergency Abort',
      description: 'Watch how a while loop tracks altitude and fuel each second until orbit is reached.',
      starterCode: `# Rocket Orbit Simulator
altitude = 0
fuel = int(input())
seconds = 0

while altitude < 100 and fuel >= 20:
    seconds += 1
    altitude += 25
    fuel -= 20
    print(f"Sec {seconds}: Altitude {altitude}km | Fuel {fuel}%")

if altitude >= 100:
    print("ORBIT ACHIEVED!")
else:
    print("LOW FUEL ABORT!")`,
      sampleInput: '90',
      stepExplanations: [
        { line: 6, text: 'Loops while BOTH altitude < 100 AND fuel >= 20.' },
        { line: 8, text: 'Each second adds 25km altitude and burns 20% fuel.' },
        { line: 12, text: 'After 4 seconds, altitude reaches 100km (with 10% fuel left) and orbit is achieved!' },
      ],
      fullExplanation: 'Combining a compound condition in while with counter updates creates a realistic physics/game loop.',
    },
    predictChallenges: [
      {
        id: 'c7-p1',
        title: 'Trace 1: Doubling Loop',
        code: `n = 2
steps = 0
while n < 30:
    n = n * 2
    steps += 1
print(n, steps)`,
        expectedOutput: '32 4',
        explanation: 'n doubles each turn: 2 -> 4 (step 1) -> 8 (step 2) -> 16 (step 3) -> 32 (step 4). Now 32 < 30 is False!',
        difficulty: 'Starter',
      },
      {
        id: 'c7-p2',
        title: 'Trace 2: break vs continue',
        code: `i = 0
while i < 6:
    i += 1
    if i == 2:
        continue
    if i == 5:
        break
    print(i)`,
        expectedOutput: '1\n3\n4',
        explanation: 'Prints 1, skips 2 via continue, prints 3 and 4, and exits when i == 5 via break.',
        difficulty: 'Intermediate',
      },
      {
        id: 'c7-p3',
        title: 'Trace 3: Digit Sum Extractor',
        code: `num = 472
digit_sum = 0
while num > 0:
    digit_sum += num % 10
    num = num // 10
print(digit_sum)`,
        expectedOutput: '13',
        explanation: 'Extracts last digit with % 10 and removes it with // 10: 2 + 7 + 4 = 13!',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-7',
      lessonId: 7,
      title: 'Rocket Launch Countdown',
      objective: 'Create a customisable Rocket Launch Countdown that counts down from a chosen start number, announces booster checks at T-3, and blasts off at 0.',
      materialsOrCodeRequired: 'Python IDE with start countdown number input.',
      starterCode: `# CLASS 7 ACTIVITY: ROCKET LAUNCH COUNTDOWN
count = int(input())

while count > 0:
    if count == 3:
        print("T-3: Main Engines Armed!")
    else:
        print(f"T-{count}")
    count -= 1

print("0: LIFTOFF TO MARS!")`,
      sampleInput: '5',
      teacherSolution: `count = int(input())

while count > 0:
    if count == 3:
        print("T-3: Main Engines Armed!")
    else:
        print(f"T-{count}")
    count -= 1

print("0: LIFTOFF TO MARS!")`,
      teacherInstructions: [
        'Run the countdown with Hasthaksh and show him what happens in our safety sandbox if count -= 1 is commented out (the Timeout protection catches the infinite loop!).',
      ],
      studentInstructions: [
        'Read the starting countdown integer.',
        'Loop while count > 0, printing the special message at T-3 and decreasing count by 1 each second.',
      ],
      timeLimitMinutes: 12,
      expectedOutcome: 'T-5\nT-4\nT-3: Main Engines Armed!\nT-2\nT-1\n0: LIFTOFF TO MARS!',
      reflectionQuestion: 'When should you choose a while loop instead of a for loop?',
    },
    debuggingMission: {
      id: 'dbg-7',
      title: 'The Runaway Thruster Infinite Loop',
      storyContext: 'Pilot Zara tried to count up from 1 to 4, but she accidentally placed the counter update outside the indentation—triggering an infinite loop!',
      brokenCode: `# Fix the indentation bug so the loop prints 1, 2, 3, 4 and stops!
step = 1
while step <= 4:
    print(f"Thruster {step}")
step = step + 1
print("All Thrusters Online")`,
      sampleInput: '',
      expectedOutput: 'Thruster 1\nThruster 2\nThruster 3\nThruster 4\nAll Thrusters Online',
      bugType: 'Runtime Error',
      hints: [
        'Look at line 5: step = step + 1 is NOT indented inside the while loop!',
        'Because step = step + 1 is outside the loop, step stays 1 forever inside the while loop.',
        'Indent step = step + 1 by 4 spaces so it runs inside the while block.',
      ],
      teacherFixedCode: `step = 1
while step <= 4:
    print(f"Thruster {step}")
    step = step + 1
print("All Thrusters Online")`,
      explanationOfFix: 'Indenting step = step + 1 places it inside the while loop body so step increments on every iteration and terminates after 4.',
    },
    exitQuiz: [
      {
        id: 'c7-q1',
        type: 'mcq',
        prompt: 'What causes an infinite loop in a while statement?',
        options: [
          'Using print() inside the loop',
          'The loop condition never becomes False (and no break is triggered)',
          'Using a variable name longer than 5 letters',
          'Running the loop more than 3 times',
        ],
        correctAnswer: 'The loop condition never becomes False (and no break is triggered)',
        points: 10,
        conceptTag: 'Infinite Loops',
        explanation: 'A while loop repeats until its condition becomes False or a break statement executes.',
      },
      {
        id: 'c7-q2',
        type: 'predict',
        prompt: 'How many times will "Ping" be printed?',
        codeSnippet: `n = 10\nwhile n > 4:\n    print("Ping")\n    n -= 2`,
        correctAnswer: '3',
        points: 15,
        conceptTag: 'Iteration Count',
        explanation: 'n starts at 10 (Ping 1 -> n=8), 8 > 4 (Ping 2 -> n=6), 6 > 4 (Ping 3 -> n=4). Then 4 > 4 is False.',
      },
      {
        id: 'c7-q3',
        type: 'fill_code',
        prompt: 'Which keyword immediately exits a loop when the secret word is guessed?',
        codeSnippet: `if guess == secret:\n    _____`,
        correctAnswer: 'break',
        points: 15,
        conceptTag: 'break',
        explanation: 'break exits the enclosing loop immediately.',
      },
      {
        id: 'c7-q4',
        type: 'predict',
        prompt: 'Predict the output of this while loop:',
        codeSnippet: `x = 1\nwhile x < 10:\n    x = x * 3\nprint(x)`,
        correctAnswer: '27',
        points: 15,
        conceptTag: 'Loop Tracing',
        explanation: 'x = 1 -> 3 -> 9 -> 27. Once x is 27, 27 < 10 is False, and print(x) outputs 27.',
      },
      {
        id: 'c7-q5',
        type: 'identify_error',
        prompt: 'What is wrong with this countdown loop? c = 5\nwhile c > 0:\n    print(c)\n    c += 1',
        correctAnswer: 'It adds 1 instead of subtracting 1 so c grows forever causing an infinite loop',
        acceptableKeywords: ['subtract', '-=', 'infinite', 'adds', '- 1'],
        points: 15,
        conceptTag: 'Counter Update',
        explanation: 'Counting down from 5 toward 0 requires c -= 1 (or c = c - 1), not c += 1.',
      },
      {
        id: 'c7-q6',
        type: 'coding',
        prompt: 'Write a while loop header (with colon) that continues running as long as fuel is greater than 0.',
        correctAnswer: 'while fuel > 0:',
        acceptableKeywords: ['while', 'fuel', '>', '0:'],
        points: 20,
        conceptTag: 'while Syntax',
        explanation: 'while fuel > 0: repeats the loop body while fuel remains positive.',
      },
    ],
    standards: {
      lessonId: 7,
      englandKS2: [
        'Use condition-controlled repetition in programs',
        'Detect and correct infinite loops and logic errors in algorithms',
      ],
      cstaDomain: 'Programming',
      cstaOutcomeCode: 'CSTA-5-PRO-04',
      cstaOutcomeDescription: 'Design condition-controlled while loops with proper termination conditions and state updates.',
      cstaPractice: 'Testing and Refinement',
      relatedActivity: 'Rocket Launch Countdown',
      assessmentEvidence: 'Class 7 Exit Quiz & Countdown Practice Drills',
      masteryIndicator: 'Writes terminating while loops and traces iteration counts accurately.',
      coverageStatus: 'Covered in Depth',
      responsibleComputingNote: 'Real spacecraft software uses watchdog timers to detect stuck loops—just like our Quest IDE’s timeout shield!',
    },
  },
  {
    id: 8,
    phase: 'PHASE 3: LOOP MASTERY',
    title: 'Pattern Generator',
    subtitle: 'Nested Loops, Rows & Columns, Star Grids & Number Pyramids',
    comicChapterTitle: 'CHAPTER 08: MATRIX OF THE HOLO-GRID',
    illustrationTheme: 'grid',
    storyIntro:
      'How do video games draw tile maps, pixel art shields, and 2D coordinate grids? By placing a loop INSIDE another loop! In the Holo-Grid Chamber, Hasthaksh unlocks Nested Loops to build star pyramids, coordinate matrices, and custom multiplication grids.',
    realWorldScenario:
      'Think of reading a page in a comic book: for every row (outer loop), your eyes scan across every panel from left to right (inner loop) before moving down to the next row.',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'In a nested loop, for EVERY SINGLE turn of the outer row loop, the inner column loop runs ALL the way from start to finish!',
      },
      {
        speaker: 'Hasthaksh',
        role: 'Pattern Architect',
        line: 'So a 4-row by 5-column nested loop runs 4 × 5 = 20 times in total!',
      },
    ],
    learningObjectives: [
      'Explain how an outer loop (rows) and an inner loop (columns) work together.',
      'Calculate the total number of inner executions in a nested loop.',
      'Generate rectangular grids, right-triangle star patterns, and number staircases.',
      'Build a custom Multiplication Grid using nested loops.',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Accelerated Problem-Solving',
    topics: [
      'Nested loops (loop inside a loop)',
      'Rows and columns mental model',
      'Star patterns & Number pyramids',
      'Grid generation & Multiplication grids',
    ],
    theoryBlocks: [
      {
        id: 'c8-t1',
        title: '1. Outer Loops (Rows) & Inner Loops (Columns)',
        simpleExplanation:
          'When you put an inner loop inside an outer loop, the outer loop controls which ROW you are on, and the inner loop builds the COLUMNS across that row. Once the inner loop finishes a row, Python prints the line and advances the outer loop to the next row.',
        whyProgrammersUseIt:
          '2D game boards (chess, mazes, pixel screens), spreadsheets, and seating charts all require row-by-column traversal.',
        realWorldAnalogy:
          'A clock’s hands: for every 1 step of the hour hand (outer loop), the minute hand completes all 60 steps around the dial (inner loop).',
        pythonSyntax: 'for r in range(1, 4):\n    line = ""\n    for c in range(1, 4):\n        line += f"({r},{c}) "\n    print(line.strip())',
        workingCodeExample: `rows = 3
cols = 4

for r in range(1, rows + 1):
    row_text = ""
    for c in range(1, cols + 1):
        row_text += f"[{r},{c}] "
    print(row_text.strip())`,
        lineByLineExplanation: [
          { line: 'for r in range(1, rows + 1):', explanation: 'Outer loop runs 3 times for rows r = 1, 2, 3.' },
          { line: 'row_text = ""', explanation: 'Resets row_text to empty at the start of each new row.' },
          { line: 'for c in range(1, cols + 1):', explanation: 'Inner loop runs 4 times (c = 1, 2, 3, 4) for each row!' },
        ],
        expectedOutput: '[1,1] [1,2] [1,3] [1,4]\n[2,1] [2,2] [2,3] [2,4]\n[3,1] [3,2] [3,3] [3,4]',
        commonMistakes: [
          'Using the same loop variable name (like i) for both the outer and inner loop!',
          'Printing inside the inner loop when you wanted one complete row per line.',
        ],
        quickQuestion: {
          question: 'If an outer loop runs 5 times and its inner loop runs 6 times per outer turn, how many times does the inner loop body execute in total?',
          options: ['11 times', '30 times', '5 times', '36 times'],
          correctIndex: 1,
          explanation: '5 outer iterations × 6 inner iterations = 30 total executions.',
        },
      },
      {
        id: 'c8-t2',
        title: '2. Triangle & Pyramid Patterns',
        simpleExplanation:
          'To build a staircase or triangle where Row 1 has 1 item, Row 2 has 2 items, and Row r has r items, make the inner loop depend on the outer loop variable: for c in range(1, r + 1):!',
        whyProgrammersUseIt:
          'Dynamic inner loop bounds teach you how two variables interact—a core skill for sorting algorithms and triangle meshes.',
        realWorldAnalogy:
          'Building a cheerleader pyramid or stacking blocks where each level has one more block than the row above it.',
        pythonSyntax: 'for r in range(1, 5):\n    line = ""\n    for c in range(1, r + 1):\n        line += str(c)\n    print(line)',
        workingCodeExample: `height = int(input())

for r in range(1, height + 1):
    line = ""
    for c in range(1, r + 1):
        line += f"{c} "
    print(line.strip())`,
        sampleInput: '4',
        lineByLineExplanation: [
          { line: 'for r in range(1, height + 1):', explanation: 'Outer loop sets row number r from 1 to 4.' },
          { line: 'for c in range(1, r + 1):', explanation: 'When r=1, c runs 1..1. When r=3, c runs 1..3!' },
        ],
        expectedOutput: '1\n1 2\n1 2 3\n1 2 3 4',
        commonMistakes: [
          'Writing range(1, height + 1) in the inner loop instead of range(1, r + 1)—which prints a square instead of a triangle!',
        ],
        quickQuestion: {
          question: 'In a number staircase, why is the inner loop written as for c in range(1, r + 1):?',
          options: [
            'So the number of columns in each row matches the current row number r',
            'Because Python requires r inside every loop',
            'To make the loop run backwards',
            'So it only prints even numbers',
          ],
          correctIndex: 0,
          explanation: 'Making the inner stop bound r + 1 prints 1 item on row 1, 2 items on row 2, and r items on row r.',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: Holo-Grid Multiplication Matrix',
      description: 'Generate an N × N multiplication grid using nested row and column loops.',
      starterCode: `# Holo-Grid Multiplication Matrix
size = int(input())

for r in range(1, size + 1):
    row_vals = ""
    for c in range(1, size + 1):
        row_vals += f"{r * c}\t"
    print(row_vals.strip())`,
      sampleInput: '4',
      stepExplanations: [
        { line: 4, text: 'Outer loop selects row multiplier r from 1 to 4.' },
        { line: 6, text: 'Inner loop multiplies r by each column c from 1 to 4.' },
        { line: 8, text: 'Prints the completed row of products before moving to the next row.' },
      ],
      fullExplanation: 'Every cell in the grid is simply row * col! Try changing size in the Input Panel to 5 or 6.',
    },
    predictChallenges: [
      {
        id: 'c8-p1',
        title: 'Trace 1: Star Staircase',
        code: `for r in range(1, 4):
    print("*" * r)`,
        expectedOutput: '*\n**\n***',
        explanation: 'Row 1 prints 1 star, Row 2 prints 2 stars, Row 3 prints 3 stars.',
        difficulty: 'Starter',
      },
      {
        id: 'c8-p2',
        title: 'Trace 2: Nested Counter Total',
        code: `count = 0
for a in range(3):
    for b in range(2):
        count += 1
print(count)`,
        expectedOutput: '6',
        explanation: 'Outer loop runs 3 times, inner loop runs 2 times per outer turn: 3 * 2 = 6.',
        difficulty: 'Intermediate',
      },
      {
        id: 'c8-p3',
        title: 'Trace 3: Reverse Number Triangle',
        code: `for r in range(3, 0, -1):
    line = ""
    for c in range(1, r + 1):
        line += str(r)
    print(line)`,
        expectedOutput: '333\n22\n1',
        explanation: 'r counts down 3, 2, 1. Row 3 prints "3" three times ("333"), Row 2 prints "22", Row 1 prints "1".',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-8',
      lessonId: 8,
      title: 'Create a Pattern Factory',
      objective: 'Build a Pattern Factory where Hasthaksh enters a grid size N and generates both a hollow/bordered badge or a numbered pyramid.',
      materialsOrCodeRequired: 'Python IDE with pattern size input.',
      starterCode: `# CLASS 8 ACTIVITY: PATTERN FACTORY
size = int(input())

print("=== STAR PYRAMID ===")
for r in range(1, size + 1):
    print("*" * r)

print("=== NUMBER GRID ===")
for r in range(1, size + 1):
    line = ""
    for c in range(1, size + 1):
        line += f"{r * c} "
    print(line.strip())`,
      sampleInput: '3',
      teacherSolution: `size = int(input())

print("=== STAR PYRAMID ===")
for r in range(1, size + 1):
    print("*" * r)

print("=== NUMBER GRID ===")
for r in range(1, size + 1):
    line = ""
    for c in range(1, size + 1):
        line += f"{r * c} "
    print(line.strip())`,
      teacherInstructions: [
        'Have Hasthaksh test size = 3, 4, and 5.',
        'Challenge him to invert the star pyramid so it starts wide at the top and narrows to 1 star at the bottom!',
      ],
      studentInstructions: [
        'Use the first loop to print an increasing star pyramid of height size.',
        'Use the nested loop below it to print a size × size multiplication grid.',
      ],
      timeLimitMinutes: 12,
      expectedOutcome: '=== STAR PYRAMID ===\n*\n**\n***\n=== NUMBER GRID ===\n1 2 3\n2 4 6\n3 6 9',
      reflectionQuestion: 'How does changing the inner loop from range(1, size + 1) to range(1, r + 1) change the shape of the output?',
    },
    debuggingMission: {
      id: 'dbg-8',
      title: 'The Smeared Grid Bug',
      storyContext: 'Architect Volt tried to print a 3x3 grid of "#" symbols, but Row 2 has 6 symbols and Row 3 has 9 symbols because row_str wasn’t reset!',
      brokenCode: `# Fix the bug so each of the 3 rows prints exactly "###"!
row_str = ""
for r in range(3):
    for c in range(3):
        row_str += "#"
    print(row_str)`,
      sampleInput: '',
      expectedOutput: '###\n###\n###',
      bugType: 'Logic Error',
      hints: [
        'Trace what happens to row_str after Row 1 finishes printing "###".',
        'Because row_str = "" is ABOVE the outer loop, Row 2 keeps the old "###" and adds 3 more!',
        'Move row_str = "" INSIDE the outer loop (right before for c in range(3):).',
      ],
      teacherFixedCode: `for r in range(3):
    row_str = ""
    for c in range(3):
        row_str += "#"
    print(row_str)`,
      explanationOfFix: 'Resetting row_str = "" at the beginning of each outer row loop ensures each row starts fresh.',
    },
    exitQuiz: [
      {
        id: 'c8-q1',
        type: 'mcq',
        prompt: 'In a 2D grid nested loop, what do the outer loop and inner loop typically represent?',
        options: [
          'Outer loop = Rows, Inner loop = Columns',
          'Outer loop = Variables, Inner loop = Strings',
          'Outer loop = Output, Inner loop = Input',
          'They both represent the same column',
        ],
        correctAnswer: 'Outer loop = Rows, Inner loop = Columns',
        points: 10,
        conceptTag: 'Nested Loops',
        explanation: 'The outer loop steps through each row top-to-bottom, while the inner loop fills the columns left-to-right.',
      },
      {
        id: 'c8-q2',
        type: 'predict',
        prompt: 'How many stars (*) are printed in total by this code?',
        codeSnippet: `for r in range(4):\n    for c in range(3):\n        print("*")`,
        correctAnswer: '12',
        points: 15,
        conceptTag: 'Iteration Multiplication',
        explanation: '4 outer turns × 3 inner turns = 12 stars.',
      },
      {
        id: 'c8-q3',
        type: 'predict',
        prompt: 'Predict the exact output:',
        codeSnippet: `for r in range(1, 4):\n    line = ""\n    for c in range(1, r + 1):\n        line += str(c)\n    print(line)`,
        correctAnswer: '1\n12\n123',
        points: 15,
        conceptTag: 'Number Pyramids',
        explanation: 'Row 1 prints "1", Row 2 prints "12", Row 3 prints "123".',
      },
      {
        id: 'c8-q4',
        type: 'identify_error',
        prompt: 'Why is it a bad idea to write: for i in range(3): and then inside it write: for i in range(3):?',
        correctAnswer: 'Using the same loop variable name i for both outer and inner loops causes confusion and overwrites i',
        acceptableKeywords: ['same', 'variable', 'overwrite', 'name', 'outer', 'inner'],
        points: 15,
        conceptTag: 'Variable Naming',
        explanation: 'Always use distinct variable names like r and c (or i and j) for nested loops.',
      },
      {
        id: 'c8-q5',
        type: 'fill_code',
        prompt: 'Fill in the blank to print a string of 5 hashes using string repetition: print("#" ___ 5)',
        codeSnippet: `print("#" ___ 5)`,
        correctAnswer: '*',
        points: 15,
        conceptTag: 'String Repetition',
        explanation: 'Multiplying a string by an integer repeats the string: "#" * 5 produces "#####".',
      },
      {
        id: 'c8-q6',
        type: 'coding',
        prompt: 'Write the inner loop header (with colon) that loops column variable c from 1 up to and including row variable r.',
        correctAnswer: 'for c in range(1, r + 1):',
        acceptableKeywords: ['for', 'c', 'in', 'range(1,', 'r + 1):'],
        points: 20,
        conceptTag: 'Dynamic Bounds',
        explanation: 'for c in range(1, r + 1): runs c from 1 through r.',
      },
    ],
    standards: {
      lessonId: 8,
      englandKS2: [
        'Use nested repetition to generate structured 2D outputs',
        'Use logical reasoning to trace multi-variable nested loops',
      ],
      cstaDomain: 'Algorithms & Design',
      cstaOutcomeCode: 'CSTA-5-ALG-02',
      cstaOutcomeDescription: 'Construct nested loops to generate 2D patterns, grids, and coordinate structures.',
      cstaPractice: 'Computational Thinking',
      relatedActivity: 'Pattern Factory',
      assessmentEvidence: 'Class 8 Exit Quiz & Boss Multiplication Grid',
      masteryIndicator: 'Traces nested loops and builds dynamic row/column patterns independently.',
      coverageStatus: 'Covered in Depth',
      responsibleComputingNote: 'Nested loops multiply execution counts rapidly (1000 × 1000 = 1,000,000 steps)—keep grid sizes reasonable so devices stay responsive!',
    },
  },
  {
    id: 9,
    phase: 'PHASE 4: DATA AND FUNCTIONS',
    title: 'Data Backpack',
    subtitle: 'Creating Lists, Indexing, Updating Elements, Slicing & len()',
    comicChapterTitle: 'CHAPTER 09: THE QUANTUM BACKPACK',
    illustrationTheme: 'backpack',
    storyIntro:
      'Until now, each variable could hold only ONE value at a time. What if Hasthaksh needs to carry 50 gadgets, track 11 football player scores, or store a whole shopping inventory? Enter Python Lists—ordered, changeable collections stored inside square brackets [ ]!',
    realWorldScenario:
      'Think of your game inventory backpack, a Spotify playlist, or a shopping cart: you can inspect the first item, swap out slot 2 for an upgraded shield, or check how many items you are carrying with len().',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'Unlike strings, Python lists are MUTABLE—meaning you can directly change any slot like backpack[1] = "Plasma Torch"!',
      },
      {
        speaker: 'Hasthaksh',
        role: 'Data Explorer',
        line: 'One variable, unlimited slots. Let’s pack the Quantum Backpack!',
      },
    ],
    learningObjectives: [
      'Create lists of strings, numbers, or mixed types using square brackets [ ].',
      'Access elements using positive indices (0 to len-1) and negative indices (-1, -2...).',
      'Update specific list elements by index assignment (e.g., items[2] = "New").',
      'Check list length with len(), slice sub-lists, and check membership with in.',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Intermediate Foundations',
    topics: [
      'Creating lists [ ]',
      'Accessing elements & Indexing',
      'Updating elements (mutability)',
      'List slicing & membership (in)',
      'List length len()',
    ],
    theoryBlocks: [
      {
        id: 'c9-t1',
        title: '1. Creating Lists, Indexing & Updating Elements',
        simpleExplanation:
          'A list stores multiple items in a specific order inside square brackets [ ], separated by commas. Just like strings, slot numbering starts at index 0, and index -1 is the last item. Because lists are mutable (changeable), you can overwrite any slot directly!',
        whyProgrammersUseIt:
          'Instead of creating item1, item2, item3... item100, a single list holds all 100 items and lets loops process them automatically.',
        realWorldAnalogy:
          'A numbered locker row starting at Locker 0: you can open Locker 2, take out the old boots, and put in Hover-Boots.',
        pythonSyntax: 'gear = ["Compass", "Rope", "Torch"]\nprint(gear[0])        # "Compass"\ngear[1] = "Grapple"   # Updates slot 1\nprint(len(gear))      # 3',
        workingCodeExample: `backpack = ["Laser Cutter", "Medkit", "Rope", "Radar"]
print("First item:", backpack[0])
print("Last item:", backpack[-1])
print("Total items:", len(backpack))

# Upgrade the Rope at index 2
backpack[2] = "Jetpack"
print("Updated Backpack:", backpack)`,
        lineByLineExplanation: [
          { line: 'backpack = ["Laser Cutter", "Medkit", "Rope", "Radar"]', explanation: 'Creates a list with 4 elements at indices 0, 1, 2, and 3.' },
          { line: 'backpack[2] = "Jetpack"', explanation: 'Replaces "Rope" (at index 2) with "Jetpack".' },
          { line: 'print("Updated Backpack:", backpack)', explanation: 'Prints the whole list showing the updated slot.' },
        ],
        expectedOutput: "First item: Laser Cutter\nLast item: Radar\nTotal items: 4\nUpdated Backpack: ['Laser Cutter', 'Medkit', 'Jetpack', 'Radar']",
        commonMistakes: [
          'Trying to access backpack[4] on a 4-item list—valid indices are 0, 1, 2, 3! Accessing index 4 raises an IndexError.',
        ],
        quickQuestion: {
          question: 'Given scores = [10, 25, 40, 55], what is scores[2]?',
          options: ['10', '25', '40', '55'],
          correctIndex: 2,
          explanation: 'Index 0 is 10, index 1 is 25, and index 2 is 40.',
        },
      },
      {
        id: 'c9-t2',
        title: '2. List Slicing, Membership (in) & Deleting by Index',
        simpleExplanation:
          'You can slice a list with list[start:stop] to get a smaller list, check if an item is inside with "Medkit" in backpack, or delete a slot using del backpack[index].',
        whyProgrammersUseIt:
          'Checking if "Golden Key" in inventory before opening a boss door is one of the cleanest patterns in game programming.',
        realWorldAnalogy:
          'Scanning your backpack manifest to see if "Oxygen Tank" is packed before stepping onto an asteroid.',
        pythonSyntax: 'top_two = scores[0:2]\nif "Key" in bag:\n    print("Door Opens!")',
        workingCodeExample: `inventory = ["Shield", "Keycard", "Potion", "Map", "Compass"]

print("Top 3 items:", inventory[0:3])
if "Keycard" in inventory:
    print("Security Clearance: Confirmed")

del inventory[2]
print("After using Potion:", inventory)
print("Remaining count:", len(inventory))`,
        lineByLineExplanation: [
          { line: 'inventory[0:3]', explanation: 'Slices a sub-list containing indices 0, 1, and 2.' },
          { line: 'if "Keycard" in inventory:', explanation: 'Returns True because "Keycard" is an element of the list.' },
          { line: 'del inventory[2]', explanation: 'Deletes the item at index 2 ("Potion"), shifting later items left.' },
        ],
        expectedOutput: "Top 3 items: ['Shield', 'Keycard', 'Potion']\nSecurity Clearance: Confirmed\nAfter using Potion: ['Shield', 'Keycard', 'Map', 'Compass']\nRemaining count: 4",
        commonMistakes: [
          'Forgetting that deleting an element shortens the list and shifts the indices of all following elements.',
        ],
        quickQuestion: {
          question: 'If items = ["A", "B", "C"], what is the valid range of positive indices?',
          options: ['1 to 3', '0 to 3', '0 to 2', '1 to 2'],
          correctIndex: 2,
          explanation: 'A 3-element list has positive indices 0, 1, and 2 (0 to len(items) - 1).',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: Expedition Supply Manager',
      description: 'Inspect, update, and verify an expedition supply list using indices and membership checks.',
      starterCode: `# Expedition Supply Manager
supplies = ["Solar Tent", "Water Filter", "Flare Gun", "Rations"]
replacement = input()
search_item = input()

print("Initial Supplies:", supplies)
supplies[2] = replacement
print("Updated Slot 2:", supplies)
print("Total Count:", len(supplies))

if search_item in supplies:
    print(f"Found {search_item} in backpack!")
else:
    print(f"{search_item} is NOT packed!")`,
      sampleInput: 'Satellite Phone\nWater Filter',
      stepExplanations: [
        { line: 7, text: 'Replaces index 2 ("Flare Gun") with the user’s replacement ("Satellite Phone").' },
        { line: 11, text: 'Uses the in operator to check if search_item exists inside supplies.' },
      ],
      fullExplanation: 'Lists let you combine direct slot updates with instant membership checks.',
    },
    predictChallenges: [
      {
        id: 'c9-p1',
        title: 'Trace 1: Index Math & Update',
        code: `nums = [5, 10, 15, 20]
nums[1] = nums[0] + nums[3]
print(nums)`,
        expectedOutput: '[5, 25, 15, 20]',
        explanation: 'nums[0] is 5 and nums[3] is 20. Their sum (25) overwrites slot 1.',
        difficulty: 'Starter',
      },
      {
        id: 'c9-p2',
        title: 'Trace 2: Negative Index & Slice',
        code: `gems = ["Ruby", "Emerald", "Sapphire", "Diamond"]
gems[-1] = "Opal"
print(gems[1:3])
print(gems[-2:])`,
        expectedOutput: "['Emerald', 'Sapphire']\n['Sapphire', 'Opal']",
        explanation: 'gems[-1] replaces "Diamond" with "Opal". Then gems[1:3] is Emerald & Sapphire, and gems[-2:] is the last two items.',
        difficulty: 'Intermediate',
      },
      {
        id: 'c9-p3',
        title: 'Trace 3: Swap Inside a List',
        code: `cards = ["Ace", "King", "Queen"]
temp = cards[0]
cards[0] = cards[2]
cards[2] = temp
print(cards)`,
        expectedOutput: "['Queen', 'King', 'Ace']",
        explanation: 'Swaps slot 0 ("Ace") and slot 2 ("Queen") using temp.',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-9',
      lessonId: 9,
      title: 'Build a Shopping Inventory',
      objective: 'Create a smart Shopping Inventory that stores 4 items, updates a chosen slot with a new item, and displays the first item, last item, and total item count.',
      materialsOrCodeRequired: 'Python IDE with slot index and replacement item inputs.',
      starterCode: `# CLASS 9 ACTIVITY: SHOPPING INVENTORY
cart = ["Cricket Bat", "Sketchbook", "Robotics Kit", "Headphones"]
slot = int(input())
new_item = input()

cart[slot] = new_item

print("Updated Cart:", cart)
print("First Item:", cart[0])
print("Last Item:", cart[-1])
print("Items in Cart:", len(cart))`,
      sampleInput: '1\nTelescope',
      teacherSolution: `cart = ["Cricket Bat", "Sketchbook", "Robotics Kit", "Headphones"]
slot = int(input())
new_item = input()

cart[slot] = new_item

print("Updated Cart:", cart)
print("First Item:", cart[0])
print("Last Item:", cart[-1])
print("Items in Cart:", len(cart))`,
      teacherInstructions: [
        'Have Hasthaksh test updating slot 0, slot 1, and slot -1.',
        'Ask: How could we prevent an IndexError if the user types slot 99?',
      ],
      studentInstructions: [
        'Read the integer slot index and the new_item string.',
        'Update cart[slot] and print the updated cart, first item, last item, and length.',
      ],
      timeLimitMinutes: 12,
      expectedOutcome: "Updated Cart: ['Cricket Bat', 'Telescope', 'Robotics Kit', 'Headphones']\nFirst Item: Cricket Bat\nLast Item: Headphones\nItems in Cart: 4",
      reflectionQuestion: 'How could an if statement check whether slot is a valid index before updating cart[slot]?',
    },
    debuggingMission: {
      id: 'dbg-9',
      title: 'The Off-By-One Trophy Shelf Crash',
      storyContext: 'Quartermaster Max wants to print the first and last trophy in a 4-item list, but his code crashes with an IndexError!',
      brokenCode: `# Fix the indexing bugs so it prints the first and last trophy!
trophies = ["Coding Cup", "Chess Shield", "Maths Medal", "Science Star"]

print("First:", trophies[1])
print("Last:", trophies[4])`,
      sampleInput: '',
      expectedOutput: 'First: Coding Cup\nLast: Science Star',
      bugType: 'Runtime Error',
      hints: [
        'What index is the very first item in a Python list? (0, not 1!)',
        'When a list has 4 items, its indices are 0, 1, 2, and 3. Index 4 is out of range!',
        'Use trophies[0] for the first item and trophies[3] (or trophies[-1]) for the last item.',
      ],
      teacherFixedCode: `trophies = ["Coding Cup", "Chess Shield", "Maths Medal", "Science Star"]

print("First:", trophies[0])
print("Last:", trophies[3])`,
      explanationOfFix: 'In a 4-element list, the first element is at index 0 and the last element is at index 3 (or -1).',
    },
    exitQuiz: [
      {
        id: 'c9-q1',
        type: 'mcq',
        prompt: 'Which brackets are used to create a list in Python?',
        options: ['Curly braces { }', 'Square brackets [ ]', 'Parentheses ( )', 'Angle brackets < >'],
        correctAnswer: 'Square brackets [ ]',
        points: 10,
        conceptTag: 'List Syntax',
        explanation: 'Lists are enclosed in square brackets [ ].',
      },
      {
        id: 'c9-q2',
        type: 'predict',
        prompt: 'What is printed by this code?',
        codeSnippet: `pets = ["Dog", "Cat", "Parrot", "Rabbit"]\nprint(pets[-2])`,
        correctAnswer: 'Parrot',
        points: 15,
        conceptTag: 'Negative Indexing',
        explanation: 'Index -1 is "Rabbit", and index -2 is the second-from-last item, "Parrot".',
      },
      {
        id: 'c9-q3',
        type: 'identify_error',
        prompt: 'Why does colours = ["Red", "Blue"]; print(colours[2]) cause an IndexError?',
        correctAnswer: 'A 2-item list only has indices 0 and 1 so index 2 is out of range',
        acceptableKeywords: ['0 and 1', 'out of range', 'starts at 0', 'only 2'],
        points: 15,
        conceptTag: 'IndexError',
        explanation: 'Since indexing starts at 0, a list of length 2 only has indices 0 and 1.',
      },
      {
        id: 'c9-q4',
        type: 'predict',
        prompt: 'Predict the output:',
        codeSnippet: `vals = [2, 4, 6]\nvals[0] = vals[2] * 3\nprint(vals)`,
        correctAnswer: '[18, 4, 6]',
        points: 15,
        conceptTag: 'Updating Lists',
        explanation: 'vals[2] is 6. 6 * 3 = 18, which replaces vals[0].',
      },
      {
        id: 'c9-q5',
        type: 'fill_code',
        prompt: 'Which built-in function returns the number of items in a list? ___(backpack)',
        codeSnippet: `count = ___(backpack)`,
        correctAnswer: 'len',
        points: 15,
        conceptTag: 'len()',
        explanation: 'len(backpack) returns the total number of elements in the list.',
      },
      {
        id: 'c9-q6',
        type: 'coding',
        prompt: 'Write the single Python line that replaces the last item of a list named team with "Captain" using negative indexing.',
        correctAnswer: 'team[-1] = "Captain"',
        acceptableKeywords: ['team[-1]', '=', '"Captain"'],
        points: 20,
        conceptTag: 'List Mutation',
        explanation: 'team[-1] = "Captain" updates the last element regardless of list length.',
      },
    ],
    standards: {
      lessonId: 9,
      englandKS2: [
        'Work with variables and list data structures to store collections of data',
        'Design and debug programs that manipulate indexed data',
      ],
      cstaDomain: 'Data & Analysis',
      cstaOutcomeCode: 'CSTA-5-DAA-02',
      cstaOutcomeDescription: 'Store, access, and modify ordered collections of data using 0-indexed lists.',
      cstaPractice: 'Computational Thinking',
      relatedActivity: 'Shopping Inventory',
      assessmentEvidence: 'Class 9 Exit Quiz & Data Backpack Practice Bank',
      masteryIndicator: 'Reads, slices, and updates list elements without off-by-one IndexErrors.',
      coverageStatus: 'Covered in Depth',
      responsibleComputingNote: 'Always validate user-supplied index numbers before modifying records in an inventory database.',
    },
  },
  {
    id: 10,
    phase: 'PHASE 4: DATA AND FUNCTIONS',
    title: 'Data Detective',
    subtitle: 'List Methods (append, insert, remove, pop, sort, reverse), Traversing, Filtering & Min/Max',
    comicChapterTitle: 'CHAPTER 10: THE ARENA LEADERBOARD',
    illustrationTheme: 'leaderboard',
    storyIntro:
      'The Inter-Academy Championship scores are streaming in live! Hasthaksh must use advanced list methods (.append(), .insert(), .remove(), .pop(), .sort(), .reverse()) and loop traversal to filter high scores, compute averages, and crown the tournament champion—before taking on the Mid-Course Checkpoint!',
    realWorldScenario:
      'Think of an esports or IPL cricket leaderboard: new scores are appended after each match, disqualified entries are removed, scores are sorted from highest to lowest, and statistics (min, max, average) are calculated live.',
    characterDialogue: [
      {
        speaker: 'PY-9 (Droid Guide)',
        role: 'Tactical AI Companion',
        line: 'Combine loops with lists and you can search, filter, and analyse thousands of scores in milliseconds!',
      },
      {
        speaker: 'Hasthaksh',
        role: 'Chief Data Detective',
        line: 'Let’s sort the leaderboard, filter the top qualifiers, and ace the Class 10 Checkpoint!',
      },
    ],
    learningObjectives: [
      'Add and remove items dynamically using .append(), .insert(), .remove(), and .pop().',
      'Order lists in ascending or descending order using .sort(), .sort(reverse=True), and .reverse().',
      'Traverse lists with a for loop to search, filter values, and compute totals and averages.',
      'Find extreme values using min(), max(), and sum().',
    ],
    estimatedDurationMinutes: 60,
    difficulty: 'Accelerated Problem-Solving',
    topics: [
      'append(), insert(), remove(), pop()',
      'sort() and reverse()',
      'Traversing & Filtering lists with loops',
      'Finding min, max, sum & average',
      'Cumulative Mid-Course Checkpoint readiness',
    ],
    theoryBlocks: [
      {
        id: 'c10-t1',
        title: '1. Dynamic List Methods: append, insert, remove, pop, sort & reverse',
        simpleExplanation:
          '.append(x) adds x to the end. .insert(i, x) slips x in at index i. .remove(val) deletes the first matching value. .pop(i) removes and returns the item at index i (or the last item if i is omitted). .sort() orders items lowest-to-highest, and .reverse() flips the list order!',
        whyProgrammersUseIt:
          'Real data changes constantly: players join queues (.append), cut in line with VIP passes (.insert), or get sorted onto leaderboards (.sort(reverse=True)).',
        realWorldAnalogy:
          '.append() is joining the back of a bus queue; .insert(0, x) is stepping to the very front; .pop() is the last person stepping off.',
        pythonSyntax: 'scores.append(95)\nscores.insert(0, 100)\nscores.remove(40)\nscores.sort(reverse=True)',
        workingCodeExample: `scores = [72, 95, 60, 88]
scores.append(99)
scores.remove(60)
scores.sort(reverse=True)

print("Sorted Leaderboard:", scores)
print("Highest:", max(scores))
print("Lowest:", min(scores))
print("Average:", sum(scores) / len(scores))`,
        lineByLineExplanation: [
          { line: 'scores.append(99)', explanation: 'Adds 99 to the end of the list.' },
          { line: 'scores.remove(60)', explanation: 'Finds and removes the value 60 from the list.' },
          { line: 'scores.sort(reverse=True)', explanation: 'Sorts the list in descending order (highest to lowest).' },
          { line: 'sum(scores) / len(scores)', explanation: 'Divides the total sum by the number of items to get the mean average.' },
        ],
        expectedOutput: 'Sorted Leaderboard: [99, 95, 88, 72]\nHighest: 99\nLowest: 72\nAverage: 88.5',
        commonMistakes: [
          'Confusing .remove(value) with .pop(index): .remove(2) looks for the number 2, whereas .pop(2) deletes whatever sits at index 2!',
          'Writing scores = scores.append(10) — .append() modifies the list in-place and returns None!',
        ],
        quickQuestion: {
          question: 'What is the difference between list.remove(x) and list.pop(i)?',
          options: [
            'remove(x) deletes by matching value; pop(i) deletes by index position and returns the removed item',
            'They are identical',
            'pop() adds an item; remove() sorts the list',
            'remove() only works on strings',
          ],
          correctIndex: 0,
          explanation: '.remove(x) searches for value x, while .pop(i) removes the element at index i.',
        },
      },
      {
        id: 'c10-t2',
        title: '2. Traversing & Filtering Lists with Loops',
        simpleExplanation:
          'Traversing means visiting every element in a list using for item in my_list:. By placing an if condition inside the loop, you can filter matching items into a brand-new list or find maximum/minimum values manually!',
        whyProgrammersUseIt:
          'Filtering lets you extract all even numbers, all qualifiers with 80+ points, or all products under ₹500.',
        realWorldAnalogy:
          'Panning for gold: pouring a bucket of river pebbles through a mesh so only nuggets above a certain size stay in your collection.',
        pythonSyntax: 'qualifiers = []\nfor s in scores:\n    if s >= 80:\n        qualifiers.append(s)',
        workingCodeExample: `readings = [14, 27, 8, 42, 19, 36]
evens = []
high_count = 0

for val in readings:
    if val % 2 == 0:
        evens.append(val)
    if val >= 25:
        high_count += 1

print("Even Readings:", evens)
print("Readings >= 25:", high_count)`,
        lineByLineExplanation: [
          { line: 'evens = []', explanation: 'Creates an empty list before the loop to collect matching even numbers.' },
          { line: 'if val % 2 == 0:', explanation: 'Checks if val is divisible by 2 with no remainder.' },
          { line: 'evens.append(val)', explanation: 'Appends matching even numbers into the evens list.' },
        ],
        expectedOutput: 'Even Readings: [14, 8, 42, 36]\nReadings >= 25: 3',
        commonMistakes: [
          'Modifying a list with .remove() while looping directly over that same list—which causes Python to skip elements! Instead, append matches into a new list.',
        ],
        quickQuestion: {
          question: 'Why does print([3, 1, 2].sort()) print None?',
          options: [
            'Because .sort() sorts the list in-place and returns None (sort first, then print the list variable)',
            'Because lists of 3 numbers cannot be sorted',
            'Because 3 is an odd number',
            'Because you must use .reverse() first',
          ],
          correctIndex: 0,
          explanation: '.sort() mutates the list in-place and returns None. Call nums.sort() on its own line, then print(nums).',
        },
      },
    ],
    liveDemo: {
      title: 'Live Demo: Tournament Leaderboard & Qualifier Filter',
      description: 'Add a live bonus score, sort the leaderboard descending, and filter all players who scored 85 or above.',
      starterCode: `# Sports Tournament Leaderboard
scores = [78, 92, 85, 64, 96, 81]
new_score = int(input())

scores.append(new_score)
scores.sort(reverse=True)

finalists = []
for s in scores:
    if s >= 85:
        finalists.append(s)

print("Full Leaderboard:", scores)
print("Champion Score:", max(scores))
print("Finalists (85+):", finalists)
print("Average Score:", round(sum(scores) / len(scores), 1))`,
      sampleInput: '90',
      stepExplanations: [
        { line: 5, text: 'Appends new_score (90) to scores.' },
        { line: 6, text: 'Sorts scores from highest to lowest using reverse=True.' },
        { line: 9, text: 'Traverses scores and appends every score >= 85 into finalists.' },
      ],
      fullExplanation: 'This pattern—append, sort, filter, and summarise—is the foundation of data science in Python.',
    },
    predictChallenges: [
      {
        id: 'c10-p1',
        title: 'Trace 1: insert, pop & append',
        code: `nums = [10, 20, 30]
nums.append(40)
nums.insert(1, 15)
removed = nums.pop(2)
print(nums)
print(removed)`,
        expectedOutput: '[10, 15, 30, 40]\n20',
        explanation: 'After append: [10, 20, 30, 40]. After insert(1, 15): [10, 15, 20, 30, 40]. pop(2) removes and returns index 2 (20).',
        difficulty: 'Starter',
      },
      {
        id: 'c10-p2',
        title: 'Trace 2: Filtering Multiples',
        code: `data = [5, 12, 15, 22, 30, 7]
res = []
for x in data:
    if x % 5 == 0 and x > 10:
        res.append(x)
print(res)`,
        expectedOutput: '[15, 30]',
        explanation: 'Only 15 and 30 are both divisible by 5 and strictly greater than 10.',
        difficulty: 'Intermediate',
      },
      {
        id: 'c10-p3',
        title: 'Trace 3: Manual Maximum Finder',
        code: `vals = [18, 45, 29, 60, 12]
best = vals[0]
for v in vals:
    if v > best:
        best = v
print(best)`,
        expectedOutput: '60',
        explanation: 'best starts at 18, updates to 45, and then updates to 60 when 60 > 45.',
        difficulty: 'Advanced Trace',
      },
    ],
    classActivity: {
      id: 'act-10',
      lessonId: 10,
      title: 'Build a Sports Leaderboard',
      objective: 'Build a live Sports Leaderboard that adds Hasthaksh’s latest match score, sorts rankings from highest to lowest, and prints the top 3 podium scores plus the team average.',
      materialsOrCodeRequired: 'Python IDE with new match score input.',
      starterCode: `# CLASS 10 ACTIVITY: SPORTS LEADERBOARD
team_scores = [84, 91, 76, 95, 88]
latest = int(input())

team_scores.append(latest)
team_scores.sort(reverse=True)

print("Leaderboard:", team_scores)
print("Top 3 Podium:", team_scores[0:3])
print("Highest:", max(team_scores))
print("Lowest:", min(team_scores))
print("Team Average:", round(sum(team_scores) / len(team_scores), 1))`,
      sampleInput: '98',
      teacherSolution: `team_scores = [84, 91, 76, 95, 88]
latest = int(input())

team_scores.append(latest)
team_scores.sort(reverse=True)

print("Leaderboard:", team_scores)
print("Top 3 Podium:", team_scores[0:3])
print("Highest:", max(team_scores))
print("Lowest:", min(team_scores))
print("Team Average:", round(sum(team_scores) / len(team_scores), 1))`,
      teacherInstructions: [
        'Celebrate reaching Class 10! After completing this activity, guide Hasthaksh to the Quizzes & Assessments tab to take the 15-question Mid-Course Checkpoint.',
      ],
      studentInstructions: [
        'Append latest to team_scores and sort in descending order.',
        'Slice the first 3 elements for the Top 3 Podium and calculate the rounded average.',
      ],
      timeLimitMinutes: 12,
      expectedOutcome: 'Leaderboard: [98, 95, 91, 88, 84, 76]\nTop 3 Podium: [98, 95, 91]\nHighest: 98\nLowest: 76\nTeam Average: 88.7',
      reflectionQuestion: 'Once a list is sorted with reverse=True, which index always holds the maximum value and which holds the minimum?',
    },
    debuggingMission: {
      id: 'dbg-10',
      title: 'The "None" Leaderboard Wipeout',
      storyContext: 'Analyst Mia wrote points = points.sort() and now her entire list turned into None!',
      brokenCode: `# Fix the 2 bugs so points sorts properly and appends 50!
points = [30, 10, 40, 20]
points = points.append(50)
points = points.sort()
print("Sorted:", points)`,
      sampleInput: '',
      expectedOutput: 'Sorted: [10, 20, 30, 40, 50]',
      bugType: 'Runtime Error',
      hints: [
        'What does points.append(50) return? It modifies points in-place and returns None!',
        'Assigning points = points.append(50) overwrites the list with None!',
        'Call points.append(50) and points.sort() on their own lines without "points =".',
      ],
      teacherFixedCode: `points = [30, 10, 40, 20]
points.append(50)
points.sort()
print("Sorted:", points)`,
      explanationOfFix: 'Both .append() and .sort() modify the list in-place and return None. Never assign their return value back to the list variable.',
    },
    exitQuiz: [
      {
        id: 'c10-q1',
        type: 'mcq',
        prompt: 'Which method adds a new element to the very END of a list?',
        options: ['.insert()', '.append()', '.pop()', '.sort()'],
        correctAnswer: '.append()',
        points: 10,
        conceptTag: 'List Methods',
        explanation: '.append(item) adds item to the end of the list.',
      },
      {
        id: 'c10-q2',
        type: 'predict',
        prompt: 'Predict the output:',
        codeSnippet: `items = ["B", "C"]\nitems.insert(0, "A")\nprint(items)`,
        correctAnswer: "['A', 'B', 'C']",
        points: 15,
        conceptTag: 'insert()',
        explanation: '.insert(0, "A") places "A" at index 0, shifting "B" and "C" to the right.',
      },
      {
        id: 'c10-q3',
        type: 'identify_error',
        prompt: 'Why does nums = [3, 1, 2]; nums = nums.sort(); print(nums) output None?',
        correctAnswer: 'nums.sort() sorts the list in-place and returns None so assigning it overwrites nums',
        acceptableKeywords: ['in-place', 'None', 'assign', 'return'],
        points: 15,
        conceptTag: 'sort()',
        explanation: 'Call nums.sort() without assigning it back to nums.',
      },
      {
        id: 'c10-q4',
        type: 'predict',
        prompt: 'What is printed by this code?',
        codeSnippet: `vals = [10, 50, 30, 20]\nprint(max(vals) - min(vals))`,
        correctAnswer: '40',
        points: 15,
        conceptTag: 'min() and max()',
        explanation: 'max(vals) is 50 and min(vals) is 10. 50 - 10 = 40.',
      },
      {
        id: 'c10-q5',
        type: 'fill_code',
        prompt: 'Complete the expression to calculate the average of a list named marks: sum(marks) / ___(marks)',
        codeSnippet: `avg = sum(marks) / ___(marks)`,
        correctAnswer: 'len',
        points: 15,
        conceptTag: 'List Analysis',
        explanation: 'The average is the total sum divided by the count of elements len(marks).',
      },
      {
        id: 'c10-q6',
        type: 'coding',
        prompt: 'Write the single statement that sorts a list named ranks from highest to lowest.',
        correctAnswer: 'ranks.sort(reverse=True)',
        acceptableKeywords: ['ranks.sort', 'reverse=True'],
        points: 20,
        conceptTag: 'Descending Sort',
        explanation: 'ranks.sort(reverse=True) sorts the list in descending order.',
      },
    ],
    standards: {
      lessonId: 10,
      englandKS2: [
        'Collect, analyse, evaluate and present data using list traversal and built-in methods',
        'Use sequence, selection, and repetition to filter and search datasets',
      ],
      cstaDomain: 'Data & Analysis',
      cstaOutcomeCode: 'CSTA-5-DAA-03',
      cstaOutcomeDescription: 'Traverse, filter, sort, and compute summary statistics (min, max, sum, mean) on list datasets.',
      cstaPractice: 'Computational Thinking & Communication about Computing',
      relatedActivity: 'Sports Leaderboard & Mid-Course Checkpoint',
      assessmentEvidence: 'Class 10 Exit Quiz & 15-Item Mid-Course Checkpoint',
      masteryIndicator: 'Manipulates lists with append/insert/remove/pop/sort and filters values via loop traversal.',
      coverageStatus: 'Covered in Depth',
      responsibleComputingNote: 'When analysing class or sports data, double-check that no valid scores were accidentally dropped before publishing rankings.',
    },
  },
];
