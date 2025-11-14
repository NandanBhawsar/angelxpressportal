'use client';

import { Sidebar } from './Sidebar';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}

