'use client';

import React from 'react';
import Logo from './Logo';

interface HeaderProps {
  onOpenHowItWorks?: () => void;
  onOpenAbout?: () => void;
  onScrollToSignup?: () => void;
}

export default function Header({
  onOpenHowItWorks,
  onOpenAbout,
  onScrollToSignup,
}: HeaderProps) {
  const handleScrollToSignup = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onScrollToSignup) {
      onScrollToSignup();
    } else {
      const el = document.getElementById('signup-section') || document.getElementById('hero-signup');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        const input = el.querySelector('input[type="email"]') as HTMLInputElement | null;
        if (input) input.focus();
      }
    }
  };

  return (
    <header className="w-full bg-white transition-all pt-3 pb-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo on the Left */}
        <a 
          href="#" 
          className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] rounded-lg"
          aria-label="StartupStory Home"
        >
          <Logo iconSize="md" />
        </a>

        {/* Navigation Links and Action Button on the Right */}
        <div className="flex items-center gap-5 sm:gap-7">
          <nav className="flex items-center gap-5 sm:gap-6" aria-label="Main navigation">
            <button
              type="button"
              onClick={onOpenAbout}
              className="text-xs sm:text-[14px] font-medium text-[#1E293B] hover:text-[#0066FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] rounded py-1 cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={onOpenHowItWorks}
              className="text-xs sm:text-[14px] font-medium text-[#1E293B] hover:text-[#0066FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] rounded py-1 cursor-pointer"
            >
              How it works
            </button>
          </nav>

          <a
            href="#signup-section"
            onClick={handleScrollToSignup}
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#0045B5] text-white text-xs sm:text-[14px] font-semibold rounded-xl shadow-xs hover:shadow-sm transition-all focus-visible:ring-4 focus-visible:ring-[#0066FF]/25 whitespace-nowrap cursor-pointer"
          >
            Get launch updates
          </a>
        </div>
      </div>
    </header>
  );
}
