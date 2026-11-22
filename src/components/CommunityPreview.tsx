import React from 'react';
import Image from 'next/image';
import { Heart, MessageSquare, Bookmark } from 'lucide-react';

interface PreviewPost {
  name: string;
  role: string;
  avatarSrc: string;
  headline: string;
  body: string;
  likes: number;
  comments: number;
}

const previewPosts: PreviewPost[] = [
  {
    name: 'Maya Park',
    role: 'Founder · Building Taskly',
    avatarSrc: '/assets/images/avatar-maya-clean.png',
    headline: 'Our first launch — what went well (and what we\'d do differently)',
    body: 'We launched Taskly last week! We got our first users, some great feedback, and also a few surprises. Sharing a quick recap of the launch, the results, and 3 things we\'d change next time...',
    likes: 38,
    comments: 14,
  },
  {
    name: 'Rohan Mehta',
    role: 'Founder · Building DataLens',
    avatarSrc: '/assets/images/avatar-rohan-clean.png',
    headline: 'A product setback we didn\'t expect (and how we\'re fixing it)',
    body: 'We hit a major issue this week — our new feature wasn\'t as reliable as we thought, and a few users ran into problems. It was a tough moment, but also a good reminder to move a bit slower and test more...',
    likes: 27,
    comments: 9,
  },
  {
    name: 'Elena Rossi',
    role: 'Founder · Building NoteSpace',
    avatarSrc: '/assets/images/avatar-elena-clean.png',
    headline: 'Looking for feedback: which pricing would you choose?',
    body: 'We\'re getting ready to add pricing to NoteSpace and would love your input. We\'re considering a simple free plan + a $8/month Pro plan. Does that feel fair for a tool like this? What would you expect to see included?',
    likes: 19,
    comments: 24,
  },
];

export default function CommunityPreview() {
  return (
    <section id="preview" className="py-14 md:py-18" aria-labelledby="preview-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h2
            id="preview-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F172A]"
          >
            A preview of what&apos;s coming
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#64748B]">
            A look at the kind of conversations you&apos;ll find on StartupStory.
          </p>
        </div>

        {/* 3 Columns Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {previewPosts.map((post, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Author row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-[#F1F5F9] shrink-0 border border-[#E2E8F0]">
                      <Image
                        src={post.avatarSrc}
                        alt={post.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm text-[#0F172A] leading-tight">
                        {post.name}
                      </h4>
                      <p className="text-[12px] text-[#64748B] whitespace-nowrap">{post.role}</p>
                    </div>
                  </div>

                  {/* Preview Badge */}
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EEF4FF] text-[#0066FF] border border-[#DBEAFE] shrink-0">
                    Preview
                  </span>
                </div>

                {/* Post Title */}
                <h3 className="font-bold text-[15px] sm:text-base text-[#0F172A] mb-2 leading-snug">
                  {post.headline}
                </h3>

                {/* Post Body Snippet */}
                <p className="text-[13px] sm:text-[13.5px] text-[#475569] leading-relaxed line-clamp-4">
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
      </div>
    </section>
  );
}
