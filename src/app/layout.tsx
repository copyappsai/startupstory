import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'StartupStory — Real startup stories. Honest lessons. A community for founders.',
  description:
    'Join the waitlist for StartupStory. A community where startup founders share their real startup journeys, lessons, milestones, setbacks, and questions.',
  keywords: [
    'startup community',
    'founder stories',
    'startup lessons',
    'indie hackers',
    'bootstrapping',
    'entrepreneurship',
    'waitlist',
  ],
  authors: [{ name: 'StartupStory Team' }],
  openGraph: {
    title: 'StartupStory — Real startup stories. Honest lessons.',
    description:
      'A community where startup founders share their real startup journeys, lessons, milestones, setbacks, and questions. Join the launch waitlist.',
    url: 'https://startupstory.tech',
    siteName: 'StartupStory',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StartupStory — Real startup stories. Honest lessons.',
    description:
      'A community where startup founders share their real startup journeys, lessons, setbacks, and questions.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FFFFFF] text-[#0F172A]">
        {children}
      </body>
    </html>
  );
}
