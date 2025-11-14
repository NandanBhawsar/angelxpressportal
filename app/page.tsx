'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useStore();

  useEffect(() => {
    if (isAuthenticated) {
      // Check which portal they logged into
      const session = localStorage.getItem('authSession');
      if (session) {
        try {
          const parsed = JSON.parse(session);
          if (parsed.portal === 'student') {
            router.push('/student/dashboard');
          } else {
            router.push('/dashboard');
          }
        } catch {
          router.push('/dashboard');
        }
      } else {
        router.push('/dashboard');
      }
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return null;
}
