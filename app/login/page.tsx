'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import toast from 'react-hot-toast';
import { GraduationCap, Users, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [selectedPortal, setSelectedPortal] = useState<'teacher' | 'student' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useStore();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPortal) {
      toast.error('Please select a portal');
      return;
    }
    if (username && password) {
      login(username);
      
      // Store portal info in session
      if (typeof window !== 'undefined') {
        localStorage.setItem('authSession', JSON.stringify({
          studentId: username,
          portal: selectedPortal,
          loginTime: new Date().toISOString(),
        }));
      }
      
      toast.success(`Login successful! Redirecting to ${selectedPortal} portal...`);
      
      if (selectedPortal === 'teacher') {
        router.push('/dashboard');
      } else {
        router.push('/student/dashboard');
      }
    } else {
      toast.error('Please enter username and password');
    }
  };

  if (!selectedPortal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4">
              <GraduationCap className="text-white" size={40} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              AngelXpress
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Choose your portal to continue
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Teacher Portal */}
            <button
              onClick={() => setSelectedPortal('teacher')}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                  <Users className="text-blue-600 dark:text-blue-400" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Teacher Portal
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Manage students, create content, track progress, and generate reports
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold">
                  <span>Enter Portal</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </div>
              </div>
            </button>

            {/* Student Portal */}
            <button
              onClick={() => setSelectedPortal('student')}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-500"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                  <GraduationCap className="text-green-600 dark:text-green-400" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Student Portal
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Take quizzes, watch tutorials, track progress, earn badges and compete on leaderboards
                </p>
                <div className="flex items-center text-green-600 dark:text-green-400 font-semibold">
                  <span>Enter Portal</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </div>
              </div>
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            This is a demo application. Select a portal to continue.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <button
          onClick={() => setSelectedPortal(null)}
          className="mb-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
        >
          ← Back to portal selection
        </button>

        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            selectedPortal === 'teacher' 
              ? 'bg-blue-100 dark:bg-blue-900' 
              : 'bg-green-100 dark:bg-green-900'
          }`}>
            {selectedPortal === 'teacher' ? (
              <Users className={`${selectedPortal === 'teacher' ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}`} size={32} />
            ) : (
              <GraduationCap className="text-green-600 dark:text-green-400" size={32} />
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {selectedPortal === 'teacher' ? 'Teacher Portal' : 'Student Portal'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {selectedPortal === 'teacher' 
              ? 'Sign in to manage your classes' 
              : 'Sign in to start learning'}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {selectedPortal === 'teacher' ? 'Teacher ID / Username' : 'Student ID / Username'}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={selectedPortal === 'teacher' ? 'Enter teacher ID' : 'Enter student ID'}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors duration-200 ${
              selectedPortal === 'teacher'
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          This is a demo login. Enter any username and password to continue.
        </p>
      </div>
    </div>
  );
}
