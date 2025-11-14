'use client';

import { useState } from 'react';
import { StudentSidebar } from '@/components/Layout/StudentSidebar';
import { AuthGuard } from '@/components/AuthGuard';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function StudentAttendancePage() {
  const today = new Date().toISOString().split('T')[0];
  const [checkedIn, setCheckedIn] = useState(false);

  // Mock attendance data
  const attendanceData = {
    currentStreak: 7,
    totalDays: 45,
    presentDays: 40,
    attendanceRate: 88.9,
    thisMonth: [
      { date: '2025-01-01', status: 'present' },
      { date: '2025-01-02', status: 'present' },
      { date: '2025-01-03', status: 'absent' },
      { date: '2025-01-04', status: 'present' },
      { date: '2025-01-05', status: 'present' },
      { date: '2025-01-06', status: 'present' },
      { date: '2025-01-07', status: 'present' },
      { date: '2025-01-08', status: 'present' },
    ],
  };

  const handleCheckIn = () => {
    setCheckedIn(true);
    toast.success('Checked in! You earned 25 XP');
    // In real app, this would save to localStorage/backend
  };

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <StudentSidebar />
        <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Attendance
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Check in daily to maintain your streak
            </p>
          </div>

          {/* Check In Card */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Daily Check-In</h2>
                <p className="text-green-100">
                  {checkedIn ? 'You\'re checked in for today!' : 'Check in to earn 25 XP'}
                </p>
              </div>
              {checkedIn ? (
                <CheckCircle size={48} className="text-green-200" />
              ) : (
                <button
                  onClick={handleCheckIn}
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  Check In
                </button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="text-blue-600" size={24} />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Current Streak
                </h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {attendanceData.currentStreak}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">days</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="text-green-600" size={24} />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Attendance Rate
                </h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {attendanceData.attendanceRate}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {attendanceData.presentDays}/{attendanceData.totalDays} days
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="text-orange-600" size={24} />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Total Days
                </h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {attendanceData.totalDays}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">days tracked</p>
            </div>
          </div>

          {/* Calendar View */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              This Month
            </h2>
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2"
                >
                  {day}
                </div>
              ))}
              {attendanceData.thisMonth.map((day) => (
                <div
                  key={day.date}
                  className={`p-2 rounded-lg text-center text-sm ${
                    day.status === 'present'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : day.status === 'absent'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  }`}
                >
                  {format(new Date(day.date), 'd')}
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

