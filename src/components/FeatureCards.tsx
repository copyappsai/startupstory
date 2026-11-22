import React from 'react';

function RocketIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-8 h-8">
      <path
        d="M34 12c-9 2-16 9-18 18l-2 9 9-2c9-2 16-9 18-18l2-9-9 2Z"
        stroke="#1455F5"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="25" r="4" stroke="#1455F5" strokeWidth="3.2" />
      <path
        d="m17 37-7 8 11-1m16 5 8-7-1 11"
        stroke="#1455F5"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-8 h-8">
      <path
        d="M10 16c9-3 16-1 22 4v31c-6-5-13-7-22-4V16Zm44 0c-9-3-16-1-22 4v31c6-5 13-7 22-4V16Z"
        stroke="#1455F5"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <path
        d="M16 24h9m-9 7h9m14-7h9m-9 7h9"
        stroke="#1455F5"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CommunityIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-8 h-8">
      <circle cx="32" cy="20" r="7" stroke="#1455F5" strokeWidth="3.2" />
      <circle cx="15" cy="27" r="5" stroke="#1455F5" strokeWidth="3.2" />
      <circle cx="49" cy="27" r="5" stroke="#1455F5" strokeWidth="3.2" />
      <path
        d="M18 49c1-9 6-14 14-14s13 5 14 14M6 47c1-7 4-11 10-11 3 0 5 1 7 3m35 8c-1-7-4-11-10-11-3 0-5 1-7 3"
        stroke="#1455F5"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const features = [
  {
    title: 'Share your journey',
    description: 'Post updates, wins, challenges, and lessons as you build.',
    icon: RocketIcon,
  },
  {
    title: 'Learn from honest experiences',
    description: 'Get practical insights from real founders, not just highlight reels.',
    icon: BookIcon,
  },
  {
    title: 'Connect with founders',
    description: 'Meet and exchange ideas with other builders on a similar journey.',
    icon: CommunityIcon,
  },
];

export default function FeatureCards() {
  return (
    <section id="features" className="py-16 md:py-20" aria-labelledby="features-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <h2
            id="features-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#101B3A]"
          >
            A community built for the real journey
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#53627D]">
            Designed specifically for startup founders at every stage of the journey. Coming soon.
          </p>
        </div>

        {/* 3 Columns Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-7 shadow-soft hover:shadow-card hover:border-[#CBD5E1] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon Box with exact #EAF1FF pale blue background */}
                  <div className="w-14 h-14 rounded-2xl bg-[#EAF1FF] border border-[#D6E4FF] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Icon />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-[#101B3A] tracking-tight mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#53627D] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#94A3B8]">
                  <span>Feature in development</span>
                  <span className="font-semibold text-[#1455F5]">Launch feature</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
