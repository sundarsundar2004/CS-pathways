export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export enum Category {
  Programming = 'Programming',
  Algorithms = 'Algorithms & Data Structures',
  WebDev = 'Web Development',
  AI = 'Artificial Intelligence',
  Systems = 'Systems Design',
  Database = 'Databases',
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string; // Markdown supported
  durationMinutes: number;
  codeSnippet?: {
    language: string;
    code: string;
  };
  quiz?: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  category: Category;
  difficulty: Difficulty;
  modules: Module[];
  totalDuration: string;
  studentCount: number;
}

export interface UserProgress {
  completedLessonIds: string[];
  currentCourseId: string | null;
  xp: number;
  streakDays: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
