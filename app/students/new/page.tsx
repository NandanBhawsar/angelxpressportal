'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/Layout/MainLayout';
import { AuthGuard } from '@/components/AuthGuard';
import { useStore } from '@/lib/store';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import type { EmotionalTag, StudentFlag } from '@/types';

export default function NewStudentPage() {
  const router = useRouter();
  const { addStudent } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: '',
    background: '',
    strengths: '',
    weaknesses: '',
    emotionalTags: [] as EmotionalTag[],
    flags: [] as StudentFlag[],
  });

  const emotionalTagOptions: EmotionalTag[] = [
    'Distracted',
    'Low confidence',
    'Active',
    'Upset',
    'Needs help',
  ];

  const flagOptions: StudentFlag[] = [
    'Needs counselling',
    'Needs materials',
    'Irregular attendance',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.grade) {
      toast.error('Please fill in all required fields');
      return;
    }

    addStudent({
      name: formData.name,
      age: parseInt(formData.age),
      grade: formData.grade,
      background: formData.background,
      strengths: formData.strengths.split(',').map((s) => s.trim()).filter(Boolean),
      weaknesses: formData.weaknesses.split(',').map((s) => s.trim()).filter(Boolean),
      emotionalTags: formData.emotionalTags,
      flags: formData.flags,
      attendance: [],
      homework: [],
      testScores: [],
      media: [],
      notes: [],
    });

    toast.success('Student added successfully!');
    router.push('/students');
  };

  const toggleTag = (tag: EmotionalTag) => {
    setFormData((prev) => ({
      ...prev,
      emotionalTags: prev.emotionalTags.includes(tag)
        ? prev.emotionalTags.filter((t) => t !== tag)
        : [...prev.emotionalTags, tag],
    }));
  };

  const toggleFlag = (flag: StudentFlag) => {
    setFormData((prev) => ({
      ...prev,
      flags: prev.flags.includes(flag)
        ? prev.flags.filter((f) => f !== flag)
        : [...prev.flags, flag],
    }));
  };

  return (
    <AuthGuard>
      <MainLayout>
        <div className="max-w-3xl mx-auto space-y-6">
          <Link
            href="/students"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft size={20} />
            Back to Students
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Add New Student
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create a new student profile
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Grade <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  placeholder="e.g., 5th, 6th"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Background
              </label>
              <textarea
                value={formData.background}
                onChange={(e) => setFormData({ ...formData, background: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Family background, living situation, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Strengths (comma-separated)
              </label>
              <input
                type="text"
                value={formData.strengths}
                onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Good at Math, Creative, Helps others"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Weaknesses (comma-separated)
              </label>
              <input
                type="text"
                value={formData.weaknesses}
                onChange={(e) => setFormData({ ...formData, weaknesses: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Reading comprehension, Time management"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Emotional/Behavior Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {emotionalTagOptions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.emotionalTags.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Flags
              </label>
              <div className="flex flex-wrap gap-2">
                {flagOptions.map((flag) => (
                  <button
                    key={flag}
                    type="button"
                    onClick={() => toggleFlag(flag)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.flags.includes(flag)
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {flag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Save size={20} />
                Save Student
              </button>
              <Link
                href="/students"
                className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </MainLayout>
    </AuthGuard>
  );
}

