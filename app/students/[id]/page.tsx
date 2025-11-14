'use client';

import { useParams, useRouter } from 'next/navigation';
import { MainLayout } from '@/components/Layout/MainLayout';
import { AuthGuard } from '@/components/AuthGuard';
import { useStore } from '@/lib/store';
import { ArrowLeft, Edit, User, Calendar, BookOpen, FileText, Image, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { format } from 'date-fns';

export default function StudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { students, attendanceRecords, homework, testScores } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'homework' | 'tests' | 'notes' | 'media'>('overview');

  const student = students.find((s) => s.id === params.id);

  if (!student) {
    return (
      <AuthGuard>
        <MainLayout>
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">Student not found</p>
            <Link href="/students" className="text-blue-600 hover:underline mt-4 inline-block">
              Back to Students
            </Link>
          </div>
        </MainLayout>
      </AuthGuard>
    );
  }

  const studentAttendance = attendanceRecords.filter((a) => a.studentId === student.id);
  const studentHomework = homework.filter((h) => h.studentId === student.id);
  const studentTests = testScores.filter((t) => t.studentId === student.id);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'homework', label: 'Homework', icon: BookOpen },
    { id: 'tests', label: 'Tests', icon: FileText },
    { id: 'notes', label: 'Notes', icon: MessageSquare },
    { id: 'media', label: 'Media', icon: Image },
  ];

  return (
    <AuthGuard>
      <MainLayout>
        <div className="space-y-6">
          <Link
            href="/students"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft size={20} />
            Back to Students
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <User className="text-blue-600 dark:text-blue-400" size={32} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {student.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Age {student.age} • {student.grade}
                  </p>
                </div>
              </div>
              <Link
                href={`/students/${student.id}/edit`}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                <Edit size={20} />
                Edit
              </Link>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 mb-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Background</h3>
                    <p className="text-gray-700 dark:text-gray-300">{student.background}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Strengths</h3>
                      <div className="flex flex-wrap gap-2">
                        {student.strengths.map((strength, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg text-sm"
                          >
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Weaknesses</h3>
                      <div className="flex flex-wrap gap-2">
                        {student.weaknesses.map((weakness, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-lg text-sm"
                          >
                            {weakness}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {student.emotionalTags.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Emotional Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {student.emotionalTags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {student.flags.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Flags</h3>
                      <div className="flex flex-wrap gap-2">
                        {student.flags.map((flag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg text-sm"
                          >
                            {flag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'attendance' && (
                <div className="space-y-4">
                  {studentAttendance.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">No attendance records yet</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-2 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                            <th className="text-left py-2 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                            <th className="text-left py-2 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Reason</th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentAttendance.map((record) => (
                            <tr key={record.id} className="border-b border-gray-100 dark:border-gray-800">
                              <td className="py-2 px-4 text-sm text-gray-700 dark:text-gray-300">
                                {format(new Date(record.date), 'MMM d, yyyy')}
                              </td>
                              <td className="py-2 px-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    record.status === 'Present'
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                      : record.status === 'Absent'
                                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  }`}
                                >
                                  {record.status}
                                </span>
                              </td>
                              <td className="py-2 px-4 text-sm text-gray-600 dark:text-gray-400">
                                {record.reason || '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'homework' && (
                <div className="space-y-4">
                  {studentHomework.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">No homework assigned yet</p>
                  ) : (
                    studentHomework.map((hw) => (
                      <div
                        key={hw.id}
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{hw.title}</h4>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              hw.status === 'submitted'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : hw.status === 'pending'
                                ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            }`}
                          >
                            {hw.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{hw.description}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Due: {format(new Date(hw.dueDate), 'MMM d, yyyy')}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'tests' && (
                <div className="space-y-4">
                  {studentTests.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">No test scores yet</p>
                  ) : (
                    studentTests.map((test) => (
                      <div
                        key={test.id}
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{test.testName}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{test.subject}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              {test.score}/{test.maxScore}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              {Math.round((test.score / test.maxScore) * 100)}%
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {format(new Date(test.date), 'MMM d, yyyy')}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-4">
                  {student.notes.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">No notes yet</p>
                  ) : (
                    student.notes.map((note) => (
                      <div
                        key={note.id}
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                      >
                        <p className="text-gray-700 dark:text-gray-300 mb-2">{note.content}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          By {note.createdBy} • {format(new Date(note.createdAt), 'MMM d, yyyy')}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'media' && (
                <div className="space-y-4">
                  {student.media.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">No media files yet</p>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {student.media.map((file) => (
                        <div
                          key={file.id}
                          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                        >
                          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">{file.type}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  );
}

