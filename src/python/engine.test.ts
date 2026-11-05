import test from 'node:test';
import assert from 'node:assert/strict';
import { executePython3Sync } from './engine';
import {
  getLevelInfo,
  computeUnlockedBadges,
  verifyOutputMatch,
  evaluateQuizSubmission,
  createDefaultProgressState
} from '../utils/gamification';
import {
  ALL_LESSONS,
  ALL_EXERCISES,
  ALL_HOMEWORK,
  MAJOR_PROJECTS,
  FORMAL_ASSESSMENTS
} from '../data/curriculum';

test('Python 3 Engine: executes print, variables, arithmetic, and custom input lines', () => {
  const code = `
name = input()
age = int(input())
next_year = age + 1
print(f"Hero {name} will be {next_year}")
print(17 // 5, 17 % 5, 2 ** 4)
`;
  const res = executePython3Sync(code, ['Hasthaksh', '10']);
  assert.equal(res.status, 'success');
  assert.equal(res.stdout.trim(), 'Hero Hasthaksh will be 11\n3 2 16');
  assert.equal(res.traceSteps.length > 0, true);
});

test('Python 3 Engine: supports string indexing, negative indexing, slicing, and methods', () => {
  const code = `
word = "  Python_Quest  "
clean = word.strip()
print(clean[0], clean[-1], clean[0:6])
print(clean.replace("_", " ").upper())
`;
  const res = executePython3Sync(code);
  assert.equal(res.status, 'success');
  assert.equal(res.stdout.trim(), 'P t Python\nPYTHON QUEST');
});

test('Python 3 Engine: supports conditionals, compound booleans, for/while/nested loops', () => {
  const code = `
total = 0
for r in range(2):
    for c in range(3):
        if (r == 0 and c >= 1) or (r == 1 and not (c == 0)):
            total += 10
print("Total:", total)
`;
  const res = executePython3Sync(code);
  assert.equal(res.status, 'success');
  assert.equal(res.stdout.trim(), 'Total: 40');
});

test('Python 3 Engine: supports lists, 2D grids, dictionaries, functions, and try/except', () => {
  const code = `
grid = [["S", "."], ["#", "T"]]
scores = {"quiz": 10, "maze": 20}

def add_score(key, bonus):
    scores[key] = scores.get(key, 0) + bonus
    return scores[key]

print(grid[1][1])
print(add_score("quiz", 5))

try:
    bad = int("not_a_number")
except ValueError:
    print("Caught ValueError safely!")
`;
  const res = executePython3Sync(code);
  assert.equal(res.status, 'success');
  assert.equal(res.stdout.trim(), 'T\n15\nCaught ValueError safely!');
});

test('Curriculum Integrity: 20 classes, 240 exercises, 60 homework tasks, 3 major projects, 2 assessments', () => {
  assert.equal(ALL_LESSONS.length, 20, 'Must have exactly 20 classes');
  assert.equal(ALL_EXERCISES.length, 240, 'Must have exactly 240 practice exercises (12 per class)');
  assert.equal(ALL_HOMEWORK.length, 60, 'Must have exactly 60 homework tasks (3 per class)');
  assert.equal(MAJOR_PROJECTS.length, 3, 'Must have 3 major projects');
  assert.equal(FORMAL_ASSESSMENTS.length, 2, 'Must have 2 formal assessments');
  assert.equal(FORMAL_ASSESSMENTS[0].questions.length, 15, 'Mid-Course Checkpoint must have 15 questions');
  assert.equal(FORMAL_ASSESSMENTS[1].questions.length, 25, 'Final Assessment must have 25 questions');

  for (const lesson of ALL_LESSONS) {
    assert.ok(lesson.theoryBlocks.length >= 2, `Class ${lesson.id} needs theoryBlocks`);
    assert.ok(lesson.exitQuiz.length >= 5, `Class ${lesson.id} needs at least 5 exit quiz items`);
    const lessonEx = ALL_EXERCISES.filter((e) => e.lessonId === lesson.id);
    assert.equal(lessonEx.length, 12, `Class ${lesson.id} must have 12 exercises`);
    const demoInputs = lesson.liveDemo.sampleInput ? lesson.liveDemo.sampleInput.split('\n') : [];
    const demoRun = executePython3Sync(lesson.liveDemo.starterCode, demoInputs);
    assert.equal(demoRun.status, 'success', `Class ${lesson.id} liveDemo failed: ${demoRun.stderr}`);
  }
});

test('Practice Bank Integrity: all 240 exercise teacher solutions execute without error', () => {
  for (const ex of ALL_EXERCISES) {
    const inputs = ex.inputExample ? ex.inputExample.split('\n') : [];
    const res = executePython3Sync(ex.teacherSolution, inputs);
    assert.equal(res.status, 'success', `Exercise ${ex.id} teacherSolution raised error: ${res.stderr}`);
    const check = verifyOutputMatch(res.stdout, ex.expectedOutput);
    assert.equal(
      check.passed,
      true,
      `Exercise ${ex.id} output mismatch: got "${res.stdout}", expected "${ex.expectedOutput}"`
    );
  }
});

test('Major Projects Integrity: all 3 project teacher solutions execute cleanly', () => {
  for (const proj of MAJOR_PROJECTS) {
    const inputs = proj.defaultInputValues ? proj.defaultInputValues.split('\n') : [];
    const res = executePython3Sync(proj.teacherSolution, inputs);
    assert.equal(res.status, 'success', `Project ${proj.id} solution failed: ${res.stderr}`);
    assert.ok(res.stdout.trim().length > 0, `Project ${proj.id} should produce output`);
  }
});

test('Gamification & Quiz Evaluation logic', () => {
  const state = createDefaultProgressState();
  assert.equal(getLevelInfo(0).current.level, 1);
  assert.equal(getLevelInfo(5500).current.level, 9);
  assert.equal(getLevelInfo(5500).current.title, 'Python Champion');

  state.completedLessons = [1, 2];
  const badges = computeUnlockedBadges(state, ALL_EXERCISES);
  assert.ok(badges.includes('first-program'), 'Completing Class 1 awards first-program badge');
  assert.ok(badges.includes('input-master'), 'Completing Class 1 & 2 awards input-master badge');

  const sampleQuiz = ALL_LESSONS[0].exitQuiz;
  const answers: Record<string, string> = {};
  for (const q of sampleQuiz) {
    answers[q.id] = q.correctAnswer;
  }
  const score = evaluateQuizSubmission('lesson-1', sampleQuiz, answers, 45);
  assert.equal(score.percentage, 100);
});
