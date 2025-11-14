'use client';

import { StudentSidebar } from '@/components/Layout/StudentSidebar';
import { AuthGuard } from '@/components/AuthGuard';
import { useStore } from '@/lib/store';
import { User, Target, Trophy, Award, Calendar, BookOpen, CheckCircle } from 'lucide-react';

export default function StudentProfilePage() {
  const { currentUser } = useStore();

  // Mock student profile data
  const profile = {
    name: currentUser || 'Student',
    studentId: 'STU001',
    class: 'Class 5',
    level: 5,
    xp: 2450,
    xpToNext: 550,
    currentStreak: 7,
    bestStreak: 15,
    badges: 12,
    quizzesCompleted: 18,
    tutorialsCompleted: 25,
    attendanceRate: 88.9,
    joinedDate: '2024-09-01',
  };

  const achievements = [
    { label: 'Quizzes Completed', value: profile.quizzesCompleted, icon: BookOpen },
    { label: 'Tutorials Completed', value: profile.tutorialsCompleted, icon: BookOpen },
    { label: 'Badges Earned', value: profile.badges, icon: Award },
    { label: 'Current Streak', value: `${profile.currentStreak} days`, icon: Calendar },
  ];

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <StudentSidebar />
        <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-8 text-white">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <User size={48} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
                  <p className="text-green-100 mb-1">{profile.class} • ID: {profile.studentId}</p>
                  <p className="text-green-100">Member since {new Date(profile.joinedDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Level {profile.level}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {profile.xpToNext} XP to Level {profile.level + 1}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {profile.xp.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total XP</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${((profile.xp % 1000) / 1000) * 100}%` }}
                />
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.label}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full mb-3">
                      <Icon className="text-green-600 dark:text-green-400" size={24} />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {achievement.value}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Stats Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Learning Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Best Streak</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {profile.bestStreak} days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Attendance Rate</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {profile.attendanceRate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total XP</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {profile.xp.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Achievements
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Award className="text-yellow-500" size={20} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Quiz Master</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Trophy className="text-blue-500" size={20} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Level Up!</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">5 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-500" size={20} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Perfect Score</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">1 week ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

