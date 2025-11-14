'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { AuthGuard } from '@/components/AuthGuard';
import { useStore } from '@/lib/store';
import { Plus, BookOpen, Sparkles, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function ClassesPage() {
  const { classSessions, addClassSession, lessonPlans, addLessonPlan } = useStore();
  const [activeTab, setActiveTab] = useState<'sessions' | 'planner'>('sessions');
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [showPlannerForm, setShowPlannerForm] = useState(false);

  const [sessionForm, setSessionForm] = useState({
    date: new Date().toISOString().split('T')[0],
    subject: '',
    topics: '',
    observations: '',
  });

  const [plannerForm, setPlannerForm] = useState({
    subject: '',
    grade: '',
    topics: '',
    duration: '',
    objectives: '',
    activities: '',
    materials: '',
  });

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    addClassSession({
      date: sessionForm.date,
      subject: sessionForm.subject,
      topics: sessionForm.topics.split(',').map((t) => t.trim()).filter(Boolean),
      observations: sessionForm.observations,
    });
    toast.success('Class session added!');
    setSessionForm({ date: new Date().toISOString().split('T')[0], subject: '', topics: '', observations: '' });
    setShowSessionForm(false);
  };

  const handleGenerateLessonPlan = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock AI response
    const mockPlan = {
      subject: plannerForm.subject,
      grade: plannerForm.grade,
      topics: plannerForm.topics.split(',').map((t) => t.trim()).filter(Boolean),
      duration: parseInt(plannerForm.duration) || 60,
      objectives: plannerForm.objectives.split(',').map((o) => o.trim()).filter(Boolean),
      activities: plannerForm.activities.split(',').map((a) => a.trim()).filter(Boolean),
      materials: plannerForm.materials.split(',').map((m) => m.trim()).filter(Boolean),
    };
    addLessonPlan(mockPlan);
    toast.success('Lesson plan generated!');
    setPlannerForm({ subject: '', grade: '', topics: '', duration: '', objectives: '', activities: '', materials: '' });
    setShowPlannerForm(false);
  };


  return (
    <AuthGuard>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Classes & Teaching Tools
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage class sessions and lesson plans
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveTab('sessions')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'sessions'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Calendar size={18} />
                Class Sessions
              </button>
              <button
                onClick={() => setActiveTab('planner')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'planner'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Sparkles size={18} />
                AI Lesson Planner
              </button>
            </div>

            {/* Sessions Tab */}
            {activeTab === 'sessions' && (
              <div className="space-y-4">
                <button
                  onClick={() => setShowSessionForm(!showSessionForm)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  <Plus size={20} />
                  Add Class Session
                </button>

                {showSessionForm && (
                  <form onSubmit={handleAddSession} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          value={sessionForm.date}
                          onChange={(e) => setSessionForm({ ...sessionForm, date: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={sessionForm.subject}
                          onChange={(e) => setSessionForm({ ...sessionForm, subject: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Topics Covered (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={sessionForm.topics}
                        onChange={(e) => setSessionForm({ ...sessionForm, topics: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="e.g., Addition, Subtraction, Multiplication"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Observations
                      </label>
                      <textarea
                        value={sessionForm.observations}
                        onChange={(e) => setSessionForm({ ...sessionForm, observations: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                      >
                        Save Session
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowSessionForm(false)}
                        className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-4">
                  {classSessions.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400 text-center py-8">No class sessions yet</p>
                  ) : (
                    classSessions.map((session) => (
                      <div
                        key={session.id}
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{session.subject}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {format(new Date(session.date), 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                        <div className="mb-2">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Topics:</p>
                          <div className="flex flex-wrap gap-2">
                            {session.topics.map((topic, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                        {session.observations && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Observations:</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{session.observations}</p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Lesson Planner Tab */}
            {activeTab === 'planner' && (
              <div className="space-y-4">
                <button
                  onClick={() => setShowPlannerForm(!showPlannerForm)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  <Sparkles size={20} />
                  Generate Lesson Plan
                </button>

                {showPlannerForm && (
                  <form onSubmit={handleGenerateLessonPlan} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={plannerForm.subject}
                          onChange={(e) => setPlannerForm({ ...plannerForm, subject: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Grade
                        </label>
                        <input
                          type="text"
                          value={plannerForm.grade}
                          onChange={(e) => setPlannerForm({ ...plannerForm, grade: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Topics (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={plannerForm.topics}
                        onChange={(e) => setPlannerForm({ ...plannerForm, topics: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        value={plannerForm.duration}
                        onChange={(e) => setPlannerForm({ ...plannerForm, duration: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Learning Objectives (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={plannerForm.objectives}
                        onChange={(e) => setPlannerForm({ ...plannerForm, objectives: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Activities (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={plannerForm.activities}
                        onChange={(e) => setPlannerForm({ ...plannerForm, activities: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Materials Needed (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={plannerForm.materials}
                        onChange={(e) => setPlannerForm({ ...plannerForm, materials: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                      >
                        Generate Plan
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowPlannerForm(false)}
                        className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-4">
                  {lessonPlans.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400 text-center py-8">No lesson plans generated yet</p>
                  ) : (
                    lessonPlans.map((plan) => (
                      <div
                        key={plan.id}
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                      >
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {plan.subject} - {plan.grade}
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Duration: </span>
                            <span className="text-gray-600 dark:text-gray-400">{plan.duration} minutes</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Topics: </span>
                            <span className="text-gray-600 dark:text-gray-400">{plan.topics.join(', ')}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">Objectives: </span>
                            <span className="text-gray-600 dark:text-gray-400">{plan.objectives.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    </AuthGuard>
  );
}

