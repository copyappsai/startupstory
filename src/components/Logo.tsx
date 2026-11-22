import React from 'react';

interface LogoProps {
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function StartupStoryIcon({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-xs">
        <rect width="64" height="64" rx="16" fill="#1455F5" />
        <path d="M20 39c1-9 6-18 17-25l8-3-1 9c-3 12-11 20-20 22l-6 1 2-4Z" fill="#fff" />
        <circle cx="38" cy="22" r="4" fill="#1455F5" />
        <path d="m19 41-7 11 12-6m-2-1-1 8 7-6" fill="#DCE8FF" />
        <path d="M18 35c-4 1-7 4-8 8l8-2m16 7c-1 4-4 7-8 8l2-8" fill="#fff" />
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
        <span className={`font-bold tracking-tight text-[#101B3A] ${textMap[iconSize]}`}>
          StartupStory
        </span>
      )}
    </div>
  );
}
