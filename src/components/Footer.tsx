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
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#64748B]">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-[#0F172A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] rounded px-1"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-[#0F172A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] rounded px-1"
            >
              Terms
            </button>
            <button
              type="button"
              onClick={onOpenManage}
              className="hover:text-[#0F172A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] rounded px-1 text-[#0066FF]"
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
