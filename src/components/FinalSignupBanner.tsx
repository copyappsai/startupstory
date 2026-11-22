'use client';

import React from 'react';
import SignupForm from './SignupForm';
import { Rocket } from 'lucide-react';

interface FinalSignupBannerProps {
  onOpenPrivacy?: () => void;
  onOpenManage?: (email: string) => void;
}

export default function FinalSignupBanner({
  onOpenPrivacy,
  onOpenManage,
}: FinalSignupBannerProps) {
  return (
    <section id="signup-section" className="py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EEF4FF] border border-[#DBEAFE] rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 flex items-start gap-4">
              {/* Rocket icon container in vibrant blue */}
              <div className="w-13 h-13 rounded-2xl bg-[#0066FF] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Rocket className="w-6 h-6 stroke-[2.2] -rotate-12" />
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
                  Be the first to know when we launch.
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-[#475569] leading-relaxed">
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
