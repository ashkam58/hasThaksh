import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  MainSectionId,
  UserProgressState,
  QuizResultRecord,
  HomeworkSubmission,
  MajorProject,
} from './types/quest';
import {
  ALL_LESSONS,
  ALL_EXERCISES,
  ALL_HOMEWORK,
  MAJOR_PROJECTS,
  FORMAL_ASSESSMENTS,
} from './data/curriculum';
import {
  loadProgressState,
  saveProgressState,
  createDefaultProgressState,
  getLevelInfo,
  computeUnlockedBadges,
  determineMasteryStatus,
} from './utils/gamification';
import { Py9RobotAvatar } from './components/ComicArtwork';
import { LessonStudioView } from './components/LessonStudioView';
import { PracticeArenaView, MajorProjectsStudioView } from './components/ProjectsAndArenaViews';
import {
  QuizzesAndAssessmentsView,
  HomeworkCentreView,
  PrintableWorksheetsView,
} from './components/QuizzesHomeworkWorksheetsViews';
import {
  HomeMissionControlView,
  RoadmapAndStandardsView,
  PlaygroundView,
  ClassActivitiesHubView,
  ProgressAndAchievementsView,
  TeacherControlCentreView,
} from './components/DashboardAndTeacherViews';

const NAV_ITEMS: { id: MainSectionId; label: string; badge?: string }[] = [
  { id: 'home', label: '1. Mission Control' },
  { id: 'roadmap', label: '2. 20-Class Roadmap' },
  { id: 'studio', label: '3. Lesson Studio', badge: 'LIVE' },
  { id: 'playground', label: '4. Python Playground' },
  { id: 'arena', label: '5. Practice Arena', badge: '240' },
  { id: 'quizzes', label: '6. Quizzes & Exams' },
  { id: 'activities', label: '7. Class Activities', badge: '20' },
  { id: 'projects', label: '8. Major Projects', badge: '3' },
  { id: 'homework', label: '9. Homework Centre', badge: '60' },
  { id: 'progress', label: '10. Progress & Ranks' },
  { id: 'worksheets', label: '11. Print Worksheets' },
  { id: 'teacher', label: '12. Teacher Control' },
];

