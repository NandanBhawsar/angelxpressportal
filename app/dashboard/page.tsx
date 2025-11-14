'use client';

import { MainLayout } from '@/components/Layout/MainLayout';
import { AuthGuard } from '@/components/AuthGuard';
import { useStore } from '@/lib/store';
import { mockAnnouncements } from '@/lib/mockData';
import { useEffect } from 'react';
import {
  Users,
  Calendar,
  BookOpen,
  TrendingUp,
  Bell,
  Clock,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function DashboardPage() {
  const {
    students,
    attendanceRecords,
    homework,
    announcements,
    addAnnouncement,
  } = useStore();

  // Clear any existing mock data and initialize fresh
  useEffect(() => {
    // Clear localStorage to remove any previously loaded mock data
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('angelxpress-storage');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // If there are many students (likely mock data), clear it immediately
          if (parsed.state?.students?.length > 10) {
            console.log('Detected mock data in localStorage. Clearing...');
            localStorage.removeItem('angelxpress-storage');
            // Force reload to start fresh
            setTimeout(() => {
              window.location.reload();
            }, 100);
            return;
          }
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
    
    // Initialize only announcements
    if (announcements.length === 0) {
      mockAnnouncements.forEach((ann) => addAnnouncement(ann));
    }
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendanceRecords.filter((r) => r.date === today);
  const presentCount = todayAttendance.filter((r) => r.status === 'Present').length;
  const totalStudents = students.length;
  const pendingHomework = homework.filter((h) => h.status === 'pending').length;
  const submittedHomework = homework.filter((h) => h.status === 'submitted').length;

  const stats = [
    {
      label: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'bg-blue-500',
      href: '/students',
    },
    {
      label: 'Today\'s Attendance',
      value: `${presentCount}/${totalStudents}`,
      icon: Calendar,
      color: 'bg-green-500',
      href: '/attendance',
    },
    {
      label: 'Pending Homework',
      value: pendingHomework,
      icon: BookOpen,
      color: 'bg-orange-500',
      href: '/homework',
    },
    {
      label: 'Submitted This Week',
      value: submittedHomework,
      icon: CheckCircle,
      color: 'bg-purple-500',
      href: '/homework',
    },
  ];

  return (
    <AuthGuard>
      <MainLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back! Here's what's happening today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Link
                  key={stat.label}
                  href={stat.href}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="text-white" size={24} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Attendance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Quick Attendance
                </h2>
                <Link
                  href="/attendance"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {students.slice(0, 5).map((student) => {
                  const todayRecord = todayAttendance.find((r) => r.studentId === student.id);
                  return (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        {student.name}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          todayRecord?.status === 'Present'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : todayRecord?.status === 'Absent'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                        }`}
                      >
                        {todayRecord?.status || 'Not Marked'}
                      </span>
                    </div>
                  );
                })}
              </div>
              <Link
                href="/attendance"
                className="mt-4 block w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Mark Attendance
              </Link>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Today's Schedule
                </h2>
                <Clock className="text-gray-400" size={20} />
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <p className="font-medium text-gray-900 dark:text-white">Math Class</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">10:00 AM - 11:00 AM</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <p className="font-medium text-gray-900 dark:text-white">English Class</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">11:30 AM - 12:30 PM</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                  <p className="font-medium text-gray-900 dark:text-white">Science Activity</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">2:00 PM - 3:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Bell className="text-blue-600" size={20} />
                Announcements
              </h2>
              <Link
                href="/communication"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {announcements.slice(0, 3).map((announcement) => (
                <div
                  key={announcement.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {announcement.title}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {format(new Date(announcement.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {announcement.content}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    By {announcement.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  );
}

