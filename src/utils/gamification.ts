import {
  UserProgressState,
  QuizQuestion,
  QuizResultRecord,
  PracticeExercise,
  MasteryStatus,
} from '../types/quest';

export const STORAGE_KEY = 'hasthaksh_python_quest_v1';

export interface LevelDefinition {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  perk: string;
}

export const LEVEL_DEFINITIONS: LevelDefinition[] = [
  { level: 1, title: 'Python Explorer', minXp: 0, maxXp: 250, perk: 'Mission Control & Foundations Unlocked' },
  { level: 2, title: 'Variable Wizard', minXp: 250, maxXp: 600, perk: 'Data Type Inspector & String Slicer' },
  { level: 3, title: 'Logic Detective', minXp: 600, maxXp: 1100, perk: 'Truth Table Matrix & Branch Tracer' },
  { level: 4, title: 'Loop Master', minXp: 1100, maxXp: 1700, perk: 'Nested Grid & Pattern Factory Engine' },
  { level: 5, title: 'Data Champion', minXp: 1700, maxXp: 2400, perk: 'List & Leaderboard Analytics Tools' },
  { level: 6, title: 'Function Engineer', minXp: 2400, maxXp: 3200, perk: 'Modular Architecture & Scope Debugger' },
  { level: 7, title: 'Debugging Ninja', minXp: 3200, maxXp: 4100, perk: 'Exception Shield & Edge-Case Scanner' },
  { level: 8, title: 'Game Developer', minXp: 4100, maxXp: 5000, perk: 'Capstone Project Studio & AI Opponent' },
  { level: 9, title: 'Python Champion', minXp: 5000, maxXp: 10000, perk: 'Grand Showcase Master & Honour Seal' },
];

export interface BadgeDefinition {
  id: string;
  title: string;
  description: string;
  requirementText: string;
  accentColor: string;
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: 'first-program',
    title: 'First Program',
    description: 'Executed your first real Python 3 program in the Quest IDE.',
    requirementText: 'Solve any coding exercise or complete Class 1 live demo.',
    accentColor: '#22D3EE',
  },
  {
    id: 'input-master',
    title: 'Input Master',
    description: 'Mastered interactive programs using input(), type conversion, and f-strings.',
    requirementText: 'Complete Class 1 & Class 2 or solve 6+ Phase 1 exercises.',
    accentColor: '#38BDF8',
  },
  {
    id: 'logic-legend',
    title: 'Logic Legend',
    description: 'Conquered if/elif/else branching and Boolean truth tables.',
    requirementText: 'Complete Class 4 & Class 5 or pass their exit quizzes.',
    accentColor: '#A855F7',
  },
  {
    id: 'loop-architect',
    title: 'Loop Architect',
    description: 'Engineered for loops, while countdowns, and nested pattern grids.',
    requirementText: 'Complete Class 6, 7, and 8 or solve 10+ loop challenges.',
    accentColor: '#F59E0B',
  },
  {
    id: 'list-explorer',
    title: 'List Explorer',
    description: 'Organised inventories, leaderboards, and dictionaries with precision.',
    requirementText: 'Complete Class 9, 10, and 13.',
    accentColor: '#10B981',
  },
  {
    id: 'function-builder',
    title: 'Function Builder',
    description: 'Designed modular, reusable functions with parameters and return values.',
    requirementText: 'Complete Class 11 & Class 12.',
    accentColor: '#EC4899',
  },
  {
    id: 'bug-hunter',
    title: 'Bug Hunter',
    description: 'Diagnosed and repaired syntax, runtime, and logic bugs across missions.',
    requirementText: 'Solve at least 8 debugging challenges or complete Class 16.',
    accentColor: '#EF4444',
  },
  {
    id: 'project-creator',
    title: 'Project Creator',
    description: 'Built and testedQuiz Master, Treasure Maze, or Rock Paper Scissors League.',
    requirementText: 'Complete at least one Major Project in the Project Studio.',
    accentColor: '#FBBF24',
  },
  {
    id: 'python-champion',
    title: 'Python Champion',
    description: 'Graduated from all 20 classes and completed the Grand Showcase.',
    requirementText: 'Reach 5,000 XP or complete all 20 classes & Final Assessment.',
    accentColor: '#22D3EE',
  },
];

export function getLevelInfo(xp: number): {
  current: LevelDefinition;
  next: LevelDefinition | null;
  progressPercent: number;
  xpIntoLevel: number;
  xpRequiredForNext: number;
} {
  let current = LEVEL_DEFINITIONS[0];
  let next: LevelDefinition | null = LEVEL_DEFINITIONS[1];

  for (let i = 0; i < LEVEL_DEFINITIONS.length; i++) {
    if (xp >= LEVEL_DEFINITIONS[i].minXp) {
      current = LEVEL_DEFINITIONS[i];
      next = LEVEL_DEFINITIONS[i + 1] ?? null;
    }
  }

  if (!next) {
    return {
      current,
      next: null,
      progressPercent: 100,
      xpIntoLevel: xp - current.minXp,
      xpRequiredForNext: current.maxXp - current.minXp,
    };
  }

  const span = next.minXp - current.minXp;
  const into = Math.max(0, xp - current.minXp);
  const progressPercent = Math.min(100, Math.round((into / span) * 100));

  return {
    current,
    next,
    progressPercent,
    xpIntoLevel: into,
    xpRequiredForNext: span,
  };
}

