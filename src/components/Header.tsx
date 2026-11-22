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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#F1F5F9] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1455F5] rounded-lg p-1"
          aria-label="StartupStory Home"
        >
          <Logo iconSize="md" />
        </a>

        {/* Navigation Links and Action Button */}
        <div className="flex items-center gap-3 sm:gap-7">
          <nav className="flex items-center gap-4 sm:gap-6" aria-label="Main navigation">
            <button
              type="button"
              onClick={onOpenAbout}
              className="text-xs sm:text-sm font-medium text-[#53627D] hover:text-[#101B3A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1455F5] rounded px-1.5 py-1 cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={onOpenHowItWorks}
              className="text-xs sm:text-sm font-medium text-[#53627D] hover:text-[#101B3A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1455F5] rounded px-1.5 py-1 cursor-pointer"
            >
              How it works
            </button>
          </nav>

          <a
            href="#signup-section"
            onClick={handleScrollToSignup}
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 bg-[#1455F5] hover:bg-[#0E43C7] active:bg-[#0A339E] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs hover:shadow-sm transition-all focus-visible:ring-4 focus-visible:ring-[#1455F5]/25 whitespace-nowrap cursor-pointer"
          >
            Get launch updates
          </a>
        </div>
      </div>
    </header>
  );
}
