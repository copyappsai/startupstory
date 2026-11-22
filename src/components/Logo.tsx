import React from 'react';

interface LogoProps {
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function StartupStoryIcon({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-xl bg-gradient-to-b from-[#0066FF] to-[#0055E0] shadow-sm text-white shrink-0 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[60%] h-[60%] -rotate-12 translate-x-[0.5px] translate-y-[-0.5px]"
      >
        {/* Rocket ship body */}
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    </div>
  );
}

export default function Logo({ className = '', iconSize = 'md', showText = true }: LogoProps) {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textMap = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <StartupStoryIcon className={sizeMap[iconSize]} />
      {showText && (
        <span className={`font-bold tracking-tight text-[#0F172A] ${textMap[iconSize]}`}>
          StartupStory
        </span>
      )}
    </div>
  );
}
