import { Lesson, PracticeExercise, HomeworkTask, MajorProject, FormalAssessment } from '../types/quest';
import { LESSONS_PART_1 } from './lessonsPart1';
import { LESSONS_PART_2 } from './lessonsPart2';
import { PRACTICE_BANK_PART_1 } from './practiceBankPart1';
import { PRACTICE_BANK_PART_2 } from './practiceBankPart2';
import { ALL_HOMEWORK, MAJOR_PROJECTS, FORMAL_ASSESSMENTS } from './homeworkAndAssessments';

export const ALL_LESSONS: Lesson[] = [...LESSONS_PART_1, ...LESSONS_PART_2];
export const ALL_EXERCISES: PracticeExercise[] = [...PRACTICE_BANK_PART_1, ...PRACTICE_BANK_PART_2];

export { ALL_HOMEWORK, MAJOR_PROJECTS, FORMAL_ASSESSMENTS };

export const STANDARDS_FRAMEWORK_OVERVIEW = {
  englandKS2: [
    {
      code: 'KS2-1',
      description: 'Design, write and debug programs that accomplish specific goals, including controlling or simulating physical systems; solve problems by decomposing them into smaller parts.',
      classesCovered: [1, 3, 5, 11, 12, 15, 16, 17, 18, 19, 20]
    },
    {
      code: 'KS2-2',
      description: 'Use sequence, selection, and repetition in programs; work with variables and various forms of input and output.',
      classesCovered: [1, 2, 4, 5, 6, 7, 8, 9, 10, 13, 14, 17, 18, 19]
    },
    {
      code: 'KS2-3',
      description: 'Use logical reasoning to explain how some simple algorithms work and to detect and correct errors in algorithms and programs.',
      classesCovered: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 20]
    }
  ],
  cstaGrade5: [
    {
      code: '1B-AP-08',
      title: 'Compare & Refine Algorithms',
      description: 'Compare and refine multiple algorithms for the same task and determine which is the most appropriate.',
      classesCovered: [3, 6, 8, 10, 15, 20]
    },
    {
      code: '1B-AP-09',
      title: 'Variables & Data Representation',
      description: 'Create programs that use variables to store and modify data (numbers, strings, lists, dictionaries).',
      classesCovered: [1, 2, 9, 10, 13, 15, 17]
    },
    {
      code: '1B-AP-10',
      title: 'Control Structures (Events, Conditionals, Loops)',
      description: 'Create programs that include sequences, events, loops, and conditionals.',
      classesCovered: [4, 5, 6, 7, 8, 14, 17, 18, 19]
    },
    {
      code: '1B-AP-11',
      title: 'Decomposition & Modularity',
      description: 'Decompose (break down) problems into smaller, manageable subproblems to facilitate the program development process.',
      classesCovered: [3, 11, 12, 15, 17, 18, 19, 20]
    },
    {
      code: '1B-AP-15',
      title: 'Testing & Debugging',
      description: 'Test and debug (identify and fix errors) a program or algorithm to ensure it runs as intended.',
      classesCovered: [1, 2, 4, 6, 7, 9, 11, 16, 18, 19, 20]
    }
  ]
};
