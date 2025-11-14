'use client';

import Link from 'next/link';
import { StudentSidebar } from '@/components/Layout/StudentSidebar';
import { AuthGuard } from '@/components/AuthGuard';
import { Play, BookOpen, Clock, CheckCircle, Trophy } from 'lucide-react';

export default function StudentTutorialsPage() {
  // Mock tutorial data
  const tutorials = [
    {
      id: '1',
      title: 'Addition Basics',
      subject: 'Mathematics',
      type: 'video',
      duration: 15,
      xp: 100,
      progress: 0,
      completed: false,
    },
    {
      id: '2',
      title: 'Plant Life Cycle',
      subject: 'Science',
      type: 'article',
      duration: 5,
      xp: 100,
      progress: 85,
      completed: false,
    },
    {
      id: '3',
      title: 'Grammar Basics',
      subject: 'English',
      type: 'video',
      duration: 20,
      xp: 100,
      progress: 100,
      completed: true,
    },
  ];

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <StudentSidebar />
        <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Tutorials
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Learn new concepts through videos and articles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tutorials.map((tutorial) => (
              <div
                key={tutorial.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {tutorial.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {tutorial.subject}
                    </p>
                  </div>
                  {tutorial.type === 'video' ? (
                    <Play className="text-blue-600" size={24} />
                  ) : (
                    <BookOpen className="text-green-600" size={24} />
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock size={16} />
                    <span>{tutorial.duration} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Trophy size={16} />
                    <span>{tutorial.xp} XP</span>
                  </div>
                </div>

                {tutorial.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{tutorial.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${tutorial.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {tutorial.completed ? (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle size={20} />
                    <span className="font-semibold">Completed</span>
                  </div>
                ) : tutorial.progress > 0 ? (
                  <Link
                    href={`/student/tutorials/${tutorial.id}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors block text-center"
                  >
                    Continue
                  </Link>
                ) : (
                  <Link
                    href={`/student/tutorials/${tutorial.id}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors block text-center"
                  >
                    Start Tutorial
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

