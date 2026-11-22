import React from 'react';
import { Heart, MessageSquare, Bookmark } from 'lucide-react';

interface PreviewPost {
  name: string;
  role: string;
  avatarColor: string;
  avatarInitial: string;
  avatarSvg?: React.ReactNode;
  headline: string;
  body: string;
  likes: number;
  comments: number;
}

const previewPosts: PreviewPost[] = [
  {
    name: 'Maya Park',
    role: 'Founder · Building Taskly',
    avatarColor: '#FDF2F8',
    avatarInitial: 'MP',
    avatarSvg: (
      <svg viewBox="0 0 36 36" className="w-full h-full">
        <circle cx="18" cy="18" r="18" fill="#FCE7F3" />
        <circle cx="18" cy="14" r="6" fill="#F472B6" />
        <path d="M7 32c0-6 5-11 11-11s11 5 11 11" fill="#EC4899" />
      </svg>
    ),
    headline: 'Our first launch — what went well (and what we\'d do differently)',
    body: 'We launched Taskly last week! We got our first users, some great feedback, and also a few surprises. Sharing a quick recap of the launch, the results, and 3 things we\'d change next time...',
    likes: 38,
    comments: 14,
  },
  {
    name: 'Rohan Mehta',
    role: 'Founder · Building DataLens',
    avatarColor: '#EFF6FF',
    avatarInitial: 'RM',
    avatarSvg: (
      <svg viewBox="0 0 36 36" className="w-full h-full">
        <circle cx="18" cy="18" r="18" fill="#DBEAFE" />
        <circle cx="18" cy="14" r="6" fill="#3B82F6" />
        <path d="M7 32c0-6 5-11 11-11s11 5 11 11" fill="#2563EB" />
      </svg>
    ),
    headline: 'A product setback we didn\'t expect (and how we\'re fixing it)',
    body: 'We hit a major issue this week — our new feature wasn\'t as reliable as we thought, and a few users ran into problems. It was a tough moment, but also a good reminder to move a bit slower and test more...',
    likes: 27,
    comments: 9,
  },
  {
    name: 'Elena Rossi',
    role: 'Founder · Building NoteSpace',
    avatarColor: '#F0FDF4',
    avatarInitial: 'ER',
    avatarSvg: (
      <svg viewBox="0 0 36 36" className="w-full h-full">
        <circle cx="18" cy="18" r="18" fill="#DCFCE7" />
        <circle cx="18" cy="14" r="6" fill="#10B981" />
        <path d="M7 32c0-6 5-11 11-11s11 5 11 11" fill="#059669" />
      </svg>
    ),
    headline: 'Looking for feedback: which pricing would you choose?',
    body: 'We\'re getting ready to add pricing to NoteSpace and would love your input. We\'re considering a simple free plan + a $8/month Pro plan. Does that feel fair for a tool like this? What would you expect to see included?',
    likes: 19,
    comments: 24,
  },
];

export default function CommunityPreview() {
  return (
    <section id="preview" className="py-16 md:py-20 bg-gradient-to-b from-transparent via-[#F8FAFC]/50 to-transparent" aria-labelledby="preview-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <h2
            id="preview-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A]"
          >
            A preview of what&apos;s coming
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#64748B]">
            A look at the kind of conversations you&apos;ll find on StartupStory.
          </p>
        </div>

        {/* 3 Columns Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {previewPosts.map((post, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-soft hover:shadow-card hover:border-[#CBD5E1] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Author row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#F1F5F9] shrink-0 border border-[#E2E8F0]">
                      {post.avatarSvg}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm text-[#0F172A] leading-tight truncate">
                        {post.name}
                      </h4>
                      <p className="text-xs text-[#64748B] truncate">{post.role}</p>
                    </div>
                  </div>

                  {/* Preview Badge matching reference image */}
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#0066FF] border border-[#DBEAFE] shrink-0">
                    Preview
                  </span>
                </div>

                {/* Post Title */}
                <h3 className="font-bold text-[15px] sm:text-base text-[#0F172A] mb-2 leading-snug">
                  {post.headline}
                </h3>

                {/* Post Body Snippet */}
                <p className="text-sm text-[#475569] leading-relaxed line-clamp-4">
                  {post.body}
                </p>
              </div>

              {/* Card Footer Reactions */}
              <div className="flex items-center justify-between pt-4 mt-6 border-t border-[#F1F5F9] text-[#64748B] text-xs font-medium">
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1.5 hover:text-[#0066FF] transition-colors cursor-default">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-[#0066FF] transition-colors cursor-default">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </div>
                </div>

                <div className="hover:text-[#0066FF] transition-colors cursor-default">
                  <Bookmark className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clear disclaimer */}
        <div className="mt-8 text-center text-xs text-[#94A3B8]">
          Sample preview content only. Real discussions, founder profiles, and interactions will be available once the community launches.
        </div>
      </div>
    </section>
  );
}
