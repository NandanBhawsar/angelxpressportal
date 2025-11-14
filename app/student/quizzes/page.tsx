'use client';

import Link from 'next/link';
import { StudentSidebar } from '@/components/Layout/StudentSidebar';
import { AuthGuard } from '@/components/AuthGuard';
import { BookOpen, Clock, Trophy, Star } from 'lucide-react';

export default function StudentQuizzesPage() {
  // Mock quiz data
  const quizzes = [
    {
      id: '1',
      title: 'Addition Basics',
      subject: 'Mathematics',
      difficulty: 'easy',
      questions: 10,
      timeLimit: 15,
      xp: 200,
      rating: 4.5,
      completed: false,
    },
    {
      id: '2',
      title: 'Multiplication Tables',
      subject: 'Mathematics',
      difficulty: 'medium',
      questions: 15,
      timeLimit: 20,
      xp: 300,
      rating: 4.8,
      completed: true,
      score: 85,
    },
    {
      id: '3',
      title: 'Plant Life Cycle',
      subject: 'Science',
      difficulty: 'easy',
      questions: 12,
      timeLimit: 18,
      xp: 250,
      rating: 4.2,
      completed: false,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <StudentSidebar />
        <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Quizzes
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Test your knowledge and earn XP
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {quiz.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {quiz.subject}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyColor(
                      quiz.difficulty
                    )}`}
                  >
                    {quiz.difficulty}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <BookOpen size={16} />
                    <span>{quiz.questions} questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock size={16} />
                    <span>{quiz.timeLimit} minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Trophy size={16} />
                    <span>{quiz.xp} XP</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span>{quiz.rating}</span>
                  </div>
                </div>

                {quiz.completed ? (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Your Score: <span className="font-semibold text-gray-900 dark:text-white">{quiz.score}%</span>
                    </p>
                    <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                      Retake Quiz
                    </button>
                  </div>
                ) : (
                  <Link
                    href={`/student/quizzes/${quiz.id}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors block text-center"
                  >
                    Start Quiz
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
        </main>
      </div>
    </AuthGuard>
  );
}

