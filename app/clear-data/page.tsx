'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';

export default function ClearDataPage() {
  const router = useRouter();
  const [cleared, setCleared] = useState(false);

  const handleClear = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('angelxpress-storage');
      setCleared(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-4">
            <Trash2 className="text-red-600 dark:text-red-400" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Clear All Data
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This will remove all students, attendance records, homework, and other data from localStorage.
          </p>
          
          {cleared ? (
            <div className="space-y-4">
              <p className="text-green-600 dark:text-green-400 font-semibold">
                ✅ Data cleared successfully!
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Redirecting to dashboard...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={handleClear}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Clear All Data
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

