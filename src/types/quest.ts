export type OperatingMode = 'student' | 'teacher';

export type MainSectionId =
  | 'home'
  | 'roadmap'
  | 'studio'
  | 'playground'
  | 'arena'
  | 'quizzes'
  | 'activities'
  | 'projects'
  | 'homework'
  | 'progress'
  | 'worksheets'
  | 'teacher';

export type ExerciseCategory =
  | 'warmup'
  | 'predict'
  | 'completion'
  | 'debug'
  | 'independent'
  | 'boss';

export type DifficultyLevel = 'Level 1: Warm-up' | 'Level 2: Core' | 'Level 3: Independent' | 'Level 4: Boss';

export type MasteryStatus = 'independent' | 'with_hints' | 'after_example' | 'not_yet';

export interface TheoryBlock {
  id: string;
  title: string;
  simpleExplanation: string;
  whyProgrammersUseIt: string;
  realWorldAnalogy: string;
  pythonSyntax: string;
  workingCodeExample: string;
  sampleInput?: string;
  lineByLineExplanation: { line: string; explanation: string }[];
  expectedOutput: string;
  commonMistakes: string[];
  quickQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface PredictChallenge {
  id: string;
  title: string;
  code: string;
  sampleInput?: string;
  expectedOutput: string;
  explanation: string;
  difficulty: 'Starter' | 'Intermediate' | 'Advanced Trace';
}

export interface ClassActivitySpec {
  id: string;
  lessonId: number;
  title: string;
  objective: string;
  materialsOrCodeRequired: string;
  starterCode: string;
  sampleInput: string;
  teacherSolution: string;
  teacherInstructions: string[];
  studentInstructions: string[];
  timeLimitMinutes: number;
  expectedOutcome: string;
  reflectionQuestion: string;
}

export interface DebuggingMission {
  id: string;
  title: string;
  storyContext: string;
  brokenCode: string;
  sampleInput?: string;
  expectedOutput: string;
  bugType: 'Syntax Error' | 'Runtime Error' | 'Logic Error' | 'Type Error';
  hints: string[];
  teacherFixedCode: string;
  explanationOfFix: string;
}

export type QuizQuestionType =
  | 'mcq'
  | 'predict'
  | 'identify_error'
  | 'fill_code'
  | 'arrange'
  | 'short_explanation'
  | 'coding';

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  prompt: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: string;
  acceptableKeywords?: string[];
  points: number;
  conceptTag: string;
  explanation: string;
}

export interface PracticeExercise {
  id: string;
  lessonId: number;
  category: ExerciseCategory;
  title: string;
  difficulty: DifficultyLevel;
  contextTheme: string;
  instructions: string;
  starterCode: string;
  inputExample: string;
  expectedOutput: string;
  validationKeywords?: string[];
  teacherSolution: string;
  hints: string[];
  markingCriteria: string[];
  explanation: string;
  xpReward: number;
}

export interface HomeworkTask {
  id: string;
  lessonId: number;
  type: 'Core Practice' | 'Creative Task' | 'Challenge Task';
  title: string;
  instructions: string;
  starterCode: string;
  sampleInput: string;
  expectedOutput: string;
  teacherSolution: string;
  markingRubric: string[];
  xpReward: number;
}

export interface StandardMapping {
  lessonId: number;
  englandKS2: string[];
  cstaDomain: 'Algorithms & Design' | 'Programming' | 'Data & Analysis' | 'Systems & Security' | 'Computing & Society';
  cstaOutcomeCode: string;
  cstaOutcomeDescription: string;
  cstaPractice: string;
  relatedActivity: string;
  assessmentEvidence: string;
  masteryIndicator: string;
  coverageStatus: 'Covered in Depth' | 'Introduced & Practised' | 'Extended Application';
  responsibleComputingNote: string;
}

