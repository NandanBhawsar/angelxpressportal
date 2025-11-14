'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { StudentSidebar } from '@/components/Layout/StudentSidebar';
import { AuthGuard } from '@/components/AuthGuard';
import { GlassmorphismButton } from '@/components/UI/GlassmorphismButton';
import { ArrowLeft, Play, Pause, CheckCircle, Clock, BookOpen, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';

interface Tutorial {
  id: string;
  title: string;
  subject: string;
  type: 'video' | 'article';
  content: string;
  duration: number; // in minutes
  xpReward: number;
}

export default function TutorialPage() {
  const params = useParams();
  const router = useRouter();
  const tutorialId = params.id as string;

  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeWatched, setTimeWatched] = useState(0);

  // Mock tutorial data
  const tutorial: Tutorial = {
    id: tutorialId,
    title: 'Addition Basics',
    subject: 'Mathematics',
    type: 'video',
    duration: 15,
    xpReward: 100,
    content: `
      <h2>Introduction to Addition</h2>
      <p>Addition is one of the four basic operations in mathematics. It's the process of combining two or more numbers to get a total sum.</p>
      
      <h3>Basic Concepts</h3>
      <p>When we add numbers, we're finding the total. For example:</p>
      <ul>
        <li>2 + 3 = 5</li>
        <li>5 + 4 = 9</li>
        <li>10 + 7 = 17</li>
      </ul>
      
      <h3>Step-by-Step Method</h3>
      <p>To add two numbers:</p>
      <ol>
        <li>Write the numbers one below the other</li>
        <li>Start from the rightmost digit</li>
        <li>Add the digits in each column</li>
        <li>If the sum is 10 or more, carry over to the next column</li>
      </ol>
      
      <h3>Example: 15 + 27</h3>
      <p>Let's solve this step by step:</p>
      <pre>
        15
      + 27
      ----
        42
      </pre>
      <p>We add 5 + 7 = 12. Write 2, carry 1. Then add 1 + 2 + 2 = 5. The answer is 42.</p>
      
      <h3>Practice Tips</h3>
      <ul>
        <li>Practice with small numbers first</li>
        <li>Use your fingers to count if needed</li>
        <li>Check your answers by counting</li>
        <li>Practice daily to improve speed</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>Addition is a fundamental skill that you'll use throughout your life. Keep practicing and you'll get better!</p>
    `,
  };

  useEffect(() => {
    if (isPlaying && progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = Math.min(prev + 0.5, 100);
          if (newProgress >= 100 && !isCompleted) {
            handleComplete();
          }
          return newProgress;
        });
        setTimeWatched((prev) => prev + 1);
      }, 300); // Simulate progress every 300ms

      return () => clearInterval(interval);
    }
  }, [isPlaying, progress, isCompleted]);

  const handlePlay = () => {
    setIsPlaying(true);
    toast.success('Tutorial started!');
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleComplete = () => {
    setIsCompleted(true);
    setIsPlaying(false);
    toast.success(`Tutorial completed! You earned ${tutorial.xpReward} XP!`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <StudentSidebar />
        <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <GlassmorphismButton
                variant="primary"
                size="sm"
                onClick={() => router.push('/student/tutorials')}
                className="mb-4"
              >
                <ArrowLeft size={16} />
                Back
              </GlassmorphismButton>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {tutorial.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">{tutorial.subject}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20">
                    <Clock size={18} className="text-blue-400" />
                    <span className="text-sm text-gray-900 dark:text-white">
                      {tutorial.duration} min
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20">
                    <Trophy size={18} className="text-yellow-400" />
                    <span className="text-sm text-gray-900 dark:text-white">
                      {tutorial.xpReward} XP
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>{Math.round(progress)}% Complete</span>
                <span>{formatTime(Math.floor((progress / 100) * tutorial.duration * 60))} / {tutorial.duration}:00</span>
              </div>
            </div>

            {/* Video/Content Player */}
            <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl mb-6">
              {tutorial.type === 'video' ? (
                <div className="aspect-video bg-gray-900 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50" />
                  <div className="relative z-10 text-center">
                    {!isPlaying ? (
                      <button
                        onClick={handlePlay}
                        className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center hover:scale-110 transition-transform border-2 border-white/30"
                      >
                        <Play className="text-white ml-1" size={32} />
                      </button>
                    ) : (
                      <button
                        onClick={handlePause}
                        className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center hover:scale-110 transition-transform border-2 border-white/30"
                      >
                        <Pause className="text-white" size={32} />
                      </button>
                    )}
                  </div>
                  {isPlaying && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
                        <div className="w-full bg-gray-700 rounded-full h-1 mb-2">
                          <div
                            className="bg-blue-500 h-1 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-white text-sm">
                          <span>{formatTime(Math.floor((progress / 100) * tutorial.duration * 60))}</span>
                          <span>{tutorial.duration}:00</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="text-green-400" size={24} />
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      Interactive Article
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-ol:text-gray-700 dark:prose-ol:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-blue-600 dark:prose-code:text-blue-400"
                dangerouslySetInnerHTML={{ __html: tutorial.content }}
              />
            </div>

            {/* Controls */}
            <div className="flex gap-4">
              {!isCompleted ? (
                <>
                  {!isPlaying ? (
                    <GlassmorphismButton
                      variant="xp"
                      onClick={handlePlay}
                      className="flex-1"
                    >
                      <Play size={20} />
                      Start Tutorial
                    </GlassmorphismButton>
                  ) : (
                    <GlassmorphismButton
                      variant="primary"
                      onClick={handlePause}
                      className="flex-1"
                    >
                      <Pause size={20} />
                      Pause
                    </GlassmorphismButton>
                  )}
                  {progress > 0 && (
                    <GlassmorphismButton
                      variant="levelup"
                      onClick={handleComplete}
                      disabled={progress < 100}
                      className="flex-1"
                    >
                      <CheckCircle size={20} />
                      Mark Complete
                    </GlassmorphismButton>
                  )}
                </>
              ) : (
                <>
                  <GlassmorphismButton
                    variant="primary"
                    onClick={() => router.push('/student/tutorials')}
                    className="flex-1"
                  >
                    <ArrowLeft size={20} />
                    Back to Tutorials
                  </GlassmorphismButton>
                  <GlassmorphismButton
                    variant="reward"
                    onClick={() => {
                      setProgress(0);
                      setIsPlaying(false);
                      setIsCompleted(false);
                      setTimeWatched(0);
                    }}
                    className="flex-1"
                  >
                    Watch Again
                  </GlassmorphismButton>
                </>
              )}
            </div>

            {/* Completion Badge */}
            {isCompleted && (
              <div className="mt-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-6 border-2 border-green-500/50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-white" size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      Tutorial Completed! 🎉
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      You earned {tutorial.xpReward} XP. Great job!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

