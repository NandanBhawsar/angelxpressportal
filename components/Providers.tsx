'use client';

import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useStore } from '@/lib/store';

export function Providers({ children }: { children: React.ReactNode }) {
  const { darkMode } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      {children}
      <Toaster position="top-right" />
    </>
  );
}

