import { HomeworkTask, MajorProject, FormalAssessment } from '../types/quest';
import { LESSONS_PART_1 } from './lessonsPart1';
import { LESSONS_PART_2 } from './lessonsPart2';
import { PRACTICE_BANK_PART_1 } from './practiceBankPart1';
import { PRACTICE_BANK_PART_2 } from './practiceBankPart2';

const ALL_RAW_LESSONS = [...LESSONS_PART_1, ...LESSONS_PART_2];
const ALL_RAW_EXERCISES = [...PRACTICE_BANK_PART_1, ...PRACTICE_BANK_PART_2];

export const ALL_HOMEWORK: HomeworkTask[] = ALL_RAW_LESSONS.flatMap((lesson) => {
  const cid = String(lesson.id).padStart(2, '0');
  const lessonEx = ALL_RAW_EXERCISES.filter((e) => e.lessonId === lesson.id);
  const coreEx = lessonEx.find((e) => e.category === 'warmup') || lessonEx[0];
  const creativeEx = lessonEx.find((e) => e.category === 'independent') || lessonEx[1] || lessonEx[0];
  const challengeEx = lessonEx.find((e) => e.category === 'boss') || lessonEx[lessonEx.length - 1];

  return [
    {
      id: `HW-${cid}-1`,
      lessonId: lesson.id,
      type: 'Core Practice',
      title: `Class ${lesson.id} Core Practice: ${lesson.title}`,
      instructions: `Reinforce today's core skill from "${lesson.title}". Complete the task below:\n${coreEx.instructions}`,
      starterCode: coreEx.starterCode,
      sampleInput: coreEx.inputExample,
      expectedOutput: coreEx.expectedOutput,
      teacherSolution: coreEx.teacherSolution,
      markingRubric: [...coreEx.markingCriteria],
      xpReward: 40
    },
    {
      id: `HW-${cid}-2`,
      lessonId: lesson.id,
      type: 'Creative Task',
      title: `Class ${lesson.id} Creative Mission: ${lesson.comicChapterTitle}`,
      instructions: `Apply ${lesson.subtitle} in an independent coding mission:\n${creativeEx.instructions}`,
      starterCode: creativeEx.starterCode,
      sampleInput: creativeEx.inputExample,
      expectedOutput: creativeEx.expectedOutput,
      teacherSolution: creativeEx.teacherSolution,
      markingRubric: [...creativeEx.markingCriteria],
      xpReward: 55
    },
    {
      id: `HW-${cid}-3`,
      lessonId: lesson.id,
      type: 'Challenge Task',
      title: `Class ${lesson.id} Stretch Challenge: ${challengeEx.title}`,
      instructions: `Stretch your problem-solving skills with this Boss-level challenge from Class ${lesson.id}:\n${challengeEx.instructions}`,
      starterCode: challengeEx.starterCode,
      sampleInput: challengeEx.inputExample,
      expectedOutput: challengeEx.expectedOutput,
      teacherSolution: challengeEx.teacherSolution,
      markingRubric: [...challengeEx.markingCriteria],
      xpReward: 75
    }
  ];
});

