'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { StudentSidebar } from '@/components/Layout/StudentSidebar';
import { AuthGuard } from '@/components/AuthGuard';
import { GlassmorphismButton } from '@/components/UI/GlassmorphismButton';
import { ArrowLeft, Clock, CheckCircle, XCircle, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';

interface Question {
  id: string;
  question: string;
  type: 'mcq' | 'open-ended';
  options?: string[];
  correctAnswer?: number;
  points: number;
}

interface Quiz {
  id: string;
  title: string;
  subject: string;
  questions: Question[];
  timeLimit: number; // in minutes
  totalXP: number;
}

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Mock quiz data
  const quiz: Quiz = {
    id: quizId,
    title: 'Addition Basics',
    subject: 'Mathematics',
    timeLimit: 15,
    totalXP: 200,
    questions: [
      {
        id: 'q1',
        question: 'What is 15 + 27?',
        type: 'mcq',
        options: ['40', '42', '41', '43'],
        correctAnswer: 1,
        points: 10,
      },
      {
        id: 'q2',
        question: 'What is 8 + 9?',
        type: 'mcq',
        options: ['16', '17', '18', '19'],
        correctAnswer: 1,
        points: 10,
      },
      {
        id: 'q3',
        question: 'What is 25 + 14?',
        type: 'mcq',
        options: ['38', '39', '40', '41'],
        correctAnswer: 1,
        points: 10,
      },
      {
        id: 'q4',
        question: 'What is 33 + 22?',
        type: 'mcq',
        options: ['54', '55', '56', '57'],
        correctAnswer: 1,
        points: 10,
      },
      {
        id: 'q5',
        question: 'What is 47 + 18?',
        type: 'mcq',
        options: ['64', '65', '66', '67'],
        correctAnswer: 1,
        points: 10,
      },
    ],
  };

  useEffect(() => {
    setTimeRemaining(quiz.timeLimit * 60);
  }, []);

  useEffect(() => {
    if (timeRemaining > 0 && !isCompleted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isCompleted) {
      handleSubmit();
    }
  }, [timeRemaining, isCompleted]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setAnswers({
      ...answers,
      [quiz.questions[currentQuestion].id]: answerIndex,
    });
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(answers[quiz.questions[currentQuestion + 1].id] as number || null);
      } else {
        handleSubmit();
      }
    } else {
      toast.error('Please select an answer');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[quiz.questions[currentQuestion - 1].id] as number || null);
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    quiz.questions.forEach((q) => {
      const answer = answers[q.id];
      if (answer === q.correctAnswer) {
        correct++;
      }
    });
    const finalScore = Math.round((correct / quiz.questions.length) * 100);
    setScore(finalScore);
    setIsCompleted(true);
    setShowResults(true);
    
    // Calculate XP earned
    const xpEarned = Math.round((finalScore / 100) * quiz.totalXP);
    toast.success(`Quiz completed! You scored ${finalScore}% and earned ${xpEarned} XP!`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    const xpEarned = Math.round((score / 100) * quiz.totalXP);
    const isPerfect = score === 100;

    return (
      <AuthGuard>
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
          <StudentSidebar />
          <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="text-center mb-8">
                  {isPerfect ? (
                    <div className="text-6xl mb-4">🎉</div>
                  ) : score >= 80 ? (
                    <div className="text-6xl mb-4">👏</div>
                  ) : (
                    <div className="text-6xl mb-4">📚</div>
                  )}
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Quiz Complete!
                  </h1>
                  <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                    Your Score: {score}%
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 dark:bg-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Correct Answers</p>
                    <p className="text-3xl font-bold text-green-500">
                      {Math.round((score / 100) * quiz.questions.length)}/{quiz.questions.length}
                    </p>
                  </div>
                  <div className="bg-white/10 dark:bg-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">XP Earned</p>
                    <p className="text-3xl font-bold text-yellow-500">{xpEarned}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Review Answers
                  </h3>
                  {quiz.questions.map((q, idx) => {
                    const answer = answers[q.id];
                    const isCorrect = answer === q.correctAnswer;
                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-xl ${
                          isCorrect
                            ? 'bg-green-500/20 border-2 border-green-500/50'
                            : 'bg-red-500/20 border-2 border-red-500/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                          ) : (
                            <XCircle className="text-red-500 flex-shrink-0 mt-1" size={20} />
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white mb-2">
                              {q.question}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Your answer: {q.options?.[answer as number] || 'Not answered'}
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-green-400 mt-1">
                                Correct answer: {q.options?.[q.correctAnswer!]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-4">
                  <GlassmorphismButton
                    variant="primary"
                    onClick={() => router.push('/student/quizzes')}
                    className="flex-1"
                  >
                    <ArrowLeft size={20} />
                    Back to Quizzes
                  </GlassmorphismButton>
                  <GlassmorphismButton
                    variant="levelup"
                    onClick={() => {
                      setShowResults(false);
                      setCurrentQuestion(0);
                      setSelectedAnswer(null);
                      setAnswers({});
                      setIsCompleted(false);
                      setScore(0);
                      setTimeRemaining(quiz.timeLimit * 60);
                    }}
                    className="flex-1"
                  >
                    Retake Quiz
                  </GlassmorphismButton>
                </div>
              </div>
            </div>
          </main>
        </div>
      </AuthGuard>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <StudentSidebar />
        <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <GlassmorphismButton
                variant="primary"
                size="sm"
                onClick={() => router.push('/student/quizzes')}
                className="mb-4"
              >
                <ArrowLeft size={16} />
                Back
              </GlassmorphismButton>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {quiz.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">{quiz.subject}</p>
                </div>
                <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20">
                  <Clock size={20} className="text-yellow-400" />
                  <span className="font-mono font-bold text-gray-900 dark:text-white">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </p>
            </div>

            {/* Question Card */}
            <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {question.question}
              </h2>

              <div className="space-y-3">
                {question.options?.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    className={`
                      w-full text-left p-4 rounded-xl transition-all duration-200
                      ${
                        selectedAnswer === idx
                          ? 'bg-blue-500/30 border-2 border-blue-400 scale-105 shadow-lg'
                          : 'bg-white/10 dark:bg-gray-700/50 border-2 border-transparent hover:border-blue-400/50 hover:bg-blue-500/10'
                      }
                      backdrop-blur-sm
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          w-6 h-6 rounded-full border-2 flex items-center justify-center
                          ${
                            selectedAnswer === idx
                              ? 'border-blue-400 bg-blue-500'
                              : 'border-gray-400'
                          }
                        `}
                      >
                        {selectedAnswer === idx && (
                          <div className="w-3 h-3 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              <GlassmorphismButton
                variant="primary"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex-1"
              >
                Previous
              </GlassmorphismButton>
              <GlassmorphismButton
                variant={currentQuestion === quiz.questions.length - 1 ? 'levelup' : 'xp'}
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="flex-1"
                badge={currentQuestion === quiz.questions.length - 1 ? 'Submit' : undefined}
              >
                {currentQuestion === quiz.questions.length - 1 ? (
                  <>
                    <Trophy size={20} />
                    Submit Quiz
                  </>
                ) : (
                  'Next'
                )}
              </GlassmorphismButton>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

