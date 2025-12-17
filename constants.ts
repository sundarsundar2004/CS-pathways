import { Category, Course, Difficulty } from "./types";

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Python for Absolute Beginners',
    description: 'Start your coding journey with Python. Learn syntax, loops, functions, and basic data structures.',
    thumbnailUrl: 'https://picsum.photos/400/200?random=1',
    category: Category.Programming,
    difficulty: Difficulty.Beginner,
    totalDuration: '4h 30m',
    studentCount: 12500,
    modules: [
      {
        id: 'm1',
        title: 'Introduction & Setup',
        lessons: [
          {
            id: 'l1',
            title: 'Why Python?',
            durationMinutes: 10,
            content: `Python is an interpreted, high-level, general-purpose programming language. Its design philosophy emphasizes code readability with its use of significant indentation.\n\n### Key Features:\n- Easy to read and write\n- Interpreted language\n- Dynamically typed\n- Huge standard library`,
            quiz: [
              {
                id: 'q1',
                question: 'Which of the following is a key feature of Python?',
                options: ['Statically typed', 'Compiled only', 'Emphasizes code readability', 'Low-level memory management'],
                correctAnswerIndex: 2,
                explanation: 'Python is designed to be highly readable and uses indentation to define code blocks.'
              }
            ]
          },
          {
            id: 'l2',
            title: 'Your First Program',
            durationMinutes: 15,
            content: 'In this lesson, we will write our first "Hello, World!" program. This is a tradition in computer science.',
            codeSnippet: {
              language: 'python',
              code: 'print("Hello, World!")\n\n# Try changing the text above!'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Data Structures & Algorithms',
    description: 'Master the fundamentals of CS. Arrays, Linked Lists, Trees, Graphs, and Sorting Algorithms.',
    thumbnailUrl: 'https://picsum.photos/400/200?random=2',
    category: Category.Algorithms,
    difficulty: Difficulty.Intermediate,
    totalDuration: '12h 15m',
    studentCount: 8900,
    modules: [
      {
        id: 'm2_1',
        title: 'Arrays & Strings',
        lessons: [
          {
            id: 'l2_1',
            title: 'Big O Notation',
            durationMinutes: 20,
            content: 'Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity.',
            quiz: [
              {
                id: 'q2_1',
                question: 'What is the time complexity of accessing an array index?',
                options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
                correctAnswerIndex: 2,
                explanation: 'Accessing an array by index is a constant time operation O(1).'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'c3',
    title: 'Advanced React Patterns',
    description: 'Take your web development skills to the next level with Hooks, Context, and Performance optimization.',
    thumbnailUrl: 'https://picsum.photos/400/200?random=3',
    category: Category.WebDev,
    difficulty: Difficulty.Advanced,
    totalDuration: '6h 45m',
    studentCount: 5400,
    modules: []
  },
  {
    id: 'c4',
    title: 'Intro to Artificial Intelligence',
    description: 'Understand the basics of AI, Machine Learning, and Neural Networks.',
    thumbnailUrl: 'https://picsum.photos/400/200?random=4',
    category: Category.AI,
    difficulty: Difficulty.Beginner,
    totalDuration: '8h 00m',
    studentCount: 21000,
    modules: []
  },
  {
    id: 'c5',
    title: 'System Design Interview Prep',
    description: 'Learn how to design scalable systems like Twitter, Uber, and Netflix.',
    thumbnailUrl: 'https://picsum.photos/400/200?random=5',
    category: Category.Systems,
    difficulty: Difficulty.Advanced,
    totalDuration: '15h 30m',
    studentCount: 3200,
    modules: []
  }
];