export const MAJOR_PROJECTS: MajorProject[] = [
  {
    id: 'quiz-master',
    classNumber: 17,
    title: 'Quiz Master',
    subtitle: 'Interactive Multi-Topic Trivia & Scoreboard Engine',
    missionBrief:
      'Build a complete interactive quiz game in Python! Quiz Master challenges players with questions stored in a dictionary, checks case-insensitive answers, awards points, and prints a final rank badge.',
    cinematicIntro:
      'Inside the Neo-Bengaluru Knowledge Vault, Hasthaksh and PY-9 must construct the ultimate Quiz Master engine to test incoming Academy recruits.',
    objectives: [
      'Store questions and answers cleanly using a Python dictionary',
      'Loop through dictionary items with for question, answer in questions.items()',
      'Normalise player input with .strip().lower() for fair answer checking',
      'Track score and calculate a final Rank Title using if / elif / else'
    ],
    skillsPractised: [
      'Dictionaries & .items() iteration',
      'String normalisation (.strip().lower())',
      'Conditional branching & score accumulation',
      'Formatted f-string scoreboard output'
    ],
    featuresRequired: [
      '5+ question-and-answer pairs stored in a dictionary',
      'Case-insensitive answer checking using .strip().lower()',
      'Instant feedback after every question',
      'Final score summary and Rank Title ceremony'
    ],
    studentInstructions: [
      'Review the starter boilerplate and test inputs in the Input-Values panel.',
      'Complete TODO 1 to loop through each question and answer in questions.items().',
      'Complete TODO 2 & 3 to read player input and clean it with .strip().lower().',
      'Complete TODO 4 & 5 to update score, print per-question feedback, and display the final rank.'
    ],
    defaultInputValues: 'python\n8\nblue\n7\ndef',
    starterBoilerplate: `# ============================================
# PROJECT 1: QUIZ MASTER
# Student: Hasthaksh
# ============================================

print("=== WELCOME TO HASTHAKSH'S QUIZ MASTER ===")

questions = {
    "What language are we learning?": "python",
    "How many planets are in the solar system?": "8",
    "What colour is the sky on a clear day?": "blue",
    "What is 3 + 4?": "7",
    "Which keyword defines a function in Python?": "def"
}

score = 0

# TODO 1: Loop through each question and answer
# TODO 2: Ask the player for an answer using input()
# TODO 3: Compare answers cleanly using .strip().lower()
# TODO 4: Update score and give feedback
# TODO 5: Show final score and rank`,
    milestones: [
      {
        id: 'qm-m1',
        title: 'Milestone 1: Loop Through the Question Bank',
        todoMarker: '# TODO 1',
        description: 'Use a for loop with questions.items() so Python visits each question and its matching answer.',
        hint: 'Write: for question, answer in questions.items():'
      },
      {
        id: 'qm-m2',
        title: 'Milestone 2: Read & Clean Player Input',
        todoMarker: '# TODO 2',
        description: 'Print the question, read the player response with input(), and clean it with .strip().lower().',
        hint: 'Use user_ans = input().strip().lower() inside the loop.'
      },
      {
        id: 'qm-m3',
        title: 'Milestone 3: Score Update & Instant Feedback',
        todoMarker: '# TODO 4',
        description: 'Compare user_ans == answer.lower(). If correct, add 1 to score and print "Correct!"; else print the right answer.',
        hint: 'If user_ans == answer.lower(): score += 1 and print("Correct!")'
      },
      {
        id: 'qm-m4',
        title: 'Milestone 4: Final Score & Rank Ceremony',
        todoMarker: '# TODO 5',
        description: 'After the loop finishes, print the total score out of len(questions) and award a rank (Grandmaster, Ace, or Explorer).',
        hint: 'Check if score == 5, elif score >= 3, else print Rising Explorer.'
      }
    ],
    teacherSolution: `# ============================================
# PROJECT 1: QUIZ MASTER (TEACHER SOLUTION)
# Student: Hasthaksh
# ============================================

print("=== WELCOME TO HASTHAKSH'S QUIZ MASTER ===")

questions = {
    "What language are we learning?": "python",
    "How many planets are in the solar system?": "8",
    "What colour is the sky on a clear day?": "blue",
    "What is 3 + 4?": "7",
    "Which keyword defines a function in Python?": "def"
}

score = 0

for question, answer in questions.items():
    print(f"Q: {question}")
    guess = input().strip().lower()
    if guess == answer.lower():
        print("Correct! +10 XP")
        score = score + 1
    else:
        print(f"Not quite! The answer was {answer}.")

print(f"Final Score: {score}/{len(questions)}")
if score == len(questions):
    print("Rank: Python Grandmaster!")
elif score >= 3:
    print("Rank: Trivia Ace!")
else:
    print("Rank: Rising Explorer!")`,
    acceptanceChecklist: [
      'Loops through all 5 questions in the dictionary without repeating code manually',
      'Accepts answers regardless of uppercase/lowercase or extra spaces (e.g. "  PYTHON ")',
      'Correctly increments and displays the final score out of 5',
      'Displays a customized Rank message based on the final score'
    ],
    stretchChallenges: [
      'Add a streak counter that awards +2 bonus points when the player gets 3 answers right in a row',
      'Allow the player to choose between two categories (Science vs Coding) before starting',
      'Keep track of missed questions in a list and display a "Review Sheet" at the end'
    ],
    presentationChecklist: [
      'Demonstrate running the quiz with all correct answers',
      'Demonstrate typing an answer in ALL CAPS to prove .lower() works',
      'Explain how questions.items() unpacks both key and value in the loop'
    ],
    xpReward: 250
  },
  {
    id: 'treasure-maze',
    classNumber: 18,
    title: 'Treasure Maze',
    subtitle: '2D Grid Adventure with Wall Collision & Treasure Radar',
    missionBrief:
      'Build a 2D coordinate grid exploration game! Navigate Hasthaksh through a 4x4 dungeon grid using N/S/E/W commands, block movement into walls (#) or outside the map, and celebrate when the player reaches the Treasure (T).',
    cinematicIntro:
      'Deep beneath Sector 7 lies the Ancient Cyber Vault! Hasthaksh must program PY-9’s 2D radar and wall-collision engine to reach the Golden Core at (3, 3).',
    objectives: [
      'Represent a 2D game board using a nested list of rows and columns',
      'Write a helper function display_maze(r, c) that renders the player (P) on the grid',
      'Calculate proposed coordinates (next_r, next_c) before moving to prevent wall collisions',
      'Use a game loop that ends when the player lands on the treasure tile "T"'
    ],
    skillsPractised: [
      '2D nested lists (maze[row][col])',
      'Custom functions with parameters',
      'Boundary & wall collision checking',
      'While loop state management'
    ],
    featuresRequired: [
      'display_maze(r, c) function that prints P at the player coordinates',
      'Direction translation for N, S, E, W commands',
      'Boundary protection (0 <= row < 4 and 0 <= col < 4) and wall blocking ("#")',
      'Victory detection when reaching "T" with move counter summary'
    ],
    studentInstructions: [
      'Inspect the 4x4 maze grid where "S" is at (0,0), "#" are walls, and "T" is at (3,3).',
      'Implement display_maze(r, c) using nested loops to print each row.',
      'Write a loop that reads N, S, E, W commands and computes next_r, next_c.',
      'Validate boundaries and walls before updating player_row and player_col.'
    ],
    defaultInputValues: 'E\nS\nS\nE\nS\nE',
    starterBoilerplate: `# ============================================
# PROJECT 2: TREASURE MAZE
# Student: Hasthaksh
# ============================================

maze = [
    ["S", ".", ".", "#"],
    ["#", ".", "#", "."],
    [".", ".", ".", "."],
    ["#", "#", ".", "T"]
]

player_row = 0
player_col = 0
moves = 0

def display_maze(r, c):
    # TODO: Print the maze showing 'P' at the player's current position
    pass

# TODO: Add movement loop (N, S, E, W)
# TODO: Prevent moving outside the grid or into walls "#"
# TODO: End the game when the player reaches "T"`,
    milestones: [
      {
        id: 'tm-m1',
        title: 'Milestone 1: Build the display_maze(r, c) Function',
        todoMarker: '# TODO: Print the maze',
        description: 'Loop through row indices 0..3 and col indices 0..3. Print "P" at (r, c) and the maze tile everywhere else.',
        hint: 'Build a line string for each row. If row_i == r and col_i == c, add "P ", else add maze[row_i][col_i] + " ".'
      },
      {
        id: 'tm-m2',
        title: 'Milestone 2: Calculate Proposed Coordinates',
        todoMarker: '# TODO: Add movement loop',
        description: 'Read a move command (N, S, E, W) and compute next_r and next_c without changing player_row yet.',
        hint: 'Set next_r = player_row, next_c = player_col. If cmd == "E", next_c += 1; if "S", next_r += 1.'
      },
      {
        id: 'tm-m3',
        title: 'Milestone 3: Check Boundaries & Walls (#)',
        todoMarker: '# TODO: Prevent moving outside',
        description: 'Verify 0 <= next_r < 4 and 0 <= next_c < 4 and maze[next_r][next_c] != "#". Only update position if valid!',
        hint: 'Check bounds first! Then elif maze[next_r][next_c] == "#": print("Blocked by wall!")'
      },
      {
        id: 'tm-m4',
        title: 'Milestone 4: Detect the Treasure Tile "T"',
        todoMarker: '# TODO: End the game',
        description: 'When maze[player_row][player_col] == "T", print the victory message with total moves.',
        hint: 'Check if maze[player_row][player_col] == "T": print(f"VICTORY! Found in {moves} moves!")'
      }
    ],
    teacherSolution: `# ============================================
# PROJECT 2: TREASURE MAZE (TEACHER SOLUTION)
# Student: Hasthaksh
# ============================================

maze = [
    ["S", ".", ".", "#"],
    ["#", ".", "#", "."],
    [".", ".", ".", "."],
    ["#", "#", ".", "T"]
]

player_row = 0
player_col = 0
moves = 0

def display_maze(r, c):
    for row_idx in range(len(maze)):
        line = ""
        for col_idx in range(len(maze[row_idx])):
            if row_idx == r and col_idx == c:
                line = line + "P "
            else:
                line = line + maze[row_idx][col_idx] + " "
        print(line.strip())

print("=== TREASURE MAZE ADVENTURE ===")
display_maze(player_row, player_col)

while maze[player_row][player_col] != "T" and moves < 15:
    cmd = input().strip().upper()
    if cmd == "":
        break
    next_r = player_row
    next_c = player_col
    if cmd == "N":
        next_r = next_r - 1
    elif cmd == "S":
        next_r = next_r + 1
    elif cmd == "E":
        next_c = next_c + 1
    elif cmd == "W":
        next_c = next_c - 1
    else:
        print("Invalid direction! Use N, S, E, or W.")
        continue

    if next_r < 0 or next_r >= 4 or next_c < 0 or next_c >= 4:
        print("Blocked! Edge of map.")
    elif maze[next_r][next_c] == "#":
        print("Blocked! Solid stone wall.")
    else:
        player_row = next_r
        player_col = next_c
        moves = moves + 1
        print(f"Moved {cmd} to ({player_row}, {player_col})")

if maze[player_row][player_col] == "T":
    display_maze(player_row, player_col)
    print(f"VICTORY! Hasthaksh found the Treasure in {moves} moves!")`,
    acceptanceChecklist: [
      'Renders the 4x4 grid clearly with P marking the current player coordinates',
      'Translates N, S, E, W commands into row and column changes accurately',
      'Blocks the player from walking off the 4x4 grid or stepping onto "#" wall tiles',
      'Detects reaching "T" at (3, 3) and prints the total move count'
    ],
    stretchChallenges: [
      'Add collectible Gold Coins ("G") on the map that add +50 gold when stepped on',
      'Add a Torch Energy counter that starts at 10 and decreases by 1 each move',
      'Create a Level 2 5x5 maze that loads automatically after finding the first treasure'
    ],
    presentationChecklist: [
      'Show the winning path (E, S, S, E, S, E) reaching the treasure in 6 moves',
      'Demonstrate trying to walk into a wall (#) and explain how next_r / next_c prevented it',
      'Explain why row index changes on North/South while column index changes on East/West'
    ],
    xpReward: 300
  },
  {
    id: 'rps-league',
    classNumber: 19,
    title: 'Rock, Paper, Scissors League',
    subtitle: 'Multi-Round Arena Tournament with AI Opponent & Match Analytics',
    missionBrief:
      'Program a championship Rock, Paper, Scissors tournament against the PY-9 Bot! Validate player inputs, generate computer choices with random.choice(), write a modular decide_winner() function, and crown the League Champion.',
    cinematicIntro:
      'Welcome to the Grand Cyber Colosseum! Hasthaksh is coding the official referee and AI opponent engine for the Rock, Paper, Scissors Championship League.',
    objectives: [
      'Use random.choice(choices) to simulate an unpredictable computer opponent',
      'Encapsulate game rules inside a reusable decide_winner(player, computer) function',
      'Validate user input so typos do not crash or waste a tournament round',
      'Track player wins, computer wins, and ties across multiple rounds'
    ],
    skillsPractised: [
      'import random & random.choice()',
      'Functions with multiple parameters & return values',
      'Compound boolean expressions (and / or)',
      'Input validation & tournament state tracking'
    ],
    featuresRequired: [
      'decide_winner(player, computer) function returning "player", "computer", or "tie"',
      'Input validation checking if player choice is in ["rock", "paper", "scissors"]',
      'Multi-round loop updating player_wins, computer_wins, and ties',
      'Final championship scoreboard and trophy declaration'
    ],
    studentInstructions: [
      'Complete decide_winner(player, computer) using if/elif/else and compound booleans.',
      'Write a loop to play 3 tournament rounds.',
      'Validate that the cleaned player input is inside the choices list.',
      'Print each round result and the final League Champion.'
    ],
    defaultInputValues: 'rock\npaper\nscissors',
    starterBoilerplate: `# ============================================
# PROJECT 3: ROCK, PAPER, SCISSORS LEAGUE
# Student: Hasthaksh
# ============================================

import random

choices = ["rock", "paper", "scissors"]
player_wins = 0
computer_wins = 0
ties = 0

def decide_winner(player, computer):
    # TODO: Return "player", "computer", or "tie"
    pass

# TODO: Play multiple rounds
# TODO: Validate player input
# TODO: Update scoreboard and declare overall champion`,
    milestones: [
      {
        id: 'rps-m1',
        title: 'Milestone 1: Write decide_winner(player, computer)',
        todoMarker: '# TODO: Return "player"',
        description: 'Return "tie" if both choices match, "player" if the player beats the computer, or "computer" otherwise.',
        hint: 'Check if player == computer first. Then check the 3 winning combinations for player using or.'
      },
      {
        id: 'rps-m2',
        title: 'Milestone 2: Build the 3-Round Tournament Loop',
        todoMarker: '# TODO: Play multiple rounds',
        description: 'Loop through 3 rounds, read player input in lowercase, and validate that it is in choices.',
        hint: 'Use for round_num in range(1, 4): and check if player_move not in choices:'
      },
      {
        id: 'rps-m3',
        title: 'Milestone 3: Update the League Scoreboard',
        todoMarker: '# TODO: Update scoreboard',
        description: 'Call decide_winner(player_move, comp_move) and increment player_wins, computer_wins, or ties.',
        hint: 'Store result = decide_winner(player_move, comp_move) and use if/elif/else to update counters.'
      },
      {
        id: 'rps-m4',
        title: 'Milestone 4: Crown the Overall League Champion',
        todoMarker: '# TODO: Declare overall champion',
        description: 'Print the final scoreboard (Player Wins, Computer Wins, Ties) and announce the overall trophy winner!',
        hint: 'Compare player_wins > computer_wins, elif computer_wins > player_wins, else tie.'
      }
    ],
    teacherSolution: `# ============================================
# PROJECT 3: ROCK, PAPER, SCISSORS LEAGUE (TEACHER SOLUTION)
# Student: Hasthaksh
# ============================================

import random

random.seed(7)
choices = ["rock", "paper", "scissors"]
player_wins = 0
computer_wins = 0
ties = 0

def decide_winner(player, computer):
    if player == computer:
        return "tie"
    if (player == "rock" and computer == "scissors") or (player == "paper" and computer == "rock") or (player == "scissors" and computer == "paper"):
        return "player"
    return "computer"

print("=== ROCK, PAPER, SCISSORS LEAGUE ===")

for round_num in range(1, 4):
    player_move = input().strip().lower()
    if player_move not in choices:
        print(f"Round {round_num}: Invalid move '{player_move}'! Please choose rock, paper, or scissors.")
        continue
    computer_move = random.choice(choices)
    print(f"Round {round_num}: Hasthaksh chose {player_move} | PY-9 Bot chose {computer_move}")
    outcome = decide_winner(player_move, computer_move)
    if outcome == "player":
        print("Result: Hasthaksh wins the round!")
        player_wins = player_wins + 1
    elif outcome == "computer":
        print("Result: PY-9 Bot wins the round!")
        computer_wins = computer_wins + 1
    else:
        print("Result: It is a tie!")
        ties = ties + 1

print(f"Final Scoreboard -> Hasthaksh: {player_wins} | Bot: {computer_wins} | Ties: {ties}")
if player_wins > computer_wins:
    print("LEAGUE CHAMPION: Hasthaksh!")
elif computer_wins > player_wins:
    print("LEAGUE CHAMPION: PY-9 Bot!")
else:
    print("LEAGUE RESULT: Grand Championship Draw!")`,
    acceptanceChecklist: [
      'Uses decide_winner(player, computer) to determine every round outcome cleanly',
      'Rejects invalid inputs (like "lizard" or typos) with a friendly message instead of crashing',
      'Accurately counts player_wins, computer_wins, and ties across all rounds',
      'Prints a clear final scoreboard and crowns the overall winner'
    ],
    stretchChallenges: [
      'Add "spock" and "lizard" to create a 5-weapon Super League',
      'Play a "First to 3 Wins" mode using a while player_wins < 3 and computer_wins < 3 loop',
      'Track the player move history in a list and show their favourite move at the end'
    ],
    presentationChecklist: [
      'Explain how decide_winner() uses compound and / or conditions',
      'Demonstrate what happens when a player types an invalid move',
      'Walk through how random.choice(choices) selects the computer move'
    ],
    xpReward: 300
  }
];

