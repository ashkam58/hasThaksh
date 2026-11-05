import React, { useState, useEffect, useMemo } from 'react';
import {
  Lesson,
  PracticeExercise,
  MajorProject,
  UserProgressState,
  ExerciseCategory,
} from '../types/quest';
import { PythonEditorPanel } from './PythonEditorPanel';
import { PythonCanvasVisualizer } from './ComicArtwork';
import {
  verifyOutputMatch,
  getAdaptiveGuidance,
} from '../utils/gamification';
import { runPythonCode } from '../python/pyRunner';

interface PracticeArenaViewProps {
  lessons: Lesson[];
  exercises: PracticeExercise[];
  progress: UserProgressState;
  initialLessonFilter?: number | 'all';
  onRecordExerciseAttempt: (
    exerciseId: string,
    solved: boolean,
    code: string,
    hintsUsed: number,
    solutionViewed: boolean,
    xpReward: number
  ) => void;
}

export const PracticeArenaView: React.FC<PracticeArenaViewProps> = ({
  lessons,
  exercises,
  progress,
  initialLessonFilter = 'all',
  onRecordExerciseAttempt,
}) => {
  const isTeacher = progress.mode === 'teacher';
  const [lessonFilter, setLessonFilter] = useState<number | 'all'>(initialLessonFilter);
  const [categoryFilter, setCategoryFilter] = useState<ExerciseCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'solved' | 'unsolved'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setLessonFilter(initialLessonFilter);
  }, [initialLessonFilter]);

  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      if (lessonFilter !== 'all' && ex.lessonId !== lessonFilter) return false;
      if (categoryFilter !== 'all' && ex.category !== categoryFilter) return false;
      const isSolved = Boolean(progress.exerciseRecords[ex.id]?.solved);
      if (statusFilter === 'solved' && !isSolved) return false;
      if (statusFilter === 'unsolved' && isSolved) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          ex.id.toLowerCase().includes(q) ||
          ex.title.toLowerCase().includes(q) ||
          ex.contextTheme.toLowerCase().includes(q) ||
          ex.instructions.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [exercises, lessonFilter, categoryFilter, statusFilter, searchQuery, progress.exerciseRecords]);

  const [selectedExId, setSelectedExId] = useState<string>(exercises[0]?.id || 'C01-E01');
  const activeEx =
    filteredExercises.find((e) => e.id === selectedExId) ||
    filteredExercises[0] ||
    exercises[0];

  const [code, setCode] = useState<string>(activeEx.starterCode);
  const [inputValues, setInputValues] = useState<string>(activeEx.inputExample);
  const [hintsShown, setHintsShown] = useState<number>(0);
  const [solutionViewed, setSolutionViewed] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ passed: boolean; text: string } | null>(null);

  useEffect(() => {
    if (!activeEx) return;
    const saved = progress.exerciseRecords[activeEx.id];
    setCode(saved?.lastCode || activeEx.starterCode);
    setInputValues(activeEx.inputExample);
    setHintsShown(0);
    setSolutionViewed(false);
    setFeedback(null);
  }, [activeEx?.id]);

  const currentLessonId = activeEx ? activeEx.lessonId : 1;
  const currentLessonExercises = exercises.filter((e) => e.lessonId === currentLessonId);
  const adaptiveInfo = getAdaptiveGuidance(
    currentLessonId,
    progress.exerciseRecords,
    currentLessonExercises
  );

  const totalSolvedCount = Object.values(progress.exerciseRecords).filter((r) => r.solved).length;

  const handleVerify = async () => {
    if (!activeEx) return;
    const inputs = inputValues ? inputValues.split('\n') : [];
    const execRes = await runPythonCode(code, inputs);
    if (execRes.status !== 'success') {
      setFeedback({
        passed: false,
        text: `Python Error: ${execRes.stderr}`,
      });
      onRecordExerciseAttempt(activeEx.id, false, code, hintsShown, solutionViewed, 0);
      return;
    }

    const check = verifyOutputMatch(
      execRes.stdout,
      activeEx.expectedOutput,
      code,
      activeEx.validationKeywords
    );
    setFeedback({
      passed: check.passed,
      text: check.passed
        ? `🎉 Mission Accomplished! +${activeEx.xpReward} XP! ${activeEx.explanation}`
        : check.feedback,
    });
    onRecordExerciseAttempt(
      activeEx.id,
      check.passed,
      code,
      hintsShown,
      solutionViewed,
      check.passed ? activeEx.xpReward : 0
    );
  };

  return (
    <div className="space-y-4">
      {/* Arena Header & Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/95 border-2 border-slate-700 shadow-[4px_4px_0px_#020617] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
              240-EXERCISE CODING PRACTICE ARENA
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              Hasthaksh&apos;s Python Training Grounds
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
              Solved: <span className="text-emerald-400 font-bold">{totalSolvedCount}</span> / 240
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
              Showing: <span className="text-cyan-300 font-bold">{filteredExercises.length}</span> drills
            </div>
          </div>
        </div>

        {/* Adaptive Guidance Banner */}
        <div
          className={`p-3 rounded-xl border flex flex-wrap items-center justify-between gap-2 text-xs ${
            adaptiveInfo.status === 'unlock-boss'
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
              : adaptiveInfo.status === 'scaffold-support'
              ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
              : 'bg-slate-950 border-slate-800 text-slate-300'
          }`}
        >
          <div>
            <strong className="font-mono uppercase mr-2">⚡ {adaptiveInfo.headline}:</strong>
            <span>{adaptiveInfo.recommendation}</span>
          </div>
          {adaptiveInfo.smallerExampleCode && (
            <button
              type="button"
              onClick={() => setCode(adaptiveInfo.smallerExampleCode!)}
              className="px-2.5 py-1 rounded bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Load Scaffold Example
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
          <div>
            <label htmlFor="arena-class-filter" className="block text-[11px] font-mono text-slate-400 mb-1">
              Filter by Class (1–20)
            </label>
            <select
              id="arena-class-filter"
              value={lessonFilter}
              onChange={(e) =>
                setLessonFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
              }
              className="w-full px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100"
            >
              <option value="all">All 20 Classes (240 Exercises)</option>
              {lessons.map((l) => (
                <option key={l.id} value={l.id}>
                  Class {l.id}: {l.title} (12)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="arena-cat-filter" className="block text-[11px] font-mono text-slate-400 mb-1">
              Exercise Type
            </label>
            <select
              id="arena-cat-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as ExerciseCategory | 'all')}
              className="w-full px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100"
            >
              <option value="all">All Categories</option>
              <option value="warmup">Warm-up (60)</option>
              <option value="predict">Predict-the-Output (60)</option>
              <option value="completion">Code-Completion (40)</option>
              <option value="debug">Debugging (40)</option>
              <option value="independent">Independent Coding (20)</option>
              <option value="boss">Boss Challenges (20)</option>
            </select>
          </div>

          <div>
            <label htmlFor="arena-status-filter" className="block text-[11px] font-mono text-slate-400 mb-1">
              Completion Status
            </label>
            <select
              id="arena-status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'solved' | 'unsolved')}
              className="w-full px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100"
            >
              <option value="all">All Exercises</option>
              <option value="unsolved">Unsolved Only</option>
              <option value="solved">Solved Only</option>
            </select>
          </div>

          <div>
            <label htmlFor="arena-search" className="block text-[11px] font-mono text-slate-400 mb-1">
              Search Keyword / Theme
            </label>
            <input
              id="arena-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. C05, Rocket, Cricket, Maze..."
              className="w-full px-2.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100"
            />
          </div>
        </div>
      </div>

      {/* Main Arena Split: Exercise Browser List (Left) + Active Coding Workbench (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left List */}
        <div className="lg:col-span-4 rounded-2xl bg-slate-900/95 border-2 border-slate-700 p-3 shadow-[4px_4px_0px_#020617] max-h-[680px] overflow-y-auto space-y-1.5">
          {filteredExercises.map((ex) => {
            const rec = progress.exerciseRecords[ex.id];
            const isSelected = activeEx?.id === ex.id;
            return (
              <button
                key={ex.id}
                type="button"
                onClick={() => setSelectedExId(ex.id)}
                className={`w-full p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'bg-cyan-400 text-slate-950 border-slate-950 font-bold shadow-[2px_2px_0px_#020617]'
                    : rec?.solved
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-100 hover:bg-emerald-950/50'
                    : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono">
                    <span className={isSelected ? 'text-slate-950 font-black' : 'text-cyan-300 font-bold'}>
                      {ex.id}
                    </span>
                    <span>•</span>
                    <span className="truncate opacity-80">{ex.category.toUpperCase()}</span>
                    <span>•</span>
                    <span className="truncate opacity-80">{ex.contextTheme}</span>
                  </div>
                  <div className="text-xs font-bold truncate mt-0.5">{ex.title}</div>
                </div>

                <div className="shrink-0 text-xs font-mono">
                  {rec?.solved ? (
                    <span className={isSelected ? 'text-slate-950 font-black' : 'text-emerald-400 font-bold'}>
                      ✓
                    </span>
                  ) : (
                    <span className={isSelected ? 'text-slate-900' : 'text-amber-300'}>
                      +{ex.xpReward}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Active Exercise Workbench */}
        {activeEx && (
          <div className="lg:col-span-8 rounded-2xl bg-slate-900/95 border-2 border-slate-700 p-4 sm:p-5 shadow-[4px_4px_0px_#020617] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold">
                  {activeEx.id} • Class {activeEx.lessonId}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-amber-500/20 border border-amber-400/50 text-amber-300 font-mono text-xs">
                  {activeEx.difficulty}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-xs">
                  Theme: {activeEx.contextTheme}
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-400">
                Reward: +{activeEx.xpReward} XP
              </span>
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-white">{activeEx.title}</h2>
              <p className="text-sm text-slate-200 mt-1 leading-relaxed">{activeEx.instructions}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-amber-400 block mb-0.5">Sample Input:</span>
                <pre className="text-slate-200">{activeEx.inputExample || '(No input required)'}</pre>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-emerald-400 block mb-0.5">Expected Output:</span>
                <pre className="text-slate-100">{activeEx.expectedOutput}</pre>
              </div>
            </div>

            <PythonEditorPanel
              title={`ARENA CHALLENGE: ${activeEx.id}`}
              code={code}
              onChange={setCode}
              defaultCode={activeEx.starterCode}
              inputValues={inputValues}
              onInputValuesChange={setInputValues}
              explanationText={activeEx.explanation}
            />

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleVerify}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs tracking-wide cursor-pointer shadow-[2px_2px_0px_#020617]"
                >
                  ✓ Submit & Verify Solution
                </button>

                <button
                  type="button"
                  onClick={() => setHintsShown((h) => Math.min(3, h + 1))}
                  disabled={hintsShown >= 3}
                  className="px-3.5 py-2 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-bold cursor-pointer disabled:opacity-40"
                >
                  💡 Progressive Hint ({hintsShown}/3)
                </button>
              </div>

              {isTeacher && (
                <button
                  type="button"
                  onClick={() => setSolutionViewed((prev) => !prev)}
                  className="px-3.5 py-2 rounded-xl bg-purple-500/20 border border-purple-400/50 text-purple-200 text-xs font-bold cursor-pointer"
                >
                  {solutionViewed ? 'Hide Teacher Solution' : '🔑 Reveal Teacher Solution'}
                </button>
              )}
            </div>

            {hintsShown > 0 && (
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-1.5 text-xs text-amber-100">
                {activeEx.hints.slice(0, hintsShown).map((h, i) => (
                  <div key={i}>
                    <strong className="text-amber-300">Hint {i + 1}:</strong> {h}
                  </div>
                ))}
              </div>
            )}

            {feedback && (
              <div
                className={`p-3.5 rounded-xl border text-xs font-mono whitespace-pre-wrap ${
                  feedback.passed
                    ? 'bg-emerald-950/60 border-emerald-400 text-emerald-200'
                    : 'bg-rose-950/60 border-rose-400 text-rose-200'
                }`}
              >
                {feedback.text}
              </div>
            )}

            {isTeacher && solutionViewed && (
              <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-400/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-purple-300">
                    TEACHER SOLUTION ({activeEx.id})
                  </span>
                  <button
                    type="button"
                    onClick={() => setCode(activeEx.teacherSolution)}
                    className="px-2.5 py-1 rounded bg-purple-400 text-slate-950 font-bold text-xs cursor-pointer"
                  >
                    Load Solution into Editor
                  </button>
                </div>
                <pre className="font-mono text-xs text-purple-100 bg-slate-950 p-3 rounded overflow-x-auto">
                  {activeEx.teacherSolution}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface MajorProjectsStudioViewProps {
  projects: MajorProject[];
  progress: UserProgressState;
  initialProjectId?: MajorProject['id'];
  onUpdateProjectProgress: (
    projectId: MajorProject['id'],
    updates: Partial<UserProgressState['projectProgress'][string]>,
    xpReward?: number
  ) => void;
}

export const MajorProjectsStudioView: React.FC<MajorProjectsStudioViewProps> = ({
  projects,
  progress,
  initialProjectId = 'quiz-master',
  onUpdateProjectProgress,
}) => {
  const isTeacher = progress.mode === 'teacher';
  const [selectedId, setSelectedId] = useState<MajorProject['id']>(initialProjectId);

  useEffect(() => {
    if (initialProjectId) setSelectedId(initialProjectId);
  }, [initialProjectId]);

  const activeProject = projects.find((p) => p.id === selectedId) || projects[0];
  const savedState = progress.projectProgress[activeProject.id] || {
    code: '',
    completedMilestones: [],
    checkedAcceptance: [],
    checkedPresentation: [],
    completed: false,
  };

  const [code, setCode] = useState<string>(savedState.code || activeProject.starterBoilerplate);
  const [inputs, setInputs] = useState<string>(activeProject.defaultInputValues);
  const [lastStdout, setLastStdout] = useState<string>('');
  const [showTeacherSolution, setShowTeacherSolution] = useState<boolean>(false);

  useEffect(() => {
    const pState = progress.projectProgress[activeProject.id];
    setCode(pState?.code || activeProject.starterBoilerplate);
    setInputs(activeProject.defaultInputValues);
    setLastStdout('');
    setShowTeacherSolution(false);
  }, [activeProject.id]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onUpdateProjectProgress(activeProject.id, { code: newCode });
  };

  const toggleMilestone = (mId: string) => {
    const current = savedState.completedMilestones || [];
    const next = current.includes(mId)
      ? current.filter((x) => x !== mId)
      : [...current, mId];
    onUpdateProjectProgress(activeProject.id, { completedMilestones: next });
  };

  const toggleAcceptance = (item: string) => {
    const current = savedState.checkedAcceptance || [];
    const next = current.includes(item)
      ? current.filter((x) => x !== item)
      : [...current, item];
    onUpdateProjectProgress(activeProject.id, { checkedAcceptance: next });
  };

  return (
    <div className="space-y-4">
      {/* Project Selector Header */}
      <div className="p-4 rounded-2xl bg-slate-900/95 border-2 border-slate-700 shadow-[4px_4px_0px_#020617] flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase">
            CAPSTONE GAME & APPLICATION ENGINEERING
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            Three Major Projects Studio
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {projects.map((p, idx) => {
            const isSelected = p.id === activeProject.id;
            const isDone = progress.projectProgress[p.id]?.completed;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedId(p.id)}
                className={`px-3.5 py-2 rounded-xl font-bold text-xs transition cursor-pointer border-2 ${
                  isSelected
                    ? 'bg-cyan-400 text-slate-950 border-slate-950 shadow-[2px_2px_0px_#020617]'
                    : 'bg-slate-950 text-slate-200 border-slate-800 hover:border-cyan-400'
                }`}
              >
                Project {idx + 1}: {p.title} {isDone ? '✓' : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Project Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Mission Brief, Milestones & Checklists (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900/95 border-2 border-slate-700 p-4 space-y-4 shadow-[4px_4px_0px_#020617]">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">
                Class {activeProject.classNumber} Capstone • +{activeProject.xpReward} XP
              </span>
              {savedState.completed && (
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
                  ✓ Project Completed
                </span>
              )}
            </div>
            <h2 className="text-xl font-black text-white">{activeProject.title}</h2>
            <p className="text-xs font-semibold text-cyan-300">{activeProject.subtitle}</p>
            <p className="text-xs text-slate-200 leading-relaxed pt-1">{activeProject.missionBrief}</p>
          </div>

          {/* Step-by-Step Milestones */}
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-amber-300 uppercase">
              Step-by-Step Build Milestones
            </div>
            {activeProject.milestones.map((m) => {
              const checked = savedState.completedMilestones?.includes(m.id);
              return (
                <div
                  key={m.id}
                  className={`p-3 rounded-xl border text-xs space-y-1 ${
                    checked
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                      : 'bg-slate-950 border-slate-800 text-slate-200'
                  }`}
                >
                  <label className="flex items-center gap-2 font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(checked)}
                      onChange={() => toggleMilestone(m.id)}
                      className="rounded accent-emerald-400"
                    />
                    <span>{m.title}</span>
                  </label>
                  <p className="text-slate-300 pl-6">{m.description}</p>
                  <div className="pl-6 text-[11px] font-mono text-cyan-300">
                    💡 {m.hint}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Acceptance Criteria Checklist */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase">
              Project Acceptance Checklist
            </div>
            {activeProject.acceptanceChecklist.map((item, i) => {
              const checked = savedState.checkedAcceptance?.includes(item);
              return (
                <label key={i} className="flex items-start gap-2 text-xs text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(checked)}
                    onChange={() => toggleAcceptance(item)}
                    className="mt-0.5 rounded accent-emerald-400"
                  />
                  <span>{item}</span>
                </label>
              );
            })}
          </div>

          {/* Stretch Challenges & Presentation Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <strong className="text-amber-300 block mb-1">🚀 Stretch Challenges:</strong>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {activeProject.stretchChallenges.map((sc, i) => (
                  <li key={i}>{sc}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <strong className="text-cyan-300 block mb-1">🎤 Showcase Demo Steps:</strong>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {activeProject.presentationChecklist.map((pc, i) => (
                  <li key={i}>{pc}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <button
              type="button"
              onClick={() =>
                onUpdateProjectProgress(
                  activeProject.id,
                  { completed: true, code },
                  activeProject.xpReward
                )
              }
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer shadow-[2px_2px_0px_#020617]"
            >
              {savedState.completed
                ? '✓ Project Certified (+XP Claimed)'
                : `🏆 Mark ${activeProject.title} Complete (+${activeProject.xpReward} XP)`}
            </button>

            {isTeacher && (
              <button
                type="button"
                onClick={() => setShowTeacherSolution((prev) => !prev)}
                className="px-3 py-2 rounded-xl bg-purple-500/20 border border-purple-400/50 text-purple-200 text-xs font-bold cursor-pointer"
              >
                {showTeacherSolution ? 'Hide Reference Solution' : '🔑 Teacher Reference Solution'}
              </button>
            )}
          </div>

          {isTeacher && showTeacherSolution && (
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-400/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-300">
                  COMPLETE WORKING TEACHER SOLUTION
                </span>
                <button
                  type="button"
                  onClick={() => handleCodeChange(activeProject.teacherSolution)}
                  className="px-2.5 py-1 rounded bg-purple-400 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Load into Project Editor
                </button>
              </div>
              <pre className="font-mono text-xs text-purple-100 bg-slate-950 p-3 rounded overflow-x-auto">
                {activeProject.teacherSolution}
              </pre>
            </div>
          )}
        </div>

        {/* Right Column: Full Python 3 Project IDE & Visual Telemetry (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <PythonEditorPanel
            title={`PROJECT STUDIO: ${activeProject.title.toUpperCase()}`}
            code={code}
            onChange={handleCodeChange}
            defaultCode={activeProject.starterBoilerplate}
            inputValues={inputs}
            onInputValuesChange={setInputs}
            onRunComplete={(res) => setLastStdout(res.stdout)}
            heightClass="h-96"
          />

          <PythonCanvasVisualizer
            stdout={lastStdout}
            code={code}
            reducedMotion={progress.reducedMotion}
          />
        </div>
      </div>
    </div>
  );
};
