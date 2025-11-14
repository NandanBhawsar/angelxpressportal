'use client';

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface GlassmorphismButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'xp' | 'levelup' | 'danger' | 'reward';
  icon?: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  badge?: string | number;
}

export function GlassmorphismButton({
  children,
  variant = 'primary',
  icon: Icon,
  onClick,
  disabled = false,
  className = '',
  size = 'md',
  badge,
}: GlassmorphismButtonProps) {
  const variants = {
    primary: {
      glow: 'shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]',
      border: 'border-blue-400/50',
      bg: 'bg-blue-500/10',
      text: 'text-blue-200',
      pulse: 'animate-pulse-blue',
    },
    xp: {
      glow: 'shadow-[0_0_20px_rgba(234,179,8,0.5)] hover:shadow-[0_0_30px_rgba(234,179,8,0.7)]',
      border: 'border-yellow-400/50',
      bg: 'bg-yellow-500/10',
      text: 'text-yellow-200',
      pulse: 'animate-pulse-yellow',
    },
    levelup: {
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)]',
      border: 'border-purple-400/50',
      bg: 'bg-purple-500/10',
      text: 'text-purple-200',
      pulse: 'animate-pulse-purple',
    },
    danger: {
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:shadow-[0_0_30px_rgba(239,68,68,0.7)]',
      border: 'border-red-400/50',
      bg: 'bg-red-500/10',
      text: 'text-red-200',
      pulse: 'animate-pulse-red',
    },
    reward: {
      glow: 'shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.7)]',
      border: 'border-pink-400/50',
      bg: 'bg-pink-500/10',
      text: 'text-pink-200',
      pulse: 'animate-pulse-pink',
    },
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = variants[variant];
  const sizeStyles = sizes[size];

  return (
    <>
      <style jsx global>{`
        @keyframes pulse-blue {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.8); }
        }
        @keyframes pulse-yellow {
          0%, 100% { box-shadow: 0 0 20px rgba(234, 179, 8, 0.5); }
          50% { box-shadow: 0 0 30px rgba(234, 179, 8, 0.8); }
        }
        @keyframes pulse-purple {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.5); }
          50% { box-shadow: 0 0 30px rgba(168, 85, 247, 0.8); }
        }
        @keyframes pulse-red {
          0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.5); }
          50% { box-shadow: 0 0 30px rgba(239, 68, 68, 0.8); }
        }
        @keyframes pulse-pink {
          0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.5); }
          50% { box-shadow: 0 0 30px rgba(236, 72, 153, 0.8); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        .animate-pulse-blue {
          animation: pulse-blue 2s ease-in-out infinite;
        }
        .animate-pulse-yellow {
          animation: pulse-yellow 2s ease-in-out infinite;
        }
        .animate-pulse-purple {
          animation: pulse-purple 2s ease-in-out infinite;
        }
        .animate-pulse-red {
          animation: pulse-red 2s ease-in-out infinite;
        }
        .animate-pulse-pink {
          animation: pulse-pink 2s ease-in-out infinite;
        }
        .glass-button {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }
        .glass-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        .glass-button:hover::before {
          left: 100%;
        }
        .glass-button:active {
          transform: scale(0.95);
        }
      `}</style>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          glass-button
          relative
          ${sizeStyles}
          ${variantStyles.bg}
          ${variantStyles.border}
          ${variantStyles.text}
          ${variantStyles.glow}
          ${variantStyles.pulse}
          border-2
          rounded-full
          font-semibold
          transition-all
          duration-300
          hover:scale-105
          hover:brightness-110
          active:scale-95
          disabled:opacity-50
          disabled:cursor-not-allowed
          disabled:hover:scale-100
          flex items-center justify-center gap-2
          ${className}
        `}
      >
        {Icon && <Icon size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />}
        <span>{children}</span>
        {badge && (
          <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold">
            {badge}
          </span>
        )}
      </button>
    </>
  );
}