export const FORMAL_ASSESSMENTS: FormalAssessment[] = [
  {
    id: 'mid-course',
    title: 'Mid-Course Checkpoint (After Class 10)',
    subtitle: 'Comprehensive 15-Question Checkpoint covering Classes 1 to 10',
    afterClass: 10,
    recommendedMinutes: 30,
    description:
      'Tests mastery of Python syntax, variables, data types, arithmetic, string slicing & methods, algorithmic thinking, conditionals (if/elif/else), boolean operators, for/while/nested loops, and lists.',
    questions: [
      {
        id: 'MCC-Q01',
        type: 'mcq',
        prompt: '1. Which line of code correctly prints the message Ready for Launch! in Python?',
        options: [
          'print("Ready for Launch!")',
          'Print("Ready for Launch!")',
          'echo "Ready for Launch!"',
          'print(Ready for Launch!)'
        ],
        correctAnswer: 'print("Ready for Launch!")',
        points: 5,
        conceptTag: 'Variables & Input',
        explanation: 'Python commands are case-sensitive (lowercase print) and text strings must be inside quotation marks.'
      },
      {
        id: 'MCC-Q02',
        type: 'mcq',
        prompt: '2. What data type does input() ALWAYS return before you convert it?',
        options: ['str (string)', 'int (integer)', 'float (decimal)', 'bool (boolean)'],
        correctAnswer: 'str (string)',
        points: 5,
        conceptTag: 'Variables & Input',
        explanation: 'input() always returns a string (str), even if the user types digits like 42.'
      },
      {
        id: 'MCC-Q03',
        type: 'mcq',
        prompt: '3. What are the values of 17 // 5 and 17 % 5 in Python?',
        options: [
          '17 // 5 is 3, and 17 % 5 is 2',
          '17 // 5 is 3.4, and 17 % 5 is 5',
          '17 // 5 is 2, and 17 % 5 is 3',
          '17 // 5 is 4, and 17 % 5 is 2'
        ],
        correctAnswer: '17 // 5 is 3, and 17 % 5 is 2',
        points: 5,
        conceptTag: 'Arithmetic & Operators',
        explanation: '// is floor division (5 goes into 17 three whole times) and % is remainder (17 - 15 = 2).'
      },
      {
        id: 'MCC-Q04',
        type: 'mcq',
        prompt: '4. If word = "PYTHON", what does word[1:4] evaluate to?',
        options: ['"YTH"', '"PYT"', '"YTHO"', '"PYTHON"'],
        correctAnswer: '"YTH"',
        points: 5,
        conceptTag: 'Strings & Slicing',
        explanation: 'Index 1 is "Y", index 2 is "T", index 3 is "H". The stop index 4 is excluded.'
      },
      {
        id: 'MCC-Q05',
        type: 'mcq',
        prompt: '5. In a flowchart, which shape represents a Decision (such as an if condition)?',
        options: ['Diamond', 'Rectangle', 'Oval', 'Arrow'],
        correctAnswer: 'Diamond',
        points: 5,
        conceptTag: 'Algorithmic Thinking',
        explanation: 'Diamonds represent Yes/No or True/False decision branches in flowcharts.'
      },
      {
        id: 'MCC-Q06',
        type: 'mcq',
        prompt: '6. Which operator checks if two values are equal in an if statement?',
        options: ['==', '=', '!=', '==='],
        correctAnswer: '==',
        points: 5,
        conceptTag: 'Conditionals',
        explanation: 'Double equals (==) compares two values, whereas single equals (=) assigns a variable.'
      },
      {
        id: 'MCC-Q07',
        type: 'mcq',
        prompt: '7. When does the boolean expression (has_key and not is_trapped) evaluate to True?',
        options: [
          'When has_key is True and is_trapped is False',
          'When both has_key and is_trapped are True',
          'When has_key is False and is_trapped is False',
          'When has_key is False and is_trapped is True'
        ],
        correctAnswer: 'When has_key is True and is_trapped is False',
        points: 5,
        conceptTag: 'Boolean Logic',
        explanation: 'not is_trapped becomes True when is_trapped is False, and "and" requires both sides to be True.'
      },
      {
        id: 'MCC-Q08',
        type: 'mcq',
        prompt: '8. Which numbers are generated by range(2, 9, 3)?',
        options: ['2, 5, 8', '2, 3, 4, 5, 6, 7, 8, 9', '2, 5, 8, 11', '3, 6, 9'],
        correctAnswer: '2, 5, 8',
        points: 5,
        conceptTag: 'For Loops',
        explanation: 'It starts at 2, adds step 3 each time (2, 5, 8), and stops before reaching 9.'
      },
      {
        id: 'MCC-Q09',
        type: 'predict',
        prompt: '9. Trace this code carefully. What is the exact number printed?',
        codeSnippet: `total = 10
for n in [2, 4, 6]:
    if n > 3:
        total = total + n
print(total)`,
        options: ['20', '22', '16', '10'],
        correctAnswer: '20',
        points: 10,
        conceptTag: 'For Loops',
        explanation: 'Only 4 and 6 are greater than 3, so total becomes 10 + 4 + 6 = 20.'
      },
      {
        id: 'MCC-Q10',
        type: 'predict',
        prompt: '10. What number is printed by this nested loop?',
        codeSnippet: `count = 0
for r in range(2):
    for c in range(3):
        count = count + 1
print(count)`,
        options: ['6', '5', '3', '2'],
        correctAnswer: '6',
        points: 10,
        conceptTag: 'Nested Loops',
        explanation: 'The outer loop runs 2 times and the inner loop runs 3 times per outer loop: 2 * 3 = 6.'
      },
      {
        id: 'MCC-Q11',
        type: 'predict',
        prompt: '11. What does this list program print at the end?',
        codeSnippet: `items = ["shield", "potion", "map"]
items.append("key")
items.pop(1)
print(items[1])`,
        options: ['map', 'potion', 'key', 'shield'],
        correctAnswer: 'map',
        points: 10,
        conceptTag: 'Lists & Operations',
        explanation: 'After popping index 1 ("potion"), the list is ["shield", "map", "key"], so index 1 is "map".'
      },
      {
        id: 'MCC-Q12',
        type: 'identify_error',
        prompt: '12. Why would this while loop run forever (infinite loop)?',
        codeSnippet: `energy = 3
while energy > 0:
    print("Boosting!")`,
        options: [
          'energy is never decreased inside the loop, so energy > 0 stays True forever',
          'while loops cannot use the > operator',
          'energy starts at 3 instead of 0',
          'print() resets energy to 3 each time'
        ],
        correctAnswer: 'energy is never decreased inside the loop, so energy > 0 stays True forever',
        acceptableKeywords: ['energy', 'decreased', 'subtract', 'update', 'forever'],
        points: 10,
        conceptTag: 'While Loops',
        explanation: 'Every while loop needs a progress update (like energy = energy - 1) so the condition eventually becomes False.'
      },
      {
        id: 'MCC-Q13',
        type: 'identify_error',
        prompt: '13. Which fix repairs all three bugs in this conditional block?',
        codeSnippet: `score = 100
if score = 100
print("Perfect!")`,
        options: [
          'Use == for comparison, add a colon : at the end of the if line, and indent print("Perfect!")',
          'Change score = 100 to score == 100 on the first line',
          'Use elif instead of if',
          'Put print("Perfect!") on the same line without a colon'
        ],
        correctAnswer: 'Use == for comparison, add a colon : at the end of the if line, and indent print("Perfect!")',
        acceptableKeywords: ['==', 'colon', 'indent'],
        points: 10,
        conceptTag: 'Conditionals',
        explanation: 'Python if statements require == for equality, a trailing colon (:), and an indented body.'
      },
      {
        id: 'MCC-Q14',
        type: 'coding',
        prompt: '14. Practical Coding 1: Write the Python expression that cleans spaces from badge = "  golden_wings  ", replaces "_" with " ", and prints it in uppercase.',
        codeSnippet: `badge = "  golden_wings  "\n# Write the print statement below:`,
        correctAnswer: 'print(badge.strip().replace("_", " ").upper())',
        acceptableKeywords: ['strip', 'replace', 'upper', 'print'],
        points: 10,
        conceptTag: 'Strings & Slicing',
        explanation: 'Chain badge.strip().replace("_", " ").upper() inside print().'
      },
      {
        id: 'MCC-Q15',
        type: 'coding',
        prompt: '15. Practical Coding 2: Given scores = [12, 5, 18, 3, 15], write a loop that adds ONLY numbers >= 10 into high_total and prints high_total (45).',
        codeSnippet: `scores = [12, 5, 18, 3, 15]\nhigh_total = 0`,
        correctAnswer: 'for s in scores:\n    if s >= 10:\n        high_total += s\nprint(high_total)',
        acceptableKeywords: ['for', 'if', '10', 'high_total', 'print'],
        points: 10,
        conceptTag: 'Lists & Operations',
        explanation: 'Loop through scores, check if s >= 10, add to high_total, and print(high_total).'
      }
    ]
  },
  {
    id: 'final-assessment',
    title: 'Final Assessment (After Class 20)',
    subtitle: 'Complete 25-Question Capstone Exam (15 Objective, 5 Code-Tracing, 3 Debugging, 2 Independent Coding)',
    afterClass: 20,
    recommendedMinutes: 45,
    description:
      'Evaluates full-course mastery across Classes 1 to 20: strings, lists, 2D grids, dictionaries, functions, parameters & return values, modules, error handling (try/except), problem decomposition, and game logic.',
    questions: [
      // 15 Objective Questions
      {
        id: 'FA-Q01',
        type: 'mcq',
        prompt: '1. Which expression converts the string "25" into a whole number so you can add 5 to it?',
        options: ['int("25") + 5', 'str("25") + 5', 'len("25") + 5', 'float(5) + "25"'],
        correctAnswer: 'int("25") + 5',
        points: 3,
        conceptTag: 'Variables & Input',
        explanation: 'int("25") converts the string "25" to the integer 25.'
      },
      {
        id: 'FA-Q02',
        type: 'mcq',
        prompt: '2. What does "ROCKET"[-1] return in Python?',
        options: ['"T"', '"R"', '"ROCKET"', 'IndexError'],
        correctAnswer: '"T"',
        points: 3,
        conceptTag: 'Strings & Slicing',
        explanation: 'Negative index -1 always accesses the last character of a string or list.'
      },
      {
        id: 'FA-Q03',
        type: 'mcq',
        prompt: '3. What is the difference between items.append("gem") and len(items)?',
        options: [
          'append() modifies the list in-place by adding an item at the end, while len() returns the number of items',
          'len() deletes the last item, while append() sorts the list',
          'Both do the exact same thing',
          'append() only works on dictionaries'
        ],
        correctAnswer: 'append() modifies the list in-place by adding an item at the end, while len() returns the number of items',
        points: 3,
        conceptTag: 'Lists & Operations',
        explanation: '.append() mutates the list by adding an element, whereas len() counts how many elements exist.'
      },
      {
        id: 'FA-Q04',
        type: 'mcq',
        prompt: '4. In a dictionary hero = {"name": "Hasthaksh", "level": 9}, what is "level"?',
        options: ['A key', 'A value', 'An index number', 'A module'],
        correctAnswer: 'A key',
        points: 3,
        conceptTag: 'Dictionaries',
        explanation: 'In key: value pairs, "level" is the key and 9 is its associated value.'
      },
      {
        id: 'FA-Q05',
        type: 'mcq',
        prompt: '5. Which dictionary method lets you safely look up a key without crashing if the key is missing?',
        options: ['.get("key", 0)', '.pop("key")', '.items()', '.append("key")'],
        correctAnswer: '.get("key", 0)',
        points: 3,
        conceptTag: 'Dictionaries',
        explanation: 'dict.get(key, default) returns the default value instead of raising a KeyError when the key is not found.'
      },
      {
        id: 'FA-Q06',
        type: 'mcq',
        prompt: '6. Which keyword is used to define a new function in Python?',
        options: ['def', 'function', 'fun', 'return'],
        correctAnswer: 'def',
        points: 3,
        conceptTag: 'Functions',
        explanation: 'Python uses def followed by the function name, parentheses, and a colon.'
      },
      {
        id: 'FA-Q07',
        type: 'mcq',
        prompt: '7. Why is returning a value with return better than only using print() inside a calculation function?',
        options: [
          'return sends the result back to the caller so it can be stored in a variable or used in further math',
          'return automatically prints the value in bold text',
          'print() is not allowed inside functions',
          'return repeats the function 10 times'
        ],
        correctAnswer: 'return sends the result back to the caller so it can be stored in a variable or used in further math',
        points: 3,
        conceptTag: 'Parameters & Return',
        explanation: 'print() only displays text on screen (and returns None), whereas return passes the actual data value back.'
      },
      {
        id: 'FA-Q08',
        type: 'mcq',
        prompt: '8. What is a "local variable" inside a function?',
        options: [
          'A variable created inside a function that only exists while that function is running',
          'A variable that can be used in every file on your computer',
          'A variable that never changes its value',
          'A variable imported from the random module'
        ],
        correctAnswer: 'A variable created inside a function that only exists while that function is running',
        points: 3,
        conceptTag: 'Parameters & Return',
        explanation: 'Local variables have local scope and cannot be accessed outside the function where they were created.'
      },
      {
        id: 'FA-Q09',
        type: 'mcq',
        prompt: '9. After writing import random, which call picks a random integer from 1 to 6 (inclusive)?',
        options: [
          'random.randint(1, 6)',
          'random.choice(1, 6)',
          'random.range(1, 6)',
          'randint.random(1, 6)'
        ],
        correctAnswer: 'random.randint(1, 6)',
        points: 3,
        conceptTag: 'Random & Modules',
        explanation: 'random.randint(a, b) returns a random integer N such that a <= N <= b.'
      },
      {
        id: 'FA-Q10',
        type: 'mcq',
        prompt: '10. In a 2D grid maze, what does maze[2][3] access?',
        options: [
          'Row index 2 (the 3rd row), Column index 3 (the 4th column)',
          'Row index 3, Column index 2',
          'All items in row 2 and row 3',
          'The last tile of a 2x3 grid'
        ],
        correctAnswer: 'Row index 2 (the 3rd row), Column index 3 (the 4th column)',
        points: 3,
        conceptTag: '2D Grids & Coordinates',
        explanation: 'In 2D lists, the first bracket is the row index and the second bracket is the column index (0-based).'
      },
      {
        id: 'FA-Q11',
        type: 'mcq',
        prompt: '11. What exception does Python raise if a user types "hello" into int(input())?',
        options: ['ValueError', 'ZeroDivisionError', 'KeyError', 'SyntaxError'],
        correctAnswer: 'ValueError',
        points: 3,
        conceptTag: 'Debugging & Exceptions',
        explanation: 'int("hello") raises a ValueError because the characters cannot be converted to a base-10 integer.'
      },
      {
        id: 'FA-Q12',
        type: 'mcq',
        prompt: '12. Which block is paired with try: to catch and handle runtime errors gracefully?',
        options: ['except:', 'catch:', 'error:', 'rescue:'],
        correctAnswer: 'except:',
        points: 3,
        conceptTag: 'Debugging & Exceptions',
        explanation: 'Python uses try: and except: (such as except ValueError:) to handle runtime exceptions.'
      },
      {
        id: 'FA-Q13',
        type: 'mcq',
        prompt: '13. What does break do when executed inside a while or for loop?',
        options: [
          'It immediately exits the loop and jumps to the first line after the loop',
          'It pauses the program for 5 seconds',
          'It restarts the program from line 1',
          'It deletes all variables in the program'
        ],
        correctAnswer: 'It immediately exits the loop and jumps to the first line after the loop',
        points: 3,
        conceptTag: 'While Loops',
        explanation: 'break terminates the nearest enclosing loop right away.'
      },
      {
        id: 'FA-Q14',
        type: 'mcq',
        prompt: '14. In software engineering, what is "decomposition"?',
        options: [
          'Breaking a large, complex problem into smaller, manageable functions or steps',
          'Deleting comments from finished code',
          'Putting the entire program on a single line',
          'Converting numbers into strings'
        ],
        correctAnswer: 'Breaking a large, complex problem into smaller, manageable functions or steps',
        points: 3,
        conceptTag: 'Algorithmic Thinking',
        explanation: 'Decomposition makes big projects like Treasure Maze or RPS League easier to build, test, and debug.'
      },
      {
        id: 'FA-Q15',
        type: 'mcq',
        prompt: '15. Why do good programmers test "edge cases" (like empty input "", 0, or negative numbers)?',
        options: [
          'Because bugs often hide at boundary values, and edge-case testing ensures the program will not crash unexpectedly',
          'Because Python requires at least 10 inputs to run',
          'Because edge cases make the font size larger',
          'Because normal inputs are not allowed in functions'
        ],
        correctAnswer: 'Because bugs often hide at boundary values, and edge-case testing ensures the program will not crash unexpectedly',
        points: 3,
        conceptTag: 'Debugging & Exceptions',
        explanation: 'Testing boundary and unusual inputs verifies that validation and error handling work properly.'
      },
      // 5 Code-Tracing Questions
      {
        id: 'FA-Q16',
        type: 'predict',
        prompt: '16. Trace this function call. What is printed by print(result)?',
        codeSnippet: `def calc_bonus(coins, multiplier=2):
    return coins * multiplier + 5

result = calc_bonus(10, 3)
print(result)`,
        options: ['35', '25', '65', '30'],
        correctAnswer: '35',
        points: 5,
        conceptTag: 'Parameters & Return',
        explanation: 'Passing 3 overrides the default multiplier=2, so 10 * 3 + 5 = 35.'
      },
      {
        id: 'FA-Q17',
        type: 'predict',
        prompt: '17. Trace this dictionary loop. What is printed?',
        codeSnippet: `bag = {"apple": 2, "berry": 5, "pear": 3}
bag["apple"] = bag["apple"] + 4
total = 0
for item, qty in bag.items():
    total = total + qty
print(total)`,
        options: ['14', '10', '6', '12'],
        correctAnswer: '14',
        points: 5,
        conceptTag: 'Dictionaries',
        explanation: '"apple" becomes 2 + 4 = 6. Then 6 + 5 + 3 = 14.'
      },
      {
        id: 'FA-Q18',
        type: 'predict',
        prompt: '18. Trace this 2D grid access. What is printed?',
        codeSnippet: `grid = [
    ["A", "B", "C"],
    ["D", "E", "F"],
    ["G", "H", "I"]
]
r = 0
c = 2
r = r + 1
c = c - 1
print(grid[r][c])`,
        options: ['E', 'B', 'F', 'D'],
        correctAnswer: 'E',
        points: 5,
        conceptTag: '2D Grids & Coordinates',
        explanation: 'r becomes 0 + 1 = 1, and c becomes 2 - 1 = 1. grid[1][1] is the centre tile "E".'
      },
      {
        id: 'FA-Q19',
        type: 'predict',
        prompt: '19. Trace this try / except block. What is the exact output?',
        codeSnippet: `values = ["10", "oops", "20"]
total = 0
for v in values:
    try:
        total = total + int(v)
    except ValueError:
        total = total + 1
print(total)`,
        options: ['31', '30', '11', 'ValueError crash'],
        correctAnswer: '31',
        points: 5,
        conceptTag: 'Debugging & Exceptions',
        explanation: '"10" adds 10, "oops" triggers except ValueError and adds 1, and "20" adds 20: 10 + 1 + 20 = 31.'
      },
      {
        id: 'FA-Q20',
        type: 'predict',
        prompt: '20. Trace how these two functions work together. What is printed?',
        codeSnippet: `def double(x):
    return x * 2

def add_ten(y):
    return double(y) + 10

print(add_ten(7))`,
        options: ['24', '34', '17', '14'],
        correctAnswer: '24',
        points: 5,
        conceptTag: 'Parameters & Return',
        explanation: 'add_ten(7) calls double(7) which returns 14, then adds 10 to get 24.'
      },
      // 3 Debugging Questions
      {
        id: 'FA-Q21',
        type: 'identify_error',
        prompt: '21. Why does print(saved_price) print None instead of 40?',
        codeSnippet: `def apply_discount(price):
    new_price = price - 10
    print(new_price)

saved_price = apply_discount(50)
print(saved_price)`,
        options: [
          'apply_discount uses print(new_price) instead of return new_price, so the function returns None',
          'price - 10 is a SyntaxError',
          '50 is too large for a function argument',
          'saved_price needs to be inside quotes'
        ],
        correctAnswer: 'apply_discount uses print(new_price) instead of return new_price, so the function returns None',
        acceptableKeywords: ['return', 'print', 'None'],
        points: 5,
        conceptTag: 'Parameters & Return',
        explanation: 'A function without a return statement automatically returns None when assigned to a variable.'
      },
      {
        id: 'FA-Q22',
        type: 'identify_error',
        prompt: '22. What bug causes this Treasure Maze boundary check to crash with an IndexError when next_r is 4?',
        codeSnippet: `if maze[next_r][next_c] != "#" and next_r < 4:
    player_row = next_r`,
        options: [
          'It checks maze[next_r][next_c] BEFORE checking next_r < 4, so Python indexes out of range first',
          '!= "#" is not valid Python syntax',
          'player_row cannot be updated inside an if block',
          'next_r should be compared with == 4'
        ],
        correctAnswer: 'It checks maze[next_r][next_c] BEFORE checking next_r < 4, so Python indexes out of range first',
        acceptableKeywords: ['before', 'bounds', 'next_r < 4', 'order'],
        points: 5,
        conceptTag: '2D Grids & Coordinates',
        explanation: 'Because "and" evaluates left-to-right, boundary checks (0 <= next_r < 4) must always come BEFORE indexing maze[next_r][next_c].'
      },
      {
        id: 'FA-Q23',
        type: 'identify_error',
        prompt: '23. In this Rock, Paper, Scissors check, why does typing "Rock" with a capital R get rejected as invalid?',
        codeSnippet: `choices = ["rock", "paper", "scissors"]
move = input().strip()
if move not in choices:
    print("Invalid move!")`,
        options: [
          'input().strip() did not call .lower(), so "Rock" does not match lowercase "rock" in choices',
          'choices should be a dictionary instead of a list',
          'not in only works on numbers',
          'strip() capitalises the first letter'
        ],
        correctAnswer: 'input().strip() did not call .lower(), so "Rock" does not match lowercase "rock" in choices',
        acceptableKeywords: ['lower', 'case', 'capital'],
        points: 5,
        conceptTag: 'Strings & Slicing',
        explanation: 'String comparisons are case-sensitive; chaining .strip().lower() normalises "Rock" to "rock".'
      },
      // 2 Independent Coding Tasks
      {
        id: 'FA-Q24',
        type: 'coding',
        prompt: '24. Independent Coding 1: Write a function count_passing(scores) that takes a list of numbers and returns how many scores are 50 or higher. Then call print(count_passing([40, 75, 50, 20, 90])).',
        codeSnippet: `# Define count_passing(scores) and print the result for [40, 75, 50, 20, 90]`,
        correctAnswer: 'def count_passing(scores):\n    count = 0\n    for s in scores:\n        if s >= 50:\n            count += 1\n    return count\nprint(count_passing([40, 75, 50, 20, 90]))',
        acceptableKeywords: ['def', 'count_passing', 'for', '50', 'return', 'print'],
        points: 7,
        conceptTag: 'Functions',
        explanation: 'Define def count_passing(scores):, loop through scores, increment count when s >= 50, return count, and print the call.'
      },
      {
        id: 'FA-Q25',
        type: 'coding',
        prompt: '25. Independent Coding 2: Given inventory = {"gold": 50, "gems": 3}, add 25 to "gold", add a new key "shields" with value 2, and loop through inventory.items() to print each pair.',
        codeSnippet: `inventory = {"gold": 50, "gems": 3}`,
        correctAnswer: 'inventory["gold"] += 25\ninventory["shields"] = 2\nfor k, v in inventory.items():\n    print(f"{k}: {v}")',
        acceptableKeywords: ['gold', 'shields', 'items', 'for', 'print'],
        points: 8,
        conceptTag: 'Dictionaries',
        explanation: 'Update inventory["gold"], assign inventory["shields"] = 2, and loop with for k, v in inventory.items(): print(f"{k}: {v}").'
      }
    ]
  }
];
