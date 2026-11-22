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
    <section id="features" className="py-16 md:py-20" aria-labelledby="features-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <h2 
            id="features-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A]"
          >
            A community built for the real journey
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#64748B]">
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
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#0066FF] mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-[#0F172A] tracking-tight mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#475569] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#94A3B8]">
                  <span>Feature in development</span>
                  <span className="font-medium text-[#0066FF]">Launch feature</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