export interface Lesson {
  id: number;
  phase: string;
  title: string;
  subtitle: string;
  comicChapterTitle: string;
  illustrationTheme: 'superhero' | 'detective' | 'robot' | 'decision' | 'lab' | 'factory' | 'rocket' | 'grid' | 'backpack' | 'leaderboard' | 'toolbox' | 'modular' | 'database' | 'dice' | 'treasure' | 'bug' | 'quiz_project' | 'maze_project' | 'rps_project' | 'showcase';
  storyIntro: string;
  realWorldScenario: string;
  characterDialogue: { speaker: string; role: string; line: string }[];
  learningObjectives: string[];
  estimatedDurationMinutes: number;
  difficulty: 'Intermediate Foundations' | 'Accelerated Problem-Solving' | 'Advanced Challenge' | 'Capstone Project';
  topics: string[];
  hasDiagnostic?: boolean;
  theoryBlocks: TheoryBlock[];
  liveDemo: {
    title: string;
    description: string;
    starterCode: string;
    sampleInput: string;
    stepExplanations: { line: number; text: string }[];
    fullExplanation: string;
  };
  predictChallenges: PredictChallenge[];
  classActivity: ClassActivitySpec;
  debuggingMission: DebuggingMission;
  exitQuiz: QuizQuestion[];
  standards: StandardMapping;
}

export interface MajorProject {
  id: 'quiz-master' | 'treasure-maze' | 'rps-league';
  classNumber: number;
  title: string;
  subtitle: string;
  missionBrief: string;
  cinematicIntro: string;
  objectives: string[];
  skillsPractised: string[];
  featuresRequired: string[];
  studentInstructions: string[];
  starterBoilerplate: string;
  defaultInputValues: string;
  milestones: {
    id: string;
    title: string;
    todoMarker: string;
    description: string;
    hint: string;
  }[];
  teacherSolution: string;
  acceptanceChecklist: string[];
  stretchChallenges: string[];
  presentationChecklist: string[];
  xpReward: number;
}

export interface FormalAssessment {
  id: 'mid-course' | 'final-assessment';
  title: string;
  subtitle: string;
  afterClass: number;
  recommendedMinutes: number;
  description: string;
  questions: QuizQuestion[];
}

export interface HomeworkSubmission {
  taskId: string;
  status: 'pending' | 'assigned' | 'submitted' | 'reviewed';
  studentCode: string;
  lastOutput: string;
  studentReflection: string;
  teacherFeedback: string;
  submittedAt?: string;
}

export interface ExerciseAttemptRecord {
  exerciseId: string;
  attempts: number;
  solved: boolean;
  mastery: MasteryStatus;
  hintsUsed: number;
  solutionViewed: boolean;
  lastCode: string;
  solvedAt?: string;
}

export interface QuizResultRecord {
  quizId: string; // 'lesson-1' .. 'lesson-20' | 'mid-course' | 'final-assessment'
  score: number;
  maxScore: number;
  percentage: number;
  answers: Record<string, string>;
  conceptsMastered: string[];
  conceptsNeedingRevision: string[];
  timeTakenSeconds: number;
  completedAt: string;
  teacherRemarks?: string;
}

export interface UserProgressState {
  studentName: string;
  grade: number;
  mode: OperatingMode;
  currentLessonId: number;
  completedLessons: number[];
  unlockedLessons: number[];
  completedActivities: number[];
  diagnosticCompleted: boolean;
  extensionUnlocked: boolean;
  xp: number;
  streakDays: number;
  unlockedBadges: string[];
  exerciseRecords: Record<string, ExerciseAttemptRecord>;
  quizResults: Record<string, QuizResultRecord>;
  homeworkSubmissions: Record<string, HomeworkSubmission>;
  projectProgress: Record<
    string,
    {
      code: string;
      completedMilestones: string[];
      checkedAcceptance: string[];
      checkedPresentation: string[];
      completed: boolean;
    }
  >;
  teacherNotes: Record<number, string>;
  lessonDurationMinutes: number;
  reducedMotion: boolean;
}
