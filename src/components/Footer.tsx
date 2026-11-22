'use client';

import React from 'react';
import Logo from './Logo';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenManage: () => void;
}

export default function Footer({ onOpenPrivacy, onOpenTerms, onOpenManage }: FooterProps) {
  return (
    <footer className="border-t border-[#F1F5F9] bg-white py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo on the left */}
          <div className="flex items-center gap-2">
            <Logo iconSize="sm" />
          </div>

          {/* Links & Copyright on the right */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#53627D]">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-[#101B3A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1455F5] rounded px-1 cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-[#101B3A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1455F5] rounded px-1 cursor-pointer"
            >
              Terms
            </button>
            <button
              type="button"
              onClick={onOpenManage}
              className="hover:text-[#101B3A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1455F5] rounded px-1 text-[#1455F5] font-medium cursor-pointer"
            >
              Manage subscription
            </button>
            <span className="text-[#CBD5E1] hidden sm:inline" aria-hidden="true">
              |
            </span>
            <span>© 2026 StartupStory</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
