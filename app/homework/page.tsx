'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { AuthGuard } from '@/components/AuthGuard';
import { useStore } from '@/lib/store';
import { Plus, BookOpen, CheckCircle, Clock, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function HomeworkPage() {
  const { homework, students, addHomework, updateHomework, deleteHomework } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    title: '',
    description: '',
    dueDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentId || !formData.title || !formData.dueDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    addHomework({
      studentId: formData.studentId,
      title: formData.title,
      description: formData.description,
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: formData.dueDate,
      status: 'assigned',
    });

    toast.success('Homework assigned!');
    setFormData({ studentId: '', title: '', description: '', dueDate: '' });
    setShowForm(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'pending':
        return <Clock className="text-orange-600" size={20} />;
      default:
        return <BookOpen className="text-blue-600" size={20} />;
    }
  };

  return (
    <AuthGuard>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Homework
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Assign and track homework submissions
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Plus size={20} />
              Assign Homework
            </button>
          </div>

          {showForm && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Student <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a student</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} ({student.grade})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Due Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Assign
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <BookOpen className="text-blue-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Assigned</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {homework.filter((h) => h.status === 'assigned').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Submitted</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {homework.filter((h) => h.status === 'submitted').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Clock className="text-orange-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {homework.filter((h) => h.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              {homework.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center py-8">No homework assigned yet</p>
              ) : (
                homework.map((hw) => {
                  const student = students.find((s) => s.id === hw.studentId);
                  return (
                    <div
                      key={hw.id}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3">
                          {getStatusIcon(hw.status)}
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{hw.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {student?.name || 'Unknown Student'} • {student?.grade}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={hw.status}
                            onChange={(e) => {
                              updateHomework(hw.id, {
                                status: e.target.value as any,
                                submittedDate: e.target.value === 'submitted' ? new Date().toISOString().split('T')[0] : undefined,
                              });
                              toast.success('Status updated');
                            }}
                            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                          >
                            <option value="assigned">Assigned</option>
                            <option value="pending">Pending</option>
                            <option value="submitted">Submitted</option>
                          </select>
                          <button
                            onClick={() => {
                              deleteHomework(hw.id);
                              toast.success('Homework deleted');
                            }}
                            className="p-1 text-red-600 hover:text-red-700"
                          >
                            <XCircle size={20} />
                          </button>
                        </div>
                      </div>
                      {hw.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{hw.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                        <span>Assigned: {format(new Date(hw.assignedDate), 'MMM d, yyyy')}</span>
                        <span>Due: {format(new Date(hw.dueDate), 'MMM d, yyyy')}</span>
                        {hw.submittedDate && (
                          <span>Submitted: {format(new Date(hw.submittedDate), 'MMM d, yyyy')}</span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  );
}

