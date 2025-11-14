'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { AuthGuard } from '@/components/AuthGuard';
import { useStore } from '@/lib/store';
import { Calendar, CheckCircle, XCircle, Clock, Download } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import toast from 'react-hot-toast';

export default function AttendancePage() {
  const { students, attendanceRecords, markAttendance, updateAttendance } = useStore();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [view, setView] = useState<'daily' | 'monthly'>('daily');

  const todayRecords = attendanceRecords.filter((r) => r.date === selectedDate);
  const currentMonth = new Date(selectedDate);
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleMarkAttendance = (studentId: string, status: 'Present' | 'Absent' | 'Late', reason?: string) => {
    // Find existing record for this specific student and date
    const dateStr = selectedDate;
    const existing = attendanceRecords.find((r) => r.studentId === studentId && r.date === dateStr);
    if (existing) {
      updateAttendance(existing.id, { status, reason });
      toast.success(`Attendance updated for student`);
    } else {
      markAttendance({ studentId, date: dateStr, status, reason });
      toast.success(`Attendance marked for student`);
    }
  };

  const getAttendanceForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return attendanceRecords.filter((r) => r.date === dateStr);
  };

  const exportToCSV = () => {
    const csv = [
      ['Date', 'Student', 'Status', 'Reason'],
      ...attendanceRecords.map((r) => {
        const student = students.find((s) => s.id === r.studentId);
        return [
          r.date,
          student?.name || 'Unknown',
          r.status,
          r.reason || '',
        ];
      }),
    ].map((row) => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-${selectedDate}.csv`;
    a.click();
    toast.success('CSV exported');
  };

  return (
    <AuthGuard>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Attendance
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Mark and track student attendance
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                <Download size={20} />
                Export CSV
              </button>
            </div>
          </div>

          {/* View Toggle */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setView('daily')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'daily'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Daily View
              </button>
              <button
                onClick={() => setView('monthly')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Monthly View
              </button>
            </div>

            {view === 'daily' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-3">
                  {students.map((student) => {
                    const record = todayRecords.find((r) => r.studentId === student.id);
                    return (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                              {student.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{student.grade}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleMarkAttendance(student.id, 'Present')}
                            className={`p-2 rounded-lg transition-colors ${
                              record?.status === 'Present'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900'
                            }`}
                            title="Present"
                          >
                            <CheckCircle size={20} />
                          </button>
                          <button
                            onClick={() => handleMarkAttendance(student.id, 'Absent')}
                            className={`p-2 rounded-lg transition-colors ${
                              record?.status === 'Absent'
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900'
                            }`}
                            title="Absent"
                          >
                            <XCircle size={20} />
                          </button>
                          <button
                            onClick={() => {
                              const reason = prompt('Reason for being late:');
                              if (reason !== null) {
                                handleMarkAttendance(student.id, 'Late', reason);
                              }
                            }}
                            className={`p-2 rounded-lg transition-colors ${
                              record?.status === 'Late'
                                ? 'bg-yellow-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-yellow-900'
                            }`}
                            title="Late"
                          >
                            <Clock size={20} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {todayRecords.filter((r) => r.status === 'Present').length}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Present</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {todayRecords.filter((r) => r.status === 'Absent').length}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Absent</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {todayRecords.filter((r) => r.status === 'Late').length}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Late</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {view === 'monthly' && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {format(currentMonth, 'MMMM yyyy')}
                  </h3>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2">
                      {day}
                    </div>
                  ))}
                  {monthDays.map((day) => {
                    const dayRecords = getAttendanceForDate(day);
                    const presentCount = dayRecords.filter((r) => r.status === 'Present').length;
                    const totalCount = dayRecords.length;
                    const isToday = isSameDay(day, new Date());
                    return (
                      <div
                        key={day.toISOString()}
                        className={`p-2 rounded-lg border ${
                          isToday
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                        }`}
                      >
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {format(day, 'd')}
                        </p>
                        {totalCount > 0 && (
                          <div className="text-xs">
                            <p className="text-green-600 dark:text-green-400">{presentCount}</p>
                            <p className="text-gray-500 dark:text-gray-500">/{totalCount}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  );
}

