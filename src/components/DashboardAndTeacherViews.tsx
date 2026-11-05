import React, { useState } from 'react';
import {
  Lesson,
  PracticeExercise,
  HomeworkTask,
  MajorProject,
  UserProgressState,
  MainSectionId,
} from '../types/quest';
import {
  LEVEL_DEFINITIONS,
  BADGE_DEFINITIONS,
  getLevelInfo,
} from '../utils/gamification';
import { STANDARDS_FRAMEWORK_OVERVIEW } from '../data/curriculum';
import { Py9RobotAvatar, PythonCanvasVisualizer } from './ComicArtwork';
import { PythonEditorPanel } from './PythonEditorPanel';

interface HomeMissionControlViewProps {
  lessons: Lesson[];
  exercises: PracticeExercise[];
  homeworkTasks: HomeworkTask[];
  projects: MajorProject[];
  progress: UserProgressState;
  onNavigate: (section: MainSectionId) => void;
  onOpenLesson: (lessonId: number) => void;
  onOpenProject: (projectId: MajorProject['id']) => void;
}

export const HomeMissionControlView: React.FC<HomeMissionControlViewProps> = ({
  lessons,
  exercises,
  homeworkTasks,
  projects,
  progress,
  onNavigate,
  onOpenLesson,
  onOpenProject,
}) => {
  const levelInfo = getLevelInfo(progress.xp);
  const currentLesson =
    lessons.find((l) => l.id === progress.currentLessonId) || lessons[0];
  const nextLesson =
    lessons.find((l) => !progress.completedLessons.includes(l.id)) || currentLesson;
  const solvedExercises = Object.values(progress.exerciseRecords).filter((r) => r.solved).length;
  const pendingHw =
    homeworkTasks.find(
      (h) =>
        h.lessonId === currentLesson.id &&
        progress.homeworkSubmissions[h.id]?.status !== 'submitted'
    ) || homeworkTasks[0];

  const classOne = lessons[0];

  return (
    <div className="space-y-8">
      {/* Cinematic Comic Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-[#0F1E3A] to-slate-950 comic-panel-cyan comic-halftone-bg p-6 sm:p-10 overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="comic-badge bg-amber-400 text-slate-950 font-mono text-xs sm:text-sm font-black">
                ⚡ GRADE 5 LIVE 1-ON-1 PYTHON QUEST
              </span>
              <span className="comic-badge bg-cyan-400 text-slate-950 font-mono text-xs sm:text-sm font-black">
                HERO: {progress.studentName.toUpperCase()}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
              HASTHAKSH: THE PYTHON CODING ADVENTURE
            </h1>

            <p className="text-lg sm:text-xl text-cyan-200 font-semibold max-w-2xl leading-relaxed">
              Think like a programmer. Build like an inventor. Code your own universe.
            </p>

            <p className="text-sm sm:text-base font-mono text-amber-300 italic">
              &ldquo;Every great programmer starts with a question. What will you build today?&rdquo;
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onOpenLesson(1)}
                className="px-6 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base sm:text-lg tracking-wide cursor-pointer comic-btn"
              >
                🚀 Launch Class 1 Live Studio (Ready!)
              </button>

              <button
                type="button"
                onClick={() => onOpenLesson(nextLesson.id)}
                className="px-5 py-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-base cursor-pointer comic-btn"
              >
                ▶ Continue Class {nextLesson.id}: {nextLesson.title}
              </button>

              <button
                type="button"
                onClick={() => onNavigate('playground')}
                className="px-5 py-4 rounded-xl bg-slate-950 hover:bg-slate-800 border-2 border-slate-600 text-slate-100 font-bold text-base transition cursor-pointer"
              >
                💻 Open Python Playground
              </button>
            </div>
          </div>

          {/* Right Hero Card: PY-9 & Current Rank */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-950/95 comic-panel-amber space-y-4">
            <div className="flex items-center gap-4">
              <Py9RobotAvatar mood="happy" size="lg" />
              <div>
                <div className="text-xs sm:text-sm font-mono text-cyan-400 font-black uppercase">
                  LEVEL {levelInfo.current.level} HERO RANK
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">{levelInfo.current.title}</div>
                <div className="text-sm font-mono text-amber-300 font-bold mt-0.5">
                  ⚡ {progress.xp} XP • 🔥 {progress.streakDays}-Day Streak
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm font-mono font-bold text-slate-200">
                <span>Level Progress</span>
                <span>{levelInfo.progressPercent}%</span>
              </div>
              <div className="w-full h-3.5 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-amber-400"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
              <div className="text-xs sm:text-sm font-mono text-slate-300">
                Perk: <span className="text-cyan-300 font-semibold">{levelInfo.current.perk}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DEDICATED CLASS 01 READY-TO-TEACH SPOTLIGHT PANEL */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-cyan-500/15 comic-panel-amber space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="comic-badge bg-emerald-400 text-slate-950 font-mono text-xs sm:text-sm font-black">
                ★ CLASS 01 READY FOR TODAY&apos;S SESSION
              </span>
              <span className="comic-badge bg-amber-400 text-slate-950 font-mono text-xs sm:text-sm font-black">
                60 MINUTES • INTERMEDIATE FOUNDATIONS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              Class 1 — {classOne.title}: <span className="text-cyan-300">{classOne.subtitle}</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onOpenLesson(1)}
            className="px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-base sm:text-lg comic-btn cursor-pointer"
          >
            ⚡ Enter Class 1 Teaching Studio →
          </button>
        </div>

        <p className="text-base sm:text-lg text-slate-100 leading-relaxed max-w-5xl">
          {classOne.storyIntro}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border-2 border-cyan-400/60 space-y-1">
            <div className="text-xs font-mono font-black text-cyan-300 uppercase">3 BIG CONCEPT CARDS</div>
            <div className="text-base font-extrabold text-white">Variables, input() &amp; // % **</div>
            <p className="text-sm text-slate-300">Large visual cheat-sheets + working Python examples.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border-2 border-amber-400/60 space-y-1">
            <div className="text-xs font-mono font-black text-amber-300 uppercase">TURBO DIAGNOSTIC</div>
            <div className="text-base font-extrabold text-white">3 Prior-Knowledge Checks</div>
            <p className="text-sm text-slate-300">Unlocks accelerated Boss Challenges (+50 XP).</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border-2 border-emerald-400/60 space-y-1">
            <div className="text-xs font-mono font-black text-emerald-300 uppercase">LIVE CLASS ACTIVITY</div>
            <div className="text-base font-extrabold text-white">Superhero Identity Card</div>
            <p className="text-sm text-slate-300">5 live inputs + combat rating formula builder.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border-2 border-purple-400/60 space-y-1">
            <div className="text-xs font-mono font-black text-purple-300 uppercase">12 PRACTICE DRILLS</div>
            <div className="text-base font-extrabold text-white">Warm-Up to Boss Level</div>
            <p className="text-sm text-slate-300">Auto-verified output + 3-tier progressive hints.</p>
          </div>
        </div>
      </div>

      {/* Key Mission Telemetry Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/95 comic-panel space-y-1">
          <div className="text-xs font-mono font-bold text-slate-300 uppercase">Current Class</div>
          <div className="text-xl font-black text-cyan-300">
            Class {currentLesson.id}: {currentLesson.title}
          </div>
          <div className="text-xs sm:text-sm text-slate-300 truncate">{currentLesson.subtitle}</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/95 comic-panel space-y-1">
          <div className="text-xs font-mono font-bold text-slate-300 uppercase">Total XP</div>
          <div className="text-2xl font-black text-amber-400">{progress.xp} XP</div>
          <div className="text-xs sm:text-sm text-slate-300">Lv.{levelInfo.current.level} {levelInfo.current.title}</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/95 comic-panel space-y-1">
          <div className="text-xs font-mono font-bold text-slate-300 uppercase">Completed Classes</div>
          <div className="text-2xl font-black text-emerald-400">
            {progress.completedLessons.length} / 20
          </div>
          <div className="text-xs sm:text-sm text-slate-300">60-Min Live Sessions</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/95 comic-panel space-y-1">
          <div className="text-xs font-mono font-bold text-slate-300 uppercase">Arena Drills</div>
          <div className="text-2xl font-black text-purple-300">
            {solvedExercises} / 240
          </div>
          <div className="text-xs sm:text-sm text-slate-300">12 per Class</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/95 comic-panel space-y-1">
          <div className="text-xs font-mono font-bold text-slate-300 uppercase">Coding Streak</div>
          <div className="text-2xl font-black text-orange-400">
            🔥 {progress.streakDays} Days
          </div>
          <div className="text-xs sm:text-sm text-slate-300">Consistent Builder</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/95 comic-panel space-y-1">
          <div className="text-xs font-mono font-bold text-slate-300 uppercase">Badges Earned</div>
          <div className="text-2xl font-black text-cyan-300">
            🏅 {progress.unlockedBadges.length} / {BADGE_DEFINITIONS.length}
          </div>
          <div className="text-xs sm:text-sm text-slate-300">Achievement Vault</div>
        </div>
      </div>

      {/* Next Mission, Assigned Homework & Course Progress Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-slate-900/95 comic-panel space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide">
              🗺 20-Class Curriculum Progress Map
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('roadmap')}
              className="text-sm font-mono font-bold text-cyan-300 underline cursor-pointer"
            >
              Full Standards Roadmap →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-5 gap-3">
            {lessons.map((l) => {
              const done = progress.completedLessons.includes(l.id);
              const isCurrent = l.id === progress.currentLessonId;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => onOpenLesson(l.id)}
                  className={`p-3.5 rounded-xl border-2 text-left transition cursor-pointer comic-btn ${
                    isCurrent
                      ? 'bg-cyan-400 text-slate-950 border-slate-950 font-black'
                      : done
                      ? 'bg-emerald-950/60 border-emerald-400 text-emerald-300 font-bold'
                      : 'bg-slate-950 border-slate-700 text-slate-200 hover:border-cyan-400 font-bold'
                  }`}
                >
                  <div className="text-xs font-mono font-black">
                    CLASS {String(l.id).padStart(2, '0')} {done ? '✓' : ''}
                  </div>
                  <div className="text-sm font-extrabold truncate mt-1">{l.title}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Quick Action Cards: Next Mission & Assigned Homework */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-slate-900/95 comic-panel-cyan space-y-3">
            <div className="text-xs sm:text-sm font-mono font-black text-cyan-300 uppercase">
              🎯 Next Live Mission
            </div>
            <h3 className="text-xl font-black text-white">
              Class {nextLesson.id}: {nextLesson.title} ({nextLesson.subtitle})
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed line-clamp-3">
              {nextLesson.storyIntro}
            </p>
            <button
              type="button"
              onClick={() => onOpenLesson(nextLesson.id)}
              className="px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-black text-sm sm:text-base comic-btn cursor-pointer"
            >
              Launch Class {nextLesson.id} Studio →
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/95 comic-panel-amber space-y-3">
            <div className="text-xs sm:text-sm font-mono font-black text-amber-300 uppercase">
              📚 Assigned Homework Mission
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              {pendingHw.id}: {pendingHw.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed line-clamp-2">
              {pendingHw.instructions}
            </p>
            <button
              type="button"
              onClick={() => onNavigate('homework')}
              className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-sm sm:text-base comic-btn cursor-pointer"
            >
              Open Homework Centre →
            </button>
          </div>
        </div>
      </div>

      {/* 3 Featured Capstone Project Cards */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            🏆 Featured Major Projects (Phase 5 Capstone Studio)
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="text-sm sm:text-base font-mono font-bold text-amber-300 underline cursor-pointer"
          >
            Open Project Studio →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj, idx) => {
            const isDone = progress.projectProgress[proj.id]?.completed;
            return (
              <div
                key={proj.id}
                className="p-6 rounded-2xl bg-slate-900/95 comic-panel hover:border-cyan-400 transition flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="comic-badge bg-amber-400 text-slate-950 font-mono text-xs font-black">
                      PROJECT {idx + 1} • CLASS {proj.classNumber}
                    </span>
                    <span className="font-mono text-sm text-emerald-400 font-black">
                      {isDone ? '✓ Completed' : `+${proj.xpReward} XP`}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">{proj.title}</h3>
                  <p className="text-sm sm:text-base font-bold text-cyan-300">{proj.subtitle}</p>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">{proj.missionBrief}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenProject(proj.id)}
                  className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-sm sm:text-base cursor-pointer comic-btn"
                >
                  Build {proj.title} →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface RoadmapAndStandardsViewProps {
  lessons: Lesson[];
  progress: UserProgressState;
  onOpenLesson: (lessonId: number) => void;
}

export const RoadmapAndStandardsView: React.FC<RoadmapAndStandardsViewProps> = ({
  lessons,
  progress,
  onOpenLesson,
}) => {
  const [tab, setTab] = useState<'roadmap' | 'standards'>('roadmap');

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-slate-900/95 comic-panel-cyan flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="comic-badge bg-amber-400 text-slate-950 text-xs sm:text-sm font-mono font-black uppercase">
            20-CLASS ACCELERATED GRADE 5 SYLLABUS &amp; STANDARDS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Learning Roadmap &amp; Standards Alignment
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTab('roadmap')}
            className={`px-5 py-2.5 rounded-xl font-black text-sm cursor-pointer comic-btn ${
              tab === 'roadmap'
                ? 'bg-cyan-400 text-slate-950'
                : 'bg-slate-950 text-slate-200 border-2 border-slate-700'
            }`}
          >
            🗺 20-Class Roadmap
          </button>
          <button
            type="button"
            onClick={() => setTab('standards')}
            className={`px-5 py-2.5 rounded-xl font-black text-sm cursor-pointer comic-btn ${
              tab === 'standards'
                ? 'bg-amber-400 text-slate-950'
                : 'bg-slate-950 text-slate-200 border-2 border-slate-700'
            }`}
          >
            📋 England KS2 &amp; CSTA 2026 Alignment
          </button>
        </div>
      </div>

      {tab === 'roadmap' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lessons.map((l) => {
            const done = progress.completedLessons.includes(l.id);
            const quizRes = progress.quizResults[`lesson-${l.id}`];
            return (
              <div
                key={l.id}
                className="p-6 rounded-2xl bg-slate-900/95 comic-panel flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="comic-badge bg-cyan-400 text-slate-950 font-mono text-xs font-black">
                      CLASS {String(l.id).padStart(2, '0')} • {l.phase}
                    </span>
                    <span className="font-mono text-sm text-emerald-400 font-bold">
                      {done ? '✓ Completed' : '60 Mins'}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {l.title}: <span className="text-amber-300">{l.subtitle}</span>
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">{l.storyIntro}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {l.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs sm:text-sm font-mono text-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t-2 border-slate-800">
                  <span className="text-xs sm:text-sm font-mono text-slate-300">
                    CSTA: <strong className="text-cyan-300">{l.standards.cstaOutcomeCode}</strong>
                    {quizRes ? ` • Quiz: ${quizRes.percentage}%` : ''}
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenLesson(l.id)}
                    className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-sm comic-btn cursor-pointer"
                  >
                    Open Class {l.id} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Framework Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/95 border-2 border-slate-700 space-y-2">
              <h3 className="text-sm font-black text-amber-300 uppercase">
                England National Curriculum: Key Stage 2 Computing
              </h3>
              {STANDARDS_FRAMEWORK_OVERVIEW.englandKS2.map((k) => (
                <div key={k.code} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <strong className="text-cyan-300">{k.code}:</strong> {k.description}
                  <div className="font-mono text-[11px] text-slate-400 mt-1">
                    Classes: {k.classesCovered.join(', ')}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/95 border-2 border-slate-700 space-y-2">
              <h3 className="text-sm font-black text-cyan-300 uppercase">
                CSTA K–12 Standards (Grade 5 / Upper Elementary 1B)
              </h3>
              {STANDARDS_FRAMEWORK_OVERVIEW.cstaGrade5.map((c) => (
                <div key={c.code} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <strong className="text-amber-300">
                    {c.code} ({c.title}):
                  </strong>{' '}
                  {c.description}
                  <div className="font-mono text-[11px] text-slate-400 mt-1">
                    Classes: {c.classesCovered.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Per-Class Standards Matrix */}
          <div className="rounded-2xl bg-slate-900/95 border-2 border-slate-700 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-cyan-300 font-mono uppercase border-b border-slate-800">
                <tr>
                  <th className="p-3">Class</th>
                  <th className="p-3">CSTA Domain & Code</th>
                  <th className="p-3">England KS2 & Practice</th>
                  <th className="p-3">Assessment Evidence & Mastery</th>
                  <th className="p-3">Responsible Computing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {lessons.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-bold">
                      Class {l.id}: {l.title}
                    </td>
                    <td className="p-3">
                      <span className="font-mono text-amber-300 font-bold">
                        {l.standards.cstaOutcomeCode}
                      </span>{' '}
                      ({l.standards.cstaDomain})
                      <div className="text-slate-400 text-[11px]">{l.standards.cstaOutcomeDescription}</div>
                    </td>
                    <td className="p-3">
                      <div>{l.standards.englandKS2.join('; ')}</div>
                      <div className="text-cyan-300 text-[11px] mt-0.5">
                        Practice: {l.standards.cstaPractice}
                      </div>
                    </td>
                    <td className="p-3">
                      <div>{l.standards.assessmentEvidence}</div>
                      <div className="text-emerald-300 text-[11px] mt-0.5">
                        {l.standards.masteryIndicator}
                      </div>
                    </td>
                    <td className="p-3 text-slate-300">{l.standards.responsibleComputingNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const PLAYGROUND_TEMPLATES: { title: string; code: string; inputs: string }[] = [
  {
    title: '1. Superhero Identity Generator',
    inputs: 'Astra\nPlasma Beam\n95',
    code: `# Superhero Identity Card Generator
hero = input()
power = input()
energy = int(input())

boosted = energy * 2
print("=== NEO-BENGALURU HERO REGISTRY ===")
print(f"Hero: {hero.upper()}")
print(f"Signature Power: {power}")
print(f"Boosted Combat Rating: {boosted}")`,
  },
  {
    title: '2. Secret Cipher Decoder',
    inputs: '   @G3NT_H@STH@KSH   ',
    code: `# Detective Cipher Cleaner
raw_clue = input().strip()
decoded = raw_clue.replace("@", "A").replace("3", "E").replace("_", " ")
print("Decoded Agent:", decoded)
print("Length:", len(decoded))`,
  },
  {
    title: '3. Cricket Boundary Analyzer',
    inputs: '',
    code: `# Cricket Over Score Analyzer
balls = [4, 0, 6, 1, 4, 6]
total_runs = 0
boundaries = 0

for runs in balls:
    total_runs += runs
    if runs >= 4:
        boundaries += 1

print(f"Total Runs: {total_runs} | Boundaries: {boundaries}")`,
  },
  {
    title: '4. 2D Star Grid Generator',
    inputs: '4',
    code: `# Nested Loop Star Grid
size = int(input())
for r in range(size):
    row_str = ""
    for c in range(size):
        if r == c:
            row_str += "★ "
        else:
            row_str += "· "
    print(row_str.strip())`,
  },
];

export const PlaygroundView: React.FC<{ progress: UserProgressState }> = ({ progress }) => {
  const [code, setCode] = useState<string>(PLAYGROUND_TEMPLATES[0].code);
  const [inputs, setInputs] = useState<string>(PLAYGROUND_TEMPLATES[0].inputs);
  const [stdout, setStdout] = useState<string>('');

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-slate-900/95 border-2 border-slate-700 shadow-[4px_4px_0px_#020617] flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
            SANDBOX IDE & STEP-THROUGH DEBUGGER
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            Interactive Python 3 Playground
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {PLAYGROUND_TEMPLATES.map((tpl, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setCode(tpl.code);
                setInputs(tpl.inputs);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-cyan-300 cursor-pointer"
            >
              {tpl.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <div className="lg:col-span-8">
          <PythonEditorPanel
            title="PYTHON 3 SANDBOX PLAYGROUND"
            code={code}
            onChange={setCode}
            defaultCode={PLAYGROUND_TEMPLATES[0].code}
            inputValues={inputs}
            onInputValuesChange={setInputs}
            onRunComplete={(res) => setStdout(res.stdout)}
            heightClass="h-96"
          />
        </div>
        <div className="lg:col-span-4 space-y-4">
          <PythonCanvasVisualizer
            stdout={stdout}
            code={code}
            reducedMotion={progress.reducedMotion}
          />
          <div className="p-4 rounded-2xl bg-slate-900/95 border-2 border-slate-700 text-xs space-y-2">
            <div className="font-mono font-bold text-amber-300 uppercase">
              ⚡ Playground Quick Tips
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li>Use <strong>👣 Step Through</strong> to watch variables change line-by-line.</li>
              <li>Put each <code className="text-cyan-300">input()</code> value on its own line in the Input Values box.</li>
              <li>Click <strong>⤢ Full Screen</strong> when presenting your code to your teacher!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ClassActivitiesHubView: React.FC<{
  lessons: Lesson[];
  progress: UserProgressState;
  onCompleteActivity: (lessonId: number) => void;
}> = ({ lessons, progress, onCompleteActivity }) => {
  const isTeacher = progress.mode === 'teacher';
  const [selectedLessonId, setSelectedLessonId] = useState<number>(progress.currentLessonId || 1);
  const lesson = lessons.find((l) => l.id === selectedLessonId) || lessons[0];
  const act = lesson.classActivity;

  const [code, setCode] = useState<string>(act.starterCode);
  const [inputs, setInputs] = useState<string>(act.sampleInput);

  const handleSelectLesson = (id: number) => {
    setSelectedLessonId(id);
    const found = lessons.find((l) => l.id === id);
    if (found) {
      setCode(found.classActivity.starterCode);
      setInputs(found.classActivity.sampleInput);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-slate-900/95 border-2 border-slate-700 shadow-[4px_4px_0px_#020617] flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase">
            20 INTERACTIVE 1-ON-1 CLASSROOM ACTIVITIES
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            Live Class Activities Hub
          </h1>
        </div>

        <select
          aria-label="Select Class Activity"
          value={selectedLessonId}
          onChange={(e) => handleSelectLesson(Number(e.target.value))}
          className="px-3 py-2 rounded-xl bg-slate-950 border-2 border-slate-700 text-xs font-bold text-slate-100"
        >
          {lessons.map((l) => (
            <option key={l.id} value={l.id}>
              Class {l.id}: {l.classActivity.title}{' '}
              {progress.completedActivities.includes(l.id) ? '✓' : ''}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-900/95 border-2 border-slate-700 space-y-3">
          <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">
            Class {lesson.id} Activity • {act.timeLimitMinutes} Mins
          </span>
          <h2 className="text-lg font-extrabold text-white">{act.title}</h2>
          <p className="text-xs text-slate-200">{act.objective}</p>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
            <strong className="text-emerald-300 block">Student Mission Steps:</strong>
            <ol className="list-decimal list-inside space-y-1 text-slate-300">
              {act.studentInstructions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>

          {isTeacher && (
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/40 text-xs space-y-1">
              <strong className="text-purple-300 block">Teacher Coaching Guide:</strong>
              <ol className="list-decimal list-inside space-y-1 text-purple-100">
                {act.teacherInstructions.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ol>
              <button
                type="button"
                onClick={() => setCode(act.teacherSolution)}
                className="mt-2 px-2.5 py-1 rounded bg-purple-400 text-slate-950 font-bold text-xs cursor-pointer"
              >
                🔑 Load Teacher Activity Solution
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => onCompleteActivity(lesson.id)}
            className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs cursor-pointer"
          >
            {progress.completedActivities.includes(lesson.id)
              ? '✓ Activity Completed (+50 XP)'
              : 'Mark Activity Complete (+50 XP)'}
          </button>
        </div>

        <div className="lg:col-span-7">
          <PythonEditorPanel
            title={`ACTIVITY WORKBENCH: ${act.title.toUpperCase()}`}
            code={code}
            onChange={setCode}
            defaultCode={act.starterCode}
            inputValues={inputs}
            onInputValuesChange={setInputs}
            heightClass="h-80"
          />
        </div>
      </div>
    </div>
  );
};

export const ProgressAndAchievementsView: React.FC<{
  lessons: Lesson[];
  exercises: PracticeExercise[];
  progress: UserProgressState;
}> = ({ lessons, exercises, progress }) => {
  const levelInfo = getLevelInfo(progress.xp);
  const records = Object.values(progress.exerciseRecords).filter((r) => r.solved);
  const independentCount = records.filter((r) => r.mastery === 'independent').length;
  const withHintsCount = records.filter((r) => r.mastery === 'with_hints').length;
  const afterExampleCount = records.filter((r) => r.mastery === 'after_example').length;

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-slate-900/95 border-2 border-slate-700 shadow-[4px_4px_0px_#020617] flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
            GAMIFIED MASTERY & ANALYTICS DASHBOARD
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            Hasthaksh&apos;s Progress, Ranks & Badges
          </h1>
        </div>
        <div className="px-4 py-2 rounded-xl bg-slate-950 border border-amber-400/50 text-right">
          <div className="text-xs font-mono text-amber-300">CURRENT RANK</div>
          <div className="text-lg font-black text-white">
            Lv.{levelInfo.current.level} {levelInfo.current.title} ({progress.xp} XP)
          </div>
        </div>
      </div>

      {/* Mastery Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/95 border-2 border-emerald-500/40">
          <div className="text-xs font-mono text-emerald-300 uppercase">Solved Independently</div>
          <div className="text-2xl font-black text-white mt-1">{independentCount} Drills</div>
          <div className="text-xs text-slate-400 mt-0.5">Zero hints or solutions used</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/95 border-2 border-amber-500/40">
          <div className="text-xs font-mono text-amber-300 uppercase">Solved With Hints</div>
          <div className="text-2xl font-black text-white mt-1">{withHintsCount} Drills</div>
          <div className="text-xs text-slate-400 mt-0.5">Used progressive hints 1–3</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/95 border-2 border-purple-500/40">
          <div className="text-xs font-mono text-purple-300 uppercase">Solved After Example</div>
          <div className="text-2xl font-black text-white mt-1">{afterExampleCount} Drills</div>
          <div className="text-xs text-slate-400 mt-0.5">Guided by teacher solution</div>
        </div>
      </div>

      {/* 9 Collectible Badges */}
      <div className="p-5 rounded-2xl bg-slate-900/95 border-2 border-slate-700 space-y-3">
        <h2 className="text-base font-extrabold text-white uppercase">
          9 Collectible Achievement Badges
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {BADGE_DEFINITIONS.map((b) => {
            const unlocked = progress.unlockedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`p-3.5 rounded-xl border-2 transition ${
                  unlocked
                    ? 'bg-slate-950 border-cyan-400 shadow-[3px_3px_0px_#020617]'
                    : 'bg-slate-950/50 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">
                    {unlocked ? '🏅' : '🔒'} {b.title}
                  </span>
                  <span className="text-[11px] font-mono text-cyan-300">
                    {unlocked ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">{b.description}</p>
                <div className="text-[11px] font-mono text-amber-300 mt-1.5">
                  Goal: {b.requirementText}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* All 9 Level Ranks */}
      <div className="p-5 rounded-2xl bg-slate-900/95 border-2 border-slate-700 space-y-3">
        <h2 className="text-base font-extrabold text-white uppercase">
          9 Python Quest Level Ranks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {LEVEL_DEFINITIONS.map((lvl) => {
            const reached = progress.xp >= lvl.minXp;
            return (
              <div
                key={lvl.level}
                className={`p-3 rounded-xl border ${
                  reached
                    ? 'bg-emerald-950/30 border-emerald-400 text-slate-100'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div className="font-mono text-xs font-bold text-amber-300">
                  LEVEL {lvl.level} ({lvl.minXp}+ XP)
                </div>
                <div className="text-sm font-black text-white">{lvl.title}</div>
                <div className="text-xs mt-0.5">{lvl.perk}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface TeacherControlCentreViewProps {
  lessons: Lesson[];
  progress: UserProgressState;
  onToggleMode: () => void;
  onUpdateDuration: (mins: number) => void;
  onToggleReducedMotion: () => void;
  onCompleteLesson: (lessonId: number) => void;
  onUpdateTeacherNote: (lessonId: number, note: string) => void;
  onImportProgress: (newState: UserProgressState) => void;
  onResetProgress: () => void;
}

export const TeacherControlCentreView: React.FC<TeacherControlCentreViewProps> = ({
  lessons,
  progress,
  onToggleMode,
  onUpdateDuration,
  onToggleReducedMotion,
  onCompleteLesson,
  onUpdateTeacherNote,
  onImportProgress,
  onResetProgress,
}) => {
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState<boolean>(false);

  const handleExportJson = () => {
    const dataStr = JSON.stringify(progress, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hasthaksh-python-quest-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (parsed && typeof parsed === 'object' && 'studentName' in parsed) {
        onImportProgress(parsed as UserProgressState);
        setImportStatus('✓ Progress JSON imported successfully!');
      } else {
        setImportStatus('⚠ Invalid JSON structure: missing studentName field.');
      }
    } catch {
      setImportStatus('⚠ Could not parse JSON. Check for syntax errors.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-slate-900/95 border-2 border-purple-400 shadow-[4px_4px_0px_#020617] flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-purple-300 uppercase">
            INSTRUCTOR COMMAND & DATA PERSISTENCE
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            Teacher Control Centre
          </h1>
        </div>

        <button
          type="button"
          onClick={onToggleMode}
          className={`px-5 py-2.5 rounded-xl font-black text-xs cursor-pointer border-2 shadow-[2px_2px_0px_#020617] ${
            progress.mode === 'teacher'
              ? 'bg-purple-400 text-slate-950 border-slate-950'
              : 'bg-cyan-400 text-slate-950 border-slate-950'
          }`}
        >
          Current Mode: {progress.mode.toUpperCase()} (Click to Switch)
        </button>
      </div>

      {/* Session Settings & LocalStorage Backup */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/95 border-2 border-slate-700 space-y-4">
          <h2 className="text-base font-extrabold text-white uppercase">
            Classroom Session Pacing & Accessibility
          </h2>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Target Live Session Duration (Minutes):
            </label>
            <div className="flex gap-2">
              {[45, 60, 75, 90].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => onUpdateDuration(mins)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    progress.lessonDurationMinutes === mins
                      ? 'bg-cyan-400 text-slate-950'
                      : 'bg-slate-950 text-slate-300 border border-slate-800'
                  }`}
                >
                  {mins} mins
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-xs text-slate-200">
              Reduced Motion Mode (Disables Canvas / GSAP pulses)
            </span>
            <button
              type="button"
              onClick={onToggleReducedMotion}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-300 text-xs font-bold cursor-pointer"
            >
              {progress.reducedMotion ? 'Enabled ✓' : 'Disabled'}
            </button>
          </div>
        </div>

        {/* Export / Import / Reset LocalStorage */}
        <div className="p-5 rounded-2xl bg-slate-900/95 border-2 border-slate-700 space-y-3">
          <h2 className="text-base font-extrabold text-white uppercase">
            LocalStorage Progress Backup (Export / Import / Reset)
          </h2>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer"
            >
              ⬇ Export Progress JSON
            </button>

            <button
              type="button"
              onClick={() => setConfirmResetOpen(true)}
              className="px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-400 text-rose-200 font-bold text-xs cursor-pointer"
            >
              🗑 Reset All Progress
            </button>
          </div>

          {confirmResetOpen && (
            <div className="p-3 rounded-xl bg-rose-950/70 border-2 border-rose-400 space-y-2 text-xs">
              <div className="font-bold text-rose-200">
                Are you sure you want to reset Hasthaksh&apos;s progress to default?
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onResetProgress();
                    setConfirmResetOpen(false);
                  }}
                  className="px-3 py-1 rounded bg-rose-500 text-slate-950 font-black cursor-pointer"
                >
                  Yes, Confirm Reset
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmResetOpen(false)}
                  className="px-3 py-1 rounded bg-slate-800 text-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-1.5 pt-2">
            <label className="block text-xs font-mono text-slate-400">
              Paste Backup JSON to Restore Progress:
            </label>
            <textarea
              rows={2}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder='{"studentName": "Hasthaksh", ...}'
              className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 font-mono text-xs text-slate-100"
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleImportJson}
                className="px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
              >
                ⬆ Import JSON Backup
              </button>
              {importStatus && <span className="text-xs text-emerald-300">{importStatus}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Class Completion & Teacher Notes Matrix */}
      <div className="p-5 rounded-2xl bg-slate-900/95 border-2 border-slate-700 space-y-3">
        <h2 className="text-base font-extrabold text-white uppercase">
          20-Class Completion & Session Notes Manager
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {lessons.map((l) => {
            const done = progress.completedLessons.includes(l.id);
            return (
              <div
                key={l.id}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">
                    Class {l.id}: {l.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => onCompleteLesson(l.id)}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer ${
                      done
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {done ? '✓ Completed' : 'Mark Complete'}
                  </button>
                </div>
                <input
                  type="text"
                  aria-label={`Teacher note for Class ${l.id}`}
                  value={progress.teacherNotes[l.id] || ''}
                  onChange={(e) => onUpdateTeacherNote(l.id, e.target.value)}
                  placeholder={`Session notes for Class ${l.id}...`}
                  className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-200"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
