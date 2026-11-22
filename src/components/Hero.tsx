'use client';

import React from 'react';
import SignupForm from './SignupForm';
import HeroIllustration from './HeroIllustration';

interface HeroProps {
  onOpenPrivacy?: () => void;
  onOpenManage?: (email: string) => void;
}

export default function Hero({ onOpenPrivacy, onOpenManage }: HeroProps) {
  return (
    <section className="relative pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Description & Signup Form */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#101B3A] leading-[1.12]">
                Real startup stories.<br />
                Honest lessons.<br />
                A community for{' '}
                <span className="relative inline-block whitespace-nowrap text-[#101B3A]">
                  founders.
                  {/* Playful blue curved highlight stroke in official brand #1455F5 */}
                  <svg
                    viewBox="0 0 210 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -bottom-2 left-0 w-full h-3 sm:h-3.5 text-[#1455F5] overflow-visible pointer-events-none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 13C45 5 125 4 205 15C160 8 95 9 35 17"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#53627D] leading-relaxed max-w-xl">
                Founders will share their journeys and learn from each other — the wins, the struggles, and everything in between.
              </p>
            </div>

            {/* Email Signup Form */}
            <div id="hero-signup" className="pt-1 max-w-lg">
              <SignupForm
                idPrefix="hero"
                onOpenPrivacy={onOpenPrivacy}
                onOpenManage={onOpenManage}
              />
            </div>
          </div>

          {/* Right Column: Hero Visual Illustration & Post Preview */}
          <div className="lg:col-span-6 relative">
            <HeroIllustration />
          </div>

        </div>
      </div>
    </section>
  );
}
