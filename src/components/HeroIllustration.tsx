import React from 'react';
import { Heart, MessageSquare, Bookmark, MoreHorizontal } from 'lucide-react';

export default function HeroIllustration() {
  return (
    <div className="relative w-full max-w-[540px] mx-auto lg:max-w-none flex items-center justify-center py-4 select-none">
      {/* Background Soft Organic Blob */}
      <div 
        className="absolute -inset-4 md:-inset-8 bg-gradient-to-tr from-[#EFF6FF] via-[#E6F0FD] to-[#F1F7FF] rounded-[48px] -z-10 transform -rotate-1 scale-105 opacity-80"
        aria-hidden="true"
      />

      <div className="relative w-full">
        {/* Floating Founder Post Card */}
        <div className="relative z-10 bg-white border border-[#E2E8F0] rounded-2xl p-5 md:p-6 shadow-card transition-transform duration-300 hover:-translate-y-1">
          {/* Post Header */}
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-3">
              {/* Founder Avatar */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#E2E8F0] ring-2 ring-[#EFF6FF] shrink-0">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <rect width="40" height="40" fill="#E2E8F0" />
                  <circle cx="20" cy="14" r="6" fill="#F8C4A5" />
                  <path d="M15 11c1-3 9-3 10 0v2c0 0-2-1-5-1s-5 1-5-1z" fill="#332A24" />
                  <path d="M6 38c0-7 6-13 14-13s14 6 14 13" fill="#0066FF" />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-[#0F172A]">Alex Chen</span>
                </div>
                <div className="text-[12px] text-[#64748B]">Founder · Building FlowMail</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[#94A3B8]">
              <span className="text-xs">12h ago</span>
              <button 
                type="button" 
                aria-label="More options"
                className="p-1 hover:text-[#475569] rounded transition-colors"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Post Content */}
          <div className="space-y-2">
            <h3 className="font-bold text-[15px] sm:text-base text-[#0F172A] leading-snug">
              We just launched our first version! 🎉
            </h3>
            <p className="text-[13px] sm:text-[13.5px] text-[#475569] leading-relaxed line-clamp-4">
              After 3 months of building, we finally shipped v1 of FlowMail today — a simpler, faster email tool for small teams. It&apos;s not perfect, but it feels great to get it into real users&apos; hands. Here&apos;s what we learned along the way...
            </p>
          </div>

          {/* Post Metrics / Actions Bar */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#F1F5F9] text-[#64748B] text-xs font-medium">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5 hover:text-[#0066FF] transition-colors cursor-pointer">
                <Heart className="w-4 h-4" />
                <span>42</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-[#0066FF] transition-colors cursor-pointer">
                <MessageSquare className="w-4 h-4" />
                <span>18</span>
              </div>
            </div>

            <button 
              type="button" 
              aria-label="Bookmark post" 
              className="p-1 hover:text-[#0066FF] transition-colors"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Founder Working at Laptop Illustration (Matching reference image composition) */}
        <div className="relative mt-2 md:-mt-8 flex justify-end z-20 pointer-events-none pr-2 sm:pr-6">
          <svg
            viewBox="0 0 340 190"
            className="w-[260px] sm:w-[310px] md:w-[350px] h-auto drop-shadow-sm overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Sparkle decorative icons in vivid blue */}
            <path
              d="M38 72L40.5 66L46.5 68.5L40.5 71L38 77L35.5 71L29.5 68.5L35.5 66Z"
              fill="#0066FF"
              opacity="0.9"
            />
            <path
              d="M320 46L321.5 42L325.5 43.5L321.5 45L320 49L318.5 45L314.5 43.5L318.5 42Z"
              fill="#0066FF"
              opacity="0.9"
            />
            <path
              d="M232 24L233.5 20L237.5 21.5L233.5 23L232 27L230.5 23L226.5 21.5L230.5 20Z"
              fill="#0066FF"
              opacity="0.9"
            />

            {/* Subtle desk surface line */}
            <path d="M20 172H330" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />

            {/* Laptop Base keyboard surface */}
            <path
              d="M48 162L152 160C155 160 157 162 156 165L145 170C144 171 142 172 140 172L34 172C32 172 31 171 32 169L46 163C47 162 47.5 162 48 162Z"
              fill="#64748B"
            />

            {/* Laptop Screen Lid */}
            <path
              d="M59 110L136 107C138 107 140 109 140 111L138 158C138 160 136 162 134 162L57 164C55 164 53 162 53 160L55 112C55 110 57 110 59 110Z"
              fill="#94A3B8"
            />
            <path
              d="M62 112L133 109C134.5 109 136 110.5 136 112L134 155C134 156.5 132.5 158 131 158L60 160C58.5 160 57 158.5 57 157L59 114C59 112.5 60.5 112 62 112Z"
              fill="#CBD5E1"
            />
            {/* Rocket badge on laptop lid */}
            <g transform="translate(90, 128) scale(0.7)">
              <circle cx="10" cy="10" r="11" fill="#0066FF" />
              <path
                d="M5 14L7 9L11 9L14 6C15 5 16 5 16 5C16 5 16 6 15 7L12 10L12 14L7 12L5 14Z"
                fill="#FFFFFF"
              />
            </g>

            {/* Founder Figure */}
            <g transform="translate(130, 8)">
              {/* Hair Back */}
              <path
                d="M32 65C32 46 45 15 70 15C95 15 105 45 105 75C105 95 95 110 85 115C80 100 78 80 70 80C65 80 55 90 45 105C38 98 32 85 32 65Z"
                fill="#0F172A"
              />

              {/* Founder Body / Royal Blue Top */}
              <path
                d="M25 164C25 140 40 102 65 100C75 99 85 104 95 110C108 120 114 135 116 164H25Z"
                fill="#0066FF"
              />

              {/* Founder Neck */}
              <path d="M64 85H76V102C76 104 64 104 64 102V85Z" fill="#FBD0B8" />

              {/* Founder Head & Face */}
              <path
                d="M52 48C52 35 62 25 74 25C86 25 95 35 95 48C95 62 86 73 74 73C62 73 52 62 52 48Z"
                fill="#FEE4D6"
              />

              {/* Hair Front / Bangs */}
              <path
                d="M50 42C55 30 68 22 82 23C92 24 98 32 96 42C90 35 78 33 70 34C62 35 55 40 50 42Z"
                fill="#0F172A"
              />
              <path
                d="M94 40C98 48 100 65 95 80C90 70 90 55 94 40Z"
                fill="#0F172A"
              />

              {/* Facial features - Smiling & relaxed */}
              <path d="M60 41C63 39 67 40 69 42" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M78 41C80 39 84 40 86 42" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="64" cy="47" r="1.8" fill="#0F172A" />
              <circle cx="82" cy="47" r="1.8" fill="#0F172A" />
              {/* Smile */}
              <path
                d="M69 57C72 61 76 61 78 57"
                stroke="#EA580C"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
              {/* Cheeks blush */}
              <circle cx="60" cy="54" r="3" fill="#FCA5A5" opacity="0.6" />
              <circle cx="86" cy="54" r="3" fill="#FCA5A5" opacity="0.6" />

              {/* Arm / Hand resting on chin */}
              <path
                d="M90 120C90 120 98 90 92 75C90 70 83 67 78 68C75 69 74 72 76 75C80 82 83 95 83 120"
                fill="#0052CC"
              />
              {/* Hand at chin */}
              <circle cx="78" cy="70" r="5.5" fill="#FEE4D6" />
            </g>

            {/* Coffee Mug - positioned on the desk in front/side */}
            <g transform="translate(245, 142)">
              <rect x="2" y="4" width="22" height="26" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
              <path
                d="M24 10C28 10 31 12 31 17C31 22 28 24 24 24"
                stroke="#CBD5E1"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <ellipse cx="13" cy="7" rx="8" ry="2" fill="#E2E8F0" />
            </g>

            {/* Potted Succulent Plant - foreground right side on desk */}
            <g transform="translate(278, 105)">
              {/* Leaves */}
              <path
                d="M25 45C25 45 14 34 16 18C18 3 33 13 30 33C29.5 37 25 45 25 45Z"
                fill="#10B981"
              />
              <path
                d="M25 45C25 45 34 31 44 24C52 18 50 34 38 41C34 43 25 45 25 45Z"
                fill="#059669"
              />
              <path
                d="M25 45C25 45 10 35 3 27C-4 19 3 11 12 25C16 31 25 45 25 45Z"
                fill="#34D399"
              />
              <path
                d="M25 45C25 45 21 24 25 11C27 2 33 6 30 23C29 29 25 45 25 45Z"
                fill="#047857"
              />

              {/* Plant Pot Rim */}
              <path
                d="M6 45H44C45.1 45 46 45.9 46 47V49H4V47C4 45.9 4.9 45 6 45Z"
                fill="#93C5FD"
              />
              {/* Plant Pot Body */}
              <path
                d="M8 49L12 66C12.5 67.5 14 68.5 15.5 68.5H34.5C36 68.5 37.5 67.5 38 66L42 49H8Z"
                fill="#BFDBFE"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
