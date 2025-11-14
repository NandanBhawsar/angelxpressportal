'use client';

import { useState } from 'react';
import { StudentSidebar } from '@/components/Layout/StudentSidebar';
import { AuthGuard } from '@/components/AuthGuard';
import { Trophy, Medal, Award } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function StudentLeaderboardPage() {
  const { currentUser } = useStore();
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');

  // Mock leaderboard data
  const leaderboards = {
    weekly: [
      { rank: 1, name: 'Rahul Kumar', xp: 3200, level: 8, isYou: false },
      { rank: 2, name: 'Anjali Patel', xp: 2800, level: 7, isYou: false },
      { rank: 3, name: currentUser || 'You', xp: 2450, level: 5, isYou: true },
      { rank: 4, name: 'Vikram Singh', xp: 2100, level: 5, isYou: false },
      { rank: 5, name: 'Meera Sharma', xp: 1900, level: 4, isYou: false },
    ],
    monthly: [
      { rank: 1, name: 'Rahul Kumar', xp: 12500, level: 8, isYou: false },
      { rank: 2, name: 'Anjali Patel', xp: 11200, level: 7, isYou: false },
      { rank: 3, name: currentUser || 'You', xp: 9800, level: 5, isYou: true },
    ],
    alltime: [
      { rank: 1, name: 'Rahul Kumar', xp: 45000, level: 8, isYou: false },
      { rank: 2, name: 'Anjali Patel', xp: 38000, level: 7, isYou: false },
      { rank: 3, name: currentUser || 'You', xp: 32000, level: 5, isYou: true },
    ],
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="text-yellow-500" size={24} />;
    if (rank === 2) return <Medal className="text-gray-400" size={24} />;
    if (rank === 3) return <Award className="text-orange-600" size={24} />;
    return <span className="text-gray-600 dark:text-gray-400 font-bold">#{rank}</span>;
  };

  const currentLeaderboard = leaderboards[activeTab];

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <StudentSidebar />
        <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Leaderboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Compete with other students and climb the ranks
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('weekly')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'weekly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setActiveTab('monthly')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setActiveTab('alltime')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'alltime'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                All-Time
              </button>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              {currentLeaderboard.map((student) => (
                <div
                  key={student.rank}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    student.isYou
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500'
                      : 'bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center">
                      {getRankIcon(student.rank)}
                    </div>
                    <div>
                      <p
                        className={`font-semibold ${
                          student.isYou
                            ? 'text-blue-900 dark:text-blue-100'
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {student.name} {student.isYou && '(You)'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Level {student.level}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${
                        student.isYou
                          ? 'text-blue-900 dark:text-blue-100'
                          : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {student.xp.toLocaleString()} XP
                    </p>
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

