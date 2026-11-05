import React, { useState, useEffect, useRef } from 'react';
import {
  Lesson,
  PracticeExercise,
  UserProgressState,
  QuizResultRecord,
} from '../types/quest';
import { PythonEditorPanel } from './PythonEditorPanel';
import { ComicChapterIllustration, Py9RobotAvatar, PythonCanvasVisualizer } from './ComicArtwork';
import {
  verifyOutputMatch,
  evaluateQuizSubmission,
  normalizeOutput,
} from '../utils/gamification';
import { runPythonCode } from '../python/pyRunner';

export type StudioTabId =
  | 'A_intro'
  | 'B_concept'
  | 'C_demo'
  | 'D_predict'
  | 'E_practice'
  | 'F_activity'
  | 'G_debug'
  | 'H_quiz';

interface LessonStudioViewProps {
  lessons: Lesson[];
  exercises: PracticeExercise[];
  progress: UserProgressState;
  onSelectLesson: (lessonId: number) => void;
  onCompleteLesson: (lessonId: number) => void;
  onCompleteDiagnostic: (passedAll: boolean) => void;
  onRecordExerciseAttempt: (
    exerciseId: string,
    solved: boolean,
    code: string,
    hintsUsed: number,
    solutionViewed: boolean,
    xpReward: number
  ) => void;
  onCompleteActivity: (lessonId: number) => void;
  onSaveQuizResult: (result: QuizResultRecord, xpEarned: number) => void;
  onUpdateTeacherNote: (lessonId: number, note: string) => void;
  onOpenArenaForLesson: (lessonId: number) => void;
}

const STUDIO_TABS: { id: StudioTabId; code: string; label: string; badge: string }[] = [
  { id: 'A_intro', code: 'A', label: 'Mission Intro', badge: 'STORY' },
  { id: 'B_concept', code: 'B', label: 'Learn Concept', badge: 'BIG IDEAS' },
  { id: 'C_demo', code: 'C', label: 'Live Coding Demo', badge: 'WALKTHROUGH' },
  { id: 'D_predict', code: 'D', label: 'Predict Output', badge: 'BRAIN TRACE' },
  { id: 'E_practice', code: 'E', label: 'Guided Practice', badge: '4 LEVELS' },
  { id: 'F_activity', code: 'F', label: 'Class Activity', badge: 'LIVE BUILD' },
  { id: 'G_debug', code: 'G', label: 'Debugging Mission', badge: 'BUG HUNT' },
  { id: 'H_quiz', code: 'H', label: 'Exit Quiz', badge: 'MASTERY' },
];

const CLASS_1_VARIABLE_NAME_LAB = [
  {
    name: 'hero_name',
    valid: true,
    reason: 'VALID! Uses lowercase letters and an underscore (snake_case).',
  },
  {
    name: 'power_level_2',
    valid: true,
    reason: 'VALID! Numbers are allowed as long as they are NOT the first character.',
  },
  {
    name: '_secret_vault',
    valid: true,
    reason: 'VALID! Variable names can start with a letter or an underscore (_).',
  },
  {
    name: '2nd_gadget',
    valid: false,
    reason: 'INVALID! SyntaxError — A variable name can NEVER start with a number.',
  },
  {
    name: 'hero-score',
    valid: false,
    reason: 'INVALID! SyntaxError — Python sees the hyphen (-) as subtraction! Use hero_score instead.',
  },
  {
    name: 'total score',
    valid: false,
    reason: 'INVALID! SyntaxError — Spaces are not allowed inside variable names. Use total_score.',
  },
  {
    name: 'shield$power',
    valid: false,
    reason: 'INVALID! Special symbols like $, @, !, % are forbidden in variable names.',
  },
  {
    name: 'True',
    valid: false,
    reason: 'INVALID! True is a reserved Python keyword for booleans, so you cannot use it as a variable name.',
  },
];