export function App() {
  const [progress, setProgress] = useState<UserProgressState>(() => loadProgressState());
  const [activeSection, setActiveSection] = useState<MainSectionId>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') return 'studio';
    }
    return 'home';
  });

  const [arenaLessonFilter, setArenaLessonFilter] = useState<number | 'all'>('all');
  const [activeProjectId, setActiveProjectId] = useState<MajorProject['id']>('quiz-master');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const mainContentRef = useRef<HTMLDivElement | null>(null);

  // Persist to LocalStorage whenever progress changes
  useEffect(() => {
    saveProgressState(progress);
  }, [progress]);

  // Subtle GSAP transition on section change (unless reducedMotion is enabled)
  useEffect(() => {
    if (progress.reducedMotion || !mainContentRef.current) return;
    gsap.fromTo(
      mainContentRef.current,
      { opacity: 0.75, y: 8 },
      { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out', clearProps: 'transform' }
    );
  }, [activeSection, progress.reducedMotion]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const updateStateWithBadges = (updater: (prev: UserProgressState) => UserProgressState) => {
    setProgress((prev) => {
      const next = updater(prev);
      const updatedBadges = computeUnlockedBadges(next, ALL_EXERCISES);
      return {
        ...next,
        unlockedBadges: updatedBadges,
      };
    });
  };

  const handleToggleMode = () => {
    const nextMode = progress.mode === 'teacher' ? 'student' : 'teacher';
    updateStateWithBadges((prev) => ({
      ...prev,
      mode: nextMode,
    }));
    showToast(
      nextMode === 'teacher'
        ? '🔑 Switched to Teacher Mode: Full solutions & answer keys enabled.'
        : '🛡 Switched to Student Mode: Teacher solutions & answer keys hidden.'
    );
  };

  const handleOpenLessonInStudio = (lessonId: number) => {
    updateStateWithBadges((prev) => ({
      ...prev,
      currentLessonId: lessonId,
    }));
    setActiveSection('studio');
  };

  const handleCompleteLesson = (lessonId: number) => {
    updateStateWithBadges((prev) => {
      const alreadyDone = prev.completedLessons.includes(lessonId);
      const completedLessons = alreadyDone
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId];
      return {
        ...prev,
        completedLessons,
        xp: alreadyDone ? prev.xp : prev.xp + 100,
      };
    });
    showToast(`🎉 Class ${lessonId} marked complete! +100 XP awarded!`);
  };

  const handleCompleteDiagnostic = (passedAll: boolean) => {
    updateStateWithBadges((prev) => ({
      ...prev,
      diagnosticCompleted: true,
      extensionUnlocked: passedAll || prev.extensionUnlocked,
      xp: prev.diagnosticCompleted ? prev.xp : prev.xp + 50,
    }));
  };

  const handleRecordExerciseAttempt = (
    exerciseId: string,
    solved: boolean,
    code: string,
    hintsUsed: number,
    solutionViewed: boolean,
    xpReward: number
  ) => {
    updateStateWithBadges((prev) => {
      const existing = prev.exerciseRecords[exerciseId];
      const alreadySolved = Boolean(existing?.solved);
      const mastery = solved
        ? determineMasteryStatus(hintsUsed, solutionViewed)
        : existing?.mastery || 'not_yet';

      return {
        ...prev,
        xp: solved && !alreadySolved ? prev.xp + xpReward : prev.xp,
        exerciseRecords: {
          ...prev.exerciseRecords,
          [exerciseId]: {
            exerciseId,
            attempts: (existing?.attempts || 0) + 1,
            solved: solved || alreadySolved,
            mastery,
            hintsUsed: Math.max(existing?.hintsUsed || 0, hintsUsed),
            solutionViewed: Boolean(existing?.solutionViewed || solutionViewed),
            lastCode: code,
            solvedAt: solved ? new Date().toISOString() : existing?.solvedAt,
          },
        },
      };
    });
  };

  const handleCompleteActivity = (lessonId: number) => {
    updateStateWithBadges((prev) => {
      const already = prev.completedActivities.includes(lessonId);
      return {
        ...prev,
        completedActivities: already
          ? prev.completedActivities
          : [...prev.completedActivities, lessonId],
        xp: already ? prev.xp : prev.xp + 50,
      };
    });
    showToast(`⚡ Class ${lessonId} Live Activity completed! +50 XP!`);
  };

  const handleSaveQuizResult = (result: QuizResultRecord, xpEarned: number) => {
    updateStateWithBadges((prev) => {
      const hadBefore = Boolean(prev.quizResults[result.quizId]);
      return {
        ...prev,
        xp: hadBefore ? prev.xp : prev.xp + xpEarned,
        quizResults: {
          ...prev.quizResults,
          [result.quizId]: result,
        },
      };
    });
    showToast(`🏆 Assessment scored: ${result.percentage}%!`);
  };

  const handleUpdateHomework = (
    taskId: string,
    submission: HomeworkSubmission,
    xpReward = 0
  ) => {
    updateStateWithBadges((prev) => {
      const wasSubmitted =
        prev.homeworkSubmissions[taskId]?.status === 'submitted' ||
        prev.homeworkSubmissions[taskId]?.status === 'reviewed';
      return {
        ...prev,
        xp: !wasSubmitted && xpReward > 0 ? prev.xp + xpReward : prev.xp,
        homeworkSubmissions: {
          ...prev.homeworkSubmissions,
          [taskId]: submission,
        },
      };
    });
  };

  const handleUpdateProjectProgress = (
    projectId: MajorProject['id'],
    updates: Partial<UserProgressState['projectProgress'][string]>,
    xpReward = 0
  ) => {
    updateStateWithBadges((prev) => {
      const curr = prev.projectProgress[projectId] || {
        code: '',
        completedMilestones: [],
        checkedAcceptance: [],
        checkedPresentation: [],
        completed: false,
      };
      const wasDone = curr.completed;
      const nextCompleted = updates.completed ?? curr.completed;
      return {
        ...prev,
        xp: !wasDone && nextCompleted && xpReward > 0 ? prev.xp + xpReward : prev.xp,
        projectProgress: {
          ...prev.projectProgress,
          [projectId]: {
            ...curr,
            ...updates,
          },
        },
      };
    });
  };

  const handleUpdateTeacherNote = (lessonId: number, note: string) => {
    setProgress((prev) => ({
      ...prev,
      teacherNotes: {
        ...prev.teacherNotes,
        [lessonId]: note,
      },
    }));
  };

  const levelInfo = getLevelInfo(progress.xp);

  return (
    <div
      data-state={activeSection}
      className="min-h-screen bg-[#FAF5E8] text-slate-900 flex flex-col selection:bg-sky-300 selection:text-slate-950"
    >
      {/* Compact Global Top Bar */}
      <header className="no-print sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur border-b-2 border-[#0F172A] px-3 sm:px-5 py-2 shadow-sm">
        <div className="max-w-[1640px] mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Brand Identity */}
          <div className="flex items-center gap-2.5">
            <Py9RobotAvatar mood="ready" size="sm" />
            <div className="flex items-center gap-2">
              <span className="font-black text-base sm:text-lg tracking-tight text-[#0F172A]">
                HASTHAKSH&apos;S PYTHON QUEST
              </span>
              <span className="hidden xl:inline-flex comic-badge bg-[#FBBF24] text-[#0F172A] font-mono text-[10px] font-black">
                GRADE 5
              </span>
            </div>
          </div>

          {/* Right HUD: Quick Class 1 Launch, XP & Teacher/Student Mode Switch */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleOpenLessonInStudio(1)}
              className="px-3 py-1 rounded-lg bg-[#FBBF24] hover:bg-[#F59E0B] text-[#0F172A] border-2 border-[#0F172A] font-black text-xs cursor-pointer"
            >
              ⚡ Class 1 Studio
            </button>

            <div className="px-2.5 py-1 rounded-lg bg-[#FFFFFF] border-2 border-[#0F172A] flex items-center gap-2 text-xs font-mono">
              <span className="text-[#B45309] font-black">⚡ {progress.xp} XP</span>
              <span className="text-slate-300">|</span>
              <span className="text-[#0369A1] font-bold">
                Lv.{levelInfo.current.level} {levelInfo.current.title}
              </span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="hidden sm:inline text-[#C2410C] font-bold">
                🔥 {progress.streakDays}d
              </span>
            </div>

            <button
              type="button"
              onClick={handleToggleMode}
              aria-label={`Switch mode, currently ${progress.mode} mode`}
              className={`px-3 py-1 rounded-lg font-mono text-xs font-black border-2 border-[#0F172A] cursor-pointer ${
                progress.mode === 'teacher'
                  ? 'bg-[#E9D5FF] text-[#0F172A]'
                  : 'bg-[#D1FAE5] text-[#0F172A]'
              }`}
            >
              {progress.mode === 'teacher' ? '👩‍🏫 TEACHER MODE' : '🧑‍🚀 STUDENT MODE'}
            </button>
          </div>
        </div>

        {/* Single-Line Compact 12-Section Navigation Strip */}
        <nav
          aria-label="Main platform navigation"
          className="max-w-[1640px] mx-auto mt-1.5 pt-1.5 border-t border-[#E2E8F0] flex items-center gap-1.5 overflow-x-auto no-scrollbar"
        >
          {NAV_ITEMS.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold whitespace-nowrap transition cursor-pointer flex items-center gap-1 ${
                  active
                    ? 'bg-[#38BDF8] text-[#0F172A] border-2 border-[#0F172A] shadow-[2px_2px_0px_#0F172A]'
                    : 'bg-[#FFFFFF] hover:bg-[#F1F5F9] text-[#334155] border border-[#CBD5E1]'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`px-1 py-0.2 rounded text-[10px] font-mono font-black ${
                      active ? 'bg-[#0F172A] text-[#38BDF8]' : 'bg-[#FEF3C7] text-[#B45309]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Toast Feedback Banner */}
      {toastMessage && (
        <div
          role="status"
          className="no-print fixed bottom-5 right-5 z-50 px-5 py-3 rounded-2xl bg-[#FFFDF7] border-3 border-[#0F172A] text-[#0F172A] text-sm font-mono font-bold shadow-[4px_4px_0px_#0F172A]"
        >
          {toastMessage}
        </div>
      )}

      {/* Main Content Workspace */}
      <main
        ref={mainContentRef}
        className="flex-1 w-full max-w-[1640px] mx-auto px-3 sm:px-6 py-3 sm:py-5"
      >
        {activeSection === 'home' && (
          <HomeMissionControlView
            lessons={ALL_LESSONS}
            exercises={ALL_EXERCISES}
            homeworkTasks={ALL_HOMEWORK}
            projects={MAJOR_PROJECTS}
            progress={progress}
            onNavigate={setActiveSection}
            onOpenLesson={handleOpenLessonInStudio}
            onOpenProject={(projId) => {
              setActiveProjectId(projId);
              setActiveSection('projects');
            }}
          />
        )}

        {activeSection === 'roadmap' && (
          <RoadmapAndStandardsView
            lessons={ALL_LESSONS}
            progress={progress}
            onOpenLesson={handleOpenLessonInStudio}
          />
        )}

        {activeSection === 'studio' && (
          <LessonStudioView
            lessons={ALL_LESSONS}
            exercises={ALL_EXERCISES}
            progress={progress}
            onSelectLesson={(id) =>
              updateStateWithBadges((prev) => ({ ...prev, currentLessonId: id }))
            }
            onCompleteLesson={handleCompleteLesson}
            onCompleteDiagnostic={handleCompleteDiagnostic}
            onRecordExerciseAttempt={handleRecordExerciseAttempt}
            onCompleteActivity={handleCompleteActivity}
            onSaveQuizResult={handleSaveQuizResult}
            onUpdateTeacherNote={handleUpdateTeacherNote}
            onOpenArenaForLesson={(lessonId) => {
              setArenaLessonFilter(lessonId);
              setActiveSection('arena');
            }}
          />
        )}

        {activeSection === 'playground' && <PlaygroundView progress={progress} />}

        {activeSection === 'arena' && (
          <PracticeArenaView
            lessons={ALL_LESSONS}
            exercises={ALL_EXERCISES}
            progress={progress}
            initialLessonFilter={arenaLessonFilter}
            onRecordExerciseAttempt={handleRecordExerciseAttempt}
          />
        )}

        {activeSection === 'quizzes' && (
          <QuizzesAndAssessmentsView
            lessons={ALL_LESSONS}
            formalAssessments={FORMAL_ASSESSMENTS}
            progress={progress}
            onSaveQuizResult={handleSaveQuizResult}
          />
        )}

        {activeSection === 'activities' && (
          <ClassActivitiesHubView
            lessons={ALL_LESSONS}
            progress={progress}
            onCompleteActivity={handleCompleteActivity}
          />
        )}

        {activeSection === 'projects' && (
          <MajorProjectsStudioView
            projects={MAJOR_PROJECTS}
            progress={progress}
            initialProjectId={activeProjectId}
            onUpdateProjectProgress={handleUpdateProjectProgress}
          />
        )}

        {activeSection === 'homework' && (
          <HomeworkCentreView
            lessons={ALL_LESSONS}
            homeworkTasks={ALL_HOMEWORK}
            progress={progress}
            onUpdateHomework={handleUpdateHomework}
          />
        )}

        {activeSection === 'progress' && (
          <ProgressAndAchievementsView
            lessons={ALL_LESSONS}
            exercises={ALL_EXERCISES}
            progress={progress}
          />
        )}

        {activeSection === 'worksheets' && (
          <PrintableWorksheetsView
            lessons={ALL_LESSONS}
            exercises={ALL_EXERCISES}
            homeworkTasks={ALL_HOMEWORK}
            formalAssessments={FORMAL_ASSESSMENTS}
            progress={progress}
          />
        )}

        {activeSection === 'teacher' && (
          <TeacherControlCentreView
            lessons={ALL_LESSONS}
            progress={progress}
            onToggleMode={handleToggleMode}
            onUpdateDuration={(mins) =>
              setProgress((prev) => ({ ...prev, lessonDurationMinutes: mins }))
            }
            onToggleReducedMotion={() =>
              setProgress((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }))
            }
            onCompleteLesson={handleCompleteLesson}
            onUpdateTeacherNote={handleUpdateTeacherNote}
            onImportProgress={(imported) => {
              setProgress(imported);
              showToast('✓ Imported student progress JSON!');
            }}
            onResetProgress={() => {
              const fresh = createDefaultProgressState();
              setProgress(fresh);
              showToast('↺ Progress reset to initial state.');
            }}
          />
        )}
      </main>
    </div>
  );
}

export default App;