export function computeUnlockedBadges(state: UserProgressState, allExercises: PracticeExercise[]): string[] {
  const badges = new Set<string>(state.unlockedBadges);
  const solvedIds = Object.values(state.exerciseRecords).filter((r) => r.solved);

  if (solvedIds.length >= 1 || state.completedLessons.length >= 1) {
    badges.add('first-program');
  }

  const phase1Solved = solvedIds.filter((r) => {
    const ex = allExercises.find((e) => e.id === r.exerciseId);
    return ex && ex.lessonId <= 2;
  }).length;
  if ((state.completedLessons.includes(1) && state.completedLessons.includes(2)) || phase1Solved >= 6) {
    badges.add('input-master');
  }

  if (
    (state.completedLessons.includes(4) && state.completedLessons.includes(5)) ||
    (state.quizResults['lesson-4'] && state.quizResults['lesson-5'])
  ) {
    badges.add('logic-legend');
  }

  const loopSolved = solvedIds.filter((r) => {
    const ex = allExercises.find((e) => e.id === r.exerciseId);
    return ex && ex.lessonId >= 6 && ex.lessonId <= 8;
  }).length;
  if (
    (state.completedLessons.includes(6) && state.completedLessons.includes(7) && state.completedLessons.includes(8)) ||
    loopSolved >= 8
  ) {
    badges.add('loop-architect');
  }

  if (state.completedLessons.includes(9) && state.completedLessons.includes(10)) {
    badges.add('list-explorer');
  }

  if (state.completedLessons.includes(11) && state.completedLessons.includes(12)) {
    badges.add('function-builder');
  }

  const debugSolved = solvedIds.filter((r) => {
    const ex = allExercises.find((e) => e.id === r.exerciseId);
    return ex && ex.category === 'debug';
  }).length;
  if (debugSolved >= 5 || state.completedLessons.includes(16)) {
    badges.add('bug-hunter');
  }

  const anyProjectCompleted = Object.values(state.projectProgress).some((p) => p.completed);
  if (anyProjectCompleted) {
    badges.add('project-creator');
  }

  if (state.xp >= 5000 || state.completedLessons.length >= 20) {
    badges.add('python-champion');
  }

  return Array.from(badges);
}

export function normalizeOutput(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .trim();
}

export function verifyOutputMatch(actualStdout: string, expectedOutput: string, code?: string, validationKeywords?: string[]): {
  passed: boolean;
  feedback: string;
} {
  const normActual = normalizeOutput(actualStdout);
  const normExpected = normalizeOutput(expectedOutput);

  if (!normActual && normExpected) {
    return {
      passed: false,
      feedback: 'Your program ran without producing any output. Make sure you use print() to display the result!',
    };
  }

  if (validationKeywords && validationKeywords.length > 0 && code) {
    for (const kw of validationKeywords) {
      if (!code.includes(kw)) {
        return {
          passed: false,
          feedback: `Your code should use '${kw}' to solve this mission properly.`,
        };
      }
    }
  }

  if (normActual === normExpected) {
    return {
      passed: true,
      feedback: 'Exact match! Your Python program produced the expected output.',
    };
  }

  // Case-insensitive, whitespace-tolerant, and float .0 tolerant check
  const compactActual = normActual.toLowerCase().replace(/\s+/g, ' ').replace(/(\d+)\.0\b/g, '$1');
  const compactExpected = normExpected.toLowerCase().replace(/\s+/g, ' ').replace(/(\d+)\.0\b/g, '$1');
  if (compactActual === compactExpected) {
    return {
      passed: true,
      feedback: 'Output verified! Your Python program produced the expected result.',
    };
  }

  return {
    passed: false,
    feedback: `Expected output:\n${normExpected}\n\nYour program printed:\n${normActual}`,
  };
}