export const LessonStudioView: React.FC<LessonStudioViewProps> = ({
  lessons,
  exercises,
  progress,
  onSelectLesson,
  onCompleteLesson,
  onCompleteDiagnostic,
  onRecordExerciseAttempt,
  onCompleteActivity,
  onSaveQuizResult,
  onUpdateTeacherNote,
  onOpenArenaForLesson,
}) => {
  const currentLesson =
    lessons.find((l) => l.id === progress.currentLessonId) || lessons[0];
  const isTeacher = progress.mode === 'teacher';

  const [activeTab, setActiveTab] = useState<StudioTabId>('A_intro');
  const [wideReadingMode, setWideReadingMode] = useState<boolean>(false);
  const [isTeachingFullScreen, setIsTeachingFullScreen] = useState<boolean>(false);
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  // Class 1 interactive variable name tester state
  const [selectedVarTestIdx, setSelectedVarTestIdx] = useState<number>(0);
  // Concept module filter in Stage B (0 = Slide-by-Slide Teaching Mode by default, or 'all')
  const [focusedModuleIdx, setFocusedModuleIdx] = useState<number | 'all'>(0);

  const learningPaneRef = useRef<HTMLElement | null>(null);

  // Right-hand live IDE state synced with current lesson
  const [ideCode, setIdeCode] = useState<string>(currentLesson.liveDemo.starterCode);
  const [ideInput, setIdeInput] = useState<string>(currentLesson.liveDemo.sampleInput);
  const [ideLastStdout, setIdeLastStdout] = useState<string>('');

  // Class 1 Quick Diagnostic state
  const [diagAnswers, setDiagAnswers] = useState<Record<number, string>>({});
  const [diagFeedback, setDiagFeedback] = useState<string | null>(null);

  // Theory Quick Check answers
  const [theoryChoices, setTheoryChoices] = useState<Record<string, number>>({});

  // Section D: Predict the Output state
  const [predictions, setPredictions] = useState<Record<string, string>>({});
  const [predictChecked, setPredictChecked] = useState<Record<string, boolean>>({});

  // Section E: Guided Practice (4 representative exercises for this lesson)
  const lessonExercises = exercises.filter((e) => e.lessonId === currentLesson.id);
  const guidedFour: PracticeExercise[] = [
    lessonExercises.find((e) => e.category === 'warmup') || lessonExercises[0],
    lessonExercises.find((e) => e.category === 'completion') || lessonExercises[5],
    lessonExercises.find((e) => e.category === 'independent') || lessonExercises[10],
    lessonExercises.find((e) => e.category === 'boss') || lessonExercises[11],
  ].filter(Boolean);

  const [selectedGuidedIdx, setSelectedGuidedIdx] = useState(0);
  const activeGuided = guidedFour[selectedGuidedIdx] || guidedFour[0];
  const [guidedCode, setGuidedCode] = useState<string>(activeGuided?.starterCode || '');
  const [guidedInput, setGuidedInput] = useState<string>(activeGuided?.inputExample || '');
  const [guidedHintsShown, setGuidedHintsShown] = useState<number>(0);
  const [guidedSolutionShown, setGuidedSolutionShown] = useState<boolean>(false);
  const [guidedFeedback, setGuidedFeedback] = useState<{ passed: boolean; message: string } | null>(null);

  // Section F: Class Activity countdown timer
  const [timerSeconds, setTimerSeconds] = useState<number>(
    currentLesson.classActivity.timeLimitMinutes * 60
  );
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [activityReflection, setActivityReflection] = useState<string>('');

  // Section G: Debugging Mission state
  const [debugCode, setDebugCode] = useState<string>(currentLesson.debuggingMission.brokenCode);
  const [debugInput, setDebugInput] = useState<string>(currentLesson.debuggingMission.sampleInput || '');
  const [debugHintsShown, setDebugHintsShown] = useState<number>(0);
  const [debugShowTeacherFix, setDebugShowTeacherFix] = useState<boolean>(false);
  const [debugFeedback, setDebugFeedback] = useState<{ passed: boolean; text: string } | null>(null);

  // Section H: Exit Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmittedRecord, setQuizSubmittedRecord] = useState<QuizResultRecord | null>(
    progress.quizResults[`lesson-${currentLesson.id}`] || null
  );

  // Sync states when lesson changes
  useEffect(() => {
    setIdeCode(currentLesson.liveDemo.starterCode);
    setIdeInput(currentLesson.liveDemo.sampleInput);
    setIdeLastStdout('');
    setSelectedGuidedIdx(0);
    setFocusedModuleIdx(0);
    setTimerSeconds(currentLesson.classActivity.timeLimitMinutes * 60);
    setTimerRunning(false);
    setDebugCode(currentLesson.debuggingMission.brokenCode);
    setDebugInput(currentLesson.debuggingMission.sampleInput || '');
    setDebugHintsShown(0);
    setDebugShowTeacherFix(false);
    setDebugFeedback(null);
    setQuizAnswers({});
    setQuizSubmittedRecord(progress.quizResults[`lesson-${currentLesson.id}`] || null);
  }, [currentLesson.id]);

  // Reset scroll position smoothly when switching tabs or lessons
  useEffect(() => {
    if (learningPaneRef.current) {
      learningPaneRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (!isTeachingFullScreen && typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setScrollPercent(0);
  }, [activeTab, currentLesson.id, focusedModuleIdx]);

  // Track window scroll when not in Full-Screen mode
  useEffect(() => {
    if (isTeachingFullScreen) return;
    const onWindowScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      if (max > 0) {
        setScrollPercent(Math.min(100, Math.round((window.scrollY / max) * 100)));
      } else {
        setScrollPercent(0);
      }
    };
    window.addEventListener('scroll', onWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', onWindowScroll);
  }, [isTeachingFullScreen]);

  // Sync guided practice editor when switching between the 4 guided levels
  useEffect(() => {
    if (!activeGuided) return;
    const saved = progress.exerciseRecords[activeGuided.id];
    setGuidedCode(saved?.lastCode || activeGuided.starterCode);
    setGuidedInput(activeGuided.inputExample);
    setGuidedHintsShown(0);
    setGuidedSolutionShown(false);
    setGuidedFeedback(null);
  }, [activeGuided?.id]);

  // Countdown timer effect for Section F
  useEffect(() => {
    if (!timerRunning) return;
    const interval = window.setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [timerRunning]);

  const handleToggleTeachingFullScreen = async () => {
    const next = !isTeachingFullScreen;
    setIsTeachingFullScreen(next);
    try {
      if (next && document.documentElement.requestFullscreen && !document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else if (!next && document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch {
      // Ignore iframe fullscreen permission restrictions; fixed inset-0 handles full-viewport presentation cleanly
    }
  };

  const handleLearningScroll = (e: React.UIEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll > 0) {
      setScrollPercent(Math.min(100, Math.round((el.scrollTop / maxScroll) * 100)));
    } else {
      setScrollPercent(0);
    }
  };

  const handleScrollStep = (direction: 'up' | 'down' | 'top') => {
    const el = learningPaneRef.current;
    if (isTeachingFullScreen && el) {
      if (direction === 'top') {
        el.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const delta = direction === 'down' ? 480 : -480;
        el.scrollBy({ top: delta, behavior: 'smooth' });
      }
    } else if (typeof window !== 'undefined') {
      if (direction === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const delta = direction === 'down' ? 520 : -520;
        window.scrollBy({ top: delta, behavior: 'smooth' });
      }
    }
  };

  const currentTabIdx = STUDIO_TABS.findIndex((t) => t.id === activeTab);
  const handlePrevStage = () => {
    if (currentTabIdx > 0) {
      setActiveTab(STUDIO_TABS[currentTabIdx - 1].id);
    }
  };
  const handleNextStage = () => {
    if (currentTabIdx < STUDIO_TABS.length - 1) {
      setActiveTab(STUDIO_TABS[currentTabIdx + 1].id);
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleLoadIntoRightIde = (codeSnippet: string, inputSnippet = '') => {
    setIdeCode(codeSnippet);
    setIdeInput(inputSnippet);
    if (wideReadingMode) {
      setWideReadingMode(false);
    }
  };

  const handleVerifyGuidedPractice = async () => {
    if (!activeGuided) return;
    const inputs = guidedInput ? guidedInput.split('\n') : [];
    const execRes = await runPythonCode(guidedCode, inputs);
    if (execRes.status !== 'success') {
      setGuidedFeedback({
        passed: false,
        message: `Python Error: ${execRes.stderr}`,
      });
      onRecordExerciseAttempt(
        activeGuided.id,
        false,
        guidedCode,
        guidedHintsShown,
        guidedSolutionShown,
        0
      );
      return;
    }

    const match = verifyOutputMatch(
      execRes.stdout,
      activeGuided.expectedOutput,
      guidedCode,
      activeGuided.validationKeywords
    );
    setGuidedFeedback({
      passed: match.passed,
      message: match.feedback,
    });
    onRecordExerciseAttempt(
      activeGuided.id,
      match.passed,
      guidedCode,
      guidedHintsShown,
      guidedSolutionShown,
      match.passed ? activeGuided.xpReward : 0
    );
  };

  const handleVerifyDebugMission = async () => {
    const dm = currentLesson.debuggingMission;
    const inputs = debugInput ? debugInput.split('\n') : [];
    const execRes = await runPythonCode(debugCode, inputs);
    if (execRes.status !== 'success') {
      setDebugFeedback({
        passed: false,
        text: `Still has an error: ${execRes.stderr}`,
      });
      return;
    }
    const check = verifyOutputMatch(execRes.stdout, dm.expectedOutput);
    setDebugFeedback({
      passed: check.passed,
      text: check.passed
        ? `🎉 Bug Squashed! Output matched "${dm.expectedOutput}". +40 XP!`
        : check.feedback,
    });
  };

  const handleSubmitExitQuiz = () => {
    const result = evaluateQuizSubmission(
      `lesson-${currentLesson.id}`,
      currentLesson.exitQuiz,
      quizAnswers,
      120
    );
    setQuizSubmittedRecord(result);
    const xpEarned = Math.round((result.percentage / 100) * 80);
    onSaveQuizResult(result, xpEarned);
  };

  const isCompleted = progress.completedLessons.includes(currentLesson.id);
  const visibleTheoryBlocks =
    focusedModuleIdx === 'all'
      ? currentLesson.theoryBlocks
      : [currentLesson.theoryBlocks[focusedModuleIdx]].filter(Boolean);

  const studioOuterClasses = isTeachingFullScreen
    ? 'fixed inset-0 z-[100] bg-[#FAF5E8] flex flex-col overflow-hidden px-3 sm:px-5 py-2.5 gap-2.5'
    : 'space-y-4';

  return (
    <div className={studioOuterClasses}>
      {isTeachingFullScreen ? (
        /* STRICT 1-LINE 42PX FULL-SCREEN TEACHING BAR (Takes < 5% of screen height!) */
        <div className="shrink-0 px-3 py-1.5 rounded-xl bg-[#FFFDF7] border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] flex items-center justify-between gap-2 overflow-x-auto no-scrollbar whitespace-nowrap">
          <div className="flex items-center gap-1.5 shrink-0">
            <select
              aria-label="Select Class Number"
              value={currentLesson.id}
              onChange={(e) => onSelectLesson(Number(e.target.value))}
              className="w-auto max-w-[180px] px-2 py-1 rounded-lg bg-[#FBBF24] border-2 border-[#0F172A] text-[#0F172A] text-xs font-black cursor-pointer focus:outline-none truncate"
            >
              {lessons.map((l) => (
                <option key={l.id} value={l.id}>
                  Class {l.id}: {l.title}
                </option>
              ))}
            </select>

            {/* Inline Single-Row Stage Pills */}
            <nav aria-label="Lesson sections" className="flex items-center gap-1">
              {STUDIO_TABS.map((tab) => {
                const active = activeTab === tab.id;
                const shortLabel =
                  tab.code === 'A'
                    ? 'Intro'
                    : tab.code === 'B'
                    ? 'Concept'
                    : tab.code === 'C'
                    ? 'Demo'
                    : tab.code === 'D'
                    ? 'Predict'
                    : tab.code === 'E'
                    ? 'Practice'
                    : tab.code === 'F'
                    ? 'Activity'
                    : tab.code === 'G'
                    ? 'Debug'
                    : 'Quiz';
                return (
                  <button
                    key={tab.id}
                    type="button"
                    title={tab.label}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-2 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer flex items-center gap-1 ${
                      active
                        ? 'bg-[#38BDF8] text-[#0F172A] border-2 border-[#0F172A] shadow-[1px_1px_0px_#0F172A]'
                        : 'bg-[#FFFFFF] hover:bg-[#F1F5F9] text-[#334155] border border-[#CBD5E1]'
                    }`}
                  >
                    <span className="font-mono font-black">{tab.code}.</span>
                    <span>{shortLabel}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handlePrevStage}
              disabled={currentTabIdx === 0}
              className="px-2 py-1 rounded-lg bg-[#FFFFFF] border border-[#0F172A] text-xs font-black text-[#0F172A] disabled:opacity-40 cursor-pointer"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={handleNextStage}
              disabled={currentTabIdx === STUDIO_TABS.length - 1}
              className="px-2 py-1 rounded-lg bg-[#34D399] border border-[#0F172A] text-xs font-black text-[#0F172A] disabled:opacity-40 cursor-pointer"
            >
              ▶
            </button>
            <button
              type="button"
              onClick={() => setWideReadingMode((prev) => !prev)}
              className="px-2.5 py-1 rounded-lg bg-[#FEF3C7] border border-[#0F172A] text-[#0F172A] font-extrabold text-xs cursor-pointer"
            >
              {wideReadingMode ? '⚡ Split IDE' : '📖 Focus Deck'}
            </button>
            <button
              type="button"
              onClick={handleToggleTeachingFullScreen}
              data-testid="toggle-teaching-fullscreen"
              className="px-2.5 py-1 rounded-lg bg-[#FFE4E6] hover:bg-[#FECDD3] border-2 border-[#0F172A] text-[#881337] font-black text-xs cursor-pointer"
            >
              ✕ Exit Full Screen
            </button>
          </div>
        </div>
      ) : (
        /* COMPACT 2-LINE STUDIO HEADER IN NORMAL MODE (Clean, Low-Profile, Educational) */
        <div className="shrink-0 p-3 sm:p-4 rounded-2xl bg-[#FFFDF7] border-2 border-[#0F172A] shadow-[3px_3px_0px_#0F172A] space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="comic-badge bg-[#FBBF24] text-[#0F172A] font-mono text-xs font-black shrink-0">
                CLASS {String(currentLesson.id).padStart(2, '0')}
              </span>
              <h1 className="text-base sm:text-xl font-black text-[#0F172A] tracking-tight truncate">
                {currentLesson.title}:{' '}
                <span className="text-[#0369A1] font-extrabold">{currentLesson.subtitle}</span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleToggleTeachingFullScreen}
                data-testid="toggle-teaching-fullscreen"
                className="px-3.5 py-1.5 rounded-xl bg-[#34D399] hover:bg-[#10B981] text-[#0F172A] font-black text-xs sm:text-sm cursor-pointer border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A]"
              >
                📺 Full-Screen Teaching Mode
              </button>

              <button
                type="button"
                onClick={() => setWideReadingMode((prev) => !prev)}
                className="px-3 py-1.5 rounded-xl bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#0F172A] font-extrabold text-xs border-2 border-[#0F172A] cursor-pointer"
              >
                {wideReadingMode ? '⚡ Split Live IDE' : '📖 Wide Reading'}
              </button>

              <label htmlFor="studio-lesson-select" className="sr-only">
                Select Class Number
              </label>
              <select
                id="studio-lesson-select"
                aria-label="Select Class Number"
                value={currentLesson.id}
                onChange={(e) => onSelectLesson(Number(e.target.value))}
                className="px-2.5 py-1.5 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] text-[#0F172A] text-xs font-extrabold cursor-pointer focus:outline-none"
              >
                {lessons.map((l) => (
                  <option key={l.id} value={l.id}>
                    Class {l.id}: {l.title} {progress.completedLessons.includes(l.id) ? '✓' : ''}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => onCompleteLesson(currentLesson.id)}
                className={`px-3 py-1.5 rounded-xl font-black text-xs cursor-pointer border-2 border-[#0F172A] ${
                  isCompleted
                    ? 'bg-[#D1FAE5] text-[#064E3B]'
                    : 'bg-[#FBBF24] hover:bg-[#F59E0B] text-[#0F172A]'
                }`}
              >
                {isCompleted ? '✓ Completed' : '★ Complete Class'}
              </button>
            </div>
          </div>

          {/* Slim Single-Row Stage Strip (A through H) */}
          <nav
            aria-label="Lesson sections"
            className="pt-2 border-t border-[#E2E8F0] flex items-center gap-1.5 overflow-x-auto no-scrollbar"
          >
            {STUDIO_TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-left whitespace-nowrap transition cursor-pointer ${
                    active
                      ? 'bg-[#38BDF8] text-[#0F172A] border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] font-black'
                      : 'bg-[#FFFFFF] hover:bg-[#F1F5F9] text-[#334155] border border-[#CBD5E1] font-bold'
                  }`}
                >
                  <span
                    className={`w-5 h-5 shrink-0 rounded-md flex items-center justify-center font-mono text-[11px] font-black border border-[#0F172A] ${
                      active ? 'bg-[#FBBF24] text-[#0F172A]' : 'bg-[#E0F2FE] text-[#0369A1]'
                    }`}
                  >
                    {tab.code}
                  </span>
                  <span className="text-xs sm:text-sm">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* MAIN STUDIO WORKSPACE: Clean Independent Scroll Containers (NO outer nested box!) */}
      <div
        className={
          isTeachingFullScreen
            ? 'flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-5 overflow-hidden'
            : 'grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'
        }
      >
        {/* LEARNING CONTENT COLUMN (Borderless outer scroll pane so cards never double/triple nest!) */}
        <section
          ref={learningPaneRef}
          onScroll={handleLearningScroll}
          data-testid="lesson-learning-scroll-pane"
          className={`${wideReadingMode ? 'lg:col-span-12' : 'lg:col-span-7'} ${
            isTeachingFullScreen ? 'h-full overflow-y-auto pr-2 pb-8' : ''
          } space-y-6 scroll-smooth`}
        >
          {/* SECTION A: MISSION INTRO */}
          {activeTab === 'A_intro' && (
            <div className="space-y-8">
              <ComicChapterIllustration
                theme={currentLesson.illustrationTheme}
                chapterTitle={currentLesson.comicChapterTitle}
                classNumber={currentLesson.id}
              />

              {/* CLASS 1 60-MINUTE TEACHING ROADMAP BANNER */}
              {currentLesson.id === 1 && (
                <div className="p-6 rounded-2xl bg-[#FEF3C7] comic-panel-amber space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="comic-badge bg-[#34D399] text-[#0F172A] text-xs sm:text-sm font-black">
                      👩‍🏫 CLASS 1 LIVE 60-MINUTE SESSION PLANNER
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#78350F]">
                      Click any block to jump directly!
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('B_concept');
                        setFocusedModuleIdx(0);
                      }}
                      className="p-3.5 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] text-left hover:bg-[#E0F2FE] transition cursor-pointer"
                    >
                      <div className="text-xs font-mono font-black text-[#0369A1]">MINS 00–20 • MODULES 1–3</div>
                      <div className="text-base font-black text-[#0F172A] mt-0.5">
                        print(), Variables &amp; 4 Data Types
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('B_concept');
                        setFocusedModuleIdx(3);
                      }}
                      className="p-3.5 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] text-left hover:bg-[#E0F2FE] transition cursor-pointer"
                    >
                      <div className="text-xs font-mono font-black text-[#B45309]">MINS 20–40 • MODULES 4–6</div>
                      <div className="text-base font-black text-[#0F172A] mt-0.5">
                        Updating (+=), input() &amp; // % **
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('F_activity')}
                      className="p-3.5 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] text-left hover:bg-[#D1FAE5] transition cursor-pointer"
                    >
                      <div className="text-xs font-mono font-black text-[#047857]">MINS 40–60 • STAGES D–H</div>
                      <div className="text-base font-black text-[#0F172A] mt-0.5">
                        Superhero Card, Debug &amp; Quiz
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Big Story Briefing Panel */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFDF7] comic-panel-amber space-y-4">
                <div className="flex items-center gap-2">
                  <span className="comic-badge bg-[#FBBF24] text-[#0F172A] text-xs sm:text-sm font-black">
                    📖 COMIC STORY BRIEFING
                  </span>
                </div>
                <p className="text-lg sm:text-xl text-[#0F172A] leading-relaxed font-semibold">
                  {currentLesson.storyIntro}
                </p>
                <div className="p-5 rounded-xl bg-[#E0F2FE] border-2 border-[#0284C7] text-base sm:text-lg text-[#0C4A6E] leading-relaxed">
                  <strong className="text-[#0369A1] font-black block mb-1 uppercase font-mono text-sm">
                    🌍 Real-World Connection:
                  </strong>
                  {currentLesson.realWorldScenario}
                </div>
              </div>

              {/* Comic Speech Bubbles for Character Dialogue */}
              <div className="space-y-4">
                <h2 className="font-comic text-2xl sm:text-3xl text-[#0369A1] tracking-wide">
                  💬 BRIDGE TRANSMISSION: PY-9 &amp; HASTHAKSH
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {currentLesson.characterDialogue.map((dlg, idx) => {
                    const isPy9 = dlg.speaker.includes('PY-9');
                    return (
                      <div
                        key={idx}
                        className={`p-5 sm:p-6 rounded-2xl comic-speech-bubble flex items-start gap-4 ${
                          isPy9 ? 'bg-[#E0F2FE]/60' : 'bg-[#FEF3C7]/70'
                        }`}
                      >
                        {isPy9 ? (
                          <Py9RobotAvatar mood="happy" size="md" />
                        ) : (
                          <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#FBBF24] border-3 border-[#0F172A] shadow-[3px_3px_0px_#0F172A] flex items-center justify-center font-black text-2xl text-[#0F172A]">
                            ⚡H
                          </div>
                        )}
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-base sm:text-lg font-black text-[#0F172A]">
                              {dlg.speaker}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-md bg-[#FFFFFF] border-2 border-[#0F172A] text-xs sm:text-sm text-[#0369A1] font-mono font-bold">
                              {dlg.role}
                            </span>
                          </div>
                          <p className="text-base sm:text-lg text-[#1E293B] leading-relaxed font-semibold">
                            &ldquo;{dlg.line}&rdquo;
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Big Learning Objectives & Topics Covered Today */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#D1FAE5]/50 comic-panel-emerald space-y-4">
                  <h3 className="text-lg sm:text-xl font-black text-[#064E3B] uppercase tracking-wide flex items-center gap-2">
                    <span>🎯</span> Mission Learning Goals
                  </h3>
                  <ul className="space-y-3 text-base sm:text-lg text-[#0F172A] leading-relaxed font-medium">
                    {currentLesson.learningObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-7 h-7 shrink-0 rounded-lg bg-[#34D399] border-2 border-[#0F172A] text-[#0F172A] font-black flex items-center justify-center text-sm mt-0.5">
                          ✓
                        </span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-[#E0F2FE]/60 comic-panel-cyan space-y-4">
                  <h3 className="text-lg sm:text-xl font-black text-[#0C4A6E] uppercase tracking-wide flex items-center gap-2">
                    <span>⚡</span> Topics We Will Master Today
                  </h3>
                  <ul className="space-y-3 text-base sm:text-lg text-[#0F172A] leading-relaxed">
                    {currentLesson.topics.map((top, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="px-2.5 py-0.5 rounded-lg bg-[#38BDF8] border-2 border-[#0F172A] text-[#0F172A] font-mono font-black text-sm mt-0.5">
                          0{i + 1}
                        </span>
                        <span className="font-bold">{top}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CLASS 1 PRIOR-KNOWLEDGE TURBO DIAGNOSTIC CHECK */}
              {currentLesson.hasDiagnostic && (
                <div className="p-6 sm:p-7 rounded-2xl bg-[#FEF3C7] comic-panel-amber space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="comic-badge bg-[#FBBF24] text-[#0F172A] text-sm sm:text-base font-black">
                      ⚡ CLASS 1 PRIOR-KNOWLEDGE TURBO DIAGNOSTIC
                    </span>
                    {progress.diagnosticCompleted && (
                      <span className="px-3 py-1 rounded-xl bg-[#34D399] border-2 border-[#0F172A] text-[#0F172A] font-mono text-sm font-black">
                        ✓ Diagnostic Complete
                      </span>
                    )}
                  </div>
                  <p className="text-base sm:text-lg text-[#0F172A] font-medium leading-relaxed">
                    Hasthaksh already knows basic Python! Solve these 3 quick warm-ups to unlock accelerated Boss Extension Challenges right away:
                  </p>

                  <div className="space-y-4 text-base sm:text-lg">
                    <div className="p-4 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] space-y-2">
                      <p className="font-bold text-[#0F172A]">
                        1. What does <code className="px-2 py-0.5 rounded bg-[#E0F2FE] text-[#0369A1]">print(&quot;Boost&quot;, 10 + 5)</code> display?
                      </p>
                      <input
                        type="text"
                        aria-label="Diagnostic Question 1"
                        value={diagAnswers[1] || ''}
                        onChange={(e) => setDiagAnswers({ ...diagAnswers, 1: e.target.value })}
                        placeholder="Type your answer (e.g. Boost 15)"
                        className="w-full px-4 py-3 rounded-xl bg-[#FFFDF7] border-2 border-[#0F172A] font-mono text-base text-[#0F172A] focus:border-[#0284C7] focus:outline-none"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] space-y-2">
                      <p className="font-bold text-[#0F172A]">
                        2. If <code className="px-2 py-0.5 rounded bg-[#E0F2FE] text-[#0369A1]">x = &quot;7&quot;</code>, what function converts <code className="text-[#0369A1]">x</code> into a whole number?
                      </p>
                      <input
                        type="text"
                        aria-label="Diagnostic Question 2"
                        value={diagAnswers[2] || ''}
                        onChange={(e) => setDiagAnswers({ ...diagAnswers, 2: e.target.value })}
                        placeholder="Type your answer (e.g. int(x))"
                        className="w-full px-4 py-3 rounded-xl bg-[#FFFDF7] border-2 border-[#0F172A] font-mono text-base text-[#0F172A] focus:border-[#0284C7] focus:outline-none"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] space-y-2">
                      <p className="font-bold text-[#0F172A]">
                        3. What is <code className="px-2 py-0.5 rounded bg-[#E0F2FE] text-[#0369A1]">2 + 3 * 4</code> in Python?
                      </p>
                      <input
                        type="text"
                        aria-label="Diagnostic Question 3"
                        value={diagAnswers[3] || ''}
                        onChange={(e) => setDiagAnswers({ ...diagAnswers, 3: e.target.value })}
                        placeholder="Type your answer (e.g. 14)"
                        className="w-full px-4 py-3 rounded-xl bg-[#FFFDF7] border-2 border-[#0F172A] font-mono text-base text-[#0F172A] focus:border-[#0284C7] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const q1 = (diagAnswers[1] || '').trim().toLowerCase() === 'boost 15';
                        const q2 = (diagAnswers[2] || '').trim().toLowerCase().includes('int');
                        const q3 = (diagAnswers[3] || '').trim() === '14';
                        const passed = q1 && q2 && q3;
                        onCompleteDiagnostic(passed);
                        setDiagFeedback(
                          passed
                            ? '⚡ 3/3 Correct! Accelerated Extension Mode Unlocked (+50 XP)!'
                            : 'Diagnostic recorded! Let’s master type conversion and operator precedence in Stage B.'
                        );
                      }}
                      className="px-6 py-3 rounded-xl bg-[#34D399] hover:bg-[#10B981] text-[#0F172A] font-black text-base comic-btn cursor-pointer"
                    >
                      ⚡ Check Diagnostic &amp; Unlock Boosters
                    </button>
                    {diagFeedback && (
                      <span className="text-base font-extrabold text-[#047857]">{diagFeedback}</span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('B_concept')}
                  className="px-6 py-3.5 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#0F172A] font-black text-base sm:text-lg comic-btn cursor-pointer"
                >
                  Next Stage: B. Learn Concept ({currentLesson.theoryBlocks.length} Modules) →
                </button>
              </div>
            </div>
          )}

          {/* SECTION B: LEARN CONCEPT (CLEAN SLIDE-BY-SLIDE TEACHING DECK — ZERO TRIPLE-BORDER CLUTTER!) */}
          {activeTab === 'B_concept' && (
            <div className="space-y-5">
              {/* THEORY BLOCKS (Clean Single-Border Slide Cards with Integrated Slide Switcher) */}
              {visibleTheoryBlocks.map((tb, idx) => {
                const chosenIdx = theoryChoices[tb.id];
                const displayNum = focusedModuleIdx === 'all' ? idx + 1 : focusedModuleIdx + 1;
                return (
                  <div
                    key={tb.id}
                    className="p-5 sm:p-7 rounded-2xl bg-[#FFFFFF] border-2 border-[#0F172A] shadow-[4px_4px_0px_#0F172A] space-y-5"
                  >
                    {/* Integrated Top Slide Switcher Bar (Only on first card) */}
                    {idx === 0 && (
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-[#E2E8F0]">
                        <div className="flex flex-wrap items-center gap-1">
                          {currentLesson.theoryBlocks.map((modItem, mIdx) => (
                            <button
                              key={modItem.id}
                              type="button"
                              onClick={() => setFocusedModuleIdx(mIdx)}
                              className={`px-2.5 py-1 rounded-lg font-mono text-xs font-black border cursor-pointer transition ${
                                focusedModuleIdx === mIdx
                                  ? 'bg-[#38BDF8] text-[#0F172A] border-[#0F172A] shadow-[2px_2px_0px_#0F172A]'
                                  : 'bg-[#F8FAFC] hover:bg-[#E2E8F0] text-[#334155] border-[#CBD5E1]'
                              }`}
                            >
                              Module {mIdx + 1}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => setFocusedModuleIdx('all')}
                            className={`px-2.5 py-1 rounded-lg font-mono text-xs font-black border cursor-pointer transition ${
                              focusedModuleIdx === 'all'
                                ? 'bg-[#FBBF24] text-[#0F172A] border-[#0F172A]'
                                : 'bg-[#F8FAFC] hover:bg-[#E2E8F0] text-[#64748B] border-[#CBD5E1]'
                            }`}
                          >
                            All ({currentLesson.theoryBlocks.length})
                          </button>
                        </div>

                        {focusedModuleIdx !== 'all' && (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              disabled={focusedModuleIdx === 0}
                              onClick={() =>
                                setFocusedModuleIdx((prev) =>
                                  typeof prev === 'number' && prev > 0 ? prev - 1 : 0
                                )
                              }
                              className="px-2.5 py-1 rounded-lg bg-[#FFFFFF] border border-[#0F172A] text-xs font-black text-[#0F172A] disabled:opacity-40 cursor-pointer"
                            >
                              ◀ Prev
                            </button>
                            <button
                              type="button"
                              disabled={focusedModuleIdx === currentLesson.theoryBlocks.length - 1}
                              onClick={() =>
                                setFocusedModuleIdx((prev) =>
                                  typeof prev === 'number' &&
                                  prev < currentLesson.theoryBlocks.length - 1
                                    ? prev + 1
                                    : prev
                                )
                              }
                              className="px-2.5 py-1 rounded-lg bg-[#34D399] border border-[#0F172A] text-xs font-black text-[#0F172A] disabled:opacity-40 cursor-pointer"
                            >
                              Next ▶
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Module Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="comic-badge bg-[#FBBF24] text-[#0F172A] font-mono text-xs font-black">
                            MODULE {displayNum} OF {currentLesson.theoryBlocks.length}
                          </span>
                          <span className="text-xs font-mono font-bold text-[#0369A1]">
                            STEP 1: READ • STEP 2: RUN IN IDE • STEP 3: QUICK CHECK
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0F172A] leading-snug pt-0.5">
                          {tb.title}
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleLoadIntoRightIde(tb.workingCodeExample, tb.sampleInput || '')}
                        className="px-3.5 py-2 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#0F172A] text-xs sm:text-sm font-black border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] cursor-pointer"
                      >
                        ⚡ Send Code to Live IDE →
                      </button>
                    </div>

                    {/* Clear Core Explanation Callout */}
                    <div className="p-5 rounded-xl bg-[#E0F2FE]/60 border-l-4 border-[#0284C7] text-lg sm:text-xl text-[#0F172A] leading-relaxed font-semibold">
                      {tb.simpleExplanation}
                    </div>

                    {/* Why Programmers Use It + Real-World Analogy (Clean Soft Cards) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 sm:p-5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-1.5">
                        <strong className="text-[#0369A1] font-extrabold text-sm sm:text-base uppercase font-mono block">
                          🚀 Why Programmers Use It
                        </strong>
                        <p className="text-base sm:text-lg text-[#1E293B] leading-relaxed">
                          {tb.whyProgrammersUseIt}
                        </p>
                      </div>

                      <div className="p-4 sm:p-5 rounded-xl bg-[#FFFBEB] border border-[#FCD34D] space-y-1.5">
                        <strong className="text-[#B45309] font-extrabold text-sm sm:text-base uppercase font-mono block">
                          💡 Real-World Analogy
                        </strong>
                        <p className="text-base sm:text-lg text-[#1E293B] leading-relaxed">
                          {tb.realWorldAnalogy}
                        </p>
                      </div>
                    </div>

                    {/* CONTEXTUAL VISUAL LAB FOR CLASS 1 MODULE 2: Variable Name Detector */}
                    {tb.id === 'c1-t2' && (
                      <div className="p-5 rounded-xl bg-[#E0F2FE]/50 border border-[#7DD3FC] space-y-3.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs sm:text-sm font-mono font-black text-[#0369A1] uppercase">
                            🧪 Interactive Lab: Click a Variable Name to Test Python&apos;s Rules
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {CLASS_1_VARIABLE_NAME_LAB.map((item, vIdx) => {
                            const active = selectedVarTestIdx === vIdx;
                            return (
                              <button
                                key={item.name}
                                type="button"
                                onClick={() => setSelectedVarTestIdx(vIdx)}
                                className={`p-2.5 rounded-xl font-mono text-sm sm:text-base font-black border-2 cursor-pointer transition ${
                                  active
                                    ? item.valid
                                      ? 'bg-[#34D399] border-[#0F172A] text-[#0F172A]'
                                      : 'bg-[#FB7185] border-[#0F172A] text-[#0F172A]'
                                    : 'bg-[#FFFFFF] border-[#CBD5E1] text-[#0F172A] hover:border-[#0F172A]'
                                }`}
                              >
                                {item.name}
                              </button>
                            );
                          })}
                        </div>
                        <div
                          className={`p-3.5 rounded-xl border text-base font-bold ${
                            CLASS_1_VARIABLE_NAME_LAB[selectedVarTestIdx].valid
                              ? 'bg-[#D1FAE5] border-[#10B981] text-[#064E3B]'
                              : 'bg-[#FFE4E6] border-[#F43F5E] text-[#881337]'
                          }`}
                        >
                          <span className="font-mono font-black mr-2">
                            {CLASS_1_VARIABLE_NAME_LAB[selectedVarTestIdx].valid
                              ? '✅ VALID NAME:'
                              : '❌ SYNTAX ERROR:'}
                          </span>
                          {CLASS_1_VARIABLE_NAME_LAB[selectedVarTestIdx].reason}
                        </div>
                      </div>
                    )}

                    {/* CONTEXTUAL VISUAL CHEAT-SHEET FOR CLASS 1 MODULE 3: The 4 Core Data Types */}
                    {tb.id === 'c1-t3' && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3.5 rounded-xl bg-[#F0F9FF] border border-[#7DD3FC] space-y-1">
                          <div className="text-[11px] font-mono font-black text-[#0369A1]">1. WHOLE NUMBER</div>
                          <div className="text-xl font-black text-[#0F172A] font-mono">int</div>
                          <code className="block text-sm font-mono font-bold text-[#047857]">power = 85</code>
                          <p className="text-xs text-[#334155]">No decimal point (10, -5, 0).</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FCD34D] space-y-1">
                          <div className="text-[11px] font-mono font-black text-[#B45309]">2. DECIMAL</div>
                          <div className="text-xl font-black text-[#0F172A] font-mono">float</div>
                          <code className="block text-sm font-mono font-bold text-[#047857]">speed = 14.5</code>
                          <p className="text-xs text-[#334155]">Has a decimal point (1.5, 4.0).</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#FAF5FF] border border-[#D8B4FE] space-y-1">
                          <div className="text-[11px] font-mono font-black text-[#6D28D9]">3. TEXT STRING</div>
                          <div className="text-xl font-black text-[#0F172A] font-mono">str</div>
                          <code className="block text-sm font-mono font-bold text-[#047857]">hero = &quot;Volt&quot;</code>
                          <p className="text-xs text-[#334155]">Inside quotes &quot;...&quot; or &apos;...&apos;.</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#ECFDF5] border border-[#6EE7B7] space-y-1">
                          <div className="text-[11px] font-mono font-black text-[#047857]">4. TRUTH SWITCH</div>
                          <div className="text-xl font-black text-[#0F172A] font-mono">bool</div>
                          <code className="block text-sm font-mono font-bold text-[#047857]">ready = True</code>
                          <p className="text-xs text-[#334155]">True or False (capitalized).</p>
                        </div>
                      </div>
                    )}

                    {/* CONTEXTUAL VISUAL CHEAT-SHEET FOR CLASS 1 MODULE 6: Division & PEMDAS */}
                    {tb.id === 'c1-t6' && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3.5 rounded-xl bg-[#F0F9FF] border border-[#7DD3FC] space-y-1">
                          <div className="text-[11px] font-mono font-black text-[#0369A1]">EXACT DIVISION (/)</div>
                          <div className="text-lg font-mono font-black text-[#0F172A]">17 / 5 → 3.4</div>
                          <p className="text-xs text-[#334155]">Always returns a float.</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#ECFDF5] border border-[#6EE7B7] space-y-1">
                          <div className="text-[11px] font-mono font-black text-[#047857]">FLOOR DIVISION (//)</div>
                          <div className="text-lg font-mono font-black text-[#0F172A]">17 // 5 → 3</div>
                          <p className="text-xs text-[#334155]">Whole packs (drops decimal).</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FCD34D] space-y-1">
                          <div className="text-[11px] font-mono font-black text-[#B45309]">REMAINDER (%)</div>
                          <div className="text-lg font-mono font-black text-[#0F172A]">17 % 5 → 2</div>
                          <p className="text-xs text-[#334155]">Leftover after 3 × 5 = 15.</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#FAF5FF] border border-[#D8B4FE] space-y-1">
                          <div className="text-[11px] font-mono font-black text-[#6D28D9]">EXPONENT (**)</div>
                          <div className="text-lg font-mono font-black text-[#0F172A]">2 ** 4 → 16</div>
                          <p className="text-xs text-[#334155]">Power: 2 × 2 × 2 × 2.</p>
                        </div>
                      </div>
                    )}

                    {/* Clean Working Code Block (No Nested Heavy Black Boxes!) */}
                    <div className="rounded-xl bg-[#FFFDF9] border-2 border-[#0F172A] overflow-hidden">
                      <div className="px-4 py-2.5 bg-[#F1ECE1] border-b border-[#CBD5E1] flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm font-mono font-black text-[#0F172A] uppercase">
                          💻 Working Python 3 Example
                        </span>
                        <button
                          type="button"
                          onClick={() => handleLoadIntoRightIde(tb.workingCodeExample, tb.sampleInput || '')}
                          className="px-3 py-1 rounded-lg bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#0F172A] text-xs font-black border border-[#0F172A] cursor-pointer"
                        >
                          ▶ Load &amp; Run in Live IDE
                        </button>
                      </div>
                      <pre className="font-mono text-base sm:text-lg font-semibold text-[#0F172A] overflow-x-auto leading-8 p-4 sm:p-5 bg-[#FFFDF9]">
                        {tb.workingCodeExample}
                      </pre>
                      <div className="px-4 py-3 bg-[#ECFDF5] border-t border-[#6EE7B7] text-sm sm:text-base font-mono text-[#064E3B]">
                        <strong className="uppercase mr-2">Expected Output:</strong>
                        <span className="text-[#0F172A] font-bold whitespace-pre-line">{tb.expectedOutput}</span>
                      </div>
                    </div>

                    {/* Clean Step-by-Step Line Breakdown */}
                    <div className="space-y-2.5">
                      <div className="text-sm sm:text-base font-mono font-extrabold text-[#0369A1] uppercase">
                        🔍 Line-by-Line Explanation
                      </div>
                      <div className="divide-y divide-[#E2E8F0] rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] overflow-hidden">
                        {tb.lineByLineExplanation.map((item, i) => (
                          <div
                            key={i}
                            className="text-base sm:text-lg flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 py-3"
                          >
                            <code className="font-mono text-[#B45309] font-bold bg-[#FEF3C7] border border-[#F59E0B] px-2.5 py-0.5 rounded-md shrink-0 text-sm sm:text-base">
                              {item.line}
                            </code>
                            <span className="text-[#0F172A] font-medium leading-relaxed">
                              → {item.explanation}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Common Mistakes */}
                    <div className="p-4 sm:p-5 rounded-xl bg-[#FFF1F2] border-l-4 border-[#E11D48] space-y-1.5">
                      <strong className="text-[#BE123C] text-sm sm:text-base font-mono uppercase font-extrabold block">
                        ⚠ Common Traps to Avoid
                      </strong>
                      <ul className="list-disc list-inside space-y-1.5 text-base sm:text-lg text-[#881337] font-medium leading-relaxed">
                        {tb.commonMistakes.map((m, mIdx) => (
                          <li key={mIdx}>{m}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Quick Check Question */}
                    <div className="p-5 rounded-xl bg-[#F0F9FF] border border-[#7DD3FC] space-y-3.5">
                      <div className="text-base sm:text-lg font-black text-[#0F172A]">
                        🎯 Quick Concept Check: {tb.quickQuestion.question}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {tb.quickQuestion.options.map((opt, oIdx) => {
                          const isSelected = chosenIdx === oIdx;
                          const isCorrect = oIdx === tb.quickQuestion.correctIndex;
                          let btnStyle =
                            'bg-[#FFFFFF] border-[#CBD5E1] text-[#0F172A] hover:border-[#0F172A] hover:bg-[#FEF3C7]';
                          if (chosenIdx !== undefined) {
                            if (isCorrect)
                              btnStyle =
                                'bg-[#D1FAE5] border-[#059669] text-[#064E3B] font-black';
                            else if (isSelected)
                              btnStyle = 'bg-[#FFE4E6] border-[#E11D48] text-[#881337]';
                          }
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => setTheoryChoices({ ...theoryChoices, [tb.id]: oIdx })}
                              className={`p-3.5 rounded-xl border-2 text-left text-base font-mono font-semibold transition cursor-pointer ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {chosenIdx !== undefined && (
                        <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] text-base text-[#0F172A] leading-relaxed">
                          <strong className="text-[#047857]">
                            {chosenIdx === tb.quickQuestion.correctIndex ? '✓ Spot on! ' : '💡 Coach Note: '}
                          </strong>
                          {tb.quickQuestion.explanation}
                        </div>
                      )}
                    </div>

                    {/* Bottom Slide Navigation Bar inside Module Card */}
                    {focusedModuleIdx !== 'all' && (
                      <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
                        <button
                          type="button"
                          disabled={focusedModuleIdx === 0}
                          onClick={() =>
                            setFocusedModuleIdx((prev) =>
                              typeof prev === 'number' && prev > 0 ? prev - 1 : 0
                            )
                          }
                          className="px-4 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] text-sm font-black text-[#0F172A] disabled:opacity-40 cursor-pointer"
                        >
                          ◀ Previous Module
                        </button>

                        <span className="text-xs sm:text-sm font-mono font-bold text-[#475569]">
                          Module {displayNum} of {currentLesson.theoryBlocks.length}
                        </span>

                        {focusedModuleIdx < currentLesson.theoryBlocks.length - 1 ? (
                          <button
                            type="button"
                            onClick={() =>
                              setFocusedModuleIdx((prev) =>
                                typeof prev === 'number' ? prev + 1 : 0
                              )
                            }
                            className="px-5 py-2.5 rounded-xl bg-[#34D399] hover:bg-[#10B981] border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] text-sm font-black text-[#0F172A] cursor-pointer"
                          >
                            Next Module ({displayNum + 1}/{currentLesson.theoryBlocks.length}) ▶
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setActiveTab('C_demo')}
                            className="px-5 py-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] text-sm font-black text-[#0F172A] cursor-pointer"
                          >
                            Continue to Stage C: Live Coding Demo →
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="flex flex-wrap justify-between gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('A_intro')}
                  className="px-4 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] text-[#0F172A] text-sm font-extrabold cursor-pointer"
                >
                  ← Stage A: Mission Intro
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('C_demo')}
                  className="px-5 py-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#0F172A] font-black text-sm sm:text-base border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A] cursor-pointer"
                >
                  Next Stage: C. Live Coding Demo →
                </button>
              </div>
            </div>
          )}

          {/* SECTION C: LIVE CODING DEMO */}
          {activeTab === 'C_demo' && (
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFDF7] comic-panel-cyan space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="comic-badge bg-[#38BDF8] text-[#0F172A] font-mono text-xs sm:text-sm font-black">
                    STAGE C • INTERACTIVE LIVE CODING WALKTHROUGH
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleLoadIntoRightIde(
                        currentLesson.liveDemo.starterCode,
                        currentLesson.liveDemo.sampleInput
                      )
                    }
                    className="px-4 py-2.5 rounded-xl bg-[#FBBF24] hover:bg-[#F59E0B] text-[#0F172A] font-black text-sm sm:text-base comic-btn cursor-pointer"
                  >
                    ↺ Load Demo into Live IDE
                  </button>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                  {currentLesson.liveDemo.title}
                </h3>
                <p className="text-lg sm:text-xl text-[#1E293B] leading-relaxed font-medium">
                  {currentLesson.liveDemo.description}
                </p>

                <div className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border-2 border-[#0F172A] space-y-4">
                  <div className="text-base sm:text-lg font-mono font-extrabold text-[#B45309]">
                    👣 Step-by-Step Code Walkthrough (Click &ldquo;👣 Step Through&rdquo; in the IDE!):
                  </div>
                  <div className="space-y-3">
                    {currentLesson.liveDemo.stepExplanations.map((st, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-base sm:text-lg bg-[#FFFDF7] p-3.5 rounded-xl border-2 border-[#CBD5E1]"
                      >
                        <span className="px-3 py-1 rounded-lg bg-[#38BDF8] border border-[#0F172A] text-[#0F172A] font-mono font-black text-sm shrink-0">
                          Line {st.line}
                        </span>
                        <span className="text-[#0F172A] font-medium leading-relaxed">{st.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F3E8FF] border-2 border-[#7C3AED] text-base sm:text-lg text-[#581C87] leading-relaxed">
                  <strong className="text-[#6D28D9] font-extrabold block mb-1">
                    🎓 Teacher &amp; Student Takeaway:
                  </strong>
                  {currentLesson.liveDemo.fullExplanation}
                </div>
              </div>

              <div className="flex flex-wrap justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('B_concept')}
                  className="px-5 py-3 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] text-[#0F172A] text-base font-extrabold cursor-pointer"
                >
                  ← Stage B: Learn Concept
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('D_predict')}
                  className="px-6 py-3.5 rounded-xl bg-[#38BDF8] text-[#0F172A] font-black text-base sm:text-lg comic-btn cursor-pointer"
                >
                  Next Stage: D. Predict Output →
                </button>
              </div>
            </div>
          )}

          {/* SECTION D: PREDICT THE OUTPUT */}
          {activeTab === 'D_predict' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="comic-badge bg-[#C084FC] text-[#0F172A] text-xs sm:text-sm font-black">
                  STAGE D • HUMAN PYTHON INTERPRETER ({currentLesson.predictChallenges.length} TRACES)
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                  Predict the Output Before Running!
                </h2>
                <p className="text-base sm:text-lg text-[#1E293B] leading-relaxed">
                  Read each Python snippet carefully, trace the variables in your head, type the exact output, and verify your prediction!
                </p>
              </div>

              {currentLesson.predictChallenges.map((pc) => {
                const userPred = predictions[pc.id] || '';
                const isChecked = predictChecked[pc.id] || false;
                const isMatch =
                  normalizeOutput(userPred).toLowerCase() ===
                  normalizeOutput(pc.expectedOutput).toLowerCase();

                return (
                  <div
                    key={pc.id}
                    className="p-6 sm:p-7 rounded-2xl bg-[#FFFDF7] comic-panel space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-black text-xl sm:text-2xl text-[#0F172A]">{pc.title}</span>
                      <span className="px-3 py-1 rounded-xl bg-[#FEF3C7] border-2 border-[#0F172A] font-mono text-xs sm:text-sm font-bold text-[#B45309]">
                        {pc.difficulty}
                      </span>
                    </div>

                    <pre className="p-5 rounded-xl bg-[#F8FAFC] border-2 border-[#0F172A] font-mono text-base sm:text-lg font-semibold text-[#0F172A] overflow-x-auto leading-8">
                      {pc.code}
                    </pre>

                    {pc.sampleInput && (
                      <div className="text-sm sm:text-base font-mono text-[#B45309]">
                        Sample Input:{' '}
                        <code className="bg-[#FFFFFF] px-2.5 py-1 rounded-lg border border-[#0F172A]">
                          {pc.sampleInput}
                        </code>
                      </div>
                    )}

                    <div className="space-y-3">
                      <label className="block text-sm sm:text-base font-mono font-bold text-[#0F172A]">
                        Your Output Prediction:
                      </label>
                      <textarea
                        rows={2}
                        aria-label={`Prediction for ${pc.title}`}
                        value={userPred}
                        onChange={(e) => {
                          setPredictions({ ...predictions, [pc.id]: e.target.value });
                          setPredictChecked({ ...predictChecked, [pc.id]: false });
                        }}
                        placeholder="Type the exact output this code will print..."
                        className="w-full p-4 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] font-mono text-base sm:text-lg text-[#0F172A] focus:border-[#0284C7] focus:outline-none"
                      />

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setPredictChecked({ ...predictChecked, [pc.id]: true })}
                          className="px-5 py-2.5 rounded-xl bg-[#34D399] hover:bg-[#10B981] text-[#0F172A] font-black text-sm sm:text-base comic-btn cursor-pointer"
                        >
                          ✓ Check My Prediction
                        </button>
                        <button
                          type="button"
                          onClick={() => handleLoadIntoRightIde(pc.code, pc.sampleInput || '')}
                          className="px-4 py-2.5 rounded-xl bg-[#E0F2FE] hover:bg-[#BAE6FD] border-2 border-[#0F172A] text-[#0F172A] text-sm sm:text-base font-bold cursor-pointer"
                        >
                          ▶ Run in Live IDE →
                        </button>
                      </div>

                      {isChecked && (
                        <div
                          className={`p-4 rounded-xl border-2 text-base sm:text-lg leading-relaxed ${
                            isMatch
                              ? 'bg-[#D1FAE5] border-[#059669] text-[#064E3B]'
                              : 'bg-[#FEF3C7] border-[#D97706] text-[#78350F]'
                          }`}
                        >
                          <div className="font-black mb-1">
                            {isMatch
                              ? '🎉 Exact Prediction Match!'
                              : `Expected Output: ${pc.expectedOutput}`}
                          </div>
                          <div>{pc.explanation}</div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="flex flex-wrap justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('C_demo')}
                  className="px-5 py-3 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] text-[#0F172A] text-base font-extrabold cursor-pointer"
                >
                  ← Stage C: Live Demo
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('E_practice')}
                  className="px-6 py-3.5 rounded-xl bg-[#38BDF8] text-[#0F172A] font-black text-base sm:text-lg comic-btn cursor-pointer"
                >
                  Next Stage: E. Guided Practice →
                </button>
              </div>
            </div>
          )}

          {/* SECTION E: GUIDED PRACTICE (LEVELS 1–4) */}
          {activeTab === 'E_practice' && activeGuided && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="comic-badge bg-[#FBBF24] text-[#0F172A] text-xs sm:text-sm font-black">
                    STAGE E • PROGRESSIVE CODING DRILLS
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] mt-1">
                    Guided Practice (Levels 1–4)
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenArenaForLesson(currentLesson.id)}
                  className="px-4 py-2.5 rounded-xl bg-[#E0F2FE] border-2 border-[#0F172A] text-sm sm:text-base font-mono font-bold text-[#0F172A] cursor-pointer"
                >
                  View all 12 Class Exercises in Arena →
                </button>
              </div>

              {/* Level Selector Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {guidedFour.map((ex, idx) => {
                  const solved = progress.exerciseRecords[ex.id]?.solved;
                  const active = idx === selectedGuidedIdx;
                  return (
                    <button
                      key={ex.id}
                      type="button"
                      onClick={() => setSelectedGuidedIdx(idx)}
                      className={`p-3.5 rounded-xl border-2 text-left transition cursor-pointer comic-btn ${
                        active
                          ? 'bg-[#FBBF24] text-[#0F172A] font-black'
                          : solved
                          ? 'bg-[#D1FAE5] text-[#064E3B] font-bold'
                          : 'bg-[#FFFFFF] text-[#0F172A] font-bold'
                      }`}
                    >
                      <div className="font-mono text-xs opacity-85">LEVEL {idx + 1}</div>
                      <div className="text-sm sm:text-base truncate mt-0.5">
                        {ex.category.toUpperCase()} {solved ? '✓' : ''}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-[#FFFDF7] comic-panel-cyan space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-xl bg-[#E0F2FE] border-2 border-[#0F172A] text-[#0369A1] font-mono text-sm font-bold">
                    {activeGuided.id} • {activeGuided.difficulty}
                  </span>
                  <span className="text-base font-mono text-[#B45309] font-black">
                    +{activeGuided.xpReward} XP Reward
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#0F172A]">{activeGuided.title}</h3>
                <p className="text-base sm:text-lg text-[#1E293B] font-medium leading-relaxed">
                  {activeGuided.instructions}
                </p>

                <div className="text-sm sm:text-base font-mono text-[#064E3B] bg-[#D1FAE5] p-4 rounded-xl border-2 border-[#059669]">
                  <strong>Target Output:</strong>{' '}
                  <span className="text-[#0F172A] font-bold">{activeGuided.expectedOutput}</span>
                </div>

                <PythonEditorPanel
                  title={`GUIDED PRACTICE: ${activeGuided.id}`}
                  code={guidedCode}
                  onChange={setGuidedCode}
                  defaultCode={activeGuided.starterCode}
                  inputValues={guidedInput}
                  onInputValuesChange={setGuidedInput}
                  compact
                />

                {/* Progressive Hints & Check Answer Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleVerifyGuidedPractice}
                      className="px-6 py-3 rounded-xl bg-[#34D399] hover:bg-[#10B981] text-[#0F172A] font-black text-base comic-btn cursor-pointer"
                    >
                      ✓ Submit &amp; Verify Output
                    </button>

                    <button
                      type="button"
                      onClick={() => setGuidedHintsShown((h) => Math.min(3, h + 1))}
                      disabled={guidedHintsShown >= 3}
                      className="px-4 py-3 rounded-xl bg-[#FEF3C7] border-2 border-[#0F172A] text-[#B45309] text-sm sm:text-base font-bold cursor-pointer disabled:opacity-40"
                    >
                      💡 Reveal Hint ({guidedHintsShown}/3)
                    </button>
                  </div>

                  {isTeacher && (
                    <button
                      type="button"
                      onClick={() => setGuidedSolutionShown((prev) => !prev)}
                      className="px-4 py-3 rounded-xl bg-[#F3E8FF] border-2 border-[#0F172A] text-[#581C87] text-sm sm:text-base font-bold cursor-pointer"
                    >
                      {guidedSolutionShown ? 'Hide Teacher Solution' : '🔑 Teacher Solution'}
                    </button>
                  )}
                </div>

                {guidedHintsShown > 0 && (
                  <div className="space-y-2 p-4 rounded-xl bg-[#FEF3C7] border-2 border-[#D97706] text-base text-[#78350F]">
                    {activeGuided.hints.slice(0, guidedHintsShown).map((h, i) => (
                      <div key={i}>
                        <strong className="text-[#B45309]">Hint {i + 1}:</strong> {h}
                      </div>
                    ))}
                  </div>
                )}

                {guidedFeedback && (
                  <div
                    className={`p-4 rounded-xl border-2 text-base font-mono whitespace-pre-wrap ${
                      guidedFeedback.passed
                        ? 'bg-[#D1FAE5] border-[#059669] text-[#064E3B]'
                        : 'bg-[#FFE4E6] border-[#E11D48] text-[#881337]'
                    }`}
                  >
                    {guidedFeedback.message}
                  </div>
                )}

                {isTeacher && guidedSolutionShown && (
                  <div className="p-5 rounded-xl bg-[#F3E8FF] border-2 border-[#7C3AED] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-mono font-bold text-[#581C87]">
                        TEACHER REFERENCE SOLUTION
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuidedCode(activeGuided.teacherSolution)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#C084FC] border border-[#0F172A] text-[#0F172A] font-black text-xs sm:text-sm cursor-pointer"
                      >
                        Copy into Practice Editor
                      </button>
                    </div>
                    <pre className="font-mono text-base text-[#0F172A] bg-[#FFFFFF] p-3 rounded-lg border border-[#CBD5E1] overflow-x-auto">
                      {activeGuided.teacherSolution}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION F: CLASS ACTIVITY */}
          {activeTab === 'F_activity' && (
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFDF7] comic-panel-amber space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="comic-badge bg-[#FBBF24] text-[#0F172A] text-xs sm:text-sm font-black">
                      STAGE F • LIVE 1-ON-1 CLASSROOM ACTIVITY
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] mt-2">
                      {currentLesson.classActivity.title}
                    </h3>
                  </div>

                  {/* Interactive Countdown Timer */}
                  <div className="flex items-center gap-3 bg-[#E0F2FE] px-4 py-2.5 rounded-2xl border-2 border-[#0F172A]">
                    <span className="font-mono text-lg sm:text-xl font-black text-[#0F172A]">
                      ⏱ {formatTimer(timerSeconds)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTimerRunning((r) => !r)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#38BDF8] border border-[#0F172A] text-[#0F172A] font-black text-sm cursor-pointer"
                    >
                      {timerRunning ? 'Pause' : 'Start'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTimerRunning(false);
                        setTimerSeconds(currentLesson.classActivity.timeLimitMinutes * 60);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#0F172A] text-[#0F172A] text-sm font-bold cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <p className="text-lg sm:text-xl text-[#0F172A] font-medium leading-relaxed">
                  <strong className="text-[#0369A1]">Mission Objective:</strong>{' '}
                  {currentLesson.classActivity.objective}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-base sm:text-lg">
                  <div className="p-5 rounded-xl bg-[#D1FAE5]/60 border-2 border-[#0F172A] space-y-2">
                    <strong className="text-[#064E3B] font-extrabold block">
                      🧑‍🚀 Student Steps (Hasthaksh):
                    </strong>
                    <ol className="list-decimal list-inside space-y-2 text-[#0F172A] font-medium leading-relaxed">
                      {currentLesson.classActivity.studentInstructions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ol>
                  </div>

                  {isTeacher && (
                    <div className="p-5 rounded-xl bg-[#F3E8FF] border-2 border-[#0F172A] space-y-2">
                      <strong className="text-[#581C87] font-extrabold block">
                        👩‍🏫 Teacher Facilitation Steps:
                      </strong>
                      <ol className="list-decimal list-inside space-y-2 text-[#0F172A] font-medium leading-relaxed">
                        {currentLesson.classActivity.teacherInstructions.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleLoadIntoRightIde(
                        currentLesson.classActivity.starterCode,
                        currentLesson.classActivity.sampleInput
                      )
                    }
                    className="px-5 py-3 rounded-xl bg-[#38BDF8] text-[#0F172A] font-black text-base comic-btn cursor-pointer"
                  >
                    ⚡ Load Activity Starter Code into Live IDE →
                  </button>

                  {isTeacher && (
                    <button
                      type="button"
                      onClick={() =>
                        handleLoadIntoRightIde(
                          currentLesson.classActivity.teacherSolution,
                          currentLesson.classActivity.sampleInput
                        )
                      }
                      className="px-5 py-3 rounded-xl bg-[#F3E8FF] border-2 border-[#0F172A] text-[#581C87] font-bold text-base cursor-pointer"
                    >
                      🔑 Load Teacher Activity Solution
                    </button>
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t-2 border-[#CBD5E1]">
                  <label className="block text-base sm:text-lg font-extrabold text-[#B45309]">
                    💬 Reflection Question: {currentLesson.classActivity.reflectionQuestion}
                  </label>
                  <textarea
                    rows={2}
                    value={activityReflection}
                    onChange={(e) => setActivityReflection(e.target.value)}
                    placeholder="Record Hasthaksh's reflection or key takeaway..."
                    className="w-full p-4 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] text-base text-[#0F172A]"
                  />
                  <button
                    type="button"
                    onClick={() => onCompleteActivity(currentLesson.id)}
                    className="px-6 py-3 rounded-xl bg-[#34D399] text-[#0F172A] font-black text-base comic-btn cursor-pointer"
                  >
                    {progress.completedActivities.includes(currentLesson.id)
                      ? '✓ Activity Completed (+50 XP)'
                      : '★ Complete Activity (+50 XP)'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SECTION G: DEBUGGING MISSION */}
          {activeTab === 'G_debug' && (
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFDF7] comic-panel-rose space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="comic-badge bg-[#FB7185] text-[#0F172A] font-mono text-xs sm:text-sm font-black">
                    🐞 BUG HUNT • {currentLesson.debuggingMission.bugType}
                  </span>
                  <span className="text-base font-mono font-black text-[#B45309]">+40 XP</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                  {currentLesson.debuggingMission.title}
                </h3>
                <p className="text-lg sm:text-xl text-[#1E293B] font-medium leading-relaxed">
                  {currentLesson.debuggingMission.storyContext}
                </p>

                <div className="text-base font-mono text-[#064E3B] bg-[#D1FAE5] p-4 rounded-xl border-2 border-[#059669]">
                  <strong>Target Output After Fix:</strong>{' '}
                  <span className="text-[#0F172A] font-bold">{currentLesson.debuggingMission.expectedOutput}</span>
                </div>

                <PythonEditorPanel
                  title="DEBUGGING LAB EDITOR"
                  code={debugCode}
                  onChange={setDebugCode}
                  defaultCode={currentLesson.debuggingMission.brokenCode}
                  inputValues={debugInput}
                  onInputValuesChange={setDebugInput}
                  compact
                />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleVerifyDebugMission}
                      className="px-6 py-3 rounded-xl bg-[#34D399] text-[#0F172A] font-black text-base comic-btn cursor-pointer"
                    >
                      🔧 Test My Bug Fix
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDebugHintsShown((h) =>
                          Math.min(currentLesson.debuggingMission.hints.length, h + 1)
                        )
                      }
                      className="px-4 py-3 rounded-xl bg-[#FEF3C7] border-2 border-[#0F172A] text-[#B45309] text-sm sm:text-base font-bold cursor-pointer"
                    >
                      💡 Bug Clues ({debugHintsShown}/{currentLesson.debuggingMission.hints.length})
                    </button>
                  </div>

                  {isTeacher && (
                    <button
                      type="button"
                      onClick={() => setDebugShowTeacherFix((prev) => !prev)}
                      className="px-4 py-3 rounded-xl bg-[#F3E8FF] border-2 border-[#0F172A] text-[#581C87] text-sm sm:text-base font-bold cursor-pointer"
                    >
                      {debugShowTeacherFix ? 'Hide Fixed Code' : '🔑 Show Teacher Fix'}
                    </button>
                  )}
                </div>

                {debugHintsShown > 0 && (
                  <div className="p-4 rounded-xl bg-[#FEF3C7] border-2 border-[#D97706] text-base text-[#78350F] space-y-2">
                    {currentLesson.debuggingMission.hints.slice(0, debugHintsShown).map((h, i) => (
                      <div key={i}>
                        <strong>Clue {i + 1}:</strong> {h}
                      </div>
                    ))}
                  </div>
                )}

                {debugFeedback && (
                  <div
                    className={`p-4 rounded-xl border-2 text-base font-mono ${
                      debugFeedback.passed
                        ? 'bg-[#D1FAE5] border-[#059669] text-[#064E3B]'
                        : 'bg-[#FFE4E6] border-[#E11D48] text-[#881337]'
                    }`}
                  >
                    {debugFeedback.text}
                  </div>
                )}

                {isTeacher && debugShowTeacherFix && (
                  <div className="p-5 rounded-xl bg-[#F3E8FF] border-2 border-[#7C3AED] space-y-3 text-base">
                    <div className="font-bold text-[#581C87]">
                      Teacher Fixed Code &amp; Explanation:
                    </div>
                    <pre className="font-mono text-[#0F172A] bg-[#FFFFFF] p-4 rounded-xl border border-[#CBD5E1]">
                      {currentLesson.debuggingMission.teacherFixedCode}
                    </pre>
                    <p className="text-[#581C87]">
                      {currentLesson.debuggingMission.explanationOfFix}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION H: EXIT QUIZ */}
          {activeTab === 'H_quiz' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="comic-badge bg-[#34D399] text-[#0F172A] text-xs sm:text-sm font-black">
                    STAGE H • END-OF-CLASS MASTERY CHECK
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] mt-1">
                    Class {currentLesson.id} Exit Quiz
                  </h2>
                  <p className="text-base sm:text-lg text-[#1E293B]">
                    Complete these {currentLesson.exitQuiz.length} questions to verify mastery of today&apos;s mission!
                  </p>
                </div>
                {quizSubmittedRecord && (
                  <span className="px-4 py-2 rounded-xl bg-[#D1FAE5] border-2 border-[#059669] text-[#064E3B] font-mono text-base font-black">
                    Score: {quizSubmittedRecord.percentage}% ({quizSubmittedRecord.score}/{quizSubmittedRecord.maxScore})
                  </span>
                )}
              </div>

              <div className="space-y-5">
                {currentLesson.exitQuiz.map((q, qIdx) => {
                  const ans = quizAnswers[q.id] || '';
                  return (
                    <div
                      key={q.id}
                      className="p-6 rounded-2xl bg-[#FFFDF7] comic-panel space-y-4"
                    >
                      <div className="flex items-center justify-between text-sm sm:text-base">
                        <span className="font-mono font-black text-[#0369A1]">
                          QUESTION {qIdx + 1} • {q.conceptTag}
                        </span>
                        <span className="font-mono font-bold text-[#B45309]">{q.points} pts</span>
                      </div>

                      <p className="text-lg sm:text-xl font-bold text-[#0F172A] leading-snug">{q.prompt}</p>

                      {q.codeSnippet && (
                        <pre className="p-4 rounded-xl bg-[#F8FAFC] border-2 border-[#0F172A] font-mono text-base sm:text-lg font-semibold text-[#0F172A] overflow-x-auto leading-7">
                          {q.codeSnippet}
                        </pre>
                      )}

                      {q.options && q.options.length > 0 ? (
                        <div className="grid grid-cols-1 gap-2.5">
                          {q.options.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: opt })}
                              className={`p-4 rounded-xl border-2 text-left text-base sm:text-lg font-mono font-semibold transition cursor-pointer ${
                                ans === opt
                                  ? 'bg-[#E0F2FE] border-[#0284C7] text-[#0F172A] font-black'
                                  : 'bg-[#FFFFFF] border-[#0F172A] text-[#0F172A] hover:bg-[#FEF3C7]'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <input
                          type="text"
                          aria-label={`Answer for ${q.id}`}
                          value={ans}
                          onChange={(e) => setQuizAnswers({ ...quizAnswers, [q.id]: e.target.value })}
                          placeholder="Type your Python answer..."
                          className="w-full p-4 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] font-mono text-base sm:text-lg text-[#0F172A]"
                        />
                      )}

                      {(quizSubmittedRecord || isTeacher) && (
                        <div className="p-4 rounded-xl bg-[#D1FAE5]/60 border-2 border-[#059669] text-base space-y-1.5">
                          <div className="font-mono font-bold text-[#064E3B]">
                            ✓ Answer Key: <code>{q.correctAnswer}</code>
                          </div>
                          <div className="text-[#0F172A] leading-relaxed">{q.explanation}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleSubmitExitQuiz}
                  className="px-7 py-4 rounded-xl bg-[#34D399] hover:bg-[#10B981] text-[#0F172A] font-black text-base sm:text-lg tracking-wide cursor-pointer comic-btn"
                >
                  🏆 Submit Exit Quiz &amp; Claim XP
                </button>

                {quizSubmittedRecord && (
                  <div className="text-base sm:text-lg text-[#047857] font-extrabold">
                    Quiz Recorded! Mastered: {quizSubmittedRecord.conceptsMastered.join(', ') || 'Keep practising!'}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* RIGHT COLUMN: Live Synchronized Python 3 IDE, Step Tracer & Visual Telemetry */}
        {!wideReadingMode && (
          <aside
            className={`lg:col-span-5 space-y-6 ${
              isTeachingFullScreen
                ? 'h-full overflow-y-auto pr-1'
                : 'lg:sticky lg:top-24'
            }`}
          >
            <PythonEditorPanel
              title={`CLASS ${currentLesson.id} LIVE PYTHON 3 STUDIO`}
              code={ideCode}
              onChange={setIdeCode}
              defaultCode={currentLesson.liveDemo.starterCode}
              inputValues={ideInput}
              onInputValuesChange={setIdeInput}
              explanationText={currentLesson.liveDemo.fullExplanation}
              onRunComplete={(res) => setIdeLastStdout(res.stdout)}
              heightClass="h-72"
            />

            <PythonCanvasVisualizer
              stdout={ideLastStdout}
              code={ideCode}
              reducedMotion={progress.reducedMotion}
            />

            {/* Teacher Lesson Notes Panel (visible in Teacher Mode) */}
            {isTeacher && (
              <div className="p-5 rounded-2xl bg-[#F3E8FF] comic-panel-purple space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-extrabold text-[#581C87] uppercase">
                    📝 Teacher Session Notes (Class {currentLesson.id})
                  </span>
                  <span className="text-xs font-mono text-[#6D28D9]">Auto-saved locally</span>
                </div>
                <textarea
                  rows={3}
                  aria-label={`Teacher notes for Class ${currentLesson.id}`}
                  value={progress.teacherNotes[currentLesson.id] || ''}
                  onChange={(e) => onUpdateTeacherNote(currentLesson.id, e.target.value)}
                  placeholder="Write observations on Hasthaksh's pacing, strengths, or homework focus..."
                  className="w-full p-3.5 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] text-sm sm:text-base text-[#0F172A]"
                />
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
};
