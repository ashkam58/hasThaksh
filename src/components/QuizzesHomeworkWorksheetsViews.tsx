import React, { useState } from 'react';
import {
  Lesson,
  PracticeExercise,
  HomeworkTask,
  FormalAssessment,
  UserProgressState,
  QuizResultRecord,
  HomeworkSubmission,
} from '../types/quest';
import { PythonEditorPanel } from './PythonEditorPanel';
import { evaluateQuizSubmission, verifyOutputMatch } from '../utils/gamification';
import { runPythonCode } from '../python/pyRunner';

interface QuizzesAndAssessmentsViewProps {
  lessons: Lesson[];
  formalAssessments: FormalAssessment[];
  progress: UserProgressState;
  onSaveQuizResult: (result: QuizResultRecord, xpEarned: number) => void;
}

export const QuizzesAndAssessmentsView: React.FC<QuizzesAndAssessmentsViewProps> = ({
  lessons,
  formalAssessments,
  progress,
  onSaveQuizResult,
}) => {
  const isTeacher = progress.mode === 'teacher';
  const [selectedQuizId, setSelectedQuizId] = useState<string>('mid-course');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [teacherRemarks, setTeacherRemarks] = useState<string>('');
  const [codingRunOutputs, setCodingRunOutputs] = useState<Record<string, string>>({});

  const activeFormal = formalAssessments.find((fa) => fa.id === selectedQuizId);
  const activeLesson = lessons.find((l) => `lesson-${l.id}` === selectedQuizId);

  const questions = activeFormal
    ? activeFormal.questions
    : activeLesson
    ? activeLesson.exitQuiz
    : formalAssessments[0].questions;

  const title = activeFormal
    ? activeFormal.title
    : activeLesson
    ? `Class ${activeLesson.id} Exit Quiz: ${activeLesson.title}`
    : 'Assessment';

  const subtitle = activeFormal
    ? activeFormal.subtitle
    : activeLesson
    ? `${activeLesson.exitQuiz.length} Questions • ${activeLesson.subtitle}`
    : '';

  const savedRecord = progress.quizResults[selectedQuizId];

  const handleSelectQuiz = (id: string) => {
    setSelectedQuizId(id);
    const existing = progress.quizResults[id];
    setAnswers(existing?.answers || {});
    setTeacherRemarks(existing?.teacherRemarks || '');
  };

  const handleRunCodingItem = async (qId: string, codeText: string) => {
    const res = await runPythonCode(codeText, []);
    setCodingRunOutputs((prev) => ({
      ...prev,
      [qId]: res.status === 'success' ? res.stdout || '(No output)' : `Error: ${res.stderr}`,
    }));
  };

  const handleSubmit = () => {
    const record = evaluateQuizSubmission(selectedQuizId, questions, answers, 180);
    if (teacherRemarks.trim()) {
      record.teacherRemarks = teacherRemarks.trim();
    }
    const baseXp = activeFormal ? 200 : 80;
    const earned = Math.round((record.percentage / 100) * baseXp);
    onSaveQuizResult(record, earned);
  };

  return (
    <div className="space-y-4">
      {/* Header & Assessment Selector */}
      <div className="p-4 rounded-2xl bg-slate-900/95 border-2 border-slate-700 shadow-[4px_4px_0px_#020617] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
              QUIZZES, CHECKPOINTS & CAPSTONE EXAMS
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              Assessment & Mastery Verification Centre
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleSelectQuiz('mid-course')}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs cursor-pointer border-2 ${
                selectedQuizId === 'mid-course'
                  ? 'bg-amber-400 text-slate-950 border-slate-950'
                  : 'bg-slate-950 text-amber-300 border-amber-500/40'
              }`}
            >
              ★ Mid-Course Checkpoint (15 Qs)
            </button>
            <button
              type="button"
              onClick={() => handleSelectQuiz('final-assessment')}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs cursor-pointer border-2 ${
                selectedQuizId === 'final-assessment'
                  ? 'bg-cyan-400 text-slate-950 border-slate-950'
                  : 'bg-slate-950 text-cyan-300 border-cyan-500/40'
              }`}
            >
              🏆 Final Assessment (25 Qs)
            </button>

            <label htmlFor="quiz-lesson-picker" className="sr-only">
              Select Class Exit Quiz
            </label>
            <select
              id="quiz-lesson-picker"
              aria-label="Select Class Exit Quiz"
              value={selectedQuizId.startsWith('lesson-') ? selectedQuizId : ''}
              onChange={(e) => {
                if (e.target.value) handleSelectQuiz(e.target.value);
              }}
              className="px-3 py-2 rounded-xl bg-slate-950 border-2 border-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
            >
              <option value="">Jump to Class Exit Quiz (1–20)...</option>
              {lessons.map((l) => (
                <option key={l.id} value={`lesson-${l.id}`}>
                  Class {l.id} Exit Quiz: {l.title}{' '}
                  {progress.quizResults[`lesson-${l.id}`]
                    ? `(${progress.quizResults[`lesson-${l.id}`].percentage}%)`
                    : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Active Quiz Paper */}
      <div className="rounded-2xl bg-slate-900/95 border-2 border-slate-700 p-4 sm:p-6 shadow-[4px_4px_0px_#020617] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white">{title}</h2>
            <p className="text-xs text-slate-300 mt-0.5">{subtitle}</p>
          </div>

          {savedRecord && (
            <div className="px-4 py-2 rounded-xl bg-emerald-950/60 border-2 border-emerald-400 text-right">
              <div className="text-sm font-black text-emerald-300">
                Score: {savedRecord.percentage}% ({savedRecord.score}/{savedRecord.maxScore} pts)
              </div>
              <div className="text-[11px] font-mono text-slate-300">
                Mastered: {savedRecord.conceptsMastered.join(', ') || 'In Progress'}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {questions.map((q, idx) => {
            const val = answers[q.id] || '';
            return (
              <div
                key={q.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-300 font-bold">
                    Q{idx + 1} • [{q.type.toUpperCase()}] • {q.conceptTag}
                  </span>
                  <span className="text-amber-300 font-bold">{q.points} pts</span>
                </div>

                <p className="text-sm font-semibold text-white">{q.prompt}</p>

                {q.codeSnippet && (
                  <pre className="p-3 rounded-lg bg-[#050811] border border-slate-800 font-mono text-xs text-cyan-200 overflow-x-auto">
                    {q.codeSnippet}
                  </pre>
                )}

                {q.options && q.options.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                        className={`p-2.5 rounded-xl border text-left text-xs font-mono transition cursor-pointer ${
                          val === opt
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-600'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : q.type === 'coding' ? (
                  <div className="space-y-2">
                    <textarea
                      rows={4}
                      aria-label={`Coding answer for ${q.id}`}
                      value={val}
                      onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                      placeholder="# Write your Python solution here..."
                      className="w-full p-3 rounded-lg bg-[#050811] border border-slate-700 font-mono text-xs text-slate-100"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleRunCodingItem(q.id, val)}
                        className="px-3 py-1 rounded bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer"
                      >
                        ▶ Test Run Code
                      </button>
                      {codingRunOutputs[q.id] && (
                        <span className="text-xs font-mono text-emerald-300">
                          Output: {codingRunOutputs[q.id]}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <input
                    type="text"
                    aria-label={`Answer for ${q.id}`}
                    value={val}
                    onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                    placeholder="Type your answer..."
                    className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs text-slate-100"
                  />
                )}

                {(savedRecord || isTeacher) && (
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs space-y-1">
                    <div className="font-mono text-emerald-300 font-bold">
                      ✓ Correct Answer: <code>{q.correctAnswer}</code>
                    </div>
                    <div className="text-slate-300">{q.explanation}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {isTeacher && (
          <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-1.5">
            <label className="block text-xs font-mono font-bold text-purple-300 uppercase">
              Teacher Assessment Remarks for Hasthaksh:
            </label>
            <textarea
              rows={2}
              value={teacherRemarks}
              onChange={(e) => setTeacherRemarks(e.target.value)}
              placeholder="Add personalised teacher feedback on this assessment..."
              className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100"
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs tracking-wide cursor-pointer shadow-[3px_3px_0px_#020617]"
          >
            ✓ Submit Assessment & Calculate Mastery Score
          </button>
        </div>
      </div>
    </div>
  );
};

interface HomeworkCentreViewProps {
  lessons: Lesson[];
  homeworkTasks: HomeworkTask[];
  progress: UserProgressState;
  onUpdateHomework: (taskId: string, submission: HomeworkSubmission, xpReward?: number) => void;
}

export const HomeworkCentreView: React.FC<HomeworkCentreViewProps> = ({
  lessons,
  homeworkTasks,
  progress,
  onUpdateHomework,
}) => {
  const isTeacher = progress.mode === 'teacher';
  const [lessonFilter, setLessonFilter] = useState<number | 'all'>('all');

  const filteredTasks =
    lessonFilter === 'all'
      ? homeworkTasks
      : homeworkTasks.filter((t) => t.lessonId === lessonFilter);

  const [selectedTaskId, setSelectedTaskId] = useState<string>(homeworkTasks[0]?.id || 'HW-01-1');
  const activeTask =
    filteredTasks.find((t) => t.id === selectedTaskId) ||
    filteredTasks[0] ||
    homeworkTasks[0];

  const existingSub: HomeworkSubmission = progress.homeworkSubmissions[activeTask.id] || {
    taskId: activeTask.id,
    status: 'assigned',
    studentCode: activeTask.starterCode,
    lastOutput: '',
    studentReflection: '',
    teacherFeedback: '',
  };

  const [code, setCode] = useState<string>(existingSub.studentCode || activeTask.starterCode);
  const [inputs, setInputs] = useState<string>(activeTask.sampleInput);
  const [reflection, setReflection] = useState<string>(existingSub.studentReflection || '');
  const [teacherFeedback, setTeacherFeedback] = useState<string>(existingSub.teacherFeedback || '');
  const [verifyMsg, setVerifyMsg] = useState<{ passed: boolean; text: string } | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const handleSelectTask = (task: HomeworkTask) => {
    setSelectedTaskId(task.id);
    const sub = progress.homeworkSubmissions[task.id];
    setCode(sub?.studentCode || task.starterCode);
    setInputs(task.sampleInput);
    setReflection(sub?.studentReflection || '');
    setTeacherFeedback(sub?.teacherFeedback || '');
    setVerifyMsg(null);
    setShowSolution(false);
  };

  const handleSubmitHomework = async () => {
    const inputArr = inputs ? inputs.split('\n') : [];
    const execRes = await runPythonCode(code, inputArr);
    const check = verifyOutputMatch(execRes.stdout, activeTask.expectedOutput);

    const newSub: HomeworkSubmission = {
      taskId: activeTask.id,
      status: check.passed ? 'submitted' : 'assigned',
      studentCode: code,
      lastOutput: execRes.stdout,
      studentReflection: reflection,
      teacherFeedback,
      submittedAt: new Date().toISOString(),
    };

    setVerifyMsg({
      passed: check.passed,
      text: check.passed
        ? `✓ Homework Submitted & Output Verified! +${activeTask.xpReward} XP!`
        : check.feedback,
    });

    onUpdateHomework(activeTask.id, newSub, check.passed ? activeTask.xpReward : 0);
  };

  const handleSaveTeacherReview = () => {
    const newSub: HomeworkSubmission = {
      ...existingSub,
      studentCode: code,
      studentReflection: reflection,
      teacherFeedback,
      status: 'reviewed',
    };
    onUpdateHomework(activeTask.id, newSub, 0);
    setVerifyMsg({
      passed: true,
      text: '✓ Teacher feedback & review status saved.',
    });
  };

  const submittedCount = Object.values(progress.homeworkSubmissions).filter(
    (s) => s.status === 'submitted' || s.status === 'reviewed'
  ).length;

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-slate-900/95 border-2 border-slate-700 shadow-[4px_4px_0px_#020617] flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase">
            60 STRUCTURED HOMEWORK MISSIONS (3 PER CLASS)
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            Hasthaksh&apos;s Homework & Reflection Centre
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            Completed: <strong className="text-emerald-400">{submittedCount}</strong> / 60
          </span>
          <select
            aria-label="Filter Homework by Class"
            value={lessonFilter}
            onChange={(e) =>
              setLessonFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-slate-100"
          >
            <option value="all">All 20 Classes (60 Tasks)</option>
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>
                Class {l.id}: {l.title} (3 Tasks)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Task List */}
        <div className="lg:col-span-4 rounded-2xl bg-slate-900/95 border-2 border-slate-700 p-3 max-h-[650px] overflow-y-auto space-y-1.5 shadow-[4px_4px_0px_#020617]">
          {filteredTasks.map((t) => {
            const sub = progress.homeworkSubmissions[t.id];
            const isDone = sub?.status === 'submitted' || sub?.status === 'reviewed';
            const active = t.id === activeTask.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleSelectTask(t)}
                className={`w-full p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center justify-between gap-2 ${
                  active
                    ? 'bg-amber-400 text-slate-950 border-slate-950 font-bold'
                    : isDone
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-100'
                    : 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div className="min-w-0">
                  <div className="text-[11px] font-mono opacity-85">
                    {t.id} • {t.type}
                  </div>
                  <div className="text-xs font-bold truncate">{t.title}</div>
                </div>
                <span className="text-xs font-mono shrink-0">
                  {isDone ? '✓' : `+${t.xpReward}`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Homework Submission Studio */}
        <div className="lg:col-span-8 rounded-2xl bg-slate-900/95 border-2 border-slate-700 p-4 sm:p-5 space-y-4 shadow-[4px_4px_0px_#020617]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">
              {activeTask.id} • Class {activeTask.lessonId} • {activeTask.type}
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              +{activeTask.xpReward} XP
            </span>
          </div>

          <h2 className="text-lg font-extrabold text-white">{activeTask.title}</h2>
          <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
            {activeTask.instructions}
          </p>

          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300">
            Expected Output: <span className="text-white">{activeTask.expectedOutput}</span>
          </div>

          <PythonEditorPanel
            title={`HOMEWORK EDITOR: ${activeTask.id}`}
            code={code}
            onChange={setCode}
            defaultCode={activeTask.starterCode}
            inputValues={inputs}
            onInputValuesChange={setInputs}
          />

          <div className="space-y-2">
            <label className="block text-xs font-bold text-cyan-300">
              Hasthaksh&apos;s Coding Reflection (What did you learn or customise?):
            </label>
            <textarea
              rows={2}
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Write 1–2 sentences about how your solution works..."
              className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100"
            />
          </div>

          {isTeacher && (
            <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-purple-300 uppercase">
                  Teacher Feedback & Marking Rubric
                </label>
                <button
                  type="button"
                  onClick={() => setShowSolution((s) => !s)}
                  className="text-xs font-mono text-purple-200 underline cursor-pointer"
                >
                  {showSolution ? 'Hide Solution' : '🔑 View Teacher Solution'}
                </button>
              </div>
              <textarea
                rows={2}
                value={teacherFeedback}
                onChange={(e) => setTeacherFeedback(e.target.value)}
                placeholder="Write constructive feedback for Hasthaksh..."
                className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-100"
              />
              <button
                type="button"
                onClick={handleSaveTeacherReview}
                className="px-3 py-1.5 rounded-lg bg-purple-400 text-slate-950 font-bold text-xs cursor-pointer"
              >
                Save Teacher Feedback
              </button>

              {showSolution && (
                <pre className="p-2.5 rounded bg-slate-950 font-mono text-xs text-purple-100 overflow-x-auto">
                  {activeTask.teacherSolution}
                </pre>
              )}
            </div>
          )}

          { existingSub.teacherFeedback && !isTeacher && (
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-400/40 text-xs text-purple-100">
              <strong className="text-purple-300 block mb-0.5">Teacher Feedback:</strong>
              {existingSub.teacherFeedback}
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleSubmitHomework}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer shadow-[2px_2px_0px_#020617]"
            >
              ✓ Submit & Verify Homework (+{activeTask.xpReward} XP)
            </button>
          </div>

          {verifyMsg && (
            <div
              className={`p-3 rounded-xl border text-xs font-mono whitespace-pre-wrap ${
                verifyMsg.passed
                  ? 'bg-emerald-950/60 border-emerald-400 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-400 text-rose-200'
              }`}
            >
              {verifyMsg.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface PrintableWorksheetsViewProps {
  lessons: Lesson[];
  exercises: PracticeExercise[];
  homeworkTasks: HomeworkTask[];
  formalAssessments: FormalAssessment[];
  progress: UserProgressState;
}

export const PrintableWorksheetsView: React.FC<PrintableWorksheetsViewProps> = ({
  lessons,
  exercises,
  homeworkTasks,
  formalAssessments,
  progress,
}) => {
  const isTeacher = progress.mode === 'teacher';
  const [selectedLessonId, setSelectedLessonId] = useState<number>(progress.currentLessonId || 1);
  const [printMode, setPrintMode] = useState<
    'student_worksheet' | 'teacher_solutions' | 'quiz_paper' | 'answer_key'
  >('student_worksheet');

  const lesson = lessons.find((l) => l.id === selectedLessonId) || lessons[0];
  const lessonExercises = exercises.filter((e) => e.lessonId === lesson.id);
  const lessonHw = homeworkTasks.filter((h) => h.lessonId === lesson.id);

  // Prevent Student Mode from viewing teacher solution or answer key modes
  const effectiveMode =
    !isTeacher && (printMode === 'teacher_solutions' || printMode === 'answer_key')
      ? 'student_worksheet'
      : printMode;

  return (
    <div className="space-y-4">
      {/* Control Bar (Hidden when printing via .no-print) */}
      <div className="no-print p-4 rounded-2xl bg-slate-900/95 border-2 border-slate-700 shadow-[4px_4px_0px_#020617] flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
            INK-FRIENDLY A4 PRINTABLE PACKS
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            Printable Worksheets & Teacher Answer Keys
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            aria-label="Select Worksheet Class"
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(Number(e.target.value))}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-slate-100"
          >
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>
                Class {l.id}: {l.title}
              </option>
            ))}
          </select>

          <select
            aria-label="Select Print Format"
            value={effectiveMode}
            onChange={(e) => setPrintMode(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-slate-100"
          >
            <option value="student_worksheet">1. Student Worksheet (No Answers)</option>
            <option value="quiz_paper">2. Lesson Quiz Paper (No Answers)</option>
            {isTeacher && (
              <>
                <option value="teacher_solutions">3. Teacher Solution Sheet (Full Code)</option>
                <option value="answer_key">4. Quiz & Assessment Answer Key</option>
              </>
            )}
          </select>

          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs cursor-pointer shadow-[2px_2px_0px_#020617]"
          >
            🖨 Print / Save A4 PDF
          </button>
        </div>
      </div>

      {/* Printable A4 Sheet Preview */}
      <div className="print-sheet bg-white text-slate-950 rounded-2xl border-2 border-slate-300 p-6 sm:p-8 shadow-xl max-w-4xl mx-auto space-y-6">
        {/* Sheet Header */}
        <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600">
              HASTHAKSH&apos;S PYTHON QUEST • GRADE 5 COMPUTING CURRICULUM
            </div>
            <h2 className="text-2xl font-black text-slate-950 mt-1">
              Class {lesson.id}: {lesson.title} — {lesson.subtitle}
            </h2>
            <div className="text-xs font-mono text-slate-600 mt-1">
              Standards: England KS2 Computing & CSTA {lesson.standards.cstaOutcomeCode} ({lesson.standards.cstaDomain})
            </div>
          </div>
          <div className="text-right text-xs font-mono border border-slate-400 p-2.5 rounded">
            <div>Student: <strong>Hasthaksh</strong></div>
            <div>Date: ________________</div>
            <div>Mode: <strong>{effectiveMode.replace('_', ' ').toUpperCase()}</strong></div>
          </div>
        </div>

        {/* MODE 1: STUDENT WORKSHEET */}
        {effectiveMode === 'student_worksheet' && (
          <div className="space-y-6 text-sm">
            <section className="space-y-2">
              <h3 className="font-black text-base uppercase border-b border-slate-300 pb-1">
                Part 1: Core Concept Summary
              </h3>
              {lesson.theoryBlocks.map((tb) => (
                <div key={tb.id} className="p-3 rounded border border-slate-300 space-y-1">
                  <div className="font-bold">{tb.title}</div>
                  <p className="text-xs text-slate-700">{tb.simpleExplanation}</p>
                  <pre className="p-2 bg-slate-100 rounded font-mono text-xs">{tb.pythonSyntax}</pre>
                </div>
              ))}
            </section>

            <section className="space-y-2">
              <h3 className="font-black text-base uppercase border-b border-slate-300 pb-1">
                Part 2: Predict the Output (Write what Python prints)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lesson.predictChallenges.map((pc) => (
                  <div key={pc.id} className="p-3 rounded border border-slate-300 space-y-2">
                    <div className="font-bold text-xs">{pc.title}</div>
                    <pre className="p-2 bg-slate-100 rounded font-mono text-xs">{pc.code}</pre>
                    <div className="text-xs text-slate-600">
                      Predicted Output: ________________________________________
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="font-black text-base uppercase border-b border-slate-300 pb-1">
                Part 3: Coding Practice Tasks
              </h3>
              {lessonExercises.slice(0, 6).map((ex) => (
                <div key={ex.id} className="p-3 rounded border border-slate-300 space-y-1.5">
                  <div className="font-bold text-xs">
                    {ex.id} ({ex.difficulty}): {ex.title}
                  </div>
                  <p className="text-xs text-slate-700">{ex.instructions}</p>
                  <div className="h-16 border border-dashed border-slate-400 rounded p-2 text-xs text-slate-400 font-mono">
                    # Write your Python code here:
                  </div>
                </div>
              ))}
            </section>

            <section className="space-y-2">
              <h3 className="font-black text-base uppercase border-b border-slate-300 pb-1">
                Part 4: Homework & Reflection
              </h3>
              {lessonHw.map((hw) => (
                <div key={hw.id} className="p-2.5 rounded border border-slate-300 text-xs">
                  <strong>{hw.id} ({hw.type}):</strong> {hw.instructions}
                </div>
              ))}
            </section>
          </div>
        )}

        {/* MODE 2: QUIZ PAPER */}
        {effectiveMode === 'quiz_paper' && (
          <div className="space-y-4 text-sm">
            <h3 className="font-black text-base uppercase border-b border-slate-300 pb-1">
              Class {lesson.id} Exit Quiz Paper
            </h3>
            {lesson.exitQuiz.map((q, i) => (
              <div key={q.id} className="p-3 rounded border border-slate-300 space-y-2">
                <div className="font-bold text-xs">
                  Q{i + 1} ({q.points} pts): {q.prompt}
                </div>
                {q.codeSnippet && (
                  <pre className="p-2 bg-slate-100 rounded font-mono text-xs">{q.codeSnippet}</pre>
                )}
                {q.options ? (
                  <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx}>[ ] {opt}</div>
                    ))}
                  </div>
                ) : (
                  <div className="h-10 border-b border-dashed border-slate-400" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* MODE 3: TEACHER SOLUTION SHEET */}
        {effectiveMode === 'teacher_solutions' && isTeacher && (
          <div className="space-y-4 text-xs">
            <h3 className="font-black text-base uppercase border-b border-slate-300 pb-1">
              Teacher Complete Solution Sheet — Class {lesson.id} (All 12 Exercises)
            </h3>
            {lessonExercises.map((ex) => (
              <div key={ex.id} className="p-3 rounded border border-slate-300 space-y-1">
                <div className="font-bold">
                  {ex.id}: {ex.title} ({ex.category.toUpperCase()}) — Expected: {ex.expectedOutput}
                </div>
                <pre className="p-2 bg-slate-100 rounded font-mono">{ex.teacherSolution}</pre>
                <div className="text-slate-600">Explanation: {ex.explanation}</div>
              </div>
            ))}
          </div>
        )}

        {/* MODE 4: ANSWER KEY */}
        {effectiveMode === 'answer_key' && isTeacher && (
          <div className="space-y-4 text-xs">
            <h3 className="font-black text-base uppercase border-b border-slate-300 pb-1">
              Class {lesson.id} Exit Quiz & Debugging Answer Key
            </h3>
            {lesson.exitQuiz.map((q, i) => (
              <div key={q.id} className="p-3 rounded border border-slate-300 space-y-1">
                <div className="font-bold">
                  Q{i + 1}: {q.prompt}
                </div>
                <div className="font-mono text-emerald-800 font-bold">
                  Correct Answer: {q.correctAnswer} ({q.points} pts)
                </div>
                <div className="text-slate-600">{q.explanation}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
