import React from 'react';
import { Rocket, BookOpen, Users } from 'lucide-react';

const features = [
  {
    title: 'Share your journey',
    description: 'Post updates, wins, challenges, and lessons as you build.',
    icon: Rocket,
  },
  {
    title: 'Learn from honest experiences',
    description: 'Get practical insights from real founders, not just highlight reels.',
    icon: BookOpen,
  },
  {
    title: 'Connect with founders',
    description: 'Meet and exchange ideas with other builders on a similar journey.',
    icon: Users,
  },
];

export default function FeatureCards() {
  return (
    <section id="features" className="py-14 md:py-18" aria-labelledby="features-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h2
            id="features-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F172A]"
          >
            A community built for the real journey
          </h2>
        </div>

        {/* 3 Horizontal-aligned Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all duration-200 flex items-start gap-4.5"
              >
                {/* Icon Box on the Left matching the reference image */}
                <div className="w-13 h-13 rounded-2xl bg-[#EEF4FF] flex items-center justify-center text-[#0066FF] shrink-0">
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>

                {/* Title & Description on the Right */}
                <div className="space-y-1">
                  <h3 className="text-[17px] font-bold text-[#0F172A] tracking-tight leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-[#475569] text-[13.5px] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
