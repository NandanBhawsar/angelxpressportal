'use client';

import { MainLayout } from '@/components/Layout/MainLayout';
import { AuthGuard } from '@/components/AuthGuard';
import { useStore } from '@/lib/store';
import { BarChart3, TrendingUp, Users, Calendar, Download } from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { format, subDays } from 'date-fns';
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function InsightsPage() {
  const { students, attendanceRecords, testScores, homework, volunteers } = useStore();

  // Attendance Chart Data
  const last7Days = Array.from({ length: 7 }, (_, i) => subDays(new Date(), 6 - i));
  const attendanceData = {
    labels: last7Days.map((d) => format(d, 'MMM d')),
    datasets: [
      {
        label: 'Present',
        data: last7Days.map((day) => {
          const dayStr = format(day, 'yyyy-MM-dd');
          return attendanceRecords.filter((r) => r.date === dayStr && r.status === 'Present').length;
        }),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
      },
      {
        label: 'Absent',
        data: last7Days.map((day) => {
          const dayStr = format(day, 'yyyy-MM-dd');
          return attendanceRecords.filter((r) => r.date === dayStr && r.status === 'Absent').length;
        }),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
      },
    ],
  };

  // Test Scores Chart
  const testScoreData = {
    labels: testScores.map((t) => t.testName).slice(-5),
    datasets: [
      {
        label: 'Average Score',
        data: testScores.slice(-5).map((t) => (t.score / t.maxScore) * 100),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
      },
    ],
  };

  // Homework Status Chart
  const homeworkStatusData = {
    labels: ['Assigned', 'Submitted', 'Pending'],
    datasets: [
      {
        data: [
          homework.filter((h) => h.status === 'assigned').length,
          homework.filter((h) => h.status === 'submitted').length,
          homework.filter((h) => h.status === 'pending').length,
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(34, 197, 94, 0.5)',
          'rgba(249, 115, 22, 0.5)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(249, 115, 22)',
        ],
      },
    ],
  };

  const generateImpactReport = () => {
    const report = `
ANGELXPRESS IMPACT REPORT
Generated: ${format(new Date(), 'MMMM d, yyyy')}

STUDENT STATISTICS
- Total Students: ${students.length}
- Average Age: ${students.length > 0 ? Math.round(students.reduce((sum, s) => sum + s.age, 0) / students.length) : 0} years

ATTENDANCE SUMMARY
- Total Attendance Records: ${attendanceRecords.length}
- Present Rate: ${attendanceRecords.length > 0 ? Math.round((attendanceRecords.filter((r) => r.status === 'Present').length / attendanceRecords.length) * 100) : 0}%

ACADEMIC PERFORMANCE
- Total Tests Conducted: ${testScores.length}
- Average Test Score: ${testScores.length > 0 ? Math.round((testScores.reduce((sum, t) => sum + (t.score / t.maxScore) * 100, 0) / testScores.length)) : 0}%

HOMEWORK TRACKING
- Total Homework Assigned: ${homework.length}
- Submission Rate: ${homework.length > 0 ? Math.round((homework.filter((h) => h.status === 'submitted').length / homework.length) * 100) : 0}%

VOLUNTEER CONTRIBUTION
- Total Volunteers: ${volunteers.length}
- Total Volunteer Hours: ${volunteers.reduce((sum, v) => sum + v.totalHours, 0)} hours
    `;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `impact-report-${format(new Date(), 'yyyy-MM-dd')}.txt`;
    a.click();
    toast.success('Impact report generated!');
  };

  return (
    <AuthGuard>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Insights & Reports
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Analytics, charts, and impact reports
              </p>
            </div>
            <button
              onClick={generateImpactReport}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Download size={20} />
              Generate Impact Report
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Users className="text-blue-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{students.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Calendar className="text-green-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Attendance Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {attendanceRecords.length > 0
                      ? Math.round((attendanceRecords.filter((r) => r.status === 'Present').length / attendanceRecords.length) * 100)
                      : 0}%
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-purple-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Test Score</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {testScores.length > 0
                      ? Math.round((testScores.reduce((sum, t) => sum + (t.score / t.maxScore) * 100, 0) / testScores.length))
                      : 0}%
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-orange-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Volunteer Hours</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {volunteers.reduce((sum, v) => sum + v.totalHours, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Attendance Trend (Last 7 Days)
              </h3>
              <div className="h-64">
                <Line data={attendanceData} options={{ responsive: true, maintainAspectRatio: true }} />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Test Scores
              </h3>
              {testScores.length > 0 ? (
                <div className="h-64">
                  <Bar data={testScoreData} options={{ responsive: true, maintainAspectRatio: true }} />
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-center py-8">No test data available</p>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Homework Status
              </h3>
              {homework.length > 0 ? (
                <div className="h-64">
                  <Doughnut data={homeworkStatusData} options={{ responsive: true, maintainAspectRatio: true }} />
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-center py-8">No homework data available</p>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Student Progress Overview
              </h3>
              <div className="space-y-4">
                {students.slice(0, 5).map((student) => {
                  const studentTests = testScores.filter((t) => t.studentId === student.id);
                  const avgScore = studentTests.length > 0
                    ? Math.round((studentTests.reduce((sum, t) => sum + (t.score / t.maxScore) * 100, 0) / studentTests.length))
                    : 0;
                  return (
                    <div key={student.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{student.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${avgScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                          {avgScore}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  );
}

