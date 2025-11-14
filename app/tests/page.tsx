'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { AuthGuard } from '@/components/AuthGuard';
import { useStore } from '@/lib/store';
import { Plus, FileText, PlusCircle, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import type { TestQuestion } from '@/types';

export default function TestsPage() {
  const { tests, students, addTest, deleteTest, testScores, addTestScore } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    grade: '',
    questions: [] as TestQuestion[],
  });
  const [newQuestion, setNewQuestion] = useState({
    type: 'mcq' as 'mcq' | 'short' | 'long',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 1,
  });

  const handleAddTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.subject || formData.questions.length === 0) {
      toast.error('Please fill in all required fields and add at least one question');
      return;
    }

    const maxScore = formData.questions.reduce((sum, q) => sum + q.points, 0);
    addTest({
      ...formData,
      maxScore,
    });

    toast.success('Test created!');
    setFormData({ title: '', subject: '', grade: '', questions: [] });
    setShowForm(false);
  };

  const handleAddQuestion = () => {
    if (!newQuestion.question) {
      toast.error('Please enter a question');
      return;
    }

    const question: TestQuestion = {
      id: Date.now().toString(),
      type: newQuestion.type,
      question: newQuestion.question,
      points: newQuestion.points,
      ...(newQuestion.type === 'mcq' && { options: newQuestion.options.filter(Boolean) }),
      ...(newQuestion.correctAnswer && { correctAnswer: newQuestion.correctAnswer }),
    };

    setFormData({
      ...formData,
      questions: [...formData.questions, question],
    });

    setNewQuestion({
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 1,
    });
    toast.success('Question added!');
  };

  return (
    <AuthGuard>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Tests & Exams
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Create and manage tests
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Plus size={20} />
              Create Test
            </button>
          </div>

          {showForm && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
              <form onSubmit={handleAddTest} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Test Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Grade
                    </label>
                    <input
                      type="text"
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Questions ({formData.questions.length})</h3>

                  {/* Add Question Form */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Question Type
                        </label>
                        <select
                          value={newQuestion.type}
                          onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value as any })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                          <option value="mcq">Multiple Choice</option>
                          <option value="short">Short Answer</option>
                          <option value="long">Long Answer</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Points
                        </label>
                        <input
                          type="number"
                          value={newQuestion.points}
                          onChange={(e) => setNewQuestion({ ...newQuestion, points: parseInt(e.target.value) || 1 })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          min="1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Question
                      </label>
                      <textarea
                        value={newQuestion.question}
                        onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>

                    {newQuestion.type === 'mcq' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Options
                        </label>
                        <div className="space-y-2">
                          {newQuestion.options.map((option, idx) => (
                            <input
                              key={idx}
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...newQuestion.options];
                                newOptions[idx] = e.target.value;
                                setNewQuestion({ ...newQuestion, options: newOptions });
                              }}
                              placeholder={`Option ${idx + 1}`}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                          ))}
                        </div>
                        <input
                          type="text"
                          value={newQuestion.correctAnswer}
                          onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
                          placeholder="Correct Answer"
                          className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleAddQuestion}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      <PlusCircle size={20} />
                      Add Question
                    </button>
                  </div>

                  {/* Questions List */}
                  <div className="space-y-2">
                    {formData.questions.map((q, idx) => (
                      <div
                        key={q.id}
                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex items-start justify-between"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              Q{idx + 1} ({q.type.toUpperCase()}) - {q.points} pts
                            </span>
                          </div>
                          <p className="text-gray-900 dark:text-white">{q.question}</p>
                          {q.options && (
                            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                              {q.options.map((opt, optIdx) => (
                                <li key={optIdx}>• {opt}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              questions: formData.questions.filter((question) => question.id !== q.id),
                            });
                          }}
                          className="p-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Create Test
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

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">All Tests</h2>
            <div className="space-y-4">
              {tests.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center py-8">No tests created yet</p>
              ) : (
                tests.map((test) => (
                  <div
                    key={test.id}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{test.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {test.subject} • {test.grade} • {test.questions.length} questions • Max Score: {test.maxScore}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          Created: {format(new Date(test.createdAt), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            // Print preview would go here
                            window.print();
                          }}
                          className="p-2 text-blue-600 hover:text-blue-700"
                          title="Print Preview"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() => {
                            deleteTest(test.id);
                            toast.success('Test deleted');
                          }}
                          className="p-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  );
}