export function evaluateQuizSubmission(
  quizId: string,
  questions: QuizQuestion[],
  userAnswers: Record<string, string>,
  timeTakenSeconds: number
): QuizResultRecord {
  let score = 0;
  let maxScore = 0;
  const conceptScores: Record<string, { earned: number; total: number }> = {};

  for (const q of questions) {
    maxScore += q.points;
    if (!conceptScores[q.conceptTag]) {
      conceptScores[q.conceptTag] = { earned: 0, total: 0 };
    }
    conceptScores[q.conceptTag].total += q.points;

    const rawAns = (userAnswers[q.id] ?? '').trim();
    let isCorrect = false;

    if (q.type === 'mcq') {
      isCorrect = rawAns.toLowerCase() === q.correctAnswer.trim().toLowerCase();
    } else if (q.type === 'predict' || q.type === 'fill_code' || q.type === 'arrange') {
      const normUser = normalizeOutput(rawAns).toLowerCase();
      const normCorr = normalizeOutput(q.correctAnswer).toLowerCase();
      isCorrect = normUser === normCorr;
    } else if (q.type === 'identify_error' || q.type === 'short_explanation' || q.type === 'coding') {
      const normUser = rawAns.toLowerCase();
      if (normUser === q.correctAnswer.trim().toLowerCase()) {
        isCorrect = true;
      } else if (q.acceptableKeywords && q.acceptableKeywords.length > 0) {
        const matchedCount = q.acceptableKeywords.filter((kw) => normUser.includes(kw.toLowerCase())).length;
        isCorrect = matchedCount >= Math.ceil(q.acceptableKeywords.length * 0.6);
      }
    }

    if (isCorrect) {
      score += q.points;
      conceptScores[q.conceptTag].earned += q.points;
    }
  }

  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const conceptsMastered: string[] = [];
  const conceptsNeedingRevision: string[] = [];

  for (const [concept, tally] of Object.entries(conceptScores)) {
    if (tally.earned / tally.total >= 0.7) {
      conceptsMastered.push(concept);
    } else {
      conceptsNeedingRevision.push(concept);
    }
  }

  return {
    quizId,
    score,
    maxScore,
    percentage,
    answers: userAnswers,
    conceptsMastered,
    conceptsNeedingRevision,
    timeTakenSeconds,
    completedAt: new Date().toISOString(),
  };
}

export function determineMasteryStatus(hintsUsed: number, solutionViewed: boolean): MasteryStatus {
  if (solutionViewed) return 'after_example';
  if (hintsUsed > 0) return 'with_hints';
  return 'independent';
}

export function getAdaptiveGuidance(
  lessonId: number,
  exerciseRecords: Record<string, { solved: boolean; attempts: number; hintsUsed: number }>,
  lessonExercises: PracticeExercise[]
): {
  status: 'unlock-boss' | 'steady' | 'scaffold-support';
  headline: string;
  recommendation: string;
  smallerExampleCode?: string;
} {
  const records = lessonExercises
    .map((ex) => exerciseRecords[ex.id])
    .filter(Boolean);

  const solvedWithoutHints = records.filter((r) => r.solved && r.hintsUsed === 0).length;
  const struggling = records.filter((r) => !r.solved && r.attempts >= 2).length;

  if (solvedWithoutHints >= 4) {
    return {
      status: 'unlock-boss',
      headline: 'Accelerated Mastery Detected!',
      recommendation:
        'Hasthaksh is solving challenges independently without hints. Boss Challenge and Extension Missions are unlocked!',
    };
  }

  if (struggling >= 1) {
    const firstEx = lessonExercises[0];
    return {
      status: 'scaffold-support',
      headline: 'Adaptive Scaffold Activated',
      recommendation:
        'Take a step back and inspect this smaller working example first. Run it, watch how each line works, and use Progressive Hint 1 before trying again.',
      smallerExampleCode: firstEx?.teacherSolution || `# Quick micro-example for Class ${lessonId}\nprint("Step 1 works!")`,
    };
  }

  return {
    status: 'steady',
    headline: 'Steady Mission Progress',
    recommendation:
      'Complete Warm-up and Predict-the-Output drills to build momentum toward Independent Coding and the Boss Challenge.',
  };
}

export function createDefaultProgressState(): UserProgressState {
  return {
    studentName: 'Hasthaksh',
    grade: 5,
    mode: 'teacher',
    currentLessonId: 1,
    completedLessons: [],
    unlockedLessons: Array.from({ length: 20 }, (_, i) => i + 1),
    completedActivities: [],
    diagnosticCompleted: false,
    extensionUnlocked: false,
    xp: 120,
    streakDays: 3,
    unlockedBadges: ['first-program'],
    exerciseRecords: {},
    quizResults: {},
    homeworkSubmissions: {},
    projectProgress: {
      'quiz-master': {
        code: '',
        completedMilestones: [],
        checkedAcceptance: [],
        checkedPresentation: [],
        completed: false,
      },
      'treasure-maze': {
        code: '',
        completedMilestones: [],
        checkedAcceptance: [],
        checkedPresentation: [],
        completed: false,
      },
      'rps-league': {
        code: '',
        completedMilestones: [],
        checkedAcceptance: [],
        checkedPresentation: [],
        completed: false,
      },
    },
    teacherNotes: {
      1: 'Hasthaksh already knows basic print() and variables—move briskly into type conversion and the Superhero Identity Generator!',
    },
    lessonDurationMinutes: 60,
    reducedMotion: false,
  };
}

export function loadProgressState(): UserProgressState {
  if (typeof window === 'undefined') return createDefaultProgressState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultProgressState();
    const parsed = JSON.parse(raw);
    return {
      ...createDefaultProgressState(),
      ...parsed,
    };
  } catch {
    return createDefaultProgressState();
  }
}

export function saveProgressState(state: UserProgressState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}
