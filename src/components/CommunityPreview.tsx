import React from 'react';

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <path
        d="M20.8 8.8c0 4.2-8.8 10-8.8 10S3.2 13 3.2 8.8A4.5 4.5 0 0 1 12 6.4a4.5 4.5 0 0 1 8.8 2.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <path
        d="M20.5 11.5a8 8 0 0 1-8.5 8 9 9 0 0 1-4-.9L3 20l1.5-4A7.5 7.5 0 0 1 3.5 12c0-4.4 3.8-8 8.5-8s8.5 3.1 8.5 7.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <path
        d="M6 4.5h12v16l-6-4-6 4v-16Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface PreviewPost {
  name: string;
  role: string;
  avatarSvg: React.ReactNode;
  headline: string;
  body: string;
  likes: number;
  comments: number;
}

const previewPosts: PreviewPost[] = [
  {
    name: 'Maya Park',
    role: 'Founder · Building Taskly',
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
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#101B3A]"
          >
            A preview of what&apos;s coming
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#53627D]">
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
                      <h4 className="font-semibold text-sm text-[#101B3A] leading-tight truncate">
                        {post.name}
                      </h4>
                      <p className="text-xs text-[#53627D] truncate">{post.role}</p>
                    </div>
                  </div>

                  {/* Preview Badge with #EAF1FF */}
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EAF1FF] text-[#1455F5] border border-[#D6E4FF] shrink-0">
                    Preview
                  </span>
                </div>

                {/* Post Title */}
                <h3 className="font-bold text-[15px] sm:text-base text-[#101B3A] mb-2 leading-snug">
                  {post.headline}
                </h3>

                {/* Post Body Snippet */}
                <p className="text-sm text-[#53627D] leading-relaxed line-clamp-4">
                  {post.body}
                </p>
              </div>

              {/* Card Footer Reactions using official icon SVGs */}
              <div className="flex items-center justify-between pt-4 mt-6 border-t border-[#F1F5F9] text-[#53627D] text-xs font-medium">
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1.5 hover:text-[#1455F5] transition-colors cursor-default">
                    <HeartIcon />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-[#1455F5] transition-colors cursor-default">
                    <CommentIcon />
                    <span>{post.comments}</span>
                  </div>
                </div>

                <div className="hover:text-[#1455F5] transition-colors cursor-default">
                  <BookmarkIcon />
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
