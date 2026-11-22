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
    <footer className="bg-white py-8 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo on the left */}
          <div className="flex items-center gap-2">
            <Logo iconSize="sm" />
          </div>

          {/* Links & Copyright on the right matching reference image */}
          <div className="flex items-center gap-6 text-xs sm:text-[13px] text-[#475569]">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-[#0F172A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] rounded cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-[#0F172A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] rounded cursor-pointer"
            >
              Terms
            </button>
            <span className="text-[#CBD5E1]" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={onOpenManage}
              className="text-[#64748B] hover:text-[#0066FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] rounded cursor-pointer"
            >
              © 2026 StartupStory
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
