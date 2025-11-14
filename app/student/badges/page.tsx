'use client';

import { StudentSidebar } from '@/components/Layout/StudentSidebar';
import { AuthGuard } from '@/components/AuthGuard';
import { Award, Lock } from 'lucide-react';

export default function StudentBadgesPage() {
  // Mock badge data
  const badges = [
    { id: '1', name: 'Quiz Master', description: 'Complete 25 quizzes', icon: '🏆', earned: true },
    { id: '2', name: 'Bookworm', description: 'Complete 10 tutorials', icon: '📚', earned: true },
    { id: '3', name: 'Week Warrior', description: '7-day learning streak', icon: '🔥', earned: true },
    { id: '4', name: 'Perfect Score', description: 'Score 100% on any quiz', icon: '⭐', earned: true },
    { id: '5', name: 'Perfect Week', description: '100% attendance for a week', icon: '📅', earned: false, progress: '5/7' },
    { id: '6', name: 'Subject Expert', description: 'Score 90%+ in 10 Math quizzes', icon: '🔢', earned: false, progress: '7/10' },
    { id: '7', name: 'Month Master', description: '30-day streak', icon: '🌟', earned: false, progress: '7/30' },
    { id: '8', name: 'Early Bird', description: 'Check in before 9 AM (5 times)', icon: '🌅', earned: false, progress: '2/5' },
  ];

  const earnedBadges = badges.filter(b => b.earned);
  const lockedBadges = badges.filter(b => !b.earned);

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <StudentSidebar />
        <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Badges
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Earn badges by completing activities and achieving milestones
              </p>
            </div>

            {/* Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Earned</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {earnedBadges.length}/{badges.length}
                  </p>
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full transition-all"
                      style={{ width: `${(earnedBadges.length / badges.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Earned Badges */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Earned Badges ({earnedBadges.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {earnedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-2 border-green-500 text-center"
                  >
                    <div className="text-5xl mb-3">{badge.icon}</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {badge.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {badge.description}
                    </p>
                    <div className="mt-3">
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                        Earned
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Locked Badges */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Locked Badges ({lockedBadges.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {lockedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center opacity-60"
                  >
                    <div className="text-5xl mb-3 grayscale">{badge.icon}</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {badge.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {badge.description}
                    </p>
                    {badge.progress && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                        Progress: {badge.progress}
                      </p>
                    )}
                    <div className="mt-3">
                      <Lock className="mx-auto text-gray-400" size={20} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

