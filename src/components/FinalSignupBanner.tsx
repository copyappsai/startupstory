'use client';

import React from 'react';
import SignupForm from './SignupForm';

function RocketBannerIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-8 h-8 text-white">
      <path
        d="M34 12c-9 2-16 9-18 18l-2 9 9-2c9-2 16-9 18-18l2-9-9 2Z"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="25" r="4" stroke="currentColor" strokeWidth="3.2" />
      <path
        d="m17 37-7 8 11-1m16 5 8-7-1 11"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface FinalSignupBannerProps {
  onOpenPrivacy?: () => void;
  onOpenManage?: (email: string) => void;
}

export default function FinalSignupBanner({
  onOpenPrivacy,
  onOpenManage,
}: FinalSignupBannerProps) {
  return (
    <section id="signup-section" className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EAF1FF] border border-[#D6E4FF] rounded-3xl p-6 sm:p-8 md:p-12 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 flex items-start gap-4">
              {/* Rocket icon container */}
              <div className="w-14 h-14 rounded-2xl bg-[#1455F5] text-white flex items-center justify-center shrink-0 shadow-sm">
                <RocketBannerIcon />
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#101B3A] leading-tight">
                  Be the first to know when we launch.
                </h2>
                <p className="mt-2 text-sm sm:text-base text-[#53627D] leading-relaxed">
                  Get a notification when StartupStory goes live and start sharing your own founder story.
                </p>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <SignupForm
                idPrefix="bottom"
                onOpenPrivacy={onOpenPrivacy}
                onOpenManage={onOpenManage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
