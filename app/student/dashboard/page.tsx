'use client';

import { StudentSidebar } from '@/components/Layout/StudentSidebar';
import { AuthGuard } from '@/components/AuthGuard';
import { useStore } from '@/lib/store';
import { GlassmorphismButton } from '@/components/UI/GlassmorphismButton';
import { Trophy, BookOpen, Award, TrendingUp, Calendar, Target } from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboardPage() {
  const { currentUser } = useStore();

  // Mock student data
  const studentData = {
    name: currentUser || 'Student',
    level: 5,
    xp: 2450,
    xpToNext: 550,
    currentStreak: 7,
    badges: 12,
    quizzesCompleted: 18,
    tutorialsCompleted: 25,
    rank: 3,
  };

  const stats = [
    {
      label: 'Current Level',
      value: `Level ${studentData.level}`,
      icon: Target,
      color: 'bg-blue-500',
      progress: ((studentData.xp % 1000) / 1000) * 100,
    },
    {
      label: 'Total XP',
      value: studentData.xp.toLocaleString(),
      icon: Trophy,
      color: 'bg-yellow-500',
    },
    {
      label: 'Current Streak',
      value: `${studentData.currentStreak} days`,
      icon: Calendar,
      color: 'bg-orange-500',
    },
    {
      label: 'Badges Earned',
      value: studentData.badges,
      icon: Award,
      color: 'bg-purple-500',
    },
  ];

  const quickActions = [
    { href: '/student/quizzes', label: 'Take Quiz', icon: BookOpen, color: 'bg-blue-600' },
    { href: '/student/tutorials', label: 'Watch Tutorial', icon: BookOpen, color: 'bg-green-600' },
    { href: '/student/attendance', label: 'Check In', icon: Calendar, color: 'bg-orange-600' },
    { href: '/student/leaderboard', label: 'Leaderboard', icon: Trophy, color: 'bg-yellow-600' },
  ];

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <StudentSidebar />
        <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {studentData.name}! 👋
            </h1>
            <p className="text-blue-100">
              Keep up the great work! You're doing amazing.
            </p>
          </div>

          {/* Level Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Level {studentData.level}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {studentData.xpToNext} XP to Level {studentData.level + 1}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {studentData.xp.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total XP</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${((studentData.xp % 1000) / 1000) * 100}%` }}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`${stat.color} p-2 rounded-lg`}>
                      <Icon className="text-white" size={20} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.href} href={action.href} className="block">
                    <GlassmorphismButton
                      variant={action.color.includes('blue') ? 'primary' : action.color.includes('green') ? 'xp' : action.color.includes('orange') ? 'levelup' : 'reward'}
                      className="w-full h-full flex-col py-6"
                      icon={Icon}
                    >
                      {action.label}
                    </GlassmorphismButton>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Streak & Leaderboard Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Streak Card */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">🔥 Learning Streak</h3>
                <Calendar size={24} />
              </div>
              <p className="text-4xl font-bold mb-2">{studentData.currentStreak}</p>
              <p className="text-orange-100">days in a row!</p>
              <p className="text-sm text-orange-100 mt-2">
                Keep it up! You're on fire! 🔥
              </p>
            </div>

            {/* Leaderboard Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Leaderboard
                </h3>
                <Link
                  href="/student/leaderboard"
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🥇</span>
                    <span className="font-medium text-gray-900 dark:text-white">Rahul</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">3,200 XP</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🥈</span>
                    <span className="font-medium text-gray-900 dark:text-white">Anjali</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">2,800 XP</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded border-2 border-blue-500">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🥉</span>
                    <span className="font-medium text-gray-900 dark:text-white">You</span>
                  </div>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {studentData.xp.toLocaleString()} XP
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Trophy className="text-green-600 dark:text-green-400" size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    Completed: Math Quiz
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Scored 85% • Earned 150 XP
                  </p>
                </div>
                <span className="text-sm text-gray-500">2h ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <BookOpen className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    Watched: Science Tutorial
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Plant Life Cycle • Earned 100 XP
                  </p>
                </div>
                <span className="text-sm text-gray-500">5h ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Award className="text-purple-600 dark:text-purple-400" size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    Badge Unlocked: Quiz Master
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Completed 25 quizzes
                  </p>
                </div>
                <span className="text-sm text-gray-500">1d ago</span>
              </div>
            </div>
          </div>
        </div>
        </main>
      </div>
    </AuthGuard>
  );
}

